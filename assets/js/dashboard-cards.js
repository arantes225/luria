/* Presentation only: preserve the classic Dashboard DOM, data and lifecycle. */
(() => {
  const body = document.body;
  const panel = document.getElementById("dashboard-apps");
  if (body?.dataset.page !== "dashboard" || !panel) return;
  const cards = [...panel.querySelectorAll("[data-dashboard-app]")];
  const status = document.getElementById("dashboard-apps-status");
  const valid = value => value === "classic" || value === "cards";

  function show(view) {
    const selected = valid(view) ? view : "classic";
    body.dataset.dashboardView = selected;
    panel.hidden = selected !== "cards";
  }
  function restore() {
    show(window.LuriaDashboardPreference?.read());
    if (status) status.textContent = "";
  }
  function updateAccess() {
    const signedIn = !!window.docmapUser && !!window.LuriaLocalOwnerStore?.ownerId
      && window.docmapUser.id === window.LuriaLocalOwnerStore.ownerId;
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
    window.LuriaDialog?.alert(message);
  }, true);
  window.addEventListener("docmap:ready", () => { restore(); updateAccess(); });
  window.addEventListener("docmap:access-updated", updateAccess);
  window.addEventListener("luria:owner-changed", () => { restore(); updateAccess(); });
  window.addEventListener("luria:dashboard-layout-changed", restore);
  window.addEventListener("pageshow", () => { restore(); updateAccess(); });
  window.addEventListener("storage", event => {
    if (event.key === null || event.key === window.LuriaDashboardPreference?.key()) restore();
  });
  restore();
  updateAccess();
  window.LuriaLocalOwnerStore?.ready?.then(() => { restore(); updateAccess(); });
})();
