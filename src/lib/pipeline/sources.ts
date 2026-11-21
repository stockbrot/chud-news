/**
 * Source gathering done in code, before any model runs. Small models are bad
 * at finding archived pages on their own; handing them the pre-release store
 * page and today's store facts makes the ledger far more reliable.
 */

export interface SteamFacts {
  appId: number;
  name?: string;
  priceUsd?: number;
  isFree?: boolean;
  dlcCount: number;
  inAppPurchases: boolean;
  metacritic?: number;
  reviewPercent?: number;
  reviewCount?: number;
  storeUrl: string;
  description?: string;
}

const UA = { "User-Agent": "chud-news-bot/1.0 (game accountability research)" };

export const htmlToText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

export async function steamFacts(appId: number): Promise<SteamFacts | undefined> {
  const storeUrl = `https://store.steampowered.com/app/${appId}/`;
  const [details, reviews] = await Promise.all([
    fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=en`, {
      headers: UA,
    })
      .then((r) => (r.ok ? r.json() : undefined))
      .catch(() => undefined) as Promise<
      Record<string, { success: boolean; data?: any }> | undefined
    >,
    fetch(
      `https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=0`,
      {
        headers: UA,
      },
    )
      .then((r) => (r.ok ? r.json() : undefined))
      .catch(() => undefined) as Promise<
      { query_summary?: { total_positive: number; total_reviews: number } } | undefined
    >,
  ]);
  const data = details?.[appId]?.data;
  if (!data) return undefined;
  const summary = reviews?.query_summary;
  return {
    appId,
    name: data.name,
    isFree: data.is_free,
    priceUsd: data.price_overview ? data.price_overview.initial / 100 : undefined,
    dlcCount: data.dlc?.length ?? 0,
    /* Steam category 35 is "In-App Purchases". */
    inAppPurchases: (data.categories ?? []).some((c: { id: number }) => c.id === 35),
    metacritic: data.metacritic?.score,
    reviewCount: summary?.total_reviews,
    reviewPercent: summary?.total_reviews
      ? Math.round((summary.total_positive / summary.total_reviews) * 100)
      : undefined,
    storeUrl,
    description: data.about_the_game ? htmlToText(data.about_the_game).slice(0, 6000) : undefined,
  };
}

export interface ArchivedPage {
  url: string;
  archiveUrl: string;
  timestamp: string;
  text: string;
}

/** The last Wayback snapshot of `url` taken before `before` (YYYY-MM-DD), as text. */
export async function archivedBefore(
  url: string,
  before: string,
  maxChars = 8000,
): Promise<ArchivedPage | undefined> {
  const cdx = new URL("https://web.archive.org/cdx/search/cdx");
  cdx.searchParams.set("url", url);
  cdx.searchParams.set("to", before.replace(/-/g, ""));
  cdx.searchParams.set("output", "json");
  cdx.searchParams.set("filter", "statuscode:200");
  cdx.searchParams.set("limit", "-1");
  const rows = (await fetch(cdx, { headers: UA })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => [])) as string[][];
  const last = rows.length > 1 ? rows[rows.length - 1] : undefined;
  if (!last) return undefined;
  const [, timestamp, original] = last;
  const raw = `https://web.archive.org/web/${timestamp}id_/${original}`;
  const html = await fetch(raw, { headers: UA })
    .then((r) => (r.ok ? r.text() : ""))
    .catch(() => "");
  if (!html) return undefined;
  return {
    url: original,
    archiveUrl: `https://web.archive.org/web/${timestamp}/${original}`,
    timestamp,
    text: htmlToText(html).slice(0, maxChars),
  };
}

export interface SourcePack {
  steam?: SteamFacts;
  preReleaseStore?: ArchivedPage;
  officialSite?: ArchivedPage;
}

/** Everything code can fetch on its own, ready to paste into the research prompt. */
export async function gatherSources(opts: {
  steamAppId?: number;
  officialUrl?: string;
  releaseDate: string;
}): Promise<SourcePack> {
  const { steamAppId, officialUrl, releaseDate } = opts;
  const [steam, preReleaseStore, officialSite] = await Promise.all([
    steamAppId ? steamFacts(steamAppId) : undefined,
    steamAppId
      ? archivedBefore(`store.steampowered.com/app/${steamAppId}`, releaseDate)
      : undefined,
    officialUrl ? archivedBefore(officialUrl, releaseDate) : undefined,
  ]);
  return { steam, preReleaseStore, officialSite };
}

export function formatSources(pack: SourcePack) {
  const parts: string[] = [];
  if (pack.preReleaseStore) {
    parts.push(
      `### Pre-release Steam store page (archived ${pack.preReleaseStore.timestamp.slice(0, 8)})\nCite as: ${pack.preReleaseStore.archiveUrl}\n\n${pack.preReleaseStore.text}`,
    );
  }
  if (pack.officialSite) {
    parts.push(
      `### Pre-release official site (archived ${pack.officialSite.timestamp.slice(0, 8)})\nCite as: ${pack.officialSite.archiveUrl}\n\n${pack.officialSite.text}`,
    );
  }
  if (pack.steam) {
    const s = pack.steam;
    parts.push(
      `### Steam store today\nCite as: ${s.storeUrl}\n` +
        [
          s.priceUsd !== undefined && `Price: $${s.priceUsd}`,
          s.isFree && "Free to play",
          `DLC listed: ${s.dlcCount}`,
          `In-app purchases: ${s.inAppPurchases ? "yes" : "no"}`,
          s.reviewPercent !== undefined &&
            `Steam reviews: ${s.reviewPercent}% positive of ${s.reviewCount}`,
          s.metacritic !== undefined && `Metacritic (via Steam): ${s.metacritic}`,
        ]
          .filter(Boolean)
          .join("\n") +
        (s.description ? `\n\nCurrent description:\n${s.description}` : ""),
    );
  }
  return parts.length ? parts.join("\n\n---\n\n") : "(No pre-fetched sources. Use web search.)";
}
