import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { importGame } from "@/lib/server/discover";
import { searchGames, companies } from "@/lib/pipeline/igdb";

export const prerender = false;

/** GET ?q= searches IGDB; POST { igdbId } adds a game regardless of popularity. */
export const GET: APIRoute = async ({ url }) => {
  try {
    const results = await searchGames(env, url.searchParams.get("q") ?? "");
    return json(
      results.map((g) => ({
        id: g.id,
        name: g.name,
        year: g.first_release_date ? new Date(g.first_release_date * 1000).getUTCFullYear() : null,
        ...companies(g),
      })),
    );
  } catch (error) {
    return errorJson(error);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { igdbId } = (await request.json()) as { igdbId: number };
    const game = await importGame(env, Number(igdbId));
    return json({ id: game.id, name: game.name });
  } catch (error) {
    return errorJson(error, 400);
  }
};
