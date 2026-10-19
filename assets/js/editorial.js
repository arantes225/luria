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
    currentView: "weekly", // "weekly" | "monthly" | "meta_ads"
    selectedMonth: "2026-10"
  };

  const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link";

  // PLANNER SEMANAL (7 DIAS DA SEMANA ATUAL)
  const WEEK_PLAN = [
    {
      dayCode: "seg",
      dayName: "Segunda-feira",
      dateLabel: "Planejamento & Alinhamento",
      posts: []
    },
    {
      dayCode: "ter",
      dayName: "Terça-feira",
      dateLabel: "Pico de Saves (Almoço)",
      posts: [
        {
          id: "post-1",
          time: "12h00",
          type: "Carrossel Técnico (7 Slides)",
          goal: "Autoridade & Saves",
          funnel: "Topo de Funil (Educação)",
          funnelClass: "funnel-top",
          badge: "Abertura",
          badgeClass: "ready",
          title: "5 Condutas em Emergência que Mudaram nas Últimas Diretrizes",
          subtitle: "Diretrizes Atuais · Cuidados Críticos & PS",
          rationale: "Estudos Sprout Social/Metricool mostram que o público médico tem o maior pico de salvamento de carrosséis na pausa do almoço de terça.",
          actionPlan: "Apresentar 5 condutas contra-intuitivas (ex: O2 liberal, bicarbonato, reposição de K+). CTA focado em salvar para o plantão.",
          format: "Feed (1080x1350)",
          driveUrl: DRIVE_FOLDER,
          status: "Pronto para Agendamento"
        }
      ]
    },
    {
      dayCode: "qua",
      dayName: "Quarta-feira",
      dateLabel: "Alcance & Transição",
      posts: [
        {
          id: "post-2",
          time: "19h30",
          type: "Reels / Vídeo Full HD (30s)",
          goal: "Alcance & Descoberta",
          funnel: "Topo de Funil (Viral/Reach)",
          funnelClass: "funnel-top",
          badge: "Ultra Blaster",
          badgeClass: "progress",
          title: "AVC ou Hipoglicemia? O Erro de 2 Minutos que Pode Custar o Delta T",
          subtitle: "Neurologia / Emergência · Delta T & HGT",
          rationale: "Reels no horário das 19h30 (transição pós-hospital) maximizam a entrega do algoritmo para contas que ainda não seguem a LURIA.",
          actionPlan: "Simulação de paciente com déficit focal súbito e desvio de rima. Ponto central: HGT imediato antes de levar à TC.",
          format: "Reels 60fps (1080x1920)",
          driveUrl: DRIVE_FOLDER,
          status: "Renderização em 4K"
        }
      ]
    },
    {
      dayCode: "qui",
      dayName: "Quinta-feira",
      dateLabel: "Estudo & Neurociência",
      posts: [
        {
          id: "post-3",
          time: "12h30",
          type: "Carrossel Mental (5 Slides)",
          goal: "Dor do Estudante",
          funnel: "Meio de Funil (Consideração)",
          funnelClass: "funnel-mid",
          badge: "Método de Estudo",
          badgeClass: "ready",
          title: "Curva do Esquecimento na Medicina: Por que Ler a Apostila 3x Não Funciona",
          subtitle: "Neurociência · Repetição Espaçada",
          rationale: "Quinta-feira ao meio-dia é o ponto de maior cansaço do estudante na semana; alta receptividade para soluções de produtividade médica.",
          actionPlan: "Demonstrar perda de memória após 24h e 7 dias. Estudo passivo vs estudo ativo. Apresentação da metodologia de retenção LURIA.",
          format: "Feed (1080x1350)",
          driveUrl: DRIVE_FOLDER,
          status: "Em Diagramação"
        }
      ]
    },
    {
      dayCode: "sex",
      dayName: "Sexta-feira",
      dateLabel: "Pílula Rápida de Plantão",
      posts: [
        {
          id: "post-4",
          time: "18h30",
          type: "Reels Curto / Pílula (20s)",
          goal: "Compartilhamento",
          funnel: "Topo de Funil (Social Share)",
          funnelClass: "funnel-top",
          badge: "Pulo do Gato",
          badgeClass: "planned",
          title: "ECG em 30 Segundos: O Sinal Silencioso da Hipercalemia Grave",
          subtitle: "Cardiologia & Nefro · Onda T Apiculada",
          rationale: "Médicos e internos entrando no plantão noturno de sexta compartilham intensamente pílulas rápidas em grupos de WhatsApp.",
          actionPlan: "Traçado real e indicação imediata de gluconato de cálcio a 10% para estabilização elétrica de membrana cardíaca.",
          format: "Reels (1080x1920)",
          driveUrl: DRIVE_FOLDER,
          status: "Em Roteiro"
        }
      ]
    },
    {
      dayCode: "sab",
      dayName: "Sábado",
      dateLabel: "Descanso & Bastidores",
      posts: []
    },
    {
      dayCode: "dom",
      dayName: "Domingo",
      dateLabel: "Interação & Gamificação",
      posts: [
        {
          id: "post-5",
          time: "20h00",
          type: "Stories Interativos",
          goal: "Engajamento",
          funnel: "Fundo de Funil (Conversão/Simulador)",
          funnelClass: "funnel-bottom",
          badge: "Gamificação",
          badgeClass: "planned",
          title: "Desafio Clínico do Domingo: Dor Torácica Súbita no PS",
          subtitle: "Simulador de Casos · Enquetes",
          rationale: "Domingo à noite é o momento pré-semana com maior taxa de resposta em caixas de perguntas e enquetes interativas.",
          actionPlan: "Caso em 5 Stories: História clínica -> Exame -> ECG -> Enquete de conduta -> Resolução comentada com link para a LURIA.",
          format: "Stories Interativos",
          driveUrl: DRIVE_FOLDER,
          status: "Planejado"
        }
      ]
    }
  ];

  // BANCO DE DADOS MULTI-MÊS (CRONOGRAMA EXPANSÍVEL)
  const MONTHLY_DATABASE = {
    "2026-10": {
      name: "Outubro 2026",
      theme: "Lançamento Oficial · Emergências & Fundação Técnica",
      targetReach: "50.000 médicos & estudantes",
      totalPosts: 20,
      adBudgetPlanned: "R$ 1.500,00",
      weeks: [
        {
          weekNumber: 1,
          weekTitle: "Semana 1 · Fundação & Autoridade",
          theme: "Emergências Médicas & Diagnóstico Crítico",
          goal: "Apresentar o rigor técnico e a utilidade prática da LURIA para médicos e estudantes.",
          badge: "Semana Atual",
          badgeClass: "ready",
          isCurrent: true,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "5 Condutas em Emergência que Mudaram" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "AVC vs Hipoglicemia (O Erro do Delta T)" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Curva do Esquecimento na Medicina" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "ECG da Hipercalemia Grave em 30s" },
            { day: "Domingo · 20h00", format: "Stories", title: "Desafio Clínico: Dor Torácica no PS" }
          ]
        },
        {
          weekNumber: 2,
          weekTitle: "Semana 2 · Rotina do Internato & Raciocínio",
          theme: "Condutas de Enfermaria & Prescrição Segura",
          goal: "Resolver a insegurança do estudante no internato (antibióticos, hidratação, eletrólitos).",
          badge: "Planejada",
          badgeClass: "progress",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Guia Rápido de Antibioticoterapia Empírica no PS" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "Por que Nunca Fazer Soro Fisiológico 0.9% Aberto?" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Como Estruturar uma Evolução Médica Impecável" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Como Calcular o Déficit de Sódio sem Errar" },
            { day: "Domingo · 20h00", format: "Stories", title: "Desafio Clínico: Hiponatremia Aguda" }
          ]
        },
        {
          weekNumber: 3,
          weekTitle: "Semana 3 · Alta Performance & Provas de Residência",
          theme: "Estratégia de Estudos & Questões Difíceis",
          goal: "Atrair vestibulandos e residentes com foco em simulados, editais e pegadinhas de banca.",
          badge: "Planejada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Os 5 Temas Mais Cobrados no ENARE/USP nos Últimos 3 Anos" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "A Pegadinha Mais Comum de Pediatria nas Provas" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Como Usar o Caderno de Erros para Subir 15% a Média" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Critérios de Wells em 25 Segundos" },
            { day: "Domingo · 20h00", format: "Stories", title: "Simulado Relâmpago: 5 Questões Comentadas" }
          ]
        },
        {
          weekNumber: 4,
          weekTitle: "Semana 4 · Decisão Sob Pressão",
          theme: "Protocolos de UTI & Sala Vermelha",
          goal: "Consolidar a LURIA como a ferramenta de consulta e treino obrigatória do profissional médico.",
          badge: "Planejada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Manejo da Sepse Grave na Primeira Hora (Bundle 1h)" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "Intubação de Sequência Rápida: A Droga que Salva vidas" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Grave vs Estável: Quando Usar Droga Vasoativa?" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Pneumotórax Hipertensivo: Diagnóstico Clínico Imediato" },
            { day: "Domingo · 20h00", format: "Stories", title: "Desafio de Sala Vermelha: Choque Indiferenciado" }
          ]
        }
      ]
    },
    "2026-11": {
      name: "Novembro 2026",
      theme: "Campanha Black November & Retenção Pré-Provas",
      targetReach: "120.000 contas alcançadas",
      totalPosts: 22,
      adBudgetPlanned: "R$ 3.000,00",
      weeks: [
        {
          weekNumber: 1,
          weekTitle: "Semana 1 · Reta Final ENARE / SUS-SP",
          theme: "Revisão Espaçada de Alto Rendimento",
          goal: "Intensivo de questões resolvidas e simuladores da LURIA em tempo real.",
          badge: "Programada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Top 10 CCQs (Pulos do Gato) para a Prova de Domingo" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "O Erro Fatal que Elimina 40% dos Candidatos na Cirurgia" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Flashcards de Última Hora: Farmacologia Cardiovascular" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Escala de Glasgow-P: Como Não Errar a Reatividade Pupilar" },
            { day: "Domingo · 20h00", format: "Stories", title: "Plantão de Dúvidas & Análise Pós-Prova" }
          ]
        },
        {
          weekNumber: 2,
          weekTitle: "Semana 2 · Primeiros Plantões & Prática Médica",
          theme: "Transição Formatura -> Primeiro Emprego",
          goal: "Atrair recém-formados para o Módulo de Trabalho e Gestor de Plantões da LURIA.",
          badge: "Programada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Manual de Sobrevivência do Recém-Formado no PS" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "Como Passar um Plantão sem Esquecer Nenhuma Conduta" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "As 7 Prescrições Básicas que Todo Médico Precisa Dominar" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Quando Chamar o Especialista? O Limite da Segurança" },
            { day: "Domingo · 20h00", format: "Stories", title: "Enquete de Plantão: Qual Caso te Deu Mais Frio na Barriga?" }
          ]
        },
        {
          weekNumber: 3,
          weekTitle: "Semana 3 · Black LURIA (Aquecimento)",
          theme: "Oferta Exclusiva de Acesso Anual & Beta VIP",
          goal: "Conversão direta para planos pagos com cases de sucesso dos primeiros usuários.",
          badge: "Planejada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Como um Residente Estudou 400h com a LURIA sem Burnout" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "Tour Completo pelo Algoritmo do Caderno de Erros" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Estudar por Questões vs Teoria: O que Diz a Universidade de Harvard" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Desafio 60 Segundos: Casos Clínicos Interativos" },
            { day: "Domingo · 20h00", format: "Stories", title: "Abertura da Lista VIP da Black LURIA" }
          ]
        },
        {
          weekNumber: 4,
          weekTitle: "Semana 4 · Black Friday Oficial & Fechamento",
          theme: "Campanha de Conversão Máxima",
          goal: "Pico de aquisição de novos assinantes na plataforma.",
          badge: "Planejada",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Liberado: Condições Exclusivas de Assinatura LURIA" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "3 Motivos para Não Estudar Mais com PDFs Piratas em 2027" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Comparativo: Método Tradicional vs Inteligência LURIA" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Últimas 24h com Acesso Vitalício aos Simuladores" },
            { day: "Domingo · 20h00", format: "Stories", title: "Boas-Vindas aos Novos Membros & Ranking de Estudos" }
          ]
        }
      ]
    },
    "2026-12": {
      name: "Dezembro 2026",
      theme: "Planejamento 2027 & Ano Letivo Médico",
      targetReach: "80.000 contas",
      totalPosts: 18,
      adBudgetPlanned: "R$ 2.000,00",
      weeks: [
        {
          weekNumber: 1,
          weekTitle: "Semana 1 · Retrospectiva & Metas 2027",
          theme: "Cronograma de Estudos para o Próximo Ano",
          goal: "Captar estudantes montando o cronograma do ano letivo médico.",
          badge: "Backlog",
          badgeClass: "planned",
          isCurrent: false,
          items: [
            { day: "Terça · 12h00", format: "Carrossel", title: "Como Montar um Cronograma de Residência 2027 Realista" },
            { day: "Quarta · 19h30", format: "Reels HD", title: "O Erro Número 1 de Quem Começa a Estudar em Janeiro" },
            { day: "Quinta · 12h30", format: "Carrossel", title: "Grade Curricular vs Residência: Como Conciliar" },
            { day: "Sexta · 18h30", format: "Reels Pílula", title: "Dica de Ouro: Como Evitar a Procrastinação no Internato" },
            { day: "Domingo · 20h00", format: "Stories", title: "Enquete: Qual Especialidade Você Quer Prestar em 2027?" }
          ]
        }
      ]
    }
  };

  // MOCK DE DADOS DA META ADS API (ESTRUTURA COMPLETA DE MARKETING)
  const META_ADS_MOCK = {
    connected: false,
    accountId: "act_4920194819283",
    currency: "BRL",
    summary: {
      spent: "R$ 0,00",
      budgetMonth: "R$ 1.500,00",
      impressions: "0",
      cpm: "R$ 0,00",
      clicks: "0",
      cpc: "R$ 0,00",
      ctr: "0,00%",
      leads: "0",
      cpl: "R$ 0,00"
    },
    campaigns: [
      {
        id: "cmp-01",
        name: "TOF · Reconhecimento · Vídeo AVC Isquêmico",
        objective: "Visualizações de Vídeo (ThruPlay)",
        funnel: "Topo de Funil",
        status: "Pendente de Conexão",
        statusClass: "pending",
        budget: "R$ 25,00/dia",
        target: "Médicos generalistas & Estudantes de Medicina (Brasil)"
      },
      {
        id: "cmp-02",
        name: "MOF · Consideração · Carrossel 5 Condutas em Emergência",
        objective: "Tráfego para Perfil & Salvamentos",
        funnel: "Meio de Funil",
        status: "Pendente de Conexão",
        statusClass: "pending",
        budget: "R$ 20,00/dia",
        target: "Seguidores de Sanar, Medgrupo e páginas médicas"
      },
      {
        id: "cmp-03",
        name: "BOF · Conversão · Cadastro Gratuito na LURIA",
        objective: "Cadastros no Site (Lead)",
        funnel: "Fundo de Funil",
        status: "Pendente de Conexão",
        statusClass: "pending",
        budget: "R$ 30,00/dia",
        target: "Remarketing (Visitantes do site últimos 30 dias)"
      }
    ]
  };

  function adminPinGraceStorageKey() {
    const userId = String(state.user?.id || window.docmapUser?.id || "admin");
    return `${ADMIN_PIN_GRACE_KEY}:${userId}`;
  }

  function rememberAdminPinUnlock() {
    try {
      localStorage.setItem(
        adminPinGraceStorageKey(),
        String(Date.now() + ADMIN_PIN_GRACE_MS)
      );
    } catch (_) {}
  }

  function hasRecentAdminPinUnlock() {
    try {
      const key = adminPinGraceStorageKey();
      const expiresAt = Number(localStorage.getItem(key) || 0);
      if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        localStorage.removeItem(key);
        return false;
      }
      return true;
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
    if (title) {
      title.textContent = state.pinConfigured ? "Digite seu PIN" : "Cadastre seu PIN";
    }
    if (description) {
      description.textContent = state.pinConfigured
        ? "Digite os 6 dígitos do Admin para acessar o Marketing Hub."
        : "Este é seu primeiro acesso protegido. Crie um PIN de 6 dígitos.";
    }
    if (label) {
      label.textContent = state.pinConfigured ? "PIN de 6 dígitos" : "Criar PIN";
    }
    if (submit) {
      submit.textContent = state.pinConfigured ? "Desbloquear Editorial" : "Cadastrar PIN";
      submit.disabled = false;
    }

    setPinMessage(
      state.pinConfigured
        ? "O hub de marketing permanece protegido por PIN."
        : "O PIN será protegido e sincronizado com o Admin."
    );

    requestAnimationFrame(() => {
      $("admin-pin")?.focus();
    });
  }

  async function loadPinStatus() {
    const sb = window.supabaseClient || window.sb;
    if (!sb) return false;
    const { data, error } = await sb.rpc("admin_pin_status");
    if (error) throw error;
    const hasPin = data?.has_pin === true;
    setPinGateMode(hasPin);
    return hasPin;
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
    const pinInput = $("admin-pin");
    const confirmInput = $("admin-pin-confirm");
    const submit = $("admin-pin-submit");

    const pin = normalizePin(pinInput?.value);
    const confirmPin = normalizePin(confirmInput?.value);

    if (pinInput) pinInput.value = pin;
    if (confirmInput) confirmInput.value = confirmPin;

    if (pin.length !== 6) {
      setPinMessage("Digite exatamente 6 números.", "error");
      pinInput?.focus();
      return;
    }

    if (!state.pinConfigured && pin !== confirmPin) {
      setPinMessage("Os PINs digitados não coincidem.", "error");
      confirmInput?.focus();
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = state.pinConfigured ? "Verificando..." : "Salvando...";
    }

    const sb = window.supabaseClient || window.sb;
    try {
      if (!state.pinConfigured) {
        const { data, error } = await sb.rpc("admin_set_pin", { p_pin: pin });
        if (error || data !== true) {
          throw error || new Error("Não foi possível cadastrar o PIN.");
        }
        setPinMessage("PIN cadastrado com sucesso.", "success");
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
        setPinMessage(data?.message || "PIN incorreto. Tente novamente.", "error");
        if (pinInput) {
          pinInput.value = "";
          pinInput.focus();
        }
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Desbloquear Editorial";
        }
      }
    } catch (err) {
      console.error("[Editorial PIN Error]", err);
      setPinMessage("Erro ao validar PIN administrativo.", "error");
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Desbloquear Editorial";
      }
    }
  }

  function renderWeeklyPlanner() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div id="editorial-planner-board" class="editorial-planner-board">
        ${WEEK_PLAN.map((col) => {
          const hasPost = col.posts.length > 0;
          return `
            <div class="editorial-day-col ${hasPost ? "has-post" : ""}">
              <div class="editorial-col-header">
                <div class="editorial-col-day">
                  <span>${col.dayName}</span>
                  <small>${col.dateLabel}</small>
                </div>
                <span class="editorial-col-count ${hasPost ? "active-count" : ""}">
                  ${col.posts.length} ${col.posts.length === 1 ? "post" : "posts"}
                </span>
              </div>

              <div class="editorial-col-body">
                ${hasPost ? col.posts.map(post => `
                  <article class="planner-card">
                    <div class="planner-card-top">
                      <span class="planner-time">⏰ ${post.time}</span>
                      <span class="planner-badge badge-${post.badgeClass}">${post.badge}</span>
                    </div>

                    <h4 class="planner-title">${post.title}</h4>
                    <p class="planner-sub">${post.subtitle}</p>

                    <div class="planner-funnel">
                      <span class="funnel-tag ${post.funnelClass}">${post.funnel}</span>
                    </div>

                    <div class="planner-study">
                      <strong>🔬 Estudo & Rationale:</strong>
                      <p>${post.rationale}</p>
                    </div>

                    <div class="planner-action">
                      <strong>🎯 Roteiro de Gravação:</strong>
                      <p>${post.actionPlan}</p>
                    </div>

                    <div class="planner-meta">
                      <span>Formato: <strong>${post.type}</strong></span>
                      <span>Objetivo: <strong>${post.goal}</strong></span>
                      <span>Dimensões: <strong>${post.format}</strong></span>
                    </div>

                    <a href="${post.driveUrl}" target="_blank" rel="noopener noreferrer" class="button primary planner-card-btn">
                      📂 Ver no Google Drive
                    </a>
                  </article>
                `).join("") : `
                  <div class="editorial-col-empty">
                    <span>☕</span>
                    <p>Dia reservado sem postagens no feed</p>
                  </div>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderMonthlySchedule() {
    const container = $("editorial-view-container");
    if (!container) return;

    const monthData = MONTHLY_DATABASE[state.selectedMonth] || MONTHLY_DATABASE["2026-10"];

    container.innerHTML = `
      <div class="editorial-month-meta-bar">
        <div class="month-headline">
          <strong>${monthData.name} — ${monthData.theme}</strong>
          <span>Meta Geral: Alcançar ${monthData.targetReach} com conteúdo proprietário.</span>
        </div>
        <div class="month-kpis">
          <div class="month-kpi-item">
            <small>Posts Programados</small>
            <strong>${monthData.totalPosts}</strong>
          </div>
          <div class="month-kpi-item">
            <small>Orçamento Tráfego</small>
            <strong style="color: #4ade80;">${monthData.adBudgetPlanned}</strong>
          </div>
        </div>
      </div>

      <div class="editorial-month-grid">
        ${monthData.weeks.map(week => `
          <article class="month-week-card ${week.isCurrent ? "is-current" : ""}">
            <div class="month-week-header">
              <div class="month-week-badge-row">
                <span class="month-week-num">${week.weekTitle}</span>
                <span class="month-week-theme">${week.theme}</span>
              </div>
              <span class="planner-badge badge-${week.badgeClass}">${week.badge}</span>
            </div>

            <div class="month-week-goal">
              <strong>🎯 Meta Estratégica:</strong> ${week.goal}
            </div>

            <div class="month-posts-list">
              ${week.items.map(item => `
                <div class="month-post-item">
                  <div class="month-post-item-top">
                    <span class="month-post-day">${item.day}</span>
                    <span class="month-post-format">${item.format}</span>
                  </div>
                  <h5 class="month-post-title">${item.title}</h5>
                </div>
              `).join("")}
            </div>

            <div class="month-week-footer">
              <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener noreferrer" class="button secondary planner-card-btn">
                📂 Acessar Pasta da Semana no Drive
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderMetaAdsHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="meta-ads-hub">
        <!-- BANNER DE STATUS DA API -->
        <div class="meta-ads-api-banner">
          <div class="meta-ads-banner-copy">
            <strong>🌐 Meta Marketing API (Instagram & Facebook Ads)</strong>
            <p>
              Pronto para sincronização via Graph API v21.0. Ao vincular o <code>System User Access Token</code> e o <code>Ad Account ID</code>, as métricas de ROAS, CAC, CPC e conversões serão atualizadas automaticamente em tempo real.
            </p>
          </div>
          <div class="meta-ads-status-badge">
            <span class="status-dot pending"></span>
            Aguardando Token da API
          </div>
        </div>

        <!-- CARDS DE MÉTRICAS / KPIS DE TRÁFEGO PAGO -->
        <div class="meta-ads-kpis-grid">
          <div class="meta-ads-kpi-card">
            <span>Investimento Total</span>
            <strong>${META_ADS_MOCK.summary.spent}</strong>
            <small>Orçamento: ${META_ADS_MOCK.summary.budgetMonth}</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Impressões</span>
            <strong>${META_ADS_MOCK.summary.impressions}</strong>
            <small>CPM Estimado: ${META_ADS_MOCK.summary.cpm}</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Cliques no Link (CTR)</span>
            <strong>${META_ADS_MOCK.summary.clicks}</strong>
            <small>CTR: ${META_ADS_MOCK.summary.ctr} · CPC: ${META_ADS_MOCK.summary.cpc}</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Contas Criadas (Leads)</span>
            <strong style="color: #38bdf8;">${META_ADS_MOCK.summary.leads}</strong>
            <small>Custo por Lead: ${META_ADS_MOCK.summary.cpl}</small>
          </div>
        </div>

        <!-- TABELA DE CAMPANHAS E FUNIL -->
        <div class="meta-campaigns-table-card">
          <h3>Campanhas Configuradas para Impulsionamento</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Campanha</th>
                <th>Etapa do Funil</th>
                <th>Objetivo Meta</th>
                <th>Público-Alvo Segmentado</th>
                <th>Orçamento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${META_ADS_MOCK.campaigns.map(camp => `
                <tr>
                  <td><strong>${camp.name}</strong></td>
                  <td><span class="funnel-tag funnel-top">${camp.funnel}</span></td>
                  <td>${camp.objective}</td>
                  <td>${camp.target}</td>
                  <td>${camp.budget}</td>
                  <td>
                    <span class="status-dot ${camp.statusClass}"></span>
                    ${camp.status}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderCurrentView() {
    if (state.currentView === "weekly") {
      renderWeeklyPlanner();
    } else if (state.currentView === "monthly") {
      renderMonthlySchedule();
    } else if (state.currentView === "meta_ads") {
      renderMetaAdsHub();
    }

    $("tab-weekly")?.classList.toggle("active", state.currentView === "weekly");
    $("tab-monthly")?.classList.toggle("active", state.currentView === "monthly");
    $("tab-meta-ads")?.classList.toggle("active", state.currentView === "meta_ads");

    // Mostra/esconde o seletor de mês apenas na visão mensal
    const monthNav = $("editorial-month-nav");
    if (monthNav) {
      monthNav.hidden = state.currentView !== "monthly";
    }
  }

  function setupViewToggle() {
    $("tab-weekly")?.addEventListener("click", () => {
      state.currentView = "weekly";
      renderCurrentView();
    });

    $("tab-monthly")?.addEventListener("click", () => {
      state.currentView = "monthly";
      renderCurrentView();
    });

    $("tab-meta-ads")?.addEventListener("click", () => {
      state.currentView = "meta_ads";
      renderCurrentView();
    });

    $("month-select")?.addEventListener("change", (e) => {
      state.selectedMonth = e.target.value;
      renderCurrentView();
    });
  }

  async function init() {
    setupViewToggle();

    const form = $("admin-pin-form");
    if (form) {
      form.addEventListener("submit", submitEditorialPin);
    }

    const pinInput = $("admin-pin");
    if (pinInput) {
      pinInput.addEventListener("input", () => {
        pinInput.value = normalizePin(pinInput.value);
        if (pinInput.value.length === 6 && state.pinConfigured) {
          form?.requestSubmit();
        }
      });
    }

    const sb = window.supabaseClient || window.sb;
    if (!sb) {
      setPinMessage("Conectando ao serviço de autenticação...", "");
      setTimeout(init, 300);
      return;
    }

    try {
      const { data: { user } } = await sb.auth.getUser();
      state.user = user;

      let isAdmin = false;
      try {
        const { data: rpcAdmin, error: rpcErr } = await sb.rpc("is_admin");
        if (!rpcErr && rpcAdmin === true) {
          isAdmin = true;
        } else if (typeof window.verificarAcessoAdmin === "function") {
          isAdmin = await window.verificarAcessoAdmin();
        }
      } catch (_) {
        if (typeof window.verificarAcessoAdmin === "function") {
          isAdmin = await window.verificarAcessoAdmin();
        }
      }

      state.isAdmin = isAdmin;

      if (!isAdmin) {
        setPinMessage("Acesso restrito a administradores. Redirecionando...", "error");
        const submit = $("admin-pin-submit");
        if (submit) submit.disabled = true;
        setTimeout(() => {
          window.location.replace("/dashboard/");
        }, 800);
        return;
      }

      if (hasRecentAdminPinUnlock()) {
        unlockEditorialPage();
        return;
      }

      await loadPinStatus();
    } catch (err) {
      console.error("[Editorial Init Error]", err);
      setPinMessage("Falha ao carregar credenciais.", "error");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
