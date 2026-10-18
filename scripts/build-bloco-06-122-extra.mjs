// scripts/build-bloco-06-122-extra.mjs
// Seção extra de aprofundamento para Aula 122: Perfuração de Víscera Oca

export const secIatrogeniasECPRE = {
  id: 'perfuracoes-iatrogenicas-endoscopicas-cpre-classificacao-stapfer',
  title: '4. Perfurações Iatrogênicas em Procedimentos Endoscópicos, CPRE (Classificação de Stapfer) e Cirurgias Eletivas',
  body_html: `
<h3>O Espectro Crescente das Perfurações Gastrointestinais Iatrogênicas</h3>
<p>Com a explosão de procedimentos diagnósticos e terapêuticos avançados na gastroenterologia intervencionista contemporânea — incluindo colonoscopia com ressecção endoscópica de grandes pólipos (EMR / ESD), ecoendoscopia com punção (EUS-FNA) e colangiopancreatografia retrógrada endoscópica (CPRE) —, as <strong>perfurações iatrogênicas tornaram-se uma causa relevante e desafiadora de abdome agudo perfurativo hospitalar</strong>.</p>

<h3>Perfurações Duodenais Pós-CPRE: A Classificação de Stapfer</h3>
<p>A CPRE associa-se a uma taxa de perfuração duodenal ou biliar que varia entre <strong>0,5% e 1,5%</strong> dos procedimentos. Para nortear a conduta terapêutica imediata (cirúrgica aberta versus conservadora não operatória), adotou-se internacionalmente a <strong>Classificação de Stapfer (2000)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Stapfer</th>
      <th>Mecanismo da Lesão e Localização Anatômica Precisa</th>
      <th>Manifestação Clínica e Achados na Tomografia Computadorizada</th>
      <th>Conduta Terapêutica Padrão Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo I (Perfuração da Parede Duodenal Lateral)</strong></td>
      <td><strong>Trauma mecânico direto pela extremidade rígida do duodenoscópio</strong> contra a parede medial ou lateral da segunda ou terceira porção do duodeno, geralmente durante introdução difícil sob anatomia distorcida (divertículos peripapilares ou estenoses).</td>
      <td>Perfuração geralmente <strong>ampla e intraperitoneal livre</strong>. Cursa com dor abdominal intensa precoce, saída de grande volume de bile e contraste iodado para a cavidade peritoneal e pneumoperitônio maciço à TC.</td>
      <td><strong>INDICAÇÃO CIRÚRGICA DE EMERGÊNCIA IMEDIATA</strong>: Laparotomia exploradora, duodenorrafia primária com pontos de reforço e patch de omento vascularizado, exclusão pilórica ou drenagem duodenal descompressiva com sonda nasogástrica avançada, associada a ampla drenagem tubular da loja duodenal e retroperitônio.</td>
    </tr>
    <tr>
      <td><strong>Tipo II (Perfuração Peri-Ampular / Peripapilar)</strong></td>
      <td>Laceração transmural durante a realização da <strong>papilotomia / esfincterotomia endoscópica com bisturi diatérmico</strong> (o corte ultrapassa o esfíncter muscular de Oddi e corta a parede do duodeno).</td>
      <td>Perfuração <strong>estritamente retroperitoneal</strong>. O gás e a bile dissecam para o espaço pararrenal anterior direito e retroperitônio. Cursa com dor lombar ou em flanco direito, febre subaguda e retropneumoperitônio na TC (gás contornando a borda renal direita e psoas).</td>
      <td><strong>Tratamento Clínico Conservador Inicial em mais de 80% dos casos</strong> (se o paciente permanecer estável): Jejum absoluto, sonda nasogástrica em aspiração contínua, antibioticoterapia venosa de amplo espectro cobrindo flora biliar e entérica (Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) e drenagem biliar com prótese biliar plástica para desviar a bile da área perfurada. Cirurgia apenas se sepse refratária ou coleções retroperitoneais volumosas.</td>
    </tr>
    <tr>
      <td><strong>Tipo III (Perfuração dos Ductos Biliares ou Pancreáticos)</strong></td>
      <td>Guia de fio metálico (guidewire) ou cesto de dormia/balão que transfixa a via biliar intra ou extra-hepática durante instrumentação difícil de cálculos.</td>
      <td>Pequena coleção ou extravasamento mínimo de contraste na colangiografia.</td>
      <td><strong>Tratamento puramente conservador / endoscópico</strong>: passagem de prótese biliar ou stent pancreático e antibioticoterapia. Raramente requer drenagem percutânea ou cirurgia.</td>
    </tr>
    <tr>
      <td><strong>Tipo IV (Pneumoperitônio ou Retropneumoperitônio Isolado por Barotrauma)</strong></td>
      <td>Passagem de microbolhas de ar comprimido insuflado pelo aparelho endoscópico através de microporos da parede sem solução macroscópica de continuidade anatômica.</td>
      <td>Presença de gás livre retroperitoneal ou subdiafragmático discreto na TC em <strong>paciente completamente assintomático, afebril, com abdome flácido e exames inflamatórios normais</strong>.</td>
      <td><strong>Conduta 100% expectante</strong>. Não necessita de antibióticos ou cirurgia; apenas observação clínica ambulatorial ou internação curta por 24 horas.</td>
    </tr>
  </tbody>
</table>

<h3>Perfurações Iatrogênicas na Colonoscopia</h3>
<p>Ocorre em cerca de <strong>1 em cada 1.000 a 2.000 colonoscopias diagnósticas</strong>, elevando-se para <strong>1% a 3% em colonoscopias terapêuticas com ressecção de grandes lesões sésseis ou planas</strong>:</p>
<ul>
  <li><strong>Reconhecimento Imediato Intraoperatório (Fechamento com Clipes Endoscópicos):</strong>
    <p>Se a perfuração for identificada pelo endoscopista durante a realização da própria colonoscopia (visualização das fibras musculares longitudinais e da gordura mesocólica ou epiploica amarela através da falha na mucosa), e o cólon estiver adequadamente preparado e limpo, a conduta de escolha de primeira linha é a <strong>APLICAÇÃO IMEDIATA DE CLÍPES METÁLICOS ENDOSCÓPICOS (HEMOCLIPES ou OTSC - Over-the-Scope Clip)</strong> para aproximação hermética das bordas mucosas;</p>
  </li>
  <li><strong>Manejo Conservador Pós-Fechamento Endoscópico com Sucesso:</strong>
    <p>Paciente é internado em enfermaria cirúrgica sob dieta zero por 24 a 48 horas, hidratação intravenosa cristaloide e antibioticoterapia venosa profilática. Se o paciente permanecer afebril, com abdome flácido e sem taquicardia, progride-se a dieta e concede-se alta hospitalar segura;</p>
  </li>
  <li><strong>Critérios Mandatórios para Laparotomia / Videolaparoscopia de Urgência:</strong>
    <ol>
      <li>Falha ou impossibilidade técnica no fechamento endoscópico por clipe (defeito maior que 1,5 a 2,0 cm);</li>
      <li>Diagnóstico tardio ($> 12$ a 24 horas após o procedimento) com aparecimento de dor abdominal difusa, taquicardia e febre;</li>
      <li>Presença de <strong>sinais francos de peritonite peritoneal (defesa muscular involuntária, descompressão brusca dolorosa difusa e sepse)</strong>;</li>
      <li>Grande extravasamento de fezes residuais para a cavidade peritoneal;</li>
      <li><em>Conduta Operatória:</em> Sutura primária com pontos simples invaginantes em dois planos se campo minimamente contaminado e sem isquemia (com fechamento da parede); ressecção segmentar (colectomia) se necrose extensa ou lesão térmica circunferencial grave.</li>
    </ol>
  </li>
</ul>
`
};

