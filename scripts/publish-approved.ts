/**
 * Writes every approved-but-unpublished draft into src/content/issues, then
 * marks it published. For manual publishing (no GITHUB_TOKEN): run this,
 * check `git diff`, commit, push.
 *
 *   npm run publish:approved            # local D1 (astro dev)
 *   npm run publish:approved -- --remote  # production D1
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildMdx, slugify } from "../src/lib/pipeline/publish";
import { coverUrl } from "../src/lib/pipeline/igdb";
import { researchSchema } from "../src/lib/verdict/schema";

const remote = process.argv.includes("--remote");
const where = remote ? "--remote" : "--local";

const d1 = <T>(sql: string): T[] => {
  const out = execFileSync(
    "npx",
    ["wrangler", "d1", "execute", "chud-news", where, "--json", "--command", sql],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "inherit"],
    },
  );
  return (JSON.parse(out) as { results: T[] }[])[0]?.results ?? [];
};
const quote = (value: string) => `'${value.replace(/'/g, "''")}'`;

interface Row {
  draft_id: number;
  game_id: number;
  name: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  ledger: string;
  genres: string;
  platforms: string;
  publishers: string;
  developers: string;
  cover_image_id: string | null;
  steam_app_id: number | null;
}

const rows = d1<Row>(`
  SELECT d.id AS draft_id, g.id AS game_id, g.name, g.slug, d.title, d.excerpt, d.body, d.ledger,
         g.genres, g.platforms, g.publishers, g.developers, g.cover_image_id, g.steam_app_id
  FROM drafts d JOIN games g ON g.id = d.game_id
  WHERE d.stage = 'approved' AND g.status = 'approved'`);

if (!rows.length) {
  console.log("Nothing approved and waiting.");
  process.exit(0);
}

const issuesDir = "src/content/issues";
let issue = readdirSync(issuesDir, { withFileTypes: true }).filter((d) => d.isDirectory()).length;

for (const row of rows) {
  const folder = slugify(row.name) || row.slug;
  const dir = join(issuesDir, folder);
  if (existsSync(join(dir, "index.mdx"))) {
    console.log(`skip ${folder}: already exists`);
    continue;
  }
  mkdirSync(dir, { recursive: true });
  issue += 1;
  const publishers = JSON.parse(row.publishers) as string[];
  const mdx = buildMdx({
    issue,
    title: row.title,
    excerpt: row.excerpt ?? "",
    body: row.body,
    ledger: researchSchema.parse(JSON.parse(row.ledger)),
    genres: JSON.parse(row.genres),
    platforms: JSON.parse(row.platforms),
    igdbId: row.game_id,
    steamAppId: row.steam_app_id ?? undefined,
    coverCredit: { name: publishers[0] ?? row.name, url: `https://www.igdb.com/games/${row.slug}` },
  });
  writeFileSync(join(dir, "index.mdx"), mdx);
  if (row.cover_image_id) {
    const res = await fetch(coverUrl(row.cover_image_id, "1080p"));
    if (res.ok) writeFileSync(join(dir, "cover.jpg"), Buffer.from(await res.arrayBuffer()));
    else console.warn(`  couldn't download cover for ${row.name}; add ${dir}/cover.jpg by hand`);
  } else {
    console.warn(`  no cover for ${row.name}; add ${dir}/cover.jpg by hand`);
  }
  d1(
    `UPDATE games SET status = 'published', published_slug = ${quote(folder)}, updated_at = datetime('now') WHERE id = ${row.game_id}`,
  );
  console.log(`wrote ${dir}`);
}
console.log("\nNow: npm run build, check it, then git add src/content && git commit && git push");
