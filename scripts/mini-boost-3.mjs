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
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.conitec.gov.br" target="_blank" rel="noopener noreferrer">CONITEC - Recomendações e Diretrizes Nacionais</a>',
          '<a href="https://www.sbp.com.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pediatria (SBP) / Colégio Brasileiro de Cirurgiões (CBC)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// 1. Trauma Torácico (+3k)
const mini057 = `
<h3>Algoritmo Prático de Decisão: Drenagem Pleural Fechada e Cuidados com o Selo d'Água</h3>
<p>O sistema de drenagem pleural em selo d'água clássico opera segundo princípios físicos hidrostáticos simples e fundamentais para a manutenção da pressão intrapleural negativa e expansão pulmonar plena:</p>
<ul>
  <li><strong>Posicionamento Anatômico Seguro (Triângulo de Segurança):</strong> Delimitado anteriormente pela borda lateral do músculo peitoral maior, posteriormente pela borda anterior do músculo grande dorsal, inferiormente pela linha horizontal que passa no nível do 5º espaço intercostal (altura do mamilo no homem ou sulco inframamário na mulher) e superiormente pelo ápice da axila. A introdução do dreno tubular nesse triângulo evita lesões iatrogênicas do fígado (à direita), baço (à esquerda), coração e grandes vasos mediastinais.</li>
  <li><strong>Técnica de Fixação e Curativo:</strong> O dreno de tórax deve ser fixado firmemente à pele com ponto em 'U' ou bailarina com fio inabsorvível resistente (náilon ou seda 2-0). Deve-se confeccionar previamente o ponto de fechamento ('ponto de bolsa' ou 'ponto em U de guarda'), mantido frouxo durante o período de permanência do dreno e atado imediatamente após sua tração na retirada, prevenindo entrada de ar atmosférico.</li>
  <li><strong>Cuidados de Enfermagem e Manejo do Frasco:</strong> O frasco coletor deve ser mantido permanentemente em nível inferior ao tórax do paciente (pelo menos 40 a 50 cm abaixo do leito) para impedir o refluxo de líquido drenado para a cavidade pleural. O tubo de vidro imerso na solução líquida estéril (habitualmente 300 a 500 mL de água destilada ou SF 0,9%) deve permanecer submerso a exatamente 2 cm abaixo do nível da água. Oscilação da coluna líquida com os movimentos respiratórios confirma a permeabilidade do dreno e ausência de obstrução por coágulos.</li>
</ul>
`;

// 2. Diarreia Aguda (+4.5k)
const mini058 = `
<h3>Diagnóstico Diferencial e Condutas Específicas em Diarreias Infecciosas Especiais</h3>
<p>Determinados agentes infecciosos e contextos clínicos exigem alto índice de suspeição e abordagem direcionada na infância:</p>
<ul>
  <li><strong>Cólera (Vibrio cholerae O1 e O139):</strong> Caracterizada por diarreia aquosa secretora ultrarrápida e indolor com aspecto clássico de 'água de arroz' e odor característico de peixe cru. Pode provocar desidratação grave e choque hipovolêmico em menos de 4 a 6 horas em crianças pequenas. O pilar terapêutico absoluto é a reposição hídrica agressiva imediata. A antibioticoterapia está formalmente recomendada pela OMS nos casos graves para reduzir o volume e a duração das perdas e diminuir a transmissão comunitária: <strong>Azitromicina em dose única oral (20 mg/kg, máximo de 1 g)</strong> é o fármaco de escolha em pediatria.</li>
  <li><strong>Giardíase Aguda e Subaguda (Giardia lamblia):</strong> Protozoose que coloniza o duodeno e jejuno proximal, aderindo às vilosidades por disco suctorial ventral. Manifesta-se por diarreia aquosa ou esteatorreica, fezes fétidas que flutuam no vaso sanitário, náuseas, anorexia, distensão abdominal e flatulência fétida com eructações sulfurosas (gosto de ovo podre). O diagnóstico é firmado pelo exame parasitológico de fezes (EPF) em três amostras seriadas com pesquisa de cistos ou trofozoítos. O tratamento farmacológico de escolha é o <strong>Metronidazol (15 a 20 mg/kg/dia dividido em 3 doses por 5 a 7 dias)</strong> ou Nitazoxanida oral por 3 dias.</li>
  <li><strong>Amebíase Intestinal Invasiva (Entamoeba histolytica):</strong> Produz úlceras mucosas em 'botão de colarinho' no ceco e cólon ascendente. Manifesta-se clinicamente como colite amebiana aguda com fezes frequentes, muco, pus e sangue vivo, tenesmo e cólicas intensas, podendo complicar com abscesso hepático amebiano. O tratamento envolve um amebicida tecidual (Metronidazol por 7 a 10 dias) seguido de um amebicida luminal (Teclozana ou Paromomicina) para erradicar cistos e prevenir recidivas.</li>
  <li><strong>Campylobacter jejuni e Síndrome de Guillain-Barré:</strong> Bacilo Gram-negativo curvo/espiralado com motilidade em saca-rolhas, transmitido pelo consumo de carne de aves malcozidas ou leite não pasteurizado. Causa enterocolite aguda invasiva com febre, cólicas abdominais graves que mimetizam apendicite aguda (pseudoapendicite) e fezes sanguinolentas. A importância neurológica reside no mimetismo molecular entre os lipooligossacarídeos da parede do <em>C. jejuni</em> e os gangliosídeos dos nervos periféricos (GM1, GD1a), desencadeando resposta autoimune que causa a <strong>Síndrome de Guillain-Barré</strong> semanas após a diarreia. O tratamento de escolha quando indicado é a <strong>Azitromicina oral</strong> por 3 dias.</li>
  <li><strong>Salmonelose Não Tifoide e Estado de Portador:</strong> Causada por <em>Salmonella enterica</em> sorotipos Enteritidis e Typhimurium, associada a ovos crus, maioneses caseiras e contato com répteis de estimação. Em crianças eutróficas maiores de 3 meses, o tratamento é exclusivamente sintomático e hidratação oral, pois o uso rotineiro de antimicrobianos prolonga o estado de portador assintomático e excreção fecal. A antibioticoterapia com Ceftriaxona ou Ciprofloxacino é formalmente reservada para recém-nascidos e lactentes &lt; 3 meses, imunodeprimidos, portadores de anemia falciforme (risco elevado de osteomielite por <em>Salmonella</em>) e na vigência de sepse sistêmica.</li>
  <li><strong>Diarreia Persistente Pós-Infecciosa:</strong> Definida como episódio diarreico agudo de provável etiologia infecciosa que se prolonga por <strong>mais de 14 dias</strong>, associando-se a deterioração do estado nutricional. Decorre da perda da capacidade regenerativa do epitélio vilositário associada à intolerância secundária a dissacarídeos e sensibilização a proteínas alimentares intactas (leite de vaca). O manejo exige reavaliação dietética cuidadosa, uso de dietas hipoalergênicas ou sem lactose e manutenção da suplementação com zinco e micronutrientes.</li>
</ul>
`;

