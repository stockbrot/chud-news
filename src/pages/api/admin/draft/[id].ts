import type { APIRoute } from "astro";
import { env, errorJson, json } from "@/lib/server/env";
import { approve, reject, runDraft, runReview, saveEdits, type Edits } from "@/lib/server/pipeline";

export const prerender = false;

/** POST { action: "draft" | "review" | "save" | "approve" | "reject", ...edits } */
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const id = Number(params.id);
    const { action, ...edits } = (await request.json()) as { action: string } & Edits;
    switch (action) {
      case "draft":
        return json(await runDraft(env, id));
      case "review":
        return json(await runReview(env, id));
      case "save":
        return json(await saveEdits(env, id, edits));
      case "approve":
        if (edits.title || edits.body || edits.ledger || edits.excerpt)
          await saveEdits(env, id, edits);
        return json(await approve(env, id));
      case "reject":
        await reject(env, id);
        return json({ ok: true });
      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (error) {
    return errorJson(error, 400);
  }
};
