import type { ImageMetadata } from "astro";
import sony from "@/assets/devs/sony.jpg";
import xbox from "@/assets/devs/xbox.jpg";
import epicGames from "@/assets/devs/epicgames.png";
import nintendo from "@/assets/devs/nintendo.png";
import naughtyDog from "@/assets/devs/naughtydog.jpg";
import rockstarGames from "@/assets/devs/rockstar.jpg";
import valve from "@/assets/devs/valve.jpg";
import ea from "@/assets/devs/ea.jpg";
import ubisoft from "@/assets/devs/ubisoft.jpg";
import bethesda from "@/assets/devs/bethesda.jpg";
import cdProjektRed from "@/assets/devs/cdProjektRed.jpg";
import capcom from "@/assets/devs/capcom.jpg";
import squareEnix from "@/assets/devs/squareEnix.jpg";
import sega from "@/assets/devs/sega.jpg";
import bandaiNamco from "@/assets/devs/bandaiNamco.jpg";
import activision from "@/assets/devs/activision.jpg";
import blizzard from "@/assets/devs/blizzard.jpg";
import fromSoftware from "@/assets/devs/fromSoftware.jpg";
import remedy from "@/assets/devs/remedy.jpg";
import bulkhead from "@/assets/devs/bulkhead.png";
import crytek from "@/assets/devs/crytek.jpg";
import arkanestudios from "@/assets/devs/arkanestudios.png";

// Individual placeholders: replace each path when its developer image is ready.
import insomniac from "@/assets/devs/insomniac.jpg";
import santaMonica from "@/assets/devs/santaMonica.jpg";
import suckerPunch from "@/assets/devs/suckerPunch.jpg";
import guerrilla from "@/assets/devs/guerrilla.jpg";
import polyphony from "@/assets/devs/polyphony.jpg";
import mediaMolecule from "@/assets/devs/mediaMolecule.jpg";
import bendStudio from "@/assets/devs/bendStudio.jpg";
import teamAsobi from "@/assets/devs/teamAsobi.jpg";
import bungie from "@/assets/devs/bungie.jpg";
import rare from "@/assets/devs/rare.jpg";
import playground from "@/assets/devs/playground.jpg";
import turn10 from "@/assets/devs/turn10.jpg";
import obsidian from "@/assets/devs/obsidian.jpg";
import inXile from "@/assets/devs/inXile.jpg";
import ninjaTheory from "@/assets/devs/ninjaTheory.jpg";
import doubleFine from "@/assets/devs/doubleFine.jpg";
import idSoftware from "@/assets/devs/idSoftware.jpg";
import machineGames from "@/assets/devs/machineGames.jpg";
import supermassive from "@/assets/devs/supermassive.jpg";
import respawn from "@/assets/devs/respawn.jpg";
import bioWare from "@/assets/devs/bioWare.jpg";
import dice from "@/assets/devs/dice.jpg";
import criterion from "@/assets/devs/criterion.jpg";
import codemasters from "@/assets/devs/codemasters.jpg";
import infinityWard from "@/assets/devs/infinityWard.jpg";
import treyarch from "@/assets/devs/treyarch.jpg";
import larian from "@/assets/devs/larian.png";
import techland from "@/assets/devs/techland.jpg";
import peopleCanFly from "@/assets/devs/peopleCanFly.jpg";
import bohemia from "@/assets/devs/bohemia.jpg";
import rebellion from "@/assets/devs/rebellion.jpg";
import creativeAssembly from "@/assets/devs/creativeAssembly.jpg";
import relic from "@/assets/devs/relic.jpg";
import paradoxDevelopment from "@/assets/devs/paradoxDevelopment.jpg";
import colossalOrder from "@/assets/devs/colossalOrder.jpg";
import frontier from "@/assets/devs/frontier.jpg";
import helloGames from "@/assets/devs/helloGames.jpg";
import riotGames from "@/assets/devs/riotGames.jpg";
import ioInteractive from "@/assets/devs/ioInteractive.jpg";
import rocksteady from "@/assets/devs/rocksteady.jpg";
import monolith from "@/assets/devs/monolith.jpg";
import gearbox from "@/assets/devs/gearbox.jpg";
import hangar13 from "@/assets/devs/hangar13.jpg";
import teamNinja from "@/assets/devs/teamNinja.jpg";
import platinumGames from "@/assets/devs/platinumGames.jpg";
import gameFreak from "@/assets/devs/gameFreak.jpg";
import supergiant from "@/assets/devs/supergiant.jpg";

