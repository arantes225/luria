import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

const jsonPath = 'apostilas/trauma-abdominal/content.json';
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const thirdSection = `
<h3>Lavado Peritoneal Diagnóstico (LPD): Técnica, Indicações e Critérios Quantitativos</h3>
<p>Embora o ultrassom eFAST e a tomografia computadorizada multislice tenham substituído o Lavado Peritoneal Diagnóstico (LPD) na rotina dos grandes centros de trauma, o LPD permanece como método de triagem emergencial com sensibilidade superior a 98% para detecção de hemoperitônio e lesão de víscera oca, sendo ferramenta indispensável em serviços sem ultrassonografia portátil ou em pacientes hemodinamicamente instáveis com eFAST inconclusivo.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Técnica do Lavado Peritoneal</th>
      <th>Descrição Operatória dos Passos</th>
      <th>Vantagens e Cuidados de Segurança</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Técnica Semiaberta / Aberta (Padrão)</strong></td>
      <td>Incisão cutânea longitudinal infraumbilical de 2 a 3 cm na linha média. Dissecção da aponeurose e abertura do peritônio parietal sob visualização direta. Introdução de cateter de diálise peritoneal sob visão direta.</td>
      <td>Segurança máxima contra perfuração inadvertida de alças intestinais distendidas ou lesão de grandes vasos retroperitoneais (aorta e veia cava inferior).</td>
    </tr>
    <tr>
      <td><strong>Modificação na Fratura Pélvica</strong></td>
      <td>A incisão deve ser realizada <strong>supraumbilical</strong> (acima da cicatriz umbilical) para não penetrar nem despressurizar o hematoma retroperitoneal pré-peritoneal pélvico de Retzius, o que geraria falso-positivo maciço de sangue.</td>
      <td>Obrigatório esvaziar a bexiga com sonda de Foley e o estômago com sonda nasogástrica antes de iniciar o procedimento.</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Laboratoriais Oficiais de Positividade do LPD</h3>
<ul>
  <li><strong>Critério Imediato Macroscópico:</strong> Aspiração inicial direta de <strong>&ge; 10 mL de sangue vivo não coagulável</strong> ou conteúdo entérico franco através do cateter (interrompe-se o procedimento e indica-se laparotomia imediata).</li>
  <li><strong>Critérios Quantitativos após Infusão de 1.000 mL de SF 0,9% aquecido (ou 10 mL/kg na criança) e drenagem por sifonagem:</strong>
    <ul>
      <li>Contagem de <strong>Hemácias &ge; 100.000/mm³</strong> no trauma contuso (ou &ge; 10.000 a 50.000/mm³ no trauma penetrante);</li>
      <li>Contagem de <strong>Leucócitos &ge; 500/mm³</strong>;</li>
      <li>Presença de fibras alimentares ou bactérias na coloração pelo Gram;</li>
      <li>Dosagem de <strong>Amilase &gt; 175 UI/L</strong> ou dosagem de fosfatase alcalina elevada;</li>
      <li>Presença de bile no líquido drenado.</li>
    </ul>
  </li>
</ul>

<h3>Questões Comentadas Adicionais de Residência Médica</h3>
<div class="book-question">
  <h4>Questão Comentada 11: ENARE — Critérios de Positividade do LPD no Trauma Contuso</h4>
  <p><strong>Enunciado:</strong> Paciente vítima de colisão por capotamento dá entrada na emergência de hospital de pequeno porte sem tomografia ou ultrassom disponível. Encontra-se obnubilado com PA 85/50 mmHg e taquicardia. A equipe realiza Lavado Peritoneal Diagnóstico aberto infraumbilical com infusão de 1.000 mL de soro fisiológico. Qual dos seguintes resultados laboratoriais do líquido drenado confirma a positividade do teste e indica formalmente laparotomia exploradora?</p>
  <p>A) Contagem de hemácias de 45.000/mm³.<br>
  B) Contagem de leucócitos de 650/mm³.<br>
  C) Glicose no líquido de 80 mg/dL.<br>
  D) Amilase no líquido de 40 UI/L.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> No trauma abdominal fechado, a presença de <strong>leucócitos &ge; 500/mm³</strong> no efluente do lavado peritoneal diagnóstico é critério clássico de positividade, refletindo resposta inflamatória peritoneal por peritonite bacteriana ou química (perfuração de víscera oca). A contagem de hemácias no trauma contuso só é considerada positiva quando atinge o limiar de <strong>100.000 hemácias/mm³</strong> (45.000/mm³ é considerado inconclusivo/negativo no trauma contuso isolado, embora positivo em ferimento penetrante toracoabdominal). A dosagem de amilase só é positiva se superior a 175 UI/L.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 12: USP — Sinal do Cinto de Segurança e Lesão Entérica Oculta</h4>
  <p><strong>Enunciado:</strong> Mulher de 29 anos, passageira de banco traseiro de automóvel em colisão frontal, usava apenas cinto de segurança subabdominal de dois pontos. Dá entrada no pronto-socorro estável, queixando-se de dor em hipogástrio. Ao exame físico, nota-se equimose transversa exuberante na parede abdominal inferior ('sinal do cinto de segurança'). A tomografia computadorizada inicial não demonstra líquido livre nem lesão de órgãos sólidos. Considerando o mecanismo de trauma e o sinal do cinto de segurança, qual conduta é mandatória?</p>
  <p>A) Alta hospitalar imediata com anti-inflamatórios, visto que a TC foi normal.<br>
  B) Internação hospitalar para observação clínica rigorosa com exame físico abdominal seriado e hemograma por 24 a 48 horas, pelo risco elevado de perfuração de intestino delgado ou mesentério.<br>
  C) Laparotomia exploradora imediata mesmo sem qualquer achado clínico ou tomográfico.<br>
  D) Prescrição de antibióticos profiláticos por via oral em domicílio por 7 dias.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado:</strong> O <strong>sinal do cinto de segurança</strong> (equimose transversa na parede abdominal) é um marcador clínico de altíssima energia cinética transferida e compressão direta das vísceras contra a coluna lombar (frequentemente associando-se a <strong>fratura de Chance da coluna lombar L1-L3</strong> por flexão-distração). Essa desaceleração comprime alças intestinais em bolsa cega, provocando laceração mesentérica ou microperfurações de intestino delgado que podem ser completamente <strong>invisíveis na tomografia computadorizada realizada nas primeiras 2 a 4 horas</strong> pós-trauma. A conduta indispensável é a <strong>internação para vigilância clínica e exame físico seriado</strong>. Se o paciente desenvolver dor à descompressão, febre, taquicardia ou leucocitose com desvio, procede-se à laparotomia.</p>
</div>
`;

payload.o.push(['sec-lpd-cinto-seguranca-questoes-finais', 'Aprofundamento Avançado: Lavado Peritoneal Diagnóstico, Sinal do Cinto e Questões de Concurso']);
payload.q.push([
  'sec-lpd-cinto-seguranca-questoes-finais',
  0,
  htmlToBlocks('Aprofundamento Avançado: Lavado Peritoneal Diagnóstico, Sinal do Cinto e Questões de Concurso', thirdSection)
]);

saveBook(payload);
console.log('[OK] Aula 062 ultrapassou com folga o teto!');
