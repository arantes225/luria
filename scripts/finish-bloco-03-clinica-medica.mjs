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

// 1. PAC Extra 1: Ventilação Mecânica Protetora na SARA e Choque Séptico
const pacExtra1 = `
<h3>Ventilação Mecânica Protetora na SARA Decorrente de Pneumonia Grave</h3>
<p>A complicação respiratória mais temida da pneumonia bacteriana grave é a Síndrome do Desconforto Respiratório Agudo (SARA), desencadeada pela inflamação alveolar difusa, lesão da barreira alvéolo-capilar, inativação do surfactante pulmonar e edema pulmonar não cardiogênico. O manejo ventilatório invasivo em UTI fundamenta-se na <strong>Estratégia de Ventilação Protetora</strong> para prevenir a Lesão Pulmonar Induzida pela Ventilação (VILI / barotrauma / volutrauma / biotrauma):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Ventilatório</th>
      <th>Alvo Terapêutico Rigoroso</th>
      <th>Racional Fisiopatológico e Proteção Pulmonar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Volume Corrente ($V_t$)</strong></td>
      <td><strong>4 a 6 mL/kg de Peso Corporal Predito</strong> (calculado pela altura e sexo, NUNCA pelo peso real do paciente)</td>
      <td>Previne o volutrauma por hiperdistensão alveolar das unidades pulmonares saudáveis remanescentes ('baby lung').</td>
    </tr>
    <tr>
      <td><strong>Pressão de Platô ($P_{\text{platô}}$)</strong></td>
      <td><strong>&le; 30 cmH2O</strong></td>
      <td>Mede a complacência elástica do sistema respiratório em pausa inspiratória de 0,5 segundo. Níveis superiores a 30 cmH2O provocam ruptura alveolar e extravasamento de ar (barotrauma, pneumotórax).</td>
    </tr>
    <tr>
      <td><strong>Driving Pressure ($\Delta P$)</strong></td>
      <td><strong>&le; 15 cmH2O</strong> ($\Delta P = P_{\text{platô}} - \text{PEEP}$)</td>
      <td>Representa a pressão de distensão cíclica necessária para abrir os alvéolos a cada ciclo respiratório. É o preditor isolado mais sensível de mortalidade na SARA. Reduzir a driving pressure salva vidas.</td>
    </tr>
    <tr>
      <td><strong>Titulação da PEEP</strong></td>
      <td>PEEP moderada a alta (10 a 18 cmH2O conforme tabela ARDSNet PEEP/FiO2)</td>
      <td>Previne o atelectrauma (colapso e reabertura cíclica repetitiva de alvéolos instáveis ao final da expiração).</td>
    </tr>
    <tr>
      <td><strong>Posição Prona (Decúbito Ventral)</strong></td>
      <td><strong>Manter por 16 a 24 horas consecutivas</strong> em pacientes com $\text{PaO}_2 / \text{FiO}_2 &lt; 150$</td>
      <td>Homogeneíza o gradiente de pressão transpulmonar ventral-dorsal, descomprime as regiões pulmonares dorsais dependentes (que deixam de ser esmagadas pelo peso do coração e das vísceras abdominais), melhora a relação ventilação/perfusão e reduz a mortalidade em mais de 50%.</td>
    </tr>
  </tbody>
</table>

<h3>Ressuscitação Hemodinâmica no Choque Séptico de Foco Pulmonar (Surviving Sepsis Campaign)</h3>
<p>A pneumonia comunitária complicada com choque séptico exige intervenções imediatas na primeira hora ('Hour-1 Bundle'):</p>
<ul>
  <li><strong>Ressuscitação Volêmica Inicial Cautelosa:</strong> Infusão de cristaloides balanceados (Ringer Lactato ou Plasma-Lyte preferíveis ao SF 0,9% para evitar acidose hiperclorêmica) na dose inicial de 30 mL/kg nas primeiras 3 horas, guiada continuamente por preditores dinâmicos de resposta a volume (variação da pressão de pulso $\Delta PP$, elevação passiva dos membros inferiores e ultrassonografia de veia cava inferior), evitando a sobrecarga hídrica pulmonar que agrava a hipoxemia da pneumonia.</li>
  <li><strong>Droga Vasoativa de Primeira Linha:</strong> <strong>Noradrenalina em infusão contínua</strong> titulada para manter a Pressão Arterial Média ($\text{PAM}) \ge 65 \text{ mmHg}$. Deve ser iniciada precocemente, se necessário em acesso venoso periférico calibroso enquanto se providencia o acesso venoso central, sem aguardar o término dos cristaloides se a PAM estiver perigosamente baixa.</li>
  <li><strong>Vasopressina como Segundo Agente:</strong> Se a dose de noradrenalina estiver em ascensão (&gt; 0,25 mcg/kg/min), introduzir precocemente Vasopressina em dose fixa de <strong>0,03 U/min</strong> para restaurar o tônus vascular sem aumentar o consumo miocárdico de oxigênio.</li>
  <li><strong>Corticoterapia na Sepse Refratária:</strong> Indicar <strong>Hidrocortisona venosa na dose de 200 mg/dia</strong> (50 mg IV de 6/6h ou infusão contínua) exclusivamente se o paciente mantiver necessidade de doses elevadas de vasopressores após 4 horas de ressuscitação adequada.</li>
</ul>
`;

