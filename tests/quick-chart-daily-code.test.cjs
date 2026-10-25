const {test}=require("node:test");
const assert=require("node:assert/strict");
const {source}=require("./fixtures/app-client.cjs");

test("endpoint antigo da Cola Rápida não permite mais pular a aprovação do celular",()=>{
  const edge=source("supabase/functions/external-quick-chart/index.ts");
  const view=source("trabalho/prontuario-rapido/index.html");
  assert.match(edge,/status:410/);
  assert.doesNotMatch(edge,/action === "load"/);
  assert.doesNotMatch(view,/quick-chart-daily-code\.js/);
  assert.match(view,/quick-chart-fixed-access\.js/);
});
