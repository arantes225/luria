// scripts/expand-aula-160-script.mjs
import fs from 'fs';
import { countUsefulChars, saveBook } from './bloco-07-utils.mjs';

const p = 'apostilas/abordagem-do-tabagismo-alcool-e-outras-drogas/content.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

// Section 5 expansion: Fagerström, AUDIT, CAGE
const extSec5 = `
<div class="clinical-focus-box">
<h3>Detalhamento dos Instrumentos de Rastreio e Estratificação (Fagerström, AUDIT e CAGE)</h3>

<h4>1. Escala de Fagerström para Dependência de Nicotina (FTND)</h4>
<p>O teste de Fagerström é o instrumento padrão-ouro recomendado pelo Ministério da Saúde e pelo Instituto Nacional de Câncer (INCA) para avaliar a intensidade da dependência física da nicotina. É composto por 6 perguntas estruturadas:</p>
<table class="book-table">
  <thead>
    <tr><th>Pergunta</th><th>Opções de Resposta</th><th>Pontuação</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Quanto tempo após acordar você fuma o primeiro cigarro?</strong> (Marcador cardinal de dependência neurofisiológica)</td>
      <td>Dentro de 5 minutos<br>Entre 6 e 30 minutos<br>Entre 31 e 60 minutos<br>Após 60 minutos</td>
      <td>3 pontos<br>2 pontos<br>1 ponto<br>0 pontos</td>
    </tr>
    <tr>
      <td><strong>2. Você acha difícil não fumar em locais proibidos (como hospitais, igrejas, transportes)?</strong></td>
      <td>Sim<br>Não</td>
      <td>1 ponto<br>0 pontos</td>
    </tr>
    <tr>
      <td><strong>3. Qual cigarro do dia traz mais satisfação e é o mais difícil de abandonar?</strong></td>
      <td>O primeiro da manhã<br>Qualquer outro</td>
      <td>1 ponto<br>0 pontos</td>
    </tr>
    <tr>
      <td><strong>4. Quantos cigarros você fuma por dia?</strong></td>
      <td>10 ou menos<br>11 a 20<br>21 a 30<br>31 ou mais</td>
      <td>0 pontos<br>1 ponto<br>2 pontos<br>3 pontos</td>
    </tr>
    <tr>
      <td><strong>5. Você fuma mais frequentemente nas primeiras horas da manhã do que no resto do dia?</strong></td>
      <td>Sim<br>Não</td>
      <td>1 ponto<br>0 pontos</td>
    </tr>
    <tr>
      <td><strong>6. Você fuma mesmo quando está doente e de cama a maior parte do dia?</strong></td>
      <td>Sim<br>Não</td>
      <td>1 ponto<br>0 pontos</td>
    </tr>
  </tbody>
</table>
<p><strong>Interpretação e Conduta Clínica Estratificada:</strong></p>
<ul>
  <li><strong>0 a 2 pontos (Dependência Muito Baixa):</strong> Abordagem cognitivo-comportamental isolada pode ser suficiente; farmacoterapia geralmente não necessária, salvo forte desconforto subjetivo na tentativa de cessação.</li>
  <li><strong>3 a 4 pontos (Dependência Baixa):</strong> Aconselhamento estruturado; TRN pode ser considerada se houver relato prévio de sintomas intensos de abstinência.</li>
  <li><strong>5 pontos (Dependência Média):</strong> Indicação formal de intervenção comportamental combinada com farmacoterapia (TRN em monoterapia ou bupropiona).</li>
  <li><strong>6 a 7 pontos (Dependência Elevada):</strong> Indicação absoluta de farmacoterapia associada; alta probabilidade de benefício com associação de formas de TRN (adesivo transdérmico contínuo + forma rápida oral).</li>
  <li><strong>8 a 10 pontos (Dependência Muito Elevada):</strong> Necessidade mandatória de terapia combinada intensiva (adesivo transdérmico de dose plena 21 mg + goma/pastilha de resgate sob demanda e/ou bupropiona), monitoramento estrito de fissura e suporte multidisciplinar intensivo.</li>
</ul>

<h4>2. Questionário AUDIT (Alcohol Use Disorders Identification Test - OMS)</h4>
<p>Desenvolvido pela OMS e validado internacionalmente, o AUDIT avalia consumo recente, sintomas de dependência e problemas decorrentes do uso nos últimos 12 meses. Suas 10 perguntas dividem-se em 3 domínios essenciais:</p>
<table class="book-table">
  <thead>
    <tr><th>Domínio</th><th>Itens Avaliados</th><th>Interpretação</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Consumo perigoso de álcool (Itens 1 a 3)</strong></td>
      <td>1. Frequência do consumo (nunca a 4+ vezes/semana)<br>2. Quantidade de doses típicas em um dia de consumo<br>3. Frequência de consumo episódico pesado (binge: 6+ doses em uma ocasião)</td>
      <td>Mede o volume e a velocidade do padrão de ingestão etílica; essencial para rastreio rápido (versão resumida AUDIT-C, pontuação de 0 a 12).</td>
    </tr>
    <tr>
      <td><strong>Sintomas de dependência (Itens 4 a 6)</strong></td>
      <td>4. Dificuldade de parar de beber após começar<br>5. Falha em cumprir compromissos habituais por causa da bebida<br>6. Necessidade de beber pela manhã em jejum para se recuperar da bebedeira anterior (alívio de abstinência matinal)</td>
      <td>Avalia a perda do controle sobre o ato de beber e o surgimento de neuroadaptação física com tolerância e dependência biológica.</td>
    </tr>
    <tr>
      <td><strong>Uso nocivo de álcool (Itens 7 a 10)</strong></td>
      <td>7. Sentimento de culpa ou remorso após beber<br>8. Incapacidade de lembrar do que aconteceu na noite anterior (amnésia alcoólica / blackout)<br>9. Ferimento próprio ou de terceiros decorrente do ato de beber<br>10. Parente, amigo ou profissional de saúde expressou preocupação ou sugeriu diminuir</td>
      <td>Avalia prejuízos psicossociais, orgânicos e interpessoais diretos gerados pelo padrão de consumo de etanol.</td>
    </tr>
  </tbody>
</table>
<p><strong>Pontuação Total do AUDIT (0 a 40 pontos) e Zonas de Risco da Atenção Básica:</strong></p>
<ul>
  <li><strong>Zona I (0 a 7 pontos) - Baixo Risco:</strong> Educação em saúde, reforço positivo de padrões seguros ou abstinência voluntária.</li>
  <li><strong>Zona II (8 a 15 pontos) - Uso de Risco:</strong> Aconselhamento breve em saúde, conscientização sobre doses-padrão e riscos cumulativos de morbimortalidade.</li>
  <li><strong>Zona III (16 a 19 pontos) - Uso Nocivo:</strong> Intervenção breve estruturada (estilo FRAMES), aconselhamento continuado e monitoramento laboratorial (gama-GT, VCM, transaminases).</li>
  <li><strong>Zona IV (20 a 40 pontos) - Provável Dependência Alcoólica:</strong> Avaliação diagnóstica completa, plano de cuidado compartilhado entre eMulti/NASF e CAPS-AD, investigação de complicações clínicas e prevenção/manejo de abstinência.</li>
</ul>

<h4>3. Questionário CAGE (Rastreio Rápido de Suspeita de Dependência)</h4>
<p>Acrônimo mnemônico consagrado na prática ambulatorial e hospitalar geral devido à agilidade e alta sensibilidade para detecção de problemas relacionados ao álcool:</p>
<ul>
  <li><strong>C - Cut down (Reduzir):</strong> Alguma vez você sentiu que deveria diminuir a quantidade de bebida ou parar de beber?</li>
  <li><strong>A - Annoyed (Irritado/Criticado):</strong> As pessoas o(a) aborrecem ou irritam criticando o seu modo de beber?</li>
  <li><strong>G - Guilty (Culpado):</strong> Você já se sentiu culpado(a) ou chateado(a) consigo mesmo(a) pela maneira como bebe?</li>
  <li><strong>E - Eye-opener (Abrir os olhos / Manhã):</strong> Você já precisou de uma bebida pela manhã para aquietar os nervos ou se livrar de uma ressaca/tremedeira?</li>
</ul>
<p><em>Interpretação prática:</em> A resposta afirmativa a <strong>duas ou mais perguntas</strong> indica alta probabilidade de transtorno por uso de álcool (sensibilidade e especificidade superior a 80-85%), demandando aprofundamento imediato com o AUDIT completo e avaliação multiprofissional.</p>
</div>`;

