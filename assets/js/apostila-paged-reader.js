/* TRAUBE: leitura por páginas sem duplicar nem alterar o conteúdo das apostilas. */
(() => {
  "use strict";
  if (window.TraubePagedReader) return;
  const main = document.querySelector(".book-page .book-main");
  const bookPage = main?.closest(".book-page");
  if (!main || !bookPage || !document.querySelector(".book-hero, .book-section")) return;
  window.TraubePagedReader = true;

  const existingSheet = document.querySelector('link[href*="apostila-paged-reader.css"]');
  if (existingSheet && existingSheet.sheet) {
    init();
  } else {
    const stylesheet = existingSheet || document.createElement("link");
    if (!existingSheet) {
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/assets/css/apostila-paged-reader.css?v=20261111-reader2";
    }
    stylesheet.addEventListener("load", init, {once:true});
    stylesheet.addEventListener("error", init, {once:true});
    if (!existingSheet) {
      document.head.appendChild(stylesheet);
    }
    setTimeout(init, 60);
  }

  function init() {
    if (!main.isConnected || main.closest(".traube-reader-shell")) return;
    const shell = document.createElement("div");
    shell.className = "traube-reader-shell";
    const bar = document.createElement("div");
    bar.className = "traube-reader-toolbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Controles de leitura da apostila");
    bar.innerHTML =
      '<div class="traube-reader-heading"><strong>Leitura da apostila</strong><small>Formato de livro digital</small></div>' +
      '<div class="traube-reader-controls"><button type="button" class="traube-reader-btn traube-reader-toggle" data-reader-toggle aria-pressed="true">Leitura contínua</button>' +
      '<nav class="traube-reader-navigation" data-reader-nav aria-label="Navegar entre páginas">' +
      '<button type="button" class="traube-reader-btn" data-reader-prev aria-label="Página anterior">← Anterior</button>' +
      '<span class="traube-reader-page-label" data-reader-label aria-live="polite">Página 1 de 1</span>' +
      '<input class="traube-reader-jump" type="range" min="1" max="1" value="1" aria-label="Ir para página da apostila">' +
      '<button type="button" class="traube-reader-btn" data-reader-next aria-label="Próxima página">Próxima →</button></nav></div>';
    const footer = document.createElement("nav");
    footer.className = "traube-reader-footer";
    footer.setAttribute("aria-label", "Navegação inferior entre páginas");
    footer.innerHTML =
      '<button type="button" class="traube-reader-btn" data-reader-prev aria-label="Página anterior">← Anterior</button>' +
      '<span class="traube-reader-page-label" data-reader-label aria-live="off">Página 1 de 1</span>' +
      '<button type="button" class="traube-reader-btn" data-reader-next aria-label="Próxima página">Próxima →</button>';

    main.parentNode.insertBefore(shell, main);
    shell.append(bar, main, footer);
    const toggle = bar.querySelector("[data-reader-toggle]");

    // Preferências globais de leitura, compartilhadas entre todas as apostilas.
    toggle.insertAdjacentHTML("afterend", `
      <div class="traube-reader-appearance" data-reader-appearance>
        <button type="button" class="traube-reader-btn traube-reader-aa" data-reader-appearance-toggle
          aria-controls="traube-reader-appearance-panel" aria-expanded="false"
          aria-label="Ajustar tamanho do texto e espaçamento">Aa</button>
        <div class="traube-reader-appearance-panel" id="traube-reader-appearance-panel"
          role="group" aria-label="Aparência da leitura" hidden>
          <strong>Aparência da leitura</strong>
          <label for="traube-reader-font-size">Quantidade de texto na tela</label>
          <div class="traube-reader-size-control">
            <span>Mais texto</span>
            <input id="traube-reader-font-size" data-reader-font-size type="range"
              min="13" max="25" step="1" value="18" aria-label="Tamanho da fonte">
            <span>Texto maior</span>
          </div>
          <output for="traube-reader-font-size" data-reader-font-output>18 px</output>
          <span class="traube-reader-setting-label">Espaçamento entre linhas</span>
          <div class="traube-reader-line-options" role="group" aria-label="Espaçamento entre linhas">
            <button type="button" data-reader-line="1.35">Compacto</button>
            <button type="button" data-reader-line="1.6">Normal</button>
            <button type="button" data-reader-line="1.85">Amplo</button>
          </div>
          <button type="button" class="traube-reader-reset" data-reader-reset>Restaurar padrão</button>
        </div>
      </div>`);
    const appearance = bar.querySelector("[data-reader-appearance]");
    const appearanceToggle = bar.querySelector("[data-reader-appearance-toggle]");
    const appearancePanel = bar.querySelector(".traube-reader-appearance-panel");
    const sizeSlider = bar.querySelector("[data-reader-font-size]");
    const fontOutput = bar.querySelector("[data-reader-font-output]");
    const lineButtons = bar.querySelectorAll("[data-reader-line]");
    const nav = bar.querySelector("[data-reader-nav]");
    const slider = bar.querySelector(".traube-reader-jump");
    main.setAttribute("tabindex", "0");
    main.setAttribute("aria-label", "Texto da apostila: navegue por páginas com as setas");
    const prevs = shell.querySelectorAll("[data-reader-prev]");
    const nexts = shell.querySelectorAll("[data-reader-next]");
    const labels = shell.querySelectorAll("[data-reader-label]");
    let mode = "paged";
    let current = 0;
    let total = 1;
    let step = 0;
    let raf = 0;
    let scrollTimer = 0;
    let hasNavigated = false;
    const fontKey = "traube-apostila-font-size";
    const lineKey = "traube-apostila-line-height";
    const lineOptions = ["1.35", "1.6", "1.85"];
    const clampFont = value => Math.min(25, Math.max(13, Math.round(Number(value) || 18)));
    let fontSize = 18;
    let lineHeight = "1.6";
    try {
      fontSize = clampFont(localStorage.getItem(fontKey));
      const savedLine = localStorage.getItem(lineKey);
      if (lineOptions.includes(savedLine)) lineHeight = savedLine;
    } catch {}

    function closeAppearance() {
      appearancePanel.hidden = true;
      appearanceToggle.setAttribute("aria-expanded", "false");
    }

    function applyAppearance(persist = true) {
      shell.style.setProperty("--traube-reader-font-size", fontSize + "px");
      shell.style.setProperty("--traube-reader-line-height", lineHeight);
      sizeSlider.value = String(fontSize);
      fontOutput.textContent = fontSize + " px";
      lineButtons.forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.readerLine === lineHeight));
      });
      if (persist) {
        try {
          localStorage.setItem(fontKey, String(fontSize));
          localStorage.setItem(lineKey, lineHeight);
        } catch {}
      }
      requestMeasure();
    }

    appearanceToggle.addEventListener("click", () => {
      const opening = appearancePanel.hidden;
      appearancePanel.hidden = !opening;
      appearanceToggle.setAttribute("aria-expanded", String(opening));
      if (opening) sizeSlider.focus();
    });
    sizeSlider.addEventListener("input", () => {
      fontSize = clampFont(sizeSlider.value);
      applyAppearance();
    });
    lineButtons.forEach(button => button.addEventListener("click", () => {
      lineHeight = button.dataset.readerLine;
      applyAppearance();
    }));
    bar.querySelector("[data-reader-reset]").addEventListener("click", () => {
      fontSize = 18;
      lineHeight = "1.6";
      applyAppearance();
    });
    document.addEventListener("pointerdown", event => {
      if (!appearance.contains(event.target)) closeAppearance();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !appearancePanel.hidden) {
        closeAppearance();
        appearanceToggle.focus();
      }
    });

    // Uma tabela é um único bloco rolável: nunca fragmentá-la em colunas,
    // nunca esmagar a primeira coluna e nunca alterar seus dados/células.
    function protectTables() {
      main.querySelectorAll(".book-section table, .mindmap-section table").forEach(table => {
        if (!table.isConnected || table.dataset.readerTableReady === "1") return;
        const cols = Math.max(2, ...Array.from(table.rows).slice(0, 8)
          .map(row => Array.from(row.cells).reduce((sum, cell) => sum + (cell.colSpan || 1), 0)));
        table.style.setProperty("--traube-table-width", Math.min(1600, Math.max(420, cols * 155)) + "px");
        const existing = table.closest(".traube-reader-table-scroll,.traube-table-scroll,.book-table-scroll,.table-responsive");
        if (existing && main.contains(existing)) {
          existing.classList.add("traube-reader-table-scroll");
        } else {
          const scroll = document.createElement("div");
          scroll.className = "traube-reader-table-scroll";
          scroll.setAttribute("role", "region");
          scroll.setAttribute("aria-label", "Tabela da apostila: deslize para ver todas as colunas");
          scroll.setAttribute("tabindex", "0");
          table.parentNode.insertBefore(scroll, table);
          scroll.appendChild(table);
        }
        table.dataset.readerTableReady = "1";
      });
    }

    try {
      mode = localStorage.getItem("traube-apostila-reading-mode") === "continuous" ? "continuous" : "paged";
    } catch {}
    if (new URLSearchParams(location.search).get("embedded") === "1") mode = "continuous";

    const isPaged = () => mode === "paged" && !document?.body?.classList?.contains("traube-dual-active");
    function updateControls() {
      const active = isPaged();
      nav.hidden = !active;
      footer.hidden = !active;
      toggle.textContent = mode === "paged" ? "Leitura contínua" : "Ler por páginas";
      toggle.setAttribute("aria-pressed", String(mode === "paged"));
      const label = "Página " + (current + 1) + " de " + total;
      labels.forEach(node => {node.textContent = label;});
      prevs.forEach(button => {button.disabled = !active || current <= 0;});
      nexts.forEach(button => {button.disabled = !active || current >= total - 1;});
      slider.max = String(Math.max(1, total));
      slider.value = String(current + 1);
    }

    function metrics() {
      const gap = 36;
      const style = getComputedStyle(main);
      const left = parseFloat(style.paddingLeft) || 0;
      const right = parseFloat(style.paddingRight) || 0;
      const column = Math.max(220, main.clientWidth - left - right);
      step = column + gap;
      main.style.setProperty("--traube-column-width", column + "px");
      main.style.setProperty("--traube-column-gap", gap + "px");
      const pageHeight = Math.max(480, Math.min(860, window.innerHeight - (window.innerWidth <= 640 ? 225 : 230)));
      main.style.setProperty("--traube-reader-height", pageHeight + "px");
    }

    function measure() {
      if (!isPaged()) { updateControls(); return; }
      metrics();
      // Two frames allow browsers to complete multicolumn fragmentation after changing width.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!isPaged()) return;
        const progress = total > 1 ? current / (total - 1) : 0;
        total = Math.max(1, Math.min(1500, 1 + Math.round(Math.max(0, main.scrollWidth - main.clientWidth) / Math.max(1, step))));
        current = Math.max(0, Math.min(total - 1, Math.round(progress * (total - 1))));
        main.scrollLeft = current * step;
        if (location.hash && !hasNavigated) goHash(location.hash, false);
        updateControls();
      }));
    }

    function requestMeasure() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {raf = 0; measure();});
    }

    function goPage(page, smooth = true) {
      if (!isPaged()) return;
      hasNavigated = true;
      current = Math.max(0, Math.min(total - 1, Number(page) || 0));
      updateControls();
      if (typeof main.scrollTo === "function") {
        main.scrollTo({left: current * step, top: 0,
          behavior: smooth && !(typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) ? "smooth" : "auto"});
      } else {
        main.scrollLeft = current * step;
      }
    }

    function setMode(next, persist = true) {
      mode = next === "continuous" ? "continuous" : "paged";
      document.body.classList.toggle("traube-reader-paged", mode === "paged");
      if (persist) {
        try { localStorage.setItem("traube-apostila-reading-mode", mode); } catch {}
      }
      if (mode === "paged") {
        current = 0;
        requestMeasure();
      } else {
        main.scrollLeft = 0;
        current = 0;
        total = 1;
      }
      updateControls();
    }

    function targetElement(hash) {
      if (!hash || hash === "#") return null;
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
      const target = document.getElementById(id);
      if (!target || !main.contains(target)) return null;
      // display:contents sections do not have a bounding box.
      return target.matches(".book-section,.mindmap-section")
        ? target.querySelector("h2,h3,h4,p,li,figure") || target
        : target;
    }

    function goHash(hash, smooth = false) {
      if (!isPaged()) return false;
      const target = targetElement(hash);
      if (!target) return false;
      const bounds = target.getBoundingClientRect();
      const parent = main.getBoundingClientRect();
      const padding = parseFloat(getComputedStyle(main).paddingLeft) || 0;
      const position = bounds.left - parent.left + main.scrollLeft - padding;
      if (Number.isFinite(position)) {
        goPage(Math.floor(Math.max(0, position + 1) / Math.max(1, step)), smooth);
        return true;
      }
      return false;
    }

    shell.addEventListener("click", event => {
      const control = event.target.closest("[data-reader-prev],[data-reader-next],[data-reader-toggle]");
      if (!control || !shell.contains(control)) return;
      if (control.hasAttribute("data-reader-toggle")) {
        setMode(mode === "paged" ? "continuous" : "paged");
      } else {
        goPage(current + (control.hasAttribute("data-reader-next") ? 1 : -1));
      }
    });
    slider.addEventListener("input", () => goPage(Number(slider.value) - 1, false));
    main.addEventListener("scroll", () => {
      if (!isPaged() || !step) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (!isPaged()) return;
        current = Math.max(0, Math.min(total - 1, Math.round(main.scrollLeft / step)));
        updateControls();
      }, 150);
    }, {passive:true});
    document.addEventListener("click", event => {
      if (!isPaged()) return;
      const a = event.target.closest("a[href*='#']");
      if (!a || !main.contains(a)) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !targetElement(url.hash)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      goHash(url.hash, false);
      history.replaceState(history.state, "", location.pathname + location.search + url.hash);
    }, true);
    window.addEventListener("hashchange", () => { requestAnimationFrame(() => goHash(location.hash)); });
    document.addEventListener("keydown", event => {
      if (!isPaged() || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target?.closest?.("input,textarea,select,button,[contenteditable=true],[role=dialog]")) return;
      const direction = ["ArrowRight","PageDown"].includes(event.key) ? 1 :
        ["ArrowLeft","PageUp"].includes(event.key) ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      goPage(current + direction);
    });
    window.addEventListener("resize", requestMeasure, {passive:true});
    window.addEventListener("orientationchange", requestMeasure, {passive:true});
    document.addEventListener("load", event => {
      if (event.target?.tagName === "IMG" && main.contains(event.target)) requestMeasure();
    }, true);
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(requestMeasure);
      observer.observe(shell);
    }
    if (typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver(() => {
        if (document?.body && !document.body.classList.contains("traube-dual-active")) requestMeasure();
        updateControls();
      });
      if (document?.body) observer.observe(document.body, {attributes:true, attributeFilter:["class"]});
    }

    protectTables();
    if (typeof MutationObserver !== "undefined") {
      const tableObserver = new MutationObserver(records => {
        if (!records.some(record => record.addedNodes.length)) return;
        protectTables();
        requestMeasure();
      });
      tableObserver.observe(main, {childList:true,subtree:true});
    }
    setMode(mode, false);
    applyAppearance(false);
    if (document.fonts?.ready) document.fonts.ready.then(requestMeasure).catch(() => {});
    window.addEventListener("load", requestMeasure, {once:true});
    if (location.hash) requestAnimationFrame(() => requestAnimationFrame(() => {
      goHash(location.hash, false);
    }));
  }
})();
