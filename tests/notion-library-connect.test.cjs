const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {JSDOM} = require("jsdom");
const read = file => fs.readFileSync(path.join(__dirname,"..",file),"utf8");

const notes = read("caderno/index.html");
const notesAlias = read("caderno.html");
const notesScript = read("assets/js/caderno.js");
const notesEditor = read("assets/js/caderno-notion-editor-fix.js");
const books = read("apostilas/index.html");
const booksCss = read("assets/css/apostilas-hall.css");
const reader = read("assets/js/apostila-tools.js");
const readerRenderer = read("assets/js/apostila-renderer.js");

test("Anotações conserva o botão Notion e seus controles; páginas de livros não os possuem", () => {
  for (const html of [notes, notesAlias]) {
    const dom = new JSDOM(html);
    const card = dom.window.document.querySelector("#notebook-view-library #notebook-notion-first-connect");
    assert.ok(card);
    assert.equal(card.hidden,false);
    for (const id of ["notebook-notion-connect","notebook-notion-refresh","notebook-notion-disconnect",
      "notebook-notion-connection-status"]) {
      assert.ok(card.querySelector("#"+id), id);
    }
    dom.window.close();
  }
  const library = new JSDOM(books).window.document;
  assert.ok(library.getElementById("books-hall-view"));
  assert.ok(library.getElementById("books-library-view"));
  assert.equal(library.querySelector("#books-library-view [id*=notion],#books-hall-view [id*=notion]"),null);
  assert.doesNotMatch(books, /notion-library-connect\.js|books-notion|Conectar Notion/i);
});

test("Sem painel, scripts nem chamadas Notion na biblioteca e leitor das apostilas", () => {
  assert.doesNotMatch(booksCss,/books-notion|notion-connection/i);
  assert.doesNotMatch(reader,/notion-api|notion-auth|notionBtn|data-apostila-notion/);
  assert.doesNotMatch(readerRenderer,/notion-api|notion-auth|notion-library-connect/i);
  assert.equal(fs.existsSync(path.join(__dirname,"..","assets/js/notion-library-connect.js")),false);
  new Function(reader);
  new Function(readerRenderer);
  assert.match(reader,/data-apostila-highlight/);
  assert.match(reader,/data-apostila-postit/);
});

test("Importação e gravação Notion permanecem restritas à biblioteca de Anotações", () => {
  assert.match(notesScript,/notion-auth/);
  assert.match(notesScript,/action:\s*"create_page"/);
  assert.match(notesScript,/notebook-notion-connect/);
  assert.match(notesEditor,/action:\s*"update_block"/);
  assert.match(notesEditor,/action:\s*"append_block"/);
  assert.match(notesEditor,/storage_source !== "notion"/);
  assert.match(books,/assets\/js\/apostilas-app\.js/);
  assert.doesNotMatch(books,/notion-api|notion-auth/);
});
