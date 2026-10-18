import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'coledocolitiase-e-colangite';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const secId = 'dreno-de-kehr-complicacoes-e-cuidados-pos-operatorios';
const secTitle = 'Cuidados Pós-Operatórios Especializados: Drenagem Biliar Externa com Tubo em T (Kehr) e Complicações';

const secHtml = `
<h3>O Dreno de Kehr (Tubo em T): Princípios Mecânicos, Racional e Manejo</h3>
<p>O dreno de Kehr (tubo em T de látex ou silicone macio) é o dispositivo cirúrgico de descompressão biliar externa temporária mais tradicionalmente empregado após uma coledocotomia aberta ou laparoscópica. A sua introdução na via biliar principal tem duas finalidades capitais: descomprimir o sistema ductal de alta pressão e moldar a coledocorrafia, ao mesmo tempo em que previne fístulas biliares e estenoses cicatriciais secundárias ao espasmo inflamatório do esfíncter de Oddi no pós-operatório imediato.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Vigilância</th>
      <th>Padrão Fisiológico Esperado</th>
      <th>Sinais de Alerta / Conduta Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Débito Biliar Diário nas Primeiras 24-48h</strong></td>
      <td><strong>300 a 500 mL/dia</strong> de bile dourada/esverdeada translúcida.</td>
      <td>Débito superior a 1.000 mL/dia sugere obstrução mecânica distal não resolvida (cálculo residual na papila de Vater ou edema de esfíncter de Oddi) forçando o desvio de quase toda a produção hepática de bile para o meio externo.</td>
    </tr>
    <tr>
      <td><strong>Evolução do Volume a partir do 3º-5º DPO</strong></td>
      <td>Redução progressiva para <strong>&lt; 200 mL/dia</strong> à medida que o edema da ampola regride e a bile volta a fluir para o duodeno.</td>
      <td>Parada súbita do débito biliar com dor abdominal e distensão sugere acotovelamento, obstrução do lúmen do tubo por grumos biliares ou deslocamento acidental do dreno de Kehr para a cavidade peritoneal livre.</td>
    </tr>
    <tr>
      <td><strong>Colangiografia pelo Dreno de Kehr</strong></td>
      <td>Realizada rotineiramente entre o <strong>7º e 10º dia pós-operatório</strong> com contraste iodado hidrossolúvel sob fluoroscopia.</td>
      <td>Avalia a perviedade da via biliar distal, a passagem livre e desimpedida do meio de contraste para o duodeno e a <strong>ausência categórica de cálculos residuais retidos</strong> ou extravasamentos pericoledocianos.</td>
    </tr>
    <tr>
      <td><strong>Teste de Oclusão / Fechamento do Dreno</strong></td>
      <td>Se a colangiografia pelo dreno for normal, o tubo é clampeado e mantido fechado por 24 a 48 horas consecutivas.</td>
      <td>O paciente deve permanecer completamente assintomático. O surgimento de dor epigástrica, icterícia, febre ou extravasamento peri-tubo durante o clampeamento indica hipertensão biliar residual, exigindo reabertura imediata do dreno.</td>
    </tr>
    <tr>
      <td><strong>Momento Exato da Retirada Segura do Dreno</strong></td>
      <td><strong>NUNCA ANTES DE 14 A 21 DIAS (2 a 3 semanas)</strong> da intervenção cirúrgica inicial.</td>
      <td>A tração precoce do tubo em T antes de 14 dias rompe o trajeto imaturo, causando extravasamento maciço de bile para o peritônio com peritonite biliar química grave (coleperitônio), choque e necessidade de reoperação de urgência.</td>
    </tr>
  </tbody>
</table>

<h3>Abordagem do Cálculo Residual do Colédoco Pós-Cirurgia</h3>
<p>Cerca de 2% a 5% dos pacientes submetidos à exploração cirúrgica do colédoco podem apresentar cálculos residuais esquecidos ou retidos. A conduta depende diretamente da presença do dreno de Kehr:</p>
<ul>
  <li><strong>Paciente com Dreno de Kehr in situ:</strong> Se a colangiografia do 7º-10º dia revelar um cálculo residual, o dreno é mantido em drenagem livre até completar <strong>pelo menos 6 a 8 semanas</strong> da cirurgia. Após esse intervalo, o trajeto fistuloso peritoneal em torno do tubo encontra-se espesso, fibroso e maduro. O cirurgião retira o tubo em T e introduz uma alça de cesta de Dormia ou coledocoscópio flexível através do próprio trajeto percutâneo amadurecido sob radioscopia, realizando a <em>extração percutânea trans-fistulosa de Burhenne</em> com taxa de sucesso superior a 95% sem necessidade de reoperação;</li>
  <li><strong>Paciente sem Dreno ou Falha da Abordagem Trans-Kehr:</strong> O método padrão-ouro de resgate é a <strong>Colangiopancreatografia Retrógrada Endoscópica (CPRE)</strong> com papilotomia e extração do cálculo por balão extrator ou litotripsia mecânica intraductal.</li>
</ul>
`;

// Inserir antes de referencias
payload.o = payload.o.filter(item => item[0] !== secId && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== secId && item[0] !== 'referencias');

payload.o.push([secId, secTitle]);
payload.q.push([secId, 0, htmlToBlocks(secTitle, secHtml)]);

payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.giejournal.org/article/S0016-5107(18)33170-0/fulltext" target="_blank" rel="noopener noreferrer">ASGE / SAGES — Guidelines on the Role of Endoscopy in Choledocholithiasis</a>',
        '<a href="https://onlinelibrary.wiley.com/doi/10.1002/jhbp.512" target="_blank" rel="noopener noreferrer">Tokyo Guidelines 2018 (TG18/TG20) — Acute Cholangitis</a>',
        '<a href="https://cbc.org.br/" target="_blank" rel="noopener noreferrer">Colégio Brasileiro de Cirurgiões (CBC)</a>',
        '<a href="https://www.esge.com/guidelines/" target="_blank" rel="noopener noreferrer">European Society of Gastrointestinal Endoscopy (ESGE)</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 092 reforçada e salva com sucesso!');
