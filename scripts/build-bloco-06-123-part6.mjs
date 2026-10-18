// Bloco 6 - Aula 123: Febre sem Sinais Localizatórios - Part 6
export const sec11 = {
  id: 'guia-conduta-rapida-fluxogramas-desospitalizacao',
  title: '11. Guia Prático de Conduta Rápida, Fluxogramas por Idade e Desospitalização Segura',
  body_html: `
<h3>Fluxograma Mestre Consolidado de Abordagem da Febre sem Sinais Localizatórios</h3>
<p>Para assegurar a tomada de decisão ágil, segura e reprodutível na sala de emergência e no ambulatório pediátrico, estruturamos a conduta médica baseada nas três faixas etárias biológicas consensuais estabelecidas pelas diretrizes da Academia Americana de Pediatria (AAP), Sociedade Brasileira de Pediatria (SBP) e National Institute for Health and Care Excellence (NICE):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa Etária Pediátrica</th>
      <th>Estratificação de Risco e Ferramentas</th>
      <th>Investigação Laboratorial Mínima Exigida</th>
      <th>Local de Cuidado e Terapia Antimicrobiana Empírica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Recém-Nascido<br>(0 a 28 dias de vida)</strong></td>
      <td><strong>"TOLERÂNCIA ZERO"</strong><br>Não existe baixo risco clínico nessa idade.</td>
      <td>
        <strong>Screening Séptico Completo Mandatório:</strong>
        <ul>
          <li>Hemograma + Plaquetas + I/T;</li>
          <li>PCR quantitativa + Procalcitonina;</li>
          <li>Hemoculturas periféricas (2 amostras);</li>
          <li>Urina por Cateterismo ou Punção Suprapúbica + Urocultura;</li>
          <li><strong>Punção Lombar diagnóstica compulsória</strong> (citologia, bioquímica, Gram e cultura);</li>
          <li>Radiografia de tórax.</li>
        </ul>
      </td>
      <td>
        <strong>INTERNAÇÃO HOSPITALAR OBRIGATÓRIA</strong>.<br>
        <strong>Antibioticoterapia IV de Amplo Espectro Imediata:</strong><br>
        <strong>Ampicilina IV</strong> ($150-200$ mg/kg/dia) + <strong>Gentamicina IV</strong> ($4-5$ mg/kg/dia 1x/dia)<br>
        <em>(ou Cefotaxima IV se suspeita de meningite).</em><br>
        <span style="color:red; font-weight:bold;">CONTRAINDICAÇÃO FORMAL À CEFTRIAXONA!</span>
      </td>
    </tr>
    <tr>
      <td><strong>Lactente Jovem<br>(29 a 90 dias de vida)</strong></td>
      <td>
        <strong>Critérios de Rochester / AAP 2021:</strong><br>
        Dividir em <em>Baixo Risco</em> vs <em>Alto Risco</em>.
      </td>
      <td>
        <strong>Lactente de Baixo Risco:</strong>
        <ul>
          <li>Hemograma (Leucócitos 5.000 a 15.000, bastões $< 1.500$);</li>
          <li>PCR $< 20$ mg/L e Procalcitonina $< 0,5$ ng/mL;</li>
          <li>Urina por cateterismo: $< 10$ leucócitos/campo e nitrito neg;</li>
          <li><em>Punção lombar pode ser dispensada</em> se critérios rigorosos de baixo risco preenchidos (Rochester / AAP 2021).</li>
        </ul>
        <strong>Se Alto Risco:</strong> Rastreio completo incluindo líquor.
      </td>
      <td>
        <strong>Baixo Risco:</strong> Opção de seguimento ambulatorial com reavaliação médica presencial mandatória em 24h (com ou sem dose de Ceftriaxona $50$ mg/kg IM), ou observação hospitalar sem antibióticos aguardando culturas.<br>
        <strong>Alto Risco:</strong> Internação hospitalar + <strong>Ceftriaxona IV ($50-100$ mg/kg/dia)</strong>.
      </td>
    </tr>
    <tr>
      <td><strong>Lactente e Pré-Escolar<br>(3 a 36 meses de idade)</strong></td>
      <td>
        <strong>Escala de Observação de Yale (YOS):</strong><br>
        $\le 10$ (Bom estado), $11-15$ (Dúbio), $\ge 16$ (Tóxico).<br>
        Verificar <strong>Carteira de Vacinação</strong> (VPC e Hib $\ge 2$ doses).
      </td>
      <td>
        <strong>1. Criança em Bom Estado Geral (Yale $\le 10$) Vacinada:</strong>
        <ul>
          <li>Não coletar hemograma ou hemocultura de rotina;</li>
          <li><strong>Rastrear ITU Oculta:</strong> Meninas $< 24$m com febre $\ge 39$ ºC $> 48$h ou meninos não circuncidados $< 12$m com febre $> 24$h colhem urina por cateterismo estéril;</li>
          <li>Radiografia de tórax se febre $\ge 39$ ºC e Leucócitos $> 20.000$ (suspeita de pneumonia oculta).</li>
        </ul>
        <strong>2. Se Não Vacinada com Febre $\ge 39$ ºC:</strong> Hemograma + Hemocultura + Urina.<br>
        <strong>3. Se Yale $\ge 16$ (Tóxico):</strong> Sepse workup completo com líquor.
      </td>
      <td>
        <strong>Bom Estado Geral:</strong> Tratamento ambulatorial e sintomáticos. Se ITU confirmada: antibiótico oral (Cefixima, Cefuroxima, Amoxicilina-clavulanato).<br>
        <strong>Estado Tóxico:</strong> Sala de ressuscitação / UTI Pediátrica, ressuscitação volêmica (bolus de cristalóide $20$ mL/kg) e <strong>Ceftriaxona IV ($100$ mg/kg/dia)</strong> na 1ª hora.
      </td>
    </tr>
  </tbody>
</table>

<h3>Critérios Rígidos de Desospitalização e Alta Domiciliar Segura</h3>
<p>A decisão de conceder alta domiciliar com seguimento ambulatorial em uma criança que se apresentou com febre sem sinais localizatórios não depende exclusivamente da temperatura aferida no momento ou dos números do hemograma. O médico deve garantir o cumprimento integral de <strong>critérios sociais, logísticos e parentais inegociáveis</strong>:</p>

<div class="book-case">
  <h4>Checklist Obrigatório de Segurança para Alta Ambulatorial da FSSL:</h4>
  <ul>
    <li><strong>Confiabilidade Absoluta dos Cuidadores:</strong> Os pais ou responsáveis compreendem perfeitamente as orientações prestadas, demonstram capacidade cognitiva e emocional para mensurar a temperatura corporal com termômetro e administrar medicações nas doses e horários prescritos;</li>
    <li><strong>Acesso Imediato ao Meio de Transporte e Comunicação:</strong> A família possui telefone ativo e transporte garantido para retornar ao hospital a qualquer momento do dia ou da noite caso surja qualquer sinal de alarme;</li>
    <li><strong>Distância Geográfica Segura:</strong> A residência dista preferencialmente menos de 30 a 45 minutos de um serviço hospitalar de pronto-socorro pediátrico com leito de observação;</li>
    <li><strong>Garantia de Reavaliação Médica Presencial Agendada:</strong> Retorno presencial mandatório em <strong>24 a 48 horas</strong> na mesma unidade ou com pediatra assistente de referência para checagem clínica e conferência do resultado de culturas biológicas preliminares;</li>
    <li><strong>Fornecimento de Guia Escrito de Sinais de Alarme:</strong> Entrega de orientações claras por escrito, destacando quando retornar imediatamente antes do prazo agendado.</li>
  </ul>
</div>

<h3>Sinais de Alarme Vermelhos (Red Flags) para Retorno Imediato de Emergência</h3>
<p>Os responsáveis devem ser orientados a procurar atendimento médico imediato e sem hesitação se a criança apresentar qualquer um dos seguintes sinais de toxicidade:</p>

<div class="formula-box">
  <p><strong>Sinais Vermelhos que Exigem Retorno Hospitalar Imediato:</strong></p>
  <ol>
    <li><strong>Alteração Importante da Consciência ou Comportamento:</strong> A criança torna-se difícil de acordar, apresenta sonolência excessiva, olhar fixo, desinteresse pelo ambiente, ausência de sorriso ou choro inconsolável e irritabilidade intensa mesmo após a febre ter cedido com antitérmico;</li>
    <li><strong>Surgimento de Lesões Cutâneas que Não Desaparecem à Vitropressão:</strong> Aparecimento de petéquias (pequenos pontos avermelhados/violáceos na pele semelhantes a picadas de pulga) ou manchas arroxeadas (púrpura e sufusões hemorrágicas), que sugerem meningococcemia ou púrpura fulminante;</li>
    <li><strong>Desconforto Respiratório Agudo:</strong> Respiração muito acelerada (taquipneia), afundamento entre as costelas (tiragem intercostal ou subcostal), batimento das asas do nariz ou gemência expiratória audível sem estetoscópio;</li>
    <li><strong>Sinais de Má Perfusão Tecidual e Desidratação Grave:</strong> Extremidades frias e pálidas, coloração arroxeada ou mosqueada da pele (livedo), tempo de enchimento capilar lento ($> 3$ segundos), olhos encovados, ausência de lágrimas ao chorar e ausência de fraldas molhadas (diurese nula) por mais de 6 a 8 horas;</li>
    <li><strong>Rigidez de Nuca ou Abaulamento de Fontanela:</strong> Resistência ou dor ao fletir o queixo contra o peito, ou fontanela anterior ("moleira") tensa e abaulada com a criança calma e sentada;</li>
    <li><strong>Recusa Alimentar Total ou Vômitos Repetidos:</strong> Incapacidade de ingerir e reter qualquer líquido ou leite, levando a risco iminente de desidratação e hipoglicemia;</li>
    <li><strong>Convulsões ou Abalos Musculares Anormais:</strong> Qualquer episódio de perda de consciência acompanhado de abalos de membros ou contrações faciais.</li>
  </ol>
</div>
`
};
