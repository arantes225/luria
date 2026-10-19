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
    currentView: "weekly" // "weekly" ou "monthly"
  };

  const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link";

  // PLANNER SEMANAL DETALHADO (7 DIAS)
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
          badge: "Abertura",
          badgeClass: "ready",
          title: "5 Condutas em Emergência que Mudaram nas Últimas Diretrizes",
          subtitle: "Diretrizes Atuais · Cuidados Críticos & PS",
          rationale: "Estudos de mercado mostram que a janela de almoço de terça-feira tem o maior pico de salvamento de carrosséis educativos para o público médico.",
          actionPlan: "Apresentar 5 condutas contra-intuitivas (ex: O2 liberal, bicarbonato, reposição rápida de K+). CTA para salvar e consultar no plantão.",
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
          badge: "Ultra Blaster",
          badgeClass: "progress",
          title: "AVC ou Hipoglicemia? O Erro de 2 Minutos que Pode Custar o Delta T",
          subtitle: "Neurologia / Emergência · Delta T & HGT",
          rationale: "Reels postados na transição de saída do trabalho (19h30) atingem grande público não-seguidor. 30s maximiza retenção completa.",
          actionPlan: "Caso simulado com paciente apresentando déficit focal súbito e desvio de rima. Ponto central: HGT imediato antes da TC.",
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
          badge: "Método de Estudo",
          badgeClass: "ready",
          title: "Curva do Esquecimento na Medicina: Por que Ler a Apostila 3x Não Funciona",
          subtitle: "Neurociência · Repetição Espaçada",
          rationale: "Quinta ao meio-dia é o ápice do cansaço mental do estudante de medicina; busca por eficiência e ferramentas de retenção.",
          actionPlan: "Demonstrar a perda de memória após 24h e 7 dias. Comparar estudo passivo vs estudo ativo (active recall). Metodologia LURIA.",
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
          badge: "Pulo do Gato",
          badgeClass: "planned",
          title: "ECG em 30 Segundos: O Sinal Silencioso da Hipercalemia Grave",
          subtitle: "Cardiologia & Nefro · Onda T Apiculada",
          rationale: "Médicos e internos entrando no plantão compartilham pílulas rápidas em grupos de WhatsApp e DMs.",
          actionPlan: "Traçado eletrocardiográfico real e indicação imediata de gluconato de cálcio a 10% como estabilizador de membrana.",
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
          badge: "Gamificação",
          badgeClass: "planned",
          title: "Desafio Clínico do Domingo: Dor Torácica Súbita no PS",
          subtitle: "Simulador de Casos · Enquetes",
          rationale: "Domingo à noite registra alto tempo de tela de relaxamento pré-semana. Alto índice de respostas em enquetes interativas.",
          actionPlan: "Sequência de 5 Stories: Caso -> Exame físico -> Imagem/ECG -> Enquete de conduta -> Resolução comentada.",
          format: "Stories Interativos",
          driveUrl: DRIVE_FOLDER,
          status: "Planejado"
        }
      ]
    }
  ];

  // CRONOGRAMA MENSAL ESTRUTURADO (4 SEMANAS)
  const MONTH_PLAN = [
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
      goal: "Resolver a insegurança do estudante no internato (antibióticos, hidratação, distúrbios hidroeletrolíticos).",
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
      theme: "Estratégia de Estudos & Questões de Alta Dificuldade",
      goal: "Atrair o público de vestibulandos e residentes com foco em simulados, editais e pegadinhas de banca.",
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
      weekTitle: "Semana 4 · Tomada de Decisão Sob Pressão",
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
  ];

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
        ? "Digite os 6 dígitos do Admin para acessar o Planejador Editorial."
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
        ? "O planejamento permanece protegido por PIN."
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

                    <div class="planner-study">
                      <strong>🔬 Estudo & Rationale:</strong>
                      <p>${post.rationale}</p>
                    </div>

                    <div class="planner-action">
                      <strong>🎯 Roteiro:</strong>
                      <p>${post.actionPlan}</p>
                    </div>

                    <div class="planner-meta">
                      <span>Formato: <strong>${post.type}</strong></span>
                      <span>Objetivo: <strong>${post.goal}</strong></span>
                      <span>Dimensões: <strong>${post.format}</strong></span>
                    </div>

                    <a href="${post.driveUrl}" target="_blank" rel="noopener noreferrer" class="button primary planner-card-btn">
                      📂 Ver no Drive
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

    container.innerHTML = `
      <div class="editorial-month-grid">
        ${MONTH_PLAN.map(week => `
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

  function renderCurrentView() {
    if (state.currentView === "weekly") {
      renderWeeklyPlanner();
    } else {
      renderMonthlySchedule();
    }

    $("tab-weekly")?.classList.toggle("active", state.currentView === "weekly");
    $("tab-monthly")?.classList.toggle("active", state.currentView === "monthly");
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
