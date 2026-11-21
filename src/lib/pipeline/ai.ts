import Anthropic from "@anthropic-ai/sdk";
import { DRAFT_PROMPT, RESEARCH_PROMPT, REVIEW_PROMPT } from "./prompts";
import { formatSources, type SourcePack } from "./sources";
import { researchSchema, reviewSchema, type Research, type Review } from "@/lib/verdict/schema";
import { computeScore } from "@/lib/verdict/score";

export interface AiEnv {
  ANTHROPIC_API_KEY: string;
  /** Defaults to Claude Haiku 5.5 for every stage. Research benefits most from a bigger model. */
  RESEARCH_MODEL?: string;
  DRAFT_MODEL?: string;
  REVIEW_MODEL?: string;
}

const DEFAULT_MODEL = "claude-haiku-5-5";

/** Price per million tokens, for the cost column in the dashboard. */
const PRICES: Record<string, [input: number, output: number]> = {
  "claude-haiku-5-5": [0.1, 0.5],
  "claude-sonnet-5-5": [2, 10],
  "claude-opus-5-5": [4, 20],
};

export interface Usage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  webSearches: number;
  costUsd: number;
}

/* The dynamic-filtering web tools need a bigger model; Haiku gets the basic ones. */
const webTools = (model: string, searches: number, fetches: number): Anthropic.ToolUnion[] => {
  const modern = /sonnet-5|opus-5|fable|mythos/.test(model);
  const tools: Anthropic.ToolUnion[] = [];
  if (searches) {
    tools.push({
      type: modern ? "web_search_20260209" : "web_search_20250305",
      name: "web_search",
      max_uses: searches,
    } as Anthropic.ToolUnion);
  }
  if (fetches) {
    tools.push({
      type: modern ? "web_fetch_20260209" : "web_fetch_20250910",
      name: "web_fetch",
      max_uses: fetches,
    } as Anthropic.ToolUnion);
  }
  return tools;
};

const textOf = (message: Anthropic.Message) =>
  message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

/** Models sometimes wrap JSON in a fence or add a sentence; take the outermost object. */
export const extractJson = (text: string) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("No JSON object in model output");
  return JSON.parse(text.slice(start, end + 1));
};

/**
 * One request, continued through `pause_turn` (server tools can pause long
 * turns). Returns the final message plus summed usage.
 */
async function run(
  env: AiEnv,
  model: string,
  system: string,
  messages: Anthropic.MessageParam[],
  tools: Anthropic.ToolUnion[] = [],
  maxTokens = 16000,
) {
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const usage: Usage = { model, inputTokens: 0, outputTokens: 0, webSearches: 0, costUsd: 0 };
  const history = [...messages];

  for (let turn = 0; turn < 6; turn++) {
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: history,
      ...(tools.length ? { tools } : {}),
    });
    usage.inputTokens +=
      message.usage.input_tokens +
      (message.usage.cache_read_input_tokens ?? 0) +
      (message.usage.cache_creation_input_tokens ?? 0);
    usage.outputTokens += message.usage.output_tokens;
    usage.webSearches += message.usage.server_tool_use?.web_search_requests ?? 0;

    if (message.stop_reason === "refusal") throw new Error("Model declined the request");
    if (message.stop_reason === "pause_turn") {
      history.push({ role: "assistant", content: message.content });
      continue;
    }
    const [inPrice, outPrice] = PRICES[model] ?? PRICES[DEFAULT_MODEL];
    /* Web search bills $10 per 1,000 searches on top of tokens. */
    usage.costUsd =
      (usage.inputTokens * inPrice + usage.outputTokens * outPrice) / 1e6 +
      usage.webSearches * 0.01;
    return { message, usage, history };
  }
  throw new Error("Model kept pausing; giving up after 6 turns");
}

