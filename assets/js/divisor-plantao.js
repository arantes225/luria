(function () {
  "use strict";
  const q = (s, r = document) => r.querySelector(s);
  const qAll = (s, r = document) => Array.from(r.querySelectorAll(s));

  function toMin(hhmm) {
    const [h, m] = String(hhmm || "00:00").split(":").map(Number);
    return (Number.isFinite(h) ? h : 0) * 60 + (Number.isFinite(m) ? m : 0);
  }
  function fmtTime(totalMin) {
    const norm = ((Math.round(totalMin) % 1440) + 1440) % 1440;
    const h = String(Math.floor(norm / 60)).padStart(2, "0");
    const m = String(norm % 60).padStart(2, "0");
    return `${h}:${m}`;
  }
  function fmtDur(min) {
    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);
    return m ? `${h}h${String(m).padStart(2, "0")}min` : `${h}h`;
  }

  const PALETTE = [
    { bg: "#3b82f6", text: "#fff" },
    { bg: "#10b981", text: "#fff" },
    { bg: "#8b5cf6", text: "#fff" },
    { bg: "#f59e0b", text: "#fff" },
    { bg: "#ec4899", text: "#fff" },
    { bg: "#06b6d4", text: "#fff" },
    { bg: "#14b8a6", text: "#fff" },
    { bg: "#f97316", text: "#fff" }
  ];

  let currentSlots = [];

  function calculateSplit() {
    const startStr = q("#div-start")?.value || "19:00";
    const totalHours = Number.parseFloat(q("#div-hours")?.value) || 12;
    const docs = Math.max(1, Math.min(12, Number.parseInt(q("#div-docs")?.value, 10) || 2));
    const namesRaw = q("#div-names")?.value || "";
    const mode = q("#div-mode")?.value || "blocos";
    const startMin = toMin(startStr);
    const totalMin = totalHours * 60;
    const names = namesRaw.split(",").map(s => s.trim()).filter(Boolean);
    const getLabel = i => names[i] || `Plantonista ${i + 1}`;

    currentSlots = [];

    const lines = [];
    lines.push(`🏥 *DIVISÃO DE PLANTÃO & DESCANSO*`);
    lines.push(`⏰ *Carga:* ${totalHours}h (${startStr} ➔ ${fmtTime(startMin + totalMin)})`);
    lines.push(`👥 *Equipe:* ${docs} médicos/profissionais`);
    lines.push(`💤 *Descanso por plantonista:* ${fmtDur(totalMin / docs)}`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    if (mode === "blocos") {
      const slot = totalMin / docs;
      for (let i = 0; i < docs; i++) {
        const s = startMin + i * slot;
        const e = s + slot;
        const name = getLabel(i);
        currentSlots.push({
          index: i,
          name,
          startMin: s,
          endMin: e,
          durMin: slot,
          color: PALETTE[i % PALETTE.length]
        });
        lines.push(`💤 *${i + 1}º Período* (${fmtTime(s)} às ${fmtTime(e)} — ${fmtDur(slot)}):`);
        lines.push(`   └ Repouso: *${name}*`);
      }
    } else {
      // Fracionado em 2 rodadas
      const rounds = 2;
      const slot = totalMin / (docs * rounds);
      for (let r = 0; r < rounds; r++) {
        lines.push(`\n🔄 *Rodada ${r + 1}:*`);
        for (let i = 0; i < docs; i++) {
          const idx = r * docs + i;
          const s = startMin + idx * slot;
          const e = s + slot;
          const name = getLabel(i);
          currentSlots.push({
            index: i,
            round: r + 1,
            name,
            startMin: s,
            endMin: e,
            durMin: slot,
            color: PALETTE[i % PALETTE.length]
          });
          lines.push(`   • ${fmtTime(s)} às ${fmtTime(e)} (${fmtDur(slot)}): *${name}*`);
        }
      }
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`_Organizado via TRAUBE Gestor de Plantões_`);

    const out = q("#div-output");
    if (out) out.textContent = lines.join("\n");

    renderTimeline(startMin, totalMin);
    renderCards(docs);
  }

  function renderTimeline(startMin, totalMin) {
    const timelineEl = q("#div-timeline-bar");
    if (!timelineEl) return;

    timelineEl.innerHTML = "";
    currentSlots.forEach(slot => {
      const pct = (slot.durMin / totalMin) * 100;
      const block = document.createElement("div");
      block.className = "div-timeline-block";
      block.style.width = `${pct}%`;
      block.style.background = slot.color.bg;
      block.style.color = slot.color.text;
      block.title = `${slot.name}: ${fmtTime(slot.startMin)} - ${fmtTime(slot.endMin)}`;
      block.innerHTML = `
        <span class="div-timeline-label">${slot.name}</span>
        <span class="div-timeline-sub">${fmtTime(slot.startMin)} - ${fmtTime(slot.endMin)}</span>
      `;
      timelineEl.appendChild(block);
    });

    updateNowIndicator(startMin, totalMin);
  }

  function updateNowIndicator(startMin, totalMin) {
    const nowIndicator = q("#div-timeline-now");
    const nowBanner = q("#div-now-status");
    if (!nowIndicator) return;

    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    // Normalizar tempo relativo ao início
    let elapsed = nowMin - startMin;
    if (elapsed < 0) elapsed += 1440; // atravessou meia-noite

    if (elapsed >= 0 && elapsed <= totalMin) {
      const pct = (elapsed / totalMin) * 100;
      nowIndicator.style.display = "block";
      nowIndicator.style.left = `${pct}%`;

      // Achar quem está de descanso agora
      const activeSlot = currentSlots.find(s => {
        let sRel = s.startMin - startMin;
        if (sRel < 0) sRel += 1440;
        let eRel = s.endMin - startMin;
        if (eRel < 0) eRel += 1440;
        return elapsed >= sRel && elapsed < eRel;
      });

      if (nowBanner && activeSlot) {
        nowBanner.hidden = false;
        nowBanner.innerHTML = `
          <span class="div-now-pulse"></span>
          <span><strong>Momento Atual (${fmtTime(nowMin)}):</strong> Repouso de <strong>${activeSlot.name}</strong> até às ${fmtTime(activeSlot.endMin)}</span>
        `;
      }
    } else {
      nowIndicator.style.display = "none";
      if (nowBanner) nowBanner.hidden = true;
    }
  }

  function renderCards(docs) {
    const container = q("#div-cards-grid");
    if (!container) return;

    container.innerHTML = currentSlots.map((s, i) => {
      return `
        <div class="div-slot-card" style="border-left: 4px solid ${s.color.bg}">
          <div class="div-slot-head">
            <strong>${s.name}</strong>
            <span class="div-slot-badge">${fmtDur(s.durMin)}</span>
          </div>
          <div class="div-slot-time">
            ⏰ ${fmtTime(s.startMin)} ➔ ${fmtTime(s.endMin)}
          </div>
          <small class="div-slot-meta">Período de repouso programado</small>
        </div>
      `;
    }).join("");
  }

  function applyPreset(preset) {
    const startInput = q("#div-start");
    const hoursInput = q("#div-hours");
    const modeInput = q("#div-mode");

    if (preset === "noturno-12") {
      if (startInput) startInput.value = "19:00";
      if (hoursInput) hoursInput.value = "12";
      if (modeInput) modeInput.value = "blocos";
    } else if (preset === "diurno-12") {
      if (startInput) startInput.value = "07:00";
      if (hoursInput) hoursInput.value = "12";
      if (modeInput) modeInput.value = "blocos";
    } else if (preset === "24h") {
      if (startInput) startInput.value = "07:00";
      if (hoursInput) hoursInput.value = "24";
      if (modeInput) modeInput.value = "rodadas";
    } else if (preset === "noturno-rodadas") {
      if (startInput) startInput.value = "19:00";
      if (hoursInput) hoursInput.value = "12";
      if (modeInput) modeInput.value = "rodadas";
    }
    calculateSplit();
  }

  function setupQuickNames() {
    qAll(".div-quick-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        applyPreset(btn.dataset.preset);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    q("#div-calc-btn")?.addEventListener("click", calculateSplit);
    q("#div-start")?.addEventListener("change", calculateSplit);
    q("#div-hours")?.addEventListener("change", calculateSplit);
    q("#div-docs")?.addEventListener("input", calculateSplit);
    q("#div-mode")?.addEventListener("change", calculateSplit);
    q("#div-names")?.addEventListener("input", calculateSplit);

    q("#div-copy-btn")?.addEventListener("click", async () => {
      const out = q("#div-output");
      if (!out) return;
      try {
        await navigator.clipboard.writeText(out.textContent);
        const btn = q("#div-copy-btn");
        btn.textContent = "✓ Copiado com Sucesso!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copiar para WhatsApp";
          btn.classList.remove("copied");
        }, 1800);
      } catch (_) {}
    });

    setupQuickNames();
    calculateSplit();
    setInterval(() => {
      const startStr = q("#div-start")?.value || "19:00";
      const totalHours = Number.parseFloat(q("#div-hours")?.value) || 12;
      updateNowIndicator(toMin(startStr), totalHours * 60);
    }, 60000);
  });
})();
