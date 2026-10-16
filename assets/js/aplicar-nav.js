/* ==============================================================================
   LURIA — Navegação Interna da Seção Aplicar
   Gerencia abas (Editais, Vocação e Radar de Provas), sincronização com URL e PWA.
   ============================================================================== */

(() => {
  "use strict";

  const VALID_TABS = ["editais", "vocacao", "radar"];
  const DEFAULT_TAB = "editais";

  function getActiveTabFromUrl() {
    const hash = window.location.hash.replace(/^#/, "").toLowerCase();
    if (VALID_TABS.includes(hash)) return hash;

    // Verificar se a rota atual é de subdiretório (ex.: /aplicar/vocacao/)
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/vocacao")) return "vocacao";
    if (path.includes("/radar")) return "radar";
    if (path.includes("/editais")) return "editais";

    return DEFAULT_TAB;
  }

  function activateTab(tabId, updateUrl = true) {
    if (!VALID_TABS.includes(tabId)) tabId = DEFAULT_TAB;

    // Atualiza classes e estados de acessibilidade nos links de navegação
    const navLinks = document.querySelectorAll("[data-aplicar-tab]");
    navLinks.forEach(link => {
      const isTarget = link.getAttribute("data-aplicar-tab") === tabId;
      link.classList.toggle("active", isTarget);
      link.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    // Alterna a visibilidade dos painéis correspondentes
    const panels = document.querySelectorAll(".aplicar-panel");
    panels.forEach(panel => {
      const panelId = panel.id.replace(/^aplicar-panel-/, "");
      const isTarget = panelId === tabId;
      if (isTarget) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });

    // Atualiza a URL sem recarregar a página
    if (updateUrl && window.location.hash !== `#${tabId}`) {
      history.replaceState(null, "", `#${tabId}`);
    }

    // Dispara evento para que os módulos internos (Vocação, Radar, Editais) possam se recalibrar
    window.dispatchEvent(new CustomEvent("luria:aplicar-tab-changed", {
      detail: { activeTab: tabId }
    }));
  }

  function initAplicarNav() {
    const nav = document.querySelector(".aplicar-nav");
    if (!nav) return;

    // Adiciona listener nos cliques de abas
    nav.addEventListener("click", event => {
      const targetLink = event.target.closest("[data-aplicar-tab]");
      if (!targetLink) return;

      event.preventDefault();
      const tabId = targetLink.getAttribute("data-aplicar-tab");
      activateTab(tabId, true);
    });

    // Escuta mudanças no hash da URL (navegação pelo histórico do navegador)
    window.addEventListener("hashchange", () => {
      activateTab(getActiveTabFromUrl(), false);
    });

    // Ativa a aba inicial baseada na URL
    activateTab(getActiveTabFromUrl(), false);
  }

  // Inicialização quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAplicarNav);
  } else {
    initAplicarNav();
  }

  // Exportação pública para permitir alternância programática
  window.LuriaAplicarNav = Object.freeze({
    activate: activateTab,
    getActive: getActiveTabFromUrl
  });
})();
