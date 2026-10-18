// scripts/bloco07_group_a/dii-expansao.mjs
export const secDiiExpansao = [
  {
    id: 'rastreamento-displasia-e-cancer-colorretal',
    title: '3.1 Rastreamento de Displasia e Câncer Colorretal nas DIIs: Protocolo SCENIC e Cromoendoscopia',
    body_html: `
<p>O risco cumulativo de câncer colorretal (CCR) encontra-se marcadamente elevado em pacientes com colite inflamatória extensa de longa data (Retocolite Ulcerativa extensa e Doença de Crohn colônica acometendo mais de um terço do cólon). Diferentemente da via esporádica clássica do adenoma-carcinoma, a carcinogênese nas DIIs segue a <strong>via da inflamação-displasia-carcinoma</strong>:</p>

<h3>Fisiopatologia da Carcinogênese Inflamatória</h3>
<ul>
  <li>O estresse oxidativo crônico, a liberação contínua de óxido nítrico e citocinas pró-inflamatórias (TNF-alfa, IL-6) causam instabilidade genômica difusa e mutações precoces no gene supressor de tumor <strong>TP53</strong> (ao contrário do CCR esporádico, onde a mutação no <em>APC</em> é o evento inicial e o <em>TP53</em> é tardio);</li>
  <li>Ocorre o fenômeno de "cancerização de campo", com áreas de displasia multifocal plana, histologicamente indistinguíveis da mucosa inflamada ao exame endoscópico convencional de luz branca, frequentemente sem a formação de pólipos protuberantes prévios;</li>
  <li>O risco relativo de neoplasia aumenta após <strong>8 a 10 anos do início dos sintomas</strong>, atingindo risco cumulativo de cerca de 2% aos 10 anos, 8% aos 20 anos e 18% aos 30 anos de doença colônica.</li>
</ul>

<h3>Diretrizes de Vigilância Endoscópica (Consenso Internacional SCENIC)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Vigilância</th>
      <th>Recomendação Formal Contemporânea</th>
      <th>Justificativa Clínica e Evidências</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Início do Rastreamento</strong></td>
      <td><strong>8 anos após o início dos sintomas</strong> para pancolite ou colite esquerda extensa.</td>
      <td>Marca o período de transição em que o risco de displasia e transformação maligna sofre incremento exponencial.</td>
    </tr>
    <tr>
      <td><strong>Exceção de Alto Risco Imediato</strong></td>
      <td><strong>Associação com Colangite Esclerosante Primária (CEP):</strong> Início <strong>IMEDIATO no momento do diagnóstico de CEP</strong>, independentemente do tempo de evolução da DII, com <strong>colonoscopia anual obrigatória por toda a vida</strong>.</td>
      <td>A coexistência de CEP eleva o risco de neoplasia colorretal em mais de 5 vezes, além de acelerar o desenvolvimento de tumores no cólon direito, que frequentemente cursam de forma assintomática e agressiva.</td>
    </tr>
    <tr>
      <td><strong>Técnica Endoscópica Padrão-Ouro</strong></td>
      <td><strong>Cromoendoscopia de Alta Definição</strong> (com corantes tópicos: índigo carmim a 0,1% ou azul de metileno a 0,1%; ou cromoendoscopia virtual como NBI/BLI/i-SCAN) com <strong>Biópsias Direcionadas</strong>.</td>
      <td>A cromoendoscopia realça os padrões de cripta e margens de lesões displásicas sutis, superando categoricamente as antigas biópsias aleatórias a cada 10 cm (protocolo clássico de 32 a 40 biópsias cegas).</td>
    </tr>
    <tr>
      <td><strong>Classificação das Lesões Displásicas</strong></td>
      <td>Classificadas em <strong>Lesões Visíveis Endoscopicamente</strong> (polipoides vs não polipoides/planas, com bordas distintas ou indistintas) e <strong>Displasia Invisível</strong> (detectada apenas em biópsias aleatórias em mucosa endoscopicamente normal).</td>
      <td>Orienta a conduta de ressecção endoscópica versus proctocolectomia total curativa.</td>
    </tr>
    <tr>
      <td><strong>Conduta na Displasia Detectada</strong></td>
      <td>• Lesão displásica visível com margens bem demarcadas e ressecável: <strong>Ressecção Endoscópica Completa</strong> (polipectomia ou mucosectomia) associada a biópsias da mucosa ao redor para afastar displasia invisível adjacente.<br>• <strong>Displasia de Alto Grau Invisível OU Displasia Não Ressecável Endoscopicamente:</strong> Indicação formal e mandatória de <strong>PROCTOCOLECTOMIA TOTAL</strong> devido ao risco concomitante de adenocarcinoma sincrônico invasor oculto em mais de 40% a 50% dos espécimes cirúrgicos.</td>
      <td>Prevenção do desenvolvimento de câncer colorretal invasor e óbito por neoplasia avançada.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'doenca-de-crohn-perianal-complexa',
    title: '5.1 Doença de Crohn Perianal Complexa: Classificação de Parks, Cirurgia Poupadeira e Sedenhos',
    body_html: `
<p>O acometimento orificial perianal acomete cerca de um terço dos pacientes com Doença de Crohn ao longo de sua evolução e representa um dos cenários de maior impacto na qualidade de vida e risco de incontinência fecal permanente.</p>

<h3>Classificação Anatômica e Diferenciação entre Fístula Simples e Complexa</h3>
<p>Para fins de planejamento cirúrgico e prognóstico, as fístulas perianais de Crohn são categorizadas pelo consenso da <em>American Gastroenterological Association</em> (AGA):</p>
<ul>
  <li><strong>Fístula Perianal Simples:</strong> Trajeto fistuloso baixo (subcutâneo, submucoso ou interesfincteriano baixo), orifício externo único, sem dor retal intensa nem febre (ausência de abscesso associado), sem fístula retovaginal e <strong>com mucosa retal macroscopicamente normal (sem proctite ativa associada)</strong>;</li>
  <li><strong>Fístula Perianal Complexa:</strong> Apresenta pelo menos uma das seguintes características de gravidade:
    <ul>
      <li>Trajeto fistuloso alto transesfincteriano alto (englobando &gt; 30% do esfíncter anal externo), supraesfincteriano ou extraesfincteriano;</li>
      <li>Múltiplos orifícios externos secundários (aspecto em "regador de jardim");</li>
      <li>Associação com <strong>coleção purulenta / abscesso isquiorretal ou pelvirretal oculto</strong>;</li>
      <li>Fístula retovaginal ou retovesical associada;</li>
      <li><strong>Presença de retite/proctite inflamatória ativa grave</strong> na mucosa retal adjacente.</li>
    </ul>
  </li>
</ul>

<h3>Propedêutica de Imagem Padrão-Ouro</h3>
<p>A avaliação fidedigna da anatomia esfincteriana exige a combinação de <strong>Ressonância Magnética da Pelve com Protocolo para Fístula Perianal</strong> (alta acurácia para caracterizar o trajeto em relação ao músculo elevador do ânus e esfíncter externo) e o <strong>Exame sob Anestesia (EUA - <em>Examination Under Anesthesia</em>)</strong> realizado pelo cirurgião coloproctologista no centro cirúrgico com palpação minuciosa e cateterização atraumática com estilete rombo.</p>

<h3>Estratégia Terapêutica Integrada Clínico-Cirúrgica</h3>
<div class="clinical-box info-box">
  <h4>A Sequência Correta de Manejo na Fístula Complexa</h4>
  <ol>
    <li><strong>Passo 1 — Drenagem Ampla de Abscessos e Passagem de Sedenho Frouxo (<em>Loose Seton</em>):</strong>
      <ul>
        <li>Qualquer coleção purulenta deve ser drenada prontamente;</li>
        <li>Passa-se um <strong>fio de látex ou silicone macio e atraumático (sedenho frouxo)</strong> através do trajeto fistuloso, exteriorizando-o pelo orifício anal e unindo suas extremidades com fio inabsorvível sem tração mecânica;</li>
        <li><em>Objetivo Primordial:</em> Manter o orifício pérvio para drenagem purulenta contínua, prevenindo o fechamento superficial da pele e a formação de novos abscessos sob tensão. <strong>É formalmente contraindicada a fistulotomia com secção esfincteriana</strong> pelo altíssimo risco de incontinência fecal permanente!;</li>
      </ul>
    </li>
    <li><strong>Passo 2 — Terapia Medicamentosa Combinada:</strong>
      <ul>
        <li>Antibioticoterapia inicial com <strong>Ciprofloxacino (500 mg 12/12h) e/ou Metronidazol (400 mg 8/8h)</strong> por 4 a 8 semanas para reduzir a carga bacteriana e a secreção fecal;</li>
        <li><strong>Agente Biológico Anti-TNF:</strong> <strong>Infliximabe (5 mg/kg)</strong> é o fármaco com maior nível de evidência científica comprovada para cicatrização de fístulas perianais de Crohn (estudo ACCENT II), preferencialmente em comboterapia com azatioprina;</li>
      </ul>
    </li>
    <li><strong>Passo 3 — Retirada do Sedenho e Procedimentos Avançados de Fechamento:</strong>
      <ul>
        <li>Após controle completo da inflamação luminal e cessação da secreção purulenta (habitualmente após 6 a 12 meses de biológico), o sedenho pode ser removido, ou procede-se ao fechamento por técnicas preservadoras de esfíncter: avanço de retalho mucoso (<em>mucosal advancement flap</em>), ligadura do trajeto interesfincteriano (técnica LIFT) ou injeção de células-tronco mesenquimais alogênicas expandidas (Darvadstrocel).</li>
      </ul>
    </li>
  </ol>
</div>
`
  },
  {
    id: 'dii-em-populacoes-especiais-gestacao-pediatria',
    title: '6.1 Manejo em Populações Especiais: Gravidez, Lactação e DII de Início Muito Precoce (VEO-IBD)',
    body_html: `
<p>O surgimento ou acompanhamento das DIIs durante o ciclo gravídico-puerperal e na primeira infância impõe decisões farmacológicas pautadas no binômio segurança e controle da doença.</p>

<h3>Gravidez e Lactação na Doença Inflamatória Intestinal</h3>
<p>O maior determinante do desfecho obstétrico favorável (prevenção de abortamento espontâneo, prematuridade e baixo peso ao nascer) é o <strong>controle rigoroso da atividade inflamatória antes da concepção e durante a gestação</strong>:</p>
<ul>
  <li><strong>Momento Ideal da Concepção:</strong> Aconselha-se que a gravidez ocorra com a doença em <strong>remissão clínica e endoscópica há pelo menos 6 meses consecutivos</strong>;</li>
  <li><strong>Segurança dos Fármacos na Gestação:</strong>
    <ul>
      <li><em>Mesalazina e Sulfassalazina:</em> Seguras na gestação e lactação (sulfassalazina exige suplementação de ácido fólico em dose mais alta: 5 mg/dia pelo bloqueio competitivo na absorção de folato);</li>
      <li><em>Corticosteroides (Prednisona):</em> Seguros para controle de surtos agudos graves (pequeno aumento de fenda palatina no primeiro trimestre, amplamente superado pelo benefício materno-fetal do controle da colite);</li>
      <li><em>Tiopurinas (Azatioprina e 6-Mercaptopurina):</em> Seguras na gravidez e amamentação. A manutenção do tratamento em mulheres já adaptadas é recomendada pelas diretrizes mundiais;</li>
      <li><em>Anti-TNF (Infliximabe e Adalimumabe):</em> São anticorpos IgG1 que sofrem transporte placentário ativo mediado pelo receptor Fc neonatal a partir do final do segundo trimestre. Podem ser mantidos com segurança; se a paciente estiver em remissão sustentada profunda, pode-se programar a última dose algumas semanas antes do parto para minimizar os níveis séricos neonatais;</li>
      <li><em>ATENÇÃO VACINAL PEDIÁTRICA:</em> O recém-nascido exposto a anti-TNF no terceiro trimestre intraútero <strong>NÃO PODE RECEBER VACINAS DE VÍRUS VIVO ATENUADO (BCG e Rotavírus) nos primeiros 6 a 12 meses de vida</strong> devido ao risco de infecção disseminada fatal!;</li>
      <li><em>Fármacos FORMALMENTE CONTRAINDICADOS / TERATOGÊNICOS:</em> <strong>Metotrexato</strong> (teratogênese clássica, abortivo e malformações craniofaciais/ósseas severas - exige suspensão e contracepção por 3 a 6 meses antes da concepção em ambos os parceiros!), <strong>Talidomida</strong> e inibidores de JAK (Tofacitinibe/Upadacitinibe).</li>
    </ul>
  </li>
  <li><strong>Via de Parto:</strong> O parto por via vaginal é a regra geral. <strong>A indicação formal de PARTO CESARIANA eletivo ocorre exclusivamente na presença de Doença de Crohn com fístulas ou lesões perianais ATIVAS</strong>, a fim de evitar laceração perineal e dano esfincteriano irreversível.</li>
</ul>

<h3>Doença Inflamatória Intestinal de Início Muito Precoce (VEO-IBD)</h3>
<p>Casos diagnosticados em crianças com menos de 6 anos de idade (<em>Very Early Onset IBD</em>) decorrem predominantemente de <strong>erros inatos da imunidade e doenças monogênicas</strong> (como mutações nos receptores de Interleucina-10 - <em>IL10R1</em> e <em>IL10R2</em>, ou defeitos no gene <em>FOXP3</em> na síndrome IPEX). Cursam com colite refratária grave e fístulas precoces, sendo habitualmente não responsivos aos biológicos clássicos e demandando transplante alogênico de células-tronco hematopoiéticas (TCTH) para cura definitiva.</p>
`
  }
];
