
// Sidebar mobile/PWA unificado: uma única dimensão em todas as páginas.
(function ensureUnifiedMobileSidebar() {
  if (document.getElementById("luria-unified-mobile-sidebar")) return;

  const style = document.createElement("style");
  style.id = "luria-unified-mobile-sidebar";
  style.textContent = `
    @media (max-width: 980px) {
      html.pwa-standalone body #sidebar.sidebar {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: min(86vw, 290px) !important;
        height: 100vh !important;
        height: 100dvh !important;
        padding:
          max(30px, calc(env(safe-area-inset-top) + 12px))
          18px
          calc(18px + env(safe-area-inset-bottom))
          18px !important;
        background: var(--sidebar) !important;
        border-right: 1px solid var(--border) !important;
        box-shadow: var(--shadow) !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        transform: translateX(-105%) !important;
        transition: transform 180ms ease !important;
        z-index: 260 !important;
      }

      html.pwa-standalone body.sidebar-open #sidebar.sidebar {
        transform: translateX(0) !important;
      }

      html.pwa-standalone body #sidebar.sidebar .sidebar-top {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 10px !important;
        min-height: 0 !important;
        margin-bottom: 24px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .brand {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        min-width: 0 !important;
        overflow: visible !important;
      }

      html.pwa-standalone body #sidebar.sidebar .brand-logo-single,
      html.pwa-standalone body #sidebar.sidebar .luria-theme-logo,
      html.pwa-standalone body #sidebar.sidebar .brand-logo-stack {
        width: 54px !important;
        height: 54px !important;
        flex: 0 0 54px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .brand-copy {
        display: grid !important;
        min-width: 0 !important;
      }

      html.pwa-standalone body #sidebar.sidebar .brand-copy strong {
        font-size: 17px !important;
        line-height: normal !important;
      }

      html.pwa-standalone body #sidebar.sidebar .brand-copy small {
        display: block !important;
        margin-top: 0 !important;
        font-size: 11px !important;
        line-height: normal !important;
      }

      html.pwa-standalone body #sidebar.sidebar .sidebar-close {
        display: inline-grid !important;
        place-items: center !important;
        width: auto !important;
        height: auto !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        color: var(--text) !important;
        font-size: 28px !important;
        line-height: 1 !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav {
        display: grid !important;
        gap: 6px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-link,
      html.pwa-standalone body #sidebar.sidebar .nav-group-label {
        min-height: 44px !important;
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 0 12px !important;
        border-radius: 11px !important;
        font-size: 14px !important;
        font-weight: 650 !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-icon {
        width: 20px !important;
        font-size: 17px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-group {
        margin: 2px 0 !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-group-chevron {
        font-size: 14px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-submenu {
        display: grid !important;
        gap: 3px !important;
        margin: 2px 0 7px 42px !important;
        padding: 0 !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-submenu[hidden] {
        display: none !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-group-chevron {
        margin-left: auto !important;
        transition: transform 160ms ease !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-group-collapsed .nav-group-chevron {
        transform: rotate(-90deg) !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav-sublink {
        min-height: 36px !important;
        display: flex !important;
        align-items: center !important;
        padding: 0 10px !important;
        border-radius: 9px !important;
        font-size: 13px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .sidebar-footer {
        display: grid !important;
        gap: 12px !important;
        margin-top: auto !important;
        padding-top: 20px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        min-width: 0 !important;
        min-height: 72px !important;
        padding: 8px 9px !important;
        border-radius: 11px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-icon {
        width: 64px !important;
        height: 64px !important;
        flex: 0 0 64px !important;
        display: grid !important;
        place-items: center !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-flame {
        max-width: 60px !important;
        max-height: 64px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-snow {
        max-width: 60px !important;
        max-height: 60px !important;
        font-size: 42px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-copy {
        flex: 1 1 auto !important;
        min-width: 0 !important;
        overflow: hidden !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-copy strong,
      html.pwa-standalone body #sidebar.sidebar .streak-mini-copy small {
        max-width: 100% !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-copy strong {
        font-size: 12px !important;
        line-height: 1.15 !important;
        white-space: nowrap !important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-copy small {
        font-size: 9px !important;
        line-height: 1.15 !important;
        white-space: normal !important;
      }

      html.pwa-standalone body #sidebar.sidebar .user-mini {
        display: flex !important;
        align-items: center !important;
        gap: 11px !important;
        min-height: 0 !important;
        padding: 11px !important;
        border: 1px solid var(--border) !important;
        border-radius: 12px !important;
        background: var(--surface) !important;
      }

      html.pwa-standalone body #sidebar.sidebar .user-avatar {
        width: 34px !important;
        height: 34px !important;
        flex: 0 0 34px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .user-copy strong {
        font-size: 13px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .user-copy small {
        display: block !important;
        margin-top: 2px !important;
        font-size: 11px !important;
        line-height: normal !important;
      }

      html.pwa-standalone body #sidebar.sidebar .logout-button {
        min-height: 40px !important;
        border-radius: 10px !important;
        font-size: 13px !important;
        font-weight: 700 !important;
      }

      html.pwa-standalone body .sidebar-backdrop {
        z-index: 250 !important;
        background: rgba(0, 0, 0, .36) !important;
        backdrop-filter: none !important;
      }
    }
  `;

  style.textContent += `
    #sidebar.sidebar .work-pcr-button {
      display:flex;align-items:center;justify-content:center;gap:12px;width:100%;
      min-height:82px;padding:14px 16px;box-sizing:border-box;border:2px solid #ff4d4d;
      border-radius:16px;background:#d40000;color:#fff;text-decoration:none;
      box-shadow:0 10px 26px rgba(212,0,0,.34);font-weight:950;letter-spacing:.04em;
      transition:transform 140ms ease,box-shadow 140ms ease,background 140ms ease;
    }
    #sidebar.sidebar .work-pcr-button:hover{background:#ee0000;transform:translateY(-1px);box-shadow:0 14px 32px rgba(212,0,0,.42)}
    #sidebar.sidebar .work-pcr-button:active{transform:scale(.99)}
    #sidebar.sidebar .work-pcr-icon{display:grid;place-items:center;width:46px;height:46px;flex:0 0 46px;border-radius:50%;background:rgba(255,255,255,.16);font-size:28px}
    #sidebar.sidebar .work-pcr-copy{display:grid;gap:3px;min-width:0}
    #sidebar.sidebar .work-pcr-copy strong{color:#fff;font-size:20px;line-height:1}
    #sidebar.sidebar .work-pcr-copy small{color:rgba(255,255,255,.94);font-size:10px;font-weight:850}
    @media(max-width:980px){html.pwa-standalone body #sidebar.sidebar .work-pcr-button{min-height:88px!important}}
  `;

  style.textContent += `
    /* Trabalho: somente a lista de páginas rola; PCR + usuário permanecem fixos. */
    body[data-page^="trabalho_"] #sidebar.sidebar {
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-top {
      flex: 0 0 auto !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .nav {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      overscroll-behavior: contain;
      padding-right: 4px;
      scrollbar-width: thin;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-footer {
      flex: 0 0 auto !important;
      margin-top: 12px !important;
      padding-top: 12px !important;
      padding-bottom: max(4px, env(safe-area-inset-bottom)) !important;
      background: var(--sidebar) !important;
      position: relative !important;
      z-index: 3 !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button,
    body[data-page^="trabalho_"] #sidebar.sidebar .user-mini,
    body[data-page^="trabalho_"] #sidebar.sidebar .logout-button {
      flex-shrink: 0 !important;
    }

    @media (max-width: 980px) {
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar {
        overflow: hidden !important;
      }

      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .nav {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-footer {
        margin-top: 10px !important;
        padding-top: 10px !important;
      }
    }
  `;
  style.dataset.workSidebarFixedFooter = "1";

  style.textContent += `
    #sidebar.sidebar .luria-mode-footer-switch {
      text-decoration:none !important;
      cursor:pointer !important;
      color:#fff !important;
      border-color:color-mix(in srgb,#184888 35%,#d7e0eb) !important;
      background:#184888 !important;
      box-shadow:0 10px 30px rgba(17,65,130,.12) !important;
      transition:transform 140ms ease,border-color 140ms ease,filter 140ms ease,box-shadow 140ms ease !important;
    }
    #sidebar.sidebar .luria-mode-footer-switch:hover {
      transform:translateY(-1px);
      border-color:color-mix(in srgb,#184888 55%,#d7e0eb) !important;
      background:#184888 !important;
      box-shadow:0 12px 32px rgba(17,65,130,.18) !important;
      filter:brightness(1.04);
    }
    #sidebar.sidebar .luria-mode-footer-switch .user-copy strong,
    #sidebar.sidebar .luria-mode-footer-switch .user-copy small {
      color:#fff !important;
    }
    #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon {
      color:#fff !important;
      background:rgba(255,255,255,.14) !important;
    }
    :root[data-theme="leila-mood"] #sidebar.sidebar .luria-mode-footer-switch,
    body.theme-leila-mood #sidebar.sidebar .luria-mode-footer-switch {
      border-color:color-mix(in srgb,var(--accent) 35%,var(--border)) !important;
      background:var(--accent-strong) !important;
      box-shadow:0 10px 30px color-mix(in srgb,var(--accent) 18%,transparent) !important;
    }
    :root[data-theme="leila-mood"] #sidebar.sidebar .luria-mode-footer-switch:hover,
    body.theme-leila-mood #sidebar.sidebar .luria-mode-footer-switch:hover {
      border-color:color-mix(in srgb,var(--accent) 55%,var(--border)) !important;
      background:var(--accent-strong) !important;
      box-shadow:0 12px 32px color-mix(in srgb,var(--accent) 24%,transparent) !important;
    }
    #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon svg {
      width:20px;
      height:20px;
      display:block;
      fill:none;
      stroke:currentColor;
      stroke-width:1.9;
      stroke-linecap:round;
      stroke-linejoin:round;
    }
    .luria-profile-top { position:relative; display:flex; align-items:center; }
    .luria-profile-toggle {
      width:52px;height:52px;border:1px solid var(--border);border-radius:50%;
      display:grid;place-items:center;background:var(--surface);color:var(--accent);
      font:900 16px/1 inherit;cursor:pointer;
    }
    .luria-profile-menu {
      position:absolute;right:0;top:48px;z-index:400;min-width:190px;padding:7px;
      border:1px solid var(--border);border-radius:13px;background:var(--surface);
      box-shadow:0 16px 42px rgba(0,0,0,.16);
    }
    .luria-profile-menu[hidden]{display:none!important}
    .luria-profile-menu a,.luria-profile-menu button {
      width:100%;min-height:40px;box-sizing:border-box;display:flex;align-items:center;
      padding:0 11px;border:0;border-radius:9px;background:transparent;color:var(--text);
      text-decoration:none;font:700 13px/1 inherit;text-align:left;cursor:pointer;
    }
    .luria-profile-menu a:hover,.luria-profile-menu button:hover{background:var(--surface-2)}
    .luria-profile-theme-row {
      display:flex;align-items:center;justify-content:space-between;gap:10px;
      min-height:44px;padding:0 8px 7px 11px;margin-bottom:4px;
      border-bottom:1px solid var(--border);color:var(--text);
    }
    .luria-profile-theme-row>span {
      font:700 12px/1 inherit;color:var(--muted);
    }
    .luria-theme-switch {
      width:auto!important;min-width:92px!important;min-height:32px!important;height:32px!important;
      padding:0 9px!important;border:1px solid var(--border)!important;border-radius:999px!important;
      display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;
      background:var(--surface-2)!important;color:var(--text)!important;
      font:800 11px/1 inherit!important;
    }
    .luria-theme-switch::before {
      content:"";width:10px;height:10px;border-radius:50%;background:var(--accent);
      box-shadow:0 0 0 3px var(--accent-soft);flex:0 0 10px;
    }
    :root[data-theme="dark"] .luria-theme-switch::before{background:#7eb6e8}
    :root[data-theme="leila-mood"] .luria-theme-switch::before{background:#e7357d}
  `;

  style.textContent += `
    .luria-notifications {
      display:flex !important;
      align-items:center !important;
      gap:12px !important;
      margin-left:auto !important;
    }
    .luria-top-controls-drag-handle {
      display:none;
      width:28px;
      height:48px;
      min-width:28px;
      border:1px dashed var(--border);
      border-radius:10px;
      background:color-mix(in srgb,var(--surface) 92%,transparent);
      color:var(--muted);
      place-items:center;
      padding:0;
      cursor:grab;
      touch-action:none;
      user-select:none;
      -webkit-user-select:none;
      font:900 15px/1 inherit;
      letter-spacing:-3px;
    }
    .luria-top-controls-drag-handle:active {
      cursor:grabbing;
    }
    .luria-notifications.luria-top-controls-dragging {
      user-select:none!important;
      -webkit-user-select:none!important;
    }
    @media (min-width:981px) {
      .luria-top-controls-drag-handle {
        display:grid;
      }
    }
    .luria-pomodoro-top,.luria-profile-top {
      position:relative;
      display:flex;
      align-items:center;
    }
    .luria-pomodoro-toggle {
      min-width:172px;
      height:52px;
      display:flex;
      align-items:center;
      gap:12px;
      padding:0 17px;
      border:1px solid var(--border);
      border-radius:11px;
      background:var(--surface);
      color:var(--text);
      box-shadow:0 1px 2px rgba(15,23,42,.03);
      cursor:pointer;
      text-align:left;
    }
    .luria-pomodoro-toggle:hover,
    .luria-pomodoro-toggle[aria-expanded="true"] {
      border-color:var(--accent);
      background:var(--accent-soft);
      color:var(--accent);
    }
    .luria-pomodoro-icon {
      width:31px;height:31px;display:grid;place-items:center;flex:0 0 31px;
    }
    .luria-pomodoro-icon svg {
      width:31px;height:31px;fill:none;stroke:currentColor;stroke-width:1.8;
      stroke-linecap:round;stroke-linejoin:round;
    }
    .luria-pomodoro-copy { display:grid; line-height:1.05; }
    .luria-pomodoro-copy strong { font-size:15px; font-weight:850; }
    .luria-pomodoro-copy small { margin-top:2px; font-size:13.5px; color:var(--muted); font-weight:850; }

    .luria-notification-toggle,
    .luria-profile-toggle {
      width:52px !important;
      height:52px !important;
      min-width:52px !important;
      border-radius:14px !important;
    }

    .luria-notification-toggle svg {
      width:18px !important;
      height:18px !important;
    }

    .luria-profile-toggle {
      border:1px solid var(--border) !important;
      background:var(--surface) !important;
      color:var(--accent) !important;
      font:900 28px/1 inherit !important;
    }

    .luria-pomodoro-panel {
      position:absolute;
      right:0;
      top:60px;
      z-index:420;
      width:220px;
      padding:14px;
      border:1px solid var(--border);
      border-radius:14px;
      background:var(--surface);
      box-shadow:0 16px 42px rgba(0,0,0,.16);
    }
    .luria-pomodoro-panel[hidden]{display:none!important}
    .luria-pomodoro-panel header { display:flex; justify-content:space-between; }
    .luria-pomodoro-panel header strong { display:block; font-size:13px; }
    .luria-pomodoro-panel header small { color:var(--muted); font-size:9px; }
    .luria-pomodoro-time { margin:14px 0; font-size:34px; font-weight:900; letter-spacing:-.04em; }
    .luria-pomodoro-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .luria-pomodoro-actions button {
      min-height:36px;border:1px solid var(--border);border-radius:9px;background:var(--surface-2);
      color:var(--text);font-weight:800;
    }
    .luria-pomodoro-modes {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:7px;
      margin-top:12px;
    }
    .luria-pomodoro-modes button {
      min-height:34px;
      border:1px solid var(--border);
      border-radius:9px;
      background:var(--surface-2);
      color:var(--muted);
      font-weight:800;
      cursor:pointer;
    }
    .luria-pomodoro-modes button[aria-pressed="true"] {
      border-color:var(--accent);
      background:var(--accent);
      color:#fff;
    }
    .luria-timer-switch {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:6px;
      padding:4px;
      margin:10px 0 12px;
      border:1px solid var(--border);
      border-radius:11px;
      background:var(--surface-2);
    }
    .luria-timer-switch button {
      min-height:34px;
      border:0;
      border-radius:8px;
      background:transparent;
      color:var(--muted);
      font-weight:850;
      cursor:pointer;
    }
    .luria-timer-switch button[aria-pressed="true"] {
      background:var(--surface);
      color:var(--accent);
      box-shadow:0 1px 4px rgba(15,23,42,.08);
    }
    .luria-timer-view[hidden]{display:none!important}
    .luria-stopwatch-note {
      display:block;
      margin:-5px 0 12px;
      color:var(--muted);
      font-size:10px;
      line-height:1.35;
    }
    .luria-pomodoro-fields {
      display:grid;
      gap:8px;
      margin:10px 0 12px;
    }
    .luria-pomodoro-fields label {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      color:var(--muted);
      font-size:11px;
      font-weight:700;
    }
    .luria-pomodoro-fields label > span:last-child {
      display:flex;
      align-items:center;
      gap:5px;
    }
    .luria-pomodoro-fields input {
      width:58px;
      min-height:32px;
      padding:4px 6px;
      border:1px solid var(--border);
      border-radius:8px;
      background:var(--surface);
      color:var(--text);
      text-align:center;
      font:inherit;
    }
    .luria-pomodoro-save {
      width:100%;
      min-height:36px;
      margin-top:8px;
      border:1px solid var(--accent);
      border-radius:9px;
      background:var(--accent);
      color:#fff;
      font-weight:800;
      cursor:pointer;
    }
    .luria-pomodoro-status {
      display:block;
      min-height:15px;
      margin-top:7px;
      color:var(--muted);
      font-size:10px;
      line-height:1.35;
    }

    #luria-notification-toggle svg {
      width:18px !important;
      height:18px !important;
    }

    /* Afastar Pomodoro e sino do perfil */
    .luria-pomodoro-top { margin-right:2px; }
    #luria-notification-toggle { margin-right:4px; }

    /* Cabeçalho global unificado: Timer + notificações + perfil */
    .topbar {
      min-height:52px !important;
      align-items:flex-start !important;
      overflow:visible !important;
    }

    /* Posição dos controles superiores é definida no CSS global carregado no <head>. */

/* Iniciais: peso forte padronizado em todo o LURIA. */
    .luria-profile-toggle,
    .user-avatar {
      font-weight:950 !important;
      letter-spacing:-.045em !important;
      font-family:inherit !important;
      font-variant-numeric:normal !important;
    }
    .topbar .page-heading {
      align-self:flex-start !important;
    }
    .topbar .luria-notifications {
      margin-left:auto !important;
      display:flex !important;
      align-items:center !important;
      gap:10px !important;
    }
    .topbar .luria-pomodoro-top,
    .topbar .luria-profile-top,
    .topbar .luria-notification-toggle {
      align-self:center !important;
      margin-top:0 !important;
      margin-bottom:0 !important;
    }

    /* Desktop: geometria do grupo controlada exclusivamente por luria-brand-v5.css. */

/* v17.37 — dimensões dos controles; posição fica no CSS global.
       Dashboard mantém seu cabeçalho próprio. */
    @media (min-width:981px) {
      body:not([data-page="dashboard"]) .topbar {
        min-height:26px !important;
        height:26px !important;
        margin-bottom:14px !important;
      }
      body:not([data-page="dashboard"]) .topbar .luria-notifications {
        position:static !important;
        inset:auto !important;
        top:auto !important;
        right:auto !important;
        margin-left:auto !important;
        transform:none !important;
        translate:none !important;
        gap:10px !important;
      }
      body:not([data-page="dashboard"]) .luria-pomodoro-toggle {
        min-width:164px !important;
        height:48px !important;
        padding:0 14px !important;
        gap:10px !important;
        border-radius:12px !important;
      }
      body:not([data-page="dashboard"]) .luria-pomodoro-icon,
      body:not([data-page="dashboard"]) .luria-pomodoro-icon svg {
        width:22px !important;
        height:22px !important;
      }
      body:not([data-page="dashboard"]) .luria-pomodoro-copy strong {
        font-size:13px !important;
      }
      body:not([data-page="dashboard"]) .luria-pomodoro-copy small {
        font-size:11px !important;
      }
      body:not([data-page="dashboard"]) .luria-notification-toggle,
      body:not([data-page="dashboard"]) .luria-profile-toggle {
        width:48px !important;
        height:48px !important;
        min-width:48px !important;
        border-radius:12px !important;
      }
      body:not([data-page="dashboard"]) .luria-notification-toggle svg,
      body:not([data-page="dashboard"]) #luria-notification-toggle svg {
        width:20px !important;
        height:20px !important;
      }
      body:not([data-page="dashboard"]) .luria-profile-toggle {
        font-size:17px !important;
      }
      /* A borda direita do perfil acompanha a borda direita do card de conteúdo. */
      body:not([data-page="dashboard"]) .page {
        --luria-top-controls-right:34px;
      }
      body:not([data-page="dashboard"]) .page > .luria-page-spotlight,
      body:not([data-page="dashboard"]) .page > .schedule-top-spotlight {
        margin-top:0 !important;
      }
    }

    @media(max-width:760px){
      .luria-notifications{gap:9px!important}
      .luria-pomodoro-toggle{min-width:125px;height:52px;padding:0 10px}
      .luria-pomodoro-copy strong{display:none}
      .luria-pomodoro-copy small{margin:0;font-size:10px}
    }

    /* PWA: viewport preso; topo sempre visível; conteúdo rola por baixo. */
    @media (max-width:980px) {
      html.pwa-standalone,
      html.pwa-standalone body {
        width:100%;
        max-width:100%;
        height:100%;
        min-height:100%;
        overflow:hidden!important;
        overscroll-behavior:none!important;
      }

      html.pwa-standalone body .app-shell {
        width:100%;
        max-width:100vw;
        height:100vh;
        height:100dvh;
        min-height:0!important;
        overflow:hidden!important;
      }

      html.pwa-standalone body .main {
        width:100%;
        max-width:100vw;
        height:100vh;
        height:100dvh;
        min-height:0!important;
        overflow:hidden!important;
        padding-top:max(10px, env(safe-area-inset-top))!important;
        padding-bottom:max(10px, env(safe-area-inset-bottom))!important;
      }

      html.pwa-standalone body .page {
        width:100%;
        max-width:100%;
        height:100%;
        min-height:0;
        overflow-x:hidden!important;
        overflow-y:auto!important;
        overscroll-behavior-x:none!important;
        overscroll-behavior-y:contain!important;
        -webkit-overflow-scrolling:touch;
      }

      html.pwa-standalone body .topbar {
        position:sticky!important;
        top:0!important;
        z-index:240!important;
        display:flex!important;
        align-items:center!important;
        min-height:52px!important;
        margin-bottom:10px!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        overflow:visible!important;
      }

      html.pwa-standalone body .topbar .luria-notifications {
        position:static!important;
        inset:auto!important;
        display:flex!important;
        align-items:center!important;
        margin-left:auto!important;
        align-self:center!important;
        top:auto!important;
        right:auto!important;
        transform:none!important;
        translate:none!important;
        z-index:auto!important;
      }

      html.pwa-standalone body .topbar .luria-profile-top,
      html.pwa-standalone body .topbar .luria-notification-toggle {
        display:flex!important;
        visibility:visible!important;
        opacity:1!important;
      }

      html.pwa-standalone body:not([data-page^="trabalho_"]) .topbar .luria-pomodoro-top {
        display:flex!important;
        visibility:visible!important;
        opacity:1!important;
      }

      html.pwa-standalone body[data-page^="trabalho_"] .topbar .luria-pomodoro-top {
        display:none!important;
      }

      html.pwa-standalone body .luria-notification-panel,
      html.pwa-standalone body .luria-profile-menu,
      html.pwa-standalone body .luria-pomodoro-panel {
        z-index:500!important;
      }
    }
  `;


  style.textContent += `
    /* LURIA global trays — always above page content and simulator overlays. */
    .topbar,
    .topbar-actions,
    .luria-notifications,
    .luria-pomodoro-top,
    .luria-profile-top {
      overflow:visible!important;
    }

    .luria-notification-panel,
    .luria-pomodoro-panel,
    .luria-profile-menu {
      z-index:2147483000!important;
      isolation:isolate;
      border-color:var(--border)!important;
      background:var(--surface)!important;
      color:var(--text)!important;
      box-shadow:0 22px 64px rgba(4,18,33,.24)!important;
    }

    .luria-pomodoro-panel {
      color:var(--text)!important;
    }
    .luria-pomodoro-panel header strong,
    .luria-pomodoro-time {
      color:var(--text)!important;
    }
    .luria-pomodoro-panel header small,
    .luria-stopwatch-note,
    .luria-pomodoro-fields label {
      color:var(--muted)!important;
    }
    .luria-pomodoro-panel input {
      border-color:var(--border)!important;
      background:var(--surface-2)!important;
      color:var(--text)!important;
    }
    .luria-pomodoro-actions button,
    .luria-pomodoro-modes button {
      border-color:var(--border)!important;
      background:var(--surface-2)!important;
      color:var(--text)!important;
    }
    .luria-pomodoro-actions button:hover,
    .luria-pomodoro-modes button:hover {
      border-color:var(--accent)!important;
      background:var(--accent-soft)!important;
      color:var(--accent)!important;
    }
    .luria-pomodoro-modes button[aria-pressed="true"] {
      border-color:var(--accent)!important;
      background:var(--accent)!important;
      color:#fff!important;
    }
    .luria-timer-switch {
      border-color:var(--border)!important;
      background:var(--surface-2)!important;
    }
    .luria-timer-switch button {
      color:var(--muted)!important;
    }
    .luria-timer-switch button[aria-pressed="true"] {
      background:var(--surface)!important;
      color:var(--accent)!important;
      box-shadow:0 1px 5px rgba(15,23,42,.10)!important;
    }

    /* Keep the trigger row itself above page stacking contexts. */
    .topbar {
      z-index:2147482000!important;
    }
  `;


  style.textContent += `
    /* Sidebar fixa e compacta — sem rolagem interna. */
    #sidebar.sidebar {
      overflow:hidden !important;
      display:flex !important;
      flex-direction:column !important;
    }

    #sidebar.sidebar .sidebar-top {
      flex:0 0 auto !important;
      margin-bottom:14px !important;
    }

    #sidebar.sidebar .nav,
    #sidebar.sidebar .nav-study,
    body[data-page^="trabalho_"] #sidebar.sidebar .nav {
      flex:0 1 auto !important;
      min-height:0 !important;
      overflow:visible !important;
      padding-right:0 !important;
      scrollbar-width:none !important;
      gap:3px !important;
    }

    #sidebar.sidebar .nav-link,
    #sidebar.sidebar .nav-group-label {
      min-height:38px !important;
      gap:10px !important;
      padding:0 10px !important;
      border-radius:9px !important;
      font-size:13.8px !important;
      line-height:1.15 !important;
    }

    #sidebar.sidebar .nav-icon {
      width:18px !important;
      font-size:15.5px !important;
    }

    #sidebar.sidebar .nav-group {
      margin:1px 0 !important;
    }

    #sidebar.sidebar .nav-submenu {
      gap:2px !important;
      margin:2px 0 5px 34px !important;
    }

    #sidebar.sidebar .nav-sublink {
      min-height:31px !important;
      padding:0 8px !important;
      border-radius:7px !important;
      font-size:12.6px !important;
      line-height:1.15 !important;
    }

    #sidebar.sidebar .sidebar-footer,
    #sidebar.sidebar .sidebar-footer-study,
    #sidebar.sidebar .sidebar-footer-work,
    body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-footer {
      flex:0 0 auto !important;
      margin-top:auto !important;
      padding-top:8px !important;
      gap:7px !important;
      overflow:visible !important;
    }

    #sidebar.sidebar .streak-mini {
      min-height:58px !important;
      padding:6px 8px !important;
      gap:6px !important;
    }

    #sidebar.sidebar .streak-mini-icon {
      width:48px !important;
      height:48px !important;
      flex:0 0 48px !important;
    }

    #sidebar.sidebar .streak-mini-flame {
      max-width:46px !important;
      max-height:50px !important;
    }

    #sidebar.sidebar .streak-mini-snow {
      font-size:34px !important;
    }

    #sidebar.sidebar .streak-mini-copy strong {
      font-size:11px !important;
    }

    #sidebar.sidebar .streak-mini-copy small {
      font-size:8.5px !important;
    }

    #sidebar.sidebar .luria-mode-footer-switch {
      min-height:48px !important;
      padding:7px 9px !important;
      gap:9px !important;
    }

    #sidebar.sidebar .luria-mode-footer-switch .user-avatar {
      width:30px !important;
      height:30px !important;
      flex:0 0 30px !important;
    }

    #sidebar.sidebar .luria-mode-footer-switch .user-copy strong {
      font-size:12px !important;
    }

    #sidebar.sidebar .luria-mode-footer-switch .user-copy small {
      font-size:9.5px !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button {
      min-height:62px !important;
      padding:9px 11px !important;
      gap:9px !important;
      border-radius:13px !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-icon {
      width:36px !important;
      height:36px !important;
      flex:0 0 36px !important;
      font-size:22px !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-copy strong {
      font-size:17px !important;
    }

    body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-copy small {
      font-size:8px !important;
    }

    @media (max-width:980px) {
      html.pwa-standalone body #sidebar.sidebar {
        overflow:hidden !important;
        padding:
          max(22px, calc(env(safe-area-inset-top) + 8px))
          15px
          calc(12px + env(safe-area-inset-bottom))
          15px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .sidebar-top {
        margin-bottom:12px !important;
      }

      html.pwa-standalone body #sidebar.sidebar .nav,
      html.pwa-standalone body #sidebar.sidebar .nav-study,
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .nav {
        overflow:visible !important;
        -webkit-overflow-scrolling:auto !important;
      }
    }

    @media (max-height:720px) {
      #sidebar.sidebar .nav-link,
      #sidebar.sidebar .nav-group-label {
        min-height:32px !important;
        font-size:12px !important;
      }

      #sidebar.sidebar .nav-sublink {
        min-height:25px !important;
        font-size:11px !important;
      }

      #sidebar.sidebar .streak-mini {
        min-height:50px !important;
      }

      #sidebar.sidebar .streak-mini-icon {
        width:40px !important;
        height:40px !important;
        flex-basis:40px !important;
      }

      body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button {
        min-height:54px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();

const sb = window.supabaseClient;

const PAGE_INFO = {
  dashboard: { title: "Dashboard", eyebrow: "Visão geral", helper: "Seu dia de estudos em um só lugar." },
  sessao_estudo: { title: "Sessão de estudo do dia", eyebrow: "Estudar agora", helper: "Complete as etapas planejadas para hoje no seu ritmo." },
  cronograma: { title: "Cronograma", eyebrow: "Aulas e compromissos", helper: "Organize o que estudar e quando revisar." },
  aprender: { title: "Aprender", eyebrow: "Central de aprendizagem", helper: "Escolha como você quer aprender agora." },
  consolidar: { title: "Consolidar", eyebrow: "Fixação e prática", helper: "Revise, pratique e transforme conteúdo em conhecimento utilizável." },
  caderno: { title: "Anotações", eyebrow: "Notas e materiais", helper: "Registre, organize e encontre o que importa." },
  professor_alex: { title: "Professor Alex", eyebrow: "Aula guiada", helper: "Aprenda, tire dúvidas e transforme seu material em uma aula." },
  flashcards: { title: "Flashcards", eyebrow: "Revisão ativa", helper: "Revise no ritmo certo e fortaleça a memória." },
  erros: { title: "Caderno de erros", eyebrow: "Estudar", helper: "Transforme seus erros em revisão direcionada." },
  questoes: { title: "Questões e Simulados", eyebrow: "Prática e provas", helper: "Treine, meça seu desempenho e evolua." },
  plantao: { title: "Simulador de Emergência", eyebrow: "Simulação clínica", helper: "Treine decisões clínicas em cenários realistas de urgência e emergência." },
  desafio: { title: "Desafio Diário", eyebrow: "Caso do dia", helper: "Uma hipótese por dia para manter o raciocínio afiado." },
  estatisticas: { title: "Estatísticas", eyebrow: "Seu desempenho", helper: "Acompanhe sua evolução e ajuste sua estratégia." },
  editais: { title: "Editais / Provas", eyebrow: "Provas e editais", helper: "Centralize datas, provas e informações importantes." },
  amigos: { title: "Amigos", eyebrow: "Rede de estudos", helper: "Estude junto, compartilhe e acompanhe sua rede." },
  configuracoes: { title: "Configurações", eyebrow: "Sua conta", helper: "Personalize sua experiência no LURIA." },
  admin: { title: "Admin", eyebrow: "Gestão LURIA", helper: "Gerencie conteúdo, acessos e operação da plataforma." },
  beta_testers: { title: "Beta Testers", eyebrow: "Feedback beta", helper: "Acompanhe sugestões e pontos de melhoria." },
  trabalho_dashboard: { title: "Dashboard", eyebrow: "Rotina clínica", helper: "Acesse rapidamente as ferramentas do seu dia." },
  trabalho_gestor_plantoes: { title: "Gestor de Plantões", eyebrow: "Escalas e plantões", helper: "Organize sua rotina de plantões em um só lugar." },
  trabalho_plantoes: { title: "Escala", eyebrow: "Plantões e horários", helper: "Visualize e organize seus plantões." },
  trabalho_passometro: { title: "Passômetro", eyebrow: "Passos e evolução", helper: "Estruture a passagem de plantão com clareza." },
  trabalho_prontuario_rapido: { title: "Cola rápida", eyebrow: "Consulta rápida", helper: "Tenha informações essenciais à mão." },
  trabalho_pcr_historico: { title: "Histórico de PCR", eyebrow: "Atendimentos", helper: "Pacientes, registros e linhas do tempo." },
  trabalho_pcr: { title: "Parada cardiorrespiratória", eyebrow: "PCR e condutas", helper: "Consulte rapidamente passos e condutas críticas." },
  trabalho_financeiro: { title: "Financeiro", eyebrow: "Ganhos e controle", helper: "Acompanhe receitas e organização dos plantões." },
  trabalho_calculadora: { title: "Calculadoras", eyebrow: "Cálculos clínicos", helper: "Faça cálculos clínicos de forma rápida e prática." },
  trabalho_bulario: { title: "Bulário", eyebrow: "Medicamentos e doses", helper: "Consulte apresentações, doses e informações essenciais." },
  trabalho_divisor_plantao: { title: "Divisor de Plantão", eyebrow: "Divisão de horários", helper: "Distribua horários de forma simples e equilibrada." },
  trabalho_diagnostico: { title: "Diagnóstico por Sintomas", eyebrow: "Sintomas e hipóteses", helper: "Organize hipóteses a partir dos principais sintomas." },
  trabalho_laboratorio: { title: "Laboratório", eyebrow: "Exames e interpretação", helper: "Consulte exames e pontos-chave de interpretação." },
  trabalho_prescricao: { title: "Prescrição", eyebrow: "Prescrições e doses", helper: "Acesse esquemas práticos para a rotina clínica." },
  trabalho_protocolos: { title: "Protocolos", eyebrow: "Protocolos e condutas", helper: "Consulte fluxos e condutas de forma objetiva." },
  trabalho_ecg: { title: "ECG", eyebrow: "Traçados e ritmo", helper: "Revise ritmos e achados eletrocardiográficos." },
  trabalho_fluidos: { title: "Fluidos e eletrólitos", eyebrow: "Reposição e correção", helper: "Calcule e revise reposições com segurança." },
  trabalho_receitas: { title: "Tratamentos gerais", eyebrow: "Receitas e condutas", helper: "Encontre tratamentos práticos para situações frequentes." },
  trabalho_exames: { title: "Exames", eyebrow: "Exames e investigação", helper: "Organize a investigação complementar de forma prática." },
  trabalho_scores: { title: "Scores", eyebrow: "Escores clínicos", helper: "Calcule escores e apoie sua tomada de decisão." },
  trabalho_antimicrobianos: { title: "Antimicrobianos", eyebrow: "Antibióticos e esquemas", helper: "Consulte esquemas, doses e ajustes importantes." },
};


const PAGE_FEATURES = {
  dashboard: "dashboard",
  cronograma: "cronograma",
  aprender: "dashboard",
  consolidar: "dashboard",
  caderno: "caderno",
  flashcards: "flashcards",
  erros: "error_notebook",
  questoes: "questions",
  plantao: "plantao",
  estatisticas: "statistics_general"
};

const PLUS_NAV_FEATURES = {
  "/flashcards/": "flashcards",
  "/questoes-simulados/": "questions",
  "/registrar-questoes/": "questions",
  "/plantao/": "plantao",
  "/plantao/sala-emergencia/": "plantao",
  "/estatisticas/": "statistics_general"
};

const page = document.body.dataset.page || "dashboard";
let currentThemeSetting = "system";
let systemThemeListener = null;

function profileCacheKey(userId) {
  return `docmap:profile:${userId}`;
}

function themeCacheKey(userId) {
  return `docmap:theme:${userId}`;
}

function entitlementsCacheKey(userId) {
  return `docmap:entitlements:${userId}`;
}

function adminCacheKey(userId) {
  return `docmap:admin:${userId}`;
}

function readFreshCache(key, maxAgeMs) {
  const cached = readLocalJson(key);
  if (!cached || !cached.saved_at) return null;
  if (Date.now() - Number(cached.saved_at) > maxAgeMs) return null;
  return cached.value ?? null;
}

function writeTimedCache(key, value) {
  writeLocalJson(key, { value, saved_at: Date.now() });
}

function readLocalJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function writeLocalJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function readCachedProfile(userId) {
  return readLocalJson(profileCacheKey(userId));
}

function writeCachedProfile(userId, profile) {
  if (!profile) return;
  writeLocalJson(profileCacheKey(userId), profile);
}

function readCachedTheme(userId) {
  try {
    return localStorage.getItem(themeCacheKey(userId));
  } catch {
    return null;
  }
}

function writeCachedTheme(userId, theme) {
  try {
    localStorage.setItem(themeCacheKey(userId), theme);
  } catch {}
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProfileTitle(gender) {
  if (gender === "male") return "Dr.";
  if (gender === "female") return "Dra.";
  return "";
}

const LURIA_ICON_PATHS = {
  dashboard: '<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="15" width="7" height="5" rx="1.5"/><rect x="14" y="15" width="7" height="5" rx="1.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
  target: '<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><circle cx="11" cy="13" r="1" fill="currentColor" stroke="none"/><path d="m13 11 8-8m-5 0h5v5"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-5L4 8m0-5v5h5M4 13a8 8 0 0 0 14 5l2-2m0 5v-5h-5"/>',
  chart: '<rect x="3" y="13" width="3" height="8" rx="1" fill="currentColor" stroke="none"/><rect x="10" y="8" width="3" height="13" rx="1" fill="currentColor" stroke="none"/><rect x="17" y="3" width="3" height="18" rx="1" fill="currentColor" stroke="none"/>',
  book: '<path d="M12 6c-2.7-2-5.7-2.5-9-2v15c3.3-.5 6.3 0 9 2 2.7-2 5.7-2.5 9-2V4c-3.3-.5-6.3 0-9 2Zm0 0v15"/>',
  file: '<path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm8 0v5h5M8 12h8M8 16h8"/>',
  cards: '<rect x="7" y="3" width="14" height="15" rx="2"/><path d="M17 18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2m3 2h8m-8 4h6"/>',
  notebook: '<rect x="6" y="2" width="15" height="20" rx="2"/><path d="M10 7h7m-7 4h7m-7 4h5M3 6h5M3 11h5M3 16h5"/>',
  simulation: '<path d="M6 2h9l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm9 0v5h5M9 12h7m-7 4h7"/>',
  stethoscope: '<path d="M6 3v7a4 4 0 0 0 8 0V3M4 3h4m4 0h4m-6 11v2a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  more: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>'
};

function luriaIcon(name, className = "") {
  const path = LURIA_ICON_PATHS[name] || LURIA_ICON_PATHS.file;
  return `<svg class="luria-ui-icon ${className}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

window.LuriaIcon = luriaIcon;

function luriaUserInitials(user, profile = null) {
  const fallbackName = user?.email
    ? String(user.email).split("@")[0]
    : "Usuário";

  const rawName =
    String(profile?.display_name || fallbackName || "")
      .trim()
      .replace(/\s+/g, " ");

  const parts = rawName
    .split(" ")
    .map(part => part.trim())
    .filter(Boolean);

  if (!parts.length) return "U";

  const first = parts[0].charAt(0).toUpperCase();

  if (parts.length === 1) {
    return first || "U";
  }

  const last = parts[parts.length - 1].charAt(0).toUpperCase();

  return `${first}${last}` || first || "U";
}

function updateLuriaProfileInitials(user = window.docmapUser, profile = window.docmapProfile) {
  const toggle = document.getElementById("luria-profile-toggle");
  if (!toggle) return;

  const initials = luriaUserInitials(user, profile);
  toggle.textContent = initials;
  toggle.setAttribute("aria-label", `Perfil de ${profile?.display_name || user?.email || "usuário"}`);
}

function sidebarMarkup(user, profile = null, isAdmin = false, entitlements = null) {
  const sidebarPlan = String(entitlements?.plan || window.docmapPlan || "").trim().toLowerCase();
  const canAccessWork = isAdmin === true || ["plus", "pro", "betatester"].includes(sidebarPlan);
  const fallbackName = user.email
    ? user.email.split("@")[0]
    : "Usuário";

  const rawName =
    profile?.display_name?.trim()
    || fallbackName;

  const specialty =
    profile?.specialty?.trim()
    || "Especialidade não definida";

  const title = getProfileTitle(profile?.gender);

  const sidebarName =
    title
      ? `${title} ${rawName}`
      : rawName;

  const initial =
    rawName.charAt(0).toUpperCase() || "U";

  return `
    <div class="sidebar-top">
      <a class="brand" href="/dashboard/">
        <img
          id="luria-brand-logo"
          class="brand-logo-single luria-theme-logo"
          src="${luriaLogoSourceForTheme(document.documentElement.dataset.theme || "light")}"
          alt="Logo LURIA"
        >

        <span class="brand-copy">
          <strong>LURIA</strong>
          <small>Aprenda. Conecte. Consolide.</small>
        </span>
      </a>
      <div class="sidebar-top-actions">
        <button class="sidebar-close" id="sidebar-close" type="button" aria-label="Fechar menu">×</button>
      </div>
    </div>

    <nav class="nav ${String(page).startsWith("trabalho_") ? "nav-work" : "nav-study"}">
      ${String(page).startsWith("trabalho_") ? `
        <a class="nav-link ${page === "trabalho_dashboard" ? "active" : ""}" href="/trabalho/">
          <span class="nav-icon">◫</span><span>Dashboard</span>
        </a>

        <a class="nav-link ${page === "trabalho_passometro" ? "active" : ""}" href="/trabalho/passometro/">
          <span class="nav-icon">⌁</span><span>Passômetro</span>
        </a>

        <a class="nav-link ${page === "trabalho_prontuario_rapido" ? "active" : ""}" href="/trabalho/prontuario-rapido/">
          <span class="nav-icon">▧</span><span>Cola rápida</span>
        </a>

        <a class="nav-link ${["trabalho_prescricao","trabalho_bulario","trabalho_protocolos","trabalho_receitas","trabalho_antimicrobianos"].includes(page) ? "active" : ""}" href="/trabalho/prescricao/">
          <span class="nav-icon">✎</span><span>Prescrição</span>
        </a>

        <a class="nav-link ${page === "trabalho_calculadora" ? "active" : ""}" href="/trabalho/calculadora/">
          <span class="nav-icon">∑</span><span>Calculadoras</span>
        </a>

        <a class="nav-link ${page === "trabalho_scores" ? "active" : ""}" href="/trabalho/scores/">
          <span class="nav-icon">#</span><span>Scores</span>
        </a>

        <a class="nav-link ${["trabalho_diagnostico","trabalho_exames","trabalho_laboratorio","trabalho_ecg"].includes(page) ? "active" : ""}" href="/trabalho/diagnostico/">
          <span class="nav-icon">⌕</span><span>Diagnóstico por Sintomas</span>
        </a>
        <a class="nav-link ${page === "trabalho_fluidos" ? "active" : ""}" href="/trabalho/fluidos-eletrólitos/">
          <span class="nav-icon">≈</span><span>Fluidos e eletrólitos</span>
        </a>

        <a class="nav-link ${["trabalho_gestor_plantoes","trabalho_plantoes","trabalho_divisor_plantao","trabalho_financeiro"].includes(page) ? "active" : ""}" href="/trabalho/gestor-plantoes/">
          <span class="nav-icon">▦</span><span>Gestor de Plantões</span>
        </a>
        <a class="nav-link" href="/trabalho/pcr/historico/"><span class="nav-icon">◷</span><span>Histórico de PCR</span></a>
        <span id="admin-nav-slot"></span>
      ` : `
        <a class="nav-link ${page === "dashboard" ? "active" : ""}" href="/dashboard/">
          <span class="nav-icon">${luriaIcon("dashboard")}</span><span>Dashboard</span>
        </a>

        <a class="nav-link ${page === "cronograma" ? "active" : ""}" href="/cronograma/">
          <span class="nav-icon">${luriaIcon("calendar")}</span><span>Cronograma</span>
        </a>

        <a class="nav-link ${page === "aprender" ? "active" : ""}" href="/aprender/">
          <span class="nav-icon">${luriaIcon("book")}</span><span>Aprender</span>
        </a>

        <a class="nav-link ${page === "consolidar" ? "active" : ""}" href="/consolidar/">
          <span class="nav-icon">${luriaIcon("cards")}</span><span>Consolidar</span>
        </a>

        <a class="nav-link ${page === "desafio" ? "active" : ""}" href="/desafio-diario/">
          <span class="nav-icon">${luriaIcon("target")}</span><span>Desafio Diário</span>
        </a>

        <a class="nav-link ${page === "plantao" ? "active" : ""}" href="/plantao/sala-emergencia/">
          <span class="nav-icon">${luriaIcon("stethoscope")}</span><span>Simulador de Emergência</span>
        </a>

        <a class="nav-link ${page === "estatisticas" ? "active" : ""}" href="/estatisticas/">
          <span class="nav-icon">${luriaIcon("chart")}</span><span>Estatísticas</span>
        </a>

        <a class="nav-link ${page === "editais" ? "active" : ""}" href="/editais/">
          <span class="nav-icon">${luriaIcon("simulation")}</span><span>Editais e Provas</span>
        </a>

        <a class="nav-link ${page === "amigos" ? "active" : ""}" href="/amigos/">
          <span class="nav-icon">${luriaIcon("users")}</span><span>Amigos</span>
        </a>

        <span id="admin-nav-slot"></span>
      `}
    </nav>

    <div class="sidebar-footer ${String(page).startsWith("trabalho_") ? "sidebar-footer-work" : "sidebar-footer-study"}">
      ${String(page).startsWith("trabalho_") ? `
        <a class="work-pcr-button" href="/trabalho/pcr/" aria-label="Abrir Parada cardiorrespiratória">
          <span class="work-pcr-icon" aria-hidden="true">✚</span>
          <span class="work-pcr-copy">
            <strong>PCR</strong>
            <small>PARADA CARDIORRESPIRATÓRIA</small>
          </span>
        </a>

        <a class="user-mini luria-mode-footer-switch"
           href="/dashboard/"
           aria-label="Trocar do ambiente Trabalho para Estudos">
          <div class="user-avatar luria-mode-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M6 3v7a4 4 0 0 0 8 0V3"></path>
              <path d="M4 3h4M12 3h4"></path>
              <path d="M10 14v2a4 4 0 0 0 8 0v-2"></path>
              <circle cx="18" cy="12" r="2"></circle>
            </svg>
          </div>
          <div class="user-copy">
            <strong>Trabalho</strong>
            <small>Trocar ambiente</small>
          </div>
        </a>
      ` : `
        <div class="streak-mini" data-sidebar-streak-card>
          <div class="streak-mini-icon" aria-hidden="true">
            <span class="streak-mini-snow">❄</span>
            <svg class="streak-mini-flame" viewBox="0 0 64 80" role="presentation">
              <path fill="currentColor" d="M34 3C35 15 26 19 26 29C26 35 30 38 33 40C27 40 22 35 21 29C13 37 8 46 8 56C8 69 18 77 32 77C46 77 56 68 56 54C56 41 48 30 40 22C39 30 36 34 32 36C35 27 43 18 34 3Z"></path>
              <path class="streak-mini-core" d="M33 40C27 47 23 52 23 59C23 67 27 71 33 71C40 71 44 66 44 59C44 52 39 47 35 43C35 48 33 51 30 53C31 48 34 45 33 40Z"></path>
            </svg>
          </div>
          <div class="streak-mini-copy">
            <strong data-sidebar-streak-copy><span data-streak-value>—</span> dias</strong>
            <small data-sidebar-streak-status>Comece hoje</small>
          </div>
        </div>

        ${canAccessWork ? `        <a class="user-mini luria-mode-footer-switch"
           href="/trabalho/"
           aria-label="Trocar do ambiente Estudos para Trabalho">
          <div class="user-avatar luria-mode-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"></path>
              <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5v-16Z"></path>
            </svg>
          </div>
          <div class="user-copy">
            <strong>Estudos</strong>
            <small>Trocar ambiente</small>
          </div>
        </a>` : ""}
      `}
    </div>
  `;
}

async function carregarPerfil(userId) {
  const cached = readCachedProfile(userId);

  const { data, error } = await sb
    .from("profiles")
    .select("display_name, gender, specialty")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.warn("Não foi possível carregar o perfil:", error.message);
    return cached || null;
  }

  if (data) {
    writeCachedProfile(userId, data);
    return data;
  }

  return cached || null;
}

function luriaLogoSourceForTheme(theme) {
  if (theme === "dark") {
    return "/assets/img/logos/logo-icone-azul-claro.png?v=luria11";
  }

  if (theme === "leila-mood" || theme === "pink" || theme === "rosa") {
    return "/assets/img/logos/logo-icone-rosa-escuro.png?v=luria11";
  }

  return "/assets/img/logos/logo-icone-original.png?v=luria11";
}


function updateLuriaLogo(theme) {
  const logo =
    document.getElementById(
      "luria-brand-logo"
    );

  if (!logo) {
    return;
  }

  const source =
    luriaLogoSourceForTheme(theme);

  if (
    logo.getAttribute("src")
    !== source
  ) {
    logo.setAttribute(
      "src",
      source
    );
  }
}


function applyResolvedTheme(theme) {
  document.documentElement.dataset.theme =
    theme;

  updateLuriaLogo(
    theme
  );
}

function stopSystemThemeListener() {
  if (systemThemeListener) {
    const { media, handler } = systemThemeListener;
    media.removeEventListener("change", handler);
    systemThemeListener = null;
  }
}

function applyThemeSetting(setting) {
  currentThemeSetting = setting || "system";
  stopSystemThemeListener();

  if (currentThemeSetting === "system") {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => applyResolvedTheme(media.matches ? "dark" : "light");
    apply();
    media.addEventListener("change", apply);
    systemThemeListener = { media, handler: apply };
    return;
  }

  applyResolvedTheme(currentThemeSetting);
}

async function carregarTema(userId) {
  const cachedTheme = readCachedTheme(userId);
  const themeFetchedAtKey = `docmap:theme-fetched-at:${userId}`;
  const themeFetchedAt = Number(localStorage.getItem(themeFetchedAtKey) || 0);
  const themeCacheFresh = cachedTheme && (Date.now() - themeFetchedAt < 6 * 60 * 60 * 1000);

  if (cachedTheme) {
    applyThemeSetting(cachedTheme);
  }

  // Tema não é dado de autorização. Evita consultar user_settings a cada troca de página.
  if (themeCacheFresh) {
    return cachedTheme;
  }

  const { data, error } = await sb
    .from("user_settings")
    .select("theme")
    .eq("user_id", userId)
    .maybeSingle();

  if (!error && data?.theme) {
    writeCachedTheme(userId, data.theme);
    localStorage.setItem(themeFetchedAtKey, String(Date.now()));
    applyThemeSetting(data.theme);
    return data.theme;
  }

  if (!cachedTheme) {
    applyThemeSetting("system");
  }

  return cachedTheme || "system";
}

async function salvarTema(theme) {
  const { data: sessionData } = await sb.auth.getSession();
  const userId = sessionData.session?.user?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await sb
    .from("user_settings")
    .upsert(
      {
        user_id: userId,
        theme
      },
      {
        onConflict: "user_id"
      }
    )
    .select("theme")
    .single();

  if (error) throw error;

  const savedTheme = data?.theme || theme;

  writeCachedTheme(userId, savedTheme);
  localStorage.setItem(`docmap:theme-fetched-at:${userId}`, String(Date.now()));
  applyThemeSetting(savedTheme);
}

function prepararConfiguracoes() {
  const form = document.getElementById("theme-form");
  const status = document.getElementById("theme-status");

  if (!form) return;

  const radio = form.querySelector(`input[name="theme"][value="${currentThemeSetting}"]`);
  if (radio) radio.checked = true;

  form.addEventListener("change", async (event) => {
    if (event.target.name !== "theme") return;

    status.textContent = "Salvando...";

    try {
      await salvarTema(event.target.value);
      status.textContent = "Tema salvo.";
    } catch (error) {
      console.error(error);
      status.textContent = "Não foi possível salvar o tema.";
    }
  });
}


function lofiStateKey(userId) {
  return `docmap:lofi:${userId}`;
}

function readLofiState(userId) {
  return readLocalJson(lofiStateKey(userId)) || {};
}

function writeLofiState(userId, state) {
  writeLocalJson(
    lofiStateKey(userId),
    state
  );
}

function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = String(total % 60).padStart(2, "0");

  return `${minutes}:${rest}`;
}

