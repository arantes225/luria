// Bloco 5 - Aula 103: Tuberculose na Infância (Parte 3: Seções 11 a 15)

export const sec11 = {
  id: 'vacina-bcg-fisiologia-evolucao-da-lesao-e-eventos-adversos',
  title: '11. Vacina BCG: Imunobiologia, Evolução Habitual da Lesão Vacinal e Manejo de Efeitos Adversos',
  body_html: `
<h3>Imunobiologia da Vacina BCG (Bacilo de Calmette-Guérin)</h3>
<p>A vacina <strong>BCG</strong> é composta por bacilos vivos atenuados derivados da cepa original de <em>Mycobacterium bovis</em>, atenuada após 230 passagens sucessivas em meio de cultura por Albert Calmette e Camille Guérin no Instituto Pasteur de Lille entre 1908 e 1921. No Brasil, utiliza-se a cepa <strong>BCG Moreau-Rio de Janeiro</strong>, reconhecida mundialmente pela sua excelente imunogenicidade e baixíssima taxa de reatogenicidade adversa.</p>

<p><strong>A Grande Verdade e Limitação Epidemiológica da BCG:</strong> É fundamental desfazer um equívoco conceitual persistente: <strong>a vacina BCG NÃO impede a infecção pelo <em>M. tuberculosis</em> nem impede o desenvolvimento da tuberculose pulmonar primária comum da infância!</strong> A sua eficácia na prevenção da forma pulmonar no adulto e na criança é variável e modesta (em torno de 50%). O propósito primordial e inegociável da vacina BCG — o motivo pelo qual ela é aplicada universalmente na maternidade logo após o nascimento — é que ela confere <strong>proteção superior a 80% a 90% CONTRA AS FORMAS GRAVES, DISSEMINADAS E LETAIS DA INFÂNCIA: a Meningoencefalite Tuberculosa e a Tuberculose Miliar</strong>.</p>

<h3>A Evolução Cronológica Normal da Lesão Vacinal</h3>
<p>A aplicação da BCG é estritamente <strong>intradérmica no nível da inserção inferior do músculo deltoide no braço direito</strong> (padronização universal do Ministério da Saúde para facilitar a identificação da cicatriz em inquéritos populacionais):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Momento Pós-Vacinação</th>
      <th>Evolução Morfológica Macroscópica da Lesão</th>
      <th>Conduta Médica / Cuidados Locais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Imediatamente após a injeção</strong></td>
      <td><strong>Pápula intradérmica esbranquiçada</strong> de 5 a 6 mm com aspecto de "casca de laranja".</td>
      <td>Desaparece espontaneamente em 15 a 30 minutos. Não comprimir nem massagear.</td>
    </tr>
    <tr>
      <td><strong>3 a 4 Semanas</strong></td>
      <td>Surge uma <strong>mácula avermelhada que evolui para nódulo endurado</strong> eritematoso local de 5 a 10 mm.</td>
      <td>Processo inflamatório imune normal. Não aplicar pomadas nem curativos oclusivos.</td>
    </tr>
    <tr>
      <td><strong>4 a 6 Semanas</strong></td>
      <td>O nódulo sofre amolecimento central com formação de uma <strong>pústula que evolui para crosta</strong>.</td>
      <td>Manter a região limpa apenas com água e sabão neutro durante o banho.</td>
    </tr>
    <tr>
      <td><strong>6 a 8 Semanas</strong></td>
      <td>A crosta se desprende espontaneamente, expondo uma <strong>pequena úlcera limpa de 4 a 7 mm de diâmetro</strong> com secreção serosa discreta.</td>
      <td><strong>A úlcera é perfeitamente normal!</strong> Não usar antissépticos, iodo, álcool nem pomadas cicatrizantes. Lavagem simples diária.</td>
    </tr>
    <tr>
      <td><strong>8 a 12 Semanas (2 a 3 Meses)</strong></td>
      <td>Cicatrização retrátil definitiva com formação da <strong>Cicatriz Vacinal Típica arredondada, nacarada e deprimida (de 3 a 7 mm)</strong>.</td>
      <td>Processo concluído. Nota Oficial do PNI: <strong>Crianças que não desenvolvem cicatriz vacinal após a BCG NÃO DEVEM MAIS SER REVACINADAS!</strong> (estudos comprovaram eficácia imune celular preservada mesmo na ausência de cicatriz macroscópica visível).</td>
    </tr>
  </tbody>
</table>

<h3>Eventos Adversos Locais e Regionais e Seu Manejo Clínico</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Evento Adverso da BCG</th>
      <th>Apresentação Clínica Típica</th>
      <th>Conduta Farmacológica e Intervenções</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Úlcera com Diâmetro Maior que 1 cm ($&gt; 10\\text{ mm}$) ou que não cicatriza após 12 semanas</strong></td>
      <td>Ulceração profunda exsudativa persistente no sítio de inserção vacinal após 3 meses da aplicação.</td>
      <td><strong>Isoniazida oral na dose de 10 mg/kg/dia</strong> (máx. 300 mg/dia) até a cicatrização completa (habitualmente por 30 a 60 dias). Não usar pomadas nem curativos oclusivos.</td>
    </tr>
    <tr>
      <td><strong>Linfadenopatia Regional Não Supurada (&le; 3 cm)</strong></td>
      <td>Linfonodo axilar, supraclavicular ou cervical homolateral de consistência fibroelástica, móvel, indolor, sem sinais flogísticos.</td>
      <td><strong>Conduta Expectante / Observação Clínica Pura.</strong> Não requer medicação nem punção; regressão espontânea em semanas ou meses.</td>
    </tr>
    <tr>
      <td><strong>Linfadenopatia Regional Supurada (Linfadenite Supurativa / Abscesso Frio)</strong></td>
      <td>Linfonodo axilar ou supraclavicular que sofre amolecimento com flutuação e drenagem purulenta espontânea (abscesso).</td>
      <td><strong>Isoniazida oral (10 mg/kg/dia) até regressão completa.</strong> Se houver flutuação tensa dolorosa iminente, realizar <strong>punção aspirativa com agulha grossa</strong> para alívio. <strong>PROIBIDO INCISÃO CIRÚRGICA</strong> (risco de fístula crônica de difícil cicatrização).</td>
    </tr>
    <tr>
      <td><strong>Reação Queloidiana / Quelóide</strong></td>
      <td>Cicatriz hipertrófica, endurecida, elevada e pruriginosa no local da injeção em indivíduos com predisposição genética familiar.</td>
      <td>Manejo dermatológico com infiltração intralesional de corticoide ou compressão tópica com placa de silicone.</td>
    </tr>
    <tr>
      <td><strong>Disseminação Sistêmica pelo BCG (BCGite Disseminada)</strong></td>
      <td>Ocorre exclusivamente em <strong>crianças com imunodeficiência congênita grave</strong> (Imunodeficiência Comum Variável, SCID, defeitos do eixo IL-12/IFN-gama). Febre, hepatoesplenomegalia e lesões osteoarticulares múltiplas.</td>
      <td>Emergência médica grave. Notificação compulsória imediata; suspensão de qualquer imunização; tratamento pleno com esquema antimicobacteriano específico (cepa BCG é naturalmente <strong>resistente à Pirazinamida!</strong> Esquema com Rifampicina + Isoniazida + Etambutol + Ciprofloxacino).</td>
    </tr>
  </tbody>
</table>
`
};

