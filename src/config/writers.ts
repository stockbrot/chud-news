import type { ImageMetadata } from "astro";
import sony from "@/assets/devs/sony.jpg";
import xbox from "@/assets/devs/sony.jpg";
import epicGames from "@/assets/devs/epicgames.png";
import nintendo from "@/assets/devs/sony.jpg";
import naughtyDog from "@/assets/devs/sony.jpg";
import rockstarGames from "@/assets/devs/rockstar.jpg";
import valve from "@/assets/devs/sony.jpg";
import ea from "@/assets/devs/sony.jpg";
import ubisoft from "@/assets/devs/sony.jpg";
import bethesda from "@/assets/devs/sony.jpg";
import cdProjektRed from "@/assets/devs/sony.jpg";
import capcom from "@/assets/devs/sony.jpg";
import squareEnix from "@/assets/devs/sony.jpg";
import sega from "@/assets/devs/sony.jpg";
import bandaiNamco from "@/assets/devs/sony.jpg";
import activision from "@/assets/devs/sony.jpg";
import blizzard from "@/assets/devs/sony.jpg";
import cdProjekt from "@/assets/devs/sony.jpg";
import fromSoftware from "@/assets/devs/sony.jpg";
import remedy from "@/assets/devs/sony.jpg";
import bulkhead from "@/assets/devs/bulkhead.png";
import crytek from "@/assets/devs/crytek.jpg";
import arkanestudios from "@/assets/devs/arkanestudios.png";

/**
 * Writer profiles, keyed by the `author.name` in issue frontmatter. A name with
 * no entry still works — it falls back to a monogram avatar and an empty bio.
 *
 * The bundled portraits are Unsplash placeholders of models with no connection
 * to these fictional bylines. Replace them before you publish.
 */
export interface WriterProfile {
  bio: string;
  image: ImageMetadata;
  creditName: string;
  creditUrl: string;
}