async function carregarAudioTracks() {
  const { data, error } = await sb
    .from("app_audio_tracks")
    .select(
      "id,title,storage_bucket,storage_path,loop_enabled,active,sort_order"
    )
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn(
      "Não foi possível carregar os sons do LURIA:",
      error.message
    );
    return [];
  }

  return data || [];
}

async function carregarAudioPreferido(userId) {
  const { data, error } = await sb
    .from("user_settings")
    .select("preferred_audio_track_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.warn(
      "Não foi possível carregar o som preferido:",
      error.message
    );
    return null;
  }

  return data?.preferred_audio_track_id || null;
}

async function salvarAudioPreferido(userId, trackId) {
  const { error } = await sb
    .from("user_settings")
    .upsert(
      {
        user_id: userId,
        preferred_audio_track_id: trackId
      },
      {
        onConflict: "user_id"
      }
    );

  if (error) {
    console.warn(
      "Não foi possível salvar o som preferido:",
      error.message
    );
  }
}

function lofiModeLabel(mode) {
  return mode === "sequence"
    ? "sequência"
    : "repetir";
}

function renderLofiTrackList(manager) {
  document.querySelectorAll("[data-lofi-list]").forEach((list) => {
    if (!manager.catalogLoaded) {
      if (list.dataset.lofiCatalogKey) {
        list.replaceChildren();
        delete list.dataset.lofiCatalogKey;
      }

      if (!list.children.length) {
        const placeholder =
          document.createElement("div");

        placeholder.className =
          "lofi-track-list-empty";

        placeholder.textContent =
          manager.catalogLoading
            ? "Carregando lista de sons..."
            : "Lista de sons";
        list.appendChild(placeholder);
      }

      return;
    }

    const catalogKey =
      manager.tracks
        .map((track) => String(track.id))
        .join("|");

    if (
      list.dataset.lofiCatalogKey
      !== catalogKey
    ) {
      list.replaceChildren();
      list.dataset.lofiCatalogKey =
        catalogKey;

      if (!manager.tracks.length) {
        const empty =
          document.createElement("div");

        empty.className =
          "lofi-track-list-empty";
        empty.textContent =
          "Nenhum som disponível.";
        list.appendChild(empty);
      } else {
        manager.tracks.forEach(
          (track, index) => {
            const button =
              document.createElement("button");

            button.type =
              "button";
            button.className =
              "lofi-track-item";
            button.dataset.lofiTrackId =
              track.id;

            const number =
              document.createElement("span");
            number.className =
              "lofi-track-number";
            number.textContent =
              String(index + 1).padStart(2, "0");

            const copy =
              document.createElement("span");
            copy.className =
              "lofi-track-item-copy";

            const title =
              document.createElement("strong");
            title.textContent =
              track.title || "Som ambiente";

            const hint =
              document.createElement("small");
            hint.textContent =
              "Tocar esta faixa";

            copy.append(
              title,
              hint
            );

            const icon =
              document.createElement("span");
            icon.className =
              "lofi-track-play";
            icon.setAttribute(
              "aria-hidden",
              "true"
            );
            icon.textContent =
              "▶";

            button.append(
              number,
              copy,
              icon
            );

            list.appendChild(
              button
            );
          }
        );
      }
    }

    list
      .querySelectorAll(
        "[data-lofi-track-id]"
      )
      .forEach((button) => {
        const isActive =
          button.dataset.lofiTrackId
          === manager.track?.id;

        const isPlaying =
          isActive
          && manager.loadedTrackId
            === manager.track?.id
          && !manager.audio.paused;

        button.classList.toggle(
          "active",
          isActive
        );
        button.classList.toggle(
          "playing",
          isPlaying
        );
        button.setAttribute(
          "aria-pressed",
          isActive
            ? "true"
            : "false"
        );

        const icon =
          button.querySelector(
            ".lofi-track-play"
          );

        if (icon) {
          icon.textContent =
            isPlaying
              ? "❚❚"
              : "▶";
        }
      });
  });
}

