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

  // Ícones vetoriais nos traços e cores das quatro referências.
  const iconPaths = {
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
    target: '<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><circle cx="11" cy="13" r="1" fill="currentColor" stroke="none"/><path d="m13 11 8-8m-5 0h5v5"/>',
    flame: '<path d="M12 22c4.4 0 7-3.2 7-7.1 0-2.9-1.5-5.2-3-6.4.1 2.4-1 3.2-1.9 3.4C15 8.3 12.3 5.1 10.6 2c.3 3.7-1 5.3-3.3 8C5.8 11.7 5 13.3 5 15.2 5 19 7.6 22 12 22Z" fill="currentColor" stroke="none"/><path d="M12 22c-2.1 0-3.5-1.5-3.5-3.5 0-1.4.7-2.5 2.2-3.8.1 1.2.8 1.8 1.4 2.1.6-1.4 1.2-2.4 1.1-3.6 1.8 1.6 2.4 3.2 2.4 5.1 0 2.1-1.3 3.6-3.6 3.6Z" fill="var(--gold-soft)" stroke="none"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-5L4 8m0-5v5h5M4 13a8 8 0 0 0 14 5l2-2m0 5v-5h-5"/>',
    chart: '<rect x="3" y="13" width="3" height="8" rx="1" fill="currentColor" stroke="none"/><rect x="10" y="8" width="3" height="13" rx="1" fill="currentColor" stroke="none"/><rect x="17" y="3" width="3" height="18" rx="1" fill="currentColor" stroke="none"/>',
    book: '<path d="M12 6c-2.7-2-5.7-2.5-9-2v15c3.3-.5 6.3 0 9 2 2.7-2 5.7-2.5 9-2V4c-3.3-.5-6.3 0-9 2Zm0 0v15"/>',
    file: '<path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm8 0v5h5M8 12h8M8 16h8"/>',
    cards: '<rect x="7" y="3" width="14" height="15" rx="2"/><path d="M17 18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2m3 2h8m-8 4h6"/>',
    notebook: '<rect x="6" y="2" width="15" height="20" rx="2"/><path d="M10 7h7m-7 4h7m-7 4h5M3 6h5M3 11h5M3 16h5"/>',
    play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
    cat: '<path d="M4 10 3 3l6 3a10 10 0 0 1 6 0l6-3-1 7a9 9 0 1 1-16 0Z"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/><path d="m11 17 1 1 1-1"/>',
    simulation: '<path d="M6 2h9l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm9 0v5h5M9 12h7m-7 4h7"/>',
    stethoscope: '<path d="M6 3v7a4 4 0 0 0 8 0V3M4 3h4m4 0h4m-6 11v2a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>',
    baby: '<circle cx="12" cy="12" r="9"/><path d="M9 8c1-2 3-2 4 0m-4 5h.01M15 13h.01m-5 3c1 1 3 1 4 0"/>',
    uterus: '<path d="M8 8c-1-3-4-4-6-2 0 3 2 6 5 6m9-4c1-3 4-4 6-2 0 3-2 6-5 6M8 8c0 3 1 5 4 5s4-2 4-5m-9 4c0 5 3 6 5 6s5-1 5-6m-5 6v4"/>'
  };
  function icon(name) {
    return `<svg class="dl-icon dl-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.file}</svg>`;
  }

  function heading(icon, title, href = "") {
    return `<div class="dl-card-heading"><h3><span class="dl-heading-icon" aria-hidden="true">${icon}</span> ${escape(title)}</h3>${href ? `<a href="${href}" aria-label="Ver ${escape(title)}">Ver mais ›</a>` : ""}</div>`;
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

  function streakTier(days) {
    const currentDays = Number(days || 0);
    if (currentDays >= 365) return "6";
    if (currentDays >= 180) return "5";
    if (currentDays >= 90) return "4";
    if (currentDays >= 30) return "3";
    if (currentDays >= 7) return "2";
    if (currentDays >= 4) return "1";
    return "snow";
  }

  function streakVisual(days) {
    const tier = streakTier(days);
    return `
      <span class="dl-streak-visual" data-streak-tier="${tier}" aria-hidden="true">
        <span class="dl-streak-snow">❄</span>
        <svg class="dl-streak-flame" viewBox="0 0 64 80" role="presentation">
          <path fill="currentColor" d="M34 3C35 15 26 19 26 29C26 35 30 38 33 40C27 40 22 35 21 29C13 37 8 46 8 56C8 69 18 77 32 77C46 77 56 68 56 54C56 41 48 30 40 22C39 30 36 34 32 36C35 27 43 18 34 3Z"></path>
          <path class="dl-streak-core" d="M33 40C27 47 23 52 23 59C23 67 27 71 33 71C40 71 44 66 44 59C44 52 39 47 35 43C35 48 33 51 30 53C31 48 34 45 33 40Z"></path>
        </svg>
      </span>
    `;
  }

  function streak(data) {
    const weekday = (new Date().getDay() + 6) % 7;
    const tier = streakTier(data.streak);
    return `<section class="dl-card dl-streak" data-streak-tier="${tier}"><div class="dl-card-heading"><h3><span class="dl-heading-icon dl-streak-heading-icon" aria-hidden="true">${streakVisual(data.streak)}</span> Ofensiva</h3><a href="/estatisticas/" aria-label="Ver Ofensiva">Ver mais ›</a></div><div class="dl-streak-value"><strong>${data.streak}</strong><span>dias seguidos</span></div><div class="dl-weekdays">${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => `<span class="${index <= weekday && data.streak > 0 ? "active" : ""}"><i></i>${day}</span>`).join("")}</div></section>`;
  }

  function areas(data) {
    const rows = data.areas.slice(0, 5);
    return `<section class="dl-card dl-areas">${heading(icon("chart"), "Progresso por área", "/estatisticas/")}${rows.length ? rows.map((entry) => {
      const percent = entry.total ? Math.round(entry.completed / entry.total * 100) : 0;
      return `<div class="dl-area-row"><span>${escape(entry.area)}</span><div class="dl-area-track"><i style="width:${percent}%"></i></div><strong>${percent}%</strong><small>${entry.completed}/${entry.total} aulas</small></div>`;
    }).join("") : '<p class="dl-empty">Adicione aulas ao cronograma para ver o progresso por área.</p>'}</section>`;
  }

  function cat(data, compact = false) {
    return `<section class="dl-card dl-cat ${compact ? "dl-cat-compact" : ""}">${heading(icon("cat"), "Pulo do Gato do dia")}<div class="dl-cat-content"><span class="dashboard-cat-symbol" role="img" aria-label="Pulo do Gato"><img class="cat-symbol-light" src="/assets/img/pulo%20do%20gato/luria_gato_tema_claro.webp?v=20260924d" alt=""><img class="cat-symbol-dark" src="/assets/img/pulo%20do%20gato/luria_gato_tema_escuro.webp?v=20260924d" alt=""><img class="cat-symbol-pink" src="/assets/img/pulo%20do%20gato/luria_gato_tema_rosa.webp?v=20260924d" alt=""></span><div><p>${escape(data.ccq)}</p>${data.ccqArea ? `<small>${escape(data.ccqArea)}</small>` : ""}</div></div></section>`;
  }

  function layout1(data) {
    const todayItems = items().filter((item) => item.activity_date === dayISO(selectedDate));
    const dayLessons = window.luriaDashboardDayLessons?.[dayISO(selectedDate)] || { completed: 0, total: 0 };
    const done = dayLessons.completed; const total = dayLessons.total;
    const pct = total ? Math.round(done / total * 100) : 0;
    return `<div class="dl-grid dl-layout-1"><section class="dl-card dl-agenda-large">${heading(icon("calendar"), "Hoje · Agenda", "/cronograma/")}<div class="dl-day-nav"><button data-dl-day="-1" aria-label="Dia anterior">‹</button><span>${escape(readableDate(selectedDate))}</span><button data-dl-day="1" aria-label="Próximo dia">›</button></div>${activityList(todayItems, 10)}</section><div class="dl-side"><section class="dl-card dl-day-summary">${heading(icon("clipboard"), "Resumo do dia")}<div class="dl-summary-body">${ring(pct, `${pct}%`, "aulas concluídas")}<div><strong>${total} aula${total === 1 ? "" : "s"} hoje</strong><span>${done} concluída${done === 1 ? "" : "s"}</span><span>${todayItems.length} atividade${todayItems.length === 1 ? "" : "s"} na agenda</span></div></div></section>${streak(data)}</div>${areas(data)}${cat(data, true)}</div>`;
  }

  function layout2(data) {
    const reviewItems = items().filter((item) => /review|flashcards|errors/.test(item.kind) && item.activity_date >= dayISO(new Date()));
    return `<div class="dl-grid dl-layout-2"><section class="dl-card dl-progress">${heading(icon("target"), "Seu progresso", "/estatisticas/")}${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Erros ativos <strong>${data.errors}</strong></span></div></section>${streak(data)}<section class="dl-card dl-upcoming">${heading(icon("calendar"), "Próximas atividades", "/cronograma/")}${activityList(upcoming(3), 3)}</section><section class="dl-card dl-reviews">${heading(icon("refresh"), "Revisões programadas", "/flashcards/")}${ring(0, String(reviewItems.length), "na agenda")}<a class="dl-primary" href="/flashcards/">Continuar revisando</a></section>${areas(data)}</div>`;
  }

  function layout3(data) {
    return `<div class="dl-grid dl-layout-3"><section class="dl-card dl-progress dl-overview">${heading(icon("calendar"), "Resumo do plano", "/estatisticas/")}<div class="dl-overview-body">${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas concluídas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Caderno de erros <strong>${data.errors} ativos</strong></span><span>Horas estudadas <strong>${escape(data.hours)}</strong></span></div></div></section>${streak(data)}${cat(data)}<section class="dl-card dl-upcoming">${heading(icon("calendar"), "Próximas atividades", "/cronograma/")}${activityList(upcoming(4), 4)}</section><section class="dl-card dl-performance">${heading(icon("chart"), "Meu desempenho", "/estatisticas/")}<div class="dl-performance-grid"><a href="/cronograma/"><span>${icon("book")}</span><small>Aulas</small><strong>${data.done}</strong></a><a href="/questoes-simulados/"><span>${icon("file")}</span><small>Simulados</small><strong>${escape(data.simulations)}</strong></a><a href="/flashcards/"><span>${icon("cards")}</span><small>Flashcards</small><strong>${data.flashcards}</strong></a><a href="/estatisticas/"><span>${icon("refresh")}</span><small>Retenção</small><strong>${escape(data.retention)}</strong></a></div>${areas(data)}</section><section class="dl-card dl-shortcuts">${heading(icon("notebook"), "Meus cadernos", "/caderno/")}<div><a href="/caderno/">Anotações →</a><a href="/caderno-erros/">Caderno de erros →</a></div></section><section class="dl-card dl-shortcuts">${heading(icon("calendar"), "Meus flashcards", "/flashcards/")}<p>${data.flashcards} cartão${data.flashcards === 1 ? "" : "ões"} pendente${data.flashcards === 1 ? "" : "s"}</p><a class="dl-primary" href="/flashcards/">Iniciar revisão</a></section><section class="dl-card dl-shortcuts">${heading(icon("simulation"), "Meus simulados", "/questoes-simulados/")}<p>Última precisão: ${escape(data.simulations)}</p><a class="dl-primary" href="/questoes-simulados/">Ver simulados</a></section></div>`;
  }

  function layout4(data) {
    const cards = [
      ["book", "Aulas concluídas", `${data.done}/${data.total}`, data.progress, "/cronograma/"],
      ["file", "Simulados", data.simulations, 0, "/questoes-simulados/"],
      ["cards", "Flashcards pendentes", String(data.flashcards), 0, "/flashcards/"],
      ["refresh", "Erros ativos", String(data.errors), 0, "/caderno-erros/"]
    ];
    return `<div class="dl-grid dl-layout-4"><div class="dl-metrics">${cards.map(([iconName, label, value, percent, href]) => `<a class="dl-card dl-metric" href="${href}"><span class="dl-metric-icon">${icon(iconName)}</span><span><small>${label}</small><strong>${escape(value)}</strong></span>${percent ? `<i class="dl-metric-track"><b style="width:${percent}%"></b></i>` : ""}</a>`).join("")}</div><section class="dl-card dl-upcoming">${heading(icon("calendar"), "Próximas atividades", "/cronograma/")}${activityList(upcoming(4), 4)}</section>${streak(data)}${areas(data)}${cat(data, true)}</div>`;
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
      if (avatar) {
        const name = (
          window.docmapProfile?.display_name
          || window.docmapUser?.user_metadata?.display_name
          || window.docmapUser?.email?.split("@")[0]
          || "Usuário"
        ).trim();
        avatar.textContent = (name.charAt(0) || "U").toUpperCase();
      }
      return;
    }
    const controls = document.createElement("div");
    controls.id = "dl-topbar-controls";
    controls.className = "dl-topbar-controls";
    controls.innerHTML = `<div class="dl-timer dl-stopwatch"><span class="dl-timer-icon" aria-hidden="true">◷</span><span class="dl-timer-time">00:00</span><button type="button" class="dl-timer-toggle" aria-label="Iniciar cronômetro">▶</button><button type="button" class="dl-timer-reset" aria-label="Zerar cronômetro">⌄</button></div>`;
    topbar.insertBefore(controls, topbar.querySelector(".luria-notifications"));
    const stopwatch = controls.querySelector(".dl-stopwatch");
    let seconds = 0, watchInterval = null;
    const watchDisplay = stopwatch.querySelector(".dl-timer-time");
    const watchToggle = stopwatch.querySelector(".dl-timer-toggle");
    const watchUpdate = () => { watchDisplay.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; };
    const watchStop = () => { clearInterval(watchInterval); watchInterval = null; watchToggle.textContent = "▶"; watchToggle.setAttribute("aria-label", "Iniciar cronômetro"); };
    watchToggle.addEventListener("click", () => { if (watchInterval) { watchStop(); return; } watchToggle.textContent = "Ⅱ"; watchToggle.setAttribute("aria-label", "Pausar cronômetro"); watchInterval = setInterval(() => { seconds++; watchUpdate(); }, 1000); });
    stopwatch.querySelector(".dl-timer-reset").addEventListener("click", () => { watchStop(); seconds = 0; watchUpdate(); });
    const account = document.createElement("div");
    account.className = "dl-account";
    const profileName = (
      window.docmapProfile?.display_name
      || window.docmapUser?.user_metadata?.display_name
      || window.docmapUser?.email?.split("@")[0]
      || "Usuário"
    ).trim();
    const accountInitial = (profileName.charAt(0) || "U").toUpperCase();
    account.innerHTML = `
      <button class="dl-avatar" type="button" aria-label="Abrir menu da conta" aria-expanded="false" aria-controls="dl-account-menu">${accountInitial}</button>
      <div class="dl-account-menu" id="dl-account-menu" hidden>
        <a href="/configuracoes/#perfil">Perfil</a>
        <a href="/configuracoes/">Configurações</a>
        <button id="logout" type="button">Sair</button>
      </div>
    `;
    topbar.appendChild(account);
    const accountButton = account.querySelector(".dl-avatar");
    const accountMenu = account.querySelector(".dl-account-menu");
    accountButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const opening = accountMenu.hidden;
      accountMenu.hidden = !opening;
      accountButton.setAttribute("aria-expanded", String(opening));
    });
    accountMenu.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", () => {
      if (!accountMenu.hidden) {
        accountMenu.hidden = true;
        accountButton.setAttribute("aria-expanded", "false");
      }
    });
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
