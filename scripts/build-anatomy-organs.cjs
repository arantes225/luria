"use strict";
const path = require("node:path");
const { buildSync } = require("esbuild");

const root = path.resolve(__dirname, "..");
const target = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, "build/pages/assets/vendor/traube-anatomy-organs.mjs");
buildSync({
  entryPoints: [path.join(root, "assets/js/anatomy-organs-entry.mjs")],
  outfile: target,
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  legalComments: "eof",
  logLevel: "warning",
});
console.log("Visualizador de órgãos gerado:", path.relative(root, target));

