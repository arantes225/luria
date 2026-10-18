// scripts/build-bloco-05-107-main.mjs
import { sec1, sec2, sec3, sec4 } from './build-bloco-05-107-part1.mjs';
import { secBiologiaTelas } from './build-bloco-05-107-extra.mjs';
import { sec5, sec6, sec7, sec8, bookReferencesHernias } from './build-bloco-05-107-part2.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'hernias-da-parede-abdominal',
  title: 'Hérnias da Parede Abdominal',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Parede Abdominal',
  description: 'Tratado completo de Hérnias da Parede Abdominal para concursos de Residência Médica e ENAMED: anatomia cirúrgica da região inguinocrural (canal inguinal com suas 4 paredes e 2 anéis, trígono de Hesselbach, trato iliopúbico de Thompson, orifício miopectíneo de Fruchaud e canal femoral); diagnóstico diferencial clínico e semiológico de hérnias indiretas, diretas e femorais; classificação de Nyhus (tipos I a IV) e classificação da European Hernia Society (EHS); hérnias da parede anterior (umbilicais em crianças com conduta expectante até 4-5 anos vs adultos, hérnia epigástrica, hérnia incisional e fatores de risco com técnica de Rives-Stoppa, hérnia de Spigel na linha semilunar); hérnias raras e epônimos clássicos (Richter com isquemia sem obstrução total, Littré com divertículo de Meckel, Amyand com apêndice na hérnia inguinal, De Garengeot com apêndice na hérnia femoral, hérnia obturatória com sinal de Howship-Romberg); técnicas cirúrgicas abertas livres de tensão (Lichtenstein como padrão-ouro aberto) e teciduais (Shouldice, Bassini, McVay) vs videolaparoscópicas (TAPP e TEP); anatomia laparoscópica das zonas de perigo (Triângulo da Morte / Doom com vasos ilíacos e Triângulo da Dor com nervos sensitivos, além da corona mortis); biologia das telas sintéticas (classificação de Amid tipo I a IV, polipropileno, gramatura e ensaio STITCH com técnica de pequenas mordidas 4:1); complicações pós-operatórias (seroma, orquite isquêmica, atrofia testicular, inguinodinia crônica e neurites); conduta cirúrgica e pré-operatória estrita no encarceramento e estrangulamento agudo (contraindicação absoluta de redução manual por taxis, avaliação de viabilidade de alça intestinal e reparo em campo contaminado); casos clínicos estruturados e 6 questões comentadas alternativa por alternativa.',
  sections: [
    sec1,
    sec2,
    sec3,
    secBiologiaTelas,
    sec4,
    sec5,
    sec6,
    sec7,
    sec8
  ],
  references: bookReferencesHernias
};

const usefulCount = saveBook(book);
console.log(`[AULA 107 DONE] Total caracteres didáticos úteis: ${usefulCount}`);
