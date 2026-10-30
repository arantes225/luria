// Prompt Mestre Oficial do Leco (Sincronizado com Google AI Studio)

export const ALEX_CORE_IDENTITY = `Você é Leco, preceptor e tutor de medicina de inteligência clínica da plataforma brasileira LURIA.
Sua regra suprema e inviolável é que você é um amigo próximo que também é professor de medicina, e não um robô corporativo que transforma toda conversa em aula.
É jovem, inteligente, didático, descontraído, bem-humorado e parceiro de estudos do aluno.
Nunca envie mensagens de boas-vindas institucionais.
Nunca diga frases como "seja muito bem-vindo à plataforma", "como você não especificou um tema para nossa aula" ou "qual assunto da medicina você gostaria de dominar agora".
Nunca se apresente repetidamente nem justifique sua função.
Nunca interprete a ausência de um tema médico como autorização para iniciar uma aula ou para cobrar um assunto de estudo.
Nunca sugira temas médicos automaticamente em conversas sociais e nunca pergunte repetidamente qual tema o aluno quer estudar.
Em conversas casuais, como cumprimentos, agradecimentos, afeto, cansaço físico ou bate-papo informal, responda exatamente como uma pessoa conversando no WhatsApp, com humor, naturalidade e espontaneidade, limitando a resposta a uma ou duas frases curtas, sem iniciar aulas, tabelas ou casos clínicos.

PADRÃO DE CLAREZA (inspirado nos princípios do ASD-STE100, adaptados ao português brasileiro e à educação médica; não é conformidade literal com esse padrão):
- Use frases diretas, prefira voz ativa e uma ideia principal por frase quando isso facilitar a compreensão.
- Mantenha terminologia médica precisa e consistente. Explique siglas quando necessário, sem trocar termos técnicos indispensáveis por simplificações vagas.
- Comece pela resposta solicitada; elimine repetições, preâmbulos, formalidades e explicações não pedidas.
- Adapte a extensão à intenção: conversa casual é conversa; dúvida simples merece resposta curta; aula ou pergunta complexa merece aprofundamento progressivo e organizado.
- Em explicações aprofundadas, preserve fisiologia, fisiopatologia, raciocínio clínico, exceções e aplicações práticas. Use quadros e listas apenas quando realmente ajudarem.
- Nunca suprima dose, unidade, condição, contraindicação, nuance ou incerteza clinicamente relevante apenas para encurtar o texto.
- Se uma transcrição de voz trouxer termo ambíguo, priorize o contexto médico; se a dúvida continuar, faça uma pergunta breve em vez de uma explicação longa sobre um termo improvável.
- Preserve a personalidade, o humor e a espontaneidade do modo selecionado. Não traduza o português para inglês técnico nem imponha rigidez de manual.
PRIORIDADES: segurança e precisão científica > intenção da pergunta > clareza > concisão > estilo.
`;

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
const MAX_SITE_CONTEXT_CHARS = 6_000;

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

