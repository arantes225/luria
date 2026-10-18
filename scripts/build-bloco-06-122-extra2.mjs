// scripts/build-bloco-06-122-extra2.mjs
// Seções extras 2 de aprofundamento para Aula 122: Perfuração de Víscera Oca

export const secTratamentoConservadorTaylor = {
  id: 'tratamento-nao-operatorio-taylor-e-sindrome-boerhaave',
  title: '5. Tratamento Não Operatório de Perfurações Gastroduodenais (Método de Taylor) e Manejo da Síndrome de Boerhaave',
  body_html: `
<h3>O Tratamento Não Operatório (Conservador) da Úlcera Péptica Perfurada: O Método de Taylor</h3>
<p>Em 1946, Hermon Taylor descreveu uma série pioneira de pacientes com úlcera péptica perfurada tratados com sucesso exclusivamente por medidas clínicas não operatórias, fundamentando-se no princípio biológico de que muitas perfurações duodenais puntiformes precoces <strong>são rapidamente tamponadas de forma espontânea pelo grande omento ou pela face inferior do lobo hepático direito</strong> (perfuração bloqueada com fechamento biológico autônomo):</p>
<ul>
  <li><strong>Critérios Clínicos Rígidos de Elegibilidade para o Método de Taylor:</strong>
    <ol>
      <li>Paciente jovem ou adulto <strong>rigorosamente estável hemodinamicamente (sem choque, sem taquicardia descompensada e sem hipotensão)</strong>;</li>
      <li>Início recente dos sintomas com evidência clara de <strong>peritonite localizada restrita ao epigástrio ou hipocôndrio direito</strong> (ausência de peritonite generalizada em quatro quadrantes e ausência de abdome em tábua difuso);</li>
      <li>Idade $&lt; 70$ anos e ausência de imunossupressão grave;</li>
      <li><strong>Confirmação Tomográfica ou Radiológica de Tampão Hermético (Teste de Contraste Hidrossolúvel):</strong> Realiza-se ingestão oral de meio de contraste iodado hidrossolúvel (Gastrografin - <em>nunca sulfato de bário</em>) sob fluoroscopia ou TC: se <strong>NÃO houver extravasamento ativo do contraste para a cavidade peritoneal livre</strong>, confirma-se que o orifício encontra-se mecanicamente bloqueado e selado pelo omento;</li>
    </ol>
  </li>
  <li><strong>Protocolo Operacional Clínico do Método de Taylor:</strong>
    <ul>
      <li>Jejum oral absoluto contínuo;</li>
      <li><strong>Sondagem Nasogástrica Contínua com Aspiração em Sucção Contínua ou Intermitente</strong>: alivia a pressão intragástrica e impede que novo suco digestivo atinja o duodeno;</li>
      <li>Inibidor de Bomba de Prótons em altas doses por via intravenosa (Omeprazol 80 mg em bólus seguido de infusão contínua de 8 mg/h por 72 horas);</li>
      <li>Antibioticoterapia intravenosa de amplo espectro por 7 a 10 dias cobrindo flora entérica;</li>
      <li><strong>Vigilância Clínica Cirúrgica Presencial Estrita a cada 2 a 4 horas</strong>: a equipe cirúrgica deve reavaliar continuamente o abdome, a frequência cardíaca, a temperatura e a curva leucocitária;</li>
    </ul>
  </li>
  <li><strong>Critérios Formais de Falha e Conversão Imediata para Cirurgia:</strong>
    <p>Se após 12 a 24 horas de tratamento conservador o paciente mantiver febre persistente, piora da dor abdominal, taquicardia em ascensão, leucocitose progressiva ou surgimento de defesa muscular generalizada, o método de Taylor é considerado falho, indicando <strong>laparotomia exploradora imediata sem protelação</strong>.</p>
  </li>
</ul>

<h3>Síndrome de Boerhaave: A Catástrofe da Rotura Esofágica Espontânea</h3>
<p>A <strong>Síndrome de Boerhaave</strong> consiste na rotura transmural completa e espontânea da parede do esôfago intratorácico decorrente de súbito aumento da pressão intraesofágica durante episódios de vômitos violentos incoercíveis. É considerada a <strong>perfuração mais letal de todo o trato digestivo humano</strong>, com mortalidade que ultrapassa <strong>40% a 60% se o tratamento for retardado por mais de 24 horas</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Aspecto Clínico / Anatômico</th>
      <th>Particularidades Fisiopatológicas e Diagnósticas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Localização Anatômica Predileta</strong></td>
      <td>Ocorre em mais de 90% dos casos na <strong>parede póstero-lateral esquerda do terço distal do esôfago</strong> (2 a 3 cm acima da junção esofagogástrica), onde a túnica muscular longitudinal é naturalmente desprovida de suporte de estruturas adjacentes e o esôfago não possui camada serosa protetora.</td>
    </tr>
    <tr>
      <td><strong>A Tríade Clássica de Mackler</strong></td>
      <td>Presente em apenas 50% dos casos, mas altamente sugestiva quando completa:
      <ol>
        <li><strong>Vômitos violentos prévios</strong> (geralmente após farta libação alcoólica e alimentar);</li>
        <li><strong>Dor torácica retroesternal excruciante e súbita</strong> de início imediatamente pós-vômito, irradiada para o dorso e epigástrio;</li>
        <li><strong>Enfisema Subcutâneo Cervical</strong> (crepitação tátil à palpação da fossa supraclavicular e base do pescoço por dissecção de ar do mediastino posterior ao longo dos planos fasciais cervicais).</li>
      </ol>
      </td>
    </tr>
    <tr>
      <td><strong>Achados Propedêuticos em Imagem</strong></td>
      <td>
      <ul>
        <li><em>Radiografia de Tórax:</em> Alargamento do mediastino superior, derrame pleural esquerdo volumoso (hidropneumotórax esquerdo), pneumomediastino e <strong>Sinal do V de Naclerio</strong> (linhas radiotransparentes de ar formando um "V" no mediastino inferior esquerdo delimitadas pela pleura parietal e diafragma);</li>
        <li><em>Toracocentese Diagnóstica:</em> Líquido pleural acastanhado ou purulento com <strong>pH extremamente ácido ($&lt; 6,0$) e níveis altíssimos de amilase salivar</strong>;</li>
        <li><em>Esofagograma com Contraste Hidrossolúvel (ou TC de Tórax):</em> Exame padrão-ouro definitivo que documenta o ponto exato de extravasamento do meio de contraste para o mediastino posterior e cavidade pleural esquerda.</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Conduta Terapêutica Escalonada</strong></td>
      <td>
      <ul>
        <li><em>Diagnóstico Hiperprecoce ($&lt; 24$ horas):</em> Toracotomia póstero-lateral esquerda de emergência, desbridamento mediastinal amplo, <strong>sutura primária da lesão esofágica em dois planos com reforço de retalho pediculado pleural, pericárdico ou de músculo intercostal</strong>, associada à drenagem pleural fechada dupla e gastrostomia/jejunostomia para alimentação enteral precoce;</li>
        <li><em>Diagnóstico Tardio ($&gt; 24$ horas) com Mediastinite Grave:</em> As bordas esofágicas encontram-se friáveis, necróticas e liquefeitas, inviabilizando sutura primária. A conduta exige <strong>exclusão esofágica temporária</strong> (esofagostomia cervical terminal com fechamento do cárdia e jejunostomia de alimentação) ou implante endoscópico de prótese metálica autoexpansível totalmente recoberta (SEMS) associada à drenagem torácica ampla.</li>
      </ul>
      </td>
    </tr>
  </tbody>
</table>
`
};

