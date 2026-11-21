import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { listGames, statusLabel, statuses, type Status } from "@/lib/server/db";
import { coverUrl } from "@/lib/pipeline/igdb";

export const prerender = false;

/** Public, searchable queue. Only fields safe to show the world. */
export const GET: APIRoute = async ({ url }) => {
  try {
    const statusParam = url.searchParams.get("status") ?? "active";
    const status =
      (statuses as readonly string[]).includes(statusParam) || statusParam === "all"
        ? statusParam
        : "active";
    const { games, total } = await listGames(env.DB, {
      q: url.searchParams.get("q") ?? undefined,
      status: status as Status | "active" | "all",
      limit: Number(url.searchParams.get("limit") ?? 50),
      offset: Number(url.searchParams.get("offset") ?? 0),
    });
    return json({
      total,
      games: games.map((g) => ({
        id: g.id,
        name: g.name,
        releaseDate: g.release_date,
        developers: g.developers,
        publishers: g.publishers,
        platforms: g.platforms,
        cover: g.cover_image_id ? coverUrl(g.cover_image_id, "cover_big") : null,
        status: g.status,
        statusLabel: statusLabel[g.status],
        votes: g.votes,
        publishedSlug: g.published_slug,
      })),
    });
  } catch (error) {
    return errorJson(error);
  }
};
