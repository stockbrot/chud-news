import type { D1Database } from "@cloudflare/workers-types";
import type { Research, Review } from "@/lib/verdict/schema";
import type { SourcePack } from "@/lib/pipeline/sources";
import type { Usage } from "@/lib/pipeline/ai";

export const statuses = [
  "queued",
  "researching",
  "drafted",
  "in_review",
  "approved",
  "published",
  "rejected",
  "skipped",
] as const;
export type Status = (typeof statuses)[number];

/** What the public queue page calls each status. */
export const statusLabel: Record<Status, string> = {
  queued: "In line",
  researching: "Researching",
  drafted: "Writing",
  in_review: "Fact-check",
  approved: "Approved",
  published: "Published",
  rejected: "Sent back",
  skipped: "Skipped",
};

export interface GameRow {
  id: number;
  slug: string;
  name: string;
  release_date: string;
  summary: string | null;
  cover_image_id: string | null;
  developers: string;
  publishers: string;
  platforms: string;
  genres: string;
  steam_app_id: number | null;
  official_url: string | null;
  hypes: number;
  rating_count: number;
  critic_count: number;
  steam_reviews: number | null;
  eligible_reason: string | null;
  status: Status;
  votes: number;
  priority: number;
  published_slug: string | null;
  created_at: string;
  updated_at: string;
}

export interface Game extends Omit<GameRow, "developers" | "publishers" | "platforms" | "genres"> {
  developers: string[];
  publishers: string[];
  platforms: string[];
  genres: string[];
}

const parseList = (value: string | null) => {
  try {
    return JSON.parse(value ?? "[]") as string[];
  } catch {
    return [];
  }
};

export const toGame = (row: GameRow): Game => ({
  ...row,
  developers: parseList(row.developers),
  publishers: parseList(row.publishers),
  platforms: parseList(row.platforms),
  genres: parseList(row.genres),
});

export interface DraftRow {
  id: number;
  game_id: number;
  stage: "researched" | "drafted" | "reviewed" | "approved" | "rejected" | "failed";
  sources: string | null;
  ledger: string | null;
  title: string | null;
  excerpt: string | null;
  body: string | null;
  review: string | null;
  error: string | null;
  cost_usd: number;
  usage: string;
  created_at: string;
  updated_at: string;
}

export interface Draft extends Omit<DraftRow, "sources" | "ledger" | "review" | "usage"> {
  sources?: SourcePack;
  ledger?: Research;
  review?: Review;
  usage: Usage[];
}

const parseJson = <T>(value: string | null): T | undefined => {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};

export const toDraft = (row: DraftRow): Draft => ({
  ...row,
  sources: parseJson(row.sources),
  ledger: parseJson(row.ledger),
  review: parseJson(row.review),
  usage: parseJson<Usage[]>(row.usage) ?? [],
});

export const getGame = async (db: D1Database, id: number) => {
  const row = await db.prepare("SELECT * FROM games WHERE id = ?").bind(id).first<GameRow>();
  return row ? toGame(row) : undefined;
};

export const getDraft = async (db: D1Database, id: number) => {
  const row = await db.prepare("SELECT * FROM drafts WHERE id = ?").bind(id).first<DraftRow>();
  return row ? toDraft(row) : undefined;
};

export const latestDraft = async (db: D1Database, gameId: number) => {
  const row = await db
    .prepare("SELECT * FROM drafts WHERE game_id = ? ORDER BY id DESC LIMIT 1")
    .bind(gameId)
    .first<DraftRow>();
  return row ? toDraft(row) : undefined;
};

export const setStatus = (db: D1Database, id: number, status: Status) =>
  db
    .prepare("UPDATE games SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(status, id)
    .run();

export interface QueueQuery {
  q?: string;
  status?: Status | "active" | "all";
  limit?: number;
  offset?: number;
}

/** "active" = everything not yet published, rejected, or skipped. */
export async function listGames(db: D1Database, query: QueueQuery) {
  const where: string[] = [];
  const binds: unknown[] = [];
  const status = query.status ?? "active";
  if (status === "active")
    where.push("status IN ('queued','researching','drafted','in_review','approved')");
  else if (status !== "all") {
    where.push("status = ?");
    binds.push(status);
  }
  if (query.q?.trim()) {
    where.push("(name LIKE ? OR developers LIKE ? OR publishers LIKE ?)");
    const like = `%${query.q.trim().replace(/[%_]/g, "")}%`;
    binds.push(like, like, like);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const limit = Math.min(query.limit ?? 50, 200);
  const offset = query.offset ?? 0;
  const [rows, count] = await Promise.all([
    db
      .prepare(
        `SELECT * FROM games ${clause}
         ORDER BY CASE status WHEN 'in_review' THEN 0 WHEN 'drafted' THEN 1 WHEN 'researching' THEN 2 WHEN 'approved' THEN 3 ELSE 4 END,
                  priority DESC LIMIT ? OFFSET ?`,
      )
      .bind(...binds, limit, offset)
      .all<GameRow>(),
    db
      .prepare(`SELECT COUNT(*) AS n FROM games ${clause}`)
      .bind(...binds)
      .first<{ n: number }>(),
  ]);
  return { games: rows.results.map(toGame), total: count?.n ?? 0 };
}
