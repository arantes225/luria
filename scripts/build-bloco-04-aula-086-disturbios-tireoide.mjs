import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'disturbios-da-tireoide',
  title: 'Distúrbios da Tireoide',
  area: 'Clínica Médica',
  materia: 'Endocrinologia e Metabologia',
  description: 'Tratado completo e aprofundado sobre Distúrbios da Tireoide para concursos médicos e residência. Abrange fisiologia do eixo hipotálamo-hipófise-tireoide (TRH, TSH, T4L, T3, desiodases, efeito Wolff-Chaikoff e fenômeno de Jod-Basedow), diagnóstico etiológico diferencial das tireotoxicoses (Doença de Graves, bócio multinodular tóxico, adenoma tóxico e tireoidites), farmacoterapia com tionamidas (metimazol vs propiltiouracil e riscos de agranulocitose e hepatotoxicidade), protocolo de resgate escalonado da Tempestade Tireoidiana em 4 etapas, hipotireoidismo primário (Hashimoto) e subclínico com indicações formais de tratamento, reposição de Levotiroxina em populações especiais e manejo emergencial do Coma Mixedematoso com corticoterapia empírica mandatória, enriquecido por casos clínicos e questões comentadas com todos os distratores.',
  sections: [
    {
      id: 'fisiologia-eixo-tireoidiano-desiodases-efeitos-iodo',
      title: '1. Fisiologia do Eixo Hipotálamo-Hipófise-Tireoide e Mecanismos de Autorregulação',
      body_html: `
<h3>O Eixo Hipotálamo-Hipófise-Tireoide (TRH-TSH-Hormônios Tireoidianos)</h3>
<p>A tireoide é uma glândula bilobada localizada na região cervical anterior, responsável pela síntese, armazenamento e secreção dos hormônios iodados <strong>Tiroxina (T4 ou 3,5,3',5'-tetraidotironina)</strong> e <strong>Tri-iodotironina (T3 ou 3,5,3'-tri-iodotironina)</strong>. A homeostase tireoidiana é finamente regulada por um sistema de retroalimentação negativa (feedback negativo) que envolve o hormônio liberador de tireotrofina (TRH), sintetizado pelos neurônios do núcleo paraventricular do hipotálamo, e o hormônio estimulador da tireoide (TSH ou tireotrofina), glicoproteína produzida pelos tireotrofos da adeno-hipófise anterior.</p>
<p>O TSH liga-se a receptores acoplados à proteína G (TSHR) na membrana basolateral dos tiócitos foliculares, estimulando todas as etapas da síntese hormonal: captação ativa de iodeto pelo simporte sódio-iodeto (NIS), oxidação do iodeto e iodação dos resíduos tirosila da tireoglobulina pela enzima <strong>Tireoperoxidase (TPO)</strong>, acoplamento de monoiodotirosina (MIT) e di-iodotirosina (DIT), endocitose do coloide e proteólise da tireoglobulina com liberação de T4 e T3 na circulação sanguínea. A secreção diária glandular consiste predominantemente em <strong>T4 (cerca de 80% a 90 mcg/dia)</strong> e uma fração menor de <strong>T3 (cerca de 20% a 30 mcg/dia)</strong>.</p>

<h3>Cinética Plasmática, Ligação Proteica e o Papel das Desiodases</h3>
<p>Mais de 99,97% do T4 circulante e 99,7% do T3 circulam ligados avidamente a proteínas carreadoras plasmáticas, principalmente a <strong>Globulina Ligadora de Tiroxina (TBG)</strong>, e em menor proporção à transtirretina e à albumina. Apenas a ínfima fração livre desprovida de ligação proteica (<strong>T4 livre: 0,03%</strong> e <strong>T3 livre: 0,3%</strong>) é biologicamente ativa e capaz de transpor as membranas celulares para exercer ação nuclear ou atuar no feedback hipofisário. Alterações na concentração de TBG (elevada pelo estrogênio na gravidez, terapia de reposição hormonal e hepatites agudas; ou reduzida por androgênios, síndrome nefrótica e cirrose) modificam os níveis de T4 total sem alterar o T4 livre; por isso, a dosagem de <strong>T4 Livre (T4L)</strong> é o padrão-ouro laboratorial obrigatório.</p>
<p>O T4 funciona essencialmente como um pró-hormônio circulante estável (meia-vida de 7 dias). O verdadeiro hormônio ativo na intimidade celular é o <strong>T3</strong>, que possui afinidade pelos receptores nucleares tireoidianos (TR-alfa e TR-beta) cerca de 10 a 15 vezes maior que o T4 e meia-vida mais curta (aproximadamente 24 horas). Cerca de <strong>80% de todo o T3 circulante é produzido perifericamente nos tecidos extratireoidianos</strong> através da remoção de um átomo de iodo do anel externo do T4, reação catalisada pelas enzimas desiodases:</p>
<ul>
  <li><strong>Desiodase Tipo 1 (D1):</strong> Expressa primariamente no fígado, rins e tireoide. Catalisa a conversão periférica de T4 em T3 ativo circulante, além de degradar metabólitos inativos. É inibida por fármacos como <strong>Propiltiouracil (PTU), Propranolol em altas doses e Glicocorticoides em doses farmacológicas</strong>.</li>
  <li><strong>Desiodase Tipo 2 (D2):</strong> Expressa no sistema nervoso central, adeno-hipófise, coração, músculo esquelético e tecido adiposo marrom. Converte localmente T4 em T3 para consumo intracelular tecidual próprio e é responsável pela geração do T3 hipofisário que orquestra o feedback negativo sobre o TSH.</li>
  <li><strong>Desiodase Tipo 3 (D3):</strong> Enzima inativadora expressa na placenta, cérebro fetal e tecidos sob estresse. Remove o iodo do anel interno do T4, convertendo-o no metabólito inativo <strong>T3 Reverso (rT3)</strong>, e degrada T3 em T2 inativo.</li>
</ul>

<h3>Autorregulação Tireoidiana por Iodo: Efeito Wolff-Chaikoff vs Fenômeno de Jod-Basedow</h3>
<p>A glândula tireoide possui mecanismos intrínsecos de adaptação homeostática diante de sobrecargas agudas ou crônicas de iodo elementar exógeno (proveniente de contrastes radiológicos iodados, amiodarona ou antissépticos tópicos):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Fenômeno Fisiopatológico</th>
      <th>Mecanismo Molecular Subjacente</th>
      <th>Repercussão Clínica Típica</th>
      <th>Duração e Fenômeno de Escape</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Efeito Wolff-Chaikoff</strong></td>
      <td>A administração aguda de uma carga maciça de iodeto inorgânico inibe temporariamente a organificação do iodo mediada pela enzima <strong>Tireoperoxidase (TPO)</strong> e bloqueia a síntese e liberação dos hormônios tireoidianos.</td>
      <td><strong>Queda abrupta transitória dos hormônios tireoidianos</strong>. É a base farmacológica do uso da Solução de Lugol no preparo pré-operatório da Doença de Graves e no manejo da Crise Tireotóxica.</td>
      <td>Em indivíduos normais, ocorre o <strong>fenômeno de escape</strong> em 10 a 14 dias: a glândula dessensibiliza o simporte NIS, reduz a captação de iodeto e retoma a síntese normal. Se o escape falhar (comum na tireoidite de Hashimoto), surge <strong>hipotireoidismo induzido por iodo</strong>.</td>
    </tr>
    <tr>
      <td><strong>Fenômeno de Jod-Basedow</strong></td>
      <td>A oferta de uma sobrecarga de iodo a uma glândula tireoide que possui áreas de autonomia funcional (nódulos autônomos ou áreas hiperplásicas pré-existentes que operam sem controle do TSH, comuns em regiões de bócio endêmico carencial).</td>
      <td>A sobrecarga fornece substrato abundante para essas células autônomas sintetizarem e secretarem quantidades torrenciais de T4 e T3, deflagrando <strong>Tireotoxicose Aguda Induzida por Iodo</strong> (hipertireoidismo iatrogênico).</td>
      <td>Não há mecanismo de escape protetor. A tireotoxicose persiste enquanto durar a eliminação da carga de iodo (que no caso da amiodarona pode levar vários meses devido à sua lipossolubilidade tecidual).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'tireotoxicose-vs-hipertireoidismo-diagnostico-diferencial',
      title: '2. Tireotoxicose e Hipertireoidismo: Diagnóstico Etiológico Diferencial',
      body_html: `
<h3>Diferenciação Conceitual: Tireotoxicose versus Hipertireoidismo</h3>
<p>Embora frequentemente utilizados como sinônimos na prática coloquial, os termos possuem distinção conceitual e fisiopatológica rigorosa:</p>
<ul>
  <li><strong>Tireotoxicose:</strong> É a <strong>síndrome clínica e metabólica hipermetabólica</strong> resultante da exposição de todos os tecidos periféricos a concentrações excessivas de hormônios tireoidianos circulantes (T4L e/ou T3L aumentados), independentemente de sua fonte de origem (secreção glandular aumentada, destruição inflamatória folicular com vazamento ou ingestão exógena).</li>
  <li><strong>Hipertireoidismo:</strong> É um <strong>subtipo específico de tireotoxicose</strong> no qual a hiperfunção decorre obrigatoriamente da <strong>síntese e secreção sustentada e autônoma de novo hormônio pela própria glândula tireoide</strong> (ex: Doença de Graves, Bócio Multinodular Tóxico e Adenoma Tóxico).</li>
</ul>

<h3>Diagnóstico Etiológico Diferencial das Principais Causas</h3>
<p>Identificar a etiologia exata da tireotoxicose é imperativo, pois as causas inflamatórias destrutivas são autolimitadas e NÃO respondem a tionamidas nem a iodo radioativo:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Principal</th>
      <th>Frequência</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Quadro Clínico e Exame Físico</th>
      <th>Cintilografia de Tireoide (RAIU com 131-I)</th>
      <th>Marcadores Laboratoriais Chave</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doença de Graves</strong></td>
      <td><strong>70% a 80%</strong> (mais comum)</td>
      <td>Autoimune. Produção de autoanticorpo estimulador <strong>TRAb (anti-receptor de TSH)</strong> que se liga e ativa constitutivamente o TSHR, mimetizando a ação trófica contínua do TSH.</td>
      <td>Bócio difuso, elástico, indolor, frequentemente com <strong>sopro e frêmito vascular</strong>. Manifestações extratireoidianas patognomônicas: <strong>Oftalmopatia infiltrativa</strong> (proptose ocular, diplopia, retração palpebral) e <strong>Dermopatia infiltrativa / Mixedema pré-tibial</strong>.</td>
      <td><strong>Hipercaptação difusa e homogênea (&gt; 35% a 60% em 24h)</strong> com glândula globalmente aumentada.</td>
      <td><strong>TRAb positivo em 95% a 98%</strong>; Anti-TPO positivo em 70%; TSH suprimido (&lt; 0,01 mUI/L) e T4L/T3L elevados.</td>
    </tr>
    <tr>
      <td><strong>Bócio Multinodular Tóxico (BMT)</strong></td>
      <td>15% a 20%</td>
      <td>Mutações somáticas ativadoras do TSHR em múltiplos clones foliculares, gerando autonomia funcional independente do TSH após anos de bócio multinodular atóxico. Típico de idosos.</td>
      <td>Bócio multinodular volumoso assimétrico com múltiplos nódulos palpáveis à ectoscopia. Ausência de oftalmopatia infiltrativa e sem mixedema pré-tibial. Sintomas cardiovasculares (FA, IC de alto débito) predominam sobre queixas adrenérgicas clássicas.</td>
      <td><strong>Captação heterogênea em "mosaico"</strong>, exibindo múltiplos focos hipercaptantes ("nódulos quentes") intercalados por áreas hipocaptantes ou frias.</td>
      <td>TRAb rigorosamente negativo. TSH suprimido com elevação moderada de T4L e T3L (ou predomínio de T3-toxicose).</td>
    </tr>
    <tr>
      <td><strong>Adenoma Tóxico (Doença de Plummer)</strong></td>
      <td>3% a 5%</td>
      <td>Nódulo tireoidiano único e autônomo monoclonal hiperfuncionante por mutação ativadora do receptor de TSH ou da proteína Gs-alfa.</td>
      <td>Nódulo único palpável (geralmente &gt; 2,5 a 3,0 cm) bem delimitado em um lobo, com o restante do parênquima glandular de consistência normal ou atrófico. Sem manifestações extratireoidianas.</td>
      <td><strong>Nódulo hipercaptante único ("nódulo quente") com supressão completa e apagamento do restante da glândula tireoide</strong> por ausência de estímulo de TSH.</td>
      <td>TRAb negativo. TSH suprimido com elevação hormonal dependente do volume nodular.</td>
    </tr>
    <tr>
      <td><strong>Tireoidite Subaguda Granulomatosa (De Quervain)</strong></td>
      <td>2% a 5%</td>
      <td>Processo inflamatório destrutivo pós-viral (Coxsackie, Adenovírus, Influenza) com lise folicular transitória e vazamento passivo de coloide pré-formado para a circulação.</td>
      <td><strong>Tireoide extremamente dolorosa à palpação</strong>, com dor cervical anterior que irradia para a mandíbula e orelhas, precedida por infecção de vias aéreas superiores, febre e mal-estar geral. Bócio doloroso firme.</td>
      <td><strong>Captação de iodo praticamente nula / suprimida (&lt; 1% a 2% em 24h)</strong>, pois os folículos inflamados são incapazes de captar iodeto.</td>
      <td><strong>VHS e PCR elevadíssimos (frequentemente VHS &gt; 50 a 100 mm/h)</strong>; TRAb negativo; leucocitose discreta; tireotoxicose que dura 2 a 6 semanas seguida por fase hipotireóidea transitória.</td>
    </tr>
    <tr>
      <td><strong>Tireoidite Silenciosa / Pós-Parto</strong></td>
      <td>1% a 3%</td>
      <td>Destruição folicular autoimune indolor transitória, ocorrendo tipicamente 2 a 6 meses após o parto em mulheres com predisposição autoimune.</td>
      <td>Glândula tireoide de consistência normal ou discretamente aumentada, <strong>completamente INDOLOR</strong>. Sintomas leves de tireotoxicose seguidos de hipotireoidismo antes da recuperação eutiroidiana.</td>
      <td><strong>Captação de iodo baixa ou suprimida (&lt; 2%)</strong> durante a fase tirotóxica.</td>
      <td>Anti-TPO fortemente positivo; TRAb negativo; VHS normal ou discretamente alterado.</td>
    </tr>
    <tr>
      <td><strong>Tireotoxicose Fictícia (Exógena)</strong></td>
      <td>Rara / Iatrogênica</td>
      <td>Ingestão sub-reptícia ou acidental de doses suprafisiológicas de hormônios tireoidianos (levotiroxina exógena ou fórmulas para emagrecimento).</td>
      <td>Sintomas de tireotoxicose adrenérgica exuberante com <strong>glândula tireoide atrófica ou impalpável</strong> (ausência total de bócio).</td>
      <td><strong>Captação de iodo nula / zero (&lt; 1%)</strong> devido à supressão hipofisária profunda do TSH.</td>
      <td><strong>Tireoglobulina Sérica INDETECTÁVEL</strong> (dado laboratorial patognomônico que confirma a origem exógena do hormônio).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'tratamento-farmacologico-tionamidas-riscos',
      title: '3. Farmacoterapia do Hipertireoidismo: Tionamidas, Betabloqueadores e Efeitos Adversos Graves',
      body_html: `
<h3>Mecanismo de Ação das Tionamidas (Antitireoidianos de Síntese)</h3>
<p>As tionamidas constituem a espinha dorsal do tratamento clínico inicial do hipertireoidismo por Doença de Graves. Compreendem o <strong>Metimazol (MMI)</strong> e o <strong>Propiltiouracil (PTU)</strong>. Atuam como substratos alternativos competitivos para a enzima <strong>Tireoperoxidase (TPO)</strong>, inibindo a oxidação do iodeto, a iodação dos resíduos tirosila da tireoglobulina e a reação de acoplamento de MIT e DIT, bloqueando a síntese de novos hormônios tireoidianos. As tionamidas não afetam a liberação de hormônios já pré-formados e armazenados no coloide folicular; por isso, o eutiroidismo clínico e laboratorial só é alcançado após <strong>3 a 6 semanas de tratamento regular</strong>, à medida que os estoques foliculares de coloide são paulatinamente depletados.</p>

<h3>Comparativo Detalhado: Metimazol versus Propiltiouracil</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Comparação</th>
      <th>Metimazol (MMI) — Droga de Escolha na Maioria</th>
      <th>Propiltiouracil (PTU) — Indicações Restritas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dose Terapêutica Habitual</strong></td>
      <td>10 a 40 mg/dia administrados em <strong>dose única diária</strong> (excelente posologia e alta adesão terapêutica).</td>
      <td>300 a 600 mg/dia fracionados em <strong>3 tomadas diárias (de 8 em 8 horas)</strong> devido à meia-vida plasmática mais curta.</td>
    </tr>
    <tr>
      <td><strong>Ação Periférica Adicional</strong></td>
      <td>Não inibe a desiodase periférica. Apenas bloqueia a síntese intraglandular.</td>
      <td><strong>Inibe a enzima Desiodase Tipo 1 (D1)</strong> periférica, bloqueando a conversão de T4 em T3 em tecidos periféricos (vantagem farmacodinâmica exclusiva).</td>
    </tr>
    <tr>
      <td><strong>Indicações Formais Específicas</strong></td>
      <td><strong>Droga de escolha absoluta em todos os pacientes adultos e crianças</strong>, exceto no 1º trimestre da gestação e na tempestade tireoidiana.</td>
      <td>Restrito formalmente a três cenários clínicos específicos:
        <ol>
          <li><strong>Primeiro Trimestre da Gestação (até a 16ª semana):</strong> O metimazol associa-se a teratogênese embrionária (embriopatia por metimazol: aplasia cutis congênita, atresia de esôfago e coanas). O PTU é a droga de escolha no 1º trimestre. No 2º e 3º trimestres, deve-se trocar o PTU de volta para o Metimazol para evitar hepatotoxicidade materna.</li>
          <li><strong>Crise Tireotóxica / Tempestade Tireoidiana:</strong> Pela capacidade de bloquear rapidamente a conversão periférica de T4 em T3.</li>
          <li><strong>Reação adversa alérgica leve prévia ao metimazol.</strong></li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><strong>Hepatotoxicidade Grave</strong></td>
      <td>Rara. Quando ocorre, manifesta-se predominantemente como <strong>colestase intra-hepática reversível</strong> com icterícia e fosfatase alcalina elevada.</td>
      <td><strong>Risco de Hepatite Fulminante Necrótica com Insuficiência Hepática Aguda</strong> fatal (aviso de caixa preta do FDA). É a principal causa de transplante hepático induzido por fármacos nos EUA.</td>
    </tr>
  </tbody>
</table>

<h3>Efeitos Adversos Graves das Tionamidas e o Manejo da Agranulocitose</h3>
<p>Reações adversas menores (erupções cutâneas pruriginosas, artralgias leves e queixas gastrointestinais) ocorrem em até 5% dos pacientes e podem ser manejadas com anti-histamínicos sem necessidade mandatória de suspensão da droga. Em contrapartida, duas complicações maiores são potencialmente fatais:</p>
<ol>
  <li><strong>Agranulocitose Febril Neutropênica:</strong> Ocorre em aproximadamente 0,2% a 0,5% dos pacientes em uso de tionamidas, ocorrendo com maior frequência nos primeiros 90 dias de tratamento e em doses elevadas de metimazol (&gt; 30 mg/dia). É uma reação idiossincrática imunomediada caracterizada por destruição aguda dos precursores granulocíticos na medula óssea, culminando em <strong>Contagem Absoluta de Neutrófilos &lt; 500 células/mm³</strong>.
    <br><strong>Orientação Educacional Mandatória ao Paciente Diante da Prescrição:</strong> Todo paciente que inicia tionamida deve ser categoricamente orientado a <strong>SUSPENDER IMEDIATAMENTE O MEDICAMENTO E PROCURAR UM PRONTO-SOCORRO PARA REALIZAR HEMOGRAMA DE URGÊNCIA se apresentar FEBRE, ODINOFAGIA (DOR DE GARGANTA) OU SINTOMAS INFECCIOSOS AGUDOS</strong>. O médico assistente NUNCA deve solicitar hemogramas de rotina assintomáticos, pois a agranulocitose é súbita e não cumulativa. Se confirmada a neutropenia (&lt; 500/mm³), o paciente deve ser internado em isolamento reverso, iniciar antibioticoterapia de amplo espectro para neutropenia febril (ex: Cefepime ou Piperacilina-Tazobactam) e considerar Fator Estimulador de Colônias de Granulócitos (G-CSF / Filgrastim). <em>A droga causadora é proscrita definitivamente e a outra tionamida NUNCA deve ser tentada devido ao risco de 50% de reatividade cruzada</em>.
  </li>
  <li><strong>Hepatite Fulminante (PTU):</strong> Monitorar transaminases. Se elevação de ALT/AST &gt; 3 vezes o limite superior associada a elevação de bilirrubina, suspender o PTU permanentemente.</li>
  <li><strong>Vasculite ANCA-Positiva:</strong> Associada ao uso prolongado de PTU, cursando com glomerulonefrite crescêntica rapidamente progressiva e hemorragia alveolar.</li>
</ol>

<h3>Papel Coadjuvante dos Betabloqueadores</h3>
<p>Os betabloqueadores adrenérgicos fornecem alívio sintomático quase imediato das manifestações periféricas de hiperativação simpática (palpitações, taquicardia sinusal, tremores finos de extremidades, sudorese, agitação psicomotora e intolerância ao calor). O <strong>Propranolol (40 a 160 mg/dia fracionados em 3 a 4 tomadas)</strong> é o fármaco tradicional de escolha porque, além do bloqueio beta-1 e beta-2 adrenérgico pleno, exerce uma inibição discreta da desiodase periférica D1 em doses &gt; 160 mg/dia. Em asmáticos com broncoespasmo grave ou choque cardiogênico com disfunção sistólica descompensada, deve-se utilizar betabloqueadores cardiosseletivos em baixas doses (ex: Atenolol ou Bisoprolol) ou Bloqueadores dos Canais de Cálcio não di-hidropiridínicos (Diltiazem ou Verapamil) para controle de frequência cardíaca.</p>
`
    },
    {
      id: 'radioiodoterapia-cirurgia-doenca-graves',
      title: '4. Terapia Definitiva: Radioiodoterapia com Iodo-131 e Tireoidectomia Total',
      body_html: `
<h3>Estratégias Definitivas para a Doença de Graves</h3>
<p>O tratamento clínico inicial com tionamidas por 12 a 18 meses resulta em remissão imunológica duradoura em apenas 30% a 50% dos portadores de Doença de Graves. Quando há recidiva do hipertireoidismo após a suspensão da droga, intolerância ou efeitos colaterais graves a tionamidas, ou quando o paciente opta por uma cura definitiva imediata, duas opções ablativas definitivas estão disponíveis:</p>

<h4>1. Radioiodoterapia com Iodo-131 (131-I)</h4>
<p>Consiste na administração oral de uma dose terapêutica de Iodo-131 em cápsula ou solução líquida (habitualmente calculada entre 10 e 15 mCi). O radiofármaco é avidamente captado pelo simporte NIS dos tiócitos hiperativos e emite partículas radioativas beta de curto alcance (1 a 2 mm), promovendo necrose tecidual folicular seletiva, fibrose e ablação glandular progressiva ao longo de 6 a 12 semanas, induzindo hipotireoidismo permanente que será tratado com reposição de levotiroxina para o resto da vida.</p>
<ul>
  <li><strong>Contraindicações Absolutas:</strong> <strong>Gestação e Lactação comprovadas</strong> (o iodo radioativo atravessa a placenta e destrói irreversivelmente a tireoide fetal, provocando cretinismo congênito, além de ser excretado no leite materno); e presença ou forte suspeita de Carcinoma de Tireoide concomitante.</li>
  <li><strong>Contraindicação Relativa Crítica:</strong> <strong>Oftalmopatia de Graves Moderada a Grave Ativa</strong> (o radioiodo induz liberação maciça de antígenos tireoidianos na circulação, deflagrando uma explosão de autoanticorpos TRAb que reagem cruzadamente com receptores nos fibroblastos orbitários retro-oculares, agravando gravemente a proptose e o risco de neuropatia óptica compressiva). Na oftalmopatia leve, o radioiodo pode ser realizado se for administrada concomitantemente profilaxia com <strong>Prednisona oral (0,3 a 0,5 mg/kg/dia)</strong> iniciada no dia do tratamento e desmamada progressivamente ao longo de 6 a 8 semanas.</li>
</ul>

<h4>2. Tireoidectomia Total</h4>
<p>É o tratamento definitivo de escolha nos seguintes cenários clínicos formais:</p>
<ol>
  <li>Grandes bócios compressivos volumosos (&gt; 80 a 100 gramas) com sintomas de compressão traqueal ou esofágica (estridor respiratório, disfagia progressiva e desvio anatômico da via aérea).</li>
  <li>Presença de nódulo tireoidiano concomitante hipercapitante ou frio com citologia suspeita ou indeterminada para malignidade (Bethesda IV, V ou VI).</li>
  <li>Oftalmopatia infiltrativa de Graves ativa grave.</li>
  <li>Recusa do paciente ao radioiodo ou contraindicações a tionamidas.</li>
</ol>
<p><strong>Preparo Pré-Operatório Rigoroso:</strong> O paciente NUNCA deve ser operado em estado de tireotoxicose ativa pelo risco de deflagrar tempestade tireoidiana letal no intraoperatório. O preparo exige alcance prévio do eutiroidismo com tionamidas associadas a betabloqueadores e a administração de <strong>Solução de Lugol (5 a 7 gotas três vezes ao dia) nos últimos 10 a 14 dias antes da cirurgia</strong>. O Lugol induz o Efeito Wolff-Chaikoff agudo, inibindo a secreção hormonal e <strong>reduzindo drasticamente a vascularização e o fluxo sanguíneo glandular</strong>, diminuindo o sangramento cirúrgico.</p>
<p><strong>Complicações Cirúrgicas Maiores:</strong> (1) <strong>Hipoparatireoidismo transitório ou definitivo</strong> por lesão ou ressecção inadvertida das glândulas paratireoides, resultando em hipocalcemia sintomática (sinal de Chvostek e Trousseau, parestesias periorais e tetania); (2) <strong>Lesão do Nervo Laríngeo Recorrente</strong> unilateral (gerando rouquidão e disfonia) ou bilateral (provocando paralisia das cordas vocais em adução com obstrução aérea respiratória aguda e necessidade imediata de traqueostomia); e (3) Hematoma cervical expansivo asfixiante.</p>
`
    },
    {
      id: 'crise-tireotoxica-tempestade-tireoidiana-manejo',
      title: '5. Crise Tireotóxica (Tempestade Tireoidiana): Escore de Burch-Wartofsky e Bloqueio em 4 Etapas',
      body_html: `
<h3>Conceito, Gravidade e Fisiopatologia</h3>
<p>A Crise Tireotóxica, historicamente denominada <em>Tempestade Tireoidiana (Thyroid Storm)</em>, é a forma extrema e potencialmente fatal de descompensação da tireotoxicose, caracterizada pela exacerbação aguda de manifestações clínicas multissistêmicas com colapso hemodinâmico, térmico e neurológico. A mortalidade hospitalar em UTI varia entre 10% e 30% mesmo em centros de excelência. É desencadeada por eventos precipitantes agudos em pacientes com hipertireoidismo não tratado ou inadequadamente controlado: <strong>infecções graves (sepse, pneumonia), cirurgias de qualquer porte (especialmente tireoidectomia sem preparo prévio), parto e trabalho de parto, uso de contraste iodado radiológico, suspensão abrupta de tionamidas, cetoacidose diabética ou trauma</strong>.</p>

<h3>Critérios Diagnósticos Clínicos: O Escore de Burch-Wartofsky</h3>
<p>Não existem limiares de dosagem hormonal que diferenciem a tireotoxicose comum da crise tireotóxica (os níveis de T4L e T3L podem ser idênticos em ambas). O diagnóstico é puramente <strong>CLÍNICO</strong> e baseia-se na aplicação de pontuação padronizada pelo <strong>Escore de Burch-Wartofsky (BWPS)</strong>, que pontua disfunções em 6 domínios orgânicos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Domínio Clínico Avaliado</th>
      <th>Manifestações e Pontuação Específica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Disfunção Termorreguladora (Febre)</strong></td>
      <td>37,2 a 37,7°C: 5 pts | 37,8 a 38,2°C: 10 pts | 38,3 a 38,8°C: 15 pts | 38,9 a 39,4°C: 20 pts | 39,5 a 39,9°C: 25 pts | <strong>&ge; 40,0°C: 30 pts</strong></td>
    </tr>
    <tr>
      <td><strong>2. Efeitos no Sistema Nervoso Central</strong></td>
      <td>Ausente: 0 pts | Leve (agitação, ansiedade intensa): 10 pts | Moderada (delirium, psicose franca, confusão mental grave): 20 pts | <strong>Grave (estupor, convulsões ou coma profundo): 30 pts</strong></td>
    </tr>
    <tr>
      <td><strong>3. Disfunção Gastrointestinal-Hepática</strong></td>
      <td>Ausente: 0 pts | Moderada (diarreia aquosa profusa, náuseas, vômitos, dor abdominal em cólica): 10 pts | <strong>Grave (icterícia inexplicada franca): 20 pts</strong></td>
    </tr>
    <tr>
      <td><strong>4. Disfunção Cardiovascular (Taquicardia)</strong></td>
      <td>90 a 109 bpm: 5 pts | 110 a 119 bpm: 10 pts | 120 a 129 bpm: 15 pts | 130 a 139 bpm: 20 pts | <strong>&ge; 140 bpm: 25 pts</strong></td>
    </tr>
    <tr>
      <td><strong>5. Insuficiência Cardíaca Congestiva</strong></td>
      <td>Ausente: 0 pts | Leve (edema de pododáctilos): 5 pts | Moderada (estertores basais): 10 pts | <strong>Grave (edema agudo de pulmão franco): 15 pts</strong></td>
    </tr>
    <tr>
      <td><strong>6. Fibrilação Atrial e Fator Precipitante</strong></td>
      <td>Presença de Fibrilação Atrial nova: <strong>10 pts</strong> | Presença de Fator Desencadeador agudo identificado: <strong>10 pts</strong></td>
    </tr>
  </tbody>
</table>
<p><strong>Interpretação Numérica do Escore de Burch-Wartofsky:</strong></p>
<ul>
  <li><strong>Pontuação &lt; 25 pontos:</strong> Crise tireotóxica improvável.</li>
  <li><strong>Pontuação de 25 a 44 pontos:</strong> Crise tireotóxica iminente (iniciar medidas profiláticas agressivas).</li>
  <li><strong>Pontuação &ge; 45 pontos:</strong> <strong>CRISE TIREOTÓXICA / TEMPESTADE TIREOIDIANA ESTABELECIDA</strong> (internação imediata em UTI e início instantâneo do protocolo farmacológico escalonado).</li>
</ul>

<h3>O Protocolo de Resgate Farmacológico Escalonado em 4 Etapas Obrigatórias</h3>
<p>O tratamento da tempestade tireoidiana deve ser instituído em leito de UTI com monitorização invasiva, obedecendo a uma ordem cronológica precisa e inegociável:</p>
<ol>
  <li><strong>1ª ETAPA: Bloqueio Adrenérgico Imediato com Betabloqueador:</strong>
    <br>Administrar <strong>Propranolol intravenoso (1 a 2 mg IV lento a cada 10-15 minutos)</strong> ou por via enteral através de sonda nasogástrica em altas doses (<strong>60 a 80 mg de 4/4h a 6/6h</strong>). O propranolol controla a taquicardia, reduz a febre e, em altas doses, inibe a desiodase tipo 1 diminuindo a conversão de T4 em T3 periférica.
  </li>
  <li><strong>2ª ETAPA: Bloqueio da Síntese Hormonal com Tionamida em Altas Doses:</strong>
    <br>O <strong>Propiltiouracil (PTU) na dose de ataque de 500 a 1.000 mg por sonda nasogástrica ou retal, seguido de 200 a 250 mg de 4/4h</strong> é a droga de escolha clássica devido à sua capacidade adicional de inibir a conversão periférica de T4 em T3. Caso o PTU não esteja disponível, utilizar Metimazol em altas doses (20 a 30 mg VO de 6/6h).
  </li>
  <li><strong>3ª ETAPA: Bloqueio da Liberação Hormonal com Iodo Inorgânico (A Regra da 1 Hora):</strong>
    <br>Administrar <strong>Solução Saturada de Iodeto de Potássio (SSKI: 5 gotas VO de 6/6h)</strong> ou <strong>Solução de Lugol (10 gotas VO de 8/8h)</strong>. O iodo promove o Efeito Wolff-Chaikoff agudo, travando a liberação de T4 e T3 estocados no coloide.
    <br><strong>REGRA DE OURO CRÍTICA: O IODO DEVE SER ADMINISTRADO OBRIGATORIAMENTE PELO MENOS 1 HORA APÓS A PRIMEIRA DOSE DE TIONAMIDA (PTU)!</strong>
    <br><em>Justificativa:</em> Se o iodo inorgânico for administrado antes ou simultaneamente à tionamida, a tireoide utilizará essa sobrecarga maciça de iodo como substrato para sintetizar ainda mais hormônio tireoidiano (piorando catastroficamente a tempestade tireoidiana). A tionamida deve bloquear a enzima TPO primeiro; só então o iodo é ofertado para travar a liberação glandular.
  </li>
  <li><strong>4ª ETAPA: Bloqueio da Conversão Periférica e Suporte Adrenal com Glicocorticoide:</strong>
    <br>Administrar <strong>Hidrocortisona intravenosa na dose de 100 mg IV a cada 8 horas</strong> (ou Dexametasona 2 mg IV de 6/6h). O corticoide exerce duplo benefício: inibe potentemente a desiodase tipo 1 periférica (bloqueando a geração de T3) e trata a <strong>insuficiência adrenal relativa</strong> decorrente do hipermetabolismo extremo que consome rapidamente os estoques endógenos de cortisol.
  </li>
  <li><strong>Medidas de Suporte Críticas:</strong>
    <ul>
      <li><em>Controle da Hipertermia Maligna:</em> Resfriamento corporal ativo (mantas térmicas, compressas frias) e <strong>Dipirona ou Paracetamol</strong>. <strong>É FORMALMENTE PROIBIDO E CONTRAINDICADO O USO DE ÁCIDO ACETILSALICÍLICO (AAS) OU SALICILATOS</strong>, pois o AAS compete pelos sítios de ligação da TBG, deslocando o T4 e T3 ligados para a forma livre plasmática, elevando agudamente as concentrações de T4L e piorando a crise.</li>
      <li><em>Terapia de Resgate Refratário:</em> Plasmaférese terapêutica (para remover T4/T3 ligados e autoanticorpos) ou tireoidectomia total de urgência após estabilização clínica mínima.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'hipotireoidismo-primario-hashimoto-levotiroxina',
      title: '6. Hipotireoidismo Primário, Tireoidite de Hashimoto e Reposição com Levotiroxina',
      body_html: `
<h3>Etiopatogenia da Tireoidite de Hashimoto (Tireoidite Crônica Autoimune)</h3>
<p>O hipotireoidismo primário decorre da incapacidade intrínseca da tireoide em produzir hormônios suficientes para suprir as demandas teciduais. Em áreas suficientes em iodo como o Brasil, a <strong>Tireoidite de Hashimoto</strong> é responsável por mais de 90% de todos os casos de hipotireoidismo espontâneo no adulto, com nítido predomínio no sexo feminino (razão mulher:homem de 8:1 a 10:1) e pico de incidência entre 30 e 50 anos.</p>
<p>A fisiopatologia envolve quebra da autotolerância imunológica com infiltração linfocitária densa do estroma glandular por linfócitos T autorreativos (CD4+ Th1 e citotóxicos CD8+) e células plasmáticas que formam centros germinativos ectópicos. Ocorre destruição progressiva dos folículos tireoidianos por apoptose mediada por Fas-ligante e citotoxicidade celular dependente de anticorpos, com substituição do tecido glandular por fibrose e metaplasia das células foliculares em <strong>células oncocíticas oxifílicas volumosas e ricas em mitocôndrias (células de Hürthle ou Askanazy)</strong>. Os marcadores laboratoriais diagnósticos de autoimunidade são:</p>
<ul>
  <li><strong>Anti-TPO (Anticorpo anti-tireoperoxidase):</strong> Positivo em <strong>90% a 95% dos pacientes</strong>; é o marcador mais sensível e fidedigno de doença autoimune em atividade e preditor independente de progressão para hipotireoidismo clínico.</li>
  <li><strong>Anti-Tireoglobulina (Anti-Tg):</strong> Positivo em 60% a 80% dos casos; complementa a pesquisa, mas tem menor especificidade isolada.</li>
  <li><strong>Exame de Ultrassonografia Cervical:</strong> Evidencia parênquima glandular difusamente heterogêneo, marcadamente hipoecogênico, com ecotextura micronodular e traves fibrosas ecogênicas, com fluxo Doppler normal ou diminuído (ou fluxo aumentado inicial simulando inferno tireoidiano na fase inflamatória precoce de <em>Hashitoxicose</em>).</li>
</ul>

<h3>Manifestações Clínicas e Efeitos Metabólicos do Hipotireoidismo</h3>
<p>O déficit de hormônios tireoidianos desacelera o metabolismo basal celular global e leva ao acúmulo patológico de glicosaminoglicanos (em especial ácido hialurônico e condroitinossulfato) no tecido celular subcutâneo e espaços intersticiais, atraindo água e gerando o <strong>Mixedema Generalizado</strong> (edema duro, frio, que não deixa cacifo à compressão digital). Os principais achados clínicos incluem:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Sistema Acometido</th>
      <th>Manifestações Clínicas Clássicas</th>
      <th>Mecanismo Fisiopatológico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Metabolismo Geral</strong></td>
      <td>Intolerância ao frio, ganho ponderal leve a moderado (2 a 4 kg decorrentes exclusivamente de retenção hídrica por mixedema, e não por gordura), astenia profunda e lentificação motora e psíquica.</td>
      <td>Queda do consumo basal de oxigênio e da termogênese celular mediada por proteínas desacopladoras (UCPs).</td>
    </tr>
    <tr>
      <td><strong>Cardiovascular</strong></td>
      <td><strong>Bradicardia sinusal</strong>, bulhas cardíacas hipofonéticas, hipertensão arterial predominantemente diastólica e <strong>derrame pericárdico rico em colesterol</strong>.</td>
      <td>Diminuição da expressão de receptores beta-adrenérgicos miocárdicos e da bomba SERCA2a miocárdica, com aumento da resistência vascular periférica e redução do débito cardíaco.</td>
    </tr>
    <tr>
      <td><strong>Gastrointestinal</strong></td>
      <td><strong>Constipação intestinal crônica</strong> grave, íleo paralítico hipotireóideo e esteatose hepática metabólica.</td>
      <td>Lentificação profunda do peristaltismo e do tempo de trânsito traqueobronquial e colônico.</td>
    </tr>
    <tr>
      <td><strong>Dermatológico</strong></td>
      <td>Pele seca, espessa, áspera e descamativa ("em casca de laranja"), unhas quebradiças, <strong>queda difusa de cabelo e madarose</strong> (perda do terço distal das sobrancelhas).</td>
      <td>Atrofia das glândulas sudoríparas e sebáceas e alteração no ciclo do folículo piloso.</td>
    </tr>
    <tr>
      <td><strong>Hematológico e Metabólico</strong></td>
      <td><strong>Dislipidemia aterogênica mista com hipercolesterolemia grave (elevação expressiva do LDL-colesterol)</strong> e <strong>Anemia</strong> (normocítica normocrômica por redução da eritropoiese; ou macrocítica por frequente associação autoimune com Anemia Perniciosa / gastrite atrófica autoimune).</td>
      <td>Redução drástica do número e atividade dos receptores hepáticos de LDL (diminui a depuração de partículas LDL) e carência de B12 por doença autoimune poliglandular.</td>
    </tr>
    <tr>
      <td><strong>Ginecológico e Endócrino</strong></td>
      <td>Menorragia / hipermenorreia inicial, infertilidade, anovulação e <strong>Galactorreia com Hiperprolactinemia</strong>.</td>
      <td>O TRH hipotalâmico cronicamente aumentado estimula diretamente os lactotrofos adeno-hipofisários a produzirem Prolactina em excesso.</td>
    </tr>
  </tbody>
</table>

<h3>Tratamento de Reposição Plena com Levotiroxina Sódica (L-T4)</h3>
<p>O tratamento do hipotireoidismo primário baseia-se na reposição hormonal oral fisiológica com <strong>Levotiroxina sódica sintética (L-T4)</strong>. A monoterapia com L-T4 é o padrão-ouro exclusivo mundial; o uso de T3 associado (liotironina) não demonstrou benefício clínico consistente em ensaios clínicos e associa-se a picos séricos de T3 com risco de taquiarritmias e osteopenia.</p>
<p><strong>Cálculo Posológico e Titulação por Faixa Etária:</strong></p>
<ul>
  <li><strong>Adulto Jovem Hígido Sem Doença Cardiovascular:</strong> Dose plena de reposição calculada entre <strong>1,6 e 1,8 mcg/kg de peso corporal ideal por dia</strong> (habitualmente entre 75 e 125 mcg/dia em dose única pela manhã).</li>
  <li><strong>Idosos (&gt; 60 a 65 anos) e Portadores de Doença Arterial Coronariana (DAC):</strong> O coração do coronariopata ou do idoso adaptou-se a um estado de baixo débito e bradicardia. A reposição rápida da dose plena pode desencadear angina instável, infarto agudo do miocárdio ou arritmias ventriculares fatais. A regra mandatória é <strong>iniciar em doses muito baixas ("start low, go slow"): dose inicial de 12,5 a 25 mcg/dia</strong>, com titulação cautelosa e progressiva de 12,5 a 25 mcg a cada 6 a 8 semanas, guiada pelo TSH e tolerância clínica.</li>
</ul>

<h3>Instruções de Tomada Rigorosa e Fatores de Má Absorção</h3>
<p>A levotiroxina é absorvida no jejuno e íleo proximal e necessita de pH gástrico ácido para desagregação e absorção ideais. A absorção oral situa-se entre 70% e 80% em jejum, mas despenca para menos de 50% se ingerida com alimentos. O paciente deve receber instruções detalhadas:</p>
<ol>
  <li>Tomar o comprimido em <strong>jejum rigoroso pela manhã com água pura, aguardando no mínimo 30 a 60 minutos antes de ingerir o café da manhã</strong> (ou alternativamente ao deitar, pelo menos 3 a 4 horas após a última refeição noturna).</li>
  <li>Medicamentos que reduzem drasticamente a absorção e devem ser espaçados por pelo menos <strong>4 horas</strong> da tomada da levotiroxina: <strong>Sais de ferro oral (sulfato ferroso), carbonato de cálcio, hidróxido de alumínio, colestiramina e sucralfato</strong>. Inibidores de bomba de prótons (omeprazol) aumentam o pH gástrico e elevam a dose necessária de L-T4.</li>
</ol>

<h3>Monitorização Laboratorial e Metas Terapêuticas de TSH</h3>
<p>Como a meia-vida do T4 é de 7 dias, um novo estado de equilíbrio farmacocinético só é alcançado após 4 a 6 semanas. Portanto, a dosagem de TSH deve ser realizada <strong>6 a 8 semanas após qualquer início de tratamento ou modificação posológica</strong>:</p>
<ul>
  <li><strong>Meta Alvo no Hipotireoidismo Primário Comum:</strong> Manter o <strong>TSH na faixa média de referência da normalidade (entre 0,5 e 2,5 ou 3,0 mUI/L)</strong>, com T4L normal.</li>
  <li><strong>Meta em Idosos (&gt; 70 a 80 anos):</strong> Alvo de TSH mais flexível, tolerando-se níveis entre <strong>4,0 e 6,0 ou 7,0 mUI/L</strong> para prevenir arritmias atriais e fraturas por osteoporose decorrentes de hiper-reposição iatrogênica subclínica.</li>
</ul>
`
    },
    {
      id: 'hipotireoidismo-subclinico-quando-tratar',
      title: '7. Hipotireoidismo Subclínico: Critérios Diagnósticos e Indicações Formais de Tratamento',
      body_html: `
<h3>Definição Laboratorial Estrita</h3>
<p>O Hipotireoidismo Subclínico (HSC) é uma entidade de diagnóstico estritamente laboratorial caracterizada pela presença de <strong>TSH sérico persistentemente ELEVADO (&gt; 4,5 mUI/L) na vigência de níveis normais de T4 Livre</strong> plasmático. Reflete um estágio precoce de falência tireoidiana mínima, onde a adeno-hipófise aumenta compensatoriamente a secreção de TSH para forçar a tireoide a manter o T4L dentro dos limites fisiológicos normais.</p>
<p><strong>A Regra da Confirmação Laboratorial:</strong> O TSH sofre oscilações fisiológicas transitórias decorrentes de infecções intercorrentes recentes, recuperação de doenças não tireoidianas e variações biológicas. Portanto, diante de um TSH discretamente elevado com T4L normal, é <strong>mandatório repetir a dosagem de TSH e T4L associada à pesquisa de Anti-TPO após 2 a 3 meses</strong>. Em até 30% a 40% dos casos, o TSH normaliza espontaneamente na segunda coleta, evitando tratamentos vitalícios desnecessários.</p>

<h3>Classificação por Faixa de Elevação do TSH</h3>
<ul>
  <li><strong>HSC Categoria 1 (Elevação Leve):</strong> TSH entre <strong>4,5 e 9,9 mUI/L</strong> com T4L normal (representa mais de 75% a 80% dos casos). Risco de progressão para hipotireoidismo franco é baixo (2% a 4% ao ano), exceto se Anti-TPO positivo.</li>
  <li><strong>HSC Categoria 2 (Elevação Substancial):</strong> <strong>TSH &ge; 10,0 mUI/L</strong> com T4L normal. Associa-se a risco elevado de progressão anual para hipotireoidismo clínico (&gt; 5% a 8% ao ano), aumento consistente do risco de dislipidemia aterogênica, disfunção sistólica/diastólica e maior incidência de eventos coronarianos e mortalidade cardiovascular em estudos observacionais.</li>
</ul>

<h3>Quando Tratar o Hipotireoidismo Subclínico com Levotiroxina?</h3>
<p>As diretrizes internacionais (American Thyroid Association - ATA e European Thyroid Association - ETA) e o Consenso Brasileiro da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) normatizaram as indicações formais e precisas de tratamento com Levotiroxina no HSC:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico Específico</th>
      <th>Recomendação Terapêutica Formal</th>
      <th>Justificativa Baseada em Evidências</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. TSH &ge; 10,0 mUI/L (Confirmado)</strong></td>
      <td><strong>TRATAMENTO MANDATÓRIO (Classe 1A)</strong> para todos os pacientes com idade &lt; 70 anos.</td>
      <td>Redução comprovada do risco de eventos cardiovasculares maiores, melhora do perfil lipídico e prevenção de progressão para hipotireoidismo franco.</td>
    </tr>
    <tr>
      <td><strong>2. Gestantes ou Mulheres Planejando Gravidez Imediata</strong></td>
      <td><strong>TRATAMENTO MANDATÓRIO IMEDIATO</strong> se TSH &gt; limite superior gestacional (ou &gt; 4,0 mUI/L), ou se TSH &gt; 2,5 mUI/L com Anti-TPO positivo.</td>
      <td>Prevenção de abortamento precoce, descolamento prematuro de placenta, pré-eclâmpsia e prejuízo no neurodesenvolvimento cognitivo fetal.</td>
    </tr>
    <tr>
      <td><strong>3. TSH entre 4,5 e 9,9 mUI/L com Anti-TPO Fortemente Positivo</strong></td>
      <td><strong>Tratamento Recomendado</strong></td>
      <td>Presença de autoanticorpos em títulos elevados indica tireoidite autoimune destrutiva ativa com altíssima taxa de progressão para falência glandular.</td>
    </tr>
    <tr>
      <td><strong>4. TSH entre 4,5 e 9,9 mUI/L com Sintomas Inequívocos de Hipotireoidismo ou Bócio</strong></td>
      <td><strong>Teste Terapêutico com L-T4 (por 3 a 6 meses)</strong></td>
      <td>Se houver alívio nítido dos sintomas (astenia, sonolência) e melhora do bem-estar, manter o tratamento. Se não houver melhora, suspender a levotiroxina.</td>
    </tr>
    <tr>
      <td><strong>5. TSH entre 4,5 e 9,9 mUI/L em Idosos Muito Idosos (&ge; 80 anos) ou Frágeis</strong></td>
      <td><strong>NÃO TRATAR! Conduta Expectante com Monitorização Semestral</strong></td>
      <td>Grandes estudos demonstraram que níveis discretamente elevados de TSH em octogenários e nonagenários associam-se a <em>maior longevidade e proteção</em>. O tratamento induz arritmias (FA) e fraturas.</td>
    </tr>
  </tbody>
</table>
<p><strong>Dose Inicial no Hipotireoidismo Subclínico:</strong> Diferente do hipotireoidismo clínico que exige dose plena (1,6 mcg/kg), o HSC requer apenas doses baixas para normalizar o TSH: iniciar com <strong>25 a 50 mcg/dia de Levotiroxina</strong>, reavaliando o TSH após 8 semanas.</p>
`
    },
    {
      id: 'coma-mixedematoso-emergencia-extrema',
      title: '8. Coma Mixedematoso: Fisiopatologia, Reconhecimento e Manejo de Emergência',
      body_html: `
<h3>Conceito, Epidemiologia e Mecanismos da Descompensação</h3>
<p>O Coma Mixedematoso é a expressão máxima, rara e potencialmente letal da insuficiência tireoidiana, representando uma emergência endócrina absoluta com taxas históricas de mortalidade que variam entre 30% e 60%. Ocorre quase invariavelmente em <strong>idosos com hipotireoidismo crônico de longa data não diagnosticado ou que abandonaram o tratamento com levotiroxina</strong>, com nítido pico de incidência durante os meses de <strong>inverno rigoroso (exposição ambiental ao frio intenso)</strong>.</p>
<p>O quadro é deflagrado por um fator desestabilizador agudo que sobrecarrega a reserva metabólica esgotada: <strong>infecções bacterianas graves (pneumonia, urosepse), exposição prolongada a baixas temperaturas ambientais, acidente vascular cerebral, infarto agudo do miocárdio, insuficiência cardíaca descompensada, cirurgias de urgência ou uso de drogas depressoras do sistema nervoso central (sedativos, opioides, anestésicos gerais)</strong> cuja metabolização hepática encontra-se quase paralisada.</p>

<h3>A Pêntade Clínica Clássica do Coma Mixedematoso</h3>
<ol>
  <li><strong>Hipotermia Profunda:</strong> É o achado clínico mais constante e chamativo, com temperatura corporal central frequentemente <strong>inferior a 35°C, podendo atingir 28°C a 32°C</strong>. O termômetro clínico comum pode não registrar a temperatura real, exigindo termômetro de baixa graduação. A ausência de febre na vigência de sepse grave é típica devido à paralisia da termogênese hipotalâmica.</li>
  <li><strong>Rebaixamento Severo do Sensório e Disfunção Neurológica:</strong> Letargia profunda, estupor, confusão mental extrema ("loucura mixedematosa") evoluindo rapidamente para coma comatoso arreativo e crises convulsivas generalizadas.</li>
  <li><strong>Hipoventilação Alveolar e Insuficiência Respiratória Hipercápnica:</strong> Redução severa da sensibilidade dos quimiorreceptores centrais e periféricos à hipóxia e à hipercapnia, associada a fraqueza extrema da musculatura diafragmática, macroglossia obstrutiva e mixedema da árvore traqueobrônquica, culminando em retenção aguda maciça de CO2 (PaCO2 &gt; 60 mmHg) e necessidade imediata de intubação endotraqueal.</li>
  <li><strong>Colapso Cardiovascular e Bradicardia Marcante:</strong> Bradicardia sinusal severa (frequência cardíaca &lt; 40 a 50 bpm), prolongamento do intervalo QT no ECG com risco de arritmias ventriculares polimórficas (Torsades de Pointes), hipotensão arterial sistêmica refratária e choque com baixo débito cardíaco e derrames pericárdicos volumosos.</li>
  <li><strong>Hiponatremia Hipotônica Severa:</strong> Decorrente da redução da taxa de filtração glomerular e da secreção não osmótica aumentada de hormônio antidiurético (ADH / Vasopressina), associada à incapacidade de depurar água livre renal.</li>
</ol>

<h3>Protocolo de Terapia Intensiva no Coma Mixedematoso</h3>
<p>O tratamento deve ser iniciado imediatamente na sala vermelha da emergência ou em leito de UTI diante da forte suspeita clínica, <strong>sem aguardar os resultados das dosagens hormonais de TSH e T4L</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Pilar Terapêutico</th>
      <th>Intervenção Farmacológica e Detalhes Posológicos</th>
      <th>Justificativa Fisiopatológica Crítica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Corticoterapia Empírica Mandatória</strong></td>
      <td><strong>Hidrocortisona: 100 mg IV em bólus imediato, seguida de 50 a 100 mg IV a cada 6 a 8 horas</strong>.</td>
      <td><strong>MANDATÓRIO ADMINISTRAR ANTES OU SIMULTANEAMENTE À LEVOTIROXINA!</strong> Pacientes com hipotireoidismo grave frequentemente possuem insuficiência adrenal autoimune associada (Síndrome Poliglandular Autoimune Tipo 2 / Síndrome de Schmidt) ou atrofia adrenal por hipometabolismo. Administrar levotiroxina isolada acelera o metabolismo hepático e o clearance de cortisol residual, <strong>precipitando uma Crise Adrenal Aguda fatal com choque circulatório irreversível</strong>.</td>
    </tr>
    <tr>
      <td><strong>2. Reposição Hormonal Tireoidiana Intensa</strong></td>
      <td>
        <ul>
          <li><strong>Levotiroxina (L-T4):</strong> Dose de ataque de <strong>200 a 400 mcg IV em bólus lento</strong> (se formulação IV não disponível no Brasil, administrar 300 a 500 mcg por sonda nasogástrica triturada), seguida de dose de manutenção de 1,6 mcg/kg/dia IV ou VO.</li>
          <li><strong>Associação com T3 (Liotironina):</strong> Se disponível, associar T3 na dose de 5 a 20 mcg IV (ou VO), pois a conversão periférica de T4 em T3 pelas desiodases está quase totalmente bloqueada na hipotermia. Usar doses menores se histórico de coronariopatia.</li>
        </ul>
      </td>
      <td>Saturar rapidamente os receptores nucleares esgotados e restabelecer a transcrição gênica e a termogênese enzimática nos órgãos vitais.</td>
    </tr>
    <tr>
      <td><strong>3. Reaquecimento Passivo</strong></td>
      <td>Utilizar cobertores comuns ou mantas térmicas em ambiente aquecido. <strong>EVITAR reaquecimento ativo externo rápido</strong> (como banhos quentes ou lâmpadas radiantes diretas).</td>
      <td>O reaquecimento ativo rápido provoca vasodilatação periférica cutânea abrupta, desviando sangue das vísceras nobres e precipitando <strong>colapso cardiovascular e choque circulatório fulminante</strong>.</td>
    </tr>
    <tr>
      <td><strong>4. Suporte Ventilatório e Correção Eletrolítica</strong></td>
      <td>Intubação orotraqueal e ventilação mecânica precoce. Correção da hiponatremia com <strong>Salina Hipertônica a 3%</strong> apenas se Na+ &lt; 120 mEq/L ou convulsões; caso contrário, apenas restrição hídrica com SF 0,9%. Reposição de glicose para hipoglicemia frequente. Antibioticoterapia empírica de amplo espectro para sepse/pneumonia oculta.</td>
      <td>Combater a hipercapnia letal e reverter a hiponatremia sintomática com segurança.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'nodulos-tireoidianos-classificacao-tirads-bethesda',
      title: '9. Nódulos Tireoidianos, Câncer de Tireoide e Classificações TI-RADS e Bethesda',
      body_html: `
<h3>Epidemiologia e Abordagem Inicial do Nódulo Tireoidiano</h3>
<p>Os nódulos tireoidianos são extremamente prevalentes na população adulta, sendo detectáveis pela ultrassonografia cervical de alta resolução em até 50% a 65% das mulheres acima de 50 anos. Contudo, <strong>apenas 5% a 10% de todos os nódulos tireoidianos correspondem a lesões malignas (câncer de tireoide)</strong>. A investigação clínica estruturada visa identificar com precisão as lesões de alto risco que exigem abordagem cirúrgica, evitando intervenções invasivas em nódulos benignos indolentes.</p>
<p>O primeiro passo propedêutico obrigatório diante de qualquer nódulo tireoidiano palpável ou incidental é a <strong>dosagem de TSH sérico</strong>:</p>
<ul>
  <li><strong>Se TSH Suprimido (&lt; 0,4 mUI/L):</strong> Indica suspeita de nódulo hiperfuncionante autônomo. O próximo exame obrigatório é a <strong>Cintilografia de Tireoide com 131-I ou 99mTc</strong>. Se a cintilografia confirmar "nódulo quente" (hipercaptante), a probabilidade de câncer é quase nula (&lt; 1%), dispensando punção por agulha fina (PAAF); o paciente é encaminhado para tratamento do hipertireoidismo (radioiodo ou cirurgia).</li>
  <li><strong>Se TSH Normal ou Elevado:</strong> O nódulo não é hiperfuncionante. O próximo exame diagnóstico obrigatório é a <strong>Ultrassonografia Cervical de Alta Resolução</strong> para avaliação anatômica estratificada pelo sistema ACR TI-RADS.</li>
</ul>

<h3>Estratificação de Risco Ultrassonográfico: Sistema ACR TI-RADS</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria ACR TI-RADS</th>
      <th>Características Ultrassonográficas e Risco de Malignidade</th>
      <th>Critério de Indicação de PAAF (Punção com Agulha Fina)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>TR1 (Benigno)</strong></td>
      <td>Cisto puro anecoico. Risco de câncer: &lt; 0,3%.</td>
      <td>Não puncionar (não aplicável).</td>
    </tr>
    <tr>
      <td><strong>TR2 (Não Suspeito)</strong></td>
      <td>Nódulo totalmente espongiforme (&gt; 50% microcístico) ou misto sem características suspeitas. Risco: &lt; 1,5%.</td>
      <td>Não puncionar (PAAF desnecessária).</td>
    </tr>
    <tr>
      <td><strong>TR3 (Levemente Suspeito)</strong></td>
      <td>Nódulo sólido isoecoico ou hiperecogênico, margens lisas, sem calcificações. Risco: cerca de 5%.</td>
      <td>Puncionar (PAAF) apenas se <strong>diâmetro &ge; 2,5 cm</strong> (acompanhar com USG se &ge; 1,5 cm).</td>
    </tr>
    <tr>
      <td><strong>TR4 (Moderadamente Suspeito)</strong></td>
      <td>Nódulo sólido <strong>hipoecoico</strong> com margens regulares e sem sinais de alta suspeição. Risco: 5% a 20%.</td>
      <td>Puncionar (PAAF) se <strong>diâmetro &ge; 1,5 cm</strong> (acompanhar com USG se &ge; 1,0 cm).</td>
    </tr>
    <tr>
      <td><strong>TR5 (Altamente Suspeito)</strong></td>
      <td>Presença de sinais de alto risco: <strong>marcadamente hipoecoico, mais alto do que largo ("taller-than-wide"), margens irregulares/espiculadas/lobuladas, microcalcificações pontiformes e extensão extratireoidiana franca</strong>. Risco: &gt; 35% a 70%.</td>
      <td>Puncionar (PAAF) se <strong>diâmetro &ge; 1,0 cm</strong> (acompanhar com USG se &ge; 0,5 cm).</td>
    </tr>
  </tbody>
</table>

<h3>Classificação Citopatológica de Bethesda (Atualização Oficial)</h3>
<p>O material obtido pela PAAF guiada por ultrassom é classificado pelo Sistema Bethesda para Relato de Citopatologia Tireoidiana, que dita a conduta médica formal:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Bethesda</th>
      <th>Interpretação Diagnóstica</th>
      <th>Risco de Câncer</th>
      <th>Conduta Clínica Padronizada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Bethesda I</strong></td>
      <td>Não Diagnóstica ou Insatisfatória (coloide acelular, sangue puro, menos de 6 grupos de 10 células foliculares).</td>
      <td>5% a 10%</td>
      <td><strong>Repetir a PAAF guiada por ultrassom</strong> após 6 a 12 semanas (exceto em cistos simples).</td>
    </tr>
    <tr>
      <td><strong>Bethesda II</strong></td>
      <td><strong>Benigno</strong> (bócio coloide adenomatoso, tireoidite de Hashimoto).</td>
      <td>&lt; 3%</td>
      <td><strong>Seguimento clínico e ultrassonográfico periódico</strong> a cada 12 a 24 meses. Sem cirurgia.</td>
    </tr>
    <tr>
      <td><strong>Bethesda III</strong></td>
      <td>Atipia de Significado Indeterminado (AUS) ou Lesão Folicular de Significado Indeterminado (FLUS).</td>
      <td>10% a 30%</td>
      <td><strong>Repetir a PAAF</strong> em 2 a 3 meses OU solicitar <strong>Painel de Testes Moleculares</strong> genéticos (BRAF, RAS, RET/PTC). Cirurgia diagnóstica se persistir atipia ou mutação de alto risco.</td>
    </tr>
    <tr>
      <td><strong>Bethesda IV</strong></td>
      <td><strong>Neoplasia Folicular</strong> ou Suspeito para Neoplasia Folicular (população microfolicular homogênea; a citologia da PAAF não distingue adenoma de carcinoma folicular por não avaliar invasão capsular ou vascular).</td>
      <td>25% a 40%</td>
      <td><strong>Cirurgia (Lobectomia com istmectomia diagnóstica)</strong> ou Teste Molecular.</td>
    </tr>
    <tr>
      <td><strong>Bethesda V</strong></td>
      <td><strong>Suspeito de Malignidade</strong> (fortes características nucleares de carcinoma papilífero incompletas).</td>
      <td>60% a 75%</td>
      <td><strong>Tratamento Cirúrgico</strong> (Lobectomia ou Tireoidectomia Total com esvaziamento cervical conforme fatores de risco).</td>
    </tr>
    <tr>
      <td><strong>Bethesda VI</strong></td>
      <td><strong>Maligno Confirmado</strong> (Carcinoma Papilífero, Medular, Anaplásico ou Linfoma).</td>
      <td><strong>97% a 99%</strong></td>
      <td><strong>Tireoidectomia Total</strong> associada a estadiamento e esvaziamento linfonodal cervical central se indicado.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-alta-complexidade-tireoide',
      title: '10. Casos Clínicos Complexos com Discussão Fisiopatológica e Baseada em Evidências',
      body_html: `
<h3>Caso Clínico 1: Tempestade Tireoidiana Deflagrada por Infecção Respiratória</h3>
<p><strong>História Clínica:</strong> Mulher de 32 anos, com história de perda ponderal de 10 kg nos últimos 4 meses, agitação psicomotora e proptose ocular bilateral progressiva, sem acompanhamento médico regular. É admitida no setor de emergência trazida pelo SAMU com quadro de confusão mental aguda, delírios persecutórios e febre alta iniciada há 12 horas após dois dias de tosse produtiva e dor pleurítica. Ao exame físico na sala de choque: estado geral grave, desidratada 3+/4+, confusa e extremamente agitada no leito, sudorese profusa, temperatura axilar de <strong>39,8°C</strong>. Frequência cardíaca de <strong>164 bpm</strong> com ritmo irregular (eletrocardiograma acusa fibrilação atrial com resposta ventricular descontrolada). Pressão arterial de 150/60 mmHg (pressão de pulso divergente). Ectoscopia cervical evidencia <strong>bócio difuso simétrico volumoso associado a frêmito palpável e sopro contínuo audível</strong> sobre os polos superiores da tireoide. Apresenta exoftalmia bilateral acentuada com quebra da oclusão palpebral. Ausculta pulmonar revela crepitações úmidas no terço inferior do pulmão direito.</p>
<p><strong>Exames Laboratoriais Iniciais:</strong></p>
<ul>
  <li>TSH: <strong>&lt; 0,005 mUI/L</strong> (profundamente suprimido).</li>
  <li>T4 Livre: <strong>&gt; 7,8 ng/dL</strong> (muito elevado; referência: 0,8 a 1,8 ng/dL); T3 Total: &gt; 600 ng/dL.</li>
  <li>TRAb sérico: 18,5 UI/L (positivo; referência &lt; 1,75). Leucograma: 16.400/mm³ com 10% de bastonetes.</li>
  <li>Bilirrubina Total: 2,8 mg/dL com predomínio de direta; Enzimas hepáticas com AST 64 U/L e ALT 72 U/L.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Aplicação do Escore de Burch-Wartofsky:</em>
    <ul>
      <li>Temperatura corporal (39,8°C): <strong>25 pontos</strong>.</li>
      <li>Alteração grave do SNC (delirium/psicose/confusão): <strong>20 pontos</strong>.</li>
      <li>Disfunção gastrointestinal-hepática (icterícia inexplicada com BT 2,8): <strong>20 pontos</strong>.</li>
      <li>Taquicardia grave (&ge; 140 bpm: 164 bpm): <strong>25 pontos</strong>.</li>
      <li>Fibrilação Atrial nova: <strong>10 pontos</strong>.</li>
      <li>Fator desencadeador intercorrente (pneumonia com febre e tosse): <strong>10 pontos</strong>.</li>
      <li><em>Pontuação Total = 25 + 20 + 20 + 25 + 10 + 10 = <strong>110 PONTOS</strong></em> (valor &ge; 45 pontos confirma inequivocamente <strong>Tempestade Tireoidiana Estabelecida</strong> de altíssimo risco).</li>
    </ul>
  </li>
  <li><em>Protocolo de Tratamento em UTI em 4 Etapas Rigorosas:</em>
    <ol>
      <li><strong>1º Passo: Bloqueio Adrenérgico:</strong> Administrar <strong>Propranolol (60 a 80 mg via enteral de 4/4h</strong> ou bólus IV lento de 1-2 mg a cada 15 min), controlando a frequência ventricular da FA e inibindo a desiodase tipo 1.</li>
      <li><strong>2º Passo: Bloqueio da Síntese Hormonal:</strong> Administrar <strong>Propiltiouracil (PTU) na dose de ataque de 600 a 800 mg por sonda nasogástrica, seguido de 200 mg de 4/4h</strong>.</li>
      <li><strong>3º Passo: Bloqueio da Liberação Hormonal com Iodo:</strong> Administrar <strong>Solução de Lugol (10 gotas VO de 8/8h) OBRIGATORIAMENTE PELO MENOS 1 HORA APÓS O PTU</strong>, evitando que o iodo seja organificado em novo hormônio.</li>
      <li><strong>4º Passo: Bloqueio da Conversão e Suporte Adrenal:</strong> Administrar <strong>Hidrocortisona (100 mg IV de 8/8h)</strong> para suprimir a geração periférica de T3 e prevenir crise adrenal por exaustão circulatória.</li>
      <li><em>Suporte Intensivo:</em> Resfriamento corporal com dipirona (evitar formalmente AAS) e início imediato de Ceftriaxona associada a Claritromicina para a pneumonia desencadeante.</li>
    </ol>
  </li>
</ol>

<h3>Caso Clínico 2: Coma Mixedematoso em Idosa com Hipotermia Profunda no Inverno</h3>
<p><strong>História Clínica:</strong> Mulher de 79 anos, com histórico de tireoidite crônica diagnosticada há 20 anos, vivendo sozinha. Há 3 meses suspendeu por conta própria o uso de Levotiroxina por problemas financeiros. Durante uma onda de frio intenso em julho, vizinhos acionam o serviço de resgate após a paciente não ser vista há três dias. É encontrada caída no chão de sua residência inconsciente. Ao exame na sala vermelha da emergência: paciente em coma arreativo (Glasgow 6), não responsiva a estímulos verbais e com mínima flexão inespecífica à dor. Pele intensamente fria, ressecada, descamativa e amarelada, com mixedema difuso periorbitário e de membros inferiores sem cacifo. Temperatura retal central aferida com termômetro de baixa escala acusa <strong>31,2°C (hipotermia profunda)</strong>. Bradicárdica com <strong>FC 42 bpm</strong>, PA 82/50 mmHg, com pulso periférico filiforme. Frequência respiratória de apenas <strong>8 incursões por minuto</strong>, respiração superficial com cianose labial. Ausculta cardíaca com bulhas rítmicas e abafadas. Ausculta pulmonar com murmúrio diminuído globalmente sem ruídos adventícios. Abdome distendido e timpânico com ruídos hidroaéreos abolidos (íleo paralítico).</p>
<p><strong>Exames Laboratoriais de Urgência:</strong></p>
<ul>
  <li>Gasometria arterial: <strong>pH 7,19; PaCO2 68 mmHg; PaO2 52 mmHg; HCO3 25 mEq/L (acidose respiratória hipercápnica grave)</strong>.</li>
  <li>Glicemia capilar: <strong>54 mg/dL</strong> (hipoglicemia).</li>
  <li>Eletrólitos: <strong>Sódio sérico: 116 mEq/L (hiponatremia grave)</strong>; Potássio: 4,6 mEq/L.</li>
  <li>TSH: <strong>112 mUI/L</strong>; T4 Livre: <strong>&lt; 0,1 ng/dL (indetectável)</strong>; Cortisol basal matinal de urgência: 5,2 mcg/dL (inapropriadamente baixo para estresse).</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Clínico Imediato:</em> <strong>Coma Mixedematoso Grave com Insuficiência Respiratória Hipercápnica e Choque Circulatório Hipotérmico</strong>. A pêntade clássica está presente: hipotermia profunda (31,2°C), coma comatoso, hipoventilação grave com PaCO2 68 mmHg, bradicardia com hipotensão e hiponatremia profunda (116 mEq/L).</li>
  <li><em>A Conduta Salvadora Sequencial (Prioridade Máxima):</em>
    <ul>
      <li><em>Via Aérea Imediata:</em> <strong>Intubação Orotraqueal em Sequência Rápida Protetora</strong> para suporte ventilatório mecânico invasivo imediato contra a narcose por CO2.</li>
      <li><em>A Regra de Ouro do Corticoide:</em> <strong>ADMINISTRAR HIDROCORTISONA (100 mg IV EM BÓLUS IMEDIATO) ANTES DA LEVOTIROXINA</strong>. O cortisol de 5,2 mcg/dL em vigência de choque e coma comprova insuficiência adrenal associada. Administrar levotiroxina sem corticoide desencadearia choque adrenal fulminante irreversível.</li>
      <li><em>Hormonioterapia Tireoidiana:</em> Administrar <strong>Levotiroxina sódica na dose de ataque de 300 a 400 mcg por sonda nasogástrica</strong> triturada em água (ou IV se disponível).</li>
      <li><em>Reaquecimento Cuidadoso:</em> Reaquecimento <strong>PASSIVO</strong> com mantas térmicas em temperatura ambiente controlada. Reaquecimento ativo rápido causaria vasodilatação com choque refratário.</li>
      <li><em>Correção da Hiponatremia e Glicemia:</em> Infundir Soro Glicosado a 5% com Salina Hipertônica a 3% (100 mL em 30 min) para elevar o sódio em 4 a 6 mEq/L e corrigir a hipoglicemia, prevenindo convulsões.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 3: Tireoidite Subaguda de De Quervain versus Doença de Graves</h3>
<p><strong>História Clínica:</strong> Mulher de 39 anos, previamente hígida, procura atendimento na UBS com queixa de palpitações, taquicardia, tremores nas mãos, perda de 4 kg e intensa insônia há 15 dias. Refere que há cerca de 3 semanas apresentou quadro de faringite viral com febre e coriza que melhorou espontaneamente. O que mais a incomoda no momento é uma <strong>dor cervical anterior de forte intensidade, contínua e pulsátil, que piora muito à deglutição e que irradia para os ângulos da mandíbula e ouvidos bilateralmente</strong>. Não apresenta queixas oculares. Ao exame físico: paciente ansiosa, taquicárdica com FC 108 bpm, PA 130/75 mmHg, pele quente e úmida com tremor fino de extremidades à manobra dos braços estendidos. À palpação cervical: <strong>glândula tireoide discretamente aumentada de volume (cerca de 1,5 a 2 vezes o normal), de consistência fibroelástica/endurecida, EXTREMAMENTE DOLOROSA À PALPAÇÃO LEVE</strong>, que impede a palpação profunda pelo choro da paciente. Ausência de sopros ou frêmitos cervicais. Ausência de proptose ocular ou mixedema pré-tibial.</p>
<p><strong>Exames Laboratoriais Iniciais:</strong></p>
<ul>
  <li>TSH: <strong>&lt; 0,01 mUI/L</strong>; T4 Livre: <strong>2,9 ng/dL</strong> (elevado); T3 Livre: 5,8 pg/mL.</li>
  <li>Velocidade de Hemossedimentação (VHS): <strong>98 mm na primeira hora</strong> (profundamente elevada); PCR: 48 mg/L.</li>
  <li>Anticorpos: <strong>TRAb: negativo (&lt; 0,3 UI/L)</strong>; Anti-TPO: negativo.</li>
  <li>Cintilografia de Tireoide com Iodo-131 (RAIU): <strong>Captação em 24 horas de 0,8% (praticamente nula / bloqueada)</strong>.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> O quadro é patognomônico de <strong>Tireoidite Subaguda Granulomatosa de De Quervain em Fase Tirotóxica Inicial</strong>. A dor cervical lancinante associada a tireoide extremamente sensível após infecção viral recente, acompanhada de VHS &gt; 50-90 mm/h e captação de iodo nula (&lt; 1%) descarta categoricamente a Doença de Graves (na qual o bócio é indolor, o TRAb é positivo e a cintilografia exibe hipercaptação homogênea &gt; 40%).</li>
  <li><em>Fisiopatologia da Baixa Captação:</em> Os folículos estão sofrendo lise inflamatória aguda com necrose tecidual e granulomas com células gigantes multinucleadas. O hormônio circulante decorre de vazamento passivo de coloide pré-formado. As células foliculares danificadas não conseguem captar iodeto radioativo, gerando captação &lt; 1%.</li>
  <li><em>Conduta Farmacológica Racional:</em>
    <ul>
      <li><strong>É FORMALMENTE CONTRAINDICADO PRESCREVER TIONAMIDAS (METIMAZOL OU PTU) OU RADIOIODO!</strong> As tionamidas inibem a síntese de novos hormônios, mas a tireoide inflamada já não está sintetizando nada; seu problema é o vazamento mecânico. As tionamidas seriam inúteis e exporiam a paciente a riscos de agranulocitose e hepatite.</li>
      <li><em>Controle dos Sintomas Adrenérgicos:</em> <strong>Propranolol (20 a 40 mg de 8/8h)</strong> para alívio imediato da taquicardia e tremores.</li>
      <li><em>Controle da Dor e Inflamação:</em> Anti-inflamatórios Não Esteroides (AINEs - Ibuprofeno 600 mg de 8/8h) em casos leves; como a dor é intensa e a VHS é &gt; 90 mm/h, a terapia mais rápida e eficaz é a <strong>Prednisona oral (30 a 40 mg/dia)</strong>, com alívio dramático da dor em 24 a 48 horas, mantida por 1 a 2 semanas e desmamada progressivamente em 4 a 6 semanas. Orientar que após a tireotoxicose haverá uma fase de hipotireoidismo autolimitado transitório antes da cura definitiva.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 4: Febre e Odinofagia em Paciente em Uso de Metimazol - Agranulocitose</h3>
<p><strong>História Clínica:</strong> Mulher de 26 anos, com diagnóstico de Doença de Graves estabelecido há 4 semanas, em tratamento com Metimazol 30 mg ao dia em tomada única matinal associado a Propranolol 40 mg de 8/8h. Vinha apresentando melhora clínica substancial das palpitações e perda de peso. Procura a unidade de pronto-atendimento à noite relatando que há 18 horas iniciou subitamente com febre alta acompanhada de calafrios intensos e dor de garganta lancinante com dificuldade e dor extrema para engolir até a própria saliva (odinofagia grave). Ao exame físico na triagem: febril (temperatura axilar de 39,2°C), taquicárdica com FC 110 bpm, PA 115/70 mmHg. À oroscopia: hiperemia faríngea intensa com presença de úlceras necróticas profundas recobertas por exsudato acinzentado nas amígdalas palatinas bilateralmente, sem adenomegalias cervicais inflamatórias reacionais palpáveis. Restante do exame segmentar sem outros focos infecciosos aparentes.</p>
<p><strong>Exames Complementares de Urgência:</strong></p>
<ul>
  <li>Hemograma completo com contagem diferencial:
    <ul>
      <li>Hemoglobina: 12,8 g/dL; Plaquetas: 220.000/mm³.</li>
      <li>Leucócitos totais: <strong>950/mm³</strong>.</li>
      <li>Neutrófilos segmentados: <strong>12% (Contagem Absoluta de Neutrófilos = 114 células/mm³)</strong>; Bastonetes: 0%; Linfócitos: 78%; Monócitos: 10%.</li>
    </ul>
  </li>
  <li>Proteína C-Reativa: 185 mg/L. Creatinina e eletrólitos normais.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico da Emergência Hematológica Iatrogênica:</em> A paciente desenvolveu <strong>Agranulocitose Severa Induzida por Metimazol</strong> (Contagem Absoluta de Neutrófilos &lt; 500/mm³: 114/mm³) com amigdalite ulceronecrótica e sepse neutropênica aguda.</li>
  <li><em>Mecanismo de Toxicidade:</em> Reação idiossincrática imunomediada contra progenitores mielóides medulares deflagrada pelo metimazol (frequente nas primeiras 6 a 12 semanas em doses &ge; 30 mg/dia). A ausência de linfonodomegalia decorre da incapacidade do sistema imune de recrutar neutrófilos e montar resposta celular tecidual exuberante.</li>
  <li><em>Conduta Terapêutica Hospitalar Imediata e Salvadora:</em>
    <ul>
      <li><strong>SUSPENDER IMEDIATAMENTE E EM DEFINITIVO O METIMAZOL!</strong> O medicamento causador nunca mais poderá ser reintroduzido.</li>
      <li><em>Internação Hospitalar Imediata em Quarto Privativo com Isolamento Protetor Reverso.</em></li>
      <li><em>Protocolo de Neutropenia Febril de Alto Risco:</em> Coleta imediata de duas amostras de hemoculturas periféricas e swab orofaríngeo para cultura bacteriana e fúngica, seguida de início instantâneo de <strong>Antibioticoterapia Intravenosa de Amplo Espectro com atividade antipseudomonas (Cefepime 2g IV de 8/8h ou Piperacilina-Tazobactam)</strong> na primeira hora de atendimento.</li>
      <li><em>Estímulo Medular:</em> Prescrever <strong>Fator Estimulador de Colônias de Granulócitos (G-CSF / Filgrastim na dose de 5 mcg/kg/dia SC)</strong> até a recuperação dos neutrófilos acima de 1.000 a 1.500/mm³, acelerando a regeneração medular em 3 a 5 dias.</li>
      <li><em>Manejo Definitivo Futuro do Hipertireoidismo:</em> <strong>O PROPILTIOURACIL É FORMALMENTE CONTRAINDICADO!</strong> Devido ao risco de até 50% de reatividade imunológica cruzada letal entre as tionamidas, o PTU nunca deve ser utilizado. O controle do hipertireoidismo deve ser mantido provisoriamente com Propranolol, Iodo e Colestiramina até a recuperação hematológica completa, encaminhando a paciente para <strong>Tratamento Definitivo com Radioiodoterapia (131-I) ou Tireoidectomia Total</strong>.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'questoes-residencia-comentadas-tireoide',
      title: '11. Questões de Concursos e Residência Médica com Comentários Exaustivos',
      body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Mulher de 29 anos com diagnóstico de Doença de Graves estabelecido há 2 semanas comparece ao pronto-socorro relatando febre de 38,8°C e dor de garganta intensa iniciadas há 24 horas. Encontra-se em uso de Metimazol 30 mg/dia prescrito recentemente. Ao exame: febril, oroscopia evidenciando placas purulentas em amígdalas, sem outros focos aparentes. O médico assistente solicita hemograma de urgência que revela leucócitos totais de 1.100/mm³ com 15% de neutrófilos segmentados (Contagem Absoluta de Neutrófilos = 165/mm³). Diante deste quadro de agranulocitose febril, qual é a conduta médica correta?</p>
<ul>
  <li><strong>A)</strong> Reduzir a dose de Metimazol para 10 mg/dia, prescrever amoxicilina oral e liberar para reavaliação ambulatorial em 48 horas.</li>
  <li><strong>B)</strong> Suspender imediatamente o Metimazol, internar a paciente em isolamento, iniciar antibioticoterapia intravenosa de amplo espectro (como Cefepime), prescrever Filgrastim (G-CSF) e nunca mais prescrever tionamidas (contraindicação absoluta também ao PTU).</li>
  <li><strong>C)</strong> Substituir o Metimazol por Propiltiouracil na dose de 300 mg/dia, visto que não há reatividade cruzada para agranulocitose entre as tionamidas.</li>
  <li><strong>D)</strong> Manter o Metimazol associado a corticoterapia oral em altas doses (Prednisona 60 mg/dia) para estimular a mielopoiese medular.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Manter ou apenas reduzir a dose de metimazol em paciente com agranulocitose franca (neutrófilos &lt; 500/mm³) é um erro gravíssimo com risco iminente de choque séptico e morte. A suspensão deve ser total e definitiva.</li>
  <li><em>Alternativa B está CORRETA:</em> A agranulocitose induzida por tionamidas é uma emergência hematológica com risco de óbito por sepse bacteriana fulminante. A conduta mandatória consiste na <strong>suspensão imediata e definitiva do fármaco</strong>, internação hospitalar com isolamento protetor, coleta de culturas e introdução precoce de <strong>antibioticoterapia parenteral de amplo espectro antipseudomonas (Cefepime ou Piperacilina-Tazobactam)</strong> associada a <strong>G-CSF (Filgrastim)</strong>. Devido à alta taxa de reatividade cruzada (cerca de 50%), <strong>o Propiltiouracil é formalmente CONTRAINDICADO</strong>, sendo as tionamidas proscritas para o resto da vida dessa paciente.</li>
  <li><em>Alternativa C está incorreta:</em> Há expressiva taxa de reatividade cruzada imunológica entre metimazol e PTU; a substituição é terminantemente proibida.</li>
  <li><em>Alternativa D está incorreta:</em> Manter o metimazol mantém o estímulo imune de destruição medular. O corticoide isolado não substitui o G-CSF e não autoriza a continuidade da tionamida.</li>
