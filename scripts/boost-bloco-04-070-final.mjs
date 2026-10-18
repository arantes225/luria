import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'vigilancia-ambiental-e-saude-do-trabalhador';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const secExtraId = 'principais-armadilhas-e-pontos-chave-enamed-trabalhador';
const secExtraTitle = 'Pontos-Chave e Síntese de Alto Rendimento para o ENAMED e Residências';
const secExtraHtml = `
<h3>Os Dez Mandamentos da Saúde do Trabalhador e Vigilância Ambiental</h3>
<ul>
  <li><strong>1. Competência Constitucional Indiscutível:</strong> O Artigo 200, II da Constituição Federal e a Lei 8.080/90 atribuem ao <strong>SUS a competência executiva direta das ações de saúde do trabalhador</strong>, desmistificando a ideia errônea de que o tema pertence exclusivamente ao Ministério do Trabalho ou à Previdência.</li>
  <li><strong>2. Classificação de Richard Schilling:</strong>
    <ul>
      <li><em>Grupo I (Causa Necessária):</em> Silicose, asbestose, saturnismo, benzenismo (sem o trabalho a doença NÃO existe).</li>
      <li><em>Grupo II (Fator Contributivo / Concausa):</em> Infarto do miocárdio, hipertensão arterial, síndrome de burnout, varizes de membros inferiores (etiologia multicausal agravada pelo trabalho).</li>
      <li><em>Grupo III (Agravador / Desencadeador de Latente):</em> Asma ocupacional em atópico prévio, dermatite de contato em pedreiro (doença de base exacerbada pela exposição ocupacional).</li>
    </ul>
  </li>
  <li><strong>3. Silicose Pulmonar:</strong> Poeira de sílica livre cristalina (quartzo/mineração/pedreiras). Nódulos fibróticos concentrados nos <strong>LOBOS SUPERIORES</strong> com calcificação de linfonodos hilares em <strong>"Casca de Ovo" (Eggshell)</strong>. Principal complicação letal associada: <strong>Silicotuberculose (risco até 30 vezes maior de TB ativa)</strong>. Jateamento de areia a seco é proibido no Brasil!</li>
  <li><strong>4. Asbestose e Amianto:</strong> Fibras de asbesto (construção civil/telhas). Fibrose intersticial nos <strong>LOBOS INFERIORES</strong> com presença marcante de <strong>placas pleurais fibrohialinas calcificadas</strong> e corpúsculos de asbesto. Complicação oncológica clássica: <strong>Mesotelioma Maligno de Pleura e Peritônio</strong> (latência de 30-50 anos, independente de asbestose prévia). O amianto está <strong>definitivamente banido no Brasil pelo STF (ADI 4066)</strong>.</li>
  <li><strong>5. Perda Auditiva Induzida por Ruído (PAIR):</strong> Ruído &gt; 85 dB(A). Perda auditiva <strong>sensório-neural, bilateral, simétrica e irreversível</strong>, com o clássico <strong>entalhe audiométrico (gota acústica) em 3.000, 4.000 ou 6.000 Hz</strong> e recuperação em 8.000 Hz. Cessada a exposição ao ruído, <strong>A PERDA NÃO PROGRIDE</strong>!</li>
  <li><strong>6. LER/DORT:</strong> Doenças osteomusculares por sobrecarga biomecânica e ergonômica (NR-17). Síndrome do Túnel do Carpo = compressão do nervo mediano (Tinel e Phalen positivos); Tenossinovite de De Quervain = abdutor longo e extensor curto do polegar (Manobra de Finkelstein positiva).</li>
  <li><strong>7. Toxicologia Ocupacional:</strong>
    <ul>
      <li><em>Saturnismo (Chumbo):</em> Cólica abdominal, anemia com <strong>pontilhado basófilo grosseiro</strong>, linha gengival de Burton e <strong>mão caída</strong> por paralisia do nervo radial. Tratar com DMSA / EDTA.</li>
      <li><em>Benzenismo:</em> Mielotoxicidade com pancitopenia/aplasia medular e risco de <strong>Leucemia Mieloide Aguda (LMA)</strong>.</li>
      <li><em>Agrotóxicos Inibidores da Colinesterase (Organofosforados/Carbamatos):</em> Síndrome colinérgica aguda (DUMBELS). Tratar imediatamente com <strong>ATROPINA venosa titulada até o clareamento dos estertores pulmonares</strong>; Pralidoxima indicada apenas nos organofosforados.</li>
    </ul>
  </li>
  <li><strong>8. Comunicação de Acidente de Trabalho (CAT):</strong> Emissão obrigatória pelo empregador até o <strong>1º dia útil seguinte</strong> (ou imediatamente em caso de morte). <strong>OBRIGATÓRIA HAVENDO OU NÃO AFASTAMENTO DO TRABALHO!</strong> Em caso de recusa da empresa, o médico assistente, trabalhador ou sindicato têm legitimidade legal para emiti-la.</li>
  <li><strong>9. Estabilidade Provisória e Benefício B91:</strong> O trabalhador afastado por mais de 15 dias com benefício acidentário B91 tem estabilidade mínima de <strong>12 meses no emprego</strong> após o retorno à atividade (Art. 118 da Lei 8.213/91).</li>
  <li><strong>10. VIGIAMB (Portaria GM/MS 888/2021):</strong> O VIGIAGUA exige ausência total de <em>E. coli</em> em 100 mL de água tratada e manutenção de <strong>Cloro Residual Livre entre 0,2 e 2,0 mg/L</strong> em toda a rede de distribuição pública para assegurar a potabilidade bacteriológica contínua.</li>
</ul>
`;

payload.o = payload.o.filter(item => item[0] !== secExtraId && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== secExtraId && item[0] !== 'referencias');

payload.o.push([secExtraId, secExtraTitle]);
payload.q.push([secExtraId, 0, htmlToBlocks(secExtraTitle, secExtraHtml)]);

payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-trabalhador" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Constituição Federal de 1988 — Artigo 200 (Competências do SUS)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8080.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.080/1990 — Lei Orgânica da Saúde</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.213/1991 — Planos de Benefícios da Previdência Social e Acidentes de Trabalho</a>',
        '<a href="https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Protocolos de Vigilância em Saúde Ambiental (VIGIAMB / VIGIAGUA)</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 070 finalizada com sucesso acima da meta!');
