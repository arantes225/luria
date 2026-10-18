// scripts/bloco-07-builders/build-158-part1.mjs

export const sec1 = {
  id: "fundamentos-e-diagnostico-diferencial-das-doencas-exantematicas",
  title: "1. Fundamentos Propedêuticos e Diagnóstico Diferencial Estruturado das Doenças Exantemáticas na Infância",
  body_html: `
<p>As doenças exantemáticas constituem um dos motivos mais frequentes de consulta na Atenção Primária à Saúde e nos serviços de urgência e emergência pediátrica. Um <strong>exantema</strong> define-se como uma erupção cutânea de aparecimento agudo, disseminada pela superfície corporal, frequentemente acompanhada de manifestações sistêmicas (febre, pródromos respiratórios ou gastrointestinais). Quando lesões semelhantes acometem as membranas mucosas (orofaringe, conjuntiva, genitália), recebem a denominação de <strong>enantema</strong>.</p>

<p><strong>A Sistematização Semiológica do Exantema Pediátrico:</strong> Para o médico assistente, a identificação etiológica precisa não depende de exames laboratoriais sofisticados de rotina, mas sim de uma anamnese minuciosa associada à análise semiográfica rigorosa de seis variáveis fundamentais:</p>
<ol>
  <li><strong>Tipo Morfológico da Lesão Elementar:</strong>
    <ul>
      <li><em>Maculopapular:</em> Lesões planas avermelhadas (máculas) associadas a pequenas elevações sólidas palpáveis &lt; 5 mm (pápulas), que clareiam à digitopressão. Subdivide-se em <strong>Morbiliforme</strong> (lesões avermelhadas com áreas de pele sã entremeadas, com tendência à confluência, típico do Sarampo), <strong>Rubeoliforme</strong> (máculas róseas, delicadas, não confluentes, típico da Rubéola e Roséola) e <strong>Escarlatiniforme</strong> (micropápulas confluentes puntiformes eritematosas que conferem sensação tátil de "lixa áspera", típico da Escarlatina).</li>
      <li><em>Vesicobolhoso / Polimórfico:</em> Lesões de conteúdo líquido claro (vesículas) ou purulento (pústulas) que evoluem para crostas (típico da Varicela e da Doença Mão-Pé-Boca).</li>
      <li><em>Purpúrico / Petequial:</em> Lesões hemorrágicas que <strong>NÃO clareiam à digitopressão</strong> (sinal de alerta máximo para meningococcemia, sepse bacteriana e púrpuras vasculares).</li>
    </ul>
  </li>
  <li><strong>Relação Cronológica com a Febre e Pródromos:</strong>
    <ul>
      <li>Febre alta e persistente com exantema surgindo no pico febril associado a pródromos catarrais exuberantes -> <em>Sarampo</em>.</li>
      <li>Febre alta que dura 3 a 5 dias e <strong>DESAPARECE SUBITAMENTE EM CRISE, surgindo o exantema imediatamente após o término da febre</strong> -> <em>Exantema Súbito (Roséola Infantil)</em>.</li>
      <li>Febre moderada associada a faringoamigdalite bacteriana exsudativa com exantema surgindo 24 a 48 horas depois -> <em>Escarlatina</em>.</li>
      <li>Exantema que surge sem febre ou com febre baixa/subfebril em criança com excelente estado geral -> <em>Eritema Infeccioso</em>.</li>
    </ul>
  </li>
  <li><strong>Padrão de Distribuição e Progressão Corporal:</strong>
    <ul>
      <li>Progressão <strong>Craniocaudal com início na linha de implantação dos cabelos/região retroauricular</strong> e disseminação centrífuga lenta ao longo de 3 dias -> <em>Sarampo</em>.</li>
      <li>Progressão <strong>Craniocaudal de evolução ultra-rápida (surge e some em 24 a 48 horas)</strong> -> <em>Rubéola</em>.</li>
      <li>Distribuição <strong>Centrípeta com polimorfismo regional simultâneo</strong> (couro cabeludo, tronco e face) -> <em>Varicela</em>.</li>
      <li>Início na face com aspecto de "bochechas esbofeteadas" seguido de padrão reticulado rendilhado nos membros -> <em>Eritema Infeccioso</em>.</li>
    </ul>
  </li>
  <li><strong>Evolução e Tipo de Descamação Cutânea Residual:</strong>
    <ul>
      <li>Descamação <strong>Furfurácea (fina, pulverulenta, "em farelo de trigo")</strong> -> <em>Sarampo</em>.</li>
      <li>Descamação <strong>Lamelar / Foliácea em lâminas escamosas (especialmente nas polpas digitais das mãos e pés, "em luva e bota")</strong> -> <em>Escarlatina</em> e <em>Doença de Kawasaki</em>.</li>
      <li>Ausência de descamação residual -> <em>Rubéola</em>, <em>Exantema Súbito</em> e <em>Eritema Infeccioso</em>.</li>
    </ul>
  </li>
  <li><strong>Presença de Enantemas Patognomônicos na Cavidade Oral:</strong>
    <ul>
      <li><em>Manchas de Koplik</em> (pontos esbranquiçados como grãos de areia na mucosa jugal) -> <em>Sarampo</em>.</li>
      <li><em>Manchas de Forchheimer</em> (petéquias róseas no palato mole) -> <em>Rubéola</em>.</li>
      <li><em>Língua em Framboesa</em> (hipertrofia de papilas gustativas fungiformes) -> <em>Escarlatina</em> e <em>Doença de Kawasaki</em>.</li>
      <li><em>Vesículas ulceradas dolorosas em palato, pilares amigdalianos e mucosa jugal</em> -> <em>Doença Mão-Pé-Boca e Herpangina</em>.</li>
    </ul>
  </li>
  <li><strong>História Vacinal Prévia e Contatos Epidemiológicos:</strong> Estado de imunização no Cartão de Vacinas contra Tríplice Viral (Sarampo, Caxumba e Rubéola) e Varicela.</li>
</ol>
`
};

