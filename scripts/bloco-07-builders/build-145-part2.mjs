// scripts/bloco-07-builders/build-145-part2.mjs

export const sec3 = {
  id: "rastreamento-mamografico-e-colo-uterino-ms-inca",
  title: "3. Rastreamento Oncológico de Colo Uterino e Mama nas Diretrizes Brasileiras (MS / INCA)",
  body_html: `
<h3>3.1 Rastreamento do Câncer do Colo do Útero: Diretrizes Nacionais Oficiais</h3>
<p>O câncer do colo do útero permanece como uma das principais causas de mortalidade prematura por neoplasia em mulheres no Brasil, sendo uma doença quase totalmente prevenível quando detectada em suas fases precursoras (NIC II e NIC III / lesões de alto grau). O Ministério da Saúde e o Instituto Nacional de Câncer (INCA) estabelecem diretrizes programáticas rigorosas que diferem substancialmente de protocolos de outros países e frequentemente constituem alvos preferenciais de pegadinhas em provas de residência médica.</p>

<div class="clinical-box highlight">
  <h4>Diretriz Oficial do Rastreamento Citopatológico (Papanicolau / Convencional) - MS/INCA</h4>
  <ul>
    <li><strong>População-Alvo:</strong> Mulheres e pessoas com colo do útero (incluindo homens trans que mantêm a cérvice) na faixa etária estrita de <strong>25 a 64 anos</strong> que já iniciaram atividade sexual.</li>
    <li><strong>Por que não iniciar antes dos 25 anos?</strong> A infecção pelo HPV é extremamente prevalente em adolescentes e mulheres jovens sob 25 anos (atingindo até 40-50%), porém a história natural demonstra que mais de 90% dessas infecções regridem espontaneamente em 18 a 24 meses devido à robusta resposta imune. Rastrear mulheres jovens antes dos 25 anos leva a diagnósticos de lesões autolimitadas (NIC I/LSIL), gerando ansiedade devastadora, custos desnecessários e procedimentos excisionais iatrogênicos (conizações/CAF) que provocam incompetência istmocervical, estenose cervical e partos prematuros futuros.</li>
    <li><strong>Periodicidade do Rastreamento:</strong>
      <ul>
        <li>Exames anuais nos <strong>dois primeiros anos consecutivos</strong>.</li>
        <li>Se ambos os resultados anuais forem negativos para neoplasia/displasia (normais), o intervalo passa formalmente para <strong>a cada 3 anos</strong>.</li>
      </ul>
    </li>
    <li><strong>Quando Interromper o Rastreamento:</strong> Aos <strong>64 anos de idade</strong>, desde que a mulher tenha pelo menos <strong>dois exames citopatológicos negativos consecutivos nos últimos 5 anos</strong>. Se a mulher completou 64 anos e nunca realizou colpocitologia ou seu histórico é desconhecido, deve realizar 2 exames anuais normais antes de receber alta do rastreamento.</li>
    <li><strong>Situações Especiais e Populações Imunossuprimidas:</strong>
      <ul>
        <li><em>Mulheres vivendo com HIV (PVHIV) ou imunossuprimidas crônicas (transplantadas, uso de imunossupressores):</em> O rastreamento inicia-se <strong>logo após o início da vida sexual</strong> (independente da idade, mesmo &lt; 25 anos). A periodicidade é <strong>semestral no primeiro ano</strong> (dois exames com intervalo de 6 meses); mantendo-se normais e com contagem de CD4 &gt; 200 céls/mm³, o seguimento prossegue com citologia <strong>anual</strong> (nunca trienal!). Se CD4 &lt; 200 céls/mm³, mantém-se citologia semestral.</li>
        <li><em>Histerectomizadas:</em> Se histerectomia total por causas comprovadamente benignas (ex.: miomatose) e sem histórico de lesão precursora ou neoplasia cervical, <strong>o rastreamento é suspenso</strong> (não há indicação de citologia de cúpula vaginal). Se histerectomia subtotal (colo preservado), segue rotina padrão. Se histerectomia motivada por NIC II, NIC III ou câncer cervical invasor, o seguimento citológico da cúpula vaginal é mandatório e individualizado.</li>
        <li><em>Gestantes:</em> Seguem exatamente a mesma rotina de rastreamento de mulheres não grávidas, sem restrições à coleta ecto e endocervical com espátula de Ayre e escova endocervical (a rotação da escova deve ser suave e cuidadosa).</li>
      </ul>
    </li>
  </ul>
</div>

<table class="book-table">
  <thead>
    <tr>
      <th>Resultado da Citopatologia Cervical</th>
      <th>Significado Clínico</th>
      <th>Conduta Imediata na APS (MS/INCA)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Normal / Negativo para Malignidade</strong></td>
      <td>Células escamosas, glandulares e metaplásicas típicas; ausência de atipias.</td>
      <td>Seguir rotina trienal (ou anual se for o primeiro exame).</td>
    </tr>
    <tr>
      <td><strong>ASC-US (Atipias de Células Escamosas de Significado Indeterminado, Provavelmente Não Neoplásicas)</strong></td>
      <td>Alterações celulares limítrofes, frequentemente reativas/inflamatórias ou HPV inicial.</td>
      <td>
        <strong>Conduta dependente da idade:</strong><br>
        - Se &lt; 25 anos (coleta indevida): repetir em 3 anos.<br>
        - Se <strong>25 a 29 anos:</strong> repetir citopatológico em <strong>12 meses</strong>.<br>
        - Se <strong>&ge; 30 anos:</strong> repetir citopatológico em <strong>6 meses</strong>.<br>
        <em>Encaminhar para Colposcopia apenas se 2 exames repetidos consecutivos mantiverem ASC-US ou pior.</em>
      </td>
    </tr>
    <tr>
      <td><strong>LSIL (Lesão Intraepitelial Escamosa de Baixo Grau / NIC I / Efeito Citopático do HPV)</strong></td>
      <td>Infecção produtiva transitória por HPV; baixíssimo potencial de progressão neoplásica.</td>
      <td>
        <strong>Conduta dependente da idade:</strong><br>
        - Se <strong>&lt; 25 anos:</strong> repetir em 3 anos (alta taxa de clareamento espontâneo).<br>
        - Se <strong>&ge; 25 anos:</strong> repetir citopatológico em <strong>6 meses</strong> na APS.<br>
        <em>Encaminhar para Colposcopia apenas se persistência de LSIL em 2 exames consecutivos (intervalo de 6 meses) ou evolução para lesão mais grave.</em>
      </td>
    </tr>
    <tr>
      <td><strong>ASC-H (Atipias Escamosas em que Não se Pode Afastar Lesão de Alto Grau)</strong></td>
      <td>Células atípicas com suspeição real de NIC II/III ou carcinoma invasor.</td>
      <td><strong>Encaminhamento imediato para Colposcopia</strong> na Atenção Secundária (independente da idade).</td>
    </tr>
    <tr>
      <td><strong>HSIL (Lesão Intraepitelial Escamosa de Alto Grau / NIC II e NIC III / Carcinoma in situ)</strong></td>
      <td>Verdadeira lesão pré-maligna precursora do câncer cervical com potencial invasivo.</td>
      <td><strong>Encaminhamento imediato para Colposcopia</strong> na Atenção Secundária com brevidade.</td>
    </tr>
    <tr>
      <td><strong>AGC / AGUS (Atipias de Células Glandulares de Significado Indeterminado)</strong></td>
      <td>Células endocervicais ou endometriais atípicas; risco de adenocarcinoma endocervical ou de endométrio.</td>
      <td><strong>Encaminhamento imediato para Colposcopia</strong> com avaliação do canal endocervical e ultrassonografia pélvica/transvaginal se &ge; 35 anos ou fatores de risco para neoplasia de endométrio.</td>
    </tr>
    <tr>
      <td><strong>Carcinoma Epidermoide / Adenocarcinoma Invasor</strong></td>
      <td>Neoplasia maligna invasora franca.</td>
      <td><strong>Encaminhamento de urgência regulada (Sisreg) para Colposcopia / Oncologia</strong> (Lei dos 60 dias).</td>
    </tr>
  </tbody>
</table>

<h3>3.2 Rastreamento do Câncer de Mama: Diretrizes Nacionais (MS / INCA) vs Sociedades de Especialistas</h3>
<p>O rastreamento mamográfico é objeto de intenso debate e frequentes confusões diagnósticas. Para fins de saúde pública no Brasil, as políticas oficiais do Ministério da Saúde e do INCA fundamentam-se em estudos epidemiológicos de base populacional com análise estrita de custo-efetividade e balanço entre benefícios (redução absoluta de mortalidade) e danos (falsos-positivos, sobrediagnóstico e sobretratamento - <em>overdiagnosis</em> e <em>overtreatment</em>).</p>

<div class="clinical-box highlight">
  <h4>Diretriz Oficial do Rastreamento Mamográfico para População Geral de Risco Habitual (MS/INCA)</h4>
  <ul>
    <li><strong>Método de Rastreamento:</strong> Mamografia convencional ou digital bilateral (duas incidências: craniocaudal e mediolateral oblíqua).</li>
    <li><strong>Faixa Etária Alvo:</strong> Mulheres de <strong>50 a 69 anos de idade</strong>.</li>
    <li><strong>Periodicidade Recomendada:</strong> <strong>Bienal (a cada 2 anos)</strong>.</li>
    <li><strong>Por que o Ministério da Saúde não recomenda rastreamento de rotina entre 40 e 49 anos?</strong>
      <ul>
        <li>O tecido mamário de mulheres abaixo de 50 anos é mais denso, reduzindo expressivamente a sensibilidade da mamografia;</li>
        <li>O número de mulheres que precisam ser rastreadas para salvar uma vida (NNT - <em>Number Needed to Screen</em>) é exponencialmente maior do que na faixa de 50 a 69 anos;</li>
        <li>As taxas de falsos-positivos, biópsias desnecessárias de lesões benignas, ansiedade patológica e sobrediagnóstico de carcinomas ductais <em>in situ</em> (CDIS) que jamais evoluiriam clinicamente superam substancialmente o benefício líquido na população de risco habitual.</li>
      </ul>
    </li>
    <li><em>Nota sobre Autoexame e Exame Clínico das Mamas (ECM):</em> O INCA <strong>não recomenda o autoexame sistemático das mamas</strong> como método de rastreamento populacional (pois não reduziu mortalidade em ensaios clínicos e aumentou biópsias benignas). Recomenda-se a conscientização sobre o corpo e mamas (<em>breast awareness</em>), estimulando a mulher a procurar a unidade de saúde diante de qualquer alteração mamária percebida. O Exame Clínico das Mamas deve ser oferecido como parte da consulta ginecológica integral.</li>
  </ul>
</div>

<p><em>Contraste com as Sociedades Médicas (SBM, Febrasgo e CBR):</em> A Sociedade Brasileira de Mastologia preconiza o rastreamento mamográfico anual iniciando-se aos 40 anos de idade até os 74 anos. Nas provas de Residência Médica, é fundamental verificar se a questão indaga a diretriz do <strong>Ministério da Saúde / SUS / INCA</strong> (50-69 anos, bienal) ou a postura da sociedade de especialidade médica privada.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>População de Alto Risco para Câncer de Mama</th>
      <th>Critérios de Definição (Histórico Familiar e Genético)</th>
      <th>Conduta de Rastreamento Especializado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Risco Hereditário Alto (Mutações BRCA1 / BRCA2)</strong></td>
      <td>Mulheres com mutação genética comprovada (BRCA1, BRCA2, TP53, PTEN) ou parentes de primeiro grau portadoras.</td>
      <td>Rastreamento individualizado anual a partir dos 25-30 anos com Ressonância Magnética das mamas associada à Mamografia.</td>
    </tr>
    <tr>
      <td><strong>Histórico Familiar de 1º Grau Precoce</strong></td>
      <td>Parente de primeiro grau com câncer de mama diagnosticado antes dos 50 anos de idade.</td>
      <td>Iniciar mamografia anual 10 anos antes da idade do diagnóstico do parente mais jovem afetado (não antes dos 30 anos).</td>
    </tr>
    <tr>
      <td><strong>Câncer de Mama Masculino</strong></td>
      <td>Histórico familiar de parente de 1º grau do sexo masculino com câncer de mama.</td>
      <td>Encaminhamento para aconselhamento genético e rastreamento de alto risco.</td>
    </tr>
    <tr>
      <td><strong>Histórico de Irradiação Torácica</strong></td>
      <td>Mulheres que receberam radioterapia torácica entre 10 e 30 anos de idade (ex.: Linfoma de Hodgkin).</td>
      <td>Iniciar rastreamento mamográfico e por ressonância magnética 8 anos após a irradiação (mas não antes dos 25 anos).</td>
    </tr>
  </tbody>
</table>

<h3>3.3 Classificação BI-RADS Mamográfica e Condutas na Atenção Primária</h3>
<p>O sistema BI-RADS (<em>Breast Imaging Reporting and Data System</em>) padroniza os laudos mamográficos, estabelecendo categorias preditivas de malignidade e condutas clínicas inequívocas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria BI-RADS</th>
      <th>Interpretação e Achados Típicos</th>
      <th>Risco de Câncer</th>
      <th>Conduta Clínica Mandatória na APS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BI-RADS 0</strong></td>
      <td>Exame incompleto; imagem obscurecida por densidade ou sobreposição tecidual.</td>
      <td>Indeterminado</td>
      <td>Solicitar exames adicionais: compressão localizada, magnificação ou Ultrassonografia mamária complementar.</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 1</strong></td>
      <td>Exame negativo; ausência de qualquer nódulo, calcificação suspeita ou assimetria.</td>
      <td>~0%</td>
      <td>Seguir rastreamento mamográfico de rotina bienal na faixa de 50 a 69 anos.</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 2</strong></td>
      <td>Achados tipicamente benignos: cistos simples, fibroadenoma calcificado ('pipoca'), calcificações vasculares, linfonodo intramamário normal.</td>
      <td>~0%</td>
      <td>Seguir rastreamento mamográfico de rotina bienal na faixa de 50 a 69 anos (tranquilizar a paciente).</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 3</strong></td>
      <td>Achados provavelmente benignos: nódulo oval circunscrito circunscrito, microcalcificações puntiformes monomórficas agrupadas.</td>
      <td>&le; 2%</td>
      <td><strong>Controle radiológico semestral por 2 a 3 anos:</strong> repetir mamografia em 6 meses da mama afetada; mantendo estabilidade, repetir aos 12, 24 e 36 meses. Se estável por 2-3 anos, reclassificar para BI-RADS 2.</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 4</strong></td>
      <td>Achados suspeitos de malignidade (subdividido em 4A baixo risco 2-10%, 4B moderado 10-50%, 4C alto 50-95%): nódulos espiculados, calcificações pleomórficas ramificadas.</td>
      <td>2% a 95%</td>
      <td><strong>Encaminhamento imediato para Biópsia Histopatológica</strong> (Core biopsy ou biópsia assistida a vácuo/mamotomia) na atenção secundária.</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 5</strong></td>
      <td>Achados altamente sugestivos de malignidade: nódulo espiculado denso, microcalcificações lineares ramificadas finas, retração cutânea associada.</td>
      <td>&gt; 95%</td>
      <td><strong>Encaminhamento urgente para Biópsia Histopatológica e Avaliação Mastológica/Oncológica</strong> (prioridade regulatória).</td>
    </tr>
    <tr>
      <td><strong>BI-RADS 6</strong></td>
      <td>Malignidade já confirmada histologicamente por biópsia prévia (aguardando estadiamento ou cirurgia).</td>
      <td>100% (comprovada)</td>
      <td>Coordenação do cuidado oncológico e suporte psicossocial na APS.</td>
    </tr>
  </tbody>
</table>
`
};
