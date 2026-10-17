import fs from "node:fs";
import path from "node:path";

const MIN = 60000;
const base = path.resolve(process.cwd(), "apostilas");

const slugs = [
  "sindromes-hipertensivas-da-gestacao",
  "estrategia-saude-da-familia",
  "endocardite-infecciosa",
  "nutricao-no-paciente-cirurgico",
  "aleitamento-materno",
  "diabetes-mellitus-gestacional",
  "politica-nacional-de-atencao-basica",
  "pericardite-e-tamponamento-cardiaco",
  "cicatrizacao-de-feridas",
  "alimentacao-complementar",
  "infeccoes-gestacao-transmissao-vertical",
  "redes-de-atencao-a-saude",
  "tromboembolismo-venoso-e-embolia-pulmonar",
  "infeccao-do-sitio-cirurgico-e-antibioticoprofilaxia",
  "crescimento-e-desenvolvimento",
  "sangramento-na-primeira-metade-da-gestacao",
  "regionalizacao-hierarquizacao-e-referencia-contrarreferencia",
  "choque-circulatorio",
  "principios-de-tecnica-cirurgica",
  "puericultura-e-prevencao-de-acidentes",
  "abortamento",
  "participacao-e-controle-social-no-sus",
  "asma"
];

function removeTagBlocks(x) {
  return x
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, " ")
    .replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, " ")
    .replace(/<section\b[^>]*id=["']referencias["'][^>]*>[\s\S]*?<\/section>/gi, " ")
    .replace(/<section\b[^>]*id=["'](?:resumo|sumario|resumo-prova)["'][^>]*>[\s\S]*?<\/section>/gi, " ")
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

const rows = slugs.map((slug, idx) => {
  const num = String(idx + 24).padStart(3, "0");
  const folder = path.join(base, slug);
  const jsonFile = path.join(folder, "content.json");
  const htmlFile = path.join(folder, "index.html");
  let content = "", source = "-", note = "";
  if (fs.existsSync(jsonFile)) {
    content = jsonContent(JSON.parse(fs.readFileSync(jsonFile, "utf8")));
    source = "content.json";
  } else if (fs.existsSync(htmlFile)) {
    const obj = articleContent(fs.readFileSync(htmlFile, "utf8"));
    content = obj.source;
    source = "index.html";
    if (!obj.foundArticle) note = "HTML fora do renderer padrão";
  }
  const text = visible(content);
  const chars = [...text].length;
  const deficit = Math.max(0, MIN - chars);
  const status = chars >= MIN ? "passou na triagem de extensão" : "precisa expandir";
  return { num, slug, source, chars, deficit, status, note };
});

console.log("Nº | Slug | Formato | Caracteres úteis | Déficit 60k | Situação");
console.log("---|---|---|---:|---:|---");
rows.forEach(r => {
  console.log(`${r.num} | ${r.slug} | ${r.source} | ${r.chars} | ${r.deficit} | ${r.status}`);
});

const passCount = rows.filter(r => r.deficit === 0).length;
console.log(`\nConsolidado Bloco 2: ${passCount} / ${rows.length} acima de 60k úteis. Pendentes de expansão: ${rows.length - passCount}.`);
