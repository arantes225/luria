
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store, private"
};

const enc = new TextEncoder();
const hex = (bytes: Uint8Array) => [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");

async function sha256Hex(input: string) {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(input));
  return hex(new Uint8Array(digest));
}

function normalizeUsername(value: unknown) {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 30);
}

function validUsername(value: string) {
  return /^[a-z0-9][a-z0-9._-]{2,29}$/.test(value);
}

function validCode(value: unknown) {
  return /^\d{6}$/.test(String(value ?? ""));
}
// Compatibility only while the static site is held back by unrelated CI failures.
// Calling daily_code explicitly revokes this older PIN for that account.
function validLegacyPin(value: unknown) {
  return /^\d{4}$/.test(String(value ?? ""));
}
function randomSaltHex() {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return hex(salt);
}
function bytesFromHex(value: string) {
  return new Uint8Array((value.match(/.{2}/g) || []).map(x => parseInt(x, 16)));
}
async function deriveLegacyHash(pin: string, saltHex: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2", hash: "SHA-256", salt: bytesFromHex(saltHex), iterations: 120000
  }, key, 256);
  return hex(new Uint8Array(bits));
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: cors });
}

// O código é calculado exclusivamente no servidor. O segredo nunca chega ao navegador.
// Um segredo de aplicação dedicado pode ser definido via LURIA_QUICK_CHART_DAILY_SECRET.
const ZONE = "America/Sao_Paulo";
function brazilDay(at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE, year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(at);
  const value = (type: string) => parts.find(part => part.type === type)?.value ?? "";
  return [value("year"), value("month"), value("day")].join("-");
}
async function dailyCode(owner: string, at: Date) {
  const secret = Deno.env.get("LURIA_QUICK_CHART_DAILY_SECRET")
    || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || secret.length < 32) throw new Error("Segredo de autenticação indisponível.");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key,
    enc.encode("luria.external-quick-chart.daily.v1|" + owner + "|" + brazilDay(at)));
  const prefix = new DataView(signature).getUint32(0, false);
  return String(prefix % 1_000_000).padStart(6, "0");
}
function equalCode(actual: string, expected: string) {
  if (!validCode(actual) || !validCode(expected)) return false;
  let mismatch = 0;
  for (let i = 0; i < 6; i++) mismatch |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0;
}

