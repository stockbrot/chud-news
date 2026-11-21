import { defineMiddleware } from "astro:middleware";

/**
 * Guards /admin and /api/admin with HTTP Basic auth (any username, password =
 * ADMIN_PASSWORD). Free, no setup. Cloudflare Access can sit in front later;
 * a verified Access user is let through too.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) return next();

  const { env } = await import("@/lib/server/env");
  if (context.request.headers.get("cf-access-authenticated-user-email")) return next();

  const password = env.ADMIN_PASSWORD;
  if (!password) return new Response("Set ADMIN_PASSWORD to use the dashboard.", { status: 503 });
  const header = context.request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = atob(encoded);
    const given = decoded.slice(decoded.indexOf(":") + 1);
    if (given === password) return next();
  }
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Chud News admin"' },
  });
});
