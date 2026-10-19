// scripts/bloco-07-builders/build-156-part1.mjs

export const sec1 = {
  id: "fundamentos-hematopoiese-e-classificacao-das-neoplasias-hematologicas",
  title: "1. Fisiologia da Hematopoiese, Biologia Celular dos Blastos e Classificação Geral das Neoplasias Hematológicas",
  body_html: `
<h3>1.1 A Arquitetura da Hematopoiese Medular e a Diferenciação Celular</h3>
<p>O tecido hematopoético normal na medula óssea adulta é um dos sistemas biológicos de maior taxa proliferativa do organismo humano, produzindo diariamente cerca de $10^{11}$ a $10^{12}$ novas hemácias, plaquetas e leucócitos funcionais. Esse processo estritamente regulado origina-se a partir de uma população rara de <strong>Células-Tronco Hematopoéticas Pluripotentes (HSC - <em>Hematopoietic Stem Cells</em>)</strong>, caracterizadas por duas propriedades biológicas fundamentais: a capacidade de <em>autorrenovação contínua</em> e a capacidade de <em>diferenciação multipotencial</em>.</p>

<p>No microambiente do nicho medular osteoblástico e vascular, a célula-tronco hematopoética pluripotente sofre uma primeira bifurcação dicotômica irreversível que divide toda a hematopoiese em duas grandes linhagens filogenéticas:</p>
<ol>
  <li><strong>Progenitor Mieloide Comum (CMP - <em>Common Myeloid Progenitor</em>):</strong> Sob a influência de citocinas específicas (EPO, TPO, G-CSF, GM-CSF, IL-3), diferencia-se sucessivamente nos progenitores eritroides (hemácias), megacariocíticos (plaquetas), granulocíticos (neutrófilos, eosinófilos, basófilos) e monocíticos (monócitos e macrófagos teciduais).</li>
  <li><strong>Progenitor Linfoide Comum (CLP - <em>Common Lymphoid Progenitor</em>):</strong> Sob o comando de IL-7 e fatores de transcrição (PAX5, NOTCH1), origina a linhagem dos <strong>Linfócitos B</strong> (maturação na medula óssea), <strong>Linfócitos T</strong> (migração e maturação no timo) e <strong>Células Natural Killer (NK)</strong>.</li>
</ol>

<div class="clinical-box highlight">
  <h4>Conceito Fisiopatológico Fundamental: Leucemias versus Linfomas</h4>
  <p>A distinção clássica entre leucemias e linfomas baseia-se no sítio anatômico primário de transformação maligna e na cinética de expansão neoplásica:</p>
  <ul>
    <li><strong>Leucemias:</strong> Neoplasias malignas que se originam primariamente na <strong>medula óssea</strong>, caracterizadas pela proliferação clonal desordenada de células progenitoras (blastos nas agudas ou células maduras anormais nas crônicas) que invadem e substituem o parênquima hematopoético sadio, 'transbordando' precocemente para a circulação sanguínea periférica.</li>
    <li><strong>Linfomas:</strong> Neoplasias malignas sólidas originadas predominantemente em <strong>órgãos linfoides secundários (linfonodos, baço, anel de Waldeyer, placas de Peyer intestinais)</strong> a partir de linfócitos em diferentes estágios de diferenciação imunológica tecidual. Manifestam-se primariamente como massas linfonodais ou esplenomegalia, podendo em fases avançadas 'leucemizar' (infiltrar secundariamente a medula óssea e o sangue periférico).</li>
  </ul>
</div>

<h3>1.2 Biologia Molecular e Cinética das Leucemias Agudas versus Crônicas</h3>
<p>O comportamento clínico e a evolução temporal das neoplasias hematológicas determinam sua categorização em agudas ou crônicas, espelhando o nível hierárquico do bloqueio maturativo:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Comparação</th>
      <th>Leucemias Agudas (LMA e LLA)</th>
      <th>Leucemias Crônicas (LMC e LLC)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estágio de Bloqueio Maturativo</strong></td>
      <td><strong>Bloqueio precoce da diferenciação</strong>: proliferação descontrolada de <strong>células imaturas primitivas (BLASTOS)</strong> que perderam a capacidade de maturação final.</td>
      <td><strong>Ausência de bloqueio maturativo</strong>: proliferação clonal de células que <strong>mantêm a capacidade de se diferenciar em formas morfologicamente maduras</strong> (ou quase maduras), porém anormais e imortais.</td>
    </tr>
    <tr>
      <td><strong>Critério Diagnóstico Medular</strong></td>
      <td>Presença de <strong>&ge; 20% de blastos na medula óssea ou sangue periférico</strong> (Critério OMS/ICC); ou presença de alterações genéticas definidoras recorrentes específicas independente da contagem de blastos.</td>
      <td>Hiperplasia medular com &lt; 20% de blastos (geralmente &lt; 5-10% na fase crônica); exuberante proliferação de elementos maduros.</td>
    </tr>
    <tr>
      <td><strong>Início e Curso Clínico</strong></td>
      <td><strong>Instalação abrupta, fulminante e catastrófica (dias a semanas)</strong>; emergência médica onco-hematológica que evolui fatalmente para o óbito em semanas a meses se não tratada imediatamente com quimioterapia intensiva.</td>
      <td><strong>Instalação insidiosa, indolente e assintomática (meses a anos)</strong>; frequentemente descoberta como achado incidental em hemograma de rotina ambulatorial.</td>
    </tr>
    <tr>
      <td><strong>Quadro Clínico Dominante</strong></td>
      <td><strong>Síndrome de Falência Medular Aguda (Pancitopenia com Blastos):</strong> anemia grave sintomática, plaquetopenia grave com hemorragias espontâneas e neutropenia febril grave com infecções bacterianas invasivas.</td>
      <td>Leucocitose exuberante sustentada, esplenomegalia maciça (LMC), adenomegalia generalizada indolente (LLC) e sintomas constitucionais lentos.</td>
    </tr>
  </tbody>
</table>

<h3>1.3 O Diagnóstico Hematológico Moderno: A Integração das Quatro Plataformas</h3>
<p>Na hematologia contemporânea de alto padrão, o diagnóstico, a classificação estratificada da OMS e a definição do prognóstico das leucemias exigem a integração indissociável de quatro pilares diagnósticos complementares:</p>
<ol>
  <li><strong>Morfologia Citológica (Mielograma / Sangue Periférico):</strong> Avaliação microscópica da celularidade, relação núcleo/citoplasma, padrão de cromatina, presença de nucléolos evidentes, granulações citoplasmáticas e inclusões patognomônicas (como os <em>Bastonetes de Auer</em>).</li>
  <li><strong>Citoquímica:</strong> Reações enzimáticas clássicas em lâmina: a <strong>Mieloperoxidase (MPO) e o Negro de Sudão B (SBB)</strong> são estritamente <strong>positivos na linhagem mieloide (LMA)</strong> e negativos na linhagem linfoide (LLA).</li>
  <li><strong>Imunofenotipagem por Citometria de Fluxo (CF):</strong> Identificação precisa dos antígenos de diferenciação celular de membrana e citoplasmáticos (<em>Cluster of Differentiation - CD</em>), definindo com fidelidade matemática a linhagem e o estágio maturativo dos blastos:
    <ul>
      <li><em>Marcadores de Imaturidade / Blastos:</em> CD34, CD117, HLA-DR, TdT (Desoxinucleotidil transferase terminal - marcador intranuclear típico de linfoblastos);</li>
      <li><em>Marcadores Mieloides:</em> MPO citoplasmática (o mais específico), CD13, CD33, CD11b, CD14, CD64 (monocíticos), CD41/CD61 (megacariocíticos);</li>
      <li><em>Marcadores da Linhagem Linfoide B:</em> CD19, CD20, CD22, CD79a citoplasmático e PAX5;</li>
      <li><em>Marcadores da Linhagem Linfoide T:</em> CD3 citoplasmático e de superfície (o mais específico da linhagem T), CD2, CD5, CD7, CD4 e CD8.</li>
    </ul>
  </li>
  <li><strong>Citogenética (Cariótipo com Banda G) e Biologia Molecular (FISH, RT-PCR e NGS):</strong> Identificação de translocações cromossômicas recorrentes, fusões gênicas (ex.: <em>BCR-ABL1</em>, <em>PML-RARA</em>) e mutações pontuais (ex.: <em>FLT3-ITD</em>, <em>NPM1</em>, <em>TP53</em>, <em>JAK2</em>), que definem a conduta terapêutica direcionada (terapia-alvo) e o risco de recidiva.</li>
</ol>
`
};

