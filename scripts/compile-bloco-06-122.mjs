// scripts/compile-bloco-06-122.mjs
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import * as p1 from './build-bloco-06-122-part1.mjs';
import * as extra from './build-bloco-06-122-extra.mjs';
import * as p2 from './build-bloco-06-122-part2.mjs';

const book = {
  slug: 'perfuracao-de-viscera-oca',
  title: 'Perfuração de Víscera Oca e Peritonite Aguda',
  subtitle: 'Tratado Avançado de Abdome Agudo Perfurativo, Sinais Radiológicos e Abordagem Cirúrgica para Concursos e Residência Médica',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Cirurgia Geral de Urgência',
  description: 'Tratado exaustivo sobre Abdome Agudo Perfurativo para provas de residência médica e ENAMED: etiopatogenia abrangente (úlcera péptica gastroduodenal perfurada, diverticulite perfurada, neoplasias perfuradas, trauma fechado e penetrante de delgado, ingestão de corpos estranhos e Síndrome de Boerhaave); perfurações iatrogênicas em colonoscopia e pós-CPRE com a Classificação de Stapfer (tipos I a IV); fisiopatologia da resposta peritoneal (peritonite química inicial por ácido clorídrico com necrose mesotelial evoluindo para peritonite bacteriana polimicrobiana por E. coli e Bacteroides fragilis e choque séptico distributivo); peritonite terciária com patógenos multirresistentes e fungos Candida; quadro clínico cardinal com dor súbita em "facada", atitude antálgica imóvel, abdome em tábua e descompressão brusca difusa (Blumberg generalizado); semiologia clássica patognomônica com o Sinal de Jobert (timpanismo pré-hepático por pneumoperitônio) e diferenciação com a Síndrome de Chilaiditi; propedêutica armada com a rotina radiológica de abdome agudo em três incidências e incidência de Hjelm-Laurell em decúbito lateral esquerdo com raios horizontais para acamados; sinais radiológicos clássicos em decúbito dorsal (Sinal de Rigler / dupla parede, sinal do ligamento falciforme, sinal da bola de futebol americano e sinal do triângulo); Tomografia Computadorizada multislice com contraste intravenoso como padrão-ouro; abordagem cirúrgica de emergência: ressuscitação volêmica cristaloide com "golden hour", antibioticoterapia venosa precoce, técnica clássica de Graham (tamponamento com patch de grande omento vascularizado para úlceras duodenais), biópsia em cunha obrigatória para úlceras gástricas para descartar adenocarcinoma, lavagem peritoneal exaustiva e cirurgia de Hartmann na diverticulite perfurada; casos clínicos estruturados e 6 questões comentadas alternativa por alternativa.',
  sections: [
    p1.sec1,
    p1.sec2,
    p1.sec3,
    extra.secIatrogeniasECPRE,
    p1.sec4,
    p2.sec5,
    extra.secTraumaEPeritoniteTerciaria,
    p2.sec6,
    p2.sec7,
    p2.sec8
  ],
  references: p2.bookReferencesPerfuracao
};

saveBook(book.slug, book);

// Verify useful chars with bloco-06-utils
import fs from 'fs';
import path from 'path';
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'apostilas', book.slug, 'content.json'), 'utf-8'));
let totalChars = 0;
for (const s of content.sections) {
  if (s.body_html) totalChars += countUsefulChars(s.body_html);
}
console.log(`Aula 122 compilada com sucesso! Caracteres úteis: ${totalChars} (Seções: ${content.sections.length})`);
