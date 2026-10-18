import { secPuerperio1 } from './builders/puerperio-part1.mjs';
import { secPuerperio2 } from './builders/puerperio-part2.mjs';
import { secPuerperio3 } from './builders/puerperio-part3.mjs';
import { secPuerperio4 } from './builders/puerperio-part4.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'puerperio-normal-e-patologico',
  title: 'Puerpério Normal e Patológico',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Obstetrícia Fisiológica e Cirúrgica',
  description: 'Tratado completo de Puerpério Normal e Patológico: fisiologia e cronologia estrita do puerpério (imediato do 1º ao 10º dia com período de Greenberg, tardio do 11º ao 45º dia com retorno intrapélvico do útero, e remoto além do 45º dia condicionado ao aleitamento materno e fertilidade); dinâmica e histologia da involução uterina anatômica (autofagia e proteólise miometrial, regeneração esfoliativa do leito placentário em 6 a 8 semanas sem fibrose retrátil); características e evolução cromológica dos lóquios (lochia rubra, lochia serosa e lochia alba, lochia foetida e loquiometria); neuroendocrinologia da lactogênese (mamogênese, lactogênese I, apojadura na fase II, galactopoiese na fase III com fator inibidor da lactação FIL, reflexos de prolactina e ocitocina); anatomia e biomecânica da pega correta versus incorreta; fisiopatologia e manejo do ingurgitamento mamário fisiológico versus patológico obstrutivo (manobra de Cotterman, amaciamento areolar, massagens concêntricas e compressas frias locais pós-mamada); prevenção e tratamento de fissuras mamilares; mastite puerperal aguda (etiopatogenia pelo Staphylococcus aureus, quadro clínico de eritema segmentar em placa, febre alta e calafrios, antibioticoterapia ambulatorial com cefalexina ou amoxicilina-clavulanato, e manutenção incondicional do aleitamento materno); abscesso mamário (febre persistente após 48-72h, palpação com flutuação, diagnóstico ecográfico padrão-ouro por USG e tratamento por aspiração percutânea por agulha ou drenagem cirúrgica aberta com preservação da amamentação contralateral); alterações psíquicas puerperais (diagnóstico diferencial criterioso entre Blues puerperal/disforia pós-parto autolimitada em até 14 dias com afeto preservado, Depressão pós-parto insidiosa entre a 4ª e 6ª semanas rastreada pela Escala de Edimburgo EPDS e tratada com Sertralina e psicoterapia, e Psicose puerperal como emergência médica caracterizada por delírios com o bebê, risco agudo de infanticídio e suicídio, exigindo internação psiquiátrica obrigatória, separação física protetiva do neonato, antipsicóticos/ECT e cabergolina para ablação da lactação); repercussões sistêmicas e laboratoriais (leucocitose puerperal fisiológica, débito cardíaco, retenção urinária e poliúria); planejamento reprodutivo e critérios de elegibilidade da OMS para contracepção puerperal; casos clínicos detalhados e questões comentadas para o ENAMED e residência médica.',
  sections: [
    ...secPuerperio1,
    ...secPuerperio2,
    ...secPuerperio3,
    ...secPuerperio4
  ],
  references: [
    {
      title: 'Ministério da Saúde do Brasil — Atenção Qualificada ao Puerpério e Manejo das Complicações Pós-Parto (Linha de Cuidado na Saúde da Mulher)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher'
    },
    {
      title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Assistência ao Puerpério e Aleitamento Materno',
      url: 'https://www.febrasgo.org.br'
    },
    {
      title: 'World Health Organization (WHO) — WHO recommendations on maternal and newborn care for a positive postnatal experience',
      url: 'https://www.who.int/publications/i/item/9789240045989'
    },
    {
      title: 'American College of Obstetricians and Gynecologists (ACOG) — Optimizing Postpartum Care (Committee Opinion No. 736)',
      url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care'
    },
    {
      title: 'Academy of Breastfeeding Medicine (ABM) — Clinical Protocol #4: Mastitis Spectrum, Revised 2022',
      url: 'https://www.bfmed.org/protocols'
    }
  ]
};

const chars = saveBook(book);
console.log(`[SUCESSO] ${book.slug} construído com ${chars} caracteres úteis.`);