function updateLofiControls(manager) {
  const audio = manager.audio;

  document.querySelectorAll("[data-lofi-title]").forEach((el) => {
    el.textContent =
      manager.track?.title || "Som ambiente";
  });

  document.querySelectorAll("[data-lofi-status]").forEach((el) => {
    if (manager.catalogError) {
      el.textContent =
        "lista indisponível";
      return;
    }

    if (manager.error) {
      el.textContent =
        "áudio indisponível";
      return;
    }

    if (!manager.catalogLoaded) {
      el.textContent =
        manager.catalogLoading
          ? "carregando lista..."
          : "lista disponível ao abrir";
      return;
    }

    if (manager.audioLoading) {
      el.textContent =
        "carregando áudio...";
      return;
    }

    if (!manager.ready) {
      el.textContent =
        manager.track
          ? "pronto para tocar"
          : "selecione um som";
      return;
    }

    el.textContent =
      audio.paused
        ? `pausado · ${lofiModeLabel(manager.playMode)}`
        : `tocando · ${lofiModeLabel(manager.playMode)}`;
  });

  document.querySelectorAll("[data-lofi-toggle]").forEach((button) => {
    button.textContent =
      audio.paused ? "▶" : "❚❚";

    button.setAttribute(
      "aria-label",
      audio.paused
        ? "Tocar som ambiente"
        : "Pausar som ambiente"
    );

    button.disabled =
      Boolean(manager.catalogLoading)
      || Boolean(manager.audioLoading)
      || Boolean(manager.catalogError)
      || !manager.track;
  });

  document.querySelectorAll("[data-lofi-mode]").forEach((button) => {
    const active =
      button.dataset.lofiMode
      === manager.playMode;

    button.classList.toggle(
      "active",
      active
    );
    button.setAttribute(
      "aria-pressed",
      active
        ? "true"
        : "false"
    );
  });

  document.querySelectorAll("[data-lofi-select]").forEach((select) => {
    const currentValue =
      select.value;

    if (!manager.catalogLoaded) {
      select.innerHTML =
        '<option value="">Carregando lista...</option>';
      select.disabled = true;
      return;
    }

    select.innerHTML =
      manager.tracks.length
        ? manager.tracks.map((track) => `
            <option value="${track.id}">
              ${track.title}
            </option>
          `).join("")
        : '<option value="">Nenhum som disponível</option>';

    if (manager.track?.id) {
      select.value =
        manager.track.id;
    } else if (currentValue) {
      select.value =
        currentValue;
    }

    select.disabled =
      !manager.tracks.length
      || Boolean(manager.catalogError);
  });

  renderLofiTrackList(
    manager
  );

  document.querySelectorAll("[data-lofi-volume]").forEach((input) => {
    if (document.activeElement !== input) {
      input.value = String(audio.volume);
    }
  });

  document.querySelectorAll("[data-lofi-current]").forEach((el) => {
    el.textContent =
      formatAudioTime(audio.currentTime);
  });

  document.querySelectorAll("[data-lofi-duration]").forEach((el) => {
    el.textContent =
      formatAudioTime(audio.duration);
  });

  document.querySelectorAll("[data-lofi-progress]").forEach((input) => {
    input.max =
      Number.isFinite(audio.duration)
        ? String(audio.duration)
        : "0";

    if (document.activeElement !== input) {
      input.value =
        Number.isFinite(audio.currentTime)
          ? String(audio.currentTime)
          : "0";
    }

    input.disabled =
      !manager.ready
      || !Number.isFinite(audio.duration);
  });
}

async function carregarCatalogoLofi(manager) {
  if (manager.catalogLoaded) {
    return Boolean(manager.track);
  }

  if (manager.catalogPromise) {
    return manager.catalogPromise;
  }

  manager.catalogLoading =
    true;
  manager.catalogError =
    null;
  updateLofiControls(
    manager
  );

  manager.catalogPromise =
    (async () => {
      try {
        const [tracks, preferredFromDb] =
          await Promise.all([
            carregarAudioTracks(),
            carregarAudioPreferido(
              manager.userId
            )
          ]);

        manager.tracks =
          tracks || [];
        manager.catalogLoaded =
          true;

        const saved =
          readLofiState(
            manager.userId
          );

        const preferredId =
          saved.trackId
          || preferredFromDb
          || manager.tracks[0]?.id
          || null;

        manager.track =
          manager.tracks.find(
            (item) =>
              item.id
              === preferredId
          )
          || manager.tracks[0]
          || null;

        if (!manager.track) {
          manager.catalogError =
            "Nenhuma faixa configurada.";
          return false;
        }

        writeLofiState(
          manager.userId,
          {
            ...saved,
            trackId:
              manager.track.id,
            playMode:
              manager.playMode
          }
        );

        return true;
      } catch (error) {
        console.warn(
          "Não foi possível carregar a lista de sons:",
          error
        );

        manager.catalogError =
          "Não foi possível carregar a lista.";
        return false;
      } finally {
        manager.catalogLoading =
          false;
        manager.catalogPromise =
          null;
        updateLofiControls(
          manager
        );
      }
    })();

  return manager.catalogPromise;
}

function setLofiPlayMode(
  manager,
  mode
) {
  const nextMode =
    mode === "sequence"
      ? "sequence"
      : "repeat";

  manager.playMode =
    nextMode;

  manager.audio.loop =
    nextMode === "repeat";

  writeLofiState(
    manager.userId,
    {
      ...readLofiState(
        manager.userId
      ),
      playMode:
        nextMode,
      trackId:
        manager.track?.id
        || null,
      volume:
        manager.audio.volume,
      currentTime:
        manager.audio.currentTime
        || 0
    }
  );

  updateLofiControls(
    manager
  );
}

async function resolverUrlLofi(track) {
  if (
    track.storage_bucket
      === "ambientacao-audio"
  ) {
    const { data } =
      sb.storage
        .from(
          track.storage_bucket
        )
        .getPublicUrl(
          track.storage_path
        );

    if (!data?.publicUrl) {
      throw new Error(
        "Não foi possível gerar a URL pública do áudio."
      );
    }

    return data.publicUrl;
  }

  const {
    data: signedAudio,
    error: signedAudioError
  } =
    await sb.storage
      .from(
        track.storage_bucket
      )
      .createSignedUrl(
        track.storage_path,
        60 * 60 * 12
      );

  if (
    signedAudioError
    || !signedAudio?.signedUrl
  ) {
    throw (
      signedAudioError
      || new Error(
        "Não foi possível gerar a URL do áudio."
      )
    );
  }

  return signedAudio.signedUrl;
}

async function carregarFaixaLofi(
  manager,
  track,
  {
    autoplay = false,
    resume = false
  } = {}
) {
  if (!track) {
    return false;
  }

  if (
    manager.loadedTrackId
      === track.id
    && manager.audio.src
    && manager.ready
  ) {
    if (
      autoplay
      && manager.audio.paused
    ) {
      await manager.audio.play();
    }

    return true;
  }

  manager.audioLoading =
    true;
  manager.ready =
    false;
  manager.error =
    null;
  manager.track =
    track;

  const saved =
    readLofiState(
      manager.userId
    );

  manager.pendingSeek =
    resume
    && saved.trackId
      === track.id
      ? Math.max(
          0,
          Number(
            saved.currentTime
            || 0
          )
        )
      : 0;

  manager.audio.pause();
  manager.audio.loop =
    manager.playMode
      === "repeat";

  updateLofiControls(
    manager
  );

  try {
    const audioUrl =
      await resolverUrlLofi(
        track
      );

    manager.loadedTrackId =
      track.id;

    manager.audio.src =
      audioUrl;
    manager.audio.load();

    writeLofiState(
      manager.userId,
      {
        ...saved,
        trackId:
          track.id,
        currentTime:
          resume
            ? Number(
                saved.currentTime
                || 0
              )
            : 0,
        volume:
          manager.audio.volume,
        playMode:
          manager.playMode
      }
    );

    salvarAudioPreferido(
      manager.userId,
      track.id
    );

    if (autoplay) {
      await manager.audio.play();
    }

    return true;
  } catch (error) {
    console.warn(
      "Não foi possível carregar o áudio:",
      error
    );

    manager.error =
      "Não foi possível carregar o áudio.";
    manager.ready =
      false;
    manager.loadedTrackId =
      null;

    return false;
  } finally {
    manager.audioLoading =
      false;
    updateLofiControls(
      manager
    );
  }
}

async function trocarFaixaLofi(
  manager,
  trackId,
  options = {}
) {
  if (!manager.catalogLoaded) {
    const loaded =
      await carregarCatalogoLofi(
        manager
      );

    if (!loaded) {
      return false;
    }
  }

  const nextTrack =
    manager.tracks.find(
      (track) =>
        track.id === trackId
    );

  if (!nextTrack) {
    return false;
  }

  manager.track =
    nextTrack;

  const currentState =
    readLofiState(
      manager.userId
    );

  writeLofiState(
    manager.userId,
    {
      ...currentState,
      trackId:
        nextTrack.id,
      currentTime:
        options.resume
          ? Number(
              currentState.currentTime
              || 0
            )
          : 0,
      volume:
        manager.audio.volume,
      playMode:
        manager.playMode
    }
  );

  updateLofiControls(
    manager
  );

  return carregarFaixaLofi(
    manager,
    nextTrack,
    options
  );
}

async function tocarProximaFaixaLofi(
  manager
) {
  if (
    manager.playMode
      !== "sequence"
    || manager.tracks.length
      < 1
  ) {
    return;
  }

  const currentIndex =
    manager.tracks.findIndex(
      (track) =>
        track.id
        === manager.track?.id
    );

  const nextIndex =
    currentIndex >= 0
      ? (
          currentIndex + 1
        ) % manager.tracks.length
      : 0;

  const nextTrack =
    manager.tracks[
      nextIndex
    ];

  if (!nextTrack) {
    return;
  }

  await trocarFaixaLofi(
    manager,
    nextTrack.id,
    {
      autoplay:
        true,
      resume:
        false
    }
  );
}

function bindLofiControls(manager) {
  document.querySelectorAll("[data-lofi-list]").forEach((list) => {
    if (list.dataset.lofiBound === "1") return;
    list.dataset.lofiBound = "1";

    list.addEventListener(
      "click",
      async (event) => {
        const button =
          event.target.closest(
            "[data-lofi-track-id]"
          );

        if (
          !button
          || !list.contains(
            button
          )
        ) {
          return;
        }

        await trocarFaixaLofi(
          manager,
          button.dataset.lofiTrackId,
          {
            autoplay:
              true,
            resume:
              false
          }
        );
      }
    );
  });

  document.querySelectorAll("[data-lofi-select]").forEach((select) => {
    if (select.dataset.lofiBound === "1") return;
    select.dataset.lofiBound = "1";

    select.addEventListener(
      "change",
      () => {
        trocarFaixaLofi(
          manager,
          select.value,
          {
            autoplay:
              true,
            resume:
              false
          }
        );
      }
    );
  });

  document.querySelectorAll("[data-lofi-mode]").forEach((button) => {
    if (button.dataset.lofiBound === "1") return;
    button.dataset.lofiBound = "1";

    button.addEventListener(
      "click",
      () => {
        setLofiPlayMode(
          manager,
          button.dataset.lofiMode
        );
      }
    );
  });

  document.querySelectorAll("[data-lofi-toggle]").forEach((button) => {
    if (button.dataset.lofiBound === "1") return;
    button.dataset.lofiBound = "1";

    button.addEventListener("click", async () => {
      try {
        if (!manager.catalogLoaded) {
          const catalogReady =
            await carregarCatalogoLofi(
              manager
            );

          if (!catalogReady) {
            return;
          }
        }

        if (
          !manager.track
          || manager.catalogError
        ) {
          return;
        }

        if (
          manager.loadedTrackId
            !== manager.track.id
          || !manager.audio.src
          || !manager.ready
        ) {
          await carregarFaixaLofi(
            manager,
            manager.track,
            {
              autoplay:
                true,
              resume:
                true
            }
          );

          return;
        }

        if (manager.audio.paused) {
          await manager.audio.play();
        } else {
          manager.audio.pause();
        }
      } catch (error) {
        console.warn(
          "O navegador bloqueou a reprodução do áudio:",
          error
        );
      }
    });
  });

  document.querySelectorAll("[data-lofi-volume]").forEach((input) => {
    if (input.dataset.lofiBound === "1") return;
    input.dataset.lofiBound = "1";

    input.addEventListener("input", () => {
      const volume =
        Math.max(
          0,
          Math.min(
            1,
            Number(input.value)
          )
        );

      manager.audio.volume =
        volume;

      writeLofiState(
        manager.userId,
        {
          ...readLofiState(
            manager.userId
          ),
          volume,
          playMode:
            manager.playMode,
          trackId:
            manager.track?.id
            || null,
          currentTime:
            manager.audio.currentTime
            || 0
        }
      );

      updateLofiControls(
        manager
      );
    });
  });

  document.querySelectorAll("[data-lofi-progress]").forEach((input) => {
    if (input.dataset.lofiBound === "1") return;
    input.dataset.lofiBound = "1";

    input.addEventListener("input", () => {
      if (!manager.ready) return;

      const target =
        Number(input.value);

      if (Number.isFinite(target)) {
        manager.audio.currentTime =
          target;
      }
    });
  });

  updateLofiControls(
    manager
  );
}

async function iniciarLofiGlobal(userId) {
  const saved =
    readLofiState(userId);

  const manager = {
    userId,
    tracks: [],
    track: null,
    audio: new Audio(),
    ready: false,
    error: null,
    catalogError: null,
    catalogLoading: false,
    catalogPromise: null,
    catalogLoaded: false,
    audioLoading: false,
    loadedTrackId: null,
    pendingSeek: 0,
    lastSavedSecond: -1,
    playMode:
      saved.playMode === "sequence"
        ? "sequence"
        : "repeat"
  };

  window.docmapAudio =
    manager;

  // O catálogo textual pode aparecer imediatamente.
  // O arquivo MP3 continua sem src e sem preload até uma ação do usuário.
  manager.audio.preload =
    "none";
  manager.audio.loop =
    manager.playMode === "repeat";

  manager.audio.volume =
    Number.isFinite(
      Number(saved.volume)
    )
      ? Math.max(
          0,
          Math.min(
            1,
            Number(saved.volume)
          )
        )
      : 0.45;

  manager.audio.addEventListener(
    "loadedmetadata",
    () => {
      manager.ready =
        true;

      const seek =
        Number(
          manager.pendingSeek
          || 0
        );

      manager.pendingSeek =
        0;

      if (
        Number.isFinite(seek)
        && seek > 0
        && seek < manager.audio.duration
      ) {
        manager.audio.currentTime =
          seek;
      }

      updateLofiControls(
        manager
      );
    }
  );

  manager.audio.addEventListener(
    "play",
    () =>
      updateLofiControls(
        manager
      )
  );

  manager.audio.addEventListener(
    "pause",
    () => {
      writeLofiState(
        userId,
        {
          ...readLofiState(
            userId
          ),
          trackId:
            manager.track?.id
            || null,
          volume:
            manager.audio.volume,
          currentTime:
            manager.audio.currentTime
            || 0,
          playMode:
            manager.playMode
        }
      );

      updateLofiControls(
        manager
      );
    }
  );

  manager.audio.addEventListener(
    "ended",
    async () => {
      if (
        manager.playMode
        === "repeat"
      ) {
        try {
          manager.audio.currentTime = 0;
          await manager.audio.play();
        } catch (error) {
          console.warn(
            "Não foi possível reiniciar a faixa em repetição:",
            error
          );
        }

        return;
      }

      if (
        manager.playMode
        === "sequence"
      ) {
        await tocarProximaFaixaLofi(
          manager
        );
      }
    }
  );

  manager.audio.addEventListener(
    "timeupdate",
    () => {
      const second =
        Math.floor(
          manager.audio.currentTime
          || 0
        );

      if (
        second
          !== manager.lastSavedSecond
        && second % 5 === 0
      ) {
        manager.lastSavedSecond =
          second;

        writeLofiState(
          userId,
          {
            ...readLofiState(
              userId
            ),
            trackId:
              manager.track?.id
              || null,
            volume:
              manager.audio.volume,
            currentTime:
              manager.audio.currentTime
              || 0,
            playMode:
              manager.playMode
          }
        );
      }

      updateLofiControls(
        manager
      );
    }
  );

  manager.audio.addEventListener(
    "volumechange",
    () =>
      updateLofiControls(
        manager
      )
  );

  manager.audio.addEventListener(
    "error",
    () => {
      manager.error =
        "Arquivo de áudio não encontrado.";
      manager.ready =
        false;
      manager.loadedTrackId =
        null;

      updateLofiControls(
        manager
      );
    }
  );

  window.addEventListener(
    "pagehide",
    () => {
      writeLofiState(
        userId,
        {
          ...readLofiState(
            userId
          ),
          trackId:
            manager.track?.id
            || null,
          volume:
            manager.audio.volume,
          currentTime:
            manager.audio.currentTime
            || 0,
          playMode:
            manager.playMode
        }
      );
    }
  );

  bindLofiControls(
    manager
  );

  if (
    document.querySelector(
      "[data-lofi-shell]"
    )
  ) {
    carregarCatalogoLofi(
      manager
    );
  }

  window.dispatchEvent(
    new CustomEvent(
      "docmap:audio-ready",
      { detail: manager }
    )
  );

  return manager;
}


let ultimaOfensivaCarregada = null;
let ultimaOfensivaDashboardNotificada = null;

async function registrarAcessoDiario() {
  const userId =
    window.docmapUser?.id
    || "session";

  const today =
    new Date().toISOString().slice(0, 10);

  const cacheKey =
    `luria:daily-access:${userId}`;

  try {
    const cached =
      JSON.parse(
        localStorage.getItem(cacheKey)
        || "null"
      );

    if (
      cached?.date === today
      && cached?.streak
    ) {
      ultimaOfensivaCarregada =
        cached.streak;

      renderizarOfensivaGlobal();
      return;
    }
  } catch {}

  const { data, error } =
    await sb.rpc(
      "register_daily_access"
    );

  if (error) {
    console.warn(
      "Não foi possível registrar acesso diário:",
      error.message
    );
    return;
  }

  const streak =
    Array.isArray(data)
      ? data[0]
      : data;

  if (!streak) return;

  ultimaOfensivaCarregada =
    streak;

  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        date: today,
        streak
      })
    );
  } catch {}

  renderizarOfensivaGlobal();
}

