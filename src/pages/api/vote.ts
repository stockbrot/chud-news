import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { priority } from "@/lib/pipeline/priority";

export const prerender = false;

const sha256 = async (value: string) =>
  [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  return ((await res.json()) as { success: boolean }).success;
}

/**
 * One vote per game per visitor per day. The visitor is a salted hash of IP +
 * user agent: nothing personal is stored, and the salt rotates daily.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { gameId, token } = (await request.json()) as { gameId?: number; token?: string };
    if (!Number.isInteger(gameId)) return json({ error: "gameId required" }, 400);
    const ip = request.headers.get("cf-connecting-ip") ?? "local";
    if (!(await verifyTurnstile(token, ip))) return json({ error: "Bot check failed" }, 403);

    const day = new Date().toISOString().slice(0, 10);
    const voter = await sha256(
      `${env.VOTE_SALT ?? "chud"}|${day}|${ip}|${request.headers.get("user-agent") ?? ""}`,
    );
    const game = await env.DB.prepare(
      "SELECT id, status, release_date, hypes, rating_count, critic_count, steam_reviews, votes FROM games WHERE id = ?",
    )
      .bind(gameId)
      .first<{
        id: number;
        status: string;
        release_date: string;
        hypes: number;
        rating_count: number;
        critic_count: number;
        steam_reviews: number | null;
        votes: number;
      }>();
    if (!game) return json({ error: "Unknown game" }, 404);
    if (game.status === "published") return json({ error: "Already reviewed" }, 409);

    const inserted = await env.DB.prepare(
      "INSERT OR IGNORE INTO votes (game_id, voter, day) VALUES (?, ?, ?)",
    )
      .bind(gameId, voter, day)
      .run();
    if (!inserted.meta.changes)
      return json({ error: "You already voted for this one today", votes: game.votes }, 429);

    const votes = game.votes + 1;
    const newPriority = priority({
      releaseDate: game.release_date,
      pop: {
        hypes: game.hypes,
        ratingCount: game.rating_count,
        criticCount: game.critic_count,
        steamReviews: game.steam_reviews ?? undefined,
      },
      votes,
    });
    await env.DB.prepare("UPDATE games SET votes = ?, priority = ? WHERE id = ?")
      .bind(votes, newPriority, gameId)
      .run();
    return json({ votes });
  } catch (error) {
    return errorJson(error);
  }
};
