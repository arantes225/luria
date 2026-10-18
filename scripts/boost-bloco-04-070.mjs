import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'vigilancia-ambiental-e-saude-do-trabalhador';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const sec1Id = 'burnout-e-transtornos-mentais-ocupacionais';
const sec1Title = 'Saúde Mental no Trabalho: Síndrome de Burnout (CID-11 QD85) e Assédio Moral';
const sec1Html = `
<h3>A Síndrome de Burnout na CID-11 (Código QD85) e o Nexo Ocupacional</h3>
<p>A Organização Mundial da Saúde (OMS), na 11ª Revisão da Classificação Estatística Internacional de Doenças e Problemas Relacionados à Saúde (CID-11, vigente desde 2022), promoveu uma evolução conceitual e diagnóstica decisiva ao categorizar a <strong>Síndrome de Burnout (Esgotamento Profissional)</strong> sob o código <strong>QD85</strong>. A CID-11 definiu formal e inequivocamente o Burnout como um <strong>fenômeno estritamente ocupacional</strong> decorrente do <em>"estresse crônico no local de trabalho que não foi gerenciado com sucesso"</em>, vedando expressamente a aplicação desse diagnóstico para descrever experiências ou dificuldades em outras esferas da vida não laborais.</p>

<p><strong>A Tríade Dimensional Fisiopatológica de Christina Maslach:</strong></p>
<ol>
  <li><strong>1. Exaustão Emocional Profunda:</strong> Sensação avassaladora de esgotamento total de energia física e recursos afetivos, cansaço crônico que não se recupera após noites de sono ou finais de semana, astenia e cefaleia tensional matinal ao antecipar a jornada de trabalho;</li>
  <li><strong>2. Despersonalização / Cinismo (Distanciamento Mental):</strong> Desenvolvimento de atitudes frias, cínicas, insensíveis, distantes e desumanizadas em relação aos usuários, clientes, pacientes ou colegas de trabalho. O profissional passa a enxergar o outro como um "fardo" ou objeto burocrático, perdendo a empatia;</li>
  <li><strong>3. Baixa Realização Profissional e Ineficácia:</strong> Sentimento crônico de incompetência, frustração com os resultados, inadequação profissional e desvalia pessoal, com perda total do significado e do propósito vocacional do trabalho.</li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Diagnóstica</th>
      <th>Síndrome de Burnout (CID-11 QD85)</th>
      <th>Episódio Depressivo Maior (CID-11 6A70)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Esfera de Desencadeamento</strong></td>
      <td><strong>Circunscrita e estritamente vinculada ao contexto ocupacional</strong> e à organização do trabalho (Schilling Grupo II).</td>
      <td>Global e pervasiva; afeta todas as esferas existenciais (família, lazer, sono, relacionamentos afetivos).</td>
    </tr>
    <tr>
      <td><strong>Anedonia e Humor Depressivo</strong></td>
      <td>O desânimo, ansiedade e cinismo manifestam-se predominantemente no trabalho; nos períodos de férias ou afastamento prologado, há alívio sintomático nítido.</td>
      <td>Tristeza persistente e anedonia universal (perda da capacidade de sentir prazer) presentes na maior parte do dia, todos os dias, independentemente do ambiente.</td>
    </tr>
    <tr>
      <td><strong>Ideação de Autoculpabilização</strong></td>
      <td>Sentimento de esgotamento com irritabilidade e revolta voltada contra a instituição, chefia ou sobrecarga laboral.</td>
      <td>Culpa mórbida internalizada excessiva, autorrecriminação global, sentimentos de ruína existencial e ideação suicida estruturada.</td>
    </tr>
  </tbody>
</table>

<h3>Assédio Moral no Trabalho: Mecanismos e Repercussões Clínicas</h3>
<p>O <strong>assédio moral organizacional ou interpessoal</strong> caracteriza-se pela exposição repetitiva, intencional e prolongada do trabalhador a situações humilhantes, vexatórias, degradantes e desestabilizadoras durante a jornada de trabalho:</p>
<ul>
  <li><strong>Modalidades Operacionais:</strong> Desqualificação pública sistemática de tarefas, imposição de isolamento físico/social de colegas, fixação de metas manifestamente inatingíveis ("gestão por injúria"), retirada proposital de instrumentos de trabalho ("ostracismo/inatividade forçada"), e controle constrangedor de idas ao sanitário com cronômetro;</li>
  <li><strong>Repercussões Médicas:</strong> Desencadeamento e cronificação de Transtorno de Ansiedade Generalizada (TAG), Transtorno do Pânico, Transtorno de Estresse Pós-Traumático (TEPT ocupacional) e abuso secundário de álcool e psicotrópicos sedativos. A abordagem médica na APS exige escuta qualificada, emissão de atestado com CID e articulação com o CEREST e Ministério Público do Trabalho.</li>
</ul>
`;

