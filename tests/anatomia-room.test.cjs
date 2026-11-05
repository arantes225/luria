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

test("Sala reestilizada liga os quatro módulos e guarda créditos num card discreto", () => {
  const page = read("aprender/anatomia/index.html");
  for (const href of ["/aprender/anatomia/atlas/", "/aprender/anatomia/corpo/", "/aprender/anatomia/laboratorio/", "#coracao"]) {
    assert.match(page, new RegExp('href="' + href.replace(/[.*+?^${}()|[\]\/]/g, "\$&") + '"'));
  }
  const credits = page.slice(page.indexOf('id="creditos"'));
  const body = page.replace(credits, "");
  assert.doesNotMatch(body, /Human Atlas|BodyVista|ashemag|OrganUI/, "marcas de terceiros só no card de créditos");
  assert.match(credits, /BodyParts3D/);
  assert.match(read("assets/js/app.js"), /anatomia: \{ title: "Sala de Anatomia"/);
});

test("atlas usa sobreposição em português sem marca de terceiros", () => {
  const overlay = "tools/anatomy-atlas/overlay/";
  const page = read(overlay + "app/page.tsx");
  assert.match(read(overlay + "web/index.html"), /lang="pt-BR"/);
  assert.doesNotMatch(read(overlay + "web/index.html"), /Human Atlas/);
  assert.match(page, /Atlas do corpo/);
  assert.match(page, /Créditos/);
  assert.match(read(overlay + "app/scene.tsx"), /controls\.zoomToCursor=true/);
  const glossary = read("tools/anatomy-atlas/glossario-pt.tsv").trim().split(/\r?\n/);
  assert.ok(glossary.length >= 2600, "glossário cobre os termos do atlas");
  assert.ok(glossary.every(line => line.split("\t").length === 2), "glossário em duas colunas");
  assert.ok(read("scripts/build-human-atlas.cjs").includes("quebras de linha normalizadas"), "hash independe de CRLF/LF");
});

test("corpo dissecável e laboratório estão traduzidos e com licenças", () => {
  const corpus = read("aprender/anatomia/corpo/corpus-pt.js");
  assert.ok((corpus.match(/^ "[^"]+":\[/gm) || []).length >= 107, "107 estruturas traduzidas");
  assert.match(read("aprender/anatomia/corpo/corpus.js"), /zoom em direção ao/);
  assert.match(read("aprender/anatomia/corpo/LICENSE-corpus.txt"), /MIT License/);
  const scenes = read("aprender/anatomia/laboratorio/micro-scenes.mjs");
  assert.doesNotMatch(scenes, /[\u4e00-\u9fff]/, "sem rótulos em chinês");
  const bank = JSON.parse(read("aprender/anatomia/laboratorio/questoes-pt.json")).questoes;
  assert.ok(bank.length >= 200);
  for (const q of bank) {
    if (q.type === "mcq") assert.ok(q.a >= 0 && q.a < q.o.length, q.id);
    else if (q.type === "tf") assert.ok(q.a === 0 || q.a === 1, q.id);
    else assert.ok(Array.isArray(q.pairs) && q.pairs.length >= 2, q.id);
  }
  assert.equal(new Set(bank.map(q => q.id)).size, bank.length, "ids únicos");
  assert.match(read("aprender/anatomia/laboratorio/LICENSE-questoes-apache.txt"), /Apache License/);
});
