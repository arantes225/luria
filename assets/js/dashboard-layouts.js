(() => {
  const allowed = new Set(["1", "2", "3", "4"]);
  const page = document.querySelector('body[data-page="dashboard"] .page');
  if (!page) return;
  const root = document.createElement("div");
  root.id = "dashboard-alternative";
  root.setAttribute("aria-live", "off");
  page.querySelector(".dashboard-detail-grid")?.before(root);
  let current = "1";
  let selectedDate = new Date();
  let frame = 0;

  const escape = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const text = (id, fallback = "—") => document.getElementById(id)?.textContent?.trim() || fallback;
  const number = (value) => Number(String(value).match(/\d+/)?.[0] || 0);
  const dayISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const readableDate = (date) => new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(date);
  const shortDate = (value) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(`${value}T12:00:00`));
  const items = () => (typeof agendaState === "object" && Array.isArray(agendaState.items) ? agendaState.items : []);
  const upcoming = (limit = 4) => items().filter((item) => item.activity_date >= dayISO(new Date())).slice(0, limit);
  const metric = (id) => escape(text(id));
  const snap = () => {
    const [done, total] = text("metric-lessons-progress-copy", "0/0").split("/").map(number);
    const progress = total ? Math.round(done / total * 100) : 0;
    const today = window.luriaDashboardTodayLessons || { completed: 0, total: 0 };
    return {
      done, total, progress, today,
      streak: number(document.querySelector("#dashboard-streak-card [data-streak-value]")?.textContent || "0"),
      flashcards: number(text("metric-flashcards", "0")),
      errors: number(text("metric-errors", "0")),
      hours: text("metric-hours", "0h"),
      retention: text("metric-retention"),
      simulations: text("metric-simulations-accuracy"),
      ccq: text("dashboard-passive-ccq-text", "Seu Pulo do Gato aparecerá aqui."),
      ccqArea: text("dashboard-passive-ccq-meta", ""),
      areas: window.luriaDashboardAreaSummary || []
    };
  };

  function greeting() {
    let profile;
    try { profile = JSON.parse(localStorage.getItem(`docmap:profile:${window.docmapUser?.id}`) || "null"); } catch {}
    const name = (profile?.display_name || window.docmapUser?.user_metadata?.display_name || "").trim().split(/\s+/)[0];
    return `<header class="dl-greeting"><div><span class="dl-eyebrow">SEU PAINEL DE ESTUDOS</span><h2>Olá${name ? `, ${escape(name)}` : ""}!</h2><p>Vamos em frente hoje? Consistência é o que transforma.</p></div><time datetime="${dayISO(new Date())}">${escape(readableDate(new Date()))}</time></header>`;
  }

  function heading(icon, title, href = "") {
    return `<div class="dl-card-heading"><h3><span aria-hidden="true">${icon}</span> ${escape(title)}</h3>${href ? `<a href="${href}" aria-label="Ver ${escape(title)}">Ver mais ›</a>` : ""}</div>`;
  }

  function activity(item, action = true) {
    const label = typeof kindMeta === "function" ? kindMeta(item.kind).label : "Atividade";
    const href = typeof activityCanStart === "function" && activityCanStart(item)
      ? buildAmbientacaoUrl(item)
      : item.kind === "exam" || item.kind === "registration_deadline" ? "/editais/" : "/cronograma/";
    const area = item.area ? `<span class="dl-chip">${escape(item.area)}</span>` : "";
    return `<li class="dl-activity"><span class="dl-activity-date">${escape(shortDate(item.activity_date))}</span><span class="dl-activity-dot" aria-hidden="true"></span><div class="dl-activity-info"><strong>${escape(item.title || label)}</strong><small>${escape(label)} ${area}</small></div>${action ? `<a class="dl-start" href="${escape(href)}" aria-label="Abrir ${escape(item.title || label)}">▶ <span>Abrir</span></a>` : ""}</li>`;
  }

  function activityList(list, limit = 5) {
    return list.length ? `<ol class="dl-timeline">${list.slice(0, limit).map((item) => activity(item)).join("")}</ol>`
      : '<p class="dl-empty">Nenhuma atividade programada para este período.</p>';
  }

  function ring(percent, center, subtitle = "") {
    const p = Math.max(0, Math.min(100, Number(percent) || 0));
    return `<div class="dl-ring" style="--dl-progress:${p}%"><div><strong>${escape(center)}</strong><small>${escape(subtitle)}</small></div></div>`;
  }

  function streak(data) {
    const weekday = (new Date().getDay() + 6) % 7;
    return `<section class="dl-card dl-streak">${heading("🔥", "Ofensiva", "/estatisticas/")}<div class="dl-streak-value"><strong>${data.streak}</strong><span>dias seguidos</span></div><div class="dl-weekdays">${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => `<span class="${index <= weekday && data.streak > 0 ? "active" : ""}"><i></i>${day}</span>`).join("")}</div></section>`;
  }

  function areas(data) {
    const rows = data.areas.slice(0, 5);
    return `<section class="dl-card dl-areas">${heading("▥", "Progresso por área", "/estatisticas/")}${rows.length ? rows.map((entry) => {
      const percent = entry.total ? Math.round(entry.completed / entry.total * 100) : 0;
      return `<div class="dl-area-row"><span>${escape(entry.area)}</span><div class="dl-area-track"><i style="width:${percent}%"></i></div><strong>${percent}%</strong><small>${entry.completed}/${entry.total} aulas</small></div>`;
    }).join("") : '<p class="dl-empty">Adicione aulas ao cronograma para ver o progresso por área.</p>'}</section>`;
  }

  function cat(data, compact = false) {
    return `<section class="dl-card dl-cat ${compact ? "dl-cat-compact" : ""}">${heading("✦", "Pulo do Gato do dia")}<div class="dl-cat-content"><span class="dashboard-cat-symbol" role="img" aria-label="Pulo do Gato"><img class="cat-symbol-light" src="/assets/img/pulo%20do%20gato/luria_gato_tema_claro.webp?v=20260924d" alt=""><img class="cat-symbol-dark" src="/assets/img/pulo%20do%20gato/luria_gato_tema_escuro.webp?v=20260924d" alt=""><img class="cat-symbol-pink" src="/assets/img/pulo%20do%20gato/luria_gato_tema_rosa.webp?v=20260924d" alt=""></span><div><p>${escape(data.ccq)}</p>${data.ccqArea ? `<small>${escape(data.ccqArea)}</small>` : ""}</div></div></section>`;
  }

  function layout1(data) {
    const todayItems = items().filter((item) => item.activity_date === dayISO(selectedDate));
    const dayLessons = window.luriaDashboardDayLessons?.[dayISO(selectedDate)] || { completed: 0, total: 0 };
    const done = dayLessons.completed; const total = dayLessons.total;
    const pct = total ? Math.round(done / total * 100) : 0;
    return `<div class="dl-grid dl-layout-1"><section class="dl-card dl-agenda-large">${heading("▣", "Hoje · Agenda", "/cronograma/")}<div class="dl-day-nav"><button data-dl-day="-1" aria-label="Dia anterior">‹</button><span>${escape(readableDate(selectedDate))}</span><button data-dl-day="1" aria-label="Próximo dia">›</button></div>${activityList(todayItems, 10)}</section><div class="dl-side"><section class="dl-card dl-day-summary">${heading("☑", "Resumo do dia")}<div class="dl-summary-body">${ring(pct, `${pct}%`, "aulas concluídas")}<div><strong>${total} aula${total === 1 ? "" : "s"} hoje</strong><span>${done} concluída${done === 1 ? "" : "s"}</span><span>${todayItems.length} atividade${todayItems.length === 1 ? "" : "s"} na agenda</span></div></div></section>${streak(data)}</div>${areas(data)}${cat(data, true)}</div>`;
  }

  function layout2(data) {
    const reviewItems = items().filter((item) => /review|flashcards|errors/.test(item.kind) && item.activity_date >= dayISO(new Date()));
    return `<div class="dl-grid dl-layout-2"><section class="dl-card dl-progress">${heading("◎", "Seu progresso", "/estatisticas/")}${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Erros ativos <strong>${data.errors}</strong></span></div></section>${streak(data)}<section class="dl-card dl-upcoming">${heading("▣", "Próximas atividades", "/cronograma/")}${activityList(upcoming(3), 3)}</section><section class="dl-card dl-reviews">${heading("↻", "Revisões programadas", "/flashcards/")}${ring(0, String(reviewItems.length), "na agenda")}<a class="dl-primary" href="/flashcards/">Continuar revisando</a></section>${areas(data)}</div>`;
  }

  function layout3(data) {
    return `<div class="dl-grid dl-layout-3"><section class="dl-card dl-progress dl-overview">${heading("▣", "Resumo do plano", "/estatisticas/")}<div class="dl-overview-body">${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas concluídas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Caderno de erros <strong>${data.errors} ativos</strong></span><span>Horas estudadas <strong>${escape(data.hours)}</strong></span></div></div></section>${streak(data)}${cat(data)}<section class="dl-card dl-upcoming">${heading("▣", "Próximas atividades", "/cronograma/")}${activityList(upcoming(4), 4)}</section><section class="dl-card dl-performance">${heading("▥", "Meu desempenho", "/estatisticas/")}<div class="dl-performance-grid"><a href="/cronograma/"><span>▤</span><small>Aulas</small><strong>${data.done}</strong></a><a href="/questoes-simulados/"><span>▧</span><small>Simulados</small><strong>${escape(data.simulations)}</strong></a><a href="/flashcards/"><span>▣</span><small>Flashcards</small><strong>${data.flashcards}</strong></a><a href="/estatisticas/"><span>◎</span><small>Retenção</small><strong>${escape(data.retention)}</strong></a></div>${areas(data)}</section><section class="dl-card dl-shortcuts">${heading("▤", "Meus cadernos", "/caderno/")}<div><a href="/caderno/">Anotações →</a><a href="/caderno-erros/">Caderno de erros →</a></div></section><section class="dl-card dl-shortcuts">${heading("▣", "Meus flashcards", "/flashcards/")}<p>${data.flashcards} cartão${data.flashcards === 1 ? "" : "ões"} pendente${data.flashcards === 1 ? "" : "s"}</p><a class="dl-primary" href="/flashcards/">Iniciar revisão</a></section><section class="dl-card dl-shortcuts">${heading("▧", "Meus simulados", "/questoes-simulados/")}<p>Última precisão: ${escape(data.simulations)}</p><a class="dl-primary" href="/questoes-simulados/">Ver simulados</a></section></div>`;
  }

  function layout4(data) {
    const cards = [
      ["▤", "Aulas concluídas", `${data.done}/${data.total}`, data.progress, "/cronograma/"],
      ["▧", "Simulados", data.simulations, 0, "/questoes-simulados/"],
      ["▣", "Flashcards pendentes", String(data.flashcards), 0, "/flashcards/"],
      ["↻", "Erros ativos", String(data.errors), 0, "/caderno-erros/"]
    ];
    return `<div class="dl-grid dl-layout-4"><div class="dl-metrics">${cards.map(([icon, label, value, percent, href]) => `<a class="dl-card dl-metric" href="${href}"><span class="dl-metric-icon">${icon}</span><span><small>${label}</small><strong>${escape(value)}</strong></span>${percent ? `<i class="dl-metric-track"><b style="width:${percent}%"></b></i>` : ""}</a>`).join("")}</div><section class="dl-card dl-upcoming">${heading("▣", "Próximas atividades", "/cronograma/")}${activityList(upcoming(4), 4)}</section>${streak(data)}${areas(data)}${cat(data, true)}</div>`;
  }

  function render() {
    frame = 0;
    if (!allowed.has(current)) return;
    const data = snap();
    root.innerHTML = greeting() + ({ "1": layout1, "2": layout2, "3": layout3, "4": layout4 }[current])(data);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function apply() {
    let selected = "1";
    try { selected = localStorage.getItem(`luria:dashboard-layout:${window.docmapUser?.id || "guest"}`) || "1"; } catch {}
    current = selected === "old" || allowed.has(selected) ? selected : "1";
    document.body.dataset.dashboardLayout = current;
    root.hidden = current === "old";
    [".dashboard-detail-grid", ".calendar-panel"].forEach((selector) => {
      page.querySelector(selector)?.setAttribute("aria-hidden", String(current !== "old"));
    });
    if (current !== "old") schedule();
  }
  function enhanceShell() {
    const topbar = page.querySelector(".topbar");
    if (current === "old") {
      topbar?.querySelector("#dl-topbar-controls")?.remove();
      topbar?.querySelector(".dl-avatar")?.remove();
      return;
    }
    if (!topbar || document.getElementById("dl-topbar-controls")) {
      const avatar = topbar?.querySelector(".dl-avatar");
      if (avatar) avatar.textContent = (document.querySelector(".sidebar .user-avatar")?.textContent || "U").trim();
      return;
    }
    const controls = document.createElement("div");
    controls.id = "dl-topbar-controls";
    controls.className = "dl-topbar-controls";
    controls.innerHTML = `<div class="dl-search"><input type="search" aria-label="Buscar páginas na LURIA" placeholder="Buscar na LURIA..." autocomplete="off"><div class="dl-search-results" hidden></div></div><div class="dl-timer" data-seconds="1500"><span class="dl-timer-icon" aria-hidden="true">◉</span><span class="dl-timer-time">25:00</span><button type="button" class="dl-timer-toggle" aria-label="Iniciar foco">▶</button><button type="button" class="dl-timer-reset" aria-label="Reiniciar foco">⌄</button></div><div class="dl-timer" data-seconds="0"><span class="dl-timer-icon" aria-hidden="true">◷</span><span class="dl-timer-time">00:00</span><button type="button" class="dl-timer-toggle" aria-label="Iniciar cronômetro">▶</button><button type="button" class="dl-timer-reset" aria-label="Zerar cronômetro">⌄</button></div>`;
    topbar.insertBefore(controls, topbar.querySelector(".luria-notifications"));
    const pages = [["Dashboard", "/dashboard/"], ["Cronograma", "/cronograma/"], ["Questões e Simulados", "/questoes-simulados/"], ["Plantão", "/plantao/"], ["Flashcards", "/flashcards/"], ["Anotações", "/caderno/"], ["Caderno de Erros", "/caderno-erros/"], ["Estatísticas", "/estatisticas/"], ["Editais e Provas", "/editais/"], ["Amigos", "/amigos/"], ["Configurações", "/configuracoes/"]];
    const search = controls.querySelector(".dl-search input");
    const results = controls.querySelector(".dl-search-results");
    search.addEventListener("input", () => {
      const query = search.value.trim().toLocaleLowerCase("pt-BR");
      const matches = query ? pages.filter(([label]) => label.toLocaleLowerCase("pt-BR").includes(query)).slice(0, 6) : [];
      results.innerHTML = matches.map(([label, url]) => `<a href="${url}">${escape(label)}</a>`).join("") || '<span class="dl-empty">Nenhuma página encontrada.</span>';
      results.hidden = !query;
    });
    search.addEventListener("keydown", (event) => { if (event.key === "Enter" && !results.hidden) results.querySelector("a")?.click(); if (event.key === "Escape") results.hidden = true; });
    search.addEventListener("blur", () => setTimeout(() => { results.hidden = true; }, 150));
    controls.querySelectorAll(".dl-timer").forEach((timer) => {
      const initial = Number(timer.dataset.seconds);
      let seconds = initial; let interval = null;
      const display = timer.querySelector(".dl-timer-time");
      const toggle = timer.querySelector(".dl-timer-toggle");
      const update = () => { display.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; };
      const stop = () => { clearInterval(interval); interval = null; toggle.textContent = "▶"; toggle.setAttribute("aria-label", initial ? "Iniciar foco" : "Iniciar cronômetro"); };
      toggle.addEventListener("click", () => {
        if (interval) { stop(); return; }
        toggle.textContent = "Ⅱ"; toggle.setAttribute("aria-label", "Pausar");
        interval = setInterval(() => { seconds = initial ? Math.max(0, seconds - 1) : seconds + 1; update(); if (initial && !seconds) stop(); }, 1000);
      });
      timer.querySelector(".dl-timer-reset").addEventListener("click", () => { stop(); seconds = initial; update(); });
    });
    const avatar = document.createElement("a");
    avatar.className = "dl-avatar"; avatar.href = "/configuracoes/"; avatar.setAttribute("aria-label", "Perfil e configurações");
    avatar.textContent = (document.querySelector(".sidebar .user-avatar")?.textContent || "U").trim();
    topbar.appendChild(avatar);
  }
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dl-day]");
    if (!button) return;
    selectedDate.setDate(selectedDate.getDate() + Number(button.dataset.dlDay));
    if (typeof agendaState === "object" && typeof loadAgenda === "function") {
      agendaState.view = "day";
      agendaState.anchorDate = new Date(selectedDate);
      loadAgenda();
    }
    schedule();
  });
  window.addEventListener("luria:dashboard-data", schedule);
  window.addEventListener("docmap:ready", () => { apply(); enhanceShell(); }, { once: true });
  apply();
  enhanceShell();
})();
