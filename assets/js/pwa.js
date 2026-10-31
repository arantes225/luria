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


  }

  if (!("serviceWorker" in navigator)) return;
  // The standalone /traube/ project URL is an online fallback; its legacy SW
  // assumes origin-root URLs. Do not install a worker with invalid cache scope.
  if (new URL(document.baseURI).pathname !== "/") return;


  const release = "20261031-ecg-v6";

  

  const refreshKey = "traube:pwa:activated:" + release;
  let reloadPending = false;
  const hadController = !!navigator.serviceWorker.controller;

  function refreshNow() {
    if (reloadPending) return;
    reloadPending = true;
    try { sessionStorage.setItem(refreshKey, "1"); } catch {}
    window.location.reload();
  }

  function showUpdateAction() {
    if (document.getElementById("traube-pwa-update-action")) return;
    const notice = document.createElement("aside");
    notice.id = "traube-pwa-update-action";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.style.cssText = "position:fixed;bottom:calc(var(--ui-bottom-navigation,env(safe-area-inset-bottom,0px)) + 12px);left:12px;right:12px;z-index:2147483646;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:16px;background:#172033;color:#fff;box-shadow:0 8px 32px #0004;font:14px system-ui";
    const message = document.createElement("span");
    message.textContent = "Atualização do TRAUBE disponível.";
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
      if (!hadController || alreadyRefreshed || reloadPending) return;
      // Never reload notes, forms or an active study session automatically.
      showUpdateAction();
    });
  }

  let registrationPromise;
  async function registerLatestWorker() {
    try {
      registrationPromise ||= navigator.serviceWorker.register(
        (window.traubeSitePath?.("/service-worker.js?v=" + release) || "/service-worker.js?v=" + release),
        { scope: (new URL(document.baseURI)).pathname, updateViaCache: "none" }
      );
      const registration = await registrationPromise;
      await registration.update();
    } catch (error) {
      registrationPromise = null;
      console.warn("Não foi possível atualizar o PWA do TRAUBE:", error);
    }
  }

  // An installed iOS PWA frequently resumes without dispatching another load.
  // Recheck on pageshow/foreground so long-lived standalone sessions are updated.
  let lastCheck = 0;
  function checkOnResume() {
    const now = Date.now();
    if (navigator.onLine === false || now - lastCheck < 300000) return;
    lastCheck = now;
    registerLatestWorker();
  }
  window.addEventListener("pageshow", checkOnResume);
  window.addEventListener("online", () => { lastCheck = 0; checkOnResume(); });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkOnResume();
  });
  if (document.readyState === "complete") checkOnResume();
  else window.addEventListener("load", checkOnResume, { once: true });
})();
