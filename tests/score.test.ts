import { test } from "node:test";
import assert from "node:assert/strict";
import { computeScore, developerContribution, repairShare } from "../src/lib/verdict/score.ts";
import type { GamePromise, Verdict } from "../src/lib/verdict/types.ts";

const src = { url: "https://example.com" };
const promise = (
  verdict: GamePromise["verdict"],
  weight: GamePromise["weight"] = "major",
): GamePromise => ({
  claim: "x",
  category: "feature",
  weight,
  verdict,
  source: src,
  evidence: [src],
});

const base = (overrides: Partial<Verdict> = {}): Verdict => ({
  releaseDate: "2026-01-01",
  assessedPlatforms: ["PC"],
  promises: [],
  monetization: [],
  stability: { level: "solid", fixedWithinWindow: false, issues: [] },
  reception: { sources: [] },
  value: {},
  confidence: "high",
  ...overrides,
});

test("an empty ledger scores zero", () => {
  assert.equal(computeScore(base()).launch, 0);
});

test("all promises delivered + great reception lands near the top", () => {
  const r = computeScore(
    base({
      promises: [1, 2, 3, 4].map(() => promise("delivered")),
      reception: { critic: 92, users: 94, sources: [] },
    }),
  );
  assert.equal(r.launch, 45);
});

test("unverified promises never cost points", () => {
  const r = computeScore(base({ promises: [promise("unverified", "headline")] }));
  assert.equal(r.lines.find((l) => l.key === "delivery")!.points, 0);
});

test("misleading headline promises sink delivery to the floor", () => {
  const r = computeScore(
    base({ promises: [1, 2, 3, 4].map(() => promise("misleading", "headline")) }),
  );
  assert.equal(r.lines.find((l) => l.key === "delivery")!.points, -50);
});

test("few promises scale delivery down", () => {
  const r = computeScore(base({ promises: [promise("delivered")] }));
  assert.equal(r.lines.find((l) => l.key === "delivery")!.points, 5);
});

test("publisher monetization doesn't hit a separate developer", () => {
  const r = computeScore(
    base({
      monetization: [
        { flag: "pay_to_win", owner: "publisher", severity: "major", evidence: [src] },
      ],
    }),
  );
  assert.equal(r.current, -30);
  assert.equal(developerContribution(r, false), 0);
  assert.equal(developerContribution(r, true), -30);
});

test("minor stability issues fixed in the window are forgiven, broken ones aren't", () => {
  assert.equal(
    computeScore(
      base({ stability: { level: "minor_issues", fixedWithinWindow: true, issues: [] } }),
    ).launch,
    0,
  );
  assert.equal(
    computeScore(base({ stability: { level: "broken", fixedWithinWindow: true, issues: [] } }))
      .launch,
    -40,
  );
});

test("repair credit is capped at half the loss and decays", () => {
  const verdict = base({
    stability: { level: "broken", fixedWithinWindow: false, issues: [] },
    repair: { date: "2026-01-20", summary: "fixed", evidence: [src] },
  });
  const r = computeScore(verdict);
  assert.equal(r.launch, -40);
  assert.equal(r.repairCredit, 20);
  assert.equal(r.current, -20);
  assert.equal(repairShare("2026-01-01", "2027-06-01"), 0);
});

test("editorial is clamped and score respects the range", () => {
  const r = computeScore(
    base({
      editorial: { adjustment: -99, reason: "testing the clamp" },
      stability: { level: "unplayable", fixedWithinWindow: false, issues: [] },
      reception: { critic: 20, users: 10, sources: [] },
      promises: [1, 2, 3, 4].map(() => promise("misleading", "headline")),
      monetization: [
        { flag: "pay_to_win", owner: "publisher", severity: "major", evidence: [src] },
      ],
    }),
  );
  assert.equal(r.lines.find((l) => l.key === "editorial")!.points, -25);
  assert.equal(r.launch, -150);
});

test("full price and a short campaign costs value points", () => {
  const r = computeScore(base({ value: { launchPriceUsd: 70, mainStoryHours: 12 } }));
  assert.equal(r.launch, -10);
});

test("a buggy launch fixed within the window costs half", () => {
  assert.equal(
    computeScore(base({ stability: { level: "buggy", fixedWithinWindow: true, issues: [] } }))
      .launch,
    -10,
  );
});
