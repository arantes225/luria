(() => {
  "use strict";

  const client = window.supabaseClient;
  const els = {
    search: document.getElementById("recipe-search"),
    status: document.getElementById("recipe-status-filter"),
    category: document.getElementById("recipe-category-filter"),
    list: document.getElementById("recipe-list"),
    detail: document.getElementById("recipe-detail"),
    empty: document.getElementById("recipe-empty"),
    countAll: document.getElementById("recipe-count-all"),
    countVerified: document.getElementById("recipe-count-verified"),
    countReview: document.getElementById("recipe-count-review"),
    countProtocol: document.getElementById("recipe-count-protocol")
  };

  const STATUS = {
    verified: { label: "Pronta", cls: "ok", help: "Revisada e liberada para copiar." },
    review_needed: { label: "Em revisão", cls: "warn", help: "Veio do resumo, mas ainda precisa de validação clínica final." },
    protocol_only: { label: "Protocolo", cls: "info", help: "Conduta dependente do contexto; não deve virar receita automática." },
    avoid: { label: "Não automatizar", cls: "danger", help: "Há risco relevante em transformar este conteúdo em receita pronta." }
  };

  let all = [];
  let protocols = [];
  let selectedId = null;
  let selectedMeds = new Set(); // Seleção individual em cada receituário; nunca compartilhada entre fichas.

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function norm(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }


  function recipeText(recipe, selected = selectedMeds) {
    const data = recipe.data || {};
    const routes = Array.isArray(data.routes) ? data.routes : [];
    const lines = [String(recipe.title || "Receituário").toUpperCase(), ""];
    routes.forEach((route, ri) => {
      const items = (route.items || []).filter((item, i) => selected.has(ri + ":" + i));
      if (!items.length) return;
      lines.push(String(route.route || "USO").toUpperCase() + ":");
      items.forEach((item, index) => {
        lines.push((index + 1) + ") " + String(item.drug || "Medicamento") +
          (item.quantity ? " — " + item.quantity : ""));
        if (item.directions) lines.push("   " + item.directions);
        lines.push("");
      });
    });
    // Orientações entram automaticamente, independentemente das escolhas de medicamentos.
    const blocks = [
      ["ORIENTAÇÕES:",data.orientations],
      ["REAVALIAÇÃO:",data.follow_up],
      ["SINAIS DE ALARME / ATENÇÃO:",data.warnings]
    ];
    blocks.forEach((block) => {
      const values = Array.isArray(block[1]) ? block[1] : [];
      if (values.length) {
        lines.push(block[0]);
        values.forEach(x=>lines.push("- " + String(x)));
        lines.push("");
      }
    });
    return lines.join("\n").trim();
  }

  async function copyRecipe(recipe) {
    if (recipe.status !== "verified" || recipe.data?.copy_ready !== true) return;
    if (!selectedMeds.size) return;
    const text = recipeText(recipe);
    try {
      await navigator.clipboard.writeText(text);
      const btn = document.querySelector('[data-copy-current="1"]');
      if (btn) {
        const old = btn.textContent;
        btn.textContent = "Copiado";
        setTimeout(() => (btn.textContent = old), 1200);
      }
    } catch (_) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
  }

  function statusBadge(status) {
    const s = STATUS[status] || STATUS.review_needed;
    return `<span class="recipe-status ${s.cls}">${esc(s.label)}</span>`;
  }

  function renderStats() {
    const count = (s) => all.filter((r) => r.status === s).length;
    if (els.countAll) els.countAll.textContent = all.length;
    if (els.countVerified) els.countVerified.textContent = count("verified");
    if (els.countReview) els.countReview.textContent = count("review_needed");
    if (els.countProtocol) els.countProtocol.textContent = count("protocol_only") + count("avoid");
  }

  function fillCategories() {
    const cats = [...new Set(all.map((x) => x.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    els.category.innerHTML = '<option value="">Todas as áreas</option>' +
      cats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
  }

  function filtered() {
    const q = norm(els.search?.value);
    const status = els.status?.value || "";
    const category = els.category?.value || "";

    return all.filter((r) => {
      if (status && r.status !== status) return false;
      if (category && r.category !== category) return false;
      if (!q) return true;
      const hay = norm([
        r.slug,
        r.title,
        r.category,
        r.summary,
        ...(r.tags || []),
        r.data?.source_excerpt,
        JSON.stringify(r.data?.source_regimen || [])
      ].join(" "));
      return hay.includes(q);
    });
  }

  function renderList() {
    const items = filtered();
    els.empty.hidden = items.length > 0;
    els.list.innerHTML = items.map((r) => `
      <button class="recipe-row ${selectedId === r.id ? "active" : ""}" type="button" data-recipe-id="${r.id}">
        <span class="recipe-row-top">
          <span class="recipe-row-title">${esc(r.title)}</span>
          ${statusBadge(r.status)}
        </span>
        <span class="recipe-row-meta">${esc(r.category)} · ${esc(r.setting || "ambulatorial")}</span>
        <span class="recipe-row-summary">${esc(r.summary || "")}</span>
      </button>
    `).join("");

    els.list.querySelectorAll("[data-recipe-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedId = Number(btn.dataset.recipeId);
        selectedMeds = new Set();
        renderList();
        renderDetail(all.find((x) => x.id === selectedId));
        if (window.matchMedia("(max-width: 900px)").matches) {
          els.detail?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    if (!selectedId && items[0]) {
      selectedId = items[0].id;
      selectedMeds = new Set();
      renderList();
      renderDetail(items[0]);
    } else if (selectedId && !items.some((x) => x.id === selectedId) && items[0]) {
      selectedId = items[0].id;
      selectedMeds = new Set();
      renderList();
      renderDetail(items[0]);
    }
  }

  function listBlock(title, values, cls = "") {
    if (!Array.isArray(values) || !values.length) return "";
    return `
      <section class="recipe-detail-section ${cls}">
        <h3>${esc(title)}</h3>
        <ul>${values.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </section>
    `;
  }


  function renderVerifiedRoutes(data, canSelect) {
    const routes = Array.isArray(data.routes) ? data.routes : [];
    if (!routes.length) return "";
    return routes.map((route, ri) =>
      '<section class="recipe-route"><div class="recipe-route-title">' + esc(route.route || "Uso") +
      (route.mode === "alternatives" ? ' · Escolha uma alternativa' : '') + '</div><div class="recipe-med-list">' +
      (route.items || []).map((item, i) => {
        const key = ri + ":" + i;
        const choice = canSelect ? '<label class="recipe-drug-choice" style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;margin-right:10px">' +
          '<input type="checkbox" data-med-route="' + ri + '" data-med-index="' + i + '"' +
          (selectedMeds.has(key) ? ' checked' : '') + ' aria-label="Selecionar ' + esc(item.drug || "Medicamento") + '"> Selecionar</label>' : '';
        return (route.mode === "alternatives" && i > 0 ? '<div class="recipe-or-divider" aria-label="ou">OU</div>' : '') +
          '<article class="recipe-med"><div class="recipe-med-head">' +
          '<span class="recipe-med-num">' + (route.mode === "alternatives" ? (i + 1) + "ª" : i + 1) + '</span><div>' +
          choice + '<button type="button" class="recipe-drug-link" data-open-drug="' +
          esc(item.drug || "Medicamento") + '">' + esc(item.drug || "Medicamento") + ' ↗</button>' +
          (item.quantity ? '<span>' + esc(item.quantity) + '</span>' : '') + '</div></div>' +
          (item.directions ? '<p>' + esc(item.directions) + '</p>' : '') + '</article>';
      }).join("") + '</div></section>'
    ).join("");
  }

  function renderSourceRegimen(data) {
    const rows = Array.isArray(data.source_regimen) ? data.source_regimen : [];
    if (!rows.length) return "";
    return `
      <section class="recipe-detail-section source">
        <h3>Do seu resumo</h3>
        <div class="recipe-source-grid">
          ${rows.map((item) => `
            <article>
              <strong>${esc(item.drug || "Item")}</strong>
              <p>${esc(item.directions || item.directions_original || "")}</p>
              ${item.review_note ? `<small>${esc(item.review_note)}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderReferences(data) {
    const refs = Array.isArray(data.references) ? data.references : [];
    if (!refs.length) return "";
    return `
      <section class="recipe-detail-section">
        <h3>Referências de validação</h3>
        <div class="recipe-refs">
          ${refs.map((ref) => `<a href="${esc(traubeSafeContentUrl(ref.url) || '#')}" target="_blank" rel="noopener noreferrer">${esc(ref.label || "Fonte")}</a>`).join("")}
        </div>
      </section>
    `;
  }

  function renderDetail(recipe) {
    if (!recipe) {
      els.detail.innerHTML = '<div class="recipe-detail-placeholder">Selecione uma receita.</div>';
      return;
    }
    const data = recipe.data || {};
    const s = STATUS[recipe.status] || STATUS.review_needed;
    const copyEnabled = recipe.status === "verified" && data.copy_ready === true;
    const canCopySelection = copyEnabled && selectedMeds.size > 0;
    const relatedProtocol = protocols.find((p) => Array.isArray(p.linked_recipe_slugs) && p.linked_recipe_slugs.includes(recipe.slug));

    els.detail.innerHTML = `
      <div class="recipe-detail-head">
        <div>
          <div class="recipe-detail-tags">
            ${statusBadge(recipe.status)}
            <span class="recipe-chip">${esc(recipe.category)}</span>
            <span class="recipe-chip">${esc(recipe.setting || "ambulatorial")}</span>
          </div>
          <h2>${esc(recipe.title)}</h2>
          <p>${esc(recipe.summary || "")}</p>
        </div>
        <div class="recipe-head-actions">
          ${relatedProtocol ? '<button class="recipe-copy-btn recipe-protocol-btn" type="button" data-open-protocol="1">Abrir protocolo</button>' : ""}
          <button class="recipe-copy-btn recipe-note-btn" type="button" data-send-note="1">Enviar à Cola Rápida</button>
          <button class="recipe-copy-btn" type="button" data-copy-current="1" ${canCopySelection ? "" : "disabled"}>
            ${!copyEnabled ? "Aguardando revisão" : canCopySelection ? "Copiar receita + orientações" : "Selecione medicamentos"}
          </button>
        </div>
      </div>

      <div class="recipe-status-note ${s.cls}">${esc(s.help)}</div>

      ${copyEnabled ? `<p class="recipe-selection-hint" style="margin:10px 0">Marque os medicamentos desejados. Nas alternativas (OU), selecione apenas um. As orientações e os sinais de alarme serão copiados automaticamente.</p>` : ""}
      ${renderVerifiedRoutes(data, copyEnabled)}
      ${data.eligibility ? `<section class="recipe-detail-section info"><h3>Quando este esquema se aplica</h3><p>${esc(data.eligibility)}</p></section>` : ""}
      ${listBlock("Pontos-chave do protocolo", data.key_corrections, "info")}
      ${listBlock("Orientações", data.orientations)}
      ${listBlock("Reavaliação e seguimento", data.follow_up, "follow")}
      ${listBlock("Sinais de alarme / atenção", data.warnings, "warn")}
      ${listBlock("Não incluir automaticamente", data.do_not_include, "danger")}
      ${data.review_note ? `<section class="recipe-detail-section warn"><h3>Revisão pendente</h3><p>${esc(data.review_note)}</p></section>` : ""}
      ${data.corrected_key_point ? `<section class="recipe-detail-section info"><h3>Correção já aplicada</h3><p>${esc(data.corrected_key_point)}</p></section>` : ""}
      ${renderSourceRegimen(data)}
      ${data.source_excerpt ? `<details class="recipe-source-excerpt"><summary>Trecho de origem do seu resumo</summary><p>${esc(data.source_excerpt)}</p></details>` : ""}
      ${renderReferences(data)}
    `;

    const copy = els.detail.querySelector('[data-copy-current="1"]');
    if (copyEnabled) copy?.addEventListener("click", () => copyRecipe(recipe));
    els.detail.querySelectorAll("input[data-med-route][data-med-index]").forEach((box) => box.addEventListener("change", () => {
      const ri = Number(box.dataset.medRoute), ii = Number(box.dataset.medIndex), key = ri + ":" + ii;
      if (box.checked && data.routes?.[ri]?.mode === "alternatives") {
        for (const saved of [...selectedMeds]) if (saved.startsWith(ri + ":")) selectedMeds.delete(saved);
      }
      if (box.checked) selectedMeds.add(key); else selectedMeds.delete(key);
      renderDetail(recipe);
    }));
    els.detail.querySelector('[data-open-protocol="1"]')?.addEventListener("click", () => window.TraubeClinicalBridge?.openProtocol(relatedProtocol.slug));
    els.detail.querySelector('[data-send-note="1"]')?.addEventListener("click", () => window.TraubeClinicalBridge?.toQuickChart({type:"recipe",slug:recipe.slug,title:recipe.title,text:copyEnabled && selectedMeds.size ? recipeText(recipe) : (recipe.title + "\nEm revisão / sem medicamentos selecionados: não utilizar como prescrição automática."),source:"Tratamentos gerais TRAUBE"}));
    els.detail.querySelectorAll("[data-open-drug]").forEach((btn) => btn.addEventListener("click", () => window.TraubeClinicalBridge?.openDrug(btn.dataset.openDrug)));
  }

  async function load() {
    if (!client) {
      els.list.innerHTML = '<div class="recipe-error">Não foi possível conectar ao banco de receitas.</div>';
      return;
    }

    els.list.innerHTML = '<div class="recipe-loading">Carregando banco de receitas…</div>';

    const [{ data, error }, { data: protocolRows }] = await Promise.all([
      client.from("recipe_bank").select("*").order("title", { ascending: true }),
      client.from("clinical_protocols").select("slug,title,linked_recipe_slugs").order("title", { ascending: true })
    ]);

    if (error) {
      console.error("[TRAUBE recipes]", error);
      els.list.innerHTML = '<div class="recipe-error">Não foi possível carregar as receitas agora.</div>';
      return;
    }

    all = Array.isArray(data) ? data : [];
    protocols = Array.isArray(protocolRows) ? protocolRows : [];
    const params = new URLSearchParams(location.search);
    const wanted = params.get("q")?.trim();
    if (wanted) {
      const nw = norm(wanted);
      const hit = all.find((r) => r.slug === wanted) || all.find((r) => norm(r.title).includes(nw) || norm((r.tags||[]).join(" ")).includes(nw));
      els.search.value = hit?.title || wanted;
      selectedId = hit?.id || null;
    }
    renderStats();
    fillCategories();
    renderList();
  }

  [els.search, els.status, els.category].forEach((el) => {
    el?.addEventListener("input", renderList);
    el?.addEventListener("change", renderList);
  });

  load();
})();