const sec2Id = 'casos-clinicos-complexos-e-questoes-adicionais';
const sec2Title = 'Casos Clínicos Aprofundados (Saturnismo e VIGIAMB) e Questões de Prova Expandidas';
const sec2Html = `
<div class="book-case">
  <h4>Caso Clínico 3: Saturnismo Ocupacional com Cólica e Mão Caída</h4>
  <p><strong>Identificação e Queixa:</strong> Homem de 37 anos, empregado há 6 anos em oficina informal de recuperação e fundição artesanal de placas de chumbo de baterias automotivas, é admitido no pronto-socorro com queixa de dor abdominal difusa em cólica de forte intensidade há 5 dias, associada a constipação intestinal intratável e náuseas. Há 3 semanas notou fraqueza progressiva na mão direita, com perda da capacidade de estender o punho e os dedos, queixando-se de que "a mão ficou pendurada e caída para frente".</p>
  <p><strong>Exame Físico e Laboratorial:</strong> Paciente descorado 2+/4+, afebril, afebril, ictérico -/4+. Abdome difusamente doloroso à palpação profunda, mas plano, flácido e sem qualquer sinal de peritonite ou defesa peritoneal. À inspeção da cavidade oral, observa-se uma linha azul-escura/enegrecida bem delimitada ao longo da borda gengival dos dentes incisivos inferiores (Linha de Burton). Exame neurológico revela paresia muscular grau 2 para extensão de punho e dedos da mão direita, compatível com paralisia pura do Nervo Radial motor, sem alteração de sensibilidade térmica ou dolorosa. Exames complementares: Hemoglobina 8,9 g/dL, VCM 82 fL, reticulócitos 3,2%, lâmina com inúmeros eritrócitos exibindo pontilhado basófilo grosseiro. Dosagem de Plumbemia (chumbo no sangue): 78 mcg/dL (valor de referência ocupacional normal: &lt; 20-30 mcg/dL).</p>
  <p><strong>Discussão e Conduta:</strong> Diagnóstico de <strong>Saturnismo Crônico Grave Ocupacional (Schilling Grupo I)</strong>: cólica saturnina, linha de Burton, anemia hemolítica com pontilhado basófilo, neuropatia radial motora ("mão caída") e plumbemia crítica. Conduta: 1. Afastamento laboral imediato e definitivo da fundição; 2. Internação hospitalar para quelação com DMSA oral (Succimer 10 mg/kg de 8/8h por 5 dias seguido de 12/12h por 14 dias); 3. <strong>Emissão obrigatória da CAT</strong>; 4. Notificação compulsória no <strong>SINAN de Intoxicação Exógena por Agente Químico</strong>; 5. Acionamento da Vigilância Sanitária e CEREST para interdição sanitária da oficina clandestina.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 4: Vigilância em Saúde Ambiental frente a Contaminação Hídrica Pós-Inundação</h4>
  <p><strong>Cenário Sanitário:</strong> Após severas enchentes fluviais em município ribeirinho, a equipe da Estratégia Saúde da Família e do VIGIAGUA detecta aumento expressivo de atendimentos por febre aguda, mialgia intensa com predomínio nas panturrilhas e sufusão conjuntival em adultos que participaram do resgate de pertences nas águas de transbordamento, associado ao rompimento da rede pública de distribuição de água potável.</p>
  <p><strong>Condutas de VIGIAMB e Epidemiologia:</strong></p>
  <ol>
    <li><strong>Alerta Epidemiológico de Leptospirose:</strong> Suspeita de leptospirose em fase septicêmica primária. Orientação para início imediato de <strong>Doxiciclina oral 100 mg 12/12h por 7 dias</strong> (ou Amoxicilina em gestantes e crianças) nos casos leves, ou <strong>Ceftriaxona venosa / Penicilina G Cristalina</strong> nos casos com icterícia rubínica e insuficiência renal (Síndrome de Weil);</li>
    <li><strong>Intervenção do VIGIAGUA:</strong> Restauração da rede de água com hipercloração de choque (alvo de cloro residual livre &gt; 1,0 a 2,0 mg/L nos pontos de consumo) e distribuição emergencial de frascos de Hipoclorito de Sódio a 2,5% (orientação: 2 gotas por litro de água para consumo, aguardando 30 minutos antes da ingestão);</li>
    <li><strong>VIGIDESASTRES:</strong> Monitoramento de abrigos temporários com saneamento móvel e quimioprofilaxia com Doxiciclina restrita a socorristas e bombeiros com exposição de alto risco prolongada.</li>
  </ol>
</div>

<h3>Bateria de Questões Comentadas com Distratores Exaustivos</h3>

<h4>Questão 3: UNICAMP — Perda Auditiva Ocupacional (PAIR)</h4>
<p><strong>Enunciado:</strong> Um metalúrgico de 42 anos realiza exame periódico de saúde. A audiometria tonal demonstra limiares auditivos normais em 500, 1.000 e 2.000 Hz em ambos os ouvidos, com queda sensorioneural simétrica em 4.000 Hz atingindo 45 dB, com recuperação para 25 dB em 8.000 Hz. O paciente trabalha há 12 anos em setor com nível de pressão sonora de 92 dB(A). Sobre o caso, assinale a afirmativa correta:</p>
<p>A) A perda auditiva apresentada pelo paciente é de natureza condutiva, sendo corrigível por intervenção microcirúrgica na cadeia tímpano-ossicular.<br>
B) O traçado audiométrico confirma PAIR; cessada a exposição ao ruído ocupacional desprotegido, a perda auditiva apresentada pelo paciente tende a estabilizar e não mais progredir.<br>
C) A assimetria do traçado audiométrico é o achado clássico da PAIR, indicando que o ouvido mais próximo da máquina sofreu lesão exclusiva.<br>
D) O paciente deve ser imediatamente submetido a corticoterapia oral em altas doses para regeneração das células ciliadas do órgão de Corti lesadas.<br>
E) A alteração é irrelevante para a saúde do trabalhador, não havendo indicação de emissão de CAT por se tratar de achado subliminar.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>A está incorreta:</strong> A PAIR é estritamente <em>sensório-neural</em> (coclear / sensorial) por lesão irreversível das células ciliadas externas e internas do órgão de Corti, sem qualquer componente de perda de condução mecânica tímpano-ossicular.<br>
• <strong>B está CORRETA:</strong> A característica mais consagrada da PAIR é que, sendo de etiologia exclusivamente sonora e cessado o fator causal agressivo no ambiente laboral, <strong>a lesão NÃO é progressiva</strong>. Os limiares estabelecidos permanecem estáveis ao longo do tempo (salvo o declínio fisiológico da senescência auditiva / presbiacusia após os 60 anos).<br>
• <strong>C está incorreta:</strong> A PAIR ocupacional típica é tipicamente <strong>bilateral e simétrica</strong>.<br>
• <strong>D está incorreta:</strong> Não há evidência clínica ou farmacológica de benefício de corticoides ou fármacos para regenerar células ciliadas na PAIR crônica.<br>
• <strong>E está incorreta:</strong> A detecção de PAIR exige notificação compulsória no SINAN e emissão formal de CAT.</p>

<h4>Questão 4: ENARE — Intoxicação por Inseticidas Anticolinesterásicos</h4>
<p><strong>Enunciado:</strong> Um trabalhador rural de 26 anos é trazido ao pronto-socorro inconsciente após aplicar inseticida em lavoura de soja sem EPI. Apresenta sialorreia abundante, sudorese profusa, pupilas mióticas puntiformes bilaterais não fotorreativas, fasciculações musculares em panturrilhas e membros superiores, bradicardia (FC 44 bpm) e ausculta pulmonar com roncos e estertores crepitantes bilaterais difusos com broncorreia exteriorizada. A conduta medicamentosa prioritária para estabilização hemodinâmica e respiratória é a administração imediata de:</p>
<p>A) Flumazenil venoso em bólus repetidos.<br>
B) Naloxona venosa titulada até reversão da miose pupilar.<br>
C) Atropina venosa em doses repetidas a cada 3 a 5 minutos, titulada até a reversão da broncorreia pulmonar e melhora da ausculta respiratória.<br>
D) Pralidoxima em bólus isolado sem necessidade de atropinização prévia.<br>
E) Fisiostigmina venosa para potencializar a ação da acetilcolinesterase.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
Trata-se de uma emergência toxicológica com síndrome colinérgica aguda grave por agrotóxico organofosforado/carbamato. O paciente encontra-se em risco iminente de morte por <strong>asfixia mecânica decorrente de broncorreia maciça e broncoespasmo</strong> associada à bradicardia extrema. O fármaco salvador de vida imediato é a <strong>ATROPINA venosa</strong> (antagonista muscarínico competitivo central e periférico). A regra de ouro de ouro do manejo clínico da atropinização estabelece que a dose (1 a 3 mg IV inicial, dobrando em intervalos de 3 a 5 minutos) deve ser titulada pelo <strong>clareamento da secreção pulmonar (ausculta com pulmões limpos e secos)</strong>, e não apenas pela frequência cardíaca ou midríase. A pralidoxima (D) é adjuvante nos organofosforados, mas NUNCA substitui nem deve preceder a atropinização vigorosa imediata.</p>
`;

payload.o = payload.o.filter(item => item[0] !== sec1Id && item[0] !== sec2Id && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== sec1Id && item[0] !== sec2Id && item[0] !== 'referencias');

payload.o.push([sec1Id, sec1Title]);
payload.q.push([sec1Id, 0, htmlToBlocks(sec1Title, sec1Html)]);

payload.o.push([sec2Id, sec2Title]);
payload.q.push([sec2Id, 0, htmlToBlocks(sec2Title, sec2Html)]);

payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-trabalhador" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Constituição Federal de 1988 — Artigo 200 (Competências do SUS)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8080.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.080/1990 — Lei Orgânica da Saúde</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.213/1991 — Planos de Benefícios da Previdência Social e Acidentes de Trabalho</a>',
        '<a href="https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Protocolos de Vigilância em Saúde Ambiental (VIGIAMB / VIGIAGUA)</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 070 expandida e salva com sucesso!');
