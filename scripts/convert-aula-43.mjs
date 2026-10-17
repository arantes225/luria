import fs from 'node:fs';
import path from 'node:path';
import { saveBook } from './bloco-02-utils.mjs';

const rawMd = fs.readFileSync('apostilas/_rascunhos/lote-03/43-puericultura-prevencao-acidentes.md', 'utf8');

function mdToHtml(md) {
  let lines = md.split('\n');
  let html = [];
  let inTable = false;
  let inList = false;

  for (let line of lines) {
    line = line.trimEnd();

    // Table
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        html.push('<div class="table-responsive"><table class="table-luria">');
        const cells = line.split('|').slice(1, -1).map(c => `<th>${c.trim()}</th>`).join('');
        html.push(`<thead><tr>${cells}</tr></thead><tbody>`);
        continue;
      }
      if (line.includes('---')) continue;
      const cells = line.split('|').slice(1, -1).map(c => `<td>${c.trim()}</td>`).join('');
      html.push(`<tr>${cells}</tr>`);
      continue;
    } else if (inTable) {
      inTable = false;
      html.push('</tbody></table></div>');
    }

    // List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
        html.push('<ul>');
      }
      const item = line.trim().substring(2);
      html.push(`<li>${item}</li>`);
      continue;
    } else if (inList && !line.trim().startsWith('- ') && !line.trim().startsWith('* ')) {
      inList = false;
      html.push('</ul>');
    }

    // Headers
    if (line.startsWith('### ')) {
      html.push(`<h4>${line.substring(4).trim()}</h4>`);
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h3>${line.substring(3).trim()}</h3>`);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      continue;
    }

    // Callouts / blockquotes
    if (line.startsWith('> ')) {
      html.push(`<blockquote class="luria-callout"><p>${line.substring(2).trim()}</p></blockquote>`);
      continue;
    }

    // Paragraph
    html.push(`<p>${line.trim()}</p>`);
  }

  if (inTable) html.push('</tbody></table></div>');
  if (inList) html.push('</ul>');

  let res = html.join('\n');
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  res = res.replace(/\*(.*?)\*/g, '<em>$1</em>');
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  return res;
}

const rawSections = rawMd.split(/\n(?=## \d+\. )/g);

const sections = [];

// Intro
const headerChunk = rawSections[0];
const subChunks = headerChunk.split(/\n(?=## )/g);
let introMd = subChunks.filter(c => !c.startsWith('## Comparativo')).join('\n\n');

sections.push({
  id: 'fundamentos-e-objetivos',
  title: '1. Fundamentos e Objetivos da Consulta de Puericultura',
  body_html: mdToHtml(introMd)
});

for (let i = 1; i < rawSections.length; i++) {
  const chunk = rawSections[i];
  const firstLine = chunk.split('\n')[0].trim();
  const match = firstLine.match(/## (\d+)\.\s*(.*)/);
  if (!match) continue;
  
  const secNum = parseInt(match[1], 10);
  const secTitle = match[2];

  const slugId = secTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  sections.push({
    id: `sec-${secNum}-${slugId}`,
    title: `${secNum}. ${secTitle}`,
    body_html: mdToHtml(chunk.replace(firstLine, '').trim())
  });
}

const book43 = {
  slug: 'puericultura-e-prevencao-de-acidentes',
  title: 'Puericultura e Prevenção de Acidentes',
  area: 'Pediatria',
  materia: 'Pediatria Geral',
  description: 'Tratado completo de puericultura longitudinal, vigilância do crescimento e neurodesenvolvimento, triagens neonatais universais, sono seguro, prevenção contextual de acidentes e segurança no trânsito conforme Ministério da Saúde, Sociedade Brasileira de Pediatria e legislações vigentes.',
  sections: sections,
  references: [
    { label: 'Sociedade Brasileira de Pediatria (SBP). Tratado de Pediatria, 5ª edição. Barueri: Manole, 2022.', url: 'https://www.sbp.com.br' },
    { label: 'Ministério da Saúde. Caderneta da Criança — Passaporte da Cidadania, 6ª edição. Brasília: Ministério da Saúde, 2023.', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca' },
    { label: 'Sociedade Brasileira de Pediatria (SBP). Departamento Científico de Segurança da Criança e do Adolescente. Manual de Prevenção de Acidentes e Violências na Infância e Adolescência, 2024.', url: 'https://www.sbp.com.br/departamentos-cientificos/seguranca-da-crianca-e-do-adolescente/' },
    { label: 'Brasil. Lei nº 14.154, de 26 de maio de 2021 (Programa Nacional de Triagem Neonatal Ampliado).', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14154.htm' },
    { label: 'Conselho Nacional de Trânsito (CONTRAN). Resolução nº 991, de 14 de dezembro de 2022 (Dispositivos de retenção infantil).', url: 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes' }
  ]
};

const usefulCount = saveBook(book43);
console.log(`Aula 043 finalizada com ${usefulCount} caracteres didáticos úteis.`);
