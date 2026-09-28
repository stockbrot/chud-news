/**
 * Use :alias: anywhere. Names are case-sensitive.
 * Top 20 from https://betterttv.com/emotes/popular (2026-09-28).
 * This ranks shared emotes, not total chat messages across providers.
 * Keep the existing 7TV source for catJAM and the extra site aliases below.
 */
export const emotes = {
  catJAM: { platform: "7tv", id: "01F6MQ33FG000FFJ97ZB8MWV52" },
  monkaS: { platform: "bttv", id: "56e9f494fff3cc5c35e5287e" },
  OMEGALUL: { platform: "bttv", id: "583089f4737a8e61abb0186b" },
  Clap: { platform: "bttv", id: "55b6f480e66682f576dd94f5" },
  KEKW: { platform: "bttv", id: "5e9c6c187e090362f8b0b9e8" },
  EZ: { platform: "bttv", id: "5590b223b344e2c42a9e28e3" },
  POGGERS: { platform: "bttv", id: "58ae8407ff7b7276f8e594f2" },
  PepeHands: { platform: "bttv", id: "59f27b3f4ebd8047f54dee29" },
  pepeJAM: { platform: "bttv", id: "5b77ac3af7bddc567b1d5fb2" },
  Sadge: { platform: "bttv", id: "5e0fa9d40550d42106b8a489" },
  Pepega: { platform: "bttv", id: "5aca62163e290877a25481ad" },
  pepeD: { platform: "bttv", id: "5b1740221c5a6065a7bad4b5" },
  PogU: { platform: "bttv", id: "5e4e7a1f08b4447d56a92967" },
  PepeLaugh: { platform: "bttv", id: "5c548025009a2e73916b3a37" },
  "5Head": { platform: "bttv", id: "5d6096974932b21d9c332904" },
  blobDance: { platform: "bttv", id: "5ada077451d4120ea3918426" },
  PepePls: { platform: "bttv", id: "55898e122612142e6aaa935b" },
  modCheck: { platform: "bttv", id: "5d7eefb7c0652668c9e4d394" },
  peepoClap: { platform: "bttv", id: "5d38aaa592fc550c2d5996b8" },
  monkaW: { platform: "bttv", id: "59ca6551b27c823d5b1fd872" },

  // Existing site aliases, outside the top 20 above.
  LuL: { platform: "bttv", id: "567b00c61ddbe1786688a633" },
  BANGER: { platform: "7tv", id: "01H1SDVRH000080K50KTZJ6NH9" },
  party: { platform: "bttv", id: "55e2096ea6fa8b261f81b12a" },
} satisfies Record<string, { platform: "7tv" | "bttv"; id: string }>;
