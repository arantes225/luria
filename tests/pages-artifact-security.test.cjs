"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const builder = path.resolve(__dirname, "../scripts/build-public-pages.cjs");
const dirs = [
  "admin", "amigos", "apostilas", "aprender", "assets", "beta-testers",
  "caderno-erros", "caderno", "configuracoes", "consolidar", "content",
  "cronograma", "dashboard", "data", "desafio-diario", "editais",
  "estatisticas", "estudar", "flashcards", "login", "mini-osce",
  "plantao", "professor-alex", "questoes-simulados", "registrar-questoes",
  "resolver-questoes", "sessao-estudo", "trabalho"
];
function makeProject() {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"luria-pages-test-"));
  for(const p of dirs)fs.mkdirSync(path.join(root,p),{recursive:true});
  for(const p of [".nojekyll","CNAME","manifest.webmanifest","service-worker.js","index.html","assets/js/app.js","apostilas/index.html","flashcards/index.html"]) {
    const abs=path.join(root,p);fs.mkdirSync(path.dirname(abs),{recursive:true});fs.writeFileSync(abs,p==="CNAME"?"example.test":"safe");
  }
  return root;
}
function build(root) {return spawnSync(process.execPath,[builder],{cwd:root,encoding:"utf8",timeout:20000});}
function cleanup(root) {fs.rmSync(root,{recursive:true,force:true});}
test("does not publish internal directories or disguised nested factory folders", () => {
 const root=makeProject();
 try {
  for(const p of ["db/schema.sql","docs/private.md","assets/qf-staging/reviews.json","assets/secrets/key.txt","assets/private/notes.json","assets/js/index.js.map"]) {
    const file=path.join(root,p);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,"sensitive internal content");
  }
  const result=build(root);assert.equal(result.status,0,result.stderr);
  for(const p of ["db","docs","assets/qf-staging","assets/secrets","assets/private","assets/js/index.js.map"]) assert.equal(fs.existsSync(path.join(root,".pages-dist",p)),false,p);
 }finally{cleanup(root)}
});
test("stops build on synthetic sb_secret key",()=>{
 const root=makeProject();
 try{
  fs.writeFileSync(path.join(root,"assets","bad.js"),"const token='sb_secret_TEST_NOT_REAL_FOR_CI';");
  const result=build(root);assert.notEqual(result.status,0);
  assert.match(result.stderr,/Supabase secret key detected/);
 }finally{cleanup(root)}
});
test("stops build on synthetic service_role JWT",()=>{
 const root=makeProject();
 try{
  const enc=o=>Buffer.from(JSON.stringify(o)).toString("base64url");
  const dummy=enc({alg:"HS256"})+"."+enc({role:"service_role",sub:"CI-SYNTHETIC"})+".fake_signature";
  fs.writeFileSync(path.join(root,"assets","bad.js"),"const token='"+dummy+"';");
  const result=build(root);assert.notEqual(result.status,0);
  assert.match(result.stderr,/Service-role JWT detected/);
 }finally{cleanup(root)}
});
