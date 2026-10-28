"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { FILES, safe, exportEcg } = require("../scripts/export-private-ecg.cjs");

test("ECG export list contains core, training, tests, no application-wide files", () => {
  assert.ok(FILES.includes("assets/js/ecg-cv-engine.js"));
  assert.ok(FILES.includes("assets/js/ecg-signal-extractor.js"));
  assert.ok(FILES.includes("scripts/colab/luria_ecg_digitizer_training.py"));
  assert.ok(FILES.some(p => p.endsWith("LICENSE.txt")));
  assert.ok(!FILES.some(p => /(^|\/)\.git(\/|$)|node_modules|service_role|\.env$|assets\/js\/app\.js/.test(p)));
  assert.throws(() => safe("../secret.txt"), /Unsafe/);
  assert.throws(() => safe(".git/config"), /Unsafe/);
});

test("export copies only the ECG snapshot with SHA-256 and no Git history", () => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), "luria-ecg-export-test-"));
  const output = path.join(parent, "ecg");
  try {
    const manifest = exportEcg(output);
    assert.equal(manifest.fileCount, FILES.length);
    assert.equal(manifest.noPreviousGitHistory, true);
    assert.equal(manifest.liveMigrationCompleted, false);
    for (const rel of FILES) {
      const copy = path.join(output, rel);
      assert.ok(fs.existsSync(copy), rel);
      const sha = crypto.createHash("sha256").update(fs.readFileSync(copy)).digest("hex");
      assert.equal(manifest.sha256[rel], sha);
    }
    assert.ok(fs.existsSync(path.join(output, "integrations/import-physionet-r2.yml.example")));
    assert.ok(!fs.existsSync(path.join(output, ".git")));
    assert.ok(!fs.existsSync(path.join(output, "assets/js/app.js")));
    assert.ok(!fs.existsSync(path.join(output, ".github/workflows/import-physionet-r2.yml")));
    assert.ok(!fs.existsSync(path.join(output, "supabase/.env")));
    assert.ok(fs.existsSync(path.join(output, "EXPORT_MANIFEST.json")));
    assert.throws(() => exportEcg(output), /must be empty/);
  } finally {
    fs.rmSync(parent, { recursive: true, force: true });
  }
});
