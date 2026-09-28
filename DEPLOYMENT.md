# Cloudflare Pages

This project generates a static site. No Cloudflare adapter, runtime secrets, or
GitHub Actions workflow is needed for Pages Git integration.

1. Push the deployment configuration to `stockbrot/chud-news` on GitHub.
2. In Cloudflare, open **Workers & Pages**, create a **Pages** application, and
   connect the GitHub repository.
3. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Project name | `chud-news` (or an available name; update `wrangler.jsonc` to match) |
   | Production branch | `main` |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | Repository root (leave blank) |

4. Add a build environment variable named `SITE_URL` with your production origin,
   for example `https://YOUR-PROJECT.pages.dev` or your custom domain. Set it for
   production and preview builds so canonical links consistently use production.
5. Select **Save and Deploy**. Pages installs dependencies and builds the site.
   Subsequent pushes to `main` trigger new production deployments.

`.node-version` pins the same Node version used locally. The Wrangler file uses
Pages' `pages_build_output_dir`; the build command lives in the dashboard.

If `SITE_URL` is absent, the build uses Cloudflare's `CF_PAGES_URL` deployment URL.
Outside Pages it falls back to `http://localhost:4321`. Set `SITE_URL` explicitly
for production so canonical links, RSS, sitemap, and social image URLs use the
permanent public address.

For a custom domain, add it under the Pages project's **Custom domains** tab,
follow Cloudflare's DNS instructions, update `SITE_URL`, and redeploy.

After deployment, verify an issue, `/devs/`, image loading, theme switching,
`/rss.xml`, and `/sitemap-index.xml`. Complete `GISCUS.md` if comments are not yet
configured.

Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
