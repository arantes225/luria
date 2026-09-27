(() => {
  const allowed = new Set(["old", "1", "2", "3", "4"]);
  const options = document.getElementById("dashboard-layout-options");
  const status = document.getElementById("dashboard-layout-status");
  if (!options) return;

  function key() {
    return `luria:dashboard-layout:${window.docmapUser?.id || "guest"}`;
  }

  function load() {
    let selected = "1";
    try { selected = localStorage.getItem(key()) || "1"; } catch {}
    options.querySelector(`input[value="${allowed.has(selected) ? selected : "1"}"]`).checked = true;
  }

  options.addEventListener("change", (event) => {
    const value = event.target?.value;
    if (!allowed.has(value)) return;
    try {
      localStorage.setItem(key(), value);
      status.textContent = "Layout selecionado. Abra o dashboard para visualizar.";
    } catch {
      status.textContent = "Não foi possível salvar a escolha neste dispositivo.";
    }
  });

  load();
  window.addEventListener("docmap:ready", load, { once: true });
})();
