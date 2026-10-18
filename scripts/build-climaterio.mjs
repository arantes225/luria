// scripts/build-climaterio.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-07-utils.mjs';
import { secClimaterio1 } from './builders/climaterio-data-part1.mjs';
import { secClimaterio2 } from './builders/climaterio-data-part2.mjs';
import { secClimaterio3 } from './builders/climaterio-data-part3.mjs';
import { secClimaterio4 } from './builders/climaterio-data-part4.mjs';
import { secClimaterio5 } from './builders/climaterio-data-part5.mjs';
import { secClimaterio6 } from './builders/climaterio-data-part6.mjs';
import { secClimaterio7 } from './builders/climaterio-data-part7.mjs';

const slug = 'climaterio-e-menopausa';

const sections = [
  ...secClimaterio1,
  ...secClimaterio2,
  ...secClimaterio3,
  ...secClimaterio4,
  ...secClimaterio5,
  ...secClimaterio6,
  ...secClimaterio7
];

const bookData = {
  slug,
  title: 'Climatério e Menopausa',
  subtitle: 'Fisiologia da Transição Menopáusica e Critérios STRAW+10 · Diagnóstico Clínico e Síndrome Geniturinária · Terapia Hormonal e Janela de Oportunidade · Vias, Esquemas e Opções Não Hormonais',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Endocrinologia Ginecológica e Climatério',
  sections: sections,
  references: [
    { title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Climatério e Menopausa', url: 'https://www.febrasgo.org.br' },
    { title: 'The 2022 Hormone Therapy Position Statement of The North American Menopause Society (NAMS)', url: 'https://www.menopause.org' },
    { title: 'International Menopause Society (IMS) Recommendations on Women\'s Midlife Health and Menopause Hormone Therapy', url: 'https://www.imsociety.org' },
    { title: 'Stages of Reproductive Aging Workshop + 10 (STRAW+10): Addressing the Unfinished Agenda of Staging Reproductive Aging', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3580996/' },
    { title: 'Diretrizes Brasileiras de Climatério da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM)', url: 'https://www.endocrino.org.br' }
  ]
};

saveBook(slug, bookData);

// Also sync climaterio-menopausa to match if exists
const oldDir = path.join(process.cwd(), 'apostilas', 'climaterio-menopausa');
if (fs.existsSync(oldDir)) {
  saveBook('climaterio-menopausa', { ...bookData, slug: 'climaterio-menopausa' });
}

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const rawHtml = fs.readFileSync(indexPath, 'utf8');
const chars = countUsefulChars(rawHtml);
console.log(`[SUCESSO] ${slug} compilado via saveBook: ${chars} caracteres úteis.`);
