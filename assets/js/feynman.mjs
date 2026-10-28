const client = window.supabaseClient;
const setup = document.getElementById("feynman-setup");
const sessionPanel = document.getElementById("feynman-session");
const reportPanel = document.getElementById("feynman-report");
const topicInput = document.getElementById("feynman-topic");
const startButton = document.getElementById("feynman-start");
const setupStatus = document.getElementById("feynman-setup-status");
const form = document.getElementById("feynman-form");
const explanation = document.getElementById("feynman-explanation");
const sendButton = document.getElementById("feynman-send");
const voiceButton = document.getElementById("feynman-voice");
const finishButton = document.getElementById("feynman-finish");
const restartButton = document.getElementById("feynman-restart");
const feed = document.getElementById("feynman-feed");
const status = document.getElementById("feynman-status");
const timer = document.getElementById("feynman-timer");
const progress = document.getElementById("feynman-progress-bar");
const confirmBox = document.getElementById("feynman-confirm");
const confirmCopy = document.getElementById("feynman-confirm-copy");
const confirmYes = document.getElementById("feynman-confirm-yes");
const confirmAgain = document.getElementById("feynman-confirm-again");

const requestedTopic = new URLSearchParams(window.location.search).get("topic")?.trim();
if (topicInput && requestedTopic) topicInput.value = requestedTopic.slice(0, 180);

const SESSION_SECONDS = 5 * 60;
const modeLabels = { iniciante: "Aluno iniciante", questionador: "Aluno questionador", banca: "Banca examinadora" };
const medicalTerms = ["sepse", "choque séptico", "insuficiência cardíaca", "síndrome coronariana", "diabetes mellitus", "hipertensão", "pneumonia", "tromboembolismo", "fisiopatologia", "hemodinâmica", "vasopressor", "noradrenalina", "lactato", "hipoperfusão", "taquicardia", "bradicardia", "dispneia", "edema", "hipoxemia", "insulina", "cetoacidose", "glomerular", "creatinina", "antibiótico"];

let state = { topic: "", mode: "questionador", turns: [], seconds: SESSION_SECONDS, id: null, busy: false, finished: false };
let clockHandle = null;
let recognition = null;
let pendingTranscript = "";
let pendingConfidence = null;

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
    return (c === "x" ? r : (r & 3) | 8).toString(16);
  });
}

