/* LURIA: leitura por páginas sem duplicar nem alterar o conteúdo das apostilas. */
(() => {
  "use strict";
  if (window.LuriaPagedReader) return;
  const main = document.querySelector(".book-page .book-main");
  const bookPage = main?.closest(".book-page");
  if (!main || !bookPage || !document.querySelector(".book-hero, .book-section")) return;
  window.LuriaPagedReader = true;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "/assets/css/apostila-paged-reader.css?v=20261028-reader1";
  stylesheet.addEventListener("load", init, {once:true});
  stylesheet.addEventListener("error", () => { window.LuriaPagedReader = false; }, {once:true});
  document.head.appendChild(stylesheet);

  function init() {
    if (!main.isConnected || main.closest(".luria-reader-shell")) return;
    const shell = document.createElement("div");
    shell.className = "luria-reader-shell";
    const bar = document.createElement("div");
    bar.className = "luria-reader-toolbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Controles de leitura da apostila");
    bar.innerHTML =
      '<div class="luria-reader-heading"><strong>Leitura da apostila</strong><small>Formato de livro digital</small></div>' +
      '<div class="luria-reader-controls"><button type="button" class="luria-reader-btn luria-reader-toggle" data-reader-toggle aria-pressed="true">Leitura contínua</button>' +
      '<nav class="luria-reader-navigation" data-reader-nav aria-label="Navegar entre páginas">' +
      '<button type="button" class="luria-reader-btn" data-reader-prev aria-label="Página anterior">← Anterior</button>' +
      '<span class="luria-reader-page-label" data-reader-label aria-live="polite">Página 1 de 1</span>' +
      '<input class="luria-reader-jump" type="range" min="1" max="1" value="1" aria-label="Ir para página da apostila">' +
      '<button type="button" class="luria-reader-btn" data-reader-next aria-label="Próxima página">Próxima →</button></nav></div>';
    const footer = document.createElement("nav");
    footer.className = "luria-reader-footer";
    footer.setAttribute("aria-label", "Navegação inferior entre páginas");
    footer.innerHTML =
      '<button type="button" class="luria-reader-btn" data-reader-prev aria-label="Página anterior">← Anterior</button>' +
      '<span class="luria-reader-page-label" data-reader-label aria-live="off">Página 1 de 1</span>' +
      '<button type="button" class="luria-reader-btn" data-reader-next aria-label="Próxima página">Próxima →</button>';

    main.parentNode.insertBefore(shell, main);
    shell.append(bar, main, footer);
    const toggle = bar.querySelector("[data-reader-toggle]");
    const nav = bar.querySelector("[data-reader-nav]");
    const slider = bar.querySelector(".luria-reader-jump");
    const prevs = shell.querySelectorAll("[data-reader-prev]");
    const nexts = shell.querySelectorAll("[data-reader-next]");
    const labels = shell.querySelectorAll("[data-reader-label]");
    let mode = "paged";
    let current = 0;
    let total = 1;
    let step = 0;
    let raf = 0;
    let scrollTimer = 0;

    try {
      mode = localStorage.getItem("luria-apostila-reading-mode") === "continuous" ? "continuous" : "paged";
    } catch {}
    if (new URLSearchParams(location.search).get("embedded") === "1") mode = "continuous";

    const isPaged = () => mode === "paged" && !document.body.classList.contains("luria-dual-active");
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
      main.style.setProperty("--luria-column-width", column + "px");
      main.style.setProperty("--luria-column-gap", gap + "px");
      const pageHeight = Math.max(430, Math.min(920, window.innerHeight - (window.innerWidth <= 640 ? 220 : 250)));
      main.style.setProperty("--luria-reader-height", pageHeight + "px");
    }

    function measure() {
      if (!isPaged()) { updateControls(); return; }
      metrics();
      // Two frames allow browsers to complete multicolumn fragmentation after changing width.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!isPaged()) return;
        total = Math.max(1, Math.min(1500, 1 + Math.round(Math.max(0, main.scrollWidth - main.clientWidth) / Math.max(1, step))));
        current = Math.max(0, Math.min(current, total - 1));
        main.scrollLeft = current * step;
        updateControls();
      }));
    }

    function requestMeasure() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {raf = 0; measure();});
    }

    function goPage(page, smooth = true) {
      if (!isPaged()) return;
      current = Math.max(0, Math.min(total - 1, Number(page) || 0));
      updateControls();
      if (typeof main.scrollTo === "function") {
        main.scrollTo({left: current * step, top: 0,
          behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant"});
      } else {
        main.scrollLeft = current * step;
      }
    }

    function setMode(next, persist = true) {
      mode = next === "continuous" ? "continuous" : "paged";
      document.body.classList.toggle("luria-reader-paged", mode === "paged");
      if (persist) {
        try { localStorage.setItem("luria-apostila-reading-mode", mode); } catch {}
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
        if (!document.body.classList.contains("luria-dual-active")) requestMeasure();
        updateControls();
      });
      observer.observe(document.body, {attributes:true, attributeFilter:["class"]});
    }

    setMode(mode, false);
    if (document.fonts?.ready) document.fonts.ready.then(requestMeasure).catch(() => {});
    window.addEventListener("load", requestMeasure, {once:true});
    if (location.hash) requestAnimationFrame(() => requestAnimationFrame(() => {
      goHash(location.hash, false);
    }));
  }
})();
