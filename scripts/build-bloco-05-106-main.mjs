// scripts/build-bloco-05-106-main.mjs
import { sec1, sec2, sec3, sec4 } from './build-bloco-05-106-part1.mjs';
import { sec5, sec6, sec7, sec8, bookReferences } from './build-bloco-05-106-part2.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'lesao-renal-aguda',
  title: 'Lesão Renal Aguda',
  area: 'Clínica Médica',
  materia: 'Nefrologia e Terapia Intensiva',
  description: 'Tratado de referência sobre Lesão Renal Aguda (LRA) para concursos de Residência Médica e ENAMED: critérios diagnósticos oficiais KDIGO 2012, AKIN e RIFLE por creatinina e débito urinário horário; fisiopatologia e etiopatogenia tripartida: azotemia pré-renal, dano renal intrínseco (NTA isquêmica e nefrotóxica, nefrite intersticial aguda imunoalérgica, GNRP, ateroembolismo e MAT) e LRA pós-renal obstrutiva; propedêutica armada com índices e frações de excreção (FeNa, FeUreia no uso de diuréticos, osmolaridade urinária, densidade, sedimentoscopia urinária e diferenciação de cilindros granulosos pardos, hialinos, hemáticos e leucocitários); novos biomarcadores precoces (NGAL, KIM-1, TIMP-2 x IGFBP7); manejo volêmico balanceado versus acidose hiperclorêmica por salina a 0,9%; riscos da sobrecarga hídrica e Teste de Estresse com Furosemida (FST); indicações formais clássicas de diálise de urgência pelo mnemônico AEIOU; ensaios clínicos sobre momento da diálise (STARRT-AKI, AKIKI); modalidades de suporte dialítico (hemodiálise intermitente, CRRT contínua e SLED); escolha de acessos vasculares; casos clínicos completos estruturados e 6 questões de residência comentadas alternativa por alternativa.',
  sections: [
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    sec7,
    sec8
  ],
  references: bookReferences
};

const usefulCount = saveBook(book);
console.log(`[AULA 106 DONE] Total caracteres didáticos úteis: ${usefulCount}`);