</ul>

<h3>Questão 2 (ENARE / Residência Médica)</h3>
<p>Uma mulher de 72 anos, portadora de fibrilação atrial crônica e hipertensão arterial, sem histórico tireoidiano conhecido, é admitida na UTI com sepse grave de foco urinário. Durante a evolução, apresenta piora súbita com temperatura axilar de 40,1°C, taquicardia sinusal de 152 bpm, icterícia franca nas escleras e delirium agitado com alucinações. O Escore de Burch-Wartofsky totaliza 75 pontos, confirmando o diagnóstico de Crise Tireotóxica (Tempestade Tireoidiana). No protocolo de bloqueio farmacológico escalonado, a administração de solução iodada inorgânica (Lugol) deve ser realizada:</p>
<ul>
  <li><strong>A)</strong> Imediatamente como primeira medida antes de qualquer outro fármaco, para saturar a tireoide.</li>
  <li><strong>B)</strong> Pelo menos 1 hora APÓS a administração da primeira dose de tionamida (PTU ou Metimazol).</li>
  <li><strong>C)</strong> Em infusão venosa rápida simultaneamente ao Ácido Acetilsalicílico (AAS) para controle da hipertermia.</li>
  <li><strong>D)</strong> Apenas se a paciente for alérgica a betabloqueadores, sendo contraindicada em portadores de arritmias cardíacas.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Administrar iodo antes da tionamida causaria uma catástrofe clínica: o iodo forneceria substrato abundante para a síntese acelerada de novos hormônios, agravando a tempestade tireoidiana (Fenômeno de Jod-Basedow agudo).</li>
  <li><em>Alternativa B está CORRETA:</em> No manejo da tempestade tireoidiana, a solução de Lugol atua promovendo o Efeito Wolff-Chaikoff agudo (inibição da liberação de T4/T3 pré-formados). No entanto, o iodo <strong>DEVE SER ADMINISTRADO OBRIGATORIAMENTE PELO MENOS 1 HORA APÓS A PRIMEIRA DOSE DA TIONAMIDA (PTU)</strong>. Essa janela temporal de 60 minutos é necessária para que a tionamida bloqueie a enzima tireoperoxidase (TPO); somente com a síntese travada é que o iodo pode ser ofertado com segurança para bloquear a liberação hormonal.</li>
  <li><em>Alternativa C está incorreta:</em> O Ácido Acetilsalicílico (AAS) é <strong>formalmente CONTRAINDICADO na crise tireotóxica</strong>, pois desloca competitivamente o T4 e T3 de sua ligação proteica com a TBG, aumentando as frações livres ativas circulantes e piorando a tireotoxicose. O antitérmico de escolha é dipirona ou paracetamol.</li>
  <li><em>Alternativa D está incorreta:</em> O Lugol é parte obrigatória da 3ª etapa do protocolo intensivo e não depende da tolerância aos betabloqueadores.</li>
