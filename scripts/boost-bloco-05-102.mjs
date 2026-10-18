import fs from 'fs';
import { htmlToBlocks, saveBook, countUsefulChars } from './bloco-04-utils.mjs';

const jsonPath = 'apostilas/obstrucao-intestinal/content.json';
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const extraSecId = 'obstrucao-em-situacoes-especiais-e-recidivas';
const extraSecTitle = 'Obstrução Intestinal em Populações Especiais: Síndrome de Ogilvie, Gestação e Carcinomatose Peritoneal';
const extraSecHtml = `
<h3>1. Síndrome de Ogilvie (Pseudo-obstrução Colônica Aguda)</h3>
<p>A <strong>Síndrome de Ogilvie</strong> (ou pseudo-obstrução colônica aguda) é uma condição clínica caracterizada por dilatação maciça e progressiva do cólon (especialmente ceco e cólon ascendente) <strong>na AUSÊNCIA de qualquer barreira mecânica intraluminal ou extrínseca anatômica</strong>. Ocorre predominantemente em pacientes hospitalizados graves, idosos acamados, politraumatizados, pós-operatórios de cirurgias ortopédicas de grande porte (artroplastia de quadril), cirurgias cardiovasculares, neurológicas ou pacientes sob ventilação mecânica em UTI.</p>

<p><strong>Fisiopatologia e Mecanismo:</strong> Desbalanço agudo na inervação autonômica do cólon com predomínio de hiperatividade simpática inibitória e/ou supressão parassimpática sacral (S2-S4), levando a atonia cólica severa com acúmulo massivo de gases e fezes.</p>

<p><strong>Manejo Clínico Escalonado:</strong></p>
<ol>
  <li><strong>Tratamento Conservador Inicial (24 a 48 horas):</strong> Dieta zero, descompressão nasogástrica, sonda retal descompressiva, correção rigorosa de eletrólitos (potássio e magnésio) e suspensão mandatória de fármacos constipantes (opioides, anticolinérgicos e bloqueadores de canais de cálcio);</li>
  <li><strong>Avaliação do Risco de Perfuração Cecal:</strong> A radiografia simples e a tomografia computadorizada monitoram o diâmetro cecal. Se o diâmetro cecal atingir <strong>$\ge 12$ cm</strong> (ou persistir $&gt; 10$ cm por mais de 48h sem resposta ao suporte), o risco de isquemia transmural e perfuração do ceco por hiperdistensão (Lei de Laplace) dispara vertiginosamente;</li>
  <li><strong>Tratamento Farmacológico com Neostigmina:</strong> Droga parassimpaticomimética inibidora reversível da acetilcolinesterase. Administra-se <strong>Neostigmina 2,0 a 2,5 mg em infusão intravenosa lenta por 3 a 5 minutos</strong>, obrigatoriamente sob monitorização eletrocardiográfica contínua e com <strong>ampola de Atropina à beira do leito</strong> (devido ao risco de bradicardia severa e broncoespasmo). A taxa de resposta e descompressão rápida é de 85% a 90%;</li>
  <li><strong>Colonoscopia Descompressiva:</strong> Indicada se contraindicação à neostigmina (bradiarritmias não controladas, broncoespasmo severo) ou falha após duas doses;</li>
  <li><strong>Intervenção Cirúrgica de Emergência (Cecostomia ou Colectomia Subtotal):</strong> Reservada para sinais de peritonite, pneumoperitônio ou necrose cecal.</li>
</ol>

<h3>2. Obstrução Intestinal na Gestação</h3>
<p>Embora rara, a obstrução intestinal na gestante associa-se a alta mortalidade materna e fetal quando o diagnóstico é retardado. As bridas pós-operatórias prévias respondem por mais de 60% dos casos, precipitadas pelo deslocamento cefálico das alças intestinais provocado pelo crescimento do útero gravídico (especialmente no 3º trimestre e no pós-parto imediato quando o útero involui abruptamente). O volvo de sigmoide e de ceco são a segunda causa. A <strong>Ressonância Magnética</strong> é o exame de escolha sem radiação ionizante, mas a Tomografia Computadorizada de abdome NÃO deve ser protelada se houver suspeita de estrangulamento em alça fechada.</p>
`;

payload.o.push([extraSecId, extraSecTitle]);
payload.q.push([extraSecId, 0, htmlToBlocks(extraSecTitle, extraSecHtml)]);

saveBook(payload);
const res = countUsefulChars('obstrucao-intestinal');
console.log('Obstrução intestinal atualizada -> úteis:', res.count);
