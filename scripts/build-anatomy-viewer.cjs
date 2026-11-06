"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { buildSync } = require("esbuild");

const root = path.resolve(__dirname, "..");
const target = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "build/pages/assets/vendor/traube-anatomy-viewer.mjs");
const modelPath = process.env.ANATOMY_MODEL_PATH
  ? path.resolve(process.env.ANATOMY_MODEL_PATH)
  : path.join(root, "assets/models/anatomia/coracao.glb");
const model = fs.readFileSync(modelPath);
const modelSha = crypto.createHash("sha256").update(model).digest("hex");
if (modelSha !== "70ec2937b3736b3dfe1ac3b1c3f97d6529d58c63018a891fe9ae93116612f560") {
  throw new Error("O modelo HRA do coração não corresponde à revisão verificada");
}

if (model.toString("ascii", 0, 4) !== "glTF" || model.readUInt32LE(8) !== model.length) {
  throw new Error("Modelo do coração inválido ou incompleto");
}
if (model.readUInt32LE(16) !== 0x4e4f534a) {
  throw new Error("Cabeçalho JSON do modelo do coração inválido");
}
const jsonLength = model.readUInt32LE(12);
const gltf = JSON.parse(model.toString("utf8", 20, 20 + jsonLength));
const ids = new Set((gltf.nodes || []).map(node => node.extras?.structureId || node.name));
const required = ["VH_F_left_cardiac_atrium", "VH_F_right_cardiac_atrium", "VH_F_left_ventricle", "VH_F_right_ventricle",
  "VH_F_ascending_aorta", "VH_F_aortic_arch", "VH_F_descending_aorta_a", "VH_F_pulmonary_trunk", "VH_F_pulmonary_artery_L", "VH_F_pulmonary_artery_R",
  "VH_F_superior_vena_cava", "VH_F_inferior_vena_cava_a", "VH_F_left_coronary_artery", "VH_F_right_coronary_artery", "VH_F_aortic_valve"];
const missing = required.filter(id => !ids.has(id));
if (missing.length) throw new Error("Estruturas do atlas ausentes: " + missing.join(", "));

fs.mkdirSync(path.dirname(target), { recursive: true });
buildSync({
  entryPoints: [path.join(root, "assets/js/anatomy-heart-entry.mjs")],
  outfile: target,
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  legalComments: "eof",
  logLevel: "warning",
});
execFileSync(process.execPath, ["--check", target], { stdio: "inherit" });
console.log("Visualizador 3D gerado e sintaxe verificada:", path.relative(root, target));
