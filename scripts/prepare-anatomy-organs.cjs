"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = path.resolve(__dirname, "..");
const output = path.resolve(process.argv[2] || path.join(ROOT, "build/pages/assets/models/anatomia/orgaos"));
const source = "https://raw.githubusercontent.com/ImliStack/Body-Atlas-3D/b0e04f6e058c767d51c1529369b7545315c5c6bd/public/organs";
const organs = ["lungs", "kidneys", "stomach", "bladder", "intestines", "liver", "pancreas", "gallbladder", "esophagus", "larynx"];
const femaleSource = "https://raw.githubusercontent.com/organui/uterus-3d/404a6039b2d667e2b4e08ae71d4964cd9b963cf1/public/models";
const femaleHash = "2ad47d7713d50e60ff0a51a6bd110e4ed9750b465b77c573f5e3544b72d49750";

async function download(url, target) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao baixar ${url}: HTTP ${response.status}`);
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  for (const organ of organs) {
    const target = path.join(output, `${organ}.glb`);
    if (!fs.existsSync(target)) await download(`${source}/${organ}.glb`, target);
    const model = fs.readFileSync(target);
    if (model.toString("ascii", 0, 4) !== "glTF" || model.readUInt32LE(8) !== model.length) {
      throw new Error(`GLB inválido: ${organ}`);
    }
  }
  const female = path.join(output, "reproductive.glb");
  if (!fs.existsSync(female)) await download(`${femaleSource}/reproductive.glb`, female);
  const femaleModel = fs.readFileSync(female);
  if (femaleModel.toString("ascii", 0, 4) !== "glTF" || crypto.createHash("sha256").update(femaleModel).digest("hex") !== femaleHash) throw new Error("Modelo reprodutor feminino não corresponde à fonte pinada");
  const femaleAttribution = path.join(output, "ATTRIBUTION-FEMALE.md");
  if (!fs.existsSync(femaleAttribution)) await download(`${femaleSource}/ATTRIBUTION.md`, femaleAttribution);
  const attribution = path.join(output, "ATTRIBUTION.md");
  if (!fs.existsSync(attribution)) await download(`${source}/ATTRIBUTION.md`, attribution);
  const digest = crypto.createHash("sha256");
  for (const organ of organs) digest.update(fs.readFileSync(path.join(output, `${organ}.glb`)));
  console.log(`Órgãos detalhados preparados: ${organs.length + 1} GLBs, SHA agregada ${digest.digest("hex")}`);
})().catch(error => { console.error(error); process.exitCode = 1; });

