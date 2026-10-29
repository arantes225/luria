const test=require("node:test");
const assert=require("node:assert/strict");
const data=require("../assets/js/vocacao-data.js");
const engine=require("../assets/js/vocacao-engine.js");
const answer=(first=0,second=null,unfamiliar=false)=>({first,second,unfamiliar});
function simulate(selector) {
  const answers={};
  for(const q of engine.core) answers[q.id]=answer(selector(q));
  const selected=engine.selectAdaptive(answers);
  const sequence=engine.createSequence(answers,selected);
  for(const id of sequence) if(!answers[id])answers[id]=answer(selector(engine.questionIndex.get(id)));
  return {answers,sequence,report:engine.calculate(answers,sequence)};
}
test("catálogo brasileiro preserva 55 especialidades e 64 áreas",()=>{
  assert.equal(data.specialties.length,55);
  assert.equal(data.areas.length,64);
  assert.equal(data.specialties.filter(s=>s.prerequisite==="Acesso direto").length,31);
  assert.ok(data.areas.some(a=>a.name==="Cardiointensivismo"));
  assert.ok(data.areas.some(a=>a.name==="Medicina Marítima e Hiperbárica"));
  assert.equal(new Set(data.specialties.map(s=>s.id)).size,55);
  assert.equal(new Set(data.areas.map(s=>s.id)).size,64);
});
test("perguntas de três etapas não repetem nomes nem alternativas",()=>{
  assert.equal(engine.core.length,16);
  assert.ok(engine.deep.length>=24);
  assert.equal(engine.end.length,3);
  assert.equal(engine.total,29);
  const all=[...engine.core,...engine.deep,...engine.end];
  assert.equal(new Set(all.map(q=>q.id)).size,all.length);
  assert.equal(new Set(all.map(q=>q.text)).size,all.length);
  for(const q of all){
    assert.ok(q.text.length>25);
    assert.ok(q.context.length>25);
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options.map(o=>o.label)).size,4);
    for(const o of q.options){
      assert.ok(o.label.length>=22);
      assert.ok(o.tags.length>=2);
      for(const t of o.tags)assert.ok(engine.labels[t],t);
      for(const specialty of o.targets)assert.ok(data.specialties.some(s=>s.name===specialty),"especialidade não catalogada: "+specialty);
    }
  }
});
test("seleção de aprofundamento retorna dez perguntas distintas com diversidade de grupos",()=>{
  for(const preference of [0,1,2,3]) {
    const answers=Object.fromEntries(engine.core.map(q=>[q.id,answer(preference)]));
    const ids=engine.selectAdaptive(answers);
    assert.equal(ids.length,10);
    assert.equal(new Set(ids).size,10);
    const groups=ids.map(id=>engine.questionIndex.get(id).group);
    assert.equal(groups.filter(x=>x==="conteudo").length,4);
    assert.equal(groups.filter(x=>x==="tradeoff").length,2);
    assert.equal(groups.filter(x=>x==="tensao").length,2);
    assert.equal(groups.filter(x=>x==="atividade").length,1);
    assert.equal(groups.filter(x=>x==="ambiente").length,1);
  }
});
test("o questionário não aceita respostas incompletas ou inválidas",()=>{
  assert.equal(engine.validResponse(answer(4)),false);
  assert.equal(engine.validResponse(answer(0,0)),false);
  assert.equal(engine.validResponse(answer(-1,3)),true);
  assert.throws(()=>engine.selectAdaptive({}));
  assert.throws(()=>engine.calculate({},[]));
});
test("três hipóteses no máximo sem percentuais de sucesso inventados",()=>{
  for(const preference of [0,1,2,3]){
    const {report}=simulate(()=>preference);
    assert.equal(report.responded,29);
    assert.equal(report.top.length,3);
    assert.equal(new Set(report.top.map(x=>x.name)).size,3);
    for(const specialty of report.top){
      assert.equal(specialty.type,"specialty");
      assert.ok(specialty.evidence.length<=3);
      assert.ok(specialty.areas.every(a=>a.type==="area"&&a.parents.includes(specialty.name)));
    }
    for(const score of Object.values(report.scores)){
      assert.ok(Number.isFinite(score));
      assert.ok(score>=-1&&score<=1);
    }
  }
});
test("escolhas por conteúdo pediátrico e neuro reforçam os respectivos interesses",()=>{
  const pediatric=simulate(q=>{
    const found=q.options.findIndex(o=>o.tags.includes("kids"));
    return found>=0?found:0;
  });
  assert.ok(pediatric.report.scores.kids>0);
  const neuro=simulate(q=>{
    const found=q.options.findIndex(o=>o.targets.includes("Neurologia"));
    return found>=0?found:0;
  });
  assert.ok(neuro.report.top.some(s=>s.contentEvidence>0));
});
test("segunda escolha e incerteza mudam pesos sem inventar certeza",()=>{
  const a=simulate(q=>0);
  const b={...a.answers};
  for(const id of a.sequence)b[id]=answer(0,1,true);
  const report=engine.calculate(b,a.sequence);
  assert.equal(report.inexperienced,29);
  assert.equal(report.certainty,"exploratorio");
  assert.notDeepEqual(report.scores,a.report.scores);
});
