import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

const jsonPath = 'apostilas/trauma-abdominal/content.json';
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const extraSection = `
<h3>Trauma Vascular Abdominal Maior: Lesões de Veia Cava, Aorta e Vasos Mesentéricos</h3>
<p>As lesões vasculares abdominais maiores constituem o ápice da gravidade no trauma abdominal, associando-se a taxas de mortalidade imediata superiores a 50% a 80%. A abordagem cirúrgica exige conhecimento refinado das manobras de exposição anatômica retroperitoneal profunda:</p>
<ul>
  <li><strong>Manobra de Mattox (Rotação Medial das Vísceras Esquerdas):</strong> Realizada através da incisão da goteira parietocólica esquerda ao longo da linha de Toldt, desde a flexura esplênica até a fossa ilíaca esquerda, mobilizando medialmente em bloco o cólon descendente, o baço, a cauda do pâncreas e o rim esquerdo. Essa manobra expõe com ampla clareza toda a extensão da <strong>aorta abdominal infradiafragmática</strong>, a emergência do tronco celíaco, artéria mesentérica superior, artéria renal esquerda e vasos ilíacos esquerdos. É a manobra mandatória no choque exsanguinante por hematoma central de Zona 1 supramesocólico.</li>
  <li><strong>Manobra de Cattell-Braasch (Rotação Medial das Vísceras Direitas):</strong> Realizada pela mobilização medial ampla do ceco, cólon ascendente e flexura hepática, associada à manobra de Kocher estendida no duodeno-pâncreas e incisão do ligamento peritoneal ao longo da raiz do mesentério até o ângulo de Treitz. Expõe completamente a <strong>veia cava inferior infrarrenal e suprarrenal</strong>, a bifurcação aórtica, os vasos ilíacos direitos e a terceira e quarta porções duodenais.</li>
  <li><strong>Controle de Danos Vasculares:</strong> No paciente com acidose, hipotermia e coagulopatia, o cirurgião não deve tentar pontes vasculares ou enxertos protéticos complexos. As lesões venosas menores são tratadas com ligadura simples (incluindo a veia ilíaca interna, ramos mesentéricos ou mesmo a veia renal esquerda, cuja drenagem colateral é garantida pelas veias gonadal e adrenal esquerdas). Lesões arteriais maiores em pacientes chocados são tratadas com <strong>Shunts Vasculares Provisórios Intraluminais</strong> (tubos de tórax finos ou cateteres de polietileno fixados com torniquetes de Rumel), mantendo o fluxo distal durante a ressuscitação na UTI antes do reparo definitivo.</li>
</ul>

<h3>Sepse Fulminante Pós-Esplenectomia (OPSI): Mecanismo, Vacinação e Profilaxia</h3>
<p>O baço é o maior órgão linfoide secundário do corpo humano, exercendo funções imunológicas insubstituíveis: fagocitose de bactérias opsonizadas na polpa vermelha através de macrófagos especializados, produção de anticorpos da classe IgM na zona marginal, síntese de opsoninas específicas (tuftsina e properdina) que ativam a via alternativa do complemento e função de 'pitting' (remoção de corpúsculos intraeritrocitários como os corpúsculos de Howell-Jolly e corpos de Heinz sem destruir a hemácia).</p>
<p>A perda anatômica do baço por esplenectomia pós-trauma expõe o indivíduo a um risco vitalício permanente de <strong>Sepse Fulminante Pós-Esplenectomia (Overwhelming Post-Splenectomy Infection - OPSI)</strong>, caracterizada por início súbito com sintomas gripais inespecíficos que evoluem em menos de 12 a 24 horas para choque séptico refratário, púrpura fulminante, coagulação intravascular disseminada (CIVD) e óbito em mais de 50% dos casos. O principal patógeno responsável é o <strong><em>Streptococcus pneumoniae</em> (Pneumococo - responsável por mais de 60% a 70% dos episódios)</strong>, seguido por <em>Neisseria meningitidis</em> (Meningococo) e <em>Haemophilus influenzae</em> tipo b (Hib).</p>
<p>O protocolo de imunização obrigatório pós-esplenectomia no Brasil inclui:</p>
<ol>
  <li><strong>Vacina Pneumocócica Conjugada (VPC13 ou VPC15)</strong> seguida pela <strong>Vacina Pneumocócica Polissacarídica 23-valente (VPP23)</strong> após 8 semanas, com reforço da VPP23 após 5 anos;</li>
  <li><strong>Vacina Meningocócica Conjugada ACWY</strong> em duas doses com intervalo de 8 semanas, com reforço a cada 5 anos, associada à <strong>Vacina Meningocócica B recombinante</strong> (duas doses com intervalo de 1 a 2 meses);</li>
  <li><strong>Vacina contra Haemophilus influenzae tipo b (Hib)</strong> em dose única;</li>
  <li><strong>Vacinação anual contra Influenza</strong> (pois infecções respiratórias virais predispõem à invasão bacteriana secundária pneumocócica grave).</li>
</ol>
<p><em>Momento Ideal da Vacinação:</em> No trauma agudo, a resposta humoral imediata pós-cirúrgica é intensamente suprimida pelo estresse metabólico. As vacinas devem ser aplicadas preferencialmente no <strong>14º dia pós-operatório</strong> (ou antes da alta hospitalar se houver risco de perda de seguimento ambulatorial).</p>

<h3>Bateria Expandida de Questões Comentadas com Análise de Todas as Alternativas</h3>
<div class="book-question">
  <h4>Questão Comentada 5: USP / FMUSP — Trauma Toracoabdominal e Hérnia Diafragmática</h4>
  <p><strong>Enunciado:</strong> Homem de 34 anos foi vítima de agressão por arma branca há 4 horas, sofrendo ferimento penetrante de 2 cm no 6º espaço intercostal esquerdo na linha axilar anterior. Ao exame na sala de emergência: estável, corado, PA: 120/80 mmHg, FC: 76 bpm, FR: 16 irpm, abdome indolor e sem sinais de peritonite. A radiografia de tórax e abdome inicial é laudada como rigorosamente normal. Qual a conduta mandatória preconizada para esse paciente?</p>
  <p>A) Suturar a ferida da pele e conceder alta hospitalar com orientação de retorno se houver febre ou dor.<br>
  B) Indicar Videolaparoscopia (ou Videotoracoscopia) diagnóstica para avaliação direta da integridade da cúpula diafragmática esquerda.<br>
  C) Realizar lavado peritoneal diagnóstico (LPD); se hematimetria &lt; 100.000/mm³, afasta-se qualquer lesão.<br>
  D) Solicitar trânsito esofagogastroduodenal contrastado imediato com bário para pesquisar extravasamento.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Todo ferimento penetrante na <strong>região toracoabdominal</strong> (especialmente à esquerda, entre o 4º EIC anterior e o rebordo costal) tem risco de 15% a 30% de <strong>lesão diafragmática oculta</strong>. Devido ao gradiente pressórico fisiológico pleuroperitoneal (pressão pleural negativa versus pressão peritoneal positiva), pequenas lacerações no diafragma não cicatrizam espontaneamente e evoluem silenciosamente ao longo de meses ou anos para <strong>hérnia diafragmática tardia com estrangulamento de vísceras ocas</strong>. A radiografia de tórax e o lavado peritoneal têm baixa sensibilidade (&lt; 50%) para lesões diafragmáticas pequenas sem herniação aguda. O padrão-ouro obrigatório é a <strong>Videolaparoscopia (VATS ou VLC)</strong> para visualização direta do hemidiafragma esquerdo e sutura primária da lesão se diagnosticada.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 6: UNICAMP — Síndrome Compartimental Abdominal e Técnica de Mensuração</h4>
  <p><strong>Enunciado:</strong> Paciente vítima de trauma abdominal contuso grave com hematoma retroperitoneal em expansão e lesão hepática grau IV encontra-se internado no CTI sob ventilação mecânica após cirurgia de controle de danos. O residente suspeita de Hipertensão Intra-Abdominal (HIA). Qual a técnica padronizada pela WSACS para aferição fidedigna da pressão intra-abdominal e qual o valor que define Síndrome Compartimental Abdominal?</p>
  <p>A) Mensuração da pressão venosa central (PVC); definida quando PVC &gt; 18 cmH2O.<br>
  B) Mensuração intravesical através de sonda de Foley acoplada a transdutor de pressão com infusão de 25 mL de soro estéril na bexiga; definida quando PIA sustentada &gt; 20 mmHg associada a nova disfunção orgânica.<br>
  C) Mensuração da pressão intragástrica através de sonda de Salem com infusão de 200 mL de água; definida quando PIA &gt; 12 mmHg.<br>
  D) Palpação clínica bimanual do tônus da parede abdominal; definida quando houver abdome em tábua generalizado.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> Segundo o consenso internacional da World Society of the Abdominal Compartment Syndrome (WSACS), o padrão-ouro clínico e reprodutível para aferição da PIA é a <strong>mensuração da pressão intravesical com transdutor em linha zerado na linha axilar média na altura da sínfise púbica, infundindo-se volume máximo de 25 mL de soro fisiológico</strong> estéril na bexiga com o paciente em decúbito dorsal horizontal estrito. A Hipertensão Intra-Abdominal (HIA) define-se por PIA &ge; 12 mmHg sustentada. A <strong>Síndrome Compartimental Abdominal (SCA)</strong> exige obrigatoriamente <strong>PIA &gt; 20 mmHg sustentada associada a uma nova disfunção orgânica</strong> (queda de débito urinário, hipercapnia/hipoxemia com aumento das pressões de via aérea ou instabilidade hemodinâmica).</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 7: ENARE — Manobra de Mattox e Acesso à Aorta Supramesocólica</h4>
  <p><strong>Enunciado:</strong> Vítima de ferimento por arma de fogo no epigástrio chega à sala de trauma em choque descompensado com distensão abdominal maciça. Na laparotomia mediana imediata, o cirurgião observa grande hematoma expansivo na Zona 1 retroperitoneal supramesocólica com sangramento arterial ativo incontrolável atrás do pâncreas. Qual manobra cirúrgica de rotação visceral deve ser prontamente executada para expor a aorta abdominal infradiafragmática e a artéria mesentérica superior?</p>
  <p>A) Manobra de Kocher estendida.<br>
  B) Manobra de Pringle com clampeamento hepatoduodenal.<br>
  C) Manobra de Mattox (rotação medial das vísceras esquerdas).<br>
  D) Manobra de Cattell-Braasch (rotação medial das vísceras direitas).</p>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A <strong>Manobra de Mattox (mobilização medial visceral esquerda em bloco)</strong> consiste na incisão do peritônio parietal lateral ao cólon descendente estendendo-se cranialmente em torno do baço, permitindo rebater o cólon esquerdo, baço, cauda e corpo do pâncreas e rim esquerdo medialmente em direção à linha média. Essa rotação expõe amplamente toda a aorta abdominal suprarrenal e infrarrenal, tronco celíaco e raiz da artéria mesentérica superior. A manobra de Kocher (A) expõe apenas a face posterior do duodeno e cabeça pancreática. A manobra de Cattell-Braasch (D) roda as vísceras direitas e expõe a veia cava inferior e vasos mesentéricos inferiores.</p>
</div>
`;

payload.o.push(['sec-aprofundamento-vascular-opsi-questoes', 'Aprofundamento Avançado: Trauma Vascular Maior, Síndrome OPSI e Bateria de Questões Comentadas']);
payload.q.push([
  'sec-aprofundamento-vascular-opsi-questoes',
  0,
  htmlToBlocks('Aprofundamento Avançado: Trauma Vascular Maior, Síndrome OPSI e Bateria de Questões Comentadas', extraSection)
]);

saveBook(payload);
console.log('[OK] Aula 062 expandida com sucesso!');
