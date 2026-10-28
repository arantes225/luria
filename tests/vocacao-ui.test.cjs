const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { JSDOM } = require("jsdom");

test("fluxo vocacional permite responder e exibe exatamente três caminhos", () => {
  const html = fs.readFileSync("vocacao/index.html", "utf8");
  const dom = new JSDOM(html, { url: "https://luria.test/vocacao/", runScripts: "outside-only" });
  const { window } = dom;
  window.HTMLElement.prototype.scrollIntoView = function () {};
  for (const file of ["assets/js/vocacao-data.js", "assets/js/vocacao-engine.js", "assets/js/vocacao.js"]) {
    window.eval(fs.readFileSync(file, "utf8"));
  }
  const $ = (id) => window.document.getElementById(id);
  assert.equal($("voc-intro").hidden, false);
  $("voc-start").click();
  assert.equal($("voc-quiz").hidden, false);
  for (let i = 0; i < 30; i += 1) {
    const options = $("voc-options").querySelectorAll("button");
    assert.equal(options.length, 4);
    assert.equal($("voc-next").disabled, true, "próxima exige resposta");
    options[i % 4].click();
    assert.equal($("voc-next").disabled, false);
    $("voc-next").click();
  }
  assert.equal($("voc-results").hidden, false);
  assert.equal(window.document.querySelectorAll(".voc-match").length, 3);
  assert.ok($("voc-results").textContent.includes("Pontos de atenção"));
  assert.ok($("voc-results").textContent.includes("Como validar o seu perfil"));
  $("voc-restart").click();
  assert.equal($("voc-quiz").hidden, false);
  assert.equal($("voc-next").disabled, true);
  dom.window.close();
});

test("catálogo pesquisável não interfere no limite de recomendações", () => {
  const html = fs.readFileSync("vocacao/index.html", "utf8");
  const dom = new JSDOM(html, { url: "https://luria.test/vocacao/", runScripts: "outside-only" });
  const { window } = dom;
  window.HTMLElement.prototype.scrollIntoView = () => {};
  for (const file of ["assets/js/vocacao-data.js", "assets/js/vocacao-engine.js", "assets/js/vocacao.js"]) {
    window.eval(fs.readFileSync(file, "utf8"));
  }
  window.document.getElementById("voc-search").dispatchEvent(new window.Event("input", { bubbles: true }));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length, 119);
  const input = window.document.getElementById("voc-search");
  input.value = "cardiointensivismo";
  input.dispatchEvent(new window.Event("input", { bubbles: true }));
  assert.equal(window.document.querySelectorAll(".voc-catalog-item").length, 1);
  assert.ok(window.document.querySelector(".voc-catalog-item").textContent.includes("Cardiointensivismo"));
  dom.window.close();
});
