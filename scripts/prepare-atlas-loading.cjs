"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { gzipSync } = require("node:zlib");

const mammaryPart = /^VH_F_(fat_[LR]|areolar_tubercles_[LR]|nipple_[LR]|areola_[LR]|mammary_lobes_[LR]|main_lactiferous_(ducts|sinuses)_[LR]|suspensory_ligaments_[LR])$/;

// Keep every vertex and identifier, but isolate each system in independently loadable files.
function repack(directory, name) {
  const file = path.join(directory, name + ".json");
  const atlas = JSON.parse(fs.readFileSync(file, "utf8"));
  const female = name === "atlas-female";
  const mammary = female ? atlas.parts.filter(part => mammaryPart.test(part.id)) : [];
  if (female && mammary.length !== 16) throw Error("Female mammary catalogue changed");
  if (atlas.chunks.every(chunk => chunk.system) && mammary.every(part => part.system === "mammary")) return;
  for (const part of mammary) part.system = "mammary";
  const original = atlas.chunks.map(chunk => fs.readFileSync(path.join(directory, path.basename(chunk.url))));
  const prefix = atlas.chunks[0].url.replace(/[^/]+$/, "");
  const bySystem = new Map();
  for (const part of atlas.parts) {
    const group = bySystem.get(part.system) || [];
    group.push(part);
    bySystem.set(part.system, group);
  }
  const chunks = [];
  for (const [system, parts] of bySystem) {
    let buffers = [], offset = 0;
    const flush = () => {
      if (!offset) return;
      const key = name + (female ? "-surface-v2" : "") + "-system-" + chunks.length + ".bin";
      const bin = Buffer.concat(buffers, offset), gzip = gzipSync(bin);
      fs.writeFileSync(path.join(directory, key), bin);
      fs.writeFileSync(path.join(directory, key + ".gz"), gzip);
      chunks.push({ system, url: prefix + key, gzip: prefix + key + ".gz", bytes: bin.length, gzipBytes: gzip.length });
      buffers = []; offset = 0;
    };
    for (const part of parts) {
      const from = original[part.chunk];
      const fields = [["positions", part.vertexCount * 12], ["normals", part.vertexCount * 6], ["indices", part.indexCount * 4]];
      if (offset && offset + fields.reduce((total, [, size]) => total + size + 3, 0) > 3_000_000) flush();
      part.chunk = chunks.length;
      for (const [key, size] of fields) {
        const pad = (4 - offset % 4) % 4, start = part[key];
        if (start + size > from.length) throw Error("Invalid atlas range: " + part.id + " " + key);
        if (pad) buffers.push(Buffer.alloc(pad));
        offset += pad; part[key] = offset;
        buffers.push(from.subarray(start, start + size)); offset += size;
      }
    }
    flush();
  }
  atlas.chunks = chunks;
  fs.writeFileSync(file, JSON.stringify(atlas));
  console.log(name + ": initial exterior " + chunks.filter(c => c.system === "integumentary").reduce((sum, c) => sum + c.gzipBytes, 0) + " bytes gzip; " + atlas.parts.length + " meshes retained");
}

