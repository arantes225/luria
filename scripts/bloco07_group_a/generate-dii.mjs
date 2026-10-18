import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import { secDiiExpansao } from './dii-expansao.mjs';
import { secDiiExpansao2 } from './dii-expansao2.mjs';
import { secDiiExpansao3 } from './dii-expansao3.mjs';
import { secDiiExpansao4 } from './dii-expansao4.mjs';
import { secDiiExpansao5 } from './dii-expansao5.mjs';
import { secDiiExpansao6 } from './dii-expansao6.mjs';
import { secDiiExpansao7 } from './dii-expansao7.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'doenca-inflamatoria-intestinal';

const baseSections = [
  {
    id: 'introducao-conceito-epidemiologia',
    title: '1. Introdução, Epidemiologia Global e a Transição Imunológica das DIIs',
    body_html: `
<p>As Doenças Inflamatórias Intestinais (DII) compreendem um grupo de afecções inflamatórias crônicas, imunomediadas e recidivantes do trato gastrointestinal, representadas primordialmente por duas entidades clínicas distintas, porém com frequentes zonas de sobreposição diagnóstica: a <strong>Doença de Crohn (DC)</strong> e a <strong>Retocolite Ulcerativa (RCU)</strong>. Nos casos em que a inflamação permanece restrita ao cólon com características histopatológicas e clínicas sobrepostas que desafiam a diferenciação categórica, utiliza-se a denominação temporária de <strong>Colite Inclassificável (DII-não classificada)</strong>.</p>

<h3>Panorama Epidemiológico e a Transição Global</h3>
<p>Historicamente consideradas doenças típicas de populações caucasianas do Hemisfério Norte (América do Norte, Reino Unido e Escandinávia), as DIIs apresentaram nas últimas três décadas uma expansão acelerada nos países recém-industrializados da América Latina, Ásia e Leste Europeu. O Brasil vive atualmente uma fase de transição epidemiológica acelerada, com elevação consistente nas taxas de incidência e prevalência:</p>
<ul>
  <li><strong>Incidência e Prevalência no Brasil:</strong> Estimativas epidemiológicas atuais apontam prevalência superior a 100 casos por 100.000 habitantes nos grandes centros urbanos das regiões Sul e Sudeste, com crescimento marcante de diagnósticos no Sistema Único de Saúde (SUS);</li>
  <li><strong>Faixa Etária e Padrão Bimodal:</strong> Apresenta clássica <strong>distribuição etária bimodal</strong>. O primeiro e maior pico de incidência ocorre no adulto jovem, entre a segunda e terceira décadas de vida (15 a 35 anos), fase de pleno desenvolvimento profissional e reprodutivo. Um segundo pico, mais discreto, manifesta-se entre a sexta e sétima décadas (55 a 70 anos);</li>
  <li><strong>Predisposição Genética e Fatores Ambientais:</strong> Concordância em gêmeos monozigóticos muito mais expressiva na Doença de Crohn (~50%) do que na RCU (~15%-20%), demonstrando forte base poligênica. A ocidentalização dos hábitos de vida, a dieta hipercalórica ultraprocessada rica em gorduras poli-insaturadas ômega-6, aditivos alimentares (emulsificantes como polissorbato-80), uso frequente de antibióticos na infância precoce e redução do aleitamento materno correlacionam-se com a quebra da tolerância imunológica entérica.</li>
</ul>
`
  },
  {
    id: 'fisiopatologia-molecular-e-imunologia',
    title: '2. Fisiopatologia Imunológica, Microbiota, Genética (NOD2/CARD15) e o Eixo Th1/Th17 versus Th2-like',
    body_html: `
<p>A patogênese das DIIs decorre de uma interação anômala e desregulada entre a <strong>predisposição genética poligênica do hospedeiro</strong>, uma <strong>disbiose marcante da microbiota entérica</strong>, <strong>defeitos na permeabilidade da barreira epitelial mucosa</strong> e uma <strong>resposta imunológica inata e adaptativa hiperativa e descontrolada</strong>.</p>

<h3>Bases Genéticas: O Protagonismo de NOD2/CARD15 na Doença de Crohn</h3>
<p>Estudos de associação genômica ampla (GWAS) identificaram mais de 240 loci de suscetibilidade associados às DIIs. O primeiro e mais impactante gene descrito foi o <strong>NOD2/CARD15</strong> (localizado no cromossomo 16q12):</p>
<ul>
  <li>O gene NOD2 codifica um receptor citosólico intracelular de reconhecimento de padrão (PRR) expresso em células dendríticas, macrófagos e células epiteliais especializadas de Paneth na base das criptas ileais;</li>
  <li>O receptor NOD2 reconhece especificamente o muramil dipeptídeo (MDP), constituinte da parede celular de bactérias Gram-positivas e Gram-negativas, ativando a secreção de <strong>alfa-defensinas antimicrobianas</strong> pelas células de Paneth e mantendo a homeostase do fluxo autofágico celular através da proteína ATG16L1;</li>
  <li>Mutações de perda de função em <em>NOD2/CARD15</em> (variantes R702W, G908R e 1007fs) provocam deficiência profunda na síntese de defensinas e falha no clareamento de bactérias intracelulares. As bactérias comensais penetram na lâmina própria ileal, deflagrando inflamação crônica granulomatosa transmural. Pacientes homozigotos ou heterozigotos compostos apresentam risco até 20 a 40 vezes maior de desenvolver Doença de Crohn de localização ileal e padrão estenosante/fistulizante precoce.</li>
</ul>

<h3>Dicotomia Imunológica: Perfil Th1/Th17 (Crohn) versus Th2 Atípico/Th9 (RCU)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Imunológico</th>
      <th>Doença de Crohn (DC)</th>
      <th>Retocolite Ulcerativa (RCU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Perfil de Resposta Imune Adaptativa</strong></td>
      <td><strong>Predomínio Th1 e Th17</strong> desregulados.</td>
      <td><strong>Resposta Th2 atípica (Th2-like)</strong> mediada por células T natural killer invariantes (iNKT) e células linfoides inatas (ILC2), associada a <strong>Th9</strong>.</td>
    </tr>
    <tr>
      <td><strong>Citocinas Efetoras Principais</strong></td>
      <td><strong>IL-12, IL-23, Interferon-gama (IFN-gama), IL-17A, IL-17F, IL-21, IL-22 e TNF-alfa</strong> em concentrações massivas.</td>
      <td><strong>IL-13, IL-5, IL-4 e IL-9</strong>, associadas a altos níveis de <strong>TNF-alfa</strong> local. A IL-13 exerce citotoxicidade direta sobre as células epiteliais colônicas, rompendo as claudinas das junções oclusivas.</td>
    </tr>
    <tr>
      <td><strong>Eixo Terapêutico Alvo</strong></td>
      <td>Inibição do TNF-alfa (Infliximabe, Adalimumabe); Inibição da subunidade p40 de IL-12/IL-23 (Ustequinumabe); Inibição específica da subunidade p19 de IL-23 (Risanquizumabe, Guselcumabe).</td>
      <td>Inibição do TNF-alfa; Inibição de Janus quinases intracelulares - JAK1/JAK3 (Tofacitinibe, Upadacitinibe); Inibição da integrina alfa4-beta7 (Vedolizumabe); Moduladores dos receptores de esfingosina-1-fosfato - S1P (Ozanimode).</td>
    </tr>
  </tbody>
</table>

<h3>O Papel Paradoxal do Tabagismo</h3>
<div class="clinical-box warning-box">
  <h4>Conceito Clássico e Inflexível em Provas de Residência Médica</h4>
  <p>O tabagismo exerce efeitos diametralmente opostos nas duas doenças inflamatórias intestinais:</p>
  <ul>
    <li><strong>Na Doença de Crohn: O tabagismo é FATOR DE RISCO E DE MAU PROGNÓSTICO</strong>. Dobra a incidência da doença, multiplica o risco de estenoses fibroestenosantes e fístulas perianais complexas, eleva em 3 vezes a taxa de reintervenção cirúrgica após ressecção ileocólica e induz perda de resposta a agentes biológicos anti-TNF. A cessação imediata do tabagismo é parte mandatória do tratamento!;</li>
    <li><strong>Na Retocolite Ulcerativa: O tabagismo atua como "FATOR PROTETOR" paradoxal</strong>. A incidência de RCU é significativamente menor em fumantes ativos, e é frequente a eclosão do primeiro surto grave ou exacerbação da doença logo após o paciente interromper o consumo de cigarros. Acredita-se que a nicotina estimule a secreção de muco protetor retal, reduza a permeabilidade epitelial e exerça ação imunossupressora tópica nas células dendríticas colônicas. (<em>Nota:</em> Isso NUNCA justifica prescrever tabagismo pelo risco cardiovascular e oncológico sistêmico!).</li>
  </ul>
</div>
`
  },
  {
    id: 'diagnostico-diferencial-crohn-versus-rcu',
    title: '3. Diagnóstico Diferencial Comparativo: Padrão Anatômico, Histopatológico e Sorológico',
    body_html: `
<p>A diferenciação entre Doença de Crohn e Retocolite Ulcerativa é indispensável, uma vez que dita a escolha terapêutica medicamentosa, o risco de complicações e o tipo de cirurgia a ser indicada.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Característica Clínica / Patológica</th>
      <th>Doença de Crohn (DC)</th>
      <th>Retocolite Ulcerativa (RCU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Segmento Gastrointestinal Acometido</strong></td>
      <td><strong>Boca ao ânus</strong> ("da boca ao ânus"). Acomete com maior frequência o íleo terminal e cólon direito (ileocolite em 50%), íleo isolado (30%) ou cólon isolado (20%). O reto é frequentemente <strong>POUPADO</strong> (em cerca de 50% dos casos).</td>
      <td><strong>Restrita exclusivamente ao CÓLON e RETO</strong>. O reto é <strong>SEMPRE ACOMETIDO (proctite presente em &gt; 95% a 100% dos casos)</strong>. Pode ocorrer ileíte de refluxo transitória superficial (<em>backwash ileitis</em>) sem úlceras profundas nos casos de pancolite severa.</td>
    </tr>
    <tr>
      <td><strong>Continuidade das Lesões</strong></td>
      <td><strong>Descontínua / Salteada</strong> (áreas de mucosa gravemente inflamada intercaladas por segmentos de mucosa macroscopicamente normal - <em>skip lesions</em>).</td>
      <td><strong>Contínua e Retrógrada</strong> (inicia-se obrigatoriamente na linha pectínea retal e progride proximalmente em direção ao ceco de forma contínua e uniforme, sem áreas poupadas).</td>
    </tr>
    <tr>
      <td><strong>Profundidade do Comprometimento Mural</strong></td>
      <td><strong>Transmural</strong> (compromete todas as camadas da parede intestinal: mucosa, submucosa, muscular própria e serosa). Gera espessamento acentuado da parede intestinal, estenoses luminais, perda de complacência, aderências e fístulas para órgãos adjacentes.</td>
      <td><strong>Restrita à Mucosa e Submucosa superficial</strong>. A muscular própria e a serosa são absolutamente preservadas (exceto na vigência de complicação catastrófica por megacólon tóxico com perfuração secundária).</td>
    </tr>
    <tr>
      <td><strong>Aspecto Macroscópico / Endoscópico</strong></td>
      <td>Úlceras aftoides lineares profundas, úlceras serpiginosas entremeadas por ilhotas de mucosa edemaciada, conferindo aspecto clássico em <strong>pedras de calçamento (paralelepípedo / cobblestone)</strong>. Presença frequente de estenoses fibroinflamatórias e fissuras profundas.</td>
      <td>Mucosa difusamente eritematosa, friável com sangramento espontâneo ou ao toque do aparelho (aspecto em "lixa molhada"), perda completa do padrão vascular submucoso habitual, microerosões confluentes, exsudato purulento e <strong>pseudopólipos inflamatórios</strong> abundantes.</td>
    </tr>
    <tr>
      <td><strong>Achados Histopatológicos Patognomônicos</strong></td>
      <td>Presença de <strong>Granulomas Epitelióides Não Caseosos</strong> (compostos por células gigantes multinucleadas de Langhans sem necrose de caseificação central), encontrados em 30% a 50% das biópsias da mucosa ou peças cirúrgicas. Infiltrado linfoplasmocitário transmural com fissuras profundas e hipertrofia neural.</td>
      <td><strong>Ausência absoluta de granulomas</strong>. Criptite e <strong>abscessos de cripta</strong> (infiltração neutrofílica no lúmen das criptas colônicas com destruição da arquitetura glandular), ramificação e distorção das criptas, plasmocitose basal e depleção das células caliciformes produtoras de muco.</td>
    </tr>
    <tr>
      <td><strong>Doença Perianal e Fístulas</strong></td>
      <td><strong>Muito frequente (30% a 50% dos pacientes)</strong>: fístulas perianais complexas, abscessos perianais recidivantes, fissuras largas e indolores em localizações atípicas e plicomas sentinelas exuberantes (<em>skin tags</em> arroxeados). Fístulas enterocutâneas, enterovesicais e enterovaginais.</td>
      <td><strong>Ausente</strong>. RCU não produz fístulas nem doença perianal complexa (a ocorrência de fístula em paciente com diagnóstico prévio de RCU impõe a revisão imediata do diagnóstico para Doença de Crohn!).</td>
    </tr>
    <tr>
      <td><strong>Perfil de Marcadores Sorológicos</strong></td>
      <td><strong>ASCA positivo / p-ANCA negativo</strong> (anticorpo anti-<em>Saccharomyces cerevisiae</em>, dirigido contra fosfopeptomananos da parede de leveduras). Sensibilidade 60%, especificidade &gt; 85%.</td>
      <td><strong>p-ANCA positivo / ASCA negativo</strong> (anticorpo anticitoplasma de neutrófilo com padrão perinuclear contra antígenos nucleares de neutrófilos). Sensibilidade 65%-70%, especificidade &gt; 85%.</td>
    </tr>
    <tr>
      <td><strong>Calprotectina Fecal</strong></td>
      <td>Elevada (&gt; 250 mcg/g) durante surtos de atividade inflamatória mucosa em ambos os subtipos; excelente sensibilidade para diferenciar DII de Síndrome do Intestino Irritável.</td>
      <td>Elevada (&gt; 250 mcg/g) com correlação linear direta com a extensão da proctite/colite e resposta à corticoterapia e biológicos.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'quadro-clinico-e-manifestacoes-extraintestinais',
    title: '4. Quadro Clínico, Formas Evolutivas e as Manifestações Extraintestinais das DIIs',
    body_html: `
<p>As manifestações clínicas das DIIs variam amplamente conforme a localização anatômica e a gravidade da resposta imune:</p>
<ul>
  <li><strong>Retocolite Ulcerativa:</strong> Apresenta-se tipicamente como <strong>colite diarreica sanguinolenta crônica</strong>: diarreia com fezes líquidas contendo muco, pus e sangue vivo visível (retorragia/hematoquezia), associada a <strong>tenesmo retal marcante</strong> (sensação de evacuação incompleta dolorosa), dor em cólica no hipogástrio e fossa ilíaca esquerda que melhora temporariamente após evacuar, e urgência fecal com incontinência nos casos de proctite intensa;</li>
  <li><strong>Doença de Crohn:</strong> O quadro clássico na ileocolite consiste em dor abdominal em cólica crônica localizada na <strong>fossa ilíaca direita</strong> (frequentemente mimetizando apendicite aguda ou intussuscepção), diarreia crônica (comumente sem sangue macroscópico evidente se restrita ao intestino delgado), febre baixa diária vespertina, anorexia, astenia e <strong>perda ponderal acentuada com desnutrição calórico-proteica</strong> decorrente de má-absorção ileal e consumo metabólico. Em crianças e adolescentes, manifesta-se tipicamente por déficit de crescimento pôndero-estatural e atraso puberal inexplicável.</li>
</ul>

<h3>Manifestações Extraintestinais (MEI)</h3>
<p>Cerca de 25% a 40% dos portadores de DII apresentam pelo menos uma manifestação extraintestinal ao longo da vida. A classificação das MEIs baseia-se na sua relação temporal com a atividade inflamatória intestinal ativa:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Sistema Orgânico</th>
      <th>Manifestações que Acompanham a Atividade Intestinal (Paralelas ao Surto)</th>
      <th>Manifestações que NÃO Dependem da Atividade Intestinal (Independentes do Surto)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Articular (Mais Comum: 20%-30%)</strong></td>
      <td><strong>Artrite Periférica Tipo 1 (Pauciarticular):</strong> Acomete menos de 5 grandes articulações de membros inferiores (joelhos, tornozelos), de caráter agudo, assimétrico e migratório. Responde prontamente ao tratamento do surto intestinal.</td>
      <td>• <strong>Espondilite Anquilosante (EA):</strong> Sacroileíte bilateral simétrica com dor lombar inflamatória noturna e rigidez matinal, fortemente associada ao alelo <strong>HLA-B27</strong>. Evolui independentemente da remissão intestinal.<br>• <strong>Sacroileíte Isolada Assintomática</strong>.<br>• <strong>Artrite Periférica Tipo 2 (Poliarticular):</strong> Mais de 5 pequenas articulações simétricas (mãos), curso crônico.</td>
    </tr>
    <tr>
      <td><strong>Dermatológico</strong></td>
      <td><strong>Eritema Nodoso:</strong> Nódulos subcutâneos eritematosos, dolorosos, quentes, localizados preferencialmente na face anterior da tíbia. Mais comum no sexo feminino e na Doença de Crohn. Regride com a indução de remissão da colite/ileíte.</td>
      <td><strong>Pioderma Gangrenoso:</strong> Lesão ulcerada destrutiva grave, de bordas violáceas escavadas e fundo necrótico purulento, precedida por pústula inicial. Ocorre fenômeno de <strong>patergia</strong> (piora ou surgimento de nova lesão após trauma cutâneo ou debridamento cirúrgico!). Mais comum na RCU. <strong>Pode eclodir mesmo com a doença intestinal em franca remissão clínica completa</strong>. Responde a corticoterapia sistêmica em altas doses e anti-TNF (Infliximabe).</td>
    </tr>
    <tr>
      <td><strong>Ocular</strong></td>
      <td><strong>Episclerite:</strong> Hiperemia conjuntival difusa, lacrimejamento e desconforto ocular sem perda de acuidade visual nem dor profunda. Paralela à inflamação intestinal.</td>
      <td><strong>Uveíte Anterior:</strong> Dor ocular profunda lancinante, fotofobia intensa, cefaleia e borramento visual com presença de células e <em>flare</em> na câmara anterior à lâmpada de fenda. Pode levar a cegueira se não tratada agressivamente com midriáticos e corticoide ocular/sistêmico.</td>
    </tr>
    <tr>
      <td><strong>Hepatobiliar</strong></td>
      <td>Esteatose hepática secundária à desnutrição e inflamação sistêmica.</td>
      <td><strong>Colangite Esclerosante Primária (CEP):</strong> Processo fibro-obliterativo inflamatório progressivo dos ductos biliares intra e extra-hepáticos. <strong>Fortemente associada à Retocolite Ulcerativa (cerca de 70%-80% dos pacientes com CEP têm RCU subjacente)</strong>. A colectomia curativa para RCU NÃO interrompe a progressão da CEP, que pode evoluir para cirrose biliar e confere risco alarmante de <strong>Colangiocarcinoma</strong> (risco cumulativo de 10%-15%) e câncer colorretal acelerado (exige colonoscopia anual de rastreamento a partir do momento do diagnóstico de CEP!).</td>
    </tr>
    <tr>
      <td><strong>Urológico e Metabólico (Crohn Ileal)</strong></td>
      <td>—</td>
      <td>• <strong>Nefrolitíase por Oxalato de Cálcio:</strong> A má-absorção ileal de ácidos graxos saponifica o cálcio intraluminal. O oxalato livre, desprovido de cálcio para formar precipitado fecal insolúvel, é absorvido em excesso pelo cólon (hiperoxalúria entérica), precipitando nos túbulos renais como cálculos de oxalato.<br>• <strong>Colelitíase Biliar:</strong> Redução do pool de sais biliares por falha na circulação entero-hepática ileal.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'complicacoes-agudas-megacolon-estenos-fistulas',
    title: '5. Complicações Agudas Graves: Megacólon Tóxico, Perfuração, Estenoses e Abscessos Abdominais',
    body_html: `
<p>As complicações agudas das DIIs representam emergências clínico-cirúrgicas associadas a elevada morbimortalidade se o reconhecimento e a intervenção forem postergados.</p>

<h3>1. Megacólon Tóxico (Complicação Temida da Retocolite Ulcerativa)</h3>
<p>Caracteriza-se pela dilatação aguda não obstrutiva total ou segmentar do cólon associada a quadro de toxicidade sistêmica fulminante. Ocorre em cerca de 2% a 5% dos pacientes com colite ulcerativa grave, comumente precipitada por uso inadvertido de opioides, antiespasmódicos, loperamida, preparo de cólon para colonoscopia durante surto agudo ou infecção superposta por <em>Clostridioides difficile</em> ou Citomegalovírus (CMV).</p>

<p>Fisiopatologicamente, a inflamação transmural atinge o plexo mioentérico de Auerbach, provocando paralisia neuromuscular da muscular própria, atonia do cólon e dilatação rápida com translocação bacteriana maciça e isquemia mural.</p>

<div class="clinical-box warning-box">
  <h4>Critérios Diagnósticos de Jalan para Megacólon Tóxico</h4>
  <p>Exige a presença concomitante de:</p>
  <ol>
    <li><strong>Achado Radiológico:</strong> Dilatação do diâmetro do cólon transverso <strong>&gt; 5,5 a 6,0 cm</strong> em radiografia de abdome simples em decúbito dorsal ou tomografia computadorizada;</li>
    <li><strong>Toxicidade Sistêmica (Pelo menos 3 dos seguintes critérios):</strong>
      <ul>
        <li>Febre &gt; 38,6°C;</li>
        <li>Frequência cardíaca &gt; 120 bpm (taquicardia sustentada);</li>
        <li>Leucocitose importante &gt; 10.500/mm³ ou desvio à esquerda;</li>
        <li>Anemia com hemoglobina em queda acentuada;</li>
      </ul>
    </li>
    <li><strong>Presença de pelo menos UM dos seguintes comemorativos adicionais:</strong> Desidratação grave, alteração do nível de consciência/letargia, distúrbio eletrolítico marcante (hipocalemia) ou hipotensão arterial sistêmica.</li>
  </ol>
</div>

<p><strong>Manejo do Megacólon Tóxico:</strong></p>
<ul>
  <li>Jejum oral absoluto, passagem de sonda nasogástrica descompressiva e reposição volêmica vigorosa com Ringer Lactato e cloreto de potássio;</li>
  <li>Antibioticoterapia endovenosa de amplo espectro cobrindo Gram-negativos e anaeróbios entéricos (ex: Ceftriaxona + Metronidazol ou Ciprofloxacino + Metronidazol);</li>
  <li><strong>Metilprednisolona 60 mg/dia EV (1 mg/kg/dia)</strong>;</li>
  <li>Investigação obrigatória de toxina A/B e PCR para <em>C. difficile</em> nas fezes e realização de retossigmoidoscopia flexível cuidadosa sem preparo com biópsias para pesquisa de CMV por imuno-histoquímica (iniciar Ganciclovir se confirmado);</li>
  <li><strong>Janela Cirúrgica Crítica de 48 a 72 Horas:</strong> Se o paciente não apresentar melhora clínica e radiológica evidente em até 24 a 72 horas sob terapia médica intensiva, ou se houver sinais de piora (pneumoperitônio, choque séptico, peritonite franca), a conduta imediata é a <strong>COLECTOMIA TOTAL COM ILEOSTOMIA TERMINAL E SEPULTAMENTO DO COTO RETAL (Cirurgia de Hartmann modificada)</strong>. A colectomia aberta é salvadora de vidas e previne a perfuração catastrófica com peritonite fecal.</li>
</ul>

<h3>2. Estenoses, Fístulas e Abscessos na Doença de Crohn</h3>
<p>A inflamação transmural crônica na Doença de Crohn predispõe a dois padrões evolutivos mecânicos graves:</p>
<ul>
  <li><strong>Estenoses Fibroinflamatórias:</strong> Ocorrem no íleo terminal e nas anastomoses cirúrgicas prévias. O paciente manifesta-se com a <strong>Síndrome de König</strong>: dor em cólica pós-prandial na fossa ilíaca direita, ruídos hidroaéreos aumentados com timpanismo ("luta intestinal") que cessam subitamente após a emissão de fezes ou flatos aliviando a dor. Se a estenose for puramente inflamatória (realce e edema na entero-TC/entero-RM), responde à terapia biológica; se for fibrótica cicatrizada inelástica, exige dilatação endoscópica com balão ou tratamento cirúrgico (<strong>estrituroplastia / plastia de estenose</strong> ou ressecção econômica);</li>
  <li><strong>Abscessos Intra-Abdominais e Retroperitoneais:</strong> Resultam de microperfurações contidas de úlceras transmurais profundas, frequentemente envolvendo o músculo psoas direito ou espaços interalças. Apresentam-se com febre séptica, massa palpável dolorosa e limitação da extensão do membro inferior (sinal do psoas). <strong>Conduta Padrão: Drenagem percutânea guiada por TC/USG associada a antibióticos venosos</strong>. Corticoides e biológicos devem ser temporariamente suspensos até o controle do foco purulento;</li>
  <li><strong>Fístulas Internas e Externas:</strong> Podem ser enterocutâneas, enteroentéricas (curto-circuitos intestinais com diarreia e desnutrição), enterovesicais (pneumatúria, fecalúria e infecções urinárias de repetição) ou enterovaginais. Fístulas com drenagem simples podem responder a anti-TNF (Infliximabe); fístulas enterovesicais ou de alto débito exigem ressecção cirúrgica do segmento doente de Crohn com rafia simples do órgão secundário acometido.</li>
</ul>
`
  },
  {
    id: 'arsenal-terapeutico-e-cirurgico',
    title: '6. Terapêutica Medicamentosa Moderna, Terapias Biológicas, Pequenas Moléculas e Abordagem Cirúrgica',
    body_html: `
<p>O manejo contemporâneo das DIIs abandonou a estratégia reativa do passado (<em>step-up</em> lento aguardando falha clínica sequencial) e adotou a abordagem <strong>Treat-to-Target (STRIDE-II)</strong>, na qual o alvo terapêutico definitivo não é apenas a melhora dos sintomas, mas a <strong>remissão endoscópica e histológica profunda</strong> (cicatrização da mucosa e normalização da calprotectina fecal), prevenindo danos estruturais irreversíveis.</p>

<h3>Escalonamento Farmacológico e Classes de Medicamentos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Classe Farmacológica</th>
      <th>Fármacos Representativos e Posologia</th>
      <th>Indicação Clínica Precisa</th>
      <th>Efeitos Adversos e Monitorização Obrigatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Aminossalicilatos (5-ASA)</strong></td>
      <td><strong>Mesalazina</strong> (oral 2 a 4,8 g/dia; supositório retal 1 g/dia; enema retal 2 a 4 g/dia) e <strong>Sulfassalazina</strong> (2 a 4 g/dia com ácido fólico 1-2 mg/dia).</td>
      <td><strong>Padrão-ouro na indução e manutenção de remissão na Retocolite Ulcerativa leve a moderada</strong>. A via tópica retal (supositório) é o tratamento de escolha para proctite isolada. <strong>SEM eficácia comprovada na Doença de Crohn</strong>.</td>
      <td>Nefrotoxicidade intersticial rara (monitorar creatinina anual). Cefaleia, náuseas e intolerância gástrica (mais comuns com sulfassalazina devido à fração sulfapiridina).</td>
    </tr>
    <tr>
      <td><strong>Corticosteroides</strong></td>
      <td><strong>Prednisona oral</strong> (40-60 mg/dia); <strong>Budesonida oral</strong> (9 mg/dia de liberação ileal ou MMX colônica); <strong>Metilprednisolona / Hidrocortisona EV</strong> no surto grave hospitalar.</td>
      <td><strong>Estritamente reservados para INDUÇÃO rápida de remissão clínica nos surtos moderados a graves</strong>. <strong>NUNCA devem ser utilizados como terapia de manutenção</strong> pelo perfil deletério de efeitos adversos crônicos e ausência de cicatrização da mucosa.</td>
      <td>Osteoporose, síndrome de Cushing iatrogênica, osteonecrose asséptica da cabeça femoral, hiperglicemia descompensada, catarata, hipertensão e imunossupressão severa. Exigem desmame gradual após 8 a 12 semanas.</td>
    </tr>
    <tr>
      <td><strong>Imunomoduladores Convencionais</strong></td>
      <td><strong>Azatioprina</strong> (2,0 a 2,5 mg/kg/dia oral), <strong>6-Mercaptopurina</strong> (1,0 a 1,5 mg/kg/dia) e <strong>Metotrexato</strong> (15 a 25 mg/semana IM/SC com ácido fólico).</td>
      <td>Terapia de manutenção a longo prazo em pacientes corticodependentes ou em associação sinérgica a agentes anti-TNF (<em>comboterapia</em> para reduzir a formação de anticorpos antidroga). Início de ação lento (demoram 8 a 16 semanas para atingir eficácia).</td>
      <td>Mielossupressão (leucopenia, trombocitopenia), hepatotoxicidade e pancreatite aguda idiopática (ocorre em 3%-5% dos pacientes no primeiro mês de azatioprina). Risco aumentado de linfoma e câncer de pele não melanoma. Dosagem prévia de TPMT (tiopurina metiltransferase) orienta a segurança.</td>
    </tr>
    <tr>
      <td><strong>Biológicos Anti-TNF-alfa</strong></td>
      <td><strong>Infliximabe</strong> (anticorpo quimérico anti-TNF, 5 mg/kg EV nas semanas 0, 2, 6 e a cada 8 semanas) e <strong>Adalimumabe</strong> (anticorpo humano anti-TNF, indução com 160/80 mg SC seguido de 40 mg SC quinzenal).</td>
      <td>Indução e manutenção de remissão na Doença de Crohn moderada a grave, doença fistulizante perianal e Retocolite Ulcerativa moderada a grave refratária a 5-ASA e corticoides.</td>
      <td>Risco de reativação de <strong>Tuberculose Latente</strong> (obrigatório realizar radiografia de tórax e PPD/IGRA antes de iniciar) e Hepatite B. Risco de infecções fúngicas oportunistas e insuficiência cardíaca descompensada (contraindicado em IC classe funcional III/IV).</td>
    </tr>
    <tr>
      <td><strong>Anti-Integrina Seletiva Intestinal</strong></td>
      <td><strong>Vedolizumabe</strong> (anticorpo monoclonal anti-integrina alfa4-beta7, 300 mg EV nas semanas 0, 2, 6 e a cada 8 semanas).</td>
      <td>Bloqueia a interação da integrina alfa4-beta7 nos linfócitos T com a molécula MAdCAM-1 nas vênulas endoteliais intestinais, <strong>impedindo o tráfego seletivo de linfócitos inflamatórios para a lâmina própria do intestino</strong>. Excelente perfil de segurança com baixíssimo risco de infecções sistêmicas; fármaco de escolha para idosos.</td>
      <td>Cefaleia, artralgias leves. Não penetra a barreira hematoencefálica (sem risco de Leucoencefalopatia Multifocal Progressiva - LMP).</td>
    </tr>
    <tr>
      <td><strong>Inibidores de Interleucinas (Anti-IL-12/23 e Anti-IL-23)</strong></td>
      <td><strong>Ustequinumabe</strong> (anti-p40 IL-12/23); <strong>Risanquizumabe e Guselcumabe</strong> (anti-p19 IL-23 específico).</td>
      <td>Eficácia notável na Doença de Crohn e RCU refratárias a anti-TNF.</td>
      <td>Excelente perfil de tolerabilidade e retenção a longo prazo sem geração expressiva de imunogenicidade antidroga.</td>
    </tr>
    <tr>
      <td><strong>Pequenas Moléculas: Inibidores de JAK e Moduladores S1P</strong></td>
      <td><strong>Tofacitinibe</strong> (pan-JAK), <strong>Upadacitinibe</strong> (seletivo JAK-1 oral) e <strong>Ozanimode</strong> (modulador dos receptores S1P1/S1P5 oral).</td>
      <td>Aprovados para Retocolite Ulcerativa moderada a grave (Upadacitinibe e Ozanimode também na Doença de Crohn). Administração oral com início de ação ultrarrápido (dias).</td>
      <td>Risco de herpes zoster (obrigatório vacinação prévia com vacina recombinante), trombose venosa profunda e alterações lipídicas.</td>
    </tr>
  </tbody>
</table>

<h3>Tratamento Cirúrgico: Princípios Diametralmente Opostos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Princípio Cirúrgico</th>
      <th>Doença de Crohn (DC)</th>
      <th>Retocolite Ulcerativa (RCU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Objetivo e Potencial de Cura</strong></td>
      <td><strong>A CIRURGIA NÃO É CURATIVA</strong>. A doença pode recidivar em qualquer sítio do trato gastrointestinal remanescente (principalmente na neoileo-anastomose). O objetivo é estritamente tratar complicações mecânicas intratáveis (estenoses, fístulas, abscessos, perfuração).</td>
      <td><strong>A CIRURGIA É POTENCIALMENTE CURATIVA</strong> para as manifestações colônicas e risco neoplásico, uma vez que a doença fica restrita à mucosa do cólon e reto.</td>
    </tr>
    <tr>
      <td><strong>Extensão das Ressecções</strong></td>
      <td><strong>Cirurgia Estritamente Econômica e Poupadeira de Alça</strong>. Devem-se ressecar apenas os segmentos intestinais macroscopicamente comprometidos com margens cirúrgicas mínimas microscópicas (1 a 2 cm). Ressecções amplas levam à catastrófica <strong>Síndrome do Intestino Curto</strong>!</td>
      <td><strong>Ressecção Completa de todo o Cólon e Reto</strong> (Proctocolectomia Total). Manter coto retal residual na cirurgia definitiva perpetua a inflamação e o risco elevado de câncer.</td>
    </tr>
    <tr>
      <td><strong>Cirurgia Eletiva Padrão-Ouro</strong></td>
      <td>• Ressecção Ileocecal / Ileocolectomia Direita econômica com anastomose primária terminoterminal ou látero-lateral.<br>• <strong>Estrituroplastia (Plastia de Estenose de Heineke-Mikulicz ou Finney):</strong> Abertura longitudinal da estenose e sutura transversa sem ressecar o intestino delgado, preservando comprimento intestinal.</td>
      <td><strong>Proctocolectomia Total com Confecção de Bolsa Ileal em "J" e Anastomose Íleo-Anal (IPAA)</strong> associada a ileostomia de proteção temporária em 2 ou 3 tempos. Restaura a continência fecal sem estoma definitivo.</td>
    </tr>
    <tr>
      <td><strong>Bolsite (Complicação Tardia da Bolsa Ileal na RCU)</strong></td>
      <td>Bolsa ileal é <strong>FORMALMENTE CONTRAINDICADA na Doença de Crohn</strong> pelo risco extremo de perda da bolsa por fístulas e abscessos pélvicos graves.</td>
      <td>A <strong>Bolsite</strong> é a complicação inflamatória mais comum da bolsa ileal na RCU (50% dos operados). Cursa com aumento de evacuações, sangue e urgência. <strong>Tratamento de escolha: Antibioticoterapia oral com Ciprofloxacino (500 mg 12/12h) e/ou Metronidazol (500 mg 8/8h) por 14 dias</strong>.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas',
    title: '7. Casos Clínicos Desafiadores e Questões Comentadas de Alto Rendimento',
    body_html: `
<div class="case-study">
  <h4>Caso Clínico 1: Retocolite Ulcerativa Grave com Surto Hospitalar</h4>
  <p><strong>História:</strong> Mulher de 26 anos, previamente diagnosticada com retocolite ulcerativa há 3 anos em uso irregular de mesalazina oral, admitida na enfermaria com história de diarreia sanguinolenta volumosa (10 a 12 evacuações líquidas diárias com sangue e pus), tenesmo e dor abdominal há 10 dias. Há 48 horas evoluiu com febre diária (38,4°C), fraqueza acentuada e taquicardia.</p>
  <p><strong>Exame Admissional:</strong> REG, pálida ++/4+, desidratada. PA: 105x65 mmHg, FC: 114 bpm, temperatura axilar: 38,2°C. Abdome: difusamente doloroso à palpação profunda em cólon esquerdo, sem sinais de peritonite. Exames mostram: Hb: 8,4 g/dL, Leucócitos: 15.600/mm³, Plaquetas: 480.000/mm³, PCR: 78 mg/L, Albumina: 2,8 g/dL e Calprotectina Fecal: 1.850 mcg/g.</p>
  <p><strong>Classificação e Conduta Imediata:</strong>
  1. A paciente preenche critérios de <strong>Colite Aguda Grave de Truelove e Witts</strong> (&gt; 6 evacuações sanguinolentas/dia + febre + taquicardia &gt; 90 + anemia + PCR elevada).<br>
  2. Conduta hospitalar imediata: hidratação venosa, correção eletrolítica (potássio), profilaxia para trombose venosa profunda com enoxaparina profilática (pacientes com surto de DII têm risco trombótico quadruplicado!) e pesquisa de toxina de <em>C. difficile</em> nas fezes.<br>
  3. Início imediato de <strong>Corticoterapia Endovenosa com Metilprednisolona 60 mg/dia</strong> (ou Hidrocortisona 300 mg/dia) por via parenteral.<br>
  4. Realizada retossigmoidoscopia flexível à beira do leito sem preparo: presença de mucosa friável com ulcerações profundas; biópsias negativas para CMV.<br>
  5. <strong>Avaliação no 3º Dia (Critérios de Oxford):</strong> Se no 3º dia de corticoterapia a paciente mantiver &gt; 8 evacuações/dia OU PCR &gt; 45 mg/L com 3 a 8 evacuações/dia, a chance de falha do corticoide supera 85%. Indica-se imediatamente <strong>Terapia de Resgate com Infliximabe (5 mg/kg) ou Ciclosporina EV</strong>, ou colectomia de urgência se deterioração clínica.</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 1 (USP / Clínica Médica)</h4>
  <p>Homem de 29 anos apresenta quadro de dor abdominal em cólica há 6 meses, mais pronunciada em fossa ilíaca direita, associada a episódios de febre baixa vespertina, emagrecimento de 7 kg e diarreia sem sangue macroscópico evidente (4 a 5 evacuações pastosas/dia). Ao exame físico, nota-se massa palpável dolorosa na fossa ilíaca direita e presença de três orifícios fistulosos perianais com drenagem de secreção purulenta contínua e plicomas sentinelas arroxeadas exuberantes. Colonoscopia revela áreas de mucosa normal intercaladas por úlceras lineares profundas e serpiginosas no íleo terminal e cólon ascendente, com preservação total da mucosa retal. A biópsia de mucosa ileal evidenciou infiltrado inflamatório transmural e granulomas epitelioides não caseosos. Em relação a esse caso, assinale a afirmação correta:</p>
  <p>A) O diagnóstico definitivo é Retocolite Ulcerativa com ileíte de refluxo, sendo a mesalazina oral em altas doses o tratamento mais eficaz para fechamento das fístulas.<br>
  B) O tabagismo atua como protetor contra a progressão das fístulas neste paciente e não deve ser descontinuado abruptamente.<br>
  C) Trata-se de Doença de Crohn ileocólica fistulizante perianal; o tratamento de escolha para indução e cicatrização fístulo-mucosa envolve terapia biológica com agente anti-TNF associada ao manejo cirúrgico com drenagem de abscessos e passagem de sedenhos (fio de látex).<br>
  D) A proctocolectomia total com confecção de bolsa ileal em J e anastomose íleo-anal é o procedimento cirúrgico curativo de escolha imediata.<br>
  E) O perfil sorológico típico esperado para este caso clínico é p-ANCA positivo e ASCA negativo.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. O quadro é clássico de Doença de Crohn (acometimento ileocecal salteado, poupando reto, úlceras profundas, granulomas não caseosos e doença perianal complexa). O tratamento das fístulas perianais de Crohn exige controle de coleções purulentas com sedenho associado a biológico anti-TNF (Infliximabe/Adalimumabe). Não é RCU (elimina A). Tabagismo piora gravemente a doença de Crohn (elimina B). Bolsa ileal é formalmente contraindicada no Crohn pelo alto risco de perda da bolsa (elimina D). No Crohn, o perfil sorológico clássico é ASCA positivo e p-ANCA negativo (elimina E).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 2 (ENARE / Cirurgia Geral)</h4>
  <p>Um paciente de 34 anos com diagnóstico de longa data de pancolite por Retocolite Ulcerativa é admitido no CTI com piora clínica abrupta, apresentando dor abdominal difusa, taquicardia de 128 bpm, pressão arterial de 85x50 mmHg e febre de 38,9°C. A radiografia de abdome em decúbito dorsal demonstra diâmetro do cólon transverso medindo 7,2 cm, com ausência de padrão de haustrações normais. O paciente vinha em uso de loperamida e sulfato de morfina prescritos no dia anterior para cólica intestinal. Assinale a conduta terapêutica de urgência mais adequada:</p>
  <p>A) Realizar colonoscopia diagnóstica descompressiva com aspiração gasosa de urgência e passagem de tubo de drenagem transanal até o ceco.<br>
  B) Suspender imediatamente medicamentos antimotilidade/opioides, iniciar jejum absoluto, ressuscitação com cristaloides, antibioticoterapia de amplo espectro, corticoterapia endovenosa e indicar colectomia total de urgência caso não haja resposta satisfatória em 24 a 48 horas.<br>
  C) Iniciar mesalazina oral em dose de 4,8 g/dia associada a enema retal de budesonida como primeira escolha.<br>
  D) Proceder à estrituroplastia de emergência associada a enterectomia segmentar poupadora de cólon.<br>
  E) Prescrever sulfassalazina venosa e aguardar 7 a 10 dias para reavaliação tomográfica ambulatorial.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. O paciente apresenta megacólon tóxico (dilatação &gt; 5,5-6 cm + toxicidade sistêmica: febre, taquicardia, choque). A conduta clínica agressiva com suporte, descompressão, antibióticos e corticoide EV deve ser instituída, com indicação de colectomia total caso não responda rapidamente em 24-48 horas. A colonoscopia é formalmente contraindicada pelo risco extremo de perfuração colônica iatrogênica (elimina A). Mesalazina oral não tem papel no megacólon e atrasa o tratamento (elimina C). Estrituroplastia é técnica da Doença de Crohn, não da RCU (elimina D).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 3 (UNICAMP / Clínica Médica)</h4>
  <p>Sobre as manifestações extraintestinais (MEI) observadas na Doença de Crohn e na Retocolite Ulcerativa, assinale a alternativa que apresenta uma manifestação cujo curso clínico é tipicamente INDEPENDENTE da atividade inflamatória intestinal:</p>
  <p>A) Eritema nodoso.<br>
  B) Artrite periférica tipo 1 (pauciarticular de grandes articulações).<br>
  C) Episclerite ocular.<br>
  D) Espondilite anquilosante associada ao HLA-B27.<br>
  E) Aftose oral superficial.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa D</strong>. As manifestações axiais esqueléticas (espondilite anquilosante e sacroileíte simétrica associadas ao HLA-B27), a Colangite Esclerosante Primária (CEP) e o Pioderma Gangrenoso evoluem de forma INDEPENDENTE da atividade inflamatória do intestino, persistindo ativas mesmo após a indução de remissão clínica ou colectomia. Por outro lado, eritema nodoso, artrite periférica tipo 1 e episclerite acompanham em paralelo a atividade intestinal (surgem e regridem com os surtos da doença).</p>
