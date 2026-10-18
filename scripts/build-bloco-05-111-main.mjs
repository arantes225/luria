// scripts/build-bloco-05-111-main.mjs
import { sec1, sec2, sec3, sec4 } from './build-bloco-05-111-part1.mjs';
import { secEtiologias, secNutricao } from './build-bloco-05-111-extra.mjs';
import { sec5, sec6, sec7, sec8, bookReferencesDRC } from './build-bloco-05-111-part2.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'doenca-renal-cronica',
  title: 'Doença Renal Crônica',
  area: 'Clínica Médica',
  materia: 'Nefrologia Clínica e Metabologia',
  description: 'Tratado completo de Doença Renal Crônica (DRC) para concursos de Residência Médica e ENAMED: definição internacional KDIGO (> 3 meses de dano renal ou TFGe < 60 mL/min/1,73 m²); estadiamento bidimensional prognóstico categorias G1 a G5 e categorias de albuminúria A1 a A3; nova equação CKD-EPI 2021 sem raça e papel da cistatina C; epidemiologia no Brasil (censo SBN) e causas primárias (HAS, diabetes, glomerulopatias, DRPAD); indicações e contraindicações formais de biópsia renal percutânea; fisiopatologia da hiperfiltração adaptativa de Brenner, hipertensão intraglomerular e progressão fibrótica tubulointersticial; os 4 pilares modernos da nefroproteção: iSGLT2 (DAPA-CKD, EMPA-KIDNEY) e o "dip" de filtração, inibidores do SRAA (IECA/BRA em monoterapia), antagonistas não esteroidais do receptor mineralocorticoide (Finerenona nos estudos FIDELIO/FIGARO) e agonistas GLP-1 (Semaglutida no estudo FLOW); manejo abrangente da síndrome urêmica: Distúrbio Mineral e Ósseo da DRC (DMO-DRC: hiperparatireoidismo secundário, deficiência de calcitriol, FGF-23, quelantes de fósforo cálcicos e não cálcicos sevelamer, calcimiméticos cinacalcet), anemia da DRC (fisiopatologia da hepcidina, alvos de ferro com ferritina e saturação de transferrina, regras estritas de alfaepoetina e metas de hemoglobina), acidose metabólica crônica e bicarbonato de sódio, sobrecarga hídrica; terapia nutricional especializada e síndrome do desgaste proteico-energético (PEW); modalidades de terapia renal substitutiva (hemodiálise, diálise peritoneal e transplante renal) e preparo cirúrgico atempado do acesso vascular (fístula arteriovenosa radiocefálica de Brescia-Cimino); casos clínicos completos e 6 questões comentadas alternativa por alternativa.',
  sections: [
    sec1,
    secEtiologias,
    sec2,
    sec3,
    sec4,
    secNutricao,
    sec5,
    sec6,
    sec7,
    sec8
  ],
  references: bookReferencesDRC
};

const usefulCount = saveBook(book);
console.log(`[AULA 111 DONE] Total caracteres didáticos úteis: ${usefulCount}`);
