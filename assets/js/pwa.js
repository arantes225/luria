(() => {
  const standalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches
    || window.navigator.standalone === true;

  if (standalone) {
    document.documentElement.classList.add("pwa-standalone");
    document.documentElement.dataset.pwa = "standalone";

    const zoomLockStyle = document.createElement("style");
    zoomLockStyle.id = "luria-pwa-double-tap-lock";
    zoomLockStyle.textContent = `
      html.pwa-standalone,
      html.pwa-standalone body,
      html.pwa-standalone .app-shell,
      html.pwa-standalone .main,
      html.pwa-standalone .page {
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