</div>
`
  },
  {
    id: 'sintese-pratica-e-referencias',
    title: '8. Síntese Prática, Fluxograma de Conduta e Referências Bibliográficas',
    body_html: `
<div class="summary-box">
  <h4>Guia de Conduta Rápida nas Doenças Inflamatórias Intestinais</h4>
  <ul>
    <li><strong>Doença de Crohn:</strong> Boca ao ânus, lesões salteadas/descontínuas, transmural, preserva reto com frequência, granulomas não caseosos (patognomônicos), ASCA (+), doença perianal frequente, tabagismo piora. Cirurgia NÃO é curativa (ressecção econômica ou estrituroplastia).</li>
    <li><strong>Retocolite Ulcerativa:</strong> Restrita a cólon e reto, lesão contínua e ascendente desde o reto (sempre acometido), mucosa/submucosa, abscessos de cripta, p-ANCA (+), tabagismo "protetor" paradoxal. Cirurgia potencialmente curativa (Proctocolectomia total com bolsa ileal em J e anastomose íleo-anal).</li>
    <li><strong>Manifestações Extraintestinais Paralelas ao Surto:</strong> Eritema nodoso, artrite periférica tipo 1, episclerite. Tratam-se tratando o intestino.</li>
    <li><strong>Manifestações Extraintestinais Independentes:</strong> Espondilite anquilosante (HLA-B27), Pioderma gangrenoso, Colangite Esclerosante Primária (CEP - risco de colangiocarcinoma e câncer colorretal acelerado).</li>
    <li><strong>Megacólon Tóxico (RCU):</strong> Dilatação &gt; 5,5-6 cm do transverso + sepse/toxicidade sistêmica. Descompressão, ATB, corticoide EV. Não melhorou em 48-72h = Colectomia total de urgência com ileostomia terminal. Colonoscopia e opioides PROSCRITOS!</li>
    <li><strong>Tratamento Farmacológico:</strong> 5-ASA (mesalazina) para RCU leve/moderada (inclusive tópica retal); Corticoides para indução rápida (PROSCRITOS na manutenção); Imunomoduladores (azatioprina) para manutenção; Biológicos (anti-TNF, anti-integrina, anti-IL-23) e pequenas moléculas (JAKi, S1P) para moderada/grave refratária.</li>
  </ul>
