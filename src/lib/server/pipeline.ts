import {
  draft as writeArticle,
  research,
  review as factCheck,
  type Usage,
} from "@/lib/pipeline/ai";
import { gatherSources } from "@/lib/pipeline/sources";
import { buildMdx, slugify } from "@/lib/pipeline/publish";
import { coverUrl } from "@/lib/pipeline/igdb";
import { z } from "astro/zod";
import { researchSchema } from "@/lib/verdict/schema";
import { getDraft, getGame, setStatus, type Draft, type Game } from "./db";
import { canCommit, commitFile, nextIssueNumber } from "./github";
import type { Env } from "./env";
import { canonicalCompany } from "./companies";

/**
 * The three model stages, each a separate request so none runs long enough to
 * hit a Worker limit. The dashboard calls them in order; a failed stage can be
 * re-run without redoing the earlier ones.
 */

const addUsage = (draft: Draft, usage: Usage) => ({
  usage: JSON.stringify([...draft.usage, usage]),
  cost: draft.cost_usd + usage.costUsd,
});

async function fail(env: Env, gameId: number, draftId: number | undefined, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (draftId) {
    await env.DB.prepare(
      "UPDATE drafts SET stage = 'failed', error = ?, updated_at = datetime('now') WHERE id = ?",
    )
      .bind(message, draftId)
      .run();
  }
  await setStatus(env.DB, gameId, "queued");
  throw error;
}

export async function runResearch(env: Env, gameId: number) {
  const game = await getGame(env.DB, gameId);
  if (!game) throw new Error("Game not found");
  if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY isn't set");
  await setStatus(env.DB, gameId, "researching");
  const inserted = await env.DB.prepare(
    "INSERT INTO drafts (game_id, stage) VALUES (?, 'researched') RETURNING id",
  )
    .bind(gameId)
    .first<{ id: number }>();
  const draftId = inserted!.id;
  try {
    const sources = await gatherSources({
      steamAppId: game.steam_app_id ?? undefined,
      officialUrl: game.official_url ?? undefined,
      releaseDate: game.release_date,
    });
    const { value, usage } = await research(
      env,
      {
        name: game.name,
        developers: game.developers,
        publishers: game.publishers,
        releaseDate: game.release_date,
        platforms: game.platforms,
        summary: game.summary ?? undefined,
      },
      sources,
    );
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE drafts SET sources = ?, ledger = ?, usage = ?, cost_usd = ?, updated_at = datetime('now') WHERE id = ?",
      ).bind(
        JSON.stringify(sources),
        JSON.stringify(value),
        JSON.stringify([usage]),
        usage.costUsd,
        draftId,
      ),
      env.DB.prepare(
        "UPDATE games SET steam_reviews = COALESCE(?, steam_reviews) WHERE id = ?",
      ).bind(sources.steam?.reviewCount ?? null, gameId),
    ]);
    return { draftId, ledger: value, usage };
  } catch (error) {
    return fail(env, gameId, draftId, error);
  }
}

export async function runDraft(env: Env, draftId: number) {
  const current = await getDraft(env.DB, draftId);
  if (!current?.ledger) throw new Error("Draft has no ledger yet: run research first");
  try {
    const { value, usage } = await writeArticle(env, current.ledger);
    const { usage: usageJson, cost } = addUsage(current, usage);
    await env.DB.prepare(
      "UPDATE drafts SET stage = 'drafted', title = ?, excerpt = ?, body = ?, usage = ?, cost_usd = ?, error = NULL, updated_at = datetime('now') WHERE id = ?",
    )
      .bind(value.title, value.excerpt, value.body, usageJson, cost, draftId)
      .run();
    await setStatus(env.DB, current.game_id, "drafted");
    return { draftId, article: value, usage };
  } catch (error) {
    return fail(env, current.game_id, draftId, error);
  }
}