const pacExtra2 = `
<h3>Prevenção Imunobiológica da PAC no Adulto: Vacinação Antipneumocócica e Influenza</h3>
<p>A imunização ativa é o pilar mais eficaz de prevenção primária de hospitalizações e óbitos por pneumonia no adulto. O calendário oficial de vacinação do adulto e idoso da Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) e da Sociedade Brasileira de Imunizações (SBIm) estabelece:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Imunobiológico</th>
      <th>Esquema Recomendado para Adultos &ge; 60-65 Anos ou com Comorbidades</th>
      <th>Mecanismo Imunológico e Benefício Clínico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vacina Pneumocócica Conjugada (VPC13, VPC15 ou VPC20)</strong></td>
      <td>Dose única inicial. Nos esquemas sequenciais (VPC13/15), aplicar a <strong>VPP23 após 6 a 12 meses</strong> (ou intervalo mínimo de 2 meses em imunodeprimidos graves).</td>
      <td>Os polissacarídeos capsulares bacterianos são conjugados a uma proteína carreadora imunogênica (CRM197), transformando a resposta imune em <strong>T-dependente</strong> com indução de células de memória B, produção de anticorpos de alta avidez (IgG) e redução da colonização de orofaringe (imunidade de rebanho).</td>
    </tr>
    <tr>
      <td><strong>Vacina Pneumocócica Polissacarídica 23-Valente (VPP23)</strong></td>
      <td>Aplicada sequencialmente após a vacina conjugada. Uma segunda dose de reforço é indicada após 5 anos em pacientes de alto risco (asplenia, imunodepressão, insuficiência renal).</td>
      <td>Resposta T-independente ampla cobrindo 23 sorotipos pneumocócicos prevalentes, reduzindo expressivamente a incidência de <strong>Doença Pneumocócica Invasiva (bacteremia e sepse)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Vacina contra Influenza (Gripe)</strong></td>
      <td>Dose anual no outono (vacinas trivalentes no SUS ou tetravalentes na rede privada; formulações de alta dose / adjuvadas recomendadas para &ge; 65 anos).</td>
      <td>Reduz em mais de 60% as taxas de internação hospitalar e descompensação cardiovascular em idosos e pneumopatas. Bloqueia a lise epitelial traqueobrônquica pelo vírus influenza, impedindo a superinfecção bacteriana secundária pneumocócica e estafilocócica.</td>
    </tr>
    <tr>
      <td><strong>Vacina contra o Vírus Sincicial Respiratório (VSR)</strong></td>
      <td>Dose única recomendada para todos os adultos com 60 anos ou mais (em especial portadores de cardiopatias, DPOC, asma e diabetes).</td>
      <td>O VSR é responsável por mais de 10% a 15% das exacerbações respiratórias graves e pneumonias em idosos hospitalizados, com letalidade similar à do vírus influenza.</td>
    </tr>
  </tbody>
</table>

<h3>Casos Clínicos Adicionais Comentados de Alta Complexidade em Pneumologia</h3>
<div class="book-case">
  <h4>Caso Clínico 3: Pneumonia por Legionella pneumophila em Paciente com Hiponatremia e Diarreia</h4>
  <p><strong>História:</strong> Homem de 56 anos, empresário, retorna de convenção em hotel com sistema de ar-condicionado central há 5 dias. Apresenta febre alta contínua de 39,6 °C com calafrios, tosse seca, cefaleia holocraniana intensa, confusão mental progressiva e episódios frequentes de diarreia aquosa sem sangue há 48 horas. Ao exame físico: desorientado, FC: 82 bpm (presença de <strong>dissociação pulso-temperatura / Sinal de Faget</strong>), PA: 110/70 mmHg, FR: 26 irpm. Ausculta com estertores crepitantes em base pulmonar direita. O raio-X de tórax evidencia infiltrado interstício-alveolar consolidativo em lobo inferior direito. Exames laboratoriais de urgência revelam: <strong>Sódio sérico de 124 mEq/L (hiponatremia grave)</strong>, AST: 145 U/L, ALT: 168 U/L, Ureia: 65 mg/dL e Creatinina: 1,8 mg/dL.</p>
  <p><strong>Discussão e Conduta:</strong> A combinação clínica de pneumonia atípica grave de início agudo após exposição a aerossóis de água climatizada, acompanhada de <strong>sintomas extrapulmonares característicos (diarreia aquosa profusa, confusão mental), dissociação pulso-temperatura (bradicardia relativa / Sinal de Faget), hiponatremia marcante (por SIADH secundária) e elevação de transaminases hepáticas</strong> é patognomônica de <strong>Doença dos Legionários causada por <em>Legionella pneumophila</em></strong>. A coloração pelo Gram do escarro habitualmente não evidencia bactérias devido à coloração deficiente do patógeno intracelular. O exame confirmatório de escolha imediata na sala de emergência é a <strong>Pesquisa de Antígeno Urinário para Legionella (sorogrupo 1)</strong>, que apresenta sensibilidade superior a 80% e resultado em 15 minutos. A terapia antimicrobiana de escolha é a administração de <strong>Levofloxacino 750 mg IV 1x/dia</strong> (ou Azitromicina 500 mg IV 1x/dia) por 10 a 14 dias, associada à correção prudente e lenta da hiponatremia para prevenir a mielinólise pontina.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 4: Pneumonia Necrotizante por CA-MRSA pós-Influenza em Jovem Atleta</h4>
  <p><strong>História:</strong> Homem de 21 anos, jogador de futebol amador sem comorbidades, teve diagnóstico de gripe por Influenza A confirmada há 6 dias com melhora espontânea. Há 24 horas evolui com febre alta súbita (40 °C), tosse com expectoração de sangue vivo abundante (hemoptise franca), dor torácica ventilatório-dependente bilateral e dispneia extrema. Dá entrada chocado: PA 75/40 mmHg, FC 142 bpm, FR 38 irpm, SpO2 82% com máscara de O2. A tomografia computadorizada de tórax evidencia múltiplos infiltrados nodulares bilaterais com necrose central cavitária confluente e pneumotórax hipertensivo à direita. O hemograma revela leucopenia profunda (leucócitos: 1.800/mm³ com 25% de bastões).</p>
  <p><strong>Discussão e Conduta:</strong> Trata-se de <strong>Pneumonia Necrotizante Fulminante por <em>Staphylococcus aureus</em> Meticilina-Resistente Adquirido na Comunidade (CA-MRSA)</strong> produtor da toxina Leucocidina de Panton-Valentine (PVL). A infecção viral prévia pelo vírus influenza denudou o epitélio ciliar traqueobrônquico, expondo receptores de fibronectina que permitiram a adesão e colonização estafilocócica maciça. A toxina PVL promoveu lise neutrofílica alveolar em massa, necrose tecidual e cavitações com hemorragia e pneumotórax. A equipe realiza descompressão e drenagem torácica de urgência à direita no 5º EIC, intubação orotraqueal com ventilação protetora, suporte vasopressor com noradrenalina e início imediato de <strong>Linezolida 600 mg IV de 12/12h</strong> (fármaco de escolha por inibir a síntese ribossomal da toxina PVL) associada a <strong>Ceftarolina IV</strong> (cefalosporina de 5ª geração com ação bactericida anti-MRSA) e Piperacilina-Tazobactam.</p>
</div>
`;

