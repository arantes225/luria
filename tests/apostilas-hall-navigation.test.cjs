const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "apostilas/index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "assets/js/apostilas-app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/css/apostilas-hall.css"), "utf8");

const catalog = [
  { slug:"asma", titulo:"Asma", area:"Clínica Médica", materia:"Pneumologia", content_url:"/apostilas/asma/" },
  { slug:"infarto", titulo:"Infarto", area:"Clínica Médica", materia:"Cardiologia", content_url:"/apostilas/infarto/" },
  { slug:"amenorreia", titulo:"Amenorreia", area:"Ginecologia e Obstetrícia", materia:"Ginecologia", content_url:"/apostilas/amenorreia/" },
  { slug:"prenatal", titulo:"Pré-natal", area:"Ginecologia e Obstetrícia", materia:"Obstetrícia", content_url:"/apostilas/prenatal/" },
  { slug:"puericultura", titulo:"Puericultura", area:"Pediatria", materia:"Pediatria Geral", content_url:"/apostilas/puericultura/" }
];
const settle = () => new Promise(resolve => setTimeout(resolve, 20));

async function open(url = "https://luria.local/apostilas/") {
  const dom = new JSDOM(html, { url, runScripts:"outside-only" });
  const { window } = dom;
  window.scrollTo = () => {};
  window.supabaseClient = null;
  window.fetch = async () => ({ ok:true, json:async() => catalog });
  // Deixe o DOM estar pronto antes de carregar os scripts da aplicação.
  await new Promise(resolve => setTimeout(resolve, 0));
  window.eval(app);
  await settle();
  assert.equal(window.document.querySelectorAll("#hall-grid .hall-btn").length, 6);
  return dom;
}

test("Apostilas abre primeiro o hall, sem renderizar biblioteca ao fundo", async () => {
  const dom = await open();
  try {
    const d = dom.window.document;
    assert.equal(d.querySelector("#books-hall-view").hidden, false);
    assert.equal(d.querySelector("#books-library-view").hidden, true);
    assert.ok(d.querySelector("#books-hall-view a[href='/aprender/']"));
    assert.equal(d.querySelector("#books-hall-view #area-library"), null);
    assert.equal(d.querySelector("#books-hall-view #books-search-input"), null);
    assert.equal(d.querySelector("#hall-all-btn"), null);
    assert.match(css, /\.books-page\[hidden\][^\n]*display:none!important/);
  } finally { dom.window.close(); }
});

test("Selecionar uma área abre apenas a biblioteca da área, com URL dedicada", async () => {
  const dom = await open();
  try {
    const { window } = dom, d = window.document;
    d.querySelector('.hall-btn[href="/apostilas/?area=ginecologia-obstetricia"]').click();
    assert.equal(window.location.search, "?area=ginecologia-obstetricia");
    assert.equal(d.querySelector("#books-hall-view").hidden, true);
    assert.equal(d.querySelector("#books-library-view").hidden, false);
    assert.equal(d.querySelector("#active-banner-title").textContent, "Ginecologia e Obstetrícia");
    const books = [...d.querySelectorAll("#area-library .book-card")];
    assert.equal(books.length, 2);
    assert.ok(books.every(a => a.getAttribute("href")?.includes("amenorreia") ||
      a.getAttribute("href")?.includes("prenatal")));
    assert.equal(d.querySelectorAll("#area-library .subarea-block").length, 2);
  } finally { dom.window.close(); }
});

test("A busca só filtra a área selecionada e pode ser limpa sem sair dela", async () => {
  const dom = await open("https://luria.local/apostilas/?area=ginecologia-obstetricia");
  try {
    const { window } = dom, d = window.document;
    assert.equal(d.querySelector("#books-library-view").hidden, false);
    assert.equal(d.querySelectorAll("#area-library .book-card").length, 2);
    const input = d.querySelector("#books-search-input");
    input.value = "asma";
    input.dispatchEvent(new window.Event("input", { bubbles:true }));
    assert.match(d.querySelector("#area-library").textContent, /Nenhuma apostila/);
    d.querySelector("#books-reset-filters").click();
    assert.equal(window.location.search, "?area=ginecologia-obstetricia");
    assert.equal(d.querySelectorAll("#area-library .book-card").length, 2);
  } finally { dom.window.close(); }
});

test("Área sem conteúdo mostra estado vazio e permite voltar ao hall", async () => {
  const dom = await open("https://luria.local/apostilas/?area=psiquiatria");
  try {
    const { window } = dom, d = window.document;
    assert.equal(d.querySelector("#books-library-view").hidden, false);
    assert.match(d.querySelector("#area-library").textContent, /Ainda não há apostilas/);
    d.querySelector("#books-back-hall").click();
    assert.equal(d.querySelector("#books-hall-view").hidden, false);
    assert.equal(d.querySelector("#books-library-view").hidden, true);
    assert.equal(window.location.search, "");
  } finally { dom.window.close(); }
});

test("Voltar do navegador restaura o hall sem mostrar todas as bibliotecas", async () => {
  const dom = await open();
  try {
    const { window } = dom, d = window.document;
    d.querySelector('.hall-btn[href="/apostilas/?area=clinica-medica"]').click();
    assert.equal(d.querySelector("#books-library-view").hidden, false);
    window.history.back();
    await settle();
    assert.equal(window.location.search, "");
    assert.equal(d.querySelector("#books-hall-view").hidden, false);
    assert.equal(d.querySelector("#books-library-view").hidden, true);
  } finally { dom.window.close(); }
});