export const sec12 = {
  id: 'tuberculose-e-infeccao-pelo-hiv-na-infancia',
  title: '12. Coinfecção TB-HIV na Criança: Desafios Diagnósticos, TARV e Síndrome Inflamatória de Reconstituição Imune (SIRI)',
  body_html: `
<h3>O Impacto Destrutivo da Coinfecção TB-HIV em Pediatria</h3>
<p>A infecção pelo vírus do HIV potencializa de forma catastrófica a suscetibilidade à tuberculose ativa na infância: o risco de uma criança infectada pelo HIV desenvolver tuberculose após contato com o bacilo é dezenas de vezes maior do que em imunocompetentes. A destruição progressiva dos linfócitos T CD4+ desmantela a arquitetura dos granulomas pulmonares, facilitando a proliferação bacilar descontrolada e a disseminação hematogênica para o sistema nervoso central, fígado e medula óssea.</p>

<h3>Particularidades Diagnósticas na Criança Vivendo com HIV</h3>
<ul>
  <li><strong>Anergia Cutânea e Falso-Negativo no PPD:</strong> Como a resposta ao PPD depende da imunidade celular de células T íntegras, a criança com contagem de CD4 deprimida apresentará <strong>PPD Não Reator (0 mm) mesmo estando gravemente infectada ou com doença ativa avançada</strong>. O ponto de corte do PPD para definir infecção latente ou suporte diagnóstico em HIV positivos é de apenas <strong>$\ge 5\\text{ mm}$</strong>;</li>
  <li><strong>Apresentações Radiológicas Atípicas:</strong> Crianças com imunossupressão avançada frequentemente não formam infiltrados lobares bem delimitados nem cavitações: apresentam padrão micronodular intersticial difuso, infiltrados reticulonodulares em bases ou radiografias com alterações mínimas contrastando com toxemia clínica severa;</li>
  <li><strong>Ponderação no Escore do Ministério da Saúde:</strong> A presença de desnutrição grave ou perda de peso acelerada pontua no escore, auxiliando na indicação terapêutica precoce.</li>
</ul>

<h3>Manejo Terapêutico Integrado e a Interação Rifampicina-TARV</h3>
<p>O tratamento da tuberculose ativa e do HIV na criança deve seguir uma sincronização cronológica meticulosa:</p>

<ol>
  <li><strong>Regra do "Tratar a Tuberculose Primeiro":</strong> Inicia-se imediatamente o esquema RHZ (ou RHZE se neurotuberculose). <strong>A Terapia Antirretroviral (TARV) NÃO deve ser iniciada no mesmo dia</strong>, devido à sobreposição de hepatotoxicidade, toxicidade gastrointestinal e interações farmacocinéticas severas;</li>
  <li><strong>Momento de Introdução da TARV:</strong> Introduzir a TARV <strong>duas a quatro semanas após o início do tratamento da tuberculose</strong> (assim que o paciente demonstrar tolerabilidade gastrointestinal às drogas antituberculosas). Se a imunossupressão for profunda (CD4 &lt; 50 células/mm³), iniciar a TARV em até 2 semanas;</li>
  <li><strong>A Gravíssima Interação Rifampicina versus Inibidores de Integrase / Protease:</strong> A Rifampicina é um potente e avassalador indutor enzimático do citocromo hepático P450 (especialmente da isoenzima <strong>CYP3A4</strong>) e da glicoproteína P. O uso concomitante de Rifampicina com antirretrovirais da classe dos Inibidores de Integrase (como o <strong>Dolutegravir - DTG</strong>) reduz drasticamente as concentrações plasmáticas do antiviral, levando a falha virológica. <strong>Conduta Padrão:</strong> Dobrar a dose do Dolutegravir (administrar DTG <strong>duas vezes ao dia / 12 em 12 horas</strong> em vez de uma vez ao dia) enquanto o paciente estiver em uso de Rifampicina, mantendo a dose dobrada até 2 semanas após o término da rifampicina.</li>
</ol>

<h3>Síndrome Inflamatória de Reconstituição Imunológica (SIRI / IRIS)</h3>
<p>A <strong>SIRI</strong> ocorre tipicamente nas primeiras 2 a 8 semanas após a introdução da TARV em crianças com imunodeficiência prévia grave. À medida que os níveis de CD4 disparam e a carga viral do HIV despenca, o sistema imunológico "desperta" bruscamente e deflagra uma tempestade inflamatória hiper-reativa contra antígenos do <em>M. tuberculosis</em> vivos ou mortos:</p>
<ul>
  <li>Manifesta-se clinicamente como <strong>piora paradoxal dos sintomas respiratórios</strong>, febre alta recidivante, crescimento exuberante de linfonodos cervicais ou hilares (com risco de compressão de via aérea) e piora aparente dos infiltrados radiológicos;</li>
  <li><strong>Conduta Médica Mandatória:</strong> A SIRI <strong>NÃO É FALHA DO TRATAMENTO nem infecção por germe resistente!</strong> <strong>NÃO SUSPENDER A TARV E NÃO SUSPENDER O ESQUEMA DE TUBERCULOSE!</strong> Ambas as terapias devem ser rigorosamente mantidas. Trata-se a hiper-reação inflamatória com <strong>Corticosteroides Sistêmicos (Prednisona 1 a 2 mg/kg/dia por 2 a 4 semanas com desmame progressivo)</strong>, com melhora clínica dramática.</li>
</ul>
`
};

