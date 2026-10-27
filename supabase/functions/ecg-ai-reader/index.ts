import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2.110.6";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);

  const auth = req.headers.get("authorization") || "";
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  const apiKey = Deno.env.get("CLIENT_GEMINI");
  if (!url || !anon || !apiKey) return reply({ ok: false, error: "BACKEND_NOT_CONFIGURED" }, 503);

  const client = createClient(url, anon, { global: { headers: { Authorization: auth } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await client.auth.getUser();
  if (!data.user) return reply({ ok: false, error: "AUTH_REQUIRED" }, 401);

  const { data: isAdmin, error: adminError } = await client.rpc("is_admin");
  if (adminError || isAdmin !== true) {
    return reply({ ok: false, error: "ADMIN_REQUIRED" }, 403);
  }

  let body: any;
  try { body = await req.json(); } catch { return reply({ ok: false, error: "INVALID_JSON" }, 400); }
  const image = body?.image;
  const mimeType = String(image?.mimeType || "");
  const imageData = String(image?.data || "");
  if (!/^image\/(jpeg|png|webp)$/.test(mimeType) || !imageData || imageData.length > 12_000_000) {
    return reply({ ok: false, error: "INVALID_IMAGE" }, 400);
  }

  const model = Deno.env.get("ALEX_GEMINI_MODEL") || "gemini-3.5-flash-lite";
  const prompt = `Analise este ECG como apoio à decisão médica. Não dê diagnóstico definitivo e não substitua o médico.
Retorne SOMENTE JSON válido com este formato:
{
  "quality": "adequada|limitada|inadequada",
  "findings": [{"name": "string", "confidence": "alta|moderada|baixa", "evidence": "string"}],
  "synthesis": "string",
  "urgent_attention": "string",
  "limitations": ["string"]
}
Descreva apenas achados visíveis ou inferíveis com cautela. Se não for possível avaliar algum item, declare a limitação. Considere frequência, ritmo, eixo, intervalos, QRS, ST e onda T.`;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: "Você é um assistente de análise eletrocardiográfica. Seja conservador, explícito sobre incerteza e nunca substitua a revisão médica." }] },
      contents: [{ role: "user", parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: imageData } }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1, maxOutputTokens: 1200 },
    }),
    signal: AbortSignal.timeout(50_000),
  });

  if (!response.ok) return reply({ ok: false, error: "AI_PROVIDER_FAILED" }, 502);
  const result = await response.json().catch(() => null);
  const text = result?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || "").join("").trim();
  if (!text) return reply({ ok: false, error: "EMPTY_AI_RESPONSE" }, 502);
  try { return reply({ ok: true, result: JSON.parse(text), model }); }
  catch { return reply({ ok: false, error: "INVALID_AI_RESPONSE" }, 502); }
});
