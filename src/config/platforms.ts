/** Platform families are independent of game genres. */
export const platforms = ["Xbox", "PlayStation", "PC", "Nintendo"] as const;
export type Platform = (typeof platforms)[number];
export const platformSlug = (platform: Platform) => platform.toLowerCase();
