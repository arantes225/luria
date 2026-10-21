(() => {
  "use strict";
  const G = window.LuriaGames,
    C = window.LuriaGameContent,
    root = G.root;
  if (root?.dataset.game !== "relampago") return;
  const scoring = Object.freeze({
    base: 100,
    speed: 50,
    speedWindow: 12000,
    combo3: 1.25,
    combo5: 1.5,
    feedback: 1500,
  });
  let timer = null,
    next = null,
    run = null,
    selection = { specialty: "Misto", level: "1", duration: "90" };
  const mode = () =>
    [selection.specialty, selection.level, selection.duration].join("|");
  const top = () =>
    '<div class="g-top"><a class="g-back luria-back-button" href="/jogos/">← Central de jogos</a><span class="g-edition">01 / Agilidade clínica</span></div>';
  const art =
    '<div class="g-hero-art r-art" aria-hidden="true"><div class="r-orbit"><span class="r-orbit-label">FOCO · PRECISÃO · RITMO</span><svg viewBox="0 0 120 120"><path d="M68 8 27 65h29l-5 47 42-62H64z" fill="currentColor"/></svg><span class="r-seconds">90<span>segundos para desafiar seu raciocínio</span></span></div><span class="r-chip r-chip-one">+ rapidez</span><span class="r-chip r-chip-two">× combo</span></div>';
  function stop() {
    clearInterval(timer);
    clearTimeout(next);
    timer = next = null;
  }
  function setup() {
    stop();
    run = null;
    root.innerHTML =
      top() +
      `<section class="g-hero"><div><span class="g-kicker">Plantão Relâmpago</span><h2>Uma decisão.<br>O relógio corre.</h2><p class="g-lead">Reconheça o essencial, responda e encontre seu ritmo. Precisão vem antes da pressa.</p><div class="g-tags"><span>4 alternativas</span><span>Combo de acertos</span><span>Revisão comentada</span></div></div>${art}</section><form class="g-panel g-setup">${G.filters()}${G.select(
        "duration",
        "Tempo de partida",
        [
          { value: 90, label: "90 segundos" },
          { value: 60, label: "60 segundos" },
          { value: 120, label: "120 segundos" },
        ],
      )}<button class="g-button" type="submit">Iniciar plantão →</button></form><div id="r-records" class="g-metrics"></div>${G.note}<p class="g-note">Sem repetição de perguntas na partida. Se o recorte terminar antes do relógio, você verá o resultado do acervo respondido.</p>`;
    const form = root.querySelector("form");
    Object.entries(selection).forEach(
      ([key, value]) => (form.elements[key].value = value),
    );
    function records() {
      selection = Object.fromEntries(new FormData(form));
      const b = G.best("relampago", mode());
      root.querySelector("#r-records").innerHTML =
        G.metric(b.score, "Recorde neste modo") +
        G.metric(b.combo, "Melhor sequência neste modo") +
        G.metric(
          C.questions.filter(
            (q) =>
              (selection.specialty === "Misto" ||
                q.specialty === selection.specialty) &&
              q.level === +selection.level,
          ).length,
          "Perguntas no recorte",
        );
    }
    form.addEventListener("change", records);
    records();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      records();
      start();
    });
  }
  function start() {
    stop();
    const pool = G.shuffle(
      C.questions.filter(
        (q) =>
          (selection.specialty === "Misto" ||
            q.specialty === selection.specialty) &&
          q.level === +selection.level,
      ),
    );
    if (!pool.length) {
      G.empty("setup");
      root.querySelector("button").onclick = setup;
      return;
    }
    run = {
      pool,
      index: 0,
      score: 0,
      combo: 0,
      maxCombo: 0,
      log: [],
      end: Date.now() + +selection.duration * 1000,
      locked: false,
    };
    question();
    timer = setInterval(tick, 100);
  }
  function question() {
    if (!run) return;
    const q = run.pool[run.index];
    run.locked = false;
    run.shown = Date.now();
    root.innerHTML =
      top() +
      `<section class="g-panel r-stage"><div class="g-hud"><span class="g-kicker">${G.esc(q.specialty)} · ${G.levels[q.level - 1]}</span><div class="g-hud-data"><span><strong id="r-score">${run.score}</strong> pts</span><span id="r-combo">${run.combo >= 3 ? "Combo ×" + (run.combo >= 5 ? scoring.combo5 : scoring.combo3) : "Sequência " + run.combo}</span><strong id="r-clock" role="timer" aria-label="Segundos restantes"></strong></div></div><div class="g-progress"><span id="r-time-bar"></span></div><p class="g-subtle">Pergunta ${run.index + 1} de ${run.pool.length} · Teclas 1–4 também respondem</p><h2 class="g-case">${G.esc(q.prompt)}</h2><div class="g-choices">${q.options.map((o, i) => `<button type="button" class="g-choice" data-answer="${i}"><span class="g-letter">${i + 1}</span><span>${G.esc(o)}</span></button>`).join("")}</div><div id="r-feedback" aria-live="polite"></div><div class="g-actions">${G.button("restart", "Reiniciar partida", true)}${G.button("finish", "Encerrar e revisar", true)}</div></section>`;
    root
      .querySelectorAll("[data-answer]")
      .forEach((b) =>
        b.addEventListener("click", () => answer(+b.dataset.answer)),
      );
    root.querySelector('[data-action="restart"]').onclick = setup;
    root.querySelector('[data-action="finish"]').onclick = () =>
      finish("Partida encerrada por você");
    G.focusTitle();
    tick();
  }
  function tick() {
    if (!run) return;
    const left = Math.max(0, run.end - Date.now());
    const clock = root.querySelector("#r-clock");
    if (clock) {
      clock.textContent = Math.ceil(left / 1000) + "s";
      root.querySelector("#r-time-bar").style.width =
        (left / (+selection.duration * 1000)) * 100 + "%";
      root
        .querySelector(".r-stage")
        .classList.toggle("r-urgent", left <= 10000);
    }
    if (left <= 0) finish("Tempo encerrado");
  }
  function answer(index) {
    if (!run || run.locked) return;
    if (Date.now() >= run.end) {
      finish("Tempo encerrado");
      return;
    }
    run.locked = true;
    const q = run.pool[run.index],
      elapsed = Date.now() - run.shown,
      good = index === q.answer;
    run.combo = good ? run.combo + 1 : 0;
    run.maxCombo = Math.max(run.maxCombo, run.combo);
    const multiplier =
      run.combo >= 5 ? scoring.combo5 : run.combo >= 3 ? scoring.combo3 : 1;
    const points = good
      ? Math.round(
          (scoring.base +
            scoring.speed * Math.max(0, 1 - elapsed / scoring.speedWindow)) *
            multiplier,
        )
      : 0;
    run.score += points;
    run.log.push({ q, selected: index, good, elapsed, points });
    root.querySelectorAll("[data-answer]").forEach((b) => {
      b.disabled = true;
      const i = +b.dataset.answer;
      b.classList.toggle("g-correct", i === q.answer);
      b.classList.toggle("g-wrong", i === index && !good);
    });
    root.querySelector("#r-score").textContent = run.score;
    root.querySelector("#r-combo").textContent =
      run.combo >= 3 ? "Combo ×" + multiplier : "Sequência " + run.combo;
    root.querySelector("#r-feedback").innerHTML =
      `<div class="g-feedback ${good ? "g-correct g-anim-correct" : "g-wrong g-anim-wrong"}"><strong>${good ? "✓ Correto · +" + points + " pontos" : "↻ Revise esta decisão · combo reiniciado"}</strong>${G.esc(q.explanation)}</div>`;
    next = setTimeout(() => {
      if (!run) return;
      run.index++;
      if (run.index >= run.pool.length)
        finish("Acervo deste recorte concluído");
      else question();
    }, scoring.feedback);
  }
  function finish(reason) {
    if (!run) return;
    stop();
    const done = run;
    run = null;
    const correct = done.log.filter((x) => x.good).length,
      total = done.log.length;
    const result = G.record("relampago", mode(), {
      score: done.score,
      combo: done.maxCombo,
    });
    const by = G.specialties
      .slice(1)
      .map((s) => {
        const rows = done.log.filter((x) => x.q.specialty === s);
        return rows.length >= 2
          ? G.metric(
              Math.round(
                (rows.filter((x) => x.good).length / rows.length) * 100,
              ) + "%",
              s + " · " + rows.length + " respostas",
            )
          : "";
      })
      .join("");
    root.innerHTML =
      top() +
      `<section class="g-panel"><div class="g-result-head"><div class="g-medal" aria-hidden="true">${result.best ? "✦" : "⚡"}</div><div><span class="g-kicker">${G.esc(reason)}</span><h2>${result.best ? "Novo recorde neste modo!" : "Plantão concluído"}</h2><p class="g-subtle">${result.saved ? "Resultado salvo apenas nesta conta e dispositivo." : "Não foi possível salvar o recorde. O resultado está disponível abaixo."}</p></div></div><div class="g-metrics">${G.metric(done.score, "Pontos")}${G.metric(total, "Respondidas")}${G.metric(correct, "Acertos")}${G.metric(total - correct, "Erros")}${G.metric(total ? Math.round((correct / total) * 100) + "%" : "—", "Precisão")}${G.metric(done.maxCombo, "Melhor sequência")}${G.metric(total ? (done.log.reduce((n, x) => n + x.elapsed, 0) / total / 1000).toFixed(1) + "s" : "—", "Tempo médio por resposta")}</div>${by ? '<h3 class="r-breakdown">Desempenho por especialidade</h3><div class="g-metrics">' + by + "</div>" : '<p class="g-note">O recorte por especialidade aparece a partir de duas respostas na área.</p>'}<div class="g-actions">${G.button("again", "Jogar novamente")}<a class="g-button g-secondary" href="/jogos/">Voltar aos jogos</a></div></section><section class="g-panel g-review"><h3>Revisão do plantão</h3>${done.log.map((x, i) => `<details><summary>${x.good ? "✓" : "↻"} ${i + 1}. ${G.esc(x.q.prompt)}</summary><p>Sua resposta: ${G.esc(x.q.options[x.selected])}</p><p><strong>Resposta: ${G.esc(x.q.options[x.q.answer])}</strong></p><p>${G.esc(x.q.explanation)}</p>${G.refs(x.q.refs)}</details>`).join("") || '<p class="g-subtle">Nenhuma resposta registrada nesta partida.</p>'}</section>${G.note}`;
    root.querySelector('[data-action="again"]').onclick = setup;
    G.focusTitle();
    window.dispatchEvent(
      new CustomEvent("luria:game-completed", {
        detail: {
          game: "relampago",
          contentVersion: C.version,
          score: done.score,
          answered: total,
        },
      }),
    );
  }
  document.addEventListener("keydown", (e) => {
    if (
      run &&
      !run.locked &&
      !e.repeat &&
      /^[1-4]$/.test(e.key) &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)
    )
      answer(+e.key - 1);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && run) tick();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) setup();
    else if (run) tick();
  });
  window.addEventListener("pagehide", () => {
    stop();
    run = null;
  });
  window.addEventListener("luria:owner-changed", () => {
    stop();
    run = null;
    setup();
  });
  G.boot(setup);
})();
