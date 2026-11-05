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
  const page = read("aprender/anatomia/coracao/index.html");
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

test("Sala de Anatomia é o atlas aberto no layout do site, com créditos discretos", () => {
  const page = read("aprender/anatomia/index.html");
  assert.match(page, /traube-page-spotlight/);
  assert.ok(page.includes('src="/aprender/anatomia/atlas/?embed=1"'), "atlas embutido na Sala");
  assert.match(page, /frame-src 'self'/);
  for (const tab of ["atlas", "micro", "quiz"]) assert.match(page, new RegExp('data-room-tab="' + tab + '"'));
  assert.ok(page.includes('href="/aprender/anatomia/coracao/"'), "link para o coração em detalhe");
  const credits = page.slice(page.indexOf('id="creditos"'));
  assert.doesNotMatch(page.replace(credits, ""), /Human Atlas|BodyVista|ashemag|OrganUI/, "marcas de terceiros só no card de créditos");
  assert.match(credits, /BodyParts3D/);
  assert.ok(read("assets/js/app.js").includes('anatomia: { title: "Sala de Anatomia"'), "PAGE_INFO da Sala");
  assert.equal(fs.existsSync(path.join(root, "aprender/anatomia/corpo")), false, "corpo dissecável removido");
});

test("atlas usa sobreposição em português sem marca de terceiros", () => {
  const overlay = "tools/anatomy-atlas/overlay/";
  const page = read(overlay + "app/page.tsx");
  assert.match(read(overlay + "web/index.html"), /lang="pt-BR"/);
  assert.doesNotMatch(read(overlay + "web/index.html"), /Human Atlas/);
  assert.match(page, /removeSelected/);
  assert.match(page, /cutAxis/);
  assert.match(page, /THEME_VARS/);
  assert.match(read(overlay + "app/scene.tsx"), /controls\.zoomToCursor=true/);
  const glossary = read("tools/anatomy-atlas/glossario-pt.tsv").trim().split(/\r?\n/);
  assert.ok(glossary.length >= 2600, "glossário cobre os termos do atlas");
  assert.ok(glossary.every(line => line.split("\t").length === 2), "glossário em duas colunas");
  assert.ok(read("scripts/build-human-atlas.cjs").includes("quebras de linha normalizadas"), "hash independe de CRLF/LF");
});

test("laboratório (microscopia e desafio) está traduzido e com licenças", () => {
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

test("atlas ampliado: fontes fixadas, corpo feminino, interior dos órgãos e carregamento resiliente", () => {
  const workflow = read(".github/workflows/deploy-pages.yml");
  assert.ok(workflow.includes("Z-Anatomy/raw/6c7f9016bd5899ac8edafd31b9900c151df42ed6"), "Z-Anatomy fixado por commit");
  assert.ok(workflow.includes("united-male/v1.10"), "HRA masculino fixado por versão");
  assert.ok(workflow.includes("sha256sum --check"), "fontes conferidas por sha256");
  assert.ok(workflow.includes("slorksmo/Human-Atlas.git 5bb5713aab18d7fe9380c3339eb09f173491ea06"), "atlas feminino fixado");
  assert.ok(workflow.includes("node tools/anatomy-atlas/validate-atlas.mjs"), "validador próprio no deploy");
  const extras = read("tools/anatomy-atlas/build-atlas-extras.mjs");
  assert.ok(extras.includes("^kidney") && extras.includes("pineal"), "peças NC ou sem licença declarada ficam de fora");
  const validator = read("tools/anatomy-atlas/validate-atlas.mjs");
  for (const s of ["rectus abdominis", "transversus abdominis", "lobe of right lung", "Thyroid gland", "renal pyramid", "Body of uterus"]) assert.ok(validator.includes(s), "cobertura obrigatória: " + s);
  const credits = read("tools/anatomy-atlas/CREDITOS-MODELOS.txt");
  assert.match(credits, /CC BY-SA 4\.0/);
  assert.match(credits, /HuBMAP/);
  const page = read("tools/anatomy-atlas/overlay/app/page.tsx");
  assert.ok(page.includes("atlas-female.json"), "seletor do corpo feminino");
  assert.ok(page.includes("seeInside") && page.includes("toggleFlow") && page.includes("cutCenter"), "ver por dentro, cortes centrados e fluxo sanguíneo");
  const femaleExtras = read("tools/anatomy-atlas/build-female-extras.mjs");
  assert.ok(femaleExtras.includes("borrowed-muscle") && femaleExtras.includes("ABDOMINAL_WALL"), "músculos complementares no corpo feminino");
  assert.ok(femaleExtras.includes("Coronary arteries"), "coronárias no coração feminino");
  assert.ok(read("tools/anatomy-atlas/build-atlas-extras.mjs").includes("Left circumflex artery"), "grupos coronários no masculino");
  assert.ok(read("scripts/build-human-atlas.cjs").includes("build-female-extras.mjs"), "acréscimos femininos no build");
  const scene = read("tools/anatomy-atlas/overlay/app/scene.tsx");
  assert.ok(scene.includes("fetchChunk") && scene.includes("20000"), "download com timeout por inatividade e novas tentativas");
  assert.ok(scene.includes("dMucosa") && scene.includes("flowLayers"), "mucosa interna e partículas de fluxo");
  const sala = read("aprender/anatomia/index.html");
  const card = sala.slice(sala.indexOf('id="creditos"'));
  assert.match(card, /Z-Anatomy/);
  assert.match(card, /Human Reference Atlas/);
});
