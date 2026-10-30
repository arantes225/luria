import {getAlexConversation, rememberAlexTurn, clearAlexConversation} from './alex-conversation-history.mjs?v=20261028-1';

// Secure Leco front-end: only the user's Supabase JWT goes to our Edge Function.
// The Gemini API key is read exclusively inside the Edge Function.
const finalLayoutStyle = document.createElement("link");
finalLayoutStyle.rel = "stylesheet";
finalLayoutStyle.href = "/assets/css/professor-alex-layout-20261021.css?v=2";
document.head.appendChild(finalLayoutStyle);
const form = document.getElementById("alex-form");
const output = document.getElementById("alex-output");
const outputCopy = document.getElementById("alex-output-copy");
const outputTitle = output?.querySelector("h3");
const submit = form?.querySelector('button[type="submit"]');
const fileInput = document.getElementById("alex-file");
let alexUsageTimer = null;
const sessionHistory = [];
let renderedHistoryUser = null;
let alexSiteIndexPromise = null;
let liveTranscriptConfidence = null;
let speechGeneration = 0;

function normalizeAlexSearch(value) {
  return String(value || "").toLocaleLowerCase("pt-BR")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

function isSocialOrGreeting(text) {
  const clean = normalizeAlexSearch(text);
  return /^(oi|ola|bom dia|boa tarde|boa noite|e ai|eai|fala ai|opa|tudo bem|como vai|valeu|obrigado|obrigada|tchau|ate logo|ate mais|beleza|tranquilo|mestre|alex|professor|eae)(\s+(alex|professor|mestre|amigo|cara))?$/i.test(clean)
    || /^(oi|ola|bom dia|boa tarde|boa noite|opa|e ai|fala|valeu|obrigado|obrigada)\s+(alex|professor|mestre|amigo)/i.test(clean);
}

function fastSocialReply(text, isEstourado = false) {
  const clean = normalizeAlexSearch(text);
  if (isEstourado) {
    if (/\b(obrigado|obrigada|valeu)\b/.test(clean)) return "Tá. Agora volta a estudar, porra.";
    if (/\b(tchau|ate logo|ate mais)\b/.test(clean)) return "Vai lá. E não esquece a porra da revisão.";
    return "Oi é o caralho. Tô aqui — desembucha.";
  }
  if (/\b(bom dia)\b/.test(clean)) return "Bom dia! Tô por aqui — manda.";
  if (/\b(boa tarde)\b/.test(clean)) return "Boa tarde! Tô por aqui — manda.";
  if (/\b(boa noite)\b/.test(clean)) return "Boa noite! Tô por aqui — manda.";
  if (/\b(obrigado|obrigada|valeu)\b/.test(clean)) return "Tamo junto!";
  if (/\b(tchau|ate logo|ate mais)\b/.test(clean)) return "Até mais!";
  if (/\b(tudo bem|como vai)\b/.test(clean)) return "Tudo certo por aqui. E com você?";
  return "Oi! Tô aqui — manda.";
}

const ALEX_SEARCH_STOP_WORDS = new Set([
  "ola", "bom", "dia", "boa", "tarde", "noite", "tudo", "bem", "como", "vai",
  "voce", "alex", "professor", "amigo", "valeu", "obrigado", "obrigada",
  "tchau", "ate", "mais", "beleza", "legal", "massa", "fala", "eai", "opa",
  "sim", "nao", "quero", "ajuda", "uma", "para", "com", "por", "sobre", "estou",
  "qual", "quais", "onde", "quando", "quem", "quanto", "quantos", "devo", "pode"
]);

async function findAlexSiteContext(query) {
  if (!alexSiteIndexPromise) {
    alexSiteIndexPromise = fetch("/assets/data/professor-alex-site-index.json?v=20261022-site1", { cache: "force-cache" })
      .then(response => response.ok ? response.json() : Promise.reject(new Error("site_index_unavailable")))
      .catch(() => ({ records: [] }));
  }
  const index = await alexSiteIndexPromise;
  const normalized = normalizeAlexSearch(query);
  const tokens = normalized.split(/\s+/).filter(token => token.length >= 3 && !ALEX_SEARCH_STOP_WORDS.has(token));
  if (!tokens.length) return null;
  const ranked = (index.records || []).map(record => {
    const title = normalizeAlexSearch(record.title);
    const haystack = normalizeAlexSearch([record.title, record.area, record.subject, record.text].join(" "));
    const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? (title.includes(token) ? 5 : 1) : 0), 0);
    return { record, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (!ranked.length) return null;
  return {
    context: ranked.map(({ record }) => `[${record.title} | ${record.area}] ${String(record.text || "").slice(0, 900)}`).join("\n\n").slice(0, 3_000),
    sources: ranked.map(({ record }) => `/apostilas/${record.slug}/`),
  };
}

// Estado da Conversa ao Vivo por Voz
let isLiveActive = false;
let liveRecognition = null;
let startLiveListening = null;

const ERROR_MESSAGES = {
  invalid_request_id: "Atualize a página para continuar a conversa.",
  request_in_progress: "Uma resposta ainda está sendo processada. Aguarde antes de enviar outra pergunta.",
  duplicate_request: "Esta pergunta já foi processada ou está em processamento.",
  request_conflict: "Não foi possível confirmar esta solicitação. Atualize a página.",
  unauthorized: "Entre na sua conta da LURIA para conversar com o Leco.",
  empty_prompt: "Digite uma pergunta ou informe o tema que deseja estudar.",
  invalid_body: "Os dados da aula não puderam ser enviados. Tente novamente.",
  payload_too_large: "O material é muito grande. Utilize um PDF menor.",
  invalid_file: "O arquivo não pôde ser lido. Envie um PDF, TXT ou MD válido.",
  unsupported_file: "Formato não suportado. Converta o material para PDF, TXT ou MD.",
  token_budget_reached: "Seu orçamento diário de tokens do Leco terminou. Ele será renovado em até 24h.",
  gemini_secret_missing: "A chave CLIENT_GEMINI ainda não está configurada neste projeto Supabase.",
  gemini_key_rejected: "O Google recusou o acesso à API. No AI Studio, confira a chave CLIENT_GEMINI, as permissões e as restrições da chave.",
  gemini_key_invalid: "A chave do Gemini é inválida, bloqueada ou expirou. Crie uma nova chave de autenticação no Google AI Studio e atualize CLIENT_GEMINI no Supabase.",
  gemini_billing_required: "O Google exige uma configuração de faturamento ou quota neste projeto. Verifique o projeto associado à chave no AI Studio.",
  gemini_model_unavailable: "O modelo configurado não está disponível para esta chave. Confira os modelos habilitados no projeto do Google AI Studio.",
  gemini_api_disabled: "A API Gemini não está habilitada no projeto Google associado à chave.",
  gemini_invalid_request: "O Google recusou o formato da requisição. Informe o erro ao suporte da LURIA.",
  gemini_connection_failed: "O Supabase não conseguiu se comunicar com o Google. Tente novamente.",
  gemini_rate_limited: "O Gemini atingiu o limite de requisições. Tente novamente mais tarde.",
  gemini_unavailable: "O Gemini não conseguiu responder agora. Tente novamente.",
  empty_response: "O Gemini não retornou uma aula. Reformule sua pergunta.",
  usage_limit_unavailable: "Não foi possível verificar o limite de uso do Leco.",
  backend_not_configured: "O backend do Leco ainda não está configurado.",
};

function ensureUsageStyles() {
  if (document.getElementById("alex-token-usage-styles")) return;
  const style = document.createElement("style");
  style.id = "alex-token-usage-styles";
  style.textContent = `
    .alex-token-usage{display:flex;align-items:center;gap:9px;height:43px;min-width:142px;padding:0 11px;border:1px solid rgba(125,178,255,.34);border-radius:12px;background:linear-gradient(135deg,rgba(24,53,92,.96),rgba(20,32,66,.96));color:#f4f8ff;box-sizing:border-box;box-shadow:0 8px 20px rgba(3,12,35,.16)}
    .alex-token-battery{display:flex;align-items:center;gap:2px;position:relative;padding:3px 4px;border:2px solid #79bdff;border-radius:5px}
    .alex-token-battery::after{content:"";position:absolute;right:-5px;top:6px;width:3px;height:7px;border-radius:0 2px 2px 0;background:#79bdff}
    .alex-token-battery span{display:block;width:5px;height:12px;border-radius:1px;background:#2b466c}
    .alex-token-battery span.is-filled{background:linear-gradient(180deg,#71e4c5,#42a9ff)}
    .alex-token-copy{display:flex;flex-direction:column;min-width:0;line-height:1.05}
    .alex-token-copy strong{font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}
    .alex-token-copy small{margin-top:4px;color:#b8cae6;font-size:9px;white-space:nowrap}
    .alex-token-usage.is-empty .alex-token-battery{border-color:#ff9bba}.alex-token-usage.is-empty .alex-token-battery span.is-filled{background:#ff6f9d}
    @media(max-width:760px){.alex-token-usage{min-width:116px;padding:0 8px;gap:7px}.alex-token-copy strong{font-size:10px}.alex-token-copy small{font-size:8px}}
  `;
  document.head.appendChild(style);
}

function ensureUsageUI() {
  const controls = document.getElementById("alex-mode-card") || document.getElementById("luria-notifications");
  if (!controls) return null;
  ensureUsageStyles();
  let widget = document.getElementById("alex-token-usage");
  if (!widget) {
    widget = document.createElement("div");
    widget.id = "alex-token-usage";
    widget.className = "alex-token-usage";
    widget.setAttribute("role", "status");
    widget.setAttribute("aria-live", "polite");
    widget.innerHTML = '<span class="alex-token-battery" aria-hidden="true">' +
      '<span></span><span></span><span></span><span></span><span></span>' +
      '</span><span class="alex-token-copy"><strong id="alex-token-count">Bateria: —</strong>' +
      '<small id="alex-token-renewal">Renova em 24h</small></span>';
    controls.insertBefore(widget, controls.firstElementChild);
  } else {
    const modeBar = document.getElementById("alex-mode-card");
    if (modeBar && widget.parentElement !== modeBar) modeBar.insertBefore(widget, modeBar.firstElementChild);
  }
  return widget;
}

function renderUsage(usage) {
  const widget = ensureUsageUI();
  if (!widget) return;
  const limit = Math.max(1, Number(usage?.daily_token_budget) || 100000);
  const remaining = Math.max(0, Math.min(limit, Number(usage?.remaining_tokens) || 0));
  const percentage = Math.max(0, Math.min(100, Math.round((remaining / limit) * 100)));
  const count = document.getElementById("alex-token-count");
  const renewal = document.getElementById("alex-token-renewal");
  if (count) count.textContent = `Disponível: ${percentage}%`;
  if (renewal) {
    const renewsAt = Date.parse(String(usage?.renews_at || ""));
    const hours = Number.isFinite(renewsAt) ? Math.max(1, Math.ceil((renewsAt - Date.now()) / 3600000)) : 24;
    renewal.textContent = `Renova em ${hours}h`;
  }
  widget.classList.toggle("is-empty", remaining === 0);
  const voiceMultiplier = Number(usage?.voice_multiplier) || 3;
  widget.title = `${percentage}% de cota diária restante (${remaining.toLocaleString("pt-BR")} tokens de ${limit.toLocaleString("pt-BR")}). Renovação diária em até 24 horas.`;
  widget.querySelectorAll(".alex-token-battery span").forEach((bar, index) => {
    bar.classList.toggle("is-filled", index < Math.ceil((percentage / 100) * 5));
  });
}

async function refreshUsage() {
  const widget = ensureUsageUI();
  if (!widget) return;
  const client = window.supabaseClient;
  if (!client?.functions) return;
  const { data, error } = await client.functions.invoke("professor-alex-gemini", { body: { action: "usage" } });
  if (!error && data?.usage) renderUsage(data.usage);
}

function startUsageIndicator() {
  if (alexUsageTimer) return;
  const refresh = () => refreshUsage().catch(() => {});
  refresh();
  alexUsageTimer = window.setInterval(refresh, 60_000);
}

startUsageIndicator();
if (!document.getElementById("luria-notifications")) {
  const usageObserver = new MutationObserver(() => {
    if (ensureUsageUI()) {
      refreshUsage().catch(() => {});
      usageObserver.disconnect();
    }
  });
  usageObserver.observe(document.documentElement, { childList: true, subtree: true });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatAlexResponse(value) {
  if (!document.getElementById('alex-rich-response-styles')) {
    const style = document.createElement('style');
    style.id = 'alex-rich-response-styles';
    style.textContent = '.alex-rich-response p{margin:0 0 10px;line-height:1.58}.alex-rich-response p:last-child{margin-bottom:0}.alex-response-heading{margin:14px 0 7px;color:var(--text);font-size:1.08rem;line-height:1.3;font-weight:650}.alex-response-heading:first-child{margin-top:0}.alex-rich-response strong{color:var(--text);font-weight:700}.alex-rich-response em{font-style:italic}.alex-response-list{margin:7px 0 12px;padding-left:24px}.alex-response-list li{margin:6px 0;line-height:1.55}.alex-response-list li::marker{color:var(--accent);font-weight:700}';
    document.head.appendChild(style);
  }
  const lines = String(value || '').replace(/\r/g, '').split('\n');
  const blocks = [];
  let listType = null;
  const closeList = () => {
    if (listType) blocks.push(`</${listType}>`);
    listType = null;
  };
  const inline = line => escapeHtml(line)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { closeList(); continue; }
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    const bulleted = line.match(/^[-*•]\s+(.+)$/);
    if (heading) { closeList(); blocks.push(`<h3 class="alex-response-heading">${inline(heading[1])}</h3>`); continue; }
    if (numbered || bulleted) {
      const nextType = numbered ? 'ol' : 'ul';
      if (listType !== nextType) { closeList(); listType = nextType; blocks.push(`<${listType} class="alex-response-list">`); }
      blocks.push(`<li>${inline((numbered || bulleted)[1])}</li>`);
      continue;
    }
    closeList();
    blocks.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return blocks.join('');
}

function appendUserMessage(text) {
  const feed = document.getElementById("alex-chat-feed");
  if (!feed) return;
  const msg = document.createElement("div");
  msg.className = "alex-msg alex-msg-user";
  msg.innerHTML = '<div class="alex-msg-header"><span>Você</span></div>' +
    '<div class="alex-msg-bubble">' + escapeHtml(text).replace(/\n/g, '<br>') + '</div>';
  feed.appendChild(msg);
  feed.scrollTop = feed.scrollHeight;
}

function display(message, title = "Leco", isError = false) {
  const feed = document.getElementById("alex-chat-feed");
  if (feed) {
    const existingThinking = document.getElementById("alex-thinking-msg");
    if (existingThinking) existingThinking.remove();

    if (title === "Leco está pensando") {
      const thinking = document.createElement("div");
      thinking.id = "alex-thinking-msg";
      thinking.className = "alex-msg alex-msg-alex";
      thinking.innerHTML = '<div class="alex-msg-header"><span class="response-icon">🎓</span><span>Leco</span></div>' +
        '<div class="alex-msg-bubble" style="opacity:0.85; font-style:italic;">' + escapeHtml(message) + '</div>';
      feed.appendChild(thinking);
      feed.scrollTop = feed.scrollHeight;
      return;
    }

    const msg = document.createElement("div");
    msg.className = "alex-msg alex-msg-alex";
    const headerTitle = isError ? 'Aviso' : 'Leco';
    const errorStyle = isError ? ' style="border-left: 4px solid var(--danger);"' : '';
    msg.innerHTML = '<div class="alex-msg-header"><span class="response-icon">🎓</span><span>' + headerTitle + '</span></div>' +
      '<div class="alex-msg-bubble alex-rich-response"' + errorStyle + '>' + formatAlexResponse(message) + '</div>';
    feed.appendChild(msg);
    feed.scrollTop = feed.scrollHeight;
  }

  if (outputTitle) outputTitle.textContent = title;
  if (outputCopy) {
    outputCopy.textContent = message;
    outputCopy.style.whiteSpace = "pre-wrap";
    outputCopy.style.overflowWrap = "anywhere";
    outputCopy.style.color = isError ? "var(--danger)" : "var(--text)";
  }
  if (output) output.hidden = false;
  output?.classList.add('is-visible');
  output?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function restoreConversationView(userId) {
  if (renderedHistoryUser === userId) return;
  const restored = getAlexConversation(userId);
  const feed = document.getElementById("alex-chat-feed");
  if (feed && (restored.length || renderedHistoryUser)) feed.replaceChildren();
  sessionHistory.splice(0, sessionHistory.length, ...restored);
  renderedHistoryUser = userId;
  for (const entry of restored) {
    if (entry.role === "user") appendUserMessage(entry.text);
    else display(entry.text, "Leco");
  }
}

if (window.supabaseClient?.auth) {
  window.supabaseClient.auth.getSession()
    .then(({data}) => { if (data?.session?.user?.id) restoreConversationView(data.session.user.id); })
    .catch(() => {});
}

document.getElementById("alex-new-conversation")?.addEventListener("click", () => {
  if (!renderedHistoryUser) return;
  clearAlexConversation(renderedHistoryUser);
  sessionHistory.length = 0;
  document.getElementById("alex-chat-feed")?.replaceChildren();
  display("Nova conversa iniciada. Sobre o que você quer conversar?", "Leco");
});

function isStudyPlanningRequest(value) {
  const clean = String(value || "").toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ");
  return /\b(cronograma|aulas? (?:desta|da|por) semana|rodando em|lista de quest|lista de flashcard|criar quest|criar flashcard|selecionar apostila|estudar agora|mudar as aulas|ajustar.*cronograma)\b/.test(clean);
}

function renderStudyAction(plan) {
  if (!feed || !plan || !["schedule_focus", "topic_bundle"].includes(plan.type)) return;
  const card = document.createElement("section");
  card.className = "alex-message alex-message--assistant alex-study-action";
  const title = document.createElement("strong");
  title.textContent = plan.type === "schedule_focus" ? "Alteração de cronograma" : "Pacote de estudo";
  const summary = document.createElement("p");
  const count = Number(plan.preview?.planned_count || 0);
  summary.textContent = plan.type === "schedule_focus"
    ? `${plan.topic}: ${count} aula${count === 1 ? "" : "s"} entre ${plan.start_date} e ${plan.end_date}, ${plan.lessons_per_day || 1} por dia de estudo.`
    : `${plan.topic}: ${plan.question_count || 0} questões e ${plan.flashcard_count || 0} flashcards, além de uma apostila compatível quando disponível.`;
  const actions = document.createElement("div");
  actions.className = "alex-study-action-buttons";
  const apply = document.createElement("button");
  apply.type = "button";
  apply.textContent = "Confirmar e aplicar";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Cancelar";
  actions.append(apply, cancel);
  card.append(title, summary, actions);
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
  cancel.onclick = () => card.remove();
  apply.onclick = async () => {
    apply.disabled = true;
    cancel.disabled = true;
    apply.textContent = "Aplicando…";
    const client = window.supabaseClient;
    try {
      const { data, error } = await client.functions.invoke("professor-alex-gemini", { body: { action: "apply_study_action", action_plan: plan } });
      if (error || !data?.action_result) throw error || Error("empty_action");
      display(data.answer || "Alteração aplicada.", "Leco");
      if (plan.type === "topic_bundle") {
        const result = data.action_result;
        const links = document.createElement("div");
        links.className = "alex-study-action-links";
        if (result.question_set_id) {
          const link = document.createElement("a"); link.href = `/resolver-questoes/?set_id=${encodeURIComponent(result.question_set_id)}`; link.textContent = "Abrir questões"; links.appendChild(link);
        }
        const ids = Array.isArray(result.flashcards) ? result.flashcards.map(item => item?.id).filter(Boolean) : [];
        if (ids.length) {
          const link = document.createElement("a"); link.href = `/flashcards/?study_ids=${encodeURIComponent(ids.join(","))}&study_topic=${encodeURIComponent(plan.topic)}`; link.textContent = "Abrir flashcards"; links.appendChild(link);
        }
        if (result.apostila?.url) {
          const link = document.createElement("a"); link.href = result.apostila.url; link.textContent = "Abrir apostila"; links.appendChild(link);
        }
        card.replaceWith(links);
      } else {
        const link = document.createElement("a"); link.href = "/cronograma/"; link.textContent = "Ver cronograma atualizado"; card.replaceWith(link);
      }
    } catch {
      apply.disabled = false;
      cancel.disabled = false;
      apply.textContent = "Tentar novamente";
      display("Não consegui aplicar essa proposta. Nada foi alterado.", "Leco", true);
    }
  };
}

async function prepareFile(file) {
  if (!file) return null;
  const name = String(file.name || "material").slice(0, 120);
  const extension = name.toLowerCase().split(".").pop();
  if (extension === "pdf") {
    if (file.size > 4_500_000) throw Error("PDF acima de 4,5 MB. Compacte o arquivo e tente novamente.");
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    }
    return { kind: "pdf", name, data: btoa(binary) };
  }
  if (extension === "txt" || extension === "md") {
    if (file.size > 100_000) throw Error("O arquivo de texto precisa ter até 100 KB.");
    return { kind: "text", name, text: (await file.text()).slice(0, 70_000) };
  }
  throw Error("Para estudar com material, anexe um PDF, TXT ou MD. Converta arquivos Word para PDF.");
}

async function errorMessage(error) {
  const ctx = error?.context;
  let code = "";
  if (ctx && typeof ctx.json === "function") {
    const payload = await ctx.json().catch(() => ({}));
    code = String(payload?.error || "");
  }
  return ERROR_MESSAGES[code] || "Não foi possível gerar a aula. Verifique sua conexão e tente novamente.";
}

if (form) {
  // Target capture phase bypasses the previous placeholder submit listener without
  // changing the inline script/CSP hash that powers the other page interactions.
  form.addEventListener("submit", async event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (submit?.disabled) return;

    const client = window.supabaseClient;
    if (!client?.functions) {
      display("Não foi possível iniciar a conexão com o Supabase.", "Conexão indisponível", true);
      return;
    }

    // Resolve the account before reading history: no cross-account context leakage.
    let session;
    try {
      const authResult = await client.auth.getSession();
      session = authResult?.data?.session;
      if (authResult?.error || !session?.access_token || !session?.user?.id) {
        display(ERROR_MESSAGES.unauthorized, "Faça login", true);
        return;
      }
    } catch {
      display(ERROR_MESSAGES.unauthorized, "Faça login", true);
      return;
    }
    restoreConversationView(session.user.id);
    sessionHistory.splice(0, sessionHistory.length, ...getAlexConversation(session.user.id));

    const area = document.getElementById("alex-area")?.value || "";
    const topic = document.getElementById("alex-topic")?.value.trim() || "";
    const prompt = document.getElementById("alex-prompt")?.value.trim() || "";
    if (!topic && !prompt) {
      display(ERROR_MESSAGES.empty_prompt, "Faltou a pergunta", true);
      return;
    }

    const modeToggle = document.getElementById("alex-mode-toggle");
    const isEstourado = (modeToggle?.getAttribute("aria-checked") === "true") ||
      (modeToggle?.getAttribute("aria-pressed") === "true") ||
      (document.querySelector('[data-alex-mode="estourado"]')?.getAttribute("aria-pressed") === "true");

    const payload = {
      request_id: crypto.randomUUID(),
      area,
      topic,
      prompt,
      intent: document.querySelector("[data-alex-intent].is-active")?.dataset.alexIntent || "learn",
      mode: isEstourado ? "estourado" : "normal",
      channel: isLiveActive ? "voice" : "chat",
      depth: document.querySelector('[data-alex-depth].is-active')?.dataset.alexDepth === "aula" ? "aula" : "rapida",
      voice_quality: document.getElementById("alex-natural-voice")?.checked ? "natural" : "fast",
      history: sessionHistory.slice(-12),
    };
    if (isLiveActive && Number.isFinite(liveTranscriptConfidence)) payload.voice_confidence = liveTranscriptConfidence;
    const hasMaterial = Boolean(fileInput?.files?.[0]);
    const isSocial = isSocialOrGreeting(prompt || topic);
    const isPlanning = isStudyPlanningRequest(prompt || topic);
    if (isSocial && !hasMaterial) {
      const answer = fastSocialReply(prompt || topic, isEstourado);
      if (prompt) appendUserMessage(prompt);
      display(answer, "Leco");
      sessionHistory.splice(0, sessionHistory.length, ...rememberAlexTurn(session.user.id, prompt || topic, answer));
      const promptInput = document.getElementById("alex-prompt");
      if (prompt && promptInput?.value.trim() === prompt) promptInput.value = "";
      const mascot = document.getElementById("alex-mascot");
      if (mascot?.playAnimation) mascot.playAnimation(isEstourado ? "angry" : "wave");
      if (isLiveActive) {
        const statusText = document.getElementById("alex-status-text");
        if (statusText) statusText.textContent = "🔊 Leco respondendo...";
        speakText(answer, () => {
          if (!isLiveActive) return;
          const currentStatus = document.getElementById("alex-status-text");
          if (currentStatus) currentStatus.textContent = "🎙️ Ouvindo... Pode perguntar mais!";
          setTimeout(() => startLiveListening?.(), 250);
        });
      }
      return;
    }
    // O índice da LURIA é apenas um reforço opcional. Perguntas médicas
    // gerais devem seguir para o tutor clínico completo.
    // Don't fetch the full site index for ordinary questions: it is only useful when
    // a study material is attached. Start it concurrently with file preparation.
    const siteContextPromise = hasMaterial && !isSocial && !isPlanning
      ? findAlexSiteContext([topic, prompt].filter(Boolean).join(" "))
      : Promise.resolve(null);

    const oldText = submit?.textContent || "Perguntar";
    if (submit) {
      submit.disabled = true;
      submit.textContent = isLiveActive ? "Respondendo…" : (payload.depth === "aula" ? "Preparando aula…" : "Respondendo…");
    }

    if (isLiveActive) {
      const statusText = document.getElementById("alex-status-text");
      if (statusText) statusText.textContent = "🤔 Leco pensando na resposta...";
    } else {
      display(payload.depth === "aula" ? "Preparando explicação detalhada…" : "Respondendo à sua pergunta…", "Leco está pensando");
    }
    if (prompt) appendUserMessage(prompt);
    if (isLiveActive) speakText(isEstourado ? "Aham. Espera aí." : "Aham… deixa eu pensar.");

    const mascot = document.getElementById("alex-mascot");
    if (mascot?.playAnimation) {
      if (isEstourado) {
        mascot.expression = "angry";
        mascot.playAnimation("angry");
      } else {
        mascot.playAnimation("thinking");
      }
    }

    try {
      const [material, siteContext] = await Promise.all([
        prepareFile(fileInput?.files?.[0]), siteContextPromise
      ]);
      if (material) payload.file = material;
      if (siteContext && material) {
        payload.site_context = siteContext.context;
        payload.site_sources = siteContext.sources;
      }
      const { data, error } = await client.functions.invoke("professor-alex-gemini", { body: payload });
      if (error) throw error;
      if (data?.usage) renderUsage(data.usage);
      if (data?.accounting_pending) {
        // Token accounting completes in the Edge background; refresh the meter
        // shortly afterward without holding up the response.
        window.setTimeout(() => refreshUsage().catch(() => {}), 1_300);
      }
      if (typeof data?.clarification === "string" && data.clarification.trim()) {
        if (!isLiveActive) display(data.clarification, "Confirme a transcrição");
        else speakText(data.clarification);
        return;
      }
      if (typeof data?.answer !== "string" || !data.answer.trim()) throw Error("empty_response");
      sessionHistory.splice(0, sessionHistory.length, ...rememberAlexTurn(session.user.id, prompt || topic, data.answer));
      const promptInput = document.getElementById("alex-prompt");
      if (prompt && promptInput?.value.trim() === prompt) promptInput.value = "";
      // Modo ao vivo: texto acessível no chat e áudio automático. Chat comum: só texto.
      display(data.answer, payload.depth === "aula" ? "Aula com o Leco" : "Leco");
      if (data?.action_plan) renderStudyAction(data.action_plan);
      if (!isLiveActive) {
        if (mascot?.playAnimation) {
          if (isEstourado) {
            mascot.expression = "angry";
            mascot.playAnimation("explaining");
          } else {
            mascot.playAnimation("explaining");
          }
        }
      } else {
        const statusText = document.getElementById("alex-status-text");
        if (statusText) statusText.textContent = "🔊 Leco respondendo por voz (Puck)...";
        const onFinishedSpeaking = () => {
          if (isLiveActive) {
            const currentStatus = document.getElementById("alex-status-text");
            if (currentStatus) currentStatus.textContent = "🎙️ Ouvindo... Pode perguntar mais!";
            setTimeout(() => {
              if (isLiveActive && !window.speechSynthesis?.speaking && !currentPuckAudio && !currentPuckSource && !audioPlaybackPending) {
                if (typeof startLiveListening === "function") startLiveListening();
              }
            }, 400);
          }
        };

        if (data?.audio) {
          playGeminiPuckAudio(data.audio, data.audioMimeType || "audio/wav", onFinishedSpeaking, data.answer);
        } else {
          if (statusText) statusText.textContent = data?.audioError === "device_tts_fast_path"
            ? "🔊 Leco respondendo..."
            : "Voz do Gemini indisponível. Usando a voz do dispositivo.";
          speakText(data.answer, onFinishedSpeaking);
        }
      }
    } catch (error) {
      const message = error?.message === "empty_response"
        ? ERROR_MESSAGES.empty_response
        : (error instanceof Error && /PDF acima|arquivo de texto|anexe um PDF/.test(error.message)
          ? error.message : await errorMessage(error));
      if (isLiveActive) {
        const statusText = document.getElementById("alex-status-text");
        if (statusText) statusText.textContent = "⚠️ " + message;
        speakText(message, () => {
          if (isLiveActive && typeof startLiveListening === "function") startLiveListening();
        });
      } else {
        display(message, "Não foi possível concluir a aula", true);
      }
      if (mascot?.playAnimation) mascot.playAnimation("confused");
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = oldText;
      }
    }
  }, true);
}

// ==========================================
// Módulo de Conversa ao Vivo por Voz
// ==========================================
const liveCallBtn = document.getElementById("alex-live-call-btn");
const liveCallText = document.getElementById("alex-live-call-text");
const stopResponseBtn = document.getElementById("alex-stop-response");

let currentPuckAudio = null;
let currentPuckSource = null;
let liveAudioContext = null;
let audioPlaybackPending = false;
let playbackGeneration = 0;

function setStopResponseVisible(visible) {
  if (!stopResponseBtn) return;
  stopResponseBtn.hidden = !visible;
  stopResponseBtn.style.display = visible ? "inline-flex" : "none";
}

// O toque em "Conversar ao Vivo" autoriza a saída de áudio para toda a sessão.
// No Safari/iOS a liberação precisa ocorrer dentro do evento de clique.
function unlockLiveAudio() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return;
  try {
    if (!liveAudioContext || liveAudioContext.state === "closed") {
      liveAudioContext = new Context();
    }
    if (liveAudioContext.state === "suspended") {
      liveAudioContext.resume().catch(() => {});
    }
    const silent = liveAudioContext.createBufferSource();
    silent.buffer = liveAudioContext.createBuffer(1, 1, 22050);
    silent.connect(liveAudioContext.destination);
    silent.start(0);
  } catch (err) {
    console.warn("[Live Alex] Não foi possível habilitar AudioContext:", err?.name || "audio_error");
  }
}

