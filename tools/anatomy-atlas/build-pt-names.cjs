"use strict";
// Gera pt-names.json (nome FMA em inglês -> nome em português) a partir do
// glossário revisável glossario-pt.tsv e do catálogo atlas.json do atlas.
// Uso: node build-pt-names.cjs <atlas.json> [saida.json] [outro-atlas.json ...]
const fs = require("node:fs");
const path = require("node:path");

const glossaryPath = path.join(__dirname, "glossario-pt.tsv");
const atlasPath = process.argv[2];
const outPath = process.argv[3] || path.join(__dirname, "pt-names.json");
if (!atlasPath) throw new Error("Informe o caminho do atlas.json");

const glossary = new Map();
const rows = fs.readFileSync(glossaryPath, "utf8").split(/\r?\n/).filter(Boolean);
for (const row of rows) {
  const [en, pt] = row.split("\t");
  if (!en || !pt) throw new Error("Linha inválida no glossário: " + row);
  if (glossary.has(en)) throw new Error("Termo duplicado no glossário: " + en);
  glossary.set(en, pt.trim());
}
// "@ resto" = tradução do termo sem o marcador "{L} " + resto
for (const [en, pt] of glossary) {
  if (!pt.startsWith("@")) continue;
  const base = glossary.get(en.replace(/^\{L\} /, ""));
  if (!base || base.startsWith("@")) throw new Error("Base ausente para: " + en);
  glossary.set(en, base + pt.slice(1));
}

const SIDE = {
  left: { Lm: "esquerdo", Lf: "esquerda", Lmp: "esquerdos", Lfp: "esquerdas" },
  right: { Lm: "direito", Lf: "direita", Lmp: "direitos", Lfp: "direitas" },
};
function translate(name) {
  const lower = name.toLowerCase().replace(/\s+/g, " ").trim();
  const sides = [...lower.matchAll(/\b(left|right)\b/g)].map(m => m[1]);
  const key = lower.replace(/\b(left|right)\b/g, "{L}");
  const pt = glossary.get(key);
  if (!pt) return null;
  let i = 0;
  const out = pt.replace(/\{(Lm|Lf|Lmp|Lfp)\}/g, (_, form) => {
    const side = sides[Math.min(i++, sides.length - 1)];
    if (!side) throw new Error("Marcador sem lateralidade em: " + name);
    return SIDE[side][form];
  });
  if (/\{L/.test(out)) throw new Error("Marcador não resolvido: " + name);
  return out.charAt(0).toUpperCase() + out.slice(1);
}

// Atlas adicionais (ex.: o feminino) entram no mesmo arquivo de nomes.
const names = new Set();
for (const file of [atlasPath, ...process.argv.slice(4)]) {
  const atlas = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const n of [...atlas.concepts.map(c => c.name), ...atlas.parts.map(p => p.name)]) names.add(n);
}
const result = {};
const missing = [];
for (const name of [...names].sort()) {
  const pt = translate(name);
  if (pt) result[name] = pt; else missing.push(name);
}
if (missing.length) {
  console.error("Sem tradução (" + missing.length + "):\n" + missing.slice(0, 50).join("\n"));
  process.exit(1);
}
fs.writeFileSync(outPath, JSON.stringify(result));
console.log(`pt-names.json: ${Object.keys(result).length} nomes traduzidos (${glossary.size} termos no glossário)`);