export const secNutricaoEComplicacoesPosOp = {
  id: 'terapia-intensiva-fistulas-e-complicacoes-pos-operatorias',
  title: '8. Cuidados Pós-Operatórios em UTI, Manejo de Fístulas Digestivas e Nutrição Especializada',
  body_html: `
<h3>Cuidados Pós-Operatórios Críticos e Monitorização da Resposta Inflamatória</h3>
<p>O período pós-operatório imediato de pacientes operados por perfuração de víscera oca e peritonite fecal ou química grave exige vigilância intensiva na UTI para prevenção de falência de múltiplos órgãos:</p>
<ol>
  <li><strong>Desmame Ventilatório e Proteção Pulmonar:</strong> A absorção transdiafragmática de citocinas inflamatórias (TNF-$\alpha$, IL-6) e o edema pulmonar por extravasamento capilar deflagram frequentemente a <em>Síndrome do Desconforto Respiratório Agudo (SDRA)</em>. A ventilação mecânica protetora com baixo volume corrente ($6$ mL/kg de peso predito) e titulação criteriosa de PEEP reduz a mortalidade;</li>
  <li><strong>Tempo Ideal de Duração da Antibioticoterapia (O Ensaio Clínico STOP-IT):</strong>
    <ul>
      <li>Historicamente, pacientes com peritonite generalizada recebiam antibióticos por 10 a 14 dias ou até a normalização completa da contagem leucocitária;</li>
      <li>O ensaio clínico multicêntrico randomizado histórico <strong>STOP-IT (New England Journal of Medicine, 2015)</strong> comparou um curso curto de antibioticoterapia fixado em <strong>apenas 4 dias pós-operatórios</strong> <em>versus</em> o esquema prolongado tradicional mantido por 10 dias após o controle cirúrgico adequado do foco infeccioso;</li>
      <li><strong>Resultados e Diretriz Contemporânea:</strong> Não houve nenhuma diferença na incidência de infecções secundárias de sítio cirúrgico, abscessos recorrentes ou óbito. Em pacientes nos quais o <strong>controle mecânico adequado do foco infeccioso foi obtido com sucesso (ressecção ou rafia estanque com lavagem)</strong>, a antibioticoterapia pós-operatória deve ser mantida por <strong>apenas 4 dias (máximo de 5 a 7 dias)</strong>, prevenindo a seleção de bactérias multirresistentes hospitalares e infecção por <em>Clostridioides difficile</em>;</li>
    </ul>
  </li>
  <li><strong>Manejo de Coleções Intra-Abdominais e Abscessos Residuais:</strong>
    <p>A persistência de picos febris diários com calafrios, leucocitose ascendente ou íleo paralítico prolongado a partir do 5º ao 7º dia pós-operatório impõe a realização de <strong>Tomografia Computadorizada de abdome e pelve com contraste intravenoso</strong> para rastreamento de abscessos intra-abdominais residuais (comumente localizados no fundo de saco de Douglas, espaço subfrênico direito ou goteiras parietocólicas). A <strong>Drenagem Percutânea Guiada por TC</strong> é o procedimento de primeira escolha indiscutível, evitando relaparotomias de risco;</p>
  </li>
  <li><strong>Manejo das Fístulas Digestivas Pós-Operatórias (Fístula Duodenal / Enterocutânea):</strong>
    <p>A deiscência da sutura duodenal ou da anastomose cólica culmina no aparecimento de fístula digestiva de alto débito ($&gt; 500$ mL/24h) com drenagem de secreção biliar ou fecal através da ferida operatória ou dos drenos:</p>
    <ul>
      <li><em>Fase 1 (Estabilização Inicial - Primeiras 48 horas):</em> Ressuscitação volêmica vigorosa, correção de desequilíbrios hidroeletrolíticos e ácido-base (perda massiva de potássio, sódio e bicarbonato), proteção meticulosa da pele perilesional com bolsas de colostomia e placas de hidrocoloide;</li>
      <li><em>Fase 2 (Controle da Infecção e Nutrição):</em> Antibioticoterapia para sepse, drenagem de coleções cavitárias e introdução de <strong>Nutrição Parenteral Total (NPT) ou Nutrição Enteral distal ao sítio da fístula</strong> para manter balanço nitrogenado positivo;</li>
      <li><em>Fase 3 (Tratamento Definitivo):</em> Mais de <strong>60% a 70% das fístulas entéricas cicatrizam espontaneamente em 4 a 6 semanas</strong> sob suporte conservador adequado se não houver fatores impeditivos de fechamento (Mnemônico <strong>FRIEND</strong>: <strong>F</strong>órum estranho, <strong>R</strong>adioterapia prévia, <strong>I</strong>nfecção/Abscesso persistente, <strong>E</strong>pitelização do trajeto fistuloso, <strong>N</strong>eoplasia local, <strong>D</strong>esnutrição grave / Obstrução distal à fístula). A reconstrução cirúrgica eletiva é programada apenas após 3 a 6 meses de resolução da peritonite.</li>
    </ul>
  </li>
</ol>
`
};