/**
 * Developer and company profiles, keyed by `author.name` in issue frontmatter.
 * Unknown names fall back to a monogram avatar and an empty bio.
 *
 * New image imports deliberately share sony.jpg until individual logos are added.
 * creditName and creditUrl identify the company, not the temporary image.
 */
export interface WriterProfile {
  bio: string;
  role: string;
  image: ImageMetadata;
  creditName: string;
  creditUrl: string;
}

export const writerProfiles: Record<string, WriterProfile> = {
  Bulkhead: {
    bio: "British developer behind The Turing Test, Battalion 1944, and Wardogs.",
    role: "Developer",
    image: bulkhead,
    creditName: "Bulkhead",
    creditUrl: "https://bulkhead.com/",
  },
  Sony: {
    bio: "The company behind PlayStation, its consoles, games, services, and PlayStation Studios.",
    role: "Publisher",
    image: sony,
    creditName: "Sony Interactive Entertainment",
    creditUrl: "https://www.playstation.com/en-us/",
  },

  Xbox: {
    bio: "Microsoft's gaming division behind Xbox consoles, Game Pass, and Xbox Game Studios.",
    role: "Publisher",
    image: xbox,
    creditName: "Xbox",
    creditUrl: "https://www.xbox.com/",
  },

  "Epic Games": {
    bio: "The company behind Fortnite, the Epic Games Store, and Unreal Engine.",
    role: "Publisher",
    image: epicGames,
    creditName: "Epic Games",
    creditUrl: "https://www.epicgames.com/",
  },

  Nintendo: {
    bio: "The legendary Japanese game company behind Mario, Zelda, Pokémon, and the Nintendo Switch.",
    role: "Publisher",
    image: nintendo,
    creditName: "Nintendo",
    creditUrl: "https://www.nintendo.com/",
  },

  "Naughty Dog": {
    bio: "Sony's Santa Monica studio behind The Last of Us, Uncharted, and Crash Bandicoot.",
    role: "Developer",
    image: naughtyDog,
    creditName: "Naughty Dog",
    creditUrl: "https://www.naughtydog.com/",
  },

  "Rockstar Games": {
    bio: "The studio behind Grand Theft Auto, Red Dead Redemption, and an unhealthy amount of waiting.",
    role: "Developer",
    image: rockstarGames,
    creditName: "Rockstar Games",
    creditUrl: "https://www.rockstargames.com/",
  },

  Valve: {
    bio: "The company behind Steam, Half-Life, Counter-Strike, Dota, and whatever the hell Half-Life 3 is doing.",
    role: "Publisher and Developer",
    image: valve,
    creditName: "Valve",
    creditUrl: "https://www.valvesoftware.com/",
  },

  "Electronic Arts": {
    bio: "One of gaming's biggest publishers, responsible for franchises including Battlefield, The Sims, and EA Sports FC.",
    role: "Publisher",
    image: ea,
    creditName: "Electronic Arts",
    creditUrl: "https://www.ea.com/",
  },

  Ubisoft: {
    bio: "French publisher behind Assassin's Creed, Far Cry, Rainbow Six, and a frankly impressive number of open worlds.",
    role: "Publisher and Developer",
    image: ubisoft,
    creditName: "Ubisoft",
    creditUrl: "https://www.ubisoft.com/",
  },

  Bethesda: {
    bio: "Publisher and developer behind The Elder Scrolls, Fallout, Starfield, and several games people have been waiting years for.",
    role: "Developer",
    image: bethesda,
    creditName: "Bethesda",
    creditUrl: "https://bethesda.net/",
  },

  "CD Projekt Red": {
    bio: "Polish developer behind The Witcher and Cyberpunk 2077, including one particularly memorable redemption arc.",
    role: "Developer",
    image: cdProjektRed,
    creditName: "CD PROJEKT RED",
    creditUrl: "https://www.cdprojektred.com/",
  },

  Capcom: {
    bio: "Japanese publisher behind Resident Evil, Monster Hunter, Street Fighter, and Devil May Cry.",
    role: "Developer",
    image: capcom,
    creditName: "Capcom",
    creditUrl: "https://www.capcom-games.com/",
  },

  "Square Enix": {
    bio: "Japanese publisher behind Final Fantasy, Dragon Quest, Kingdom Hearts, and a frankly unreasonable number of remakes.",
    role: "Developer",
    image: squareEnix,
    creditName: "Square Enix",
    creditUrl: "https://www.square-enix.com/",
  },

  SEGA: {
    bio: "The company behind Sonic the Hedgehog, Like a Dragon, Persona, and decades of questionable business decisions.",
    role: "Developer",
    image: sega,
    creditName: "SEGA",
    creditUrl: "https://www.sega.com/",
  },

  "Bandai Namco": {
    bio: "Japanese publisher behind Elden Ring, Tekken, Dragon Ball games, and a massive collection of anime franchises.",
    role: "Developer",
    image: bandaiNamco,
    creditName: "Bandai Namco Entertainment",
    creditUrl: "https://www.bandainamcoent.com/",
  },

  Activision: {
    bio: "Publisher behind Call of Duty and one of the biggest names in the Western gaming industry.",
    role: "Developer",
    image: activision,
    creditName: "Activision",
    creditUrl: "https://www.activision.com/",
  },

  Blizzard: {
    bio: "The studio behind Warcraft, Diablo, Overwatch, and some spectacular highs and lows.",
    role: "Developer",
    image: blizzard,
    creditName: "Blizzard Entertainment",
    creditUrl: "https://www.blizzard.com/",
  },

  FromSoftware: {
    bio: "Japanese developer behind Dark Souls, Bloodborne, Sekiro, Elden Ring, and an unhealthy relationship with difficulty.",
    role: "Developer",
    image: fromSoftware,
    creditName: "FromSoftware",
    creditUrl: "https://www.fromsoftware.jp/",
  },

  Remedy: {
    bio: "Finnish studio behind Max Payne, Alan Wake, Control, and some wonderfully weird shit.",
    role: "Developer",
    image: remedy,
    creditName: "Remedy Entertainment",
    creditUrl: "https://www.remedygames.com/",
  },
  Crytek: {
    bio: "Developer behind Crysis, the original Far Cry, Hunt: Showdown, and CryEngine.",
    role: "Developer",
    image: crytek,
    creditName: "Crytek",
    creditUrl: "https://www.crytek.com/",
  },
  "Arkane Studios": {
    bio: "Developer behind Dishonored, Prey, Deathloop, and Arx Fatalis.",
    role: "Developer",
    image: arkanestudios,
    creditName: "Arkane Studios",
    creditUrl: "https://www.arkane-studios.com/",
  },

  "Insomniac Games": {
    bio: "Developer of Marvel's Spider-Man, Ratchet & Clank, and Resistance.",
    role: "Developer",
    image: insomniac,
    creditName: "Insomniac Games",
    creditUrl: "https://insomniac.games/",
  },

  "Santa Monica Studio": {
    bio: "Developer of the God of War series, from ancient Greece to Norse mythology.",
    role: "Developer",
    image: santaMonica,
    creditName: "Santa Monica Studio",
    creditUrl: "https://sms.playstation.com/",
  },

  "Sucker Punch Productions": {
    bio: "Developer of Ghost of Tsushima, Infamous, and Sly Cooper.",
    role: "Developer",
    image: suckerPunch,
    creditName: "Sucker Punch Productions",
    creditUrl: "https://www.suckerpunch.com/",
  },

  "Guerrilla Games": {
    bio: "Developer of Horizon Zero Dawn, Horizon Forbidden West, and Killzone.",
    role: "Developer",
    image: guerrilla,
    creditName: "Guerrilla Games",
    creditUrl: "https://www.guerrilla-games.com/",
  },

  "Polyphony Digital": {
    bio: "Racing studio behind the Gran Turismo series.",
    role: "Developer",
    image: polyphony,
    creditName: "Polyphony Digital",
    creditUrl: "https://www.polyphony.co.jp/",
  },

  "Media Molecule": {
    bio: "Developer of LittleBigPlanet, Tearaway, and Dreams.",
    role: "Developer",
    image: mediaMolecule,
    creditName: "Media Molecule",
    creditUrl: "https://www.mediamolecule.com/",
  },

  "Bend Studio": {
    bio: "Developer of Days Gone, Syphon Filter, and Uncharted: Golden Abyss.",
    role: "Developer",
    image: bendStudio,
    creditName: "Bend Studio",
    creditUrl: "https://www.bendstudio.com/",
  },

  "Team Asobi": {
    bio: "Developer of Astro Bot, Astro's Playroom, and Astro Bot Rescue Mission.",
    role: "Developer",
    image: teamAsobi,
    creditName: "Team Asobi",
    creditUrl: "https://www.teamasobi.com/",
  },

  Bungie: {
    bio: "Developer behind the original Halo games and the Destiny series.",
    role: "Developer",
    image: bungie,
    creditName: "Bungie",
    creditUrl: "https://www.bungie.net/",
  },

  Rare: {
    bio: "Developer of Sea of Thieves, Banjo-Kazooie, GoldenEye 007, and Perfect Dark.",
    role: "Developer",
    image: rare,
    creditName: "Rare",
    creditUrl: "https://www.rare.co.uk/",
  },

  "Playground Games": {
    bio: "Developer of the Forza Horizon open-world racing series.",
    role: "Developer",
    image: playground,
    creditName: "Playground Games",
    creditUrl: "https://playground-games.com/",
  },

  "Turn 10 Studios": {
    bio: "Developer of the Forza Motorsport racing series.",
    role: "Developer",
    image: turn10,
    creditName: "Turn 10 Studios",
    creditUrl: "https://www.turn10studios.com/",
  },

  "Obsidian Entertainment": {
    bio: "RPG studio behind Fallout: New Vegas, Pillars of Eternity, The Outer Worlds, and Grounded.",
    role: "Developer",
    image: obsidian,
    creditName: "Obsidian Entertainment",
    creditUrl: "https://www.obsidian.net/",
  },

  "inXile Entertainment": {
    bio: "Developer of Wasteland 2, Wasteland 3, and The Bard's Tale IV.",
    role: "Developer",
    image: inXile,
    creditName: "inXile Entertainment",
    creditUrl: "https://www.inxile-entertainment.com/",
  },

  "Ninja Theory": {
    bio: "Developer of Hellblade, Heavenly Sword, and Enslaved: Odyssey to the West.",
    role: "Developer",
    image: ninjaTheory,
    creditName: "Ninja Theory",
    creditUrl: "https://www.ninjatheory.com/",
  },

  "Double Fine Productions": {
    bio: "Developer of Psychonauts, Psychonauts 2, Brutal Legend, and Broken Age.",
    role: "Developer",
    image: doubleFine,
    creditName: "Double Fine Productions",
    creditUrl: "https://www.doublefine.com/",
  },

  "id Software": {
    bio: "Developer behind Doom, Quake, and the original Wolfenstein 3D.",
    role: "Developer",
    image: idSoftware,
    creditName: "id Software",
    creditUrl: "https://www.idsoftware.com/",
  },

  MachineGames: {
    bio: "Developer of Wolfenstein: The New Order, Wolfenstein II, and Indiana Jones and the Great Circle.",
    role: "Developer",
    image: machineGames,
    creditName: "MachineGames",
    creditUrl: "https://www.machinegames.com/",
  },

  "Supermassive Games": {
    bio: "Developer of Until Dawn, The Quarry, and The Dark Pictures Anthology.",
    role: "Developer",
    image: supermassive,
    creditName: "Supermassive Games",
    creditUrl: "https://www.supermassivegames.com/",
  },

  "Respawn Entertainment": {
    bio: "Developer of Titanfall, Apex Legends, and the Star Wars Jedi games.",
    role: "Developer",
    image: respawn,
    creditName: "Respawn Entertainment",
    creditUrl: "https://www.respawn.com/",
  },

  BioWare: {
    bio: "RPG studio behind Mass Effect, Dragon Age, and Star Wars: Knights of the Old Republic.",
    role: "Developer",
    image: bioWare,
    creditName: "BioWare",
    creditUrl: "https://www.bioware.com/",
  },

  DICE: {
    bio: "Developer of Battlefield, Mirror's Edge, and the modern Star Wars Battlefront games.",
    role: "Developer",
    image: dice,
    creditName: "DICE",
    creditUrl: "https://www.dice.se/",
  },

  "Criterion Games": {
    bio: "Developer behind Burnout and several Need for Speed games.",
    role: "Developer",
    image: criterion,
    creditName: "Criterion Games",
    creditUrl: "https://www.criteriongames.com/",
  },

  Codemasters: {
    bio: "Racing developer behind DiRT, GRID, and the F1 series.",
    role: "Developer",
    image: codemasters,
    creditName: "Codemasters",
    creditUrl: "https://www.codemasters.com/",
  },

  "Infinity Ward": {
    bio: "Call of Duty studio known for the Modern Warfare games.",
    role: "Developer",
    image: infinityWard,
    creditName: "Infinity Ward",
    creditUrl: "https://www.infinityward.com/",
  },

  Treyarch: {
    bio: "Call of Duty studio behind Black Ops and much of the series' Zombies mode.",
    role: "Developer",
    image: treyarch,
    creditName: "Treyarch",
    creditUrl: "https://www.treyarch.com/",
  },

  "Larian Studios": {
    bio: "RPG developer behind Baldur's Gate 3 and the Divinity series.",
    role: "Developer",
    image: larian,
    creditName: "Larian Studios",
    creditUrl: "https://larian.com/",
  },

  Techland: {
    bio: "Developer behind Dying Light, Dead Island, and Call of Juarez.",
    role: "Developer",
    image: techland,
    creditName: "Techland",
    creditUrl: "https://techland.net/",
  },

  "People Can Fly": {
    bio: "Developer of Painkiller, Bulletstorm, and Outriders.",
    role: "Developer",
    image: peopleCanFly,
    creditName: "People Can Fly",
    creditUrl: "https://peoplecanfly.com/",
  },

  "Bohemia Interactive": {
    bio: "Developer of Arma, DayZ, and Operation Flashpoint: Cold War Crisis.",
    role: "Developer",
    image: bohemia,
    creditName: "Bohemia Interactive",
    creditUrl: "https://www.bohemia.net/",
  },

  Rebellion: {
    bio: "Developer of Sniper Elite, Zombie Army, and Aliens versus Predator.",
    role: "Developer",
    image: rebellion,
    creditName: "Rebellion",
    creditUrl: "https://rebellion.com/",
  },

  "Creative Assembly": {
    bio: "Developer of Total War and Alien: Isolation.",
    role: "Developer",
    image: creativeAssembly,
    creditName: "Creative Assembly",
    creditUrl: "https://www.creative-assembly.com/",
  },

  "Relic Entertainment": {
    bio: "Strategy studio behind Company of Heroes, Dawn of War, and the original Homeworld.",
    role: "Developer",
    image: relic,
    creditName: "Relic Entertainment",
    creditUrl: "https://www.relic.com/",
  },

  "Paradox Development Studio": {
    bio: "Strategy developer behind Crusader Kings, Europa Universalis, and Hearts of Iron.",
    role: "Developer",
    image: paradoxDevelopment,
    creditName: "Paradox Development Studio",
    creditUrl: "https://www.paradoxinteractive.com/",
  },

  "Colossal Order": {
    bio: "Developer of Cities: Skylines, Cities: Skylines II, and Cities in Motion.",
    role: "Developer",
    image: colossalOrder,
    creditName: "Colossal Order",
    creditUrl: "https://colossalorder.fi/",
  },

  "Frontier Developments": {
    bio: "Developer of Elite Dangerous, Planet Coaster, Planet Zoo, and Jurassic World Evolution.",
    role: "Developer",
    image: frontier,
    creditName: "Frontier Developments",
    creditUrl: "https://www.frontier.co.uk/",
  },

  "Hello Games": {
    bio: "Developer of No Man's Sky, Joe Danger, and The Last Campfire.",
    role: "Developer",
    image: helloGames,
    creditName: "Hello Games",
    creditUrl: "https://hellogames.org/",
  },

  "Riot Games": {
    bio: "Developer of League of Legends, Valorant, Teamfight Tactics, and Legends of Runeterra.",
    role: "Developer",
    image: riotGames,
    creditName: "Riot Games",
    creditUrl: "https://www.riotgames.com/",
  },

  "IO Interactive": {
    bio: "Developer of Hitman, Freedom Fighters, and Kane & Lynch.",
    role: "Developer",
    image: ioInteractive,
    creditName: "IO Interactive",
    creditUrl: "https://ioi.dk/",
  },

  "Rocksteady Studios": {
    bio: "Developer of Batman: Arkham Asylum, Arkham City, and Arkham Knight.",
    role: "Developer",
    image: rocksteady,
    creditName: "Rocksteady Studios",
    creditUrl: "https://rocksteadyltd.com/",
  },

  "Monolith Productions": {
    bio: "Studio behind F.E.A.R., Condemned, Middle-earth: Shadow of Mordor, and Shadow of War.",
    role: "Developer",
    image: monolith,
    creditName: "Monolith Productions",
    creditUrl: "https://www.lith.com/",
  },

  "Gearbox Software": {
    bio: "Developer of Borderlands, Brothers in Arms, and Battleborn.",
    role: "Developer",
    image: gearbox,
    creditName: "Gearbox Software",
    creditUrl: "https://www.gearboxsoftware.com/",
  },

  "Hangar 13": {
    bio: "Developer of Mafia III and Mafia: Definitive Edition.",
    role: "Developer",
    image: hangar13,
    creditName: "Hangar 13",
    creditUrl: "https://hangar13games.com/",
  },

  "Team Ninja": {
    bio: "Action-game developer behind Ninja Gaiden, Nioh, and Dead or Alive.",
    role: "Developer",
    image: teamNinja,
    creditName: "Team Ninja",
    creditUrl: "https://www.teamninja-studio.com/",
  },

  PlatinumGames: {
    bio: "Developer of Bayonetta, Nier: Automata, and Astral Chain.",
    role: "Developer",
    image: platinumGames,
    creditName: "PlatinumGames",
    creditUrl: "https://www.platinumgames.com/",
  },

  "Game Freak": {
    bio: "Developer of the mainline Pokemon games, as well as titles such as Pocket Card Jockey.",
    role: "Developer",
    image: gameFreak,
    creditName: "Game Freak",
    creditUrl: "https://www.gamefreak.co.jp/",
  },

  "Supergiant Games": {
    bio: "Developer of Hades, Bastion, Transistor, and Pyre.",
    role: "Developer",
    image: supergiant,
    creditName: "Supergiant Games",
    creditUrl: "https://www.supergiantgames.com/",
  },
};

export const writerProfile = (name: string): WriterProfile | undefined => writerProfiles[name];

export const writerBio = (name: string): string => writerProfiles[name]?.bio ?? "";

/** Profile roles are shared by every card and developer page. */
export const writerRole = (name: string): string => writerProfiles[name]?.role ?? "Developer";