export const sec13 = {
  id: 'tuberculose-multirresistente-tb-mdr-e-extensivamente-resistente-na-infancia',
  title: '13. Tuberculose Resistente a Medicamentos (TB-MDR e TB-XDR) na Faixa Etária Pediátrica',
  body_html: `
<h3>Definições Oficiais e Taxonomia da Resistência Antimicrobiana</h3>
<p>A resistência aos fármacos antituberculose é um fenômeno biológico decorrente de mutações cromossômicas espontâneas selecionadas pelo uso irregular, doses insuficientes ou esquemas inadequados de antimicrobianos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação da Resistência</th>
      <th>Perfil de Resistência Genotípico e Fenotípico</th>
      <th>Impacto Clínico e Terapêutico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Monorresistência</strong></td>
      <td>Resistência comprovada a apenas um medicamento antituberculose de 1ª linha (ex: apenas à Isoniazida ou apenas à Rifampicina).</td>
      <td>Ajuste do esquema mantendo as demais drogas ativas associadas a fluoroquinolona.</td>
    </tr>
    <tr>
      <td><strong>Polirresistência</strong></td>
      <td>Resistência a dois ou mais fármacos de 1ª linha, <strong>exceto à combinação simultânea de Rifampicina e Isoniazida</strong>.</td>
      <td>Esquema individualizado baseado no Teste de Sensibilidade aos Antimicrobianos (TSA).</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Multirresistente (TB-MDR)</strong></td>
      <td>Resistência bacteriológica concomitante <strong>pelo menos à RIFAMPICINA E À ISONIAZIDA</strong> simultâneas (as duas drogas fundamentais do esquema básico).</td>
      <td>Exige tratamento com esquema especial de 2ª linha por 18 a 24 meses em centro de referência terciário.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Pré-XDR</strong></td>
      <td>Tuberculose que preenche critérios de <strong>TB-MDR associada a resistência a qualquer FLUOROQUINOLONA</strong> (Levofloxacino ou Moxifloxacino).</td>
      <td>Tratamento extremamente complexo com drogas de resgate (Bedaquilina, Delamanida, Linezolida).</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Extensivamente Resistente (TB-XDR)</strong></td>
      <td>Critérios de TB-MDR + Resistência a uma fluoroquinolona + Resistência a pelo menos <strong>um medicamento do Grupo A (Bedaquilina ou Linezolida)</strong>.</td>
      <td>Altíssima mortalidade; necessita de suporte de infectologista pediátrico de referência nacional.</td>
    </tr>
  </tbody>
</table>

<h3>A Peculiaridade da Tuberculose Resistente na Criança</h3>
<p>É uma lei da epidemiologia infantil: <strong>a criança quase nunca desenvolve resistência adquirida por má adesão própria</strong> (pois sua carga bacilar é baixa, tornando a probabilidade de mutação intrínseca desprezível). Quando uma criança adoece com TB-MDR, trata-se praticamente sempre de <strong>TB-MDR PRIMÁRIA TRANSMITIDA</strong>: ela foi infectada diretamente por um adulto que já era portador de uma cepa resistente a rifampicina e isoniazida!</p>
<p>Portanto, ao atender uma criança com tuberculose, é <strong>obrigatório resgatar o histórico do caso índice</strong>: se o adulto tiver histórico de abandono prévio, falência terapêutica, retratamento ou cultura com perfil de resistência confirmado, o esquema empírico pediátrico deve ser imediatamente desenhado espelhando o perfil de sensibilidade do caso fonte adulto.</p>
`
};

