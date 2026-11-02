"use strict";
// Regressão: traço fino/cinza (print, foto de baixa resolução) era reprovado pelo
// limiar fixo de luminância 130 em basicCellWaveformCheck, derrubando 7 de 12 células.
const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../assets/js/ecg-cv-engine.js");

const W = 1200, H = 480;

function paperImage(traceLuma, withTrace = true, withPulse = false) {
  const data = new Uint8ClampedArray(W * H * 4);
  for (let i = 0; i < W * H; i++) { data[i * 4] = 16; data[i * 4 + 1] = 16; data[i * 4 + 2] = 16; data[i * 4 + 3] = 255; }
  const x0 = 60, x1 = 1140, y0 = 50, y1 = 440;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * W + x) * 4;
      const major = (x - x0) % 30 === 0 || (y - y0) % 30 === 0;
      const minor = (x - x0) % 6 === 0 || (y - y0) % 6 === 0;
      data[i] = major ? 240 : minor ? 250 : 255;
      data[i + 1] = major ? 190 : minor ? 222 : 240;
      data[i + 2] = major ? 195 : minor ? 225 : 242;
    }
  }
  if (!withTrace) return { data, width: W, height: H };
  if (withPulse) {
    // Pulso de 1 mV (10 mm = 60 px) e 5 mm (30 px) colado na borda esquerda do papel,
    // sem linha de base antes dele; base só à direita (como em muitos impressos).
    const base = 150, top = base - 60;
    const dot = (x, y) => { const i = (y * W + x) * 4; data[i] = data[i + 1] = data[i + 2] = traceLuma; };
    for (let y = top; y <= base; y++) { dot(x0 + 22, y); dot(x0 + 52, y); }
    for (let x = x0 + 22; x <= x0 + 52; x++) dot(x, top);
    for (let x = x0 + 52; x < x0 + 120; x++) dot(x, base);
  }
  const bandY = [110, 220, 330, 405];
  const put = (x, y) => {
    if (x < x0 || x >= x1 || y < y0 || y >= y1) return;
    const i = (y * W + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = traceLuma;
  };
  bandY.forEach((cy, row) => {
    const segs = (withPulse && row === 0) ? [[x0 + 140, x0 + 265]] : row === 3 ? [[x0 + 20, x1 - 20]] : [0, 1, 2, 3].map(c => [x0 + 20 + c * 265, x0 + 20 + c * 265 + 245]);
    segs.forEach(([a, b]) => {
      let prev = cy;
      for (let x = a; x < b; x++) {
        const phase = (x - a) % 100;
        let y = cy;
        if (phase >= 40 && phase < 44) y = cy - 38 + (phase - 40) * 3; // QRS
        else if (phase >= 44 && phase < 47) y = cy + 8;
        else if (phase >= 60 && phase < 80) y = cy - Math.round(5 * Math.sin(((phase - 60) / 20) * Math.PI)); // T
        const lo = Math.min(prev, y), hi = Math.max(prev, y);
        for (let yy = lo; yy <= hi; yy++) put(x, yy);
        prev = y;
      }
    });
  });
  return { data, width: W, height: H };
}

test("traço fino cinza (luminância ~135) tem o mesmo número de células válidas que o traço escuro", () => {
  const dark = engine.detectECGBoundaries(paperImage(40), {});
  const gray = engine.detectECGBoundaries(paperImage(135), {});
  assert.equal(dark.detected, true);
  assert.equal(gray.detected, true);
  assert.ok(dark.detectedLayout.validWaveformCells >= 8);
  assert.equal(gray.detectedLayout.validWaveformCells, dark.detectedLayout.validWaveformCells);
});

test("papel quadriculado sem traçado nunca gera células válidas", () => {
  const out = engine.detectECGBoundaries(paperImage(150, false), {});
  const cells = out.detectedLayout ? out.detectedLayout.validWaveformCells : 0;
  assert.equal(cells, 0);
});

test("grade medida nos dois eixos mesmo com perfil vertical contaminado pelos traçados", () => {
  const cal = engine.detectECGGridAndCalibration(paperImage(40, true), null, engine.locatePaperSheet(paperImage(40, true)).boundaries);
  assert.equal(cal.gridDetected, true);
  assert.ok(Math.abs(cal.pixelsPerMmX - 6) < 0.4, "px/mm X ~ 6, obtido " + cal.pixelsPerMmX);
  assert.ok(Math.abs(cal.pixelsPerMmY - 6) < 0.4, "px/mm Y ~ 6, obtido " + cal.pixelsPerMmY);
});

test("pulso de calibração sem linha de base à esquerda é detectado e a escala vira medida", () => {
  const img = paperImage(40, true, true);
  const cal = engine.detectECGGridAndCalibration(img, null, engine.locatePaperSheet(img).boundaries);
  assert.equal(cal.calibrationPulse.detected, true);
  assert.equal(cal.gainMmPerMv, 10);
  assert.equal(cal.paperSpeedMmPerSec, 25);
  assert.equal(cal.calibrationSource, "measured");
  assert.equal(cal.measurementsAllowed, true);
});

test("sem pulso, a escala nunca é marcada como medida", () => {
  const img = paperImage(40, true, false);
  const cal = engine.detectECGGridAndCalibration(img, null, engine.locatePaperSheet(img).boundaries);
  assert.equal(cal.measurementsAllowed, false);
});
