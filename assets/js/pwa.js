(() => {
  const standalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches
    || window.navigator.standalone === true;

  if (standalone) {
    document.documentElement.classList.add("pwa-standalone");
    document.documentElement.dataset.pwa = "standalone";

    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    );

    const zoomLockStyle = document.createElement("style");
    zoomLockStyle.id = "luria-pwa-double-tap-lock";
    zoomLockStyle.textContent = `
      html.pwa-standalone,
      html.pwa-standalone body {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden !important;
        overscroll-behavior-x: none;
        touch-action: pan-y;
      }

      html.pwa-standalone .app-shell,
      html.pwa-standalone .main,
      html.pwa-standalone .page {
        max-width: 100%;
        min-width: 0;
        overflow-x: hidden !important;
      }

      html.pwa-standalone input,
      html.pwa-standalone textarea,
      html.pwa-standalone select {
        font-size: max(16px, 1em) !important;
      }

      html.pwa-standalone button,
      html.pwa-standalone input,
      html.pwa-standalone textarea,
      html.pwa-standalone select,
      html.pwa-standalone a {
        touch-action: manipulation;
      }
    `;
    document.head.appendChild(zoomLockStyle);

    document.addEventListener(
      "dblclick",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );

    document.addEventListener(
      "gesturestart",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
  }

  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(
        "/service-worker.js",
        {
          scope: "/",
          updateViaCache: "none"
        }
      )
      .then(
        (registration) =>
          registration.update()
      )
      .catch((error) => {
        console.warn("Não foi possível ativar o modo PWA do LURIA:", error);
      });
  });
})();
