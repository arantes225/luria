const test = require("node:test");
const assert = require("node:assert/strict");
const data = require("../assets/js/vocacao-data.js");
const engine = require("../assets/js/vocacao-engine.js");

test("catálogo atualizado com 55 especialidades e 64 áreas de atuação", () => {
  assert.equal(data.specialties.length, 55);
  assert.equal(data.areas.length, 64);
  assert.equal(data.specialties.filter((x) => x.prerequisite === "Acesso direto").length, 31);
  assert.ok(data.areas.some((x) => x.name === "Cardiointensivismo"));
  assert.ok(data.areas.some((x) => x.name === "Medicina Marítima e Hiperbárica"));
  assert.equal(new Set(data.specialties.map((x) => x.id)).size, 55);
  assert.equal(new Set(data.areas.map((x) => x.id)).size, 64);
});
test("perguntas sem opções ambíguas ou alternativas faltantes", () => {
  assert.equal(engine.questions.length, 30);
  const ids = new Set();
  for (const question of engine.questions) {
    assert.ok(question.text.length > 20);
    assert.equal(question.options.length, 4);
    assert.ok(!ids.has(question.id));
    ids.add(question.id);
    assert.equal(new Set(question.options.map((x) => x.label)).size, 4);
    for (const option of question.options) {
      assert.ok(option.label.length >= 15);
      assert.ok(option.tags.length >= 2);
      for (const tag of option.tags) assert.ok(engine.labels[tag], "tag desconhecida: " + tag);
    }
  }
});
test("não calcula respostas ausentes, fora de faixa ou incompletas", () => {
  assert.throws(() => engine.calculate([]));
  assert.throws(() => engine.calculate(Array(30).fill(null)));
  assert.throws(() => engine.calculate(Array(30).fill(4)));
});
test("sempre retorna no máximo três caminhos e pontuações finitas", () => {
  for (const answer of [0, 1, 2, 3]) {
    const report = engine.calculate(Array(30).fill(answer));
    assert.ok(report.top.length > 0 && report.top.length <= 3);
    assert.equal(new Set(report.top.map((x) => x.name)).size, report.top.length);
    assert.equal(report.responses, 30);
    for (const score of Object.values(report.scores)) {
      assert.ok(Number.isFinite(score));
      assert.ok(score >= -1 && score <= 1);
    }
  }
});
test("escolhas voltadas à Pediatria valorizam interesse por crianças", () => {
  const answers = engine.questions.map((q) => {
    const index = q.options.findIndex((option) => option.tags.includes("kids"));
    return index >= 0 ? index : 0;
  });
  const report = engine.calculate(answers);
  assert.ok(report.scores.kids > 0);
});
test("áreas de atuação não são apresentadas como especialidades independentes", () => {
  const report = engine.calculate(Array(30).fill(0));
  for (const specialty of report.top) {
    assert.equal(specialty.type, "specialty");
    for (const area of specialty.areas) {
      assert.equal(area.type, "area");
      assert.ok(area.parents.includes(specialty.name));
    }
  }
});
