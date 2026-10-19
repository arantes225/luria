(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const ADMIN_PIN_GRACE_MS = 30 * 60 * 1000;
  const ADMIN_PIN_GRACE_KEY = "luria-admin-pin-unlocked-until";

  const state = {
    user: null,
    isAdmin: false,
    pinConfigured: false,
    pinUnlocked: false,
    currentView: "weekly", // "weekly" | "monthly" | "kanban" | "stories" | "crm" | "meta_ads"
    selectedMonth: "2026-11",
    leadsList: []
  };

  const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link";

  // ==============================================================
  // OS 27 POSTS OFICIAIS DO DOSSIÊ (PÁGINAS 10 A 15)
  // ==============================================================
  const OFFICIAL_POSTS = [
    // OUTUBRO (Abertura de Autoridade e Pré-lista)
    { id: "p01", date: "20/10 Ter", month: "2026-10", format: "Carrossel", pilar: "Educação", title: "Por que você esquece o que estudou?", cta: "Salvamento", status: "publicado", kanban: "publicado", script: "Curva do esquecimento de Ebbinghaus aplicada à medicina e a necessidade de repetição ativa." },
    { id: "p02", date: "22/10 Qui", month: "2026-10", format: "Reel", pilar: "Educação", title: "Você está no PS: qual sua primeira conduta?", cta: "Compartilhamento", status: "publicado", kanban: "publicado", script: "Caso interativo de emergência: AVC vs Hipoglicemia e a obrigatoriedade do HGT antes da TC." },
    { id: "p03", date: "24/10 Sáb", month: "2026-10", format: "Carrossel", pilar: "Educação", title: "Questão comentada: a pegadinha da semana", cta: "Resposta", status: "aprovado", kanban: "aprovado", script: "Análise minuciosa de distratores de uma questão real de residência médica com raciocínio clínico." },
    { id: "p04", date: "26/10 Seg", month: "2026-10", format: "Reel", pilar: "Oferta", title: "Pré-lista VIP aberta (15 Dias Gratuitos)", cta: "Inscrição", status: "aprovado", kanban: "agendado", script: "Abertura oficial da pré-lista VIP da Black November da LURIA. 15 dias sem cartão." },
    { id: "p05", date: "28/10 Qua", month: "2026-10", format: "Carrossel", pilar: "Educação", title: "Checklist de preparação 2027", cta: "Salvamento", status: "revisao", kanban: "design", script: "Como organizar os pilares do ano de estudos de medicina com metas realistas." },
    { id: "p06", date: "30/10 Sex", month: "2026-10", format: "Reel", pilar: "Produto", title: "Tour: Dashboard → Questões → Flashcards", cta: "Inscrição", status: "revisao", kanban: "design", script: "Gravação real de tela mostrando como um erro em questão vira flashcard no mesmo instante." },
    { id: "p07", date: "31/10 Sáb", month: "2026-10", format: "Carrossel", pilar: "Educação", title: "Cinco erros ao começar a estudar para residência", cta: "Compartilhamento", status: "revisao", kanban: "ciencia", script: "Estudo passivo, ausência de métricas, acúmulo de PDFs piratas e falta de revisão espaçada." },

    // NOVEMBRO (Operação Principal Black November)
    { id: "p08", date: "02/11 Seg", month: "2026-11", format: "Carrossel (7 pág)", pilar: "Educação", title: "Sepse: cinco erros que custam uma questão", cta: "Salve para revisar", status: "revisao", kanban: "ciencia", script: "Reconhecimento de sepse, sinais de alerta, conduta fundamentada e resumo de 30 segundos." },
    { id: "p09", date: "03/11 Ter", month: "2026-11", format: "Reel (25-30s)", pilar: "Educação", title: "Estudar seis horas não garante aprender mais", cta: "Envie a um amigo", status: "pauta", kanban: "roteiro", script: "Releitura passiva versus active recall com flashcards. Citação metodológica de retenção." },
    { id: "p10", date: "05/11 Qui", month: "2026-11", format: "Carrossel (7 pág)", pilar: "Educação", title: "Questão comentada: pré-eclâmpsia", cta: "Responda primeiro", status: "pauta", kanban: "roteiro", script: "Caso clínico de pré-eclâmpsia grave, conduta conforme FEBRASGO/MS e distratores explicados." },
    { id: "p11", date: "07/11 Sáb", month: "2026-11", format: "Reel (30s)", pilar: "Produto", title: "Entrando na Sala de Emergência da LURIA", cta: "Entre na lista", status: "pauta", kanban: "roteiro", script: "Você assumiu o plantão: tomada de decisão no simulador com debriefing imediato." },
    { id: "p12", date: "09/11 Seg", month: "2026-11", format: "Reel (20-25s)", pilar: "Oferta", title: "Primeiras ativações gratuitas: como funciona?", cta: "Receba seu convite", status: "ideia", kanban: "ideia", script: "Liberação progressiva dos primeiros convites da pré-lista VIP por coortes individuais." },
    { id: "p13", date: "10/11 Ter", month: "2026-11", format: "Carrossel (6 pág)", pilar: "Educação", title: "ECG: três sinais que você não deve ignorar", cta: "Salve e compartilhe", status: "ideia", kanban: "ideia", script: "Sequência sistemática diante de um traçado real de eletrocardiograma no pronto-socorro." },
    { id: "p14", date: "12/11 Qui", month: "2026-11", format: "Reel (20-30s)", pilar: "Produto", title: "Errou uma questão? O estudo não termina aqui", cta: "Experimente", status: "ideia", kanban: "ideia", script: "Como transformar a frustração do erro em memorização através do Caderno de Erros LURIA." },
    { id: "p15", date: "14/11 Sáb", month: "2026-11", format: "Carrossel (6 pág)", pilar: "Educação", title: "Como organizar 30 minutos de estudo diário", cta: "Salve a rotina", status: "ideia", kanban: "ideia", script: "5 min de planejamento, 15 min de questões e 10 min de revisão com foco cirúrgico." },
    { id: "p16", date: "16/11 Seg", month: "2026-11", format: "Reel (25-35s)", pilar: "Produto", title: "Sua evolução sem planilhas", cta: "Conheça a LURIA", status: "ideia", kanban: "ideia", script: "Painel analítico da LURIA mostrando pontos fortes e fracos sem planilhas manuais." },
    { id: "p17", date: "17/11 Ter", month: "2026-11", format: "Carrossel (7 pág)", pilar: "Educação", title: "Desidratação pediátrica: raciocínio clínico", cta: "Teste-se", status: "ideia", kanban: "ideia", script: "Avaliação da gravidade do estado de hidratação e reposição conforme protocolo pediátrico." },
    { id: "p18", date: "19/11 Qui", month: "2026-11", format: "Reel (20-30s)", pilar: "Produto", title: "O que será o Modo Trabalho?", cta: "Entre na lista beta", status: "ideia", kanban: "ideia", script: "Conceito do módulo de gestão do trabalho e plantões para médicos em fase beta." },
    { id: "p19", date: "21/11 Sáb", month: "2026-11", format: "Carrossel (6 pág)", pilar: "Educação", title: "Checklist para preparar 2027", cta: "Salve para usar", status: "ideia", kanban: "ideia", script: "Distribuição de matérias por peso nas grandes bancas de residência." },
    { id: "p20", date: "23/11 Seg", month: "2026-11", format: "Motion (15-20s)", pilar: "Oferta", title: "Começou a Black Week LURIA", cta: "Conheça as condições", status: "ideia", kanban: "ideia", script: "Início oficial da Black Week. Condições transparentes liberadas no site oficial." },
    { id: "p21", date: "24/11 Ter", month: "2026-11", format: "Carrossel (6 pág)", pilar: "Oferta", title: "Essential ou Pro: qual é para você?", cta: "Compare planos", status: "ideia", kanban: "ideia", script: "Tabela comparativa direta e honesta entre os planos Essential e Pro." },
    { id: "p22", date: "25/11 Qua", month: "2026-11", format: "Reel (25-30s)", pilar: "Produto", title: "Do caso clínico ao aprendizado completo", cta: "Experimente o fluxo", status: "ideia", kanban: "ideia", script: "Demonstração do ciclo completo: Caso -> Decisão -> Debriefing -> Flashcard." },
    { id: "p23", date: "26/11 Qui", month: "2026-11", format: "Carrossel (8 pág)", pilar: "Oferta", title: "FAQ: 15 dias e Black Week", cta: "Tire suas dúvidas", status: "ideia", kanban: "ideia", script: "Respostas claras sobre cobrança, ativação, período de teste e suporte." },
    { id: "p24", date: "27/11 Sex", month: "2026-11", format: "Reel (30-35s)", pilar: "Oferta", title: "Black Friday: a condição principal", cta: "Assine pela oferta", status: "ideia", kanban: "ideia", script: "Vídeo principal da Black Friday com demonstração e condições exclusivas da data." },
    { id: "p25", date: "28/11 Sáb", month: "2026-11", format: "Reel (20s)", pilar: "Educação", title: "Plantão Relâmpago: você acertaria?", cta: "Responda", status: "ideia", kanban: "ideia", script: "Desafio interativo com caso clínico de rápida tomada de decisão." },
    { id: "p26", date: "29/11 Dom", month: "2026-11", format: "Motion (15s)", pilar: "Oferta", title: "Último dia da Black Week", cta: "Veja o prazo", status: "ideia", kanban: "ideia", script: "Encerramento verdadeiro no horário oficial informado no site." },
    { id: "p27", date: "30/11 Seg", month: "2026-11", format: "Carrossel (7 pág)", pilar: "Produto", title: "Seus primeiros sete dias na LURIA", cta: "Comece a estudar", status: "ideia", kanban: "ideia", script: "Guia passo a passo de onboarding para novos assinantes e membros do teste." }
  ];

  // ==============================================================
  // GRADE DE STORIES (30 DIAS DE NOVEMBRO - DOSSIÊ PÁGINA 17)
  // ==============================================================
  const STORIES_30_DAYS = [
    { day: "01/11", idea: "Qual área foi mais difícil nesta semana?", resource: "Enquete interativa" },
    { day: "02/11", idea: "Quiz sepse: o que chama atenção?", resource: "Quiz de múltipla escolha" },
    { day: "03/11", idea: "Você costuma testar memória sem olhar o gabarito?", resource: "Enquete Sim/Não" },
    { day: "04/11", idea: "Bastidores da revisão científica de questões", resource: "Vídeo curto" },
    { day: "05/11", idea: "Resolva a alternativa clássica de GO", resource: "Quiz de conduta" },
    { day: "06/11", idea: "Teaser da Sala de Emergência em ação", resource: "Vídeo de tela" },
    { day: "07/11", idea: "Escolha sua conduta no simulador clínico", resource: "Enquete de decisão" },
    { day: "08/11", idea: "Como começar a semana com metas claras", resource: "Checklist em carrossel" },
    { day: "09/11", idea: "Perguntas sobre a ativação gratuita de 15 dias", resource: "Caixa de perguntas" },
    { day: "10/11", idea: "ECG no PS: verdadeiro ou falso?", resource: "Quiz rápido" },
    { day: "11/11", idea: "Qual o seu maior erro na hora da revisão?", resource: "Enquete de dores" },
    { day: "12/11", idea: "Tour pelo fluxo do Caderno de Erros", resource: "Gravação de tela" },
    { day: "13/11", idea: "FAQ dos 15 dias gratuitos sem cartão", resource: "Caixa de dúvidas" },
    { day: "14/11", idea: "30 minutos: monte sua rotina diária", resource: "Checklist prático" },
    { day: "15/11", idea: "Sua meta para esta nova semana de estudos", resource: "Enquete interativa" },
    { day: "16/11", idea: "Tour pelas métricas e gráficos do Dashboard", resource: "Vídeo de produto" },
    { day: "17/11", idea: "Caso de desidratação pediátrica no PS", resource: "Quiz de caso" },
    { day: "18/11", idea: "O que você quer aprender no Modo Trabalho?", resource: "Caixa de sugestões" },
    { day: "19/11", idea: "Status real da versão beta do Modo Trabalho", resource: "Bastidores de dev" },
    { day: "20/11", idea: "Preparação para a Black Week oficial LURIA", resource: "Aviso de oferta" },
    { day: "21/11", idea: "Checklist 2027 interativo para salvar", resource: "Sticker de interação" },
    { day: "22/11", idea: "Últimas dúvidas antes da abertura da Black Week", resource: "Caixa de perguntas" },
    { day: "23/11", idea: "Condições abertas: acesse o link oficial", resource: "Link com CTA" },
    { day: "24/11", idea: "Comparação detalhada: Essential vs Pro", resource: "Cards de FAQ" },
    { day: "25/11", idea: "Caso clínico completo resolvido na plataforma", resource: "Tour guiado" },
    { day: "26/11", idea: "Tire dúvidas sobre pagamento, teste e cancelamento", resource: "Cards explicativos" },
    { day: "27/11", idea: "Black Friday LURIA: reforço com transparência", resource: "Link oficial" },
    { day: "28/11", idea: "Plantão Relâmpago: qual seria a sua conduta?", resource: "Enquete clínica" },
    { day: "29/11", idea: "Encerramento verdadeiro: contagem de horas", resource: "Aviso de término" },
    { day: "30/11", idea: "Primeiros passos após cadastro na plataforma", resource: "Tutorial de onboarding" }
  ];

  // FUNÇÕES DE SEGURANÇA E PIN
  function adminPinGraceStorageKey() {
    const userId = String(state.user?.id || window.docmapUser?.id || "admin");
    return `${ADMIN_PIN_GRACE_KEY}:${userId}`;
  }

  function rememberAdminPinUnlock() {
    try {
      localStorage.setItem(adminPinGraceStorageKey(), String(Date.now() + ADMIN_PIN_GRACE_MS));
    } catch (_) {}
  }

  function hasRecentAdminPinUnlock() {
    try {
      const key = adminPinGraceStorageKey();
      const expiresAt = Number(localStorage.getItem(key) || 0);
      return Number.isFinite(expiresAt) && expiresAt > Date.now();
    } catch (_) {
      return false;
    }
  }

  function normalizePin(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
  }

  function setPinMessage(text, type = "") {
    const message = $("admin-pin-message");
    if (!message) return;
    message.textContent = text;
    message.className = `admin-pin-message ${type}`.trim();
  }

  function setPinGateMode(hasPin) {
    state.pinConfigured = Boolean(hasPin);
    const fields = $("admin-pin-fields");
    const confirmWrap = $("admin-pin-confirm-wrap");
    const title = $("admin-pin-title");
    const description = $("admin-pin-description");
    const label = $("admin-pin-label");
    const submit = $("admin-pin-submit");

    if (fields) fields.hidden = false;
    if (confirmWrap) confirmWrap.hidden = state.pinConfigured;
    if (title) title.textContent = state.pinConfigured ? "Digite seu PIN" : "Cadastre seu PIN";
    if (description) description.textContent = state.pinConfigured ? "Digite os 6 dígitos do Admin para abrir o Marketing Hub." : "Crie um PIN de 6 dígitos.";
    if (label) label.textContent = state.pinConfigured ? "PIN de 6 dígitos" : "Criar PIN";
    if (submit) {
      submit.textContent = state.pinConfigured ? "Desbloquear Marketing" : "Cadastrar PIN";
      submit.disabled = false;
    }
    setPinMessage(state.pinConfigured ? "Área protegida por PIN." : "PIN protegido e sincronizado.");
  }

  async function loadPinStatus() {
    const sb = window.supabaseClient || window.sb;
    if (!sb) return false;
    const { data, error } = await sb.rpc("admin_pin_status");
    if (error) throw error;
    setPinGateMode(data?.has_pin === true);
    return data?.has_pin === true;
  }

  function unlockEditorialPage() {
    state.pinUnlocked = true;
    const gate = $("admin-pin-gate");
    const app = $("editorial-app");
    document.body.classList.remove("admin-pin-locked");
    document.body.classList.add("admin-unlocked");
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    renderCurrentView();
  }

  async function submitEditorialPin(event) {
    event.preventDefault();
    const pin = normalizePin($("admin-pin")?.value);
    const confirmPin = normalizePin($("admin-pin-confirm")?.value);
    const submit = $("admin-pin-submit");

    if (pin.length !== 6) {
      setPinMessage("Digite exatamente 6 números.", "error");
      return;
    }

    if (!state.pinConfigured && pin !== confirmPin) {
      setPinMessage("Os PINs digitados não coincidem.", "error");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Verificando...";
    }

    const sb = window.supabaseClient || window.sb;
    try {
      if (!state.pinConfigured) {
        const { data, error } = await sb.rpc("admin_set_pin", { p_pin: pin });
        if (error || data !== true) throw error || new Error("Falha ao salvar PIN.");
        setPinMessage("PIN cadastrado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
        return;
      }

      const { data, error } = await sb.rpc("admin_verify_pin", { p_pin: pin });
      if (error) throw error;

      if (data?.ok === true) {
        setPinMessage("Acesso liberado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
      } else {
        setPinMessage(data?.message || "PIN incorreto.", "error");
        if (submit) { submit.disabled = false; submit.textContent = "Tentar Novamente"; }
      }
    } catch (err) {
      setPinMessage("Erro ao autenticar.", "error");
      if (submit) { submit.disabled = false; submit.textContent = "Desbloquear Marketing"; }
    }
  }

  // ==============================================================
  // TELAS DE RENDERIZAÇÃO
  // ==============================================================

  // 1. PLANNER SEMANAL (Página 10)
  function renderWeeklyPlanner() {
    const container = $("editorial-view-container");
    if (!container) return;

    // Filtra posts da semana atual
    const currentWeekPosts = OFFICIAL_POSTS.slice(0, 7);

    container.innerHTML = `
      <div id="editorial-planner-board" class="editorial-planner-board">
        ${currentWeekPosts.map(post => `
          <div class="editorial-day-col has-post">
            <div class="editorial-col-header">
              <div class="editorial-col-day">
                <span>${post.date}</span>
                <small>${post.pilar}</small>
              </div>
              <span class="editorial-col-count active-count">1 post</span>
            </div>
            <div class="editorial-col-body">
              <article class="planner-card">
                <div class="planner-card-top">
                  <span class="planner-time">⚡ ${post.format}</span>
                  <span class="planner-badge badge-${post.status === 'publicado' ? 'ready' : post.status === 'aprovado' ? 'progress' : 'planned'}">${post.status}</span>
                </div>
                <h4 class="planner-title">${post.title}</h4>
                <div class="planner-study">
                  <strong>🎯 CTA:</strong>
                  <p>${post.cta}</p>
                </div>
                <div class="planner-action">
                  <strong>📝 Briefing & Roteiro:</strong>
                  <p>${post.script}</p>
                </div>
                <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener noreferrer" class="button primary planner-card-btn">
                  📂 Ver no Drive
                </a>
              </article>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 2. CRONOGRAMA DAS 27 PEÇAS (Páginas 10 e 11)
  function renderMonthlySchedule() {
    const container = $("editorial-view-container");
    if (!container) return;

    const filtered = OFFICIAL_POSTS.filter(p => p.month === state.selectedMonth);

    container.innerHTML = `
      <div class="editorial-month-meta-bar">
        <div class="month-headline">
          <strong>${state.selectedMonth === "2026-10" ? "Outubro 2026 (Aquecimento & Pré-lista)" : state.selectedMonth === "2026-11" ? "Novembro 2026 (Black Week Oficial & 15 Dias)" : "Dezembro 2026 (Retenção 2027)"}</strong>
          <span>${filtered.length} publicações programadas com validação científica e conformidade ética.</span>
        </div>
        <div class="month-kpis">
          <div class="month-kpi-item">
            <small>Posts no Mês</small>
            <strong>${filtered.length}</strong>
          </div>
          <div class="month-kpi-item">
            <small>Repositório</small>
            <strong style="color: #38bdf8;">Google Drive</strong>
          </div>
        </div>
      </div>

      <div class="editorial-month-grid">
        ${filtered.map(post => `
          <article class="month-week-card ${post.status === 'publicado' ? 'is-current' : ''}">
            <div class="month-week-header">
              <div class="month-week-badge-row">
                <span class="month-week-num">${post.date}</span>
                <span class="month-week-theme">${post.pilar} · ${post.format}</span>
              </div>
              <span class="planner-badge badge-${post.status === 'publicado' ? 'ready' : post.status === 'aprovado' ? 'progress' : 'planned'}">${post.status}</span>
            </div>

            <h4 style="color:#fff; margin:0; font-size:1.05rem;">${post.title}</h4>

            <div class="month-week-goal">
              <strong>🎯 CTA Oficial:</strong> ${post.cta}
            </div>

            <div class="planner-action">
              <strong>📝 Roteiro Base:</strong>
              <p>${post.script}</p>
            </div>

            <div class="month-week-footer">
              <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener noreferrer" class="button secondary planner-card-btn">
                📂 Acessar Arquivo no Drive
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  // 3. ESTÚDIO KANBAN DE APROVAÇÃO (Página 27)
  function renderKanbanStudio() {
    const container = $("editorial-view-container");
    if (!container) return;

    const columns = [
      { key: "ideia", label: "💡 Ideia / Pauta" },
      { key: "roteiro", label: "📝 Roteirização" },
      { key: "ciencia", label: "🔬 Revisão Médica" },
      { key: "design", label: "🎨 Design & Motion" },
      { key: "aprovado", label: "✅ Aprovado (QA)" },
      { key: "publicado", label: "🚀 Publicado" }
    ];

    container.innerHTML = `
      <div class="kanban-board">
        ${columns.map(col => {
          const items = OFFICIAL_POSTS.filter(p => p.kanban === col.key);
          return `
            <div class="kanban-col">
              <div class="kanban-col-head">
                <strong>${col.label}</strong>
                <span class="kanban-badge">${items.length}</span>
              </div>
              ${items.map(item => `
                <div class="kanban-card" onclick="window.open('${DRIVE_FOLDER}', '_blank')">
                  <div class="kanban-card-meta">
                    <span>${item.date}</span>
                    <span style="color:#38bdf8;">${item.format}</span>
                  </div>
                  <div class="kanban-card-title">${item.title}</div>
                  <small style="color:#94a3b8;">CTA: ${item.cta}</small>
                </div>
              `).join("")}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // 4. GRADE DE 30 STORIES (Página 17)
  function renderStoriesGrid() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="color:#fff; margin:0 0 0.5rem 0;">Pauta Completa de Stories · Todos os 30 Dias de Novembro</h3>
        <p style="color:#94a3b8; font-size:0.92rem; margin:0;">Rotina diária de engajamento baseada no Dossiê LURIA (Enquetes, Quizzes, Caixas de Dúvidas e Tours).</p>
      </div>

      <div class="stories-grid-container">
        ${STORIES_30_DAYS.map(s => `
          <div class="stories-day-card">
            <div class="stories-day-top">
              <span>Dia ${s.day}</span>
              <span class="stories-tag">${s.resource}</span>
            </div>
            <p class="stories-idea">${s.idea}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 5. CRM DE LEADS / PRÉ-LISTA VIP (Páginas 8 e 29)
  async function renderCrmLeads() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; padding:3rem; color:#94a3b8;">Carregando inscritos da pré-lista VIP...</div>`;

    let leads = [];
    try {
      const sb = window.supabaseClient;
      if (sb) {
        const { data } = await sb.from("marketing_leads").select("*").order("created_at", { ascending: false }).limit(50);
        leads = data || [];
      }
    } catch (_) {}

    container.innerHTML = `
      <div class="crm-leads-container">
        <div class="crm-header-summary">
          <div class="meta-ads-kpi-card">
            <span>Inscritos na Pré-Lista</span>
            <strong>${leads.length}</strong>
            <small style="color:#4ade80;">15 Dias Gratuitos</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Página de Captura</span>
            <strong>/black-november/</strong>
            <small><a href="/black-november/" target="_blank" style="color:#38bdf8;">Abrir Landing Page ↗</a></small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Validação Médica</span>
            <strong>Sem Cartão</strong>
            <small>Proteção contra atrito</small>
          </div>
        </div>

        <div class="meta-campaigns-table-card">
          <h3>Inscrições Recentes (Pré-Lista VIP 2026)</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Momento / Etapa</th>
                <th>Foco de Estudo</th>
                <th>Origem</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${leads.length > 0 ? leads.map(l => `
                <tr>
                  <td><strong>${l.name}</strong></td>
                  <td>${l.email_normalized}</td>
                  <td><span class="funnel-tag funnel-mid">${l.study_stage}</span></td>
                  <td>${l.interest || 'Geral'}</td>
                  <td>${l.origin}</td>
                  <td>${new Date(l.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              `).join("") : `
                <tr>
                  <td colspan="6" style="text-align:center; padding:2rem; color:#94a3b8;">
                    Nenhum lead registrado ainda. Divulgue o link <a href="/black-november/" target="_blank" style="color:#38bdf8;">/black-november/</a> para iniciar a captação!
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 6. META ADS DASHBOARD (Páginas 24 e 30)
  function renderMetaAdsHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="meta-ads-hub">
        <div class="meta-ads-api-banner">
          <div class="meta-ads-banner-copy">
            <strong>🌐 Meta Marketing API (Graph API v21.0)</strong>
            <p>
              Pronto para reconciliação com o Gerenciador de Anúncios. Ao conectar o Access Token e o Ad Account ID, as métricas de CPM, CPC, Leads e ROAS serão atualizadas automaticamente.
            </p>
          </div>
          <div class="meta-ads-status-badge">
            <span class="status-dot pending"></span>
            Aguardando Token da API
          </div>
        </div>

        <div class="meta-ads-kpis-grid">
          <div class="meta-ads-kpi-card">
            <span>Orçamento Previsto</span>
            <strong>R$ 1.500,00</strong>
            <small>Teto: R$ 25 - R$ 100/semana</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Meta de Alcance</span>
            <strong>50.000</strong>
            <small>Estudantes e Médicos</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Custo por Lead Alvo</span>
            <strong>R$ 3,50 - R$ 5,00</strong>
            <small>Pré-lista VIP</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Conversão em Venda</span>
            <strong>20 - 25% Pro</strong>
            <small>Oferta Black Friday</small>
          </div>
        </div>

        <div class="meta-campaigns-table-card">
          <h3>Estrutura de Campanhas da Black November</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Campanha</th>
                <th>Funil</th>
                <th>Objetivo Meta</th>
                <th>Público Alvo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>TOF · Vídeo AVC Isquêmico (Erro de 2 Minutos)</strong></td>
                <td><span class="funnel-tag funnel-top">Topo de Funil</span></td>
                <td>Reconhecimento / ThruPlay</td>
                <td>Interesse em Medicina, Residência Médica</td>
                <td><span class="status-dot active"></span> Pronta</td>
              </tr>
              <tr>
                <td><strong>MOF · Carrossel 5 Condutas em Emergência</strong></td>
                <td><span class="funnel-tag funnel-mid">Meio de Funil</span></td>
                <td>Engajamento & Salvamentos</td>
                <td>Seguidores de Páginas Médicas</td>
                <td><span class="status-dot active"></span> Pronta</td>
              </tr>
              <tr>
                <td><strong>BOF · Pré-Lista VIP (15 Dias Gratuitos)</strong></td>
                <td><span class="funnel-tag funnel-bottom">Fundo de Funil</span></td>
                <td>Geração de Leads</td>
                <td>Remarketing (Visitantes do Site)</td>
                <td><span class="status-dot pending"></span> Em Configuração</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderCurrentView() {
    if (state.currentView === "weekly") renderWeeklyPlanner();
    else if (state.currentView === "monthly") renderMonthlySchedule();
    else if (state.currentView === "kanban") renderKanbanStudio();
    else if (state.currentView === "stories") renderStoriesGrid();
    else if (state.currentView === "crm") renderCrmLeads();
    else if (state.currentView === "meta_ads") renderMetaAdsHub();

    $("tab-weekly")?.classList.toggle("active", state.currentView === "weekly");
    $("tab-monthly")?.classList.toggle("active", state.currentView === "monthly");
    $("tab-kanban")?.classList.toggle("active", state.currentView === "kanban");
    $("tab-stories")?.classList.toggle("active", state.currentView === "stories");
    $("tab-crm")?.classList.toggle("active", state.currentView === "crm");
    $("tab-meta-ads")?.classList.toggle("active", state.currentView === "meta_ads");

    const monthNav = $("editorial-month-nav");
    if (monthNav) monthNav.hidden = state.currentView !== "monthly";
  }

  function setupViewToggle() {
    $("tab-weekly")?.addEventListener("click", () => { state.currentView = "weekly"; renderCurrentView(); });
    $("tab-monthly")?.addEventListener("click", () => { state.currentView = "monthly"; renderCurrentView(); });
    $("tab-kanban")?.addEventListener("click", () => { state.currentView = "kanban"; renderCurrentView(); });
    $("tab-stories")?.addEventListener("click", () => { state.currentView = "stories"; renderCurrentView(); });
    $("tab-crm")?.addEventListener("click", () => { state.currentView = "crm"; renderCurrentView(); });
    $("tab-meta-ads")?.addEventListener("click", () => { state.currentView = "meta_ads"; renderCurrentView(); });

    $("month-select")?.addEventListener("change", (e) => {
      state.selectedMonth = e.target.value;
      renderCurrentView();
    });
  }

  async function init() {
    setupViewToggle();
    $("admin-pin-form")?.addEventListener("submit", submitEditorialPin);

    const pinInput = $("admin-pin");
    if (pinInput) {
      pinInput.addEventListener("input", () => {
        pinInput.value = normalizePin(pinInput.value);
        if (pinInput.value.length === 6 && state.pinConfigured) $("admin-pin-form")?.requestSubmit();
      });
    }

    const sb = window.supabaseClient || window.sb;
    if (!sb) { setTimeout(init, 300); return; }

    try {
      const { data: { user } } = await sb.auth.getUser();
      state.user = user;

      let isAdmin = false;
      try {
        const { data: rpcAdmin } = await sb.rpc("is_admin");
        if (rpcAdmin === true) isAdmin = true;
        else if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      } catch (_) {
        if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      }

      state.isAdmin = isAdmin;

      if (!isAdmin) {
        setPinMessage("Acesso restrito a administradores. Redirecionando...", "error");
        setTimeout(() => { window.location.replace("/dashboard/"); }, 800);
        return;
      }

      if (hasRecentAdminPinUnlock()) {
        unlockEditorialPage();
        return;
      }

      await loadPinStatus();
    } catch (err) {
      console.error("[Marketing Init Error]", err);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
