"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const zlib = require("node:zlib");
const localizeHumanAtlas = require("./localize-human-atlas.cjs");

const source = path.resolve(process.argv[3] || "build/human-atlas-source");
const output = path.resolve("build/pages/aprender/anatomia/atlas");
const base = "/aprender/anatomia/atlas/";
const mode = process.argv[2];
const femaleSource = "https://raw.githubusercontent.com/ImliStack/Body-Atlas-3D/b0e04f6e058c767d51c1529369b7545315c5c6bd/public/models";

function fetchPinned(url, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  execFileSync("curl", ["--fail", "--location", "--retry", "3", url, "--output", target], { stdio: "inherit" });
}

if (mode === "prepare") {
  const pagePath = path.join(source, "app/page.tsx");
  const original = fs.readFileSync(pagePath, "utf8");
  const needle = "fetch('/models/atlas.json'";
  if (!original.includes(needle)) throw new Error("Human Atlas model URL changed upstream");
  fs.writeFileSync(pagePath, original.replace(needle, "fetch(new URL('models/atlas.json',document.baseURI)"));

  const manifestPath = path.join(source, "public/models/atlas.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(manifest.chunks) || manifest.chunks.length < 10 || !Array.isArray(manifest.parts) || manifest.parts.length < 2000) {
    throw new Error("Human Atlas catalogue coverage changed");
  }
  for (const chunk of manifest.chunks) {
    for (const key of ["url", "gzip"]) {
      if (chunk[key]) chunk[key] = base + "models/" + path.basename(chunk[key]);
    }
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  const femaleManifestPath = path.join(source, "public/models/atlas-female.json");
  fetchPinned(`${femaleSource}/atlas-female.json`, femaleManifestPath);
  const femaleManifest = JSON.parse(fs.readFileSync(femaleManifestPath, "utf8"));
  if (!Array.isArray(femaleManifest.chunks) || femaleManifest.chunks.length < 10 || !Array.isArray(femaleManifest.parts) || femaleManifest.parts.length < 2000) {
    throw new Error("Female Human Reference Atlas catalogue coverage changed");
  }
  for (const chunk of femaleManifest.chunks) {
    for (const key of ["url", "gzip"]) {
      if (!chunk[key]) continue;
      const filename = path.basename(chunk[key]);
      chunk[key] = base + "models/" + filename;
      const localChunk = path.join(source, "public/models", filename);
      if (!fs.existsSync(localChunk)) {
        if (filename.endsWith(".bin")) {
          const compressed = `${localChunk}.gz`;
          if (!fs.existsSync(compressed)) fetchPinned(`${femaleSource}/${filename}.gz`, compressed);
          fs.writeFileSync(localChunk, zlib.gunzipSync(fs.readFileSync(compressed)));
        } else {
          fetchPinned(`${femaleSource}/${filename}`, localChunk);
        }
      }
    }
  }
  fs.writeFileSync(femaleManifestPath, JSON.stringify(femaleManifest));
  localizeHumanAtlas(source, process.env.ANATOMY_TA2_CSV);

  const scenePath = path.join(source, "app/scene.tsx");
  let scene = fs.readFileSync(scenePath, "utf8");
  const oldMaterial = "metalness:.08,roughness:.53";
  if (!scene.includes(oldMaterial)) throw new Error("Human Atlas material changed upstream");
  scene = scene.replace(oldMaterial, "metalness:0,roughness:system==='muscular'||system==='cardiac'?.78:system==='skeletal'?.86:.62");
  scene = scene.replace("transparent:system==='integumentary',opacity:system==='integumentary'?.1:1,depthWrite:system!=='integumentary'", "transparent:false,opacity:1,depthWrite:true");
  scene = scene.replace("renderer.setClearColor('#f2f3f3')", "renderer.setClearColor('#e9f0f8')");
  scene = scene.replace("renderer.toneMappingExposure=1.12", "renderer.toneMappingExposure=1.02");
  scene = scene.replace("This browser could not start the 3D viewer. Please try a browser with WebGL enabled.", "Este navegador não conseguiu iniciar o atlas 3D. Ative o WebGL ou tente outro navegador.");
  scene = scene.replace("Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.", "Anatomia humana interativa. Arraste para girar, aproxime com dois dedos ou a roda do mouse e toque em uma estrutura para identificá-la.");
  scene = scene.replace("scene.add(new T.HemisphereLight(0xffffff,0xa7acb2,1.05));", "scene.add(new T.HemisphereLight(0xfff3e9,0x617184,1.18));");
  scene = scene.replace("const key=new T.DirectionalLight(0xfffaf4,2.3)", "const key=new T.DirectionalLight(0xffeadc,2.8)");
  scene = scene.replace("const rim=new T.DirectionalLight(0xe9f0ff,1.8)", "const rim=new T.DirectionalLight(0xc9ddfa,1.45)");
  scene = scene.replace("shader.vertexShader='attribute float partIndex;", "shader.vertexShader='varying vec3 tissueCoord; attribute float partIndex;");
  scene = scene.replace("transformed += state.xyz; partVisible", "transformed += state.xyz; tissueCoord = position; partVisible");
  scene = scene.replace("shader.fragmentShader='varying float partVisible;", "shader.fragmentShader='varying vec3 tissueCoord; varying float partVisible;");
  const oldColor = "diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.85, 0.78), partSelected * 0.75);";
  const newColor = "float tissueNoise = fract(sin(dot(floor(tissueCoord * 420.0), vec3(12.9898, 78.233, 37.719))) * 43758.5453); diffuseColor.rgb *= 0.94 + 0.12 * tissueNoise; diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.38, 0.72, 0.89), partSelected * 0.72);";
  if (!scene.includes(oldColor)) throw new Error("Human Atlas selection shader changed upstream");
  scene = scene.replace(oldColor, newColor);
  fs.writeFileSync(scenePath, scene);

  const webPath = path.join(source, "web/index.html");
  let web = fs.readFileSync(webPath, "utf8");
  web = web.replace('lang="en"', 'lang="pt-BR"').replace('<title>Human Atlas</title>', '<title>Sala de Anatomia · TRAUBE</title>');
  web = web.replace('An interactive atlas of the human body. Explore named anatomical structures, reveal organ systems, and inspect individual parts in 3D.', 'Atlas interativo do corpo humano. Explore sistemas e identifique estruturas anatômicas em 3D.');
  fs.writeFileSync(webPath, web);

  fs.appendFileSync(path.join(source, "app/globals.css"), `\n:root{--background:#e9f0f8;--foreground:#132b4a;--primary:#184888;--primary-foreground:#fff;--secondary:#e7eef7;--muted:#e7eef7;--accent:#dae8f7;--border:#18488822;--ring:#184888}\nbody{display:flex;flex-direction:column;background:#e9f0f8}#root{height:calc(100dvh - 60px);flex:1;min-height:0}.studio{height:100%;background:radial-gradient(ellipse at 52% 42%,#f5f8fc 0%,#e9f0f8 58%,#d9e5f3 100%)}.glass{background:#fffffff0;border:1px solid #18488820;box-shadow:0 16px 48px #102c5420}.identity h1{color:#132b4a;font-weight:800;letter-spacing:-.045em}.identity .eyebrow{color:#184888;font-weight:800}.sex-switch{display:flex;gap:6px;margin-top:10px}.sex-switch button{border:1px solid #18488835;border-radius:999px;background:#ffffffd9;color:#315677;padding:6px 10px;font:700 11px system-ui;cursor:pointer}.sex-switch button.active,.sex-switch button:hover{background:#184888;color:#fff}.layers-panel,.bottom-dock,.view-controls,.search-panel,.detail-sheet,.about-sheet{border-radius:18px}.system-row.enabled .system-name{color:#132b4a}.top-actions button,.view-controls button{border-radius:12px}.traube-atlas-header{height:60px;flex:0 0 60px;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:0 22px;background:#143f79;color:#fff;box-shadow:0 4px 18px #0b265238;position:relative;z-index:30;font:700 14px system-ui,sans-serif}.traube-atlas-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}.traube-atlas-brand img{height:37px;width:37px;object-fit:contain}.traube-atlas-nav{display:flex;align-items:center;gap:12px}.traube-atlas-nav a{color:#fff;text-decoration:none;padding:8px 12px;border:1px solid #ffffff66;border-radius:999px}.traube-atlas-nav a:hover{background:#ffffff24}@media(max-width:767px){.traube-atlas-header{height:56px;flex-basis:56px;padding:0 12px;font-size:12px}#root{height:calc(100dvh - 56px)}.traube-atlas-brand img{height:30px;width:30px}.traube-atlas-nav{gap:5px}.traube-atlas-nav a{padding:7px 9px}.identity{top:17px}.top-actions{top:17px}.sex-switch{flex-wrap:wrap;max-width:220px}}\n`);
  fs.appendFileSync(path.join(source, "app/globals.css"), "\n.traube-atlas-nav{overflow-x:auto;white-space:nowrap;min-width:0}.traube-atlas-brand{flex-shrink:0}@media(max-width:767px){.traube-atlas-nav{max-width:64vw}.traube-atlas-nav a{flex-shrink:0}}\n");
  console.log(`Human Atlas prepared: ${manifest.parts.length} selectable meshes, ${manifest.chunks.length} chunks`);
} else if (mode === "install") {
  const dist = path.join(source, "dist");
  if (!fs.existsSync(path.join(dist, "index.html")) || !fs.existsSync(path.join(dist, "models/atlas.json"))) {
    throw new Error("Human Atlas build is incomplete");
  }
  fs.cpSync(dist, output, { recursive: true, force: true });
  fs.copyFileSync(path.join(source, "LICENSE"), path.join(output, "LICENSE-human-atlas.txt"));
  fs.writeFileSync(path.join(output, "ATTRIBUTION-FEMININO.md"), "Referência feminina: Kristen Browne e Heidi Schlehlein, Human Reference Atlas / HuBMAP, 3D Reference Organ Set for Female v1.5 (2023), CC BY 4.0. Geometria adaptada para este atlas a partir de ImliStack/Body-Atlas-3D, commit b0e04f6e058c767d51c1529369b7545315c5c6bd. Fonte: https://doi.org/10.48539/HBM352.BTSQ.586 e https://creativecommons.org/licenses/by/4.0/.\n");
  let html = fs.readFileSync(path.join(output, "index.html"), "utf8");
   const navigation = '<header class="traube-atlas-header"><a class="traube-atlas-brand" href="/aprender/"><img src="/assets/img/logos/logo-icone-original.png" alt=""><span>TRAUBE <small>· Sala de Anatomia</small></span></a><nav class="traube-atlas-nav" aria-label="Navegação da anatomia"><a href="/aprender/anatomia/coracao/">Coração em detalhe</a><a href="/aprender/anatomia/orgaos/?orgao=breasts">Mamas por dentro</a><a href="/aprender/anatomia/orgaos/?orgao=reproductive">Útero e ovários</a><a href="/aprender/anatomia/orgaos/">Órgãos em detalhe</a><a href="/aprender/">Voltar</a></nav></header>';
  if (!html.includes("</body>")) throw new Error("Human Atlas index changed upstream");
  html = html.replace('<html lang="en"', '<html lang="pt-BR"');
  html = html.replace('<div id="root"></div>', navigation + '<div id="root"></div>');
  fs.writeFileSync(path.join(output, "index.html"), html);
  fs.writeFileSync(path.join(output, "TRADUCOES.md"), "Traduções de termos anatômicos por correspondência exata com TA2.csv do Z-Anatomy, © contribuidores do Z-Anatomy, CC BY-SA 4.0. Termos sem correspondência permanecem no idioma original para evitar traduções anatômicas especulativas. Fonte: https://github.com/LluisV/Z-Anatomy .\n");
  console.log(`Human Atlas installed at ${output}`);
} else {
  throw new Error("Use prepare or install");
}