export const sec2 = {
  id: "leucemia-mieloide-aguda-e-leucemia-promielocitica-aguda",
  title: "2. Leucemia Mieloide Aguda (LMA) e Leucemia Promielocítica Aguda (LPA): Da Morfologia com Bastonetes de Auer à Emergência da CIVD",
  body_html: `
<h3>2.1 Epidemiologia, Patogênese e Quadro Clínico da Leucemia Mieloide Aguda (LMA)</h3>
<p>A <strong>Leucemia Mieloide Aguda (LMA)</strong> é a leucemia aguda mais prevalente no indivíduo adulto, respondendo por cerca de 80% das leucemias agudas acima dos 20 anos de idade. Sua incidência eleva-se progressivamente com o envelhecimento, atingindo pico após os 65 a 70 anos (idade mediana ao diagnóstico: 68 anos). Pode surgir <em>de novo</em> em indivíduos hígidos ou como <strong>leucemia secundária</strong> após exposição prévia a agentes quimioterápicos leucemogênicos (inibidores da topoisomerase II, agentes alquilantes), radiação ionizante, solventes industriais (benzeno) ou como evolução clonal tardia de Síndromes Mielodisplásicas (SMD) e Neoplasias Mieloproliferativas crônicas.</p>

<p>O quadro clínico decorre diretamente da <strong>Síndrome de Ocupação Medular (Insuficiência da Hematopoiese Sadia)</strong>:</p>
<ul>
  <li><strong>Síndrome Anêmica Intensa:</strong> Astenia profunda e incapacitante, palidez cutaneomucosa descorada, taquicardia aos mínimos esforços, palpitações e agravamento de angina miocárdica prévia em idosos.</li>
  <li><strong>Síndrome Plaquetopênica / Hemorrágica:</strong> Trombocitopenia grave (&lt; 20.000-50.000/mm³) manifestando-se como petéquias disseminadas em membros inferiores, equimoses espontâneas extensas, gengivorragia espontânea ao escovar os dentes, epistaxe profusa, metrorragia e risco iminente de hemorragia digestiva e hemorragia do sistema nervoso central.</li>
  <li><strong>Síndrome Neutropênica / Infecciosa:</strong> Neutropenia febril grave (neutrófilos absolutos &lt; 500/mm³), com infecções bacterianas bacterêmicas fulminantes de foco cutâneo, pulmonar, perianal ou orofaríngeo por germes Gram-negativos e estafilococos.</li>
  <li><strong>Infiltração Tecidual Extramedular (Leucemia Cutânea e Hiperplasia Gengival):</strong> Infiltração tecidual maciça de blastos monocíticos (subtipos FAB M4/M5 da OMS), manifestando-se tipicamente como <strong>hiperplasia gengival exuberante e dolorosa</strong>, nódulos cutâneos violáceos ('leucemia cutis') e hepatosplenomegalia moderada.</li>
</ul>

<div class="clinical-box highlight">
  <h4>O Achado Citológico Patognomônico da LMA: Os Bastonetes de Auer</h4>
  <p>Ao exame microscópico da lâmina de sangue periférico ou aspirado de medula óssea corado por Giemsa/Leishman, o patologista busca ativamente a presença dos <strong>Bastonetes de Auer (<em>Auer rods</em>)</strong>:</p>
  <ul>
    <li><em>Definição Morfológica:</em> São inclusões citoplasmáticas lineares, alongadas, em formato de agulhas ou bastões avermelhados/róseos, resultantes da <strong>agregação anormal e cristalização coalescente de grânulos azurófilos primários ricos em lisossomos</strong>;</li>
    <li><em>Significado Clínico Diagnóstico Inequívoco:</em> A presença visual de um único bastonete de Auer no citoplasma de um blasto <strong>CONFIRMA CATEGORICAMENTE A ORIGEM MIELOIDE DA LEUCEMIA (É PATOGNOMÔNICO DE LMA!)</strong>, excluindo de forma absoluta o diagnóstico de Leucemia Linfoide Aguda (LLA jamais possui bastonetes de Auer!).</li>
    <li><em>Associação Citoquímica:</em> Os mieloblastos que contêm bastonetes de Auer apresentam reação de <strong>Mieloperoxidase (MPO) intensamente positiva</strong>.</li>
  </ul>
</div>

<h3>2.2 Leucemia Promielocítica Aguda (LPA / LMA Subtipo M3): A Maior Emergência Hematológica</h3>
<p>A <strong>Leucemia Promielocítica Aguda (LPA)</strong> representa aproximadamente 10% a 15% de todos os casos de LMA. Trata-se de uma entidade clínico-biológica ímpar na oncologia médica mundial: se não reconhecida e tratada nas primeiras horas da suspeita clínica, apresenta mortalidade de quase 100% por hemorragia catastrófica em menos de 24 a 48 horas; em contrapartida, quando tratada precocemente com a terapia-alvo correta, apresenta <strong>taxas de cura definitiva superiores a 90% a 95% sem a necessidade de transplante de medula óssea</strong>.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Biológica</th>
      <th>Características Específicas da Leucemia Promielocítica Aguda (LPA)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Citogenética e Fusão Gênica</strong></td>
      <td><strong>Translocação cromossômica recíproca t(15;17)(q24;q21)</strong>, que justapõe o gene <em>PML</em> (no cromossomo 15) ao gene do receptor alfa do ácido retinoico <em>RARA</em> (no cromossomo 17), gerando a proteína quimérica onkogênica de fusão <strong>PML-RARA</strong>. Essa oncoproteína atua como um repressor transcricional potente, bloqueando irreversivelmente a diferenciação dos promielócitos em mielócitos e granulócitos maduros.</td>
    </tr>
    <tr>
      <td><strong>Morfologia das Células de Faggot</strong></td>
      <td>Presença exuberante de promielócitos anormais volumosos com granulações azurófilas grosseiras preenchendo todo o citoplasma e múltiplos bastonetes de Auer agrupados em feixes densos e paralelos, lembrando feixes de gravetos ou lenha — as clássicas <strong>Células de Faggot (<em>Faggot cells</em>)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Fisiopatologia da Coagulação Intravascular Disseminada (CIVD)</strong></td>
      <td>Os grânulos dos promielócitos leucêmicos contêm e liberam ativamente grandes quantidades de <strong>fator tecidual (FT) pró-coagulante, anexina II (que ativa plasminogênio em plasmina) e proteases ácidas</strong>. Essa liberação desencadeia simultaneamente uma <strong>CIVD fulminante com hiperfibrinólise primária associada</strong>: consumo acelerado de plaquetas, fibrinogênio e fatores de coagulação, com lise catastrófica de coágulos formados.</td>
    </tr>
    <tr>
      <td><strong>Manifestação Clínica Cardinal</strong></td>
      <td><strong>Diátese hemorrágica maciça e precoce</strong>: sangramentos espontâneos mucosos orais e nasais graves, hematomas gigantes nos sítios de punção venosa, hemorragia pulmonar alveolar difusa e <strong>Acidente Vascular Cerebral Hemorrágico fatal</strong> (principal causa de morte precoce).</td>
    </tr>
    <tr>
      <td><strong>Laboratório de CIVD</strong></td>
      <td>Plaquetopenia severa, <strong>hipofibrinogenemia profunda (fibrinogênio plasmático &lt; 100-150 mg/dL)</strong>, alargamento expressivo do Tempo de Protrombina (TP/INR) e TTPa, com elevação maciça de <strong>D-dímero e produtos de degradação da fibrina (PDF)</strong>.</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box highlight">
  <h4>Conduta Terapêutica Emergencial de Ouro na Suspeita de LPA: O Uso Imediato do ATRA</h4>
  <ul>
    <li><strong>Regra de Ouro Inviolável de Prova e Plantão:</strong> Diante de um paciente com sangramento inexplicado associado a plaquetopenia e suspeita morfológica de promielócitos anormais na lâmina, <strong>O TRATAMENTO COM ATRA DEVE SER INICIADO IMEDIATAMENTE NA MESMA HORA, SEM AGUARDAR O RESULTADO DO CARIÓTIPO, DO FISH OU DA PCR MOLECULAR!</strong> Esperar a confirmação genética para prescrever o ATRA é considerado erro médico fatal.</li>
    <li><strong>O que é o ATRA?</strong> Trata-se do <strong>Ácido Todo-Trans-Retinoico (Tretinoína oral em doses farmacológicas de 45 mg/m²/dia)</strong>. O ATRA atua ligando-se ao domínio mutado do receptor RARA na proteína de fusão PML-RARA, forçando sua degradação proteassômica e <strong>destravando o bloqueio de maturação</strong>: os promielócitos leucêmicos são forçados a se diferenciar em neutrófilos maduros funcionais que não liberam fatores pró-coagulantes, cessando o estímulo da CIVD em 24 a 48 horas!</li>
    <li><strong>Terapia Combinada Curativa Atual (Esquema Livre de Quimioterapia Padrão-Ouro):</strong>
      <br><strong>ATRA + Trióxido de Arsênico (ATO - <em>Arsenic Trioxide</em>)</strong>. O ATO atua sinergicamente promovendo a degradação da porção PML da oncoproteína e induzindo apoptose celular direta. Esse regime alcança taxas de cura de &gt; 95% em pacientes de baixo e intermediário risco (leucócitos &le; 10.000/mm³).</li>
    <li><strong>Manejo Transfusional Agressivo de Suporte:</strong> Manter plaquetas rigorosamente &gt; 30.000 a 50.000/mm³ com transfusões seriadas; repor <strong>Crioprecipitado</strong> para manter o fibrinogênio &gt; 150 mg/dL; repor Plasma Fresco Congelado (PFC) se INR alargado.</li>
    <li><strong>Complicação Aguda: Síndrome de Diferenciação Leucêmica (Antiga Síndrome do ATRA):</strong> Surge em 10% a 25% dos pacientes nos primeiros dias de tratamento, caracterizada por febre súbita, dispneia progressiva, ganho de peso rápido com edema maleolar, derrame pleural e pericárdico e infiltrado pulmonar bilateral à radiografia, decorrente da hiperativação e migração tecidual dos neutrófilos em diferenciação que liberam citocinas inflamatórias. <em>Tratamento imediato:</em> <strong>Dexametasona 10 mg EV a cada 12 horas</strong> mantida até a resolução completa dos sintomas. Não suspender o ATRA salvo em casos de insuficiência respiratória hipoxêmica extrema com necessidade de IOT.</li>
  </ul>
</div>
`
};
