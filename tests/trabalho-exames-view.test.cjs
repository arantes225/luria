"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-interpreter.js"), "utf8");
const extraScript = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-extra-catalog.js"), "utf8");
const curatedScripts = [1,2,3,4,5].map(i=>fs.readFileSync(path.join(root, `assets/js/trabalho-exames-curated-0${i}.js`), "utf8"));
const preanalyticalScript = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-preanalytical.js"), "utf8");
const detailsScript = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-details.js"), "utf8");

function openTool() {
  const dom = new JSDOM('<!doctype html><html><body data-page="trabalho_exames"><div id="exam-tool"></div></body></html>', {
    url: "https://www.resibulando.online/trabalho/exames/",
    runScripts: "outside-only"
  });
  dom.window.eval(extraScript);
  for(const code of curatedScripts)dom.window.eval(code);
  dom.window.eval(preanalyticalScript);
  dom.window.eval(detailsScript);
  dom.window.eval(script);
  return dom;
}

test("Exames starts with exactly one title card, right-aligned return and alphabetical reference cards only", () => {
  const dom = openTool(); const doc = dom.window.document;
  const card = doc.querySelector("#exam-tool .ex-title-card");
  assert.ok(card);
  assert.equal(card.querySelectorAll("h2").length, 1);
  assert.equal(card.querySelector("h2").textContent, "Exames");
  assert.equal(card.querySelector(".ex-back-link").getAttribute("href"), "/trabalho/");
  assert.ok(card.lastElementChild.classList.contains("ex-back-link"));
  assert.equal(doc.querySelector("#ex-patient-tabs").hidden, true);
  assert.equal(doc.querySelector("#ex-age-wrap").hidden, true);
  assert.equal(doc.querySelectorAll(".ex-test.ex-reference-only").length, 423);
  assert.equal(doc.querySelectorAll(".ex-test.ex-card").length, 423);
  assert.equal(doc.querySelectorAll(".ex-test input, .ex-test select").length, 0);
  assert.ok(doc.querySelector("[data-row='g1t1'] .ex-ref").textContent.includes("12"));
  dom.window.close();
});

test("Patient result fields and analysis open only after explicit action, closing restores read-only references", () => {
  const dom = openTool(); const doc = dom.window.document;
  const button = doc.querySelector("#ex-patient-toggle");
  button.click();
  assert.equal(button.getAttribute("aria-expanded"), "true");
  assert.equal(doc.querySelector("#ex-patient-tabs").hidden, false);
  const hemoglobin = doc.querySelector('[data-id="g1t1"][data-field="value"]');
  assert.ok(hemoglobin);
  hemoglobin.value = "9,2";
  hemoglobin.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  doc.querySelector("#ex-analyze").click();
  assert.match(doc.querySelector("#ex-panel").textContent, /Hemoglobina abaixo|Hemoglobina reduzida/i);
  button.click();
  assert.equal(button.getAttribute("aria-expanded"), "false");
  assert.equal(doc.querySelectorAll(".ex-test input, .ex-test select").length, 0);
  assert.equal(doc.querySelector("#ex-patient-tabs").hidden, true);
  button.click();
  assert.equal(doc.querySelector('[data-id="g1t1"][data-field="value"]').value, "9,2");
  dom.window.close();
});

test("Both clinical pages use same versioned assets and suppress duplicate top title", () => {
  for (const dir of ["exames", "laboratorio"]) {
    const html = fs.readFileSync(path.join(root, "trabalho", dir, "index.html"), "utf8");
    assert.match(html, /data-ui-heading="provided"/);
    assert.match(html, /trabalho-exames-interpreter\.css\?v=20261029-review2/);
    assert.match(html, /trabalho-exames-extra-catalog\.js\?v=20261029-extras/);
    for(let i=1;i<=5;i++)assert.match(html,new RegExp(`trabalho-exames-curated-0${i}\\.js\\?v=20261030-individual`));
    assert.match(html, /trabalho-exames-preanalytical\.js\?v=20261030-prep1/);
    assert.match(html, /trabalho-exames-details\.js\?v=20261030-prep1/);
    assert.match(html, /trabalho-exames-interpreter\.js\?v=20261030-prep1/);
  }
});

