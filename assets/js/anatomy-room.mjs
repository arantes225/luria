/* TRAUBE · Sala de Anatomia — abas (atlas, microscopia, desafio) e tela cheia. */
const tabs = [...document.querySelectorAll("[data-room-tab]")];
const panels = new Map([...document.querySelectorAll("[data-room-panel]")].map(p => [p.dataset.roomPanel, p]));
const started = new Set();

async function start(name) {
  if (started.has(name) || name === "atlas") return;
  started.add(name);
  const lab = await import("/aprender/anatomia/laboratorio/lab.mjs?v=2");
  if (name === "micro") lab.setupMicro();
  if (name === "quiz") lab.setupQuiz();
}

function select(name, focus = false) {
  tabs.forEach(tab => {
    const on = tab.dataset.roomTab === name;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    if (on && focus) tab.focus();
  });
  panels.forEach((panel, key) => { panel.hidden = key !== name; });
  document.querySelector("[data-room-fullscreen]").hidden = name !== "atlas";
  start(name);
  // Caminho completo: a página usa <base href="/">, que faria "#aba" apontar para a raiz.
  history.replaceState(null, "", location.pathname + (name === "atlas" ? "" : "#" + name));
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab.dataset.roomTab));
  tab.addEventListener("keydown", event => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    select(tabs[(i + step + tabs.length) % tabs.length].dataset.roomTab, true);
  });
});

document.querySelector("[data-room-fullscreen]")?.addEventListener("click", () => {
  const stage = panels.get("atlas");
  if (stage.requestFullscreen) stage.requestFullscreen().catch(() => { location.href = "/aprender/anatomia/atlas/"; });
  else location.href = "/aprender/anatomia/atlas/";
});

const initial = location.hash.slice(1);
select(panels.has(initial) ? initial : "atlas");