function stopCurrentVoicePlayback() {
  playbackGeneration += 1;
  speechGeneration += 1;
  audioPlaybackPending = false;
  if (currentPuckSource) {
    try { currentPuckSource.onended = null; currentPuckSource.stop(); } catch {}
    currentPuckSource = null;
  }
  if (currentPuckAudio) {
    try { currentPuckAudio.onended = null; currentPuckAudio.onerror = null; currentPuckAudio.pause(); currentPuckAudio.currentTime = 0; } catch {}
    currentPuckAudio = null;
  }
  window.speechSynthesis?.cancel();
  const mascot = document.getElementById("alex-mascot");
  if (mascot) mascot.speaking = false;
  setStopResponseVisible(false);
}

stopResponseBtn?.addEventListener("click", () => {
  stopCurrentVoicePlayback();
  const statusText = document.getElementById("alex-status-text");
  if (statusText) statusText.textContent = isLiveActive ? "⏸️ Resposta interrompida." : "Resposta interrompida.";
});

function setMascotSpeaking() {
  const mascot = document.getElementById("alex-mascot");
  if (!mascot) return;
  const toggle = document.getElementById("alex-mode-toggle");
  const estourado = toggle?.getAttribute("aria-checked") === "true";
  mascot.speaking = true;
  if (typeof mascot.playAnimation === "function") {
    mascot.expression = estourado ? "angry" : "happy";
    mascot.playAnimation(estourado ? "angry" : "explaining");
  }
}