function renderizarOfensivaGlobal() {
  const streak = ultimaOfensivaCarregada;
  if (!streak) return;

  document.querySelectorAll("[data-streak-value]").forEach((el) => {
    el.textContent = streak.current_streak ?? 0;
  });

  document.querySelectorAll("[data-longest-streak]").forEach((el) => {
    el.textContent = streak.longest_streak ?? 0;
  });

  const currentDays =
    Number(
      streak.current_streak
      ?? 0
    );

  window.luriaCurrentStreak = currentDays;
  if (ultimaOfensivaDashboardNotificada !== currentDays) {
    ultimaOfensivaDashboardNotificada = currentDays;
    window.dispatchEvent(new Event("luria:dashboard-data"));
  }

  let status =
    "Esquentando";

  let tier =
    "snow";

  if (currentDays >= 4 && currentDays < 7) {
    status = "Aquecendo";
    tier = "1";
  } else if (currentDays >= 7 && currentDays < 30) {
    status = "Em ritmo";
    tier = "2";
  } else if (currentDays >= 30 && currentDays < 90) {
    status = "Em chamas";
    tier = "3";
  } else if (currentDays >= 90 && currentDays < 180) {
    status = "Imparável";
    tier = "4";
  } else if (currentDays >= 180 && currentDays < 365) {
    status = "Incendiário";
    tier = "5";
  } else if (currentDays >= 365) {
    status = "Lendário";
    tier = "6";
  }

  document
    .querySelectorAll(
      "[data-sidebar-streak-status]"
    )
    .forEach(
      el => {
        el.textContent =
          status;
      }
    );

  document
    .querySelectorAll(
      "[data-sidebar-streak-card]"
    )
    .forEach(
      el => {
        el.dataset.streakTier =
          tier;

        const copy =
          el.querySelector(
            "[data-sidebar-streak-copy]"
          );

        if (copy) {
          copy.textContent =
            currentDays
            + " dia"
            + (
              currentDays === 1
                ? ""
                : "s"
            )
            + (
              currentDays >= 4
                ? " de ofensiva"
                : ""
            );
        }
      }
    );
}


function sidebarCollapseKey(userId) {
  return `docmap:sidebar-hidden:${userId}`;
}


function prepararSidebarDesktop(userId) {
  // Layout Hostinger-like: sidebar desktop é permanente e não pode ser recolhida.
  document.body.classList.remove("sidebar-hidden", "sidebar-collapsed");
  try { localStorage.removeItem(sidebarCollapseKey(userId)); } catch {}
  document.getElementById("sidebar-desktop-toggle")?.remove();
}

function prepararNavGroupsGlobais(userId) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  sidebar.querySelectorAll(".nav-group").forEach((group) => {
    const toggle = group.querySelector(":scope > .nav-group-label");
    const submenu = group.querySelector(":scope > .nav-submenu");
    if (!toggle || !submenu || toggle.id === "work-management-nav-toggle") return;

    const label = (
      toggle.querySelector(".nav-label-text")?.textContent ||
      toggle.textContent ||
      "grupo"
    ).trim().toLowerCase().replace(/\s+/g, "-");

    const key = `docmap:nav-group:${userId}:${label}`;
    const containsActivePage = !!submenu.querySelector(".nav-sublink.active");

    const apply = (open, persist = true) => {
      submenu.hidden = !open;
      group.classList.toggle("nav-group-collapsed", !open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (persist) {
        try { localStorage.setItem(key, open ? "1" : "0"); } catch {}
      }
    };

    let open = containsActivePage || toggle.getAttribute("aria-expanded") === "true" || !submenu.hidden;
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null && !containsActivePage) open = saved === "1";
    } catch {}

    apply(open, false);

    toggle.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextOpen = toggle.getAttribute("aria-expanded") !== "true";
      apply(nextOpen, true);
    };
  });
}

function prepararWorkManagementMenu(userId) {
  const group = document.getElementById("work-management-nav-group");
  const toggle = document.getElementById("work-management-nav-toggle");
  const submenu = document.getElementById("work-management-nav-submenu");

  if (!group || !toggle || !submenu) return;

  const pageInsideGroup = [
    "trabalho_plantoes",
    "trabalho_divisor_plantao",
    "trabalho_financeiro"
  ].includes(page);

  const key = `docmap:work-management-open:${userId}`;
  let open = pageInsideGroup;

  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) open = saved === "1";
  } catch {}

  const apply = (nextOpen) => {
    group.classList.toggle("nav-group-collapsed", !nextOpen);
    submenu.hidden = !nextOpen;
    toggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");

    try {
      localStorage.setItem(key, nextOpen ? "1" : "0");
    } catch {}
  };

  apply(open);

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    apply(toggle.getAttribute("aria-expanded") !== "true");
  });

  submenu.querySelectorAll(".nav-sublink").forEach((link) => {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem(key, "1");
      } catch {}
    });
  });
}


