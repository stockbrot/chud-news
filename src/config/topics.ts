/** Choose the main genre for each game using its topic field. */
export const topics = ["Action Adventure", "RPG", "Shooter", "Horror", "Survival", "Strategy", "Simulation", "Racing", "Sports", "Fighting", "Platformer", "Puzzle"] as const;

export type Topic = (typeof topics)[number];

export const topicSlug = (topic: Topic) => topic.toLowerCase().replace(/\s+/g, "-");

export const topicMeta: Record<Topic, { summary: string }> = {
  "Action Adventure": { summary: "Combat, exploration, and big adventures." },
  "RPG": { summary: "Character builds, quests, and choices." },
  "Shooter": { summary: "First-person and third-person firefights." },
  "Horror": { summary: "Survival horror and games built to scare you." },
  "Survival": { summary: "Gather, craft, build, and stay alive." },
  "Strategy": { summary: "Tactics, armies, and thinking ahead." },
  "Simulation": { summary: "Build, manage, or simulate a world." },
  "Racing": { summary: "Cars, tracks, and chasing faster times." },
  "Sports": { summary: "Sports games, on and off the pitch." },
  "Fighting": { summary: "Combos, counters, and one-on-one combat." },
  "Platformer": { summary: "Jumping, movement, and obstacle courses." },
  "Puzzle": { summary: "Logic, discovery, and figuring things out." },
};
