"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-interpreter.js"), "utf8");

function openTool() {
  const dom = new JSDOM('<!doctype html><html><body data-page="trabalho_exames"><div id="exam-tool"></div></body></html>', {
    url: "https://www.resibulando.online/trabalho/exames/",
    runScripts: "outside-only"
  });
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
  assert.equal(doc.querySelectorAll(".ex-test.ex-reference-only").length, 253);
  assert.equal(doc.querySelectorAll(".ex-test.ex-card").length, 253);
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
    assert.match(html, /trabalho-exames-interpreter\.css\?v=20261024-b/);
    assert.match(html, /trabalho-exames-interpreter\.js\?v=20261024-b/);
  }
});

test("Exames are sorted A–Z and area selector is alphabetical and works with search", () => {
  const dom = openTool(); const doc = dom.window.document;
  const names = [...doc.querySelectorAll(".ex-test.ex-card h4")].map(el => el.textContent);
  const collator = new Intl.Collator("pt-BR", { sensitivity:"base", numeric:true });
  assert.deepEqual(names, [...names].sort(collator.compare));
  const select = doc.querySelector("#ex-area");
  assert.equal(select.options.length, 21);
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
