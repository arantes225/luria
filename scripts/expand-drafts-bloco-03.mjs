import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

function appendSectionToBook(slug, sectionId, sectionTitle, htmlContent) {
  const jsonPath = path.join('apostilas', slug, 'content.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`Book ${slug} not found at ${jsonPath}`);
    return;
  }
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Remove existing section if already present
  payload.o = payload.o.filter(item => item[0] !== sectionId && item[0] !== 'referencias');
  payload.q = payload.q.filter(item => item[0] !== sectionId && item[0] !== 'referencias');

  // Add new section
  payload.o.push([sectionId, sectionTitle]);
  payload.q.push([sectionId, 0, htmlToBlocks(sectionTitle, htmlContent)]);

  // Re-add references
  payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
  payload.q.push([
    'referencias',
    0,
    [
      ['2', 'Referências Oficiais e Diretrizes'],
      [
        'o',
        [
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.conitec.gov.br" target="_blank" rel="noopener noreferrer">CONITEC - Recomendações e Diretrizes Nacionais</a>',
          '<a href="https://www.sbp.com.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pediatria (SBP) / Colégio Brasileiro de Cirurgiões (CBC)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// 1. AULA 053: DESIDRATAÇÃO E TERAPIA DE REIDRATAÇÃO
const sec053 = `
<h3>Fisiopatologia dos Compartimentos Hídricos na Infância e Regra de Holliday-Segar</h3>
<p>O organismo da criança pequena é caracterizado por uma proporção significativamente maior de água corporal total em relação ao peso (cerca de 75% a 80% no recém-nascido e 65% a 70% no lactente, contra 55% a 60% no adulto). Além disso, a distribuição compartimental nos primeiros meses de vida apresenta predomínio relativo do Líquido Extracelular (LEC), que corresponde a quase 40% do peso corporal no período neonatal. Como o LEC é o compartimento que sofre trocas metabólicas ativas e perdas imediatas para o meio externo através da pele, respiração, urina e trato gastrointestinal, o lactente possui um <em>turnover</em> hídrico diário de três a quatro vezes superior ao do adulto por quilograma de peso. Qualquer intercorrência aguda com vômitos ou diarreia líquida profusa pode esgotar as reservas extracelulares em poucas horas, culminando em hipovolemia e colapso circulatório.</p>
<p>A taxa metabólica basal elevada da criança exige um suprimento energético e hídrico proporcionalmente muito mais intenso. A consagrada <strong>Regra de Holliday-Segar</strong> fundamenta-se exatamente no consumo calórico estimado para calcular as necessidades basais de manutenção hídrica e eletrolítica:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Faixa de Peso Corporal</th>
      <th>Gasto Calórico Estimado e Volume Hídrico Basal Diário</th>
      <th>Taxa de Infusão Horária (mL/h)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Até 10 kg</strong></td>
      <td>100 mL/kg/dia</td>
      <td>4 mL/kg/h</td>
    </tr>
    <tr>
      <td><strong>De 11 a 20 kg</strong></td>
      <td>1.000 mL + 50 mL/kg para cada kg acima de 10 kg</td>
      <td>40 mL/h + 2 mL/kg/h para cada kg acima de 10 kg</td>
    </tr>
    <tr>
      <td><strong>Acima de 20 kg</strong></td>
      <td>1.500 mL + 20 mL/kg para cada kg acima de 20 kg (máximo de 2.000 a 2.500 mL/dia)</td>
      <td>60 mL/h + 1 mL/kg/h para cada kg acima de 20 kg</td>
    </tr>
  </tbody>
</table>

<h3>Composição Eletrolítica da Manutenção e Necessidades de Sódio e Potássio</h3>
<p>Para cada 100 kcal gastas (ou cada 100 mL de água metabolizada), a criança requer aproximadamente <strong>2 a 3 mEq de Sódio (Na+)</strong> e <strong>2 mEq de Potássio (K+)</strong>, além de cerca de 5 g de Glicose para evitar cetose de jejum e fornecer substrato para o cérebro e hemácias. A solução clássica de manutenção venosa pediátrica é composta por Soro Glicosado a 5% combinado com Soro Fisiológico a 0,9% (habitualmente na proporção de 4:1 ou 1:1, dependendo do risco de hiponatremia hospitalar por secreção inapropriada de ADH induzida por dor, náusea e estresse cirúrgico) e adição de Cloreto de Potássio a 10% (2 mL de KCl a 10% por cada 100 mL de solução, o que fornece cerca de 2 mEq de K+ por 100 mL).</p>

<h3>Distúrbios Eletrolíticos e Ácido-Base Críticos na Desidratação Grave</h3>
<p>O manejo das complicações metabólicas na criança gravemente desidratada exige vigilância estrita:</p>
<ul>
  <li><strong>Hiponatremia com Desidratação (Na &lt; 135 mEq/L):</strong> Decorre da perda de solutos em fezes volumosas associada à ingestão de água livre ou soluções hipotônicas caseiras. Se o sódio sérico cair para valores &lt; 120 mEq/L ou se surgirem convulsões e rebaixamento do sensório por edema cerebral agudo, a conduta de emergência consiste na infusão rápida de <strong>NaCl a 3% (3 mL/kg em 10 a 20 minutos)</strong> para elevar agudamente a natremia em 3 a 5 mEq/L e cessar a hipertensão intracraniana.</li>
  <li><strong>Desidratação Hipernatrêmica (Na &gt; 150 mEq/L):</strong> Resulta de perda pura de água em excesso ou preparo incorreto de fórmulas lácteas/SRO com hiperconcentração de sal. A redução rápida do sódio no cérebro adaptado causa influxo osmótico de água e edema cerebral grave. A correção deve ser lenta e gradual ao longo de 48 a 72 horas, com velocidade máxima de queda de 0,5 mEq/L/h ou 10 a 12 mEq/L em 24 horas.</li>
  <li><strong>Acidose Metabólica com Ânion Gap Normal ou Elevado:</strong> Causada por perda fecal direta de bicarbonato associada à hipoperfusão tecidual com acidose lática e retenção de ácidos orgânicos por insuficiência pré-renal. A ressuscitação volêmica vigorosa com expansão rápida habitualmente restaura a filtração glomerular e clareia o lactato, dispensando a infusão de bicarbonato de sódio na grande maioria dos casos (reservado para pH &lt; 7,10 com choque refratário).</li>
  <li><strong>Hipocalemia por Perda Gastrointestinal:</strong> O potássio nunca deve ser administrado em bólus venoso direto ou na fase de expansão rápida inicial, devendo ser introduzido na solução de manutenção somente após a comprovação de diurese espontânea efetiva.</li>
</ul>
`;

// 2. AULA 055: VIGILÂNCIA EM SAÚDE
const sec055 = `
<h3>Arquitetura dos Sistemas Nacionais de Informação em Saúde (SIS) e Integração com a APS</h3>
<p>A Vigilância em Saúde no Brasil opera por meio de uma rede integrada de sistemas informatizados coordenados pelo Departamento de Informática do SUS (DATASUS) e pela Secretaria de Vigilância em Saúde e Ambiente (SVSA/MS). A correta alimentação desses bancos de dados descentralizados na Atenção Primária à Saúde (APS) e nas unidades de pronto atendimento constitui a base empírica para a tomada de decisões epidemiológicas, alocação de recursos financeiros e monitoramento dos Objetivos de Desenvolvimento Sustentável (ODS):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Sistema de Informação</th>
      <th>Documento-Fonte Primário</th>
      <th>Finalidade e Abrangência Epidemiológica</th>
      <th>Principais Indicadores Calculados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SIM</strong><br>(Sistema de Informações sobre Mortalidade)</td>
      <td><strong>Declaração de Óbito (DO)</strong> impressa em três vias autocopiativas distribuídas pelo Ministério da Saúde.</td>
      <td>Registro universal de todos os óbitos ocorridos no território nacional, permitindo a análise de causas básicas de morte segundo a Classificação Internacional de Doenças (CID-10/CID-11).</td>
      <td>• Coeficiente de Mortalidade Infantil (CMI);<br>• Razão de Mortalidade Materna (RMM);<br>• Mortalidade prematura por Doenças Crônicas Não Transmissíveis (DCNT);<br>• Anos Potenciais de Vida Perdidos (APVP).</td>
    </tr>
    <tr>
      <td><strong>SINASC</strong><br>(Sistema de Informações sobre Nascidos Vivos)</td>
      <td><strong>Declaração de Nascido Vivo (DNV)</strong> emitida obrigatoriamente para todo nascimento com sinais de vida.</td>
      <td>Coleta dados epidemiológicos sobre características maternas, gestacionais, do parto e do recém-nascido (peso, IG, Apgar, malformações congênitas aparentes).</td>
      <td>• Taxa de natalidade e fecundidade;<br>• Proporção de partos cesáreos;<br>• Percentual de recém-nascidos de baixo peso (&lt; 2.500 g);<br>• Cobertura de consultas pré-natais (&ge; 7 consultas).</td>
    </tr>
    <tr>
      <td><strong>SINAN</strong><br>(Sistema de Informação de Agravos de Notificação)</td>
      <td><strong>Ficha de Notificação/Investigação (FNI)</strong> padronizada para cada doença ou agravo.</td>
      <td>Registro dinâmico e contínuo de doenças e agravos de notificação compulsória, monitorando surtos, epidemias e tendências temporais e espaciais.</td>
      <td>• Coeficientes de incidência e prevalência;<br>• Taxa de ataque e taxa de ataque secundário;<br>• Taxa de letalidade específica;<br>• Proporção de cura e abandono de tratamento (TB e Hanseníase).</td>
    </tr>
    <tr>
      <td><strong>SI-PNI / RNDS</strong><br>(Sistemas de Informação do Programa Nacional de Imunizações)</td>
      <td>Comprovante de vacinação nominal integrado ao Prontuário Eletrônico do Cidadão (e-SUS APS).</td>
      <td>Acompanhamento nominal do status vacinal individual, cálculo de coberturas vacinais por município e monitoramento de eventos supostamente atribuíveis à vacinação ou imunização (ESAVI).</td>
      <td>• Coberturas vacinais específicas por imunobiológico e faixa etária;<br>• Taxa de abandono vacinal (diferença entre 1ª e última dose de esquemas multidose);<br>• Homogeneidade de cobertura nos distritos de saúde.</td>
    </tr>
  </tbody>
</table>

<h3>Conceitos Epidemiológicos Operacionais e Investigação de Campo</h3>
<p>Durante a vigilância de campo, a definição de caso deve ser estritamente aplicada para garantir a comparabilidade dos dados:</p>
<ul>
  <li><strong>Caso Suspeito:</strong> Indivíduo com quadro clínico e fatores epidemiológicos sugestivos de uma doença, mas ainda sem confirmação por exames laboratoriais específicos ou critérios validados.</li>
  <li><strong>Caso Confirmado:</strong> Indivíduo que preenche os critérios definitivos para a doença, que podem ser laboratoriais (isolamento viral/bacteriano, sorologia com viragem ou biologia molecular por RT-PCR), clínico-epidemiológicos (vínculo com caso confirmado em área de transmissão ativa) ou clínico-imagem (achados patognomônicos em radiologia).</li>
  <li><strong>Caso Descartado:</strong> Suspeita clínica formalmente afastada após investigação diagnóstica negativa ou confirmação de outro diagnóstico etiológico.</li>
  <li><strong>Taxa de Ataque:</strong> Medida de incidência acumulada calculada especificamente durante surtos ou epidemias restritas: (Número de casos novos surgidos no surto / População exposta no período de risco) &times; 100.</li>
  <li><strong>Taxa de Letalidade:</strong> Mede a gravidade biológica da doença: (Número de óbitos decorrentes daquela doença / Número total de doentes confirmados) &times; 100.</li>
</ul>
`;

// 3. AULA 057: TRAUMA TORÁCICO
const sec057 = `
<h3>Fisiopatologia das Lesões Torácicas Ameaçadoras à Vida no xABCDE</h3>
<p>O trauma torácico é responsável por cerca de 20% a 25% de todas as mortes por trauma no mundo e atua como fator contribuinte em outros 25% a 50% dos óbitos politraumatizados. A imensa maioria das lesões torácicas graves (mais de 85%) pode ser adequadamente estabilizada e resolvida com procedimentos básicos na sala de emergência (suporte ventilatório, toracostomia com drenagem pleural fechada em selo d'água e reposição volêmica balanceada), reservando-se a toracotomia cirúrgica de emergência a menos de 10% a 15% dos casos.</p>
<p>A abordagem sistemática diferencia as <strong>lesões imediatamente fatais</strong>, que devem ser identificadas e tratadas na avaliação primária (etapas A e B), das <strong>lesões potencialmente fatais</strong>, avaliadas na avaliação secundária:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Lesão Torácica Crítica</th>
      <th>Fisiopatologia Principal</th>
      <th>Quadro Clínico Clássico</th>
      <th>Conduta Imediata Salvadora</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pneumotórax Hipertensivo</strong></td>
      <td>Mecanismo valvular unidirecional: o ar entra no espaço pleural na inspiração e não sai na expiração. Colapso pulmonar total, desvio do mediastino para o lado contralateral, compressão das veias cavas, colapso do retorno venoso e choque obstrutivo grave.</td>
      <td>Dispneia extrema, cianose, ausência unilateral de MV, timpanismo à percussão, turgência jugular patológica, hipotensão arterial e desvio da traqueia. <em>Diagnóstico estritamente clínico — proscrito aguardar radiografia!</em></td>
      <td>Descompressão imediata com agulha calibrosa (jelco 14G ou dispositivo específico) no <strong>4º ou 5º espaço intercostal na linha axilar anterior</strong> (recomendação ATLS 10ª/11ª ed, aceito 2º EIC na linha hemiclavicular como alternativa clássica), seguida obrigatoriamente por <strong>toracostomia com drenagem pleural tubular fechada</strong> no 5º EIC entre as linhas axilar anterior e média.</td>
    </tr>
    <tr>
      <td><strong>Pneumotórax Aberto</strong></td>
      <td>Solução de continuidade na parede torácica com diâmetro &ge; 2/3 do diâmetro traqueal. O ar entra preferencialmente pela ferida da parede devido à menor resistência, impedindo a ventilação eficaz e causando balanço mediastinal.</td>
      <td>Ferida torácica aspirativa e borbulhante com esforço respiratório, hipoxemia aguda e desconforto grave.</td>
      <td>Aplicação imediata de <strong>curativo quadrangular oclusivo em três pontas</strong> (mecanismo de válvula: veda na inspiração e abre na expiração para descompressão), seguido por drenagem pleural tubular em local anatômico distante da lesão e reparo cirúrgico definitivo da parede.</td>
    </tr>
    <tr>
      <td><strong>Hemotórax Maciço</strong></td>
      <td>Acúmulo rápido de grande volume de sangue no espaço pleural (habitualmente &gt; 1.500 mL ou &gt; 1/3 da volemia do paciente) por lesão de vasos sistêmicos (artérias intercostais, mamária interna) ou hilares. Provoca choque hipovolêmico grave combinado com compressão pulmonar.</td>
      <td>Hipotensão grave, choque hemorrágico, macicez à percussão unilateral, murmúrio vesicular abolido e <strong>veias jugulares habitualmente colabadas</strong> (pela hipovolemia sistêmica profunda).</td>
      <td>Drenagem pleural tubular calibrosa (dreno 28 a 32 Fr) acoplada a selo d'água com coleta estéril (possibilidade de autotransfusão), associada a ressuscitação volêmica hemostática balanceada.</td>
    </tr>
    <tr>
      <td><strong>Tamponamento Cardíaco Traumático</strong></td>
      <td>Acúmulo de sangue no saco pericárdico inelástico, elevando a pressão intrapericárdica acima da pressão diastólica ventricular, impedindo o enchimento ventricular direito e colapsando o débito cardíaco.</td>
      <td><strong>Tríade de Beck:</strong> hipotensão arterial, abafamento de bulhas cardíacas e turgência jugular. Pulso paradoxal (&gt; 10 mmHg de queda na PAS inspiratória). eFAST evidenciando líquido pericárdico.</td>
      <td>Pericardiocentese subxifóidea guiada por ultrassom como medida de alívio temporário, seguida imediatamente de <strong>toracotomia de emergência ou esternotomia</strong> no centro cirúrgico para hemostasia da ferida cardíaca.</td>
    </tr>
    <tr>
      <td><strong>Tórax Instável (Volet Costal) e Contusão Pulmonar</strong></td>
      <td>Fratura de duas ou mais costelas consecutivas em pelo menos dois pontos do mesmo arco costal, criando um segmento parietal ósseo flutuante que se movimenta em <strong>respiração paradoxal</strong> (afunda na inspiração e expande na expiração). A principal determinante da hipoxemia não é a mecânica da parede, mas a <strong>contusão pulmonar subjacente</strong>.</td>
      <td>Dor torácica lancinante, taquipneia, creptações e consolidação alveolar radiológica precoce ou nas primeiras 24 horas.</td>
      <td>Analgesia potente multimodal (bloqueio peridural torácico, bloqueio paravertebral ou anestesia de nervos intercostais), oxigenoterapia cautelosa, restrição prudente de fluidos cristaloide para não encharcar o pulmão contundido e ventilação mecânica não invasiva ou invasiva se falência respiratória franca.</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Rígidos de Indicação para Toracotomia Cirúrgica de Emergência</h3>
<p>A toracotomia imediata no centro cirúrgico está formalmente indicada no hemotórax quando:</p>
<ul>
  <li><strong>Drenagem inicial imediata &ge; 1.500 mL de sangue</strong> pelo tubo pleural na inserção;</li>
  <li><strong>Débito contínuo do dreno de tórax &gt; 200 a 300 mL/hora durante 2 a 4 horas consecutivas</strong>, demonstrando sangramento arterial ativo não contido;</li>
  <li>Necessidade contínua de transfusão de hemoderivados para manter a estabilidade hemodinâmica com débito persistente pelo dreno;</li>
  <li>Suspeita fundada de rotura traqueobrônquica maior com fuga aérea maciça contínua impedindo a reexpansão pulmonar no selo d'água.</li>
</ul>
`;

// 4. AULA 058: DIARREIA AGUDA NA INFÂNCIA
const sec058 = `
<h3>Microbiologia e Mecanismos Patogênicos da Diarreia Aguda Infecciosa</h3>
<p>A gastroenterite aguda na infância é clinicamente classificada em duas grandes síndromes fisiopatológicas: a <strong>diarreia aquosa (secretora ou osmótica)</strong> e a <strong>diarreia inflamatória invasiva (disenteria)</strong>. A correta distinção clínica orienta a necessidade de exames complementares e restringe o uso de antimicrobianos a cenários estritamente necessários:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Síndrome Clínica</th>
      <th>Principais Agentes Etiológicos</th>
      <th>Fisiopatologia e Mecanismo Celular</th>
      <th>Características das Fezes e Quadro Clínico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Diarreia Aquosa Secretora</strong></td>
      <td>• Rotavírus humano (Grupo A);<br>• Norovírus;<br>• Adenovírus entérico (tipos 40/41);<br>• <em>Escherichia coli</em> enterotoxigênica (ETEC);<br>• <em>Vibrio cholerae</em>.</td>
      <td>Produção de enterotoxinas (ex.: NSP4 do rotavírus, toxinas termolábil LT e termoestável ST da ETEC) que estimulam a adenililciclase ou guanililciclase nos enterócitos, elevando AMPc/GMPc intracelular. Isso provoca hipersecreção ativa maciça de íons Cloro e água na cripta intestinal, superando a capacidade absortiva das vilosidades.</td>
      <td>Fezes volumosas, predominantemente líquidas, sem sangue ou muco macroscópico, alta frequência diária, vômitos precoces associados e grande risco de desidratação rápida com acidose metabólica.</td>
    </tr>
    <tr>
      <td><strong>Diarreia Aquosa Osmótica</strong></td>
      <td>• Rotavírus (lesão vilositária);<br>• Giardia lamblia;<br>• Intolerância transitória secundária à lactose.</td>
      <td>Destruição e achatamento das vilosidades intestinais apicais com redução da expressão de dissacaridases (principalmente a lactase). A lactose não digerida permanece no lúmen, exercendo força osmótica que puxa água e sendo fermentada por bactérias colônicas em hidrogênio e ácidos graxos de cadeia curta.</td>
      <td>Fezes líquidas explosivas, ácidas (pH fecal &lt; 5,5), com substâncias redutoras positivas, causando hiperemia perianal intensa e distensão abdominal com cólicas. Melhora com jejum ou retirada temporária da lactose.</td>
    </tr>
    <tr>
      <td><strong>Disenteria (Diarreia Inflamatória / Invasiva)</strong></td>
      <td>• <em>Shigella dysenteriae</em> e <em>S. flexneri</em>;<br>• <em>Campylobacter jejuni</em>;<br>• <em>Salmonella enterica</em> não tifoide;<br>• <em>Escherichia coli</em> enteroinvasiva (EIEC);<br>• <em>Entamoeba histolytica</em>.</td>
      <td>Invasão direta dos enterócitos e da lâmina própria do cólon com multiplicação intracelular, indução de apoptose e intensa resposta inflamatória com recrutamento de neutrófilos, necrose tecidual e ulceração da mucosa.</td>
      <td>Fezes frequentes de pequeno volume contendo muco visível, pus e sangue vivo (disenteria franca), acompanhadas de febre alta, dor abdominal intensa em cólica, tenesmo retal e prostração.</td>
    </tr>
    <tr>
      <td><strong>E. coli Entero-hemorrágica (EHEC / STEC)</strong></td>
      <td><em>E. coli</em> produtora de toxina Shiga (sorotipo O157:H7 e não O157).</td>
      <td>Produção da toxina Shiga (Stx1 e Stx2), que atinge a corrente sanguínea, liga-se aos receptores Gb3 nas células endoteliais dos capilares glomerulares e induz apoptose endotelial com microangiopatia trombótica.</td>
      <td>Colite hemorrágica com sangramento fecal profuso, habitualmente sem febre alta. Risco de <strong>Síndrome Hemolítico-Urêmica (SHU)</strong>: anemia hemolítica microangiopática com esquizócitos, trombocitopenia e insuficiência renal aguda. <em>Antibióticos são formalmente contraindicados pelo aumento de liberação de toxina!</em></td>
    </tr>
  </tbody>
</table>

<h3>Uso Racional de Medicamentos na Gastroenterite Pediátrica: O que Fazer e o que NUNCA Fazer</h3>
<p>O tratamento da diarreia aguda no Brasil segue rigorosamente as diretrizes da Sociedade Brasileira de Pediatria (SBP) e Ministério da Saúde:</p>
<ul>
  <li><strong>Suplementação de Zinco:</strong> Obrigatória para todas as crianças menores de 5 anos com diarreia aguda: 10 mg/dia para &lt; 6 meses e 20 mg/dia para &ge; 6 meses por 10 a 14 dias. Reduz a gravidade, diminui a duração do episódio e previne novos episódios diarreicos nos três meses subsequentes.</li>
  <li><strong>Probióticos com Evidência Científica Nível 1A:</strong> Recomendados pela ESPGHAN e SBP para reduzir a duração em aproximadamente 24 horas: <em>Lactobacillus rhamnosus GG</em> (LGG) e <em>Saccharomyces boulardii</em> em doses terapêuticas precoces.</li>
  <li><strong>Antieméticos:</strong> O uso de <strong>Ondansetrona oral em dose única</strong> (0,15 mg/kg) está indicado exclusivamente na criança com vômitos frequentes que impedem a terapia de reidratação oral no Plano B, reduzindo significativamente a necessidade de hidratação venosa e hospitalização. Antidopaminérgicos (metoclopramida, bromoprida, domperidona) são proscritos pelo alto risco de efeitos extrapiramidais.</li>
  <li><strong>Medicamentos Estritamente Proscritos:</strong> O uso de antiespasmódicos (escopolamina) e opioides antidiarreicos como a <strong>Loperamida é formalmente proibido em pediatria</strong>. Bloqueiam a motilidade fisiológica, mascaram a retenção de grandes volumes de líquido na alça intestinal (terceiro espaço), favorecem proliferação bacteriana transmural e podem desencadear íleo paralítico fatal e megacólon tóxico.</li>
  <li><strong>Indicações Precisas de Antibioticoterapia:</strong> Restrita aos casos de disenteria franca por <em>Shigella</em> com comprometimento do estado geral (Ciprofloxacino oral por 3 dias ou Azitromicina por 3 a 5 dias), cólera grave com desidratação (Azitromicina em dose única) e suspeita de febre tifoide ou sepse bacteriana associada.</li>
</ul>
`;

// 5. AULA 067: TRAUMA PÉLVICO E GENITURINÁRIO
const sec067 = `
<h3>Classificação Mecânica das Fraturas Pélvicas e Fisiopatologia da Hemorragia Retroperitoneal</h3>
<p>O anel pélvico é uma estrutura osteoligamentar fechada com extrema estabilidade mecânica garantida pelos ligamentos sacroilíacos posteriores (os mais fortes do organismo), ligamentos sacroilíacos anteriores, sacroespinhosos e sacrotuberosos. A energia cinética necessária para romper o anel pélvico é colossal (habitualmente atropelamentos, colisões automobilísticas em alta velocidade ou quedas de grande altura), associando-se a taxas de mortalidade de até 40% a 50% quando há choque hemorrágico grave instalado.</p>
<p>A <strong>Classificação de Young-Burgess</strong> correlaciona a direção da força do impacto mecânico com a estabilidade pélvica e a magnitude do sangramento vascular:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Mecanismo (Young-Burgess)</th>
      <th>Lesões Ósseas e Ligamentares Típicas</th>
      <th>Estabilidade do Anel Pélvico</th>
      <th>Risco de Choque Hemorrágico e Órgãos Lesados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Compressão Anteroposterior (CAP / Open-Book)</strong></td>
      <td>Impacto frontal direto. Diástase da sínfise púbica (&gt; 2,5 cm) com abertura em livro aberto e rotura dos ligamentos sacroilíacos anteriores e sacroespinhosos (CAP II e III com lesão sacroilíaca posterior).</td>
      <td>Instabilidade rotacional com preservação parcial ou total da estabilidade vertical (CAP I e II) ou instabilidade completa (CAP III).</td>
      <td><strong>Risco hemorrágico extremo:</strong> O aumento maciço do volume da pelve anula o efeito natural de tamponamento. Lesão lacerante do plexo venoso pré-sacral e ramos da artéria ilíaca interna (glútea superior, pudenda interna).</td>
    </tr>
    <tr>
      <td><strong>Compressão Lateral (CL)</strong></td>
      <td>Impacto lateral em T-bone. Fratura transversa dos ramos isquiopúbicos ipsilaterais ou contralaterais combinada com compressão/impactação sacral anterior.</td>
      <td>Instabilidade rotacional com rotação interna da hemipelve (redução do volume pélvico). Estabilidade vertical habitualmente mantida.</td>
      <td>Menor volume hemorrágico retroperitoneal em comparação ao CAP, porém alto risco de perfuração traumática da bexiga urinária por espículas ósseas e lesões viscerais abdominais graves.</td>
    </tr>
    <tr>
      <td><strong>Cisalhamento Vertical (CV / Vertical Shear)</strong></td>
      <td>Força vertical assimétrica extrema (ex.: queda em pé ou com um membro estendido). Ruptura completa de todos os ligamentos sacroilíacos anteriores e posteriores com ascensão cefálica da hemipelve fraturada.</td>
      <td><strong>Instabilidade total</strong> (rotacional e vertical). Deslocamento completo do ilíaco em relação ao sacro.</td>
      <td>Hemorragia retroperitoneal maciça com choque refratário e elevada taxa de mortalidade precoce.</td>
    </tr>
  </tbody>
</table>

<h3>Protocolo de Controle de Danos no Choque Pélvico: Cinta, Packing e Angioembolização</h3>
<p>Mais de 85% a 90% do sangramento retroperitoneal nas fraturas pélvicas é de origem <strong>venosa</strong> (plexo venoso pré-sacral e plexo perivesical) e óssea esponjosa da superfície fraturada; apenas 10% a 15% provém de lesão arterial direta de ramos da artéria ilíaca interna. A abordagem hemostática sequencial visa restaurar o continente pélvico e conter o sangramento:</p>
<ul>
  <li><strong>Fechamento Mecânico Imediato do Anel Pélvico:</strong> Na presença de suspeita de fratura pélvica instável com choque, deve-se aplicar imediatamente um <strong>lençol ou cinta pélvica comercial</strong> centralizado rigorosamente sobre os <strong>trocanteres maiores do fêmur</strong> (e não sobre a crista ilíaca ou abdome). O fechamento e a rotação interna dos membros inferiores reduzem o volume pélvico, aproximam as superfícies ósseas e restabelecem o efeito de tamponamento mecânico das veias pré-sacrais. Proibida a palpação bimanual repetitiva da pelve ("testar a bacia"), que desloca coágulos e reativa sangramentos maciços.</li>
  <li><strong>Tamponamento Pré-Peritoneal (Pelvic Packing):</strong> Procedimento cirúrgico rápido de controle de danos realizado através de incisão mediana infraumbilical suprapúbica sem penetrar na cavidade peritoneal. O espaço pré-peritoneal de Retzius é dissecado e empacotado firmemente com compressas cirúrgicas diretamente contra as paredes ósseas pélvicas, contendo o sangramento venoso em minutos.</li>
  <li><strong>Arteriografia com Embolização Seletiva:</strong> Indicada prioritariamente quando há evidência de <em>blush</em> arterial de contraste na angiotomografia em paciente estabilizado, ou persistência de instabilidade hemodinâmica após fixação pélvica mecânica e laparotomia/packing pré-peritoneal.</li>
</ul>

<h3>Trauma de Bexiga e Uretra: Diagnóstico Topográfico e Manejo</h3>
<p>A abordagem do trato urinário inferior no trauma pélvico exige regras estritas de segurança:</p>
<ul>
  <li><strong>Rotura Vesical Intraperitoneal:</strong> Ocorre caracteristicamente na cúpula da bexiga distendida por aumento súbito da pressão hidrostática (efeito golpe). Causa extravasamento de urina estéril ou infectada para a cavidade peritoneal com peritonite química, íleo paralítico e reabsorção urinária de ureia e creatinina (pseudo-insuficiência renal). <strong>O tratamento é obrigatoriamente cirúrgico:</strong> laparotomia exploradora com rafia vesical em duas camadas com fio absorvível e drenagem vesical por sonda de Foley ou cistostomia.</li>
  <li><strong>Rotura Vesical Extraperitoneal:</strong> Ocorre em mais de 80% dos casos associada a fratura dos ramos púbicos, com laceração da base ou colo vesical por espícula óssea. A urina extravasa para o espaço pré-peritoneal de Retzius. <strong>O tratamento habitual é conservador:</strong> cateterismo vesical de demora contínuo por 10 a 14 dias para descompressão e cicatrização espontânea, reservando-se cirurgia se houver fragmentos ósseos no interior da bexiga ou indicação de laparotomia por outra lesão associada.</li>
  <li><strong>Trauma de Uretra Anterior vs Posterior:</strong> A tríade de <strong>uretrorragia (sangue no meato uretral), retenção urinária aguda com bexigoma palpável e próstata flutuante / não palpável ao toque retal</strong> indica formalmente lesão uretral (comum na uretra membranosa no homem associada a fratura pélvica). <strong>É estritamente proibida a sondagem vesical às cegas</strong> pelo risco de converter uma laceração parcial em rotura completa e criar falsos trajetos. A conduta mandatória é a realização prévia de <strong>Uretrocistografia Retrógrada</strong> para avaliar a integridade uretral; na emergência com retenção urinária e uretra rota, deve-se realizar <strong>Cistostomia Suprapúbica por punção ou cirúrgica</strong>.</li>
</ul>
`;

console.log('Expandindo os 5 cadernos com aprofundamento clínico...');
appendSectionToBook('desidratacao-e-terapia-de-reidratacao', 'sec-aprofundamento-desidratacao-eletrolitos', 'Aprofundamento Clínico: Compartimentos Hídricos, Holliday-Segar e Distúrbios Hidroeletrolíticos Críticos', sec053);
appendSectionToBook('vigilancia-em-saude', 'sec-aprofundamento-sistemas-informacao-indicadores', 'Aprofundamento Clínico: Sistemas Nacionais de Informação (SIM, SINASC, SINAN, SI-PNI) e Metodologia de Investigação de Campo', sec055);
appendSectionToBook('trauma-toracico', 'sec-aprofundamento-trauma-toracico-critico', 'Aprofundamento Clínico: Fisiopatologia das Lesões Torácicas Ameaçadoras e Critérios de Toracotomia de Emergência', sec057);
appendSectionToBook('diarreia-aguda', 'sec-aprofundamento-diarreia-microbiologia-terapeutica', 'Aprofundamento Clínico: Fisiopatologia das Síndromes Diarreicas e Uso Racional de Medicamentos em Pediatria', sec058);
appendSectionToBook('trauma-pelvico-e-geniturinario', 'sec-aprofundamento-trauma-pelvico-hemostasia-urologia', 'Aprofundamento Clínico: Mecânica Pélvica de Young-Burgess, Controle de Danos e Abordagem do Trauma Geniturinário', sec067);
console.log('Concluído!');
