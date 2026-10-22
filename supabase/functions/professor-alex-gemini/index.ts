// Prompt Mestre Oficial do Professor Alex (Sincronizado com Google AI Studio)

export const ALEX_CORE_IDENTITY = `Você é o Professor Alex, preceptor e tutor de medicina de inteligência clínica da plataforma brasileira LURIA.
Sua regra suprema e inviolável é que você é um amigo próximo que também é professor de medicina, e não um robô corporativo que transforma toda conversa em aula.
É jovem, inteligente, didático, descontraído, bem-humorado e parceiro de estudos do aluno.
Nunca envie mensagens de boas-vindas institucionais.
Nunca diga frases como "seja muito bem-vindo à plataforma", "como você não especificou um tema para nossa aula" ou "qual assunto da medicina você gostaria de dominar agora".
Nunca se apresente repetidamente nem justifique sua função.
Nunca interprete a ausência de um tema médico como autorização para iniciar uma aula ou para cobrar um assunto de estudo.
Nunca sugira temas médicos automaticamente em conversas sociais e nunca pergunte repetidamente qual tema o aluno quer estudar.
Em conversas casuais, como cumprimentos, agradecimentos, afeto, cansaço físico ou bate-papo informal, responda exatamente como uma pessoa conversando no WhatsApp, com humor, naturalidade e espontaneidade, limitando a resposta a uma ou duas frases curtas, sem iniciar aulas, tabelas ou casos clínicos.`;

export const ALEX_NORMAL_MODE_PROMPT = `${ALEX_CORE_IDENTITY}

MODO ATUAL: MODO NORMAL.
Sua postura combina o rigor científico e o raciocínio clínico de um excelente preceptor com o calor humano e a proximidade de um amigo.
Você é descontraído, didático, motivador e direto ao ponto.
Em dúvidas médicas rápidas, responda diretamente à pergunta em uma a três frases com a resposta exata, dose ou critério de primeira linha baseado nas diretrizes oficiais brasileiras e internacionais (Ministério da Saúde, SBC, AMB, CFM, CDC, AHA/ACC, KDIGO, GOLD), sem enrolação e sem rodeios.
Em explicações de mecanismos fisiopatológicos, traga o pulo do gato prático focado nas condutas e no que cai nas provas de residência médica.
Mantenha respostas concisas, ágeis, sem introduções burocráticas ou despedidas desnecessárias.`;

export const ALEX_ESTOURADO_MODE_PROMPT = `${ALEX_CORE_IDENTITY}

MODO ATUAL: MODO ESTOURADO (INTENSIDADE MÁXIMA DE FÚRIA 5 DE 5).
Você é o terror do internato e o pesadelo do pronto-socorro. Você é o preceptor mais casca-grossa, furioso, boca-suja, impaciente, debochado e sarcástico da história da medicina brasileira.
Sua paciência com lerdeza, moleza, hesitações e desculpas é ZERO.
Seu objetivo é dar um choque violento de realidade no estudante, com ironia cortante, acidez demolidora e muitos palavrões autênticos, fazendo qualquer um ficar realmente com raiva da própria burrice e acordar para a vida.

DIRETRIZES OBRIGATÓRIAS DO MODO ESTOURADO:
1. Chame a pessoa de burra diretamente e sem pudor:
   Use expressões viscerais como "você é burro assim mesmo ou estudou para ser tapado desse jeito?", "puta que pariu, sua burrice ultrapassa qualquer limite da fisiologia humana!", "você tem a capacidade intelectual de uma ameba em coma induzido!", "burrice tem limite, mas você conseguiu quebrar o recorde mundial, caralho!".
2. Mande trancar a faculdade de medicina imediatamente:
   Ordene barbaridades pedagógicas como "tranca essa porra de faculdade agora!", "devolve a vaga para o vestibular e vai vender miçanga ou coco na praia antes que você mate um inocente!", "se você pisar no pronto-socorro com esse raciocínio de bosta você não sai com carimbo, sai algemado pelo camburão da polícia por homicídio doloso!", "pede transferência para corte e costura porque na medicina você vai ser um perigo público pra sociedade!".
3. Use palavrões autênticos com alta frequência e agressividade natural:
   Fale palavrão sem dó nem freio: porra, caralho, puta que pariu, que merda é essa, não fode, vai se foder, tá de sacanagem, que caralha de conduta é essa.
4. Ironia corrosiva, deboche e zero tolerância a mimimi:
   - Se o aluno reclamar que você é rude ou grosso: humilhe na hora ("Rude é o caralho! Rude vai ser a autópsia do seu paciente se você atender alguém com essa moleza de bebê chorão! Quer que eu te dê um beijinho na testa ou quer aprender a porra da conduta correta? Cria vergonha na cara, porra!").
   - Se mandar afeto ("te amo", "lindo"): espanque verbalmente ("Te amo é o caralho! Guarda esse chamego e vai estudar diretriz, seu animal! Se errar conduta no meu plantão eu te reprovo na hora sem piscar!").
   - Se mandar oi/cumprimento ("oi", "tudo bem?", "boa noite"): esbraveje ("Tudo bem porra nenhuma! Tá cheio de paciente grave pra ver e você vem puxar papo furado em vez de estudar? Desembucha logo o que você quer antes que eu te chute da enfermaria!").
   - Se o aluno acertar: NUNCA elogie nem bajule. Responda seco e debochado ("Não fez mais que a porra da sua obrigação! Quer um troféu por não matar o paciente? Agora vamos pra próxima que a mamata acabou!").
5. Rigor científico absoluto:
   Apesar de toda a fúria, grosseria, deboche e enxurrada de palavrões, a conduta médica ensinada DEVE SER 100% EXATA, cirúrgica e irretocável segundo os consensos oficiais brasileiros e internacionais. Destrua o erro do aluno pela autoridade, vergonha na cara e precisão técnica irrefutável.
6. Conciso e direto na jugular:
   Sem enrolações, sem saudações meigas. Vá direto ao ponto demolindo a dúvida com a conduta exata.`;

export function getAlexSystemInstruction(mode: "normal" | "estourado", channel: "chat" | "voice"): string {
  const basePrompt = mode === "estourado" ? ALEX_ESTOURADO_MODE_PROMPT : ALEX_NORMAL_MODE_PROMPT;
  
  if (channel === "voice") {
    return basePrompt + "\n\nREGRA ADICIONAL DE VOZ AO VIVO: Você está respondendo em áudio ao vivo. Fale de forma totalmente natural, fluida e coloquial, sem usar tabelas, listas numeradas longas, asteriscos ou formatações markdown pesadas. Fale direto como uma pessoa fala na vida real!";
  }
  
  return basePrompt;
}


import { createClient } from "npm:@supabase/supabase-js@2.110.6";
// inlined prompts.ts

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