test("Exames are sorted A–Z and area selector is alphabetical and works with search", () => {
  const dom = openTool(); const doc = dom.window.document;
  const names = [...doc.querySelectorAll(".ex-test.ex-card h4")].map(el => el.textContent);
  const collator = new Intl.Collator("pt-BR", { sensitivity:"base", numeric:true });
  assert.deepEqual(names, [...names].sort(collator.compare));
  const select = doc.querySelector("#ex-area");
  assert.equal(select.options.length, 38);
  assert.equal(select.options[0].textContent, "Todas as áreas");
  const areas = [...select.options].slice(1).map(o => o.textContent);
  assert.deepEqual(areas, [...areas].sort(collator.compare));
  select.value = "1";
  select.dispatchEvent(new dom.window.Event("change", { bubbles:true }));
  assert.equal(doc.querySelectorAll(".ex-test.ex-card").length, 27);
  const search = doc.querySelector("#ex-search");
  search.value = "hemoglobina";
  search.dispatchEvent(new dom.window.Event("input", { bubbles:true }));
  assert.ok(doc.querySelectorAll(".ex-test.ex-card").length > 0);
  assert.ok([...doc.querySelectorAll(".ex-test.ex-card h4")].every(el => el.textContent.toLowerCase().includes("hemoglobina")));
  select.value = "";
  select.dispatchEvent(new dom.window.Event("change", { bubbles:true }));
  assert.ok(doc.querySelectorAll(".ex-test.ex-card").length > 0);
  search.value = "acido urico";
  search.dispatchEvent(new dom.window.Event("input", { bubbles:true }));
  assert.ok([...doc.querySelectorAll(".ex-test.ex-card h4")].some(el => el.textContent === "Ácido úrico"));
  dom.window.close();
});

test("Quick kits keep alphabetical order and patient entry inside cards", () => {
  const dom = openTool(); const doc = dom.window.document;
  doc.querySelector('[data-kit="anemia"]').click();
  const cards = [...doc.querySelectorAll(".ex-test.ex-card")];
  assert.equal(cards.length, 15);
  const collator = new Intl.Collator("pt-BR", { sensitivity:"base", numeric:true });
  const names = cards.map(el => el.querySelector("h4").textContent);
  assert.deepEqual(names, [...names].sort(collator.compare));
  doc.querySelector("#ex-patient-toggle").click();
  assert.equal(doc.querySelectorAll(".ex-patient-card").length, 15);
  assert.ok(doc.querySelector('[data-id="g1t1"][data-field="value"]'));
  dom.window.close();
});

test("All 170 additional exams belong to 17 unique areas and avoid generic reference limits", () => {
  const dom = openTool();
  const base=dom.window.LURIA_EXAM_CATALOG,extra=dom.window.LURIA_EXAM_EXTRA_CATALOG;
  const combined=[...base,...extra];
  assert.equal(base.length,20);
  assert.equal(extra.length,17);
  assert.equal(combined.length,37);
  assert.equal(combined.flatMap(g=>g.tests).length,423);
  assert.ok(extra.every(g=>g.tests.length===10));
  const exams=combined.flatMap(g=>g.tests);
  const keys=exams.map(t=>t.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase());
  assert.equal(new Set(keys).size,423);
  assert.equal(new Set(exams.map(t=>t.id)).size,423);
  assert.ok(extra.every(g=>g.tests.every(t=>t.min===null&&t.max===null)));
  assert.equal(dom.window.document.querySelectorAll(".ex-test.ex-card").length,423);
  dom.window.close();
});

test("New culture, ABO/RhD typing and numeric parameters have distinct result controls", () => {
  const dom=openTool(),d=dom.window.document;
  d.querySelector("#ex-patient-toggle").click();
  const culture=d.querySelector('[data-id="g22t1"][data-field="value"]');
  const blood=d.querySelector('[data-id="g21t1"][data-field="value"]');
  const reticulocyteHb=d.querySelector('[data-id="g21t6"][data-field="value"]');
  assert.equal(culture.tagName,"INPUT");
  assert.equal(culture.getAttribute("inputmode"),"text");
  assert.equal(blood.tagName,"SELECT");
  assert.ok([...blood.options].some(o=>o.value==="AB+"));
  assert.equal(reticulocyteHb.getAttribute("inputmode"),"decimal");
  culture.value="Escherichia coli";culture.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  blood.value="O+";blood.dispatchEvent(new dom.window.Event("change",{bubbles:true}));
  reticulocyteHb.value="27,5";reticulocyteHb.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  for(const id of ["g22t1","g21t1","g21t6"])
    assert.equal(d.querySelector('[data-row="'+id+'"] [data-status]').textContent,"Registrado");
  d.querySelector("#ex-analyze").click();
  assert.match(d.querySelector("#ex-panel").textContent,/Escherichia coli/);
  dom.window.close();
});

