const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const css = read("assets/css/apostila-renderer.css");
const tools = read("assets/js/apostila-tools.js");

test("O corpo editorial das apostilas tem parágrafos, listas e legendas justificados", () => {
  assert.ok(css.includes('body[data-page="aprender"] .book-main :is(.book-section,.mindmap-section) :is(p,li,blockquote,figcaption,dd)'));
  assert.ok(css.includes("text-align: justify !important;"));
  assert.ok(css.includes("text-align-last: auto !important;"));
  assert.ok(css.includes("hyphens: auto;"));
  assert.ok(css.includes("overflow-wrap: break-word;"));
});

test("O estilo de justificação não é aplicado a elementos globais do hall ou a tabelas", () => {
  const start = css.indexOf("/*\n * Leitura editorial: alinhamento justificado");
  assert.ok(start >= 0);
  const segment = css.slice(start);
  assert.ok(segment.includes('.book-main'));
  assert.ok(!segment.includes(".books-page"));
  assert.ok(!segment.includes("table,th,td"));
  assert.ok(!segment.includes(".book-outline"));
});

test("Apostilas HTML legadas compartilham a regra sem depender do renderer JSON", () => {
  assert.ok(tools.includes("body.apostila-reading-layout-v2 .book-main :is(.book-section,.mindmap-section)"));
  assert.ok(tools.includes("text-align:justify!important"));
  assert.ok(tools.includes("text-align-last:auto!important"));
  assert.ok(tools.includes("-webkit-hyphens:auto"));
  assert.ok(tools.includes("overflow-wrap:break-word"));
});

test("O renderizador JSON e os HTML legados carregam os arquivos compartilhados", () => {
  const jsonBook = read("apostilas/asma/index.html");
  const htmlBook = read("apostilas/amenorreia/index.html");
  const renderer = read("assets/js/apostila-renderer.js");
  assert.ok(jsonBook.includes("apostila-renderer.css"));
  assert.ok(renderer.includes("/assets/js/apostila-tools.js"));
  assert.ok(htmlBook.includes("apostila-tools.js"));
});
