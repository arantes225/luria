(function () {
  "use strict";
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Tabs
  qa("[data-ecg-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.ecgTab;
      qa("[data-ecg-tab]").forEach(b => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      qa("[data-ecg-panel]").forEach(p => {
        p.classList.toggle("is-active", p.dataset.ecgPanel === target);
      });
    });
  });

  // 1. Calculadora de FC e QTc no ECG
  const btnCalc = q("#ecg-calc-btn");
  if (btnCalc) {
    btnCalc.addEventListener("click", () => {
      const rrMm = Number.parseFloat(q("#ecg-rr-mm")?.value);
      const qtMm = Number.parseFloat(q("#ecg-qt-mm")?.value);
      const sex = q("#ecg-sex")?.value || "m";
      const out = q("#ecg-calc-out");
      if (!out) return;
      if (!Number.isFinite(rrMm) || rrMm <= 0) {
        out.textContent = "Informe o intervalo RR em milímetros (quadradinhos de 1 mm a 25 mm/s).";
        return;
      }
      const fc = Math.round(1500 / rrMm);
      const rrSec = rrMm * 0.04;
      let text = `FC = ${fc} bpm (${fc < 50 ? "Bradicardia" : fc > 100 ? "Taquicardia" : "Normocardia 50–100 bpm"}) · RR = ${(rrSec * 1000).toFixed(0)} ms`;
      if (Number.isFinite(qtMm) && qtMm > 0) {
        const qtMs = qtMm * 40;
        const bazett = Math.round(qtMs / Math.sqrt(rrSec));
        const fridericia = Math.round(qtMs / Math.cbrt(rrSec));
        const hodges = Math.round(qtMs + 1.75 * (fc - 60));
        const useQTc = (fc < 60 || fc > 100) ? fridericia : bazett;
        const lim = sex === "f" ? 470 : 450;
        const status = useQTc >= 500 ? "🚨 QTc ≥ 500 ms (Alto risco de Torsades de Pointes!)" : useQTc > lim ? `⚠️ QTc prolongado (> ${lim} ms)` : useQTc < 340 ? "⚠️ QTc curto (< 340 ms)" : "QTc normal";
        text += ` | QT medido = ${qtMs} ms → QTc Bazett = ${bazett} ms · Fridericia = ${fridericia} ms · Hodges = ${hodges} ms (${status})`;
      }
      out.textContent = text;
    });
  }

  // 2. Avaliador Rápido do Eixo Elétrico (QRS em DI e aVF)
  const btnAxis = q("#ecg-axis-btn");
  if (btnAxis) {
    btnAxis.addEventListener("click", () => {
      const d1 = q("#ecg-axis-d1")?.value;
      const avf = q("#ecg-axis-avf")?.value;
      const d2 = q("#ecg-axis-d2")?.value;
      const out = q("#ecg-axis-out");
      if (!out) return;
      if (d1 === "pos" && avf === "pos") {
        out.textContent = "Eixo Normal (entre 0° e +90°): QRS positivo em DI e positivo em aVF.";
      } else if (d1 === "pos" && avf === "neg") {
        if (d2 === "pos") {
          out.textContent = "Eixo Normal (entre 0° e −30°): QRS positivo em DI, negativo em aVF, mas positivo em DII.";
        } else {
          out.textContent = "Desvio do Eixo para a Esquerda (além de −30°, até −90°): QRS positivo em DI e negativo em aVF e DII. Principais causas: Hemibloqueio Anterior Esquerdo (BDAS), Sobrecarga de VE, BRE ou IAM inferior prévio.";
        }
      } else if (d1 === "neg" && avf === "pos") {
        out.textContent = "Desvio do Eixo para a Direita (+90° a +180°): QRS negativo em DI e positivo em aVF. Principais causas: Sobrecarga de VD (DPOC/TEP/Hipertensão Pulmonar), Hemibloqueio Posterior Esquerdo (BDPI), IAM lateral, crianças/biotipos longilíneos ou troca de eletrodos dos braços!";
      } else {
        out.textContent = "Desvio Extremo do Eixo / Quadrante Indeterminado (−90° a ±180°, 'Terra de Ninguém'): QRS negativo em DI e negativo em aVF. Causas: Taquicardia Ventricular (forte pista contra TSV com aberrância!), hipercalemia grave ou troca de eletrodos.";
      }
    });
  }

  // 3. Construtor de Laudo Sistemático de ECG para Prontuário
  const btnReport = q("#ecg-build-report");
  const btnCopy = q("#ecg-copy-report");
  if (btnReport) {
    btnReport.addEventListener("click", () => {
      const r = q("#rep-rhythm")?.value || "Ritmo sinusal regular";
      const fc = q("#rep-fc")?.value || "75";
      const axis = q("#rep-axis")?.value || "Eixo elétrico normal (entre -30° e +90°)";
      const pr = q("#rep-pr")?.value || "Intervalo PR normal (120–200 ms), sem pré-excitação";
      const qrs = q("#rep-qrs")?.value || "QRS estreito (< 120 ms), morfologia e progressão de R preservadas";
      const st = q("#rep-st")?.value || "Segmento ST isoelétrico, sem supra ou infradesnivelamento agudo; ondas T normais";
      const qtc = q("#rep-qtc")?.value || "Intervalo QTc dentro da normalidade";
      const obs = q("#rep-obs")?.value.trim();
      const text = [
        "ELETROCARDIOGRAMA DE 12 DERIVAÇÕES (25 mm/s · 10 mm/mV):",
        `• Ritmo e FC: ${r}, FC ~${fc} bpm.`,
        `• Ondas P e Intervalo PR: ${pr}.`,
        `• Eixo e Complexo QRS: ${axis}; ${qrs}.`,
        `• Repolarização (ST-T) e QTc: ${st}; ${qtc}.`,
        obs ? `• Conclusão / Correlação Clínica: ${obs}` : "• Conclusão: Traçado eletrocardiográfico sem sinais de isquemia miocárdica aguda ou arritmias malignas no momento."
      ].join("\n");
      const out = q("#ecg-report-output");
      if (out) out.textContent = text;
    });
  }
  if (btnCopy) {
    btnCopy.addEventListener("click", async () => {
      const out = q("#ecg-report-output");
      if (!out) return;
      try {
        await navigator.clipboard.writeText(out.textContent);
        btnCopy.textContent = "Laudo copiado!";
        setTimeout(() => { btnCopy.textContent = "Copiar para o Prontuário"; }, 1400);
      } catch (_) {}
    });
  }
})();
