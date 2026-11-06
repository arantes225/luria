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
      const key = name + "-traube3" + "-system-" + chunks.length + ".bin";
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
  for (const sex of ["male", "female"]) {
    const name = sex === "female" ? "atlas-female" : "atlas";
    const file = path.join(modelPath, name + ".json");
    const bytes = fs.readFileSync(file);
    const packed = gzipSync(bytes, {level: 9});
    fs.writeFileSync(file + ".gz", packed);
    startup[sex] = JSON.parse(bytes.toString("utf8")).chunks.filter(chunk => chunk.system === "integumentary");
    console.log(name + " catalogue: " + bytes.length + " bytes JSON, " + packed.length + " bytes gzip");
  }
  const names = path.join(modelPath, "pt-names.json");
  fs.writeFileSync(names + ".gz", gzipSync(fs.readFileSync(names), {level: 9}));
  const helper = `
type StartupChunk = {url: string; gzip?: string};
type Reference = 'male' | 'female';
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
  const models = path.join(source, "public/models");
  for (const name of ["atlas", "atlas-female"]) repack(models, name);
  writeStartupAssets(source, models);
};