// Section 8 expansion: Farmacoterapia de 1a linha do tabagismo
const extSec8 = `
<div class="clinical-focus-box">
<h3>Diretrizes Práticas de Prescrição Farmacológica de 1ª Linha no Tabagismo</h3>

<h4>1. Terapia de Reposição de Nicotina (TRN)</h4>
<p>A TRN atua fornecendo nicotina farmacológica sem os milhares de compostos tóxicos e cancerígenos da combustão do tabaco. O pico sérico é atingido de forma muito mais lenta e suave do que a inalação do cigarro, desacoplando o reforço dopaminérgico agudo e suprimindo os sintomas de abstinência física (irritabilidade, cefaleia, ansiedade, fissura).</p>
<ul>
  <li><strong>Adesivo Transdérmico (Liberação Lenta / Basal Contínua de 24 horas):</strong>
    <ul>
      <li><em>Apresentações:</em> 21 mg/dia, 14 mg/dia e 7 mg/dia.</li>
      <li><em>Posologia para fumantes de 20 ou mais cigarros/dia ou FTND &gt;= 5:</em> Iniciar com 21 mg/dia por 4 semanas; progredir para 14 mg/dia por 2 a 4 semanas; e 7 mg/dia por 2 semanas (total de 8 a 10 semanas).</li>
      <li><em>Posologia para fumantes de 10 a 19 cigarros/dia:</em> Iniciar com 14 mg/dia por 4 semanas; progredir para 7 mg/dia por 4 semanas.</li>
      <li><em>Instruções ao paciente:</em> Aplicar pela manhã em pele limpa, seca e sem pelos (braço, tórax ou dorso), alternando o sítio de aplicação diariamente para evitar dermatite de contato. Se causar insônia intensa ou pesadelos nítidos, retirar o adesivo ao deitar ou optar por uso durante 16 horas.</li>
    </ul>
  </li>
  <li><strong>Goma e Pastilha de Nicotina (Formas Orais de Ação Rápida / Resgate de Fissura):</strong>
    <ul>
      <li><em>Apresentações:</em> 2 mg (para fumantes que demoram mais de 30 minutos para acender o primeiro cigarro) e 4 mg (para fumantes que acendem o primeiro cigarro nos primeiros 30 minutos).</li>
      <li><em>Técnica de mastigação mandatória da goma:</em> Mastigar lentamente até sentir um sabor picante ou formigamento; estacionar a goma entre a bochecha e a gengiva para absorção transmucosa; quando o sabor diminuir, mastigar novamente algumas vezes e estacionar do outro lado. <strong>Não engolir a saliva rapidamente</strong>, pois a nicotina deglutida sofre intenso metabolismo de primeira passagem e causa azia, soluço e epigastralgia. Evitar alimentos e bebidas ácidas (café, refrigerantes, sucos cítricos) 15 minutos antes e durante o uso.</li>
    </ul>
  </li>
  <li><strong>Estratégia Combinada (Associação Padrão-Ouro):</strong> Adesivo transdérmico contínuo associado a formas orais rápidas (goma ou pastilha) de resgate sempre que houver fissura aguda. Apresenta eficácia superior à monoterapia isolada e é recomendada para pacientes com dependência alta ou falha terapêutica prévia.</li>
</ul>

<h4>2. Cloridrato de Bupropiona</h4>
<p>Antidepressivo atípico que inibe a recaptação de dopamina e noradrenalina e atua como antagonista não competitivo de receptores nicotínicos centrais. Reduz significativamente a fissura, os sintomas de abstinência e o ganho de peso pós-cessação tabágica.</p>
<ul>
  <li><strong>Posologia Estruturada:</strong>
    <ul>
      <li>Dias 1 a 3: 150 mg pela manhã em jejum ou com desjejum.</li>
      <li>Dia 4 em diante: 150 mg pela manhã e 150 mg à tarde (com intervalo mínimo de 8 horas entre as tomadas para evitar picos plasmáticos convulsogênicos; evitar tomar próximo à hora de dormir para mitigar insônia). Dose máxima: 300 mg/dia.</li>
      <li><em>Definição do 'Dia D':</em> O paciente inicia o medicamento ainda fumando, fixando o 'Dia D' de parada total entre o 8º e o 14º dia de tratamento, quando a concentração sérica atinge o estado de equilíbrio. A duração habitual é de 8 a 12 semanas.</li>
    </ul>
  </li>
  <li><strong>Contraindicações Absolutas:</strong> Histórico de epilepsia ou convulsões, traumatismo cranioencefálico prévio grave, diagnóstico atual ou prévio de transtornos alimentares (anorexia nervosa ou bulimia), uso concomitante de inibidores da MAO nos últimos 14 dias ou abstinência aguda de álcool/sedativos (devido ao risco dramático de precipitar crises convulsivas).</li>
</ul>

<h4>3. Vareniclina e Citisina (Agonistas Parciais Nicotínicos alfa-4-beta-2)</h4>
<p>A vareniclina atua ligando-se seletivamente aos receptores colinérgicos nicotínicos neuronais alfa-4-beta-2 com atividade agonista parcial: estimula a liberação moderada de dopamina no núcleo accumbens (aliviando a abstinência e a fissura) e, simultaneamente, atua como antagonista competitivo, impedindo que a nicotina inalada do cigarro produza reforço de prazer caso o indivíduo venha a fumar.</p>
<ul>
  <li><em>Eficácia clínica:</em> Demonstrou índices de cessação superiores à bupropiona e à monoterapia com TRN em múltiplos ensaios clínicos randomizados.</li>
  <li><em>Esquema posológico habitual:</em> Dias 1 a 3: 0,5 mg uma vez ao dia; Dias 4 a 7: 0,5 mg duas vezes ao dia; Dia 8 até 12 semanas: 1,0 mg duas vezes ao dia. O paciente fixa a data de parada do fumo entre o 8º e o 14º dia. Principal efeito adverso é náusea transitória (aliviada ingerindo com alimentos e água plena) e sonhos anormais.</li>
</ul>
</div>`;

