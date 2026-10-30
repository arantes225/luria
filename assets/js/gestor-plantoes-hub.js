(function () {
  "use strict";

  const STORAGE_KEY = "luria_plantoes_shifts_v1";

  function getShifts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Erro ao ler plantões:", e);
      return [];
    }
  }

  function formatBRL(val) {
    const num = Number(val) || 0;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatDate(isoDate) {
    if (!isoDate) return "";
    const parts = isoDate.split("-");
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return isoDate;
  }

  function parseShiftTime(shift) {
    if (!shift.date) return null;
    const [y, m, d] = shift.date.split("-").map(Number);
    let startHour = 7, startMin = 0;
    let dur = Number(shift.duration) || 12;

    const t = (shift.shiftType || "").toLowerCase();
    if (t.includes("noturno") || t.includes("19h às 07h") || t.includes("19h as 07h")) {
      startHour = 19;
    } else if (t.includes("vespertino") || t.includes("13h às 19h")) {
      startHour = 13;
    } else if (t.includes("matutino") || t.includes("07h às 13h")) {
      startHour = 7;
    } else if (t.includes("24h")) {
      startHour = 7;
      dur = 24;
    }

    const startDate = new Date(y, m - 1, d, startHour, startMin, 0);
    const endDate = new Date(startDate.getTime() + dur * 3600 * 1000);
    return { startDate, endDate, dur };
  }

  function renderRadar() {
    const radarContainer = document.getElementById("gm-smart-radar");
    if (!radarContainer) return;

    const shifts = getShifts();
    const now = new Date();

    let activeShift = null;
    let nextShift = null;
    let minDiffNext = Infinity;

    shifts.forEach(s => {
      const parsed = parseShiftTime(s);
      if (!parsed) return;
      if (now >= parsed.startDate && now < parsed.endDate) {
        activeShift = { ...s, ...parsed };
      } else if (parsed.startDate > now) {
        const diff = parsed.startDate.getTime() - now.getTime();
        if (diff < minDiffNext) {
          minDiffNext = diff;
          nextShift = { ...s, ...parsed, diffMs: diff };
        }
      }
    });

    if (activeShift) {
      const totalMs = activeShift.endDate.getTime() - activeShift.startDate.getTime();
      const elapsedMs = now.getTime() - activeShift.startDate.getTime();
      const pct = Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100)));
      const remainingHours = Math.max(0, Math.round((activeShift.endDate.getTime() - now.getTime()) / (3600 * 1000) * 10) / 10);

      radarContainer.innerHTML = `
        <div class="gm-radar-card live">
          <div class="gm-radar-badge-row">
            <span class="gm-radar-live-badge"><span class="gm-radar-pulse"></span> PLANTÃO EM ANDAMENTO</span>
            <span class="gm-radar-time">${formatDate(activeShift.date)} • Término previsto às ${activeShift.endDate.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}</span>
          </div>
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>${escapeHtml(activeShift.place || "Hospital")}</h3>
              <p>${escapeHtml(activeShift.sector || "Setor")} • Turno de ${activeShift.dur}h (${escapeHtml(activeShift.shiftType)})</p>
            </div>
            <div class="gm-radar-metric">
              <strong>${remainingHours}h</strong>
              <small>restantes</small>
            </div>
          </div>
          <div class="gm-radar-progress-bar">
            <div class="gm-radar-progress-fill" style="width: ${pct}%"></div>
          </div>
          <div class="gm-radar-actions">
            <a href="/trabalho/divisor-plantao/" class="gm-radar-btn primary">Dividir Descanso da Equipe →</a>
            <a href="/trabalho/passometro/" class="gm-radar-btn secondary">Abrir Passômetro / Leitos</a>
          </div>
        </div>
      `;
    } else if (nextShift) {
      const diffHours = Math.floor(nextShift.diffMs / (3600 * 1000));
      const diffDays = Math.floor(diffHours / 24);
      let timeLabel = "";
      if (diffDays > 0) {
        timeLabel = `Em ${diffDays} dia${diffDays > 1 ? "s" : ""} e ${diffHours % 24}h`;
      } else {
        timeLabel = `Em ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
      }

      radarContainer.innerHTML = `
        <div class="gm-radar-card upcoming">
          <div class="gm-radar-badge-row">
            <span class="gm-radar-upcoming-badge">PRÓXIMO PLANTÃO</span>
            <span class="gm-radar-time">${formatDate(nextShift.date)} às ${nextShift.startDate.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}</span>
          </div>
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>${escapeHtml(nextShift.place || "Hospital")}</h3>
              <p>${escapeHtml(nextShift.sector || "Setor")} • Turno de ${nextShift.dur}h (${escapeHtml(nextShift.shiftType)})</p>
            </div>
            <div class="gm-radar-metric countdown">
              <strong>${timeLabel}</strong>
              <small>para o início</small>
            </div>
          </div>
          <div class="gm-radar-actions">
            <a href="/trabalho/plantoes/" class="gm-radar-btn secondary">Ver Detalhes da Escala</a>
            <a href="/trabalho/divisor-plantao/" class="gm-radar-btn secondary">Preparar Divisão Prévia</a>
          </div>
        </div>
      `;
    } else {
      radarContainer.innerHTML = `
        <div class="gm-radar-card empty">
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>Nenhum plantão agendado para as próximas horas</h3>
              <p>Cadastre sua escala para ativar os alertas ao vivo, estimativa de repasses e contagem de horas.</p>
            </div>
            <div class="gm-radar-actions">
              <a href="/trabalho/plantoes/" class="gm-radar-btn primary">+ Cadastrar Plantão</a>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderMonthSummary() {
    const summaryContainer = document.getElementById("gm-summary-metrics");
    if (!summaryContainer) return;

    const shifts = getShifts();
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const thisMonth = shifts.filter(s => {
      if (!s.date) return false;
      const [y, m] = s.date.split("-").map(Number);
      return y === currentYear && m === currentMonth + 1;
    });

    const totalHours = thisMonth.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
    const totalEarned = thisMonth.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const paidEarned = thisMonth.filter(s => s.status === "pago").reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const pendingEarned = totalEarned - paidEarned;

    summaryContainer.innerHTML = `
      <div class="gm-summary-card">
        <span class="gm-sum-label">Plantões no Mês</span>
        <strong class="gm-sum-val">${thisMonth.length}</strong>
        <span class="gm-sum-sub">${totalHours}h acumuladas</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Previsão Faturada</span>
        <strong class="gm-sum-val">${formatBRL(totalEarned)}</strong>
        <span class="gm-sum-sub">Mês vigente</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Já Recebido</span>
        <strong class="gm-sum-val text-success">${formatBRL(paidEarned)}</strong>
        <span class="gm-sum-sub">${thisMonth.filter(s => s.status === "pago").length} plantões quitados</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Pendente de Repasse</span>
        <strong class="gm-sum-val text-warning">${formatBRL(pendingEarned)}</strong>
        <span class="gm-sum-sub">${thisMonth.filter(s => s.status !== "pago").length} plantões em aberto</span>
      </div>
    `;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderRadar();
    renderMonthSummary();
  });
})();
