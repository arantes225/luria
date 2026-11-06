"use strict";
// Export selected, named HRA meshes without changing their geometry or registration.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const source = path.resolve(process.argv[2] || path.join(root, "build/human-atlas-source/public/models"));
const destination = path.resolve(process.argv[3] || path.join(root, "build/pages/assets/models/anatomia"));
const manifest = JSON.parse(fs.readFileSync(path.join(source, "atlas-female.json"), "utf8"));
const color = (hex) => [1, 3, 5].map(start => {
  const srgb = parseInt(hex.slice(start, start + 2), 16) / 255;
  return srgb <= .04045 ? srgb / 12.92 : ((srgb + .055) / 1.055) ** 2.4;
}).concat(1);
const heartColor = part => {
  if (/coronary|artery|aorta|aortic_arch|subclavian|carotid|brachiocephalic/.test(part.id)) return color("#b95150");
  if (/pulmonary_trunk|pulmonary_artery/.test(part.id)) return color("#577b9d");
  if (/vena_cava|cardiac_vein/.test(part.id)) return color("#5b7897");
  if (/valve/.test(part.id)) return color("#e4c29c");
  if (/papillary/.test(part.id)) return color("#a8665e");
  return color("#a94d50");
};
const breastColor = part => {
  if (/lactiferous/.test(part.id)) return color("#d9aa75");
  if (/mammary_lobes/.test(part.id)) return color("#ca7882");
  if (/suspensory/.test(part.id)) return color("#e7c5a0");
  if (/fat_/.test(part.id)) return color("#e9bc8d");
  if (/nipple|areola|tubercles/.test(part.id)) return color("#a96769");
  return color("#d59a88");
};
const heart = manifest.parts.filter(p => p.system === "cardiac" || /^VH_F_(great_cardiac_vein|anterior_cardiac_vein|superior_vena_cava|inferior_vena_cava_)/.test(p.id));
const breasts = manifest.parts.filter(p => /^VH_F_(fat_[LR]|areolar_tubercles_[LR]|nipple_[LR]|areola_[LR]|mammary_lobes_[LR]|main_lactiferous_(ducts|sinuses)_[LR]|suspensory_ligaments_[LR])$/.test(p.id));
if (heart.length < 40 || breasts.length !== 16) throw new Error(`HRA inventory changed: heart ${heart.length}, breasts ${breasts.length}`);

function exportGLB(parts, out, chooseColor) {
  const buffers = new Map();
  const chunks = [];
  let byteLength = 0;
  const bufferViews = [], accessors = [], meshes = [], nodes = [], materials = [], materialIds = new Map();
  function append(bytes, target) {
    const padding = (4 - byteLength % 4) % 4;
    if (padding) { chunks.push(Buffer.alloc(padding)); byteLength += padding; }
    const index = bufferViews.push({ buffer: 0, byteOffset: byteLength, byteLength: bytes.length, target }) - 1;
    chunks.push(bytes); byteLength += bytes.length;
    return index;
  }
  function accessor(view, componentType, count, type, min, max, normalized) {
    const item = { bufferView: view, componentType, count, type };
    if (min) { item.min = min; item.max = max; }
    if (normalized) item.normalized = true;
    return accessors.push(item) - 1;
  }
  for (const part of parts) {
    if (!buffers.has(part.chunk)) buffers.set(part.chunk, fs.readFileSync(path.join(source, path.basename(manifest.chunks[part.chunk].url))));
    const sourceBytes = buffers.get(part.chunk);
    const positionBytes = sourceBytes.subarray(part.positions, part.positions + part.vertexCount * 12);
    const normalBytes = sourceBytes.subarray(part.normals, part.normals + part.vertexCount * 6);
    const indexBytes = sourceBytes.subarray(part.indices, part.indices + part.indexCount * 4);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < part.vertexCount; i++) for (let a = 0; a < 3; a++) {
      const value = positionBytes.readFloatLE(i * 12 + a * 4);
      min[a] = Math.min(min[a], value); max[a] = Math.max(max[a], value);
    }
    const position = accessor(append(positionBytes, 34962), 5126, part.vertexCount, "VEC3", min, max);
    const normal = accessor(append(normalBytes, 34962), 5122, part.vertexCount, "VEC3", null, null, true);
    const indices = accessor(append(indexBytes, 34963), 5125, part.indexCount, "SCALAR");
    const rgba = chooseColor(part), key = rgba.join(",");
    if (!materialIds.has(key)) materialIds.set(key, materials.push({ name: key, pbrMetallicRoughness: { baseColorFactor: rgba, metallicFactor: 0, roughnessFactor: .86 }, doubleSided: true }) - 1);
    const meshIndex = meshes.push({ name: part.id, primitives: [{ attributes: { POSITION: position, NORMAL: normal }, indices, material: materialIds.get(key) }] }) - 1;
    nodes.push({ name: part.id, mesh: meshIndex, extras: { structureId: part.id } });
  }
  const gltf = { asset: { version: "2.0", generator: "TRAUBE HRA named-mesh export" }, scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes, materials, accessors, bufferViews, buffers: [{ byteLength }] };
  const json = Buffer.from(JSON.stringify(gltf));
  const jsonPadding = (4 - json.length % 4) % 4;
  const binPadding = (4 - byteLength % 4) % 4;
  const jsonChunk = Buffer.concat([json, Buffer.alloc(jsonPadding, 0x20)]);
  const binChunk = Buffer.concat([...chunks, Buffer.alloc(binPadding)]);
  const header = Buffer.alloc(12), jsonHeader = Buffer.alloc(8), binHeader = Buffer.alloc(8);
  header.write("glTF"); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binChunk.length, 8);
  jsonHeader.writeUInt32LE(jsonChunk.length, 0); jsonHeader.writeUInt32LE(0x4e4f534a, 4);
  binHeader.writeUInt32LE(binChunk.length, 0); binHeader.writeUInt32LE(0x004e4942, 4);
  const result = Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]);
  fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, result);
  console.log(`${path.relative(root, out)}: ${parts.length} malhas, ${result.length} bytes, SHA-256 ${crypto.createHash("sha256").update(result).digest("hex")}`);
}
exportGLB(heart, path.join(destination, "coracao.glb"), heartColor);
exportGLB(breasts, path.join(destination, "orgaos/breasts.glb"), breastColor);
const attribution = "Malhas anatômicas de Human Reference Atlas / HuBMAP, referência feminina, CC BY 4.0. Extraídas sem alterar a geometria do conjunto ImliStack/Body-Atlas-3D, commit b0e04f6e058c767d51c1529369b7545315c5c6bd. Alterações: seleção de malhas por identificação HRA e materiais de visualização. https://humanatlas.io/3d-reference-library · https://creativecommons.org/licenses/by/4.0/\n";
fs.writeFileSync(path.join(destination, "ATTRIBUTION-HRA.md"), attribution);
