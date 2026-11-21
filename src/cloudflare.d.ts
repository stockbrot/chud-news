/* Typed loosely here; src/lib/server/env.ts narrows it. Kept out of the global
   scope so Workers types don't clash with the DOM types the client scripts use. */
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