export const secTraumaEPeritoniteTerciaria = {
  id: 'trauma-de-viscera-oca-e-peritonite-terciaria',
  title: '6. Trauma Abdominal com Perfuração Oculta de Delgado e o Desafio da Peritonite Terciária',
  body_html: `
<h3>O Desafio Diagnóstico da Perfuração Traumática de Intestino Delgado</h3>
<p>No trauma abdominal fechado (especialmente em acidentes automobilísticos de alta energia com desaceleração violenta), a perfuração do intestino delgado e as desinserções de mesentério figuram entre as <strong>lesões cirúrgicas mais traiçoeiras e com maior taxa histórica de diagnóstico postergado</strong>:</p>
<ul>
  <li><strong>O Mecanismo do Esmagamento e Alça Fechada:</strong> O cinto de segurança de dois pontos (abdominal) ou o volante comprime o jejuno e o íleo diretamente contra a coluna lombar rígida posterior, ou oclui temporariamente as duas extremidades de uma alça, gerando aumento explosivo da pressão hidrostática intraluminal com rotura da borda antimesentérica;</li>
  <li><strong>O Sinal do Cinto de Segurança (Seat-Belt Sign):</strong> A presença de equimose transversa e escoriações na parede abdominal inferior correspondentes à faixa do cinto de segurança associa-se a um <strong>risco superior a 25% a 30% de lesão de víscera oca perfurada ou avulsão mesentérica oculta</strong>;</li>
  <li><strong>Limitações da Tomografia Inicial no Trauma Precoce:</strong> A TC de abdome realizada imediatamente na sala de trauma (na primeira hora após a colisão) pode <strong>NÃO demonstrar pneumoperitônio livre em até 20% a 30% dos pacientes com perfuração de delgado</strong> (o ar intraluminal no delgado é escasso no momento do acidente). Nesses casos, os sinais tomográficos indiretos mais importantes são:
    <ol>
      <li><strong>Líquido livre intraperitoneal na pelve ou espaço de Morison na AUSÊNCIA de lesão demonstrável de vísceras sólidas (fígado e baço intactos)</strong> — clássico sinal de suspeita máxima de rotura de delgado;</li>
      <li>Espessamento focal da parede de uma alça de delgado ($> 3$ a 4 mm);</li>
      <li>Densificação e hematoma focal do mesentério adjacente;</li>
    </ol>
  </li>
  <li><strong>Conduta Obrigatória no Paciente com Líquido Livre sem Lesão de Víscera Sólida:</strong>
    <p>O paciente deve ser submetido a <strong>internação e observação clínica seriada com exame físico abdominal rigoroso a cada 2 a 4 horas</strong> associado à contagem seriada de leucócitos. Se o paciente desenvolver dor abdominal progressiva, taquicardia inexplicada, defesa muscular localizada ou febre, a <strong>Videolaparoscopia Diagnóstica ou Laparotomia Exploradora Imediata</strong> é mandatória para evitar a evolução para peritonite bacteriana fulminante.</p>
  </li>
</ul>

<h3>A Peritonite Terciária: O Esgotamento Imunológico do Paciente Crítico</h3>
<p>A <strong>Peritonite Terciária</strong> é definida como a <strong>infecção intra-abdominal persistente, recorrente ou refratária que se manifesta mais de 48 horas após uma intervenção cirúrgica prévia bem-sucedida para peritonite secundária</strong>, caracterizada por falência orgânica progressiva e exaustão imunológica profunda do hospedeiro:</p>
<ul>
  <li><strong>Microbiologia Distinta e Resistente:</strong> Enquanto a peritonite primária é monomicrobiana e a secundária é polimicrobiana comunitária (<em>E. coli</em>, <em>Bacteroides</em>), a peritonite terciária é causada predominantemente por <strong>patógenos hospitalares multirresistentes de baixa virulência intrínseca e fungos invasivos</strong>:
    <ul>
      <li><em>Enterococcus faecalis</em> e <em>Enterococcus faecium</em> (incluindo linhagens VRE resistentes à vancomicina);</li>
      <li>Bacilos Gram-negativos não fermentadores multirresistentes: <strong>Pseudomonas aeruginosa</strong>, <strong>Acinetobacter baumannii</strong> e <em>Stenotrophomonas maltophilia</em>;</li>
      <li>Espécies fúngicas do gênero <strong>Candida</strong> (<em>Candida albicans</em> e <em>Candida non-albicans</em>: <em>C. glabrata</em>, <em>C. krusei</em>, <em>C. tropicalis</em>);</li>
    </ul>
  </li>
  <li><strong>Fisiopatologia do Colapso da Resposta do Hospedeiro:</strong> O paciente encontra-se em um estado crônico de <em>paralisia imune e tempestade inflamatória contínua</em>. Novas cirurgias abertas agressivas e repetidas na tentativa de "encontrar novos focos de pus" frequentemente resultam em maiores danos teciduais, fístulas intestinais iatrogênicas e aumento da mortalidade (que ultrapassa <strong>50% a 60%</strong> na peritonite terciária);</li>
  <li><strong>Abordagem Terapêutica Racional:</strong>
    <ol>
      <li>Otimização do suporte intensivo em UTI e suporte nutricional parenteral;</li>
      <li>Cobertura antimicrobiana direcionada de amplo espectro baseada em culturas e antibiogramas guiados (ex.: Meropenem associado a Polimixina B / Tigeciclina e Daptomicina);</li>
      <li><strong>Terapia Antifúngica Empírica com Equinocandinas (Equinocandina: Caspofungina, Anidulafungina ou Micafungina)</strong> é formalmente mandatória em pacientes com peritonite terciária ou pós-operatória complicada com choque séptico;</li>
      <li>Drenagem percutânea guiada por TC de abscessos organizados, evitando relaparotomias não programadas intempestivas sem alvo anatômico definido.</li>
    </ol>
  </li>
</ul>
`
};
