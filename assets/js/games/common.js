/* Only the game pages load this namespace. No database writes or global shell changes. */
(() => {
  "use strict";
  const root = document.querySelector("[data-game]");
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const shuffle = (values) => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const specialties = [
    "Misto",
    "Clínica Médica",
    "Cirurgia",
    "Pediatria",
    "Ginecologia e Obstetrícia",
    "Medicina Preventiva",
  ];
  const levels = ["Básico", "Intermediário", "Avançado"];
  const select = (name, label, options) =>
    `<label class="g-field">${esc(label)}<select name="${name}">${options.map((v, i) => `<option value="${esc(v.value ?? v)}"${i === 0 ? " selected" : ""}>${esc(v.label ?? v)}</option>`).join("")}</select></label>`;
  const filters = () =>
    select("specialty", "Especialidade", specialties) +
    select(
      "level",
      "Dificuldade",
      levels.map((label, i) => ({ label, value: i + 1 })),
    );
  const refs = (ids) =>
    `<div class="g-refs">Fontes: ${(ids || [])
      .map((id) => {
        const ref = window.LuriaGameContent.sources[id];
        return ref
          ? `<a href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${esc(ref.title)}</a>`
          : "";
      })
      .join(" · ")}</div>`;
  const button = (action, text, secondary = false) =>
    `<button type="button" class="g-button${secondary ? " g-secondary" : ""}" data-action="${action}">${text}</button>`;
  const metric = (value, label) =>
    `<div class="g-metric"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;
  const note =
    '<p class="g-note">Acervo inicial educativo, com curadoria separada da mecânica. Não substitui protocolos assistenciais. Recordes pessoais ficam nesta conta e neste dispositivo, sem sincronização.</p>';
  const storeKey = "luria:games:v1";
  function read() {
    try {
      const value = JSON.parse(
        window.LuriaLocalOwnerStore?.read(storeKey) || "{}",
      );
      return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};
    } catch {
      return {};
    }
  }
  function record(game, mode, result) {
    const owned = window.LuriaLocalOwnerStore;
    if (!owned?.ownerId) return { saved: false, best: false };
    const data = read(),
      key = game + ":" + mode,
      old = data[key] || {};
    const previous = Number.isFinite(old.score) ? old.score : 0;
    const next = {
      score: Math.max(previous, result.score),
      combo: Math.max(Number(old.combo) || 0, result.combo || 0),
      played: (Number(old.played) || 0) + 1,
    };
    data[key] = next;
    try {
      return {
        saved: owned.write(storeKey, JSON.stringify(data)),
        best: result.score > previous,
      };
    } catch {
      return { saved: false, best: false };
    }
  }
  const best = (game, mode) =>
    read()[game + ":" + mode] || { score: 0, combo: 0 };
  function orderedList(items, order, locked = false, markers = []) {
    return `<ol class="g-sort" aria-label="Condutas em ordem">${order.map((id, i) => `<li data-id="${id}" class="${markers[i] === true ? "g-correct" : markers[i] === false ? "g-wrong" : ""}"><span class="g-position">${i + 1}</span><span class="g-step">${esc(items[id])}</span><span class="g-move"><button type="button" data-drag="${i}" aria-label="Arrastar etapa ${i + 1}"${locked ? " disabled" : ""}>⠿</button><button type="button" data-move="${i}" data-dir="-1" aria-label="Mover etapa ${i + 1} para cima"${locked || i === 0 ? " disabled" : ""}>↑</button><button type="button" data-move="${i}" data-dir="1" aria-label="Mover etapa ${i + 1} para baixo"${locked || i === order.length - 1 ? " disabled" : ""}>↓</button></span></li>`).join("")}</ol>`;
  }
  function bindSort(host, order, changed) {
    const move = (from, to) => {
      if (from === to || to < 0 || to >= order.length) return;
      const [item] = order.splice(from, 1);
      order.splice(to, 0, item);
      changed(to);
    };
    host
      .querySelectorAll("[data-move]")
      .forEach((b) =>
        b.addEventListener("click", () =>
          move(+b.dataset.move, +b.dataset.move + +b.dataset.dir),
        ),
      );
    host.querySelectorAll("[data-drag]").forEach((handle) => {
      handle.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          move(
            +handle.dataset.drag,
            +handle.dataset.drag + (event.key === "ArrowUp" ? -1 : 1),
          );
        }
      });
      handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        const from = +handle.dataset.drag;
        let to = from;
        handle.setPointerCapture(event.pointerId);
        handle.closest("li").classList.add("g-dragging");
        const onMove = (e) => {
          const row = document
            .elementFromPoint(e.clientX, e.clientY)
            ?.closest(".g-sort li");
          host
            .querySelectorAll(".g-drop")
            .forEach((el) => el.classList.remove("g-drop"));
          if (row && host.contains(row)) {
            to = [...row.parentNode.children].indexOf(row);
            row.classList.add("g-drop");
          }
        };
        const done = (e) => {
          handle.removeEventListener("pointermove", onMove);
          handle.removeEventListener("pointerup", done);
          handle.removeEventListener("pointercancel", cancel);
          host
            .querySelectorAll(".g-drop,.g-dragging")
            .forEach((el) => el.classList.remove("g-drop", "g-dragging"));
          if (e.type !== "pointercancel") move(from, to);
        };
        const cancel = (e) => done(e);
        handle.addEventListener("pointermove", onMove);
        handle.addEventListener("pointerup", done);
        handle.addEventListener("pointercancel", cancel);
      });
    });
  }
  function focusTitle() {
    const title = root?.querySelector("h2");
    if (title) {
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
      // Starting from a mobile form must reveal the new case, not retain its old scroll.
      root.scrollIntoView({ block: "start" });
    }
  }
  function empty(back) {
    root.innerHTML = `<section class="g-panel g-empty"><h2>Sem desafios neste recorte</h2><p>Escolha outra especialidade ou dificuldade. O acervo inicial está em expansão.</p>${button(back, "Alterar seleção")}</section>`;
  }
  function boot(start) {
    let started = false;
    const ready = () => {
      if (
        !started &&
        document.body.classList.contains("app-ready") &&
        window.docmapUser?.id
      ) {
        started = true;
        start();
      }
    };
    window.addEventListener("docmap:ready", ready);
    ready();
  }
  window.LuriaGames = Object.freeze({
    root,
    esc,
    shuffle,
    specialties,
    levels,
    select,
    filters,
    refs,
    button,
    metric,
    note,
    record,
    best,
    orderedList,
    bindSort,
    focusTitle,
    empty,
    boot,
  });
})();
