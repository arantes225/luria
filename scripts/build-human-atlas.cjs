"use strict";
// Monta o Atlas do corpo (/aprender/anatomia/atlas/) a partir do projeto MIT
// fixado no deploy, aplicando a sobreposição TRAUBE de tools/anatomy-atlas:
// interface em português, nomes PT de 5.090 estruturas, cores e microtextura
// por tecido e tema visual do site. A licença MIT de origem vai junto no build
// (LICENSE-human-atlas.txt) e os créditos dos dados ficam no botão "Fontes".
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const prepareAtlasLoading = require("./prepare-atlas-loading.cjs");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
// Pasta do projeto do atlas, sempre explícita (o workflow informa o caminho).
if (!process.argv[3]) throw new Error("Informe a pasta do projeto do atlas: node scripts/build-human-atlas.cjs <prepare|install> <pasta>");
const source = path.resolve(process.argv[3]);
const output = path.resolve(root, "build/pages/aprender/anatomia/atlas");
const overlay = path.join(root, "tools/anatomy-atlas/overlay");
const base = "/aprender/anatomia/atlas/";
const mode = process.argv[2];

// Arquivos de origem substituídos pela sobreposição. Se o projeto fixado mudar,
// o hash muda e o build para, em vez de sobrescrever algo que não revisamos.
const REPLACED = {
  "app/page.tsx": "f62ddd7960bdbe99ef3da18e5f220ff8e2e1879a592fa74d6b97d7216d76e6d9",
  "app/anatomy.ts": "092ebc28e6ea1e70a3c78bc6bb6f0651c6714f83960aa3be2ee57434f4b610f4",
  "app/scene.tsx": "a90debd67d622543a7ede1fd07bc4cddd380a4977c7afcd21be08e70910cd2d8",
  "app/globals.css": "efc2909fe2630a7abb6c3533e817185a8c60d495ff2e9e9d5ef577e0afa254c5",
  "web/index.html": "0ac70a2c5f793183abec28f706a0dd1da6a90e68afb3bd840f341c04b8dfe8ea",
};
// Hash do texto com quebras de linha normalizadas (LF), igual em Windows e Linux.
const sha = file => crypto.createHash("sha256").update(fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")).digest("hex");

if (mode === "prepare") {
  for (const [rel, expected] of Object.entries(REPLACED)) {
    const actual = sha(path.join(source, rel));
    if (actual !== expected) throw new Error(`Arquivo de origem mudou (${rel}); revise a sobreposição antes de atualizar o hash`);
  }
  for (const rel of ["app/page.tsx", "app/anatomy.ts", "app/scene.tsx", "app/study.ts", "web/index.html"]) {
    fs.copyFileSync(path.join(overlay, rel), path.join(source, rel));
  }
  fs.appendFileSync(path.join(source, "app/globals.css"), fs.readFileSync(path.join(overlay, "traube-theme.css")));

  const models = path.join(source, "public/models");
  const manifestPath = path.join(models, "atlas.json");
  const first = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(first.chunks) || first.chunks.length < 10 || !Array.isArray(first.parts) || first.parts.length < 2000) {
    throw new Error("Cobertura do catálogo do atlas mudou");
  }

  // Acréscimos do corpo masculino (Z-Anatomy + HRA), gerados aqui a partir das
  // fontes fixadas e conferidas por sha256 no workflow. Sem eles o build para:
  // o atlas publicado precisa ter pulmões, tireoide, parede abdominal etc.
  const extras = process.env.TRAUBE_ATLAS_SOURCES;
  if (!extras) throw new Error("Defina TRAUBE_ATLAS_SOURCES (pasta com za-muscles.fbx, za-visceral.fbx e hra-male.glb)");
  execFileSync(process.execPath, [
    "--max-old-space-size=8000",
    path.join(root, "tools/anatomy-atlas/build-atlas-extras.mjs"),
    source,
    path.join(extras, "za-muscles.fbx"),
    path.join(extras, "za-visceral.fbx"),
    path.join(extras, "hra-male.glb"),
  ], { stdio: "inherit" });

  // Corpo feminino de referência (HRA feminino v1.10, já convertido no projeto MIT
  // slorksmo/Human-Atlas, fixado no workflow).
  const female = process.env.TRAUBE_ATLAS_FEMALE;
  if (!female) throw new Error("Defina TRAUBE_ATLAS_FEMALE (pasta public/models do atlas feminino)");
  const femaleManifest = JSON.parse(fs.readFileSync(path.join(female, "atlas-female.json"), "utf8"));
  if (femaleManifest.sex !== "female" || femaleManifest.parts.length < 1000) throw new Error("Atlas feminino inesperado");
  for (const chunk of femaleManifest.chunks) {
    for (const key of ["url", "gzip"]) if (chunk[key]) fs.copyFileSync(path.join(female, path.basename(chunk[key])), path.join(models, path.basename(chunk[key])));
  }
  const femalePath = path.join(models, "atlas-female.json");
  fs.writeFileSync(femalePath, JSON.stringify(femaleManifest));
  // Músculos complementares e vasos do coração no corpo feminino (ver o script).
  execFileSync(process.execPath, ["--max-old-space-size=8000", path.join(root, "tools/anatomy-atlas/build-female-extras.mjs"), models], { stdio: "inherit" });

  execFileSync(process.execPath, [
    path.join(root, "tools/anatomy-atlas/build-pt-names.cjs"),
    manifestPath,
    path.join(models, "pt-names.json"),
    femalePath,
  ], { stdio: "inherit" });
  for (const file of [manifestPath, femalePath]) {
    const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const chunk of manifest.chunks) {
      for (const key of ["url", "gzip"]) {
        if (chunk[key]) chunk[key] = base + "models/" + path.basename(chunk[key]);
      }
    }
    fs.writeFileSync(file, JSON.stringify(manifest));
    console.log(`Atlas preparado (${path.basename(file)}): ${manifest.parts.length} peças selecionáveis, ${manifest.chunks.length} blocos`);
  }
  prepareAtlasLoading(source);
} else if (mode === "install") {
  const dist = path.join(source, "dist");
  for (const rel of ["index.html", "models/atlas.json", "models/atlas-female.json", "models/pt-names.json"]) {
    if (!fs.existsSync(path.join(dist, rel))) throw new Error("Build do atlas incompleto: falta " + rel);
  }
  const modelFiles = new Set(["atlas", "atlas-female"].flatMap(name => {
    const catalog = JSON.parse(fs.readFileSync(path.join(dist, "models", name + ".json"), "utf8"));
    return catalog.chunks.flatMap(chunk => [chunk.url, chunk.gzip].filter(Boolean).map(url => path.basename(url)));
  }));
  const modelsDir = path.join(dist, "models");
  fs.cpSync(dist, output, { recursive: true, force: true, filter: filename =>
    path.dirname(filename) !== modelsDir || !/\.bin(?:\.gz)?$/.test(filename) || modelFiles.has(path.basename(filename))
  });
  fs.copyFileSync(path.join(source, "LICENSE"), path.join(output, "LICENSE-human-atlas.txt"));
  const femaleLicense = process.env.TRAUBE_ATLAS_FEMALE && path.join(process.env.TRAUBE_ATLAS_FEMALE, "../../LICENSE");
  if (femaleLicense && fs.existsSync(femaleLicense)) fs.copyFileSync(femaleLicense, path.join(output, "LICENSE-atlas-feminino.txt"));
  fs.copyFileSync(path.join(root, "tools/anatomy-atlas/CREDITOS-MODELOS.txt"), path.join(output, "models/CREDITOS-MODELOS.txt"));
  const html = fs.readFileSync(path.join(output, "index.html"), "utf8");
  if (/Human Atlas|LURIA/.test(html)) throw new Error("Marca de terceiros ou nome antigo no index do atlas");
  console.log(`Atlas instalado em ${path.relative(root, output)}`);
} else {
  throw new Error("Use prepare ou install");
}
