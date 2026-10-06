(() => {
  const allowed = new Set(["1", "2", "3", "5"]);
  const options = document.getElementById("dashboard-layout-options");
  const status = document.getElementById("dashboard-layout-status");
  if (!options) return;

  function key() {
    return `luria:dashboard-layout:${window.docmapUser?.id || "guest"}`;
  }

  function load() {
    let selected = "1";
    try { selected = localStorage.getItem(key()) || "1"; } catch {}
    if (!allowed.has(selected)) {
      selected = "1";
      try { localStorage.setItem(key(), selected); } catch {}
    }
    const input = options.querySelector(`input[value="${selected}"]`);
    if (input) input.checked = true;
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
