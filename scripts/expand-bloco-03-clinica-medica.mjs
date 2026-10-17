import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

function appendSectionToBook(slug, sectionId, sectionTitle, htmlContent) {
  const jsonPath = path.join('apostilas', slug, 'content.json');
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  payload.o = payload.o.filter(item => item[0] !== sectionId && item[0] !== 'referencias');
  payload.q = payload.q.filter(item => item[0] !== sectionId && item[0] !== 'referencias');

  payload.o.push([sectionId, sectionTitle]);
  payload.q.push([sectionId, 0, htmlToBlocks(sectionTitle, htmlContent)]);

  payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
  payload.q.push([
    'referencias',
    0,
    [
      ['2', 'Referências Oficiais e Diretrizes'],
      [
        'o',
        [
          '<a href="https://sbpt.org.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pneumologia e Tisiologia (SBPT)</a>',
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.thoracic.org" target="_blank" rel="noopener noreferrer">American Thoracic Society / Infectious Diseases Society of America (ATS/IDSA)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// ==========================================
// EXPANSÃO AULA 056: PNEUMONIAS ADQUIRIDAS NA COMUNIDADE (PAC)
// ==========================================
const secPAC1 = `
<h3>Biomarcadores Inflamatórios e Cinética da Procalcitonina na Tomada de Decisão</h3>
<p>A diferenciação entre etiologias bacterianas típicas, infecções virais puras e causas inflamatórias não infecciosas representa um dos maiores dilemas diagnósticos na admissão de pacientes com infiltrado pulmonar agudo. O uso racional de biomarcadores séricos laboratoriais, em especial a <strong>Procalcitonina (PCT)</strong> e a <strong>Proteína C-Reativa (PCR)</strong>, fornece subsídios objetivos para evitar a prescrição indiscriminada de antibióticos e guiar o tempo ideal de descontinuação terapêutica:</p>
<ul>
  <li><strong>Cinética e Fisiopatologia da Procalcitonina:</strong> Em indivíduos saudáveis, a procalcitonina é um peptídeo precursor do hormônio calcitonina, sintetizado quase exclusivamente pelas células C da tireoide, mantendo níveis séricos normais indetectáveis ou inferiores a 0,05 mcg/L. Durante infecções bacterianas invasivas com resposta sistêmica, citocinas pró-inflamatórias (em especial interleucina-1 beta e TNF-alfa) estimulam a transcrição ectópica do gene CALC-1 em múltiplos tecidos parenquimatosos parenquimatosos extratireoidianos (fígado, pulmões, rins e gordura), elevando rapidamente as concentrações plasmáticas de PCT em 2 a 4 horas pós-infecção, com pico em 12 a 24 horas. Em contrapartida, durante infecções virais puras, a produção maciça de interferon-gama (IFN-$\gamma$) sintetizado pelas células natural killer e linfócitos T atua como um <strong>potente inibidor específico da síntese tecidual de procalcitonina</strong>, mantendo seus níveis basais baixos mesmo na presença de febre alta e sintomas respiratórios exuberantes.</li>
  <li><strong>Algoritmo de Interpretação Clínica da Procalcitonina na PAC (Diretrizes SBPT / ATS):</strong>
    <ul>
      <li><strong>PCT &lt; 0,10 mcg/L:</strong> Infecção bacteriana improvável. Antibioticoterapia fortemente desaconselhada (investigar etiologia viral primária).</li>
      <li><strong>PCT entre 0,10 e 0,25 mcg/L:</strong> Infecção bacteriana pouco provável. Antibioticoterapia desaconselhada, exceto em pacientes com instabilidade hemodinâmica, hipoxemia grave ou alto risco clínico.</li>
      <li><strong>PCT entre 0,26 e 0,50 mcg/L:</strong> Infecção bacteriana provável. Antibioticoterapia indicada.</li>
      <li><strong>PCT &gt; 0,50 mcg/L (ou &gt; 1,0 mcg/L):</strong> Infecção bacteriana invasiva confirmada ou sepse bacteriana grave. Indicação mandatória e imediata de antibioticoterapia parenteral de amplo espectro.</li>
    </ul>
  </li>
  <li><strong>Interrupção Precoce de Antibióticos Guiada por PCT:</strong> Dosagens seriadas de PCT a cada 48 a 72 horas em pacientes internados com resposta clínica favorável permitem a descontinuação segura dos antibióticos quando houver <strong>queda de &ge; 80% do valor basal de pico</strong> ou valor absoluto &lt; 0,25 mcg/L, reduzindo o tempo médio de tratamento de 10-14 dias para apenas 5 dias sem elevar taxas de recidiva ou mortalidade.</li>
</ul>

<h3>Diagnóstico Diferencial Clínico e Radiológico da Consolidação Pulmonar</h3>
<p>Nem todo infiltrado alveolar com febre e tosse é pneumonia bacteriana. O médico assistente deve estar atento aos principais diagnósticos diferenciais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Condição Clínica</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Diferenciação Propedêutica e Radiológica da PAC</th>
      <th>Exame Chave para Confirmação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Edema Agudo de Pulmão (EAP Cardiogênico)</strong></td>
      <td>Hipertensão venocapilar pulmonar por disfunção sistólica ou diastólica de VE (pressão capilar pulmonar &gt; 18-20 mmHg), transudação de líquido para o interstício e alvéolos.</td>
      <td>Presença de estertores crepitantes bilaterais difusos em 'maré montante', ortopneia, dispneia paroxística noturna, turgência jugular patológica e terceira bulha (B3). Radiografia evidencia cardiomegalia, congestão hilar em 'asa de borboleta', linhas B de Kerley e derrame pleural bilateral transudativo.</td>
      <td>Ecocardiograma transtorácico com fração de ejeção reduzida, dosagem de <strong>BNP &gt; 400-500 pg/mL (ou NT-proBNP &gt; 900-1.800 pg/mL)</strong> e resposta rápida à furosemida venosa e vasodilatadores.</td>
    </tr>
    <tr>
      <td><strong>Infarto Pulmonar por Tromboembolismo (TEP)</strong></td>
      <td>Oclusão de ramo arterial pulmonar periférico por êmbolo hemático com isquemia, hemorragia alveolar e necrose tecidual.</td>
      <td>Instalação ultrassúbita de dor torácica pleurítica, hemoptise em escarro com sangue vivo e dispneia desproporcional ao exame físico pulmonar. Radiografia pode evidenciar a clássica <strong>Corcova de Hampton</strong> (opacidade triangular periférica de base pleural e ápice voltado para o hilo) e sinal de Westermark.</td>
      <td><strong>Angiotomografia de artérias pulmonares</strong> com falha de enchimento vascular por trombo intraluminal.</td>
    </tr>
    <tr>
      <td><strong>Pneumonia em Organização Criptogênica (COP)</strong></td>
      <td>Doença pulmonar intersticial idiopática com proliferação fibroblástica intraluminal e corpos de Masson nos alvéolos e ductos alveolares.</td>
      <td>Sintomas subagudos arrastados por semanas ou meses com tosse seca, febre baixa e perda ponderal que <strong>não respondem a múltiplos esquemas de antibióticos empíricos</strong>. TC evidencia consolidações periféricas e peribroncovasculares migratórias e o clássico <strong>sinal do halo invertido</strong> (consolidação em anel circundando área central de atenuação em vidro fosco).</td>
      <td>Biópsia pulmonar cirúrgica ou transbrônquica e <strong>resposta clínica e radiológica dramática à corticoterapia sistêmica</strong> (Prednisona 0,75 a 1,0 mg/kg/dia).</td>
    </tr>
    <tr>
      <td><strong>Carcinoma Bronquíolo-Alveolar / Adenocarcinoma Pulmonar In Situ</strong></td>
      <td>Neoplasia pulmonar com padrão de crescimento lepídico ao longo dos septos alveolares sem invasão estromal destrutiva.</td>
      <td>Consolidação alveolar crônica persistente sem melhora após semanas, com expectoração abundante de muco claro ('broncorreia aquosa') e ausência de febre ou leucocitose.</td>
      <td>Broncoscopia com lavado broncoalveolar ou biópsia demonstrando células epiteliais neoplásicas atípicas.</td>
    </tr>
  </tbody>
</table>

<h3>PAC no Paciente Idoso Frágil: Manifestações Atípicas e Armadilhas Diagnósticas</h3>
<p>No idoso com mais de 75 a 80 anos, a resposta inflamatória sistêmica é frequentemente embotada pelo fenômeno do <em>imunossenescência</em>. Mais de 30% a 40% dos idosos com pneumonia grave <strong>NÃO apresentam febre, tosse produtiva ou dor torácica</strong> na admissão hospitalar. O quadro clínico inicial manifesta-se tipicamente através de sintomas neurológicos e comportamentais inespecíficos:</p>
<ul>
  <li><strong>Delirium hipoativo ou hiperativo de início agudo:</strong> Confusão mental, desorientação temporal/espacial, sonolência excessiva ou agitação psicomotora súbita;</li>
  <li><strong>Quedas recorrentes da própria altura</strong> e instabilidade postural por fraqueza muscular aguda;</li>
  <li><strong>Inapetência total e recusa alimentar</strong> com desidratação secundária;</li>
  <li><strong>Descompensação inexplicada de comorbidades prévias</strong> (descompensação de diabetes mellitus com hiperglicemia refratária ou piora da insuficiência cardíaca congestiva);</li>
  <li><strong>Taquipneia silenciosa (FR &gt; 24 a 28 irpm)</strong>: É frequentemente o <strong>sinal físico mais precoce, sensível e constante</strong> de pneumonia no paciente idoso frágil, devendo ser ativamente pesquisado e contado pelo médico em um minuto completo de observação respiratória.</li>
</ul>
`;

const secPAC2 = `
<h3>Tratamento de Patógenos Especiais: S. aureus Necrotizante, Pseudomonas e Anaeróbios</h3>
<p>Em determinados subgrupos de pacientes hospitalizados com PAC grave, a identificação de fatores de risco epidemiológicos e clínicos impõe a cobertura empírica ampliada para microrganismos de alta letalidade:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Patógeno Especial</th>
      <th>Fatores de Risco Clínicos e Epidemiológicos</th>
      <th>Esquema Antimicrobiano Direcionado de Escolha</th>
      <th>Particularidades Fisiopatológicas e Cuidados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong><em>Staphylococcus aureus</em> Meticilina-Resistente Comunitário (CA-MRSA)</strong></td>
      <td>• Pneumonia pós-influenza (superinfecção bacteriana após gripe com febre bifásica);<br>• Pacientes jovens previamente hígidos em ambientes fechados (quartéis, atletas de contato);<br>• Presença de hemoptise maciça, leucopenia grave, lesões cavitárias múltiplas e pneumotórax espontâneo ao raio-X.</td>
      <td>• <strong>Linezolida 600 mg IV de 12/12h</strong> (fármaco de escolha por inibir a síntese proteica ribossomal e <strong>bloquear a produção da toxina leucocidina de Panton-Valentine [PVL]</strong>, além de atingir excelente concentração no líquido de revestimento epitelial alveolar);<br>• Alternativa: <strong>Vancomicina 15 a 20 mg/kg IV de 8/12h</strong> (com monitorização estrita de vale sérico entre 15 e 20 mcg/mL).</td>
      <td>Produção da toxina PVL causa necrose tecidual fulminante com destruição neutrofílica, hemorragia alveolar maciça e choque séptico com mortalidade superior a 50% em 48 horas.</td>
    </tr>
    <tr>
      <td><strong><em>Pseudomonas aeruginosa</em></strong></td>
      <td>• Portadores de <strong>bronquiectasias</strong> estruturais graves ou fibrose cística;<br>• DPOC avançado com uso frequente de corticoterapia sistêmica oral ou múltiplos ciclos de antibióticos nos últimos 90 dias;<br>• Colonização respiratória prévia conhecida por <em>P. aeruginosa</em>.</td>
      <td>Terapia combinada antipseudomonas:<br>• <strong>Betalactâmico Antipseudomonas:</strong> <strong>Piperacilina-Tazobactam 4,5g IV de 6/6h</strong> (ou Cefepima 2g IV de 8/8h; ou Meropenem 1g IV de 8/8h);<br>• <strong>Associado a:</strong> <strong>Levofloxacino 750 mg IV 1x/dia</strong> (ou Ciprofloxacino 400 mg IV de 8/8h; ou Amicacina 15 a 20 mg/kg/dia IV).</td>
      <td>Requer doses plenas de betalactâmicos infundidos preferencialmente em <strong>infusão estendida (3 a 4 horas) ou contínua</strong> para otimizar o tempo acima da concentração inibitória mínima ($\%T > \text{CIM}$).</td>
    </tr>
    <tr>
      <td><strong>Bactérias Anaeróbias da Cavidade Oral (Pneumonia Aspirativa)</strong></td>
      <td>• Episódio presenciado de macroaspiração de vômitos ou conteúdo gástrico;<br>• Rebaixamento do nível de consciência (coma alcoólico, crise convulsiva, TCE, anestesia geral);<br>• Distúrbios neurológicos de deglutição (sequela de AVC, ELA, Parkinson);<br>• Má higiene dentária com doença periodontal grave.</td>
      <td>• <strong>Ampicilina-Sulbactam 1,5g a 3g IV de 6/6h</strong> (droga de escolha no Brasil);<br>• Alternativa: <strong>Amoxicilina-Clavulanato 875/125 mg VO 12/12h</strong> ou <strong>Clindamicina 600 mg IV de 8/8h</strong> (ou Ceftriaxona associada a Metronidazol 500 mg IV 8/8h).</td>
      <td>Localização radiológica característica nos <strong>segmentos dependentes da gravidade</strong>: segmento superior do lobo inferior e segmento posterior do lobo superior direito (em decúbito dorsal). Evolui frequentemente para abscesso pulmonar e empiema se não tratada precocemente.</td>
    </tr>
  </tbody>
</table>

<h3>Bateria de Questões Comentadas com Análise Detalhada de Todas as Alternativas</h3>
<div class="book-question">
  <h4>Questão Comentada 2: ENARE 2025 / Clínica Médica — PAC Grave e Critérios ATS/IDSA</h4>
  <p><strong>Enunciado:</strong> Homem de 68 anos dá entrada no pronto-socorro com tosse produtiva, febre de 39 °C e confusão mental aguda iniciadas há 48 horas. Ao exame físico: orientado apenas no espaço, taquipneico com FR: 32 irpm, SpO2: 87% em cateter nasal a 3 L/min, FC: 124 bpm, PA: 85/50 mmHg. Ausculta com estertores crepitantes bilaterais. O raio-X de tórax revela consolidação alveolar em lobo inferior direito e lobo médio. Exames laboratoriais: Leucócitos: 2.900/mm³ com 15% de bastões, Plaquetas: 88.000/mm³, Ureia: 74 mg/dL e Creatinina: 2,1 mg/dL. Segundo as diretrizes da ATS/IDSA e SBPT, qual a estratificação de gravidade e o local correto de admissão hospitalar?</p>
  <p>A) Baixo risco pelo CURB-65; manter em observação na sala de medicação e liberar com azitromicina oral.<br>
  B) Risco intermediário; admitir em enfermaria clínica geral para ceftriaxona em monoterapia.<br>
  C) PAC Grave com indicação formal de admissão em Unidade de Terapia Intensiva (UTI) pelo preenchimento de &ge; 3 critérios menores da ATS/IDSA.<br>
  D) PAC com indicação cirúrgica de toracotomia imediata para decorticação pulmonar bilateral.</p>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O paciente preenche nada menos que <strong>seis critérios menores da ATS/IDSA para admissão direta em UTI</strong> (são necessários apenas 3): 1. Frequência respiratória &ge; 30 irpm (tem 32); 2. Infiltrado multilobar (lobo inferior direito e lobo médio); 3. Confusão mental aguda; 4. Ureia &ge; 50 mg/dL (tem 74); 5. Leucopenia induzida por sepse &lt; 4.000/mm³ (tem 2.900); 6. Trombocitopenia &lt; 100.000/mm³ (tem 88.000); além de hipotensão arterial sistêmica. O CURB-65 do paciente é de 4 pontos (Confusão, Ureia, Respiração e Idade &ge; 65 anos), que confere mortalidade estimada superior a 30%. A conduta mandatória é a <strong>transferência imediata para leito de UTI</strong>, monitorização invasiva e terapia combinada parenteral (Ceftriaxona + Azitromicina ou Fluoroquinolona respiratória em altas doses).</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 3: USP / FMUSP — Derrame Parapneumônico Complicado e Drenagem</h4>
  <p><strong>Enunciado:</strong> Mulher de 42 anos encontra-se internada há 4 dias em uso de Ceftriaxona para PAC extensa em lobo inferior esquerdo. Mantém picos febris diários de 38,5 °C e queixa-se de piora da dor torácica ventilatório-dependente. A ultrassonografia de tórax à beira do leito demonstra derrame pleural loculado com septações finas de fibrina. O médico assistente realiza toracocentese diagnóstica, obtendo líquido pleural turvo com os seguintes resultados laboratoriais: pH: 7,08, Glicose: 22 mg/dL, DHL: 1.850 UI/L, Leucócitos: 45.000/mm³ com 90% de neutrófilos. A bacterioscopia pelo Gram está pendente. Qual a conduta mandatória imediata?</p>
  <p>A) Trocar a ceftriaxona por ciprofloxacino oral e repetir a toracocentese em 72 horas.<br>
  B) Indicar toracostomia tubular com drenagem pleural fechada em selo d'água de urgência.<br>
  C) Manter conduta expectante com o mesmo antibiótico, visto que o líquido é estéril ao aspecto macroscópico.<br>
  D) Instilar corticoide intrapleural para dissolver as septações de fibrina.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Os parâmetros laboratoriais confirmam categoricamente o diagnóstico de <strong>Derrame Parapneumônico Complicado</strong>: <strong>pH &lt; 7,20 (está 7,08), Glicose &lt; 40 mg/dL (está 22) e DHL &gt; 1.000 UI/L (está 1.850)</strong>, além da presença de septações loculadas de fibrina ao ultrassom. A acidose e a hipoglicemia extremas decorrem do consumo glicolítico bacteriano anaeróbio ativo e da lise neutrofílica no espaço pleural. Essa coleção NÃO responde exclusivamente a antimicrobianos sistêmicos (que têm penetração errática em cavidades fechadas purulentas). A conduta mandatória e urgente é a <strong>Drenagem Pleural Fechada com dreno tubular calibroso em selo d'água</strong> para esvaziamento da coleção, expansão pulmonar e prevenção de encarceramento pulmonar fibrinoso crônico.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 4: UNICAMP — Superinfecção Estafilocócica Pós-Gripe</h4>
  <p><strong>Enunciado:</strong> Jovem de 24 anos, previamente hígido, apresentou quadro de síndrome gripal típica por Influenza A confirmada há 8 dias, com melhora completa dos sintomas após 4 dias. Ontem, voltou a apresentar febre alta súbita (39,8 °C) com calafrios trepidantes, tosse com expectoração sanguinolenta escura e dor torácica intensa. A radiografia de tórax evidencia infiltrados bilaterais com múltiplas cavitações de paredes espessas e nível hidroaéreo, associadas a pneumotórax laminar à direita. Qual o patógeno bacteriano mais fortemente associado a esse padrão clínico-radiológico e qual o tratamento indicado?</p>
  <p>A) <em>Mycoplasma pneumoniae</em>; prescrever doxiciclina oral por 7 dias.<br>
  B) <em>Staphylococcus aureus</em>; associar vancomicina ou linezolida ao esquema com betalactâmico.<br>
  C) <em>Legionella pneumophila</em>; prescrever levofloxacino oral em monoterapia.<br>
  D) <em>Pseudomonas aeruginosa</em>; prescrever ciprofloxacino oral isolado.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O cenário clínico de febre bifásica (melhora da gripe seguida de piora catastrófica precoce), tosse com escarro hemoptoico, necrose pulmonar com múltiplas cavitações parenquimatosas e pneumotórax espontâneo é a apresentação clássica da <strong>Pneumonia Estafilocócica Necrotizante Pós-Influenza causada por <em>Staphylococcus aureus</em></strong> (frequentemente cepas produtoras de Leucocidina de Panton-Valentine - PVL). A conduta mandatória consiste na cobertura empírica imediata contra <em>S. aureus</em> resistente à meticilina (MRSA) com <strong>Linezolida IV (fármaco que inibe a síntese ribossômica e bloqueia a liberação da toxina PVL) ou Vancomicina IV</strong>, associada a betalactâmico de amplo espectro.</p>
</div>
`;

// ==========================================
// EXPANSÃO AULA 061: TUBERCULOSE PULMONAR
// ==========================================
const secTB1 = `
<h3>Imunopatologia da Infecção Micobacteriana: Arquitetura do Granuloma e Fatores de Virulência</h3>
<p>O sucesso evolutivo do <em>Mycobacterium tuberculosis</em> como um dos patógenos humanos mais letais da história reside em sua capacidade ímpar de manipular o sistema imune do hospedeiro para garantir sua sobrevivência intracelular prolongada. Ao contrário de bactérias piogênicas comuns que produzem exotoxinas líticas potentes, o bacilo de Koch não secreta toxinas diretas; sua virulência decorre da estrutura lipídica complexa de seu envelope celular e de sua interação com as células imunes:</p>
<ul>
  <li><strong>Fuga da Destruição Fagocitária pelos Macrófagos:</strong> Após a inalação e fagocitose por macrófagos alveolares via receptores de manose e receptores de complemento (CR3), o bacilo impede ativamente a maturação do fagolisossomo. Moléculas como o <strong>Lipoarabinomanano (LAM)</strong> e o <strong>Trealose 6,6'-dimicolato (fator corda)</strong> inibem a sinalização de cálcio intracelular e bloqueiam o recrutamento da proteína EEA1 (Early Endosome Antigen 1) e da ATPase vesicular promotora de prótons, impedindo a acidificação do vacúolo e a fusão do fagossomo com os lisossomos hidrolíticos. O bacilo multiplica-se livremente dentro do fagossomo por 2 a 4 semanas.</li>
  <li><strong>Imunidade Mediada por Células (Resposta Th1 Protetora):</strong> A transição para a fase imunológica adaptativa ocorre quando células dendríticas migram para os linfonodos hilares e apresentam antígenos micobacterianos aos linfócitos T naive via moléculas de MHC classe II. Isso desencadeia a diferenciação de <strong>linfócitos T auxiliares CD4+ produtores de Interleucina-12 (IL-12) e Interferon-gama (IFN-$\gamma$)</strong>. O IFN-$\gamma$, em sinergia com o <strong>Fator de Necrose Tumoral Alfa (TNF-$\alpha$)</strong>, promove a ativação macrofágica plena ('macrófago ativado'), induzindo a expressão da enzima Óxido Nítrico Sintase Induzível (iNOS) e geração de intermediários reativos de nitrogênio e oxigênio capazes de paralisar a replicação bacilar.</li>
  <li><strong>Arquitetura Histopatológica do Granuloma Tuberculoide:</strong> O granuloma é uma estrutura tecidual altamente organizada que atua simultaneamente como barreira de contenção da infecção e nicho de persistência bacilar. É composto concentricamente por:
    <ol>
      <li><strong>Centro Necrótico Acelular:</strong> Necrose de coagulação característica conhecida como <strong>necrose caseosa</strong> (aspecto macroscópico de queijo branco friável), contendo restos lipídicos e bacilos dormentes em hipóxia e baixo pH;</li>
      <li><strong>Camada Intermediária de Macrófagos Modificados:</strong> Células epitelióides (macrófagos com citoplasma eosinofílico abundante e núcleos vesiculosos) fundidos na forma de <strong>Células Gigantes Multinucleadas de Langhans</strong>, cujos múltiplos núcleos dispõem-se em ferradura ou semicírculo na periferia celular;</li>
      <li><strong>Coroa Linfocitária Externa:</strong> Manguito periférico denso de linfócitos T CD4+, CD8+, linfócitos B e fibroblastos que depositam matriz de colágeno, promovendo o encapsulamento fibroso e a posterior calcificação distrófica (Complexo de Ghon e de Ranke).</li>
    </ol>
  </li>
  <li><strong>O Risco Crítico dos Inibidores do TNF-$\alpha$:</strong> O TNF-$\alpha$ é essencial para a manutenção da integridade estrutural do granuloma. Pacientes em uso de terapias imunobiológicas anti-TNF (Infliximabe, Adalimumabe, Etanercepte) apresentam dissolução rápida da barreira granulomatosa, com liquefação caseosa e <strong>reativação fulminante da tuberculose latente</strong> em até 20 a 50 vezes a taxa basal, manifestando-se frequentemente sob formas miliares e extrapulmonares graves. Por essa razão, a triagem com Prova Tuberculínica (PT) ou IGRA e radiografia de tórax é mandatória antes de iniciar qualquer agente anti-TNF.</li>
</ul>

<h3>Tuberculose Extrapulmonar: Pleurite, Meningite, Escrofulodermia e Mal de Pott</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Forma Extrapulmonar</th>
      <th>Fisiopatologia e Vias de Disseminação</th>
      <th>Quadro Clínico e Métodos Diagnósticos Padrão</th>
      <th>Particularidades do Tratamento (MS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tuberculose Pleural (Pleurite Tuberculosa)</strong></td>
      <td>Forma extrapulmonar mais comum no paciente imunocompetente. Decorre da rotura de um pequeno foco caseoso subpleural para a cavidade pleural, desencadeando resposta inflamatória de hipersensibilidade tardia exsudativa.</td>
      <td>Dor torácica pleurítica aguda ou subaguda, febre vespertina, tosse seca e dispneia.<br><strong>Análise do Líquido Pleural:</strong> Exsudato de aspecto citrino amarelo-palha; <strong>predomínio linfocítico (&gt; 50% a 80%)</strong>; raríssimas células mesoteliais (&lt; 5%); <strong>Adenosina Deaminase (ADA) &gt; 40 U/L</strong> (altíssima sensibilidade e valor preditivo positivo no Brasil); baciloscopia raramente positiva (&lt; 5%). Biópsia pleural por agulha de Cope com histopatológico fecha diagnóstico em &gt; 85%.</td>
      <td>Esquema padrão RIPE por <strong>6 meses</strong> (2 RIPE / 4 RI). Não exige corticoterapia de rotina, exceto em derrame volumoso sintomático.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Meníngea (Meningite Tuberculosa)</strong></td>
      <td>Disseminação hematogênica inicial com formação de pequenos focos caseosos no córtex e meninges (focos de Rich) que se rompem para o espaço subaracnóideo, produzindo exsudato gelatinoso espesso na <strong>base do crânio</strong>.</td>
      <td>Quadro subagudo/crônico insidioso (1 a 3 semanas): febre, cefaleia refratária, vômitos, paralisia de pares cranianos oculomotores (III, IV e VI) e rebaixamento cognitivo.<br><strong>Líquor (LCR):</strong> Líquido claro ou xantocrômico com formação de 'retículo de Mya' em repouso; pleocitose moderada (100 a 500 cels/mm³) com predomínio linfomonocitário; <strong>glicorraquia extremamente baixa (&lt; 50% da glicemia ou &lt; 40 mg/dL)</strong>; hiperproteinorraquia acentuada (&gt; 100 a 500 mg/dL); ADA &gt; 8 a 10 U/L e TRM-TB no LCR positivo.</td>
      <td><strong>Tratamento Prolongado por 12 meses:</strong> 2 meses de RHZE + <strong>10 meses de RH</strong>.<br><strong>Corticoterapia Sistêmica Obrigatória:</strong> Dexametasona IV (0,3 a 0,4 mg/kg/dia) ou Prednisona oral (1 a 2 mg/kg/dia) por 4 a 8 semanas com desmame progressivo, reduzindo mortalidade e sequelas neurológicas.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Osteoarticular (Mal de Pott)</strong></td>
      <td>Disseminação hematogênica para o osso trabecular vascularizado dos corpos vertebrais (predileção pela <strong>coluna torácica baixa e lombar alta</strong>). O bacilo destrói o disco intervertebral e os corpos vertebrais adjacentes.</td>
      <td>Dor lombar crônica de início insidioso, espasmo muscular paravertebral, deformidade cifótica angular progressiva ('giba de Pott'), formação de abscesso frio no músculo psoas e risco de compressão medular com paraplegia.</td>
      <td>Esquema prolongado por <strong>12 meses</strong> (2 RHZE / 10 RH). Descompressão cirúrgica e estabilização de coluna indicada se houver déficit neurológico agudo ou instabilidade mecânica.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Ganglionar Periférica</strong></td>
      <td>Disseminação linfática retrógrada para as cadeias cervicais e supraclaviculares (escrófula), comum em crianças e PVHIV.</td>
      <td>Aumento subagudo indolor de múltiplos linfonodos cervicais que confluem em massa endurecida (linfonodos coalescentes aderidos aos planos profundos), evoluindo com amolecimento central, flutuação e fistulização espontânea para a pele com drenagem de caseum espesso (escrofulodermia).</td>
      <td>Esquema RIPE padrão por <strong>6 meses</strong>. A aspiração por agulha fina (PAAF) para baciloscopia, cultura e TRM-TB é o método diagnóstico de escolha.</td>
    </tr>
  </tbody>
</table>
`;

const secTB2 = `
<h3>Novas Diretrizes no Manejo da Tuberculose Resistente (TB-MDR) e Esquemas BPaLM</h3>
<p>A resistência aos fármacos antituberculosos configura uma emergência global de saúde pública. No Brasil, o Programa Nacional de Controle da Tuberculose (PNCT/MS) alinhou seus protocolos às diretrizes da Organização Mundial da Saúde (OMS), implementando esquemas orais encurtados revolucionários:</p>
<ul>
  <li><strong>Definições Oficiais de Resistência Bacilar:</strong>
    <ul>
      <li><strong>Monorresistência:</strong> Resistência a apenas um fármaco anti-TB de primeira linha (ex.: resistência isolada à isoniazida);</li>
      <li><strong>Polirresistência:</strong> Resistência a dois ou mais fármacos de primeira linha, <strong>exceto</strong> a associação combinada de Rifampicina + Isoniazida;</li>
      <li><strong>Tuberculose Multirresistente (TB-MDR):</strong> Bacilos com resistência confirmada simultaneamente a pelo menos <strong>Rifampicina E Isoniazida</strong>;</li>
      <li><strong>Tuberculose Extensivamente Resistente (TB-XDR):</strong> TB-MDR que apresenta resistência adicional a qualquer <strong>Fluoroquinolona</strong> (Levofloxacino ou Moxifloxacino) E a pelo menos um dos fármacos do Grupo A da OMS (<strong>Bedaquilina ou Linezolida</strong>).</li>
    </ul>
  </li>
  <li><strong>O Novo Esquema Padronizado BPaLM (Tratamento Todo Oral de 6 Meses):</strong> Historicamente, o tratamento da TB-MDR exigia 18 a 24 meses de drogas tóxicas com injeções diárias dolorosas de amicacina. O regime moderno BPaLM, incorporado ao SUS, consiste em:
    <ol>
      <li><strong>Bedaquilina (B):</strong> Inibidor da ATP-sintase micobacteriana;</li>
      <li><strong>Pretomanida (Pa):</strong> Novo nitroimidazol com ação bactericida contra bacilos intracelulares dormentes;</li>
      <li><strong>Linezolida (L):</strong> Inibidor da síntese proteica ribossomal (600 mg/dia);</li>
      <li><strong>Moxifloxacino (M):</strong> Fluoroquinolona respiratória de alta potência (retirado se houver resistência confirmada a quinolonas, tornando-se esquema BPaL).</li>
    </ol>
    <p>O tempo total de tratamento foi reduzido para apenas <strong>6 meses com medicamentos 100% orais</strong>, alcançando taxas de cura superiores a 88% a 90%.</p>
  </li>
</ul>

<h3>Bateria de Questões Comentadas com Análise Detalhada de Todas as Alternativas</h3>
<div class="book-question">
  <h4>Questão Comentada 2: ENARE 2024 / Infectologia — Pleurite Tuberculosa e ADA Pleural</h4>
  <p><strong>Enunciado:</strong> Jovem de 26 anos, previamente saudável, procura assistência médica queixando-se de dor torácica ventilatório-dependente à direita há 10 dias, associada a tosse seca, febre baixa vespertina e sudorese noturna. A radiografia de tórax evidencia derrame pleural moderado à direita com sinal do menisco típico. O médico realiza toracocentese diagnóstica, obtendo líquido amarelo citrino. Qual o conjunto de achados laboratoriais no líquido pleural que apresenta maior acurácia e valor preditivo positivo para o diagnóstico de Tuberculose Pleural no contexto epidemiológico brasileiro?</p>
  <p>A) Transudato com predomínio de neutrófilos &gt; 80%, glicose &gt; 100 mg/dL e ADA &lt; 15 U/L.<br>
  B) Exsudato com predomínio linfocitário (&gt; 50%), raríssimas células mesoteliais (&lt; 5%), ADA &gt; 40 U/L e glicose &lt; 60 mg/dL.<br>
  C) Exsudato com presença abundante de células mesoteliais (&gt; 50%), ADA indetectável e amilase pleural elevada.<br>
  D) Líquido quiloso com triglicerídeos &gt; 110 mg/dL e ausência de leucócitos no Gram.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O diagnóstico de <strong>Pleurite Tuberculosa</strong> fundamenta-se na análise bioquímica e citológica do líquido pleural, que se caracteriza como um <strong>exsudato inflamatório seroso com predomínio marcante de linfócitos (frequentemente &gt; 70% a 90%), escassez patognomônica de células mesoteliais (&lt; 5%</strong> — pois a fibrina tuberculoide recobre a pleura e impede a descamação mesotelial) e <strong>elevação acentuada da Adenosina Deaminase (ADA &gt; 40 U/L)</strong>. No Brasil, país de alta endemicidade para TB, um exsudato linfocítico com ADA &gt; 40 U/L em jovem com quadro subagudo tem valor preditivo positivo superior a 95%, autorizando o início do esquema RIPE por 6 meses mesmo se a baciloscopia direta do líquido for negativa (a baciloscopia do líquido pleural é positiva em menos de 5% dos casos devido à natureza paucibacilar imunológica do derrame).</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 3: USP / FMUSP — Manejo de Hepatotoxicidade pelo Esquema RIPE</h4>
  <p><strong>Enunciado:</strong> Homem de 48 anos iniciou tratamento para tuberculose pulmonar bacilífera com esquema RIPE em DFC há 3 semanas. Comparece à UBS para consulta de rotina relatando náuseas matinais leves, anorexia e mal-estar epigástrico nos últimos 4 dias. Nega icterícia ou colúria. Os exames de função hepática solicitados mostram: AST (TGO): 215 U/L (VR: até 40 U/L; elevação de 5,3 vezes o LSN), ALT (TGP): 198 U/L (VR: até 35 U/L; elevação de 5,6 vezes o LSN), Fosfatase Alcalina e Gama-GT normais, Bilirrubina Total: 1,1 mg/dL (fração direta 0,4 mg/dL). Segundo as diretrizes do Ministério da Saúde, qual a conduta imediata mandatória?</p>
  <p>A) Manter o esquema RIPE inalterado e prescrever ondansetrona oral para controle das náuseas, repetindo transaminases em 30 dias.<br>
  B) Suspender imediatamente todo o esquema RIPE e acompanhar o paciente com exames clínicos e laboratoriais semanais até normalização das enzimas hepáticas.<br>
  C) Suspender apenas a pirazinamida e manter rifampicina, isoniazida e etambutol.<br>
  D) Trocar imediatamente todo o esquema RIPE por amicacina injetável e levofloxacino.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O Manual de Recomendações para o Controle da Tuberculose no Brasil (Ministério da Saúde) estabelece critérios laboratoriais rígidos para <strong>Interrupção Imediata do Esquema RIPE por Hepatotoxicidade Induzida por Drogas (DILI)</strong>: elevação de AST/ALT <strong>&gt; 5 vezes o limite superior da normalidade (mesmo assintomático)</strong>, OU elevação <strong>&gt; 3 vezes o LSN associada a sintomas gastrointestinais</strong> (como náuseas e dor epigástrica, presentes no caso), OU surgimento de icterícia (Bilirrubina Total &gt; 2,0 mg/dL). A conduta mandatória é a <strong>suspensão IMEDIATA de todos os quatro medicamentos</strong> (Alternativa B correta). Manter o esquema (A) culminaria em necrose hepática fulminante e óbito. Não se deve suspender apenas uma droga isoladamente na fase aguda tóxica (C), devendo-se aguardar a queda das enzimas para &lt; 2 vezes o LSN para então proceder à reintrodução sequencial, escalonada e segura das drogas (Rifampicina &rarr; Isoniazida &rarr; Pirazinamida).</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 4: ENARE — Interação Medicamentosa entre Rifampicina e Antirretrovirais</h4>
  <p><strong>Enunciado:</strong> Mulher de 32 anos vivendo com HIV, em uso estável de esquema antirretroviral com Tenofovir (TDF), Lamivudina (3TC) e Dolutegravir (DTG), com contagem de CD4 de 380 células/mm³ e carga viral indetectável, é diagnosticada com tuberculose pulmonar bacilífera. O médico prescreve o esquema básico RIPE. Qual ajuste posológico obrigatório no esquema antirretroviral deve ser realizado para evitar falha virológica decorrente da interação medicamentosa farmacocinética com a Rifampicina?</p>
  <p>A) Substituir o Dolutegravir por Efavirenz em dose padrão.<br>
  B) Aumentar a posologia do Dolutegravir para 50 mg de 12 em 12 horas enquanto durar o uso da Rifampicina.<br>
  C) Reduzir a dose de Rifampicina para 300 mg ao dia para diminuir a indução enzimática.<br>
  D) Suspender a TARV durante os dois primeiros meses de fase intensiva do RIPE.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A <strong>Rifampicina é um dos mais potentes indutores universais do complexo enzimático microssomal hepático citocromo P450 (CYP3A4) e da enzima UGT1A1</strong>. O Dolutegravir (inibidor da integrase de primeira linha no Brasil) é metabolizado primariamente pela UGT1A1 com contribuição secundária do CYP3A4; o uso concomitante de rifampicina reduz as concentrações plasmáticas mínimas de dolutegravir em mais de 75%, acarretando risco iminente de falha virológica e emergência de mutações de resistência ao HIV. O protocolo oficial do Ministério da Saúde preconiza a <strong>duplicação da dose de Dolutegravir para 50 mg duas vezes ao dia (12/12h)</strong>, mantendo essa dosagem reforçada até 14 a 15 dias após a conclusão do uso da rifampicina (tempo necessário para a desindução enzimática hepática cessar). A dose da rifampicina nunca deve ser reduzida (C), pois comprometeria a cura da tuberculose.</p>
</div>
`;

console.log('Aplicando expansão completa nas aulas de Clínica Médica (PAC e Tuberculose)...');
appendSectionToBook('pneumonias-adquiridas-na-comunidade', 'sec-pac-biomarcadores-diferencial-idosos', 'Aprofundamento Avançado: Biomarcadores Inflamatórios (PCT/PCR), Diagnóstico Diferencial e PAC no Idoso', secPAC1);
appendSectionToBook('pneumonias-adquiridas-na-comunidade', 'sec-pac-patogenos-especiais-questoes', 'Aprofundamento Avançado: Patógenos Especiais (MRSA, Pseudomonas, Anaeróbios) e Bateria de Questões Comentadas', secPAC2);

appendSectionToBook('tuberculose-pulmonar', 'sec-tb-imunopatologia-extrapulmonar', 'Aprofundamento Avançado: Imunopatologia do Granuloma, Fatores de Virulência e Formas Extrapulmonares Graves', secTB1);
appendSectionToBook('tuberculose-pulmonar', 'sec-tb-resistencia-bpalm-questoes', 'Aprofundamento Avançado: Novas Diretrizes para TB-MDR (BPaLM), Interações Farmacológicas e Bateria de Questões', secTB2);
console.log('Expansão de Clínica Médica concluída!');
