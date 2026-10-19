// scripts/bloco-07-builders/compile-156.mjs
import { sec1, sec2 } from './build-156-part1.mjs';
import { sec3, sec4 } from './build-156-part2.mjs';
import { sec5 } from './build-156-part3.mjs';
import { sec6, sec7 } from './build-156-part4.mjs';
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';

const sections = [sec1, sec2, sec3, sec4, sec5, sec6, sec7];

const bookData = {
  slug: 'leucemias-e-linfomas',
  title: 'Leucemias e Linfomas',
  subtitle: 'Fisiopatologia da Hematopoiese, Leucemia Mieloide Aguda (LMA) com Bastonetes de Auer, Leucemia Promielocítica Aguda (LPA) t(15;17) com CIVD e ATRA/ATO, Leucemia Linfoide Aguda (LLA) e Santuários, Leucemia Mieloide Crônica (LMC) t(9;22) BCR-ABL e Imatinibe, Leucemia Linfoide Crônica (LLC) Rai/Binet, Linfoma de Hodgkin com Células de Reed-Sternberg CD15+/CD30+ e Linfomas Não-Hodgkin (LDGCB e Burkitt com Céu Estrelado)',
  area: 'Clínica Médica',
  materia: 'Hematologia e Oncologia Clínica',
  description: 'Tratado completo de Leucemias e Linfomas para concursos médicos e prática especializada: fundamentos da hematopoiese, Leucemia Mieloide Aguda (LMA) com mieloperoxidase e bastonetes de Auer, Leucemia Promielocítica Aguda (LPA) com translocação t(15;17) PML-RARA, coagulopatia de consumo (CIVD) e terapia direcionada com ATRA e Trióxido de Arsênico, Leucemia Linfoide Aguda (LLA) na infância e no adulto com santuários do SNC e testículo, Leucemia Mieloide Crônica (LMC) com cromossomo Filadélfia t(9;22) BCR-ABL e inibidores de tirosina-quinase, Leucemia Linfoide Crônica (LLC) com manchas de Gümprecht e estadiamentos de Rai e Binet, Linfoma de Hodgkin com células de Reed-Sternberg CD15+ e CD30+, subtipo esclerose nodular, sintomas B e Ann Arbor, e o espectro dos Linfomas Não-Hodgkin (LDGCB com R-CHOP e Linfoma de Burkitt com t(8;14) c-myc e padrão de céu estrelado), profilaxia da Síndrome de Lise Tumoral e casos clínicos com questões comentadas.',
  sections
};

console.log('--- Compilando Aula 156: leucemias-e-linfomas ---');
saveBook('leucemias-e-linfomas', bookData);

let totalChars = 0;
for (const s of sections) {
  const chars = countUsefulChars(s.body_html);
  console.log(`Seção "${s.id}": ${chars} caracteres úteis.`);
  totalChars += chars;
}
console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 156: ${totalChars}`);