function normalize(value) {
  return String(value || "").toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function contextualTranscript(result) {
  const alternatives = [];
  for (let index = 0; index < result.length; index++) alternatives.push(result[index]);
  const context = normalize(`${state.topic} ${state.turns.filter(turn => turn.role === "user").map(turn => turn.text).join(" ")}`);
  const expected = medicalTerms.filter(term => context.includes(normalize(term)) || normalize(state.topic).includes(normalize(term)));
  const ranked = alternatives.map(item => {
    const text = String(item.transcript || "").trim();
    const normalized = normalize(text);
    let score = Number(item.confidence || 0);
    if (medicalTerms.some(term => normalized.includes(normalize(term)))) score += .35;
    if (expected.some(term => normalized.includes(normalize(term)))) score += .25;
    return { text, confidence: Number(item.confidence), score };
  }).sort((a, b) => b.score - a.score);
  return ranked[0] || { text: "", confidence: 0 };
}

function addMessage(role, text) {
  const article = document.createElement("article");
  article.className = `feynman-message feynman-message--${role === "user" ? "user" : "ai"}`;
  const label = document.createElement("span");
  label.textContent = role === "user" ? "Você ensinando" : "Aluno IA";
  const copy = document.createElement("p");
  copy.textContent = text;
  article.append(label, copy);
  feed.append(article);
  feed.scrollTop = feed.scrollHeight;
}

function speak(text) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance !== "function") return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text).replace(/[*#_`]/g, ""));
  utterance.lang = "pt-BR";
  utterance.rate = 1.06;
  speechSynthesis.speak(utterance);
}

function setBusy(value, message = "") {
  state.busy = value;
  sendButton.disabled = value;
  voiceButton.disabled = value;
  finishButton.disabled = value;
  if (message) status.textContent = message;
}

function historyPayload() {
  return state.turns.slice(-12).map(turn => ({ role: turn.role === "ai" ? "model" : "user", text: turn.text }));
}

async function invoke(action, prompt, confidence = null) {
  const { data: auth } = await client.auth.getSession();
  if (!auth?.session) throw new Error("Faça login novamente para continuar.");
  const payload = {
    request_id: uuid(), experience: "feynman", feynman_action: action,
    feynman_mode: state.mode, topic: state.topic, prompt,
    history: historyPayload(), channel: "chat", voice_input: confidence !== null,
  };
  if (Number.isFinite(confidence)) payload.voice_confidence = confidence;
  const { data, error } = await client.functions.invoke("professor-alex-gemini", { body: payload });
  if (error) throw new Error(error.context?.status === 429 ? "O limite diário de IA foi atingido." : "A IA demorou mais que o esperado. Tente novamente.");
  if (data?.error) throw new Error(data.error === "token_budget_reached" ? "O limite diário de IA foi atingido." : "Não consegui analisar agora. Tente novamente.");
  return data || {};
}

async function persistSession(statusValue = "active", report = null) {
  try {
    const { data: auth } = await client.auth.getSession();
    const user = auth?.session?.user;
    if (!user) return;
    const payload = { user_id: user.id, topic: state.topic, mode: state.mode, status: statusValue, turns: state.turns, report, updated_at: new Date().toISOString() };
    if (statusValue === "completed") payload.completed_at = new Date().toISOString();
    if (state.id) await client.from("feynman_sessions").update(payload).eq("id", state.id);
    else {
      const { data } = await client.from("feynman_sessions").insert(payload).select("id").single();
      state.id = data?.id || null;
    }
  } catch { /* The learning session must remain usable during a database rollout. */ }
}

function updateClock() {
  const minutes = Math.floor(state.seconds / 60);
  const seconds = state.seconds % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  progress.style.transform = `scaleX(${Math.max(0, state.seconds / SESSION_SECONDS)})`;
  if (state.seconds <= 0 && !state.finished) finishSession();
}

function startClock() {
  clearInterval(clockHandle);
  updateClock();
  clockHandle = setInterval(() => { if (!state.busy && !state.finished) state.seconds -= 1; updateClock(); }, 1000);
}

async function startSession() {
  const topic = topicInput.value.trim();
  if (topic.length < 3) { topicInput.focus(); topicInput.setAttribute("aria-invalid", "true"); setupStatus.textContent = "Digite um tema médico para começar."; return; }
  topicInput.removeAttribute("aria-invalid"); setupStatus.textContent = "";
  state = { topic, mode: document.querySelector('input[name="feynman-mode"]:checked')?.value || "questionador", turns: [], seconds: SESSION_SECONDS, id: null, busy: false, finished: false };
  document.getElementById("feynman-session-title").textContent = topic;
  document.getElementById("feynman-mode-label").textContent = modeLabels[state.mode];
  setup.hidden = true; reportPanel.hidden = true; sessionPanel.hidden = false;
  feed.querySelectorAll(".feynman-message:not(:first-child)").forEach(node => node.remove());
  explanation.value = "";
  status.textContent = "Explique sem consultar. Eu vou ouvir antes de perguntar.";
  startClock();
  await persistSession();
  explanation.focus();
}

async function sendExplanation(event) {
  event?.preventDefault();
  if (state.busy || state.finished) return;
  const text = explanation.value.trim();
  if (text.length < 3) { explanation.focus(); status.textContent = "Explique um pouco mais antes de enviar."; return; }
  explanation.value = "";
  addMessage("user", text);
  state.turns.push({ role: "user", text });
  const confidence = Number.isFinite(pendingConfidence) ? pendingConfidence : null;
  pendingConfidence = null;
  setBusy(true, "Pensando em uma pergunta útil…");
  if (confidence !== null) speak("Aham… deixa eu pensar no que perguntar.");
  try {
    const data = await invoke("turn", text, confidence);
    if (data.clarification) {
      addMessage("ai", data.clarification);
      speak(data.clarification);
      status.textContent = "Repita o termo ou digite para confirmar.";
      return;
    }
    const answer = String(data.answer || "Pode aprofundar essa parte?").trim();
    state.turns.push({ role: "ai", text: answer });
    addMessage("ai", answer);
    speak(answer);
    status.textContent = "Continue explicando com suas palavras.";
    persistSession();
  } catch (error) {
    explanation.value = text;
    state.turns.pop();
    status.textContent = error.message || "Não consegui responder agora.";
  } finally { setBusy(false); }
}

function listInto(id, items, fallback) {
  const list = document.getElementById(id);
  list.replaceChildren();
  const values = Array.isArray(items) && items.length ? items : [fallback];
  values.slice(0, 6).forEach(item => { const li = document.createElement("li"); li.textContent = String(item); list.append(li); });
}

function renderReport(report) {
  const score = Math.max(0, Math.min(100, Number(report?.score || 0)));
  document.getElementById("feynman-report-score").textContent = `${Math.round(score)}%`;
  document.getElementById("feynman-report-summary").textContent = report?.summary || "A avaliação considerou precisão, mecanismos e relações clínicas demonstradas na explicação.";
  listInto("feynman-mastered", report?.mastered, "Nenhum domínio pôde ser confirmado com segurança.");
  listInto("feynman-gaps", report?.gaps, "Não foram identificadas lacunas específicas.");
  listInto("feynman-errors", report?.errors, "Nenhum erro conceitual seguro foi identificado.");
  listInto("feynman-next", report?.next_steps, "Revise o tema e tente explicá-lo novamente sem consultar.");
}

async function finishSession() {
  if (state.busy || state.finished) return;
  state.finished = true; clearInterval(clockHandle); recognition?.abort?.();
  setBusy(true, "Montando sua avaliação sem interromper seu raciocínio…");
  sessionPanel.setAttribute("aria-busy", "true");
  try {
    const transcript = state.turns.filter(turn => turn.role === "user").map(turn => turn.text).join("\n\n");
    if (transcript.length < 20) throw new Error("Explique um pouco mais antes de pedir a avaliação.");
    const data = await invoke("finish", transcript);
    const report = data.report || JSON.parse(data.answer || "{}");
    renderReport(report);
    await persistSession("completed", report);
    // A missão só avança com uma avaliação concluída e com o tema esperado.
    let guidedFeynmanCompleted = false;
    try {
      const active = JSON.parse(sessionStorage.getItem("luria:guided-study-active") || "null");
      const step = active?.plan?.steps?.[active.activeIndex];
      const expectedTopic = String(active?.plan?.topic || new URL(step?.href || "", location.origin).searchParams.get("topic") || "").trim();
      const sameDay = (active?.plan?.day || new Date(active?.plan?.createdAt).toLocaleDateString("sv-SE")) === new Date().toLocaleDateString("sv-SE");
      if (sameDay && String(step?.href || "").startsWith("/feynman/")
          && (!expectedTopic || normalize(expectedTopic) === normalize(state.topic))) {
        guidedFeynmanCompleted = !!window.LuriaGuidedStudy?.completeActiveStep?.("feynman-assessed");
      }
    } catch { /* Sessões avulsas não devem creditar missões diferentes. */ }
    sessionPanel.hidden = true; reportPanel.hidden = false;
    if (guidedFeynmanCompleted && !reportPanel.querySelector("[data-back-to-daily-study]")) {
      const link = document.createElement("a");
      link.href = "/sessao-estudo/";
      link.dataset.backToDailyStudy = "1";
      link.textContent = "Concluir missão do dia";
      link.className = "feynman-primary";
      reportPanel.querySelector(".feynman-report-actions")?.prepend(link);
    }
    reportPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    state.finished = false;
    status.textContent = error.message || "Não consegui gerar a avaliação agora.";
    startClock();
  } finally { sessionPanel.removeAttribute("aria-busy"); setBusy(false); }
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { status.textContent = "O reconhecimento de voz não está disponível neste navegador."; return; }
  speechSynthesis?.cancel?.();
  recognition?.abort?.();
  recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 5;
  let finalResult = null;
  recognition.onstart = () => { voiceButton.setAttribute("aria-pressed", "true"); voiceButton.textContent = "■ Parar"; status.textContent = "Estou ouvindo. Explique com calma."; };
  recognition.onresult = event => {
    const result = event.results[event.results.length - 1];
    const chosen = contextualTranscript(result);
    explanation.value = chosen.text;
    if (result.isFinal) finalResult = chosen;
  };
  recognition.onerror = event => { if (event.error !== "aborted") status.textContent = "Não entendi bem. Tente falar novamente ou digite."; };
  recognition.onend = () => {
    voiceButton.setAttribute("aria-pressed", "false"); voiceButton.textContent = "🎙 Falar";
    if (!finalResult?.text) return;
    pendingTranscript = finalResult.text;
    pendingConfidence = Number.isFinite(finalResult.confidence) ? finalResult.confidence : null;
    if (pendingConfidence !== null && pendingConfidence < .65) {
      confirmCopy.textContent = `Entendi “${pendingTranscript}”. Foi isso mesmo?`;
      confirmBox.hidden = false;
      status.textContent = "Confirme a transcrição antes de eu analisar.";
    } else status.textContent = "Transcrição pronta. Revise e envie quando quiser.";
  };
  recognition.start();
}

voiceButton.addEventListener("click", () => voiceButton.getAttribute("aria-pressed") === "true" ? recognition?.stop?.() : startVoice());
confirmYes.addEventListener("click", () => { confirmBox.hidden = true; explanation.value = pendingTranscript; explanation.focus(); status.textContent = "Confirmado. Envie quando terminar a explicação."; });
confirmAgain.addEventListener("click", () => { confirmBox.hidden = true; explanation.value = ""; pendingConfidence = null; startVoice(); });
startButton.addEventListener("click", startSession);
form.addEventListener("submit", sendExplanation);
finishButton.addEventListener("click", finishSession);
restartButton.addEventListener("click", () => { reportPanel.hidden = true; setup.hidden = false; topicInput.focus(); });
window.addEventListener("beforeunload", () => { clearInterval(clockHandle); recognition?.abort?.(); });
