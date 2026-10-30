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

  function saveShifts(shifts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shifts));
    } catch (e) {
      console.error("Erro ao salvar plantões:", e);
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

  let filterHospital = "all";
  let filterStatus = "all";

  function renderFinancialDashboard() {
    const shifts = getShifts();
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

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
    populateHospitalFilter(shifts);
  }

  function renderBreakdownByHospital(shifts) {
    const container = document.getElementById("fin-hospital-breakdown");
    if (!container) return;

    if (!shifts.length) {
      container.innerHTML = `<div class="fin-empty-state">Sem plantões cadastrados na Escala para análise por hospital.</div>`;
      return;
    }

    const map = {};
    let totalAllHosp = 0;

    shifts.forEach(s => {
      const h = s.place || "Outros";
      if (!map[h]) {
        map[h] = { total: 0, paid: 0, pending: 0, hours: 0, count: 0 };
      }
      const val = Number(s.value) || 0;
      const dur = Number(s.duration) || 0;
      map[h].total += val;
      map[h].hours += dur;
      map[h].count += 1;
      totalAllHosp += val;
      if (s.status === "pago") {
        map[h].paid += val;
      } else {
        map[h].pending += val;
      }
    });

    const sortedHospitals = Object.keys(map).sort((a, b) => map[b].total - map[a].total);

    container.innerHTML = sortedHospitals.map(h => {
      const data = map[h];
      const avgHourly = data.hours > 0 ? (data.total / data.hours) : 0;
      const pctTotal = totalAllHosp > 0 ? Math.round((data.total / totalAllHosp) * 100) : 0;

      return `
        <div class="fin-hosp-card">
          <div class="fin-hosp-head">
            <div>
              <strong class="fin-hosp-name">${escapeHtml(h)}</strong>
              <small class="fin-hosp-meta">${data.count} plantões • ${data.hours}h totais • Média de ${formatBRL(avgHourly)}/h</small>
            </div>
            <div style="text-align:right">
              <span class="fin-hosp-val">${formatBRL(data.total)}</span>
              <span class="fin-hosp-pct">${pctTotal}% do faturamento</span>
            </div>
          </div>
          <div class="fin-hosp-bar-track">
            <div class="fin-hosp-bar-fill" style="width: ${pctTotal}%"></div>
          </div>
          <div class="fin-hosp-badges">
            <span class="badge-tag paid">Quitado: ${formatBRL(data.paid)}</span>
            <span class="badge-tag pending">Pendente: ${formatBRL(data.pending)}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderPendingTable(shifts) {
    const tableBody = document.getElementById("fin-pending-table-body");
    if (!tableBody) return;

    let filtered = [...shifts];
    if (filterHospital !== "all") {
      filtered = filtered.filter(s => (s.place || "").trim() === filterHospital);
    }
    if (filterStatus === "pending") {
      filtered = filtered.filter(s => s.status !== "pago");
    } else if (filterStatus === "paid") {
      filtered = filtered.filter(s => s.status === "pago");
    }

    // Ordenar decrescente por data
    filtered.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    if (!filtered.length) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding:24px;color:var(--muted)">Nenhum repasse encontrado com os filtros selecionados.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(s => {
      const isPaid = s.status === "pago";
      const statusBadge = isPaid
        ? `<span class="badge-tag paid">Quitado</span>`
        : `<span class="badge-tag pending">A Receber</span>`;

      return `
        <tr>
          <td><strong>${formatDate(s.date)}</strong></td>
          <td>${escapeHtml(s.place || "—")}</td>
          <td>${escapeHtml(s.sector || "Geral")}</td>
          <td>${s.duration || 12}h</td>
          <td><strong>${formatBRL(s.value)}</strong></td>
          <td>${statusBadge}</td>
          <td>
            <button class="shift-action-btn" type="button" data-action="toggle-pay" data-id="${s.id}">
              ${isPaid ? "Desmarcar" : "Confirmar Recebimento"}
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  function populateHospitalFilter(shifts) {
    const select = document.getElementById("fin-filter-hospital");
    if (!select) return;

    const hospitals = Array.from(new Set(shifts.map(s => (s.place || "").trim()).filter(Boolean)));
    const currentVal = select.value;
    select.innerHTML = `<option value="all">Todos os Hospitais</option>` + hospitals.map(h => {
      return `<option value="${escapeHtml(h)}">${escapeHtml(h)}</option>`;
    }).join("");
    if (hospitals.includes(currentVal)) {
      select.value = currentVal;
    }
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
    const tableBody = document.getElementById("fin-pending-table-body");
    if (tableBody) {
      tableBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action='toggle-pay']");
        if (!btn) return;
        const id = btn.dataset.id;
        const shifts = getShifts();
        const shift = shifts.find(s => s.id === id);
        if (shift) {
          shift.status = shift.status === "pago" ? "pendente" : "pago";
          saveShifts(shifts);
          renderFinancialDashboard();
        }
      });
    }

    const selectHosp = document.getElementById("fin-filter-hospital");
    if (selectHosp) {
      selectHosp.addEventListener("change", (e) => {
        filterHospital = e.target.value;
        renderPendingTable(getShifts());
      });
    }

    const selectStat = document.getElementById("fin-filter-status");
    if (selectStat) {
      selectStat.addEventListener("change", (e) => {
        filterStatus = e.target.value;
        renderPendingTable(getShifts());
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFinancialDashboard();
    setupEvents();
  });
})();
