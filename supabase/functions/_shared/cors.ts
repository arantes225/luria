// Official production origin and the exact domain still configured in CNAME.
const ALLOWED_ORIGINS = new Set([
  "https://www.traubemedicina.com.br",
  "https://www.resibulando.online",
]);

const SITE_ALLOWED_ORIGINS = new Set([
  "https://www.traubemedicina.com.br",
  "https://traubemedicina.com.br",
  "https://resibulando.online",
  "https://www.resibulando.online",
  "https://arantes225.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

// Supabase JS >= 2.95 also sends retry/telemetry headers; the callers use 2.110.6.
const ALLOWED_HEADERS = [
  "authorization", "x-client-info", "apikey", "content-type",
  "x-retry-count", "traceparent", "tracestate", "baggage",
];

function normalizeOrigin(value: string): string | null {
  try {
    if (/[\x00-\x20\x7f\\]/.test(value) || value.includes("@")) return null;
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password
        || url.pathname !== "/" || url.search || url.hash) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function normalizeSiteOrigin(value: string): string | null {
  try {
    if (/[\x00-\x20\x7f\\]/.test(value) || value.includes("@")) return null;
    const url = new URL(value);
    const isLocal = (url.hostname === "localhost" || url.hostname === "127.0.0.1") && url.protocol === "http:";
    if ((!isLocal && url.protocol !== "https:") || url.username || url.password
        || url.pathname !== "/" || url.search || url.hash) return null;
    return SITE_ALLOWED_ORIGINS.has(url.origin) ? url.origin : null;
  } catch {
    return null;
  }
}

function vary(headers: Headers, names: string[]) {
  const values = (headers.get("Vary") || "").split(",").map((v) => v.trim()).filter(Boolean);
  for (const name of names) {
    if (!values.some((v) => v.toLowerCase() === name.toLowerCase())) values.push(name);
  }
  headers.set("Vary", values.join(", "));
}

function denied(error: string, status: number) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { "Content-Type": "application/json", "Vary": "Origin" },
  });
}

function buildCorsMiddleware(validateOrigin: (value: string) => string | null) {
  return (handler: (req: Request) => Promise<Response> | Response) => {
    return async (req: Request): Promise<Response> => {
      const rawOrigin = req.headers.get("Origin");
      const origin = rawOrigin === null ? null : validateOrigin(rawOrigin);
      if (rawOrigin !== null && !origin) {
        return denied("ORIGIN_NOT_ALLOWED", 403);
      }

      if (req.method === "OPTIONS") {
        const method = req.headers.get("Access-Control-Request-Method");
        const requested = (req.headers.get("Access-Control-Request-Headers") || "")
          .split(",").map((header) => header.trim().toLowerCase());
        if (!origin || method !== "POST"
            || requested.some((header) => header && !ALLOWED_HEADERS.includes(header))) {
          const response = denied("INVALID_PREFLIGHT", 403);
          vary(response.headers, ["Access-Control-Request-Method", "Access-Control-Request-Headers"]);
          return response;
        }
        return new Response("ok", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": ALLOWED_HEADERS.join(", "),
            "Vary": "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
          },
        });
      }

      const response = await handler(req);
      const headers = new Headers(response.headers);
      if (origin) headers.set("Access-Control-Allow-Origin", origin);
      vary(headers, ["Origin"]);
      return new Response(response.body, {
        status: response.status, statusText: response.statusText, headers,
      });
    };
  };
}

// Strict production-only origin policy for admin/internal browser-capable POST endpoints.
export const withCors = buildCorsMiddleware((value) => {
  const origin = normalizeOrigin(value);
  return origin && ALLOWED_ORIGINS.has(origin) ? origin : null;
});

// Site origin policy supporting official domains plus localhost dev server.
export const withSiteCors = buildCorsMiddleware(normalizeSiteOrigin);
