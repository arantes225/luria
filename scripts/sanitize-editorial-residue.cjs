const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const booksDir = path.join(root, 'apostilas');

const dropText = /<strong>status de produção|<strong>pendências antes da certificação|rascunho editorial|não criar html\/index|questões rastreáveis às seções, mas exame independente não realizado|<strong>expansão editorial|bloqueio de certificação|selecionar e aprovar imagens pelo admin|benchmark do drive|aprovação editorial antes de publicar/i;
const dropSection = /curadoria|auditoria|controle-de-qualidade-e-pendencias|matriz.*auditoria/i;
const renameHeading = /referências.*(?:pendências|estado do rascunho|estado editorial|advertências editoriais)/i;

function cleanJsonValue(value) {
  if (typeof value === 'string') return dropText.test(value) ? null : value;
  if (Array.isArray(value)) return value.map(cleanJsonValue).filter((item) => item !== null);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, child] of Object.entries(value)) next[key] = cleanJsonValue(child);
    return next;
  }
  return value;
}

let jsonChanged = 0;
let htmlChanged = 0;
for (const slug of fs.readdirSync(booksDir)) {
  const dir = path.join(booksDir, slug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;

  const jsonPath = path.join(dir, 'content.json');
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const originalRaw = fs.readFileSync(jsonPath, 'utf8');
    const original = JSON.stringify(data);
    if (Array.isArray(data.q)) {
      data.q = data.q
        .filter((section) => !dropSection.test(String(section?.[0] || '')))
        .map((section) => {
          const copy = cleanJsonValue(section);
          if (Array.isArray(copy?.[2])) {
            copy[2] = copy[2].map((item) => {
              if (!Array.isArray(item) || typeof item[1] !== 'string') return item;
              if (renameHeading.test(item[1])) item[1] = 'Referências e limites de aplicação';
              return item;
            });
          }
          return copy;
        });
      const valid = new Set(data.q.map((section) => section[0]));
      if (Array.isArray(data.o)) data.o = data.o.filter((entry) => valid.has(entry[0]));
    }
    const next = JSON.stringify(data);
    if (next !== original) {
      const formatted = originalRaw.includes('\n') ? JSON.stringify(data, null, 2) : JSON.stringify(data);
      fs.writeFileSync(jsonPath, `${formatted}\n`);
      jsonChanged += 1;
    }
  }

  const htmlPath = path.join(dir, 'index.html');
  if (!fs.existsSync(htmlPath)) continue;
  const originalHtml = fs.readFileSync(htmlPath, 'utf8');
  let html = originalHtml;
  html = html.replace(/<div\s+class="editorial-warning">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<section[^>]*class="[^"]*editorial-appendix[^"]*"[^>]*>[\s\S]*?<\/section>/gi, '');
  html = html.replace(/<div[^>]*hidden[^>]*data-traube-image-curation[^>]*>[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div\s+class="book-feedback">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<h3>\s*13\.\s*Curadoria visual[^<]*<\/h3>\s*<p>[\s\S]*?<\/p>/gi, '');
  html = html.replace(/<p>\s*<strong>Auditoria editorial:<\/strong>[\s\S]*?<\/p>/gi, '');
  html = html.replace(/<div\s+class="book-callout">\s*<strong>Ponto visual para revisão editorial:[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div\s+class="callout">\s*<strong>Curadoria de imagens:[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<p>\s*<small>\s*<strong>Controle editorial:<\/strong>[\s\S]*?<\/small>\s*<\/p>/gi, '');
  html = html.replace(/\s*·\s*REVISÃO EDITORIAL(?:\s+[^<·]+)?/gi, '');
  html = html.replace(/\s*\(revisão editorial\)/gi, '');
  html = html.replace(/\.editorial-appendix\{[^}]*\}/gi, '');
  html = html.replace(/<span>\s*Não homologado\s*\/\s*não publicado\s*<\/span>/gi, '');
  html = html.replace(/<span>\s*Revisão editorial 2026\s*<\/span>/gi, '');
  html = html.replace(/<a[^>]*>\s*Cap\.\s*24\s*—\s*Matriz de cobertura, curadoria visual, referências e auditoria\s*<\/a>/gi, '');
  html = html.replace(/<a[^>]*href="#cap-22-auditoria-editorial-cobertura-estado-d"[^>]*>[\s\S]*?<\/a>/gi, '');
  if (html !== originalHtml) {
    fs.writeFileSync(htmlPath, html);
    htmlChanged += 1;
  }
}

console.log(JSON.stringify({ jsonChanged, htmlChanged }));
