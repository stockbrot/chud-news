# Chud News: setup

How the site works, and how to run it for free.

## How it works

```
IGDB ──(daily cron)──▶ D1 queue ──▶ Dashboard "Write it"
                                     │ 1. Research  (Claude Haiku + web search, plus pre-fetched
                                     │               Wayback store page and Steam data)
                                     │ 2. Draft     (Claude Haiku, writes only from the ledger)
                                     │ 3. Fact-check (second Claude Haiku pass, checks every claim)
                                     ▼
                               You approve ──▶ MDX file in src/content/issues ──▶ static site rebuild
```

- **The score is computed, never written.** `src/lib/verdict/score.ts` turns the ledger (promises,
  monetization, stability, reception, value, ±25 editor's call) into points. Change a weight there and the
  whole archive is rescored on the next build. `/scoring/` reads its numbers from the same file.
- **Published reviews live in git.** Every verdict and correction is a commit.
- **The queue, votes and drafts live in Cloudflare D1** (free tier).
- Only `/queue`, `/admin` and `/api/*` run on request. Everything else is static.

## Free-tier stack

| Piece           | Service                                           | Cost                                     |
| --------------- | ------------------------------------------------- | ---------------------------------------- |
| Hosting + API   | Cloudflare Workers (free: 100k requests/day)      | $0                                       |
| Database        | Cloudflare D1 (free: 5 GB)                        | $0                                       |
| Daily discovery | GitHub Actions (`.github/workflows/discover.yml`) | $0                                       |
| Game data       | IGDB API (Twitch app)                             | $0                                       |
| AI              | Claude API, Haiku 5.5                             | ~$0.01–0.05 per article incl. web search |

## One-time setup

```bash
npm install
npx wrangler login
npx wrangler d1 create chud-news          # paste the database_id into wrangler.jsonc
npm run db:migrate:remote                 # create tables in production
npm run db:migrate                        # and locally

# secrets (production)
npx wrangler secret put IGDB_CLIENT_ID
npx wrangler secret put IGDB_CLIENT_SECRET
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put ADMIN_PASSWORD     # dashboard login (any username)
npx wrangler secret put CRON_SECRET        # any long random string
npx wrangler secret put VOTE_SALT          # any long random string
# optional
npx wrangler secret put GITHUB_TOKEN       # fine-grained, Contents: read/write on this repo → approvals auto-publish
npx wrangler secret put TURNSTILE_SECRET   # + TURNSTILE_SITE_KEY var, to stop bot voting

npm run deploy
```

Locally the same values go in `.dev.vars` (git-ignored). Then `astro dev` serves everything,
including the dashboard at `/admin` with local D1.

In GitHub repo settings → Secrets → Actions, add `SITE_URL` and `CRON_SECRET` so the daily discovery runs.
Run it once by hand (Actions → Discover games → Run workflow) to fill the queue.

> The old setup deployed to **Cloudflare Pages** as a static site. It's now a Worker with static assets.
> In the Cloudflare dashboard create a Worker connected to this repo (Workers Builds, build command
> `npm run build`, deploy command `npx wrangler deploy`), or run `npm run deploy` yourself.

## Daily workflow

1. Open `/admin`. The queue is sorted by priority (recency + popularity + votes).
2. Hit **Write it** on a game. Research → draft → fact-check takes 1–2 minutes.
3. On the game page: read the fact-check, fix the article or the ledger JSON (the score updates on save),
   then **Approve & publish**.
   - With `GITHUB_TOKEN` set, the review is committed and the site rebuilds by itself.
   - Without it: `npm run publish:approved -- --remote`, check `git diff`, commit, push.
4. **Add a game by hand** with the IGDB search box (for anything the popularity filter missed).

## Tuning

- Popularity filter and major-publisher list: `src/lib/pipeline/priority.ts`
- Prompts (research, draft, fact-check): `src/lib/pipeline/prompts.ts`
- Models: set `RESEARCH_MODEL`, `DRAFT_MODEL` or `REVIEW_MODEL` (default `claude-haiku-5-5`). Research is
  the hardest stage; `claude-sonnet-5-5` finds noticeably more promises for ~20× the cost (still cents).
- Scoring weights: `src/lib/verdict/score.ts`

## Auto-approve (later)

Once the fact-checker's verdicts match yours for a few dozen articles, approval can be automated:
publish when `review.pass && review.confidence === "high" && ledger.confidence !== "low"`, and route
everything else to you. The hook point is the end of `runReview` in `src/lib/server/pipeline.ts`.

## Useful scripts

```bash
npm test                                  # scoring formula tests
npm run ledger:score -- ledger.json       # validate a ledger and print its score
npm run ledger:apply -- src/content/issues/<game>/index.mdx ledger.json
npm run publish:approved [-- --remote]    # write approved drafts to src/content
```
