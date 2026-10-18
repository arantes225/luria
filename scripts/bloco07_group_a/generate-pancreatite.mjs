import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import { secPancreatiteExpansao } from './pancreatite-expansao.mjs';
import { secPancreatiteExpansao2 } from './pancreatite-expansao2.mjs';
import { secPancreatiteExpansao3 } from './pancreatite-expansao3.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'pancreatite-aguda';

const baseSections = [
  {
    id: 'introducao-conceito-epidemiologia',
    title: '1. Introdução, Definição e Panorama Epidemiológico',
    body_html: `
<p>A pancreatite aguda (PA) representa um processo inflamatório agudo do parênquima pancreático, de caráter autolimitado na maioria expressiva dos casos, mas com potencial de desencadear tempestade inflamatória sistêmica grave, falência de múltiplos órgãos e mortalidade substancial. Na prática clínica contemporânea e nas provas de residência médica de alto rendimento, o domínio da pancreatite aguda exige a perfeita compreensão dos critérios diagnósticos de Atlanta revisados, da estratificação precoce de risco, do manejo volêmico hemodinamicamente guiado e das estratégias cirúrgicas e minimamente invasivas de intervenção escalonada (<em>step-up approach</em>).</p>

<p>Do ponto de vista epidemiológico global, a incidência da pancreatite aguda tem demonstrado tendência consistente de elevação nas últimas duas décadas, variando entre 30 e 50 casos por 100.000 habitantes/ano nos países ocidentais. Esse incremento decorre primordialmente da maior prevalência de colelitíase associada a alterações nos hábitos alimentares, elevação das taxas de obesidade e síndrome metabólica, uso disseminado de fármacos pancreatotóxicos e expansão dos procedimentos diagnósticos e terapêuticos invasivos na via biliar, em particular a Colangiopancreatografia Retrógrada Endoscópica (CPRE).</p>

<p>Embora cerca de 80% a 85% dos pacientes desenvolvam a forma intersticial edematosa (leve a moderadamente grave, com resolução clínica em poucos dias e mortalidade inferior a 1% a 2%), os 15% a 20% restantes evoluem com a forma necrosante (pancreatite necrotizante). Nessa subpopulação com necrose parenquimatosa e/ou peripancreática, a mortalidade atinge cerca de 10% a 15% nos casos estéreis, escalando dramaticamente para 30% a 50% quando há sobreinfecção bacteriana bacteriana da necrose ou falência orgânica persistente que ultrapassa 48 horas de evolução hospitalar.</p>

<div class="clinical-box info-box">
  <h4>Ponto de Atenção Epidemiológico e Impacto Sanitário</h4>
  <p>No Brasil, a pancreatite aguda constitui uma das causas cirúrgicas e clínicas mais frequentes de internação hospitalar no âmbito das urgências e emergências do Sistema Único de Saúde (SUS), demandando leitos de terapia intensiva, antibioticoterapia guiada em casos de infecção confirmada e suporte multidisciplinar prolongado nos cenários de necrose infectada com repercussão sistêmica.</p>
</div>
`
  },
  {
    id: 'etiologia-fisiopatologia-molecular',
    title: '2. Etiologia Detalhada e Fisiopatologia Molecular da Lesão Acinar',
    body_html: `
<p>A gênese da pancreatite aguda repousa no rompimento prematuro dos mecanismos de contenção enzimática no interior das células acinares pancreáticas. Em condições fisiológicas normais, as enzimas digestivas proteolíticas e lipolíticas são sintetizadas no retículo endoplasmático rugoso, acondicionadas no complexo de Golgi e armazenadas em grânulos de zimogênio sob forma inativa (pró-enzimas ou zimogênios). Essa inativação intracelular é sustentada por três pilares cruciais: a compartimentação em vesículas impermeáveis, a coexistência de inibidores intracelulares específicos de tripsina (como a proteína SPINK1, <em>serine protease inhibitor Kazal type 1</em>) e o pH ácido dos grânulos, que impede a autoliberação autocatalítica.</p>

<p>Na vigência de um insulto agudo primário, desencadeia-se a fusão patológica anômala entre os grânulos de zimogênio e os lisossomos intracelulares (fenômeno de co-localização). A principal hidrolase ácida lisossomal, a catepsina B, entra em contato direto com o tripsinogênio inativo, clivando-o proteoliticamente em tripsina ativa dentro do citosol acinar. A tripsina ativada, por sua vez, sobrepuja a capacidade neutralizadora do SPINK1 e deflagra uma cascata exponencial de autoativação, convertendo outros zimogênios em enzimas ativas destrutivas: elastase (que degrada fibras elásticas das paredes vasculares, promovendo trombose microvascular e hemorragia tecidual), fosfolipase A2 (que hidrolisa as membranas celulares fosfolipídicas e gera lisolecitina, agente citotóxico potente), carboxipeptidases e colipases.</p>

<h3>Etiologias Principais e Mecanismos Específicos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia</th>
      <th>Frequência Relativa</th>
      <th>Mecanismo Fisiopatológico Detalhado</th>
      <th>Aspectos Clínicos e Propedêuticos Cruciais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Litiásica (Biliar)</strong></td>
      <td>40% a 70% dos casos</td>
      <td>Migração e impacto transitório ou persistente de microlitíases (&lt; 3-5 mm) na ampola de Vater (esfíncter de Oddi), acarretando aumento transitório brutal da pressão no ducto pancreático de Wirsung e/ou refluxo biliopancreático.</td>
      <td>Predomínio feminino (2:1). Elevação rápida e transitória de ALT/TGP &gt; 150 U/L nas primeiras 48h possui valor preditivo positivo de cerca de 95% para etiologia biliar. USG de abdome é o exame de escolha inicial.</td>
    </tr>
    <tr>
      <td><strong>Alcoólica (Etílica)</strong></td>
      <td>25% a 35% dos casos</td>
      <td>Consumo pesado e prolongado de etanol (&gt; 50-80 g/dia por 5-10 anos). O etanol e seus metabólitos (acetaldeído e ésteres etílicos de ácidos graxos - FAEEs) causam hiperestimulação colinérgica, desestabilização da membrana lisossomal, aumento da fragilidade dos zimogênios, toxicidade mitocondrial com sobrecarga de cálcio intracelular e espessamento do suco pancreático com formação de plugues proteicos intraductais.</td>
      <td>Mais prevalente no sexo masculino jovem a meia-idade. Comumente se sobrepõe a surtos subclínicos de pancreatite crônica prévia. Associação com tabagismo concomitante acelera o dano parenquimatoso.</td>
    </tr>
    <tr>
      <td><strong>Hipertrigliceridemia</strong></td>
      <td>2% a 5% dos casos</td>
      <td>Níveis séricos de triglicerídeos habitualmente superiores a 1.000 mg/dL (11,3 mmol/L). A lípase pancreática capilar hidrolisa concentrações massivas de triglicerídeos nos capilares do pâncreas, gerando quantidades tóxicas de ácidos graxos livres não esterificados, que induzem estresse oxidativo, dano endotelial, isquemia microvascular e acidez acinar.</td>
      <td>Associada a dislipidemias familiares (tipos I, IV e V), diabetes descompensado, obesidade e etilismo concomitante. O soro lipêmico pode causar falsa normoamilasemia por interferência espectrofotométrica.</td>
    </tr>
    <tr>
      <td><strong>Pós-CPRE (Iatrogênica)</strong></td>
      <td>3% a 10% pós-procedimento</td>
      <td>Canulação repetida e difícil da papila, injeções repetidas de contraste radiopróprio com hiperpressão ductal de Wirsung, manipulação e trauma térmico por eletrocautério na papilotomia.</td>
      <td>Dor epigástrica com elevação de amilase/lipase &gt; 3x LSN após 24 horas do procedimento, demandando internação. Profilaxia eficaz comprovada: supositório retal de indometacina ou diclofenaco 100 mg periprocedimento e passagem de stent pancreático temporário em canulações de alto risco.</td>
    </tr>
    <tr>
      <td><strong>Drogas e Medicamentos</strong></td>
      <td>1% a 2% dos casos</td>
      <td>Imunorreatividade idiossincrática, toxicidade direta celular ou acúmulo de metabólitos tóxicos. Fármacos com associação classe I comprovada: azatioprina, 6-mercaptopurina, didanosina, ácido valproico, furosemida, tiazídicos, tetraciclina, sulfametoxazol-trimetoprima, pentamidina e estrógenos.</td>
      <td>Diagnóstico de exclusão após afastar biliar, alcoólica e triglicerídeos. Melhora com a suspensão imediata do medicamento implicado.</td>
    </tr>
    <tr>
      <td><strong>Outras Causas</strong></td>
      <td>&lt; 5% dos casos</td>
      <td>Hipercalcemia (induz ativação de tripsina por acúmulo de íons cálcio); trauma abdominal fechado ou penetrante; infecções virais (caxumba, coxsackievírus, citomegalovírus); autoimune (pancreatite tipo 1 associada a IgG4 e tipo 2); anomalias congênitas (pâncreas divisum com estenose da papila menor, pâncreas anular); picada de escorpião (gênero <em>Tityus</em>, toxina estimuladora colinérgica maciça).</td>
      <td>Investigação metabólica (cálcio iônico e total), sorologias, IgG4 sérica e colangiorressonância magnética para estudo anatômico ductal quando não há causa evidente.</td>
    </tr>
  </tbody>
</table>

<p>Após a autodigestão acinar inicial, desenvolve-se um influxo massivo de neutrófilos, monócitos e macrófagos ativados no tecido pancreático. Essas células inflamatórias liberam mediadores pró-inflamatórios potentes na circulação sistêmica: fator de necrose tumoral alfa (TNF-alfa), interleucina-1 beta (IL-1beta), interleucina-6 (IL-6), óxido nítrico e fator ativador de plaquetas (PAF). Esse processo rompe a integridade da barreira endotelial sistêmica, deflagrando a Síndrome da Resposta Inflamatória Sistêmica (SIRS), permeabilidade vascular generalizada com extravasamento maciço de fluidos ricos em proteínas para o terceiro espaço retroperitoneal e sistêmico, hipovolemia absoluta e relativa, choque distributivo e hipovolêmico, e falência respiratória decorrente de Lesão Pulmonar Aguda/Síndrome do Desconforto Respiratório Agudo (SDRA).</p>
`
  },
  {
    id: 'diagnostico-criterios-atlanta',
    title: '3. Quadro Clínico, Propedêutica Laboratorial e Critérios Diagnósticos de Atlanta',
    body_html: `
<p>O diagnóstico de certeza da pancreatite aguda apoia-se firmemente no consenso internacional de Atlanta revisado (2012/2013). Para firmar o diagnóstico inequívoco de pancreatite aguda, o paciente deve preencher <strong>pelo menos 2 dos 3 critérios</strong> a seguir:</p>

<ol>
  <li><strong>Quadro clínico compatível:</strong> Dor abdominal em andar superior (epigástrio e hipocôndrio direito), de início súbito ou rapidamente progressivo, de intensidade moderada a lancinante, em faixa ou facada, com irradiação típica para o dorso (em 50% a 70% dos pacientes), frequentemente acompanhada de náuseas, vômitos incontroláveis que não aliviam a dor, taquicardia e distensão abdominal decorrente de íleo paralítico reflexo. A dor tende a sofrer discreto alívio na posição genupeitoral (posição de prece maometana) ou com a flexão anterior do tronco;</li>
  <li><strong>Laboratório específico:</strong> Atividade sérica de amilase e/ou lípase elevada em pelo menos <strong>3 vezes o Limite Superior da Normalidade (LSN)</strong> do método de referência laboratorial adotado pelo serviço;</li>
  <li><strong>Achados compatíveis em exame de imagem:</strong> Alterações morfológicas típicas de pancreatite aguda documentadas em Tomografia Computadorizada (TC) de abdome com contraste endovenoso, Ressonância Magnética (RM) ou Ultrassonografia (USG) abdominal.</li>
</ol>

<div class="clinical-box warning-box">
  <h4>Regra de Ouro Editorial e Clínica LURIA</h4>
  <p>Se o paciente apresenta a <strong>dor típica em faixa</strong> e a <strong>elevação de lípase ou amilase &gt;= 3x o LSN</strong>, o diagnóstico de pancreatite aguda está consolidado de imediato! <strong>A tomografia computadorizada NÃO deve ser realizada de rotina no momento da admissão</strong> para fins de diagnóstico. A realização precoce da TC (&lt; 48-72h do início dos sintomas) subestima a extensão real da necrose pancreática e expõe o paciente hipercatabólico e desidratado a risco desnecessário de nefropatia induzida por contraste iodado.</p>
</div>

<h3>Diferenças Fundamentais entre Amilase e Lípase Séricas</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Lípase Sérica</th>
      <th>Amilase Sérica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sensibilidade e Especificidade</strong></td>
      <td>Sensibilidade 85%-98%; Especificidade 95%-99% (<strong>Marcador de escolha preferencial</strong>).</td>
      <td>Sensibilidade 75%-90%; Especificidade 70%-85% (menor especificidade devido a fontes extra-pancreáticas).</td>
    </tr>
    <tr>
      <td><strong>Cinética Enzimática</strong></td>
      <td>Eleva-se em 4 a 8 horas, atinge pico em 24 horas e <strong>permanece elevada por 8 a 14 dias</strong> devido à reabsorção tubular renal.</td>
      <td>Eleva-se rapidamente em 2 a 12 horas, atinge pico em 24 a 48 horas e <strong>normaliza precocemente em 3 a 5 dias</strong> devido ao rápido clareamento renal.</td>
    </tr>
    <tr>
      <td><strong>Desempenho em Casos Tardios</strong></td>
      <td>Excelente para pacientes admitidos tardiamente (&gt; 3 a 4 dias após o início do quadro álgico).</td>
      <td>Pode estar falsamente normalizada em casos tardios devido ao clareamento urinário acelerado.</td>
    </tr>
    <tr>
      <td><strong>Fontes de Falsos Positivos</strong></td>
      <td>Insuficiência renal grave, doença inflamatória intestinal ativa, obstrução intestinal mecânica e cetoacidose diabética (raramente atinge &gt; 3x LSN).</td>
      <td>Doenças das glândulas salivares (parotidite), macroamilasemia, apendicite aguda, colecistite, perfuração péptica, isquemia mesentérica e gestação ectópica rota.</td>
    </tr>
    <tr>
      <td><strong>Desempenho na Hipertrigliceridemia</strong></td>
      <td>Mais fidedigna; menos propensa a artefatos ópticos.</td>
      <td>Pode apresentar níveis séricos falsamente normais devido à presença de substâncias inibitórias circulantes no plasma lipêmico.</td>
    </tr>
    <tr>
      <td><strong>Relação com Prognóstico</strong></td>
      <td><strong>Não tem correlação prognóstica</strong>: magnitude da elevação não define gravidade!</td>
      <td><strong>Não tem correlação prognóstica</strong>: níveis extremamente altos não significam pior evolução.</td>
    </tr>
  </tbody>
</table>

<h3>Sinais Físicos Clássicos de Gravidade e Hemorragia Retroperitoneal</h3>
<p>Nos casos graves associados a necrose hemorrágica e extenso extravasamento sanguíneo retroperitoneal, enzimas pancreáticas ativadas degradam o tecido subcutâneo e a microvasculatura, permitindo a dispersão do sangue pelos planos fasciais anatômicos até a pele, manifestando-se por equimoses cutâneas características:</p>
<ul>
  <li><strong>Sinal de Cullen:</strong> Equimose periumbilical, resultante da difusão de exsudato hemorrágico através do ligamento falciforme até o tecido celular subcutâneo periumbilical;</li>
  <li><strong>Sinal de Grey Turner:</strong> Equimose nos flancos abdominais e regiões lombares, decorrente da infiltração de sangue a partir do espaço pararenal posterior pelas fáscias retroperitoneais;</li>
  <li><strong>Sinal de Fox:</strong> Equimose na porção ântero-medial da coxa ou abaixo do ligamento inguinal, por dissecção fascial retroperitoneal inferior.</li>
</ul>
<p>Embora clássicos e altamente cobrados em avaliações acadêmicas, esses sinais ocorrem em menos de 1% a 3% de todos os casos de pancreatite aguda, porém indicam pancreatite necrosante grave com elevada taxa de letalidade.</p>
`
  },
  {
    id: 'classificacao-gravidade-fases-escores',
    title: '4. Fases Temporais, Classificação de Gravidade de Atlanta e Escores Prognósticos',
    body_html: `
<p>O consenso revisado de Atlanta estratificou a história natural da pancreatite aguda em <strong>duas fases evolutivas temporais</strong> bem demarcadas, que guiam integralmente o raciocínio clínico e as intervenções terapêuticas:</p>

<ol>
  <li><strong>Fase Precoce (Primeiras 2 semanas):</strong> Dominada pelas repercussões sistêmicas da inflamação (SIRS), liberação de citocinas pró-inflamatórias e instabilidade hemodinâmica. A gravidade clínica nesta fase é determinada fundamentalmente pela presença, intensidade e persistência da <strong>falência de órgãos</strong>. O risco de infecção parenquimatosa é mínimo ou inexistente nestes primeiros 14 dias;</li>
  <li><strong>Fase Tardia (Após 2 semanas a meses):</strong> Caracterizada pela persistência de sinais inflamatórios sistêmicos e pelo surgimento de <strong>complicações locais</strong> (como necrose pancreática estéril ou infectada, coleções líquidas e tromboses vasculares). A sobrevida e o prognóstico dependem da presença de necrose sobreinfectada e da manutenção ou reativação da falência orgânica secundária ao choque séptico.</li>
</ol>

<h3>Categorias de Gravidade Segundo Atlanta Revisado</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Gravidade</th>
      <th>Definição Operacional Rígida</th>
      <th>Evolução Típica e Letalidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pancreatite Aguda Leve</strong></td>
      <td>Ausência de falência orgânica e ausência de complicações locais (necrose, coleções) ou complicações sistêmicas.</td>
      <td>Resolução espontânea rápida na primeira semana com hidratação venosa e analgesia; mortalidade nula ou &lt; 1%.</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Aguda Moderadamente Grave</strong></td>
      <td>Presença de <strong>falência orgânica transitória (&lt; 48 horas)</strong> E/OU complicações locais (coleções peripancreáticas, necrose estéril) E/OU exacerbação de comorbidades prévias descompensadas.</td>
      <td>Requer hospitalização mais prolongada, mas com resolução da falência em menos de 2 dias sob suporte adequado; mortalidade inferior a 3%-5%.</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Aguda Grave</strong></td>
      <td>Presença de <strong>falência orgânica persistente (&gt; 48 horas)</strong>, seja única ou de múltiplos sistemas.</td>
      <td>Comumente associada a necrose tecidual e internação em UTI; mortalidade elevada, alcançando 30% a 50%, especialmente se houver sobreinfecção bacteriana da necrose.</td>
    </tr>
  </tbody>
</table>

<p>A definição de falência orgânica pelo Consenso de Atlanta baseia-se no <strong>Escore de Marshall Modificado</strong>, pontuando <strong>&gt;= 2 pontos</strong> em qualquer um dos três sistemas orgânicos prioritários:</p>
<ul>
  <li><strong>Sistema Respiratório:</strong> Relação PaO2 / FiO2 &lt; 300 mmHg (ao nível do mar);</li>
  <li><strong>Sistema Renal:</strong> Creatinina sérica &gt; 1,9 mg/dL ou &gt; 2x o valor basal do paciente;</li>
  <li><strong>Sistema Cardiovascular:</strong> Pressão Arterial Sistólica &lt; 90 mmHg refratária à ressuscitação volêmica isolada (necessidade de suporte vasopressor).</li>
</ul>

<h3>Escores de Predição Precoce de Gravidade</h3>
<p>Como a falência orgânica definitiva só pode ser classificada após a observação das primeiras 48 horas, a medicina intensiva utiliza ferramentas preditivas aplicadas nas primeiras 24 a 48 horas de internação hospitalar:</p>

<h4>1. Escore BISAP (Bedside Index for Severity in Acute Pancreatitis)</h4>
<p>Desenvolvido para avaliação prática e rápida à beira do leito <strong>nas primeiras 24 horas de admissão</strong>. Atribui 1 ponto para cada critério presente (variação de 0 a 5 pontos). Um escore <strong>BISAP &gt;= 3 pontos</strong> associa-se a um risco substancialmente aumentado de pancreatite grave, falência orgânica e mortalidade (&gt; 15% a 20%):</p>
<ul>
  <li><strong>B</strong> (<em>BUN / Ureia</em>): Nitrogênio ureico sérico &gt; 25 mg/dL (Ureia &gt; 53 mg/dL);</li>
  <li><strong>I</strong> (<em>Impaired mental status</em>): Rebaixamento ou alteração do estado mental (Escala de Coma de Glasgow &lt; 15);</li>
  <li><strong>S</strong> (<em>SIRS</em>): Presença de pelo menos 2 critérios de Síndrome da Resposta Inflamatória Sistêmica (temperatura &lt; 36°C ou &gt; 38°C; FC &gt; 90 bpm; FR &gt; 20 irpm ou PaCO2 &lt; 32; leucócitos &lt; 4.000, &gt; 12.000 ou &gt; 10% de bastões);</li>
  <li><strong>A</strong> (<em>Age</em>): Idade superior a 60 anos;</li>
  <li><strong>P</strong> (<em>Pleural effusion</em>): Presença de derrame pleural evidente em radiografia de tórax ou imagem axial.</li>
</ul>

<h4>2. Critérios de Ranson</h4>
<p>Escore histórico consagrado, avaliado em dois momentos distintos (à admissão e após 48 horas). Um escore de Ranson <strong>&gt;= 3 pontos</strong> indica pancreatite grave. A presença de &lt; 3 critérios prediz mortalidade &lt; 1%-3%; de 3 a 5 critérios, mortalidade em torno de 15%; e &gt;= 6 critérios, mortalidade que supera 40% a 50%:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Momento</th>
      <th>Pancreatite Biliar (Litiásica)</th>
      <th>Pancreatite Não Biliar (Alcoólica / Outras)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Na Admissão (0 horas)</strong></td>
      <td>
        • Idade &gt; 70 anos<br>
        • Leucócitos &gt; 18.000 /mm³<br>
        • Glicemia &gt; 220 mg/dL<br>
        • DHL &gt; 400 U/L<br>
        • AST/TGO &gt; 250 U/L
      </td>
      <td>
        • Idade &gt; 55 anos<br>
        • Leucócitos &gt; 16.000 /mm³<br>
        • Glicemia &gt; 200 mg/dL<br>
        • DHL &gt; 350 U/L<br>
        • AST/TGO &gt; 250 U/L
      </td>
    </tr>
    <tr>
      <td><strong>Nas Primeiras 48 Horas</strong></td>
      <td>
        • Queda do hematócrito &gt; 10 pontos percentuais<br>
        • Elevação do BUN/Ureia &gt; 2 mg/dL<br>
        • Cálcio sérico &lt; 8,0 mg/dL<br>
        • Déficit de base &gt; 5 mEq/L<br>
        • Sequestro líquido estimado &gt; 4 Litros
      </td>
      <td>
        • Queda do hematócrito &gt; 10 pontos percentuais<br>
        • Elevação do BUN/Ureia &gt; 5 mg/dL<br>
        • Cálcio sérico &lt; 8,0 mg/dL<br>
        • PaO2 &lt; 60 mmHg<br>
        • Déficit de base &gt; 4 mEq/L<br>
        • Sequestro líquido estimado &gt; 6 Litros
      </td>
    </tr>
  </tbody>
</table>

<h4>3. Outros Marcadores Prognósticos Validados</h4>
<ul>
  <li><strong>Proteína C-Reativa (PCR):</strong> Níveis séricos de PCR <strong>&gt;= 150 mg/L aferidos às 48 horas</strong> da admissão constituem um marcador inflamatório isolado com sensibilidade e especificidade superiores a 80% para predizer a presença de necrose pancreática e gravidade sistêmica;</li>
  <li><strong>Hematócrito na Admissão:</strong> Hemoconcentração com hematócrito <strong>&gt; 44% na admissão</strong> ou ausência de queda progressiva com a hidratação reflete perda volumosa para o terceiro espaço e prediz necrose tecidual e falência orgânica;</li>
  <li><strong>Escore APACHE II:</strong> Calculado diariamente em UTI; pontuação <strong>&gt;= 8 pontos</strong> indica prognóstico desfavorável e necessidade de monitorização intensiva contínua.</li>
</ul>
`
  },
  {
    id: 'colecoes-liquidas-e-necrose-pancreatica',
    title: '5. Nomenclatura e Morfologia das Coleções Pancreáticas e Peripancreáticas',
    body_html: `
<p>A classificação revisada de Atlanta eliminou terminologias imprecisas (como "flegmão", "abscesso pancreático" ou "pseudocisto hemorrágico agudo") e estabeleceu um sistema binário de classificação baseado em <strong>dois critérios essenciais</strong>: o tipo de conteúdo tecidual subjacente (líquido puro versus necrose com fragmentos sólidos) e o tempo cronológico de evolução (menos ou mais de 4 semanas de evolução), com o desenvolvimento de cápsula inflamatória fibrosa organizada.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo Morfológico Subjacente</th>
      <th>Fase Aguda / Precoce (&lt; 4 semanas de evolução)</th>
      <th>Fase Tardia / Organizada (&gt; 4 semanas de evolução)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pancreatite Intersticial Edematosa (Conteúdo Puramente Líquido)</strong></td>
      <td><strong>Coleção Líquida Peripancreática Aguda (APFC):</strong><br>
      Coleção peripancreática homogênea, sem parede ou cápsula definida, contendo apenas fluido aquoso estéril. Não há necrose parenquimatosa associada. Regride espontaneamente em mais de 70%-80% dos casos sem necessidade de qualquer drenagem.</td>
      <td><strong>Pseudocisto Pancreático:</strong><br>
      Coleção circunscrita de suco pancreático e exsudato estéril delimitada por uma <strong>parede fibrosa e inflamatória bem definida (tecido de granulação não epitelizado)</strong>, localizada habitualmente no espaço peripancreático. Resulta da ruptura de ducto pancreático menor sem necrose parenquimatosa. Requer 4 a 6 semanas para sua maturação.</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Necrosante (Conteúdo Misto: Líquido e Fragmentos Sólidos de Necrose)</strong></td>
      <td><strong>Coleção Necrótica Aguda (ANC):</strong><br>
      Coleção heterogênea contendo graus variáveis de líquido e <strong>tecido necrótico intra e/ou peripancreático</strong> (necrose parenquimatosa e adiposa retroperitoneal). Não possui parede fibrosa demarcatória. Pode ser estéril ou secundariamente infectada.</td>
      <td><strong>Necrose Pancreática Delimitada / Ensacada (WON - <em>Walled-Off Necrosis</em>):</strong><br>
      Coleção circunscrita, encapsulada por <strong>parede fibrosa inflamatória espessa e madura</strong>, contendo material líquido e restos sólidos necrosados devascularizados dentro do parênquima ou retroperitônio. Desenvolve-se habitualmente após 4 a 6 semanas do início da pancreatite necrosante.</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box info-box">
  <h4>Conceito Anatômico Crucial para Provas</h4>
  <p>O <strong>pseudocisto pancreático</strong> é revestido puramente por <strong>tecido de granulação e fibrose (parede sem epitélio verdadeiro)</strong>, o que o diferencia de cistos congênitos ou neoplasias císticas verdadeiras (como cistoadenoma seroso ou mucinoso), as quais possuem revestimento epitelial glandular secreto. A grande maioria dos pseudocistos assintomáticos &lt; 5 cm regride espontaneamente e não demanda intervenção. A intervenção está reservada para pseudocistos sintomáticos (compressão gástrica ou duodenal com vômitos, icterícia obstrutiva por compressão biliar, dor persistente, infecção secundária ou crescimento progressivo rápido).</p>
</div>
`
  },
  {
    id: 'manejo-clinico-volumetrico-nutricao-farmacologia',
    title: '6. Terapêutica Clínica Moderna: Ressuscitação Guiada por Metas, Nutrição e Farmacoterapia',
    body_html: `
<p>O tratamento clínico da pancreatite aguda experimentou avanços de primeira grandeza nos últimos anos, refutando dogmas históricos e consolidando condutas com forte respaldo em ensaios clínicos randomizados multicêntricos contemporâneos (como o ensaio WATERFALL).</p>

<h3>1. Ressuscitação Volêmica: Ringer Lactato e Moderação Guiada por Metas</h3>
<p>Historicamente, preconizava-se a infusão agressiva e indiscriminada de grandes volumes de cristaloides (3 a 5 litros nas primeiras 24 horas). No entanto, o clássico ensaio clínico <strong>WATERFALL</strong> (publicado no <em>New England Journal of Medicine</em> em 2022) demonstrou de maneira categórica que a hidratação agressiva precoce eleva significativamente as taxas de sobrecarga volêmica, edema pulmonar agudo, hipertensão intra-abdominal e insuficiência respiratória, sem propiciar benefício no desfecho de falência orgânica ou resolução da pancreatite.</p>

<p>As diretrizes internacionais recomendam a <strong>ressuscitação volêmica moderada e dirigida por metas clínicas e laboratoriais</strong>:</p>
<ul>
  <li><strong>Solução Cristalóide de Escolha:</strong> <strong>Ringer Lactato</strong> é superior ao Soro Fisiológico a 0,9%. O Ringer Lactato possui pH balanceado e previne a acidose metabólica hiperclorêmica, reduzindo a ativação precoce de zimogênios (que é facilitada pela acidose tecidual) e associando-se a menores níveis de SIRS e PCR às 48 horas;</li>
  <li><strong>Esquema de Infusão Inicial:</strong> Nos pacientes sem choque evidente, infunde-se um bolus modesto de 10 mL/kg nas primeiras 2 horas se houver hipovolemia, seguido de infusão de manutenção contínua de <strong>1,5 a 2,0 mL/kg/hora</strong> (aproximadamente 2.500 a 3.000 mL/dia para um adulto de 70 kg);</li>
  <li><strong>Metas de Reavaliação a Cada 6 a 12 Horas:</strong>
    <ul>
      <li>Frequência cardíaca &lt; 90 a 100 bpm;</li>
      <li>Pressão arterial média (PAM) entre 65 e 85 mmHg;</li>
      <li>Débito urinário &gt;= 0,5 a 1,0 mL/kg/hora;</li>
      <li>Queda do hematócrito para a faixa normal (ausência de hemoconcentração) e normalização progressiva da ureia sérica;</li>
      <li>Lactato sérico normal.</li>
    </ul>
  </li>
</ul>

<h3>2. Manejo Nutricional: Reintrodução Enteral Precoce versus Jejum Prolongado</h3>
<p>O dogma clássico do "repouso pancreático absoluto com jejum oral prolongado até normalização total de amilase e lípase" foi definitivamente abolido:</p>
<ul>
  <li><strong>Pancreatite Aguda Leve:</strong> A dieta oral (líquida límpida hipolipídica ou sólida branda hipogordurosa com baixo teor lipídico) deve ser <strong>iniciada tão logo haja regressão da dor abdominal forte, ausência de náuseas ou vômitos e presença de peristaltismo ativo</strong>, independentemente da normalização dos níveis de amilase ou lípase sérica. Essa abordagem reduz comprovadamente o tempo de internação hospitalar e custos sem aumentar recidivas;</li>
  <li><strong>Pancreatite Aguda Moderadamente Grave ou Grave:</strong> Nos pacientes incapazes de aceitar via oral por mais de 48 a 72 horas devido a íleo paralítico ou dor intensa, a <strong>nutrição enteral por sonda</strong> é imperativa. A via enteral preserva a integridade anatômica da barreira mucosa intestinal, previne a atrofia dos vilosidades e diminui drasticamente a translocação bacteriana e a infecção secundária da necrose pancreática quando comparada à Nutrição Parenteral Total (NPT);</li>
  <li><strong>Sonda Nasogástrica versus Nasoenteral/Nasojejunal:</strong> Ensaios clínicos demonstraram equivalência de eficácia e segurança entre o posicionamento nasogástrico e nasojejunal, sendo a sonda nasogástrica preferida inicialmente pela extrema facilidade e rapidez de instalação. A NPT fica restrita aos raros casos de intolerância gastrointestinal intratável à via enteral, obstrução intestinal mecânica completa ou fístulas digestivas de alto débito.</li>
</ul>

<h3>3. Analgesia Eficaz</h3>
<p>A dor na pancreatite aguda é de grande magnitude e perpetua o tônus simpático nocivo e o espasmo microvascular. O controle álgico deve ser agressivo e escalonado. O uso de opioides (morfina, hidromorfona, fentanil) é seguro e eficaz. O receio clássico de que a morfina induziria espasmo grave do esfíncter de Oddi carece de relevância clínica comprovada em humanos; entretanto, derivados sintéticos e opioides como fentanil, dipirona e paracetamol endovenosos são amplamente empregados.</p>

<h3>4. Proscrição Absoluta da Antibioticoprofilaxia de Rotina</h3>
<div class="clinical-box warning-box">
  <h4>Conceito Imutável de Prova e Prática Médica</h4>
  <p><strong>A antibioticoprofilaxia de rotina está FORMALMENTE CONTRAINDICADA na pancreatite aguda</strong>, mesmo nos casos com necrose pancreática extensa identificada à tomografia! Múltiplos ensaios clínicos controlados e metanálises demonstraram que o uso indiscriminado de antibióticos profiláticos não reduz a mortalidade, não impede o desenvolvimento de necrose infectada e seleciona microorganismos multirresistentes hospitalares e infecções fúngicas invasivas fatais (<em>Candida albicans</em> e <em>glabrata</em>).</p>
</div>
`
  },
  {
    id: 'necrose-infectada-e-step-up-approach',
    title: '7. Diagnóstico da Necrose Infectada e a Estratégia Cirúrgica Escalonada (Step-Up Approach)',
    body_html: `
<p>A sobreinfecção bacteriana da necrose pancreática e peripancreática constitui a principal causa de mortalidade na fase tardia da pancreatite aguda (&gt; 2 a 4 semanas). A translocação bacteriana retrógrada a partir da luz do cólon inflamado é a rota patogênica primária, com predomínio de bacilos Gram-negativos entéricos (<em>Escherichia coli</em>, <em>Klebsiella pneumoniae</em>, <em>Enterobacter</em>, <em>Pseudomonas</em>) e cocos Gram-positivos (<em>Enterococcus faecalis</em>, <em>Staphylococcus</em>).</p>

<h3>Critérios Diagnósticos de Necrose Infectada</h3>
<p>Deve-se suspeitar fortemente de necrose infectada em pacientes que, após a segunda semana de evolução, apresentam:</p>
<ol>
  <li>Deterioração clínica súbita ou persistente com febre alta sustentada, taquicardia e leucocitose marcante;</li>
  <li>Desenvolvimento de nova falência orgânica ou choque séptico refratário;</li>
  <li><strong>Sinal Patognomônico Tomográfico:</strong> Presença de <strong>gás retroperitoneal / bolhas gasosas no interior da necrose</strong> pancreática ou peripancreática à Tomografia Computadorizada (TC) de abdome com contraste (presente em 40% a 50% dos casos infectados);</li>
  <li><strong>Punção Aspirativa por Agulha Fina (PAAF) guiada por TC/USG:</strong> Reservada para casos de forte suspeição clínica na ausência de gás espontâneo à TC, onde a diferenciação entre SIRS estéril e sepse bacteriana guiará a mudança de conduta terapêutica. A presença de bactérias ao Gram e cultura positiva confirma a infecção.</li>
</ol>

<h3>Tratamento Farmacológico Inicial da Necrose Infectada</h3>
<p>Uma vez confirmada ou fortemente suspeitada a necrose infectada, deve-se introduzir prontamente antibioticoterapia com fármacos que apresentem excelente capacidade de penetração no tecido pancreático necrótico:</p>
<ul>
  <li><strong>Carbapenêmicos (Fármacos de Escolha):</strong> Meropenem (1 g EV a cada 8h) ou Imipenem/Cilastatina (500 mg EV a cada 6h);</li>
  <li><strong>Opções Alternativas:</strong> Ciprofloxacino ou Levofloxacino associado a Metronidazol; ou Piperacilina-Tazobactam.</li>
</ul>

<h3>A Revolução Cirúrgica: A Abordagem Escalonada (<em>Step-Up Approach</em>)</h3>
<p>Historicamente, o tratamento padrão da necrose infectada consistia na necrosectomia cirúrgica aberta precoce (laparotomia exploradora com debridamento manual agressivo), associada a mortalidade perioperatória estarrecedora de 40% a 60% e elevadas taxas de fístulas digestivas, hérnias incisionais e insuficiência pancreática endócrina e exócrina graves.</p>

<p>O estudo holandês <strong>PANTER</strong> (publicado em 2010 no <em>NEJM</em>) introduziu e validou a abordagem minimamente invasiva escalonada (<em>Step-Up Approach</em>), que se tornou o padrão-ouro mundial inquestionável:</p>

<div class="clinical-box info-box">
  <h4>Etapas do Step-Up Approach</h4>
  <ol>
    <li><strong>Passo 1 — Tratamento Conservador e Drenagem Minimamente Invasiva:</strong>
      <ul>
        <li>Introdução imediata de antibioticoterapia direcionada;</li>
        <li><strong>Drenagem Percutânea</strong> guiada por TC/USG (por via retroperitoneal lateral esquerda) OU <strong>Drenagem Transluminal Endoscópica</strong> (via ecoendoscopia/EUS trans-gástrica ou trans-duodenal com colocação de prótese metálica autoexpansível de aposição luminal — LAMS);</li>
        <li><em>Resultado:</em> Cerca de 35% a 50% dos pacientes evoluem com cura clínica e resolução do processo séptico apenas com a drenagem percutânea ou endoscópica, dispensando completamente qualquer cirurgia de debridamento!</li>
      </ul>
    </li>
    <li><strong>Passo 2 — Necrosectomia Minimamente Invasiva (Se não houver melhora clínica em 72 horas após a drenagem):</strong>
      <ul>
        <li>Se após 72 horas o paciente mantiver sinais de sepse, febre ou deterioração orgânica, avança-se para o debridamento necrótico mecânico;</li>
        <li>Realiza-se <strong>Necrosectomia Retroperitoneal Vigiada por Vídeo (VARD - <em>Video-Assisted Retroperitoneal Debridement</em>)</strong> através do mesmo trajeto do dreno percutâneo prévio, ou <strong>Necrosectomia Endoscópica Direta</strong> transmural através da gastrostomia/duodenostomia endoscópica;</li>
      </ul>
    </li>
    <li><strong>Passo 3 — Laparotomia Aberta para Necrosectomia:</strong>
      <ul>
        <li>Reservada estritamente como último recurso de resgate para os raros casos refratários às abordagens minimamente invasivas, na presença de síndrome compartimental abdominal com necessidade de abdome aberto (laparostomia) ou em complicações hemorrágicas vasculares agudas incontroláveis.</li>
      </ul>
    </li>
  </ol>
</div>

<p><strong>Tempo Ideal de Intervenção:</strong> Sempre que clinicamente tolerado, a intervenção invasiva deve ser <strong>postergada por pelo menos 4 semanas após o início da doença</strong>. Esse intervalo permite que a necrose se delimite organicamente do tecido viável circundante (formação de <em>Walled-Off Necrosis</em> — WON), tornando o procedimento muito mais seguro, com menor sangramento e menor ressecção inadvertida de parênquima pancreático sadio.</p>
`
  },
  {
    id: 'pancreatite-biliar-e-momento-colecistectomia',
    title: '8. Manejo da Pancreatite Aguda Biliar e Momento Preciso da Colecistectomia',
    body_html: `
<p>A etiologia litiásica impõe considerações cirúrgicas e endoscópicas específicas para prevenir a temida recidiva da pancreatite aguda, cuja taxa alcança 25% a 30% nos primeiros 30 a 60 dias se a vesícula biliar litiásica for mantida <em>in situ</em>.</p>

<h3>1. Indicação e Momento da CPRE na Pancreatite Biliar</h3>
<p>A Colangiopancreatografia Retrógrada Endoscópica (CPRE) de urgência com papilotomia/esfincterotomia NÃO está indicada rotineiramente para todos os pacientes com pancreatite aguda litiásica. Suas indicações precisas são:</p>
<ul>
  <li><strong>Indicação Absoluta de Emergência (nas primeiras 24 horas):</strong> Presença concomitante de <strong>Colangite Aguda Bacteriana</strong> (tríade de Charcot: febre com calafrios, icterícia e dor no hipocôndrio direito; ou pêntade de Reynolds com choque séptico e confusão mental). A descompressão biliar urgente é salvadora de vidas;</li>
  <li><strong>Indicação Relativa / Precoce (em até 48 a 72 horas):</strong> Coledocolitíase persistente documentada com obstrução biliar mantida e icterícia progressiva (bilirrubina total &gt; 4,0 mg/dL ou dilatação flagrante do colédoco sem evidência de colangite);</li>
  <li>Na ausência de colangite ou coledocolitíase obstrutiva persistente, a CPRE precoce não melhora o prognóstico e eleva a morbidade.</li>
</ul>

<h3>2. Momento Preciso da Colecistectomia Videolaparoscópica</h3>
<p>A definição do momento ideal para a remoção cirúrgica da vesícula biliar baseia-se diretamente na classificação de gravidade da pancreatite:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Gravidade da Pancreatite Biliar</th>
      <th>Momento Obrigatório da Colecistectomia</th>
      <th>Justificativa Fisiopatológica e Ensaios Clínicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pancreatite Biliar Leve</strong></td>
      <td><strong>Durante a mesma internação hospitalar</strong>, idealmente antes da alta (ensaio randomizado holandês <em>PONCHO</em>).</td>
      <td>Adiar a colecistectomia para um segundo tempo ambulatorial resulta em até 18% a 25% de readmissões por novos episódios de pancreatite biliar grave, colangite ou colecistite aguda antes do procedimento eletivo. A cirurgia é segura e realizada logo que os sintomas e o íleo regridam.</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Biliar Grave ou Necrosante</strong></td>
      <td><strong>Tardia: postergada até a resolução completa do processo inflamatório sistêmico</strong> e reabsorção ou organização e tratamento das coleções e necroses retroperitoneais (habitualmente após 6 a 8 semanas).</td>
      <td>A realização de colecistectomia precoce no paciente criticamente instável ou na presença de necrose e coleções imaturas retroperitoneais associa-se a taxas proibitivas de conversão, sangramento retroperitoneal, infecção iatrogênica de coleções previamente estéreis e falência de múltiplos órgãos.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas',
    title: '9. Casos Clínicos Desafiadores e Questões Comentadas de Alto Rendimento',
    body_html: `
<p>A fixação do conhecimento em gastroenterologia e terapia intensiva consolida-se com a resolução de cenários práticos e questões de concursos médicos de residência (ENARE, USP, UNICAMP, UFRJ, SURCE).</p>

<div class="case-study">
  <h4>Caso Clínico 1: Pancreatite Aguda Biliar em Homem Jovem</h4>
  <p><strong>História Clínica:</strong> Paciente masculino, 38 anos, previamente hígido, admitido no pronto-socorro com quadro de dor abdominal intensa de início abrupto há 14 horas, localizada em epigástrio e hipocôndrio direito, com irradiação dorsal "em faixa", acompanhada de náuseas e múltiplos episódios de vômitos incoercíveis. Nega etilismo habitual.</p>
  <p><strong>Exame Físico:</strong> REG, desidratado ++/4+, anictérico. PA: 130x80 mmHg, FC: 104 bpm, FR: 20 irpm, afebril, SatO2: 97% em ar ambiente. Abdome: distendido, doloroso difusamente à palpação profunda em andar superior, ruídos hidroaéreos diminuídos, sem sinais de irritação peritoneal franca. Sem equimoses cutâneas.</p>
  <p><strong>Exames Laboratoriais:</strong> Hemoglobina: 15,2 g/dL; Hematócrito: 46%; Leucócitos: 14.800/mm³ (sem desvio); Lípase: 1.480 U/L (LSN: 60 U/L); Amilase: 980 U/L (LSN: 110 U/L); ALT/TGP: 220 U/L (LSN: 40 U/L); AST/TGO: 185 U/L; Bilirrubina Total: 1,4 mg/dL (Direta: 0,8 mg/dL); Creatinina: 1,0 mg/dL; Ureia: 38 mg/dL; Cálcio: 9,2 mg/dL; Triglicerídeos: 130 mg/dL.</p>
  <p><strong>Ultrassonografia de Abdome:</strong> Fígado de ecotextura normal; vesícula biliar com múltiplos cálculos móveis de 3 a 5 mm em seu interior, sem espessamento parietal; colédoco com 4 mm de calibre sem litíase identificável no segmento proximal; pâncreas parcialmente obscurecido por interposição de gases intestinais.</p>
  <p><strong>Discussão e Conduta:</strong>
  1. O paciente preenche os critérios diagnósticos de Atlanta (dor clínica típica + elevação de lípase &gt; 24x o LSN). A tomografia computadorizada é desnecessária e contraindicada neste momento admissional inicial.<br>
  2. A etiologia é litiásica (biliar), comprovada pela presença de colelitíase com micromicrólitos à USG e elevação precoce de ALT &gt; 150 U/L.<br>
  3. A conduta clínica imediata é a hidratação venosa moderada guiada por metas com Ringer Lactato (1,5 a 2,0 mL/kg/h), analgesia com dipirona e opioides endovenosos e monitorização do débito urinário e hematócrito.<br>
  4. Não há indicação de antibioticoterapia profilática nem de CPRE de urgência (colédoco fino, sem icterícia obstrutiva persistente e ausência de sinais de colangite).<br>
  5. Uma vez resolvida a dor e reintroduzida a dieta oral com boa tolerância, o paciente deve ser submetido à <strong>colecistectomia videolaparoscópica durante a mesma internação hospitalar</strong>, antes da alta médica.</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 1 (ENARE / Residência Médica)</h4>
  <p>Um homem de 52 anos, etilista diário de destilados há 15 anos, procura a Unidade de Pronto Atendimento com dor epigástrica contínua irradiando para as costas há 18 horas, associada a vômitos. Exames laboratoriais revelam amilase de 1.150 U/L e lípase de 2.400 U/L. Assinale a alternativa correta quanto à condução deste caso:</p>
  <p>A) Deve-se solicitar Tomografia Computadorizada de abdome com contraste imediatamente para quantificar a porcentagem de necrose pancreática e definir a gravidade.<br>
  B) Está indicada a prescrição imediata de ciprofloxacino associado a metronidazol para profilaxia de necrose infectada devido ao antecedente alcoólico.<br>
  C) A hidratação venosa com Ringer Lactato deve ser iniciada de imediato de forma moderada e direcionada por metas clínicas de perfusão, evitando a sobrecarga volêmica agressiva.<br>
  D) A dieta oral deve ser suspensa obrigatoriamente por 7 a 10 dias até a completa normalização dos níveis séricos de lípase e amilase.<br>
  E) O escore de Ranson deve ser finalizado nas primeiras 12 horas para definir a necessidade de internação em unidade de terapia intensiva.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. A ressuscitação com Ringer Lactato guiada por metas (WATERFALL trial) é a conduta padrão. A TC nas primeiras 48h não deve ser realizada de rotina se o diagnóstico já está firmado clinicamente e laboratorialmente (elimina A). Antibioticoprofilaxia é formalmente contraindicada (elimina B). A dieta oral é reiniciada precocemente assim que cessarem a dor e os vômitos (elimina D). O escore de Ranson requer 48 horas completas para sua estratificação final (elimina E).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 2 (USP / Cirurgia Geral)</h4>
  <p>Mulher de 64 anos, internada na UTI há 24 dias devido a pancreatite aguda necrosante grave litiásica. Vinha evoluindo com melhora clínica gradual e desmame ventilatório, quando subitamente, no 25º dia, desenvolve febre (38,8°C), calafrios, leucocitose de 22.000/mm³ e necessidade de noradrenalina em doses crescentes. Realizada TC de abdome com contraste que evidencia coleção heterogênea peripancreática de 10 cm, com halo capsular espessado e presença de múltiplas bolhas de ar em seu interior. De acordo com o conceito atual do <em>Step-Up Approach</em>, a melhor conduta imediata para esta paciente é:</p>
  <p>A) Laparotomia exploradora mediana de emergência com necrosectomia aberta ampla e drenagem em bolsa de Bogotá.<br>
  B) Início de antibioticoterapia de amplo espectro com carbapenêmico e drenagem percutânea retroperitoneal ou drenagem endoscópica transluminal da coleção.<br>
  C) Manutenção de conduta expectante com aumento do suporte vasopressor e punção aspirativa diagnóstica para aguardar antibiograma em 72 horas.<br>
  D) Colangiopancreatografia retrógrada endoscópica com papilotomia e passagem de prótese biliar.<br>
  E) Ressonância magnética de abdome para diferenciar necrose tecidual de pseudocisto estéril.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. A presença de bolhas de gás em paciente séptico tardio é patognomônica de necrose infectada com coleção encapsulada (WON). Pela estratégia <em>Step-Up Approach</em> (ensaio PANTER), inicia-se antibiótico penetrante (carbapenêmico) e procede-se à drenagem minimamente invasiva (percutânea ou ecoendoscópica transmural), que isoladamente resolve 35% a 50% dos casos, evitando a morbimortalidade catastrófica da laparotomia aberta imediata (elimina A).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 3 (UNICAMP / Clínica Médica)</h4>
  <p>Sobre as coleções líquidas e necróticas que ocorrem na evolução da pancreatite aguda segundo a classificação de Atlanta revisada, assinale a assertiva correta:</p>
  <p>A) O pseudocisto pancreático desenvolve-se precocemente nas primeiras 2 semanas da pancreatite intersticial edematosa.<br>
  B) A coleção necrótica aguda (ANC) é revestida por espessa cápsula inflamatória fibrosa rica em macrófagos e fibroblastos maduros.<br>
  C) A necrose pancreática delimitada (WON) surge tipicamente após 4 semanas de evolução na pancreatite necrosante e possui parede inflamatória bem definida delimitando líquido e fragmentos sólidos necróticos.<br>
  D) Toda coleção peripancreática aguda (APFC) requer punção percutânea diagnóstica de rotina para descartar sobreinfecção.<br>
  E) O pseudocisto pancreático verdadeiro possui parede revestida por epitélio colunar simples mucoprodutor.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. A WON (<em>Walled-Off Necrosis</em>) caracteriza-se pela presença de necrose líquida e sólida circunscrita por parede fibrosa organizada após 4 semanas de doença. O pseudocisto demora &gt; 4 semanas para se formar e não surge em 2 semanas (elimina A). A coleção necrótica aguda ocorre antes de 4 semanas e NÃO tem parede capsular organizada (elimina B). A APFC não deve ser puncionada de rotina, pois regride espontaneamente na imensa maioria dos casos (elimina D). O pseudocisto NÃO possui epitélio verdadeiro; sua parede é formada por tecido de granulação fibrótico (elimina E).</p>
