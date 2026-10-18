// Bloco 5 - Aula 108: Infecção Urinária na Criança - Part 3
export const sec5 = {
  id: 'tratamento-antimicrobiano-empirico-oral-e-parenteral',
  title: '5. Diretrizes de Tratamento Antimicrobiano Empírico e Guiado: Via Oral versus Parenteral',
  body_html: `
<h3>Princípios Gerais da Antibioticoterapia na ITU Pediátrica</h3>
<p>O início da antibioticoterapia na criança com suspeita de ITU febril (Pielonefrite) não deve ser postergado enquanto se aguarda o resultado da urocultura. A literatura comprova que <strong>o atraso superior a 48 a 72 horas no início do antibiótico eficaz durante um episódio de pielonefrite aguda eleva de forma estatisticamente significante o risco de cicatriz renal parenquimatosa definitiva</strong>. Contudo, é uma <strong>falha médica inaceitável iniciar o antibiótico antes da coleta adequada e estéril da urina para urocultura</strong>.</p>

<h3>Critérios Rígidos de Internação Hospitalar e Terapia Intravenosa</h3>
<p>Nem toda criança com infecção urinária precisa ser internada. A decisão entre tratamento hospitalar parenteral versus ambulatorial oral fundamenta-se nos seguintes <strong>critérios formais de internação</strong>:</p>

<div class="formula-box">
  <p><strong>Critérios Mandatórios de Internação Hospitalar para Terapia Parenteral:</strong></p>
  <ul>
    <li><strong>Idade biológica inferior a 2 a 3 meses de vida</strong> (risco extremo de urossepses fulminantes e bacteremia secundária por germes entéricos);</li>
    <li><strong>Sinais de Toxemia Sistêmica, Instabilidade Hemodinâmica ou Sepse:</strong> Letargia, sonolência excessiva, palidez cutânea, hipotensão, tempo de enchimento capilar $> 3$ segundos;</li>
    <li><strong>Intolerância à Via Oral:</strong> Vômitos incoercíveis, náuseas persistentes, recusa alimentar ou desidratação moderada a grave que impeça a ingestão segura do antibiótico;</li>
    <li><strong>Portadores de Malformações Urológicas Complexas Conhecidas:</strong> Bexiga neurogênica, válvula de uretra posterior, duplicidade ureteral complicada ou rim único funcionante;</li>
    <li><strong>Imunossupressão ou Desnutrição Grave;</strong></li>
    <li><strong>Condições Sociofamiliares Vulneráveis ou Suspeita de Má Adesão Domiciliar;</strong></li>
    <li><strong>Piora Clínica ou Febre Persistente após 48 a 72 Horas de Tratamento Oral Ambulatorial Bem Conduzido.</strong></li>
  </ul>
</div>

<h3>Esquemas Antimicrobianos Parenterais Recomendados (Hospitalares)</h3>
<p>Para crianças internadas com pielonefrite aguda ou sepse de foco urinário, os regimes de primeira escolha incluem:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária / Condição Clínica</th>
      <th>Esquema Antimicrobiano Parenteral de Escolha</th>
      <th>Posologia Pediátrica Habitual e Ajuste Renal</th>
      <th>Justificativa Microbiológica e Cobertura</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Período Neonatal (< 28 dias)</strong></td>
      <td><strong>Ampicilina IV + Gentamicina IV</strong> (ou Ampicilina + Cefotaxima IV)</td>
      <td>Ampicilina: $100-200$ mg/kg/dia divididos de 6/6h ou 8/8h.<br>Gentamicina: $4-5$ mg/kg/dia em dose única diária (monitorar nível sérico e função renal).</td>
      <td>A Ampicilina cobre soberanamente <em>Streptococcus agalactiae</em> (GBS), <em>Listeria monocytogenes</em> e <em>Enterococcus faecalis</em>; a Gentamicina (ou Cefotaxima) cobre a <em>Escherichia coli</em> e enterobactérias gram-negativas. <strong>Atenção: Evitar Ceftriaxona no neonato</strong> devido ao risco de kernicterus (deslocamento da bilirrubina da albumina) e precipitação biliar ("lama biliar" de ceftriaxona cálcica).</td>
    </tr>
    <tr>
      <td><strong>Lactentes Maiores e Crianças (> 1 a 3 meses)</strong></td>
      <td><strong>Ceftriaxona IV (ou Cefotaxima IV)</strong></td>
      <td>Ceftriaxona: $50-75$ mg/kg/dia IV ou IM administrada em dose única a cada 24 horas (máximo de 2 g/dia).</td>
      <td>Excelente penetração tecidual no parênquima renal, alta estabilidade contra betalactamases convencionais e comodidade posológica de aplicação única diária.</td>
    </tr>
    <tr>
      <td><strong>Opção Alternativa Parenteral</strong></td>
      <td><strong>Amicacina IV</strong> (ou Ciprofloxacino IV em casos selecionados de germes multirresistentes)</td>
      <td>Amicacina: $15$ mg/kg/dia IV em dose única diária.</td>
      <td>Excelente opção para pacientes alérgicos a cefalosporinas ou em hospitais com alta prevalência de enterobactérias produtoras de betalactamase de espectro estendido (ESBL). Monitorar nefro e ototoxicidade.</td>
    </tr>
  </tbody>
</table>

<h3>Esquemas Antimicrobianos Orais Recomendados (Ambulatoriais)</h3>
<p>Em lactentes maiores de 2 a 3 meses e crianças com bom estado geral, tolerando bem a via oral, afebris ou com cistite não complicada, o tratamento pode ser inteiramente oral em domicílio:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classe Farmacológica</th>
      <th>Fármaco Oral de Primeira Linha</th>
      <th>Posologia Pediátrica Diária</th>
      <th>Indicação Principal e Observações Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cefalosporina de 2ª ou 3ª Geração Oral</strong></td>
      <td><strong>Cefuroxima Axetil</strong> ou <strong>Cefixima</strong></td>
      <td>Cefuroxima: $20-30$ mg/kg/dia divididos de 12/12h.<br>Cefixima: $8$ mg/kg/dia em dose única ou dividida de 12/12h.</td>
      <td><strong>Primeira escolha ambulatorial para Pielonefrite Aguda Leve</strong>. Excelente taxa de suscetibilidade da <em>E. coli</em> comunitária e boa biodisponibilidade tecidual renal.</td>
    </tr>
    <tr>
      <td><strong>Cefalosporina de 1ª Geração Oral</strong></td>
      <td><strong>Cefalexina</strong></td>
      <td>$50-100$ mg/kg/dia divididos a cada 6 horas (ou de 8/8h).</td>
      <td>Excelente para <strong>Cistite Aguda Baixa</strong>. Menor penetração no córtex renal comparada às de gerações superiores, mas muito segura e barata.</td>
    </tr>
    <tr>
      <td><strong>Aminopenicilina com Inibidor de Betalactamase</strong></td>
      <td><strong>Amoxicilina + Clavulanato de Potássio</strong></td>
      <td>$40-50$ mg/kg/dia (baseado na amoxicilina) divididos a cada 8 ou 12 horas.</td>
      <td>Excelente opção oral empírica. Maior incidência de efeitos gastrointestinais (diarreia osmótica induzida pelo clavulanato).</td>
    </tr>
    <tr>
      <td><strong>Sulfametoxazol + Trimetoprima (Cotrimoxazol)</strong></td>
      <td><strong>SMX-TMP</strong></td>
      <td>$8-10$ mg/kg/dia (base no TMP) divididos de 12/12h.</td>
      <td><strong>Utilizar apenas se o antibiograma local documentar sensibilidade comprovada</strong>. A taxa de resistência da <em>E. coli</em> ao SMX-TMP supera 30% a 40% na maioria das capitais brasileiras, contraindicando seu uso empírico cego.</td>
    </tr>
    <tr>
      <td><strong>Nitrofurantoína</strong></td>
      <td><strong>Nitrofurantoína</strong></td>
      <td>$5-7$ mg/kg/dia divididos a cada 6 horas.</td>
      <td><strong>Atenção Máxima para Provas: INDICADA EXCLUSIVAMENTE PARA CISTITE AGUDA BAIXA!</strong> A nitrofurantoína possui concentrações séricas e teciduais no parênquima renal praticamente nulas (é rapidamente filtrada e atua apenas no lúmen vesical). <strong>É FORMALMENTE CONTRAINDICADA NO TRATAMENTO DA PIELONEFRITE AGUDA!</strong> Contraindicada também em menores de 1 mês de vida (risco de anemia hemolítica).</td>
    </tr>
  </tbody>
</table>

<h3>Duração da Terapia Antimicrobiana: Evidências Contemporâneas</h3>
<ul>
  <li><strong>Pielonefrite Aguda (ITU Febril / Alta):</strong> A duração clássica é de <strong>7 a 10 dias de tratamento total</strong> (consensos anteriores preconizavam 14 dias, mas ensaios clínicos recentes demonstraram equivalência perfeita de 7 a 10 dias com menor pressão seletiva e menos efeitos adversos). Em pacientes que iniciaram terapia parenteral hospitalar, pode-se realizar a <strong>transição para via oral (terapia sequencial switch) após 48 a 72 horas</strong>, desde que a criança esteja completamente afebril, ativa e aceitando bem a alimentação;</li>
  <li><strong>Cistite Aguda Baixa (ITU Não Febril em Crianças Continentais):</strong> Duração de <strong>3 a 5 dias</strong> de antibioticoterapia oral (em adolescentes, cursos de 3 dias de nitrofurantoína ou cefalexina são altamente eficazes).</li>
</ul>
`
};