// Reprodução automática na sessão de voz. AudioContext é desbloqueado na
// ativação do modo ao vivo e reproduz o WAV do Gemini sem outro clique.
async function playGeminiPuckAudio(base64Audio, mimeType, onComplete, fallbackText = "") {
  if (!isLiveActive) return;
  stopCurrentVoicePlayback();
  const generation = playbackGeneration;
  audioPlaybackPending = true;
  setStopResponseVisible(true);
  const finish = () => {
    if (generation !== playbackGeneration) return;
    currentPuckSource = null;
    currentPuckAudio = null;
    audioPlaybackPending = false;
    setStopResponseVisible(false);
    const mascot = document.getElementById("alex-mascot");
    if (mascot) mascot.speaking = false;
    if (typeof onComplete === "function") onComplete();
  };
  const fallbackToSpeech = () => {
    if (!isLiveActive || generation !== playbackGeneration) return;
    currentPuckSource = null;
    currentPuckAudio = null;
    const status = document.getElementById("alex-status-text");
    if (status) status.textContent = "Voz do Gemini indisponível. Respondendo com a voz do dispositivo...";
    speakText(fallbackText, finish);
  };

  // Compatível com WAV unário do Gemini 3.8. A sessão de áudio já começou no clique.
  if (liveAudioContext) {
    try {
      if (liveAudioContext.state === "suspended") await liveAudioContext.resume();
      const raw = atob(base64Audio);
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      const decoded = await liveAudioContext.decodeAudioData(bytes.buffer);
      if (!isLiveActive || generation !== playbackGeneration) return;
      const source = liveAudioContext.createBufferSource();
      source.buffer = decoded;
      source.connect(liveAudioContext.destination);
      source.onended = finish;
      currentPuckSource = source;
      setMascotSpeaking();
      source.start(0);
      return;
    } catch (error) {
      console.warn("[Live Alex] Falha ao decodificar/reproduzir áudio:", error?.name || "audio_error");
    }
  }

  // Navegadores sem AudioContext: tentar reprodução nativa automaticamente.
  try {
    if (!isLiveActive || generation !== playbackGeneration) return;
    const audio = new Audio("data:" + (mimeType || "audio/wav") + ";base64," + base64Audio);
    currentPuckAudio = audio;
    audio.onplay = setMascotSpeaking;
    audio.onended = finish;
    audio.onerror = fallbackToSpeech;
    const started = audio.play();
    if (started && typeof started.catch === "function") started.catch(fallbackToSpeech);
  } catch {
    fallbackToSpeech();
  }
}