export const writerProfiles: Record<string, WriterProfile> = {
  "Bulkhead": {
    bio: "Edits Mailer and writes most of the craft pieces. Ran a books newsletter for six years before this one and still thinks the hardest part of any issue is the last paragraph.",
    image: bulkhead,
    creditName: "Ayo Ogunseinde",
    creditUrl: "https://unsplash.com/photos/8VghbLlZUdQ",
  },
  "Sony": {
    bio: "The company behind PlayStation, its consoles, games, services, and PlayStation Studios.",
    image: sony,
    creditName: "Sony Interactive Entertainment",
    creditUrl: "https://www.playstation.com/en-us/",
  },

  "Xbox": {
    bio: "Microsoft's gaming division behind Xbox consoles, Game Pass, and Xbox Game Studios.",
    image: xbox,
    creditName: "Xbox",
    creditUrl: "https://www.xbox.com/",
  },

  "Epic Games": {
    bio: "The company behind Fortnite, the Epic Games Store, and Unreal Engine.",
    image: epicGames,
    creditName: "Epic Games",
    creditUrl: "https://www.epicgames.com/",
  },

  "Nintendo": {
    bio: "The legendary Japanese game company behind Mario, Zelda, Pokémon, and the Nintendo Switch.",
    image: nintendo,
    creditName: "Nintendo",
    creditUrl: "https://www.nintendo.com/",
  },

  "Naughty Dog": {
    bio: "Sony's Santa Monica studio behind The Last of Us, Uncharted, and Crash Bandicoot.",
    image: naughtyDog,
    creditName: "Naughty Dog",
    creditUrl: "https://www.naughtydog.com/",
  },

  "Rockstar Games": {
    bio: "The studio behind Grand Theft Auto, Red Dead Redemption, and an unhealthy amount of waiting.",
    image: rockstarGames,
    creditName: "Rockstar Games",
    creditUrl: "https://www.rockstargames.com/",
  },

  "Valve": {
    bio: "The company behind Steam, Half-Life, Counter-Strike, Dota, and whatever the hell Half-Life 3 is doing.",
    image: valve,
    creditName: "Valve",
    creditUrl: "https://www.valvesoftware.com/",
  },

  "Electronic Arts": {
    bio: "One of gaming's biggest publishers, responsible for franchises including Battlefield, The Sims, and EA Sports FC.",
    image: ea,
    creditName: "Electronic Arts",
    creditUrl: "https://www.ea.com/",
  },

  "Ubisoft": {
    bio: "French publisher behind Assassin's Creed, Far Cry, Rainbow Six, and a frankly impressive number of open worlds.",
    image: ubisoft,
    creditName: "Ubisoft",
    creditUrl: "https://www.ubisoft.com/",
  },

  "Bethesda": {
    bio: "Publisher and developer behind The Elder Scrolls, Fallout, Starfield, and several games people have been waiting years for.",
    image: bethesda,
    creditName: "Bethesda",
    creditUrl: "https://bethesda.net/",
  },

  "CD Projekt Red": {
    bio: "Polish developer behind The Witcher and Cyberpunk 2077, including one particularly memorable redemption arc.",
    image: cdProjektRed,
    creditName: "CD PROJEKT RED",
    creditUrl: "https://www.cdprojektred.com/",
  },

  "Capcom": {
    bio: "Japanese publisher behind Resident Evil, Monster Hunter, Street Fighter, and Devil May Cry.",
    image: capcom,
    creditName: "Capcom",
    creditUrl: "https://www.capcom-games.com/",
  },

  "Square Enix": {
    bio: "Japanese publisher behind Final Fantasy, Dragon Quest, Kingdom Hearts, and a frankly unreasonable number of remakes.",
    image: squareEnix,
    creditName: "Square Enix",
    creditUrl: "https://www.square-enix.com/",
  },

  "SEGA": {
    bio: "The company behind Sonic the Hedgehog, Like a Dragon, Persona, and decades of questionable business decisions.",
    image: sega,
    creditName: "SEGA",
    creditUrl: "https://www.sega.com/",
  },

  "Bandai Namco": {
    bio: "Japanese publisher behind Elden Ring, Tekken, Dragon Ball games, and a massive collection of anime franchises.",
    image: bandaiNamco,
    creditName: "Bandai Namco Entertainment",
    creditUrl: "https://www.bandainamcoent.com/",
  },

  "Activision": {
    bio: "Publisher behind Call of Duty and one of the biggest names in the Western gaming industry.",
    image: activision,
    creditName: "Activision",
    creditUrl: "https://www.activision.com/",
  },

  "Blizzard": {
    bio: "The studio behind Warcraft, Diablo, Overwatch, and some spectacular highs and lows.",
    image: blizzard,
    creditName: "Blizzard Entertainment",
    creditUrl: "https://www.blizzard.com/",
  },

  "CD Projekt": {
    bio: "The Polish company behind CD Projekt Red and GOG, responsible for The Witcher and Cyberpunk 2077.",
    image: cdProjekt,
    creditName: "CD PROJEKT",
    creditUrl: "https://www.cdprojekt.com/",
  },

  "FromSoftware": {
    bio: "Japanese developer behind Dark Souls, Bloodborne, Sekiro, Elden Ring, and an unhealthy relationship with difficulty.",
    image: fromSoftware,
    creditName: "FromSoftware",
    creditUrl: "https://www.fromsoftware.jp/",
  },

  "Remedy": {
    bio: "Finnish studio behind Max Payne, Alan Wake, Control, and some wonderfully weird shit.",
    image: remedy,
    creditName: "Remedy Entertainment",
    creditUrl: "https://www.remedygames.com/",
  },
  "Crytek": {
    bio: "Writes about audience: where readers come from, why they leave, and which growth tactics survive contact with a real list.",
    image: crytek,
    creditName: "CryTek",
    creditUrl: "https://unsplash.com/photos/p98UJsuyVRU",
  },
  "Arkane Studios": {
    bio: "Runs the interviews. Prefers writers who have been at it long enough to be honest about the boring parts.",
    image: arkanestudios,
    creditName: "Arkane Studios",
    creditUrl: "https://unsplash.com/photos/ih03D0F6M6M",
  },
};

export const writerProfile = (name: string): WriterProfile | undefined => writerProfiles[name];

export const writerBio = (name: string): string => writerProfiles[name]?.bio ?? "";
