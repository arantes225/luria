const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {JSDOM} = require("jsdom");
const read = file => fs.readFileSync(path.join(__dirname, "..", file), "utf8");

const notes = read("caderno/index.html");
const notesAlias = read("caderno.html");
const notesScript = read("assets/js/caderno.js");
const notesCss = read("assets/css/caderno.css");
const books = read("apostilas/index.html");
const booksCss = read("assets/css/apostilas-hall.css");
const booksScript = read("assets/js/notion-library-connect.js");

test("Biblioteca de Anotações exibe conectar mesmo antes do status, com controles separados", () => {
  for (const html of [notes, notesAlias]) {
    const dom = new JSDOM(html);
    const card = dom.window.document.querySelector("#notebook-view-library #notebook-notion-first-connect");
    assert.ok(card, "controle dentro da biblioteca de Anotações");
    assert.equal(card.hidden, false);
    for (const id of ["notebook-notion-connect","notebook-notion-refresh","notebook-notion-disconnect",
      "notebook-notion-connection-status"]) {
      assert.ok(card.querySelector("#"+id), id);
    }
    dom.window.close();
  }
  assert.match(notesScript,/updateNotionConnectionUi\(\);\s*if \(!notionSourceState\.connected\)/);
  assert.match(notesScript,/card\.hidden = false;/);
  assert.match(notesScript,/notebook-notion-refresh"\)\?\.addEventListener\("click", refreshNotionSource\)/);
  assert.match(notesScript,/notebook-notion-disconnect"\)\?\.addEventListener\("click", disconnectNotion\)/);
  assert.match(notesCss,/notebook-notion-connect-actions/);
});

test("Botão Notion fica na biblioteca de área, não no hall de apostilas", () => {
  const dom = new JSDOM(books, {url:"https://www.resibulando.online/apostilas/"});
  const d=dom.window.document;
  assert.equal(d.querySelector("#books-hall-view #books-notion-connect"),null);
  assert.ok(d.querySelector("#books-library-view #books-notion-connect"));
  assert.ok(d.querySelector("#books-library-view #books-notion-status"));
  assert.match(booksCss,/#books-library-view \.books-notion-connection/);
  dom.window.close();
});

test("Biblioteca mostra estado real após consultar Notion, sem dizer conectado por suposição", async () => {
  const dom = new JSDOM(books,{url:"https://www.resibulando.online/apostilas/?area=clinica-medica",runScripts:"outside-only"});
  const w = dom.window;
  let calls=[];
  w.supabaseClient = {functions:{invoke:async (name,arg)=>{
    calls.push([name,arg.body]);return {data:{configured:true,connected:true}};
  }}};
  w.eval(booksScript);
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(calls.length,1);
  assert.deepEqual(calls[0],["notion-api",{action:"status"}]);
  assert.equal(w.document.querySelector("#books-notion-connect").hidden,true);
  assert.equal(w.document.querySelector("#books-notion-open").hidden,false);
  assert.match(w.document.querySelector("#books-notion-status").textContent,/conectado/i);
  dom.window.close();
});

test("Sem conexão Notion, clicar solicita OAuth autenticado, não escreve tokens no navegador", async () => {
  const dom = new JSDOM(books,{url:"https://www.resibulando.online/apostilas/?area=pediatria",runScripts:"outside-only"});
  const w=dom.window;
  const calls=[];
  w.supabaseClient={functions:{invoke:async (name,arg)=>{
    calls.push([name,arg.body]);
    if(name==="notion-api")return {data:{configured:true,connected:false}};
    return {data:{url:null}};
  }}};
  w.eval(booksScript);
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(w.document.querySelector("#books-notion-connect").hidden,false);
  w.document.querySelector("#books-notion-connect").click();
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(calls[1][0],"notion-auth");
  assert.equal(calls[1][1].redirect_to,
    "https://www.resibulando.online/caderno/?view=library&notion=connected");
  assert.match(w.document.querySelector("#books-notion-status").textContent,/configurado/i);
  assert.ok(!/service_role|access_token|client_secret/i.test(booksScript));
  dom.window.close();
});