// 2. TB Extra 1: TB Pediátrica, Gestação e TB Miliar
const tbExtra1 = `
<h3>Tuberculose na Infância: Sistema de Pontuação Diagnóstica do Ministério da Saúde</h3>
<p>O diagnóstico de tuberculose pulmonar na criança menor de 10 anos representa um desafio peculiar na prática clínica diária. As crianças habitualmente apresentam a forma primária da doença, que é <strong>paucibacilar</strong> (baixa carga bacteriana) e caracterizada por tosse seca sem expectoração, pois o reflexo de tosse no lactente deglute o escarro para o estômago. Diante da dificuldade técnica de obter amostras microbiológicas espontâneas, o Ministério da Saúde padronizou um consagrado <strong>Sistema de Escore de Pontuação Clínico-Epidemiológico</strong> que dispensa a confirmação bacteriológica para autorizar o início do tratamento:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Avaliação</th>
      <th>Critérios Clínicos e Radiológicos Específicos</th>
      <th>Pontuação Atribuída</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><strong>1. Quadro Clínico</strong></td>
      <td>Febre ou tosse, adinamia, sudorese, perda ponderal ou emagrecimento &ge; 2 semanas</td>
      <td>+ 15 pontos</td>
    </tr>
    <tr>
      <td>Assintomático ou sintomas há menos de 2 semanas</td>
      <td>0 pontos</td>
    </tr>
    <tr>
      <td>Sintomas respiratórios com melhora nítida ou uso recente de antibióticos comuns com melhora</td>
      <td>- 10 pontos</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>2. Radiografia de Tórax</strong></td>
      <td>Condensação ou infiltrado pulmonar (com ou sem escavação) &ge; 2 semanas, adenomegalia hilar unilateral ou padrão miliar</td>
      <td>+ 15 pontos</td>
    </tr>
    <tr>
      <td>Condensação ou infiltrado pulmonar &lt; 2 semanas</td>
      <td>+ 5 pontos</td>
    </tr>
    <tr>
      <td>Radiografia de tórax normal</td>
      <td>- 5 pontos</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>3. Contato com Adulto Tuberculoso</strong></td>
      <td>Contato próximo (domiciliar ou escolar) com adulto bacilífero nos últimos 2 anos</td>
      <td>+ 10 pontos</td>
    </tr>
    <tr>
      <td>Sem história de contato com tuberculose ou contato desconhecido</td>
      <td>0 pontos</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>4. Prova Tuberculínica (PT / PPD)</strong></td>
      <td>PT &ge; 10 mm (em vacinados com BCG há menos de 2 anos) OU PT &ge; 5 mm (em não vacinados ou BCG &ge; 2 anos, ou imunodeprimidos)</td>
      <td>+ 15 pontos</td>
    </tr>
    <tr>
      <td>PT entre 5 e 9 mm (em vacinados com BCG &lt; 2 anos)</td>
      <td>+ 5 pontos</td>
    </tr>
    <tr>
      <td>PT de 0 a 4 mm</td>
      <td>0 pontos</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>5. Estado Nutricional</strong></td>
      <td>Desnutrição grave (Peso/Idade ou IMC/Idade &lt; escore-z -3) ou perda ponderal progressiva documentada</td>
      <td>+ 5 pontos</td>
    </tr>
    <tr>
      <td>Eutrófico ou desnutrição leve</td>
      <td>0 pontos</td>
    </tr>
  </tbody>
</table>

<p><strong>Interpretação e Conduta pelo Somatório de Pontos:</strong></p>
<ul>
  <li><strong>&ge; 40 Pontos (Diagnóstico Muito Provável de Tuberculose):</strong> Indicação formal de <strong>iniciar imediatamente o tratamento farmacológico anti-tuberculose</strong> (Esquema RIP pediátrico em formulações dispersíveis, omitindo-se o etambutol em &lt; 10 anos devido à dificuldade de monitorização de neurite óptica e toxicidade visual).</li>
  <li><strong>30 a 35 Pontos (Diagnóstico Possível):</strong> Recomenda-se investigação complementar com coleta de <strong>Lavado Gástrico em jejum matinal por 3 dias consecutivos</strong> para baciloscopia, cultura e TRM-TB, mantendo a criança sob observação clínica estrita na atenção primária.</li>
  <li><strong>&le; 25 Pontos (Diagnóstico Pouco Provável):</strong> Investigar outras etiologias pneumológicas e tratar infecções respiratórias comuns.</li>
</ul>

<h3>Tuberculose na Gestação e Lactação: Segurança Farmacológica Materno-Fetal</h3>
<p>O diagnóstico de tuberculose ativa durante a gestação exige tratamento imediato. A tuberculose não tratada associa-se a elevadíssimas taxas de abortamento espontâneo, restrição de crescimento intrauterino (RCIU), prematuridade extrema e transmissão congênita transplacentária:</p>
<ul>
  <li><strong>Segurança do Esquema RIPE na Gravidez:</strong> Nenhum dos quatro fármacos do esquema básico (Rifampicina, Isoniazida, Pirazinamida e Etambutol) é teratogênico em humanos. O <strong>esquema RIPE deve ser administrado nas mesmas doses e prazos habituais (2 RIPE / 4 RI)</strong> durante qualquer trimestre da gestação.</li>
  <li><strong>Suplementação Obrigatória de Vitamina B6:</strong> Devido à maior demanda metabólica e ao risco de toxicidade fetal e materna, é obrigatória a prescrição profilática de <strong>Piridoxina (Vitamina B6 na dose de 50 mg/dia via oral)</strong> durante todo o período de uso da Isoniazida para prevenir neuropatia periférica e convulsões neonatais.</li>
  <li><strong>Amamentação e Transmissão Vertical:</strong> O bacilo de Koch NÃO é excretado pelo leite materno. A mãe que amamenta deve manter o aleitamento materno continuado. Se a mãe for bacilífera ativa no pós-parto imediato, deve <strong>amamentar utilizando máscara cirúrgica bem ajustada</strong> e lavar as mãos frequentemente, mantendo essas precauções de contato até completar pelo menos 15 dias de tratamento correto e demonstrar melhora clínica, momento em que a transmissibilidade comunitária é drasticamente reduzida.</li>
</ul>

<h3>Tuberculose Miliar: Disseminação Hematogênica e Apresentação Sistêmica</h3>
<p>A Tuberculose Miliar representa a forma mais grave e potencialmente letal de disseminação hematogênica generalizada do <em>M. tuberculosis</em>, decorrente da erosão de um foco caseoso diretamente para a luz de um vaso sanguíneo pulmonar ou linfático torácico. O sangue transporta miríades de bacilos que se aninham simultaneamente em múltiplos órgãos ricamente vascularizados:</p>
<ul>
  <li><strong>Padrão Radiológico Patognomônico:</strong> A radiografia e a tomografia de alta resolução do tórax evidenciam incontáveis <strong>micronódulos miliares (diâmetro uniforme de 1 a 2 mm, com aspecto de grãos de semente de milho-painço)</strong> distribuídos difusa e homogeneamente por ambos os pulmões, estendendo-se dos ápices até as bases pulmonares.</li>
  <li><strong>Quadro Clínico Sistêmico:</strong> Febre séptica diária prolongada, emagrecimento consumptivo rápido, hepatoesplenomegalia com granulomas hepáticos, linfadenomegalia generalizada, pancitopenia por invasão da medula óssea e presença de <strong>tubérculos de coroide à fundoscopia de olho</strong> (patognomônico de disseminação miliar hematogênica).</li>
  <li><strong>Comprometimento Meníngeo Oculto:</strong> Mais de 30% a 50% dos pacientes com TB miliar apresentam meningite tuberculosa associada, mesmo sem sinais meníngeos clássicos de rigidez de nuca. É <strong>obrigatória a realização de Punção Lombar diagnóstica com coleta de LCR</strong> em todo paciente com padrão miliar ao raio-X. Na presença de acometimento meníngeo documentado, o tratamento deve ser prolongado para 12 meses e associado à corticoterapia sistêmica precoce.</li>
</ul>
`;

