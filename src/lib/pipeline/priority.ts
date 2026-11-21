import type { IgdbGame } from "./igdb";

/** Big publishers whose releases always qualify, popular or not. Lowercase substrings. */
export const majorPublishers = [
  "sony",
  "microsoft",
  "xbox game studios",
  "nintendo",
  "electronic arts",
  "ubisoft",
  "activision",
  "blizzard",
  "bethesda",
  "take-two",
  "2k",
  "rockstar",
  "square enix",
  "capcom",
  "sega",
  "bandai namco",
  "konami",
  "warner bros",
  "embracer",
  "plaion",
  "deep silver",
  "thq nordic",
  "focus entertainment",
  "cd projekt",
  "tencent",
  "netease",
  "krafton",
  "nexon",
  "epic games",
  "valve",
  "paradox",
  "devolver",
  "annapurna",
  "remedy",
  "io interactive",
  "techland",
  "kadokawa",
  "koei tecmo",
  "level-5",
  "nacon",
  "505 games",
  "skybound",
  "hoyoverse",
  "miHoYo",
  "smilegate",
  "pearl abyss",
  "ncsoft",
];

export interface Popularity {
  hypes: number;
  ratingCount: number;
  criticCount: number;
  steamReviews?: number;
}

export const popularityOf = (game: IgdbGame, steamReviews?: number): Popularity => ({
  hypes: game.hypes ?? 0,
  ratingCount: game.total_rating_count ?? 0,
  criticCount: game.aggregated_rating_count ?? 0,
  steamReviews,
});

/** Indies only get in when people actually care. */
export const thresholds = { hypes: 25, ratingCount: 40, criticCount: 8, steamReviews: 2000 };

export function isEligible(publishers: string[], pop: Popularity) {
  const major = publishers.some((p) =>
    majorPublishers.some((m) => p.toLowerCase().includes(m.toLowerCase())),
  );
  if (major) return { eligible: true, reason: "major publisher" };
  if (pop.hypes >= thresholds.hypes) return { eligible: true, reason: `hyped (${pop.hypes})` };
  if (pop.criticCount >= thresholds.criticCount)
    return { eligible: true, reason: `${pop.criticCount} critic reviews` };
  if (pop.ratingCount >= thresholds.ratingCount)
    return { eligible: true, reason: `${pop.ratingCount} ratings` };
  if ((pop.steamReviews ?? 0) >= thresholds.steamReviews)
    return { eligible: true, reason: `${pop.steamReviews} Steam reviews` };
  return { eligible: false, reason: "not popular enough" };
}

/** Days after release before a verdict: the patch window from the scoring guide. */
export const PATCH_WINDOW_DAYS = 14;

/**
 * Queue order. Recent, popular, voted-up games first; the backlog still drains
 * because age only slowly reduces priority. Votes are log-scaled so a brigade
 * can bump a game but not bury everything else.
 */
export function priority(opts: {
  releaseDate: string;
  pop: Popularity;
  votes: number;
  now?: number;
}) {
  const now = opts.now ?? Date.now();
  const ageDays = Math.max(0, (now - Date.parse(opts.releaseDate)) / 86_400_000);
  const recency = 100 / (1 + ageDays / 60);
  const popularity =
    10 * Math.log10(1 + opts.pop.hypes) +
    8 * Math.log10(1 + opts.pop.ratingCount) +
    10 * Math.log10(1 + opts.pop.criticCount) +
    6 * Math.log10(1 + (opts.pop.steamReviews ?? 0));
  const votes = 25 * Math.log2(1 + opts.votes);
  return Math.round((recency + popularity + votes) * 10) / 10;
}

export const reviewableFrom = (releaseDate: string) =>
  new Date(Date.parse(releaseDate) + PATCH_WINDOW_DAYS * 86_400_000).toISOString().slice(0, 10);