</ul>

<h3>Questão 3 (UNICAMP / Residência Médica)</h3>
<p>Mulher de 44 anos procura o ambulatório com queixas de cansaço fácil, constipação intestinal e sonolência diurna. O exame físico evidencia tireoide discretamente aumentada de volume, indolor e de consistência firme. A propedêutica laboratorial revela: TSH de 8,2 mUI/L (elevado) e T4 Livre de 1,2 ng/dL (normal; valor de referência: 0,8 a 1,8 ng/dL). O anticorpo Anti-TPO é positivo em títulos muito elevados (480 UI/mL; referência &lt; 35). A paciente não é gestante e não planeja engravidar. Considerando as diretrizes da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) para o Hipotireoidismo Subclínico, qual a conduta mais adequada?</p>
<ul>
  <li><strong>A)</strong> Iniciar Levotiroxina na dose plena de 1,6 mcg/kg/dia imediatamente, pois o Anti-TPO elevado define hipotireoidismo clínico.</li>
  <li><strong>B)</strong> Não tratar e não investigar; orientar que o TSH &lt; 10 mUI/L nunca deve receber intervenção em mulheres não grávidas.</li>
  <li><strong>C)</strong> Repetir o TSH e T4L em 2 a 3 meses para confirmação e, se mantida a alteração, considerar o início de Levotiroxina em dose baixa (25 a 50 mcg/dia) pela presença de sintomas e Anti-TPO fortemente positivo.</li>
  <li><strong>D)</strong> Realizar cintilografia de tireoide com iodo-131 para programar ablação glandular com radioiodo.</li>
