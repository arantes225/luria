// Official production origin and the exact domain still configured in CNAME.
const ALLOWED_ORIGINS = new Set([
  "https://www.luriamedicina.com.br",
  "https://www.resibulando.online",
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

// Only the two equivalent, browser-capable POST endpoints use this policy.
// No Origin never substitutes for the handler's existing authentication.
export function withCors(handler: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    const rawOrigin = req.headers.get("Origin");
    const origin = rawOrigin === null ? null : normalizeOrigin(rawOrigin);
    if (rawOrigin !== null && (!origin || !ALLOWED_ORIGINS.has(origin))) {
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
}
