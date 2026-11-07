/* ecg-vision/worker.mjs
   Cloudflare Worker — extração de estrutura de ECG via Vision AI (Claude Haiku).
   Recebe: { image_b64: string, mime_type?: string }
   Retorna: { layout, derivacoes, tira_ritmo, issues }
   Nunca interpreta o traçado — apenas detecta layout e posição das células.
*/

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_B64_BYTES = 1_500_000; // ~1.1 MB decoded — suficiente para ECG reduzido

const SYSTEM_PROMPT = `Você é um detector de layout de ECG. Analise SOMENTE a estrutura visual da imagem.
Não interprete o traçado clínico. Retorne exclusivamente JSON válido, sem texto adicional.

Identifique:
1. Quantas linhas e colunas de derivações existem
2. Qual derivação está em cada célula (rótulo visível na imagem)
3. Se existe tira de ritmo (derivação única ocupando largura total)
4. Posição normalizada de cada célula (valores entre 0 e 1 relativos à largura/altura total da imagem)

Formato obrigatório de resposta:
{
  "layout": {
    "linhas": <número>,
    "colunas": <número>,
    "formato": "<descrição curta>"
  },
  "derivacoes": [
    {
      "nome": "<ex: I, II, V1, aVR>",
      "linha": <1-based>,
      "coluna": <1-based ou "largura_total">,
      "tipo": "derivacao" | "tira_ritmo",
      "posicao": {
        "xMin": <0-1>,
        "yMin": <0-1>,
        "xMax": <0-1>,
        "yMax": <0-1>
      }
    }
  ],
  "tira_ritmo": {
    "presente": <true|false>,
    "derivacao": "<nome ou null>",
    "posicao": { "xMin": 0, "yMin": <0-1>, "xMax": 1, "yMax": <0-1> } | null
  },
  "issues": []
}

Se não conseguir identificar o layout com certeza, preencha "issues" com uma descrição curta do problema.`;

const json = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(v => v.trim()).filter(Boolean);
    const cors = {
      "Access-Control-Allow-Origin": origin || "",
      "Vary": "Origin",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Max-Age": "600"
    };
    const finish = res => {
      const headers = new Headers(res.headers);
      for (const [k, v] of Object.entries(cors)) headers.set(k, v);
      return new Response(res.body, { status: res.status, headers });
    };

    if (!origin || !allowed.includes(origin)) return json({ error: "Origem não autorizada" }, 403);
    if (request.method === "OPTIONS") return finish(new Response(null, { status: 204 }));
    if (request.method !== "POST") return finish(json({ error: "Método inválido" }, 405));

    const url = new URL(request.url);
    if (url.pathname !== "/ecg-vision" && url.pathname !== "/api/ecg-vision")
      return finish(json({ error: "Rota inválida" }, 404));

    if (!env.ANTHROPIC_API_KEY)
      return finish(json({ error: "Serviço de visão não configurado" }, 503));

    // Autenticação via Supabase (mesma sessão do usuário logado)
    const auth = request.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ") || auth.length > 8192)
      return finish(json({ error: "Autenticação obrigatória" }, 401));

    if (env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY) {
      const userResponse = await fetch(env.SUPABASE_URL + "/auth/v1/user", {
        headers: {
          apikey: env.SUPABASE_PUBLISHABLE_KEY,
          Authorization: auth,
          "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(8000)
      });
      if (!userResponse.ok) return finish(json({ error: "Sessão inválida" }, 401));
    }

    // Lê e valida body
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 2_000_000) return finish(json({ error: "Imagem muito grande (máx 1.5 MB)" }, 413));
    const raw = await request.text();
    if (raw.length > 2_000_000) return finish(json({ error: "Imagem muito grande (máx 1.5 MB)" }, 413));

    let body;
    try { body = JSON.parse(raw); }
    catch { return finish(json({ error: "JSON inválido" }, 400)); }

    const mime_type = body.mime_type || "image/jpeg";
    const image_b64 = body.image_b64;

    // Limpa o body imediatamente — a imagem não deve permanecer em memória além do necessário
    delete body.image_b64;
    delete body.mime_type;

    if (!image_b64 || typeof image_b64 !== "string")
      return finish(json({ error: "Campo image_b64 obrigatório" }, 400));
    if (image_b64.length > MAX_B64_BYTES)
      return finish(json({ error: "Imagem muito grande — reduza para menos de 1.1 MB" }, 413));
    if (!ALLOWED_MIME.has(mime_type))
      return finish(json({ error: "Tipo de imagem inválido (use jpeg, png ou webp)" }, 400));

    // Chama Claude Haiku (apenas extração de estrutura, sem interpretação clínica)
    // A imagem é enviada diretamente à Anthropic e nunca registrada em log.
    let anthropicResponse;
    try {
      anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: { type: "base64", media_type: mime_type, data: image_b64 }
                },
                {
                  type: "text",
                  text: "Identifique o layout deste ECG e retorne apenas o JSON conforme instruído."
                }
              ]
            }
          ]
        }),
        signal: AbortSignal.timeout(25000)
      });
    } catch (err) {
      // Nunca logar a imagem — apenas o erro de rede
      console.error("[ecg-vision] Falha na chamada Anthropic:", err?.message || "timeout");
      return finish(json({ error: "Serviço de visão temporariamente indisponível" }, 503));
    }

    if (!anthropicResponse.ok) {
      // Nunca logar o status em contexto que possa expor dados da imagem
      console.error("[ecg-vision] Anthropic HTTP", anthropicResponse.status);
      return finish(json({ error: "Falha na análise da imagem" }, 502));
    }

    const aiResult = await anthropicResponse.json();
    const rawText = aiResult?.content?.[0]?.text || "";

    // Extrai JSON da resposta (Haiku às vezes envolve em markdown)
    let structured;
    try {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Sem JSON na resposta");
      structured = JSON.parse(match[0]);
    } catch (err) {
      // Apenas loga que houve erro de parse — sem incluir conteúdo da resposta
      console.error("[ecg-vision] JSON inválido na resposta Haiku — comprimento:", rawText.length);
      return finish(json({ error: "Resposta de IA inválida" }, 502));
    }

    // Validação mínima — sem expor conteúdo da resposta de IA na resposta ao cliente
    if (!structured.layout || !Array.isArray(structured.derivacoes)) {
      console.error("[ecg-vision] Estrutura incompleta na resposta Haiku");
      return finish(json({ error: "Estrutura de resposta incompleta" }, 502));
    }

    return finish(json({ ok: true, ...structured }));
  }
};
