import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { topics } from "@/config/topics";
import { platforms } from "@/config/platforms";
import { verdictSchema } from "@/lib/verdict/schema";
import { computeScore } from "@/lib/verdict/score";

const issues = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/issues" }),
  schema: ({ image }) =>
    z.object({
      /** The printed issue number. Drives the index, the archive, and prev/next. */
      issue: z.number().int().positive(),
      title: z.string(),
      /** One or two sentences. Used on every listing, in the feed, and as the meta description. */
      excerpt: z.string(),
      /** One genre or a list, e.g. topic: ["Horror", "Survival"]. */
      topic: z.union([z.enum(topics), z.array(z.enum(topics)).min(1)])
        .transform((value) => [...new Set(Array.isArray(value) ? value : [value])]),
      date: z.coerce.date(),
      /** Platform families, kept separate from the topic/genre taxonomy. */
      platforms: z.array(z.enum(platforms)).default([])
        .transform((value) => [...new Set(value)]),
      updatedDate: z.coerce.date().optional(),
      /** The developer. Developers are the "authors": every verdict lands on their ledger. */
      author: z.object({
        name: z.string(),
        /** Legacy field; displayed roles come from src/config/writers.ts. */
        role: z.string().optional(),
      }),
      /** Defaults to the developer, i.e. self-published. */
      publisher: z.string().optional(),
      igdbId: z.number().int().optional(),
      steamAppId: z.number().int().optional(),
      /** The fact ledger. The score is computed from it and can't be set by hand. */
      verdict: verdictSchema,
      cover: z.object({
        src: image(),
        alt: z.string(),
        creditName: z.string(),
        creditUrl: z.url(),
      }),
      /** Promotes the issue to the top of the front page, ahead of the newest one. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
    .transform((data) => {
      const result = computeScore(data.verdict);
      const publisher = data.publisher ?? data.author.name;
      return {
        ...data,
        publisher,
        selfPublished: publisher === data.author.name,
        result,
        /** The game's current contribution, used everywhere a single number is shown. */
        score: result.current,
      };
    }),
});

export const collections = { issues };
