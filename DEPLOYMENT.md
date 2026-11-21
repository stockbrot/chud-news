# Deployment

The site is now a **Cloudflare Worker with static assets** (it used to be a static Pages site),
because the queue, voting, dashboard and API need a server and a database.

Full setup, secrets and the daily workflow are in [SETUP.md](./SETUP.md).

Short version:

```bash
npx wrangler d1 create chud-news   # put the id in wrangler.jsonc
npm run db:migrate:remote
npx wrangler secret put ...        # see SETUP.md
npm run deploy
```

For automatic deploys, create a Worker in the Cloudflare dashboard connected to this repo
(Workers Builds: build `npm run build`, deploy `npx wrangler deploy`), and delete the old Pages project.
