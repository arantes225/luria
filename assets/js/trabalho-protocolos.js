(() => {
  "use strict";
  const sb = window.supabaseClient;
  const bridge = window.LuriaClinicalBridge;
  const els = {
    search: document.getElementById("protocol-search"),
    category: document.getElementById("protocol-category"),
    list: document.getElementById("protocol-list"),
    detail: document.getElementById("protocol-detail"),
    count: document.getElementById("protocol-count"),
    empty: document.getElementById("protocol-empty")
  };
  let rows = [], selected = null;

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = (v) => String(v ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const listSection = (title, groups, cls = "") => {
    if (!Array.isArray(groups) || !groups.length) return "";
    return `<section class="protocol-section ${cls}"><h3>${esc(title)}</h3><div class="protocol-stack">${groups.map((g) => `
      <article class="protocol-card">
        ${g.title ? `<strong>${esc(g.title)}</strong>` : ""}
        ${g.regimen ? `<span class="protocol-regimen">${esc(g.regimen)}</span>` : ""}
        ${Array.isArray(g.items) ? `<ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      </article>`).join("")}</div></section>`;
  };

  const renderDecisionFlow = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section"><h3>Decisão clínica</h3><div class="protocol-flow">${items.map((x, i) => `
      <article class="protocol-flow-step">
        <span class="protocol-flow-number">${i + 1}</span>
        <div><strong>SE</strong><p>${esc(x.if)}</p><b>ENTÃO</b><p>${esc(x.then)}</p></div>
      </article>`).join("")}</div></section>`;
  };

  const renderRefs = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-refs"><h3>Referências oficiais</h3><div>${items.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label || "Fonte oficial")}</a>`).join("")}</div></section>`;
  };

  const filtered = () => {
    const q = norm(els.search?.value);
    const category = els.category?.value || "";
    return rows.filter((r) => {
      if (category && r.category !== category) return false;
      if (!q) return true;
      return norm([r.title,r.category,r.summary,...(r.tags||[]),JSON.stringify(r.suspicion||[]),JSON.stringify(r.exams||[])].join(" ")).includes(q);
    });
  };

  function renderList() {
    const items = filtered();
    els.count.textContent = `${items.length} protocolo${items.length === 1 ? "" : "s"}`;
    els.empty.hidden = items.length > 0;
    els.list.innerHTML = items.map((r) => `
      <button type="button" class="protocol-row ${selected === r.id ? "active" : ""}" data-id="${r.id}">
        <span><strong>${esc(r.title)}</strong><small>${esc(r.category)} · ${esc(r.setting)}</small></span>
        <em class="${r.status === "verified" ? "ok" : "warn"}">${r.status === "verified" ? "Revisado" : "Em revisão"}</em>
      </button>`).join("");
    els.list.querySelectorAll("[data-id]").forEach((btn) => btn.addEventListener("click", () => {
      selected = Number(btn.dataset.id);
      renderList();
      renderDetail(rows.find((x) => x.id === selected));
      if (matchMedia("(max-width:900px)").matches) els.detail.scrollIntoView({behavior:"smooth",block:"start"});
    }));
    if ((!selected || !items.some((x) => x.id === selected)) && items[0]) {
      selected = items[0].id;
      renderList();
      renderDetail(items[0]);
    }
  }

  function protocolText(r) {
    const lines = [r.title.toUpperCase(), "", r.summary || "", ""];
    const pushGroups = (label, groups) => {
      if (!Array.isArray(groups) || !groups.length) return;
      lines.push(label.toUpperCase() + ":");
      groups.forEach((g) => {
        if (g.title) lines.push(g.title);
        if (g.regimen) lines.push("Esquema: " + g.regimen);
        (g.items || []).forEach((x) => lines.push("- " + x));
      });
      lines.push("");
    };
    pushGroups("Quando suspeitar", r.suspicion);
    pushGroups("Primeira conduta", r.initial_actions);
    pushGroups("Exames", r.exams);
    if (Array.isArray(r.decision_flow) && r.decision_flow.length) {
      lines.push("FLUXO DE DECISÃO:");
      r.decision_flow.forEach((x) => lines.push("- SE " + x.if + " → " + x.then));
      lines.push("");
    }
    pushGroups("Tratamento", r.treatment);
    pushGroups("Situações especiais", r.special_situations);
    pushGroups("Seguimento", r.follow_up);
    if (Array.isArray(r.red_flags) && r.red_flags.length) {
      lines.push("SINAIS DE ALARME:");
      r.red_flags.forEach((x) => lines.push("- " + x));
    }
    return lines.join("\n").trim();
  }

  function renderDetail(r) {
    if (!r) { els.detail.innerHTML = '<div class="protocol-placeholder">Selecione um protocolo.</div>'; return; }
    const drugs = Array.isArray(r.linked_drug_terms) ? r.linked_drug_terms : [];
    const recipes = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    els.detail.innerHTML = `
      <header class="protocol-detail-head">
        <div>
          <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="${r.status === "verified" ? "ok" : "warn"}">${r.status === "verified" ? "Revisado" : "Em revisão"}</span></div>
          <h2>${esc(r.title)}</h2>
          <p>${esc(r.summary || "")}</p>
        </div>
        <div class="protocol-actions">
          ${recipes.length ? `<button type="button" data-open-recipe>Ver tratamento</button>` : ""}
          <button type="button" class="secondary" data-send-note>Enviar à Cola Rápida</button>
        </div>
      </header>
      ${listSection("Quando suspeitar", r.suspicion)}
      ${listSection("Primeira conduta", r.initial_actions)}
      ${listSection("Exames iniciais", r.exams)}
      ${renderDecisionFlow(r.decision_flow)}
      ${listSection("Tratamento", r.treatment, "treatment")}
      ${drugs.length ? `<section class="protocol-section"><h3>Medicamentos relacionados</h3><div class="protocol-drugs">${drugs.map((d) => `<button type="button" data-drug="${esc(d)}">${esc(d)} <span>↗</span></button>`).join("")}</div></section>` : ""}
      ${listSection("Situações especiais", r.special_situations)}
      ${listSection("Acompanhamento", r.follow_up)}
      ${Array.isArray(r.red_flags) && r.red_flags.length ? `<section class="protocol-section danger"><h3>Quando encaminhar / internar / reavaliar com urgência</h3><ul>${r.red_flags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
      ${r.notification?.text ? `<section class="protocol-section notification"><h3>Notificação</h3><p>${esc(r.notification.text)}</p></section>` : ""}
      ${renderRefs(r.source_refs)}
    `;

    els.detail.querySelectorAll("[data-drug]").forEach((b) => b.addEventListener("click", () => bridge?.openDrug(b.dataset.drug)));
    els.detail.querySelector("[data-open-recipe]")?.addEventListener("click", () => bridge?.openRecipe(recipes[0]));
    els.detail.querySelector("[data-send-note]")?.addEventListener("click", () => bridge?.toQuickChart({
      type:"protocol", slug:r.slug, title:r.title, text:protocolText(r), source:"Protocolos LURIA"
    }));
  }

  async function load() {
    if (!sb) { els.list.innerHTML = '<div class="protocol-placeholder">Não foi possível conectar.</div>'; return; }
    const {data,error} = await sb.from("clinical_protocols").select("*").order("title");
    if (error) { console.error(error); els.list.innerHTML = '<div class="protocol-placeholder">Não foi possível carregar os protocolos.</div>'; return; }
    rows = data || [];
    const cats = [...new Set(rows.map((r) => r.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
    els.category.innerHTML = '<option value="">Todas as áreas</option>' + cats.map((c)=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
    const params = new URLSearchParams(location.search);
    const wanted = params.get("protocol");
    const q = params.get("q");
    if (q) els.search.value = q;
    selected = rows.find((r) => r.slug === wanted)?.id || rows.find((r)=>norm(r.title).includes(norm(q||"")))?.id || rows[0]?.id || null;
    renderList();
    if (selected) renderDetail(rows.find((r)=>r.id===selected));
  }

  [els.search,els.category].forEach((el)=>{el?.addEventListener("input",renderList);el?.addEventListener("change",renderList);});
  load();
})();