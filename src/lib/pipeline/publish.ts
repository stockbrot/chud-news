import { stringify } from "yaml";
import type { Topic } from "@/config/topics";
import type { Platform } from "@/config/platforms";
import type { Research } from "@/lib/verdict/schema";
import { aliasCompany } from "./companies";

/**
 * Turns an approved draft into the files the static site builds from. Pure
 * functions only, so the Worker, the CLI and tests share them.
 */

const genreTopics: [RegExp, Topic][] = [
  [/role-playing|rpg/i, "RPG"],
  [/shooter/i, "Shooter"],
  [/horror/i, "Horror"],
  [/survival/i, "Survival"],
  [/strategy|tactic|moba|real time|turn-based/i, "Strategy"],
  [/simulat/i, "Simulation"],
  [/racing/i, "Racing"],
  [/sport/i, "Sports"],
  [/fighting/i, "Fighting"],
  [/platform/i, "Platformer"],
  [/puzzle/i, "Puzzle"],
  [/adventure|hack and slash|action/i, "Action Adventure"],
];

export const topicsFor = (genres: string[], themes: string[] = []): Topic[] => {
  const found = new Set<Topic>();
  for (const label of [...themes, ...genres]) {
    for (const [pattern, topic] of genreTopics) if (pattern.test(label)) found.add(topic);
  }
  return found.size ? [...found].slice(0, 3) : ["Action Adventure"];
};

export const platformFamilies = (platforms: string[]): Platform[] => {
  const found = new Set<Platform>();
  for (const p of platforms) {
    if (/ps\d|playstation/i.test(p)) found.add("PlayStation");
    else if (/xbox|xone|series/i.test(p)) found.add("Xbox");
    else if (/switch|nintendo|wii|3ds/i.test(p)) found.add("Nintendo");
    else if (/pc|windows|win|mac|linux|steam/i.test(p)) found.add("PC");
  }
  return [...found];
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface PublishInput {
  issue: number;
  title: string;
  excerpt: string;
  body: string;
  ledger: Research;
  genres: string[];
  platforms: string[];
  igdbId?: number;
  steamAppId?: number;
  coverCredit: { name: string; url: string };
  date?: string;
}

/** Drops undefined/null so the YAML stays tidy and round-trips through the schema. */
const clean = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value, (_, v) => (v === null ? undefined : v)));

/** `canonical` maps IGDB company names to the site's profile names. */
export function buildMdx(input: PublishInput, canonical: (name: string) => string = aliasCompany) {
  const { ledger } = input;
  const developer = canonical(ledger.developer);
  const publisher = canonical(ledger.publisher);
  const { game: _game, developer: _dev, publisher: _pub, ...verdict } = ledger;
  const frontmatter = clean({
    issue: input.issue,
    title: input.title,
    excerpt: input.excerpt,
    topic: topicsFor(input.genres),
    platforms: platformFamilies([...input.platforms, ...ledger.assessedPlatforms]),
    date: input.date ?? new Date().toISOString().slice(0, 10),
    author: { name: developer },
    ...(publisher !== developer ? { publisher } : {}),
    igdbId: input.igdbId,
    steamAppId: input.steamAppId,
    cover: {
      src: "./cover.jpg",
      alt: `Cover art for ${input.title}`,
      creditName: input.coverCredit.name,
      creditUrl: input.coverCredit.url,
    },
    verdict,
  });
  return `---\n${stringify(frontmatter, { lineWidth: 0 })}---\n\n${input.body.trim()}\n`;
}