</ul>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Trata-se de hipotireoidismo subclínico (T4L perfeitamente normal). A dose plena de 1,6 mcg/kg/dia é reservada para o hipotireoidismo clínico franco (com T4L baixo); administrá-la no subclínico causaria tireotoxicose iatrogênica.</li>
  <li><em>Alternativa B está incorreta:</em> Embora o TSH seja &lt; 10 mUI/L, a paciente apresenta queixas clínicas compatíveis, bócio firme e <strong>Anti-TPO fortemente positivo</strong>, o que confere risco de mais de 5% a 8% ao ano de progressão para hipotireoidismo franco, justificando intervenção.</li>
  <li><em>Alternativa C está CORRETA:</em> A primeira conduta mandatória no hipotireoidismo subclínico assintomático ou oligossintomático é <strong>confirmar a alteração laboratorial repetindo o TSH e T4L após 2 a 3 meses</strong>, descartando elevações transitórias. Uma vez confirmada a persistência de TSH entre 4,5 e 9,9 mUI/L, o tratamento com <strong>Levotiroxina em dose baixa (25 a 50 mcg/dia)</strong> é formalmente recomendado pela presença de queixas clínicas inequívocas e, primordialmente, pela <strong>positividade marcante do anticorpo Anti-TPO</strong>, promovendo alívio sintomático e prevenindo a progressão autoimune.</li>
  <li><em>Alternativa D está incorreta:</em> Cintilografia e radioiodo não possuem qualquer indicação no hipotireoidismo ou na tireoidite de Hashimoto sem tireotoxicose autônoma associada.</li>
