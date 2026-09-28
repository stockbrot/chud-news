import { emotes } from "../config/emotes";

export type EmotePlatform = "7tv" | "bttv";
export type EmoteSize = "1x" | "2x" | "3x";
export interface EmoteDefinition {
  platform: EmotePlatform;
  id: string;
}

export function resolveEmote(name: string, definition?: EmoteDefinition, size: EmoteSize = "2x") {
  const entry =
    definition ?? (Object.hasOwn(emotes, name) ? emotes[name as keyof typeof emotes] : undefined);
  if (!entry) return undefined;
  if (!/^[a-zA-Z0-9]+$/.test(entry.id)) throw new Error(`Invalid emote ID for "${name}".`);
  if (!["1x", "2x", "3x"].includes(size)) throw new Error(`Invalid emote resolution: ${size}`);
  if (entry.platform !== "7tv" && entry.platform !== "bttv")
    throw new Error(`Invalid emote platform: ${entry.platform}`);
  return {
    // BTTV's extensionless endpoint preserves the original animated format.
    src:
      entry.platform === "7tv"
        ? `https://cdn.7tv.app/emote/${entry.id}/${size}.webp`
        : `https://cdn.betterttv.net/emote/${entry.id}/${size}`,
  };
}
