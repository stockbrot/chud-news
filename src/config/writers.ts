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

// Individual placeholders: replace each path when its developer image is ready.
import insomniac from "@/assets/devs/sony.jpg";
import santaMonica from "@/assets/devs/sony.jpg";
import suckerPunch from "@/assets/devs/sony.jpg";
import guerrilla from "@/assets/devs/sony.jpg";
import polyphony from "@/assets/devs/sony.jpg";
import housemarque from "@/assets/devs/sony.jpg";
import mediaMolecule from "@/assets/devs/sony.jpg";
import bendStudio from "@/assets/devs/sony.jpg";
import teamAsobi from "@/assets/devs/sony.jpg";
import bungie from "@/assets/devs/sony.jpg";
import rare from "@/assets/devs/sony.jpg";
import playground from "@/assets/devs/sony.jpg";
import turn10 from "@/assets/devs/sony.jpg";
import coalition from "@/assets/devs/sony.jpg";
import obsidian from "@/assets/devs/sony.jpg";
import inXile from "@/assets/devs/sony.jpg";
import ninjaTheory from "@/assets/devs/sony.jpg";
import doubleFine from "@/assets/devs/sony.jpg";
import idSoftware from "@/assets/devs/sony.jpg";
import machineGames from "@/assets/devs/sony.jpg";
import supermassive from "@/assets/devs/sony.jpg";
import respawn from "@/assets/devs/sony.jpg";
import bioWare from "@/assets/devs/sony.jpg";
import dice from "@/assets/devs/sony.jpg";
import criterion from "@/assets/devs/sony.jpg";
import codemasters from "@/assets/devs/sony.jpg";
import maxis from "@/assets/devs/sony.jpg";
import motive from "@/assets/devs/sony.jpg";
import infinityWard from "@/assets/devs/sony.jpg";
import treyarch from "@/assets/devs/sony.jpg";
import sledgehammer from "@/assets/devs/sony.jpg";
import toysForBob from "@/assets/devs/sony.jpg";
import larian from "@/assets/devs/sony.jpg";
import techland from "@/assets/devs/sony.jpg";
import peopleCanFly from "@/assets/devs/sony.jpg";
import fourAGames from "@/assets/devs/sony.jpg";
import gscGameWorld from "@/assets/devs/sony.jpg";
import warhorse from "@/assets/devs/sony.jpg";
import bohemia from "@/assets/devs/sony.jpg";
import rebellion from "@/assets/devs/sony.jpg";
import creativeAssembly from "@/assets/devs/sony.jpg";
import sportsInteractive from "@/assets/devs/sony.jpg";
import relic from "@/assets/devs/sony.jpg";
import firaxis from "@/assets/devs/sony.jpg";
import paradoxDevelopment from "@/assets/devs/sony.jpg";
import colossalOrder from "@/assets/devs/sony.jpg";
import frontier from "@/assets/devs/sony.jpg";
import helloGames from "@/assets/devs/sony.jpg";
import arrowhead from "@/assets/devs/sony.jpg";
import fatshark from "@/assets/devs/sony.jpg";
import funcom from "@/assets/devs/sony.jpg";
import digitalExtremes from "@/assets/devs/sony.jpg";
import riotGames from "@/assets/devs/sony.jpg";
import hoyoverse from "@/assets/devs/sony.jpg";
import ioInteractive from "@/assets/devs/sony.jpg";
import netherRealm from "@/assets/devs/sony.jpg";
import rocksteady from "@/assets/devs/sony.jpg";
import monolith from "@/assets/devs/sony.jpg";
import crystalDynamics from "@/assets/devs/sony.jpg";
import eidosMontreal from "@/assets/devs/sony.jpg";
import gearbox from "@/assets/devs/sony.jpg";
import hangar13 from "@/assets/devs/sony.jpg";
import visualConcepts from "@/assets/devs/sony.jpg";
import remnantGames from "@/assets/devs/sony.jpg";
import teamNinja from "@/assets/devs/sony.jpg";
import platinumGames from "@/assets/devs/sony.jpg";
import ryuGaGotoku from "@/assets/devs/sony.jpg";
import atlus from "@/assets/devs/sony.jpg";
import monolithSoft from "@/assets/devs/sony.jpg";
import gameFreak from "@/assets/devs/sony.jpg";
import halLaboratory from "@/assets/devs/sony.jpg";
import intelligentSystems from "@/assets/devs/sony.jpg";
import level5 from "@/assets/devs/sony.jpg";
import arcSystemWorks from "@/assets/devs/sony.jpg";
import snk from "@/assets/devs/sony.jpg";
import supergiant from "@/assets/devs/sony.jpg";
import klei from "@/assets/devs/sony.jpg";

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
    role: "Developer",
    image: sony,
    creditName: "Sony Interactive Entertainment",
    creditUrl: "https://www.playstation.com/en-us/",
  },

  Xbox: {
    bio: "Microsoft's gaming division behind Xbox consoles, Game Pass, and Xbox Game Studios.",
    role: "Developer",
    image: xbox,
    creditName: "Xbox",
    creditUrl: "https://www.xbox.com/",
  },

  "Epic Games": {
    bio: "The company behind Fortnite, the Epic Games Store, and Unreal Engine.",
    role: "Developer",
    image: epicGames,
    creditName: "Epic Games",
    creditUrl: "https://www.epicgames.com/",
  },

  Nintendo: {
    bio: "The legendary Japanese game company behind Mario, Zelda, Pokémon, and the Nintendo Switch.",
    role: "Developer",
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
    role: "Developer",
    image: valve,
    creditName: "Valve",
    creditUrl: "https://www.valvesoftware.com/",
  },

  "Electronic Arts": {
    bio: "One of gaming's biggest publishers, responsible for franchises including Battlefield, The Sims, and EA Sports FC.",
    role: "Developer",
    image: ea,
    creditName: "Electronic Arts",
    creditUrl: "https://www.ea.com/",
  },

  Ubisoft: {
    bio: "French publisher behind Assassin's Creed, Far Cry, Rainbow Six, and a frankly impressive number of open worlds.",
    role: "Developer",
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

  "CD Projekt": {
    bio: "The Polish company behind CD Projekt Red and GOG, responsible for The Witcher and Cyberpunk 2077.",
    role: "Developer",
    image: cdProjekt,
    creditName: "CD PROJEKT",
    creditUrl: "https://www.cdprojekt.com/",
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

  Housemarque: {
    bio: "Developer of Returnal, Resogun, and Super Stardust HD.",
    role: "Developer",
    image: housemarque,
    creditName: "Housemarque",
    creditUrl: "https://housemarque.com/",
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

  "The Coalition": {
    bio: "Developer of Gears of War 4 and Gears 5.",
    role: "Developer",
    image: coalition,
    creditName: "The Coalition",
    creditUrl: "https://www.thecoalitionstudio.com/",
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

  Maxis: {
    bio: "Developer behind The Sims, SimCity, and Spore.",
    role: "Developer",
    image: maxis,
    creditName: "Maxis",
    creditUrl: "https://www.ea.com/ea-studios/maxis",
  },

  "Motive Studio": {
    bio: "Developer of Star Wars: Squadrons and the Dead Space remake.",
    role: "Developer",
    image: motive,
    creditName: "Motive Studio",
    creditUrl: "https://www.ea.com/ea-studios/motive",
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

  "Sledgehammer Games": {
    bio: "Developer of Call of Duty: Advanced Warfare, WWII, and Vanguard.",
    role: "Developer",
    image: sledgehammer,
    creditName: "Sledgehammer Games",
    creditUrl: "https://www.sledgehammergames.com/",
  },

  "Toys for Bob": {
    bio: "Developer of Skylanders, Spyro Reignited Trilogy, and Crash Bandicoot 4.",
    role: "Developer",
    image: toysForBob,
    creditName: "Toys for Bob",
    creditUrl: "https://www.toysforbob.com/",
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

  "4A Games": {
    bio: "Developer of Metro 2033, Metro: Last Light, and Metro Exodus.",
    role: "Developer",
    image: fourAGames,
    creditName: "4A Games",
    creditUrl: "https://www.4a-games.com.mt/",
  },

  "GSC Game World": {
    bio: "Developer of the S.T.A.L.K.E.R. and Cossacks series.",
    role: "Developer",
    image: gscGameWorld,
    creditName: "GSC Game World",
    creditUrl: "https://www.gsc-game.com/",
  },

  "Warhorse Studios": {
    bio: "Developer of Kingdom Come: Deliverance and Kingdom Come: Deliverance II.",
    role: "Developer",
    image: warhorse,
    creditName: "Warhorse Studios",
    creditUrl: "https://warhorsestudios.cz/",
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

  "Sports Interactive": {
    bio: "Developer of Football Manager and the original Championship Manager games.",
    role: "Developer",
    image: sportsInteractive,
    creditName: "Sports Interactive",
    creditUrl: "https://www.sigames.com/",
  },

  "Relic Entertainment": {
    bio: "Strategy studio behind Company of Heroes, Dawn of War, and the original Homeworld.",
    role: "Developer",
    image: relic,
    creditName: "Relic Entertainment",
    creditUrl: "https://www.relic.com/",
  },

  "Firaxis Games": {
    bio: "Strategy studio behind Civilization, XCOM, and Marvel's Midnight Suns.",
    role: "Developer",
    image: firaxis,
    creditName: "Firaxis Games",
    creditUrl: "https://firaxis.com/",
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

  "Arrowhead Game Studios": {
    bio: "Developer of Helldivers, Helldivers 2, and Magicka.",
    role: "Developer",
    image: arrowhead,
    creditName: "Arrowhead Game Studios",
    creditUrl: "https://www.arrowheadgamestudios.com/",
  },

  Fatshark: {
    bio: "Developer of Warhammer: Vermintide, Vermintide 2, and Darktide.",
    role: "Developer",
    image: fatshark,
    creditName: "Fatshark",
    creditUrl: "https://www.fatshark.se/",
  },

  Funcom: {
    bio: "Developer of Conan Exiles, Anarchy Online, and The Secret World.",
    role: "Developer",
    image: funcom,
    creditName: "Funcom",
    creditUrl: "https://www.funcom.com/",
  },

  "Digital Extremes": {
    bio: "Developer of Warframe and The Darkness II, and co-developer of Unreal Tournament.",
    role: "Developer",
    image: digitalExtremes,
    creditName: "Digital Extremes",
    creditUrl: "https://www.digitalextremes.com/",
  },

  "Riot Games": {
    bio: "Developer of League of Legends, Valorant, Teamfight Tactics, and Legends of Runeterra.",
    role: "Developer",
    image: riotGames,
    creditName: "Riot Games",
    creditUrl: "https://www.riotgames.com/",
  },

  HoYoverse: {
    bio: "The gaming brand behind Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.",
    role: "Developer",
    image: hoyoverse,
    creditName: "HoYoverse",
    creditUrl: "https://www.hoyoverse.com/",
  },

  "IO Interactive": {
    bio: "Developer of Hitman, Freedom Fighters, and Kane & Lynch.",
    role: "Developer",
    image: ioInteractive,
    creditName: "IO Interactive",
    creditUrl: "https://ioi.dk/",
  },

  "NetherRealm Studios": {
    bio: "Fighting-game developer behind modern Mortal Kombat and the Injustice series.",
    role: "Developer",
    image: netherRealm,
    creditName: "NetherRealm Studios",
    creditUrl: "https://www.netherrealm.com/",
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

  "Crystal Dynamics": {
    bio: "Developer behind Tomb Raider: Legend, the 2013 Tomb Raider, and Rise of the Tomb Raider.",
    role: "Developer",
    image: crystalDynamics,
    creditName: "Crystal Dynamics",
    creditUrl: "https://www.crystald.com/",
  },

  "Eidos-Montreal": {
    bio: "Developer of Deus Ex: Human Revolution, Mankind Divided, and Marvel's Guardians of the Galaxy.",
    role: "Developer",
    image: eidosMontreal,
    creditName: "Eidos-Montreal",
    creditUrl: "https://www.eidosmontreal.com/",
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

  "Visual Concepts": {
    bio: "Sports developer behind NBA 2K and entries in the WWE 2K series.",
    role: "Developer",
    image: visualConcepts,
    creditName: "Visual Concepts",
    creditUrl: "https://www.vcentertainment.com/",
  },

  "Gunfire Games": {
    bio: "Developer of Remnant: From the Ashes, Remnant II, and Darksiders III.",
    role: "Developer",
    image: remnantGames,
    creditName: "Gunfire Games",
    creditUrl: "https://gunfiregames.com/",
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

  "Ryu Ga Gotoku Studio": {
    bio: "Developer of the Like a Dragon, Yakuza, and Judgment games.",
    role: "Developer",
    image: ryuGaGotoku,
    creditName: "Ryu Ga Gotoku Studio",
    creditUrl: "https://ryu-ga-gotoku.com/",
  },

  Atlus: {
    bio: "RPG developer and publisher behind Persona, Shin Megami Tensei, and Metaphor: ReFantazio.",
    role: "Developer",
    image: atlus,
    creditName: "Atlus",
    creditUrl: "https://www.atlus.com/",
  },

  "Monolith Soft": {
    bio: "RPG developer behind Xenoblade Chronicles and Xenosaga.",
    role: "Developer",
    image: monolithSoft,
    creditName: "Monolith Soft",
    creditUrl: "https://www.monolithsoft.co.jp/",
  },

  "Game Freak": {
    bio: "Developer of the mainline Pokemon games, as well as titles such as Pocket Card Jockey.",
    role: "Developer",
    image: gameFreak,
    creditName: "Game Freak",
    creditUrl: "https://www.gamefreak.co.jp/",
  },

  "HAL Laboratory": {
    bio: "Developer behind Kirby and the original Super Smash Bros. games.",
    role: "Developer",
    image: halLaboratory,
    creditName: "HAL Laboratory",
    creditUrl: "https://www.hallab.co.jp/eng/",
  },

  "Intelligent Systems": {
    bio: "Developer behind Fire Emblem, Paper Mario, and Advance Wars.",
    role: "Developer",
    image: intelligentSystems,
    creditName: "Intelligent Systems",
    creditUrl: "https://www.intsys.co.jp/english/",
  },

  "Level-5": {
    bio: "Developer of Professor Layton, Yo-kai Watch, and Ni no Kuni: Wrath of the White Witch.",
    role: "Developer",
    image: level5,
    creditName: "Level-5",
    creditUrl: "https://www.level5.co.jp/english/",
  },

  "Arc System Works": {
    bio: "Fighting-game developer behind Guilty Gear, BlazBlue, and Dragon Ball FighterZ.",
    role: "Developer",
    image: arcSystemWorks,
    creditName: "Arc System Works",
    creditUrl: "https://www.arcsystemworks.com/",
  },

  SNK: {
    bio: "Developer behind The King of Fighters, Samurai Shodown, and Metal Slug.",
    role: "Developer",
    image: snk,
    creditName: "SNK",
    creditUrl: "https://www.snk-corp.co.jp/us/",
  },

  "Supergiant Games": {
    bio: "Developer of Hades, Bastion, Transistor, and Pyre.",
    role: "Developer",
    image: supergiant,
    creditName: "Supergiant Games",
    creditUrl: "https://www.supergiantgames.com/",
  },

  "Klei Entertainment": {
    bio: "Developer of Don't Starve, Oxygen Not Included, and Mark of the Ninja.",
    role: "Developer",
    image: klei,
    creditName: "Klei Entertainment",
    creditUrl: "https://www.klei.com/",
  },
};

export const writerProfile = (name: string): WriterProfile | undefined => writerProfiles[name];

export const writerBio = (name: string): string => writerProfiles[name]?.bio ?? "";

/** Profile roles are shared by every card and developer page. */
export const writerRole = (name: string): string => writerProfiles[name]?.role ?? "Developer";
