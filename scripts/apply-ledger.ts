/**
 * Put a research ledger into an existing review: tsx scripts/apply-ledger.ts <index.mdx> <ledger.json>
 * Replaces the frontmatter `verdict`, sets the publisher, drops the old hand-set score.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parse, stringify } from "yaml";
import { researchSchema } from "../src/lib/verdict/schema";
import { computeScore } from "../src/lib/verdict/score";
import { aliasCompany as canonicalCompany } from "../src/lib/pipeline/companies";

const [mdxPath, ledgerPath] = process.argv.slice(2);
const source = readFileSync(mdxPath, "utf8");
const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) throw new Error("No frontmatter");
const front = parse(match[1]);
const raw = JSON.parse(readFileSync(ledgerPath, "utf8"));
const ledger = researchSchema.parse(raw);
const { game: _g, developer: _d, publisher, ...verdict } = raw;

delete front.score;
const pub = canonicalCompany(ledger.publisher);
if (pub && pub !== front.author.name) front.publisher = pub;
else delete front.publisher;
front.verdict = JSON.parse(JSON.stringify(verdict, (_, v) => (v === null ? undefined : v)));

/* The old hand-written score table at the end of the body is replaced by the computed breakdown. */
const body = match[2].replace(/\n\| Score \| Reason \|[\s\S]*$/, "\n").trimEnd();
writeFileSync(mdxPath, `---\n${stringify(front, { lineWidth: 0 })}---\n${body}\n`);
console.log(`${front.title}: ${computeScore(ledger).current}`);
