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

test("a missão diária tem três etapas e termina sempre com Feynman", () => {
 const functionText = command.slice(command.indexOf("function sessionSteps(minutes){"),command.indexOf("function dailyGuidedSession(){"));
 const context = {todayActivities:()=>[],activityMinutes:()=>30,studyActivityHref:()=>"/apostilas/"};
 const build = vm.runInNewContext(functionText+"\nsessionSteps",context);
 for(const time of [15,30,60,90,120,999]){
  const steps = build(time);
  assert.equal(steps.length,3);
  assert.equal(steps[2].href.startsWith("/feynman/"),true);
  assert.equal(steps.reduce((total,step)=>total+step.min,0),time===999?90:time);
 }
 assert.match(command,/build_topic_study_session_v1/);
 assert.match(command,/reviewHref:cardIds\.length/);
 assert.match(command,/Ensinar \$\{subject\} ao Alex · Método Feynman/);
});

test("o Dashboard nunca substitui o card diário por Voltar para a sessão", () => {
 assert.doesNotMatch(command,/Voltar para a sessão/);
 assert.match(command,/Continuar estudo de hoje/);
 assert.match(command,/Ver estudo concluído/);
 assert.match(dashboard,/Todo dia: aprenda, pratique e ensine/);
 assert.match(command,/p\.day\|\|studyDay\(new Date\(p\.createdAt\)\)/);
});

test("a sessão salva progresso por usuário e dia e não reaproveita a missão anterior", () => {
 assert.match(command,/luria:guided-study-daily:/);
 assert.match(command,/ownerId:studyOwner\(\)\|\|null/);
 assert.match(daily,/function|const restore=/);
 assert.match(daily,/clearOld/);
 assert.match(daily,/completedThrough/);
 assert.match(daily,/material-reviewed/);
 assert.match(session,/guided-study-daily\.js\?v=20261028-daily-feynman/);
});

test("a etapa Feynman só é concluída após relatório, mesmo tema e data", () => {
 assert.match(feynman,/await persistSession\("completed", report\)/);
 assert.match(feynman,/normalize\(expectedTopic\) === normalize\(state\.topic\)/);
 assert.match(feynman,/sameDay/);
 assert.match(feynman,/completeActiveStep\?\.\("feynman-assessed"\)/);
 assert.match(session,/Aprender\. Praticar\. Ensinar\./);
});

test("scripts atualizados mantêm sintaxe válida", () => {
 for(const file of ["assets/js/luria-command-center.js","assets/js/guided-study-daily.js","assets/js/dashboard-layouts.js","assets/js/feynman.mjs"]){
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}));
 }
});
