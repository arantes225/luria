"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { buildSync } = require("esbuild");

const root = path.resolve(__dirname, "..");
const target = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "build/pages/assets/vendor/traube-anatomy-viewer.mjs");
const model = fs.readFileSync(path.join(root, "assets/models/anatomia/coracao.glb"));

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
