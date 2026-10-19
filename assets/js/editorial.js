(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const ADMIN_PIN_GRACE_MS = 30 * 60 * 1000;
  const ADMIN_PIN_GRACE_KEY = "luria-admin-pin-unlocked-until";

  const state = {
    user: null,
    isAdmin: false,
    pinConfigured: false,
    pinUnlocked: false
  };

  const EDITORIAL_DATA = [
    {
      id: "post-1",
      day: "Terça-feira · 12h00",
      type: "Carrossel Técnico (7 Slides)",
      goal: "Autoridade & Saves",
      badge: "Semana 1 - Abertura",
      badgeClass: "ready",
      title: "5 Condutas em Emergência que Mudaram nas Últimas Diretrizes",
      subtitle: "Diretrizes Atuais · Cuidados Críticos & Pronto-Socorro",
      rationale: "Estudos de mercado (Sprout Social / Metricool 2024/2025) mostram que a janela de almoço de terça-feira tem o maior pico de salvamento de carrosséis educativos para o público médico.",
      actionPlan: "Apresentar 5 condutas contra-intuitivas (ex: oxigenioterapia liberal em IAM/AVC, bicarbonato em PCR, reposição rápida de potássio). Terminar com CTA para salvar para consulta rápida no plantão.",
      channel: "Instagram Feed (Carrossel 1080x1350)",
      driveUrl: "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link",
      status: "Pronto para Agendamento"
    },
    {
      id: "post-2",
      day: "Quarta-feira · 19h30",
      type: "Reels / Vídeo Full HD (30s)",
      goal: "Alcance & Descoberta",
      badge: "Ultra Max Blaster",
      badgeClass: "progress",
      title: "AVC ou Hipoglicemia? O Erro de 2 Minutos que Pode Custar o Delta T",
      subtitle: "Neurologia / Emergência · Delta T & HGT Obrigatório",
      rationale: "Reels postados na transição de saída do trabalho (19h30) atingem o maior público que ainda não segue o perfil. Formato de 30s maximiza a retenção de tela de 100%.",
      actionPlan: "Roteiro dinâmico com paciente simulado apresentando déficit focal e desvio de rima. Ponto central: glicemia capilar imediata antes da tomografia. Finaliza provocando discussão nos comentários.",
      channel: "Reels & TikTok (1080x1920 60fps)",
      driveUrl: "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link",
      status: "Renderização em 4K"
    },
    {
      id: "post-3",
      day: "Quinta-feira · 12h30",
      type: "Carrossel Mental (5 Slides)",
      goal: "Dor do Estudante & Retenção",
      badge: "Método de Estudo",
      badgeClass: "ready",
      title: "Curva do Esquecimento na Medicina: Por que Ler a Apostila 3x Não Funciona",
      subtitle: "Neurociência do Aprendizado · Repetição Espaçada & Flashcards",
      rationale: "Quinta-feira ao meio-dia é o ápice do cansaço mental do estudante de medicina, momento em que ele mais busca estratégias de eficiência de estudo e ferramentas de retenção.",
      actionPlan: "Mostrar a taxa de perda de memória após 24h e 7 dias. Contrastar estudo passivo (grifos/releitura) com estudo ativo (testes diários e active recall). Introdução sutil da metodologia LURIA.",
      channel: "Instagram Feed (Carrossel 1080x1350)",
      driveUrl: "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link",
      status: "Em Diagramação"
    },
    {
      id: "post-4",
      day: "Sexta-feira · 18h30",
      type: "Reels Curto / Pílula (20s)",
      goal: "Compartilhamento Rápido",
      badge: "Pulo do Gato",
      badgeClass: "planned",
      title: "ECG em 30 Segundos: O Sinal Silencioso da Hipercalemia Grave",
      subtitle: "Cardiologia & Nefro · Onda T Apiculada & QRS Alargado",
      rationale: "Sexta-feira no fim da tarde médicos e internos entrando no plantão compartilham pílulas rápidas em grupos de WhatsApp e mensagens diretas.",
      actionPlan: "Análise ultra rápida de traçado eletrocardiográfico real com transição para gluconato de cálcio a 10% como estabilizador elétrico de membrana imediato.",
      channel: "Reels (1080x1920)",
      driveUrl: "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link",
      status: "Em Roteiro"
    },
    {
      id: "post-5",
      day: "Domingo · 20h00",
      type: "Stories Interativos + Caso Clínico",
      goal: "Engajamento & Interação",
      badge: "Gamificação",
      badgeClass: "planned",
      title: "Desafio Clínico do Domingo: Dor Torácica Súbita no PS",
      subtitle: "Simulador de Casos · Enquetes & Diagnóstico Diferencial",
      rationale: "Domingo à noite registra o maior tempo de tela de relaxamento pré-semana. Usuários respondem ativamente a enquetes de múltiplos passos nos Stories.",
      actionPlan: "Sequência de 5 Stories: História clínica -> Exame físico -> Imagem/ECG -> Enquete de conduta -> Resolução detalhada com gabarito comentado.",
      channel: "Instagram Stories (Interativo)",
      driveUrl: "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link",
      status: "Planejado"
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
        ? "Digite os 6 dígitos do Admin para acessar a página Editorial."
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
        ? "A área editorial permanece protegida por PIN."
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

    renderEditorialList();
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

  function renderEditorialList() {
    const list = $("editorial-cards-list");
    if (!list) return;

    list.innerHTML = EDITORIAL_DATA.map((item) => `
      <article class="editorial-card ${item.badgeClass}">
        <div class="editorial-card-header">
          <span class="editorial-week-tag">📅 ${item.day}</span>
          <span class="editorial-badge badge-${item.badgeClass}">${item.badge}</span>
        </div>

        <h3 class="editorial-title">${item.title}</h3>
        <p class="editorial-sub">${item.subtitle}</p>
        
        <div class="editorial-study-box">
          <strong>🔬 Base Científica & Estudo de Mercado:</strong>
          <p>${item.rationale}</p>
        </div>

        <div class="editorial-action-box">
          <strong>🎯 Roteiro & Plano de Ação:</strong>
          <p>${item.actionPlan}</p>
        </div>

        <div class="editorial-meta-grid">
          <div class="editorial-meta-item">
            <span class="meta-label">Formato</span>
            <strong class="meta-val">${item.type}</strong>
          </div>
          <div class="editorial-meta-item">
            <span class="meta-label">Objetivo</span>
            <strong class="meta-val">${item.goal}</strong>
          </div>
          <div class="editorial-meta-item">
            <span class="meta-label">Canal</span>
            <strong class="meta-val">${item.channel}</strong>
          </div>
        </div>

        <div class="editorial-card-actions">
          <a href="${item.driveUrl}" target="_blank" rel="noopener noreferrer" class="button primary editorial-drive-btn">
            📂 Abrir no Google Drive (Ultra HD)
          </a>
          <span class="editorial-status-pill">${item.status}</span>
        </div>
      </article>
    `).join("");
  }

  async function init() {
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

      // Validação estrita de admin usando RPC oficial da plataforma
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

      // Se já tem grace period ativo do Admin:
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
