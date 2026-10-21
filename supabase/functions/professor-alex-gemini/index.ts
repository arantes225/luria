import { createClient } from "npm:@supabase/supabase-js@2.110.6";
import { getAlexSystemInstruction } from "./prompts.ts";

const ALLOWED_ORIGINS = new Set([
  "https://www.luriamedicina.com.br",
  "https://luriamedicina.com.br",
  "https://resibulando.online",
  "https://www.resibulando.online",
  "https://arantes225.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);
const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const TTS_MODEL = "gemini-3.8-flash-tts";
const TTS_MODEL = "gemini-3.8-flash-tts";
const MAX_PDF_BASE64 = 6_000_000; // ~4.5MB of raw PDF
const MAX_BODY_BYTES = 6_500_000;

function corsHeaders(origin: string | null) {
  return {
    ...(origin && ALLOWED_ORIGINS.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
}

function json(payload: Record<string, unknown>, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(payload), { status, headers });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "origin_not_allowed" }, 403, headers);
  }
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, headers);

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return json({ error: "unauthorized" }, 401, headers);

  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anon || !serviceRole) {
    return json({ error: "backend_not_configured" }, 503, headers);
  }

  const client = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await client.auth.getUser(token);
  if (authError || !user || user.is_anonymous) {
    return json({ error: "unauthorized" }, 401, headers);
  }

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413, headers);

  let data: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413, headers);
    data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw Error("invalid body");
  } catch {
    return json({ error: "invalid_body" }, 400, headers);
  }

  const admin = createClient(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
  if (data.action === "usage") {
    const { data: usage, error: usageError } = await admin.rpc("professor_alex_token_usage", { p_user_id: user.id });
    if (usageError || !usage || typeof usage !== "object") {
      return json({ error: "usage_limit_unavailable" }, 503, headers);
    }
    return json({ usage }, 200, headers);
  }

  const intent = ["learn", "question", "material"].includes(String(data.intent)) ? String(data.intent) : "learn";
  const mode = (data.mode === "estourado") ? "estourado" : "normal";
  const channel = (data.channel === "voice") ? "voice" : "chat";
  const area = String(data.area || "").trim().slice(0, 120);
  const topic = String(data.topic || "").trim().slice(0, 180);
  const prompt = String(data.prompt || "").trim().slice(0, 4000);
  const modelToUse = Deno.env.get("ALEX_GEMINI_MODEL") || (typeof data.model === "string" && data.model.trim() ? data.model.trim() : DEFAULT_MODEL);
  const rawHistory = Array.isArray(data.history) ? data.history.slice(-8) : [];
  if (!topic && !prompt) return json({ error: "empty_prompt" }, 400, headers);
  if (!Deno.env.get("CLIENT_GEMINI")) return json({ error: "gemini_secret_missing" }, 503, headers);

  const { data: initialUsage, error: initialUsageError } = await admin.rpc("professor_alex_token_usage", { p_user_id: user.id });
  if (initialUsageError || !initialUsage || typeof initialUsage !== "object") {
    return json({ error: "usage_limit_unavailable" }, 503, headers);
  }
  if (Number(initialUsage.remaining_tokens || 0) <= 0) {
    return json({ error: "token_budget_reached", usage: initialUsage }, 429, headers);
  }

  const contents: Array<Record<string, unknown>> = [];

  // Inclui histórico de mensagens anteriores da sessão do aluno (se fornecido)
  for (const item of rawHistory) {
    if (item && typeof item === "object" && typeof item.text === "string" && item.text.trim()) {
      const role = item.role === "alex" || item.role === "model" ? "model" : "user";
      contents.push({ role, parts: [{ text: item.text.trim().slice(0, 2000) }] });
    }
  }

  // Prepara a mensagem atual do usuário
  const userParts: Array<Record<string, unknown>> = [];
  if (topic && topic !== prompt) {
    userParts.push({ text: `[Tema de estudo: ${topic}]` });
  }
  userParts.push({ text: prompt || topic });

  const file = data.file;
  if (file !== undefined && file !== null) {
    if (typeof file !== "object" || Array.isArray(file)) return json({ error: "invalid_file" }, 400, headers);
    const f = file as Record<string, unknown>;
    const name = String(f.name || "arquivo").slice(0, 120);
    if (f.kind === "pdf") {
      const base64 = String(f.data || "");
      if (base64.length > MAX_PDF_BASE64 || !base64.length || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
        return json({ error: "invalid_file" }, 400, headers);
      }
      userParts.push({ text: "Leia o PDF anexado como material de referência: " + name });
      userParts.push({ inline_data: { mime_type: "application/pdf", data: base64 } });
    } else if (f.kind === "text") {
      const fileText = String(f.text || "").slice(0, 70_000);
      if (!fileText.trim()) return json({ error: "invalid_file" }, 400, headers);
      userParts.push({ text: "Material de referência (" + name + "):\n" + fileText });
    } else {
      return json({ error: "unsupported_file" }, 415, headers);
    }
  }

  contents.push({ role: "user", parts: userParts });

  const system = getAlexSystemInstruction(mode, channel);

  const apiKey = Deno.env.get("CLIENT_GEMINI")!;
  let response: Response;
  try {
    response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelToUse + ":generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: mode === "estourado" ? 0.85 : 0.60,
          topP: 0.95,
          maxOutputTokens: channel === "voice" ? 300 : 600,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      signal: AbortSignal.timeout(50_000),
    });
  } catch (cause) {
    // Only record the error category; never log prompts, API keys, attachments or
    // raw provider error messages.
    console.warn("[alex-gemini] provider_connection_failure", cause instanceof DOMException ? cause.name : "network_failure");
    return json({ error: "gemini_connection_failed" }, 502, headers);
  }
  if (!response.ok) {
    const provider = await response.json().catch(() => ({}));
    // Upstream messages may contain key fragments or user input, so only inspect
    // them locally and expose a finite set of nonsensitive error categories.
    const message = String(provider?.error?.message || "").toLowerCase();
    const apiStatus = String(provider?.error?.status || "").slice(0, 60);
    let reason: string;
    if (/api.key.*(invalid|expired|leaked|blocked)|api_key_invalid|invalid api key|api key not valid|api key was reported/.test(message)) {
      reason = "gemini_key_invalid";
    } else if (/billing|payment method|payment profile|quota project/.test(message)) {
      reason = "gemini_billing_required";
    } else if (/not found|not supported for generatecontent|does not exist|not available to your project/.test(message) || response.status === 404) {
      reason = "gemini_model_unavailable";
    } else if (/disabled|not enabled|service usage/.test(message)) {
      reason = "gemini_api_disabled";
    } else if (response.status === 429) {
      reason = "gemini_rate_limited";
    } else if (response.status === 401 || response.status === 403) {
      reason = "gemini_key_rejected";
    } else if (response.status === 400) {
      reason = "gemini_invalid_request";
    } else {
      reason = "gemini_unavailable";
    }
    console.warn("[alex-gemini] provider_error", { http_status: response.status, api_status: /^[A-Z_]+$/.test(apiStatus) ? apiStatus : "UNKNOWN", category: reason, model: modelToUse });
    return json({ error: reason, provider_status: response.status }, response.status === 429 ? 429 : 502, headers);
  }

  const result = await response.json().catch(() => null);
  const answer = result?.candidates?.[0]?.content?.parts
    ?.filter((part: { thought?: boolean }) => !part.thought)
    ?.map((part: { text?: string }) => part.text || "")
    .filter(Boolean).join("\n").trim();
  if (!answer) return json({ error: "empty_response" }, 502, headers);

  let audioBase64: string | null = null;
  let audioMimeType: string = "audio/wav";

  if (channel === "voice") {
    try {
      const voiceText = answer
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/#{1,6}\s+/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/<[^>]*>/g, "")
        .slice(0, 1500)
        .trim();

      const ttsResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + TTS_MODEL + ":generateContent", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: voiceText,
              speech_metadata: {
                style: mode === "estourado" ? "exasperated, impatient and explosive" : "cheerful and friendly"
              }
            }]
          }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Puck"
                }
              }
            }
          }
        }),
        signal: AbortSignal.timeout(25_000),
      });

      if (ttsResponse.ok) {
        const ttsData = await ttsResponse.json().catch(() => null);
        const part = ttsData?.candidates?.[0]?.content?.parts?.[0];
        const rawAudio = part?.inlineData?.data || part?.inline_data?.data;
        if (rawAudio) {
          audioBase64 = rawAudio;
          audioMimeType = part?.inlineData?.mimeType || part?.inline_data?.mime_type || "audio/wav";
        }
      } else {
        console.warn("[alex-gemini] TTS non-ok", ttsResponse.status);
      }
    } catch (ttsErr) {
      console.warn("[alex-gemini] TTS failure:", ttsErr);
    }
  }

  const metadata = result?.usageMetadata || {};
  const inputTokens = Number(metadata.promptTokenCount || 0);
  const outputTokens = Number(metadata.candidatesTokenCount || 0);
  const totalTokens = Number(metadata.totalTokenCount || (inputTokens + outputTokens));
  const { data: usage, error: usageError } = await admin.rpc("record_professor_alex_token_usage", {
    p_user_id: user.id,
    p_channel: channel,
    p_input_tokens: Number.isFinite(inputTokens) ? inputTokens : 0,
    p_output_tokens: Number.isFinite(outputTokens) ? outputTokens : 0,
    p_total_tokens: Number.isFinite(totalTokens) ? totalTokens : 0,
  });
  if (usageError || !usage || typeof usage !== "object") {
    console.error("[alex-gemini] token_accounting_failure");
    return json({ answer, audio: audioBase64, audioMimeType, model: modelToUse, usage: initialUsage, accounting_pending: true }, 200, headers);
  }
  return json({ answer, audio: audioBase64, audioMimeType, model: modelToUse, usage }, 200, headers);
});
