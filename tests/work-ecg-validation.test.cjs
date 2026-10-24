const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const workerSource = fs.readFileSync("cloudflare/work-ecg/index.mjs","utf8");
const page = fs.readFileSync("trabalho/ecg/index.html","utf8");
const script = fs.readFileSync("assets/js/work-ecg-validation.js","utf8");
const wrangler = fs.readFileSync("cloudflare/work-ecg/wrangler.toml","utf8");

test("ECG validation defaults off without patient image upload", () => {
  assert.match(wrangler, /ECG_VALIDATION_ENABLED = "false"/);
  assert.match(wrangler, /ECG_ENABLE_ESCALATION = "false"/);
  assert.match(wrangler, /workers_dev = false/);
  assert.doesNotMatch(page, /<input[^>]+type="file"/);
  assert.match(page, /Enviar ECG real — indisponível/);
  assert.match(page, /exclusivamente fictício/);
});
test("ECG Worker fails closed and accesses only benchmark bucket keys", () => {
  assert.match(workerSource, /ECG_VALIDATION_ENABLED!=="true"/);
  assert.match(workerSource, /adminAuthenticated/);
  assert.match(workerSource, /is_admin_session/);
  assert.match(workerSource, /caseIds\.has\(id\)/);
  assert.match(workerSource, /reserveBenchmarkBudget/);
  assert.match(workerSource, /transactionSync/);
  assert.match(workerSource, /pngSignature/);
  assert.match(workerSource, /"ecg-benchmarks\/"\+id\+"\.png"/);
  assert.doesNotMatch(workerSource, /request\.formData\(\)/);
  assert.doesNotMatch(workerSource, /env\.ECG_BENCHMARK_R2\.put/);
});
test("Both low-cost providers use non-retaining and independent image analysis", () => {
  assert.match(workerSource, /"gpt-6-luna"/);
  assert.match(workerSource, /"claude-haiku-5-5"/);
  assert.match(workerSource, /store:false/);
  assert.match(workerSource, /Promise\.allSettled/);
  assert.match(workerSource, /comparison:compare/);
  assert.match(workerSource, /"ST_ELEVATION"/);
  assert.match(workerSource, /"ST_DEPRESSION"/);
});
test("Fictional demo uses DOM text rather than injecting model-provided HTML", () => {
  assert.match(page, /work-ecg-validation\.js/);
  assert.match(page, /work-ecg-validation\.css/);
  assert.match(script, /textContent=text/);
  assert.match(script, /decisions\.clear\(\)/);
  assert.doesNotMatch(script, /innerHTML\s*=/);
  assert.doesNotMatch(script, /localStorage|sessionStorage|fetch\(/);
});


test("ECG finding reconciliation is lead-and-feature specific, not superficial agreement",async()=>{
 const {reconcileEcgBenchmark,normalizeEcgBenchmarkReading}=await import("../cloudflare/work-ecg/index.mjs");
 const mk=(lead,feature)=>normalizeEcgBenchmarkReading(JSON.stringify({
  quality:"adequate",observations:[{lead,feature,finding:"Possivel alteracao",evidence:"Conferir ECG original",certainty:"moderate"}],
  differential:[],limitations:[],urgent_patterns:[]}));
 const agreed=reconcileEcgBenchmark({analysis:mk("II","ST_ELEVATION")},{analysis:mk("II","ST_ELEVATION")});
 assert.deepEqual(agreed.sharedReportedFeatures,["II|ST_ELEVATION"]);
 assert.deepEqual(agreed.onlyFirstModel,[]);
 assert.equal(agreed.physicianReviewRequired,true);
 assert.equal(agreed.modelAgreementDoesNotExcludeDisease,true);
 const conflict=reconcileEcgBenchmark({analysis:mk("II","ST_ELEVATION")},{analysis:mk("II","ST_DEPRESSION")});
 assert.deepEqual(conflict.sharedReportedFeatures,[]);
 assert.deepEqual(conflict.onlyFirstModel,["II|ST_ELEVATION"]);
 assert.deepEqual(conflict.onlySecondModel,["II|ST_DEPRESSION"]);
});
test("Unclassified ECG features require review and never become measured claims",async()=>{
 const {normalizeEcgBenchmarkReading,reconcileEcgBenchmark}=await import("../cloudflare/work-ecg/index.mjs");
 const sample=normalizeEcgBenchmarkReading(JSON.stringify({quality:"adequate",observations:[
  {lead:"II",feature:"DIAGNOSIS_CERTAIN",finding:"Possivel alteracao",evidence:"",certainty:"certain"}
 ],differential:[],limitations:[],urgent_patterns:[]}));
 assert.equal(sample.observations[0].feature,"OTHER");
 assert.equal(sample.observations[0].certainty,"low");
 const compared=reconcileEcgBenchmark({analysis:sample},{analysis:sample});
 assert.equal(compared.unclassifiedFindings,true);
});
test("Cloudflare durable budget rejects over-limit and concurrent-session repeats",async()=>{
 const {EcgBenchmarkQuota}=await import("../cloudflare/work-ecg/index.mjs");
 const values=new Map();
 const state={storage:{kv:{
   get:k=>values.get(k),put:(k,v)=>values.set(k,v)
 },transactionSync:callback=>callback()}};
 const durable=new EcgBenchmarkQuota(state);
 const reserve=async(amount,limit,max)=>durable.fetch(new Request("https://ecg-budget.invalid/reserve",{
   method:"POST",headers:{"content-type":"application/json"},
   body:JSON.stringify({reserveUsd:amount,usdLimit:limit,maxRequests:max})
 }));
 assert.equal((await reserve(.03,.06,2)).status,204);
 assert.equal((await reserve(.03,.06,2)).status,204);
 assert.equal((await reserve(.03,.06,2)).status,429);
 assert.equal(values.get("requests"),2);
 assert.equal(values.get("reserved_usd"),.06);
});
test("Worker is disabled before performing any externally billable request",async()=>{
 const {default:worker}=await import("../cloudflare/work-ecg/index.mjs");
 const request=new Request("https://ecg-validation.invalid/",{method:"POST",headers:{origin:"https://resibulando.online"}});
 const response=await worker.fetch(request,{ECG_ALLOWED_ORIGINS:"https://resibulando.online",ECG_VALIDATION_ENABLED:"false"});
 assert.equal(response.status,503);
 assert.equal((await response.json()).error,"validation_disabled");
});