</div>
`
  },
  {
    id: 'sintese-pratica-e-referencias',
    title: '10. Síntese Prática, Fluxograma de Decisão e Referências Bibliográficas',
    body_html: `
<div class="summary-box">
  <h4>Guia de Conduta Rápida na Pancreatite Aguda</h4>
  <ul>
    <li><strong>Diagnóstico (2 de 3):</strong> Dor típica em faixa + Enzimas &gt;= 3x LSN (Lípase preferencial) + Imagem compatível. Não fazer TC admissional se os dois primeiros estiverem presentes!</li>
    <li><strong>Etiologia:</strong> Biliar (mais comum, ALT &gt; 150) e Alcoólica (segunda mais comum). Investigar triglicerídeos (&gt; 1.000 mg/dL), drogas e CPRE prévia.</li>
    <li><strong>Predição de Gravidade Precoce:</strong> Escore BISAP &gt;= 3 nas primeiras 24h, Ranson &gt;= 3 às 48h, PCR &gt;= 150 mg/L às 48h, Hematócrito &gt; 44%.</li>
    <li><strong>Classificação de Atlanta:</strong> Leve (sem falência nem complicações), Moderadamente Grave (falência orgânica transitória &lt; 48h ou complicações locais), Grave (falência orgânica persistente &gt; 48h pelo Marshall Modificado).</li>
    <li><strong>Manejo Volêmico:</strong> Ringer Lactato moderado (1,5 a 2,0 mL/kg/h) guiado por metas. Evitar hiperidratação agressiva (ensaio WATERFALL).</li>
    <li><strong>Nutrição:</strong> Dieta oral precoce na leve assim que a dor regredir. Enteral precoce por sonda (nasogástrica ou nasoenteral) na pancreatite moderada/grave se jejum prolongado. NPT apenas em exceções.</li>
    <li><strong>Antibioticoprofilaxia:</strong> FORMALMENTE PROSCRITA. Não usar de rotina nem mesmo na presença de necrose estéril!</li>
    <li><strong>Necrose Infectada (Fase Tardia):</strong> Suspeita com piora séptica ou presença de gás à TC. Tratar com carbapenêmico e <em>Step-Up Approach</em> (drenagem percutânea/endoscópica em primeiro lugar; necrosectomia minimamente invasiva apenas se refratário após 72h). Postergada idealmente por &gt; 4 semanas.</li>
    <li><strong>Momento da Colecistectomia:</strong> Na mesma internação hospitalar para pancreatite biliar leve; tardia (&gt; 6-8 semanas) na pancreatite biliar grave ou necrosante.</li>
  </ul>
