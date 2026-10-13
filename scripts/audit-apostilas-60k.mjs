#!/usr/bin/env node
/**
 * Auditoria preliminar de densidade editorial das Apostilas LURIA.
 * Uso: node scripts/audit-apostilas-60k.mjs [--json] [--fail]
 *
 * Estima apenas caracteres legíveis do artigo principal / seções JSON.
 * É uma métrica automatizada de TRIAGEM, não validação clínica.
 * A aprovação das imagens é gerenciada no Supabase/Admin e não é inferida daqui.
 */
import fs from "node:fs";
import path from "node:path";

const MIN = 60_000;
const base = path.resolve(process.cwd(), "apostilas");
const opt = new Set(process.argv.slice(2));

function removeTagBlocks(x) {
  return x
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, " ")
    .replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, " ")
    .replace(/<section\b[^>]*id=["']referencias["'][^>]*>[\s\S]*?<\/section>/gi, " ")
    .replace(/<section\b[^>]*class=["'][^"']*book-hero[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, " ");
}
function visible(s) {
  const named = {
    nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
    mdash: "—", ndash: "–", hellip: "…", rarr: "→", le: "≤", ge: "≥"
  };
  return removeTagBlocks(String(s))
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (_, name) => {
      if (name[0] === "#") {
        const hex = name[1]?.toLowerCase() === "x";
        const code = parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10);
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code) : " ";
      }
      return named[name.toLowerCase()] ?? " ";
    })
    .replace(/\s+/g, " ")
    .trim();
}
function articleContent(html) {
  // Main article only. If a legacy apostila uses another renderer, it is flagged.
  const m = html.match(/<article\b[^>]*class=["'][^"']*book-main[^"']*["'][^>]*>([\s\S]*?)<\/article>/i);
  return m ? { source: m[1], foundArticle: true } : { source: html, foundArticle: false };
}
function flattenedStrings(node, target) {
  if (typeof node === "string" && node.length >= 5) target.push(node);
  else if (Array.isArray(node)) for (const child of node) flattenedStrings(child, target);
}
function jsonContent(payload) {
  const sections = Array.isArray(payload.q) ? payload.q : [];
  const body = sections.filter(s =>
    Array.isArray(s) &&
    !/^(referencias|resumo|resumo-prova|mapa-mental|sumario|capa)$/i.test(String(s[0] ?? ""))
  );
  const pieces = [];
  for (const s of body) flattenedStrings(s[2] ?? [], pieces);
  return pieces.join(" ");
}
if (!fs.existsSync(base)) {
  console.error("Diretório apostilas/ não localizado. Execute na raiz do repositório.");
  process.exit(2);
}
const entries = fs.readdirSync(base, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name).sort();

const report = entries.map(slug => {
  const folder = path.join(base, slug);
  const jsonFile = path.join(folder, "content.json");
  const htmlFile = path.join(folder, "index.html");
  try {
    let content, source, note = "";
    if (fs.existsSync(jsonFile)) {
      content = jsonContent(JSON.parse(fs.readFileSync(jsonFile, "utf8")));
      source = "content.json";
    } else if (fs.existsSync(htmlFile)) {
      const obj = articleContent(fs.readFileSync(htmlFile, "utf8"));
      content = obj.source;
      source = "index.html";
      if (!obj.foundArticle) note = "HTML fora do renderer padrão: revisar contagem";
    } else return { slug, chars: 0, deficit: MIN, status: "sem arquivo", source: "-", note: "" };
    const text = visible(content);
    const chars = [...text].length;
    return { slug, source, chars, deficit: Math.max(0, MIN - chars),
      status: chars >= MIN ? "passou na triagem de extensão" : "precisa expandir",
      note };
  } catch (err) {
    return { slug, source: "erro", chars: 0, deficit: MIN, status: "erro de leitura",
      note: String(err?.message ?? err) };
  }
});
const missing = report.filter(r => r.status !== "passou na triagem de extensão");
if (opt.has("--json")) {
  console.log(JSON.stringify({ minimum: MIN, total: report.length, missing: missing.length,
    notice: "Somente triagem; não atesta qualidade clínica, autoria, referências nem imagens.", report }, null, 2));
} else {
  console.log("Triagem editorial 60K — apenas texto do artigo (não é certificação clínica)");
  console.log("Caderno | caracteres | faltam | situação");
  console.log("---|---:|---:|---");
  report.forEach(r => console.log(
    r.slug + " | " + r.chars + " | " + r.deficit + " | " + r.status + (r.note ? " (" + r.note + ")" : "")
  ));
  console.log("TOTAL: " + report.length + "; abaixo do limite ou erro: " + missing.length);
}
if (opt.has("--fail") && missing.length) process.exitCode = 1;