function notificationTimeLabel(value) {
  const date =
    new Date(
      value
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const diff =
    Date.now()
    - date.getTime();

  const minutes =
    Math.floor(
      diff / 60000
    );

  if (minutes < 1) {
    return "agora";
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours}h`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 7) {
    return `${days}d`;
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",
      month:
        "2-digit"
    }
  ).format(
    date
  );
}


function notificationIcon(type) {
  if (
    type ===
    "friend_added"
  ) {
    return "◎";
  }

  if (
    type ===
    "direct_share"
  ) {
    return "↗";
  }

  return "•";
}


function luriaTopControlsPositionKey() {
  const userId = window.docmapUser?.id || "local";
  return `luria:top-controls-position:v1:${userId}`;
}

function readLuriaTopControlsPosition() {
  try {
    const raw = localStorage.getItem(luriaTopControlsPositionKey());
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (!Number.isFinite(value?.top) || !Number.isFinite(value?.right)) return null;
    return { top: value.top, right: value.right };
  } catch {
    return null;
  }
}

function saveLuriaTopControlsPosition(position) {
  try {
    localStorage.setItem(
      luriaTopControlsPositionKey(),
      JSON.stringify({
        top: Math.round(position.top),
        right: Math.round(position.right)
      })
    );
  } catch {}
}

function applyLuriaTopControlsPosition(center, position) {
  if (!center || !position || window.innerWidth < 981) return;

  const rect = center.getBoundingClientRect();
  const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
  const maxRight = Math.max(8, window.innerWidth - rect.width - 8);
  const top = Math.min(Math.max(8, Number(position.top) || 8), maxTop);
  const right = Math.min(Math.max(8, Number(position.right) || 8), maxRight);

  center.style.setProperty("position", "fixed", "important");
  center.style.setProperty("top", `${top}px`, "important");
  center.style.setProperty("right", `${right}px`, "important");
  center.style.setProperty("left", "auto", "important");
  center.style.setProperty("z-index", "2147482001", "important");
  center.dataset.luriaCustomPosition = "1";
}

function resetLuriaTopControlsPosition(center) {
  try {
    localStorage.removeItem(luriaTopControlsPositionKey());
  } catch {}

  center?.style.removeProperty("position");
  center?.style.removeProperty("top");
  center?.style.removeProperty("right");
  center?.style.removeProperty("left");
  center?.style.removeProperty("z-index");
  if (center) delete center.dataset.luriaCustomPosition;
}

function wireLuriaTopControlsDrag(center) {
  if (!center) return;
  try { localStorage.removeItem(luriaTopControlsPositionKey()); } catch {}
  resetLuriaTopControlsPosition(center);
}

function ensureNotificationCenter() {
  let topbar =
    document.querySelector(
      ".topbar"
    );

  if (!topbar) {
    const pageRoot =
      document.querySelector(".page")
      || document.querySelector("main");

    if (pageRoot) {
      topbar = document.createElement("header");
      topbar.className = "topbar luria-global-topbar";
      const spacer = document.createElement("div");
      spacer.className = "page-heading luria-global-topbar-spacer";
      topbar.appendChild(spacer);
      pageRoot.prepend(topbar);
    }
  }

  if (
    !topbar
    || document.getElementById(
      "luria-notifications"
    )
  ) {
    return;
  }

  const center =
    document.createElement(
      "div"
    );

  center.id =
    "luria-notifications";

  center.className =
    "luria-notifications";

  center.innerHTML = `
    <div class="luria-pomodoro-top">
      <button
        id="luria-pomodoro-toggle"
        class="luria-pomodoro-toggle"
        type="button"
        aria-label="Pomodoro"
        aria-expanded="false"
      >
        <span class="luria-pomodoro-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 2h6"></path>
            <path d="M12 14l3-3"></path>
            <circle cx="12" cy="14" r="8"></circle>
          </svg>
        </span>
        <span class="luria-pomodoro-copy luria-timer-compact" aria-label="Timer 00 minutos 00 segundos">
          <span class="luria-timer-ms">
            <strong id="luria-timer-minutes">00</strong>
            <strong id="luria-timer-seconds">00</strong>
          </span>
          <span id="luria-pomodoro-mini-time" class="luria-timer-sr-only">00:00</span>
        </span>
      </button>

      <section id="luria-pomodoro-panel" class="luria-pomodoro-panel" hidden>
        <header>
          <div>
            <strong>Timer</strong>
            <small id="luria-pomodoro-state-label">Cronômetro</small>
          </div>
        </header>

        <div class="luria-timer-switch" role="group" aria-label="Tipo de timer">
          <button type="button" data-luria-timer-view="timer" aria-pressed="true">Timer</button>
          <button type="button" data-luria-timer-view="pomodoro" aria-pressed="false">Pomodoro</button>
        </div>

        <div id="luria-timer-view" class="luria-timer-view">
          <div id="luria-stopwatch-time" class="luria-pomodoro-time">00:00</div>
          <small class="luria-stopwatch-note">Defina um tempo abaixo para usar contagem regressiva. Deixe vazio para usar como cronômetro.</small>
          <div class="luria-pomodoro-fields">
            <label><span>Tempo</span><span><input id="luria-timer-duration-minutes" type="number" min="1" max="1440" step="1" placeholder="—"> min</span></label>
          </div>
          <div class="luria-pomodoro-actions luria-stopwatch-actions">
            <button id="luria-stopwatch-start" type="button">Iniciar</button>
            <button id="luria-stopwatch-pause" type="button">Pausar</button>
            <button id="luria-stopwatch-reset" type="button">Zerar</button>
          </div>
        </div>

        <div id="luria-pomodoro-view" class="luria-timer-view" hidden>
          <div class="luria-pomodoro-modes" role="group" aria-label="Etapa do Pomodoro">
            <button type="button" data-luria-pomodoro-mode="focus" aria-pressed="true">Foco</button>
            <button type="button" data-luria-pomodoro-mode="break" aria-pressed="false">Pausa</button>
          </div>

          <div id="luria-pomodoro-time" class="luria-pomodoro-time">25:00</div>

          <div class="luria-pomodoro-fields">
            <label>
              <span>Foco</span>
              <span><input id="luria-pomodoro-focus-minutes" type="number" min="1" max="240" step="1" value="25"> min</span>
            </label>
            <label>
              <span>Pausa</span>
              <span><input id="luria-pomodoro-break-minutes" type="number" min="1" max="120" step="1" value="5"> min</span>
            </label>
          </div>

          <div class="luria-pomodoro-actions">
            <button id="luria-pomodoro-start" type="button">Iniciar</button>
            <button id="luria-pomodoro-reset" type="button">Reiniciar</button>
          </div>

          <button id="luria-pomodoro-save" class="luria-pomodoro-save" type="button">Salvar durações</button>
        </div>

        <small id="luria-pomodoro-status" class="luria-pomodoro-status" role="status" aria-live="polite"></small>
      </section>
    </div>

    <button
      id="luria-notification-toggle"
      class="luria-notification-toggle"
      type="button"
      aria-label="Notificações"
      aria-expanded="false"
      aria-controls="luria-notification-panel"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
        ></path>
        <path
          d="M10 21h4"
        ></path>
      </svg>

      <span
        id="luria-notification-badge"
        class="luria-notification-badge"
        hidden
      ></span>
    </button>

    <div class="luria-profile-top">
      <button
        id="luria-profile-toggle"
        class="luria-profile-toggle"
        type="button"
        aria-label="Perfil"
        aria-expanded="false"
      >${luriaUserInitials(window.docmapUser, window.docmapProfile)}</button>
      <div id="luria-profile-menu" class="luria-profile-menu" hidden>
        <div class="luria-profile-theme-row">
          <span>Tema</span>
          <button id="luria-theme-switch" class="luria-theme-switch" type="button" aria-label="Trocar tema">
            Claro
          </button>
        </div>
        <a href="/configuracoes/#perfil">Perfil</a>
        <button type="button" data-restart-onboarding>Refazer onboarding</button>
        <a href="/configuracoes/">Configurações</a>
        <button id="luria-profile-logout" type="button">Sair</button>
      </div>
    </div>

    <section
      id="luria-notification-panel"
      class="luria-notification-panel"
      hidden
    >
      <header class="luria-notification-head">
        <div>
          <strong>Notificações</strong>
          <small id="luria-notification-subtitle">
            Novidades do LURIA
          </small>
        </div>

        <button
          id="luria-notification-read-all"
          class="luria-notification-read-all"
          type="button"
          hidden
        >
          Marcar como lidas
        </button>
      </header>

      <div
        id="luria-notification-list"
        class="luria-notification-list"
      >
        <div class="luria-notification-loading">
          Carregando...
        </div>
      </div>

      <a
        class="luria-notification-footer"
        href="/amigos/"
      >
        Abrir Amigos
      </a>
    </section>
  `;

  topbar.appendChild(
    center
  );
  updateLuriaProfileInitials();

  // Pomodoro é exclusivo do ambiente Estudos.
  if (String(page).startsWith("trabalho_")) {
    center.querySelector(".luria-pomodoro-top")?.remove();
  }

  // Controles do topo são fixos ao cabeçalho; remove qualquer posição antiga salva.
  try { localStorage.removeItem(luriaTopControlsPositionKey()); } catch {}
  resetLuriaTopControlsPosition(center);

  const pomodoroToggle = document.getElementById("luria-pomodoro-toggle");
  const pomodoroPanel = document.getElementById("luria-pomodoro-panel");
  const pomodoroMiniTime = document.getElementById("luria-pomodoro-mini-time");
  const timerMinutes = document.getElementById("luria-timer-minutes");
  const timerSeconds = document.getElementById("luria-timer-seconds");
  const pomodoroTime = document.getElementById("luria-pomodoro-time");
  const pomodoroStateLabel = document.getElementById("luria-pomodoro-state-label");
  const pomodoroStart = document.getElementById("luria-pomodoro-start");
  const pomodoroReset = document.getElementById("luria-pomodoro-reset");
  const pomodoroSave = document.getElementById("luria-pomodoro-save");
  const pomodoroStatus = document.getElementById("luria-pomodoro-status");
  const pomodoroFocusInput = document.getElementById("luria-pomodoro-focus-minutes");
  const pomodoroBreakInput = document.getElementById("luria-pomodoro-break-minutes");
  const pomodoroModes = [...document.querySelectorAll("[data-luria-pomodoro-mode]")];
  const timerViewButtons = [...document.querySelectorAll("[data-luria-timer-view]")];
  const timerView = document.getElementById("luria-timer-view");
  const pomodoroView = document.getElementById("luria-pomodoro-view");
  const stopwatchTime = document.getElementById("luria-stopwatch-time");
  const stopwatchStart = document.getElementById("luria-stopwatch-start");
  const stopwatchPause = document.getElementById("luria-stopwatch-pause");
  const stopwatchReset = document.getElementById("luria-stopwatch-reset");

  const timerDurationInput = document.getElementById("luria-timer-duration-minutes");
  const pomodoroDurations = { focus: 25, break: 5 };
  let pomodoroMode = "focus";
  let pomodoroRemaining = pomodoroDurations.focus * 60;
  let pomodoroDeadline = 0;
  let pomodoroTimer = null;
  let activeTimerView = "timer";
  let stopwatchElapsedMs = 0;
  let stopwatchStartedAt = 0;
  let stopwatchInterval = null;
  let stopwatchCountdownSeconds = null;

  const formatClock = (totalSeconds, showHours = false) => {
    const safe = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    if (showHours || hours > 0) {
      return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
    }
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  };

  const currentStopwatchMs = () =>
    stopwatchElapsedMs + (stopwatchInterval ? Math.max(0, Date.now() - stopwatchStartedAt) : 0);

  const currentTimerSeconds = () => {
    if (stopwatchCountdownSeconds === null) return currentStopwatchMs() / 1000;
    const elapsed = currentStopwatchMs() / 1000;
    return Math.max(0, stopwatchCountdownSeconds - elapsed);
  };

  const renderCompactTopTimer = (totalSeconds) => {
    const safe = Math.max(0, Math.floor(totalSeconds));
    const totalMinutes = Math.floor(safe / 60);
    const m = String(totalMinutes).padStart(2, "0");
    const s = String(safe % 60).padStart(2, "0");
    if (timerMinutes) timerMinutes.textContent = m;
    if (timerSeconds) timerSeconds.textContent = s;
    if (pomodoroMiniTime) pomodoroMiniTime.textContent = m + ":" + s;
    const compact = pomodoroMiniTime?.closest(".luria-timer-compact");
    if (compact) compact.setAttribute("aria-label", `Timer ${m} minutos ${s} segundos`);
  };

  const renderStopwatch = () => {
    const label = formatClock(currentTimerSeconds(), true);
    if (stopwatchTime) stopwatchTime.textContent = label;
    if (activeTimerView === "timer") renderCompactTopTimer(currentTimerSeconds());
    if (stopwatchStart) {
      stopwatchStart.textContent = "Iniciar";
      stopwatchStart.disabled = Boolean(stopwatchInterval);
    }
    if (stopwatchPause) stopwatchPause.disabled = !stopwatchInterval;
    if (stopwatchInterval && stopwatchCountdownSeconds !== null && currentTimerSeconds() <= 0) {
      clearInterval(stopwatchInterval); stopwatchInterval = null; stopwatchStartedAt = 0;
      try { localStorage.removeItem("luria:guided-timer"); } catch {}
      if (pomodoroStatus) pomodoroStatus.textContent = "Tempo concluído.";
    }
  };

  const setTimerView = (nextView) => {
    if (!["timer", "pomodoro"].includes(nextView)) return;
    activeTimerView = nextView;
    if (timerView) timerView.hidden = nextView !== "timer";
    if (pomodoroView) pomodoroView.hidden = nextView !== "pomodoro";
    timerViewButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.luriaTimerView === nextView));
    });
    if (pomodoroStateLabel) {
      pomodoroStateLabel.textContent =
        nextView === "timer"
          ? "Cronômetro"
          : (pomodoroMode === "focus" ? "Foco" : "Pausa");
    }
    if (nextView === "timer") renderStopwatch();
    else renderPomodoro();
  };

  const renderPomodoro = () => {
    const m = String(Math.floor(pomodoroRemaining / 60)).padStart(2, "0");
    const s = String(pomodoroRemaining % 60).padStart(2, "0");
    const label = m + ":" + s;
    if (activeTimerView === "pomodoro") renderCompactTopTimer(pomodoroRemaining);
    if (pomodoroTime) pomodoroTime.textContent = label;
    if (activeTimerView === "pomodoro" && pomodoroStateLabel) pomodoroStateLabel.textContent = pomodoroMode === "focus" ? "Foco" : "Pausa";
    if (pomodoroStart) {
      pomodoroStart.textContent = pomodoroTimer
        ? "Pausar"
        : (pomodoroMode === "break" ? "Iniciar pausa" : "Iniciar foco");
    }
    timerViewButtons.forEach((button) => {
    button.addEventListener("click", () => setTimerView(button.dataset.luriaTimerView));
  });

  const resolveTimerModeFromInput = () => {
    const raw = String(timerDurationInput?.value ?? "").trim();
    const requestedMinutes = raw === "" ? null : Number(raw);

    if (requestedMinutes !== null && Number.isFinite(requestedMinutes) && requestedMinutes > 0) {
      stopwatchCountdownSeconds = Math.round(requestedMinutes * 60);
      if (pomodoroStateLabel) pomodoroStateLabel.textContent = "Timer";
      return "countdown";
    }

    stopwatchCountdownSeconds = null;
    if (pomodoroStateLabel) pomodoroStateLabel.textContent = "Cronômetro";
    return "stopwatch";
  };

  stopwatchStart?.addEventListener("click", () => {
    if (stopwatchInterval) return;

    if (stopwatchElapsedMs === 0) {
      resolveTimerModeFromInput();
    }

    stopwatchStartedAt = Date.now();
    stopwatchInterval = setInterval(renderStopwatch, 250);
    renderStopwatch();
  });

  stopwatchPause?.addEventListener("click", () => {
    if (!stopwatchInterval) return;
    stopwatchElapsedMs = currentStopwatchMs();
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchStartedAt = 0;
    renderStopwatch();
  });

  stopwatchReset?.addEventListener("click", () => {
    if (stopwatchInterval) clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchStartedAt = 0;
    stopwatchElapsedMs = 0;
    stopwatchCountdownSeconds = null;
    try { localStorage.removeItem("luria:guided-timer"); } catch {}
    if (pomodoroStatus) pomodoroStatus.textContent = "";
    if (pomodoroStateLabel) {
      const raw = String(timerDurationInput?.value ?? "").trim();
      pomodoroStateLabel.textContent = raw ? "Timer" : "Cronômetro";
    }
    renderStopwatch();
  });

  function restoreGuidedStudyTimer() {
    let guided = null;
    try { guided = JSON.parse(localStorage.getItem("luria:guided-timer") || "null"); } catch {}
    if (!guided?.active || !guided.startedAt || !guided.durationSeconds) return;

    const elapsedMs = Math.max(0, Date.now() - Number(guided.startedAt));
    const durationMs = Math.max(1000, Number(guided.durationSeconds) * 1000);
    if (elapsedMs >= durationMs) {
      try { localStorage.removeItem("luria:guided-timer"); } catch {}
      return;
    }

    activeTimerView = "timer";
    stopwatchCountdownSeconds = Math.round(durationMs / 1000);
    stopwatchElapsedMs = elapsedMs;
    stopwatchStartedAt = Date.now();
    stopwatchInterval = setInterval(renderStopwatch, 250);
    if (timerDurationInput) timerDurationInput.value = String(Math.max(1, Math.round(stopwatchCountdownSeconds / 60)));
    if (pomodoroStateLabel) pomodoroStateLabel.textContent = "Estudar agora";
    renderStopwatch();
  }

  restoreGuidedStudyTimer();

  pomodoroModes.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.luriaPomodoroMode === pomodoroMode));
    });
  };

  const stopPomodoro = () => {
    if (pomodoroTimer) clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    pomodoroDeadline = 0;
    renderPomodoro();
  };

  const signalPomodoroTransition = (message) => {
    if (pomodoroPanel) pomodoroPanel.hidden = false;
    if (pomodoroToggle) {
      pomodoroToggle.setAttribute("aria-expanded", "true");
      pomodoroToggle.classList.remove("luria-pomodoro-attention");
      void pomodoroToggle.offsetWidth;
      pomodoroToggle.classList.add("luria-pomodoro-attention");
      window.setTimeout(() => pomodoroToggle.classList.remove("luria-pomodoro-attention"), 7000);
    }
    if (pomodoroStatus) pomodoroStatus.textContent = message;
  };

  const tickPomodoro = () => {
    pomodoroRemaining = Math.max(0, Math.ceil((pomodoroDeadline - Date.now()) / 1000));
    renderPomodoro();

    if (pomodoroRemaining !== 0) return;

    const completedMode = pomodoroMode;
    if (pomodoroTimer) clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    pomodoroDeadline = 0;

    if (completedMode === "focus") {
      pomodoroMode = "break";
      pomodoroRemaining = pomodoroDurations.break * 60;
      pomodoroModes.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.luriaPomodoroMode === "break"));
      });
      activeTimerView = "pomodoro";
      renderPomodoro();
      signalPomodoroTransition("Foco concluído. Hora da pausa — toque em Iniciar pausa.");
      return;
    }

    pomodoroMode = "focus";
    pomodoroRemaining = pomodoroDurations.focus * 60;
    pomodoroModes.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.luriaPomodoroMode === "focus"));
    });
    activeTimerView = "pomodoro";
    renderPomodoro();
    signalPomodoroTransition("Pausa concluída. Pronto para iniciar o próximo foco.");
  };

  const selectPomodoroMode = (nextMode) => {
    if (!["focus","break"].includes(nextMode)) return;
    stopPomodoro();
    pomodoroMode = nextMode;
    pomodoroRemaining = pomodoroDurations[pomodoroMode] * 60;
    if (pomodoroStatus) pomodoroStatus.textContent = "";
    renderPomodoro();
  };

  pomodoroToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = pomodoroPanel?.hidden ?? true;
    if (pomodoroPanel) pomodoroPanel.hidden = !open;
    pomodoroToggle.setAttribute("aria-expanded", String(open));
  });

  pomodoroModes.forEach((button) => {
    button.addEventListener("click", () => selectPomodoroMode(button.dataset.luriaPomodoroMode));
  });

  pomodoroStart?.addEventListener("click", () => {
    if (pomodoroTimer) {
      tickPomodoro();
      stopPomodoro();
      return;
    }
    if (pomodoroRemaining === 0) pomodoroRemaining = pomodoroDurations[pomodoroMode] * 60;
    pomodoroDeadline = Date.now() + pomodoroRemaining * 1000;
    pomodoroTimer = setInterval(tickPomodoro, 250);
    renderPomodoro();
    tickPomodoro();
  });

  pomodoroReset?.addEventListener("click", () => {
    selectPomodoroMode(pomodoroMode);
  });

  const loadPomodoroConfig = async () => {
    if (!window.docmapUser?.id || !window.supabaseClient) return;

    const cacheKey = `docmap:pomodoro-config:${window.docmapUser.id}`;
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
      if (cached?.saved_at && Date.now() - Number(cached.saved_at) < 6 * 60 * 60 * 1000) {
        pomodoroDurations.focus = Math.min(240, Math.max(1, Number(cached.focus) || 25));
        pomodoroDurations.break = Math.min(120, Math.max(1, Number(cached.break) || 5));
        if (pomodoroFocusInput) pomodoroFocusInput.value = pomodoroDurations.focus;
        if (pomodoroBreakInput) pomodoroBreakInput.value = pomodoroDurations.break;
        if (!pomodoroTimer) {
          pomodoroRemaining = pomodoroDurations[pomodoroMode] * 60;
          renderPomodoro();
        }
        return;
      }
    } catch {}

    const { data, error } = await window.supabaseClient
      .from("user_settings")
      .select("pomodoro_focus_minutes,pomodoro_break_minutes")
      .eq("user_id", window.docmapUser.id)
      .maybeSingle();

    if (error) {
      if (pomodoroStatus) pomodoroStatus.textContent = "Não foi possível carregar as durações.";
      return;
    }

    pomodoroDurations.focus = Math.min(240, Math.max(1, Number(data?.pomodoro_focus_minutes) || 25));
    pomodoroDurations.break = Math.min(120, Math.max(1, Number(data?.pomodoro_break_minutes) || 5));
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({
        focus: pomodoroDurations.focus,
        break: pomodoroDurations.break,
        saved_at: Date.now()
      }));
    } catch {}
    if (pomodoroFocusInput) pomodoroFocusInput.value = pomodoroDurations.focus;
    if (pomodoroBreakInput) pomodoroBreakInput.value = pomodoroDurations.break;
    if (!pomodoroTimer) {
      pomodoroRemaining = pomodoroDurations[pomodoroMode] * 60;
      renderPomodoro();
    }
  };

  pomodoroSave?.addEventListener("click", async () => {
    const focus = Number(pomodoroFocusInput?.value);
    const pause = Number(pomodoroBreakInput?.value);

    if (!Number.isInteger(focus) || focus < 1 || focus > 240 || !Number.isInteger(pause) || pause < 1 || pause > 120) {
      if (pomodoroStatus) pomodoroStatus.textContent = "Foco: 1–240 min; pausa: 1–120 min.";
      return;
    }

    if (!window.docmapUser?.id || !window.supabaseClient) {
      if (pomodoroStatus) pomodoroStatus.textContent = "Entre na sua conta para salvar.";
      return;
    }

    pomodoroSave.disabled = true;
    if (pomodoroStatus) pomodoroStatus.textContent = "Salvando...";

    const { error } = await window.supabaseClient
      .from("user_settings")
      .upsert({
        user_id: window.docmapUser.id,
        pomodoro_focus_minutes: focus,
        pomodoro_break_minutes: pause
      }, { onConflict: "user_id" });

    pomodoroSave.disabled = false;

    if (error) {
      if (pomodoroStatus) pomodoroStatus.textContent = "Não foi possível salvar as durações.";
      return;
    }

    pomodoroDurations.focus = focus;
    pomodoroDurations.break = pause;
    selectPomodoroMode(pomodoroMode);
    if (pomodoroStatus) pomodoroStatus.textContent = "Durações salvas.";
  });

  if (window.docmapUser?.id) loadPomodoroConfig();
  else window.addEventListener("docmap:ready", loadPomodoroConfig, { once: true });

  renderPomodoro();
  renderStopwatch();
  setTimerView("timer");

  const profileToggle = document.getElementById("luria-profile-toggle");
  const profileMenu = document.getElementById("luria-profile-menu");
  const themeSwitch = document.getElementById("luria-theme-switch");
  const themeCycle = ["light","dark","leila-mood"];
  const themeLabel = { light:"Claro", dark:"Escuro", "leila-mood":"Rosa" };
  const renderThemeSwitch = () => {
    if (!themeSwitch) return;
    const resolved = document.documentElement.dataset.theme || "light";
    themeSwitch.textContent = themeLabel[resolved] || "Claro";
    themeSwitch.setAttribute("aria-label", `Tema atual: ${themeSwitch.textContent}. Toque para trocar`);
  };
  renderThemeSwitch();
  themeSwitch?.addEventListener("click", async (event) => {
    event.stopPropagation();
    const resolved = document.documentElement.dataset.theme || "light";
    const currentIndex = Math.max(0, themeCycle.indexOf(resolved));
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];
    applyThemeSetting(nextTheme);
    renderThemeSwitch();
    try {
      await salvarTema(nextTheme);
      renderThemeSwitch();
    } catch (error) {
      console.error("Não foi possível salvar o tema:", error);
    }
  });
  profileToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = profileMenu?.hidden ?? true;
    if (profileMenu) profileMenu.hidden = !open;
    profileToggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (!center.contains(event.target)) {
      if (profileMenu && !profileMenu.hidden) {
        profileMenu.hidden = true;
        profileToggle?.setAttribute("aria-expanded", "false");
      }
      if (pomodoroPanel && !pomodoroPanel.hidden) {
        pomodoroPanel.hidden = true;
        pomodoroToggle?.setAttribute("aria-expanded", "false");
      }
    }
  });
  document.getElementById("luria-profile-logout")?.addEventListener("click", async () => {
    try { await sb.auth.signOut(); } catch {}
    window.location.href = "/login/";
  });

  if (page === "questoes") {
    document
      .getElementById(
        "qs-simulations-help"
      )
      ?.addEventListener(
        "click",
        async () => {
          await window.LuriaDialog?.alert?.(
            "Você pode adicionar simulados automaticamente por PDF ou criar um simulado manual informando o número de questões. Depois, abra o simulado e registre o gabarito ou marque as questões erradas para acompanhar seu desempenho."
          );

          document
            .querySelector(
              '[data-qs-mode="mine"]'
            )
            ?.click();
        }
      );
  }
}


async function markNotificationRead(
  notificationId
) {
  if (!notificationId) {
    return;
  }

  const {
    error
  } =
    await sb
      .from(
        "notifications"
      )
      .update({
        read_at:
          new Date()
            .toISOString()
      })
      .eq(
        "id",
        notificationId
      )
      .is(
        "read_at",
        null
      );

  if (error) {
    console.warn(
      "Não foi possível marcar a notificação como lida:",
      error.message
    );
  }
}


async function loadNotificationCount() {
  const badge =
    document.getElementById(
      "luria-notification-badge"
    );

  const subtitle =
    document.getElementById(
      "luria-notification-subtitle"
    );

  const readAll =
    document.getElementById(
      "luria-notification-read-all"
    );

  if (!badge) return;

  const {
    count,
    error
  } =
    await sb
      .from("notifications")
      .select(
        "id",
        {
          count: "exact",
          head: true
        }
      )
      .is(
        "read_at",
        null
      );

  if (error) {
    console.warn(
      "Não foi possível contar notificações:",
      error.message
    );
    return;
  }

  const unread =
    Number(count || 0);

  badge.hidden =
    unread === 0;

  badge.textContent =
    unread > 99
      ? "99+"
      : String(unread);

  if (subtitle) {
    subtitle.textContent =
      unread
        ? `${unread} não lida${unread === 1 ? "" : "s"}`
        : "Tudo em dia";
  }

  if (readAll) {
    readAll.hidden =
      unread === 0;
  }
}


async function loadNotifications() {
  const list =
    document.getElementById(
      "luria-notification-list"
    );

  const badge =
    document.getElementById(
      "luria-notification-badge"
    );

  const subtitle =
    document.getElementById(
      "luria-notification-subtitle"
    );

  const readAll =
    document.getElementById(
      "luria-notification-read-all"
    );

  if (
    !list
    || !badge
  ) {
    return;
  }

  const [
    listResponse,
    countResponse
  ] =
    await Promise.all([
      sb
        .from(
          "notifications"
        )
        .select(
          "id,type,title,body,href,metadata,read_at,created_at"
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        )
        .limit(
          12
        ),

      sb
        .from(
          "notifications"
        )
        .select(
          "id",
          {
            count:
              "exact",
            head:
              true
          }
        )
        .is(
          "read_at",
          null
        )
    ]);

  const {
    data,
    error
  } =
    listResponse;

  if (error) {
    console.warn(
      "Não foi possível carregar notificações:",
      error.message
    );

    list.innerHTML =
      '<div class="luria-notification-empty">Não foi possível carregar as notificações.</div>';

    return;
  }

  const rows =
    data || [];

  const unread =
    Number(
      countResponse?.count
      ?? rows.filter(
        item =>
          !item.read_at
      ).length
    );

  badge.hidden =
    unread === 0;

  badge.textContent =
    unread > 99
      ? "99+"
      : String(
          unread
        );

  if (subtitle) {
    subtitle.textContent =
      unread
        ? `${unread} não lida${unread === 1 ? "" : "s"}`
        : "Tudo em dia";
  }

  if (readAll) {
    readAll.hidden =
      unread === 0;
  }

  if (!rows.length) {
    list.innerHTML =
      `
        <div class="luria-notification-empty">
          <strong>Nenhuma notificação</strong>
          <span>Novos amigos e conteúdos recebidos aparecerão aqui.</span>
        </div>
      `;

    return;
  }

  list.innerHTML =
    rows
      .map(
        item => `
          <a
            class="luria-notification-item ${item.read_at ? "" : "unread"}"
            href="${escapeHtml(item.href || "/amigos/")}"
            data-notification-id="${escapeHtml(item.id)}"
          >
            <span class="luria-notification-icon">
              ${notificationIcon(item.type)}
            </span>

            <span class="luria-notification-copy">
              <strong>
                ${escapeHtml(item.title || "Notificação")}
              </strong>

              <span>
                ${escapeHtml(item.body || "")}
              </span>

              <small>
                ${escapeHtml(notificationTimeLabel(item.created_at))}
              </small>
            </span>

            ${item.read_at
              ? ""
              : '<i class="luria-notification-unread-dot" aria-label="Não lida"></i>'
            }
          </a>
        `
      )
      .join(
        ""
      );

  list
    .querySelectorAll(
      "[data-notification-id]"
    )
    .forEach(
      link => {
        link.addEventListener(
          "click",
          async (
            event
          ) => {
            event.preventDefault();

            const destination =
              link.getAttribute(
                "href"
              )
              || "/amigos/";

            await markNotificationRead(
              link.dataset
                .notificationId
            );

            window.location.href =
              destination;
          }
        );
      }
    );
}


async function prepararNotificacoes(
  userId
) {
  ensureNotificationCenter();

  const center =
    document.getElementById(
      "luria-notifications"
    );

  const toggle =
    document.getElementById(
      "luria-notification-toggle"
    );

  const panel =
    document.getElementById(
      "luria-notification-panel"
    );

  const readAll =
    document.getElementById(
      "luria-notification-read-all"
    );

  const badge =
    document.getElementById(
      "luria-notification-badge"
    );

  const subtitle =
    document.getElementById(
      "luria-notification-subtitle"
    );

  if (
    !center
    || !toggle
    || !panel
  ) {
    return;
  }

  toggle.addEventListener(
    "click",
    async (
      event
    ) => {
      event.stopPropagation();

      const opening =
        panel.hidden;

      panel.hidden =
        !opening;

      toggle.setAttribute(
        "aria-expanded",
        String(
          opening
        )
      );

      if (opening) {
        await loadNotifications();
      }
    }
  );

  panel.addEventListener(
    "click",
    event =>
      event.stopPropagation()
  );

  readAll?.addEventListener(
    "click",
    async () => {
      readAll.disabled =
        true;

      const {
        error
      } =
        await sb
          .from(
            "notifications"
          )
          .update({
            read_at:
              new Date()
                .toISOString()
          })
          .eq(
            "user_id",
            userId
          )
          .is(
            "read_at",
            null
          );

      readAll.disabled =
        false;

      if (error) {
        console.warn(
          "Não foi possível marcar as notificações como lidas:",
          error.message
        );

        return;
      }

      await loadNotifications();
    }
  );

  document.addEventListener(
    "click",
    () => {
      if (
        panel.hidden
      ) {
        return;
      }

      panel.hidden =
        true;

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  );

  await loadNotificationCount();

  const realtimeKey =
    "__luriaNotificationRealtime";

  const realtimeState =
    window[realtimeKey]
    || {
      channel:
        null,
      userId:
        null
    };

  window[realtimeKey] =
    realtimeState;

  async function disconnectNotificationRealtime() {
    if (
      !realtimeState.channel
    ) {
      return;
    }

    const channel =
      realtimeState.channel;

    realtimeState.channel =
      null;
    realtimeState.userId =
      null;

    try {
      await sb.removeChannel(
        channel
      );
    } catch (
      error
    ) {
      console.warn(
        "Não foi possível encerrar o canal de notificações:",
        error
      );
    }
  }

  function incrementNotificationBadge() {
    if (!badge) {
      return;
    }

    const current =
      badge.hidden
        ? 0
        : Math.max(
            0,
            Number.parseInt(
              badge.textContent,
              10
            )
            || 0
          );

    const unread =
      current
      + 1;

    badge.hidden =
      false;

    badge.textContent =
      unread > 99
        ? "99+"
        : String(
            unread
          );

    if (
      subtitle
    ) {
      subtitle.textContent =
        `${unread} não lida${unread === 1 ? "" : "s"}`;
    }

    if (
      readAll
    ) {
      readAll.hidden =
        false;
    }
  }

  async function connectNotificationRealtime() {
    if (
      document.hidden
    ) {
      return;
    }

    if (
      realtimeState.channel
      && realtimeState.userId
        === userId
    ) {
      return;
    }

    await disconnectNotificationRealtime();

    realtimeState.userId =
      userId;

    realtimeState.channel =
      sb
        .channel(
          `luria-notifications-${userId}`
        )
        .on(
          "postgres_changes",
          {
            event:
              "INSERT",
            schema:
              "public",
            table:
              "notifications",
            filter:
              `user_id=eq.${userId}`
          },
          () => {
            if (
              panel.hidden
            ) {
              incrementNotificationBadge();
            } else {
              loadNotifications();
            }
          }
        )
        .subscribe();
  }

  const handleVisibilityChange =
    async () => {
      if (
        document.hidden
      ) {
        await disconnectNotificationRealtime();
        return;
      }

      await loadNotificationCount();
      await connectNotificationRealtime();
    };

  const handlePageHide =
    () => {
      disconnectNotificationRealtime();
    };

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );

  window.addEventListener(
    "pagehide",
    handlePageHide,
    {
      once:
        true
    }
  );

  window.addEventListener(
    "beforeunload",
    handlePageHide,
    {
      once:
        true
    }
  );

  await connectNotificationRealtime();
}

function prepararMobileMenu() {
  const open = document.getElementById("menu-open");
  const close = document.getElementById("sidebar-close");
  const backdrop = document.getElementById("sidebar-backdrop");

  const abrir = () => document.body.classList.add("sidebar-open");
  const fechar = () => document.body.classList.remove("sidebar-open");
  const alternar = () => {
    if (
      document.body.classList.contains("plantao-phone-mode")
      && document.body.classList.contains("sidebar-open")
    ) {
      fechar();
      return;
    }
    abrir();
  };

  open?.addEventListener("click", alternar);
  close?.addEventListener("click", fechar);
  backdrop?.addEventListener("click", fechar);
}


/* =========================================================
   LURIA — CALENDÁRIO GLOBAL
   ========================================================= */

function ensureLuriaCalendar(input = null) {
  let popover =
    document.getElementById(
      "luria-calendar"
    );

  if (popover) {
    const host = input?.closest?.("dialog[open]") || document.body;
    if (popover.parentElement !== host) host.appendChild(popover);
    return popover;
  }

  popover =
    document.createElement(
      "div"
    );

  popover.id =
    "luria-calendar";

  popover.className =
    "luria-calendar";

  popover.hidden =
    true;

  popover.innerHTML = `
    <div class="luria-calendar-head">
      <button type="button" data-cal-prev aria-label="Mês anterior">‹</button>
      <strong data-cal-title></strong>
      <button type="button" data-cal-next aria-label="Próximo mês">›</button>
    </div>
    <div class="luria-calendar-weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
    </div>
    <div class="luria-calendar-days" data-cal-days></div>
    <div class="luria-calendar-foot">
      <button type="button" data-cal-today>Hoje</button>
      <button type="button" data-cal-clear>Limpar</button>
    </div>
  `;

  const host = input?.closest?.("dialog[open]") || document.body;
  host.appendChild(popover);

  return popover;
}


function parseLuriaDate(
  value
) {
  const match =
    String(
      value
      || ""
    )
      .match(
        /^(\d{4})-(\d{2})-(\d{2})$/
      );

  if (!match) return null;

  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3])
  );
}


function luriaDateIso(
  date
) {
  const y =
    date.getFullYear();

  const m =
    String(
      date.getMonth() + 1
    )
      .padStart(
        2,
        "0"
      );

  const d =
    String(
      date.getDate()
    )
      .padStart(
        2,
        "0"
      );

  return `${y}-${m}-${d}`;
}


function openLuriaCalendar(
  input
) {
  if (
    !input
    ||
    input.disabled
    ||
    input.readOnly
  ) {
    return;
  }

  const popover =
    ensureLuriaCalendar(input);

  const selected =
    parseLuriaDate(
      input.value
    );

  let cursor =
    selected
      ? new Date(
          selected.getFullYear(),
          selected.getMonth(),
          1
        )
      : new Date();

  cursor.setDate(
    1
  );

  function close() {
    popover.hidden =
      true;

    document.removeEventListener(
      "pointerdown",
      outside,
      true
    );
  }

  function choose(
    date
  ) {
    input.value =
      luriaDateIso(
        date
      );

    input.dispatchEvent(
      new Event(
        "input",
        {
          bubbles:
            true
        }
      )
    );

    input.dispatchEvent(
      new Event(
        "change",
        {
          bubbles:
            true
        }
      )
    );

    close();
  }

  function render() {
    const title =
      popover.querySelector(
        "[data-cal-title]"
      );

    title.textContent =
      cursor.toLocaleDateString(
        "pt-BR",
        {
          month:
            "long",
          year:
            "numeric"
        }
      );

    const days =
      popover.querySelector(
        "[data-cal-days]"
      );

    days.innerHTML =
      "";

    const first =
      new Date(
        cursor.getFullYear(),
        cursor.getMonth(),
        1
      );

    const last =
      new Date(
        cursor.getFullYear(),
        cursor.getMonth() + 1,
        0
      );

    const today =
      new Date();

    const currentSelected =
      parseLuriaDate(
        input.value
      );

    for (
      let i = 0;
      i < first.getDay();
      i += 1
    ) {
      const spacer =
        document.createElement(
          "span"
        );

      spacer.className =
        "luria-calendar-spacer";

      days.appendChild(
        spacer
      );
    }

    for (
      let day = 1;
      day <= last.getDate();
      day += 1
    ) {
      const date =
        new Date(
          cursor.getFullYear(),
          cursor.getMonth(),
          day
        );

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.textContent =
        String(
          day
        );

      if (
        luriaDateIso(date) ===
        luriaDateIso(today)
      ) {
        button.classList.add(
          "is-today"
        );
      }

      if (
        currentSelected
        &&
        luriaDateIso(date) ===
          luriaDateIso(currentSelected)
      ) {
        button.classList.add(
          "is-selected"
        );
      }

      button.onclick =
        () => choose(
          date
        );

      days.appendChild(
        button
      );
    }
  }

  function outside(
    event
  ) {
    if (
      event.target === input
      ||
      popover.contains(
        event.target
      )
    ) {
      return;
    }

    close();
  }

  popover
    .querySelector(
      "[data-cal-prev]"
    )
    .onclick =
      () => {
        cursor.setMonth(
          cursor.getMonth() - 1
        );

        render();
      };

  popover
    .querySelector(
      "[data-cal-next]"
    )
    .onclick =
      () => {
        cursor.setMonth(
          cursor.getMonth() + 1
        );

        render();
      };

  popover
    .querySelector(
      "[data-cal-today]"
    )
    .onclick =
      () => choose(
        new Date()
      );

  popover
    .querySelector(
      "[data-cal-clear]"
    )
    .onclick =
      () => {
        if (input.required) {
          close();
          return;
        }

        input.value =
          "";

        input.dispatchEvent(
          new Event(
            "change",
            {
              bubbles:
                true
            }
          )
        );

        close();
      };

  render();

  popover.hidden =
    false;

  const rect =
    input.getBoundingClientRect();

  const width =
    Math.min(
      330,
      window.innerWidth - 24
    );

  let left =
    Math.min(
      Math.max(
        12,
        rect.left
      ),
      window.innerWidth - width - 12
    );

  let top =
    rect.bottom + 7;

  if (
    top + 390 >
    window.innerHeight
  ) {
    top =
      Math.max(
        12,
        rect.top - 370
      );
  }

  popover.style.width =
    `${width}px`;

  popover.style.left =
    `${left}px`;

  popover.style.top =
    `${top}px`;

  setTimeout(
    () => document.addEventListener(
      "pointerdown",
      outside,
      true
    ),
    0
  );
}


function wireLuriaDateInputs() {
  document.addEventListener(
    "click",
    event => {
      const input =
        event.target.closest?.(
          'input[type="date"], input[data-luria-calendar="deck"]'
        );

      if (!input) return;

      event.preventDefault();
      event.stopPropagation();

      try {
        input.blur();
      } catch {}

      openLuriaCalendar(
        input
      );
    },
    true
  );
}


wireLuriaDateInputs();



/* =========================================================
   LURIA — SELETOR GLOBAL DE HORA
   ========================================================= */

function ensureLuriaTimePicker(input = null) {
  let popover = document.getElementById("luria-time-picker");
  const host = input?.closest?.("dialog[open]") || document.body;

  if (popover) {
    if (popover.parentElement !== host) host.appendChild(popover);
    return popover;
  }

  popover = document.createElement("div");
  popover.id = "luria-time-picker";
  popover.className = "luria-time-picker";
  popover.hidden = true;
  popover.innerHTML = `
    <div class="luria-time-picker-head">
      <strong>Selecionar hora</strong>
      <button type="button" data-time-close aria-label="Fechar">×</button>
    </div>
    <div class="luria-time-picker-body">
      <label>
        <span>Hora</span>
        <select data-time-hour></select>
      </label>
      <span class="luria-time-separator">:</span>
      <label>
        <span>Minuto</span>
        <select data-time-minute></select>
      </label>
    </div>
    <div class="luria-time-quick">
      <button type="button" data-time-quick="08:00">08:00</button>
      <button type="button" data-time-quick="12:00">12:00</button>
      <button type="button" data-time-quick="14:00">14:00</button>
      <button type="button" data-time-quick="18:00">18:00</button>
      <button type="button" data-time-quick="20:00">20:00</button>
    </div>
    <div class="luria-time-picker-foot">
      <button type="button" data-time-now>Agora</button>
      <button type="button" data-time-clear>Limpar</button>
      <button type="button" class="primary" data-time-apply>Aplicar</button>
    </div>
  `;

  const hour = popover.querySelector("[data-time-hour]");
  const minute = popover.querySelector("[data-time-minute]");

  hour.innerHTML = Array.from({length:24},(_,i)=>`<option value="${String(i).padStart(2,"0")}">${String(i).padStart(2,"0")}</option>`).join("");
  minute.innerHTML = Array.from({length:12},(_,i)=>i*5).map(v=>`<option value="${String(v).padStart(2,"0")}">${String(v).padStart(2,"0")}</option>`).join("");

  host.appendChild(popover);
  return popover;
}

function openLuriaTimePicker(input) {
  if (!input || input.disabled || input.readOnly) return;

  const popover = ensureLuriaTimePicker(input);
  const hour = popover.querySelector("[data-time-hour]");
  const minute = popover.querySelector("[data-time-minute]");

  const current = String(input.value || "").match(/^(\d{2}):(\d{2})$/);
  const now = new Date();
  hour.value = current ? current[1] : String(now.getHours()).padStart(2,"0");

  const rawMinute = current ? Number(current[2]) : now.getMinutes();
  const roundedMinute = Math.min(55, Math.round(rawMinute / 5) * 5);
  minute.value = String(roundedMinute).padStart(2,"0");

  function close() {
    popover.hidden = true;
    document.removeEventListener("pointerdown", outside, true);
  }

  function applyValue(value) {
    input.value = value;
    input.dispatchEvent(new Event("input",{bubbles:true}));
    input.dispatchEvent(new Event("change",{bubbles:true}));
    close();
  }

  function outside(event) {
    if (event.target === input || popover.contains(event.target)) return;
    close();
  }

  popover.querySelector("[data-time-close]").onclick = close;
  popover.querySelector("[data-time-apply]").onclick = () =>
    applyValue(`${hour.value}:${minute.value}`);

  popover.querySelector("[data-time-now]").onclick = () => {
    const now = new Date();
    const m = Math.min(55, Math.round(now.getMinutes()/5)*5);
    applyValue(`${String(now.getHours()).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
  };

  popover.querySelector("[data-time-clear]").onclick = () => {
    input.value = "";
    input.dispatchEvent(new Event("change",{bubbles:true}));
    close();
  };

  popover.querySelectorAll("[data-time-quick]").forEach(button => {
    button.onclick = () => applyValue(button.dataset.timeQuick);
  });

  popover.hidden = false;

  const rect = input.getBoundingClientRect();
  const width = Math.min(320, window.innerWidth - 24);
  let left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12);
  let top = rect.bottom + 7;
  if (top + 260 > window.innerHeight) top = Math.max(12, rect.top - 250);

  popover.style.width = `${width}px`;
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  setTimeout(() => document.addEventListener("pointerdown", outside, true),0);
}

