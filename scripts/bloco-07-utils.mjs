// scripts/bloco-07-utils.mjs
import fs from 'fs';
import path from 'path';

export const BLOCO_07_AULAS = [
  { aula: 139, area: 'Ginecologia e Obstetrícia', slug: 'endometriose', theme: 'Endometriose' },
  { aula: 140, area: 'Medicina Preventiva', slug: 'saude-da-crianca-na-aps', theme: 'Saúde da criança na APS' },
  { aula: 141, area: 'Clínica Médica', slug: 'pancreatite-aguda', theme: 'Pancreatite aguda' },
  { aula: 142, area: 'Cirurgia Geral', slug: 'ulcera-peptica-e-complicacoes', theme: 'Úlcera péptica e complicações' },
  { aula: 143, area: 'Pediatria', slug: 'cardiopatias-congenitas', theme: 'Cardiopatias congênitas' },
  { aula: 144, area: 'Ginecologia e Obstetrícia', slug: 'climaterio-e-menopausa', theme: 'Climatério e menopausa' },
  { aula: 145, area: 'Medicina Preventiva', slug: 'saude-da-mulher-na-aps', theme: 'Saúde da mulher na APS' },
  { aula: 146, area: 'Clínica Médica', slug: 'doenca-inflamatoria-intestinal', theme: 'Doença inflamatória intestinal' },
  { aula: 147, area: 'Cirurgia Geral', slug: 'cancer-gastrico', theme: 'Câncer gástrico' },
  { aula: 148, area: 'Pediatria', slug: 'febre-reumatica', theme: 'Febre reumática' },
  { aula: 149, area: 'Ginecologia e Obstetrícia', slug: 'infeccoes-sexualmente-transmissiveis', theme: 'Infecções sexualmente transmissíveis' },
  { aula: 150, area: 'Medicina Preventiva', slug: 'saude-do-adulto-e-do-idoso-na-aps', theme: 'Saúde do adulto e do idoso na APS' },
  { aula: 151, area: 'Clínica Médica', slug: 'anemias', theme: 'Anemias' },
  { aula: 152, area: 'Cirurgia Geral', slug: 'cancer-colorretal', theme: 'Câncer colorretal' },
  { aula: 153, area: 'Pediatria', slug: 'diabetes-mellitus-tipo-1-e-cetoacidose', theme: 'Diabetes mellitus tipo 1 e cetoacidose' },
  { aula: 154, area: 'Ginecologia e Obstetrícia', slug: 'doenca-inflamatoria-pelvica', theme: 'Doença inflamatória pélvica' },
  { aula: 155, area: 'Medicina Preventiva', slug: 'saude-mental-na-atencao-primaria', theme: 'Saúde mental na Atenção Primária' },
  { aula: 156, area: 'Clínica Médica', slug: 'leucemias-e-linfomas', theme: 'Leucemias e linfomas' },
  { aula: 157, area: 'Cirurgia Geral', slug: 'doencas-anorretais', theme: 'Doenças anorretais' },
  { aula: 158, area: 'Pediatria', slug: 'doencas-exantematicas', theme: 'Doenças exantemáticas' },
  { aula: 159, area: 'Ginecologia e Obstetrícia', slug: 'rastreamento-e-lesoes-precursoras-do-cancer-do-colo-uterino', theme: 'Rastreamento e lesões precursoras do câncer do colo uterino' },
  { aula: 160, area: 'Medicina Preventiva', slug: 'abordagem-do-tabagismo-alcool-e-outras-drogas', theme: 'Abordagem do tabagismo, álcool e outras drogas' }
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

export function saveBook(slug, bookData) {
  const dir = path.join(process.cwd(), 'apostilas', slug);
  fs.mkdirSync(dir, { recursive: true });

  const contentJsonPath = path.join(dir, 'content.json');
  fs.writeFileSync(contentJsonPath, JSON.stringify(bookData, null, 2), 'utf-8');

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