export const sec6 = {
  id: 'profilaxia-antimicrobiana-dtui-e-prevencao-de-recorrencias',
  title: '6. Quimioprofilaxia Antimicrobiana, Disfunção do Trato Urinário Inferior (DTUI) e Prevenção',
  body_html: `
<h3>O Declínio da Quimioprofilaxia Universal: A Mudança de Paradigma</h3>
<p>Historicamente, toda criança que sofresse um episódio de ITU e apresentasse qualquer grau de Refluxo Vesicoureteral era mantida em quimioprofilaxia antimicrobiana contínua com doses baixas de antibióticos por anos a fio. Contudo, grandes ensaios clínicos randomizados multicêntricos contemporâneos (com destaque para o monumental estudo <em>RIVUR - Randomized Intervention for Children with Vesicoureteral Reflux</em>, publicado no <em>NEJM</em> em 2014) revelaram a realidade epidemiológica:</p>

<blockquote>
  "A quimioprofilaxia prolongada reduz modestamente as recidivas de ITU febril em crianças com refluxo, mas <strong>NÃO REDUZ DE FORMA ESTATISTICAMENTE SIGNIFICANTE A INCIDÊNCIA FINAL DE NOVAS CICATRIZES RENAIS NO DMSA</strong>, provocando, em contrapartida, um aumento alarmante de três a quatro vezes na colonização e infecção por <strong>bactérias multirresistentes</strong> (cepas produtoras de ESBL)."
</blockquote>

<h3>Indicações Restritas e Precisas da Quimioprofilaxia Atual (Diretrizes SBP / AAP)</h3>
<p>Hoje, a quimioprofilaxia antibiótica é reservada para subgrupos de altíssimo risco anatômico e funcional:</p>

<ol>
  <li><strong>Refluxo Vesicoureteral Grave Dilatado (Graus IV e V):</strong> Crianças aguardando cirurgia ou avaliação urodinâmica;</li>
  <li><strong>Crianças Menores de 1 a 2 Anos com RVU Graus III a V</strong> durante o período crítico de vulnerabilidade parenquimatosa;</li>
  <li><strong>Lactentes Aguardando a Realização de Exames de Imagem Invasivos (UCRM):</strong> Mantém-se profilaxia até a elucidação anatômica definitiva;</li>
  <li><strong>ITU Febril Recorrente Frequente ($\ge 3$ episódios de pielonefrite em 1 ano ou $\ge 2$ em 6 meses)</strong>, mesmo na ausência de RVU grave demonstrado;</li>
  <li><strong>Uropatias Obstrutivas Graves Não Corrigidas</strong> (Válvula de Uretra Posterior, Estenose de JUP com dilatação maciça).</li>
</ol>

<h3>Drogas e Esquemas Posológicos da Profilaxia</h3>
<p>A quimioprofilaxia utiliza <strong>um terço a um quarto ($1/3$ a $1/4$) da dose terapêutica diária habitual, administrada em DOSE ÚNICA NOTURNA AO DEITAR</strong> (momento em que a urina permanece estagnada na bexiga por longas horas durante o sono):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco para Profilaxia</th>
      <th>Dose Profilática Noturna</th>
      <th>Faixa Etária Permitida e Restrições Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Nitrofurantoína</strong></td>
      <td><strong>$1$ a $2$ mg/kg/dia</strong> em dose única noturna.</td>
      <td><strong>Droga de Primeira Escolha para Maiores de 1 Mês</strong>. Não altera significativamente a microbiota anaeróbia intestinal, induz baixíssima resistência bacteriana e atinge concentrações vesicais excelentes. Contraindicada no primeiro mês de vida e em insuficiência renal.</td>
    </tr>
    <tr>
      <td><strong>Cefalexina</strong></td>
      <td><strong>$10$ a $20$ mg/kg/dia</strong> em dose única noturna.</td>
      <td><strong>Droga de Escolha Absoluta para Recém-Nascidos e Lactentes $< 2$ meses</strong>. Extremamente segura no período neonatal precoce.</td>
    </tr>
    <tr>
      <td><strong>Sulfametoxazol + Trimetoprima (SMX-TMP)</strong></td>
      <td><strong>$2$ mg/kg/dia</strong> (base no TMP) em dose única noturna.</td>
      <td>Permitido apenas acima de 2 meses de vida. Indicado quando houver intolerância gástrica à nitrofurantoína.</td>
    </tr>
  </tbody>
</table>

<h3>A Disfunção do Trato Urinário Inferior (DTUI) e a Síndrome de Eliminação Disfuncional</h3>
<p>Em crianças maiores de 3 a 5 anos e escolares que apresentam infecções urinárias de repetição, a causa primária subjacente raramente é uma malformação anatômica grave; na imensa maioria das vezes, trata-se de um distúrbio funcional adquirido: a <strong>Disfunção do Trato Urinário Inferior (DTUI)</strong> associada à constipação intestinal, conjunto outrora denominado <em>Síndrome de Eliminação Disfuncional</em>:</p>

<ul>
  <li><strong>Fisiopatologia da Incoordenação Miccional:</strong> A criança que adia cronicamente a ida ao banheiro contrai voluntariamente o esfíncter estriado e a musculatura do assoalho pélvico enquanto o músculo detrusor da bexiga está se contraindo para esvaziar (dissinergia detrusor-esfincteriana funcional). Isso gera pressões intravesicais elevadas, esvaziamento incompleto e <strong>resíduo urinário pós-miccional elevado</strong>, que atua como um caldo de cultura estagnado para uropatógenos;</li>
  <li><strong>O Papel Crucial da Constipação Intestinal Crônica:</strong> A ampola retal cronicamente distendida por fezes ressecadas volumosas (fecalomas) comprime mecanicamente o trígono vesical e a uretra posterior, provocando obstrução mecânica funcional ao fluxo, além de servir como um reservatório bacteriano perineal permanente;</li>
  <li><strong>A Abordagem Não Farmacológica (Uroterapia Pediátrica):</strong> O pilar fundamental do tratamento das ITUs de repetição no pré-escolar é a <strong>reeducação comportamental miccional e intestinal</strong>:
    <ul>
      <li>Tratamento agressivo da constipação intestinal com laxativos osmóticos (Polietilenoglicol - PEG 4000) e aumento da ingestão de água e fibras alimentares;</li>
      <li>Micções programadas com alarme a cada 2 a 3 horas durante o dia (evitar que a criança "segure o xixi");</li>
      <li>Postura correta no vaso sanitário: apoio obrigatório para os pés (banquinho ou redutor de assento com suporte) para relaxar totalmente a musculatura do assoalho pélvico durante a micção;</li>
      <li>Tratamento de oxiuríase (<em>Enterobius vermicularis</em>), que causa prurido e migração perineal bacteriana.</li>
    </ul>
  </li>
</ul>
`
};
