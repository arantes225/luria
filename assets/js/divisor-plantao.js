(function () {
  "use strict";
  const q = (s, r = document) => r.querySelector(s);

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

    const lines = [];
    lines.push(`DIVISÃO DE PLANTÃO / DESCANSO (${totalHours}h · Início ${startStr} → Fim ${fmtTime(startMin + totalMin)})`);
    lines.push(`Equipe: ${docs} profissionais · descanso igualitário de ${fmtDur(totalMin / docs)} por plantonista`);
    lines.push("────────────────────────────────────────────────────────");

    if (mode === "blocos") {
      const slot = totalMin / docs;
      for (let i = 0; i < docs; i++) {
        const s = startMin + i * slot;
        const e = s + slot;
        lines.push(`• ${i + 1}º Período (${fmtTime(s)} às ${fmtTime(e)} — ${fmtDur(slot)}): Descanso de ${getLabel(i)}`);
      }
    } else {
      // Fracionado em 2 rodadas (ex.: 2 turnos de descanso)
      const rounds = 2;
      const slot = totalMin / (docs * rounds);
      for (let r = 0; r < rounds; r++) {
        lines.push(`Rodada ${r + 1}:`);
        for (let i = 0; i < docs; i++) {
          const idx = r * docs + i;
          const s = startMin + idx * slot;
          const e = s + slot;
          lines.push(`  • ${fmtTime(s)} às ${fmtTime(e)} (${fmtDur(slot)}): ${getLabel(i)}`);
        }
      }
    }

    const out = q("#div-output");
    if (out) out.textContent = lines.join("\n");
  }

  q("#div-calc-btn")?.addEventListener("click", calculateSplit);
  q("#div-copy-btn")?.addEventListener("click", async () => {
    const out = q("#div-output");
    if (!out) return;
    try {
      await navigator.clipboard.writeText(out.textContent);
      const btn = q("#div-copy-btn");
      btn.textContent = "Copiado para o WhatsApp!";
      setTimeout(() => { btn.textContent = "Copiar Divisão"; }, 1400);
    } catch (_) {}
  });
  calculateSplit();
})();
