// scripts/build-bloco-05-112-main.mjs
import { sec1, sec2, sec3, sec4 } from './build-bloco-05-112-part1.mjs';
import { secMicrobiota, secHemorragia } from './build-bloco-05-112-extra.mjs';
import { sec5, sec6, sec7, sec8, bookReferencesDiverticulite } from './build-bloco-05-112-part2.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'diverticulite-aguda',
  title: 'Diverticulite Aguda',
  area: 'Cirurgia Geral',
  materia: 'Coloproctologia e Urgências Abdominais',
  description: 'Tratado completo de Diverticulite Aguda para concursos de Residência Médica e ENAMED: epidemiologia da doença diverticular dos cólons e anatomia patológica dos pseudodivertículos por pulsação na vasa recta do sigmoide (Lei de Laplace); fisiopatologia da microperfuração primária e translocação bacteriana; disbiose da microbiota colônica e Colite Segmentar Associada à Diverticulose (SCAD); hemorragia digestiva diverticular indolor no cólon direito (fisiopatologia da vasa recta, colonoscopia com hemoclipes, angio-TC, arteriografia com embolização superseletiva e colectomia subtotal); manifestações clínicas típicas em fossa ilíaca esquerda ("apendicite do lado esquerdo") e atípicas (diverticulite cecal e do cólon direito); Tomografia Computadorizada de abdome e pelve com contraste intravenoso como exame de escolha padrão-ouro; contraindicação absoluta formal de colonoscopia e enema baritado na fase aguda (risco de macroperfuração livre e peritonite fecal/química); Classificação de Hinchey modificada por TC (estágios 0, Ia, Ib, II, III e IV); a revolução no tratamento da diverticulite não complicada em pacientes imunocompetentes sem sepse (ensaios AVOD e DIABOLO: conduta ambulatorial sem antibióticos com dieta e analgesia); manejo escalonado da diverticulite complicada: antibioticoterapia intravenosa de amplo espectro, drenagem percutânea guiada por TC para abscessos intra-abdominais >= 3 a 4 cm; indicações de cirurgia de urgência (peritonite purulenta e fecal): Cirurgia de Hartmann clássica vs ressecção primária com anastomose e ileostomia de proteção; regras obrigatórias de seguimento pós-agudo com colonoscopia total após 6 a 8 semanas para exclusão de adenocarcinoma colorretal oculto; fístulas colovesicais (pneumatúria e fecalúria) e colovaginais; casos clínicos estruturados e 6 questões comentadas alternativa por alternativa.',
  sections: [
    sec1,
    secMicrobiota,
    sec2,
    sec3,
    sec4,
    secHemorragia,
    sec5,
    sec6,
    sec7,
    sec8
  ],
  references: bookReferencesDiverticulite
};

const usefulCount = saveBook(book);
console.log(`[AULA 112 DONE] Total caracteres didáticos úteis: ${usefulCount}`);
