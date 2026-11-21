/**
 * The verdict data model. Research produces it, the scorer turns it into a
 * number, and the review page renders it. The model never picks the score:
 * `computeScore` in `./score.ts` does, from these facts.
 */

export const promiseCategories = [
  "feature",
  "content",
  "performance",
  "platform",
  "price",
  "story",
  "multiplayer",
] as const;
export type PromiseCategory = (typeof promiseCategories)[number];

/** How loudly it was sold. A headline promise is in the reveal trailer or on the store banner. */
export const promiseWeights = ["headline", "major", "minor"] as const;
export type PromiseWeight = (typeof promiseWeights)[number];

export const promiseVerdicts = [
  /** Shipped as shown. */
  "delivered",
  /** Shipped, but noticeably smaller, worse or narrower than shown. */
  "partial",
  /** Not in the game at launch and not added within the 14-day window. */
  "cut",
  /** Shown or worded in a way the shipped game contradicts (downgrades, fake footage, "no microtransactions" then microtransactions). */
  "misleading",
  /** Missing at launch, added free within the 14-day window. */
  "delivered_late",
  /** Couldn't be confirmed either way. Never costs points. */
  "unverified",
] as const;
export type PromiseVerdict = (typeof promiseVerdicts)[number];

export interface Evidence {
  url: string;
  /** Short verbatim quote or a one-line description of what the source shows. */
  quote?: string;
  /** Date of the source (YYYY-MM-DD) when known. */
  date?: string;
}

export interface GamePromise {
  claim: string;
  category: PromiseCategory;
  weight: PromiseWeight;
  verdict: PromiseVerdict;
  /** Where the promise was made: trailer, store page, interview. */
  source: Evidence;
  /** What shows whether it shipped. Required for any verdict except "unverified". */
  evidence: Evidence[];
  note?: string;
}

export const monetizationFlags = [
  "pay_to_win",
  "loot_boxes",
  "cut_content_dlc",
  "marketed_content_paywalled",
  "premium_with_mtx",
  "battle_pass_in_premium",
  "preorder_exclusive_gameplay",
  "forced_online",
  "currency_pack_mismatch",
  "content_removed",
  "invasive_drm",
] as const;
export type MonetizationFlag = (typeof monetizationFlags)[number];

export interface MonetizationIssue {
  flag: MonetizationFlag;
  /** Who made the call. Usually the publisher; it decides which ledger pays. */
  owner: "developer" | "publisher";
  severity: "minor" | "major";
  evidence: Evidence[];
  note?: string;
}

export const stabilityLevels = ["solid", "minor_issues", "buggy", "broken", "unplayable"] as const;
export type StabilityLevel = (typeof stabilityLevels)[number];

export interface Stability {
  level: StabilityLevel;
  /** True when the problems that set `level` were verified fixed by day 14. Only softens minor issues. */
  fixedWithinWindow: boolean;
  /** Editor's note when the level was set or changed by a human. */
  note?: string;
  issues: { summary: string; platforms?: string[]; evidence: Evidence[] }[];
}

/** Aggregate reception, 0–100. A consensus proxy for "is it actually good", not our taste. */
export interface Reception {
  critic?: number;
  users?: number;
  sources: Evidence[];
}

export interface Value {
  launchPriceUsd?: number;
  mainStoryHours?: number;
  note?: string;
}

/** A bounded human call, shown separately and always explained. */
export interface Editorial {
  adjustment: number;
  reason: string;
}

/** One substantial free repair after a failed launch. */
export interface Repair {
  date: string;
  summary: string;
  evidence: Evidence[];
}

export interface Verdict {
  releaseDate: string;
  assessedPlatforms: string[];
  assessedVersion?: string;
  promises: GamePromise[];
  monetization: MonetizationIssue[];
  stability: Stability;
  reception: Reception;
  value: Value;
  editorial?: Editorial;
  repair?: Repair;
  confidence: "low" | "medium" | "high";
}
