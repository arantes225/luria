// scripts/bloco-07-builders/build-151-part5.mjs

export const sec7 = {
  id: "anemia-aplasica-mielodisplasia-e-sintese-pratica-anemias",
  title: "7. Insuficiência Medular: Anemia Aplásica, Síndromes Mielodisplásicas e Algoritmo Síntese",
  body_html: `
<p>O espectro propedêutico das anemias no adulto estaria incompleto sem o estudo aprofundado dos estados de falência e insuficiência medular primária, nos quais a anemia manifesta-se tipicamente como hipoproliferativa (IPR &lt; 2,0), frequentemente acompanhada de citopenias nas demais linhagens celulares (bicitopenia ou pancitopenia). Duas entidades arquetípicas da hematologia clínica destacam-se nesse cenário: a <strong>Anemia Aplásica (Aplasia de Medula)</strong> e as <strong>Síndromes Mielodisplásicas (SMD)</strong>.</p>

<h3>7.1. Anemia Aplásica (Aplasia de Medula Óssea)</h3>
<p>A Anemia Aplásica é uma síndrome caracterizada pela <strong>pancitopenia no sangue periférico associada à hipocelularidade profunda da medula óssea</strong>, com substituição do tecido hematopoiético ativo por tecido adiposo maduro, sem evidência de fibrose reticulínica, infiltração neoplásica ou blastos anômalos. Acomete indivíduos de qualquer faixa etária, com pico bimodal de incidência (entre 15 e 25 anos e acima dos 60 anos).</p>

<p><strong>Fisiopatologia Imunológica:</strong> Em mais de 80% dos casos de anemia aplásica adquirida, o mecanismo central é uma <strong>destruição autoimune mediada por linfócitos T citotóxicos (CD8+) autorreativos hiperativados contra a célula-tronco hematopoiética pluripotente (CD34+)</strong>. Os linfócitos T secretam concentrações elevadas de Interferon-gama (IFN-gama) e Fator de Necrose Tumoral-alfa (TNF-alfa), os quais induzem a superexpressão da via do receptor Fas/FasL nas células-tronco, deflagrando apoptose em massa dos progenitores de todas as linhagens.</p>

<p><strong>Etiologias e Fatores Desencadeantes:</strong></p>
<ul>
  <li><strong>Idiopática (Autoimune Primária):</strong> Responde pela grande maioria dos casos clínicos.</li>
  <li><strong>Fármacos e Agentes Químicos Tóxicos:</strong> Cloranfenicol (reação idiossincrática imune grave), sais de ouro, anticonvulsivantes (carbamazepina), benzeno e derivados de solventes industriais.</li>
  <li><strong>Infecções Virais (Hepatite Pós-Aplasia):</strong> Síndrome de aplasia medular grave que surge 2 a 3 meses após um episódio de hepatite aguda soronegativa (não viral pelos vírus A, B ou C), parvovírus B19 e vírus Epstein-Barr.</li>
  <li><strong>Formas Congênitas / Genéticas:</strong> <strong>Anemia de Fanconi</strong> (doença autossômica recessiva por defeito de reparo do DNA, cursando com manchas café-com-leite, baixa estatura, anomalias esqueléticas de polegar e rádio e alta propensão a leucemia mieloide aguda) e Disceratose Congênita (defeito nos complexos da telomerase).</li>
</ul>

<div class="clinical-box highlight">
  <h4>Critérios de Gravidade de Camitta para Anemia Aplásica</h4>
  <p>O diagnóstico de certeza exige <strong>Biópsia de Medula Óssea</strong> demonstrando celularidade global &lt; 25% (ou entre 25% e 50% se menos de 30% for composto por células hematopoiéticas ativas). Conforme os Critérios Internacionais de Camitta, classifica-se a gravidade:</p>
  <ul>
    <li><strong>Anemia Aplásica Grave (AAG):</strong> Presença de hipocelularidade medular &lt; 25% <strong>+</strong> Pelo menos 2 dos 3 critérios no sangue periférico:
      <ol>
        <li><strong>Contagem Absoluta de Neutrófilos (CAN) &lt; 500/mm³;</strong></li>
        <li><strong>Contagem de Plaquetas &lt; 20.000/mm³;</strong></li>
        <li><strong>Contagem Absoluta de Reticulócitos &lt; 20.000/mm³ (ou reticulócitos corrigidos &lt; 1%).</strong></li>
      </ol>
    </li>
    <li><strong>Anemia Aplásica Muito Grave (AAMG):</strong> Preenche todos os critérios de AAG associada a <strong>CAN &lt; 200/mm³</strong> (risco iminente e crítico de sepse bacteriana fulminante e infecções fúngicas invasivas).</li>
  </ul>
</div>

<p><strong>Abordagem Terapêutica da Anemia Aplásica Grave:</strong></p>
<ol>
  <li><strong>Transplante de Células-Tronco Hematopoiéticas Alogênico (TCTH):</strong> É o tratamento curativo de primeira escolha para pacientes jovens (&lt; 40-50 anos) com doador aparentado HLA-idêntico (irmão totalmente compatível). Apresenta taxas de sobrevida livre de doença superiores a 80-90%. <em>Aviso Crítico de Prova:</em> Evitar transfusões de sangue desnecessárias antes do transplante para prevenir aloimunização contra antígenos menores de histocompatibilidade, o que eleva a taxa de rejeição do enxerto.</li>
  <li><strong>Terapia Imunossupressora Combinada (ATG + Ciclosporina + Eltrombopague):</strong> Indicada para pacientes acima de 40 a 50 anos ou jovens sem doador compatível. A combinação de <strong>Globulina Antitimócito (ATG de cavalo ou coelho)</strong> com <strong>Ciclosporina A oral</strong> e o agonista oral do receptor de trombopoietina <strong>Eltrombopague</strong> atinge taxas de resposta hematológica completa ou parcial em mais de 70% a 85% dos pacientes.</li>
</ol>

<h3>7.2. Síndromes Mielodisplásicas (SMD)</h3>
<p>As Síndromes Mielodisplásicas compreendem um grupo heterogêneo de neoplasias clonais da célula-tronco hematopoiética que acometem predominantemente indivíduos idosos (idade mediana ao diagnóstico &gt; 70 anos). A marca patognomônica da SMD é a presença de <strong>Hematopoiese Ineficaz</strong> associada a <strong>Displasia Celular (Morfologia Anômala)</strong> em uma ou mais linhagens medulares, resultando no paradoxo clássico: <strong>Pancitopenia ou citopenias no sangue periférico associadas a uma Medula Óssea Hipercelular ou Normocelular</strong> repleta de precursores displásicos que sofrem apoptose intramedular acelerada.</p>

<p><strong>Apresentação Laboratorial e Morfológica:</strong></p>
<ul>
  <li>Anemia macrocítica refratária (VCM &gt; 100 fL) com reticulocitopenia.</li>
  <li><strong>Neutrófilos com Anomalia de Pelger-Huët Adquirida:</strong> Neutrófilos hiposegmentados com apenas dois lobos simétricos em formato de óculos ou halteres ("pseudo-Pelger-Huët") associados a hipogranulação citoplasmática.</li>
  <li>Plaquetas gigantes bizarras desgranuladas ao esfregaço.</li>
  <li><strong>Sideroblastos em Anel na Medula Óssea:</strong> Precursores eritroides que exibem cinco ou mais grânulos de ferro patológico circundando mais de um terço do núcleo celular quando corados pelo Azul da Prússia de Perls, decorrentes de acúmulo mitocondrial de ferro por mutação no gene <em>SF3B1</em>.</li>
  <li><strong>Risco de Transformação Neoplásica:</strong> As SMDs possuem propensão variável para evoluir para <strong>Leucemia Mieloide Aguda (LMA secundária à SMD)</strong>. O escore prognóstico internacional (IPSS-R) estratifica os pacientes com base na porcentagem de blastos na medula (corte de &gt;= 20% de blastos define transformação em LMA), citogenética clonal (ex.: del 5q, monossomia 7) e profundidade das citopenias.</li>
</ul>

<div class="clinical-box highlight">
  <h4>A Síndrome 5q- (Del 5q Isolada)</h4>
  <p>Subtipo clássico de SMD que acomete preferencialmente mulheres idosas, caracterizada por anemia macrocítica refratária grave associada a <strong>contagem de plaquetas paradoxalmente normal ou elevada (trombocitose)</strong> e micromegacariócitos com núcleo unilobulado na medula. Apresenta evolução indolente e <strong>resposta clínica espetacular com independência transfusional ao tratamento com Lenalidomida oral</strong>.</p>
</div>

<h3>7.3. Algoritmo Diagnóstico Mestre das Anemias no Adulto (LURIA Protocol)</h3>
<p>Para sistematizar o raciocínio clínico diante de qualquer caso de anemia no adulto, siga o fluxo de decisão estruturado:</p>
<ol>
  <li><strong>Passo 1: Avaliar os Reticulócitos Corrigidos (IPR)</strong>
    <ul>
      <li><em>IPR &gt; 2,0 a 2,5 (Hiperproliferativa / Regenerativa):</em> Investigar <strong>Anemias Hemolíticas</strong> (solicitar Bilirrubina Indireta, LDH, Haptoglobina e Teste de Coombs Direto) ou <strong>Sangramento Agudo Recente</strong>. Se Coombs positivo: AHAI (anticorpos quentes vs frios). Se Coombs negativo com esquizócitos abundantes: Microangiopatia Trombótica (PTT vs SHU).</li>
      <li><em>IPR &lt; 2,0 (Hipoproliferativa / Arregenerativa):</em> Seguir para o Passo 2 com os índices morfológicos do VCM.</li>
    </ul>
  </li>
  <li><strong>Passo 2: Avaliar o Volume Corpuscular Médio (VCM)</strong>
    <ul>
      <li><em>VCM &lt; 80 fL (Microcítica e Hipocrômica):</em>
        <ul>
          <li>Solicitar Cinética do Ferro completa (Ferro, Ferritina, TIBC e Saturação de Transferrina).</li>
          <li>Ferritina &lt; 30 ng/mL e IST &lt; 15% -> <strong>Anemia Ferropriva</strong> (investigar TGI em homens e pós-menopausa!).</li>
          <li>Ferritina &gt; 100 ng/mL, Ferro baixo e TIBC baixa -> <strong>Anemia de Doença Crônica</strong>.</li>
          <li>Cinética de ferro normal com RDW normal e Mentzer &lt; 13 -> Solicitar <strong>Eletroforese de Hemoglobina</strong> para confirmação de Traço Talassêmico (HbA2 elevada &gt; 3,5% na Beta-Talassemia menor).</li>
        </ul>
      </li>
      <li><em>VCM entre 80 e 100 fL (Normocítica e Normocrômica):</em>
        <ul>
          <li>Checar creatinina e taxa de filtração glomerular -> <strong>Anemia da Doença Renal Crônica</strong> (déficit de síntese de EPO).</li>
          <li>Checar provas inflamatórias (VHS, PCR) -> <strong>Anemia de Doença Crônica inicial</strong>.</li>
          <li>Se bicitopenia ou pancitopenia -> Solicitar Mielograma e Biópsia de Medula Óssea para afastar Aplasia Medular ou Infiltração Neoplásica.</li>
        </ul>
      </li>
      <li><em>VCM &gt; 100 fL (Macrocítica):</em>
        <ul>
          <li>Analisar o esfregaço de sangue periférico em busca de neutrófilos hipersegmentados.</li>
          <li>Se neutrófilos hipersegmentados e macro-ovalócitos presentes -> <strong>Anemia Megaloblástica</strong>: dosar Vitamina B12, Folato sérico/eritrocitário, Ácido Metilmalônico e Homocisteína. Se deficiência de B12, solicitar anticorpos anti-fator intrínseco para Anemia Perniciosa.</li>
          <li>Se ausência de megaloblastose -> Avaliar história de alcoolismo crônico, hepatopatias, disfunção tireoidiana (dosar TSH) ou investigar Mielodisplasia (SMD).</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
`
};
