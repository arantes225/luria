const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = fs.readFileSync(
  path.join(__dirname, "../assets/js/cronograma.js"),
  "utf8"
);
const settings = fs.readFileSync(
  path.join(__dirname, "../configuracoes/cronograma/index.html"),
  "utf8"
);

test("exposes the confirmation preview in Configurações", () => {
  assert.match(source, /preview\.classList\.add\(\s*"visible",\s*"active"\s*\)/);
  assert.match(settings, /\.import-preview:is\(\.active,\.visible\)\{display:block\}/);
});

test("calendar actions use the revision-aware completion RPC", () => {
  assert.match(source, /function renderCalendarActivityMenu\(/);
  assert.match(source, /Concluir e agendar revisões/);
  assert.match(source, /mark_topic_already_done/);
  assert.match(source, /p_studied_on:completionDate/);
  assert.doesNotMatch(source, /mode==="complete"&&source==="topic"/);
});

test("bulk completion supports today and the original study date", () => {
  assert.match(source, /mode==="complete-today"\|\|mode==="complete-origin"/);
  assert.match(source, /topic\.studied_on\|\|topic\.original_date\|\|topic\.scheduled_date/);
  assert.match(source, /agendaScope===\"all\"/);
});

test("lesson rows expose their date and block when one is available", () => {
  assert.match(source, /const blockLabel =/);
  assert.match(source, /theme-library-meta-date/);
  assert.match(source, /theme-library-meta-block/);
  assert.match(source, /<span>Bloco<\/span>/);
  assert.match(source, /<span>Data<\/span>/);
});

test("bulk selection only appears after the user enters selection mode", () => {
  assert.match(source, /themeSelectionMode/);
  assert.match(source, /theme-selection-toggle/);
  assert.match(source, /theme-library-row \$\{scheduleState\.themeSelectionMode/);
  assert.match(source, /selectedThemeIds\.clear\(\)/);
});