function writeStartupAssets(source, modelPath) {
  const startup = {};
  for (const sex of ["masculino", "feminino"]) {
    const name = sex === "feminino" ? "atlas-female" : "atlas";
    const file = path.join(modelPath, name + ".json");
    const bytes = fs.readFileSync(file);
    const packed = gzipSync(bytes, {level: 9});
    fs.writeFileSync(file + ".gz", packed);
    startup[sex] = JSON.parse(bytes.toString("utf8")).chunks.filter(chunk => chunk.system === "integumentary");
    console.log(name + " catalogue: " + bytes.length + " bytes JSON, " + packed.length + " bytes gzip");
  }
  const helper = `
type StartupChunk = {url: string; gzip?: string};
type Reference = 'masculino' | 'feminino';
const exterior: Record<Reference, StartupChunk[]> = ${JSON.stringify(startup)};
const pending = new Map<string, Promise<Response | null>>();

export function primeExterior(reference: Reference, signal: AbortSignal) {
  pending.clear();
  for (const chunk of exterior[reference]) {
    const url = chunk.gzip && typeof DecompressionStream !== 'undefined' ? chunk.gzip : chunk.url;
    pending.set(url, fetch(url, {signal}).then(response => response.ok ? response : null).catch(() => null));
  }
}

export async function fetchAtlasChunk(url: string, signal: AbortSignal) {
  const primed = pending.get(url);
  pending.delete(url);
  return (primed && await primed) || fetch(url, {signal});
}

export async function readAtlas(url: URL, signal: AbortSignal) {
  if (typeof DecompressionStream !== 'undefined') {
    const compressed = new URL(url);
    compressed.pathname += '.gz';
    try {
      const response = await fetch(compressed, {signal});
      if (response.ok) {
        const bytes = new Uint8Array(await response.arrayBuffer());
        // A CDN may already have applied HTTP decompression.
        if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return await new Response(bytes).json();
        const decoded = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
        return await new Response(decoded).json();
      }
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  const response = await fetch(url, {signal});
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo do atlas.');
  return response.json();
}
`;
  fs.writeFileSync(path.join(source, "app/atlas-startup.ts"), helper);
}

