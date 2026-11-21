/** Validate research ledgers (JSON files) and print their computed scores. Usage: tsx scripts/score-ledger.ts file.json... */
import { readFileSync } from "node:fs";
import { researchSchema } from "../src/lib/verdict/schema";
import { computeScore } from "../src/lib/verdict/score";

for (const file of process.argv.slice(2)) {
  const parsed = researchSchema.safeParse(JSON.parse(readFileSync(file, "utf8")));
  if (!parsed.success) {
    console.log(
      `✗ ${file}\n${parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n")}`,
    );
    continue;
  }
  const r = computeScore(parsed.data);
  const p = parsed.data.promises;
  console.log(
    `✓ ${parsed.data.game}: launch ${r.launch}, current ${r.current} | promises ${p.length} (${p.filter((x) => x.verdict !== "unverified").length} verified), flags ${parsed.data.monetization.length}, conf ${parsed.data.confidence}`,
  );
  for (const l of r.lines)
    console.log(`    ${l.label.padEnd(16)} ${String(l.points).padStart(4)}  ${l.detail}`);
}