/** Parse + validate JSON output, giving the model one chance to repair it. */
async function runJson<T>(
  env: AiEnv,
  model: string,
  system: string,
  user: string,
  parse: (value: unknown) => T,
  tools: Anthropic.ToolUnion[] = [],
) {
  const first = await run(env, model, system, [{ role: "user", content: user }], tools);
  try {
    return { value: parse(extractJson(textOf(first.message))), usage: first.usage };
  } catch (error) {
    const retry = await run(
      env,
      model,
      system,
      [
        ...first.history,
        { role: "assistant", content: first.message.content },
        {
          role: "user",
          content: `Your output didn't validate: ${(error as Error).message.slice(0, 1500)}\nReturn the corrected JSON object only.`,
        },
      ],
      tools,
    );
    const usage = {
      ...retry.usage,
      inputTokens: first.usage.inputTokens + retry.usage.inputTokens,
      outputTokens: first.usage.outputTokens + retry.usage.outputTokens,
      webSearches: first.usage.webSearches,
      costUsd: first.usage.costUsd + retry.usage.costUsd,
    };
    return { value: parse(extractJson(textOf(retry.message))), usage };
  }
}

export interface GameBrief {
  name: string;
  developers: string[];
  publishers: string[];
  releaseDate: string;
  platforms: string[];
  summary?: string;
}

export async function research(env: AiEnv, game: GameBrief, sources: SourcePack) {
  const model = env.RESEARCH_MODEL || DEFAULT_MODEL;
  const user = `Today is ${new Date().toISOString().slice(0, 10)}.

Game: ${game.name}
Developer(s): ${game.developers.join(", ") || "unknown"}
Publisher(s): ${game.publishers.join(", ") || "unknown"}
Release date: ${game.releaseDate}
Platforms: ${game.platforms.join(", ")}
${game.summary ? `Official summary: ${game.summary}\n` : ""}
## Pre-fetched sources (fetched by code, safe to cite with the URLs given)

${formatSources(sources)}

Use these first for promises, then web search for reviews, reception, monetization and stability.`;
  return runJson<Research>(
    env,
    model,
    RESEARCH_PROMPT,
    user,
    (v) => researchSchema.parse(v),
    webTools(model, 12, 6),
  );
}

export interface Draft {
  title: string;
  excerpt: string;
  body: string;
}

export async function draft(env: AiEnv, ledger: Research) {
  const model = env.DRAFT_MODEL || DEFAULT_MODEL;
  const score = computeScore(ledger);
  const user = `## Ledger\n${JSON.stringify(ledger, null, 2)}\n\n## Computed score\nLaunch verdict: ${score.launch}\n${score.lines
    .map((l) => `- ${l.label}: ${l.points} (${l.detail})`)
    .join("\n")}`;
  const { message, usage } = await run(env, model, DRAFT_PROMPT, [{ role: "user", content: user }]);
  return { value: parseDraft(textOf(message), ledger.game), usage };
}

export const parseDraft = (text: string, fallbackTitle: string): Draft => {
  const [body, metaText = ""] = text.split("---META---");
  let meta: Partial<Draft> = {};
  try {
    meta = extractJson(metaText);
  } catch {
    /* Title and excerpt can be filled in by hand in the dashboard. */
  }
  return {
    title: meta.title?.trim() || fallbackTitle,
    excerpt: meta.excerpt?.trim() || "",
    body: body.trim(),
  };
};

export async function review(env: AiEnv, ledger: Research, article: Draft) {
  const model = env.REVIEW_MODEL || DEFAULT_MODEL;
  const user = `## Ledger\n${JSON.stringify(ledger, null, 2)}\n\n## Draft\nTitle: ${article.title}\nExcerpt: ${article.excerpt}\n\n${article.body}\n\nYou may fetch up to 5 of the ledger's evidence URLs to spot-check the weakest verdicts.`;
  return runJson<Review>(
    env,
    model,
    REVIEW_PROMPT,
    user,
    (v) => reviewSchema.parse(v),
    webTools(model, 0, 5),
  );
}
