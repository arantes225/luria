/* TRAUBE · Laboratório de anatomia: microscopia 3D + desafio de questões. */
import * as THREE from "/assets/vendor/three.module.min.mjs";
import { createMicroAnatomy } from "/aprender/anatomia/laboratorio/micro-scenes.mjs";

const TOPICS = [
  { key: "alveoli", title: "Troca gasosa no alvéolo", facts: [
    "O oxigênio e o gás carbônico atravessam a membrana respiratória seguindo seus gradientes de pressão parcial.",
    "Nos pulmões, o oxigênio passa do alvéolo para o sangue e o gás carbônico, do sangue para o alvéolo.",
    "A membrana fina e a enorme área de troca favorecem a difusão dos gases."],
    source: ["OpenStax A&P 2e · 22.4 Troca gasosa", "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange"] },
  { key: "nephron", title: "Néfron", facts: [
    "O corpúsculo renal é formado pelo glomérulo e pela cápsula glomerular; o filtrado chega primeiro ao espaço capsular.",
    "Os túbulos modificam o filtrado por reabsorção e secreção, recuperando água e solutos úteis.",
    "A barreira de filtração normal retém células do sangue e proteínas grandes."],
    source: ["OpenStax A&P 2e · 25.4 Anatomia microscópica do rim", "https://openstax.org/books/anatomy-and-physiology-2e/pages/25-4-microscopic-anatomy-of-the-kidney"] },
  { key: "sarcomere", title: "Contração do sarcômero", facts: [
    "Filamentos finos e grossos deslizam uns sobre os outros e aproximam as linhas Z; os filamentos não encurtam.",
    "O cálcio se liga à troponina e expõe os sítios de ligação da actina.",
    "Quando o ATP se liga à cabeça da miosina, a ponte cruzada se desfaz."],
    source: ["OpenStax A&P 2e · 10.3 Contração e relaxamento", "https://openstax.org/books/anatomy-and-physiology-2e/pages/10-3-muscle-fiber-contraction-and-relaxation"] },
  { key: "synapse", title: "Sinapse química", facts: [
    "Quando o potencial de ação chega ao terminal axônico, a entrada de cálcio promove a liberação do neurotransmissor.",
    "O neurotransmissor atravessa a fenda sináptica e se liga a receptores da membrana pós-sináptica.",
    "Recaptação e degradação enzimática removem o neurotransmissor e encerram o sinal."],
    source: ["OpenStax A&P 2e · 12.5 Comunicação entre neurônios", "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons"] },
  { key: "villi", title: "Vilosidade intestinal", facts: [
    "Pregas circulares, vilosidades e microvilosidades ampliam juntas a área de absorção do intestino delgado.",
    "Cada vilosidade tem uma rede de capilares sanguíneos e um lácteo central (capilar linfático).",
    "Monossacarídeos e aminoácidos vão para o sangue; a maior parte da gordura segue pelos lácteos."],
    source: ["OpenStax A&P 2e · 23.5 Intestinos delgado e grosso", "https://openstax.org/books/anatomy-and-physiology-2e/pages/23-5-the-small-and-large-intestines"] },
  { key: "vessel", title: "Parede do vaso", facts: [
    "Artérias e veias têm três túnicas: íntima, média e externa.",
    "O músculo liso da túnica média contrai ou relaxa e altera o calibre do vaso.",
    "O capilar tem praticamente só endotélio e membrana basal, ideal para as trocas."],
    source: ["OpenStax A&P 2e · 20.1 Estrutura e função dos vasos", "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-1-structure-and-function-of-blood-vessels"] },
];
const THEMES = { todos: "Todos", conceitos: "Termos e siglas", circulacao: "Circulação", esqueleto: "Esqueleto", articulacoes: "Articulações", musculos: "Músculos", microscopia: "Microscopia" };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