function speakText(text, onComplete) {
  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    const status = document.getElementById("alex-status-text");
    if (status) status.textContent = "Este navegador não oferece síntese de voz. A resposta está no chat.";
    audioPlaybackPending = false;
    if (onComplete) onComplete();
    return;
  }
  const generation = ++speechGeneration;
  window.speechSynthesis.cancel();

  const plainText = String(text || "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .trim();

  if (!plainText) {
    if (onComplete) onComplete();
    return;
  }

  const modeToggle = document.getElementById("alex-mode-toggle");
  const isEstourado = (modeToggle?.getAttribute("aria-checked") === "true") ||
    (modeToggle?.getAttribute("aria-pressed") === "true") ||
    (document.querySelector('[data-alex-mode="estourado"]')?.getAttribute("aria-pressed") === "true");

  audioPlaybackPending = true;
  const utterance = new SpeechSynthesisUtterance(plainText);
  utterance.lang = "pt-BR";
  // Cadência e tom calibrados conforme especificação do AI Studio:
  utterance.rate = isEstourado ? 1.25 : 1.04;
  utterance.pitch = isEstourado ? 0.82 : 1.0;

  try {
    const voices = window.speechSynthesis.getVoices?.() || [];
    const ptVoice = voices.find(v => v.lang === "pt-BR" || v.lang?.startsWith("pt"));
    if (ptVoice) utterance.voice = ptVoice;
  } catch {}

  const mascot = document.getElementById("alex-mascot");
  utterance.onstart = () => {
    if (generation !== speechGeneration) return;
    setStopResponseVisible(true);
    if (mascot) {
      mascot.speaking = true;
      if (typeof mascot.playAnimation === "function") {
        mascot.expression = isEstourado ? "angry" : "happy";
        mascot.playAnimation(isEstourado ? "angry" : "explaining");
      }
    }
  };

  let speechDone = false;
  const endSpeech = () => {
    if (speechDone || generation !== speechGeneration) return;
    speechDone = true;
    audioPlaybackPending = false;
    setStopResponseVisible(false);
    if (mascot) mascot.speaking = false;
    if (onComplete) onComplete();
  };

  utterance.onend = endSpeech;
  utterance.onerror = () => {
    const status = document.getElementById("alex-status-text");
    if (status) status.textContent = "Não foi possível reproduzir áudio. Verifique o volume e as permissões do navegador.";
    endSpeech();
  };
  window.speechSynthesis.speak(utterance);
}

