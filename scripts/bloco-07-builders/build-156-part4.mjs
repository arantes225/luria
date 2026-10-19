// scripts/bloco-07-builders/build-156-part4.mjs

export const sec6 = {
  id: "linfomas-nao-hodgkin-indolentes-vs-agressivos-ldgcb-e-burkitt",
  title: "6. Linfomas Não-Hodgkin (LNH): O Espectro dos Indolentes vs Agressivos, Linfoma Difuso de Grandes Células B (LDGCB) e Linfoma de Burkitt com Céu Estrelado",
  body_html: `
<h3>6.1 O Espectro Biológico Heterogêneo dos Linfomas Não-Hodgkin</h3>
<p>Os <strong>Linfomas Não-Hodgkin (LNH)</strong> constituem um grupo heterogêneo e complexo de neoplasias malignas clonais derivadas de linfócitos B (cerca de 85% a 90% dos casos no ocidente), linfócitos T ou células Natural Killer (NK - 10% a 15%). Apresentam incidência significativamente maior do que o Linfoma de Hodgkin (proporção de aproximadamente 6:1 a 8:1), e sua curva epidemiológica eleva-se continuamente com o envelhecimento populacional (pico após os 60 a 70 anos).</p>

<p>Do ponto de vista clínico-evolutivo e prognóstico, os LNH dividem-se em dois grandes polos biológicos contrastantes:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Clínica</th>
      <th>Linfomas Não-Hodgkin Indolentes (Baixo Grau)</th>
      <th>Linfomas Não-Hodgkin Agressivos (Alto Grau / Altíssimo Grau)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Exemplo Paradigmático</strong></td>
      <td><strong>Linfoma Folicular</strong>, Linfoma da Zona Marginal (MALT), Linfoma Linfoplasmocítico (Macroglobulinemia de Waldenström).</td>
      <td><strong>Linfoma Difuso de Grandes Células B (LDGCB)</strong> e <strong>Linfoma de Burkitt</strong>; Linfoma de Células do Manto; Linfomas T periféricos.</td>
    </tr>
    <tr>
      <td><strong>Cinética Proliferativa e Índice Ki-67</strong></td>
      <td><strong>Baixa fração proliferativa</strong> (índice Ki-67 habitualmente &lt; 20-30%); crescimento celular lento, indolente ao longo de anos.</td>
      <td><strong>Altíssima fração proliferativa</strong> (Ki-67 &gt; 70-80% no LDGCB e <strong>próximo a 100% no Linfoma de Burkitt!</strong>); duplicação tumoral galopante em dias a semanas.</td>
    </tr>
    <tr>
      <td><strong>Apresentação ao Diagnóstico</strong></td>
      <td>Linfadenopatia generalizada indolor crônica de longa data; frequentemente descoberto em <strong>Estágio III ou IV disseminado</strong> (com infiltração medular silenciosa); o paciente mantém-se assintomático e com bom estado geral.</td>
      <td>Massa tumoral linfonodal ou extranodal de <strong>crescimento explosivo e doloroso</strong>; sintomas B intensos (febre, sudorese, perda de peso) e <strong>elevação marcante de Desidrogenase Lática (LDH)</strong> sérica e ácido úrico.</td>
    </tr>
    <tr>
      <td><strong>Sensibilidade à Quimioterapia e Potencial de Cura</strong></td>
      <td><strong>Incurável com quimioterapia convencional!</strong> Responde bem inicialmente, mas apresenta recidivas crônicas sucessivas ao longo dos anos; contudo, a sobrevida média é longa (10 a 15 anos ou mais). Aplica-se a estratégia de <em>'Watch and Wait'</em> se assintomático. Risco de transformação histológica agressiva (Transformação de Richter).</td>
      <td><strong>ALTAMENTE CURÁVEL COM QUIMIOTERAPIA INTENSIVA!</strong> Se não tratado imediatamente, é fatal em semanas ou poucos meses; contudo, por possuir altíssima fração de células em divisão mitótica ativa, é <strong>extremamente quimiossensível</strong>: mais de 60% a 70% dos pacientes com LDGCB e &gt; 80-90% com Burkitt alcançam <strong>CURA DEFINITIVA COMPLETA</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>6.2 Linfoma Difuso de Grandes Células B (LDGCB): O LNH Mais Comum</h3>
<p>O <strong>Linfoma Difuso de Grandes Células B (LDGCB)</strong> é o linfoma mais prevalente de toda a hematologia mundial, correspondendo a cerca de <strong>30% a 40% de todos os novos casos de LNH</strong> em adultos. Acomete indivíduos de meia-idade e idosos (idade mediana de 64 anos), com discreto predomínio masculino.</p>
<ul>
  <li><em>Quadro Clínico:</em> Apresenta-se tipicamente como uma massa linfonodal de crescimento acelerado em pescoço, axila ou abdome, ou como <strong>doença extranodal primária em até 40% dos casos</strong>: o <strong>Trato Gastrointestinal (estômago e íleo)</strong> é o sítio extranodal mais comum (manifestando-se com dor abdominal, massa epigástrica palpável ou sangramento digestivo), seguido por ossos, tireoide, testículos e Sistema Nervoso Central primário.</li>
  <li><em>Histopatologia:</em> Destruição completa da arquitetura linfonodal por um <strong>padrão de proliferação difuso em lençol</strong> de células linfoides volumosas (grandes células com diâmetro nuclear pelo menos 2 a 3 vezes maior que o de um linfócito normal pequeno, igualando ou superando o tamanho do núcleo de um macrófago tecidual), com cromatina frouxa e nucléolos evidentes.</li>
  <li><em>Imunofenotipagem:</em> <strong>CD20 POSITIVO FORTE E UNIFORME</strong> (em praticamente 100% dos casos), CD19+, CD79a+, CD22+ e CD45+.</li>
  <li><em>O Padrão-Ouro de Tratamento Curativo:</em> Esquema imunoquimioterápico <strong>R-CHOP</strong>:
    <ul>
      <li><strong>R: Rituximabe</strong> (Anticorpo monoclonal quimérico anti-CD20 que induz citotoxicidade celular dependente de anticorpo - ADCC e lise mediada por complemento);</li>
      <li><strong>C: Ciclofosfamida</strong> (agente alquilante);</li>
      <li><strong>H: Hidroxidaunorrubicina / Doxorrubicina</strong> (antraciclina inibidora de topoisomerase II);</li>
      <li><strong>O: Oncovin / Vincristina</strong> (inibidor da polimerização de microtúbulos no fuso mitótico);</li>
      <li><strong>P: Prednisona</strong> (corticoide oral indutor de apoptose linfoide).</li>
    </ul>
    A introdução do Rituximabe ao esquema CHOP no final dos anos 1990 elevou as taxas de cura do LDGCB de 40% para mais de 65% a 70% na sobrevida global livre de progressão!
  </li>
</ul>

<div class="clinical-box highlight">
  <h4>Índice Prognóstico Internacional para Linfoma Não-Hodgkin (Escore IPI)</h4>
  <p>O IPI é o escore clínico internacional mais consagrado para estimar o risco de óbito e sobrevida em 5 anos no LDGCB. Cada fator adverso presente soma <strong>1 ponto</strong> (Mnemônico <strong>APLES</strong>):</p>
  <ul>
    <li><strong>A - Age (Idade):</strong> Idade &gt; 60 anos;</li>
    <li><strong>P - Performance Status:</strong> Escore ECOG &ge; 2 (paciente restrito ao leito por mais de 50% das horas do dia);</li>
    <li><strong>L - LDH:</strong> Desidrogenase Lática sérica elevada acima do limite superior da normalidade;</li>
    <li><strong>E - Extranodal sites:</strong> Mais de 1 sítio extranodal de acometimento tumoral (&gt; 1 sítio);</li>
    <li><strong>S - Stage:</strong> Estágio Ann Arbor avançado (Estágio III ou IV).</li>
  </ul>
  <p><em>Estratificação:</em> <strong>Baixo risco (0-1 ponto: sobrevida 73%); Baixo-médio (2 pontos: 51%); Alto-médio (3 pontos: 43%); Alto risco (4-5 pontos: 26%).</strong></p>
</div>

<h3>6.3 Linfoma de Burkitt: O Câncer Mais Rápido do Corpo Humano e o Padrão de Céu Estrelado</h3>
<p>O <strong>Linfoma de Burkitt</strong> é uma neoplasia linfoide B de altíssimo grau de malignidade, notória por possuir o <strong>tempo de duplicação tumoral mais rápido e vertiginoso de todos os cânceres humanos conhecidos (tempo de duplicação celular de apenas 24 a 48 horas!)</strong>. Divide-se em três variantes epidemiológicas e clínicas distintas:</p>
<ol>
  <li><strong>Variante Endêmica (Africana):</strong> Descrita originalmente por Denis Burkitt na África equatorial em áreas endêmicas de malária; acomete crianças de 4 a 7 anos, manifestando-se caracteristicamente como <strong>volumosa massa expansiva destrutiva na mandíbula e ossos da face</strong>; presença do vírus Epstein-Barr (EBV) em praticamente 100% dos casos.</li>
  <li><strong>Variante Esporádica (Não Endêmica):</strong> Ocorre em todo o mundo, inclusive no Brasil e EUA, acometendo crianças e adultos jovens; manifesta-se tipicamente como <strong>volumosa massa abdominal tumoral de crescimento fulminante em fossa ilíaca direita / região ileocecal</strong> (frequentemente mimetizando apendicite aguda, intussuscepção intestinal ou abdome agudo obstrutivo com ascite volumosa); associação com EBV em 30% dos casos.</li>
  <li><strong>Variante Associada à Imunodeficiência:</strong> Acomete pacientes vivendo com HIV/aids com contagens de CD4 moderadamente preservadas (&gt; 200 céls/mm³); altíssima agressividade e envolvimento precoce do SNC e medula.</li>
</ol>

<div class="clinical-box highlight">
  <h4>A Biologia Molecular do Linfoma de Burkitt: O Oncogene c-MYC</h4>
  <ul>
    <li><strong>Translocação Patognomônica:</strong> Presente em &gt; 95% dos casos: <strong>translocação cromossômica recíproca t(8;14)(q24;q32)</strong>.</li>
    <li><em>Mecanismo Genético:</em> A translocação desloca o proto-oncogene <strong>c-MYC</strong> (localizado no braço longo do cromossomo 8) para a proximidade imediata da região regulatória do gene da <strong>cadeia pesada das imunoglobulinas (IgH)</strong> (localizada no cromossomo 14). Como o promotor de IgH é constitutivamente ativo em linfócitos B, essa fusão resulta na <strong>superativação e transcrição descontrolada e contínua do fator de transcrição c-MYC</strong>.</li>
    <li><em>Variantes Raras:</em> Podem ocorrer translocações alternativas envolvendo os genes das cadeias leves das imunoglobulinas: t(2;8)(p12;q24) com cadeia leve kappa ou t(8;22)(q24;q11) com cadeia leve lambda.</li>
  </ul>
</div>

<div class="clinical-box highlight">
  <h4>O Padrão Histopatológico de 'Céu Estrelado' (Starry-Sky Pattern)</h4>
  <p>Ao exame microscópico do linfonodo ou massa abdominal corado por hematoxilina-eosina, observa-se o clássico e inconfundível padrão histológico de <strong>'Céu Estrelado' (<em>Starry-sky appearance</em>)</strong>:</p>
  <ul>
    <li><em>O 'Céu Escuro':</em> Composto por um mar denso e homogêneo de pequenos a médios linfócitos B neoplásicos basofílicos azul-escuros em proliferação frenética (índice proliferativo <strong>Ki-67 próximo a 100%</strong>, com dezenas de figuras de mitose por campo microscópico);</li>
    <li><em>As 'Estrelas Brilhantes':</em> Dispersos homogeneamente por esse mar basofílico, encontram-se numerosos <strong>macrófagos com citoplasma claro e abundante ('células claras') contendo corpos tingíveis (fagocitários)</strong>. Esses macrófagos proliferam avidamente para fagocitar os debris celulares resultantes da taxa colossal de morte celular espontânea (apoptose maciça) que acompanha o crescimento tumoral vertiginoso.</li>
  </ul>
</div>

<h3>6.4 A Maior Ameaça Inicial no Linfoma de Burkitt: Síndrome de Lise Tumoral (SLT)</h3>
<p>Devido à fração proliferativa extrema e ao volume tumoral maciço, a introdução da quimioterapia no Linfoma de Burkitt (ou na LMA/LLA hiperleucocitárias) desencadeia a lise maciça e simultânea de bilhões de blastos neoplásicos em questão de poucas horas, lançando abruptamente seu conteúdo intracelular no compartimento intravascular e deflagrando a catastrófica <strong>Síndrome de Lise Tumoral (SLT)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Distúrbio Metabólico (SLT)</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Consequências Clínicas Graves</th>
      <th>Medida Profilática e Terapêutica Mandatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Hiperuricemia</strong></td>
      <td>Degradação enzimática maciça dos ácidos nucleicos celulares em purinas, que são oxidadas em ácido úrico pela xantina oxidase.</td>
      <td>Precipitação intratubular de cristais insolúveis de ácido úrico no túbulo coletor renal em pH urinário ácido, provocando <strong>Nefropatia por Ácido Úrico e Lesão Renal Aguda Anúrica</strong>.</td>
      <td><strong>Hiper-hidratação venosa vigorosa</strong> (2.500 a 3.000 mL/m²/dia de soro fisiológico 0,9%) para garantir diurese &gt; 100 mL/m²/h;<br>Uso de <strong>Alopurinol</strong> (inibe xantina oxidase, prevenindo a formação de novo ácido úrico) para risco intermediário; OU <strong>Rasburicase</strong> (urato oxidase recombinante que converte diretamente o ácido úrico formado na molécula hidrossolúvel alantoína, eliminável facilmente pela urina) para alto risco.</td>
    </tr>
    <tr>
      <td><strong>2. Hipercalemia</strong></td>
      <td>Liberação maciça do principal cátion intracelular (potássio).</td>
      <td><strong>Cardiotoxicidade letal:</strong> onda T apiculada em tenda no ECG, achatamento de P, alargamento de QRS, assistolia e <strong>Fibrilação Ventricular fulminante</strong>.</td>
      <td>Restrição estrita de potássio dietético e venoso; monitorização contínua por telemetria; se K &gt; 6,0 mEq/L ou alterações no ECG: <strong>Gluconato de Cálcio a 10% EV</strong> para estabilizar membrana miocárdica + medidas de troca celular (Glicoinsulina, Bicarbonato, Nebulização com beta-2 agonista) e Resinas de troca (Poliestirenossulfonato de cálcio/Sorcal) ou <strong>Hemodiálise de emergência</strong>.</td>
    </tr>
    <tr>
      <td><strong>3. Hiperfosfatemia</strong></td>
      <td>As células linfomatosas contêm até 4 vezes mais fosfato intracelular do que células normais.</td>
      <td>Elevação severa do produto cálcio x fósforo ($Ca \\times P &gt; 60-70$), provocando precipitação metastática tecidual de cristais de fosfato de cálcio nos rins (nefocalcinose aguda) e no sistema de condução cardíaco.</td>
      <td>Quelantes orais de fósforo não cálcicos (Sevelâmer ou Hidróxido de alumínio em curto prazo); hiper-hidratação venosa; hemodiálise precoce se fósforo &gt; 7-8 mg/dL.</td>
    </tr>
    <tr>
      <td><strong>4. Hipocalcemia Secundária</strong></td>
      <td>Consumo e quelação do cálcio sérico livre iônico pelos altos níveis de fosfato circulante.</td>
      <td>Tetania neuromuscular, espasmo carpopodal (Sinal de Trousseau), contração facial à percussão do nervo facial (Sinal de Chvostek), laringoespasmo, convulsões e prolongamento do intervalo QTc no ECG com risco de arritmias do tipo <em>Torsades de Pointes</em>.</td>
      <td><strong>Atenção máxima: Tratar o cálcio APENAS se o paciente apresentar sintomas graves ou convulsões!</strong> A reposição inadvertida de cálcio venoso na presença de hiperfosfatemia não controlada agrava dramaticamente a precipitação de fosfato de cálcio nos tecidos moles, acelerando o dano renal irreversível!</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: "casos-clinicos-e-questoes-comentadas-leucemias-linfomas",
  title: "7. Casos Clínicos Estruturados e Questões Comentadas de Concursos Médicos",
  body_html: `
<h3>7.1 Casos Clínicos da Hematologia na Prática Médica</h3>

<div class="clinical-box highlight">
  <h4>Caso Clínico 1: Diátese Hemorrágica Fulminante e Reconhecimento Imediato de LPA</h4>
  <p><strong>Identificação:</strong> Uma jovem de 24 anos, estudante universitária previamente hígida, é trazida ao serviço de emergência hospitalar com história de sangramento gengival espontâneo incoercível iniciado há 24 horas, acompanhado do aparecimento súbito de múltiplas equimoses arroxeadas gigantes em coxas e tronco e sangramento vaginal abundante fora do ciclo menstrual.</p>
  <p><strong>Exame Físico na Admissão:</strong> Hipocorada 3+/4+, afebril, PA 100x60 mmHg, FC 110 bpm. Presença de petéquias disseminadas no palato duro e membros inferiores; hematoma extenso de 15 cm em face medial da coxa esquerda; ausência de linfadenopatia palpável; baço e fígado não palpáveis.</p>
  <p><strong>Exames Laboratoriais Emergenciais:</strong></p>
  <ul>
    <li>Hemoglobina: 7,2 g/dL (anemia normocítica normocrômica);</li>
    <li>Leucócitos totais: 2.800/mm³ com 45% de promielócitos atípicos anormais;</li>
    <li>Plaquetas: 14.000/mm³ (plaquetopenia severa);</li>
    <li>Coagulograma: TP com INR alargado de 2,1; TTPa de 52 segundos (Relação 1,8); <strong>Fibrinogênio plasmático: 65 mg/dL (hipofibrinogenemia profunda!)</strong>; D-dímero: &gt; 10.000 mcg/L.</li>
    <li><strong>Esfregaço de Sangue Periférico Urgente:</strong> Visualização de promielócitos volumosos contendo abundante granulação azurófila citoplasmática e múltiplos bastonetes de Auer entrelaçados em feixes paralelos no citoplasma (<strong>Células de Faggot</strong>).</li>
  </ul>
  <p><strong>Raciocínio Diagnóstico e Conduta Imediata de Plantão:</strong></p>
  <ol>
    <li><em>Diagnóstico Clínico-Laboratorial:</em> <strong>Leucemia Promielocítica Aguda (LPA - LMA t(15;17))</strong> descompensada com <strong>Coagulação Intravascular Disseminada (CIVD) aguda grave e hiperfibrinólise primária</strong>, com altíssimo risco iminente de hemorragia do SNC fatal.</li>
    <li><em>Conduta Farmacológica Imediata:</em> <strong>INICIAR ÁCIDO TODO-TRANS-RETINOICO (ATRA / Tretinoína) 45 mg/m²/dia POR VIA ORAL IMEDIATAMENTE NA SALA DE EMERGÊNCIA</strong>, sem aguardar o cariótipo ou a confirmação molecular da t(15;17) ou PML-RARA! O ATRA bloqueia a liberação de fator tecidual pelos promielócitos em poucas horas, cessando a CIVD.</li>
    <li><em>Suporte Hemoterápico Agressivo:</em>
      <ul>
        <li>Transfusão de <strong>Crioprecipitado</strong> em dose plena (1 bolsa para cada 10 kg de peso) com objetivo de elevar e manter o fibrinogênio &gt; 150 mg/dL;</li>
        <li>Transfusão imediata de <strong>Concentrado de Plaquetas</strong> (aférese ou randômicas) para manter contagem &gt; 30.000 a 50.000/mm³;</li>
        <li>Plasma Fresco Congelado (PFC) para correção parcial da coagulopatia.</li>
      </ul>
    </li>
    <li>Internação em leito de Terapia Intensiva / Hematologia e monitoramento diário para a Síndrome de Diferenciação Leucêmica.</li>
  </ol>
</div>

<div class="clinical-box highlight">
  <h4>Caso Clínico 2: Massa Cervical em Jovem, Sintomas B e Prurido Intratável</h4>
  <p><strong>Identificação:</strong> Uma mulher de 26 anos, arquiteta, procura atendimento ambulatorial queixando-se do surgimento progressivo de um 'caroço' na lateral esquerda do pescoço há cerca de 3 meses. Refere que a lesão cresceu de forma indolor, mas nas últimas 4 semanas passou a apresentar episódios diários de febre vespertina de 38,2 ºC a 38,5 ºC, sudorese noturna tão profusa que molha o travesseiro e a obriga a trocar de pijama, perda involuntária de 7 kg (peso basal: 62 kg; peso atual: 55 kg — perda &gt; 10% do peso corporal) e prurido cutâneo intenso e generalizado que não melhorou com antialérgicos orais.</p>
  <p><strong>Exame Físico:</strong> Bom estado geral, corada; palpação cervical esquerda revela massa linfonodal de 4,5 cm de diâmetro na cadeia jugulocarotídea média, de consistência fibroelástica em 'borracha de apagar', móvel, indolor, sem sinais inflamatórios na pele sobrejacente. Ausência de outros linfonodos periféricos aumentados em axilas ou virilhas. Fígado e baço não palpáveis.</p>
  <p><strong>Investigação Propedêutica e Diagnóstica:</strong></p>
  <ul>
    <li>Hemograma: Hemoglobina 11,8 g/dL, Leucócitos 11.200/mm³ com eosinofilia discreta (6%); VHS elevado de 68 mm/h; LDH elevado.</li>
    <li>Radiografia de Tórax: Alargamento assimétrico acentuado do mediastino superior anterior.</li>
    <li><strong>Procedimento Diagnóstico Mandatório:</strong> Realizada <strong>Biópsia Excisional Cirúrgica Completa do Linfonodo Cervical</strong> (a punção aspirativa por agulha fina - PAAF foi expressamente evitada por ser inadequada para diagnosticar a arquitetura do linfoma!).</li>
    <li><strong>Exame Histopatológico e Imunofenotipagem:</strong> Nódulos celulares envoltos por densas faixas colágenas fibrosas birrefringentes; presença de células gigantes multinucleadas atípicas com núcleos volumosos em 'olhos de coruja' (<strong>Células de Reed-Sternberg</strong>) e células lacunares. <strong>Imunofenotipagem: CD30 POSITIVO e CD15 POSITIVO</strong>; CD20 negativo e CD45 negativo. Diagnóstico: <strong>Linfoma de Hodgkin Clássico, subtipo Esclerose Nodular</strong>.</li>
    <li><strong>Tomografias de Tórax, Abdome e Pelve / PET-CT:</strong> Confirmam acometimento linfonodal cervical esquerdo e massa em mediastino anterior de 6 cm (todas as lesões localizadas acima do diafragma). Ausência de acometimento abdominal, baço normal, biópsia de medula óssea negativa.</li>
  </ul>
  <p><strong>Classificação de Estadiamento e Conduta:</strong></p>
  <ol>
    <li><em>Estadiamento Clínico Formal de Ann Arbor:</em> <strong>Estágio II-B</strong> (Envolvimento de duas regiões linfonodais — cervical e mediastinal — ambas restritas ao mesmo lado do diafragma / acima do diafragma; acompanhado da presença de Sintomas 'B' constitucionais: febre, sudorese noturna e perda &gt; 10% do peso).</li>
    <li><em>Tratamento Curativo Padrão:</em> Quimioterapia combinada com o esquema <strong>ABVD</strong> (Doxorrubicina, Bleomicina, Vinblastina e Dacarbazina) por 4 a 6 ciclos, com avaliação de resposta metabólica completa por PET-CT intermediário no 2º ciclo (PET-2), alcançando taxa de cura global superior a 85% a 90%.</li>
  </ol>
</div>

<h3>7.2 Questões de Provas de Residência Médica Comentadas</h3>

<div class="clinical-box highlight">
  <h4>Questão 1 (USP / Residência Médica em Hematologia e Clínica Médica)</h4>
  <p>Homem de 58 anos procura atendimento médico referindo cansaço progressivo e sensação de empachamento precoce após as refeições há 4 meses. Nega febre ou sangramentos. Ao exame físico, apresenta-se em bom estado geral, descorado 1+/4+; abdome flácido, com baço palpável a 10 cm do rebordo costal esquerdo, endurecido e indolor. Exames laboratoriais revelam: Hemoglobina 10,5 g/dL; Plaquetas 480.000/mm³; Leucócitos totais 180.000/mm³ com o seguinte diferencial: mieloblastos 2%, promielócitos 4%, mielócitos 12%, metamielócitos 15%, bastonetes 20%, segmentados 38%, basófilos 6%, eosinófilos 3%. Considerando o diagnóstico mais provável para este paciente, qual é o exame molecular definidor da patogênese da doença e qual é a terapia-alvo de primeira linha indicada?</p>
  <p>A) Pesquisa da mutação JAK2 V617F; iniciar hidroxiureia e sangria terapêutica.<br>
  B) Identificação da translocação t(9;22) gerando a fusão BCR-ABL1; iniciar inibidor de tirosina-quinase (Imatinibe).<br>
  C) Pesquisa da mutação do gene FLT3-ITD; iniciar quimioterapia intensiva com protocolo 7+3 (Citarabina + Daunorrubicina).<br>
  D) Identificação da translocação t(15;17); iniciar Ácido Todo-Trans-Retinoico (ATRA).<br>
  E) Pesquisa do rearranjo do gene c-MYC t(8;14); iniciar protocolo hiper-CVAD com profilaxia intratecal.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa B.</strong></p>
  <p><em>Comentário Didático:</em> O quadro clínico e hematológico é clássico e patognomônico de <strong>Leucemia Mieloide Crônica (LMC) em fase crônica</strong>: leucocitose neutrofílica exuberante (180.000/mm³) com desvio à esquerda completo escalonado (presença de todos os precursores granulocíticos com menos de 5-10% de blastos), basofilia absoluta (6%), trombocitose e esplenomegalia maciça palpável. A alteração molecular que define a doença é a <strong>translocação recíproca t(9;22)(q34;q11) — o Cromossomo Filadélfia</strong> —, que resulta na fusão gênica <strong>BCR-ABL1</strong>, codificadora da tirosina-quinase oncogênica constitutivamente ativada. O tratamento de primeira linha revolucionou o prognóstico da LMC mediante o uso de <strong>Inibidores da Tirosina-Quinase (ITQ), sendo o Imatinibe</strong> o agente clássico inicial. A alternativa A descreve Policitemia Vera ou Mielofibrose Primária (JAK2). A alternativa C é associada a LMA de alto risco. A alternativa D refere-se à LPA (M3). A alternativa E descreve o Linfoma de Burkitt.</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 2 (Enare / Exame Nacional de Residência Médica)</h4>
  <p>Um menino de 4 anos é levado ao pronto-socorro pediátrico pela mãe devido a quadro de palidez cutânea progressiva, febre diária de 38,5 ºC há 10 dias e queixa constante de dores nas pernas, recusando-se a caminhar. Ao exame físico, a criança apresenta palidez acentuada, múltiplas petéquias em tronco e membros inferiores, linfadenomegalia cervical bilateral móvel e indolor e fígado palpável a 3 cm do rebordo costal direito. O hemograma demonstra: Hemoglobina 6,8 g/dL; Plaquetas 22.000/mm³; Leucócitos 34.000/mm³ com presença de 65% de células blásticas atípicas com alta relação núcleo/citoplasma, cromatina frouxa e ausência de grânulos citoplasmáticos. A reação citoquímica de mieloperoxidase é negativa e a coloração para TdT (Desoxinucleotidil transferase terminal) é positiva. Qual é o diagnóstico provável e qual é o procedimento profilático obrigatório que deve ser incluído no protocolo terapêutico desta criança?</p>
  <p>A) Leucemia Mieloide Aguda; profilaxia de nefrotoxicidade com rasburicase.<br>
  B) Leucemia Linfoide Aguda; quimioterapia intratecal profilática periódica para o Sistema Nervoso Central.<br>
  C) Púrpura Trombocitopênica Imunológica; imunoglobulina humana intravenosa.<br>
  D) Anemia Aplásica Adquirida Grave; transplante alogênico de medula óssea de urgência.<br>
  E) Neuroblastoma metastático; radioterapia espinhal descompressiva de emergência.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa B.</strong></p>
  <p><em>Comentário Didático:</em> O quadro descreve a apresentação paradigmática da <strong>Leucemia Linfoide Aguda (LLA) na infância</strong>: faixa etária de pico (4 anos), síndrome de insuficiência medular aguda (anemia grave, plaquetopenia com petéquias e febre), hepatoesplenomegalia e dores ósseas intensas que impedem a deambulação. Os blastos têm morfologia linfoide típica com <strong>mieloperoxidase estritamente negativa</strong> (afastando LMA) e positividade para <strong>TdT</strong> (marcador intranuclear patognomônico de imaturidade linfoide). Na LLA pediátrica, o Sistema Nervoso Central constitui um clássico <strong>santuário anatômico</strong> protegido pela barreira hematoencefálica; dessa forma, <strong>a quimioterapia intratecal profilática universal (com metotrexato, citarabina e corticoide) é mandatória em todos os pacientes</strong> ao longo de todo o protocolo quimioterápico para prevenir recaídas meníngeas fatais.</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 3 (Unifesp / Residência Médica em Clínica Médica)</h4>
  <p>Homem de 74 anos, assintomático, comparece à consulta médica de rotina trazendo exames admissionais de um plano de saúde. Ao exame físico, o paciente apresenta-se lúcido, corado, anictérico, eupneico; ausência de linfonodos palpáveis em todas as cadeias periféricas; abdome inocente, com fígado e baço não palpáveis. O hemograma revela: Hemoglobina 14,2 g/dL; Hematócrito 42%; Plaquetas 210.000/mm³; Leucócitos totais 38.000/mm³ com 88% de linfócitos maduros normais (linfocitose absoluta de 33.440/mm³), neutrófilos 10%, monócitos 2%. Presença frequente de manchas de Gümprecht no esfregaço de sangue periférico. A imunofenotipagem por citometria de fluxo confirma população monoclonal de linfócitos B com coexpressão de CD19+, CD20+ fraco e CD5+. Considerando a classificação de Rai e as diretrizes internacionais de conduta para esta doença, qual é o estágio clínico do paciente e a conduta preconizada?</p>
  <p>A) Rai 0; iniciar quimioterapia com esquema R-CHOP imediatamente para impedir infiltração medular.<br>
  B) Rai 0; conduta expectante ('Watch and Wait'), com acompanhamento clínico e hematológico semestral ambulatorial.<br>
  C) Rai I; iniciar tratamento com inibidor de tirosina-quinase de Bruton (Ibrutinibe).<br>
  D) Rai III; indicar transplante autólogo de células-tronco hematopoéticas.<br>
  E) Rai IV; iniciar transfusão profilática de plaquetas e corticoterapia em altas doses.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa B.</strong></p>
  <p><em>Comentário Didático:</em> O paciente apresenta <strong>Leucemia Linfoide Crônica (LLC)</strong> comprovada pela linfocitose monoclonal B &gt; 5.000/mm³ com o perfil imunofenotípico clássico de coexpressão patológica de CD5+ e restos de Gümprecht na lâmina. No estadiamento de Rai, a presença de <strong>linfocitose isolada sem linfadenopatia palpável, sem organomegalias e com contagens de hemoglobina (&ge; 11 g/dL) e plaquetas (&ge; 100.000/mm³) normais define o ESTÁGIO RAI 0 (Baixo Risco)</strong>. A conduta internacionalmente consagrada para a LLC em estágio inicial (Rai 0 e I) em paciente assintomático é o <strong>acompanhamento clínico vigilante ('Watch and Wait')</strong>. Múltiplos ensaios clínicos demonstraram que o tratamento quimioterápico precoce não traz benefício na sobrevida global e apenas acrescenta toxicidade, infecções e custo. Iniciar tratamento está indicado apenas na presença de sintomas constitucionais B, rápida duplicação linfocitária, linfadenopatia maciça dolorosa ou evolução para anemia/plaquetopenia (Rai III e IV).</p>
</div>
`
};
