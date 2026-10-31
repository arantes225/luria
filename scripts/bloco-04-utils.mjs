import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const decode = value => String(value).replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (all, code) => {
  if (code[0] === '#') { const hex = code[1]?.toLowerCase() === 'x'; const n = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ' '; }
  return ({nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",mdash:'—',ndash:'–',rarr:'→',le:'≤',ge:'≥'})[code.toLowerCase()] ?? ' ';
});

export const BLOCO_04_AULAS = [
  { aula: 70, area: 'Medicina Preventiva', theme: 'Vigilância ambiental e saúde do trabalhador', slug: 'vigilancia-ambiental-e-saude-do-trabalhador' },
  { aula: 71, area: 'Clínica Médica', theme: 'Insuficiência respiratória aguda', slug: 'insuficiencia-respiratoria-aguda' },
  { aula: 72, area: 'Cirurgia Geral', theme: 'Queimaduras', slug: 'queimaduras' },
  { aula: 73, area: 'Pediatria', theme: 'Obesidade infantil', slug: 'obesidade-infantil' },
  { aula: 74, area: 'Ginecologia e Obstetrícia', theme: 'Partograma', slug: 'partograma' },
  { aula: 75, area: 'Medicina Preventiva', theme: 'Notificação compulsória de doenças e agravos', slug: 'notificacao-compulsoria-de-doencas-e-agravos' },
  { aula: 76, area: 'Clínica Médica', theme: 'Diabetes mellitus', slug: 'diabetes-mellitus' },
  { aula: 77, area: 'Cirurgia Geral', theme: 'Abdome agudo: abordagem inicial', slug: 'abdome-agudo-abordagem-inicial' },
  { aula: 78, area: 'Pediatria', theme: 'Infecções de vias aéreas superiores', slug: 'infeccoes-de-vias-aereas-superiores' },
  { aula: 79, area: 'Ginecologia e Obstetrícia', theme: 'Indução do trabalho de parto', slug: 'inducao-do-trabalho-de-parto' },
  { aula: 80, area: 'Medicina Preventiva', theme: 'Investigação de surtos e epidemias', slug: 'investigacao-de-surtos-e-epidemias' },
  { aula: 81, area: 'Clínica Médica', theme: 'Cetoacidose diabética e estado hiperosmolar', slug: 'cetoacidose-diabetica-e-estado-hiperosmolar' },
  { aula: 82, area: 'Cirurgia Geral', theme: 'Apendicite aguda', slug: 'apendicite-aguda' },
  { aula: 83, area: 'Pediatria', theme: 'Bronquiolite viral aguda', slug: 'bronquiolite-viral-aguda' },
  { aula: 84, area: 'Ginecologia e Obstetrícia', theme: 'Distocias e parto operatório', slug: 'distocias-e-parto-operatorio' },
  { aula: 85, area: 'Medicina Preventiva', theme: 'Medidas de frequência: incidência e prevalência', slug: 'medidas-de-frequencia-incidencia-e-prevalencia' },
  { aula: 86, area: 'Clínica Médica', theme: 'Distúrbios da tireoide', slug: 'disturbios-da-tireoide' },
  { aula: 87, area: 'Cirurgia Geral', theme: 'Colecistite e colelitíase', slug: 'colecistite-e-colelitiase' },
  { aula: 88, area: 'Pediatria', theme: 'Pneumonia na criança', slug: 'pneumonia-na-crianca' },
  { aula: 89, area: 'Ginecologia e Obstetrícia', theme: 'Sofrimento fetal e avaliação da vitalidade fetal', slug: 'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal' },
  { aula: 90, area: 'Medicina Preventiva', theme: 'Medidas de associação e impacto', slug: 'medidas-de-associacao-e-impacto' },
  { aula: 91, area: 'Clínica Médica', theme: 'Insuficiência adrenal e síndrome de Cushing', slug: 'insuficiencia-adrenal-e-sindrome-de-cushing' },
  { aula: 92, area: 'Cirurgia Geral', theme: 'Coledocolitíase e colangite', slug: 'coledocolitiase-e-colangite' }
];

export function extractVisibleTextFromHtml(html) {
  const articleMatch = html.match(/<article[\s\S]*?<\/article>/i);
  const raw = articleMatch ? articleMatch[0] : html;
  return decode(raw
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<section\b[^>]*id=["'](?:referencias|sumario)["'][^>]*>[\s\S]*?<\/section>/gi, ' ')
    .replace(/<section\b[^>]*class=["'][^"']*book-hero[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, ' ')
    .replace(/<section\b[^>]*id=["'](?:resumo|resumo-prova|mapa-mental)["'][^>]*>[\s\S]*?<\/section>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    )
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractVisibleTextFromJson(payload) {
  let text = '';
  const ignoredSections = new Set(['referencias', 'resumo', 'resumo-prova', 'mapa-mental', 'sumario', 'capa']);

  if (Array.isArray(payload.q)) {
    for (const section of payload.q) {
      const sectionId = section[0];
      if (ignoredSections.has(sectionId)) continue;
      const blocks = section[2] || [];
      for (const b of blocks) {
        const type = b[0];
        const val = b[1];
        if (typeof val === 'string') {
          text += ' ' + val.replace(/<[^>]+>/g, ' ');
        } else if (Array.isArray(val)) {
          if (type === 'o' || type === 'u') {
            for (const item of val) {
              if (typeof item === 'string') {
                text += ' ' + item.replace(/<[^>]+>/g, ' ');
              }
            }
          } else if (type === 't') {
            const headerRow = val;
            const dataRows = b[2] || [];
            if (Array.isArray(headerRow)) {
              for (const h of headerRow) {
                if (typeof h === 'string') text += ' ' + h.replace(/<[^>]+>/g, ' ');
              }
            }
            if (Array.isArray(dataRows)) {
              for (const row of dataRows) {
                if (Array.isArray(row)) {
                  for (const cell of row) {
                    if (typeof cell === 'string') text += ' ' + cell.replace(/<[^>]+>/g, ' ');
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return decode(text).replace(/\s+/g, ' ').trim();
}

export function countUsefulChars(slug) {
  const dir = path.join('apostilas', slug);
  if (!fs.existsSync(dir)) return { count: 0, format: 'none' };

  const jsonPath = path.join(dir, 'content.json');
  const htmlPath = path.join(dir, 'index.html');

  if (fs.existsSync(jsonPath)) {
    try {
      const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const text = extractVisibleTextFromJson(payload);
      return { count: [...text].length, format: 'content.json', text };
    } catch (e) {
      // fallback to html
    }
  }

  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const text = extractVisibleTextFromHtml(html);
    return { count: text.length, format: 'index.html', text };
  }

  return { count: 0, format: 'none' };
}

export function htmlToBlocks(title, html) {
  const blocks = [];
  blocks.push(['2', title]);

  const parts = html.split(/(<table[\s\S]*?<\/table>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<div class="book-case"[\s\S]*?<\/div>)/gi);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('<table')) {
      const theadMatch = trimmed.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>[\s\S]*?<\/thead>/i);
      const headers = [];
      if (theadMatch) {
        const thMatches = theadMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi);
        for (const th of thMatches) headers.push(th[1].trim());
      }
      const tbodyMatch = trimmed.match(/<tbody>([\s\S]*?)<\/tbody>/i);
      const rows = [];
      if (tbodyMatch) {
        const trMatches = tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
        for (const tr of trMatches) {
          const cells = [];
          const tdMatches = tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi);
          for (const td of tdMatches) cells.push(td[1].trim());
          if (cells.length) rows.push(cells);
        }
      }
      blocks.push(['t', headers, rows, 'book-table']);
    } else if (trimmed.startsWith('<ul')) {
      const items = [];
      const liMatches = trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const li of liMatches) items.push(li[1].trim());
      blocks.push(['u', items]);
    } else if (trimmed.startsWith('<ol')) {
      const items = [];
      const liMatches = trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const li of liMatches) items.push(li[1].trim());
      blocks.push(['o', items]);
    } else if (trimmed.startsWith('<div class="book-case"')) {
      const inner = trimmed.replace(/^<div[^>]*>([\s\S]*?)<\/div>$/i, '$1');
      const subParts = inner.split(/(<h[34][^>]*>[\s\S]*?<\/h[34]>|<p[^>]*>[\s\S]*?<\/p>)/gi);
      for (const sp of subParts) {
        const sTrim = sp.trim();
        if (!sTrim) continue;
        if (/^<h3/i.test(sTrim)) {
          blocks.push(['3', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<h4/i.test(sTrim)) {
          blocks.push(['4', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<p/i.test(sTrim)) {
          blocks.push(['p', sTrim.replace(/^<p[^>]*>([\s\S]*?)<\/p>$/i, '$1').trim()]);
        }
      }
    } else {
      const subParts = trimmed.split(/(<h[34][^>]*>[\s\S]*?<\/h[34]>|<p[^>]*>[\s\S]*?<\/p>)/gi);
      for (const sp of subParts) {
        const sTrim = sp.trim();
        if (!sTrim) continue;
        if (/^<h3/i.test(sTrim)) {
          blocks.push(['3', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<h4/i.test(sTrim)) {
          blocks.push(['4', sTrim.replace(/<[^>]+>/g, '').trim()]);
        } else if (/^<p/i.test(sTrim)) {
          blocks.push(['p', sTrim.replace(/^<p[^>]*>([\s\S]*?)<\/p>$/i, '$1').trim()]);
        } else {
          const cleanText = sTrim.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          if (cleanText) blocks.push(['p', sTrim]);
        }
      }
    }
  }

  return blocks;
}

export function saveBook(book, { overwrite = false } = {}) {
  const slug = book.slug || book.s;
  const title = book.title || book.t;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '') || !String(title || '').trim()) throw Error('Slug ou título inválido');
  const dir = path.join('apostilas', slug);
  const jsonPath = path.join(dir, 'content.json');
  const htmlPath = path.join(dir, 'index.html');
  if (!overwrite && (fs.existsSync(jsonPath) || fs.existsSync(htmlPath))) throw Error(slug + ': conteúdo existente; revisão explícita necessária antes de sobrescrever');
  if (!Array.isArray(book.q) || book.q.length < 7) throw Error(slug + ': ao menos sete seções são necessárias');
  const ids = book.q.map(section => section[0]);
  if (new Set(ids).size !== ids.length) throw Error(slug + ': identificadores duplicados');
  if ((book.o || []).some(item => !ids.includes(item[0]))) throw Error(slug + ': sumário sem destino');
  const source = JSON.stringify(book.q);
  if (/<\s*(?:script|style|img|iframe|object|embed|form|link|meta|base)\b|\bon[a-z]+\s*=|javascript:/i.test(source)) throw Error(slug + ': conteúdo incorporado não permitido; imagens seguem a curadoria');
  const chars = [...extractVisibleTextFromJson(book)].length;
  if (chars < 60000) throw Error(slug + ': abaixo de 60 mil na triagem de extensão; publicação não realizada');
  // Reutilizar o leitor e os recursos que já existem no projeto.
  const template = fs.readFileSync(path.join(REPO_ROOT, 'apostilas/sindromes-coronarianas-agudas/index.html'), 'utf8');
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const html = template.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(title) + ' · TRAUBE</title>')
    .replaceAll('/apostilas/sindromes-coronarianas-agudas/', '/apostilas/' + slug + '/')
    .replace('data-apostila-slug="sindromes-coronarianas-agudas"', 'data-apostila-slug="' + slug + '"');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(book, null, 2), 'utf8');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(slug + ': ' + chars + ' caracteres na triagem. Revisão clínica e aprovação de imagens são etapas independentes.');
}
