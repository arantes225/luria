(() => {
  const standalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches
    || window.navigator.standalone === true;

  if (standalone) {
    const html = document.documentElement;
    const modernShell = document.body?.dataset.uiNav === "v2";

    // The v2 app uses the same responsive layout in Safari and when installed.
    // Legacy PWA-only CSS must not override its navigation, layers or buttons.
    html.classList.toggle("pwa-v2-standalone", modernShell);
    html.classList.toggle("pwa-standalone", !modernShell);
    html.dataset.pwa = "standalone";

    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      document.head.appendChild(viewport);
    }
    // Keep native pinch-zoom and form interactions available on iOS.
    viewport.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");

    if (modernShell && !document.getElementById("luria-pwa-v2-safe-area")) {
      const safeAreaStyle = document.createElement("style");
      safeAreaStyle.id = "luria-pwa-v2-safe-area";
      safeAreaStyle.textContent = `
        @media (max-width:980px) {
          html.pwa-v2-standalone body[data-ui-nav="v2"] {
            --ui-nav-height:calc(64px + env(safe-area-inset-top, 0px));
            --ui-topbar:var(--ui-nav-height);
          }
          html.pwa-v2-standalone body[data-ui-nav="v2"] .topbar {
            box-sizing:border-box!important;
            padding-top:env(safe-area-inset-top, 0px)!important;
            padding-left:max(.75rem, env(safe-area-inset-left, 0px))!important;
            padding-right:max(.75rem, env(safe-area-inset-right, 0px))!important;
          }
          html.pwa-v2-standalone body[data-ui-nav="v2"] #sidebar.sidebar {
            box-sizing:border-box!important;
            padding-top:calc(1rem + env(safe-area-inset-top, 0px))!important;
            padding-bottom:calc(1rem + env(safe-area-inset-bottom, 0px))!important;
            overflow-y:auto!important;
          }
          html.pwa-v2-standalone body[data-ui-nav="v2"] .main > .page {
            padding-bottom:calc(1.5rem + env(safe-area-inset-bottom, 0px))!important;
          }
          html.pwa-v2-standalone body[data-ui-nav="v2"] :is(input, select, textarea) {
            font-size:max(16px, 1em);
          }
        }
      `;
      document.head.appendChild(safeAreaStyle);
    }
  }

  if (!("serviceWorker" in navigator)) return;

  const release = "20261010-pwa279";
  const refreshKey = "luria:pwa:activated:" + release;
  let interacted = false;
  let reloadPending = false;
  document.addEventListener("pointerdown", () => { interacted = true; }, { capture: true, once: true });
  document.addEventListener("keydown", () => { interacted = true; }, { capture: true, once: true });

  function refreshNow() {
    if (reloadPending) return;
    reloadPending = true;
    try { sessionStorage.setItem(refreshKey, "1"); } catch {}
    window.location.reload();
  }

  function showUpdateAction() {
    if (document.getElementById("luria-pwa-update-action")) return;
    const notice = document.createElement("aside");
    notice.id = "luria-pwa-update-action";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.style.cssText = "position:fixed;bottom:max(12px,env(safe-area-inset-bottom));left:12px;right:12px;z-index:2147483646;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:12px;background:#172033;color:#fff;box-shadow:0 8px 32px #0004;font:14px system-ui";
    const message = document.createElement("span");
    message.textContent = "Atualização do LURIA disponível.";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Atualizar agora";
    button.style.cssText = "min-height:42px;padding:0 12px;border:0;border-radius:8px;background:#fff;color:#172033;font:600 14px system-ui;cursor:pointer";
    button.addEventListener("click", refreshNow);
    notice.append(message, button);
    document.body.append(notice);
  }

  if (standalone) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      let alreadyRefreshed = false;
      try { alreadyRefreshed = sessionStorage.getItem(refreshKey) === "1"; } catch {}
      if (alreadyRefreshed || reloadPending) return;
      if (!interacted && document.visibilityState === "visible") refreshNow();
      else showUpdateAction();
    });
  }

  async function registerLatestWorker() {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js?v=" + release,
        { scope: "/", updateViaCache: "none" }
      );
      await registration.update();
    } catch (error) {
      console.warn("Não foi possível atualizar o PWA do LURIA:", error);
    }
  }

  // An installed iOS PWA frequently resumes without dispatching another load.
  // Recheck on pageshow/foreground so long-lived standalone sessions are updated.
  let lastCheck = 0;
  function checkOnResume() {
    const now = Date.now();
    if (now - lastCheck < 30000) return;
    lastCheck = now;
    registerLatestWorker();
  }
  window.addEventListener("pageshow", checkOnResume);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkOnResume();
  });
  if (document.readyState === "complete") checkOnResume();
  else window.addEventListener("load", checkOnResume, { once: true });
})();