export const sec2 = {
  id: "sarampo-e-rubeola-diagnostico-e-enantemas",
  title: "2. Sarampo versus Rubéola: Fisiopatologia, Sinais Patognomônicos e Complicações",
  body_html: `
<h3>2.1. Sarampo (O Vírus do Sarampo e a Imunossupressão Pós-Infecciosa)</h3>
<p>O Sarampo é uma das infecções virais humanas mais contagiosas conhecidas na medicina, causada por um vírus de RNA fita simples de polaridade negativa pertencente à família <em>Paramyxoviridae</em>, gênero <em>Morbillivirus</em>. O seu número básico de reprodução (R0) varia de 12 a 18 (um único indivíduo infectado transmite a doença para 12 a 18 pessoas suscetíveis em uma comunidade não vacinada). A transmissão ocorre por <strong>aerossóis de partículas finas que permanecem suspensas no ar por até 2 horas</strong> em ambientes fechados após a saída do doente.</p>

<p><strong>Amnésia Imunológica Induzida pelo Sarampo:</strong> O vírus do sarampo possui tropismo específico pelo receptor CD150 (SLAM) expresso na superfície de linfócitos T e B de memória e células dendríticas. A infecção maciça dessas células induz apoptose generalizada dos clones de memória, resultando em uma profunda <strong>"amnésia imunológica" que dura de 2 a 3 anos após o sarampo</strong>, apagando a imunidade celular e humoral previamente adquirida contra dezenas de outros patógenos e multiplicando a mortalidade infantil tardia por pneumonias e diarreias bacterianas secundárias.</p>

<p><strong>Fases Clínicas do Sarampo:</strong></p>
<ol>
  <li><strong>Período de Incubação:</strong> Dura habitualmente de 10 a 14 dias (completamente assintomático).</li>
  <li><strong>Período Prodrômico / Catarral (Dura de 3 a 5 dias):</strong> Caracteriza-se por <strong>febre alta (39 a 40 ºC) associada à exuberante tríade dos 3 "C"s: Tosse seca metálica (Cough), Coriza hialina profusa (Coryza) e Conjuntivite com fotofobia intensa e lacrimejamento (Conjunctivitis)</strong>. A criança apresenta fácies de sofrimento ("fácies sarampionosa"), prostração intensa e edema palpebral.</li>
  <li><strong>O Enantema Patognomônico — As Manchas de Koplik:</strong> Surgem cerca de <strong>24 a 48 horas ANTES do aparecimento do exantema cutâneo</strong> (no final do período prodrômico). Apresentam-se como micropápulas pontiformes esbranquiçadas ou branco-azuladas, com halo eritematoso fino ao redor, semelhantes a "pequenos grãos de areia ou sal grosso polvilhados sobre fundo vermelho", localizadas na <strong>mucosa jugal oral na altura do 2º molar inferior</strong>. Desaparecem 24 a 48 horas após a eclosão do exantema. <em>Sua presença é patognomônica de Sarampo!</em></li>
  <li><strong>Período Exantemático:</strong> Ocorre a erupção de um <strong>exantema maculopapular morbiliforme avermelhado</strong>. Tem início na linha de implantação do couro cabeludo, atrás das orelhas e na fronte (região retroauricular). Dissemina-se em <strong>progressão craniocaudal lenta ao longo de 3 dias</strong> (atinge pescoço e tórax no 1º dia, abdome e membros superiores no 2º dia e membros inferiores no 3º dia). As lesões confluem amplamente no tronco, deixando pequenas ilhas de pele sã entremeadas. <em>Importante:</em> A febre atinge seu pico máximo exatamente no momento da erupção exantemática!</li>
  <li><strong>Período de Convalescença:</strong> Após cerca de 5 a 6 dias de evolução, o exantema empalidece e cede na mesma ordem em que surgiu (craniocaudal), evoluindo com a clássica <strong>descamação furfurácea (fina e pulverulenta)</strong> associada a manchas acastanhadas residuais hiperpigmentadas transitórias.</li>
</ol>

<div class="clinical-box highlight">
  <h4>A Suplementação Terapêutica Obrigatória de Vitamina A</h4>
  <p>O vírus do sarampo induz uma depleção aguda e catastrófica dos estoques hepáticos de retinol (Vitamina A), mesmo em crianças previamente bem nutridas. A hipovitaminose A secundária agrava a destruição do epitélio respiratório e corneal, multiplicando o risco de cegueira (xeroftalmia) e morte por pneumonia. <strong>A OMS e o Ministério da Saúde recomendam a administração IMEDIATA de VITAMINA A por via oral em 2 doses consecutivas (no dia do diagnóstico e no dia seguinte) para TODOS os casos confirmados de Sarampo, independentemente do estado nutricional prévio!</strong>
  <br>• Crianças &lt; 6 meses: 50.000 UI por dose.
  <br>• Crianças de 6 a 11 meses: 100.000 UI por dose.
  <br>• Crianças &gt;= 12 meses: 200.000 UI por dose.</p>
</div>

<p><strong>Complicações do Sarampo:</strong> A complicação mais frequente é a <strong>Otite Média Aguda bacteriana</strong>. A principal causa de óbito por sarampo na infância é a <strong>Pneumonia</strong> (que pode ser primária de células gigantes pelo próprio vírus do sarampo — Pneumonia de Hecht, ou secundária a superinfecção bacteriana por <em>Streptococcus pneumoniae</em> e <em>Staphylococcus aureus</em>). Uma complicação neurológica tardia devastadora e 100% fatal é a <strong>Panencefalite Esclerosante Subaguda (PEES)</strong>, que surge 6 a 10 anos após a infecção primária por persistência mutante do vírus no sistema nervoso central, manifestando-se por demência progressiva, mioclonias e coma.</p>

<h3>2.2. Rubéola (O "Sarampo Alemão" e a Síndrome da Rubéola Congênita)</h3>
<p>A Rubéola é causada por um vírus de RNA da família <em>Matonaviridae</em> (antiga <em>Togaviridae</em>), gênero <em>Rubivirus</em>. No pós-natal, é uma doença benigna e autolimitada ("sarampo de três dias"), caracterizada por:</p>
<ul>
  <li><strong>Pródromos Leves:</strong> Febre baixa ou subfebril, mal-estar discreto e sintomas respiratórios superiores discretos.</li>
  <li><strong>A Linfadenopatia Retroauricular e Suboccipital Dolorosa:</strong> É a marca clínica e semiológica da Rubéola. Ocorre o aumento doloroso e fibroelástico de gânglios linfáticos nas cadeias <strong>retroauriculares, suboccipitais e cervicais posteriores</strong>, que surge precocemente cerca de 24 a 48 horas antes do exantema e persiste por semanas.</li>
  <li><strong>O Exantema Rubeoliforme:</strong> Máculas róseas, pequenas, delicadas, <strong>não confluentes</strong>, que também possuem progressão craniocaudal, porém de <strong>evolução e disseminação ultra-rápida (surge, dissemina-se pelo corpo e desaparece em menos de 2 a 3 dias)</strong>, sem descamação residual.</li>
  <li><strong>As Manchas de Forchheimer:</strong> Enantema caracterizado por pequenas lesões petequiais ou maculares avermelhadas situadas no <strong>palato mole</strong> (presente em 20% dos casos; não é patognomônico, podendo ocorrer na escarlatina e mononucleose).</li>
  <li><strong>Artrite / Artralgias:</strong> Complicação frequente em mulheres adolescentes e adultas jovens acometendo punhos e pequenas articulações das mãos de forma transitória.</li>
</ul>

<div class="clinical-box alert">
  <h4>O Perigo Real da Rubéola: A Síndrome da Rubéola Congênita (SRC)</h4>
  <p>A verdadeira relevância da vigilância epidemiológica e da vacinação contra a rubéola é proteger as <strong>mulheres gestantes suscetíveis contra a infecção primária durante o primeiro trimestre gestacional</strong>. O vírus atravessa a placenta e infecta o embrião, induzindo apoptose e inibição da divisão celular nos órgãos em organogênese ativa. A <strong>Síndrome da Rubéola Congênita clássica</strong> manifesta-se pela tétrade de Gregg:</p>
  <ol>
    <li><strong>Surdez Neurossensorial Bilateral</strong> (a sequela mais comum, presente em &gt; 80% dos casos);</li>
    <li><strong>Cardiopatia Congênita:</strong> Com destaque absoluto para a <strong>Persistência do Canal Arterial (PCA)</strong> e a <strong>Estenose Supravalvar ou dos Ramos da Artéria Pulmonar</strong>;</li>
    <li><strong>Catarata Congênita Bilateral com Microftalmia</strong> (opacificação nuclear do cristalino com perda do reflexo vermelho ocular);</li>
    <li><strong>Lesões Encefálicas:</strong> Microcefalia, meningoencefalite crônica e atraso grave do desenvolvimento neuropsicomotor, associada ao exantema purpúrico neonatal em "muffin de mirtilo" (<em>blueberry muffin baby</em> por hematopoiese dérmica extramedular).</li>
  </ol>
</div>
`
};
