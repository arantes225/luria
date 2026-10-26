// Execute com: node tests/ecg-image-quality.test.cjs
// Testa apenas o índice visual experimental, NÃO desempenho diagnóstico.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const code = fs.readFileSync(path.join(__dirname, "../assets/js/ecg-image-quality.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(code, context, { filename: "ecg-image-quality.js" });
const { scorePixels } = context.window.LuriaEcgImageQuality;

function pixels(colorAt, width = 64, height = 64) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const v = colorAt(x, y);
    const i = (y * width + x) * 4;
    data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 255;
  }
  return data;
}

const blank = pixels(() => 255);
const trace = pixels((x, y) => x % 8 === 0 || y % 11 === 0 ? 12 : 240);
const empty = scorePixels(blank, 64, 64, 2000, 1400, "quick");
const clear = scorePixels(trace, 64, 64, 2000, 1400, "quick");
const small = scorePixels(trace, 64, 64, 200, 120, "quick");
const detailed = scorePixels(trace, 64, 64, 200, 120, "detailed");

assert.ok(clear.score > empty.score, "Traçado de teste deve superar folha totalmente branca");
assert.ok(clear.score > small.score, "Imagem com dimensões maiores deve ter índice maior");
assert.ok(detailed.resolution > small.resolution, "Modo detalhado usa limite de resolução distinto");
for (const r of [empty, clear, small, detailed]) {
  assert.ok(Number.isFinite(r.score) && r.score >= 0 && r.score <= 100);
  assert.equal(r.experimental, true);
}
assert.throws(() => scorePixels(null, 0, 0, 0, 0), /pequena/);
console.log("ECG image quality: testes unitários passaram (heurísticas, não calibração clínica).");
