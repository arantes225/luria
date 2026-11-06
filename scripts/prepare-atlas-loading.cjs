"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { gzipSync } = require("node:zlib");

// Keep every vertex and identifier, but isolate each system in independently loadable files.
function repack(directory, name) {
  const file = path.join(directory, name + ".json");
  const atlas = JSON.parse(fs.readFileSync(file, "utf8"));
  if (atlas.chunks.every(chunk => chunk.system)) return;
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
      const key = name + "-system-" + chunks.length + ".bin";
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

module.exports = function prepareAtlasLoading(source) {
  const modelPath = path.join(source, "public/models");
  for (const name of ["atlas", "atlas-female"]) repack(modelPath, name);
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
  const pagePath = path.join(source, "app/page.tsx");
  let page = fs.readFileSync(pagePath, "utf8");
  page = page.replace(/'models\/(atlas(?:-female)?\.json)'/g, "'models/$1?v=camadas1'");
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
  fs.writeFileSync(pagePath, page);
};

if (require.main === module) module.exports(path.resolve(process.argv[2]));