const tbExtra2 = `
<h3>Vacina BCG: Imunologia, Cicatriz Vacinal e Manejo de Reações Adversas</h3>
<p>A vacina BCG (Bacilo Calmette-Guérin) é uma vacina de bactérias vivas atenuadas derivada do <em>Mycobacterium bovis</em>. Administrada rotineiramente em dose única ao recém-nascido preferencialmente nas primeiras 12 a 24 horas de vida na maternidade (por via intradérmica estrita na inserção inferior do músculo deltoide no braço direito):</p>
<ul>
  <li><strong>Eficácia Protetora Real:</strong> A vacina BCG <strong>NÃO previne a infecção pulmonar primária comum</strong> nem impede a transmissão comunitária no adulto. Seu papel epidemiológico crucial e insubstituível é a <strong>proteção de alta eficácia (&gt; 80% a 85%) contra as formas graves e fatais de tuberculose na infância: Meningite Tuberculosa e Tuberculose Miliar</strong>.</li>
  <li><strong>Evolução Típica da Lesão Vacinal:</strong> Inicia-se após 3 a 4 semanas com mácula avermelhada, evolui para pápula (4 a 6 semanas), torna-se pústula que se ulcera espontaneamente com drenagem purulenta (6 a 8 semanas) e cicatriza definitivamente entre a 10ª e 12ª semanas, formando a clássica cicatriz deprimida de 4 a 7 mm no deltoide direito. É uma evolução perfeitamente fisiológica; <strong>não se deve aplicar curativos, pomadas ou antissépticos</strong> na lesão vacinal.</li>
  <li><strong>Conduta na Ausência de Cicatriz Vacinal:</strong> Segundo a norma técnica vigente do PNI / Ministério da Saúde, a criança que recebeu a vacina BCG comprovada em caderneta de saúde mas que <strong>não desenvolveu a cicatriz vacinal NÃO deve mais ser revacinada</strong> (a antiga conduta de revacinação foi formalmente abolida no Brasil após comprovação de imunogenicidade celular adequada mesmo na ausência de cicatriz externa).</li>
  <li><strong>Vacinação BCG em Contatos Domiciliares de Hanseníase:</strong> Todo contato intradomiciliar de paciente diagnosticado com hanseníase (independentemente da forma clínica) deve ser avaliado para reforço vacinal com BCG como imunoterapia protetora:
    <ul>
      <li>Sem cicatriz de BCG comprovada: aplicar 1 dose de BCG;</li>
      <li>Com 1 cicatriz de BCG comprovada: aplicar 1 dose de reforço de BCG;</li>
      <li>Com 2 cicatrizes de BCG comprovadas: NÃO aplicar nenhuma dose adicional.</li>
    </ul>
  </li>
  <li><strong>Manejo de Reações Adversas Locais e Regionais Pós-BCG:</strong>
    <ul>
      <li><strong>Abscesso Local Quente ou Frio:</strong> Decorre de aplicação subcutânea inadvertida (em vez de intradérmica estrita). O abscesso frio com flutuação pode ser aspirado com agulha fina estéril (não incisar cirurgicamente para não criar fístula crônica). Se persistir drenando por mais de 12 semanas ou ulcerado extenso (&gt; 1 cm), está indicada a introdução de <strong>Isoniazida oral (10 mg/kg/dia até a cicatrização)</strong>;</li>
      <li><strong>Linfadenite Supurada Regional (gânglio axilar ou supraclavicular &gt; 3 cm com flutuação):</strong> Requer aspiração com agulha estéril e tratamento medicamentoso com Isoniazida oral;</li>
      <li><strong>Disseminação Sistêmica pelo BCG (BCGite Disseminada):</strong> Complicação raríssima e gravíssima que ocorre exclusivamente em crianças com Imunodeficiência Primária Combinada Grave (SCID) ou filhos de mães HIV positivas com imunossupressão grave que receberam a vacina inadvertidamente. Requer tratamento intensivo com esquema antituberculoso especial sem pirazinamida (pois o <em>M. bovis</em> BCG é <strong>intrinsecamente resistente à pirazinamida</strong>).</li>
    </ul>
  </li>
</ul>

<h3>Casos Clínicos Comentados de Alta Complexidade em Tuberculose</h3>
<div class="book-case">
  <h4>Caso Clínico 3: Meningite Tuberculosa Subaguda com Paralisia do VI Par Craniano</h4>
  <p><strong>História:</strong> Homem de 31 anos procura atendimento hospitalar com queixa de cefaleia holocraniana contínua e febre vespertina baixa há 18 dias, refratária a analgésicos comuns, associada a vômitos e visão dupla (diplopia) nas últimas 48 horas. Ao exame físico: lúcido mas bradipsíquico, rigidez de nuca moderada presente (sinais de Kernig e Brudzinski positivos) e estrabismo convergente do olho direito com incapacidade de abdução ocular (paralisia completa do VI par craniano - nervo abducente direito). A tomografia de crânio com contraste evidencia realce leptomeníngeo exuberante nas cisternas da base do crânio e hidrocefalia comunicante incipiente.</p>
  <p><strong>Discussão e Conduta:</strong> A evolução subaguda de síndrome meníngea associada a paresia de nervo craniano e realce inflamatório na base encefálica é a apresentação patognomônica de <strong>Meningite Tuberculosa</strong> (o exsudato gelatinoso basilar espesso engloba e comprime os pares cranianos em seu trajeto subaracnóideo, afetando preferencialmente o VI e III pares). A análise do LCR confirma padrão exsudativo linfomonocitário com hiperproteinorraquia maciça (320 mg/dL), glicose liquórica consumida (18 mg/dL com glicemia de 95 mg/dL) e TRM-TB positivo no LCR. A conduta imediata consiste na internação em enfermaria/UTI e início sem demora do <strong>Esquema RHZE por 2 meses seguido de RH por 10 meses (total de 12 meses de tratamento)</strong>, associado obrigatoriamente a <strong>Dexametasona venosa (0,4 mg/kg/dia)</strong> por 4 a 6 semanas para reduzir a inflamação meníngea, prevenir vasoespasmo e infartos cerebrais isquêmicos e diminuir a mortalidade.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 4: Tuberculose Miliar com Pancitopenia e Tubérculos de Coroide</h4>
  <p><strong>História:</strong> Mulher de 52 anos, portadora de artrite reumatoide em uso de Adalimumabe (anti-TNF) há 10 meses sem triagem prévia com PPD, procura a emergência com febre diária de 38,5 °C há 4 semanas, emagrecimento de 9 kg, astenia extrema e dispneia progressiva. Ao exame físico: descorada 3+/4+, hepatoesplenomegalia palpável e estertores finos crepitantes bilaterais. O raio-X de tórax revela micronódulos puntiformes de 1,5 mm difusos por ambos os campos pulmonares. O hemograma demonstra pancitopenia grave: Hemoglobina 7,8 g/dL, Leucócitos 2.100/mm³ e Plaquetas 54.000/mm³. A fundoscopia de olho à beira do leito revela múltiplas lesões nodulares acinzentadas elevadas na retina (tubérculos de coroide).</p>
  <p><strong>Discussão e Conduta:</strong> O quadro clínico e radiológico é clássico de <strong>Tuberculose Miliar Sistêmica Fulminante desencadeada por Imunossupressão por Inibidor de TNF-alfa</strong>. O adalimumabe destruiu a arquitetura dos granulomas tuberculosos latentes previamente contidos, permitindo a invasão hematogênica maciça da medula óssea (causando a pancitopenia), fígado, baço e olhos (tubérculos de coroide). A conduta mandatória é: <strong>1. Suspensão imediata e definitiva do imunobiológico anti-TNF</strong>; 2. Realização de punção lombar obrigatória para descartar meningite assintomática concomitante; 3. Coleta de aspirado de medula óssea e escarro induzido para TRM-TB e cultura; 4. Início imediato do <strong>Esquema básico RIPE em doses plenas sob regime de Tratamento Diretamente Observado (TDO)</strong> em leito hospitalar isolado por pressão negativa.</p>
</div>
`;

console.log('Aplicando final push nas aulas de Clínica Médica (PAC e TB)...');
appendSectionToBook('pneumonias-adquiridas-na-comunidade', 'sec-pac-ventilacao-sara-choque', 'Aprofundamento Avançado: Ventilação Mecânica Protetora na SARA e Manejo do Choque Séptico Pulmonar', pacExtra1);
appendSectionToBook('pneumonias-adquiridas-na-comunidade', 'sec-pac-vacinacao-casos-complexos', 'Aprofundamento Avançado: Imunização no Adulto (Pneumococo/Influenza/VSR) e Casos Clínicos Complexos', pacExtra2);

appendSectionToBook('tuberculose-pulmonar', 'sec-tb-pediatrica-gestacao-miliar', 'Aprofundamento Avançado: TB na Infância (Escore MS), Tuberculose na Gestação e Forma Miliar Disseminada', tbExtra1);
appendSectionToBook('tuberculose-pulmonar', 'sec-tb-bcg-reacoes-casos-meningite', 'Aprofundamento Avançado: Vacina BCG (Manejo de Reações) e Casos Clínicos de Meningite e Disseminação', tbExtra2);
console.log('Final push de Clínica Médica concluído com sucesso!');
