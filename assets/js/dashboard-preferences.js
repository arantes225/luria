/* One account-scoped preference shared by Settings and the Study Dashboard. */
(() => {
  const base = "luria:dashboard-layout";
  const valid = value => value === "classic" || value === "cards";
  function read() {
    const store = window.LuriaLocalOwnerStore;
    if (!store?.ownerId) return "classic";
    try {
      const value = store.read(base);
      // Numeric values belonged to retired layouts, including the old option 2.
      // Never interpret those as the new Cards view or adopt a guest preference.
      if (value !== null && value !== undefined && !valid(value)) store.write(base, "classic");
      // Retire the temporary Dashboard-only selector; it is no longer a source of truth.
      try { store.remove?.("luria:dashboard-view:v1"); } catch { /* Cleanup cannot invalidate a saved choice. */ }
      return valid(value) ? value : "classic";
    } catch { return "classic"; }
  }
  function write(value) {
    if (!valid(value)) return false;
    try {
      if (window.LuriaLocalOwnerStore?.write(base, value) !== true) return false;
      window.dispatchEvent(new CustomEvent("luria:dashboard-layout-changed"));
      return true;
    } catch { return false; }
  }
  window.LuriaDashboardPreference = { read, write, key: () => window.LuriaLocalOwnerStore?.key(base) };
})();
