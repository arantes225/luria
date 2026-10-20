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
    currentView: "weekly", // "weekly" | "monthly" | "kanban" | "stories" | "crm" | "meta_ads" | "organic_growth"
    selectedMonth: "2026-10",
    leadsList: [],
    organicTips: []
  };

  const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link";

  // ==============================================================
  // OS 27 POSTS OFICIAIS DO DOSSIÊ COM DATAS POR EXTENSO
  // INÍCIO OFICIAL: 26 DE OUTUBRO DE 2026
  // ==============================================================
  const OFFICIAL_POSTS = [
    // OUTUBRO (Semana 1 · 26/10 a 01/11 - Enchimento de Feed Orgânico & Autoridade)
    { id: "p01", date: "Segunda-feira, 26 de Outubro de 2026", shortDate: "26/10 Seg", month: "2026-10", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Por que você esquece o que estudou na medicina?", cta: "Salve para revisar", status: "aprovado", kanban: "aprovado", script: "Curva do esquecimento de Ebbinghaus aplicada à medicina e a necessidade de repetição ativa espaçada." },
    { id: "p02", date: "Terça-feira, 27 de Outubro de 2026", shortDate: "27/10 Ter", month: "2026-10", format: "Reels Clínico (25s)", pilar: "Educação Médica", title: "Você está no PS: AVC vs Hipoglicemia", cta: "Compartilhe com a equipe", status: "aprovado", kanban: "aprovado", script: "Dilema de emergência nos primeiros 3s: a obrigatoriedade absoluta do HGT na suspeita de déficit neurológico focal." },
    { id: "p03", date: "Quarta-feira, 28 de Outubro de 2026", shortDate: "28/10 Qua", month: "2026-10", format: "Carrossel Técnico (6 pág)", pilar: "Educação Médica", title: "Questão comentada: a pegadinha clássica da banca", cta: "Responda antes do gabarito", status: "aprovado", kanban: "aprovado", script: "Análise minuciosa de distratores de uma questão real de residência com raciocínio clínico aplicado." },
    { id: "p04", date: "Quinta-feira, 29 de Outubro de 2026", shortDate: "29/10 Qui", month: "2026-10", format: "Reels de Produto (30s)", pilar: "Produto LURIA", title: "Do erro na questão ao flashcard automático", cta: "Conheça o fluxo", status: "revisao", kanban: "design", script: "Demonstração sem enrolação de como a LURIA transforma um erro de estudo em fixação no mesmo minuto." },
    { id: "p05", date: "Sexta-feira, 30 de Outubro de 2026", shortDate: "30/10 Sex", month: "2026-10", format: "Carrossel (6 pág)", pilar: "Planejamento", title: "Checklist de preparação para as provas de 2027", cta: "Salve para o ano todo", status: "revisao", kanban: "design", script: "Como organizar os blocos de estudo sem sobrecarga cognitiva: metas realistas para internato e residência." },
    { id: "p06", date: "Sábado, 31 de Outubro de 2026", shortDate: "31/10 Sáb", month: "2026-10", format: "Reels Desafio (20s)", pilar: "Educação Médica", title: "Plantão Relâmpago: qual é a conduta imediata?", cta: "Comente sua conduta", status: "pauta", kanban: "roteiro", script: "Desafio interativo de pronto-socorro para gerar comentários e engajamento orgânico máximo." },
    { id: "p07", date: "Domingo, 01 de Novembro de 2026", shortDate: "01/11 Dom", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Cinco erros que custam a aprovação na residência", cta: "Envie a um colega", status: "pauta", kanban: "roteiro", script: "Estudo passivo por resumos alheios, negligência do caderno de erros e falta de simulação prática." },

    // NOVEMBRO (Semana 2 em diante: Tráfego Pago R$ 20/sem para Ganhar Seguidores + Operação Black November)
    { id: "p08", date: "Segunda-feira, 02 de Novembro de 2026", shortDate: "02/11 Seg", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Sepse: cinco erros que custam uma questão", cta: "Salve para revisar", status: "revisao", kanban: "ciencia", script: "Reconhecimento de sepse, sinais de alerta, conduta fundamentada e resumo de 30 segundos. [Candidato ao Impulsionamento R$ 20]" },
    { id: "p09", date: "Terça-feira, 03 de Novembro de 2026", shortDate: "03/11 Ter", month: "2026-11", format: "Reels Educativo (25-30s)", pilar: "Educação Médica", title: "Estudar seis horas não garante aprender mais", cta: "Envie a um amigo", status: "pauta", kanban: "roteiro", script: "Releitura passiva versus active recall com repetição espaçada. Metodologia médica comprovada." },
    { id: "p10", date: "Quinta-feira, 05 de Novembro de 2026", shortDate: "05/11 Qui", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Questão comentada: pré-eclâmpsia grave", cta: "Responda primeiro", status: "pauta", kanban: "roteiro", script: "Caso clínico de pré-eclâmpsia grave, conduta conforme FEBRASGO/MS e distratores explicados." },
    { id: "p11", date: "Sábado, 07 de Novembro de 2026", shortDate: "07/11 Sáb", month: "2026-11", format: "Reels de Produto (30s)", pilar: "Produto LURIA", title: "Entrando na Sala de Emergência da LURIA", cta: "Conheça o simulador", status: "pauta", kanban: "roteiro", script: "Você assumiu o plantão: tomada de decisão no simulador com debriefing imediato e sem risco real." },
    { id: "p12", date: "Segunda-feira, 09 de Novembro de 2026", shortDate: "09/11 Seg", month: "2026-11", format: "Reels de Oferta (20-25s)", pilar: "Oferta VIP", title: "Pré-Lista VIP: Primeiras ativações gratuitas", cta: "Receba seu convite", status: "ideia", kanban: "ideia", script: "Liberação progressiva dos primeiros convites da pré-lista VIP por coortes individuais com 15 dias sem cartão." },
    { id: "p13", date: "Terça-feira, 10 de Novembro de 2026", shortDate: "10/11 Ter", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Educação Médica", title: "ECG: três sinais que você não deve ignorar", cta: "Salve e compartilhe", status: "ideia", kanban: "ideia", script: "Sequência sistemática diante de um traçado real de eletrocardiograma no pronto-socorro." },
    { id: "p14", date: "Quinta-feira, 12 de Novembro de 2026", shortDate: "12/11 Qui", month: "2026-11", format: "Reels de Produto (20-30s)", pilar: "Produto LURIA", title: "Errou uma questão? O estudo não termina aqui", cta: "Experimente a LURIA", status: "ideia", kanban: "ideia", script: "Como transformar a frustração do erro em memorização definitiva através do Caderno de Erros LURIA." },
    { id: "p15", date: "Sábado, 14 de Novembro de 2026", shortDate: "14/11 Sáb", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Planejamento", title: "Como organizar 30 minutos de estudo diário", cta: "Salve a rotina", status: "ideia", kanban: "ideia", script: "5 min de planejamento, 15 min de questões focadas e 10 min de revisão com foco cirúrgico." },
    { id: "p16", date: "Segunda-feira, 16 de Novembro de 2026", shortDate: "16/11 Seg", month: "2026-11", format: "Reels de Produto (25-35s)", pilar: "Produto LURIA", title: "Sua evolução médica sem planilhas manuais", cta: "Conheça a LURIA", status: "ideia", kanban: "ideia", script: "Painel analítico da LURIA mostrando pontos fortes e fracos sem necessidade de preencher planilhas manuais." },
    { id: "p17", date: "Terça-feira, 17 de Novembro de 2026", shortDate: "17/11 Ter", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Desidratação pediátrica: raciocínio clínico", cta: "Teste-se", status: "ideia", kanban: "ideia", script: "Avaliação da gravidade do estado de hidratação e reposição conforme protocolo pediátrico do Ministério da Saúde." },
    { id: "p18", date: "Quinta-feira, 19 de Novembro de 2026", shortDate: "19/11 Qui", month: "2026-11", format: "Reels de Produto (20-30s)", pilar: "Produto LURIA", title: "O que será o Modo Trabalho?", cta: "Entre na lista beta", status: "ideia", kanban: "ideia", script: "Conceito do módulo de gestão do trabalho e plantões para médicos em fase beta." },
    { id: "p19", date: "Sábado, 21 de Novembro de 2026", shortDate: "21/11 Sáb", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Planejamento", title: "Checklist de grandes temas para 2027", cta: "Salve para consultar", status: "ideia", kanban: "ideia", script: "Distribuição de matérias por peso nas grandes bancas de residência médica (ENARE, USP, SUS-SP)." },
    { id: "p20", date: "Segunda-feira, 23 de Novembro de 2026", shortDate: "23/11 Seg", month: "2026-11", format: "Motion Design (15-20s)", pilar: "Oferta Oficial", title: "Começou a Black Week LURIA", cta: "Conheça as condições", status: "ideia", kanban: "ideia", script: "Início oficial da Black Week. Condições transparentes liberadas no site oficial com 15 dias sem risco." },
    { id: "p21", date: "Terça-feira, 24 de Novembro de 2026", shortDate: "24/11 Ter", month: "2026-11", format: "Carrossel Comparativo (6 pág)", pilar: "Oferta Oficial", title: "Essential ou Pro: qual plano é para você?", cta: "Compare os planos", status: "ideia", kanban: "ideia", script: "Tabela comparativa direta e honesta entre os planos Essential e Pro, sem letras miúdas." },
    { id: "p22", date: "Quarta-feira, 25 de Novembro de 2026", shortDate: "25/11 Qua", month: "2026-11", format: "Reels de Produto (25-30s)", pilar: "Produto LURIA", title: "Do caso clínico ao aprendizado completo", cta: "Experimente o fluxo", status: "ideia", kanban: "ideia", script: "Demonstração do ciclo completo: Caso Clínico -> Decisão -> Debriefing Científico -> Flashcard de Fixação." },
    { id: "p23", date: "Quinta-feira, 26 de Novembro de 2026", shortDate: "26/11 Qui", month: "2026-11", format: "Carrossel de FAQ (8 pág)", pilar: "Oferta Oficial", title: "FAQ: 15 dias gratuitos e Black Week", cta: "Tire suas dúvidas", status: "ideia", kanban: "ideia", script: "Respostas transparentes sobre cobrança, ativação, período de teste e cancelamento em 1 clique." },
    { id: "p24", date: "Sexta-feira, 27 de Novembro de 2026", shortDate: "27/11 Sex", month: "2026-11", format: "Reels Black Friday (30-35s)", pilar: "Oferta Oficial", title: "Black Friday LURIA: condição principal liberada", cta: "Assine pela oferta", status: "ideia", kanban: "ideia", script: "Vídeo principal da Black Friday com demonstração ao vivo e condições exclusivas de assinatura anual." },
    { id: "p25", date: "Sábado, 28 de Novembro de 2026", shortDate: "28/11 Sáb", month: "2026-11", format: "Reels Desafio (20s)", pilar: "Educação Médica", title: "Plantão Relâmpago de Fim de Semana", cta: "Qual sua conduta?", status: "ideia", kanban: "ideia", script: "Desafio interativo com caso clínico de rápida tomada de decisão para mobilizar engajamento." },
    { id: "p26", date: "Domingo, 29 de Novembro de 2026", shortDate: "29/11 Dom", month: "2026-11", format: "Motion Design (15s)", pilar: "Oferta Oficial", title: "Últimas horas da Black Week LURIA", cta: "Veja o prazo final", status: "ideia", kanban: "ideia", script: "Encerramento verdadeiro no horário oficial informado no site. Sem falsas extensões de prazo." },
    { id: "p27", date: "Segunda-feira, 30 de Novembro de 2026", shortDate: "30/11 Seg", month: "2026-11", format: "Carrossel Onboarding (7 pág)", pilar: "Produto LURIA", title: "Seus primeiros sete dias de estudos na LURIA", cta: "Comece seu cronograma", status: "ideia", kanban: "ideia", script: "Guia passo a passo de onboarding para novos assinantes e membros do teste gratuito de 15 dias." }
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

  // 6. META ADS DASHBOARD (Páginas 24 e 30) - ESTRATÉGIA MICRO-BUDGET R$ 20/SEMANA
  function renderMetaAdsHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="meta-ads-hub">
        <div class="meta-ads-api-banner">
          <div class="meta-ads-banner-copy">
            <strong>🌐 Meta Marketing API (Graph API v21.0) · Estratégia Micro-Budget</strong>
            <p>
              Início na semana do dia <strong>02 de Novembro de 2026</strong> com limite de <strong>R$ 20,00 por semana</strong> (~R$ 2,85/dia). Foco inicial: <strong>Ganhar Seguidores Médicos Qualificados</strong> para validação de marca, antes de transferir a verba para tráfego direto de acessos ao site.
            </p>
          </div>
          <div class="meta-ads-status-badge">
            <span class="status-dot active"></span>
            Limite: R$ 20 / semana
          </div>
        </div>

        <div class="meta-ads-kpis-grid">
          <div class="meta-ads-kpi-card">
            <span>Orçamento Semanal</span>
            <strong>R$ 20,00</strong>
            <small style="color:#4ade80;">R$ 2,85 / dia (1 post vencedor)</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Fase 1 Prolongada (Novembro todo)</span>
            <strong>Ganhar Seguidores</strong>
            <small>Construção de Base e Marca Forte</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Fase 2 (Black Week Final / Dezembro)</span>
            <strong>Transferir p/ Acessos</strong>
            <small>Público já aquecido e confiante</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Critério de Escolha</span>
            <strong>Mais Salvo no Orgânico</strong>
            <small>Impulsionar apenas o comprovado</small>
          </div>
        </div>

        <div class="meta-campaigns-table-card">
          <h3>Evolução das Campanhas Meta Ads (Fase 1 Estendida & Fase 2 Futura)</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Campanha & Peça</th>
                <th>Fase & Objetivo</th>
                <th>Orçamento</th>
                <th>Público Alvo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Semana 02/11 · Impulsionamento do Post Vencedor da Semana 1</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Medicina, Internato e Residência (20-30 anos)</td>
                <td><span class="status-dot active"></span> Início 02/11</td>
              </tr>
              <tr>
                <td><strong>Semana 09/11 · Post Técnico Mais Salvo (Sepse / ECG)</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Visitas ao Perfil · Alunos de Medicina e Recém-formados</td>
                <td><span class="status-dot pending"></span> Foco em Marca</td>
              </tr>
              <tr>
                <td><strong>Semana 16/11 · Post de Produto / Caderno de Erros Mais Engajado</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Visitas ao Perfil · Comunidade Médica Engajada</td>
                <td><span class="status-dot pending"></span> Foco em Marca</td>
              </tr>
              <tr>
                <td><strong>Semana 23/11 · Black Week: Transição Seletiva para Acessos</strong></td>
                <td><span class="funnel-tag funnel-mid">Fase 2 · Transição p/ Acessos</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Público que seguiu o perfil em novembro → /black-november/</td>
                <td><span class="status-dot pending"></span> Planejado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 7. NOVA PÁGINA: DICAS DE CRESCIMENTO ORGÂNICO (Alimentada Semanalmente)
  async function renderOrganicGrowthHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; padding:3rem; color:#94a3b8;">Carregando diretrizes de crescimento orgânico e micro-budget...</div>`;

    let tips = [];
    try {
      const res = await fetch("/assets/data/organic-growth-tips.json?t=" + Date.now());
      if (res.ok) tips = await res.json();
    } catch (_) {}

    if (!tips || tips.length === 0) {
      tips = [
        {
          semana: "Semana 1 · 26/10 a 01/11/2026",
          foco: "Enchimento de Feed Orgânico & Autoridade Clínica",
          pilares: [
            {
              titulo: "Carrossel de Alto Salvamento",
              dica: "O salvamento é a métrica mais valorizada pelo algoritmo médico. Posts com resumos rápidos geram alcance orgânico multiplicado.",
              acao: "Poste na segunda e na quarta no pico das 12h ou 20h com CTA: 'Salve para consultar no plantão'."
            },
            {
              titulo: "Reels com Gancho Clínico nos 3 Segundos Iniciais",
              dica: "Corte seco e caso interativo geram retenção acima de 50% e compartilhamentos no WhatsApp.",
              acao: "Sem saudações lentas: abra com o ECG ou o dilema de conduta direto."
            }
          ]
        }
      ];
    }

    container.innerHTML = `
      <div class="organic-growth-hub">
        <div class="organic-banner">
          <div class="organic-banner-text">
            <h2>🌱 Guia Prático de Crescimento Orgânico & Validação</h2>
            <p>
              Estratégia oficial para abastecer o feed e gerar seguidores sem queimar caixa. Atualizado semanalmente pelas rotinas automatizadas da LURIA.
            </p>
          </div>
          <div class="organic-badge">
            Atualização Semanal Automática
          </div>
        </div>

        <div class="organic-strategy-grid">
          <div class="organic-step-card">
            <span class="step-badge">Fase 0 · A partir de 26/10</span>
            <h4>Feed Orgânico Impecável</h4>
            <p>Construção da vitrine técnica: 1 post por dia com foco em salvamento e compartilhamento antes de colocar qualquer verba em anúncios.</p>
          </div>
          <div class="organic-step-card">
            <span class="step-badge">Fase 1 Prolongada · Todo o Mês de Novembro</span>
            <h4>Micro-Budget R$ 20 / semana (Seguidores & Marca)</h4>
            <p>Manter a verba focada exclusivamente em trazer seguidores qualificados para o perfil. Valida autoridade médica e constrói comunidade sólida.</p>
          </div>
          <div class="organic-step-card">
            <span class="step-badge">Fase 2 Futura · Transição Gradual</span>
            <h4>Transferência para Acessos ao Site</h4>
            <p>Com centenas de seguidores médicos engajados, a transição para gerar cliques na landing page /black-november/ e no teste de 15 dias fica muito mais barata e eficiente.</p>
          </div>
        </div>

        <div class="organic-weeks-list">
          ${tips.map(w => `
            <div class="organic-week-block">
              <div class="organic-week-header">
                <div>
                  <span class="organic-week-tag">${w.semana}</span>
                  <h3 class="organic-week-focus">${w.foco}</h3>
                </div>
                ${w.atualizado_em ? `<small style="color:#94a3b8;">Sincronizado: ${new Date(w.atualizado_em).toLocaleDateString('pt-BR')}</small>` : ''}
              </div>
              <div class="organic-pilares-grid">
                ${(w.pilares || []).map(p => `
                  <div class="organic-pilar-card">
                    <h4>📌 ${p.titulo}</h4>
                    <p class="organic-dica"><strong>Por que funciona:</strong> ${p.dica}</p>
                    <div class="organic-acao">
                      <strong>⚡ Ação Imediata:</strong>
                      <p>${p.acao}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
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
    else if (state.currentView === "organic_growth") renderOrganicGrowthHub();

    $("tab-weekly")?.classList.toggle("active", state.currentView === "weekly");
    $("tab-monthly")?.classList.toggle("active", state.currentView === "monthly");
    $("tab-kanban")?.classList.toggle("active", state.currentView === "kanban");
    $("tab-stories")?.classList.toggle("active", state.currentView === "stories");
    $("tab-crm")?.classList.toggle("active", state.currentView === "crm");
    $("tab-meta-ads")?.classList.toggle("active", state.currentView === "meta_ads");
    $("tab-organic-growth")?.classList.toggle("active", state.currentView === "organic_growth");

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
    $("tab-organic-growth")?.addEventListener("click", () => { state.currentView = "organic_growth"; renderCurrentView(); });

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