</ul>

<h3>Questão 4 (UNIFESP / Residência Médica)</h3>
<p>Idosa de 82 anos é admitida em enfermaria de clínica médica em coma, hipotérmica com temperatura retal de 32,5°C, bradicárdica (FC 44 bpm), com retenção aguda de CO2 demonstrada na gasometria (PaCO2 de 64 mmHg). A hipótese diagnóstica primária firmada pela equipe é de Coma Mixedematoso. Antes de administrar a dose de ataque intravenosa de Levotiroxina, qual fármaco DEVE ser obrigatoriamente administrado pela via intravenosa e qual a justificativa fisiopatológica dessa conduta?</p>
<ul>
  <li><strong>A)</strong> Bicarbonato de sódio a 8,4%; para prevenir a acidose metabólica paradoxal do líquor.</li>
  <li><strong>B)</strong> Hidrocortisona em dose farmacológica (100 mg IV); para prevenir a precipitação de uma crise adrenal aguda fatal por falência adrenocortical associada.</li>
  <li><strong>C)</strong> Propranolol em bólus venoso; para prevenir arritmias hiperadrenérgicas reflexas pós-levotiroxina.</li>
  <li><strong>D)</strong> Solução de Lugol a 10%; para ativar as desiodases hepáticas e acelerar a conversão em T3.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Bicarbonato não trata coma mixedematoso e induz acidose liquórica em vez de preveni-la.</li>
  <li><em>Alternativa B está CORRETA:</em> Pacientes com hipotireoidismo profundo e coma mixedematoso frequentemente apresentam insuficiência adrenal concomitante (por autoimunidade poliglandular associada ou atrofia hipofisária/adrenal secundária ao hipometabolismo). Se a reposição de hormônio tireoidiano for administrada isoladamente, haverá um aumento súbito do metabolismo celular e da depuração hepática do pouco cortisol circulante residual, deflagrando uma <strong>Crise Adrenal Aguda fulminante com colapso vascular e choque irreversível</strong>. Portanto, a <strong>Hidrocortisona (100 mg IV) deve ser administrada obrigatoriamente ANTES ou SIMULTANEAMENTE à Levotiroxina</strong>.</li>
  <li><em>Alternativa C está incorreta:</em> A paciente já se encontra gravemente bradicárdica (44 bpm) e em choque; o betabloqueador causaria parada cardíaca em assistolia.</li>
  <li><em>Alternativa D está incorreta:</em> Solução de Lugol bloqueia a glândula tireoide e agravaria ainda mais o hipotireoidismo profundo.</li>
