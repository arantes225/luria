import fs from 'fs';
import path from 'path';

const base = 'apostilas';
const MIN = 60000;

const BLOCK_TOPICS = [
  { num: 47, slug: 'trauma-atendimento-inicial-abcde', title: 'Trauma: Atendimento Inicial e ABCDE', area: 'Cirurgia Geral' },
  { num: 48, slug: 'imunizacoes-na-infancia', title: 'Imunizações na Infância', area: 'Pediatria' },
  { num: 49, slug: 'gestacao-ectopica', title: 'Gestação Ectópica', area: 'Ginecologia e Obstetrícia' },
  { num: 50, slug: 'financiamento-e-gestao-do-sus', title: 'Financiamento e Gestão do SUS', area: 'Medicina Preventiva' },
  { num: 51, slug: 'dpoc', title: 'Doença Pulmonar Obstrutiva Crônica (DPOC)', area: 'Clínica Médica' },
  { num: 52, slug: 'traumatismo-cranioencefalico', title: 'Traumatismo Cranioencefálico', area: 'Cirurgia Geral' },
  { num: 53, slug: 'desidratacao-e-terapia-de-reidratacao', title: 'Desidratação e Terapia de Reidratação', area: 'Pediatria' },
  { num: 54, slug: 'doenca-trofoblastica-gestacional', title: 'Doença Trofoblástica Gestacional', area: 'Ginecologia e Obstetrícia' },
  { num: 55, slug: 'vigilancia-em-saude', title: 'Vigilância em Saúde', area: 'Medicina Preventiva' },
  { num: 56, slug: 'pneumonias-adquiridas-na-comunidade', title: 'Pneumonias Adquiridas na Comunidade', area: 'Clínica Médica' },
  { num: 57, slug: 'trauma-toracico', title: 'Trauma Torácico', area: 'Cirurgia Geral' },
  { num: 58, slug: 'diarreia-aguda', title: 'Diarreia Aguda na Infância', area: 'Pediatria' },
  { num: 59, slug: 'sangramento-na-segunda-metade-da-gestacao', title: 'Sangramento na Segunda Metade da Gestação', area: 'Ginecologia e Obstetrícia' },
  { num: 60, slug: 'vigilancia-epidemiologica', title: 'Vigilância Epidemiológica', area: 'Medicina Preventiva' },
  { num: 61, slug: 'tuberculose-pulmonar', title: 'Tuberculose Pulmonar', area: 'Clínica Médica' },
  { num: 62, slug: 'trauma-abdominal', title: 'Trauma Abdominal', area: 'Cirurgia Geral' },
  { num: 63, slug: 'doenca-do-refluxo-gastroesofagico-na-infancia', title: 'Doença do Refluxo Gastroesofágico na Infância', area: 'Pediatria' },
  { num: 64, slug: 'placenta-previa-e-descolamento-prematuro-de-placenta', title: 'Placenta Prévia e Descolamento Prematuro de Placenta', area: 'Ginecologia e Obstetrícia' },
  { num: 65, slug: 'vigilancia-sanitaria', title: 'Vigilância Sanitária', area: 'Medicina Preventiva' },
  { num: 66, slug: 'derrame-pleural', title: 'Derrame Pleural', area: 'Clínica Médica' },
  { num: 67, slug: 'trauma-pelvico-e-geniturinario', title: 'Trauma Pélvico e Geniturinário', area: 'Cirurgia Geral' },
  { num: 68, slug: 'desnutricao-e-deficiencias-nutricionais', title: 'Desnutrição e Deficiências Nutricionais', area: 'Pediatria' },
  { num: 69, slug: 'assistencia-ao-parto', title: 'Trabalho de Parto e Assistência ao Parto', area: 'Ginecologia e Obstetrícia' }
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

const rows = BLOCK_TOPICS.map((topic) => {
  const num = String(topic.num).padStart(3, "0");
  const folder = path.join(base, topic.slug);
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
  const status = chars >= MIN ? "passou na triagem de extensão" : (chars === 0 ? "não iniciado" : "precisa expandir");
  return { num, slug: topic.slug, source, chars, deficit, status, note };
});

console.log("Nº | Slug | Formato | Caracteres úteis | Déficit 60k | Situação");
console.log("---|---|---|---:|---:|---");
rows.forEach(r => {
  console.log(`${r.num} | ${r.slug} | ${r.source} | ${r.chars} | ${r.deficit} | ${r.status}`);
});

const passCount = rows.filter(r => r.deficit === 0).length;
console.log(`\nConsolidado Bloco 3: ${passCount} / ${rows.length} acima de 60k úteis. Pendentes de expansão: ${rows.length - passCount}.`);
