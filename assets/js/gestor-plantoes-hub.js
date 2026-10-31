(function gestorHubModule() {
  "use strict";

  const C = window.LuriaShiftCore;
  if (!C) return;

  function renderRadar() {
    const radarContainer = document.getElementById("gm-smart-radar");
    if (!radarContainer) return;

    const shifts = C.getShifts();
    const now = new Date();
    const todayIso = C.isoToday();

    let activeShift = null;
    let nextShift = null;
    let minDiffNext = Infinity;

    shifts.forEach(s => {
      if (!s.date || s.status === "trocado") return;
      const [y, m, d] = s.date.split("-").map(Number);
      const [sh, sm] = (s.startTime || "07:00").split(":").map(Number);
      const [eh, em] = (s.endTime || "19:00").split(":").map(Number);

      const startDate = new Date(y, m - 1, d, sh, sm, 0);
      let endDate = null;
      if (s.endDate) {
        const [ey, emon, ed] = s.endDate.split("-").map(Number);
        endDate = new Date(ey, emon - 1, ed, eh, em, 0);
      } else {
        const durMin = C.durationMinutes(s.date, s.startTime || "07:00", "", s.endTime || "19:00");
        endDate = new Date(startDate.getTime() + (Number.isFinite(durMin) ? durMin : 720) * 60 * 1000);
      }

      if (now >= startDate && now < endDate) {
        activeShift = { ...s, startDate, endDate };
      } else if (startDate > now) {
        const diff = startDate.getTime() - now.getTime();
        if (diff < minDiffNext) {
          minDiffNext = diff;
          nextShift = { ...s, startDate, endDate, diffMs: diff };
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
            <span class="gm-radar-time">${C.formatDate(activeShift.date)} • Término previsto às ${activeShift.endDate.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}</span>
          </div>
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>${C.escapeHtml(activeShift.place || "Hospital")}</h3>
              <p>${C.escapeHtml(activeShift.sector || "Setor")} • ${C.escapeHtml(activeShift.startTime || "07:00")} às ${C.escapeHtml(activeShift.endTime || "19:00")} • ${C.formatMoney(activeShift.value)}</p>
            </div>
            <div class="gm-radar-metric">
              <strong>${remainingHours}h</strong>
              <small>restantes (${pct}% concluído)</small>
            </div>
          </div>
          <div class="gm-radar-progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="gm-radar-progress-fill" style="width: ${pct}%"></div>
          </div>
          <div class="gm-radar-actions">
            <a href="/trabalho/divisor-descanso/" class="gm-radar-btn primary">Organizar Descanso da Equipe →</a>
            <a href="/trabalho/passometro/" class="gm-radar-btn secondary">Passagem de Plantão / Leitos</a>
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
            <span class="gm-radar-time">${C.formatDate(nextShift.date)} às ${nextShift.startDate.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}</span>
          </div>
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>${C.escapeHtml(nextShift.place || "Hospital")}</h3>
              <p>${C.escapeHtml(nextShift.sector || "Setor")} • ${C.escapeHtml(nextShift.startTime || "07:00")} às ${C.escapeHtml(nextShift.endTime || "19:00")} • ${C.formatMoney(nextShift.value)}</p>
            </div>
            <div class="gm-radar-metric countdown">
              <strong>${timeLabel}</strong>
              <small>para o início</small>
            </div>
          </div>
          <div class="gm-radar-actions">
            <button type="button" class="gm-radar-btn secondary" onclick="document.getElementById('shift-calendar')?.scrollIntoView({behavior:'smooth'})">Ver Escala Semanal</button>
            <a href="/trabalho/divisor-descanso/" class="gm-radar-btn secondary">Planejar Descanso</a>
          </div>
        </div>
      `;
    } else {
      radarContainer.innerHTML = `
        <div class="gm-radar-card empty">
          <div class="gm-radar-body">
            <div class="gm-radar-info">
              <h3>Nenhum plantão agendado para as próximas horas</h3>
              <p>Cadastre sua escala para ativar os alertas ao vivo, previsões de repasses e métricas financeiras.</p>
            </div>
            <div class="gm-radar-actions">
              <button type="button" class="gm-radar-btn primary" onclick="document.getElementById('shift-add')?.click() || document.getElementById('shift-modal')?.showModal()">+ Adicionar Plantão</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderMonthSummary() {
    const summaryContainer = document.getElementById("gm-summary-metrics");
    if (!summaryContainer) return;

    const shifts = C.getShifts();
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // 1. Plantões no mês (contagem realizada/escalada no mês de referência) e valor total acumulado para receber
    const shiftsInCurrentMonth = shifts.filter(s => s.date?.slice(0, 7) === currentMonthKey && s.status !== "trocado");
    const countShiftsCurrentMonth = shiftsInCurrentMonth.length;
    const totalAccumulatedToReceive = shifts.filter(s => s.status !== "trocado").reduce((acc, s) => acc + C.outstanding(s), 0);

    // 2. Previsão bruta (recebimento NESTE mês, baseado na data de previsão de recebimento)
    const dueThisMonth = shifts.filter(s => {
      if (s.status === "trocado") return false;
      const targetDate = s.expectedDate || s.date;
      return targetDate && targetDate.slice(0, 7) === currentMonthKey;
    });

    const grossForecastThisMonth = dueThisMonth.reduce((acc, s) => acc + C.num(s.value), 0);

    // 3. Previsão líquida (descontando retenções fiscais/alíquota configurada e taxas de repasse)
    const taxSettings = C.getTaxSettings ? C.getTaxSettings() : { estimatedRate: null, monthlyCosts: 0 };
    const effectiveRate = taxSettings && typeof taxSettings.estimatedRate === "number" ? taxSettings.estimatedRate : 0;
    const withheldTaxThisMonth = dueThisMonth.reduce((acc, s) => acc + C.num(s.withheldTax), 0);
    const feesThisMonth = dueThisMonth.reduce((acc, s) => acc + C.num(s.payerFee), 0);
    const estimatedTaxTotal = (grossForecastThisMonth * effectiveRate) / 100;
    const netForecastThisMonth = Math.max(0, grossForecastThisMonth - Math.max(withheldTaxThisMonth, estimatedTaxTotal) - feesThisMonth);

    // 4. Já recebido neste mês
    const receivedThisMonth = dueThisMonth.reduce((acc, s) => acc + C.num(s.receivedAmount), 0);

    // 5. A receber neste mês (saldo pendente de plantões previstos para este mês)
    const outstandingThisMonth = dueThisMonth.reduce((acc, s) => acc + C.outstanding(s), 0);

    summaryContainer.innerHTML = `
      <div class="gm-summary-card">
        <span class="gm-sum-label">Plantões no Mês</span>
        <strong class="gm-sum-val">${countShiftsCurrentMonth}</strong>
        <span class="gm-sum-sub">${C.formatMoney(totalAccumulatedToReceive)} a receber geral</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Previsão Bruta</span>
        <strong class="gm-sum-val">${C.formatMoney(grossForecastThisMonth)}</strong>
        <span class="gm-sum-sub">Recebimento neste mês</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Previsão Líquida</span>
        <strong class="gm-sum-val text-success">${C.formatMoney(netForecastThisMonth)}</strong>
        <span class="gm-sum-sub">${effectiveRate > 0 ? (effectiveRate + '% aliq. est.') : 'Líquido estimado'}</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">Já Recebido</span>
        <strong class="gm-sum-val text-success">${C.formatMoney(receivedThisMonth)}</strong>
        <span class="gm-sum-sub">Depositado do mês</span>
      </div>
      <div class="gm-summary-card">
        <span class="gm-sum-label">A Receber</span>
        <strong class="gm-sum-val text-warning">${C.formatMoney(outstandingThisMonth)}</strong>
        <span class="gm-sum-sub">Saldo em aberto</span>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderRadar();
    renderMonthSummary();
  });
  window.addEventListener("luria:plantoes:changed", () => {
    renderRadar();
    renderMonthSummary();
  });
})();
