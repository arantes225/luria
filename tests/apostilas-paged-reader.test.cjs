const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {JSDOM} = require("jsdom");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const reader = read("assets/js/apostila-paged-reader.js");
const css = read("assets/css/apostila-paged-reader.css");

function makeReader(url = "https://traube.test/apostilas/asma/") {
  const dom = new JSDOM(
    '<!doctype html><html lang="pt-BR"><head></head><body data-page="aprender">' +
    '<section class="book-page"><aside class="book-outline"></aside><article class="book-main">' +
    '<section class="book-hero"><h1>Asma</h1><nav class="book-toc-nav">' +
    '<a href="#cap1" class="book-toc-link">Capítulo 1</a></nav></section>' +
    '<section class="book-section" id="cap1"><h2>Capítulo 1</h2><p>Texto 1</p>' +
    '<ul><li>Item importante</li></ul></section>' +
    '<section class="book-section" id="cap2"><h2>Capítulo 2</h2><p>Texto 2</p></section>' +
    '</article></section></body></html>', {url, runScripts:"outside-only"});
  const {window} = dom;
  window.requestAnimationFrame = callback => { callback(); return 1; };
  window.cancelAnimationFrame = () => {};
  window.scrollTo = () => {};
  const main = window.document.querySelector(".book-main");
  Object.defineProperty(main, "clientWidth", {get:() => 800});
  Object.defineProperty(main, "scrollWidth", {get:() => 3308});
  main.scrollTo = options => {main.scrollLeft = options.left;};
  main.scrollLeft = 0;
  window.eval(reader);
  window.document.querySelector('link[href*="apostila-paged-reader.css"]')
    ?.dispatchEvent(new window.Event("load"));
  return dom;
}

test("O leitor mantém o conteúdo e IDs originais e oferece dois modos", () => {
  const dom = makeReader();
  try {
    const {document:d} = dom.window;
    assert.ok(d.body.classList.contains("traube-reader-paged"));
    assert.ok(d.querySelector(".traube-reader-shell > .book-main"));
    assert.equal(d.querySelectorAll("#cap1").length, 1);
    assert.equal(d.querySelectorAll("#cap2").length, 1);
    assert.equal(d.querySelectorAll(".book-main .book-section").length, 2);
    assert.equal(d.querySelector("[data-reader-label]").textContent, "Página 1 de 4");
    assert.equal(d.querySelector("[data-reader-prev]").disabled, true);
    assert.equal(d.querySelector("[data-reader-next]").disabled, false);
    assert.equal(d.querySelectorAll('.book-main .book-toc-link').length, 1);
  } finally {dom.window.close();}
});

test("Anterior, Próxima e seletor de páginas funcionam sem mudar a apostila", () => {
  const dom = makeReader();
  try {
    const {document:d, Event} = dom.window;
    const main = d.querySelector(".book-main");
    d.querySelector("[data-reader-next]").click();
    assert.equal(d.querySelector("[data-reader-label]").textContent, "Página 2 de 4");
    assert.equal(main.scrollLeft, 836);
    const slider=d.querySelector(".traube-reader-jump");
    slider.value="4";
    slider.dispatchEvent(new Event("input",{bubbles:true}));
    assert.equal(main.scrollLeft, 2508);
    assert.equal(d.querySelector("[data-reader-next]").disabled, true);
    d.querySelector("[data-reader-prev]").click();
    assert.equal(d.querySelector("[data-reader-label]").textContent, "Página 3 de 4");
  } finally {dom.window.close();}
});

test("O sumário interno abre a página correspondente e preserva a âncora", () => {
  const dom = makeReader();
  try {
    const {window} = dom, d=window.document;
    const heading=d.querySelector("#cap1 h2");
    heading.getBoundingClientRect = () => ({left:1740, right:1800, top:10, bottom:40});
    const main=d.querySelector(".book-main");
    main.getBoundingClientRect = () => ({left:0, top:0});
    d.querySelector(".book-toc-link").click();
    assert.equal(main.scrollLeft, 1672);
    assert.equal(window.location.hash, "#cap1");
  } finally {dom.window.close();}
});

test("Modo contínuo restaura rolamento vertical e preferência sem duplicar conteúdo", () => {
  const dom = makeReader();
  try {
    const {document:d, localStorage} = dom.window;
    const toggle=d.querySelector("[data-reader-toggle]");
    toggle.click();
    assert.equal(d.body.classList.contains("traube-reader-paged"), false);
    assert.equal(d.querySelector(".traube-reader-footer").hidden, true);
    assert.equal(localStorage.getItem("traube-apostila-reading-mode"), "continuous");
    assert.equal(d.querySelectorAll(".book-main .book-section").length, 2);
    toggle.click();
    assert.equal(d.body.classList.contains("traube-reader-paged"), true);
    assert.equal(localStorage.getItem("traube-apostila-reading-mode"), "paged");
  } finally {dom.window.close();}
});

test("Modo incorporado à tela de anotações abre em leitura contínua", () => {
  const dom = makeReader("https://traube.test/apostilas/asma/?embedded=1");
  try {
    assert.equal(dom.window.document.body.classList.contains("traube-reader-paged"), false);
    assert.equal(dom.window.document.querySelector(".traube-reader-footer").hidden, true);
  } finally {dom.window.close();}
});

test("CSS cria páginas, distribui seções longas e protege quadros, figuras e mobile", () => {
  assert.match(css, /column-fill: auto !important/);
  assert.match(css, /column-width: var\(--traube-column-width, 650px\)/);
  assert.match(css, /height: var\(--traube-reader-height, 720px\)/);
  assert.match(css, /display: contents !important/);
  assert.match(css, /break-after: column !important/);
  assert.match(css, /break-inside: avoid-column/);
  assert.match(css, /@media\(max-width:640px\)/);
  assert.match(css, /traube-dual-active/);
  assert.match(css, /text-align: justify !important/);
  assert.ok(!css.includes(".books-hall-section"));
});
