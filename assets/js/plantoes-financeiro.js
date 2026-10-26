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

  function renderFinancialDashboard() {
    const shifts = getShifts();
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // Mês Atual
    const thisMonthShifts = shifts.filter(s => {
      if (!s.date) return false;
      const [y, m] = s.date.split("-").map(Number);
      return y === currentYear && m === currentMonth + 1;
    });

    const totalThisMonth = thisMonthShifts.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const paidThisMonth = thisMonthShifts.filter(s => s.status === "pago").reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const pendingThisMonth = thisMonthShifts.filter(s => s.status !== "pago").reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const hoursThisMonth = thisMonthShifts.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
    const hourlyRateThisMonth = hoursThisMonth > 0 ? (totalThisMonth / hoursThisMonth) : 0;

    // Total Geral
    const grandTotal = shifts.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const grandPaid = shifts.filter(s => s.status === "pago").reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const grandPending = shifts.filter(s => s.status !== "pago").reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const grandHours = shifts.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

    const elThisTotal = document.getElementById("fin-month-total");
    const elThisPaid = document.getElementById("fin-month-paid");
    const elThisPending = document.getElementById("fin-month-pending");
    const elThisHourly = document.getElementById("fin-month-hourly");

    const elGrandTotal = document.getElementById("fin-grand-total");
    const elGrandPaid = document.getElementById("fin-grand-paid");
    const elGrandPending = document.getElementById("fin-grand-pending");
    const elGrandHours = document.getElementById("fin-grand-hours");

    if (elThisTotal) elThisTotal.textContent = formatBRL(totalThisMonth);
    if (elThisPaid) elThisPaid.textContent = formatBRL(paidThisMonth);
    if (elThisPending) elThisPending.textContent = formatBRL(pendingThisMonth);
    if (elThisHourly) elThisHourly.textContent = `${formatBRL(hourlyRateThisMonth)}/h`;

    if (elGrandTotal) elGrandTotal.textContent = formatBRL(grandTotal);
    if (elGrandPaid) elGrandPaid.textContent = formatBRL(grandPaid);
    if (elGrandPending) elGrandPending.textContent = formatBRL(grandPending);
    if (elGrandHours) elGrandHours.textContent = `${grandHours}h`;

    renderBreakdownByHospital(shifts);
    renderPendingTable(shifts);
  }

  function renderBreakdownByHospital(shifts) {
    const container = document.getElementById("fin-hospital-breakdown");
    if (!container) return;

    if (!shifts.length) {
      container.innerHTML = `<div class="fin-empty-state">Sem dados suficientes cadastrados na Escala.</div>`;
      return;
    }

    const map = {};
    shifts.forEach(s => {
      const place = s.place ? s.place.trim() : "Outros / Diversos";
      if (!map[place]) {
        map[place] = { total: 0, paid: 0, pending: 0, count: 0, hours: 0 };
      }
      const val = Number(s.value) || 0;
      const h = Number(s.duration) || 0;
      map[place].total += val;
      map[place].count += 1;
      map[place].hours += h;
      if (s.status === "pago") {
        map[place].paid += val;
      } else {
        map[place].pending += val;
      }
    });

    const entries = Object.entries(map).sort((a, b) => b[1].total - a[1].total);

    container.innerHTML = `
      <div class="fin-table-wrap">
        <table class="fin-table">
          <thead>
            <tr>
              <th>Hospital / Local</th>
              <th>Plantões</th>
              <th>Horas</th>
              <th>Total Bruto</th>
              <th>Recebido</th>
              <th>Pendente</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map(([place, data]) => `
              <tr>
                <td><strong>${escapeHtml(place)}</strong></td>
                <td>${data.count}</td>
                <td>${data.hours}h</td>
                <td><strong>${formatBRL(data.total)}</strong></td>
                <td class="text-success">${formatBRL(data.paid)}</td>
                <td class="text-warning">${formatBRL(data.pending)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderPendingTable(shifts) {
    const container = document.getElementById("fin-pending-table-container");
    if (!container) return;

    const pending = shifts.filter(s => s.status !== "pago").sort((a, b) => (a.date || "").localeCompare(b.date || ""));

    if (!pending.length) {
      container.innerHTML = `
        <div class="fin-empty-state success">
          <span style="font-size:24px">🎉</span>
          <p>Nenhum repasse pendente! Todos os plantões registrados constam como pagos.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="fin-table-wrap">
        <table class="fin-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hospital / Local</th>
              <th>Setor / Turno</th>
              <th>Valor Previsto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${pending.map(s => `
              <tr data-id="${s.id}">
                <td>${formatDate(s.date)}</td>
                <td><strong>${escapeHtml(s.place || "—")}</strong></td>
                <td>${escapeHtml(s.sector || "Geral")} (${s.duration || 12}h)</td>
                <td><strong>${formatBRL(s.value)}</strong></td>
                <td>
                  <button class="fin-mini-btn" type="button" data-action="mark-paid" data-id="${s.id}">
                    Confirmar Pagamento
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function formatDate(isoDate) {
    if (!isoDate) return "";
    const parts = isoDate.split("-");
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return isoDate;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setupEvents() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action='mark-paid']");
      if (!btn) return;
      const id = btn.dataset.id;
      const shifts = getShifts();
      const shift = shifts.find(s => s.id === id);
      if (shift) {
        shift.status = "pago";
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(shifts));
        } catch (err) {
          console.error(err);
        }
        renderFinancialDashboard();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFinancialDashboard();
    setupEvents();
  });
})();
