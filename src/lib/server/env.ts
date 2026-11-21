import type { D1Database } from "@cloudflare/workers-types";
import { env as cfEnv } from "cloudflare:workers";
import type { AiEnv } from "@/lib/pipeline/ai";
import type { IgdbEnv } from "@/lib/pipeline/igdb";

export interface Env extends AiEnv, IgdbEnv {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
  CRON_SECRET?: string;
  VOTE_SALT?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_SITE_KEY?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
}

export const env = cfEnv as unknown as Env;

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const errorJson = (error: unknown, status = 500) =>
  json({ error: error instanceof Error ? error.message : String(error) }, status);