</div>

<h3>Referências Bibliográficas Fundamentais</h3>
<ol>
  <li>Raine T, Bonovas S, Burisch J, et al. ECCO Guidelines on Therapeutics in Ulcerative Colitis: Medical Treatment. <em>J Crohns Colitis</em>. 2022;16(1):2-17.</li>
  <li>Torres J, Bonovas S, Doherty G, et al. ECCO Guidelines on Therapeutics in Crohn's Disease: Medical Treatment. <em>J Crohns Colitis</em>. 2020;14(1):4-22.</li>
  <li>Feuerstein JD, Ho EY, Shmidt E, et al. AGA Clinical Practice Guidelines on the Management of Moderate to Severe Ulcerative Colitis. <em>Gastroenterology</em>. 2020;158(5):1450-1461.</li>
  <li>Rubin DT, Ananthakrishnan AN, Siegel CA, Sauer BG, Long MD. ACG Clinical Guideline: Ulcerative Colitis in Adults. <em>Am J Gastroenterol</em>. 2019;114(3):384-413.</li>
  <li>Lichtenstein GR, Loftus EV, Isaacs KL, Regueiro MD, Gerson LB, Sands BE. ACG Clinical Guideline: Management of Crohn's Disease in Adults. <em>Am J Gastroenterol</em>. 2018;113(4):481-517.</li>
</ol>
`
  }
];

const finalSections = [
  baseSections[0],
  baseSections[1],
  secDiiExpansao3[0],
  baseSections[2],
  secDiiExpansao6[0],
  secDiiExpansao[0],
  secDiiExpansao5[0],
  baseSections[3],
  secDiiExpansao4[0],
  secDiiExpansao2[0],
  baseSections[4],
  secDiiExpansao[1],
  baseSections[5],
  secDiiExpansao4[1],
  secDiiExpansao[2],
  secDiiExpansao7[0],
  baseSections[6],
  secDiiExpansao2[1],
  secDiiExpansao3[1],
  baseSections[7]
];

const bookData = {
  slug,
  title: 'Doença Inflamatória Intestinal: Doença de Crohn e Retocolite Ulcerativa',
  subtitle: 'Fisiopatologia imunológica, manifestações extraintestinais, megacólon tóxico, terapias biológicas e abordagem cirúrgica comparada',
  area: 'Clínica Médica',
  materia: 'Gastroenterologia e Coloproctologia',
  sections: finalSections
};

saveBook(slug, bookData);

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const chars = countUsefulChars(html);
console.log(`[AULA 146 - SUCESSO] ${slug} compilado: ${chars} caracteres úteis.`);
