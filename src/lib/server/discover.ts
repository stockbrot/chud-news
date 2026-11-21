import {
  companies,
  gameById,
  releasedBetween,
  steamAppId,
  type IgdbGame,
} from "@/lib/pipeline/igdb";
import { isEligible, popularityOf, priority } from "@/lib/pipeline/priority";
import type { Env } from "./env";

const day = 86_400;
const iso = (unix: number) => new Date(unix * 1000).toISOString().slice(0, 10);

const officialUrl = (game: IgdbGame) =>
  game.websites
    ?.map((w) => w.url)
    .find(
      (url) =>
        !/steam|epicgames|gog\.com|wikipedia|twitter|x\.com|youtube|twitch|discord|reddit|facebook|instagram|playstation\.com|xbox\.com|nintendo/i.test(
          url,
        ),
    );

/**
 * Build the upsert for one game, or undefined when it doesn't qualify.
 * Status, votes and anything the pipeline owns are left alone on conflict.
 */
function upsertStatement(env: Env, game: IgdbGame, votes: number, force = false) {
  if (!game.first_release_date) return undefined;
  const { developers, publishers } = companies(game);
  const pop = popularityOf(game);
  const check = isEligible(publishers.length ? publishers : developers, pop);
  if (!check.eligible && !force) return undefined;
  const releaseDate = iso(game.first_release_date);

  return env.DB.prepare(
    `INSERT INTO games (id, slug, name, release_date, summary, cover_image_id, developers, publishers, platforms, genres,
                        steam_app_id, official_url, hypes, rating_count, critic_count, eligible_reason, priority)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name, release_date = excluded.release_date, summary = excluded.summary,
       cover_image_id = excluded.cover_image_id, developers = excluded.developers, publishers = excluded.publishers,
       platforms = excluded.platforms, genres = excluded.genres,
       steam_app_id = COALESCE(excluded.steam_app_id, games.steam_app_id),
       official_url = COALESCE(excluded.official_url, games.official_url),
       hypes = excluded.hypes, rating_count = excluded.rating_count, critic_count = excluded.critic_count,
       eligible_reason = excluded.eligible_reason, priority = excluded.priority, updated_at = datetime('now')`,
  ).bind(
    game.id,
    game.slug,
    game.name,
    releaseDate,
    game.summary ?? null,
    game.cover?.image_id ?? null,
    JSON.stringify(developers),
    JSON.stringify(publishers),
    JSON.stringify((game.platforms ?? []).map((p) => p.abbreviation || p.name)),
    JSON.stringify((game.genres ?? []).map((g) => g.name)),
    steamAppId(game) ?? null,
    officialUrl(game) ?? null,
    pop.hypes,
    pop.ratingCount,
    pop.criticCount,
    force && !check.eligible ? "added by hand" : check.reason,
    priority({ releaseDate, pop, votes }),
  );
}

/** Upsert a page of games in two D1 round trips (the free plan allows ~50 queries per request). */
async function upsertGames(env: Env, games: IgdbGame[], force = false) {
  if (!games.length) return 0;
  const ids = games.map((g) => g.id);
  const existing = await env.DB.prepare(
    `SELECT id, votes FROM games WHERE id IN (${ids.map(() => "?").join(",")})`,
  )
    .bind(...ids)
    .all<{ id: number; votes: number }>();
  const votes = new Map(existing.results.map((r) => [r.id, r.votes]));
  let added = 0;
  const statements = [];
  for (const game of games) {
    const statement = upsertStatement(env, game, votes.get(game.id) ?? 0, force);
    if (!statement) continue;
    statements.push(statement);
    if (!votes.has(game.id)) added++;
  }
  if (statements.length) await env.DB.batch(statements);
  return added;
}

/** Games per call. Keeps one invocation inside the free plan's subrequest and D1 query limits. */
export const PAGE = 40;

async function ingestPage(env: Env, from: number, to: number, offset: number) {
  const games = await releasedBetween(env, from, to, PAGE, offset);
  const added = await upsertGames(env, games);
  return {
    seen: games.length,
    added,
    nextOffset: games.length === PAGE ? offset + PAGE : undefined,
  };
}

/** New releases: the last 45 days, refreshed every run so popularity numbers stay current. Page with `offset`. */
export const discoverRecent = (env: Env, offset = 0, now = Math.floor(Date.now() / 1000)) =>
  ingestPage(env, now - 45 * day, now + day, offset);

const getMeta = async (env: Env, key: string) =>
  (
    await env.DB.prepare("SELECT value FROM meta WHERE key = ?")
      .bind(key)
      .first<{ value: string }>()
  )?.value;
const setMeta = (env: Env, key: string, value: string) =>
  env.DB.prepare(
    "INSERT INTO meta (key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = ?2",
  )
    .bind(key, value)
    .run();

/**
 * The backlog walk: one month at a time, newest first, down to `floorYear`.
 * Cursor and offset live in the meta table, so each call does one page and a
 * missed run just resumes.
 */
export async function discoverBacklog(env: Env, floorYear = 2012) {
  const cursorValue = await getMeta(env, "backlog_cursor");
  const cursor = cursorValue ? new Date(cursorValue) : new Date(Date.now() - 45 * day * 1000);
  if (cursor.getUTCFullYear() < floorYear)
    return { done: true, seen: 0, added: 0, cursor: cursorValue };
  const start = new Date(
    Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() - 1, cursor.getUTCDate()),
  );
  const offset = Number((await getMeta(env, "backlog_offset")) ?? 0);
  const page = await ingestPage(
    env,
    Math.floor(start.getTime() / 1000),
    Math.floor(cursor.getTime() / 1000),
    offset,
  );
  if (page.nextOffset !== undefined) {
    await setMeta(env, "backlog_offset", String(page.nextOffset));
  } else {
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO meta (key, value) VALUES ('backlog_cursor', ?1) ON CONFLICT(key) DO UPDATE SET value = ?1",
      ).bind(start.toISOString().slice(0, 10)),
      env.DB.prepare(
        "INSERT INTO meta (key, value) VALUES ('backlog_offset', '0') ON CONFLICT(key) DO UPDATE SET value = '0'",
      ),
    ]);
  }
  return {
    done: false,
    seen: page.seen,
    added: page.added,
    month: start.toISOString().slice(0, 7),
    more: page.nextOffset !== undefined,
  };
}

export async function importGame(env: Env, igdbId: number) {
  const game = await gameById(env, igdbId);
  if (!game) throw new Error(`No IGDB game with id ${igdbId}`);
  await upsertGames(env, [game], true);
  return game;
}