</div>

<h3>Referências Bibliográficas Fundamentais</h3>
<ol>
  <li>Banks PA, Bollen TL, Dervenis C, et al. Classification of acute pancreatitis—2012: revision of the Atlanta classification and definitions by international consensus. <em>Gut</em>. 2013;62(1):102-111.</li>
  <li>de-Madaria E, Buxbaum JL, Maisonneuve P, et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). <em>New England Journal of Medicine</em>. 2022;387(15):1349-1359.</li>
  <li>van Santvoort HC, Besselink MG, Bakker OJ, et al. A step-up approach or open necrosectomy for necrotizing pancreatitis (PANTER). <em>New England Journal of Medicine</em>. 2010;362(16):1491-1502.</li>
  <li>da Costa DW, Bouwense SA, Schepers NJ, et al. Same-admission versus delayed cholecystectomy for mild gallstone pancreatitis (PONCHO): a multicentre randomised controlled trial. <em>The Lancet</em>. 2015;386(10000):1261-1268.</li>
  <li>Tenner S, Baillie J, DeWitt J, Vege SS. American College of Gastroenterology guideline: management of acute pancreatitis. <em>Am J Gastroenterol</em>. 2024;119(3):419-437.</li>
  <li>Crockett SD, Wani S, Gardner TB, Falck-Ytter Y, Barkun AN. American Gastroenterological Association Institute guideline on initial management of acute pancreatitis. <em>Gastroenterology</em>. 2018;154(4):1096-1101.</li>
</ol>
`
  }
];

const finalSections = [
  baseSections[0],
  baseSections[1],
  secPancreatiteExpansao[0],
  baseSections[2],
  secPancreatiteExpansao2[0],
  baseSections[3],
  secPancreatiteExpansao[1],
  baseSections[4],
  secPancreatiteExpansao2[1],
  baseSections[5],
  baseSections[6],
  baseSections[7],
  secPancreatiteExpansao[2],
  baseSections[8],
  secPancreatiteExpansao3[0],
  baseSections[9]
];

const bookData = {
  slug,
  title: 'Pancreatite Aguda: Do Diagnóstico ao Step-Up Approach',
  subtitle: 'Critérios de Atlanta revisados, estratificação prognóstica, hidratação por metas, coleções e abordagem minimamente invasiva',
  area: 'Clínica Médica',
  materia: 'Gastroenterologia e Terapia Intensiva',
  sections: finalSections
};

saveBook(slug, bookData);

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const chars = countUsefulChars(html);
console.log(`[AULA 141 - SUCESSO] ${slug} compilado: ${chars} caracteres úteis.`);
