/**
 * LURIA - Apostilas Hub & Hall Navigator
 * Suporte completo ao Hall com 6 Grandes Áreas da Medicina:
 * 1. Clínica Médica
 * 2. Cirurgia Geral
 * 3. Pediatria
 * 4. Ginecologia e Obstetrícia
 * 5. Medicina Preventiva
 * 6. Psiquiatria
 */
(() => {
  "use strict";

  const sb = window.supabaseClient;

  const AREAS_CONFIG = [
    {
      id: "clinica-medica",
      name: "Clínica Médica",
      desc: "Cardiologia, pneumologia, nefrologia, infectologia e especialidades clínicas",
      badge: "Clínica",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v16"/></svg>`
    },
    {
      id: "cirurgia-geral",
      name: "Cirurgia Geral",
      desc: "Trauma, abdome agudo, pré e pós-operatório, urologia e técnicas cirúrgicas",
      badge: "Cirurgia",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 4-5 5L6 7l-3 3 4.5 4.5L3 19l2 2 4.5-4.5L14 21l3-3-2-3.5 5-5-5.5-5.5Z"/><path d="m18 8 3-3"/></svg>`
    },
    {
      id: "pediatria",
      name: "Pediatria",
      desc: "Puericultura, neonatologia, desenvolvimento infantil e urgências pediátricas",
      badge: "Pediatria",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>`
    },
    {
      id: "ginecologia-obstetricia",
      name: "Ginecologia e Obstetrícia",
      desc: "Assistência ao parto, pré-natal, endocrinologia ginecológica e oncologia",
      badge: "G&O",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>`
    },
    {
      id: "medicina-preventiva",
      name: "Medicina Preventiva",
      desc: "SUS, atenção primária, epidemiologia clínica, bioestatística e saúde coletiva",
      badge: "Preventiva",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`
    },
    {
      id: "psiquiatria",
      name: "Psiquiatria",
      desc: "Psicopatologia, transtornos de humor e ansiedade, psicofarmacologia e dependência",
      badge: "Psiquiatria",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z"/><path d="M9 21h6"/></svg>`
    }
  ];

  const bookIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22.5v-18Z"/><path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5a2.5 2.5 0 0 1 2.5 2.5v-18Z"/></svg>';

  const norm = v => String(v || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  let allBooks = [];
  let currentActiveArea = null; // null = Visão Geral (todos ou busca global)

  function createBookCard(book) {
    const a = document.createElement("a");
    a.className = "book-card";
    a.href = book.content_url || "#";
    a.dataset.search = norm([book.area, book.materia, book.tema, book.titulo].filter(Boolean).join(" "));
    a.innerHTML = `
      <div class="book-card-top">
        <span class="book-card-icon">${bookIcon}</span>
        <span class="book-card-badge">${escapeHtml(book.area)}</span>
      </div>
      <div class="book-meta">
        <span class="book-subarea">${escapeHtml(book.materia || "Geral")}</span>
        <strong class="book-title">${escapeHtml(book.tema || book.titulo || "Apostila")}</strong>
        <small class="book-foot">Apostila LURIA • Acessar ↗</small>
      </div>
    `;
    return a;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHallButtons() {
    const hallEl = document.getElementById("hall-grid");
    if (!hallEl) return;

    hallEl.innerHTML = "";
    AREAS_CONFIG.forEach(cfg => {
      const count = allBooks.filter(b => b.area === cfg.name).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hall-btn" + (currentActiveArea === cfg.name ? " is-active" : "");
      btn.dataset.area = cfg.name;
      btn.setAttribute("aria-pressed", currentActiveArea === cfg.name ? "true" : "false");

      btn.innerHTML = `
        <div class="hall-btn-icon">${cfg.icon}</div>
        <div class="hall-btn-body">
          <div class="hall-btn-header">
            <span class="hall-btn-title">${cfg.name}</span>
            <span class="hall-btn-count">${count} apostilas</span>
          </div>
          <p class="hall-btn-desc">${cfg.desc}</p>
        </div>
        <span class="hall-btn-action" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      `;

      btn.addEventListener("click", () => {
        if (currentActiveArea === cfg.name) {
          // Toggle off -> volta para Visão Geral
          currentActiveArea = null;
        } else {
          currentActiveArea = cfg.name;
        }
        updateActiveButtonState();
        renderView();
      });

      hallEl.appendChild(btn);
    });
  }

  function updateActiveButtonState() {
    const buttons = document.querySelectorAll(".hall-btn");
    buttons.forEach(btn => {
      const isActive = btn.dataset.area === currentActiveArea;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    const hallAllBtn = document.getElementById("hall-all-btn");
    if (hallAllBtn) {
      const isAll = currentActiveArea === null;
      hallAllBtn.classList.toggle("is-active", isAll);
      hallAllBtn.setAttribute("aria-pressed", isAll ? "true" : "false");
    }
  }

  function renderView() {
    const searchInput = document.getElementById("books-search-input");
    const query = norm(searchInput ? searchInput.value : "");
    const searchCountEl = document.getElementById("books-search-count");
    const container = document.getElementById("area-library");
    const banner = document.getElementById("active-area-banner");
    const bannerTitle = document.getElementById("active-banner-title");
    const bannerSubtitle = document.getElementById("active-banner-subtitle");
    const recentSection = document.getElementById("recent-section");

    // Filtrar livros
    let filtered = allBooks;

    if (currentActiveArea) {
      filtered = filtered.filter(b => b.area === currentActiveArea);
      if (banner && bannerTitle && bannerSubtitle) {
        banner.hidden = false;
        bannerTitle.textContent = currentActiveArea;
        const cfg = AREAS_CONFIG.find(c => c.name === currentActiveArea);
        bannerSubtitle.textContent = cfg ? cfg.desc : "Apostilas divididas por subáreas";
      }
      if (recentSection) recentSection.hidden = true;
    } else {
      if (banner) banner.hidden = true;
      if (recentSection) recentSection.hidden = !!query;
    }

    if (query) {
      filtered = filtered.filter(b => norm([b.area, b.materia, b.tema, b.titulo].join(" ")).includes(query));
      if (recentSection) recentSection.hidden = true;
    }

    // Atualiza contador de busca/resultados
    if (searchCountEl) {
      if (query) {
        searchCountEl.textContent = `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`;
      } else if (currentActiveArea) {
        searchCountEl.textContent = `${filtered.length} em ${currentActiveArea}`;
      } else {
        searchCountEl.textContent = `${allBooks.length} apostilas no total`;
      }
    }

    // Renderizar resultados por área e subárea
    if (!container) return;
    container.innerHTML = "";

    if (!filtered.length) {
      container.innerHTML = `
        <div class="books-no-results">
          <p>Nenhuma apostila encontrada para os filtros atuais.</p>
          ${currentActiveArea || query ? '<button type="button" class="books-reset-btn" id="books-reset-filters">Limpar filtros</button>' : ""}
        </div>
      `;
      document.getElementById("books-reset-filters")?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        currentActiveArea = null;
        updateActiveButtonState();
        renderView();
      });
      return;
    }

    // Agrupamento por Área -> Subárea
    const areaOrder = AREAS_CONFIG.map(c => c.name);
    const grouped = new Map();

    filtered.forEach(b => {
      const area = b.area || "Outros";
      const materia = b.materia || "Geral";
      if (!grouped.has(area)) grouped.set(area, new Map());
      const mGroup = grouped.get(area);
      if (!mGroup.has(materia)) mGroup.set(materia, []);
      mGroup.get(materia).push(b);
    });

    const sortedAreas = [...grouped.keys()].sort((a, b) => {
      const ai = areaOrder.indexOf(a);
      const bi = areaOrder.indexOf(b);
      if (ai < 0 && bi < 0) return a.localeCompare(b, "pt-BR");
      if (ai < 0) return 1;
      if (bi < 0) return -1;
      return ai - bi;
    });

    sortedAreas.forEach(areaName => {
      const areaSection = document.createElement("section");
      areaSection.className = "area-block";

      const subareasMap = grouped.get(areaName);
      const totalAreaBooks = [...subareasMap.values()].reduce((acc, list) => acc + list.length, 0);

      const header = document.createElement("div");
      header.className = "area-title";
      header.innerHTML = `
        <div class="area-title-info">
          <h3>${escapeHtml(areaName)}</h3>
          <span>${totalAreaBooks} apostila${totalAreaBooks === 1 ? "" : "s"}</span>
        </div>
        ${!currentActiveArea ? `<button type="button" class="area-filter-link" data-filter-area="${escapeHtml(areaName)}">Ver apenas esta área →</button>` : ""}
      `;
      areaSection.appendChild(header);

      const subareasGrid = document.createElement("div");
      subareasGrid.className = "subareas-container";

      const sortedSubareas = [...subareasMap.keys()].sort((a, b) => a.localeCompare(b, "pt-BR"));

      sortedSubareas.forEach(subName => {
        const subBlock = document.createElement("div");
        subBlock.className = "subarea-block";

        const bookList = subareasMap.get(subName);
        subBlock.innerHTML = `
          <div class="subarea-head">
            <span class="subarea-label">${escapeHtml(subName)}</span>
            <span class="subarea-badge">${bookList.length}</span>
          </div>
          <div class="books-row"></div>
        `;

        const row = subBlock.querySelector(".books-row");
        bookList.forEach(book => row.appendChild(createBookCard(book)));

        subareasGrid.appendChild(subBlock);
      });

      areaSection.appendChild(subareasGrid);
      container.appendChild(areaSection);
    });

    // Delegar links de filtro rápido por área
    container.querySelectorAll("[data-filter-area]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentActiveArea = btn.dataset.filterArea;
        updateActiveButtonState();
        renderView();
        window.scrollTo({ top: document.querySelector(".books-hall-section")?.offsetTop || 0, behavior: "smooth" });
      });
    });

    // Renderizar Mais Recentes se aplicável
    if (!currentActiveArea && !query) {
      renderRecentSection();
    }
  }

  function renderRecentSection() {
    const root = document.getElementById("recent-grid");
    const countEl = document.getElementById("recent-count");
    if (!root) return;

    root.innerHTML = "";
    const recents = [...allBooks]
      .filter(b => b.slug)
      .slice(0, 8);

    recents.forEach(b => root.appendChild(createBookCard(b)));
    if (countEl) countEl.textContent = `${recents.length} em destaque`;
  }

  async function loadInitialData() {
    let baseCatalog = [];

    // 1. Carrega catálogo estático completo pré-compilado (275+ apostilas)
    try {
      const resp = await fetch("/assets/data/apostilas-catalogo.json?v=20261024-hall1");
      if (resp.ok) {
        baseCatalog = await resp.json();
      }
    } catch (e) {
      console.warn("LURIA: Falha ao carregar apostilas-catalogo.json, usando fallback em memória", e);
    }

    // 2. Mescla com eventuais apostilas dinâmicas publicadas no Supabase
    let remote = [];
    try {
      if (sb) {
        const { data, error } = await sb
          .from("apostilas")
          .select("id,area,materia,tema,titulo,content_url,is_published,created_at")
          .eq("is_published", true)
          .order("created_at", { ascending: false });
        if (!error && Array.isArray(data)) remote = data;
      }
    } catch {}

    const byUrl = new Map();
    baseCatalog.forEach(b => {
      if (b.content_url) byUrl.set(b.content_url, b);
    });

    remote.forEach(b => {
      if (b.content_url) {
        const existing = byUrl.get(b.content_url) || {};
        byUrl.set(b.content_url, { ...existing, ...b });
      }
    });

    allBooks = [...byUrl.values()];

    // Inicializa Hall e Views
    renderHallButtons();
    updateActiveButtonState();
    renderView();

    // Setup input de busca
    const searchInput = document.getElementById("books-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderView();
      });
    }

    // Botão "Ver todas"
    const hallAllBtn = document.getElementById("hall-all-btn");
    if (hallAllBtn) {
      hallAllBtn.addEventListener("click", () => {
        currentActiveArea = null;
        updateActiveButtonState();
        renderView();
      });
    }

    // Botão Limpar Banner
    const clearBannerBtn = document.getElementById("clear-active-area");
    if (clearBannerBtn) {
      clearBannerBtn.addEventListener("click", () => {
        currentActiveArea = null;
        updateActiveButtonState();
        renderView();
      });
    }
  }

  // Execução ao carregar documento
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadInitialData);
  } else {
    loadInitialData();
  }
})();