document.addEventListener("click", event => {
  const input = event.target.closest?.('input[type="time"][data-luria-time-picker], input#event-time');
  if (!input) return;
  event.preventDefault();
  event.stopPropagation();
  try { input.blur(); } catch {}
  openLuriaTimePicker(input);
}, true);


/* =========================================================
   LURIA — DIÁLOGOS GLOBAIS
   Substitui alert/confirm/prompt nativos por uma interface
   consistente em todas as páginas que carregam app.js.
   ========================================================= */

function ensureLuriaDialog() {
  let dialog =
    document.getElementById(
      "luria-global-dialog"
    );

  if (dialog) {
    return dialog;
  }

  dialog =
    document.createElement(
      "dialog"
    );

  dialog.id =
    "luria-global-dialog";

  dialog.className =
    "luria-global-dialog";

  dialog.innerHTML = `
    <form method="dialog" class="luria-global-dialog-card">
      <div class="luria-global-dialog-icon" aria-hidden="true">
        <img class="luria-global-dialog-logo" src="/assets/img/logos/logo-icone-original.png?v=luria10" alt="">
      </div>
      <div class="luria-global-dialog-copy">
        <span class="luria-global-dialog-eyebrow">LURIA</span>
        <h2 class="luria-global-dialog-title">Confirmar ação</h2>
        <p class="luria-global-dialog-message"></p>
      </div>
      <label class="luria-global-dialog-prompt" hidden>
        <span>Resposta</span>
        <input class="luria-global-dialog-input" type="text">
      </label>
      <div class="luria-global-dialog-actions">
        <button class="button secondary luria-global-dialog-cancel" type="button">Cancelar</button>
        <button class="button primary luria-global-dialog-confirm" type="button">Confirmar</button>
      </div>
    </form>
  `;

  document.body.appendChild(
    dialog
  );

  return dialog;
}


function openLuriaDialog({
  type = "alert",
  message = "",
  defaultValue = ""
} = {}) {
  const dialog =
    ensureLuriaDialog();

  const title =
    dialog.querySelector(
      ".luria-global-dialog-title"
    );

  const copy =
    dialog.querySelector(
      ".luria-global-dialog-message"
    );

  const icon =
    dialog.querySelector(
      ".luria-global-dialog-icon"
    );

  const cancel =
    dialog.querySelector(
      ".luria-global-dialog-cancel"
    );

  const confirmButton =
    dialog.querySelector(
      ".luria-global-dialog-confirm"
    );

  const promptWrap =
    dialog.querySelector(
      ".luria-global-dialog-prompt"
    );

  const input =
    dialog.querySelector(
      ".luria-global-dialog-input"
    );

  const isAlert =
    type === "alert";

  const isPrompt =
    type === "prompt";

  title.textContent =
    isAlert
      ? "Aviso"
      : isPrompt
        ? "Preencha a informação"
        : "Confirmar ação";

  const logo =
    icon.querySelector(
      ".luria-global-dialog-logo"
    );

  if (logo) {
    const theme =
      document.documentElement
        .dataset
        .theme
      || "";

    logo.src =
      theme === "dark"
        ? "/assets/img/logos/logo-icone-azul-claro.png?v=luria10"
        : theme === "leila-mood"
          ? "/assets/img/logos/logo-icone-rosa-escuro.png?v=luria10"
          : "/assets/img/logos/logo-icone-original.png?v=luria10";
  }

  copy.textContent =
    String(
      message
      || ""
    );

  cancel.hidden =
    isAlert;

  promptWrap.hidden =
    !isPrompt;

  input.value =
    isPrompt
      ? String(
          defaultValue
          ?? ""
        )
      : "";

  confirmButton.textContent =
    isAlert
      ? "Entendi"
      : "Confirmar";

  return new Promise(
    resolve => {
      let settled =
        false;

      const finish =
        value => {
          if (settled) return;

          settled =
            true;

          dialog.close();

          resolve(
            value
          );
        };

      const onConfirm =
        () => {
          finish(
            isPrompt
              ? input.value
              : true
          );
        };

      const onCancel =
        () => {
          finish(
            isPrompt
              ? null
              : false
          );
        };

      confirmButton.onclick =
        onConfirm;

      cancel.onclick =
        onCancel;

      dialog.oncancel =
        event => {
          event.preventDefault();

          if (isAlert) {
            finish(
              true
            );
          } else {
            onCancel();
          }
        };

      dialog.onclose =
        () => {
          if (!settled) {
            resolve(
              isPrompt
                ? null
                : isAlert
                  ? true
                  : false
            );
          }
        };

      dialog.showModal();

      requestAnimationFrame(
        () => {
          (
            isPrompt
              ? input
              : confirmButton
          )
            ?.focus();
        }
      );
    }
  );
}


window.LuriaDialog = {
  alert(
    message
  ) {
    return openLuriaDialog({
      type:
        "alert",
      message
    });
  },

  confirm(
    message
  ) {
    return openLuriaDialog({
      type:
        "confirm",
      message
    });
  },

  prompt(
    message,
    defaultValue = ""
  ) {
    return openLuriaDialog({
      type:
        "prompt",
      message,
      defaultValue
    });
  }
};


/*
  Compatibilidade global:
  scripts antigos continuam chamando alert/confirm/prompt,
  mas passam a receber o visual LURIA. Confirm/prompt são
  assíncronos; novas telas devem preferir window.LuriaDialog.
*/
window.luriaAlert =
  window.LuriaDialog.alert;

window.luriaConfirm =
  window.LuriaDialog.confirm;

window.luriaPrompt =
  window.LuriaDialog.prompt;

/*
  Ponte para código legado: evita qualquer popup nativo mesmo antes
  de cada fluxo antigo ser migrado. Os handlers novos devem usar
  LuriaDialog diretamente para aguardar a resposta.
*/
window.alert = function luriaLegacyAlert(
  message
) {
  window.LuriaDialog.alert(
    message
  );

  return undefined;
};




function essentialEntitlementsFallback() {
  return {
    plan: "essential",
    source: "fallback",
    is_admin: false,
    complimentary: false,
    counts_as_paid: false,
    expires_at: null,
    features: {
      dashboard: { enabled: true, limit: null },
      agenda: { enabled: true, limit: null },
      cronograma: { enabled: true, limit: null },
      ambientacao: { enabled: true, limit: null },
      caderno: { enabled: true, limit: null },
      error_notebook: { enabled: true, limit: null },
      flashcards: { enabled: false, limit: 0 },
      flashcard_import: { enabled: false, limit: 0 },
      questions: { enabled: false, limit: 0 },
      question_import: { enabled: false, limit: 0 },
      simulations: { enabled: false, limit: 0 },
      plantao: { enabled: false, limit: 0 },
      statistics_general: { enabled: true, limit: null },
      advanced_statistics: { enabled: false, limit: 0 },
      notebook_images: { enabled: false, limit: 0 },
      error_notebook_images: { enabled: false, limit: 0 },
      flashcard_images: { enabled: false, limit: 0 },
      studyrats_accessories: { enabled: false, limit: 0 },
      studyrats_variants: { enabled: false, limit: 1 },
      automatic_schedule: { enabled: false, limit: 0 },
      automatic_questions: { enabled: false, limit: 0 },
      ai: { enabled: false, limit: 0 }
    }
  };
}


async function carregarEntitlements() {
  const userId =
    (await sb.auth.getSession())?.data?.session?.user?.id
    || null;

  // Entitlements são autorização: sempre confirmar no servidor primeiro.
  // O cache existe somente para manter o último acesso válido em falha de rede.
  const cached =
    userId
      ? readFreshCache(
          entitlementsCacheKey(userId),
          24 * 60 * 60 * 1000
        )
      : null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const { data, error } =
        await sb.rpc("get_my_entitlements");

      if (!error && data) {
        if (userId) {
          writeTimedCache(
            entitlementsCacheKey(userId),
            data
          );
        }
        return data;
      }

      console.warn(
        "Não foi possível carregar o plano do usuário:",
        error?.message || "resposta vazia"
      );
    } catch (error) {
      console.warn(
        "Não foi possível carregar o plano do usuário:",
        error
      );
    }

    if (attempt < 2) {
      await new Promise(
        resolve => setTimeout(resolve, 350 * (attempt + 1))
      );
    }
  }

  // Não rebaixa silenciosamente Plus/Pro para Essential por erro transitório.
  return cached || null;
}

function temFeature(
  entitlements,
  featureKey
) {
  if (
    entitlements?.is_admin === true
  ) {
    return true;
  }

  return (
    entitlements
      ?.features
      ?.[featureKey]
      ?.enabled === true
  );
}


function limiteFeature(
  entitlements,
  featureKey,
  fallback = null
) {
  if (
    entitlements?.is_admin === true
  ) {
    return fallback;
  }

  const raw =
    entitlements
      ?.features
      ?.[featureKey]
      ?.limit;

  if (
    raw === null
    || raw === undefined
    || raw === ""
  ) {
    return fallback;
  }

  const value =
    Number(raw);

  return Number.isFinite(value)
    ? Math.max(0, value)
    : fallback;
}


window.LuriaEntitlements = {
  enabled(featureKey) {
    return temFeature(
      window.docmapEntitlements,
      featureKey
    );
  },

  limit(
    featureKey,
    fallback = null
  ) {
    return limiteFeature(
      window.docmapEntitlements,
      featureKey,
      fallback
    );
  }
};


function aplicarRestricoesDeImagem(
  entitlements
) {
  const canUse =
    (featureKey) =>
      temFeature(
        entitlements,
        featureKey
      );

  const lockElements =
    (
      selectors,
      message
    ) => {
      selectors.forEach(
        selector => {
          document
            .querySelectorAll(
              selector
            )
            .forEach(
              element => {
                element.disabled =
                  true;

                element.setAttribute(
                  "aria-disabled",
                  "true"
                );

                element.title =
                  message;

                if (
                  element.matches(
                    'input[type="file"]'
                  )
                ) {
                  element.value =
                    "";
                }
              }
            );
        }
      );
    };

  if (
    !canUse(
      "notebook_images"
    )
  ) {
    lockElements(
      [
        "#notebook-image-add",
        "#notebook-image-camera-input",
        "#notebook-image-gallery-input",
        "#notebook-image-file-input",
        "#notebook-image-menu [data-image-source]"
      ],
      "Imagens no caderno não estão disponíveis para este tipo de conta."
    );

    document
      .getElementById(
        "notebook-image-menu"
      )
      ?.setAttribute(
        "hidden",
        ""
      );
  }

  if (
    !canUse(
      "error_notebook_images"
    )
  ) {
    lockElements(
      [
        "#new-error-image"
      ],
      "Imagens no Caderno de Erros não estão disponíveis para este tipo de conta."
    );
  }

  if (
    !canUse(
      "flashcard_images"
    )
  ) {
    lockElements(
      [
        "#create-front-image",
        "#create-back-image"
      ],
      "Imagens em flashcards não estão disponíveis para este tipo de conta."
    );
  }
}


function aplicarEntitlementsNaNavegacao(
  entitlements
) {
  Object.entries(
    PLUS_NAV_FEATURES
  ).forEach(
    ([href, featureKey]) => {
      document
        .querySelectorAll(
          `a[href="${href}"]`
        )
        .forEach(
          (link) => {
            if (
              temFeature(
                entitlements,
                featureKey
              )
            ) {
              return;
            }

            link.classList.add(
              "nav-feature-locked"
            );

            link.setAttribute(
              "aria-disabled",
              "true"
            );

            link.title =
              "Disponível no plano Plus";

            if (
              !link.querySelector(
                ".nav-plan-badge"
              )
            ) {
              const badge =
                document.createElement(
                  "span"
                );

              badge.className =
                "nav-plan-badge";

              badge.textContent =
                "PLUS";

              link.appendChild(
                badge
              );
            }

            link.addEventListener(
              "click",
              (event) => {
                event.preventDefault();

                window.LuriaDialog.alert(
                  "Este recurso está disponível no plano Plus."
                );
              }
            );
          }
        );
    }
  );
}


async function carregarBootstrap(userId) {
  if (!userId) return null;

  try {
    const { data, error } = await sb.rpc("luria_bootstrap");
    if (error || !data) {
      if (error) console.warn("Não foi possível carregar o bootstrap da LURIA:", error.message);
      return null;
    }

    const entitlements = data.entitlements || null;
    const profile = data.profile || null;
    const acessoAdmin = data.is_admin === true;
    const theme = data.theme || null;

    if (entitlements) {
      writeTimedCache(entitlementsCacheKey(userId), entitlements);
    }
    writeTimedCache(adminCacheKey(userId), acessoAdmin);

    if (profile) {
      writeCachedProfile(userId, profile);
    }

    if (theme) {
      writeCachedTheme(userId, theme);
      try {
        localStorage.setItem(`docmap:theme-fetched-at:${userId}`, String(Date.now()));
      } catch {}
      applyThemeSetting(theme);
    }

    return {
      entitlements,
      profile,
      acessoAdmin,
      theme
    };
  } catch (error) {
    console.warn("Não foi possível carregar o bootstrap da LURIA:", error);
    return null;
  }
}

async function carregarEstadoRemoto(userId) {
  const bootstrap = await carregarBootstrap(userId);
  if (bootstrap) return bootstrap;

  const [entitlements, profile, theme, acessoAdmin] = await Promise.all([
    carregarEntitlements(),
    carregarPerfil(userId),
    carregarTema(userId),
    verificarAcessoAdmin()
  ]);

  return {
    entitlements,
    profile,
    acessoAdmin,
    theme
  };
}


async function verificarAcessoAdmin() {
  const userId =
    (await sb.auth.getSession())?.data?.session?.user?.id
    || null;

  const cached =
    userId
      ? readFreshCache(
          adminCacheKey(userId),
          10 * 60 * 1000
        )
      : null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { data, error } =
        await sb.rpc("is_admin");

      if (!error) {
        const confirmed =
          data === true;

        if (userId) {
          writeTimedCache(
            adminCacheKey(userId),
            confirmed
          );
        }

        return confirmed;
      }

      console.warn(
        "Não foi possível verificar acesso administrativo:",
        error.message
      );
    } catch (error) {
      console.warn(
        "Não foi possível verificar acesso administrativo:",
        error
      );
    }

    if (attempt === 0) {
      await new Promise(resolve => setTimeout(resolve, 350));
    }
  }

  return cached === true;
}


async function prepararAdminNavigation(acessoAdmin = null) {
  const slot = document.getElementById("admin-nav-slot");
  if (!slot) return false;
  const betaLink = document.createElement("a");
  betaLink.id = "beta-testers-nav-link";
  betaLink.className = `nav-link ${page === "beta_testers" ? "active" : ""}`;
  betaLink.href = "/beta-testers/";
  betaLink.innerHTML = `<span class="nav-icon">${luriaIcon("users")}</span><span>Beta Testers</span>`;
  // Beta feedback is available to every signed-in user, regardless of admin role.
  slot.replaceChildren(betaLink);
  const isAdmin = typeof acessoAdmin === "boolean" ? acessoAdmin : await verificarAcessoAdmin();
  if (!isAdmin) return false;
  const link = document.createElement("a");
  link.id = "admin-nav-link";
  link.className = `nav-link ${page === "admin" ? "active" : ""}`;
  link.href = "/admin/";
  link.innerHTML = '<span class="nav-icon">◆</span><span>Admin</span>';
  slot.prepend(link);
  return true;
}

function carregarOnboardingGlobal() {
  if (
    window.LuriaOnboarding
    || document.getElementById("luria-onboarding-script")
  ) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const script =
      document.createElement("script");

    script.id =
      "luria-onboarding-script";

    script.src =
      "/assets/js/onboarding.js?v=3.2";

    script.onload =
      () => resolve();

    script.onerror =
      () => resolve();

    document.head.appendChild(
      script
    );
  });
}


async function iniciarApp() {
  // Carrega o onboarding sem bloquear a pintura inicial.
  const onboardingPromise =
    carregarOnboardingGlobal().catch(() => {});

  const { data, error } =
    await sb.auth.getSession();

  if (error || !data.session) {
    window.location.replace("/login/");
    return;
  }

  const user =
    data.session.user;

  // Professor Alex é recurso interno em desenvolvimento: acesso exclusivo de admin.
  let accessState = null;

  if (page === "professor_alex" || String(page).startsWith("trabalho_")) {
    accessState = await carregarEstadoRemoto(user.id);
  }

  if (page === "professor_alex") {
    if (accessState?.acessoAdmin !== true) {
      window.location.replace("/dashboard/");
      return;
    }
  }

  // O ambiente Trabalho é liberado para Admin e planos Plus/Pro/Betatester.
  if (String(page).startsWith("trabalho_")) {
    const workPlan =
      String(accessState?.entitlements?.plan || "")
        .trim()
        .toLowerCase();

    const workAllowed =
      accessState?.acessoAdmin === true
      || ["plus", "pro", "betatester"].includes(workPlan);

    if (!workAllowed) {
      window.location.replace("/dashboard/");
      return;
    }
  }

  // PRIMEIRA PINTURA: somente dados locais/cache.
  // Nada de Supabase remoto pode segurar a exibição da página.
  const cachedTheme =
    readCachedTheme(user.id);

  if (cachedTheme) {
    applyThemeSetting(
      cachedTheme
    );
  } else {
    applyThemeSetting("system");
  }

  const cachedProfile =
    readCachedProfile(user.id)
    || null;

  const cachedEntitlements =
    readFreshCache(
      entitlementsCacheKey(user.id),
      24 * 60 * 60 * 1000
    )
    || null;

  const cachedAdmin =
    readFreshCache(
      adminCacheKey(user.id),
      10 * 60 * 1000
    ) === true;

  document.getElementById("sidebar").innerHTML =
    sidebarMarkup(
      user,
      cachedProfile,
      cachedAdmin
    );
    renderizarOfensivaGlobal();

  updateLuriaLogo(
    document.documentElement.dataset.theme
    || "light"
  );

  const info =
    PAGE_INFO[page]
    || PAGE_INFO.dashboard;

  // Dashboard mantém o box de título. No modo Trabalho, os títulos de página foram removidos.
  if (
    (page === "dashboard" || (page.startsWith("trabalho_") && !document.querySelector(".pcr-workspace")))
    && !document.querySelector(".luria-page-spotlight")
  ) {
    const pageRoot = document.querySelector(".main .page");
    const topbar = pageRoot?.querySelector(":scope > .topbar");

    if (pageRoot && topbar) {
      const spotlight = document.createElement("section");
      spotlight.className = `luria-page-spotlight ${page === "dashboard" ? "luria-dashboard-spotlight" : "luria-work-page-spotlight"}`;
      spotlight.setAttribute("aria-label", info.title || "Página");
      spotlight.innerHTML = `
        <div class="luria-page-spotlight-copy">
          <span class="luria-page-spotlight-label"></span>
          <strong data-page-title></strong>
          <small class="luria-page-spotlight-helper"></small>
        </div>
      `;
      topbar.insertAdjacentElement("afterend", spotlight);
    }
  }

  // Work shares the Study heading; the PCR workspace keeps its specialized header.

  document
    .querySelectorAll("[data-page-title]")
    .forEach((el) => {
      el.textContent =
        info.title;
    });

  const eyebrowTargets = document.querySelectorAll("[data-page-eyebrow]");
  if (eyebrowTargets.length) {
    eyebrowTargets.forEach((el) => {
      el.textContent = info.eyebrow;
    });
  } else if (page.startsWith("trabalho_")) {
    const fallbackEyebrow = document.querySelector(".topbar .page-heading .eyebrow");
    if (fallbackEyebrow) fallbackEyebrow.textContent = info.eyebrow;
  }

  // Subtítulo curto dentro do card de título, no padrão do Cronograma.
  document
    .querySelectorAll(".luria-page-spotlight-copy")
    .forEach((copy) => {
      let label = copy.querySelector(".luria-page-spotlight-label");

      if (!label) {
        label = document.createElement("span");
        label.className = "luria-page-spotlight-label";
        copy.prepend(label);
      }

      label.textContent = info.eyebrow || "";
      label.hidden = !info.eyebrow;

      let helper = copy.querySelector(".luria-page-spotlight-helper");
      if (!helper) {
        helper = document.createElement("small");
        helper.className = "luria-page-spotlight-helper";
        copy.appendChild(helper);
      }

      helper.textContent = info.helper || "";
      helper.hidden = !info.helper;
    });

  // Logout resiliente a re-renderizações da sidebar.
  // A sidebar é substituída após carregar perfil/permissões; por isso o listener
  // precisa ficar em um ancestral estável, não no botão que é recriado.
  if (!document.documentElement.dataset.logoutBound) {
    document.documentElement.dataset.logoutBound = "1";
    document.addEventListener("click", async (event) => {
      const button = event.target.closest?.("#logout");
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();
      if (button.dataset.busy === "1") return;

      button.dataset.busy = "1";
      button.setAttribute("aria-busy", "true");

      try {
        const { error } = await sb.auth.signOut({ scope: "local" });
        if (error) console.warn("Logout remoto/local retornou erro; limpando sessão local.", error);
      } catch (error) {
        console.warn("Falha ao encerrar sessão pelo Supabase; limpando sessão local.", error);
      } finally {
        try {
          localStorage.removeItem("sb-sxdsfklllilhdyuamvvg-auth-token");
          sessionStorage.clear();
        } catch (_) {}

        // Landing pública é a saída mais previsível no navegador e no PWA.
        window.location.replace("/");
      }
    });
  }

  prepararMobileMenu();
  prepararSidebarDesktop(
    user.id
  );
  prepararWorkManagementMenu(
    user.id
  );
  prepararNavGroupsGlobais(user.id);
  prepararAdminNavigation(cachedAdmin === true).catch(() => {});
  prepararConfiguracoes();

  window.docmapUser =
    user;
  window.docmapSession =
    data.session;
  window.docmapProfile =
    cachedProfile;
  updateLuriaProfileInitials(user, cachedProfile);
  window.docmapEntitlements =
    cachedEntitlements;
  window.docmapPlan =
    cachedAdmin
      ? "admin"
      : (
          cachedEntitlements?.plan
          || "essential"
        );
  window.docmapIsAdmin =
    cachedAdmin;

  // Conteúdo semanal é carregado de forma ociosa e nunca bloqueia a página.
  // Se o script já estiver presente, o evento docmap:ready abaixo dispara o prefetch.
  // Caso contrário, ele é injetado e usa window.docmapUser ao terminar de carregar.
  if (
    !window.LuriaWeeklyContent
    && !document.querySelector(
      'script[data-luria-weekly-content]'
    )
  ) {
    const weeklyScript =
      document.createElement(
        "script"
      );

    weeklyScript.src =
      "/assets/js/weekly-content.js?v=1";

    weeklyScript.async =
      true;

    weeklyScript.dataset
      .luriaWeeklyContent =
      "1";

    document.head.appendChild(
      weeklyScript
    );
  }

  // A página fica visível imediatamente.
  document.body.classList.add(
    "app-ready"
  );

  window.dispatchEvent(
    new CustomEvent(
      "docmap:ready",
      {
        detail: {
          user,
          session:
            data.session,
          isAdmin:
            window.docmapIsAdmin,
          plan:
            window.docmapPlan,
          entitlements:
            window.docmapEntitlements,
          cached:
            true
        }
      }
    )
  );

  // Atualização assíncrona: uma única RPC traz perfil, plano, admin e tema.
  // Se o bootstrap falhar, carregarEstadoRemoto usa as chamadas legadas como fallback.
  carregarEstadoRemoto(user.id)
    .then(
      ({
        entitlements,
        profile,
        acessoAdmin
      }) => {
        const finalEntitlements =
          entitlements
          || cachedEntitlements;

        const finalProfile =
          profile
          || cachedProfile;

        window.docmapProfile =
          finalProfile;
        updateLuriaProfileInitials(user, finalProfile);
        window.docmapEntitlements =
          finalEntitlements;
        window.docmapIsAdmin =
          acessoAdmin === true;
        window.docmapPlan =
          acessoAdmin === true
            ? "admin"
            : (
                finalEntitlements?.plan
                || "essential"
              );

        // Atualiza sidebar depois que perfil/admin reais chegarem.
        document.getElementById("sidebar").innerHTML =
          sidebarMarkup(
            user,
            finalProfile,
            acessoAdmin === true
          );
          renderizarOfensivaGlobal();

        prepararMobileMenu();
        prepararSidebarDesktop(
          user.id
        );
        prepararWorkManagementMenu(
          user.id
        );

        prepararAdminNavigation(acessoAdmin === true).catch(() => {});
        if (acessoAdmin !== true) {
          aplicarEntitlementsNaNavegacao(
            finalEntitlements
          );
          aplicarRestricoesDeImagem(
            finalEntitlements
          );

          const requiredFeature =
            PAGE_FEATURES[page]
            || null;

          if (
            requiredFeature
            && !temFeature(
              finalEntitlements,
              requiredFeature
            )
            && page !== "dashboard"
          ) {
            window.location.replace(
              "/dashboard/"
            );
            return;
          }

          if (
            page === "admin"
            || page === "professor_alex"
          ) {
            window.location.replace(
              "/dashboard/"
            );
            return;
          }
        }

        window.dispatchEvent(
          new CustomEvent(
            "docmap:access-updated",
            {
              detail: {
                user,
                session:
                  data.session,
                isAdmin:
                  window.docmapIsAdmin,
                plan:
                  window.docmapPlan,
                entitlements:
                  window.docmapEntitlements
              }
            }
          )
        );
      }
    )
    .catch(
      (error) => {
        console.warn(
          "Falha na atualização de perfil/permissões em segundo plano:",
          error
        );
      }
    );

  iniciarLofiGlobal(
    user.id
  ).catch(
    (error) => {
      console.warn(
        "Não foi possível iniciar o player de lo-fi:",
        error
      );
    }
  );

  prepararNotificacoes(
    user.id
  ).catch(
    (error) => {
      console.warn(
        "Não foi possível iniciar as notificações:",
        error
      );
    }
  );

  registrarAcessoDiario()
    .catch(
      (error) => {
        console.warn(
          "Não foi possível registrar o acesso diário:",
          error
        );
      }
    );

  onboardingPromise.catch(() => {});
}