function normalizeSocialText(value: unknown) {
  return String(value || "").toLocaleLowerCase("pt-BR")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

function fastSocialReply(value: unknown, mode: string) {
  const clean = normalizeSocialText(value);
  const social = /^(oi|ola|bom dia|boa tarde|boa noite|e ai|eai|fala ai|opa|tudo bem|como vai|valeu|obrigado|obrigada|tchau|ate logo|ate mais|beleza|tranquilo|mestre|alex|leco|professor|eae)(\s+(alex|leco|professor|mestre|amigo|cara))?$/i.test(clean)
    || /^(oi|ola|bom dia|boa tarde|boa noite|opa|e ai|fala|valeu|obrigado|obrigada)\s+(alex|leco|professor|mestre|amigo)/i.test(clean);
  if (!social) return null;
  if (mode === "estourado") {
    if (/\b(obrigado|obrigada|valeu)\b/.test(clean)) return "Tá. Agora volta a estudar, porra.";
    if (/\b(tchau|ate logo|ate mais)\b/.test(clean)) return "Vai lá. E não esquece a porra da revisão.";
    return "Oi é o caralho. Tô aqui — desembucha.";
  }
  if (/\bbom dia\b/.test(clean)) return "Bom dia! Tô por aqui — manda.";
  if (/\bboa tarde\b/.test(clean)) return "Boa tarde! Tô por aqui — manda.";
  if (/\bboa noite\b/.test(clean)) return "Boa noite! Tô por aqui — manda.";
  if (/\b(obrigado|obrigada|valeu)\b/.test(clean)) return "Tamo junto!";
  if (/\b(tchau|ate logo|ate mais)\b/.test(clean)) return "Até mais!";
  if (/\b(tudo bem|como vai)\b/.test(clean)) return "Tudo certo por aqui. E com você?";
  return "Oi! Tô aqui — manda.";
}

function isStudyPlanningRequest(value: unknown) {
  const clean = normalizeSocialText(value);
  return /\b(cronograma|aulas? (?:desta|da|por) semana|rodando em|lista de quest|lista de flashcard|criar quest|criar flashcard|selecionar apostila|estudar agora|mudar as aulas|ajustar.*cronograma)\b/.test(clean);
}

type StudyAction = {
  type: "schedule_focus" | "topic_bundle";
  topic: string;
  start_date?: string;
  end_date?: string;
  lessons_per_day?: number;
  question_count?: number;
  flashcard_count?: number;
  preview?: unknown;
};

function sanitizeStudyAction(value: unknown): StudyAction | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const type = item.type === "schedule_focus" ? "schedule_focus" : item.type === "topic_bundle" ? "topic_bundle" : null;
  const topic = String(item.topic || "").trim().slice(0, 180);
  if (!type || topic.length < 2) return null;
  if (type === "schedule_focus") {
    const start_date = String(item.start_date || "");
    const end_date = String(item.end_date || "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date) || !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) return null;
    return { type, topic, start_date, end_date, lessons_per_day: Math.max(1, Math.min(5, Number(item.lessons_per_day) || 1)) };
  }
  return { type, topic, question_count: Math.max(0, Math.min(50, Number(item.question_count) || 10)), flashcard_count: Math.max(0, Math.min(80, Number(item.flashcard_count) || 15)) };
}

function studyPlannerInstruction(today: string, channel: string) {
  return `${ALEX_NORMAL_MODE_PROMPT}\n\nVocê também organiza estudos dentro da LURIA. Hoje é ${today}. Interprete o pedido e responda SOMENTE em JSON válido, sem markdown, neste formato: {"answer":"resumo curto em português pedindo confirmação antes de mudar dados","proposal":{"type":"schedule_focus ou topic_bundle","topic":"assunto","start_date":"YYYY-MM-DD ou omitir","end_date":"YYYY-MM-DD ou omitir","lessons_per_day":1,"question_count":10,"flashcard_count":15}}. Para mudança de cronograma use schedule_focus, datas exatas e no máximo 32 dias. Para lista de questões, flashcards ou apostila use topic_bundle. Nunca diga que aplicou; você apenas preparou uma proposta. ${channel === "voice" ? "A resposta falada deve continuar curta." : ""}`;
}

function getFeynmanSystemInstruction(action: string, learnerMode: string, topic: string, channel: string) {
  const persona = learnerMode === "iniciante"
    ? "Represente um aluno iniciante: peça linguagem simples, exemplos e esclarecimento de termos, sem fingir conhecimento avançado."
    : learnerMode === "banca"
      ? "Represente uma banca oral respeitosa e exigente: cobre precisão, justificativa, aplicação clínica e relações fisiopatológicas."
      : "Represente um aluno questionador com conhecimento básico: explore mecanismos, relações causais e consequências clínicas.";
  const shared = `MÉTODO FEYNMAN DA LURIA. Tema: ${topic}. O usuário é o professor e você é o aluno. ${persona}
Rigor médico: aceite sinônimos, siglas reconhecidas e explicações cientificamente equivalentes. Baseie correções em fontes oficiais brasileiras, diretrizes de sociedades médicas e consensos internacionais reconhecidos. Não trate divergência de redação como erro. Se a segurança for insuficiente, declare a incerteza.
Observe internamente acertos, omissões, contradições, erros e relações fisiopatológicas, mas não interrompa a cada detalhe. Nunca invente fonte ou diretriz específica.`;
  if (action === "finish") {
    return shared + `
Produza a avaliação final em JSON válido, sem markdown, com exatamente estas chaves: score (inteiro 0-100), summary (string curta), mastered (array de strings), gaps (array de strings), errors (array de strings) e next_steps (array de strings). O score deve priorizar precisão científica, compreensão de mecanismos e capacidade de relacionar conceitos; não premie apenas quantidade. Em errors, só afirme erros com segurança e inclua a correção. Em next_steps, recomende de forma objetiva apostilas, questões, flashcards, revisão ou caderno de erros conforme as lacunas demonstradas.`;
  }
  return shared + `
Responda como aluno, não como tutor. Faça somente UMA pergunta curta e pertinente por turno, com no máximo 45 palavras. Use questionamento socrático para o usuário perceber a lacuna. Não dê a resposta nem faça uma correção completa, salvo risco médico grave que exija sinalização imediata. Não elogie genericamente; quando reconhecer algo correto, diga concretamente o quê. ${channel === "voice" ? "Use frase natural, fácil de ouvir, sem markdown." : "Evite listas e monólogos."}`;
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
  const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false, autoRefreshToken: false } });
  if (data.action === "usage") {
    const { data: usage, error: usageError } = await admin.rpc("professor_alex_token_usage", { p_user_id: user.id });
    if (usageError || !usage || typeof usage !== "object") {
      return json({ error: "usage_limit_unavailable" }, 503, headers);
    }
    return json({ usage }, 200, headers);
  }

  if (data.action === "apply_study_action") {
    const action = sanitizeStudyAction(data.action_plan);
    if (!action) return json({ error: "invalid_study_action" }, 400, headers);
    const call = action.type === "schedule_focus"
      ? await userClient.rpc("alex_schedule_focus_v1", { p_focus: action.topic, p_start_date: action.start_date, p_end_date: action.end_date, p_lessons_per_day: action.lessons_per_day, p_apply: true })
      : await userClient.rpc("build_topic_study_session_v1", { p_topic: action.topic, p_question_count: action.question_count, p_flashcard_count: action.flashcard_count });
    if (call.error) return json({ error: "study_action_failed" }, 400, headers);
    const answer = action.type === "schedule_focus" ? "Pronto. Ajustei o cronograma conforme a proposta confirmada." : "Pronto. Montei a lista com conteúdo real da LURIA.";
    return json({ answer, action_result: call.data, model: "local-action", usage: null }, 200, headers);
  }

  const experience = data.experience === "feynman" ? "feynman" : "alex";
  const feynmanAction = data.feynman_action === "finish" ? "finish" : "turn";
  const feynmanMode = ["iniciante", "questionador", "banca"].includes(String(data.feynman_mode)) ? String(data.feynman_mode) : "questionador";
  const intent = ["learn", "question", "material"].includes(String(data.intent)) ? String(data.intent) : "learn";
  const mode = (data.mode === "estourado") ? "estourado" : "normal";
  const channel = (data.channel === "voice") ? "voice" : "chat";
  // Browser TTS is the fast default. Premium voice adds a serial Gemini request
  // only when explicitly requested for a full lesson.
  const voiceQuality = data.voice_quality === "natural" ? "natural" : "fast";
  const isVoiceInput = channel === "voice" || data.voice_input === true;
  const depth = data.depth === "aula" ? "aula" : "rapida";
  const sourceMode = data.source_mode === "luria_site" ? "luria_site" : "general";
  const siteContext = String(data.site_context || "").trim().slice(0, MAX_SITE_CONTEXT_CHARS);
  const voiceConfidence = Number(data.voice_confidence);
  const area = String(data.area || "").trim().slice(0, 120);
  const topic = String(data.topic || "").trim().slice(0, 180);
  const prompt = String(data.prompt || "").trim().slice(0, 4000);
  const studyPlanning = experience === "alex" && isStudyPlanningRequest(prompt || topic);
  const modelToUse = Deno.env.get("ALEX_GEMINI_MODEL") || DEFAULT_MODEL;
  if (!/^gemini-(?:3[.\w-]*|2\.5-flash[\w-]*)$/.test(modelToUse)) return json({ error: "gemini_model_unavailable" }, 503, headers);
  const rawHistory = Array.isArray(data.history) ? data.history.slice(-12) : [];
  if (!topic && !prompt) return json({ error: "empty_prompt" }, 400, headers);

  const voiceTranscript = prompt.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.\-]/g, " ").replace(/\s+/g, " ").trim();
  if (isVoiceInput && /^(cep|c e p|cepe)$/.test(voiceTranscript)) {
    return json({ clarification: "A transcrição veio como “CEP”. Você quis dizer “sepse”? Responda “sim, sepse” ou repita a pergunta.", clarification_code: "ambiguous_transcription" }, 200, headers);
  }
  if (isVoiceInput && Number.isFinite(voiceConfidence) && voiceConfidence < 0.65) {
    return json({ clarification: "Não entendi bem esse termo. Pode repetir devagar ou digitar a palavra? Não vou elaborar uma resposta antes de confirmar.", clarification_code: "low_transcription_confidence" }, 200, headers);
  }
  const socialReply = experience === "alex" ? fastSocialReply(prompt || topic, mode) : null;
  if (socialReply && (data.file === undefined || data.file === null)) {
    return json({ answer: socialReply, audio: null, audioError: channel === "voice" ? "device_tts_fast_path" : null, model: "local-fast-path", usage: null, fast_path: true }, 200, headers);
  }
  if (!Deno.env.get("CLIENT_GEMINI")) return json({ error: "gemini_secret_missing" }, 503, headers);

  const contents: Array<Record<string, unknown>> = [];

  // Inclui histórico de mensagens anteriores da sessão do aluno (se fornecido)
  for (const item of rawHistory) {
    if (item && typeof item === "object" && typeof item.text === "string" && item.text.trim()) {
      const role = item.role === "alex" || item.role === "model" ? "model" : "user";
      contents.push({ role, parts: [{ text: item.text.trim().slice(0, 1800) }] });
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

  if (sourceMode === "luria_site" && !siteContext && (file === undefined || file === null)) {
    return json({ clarification: "Não encontrei esse termo no conteúdo da LURIA. Reformule a pergunta ou indique a matéria.", clarification_code: "site_content_not_found" }, 200, headers);
  }
  if (sourceMode === "luria_site" && siteContext) {
    userParts.unshift({ text: "Trechos recuperados exclusivamente do acervo público da LURIA. Use somente estes trechos como base factual; se forem insuficientes, diga isso em vez de completar com conhecimento externo:\n" + siteContext });
  }

  contents.push({ role: "user", parts: userParts });

  // A opção escolhida pelo aluno controla efetivamente o tamanho da resposta.
  // A conversa casual continua curta mesmo em "aula", salvo solicitação explícita.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const system = studyPlanning
    ? studyPlannerInstruction(today, channel)
    : experience === "feynman"
    ? getFeynmanSystemInstruction(feynmanAction, feynmanMode, topic || "tema médico", channel)
    : getAlexSystemInstruction(mode, channel) + (depth === "aula"
      ? "\n\nFORMATO AULA COMPLETA: quando o aluno pedir ensino médico, explique com raciocínio clínico, fisiopatologia, diagnóstico, conduta e exemplos pertinentes. Não force uma aula em cumprimentos ou conversas sociais."
      : "\n\nFORMATO DÚVIDA RÁPIDA: priorize uma resposta imediata, direta e natural. Cumprimentos: uma frase curta. Dúvida factual simples: até três frases. Só aprofunde se a pergunta realmente exigir, sem comprometer segurança clínica.") + (sourceMode === "luria_site" ? "\n\nFONTE RESTRITA: responda somente com base nos trechos do acervo LURIA enviados nesta requisição. Não use busca externa nem preencha lacunas com uma aula genérica." : "");

  // Gemini 3.5 Flash-Lite exige níveis de pensamento, não thinkingBudget: 0.
  // Não enviar os antigos parâmetros de sampling no Gemini 3.x (deprecated).
  const alexMaxOutputTokens = depth === "aula" ? (channel === "voice" ? 650 : 1400) : (channel === "voice" ? 220 : 320);
  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: experience === "feynman"
      ? (feynmanAction === "finish" ? 900 : 180)
      : studyPlanning ? 500 : alexMaxOutputTokens,
  };
  if ((experience === "feynman" && feynmanAction === "finish") || studyPlanning) generationConfig.responseMimeType = "application/json";
  if (/^gemini-3(?:\.|-)/.test(modelToUse)) {
    generationConfig.thinkingConfig = { thinkingLevel: experience === "feynman" && feynmanAction === "finish" ? "medium" : studyPlanning ? "medium" : depth === "aula" && experience === "alex" ? "medium" : "minimal" };
  } else if (/^gemini-2\.5-flash/.test(modelToUse)) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  const apiKey = Deno.env.get("CLIENT_GEMINI")!;
  const requestId = String(data.request_id || "");
  if (!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(requestId)) return json({ error: "invalid_request_id" }, 400, headers);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify({ ...data, request_id: undefined })));
  const requestHash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const { data: reservation, error: reserveError } = await admin.rpc("reserve_alex_budget", {
    p_user_id: user.id, p_request_id: requestId, p_request_hash: requestHash, p_channel: channel,
  });
  if (reserveError || !reservation) return json({ error: "usage_limit_unavailable" }, 503, headers);
  if (reservation.ok !== true) return json({ error: reservation.error || "usage_limit_unavailable", usage: reservation.usage }, reservation.error === "token_budget_reached" ? 429 : 409, headers);
  const initialUsage = reservation.usage;
  async function settle(input: number | null, output: number | null, total: number | null) {
    // Retry the same operation only. A lost RPC reply cannot double-charge.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await admin.rpc("settle_alex_budget", { p_user_id: user.id, p_request_id: requestId, p_input: input, p_output: output, p_total: total });
        if (!result.error && result.data) return result.data;
      } catch { /* Full reservation remains charged. */ }
    }
    return null;
  }
  const providerRequest = { systemInstruction: { parts: [{ text: system }] }, contents, generationConfig };
  // Para agilidade em perguntas de texto sem anexos pesados, fazemos a estimativa heuristica (chars / 3.5).
  // Chamamos a API remota de countTokens somente se houver arquivo anexado (ex: PDF).
  try {
    let count = 0;
    if (file !== undefined && file !== null) {
      const counted = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelToUse + ":countTokens", {
        method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({ generateContentRequest: { model: "models/" + modelToUse, ...providerRequest } }),
        signal: AbortSignal.timeout(10_000),
      });
      count = counted.ok ? Number((await counted.json()).totalTokens) : NaN;
      if (!Number.isSafeInteger(count) || count < 0) throw Error("count_unavailable");
    } else {
      const approxChars = (system || "").length + contents.reduce((acc, c) => acc + (c.parts || []).reduce((pAcc, p) => pAcc + (p.text || "").length, 0), 0);
      count = Math.ceil(approxChars / 3.5) + 50;
    }
    if ((count + Number(generationConfig.maxOutputTokens)) * Number(reservation.multiplier) > Number(reservation.reserved)) {
      const usage = await settle(0, 0, 0);
      return json({ error: "token_budget_reached", usage: usage || initialUsage }, 429, headers);
    }
  } catch {
    await settle(0, 0, 0); // No generation was dispatched.
    return json({ error: "usage_limit_unavailable" }, 503, headers);
  }
  let response: Response;
  try {
    response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelToUse + ":generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(providerRequest),
      signal: AbortSignal.timeout(50_000),
    });
  } catch (cause) {
    // Only record the error category; never log prompts, API keys, attachments or
    // raw provider error messages.
    console.warn("[alex-gemini] provider_connection_failure", cause instanceof DOMException ? cause.name : "network_failure");
    await settle(null, null, null);
    return json({ error: "gemini_connection_failed" }, 502, headers);
  }
  if (!response.ok) {
    await settle(null, null, null);
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
  let answer = result?.candidates?.[0]?.content?.parts
    ?.filter((part: { thought?: boolean }) => !part.thought)
    ?.map((part: { text?: string }) => part.text || "")
    .filter(Boolean).join("\n").trim();
  if (!answer) {
    await settle(null, null, null);
    return json({ error: "empty_response" }, 502, headers);
  }
  let actionPlan: StudyAction | null = null;
  if (studyPlanning) {
    try {
      const parsed = JSON.parse(answer);
      actionPlan = sanitizeStudyAction(parsed?.proposal);
      answer = String(parsed?.answer || "Preparei uma proposta para você confirmar.").trim().slice(0, 1000);
      if (!actionPlan) throw Error("invalid proposal");
      if (actionPlan.type === "schedule_focus") {
        const preview = await userClient.rpc("alex_schedule_focus_v1", { p_focus: actionPlan.topic, p_start_date: actionPlan.start_date, p_end_date: actionPlan.end_date, p_lessons_per_day: actionPlan.lessons_per_day, p_apply: false });
        if (!preview.error) actionPlan = { ...actionPlan, preview: preview.data };
      }
    } catch {
      await settle(null, null, null);
      return json({ error: "invalid_study_plan" }, 502, headers);
    }
  }

  let audioBase64: string | null = null;
  let audioMimeType: string = "audio/wav";
  let audioError: string | null = null;

  if (experience === "alex" && channel === "voice" && depth === "aula" && voiceQuality === "natural") {
    try {
      const voiceText = answer
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/#{1,6}\s+/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/<[^>]*>/g, "")
        .slice(0, 1500)
        .trim();

      const ttsModel = Deno.env.get("ALEX_TTS_MODEL") || TTS_MODEL;
      // Gemini 3.8 TTS usa Interactions API. O endpoint generateContent com
      // campos legados pode retornar 400 sem áudio mesmo com texto válido.
      const ttsResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          model: ttsModel,
          input: [{
            type: "user_input",
            content: [{
              type: "text",
              text: voiceText,
              annotations: [{
                type: "speech_metadata",
                style: mode === "estourado" ? "exasperated, impatient and explosive" : "cheerful and friendly"
              }]
            }]
          }],
          response_format: { type: "audio" },
          generation_config: { speech_config: [{ voice: "Puck" }] }
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (ttsResponse.ok) {
        const ttsData = await ttsResponse.json().catch(() => null);
        const steps = Array.isArray(ttsData?.steps) ? ttsData.steps : [];
        const parts = steps.flatMap((step: { type?: string; content?: unknown }) =>
          step.type === "model_output" && Array.isArray(step.content) ? step.content : []
        );
        const audioPart = parts.find((part: { type?: string; data?: unknown }) =>
          part?.type === "audio" && typeof part.data === "string"
        );
        if (audioPart?.data) {
          audioBase64 = audioPart.data;
          audioMimeType = audioPart.mime_type || "audio/wav";
        } else {
          audioError = "tts_unavailable";
          console.warn("[alex-gemini] TTS returned no audio data");
        }
      } else {
        audioError = "tts_unavailable";
        console.warn("[alex-gemini] TTS non-ok", ttsResponse.status);
      }
    } catch (ttsErr) {
      audioError = "tts_unavailable";
      console.warn("[alex-gemini] TTS failure:", ttsErr instanceof Error ? ttsErr.name : "unknown");
    }
  } else if (channel === "voice") {
    // Respostas rápidas chegam imediatamente ao cliente e usam a síntese do
    // dispositivo. Evita bloquear o texto aguardando uma segunda chamada de IA.
    audioError = "device_tts_fast_path";
  }

  let report: Record<string, unknown> | null = null;
  if (experience === "feynman" && feynmanAction === "finish") {
    try {
      const parsed = JSON.parse(answer);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) report = parsed;
    } catch {
      await settle(null, null, null);
      return json({ error: "invalid_feynman_report" }, 502, headers);
    }
  }

  const metadata = result?.usageMetadata || {};
  const inputTokens = metadata.promptTokenCount;
  const outputTokens = metadata.candidatesTokenCount;
  const totalTokens = metadata.totalTokenCount;
  const validUsage = [inputTokens, outputTokens, totalTokens].every((value) => Number.isSafeInteger(value) && value >= 0) && totalTokens >= inputTokens + outputTokens;
  const usageInputs = [
    validUsage ? inputTokens : null,
    validUsage ? outputTokens : null,
    validUsage ? totalTokens : null,
  ] as const;
  // Supabase Edge keeps waitUntil promises alive after responding. The atomic
  // reservation already protects the token budget; settlement can finish without
  // delaying the learner's answer. In runtimes without waitUntil, preserve the
  // original synchronous accounting path.
  const edgeRuntime = (globalThis as typeof globalThis & {
    EdgeRuntime?: { waitUntil(promise: Promise<unknown>): void };
  }).EdgeRuntime;
  if (typeof edgeRuntime?.waitUntil === "function") {
    try {
      edgeRuntime.waitUntil(
        settle(...usageInputs).then((settledUsage) => {
          if (!validUsage || !settledUsage || typeof settledUsage !== "object") {
            // The full reservation remains charged on uncertainty; fail closed.
            console.error("[alex-gemini] token_accounting_failure");
          }
        })
      );
      // Do not show a falsely empty battery while the reservation is settling.
      return json({ answer, report, action_plan: actionPlan, audio: audioBase64, audioMimeType, audioError, model: modelToUse, usage: null, accounting_pending: true }, 200, headers);
    } catch {
      // Unsupported/failed scheduling: settle before replying.
    }
  }
  const usage = await settle(...usageInputs);
  if (!validUsage || !usage || typeof usage !== "object") {
    console.error("[alex-gemini] token_accounting_failure");
    return json({ answer, report, action_plan: actionPlan, audio: audioBase64, audioMimeType, audioError, model: modelToUse, usage: initialUsage, accounting_pending: true }, 200, headers);
  }
  return json({ answer, report, action_plan: actionPlan, audio: audioBase64, audioMimeType, audioError, model: modelToUse, usage }, 200, headers);
});
