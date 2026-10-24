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
});
test("Fictional demo uses DOM text rather than injecting model-provided HTML", () => {
  assert.match(page, /work-ecg-validation\.js/);
  assert.match(page, /work-ecg-validation\.css/);
  assert.match(script, /textContent=text/);
  assert.match(script, /decisions\.clear\(\)/);
  assert.doesNotMatch(script, /innerHTML\s*=/);
  assert.doesNotMatch(script, /localStorage|sessionStorage|fetch\(/);
});
