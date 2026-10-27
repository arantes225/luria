
  function renderIntegratedRecipes(r, recipesBank, norm, esc) {
    const slugs = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    // Busca receitas pelo slug vinculado ou por título similar
    const matchedRecipes = recipesBank.filter(rb => 
      slugs.includes(rb.slug) || 
      norm(rb.title).includes(norm(r.title)) || 
      norm(r.title).includes(norm(rb.title))
    );

    if (!matchedRecipes.length) return "";

    return `
      <section class="protocol-section" style="border:2px solid color-mix(in srgb,var(--theme,#184888) 25%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 2.5%,var(--surface))">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <h3 style="margin:0;font-size:1.05rem;display:flex;align-items:center;gap:8px">
              <span>💊</span> Prescrição Modelo & Tratamento Geral
            </h3>
            <span style="font-size:12px;color:var(--muted)">Pronto para conferência e cópia para o prontuário</span>
          </div>
          <span style="padding:4px 8px;border-radius:999px;font-size:11px;font-weight:800;background:var(--surface);border:1px solid var(--border);color:var(--theme,#184888)">
            ${matchedRecipes.length} modelo${matchedRecipes.length > 1 ? 's' : ''}
          </span>
        </div>
        <div style="display:grid;gap:12px">
          ${matchedRecipes.map((rec, rIdx) => {
            const data = rec.data || {};
            const routes = Array.isArray(data.routes) ? data.routes : [];
            const isCopyReady = rec.status === 'verified' && data.copy_ready === true;
            return `
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:10px">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                  <strong style="font-size:14px;color:var(--theme,#184888)">${esc(rec.title)}</strong>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="integrated-recipe-copy-btn" data-recipe-index="${rIdx}" style="padding:6px 12px;border-radius:8px;border:1px solid var(--theme,#184888);background:color-mix(in srgb,var(--theme,#184888) 10%,var(--surface));color:var(--theme,#184888);font-size:12px;font-weight:750;cursor:pointer">
                      Copiar Prescrição 📋
                    </button>
                  </div>
                </div>
                ${routes.map(rt => `
                  <div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888);display:grid;gap:6px">
                    <span style="font-size:11px;font-weight:800;text-transform:uppercase;color:var(--muted)">${esc(rt.route || 'Uso')}</span>
                    ${(rt.items || []).map((it, itIdx) => `
                      <div style="font-size:13px;line-height:1.45">
                        <strong>${rt.mode === 'alternatives' ? (itIdx + 1) + 'ª OPÇÃO: ' : ''}${esc(it.drug || 'Medicamento')}</strong>
                        ${it.quantity ? ' — <span style="color:var(--muted)">' + esc(it.quantity) + '</span>' : ''}
                        ${it.directions ? '<p style="margin:3px 0 0;font-size:12.5px;color:var(--text)">' + esc(it.directions) + '</p>' : ''}
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
                ${data.orientations && data.orientations.length ? `
                  <div style="font-size:12px;color:var(--muted);line-height:1.4">
                    <strong>Orientações complementares:</strong> ${data.orientations.map(o => esc(o)).join('; ')}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }


  function getProtocolCalculators(r) {
    const slug = (r.slug || '').toLowerCase();
    const title = (r.title || '').toLowerCase();
    
    if (slug.includes('fibrilacao-atrial') || title.includes('fibrilação atrial')) {
      return `
        <section class="protocol-section" style="border: 2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 3%,var(--surface))">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <h3 style="margin:0">Calculadora Inline: CHA₂DS₂-VASc (Risco Tromboembólico na FA)</h3>
            <span style="font-size:11px;font-weight:800;color:var(--theme,#184888);text-transform:uppercase">Escore Rápido</span>
          </div>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-calc-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> IC / Disfunção VE (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Hipertensão arterial (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="2" class="chads-item"> Idade ≥ 75 anos (+2)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Diabetes Mellitus (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="2" class="chads-item"> AVC / AIT / Tromboembolismo prévio (+2)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Doença vascular (IAM, DAP ou placa aórtica) (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Idade entre 65–74 anos (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Sexo feminino (+1)</label>
          </div>
          <div style="margin-top:12px;padding:10px;border-radius:10px;background:var(--surface);border:1px solid var(--border)">
            <strong style="display:block;font-size:14px" id="chads-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="chads-rec-display">Escore 0 (homem) ou 1 (mulher): Anticoagulação não recomendada.</span>
          </div>
        </section>
      `;
    }
    
    if (slug.includes('pneumonia') || title.includes('pneumonia')) {
      return `
        <section class="protocol-section" style="border: 2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 3%,var(--surface))">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <h3 style="margin:0">Calculadora Inline: CURB-65 (Estratificação na PAC)</h3>
            <span style="font-size:11px;font-weight:800;color:var(--theme,#184888);text-transform:uppercase">Gravidade</span>
          </div>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-curb-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>C</strong> - Confusão mental aguda (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>U</strong> - Ureia sérica > 50 mg/dL (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>R</strong> - Frequência respiratória ≥ 30 irpm (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>B</strong> - PA sistólica < 90 ou diastólica ≤ 60 mmHg (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>65</strong> - Idade ≥ 65 anos (+1)</label>
          </div>
          <div style="margin-top:12px;padding:10px;border-radius:10px;background:var(--surface);border:1px solid var(--border)">
            <strong style="display:block;font-size:14px" id="curb-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="curb-rec-display">CURB 0-1: Baixo risco de mortalidade. Tratamento ambulatorial seguro.</span>
          </div>
        </section>
      `;
    }

    if (slug.includes('tromboembolismo') || slug.includes('tep') || title.includes('tromboembolismo pulmonar')) {
      return `
        <section class="protocol-section" style="border: 2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 3%,var(--surface))">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <h3 style="margin:0">Calculadora Inline: Escore de Wells para TEP</h3>
            <span style="font-size:11px;font-weight:800;color:var(--theme,#184888);text-transform:uppercase">Probabilidade</span>
          </div>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-wells-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="3" class="wells-item"> Sinais/sintomas clínicos de TVP (+3,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="3" class="wells-item"> TEP é a principal suspeita ou tão provável quanto outro dx (+3,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> Frequência cardíaca > 100 bpm (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> Imobilização ≥ 3 dias ou cirurgia nas últimas 4 semanas (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> Episódio prévio documentado de TVP ou TEP (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="wells-item"> Hemoptise (+1,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="wells-item"> Câncer ativo ou tratado nos últimos 6 meses (+1,0)</label>
          </div>
          <div style="margin-top:12px;padding:10px;border-radius:10px;background:var(--surface);border:1px solid var(--border)">
            <strong style="display:block;font-size:14px" id="wells-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="wells-rec-display">Wells ≤ 4 pontos: TEP improvável. Solicitar D-Dímero de alta sensibilidade para exclusão.</span>
          </div>
        </section>
      `;
    }

    return '';
  }

  function getDischargeInstructions(r) {
    return `
      <section class="protocol-section" style="border-left: 4px solid var(--theme,#184888)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 style="margin:0">Orientações de Alta ao Paciente & Sinais de Alarme</h3>
          <span style="font-size:11px;font-weight:800;color:var(--theme,#184888)">Educação & Segurança</span>
        </div>
        <div style="background:var(--surface-2);padding:12px;border-radius:12px;font-size:13px;line-height:1.55" id="protocol-discharge-text">
          <p style="margin:0 0 6px"><strong>1. Cuidados domiciliares:</strong> Seguir a posologia prescrita com rigor de horários e completar a duração total estipulada mesmo que haja melhora precoce dos sintomas.</p>
          <p style="margin:0 0 6px"><strong>2. Sinais de Alarme para Retorno Imediato:</strong> Febre persistente ou refratária aos antitérmicos, falta de ar (dispneia progressiva), dor torácica súbita, sonolência excessiva ou confusão mental, incapacidade de ingerir líquidos por vômitos incoercíveis, e sangramentos não usuais.</p>
          <p style="margin:0"><strong>3. Reavaliação Programada:</strong> Retornar à unidade básica ou ambulatório de referência em 48 a 72 horas para confirmação da melhora clínica e revisão dos exames complementares solicitados.</p>
        </div>
        <div style="margin-top:8px">
          <button type="button" id="copy-discharge-btn" style="padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:var(--surface);font-size:12px;font-weight:700;color:var(--text);cursor:pointer">Copiar orientações de alta para a receita 📋</button>
        </div>
      </section>
    `;
  }

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
  let rows = [], selected = null, recipesBank = [];

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
          <button type="button" class="protocol-image-open" data-image-src="${esc(luriaSafeContentUrl(img.src, {relative:true}))}" aria-label="Ampliar imagem">
            <img loading="lazy" decoding="async" src="${esc(luriaSafeContentUrl(img.src, {relative:true}))}" alt="${esc(img.alt || img.caption || "Imagem didática do protocolo")}">
          </button>
          ${img.caption ? `<figcaption><strong>${esc(img.caption)}</strong>${img.credit ? `<small>${esc(img.credit)}</small>` : ""}</figcaption>` : ""}
        </figure>`).join("")}
      </div>
    </section>`;
  };

  const renderRefs = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-refs"><h3>Referências oficiais</h3><div>${items.map((r) => `<a href="${esc(luriaSafeContentUrl(r.url) || '#')}" target="_blank" rel="noopener noreferrer">${esc(r.label || "Fonte oficial")}</a>`).join("")}</div></section>`;
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
      <button type="button" class="protocol-row ${String(selected) === String(r.id) ? "active" : ""}" data-id="${r.id}">
        <span><strong>${esc(r.title)}</strong><small>${esc(r.category)} · ${esc(r.setting)}</small></span>
        <em class="${r.status === "verified" ? "ok" : "warn"}">${r.status === "verified" ? "Revisado" : "Em revisão"}</em>
      </button>`).join("");
    els.list.querySelectorAll("[data-id]").forEach((btn) => btn.addEventListener("click", () => {
      const rawId = btn.dataset.id; const found = rows.find((x) => String(x.id) === String(rawId)); selected = found ? found.id : rawId;
      renderList();
      renderDetail(rows.find((x) => String(x.id) === String(selected)));
      if (matchMedia("(max-width:900px)").matches) els.detail.scrollIntoView({behavior:"smooth",block:"start"});
    }));
    if ((!selected || !items.some((x) => String(x.id) === String(selected))) && items[0]) {
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
      ${renderImages(r.image_assets)}
      ${renderDecisionFlow(r.decision_flow)}
      ${listSection("Tratamento", r.treatment, "treatment")}
      ${renderIntegratedRecipes(r, recipesBank, norm, esc)}
      ${getProtocolCalculators(r)}
      ${getDischargeInstructions(r)}
      ${drugs.length ? `<section class="protocol-section"><h3>Medicamentos relacionados</h3><div class="protocol-drugs">${drugs.map((d) => `<button type="button" data-drug="${esc(d)}">${esc(d)} <span>↗</span></button>`).join("")}</div></section>` : ""}
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
    
    // Listener do CHA2DS2-VASc
    const chadsBoxes = els.detail.querySelectorAll('.chads-item');
    if (chadsBoxes.length) {
      const updateChads = () => {
        let pts = 0;
        chadsBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#chads-score-display');
        const rec = els.detail.querySelector('#chads-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts + ' ponto' + (pts === 1 ? '' : 's');
        if (rec) {
          if (pts === 0) rec.textContent = 'Escore 0: Baixo risco. Anticoagulação oral não recomendada.';
          else if (pts === 1) rec.textContent = 'Escore 1: Risco intermediário. Considerar anticoagulação oral individualizada (preferir DOAC).';
          else rec.textContent = 'Escore ≥ 2: Alto risco de AVC embólico. Anticoagulação oral formalmente recomendada (DOAC de preferência ou Varfarina com INR 2-3).';
        }
      };
      chadsBoxes.forEach(b => b.addEventListener('change', updateChads));
    }

    // Listener do CURB-65
    const curbBoxes = els.detail.querySelectorAll('.curb-item');
    if (curbBoxes.length) {
      const updateCurb = () => {
        let pts = 0;
        curbBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#curb-score-display');
        const rec = els.detail.querySelector('#curb-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts + ' ponto' + (pts === 1 ? '' : 's');
        if (rec) {
          if (pts <= 1) rec.textContent = 'CURB 0-1: Baixo risco. Manejo ambulatorial seguro (Amoxicilina ou Macrolídeo).';
          else if (pts === 2) rec.textContent = 'CURB 2: Risco moderado. Considerar internação em enfermaria ou observação estrita.';
          else rec.textContent = 'CURB ≥ 3: Pneumonia grave. Internação hospitalar obrigatória; avaliar critérios para UTI imediata se CURB 4-5.';
        }
      };
      curbBoxes.forEach(b => b.addEventListener('change', updateCurb));
    }

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

    // Copiar orientações de alta
    els.detail.querySelector('#copy-discharge-btn')?.addEventListener('click', (e) => {
      const txt = els.detail.querySelector('#protocol-discharge-text')?.innerText || '';
      navigator.clipboard?.writeText(txt).then(() => {
        const btn = e.currentTarget;
        const old = btn.textContent;
        btn.textContent = 'Orientações copiadas! ✓';
        setTimeout(() => { btn.textContent = old; }, 1500);
      });
    });

    
    // Listener de cópia da receita integrada
    els.detail.querySelectorAll('.integrated-recipe-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.recipeIndex);
        const slugs = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
        const matched = recipesBank.filter(rb => slugs.includes(rb.slug) || norm(rb.title).includes(norm(r.title)) || norm(r.title).includes(norm(rb.title)));
        const targetRec = matched[idx];
        if (!targetRec) return;

        // Monta o texto limpo da receita
        const data = targetRec.data || {};
        const routes = Array.isArray(data.routes) ? data.routes : [];
        const lines = [targetRec.title.toUpperCase(), ""];
        routes.forEach(rt => {
          lines.push(String(rt.route || "USO").toUpperCase() + ":");
          (rt.items || []).forEach((it, i) => {
            const prefix = rt.mode === "alternatives" ? (i + 1) + "ª OPÇÃO) " : (i + 1) + ") ";
            lines.push(prefix + (it.drug || "Medicamento") + (it.quantity ? " — " + it.quantity : ""));
            if (it.directions) lines.push("   " + it.directions);
          });
          lines.push("");
        });
        if (Array.isArray(data.orientations) && data.orientations.length) {
          lines.push("ORIENTAÇÕES:");
          data.orientations.forEach(o => lines.push("- " + o));
        }

        const fullTxt = lines.join("\n").trim();
        navigator.clipboard?.writeText(fullTxt).then(() => {
          const oldTxt = btn.textContent;
          btn.textContent = "Prescrição Copiada! ✓";
          setTimeout(() => { btn.textContent = oldTxt; }, 1500);
        });
      });
    });
els.detail.querySelectorAll("[data-drug]").forEach((b) => b.addEventListener("click", () => bridge?.openDrug(b.dataset.drug)));
    els.detail.querySelector("[data-open-recipe]")?.addEventListener("click", () => bridge?.openRecipe(recipes[0]));
    els.detail.querySelector("[data-send-note]")?.addEventListener("click", () => bridge?.toQuickChart({
      type:"protocol", slug:r.slug, title:r.title, text:protocolText(r), source:"Protocolos LURIA"
    }));
  }

  async function load() {
    const localSeeds = Array.isArray(window.LURIA_PROTOCOL_SEEDS) ? window.LURIA_PROTOCOL_SEEDS : [];
    const localRecipes = Array.isArray(window.LURIA_RECIPE_SEEDS) ? window.LURIA_RECIPE_SEEDS : [];
    if (!sb && !localSeeds.length) { els.list.innerHTML = '<div class="protocol-placeholder">Não foi possível conectar.</div>'; return; }
    let data = [], error = null, rBank = [];
    if (sb) {
      try {
        const [pRes, rRes] = await Promise.all([
          sb.from("clinical_protocols").select("*").order("title"),
          sb.from("recipe_bank").select("*")
        ]);
        data = pRes?.data || [];
        error = pRes?.error || null;
        rBank = rRes?.data || [];
      } catch (err) {
        error = err;
      }
    }
    const existingRecSlugs = new Set((rBank || []).map((r) => r.slug).filter(Boolean));
    recipesBank = [...(rBank || []), ...localRecipes.filter((s) => !existingRecSlugs.has(s.slug))];
    if (error && !localSeeds.length) { console.error(error); els.list.innerHTML = '<div class="protocol-placeholder">Não foi possível carregar os protocolos.</div>'; return; }
    const dbRows = data || [];
    const existingSlugs = new Set(dbRows.map((r) => r.slug).filter(Boolean));
    rows = [...dbRows, ...localSeeds.filter((s) => !existingSlugs.has(s.slug))];
    if (localSeeds.length) rows.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "pt-BR"));
    const cats = [...new Set(rows.map((r) => r.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
    els.category.innerHTML = '<option value="">Todas as áreas</option>' + cats.map((c)=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
    const params = new URLSearchParams(location.search);
    const wanted = params.get("protocol");
    const q = params.get("q");
    if (q) els.search.value = q;
    selected = rows.find((r) => r.slug === wanted)?.id || rows.find((r)=>norm(r.title).includes(norm(q||"")))?.id || rows[0]?.id || null;
    renderList();
    if (selected) renderDetail(rows.find((r)=>String(r.id)===String(selected)));
  }

  [els.search,els.category].forEach((el)=>{el?.addEventListener("input",renderList);el?.addEventListener("change",renderList);});
  load();
})();
