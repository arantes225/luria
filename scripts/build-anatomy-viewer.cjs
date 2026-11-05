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
if (modelSha !== "b80a727d022a4ab07ccfcf15caccc228eaccb6d69ec0e72923324946ac35a946") {
  throw new Error("O modelo BodyParts3D não corresponde à revisão verificada");
}

if (model.toString("ascii", 0, 4) !== "glTF" || model.readUInt32LE(8) !== model.length) {
  throw new Error("Modelo do coração inválido ou incompleto");
}
if (model.readUInt32LE(16) !== 0x4e4f534a) {
  throw new Error("Cabeçalho JSON do modelo do coração inválido");
}

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