// Section 11 expansion: Manejo da SAA com CIWA-Ar e Benzodiazepínicos
const extSec11 = `
<div class="clinical-focus-box">
<h3>Protocolo de Avaliação da Síndrome de Abstinência Alcoólica (SAA) e Escala CIWA-Ar</h3>

<h4>1. Fisiopatologia da Hiperexcitabilidade Central</h4>
<p>O álcool é um modulador alostérico positivo dos receptores GABA-A inibitórios e um antagonista dos receptores NMDA glutamatérgicos excitatórios. Com o consumo crônico pesado, ocorre neuroadaptação: os receptores GABA sofrem internalização e perda de sensibilidade, enquanto os receptores NMDA são hiperexpressos (up-regulation). Quando o álcool é retirado de modo abrupto, o freio inibitório desaparece e a neurotransmissão glutamatérgica desinibida desencadeia uma tempestade autonômica e hiperexcitabilidade cortical maciça.</p>

<h4>2. Escala CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol, Revised)</h4>
<p>A escala CIWA-Ar é o instrumento validado padrão-ouro para monitoramento objetivo da gravidade da abstinência alcoólica à beira do leito. Avalia 10 parâmetros clínicos:</p>
<table class="book-table">
  <thead>
    <tr><th>Item Avaliado</th><th>Faixa de Pontuação</th><th>Critérios Clínicos</th></tr>
  </thead>
  <tbody>
    <tr><td>1. Náuseas e Vômitos</td><td>0 a 7 pontos</td><td>0 = Ausente; 4 = Náuseas intermitentes com ânsia; 7 = Vômitos incoercíveis e constantes.</td></tr>
    <tr><td>2. Tremor</td><td>0 a 7 pontos</td><td>0 = Sem tremor; 1 = Apenas perceptível às pontas dos dedos; 4 = Moderado com braços estendidos; 7 = Grave, mesmo sem estender braços.</td></tr>
    <tr><td>3. Sudorese Paroxística</td><td>0 a 7 pontos</td><td>0 = Sem sudorese; 1 = Palmas úmidas; 4 = Gotas na testa; 7 = Sudorese profusa encharcando roupas.</td></tr>
    <tr><td>4. Ansiedade</td><td>0 a 7 pontos</td><td>0 = Sem ansiedade; 1 = Levemente apreensivo; 4 = Agitação moderada; 7 = Pânico agudo equivalente a terror.</td></tr>
    <tr><td>5. Agitação Psicomotora</td><td>0 a 7 pontos</td><td>0 = Normal; 1 = Ligeiramente inquieto; 4 = Incapaz de permanecer sentado; 7 = Agitação violenta e desordenada.</td></tr>
    <tr><td>6. Distúrbios Táteis</td><td>0 a 7 pontos</td><td>0 = Nenhum; 1 = Formigamento leve; 4 = Sensação de calor ou picada moderada; 7 = Alucinações táteis contínuas (insetos sob a pele).</td></tr>
    <tr><td>7. Distúrbios Auditivos</td><td>0 a 7 pontos</td><td>0 = Nenhum; 1 = Hiperacusia leve; 4 = Vozes ou sons assustadores intermitentes; 7 = Alucinações auditivas vívidas e contínuas.</td></tr>
    <tr><td>8. Distúrbios Visuais</td><td>0 a 7 pontos</td><td>0 = Nenhum; 1 = Fotofobia leve; 4 = Sombras e ilusões visuais; 7 = Alucinações visuais complexas e contínuas.</td></tr>
    <tr><td>9. Cefaleia / Sensação de Cabeça Cheia</td><td>0 a 7 pontos</td><td>0 = Ausente; 1 = Muito leve; 4 = Moderadamente intensa; 7 = Extremamente intensa e pulsátil.</td></tr>
    <tr><td>10. Orientação e Turvação da Consciência</td><td>0 a 4 pontos</td><td>0 = Orientado no tempo e espaço; 1 = Dúvida quanto à data; 2 = Desorientado no tempo; 3 = Desorientado no espaço; 4 = Completamente desorientado quanto à pessoa e realidade.</td></tr>
  </tbody>
</table>

<h4>3. Estratificação de Risco e Conduta Terapêutica Dirigida por Sintomas (Symptom-Triggered Therapy)</h4>
<ul>
  <li><strong>CIWA-Ar &lt; 10 (Abstinência Leve):</strong>
    <ul>
      <li>Pode ser manejada em ambiente ambulatorial de APS/CAPS se o paciente tiver suporte familiar confiável e ausência de comorbidades clínicas graves.</li>
      <li>Conduta: Ambiente calmo, hidratação oral vigorosa, reposição nutricional com <strong>Tiamina (Vitamina B1) 100 mg a 300 mg/dia por via oral ou parenteral</strong> ANTES de qualquer oferta de soluções glicosadas para evitar a precipitação de Encefalopatia de Wernicke. Não requer benzodiazepínicos de rotina se pontuação se mantiver estável &lt; 10.</li>
    </ul>
  </li>
  <li><strong>CIWA-Ar entre 10 e 18 (Abstinência Moderada):</strong>
    <ul>
      <li>Necessidade de terapia farmacológica ativa com benzodiazepínicos e observação clínica contínua em serviço de pronto atendimento ou unidade de observação.</li>
      <li>Protocolo direcionado por sintomas: <strong>Diazepam 10 mg a 20 mg VO</strong> a cada 1 a 2 horas enquanto CIWA-Ar &gt;= 10, com reavaliação seriada horária. Alternativa de ação intermediária: <strong>Lorazepam 2 mg a 4 mg VO/SL/EV</strong> (obrigatório se insuficiência hepática, cirrose descompensada ou idade muito avançada, pois não sofre metabolismo oxidativo hepático nem acúmulo de metabólitos ativos).</li>
    </ul>
  </li>
  <li><strong>CIWA-Ar &gt; 18 ou Sinais de Gravidade (Abstinência Grave / Delirium Tremens):</strong>
    <ul>
      <li>Indicação mandatória de internação hospitalar imediata em ambiente monitorado / leito intensivo.</li>
      <li>Quadro de <em>Delirium Tremens (DT)</em>: Surge tipicamente entre 48 e 96 horas após o último gole, caracterizado por rebaixamento flutuante da consciência, alucinações visuais e táteis zoológicas (zoopsias), agitação psicomotora violenta e hiperatividade autonômica extrema (taquicardia &gt; 120 bpm, febre, sudorese, hipertensão). Mortalidade histórica de até 20% se não tratado.</li>
      <li><em>Manejo agressivo:</em> Benzodiazepínicos intravenosos em doses tituladas rápidas (Diazepam 10 a 20 mg EV a cada 10-15 minutos até sedação leve e controle da agitação autonômica; doses totais podem ultrapassar 100-200 mg nas primeiras 24 horas sob monitorização contínua de via aérea e oximetria). Correção de distúrbios eletrolíticos (hipomagnesemia, hipocalemia, hipofosfatemia) e <strong>Tiamina em altas doses endovenosas (500 mg EV 3x/dia por 3 a 5 dias)</strong>.</li>
    </ul>
  </li>
</ul>
</div>`;

d.sections[5].body_html += '\n\n' + extSec5;
d.sections[8].body_html += '\n\n' + extSec8;
d.sections[11].body_html += '\n\n' + extSec11;

saveBook('abordagem-do-tabagismo-alcool-e-outras-drogas', d);

let total = 0;
d.sections.forEach(s => total += countUsefulChars(s.body_html || ''));
console.log('Expanded Aula 160 total useful chars:', total);
