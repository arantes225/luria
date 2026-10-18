import { secNefro1 } from './builders/nefro-part1.mjs';
import { secNefroExpansao } from './builders/nefro-part5.mjs';
import { secNefro2 } from './builders/nefro-part2.mjs';
import { secNefro3 } from './builders/nefro-part3.mjs';
import { secNefroCasosQuestoes } from './builders/nefro-part4.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'sindrome-nefrotica-e-sindrome-nefritica',
  title: 'Síndrome Nefrótica e Síndrome Nefrítica na Infância',
  area: 'Pediatria',
  materia: 'Nefrologia Pediátrica',
  description: 'Tratado completo de Síndrome Nefrótica e Síndrome Nefrítica na infância: anatomia, ultraestrutura e biofísica da Barreira de Filtração Glomerular (endotélio fenestrado com glicocálice aniônico, membrana basal glomerular com colágeno tipo IV e laminina-521, podócitos com pedicelos interdigitados e diafragma de fenda composto por nefrina NPHS1, podocina NPHS2 e sinaptopodina; permseletividade por tamanho para moléculas > 4,2 nm e por carga elétrica aniônica com repulsão eletrostática da albumina); biologia molecular do podócito e conceito fisiopatológico de podocitopatia (desorganização da F-actina e apagamento difuso dos pedicelos); Síndrome Nefrótica na infância: tétrade clássica (proteinúria maciça > 50 mg/kg/dia ou relação UPr/Cr >= 2,0 mg/mg, hipoalbuminemia severa < 2,5 g/dL, edema periférico generalizado/anasarca por underfill hipo-oncótico com hiperaldosteronismo secundário ou overfill por clivagem de canais ENaC, e dislipidemia aterogênica secundária com hipercolesterolemia > 300 mg/dL por hiperestimulação hepática e perda de LCAT/LPL); etiologia primária predominante por Doença por Lesão Mínima (DLM em 85-90% das crianças de 1 a 7 anos, microscopia óptica normal, imunofluorescência negativa e fusão podocitária à microscopia eletrônica), Glomeruloesclerose Segmentar e Focal (GEFS) e formas congênitas genéticas (mutações de NPHS1 na nefrose finlandesa, NPHS2 na podocina, WT1 nas síndromes de Denys-Drash e Frasier); complicações infecciosas com perda de IgG e fatores do complemento Fator B e D predispondo à Peritonite Bacteriana Espontânea (PBE por Streptococcus pneumoniae) tratada com Ceftriaxona; complicações tromboembólicas por perda de antitrombina III e aumento de fibrinogênio; protocolo de corticoterapia padrão (Prednisona oral 60 mg/m²/dia ou 2 mg/kg/dia por 4 a 6 semanas diárias, seguida de 40 mg/m² em dias alternados por mais 4 a 6 semanas e desmame regressivo sem biópsia prévia); definições de cortico-sensibilidade, dependência e resistência (SNCR indicando biópsia renal obrigatória); manejo do edema grave e indicações de albumina a 20% com furosemida; Síndrome Nefrítica na infância: tríade clássica (hematúria glomerular dismórfica com cilindros hemáticos, hipertensão arterial sistêmica aguda hipervolêmica e edema periférico oligúrico); Glomerulonefrite Difusa Aguda Pós-Estreptocócica (GNDA): infecção prévia de orofaringe (latência 1 a 3 semanas) ou cutânea/impetigo (latência 2 a 6 semanas) por cepas nefritogênicas de Streptococcus pyogenes (GAS) produtoras de antígenos nefritogênicos SPEB e NAPlr; comprovação laboratorial com ASLO (orofaringe) e Anti-DNAse B (impetigo); a regra de ouro do complemento na GNDA (queda seletiva transitória de C3 com C4 normal na via alternativa e normalização obrigatória do C3 em até 8 semanas); manejo clínico com restrição hidrossalina estrita e diuréticos de alça (furosemida), emergências hipertensivas com nitroprussiato de sódio na encefalopatia e EAP, proscrição de IECA/BRA na fase aguda e uso de penicilina benzatina para erradicação da transmissão comunitária; indicações formais de biópsia renal imediatas e tardias (C3 persistentemente baixo além de 8 semanas); diagnóstico diferencial criterioso com Nefropatia por IgA (Doença de Berger com hematúria sincrônica e C3 normal), Púrpura de Henoch-Schönlein e GNMP; múltiplos casos clínicos estruturados e questões comentadas para o ENAMED e residência médica.',
  sections: [
    secNefro1[0],
    secNefroExpansao[0],
    secNefro1[1],
    secNefroExpansao[1],
    secNefro2[0],
    secNefro3[0],
    secNefroExpansao[2],
    secNefro3[1],
    ...secNefroCasosQuestoes
  ],
  references: [
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Nefrologia Pediátrica. Diretrizes para o Diagnóstico e Tratamento da Síndrome Nefrótica Idiopática na Criança',
      url: 'https://www.sbp.com.br/departamentos-cientificos/nefrologia/diretrizes/'
    },
    {
      title: 'Kidney Disease: Improving Global Outcomes (KDIGO) — Clinical Practice Guideline for the Management of Glomerular Diseases (Glomerulonephritis / Nephrotic Syndrome in Children)',
      url: 'https://kdigo.org/guidelines/glomerular-diseases/'
    },
    {
      title: 'Sociedade Brasileira de Nefrologia (SBN) — Diretrizes Clínicas em Glomerulopatias e Glomerulonefrite Difusa Aguda Pós-Estreptocócica',
      url: 'https://sbn.org.br'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Clinical Practice Guideline: Evaluation and Management of Well-Child Glomerular Disorders and Hematuria',
      url: 'https://www.aap.org'
    },
    {
      title: 'European Pediatric Nephrology Society (ESPN) — Management of steroid-sensitive and steroid-resistant nephrotic syndrome in children',
      url: 'https://www.espn-online.org'
    }
  ]
};

const chars = saveBook(book);
console.log(`[SUCESSO] ${book.slug} construído com ${chars} caracteres úteis.`);
