const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const postcss = require("postcss");

const css = fs.readFileSync("assets/css/vocacao.css", "utf8");
const tokens = fs.readFileSync("assets/css/ui-app.css", "utf8");
const html = fs.readFileSync("vocacao/index.html", "utf8");
const sw = fs.readFileSync("service-worker.js", "utf8");

test("vocação herda os tokens do corpo para azul, rosa, claro e escuro", () => {
  assert.match(tokens, /body\[data-ui="v2"\]\[data-ui-identity="pink"\]/);
  assert.match(tokens, /body\[data-ui="v2"\]\[data-ui-appearance="dark"\]/);
  assert.match(tokens, /body\[data-ui="v2"\]\[data-ui-appearance="dark"\]\[data-ui-identity="pink"\]/);
  for (const token of ["--color-primary", "--color-primary-text", "--color-primary-subtle",
      "--color-surface", "--color-surface-solid", "--color-surface-elevated",
      "--color-text-primary", "--color-text-secondary", "--color-border", "--color-focus-ring"]) {
    assert.ok(css.includes(token), "faltou usar " + token);
  }
  assert.ok(css.includes('body[data-page="vocacao"][data-ui-appearance="dark"]'));
  assert.ok(css.includes('body[data-page="vocacao"][data-ui-appearance="dark"][data-ui-identity="pink"]'));
  assert.doesNotMatch(css, /:root\[data-theme=/, "tema legado não deve controlar esta página");
});

test("nenhuma cor temática fixa nos cartões, botões, perguntas ou relatório", () => {
  const root = postcss.parse(css, { from: "assets/css/vocacao.css" });
  const rawHexColors = new Set();
  root.walkDecls((decl) => {
    for (const hex of decl.value.match(/#[\da-f]{3,8}\b/gi) || []) rawHexColors.add(hex.toLowerCase());
  });
  assert.deepEqual([...rawHexColors].sort(), ["#101b2e", "#241026", "#ffffff"].sort());
  for (const selector of [
    ".voc-hero", ".voc-meta span", ".voc-panel", ".voc-method-note",
    ".voc-option", '.voc-option[aria-pressed="true"]', ".voc-count",
    ".voc-progress span", ".voc-button-primary", ".voc-button-secondary",
    ".voc-catalogue", ".voc-catalog-item", ".voc-report-section",
    ".voc-report-tags span", ".voc-match", ".voc-sources details"
  ]) {
    let found = false;
    root.walkRules((rule) => {
      if (!rule.selector.includes(selector)) return;
      const properties = [];
      rule.walkDecls((decl) => properties.push(decl.value));
      if (properties.some((v) => /var\(--voc-/.test(v))) found = true;
    });
    assert.ok(found, "componente ainda sem cores de tema: " + selector);
  }
});

test("CSS novo possui versão no HTML e no cache offline", () => {
  const cssAsset = "/assets/css/vocacao.css?v=20261028-vocational-v4";
  assert.ok(html.includes(cssAsset));
  assert.equal(sw.split(cssAsset).length - 1, 2, "pré-cache e app shell");
  assert.ok(sw.includes('luria-pwa-20261029-ecg-photo-fidelity-v10'), "SW e registro do PWA mantêm a mesma versão");
});
