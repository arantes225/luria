(function () {
  "use strict";

  const STORAGE_KEY = "traube_plantoes_shifts_v1";

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

  let activeView = "list"; // 'list' ou 'calendar'
  let currentMonthOffset = 0; // 0 = mês atual

  function renderStats(shifts) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

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

  function checkConflicts(shift, allShifts) {
    const conflicts = [];
    allShifts.forEach(other => {
      if (other.id === shift.id) return;
      if (other.date === shift.date) {
        conflicts.push(`Mesmo dia: plantão concorrente em ${other.place}`);
      }
    });
    return conflicts;
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

    const sorted = [...shifts].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    listEl.innerHTML = sorted.map((s, idx) => {
      const statusBadgeClass = s.status === "pago" ? "status-paid" : s.status === "trocado" ? "status-swapped" : "status-pending";
      const statusLabel = s.status === "pago" ? "Pago" : s.status === "trocado" ? "Trocado / Cedido" : "Aguardando Repasse";
      const conflicts = checkConflicts(s, shifts);

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
          ${conflicts.length ? `<div class="shift-conflict-warning">⚠️ Alerta de escala: ${conflicts.join(", ")}</div>` : ""}
          ${s.notes ? `<div class="shift-item-notes">${escapeHtml(s.notes)}</div>` : ""}
          <div class="shift-item-actions">
            <button class="shift-action-btn" type="button" data-action="toggle-status" data-id="${s.id}">
              ${s.status === "pago" ? "Marcar como Pendente" : "Marcar como Pago"}
            </button>
            <button class="shift-action-btn" type="button" data-action="duplicate" data-id="${s.id}">
              Duplicar
            </button>
            <button class="shift-action-btn" type="button" data-action="ics" data-id="${s.id}">
              📅 Adicionar à Agenda
            </button>
            <button class="shift-action-btn danger" type="button" data-action="delete" data-id="${s.id}">
              Remover
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderCalendar(shifts) {
    const calendarContainer = document.getElementById("shifts-calendar-container");
    if (!calendarContainer) return;

    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() + currentMonthOffset);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const shiftsInMonth = shifts.filter(s => {
      if (!s.date) return false;
      const [y, m] = s.date.split("-").map(Number);
      return y === year && m === month + 1;
    });

    let daysHtml = "";
    // Dias em branco antes do dia 1
    for (let i = 0; i < firstDayIndex; i++) {
      daysHtml += `<div class="cal-day empty"></div>`;
    }

    const todayStr = new Date().toISOString().split("T")[0];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dayShifts = shiftsInMonth.filter(s => s.date === dayIso);
      const isToday = dayIso === todayStr;

      daysHtml += `
        <div class="cal-day ${isToday ? "today" : ""} ${dayShifts.length ? "has-shift" : ""}">
          <div class="cal-day-num">${d}</div>
          <div class="cal-day-shifts">
            ${dayShifts.map(s => `
              <div class="cal-chip ${s.status === "pago" ? "paid" : "pending"}" title="${s.place} (${s.duration}h - ${formatBRL(s.value)})">
                <strong>${escapeHtml(s.place.substring(0, 14))}</strong>
                <small>${s.duration}h • ${formatBRL(s.value)}</small>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    calendarContainer.innerHTML = `
      <div class="cal-header">
        <button type="button" class="shift-action-btn" id="cal-prev-month">◀ Mês Anterior</button>
        <strong class="cal-title">${monthNames[month]} de ${year}</strong>
        <button type="button" class="shift-action-btn" id="cal-next-month">Próximo Mês ▶</button>
      </div>
      <div class="cal-weekdays">
        <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
      </div>
      <div class="cal-grid">
        ${daysHtml}
      </div>
    `;

    document.getElementById("cal-prev-month")?.addEventListener("click", () => {
      currentMonthOffset--;
      renderCalendar(getShifts());
    });
    document.getElementById("cal-next-month")?.addEventListener("click", () => {
      currentMonthOffset++;
      renderCalendar(getShifts());
    });
  }

  function downloadIcs(shift) {
    if (!shift.date) return;
    const [y, m, d] = shift.date.split("-");
    const dur = Number(shift.duration) || 12;
    let startHour = "070000";
    let endHour = "190000";

    const t = (shift.shiftType || "").toLowerCase();
    if (t.includes("noturno")) {
      startHour = "190000";
      endHour = "070000";
    }

    const startIso = `${y}${m}${d}T${startHour}`;
    const endIso = `${y}${m}${d}T${endHour}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TRAUBE Gestor de Plantoes//BR",
      "BEGIN:VEVENT",
      `SUMMARY:Plantão: ${shift.place} (${shift.sector || ""})`,
      `DESCRIPTION:Turno de ${dur}h - ${shift.shiftType}. Previsto: ${formatBRL(shift.value)}. Obs: ${shift.notes || ""}`,
      `LOCATION:${shift.place}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plantao_${shift.date}_${shift.place.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
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
      const dateInput = document.getElementById("shift-date");
      if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split("T")[0];
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
        renderCalendar(current);

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
            renderCalendar(shifts);
          }
        } else if (action === "duplicate") {
          const shift = shifts.find(s => s.id === id);
          if (shift) {
            const copy = { ...shift, id: "shift_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7) };
            shifts.push(copy);
            saveShifts(shifts);
            renderStats(shifts);
            renderList(shifts);
            renderCalendar(shifts);
          }
        } else if (action === "ics") {
          const shift = shifts.find(s => s.id === id);
          if (shift) downloadIcs(shift);
        } else if (action === "delete") {
          if (confirm("Deseja realmente remover este plantão da sua escala?")) {
            const filtered = shifts.filter(s => s.id !== id);
            saveShifts(filtered);
            renderStats(filtered);
            renderList(filtered);
            renderCalendar(filtered);
          }
        }
      });
    }

    // Toggle de Visualização (Lista vs Calendário)
    const toggleListBtn = document.getElementById("view-toggle-list");
    const toggleCalBtn = document.getElementById("view-toggle-cal");
    const listWrapper = document.getElementById("shifts-list-wrapper");
    const calWrapper = document.getElementById("shifts-calendar-wrapper");

    if (toggleListBtn && toggleCalBtn) {
      toggleListBtn.addEventListener("click", () => {
        activeView = "list";
        toggleListBtn.classList.add("active");
        toggleCalBtn.classList.remove("active");
        if (listWrapper) listWrapper.hidden = false;
        if (calWrapper) calWrapper.hidden = true;
      });
      toggleCalBtn.addEventListener("click", () => {
        activeView = "calendar";
        toggleCalBtn.classList.add("active");
        toggleListBtn.classList.remove("active");
        if (listWrapper) listWrapper.hidden = true;
        if (calWrapper) calWrapper.hidden = false;
        renderCalendar(getShifts());
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
    renderCalendar(shifts);
    setupEvents();
  });
})();
