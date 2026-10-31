const {test}=require("node:test");
const assert=require("node:assert/strict");
const {source}=require("./fixtures/app-client.cjs");
test("pareamento antigo de 2 dígitos foi substituído por senha fixa de quatro dígitos",()=>{
  const page=source("trabalho/prontuario/index.html");
  const service=source("supabase/functions/external-quick-chart-pair/index.ts");
  assert.match(page,/maxlength="4" name="traube-access-code"/);
  assert.match(page,/id="external-send-panel"/);
  assert.match(page,/id="external-receive-panel"/);
  assert.match(service,/validPIN/);
  assert.match(service,/authorization_version/);
  assert.doesNotMatch(service,/action==="issue"/);
  assert.match(service,/action==="revoke_all"/);
  assert.match(service,/action==="decide"/);
});
