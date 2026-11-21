import type { Env } from "./env";

/**
 * Commits published verdicts straight to the repo, so the Git integration
 * rebuilds the site. Every score change is then a reviewable commit.
 */

const api = (env: Env, path: string, init: RequestInit = {}) =>
  fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "chud-news-publisher",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });

export const canCommit = (env: Env) => Boolean(env.GITHUB_TOKEN && env.GITHUB_REPO);

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000)
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
};

export async function commitFile(
  env: Env,
  path: string,
  content: string | Uint8Array,
  message: string,
) {
  const branch = env.GITHUB_BRANCH || "main";
  const existing = await api(env, `contents/${path}?ref=${branch}`);
  const sha = existing.ok ? ((await existing.json()) as { sha: string }).sha : undefined;
  const bytes = typeof content === "string" ? new TextEncoder().encode(content) : content;
  const res = await api(env, `contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: toBase64(bytes), branch, ...(sha ? { sha } : {}) }),
  });
  if (!res.ok)
    throw new Error(`GitHub commit of ${path} failed: ${res.status} ${await res.text()}`);
}

/** Next issue number = number of review folders + 1. */
export async function nextIssueNumber(env: Env) {
  const res = await api(env, `contents/src/content/issues?ref=${env.GITHUB_BRANCH || "main"}`);
  if (!res.ok) throw new Error(`Couldn't list issues: ${res.status}`);
  const entries = (await res.json()) as { type: string }[];
  return entries.filter((e) => e.type === "dir").length + 1;
}
