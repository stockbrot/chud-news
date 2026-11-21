import { z } from "astro/zod";
import {
  monetizationFlags,
  promiseCategories,
  promiseVerdicts,
  promiseWeights,
  stabilityLevels,
  type Verdict,
} from "./types";

/** Models like to send null for "unknown"; the scorer wants undefined. */
const opt = <T extends z.ZodType>(schema: T) =>
  schema.nullish().transform((value) => value ?? undefined);

/* YAML turns bare 2026-01-31 into a Date; JSON keeps a string. Normalise both. */
const date = z
  .union([z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Use YYYY-MM-DD"), z.date()])
  .transform((value) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value.slice(0, 10),
  );

export const evidenceSchema = z.object({
  url: z.url(),
  quote: opt(z.string()),
  date: opt(
    z
      .union([z.string(), z.date()])
      .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v)),
  ),
});

export const promiseSchema = z
  .object({
    claim: z.string().min(3),
    category: z.enum(promiseCategories),
    weight: z.enum(promiseWeights),
    verdict: z.enum(promiseVerdicts),
    source: evidenceSchema,
    evidence: z.array(evidenceSchema).default([]),
    note: opt(z.string()),
  })
  /* A verdict with nothing behind it can't cost the developer anything. */
  .transform((promise) =>
    promise.verdict !== "unverified" && promise.evidence.length === 0
      ? { ...promise, verdict: "unverified" as const }
      : promise,
  );

export const verdictSchema = z.object({
  releaseDate: date,
  assessedPlatforms: z.array(z.string()).default([]),
  assessedVersion: opt(z.string()),
  promises: z.array(promiseSchema).default([]),
  monetization: z
    .array(
      z.object({
        flag: z.enum(monetizationFlags),
        owner: z.enum(["developer", "publisher"]),
        severity: z.enum(["minor", "major"]),
        evidence: z.array(evidenceSchema).min(1),
        note: opt(z.string()),
      }),
    )
    .default([]),
  stability: z.object({
    level: z.enum(stabilityLevels),
    fixedWithinWindow: z.boolean().default(false),
    note: opt(z.string()),
    issues: z
      .array(
        z.object({
          summary: z.string(),
          platforms: opt(z.array(z.string())),
          evidence: z.array(evidenceSchema).default([]),
        }),
      )
      .default([]),
  }),
  reception: z.object({
    critic: opt(z.number().min(0).max(100)),
    users: opt(z.number().min(0).max(100)),
    sources: z.array(evidenceSchema).default([]),
  }),
  value: z
    .object({
      launchPriceUsd: opt(z.number().min(0)),
      mainStoryHours: opt(z.number().min(0)),
      note: opt(z.string()),
    })
    .default({ launchPriceUsd: undefined, mainStoryHours: undefined, note: undefined }),
  editorial: opt(z.object({ adjustment: z.number(), reason: z.string().min(10) })),
  repair: opt(z.object({ date, summary: z.string(), evidence: z.array(evidenceSchema).min(1) })),
  confidence: z.enum(["low", "medium", "high"]).default("medium"),
}) satisfies z.ZodType<Verdict, unknown>;

/** Research output: the verdict plus the identity fields the queue already knows. */
export const researchSchema = verdictSchema.extend({
  game: z.string(),
  developer: z.string(),
  publisher: z.string(),
});
export type Research = z.infer<typeof researchSchema>;

export const reviewSchema = z.object({
  pass: z.boolean(),
  unsupportedClaims: z.array(z.string()).default([]),
  ledgerConcerns: z.array(z.string()).default([]),
  toneIssues: z.array(z.string()).default([]),
  fixes: z.array(z.string()).default([]),
  confidence: z.enum(["low", "medium", "high"]).default("medium"),
});
export type Review = z.infer<typeof reviewSchema>;
