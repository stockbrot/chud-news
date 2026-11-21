/**
 * IGDB client. Auth is a Twitch app token (client-credentials). Docs:
 * https://api-docs.igdb.com/
 */

export interface IgdbEnv {
  IGDB_CLIENT_ID: string;
  IGDB_CLIENT_SECRET: string;
}

export interface IgdbGame {
  id: number;
  name: string;
  slug: string;
  first_release_date?: number;
  summary?: string;
  hypes?: number;
  total_rating?: number;
  total_rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  cover?: { image_id: string };
  genres?: { name: string }[];
  platforms?: { name: string; abbreviation?: string }[];
  involved_companies?: {
    developer: boolean;
    publisher: boolean;
    company: { id: number; name: string };
  }[];
  external_games?: { uid?: string; url?: string }[];
  websites?: { url: string }[];
}

let cachedToken: { value: string; expires: number } | undefined;

async function token(env: IgdbEnv) {
  if (cachedToken && cachedToken.expires > Date.now() + 60_000) return cachedToken.value;
  const url = new URL("https://id.twitch.tv/oauth2/token");
  url.searchParams.set("client_id", env.IGDB_CLIENT_ID);
  url.searchParams.set("client_secret", env.IGDB_CLIENT_SECRET);
  url.searchParams.set("grant_type", "client_credentials");
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error(`Twitch auth failed: ${res.status} ${await res.text()}`);
  const body = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  return cachedToken.value;
}

export async function igdbQuery<T>(env: IgdbEnv, endpoint: string, query: string): Promise<T[]> {
  const res = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${await token(env)}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });
  if (!res.ok) throw new Error(`IGDB ${endpoint} failed: ${res.status} ${await res.text()}`);
  return (await res.json()) as T[];
}

const GAME_FIELDS = [
  "name",
  "slug",
  "first_release_date",
  "summary",
  "hypes",
  "total_rating",
  "total_rating_count",
  "aggregated_rating",
  "aggregated_rating_count",
  "cover.image_id",
  "genres.name",
  "platforms.name",
  "platforms.abbreviation",
  "involved_companies.developer",
  "involved_companies.publisher",
  "involved_companies.company.name",
  "external_games.uid",
  "external_games.url",
  "websites.url",
].join(",");

/** Main games, remakes, remasters, expanded games and ports. Skips DLC, bundles, mods, episodes. */
const GAME_TYPES = "(0,8,9,10,11)";

/** Games released in a window (unix seconds), most hyped first. */
export const releasedBetween = (env: IgdbEnv, from: number, to: number, limit = 200, offset = 0) =>
  igdbQuery<IgdbGame>(
    env,
    "games",
    `fields ${GAME_FIELDS};
     where first_release_date >= ${from} & first_release_date < ${to} & game_type = ${GAME_TYPES}
       & (hypes >= 5 | total_rating_count >= 10 | aggregated_rating_count >= 3);
     sort first_release_date desc;
     limit ${limit}; offset ${offset};`,
  );

export const gameById = async (env: IgdbEnv, id: number) =>
  (await igdbQuery<IgdbGame>(env, "games", `fields ${GAME_FIELDS}; where id = ${id};`))[0];

export const searchGames = (env: IgdbEnv, text: string) =>
  igdbQuery<IgdbGame>(
    env,
    "games",
    `search "${text.replace(/"/g, "")}"; fields ${GAME_FIELDS}; where game_type = ${GAME_TYPES}; limit 20;`,
  );

export const coverUrl = (imageId: string, size: "cover_big" | "720p" | "1080p" = "720p") =>
  `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;

export const steamAppId = (game: IgdbGame) => {
  const urls = [
    ...(game.external_games ?? []).map((e) => e.url),
    ...(game.websites ?? []).map((w) => w.url),
  ];
  for (const url of urls) {
    const match = url?.match(/store\.steampowered\.com\/app\/(\d+)/);
    if (match) return Number(match[1]);
  }
  return undefined;
};

export const companies = (game: IgdbGame) => {
  const involved = game.involved_companies ?? [];
  return {
    developers: involved.filter((c) => c.developer).map((c) => c.company.name),
    publishers: involved.filter((c) => c.publisher).map((c) => c.company.name),
  };
};
