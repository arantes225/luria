
  function getMatchedRecipes(r, recipesBank, norm) {
    const slugs = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    return (recipesBank || []).filter(rb =>
      slugs.includes(rb.slug) && rb.status === "verified" && rb.data?.copy_ready === true
    );
  }

  function formatRecipeCleanText(rec, selected) {
    const data = rec.data || {};
    const routes = Array.isArray(data.routes) ? data.routes : [];
    const lines = [rec.title.toUpperCase(), ""];
    routes.forEach((rt, routeIndex) => {
      const chosen = (rt.items || []).map((it, itemIndex) => ({it, itemIndex}))
        .filter(({itemIndex}) => selected.has(routeIndex + ":" + itemIndex));
      if (!chosen.length) return;
      lines.push(String(rt.route || "USO").toUpperCase() + ":");
      chosen.forEach(({it}, i) => {
        lines.push((i + 1) + ") " + (it.drug || "Medicamento") + (it.quantity ? " — " + it.quantity : ""));
        if (it.directions) lines.push("   " + it.directions);
      });
      lines.push("");
    });
    if (Array.isArray(data.orientations) && data.orientations.length) {
      lines.push("ORIENTAÇÕES:");
      data.orientations.forEach(o => lines.push("- " + o));
    }
    return lines.join("\n").trim();
  }

  function renderIntegratedRecipes(r, recipesBank, norm, esc) {
    const matchedRecipes = getMatchedRecipes(r, recipesBank, norm);
    if (!matchedRecipes.length) return "";

    return `
      <section class="protocol-section" style="border:2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 3%,var(--surface));box-shadow:0 4px 16px rgba(0,0,0,0.04)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <h3 style="margin:0;font-size:1.1rem;display:flex;align-items:center;gap:8px;color:var(--text)">
              <span>📋</span> Receita & Prescrição Pronta
            </h3>
            <span style="font-size:12.5px;color:var(--muted)">Marque os medicamentos desejados; as orientações acompanham a cópia.</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="padding:4px 8px;border-radius:999px;font-size:11px;font-weight:800;background:var(--surface);border:1px solid var(--border);color:var(--theme,#184888)">
              ${matchedRecipes.length} prescriç${matchedRecipes.length > 1 ? 'ões' : 'ão'}
            </span>
          </div>
        </div>
        <div style="display:grid;gap:12px">
          ${matchedRecipes.map((rec, rIdx) => {
            const data = rec.data || {};
            const routes = Array.isArray(data.routes) ? data.routes : [];
            return `
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:grid;gap:12px">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                  <strong style="font-size:14.5px;color:var(--theme,#184888)">${esc(rec.title)}</strong>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="integrated-recipe-copy-btn" data-recipe-index="${rIdx}" disabled style="padding:8px 14px;border-radius:8px;border:1px solid var(--theme,#184888);background:color-mix(in srgb,var(--theme,#184888) 12%,var(--surface));color:var(--theme,#184888);font-size:12.5px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
                      <span>📋</span> Copiar selecionados + orientações
                    </button>
                  </div>
                </div>
                ${routes.map(rt => `
                  <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3.5px solid var(--theme,#184888);display:grid;gap:6px">
                    <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;color:var(--theme,#184888)">${esc(rt.route || 'USO')}</span>
                    ${(rt.items || []).map((it, itIdx) => `
                      <label style="display:flex;gap:9px;align-items:start;font-size:13px;line-height:1.5">
                        <input type="checkbox" data-recipe-med="${rIdx}" data-route-index="${routes.indexOf(rt)}" data-item-index="${itIdx}" aria-label="Selecionar ${esc(it.drug || 'Medicamento')}" style="margin-top:3px">
                        <span><strong>${rt.mode === 'alternatives' ? (itIdx + 1) + 'ª OPÇÃO: ' : ''}${esc(it.drug || 'Medicamento')}</strong>
                        ${it.quantity ? ' — <span style="color:var(--muted);font-weight:600">' + esc(it.quantity) + '</span>' : ''}
                        ${it.directions ? '<small style="display:block;margin:3px 0 0;font-size:12.5px;color:var(--text)">' + esc(it.directions) + '</small>' : ''}</span>
                      </label>
                    `).join('')}
                  </div>
                `).join('')}
                ${data.orientations && data.orientations.length ? `
                  <div style="font-size:12.5px;color:var(--text);line-height:1.45;background:var(--surface-2);padding:10px 12px;border-radius:8px">
                    <strong style="color:var(--theme,#184888);display:block;margin-bottom:4px">Orientações ao Paciente:</strong>
                    <ul style="margin:0;padding-left:18px;display:grid;gap:3px">
                      ${data.orientations.map(o => `<li>${esc(o)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

(() => {
  "use strict";
  const sb = window.supabaseClient;
  const bridge = window.TraubeClinicalBridge;
  const els = {
    search: document.getElementById("protocol-search"),
    category: document.getElementById("protocol-category"),
    batch: document.getElementById("protocol-batch"),
    pagePrev: document.getElementById("protocol-page-prev"),
    pageNext: document.getElementById("protocol-page-next"),
    pageLabel: document.getElementById("protocol-page-label"),
    list: document.getElementById("protocol-list"),
    modal: document.getElementById("protocol-modal"),
    detail: document.getElementById("protocol-detail"),
    count: document.getElementById("protocol-count"),
    empty: document.getElementById("protocol-empty")
  };
  let rows = [], selected = null, recipesBank = [];
  const recipeSelections = new Map();
  let previousFocus = null;
  function closeModal() {
    ++detailRequest;
    if (els.modal) els.modal.hidden = true;
    document.body.classList.remove("protocol-modal-open");
    previousFocus?.focus?.();
  }

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

  const renderImages = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-images">
      <h3>Imagens-chave</h3>
      <div class="protocol-image-grid">${items.map((img) => `
        <figure class="protocol-image-card">
          <button type="button" class="protocol-image-open" data-image-src="${esc(traubeSafeContentUrl(img.src, {relative:true}))}" aria-label="Ampliar imagem">
            <img loading="lazy" decoding="async" src="${esc(traubeSafeContentUrl(img.src, {relative:true}))}" alt="${esc(img.alt || img.caption || "Imagem didática do protocolo")}">
          </button>
          ${img.caption ? `<figcaption><strong>${esc(img.caption)}</strong>${img.credit ? `<small>${esc(img.credit)}</small>` : ""}</figcaption>` : ""}
        </figure>`).join("")}
      </div>
    </section>`;
  };

  const renderRefs = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-refs"><h3>Fontes e referências</h3><div>${items.map((r) => `<a href="${esc(traubeSafeContentUrl(r.url) || '#')}" target="_blank" rel="noopener noreferrer">${esc(r.label || "Fonte oficial")}</a>`).join("")}</div></section>`;
  };


  const PAGE_SIZE = 40;
  let page = 0, totalMatches = 0, listRequest = 0, detailRequest = 0;
  function renderList() {
    els.count.textContent = String(totalMatches) + (totalMatches === 1 ? " protocolo" : " protocolos");
    els.empty.hidden = rows.length > 0;
    els.list.innerHTML = rows.map((r) =>
      '<button type="button" class="protocol-row' + (String(selected) === String(r.id) ? ' active' : '') + '" data-id="' + esc(r.id) + '">' +
        '<span class="protocol-card-icon" aria-hidden="true">✚</span><span class="protocol-card-copy"><strong>' + esc(r.title) + '</strong><small>' + esc(r.category) +
        (r.cid10_primary ? ' · CID-10 ' + esc(r.cid10_primary) : '') + '</small>' +
        '<em class="' + (r.status === 'verified' ? 'ok' : 'warn') + '">' +
        (r.status === 'verified' ? 'Revisado' : (Array.isArray(r.tags) && r.tags.includes('conteudo-pendente') ? 'Em elaboração' : 'Em revisão')) +
        '</em></span><span class="protocol-card-arrow" aria-hidden="true">›</span></button>'
    ).join("");
    els.list.querySelectorAll("[data-id]").forEach((btn) => btn.addEventListener("click", () => openProtocol(btn.dataset.id)));
    if (els.pagePrev) els.pagePrev.disabled = page <= 0;
    if (els.pageNext) els.pageNext.disabled = (page + 1) * PAGE_SIZE >= totalMatches;
    if (els.pageLabel) els.pageLabel.textContent = totalMatches ?
      "Página " + (page + 1) + " de " + Math.ceil(totalMatches / PAGE_SIZE) : "Nenhum resultado";
  }

  async function openProtocol(idOrSlug, bySlug = false) {
    const ticket = ++detailRequest;
    previousFocus = document.activeElement;
    if (els.modal) els.modal.hidden = false;
    document.body.classList.add("protocol-modal-open");
    els.modal?.querySelector('button[data-close-protocol]')?.focus();
    selected = idOrSlug;
    recipeSelections.clear();
    renderList();
    els.detail.innerHTML = '<div class="protocol-placeholder">Carregando a ficha selecionada…</div>';
    if (!sb) {
      const local = rows.find((x) => String(x.id) === String(idOrSlug) || x.slug === idOrSlug);
      if (local) renderDetail(local);
      else els.detail.textContent = "Protocolo não disponível.";
      return;
    }
    try {
      let request = sb.from("clinical_protocols").select("*");
      request = bySlug ? request.eq("slug", idOrSlug) : request.eq("id", idOrSlug);
      const result = await request.single();
      if (ticket !== detailRequest) return;
      if (result.error || !result.data) throw result.error || Error("Ficha não localizada");
      const data = result.data;
      selected = data.id;
      recipesBank = [];
      const linked = Array.isArray(data.linked_recipe_slugs) ? data.linked_recipe_slugs.filter(Boolean) : [];
      if (data.status === "verified" && linked.length) {
        const recipes = await sb.from("recipe_bank").select("*").in("slug", linked);
        if (ticket !== detailRequest) return;
        if (!recipes.error) recipesBank = recipes.data || [];
      }
      renderDetail(data);
      renderList();
      els.modal?.querySelector(".protocol-modal-body")?.scrollTo?.(0, 0);
    } catch (err) {
      if (ticket !== detailRequest) return;
      console.error("[Traube] Falha ao abrir ficha", err);
      els.detail.innerHTML = '<div class="protocol-placeholder">Não foi possível carregar esta ficha. Tente novamente.</div>';
    }
  }

  async function loadPage(reset = false) {
    if (reset) page = 0;
    const ticket = ++listRequest;
    selected = null;
    ++detailRequest;
    if (els.modal) els.modal.hidden = true;
    document.body.classList.remove("protocol-modal-open");
    els.detail.innerHTML = '<div class="protocol-placeholder">Clique em um protocolo para consultar sua ficha.</div>';
    els.list.innerHTML = '<div class="protocol-placeholder">Consultando títulos…</div>';
    if (!sb) {
      const local = Array.isArray(window.TRAUBE_PROTOCOL_SEEDS) ? window.TRAUBE_PROTOCOL_SEEDS : [];
      const queryText = norm(els.search?.value);
      const result = local.filter((r) => (!els.category.value || r.category === els.category.value) &&
        (!els.batch?.value || (r.tags || []).includes(els.batch.value)) &&
        (!queryText || norm((r.title || "") + " " + (r.cid10_primary || "")).includes(queryText)));
      totalMatches = result.length;
      rows = result.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
      renderList();
      return;
    }
    try {
      let req = sb.from("clinical_protocols").select("id,slug,title,category,setting,status,tags,cid10_primary,cid10_description", {count:"exact"});
      const cat = els.category?.value || "", batch = els.batch?.value || "";
      const q = (els.search?.value || "").trim().replace(/[,()*%\\]/g," ").slice(0,90).trim();
      if (cat) req = req.eq("category", cat);
      if (batch) req = req.contains("tags", [batch]);
      if (q) req = req.or("title.ilike.%" + q + "%,cid10_primary.ilike.%" + q + "%,cid10_description.ilike.%" + q + "%");
      const result = await req.order("title", {ascending:true}).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      if (ticket !== listRequest) return;
      if (result.error) throw result.error;
      rows = result.data || [];
      totalMatches = result.count ?? rows.length;
      renderList();
    } catch (err) {
      if (ticket !== listRequest) return;
      console.error("[Traube] Falha na listagem paginada",err);
      rows = [];
      els.list.innerHTML = '<div class="protocol-placeholder">Falha ao consultar o catálogo. Verifique sua conexão.</div>';
      els.count.textContent = "—";
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

  function examText(r) {
    const groups = Array.isArray(r.exams) ? r.exams : [];
    const lines = groups.flatMap((group) => {
      const items = Array.isArray(group.items) ? group.items.filter(Boolean) : [];
      return items.length ? [group.title || group.regimen || "Exames", ...items.map((item) => "- " + item)] : [];
    });
    return lines.length ? "EXAMES — " + r.title + "\n\n" + lines.join("\n") : "";
  }

  async function copyText(text, button, success) {
    if (!text || !navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(text);
      const old = button.textContent;
      button.textContent = success;
      setTimeout(() => { button.textContent = old; }, 1800);
    } catch (error) {
      console.error("[Traube] Não foi possível copiar", error);
      button.textContent = "Falha ao copiar";
    }
  }

  function renderDetail(r) {
    if (!r) { els.detail.innerHTML = '<div class="protocol-placeholder">Selecione um protocolo.</div>'; return; }
    // Conteudos apenas catalogados ainda nao sao protocolos clinicos: sem prescricao, alta ou copia.
    if (Array.isArray(r.tags) && r.tags.includes("conteudo-pendente")) {
      els.detail.innerHTML = `
        <header class="protocol-detail-head">
          <div>
            <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="warn">Em elaboração</span></div>
            <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
            <p>${esc(r.summary || "")}</p>
          </div>
        </header>
        <section class="protocol-section">
          <h3>Conteúdo clínico ainda não disponível</h3>
          <p>Este tema foi adicionado ao catálogo para futura elaboração. Diagnóstico, exames, tratamentos, doses, contraindicações e referências precisam de redação e revisão clínica independente. Não utilize esta ficha para prescrever, dar alta ou tomar decisões assistenciais.</p>
        </section>
      `;
      return;
    }
    // Rascunhos clinicos: leitura restrita a secoes editoriais, sem receita, orientacao
    // de alta generica, calculadoras ou exportacao para prontuario.
    if (Array.isArray(r.tags) && r.tags.includes("rascunho-clinico")) {
      els.detail.innerHTML = `
        <header class="protocol-detail-head"><div>
          <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="warn">Rascunho clínico — em revisão</span></div>
          <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
          <p>${esc(r.summary || "")}</p>
        </div></header>
        <section class="protocol-section danger">
          <h3>Atenção: conteúdo em revisão</h3>
          <p>Ficha de estudo inicial, não validada para assistência, prescrição ou tomada de decisão clínica. Confirmar condutas, contraindicações, doses e fontes específicas antes de uso. Revisão por profissional habilitado pendente.</p>
        </section>
        ${listSection("Quando suspeitar", r.suspicion)}
        ${listSection("Conduta inicial", r.initial_actions)}
        ${listSection("Exames dirigidos", r.exams)}
        ${renderDecisionFlow(r.decision_flow)}
        ${listSection("Tratamento — orientação preliminar", r.treatment, "treatment")}
        ${listSection("Situações especiais e contraindicações", r.special_situations)}
        ${listSection("Monitorização e seguimento", r.follow_up)}
        ${Array.isArray(r.red_flags) && r.red_flags.length ? `<section class="protocol-section danger"><h3>Sinais de alarme</h3><ul>${r.red_flags.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
        ${Array.isArray(r.source_refs) && r.source_refs.length ? renderRefs(r.source_refs) : '<section class="protocol-section protocol-refs"><h3>Fontes e referências</h3><p>Referências individuais ainda não conferidas; não considerar esta ficha pronta.</p></section>'}
      `;
      return;
    }
    const drugs = Array.isArray(r.linked_drug_terms) ? r.linked_drug_terms : [];
    const recipes = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    els.detail.innerHTML = `
      <header class="protocol-detail-head">
        <div>
          <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="${r.status === "verified" ? "ok" : "warn"}">${r.status === "verified" ? "Revisado" : "Em revisão"}</span></div>
          <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
          <p>${esc(r.summary || "")}</p>
        </div>
        <div class="protocol-actions">
          ${getMatchedRecipes(r, recipesBank, norm).length ? '<button type="button" data-copy-main-recipe disabled>📋 Copiar receita selecionada</button>' : ""}
          ${r.status === "verified" && examText(r) ? '<button type="button" class="secondary" data-copy-exams>Copiar exames</button>' : ""}
          ${recipes.length ? `<button type="button" class="secondary" data-open-recipe>Ver no Banco</button>` : ""}
          <button type="button" class="secondary" data-send-note>Enviar à Cola Rápida</button>
        </div>
      </header>
      ${renderIntegratedRecipes(r, recipesBank, norm, esc)}
      ${listSection("Quando suspeitar", r.suspicion)}
      ${listSection("Primeira conduta", r.initial_actions)}
      ${listSection("Exames iniciais", r.exams)}
      ${renderImages(r.image_assets)}
      ${renderDecisionFlow(r.decision_flow)}
      ${listSection("Tratamento complementar", r.treatment, "treatment")}
      ${drugs.length ? `
        <section class="protocol-section" style="border-left:4px solid var(--theme,#184888)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px">
            <h3 style="margin:0;display:flex;align-items:center;gap:6px"><span>💊</span> Medicamentos Relacionados & Dados Farmacológicos</h3>
            <span style="font-size:11px;font-weight:700;color:var(--muted)">Clique para abrir ficha técnica com posologia, diluição e contraindicação</span>
          </div>
          <div class="protocol-drugs" style="display:flex;flex-wrap:wrap;gap:8px">
            ${drugs.map((d) => `
              <div style="display:inline-flex;border-radius:8px;border:1px solid var(--border);background:var(--surface);overflow:hidden">
                <button type="button" data-quick-drug="${esc(d)}" style="padding:6px 10px;background:none;border:none;font-size:12.5px;font-weight:700;color:var(--theme,#184888);cursor:pointer;display:flex;align-items:center;gap:4px">
                  <span>ℹ️</span> ${esc(d)}
                </button>
                <button type="button" data-drug="${esc(d)}" title="Ver no Bulário TRAUBE" style="padding:6px 8px;border:none;border-left:1px solid var(--border);background:var(--surface-2);font-size:11px;color:var(--muted);cursor:pointer">
                  ↗
                </button>
              </div>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${listSection("Profilaxia & Prevenção Secundária", r.prophylaxis, "prophylaxis")}
      ${listSection("Situações especiais", r.special_situations)}
      ${listSection("Acompanhamento", r.follow_up)}
      ${Array.isArray(r.red_flags) && r.red_flags.length ? `<section class="protocol-section danger"><h3>Quando encaminhar / internar / reavaliar com urgência</h3><ul>${r.red_flags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
      ${r.notification?.text ? `<section class="protocol-section notification"><h3>Notificação</h3><p>${esc(r.notification.text)}</p></section>` : ""}
      ${renderRefs(r.source_refs)}
    `;

    els.detail.querySelectorAll("[data-image-src]").forEach((b) => b.addEventListener("click", () => {
      const src = b.dataset.imageSrc;
      const dialog = document.createElement("dialog");
      dialog.className = "protocol-image-dialog";
      dialog.innerHTML = `<button type="button" aria-label="Fechar">×</button><img src="${esc(src)}" alt="Imagem ampliada do protocolo">`;
      document.body.appendChild(dialog);
      dialog.querySelector("button")?.addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (ev) => { if (ev.target === dialog) dialog.close(); });
      dialog.addEventListener("close", () => dialog.remove());
      dialog.showModal();
    }));
    
    // Listener do Modal de Detalhes Rápidos do Medicamento
    els.detail.querySelectorAll('[data-quick-drug]').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.quickDrug;
        const bSeeds = Array.isArray(window.TRAUBE_BULARIO_SEEDS) ? window.TRAUBE_BULARIO_SEEDS : [];
        const normStr = (v) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
        const q = normStr(term);
        const drug = bSeeds.find(d => {
          const dn = normStr(d.name);
          const da = normStr(d.active_ingredient);
          return dn.includes(q) || da.includes(q) || q.includes(da) || (d.data?.products || []).some(p => normStr(p.name).includes(q));
        });

        const dialog = document.createElement('dialog');
        dialog.className = 'protocol-drug-dialog';
        dialog.style.cssText = 'max-width:640px;width:90%;border:1px solid var(--border);border-radius:16px;padding:20px;background:var(--surface);box-shadow:0 12px 36px rgba(0,0,0,0.25);color:var(--text);';
        
        if (drug) {
          const dt = drug.data || {};
          const f = (dt.formulations || [])[0] || {};
          dialog.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px">
              <div>
                <h3 style="margin:0;font-size:1.15rem;color:var(--theme,#184888)">${esc(drug.name)}</h3>
                <small style="color:var(--muted)">${esc(drug.therapeutic_class || dt.therapeutic_class || '')}</small>
              </div>
              <button type="button" class="btn-close-drug-dialog" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-weight:700;cursor:pointer">✕</button>
            </div>
            <div style="display:grid;gap:10px;font-size:13px;max-height:60vh;overflow-y:auto;padding-right:6px">
              <div><strong>Indicação Clínica:</strong> ${esc(dt.indication || 'Uso conforme protocolo.')}</div>
              ${f.dose_text ? `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888)"><strong>Posologia Habitual:</strong> ${esc(f.dose_text)}</div>` : ''}
              ${dt.contraindications && dt.contraindications.length ? `<div style="color:var(--danger,#b91c1c)"><strong>Contraindicações:</strong> ${dt.contraindications.map(c => esc(c)).join('; ')}</div>` : ''}
              ${dt.pregnancy_category ? `<div><strong>Gestação:</strong> ${esc(dt.pregnancy_category)} ${dt.pregnancy_text ? '— ' + esc(dt.pregnancy_text) : ''}</div>` : ''}
              ${dt.compatible_diluents ? `<div><strong>Diluição & Compatibilidade:</strong> ${esc(dt.compatible_diluents)}</div>` : ''}
              ${dt.antidote && dt.antidote.length ? `<div style="padding:6px 10px;border-radius:6px;background:color-mix(in srgb,var(--theme,#184888) 8%,var(--surface))"><strong>Antídoto / Extravasamento:</strong> ${dt.antidote.map(a => esc(a)).join(' ')}</div>` : ''}
            </div>
            <div style="margin-top:14px;display:flex;justify-content:flex-end;gap:8px;border-top:1px solid var(--border);padding-top:10px">
              <button type="button" class="btn-goto-bulario" style="padding:6px 12px;border-radius:8px;border:1px solid var(--theme,#184888);background:var(--theme,#184888);color:#fff;font-weight:700;cursor:pointer">Ver ficha completa no Bulário ↗</button>
            </div>
          `;
        } else {
          dialog.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <h3 style="margin:0;font-size:1.1rem;color:var(--theme,#184888)">${esc(term)}</h3>
              <button type="button" class="btn-close-drug-dialog" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-weight:700;cursor:pointer">✕</button>
            </div>
            <p style="font-size:13px;color:var(--muted)">Medicamento referenciado no protocolo clínico institucional. Consulte o bulário para a bula completa.</p>
            <div style="margin-top:14px;display:flex;justify-content:flex-end">
              <button type="button" class="btn-goto-bulario" style="padding:6px 12px;border-radius:8px;border:1px solid var(--theme,#184888);background:var(--theme,#184888);color:#fff;font-weight:700;cursor:pointer">Pesquisar no Bulário ↗</button>
            </div>
          `;
        }
        
        document.body.appendChild(dialog);
        dialog.querySelector('.btn-close-drug-dialog')?.addEventListener('click', () => dialog.close());
        dialog.querySelector('.btn-goto-bulario')?.addEventListener('click', () => {
          dialog.close();
          bridge?.openDrug(term);
        });
        dialog.addEventListener('click', (ev) => { if (ev.target === dialog) dialog.close(); });
        dialog.addEventListener('close', () => dialog.remove());
        dialog.showModal();
      });
    });

    // Listener do Wells TEP
    const wellsBoxes = els.detail.querySelectorAll('.wells-item');
    if (wellsBoxes.length) {
      const updateWells = () => {
        let pts = 0;
        wellsBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#wells-score-display');
        const rec = els.detail.querySelector('#wells-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts.toFixed(1) + ' pontos';
        if (rec) {
          if (pts <= 4) rec.textContent = 'Wells ≤ 4 pontos: TEP improvável. Solicitar D-Dímero de alta sensibilidade; se negativo descarta TEP.';
          else rec.textContent = 'Wells > 4 pontos: TEP provável (alta suspeita). Indicar Angio-TC de tórax imediata e considerar anticoagulação plena empírica se não houver sangramento.';
        }
      };
      wellsBoxes.forEach(b => b.addEventListener('change', updateWells));
    }

    els.detail.querySelectorAll('[data-recipe-med]').forEach(box => box.addEventListener('change', () => {
      const recIndex = Number(box.dataset.recipeMed);
      const routeIndex = Number(box.dataset.routeIndex);
      const itemIndex = Number(box.dataset.itemIndex);
      const matched = getMatchedRecipes(r, recipesBank, norm);
      const route = matched[recIndex]?.data?.routes?.[routeIndex];
      if (!route) return;
      const chosen = recipeSelections.get(recIndex) || new Set();
      if (box.checked && route.mode === "alternatives") {
        els.detail.querySelectorAll('[data-recipe-med="' + recIndex + '"][data-route-index="' + routeIndex + '"]')
          .forEach(other => { if (other !== box) { other.checked = false; chosen.delete(routeIndex + ":" + other.dataset.itemIndex); } });
      }
      const key = routeIndex + ":" + itemIndex;
      if (box.checked) chosen.add(key); else chosen.delete(key);
      recipeSelections.set(recIndex, chosen);
      els.detail.querySelector('[data-recipe-index="' + recIndex + '"]').disabled = chosen.size === 0;
      const main = els.detail.querySelector('[data-copy-main-recipe]');
      if (main && recIndex === 0) main.disabled = chosen.size === 0;
    }));
    els.detail.querySelector('[data-copy-exams]')?.addEventListener('click', (event) =>
      copyText(examText(r), event.currentTarget, "Exames copiados ✓"));

    // Listener de cópia da receita integrada
    els.detail.querySelectorAll('.integrated-recipe-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.recipeIndex);
        const matched = getMatchedRecipes(r, recipesBank, norm);
        const targetRec = matched[idx];
        if (!targetRec) return;

        const chosen = recipeSelections.get(idx);
        if (chosen?.size) copyText(formatRecipeCleanText(targetRec, chosen), btn, "Receita copiada ✓");
      });
    });

    // Listener para o botão de ação rápida do cabeçalho
    els.detail.querySelector('[data-copy-main-recipe]')?.addEventListener('click', () => {
      const matched = getMatchedRecipes(r, recipesBank, norm);
      if (!matched.length) return;
      const chosen = recipeSelections.get(0);
      if (chosen?.size) copyText(formatRecipeCleanText(matched[0], chosen),
        els.detail.querySelector('[data-copy-main-recipe]'), "Receita copiada ✓");
    });
els.detail.querySelectorAll("[data-drug]").forEach((b) => b.addEventListener("click", () => bridge?.openDrug(b.dataset.drug)));
    els.detail.querySelector("[data-open-recipe]")?.addEventListener("click", () => bridge?.openRecipe(recipes[0]));
    els.detail.querySelector("[data-send-note]")?.addEventListener("click", () => bridge?.toQuickChart({
      type:"protocol", slug:r.slug, title:r.title, text:protocolText(r), source:"Protocolos TRAUBE"
    }));
  }


  async function load() {
    const cats = ["Clínica Médica","APH / Emergência","Pediatria","Ginecologia e Obstetrícia","Cirurgia Geral",
      "Infectologia","Infectologia / Pneumologia","Procedimentos / Protocolos Transversais","Dermatologia","Psiquiatria"];
    els.category.innerHTML = '<option value="">Todas as áreas</option>' + cats.sort((a,b)=>a.localeCompare(b,"pt-BR"))
      .map(c=>'<option value="' + esc(c) + '">' + esc(c) + '</option>').join("");
    if (els.batch) {
      const labels = [
        ["bloco-01-de-04","Bloco 1 · Emergência, cardio, pneumologia"],
        ["bloco-02-de-04","Bloco 2 · Gastro, nefro, neurologia"],
        ["bloco-03-de-04","Bloco 3 · Infectologia, pediatria"],
        ["bloco-04-de-04","Bloco 4 · GO, cirurgia, atenção primária"],
        ["expansao-1700-20261031","Expansão CID-10 · 1.080 temas em elaboração"]
      ];
      els.batch.innerHTML = '<option value="">Todos os blocos</option>' +
        labels.map(pair => '<option value="' + esc(pair[0]) + '">' + esc(pair[1]) + '</option>').join("");
    }
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) els.search.value = q;
    await loadPage(true);
    const wanted = params.get("protocol");
    if (wanted) await openProtocol(wanted,true);
  }

  let searchDebounce;
  els.search?.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => loadPage(true), 240);
  });
  [els.category,els.batch].forEach(el=>el?.addEventListener("change", () => loadPage(true)));
  els.modal?.querySelectorAll("[data-close-protocol]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && els.modal && !els.modal.hidden) closeModal(); });
  els.pagePrev?.addEventListener("click", () => { if (page > 0) {page--;loadPage();} });
  els.pageNext?.addEventListener("click", () => { if ((page + 1) * PAGE_SIZE < totalMatches) {page++;loadPage();} });
  load();
})();

