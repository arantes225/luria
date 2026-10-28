#!/usr/bin/env node
"use strict";
/* Export an ECG-only, clean-history snapshot; NEVER changes the existing site. */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const ROOT = path.resolve(__dirname, "..");
const FILES = [
  "assets/js/ecg-contracts.js",
  "assets/js/ecg-cv-engine.js",
  "assets/js/ecg-signal-extractor.js",
  "assets/js/ecg-layout.js",
  "assets/js/ecg-frame-guide.js",
  "assets/js/ecg-smart-camera.js",
  "assets/js/ecg-smart-ui.js",
  "assets/js/ecg-reader.js",
  "assets/js/ecg-camera-map.js",
  "assets/js/ecg-local-camera.js",
  "assets/js/ecg-admin-guard.js",
  "assets/js/luria-rotate-controller.js",
  "assets/js/trabalho-ecg.js",
  "assets/css/ecg-smart-camera.css",
  "trabalho/ecg/index.html",
  "scripts/colab/luria_ecg_digitizer_training.py",
  "supabase/functions/ecg-ai-reader/index.ts",
  "supabase/functions/ecg-r2-catalog/index.ts",
  "docs/ecg-corrective-audit-2026-10-27.md",
  "docs/ecg-digitizer-technical-review.md",
  "docs/physionet-r2-import.md",
  "tests/ecg-camera-guidance.test.cjs",
  "tests/ecg-camera-page.test.cjs",
  "tests/ecg-e2e-integration.test.cjs",
  "tests/ecg-physionet-benchmark.test.cjs",
  "tests/work-ecg-smart-camera.test.cjs",
  "tests/fixtures/physionet-ptbxl/00001_lr.dat",
  "tests/fixtures/physionet-ptbxl/00001_lr.hea",
  "tests/fixtures/physionet-ptbxl/00002_lr.dat",
  "tests/fixtures/physionet-ptbxl/00002_lr.hea",
  "tests/fixtures/physionet-ptbxl/LICENSE.txt"
];
const WORKFLOW = ".github/workflows/import-physionet-r2.yml";
function safe(rel) {
  if (!rel || path.isAbsolute(rel) || rel.includes("\\") ||
      rel.split("/").some(part => !part || part === "." || part === ".." || part === ".git")) {
    throw Error("Unsafe path: " + rel);
  }
  return rel;
}
function exportEcg(dir) {
  if (!dir) throw Error("Usage: node scripts/export-private-ecg.cjs ../luria-ecg-private-export");
  const out = path.resolve(dir);
  if (out === ROOT || out.startsWith(ROOT + path.sep)) throw Error("Output MUST be outside the source repo.");
  if (fs.existsSync(out) && fs.readdirSync(out).length) throw Error("Output directory must be empty.");
  for (const rel of FILES.concat(WORKFLOW)) {
    const source = path.join(ROOT, safe(rel));
    if (!fs.existsSync(source) || !fs.statSync(source).isFile() || fs.lstatSync(source).isSymbolicLink()) {
      throw Error("Missing/unsupported source: " + rel);
    }
  }
  fs.mkdirSync(out, { recursive: true });
  const hashes = {};
  const write = (rel, data) => {
    safe(rel);
    const target = path.join(out, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, data, { flag: "wx" });
    hashes[rel] = crypto.createHash("sha256").update(data).digest("hex");
  };
  FILES.forEach(rel => write(rel, fs.readFileSync(path.join(ROOT, rel))));
  write("integrations/import-physionet-r2.yml.example", fs.readFileSync(path.join(ROOT, WORKFLOW)));
  const pkg = {
    name: "luria-ecg-private", private: true, version: "0.1.0",
    description: "Isolated experimental ECG digitizer snapshot, not clinically validated",
    scripts: { test: "node --test tests/ecg-camera-guidance.test.cjs tests/ecg-camera-page.test.cjs tests/ecg-e2e-integration.test.cjs tests/ecg-physionet-benchmark.test.cjs tests/work-ecg-smart-camera.test.cjs" },
    engines: { node: ">=24.0.0" },
    devDependencies: { jsdom: "29.0.1" }
  };
  write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  write(".gitignore", "node_modules/\n.env\n.env.*\n!.env.example\n*.onnx\n*.pt\n*.pth\n*.ckpt\n__pycache__/\n*.pyc\n");
  write(".env.example", "# Never commit secrets. Configure these only in the protected backend.\nSUPABASE_URL=\nSUPABASE_PUBLISHABLE_KEY=\n");
  const readme = [
    "# LURIA ECG — PRIVATE workspace", "",
    "This is a clean snapshot of ECG files, with NO old Git history.",
    "Create a NEW PRIVATE GitHub repo; do not fork, import or transfer the old repository.", "",
    "The existing LURIA website is unchanged and still runs its existing ECG scripts.",
    "This snapshot is for independent development and benchmarking, NOT a deployed service.", "",
    "## Included",
    "Computer vision, trace reconstruction, contracts, camera/review legacy integration,",
    "Colab prototype, Supabase Edge Function source copies, PhysioNet fixtures, tests and documentation.",
    "The PhysioNet R2 import workflow is retained ONLY as a disabled .example reference.", "",
    "## Tests",
    "Node 24+: npm install && npm test (synthetic tests are not real-photo clinical validation).", "",
    "## Create clean Git history",
    "git init -b main",
    "git add .",
    "git commit -m 'Initial private ECG snapshot'",
    "git remote add origin YOUR_NEW_PRIVATE_REPO_URL",
    "git push -u origin main", "",
    "## Mandatory before main LURIA can be public",
    "Private repository alone does NOT hide JavaScript delivered to browsers.",
    "Move proprietary digitization and model weights to a protected server-side ECG API.",
    "Keep only capture/review UI and an authenticated client in the public website.",
    "Do not remove original scripts or delete the original repo until the API and integration tests pass.",
    "No Supabase, R2, Cloudflare, GitHub Actions or production changes are made by this export."
  ].join("\n") + "\n";
  write("README.md", readme);
  const manifest = {
    source: "arantes225/luria",
    exportedAt: new Date().toISOString(),
    fileCount: FILES.length,
    noPreviousGitHistory: true,
    noEnvironmentFilesCopied: true,
    liveMigrationCompleted: false,
    sha256: hashes
  };
  fs.writeFileSync(path.join(out, "EXPORT_MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n", { flag: "wx" });
  console.log("ECG-only export ready in " + out + ". No history/credentials/deployment copied.");
  return manifest;
}
if (require.main === module) {
  try { exportEcg(process.argv[2]); } catch (e) { console.error(e.message); process.exitCode = 1; }
}
module.exports = { FILES, safe, exportEcg };
