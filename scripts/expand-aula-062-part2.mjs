import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

const jsonPath = 'apostilas/trauma-abdominal/content.json';
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const secondExtraSection = `
<h3>Trauma de Estômago, Mesentério e Lesões por Desaceleração Rápida</h3>
<p>O estômago é um órgão altamente complacente, protegido pelo gradil costal inferior esquerdo e lobo esquerdo do fígado. Suas lesões ocorrem habitualmente em traumas penetrantes (ferimentos por arma branca e projéteis de arma de fogo) ou em traumas contusos de alta energia quando o estômago encontra-se repleto após refeição copiosa (rotura gástrica por aumento abrupto da pressão hidrostática intragástrica):</p>
<ul>
  <li><strong>Rotura Gástrica Contusa:</strong> Ocorre mais frequentemente na parede anterior ou na curvatura maior. Provoca peritonite química precoce violenta devido à acidez do suco gástrico, evoluindo rapidamente com peritonite bacteriana maciça. A radiografia de tórax e abdome em ortostase evidencia pneumoperitônio volumoso sob as cúpulas diafragmáticas.</li>
  <li><strong>Técnica de Reparo Gástrico:</strong> A exploração cirúrgica do estômago exige a abertura ampla do ligamento gastrocolórico para penetrar na retrocavidade dos epíploons (pequeno saco peritoneal) e inspecionar meticulosamente 100% da <strong>parede posterior gástrica</strong>, local frequente de lesões penetrantes despercebidas. O desbridamento das bordas desvitalizadas deve ser generoso (a rica vascularização gástrica sangra profusamente se as bordas não forem hemostasiadas) e o fechamento é realizado com sutura primária em dois planos (plano mucoso hemostático com fio absorvível e plano seromuscular invaginante tipo Lembert com fio inabsorvível ou absorvível sintético).</li>
  <li><strong>Lesões de Mesentério e Hematomas Mesentéricos:</strong> Lacerações lineares da borda mesentérica podem comprometer os arcos anastomóticos marginais de Riolan e Drummond. Hematomas mesentéricos em expansão devem ser cuidadosamente abertos e explorados para ligadura seletiva de vasos sangrantes, avaliando-se a viabilidade da alça intestinal correspondente (coloração rósea, pulsação arterial palpável na borda mesentérica e peristaltismo ativo). Na dúvida quanto à viabilidade após aquecimento com compressas mornas por 15 minutos, indica-se a ressecção segmentar da alça isquêmica.</li>
</ul>

<h3>Balística das Feridas Abdominais por Projétil de Arma de Fogo: Cavitação e Zona de Injúria</h3>
<p>O dano tecidual ocasionado por projéteis de arma de fogo (PAF) obedece aos princípios da física balística terminal. A energia cinética total transferida ao organismo é regida pela fórmula:</p>
<p>$$\text{EC} = \frac{1}{2} m v^2$$</p>
<p>em que a velocidade ($v$) é o fator de maior impacto geométrico. Projéteis de alta velocidade (fuzis militares com velocidade &gt; 600 a 1.000 m/s) geram dois fenômenos lesivos distintos:</p>
<ol>
  <li><strong>Cavidade Permanente:</strong> É o trajeto anatômico físico percorrido pelo projétil, resultante da laceração e esmagamento mecânico direto dos tecidos e órgãos transpassados.</li>
  <li><strong>Cavidade Temporária:</strong> É o estiramento radial violento e explosivo das estruturas adjacentes decorrente da transmissão lateral de ondas de choque de alta pressão. Essa cavitação temporária atinge diâmetros de até 15 a 30 vezes o calibre do projétil, provocando necrose celular isquêmica e rotura de órgãos sólidos (fígado e baço) situados a vários centímetros de distância do trajeto real da bala. Por essa razão, ferimentos por fuzil no abdome exigem desbridamento tecidual ampliado, pois as bordas das alças intestinais aparentemente íntegras encontram-se frequentemente desvitalizadas por trombose microvascular secundária à onda de choque.</li>
</ol>

<h3>Bateria de Questões Comentadas: Raciocínio Clínico e Distratores</h3>
<div class="book-question">
  <h4>Questão Comentada 8: ENARE 2025 / Cirurgia do Trauma — Conduta em Evisceração Abdominal</h4>
  <p><strong>Enunciado:</strong> Homem de 25 anos é admitido no setor de emergência após ser golpeado com faca no mesogástrio durante tentativa de assalto há 30 minutos. Ao exame físico inicial: consciente, orientado, PA 115/75 mmHg, FC 88 bpm, FR 18 irpm. À inspeção do abdome, observa-se protrusão de cerca de 30 cm de alça de intestino delgado e grande porção de omento maior através da ferida da parede abdominal anterior (evisceração franca). Não há sangramento ativo vultoso exteriorizando-se. Qual a conduta imediata na sala de emergência e a conduta cirúrgica definitiva?</p>
  <p>A) Tentar reintroduzir imediatamente a alça eviscerada na cavidade peritoneal na sala de emergência e suturar a pele sob anestesia local.<br>
  B) Cobrir as vísceras evisceradas com compressas estéreis embebidas em soro fisiológico morno e encaminhar o paciente imediatamente para laparotomia exploradora no centro cirúrgico.<br>
  C) Realizar tomografia computadorizada de abdome com contraste venoso antes de qualquer procedimento operatório.<br>
  D) Puncionar a alça com agulha fina para reduzir a distensão gasosa e aplicar curativo compressivo seco.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A <strong>evisceração no trauma abdominal penetrante é indicação absoluta de Laparotomia Exploradora Imediata</strong> no centro cirúrgico, independentemente dos sinais vitais do paciente. Na sala de emergência, é <strong>estritamente proibido tentar reintroduzir as alças intestinais</strong> para dentro da cavidade peritoneal (Alternativa A incorreta), pois as vísceras expostas estão contaminadas pelo meio externo e sua recolocação cega introduz infecção maciça e pode agravar lesões de mesentério ou causar estrangulamento da alça no defeito da parede. A conduta correta consiste em proteger e cobrir os órgãos exteriorizados com <strong>compressas estéreis umedecidas em solução salina isotônica morna</strong> (prevenindo dessecação, necrose isquêmica das alças e hipotermia) e transportar o paciente diretamente ao centro cirúrgico para incisão mediana padrão (a incisão não deve ser feita ampliando a ferida original contaminada).</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 9: UNICAMP — Manejo das Lesões Pancreáticas no Trauma</h4>
  <p><strong>Enunciado:</strong> Paciente de 27 anos sofre colisão automobilística frontal com impacto contra o volante. Após 24 horas de observação, apresenta elevação de amilase sérica para 850 U/L e dor epigástrica contínua. A colangiopancreatografia por ressonância magnética (CPRM) revela transecção completa do corpo do pâncreas à esquerda dos vasos mesentéricos com rotura do ducto de Wirsung (Trauma Pancreático Grau III da AAST). O paciente encontra-se hemodinamicamente estável. Qual a conduta cirúrgica indicada?</p>
  <p>A) Tratamento exclusivamente conservador com octreotida subcutânea e jejum oral prolongado.<br>
  B) Pancreatectomia distal com esplenectomia (ou preservação esplênica) e drenagem tubular fechada.<br>
  C) Duodenopancreatectomia cefálica de urgência (Cirurgia de Whipple).<br>
  D) Papilotomia endoscópica com colocação de prótese biliar no ducto colédoco.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A chave para a decisão terapêutica no trauma pancreático é a <strong>integridade do Ducto Pancreático Principal (Ducto de Wirsung)</strong>. Lesões que transpassam o ducto principal distalmente aos vasos mesentéricos (corpo ou cauda do pâncreas - Grau III) não cicatrizam adequadamente com tratamento conservador, evoluindo com fístula pancreática de alto débito, abscesso retroperitoneal e sepse grave. A conduta padrão é a <strong>Pancreatectomia Distal</strong> (ressecção do parênquima pancreático à esquerda da lesão com rafia/ligadura do coto proximal do Wirsung com pontos inabsorvíveis ou sutura mecânica), associada a ampla drenagem tubular fechada de sucção por contra-abertura. A preservação do baço é tentada em pacientes estáveis, mas a esplenectomia concomitante é frequentemente necessária se houver envolvimento dos vasos esplênicos.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 10: ENARE — Manobra de Kocher e Exposição Duodenal</h4>
  <p><strong>Enunciado:</strong> Cirurgião opera vítima de ferimento por arma branca no hipocôndrio direito. Durante a laparotomia, observa hematoma na face posterior do duodeno e cabeça pancreática. Qual a manobra cirúrgica que consiste na incisão do peritônio parietal lateral à borda direita do duodeno, permitindo sua ampla rotação medial para expor a face posterior da segunda e terceira porções duodenais e a veia cava inferior retroperitoneal?</p>
  <p>A) Manobra de Pringle.<br>
  B) Manobra de Kocher.<br>
  C) Manobra de Mattox.<br>
  D) Manobra de Cattell-Braasch.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> A <strong>Manobra de Kocher</strong> é o procedimento cirúrgico clássico de derrotação e mobilização da alça duodenal em C. Ao incidir a reflexão peritoneal na borda convexa lateral da segunda porção duodenal (fáscia de Treitz retro-duodeno-pancreática), o cirurgião consegue rebater o duodeno e a cabeça do pâncreas medialmente para a esquerda, inspecionando diretamente toda a parede posterior da 1ª, 2ª e início da 3ª porções duodenais, a face posterior da cabeça pancreática e o segmento infrarrenal da veia cava inferior.</p>
</div>
`;

payload.o.push(['sec-estomago-balistica-bateria-questoes', 'Aprofundamento Avançado: Trauma Gástrico, Balística Forense e Bateria Completa de Questões']);
payload.q.push([
  'sec-estomago-balistica-bateria-questoes',
  0,
  htmlToBlocks('Aprofundamento Avançado: Trauma Gástrico, Balística Forense e Bateria Completa de Questões', secondExtraSection)
]);

saveBook(payload);
console.log('[OK] Aula 062 reforçada para >62k!');