</ul>

<h3>Questão 5 (ENAMED / Prova Nacional)</h3>
<p>Homem de 68 anos, portador de insuficiência coronariana crônica com infarto agudo do miocárdio prévio e insuficiência cardíaca classe funcional II (NYHA), apresenta exames de rotina que revelam: TSH de 28 mUI/L e T4 Livre de 0,3 ng/dL, confirmando o diagnóstico de Hipotireoidismo Primário Clínico. Ao prescrever o tratamento de reposição hormonal com Levotiroxina sódica, qual deve ser a estratégia posológica inicial adotada pelo médico?</p>
<ul>
  <li><strong>A)</strong> Dose plena de reposição imediata de 1,6 mcg/kg/dia para restabelecer o débito cardíaco com máxima rapidez.</li>
  <li><strong>B)</strong> Iniciar com dose baixa de 12,5 a 25 mcg/dia, titulando progressivamente a cada 6 a 8 semanas com base no TSH e na tolerância coronariana.</li>
  <li><strong>C)</strong> Associar Liotironina (T3) em dose alta para evitar o remodelamento ventricular esquerdo adverso.</li>
  <li><strong>D)</strong> Não tratar o hipotireoidismo, pois a elevação do TSH protege o miocárdio isquêmico do estresse oxidativo.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Em idosos ou portadores de coronariopatia aterosclerótica crônica prévia, iniciar com dose plena (1,6 mcg/kg/dia) aumenta abruptamente a frequência cardíaca, a contratilidade e o consumo miocárdico de oxigênio em um sistema vascular estenosado, precipitando angina instável, infarto agudo do miocárdio ou arritmias ventriculares graves.</li>
  <li><em>Alternativa B está CORRETA:</em> A regra de ouro no idoso ou coronariopata é <strong>"iniciar devagar e titular devagar" (start low, go slow)</strong>. Deve-se prescrever uma <strong>dose inicial muito baixa de 12,5 a 25 mcg/dia de Levotiroxina</strong> em jejum, avaliando cuidadosamente a tolerância clínica e aumentando a dose em degraus de 12,5 a 25 mcg a cada 6 a 8 semanas, guiado pela dosagem seriada de TSH.</li>
  <li><em>Alternativa C está incorreta:</em> A liotironina (T3) induz picos séricos rápidos que descompensam agudamente a isquemia coronariana, sendo formalmente evitada em cardiopatas.</li>
  <li><em>Alternativa D está incorreta:</em> O hipotireoidismo clínico descompensado (TSH 28 e T4L 0,3) agrava a dislipidemia, piora a função endotelial e reduz a contratilidade miocárdica, devendo ser obrigatoriamente tratado com cautela.</li>
