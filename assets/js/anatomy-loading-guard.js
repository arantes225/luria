(function () {
  const root = document.querySelector("[data-anatomy-viewer]");
  const loading = root?.querySelector("[data-anatomy-loading]");
  if (!root || !loading) return;

  let finished = false;
  let observer;

  function stopGuard() {
    if (finished) return;
    finished = true;
    window.clearTimeout(timeout);
    observer?.disconnect();
  }

  function showFallback() {
    if (finished || root.classList.contains("is-ready") || root.classList.contains("is-static")) return;
    finished = true;
    observer?.disconnect();
    root.classList.add("is-static");
    loading.classList.add("anatomy-static-fallback");
    loading.innerHTML = '<img src="/assets/img/anatomia/coracao-estatico.webp" alt="Vista anatômica externa do coração humano"><strong>Visualização estática</strong><span>O modelo 3D demorou mais que o esperado. As estruturas e o conteúdo continuam disponíveis.</span>';
    const status = document.querySelector("[data-anatomy-status]");
    if (status) status.textContent = "O modelo 3D não ficou disponível. Uma imagem estática do coração foi exibida.";
  }

  const timeout = window.setTimeout(showFallback, 15000);
  observer = new MutationObserver(() => {
    if (root.classList.contains("is-ready") || root.classList.contains("is-static")) stopGuard();
  });
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });

  window.addEventListener("error", event => {
    if (event.target instanceof HTMLScriptElement && event.target.src.includes("traube-anatomy-viewer")) showFallback();
  }, true);
})();
