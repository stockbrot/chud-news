import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { setStatus, statuses, type Status } from "@/lib/server/db";
import { runResearch } from "@/lib/server/pipeline";

export const prerender = false;

/** POST { action: "research" } | { action: "status", status } */
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const body = (await request.json()) as { action: string; status?: Status };
    if (body.action === "research") return json(await runResearch(env, id));
    if (body.action === "status" && body.status && statuses.includes(body.status)) {
      await setStatus(env.DB, id, body.status);
      return json({ ok: true });
    }
    return json({ error: "Unknown action" }, 400);
  } catch (error) {
    return errorJson(error);
  }
};