export const sec14 = {
  id: 'guia-definitivo-de-medicamentos-e-formulario-para-tuberculose-pediatrica',
  title: '14. Compêndio Farmacológico e Formulário Mestre de Bolso para o ENAMED e Concursos',
  body_html: `
<h3>Tabela Farmacológica Definitiva do Ministério da Saúde para Pediatria</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco</th>
      <th>Dose Pediátrica Diária Padrão</th>
      <th>Dose Máxima Absoluta</th>
      <th>Mecanismo de Ação e Efeitos Adversos Principais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rifampicina (R)</strong><br>(Cápsulas 300 mg e Suspensão Oral 20 mg/mL)</td>
      <td><strong>15 mg/kg/dia</strong> (menores de 10 anos)<br>10 mg/kg/dia ($\ge 10$ anos)</td>
      <td><strong>600 mg/dia</strong></td>
      <td>Inibe a RNA polimerase dependente de DNA bacteriana. Bactericida potente. Causa <strong>coloração alaranjada/avermelhada do suor, urina e lágrimas</strong> (orientar os pais para evitar pânico!). Hepatotoxicidade e indução enzimática potente da CYP3A4.</td>
    </tr>
    <tr>
      <td><strong>Isoniazida (H)</strong><br>(Comprimidos 100 mg e 300 mg)</td>
      <td><strong>10 mg/kg/dia</strong></td>
      <td><strong>300 mg/dia</strong></td>
      <td>Inibe a síntese de ácidos micólicos da parede celular. Bactericida intracelular rápido. Causa <strong>hepatotoxicidade e neuropatia periférica por carência de piridoxina (vitamina B6)</strong>. Recomenda-se suplementação de piridoxina (10 a 25 mg/dia) em lactentes desnutridos ou em aleitamento materno exclusivo.</td>
    </tr>
    <tr>
      <td><strong>Pirazinamida (Z)</strong><br>(Comprimidos 500 mg e Suspensão Oral 30 mg/mL)</td>
      <td><strong>35 mg/kg/dia</strong></td>
      <td><strong>1.500 mg/dia</strong></td>
      <td>Atua em meio ácido no interior dos macrófagos e no centro caseoso necrotizante. Potente esterilizante. Causa <strong>artralgias, hiperuricemia e hepatotoxicidade severa</strong>.</td>
    </tr>
    <tr>
      <td><strong>Etambutol (E)</strong><br>(Comprimidos 400 mg)</td>
      <td><strong>20 mg/kg/dia</strong></td>
      <td><strong>1.200 mg/dia</strong></td>
      <td>Inibe a arabinosil transferase na parede celular. Droga predominantemente bacteriostática. Causa <strong>neurite óptica retrobulbar com discromatopsia verde-vermelho e escotomas centrais</strong>. CONTRAINDICADO em &lt; 10 anos na forma pulmonar.</td>
    </tr>
    <tr>
      <td><strong>Rifapentina (RPT)</strong><br>(Comprimidos 150 mg)</td>
      <td>Ajustada por peso (300 a 900 mg) UMA VEZ POR SEMANA</td>
      <td><strong>900 mg semanais</strong></td>
      <td>Derivado rifamicínico de meia-vida biológica ultra-longa. Utilizada no esquema 3HP (12 semanas) para tratamento da ILTB a partir de 2 anos.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec15 = {
  id: 'bateria-de-questoes-comentadas-padrao-revalida-enamed-tb',
  title: '15. Bateria Exaustiva de Questões Comentadas Padrão ENAMED, Revalida e Concursos Top-Tier',
  body_html: `
<h3>Questões de Provas Oficiais com Análise Crítica de Gabarito e Pegadinhas</h3>

<h4>Questão 4: ENAMED — Reação Adversa à Vacina BCG e Conduta</h4>
<p><strong>Enunciado:</strong> Um lactente de 2 meses de vida é trazido à consulta de puericultura na Unidade Básica de Saúde. A mãe demonstra grande preocupação ao apontar para a região do músculo deltoide direito da criança, onde foi aplicada a vacina BCG na maternidade. Ao exame físico, o médico constata a presença de uma úlcera de 5 mm de diâmetro, com bordas regulares e fundo limpo, drenando pequena quantidade de secreção serosa amarelada, sem calor, sem eritema extenso ao redor e sem febre. A criança mama bem e apresenta curva de peso e comprimento normais. A conduta correta do médico diante deste achado é:</p>
<p>A) Prescrever isoniazida oral por 30 dias e aplicar pomada de neomicina local com curativo oclusivo.<br>
B) Tranquilizar a mãe, explicando que a úlcera de até 10 mm faz parte da evolução imunológica normal e esperada da vacina BCG, devendo a área ser limpa apenas com água e sabão durante o banho, sem necessidade de medicamentos.<br>
C) Puncionar a úlcera com agulha grossa para esvaziamento e solicitar teste rápido molecular.<br>
D) Notificar imediatamente como evento adverso grave e indicar biópsia cutânea da borda da lesão.<br>
E) Indicar revacinação imediata no membro superior esquerdo.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A evolução cronológica normal da BCG contempla: pápula $\rightarrow$ nódulo $\rightarrow$ pústula $\rightarrow$ <strong>úlcera de 4 a 7 mm entre 6 e 10 semanas de vida</strong> $\rightarrow$ cicatriz definitiva aos 3 meses. A úlcera de 5 mm sem sinais inflamatórios sistêmicos é o curso habitual da vacina! O médico deve orientar a família a não colocar nenhum tipo de medicamento, pomada ou curativo, lavando apenas com água e sabão. O uso de Isoniazida só estaria indicado se a úlcera ultrapassasse 10 mm de diâmetro ou não cicatrizasse após 12 semanas. Alternativa B impecável.</p>