// 3. Trauma Pélvico e Geniturinário (+3k)
const mini067 = `
<h3>Fraturas Pélvicas Abertas e Síndrome de Deslocamento Morel-Lavallée</h3>
<p>A fratura pélvica aberta é uma das lesões traumáticas mais devastadoras da cirurgia moderna, associando-se a taxas históricas de mortalidade de até 30% a 50% decorrentes de choque hemorrágico descontrolado e sepse pélvica precoce:</p>
<ul>
  <li><strong>Definição e Reconhecimento Imediato:</strong> Caracteriza-se por qualquer comunicação direta entre o foco de fratura óssea pélvica e o meio externo, através de ferida cutânea perineal, laceração da parede vaginal ou laceração da mucosa retal. O toque retal e o exame especular vaginal são mandatórios na avaliação primária/secundária do trauma pélvico para descartar espículas ósseas protruídas e sangramento mucoso ativo.</li>
  <li><strong>Manejo Cirúrgico de Emergência:</strong> Exige desbridamento cirúrgico agressivo precoce de tecidos desvitalizados, lavagem pulsátil copiosa, estabilização óssea mecânica com fixador externo e realização de <strong>Colostomia Derivativa em alça (habitualmente colostomia sigmoideia)</strong> com fita de proteção para desviar completamente o trânsito fecal da ferida perineal e impedir contaminação bacteriana entérica catastrófica do hematoma retroperitoneal.</li>
  <li><strong>Lesão de Morel-Lavallée:</strong> Trata-se de uma lesão traumática fechada por descolamento e cisalhamento interno violento entre o tecido celular subcutâneo e a fáscia muscular profunda subjacente, comum sobre a região trocantérica e crista ilíaca. Rompem-se vasos perfurantes e linfáticos, criando uma cavidade virtual preenchida por grande volume de sangue, linfa e gordura necrosada. Se não drenada precocemente, a lesão encapsula-se e torna-se foco de infecção grave por anaeróbios e bactérias hospitalares.</li>
</ul>
`;

console.log('Aplicando mini-boost final...');
appendSectionToBook('trauma-toracico', 'sec-algoritmo-drenagem-selo-dagua', 'Algoritmo Prático de Decisão: Drenagem Pleural Fechada e Cuidados com o Selo d\'Água', mini057);
appendSectionToBook('diarreia-aguda', 'sec-infeccoes-especiais-colera-protozoarios', 'Diagnóstico Diferencial e Condutas Específicas em Diarreias Infecciosas Especiais', mini058);
appendSectionToBook('trauma-pelvico-e-geniturinario', 'sec-fraturas-abertas-morel-lavallee', 'Fraturas Pélvicas Abertas e Síndrome de Deslocamento Morel-Lavallée', mini067);
console.log('Mini-boost aplicado!');
