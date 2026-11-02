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
    const b = engine.detectECGBoundaries(img, {});
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
    r.error ? "ERRO " + r.error : `det=${r.detected ? "S" : "n"} cel=${String(r.cells).padStart(2)}/12 grade=${r.grid ? "S" : "n"} px/mm=${r.pxPerMm ?? "-"} pulso=${r.pulse ? "S" : "n"} escala=${r.scale}`);
}
const ok = rows.filter(r => r.detected && r.cells >= 10).length;
const meas = rows.filter(r => r.scale === "measured").length;
console.log(`\nTotal ${rows.length} | detectadas com >=10 células: ${ok} | escala medida: ${meas}`);
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(rows, null, 1));