</ul>

<h3>Questão 6 (USP-RP / Residência Médica)</h3>
<p>Uma mulher de 35 anos realiza ultrassonografia cervical de rotina que identifica nódulo tireoidiano sólido em lobo direito medindo 1,4 cm de maior diâmetro, classificado pelo radiologista como ACR TI-RADS 5 devido à presença de hipoecogenicidade marcante, margens espiculadas irregulares e múltiplos focos de microcalcificações pontiformes. A dosagem sérica de TSH é de 1,8 mUI/L (normal). A paciente foi submetida a Punção Aspirativa por Agulha Fina (PAAF) guiada por USG, cujo laudo citopatológico revelou: "Presença de células foliculares exibindo atipia nuclear acentuada, com inclusões intranucleares em vidro fosco (órfã Annie) e fendas nucleares longitudinais (coffee-bean grooves), compatível com Carcinoma Papilífero de Tireoide (Categoria VI de Bethesda)". Qual é a conduta cirúrgica padronizada?</p>
<ul>
  <li><strong>A)</strong> Seguimento ultrassonográfico semestral, visto que o nódulo mede menos de 2,0 cm.</li>
  <li><strong>B)</strong> Tireoidectomia Total com indicação formal de avaliação e esvaziamento linfonodal cervical central conforme achados cirúrgicos e ultrassonográficos.</li>
  <li><strong>C)</strong> Radioiodoterapia ablativa com dose terapêutica de Iodo-131 em regime ambulatorial, dispensando procedimento cirúrgico.</li>
  <li><strong>D)</strong> Tratamento medicamentoso com Metimazol em altas doses para induzir apoptose tumoral por bloqueio da peroxidase.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> O laudo citológico é Bethesda VI (malignidade confirmada de 97% a 99%) em nódulo com mais de 1,0 cm e características de alto risco. A conduta é cirúrgica e não expectante.</li>
  <li><em>Alternativa B está CORRETA:</em> A Categoria VI de Bethesda confirma o diagnóstico citológico de malignidade (neste caso, as inclusões nucleares e fendas são patognomônicas do <strong>Carcinoma Papilífero de Tireoide</strong>). O tratamento de escolha padrão é o <strong>Tratamento Cirúrgico com Tireoidectomia Total</strong> (podendo-se discutir lobectomia apenas em microcarcinomas &lt; 1 cm estritamente unifocais e sem extensão), associada à exploração e esvaziamento do compartimento linfonodal cervical central (nível VI) se houver suspeita de acometimento metastático ou fatores de alto risco.</li>
  <li><em>Alternativa C está incorreta:</em> A radioiodoterapia no câncer diferenciado de tireoide é uma terapia <strong>adjuvante pós-operatória</strong> (para ablação de remanescentes e metástases), sendo ineficaz se a glândula inteira estiver presente no leito cervical.</li>
  <li><em>Alternativa D está incorreta:</em> Tionamidas não possuem qualquer ação antineoplásica no carcinoma tireoidiano.</li>