/* ---------------- Microscopia ---------------- */
export function setupMicro() {
  const host = $("[data-micro-stage]"), tabs = $("[data-micro-tabs]"), layer = $("[data-micro-labels]");
  if (!host) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch { host.classList.add("is-static"); $("[data-micro-fallback]").hidden = false; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute("aria-label", "Cena microscópica 3D. Arraste para girar e role para aproximar.");
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 1, 0.05, 50);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8899bb, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(2, 3, 4); scene.add(key);
  const pivot = new THREE.Group(); scene.add(pivot);
  let current = null, playing = !reduced, time = 0, last = performance.now(), dist = 3.2, rotX = -0.5, rotY = 0.6, visible = true;
  const resize = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / Math.max(1, h); camera.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(host); resize();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);
  // Arrastar gira; roda aproxima.
  let drag = null;
  renderer.domElement.addEventListener("pointerdown", e => { drag = [e.clientX, e.clientY]; renderer.domElement.setPointerCapture(e.pointerId); });
  renderer.domElement.addEventListener("pointermove", e => { if (!drag) return; rotY += (e.clientX - drag[0]) * 0.008; rotX = Math.max(-1.4, Math.min(1.4, rotX + (e.clientY - drag[1]) * 0.006)); drag = [e.clientX, e.clientY]; });
  addEventListener("pointerup", () => { drag = null; });
  renderer.domElement.addEventListener("wheel", e => { e.preventDefault(); dist = Math.max(1.4, Math.min(6, dist * (1 + Math.sign(e.deltaY) * 0.08))); }, { passive: false });
  const playBtn = $("[data-micro-play]");
  playBtn.addEventListener("click", () => { playing = !playing; playBtn.textContent = playing ? "Pausar" : "Animar"; playBtn.setAttribute("aria-pressed", String(playing)); });
  playBtn.textContent = playing ? "Pausar" : "Animar";
  function show(topic) {
    if (current) { pivot.remove(current.group); current.dispose(); }
    current = createMicroAnatomy(THREE, topic.key); pivot.add(current.group); time = 0;
    layer.replaceChildren(...current.labels.map(l => { const n = el("span", "micro-label", l.text); n._p = new THREE.Vector3(...l.position); return n; }));
    $("[data-micro-title]").textContent = topic.title;
    $("[data-micro-facts]").replaceChildren(...topic.facts.map(f => el("li", "", f)));
    const a = $("[data-micro-source]"); a.textContent = topic.source[0]; a.href = topic.source[1];
    tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.key === topic.key)));
  }
  TOPICS.forEach(t => { const b = el("button", "micro-tab", t.title); b.type = "button"; b.dataset.key = t.key; b.addEventListener("click", () => show(t)); tabs.append(b); });
  show(TOPICS[0]);
  const v = new THREE.Vector3();
  (function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    if (playing) time += dt;
    current?.tick(time);
    pivot.rotation.set(rotX, rotY, 0);
    camera.position.set(0, 0, dist); camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    const w = host.clientWidth, h = host.clientHeight;
    for (const n of layer.children) { v.copy(n._p).applyMatrix4(pivot.matrixWorld).project(camera); n.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px)`; n.hidden = v.z > 1; }
  })(performance.now());
}

/* ---------------- Desafio ---------------- */
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export async function setupQuiz() {
  const root = $("[data-quiz-root]"); if (!root) return;
  let bank = [];
  try { bank = (await (await fetch("/aprender/anatomia/laboratorio/questoes-pt.json")).json()).questoes; }
  catch { root.replaceChildren(el("p", "lab-muted", "Não foi possível carregar as questões. Recarregue a página.")); return; }
  const chips = $("[data-quiz-themes]"); let theme = "todos";
  Object.entries(THEMES).forEach(([id, label]) => {
    const n = id === "todos" ? bank.length : bank.filter(q => q.t === id).length;
    const b = el("button", "lab-chip", `${label} · ${n}`); b.type = "button"; b.dataset.theme = id; b.setAttribute("aria-pressed", String(id === theme));
    b.addEventListener("click", () => { theme = id; chips.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); start(); });
    chips.append(b);
  });
  let round = [], idx = 0, score = 0;
  function start() { const pool = theme === "todos" ? bank : bank.filter(q => q.t === theme); round = shuffle(pool).slice(0, 5); idx = 0; score = 0; render(); }
  function render() {
    if (idx >= round.length) {
      root.replaceChildren(el("p", "quiz-kicker", "Rodada concluída"), el("h3", "quiz-q", `Você acertou ${score} de ${round.length}`));
      const again = el("button", "lab-primary", "Nova rodada"); again.type = "button"; again.addEventListener("click", start); root.append(again); again.focus(); return;
    }
    const q = round[idx];
    const head = el("div", "quiz-head"); head.append(el("span", "quiz-kicker", `${THEMES[q.t]} · questão ${idx + 1}/${round.length}`), el("span", "quiz-score", `${score} acerto${score === 1 ? "" : "s"}`));
    const body = el("div", "quiz-body"); const fb = el("div", "quiz-feedback"); fb.setAttribute("role", "status");
    const next = el("button", "lab-primary", idx === round.length - 1 ? "Ver resultado" : "Próxima"); next.type = "button"; next.hidden = true;
    next.addEventListener("click", () => { idx++; render(); });
    const finish = (ok, extra) => { if (ok) score++; fb.className = "quiz-feedback " + (ok ? "is-ok" : "is-bad"); fb.textContent = (ok ? "Correto. " : "Não é isso. ") + (extra || q.why || ""); next.hidden = false; next.focus(); head.lastChild.textContent = `${score} acerto${score === 1 ? "" : "s"}`; };
    if (q.type === "match") {
      body.append(el("p", "quiz-q", q.q));
      const rights = shuffle(q.pairs.map(p => p[1])); const selects = [];
      q.pairs.forEach(([left], i) => { const row = el("label", "quiz-match"); row.append(el("span", "", left)); const s = el("select"); s.append(new Option("Escolha…", "")); rights.forEach(r => s.append(new Option(r, r))); selects.push(s); row.append(s); body.append(row); });
      const check = el("button", "lab-primary", "Conferir"); check.type = "button";
      check.addEventListener("click", () => { let all = true; selects.forEach((s, i) => { const ok = s.value === q.pairs[i][1]; s.classList.toggle("is-bad", !ok); s.classList.toggle("is-ok", ok); if (!ok) all = false; s.disabled = true; }); check.hidden = true; finish(all, all ? "" : "Correto: " + q.pairs.map(p => `${p[0]} → ${p[1]}`).join("; ") + "."); });
      body.append(check);
    } else {
      body.append(el("p", "quiz-q", q.q));
      const opts = q.type === "tf" ? ["Verdadeiro", "Falso"] : q.o;
      const list = el("div", "quiz-options");
      opts.forEach((o, i) => { const b = el("button", "quiz-option", o); b.type = "button"; b.addEventListener("click", () => {
        list.querySelectorAll("button").forEach((x, j) => { x.disabled = true; if (j === q.a) x.classList.add("is-ok"); });
        if (i !== q.a) b.classList.add("is-bad");
        finish(i === q.a, i === q.a ? q.why : (q.why || `Resposta: ${opts[q.a]}.`));
      }); list.append(b); });
      body.append(list);
      if (q.hint) { const h = el("details", "quiz-hint"); h.append(el("summary", "", "Dica"), el("p", "", q.hint)); body.append(h); }
    }
    root.replaceChildren(head, body, fb, next);
  }
  start();
}