export async function runReview(env: Env, draftId: number) {
  const current = await getDraft(env.DB, draftId);
  if (!current?.ledger || !current.body) throw new Error("Nothing to review yet");
  try {
    const { value, usage } = await factCheck(env, current.ledger, {
      title: current.title ?? "",
      excerpt: current.excerpt ?? "",
      body: current.body,
    });
    const { usage: usageJson, cost } = addUsage(current, usage);
    await env.DB.prepare(
      "UPDATE drafts SET stage = 'reviewed', review = ?, usage = ?, cost_usd = ?, error = NULL, updated_at = datetime('now') WHERE id = ?",
    )
      .bind(JSON.stringify(value), usageJson, cost, draftId)
      .run();
    await setStatus(env.DB, current.game_id, "in_review");
    return { draftId, review: value, usage };
  } catch (error) {
    return fail(env, current.game_id, draftId, error);
  }
}

export interface Edits {
  title?: string;
  excerpt?: string;
  body?: string;
  ledger?: unknown;
}

/** Save hand edits. The ledger is re-validated so the score stays computable. */
export async function saveEdits(env: Env, draftId: number, edits: Edits) {
  const current = await getDraft(env.DB, draftId);
  if (!current) throw new Error("Draft not found");
  let ledger = current.ledger;
  if (edits.ledger) {
    const parsed = researchSchema.safeParse(edits.ledger);
    if (!parsed.success) throw new Error(`Ledger is invalid:\n${z.prettifyError(parsed.error)}`);
    ledger = parsed.data;
  }
  await env.DB.prepare(
    "UPDATE drafts SET title = ?, excerpt = ?, body = ?, ledger = ?, updated_at = datetime('now') WHERE id = ?",
  )
    .bind(
      edits.title ?? current.title,
      edits.excerpt ?? current.excerpt,
      edits.body ?? current.body,
      JSON.stringify(ledger),
      draftId,
    )
    .run();
  return getDraft(env.DB, draftId);
}

export const folderFor = (game: Game) => slugify(game.name) || game.slug;

/**
 * Approve: mark it, and if a GitHub token is configured, commit the review so
 * the site rebuilds. Without a token, `npm run publish:approved` writes the
 * files locally for a manual push.
 */
export async function approve(env: Env, draftId: number) {
  const current = await getDraft(env.DB, draftId);
  if (!current?.ledger || !current.body || !current.title) throw new Error("Draft isn't complete");
  const game = await getGame(env.DB, current.game_id);
  if (!game) throw new Error("Game not found");

  await env.DB.prepare(
    "UPDATE drafts SET stage = 'approved', updated_at = datetime('now') WHERE id = ?",
  )
    .bind(draftId)
    .run();
  await setStatus(env.DB, game.id, "approved");
  if (!canCommit(env)) return { published: false, folder: folderFor(game) };

  const folder = folderFor(game);
  const mdx = buildMdx(
    {
      issue: await nextIssueNumber(env),
      title: current.title,
      excerpt: current.excerpt ?? "",
      body: current.body,
      ledger: current.ledger,
      genres: game.genres,
      platforms: game.platforms,
      igdbId: game.id,
      steamAppId: game.steam_app_id ?? undefined,
      coverCredit: {
        name: game.publishers[0] ?? game.developers[0] ?? game.name,
        url: `https://www.igdb.com/games/${game.slug}`,
      },
    },
    canonicalCompany,
  );
  if (game.cover_image_id) {
    const cover = await fetch(coverUrl(game.cover_image_id, "1080p"));
    if (cover.ok) {
      await commitFile(
        env,
        `src/content/issues/${folder}/cover.jpg`,
        new Uint8Array(await cover.arrayBuffer()),
        `Cover for ${game.name}`,
      );
    }
  }
  await commitFile(env, `src/content/issues/${folder}/index.mdx`, mdx, `Verdict: ${game.name}`);
  await env.DB.prepare(
    "UPDATE games SET status = 'published', published_slug = ?, updated_at = datetime('now') WHERE id = ?",
  )
    .bind(folder, game.id)
    .run();
  return { published: true, folder };
}

export async function reject(env: Env, draftId: number) {
  const current = await getDraft(env.DB, draftId);
  if (!current) throw new Error("Draft not found");
  await env.DB.prepare(
    "UPDATE drafts SET stage = 'rejected', updated_at = datetime('now') WHERE id = ?",
  )
    .bind(draftId)
    .run();
  await setStatus(env.DB, current.game_id, "rejected");
}