test("Newly added groups are filterable and remain alphabetical", () => {
  const dom=openTool(),d=dom.window.document,select=d.querySelector("#ex-area");
  select.value="36";select.dispatchEvent(new dom.window.Event("change",{bubbles:true}));
  const names=[...d.querySelectorAll(".ex-test.ex-card h4")].map(el=>el.textContent);
  assert.equal(names.length,10);
  assert.deepEqual(names,[...names].sort(new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true}).compare));
  assert.ok(names.includes("Cloreto no suor"));
  dom.window.close();
});

test("All 423 cards provide complete clinical education without invented new numeric ranges", () => {
  const dom=openTool(), d=dom.window.document, metadata=dom.window.LURIA_EXAM_DETAILS;
  const all=[...dom.window.LURIA_EXAM_CATALOG,...dom.window.LURIA_EXAM_EXTRA_CATALOG].flatMap(g=>g.tests);
  assert.equal(Object.keys(metadata).length,423);
  assert.equal(d.querySelectorAll(".ex-test.ex-card .ex-test-details").length,423);
  assert.ok(all.every(t=>metadata[t.id]&&["purpose","sample","interpretation","caution","sourceLabel","sourceUrl","referencePolicy","unitPolicy"].every(k=>typeof metadata[t.id][k]==="string"&&metadata[t.id][k].trim().length>5)));
  assert.ok(all.every(t=>t.kind!=="numeric"||(t.unit!=="Conforme laudo"&&t.unit.trim().length>0)));
  assert.ok(all.filter(t=>t.group>=21).every(t=>t.min==null&&t.max==null));
  const hem=d.querySelector('[data-row="g1t1"] .ex-test-details');
  assert.match(hem.textContent,/OMS|hemoglobina/i);
  const href=hem.querySelector("a").getAttribute("href");
  assert.match(href,/^https:\/\//);
  dom.window.close();
});
test("Cultures, titers and specialized reports accept textual results without false normal flags", () => {
  const dom=openTool(),d=dom.window.document;
  d.querySelector("#ex-patient-toggle").click();
  const ids=["g14t14","g17t11","g16t1","g18t5","g21t1"];
  for (const id of ids) {
    const el=d.querySelector('[data-id="'+id+'"][data-field="value"]');
    assert.ok(el,id);
    if(id==="g21t1"){assert.equal(el.tagName,"SELECT");el.value="AB+";}
    else {assert.equal(el.tagName,"INPUT");assert.equal(el.getAttribute("inputmode"),"text");el.value="Laudo sob avaliação";}
    el.dispatchEvent(new dom.window.Event("change",{bubbles:true}));
    assert.equal(d.querySelector('[data-row="'+id+'"] [data-status]').textContent,"Registrado");
  }
  assert.equal(d.querySelectorAll(".ex-test.ex-card .ex-test-details").length,423);
  dom.window.close();
});
test("Clinical summaries do not hardcode drug administration for isolated critical values",()=>{
  assert.doesNotMatch(script,/ECG imediato \+ Gluconato de Cálcio/);
  assert.doesNotMatch(script,/iniciar Cefepima ou Piperacilina-Tazobactam na 1ª hora/);
  assert.doesNotMatch(script,/indicação de drenagem torácica!/);
});

test("Second audit does not claim normality when only a one-sided diagnostic limit exists",()=>{
  const dom=openTool(),d=dom.window.document;
  const label=d.querySelector('[data-row="g1t1"] .ex-ref');
  assert.match(label.textContent,/≥\s*12/);
  d.querySelector("#ex-patient-toggle").click();
  const hb=d.querySelector('[data-id="g1t1"][data-field="value"]');
  hb.value="14";hb.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  assert.equal(d.querySelector('[data-row="g1t1"] [data-status]').textContent,"Registrado");
  hb.value="10";hb.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  assert.equal(d.querySelector('[data-row="g1t1"] [data-status]').textContent,"Abaixo");
  dom.window.close();
});

test("Second audit prevents wrong-unit data from triggering sodium alerts",()=>{
  const dom=openTool(),d=dom.window.document;
  d.querySelector("#ex-patient-toggle").click();
  const val=d.querySelector('[data-id="g3t1"][data-field="value"]');
  const unit=d.querySelector('[data-id="g3t1"][data-field="unit"]');
  assert.ok(unit);assert.equal(unit.value,"mmol/L");
  val.value="170";val.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  assert.equal(d.querySelector('[data-row="g3t1"] [data-status]').textContent,"Acima");
  unit.value="mg/dL";unit.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  assert.equal(d.querySelector('[data-row="g3t1"] [data-status]').textContent,"Unidade divergente");
  d.querySelector("#ex-analyze").click();
  assert.match(d.querySelector("#ex-panel").textContent,/Unidade divergente/);
  assert.doesNotMatch(d.querySelector("#ex-panel .ex-findings").textContent,/Distúrbio importante do sódio|Sódio em faixa potencialmente crítica/);
  dom.window.close();
});

test("Second audit rejects invalid and negative lab values before clinical inferences",()=>{
  const dom=openTool(),d=dom.window.document;
  d.querySelector("#ex-patient-toggle").click();
  const pot=d.querySelector('[data-id="g3t2"][data-field="value"]');
  pot.value="-8";pot.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  assert.equal(d.querySelector('[data-row="g3t2"] [data-status]').textContent,"Valor inválido");
  d.querySelector("#ex-analyze").click();
  assert.doesNotMatch(d.querySelector("#ex-panel .ex-findings").textContent,/Distúrbio do potássio|Potássio em faixa potencialmente crítica/);
  dom.window.close();
});

test("Second audit provides method-appropriate options and descriptive assay reports",()=>{
  const dom=openTool(),d=dom.window.document;
  const all=[...dom.window.LURIA_EXAM_CATALOG,...dom.window.LURIA_EXAM_EXTRA_CATALOG].flatMap(g=>g.tests);
  const named=n=>all.find(t=>t.name===n);
  assert.equal(named("Anti-HBs").kind,"text");
  assert.equal(named("IGRA para tuberculose").kind,"text");
  assert.deepEqual(Array.from(named("Prova cruzada pré-transfusional").options),["Compatível","Incompatível","Indeterminado"]);
  assert.deepEqual(Array.from(named("RT-PCR para SARS-CoV-2").options),["Detectado","Não detectado","Indeterminado"]);
  d.querySelector("#ex-patient-toggle").click();
  assert.equal(d.querySelector('[data-id="'+named("Anti-HBs").id+'"][data-field="value"]').getAttribute("inputmode"),"text");
  assert.ok([...d.querySelector('[data-id="'+named("Prova cruzada pré-transfusional").id+'"][data-field="value"]').options].some(o=>o.value==="Compatível"));
  dom.window.close();
});

test("Second audit adds gestational glucose context without diagnosing from isolated results",()=>{
  const dom=openTool(),d=dom.window.document;
  d.querySelector("#ex-patient-toggle").click();
  const profile=d.querySelector("#ex-pop");
  profile.value="gest-2";profile.dispatchEvent(new dom.window.Event("change",{bubbles:true}));
  const val=d.querySelector('[data-id="g6t1"][data-field="value"]');
  val.value="97";val.dispatchEvent(new dom.window.Event("input",{bubbles:true}));
  d.querySelector("#ex-analyze").click();
  assert.match(d.querySelector("#ex-panel .ex-findings").textContent,/Glicemia de jejum na gestação/);
  assert.match(d.querySelector("#ex-panel .ex-findings").textContent,/92 mg\/dL/);
  dom.window.close();
});

test("Every one of 423 exams has distinct authored clinical purpose and interpretation",()=>{
  const dom=openTool(),d=dom.window.document,metadata=dom.window.LURIA_EXAM_DETAILS,audit=dom.window.LURIA_EXAM_CONTENT_AUDIT;
  assert.deepEqual([audit.total,audit.filled,audit.missing.length],[423,423,0]);
  const items=[...dom.window.LURIA_EXAM_CATALOG,...dom.window.LURIA_EXAM_EXTRA_CATALOG].flatMap(g=>g.tests);
  assert.equal(new Set(items.map(t=>t.id)).size,423);
  assert.equal(Object.keys(dom.window.LURIA_EXAM_CURATED).length,423);
  for(const t of items){
    const m=metadata[t.id],curated=dom.window.LURIA_EXAM_CURATED[t.id];
    assert.ok(m&&m.contentReviewed,t.id);
    assert.equal(m.purpose,curated.purpose,t.id);
    assert.equal(m.interpretation,curated.interpretation,t.id);
    assert.ok(m.purpose.length>15&&m.interpretation.length>20,t.id);
    assert.doesNotMatch(m.purpose,/^Aplicação clínica de /);
  }
  assert.equal(d.querySelectorAll(".ex-test-details").length,423);
  dom.window.close();
});

test("Specific validated reference notes are displayed without fabricating reference limits",()=>{
  const dom=openTool(),d=dom.window.document,audit=dom.window.LURIA_EXAM_CONTENT_AUDIT;
  assert.equal(audit.filled,423);
  const tests=[["Glicemia em jejum",/100.125/],["TFG estimada",/G3a/],["VDRL",/titula/],["Escore de Nugent em secreção vaginal",/0.3/]];
  const all=[...dom.window.LURIA_EXAM_CATALOG,...dom.window.LURIA_EXAM_EXTRA_CATALOG].flatMap(g=>g.tests);
  for(const [name,regex] of tests){
    const exam=all.find(t=>t.name===name),node=d.querySelector('[data-row="'+exam.id+'"] .ex-clinical-reference');
    assert.ok(node,name);
    assert.match(node.textContent,regex,name);
  }
  assert.ok(all.filter(t=>t.group>=21).every(t=>t.min===null&&t.max===null));
  dom.window.close();
});

test("Preanalytical fields exist for all 423 exams and distinguish specific from area guidance",()=>{
  const dom=openTool(),d=dom.window.document,meta=dom.window.LURIA_EXAM_DETAILS,audit=dom.window.LURIA_EXAM_PREANALYTIC_AUDIT;
  assert.equal(audit.total,423);
  assert.equal(audit.specific+audit.general,423);
  assert.ok(audit.specific>=240);
  assert.ok(audit.general>0);
  for(const [id,m] of Object.entries(meta)){
    for(const field of ["sample","preparation","analyticalMethod","preanalyticalInterference","preanalyticalSourceUrl"]){
      assert.ok(typeof m[field]==="string"&&m[field].length>20,id+":"+field);
    }
    assert.match(m.preanalyticalSourceUrl,/^https:\/\//);
    assert.ok(Array.isArray(m.preanalyticalSpecificFields));
  }
  assert.equal(d.querySelectorAll(".ex-test-details").length,423);
  assert.equal(d.querySelectorAll(".ex-clinical-source").length,423);
  dom.window.close();
});

test("Specimen and collection guidance distinguish calculated, noninvasive and specialized tests",()=>{
  const dom=openTool(),d=dom.window.document;
  const all=[...dom.window.LURIA_EXAM_CATALOG,...dom.window.LURIA_EXAM_EXTRA_CATALOG].flatMap(g=>g.tests);
  const find=name=>{const t=all.find(t=>t.name===name);assert.ok(t,name);return dom.window.LURIA_EXAM_DETAILS[t.id];};
  assert.match(find("TFG estimada").sample,/calculado/i);
  assert.match(find("FiO₂").sample,/não é exame sanguíneo/i);
  assert.match(find("Cortisol salivar noturno").sample,/saliva/i);
  assert.match(find("Hemocultura").sample,/frascos de hemocultura/i);
  assert.match(find("Prova cruzada pré-transfusional").preparation,/receptor/i);
  assert.match(find("DNA fetal livre circulante (NIPT)").sample,/materno/i);
  assert.match(find("Cloreto no suor").sample,/suor/i);
  assert.match(find("Glicemia em jejum").preparation,/8 a 12 horas/i);
  assert.match(find("Dímero D").preanalyticalInterference,/FEU e DDU/i);
  assert.match(d.querySelector('[data-row="g6t1"] .ex-test-details-content').textContent,/Preparo e coleta|Interferências pré-analíticas/);
  dom.window.close();
});

test("Preanalytical source and overrides loaded on both pages before clinical details",()=>{
  for(const dir of ["exames","laboratorio"]){
    const h=fs.readFileSync(path.join(root,"trabalho",dir,"index.html"),"utf8");
    const pre=h.indexOf("trabalho-exames-preanalytical.js"),detail=h.indexOf("trabalho-exames-details.js"),interpreter=h.indexOf("trabalho-exames-interpreter.js");
    assert.ok(pre>0&&pre<detail&&detail<interpreter);
  }
});