iniciarApp();


/* Sessão global de estudo: persiste entre páginas e pausa após 15 min sem interação. */
(function installLuriaStudyTimer(){
  if (window.LuriaStudyTimer) return;
  const KEY="luria:active-study-session:v1", IDLE_MS=15*60*1000;
  let state=null, idleHandle=null;
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch{return null}};
  const write=()=>{try{state?localStorage.setItem(KEY,JSON.stringify(state)):localStorage.removeItem(KEY)}catch{}};
  const now=()=>Date.now();
  const elapsed=()=>state ? Math.max(0,Math.floor(((state.accumulatedMs||0)+(state.running?now()-state.segmentStartedAt:0))/1000)) : 0;
  async function flush(reason="paused"){
    if(!state||!window.supabaseClient||!window.docmapUser?.id) return;
    const seconds=elapsed(); if(seconds<1) return;
    const payload={user_id:window.docmapUser.id,activity_kind:state.kind||"study",area:state.area||null,materia:state.materia||null,started_at:new Date(state.startedAt).toISOString(),ended_at:new Date().toISOString(),duration_seconds:seconds};
    if(state.sourceId && /^[0-9a-f-]{36}$/i.test(state.sourceId)) payload.source_id=state.sourceId;
    const {error}=await window.supabaseClient.from("study_sessions").insert(payload);
    if(error) console.warn("LURIA: não foi possível registrar tempo de estudo",error);
    else { state=null; write(); window.dispatchEvent(new CustomEvent("luria:study-timer",{detail:{reason,seconds}})); }
  }
  function pause(reason="manual"){
    if(!state?.running) return;
    state.accumulatedMs=(state.accumulatedMs||0)+Math.max(0,now()-state.segmentStartedAt); state.running=false; state.pausedReason=reason; write();
    window.dispatchEvent(new CustomEvent("luria:study-timer",{detail:{reason,state}}));
  }
  function resume(){if(!state||state.running)return; state.running=true;state.segmentStartedAt=now();state.lastInteractionAt=now();state.pausedReason=null;write();scheduleIdle();}
  function scheduleIdle(){clearTimeout(idleHandle);if(!state?.running||state.allowIdle)return;const wait=Math.max(0,IDLE_MS-(now()-(state.lastInteractionAt||now())));idleHandle=setTimeout(()=>pause("idle_15m"),wait+50)}
  function touch(){if(!state?.running||state.allowIdle)return;state.lastInteractionAt=now();write();scheduleIdle()}
  async function start(kind="study",opts={}){if(state) await flush("activity_changed"); const t=now();state={kind,sourceId:opts.sourceId||null,area:opts.area||null,materia:opts.materia||null,allowIdle:!!opts.allowIdle,startedAt:t,segmentStartedAt:t,lastInteractionAt:t,accumulatedMs:0,running:true};write();scheduleIdle();window.dispatchEvent(new CustomEvent("luria:study-timer",{detail:{reason:"started",state}}));return state}
  function setExternalQuestions(active=true){if(!state&&active)return start("external_questions",{allowIdle:true});if(state){state.allowIdle=!!active;if(active)state.kind="external_questions";write();scheduleIdle()}}
  state=read(); if(state?.running){state.segmentStartedAt=now();state.lastInteractionAt=now();write();scheduleIdle()}
  ["pointerdown","keydown","touchstart","input","change"].forEach(ev=>document.addEventListener(ev,touch,{passive:true,capture:true}));
  window.LuriaStudyTimer={start,pause,resume,finish:flush,touch,setExternalQuestions,getState:()=>state,getElapsedSeconds:elapsed};
})();

/* PWA global topbar v30 — compact, aligned and scrolls with the page */
(function(){
  const style=document.createElement("style");
  style.id="luria-pwa-topbar-v30";
  style.textContent=`
  @media(max-width:980px){
    html.pwa-standalone,html.pwa-standalone body{height:auto!important;min-height:100%!important;overflow-x:hidden!important;overflow-y:auto!important}
    html.pwa-standalone body .app-shell{height:auto!important;min-height:100dvh!important;overflow:visible!important}
    html.pwa-standalone body .main{height:auto!important;min-height:100dvh!important;overflow:visible!important;padding-top:max(10px,env(safe-area-inset-top))!important}
    html.pwa-standalone body .page{height:auto!important;min-height:0!important;overflow:visible!important}
    html.pwa-standalone body .topbar{position:relative!important;top:auto!important;z-index:40!important;width:100%!important;min-width:0!important;min-height:44px!important;height:auto!important;margin:0 0 12px!important;padding:0!important;display:grid!important;grid-template-columns:40px minmax(0,1fr) auto!important;align-items:center!important;gap:9px!important;background:transparent!important;transform:none!important}
    html.pwa-standalone body .topbar .menu-open{display:grid!important;width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;margin:0!important;align-self:center!important}
    html.pwa-standalone body .topbar .page-heading{min-width:0!important;max-width:100%!important;align-self:center!important;overflow:hidden!important}
    html.pwa-standalone body .topbar .page-heading .eyebrow{margin:0 0 2px!important;font-size:7px!important;line-height:1.1!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
    html.pwa-standalone body .topbar .page-heading h1{margin:0!important;font-size:17px!important;line-height:1.12!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
    html.pwa-standalone body .topbar .luria-notifications{position:relative!important;top:auto!important;right:auto!important;width:auto!important;min-width:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;z-index:45!important}
    html.pwa-standalone body .luria-pomodoro-toggle{width:40px!important;min-width:40px!important;height:40px!important;padding:0!important;display:grid!important;place-items:center!important;border-radius:11px!important}
    html.pwa-standalone body .luria-pomodoro-icon{width:20px!important;height:20px!important;flex:0 0 20px!important}
    html.pwa-standalone body .luria-pomodoro-icon svg{width:20px!important;height:20px!important}
    html.pwa-standalone body .luria-pomodoro-copy{display:none!important}
    html.pwa-standalone body .luria-notification-toggle,html.pwa-standalone body .luria-profile-toggle{width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;border-radius:11px!important}
    html.pwa-standalone body .luria-profile-toggle{font-size:21px!important}
    html.pwa-standalone body .luria-notification-panel,html.pwa-standalone body .luria-pomodoro-panel,html.pwa-standalone body .luria-profile-menu{position:fixed!important;top:calc(env(safe-area-inset-top) + 56px)!important;right:8px!important;left:auto!important;max-width:calc(100vw - 16px)!important;z-index:2147483000!important}
  }
  `;
  document.head.appendChild(style);
})();

/* PWA sidebar anchors v31 — streak/mode fixed; Trabalho PCR/mode fixed */
(function(){
 const style=document.createElement("style");style.id="luria-pwa-sidebar-anchors-v31";style.textContent=`
 @media(max-width:980px){
  html.pwa-standalone body #sidebar.sidebar{overflow:hidden!important;display:flex!important;flex-direction:column!important;height:100dvh!important}
  html.pwa-standalone body #sidebar.sidebar .sidebar-top{position:relative!important;top:auto!important;margin-top:0!important;padding-top:0!important;flex:0 0 auto!important}
  html.pwa-standalone body #sidebar.sidebar .nav,
  html.pwa-standalone body #sidebar.sidebar .nav-study,
  html.pwa-standalone body #sidebar.sidebar .nav-work{flex:1 1 auto!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior:contain!important}
  html.pwa-standalone body #sidebar.sidebar .sidebar-footer,
  html.pwa-standalone body #sidebar.sidebar .sidebar-footer-study,
  html.pwa-standalone body #sidebar.sidebar .sidebar-footer-work{position:relative!important;flex:0 0 auto!important;margin-top:8px!important;padding-top:8px!important;padding-bottom:max(8px,env(safe-area-inset-bottom))!important;background:var(--sidebar)!important;z-index:12!important}
  html.pwa-standalone body #sidebar.sidebar .streak-mini,
  html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch{flex-shrink:0!important}
  html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button,
  html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .luria-mode-footer-switch{flex-shrink:0!important}
 }`;document.head.appendChild(style);
})();

/* PWA topbar v32 — menu exatamente alinhado aos controles da direita */
(function(){
 const style=document.createElement("style");style.id="luria-pwa-topbar-align-v32";style.textContent=`
 @media(max-width:980px){
  html.pwa-standalone body .topbar{align-items:center!important}
  html.pwa-standalone body .topbar .menu-open,
  html.pwa-standalone body .topbar .luria-pomodoro-toggle,
  html.pwa-standalone body .topbar .luria-notification-toggle,
  html.pwa-standalone body .topbar .luria-profile-toggle{
   width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;
   margin-top:0!important;margin-bottom:0!important;align-self:center!important;transform:none!important;
   box-sizing:border-box!important
  }
  html.pwa-standalone body .topbar .menu-open{position:relative!important;top:auto!important;bottom:auto!important}
  html.pwa-standalone body .topbar .luria-notifications{align-self:center!important;height:40px!important;align-items:center!important}
 }`;document.head.appendChild(style);
})();