</ul>
`
    },
    {
      id: 'pontos-chave-enamed-disturbios-tireoide',
      title: '12. Pontos de Alto Rendimento para o ENAMED e Diretrizes Finais',
      body_html: `
<h3>Os Dez Mandamentos dos Distúrbios Tireoidianos na Prova de Residência</h3>
<ul>
  <li><strong>1. Distinção Fisiopatológica de Graves:</strong> Doença de Graves cursa com <strong>TRAb positivo</strong>, bócio difuso vascular com sopro/frêmito, oftalmopatia infiltrativa patognomônica e <strong>hipercaptação difusa (&gt; 40%) na cintilografia com 131-I</strong>.</li>
  <li><strong>2. Diagnóstico da Tireoidite de De Quervain:</strong> Dor cervical lancinante à palpação que irradia para ouvidos, após infecção viral, com <strong>VHS/PCR elevadíssimos e captação de iodo nula (&lt; 1%)</strong> na cintilografia. Tratar com AINEs ou Prednisona. <em>Proibido usar tionamidas ou radioiodo!</em></li>
  <li><strong>3. Escolha das Tionamidas:</strong> <strong>Metimazol</strong> é a droga de escolha em praticamente todos os pacientes. O <strong>Propiltiouracil (PTU)</strong> é reservado estritamente para o <strong>1º trimestre da gestação</strong> (metimazol causa aplasia cutis e atresia de coanas) e na <strong>Tempestade Tireoidiana</strong> (inibe desiodase D1 periférica).</li>
  <li><strong>4. Emergência da Agranulocitose por Tionamidas:</strong> Orientar todo paciente a <strong>suspender a droga e colher hemograma imediato se apresentar febre ou dor de garganta</strong>. Neutrófilos &lt; 500/mm³ = internar, isolamento, Cefepime e Filgrastim (G-CSF). <em>Nunca mais prescrever tionamidas (50% de reação cruzada com PTU)!</em></li>
  <li><strong>5. Bloqueio em 4 Etapas na Tempestade Tireoidiana:</strong> (1º) Propranolol IV/VO; (2º) PTU em altas doses; (3º) <strong>Lugol/Iodo inorgânico administrado OBRIGATORIAMENTE 1 HORA APÓS o PTU</strong>; (4º) Hidrocortisona IV. <em>Proibido usar AAS (desloca T4 da TBG)!</em></li>
  <li><strong>6. Tomada Correta da Levotiroxina:</strong> Tomar pela manhã em <strong>jejum rigoroso com água pura, aguardando 30 a 60 minutos antes do desjejum</strong>. Espaçar por 4 horas de sulfato ferroso, cálcio e antiácidos.</li>
  <li><strong>7. Regra Posológica no Idoso / Cardiopata:</strong> No adulto jovem: dose plena de 1,6 mcg/kg/dia. No idoso (&gt; 65 anos) ou coronariopata: <strong>iniciar em dose muito baixa (12,5 a 25 mcg/dia) com titulação lenta</strong> para não precipitar angina, infarto ou arritmias.</li>
  <li><strong>8. Quando Tratar Hipotireoidismo Subclínico:</strong> Confirmar TSH em 2 a 3 meses. Tratar com Levotiroxina se: <strong>TSH &ge; 10 mUI/L</strong>, gestantes ou planejamento reprodutivo, <strong>Anti-TPO fortemente positivo</strong>, presença de bócio ou sintomas inequívocos. <em>Não tratar em idosos &ge; 80 anos!</em></li>
  <li><strong>9. Emergência do Coma Mixedematoso:</strong> Idoso hipotérmico (&lt; 35°C), bradicárdico, hipoventilando (PaCO2 alto) e em coma. Conduta salvadora: <strong>Hidrocortisona 100 mg IV IMEDIATA (antes da levotiroxina para evitar colapso adrenal)</strong> + Levotiroxina IV/VO + suporte ventilatório mecânico e reaquecimento passivo.</li>
  <li><strong>10. Investigação do Nódulo de Tireoide:</strong> Primeiro exame = <strong>TSH</strong>. Se TSH suprimido &rarr; Cintilografia ("nódulo quente" dispensa PAAF). Se TSH normal/alto &rarr; Ultrassonografia cervical ACR TI-RADS. Se suspeito &rarr; PAAF guiada por USG classificada pelo Sistema de Bethesda.</li>
</ul>

<h3>Resumo Comparativo das Principais Etiologias de Tireotoxicose</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia</th>
      <th>Mecanismo Principal</th>
      <th>Autoanticorpos Chave</th>
      <th>Captação Cintilográfica (RAIU)</th>
      <th>Tratamento de Escolha</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doença de Graves</strong></td>
      <td>Hiperprodução autônoma estimulada por TRAb</td>
      <td><strong>TRAb positivo (95-98%)</strong></td>
      <td><strong>Hipercaptação difusa (&gt; 35-60%)</strong></td>
      <td>Metimazol oral; radioiodo (131-I) ou cirurgia se refratário.</td>
    </tr>
    <tr>
      <td><strong>Bócio Multinodular Tóxico</strong></td>
      <td>Autonomia folicular monoclonal múltipla</td>
      <td>TRAb negativo</td>
      <td>Padrão heterogêneo em "mosaico"</td>
      <td>Radioiodoterapia ou Cirurgia (tionamidas apenas para preparo).</td>
    </tr>
    <tr>
      <td><strong>Adenoma Tóxico (Plummer)</strong></td>
      <td>Nódulo autônomo único hiperfuncionante</td>
      <td>TRAb negativo</td>
      <td>Nódulo hipercaptante único com supressão do parênquima</td>
      <td>Radioiodoterapia ou Lobectomia cirúrgica.</td>
    </tr>
    <tr>
      <td><strong>Tireoidite de De Quervain</strong></td>
      <td>Lise inflamatória viral pós-IVAS com dor</td>
      <td>TRAb negativo; <strong>VHS &gt; 50-100</strong></td>
      <td><strong>Captação Nula / Suprimida (&lt; 1-2%)</strong></td>
      <td>AINEs ou Prednisona oral + Propranolol (tionamidas proibidas).</td>
    </tr>
    <tr>
      <td><strong>Tireoidite Silenciosa / Pós-parto</strong></td>
      <td>Lise autoimune indolor transitória</td>
      <td>Anti-TPO positivo; TRAb negativo</td>
      <td><strong>Captação Nula (&lt; 2%)</strong></td>
      <td>Propranolol na fase tirotóxica; L-T4 se fase hipotireóidea sintomática.</td>
    </tr>
    <tr>
      <td><strong>Tireotoxicose Fictícia</strong></td>
      <td>Ingestão exógena de levotiroxina</td>
      <td>TRAb negativo; <strong>Tireoglobulina indetectável</strong></td>
      <td><strong>Captação Zero (&lt; 1%)</strong></td>
      <td>Suspensão da droga exógena e suporte com betabloqueador.</td>
    </tr>
  </tbody>
</table>
`
    }
  ],
  references: [
    {
      title: 'Diretrizes Clínicas da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) — Diagnóstico e Tratamento do Hipertireoidismo e Hipotireoidismo',
      url: 'https://www.endocrino.org.br'
    },
    {
      title: 'American Thyroid Association (ATA) Guidelines for Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis. Thyroid',
      url: 'https://www.liebertpub.com/doi/10.1089/thy.2016.0229'
    },
    {
      title: 'American Thyroid Association (ATA) Guidelines for the Treatment of Hypothyroidism. Thyroid',
      url: 'https://www.liebertpub.com/doi/10.1089/thy.2014.0028'
    },
    {
      title: 'Burch HB, Wartofsky L. Life-Threatening Thyrotoxicosis: Thyroid Storm. Endocrinol Metab Clin North Am',
      url: 'https://www.sciencedirect.com/science/article/pii/S088985291830386X'
    },
    {
      title: 'The Bethesda System for Reporting Thyroid Cytopathology: Definitions, Criteria, and Explanatory Notes. Springer',
      url: 'https://link.springer.com/book/10.1007/978-3-319-60570-8'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finished ${book.slug}: ${chars} useful characters.`);
