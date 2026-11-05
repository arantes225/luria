const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const { isPublicFile } = require("../scripts/public-files.cjs");

test("Sala de Anatomia está ligada ao hub Aprender e à navegação móvel", () => {
  assert.match(read("aprender/index.html"), /href="\/aprender\/anatomia\/"/);
  assert.match(read("assets/js/ui-navigation-v2.js"), /Sala de Anatomia/);
  assert.match(read("service-worker.js"), /\/aprender\/anatomia\//);
});

test("modelo segmentado possui seleção real, interior e fluxo didático", () => {
  const page = read("aprender/anatomia/index.html");
  const viewer = read("assets/js/anatomy-heart-entry.mjs");
  const build = read("scripts/build-anatomy-viewer.cjs");
  assert.match(page, /data-anatomy-interior/);
  assert.match(page, /data-anatomy-flow/);
  assert.match(page, /BodyParts3D/);
  assert.match(page, /cavidades representam espaços internos/);
  assert.match(viewer, /raycaster\.intersectObject\(organ, true\)/);
  assert.match(viewer, /object\.userData\.structureId/);
  assert.match(viewer, /ventricular-wall/);
  assert.match(build, /b80a727d022a4ab07ccfcf15caccc228eaccb6d69ec0e72923324946ac35a946/);
  assert.match(build, /Estruturas do atlas ausentes/);
  assert.equal(isPublicFile("assets/models/anatomia/coracao.glb"), true);
});

test("publicação substitui o GLB do repositório pelo atlas verificado", () => {
  const workflow = read(".github/workflows/deploy-pages.yml");
  assert.match(workflow, /organui\/heart-3d\/c72ce6654ff8e282942f97750d3104f55ef4fc3d/);
  assert.match(workflow, /ANATOMY_MODEL_PATH=build\/pages\/assets\/models\/anatomia\/coracao\.glb node scripts\/build-anatomy-viewer\.cjs/);
  assert.match(read("assets/js/anatomy-loading-guard.js"), /anatomy-static-fallback/);
});
