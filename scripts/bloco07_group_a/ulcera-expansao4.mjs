// scripts/bloco07_group_a/ulcera-expansao4.mjs
export const secUlceraExpansao4 = [
  {
    id: 'fisiologia-da-cicatrizacao-e-terapias-emergentes',
    title: '7.2 Farmacologia Comparada dos Supressores Ácidos, Fármacos Citoprotetores e Bloqueadores de Potássio (PCABs)',
    body_html: `
<p>O arsenal terapêutico para a supressão da acidez gástrica evoluiu substancialmente, atingindo patamares de bloqueio enzimático mais rápidos e sustentados com a introdução dos bloqueadores ácidos competitivos de potássio (PCABs).</p>

<h3>Mecanismo de Ação e Farmacocinética Comparada</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Classe Farmacológica</th>
      <th>Exemplos Clínicos</th>
      <th>Mecanismo Farmacológico Exato</th>
      <th>Vantagens e Limitações Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Inibidores da Bomba de Prótons (IBPs)</strong></td>
      <td>Omeprazol, Pantoprazol, Esomeprazol, Lansoprazol, Rabeprazol.</td>
      <td>Pró-fármacos que requerem ativação ácida no canalículo secretor da célula parietal. Ligam-se covalentemente (ligação dissulfeto irreversível) aos resíduos de cisteína da enzima H+/K+-ATPase ativa.</td>
      <td>Exigem ingestão 30 a 60 minutos antes da refeição para bloquear bombas ativas. Início de ação lento (demora 3 a 5 dias para atingir estado de equilíbrio estável de bloqueio). Sofrem polimorfismo genético no citocromo CYP2C19 (metabolizadores rápidos vs lentos).</td>
    </tr>
    <tr>
      <td><strong>Bloqueadores de Potássio Competitivos (PCABs)</strong></td>
      <td>Vonoprazana (Vonoprazan).</td>
      <td>Inibição competitiva e reversível do sítio de ligação do íon potássio (K+) na H+/K+-ATPase. Não necessitam de ativação ácida no canalículo.</td>
      <td><strong>Início de ação ultra-rápido (bloqueio ácido quase total na primeira dose)</strong>, meia-vida longa, estabilidade em pH ácido e ação independente da ingestão alimentar. Não sofrem influência do polimorfismo do CYP2C19. Taxas de erradicação de <em>H. pylori</em> superiores a 90%-95% mesmo em cepas resistentes à claritromicina.</td>
    </tr>
    <tr>
      <td><strong>Antagonistas dos Receptores H2</strong></td>
      <td>Ranitidina, Famotidina, Cimetidina.</td>
      <td>Bloqueio competitivo dos receptores de histamina tipo 2 na membrana basolateral da célula parietal.</td>
      <td>Início rápido, porém desenvolvem <strong>tolerância farmacológica precoce (taquifilaxia)</strong> em 2 a 3 dias de uso contínuo por perda de sensibilidade do receptor, limitando o uso em pacientes críticos.</td>
    </tr>
    <tr>
      <td><strong>Agentes Protetores da Mucosa (Sucralfato)</strong></td>
      <td>Sucralfato (sal de sacarose octassulfato de alumínio).</td>
      <td>Em pH ácido, polimeriza-se formando uma pasta viscosa insolúvel com carga negativa que se adere firmemente às proteínas de carga positiva no fundo da cratera ulcerosa, criando barreira mecânica.</td>
      <td>Não altera o pH gástrico, mantendo o filtro ácido contra bactérias. Pode causar constipação e interfere na absorção de outros fármacos orais (exige intervalo de 2 horas).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'questoes-discursivas-adicionais-ulcera',
    title: '8.2 Banco de Casos Discursivos e Cenários de Pronto-Socorro',
    body_html: `
<div class="case-study">
  <h4>Caso Discursivo 3: Abordagem Cirúrgica de Perfuração Péptica com Choque Séptico Tardio</h4>
  <p><strong>Cenário Clínico:</strong> Homem de 65 anos é trazido ao pronto-socorro com história de dor epigástrica intensa há 36 horas, que evoluiu com piora progressiva, letargia e dispneia nas últimas 12 horas. Apresenta-se desidratado, cianótico periférico, PA: 80x45 mmHg (refratária a 1.500 mL de cristaloides), FC: 132 bpm, FR: 32 irpm e temperatura axilar de 38,9°C. Abdome: difusamente distendido, tenso, doloroso em todos os quadrantes com ruídos hidroaéreos abolidos. Exames laboratoriais mostram leucocitose de 26.000/mm³ com 22% de bastões, plaquetas: 75.000/mm³, lactato: 4,5 mmol/L e creatinina: 2,8 mg/dL. A tomografia de abdome demonstra grande pneumoperitônio, espessamento no bulbo duodenal e líquido purulento livre em moderada quantidade na pelve e espaços subfrênicos.</p>
  
  <p><strong>Perguntas da Banca Examinadora:</strong></p>
  <ol>
    <li>Qual é o diagnóstico sindrômico e a etiologia cirúrgica subjacente?</li>
    <li>Quais são as etapas imediatas de ressuscitação pré-operatória no choque séptico distributivo?</li>
    <li>Qual a tática cirúrgica de escolha indicada para o controle do foco infeccioso abdominal e qual o procedimento para proteger a rafia duodenal?</li>
    <li>Em qual circunstância anatômica estaria formalmente indicada a realização de biópsia da úlcera antes do fechamento?</li>
  </ol>

  <p><strong>Padrão de Resposta Esperado:</strong></p>
  <ol>
    <li><strong>Diagnóstico:</strong> Abdome agudo perfurativo com peritonite purulenta secundária difusa, choque séptico distributivo/hipovolêmico e disfunção de múltiplos órgãos (renal, hematológica e circulatória), decorrente de <strong>perfuração de úlcera péptica duodenal</strong>.</li>
    <li><strong>Ressuscitação Imediata:</strong>
      <ul>
        <li>Monitorização contínua e intubação orotraqueal com ventilação protetora;</li>
        <li>Instalação imediata de cateter venoso central e introdução de <strong>noradrenalina em infusão contínua</strong> titulada para PAM &gt;= 65 mmHg concomitante à ressuscitação volêmica prudente;</li>
        <li>Antibioticoterapia endovenosa de amplo espectro na primeira hora (como Piperacilina-Tazobactam ou Meropenem);</li>
        <li>Passagem de sonda nasogástrica em aspiração contínua e sonda vesical para monitorização do débito urinário;</li>
        <li>Omeprazol 80 mg EV em bolus. O paciente deve ser transferido ao centro cirúrgico com a máxima celeridade assim que a pressão de perfusão for minimamente restaurada.</li>
      </ul>
    </li>
    <li><strong>Tática Cirúrgica:</strong> Abertura por laparotomia mediana ampla, identificação do orifício de perfuração duodenal, rafia primária com pontos separados transfixantes protegida por <strong>ometoplastia pediculada vascularizada (Patch de Graham)</strong>, irrigação exaustiva de todos os recessos peritoneais com soro fisiológico morno, drenagem da cavidade abdominal e fechamento temporário ou definitivo da parede a depender do risco de síndrome compartimental intra-abdominal.</li>
    <li><strong>Indicação de Biópsia:</strong> A biópsia da borda da úlcera é <strong>formalmente obrigatória se a perfuração for de localização GÁSTRICA</strong> (pequena curvatura, corpo ou antro), a fim de excluir adenocarcinoma gástrico perfurado. Em perfurações puramente duodenais anteriores, a biópsia é dispensada pela raridade extrema de malignidade no bulbo duodenal.</li>
  </ol>
</div>
`
  }
];