function initLiveVoiceMode() {
  if (!liveCallBtn) return;
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    liveCallBtn.title = "Navegador não suporta reconhecimento de voz contínuo.";
    liveCallBtn.style.opacity = "0.7";
    return;
  }

  liveCallBtn.addEventListener("click", () => {
    if (isLiveActive) stopLiveMode();
    else startLiveMode();
  });

  function startLiveMode() {
    // Acionado diretamente pelo clique, antes do primeiro reconhecimento.
    unlockLiveAudio();
    isLiveActive = true;
    liveCallBtn.classList.add("is-active");
    if (liveCallText) liveCallText.textContent = "Encerrar Conversa ao Vivo";
    const statusText = document.getElementById("alex-status-text");
    if (statusText) statusText.textContent = "🎙️ Conversa ao vivo ativa! Fale sua dúvida clínica...";
    const mascot = document.getElementById("alex-mascot");
    if (mascot && typeof mascot.playAnimation === "function") {
      mascot.expression = "attentive";
      mascot.playAnimation("listening");
    }
    startListening();
  }

  function stopLiveMode() {
    isLiveActive = false;
    if (liveRecognition) {
      try { liveRecognition.abort(); } catch {}
      liveRecognition = null;
    }
    stopCurrentVoicePlayback();
    const mascot = document.getElementById("alex-mascot");
    if (mascot) {
      mascot.speaking = false;
      if (typeof mascot.playAnimation === "function") {
        mascot.expression = "happy";
        mascot.playAnimation("wave");
      }
    }
    liveCallBtn.classList.remove("is-active");
    if (liveCallText) liveCallText.textContent = "Conversar ao Vivo por Voz";
    const statusText = document.getElementById("alex-status-text");
    if (statusText) statusText.textContent = "Leco online e pronto para ensinar";
  }

  startLiveListening = startListening;
  function startListening() {
    if (!isLiveActive || liveRecognition || audioPlaybackPending || currentPuckSource || currentPuckAudio || submit?.disabled) return;
    try {
      liveRecognition = new SpeechRec();
      const recognition = liveRecognition;
      liveRecognition.lang = "pt-BR";
      liveRecognition.continuous = false;
      liveRecognition.interimResults = false;
      liveRecognition.onresult = event => {
        if (!isLiveActive || recognition !== liveRecognition) return;
        const query = event.results?.[0]?.[0]?.transcript?.trim();
        if (query) {
          liveTranscriptConfidence = Number(event.results?.[0]?.[0]?.confidence);
          const promptInput = document.getElementById("alex-prompt");
          if (promptInput) promptInput.value = query;
          if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      };
      liveRecognition.onerror = err => {
        if (isLiveActive && err.error !== "no-speech") console.warn("[Live Alex]", err);
      };
      liveRecognition.onend = () => {
        if (recognition === liveRecognition) liveRecognition = null;
        if (isLiveActive && !window.speechSynthesis?.speaking && !currentPuckAudio && !currentPuckSource && !audioPlaybackPending && !submit?.disabled) {
          setTimeout(startListening, 600);
        }
      };
      liveRecognition.start();
    } catch (e) {
      console.warn("[Live Speech Error]", e);
    }
  }
}

initLiveVoiceMode();
