import { parseExistingSections } from './builders/extract-drafts.mjs';
import { secPlanExpansao } from './builders/plan-expansao.mjs';
import { secPlanExpansao2 } from './builders/plan-expansao2.mjs';
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'planejamento-reprodutivo-contracepcao';
const baseSections = parseExistingSections(slug);

// Integrar expansão antes das referências
const finalSections = [];
for (const s of baseSections) {
  if (s.id === 'referencias') {
    finalSections.push(...secPlanExpansao2);
    finalSections.push(...secPlanExpansao);
  }
  finalSections.push(s);
}

const bookData = {
  slug,
  title: 'Planejamento Reprodutivo e Contracepção',
  subtitle: 'Critérios de elegibilidade da OMS/FEBRASGO 2026 · LARC · emergência · combinados e segurança cardiovascular',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Planejamento Familiar e Endocrinologia Ginecológica',
  sections: finalSections,
  references: [
    { title: 'World Health Organization (WHO) — Medical eligibility criteria for contraceptive use. 6th ed., 2025/2026', url: 'https://www.who.int' },
    { title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Anticoncepção e Planejamento Reprodutivo 2026', url: 'https://www.febrasgo.org.br' },
    { title: 'Ministério da Saúde do Brasil — Portarias SECTICS/MS nº 47 e 48/2025 e Nota Técnica Conjunta nº 198/2026 (Implante de Etonogestrel no SUS)', url: 'https://www.gov.br/saude' },
    { title: 'Brasil — Lei Federal nº 9.263/1996 alterada pela Lei nº 14.443/2022 (Esterilização Voluntária)', url: 'https://www.planalto.gov.br' }
  ]
};

saveBook(slug, bookData);

// Auditoria de caracteres
const indexPath = path.join('apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const chars = countUsefulChars(html);
console.log(`[SUCESSO] ${slug} compilado via saveBook: ${chars} caracteres úteis.`);
