import { secSop1 } from './builders/sop-full.mjs';
import { secSopGuiaBolso } from './builders/sop-guia.mjs';
import { secSopAprofundado } from './builders/sop-expansao2.mjs';
import { secSopExpansao3 } from './builders/sop-expansao3.mjs';
import { secSopMegaBoost } from './builders/sop-mega-boost.mjs';
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'sindrome-dos-ovarios-policisticos';

const bookData = {
  slug,
  title: 'Síndrome dos Ovários Policísticos (SOP)',
  subtitle: 'Critérios de Roterdã e Consenso 2023 · fisiopatologia neuroendócrina e resistência insulínica · risco metabólico e oncologia · MEV, ACOs antiandrogênicos e indução com letrozol',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Endocrinologia Ginecológica e Reprodução Humana',
  sections: [
    ...secSop1,
    ...secSopAprofundado,
    ...secSopExpansao3,
    ...secSopMegaBoost,
    ...secSopGuiaBolso
  ],
  references: [
    { title: 'International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome (PCOS Update 2023 / ESHRE, ASRM)', url: 'https://www.monash.edu/medicine/sphpm/mchri/pcos/guideline' },
    { title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Endocrinologia Ginecológica: Síndrome dos Ovários Policísticos', url: 'https://www.febrasgo.org.br' },
    { title: 'Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) — Diretrizes Clínicas para o Diagnóstico e Tratamento da Síndrome dos Ovários Policísticos', url: 'https://www.endocrino.org.br' },
    { title: 'American College of Obstetricians and Gynecologists (ACOG) — Practice Bulletin No. 194: Polycystic Ovary Syndrome', url: 'https://www.acog.org' },
    { title: 'National Institutes of Health (NIH) / Reproductive Medicine Network — Pregnancy in Polycystic Ovary Syndrome II (PPCOS II Trial - Legro RS et al., NEJM)', url: 'https://www.nejm.org' }
  ]
};

saveBook(slug, bookData);

const indexPath = path.join('apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const chars = countUsefulChars(html);
console.log(`[SUCESSO] ${slug} compilado via saveBook: ${chars} caracteres úteis.`);
