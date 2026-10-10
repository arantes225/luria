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

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/", updateViaCache: "none" })
      .then(registration => registration.update())
      .catch(error => {
        console.warn("Não foi possível ativar o modo PWA do LURIA:", error);
      });
  });
})();
