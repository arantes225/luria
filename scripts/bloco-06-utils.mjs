// scripts/bloco-06-utils.mjs
import fs from 'fs';
import path from 'path';

export const BLOCO_06_AULAS = [
  { aula: 116, area: 'Clínica Médica', slug: 'sindromes-glomerulares', theme: 'Síndromes glomerulares' },
  { aula: 117, area: 'Cirurgia Geral', slug: 'isquemia-mesenterica', theme: 'Isquemia mesentérica' },
  { aula: 118, area: 'Pediatria', slug: 'anemias-na-infancia', theme: 'Anemias na infância' },
  { aula: 119, area: 'Ginecologia e Obstetrícia', slug: 'planejamento-reprodutivo-contracepcao', theme: 'Planejamento reprodutivo e contracepção' },
  { aula: 120, area: 'Medicina Preventiva', slug: 'medicina-baseada-em-evidencias', theme: 'Medicina baseada em evidências' },
  { aula: 121, area: 'Clínica Médica', slug: 'infeccao-do-trato-urinario-e-pielonefrite', theme: 'Infecção do trato urinário e pielonefrite' },
  { aula: 122, area: 'Cirurgia Geral', slug: 'perfuracao-de-viscera-oca', theme: 'Perfuração de víscera oca' },
  { aula: 123, area: 'Pediatria', slug: 'febre-sem-sinais-localizatorios', theme: 'Febre sem sinais localizatórios' },
  { aula: 124, area: 'Ginecologia e Obstetrícia', slug: 'sangramento-uterino-anormal', theme: 'Sangramento uterino anormal' },
  { aula: 125, area: 'Medicina Preventiva', slug: 'rastreamento-e-prevencao-quaternaria', theme: 'Rastreamento e prevenção quaternária' },
  { aula: 126, area: 'Clínica Médica', slug: 'cirrose-e-suas-complicacoes', theme: 'Cirrose e suas complicações' },
  { aula: 127, area: 'Cirurgia Geral', slug: 'hemorragia-digestiva-alta', theme: 'Hemorragia digestiva alta' },
  { aula: 128, area: 'Pediatria', slug: 'sepse-e-choque-septico-pediatrico', theme: 'Sepse e choque séptico pediátrico' },
  { aula: 129, area: 'Ginecologia e Obstetrícia', slug: 'amenorreia', theme: 'Amenorreia' },
  { aula: 130, area: 'Medicina Preventiva', slug: 'niveis-de-prevencao-e-historia-natural-da-doenca', theme: 'Níveis de prevenção e história natural da doença' },
  { aula: 131, area: 'Clínica Médica', slug: 'hepatites-virais', theme: 'Hepatites virais' },
  { aula: 132, area: 'Cirurgia Geral', slug: 'hemorragia-digestiva-baixa', theme: 'Hemorragia digestiva baixa' },
  { aula: 133, area: 'Pediatria', slug: 'meningites-e-encefalites', theme: 'Meningites e encefalites' },
  { aula: 134, area: 'Ginecologia e Obstetrícia', slug: 'sindrome-dos-ovarios-policisticos', theme: 'Síndrome dos ovários policísticos' },
  { aula: 135, area: 'Medicina Preventiva', slug: 'imunizacao-e-programa-nacional-de-imunizacoes', theme: 'Imunização e Programa Nacional de Imunizações' },
  { aula: 136, area: 'Clínica Médica', slug: 'hemorragia-digestiva', theme: 'Hemorragia digestiva' },
  { aula: 137, area: 'Cirurgia Geral', slug: 'doenca-do-refluxo-e-hernia-hiatal', theme: 'Doença do refluxo e hérnia hiatal' },
  { aula: 138, area: 'Pediatria', slug: 'crises-convulsivas-e-estado-de-mal-epileptico', theme: 'Crises convulsivas e estado de mal epiléptico' }
];

export function countUsefulChars(html) {
  if (!html) return 0;
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
    .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, ' ')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
    .replace(/<section\b[^>]*class=["'][^"']*\b(references|referencias|summary|sumario)\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, ' ')
    .replace(/<div\b[^>]*class=["'][^"']*\b(references|referencias|summary|sumario)\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

export function htmlToBlocks(html) {
  const parts = html.split(/<\/p>|<\/table>|<\/div>|<\/ul>|<\/ol>|<\/h[1-6]>/gi).filter(p => p.trim().length > 0);
  return parts.map(part => {
    const raw = part.trim();
    if (raw.startsWith('<h1') || raw.startsWith('<h2') || raw.startsWith('<h3') || raw.startsWith('<h4') || raw.startsWith('<h5') || raw.startsWith('<h6')) {
      return { type: 'heading', content: raw.replace(/<[^>]+>/g, '').trim() };
    }
    if (raw.startsWith('<table')) {
      return { type: 'table', content: raw + '</table>' };
    }
    if (raw.startsWith('<ul') || raw.startsWith('<ol')) {
      return { type: 'list', content: raw };
    }
    const cleanText = raw.replace(/<[^>]+>/g, '').trim();
    return { type: 'paragraph', content: cleanText };
  });
}

export function saveBook(slug, bookData) {
  const dir = path.join(process.cwd(), 'apostilas', slug);
  fs.mkdirSync(dir, { recursive: true });

  const contentJsonPath = path.join(dir, 'content.json');
  fs.writeFileSync(contentJsonPath, JSON.stringify(bookData, null, 2), 'utf-8');

  // Build index.html
  let sectionsHtml = '';
  if (Array.isArray(bookData.sections)) {
    sectionsHtml = bookData.sections.map(s => `
      <section id="${s.id || ''}" class="book-section">
        <h2>${s.title || ''}</h2>
        <div class="section-content">
          ${s.body_html || (Array.isArray(s.blocks) ? s.blocks.map(b => `<p>${b.content || ''}</p>`).join('\n') : '')}
        </div>
      </section>
    `).join('\n');
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bookData.title || slug} | LURIA Editorial</title>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/apostila.css">
</head>
<body class="apostila-page">
  <main class="apostila-container">
    <header class="apostila-header">
      <span class="badge-area">${bookData.area || ''}</span>
      <h1>${bookData.title || slug}</h1>
      <p class="lead">${bookData.subtitle || ''}</p>
    </header>
    <div class="apostila-body">
      ${sectionsHtml}
    </div>
  </main>
</body>
</html>`;

  const indexPath = path.join(dir, 'index.html');
  fs.writeFileSync(indexPath, html, 'utf-8');
}
