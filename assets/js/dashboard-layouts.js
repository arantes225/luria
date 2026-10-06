(() => {
  const allowed = new Set(["1", "2", "3", "4", "5"]);
  const page = document.querySelector('body[data-page="dashboard"] .page');
  if (!page) return;
  const root = document.createElement("div");
  root.id = "dashboard-alternative";
  root.setAttribute("aria-live", "off");
  const topbar = page.querySelector(".topbar");
  if (topbar) topbar.after(root);
  else page.prepend(root);
  let current = "1";
  let selectedDate = new Date();
  let frame = 0;
  let dailyChallengeAccuracy = null;
  let dailyChallengeAccuracyLoading = false;
  let dailyChallengeAccuracyLoaded = false;
  let dashboardAppliedOnce = false;

  const escape = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const text = (id, fallback = "—") => {
    const stateValue = window.luriaDashboardMetrics?.[id];
    if (stateValue !== null && stateValue !== undefined && String(stateValue).trim()) return String(stateValue).trim();
    return document.getElementById(id)?.textContent?.trim() || fallback;
  };
  const number = (value) => Number(String(value).match(/\d+/)?.[0] || 0);
  const dayISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const readableDate = (date) => new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(date);
  const shortDate = (value) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(`${value}T12:00:00`));
  const items = () => (typeof agendaState === "object" && Array.isArray(agendaState.items) ? agendaState.items : []);
  const upcomingItems = () => Array.isArray(window.luriaDashboardUpcomingAgenda)
    ? window.luriaDashboardUpcomingAgenda
    : items();
  const upcoming = (limit = 4) => upcomingItems()
    .filter((item) => item.activity_date >= dayISO(new Date()))
    .sort((a, b) => String(a.activity_date).localeCompare(String(b.activity_date)))
    .slice(0, limit);
  const metric = (id) => escape(text(id));
  const snap = () => {
    const [done, total] = text("metric-lessons-progress-copy", "0/0").split("/").map(number);
    const progress = total ? Math.round(done / total * 100) : 0;
    const today = window.luriaDashboardTodayLessons || { completed: 0, total: 0 };
    return {
      done, total, progress, today,
      streak: Number(window.luriaCurrentStreak || 0),
      flashcards: number(text("metric-flashcards", "0")),
      errors: number(text("metric-errors", "0")),
      hours: text("metric-hours", "0h"),
      retention: text("metric-retention"),
      simulations: text("metric-simulations-accuracy"),
      ccq: window.luriaDashboardCcq?.text || "Seu Pulo do Gato aparecerá aqui.",
      ccqArea: window.luriaDashboardCcq?.area || "",
      areas: window.luriaDashboardAreaSummary || [],
      questions: number(text("metric-questions", "0")),
      simulationsCount: number(text("metric-simulations", "0")),
      challengeAccuracy: dailyChallengeAccuracy
    };
  };

  function dashboardFirstName() {
    let profile;
    try { profile = JSON.parse(localStorage.getItem(`docmap:profile:${window.docmapUser?.id}`) || "null"); } catch {}
    return (profile?.display_name || window.docmapUser?.user_metadata?.display_name || "").trim().split(/\s+/)[0];
  }

  function dashboardGreetingTitle() {
    const name = dashboardFirstName();
    return `Olá${name ? `, ${name}` : ""}!`;
  }

  function syncDashboardHeading() {
    const heading = topbar?.querySelector(".page-heading");
    if (!heading) return;
    const eyebrow = heading.querySelector("[data-page-eyebrow]");
    const title = heading.querySelector("[data-page-title]");
    if (eyebrow) eyebrow.textContent = "SEU PAINEL DE ESTUDOS";
    if (title) title.textContent = dashboardGreetingTitle();
    let subtitle = heading.querySelector(".dl-heading-subtitle");
    if (!subtitle) {
      subtitle = document.createElement("p");
      subtitle.className = "dl-heading-subtitle";
      heading.appendChild(subtitle);
    }
    subtitle.textContent = "Vamos em frente hoje? Consistência é o que transforma.";
  }

  function greeting() {
    return `<section class="luria-page-spotlight luria-dashboard-spotlight dl-dashboard-title-card" aria-label="Dashboard">
      <div class="luria-page-spotlight-copy">
        <span class="luria-page-spotlight-label">VISÃO GERAL</span>
        <strong>Dashboard</strong>
        <small class="luria-page-spotlight-helper">Seu dia de estudos em um só lugar.</small>
      </div>
    </section>`;
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
    if (typeof window.LuriaIcon === "function") {
      return window.LuriaIcon(name, `dl-icon dl-icon-${name}`);
    }
    return `<svg class="dl-icon dl-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.file}</svg>`;
  }

  function staticFireIcon() {
    return `<svg class="dl-icon dl-static-fire" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.2 2.2c.5 3.2-1.2 4.8-2.7 6.3C8 10 7 11.5 7 13.7 7 16.8 9.2 19 12 19s5-2.2 5-5.4c0-2.5-1.2-4.7-3-6.6.1 2-1 3.2-2.1 3.8.4-2.6-.2-5.4.3-8.6Z" fill="currentColor"/>
      <path d="M12 21c-2 0-3.5-1.4-3.5-3.4 0-1.5.8-2.7 2.3-4 .1 1.2.7 1.9 1.4 2.3.7-1.3 1.2-2.4 1.1-3.7 1.6 1.5 2.3 3.2 2.3 5.1 0 2.1-1.4 3.7-3.6 3.7Z" fill="var(--gold-soft,#f6b73c)"/>
    </svg>`;
  }

  function heading(icon, title, href = "") {
    return `<div class="dl-card-heading"><h3><span class="dl-heading-icon" aria-hidden="true">${icon}</span> ${escape(title)}</h3>${href ? `<a href="${href}" aria-label="Ver ${escape(title)}">Ver mais ›</a>` : ""}</div>`;
  }

  function activity(item, action = true, showDate = true) {
    const label = typeof kindMeta === "function" ? kindMeta(item.kind).label : "Atividade";
    const href =
      item.kind === "exam" || item.kind === "registration_deadline"
        ? "/editais/"
        : item.kind === "lesson"
          ? "/caderno/"
          : "/cronograma/";
    const area = item.area ? `<span class="dl-chip">${escape(item.area)}</span>` : "";
    const actionButton = action
      ? `<a class="dl-start" href="${escape(href)}" aria-label="Abrir ${escape(item.title || label)}">▶ <span>Abrir</span></a>`
      : "";
    const actionInsideCallout = (current === "1" || current === "3") && !showDate;
    return `<li class="dl-activity ${showDate ? "" : "dl-activity-no-date"} ${actionInsideCallout ? "dl-activity-action-inside" : ""}">${showDate ? `<span class="dl-activity-date">${escape(shortDate(item.activity_date))}</span>` : ""}<span class="dl-activity-dot" aria-hidden="true"></span><div class="dl-activity-info"><div class="dl-activity-copy"><strong>${escape(item.title || label)}</strong><small>${escape(label)} ${area}</small></div>${actionInsideCallout ? actionButton : ""}</div>${actionInsideCallout ? "" : actionButton}</li>`;
  }

  function activityList(list, limit = 5, showDate = true) {
    const visible = list.slice(0, limit);
    return visible.length ? `<ol class="dl-timeline" data-activity-count="${visible.length}">${visible.map((item) => activity(item, true, showDate)).join("")}</ol>`
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
    const isDashboard4 = current === "4";
    const isDashboard1 = current === "1";
    const headingFlame = isDashboard1 ? staticFireIcon() : (isDashboard4 ? icon("flame") : streakVisual(data.streak));
    const streakValue = isDashboard4
      ? `<div class="dl-streak-value dl-streak-value-hero">${streakVisual(data.streak)}<strong>${data.streak} dias seguidos</strong></div>`
      : isDashboard1
        ? `<div class="dl-streak-value dl-streak-value-dashboard1">${streakVisual(data.streak)}<strong>${data.streak} dias seguidos</strong></div>`
        : isDashboard1 ? `<div class="dl-streak-value dl-streak-value-dashboard1">${streakVisual(data.streak)}<strong>${data.streak} dias seguidos</strong></div>` : `<div class="dl-streak-value"><strong>${data.streak}</strong><span>dias seguidos</span></div>`;
    return `<section class="dl-card dl-streak" data-streak-tier="${tier}"><div class="dl-card-heading"><h3><span class="dl-heading-icon dl-streak-heading-icon" aria-hidden="true">${headingFlame}</span> Ofensiva</h3></div>${streakValue}<div class="dl-weekdays">${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => `<span class="${index <= weekday && data.streak > 0 ? "active" : ""}"><i></i>${day}</span>`).join("")}</div></section>`;
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

  function studyNowPanel(compact = false) {
    return `<section class="dl-study-now${compact ? " is-compact" : ""}" data-luria-study-panel>
      <div class="dl-study-now-head">
        <span class="dl-heading-icon" aria-hidden="true">${icon("target")}</span>
        <div><small>Sessão guiada</small><h3>Estudar agora</h3></div>
      </div>
      <p>Escolha seu tempo. Alex organiza a sessão para você.</p>
      <div class="dl-study-time-options" role="group" aria-label="Tempo disponível">
        <button type="button" data-luria-study-time="15">15 min</button>
        <button type="button" data-luria-study-time="30" class="active">30 min</button>
        <button type="button" data-luria-study-time="60">1 hora</button>
        <button type="button" data-luria-study-time="90">1h30</button>
        <button type="button" data-luria-study-time="120">2 horas</button>
        <button type="button" data-luria-study-time="999">Completar o dia</button>
      </div>
      <button type="button" class="dl-primary dl-study-now-start" data-luria-study-start>Estudar agora</button>
    </section>`;
  }

  function layout1(data) {
    const today = new Date();
    const todayISO = dayISO(today);
    const todayItems = items().filter((item) => item.activity_date === todayISO);
    const dayLessons = window.luriaDashboardDayLessons?.[todayISO] || { completed: 0, total: 0 };
    const done = dayLessons.completed; const total = dayLessons.total;
    const pct = total ? Math.round(done / total * 100) : 0;
    return `<div class="dl-grid dl-layout-1"><div class="dl-agenda-study-pair dl-agenda-study-pair-1"><section class="dl-card dl-agenda-large">${heading(icon("calendar"), "Atividades de hoje", "/cronograma/")}${activityList(todayItems, 10, false)}</section><section class="dl-card dl-study-now-card dl-study-now-card-main">${studyNowPanel()}</section></div><div class="dl-side"><section class="dl-card dl-day-summary">${heading(icon("clipboard"), "Resumo do dia")}<div class="dl-summary-body">${ring(pct, `${pct}%`, "aulas concluídas")}<div><strong>${total} aula${total === 1 ? "" : "s"} hoje</strong><span>${done} concluída${done === 1 ? "" : "s"}</span><span>${todayItems.length} atividade${todayItems.length === 1 ? "" : "s"} na agenda</span></div></div></section>${streak(data)}</div>${areas(data)}${cat(data, true)}</div>`;
  }

  function layout2(data) {
    return `<div class="dl-grid dl-layout-2"><section class="dl-card dl-upcoming">${heading(icon("calendar"), "Próximas atividades", "/cronograma/")}${activityList(upcoming(3), 3, false)}</section><section class="dl-card dl-study-now-card">${studyNowPanel(true)}</section><section class="dl-card dl-progress">${heading(icon("target"), "Seu progresso", "/estatisticas/")}${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Erros ativos <strong>${data.errors}</strong></span></div></section>${streak(data)}${areas(data)}</div>`;
  }

  function layout3(data) {
    const todayISO = dayISO(new Date());
    const todayItems = items().filter((item) => item.activity_date === todayISO);
    return `<div class="dl-grid dl-layout-3"><section class="dl-card dl-progress dl-overview">${heading(icon("calendar"), "Resumo do plano", "/estatisticas/")}<div class="dl-overview-body">${ring(data.progress, `${data.progress}%`, "das aulas")}<div class="dl-mini-list"><span>Aulas concluídas <strong>${data.done}/${data.total}</strong></span><span>Flashcards pendentes <strong>${data.flashcards}</strong></span><span>Caderno de erros <strong>${data.errors} ativos</strong></span><span>Horas estudadas <strong>${escape(data.hours)}</strong></span></div></div></section>${streak(data)}${cat(data)}<section class="dl-card dl-upcoming">${heading(icon("calendar"), "Atividades do dia", "/cronograma/")}${activityList(todayItems, 4, false)}${studyNowPanel(true)}</section><section class="dl-card dl-performance">${heading(icon("chart"), "Meu desempenho", "/estatisticas/")}<div class="dl-performance-grid"><a href="/cronograma/"><span>${icon("book")}</span><small>Aulas</small><strong>${data.done}</strong></a><a href="/questoes-simulados/"><span>${icon("simulation")}</span><small>Simulados</small><strong>${escape(data.simulations)}</strong></a><a href="/flashcards/"><span>${icon("cards")}</span><small>Flashcards</small><strong>${data.flashcards}</strong></a><a href="/estatisticas/"><span>${icon("refresh")}</span><small>Retenção</small><strong>${escape(data.retention)}</strong></a></div>${areas(data)}</section></div>`;
  }

  async function loadDailyChallengeAccuracy() {
    if (dailyChallengeAccuracyLoaded || dailyChallengeAccuracyLoading) return;
    dailyChallengeAccuracyLoading = true;
    try {
      const sb = window.supabaseClient;
      if (!sb) return;
      let userId = window.docmapUser?.id || null;
      if (!userId) {
        const { data: authData } = await sb.auth.getUser();
        userId = authData?.user?.id || null;
      }
      if (!userId) return;

      const { data, error } = await sb
        .from("daily_challenge_progress")
        .select("status")
        .eq("user_id", userId)
        .in("status", ["won", "lost"]);

      if (error) throw error;
      const completed = Array.isArray(data) ? data.length : 0;
      const wins = Array.isArray(data) ? data.filter((row) => row.status === "won").length : 0;
      dailyChallengeAccuracy = completed ? Math.round((wins / completed) * 100) : null;
      schedule();
    } catch (error) {
      console.warn("Dashboard: não foi possível carregar a taxa de acerto do Desafio Diário.", error);
    }
  }

  function layout4(data) {
    const summaryMetrics = [
      ["calendar", "Horas de aula", data.hours, "/estatisticas/"],
      ["book", "Aulas concluídas", `${data.done}/${data.total}`, "/cronograma/"],
      ["simulation", "Simulados", data.simulationsCount || data.simulations || "—", "/questoes-simulados/"],
      ["cards", "Flashcards pendentes", String(data.flashcards), "/flashcards/"]
    ];
    const challengeValue = Number.isFinite(data.challengeAccuracy) ? `${data.challengeAccuracy}%` : "Novo";
    const challengeCaption = Number.isFinite(data.challengeAccuracy) ? "taxa de acerto ›" : "Jogar hoje ›";
    const todayActivities = upcomingItems().filter((item) => item?.activity_date === dayISO(new Date())).sort((a, b) => String(a.activity_time || "").localeCompare(String(b.activity_time || "")) || String(a.title || "").localeCompare(String(b.title || ""), "pt-BR"));
    return `<div class="dl-grid dl-layout-4"><div class="dl-metrics"><section class="dl-card dl-metric-cluster">${summaryMetrics.map(([iconName, label, value, href]) => `<a class="dl-metric-mini" href="${href}"><span class="dl-metric-icon">${icon(iconName)}</span><span><small>${label}</small><strong>${escape(value)}</strong></span></a>`).join("")}</section><a class="dl-card dl-daily-challenge" href="/desafio-diario/"><span class="dl-challenge-icon">${icon("target")}</span><span class="dl-challenge-copy"><small>Desafio diário</small><strong>${escape(challengeValue)}</strong><em>${escape(challengeCaption)}</em></span></a></div><div class="dl-agenda-study-pair dl-agenda-study-pair-4"><section class="dl-card dl-upcoming dl-today-activities">${heading(icon("calendar"), "Atividades do dia", "/cronograma/")}<div class="dl-today-scroll">${activityList(todayActivities, todayActivities.length || 1)}</div></section><section class="dl-card dl-study-now-card dl-study-now-card-main">${studyNowPanel(true)}</section></div>${streak(data)}${areas(data)}${cat(data, true)}</div>`;
  }



  function dashboard5UpcomingItems() {
    const today = dayISO(new Date());
    const source = Array.isArray(window.luriaDashboardUpcomingAgenda)
      ? window.luriaDashboardUpcomingAgenda
      : [];

    return source
      .filter((item) => item?.activity_date === today)
      .sort((a, b) =>
        String(a.activity_time || "").localeCompare(String(b.activity_time || ""))
        || (a.kind === "lesson" ? -1 : b.kind === "lesson" ? 1 : 0)
        || String(a.title || "").localeCompare(String(b.title || ""), "pt-BR")
      );
  }

  function dashboard5ActivityHref(item) {
    if (!item) return "/cronograma/";
    if (typeof activityCanStart === "function" && activityCanStart(item)) {
      return buildAmbientacaoUrl(item);
    }
    if (item.kind === "exam" || item.kind === "registration_deadline") return "/editais/";
    return "/cronograma/";
  }

  function layout5(data) {
    const nextItems = dashboard5UpcomingItems();
    const next = nextItems[0] || null;
    const nextHref = dashboard5ActivityHref(next);
    const rows = (data.areas || []).slice(0, 5);
    const weekday = (new Date().getDay() + 6) % 7;
    const recent = [
      ["Simulado mais recente", data.simulations, "Resultado geral"],
      ["Questões e Simulados", data.simulations, "Desempenho recente"],
      ["Revisão de desempenho", data.retention, "Retenção"]
    ];
    return `
      <div class="dl5-shell">
        <div class="dl5-hero">
          <div>
            <h2>${greeting().match(/<h2>(.*?)<\/h2>/)?.[1] || "Olá!"}</h2>
            <p>Vamos em frente hoje? Consistência é o que transforma.</p>
          </div>
        </div>

        <div class="dl5-metrics">
          <a class="dl5-metric" href="/cronograma/"><span class="dl5-metric-icon is-blue">${icon("book")}</span><div><small>Aulas concluídas</small><strong>${data.done}</strong><em>↗ progresso do cronograma</em></div></a>
          <a class="dl5-metric" href="/questoes-simulados/"><span class="dl5-metric-icon is-orange">${icon("file")}</span><div><small>Questões resolvidas</small><strong>${data.questions || "—"}</strong><em>↗ desempenho em questões</em></div></a>
          <a class="dl5-metric" href="/questoes-simulados/"><span class="dl5-metric-icon is-green">${icon("simulation")}</span><div><small>Simulados feitos</small><strong>${data.simulationsCount || "—"}</strong><em>↗ histórico de simulados</em></div></a>
          <a class="dl5-metric" href="/estatisticas/"><span class="dl5-metric-icon is-purple">◷</span><div><small>Horas de estudo</small><strong>${escape(data.hours)}</strong><em>esta semana</em></div></a>
        </div>

        <div class="dl5-mid">
          <section class="dl5-card dl5-next">
            <div class="dl5-title"><h3>${icon("calendar")} Atividades de hoje</h3><a href="/cronograma/">›</a></div>
            <div class="dl5-next-list">
              ${nextItems.length ? nextItems.map((item, index) => {
                const label = typeof kindMeta === "function" ? kindMeta(item.kind).label : "Atividade";
                const href = dashboard5ActivityHref(item);
                return `<a class="dl5-next-item" href="${escape(href)}">
                  <span class="dl5-timeline-dot" aria-hidden="true"></span>
                  <div>
                    <small>${escape(shortDate(item.activity_date))}</small>
                    <strong>${escape(item.title || "Atividade")}</strong>
                    <span>${escape(label)}${item.area ? ` · ${escape(item.area)}` : ""}</span>
                  </div>
                  <em>›</em>
                </a>`;
              }).join("") : `<div class="dl5-next-empty"><strong>Nenhuma atividade para hoje</strong><span>Confira ou ajuste seu cronograma.</span></div>`}
            </div>
            <a class="dl5-start" href="${escape(nextHref)}">▶ &nbsp; ${next ? "Iniciar atividade" : "Abrir cronograma"}</a>
            ${studyNowPanel(true)}
          </section>

          <section class="dl5-card dl5-streak">
            <div class="dl5-title"><h3><span class="dl5-title-flame" aria-hidden="true">${icon("flame")}</span> Ofensiva</h3><a href="/estatisticas/">›</a></div>
            <div class="dl5-streak-stack">
              <span class="dl5-streak-hero" aria-hidden="true">${streakVisual(data.streak)}</span>
              <div class="dl5-streak-copy"><strong>${data.streak} dias seguidos</strong></div>
            </div>
            <div class="dl5-week">${["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"].map((d,i)=>{ const daysBack = weekday - i; const active = daysBack >= 0 && daysBack < data.streak; return `<span class="${active ? "on":""}"><i></i>${d}</span>`; }).join("")}</div>
          </section>

          <section class="dl5-card dl5-areas">
            <div class="dl5-title"><h3>${icon("chart")} Desempenho por área</h3><a href="/estatisticas/">›</a></div>
            <div class="dl5-area-list">
              ${rows.length ? rows.map((entry)=>{
                const pct=entry.total ? Math.round(entry.completed/entry.total*100) : 0;
                return `<div><span>${escape(entry.area)}</span><i><b style="width:${pct}%"></b></i><strong>${pct}%</strong></div>`;
              }).join("") : '<p class="dl-empty">Sem dados por área ainda.</p>'}
            </div>
          </section>
        </div>

        <div class="dl5-bottom">
          <section class="dl5-card dl5-sims">
            <div class="dl5-title"><h3>${icon("simulation")} Últimos simulados</h3><a href="/questoes-simulados/">›</a></div>
            <div class="dl5-sim-list">
              ${recent.map((item,i)=>`<a href="/questoes-simulados/"><div><strong>${escape(item[0])}</strong><small>${escape(item[2])}</small></div><span>${escape(item[1] || "—")}</span><em>›</em></a>`).join("")}
            </div>
          </section>

          <section class="dl5-card dl5-cat">
            <div class="dl5-title"><h3>${icon("cat")} Pulo do Gato do dia</h3><a href="/dashboard/">›</a></div>
            <div class="dl5-cat-body">
              <span class="dashboard-cat-symbol" aria-hidden="true"><img class="cat-symbol-light" src="/assets/img/pulo%20do%20gato/luria_gato_tema_claro.webp?v=20260924d" alt=""><img class="cat-symbol-dark" src="/assets/img/pulo%20do%20gato/luria_gato_tema_escuro.webp?v=20260924d" alt=""><img class="cat-symbol-pink" src="/assets/img/pulo%20do%20gato/luria_gato_tema_rosa.webp?v=20260924d" alt=""></span>
              <div><strong>${escape(data.ccqArea || "Dica clínica")}</strong><p>${escape(data.ccq)}</p><a href="/dashboard/">Ver explicação completa →</a></div>
            </div>
          </section>
        </div>
      </div>`;
  }



  function render() {
    frame = 0;
    if (!allowed.has(current)) current = "1";
    try {
      const data = snap();
      const bodyHtml = current === "5"
        ? layout5(data)
        : current === "4"
          ? layout4(data)
          : ({ "1": layout1, "2": layout2, "3": layout3 }[current])(data);
      const html = greeting() + bodyHtml;
      if (html && root.innerHTML !== html) root.innerHTML = html;
      document.querySelectorAll(".page > .luria-dashboard-spotlight").forEach(el => {
        if (!root.contains(el)) el.remove();
      });
      syncDashboardHeading();
      root.hidden = false;
      root.dataset.rendered = "true";

    } catch (error) {
      console.error("Falha ao renderizar layout do Dashboard:", error);
      root.hidden = false;
      root.dataset.rendered = "false";
      if (!root.innerHTML.trim()) {
        root.innerHTML = '<div class="dl5-shell"><div class="dl5-hero"><div><h2>Carregando Dashboard…</h2><p>Atualizando seus dados.</p></div></div></div>';
      }
      setTimeout(() => {
        if (root.dataset.rendered !== "true") schedule();
      }, 120);
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function apply() {
    let selected = "1";
    try { selected = localStorage.getItem(`luria:dashboard-layout:${window.docmapUser?.id || "guest"}`) || "1"; } catch {}
    const standalonePwa = document.documentElement.classList.contains("pwa-standalone")
      || window.matchMedia?.("(display-mode: standalone)")?.matches
      || window.navigator.standalone === true;
    const nextLayout = standalonePwa ? "4" : (allowed.has(selected) ? selected : "1");
    const sameLayout = dashboardAppliedOnce && current === nextLayout;
    current = nextLayout;
    if (!allowed.has(selected)) {
      try { localStorage.setItem(`luria:dashboard-layout:${window.docmapUser?.id || "guest"}`, "1"); } catch {}
    }
    document.body.dataset.dashboardLayout = current;

    // Evita recriar todo o Dashboard quando docmap:ready chega sem mudança de layout.
    if (sameLayout && root.dataset.rendered === "true") return;
    dashboardAppliedOnce = true;

    // O legado já fica oculto pelo CSS desde o primeiro frame.
    render();
  }
  function enhanceShell() {
    const topbar = page.querySelector(".topbar");
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
  window.addEventListener("docmap:ready", () => { apply(); enhanceShell(); loadDailyChallengeAccuracy(); }, { once: true });
  apply();
  enhanceShell();
  loadDailyChallengeAccuracy();
})();


/* PWA dashboard topbar v24 — controles perfeitamente alinhados */
(function(){
  const style=document.createElement("style");
  style.id="dashboard-pwa-topbar-align-v24";
  style.textContent=`
    @media(max-width:980px){
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar{
        align-items:center!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .menu-open,
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-pomodoro-toggle,
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-notification-toggle,
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-profile-toggle{
        width:44px!important;
        height:44px!important;
        min-width:44px!important;
        min-height:44px!important;
        flex:0 0 44px!important;
        margin:0!important;
        padding:0!important;
        align-self:center!important;
        box-sizing:border-box!important;
        border-radius:12px!important;
        transform:none!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .menu-open{
        position:relative!important;
        inset:auto!important;
        display:grid!important;
        place-items:center!important;
        font-size:21px!important;
        line-height:1!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-notifications{
        position:relative!important;
        inset:auto!important;
        height:44px!important;
        min-height:44px!important;
        display:flex!important;
        align-items:center!important;
        align-self:center!important;
        gap:8px!important;
        margin:0 0 0 auto!important;
        transform:none!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-pomodoro-top,
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-profile-top{
        height:44px!important;
        min-height:44px!important;
        display:flex!important;
        align-items:center!important;
        align-self:center!important;
        margin:0!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-pomodoro-icon,
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-pomodoro-icon svg{
        width:22px!important;
        height:22px!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-notification-toggle svg{
        width:22px!important;
        height:22px!important;
      }
      html.pwa-standalone body[data-page="dashboard"][data-dashboard-layout] .topbar .luria-profile-toggle{
        font-size:22px!important;
        line-height:1!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* DASHBOARD MASTER SHELL CHROME v15 — 2026-10-04 */
(() => {
  if (document.body?.dataset?.page !== "dashboard") return;

  function mountDashboardChrome() {
    if (window.innerWidth < 981) return;

    const shell = document.querySelector("body[data-page='dashboard'] .app-shell");
    const topbar = document.querySelector("body[data-page='dashboard'] .topbar");
    const sidebar = document.querySelector("body[data-page='dashboard'] #sidebar.sidebar");
    if (!shell || !topbar || !sidebar) return;

    // Move the actual functional topbar into the blue shell.
    // We move, not clone, so Search/Timer/Notifications/Profile keep all listeners.
    if (topbar.parentElement !== shell) {
      shell.appendChild(topbar);
    }
    topbar.classList.add("dashboard-shell-topbar");

    // The brand stays inside the sidebar but must be allowed to overflow upward
    // into the shell header.
    sidebar.classList.add("dashboard-shell-sidebar");
  }

  const boot = () => {
    mountDashboardChrome();
    setTimeout(mountDashboardChrome, 150);
    setTimeout(mountDashboardChrome, 500);
    setTimeout(mountDashboardChrome, 1200);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once:true });
  } else {
    boot();
  }

  new MutationObserver(() => mountDashboardChrome())
    .observe(document.documentElement, { childList:true, subtree:true });
})();
