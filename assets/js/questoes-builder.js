/* Criador de listas do banco oficial TRAUBE.
   Os filtros usam apenas questões autorizadas pelo catálogo RPC; lotes não publicados
   continuam indisponíveis. Nunca consulta question_bank diretamente no navegador. */
(() => {
  "use strict";
  const sb = window.supabaseClient;
  const byId = id => document.getElementById(id);
  const areaEl = byId("qs-builder-area");
  if (!sb || !areaEl || window.__luriaQuestionBuilderReady) return;
  window.__luriaQuestionBuilderReady = true;

  const subjectEl = byId("qs-builder-materia");
  const themeEl = byId("qs-builder-tema");
  const subthemeEl = byId("qs-builder-subtema");
  const difficultyEl = byId("qs-builder-difficulty");
  const countEl = byId("qs-builder-count");
  const titleEl = byId("qs-builder-title");
  const createBtn = byId("qs-builder-generate");
  const statusEl = byId("qs-builder-status");
  const nf = new Intl.NumberFormat("pt-BR");
  const state = { items: [], userId: null, ownerEpoch: null, maximum: 100, busy: false, hasDifficulty: false };

  const normalize = text => String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const rules = {
    "Clínica Médica": [
      ["Cardiologia", /cardio|coronar|miocard|infarto|angina|arrit|fibrilac|hipertens|insuficiencia cardi|valvul|endocardit|pericardit|choque cardiogen|dislipid/],
      ["Pneumologia", /pneumo|pulmon|asma|dpoc|bronqu|derrame pleur|tromboembolismo pulmon|embolia pulmon|sarcoidos/],
      ["Endocrinologia", /endocrin|diabet|tire|adrenal|hipofis|obesidade|dislipid|cetoacidose|hipoglicem/],
      ["Gastroenterologia e Hepatologia", /gastro|hepat|cirros|esofag|gastrit|pancreat|hemorragia digest|doenca inflamatoria intestinal|diarreia|constipac|colite/],
      ["Nefrologia", /nefro|renal|glomerul|insuficiencia renal|lesao renal|disturbio hidroeletr|acidobas|hiponatrem|hipernatrem|hipocalem|hipercalem/],
      ["Neurologia", /neuro|vascular cerebral|avc|convuls|epileps|cefaleia|meningit|demencia|parkinson|miasten|esclerose multipla/],
      ["Infectologia", /infect|sepse|hiv|aids|tubercul|dengue|arbovir|leptospirose|hepatite viral|antibiot|endocardite infecciosa|malaria|sifilis/],
      ["Hematologia", /hemato|anemia|leucem|linfom|coagul|trombocit|hemoglobinop|plaqueta|hemofil/],
      ["Reumatologia", /reumat|lupus|artrite|vasculit|escleroderm|gota/],
      ["Dermatologia", /dermato|pele|lesao cutanea|psoriase|melanoma/],
      ["Psiquiatria", /psiquiatr|depress|ansiedade|transtorno bipolar|suicid|psicose/],
      ["Medicina de Urgência", /emergenc|urgenc|toxicolog|intoxic|parada cardiorrespir|reanima|choque|queimadura/],
      ["Geriatria", /geriatr|idoso|fragilid|polifarmac/]
    ],
    "Cirurgia Geral": [
      ["Trauma e Emergências", /trauma|traumat|tce|cranioencefal|queimadur|choque hemorr|atls|lesao esplen|hemotorax|pneumotorax/],
      ["Cirurgia do Aparelho Digestivo", /abdome|apendic|colecist|colangit|biliar|pancreat|intestin|obstruc|periton|herni|esofag|gastr|diverticul|colon|colorretal|coloprocto|proctolog|fistula anal|hemorroid|digestiv|ulcera peptica|bariatr/],
      ["Mastologia", /masto|mama|cancer de mama/],
      ["Urgências Cirúrgicas", /urgencias? cirurg|emergencias? cirurg/],
      ["Cirurgia Vascular", /vascular|isquemia de membro|isquemia mesenter|arterial perifer|aneurisma|trombose venosa|variz/],
      ["Urologia", /urolog|prostat|lit[ií]ase renal|ureter|testicul|bexiga/],
      ["Ortopedia", /ortoped|fratura|luxac|osteoarticul|musculoesquelet/],
      ["Cirurgia Torácica", /cirurgia toracica|toracoscop|mediastin/],
      ["Cirurgia de Cabeça e Pescoço", /cabeca e pescoc|tireoide cirurg|parotid|cervical cirurg/],
      ["Perioperatório", /perioperator|pos.operator|pre.operator|anestes|complicac.*cirurg|infeccao de sitio cirurg|seguranca cirurg|infeccoes cirurg/],
      ["Oncologia Cirúrgica", /oncolog|neoplas|tumor cirurg|cancer cirurg/]
    ],
    "Ginecologia e Obstetrícia": [
      ["Obstetrícia", /obstetr|gesta|gravide|prenatal|pre.natal|puerper|parto|placenta|eclamp|hipertens.*gest|diabet.*gest|isoimuniz|aloimuniz|apresentacao pelvica|cesarea|amnio|fetal|prematur|hemorragia pos.parto|hemorragia anteparto|rotura de membran|abortament|ectopica/],
      ["Ginecologia", /ginecol|endometri|ovario|uterin|colo do utero|menstru|sangramento uterino|vulvo|vagin|climater|menopaus|endometrial|cervical|infertilidade|contracep|planejamento reprodutivo|mama|mastolog|doenca inflamatoria pelvica|sop/]
    ],
    "Pediatria": [
      ["Neonatologia", /neonat|recem.nascid|prematur|ictericia neonatal|hiperbilirrubinemia neonatal|adaptacao neonatal/],
      ["Nutrologia Pediátrica", /nutrolog|nutric|alimentac|desnutr|obesid/],
      ["Puericultura e Desenvolvimento", /puericultur|crescimento|desenvolvimento|aleitamento|nutric|alimentac|adolesc|vacina|imuniz/],
      ["Infectologia Pediátrica", /infect|sepse|meningit|febre|dengue|tubercul|exantem|antibiot|pneumonia/],
      ["Pneumologia Pediátrica", /pneumo|asma|bronquio|respirator|sibilan|laringit|crupe/],
      ["Gastroenterologia Pediátrica", /gastro|diarreia|desidrata|reidrata|invaginac|constipac|abdome agudo|vomit|refluxo|estenose hipertrofica do piloro/],
      ["Nefrologia Pediátrica", /nefro|renal|glomerul|sindrome nefrot|urinari/],
      ["Ortopedia Pediátrica", /ortoped|fratura|luxac|quadril/],
      ["Otorrinolaringologia Pediátrica", /otite|otorrino|rinite|sinusite|surdez|faringit|amigdal/],
      ["Reumatologia Pediátrica", /reumat|vasculit/],
      ["Neurologia Pediátrica", /neuro|convuls|epilep|cefaleia/],
      ["Endocrinologia Pediátrica", /endocrin|diabet|puberdade|tireoide/],
      ["Cardiologia Pediátrica", /cardio|kawasaki|sopro|cardiopat/],
      ["Hematologia Pediátrica", /hemato|anemia|purpura|leucem|falciform|talassem/],
      ["Emergências Pediátricas", /urgenc|emergenc|choque|parada cardiorrespir|reanima/]
    ],
    "Medicina Preventiva": [
      ["Epidemiologia e Bioestatística", /epidemiol|bioestat|incidencia|prevalencia|risco relativo|odds ratio|estudo de coorte|caso.controle|ensaios? clinicos?|testes? diagnosticos?|medidas? de (efeito|associac|frequencia)|investigacao de surtos|desenhos? de estudo|\bmbe\b|medicina baseada em evidencia|metanalise|meta.analise/],
      ["Saúde Pública e SUS", /sistema unico de saude|sus|saude coletiv|politic|gestao em saude|financiamento|vigilancia|notificac|saude ambiental|saneamento|saude do trabalhador/],
      ["Atenção Primária e MFC", /atencao primaria|aps|familia e comunidade|medicina de familia|territorializ|estrategia saude da familia|esf|cuidado longitudinal|rastreamento|deteccao precoce|prevencao|promocao da saude/],
      ["Condições Clínicas na APS", /hipertens|infectolog|\bhiv\b|tubercul|sobrepeso|obesid|tabagism|doenca renal|dor lombar|diabet|asma|dpoc|sifilis|\bist\b/],
      ["Segurança e Qualidade Assistencial", /seguranca do paciente|qualidade assistencial|evento adverso/],
      ["Imunizações", /imuniz|vacin|calendario vacinal/],
      ["Ética e Bioética", /etica|bioetica|sigilo|consentimento|legislacao medica|codigo de etica/],
      ["Saúde Mental", /saude mental|psiquiatr|depress|suicid|transtorno|alcool|drogas/]
    ],
    "Saúde Mental": [["Psiquiatria e Saúde Mental", /./]]
  };
  function areaFor(value) {
    const key = normalize(value);
    if (/preventiva|saude coletiva|saude publica|familia e comunidade/.test(key)) return "Medicina Preventiva";
    if (key === "saude mental") return "Saúde Mental";
    if (/ginecolog|obstetr/.test(key)) return "Ginecologia e Obstetrícia";
    if (key.includes("cirurgia")) return "Cirurgia Geral";
    if (key.includes("pediatri")) return "Pediatria";
    if (key.includes("clinica medica")) return "Clínica Médica";
    return String(value || "Outras áreas");
  }
  function subjectFor(item) {
    const theme = normalize(item.tema || item.materia);
    const sub = normalize(item.subtema);
    const list = rules[item.normalizedArea] || [];
    const root = theme === "ginecologia" || theme === "obstetricia" ? theme : "";
    if (root) return root === "obstetricia" ? "Obstetrícia" : "Ginecologia";
    for (const [name, regex] of list) if (regex.test(theme)) return name;
    // Tema genérico: procurar a subespecialidade no subtema, sem sobrescrever rótulos claros.
    if (/^(clinica medica|cirurgia geral|pediatria|geral|outros|miscelanea)$/.test(theme)) {
      for (const [name, regex] of list) if (regex.test(sub)) return name;
    }
    return "Outros temas da área";
  }
  function currentUserId() { return window.docmapUser?.id || state.userId; }
  function contextValid() {
    const owner = window.TraubeLocalOwnerStore;
    return !!state.userId && currentUserId() === state.userId &&
      (!owner || (owner.ownerId === state.userId && owner.epoch === state.ownerEpoch));
  }
  function inform(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "qs-status" + (type ? " " + type : "");
  }
  function option(select, value, label) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    select.appendChild(o);
  }
  function optionsFor(select, values, firstLabel) {
    if (!select) return;
    const selected = select.value || "all";
    select.replaceChildren();
    option(select, "all", firstLabel);
    values.forEach(({name, count}) => option(select, name, name + " (" + nf.format(count) + ")"));
    select.value = values.some(row => row.name === selected) ? selected : "all";
  }
  function aggregate(rows, accessor) {
    const map = new Map();
    rows.forEach(item => {
      const key = accessor(item);
      if (key) map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map, ([name, count]) => ({name, count})).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }
  function applyFilters(level) {
    let rows = state.items;
    const area = areaEl.value;
    if (level >= 1 && area !== "all") rows = rows.filter(x => x.normalizedArea === area);
    if (level >= 2 && subjectEl?.value !== "all") rows = rows.filter(x => x.subject === subjectEl.value);
    if (level >= 3 && themeEl.value !== "all") rows = rows.filter(x => x.tema === themeEl.value);
    if (level >= 4 && subthemeEl?.value !== "all") rows = rows.filter(x => x.subtema === subthemeEl.value);
    if (level >= 5 && difficultyEl.value !== "all") rows = rows.filter(x => normalize(x.dificuldade) === normalize(difficultyEl.value));
    return rows;
  }
  function refresh() {
    optionsFor(areaEl, aggregate(state.items, x => x.normalizedArea), "Todas as grandes áreas");
    optionsFor(subjectEl, aggregate(applyFilters(1), x => x.subject), "Todas as matérias");
    optionsFor(themeEl, aggregate(applyFilters(2), x => x.tema), "Todos os temas");
    optionsFor(subthemeEl, aggregate(applyFilters(3), x => x.subtema), "Todos os subtemas");
    const available = applyFilters(5).length;
    countEl.max = String(state.maximum);
    const limit = byId("qs-builder-max-label");
    if (limit) limit.textContent = String(state.maximum);
    const tag = byId("qs-builder-count-limit-tag");
    if (tag) tag.textContent = "Máx " + state.maximum;
    createBtn.textContent = "Gerar lista e começar →";
    createBtn.disabled = state.busy || !contextValid() || available === 0;
  }
  function resetBelow(level) {
    if (level <= 1 && subjectEl) subjectEl.value = "all";
    if (level <= 2) themeEl.value = "all";
    if (level <= 3 && subthemeEl) subthemeEl.value = "all";
    refresh();
  }
  function distinctRandomSample(items, count) {
    const indices = Array.from({length: items.length}, (_, i) => i);
    for (let i = 0; i < count; i++) {
      const j = i + Math.floor(Math.random() * (indices.length - i));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count).map(index => items[index]);
  }
  function displayTitle() {
    const selected = [subthemeEl?.value, themeEl.value, subjectEl?.value, areaEl.value].find(v => v && v !== "all");
    return selected ? "Treino focado: " + selected : "Treino geral TRAUBE";
  }
  async function load() {
    try {
      await window.TraubeLocalOwnerStore?.ready;
      const response = await sb.auth.getUser();
      const user = response.data?.user;
      if (!user) throw new Error("Faça login para criar sua lista.");
      state.userId = user.id;
      state.ownerEpoch = window.TraubeLocalOwnerStore?.epoch ?? null;
      inform("Carregando a distribuição real de questões...");
      let {data, error} = await sb.rpc("user_question_bank_list_catalog_v2");
      if (error) {
        const fallback = await sb.rpc("user_question_bank_list_catalog");
        if (fallback.error) throw fallback.error;
        data = fallback.data;
      }
      if (!contextValid()) return;
      if (!data || !Array.isArray(data.items)) throw new Error("O catálogo não retornou uma lista válida.");
      state.maximum = Math.max(1, Math.min(100, Number(data.max_questions) || 100));
      state.hasDifficulty = data.items.some(item => !!item.dificuldade);
      state.items = data.items.filter(item => item.question_id && item.enunciado && /^[A-D]$/.test(String(item.gabarito || ""))).map(item => {
        const result = {...item, normalizedArea: areaFor(item.area)};
        result.tema = item.tema || item.materia || "Tema não informado";
        result.subtema = item.subtema || "Subtema não informado";
        result.subject = subjectFor(result);
        return result;
      });
      if (difficultyEl) {
        difficultyEl.disabled = !state.hasDifficulty;
        difficultyEl.title = state.hasDifficulty ? "" : "Filtro disponível após atualização do catálogo.";
        if (!state.hasDifficulty) difficultyEl.value = "all";
      }
      document.querySelectorAll(".qs-builder-preset").forEach(button => { button.hidden = Number(button.dataset.count) > state.maximum; });
      countEl.value = String(Math.min(20, state.maximum));
      refresh();
      inform("Selecione uma matéria, um tema ou um subtema para estudar.");
    } catch (error) {
      console.error("Falha ao carregar o catálogo de questões", error);
      inform("Não foi possível carregar as questões: " + (error.message || "tente atualizar a página."), "error");
      createBtn.disabled = true;
    }
  }
  async function generate() {
    if (state.busy || !contextValid()) return;
    const pool = applyFilters(5);
    const total = Number(countEl.value);
    if (!Number.isInteger(total) || total < 1 || total > state.maximum) {
      inform("Escolha entre 1 e " + state.maximum + " questões.", "error"); return;
    }
    if (total > pool.length) {
      inform("Há somente " + nf.format(pool.length) + " questões para esses filtros. Reduza a quantidade ou amplie o tema.", "error"); return;
    }
    const selected = distinctRandomSample(pool, total);
    const userId = state.userId;
    const title = (titleEl.value.trim() || displayTitle()).slice(0, 160);
    state.busy = true; createBtn.disabled = true;
    let setId = null;
    try {
      inform("Montando lista com " + total + " questões...");
      const {data: created, error: setError} = await sb.from("question_sets").insert({
        user_id: userId, title, status: "processing", total_questions: total, source_file_name: null
      }).select("id").single();
      if (setError) throw setError;
      setId = created.id;
      if (!contextValid()) throw new Error("A conta ativa mudou. A operação foi cancelada.");
      const rows = selected.map((q, index) => ({
        user_id: userId, set_id: setId, question_number: index + 1, order_index: index + 1,
        question_bank_id: q.question_id, source_label: q.source_label || "Banco TRAUBE",
        stem: q.enunciado,
        raw_text: q.enunciado,
        alternatives: { A: q.alternativa_a, B: q.alternativa_b, C: q.alternativa_c, D: q.alternativa_d },
        official_answer: q.gabarito,
        answer_explanations: { A: q.explicacao_a, B: q.explicacao_b, C: q.explicacao_c, D: q.explicacao_d },
        pulo_do_gato: q.mensagem_chave || null,
        area: q.normalizedArea, materia: q.subject, topic: q.tema, subtopic: q.subtema,
        difficulty: q.dificuldade || null
      }));
      for (let start = 0; start < rows.length; start += 50) {
        if (!contextValid()) throw new Error("A conta ativa mudou. A operação foi cancelada.");
        const {error} = await sb.from("question_items").insert(rows.slice(start, start + 50));
        if (error) throw error;
      }
      const {error: finishError} = await sb.from("question_sets").update({status:"ready"}).eq("id",setId).eq("user_id",userId);
      if (finishError) throw finishError;
      if (!contextValid()) return;
      inform("Lista criada com sucesso! Abrindo a resolução...", "success");
      window.location.assign("/resolver-questoes/?set_id=" + encodeURIComponent(setId));
    } catch (error) {
      console.error("Falha ao criar lista de questões", error);
      if (setId) {
        try { await sb.from("question_sets").delete().eq("id", setId).eq("user_id", userId); }
        catch (cleanupError) { console.warn("Falha ao limpar a lista incompleta", cleanupError); }
      }
      if (contextValid()) inform("Erro ao gerar lista: " + (error.message || "tente novamente."), "error");
    } finally { state.busy = false; if (contextValid()) refresh(); }
  }
  areaEl.addEventListener("change", () => resetBelow(1));
  subjectEl?.addEventListener("change", () => resetBelow(2));
  themeEl.addEventListener("change", () => resetBelow(3));
  subthemeEl?.addEventListener("change", refresh);
  difficultyEl.addEventListener("change", refresh);
  countEl.addEventListener("input", refresh);
  document.querySelectorAll(".qs-builder-preset").forEach(button =>
    button.addEventListener("click", () => { countEl.value = String(Math.min(state.maximum, Number(button.dataset.count) || 20)); refresh(); })
  );
  createBtn.addEventListener("click", generate);
  window.addEventListener("luria:owner-changed", () => {
    state.items = []; state.userId = null; createBtn.disabled = true;
    inform("Conta alterada. Atualize a página para carregar suas questões.", "error");
  });
  createBtn.disabled = true;
  load();
})();
