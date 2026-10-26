const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

test("Estudar agora oferece cronograma e assunto livre", () => {
  const source = read("assets/js/luria-command-center.js");
  assert.match(source, /Seguir o cronograma/);
  assert.match(source, /Estudar outro assunto/);
  assert.match(source, /build_topic_study_session_v1/);
  assert.match(source, /study_ids=/);
});

test("motor sorteia apenas conteúdo real e cria recursos do usuário", () => {
  const sql = read("supabase/migrations/20261026133000_topic_study_engine_and_alex_planner.sql");
  assert.match(sql, /order by random\(\)/i);
  assert.match(sql, /insert into public\.question_sets \(user_id/i);
  assert.match(sql, /v_user uuid := auth\.uid\(\)/i);
  assert.match(sql, /grant execute on function public\.build_topic_study_session_v1[\s\S]+to authenticated/i);
  assert.doesNotMatch(sql, /grant execute[\s\S]+to anon/i);
});

test("Alex separa proposta, prévia e confirmação", () => {
  const edge = read("supabase/functions/professor-alex-gemini/index.ts");
  const front = read("assets/js/professor-alex-gemini.mjs");
  assert.match(edge, /apply_study_action/);
  assert.match(edge, /p_apply: false/);
  assert.match(edge, /p_apply: true/);
  assert.match(front, /Confirmar e aplicar/);
  assert.match(front, /action_plan/);
});

test("flashcards focados são carregados pelos ids sorteados", () => {
  const source = read("assets/js/flashcards.js");
  assert.match(source, /flashStudyIds/);
  assert.match(source, /\.in\("id", flashStudyIds\)/);
  assert.match(source, /reviewMode = "extra"/);
});
