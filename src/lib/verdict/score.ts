import type {
  GamePromise,
  MonetizationFlag,
  PromiseVerdict,
  PromiseWeight,
  StabilityLevel,
  Verdict,
} from "./types";

/**
 * Every number that turns facts into points lives here. Change a weight and
 * the whole archive rescored the same way on the next build: no game gets a
 * special rate.
 */
export const scoring = {
  version: "3.0",
  developerBase: 1000,
  range: { min: -150, max: 50 },

  weight: { headline: 3, major: 2, minor: 1 } satisfies Record<PromiseWeight, number>,
  verdictValue: {
    delivered: 1,
    delivered_late: 0.5,
    partial: 0,
    cut: -1,
    misleading: -1.5,
    unverified: 0,
  } satisfies Record<PromiseVerdict, number>,
  /** Delivery ratio of 1 earns this much; a fully broken promise list loses `deliveryMin`. */
  deliveryMax: 20,
  deliveryMin: -50,
  /** Fewer verifiable promises than this and the delivery part is scaled down. */
  deliveryFullConfidenceAt: 4,

  monetization: {
    pay_to_win: 30,
    loot_boxes: 15,
    cut_content_dlc: 15,
    marketed_content_paywalled: 12,
    content_removed: 15,
    premium_with_mtx: 10,
    battle_pass_in_premium: 10,
    forced_online: 10,
    invasive_drm: 8,
    preorder_exclusive_gameplay: 5,
    currency_pack_mismatch: 5,
  } satisfies Record<MonetizationFlag, number>,
  /** Minor issues cost this share of the listed penalty. */
  minorShare: 0.5,

  stability: {
    solid: 0,
    minor_issues: -5,
    buggy: -20,
    broken: -40,
    unplayable: -60,
  } satisfies Record<StabilityLevel, number>,

  /** Consensus score bands, highest first. */
  reception: [
    [90, 25],
    [85, 18],
    [80, 12],
    [75, 6],
    [70, 0],
    [60, -10],
    [50, -25],
    [0, -40],
  ] as const,
  /** Users weigh more than critics: critics get review codes and press events. */
  userShare: 0.6,

  value: {
    fullPriceUsd: 60,
    /** Full price and a main story under this many hours costs `shortPenalty`. */
    shortHours: 15,
    shortPenalty: 10,
  },

  editorialLimit: 25,
} as const;

export interface ScoreLine {
  key: "delivery" | "monetization" | "stability" | "reception" | "value" | "editorial";
  label: string;
  points: number;
  detail: string;
}

export interface ScoreResult {
  /** The original launch verdict. Never changes after publication except through a rescoring version. */
  launch: number;
  /** One-time repair credit, already capped and decayed. */
  repairCredit: number;
  /** What the game adds to the developer/publisher totals today. */
  current: number;
  /** The part of monetization penalties the publisher owns. Developers don't pay for these. */
  publisherOnly: number;
  lines: ScoreLine[];
}

const round = (value: number) => Math.round(value);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const counted = (promise: GamePromise) => promise.verdict !== "unverified";

export const deliveryRatio = (promises: GamePromise[]) => {
  const scored = promises.filter(counted);
  const total = scored.reduce((sum, p) => sum + scoring.weight[p.weight], 0);
  if (!total) return undefined;
  return (
    scored.reduce((sum, p) => sum + scoring.weight[p.weight] * scoring.verdictValue[p.verdict], 0) /
    total
  );
};

const deliveryPoints = (promises: GamePromise[]) => {
  const ratio = deliveryRatio(promises);
  if (ratio === undefined) return { points: 0, detail: "No verifiable promises" };
  const scored = promises.filter(counted).length;
  const confidence = Math.min(1, scored / scoring.deliveryFullConfidenceAt);
  const raw = ratio >= 0 ? ratio * scoring.deliveryMax : (ratio / 1.5) * -scoring.deliveryMin;
  const delivered = promises.filter(
    (p) => p.verdict === "delivered" || p.verdict === "delivered_late",
  ).length;
  return {
    points: round(raw * confidence),
    detail: `${delivered} of ${scored} verified promises delivered (ratio ${ratio.toFixed(2)})`,
  };
};