/* Global notification bell alignment v33 — desktop + mobile + PWA */
(function ensureGlobalNotificationBellAlignment(){
  if(document.getElementById("luria-notification-bell-align-v33")) return;
  const style=document.createElement("style");
  style.id="luria-notification-bell-align-v33";
  style.textContent=`
    body .topbar .luria-notification-toggle,
    body #luria-notification-toggle {
      display:grid!important;
      place-items:center!important;
      align-items:center!important;
      justify-items:center!important;
      padding:0!important;
      line-height:0!important;
      text-align:center!important;
    }

    body .topbar .luria-notification-toggle > svg,
    body #luria-notification-toggle > svg {
      position:static!important;
      inset:auto!important;
      display:block!important;
      grid-area:1 / 1!important;
      margin:0!important;
      padding:0!important;
      flex:none!important;
      align-self:center!important;
      justify-self:center!important;
      transform:translateY(-0.5px)!important;
      transform-origin:center!important;
    }

    body .topbar .luria-notification-toggle .luria-notification-badge,
    body #luria-notification-toggle .luria-notification-badge {
      grid-area:1 / 1!important;
      align-self:start!important;
      justify-self:end!important;
    }

    @media(max-width:980px){
      html.pwa-standalone body .topbar .luria-notification-toggle,
      html.pwa-standalone body #luria-notification-toggle {
        display:grid!important;
        place-items:center!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* Profile menu v34 — ações uniformes + saída destacada */
(function ensureProfileMenuUniformActions(){
  if(document.getElementById("luria-profile-menu-uniform-v34")) return;
  const style=document.createElement("style");
  style.id="luria-profile-menu-uniform-v34";
  style.textContent=`
    .luria-profile-menu{
      min-width:208px!important;
      padding:8px!important;
    }

    .luria-profile-menu > a,
    .luria-profile-menu > button:not(.luria-theme-switch){
      width:100%!important;
      height:42px!important;
      min-height:42px!important;
      padding:0 12px!important;
      margin:0!important;
      box-sizing:border-box!important;
      display:flex!important;
      align-items:center!important;
      justify-content:flex-start!important;
      border-radius:9px!important;
      font-size:13px!important;
      font-weight:750!important;
      line-height:1!important;
      text-align:left!important;
    }

    .luria-profile-menu > [data-restart-onboarding]{
      min-height:42px!important;
      height:42px!important;
    }

    .luria-profile-menu > #luria-profile-logout{
      min-height:42px!important;
      height:42px!important;
      margin-top:6px!important;
      border:1px solid color-mix(in srgb,var(--danger,#d84a4a) 58%,var(--border))!important;
      background:color-mix(in srgb,var(--danger,#d84a4a) 8%,var(--surface))!important;
      color:var(--danger,#d84a4a)!important;
      font-weight:850!important;
    }

    .luria-profile-menu > #luria-profile-logout:hover{
      border-color:var(--danger,#d84a4a)!important;
      background:color-mix(in srgb,var(--danger,#d84a4a) 14%,var(--surface))!important;
      color:var(--danger,#d84a4a)!important;
    }

    :root[data-theme="dark"] .luria-profile-menu > #luria-profile-logout{
      background:color-mix(in srgb,var(--danger,#e56464) 11%,var(--surface))!important;
      border-color:color-mix(in srgb,var(--danger,#e56464) 55%,var(--border))!important;
    }
  `;
  document.head.appendChild(style);
})();


/* Global topbar controls uniformity v35 */
(function ensureGlobalTopbarControlsUniformity(){
  if(document.getElementById("luria-global-topbar-controls-v35")) return;
  const style=document.createElement("style");
  style.id="luria-global-topbar-controls-v35";
  style.textContent=`
    /* Desktop/tablet: mesma caixa, raio, borda e alinhamento. */
    body .topbar .luria-notifications{
      display:flex!important;
      align-items:center!important;
      gap:10px!important;
      min-height:48px!important;
    }
    body .topbar .luria-pomodoro-toggle{
      height:48px!important;
      min-height:48px!important;
      min-width:164px!important;
      padding:0 14px!important;
      gap:10px!important;
      border:1px solid var(--border)!important;
      border-radius:12px!important;
      box-sizing:border-box!important;
      background:var(--surface)!important;
    }
    body .topbar .luria-notification-toggle,
    body .topbar .luria-profile-toggle{
      width:48px!important;
      height:48px!important;
      min-width:48px!important;
      min-height:48px!important;
      padding:0!important;
      border:1px solid var(--border)!important;
      border-radius:12px!important;
      box-sizing:border-box!important;
      background:var(--surface)!important;
    }
    body .topbar .luria-pomodoro-icon,
    body .topbar .luria-pomodoro-icon svg{
      width:22px!important;
      height:22px!important;
    }
    body .topbar .luria-pomodoro-icon{flex:0 0 22px!important}
    body .topbar .luria-notification-toggle > svg{
      width:20px!important;
      height:20px!important;
    }
    body .topbar .luria-profile-toggle{
      display:grid!important;
      place-items:center!important;
      color:var(--accent)!important;
      font-family:inherit!important;
      font-size:17px!important;
      font-weight:900!important;
      line-height:1!important;
      letter-spacing:-.02em!important;
      text-align:center!important;
    }
    body .topbar .luria-pomodoro-copy strong{
      font-size:13px!important;
      line-height:1.05!important;
      font-weight:850!important;
    }
    body .topbar .luria-pomodoro-copy small{
      margin-top:2px!important;
      font-size:11px!important;
      line-height:1!important;
      font-weight:800!important;
    }

    /* PWA/mobile: mesma escala compacta para os três controles. */
    @media(max-width:980px){
      html.pwa-standalone body .topbar .luria-notifications{
        height:40px!important;
        min-height:40px!important;
        gap:6px!important;
        align-items:center!important;
        align-self:flex-start!important;
        transform:translateY(-10px)!important;
      }
      html.pwa-standalone body .topbar .luria-pomodoro-toggle,
      html.pwa-standalone body .topbar .luria-notification-toggle,
      html.pwa-standalone body .topbar .luria-profile-toggle{
        width:40px!important;
        height:40px!important;
        min-width:40px!important;
        min-height:40px!important;
        padding:0!important;
        border-radius:11px!important;
        box-sizing:border-box!important;
        align-self:center!important;
        transform:none!important;
      }
      html.pwa-standalone body .topbar .luria-pomodoro-toggle{
        display:grid!important;
        place-items:center!important;
      }
      html.pwa-standalone body .topbar .luria-pomodoro-icon,
      html.pwa-standalone body .topbar .luria-pomodoro-icon svg{
        width:19px!important;
        height:19px!important;
      }
      html.pwa-standalone body .topbar .luria-pomodoro-icon{flex:0 0 19px!important}
      html.pwa-standalone body .topbar .luria-notification-toggle > svg{
        width:18px!important;
        height:18px!important;
      }
      html.pwa-standalone body .topbar .luria-profile-toggle{
        font-size:15px!important;
        letter-spacing:-.02em!important;
      }
      html.pwa-standalone body .topbar .luria-pomodoro-copy{
        display:none!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* Feedback obrigatório dos Beta Testers: reaparece 5 dias após cada envio. */
(function initBetaTesterFeedback() {
  let checking = false;
  let submitted = false;

  function ensureStyles() {
    if (document.getElementById("luria-beta-feedback-styles")) return;
    const style = document.createElement("style");
    style.id = "luria-beta-feedback-styles";
    style.textContent = `
      body.luria-beta-feedback-locked { overflow: hidden !important; }
      .luria-beta-feedback-overlay {
        position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center;
        padding: 22px; background: rgba(5, 20, 38, .72); backdrop-filter: blur(10px);
      }
      .luria-beta-feedback-overlay[hidden] { display: none !important; }
      .luria-beta-feedback-card {
        width: min(640px, 100%); max-height: min(760px, calc(100dvh - 32px)); overflow: auto;
        border: 1px solid var(--border); border-radius: 22px; padding: 26px;
        background: var(--surface, #fff); color: var(--text, #102033);
        box-shadow: 0 28px 80px rgba(0,0,0,.28);
      }
      .luria-beta-feedback-kicker {
        display: inline-flex; padding: 6px 10px; border-radius: 999px;
        background: color-mix(in srgb, var(--accent, #184888) 12%, transparent);
        color: var(--accent, #184888); font-size: 12px; font-weight: 850; letter-spacing: .04em;
        text-transform: uppercase;
      }
      .luria-beta-feedback-card h2 { margin: 12px 0 7px; font-size: clamp(24px, 4vw, 31px); }
      .luria-beta-feedback-card > p { margin: 0 0 20px; color: var(--muted, #667085); line-height: 1.55; }
      .luria-beta-feedback-fields { display: grid; gap: 15px; }
      .luria-beta-feedback-field { display: grid; gap: 7px; }
      .luria-beta-feedback-field span { font-size: 14px; font-weight: 800; }
      .luria-beta-feedback-field textarea {
        width: 100%; min-height: 118px; resize: vertical; box-sizing: border-box;
        border: 1px solid var(--border); border-radius: 13px; padding: 13px 14px;
        background: var(--surface-2, #f7f9fc); color: var(--text, #102033);
        font: inherit; line-height: 1.45; outline: none;
      }
      .luria-beta-feedback-field textarea:focus {
        border-color: var(--accent, #184888);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent, #184888) 14%, transparent);
      }
      .luria-beta-feedback-actions { margin-top: 18px; display: grid; gap: 9px; }
      .luria-beta-feedback-submit {
        min-height: 46px; border: 0; border-radius: 12px; padding: 0 18px;
        background: var(--accent, #184888); color: #fff; font: inherit; font-weight: 850; cursor: pointer;
      }
      .luria-beta-feedback-submit:disabled { opacity: .62; cursor: progress; }
      .luria-beta-feedback-message { min-height: 20px; color: var(--muted, #667085); font-size: 13px; text-align: center; }
      .luria-beta-feedback-message.is-error { color: #b42318; }
      @media (max-width: 640px) {
        .luria-beta-feedback-overlay { padding: 12px; }
        .luria-beta-feedback-card { padding: 20px 17px; border-radius: 18px; }
        .luria-beta-feedback-field textarea { min-height: 105px; }
      }
    `;
    document.head.appendChild(style);
  }

  function createModal() {
    let overlay = document.getElementById("luria-beta-feedback-overlay");
    if (overlay) return overlay;

    ensureStyles();
    overlay = document.createElement("div");
    overlay.id = "luria-beta-feedback-overlay";
    overlay.className = "luria-beta-feedback-overlay";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "luria-beta-feedback-title");
    overlay.innerHTML = `
      <form class="luria-beta-feedback-card" id="luria-beta-feedback-form">
        <span class="luria-beta-feedback-kicker">Beta Tester</span>
        <h2 id="luria-beta-feedback-title">Como está sua experiência com o LURIA?</h2>
        <p>Seu feedback periódico ajuda a definir os próximos ajustes. Para continuar usando o LURIA, responda os dois campos abaixo.</p>
        <div class="luria-beta-feedback-fields">
          <label class="luria-beta-feedback-field">
            <span>O que já está bom?</span>
            <textarea id="luria-beta-feedback-positives" maxlength="2500" required placeholder="Conte o que funcionou bem, o que você gostou ou o que deveria ser mantido."></textarea>
          </label>
          <label class="luria-beta-feedback-field">
            <span>O que podemos melhorar?</span>
            <textarea id="luria-beta-feedback-improvements" maxlength="2500" required placeholder="Conte o que incomodou, faltou, ficou confuso ou poderia funcionar melhor."></textarea>
          </label>
        </div>
        <div class="luria-beta-feedback-actions">
          <button class="luria-beta-feedback-submit" id="luria-beta-feedback-submit" type="submit">Enviar feedback</button>
          <div class="luria-beta-feedback-message" id="luria-beta-feedback-message" aria-live="polite"></div>
        </div>
      </form>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", event => {
      if (event.target === overlay) event.preventDefault();
    });

    document.addEventListener("keydown", event => {
      if (!overlay.hidden && event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    const form = overlay.querySelector("#luria-beta-feedback-form");
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const positives = overlay.querySelector("#luria-beta-feedback-positives").value.trim();
      const improvements = overlay.querySelector("#luria-beta-feedback-improvements").value.trim();
      const button = overlay.querySelector("#luria-beta-feedback-submit");
      const message = overlay.querySelector("#luria-beta-feedback-message");

      if (!positives || !improvements) {
        message.textContent = "Preencha os dois campos para continuar.";
        message.className = "luria-beta-feedback-message is-error";
        return;
      }

      button.disabled = true;
      message.textContent = "Enviando...";
      message.className = "luria-beta-feedback-message";

      try {
        const { error } = await window.supabaseClient.rpc("submit_beta_feedback", {
          p_positives: positives,
          p_improvements: improvements
        });
        if (error) throw error;
        submitted = true;
        overlay.hidden = true;
        document.body.classList.remove("luria-beta-feedback-locked");
        message.textContent = "";
      } catch (error) {
        console.warn("Não foi possível enviar o feedback beta:", error);
        message.textContent = "Não foi possível enviar. Verifique sua conexão e tente novamente.";
        message.className = "luria-beta-feedback-message is-error";
        button.disabled = false;
      }
    });

    return overlay;
  }

  async function checkBetaFeedback() {
    if (checking || submitted || !window.supabaseClient || !window.docmapUser?.id) return;

    const cacheKey = `docmap:beta-feedback-status:${window.docmapUser.id}`;
    try {
      const lastCheck = Number(sessionStorage.getItem(cacheKey) || 0);
      if (lastCheck && Date.now() - lastCheck < 60 * 60 * 1000) return;
    } catch {}

    checking = true;
    try {
      const { data, error } = await window.supabaseClient.rpc("beta_feedback_status");
      if (error) throw error;

      if (!data?.is_beta_tester || !data?.due) {
        try {
          sessionStorage.setItem(cacheKey, String(Date.now()));
        } catch {}
        return;
      }

      const overlay = createModal();
      overlay.hidden = false;
      document.body.classList.add("luria-beta-feedback-locked");
      requestAnimationFrame(() => {
        overlay.querySelector("#luria-beta-feedback-positives")?.focus();
      });
    } catch (error) {
      console.warn("Não foi possível verificar o feedback beta:", error);
    } finally {
      checking = false;
    }
  }

  window.addEventListener("docmap:ready", checkBetaFeedback);
  if (window.docmapUser?.id) checkBetaFeedback();
})();


/* Exact topbar/title geometry v37 — disabled.
   Topbar and title geometry are now CSS-only to avoid layout shaking. */



/* LURIA_BACK_SWITCH_BUTTONS_V1 */
(function(){
  function syncBackButtons(){
    document.querySelectorAll('button,a,[role="button"]').forEach(function(el){
      var txt=(el.textContent||'').trim().toLowerCase();
      var aria=(el.getAttribute('aria-label')||'').trim().toLowerCase();
      if(txt==='voltar'||txt.startsWith('voltar ')||txt.startsWith('← voltar')||aria==='voltar'||aria.startsWith('voltar ')){
        el.classList.add('luria-back-switch-btn');
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',syncBackButtons,{once:true});
  else syncBackButtons();
  new MutationObserver(syncBackButtons).observe(document.documentElement,{childList:true,subtree:true});
})();


/* LURIA_TOP_CONTROLS_LOCKED_V66 */
(function(){
  const style=document.createElement("style");
  style.id="luria-top-controls-locked-v66";
  style.textContent=`
    .topbar .luria-notifications,
    body:not([data-page="dashboard"]) .topbar .luria-notifications,
    body[data-page="dashboard"] .topbar .luria-notifications,
    html.pwa-standalone body .topbar .luria-notifications{
      position:static!important;
      inset:auto!important;
      top:auto!important;
      right:auto!important;
      bottom:auto!important;
      left:auto!important;
      margin:0 0 0 auto!important;
      transform:none!important;
      translate:none!important;
      animation:none!important;
      transition:none!important;
      will-change:auto!important;
      align-self:center!important;
    }
    .luria-notifications[data-luria-custom-position],
    .luria-notifications.luria-top-controls-dragging{
      position:static!important;
      inset:auto!important;
      transform:none!important;
      translate:none!important;
      user-select:auto!important;
      cursor:default!important;
    }
    .luria-top-controls-drag-handle{
      display:none!important;
      pointer-events:none!important;
    }
  `;
  document.head.appendChild(style);
})();


/* Dashboard-sized topbar controls v36 */
(function ensureDashboardSizedTopbarControls(){
  if(document.getElementById("luria-dashboard-sized-topbar-controls-v36")) return;
  const style=document.createElement("style");
  style.id="luria-dashboard-sized-topbar-controls-v36";
  style.textContent=`
    @media(min-width:981px){
      body:not([data-page="dashboard"]) .topbar .luria-notifications{
        min-height:43px!important;
        height:43px!important;
        gap:10px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-toggle{
        height:43px!important;
        min-height:43px!important;
        min-width:156px!important;
        width:auto!important;
        padding:0 12px!important;
        gap:8px!important;
        border-radius:12px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-icon,
      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-icon svg{
        width:20px!important;
        height:20px!important;
        flex:0 0 20px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-copy strong{
        font-size:12.5px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-copy small{
        font-size:10.5px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-notification-toggle,
      body:not([data-page="dashboard"]) .topbar .luria-profile-toggle{
        width:43px!important;
        height:43px!important;
        min-width:43px!important;
        min-height:43px!important;
        border-radius:12px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-notification-toggle > svg{
        width:19px!important;
        height:19px!important;
      }

      body:not([data-page="dashboard"]) .topbar .luria-profile-toggle{
        font-size:16px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* Dashboard-width timer v37 */
(function ensureDashboardWidthTimer(){
  if(document.getElementById("luria-dashboard-width-timer-v37")) return;
  const style=document.createElement("style");
  style.id="luria-dashboard-width-timer-v37";
  style.textContent=`
    @media(min-width:981px){
      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-toggle{
        width:auto!important;
        min-width:0!important;
        max-width:none!important;
        padding:0 10px!important;
        gap:8px!important;
      }
      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-copy{
        width:auto!important;
        min-width:0!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* Compact vertical timer internals v38 — keeps outer callout size unchanged */
(function ensureCompactVerticalTimerV38(){
  if(document.getElementById("luria-compact-vertical-timer-v38")) return;
  const style=document.createElement("style");
  style.id="luria-compact-vertical-timer-v38";
  style.textContent=`
    .luria-pomodoro-toggle{
      overflow:hidden!important;
    }

    .luria-pomodoro-toggle .luria-timer-compact{
      position:relative!important;
      display:grid!important;
      grid-template-columns:auto 18px!important;
      grid-template-rows:1fr!important;
      align-items:center!important;
      column-gap:4px!important;
      width:auto!important;
      min-width:0!important;
      height:32px!important;
      line-height:1!important;
      margin:0!important;
    }

    .luria-pomodoro-toggle .luria-timer-hm{
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:0!important;
      height:32px!important;
      min-height:32px!important;
      line-height:.86!important;
    }

    .luria-pomodoro-toggle .luria-timer-hm > strong{
      display:block!important;
      margin:0!important;
      padding:0!important;
      font-size:14px!important;
      font-weight:900!important;
      line-height:.86!important;
      letter-spacing:-.02em!important;
      color:currentColor!important;
      font-variant-numeric:tabular-nums!important;
    }

    .luria-pomodoro-toggle #luria-timer-seconds{
      position:relative!important;
      display:block!important;
      align-self:center!important;
      justify-self:start!important;
      margin:0!important;
      padding:0!important;
      font-size:8px!important;
      font-weight:850!important;
      line-height:1!important;
      color:var(--muted)!important;
      font-variant-numeric:tabular-nums!important;
      transform:translateY(0)!important;
    }

    .luria-pomodoro-toggle .luria-timer-sr-only{
      position:absolute!important;
      width:1px!important;
      height:1px!important;
      padding:0!important;
      margin:-1px!important;
      overflow:hidden!important;
      clip:rect(0,0,0,0)!important;
      white-space:nowrap!important;
      border:0!important;
    }

    /* Não altera dimensões externas já aprovadas. */
    @media(min-width:981px){
      body:not([data-page="dashboard"]) .topbar .luria-pomodoro-toggle{
        height:43px!important;
        min-height:43px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* Compact timer v39 — minutos em cima, segundos embaixo */
(function ensureCompactTimerMinutesSecondsV39(){
  if(document.getElementById("luria-compact-timer-ms-v39")) return;
  const style=document.createElement("style");
  style.id="luria-compact-timer-ms-v39";
  style.textContent=`
    .luria-pomodoro-toggle .luria-timer-compact{
      display:flex!important;
      align-items:center!important;
      width:auto!important;
      min-width:0!important;
      height:32px!important;
      margin:0!important;
    }

    .luria-pomodoro-toggle .luria-timer-ms{
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:0!important;
      height:32px!important;
      min-height:32px!important;
      margin:0!important;
      padding:0!important;
    }

    .luria-pomodoro-toggle .luria-timer-ms > strong{
      display:block!important;
      margin:0!important;
      padding:0!important;
      font-size:14px!important;
      font-weight:900!important;
      line-height:.86!important;
      letter-spacing:-.02em!important;
      color:currentColor!important;
      font-variant-numeric:tabular-nums!important;
    }

    .luria-pomodoro-toggle #luria-timer-seconds{
      font-size:14px!important;
      color:currentColor!important;
      transform:none!important;
    }
  `;
  document.head.appendChild(style);
})();


/* Compact timer v40 — minutos maiores, segundos menores */
(function ensureCompactTimerHierarchyV40(){
  if(document.getElementById("luria-compact-timer-hierarchy-v40")) return;
  const style=document.createElement("style");
  style.id="luria-compact-timer-hierarchy-v40";
  style.textContent=`
    .luria-pomodoro-toggle .luria-timer-ms > #luria-timer-minutes{
      font-size:16px!important;
      font-weight:900!important;
      line-height:.9!important;
    }

    .luria-pomodoro-toggle .luria-timer-ms > #luria-timer-seconds{
      font-size:10px!important;
      font-weight:850!important;
      line-height:.9!important;
      color:var(--muted)!important;
    }
  `;
  document.head.appendChild(style);
})();


/* Timer/Pomodoro v42 — pausa separada + aviso de transição */
(function ensureTimerControlsV42(){
  if(document.getElementById("luria-timer-controls-v42")) return;
  const style=document.createElement("style");
  style.id="luria-timer-controls-v42";
  style.textContent=`
    .luria-stopwatch-actions{
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
    }

    .luria-stopwatch-actions button:disabled{
      opacity:.45!important;
      cursor:default!important;
    }

    .luria-pomodoro-toggle.luria-pomodoro-attention{
      border-color:var(--accent)!important;
      background:var(--accent-soft)!important;
      color:var(--accent)!important;
      animation:luriaPomodoroAttention 900ms ease-in-out 0s 5;
    }

    @keyframes luriaPomodoroAttention{
      0%,100%{
        box-shadow:0 1px 2px rgba(15,23,42,.03);
        transform:scale(1);
      }
      50%{
        box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 18%,transparent);
        transform:scale(1.025);
      }
    }

    @media(prefers-reduced-motion:reduce){
      .luria-pomodoro-toggle.luria-pomodoro-attention{
        animation:none!important;
        box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 18%,transparent)!important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* PWA Trabalho — mantém PCR e troca de ambiente fixos no rodapé do menu. */
(function ensurePwaWorkSidebarAnchorsV32() {
  if (document.getElementById("luria-pwa-work-sidebar-anchors-v32")) return;
  const style = document.createElement("style");
  style.id = "luria-pwa-work-sidebar-anchors-v32";
  style.textContent = `
    @media (max-width: 980px) {
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar {
        display: flex !important;
        flex-direction: column !important;
        height: 100dvh !important;
        overflow: hidden !important;
      }

      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .nav,
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .nav-work {
        flex: 1 1 0% !important;
        min-height: 0 !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        overscroll-behavior: contain !important;
      }

      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-footer-work {
        display: grid !important;
        flex: 0 0 auto !important;
        margin-top: auto !important;
        position: sticky !important;
        bottom: 0 !important;
        padding-bottom: max(8px, env(safe-area-inset-bottom)) !important;
        background: var(--sidebar) !important;
        z-index: 12 !important;
      }

      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button,
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .luria-mode-footer-switch {
        flex: 0 0 auto !important;
      }
    }
  `;
  /* Alinha os dois controles do modo Trabalho aos do modo Estudos:
     PCR ocupa a altura do card Ofensiva, e a troca de ambiente mantém
     a mesma posição vertical do seletor de Trabalho. */
  style.textContent += `
    #sidebar.sidebar .sidebar-footer-work .work-pcr-button {
      box-sizing: border-box !important;
      height: 58px !important;
      min-height: 58px !important;
      padding: 6px 8px !important;
      gap: 7px !important;
    }

    #sidebar.sidebar .sidebar-footer-work .work-pcr-icon {
      width: 42px !important;
      height: 42px !important;
      flex-basis: 42px !important;
      font-size: 24px !important;
    }

    #sidebar.sidebar .sidebar-footer-work .luria-mode-footer-switch {
      box-sizing: border-box !important;
      height: 48px !important;
      min-height: 48px !important;
    }

    @media (max-width: 980px) {
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .sidebar-footer-work .work-pcr-button {
        height: 58px !important;
        min-height: 58px !important;
      }
    }
  `;

  document.head.appendChild(style);
})();


/* PWA Prática clínica — garante rolagem/touch da sidebar sem travar o drawer. */
(function ensurePwaPraticaSidebarScrollV213() {
  if (document.getElementById("luria-pwa-pratica-sidebar-scroll-v213")) return;
  const style = document.createElement("style");
  style.id = "luria-pwa-pratica-sidebar-scroll-v213";
  style.textContent = `
    @media (max-width: 980px) {
      html.pwa-standalone body[data-page="plantao"] #sidebar.sidebar {
        display: flex !important;
        flex-direction: column !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        overscroll-behavior-y: contain !important;
        touch-action: pan-y !important;
      }

      html.pwa-standalone body[data-page="plantao"] #sidebar.sidebar .nav,
      html.pwa-standalone body[data-page="plantao"] #sidebar.sidebar .nav-study {
        flex: 0 0 auto !important;
        min-height: auto !important;
        overflow: visible !important;
        touch-action: pan-y !important;
      }

      html.pwa-standalone body[data-page="plantao"] #sidebar.sidebar .sidebar-footer,
      html.pwa-standalone body[data-page="plantao"] #sidebar.sidebar .sidebar-footer-study {
        flex: 0 0 auto !important;
        position: relative !important;
        margin-top: 12px !important;
        overflow: visible !important;
      }

      html.pwa-standalone body[data-page="plantao"].sidebar-open {
        touch-action: none !important;
      }

      html.pwa-standalone body[data-page="plantao"].sidebar-open #sidebar.sidebar {
        touch-action: pan-y !important;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* LURIA v2026.10.02 — padroniza listas clicáveis e menus de opção do site. */
(function luriaNormalizeClickableListsV1(){
  const tag=(root=document)=>{
    root.querySelectorAll?.("select:not([multiple])").forEach(el=>el.classList.add("luria-site-select"));
    root.querySelectorAll?.('[role="listbox"],[role="menu"]').forEach(el=>{
      if(el.closest("#sidebar,.sidebar,.nav,.nav-study,.nav-submenu")) return;
      el.classList.add("luria-site-list");
    });
    root.querySelectorAll?.('div[id$="-menu"],section[id$="-menu"],ul[id$="-menu"]').forEach(el=>{
      if(el.closest("#sidebar,.sidebar,.nav,.nav-study,.nav-submenu")) return;
      if(el.classList.contains("notebook-emoji-menu")) return;
      el.classList.add("luria-site-list");
    });
  };
  const run=()=>tag(document);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
  new MutationObserver(records=>{
    for(const rec of records){
      rec.addedNodes.forEach(node=>{
        if(node.nodeType!==1) return;
        if(node.matches?.("select:not([multiple])")) node.classList.add("luria-site-select");
        if(node.matches?.('[role="listbox"],[role="menu"],div[id$="-menu"],section[id$="-menu"],ul[id$="-menu"]')){
          if(!node.closest("#sidebar,.sidebar,.nav,.nav-study,.nav-submenu")&&!node.classList.contains("notebook-emoji-menu")) node.classList.add("luria-site-list");
        }
        tag(node);
      });
    }
  }).observe(document.documentElement,{childList:true,subtree:true});
})();


/* LURIA intelligence / command center layer */
(function loadLuriaCommandCenter(){
  if (document.querySelector('script[data-luria-command-center]')) return;
  const script = document.createElement('script');
  script.src = '/assets/js/luria-command-center.js?v=20261004-search-removed-v44';
  script.defer = true;
  script.dataset.luriaCommandCenter = '1';
  document.head.appendChild(script);
})();



/* PWA mode switch v221 — fixed size/position + theme-safe colors */
(function ensurePwaModeSwitchV221(){
  if(document.getElementById("luria-pwa-mode-switch-v221")) return;
  const style=document.createElement("style");
  style.id="luria-pwa-mode-switch-v221";
  style.textContent=`
    @media (max-width:980px){
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch{
        display:flex!important;
        align-items:center!important;
        justify-content:flex-start!important;
        width:100%!important;
        height:48px!important;
        min-height:48px!important;
        max-height:48px!important;
        flex:0 0 48px!important;
        box-sizing:border-box!important;
        padding:7px 9px!important;
        gap:9px!important;
        margin:0!important;
        border:1px solid #D9E2EC!important;
        border-radius:12px!important;
        background:#E7EEF7!important;
        color:#184888!important;
        box-shadow:none!important;
        opacity:1!important;
        visibility:visible!important;
        overflow:hidden!important;
        transform:none!important;
        filter:none!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch:hover,
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch:active,
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch:focus{
        background:#E7EEF7!important;
        color:#184888!important;
        border-color:#D9E2EC!important;
        box-shadow:none!important;
        transform:none!important;
        filter:none!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-avatar,
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon{
        display:grid!important;
        place-items:center!important;
        width:30px!important;
        height:30px!important;
        min-width:30px!important;
        flex:0 0 30px!important;
        margin:0!important;
        border:0!important;
        border-radius:9px!important;
        background:rgba(24,72,136,.10)!important;
        color:#184888!important;
        opacity:1!important;
        visibility:visible!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy{
        display:grid!important;
        align-content:center!important;
        min-width:0!important;
        margin:0!important;
        opacity:1!important;
        visibility:visible!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy strong{
        display:block!important;
        margin:0!important;
        color:#184888!important;
        font-size:12px!important;
        font-weight:850!important;
        line-height:1.1!important;
        opacity:1!important;
        visibility:visible!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy small{
        display:block!important;
        margin-top:2px!important;
        color:#5F6F82!important;
        font-size:9.5px!important;
        font-weight:700!important;
        line-height:1.1!important;
        opacity:1!important;
        visibility:visible!important;
      }

      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch,
      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch:hover,
      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch:active{
        background:#E7EEF7!important;
        border-color:#D9E2EC!important;
        color:#184888!important;
      }

      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon{
        background:rgba(24,72,136,.10)!important;
        color:#184888!important;
      }

      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch .user-copy strong{
        color:#184888!important;
      }

      html.pwa-standalone:root[data-theme="dark"] body #sidebar.sidebar .luria-mode-footer-switch .user-copy small{
        color:#5F6F82!important;
      }

      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch,
      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch:hover,
      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch:active{
        background:var(--accent-soft)!important;
        border-color:var(--border)!important;
        color:var(--accent)!important;
      }

      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon{
        background:color-mix(in srgb,var(--accent) 12%,transparent)!important;
        color:var(--accent)!important;
      }

      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch .user-copy strong{
        color:var(--accent)!important;
      }

      html.pwa-standalone:root[data-theme="leila-mood"] body #sidebar.sidebar .luria-mode-footer-switch .user-copy small{
        color:var(--muted)!important;
      }

      html.pwa-standalone body #sidebar.sidebar .sidebar-footer-study .luria-mode-footer-switch,
      html.pwa-standalone body #sidebar.sidebar .sidebar-footer-work .luria-mode-footer-switch{
        position:relative!important;
        inset:auto!important;
      }
    }
  `;
  document.head.appendChild(style);
})();




/* PWA v36 — rodapé visual idêntico entre Estudos e Trabalho.
   PCR/Ofensiva e troca de ambiente deixam de depender da altura da navegação. */
(function ensurePwaSidebarFooterLockV36(){
  if(document.getElementById("luria-pwa-sidebar-footer-lock-v36")) return;
  const style=document.createElement("style");
  style.id="luria-pwa-sidebar-footer-lock-v36";
  style.textContent=`
    @media(max-width:980px){
      html.pwa-standalone body #sidebar.sidebar{
        position:fixed!important;
        height:100dvh!important;
        max-height:100dvh!important;
        overflow:hidden!important;
        padding-bottom:calc(154px + env(safe-area-inset-bottom))!important;
      }

      /* A navegação rola sozinha e nunca empurra o rodapé. */
      html.pwa-standalone body #sidebar.sidebar .nav,
      html.pwa-standalone body #sidebar.sidebar .nav-study,
      html.pwa-standalone body #sidebar.sidebar .nav-work,
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .nav{
        overflow-y:auto!important;
        overflow-x:hidden!important;
        min-height:0!important;
        max-height:none!important;
        padding-bottom:10px!important;
        -webkit-overflow-scrolling:touch!important;
      }

      /* O footer ocupa toda a largura interna, mas não participa do fluxo. */
      html.pwa-standalone body #sidebar.sidebar .sidebar-footer,
      html.pwa-standalone body #sidebar.sidebar .sidebar-footer-study,
      html.pwa-standalone body #sidebar.sidebar .sidebar-footer-work{
        position:absolute!important;
        left:15px!important;
        right:15px!important;
        bottom:calc(12px + env(safe-area-inset-bottom))!important;
        width:auto!important;
        margin:0!important;
        padding:0!important;
        display:block!important;
        background:transparent!important;
        z-index:30!important;
        overflow:visible!important;
      }

      /* Botão de troca: MESMO tamanho e MESMA posição nos dois ambientes. */
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch{
        position:absolute!important;
        left:0!important;
        right:0!important;
        bottom:0!important;
        top:auto!important;
        width:100%!important;
        min-width:100%!important;
        max-width:100%!important;
        height:58px!important;
        min-height:58px!important;
        max-height:58px!important;
        margin:0!important;
        padding:6px 14px!important;
        box-sizing:border-box!important;
        display:flex!important;
        align-items:center!important;
        justify-content:flex-start!important;
        gap:10px!important;
        border-radius:16px!important;
        transform:none!important;
        opacity:1!important;
      }

      /* Card superior: Ofensiva e PCR ocupam exatamente a mesma caixa. */
      html.pwa-standalone body #sidebar.sidebar .streak-mini,
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button{
        position:absolute!important;
        left:0!important;
        right:0!important;
        bottom:66px!important;
        top:auto!important;
        width:100%!important;
        min-width:100%!important;
        max-width:100%!important;
        height:58px!important;
        min-height:58px!important;
        max-height:58px!important;
        margin:0!important;
        box-sizing:border-box!important;
      }

      /* Geometria interna do seletor fica igual nos dois modos. */
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon,
      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-avatar{
        width:42px!important;
        height:42px!important;
        min-width:42px!important;
        min-height:42px!important;
        flex:0 0 42px!important;
        margin:0!important;
        border-radius:50%!important;
        display:grid!important;
        place-items:center!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy{
        display:grid!important;
        align-content:center!important;
        justify-items:start!important;
        gap:2px!important;
        min-width:0!important;
        opacity:1!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy strong{
        display:block!important;
        margin:0!important;
        font-size:16px!important;
        line-height:1.05!important;
        font-weight:900!important;
        opacity:1!important;
      }

      html.pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .user-copy small{
        display:block!important;
        margin:0!important;
        font-size:9px!important;
        line-height:1.1!important;
        font-weight:800!important;
        opacity:.92!important;
      }

      /* Claro + escuro: fundo azul oficial e absolutamente tudo branco. */
      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch{
        background:#184888!important;
        background-color:#184888!important;
        border:1px solid #184888!important;
        box-shadow:0 8px 20px rgba(24,72,136,.20)!important;
      }

      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch,
      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch *,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch *{
        color:#fff!important;
        -webkit-text-fill-color:#fff!important;
        text-shadow:none!important;
      }

      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch .luria-mode-icon{
        background:rgba(255,255,255,.16)!important;
        border-color:transparent!important;
      }

      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch svg,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch svg,
      html[data-theme="light"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch svg *,
      html[data-theme="dark"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch svg *{
        color:#fff!important;
        stroke:#fff!important;
        fill:none!important;
        opacity:1!important;
      }

      /* Rosa segue a mesma cor do callout superior. */
      html[data-theme="leila-mood"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch,
      html[data-theme="pink"].pwa-standalone body #sidebar.sidebar .luria-mode-footer-switch,
      html.pwa-standalone body.theme-leila-mood #sidebar.sidebar .luria-mode-footer-switch{
        background:var(--accent)!important;
        background-color:var(--accent)!important;
        border-color:var(--accent)!important;
      }

      /* Fogo da ofensiva cabe dentro da caixa sem alterar o card. */
      html.pwa-standalone body #sidebar.sidebar .streak-mini{
        padding:5px 10px!important;
        gap:8px!important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-icon{
        width:40px!important;
        height:48px!important;
        min-width:40px!important;
        min-height:48px!important;
        flex:0 0 40px!important;
      }

      html.pwa-standalone body #sidebar.sidebar .streak-mini-flame{
        width:34px!important;
        height:43px!important;
        max-width:34px!important;
        max-height:43px!important;
        margin:auto!important;
      }

      /* PCR usa a mesma caixa externa, mantendo sua identidade vermelha. */
      html.pwa-standalone body[data-page^="trabalho_"] #sidebar.sidebar .work-pcr-button{
        padding:6px 10px!important;
        gap:9px!important;
        border-radius:16px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();






/* LURIA guided study — strict step completion v1 */
(function installGuidedStudyCompletion(){
  if(window.LuriaGuidedStudy?.completeActiveStep)return;
  const api=window.LuriaGuidedStudy||{};
  api.completeActiveStep=function(source){
    try{
      const active=JSON.parse(sessionStorage.getItem("luria:guided-study-active")||"null");
      if(!active?.plan?.createdAt||!Number.isInteger(active.activeIndex))return false;
      sessionStorage.setItem("luria:guided-study-step-complete",JSON.stringify({
        createdAt:active.plan.createdAt,
        activeIndex:active.activeIndex,
        source:String(source||"completed"),
        completedAt:Date.now()
      }));
      return true;
    }catch{return false}
  };
  window.LuriaGuidedStudy=api;
})();


/* LURIA GLOBAL DESKTOP SHELL CHROME v1 — 2026-10-04 */
(() => {
  if (window.__luriaGlobalDesktopShellChrome) return;
  window.__luriaGlobalDesktopShellChrome = true;

  function mountGlobalChrome(){
    if (window.innerWidth < 981) return;
    const shell=document.querySelector(".app-shell");
    const topbar=document.querySelector(".topbar");
    const sidebar=document.querySelector("#sidebar.sidebar");
    if(!shell||!topbar||!sidebar)return;

    if(topbar.parentElement!==shell){
      shell.appendChild(topbar);
    }
    topbar.classList.add("dashboard-shell-topbar","luria-global-shell-topbar");
    sidebar.classList.add("dashboard-shell-sidebar","luria-global-shell-sidebar");
    document.body.classList.add("luria-global-shell-mounted");
  }

  const boot=()=>{
    mountGlobalChrome();
    setTimeout(mountGlobalChrome,120);
    setTimeout(mountGlobalChrome,400);
    setTimeout(mountGlobalChrome,900);
    setTimeout(mountGlobalChrome,1600);
  };

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }

  window.addEventListener("resize",mountGlobalChrome,{passive:true});
  new MutationObserver(mountGlobalChrome).observe(document.documentElement,{childList:true,subtree:true});
})();


/* LURIA GLOBAL MASTER CSS ENSURE v74 — 2026-10-04 */
(() => {
  if (window.__luriaGlobalMasterCssEnsure) return;
  window.__luriaGlobalMasterCssEnsure = true;

  const ensure = () => {
    if (!document.querySelector(".app-shell")) return;
    const href = "/assets/css/luria-brand-v5.css?v=20261004-dashboard-pattern-v78";
    let link = document.getElementById("luria-global-master-css");
    if (!link) {
      link = document.createElement("link");
      link.id = "luria-global-master-css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensure, { once: true });
  } else {
    ensure();
  }
  setTimeout(ensure, 250);
})();











