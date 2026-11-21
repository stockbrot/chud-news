import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { discoverBacklog, discoverRecent } from "@/lib/server/discover";

export const prerender = false;

/**
 * Called by the scheduled GitHub Action (free) with `Authorization: Bearer CRON_SECRET`.
 * ?mode=recent&offset=N pages through new releases; ?mode=backlog does one page of the backlog walk.
 */
export const POST: APIRoute = async ({ request, url }) => {
  if (!env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${env.CRON_SECRET}`) {
    return json({ error: "Unauthorized" }, 401);
  }
  try {
    const mode = url.searchParams.get("mode") ?? "recent";
    if (mode === "backlog") return json(await discoverBacklog(env));
    return json(await discoverRecent(env, Number(url.searchParams.get("offset") ?? 0)));
  } catch (error) {
    return errorJson(error);
  }
};
