// Bloco 5 - Aula 108: Assembler de Infecção Urinária na Criança
import { saveBook } from './bloco-05-utils.mjs';
import { sec1, sec2 } from './build-bloco-05-108-part1.mjs';
import { sec3, sec4 } from './build-bloco-05-108-part2.mjs';
import { sec5, sec6 } from './build-bloco-05-108-part3.mjs';
import { sec7 } from './build-bloco-05-108-part4.mjs';
import { sec8 } from './build-bloco-05-108-part5.mjs';
import { sec9 } from './build-bloco-05-108-part6.mjs';
import { sec10 } from './build-bloco-05-108-part7.mjs';

const book = {
  slug: 'infeccao-urinaria-na-crianca',
  title: 'Infecção Urinária na Criança',
  area: 'Pediatria',
  materia: 'Nefrologia Pediátrica e Infectologia',
  description: 'Tratado completo de Infecção do Trato Urinário (ITU) na Infância e Adolescência para concursos de residência médica e ENAMED: magnitude epidemiológica e inversão de prevalência por sexo e idade; etiopatogenia da Escherichia coli Uropatogênica (UPEC), fatores de virulência (fímbrias 1 e P, toxinas) e patógenos produtores de urease (Proteus mirabilis e cálculos de estruvita); apresentações clínicas estratificadas: o desafio da sepse e icterícia colestática neonatal, febre sem foco em lactentes e sintomas miccionais em escolares; diferenciação clínica e laboratorial rigorosa entre Cistite Baixa e Pielonefrite Aguda Alta; métodos de coleta estéril: punção suprapúbica (PSP) como padrão-ouro (>= 1 UFC/mL), cateterismo vesical aliviador (>= 50.000 UFC/mL), jato médio espontâneo (>= 100.000 UFC/mL) e o saco coletor autoadesivo como exame puramente excludente com alta taxa de contaminação (> 70-85%); investigação radiológica sequencial: Ultrassonografia de rins e vias urinárias de triagem, Uretrocistografia Miccional (UCRM) para graduação do Refluxo Vesicoureteral (Graus I a V da IRSC) e Válvula de Uretra Posterior, Cintilografia Renal com DMSA estática para cicatrizes renais aos 6 meses e Cintilografia com DTPA/MAG3 dinâmica com teste de furosemida para uropatia obstrutiva; antibioticoterapia parenteral hospitalar (Ampicilina + Gentamicina no neonato, Ceftriaxona no lactente) versus oral ambulatorial (Cefuroxima, Cefalexina, Amoxicilina-Clavulanato) e a contraindicação formal da Nitrofurantoína na pielonefrite; declínio da quimioprofilaxia universal após o estudo RIVUR e indicações atuais restritas (RVU IV/V, menores de 2 anos, ITUs febris frequentes); Disfunção do Trato Urinário Inferior (DTUI), constipação intestinal crônica e uroterapia comportamental; anomalias congênitas CAKUT: Válvula de Uretra Posterior (VUP e o sinal do keyhole), Estenose de JUP (hidronefrose com ureter normal e pieloplastia de Hynes-Anderson) e Duplicidade Pieloureteral com a Lei de Weigert-Meyer; nefropatia do refluxo crônica, hipertensão arterial sistêmica secundária mediada por renina, glomeruloesclerose por hiperfiltração (GESF) e seguimento ambulatorial a longo prazo; diagnósticos diferenciais da disúria pediátrica: vulvovaginites inespecíficas, balanopostite, uretrite química, corpos estranhos vaginais, oxiuríase e manejo da sinéquia de pequenos lábios com estrogênio tópico; casos clínicos estruturados e bateria de questões comentadas com análise aprofundada de distratores.',
  sections: [
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    sec7,
    sec8,
    sec9,
    sec10
  ],
  references: [
    {
      title: 'Sociedade Brasileira de Pediatria (SBP) — Departamento Científico de Nefrologia Pediátrica: Diagnóstico e Tratamento da Infecção do Trato Urinário em Pediatria. Documento Científico nº 12, 2023',
      url: 'https://www.sbp.com.br'
    },
    {
      title: 'American Academy of Pediatrics (AAP) — Subcommittee on Urinary Tract Infection: Reaffirmation of AAP Clinical Practice Guideline on UTI in Febrile Infants and Young Children 2 to 24 Months. Pediatrics, 2016',
      url: 'https://publications.aap.org/pediatrics'
    },
    {
      title: 'The RIVUR Trial Investigators — Antimicrobial Prophylaxis for Children with Vesicoureteral Reflux. New England Journal of Medicine, 2014',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1401811'
    },
    {
      title: 'National Institute for Health and Care Excellence (NICE) — Urinary tract infection in under 16s: diagnosis and management. Clinical Guideline [CG54], 2022',
      url: 'https://www.nice.org.uk/guidance/cg54'
    },
    {
      title: 'European Association of Urology (EAU) / ESPU — Guidelines on Paediatric Urinary Tract Infections. Arnhem, Netherlands, 2023',
      url: 'https://uroweb.org/guidelines/paediatric-urology'
    },
    {
      title: 'Nelson Textbook of Pediatrics (21st Edition) — Chapter 548: Urinary Tract Infections. Elsevier, 2020',
      url: 'https://www.elsevier.com'
    }
  ]
};

const count = saveBook(book);
console.log(`[SUCESSO] Aula 108 compilada com ${count} caracteres úteis.`);
