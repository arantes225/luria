/* TRAUBE · Biblioteca de modelos rápidos: não sintetiza nem valida novas prescrições. */
(() => {
  "use strict";
  const client = window.supabaseClient;
  const els = {
    tabs: document.getElementById("model-tabs"),
    search: document.getElementById("model-search"),
    category: document.getElementById("model-category"),
    count: document.getElementById("model-count"),
    list: document.getElementById("model-list"),
    detail: document.getElementById("model-detail")
  };
  if (!els.list || !els.detail) return;

  const ANAMNESE = [
    {
      id: "geral", title: "Anamnese geral", category: "Consulta",
      text: [
        "IDENTIFICAÇÃO: [nome, idade, data]",
        "QUEIXA PRINCIPAL: [preencher]",
        "HISTÓRIA DA DOENÇA ATUAL: [início, duração, evolução, sintomas associados, fatores de melhora/piora]",
        "REVISÃO DE SISTEMAS: [preencher conforme relato]",
        "ANTECEDENTES: [doenças, cirurgias, internações, histórico familiar]",
        "MEDICAMENTOS EM USO: [nome, dose e frequência]",
        "ALERGIAS: [registrar conforme informado]",
        "HÁBITOS DE VIDA: [preencher]",
        "SINAIS VITAIS: [PA, FC, FR, temperatura, SpO₂, demais aferições]",
        "EXAME FÍSICO: [achados efetivamente examinados]",
        "HIPÓTESES / AVALIAÇÃO: [preencher]",
        "PLANO / CONDUTA: [preencher]"
      ].join("\n\n")
    },
    {
      id: "soap", title: "Evolução — SOAP", category: "Evolução",
      text: [
        "DATA/HORA: [preencher]",
        "S — SUBJETIVO: [sintomas, relato e evolução]",
        "O — OBJETIVO: [sinais vitais, exame físico, exames disponíveis]",
        "A — AVALIAÇÃO: [problemas e hipóteses]",
        "P — PLANO: [condutas, orientações, exames e acompanhamento]"
      ].join("\n\n")
    },
    {
      id: "retorno", title: "Consulta de retorno", category: "Consulta",
      text: [
        "DATA: [preencher]",
        "MOTIVO DO RETORNO: [preencher]",
        "EVOLUÇÃO DESDE A ÚLTIMA CONSULTA: [preencher]",
        "ADESÃO E EFEITOS DO TRATAMENTO: [preencher]",
        "EXAMES TRAZIDOS: [preencher]",
        "SINAIS VITAIS E EXAME FÍSICO: [achados aferidos]",
        "AVALIAÇÃO: [preencher]",
        "CONDUTA E PRÓXIMO RETORNO: [preencher]"
      ].join("\n\n")
    },
    {
      id: "admissao", title: "Admissão hospitalar", category: "Hospitalar",
      text: [
        "DATA/HORA DA ADMISSÃO: [preencher]",
        "IDENTIFICAÇÃO: [preencher]",
        "QUEIXA PRINCIPAL: [preencher]",
        "HISTÓRIA DA DOENÇA ATUAL: [preencher]",
        "ANTECEDENTES / MEDICAMENTOS / ALERGIAS: [preencher]",
        "SINAIS VITAIS: [aferições]",
        "EXAME FÍSICO: [achados observados]",
        "EXAMES DISPONÍVEIS: [preencher]",
        "AVALIAÇÃO E PROBLEMAS ATIVOS: [preencher]",
        "PLANO INICIAL: [preencher]"
      ].join("\n\n")
    }
  ];

  const state = {
    type: "receitas", loaded: { receitas: false, exames: false, anamnese: true },
    loading: { receitas: false, exames: false }, data: { receitas: [], exames: [], anamnese: ANAMNESE },
    errors: {}, selectedId: null, checked: new Set()
  };
  const esc = value => String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
  const norm = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const ambiguous = item => /\bOU\b/i.test(String(item?.drug || ""));
  const recordId = row => String(row.id ?? row.slug ?? "");
  const currentItems = () => state.data[state.type] || [];

  // Paginação explícita para não perder modelos no limite padrão da API.
  async function fetchAll(table, fields) {
    if (!client) throw new Error("Banco de modelos indisponível.");
    const size = 250, maxPages = 20, all = [];
    for (let page = 0; page < maxPages; page++) {
      const { data, error } = await client.from(table).select(fields)
        .eq("status","verified").order("title",{ascending:true}).range(page * size, (page + 1) * size - 1);
      if (error) throw error;
      const rows = Array.isArray(data) ? data : [];
      all.push(...rows);
      if (rows.length < size) return all;
    }
    throw new Error("Catálogo maior que o limite de leitura; refine a consulta na fonte.");
  }
  const examItems = row => {
    const values = [];
    for (const group of (Array.isArray(row.exams) ? row.exams : [])) {
      const items = typeof group === "string" ? [group] : Array.isArray(group?.items) ? group.items : [];
      for (const value of items) {
        const text = String(value || "").trim();
        if (text && !values.includes(text)) values.push(text);
      }
    }
    return values;
  };
  async function loadType(type) {
    if (state.loaded[type] || state.loading[type]) return;
    state.loading[type] = true;
    render();
    try {
      const rows = type === "receitas"
        ? await fetchAll("recipe_bank","id,slug,title,category,setting,summary,status,data,tags")
        : await fetchAll("clinical_protocols","id,slug,title,category,status,exams");
      state.data[type] = type === "receitas"
        ? rows.filter(row => row.status === "verified" && row.data?.copy_ready === true
          && Array.isArray(row.data.routes) && row.data.routes.some(route => Array.isArray(route.items) && route.items.length))
        : rows.filter(row => row.status === "verified" && examItems(row).length);
      state.loaded[type] = true;
      delete state.errors[type];
    } catch (error) {
      state.errors[type] = "Não foi possível carregar os modelos deste catálogo. Verifique o acesso e tente novamente.";
      console.warn("[Traube Modelos]", error);
    } finally {
      state.loading[type] = false;
      if (state.type === type) render();
    }
  }
  function filtered() {
    const q = norm(els.search.value.trim());
    const cat = els.category.value;
    return currentItems().filter(row => (!cat || row.category === cat) && (!q ||
      norm([row.title,row.category,row.setting,row.summary,
        ...(Array.isArray(row.tags) ? row.tags : []),
        ...(state.type === "exames" ? examItems(row) : [])].join(" ")).includes(q)));
  }
  function updateCategories() {
    const previous = els.category.value;
    const categories = [...new Set(currentItems().map(row => row.category).filter(Boolean))]
      .sort((a,b) => a.localeCompare(b,"pt-BR"));
    els.category.innerHTML = '<option value="">Todas as áreas</option>' +
      categories.map(value => '<option value="' + esc(value) + '">' + esc(value) + '</option>').join("");
    els.category.value = categories.includes(previous) ? previous : "";
  }
  function render() {
    for (const btn of els.tabs.querySelectorAll("[data-type]")) {
      btn.setAttribute("aria-selected",String(btn.dataset.type === state.type));
    }
    updateCategories();
    if (state.loading[state.type]) {
      els.count.textContent = "Carregando…";
      els.list.innerHTML = '<p class="model-message">Consultando modelos…</p>';
      els.detail.innerHTML = '<p class="model-message">Carregando catálogo…</p>';
      return;
    }
    if (state.errors[state.type]) {
      els.count.textContent = "Indisponível";
      els.list.innerHTML = '<p class="model-message">' + esc(state.errors[state.type]) +
        ' <button type="button" id="model-retry" class="model-button">Tentar novamente</button></p>';
      els.detail.innerHTML = '<p class="model-message">Sem modelos disponíveis no momento.</p>';
      return;
    }
    const items = filtered();
    els.count.textContent = items.length + (items.length === 1 ? " modelo" : " modelos");
    els.list.innerHTML = items.length ? items.map(row =>
      '<button type="button" data-model-id="' + esc(recordId(row)) + '" class="' +
      (recordId(row) === state.selectedId ? "active" : "") + '">' +
      '<strong>' + esc(row.title) + '</strong><small>' + esc(row.category || "Modelo") + '</small></button>'
    ).join("") : '<p class="model-message">Nenhum modelo encontrado.</p>';
    const selected = items.find(row => recordId(row) === state.selectedId);
    if (!selected && items.length) {
      state.selectedId = recordId(items[0]);
      state.checked.clear();
      els.list.querySelector("button[data-model-id]")?.classList.add("active");
    }
    renderDetail(items.find(row => recordId(row) === state.selectedId) || items[0]);
  }
  function renderDetail(row) {
    if (!row) { els.detail.innerHTML = '<p class="model-message">Selecione um modelo.</p>'; return; }
    const isRecipe = state.type === "receitas", isExam = state.type === "exames";
    const blocks = isRecipe ? (row.data?.routes || []) : [];
    const exams = isExam ? examItems(row) : [];
    const origin = isExam && row.slug
      ? '<a class="model-link" href="/trabalho/protocolos/?protocol=' + encodeURIComponent(row.slug) + '">Protocolo completo</a>'
      : isRecipe ? '<a class="model-link" href="/trabalho/protocolos/">Ver protocolos</a>' : "";
    const header = '<div class="model-detail-head"><div><h2>' + esc(row.title) +
      '</h2><small>' + esc(row.category || "Modelo") + '</small></div><div class="model-actions">' +
      '<button id="model-copy" class="model-button" type="button"' +
      ((isRecipe || isExam) && !state.checked.size ? " disabled" : "") + '>Copiar modelo</button>' +
      origin + '</div></div>';
    let content = "";
    if (isRecipe) {
      content = '<p class="model-hint">Selecione somente os medicamentos aplicáveis. Em opções alternativas, escolha uma.</p>' +
        blocks.map((route, ri) => '<section class="model-block"><h3>' + esc(route.route || "Uso") + '</h3>' +
          (Array.isArray(route.items) ? route.items : []).map((item, ii) => {
            const key = ri + ":" + ii, blocked = ambiguous(item);
            const alternative = route.mode === "alternatives";
            return '<label class="model-choice' + (blocked ? ' disabled' : '') + '">' +
              '<input type="' + (alternative ? "radio" : "checkbox") +
              '" name="model-route-' + ri + '" data-choice="' + key + '" ' +
              (state.checked.has(key) ? "checked " : "") + (blocked ? "disabled " : "") + '/>' +
              '<span><strong>' + esc(item.drug || "Medicamento") + '</strong>' +
              (item.quantity ? '<small>' + esc(item.quantity) + '</small>' : '') +
              (item.directions ? '<small>' + esc(item.directions) + '</small>' : '') +
              (blocked ? '<small>Este item contém alternativas não resolvidas: consulte o protocolo antes de usar.</small>' : '') +
              '</span></label>';
          }).join("") + '</section>').join("");
      const data = row.data || {};
      if (Array.isArray(data.orientations) && data.orientations.length)
        content += '<section class="model-block"><h3>Orientações</h3>' +
          data.orientations.map(t => '<p>' + esc(t) + '</p>').join("") + '</section>';
      if (Array.isArray(data.warnings) && data.warnings.length)
        content += '<section class="model-block"><h3>Sinais de atenção</h3>' +
          data.warnings.map(t => '<p>' + esc(t) + '</p>').join("") + '</section>';
    } else if (isExam) {
      content = '<p class="model-hint">Marque apenas os exames que deseja incluir na solicitação.</p>' +
        '<section class="model-block"><h3>Solicitação de exames</h3>' +
        exams.map((value,i) => '<label class="model-choice"><input type="checkbox" data-choice="' + i + '"' +
          (state.checked.has(String(i)) ? " checked" : "") + '><span>' + esc(value) + '</span></label>').join("") +
        '</section>';
    } else {
      content = '<div class="model-preview">' + esc(row.text) + '</div>';
    }
    els.detail.innerHTML = header + content + '<p id="model-copy-feedback" class="model-hint" role="status"></p>';
  }
  function copyText(row) {
    if (state.type === "anamnese") return row.text;
    if (!state.checked.size) return "";
    if (state.type === "exames") return "EXAMES SOLICITADOS:\n" + examItems(row)
      .filter((_,i) => state.checked.has(String(i))).map(value => "• " + value).join("\n");
    const lines = ["PRESCRIÇÃO", ""];
    (row.data?.routes || []).forEach((route,ri) => {
      const selected = (route.items || []).filter((item,ii) => state.checked.has(ri + ":" + ii) && !ambiguous(item));
      if (!selected.length) return;
      lines.push(String(route.route || "USO").toUpperCase() + ":");
      selected.forEach((item,i) => {
        lines.push((i + 1) + ") " + String(item.drug || "") + (item.quantity ? " — " + item.quantity : ""));
        if (item.directions) lines.push("   " + item.directions);
      });
      lines.push("");
    });
    for (const [title, array] of [["ORIENTAÇÕES", row.data?.orientations],["SINAIS DE ATENÇÃO", row.data?.warnings]]) {
      if (Array.isArray(array) && array.length) {
        lines.push(title + ":");
        array.forEach(t => lines.push("- " + t));
        lines.push("");
      }
    }
    return lines.join("\n").trim();
  }
  async function copy(text) {
    if (!text) return false;
    try { if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponível");
      await navigator.clipboard.writeText(text); return true;
    } catch (_) {
      const area = document.createElement("textarea");
      area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select();
      const success = document.execCommand("copy"); area.remove();
      return success;
    }
  }

  els.tabs.addEventListener("click", event => {
    const tab = event.target.closest("[data-type]");
    if (!tab || !["receitas","exames","anamnese"].includes(tab.dataset.type)) return;
    state.type = tab.dataset.type;
    els.search.value = "";
    els.category.value = "";
    state.selectedId = null; state.checked.clear();
    history.replaceState(null,"",location.pathname + "?tipo=" + state.type);
    render(); loadType(state.type);
  });
  els.search.addEventListener("input", () => { state.selectedId = null; state.checked.clear(); render(); });
  els.category.addEventListener("change", () => { state.selectedId = null; state.checked.clear(); render(); });
  els.list.addEventListener("click", event => {
    if (event.target.closest("#model-retry")) { delete state.errors[state.type]; loadType(state.type); return; }
    const item = event.target.closest("[data-model-id]");
    if (!item) return;
    state.selectedId = item.dataset.modelId;
    state.checked.clear(); render();
    if (matchMedia("(max-width:880px)").matches) els.detail.scrollIntoView({behavior:"smooth",block:"start"});
  });
  els.detail.addEventListener("change", event => {
    const field = event.target.closest("[data-choice]");
    if (!field) return;
    const key = field.dataset.choice;
    if (field.type === "radio") {
      const prefix = key.split(":")[0] + ":";
      for (const value of [...state.checked]) if (value.startsWith(prefix)) state.checked.delete(value);
    }
    if (field.checked) state.checked.add(key); else state.checked.delete(key);
    renderDetail(currentItems().find(row => recordId(row) === state.selectedId));
  });
  els.detail.addEventListener("click", async event => {
    if (!event.target.closest("#model-copy")) return;
    const row = currentItems().find(item => recordId(item) === state.selectedId);
    if (!row) return;
    const success = await copy(copyText(row));
    const feedback = document.getElementById("model-copy-feedback");
    if (feedback) feedback.textContent = success ? "Modelo copiado." : "Não foi possível copiar. Verifique a permissão da área de transferência.";
  });
  const initialType = new URLSearchParams(location.search).get("tipo");
  if (["receitas","exames","anamnese"].includes(initialType)) state.type = initialType;
  render();
  loadType(state.type);
})();
