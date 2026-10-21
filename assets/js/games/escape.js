(() => {
  "use strict";
  const G = window.LuriaGames,
    C = window.LuriaGameContent,
    root = G.root;
  if (root?.dataset.game !== "escape") return;
  let run = null;
  const top = () =>
    '<div class="g-top"><a class="g-back luria-back-button" href="/jogos/">← Central de jogos</a><span class="g-edition">03 / Uma aventura de cuidado</span></div>';
  const illustration =
    '<div class="g-hero-art e-illustration" aria-hidden="true"><svg viewBox="0 0 420 300"><defs><linearGradient id="e-wall" x2="0" y2="1"><stop stop-color="#6f90c2"/><stop offset="1" stop-color="#334e80"/></linearGradient></defs><ellipse cx="210" cy="254" rx="185" ry="24" fill="#0b1c3d" opacity=".15"/><path d="m40 110 166-70 173 76-169 78Z" fill="#e5ecfa"/><path d="m40 110 170 84v68L40 178Z" fill="#718bb6"/><path d="m210 194 169-78v68l-169 78Z" fill="url(#e-wall)"/><path d="m68 108 138-54 143 62-140 61Z" fill="#bacbe8"/><path d="m130 81 80 34 76-30M210 115v63" fill="none" stroke="#fff" stroke-width="6"/><path d="m51 146 150 73m20 0 145-66" stroke="#a1badc" stroke-width="5"/><path d="m243 201 33-15v50l-33 16z" fill="#203c67"/><path d="m302 174 36-16v27l-36 17z" fill="#ade4e6"/><path d="m79 150 40 20v25l-40-20z" fill="#c7e9f2"/><path d="m158 190 25 13v31l-25-13z" fill="#d7e3f5"/><path d="m311 194 13-6v17l-13 6zm-6 8 25-12v6l-25 12z" fill="#fff"/><g transform="translate(210 158)"><ellipse cy="22" rx="16" ry="7" fill="#184888" opacity=".2"/><path d="m-10 4 20 0 3 21h-26z" fill="#fff"/><circle cy="-4" r="9" fill="#dba27d"/><path d="M-9-7q1-12 16-5l3 9-7-6-12 4" fill="#304264"/><path d="M-5 25v10m10-10v10" stroke="#304264" stroke-width="5"/><path d="M-4 6v8h8V6" fill="none" stroke="#368d95" stroke-width="2"/></g></svg><span class="e-hospital-label">HOSPITAL AURORA · 18H → 06H</span></div>';
  function setup() {
    run = null;
    root.innerHTML =
      top() +
      `<section class="g-hero e-hero"><div><span class="g-kicker">Escapando do Plantão</span><h2>O turno termina.<br>O cuidado continua.</h2><p class="g-lead">Atravesse um hospital de histórias conectadas. Observe, decida e resolva as pendências antes de entregar o plantão.</p><div class="g-tags"><span>3 capítulos</span><span>9 cenas interativas</span><span>No seu ritmo · cerca de 5–10 min</span></div></div>${illustration}</section><section class="g-panel e-intro"><div><h3>Seu crachá está pronto.</h3><p class="g-subtle">Escolhas clínicas, achados relevantes e pequenas sequências. Erros geram orientação e uma nova tentativa, sem vidas limitadas.</p></div>${G.button("start", "Entrar no plantão →")}</section><div class="g-metrics">${G.metric("01", "A chegada")}${G.metric("02", "A rotina complica")}${G.metric("03", "Encerrando o plantão")}</div>${G.note}`;
    root.querySelector("button").onclick = start;
  }
  function start() {
    if (!C.adventure.length) {
      G.empty("setup");
      root.querySelector("button").onclick = setup;
      return;
    }
    run = { index: 0, log: [], started: Date.now(), journal: false };
    newScene();
  }
  function newScene() {
    const scene = C.adventure[run.index];
    run.current = {
      scene,
      selected: new Set(),
      order: scene.steps ? G.shuffle(scene.steps.map((_, i) => i)) : [],
      attempts: 0,
      solved: false,
      ready: false,
      message: null,
    };
    if (scene.steps && run.current.order.every((v, i) => v === i))
      run.current.order.push(run.current.order.shift());
    render();
    G.focusTitle();
  }
  function map() {
    const current = run.current.scene;
    return `<aside class="e-map g-panel"><div class="e-map-title"><span class="e-beacon"></span><span>Hospital Aurora</span><small>Planta do turno</small></div><div class="e-floor" aria-label="Salas do hospital">${C.adventure.map((s, i) => `<button type="button" class="e-room ${i === run.index ? "e-room-current" : i < run.index ? "e-room-done" : "e-room-locked"}" data-room="${i}" ${i > run.index ? "disabled" : ""} aria-label="${G.esc(s.room)} · ${i < run.index ? "concluída" : i === run.index ? "sala atual" : "bloqueada"}" ${i === run.index ? 'aria-current="step"' : ""}><span class="e-room-icon" aria-hidden="true">${i < run.index ? "✓" : i === run.index ? "●" : "◇"}</span><span>${G.esc(s.room)}</span><small>${i < run.index ? "Resolvida" : i === run.index ? "Você está aqui" : "A desbloquear"}</small></button>`).join("")}</div><p class="g-subtle">Capítulo ${current.chapter + 1} de 3</p><h3>${G.esc(C.chapters[current.chapter])}</h3><div class="g-progress"><span style="width:${(run.index / C.adventure.length) * 100}%"></span></div><p class="g-note">Toque em uma sala concluída para consultar seu diário.</p>${G.button("journal", "Abrir diário do turno", true)}</aside>`;
  }
  function journey(x) {
    const from = x.scene.room;
    const nextScene = C.adventure[run.index + 1];
    const to = nextScene?.room || "Fim do plantão";
    const contact = nextScene
      ? ["identity", "dengue", "glucose", "recheck", "ending"].includes(nextScene.id)
        ? "Paciente"
        : "Profissional"
      : "";
    const companion = contact
      ? `<div class="e-journey-contact" aria-label="${contact}"><span class="e-contact-head"></span><span class="e-contact-body ${contact === "Profissional" ? "e-contact-coat" : ""}"></span><small>${contact}</small></div>`
      : "";
    const doctor = `<svg viewBox="0 0 64 100" focusable="false"><ellipse cx="32" cy="95" rx="20" ry="4" fill="#18304d" opacity=".25"/><g class="e-doctor-leg e-doctor-leg-back"><path d="M35 66 40 88" stroke="#304b68" stroke-width="7" stroke-linecap="round"/><path d="M38 88h10" stroke="#304b68" stroke-width="5" stroke-linecap="round"/></g><g class="e-doctor-leg e-doctor-leg-front"><path d="M28 66 24 88" stroke="#304b68" stroke-width="7" stroke-linecap="round"/><path d="M22 88h10" stroke="#304b68" stroke-width="5" stroke-linecap="round"/></g><g class="e-doctor-arm e-doctor-arm-back"><path d="m42 40 9 16" stroke="#9bb7c8" stroke-width="12" stroke-linecap="round"/><path d="m42 40 9 16" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="52" cy="59" r="4" fill="#d6a17f"/></g><g class="e-doctor-arm e-doctor-arm-front"><path d="m22 40-9 16" stroke="#9bb7c8" stroke-width="12" stroke-linecap="round"/><path d="m22 40-9 16" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="12" cy="59" r="4" fill="#d6a17f"/></g><path d="M24 35h16l6 33q-14 9-28 0z" fill="#388e9d"/><path d="M24 35 18 40l-3 31q7 5 17 1V51z" fill="#fff" stroke="#9bb7c8" stroke-width="1.5"/><path d="M40 35 46 40l3 31q-7 5-17 1V51z" fill="#fff" stroke="#9bb7c8" stroke-width="1.5"/><path d="m24 35 8 16-8-5-2 8m18-19-8 16 8-5 2 8" fill="#e8f3f7" stroke="#9bb7c8" stroke-width="1.2"/><path d="M32 51v20" stroke="#9bb7c8" stroke-width="1.4"/><path d="M20 59h6m12 0h6" stroke="#9bb7c8" stroke-width="1.3"/><rect x="37" y="48" width="7" height="5" rx="1" fill="#5cb3c2"/><circle cx="32" cy="23" r="12" fill="#d6a17f"/><path d="M20 21q0-17 17-16 11 2 9 17l-7-10-18 8" fill="#344862"/><path d="M27 48q-5 10 5 10 10 0 5-10" fill="none" stroke="#305e70" stroke-width="2"/><circle cx="32" cy="57" r="3" fill="#305e70"/></svg>`;
    const moving = x.solved;
    return `<div class="e-journey ${moving ? "e-journey-running" : ""}" role="group" aria-label="Médico no corredor do hospital"><div class="e-journey-wall" aria-hidden="true"><span class="e-journey-window"></span><span class="e-journey-window"></span><span class="e-journey-window"></span></div><div class="e-journey-sign e-journey-from">${G.esc(from)}</div><div class="e-journey-sign e-journey-to">${G.esc(to)}</div><div class="e-journey-route" aria-hidden="true"></div><div class="e-journey-doctor" aria-hidden="true">${doctor}</div>${companion}<div class="e-journey-floor" aria-hidden="true"></div><p class="e-journey-status" aria-live="polite">${moving ? `Pendência resolvida. O médico corre de ${G.esc(from)} para ${G.esc(to)}.` : `Médico em ${G.esc(from)}. Resolva a pendência para avançar.`}</p></div>`;
  }
  function interaction(x) {
    const s = x.scene;
    if (s.type === "sort")
      return `<div id="e-order">${G.orderedList(s.steps, x.order, x.solved)}</div>`;
    return `<div class="e-decisions" role="group" aria-label="${s.type === "select" ? "Selecionar achados" : "Escolher conduta"}">${s.options.map((o, i) => `<button type="button" class="e-decision ${x.selected.has(i) ? "g-selected" : ""}" data-option="${i}" aria-pressed="${x.selected.has(i)}" ${x.solved ? "disabled" : ""}><span class="e-decision-symbol" aria-hidden="true">${s.type === "select" ? (x.selected.has(i) ? "✓" : "+") : "↗"}</span><span>${G.esc(o)}</span></button>`).join("")}</div>`;
  }
  function render() {
    if (!run) return;
    const x = run.current,
      s = x.scene;
    root.innerHTML =
      top() +
      `<nav class="e-chapters" aria-label="Capítulos">${C.chapters.map((ch, i) => `<span class="${i === s.chapter ? "e-chapter-active" : ""}" ${i === s.chapter ? 'aria-current="step"' : ""}><b>0${i + 1}</b>${G.esc(ch)}</span>`).join("")}</nav><div class="e-layout">${map()}<section class="g-panel e-story"><span class="g-kicker">${G.esc(s.room)} · Cena ${run.index + 1}/${C.adventure.length}</span><h2>${G.esc(s.title)}</h2><div class="e-narrative"><span class="e-narrator" aria-hidden="true">✦</span><p>${G.esc(s.story)}</p></div><h3>${G.esc(s.prompt)}</h3>${interaction(x)}${journey(x)}${x.message ? `<div class="g-feedback ${x.solved ? "g-correct g-anim-correct" : "g-wrong g-anim-wrong"}" role="status"><strong>${x.solved ? "✓ Pendência resolvida" : "↻ Reavalie sua decisão"}</strong>${G.esc(x.message)}${x.solved ? G.refs(s.refs) : ""}</div>` : '<p class="g-note">Leia os dados antes de decidir. A seleção só é enviada ao confirmar.</p>'}<div class="g-actions">${G.button(x.solved ? "next" : "confirm", x.solved ? (x.ready ? (run.index === C.adventure.length - 1 ? "Encerrar o plantão →" : "Seguir para a próxima sala →") : "Médico a caminho…") : "Confirmar decisão")}${G.button("restart", "Novo plantão", true)}</div></section></div>${run.journal ? journal() : ""}${G.note}`;
    const nextButton = root.querySelector('[data-action="next"]');
    if (nextButton && !x.ready) nextButton.disabled = true;
    root.querySelectorAll("[data-option]").forEach(
      (b) =>
        (b.onclick = () => {
          if (x.solved) return;
          const i = +b.dataset.option;
          if (s.type === "choice") {
            x.selected.clear();
            x.selected.add(i);
          } else if (x.selected.has(i)) x.selected.delete(i);
          else x.selected.add(i);
          x.message = null;
          render();
          root.querySelector(`[data-option="${i}"]`)?.focus();
        }),
    );
    if (s.type === "sort" && !x.solved)
      G.bindSort(root.querySelector("#e-order"), x.order, (to) => {
        x.message = null;
        render();
        root.querySelector(`[data-drag="${to}"]`)?.focus();
      });
    root
      .querySelector('[data-action="confirm"]')
      ?.addEventListener("click", confirm);
    root
      .querySelector('[data-action="next"]')
      ?.addEventListener("click", () => {
        if (!run || run.current !== x || !x.solved || !x.ready) return;
        run.index++;
        if (run.index === C.adventure.length) finish();
        else newScene();
      });
    root.querySelector('[data-action="restart"]').onclick = setup;
    root.querySelector('[data-action="journal"]').onclick = () => {
      run.journal = !run.journal;
      render();
      root.querySelector("#e-journal")?.scrollIntoView({ block: "nearest" });
    };
    root.querySelectorAll("[data-room]").forEach(
      (b) =>
        (b.onclick = () => {
          if (+b.dataset.room < run.index) {
            run.journal = true;
            render();
            root
              .querySelector("#e-journal")
              ?.scrollIntoView({ block: "nearest" });
          } else root.querySelector(".e-story h2")?.focus();
        }),
    );
  }
  function confirm() {
    if (!run || run.current.solved) return;
    const x = run.current,
      s = x.scene;
    if (s.type !== "sort" && !x.selected.size) {
      x.message = "Escolha uma resposta antes de confirmar.";
      render();
      return;
    }
    x.attempts++;
    const good =
      s.type === "sort"
        ? s.variants.some((v) => v.every((id, i) => id === x.order[i]))
        : s.type === "select"
          ? x.selected.size === s.answers.length &&
            s.answers.every((i) => x.selected.has(i))
          : x.selected.has(s.answer);
    if (good) {
      x.solved = true;
      x.ready = !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      x.message = s.explanation;
      run.log.push({
        id: s.id,
        attempts: x.attempts,
        firstTry: x.attempts === 1,
      });
    } else {
      x.message =
        x.attempts >= 2
          ? s.explanation
          : "Releia o contexto e procure o risco que modifica a decisão. Esta pendência continua aberta; tente novamente.";
    }
    render();
    if (good && !x.ready)
      window.setTimeout(() => {
        if (!run || run.current !== x) return;
        x.ready = true;
        const button = root.querySelector('[data-action="next"]');
        if (button) {
          button.disabled = false;
          button.textContent = run.index === C.adventure.length - 1
            ? "Encerrar o plantão →"
            : "Seguir para a próxima sala →";
        }
      }, 2200);
    root.querySelector(good ? ".e-journey" : '[role="status"]')?.scrollIntoView({ block: good ? "center" : "nearest" });
  }
  function journal() {
    return `<section class="g-panel g-review" id="e-journal"><h3>Diário do turno</h3>${
      run.log
        .map((item) => {
          const s = C.adventure.find((v) => v.id === item.id);
          return `<details><summary>✓ ${G.esc(s.room)} · ${item.attempts} tentativa${item.attempts > 1 ? "s" : ""}</summary><p>${G.esc(s.explanation)}</p>${G.refs(s.refs)}</details>`;
        })
        .join("") ||
      '<p class="g-subtle">Seus aprendizados aparecerão aqui após resolver a primeira cena.</p>'
    }</section>`;
  }
  function finish() {
    const done = run;
    const correct = done.log.filter((x) => x.firstTry).length;
    const points = done.log.reduce(
      (n, x) => n + Math.max(25, 150 - (x.attempts - 1) * 35),
      0,
    );
    const record = G.record("escape", "story-v1", { score: points });
    const minutes = Math.max(
      1,
      Math.round((Date.now() - done.started) / 60000),
    );
    root.innerHTML =
      top() +
      `<section class="g-panel"><div class="g-result-head"><div class="g-medal" aria-hidden="true">☀</div><div><span class="g-kicker">06h · Turno entregue</span><h2>Você chegou ao fim.<br>Com histórias para levar.</h2></div></div><div class="g-metrics">${G.metric("3/3", "Capítulos")}${G.metric(done.log.length + "/" + C.adventure.length, "Cenas concluídas")}${G.metric(correct + "/" + done.log.length, "Corretas na primeira tentativa")}${G.metric(Math.round((correct / done.log.length) * 100) + "%", "Precisão inicial")}${G.metric(points, "Pontos de aprendizagem")}${G.metric(minutes + " min", "Tempo de jornada")}</div><p class="g-note">150 pontos por cena, menos 35 por tentativa adicional, mínimo 25 ao resolver. A jornada só termina com todas as pendências resolvidas.</p><h3>Pontos de atenção e aprendizados</h3><div class="g-review">${done.log
        .map((item) => {
          const s = C.adventure.find((v) => v.id === item.id);
          return `<details><summary>${item.firstTry ? "✓" : "↻"} ${G.esc(s.room)} · ${item.firstTry ? "Decisão segura" : "Revisar este aprendizado"}</summary><p>${G.esc(s.explanation)}</p><p>${item.attempts} tentativa${item.attempts > 1 ? "s" : ""}</p>${G.refs(s.refs)}</details>`;
        })
        .join(
          "",
        )}</div><p class="g-note">${record.saved ? "Resultado salvo nesta conta e dispositivo." : "Não foi possível salvar o resultado neste dispositivo."}</p><div class="g-actions">${G.button("again", "Iniciar novo plantão")}<a class="g-button g-secondary" href="/jogos/">Voltar aos jogos</a></div></section>${G.note}`;
    run = null;
    root.querySelector("button").onclick = setup;
    G.focusTitle();
    window.dispatchEvent(
      new CustomEvent("luria:game-completed", {
        detail: { game: "escape", contentVersion: C.version, score: points },
      }),
    );
  }
  window.addEventListener("luria:owner-changed", setup);
  G.boot(setup);
})();
