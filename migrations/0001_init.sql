-- Games the site knows about. Published verdicts live in git (src/content);
-- this table is the queue and the pipeline's working memory.
CREATE TABLE games (
  id INTEGER PRIMARY KEY,              -- IGDB id
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  release_date TEXT NOT NULL,          -- YYYY-MM-DD
  summary TEXT,
  cover_image_id TEXT,
  developers TEXT NOT NULL DEFAULT '[]',   -- JSON arrays
  publishers TEXT NOT NULL DEFAULT '[]',
  platforms TEXT NOT NULL DEFAULT '[]',
  genres TEXT NOT NULL DEFAULT '[]',
  steam_app_id INTEGER,
  official_url TEXT,
  hypes INTEGER NOT NULL DEFAULT 0,
  rating_count INTEGER NOT NULL DEFAULT 0,
  critic_count INTEGER NOT NULL DEFAULT 0,
  steam_reviews INTEGER,
  eligible_reason TEXT,
  -- queued | researching | drafted | in_review | approved | published | rejected | skipped
  status TEXT NOT NULL DEFAULT 'queued',
  votes INTEGER NOT NULL DEFAULT 0,
  priority REAL NOT NULL DEFAULT 0,
  published_slug TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX games_status_priority ON games (status, priority DESC);
CREATE INDEX games_release ON games (release_date DESC);

-- One vote per game per voter per day. voter is a salted hash, never an IP.
CREATE TABLE votes (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  voter TEXT NOT NULL,
  day TEXT NOT NULL,
  PRIMARY KEY (game_id, voter, day)
);

-- Each pipeline attempt. Keeps history so a rejected draft can be compared.
CREATE TABLE drafts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,                 -- researched | drafted | reviewed | approved | rejected | failed
  sources TEXT,                        -- JSON SourcePack
  ledger TEXT,                         -- JSON Research
  title TEXT,
  excerpt TEXT,
  body TEXT,
  review TEXT,                         -- JSON Review
  error TEXT,
  cost_usd REAL NOT NULL DEFAULT 0,
  usage TEXT NOT NULL DEFAULT '[]',    -- JSON Usage[]
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX drafts_game ON drafts (game_id, id DESC);

-- Backlog cursor and other small settings.
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
