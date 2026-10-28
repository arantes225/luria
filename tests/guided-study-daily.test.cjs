const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const command = read("assets/js/luria-command-center.js");
const daily = read("assets/js/guided-study-daily.js");
const feynman = read("assets/js/feynman.mjs");
const session = read("sessao-estudo/index.html");
const dashboard = read("assets/js/dashboard-layouts.js");
const sessionController = read("assets/js/guided-study-session-page.js");

test("estudo novo encerra com Feynman e revisão começa por diagnóstico Feynman", () => {
 const fn=command.slice(command.indexOf("function activityTopic(activity){"),command.indexOf("function dailyGuidedSession(){"));
 const build=(activities)=>vm.runInNewContext(fn+"\nsessionSteps",{todayActivities:()=>activities,activityMinutes:()=>30,studyActivityHref:()=>"/caderno/"});
 for(const time of [15,30,60,90,120,999]){
  const normal=build([])(time);
  const review=build([{kind:"subject_review",title:"Revisão de Sepse",activity_date:"2026-10-28"}])(time);
  assert.equal(normal.length,3);
  assert.equal(review.length,3);
  assert.equal(normal[2].href.startsWith("/feynman/"),true);
  assert.equal(review[0].href.startsWith("/feynman/"),true);
  assert.match(review[0].href,/Sepse/);
  assert.match(review[2].href,/resolver-questoes/);
  assert.equal(normal.reduce((n,step)=>n+step.min,0),time===999?90:time);
  assert.equal(review.reduce((n,step)=>n+step.min,0),time===999?90:time);
 }
 assert.match(command,/build_topic_study_session_v1/);
 assert.match(command,/reviewHref=cardIds\.length/);
 assert.match(command,/Feynman inicial/);
 assert.match(command,/Revisar um assunto/);
});

test("o motor temático também diferencia estudo e revisão",async()=>{
 const start=command.indexOf("function safeStudyHref(value,fallback){");
 const end=command.indexOf("function scheduledStudyActivity(){",start);
 const source=command.slice(start,end);
 const mock={rpc:async()=>({data:{apostila:{title:"Sepse",url:"/apostilas/sepse/"},question_set_id:"fake-id",question_count:5,flashcards:[]},error:null})};
 const ctx={window:{supabaseClient:mock},studyBundleCounts:()=>({questions:5,flashcards:8}),location:{origin:"https://luria.test"},URL,encodeURIComponent};
 const build=vm.runInNewContext(source+"\ntopicStudySteps",ctx);
 const fresh=await build("Sepse",30,"new");
 const review=await build("Sepse",30,"review");
 assert.equal(fresh.steps[2].href.startsWith("/feynman/"),true);
 assert.equal(review.steps[0].href.startsWith("/feynman/"),true);
 assert.equal(review.steps[1].href,"/apostilas/sepse/");
 assert.match(review.steps[2].href,/resolver-questoes/);
 assert.equal(review.mode,"review");
});

test("o Dashboard nunca substitui o card diário por Voltar para a sessão", () => {
 assert.doesNotMatch(command,/Voltar para a sessão/);
 assert.match(command,/Continuar estudo de hoje/);
 assert.match(command,/Ver estudo concluído/);
 assert.match(dashboard,/Revisão: Feynman logo no início/);
 assert.match(command,/p\.day\|\|studyDay\(new Date\(p\.createdAt\)\)/);
});

test("a sessão salva progresso por usuário e dia e não reaproveita a missão anterior", () => {
 assert.match(command,/luria:guided-study-daily:/);
 assert.match(command,/ownerId:studyOwner\(\)\|\|null/);
 assert.match(daily,/function|const restore=/);
 assert.match(daily,/clearOld/);
 assert.match(daily,/completedThrough/);
 assert.match(daily,/material-reviewed/);
 assert.match(session,/guided-study-daily\.js\?v=20261028-review-first/);
});

test("a etapa Feynman só é concluída após relatório, mesmo tema e data", () => {
 assert.match(feynman,/await persistSession\("completed", report\)/);
 assert.match(feynman,/normalize\(expectedTopic\) === normalize\(state\.topic\)/);
 assert.match(feynman,/sameDay/);
 assert.match(feynman,/luria:guided-study-diagnostic/);
 assert.match(feynman,/completeActiveStep\?\.\("feynman-assessed"\)/);
 assert.match(session,/Aprender\. Praticar\. Ensinar\./);
 assert.match(sessionController,/Diagnóstico Feynman · Onde focar sua revisão/);
 assert.match(session,/src="\/assets\/js\/guided-study-session-page\.js/);
 assert.doesNotMatch(session,/<script>\s*\(function/);
 assert.match(daily,/active\.activeIndex===next/);
});

test("scripts atualizados mantêm sintaxe válida", () => {
 for(const file of ["assets/js/luria-command-center.js","assets/js/guided-study-daily.js","assets/js/dashboard-layouts.js","assets/js/feynman.mjs","assets/js/guided-study-session-page.js"]){
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}));
 }
});
