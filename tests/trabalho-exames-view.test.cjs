"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-interpreter.js"), "utf8");
const extraScript = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-extra-catalog.js"), "utf8");

function openTool() {
  const dom = new JSDOM('<!doctype html><html><body data-page="trabalho_exames"><div id="exam-tool"></div></body></html>', {
    url: "https://www.resibulando.online/trabalho/exames/",
    runScripts: "outside-only"
  });
  dom.window.eval(extraScript);
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
    assert.match(html, /trabalho-exames-interpreter\.css\?v=20261029-extras/);
    assert.match(html, /trabalho-exames-extra-catalog\.js\?v=20261029-extras/);
    assert.match(html, /trabalho-exames-interpreter\.js\?v=20261029-extras/);
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