module.exports = function prepareAtlasLoading(source) {
  const modelPath = path.join(source, "public/models");
  for (const name of ["atlas", "atlas-female"]) repack(modelPath, name);
  writeStartupAssets(source, modelPath);
  const anatomyPath = path.join(source, "app/anatomy.ts");
  const anatomy = fs.readFileSync(anatomyPath, "utf8");
  if (!anatomy.includes("id:'mammary'")) {
    const surface = " {id:'integumentary',";
    const systemType = /^(export type SystemId = [^;]+);/m;
    if (!anatomy.includes(surface) || !systemType.test(anatomy)) throw Error("Upstream atlas system definitions changed");
    const updated = anatomy
      .replace(systemType, "$1|'mammary';")
      .replace(surface, " {id:'mammary',name:'Mamas',color:'#bf8088',description:'Explore as glândulas mamárias e os tecidos ao redor.'},\n" + surface);
    fs.writeFileSync(anatomyPath, updated);
  }
  const scenePath = path.join(source, "app/scene.tsx");
  let scene = fs.readFileSync(scenePath, "utf8");
  if (!scene.includes("function loadVisibleChunks")) {
    const start = scene.indexOf("  (async()=>{try{let cursor=0;");
    const end = scene.indexOf("\n  const fit=", start);
    if (start < 0 || end < 0) throw Error("Upstream atlas loading changed");
    scene = scene.slice(0, start) + `  const complete=new Set<number>(),pending=new Set<number>(),failed=new Set<number>();
  const partIds=new Map(atlas.parts.map(p=>[p.id,p]));
  const chunkSystems=new Map<string,number[]>();
  atlas.chunks.forEach((chunk,i)=>{const system=(chunk as {system?:string}).system;if(!system)throw Error('Grupo de malhas ausente.');const list=chunkSystems.get(system)??[];list.push(i);chunkSystems.set(system,list);});
  let demand=new Set<number>(),reported=-1,previousDemand:SceneState|null=null;
  function loadVisibleChunks(s:SceneState){
   if(disposed)return;
   if(previousDemand?.visible!==s.visible||previousDemand?.selected!==s.selected||previousDemand?.isolate!==s.isolate){
    demand=new Set<number>();
    if(!s.isolate)for(const system of s.visible)for(const index of chunkSystems.get(system)??[])demand.add(index);
    for(const id of s.selected){const part=partIds.get(id);if(part)demand.add(part.chunk);}
    previousDemand=s;
   }
   const remaining=[...demand].filter(i=>!complete.has(i));
   const percent=demand.size?Math.min(remaining.length?99:100,Math.round(100*(demand.size-remaining.length)/demand.size)):100;
   if(percent!==reported){reported=percent;onProgress(percent);}
   for(const index of remaining){
    if(pending.size>=3)break;
    if(pending.has(index)||failed.has(index))continue;
    pending.add(index);
    loadChunk(index).then(()=>{if(!disposed){complete.add(index);ready=true;}}).catch(()=>{
     if(!disposed){failed.add(index);onError('Não foi possível carregar uma camada. Recarregue o atlas para tentar novamente.');}
    }).finally(()=>{pending.delete(index);loadVisibleChunks(latest.current);});
   }
  }
  loadVisibleChunks(latest.current);` + scene.slice(end);
    scene = scene.replace("  let loaded=0;\n", "").replace("lastState=null;loaded++;onProgress(Math.round(loaded/atlas.chunks.length*100));dirty=true;", "lastState=null;dirty=true;");
    scene = scene.replace("const changed=lastState?.visible", "if(previousDemand?.visible!==s.visible||previousDemand?.selected!==s.selected||previousDemand?.isolate!==s.isolate)loadVisibleChunks(s);\n   const changed=lastState?.visible");
    fs.writeFileSync(scenePath, scene);
  }
  if (!scene.includes("import {fetchAtlasChunk}")) {
    const originalFetch = "fetch(compressed?chunk.gzip!:chunk.url,{signal:abort.signal})";
    if (!scene.includes(originalFetch)) throw Error("Upstream atlas chunk fetch changed");
    scene = "import {fetchAtlasChunk} from './atlas-startup';\n" +
      scene.replace(originalFetch, "fetchAtlasChunk(compressed?chunk.gzip!:chunk.url,abort.signal)");
    fs.writeFileSync(scenePath, scene);
  }
  const pagePath = path.join(source, "app/page.tsx");
  let page = fs.readFileSync(pagePath, "utf8");
  page = page
    .replace(/'models\/(atlas(?:-female)?\.json)'/g, "'models/$1?v=camadas1'")
    .replace(/atlas-female\.json\?v=camadas\d+/g, "atlas-female.json?v=camadas2");
  if (!page.includes("const exterior:")) {
    page = page.replace("const initial:SceneState", "const exterior: SystemId[] = ['integumentary'];\nconst initial:SceneState")
      .replace(/visible:sex==='feminino'\?\['integumentary'\]:DEFAULT_VISIBLE/g, "visible:exterior")
      .replace("visible:DEFAULT_VISIBLE", "visible:exterior")
      .replace("DEFAULT_VISIBLE,SYSTEMS", "SYSTEMS")
      .replace("[...s.visible,id]", "id==='integumentary'?exterior:[...s.visible.filter(layer=>layer!=='integumentary'),id]")
      .replace("visible:activeSistemas.map(x=>x.id)", "visible:activeSistemas.map(x=>x.id).filter(id=>id!=='integumentary')")
      .replace("activeSistemas.every(x=>state.visible.includes(x.id))", "activeSistemas.filter(x=>x.id!=='integumentary').every(x=>state.visible.includes(x.id))")
      .replace("className=\"loading glass\" role=\"status\"", "className=\"loading glass atlas-layer-progress\" role=\"status\"")
      .replace(/Carregando \{atlas\?\.parts\.length\.toLocaleString\('pt-BR'\)\?\?[^}]+\} pieces/, "Carregando camadas selecionadas");
    fs.appendFileSync(path.join(source, "app/globals.css"), "\n.atlas-layer-progress{top:auto;bottom:225px;padding:8px 12px;min-width:0;max-width:80%;gap:8px;pointer-events:none}.atlas-layer-progress .loading-track{min-width:135px;margin-top:6px}.atlas-layer-progress span{margin-top:2px}\n");
  }
  if (!page.includes("import {primeExterior,readAtlas}")) {
    const request = /fetch\((new URL\([^\n]+?,document\.baseURI\)),\{signal:abort\.signal\}\)\.then\(r=>\{[^\n]*?return r\.json\(\);\}\)/;
    if (!request.test(page)) throw Error("Upstream atlas catalogue fetch changed");
    page = "import {primeExterior,readAtlas} from './atlas-startup';\n" +
      page.replace(request, "primeExterior(sex,abort.signal);readAtlas($1,abort.signal)")
        .replace("Preparando a anatomia", "Carregando modelo 3D");
  }
  fs.writeFileSync(pagePath, page);
};

if (require.main === module) module.exports(path.resolve(process.argv[2]));
