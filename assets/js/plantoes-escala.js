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
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  }

  function renderStats(shifts) {
    const totalCount = shifts.length;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const thisMonthShifts = shifts.filter(s => {
      if (!s.date) return false;
      const [y, m] = s.date.split("-").map(Number);
      return y === currentYear && m === currentMonth + 1;
    });

    const totalHours = thisMonthShifts.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
    const totalEarned = thisMonthShifts.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
    const paidShifts = thisMonthShifts.filter(s => s.status === "pago").length;

    const elTotalShifts = document.getElementById("stat-total-shifts");
    const elTotalHours = document.getElementById("stat-total-hours");
    const elTotalEarned = document.getElementById("stat-total-earned");
    const elPaidCount = document.getElementById("stat-paid-count");

    if (elTotalShifts) elTotalShifts.textContent = `${thisMonthShifts.length} plantões`;
    if (elTotalHours) elTotalHours.textContent = `${totalHours} horas`;
    if (elTotalEarned) elTotalEarned.textContent = formatBRL(totalEarned);
    if (elPaidCount) elPaidCount.textContent = `${paidShifts} de ${thisMonthShifts.length} pagos`;
  }

  function renderList(shifts) {
    const listEl = document.getElementById("shifts-list-container");
    if (!listEl) return;

    if (!shifts.length) {
      listEl.innerHTML = `
        <div class="shift-empty-state">
          <div class="shift-empty-icon">📅</div>
          <h3>Nenhum plantão cadastrado</h3>
          <p>Adicione seu primeiro plantão no formulário ao lado para começar o acompanhamento da sua escala e repasses.</p>
        </div>
      `;
      return;
    }

    // Ordenar por data decrescente
    const sorted = [...shifts].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    listEl.innerHTML = sorted.map((s, idx) => {
      const statusBadgeClass = s.status === "pago" ? "status-paid" : s.status === "trocado" ? "status-swapped" : "status-pending";
      const statusLabel = s.status === "pago" ? "Pago" : s.status === "trocado" ? "Trocado / Cedido" : "Aguardando Repasse";

      return `
        <div class="shift-item-card" data-id="${s.id || idx}">
          <div class="shift-item-header">
            <div>
              <span class="shift-item-date">${formatDate(s.date)}</span>
              <strong class="shift-item-place">${escapeHtml(s.place || "Hospital / Local")}</strong>
              <small class="shift-item-meta">${escapeHtml(s.sector || "Setor")} • Turno de ${s.duration || 12}h (${escapeHtml(s.shiftType || "Dia")})</small>
            </div>
            <div class="shift-item-val-box">
              <span class="shift-item-value">${formatBRL(s.value)}</span>
              <span class="shift-status-badge ${statusBadgeClass}">${statusLabel}</span>
            </div>
          </div>
          ${s.notes ? `<div class="shift-item-notes">${escapeHtml(s.notes)}</div>` : ""}
          <div class="shift-item-actions">
            <button class="shift-action-btn" type="button" data-action="toggle-status" data-id="${s.id}">
              ${s.status === "pago" ? "Marcar como Pendente" : "Marcar como Pago"}
            </button>
            <button class="shift-action-btn danger" type="button" data-action="delete" data-id="${s.id}">
              Remover
            </button>
          </div>
        </div>
      `;
    }).join("");
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
    const form = document.getElementById("add-shift-form");
    if (form) {
      // Set default date to today
      const dateInput = document.getElementById("shift-date");
      if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("shift-date")?.value || "";
        const place = document.getElementById("shift-place")?.value || "";
        const sector = document.getElementById("shift-sector")?.value || "";
        const duration = Number(document.getElementById("shift-duration")?.value) || 12;
        const shiftType = document.getElementById("shift-type")?.value || "Diurno (07h às 19h)";
        const value = Number(document.getElementById("shift-val")?.value) || 0;
        const status = document.getElementById("shift-status")?.value || "pendente";
        const notes = document.getElementById("shift-notes")?.value || "";

        if (!date || !place) {
          alert("Por favor, preencha a data e o hospital/local.");
          return;
        }

        const newShift = {
          id: "shift_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          date,
          place,
          sector,
          duration,
          shiftType,
          value,
          status,
          notes
        };

        const current = getShifts();
        current.push(newShift);
        saveShifts(current);

        renderStats(current);
        renderList(current);

        // Reset fields
        document.getElementById("shift-place").value = "";
        document.getElementById("shift-sector").value = "";
        document.getElementById("shift-val").value = "";
        document.getElementById("shift-notes").value = "";
      });
    }

    const listEl = document.getElementById("shifts-list-container");
    if (listEl) {
      listEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const shifts = getShifts();

        if (action === "toggle-status") {
          const shift = shifts.find(s => s.id === id);
          if (shift) {
            shift.status = shift.status === "pago" ? "pendente" : "pago";
            saveShifts(shifts);
            renderStats(shifts);
            renderList(shifts);
          }
        } else if (action === "delete") {
          if (confirm("Deseja realmente remover este plantão da sua escala?")) {
            const filtered = shifts.filter(s => s.id !== id);
            saveShifts(filtered);
            renderStats(filtered);
            renderList(filtered);
          }
        }
      });
    }

    const exportBtn = document.getElementById("export-shifts-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const shifts = getShifts();
        if (!shifts.length) {
          alert("Não há plantões para exportar.");
          return;
        }
        const csvHeader = "Data,Hospital,Setor,Horas,Turno,Valor,Status,Observações\n";
        const csvRows = shifts.map(s => {
          return `"${s.date}","${(s.place || "").replace(/"/g, '""')}","${(s.sector || "").replace(/"/g, '""')}",${s.duration},"${s.shiftType}",${s.value},"${s.status}","${(s.notes || "").replace(/"/g, '""')}"`;
        }).join("\n");

        const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `escala_plantoes_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const shifts = getShifts();
    renderStats(shifts);
    renderList(shifts);
    setupEvents();
  });
})();
