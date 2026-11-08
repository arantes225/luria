const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const base = "assets/js/games/content/";
function file(relative) { return fs.readFileSync(path.join(root,relative),"utf8"); }
function curriculum() {
  const scope = { window:{} };
  for(const part of ["initial","volume2-questions","volume2-sequences","volume2-adventure"])
    vm.runInNewContext(file(base+part+".js"),scope,{filename:part+".js"});
  return scope.window.TraubeGameContent;
}
const specialties = [
  "Clínica Médica","Cirurgia","Pediatria",
  "Ginecologia e Obstetrícia","Medicina Preventiva"
];
test("four games have expanded, original, source-attributed content", () => {
  const c=curriculum();
  assert.equal(c.questions.length,75);
  assert.equal(c.sequences.length,39);
  assert.equal(c.adventure.length,27);
  assert.equal(c.adventure.at(-1).id,"ending");
  assert.deepEqual([...new Set(c.adventure.map(s=>s.chapter))],[0,1,2]);
  assert.deepEqual([0,1,2].map(ch=>c.adventure.filter(s=>s.chapter===ch).length),[9,9,9]);
  const all=[...c.questions,...c.sequences,...c.adventure];
  assert.equal(new Set(all.map(s=>s.id)).size,all.length,"Unique IDs across game modes");
  for(const item of all){
    assert.ok(item.refs?.length,"References required: "+item.id);
    assert.ok(item.explanation?.length>=25,"Educational rationale: "+item.id);
    for(const id of item.refs)assert.match(c.sources[id]?.url||"",/^https:\/\//,"Reference "+id);
  }
});
test("each specialty and level has playable quiz and ordering pools", () => {
  const c=curriculum();
  for(const specialty of specialties){
    for(const level of [1,2,3]){
      const quiz=c.questions.filter(q=>q.specialty===specialty&&q.level===level);
      const order=c.sequences.filter(s=>s.specialty===specialty&&s.level===level);
      assert.ok(quiz.length>=5,specialty+" level "+level+" quiz");
      assert.ok(order.length>=2,specialty+" level "+level+" sequence");
    }
  }
});
test("all clinical questions have four distinct options with a single valid answer", () => {
  const c=curriculum();
  for(const q of c.questions){
    assert.equal(q.options.length,4,q.id);
    assert.equal(new Set(q.options).size,4,q.id);
    assert.ok(q.options.every(x=>typeof x==="string"&&x.length>3),q.id);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);
    assert.ok(q.prompt.length>=24,q.id);
  }
  assert.equal(c.questions.filter(q=>q.id.startsWith("v2q")).length,45);
});
test("ordering sequences encode valid permutations and explicit dependencies",()=>{
  const c=curriculum();
  for(const s of c.sequences){
    const expected=s.level===1?[4]:s.level===2?[5,6]:[6,7];
    assert.ok(expected.includes(s.steps.length),s.id);
    assert.ok(s.context.length>=30,s.id);
    assert.ok(s.variants.length,s.id);
    const baseOrder=Array.from(s.steps,(_,i)=>i);
    for(const variant of s.variants)assert.deepEqual([...variant].sort((a,b)=>a-b),baseOrder,s.id);
  }
});
test("adventure options, ordered steps, chapters and terminal scene remain valid",()=>{
  const c=curriculum();
  for(const s of c.adventure){
    if(s.type==="choice"||s.type==="select"){
      assert.equal(s.options.length,4,s.id);
      assert.equal(new Set(s.options).size,4,s.id);
    }
    if(s.type==="choice")assert.ok(s.answer>=0&&s.answer<4,s.id);
    if(s.type==="select"){
      assert.ok(Array.isArray(s.answers)&&s.answers.length>=2,s.id);
      assert.equal(new Set(s.answers).size,s.answers.length,s.id);
      assert.ok(s.answers.every(x=>Number.isInteger(x)&&x>=0&&x<4),s.id);
    }
    if(s.type==="sort"){
      assert.equal(s.steps.length,4,s.id);
      for(const variant of s.variants)assert.deepEqual([...variant].sort((a,b)=>a-b),[0,1,2,3]);
    }
  }
});
test("game pages load expanded banks before their engines; Study Rats shares quiz items",()=>{
  const urls={
    "plantao-relampago":"volume2-questions",
    "sequencia-salvadora":"volume2-sequences",
    "escapando-do-plantao":"volume2-adventure"
  };
  for(const [slug,part] of Object.entries(urls)){
    const html=file("jogos/"+slug+"/index.html");
    assert.ok(html.includes("/assets/js/games/content/"+part+".js"),slug);
    assert.ok(html.indexOf("content/initial.js")<html.indexOf(part+".js"),slug);
    assert.ok(html.indexOf(part+".js")<html.indexOf("/assets/js/games/common.js"),slug);
  }
  const study=file("jogos/study-rats/index.html");
  assert.ok(study.includes("volume2-questions.js"));
  assert.ok(study.indexOf("volume2-questions.js")<study.indexOf("study-rats/hall.js"));
  const engine=file("jogos/study-rats/game.js");
  assert.match(engine,/sharedQuestions=window\.TraubeGameContent\?\.questions/);
});
