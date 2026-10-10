/* Opt-in shell only. Existing authentication, permissions, timers and links remain owned by app.js. */
(() => {
  const body = document.body;
  if (body?.dataset.uiNav !== "v2") return;
  const work = body.dataset.uiContext === "work";
  const narrow = matchMedia("(max-width: 980px)");
  let drawerOpen = false;
  let profileOpen = false;
  let scheduled = false;
  const set = (node, name, value) => {
    if (node && node.getAttribute(name) !== String(value)) node.setAttribute(name, String(value));
  };
  const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const menuIcon = icon('<path d="M4 6h16M4 12h16M4 18h16"/>');
  const sparkles = icon('<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z"/>');
  const flame = icon('<path d="M12 3c1 4-3 5-3 8 0 1 .5 2 1.5 2.5C11 11 13 10 13 8c4 3 6 5 6 8a7 7 0 0 1-14 0c0-3 2-5 4-7-.5 2 0 3 1 4"/>');
  const focusable = root => [...(root?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])') || [])]
    .filter(node => !node.hidden && node.getClientRects().length && !node.closest('[inert]'));

  function themes() {
    const node = document.createElement("div");
    node.className = "ui-profile-themes";
    node.innerHTML = '<fieldset><legend>Aparência</legend><div class="ui-theme-segment"><button type="button" data-ui-theme-control="appearance" value="light">Claro</button><button type="button" data-ui-theme-control="appearance" value="dark">Escuro</button></div></fieldset><fieldset><legend>Cor do tema</legend><div class="ui-theme-segment"><button type="button" data-ui-theme-control="identity" value="blue">Azul</button><button type="button" data-ui-theme-control="identity" value="pink">Rosa</button></div></fieldset>';
    return node;
  }
  function enhanceProfile(sidebar) {
    const menu = document.getElementById("luria-profile-menu");
    const toggle = document.getElementById("luria-profile-toggle");
    if (!menu) return;
    set(toggle, "aria-controls", menu.id);
    if (!menu.querySelector(".ui-profile-name")) {
      const name = document.createElement("strong"); name.className = "ui-profile-name";
      const environment = document.createElement("div"); environment.className = "ui-profile-environment";
      const title = document.createElement("span"); title.textContent = "Ambiente";
      const options = document.createElement("div"); options.className = "ui-environment-options";
      environment.append(title, options);
      menu.prepend(name, environment, themes());
      if (!document.getElementById("ui-theme-status")) {
        const status = document.createElement("p"); status.id = "ui-theme-status";
        status.className = "ui-sr-only"; status.setAttribute("role", "status"); menu.append(status);
      }
    }
    const accountItems = [
      ['a[href="/configuracoes/#perfil"]', '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>'],
      ['[data-restart-onboarding]', '<path d="M4 10a8 8 0 1 1 1 9M4 4v6h6"/>'],
      ['a[href="/configuracoes/"]', '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>'],
      ['#luria-profile-logout', '<path d="M9 4H4v16h5M13 8l4 4-4 4M8 12h13"/>']
    ];
    for (const [selector, paths] of accountItems) {
      const item = menu.querySelector(selector);
      if (!item || item.classList.contains("ui-profile-account-item")) continue;
      item.classList.add("ui-profile-account-item");
      const visual = document.createElement("span");
      visual.className = "ui-profile-item-icon"; visual.innerHTML = icon(paths);
      item.prepend(visual);
    }
    if (!menu.querySelector(".ui-profile-account-label")) {
      const first = menu.querySelector(".ui-profile-account-item");
      if (first) {const title = document.createElement("span"); title.className = "ui-profile-account-label"; title.textContent = "Conta"; first.before(title);}
    }
    const name = menu.querySelector(".ui-profile-name");
    const displayName = window.docmapProfile?.display_name || "Sua conta";
    if (name.textContent !== displayName) name.textContent = displayName;
    // The existing conditional link is the authority for access to the other environment.
    const source = sidebar?.querySelector(".luria-mode-footer-switch");
    const destination = source?.getAttribute("href") || "";
    const options = menu.querySelector(".ui-environment-options");
    const signature = `${work}:${destination}`;
    if (options.dataset.source !== signature) {
      options.dataset.source = signature;
      const current = document.createElement("a");
      current.href = work ? "/trabalho/" : "/dashboard/";
      current.textContent = work ? "Trabalho" : "Estudos";
      current.setAttribute("aria-current", "page");
      const other = source ? source.cloneNode(false) : document.createElement("button");
      other.className = ""; other.removeAttribute("id");
      other.textContent = work ? "Estudos" : "Trabalho";
      other.setAttribute("aria-label", `Trocar para o ambiente ${other.textContent}`);
      if (!source) { other.type = "button"; other.disabled = true; other.title = "Ambiente indisponível para esta conta"; }
      options.replaceChildren(...(work ? [other, current] : [current, other]));
    }
    const legacyThemes = document.querySelector('.theme-options');
    if (!work && legacyThemes && !legacyThemes.previousElementSibling?.classList.contains("ui-profile-themes")) legacyThemes.before(themes());
    window.LuriaUITheme?.refresh();
  }
  function enhanceStreak(sidebar, center) {
    if (work || !center) return;
    let indicator = document.getElementById("ui-topbar-streak");
    if (!indicator) {
      indicator = document.createElement("span"); indicator.id = "ui-topbar-streak";
      indicator.className = "ui-topbar-streak";
      indicator.innerHTML = flame + '<span class="ui-topbar-streak-value" data-streak-value>—</span><span class="ui-topbar-streak-unit">dias</span>';
      indicator.title = "Sua sequência de dias no Luria"; center.prepend(indicator);
    }
    const source = sidebar?.querySelector("[data-sidebar-streak-card] [data-streak-value]");
    const count = window.luriaCurrentStreak;
    const current = indicator.querySelector(".ui-topbar-streak-value");
    const realValue = typeof count === "number" && Number.isFinite(count) ? String(count) : source?.textContent.trim();
    if (realValue && current.textContent !== realValue) current.textContent = realValue;
    const output = indicator.querySelector("[data-streak-value], .ui-topbar-streak-value");
    const value = output?.textContent.trim() || "—";
    const unit = value === "1" ? "dia" : "dias";
    const label = indicator.querySelector(".ui-topbar-streak-unit");
    if (label.textContent !== unit) label.textContent = unit;
    set(indicator, "aria-label", value === "—" ? "Ofensiva: aguardando dados" : `Ofensiva: ${value} ${unit}`);
  }
  // Release only the inert state owned by the navigation drawer. In particular,
  // a hidden or persistent search overlay must not leave all page buttons disabled.
  function setDrawerInert(node, blocked) {
    if (!node) return;
    if (blocked && !node.inert) {
      node.inert = true;
      node.dataset.uiDrawerInert = "true";
    } else if (!blocked && node.dataset.uiDrawerInert === "true") {
      node.inert = false;
      delete node.dataset.uiDrawerInert;
    }
  }
  function syncDrawer() {
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector("main.main");
    const bar = document.querySelector(".topbar");
    const trigger = document.getElementById("menu-open");
    const open = narrow.matches && body.classList.contains("sidebar-open");

    if (sidebar) {
      if (sidebar.inert !== (narrow.matches && !open)) sidebar.inert = narrow.matches && !open;
      if (narrow.matches) { set(sidebar, "role", "dialog"); set(sidebar, "aria-modal", "true"); set(sidebar, "aria-label", "Navegação"); }
      else { for (const attr of ["role", "aria-modal", "aria-label"]) if (sidebar.hasAttribute(attr)) sidebar.removeAttribute(attr); }
    }
    setDrawerInert(main, open);
    setDrawerInert(bar, open);
    set(trigger, "aria-expanded", narrow.matches ? open : body.dataset.uiSidebar !== "collapsed");
    set(trigger, "aria-controls", "sidebar");
    set(trigger, "aria-label", narrow.matches ? (open ? "Fechar navegação" : "Abrir navegação") : (body.dataset.uiSidebar === "collapsed" ? "Expandir navegação" : "Recolher navegação"));
    if (open && !drawerOpen) focusable(sidebar)[0]?.focus();
    if (!open && drawerOpen) trigger?.focus();
    drawerOpen = open;
  }
  function enhance() {
    const sidebar = document.getElementById("sidebar");
    const bar = document.querySelector(".topbar");
    if (bar) {
      const shell = document.querySelector(".app-shell");
      const heading = bar.querySelector(".page-heading");
      if (!work && body.dataset.page !== "dashboard" && body.dataset.uiHeading !== "provided" && heading && heading.textContent.trim() && !document.querySelector("main .luria-page-spotlight, main .book-hero, main .settings-page-head")) {
        heading.classList.add("ui-page-heading"); document.querySelector("main.main > .page")?.prepend(heading);
      }
      if (shell && bar.parentElement !== shell) shell.prepend(bar);
      let trigger = document.getElementById("menu-open");
      if (!trigger) { trigger = document.createElement("button"); trigger.id = "menu-open"; trigger.type = "button"; trigger.className = "menu-open"; bar.prepend(trigger); }
      if (!trigger.dataset.uiControl) { trigger.innerHTML = menuIcon; trigger.dataset.uiControl = "true"; }
      if (!bar.querySelector(".ui-context-label")) {
        const context = document.createElement("span"); context.className = "ui-context-label";
        context.textContent = work ? "Trabalho" : "Estudos"; trigger.after(context);
      }
    }
    sidebar?.querySelectorAll("nav a[href]").forEach(link => {
      if (link.dataset.uiNavLabel) return;
      const label = link.textContent.trim();
      link.dataset.uiNavLabel = label; if (!link.title) link.title = label;
      if (!link.hasAttribute("aria-label")) set(link, "aria-label", label);
      if (link.classList.contains("active")) set(link, "aria-current", "page");
    });
    const alex = document.getElementById("luria-alex-topbar");
    if (alex && !alex.dataset.uiIcon) {
      const visual = document.createElement("span"); visual.className = "ui-alex-icon"; visual.innerHTML = sparkles;
      alex.prepend(visual); alex.dataset.uiIcon = "true";
    }
    enhanceProfile(sidebar);
    enhanceStreak(sidebar, document.getElementById("luria-notifications"));
    syncDrawer();
    const menu = document.getElementById("luria-profile-menu");
    const open = !!menu && !menu.hidden;
    if (open && !profileOpen) focusable(menu)[0]?.focus();
    profileOpen = open;
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhance(); });
  }
  document.addEventListener("click", event => {
    const trigger = event.target.closest("#menu-open, #sidebar-close, #sidebar-backdrop");
    if (!trigger) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (trigger.id === "menu-open" && !narrow.matches) {
      body.dataset.uiSidebar = body.dataset.uiSidebar === "collapsed" ? "expanded" : "collapsed";
      body.classList.remove("sidebar-open");
    } else body.classList.toggle("sidebar-open", trigger.id === "menu-open" && !body.classList.contains("sidebar-open"));
    syncDrawer();
  }, true);
  document.addEventListener("keydown", event => {
    if (document.querySelector("#luria-session-overlay, #luria-search-overlay")) return;
    if (event.key === "Escape") {
      if (drawerOpen) { event.preventDefault(); body.classList.remove("sidebar-open"); syncDrawer(); return; }
      for (const [panel, trigger] of [["luria-profile-menu", "luria-profile-toggle"], ["luria-pomodoro-panel", "luria-pomodoro-toggle"], ["luria-notification-panel", "luria-notification-toggle"]]) {
        const popup = document.getElementById(panel);
        if (popup && !popup.hidden) { event.preventDefault(); document.getElementById(trigger)?.click(); document.getElementById(trigger)?.focus(); break; }
      }
    }
    if (event.key !== "Tab" || !drawerOpen) return;
    const controls = focusable(document.getElementById("sidebar"));
    if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
  });
  narrow.addEventListener("change", () => { body.classList.remove("sidebar-open"); enhance(); });
  window.addEventListener("docmap:ready", enhance);
  window.addEventListener("luria:dashboard-data", schedule);
  document.addEventListener("DOMContentLoaded", enhance, {once:true});
  new MutationObserver(schedule).observe(body, {subtree:true, childList:true, attributes:true, attributeFilter:["class", "hidden"]});
  if (document.readyState !== "loading") enhance();
})();
