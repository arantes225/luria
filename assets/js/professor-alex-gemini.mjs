// Secure Professor Alex front-end: only the user's Supabase JWT goes to our Edge Function.
// The Gemini API key is read exclusively inside the Edge Function.
const form = document.getElementById("alex-form");
const output = document.getElementById("alex-output");
const outputCopy = document.getElementById("alex-output-copy");
const outputTitle = output?.querySelector("h3");
const submit = form?.querySelector('button[type="submit"]');
const fileInput = document.getElementById("alex-file");

const ERROR_MESSAGES = {
  unauthorized: "Entre na sua conta da LURIA para conversar com o Professor Alex.",
  empty_prompt: "Digite uma pergunta ou informe o tema que deseja estudar.",
  invalid_body: "Os dados da aula não puderam ser enviados. Tente novamente.",
  payload_too_large: "O material é muito grande. Utilize um PDF menor.",
  invalid_file: "O arquivo não pôde ser lido. Envie um PDF, TXT ou MD válido.",
  unsupported_file: "Formato não suportado. Converta o material para PDF, TXT ou MD.",
  daily_limit_reached: "Você atingiu o limite provisório de 15 solicitações hoje. Volte amanhã.",
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
  usage_limit_unavailable: "Não foi possível verificar o limite de uso do Professor Alex.",
  backend_not_configured: "O backend do Professor Alex ainda não está configurado.",
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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

function display(message, title = "Professor Alex", isError = false) {
  const feed = document.getElementById("alex-chat-feed");
  if (feed) {
    const existingThinking = document.getElementById("alex-thinking-msg");
    if (existingThinking) existingThinking.remove();

    if (title === "Professor Alex está pensando") {
      const thinking = document.createElement("div");
      thinking.id = "alex-thinking-msg";
      thinking.className = "alex-msg alex-msg-alex";
      thinking.innerHTML = '<div class="alex-msg-header"><span class="response-icon">🎓</span><span>Professor Alex</span></div>' +
        '<div class="alex-msg-bubble" style="opacity:0.85; font-style:italic;">' + escapeHtml(message) + '</div>';
      feed.appendChild(thinking);
      feed.scrollTop = feed.scrollHeight;
      return;
    }

    const msg = document.createElement("div");
    msg.className = "alex-msg alex-msg-alex";
    const headerTitle = isError ? 'Aviso' : 'Professor Alex';
    const errorStyle = isError ? ' style="border-left: 4px solid var(--danger);"' : '';
    msg.innerHTML = '<div class="alex-msg-header"><span class="response-icon">🎓</span><span>' + headerTitle + '</span></div>' +
      '<div class="alex-msg-bubble"' + errorStyle + '>' + escapeHtml(message).replace(/\n/g, '<br>') + '</div>';
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

    const area = document.getElementById("alex-area")?.value || "";
    const topic = document.getElementById("alex-topic")?.value.trim() || "";
    const prompt = document.getElementById("alex-prompt")?.value.trim() || "";
    if (!topic && !prompt) {
      display(ERROR_MESSAGES.empty_prompt, "Faltou a pergunta", true);
      return;
    }

    const payload = {
      area,
      topic,
      prompt,
      intent: document.querySelector("[data-alex-intent].is-active")?.dataset.alexIntent || "learn",
      mode: document.querySelector('[data-alex-mode][aria-pressed="true"]')?.dataset.alexMode || "normal",
    };

    if (prompt) appendUserMessage(prompt);
    const oldText = submit?.textContent || "Começar aula";
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Preparando aula…";
    }
    display("Analisando sua pergunta e preparando a explicação…", "Professor Alex está pensando");

    const mascot = document.getElementById("alex-mascot");
    if (mascot?.playAnimation) mascot.playAnimation("thinking");

    try {
      const { data: { session }, error: sessionError } = await client.auth.getSession();
      if (sessionError || !session?.access_token) {
        display(ERROR_MESSAGES.unauthorized, "Faça login", true);
        return;
      }
      const material = await prepareFile(fileInput?.files?.[0]);
      if (material) payload.file = material;
      const { data, error } = await client.functions.invoke("professor-alex-gemini", { body: payload });
      if (error) throw error;
      if (typeof data?.answer !== "string" || !data.answer.trim()) throw Error("empty_response");
      display(data.answer, "Sua aula com o Professor Alex");
      if (mascot?.playAnimation) mascot.playAnimation("explaining");
      if (isLiveActive) {
        speakText(data.answer, () => {
          if (isLiveActive) {
            const statusText = document.getElementById("alex-status-text");
            if (statusText) statusText.textContent = "🎙️ Ouvindo... Pode perguntar mais!";
            setTimeout(() => {
              if (isLiveActive && !window.speechSynthesis?.speaking) {
                const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (SpeechRec && !liveRecognition) {
                  try {
                    liveRecognition = new SpeechRec();
                    liveRecognition.lang = "pt-BR";
                    liveRecognition.continuous = false;
                    liveRecognition.interimResults = false;
                    liveRecognition.onresult = ev => {
                      const q = ev.results?.[0]?.[0]?.transcript?.trim();
                      if (q) {
                        const p = document.getElementById("alex-prompt");
                        if (p) p.value = q;
                        form.dispatchEvent(new Event("submit", { cancelable: true }));
                      }
                    };
                    liveRecognition.onend = () => { liveRecognition = null; };
                    liveRecognition.start();
                  } catch {}
                }
              }
            }, 500);
          }
        });
      }
    } catch (error) {
      const message = error?.message === "empty_response"
        ? ERROR_MESSAGES.empty_response
        : (error instanceof Error && /PDF acima|arquivo de texto|anexe um PDF/.test(error.message)
          ? error.message : await errorMessage(error));
      display(message, "Não foi possível concluir a aula", true);
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
let isLiveActive = false;
let liveRecognition = null;
const liveCallBtn = document.getElementById("alex-live-call-btn");
const liveCallText = document.getElementById("alex-live-call-text");

function speakText(text, onComplete) {
  if (!("speechSynthesis" in window)) {
    if (onComplete) onComplete();
    return;
  }
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

  const utterance = new SpeechSynthesisUtterance(plainText);
  utterance.lang = "pt-BR";
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  const mascot = document.getElementById("alex-mascot");
  utterance.onstart = () => {
    if (mascot) {
      mascot.speaking = true;
      if (typeof mascot.playAnimation === "function") {
        mascot.expression = "happy";
        mascot.playAnimation("explaining");
      }
    }
  };

  const endSpeech = () => {
    if (mascot) mascot.speaking = false;
    if (onComplete) onComplete();
  };

  utterance.onend = endSpeech;
  utterance.onerror = endSpeech;
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
    window.speechSynthesis?.cancel();
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
    if (statusText) statusText.textContent = "Professor Alex online e pronto para ensinar";
  }

  function startListening() {
    if (!isLiveActive) return;
    try {
      liveRecognition = new SpeechRec();
      liveRecognition.lang = "pt-BR";
      liveRecognition.continuous = false;
      liveRecognition.interimResults = false;
      liveRecognition.onresult = async event => {
        const query = event.results?.[0]?.[0]?.transcript?.trim();
        if (query) {
          const promptInput = document.getElementById("alex-prompt");
          if (promptInput) promptInput.value = query;
          if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      };
      liveRecognition.onerror = err => {
        if (isLiveActive && err.error !== "no-speech") console.warn("[Live Alex]", err);
      };
      liveRecognition.onend = () => {
        if (isLiveActive && !window.speechSynthesis?.speaking && !submit?.disabled) {
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
