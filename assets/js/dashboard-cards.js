/* Presentation only: preserve the classic Dashboard DOM, data and lifecycle. */
(() => {
  const body = document.body;
  const panel = document.getElementById("dashboard-apps");
  if (body?.dataset.page !== "dashboard" || !panel) return;
  const cards = [...panel.querySelectorAll("[data-dashboard-app]")];
  const status = document.getElementById("dashboard-apps-status");
  const valid = value => value === "classic" || value === "cards";
  const ownerStore = window.TraubeLocalOwnerStore;
  let ownerReady = !ownerStore?.ready || !!ownerStore.ownerId;
  const loading = document.getElementById("dashboard-loading");
  const main = document.getElementById("dashboard-content");

  function pending() {
    body.dataset.dashboardView = "pending";
    panel.hidden = true;
    if (loading) loading.hidden = false;
    main?.setAttribute("aria-busy", "true");
  }

  function show(view) {
    const selected = valid(view) ? view : "classic";
    // The classic renderer and presentation adapter finish independently.
    // Do not expose the static/default layout before both have prepared it.
    if (selected === "classic" && body.dataset.dashboardPresentationReady !== "true") {
      pending();
      return;
    }
    body.dataset.dashboardView = selected;
    const alternative = document.getElementById("dashboard-alternative");
    if (alternative && panel) {
      panel.before(alternative);
      alternative.hidden = false;
    }
    panel.hidden = selected !== "cards";
    if (loading) loading.hidden = true;
    main?.setAttribute("aria-busy", "false");
  }
  function restore() {
    const queryView = new URLSearchParams(window.location.search).get("view");
    if (valid(queryView)) {
      show(queryView);
      if (status) status.textContent = "";
      return;
    }
    // A missing owner during Auth initialization is not a Classic preference.
    if (!ownerReady && !ownerStore?.ownerId) { pending(); return; }
    show(window.TraubeDashboardPreference?.read());
    if (status) status.textContent = "";
  }
  function updateAccess() {
    const signedIn = !!window.docmapUser && !!window.TraubeLocalOwnerStore?.ownerId
      && window.docmapUser.id === window.TraubeLocalOwnerStore.ownerId;
    for (const card of cards) {
      const feature = card.dataset.dashboardFeature;
      const checking = !signedIn || (feature && window.docmapIsAdmin !== true && !window.docmapEntitlements);
      const allowed = !checking && (!feature || window.docmapIsAdmin === true
        || (typeof window.temFeature === "function" && window.temFeature(window.docmapEntitlements, feature)));
      card.dataset.dashboardLocked = String(!allowed);
      card.setAttribute("aria-disabled", String(!allowed));
      const label = card.querySelector("[data-dashboard-access]");
      label.hidden = allowed;
      label.textContent = checking ? "Verificando acesso…" : "Indisponível para sua conta";
    }
  }
  // These new links use the existing feature decision. Capture prevents duplicate
  // legacy Plus alerts; allowed links retain native navigation and modifier keys.
  panel.addEventListener("click", event => {
    const card = event.target.closest("[data-dashboard-app]");
    if (!card || !panel.contains(card)) return;
    updateAccess();
    event.stopImmediatePropagation();
    if (card.dataset.dashboardLocked !== "true") return;
    event.preventDefault();
    const message = card.querySelector("[data-dashboard-access]").textContent;
    if (status) status.textContent = message;
    window.TraubeDialog?.alert(message);
  }, true);
  window.addEventListener("docmap:ready", () => { restore(); updateAccess(); });
  window.addEventListener("docmap:access-updated", updateAccess);
  window.addEventListener("traube:owner-changed", () => { restore(); updateAccess(); });
  window.addEventListener("traube:dashboard-layout-changed", restore);
  window.addEventListener("traube:dashboard-presentation-ready", restore);
  window.addEventListener("pageshow", () => { restore(); updateAccess(); });
  window.addEventListener("storage", event => {
    if (event.key === null || event.key === window.TraubeDashboardPreference?.key()) restore();
  });
  restore();
  updateAccess();
  ownerStore?.ready?.then(() => { ownerReady = true; restore(); updateAccess(); });
})();
