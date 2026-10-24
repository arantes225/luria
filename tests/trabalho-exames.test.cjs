"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/js/trabalho-exames-interpreter.js"), "utf8");
const context = { window: {}, document: { getElementById: () => null } };
vm.runInNewContext(script, context, { timeout: 2500, filename: "trabalho-exames-interpreter.js" });
const catalog = context.window.LURIA_EXAM_CATALOG;
const testsList = Array.from(catalog, g => Array.from(g.tests)).flat();
test("20 painéis e 253 parâmetros distintos", () => {
  assert.equal(catalog.length, 20);
  assert.equal(testsList.length, 253);
  assert.equal(new Set(testsList.map(t => t.id)).size, testsList.length);
});
test("unidades e faixas estruturadas consistentes", () => {
  for (const t of testsList) {
    assert.ok(t.name && t.unit && t.id);
    assert.ok(t.kind === "numeric" || t.kind === "qual");
    if (t.min !== null && t.max !== null) assert.ok(t.min <= t.max, t.name);
    if (t.kind === "qual") assert.equal(t.min, null);
  }
});
test("exames básicos presentes nos 20 grupos", () => {
  for (const name of ["Hemoglobina", "Creatinina", "Sódio", "Potássio", "pH", "AST / TGO",
    "Hemoglobina glicada (HbA1c)", "Troponina ultrassensível", "INR",
    "TSH", "FSH", "Nitrito urinário", "Calprotectina fecal", "Anti-DNA dupla hélice",
    "HIV Ag/Ac", "Líquor proteínas", "Paracetamol sérico", "CA-125"]) {
    assert.ok(testsList.some(t => t.name === name), name);
  }
});
test("Exames e Laboratório compartilham a mesma ferramenta", () => {
  for (const folder of ["exames", "laboratorio"]) {
    const html = fs.readFileSync(path.join(root, "trabalho", folder, "index.html"), "utf8");
    assert.match(html, /id="exam-tool"/);
    assert.match(html, /trabalho-exames-interpreter.js/);
    assert.match(html, /trabalho-exames-interpreter.css/);
  }
});