function requestIp(req: Request) {
  return (
    req.headers.get("cf-connecting-ip")
    || req.headers.get("x-real-ip")
    || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown"
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Método inválido." }, 405);

  try {
    const payload = await req.json();
    const sb = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Temporary compatibility for already-published clients while Pages is blocked.
    // Newly displayed daily codes revoke the legacy PIN via the daily_code branch.
    if (payload.action === "set_pin") {
      const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i,"");
      if (!token) return json({ error: "Sessão inválida." }, 401);
      const { data: authData, error: authError } = await sb.auth.getUser(token);
      if (authError || !authData?.user) return json({ error: "Sessão inválida." }, 401);
      if (!validLegacyPin(payload.pin)) return json({ error: "Use um PIN de 4 dígitos." }, 400);
      const { data: profile, error: profileError } = await sb.from("profiles")
        .select("username").eq("user_id",authData.user.id).maybeSingle();
      if (profileError) throw profileError;
      const verifiedUsername = normalizeUsername(profile?.username);
      if (!validUsername(verifiedUsername)) return json({ error: "Defina primeiro um nome de usuário válido em Perfil e Conta." }, 400);
      const salt = randomSaltHex();
      const pinHash = await deriveLegacyHash(String(payload.pin),salt);
      const { error: saveError } = await sb.from("external_quick_chart_portals").upsert({
        owner_id:authData.user.id,access_slug:verifiedUsername,
        access_code_hash:null,pin_hash:pinHash,pin_salt:salt,pin_configured_at:new Date().toISOString()
      },{onConflict:"owner_id"});
      if (saveError) throw saveError;
      return json({ok:true,username:verifiedUsername});
    }

    if (payload.action === "daily_code") {
      const authHeader = req.headers.get("authorization") || "";
      const token = authHeader.replace(/^Bearer\s+/i, "");
      if (!token) return json({ error: "Entre na LURIA para consultar o código." }, 401);
      const { data: authData, error: authError } = await sb.auth.getUser(token);
      if (authError || !authData?.user) return json({ error: "Sessão expirada. Entre novamente." }, 401);
      const { data: profile, error: profileError } = await sb.from("profiles")
        .select("username").eq("user_id", authData.user.id).maybeSingle();
      if (profileError) throw profileError;
      const verifiedUsername = normalizeUsername(profile?.username);
      if (!validUsername(verifiedUsername)) return json({ error: "Defina um nome de usuário em Perfil e Conta." }, 400);
      // Inicializa o caderno para novos usuários sem exigir criação manual de PIN.
      const { error: portalError } = await sb.from("external_quick_chart_portals")
        .upsert({ owner_id: authData.user.id, access_slug: verifiedUsername,
          pin_hash: null, pin_salt: null, pin_configured_at: null }, { onConflict: "owner_id" });
      if (portalError) throw portalError;
      const now = new Date();
      return json({ ok: true, username: verifiedUsername,
        code: await dailyCode(authData.user.id, now),
        day: brazilDay(now), zone: ZONE });
    }

    const username = normalizeUsername(payload.username);
    const suppliedCode = String(payload.code ?? "");
    const legacyPin = String(payload.pin ?? "");
    const tryDaily = validCode(suppliedCode);
    const tryLegacy = validLegacyPin(legacyPin);
    if (!validUsername(username) || (!tryDaily && !tryLegacy)) {
      return json({ error: "Usuário ou código inválido." }, 401);
    }

    const ipKey = await sha256Hex(`${username}|${requestIp(req)}`);
    const now = new Date();

    const accountKey = await sha256Hex("luria:daily-code:account:" + username);
    // Reserva atômica por conta e por IP antes de testar a credencial.
    // A transação Postgres evita ultrapassar o limite com pedidos simultâneos.
    const { data: accountAllowed, error: accountLimitError } = await sb
      .rpc("quick_chart_claim_attempt", { p_key_hash: accountKey });
    if (accountLimitError) throw accountLimitError;
    if (accountAllowed !== true) {
      return json({ error: "Muitas tentativas. Aguarde 30 minutos e tente novamente." }, 429);
    }
    const { data: ipAllowed, error: ipLimitError } = await sb
      .rpc("quick_chart_claim_attempt", { p_key_hash: ipKey });
    if (ipLimitError) throw ipLimitError;
    if (ipAllowed !== true) {
      return json({ error: "Muitas tentativas. Aguarde 30 minutos e tente novamente." }, 429);
    }

    const { data: profile, error: profileError } = await sb
      .from("profiles")
      .select("user_id")
      .eq("username", username)
      .maybeSingle();

    if (profileError) throw profileError;

    let portal = null;
    if (profile?.user_id) {
      const result = await sb
        .from("external_quick_chart_portals")
        .select("owner_id,pin_hash,pin_salt,content,content_expires_at,last_accessed_at,updated_at")
        .eq("owner_id", profile.user_id)
        .maybeSingle();
      if (result.error) throw result.error;
      portal = result.data;
    }

    const expectedCode = portal?.owner_id && tryDaily ? await dailyCode(portal.owner_id, now) : "";
    let authenticated = Boolean(portal?.owner_id && tryDaily && equalCode(suppliedCode, expectedCode));
    if (!authenticated && tryLegacy && portal?.pin_hash && portal?.pin_salt) {
      // Old four-digit PINs are accepted only before this account requests a new daily code.
      authenticated = (await deriveLegacyHash(legacyPin,portal.pin_salt)) === portal.pin_hash;
    }
    if (!authenticated) {
      return json({ error: "Usuário ou código inválido." }, 401);
    }

    const { error: resetError } = await sb.from("external_quick_chart_attempts")
      .delete().in("key_hash", [ipKey, accountKey]);
    if (resetError) throw resetError;

    if (payload.action === "verify_code") return json({ ok: true });

    let content = portal.content || {};
    let expiresAt = portal.content_expires_at ? new Date(portal.content_expires_at) : null;

    if (expiresAt && expiresAt.getTime() <= now.getTime()) {
      content = {};
      expiresAt = null;
      const { error: clearError } = await sb
        .from("external_quick_chart_portals")
        .update({ content: {}, content_expires_at: null })
        .eq("owner_id", portal.owner_id);
      if (clearError) throw clearError;
    }

    if (payload.action === "load") {
      await sb.from("external_quick_chart_portals")
        .update({ last_accessed_at: now.toISOString() })
        .eq("owner_id", portal.owner_id);

      return json({
        ok: true,
        chart: {
          content,
          expires_at: expiresAt?.toISOString() || null,
          updated_at: portal.updated_at
        }
      });
    }

    if (payload.action === "save") {
      const nextContent = payload.content && typeof payload.content === "object" ? payload.content : {};
      if (JSON.stringify(nextContent).length > 120000) return json({ error: "Conteúdo muito grande." }, 413);

      const nextExpiry = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      const { data: updated, error: updateError } = await sb
        .from("external_quick_chart_portals")
        .update({
          content: nextContent,
          content_expires_at: nextExpiry,
          last_accessed_at: now.toISOString()
        })
        .eq("owner_id", portal.owner_id)
        .select("updated_at,content_expires_at")
        .single();

      if (updateError) throw updateError;
      return json({ ok: true, updated_at: updated.updated_at, expires_at: updated.content_expires_at });
    }

    if (payload.action === "clear") {
      const { error: clearError } = await sb
        .from("external_quick_chart_portals")
        .update({ content: {}, content_expires_at: null, last_accessed_at: now.toISOString() })
        .eq("owner_id", portal.owner_id);
      if (clearError) throw clearError;
      return json({ ok: true });
    }

    return json({ error: "Ação inválida." }, 400);
  } catch (error) {
    console.error(error);
    return json({ error: "Não foi possível acessar o prontuário." }, 500);
  }
});