<h4>Questão 5: USP-RP — Esquema de Tratamento da Neurotuberculose Infantil</h4>
<p><strong>Enunciado:</strong> Um menino de 2 anos de idade é diagnosticado com meningoencefalite tuberculosa comprovada por detecção de DNA de <em>Mycobacterium tuberculosis</em> no líquor por TRM-TB. De acordo com as diretrizes do Ministério da Saúde do Brasil, o esquema farmacológico e a duração preconizada para este paciente são:</p>
<p>A) 2 meses de RHZ seguidos de 4 meses de RH (duração de 6 meses).<br>
B) 2 meses de RHZE seguidos de 10 meses de RH (duração total de 12 meses) associados à corticoterapia com prednisona ou dexametasona nas primeiras semanas de tratamento.<br>
C) 12 meses exclusivos de Isoniazida em monoterapia associada a piridoxina.<br>
D) 6 meses de RHZE sem corticoides pelo risco de imunossupressão cerebral.<br>
E) 18 meses de amicacina associada a claritromicina e levofloxacino.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A Meningoencefalite Tuberculosa e a forma osteoarticular são as duas grandes exceções pediátricas:
1. <strong>Duração Prolongada:</strong> Exigem <strong>12 meses de tratamento total</strong> (2 meses de fase intensiva com 4 drogas + 10 meses de fase de manutenção com RH);
2. <strong>Uso Obrigatório de 4 Drogas (RHZE):</strong> Utiliza-se o Etambutol mesmo em menores de 10 anos, devido à gravidade extrema do acometimento cerebral;
3. <strong>Corticoterapia Sistêmica Compulsória:</strong> O uso de corticoide (prednisona 1-2 mg/kg/dia por 4 a 8 semanas) é mandatório para reduzir a vasculite cerebral, diminuir infartos cerebrais e reduzir expressivamente a mortalidade. Alternativa B impecável.</p>
`
};
