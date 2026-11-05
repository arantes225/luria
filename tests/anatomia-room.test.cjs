const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

test("Sala de Anatomia está ligada ao hub Aprender e à navegação móvel", () => {
  const hub = read("aprender/index.html");
  const nav = read("assets/js/ui-navigation-v2.js");
  const serviceWorker = read("service-worker.js");
  assert.match(hub, /href="\/aprender\/anatomia\/"/);
  assert.match(hub, />Sala de Anatomia</);
  assert.match(nav, /Sala de Anatomia/);
  assert.match(nav, /"anatomia"/);
  assert.match(serviceWorker, /\/aprender\/anatomia\//);
});

test("modelo do coração possui estrutura, controles e conteúdo anatômico", () => {
  const page = read("aprender/anatomia/index.html");
  assert.match(page, /data-anatomy-viewer/);
  assert.match(page, /data-anatomy-reset/);
  assert.match(page, /data-quiz-start/);
  assert.match(page, /Ventrículo esquerdo/);
  assert.match(page, /Fluxo sanguíneo essencial/);
  assert.ok(fs.statSync(path.join(root, "assets/models/anatomia/coracao.glb")).size > 1_000_000);
  assert.ok(fs.statSync(path.join(root, "assets/vendor/traube-anatomy-viewer.mjs")).size > 100_000);
});

test("Sala de Anatomia mantém alternativa estática para navegadores sem WebGL", () => {
  const source = read("assets/js/anatomy-heart-entry.mjs");
  assert.match(source, /anatomy-static-fallback/);
  assert.match(source, /Quiz disponível no modo 3D/);
  assert.ok(fs.statSync(path.join(root, "assets/img/anatomia/coracao-estatico.webp")).size > 10_000);
});
