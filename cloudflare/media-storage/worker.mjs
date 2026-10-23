/*
 * LURIA private media bridge — optional Cloudflare R2 integration.
 * Only user-owned objects. Never expose R2 credentials in the browser.
 * No route from the production site is enabled by this file alone.
 */
const ROOT = "/v1/files/";
const MAX_BYTES_DEFAULT = 10 * 1024 * 1024;
const MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "application/pdf"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(value, status = 200, headers = {}) {
  return new Response(JSON.stringify(value), { status, headers: {
    "content-type": "application/json; charset=utf-8", "cache-control": "no-store",
    "referrer-policy": "no-referrer", ...headers
  }});
}

function cors(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map(x => x.trim()).filter(Boolean);
  if (origin && !allowed.includes(origin)) return null;
  return {
    ...(origin ? { "access-control-allow-origin": origin, "vary": "Origin" } : {}),
    "access-control-allow-methods": "GET, PUT, DELETE, POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type, x-luria-upsert",
    "access-control-max-age": "600"
  };
}

function cleanKey(key) {
  if (typeof key !== "string" || key.length > 900) throw new Error("invalid_key");
  const parts = key.split("/");
  if (parts.length < 3 || !UUID.test(parts[0])) throw new Error("invalid_key");
  if (parts.some(p => !p || p === "." || p === ".." || !/^[a-zA-Z0-9._-]{1,180}$/.test(p))) {
    throw new Error("invalid_key");
  }
  return parts.join("/");
}

function ownerOf(key) { return key.split("/")[0].toLowerCase(); }
function ensureOwner(key, userId) {
  if (ownerOf(key) !== userId.toLowerCase()) throw new Error("forbidden");
}

async function authenticatedUser(request, env) {
  const token = (request.headers.get("authorization") || "").match(/^Bearer ([A-Za-z0-9._-]+)$/)?.[1];
  if (!token || token.length > 8192) throw new Error("unauthorized");
  const base = String(env.SUPABASE_URL || "").replace(/\/$/, "");
  if (!/^https:\/\//.test(base) || !env.SUPABASE_PUBLISHABLE_KEY) throw new Error("configuration");
  const response = await fetch(base + "/auth/v1/user", {
    headers: { authorization: "Bearer " + token, apikey: env.SUPABASE_PUBLISHABLE_KEY },
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error("unauthorized");
  const user = await response.json();
  if (!UUID.test(user?.id || "")) throw new Error("unauthorized");
  return user.id;
}

function toHex(bytes) {
  return [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2, "0")).join("");
}
async function signature(env, key, expires) {
  if (!env.SIGNING_SECRET || String(env.SIGNING_SECRET).length < 32) throw new Error("configuration");
  const secret = new TextEncoder().encode(env.SIGNING_SECRET);
  const cryptoKey = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(key + "\n" + expires)));
}
function sameSignature(a, b) {
  if (!/^[0-9a-f]{64}$/.test(a || "") || a.length !== b.length) return false;
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function signedGetAllowed(url, env, key) {
  const expiry = url.searchParams.get("expires");
  const supplied = url.searchParams.get("sig");
  if (!expiry || !/^\d{10}$/.test(expiry) || !supplied) return false;
  const now = Math.floor(Date.now() / 1000);
  const exp = Number(expiry);
  if (exp < now || exp > now + 900) return false;
  return sameSignature(supplied, await signature(env, key, expiry));
}
async function readLimited(request, max) {
  const advertised = Number(request.headers.get("content-length") || 0);
  if (advertised > max) throw new Error("too_large");
  if (!request.body) throw new Error("empty_body");
  const reader = request.body.getReader();
  const chunks = []; let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) throw new Error("too_large");
      chunks.push(value);
    }
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  if (!size) throw new Error("empty_body");
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}
function filePath(pathname) {
  if (!pathname.startsWith(ROOT)) throw new Error("invalid_key");
  try { return cleanKey(decodeURIComponent(pathname.slice(ROOT.length))); }
  catch { throw new Error("invalid_key"); }
}
function statusFor(error) {
  return { unauthorized: 401, forbidden: 403, invalid_key: 400, invalid_media_type: 415,
    empty_body: 400, too_large: 413, not_found: 404, writes_disabled: 503,
    configuration: 503, invalid_request: 400 }[error?.message] || 500;
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin");
    const h = cors(origin, env);
    if (!h) return json({ error: "origin_not_allowed" }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const url = new URL(request.url);
    try {
      if (!env.R2_MEDIA) throw new Error("configuration");
      if (request.method === "GET" && url.pathname === "/healthz") return json({ ok: true }, 200, h);
      if (request.method === "POST" && url.pathname === "/v1/sign") {
        const user = await authenticatedUser(request, env);
        if (Number(request.headers.get("content-length") || 0) > 2048) throw new Error("invalid_request");
        const payload = await request.json().catch(() => null);
        const key = cleanKey(payload?.key);
        ensureOwner(key, user);
        const ttl = Number(payload?.expiresIn || 300);
        if (!Number.isInteger(ttl) || ttl < 1 || ttl > 900) throw new Error("invalid_request");
        const expires = String(Math.floor(Date.now() / 1000) + ttl);
        const sig = await signature(env, key, expires);
        const signedUrl = new URL(ROOT + key.split("/").map(encodeURIComponent).join("/"), url.origin);
        signedUrl.searchParams.set("expires", expires);
        signedUrl.searchParams.set("sig", sig);
        return json({ signedUrl: signedUrl.toString() }, 200, h);
      }
      if (!url.pathname.startsWith(ROOT)) return json({ error: "not_found" }, 404, h);
      const key = filePath(url.pathname);
      if (request.method === "GET") {
        const signed = await signedGetAllowed(url, env, key);
        if (!signed) ensureOwner(key, await authenticatedUser(request, env));
        const object = await env.R2_MEDIA.get(key);
        if (!object) throw new Error("not_found");
        return new Response(object.body, { status: 200, headers: {
          ...h, "content-type": object.httpMetadata?.contentType || "application/octet-stream",
          "cache-control": "private, no-store", "x-content-type-options": "nosniff",
          "referrer-policy": "no-referrer"
        }});
      }
      const user = await authenticatedUser(request, env);
      ensureOwner(key, user);
      if (String(env.MEDIA_WRITE_ENABLED || "false") !== "true") throw new Error("writes_disabled");
      if (request.method === "PUT") {
        const contentType = String(request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
        if (!MIME.has(contentType)) throw new Error("invalid_media_type");
        const cap = Math.min(Math.max(Number(env.MAX_FILE_BYTES) || MAX_BYTES_DEFAULT, 1), MAX_BYTES_DEFAULT);
        const body = await readLimited(request, cap);
        if (request.headers.get("x-luria-upsert") !== "true" && await env.R2_MEDIA.head(key)) {
          return json({ error: "already_exists" }, 409, h);
        }
        await env.R2_MEDIA.put(key, body, { httpMetadata: { contentType } });
        return json({ path: key }, 200, h);
      }
      if (request.method === "DELETE") {
        await env.R2_MEDIA.delete(key);
        return json({ path: key }, 200, h);
      }
      return json({ error: "method_not_allowed" }, 405, h);
    } catch (error) {
      return json({ error: statusFor(error) === 500 ? "internal_error" : error.message }, statusFor(error), h);
    }
  }
};
