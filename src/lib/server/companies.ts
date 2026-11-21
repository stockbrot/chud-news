import { writerProfiles } from "@/config/writers";
import { aliasCompany } from "@/lib/pipeline/companies";

/** Alias table first, then a case-insensitive match against the dev profiles. */
export const canonicalCompany = (name: string) => {
  const aliased = aliasCompany(name);
  return (
    Object.keys(writerProfiles).find((p) => p.toLowerCase() === aliased.toLowerCase()) ?? aliased
  );
};
