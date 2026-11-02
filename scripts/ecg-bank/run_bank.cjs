#!/usr/bin/env node
"use strict";
// Roda o motor de ECG em todas as imagens de uma pasta e imprime uma tabela.
// Uso: node scripts/ecg-bank/run_bank.cjs <pasta> [--json saida.json]
// Requer python3 com Pillow (decodifica JPEG/PNG para RGBA).
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const engine = require("../../assets/js/ecg-cv-engine.js");

const dir = process.argv[2];
if (!dir) { console.error("uso: node run_bank.cjs <pasta> [--json saida.json]"); process.exit(1); }
const jsonOut = process.argv.includes("--json") ? process.argv[process.argv.indexOf("--json") + 1] : null;
// Mesmas opções que processPhotographCanvas usa para foto/imagem importada.
const PHOTO_OPTS = { allowDensePreview: true, allowTopologyFallback: true };
const MAX = 2600; // mesma ordem de grandeza do limite do extrator no app

function decode(file) {
  const tmp = path.join(require("os").tmpdir(), "ecgbank.rgba");
  const code = [
    "import sys",
    "from PIL import Image",
    "im=Image.open(sys.argv[1]).convert('RGBA')",
    "s=max(im.size)",
    `if s>${MAX}:`,
    `    f=${MAX}/s; im=im.resize((int(im.size[0]*f),int(im.size[1]*f)))`,
    "open(sys.argv[2],'wb').write(im.tobytes()); print(im.size[0],im.size[1])"
  ].join("\n");
  const [w, h] = execFileSync("python3", ["-I", "-c", code, file, tmp]).toString().trim().split(" ").map(Number);
  return { data: new Uint8ClampedArray(fs.readFileSync(tmp)), width: w, height: h };
}

const rows = [];
for (const f of fs.readdirSync(dir).filter(x => /\.(jpe?g|png)$/i.test(x)).sort()) {
  const row = { file: f };
  try {
    const img = decode(path.join(dir, f));
    let b = engine.detectECGBoundaries(img, PHOTO_OPTS);
    // Mesma correção que processPhotographCanvas faz: endireita e redetecta.
    const skew = Number(b.orientation && b.orientation.skewAngleDeg);
    row.skew = Number.isFinite(skew) ? skew : 0;
    if (!(b.orientation && b.orientation.isRotated90) && Math.abs(row.skew) > 1.5) {
      const rect = engine.rectifyImagePerspective(img, (b.sheet && b.sheet.corners) || {
        topLeft: { x: 0, y: 0 }, topRight: { x: img.width, y: 0 },
        bottomLeft: { x: 0, y: img.height }, bottomRight: { x: img.width, y: img.height }
      }, -row.skew);
      if (rect && rect.width > 80 && rect.height > 80) {
        img.data = rect.data; img.width = rect.width; img.height = rect.height;
        b = engine.detectECGBoundaries(img, PHOTO_OPTS);
      }
    }
    const sheet = engine.locatePaperSheet(img);
    const c = engine.detectECGGridAndCalibration(img, null, sheet.boundaries);
    Object.assign(row, {
      detected: !!b.detected,
      cells: b.detectedLayout ? b.detectedLayout.validWaveformCells : 0,
      layout: b.detectedLayout ? b.detectedLayout.name : null,
      grid: !!c.gridDetected,
      pxPerMm: c.pixelsPerMmX,
      pulse: !!c.calibrationPulse.detected,
      scale: c.calibrationSource,
      reason: b.detected ? "" : String(b.reason || "").slice(0, 70)
    });
  } catch (e) { row.error = e.message; }
  rows.push(row);
}
for (const r of rows) {
  console.log(r.file.padEnd(34),
    r.error ? "ERRO " + r.error : `skew=${String(r.skew).padStart(5)} det=${r.detected ? "S" : "n"} cel=${String(r.cells).padStart(2)}/12 grade=${r.grid ? "S" : "n"} px/mm=${r.pxPerMm ?? "-"} pulso=${r.pulse ? "S" : "n"} escala=${r.scale}`);
}
const KNOWN = /^(3x4_plus_rhythm|3x4_standard|6x2_standard|12x1_stacked)/;
// Critério estrito: layout conhecido E 10–12 células válidas (um "15x1" com 14
// células não é sucesso; é um layout inventado a partir de faixas espúrias).
const ok = rows.filter(r => r.detected && KNOWN.test(r.layout || "") && r.cells >= 10 && r.cells <= 12).length;
const meas = rows.filter(r => r.scale === "measured").length;
console.log(`\nTotal ${rows.length} | sucesso estrito (layout conhecido, 10-12 células): ${ok} | escala medida: ${meas}`);
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(rows, null, 1));
