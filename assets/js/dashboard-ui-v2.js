/* Dashboard presentation adapter: no shared controller, RPC or business-state writes. */
(() => {
  const body = document.body;
  if (body?.dataset.ui !== "v2" || body.dataset.page !== "dashboard" || body.dataset.uiContext !== "study") return;
  let reviewSection = null;
  let failedRender = false;
  let activeDialog = null;
  let dialogReturnFocus = null;
  const narrow = window.matchMedia("(max-width: 980px)");

  // Enhance regenerated markup without replacing functional nodes or their handlers.
  function enhanceContent() {
    const root = document.getElementById("dashboard-alternative");
    if (!root) return;
    const fallback = document.getElementById("dashboard-fallback-shell");
    if (fallback && root.dataset.rendered === "false") {
      fallback.hidden = false;
      if (!failedRender) {
        fallback.innerHTML = '<p class="ui-feedback" data-state="error" role="status">Não foi possível exibir este layout. <a href="/dashboard/">Tente novamente</a> ou <a href="/configuracoes/">escolha outro layout</a>.</p>';
        failedRender = true;
      }
    } else if (fallback && root.dataset.rendered === "true") {
      fallback.hidden = true;
    }
    const grid = root.querySelector(".dl-grid");
    const directStudy = grid?.querySelector(":scope > .dl-study-now-card");
    const directAgenda = grid?.querySelector(":scope > .dl-upcoming");
    if (directStudy && grid.firstElementChild !== directStudy) grid.prepend(directStudy);
    if (directAgenda && directStudy && directStudy.nextElementSibling !== directAgenda) directStudy.after(directAgenda);
    const nextCard = root.querySelector(".dl5-next");
    const nextStudy = nextCard?.querySelector("[data-traube-study-panel]");
    if (nextStudy && nextCard.firstElementChild !== nextStudy) nextCard.prepend(nextStudy);
    const layout5 = root.querySelector(".dl5-shell");
    const main5 = layout5?.querySelector(".dl5-mid");
    if (main5 && layout5.firstElementChild !== main5) layout5.prepend(main5);
    reviewSection ||= document.getElementById("ui-review-summary");
    const reviewAnchor = root.querySelector(".dl-agenda-study-pair, .dl-upcoming, .dl5-next");
    if (reviewSection && reviewAnchor && reviewAnchor.nextElementSibling !== reviewSection) reviewAnchor.after(reviewSection);
    const pair = root.querySelector(".dl-agenda-study-pair");
    const study = (pair || root.querySelector(".dl-grid"))?.querySelector(":scope > .dl-study-now-card");
    if (study && study.parentElement.firstElementChild !== study) study.parentElement.prepend(study);
    root.querySelectorAll("h3").forEach(title => {
      if (title.closest("[data-traube-study-panel]")) {
        title.setAttribute("role", "heading");
        title.setAttribute("aria-level", "2");
        return;
      }
      const heading = document.createElement("h2");
      for (const attr of title.attributes) heading.setAttribute(attr.name, attr.value);
      heading.append(...title.childNodes);
      title.replaceWith(heading);
    });
    root.querySelectorAll("[data-traube-study-time]").forEach(button => {
      const selected = String(button.classList.contains("active"));
      if (button.getAttribute("aria-pressed") !== selected) button.setAttribute("aria-pressed", selected);
    });
    root.querySelectorAll(".dl-area-track, .dl5-area-list i").forEach(track => {
      const row = track.parentElement;
      const percentage = row.querySelector("strong")?.textContent?.replace("%", "");
      if (!Number.isFinite(Number(percentage))) return;
      track.setAttribute("role", "progressbar");
      track.setAttribute("aria-label", row.querySelector("span")?.textContent || "Progresso por área");
      track.setAttribute("aria-valuemin", "0"); track.setAttribute("aria-valuemax", "100");
      track.setAttribute("aria-valuenow", percentage);
    });
    const streakSlot = document.querySelector(".ui-header-streak");
    const streakCard = root.querySelector(".dl-streak, .dl5-streak");
    if (streakSlot && streakCard) {
      const catCard = root.querySelector(".dl-cat, .dl5-cat");
      // Move the rendered nodes, preserving their data and attached handlers.
      if (catCard) streakCard.replaceWith(catCard);
      streakSlot.replaceChildren(streakCard);
    }
    refineCards(root.parentElement);
    enhanceStreaks(document);
    syncReviews();
    if (root.dataset.rendered === "true" && body.dataset.dashboardPresentationReady !== "true") {
      body.dataset.dashboardPresentationReady = "true";
      window.dispatchEvent(new Event("traube:dashboard-presentation-ready"));
    }
  }
  function refineCards(root) {
    const agenda = root.querySelector(".dl-agenda-large, .dl-upcoming");
    const summary = root.querySelector(".dl-day-summary");
    if (agenda && summary && summary.parentElement !== agenda) agenda.append(summary);
    if (summary) {
      const ring = summary.querySelector(".dl-ring");
      const percentage = ring?.querySelector("strong")?.textContent;
      if (ring && percentage) ring.setAttribute("aria-label", `${percentage} das aulas de hoje concluídas`);
      const completed = summary.querySelector(".dl-summary-body > div:not(.dl-ring) > span:first-of-type");
      if (completed && !completed.dataset.uiSummary) {
        completed.textContent = completed.textContent.replace(/^(\d+) concluída(s?)$/, "$1 aula$2 concluída$2");
        completed.dataset.uiSummary = "true";
      }
      const details = summary.querySelector(".dl-summary-body > div:not(.dl-ring)");
      const total = details?.querySelector(":scope > strong");
      if (total && !total.classList.contains("ui-summary-total")) total.classList.add("ui-summary-total");
      details?.querySelectorAll(":scope > span").forEach(row => {
        if (row.dataset.uiMetric) return;
        const parts = row.textContent.trim().match(/^(\d+)\s+(.+)$/);
        if (!parts) return;
        const number = document.createElement("strong"); number.textContent = parts[1];
        const label = document.createElement("span"); label.textContent = parts[2];
        row.replaceChildren(number, label); row.classList.add("ui-summary-stat"); row.dataset.uiMetric = "true";
      });
    }
    root.querySelectorAll(".dl-mini-list > span").forEach(row => {
      // These exact rows repeat the same metrics exposed by the quick links.
      if (/^(Flashcards pendentes|Erros ativos|Caderno de erros)/.test(row.textContent.trim())) row.hidden = true;
    });
  }
  function syncStreakActivity(card) {
    const week = card.querySelector(".dl-weekdays, .dl5-week");
    if (!week) return;
    const history = window.traubeDashboardWeekActivity;
    const hasHistory = history?.status === "available" && Array.isArray(history.dates);
    if (!week.dataset.uiWeek) {
      week.dataset.uiWeek = "true";
      week.setAttribute("role", "list");
    }
    const today = (new Date().getDay() + 6) % 7;
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - today);
    const names = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    const initials = ["S", "T", "Q", "Q", "S", "S", "D"];
    week.setAttribute("aria-label", hasHistory
      ? "Semana atual; atividade baseada nas sessões de estudo registradas"
      : "Semana atual; histórico diário de atividade indisponível");
    [...week.children].forEach((day, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const isToday = index === today;
      const isFuture = index > today;
      const isMarked = hasHistory && history.dates.includes(dateKey);
      day.classList.remove("active", "on");
      day.classList.toggle("ui-week-marked", isMarked);
      day.classList.toggle("ui-week-empty", hasHistory && !isMarked && !isFuture);
      day.classList.toggle("ui-week-today", isToday);
      day.classList.toggle("ui-week-future", isFuture);
      day.setAttribute("role", "listitem");
      const state = isFuture ? "dia futuro"
        : !hasHistory ? "histórico indisponível"
          : isMarked ? "atividade registrada"
            : "sem atividade registrada";
      const label = `${names[index]}${isToday ? ", hoje" : ""}; ${state}`;
      if (day.getAttribute("aria-label") !== label) day.setAttribute("aria-label", label);
      const title = `${names[index]}${isToday ? " · Hoje" : ""} · ${state}`;
      if (day.title !== title) day.title = title;
      if (isToday) day.setAttribute("aria-current", "date");
      else day.removeAttribute("aria-current");
      for (const node of day.childNodes) {
        if (node.nodeType === 3 && node.textContent) node.textContent = "";
      }
      const indicator = day.querySelector("i");
      if (indicator) {
        if (indicator.textContent !== initials[index]) indicator.textContent = initials[index];
        indicator.setAttribute("aria-hidden", "true");
      }
    });
    let legend = card.querySelector(".ui-streak-legend");
    if (!legend) {
      legend = document.createElement("div");
      legend.className = "ui-streak-legend";
      week.after(legend);
    }
    const legendMarkup = hasHistory
      ? '<span class="ui-streak-legend-item is-marked"><i aria-hidden="true"></i>Atividade registrada</span><span class="ui-streak-legend-item is-empty"><i aria-hidden="true"></i>Sem atividade</span><span class="ui-streak-legend-item is-today"><i aria-hidden="true"></i>Hoje</span>'
      : '<span class="ui-streak-legend-note">Histórico diário indisponível; dias sem marcação não confirmam ausência de atividade.</span><span class="ui-streak-legend-item is-today"><i aria-hidden="true"></i>Hoje</span>';
    if (legend.innerHTML !== legendMarkup) legend.innerHTML = legendMarkup;
  }
  function enhanceStreaks(root) {
    root.querySelectorAll(".dl-streak, .dl5-streak").forEach(card => {
      const heading = card.querySelector("h2, h3");
      if (heading && !heading.dataset.uiStreakHeading) {
        const flame = document.createElement("span"); flame.className = "ui-streak-emblem";
        flame.setAttribute("aria-hidden", "true");
        flame.innerHTML = '<svg viewBox="0 0 64 80" fill="currentColor"><path d="M34 3C35 15 26 19 26 29C26 35 30 38 33 40C27 40 22 35 21 29C13 37 8 46 8 56C8 69 18 77 32 77C46 77 56 68 56 54C56 41 48 30 40 22C39 30 36 34 32 36C35 27 43 18 34 3Z"/><path class="ui-streak-core" d="M33 40C27 47 23 52 23 59C23 67 27 71 33 71C40 71 44 66 44 59C44 52 39 47 35 43C35 48 33 51 30 53C31 48 34 45 33 40Z"/></svg>';
        heading.replaceChildren(flame, document.createTextNode("Sua ofensiva"));
        heading.dataset.uiStreakHeading = "true";
      }
      const value = card.querySelector(".dl-streak-value strong, .dl5-streak-copy strong");
      if (value && !value.dataset.uiStreak) {
        const days = value.textContent.trim().match(/^\d+/)?.[0];
        if (days !== undefined) {
          const number = document.createElement("span"); number.className = "ui-streak-number"; number.textContent = days;
          const label = document.createElement("span"); label.className = "ui-streak-label";
          label.textContent = Number(days) === 1 ? "dia seguido" : "dias seguidos";
          value.replaceChildren(number, label); value.dataset.uiStreak = "true";
          value.setAttribute("aria-label", `${days} ${label.textContent}`);
          const sibling = value.nextElementSibling;
          if (sibling?.textContent.trim() === "dias seguidos") sibling.remove();
        }
      }
      syncStreakActivity(card);
      const note = document.createElement("p"); note.className = "ui-streak-note";
      note.textContent = Number(value?.querySelector(".ui-streak-number")?.textContent) > 0
        ? "Continue construindo sua sequência!" : "Um dia de cada vez. Comece sua sequência.";
      if (!card.querySelector(".ui-streak-note")) card.append(note);
    });
  }
  function syncStreaks() {
    document.querySelectorAll("#dashboard-alternative .dl-streak, #dashboard-alternative .dl5-streak, .ui-header-streak .dl-streak, .ui-header-streak .dl5-streak").forEach(syncStreakActivity);
  }
  function syncReviews() {
    const review = document.getElementById("ui-review-summary");
    if (!review) return;
    for (const [id, metric] of [["ui-review-flashcards", "metric-flashcards"], ["ui-review-errors", "metric-errors"]]) {
      const output = document.getElementById(id);
      const value = window.traubeDashboardMetrics?.[metric];
      const text = value === undefined || value === null ? "—" : (String(value).match(/^\s*[\d.,\u00A0\s]+/)?.[0].trim() || String(value));
      if (output && output.textContent !== text) output.textContent = text;
      output?.setAttribute("aria-label", value === undefined || value === null ? "Dados indisponíveis" : String(value));
    }
    const lessons = document.getElementById("ui-review-lessons");
    const completed = window.traubeDashboardTodayLessons?.completed;
    const lessonText = completed === undefined || completed === null ? "—" : String(completed);
    if (lessons && lessons.textContent !== lessonText) lessons.textContent = lessonText;
    const copy = document.getElementById("ui-review-copy");
    const message = window.traubeDashboardMetrics?.["metric-flashcards"] === undefined
      ? "Aguardando os dados das suas revisões."
      : "Consulte seus flashcards e os erros registrados para planejar a revisão.";
    if (copy && copy.textContent !== message) copy.textContent = message;
  }
  // h3 is used by the existing session controller; keep it intact inside that panel.
  // Other card headings can use h2 without affecting consumers.
  const rootObserver = new MutationObserver(enhanceContent);
  function observeContent() {
    const root = document.getElementById("dashboard-alternative");
    if (!root) return;
    const header = document.querySelector(".ui-page-header");
    if (header) root.before(header);
    enhanceContent();
    rootObserver.observe(root, {childList: true, subtree: true, attributes: true, attributeFilter: ["class", "data-rendered"]});
    const topbar = document.querySelector(".topbar");
    if (topbar && window.ResizeObserver) {
      const sizeObserver = new ResizeObserver(() => {
        const height = `${topbar.getBoundingClientRect().height}px`;
        if (body.style.getPropertyValue("--ui-topbar-height") !== height) body.style.setProperty("--ui-topbar-height", height);
      });
      sizeObserver.observe(topbar);
    }
  }
  document.addEventListener("DOMContentLoaded", observeContent, {once: true});
  if (document.readyState !== "loading") observeContent();
  window.addEventListener("traube:dashboard-data", () => {
    syncReviews();
    syncStreaks();
  });

  function syncDialog() {
    if (typeof document === "undefined" || !body.isConnected) return;
    // Closed overlays can remain in the DOM; only a visible modal may disable
    // the application. Always repair stale inert state, even when activeDialog
    // and overlay are both null (common after iOS back-forward restoration).
    const overlay = [...document.querySelectorAll("#traube-session-overlay, #traube-search-overlay")]
      .filter(node => node.isConnected && !node.hidden && !node.closest("[hidden]") &&
        getComputedStyle(node).display !== "none" &&
        getComputedStyle(node).visibility !== "hidden").at(-1) || null;
    const shell = document.querySelector(".app-shell");
    const skip = document.querySelector(".ui-skip-link");
    if (shell && shell.inert !== !!overlay) shell.inert = !!overlay;
    if (skip && skip.inert !== !!overlay) skip.inert = !!overlay;
    if (activeDialog === overlay) return;
    if (!overlay) {
      activeDialog = null;
      if (dialogReturnFocus?.isConnected) dialogReturnFocus.focus();
      dialogReturnFocus = null;
      return;
    }
    if (!activeDialog) dialogReturnFocus = document.activeElement;
    activeDialog = overlay;
    const dialog = overlay.querySelector('[role="dialog"]');
    const title = overlay.querySelector("h2");
    if (title && dialog) { title.id = `${overlay.id}-title`; dialog.setAttribute("aria-labelledby", title.id); }
    const search = overlay.querySelector("#traube-search-input");
    if (search) search.setAttribute("aria-label", "Buscar páginas e ferramentas");
    (search || overlay.querySelector(".traube-intel-close"))?.focus();
  }
  new MutationObserver(syncDialog).observe(body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "style"]
  });
  window.addEventListener("pageshow", syncDialog);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncDialog();
  });

  function syncNavigation() {
    if (body.dataset.uiNav === "v2") return;
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("dashboard-content");
    const topbar = document.querySelector(".topbar");
    const opening = narrow.matches && body.classList.contains("sidebar-open");
    if (sidebar) {
      sidebar.inert = narrow.matches && !opening;
      if (narrow.matches) { sidebar.setAttribute("role", "dialog"); sidebar.setAttribute("aria-modal", "true"); sidebar.setAttribute("aria-label", "Navegação"); }
      else { sidebar.removeAttribute("role"); sidebar.removeAttribute("aria-modal"); sidebar.removeAttribute("aria-label"); }
    }
    if (main) main.inert = opening;
    if (topbar && !main?.contains(topbar)) topbar.inert = opening;
    const trigger = document.getElementById("menu-open");
    if (trigger) { trigger.setAttribute("aria-expanded", String(opening)); trigger.setAttribute("aria-controls", "sidebar"); }
    if (opening && sidebar && !sidebar.contains(document.activeElement)) sidebar.querySelector("button, a[href]")?.focus();
    if (!opening && sidebar?.contains(document.activeElement) && narrow.matches) trigger?.focus();
    document.querySelectorAll('#sidebar a[href="/dashboard/"]').forEach(link => link.setAttribute("aria-current", "page"));
  }
  narrow.addEventListener("change", syncNavigation);
  new MutationObserver(syncNavigation).observe(body, {attributes: true, attributeFilter: ["class"]});
  document.addEventListener("DOMContentLoaded", syncNavigation, {once: true});
  window.addEventListener("docmap:ready", syncNavigation);
  document.addEventListener("keydown", event => {
    if (activeDialog) {
      if (event.key === "Escape") { event.preventDefault(); activeDialog.querySelector(".traube-intel-close")?.click(); return; }
      if (event.key === "Tab") {
        const controls = [...activeDialog.querySelectorAll('a[href],button:not([disabled]),input,select,textarea')].filter(node => node.getClientRects().length && !node.hidden);
        if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
      }
      return;
    }
    if (body.dataset.uiNav === "v2") return;
    if (event.key === "Escape") {
      for (const [panelId, triggerId] of [["traube-profile-menu", "traube-profile-toggle"], ["traube-pomodoro-panel", "traube-pomodoro-toggle"], ["traube-notification-panel", "traube-notification-toggle"]]) {
        const panel = document.getElementById(panelId);
        const trigger = document.getElementById(triggerId);
        if (panel && !panel.hidden && trigger) { trigger.click(); trigger.focus(); }
      }
    }
    if (event.key === "Escape" && narrow.matches && body.classList.contains("sidebar-open")) {
      event.preventDefault(); body.classList.remove("sidebar-open"); syncNavigation(); document.getElementById("menu-open")?.focus();
    }
    if (event.key !== "Tab" || !narrow.matches || !body.classList.contains("sidebar-open")) return;
    const nodes = [...document.querySelectorAll('#sidebar a[href], #sidebar button:not([disabled])')].filter(node => !node.hidden && node.getClientRects().length);
    if (!nodes.length) return;
    if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); }
  });
})();
