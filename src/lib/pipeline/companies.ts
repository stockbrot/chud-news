/** IGDB legal names → the names the site's dev profiles use. */
const companyAliases: Record<string, string> = {
  "sony interactive entertainment": "Sony",
  "sony computer entertainment": "Sony",
  "xbox game studios": "Xbox",
  "microsoft studios": "Xbox",
  microsoft: "Xbox",
  "cd projekt": "CD Projekt Red",
  "cd projekt red": "CD Projekt Red",
  "remedy entertainment": "Remedy",
  "capcom co., ltd.": "Capcom",
  "bethesda softworks": "Bethesda",
  "bethesda game studios": "Bethesda",
  "square enix": "Square Enix",
  "bandai namco entertainment": "Bandai Namco",
  "activision blizzard": "Activision",
  "insomniac games": "Insomniac Games",
  "io interactive": "IO Interactive",
  "io interactive a/s": "IO Interactive",
  "from software": "FromSoftware",
  sega: "SEGA",
};

export const aliasCompany = (name: string) =>
  companyAliases[name.trim().toLowerCase()] ?? name.trim();
