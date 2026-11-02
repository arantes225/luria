#!/usr/bin/env node
"use strict";
// Mede o erro do traçado extraído contra o sinal PTB-XL original nas imagens
// sintéticas com geometria preservada (as demais giram/deformam e exigem registro).
// Uso: node scripts/ecg-bank/accuracy.cjs <pasta_banco_sintetico>
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const engine = require("../../assets/js/ecg-cv-engine.js");
const extractor = require("../../assets/js/ecg-signal-extractor.js");

const dir = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
const NAME = { I: "DI", II: "DII", III: "DIII", AVR: "aVR", AVL: "aVL", AVF: "aVF" };
const canon = l => NAME[l] || l;

function decode(file) {
  const tmp = path.join(require("os").tmpdir(), "ecgacc.rgba");
  const code = "import sys\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert('RGBA')\nopen(sys.argv[2],'wb').write(im.tobytes()); print(im.size[0],im.size[1])";
  const [w, h] = execFileSync("python3", ["-I", "-c", code, file, tmp]).toString().trim().split(" ").map(Number);
  return { data: new Uint8ClampedArray(fs.readFileSync(tmp)), width: w, height: h };
}
const median = a => { const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };
function corr(a, b) {
  const n = a.length; if (n < 5) return NaN;
  const ma = a.reduce((s, v) => s + v, 0) / n, mb = b.reduce((s, v) => s + v, 0) / n;
  let nu = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { nu += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; }
  return da > 0 && db > 0 ? nu / Math.sqrt(da * db) : NaN;
}

const rows = [];
for (const item of manifest.images.filter(i => i.geometry_preserved)) {
  const img = decode(path.join(dir, item.file));
  const b = engine.detectECGBoundaries(img, { allowDensePreview: true, allowTopologyFallback: true });
  const sheet = engine.locatePaperSheet(img);
  const cal = engine.detectECGGridAndCalibration(img, null, sheet.boundaries);
  const regions = (b.detectedLayout && b.detectedLayout.leads) || b.leads || {};
  const res = { file: item.file, leadsFound: 0, leadsExpected: 0, mae_px: [], corr: [], mae_mv_if_true_scale: [], ampRatio: [], pxPerMm: cal.pixelsPerMmX, scale: cal.calibrationSource };
  for (const t of Object.values(item.truth_clean)) {
    if (t.row === 3) continue; // tira de ritmo fica fora desta medida
    res.leadsExpected++;
    const box = regions[canon(t.lead)];
    if (!box) continue;
    const rx = Math.round(box.xMin * img.width), ry = Math.round(box.yMin * img.height);
    const rw = Math.round((box.xMax - box.xMin) * img.width), rh = Math.round((box.yMax - box.yMin) * img.height);
    if (rw < 24 || rh < 16) continue;
    const crop = engine.cropSubImageData(img, rx, ry, rw, rh);
    let ex;
    try { ex = extractor.extractRealSignalFromImageData(crop, { calibration: cal, leadLabel: canon(t.lead), allowOverlappingPreview: true, maskPrintedHeader: true, allowDensePreview: true }); } catch (e) { continue; }
    if (!ex || !ex.isValid || !ex.curveCoordinatesPx) continue;
    res.leadsFound++;
    const ext = [], tru = [];
    for (let x = 0; x < ex.curveCoordinatesPx.length; x++) {
      const c = ex.curveCoordinatesPx[x];
      const y = c == null ? NaN : (typeof c === "number" ? c : (c.y ?? c[1]));
      if (!Number.isFinite(y)) continue;
      const ax = rx + x; const ti = ax - t.x0;
      if (ti < 0 || ti >= t.y.length) continue;
      ext.push(y + ry); tru.push(t.y[ti]);
    }
    if (ext.length < 40) { res.leadsFound--; continue; }
    // compara sem o deslocamento de linha de base (a validação de amplitude é feita pela escala)
    const me = median(ext), mt = median(tru);
    const e0 = ext.map(v => v - me), t0 = tru.map(v => v - mt);
    res.mae_px.push(e0.reduce((s, v, i) => s + Math.abs(v - t0[i]), 0) / e0.length);
    res.corr.push(corr(e0, t0));
    // razão de amplitude em mV: desvio do sinal extraído (escala do motor) / desvio do sinal verdadeiro
    const mvExt = [], mvTru = [];
    for (let x = 0; x < ex.signal.length; x++) {
      const v = ex.signal[x]; const ti = rx + x - t.x0;
      if (v == null || !Number.isFinite(v) || ti < 0 || ti >= t.mv.length) continue;
      mvExt.push(v); mvTru.push(t.mv[ti]);
    }
    const sd = a => { const m = a.reduce((q, v) => q + v, 0) / a.length; return Math.sqrt(a.reduce((q, v) => q + (v - m) ** 2, 0) / a.length); };
    if (mvExt.length > 40 && sd(mvTru) > 1e-4) res.ampRatio.push(sd(mvExt) / sd(mvTru));
    // erro em mV usando a escala REAL (60 px/mV) para isolar o rastreamento da calibração
    res.mae_mv_if_true_scale.push(res.mae_px[res.mae_px.length - 1] / 60);
  }
  rows.push(res);
}
const avg = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : NaN;
console.log("arquivo".padEnd(26), "deriv./12  MAE(px)  MAE(mV, escala real)  correlação  amplitude(extr/real)  px/mm  escala");
for (const r of rows) {
  console.log(r.file.replace(".jpg", "").padEnd(26),
    `${String(r.leadsFound).padStart(2)}/${r.leadsExpected}`.padEnd(10),
    avg(r.mae_px).toFixed(2).padStart(7), avg(r.mae_mv_if_true_scale).toFixed(4).padStart(14).padEnd(22),
    avg(r.corr).toFixed(3).padStart(8), avg(r.ampRatio).toFixed(2).padStart(16), String(r.pxPerMm ?? "-").padStart(10), " ", r.scale);
}
