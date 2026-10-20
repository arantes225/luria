const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const questionPages = [
  "questoes-simulados.html",
  "questoes-simulados/index.html",
];

test("PDF question import exposes an unchecked image opt-in on both routes", () => {
  for (const relativePath of questionPages) {
    const html = fs.readFileSync(path.join(root, relativePath), "utf8");
    assert.match(html, /id="qs-import-images"[^>]*type="checkbox"/);
    assert.doesNotMatch(html, /id="qs-import-images"[^>]*checked/);
    assert.match(html, /Importar imagens/);
    assert.match(html, /questoes-simulados\.js\?v=20261020-pdf-images-toggle-v1/);
  }
});

test("unchecked PDF image option skips extraction while preserving personal-list isolation", () => {
  const source = fs.readFileSync(
    path.join(root, "assets/js/questoes-simulados.js"),
    "utf8"
  );

  assert.match(source, /importImages:\s*document\.getElementById\("qs-import-images"\)\?\.checked === true/);
  assert.match(source, /const importImages\s*=\s*options\.importImages === true/);
  assert.match(source, /if \(importImages\) \{/);
  assert.match(source, /question_bank_id:\s*null/);
  assert.match(source, /from\(\s*"question_items"\s*\)/);
  assert.doesNotMatch(
    source,
    /const pageImages\s*=\s*extractionMode[\s\S]{0,300}extractedImageEntries\.push/
  );
});
