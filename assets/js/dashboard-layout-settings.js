(() => {
  const allowed = new Set(["classic", "cards"]);
  const options = document.getElementById("dashboard-layout-options");
  const status = document.getElementById("dashboard-layout-status");
  if (!options) return;

  function load() {
    const selected = window.TraubeDashboardPreference?.read() || "classic";
    const input = options.querySelector(`input[value="${selected}"]`);
    if (input) input.checked = true;
  }

  options.addEventListener("change", (event) => {
    const value = event.target?.value;
    if (!allowed.has(value)) return;
    const saved = window.TraubeDashboardPreference?.write(value) === true;
    if (!saved) load();
    if (status) status.textContent = saved ? "Layout selecionado. Abra o dashboard para visualizar."
      : "Não foi possível salvar a escolha neste dispositivo.";
  });

  load();
  window.addEventListener("docmap:ready", load);
  window.addEventListener("luria:owner-changed", load);
  window.addEventListener("luria:dashboard-layout-changed", load);
  window.addEventListener("pageshow", load);
  window.addEventListener("storage", event => {
    if (event.key === null || event.key === window.TraubeDashboardPreference?.key()) load();
  });
  window.TraubeLocalOwnerStore?.ready?.then(load);
})();


(() => {
  const allowed = new Set(["detailed", "simple"]);
  const options = document.getElementById("work-dashboard-layout-options");
  const status = document.getElementById("work-dashboard-layout-status");
  if (!options) return;

  function key() {
    return `luria:work-dashboard-layout:${window.docmapUser?.id || "guest"}`;
  }

  function load() {
    let selected = "detailed";
    try { selected = localStorage.getItem(key()) || "detailed"; } catch {}
    const input = options.querySelector(`input[value="${allowed.has(selected) ? selected : "detailed"}"]`);
    if (input) input.checked = true;
  }

  options.addEventListener("change", (event) => {
    const value = event.target?.value;
    if (!allowed.has(value)) return;
    try {
      localStorage.setItem(key(), value);
      if (status) status.textContent = "Layout do Trabalho salvo.";
    } catch {
      if (status) status.textContent = "Não foi possível salvar a escolha neste dispositivo.";
    }
  });

  load();
  window.addEventListener("docmap:ready", load, { once: true });
})();
