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
    activeTab: "overview",
    calendar: []
  };

  const EDITORIAL_DATA = [
    {
      id: "sem-1",
      week: "Semana 1 - Outubro",
      badge: "Pronto para Publicação",
      badgeClass: "ready",
      title: "Diagnóstico Rápido de AVC Isquêmico no PS",
      sub: "AVC Isquêmico · Delta T · HGT de Emergência",
      format: "Ultra Motion (12 KB)",
      status: "Aprovado",
      summary: "Ponto-chave clínico: teste obrigatório de HGT antes de levar o paciente à Tomografia Computadorizada para descartar 'stroke mimic' hipoglicêmico.",
      demoUrl: "/demo-avc.html",
      metrics: {
        readTime: "32s",
        targetAudience: "Médicos generalistas & Residentes",
        channel: "Instagram Reels & TikTok"
      }
    },
    {
      id: "sem-2",
      week: "Semana 2 - Outubro",
      badge: "Em Produção",
      badgeClass: "progress",
      title: "Hipercalemia Grave com Alteração de ECG",
      sub: "Nefro / Emergência · Gluconato de Cálcio 10%",
      format: "Ultra Motion + Carrossel",
      status: "Em Roteirização",
      summary: "Diferenciação do papel do Gluconato de Cálcio (estabilizador de membrana cardíaca) vs medidas de 'shift' intracelular (Insulina + Glicose, Nebulização com beta-2).",
      demoUrl: null,
      metrics: {
        readTime: "45s",
        targetAudience: "Plantão & Terapia Intensiva",
        channel: "Reels / Carrossel Educativo"
      }
    },
    {
      id: "sem-3",
      week: "Semana 3 - Outubro",
      badge: "Planejado",
      badgeClass: "planned",
      title: "Critérios de Wells & Manejo do TEP",
      sub: "Pneumo / Emergência · Escore de Wells & D-Dímero",
      format: "Carrossel Interativo",
      status: "Backlog",
      summary: "Fluxograma de tomada de decisão: quando pedir D-Dímero vs Angiotomografia de Tórax direto.",
      demoUrl: null,
      metrics: {
        readTime: "1m",
        targetAudience: "Internato & Médicos de Emergência",
        channel: "Carrossel de Slides"
      }
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
    return String(value || "")
      .replace(/\D/g, "")
      .slice(0, 6);
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
          <span class="editorial-week-tag">${item.week}</span>
          <span class="editorial-badge badge-${item.badgeClass}">${item.badge}</span>
        </div>
        <h3 class="editorial-title">${item.title}</h3>
        <p class="editorial-sub">${item.sub}</p>
        <p class="editorial-summary">${item.summary}</p>
        
        <div class="editorial-meta-grid">
          <div class="editorial-meta-item">
            <span class="meta-label">Formato</span>
            <strong class="meta-val">${item.format}</strong>
          </div>
          <div class="editorial-meta-item">
            <span class="meta-label">Duração</span>
            <strong class="meta-val">${item.metrics.readTime}</strong>
          </div>
          <div class="editorial-meta-item">
            <span class="meta-label">Canal</span>
            <strong class="meta-val">${item.metrics.channel}</strong>
          </div>
        </div>

        <div class="editorial-card-actions">
          ${item.demoUrl ? `
            <a href="${item.demoUrl}" target="_blank" class="button primary editorial-demo-btn">
              ▶ Assistir Prévia (< 500 KB)
            </a>
          ` : `
            <button class="button secondary" disabled>Roteiro em Revisão</button>
          `}
          <button class="button text" onclick="alert('Histórico e notas editoriais gravadas com sucesso.')">
            Notas de Produção
          </button>
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
