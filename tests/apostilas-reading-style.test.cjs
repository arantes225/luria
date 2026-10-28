const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const rendererCSS = read("assets/css/apostila-renderer.css");
const sharedTools = read("assets/js/apostila-tools.js");
const startTag = "/* LURIA | Leitura editorial confortável + acentos cromáticos por tema.";
const sharedStyle = rendererCSS.slice(rendererCSS.indexOf(startTag));
const testsCSS = sharedTools.slice(sharedTools.indexOf(startTag), sharedTools.indexOf("    body.apostila-reading-layout-v2 .book-postit{z-index:40!important}"));

test("Tipografia e espaçamento em textos corridos são maiores, com limites no celular", () => {
  assert.ok(rendererCSS.includes(startTag));
  assert.match(sharedStyle, /font-size: 15\.6px !important/);
  assert.match(sharedStyle, /line-height: 1\.82 !important/);
  assert.match(sharedStyle, /margin-bottom: 22px !important/);
  assert.match(sharedStyle, /margin: 30px 0 14px !important/);
  assert.match(sharedStyle, /@media \(max-width: 640px\)/);
  assert.match(sharedStyle, /font-size: 15px !important/);
  assert.match(sharedStyle, /font-size: 13\.3px !important/);
});

test("Destaques coloridos seguem variáveis de tema sem cores fixas de superfície", () => {
  for (const token of ["--accent", "--surface", "--success", "--gold", "color-mix(in srgb"]) {
    assert.ok(sharedStyle.includes(token), token);
  }
  for (const type of [".book-mini", ".clinical-case", ".book-callout", ".book-cai-na-prova"]) {
    assert.ok(sharedStyle.includes(type), type);
  }
  assert.ok(sharedStyle.includes("linear-gradient(90deg"));
});

test("Os estilos ficam restritos à apostila, protegendo menu, hall, tabelas e sumário", () => {
  const selectors = sharedStyle.match(/(?:^|\n)\s*body\[data-page="aprender"\][^\{]+\{/g) || [];
  assert.ok(selectors.length >= 15);
  assert.ok(selectors.every(item => item.includes(".book-main")));
  assert.ok(!sharedStyle.includes(".book-outline"));
  assert.ok(!sharedStyle.includes(".books-page"));
  assert.ok(!sharedStyle.includes(".book-toc-link"));
  assert.ok(!sharedStyle.includes("text-align: left"));
  assert.ok(rendererCSS.includes("text-align: justify !important;"));
});

test("Apostilas legadas e JSON recebem as mesmas regras editoriais", () => {
  assert.ok(testsCSS.includes(startTag));
  for (const text of ["font-size: 15.6px !important", "margin-bottom: 22px !important", "var(--gold", "@media (max-width: 640px)"]) {
    assert.ok(testsCSS.includes(text), text);
  }
  const legacyHTML = read("apostilas/amenorreia/index.html");
  const jsonHTML = read("apostilas/asma/index.html");
  const renderer = read("assets/js/apostila-renderer.js");
  assert.match(legacyHTML, /apostila-tools\.js/);
  assert.match(jsonHTML, /apostila-renderer\.css/);
  assert.match(renderer, /apostila-tools\.js/);
});
