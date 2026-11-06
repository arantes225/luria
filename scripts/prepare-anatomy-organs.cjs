"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = path.resolve(__dirname, "..");
const output = path.resolve(process.argv[2] || path.join(ROOT, "build/pages/assets/models/anatomia/orgaos"));
const source = "https://raw.githubusercontent.com/ImliStack/Body-Atlas-3D/b0e04f6e058c767d51c1529369b7545315c5c6bd/public/organs";
const organs = {
  "lungs": { sourceName: "lungs", gitBlob: "b91980fe5907676bf7b53fcd52780974005c0813" },
  "stomach": { sourceName: "stomach", gitBlob: "0cc11d7b4e316b34af16b7a85d22682fae9d9e0a" },
  "bladder": { sourceName: "bladder", gitBlob: "c2d7cd64a0f27ba4d3bf02aa268428ec696e1ef2" },
  "intestines": { sourceName: "intestines", gitBlob: "72f49c8247d88109653f8b435329ee7ccd5be85a" },
  "liver": { sourceName: "liver", gitBlob: "751a893de194b6d7ffe17bda5cb1a92ac8ab42a3" },
  "pancreas": { sourceName: "pancreas", gitBlob: "357402a43ae5fb2a81b17bdaaa9a2fa7046f5606" },
  "gallbladder": { sourceName: "gallbladder", gitBlob: "c05a678646f697cf075f688de49df0a9ea46479a" },
  "esophagus": { sourceName: "esophagus", gitBlob: "a9b65b9d2d02e8b859a28a8e1f07c4e9d3ffeb7e" },
  "larynx": { sourceName: "larynx", gitBlob: "3904666be682c0ecc4c341d4e81128a5a77ccb70" },
  "brain": { sourceName: "brain", gitBlob: "744407ab0488d71b234a41bc26f9ab74eb867b00" },
  "eye": { sourceName: "eye", gitBlob: "3421b0ef82eb0100c87498acd9ebef8b995bb4ef" },
  "spleen": { sourceName: "spleen", gitBlob: "d8de5445848ac5847952d1862679087c6ea511c1" },
  "kidneys-bodyparts": { sourceName: "kidneys", gitBlob: "fc7102d5635f16353b2854d1c2730ae2a44443a5" }
};
const femaleSource = "https://raw.githubusercontent.com/organui/uterus-3d/404a6039b2d667e2b4e08ae71d4964cd9b963cf1/public/models";
const femaleHash = "2ad47d7713d50e60ff0a51a6bd110e4ed9750b465b77c573f5e3544b72d49750";

async function download(url, target) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao baixar ${url}: HTTP ${response.status}`);
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
}

function inspectModel(model, label) {
  if (model.length < 20 || model.toString("ascii", 0, 4) !== "glTF" || model.readUInt32LE(4) !== 2 ||
      model.readUInt32LE(8) !== model.length || model.readUInt32LE(16) !== 0x4e4f534a) {
    throw new Error(`GLB inválido: ${label}`);
  }
  const jsonEnd = 20 + model.readUInt32LE(12);
  if (jsonEnd > model.length) throw new Error(`Metadados GLB truncados: ${label}`);
  const gltf = JSON.parse(model.toString("utf8", 20, jsonEnd));
  if (!gltf.meshes?.length || !gltf.meshes.some(mesh => mesh.primitives?.some(part => part.attributes?.POSITION !== undefined))) {
    throw new Error(`Modelo sem superfícies: ${label}`);
  }
  const textures = gltf.textures?.length ?? 0;
  console.log(`Modelo ${label}: ${gltf.meshes.length} malhas, ${textures} texturas de origem`);
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  for (const [organ, { sourceName, gitBlob }] of Object.entries(organs)) {
    const target = path.join(output, `${organ}.glb`);
    if (!fs.existsSync(target)) await download(`${source}/${sourceName}.glb`, target);
    const model = fs.readFileSync(target);
    const hash = crypto.createHash("sha1").update(`blob ${model.length}\0`).update(model).digest("hex");
    if (hash !== gitBlob) throw new Error(`O modelo ${organ} diverge do arquivo pinado em Body Atlas 3D`);
    inspectModel(model, organ);
  }
  const female = path.join(output, "reproductive.glb");
  if (!fs.existsSync(female)) await download(`${femaleSource}/reproductive.glb`, female);
  const femaleModel = fs.readFileSync(female);
  if (femaleModel.toString("ascii", 0, 4) !== "glTF" || crypto.createHash("sha256").update(femaleModel).digest("hex") !== femaleHash) throw new Error("Modelo reprodutor feminino não corresponde à fonte pinada");
  inspectModel(femaleModel, "reproductive");
  const femaleAttribution = path.join(output, "ATTRIBUTION-FEMALE.md");
  if (!fs.existsSync(femaleAttribution)) await download(`${femaleSource}/ATTRIBUTION.md`, femaleAttribution);
  const attribution = path.join(output, "ATTRIBUTION.md");
  if (!fs.existsSync(attribution)) await download(`${source}/ATTRIBUTION.md`, attribution);
  const digest = crypto.createHash("sha256");
  for (const organ of Object.keys(organs)) digest.update(fs.readFileSync(path.join(output, `${organ}.glb`)));
  console.log(`Órgãos detalhados preparados: ${Object.keys(organs).length + 1} GLBs, SHA agregada ${digest.digest("hex")}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