const receptionPoints = (verdict: Verdict) => {
  const { critic, users } = verdict.reception;
  const consensus =
    critic !== undefined && users !== undefined
      ? users * scoring.userShare + critic * (1 - scoring.userShare)
      : (users ?? critic);
  if (consensus === undefined) return { points: 0, detail: "No aggregate reception yet" };
  const band = scoring.reception.find(([floor]) => consensus >= floor)!;
  const parts = [
    critic !== undefined && `critics ${critic}`,
    users !== undefined && `players ${users}`,
  ].filter(Boolean);
  return { points: band[1], detail: `Consensus ${round(consensus)} (${parts.join(", ")})` };
};

const valuePoints = (verdict: Verdict) => {
  const { launchPriceUsd, mainStoryHours } = verdict.value;
  const { fullPriceUsd, shortHours, shortPenalty } = scoring.value;
  if (
    launchPriceUsd !== undefined &&
    mainStoryHours !== undefined &&
    launchPriceUsd >= fullPriceUsd &&
    mainStoryHours < shortHours
  ) {
    return {
      points: -shortPenalty,
      detail: `$${launchPriceUsd} for a ~${mainStoryHours}h main story`,
    };
  }
  return { points: 0, detail: "No value penalty" };
};

/** Credit decays with time since release: fast fixes earn the most, a year later nothing. */
export const repairShare = (releaseDate: string, repairDate: string) => {
  const days = (Date.parse(repairDate) - Date.parse(releaseDate)) / 86_400_000;
  if (days <= 30) return 1;
  if (days <= 90) return 0.6;
  if (days <= 180) return 0.35;
  if (days <= 365) return 0.15;
  return 0;
};

export function computeScore(verdict: Verdict): ScoreResult {
  const delivery = deliveryPoints(verdict.promises);

  let monetization = 0;
  let publisherOnly = 0;
  for (const issue of verdict.monetization) {
    const penalty =
      scoring.monetization[issue.flag] * (issue.severity === "minor" ? scoring.minorShare : 1);
    monetization -= penalty;
    if (issue.owner === "publisher") publisherOnly -= penalty;
  }
  monetization = round(monetization);
  publisherOnly = round(publisherOnly);

  const { level, fixedWithinWindow } = verdict.stability;
  /* Fixing within the window forgives minor issues and halves a buggy launch. Broken stays broken. */
  const stability =
    fixedWithinWindow && level === "minor_issues"
      ? 0
      : fixedWithinWindow && level === "buggy"
        ? scoring.stability.buggy / 2
        : scoring.stability[level];

  const reception = receptionPoints(verdict);
  const value = valuePoints(verdict);
  const editorial = verdict.editorial
    ? clamp(round(verdict.editorial.adjustment), -scoring.editorialLimit, scoring.editorialLimit)
    : 0;

  const lines: ScoreLine[] = [
    { key: "delivery", label: "Promises", points: delivery.points, detail: delivery.detail },
    {
      key: "monetization",
      label: "Monetization",
      points: monetization,
      detail: verdict.monetization.length
        ? `${verdict.monetization.length} practice(s) flagged`
        : "Nothing flagged",
    },
    {
      key: "stability",
      label: "Launch stability",
      points: stability,
      detail:
        level.replace("_", " ") +
        (fixedWithinWindow && (level === "minor_issues" || level === "buggy")
          ? ", fixed within 14 days"
          : "") +
        (verdict.stability.note ? `. ${verdict.stability.note}` : ""),
    },
    { key: "reception", label: "Reception", points: reception.points, detail: reception.detail },
    { key: "value", label: "Value", points: value.points, detail: value.detail },
  ];
  if (verdict.editorial) {
    lines.push({
      key: "editorial",
      label: "Editor's call",
      points: editorial,
      detail: verdict.editorial.reason,
    });
  }

  const launch = clamp(
    lines.reduce((sum, line) => sum + line.points, 0),
    scoring.range.min,
    scoring.range.max,
  );

  let repairCredit = 0;
  if (verdict.repair && launch < 0) {
    const cap = Math.floor(-launch / 2);
    repairCredit = Math.floor(cap * repairShare(verdict.releaseDate, verdict.repair.date));
  }

  return { launch, repairCredit, current: launch + repairCredit, publisherOnly, lines };
}

/** What a developer's ledger takes from one game: everything except the publisher's own monetization calls. */
export const developerContribution = (result: ScoreResult, selfPublished: boolean) =>
  selfPublished ? result.current : result.current - result.publisherOnly;

/** Publishers ship and market the game, so they carry the whole result. */
export const publisherContribution = (result: ScoreResult) => result.current;
