// scripts/bloco-07-builders/build-150-part2.mjs

export const sec3 = {
  id: "avaliacao-multidimensional-do-idoso-na-aps",
  title: "3. Avaliação Multidimensional do Idoso na APS: Caderneta de Saúde, Escala de Katz e Escala de Lawton",
  body_html: `
<h3>3.1 A Avaliação Geriátrica Ampla (AGA) Adaptada à Atenção Primária</h3>
<p>O modelo clínico biomédico tradicional — focado na queixa pontual e no exame de órgãos isolados — falha miseravelmente na abordagem do idoso. Um sintoma como confusão mental aguda (delirium) pode decorrer de uma infecção do trato urinário assintomática, impactação fecal (fecaloma), retenção urinária aguda ou introdução de um anticolinérgico. Para responder a essa complexidade, a geriatria desenvolveu a <strong>Avaliação Geriátrica Ampla (AGA)</strong>, um processo diagnóstico interdisciplinar e multidimensional desenhado para determinar a fragilidade clínica, as capacidades funcionais, as condições psicossociais e a necessidade de suporte a longo prazo.</p>

<p>Na rotina da APS, a equipe utiliza instrumentos simplificados e de aplicação rápida incorporados à <strong>Caderneta de Saúde da Pessoa Idosa</strong>, desenvolvida pelo Ministério da Saúde como instrumento essencial de vigilância à saúde, registro longitudinal de comorbidades, medicamentos em uso, esquema vacinal e rastreio de fragilidade.</p>

<div class="clinical-box highlight">
  <h4>A Caderneta de Saúde da Pessoa Idosa (Ministério da Saúde): Estrutura e Manejo na ESF</h4>
  <p>A Caderneta de Saúde da Pessoa Idosa é distribuída gratuitamente no SUS e deve permanecer em posse do próprio idoso ou de seu cuidador principal, funcionando como um passaporte clínico entre os diferentes níveis de atenção à saúde. Seus componentes fundamentais compreendem:</p>
  <ul>
    <li><strong>Identificação e Dados Pessoais:</strong> Nome social, raça/cor autorreferida, escolaridade, ocupação anterior, religião/crença e contatos de emergência familiares e comunitários;</li>
    <li><strong>Identificação do Cuidador:</strong> Registro se o cuidador é familiar ou formal contratado, presença de sobrecarga do cuidador avaliada pela Escala de Zarit (<em>Zarit Burden Interview</em>) e revezamento de cuidados;</li>
    <li><strong>Informações Socifamiliares:</strong> Condições de moradia (presença de saneamento, escadas, barreiras arquitetônicas domiciliares), arranjo domiciliar (mora sozinho, com cônjuge ou multigeracional) e rede de suporte social;</li>
    <li><strong>Avaliação Ambiental e de Riscos no Domicílio:</strong> Rastreio de tapetes soltos, pisos escorregadios, iluminação precária e ausência de apoios no banheiro;</li>
    <li><strong>Medicamentos em Uso (Revisão da 'Sacola de Medicamentos'):</strong> Registro minucioso de fármacos prescritos, posologias, automedicação, chás caseiros, suplementos e identificação de adesão;</li>
    <li><strong>Registro de Quedas Recentes:</strong> Mapeamento do número de quedas nos últimos 12 meses, circunstâncias da queda, local (dentro ou fora de casa) e fraturas associadas;</li>
    <li><strong>Controle de Parâmetros Clínicos Vitais:</strong> Curva de pressão arterial (deitado e em pé para rastreio de hipotensão ortostática), peso corporal, altura, Índice de Massa Corporal (IMC adaptado para o idoso: menor que 22 kg/m² = baixo peso/desnutrição; 22 a 27 kg/m² = eutrofia; maior que 27 kg/m² = sobrepeso) e perímetro da panturrilha (menor que 31 cm = forte preditor de perda de massa muscular e sarcopenia);</li>
    <li><strong>Calendário Vacinal da Pessoa Idosa (PNI/SUS):</strong> Registro de vacinação anual contra Influenza (gripe), vacina pneumocócica conjugada e polissacarídica (VPC13 e VPP23 para grupos de risco e institucionalizados), vacina dupla adulto contra tétano e difteria (dT a cada 10 anos) e vacinação contra Covid-19 e Hepatite B.</li>
  </ul>
</div>

<h3>3.2 Escala de Katz: Atividades Básicas de Vida Diária (ABVD)</h3>
<p>Proposta por Sidney Katz em 1963, a escala avalia a <strong>independência física elementar</strong> para o autocuidado diário e a sobrevivência básica biológica. A perda dessas funções segue uma ordem hierárquica ontogenética inversa (perde-se primeiro as funções mais complexas e, por último, a capacidade de se alimentar):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Atividade Básica (Katz)</th>
      <th>Critério de Independência (1 ponto)</th>
      <th>Critério de Dependência (0 pontos)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Banho</strong></td>
      <td>Lava-se completamente sozinho (mesmo que precise de auxílio para lavar apenas as costas ou uma extremidade lesionada).</td>
      <td>Necessita de auxílio humano para lavar mais de uma parte do corpo ou para entrar/sair do chuveiro/banheira.</td>
    </tr>
    <tr>
      <td><strong>2. Vestir-se</strong></td>
      <td>Pega as roupas no armário e veste-se completamente sozinho (incluindo abotoar, zíperes e calçar meias/sapatos; exclui-se amarrar cadarços).</td>
      <td>Necessita de ajuda para vestir roupas ou permanece parcialmente desvestido sem auxílio.</td>
    </tr>
    <tr>
      <td><strong>3. Uso do Vaso Sanitário</strong></td>
      <td>Vai ao banheiro sozinho, senta-se e levanta-se do vaso, ajeita as roupas e realiza a higiene íntima sem ajuda (pode usar barras de apoio).</td>
      <td>Necessita de auxílio para sentar-se/levantar-se do vaso, para higiene íntima ou usa comadre/papagaio no leito.</td>
    </tr>
    <tr>
      <td><strong>4. Transferência</strong></td>
      <td>Deita-se e levanta-se da cama sozinho; senta-se e levanta-se de uma cadeira sem auxílio humano (pode usar bengala ou andador).</td>
      <td>Necessita de ajuda humana direta para sair da cama ou da cadeira; ou é totalmente acamado.</td>
    </tr>
    <tr>
      <td><strong>5. Continência</strong></td>
      <td>Controla completamente as micções e evacuações voluntárias sem episódios frequentes de perda acidental.</td>
      <td>Incontinência urinária ou fecal parcial ou total; uso contínuo de fraldas geriátricas ou cateterismo vesical de demora.</td>
    </tr>
    <tr>
      <td><strong>6. Alimentação</strong></td>
      <td>Leva a comida do prato à boca sozinho (a carne pode ser previamente cortada por terceiros).</td>
      <td>Necessita de ajuda para levar o alimento à boca; ou é alimentado por sonda nasoenteral / gastrostomia (GTT).</td>
    </tr>
  </tbody>
</table>
<p><em>Interpretação Clínica do Índice de Katz (0 a 6 pontos):</em> <strong>6 pontos:</strong> Independente para todas as funções básicas; <strong>3 a 5 pontos:</strong> Dependência funcional moderada (necessita de suporte parcial); <strong>0 a 2 pontos:</strong> Dependência funcional grave/severa (demanda cuidador em tempo integral para sobrevivência).</p>

<h3>3.3 Escala de Lawton e Brody: Atividades Instrumentais de Vida Diária (AIVD)</h3>
<p>As <strong>Atividades Instrumentais de Vida Diária (AIVD)</strong> avaliam a capacidade do indivíduo de manter uma <strong>vida comunitária autônoma e independente dentro e fora do domicílio</strong>. Como exigem funções cognitivas executivas refinadas, planejamento e coordenação motora, as AIVDs são as <strong>primeiras a se deteriorarem nos estágios iniciais das demências</strong> (como a Doença de Alzheimer incipiente) e na pré-fragilidade:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Domínio Instrumental (Lawton)</th>
      <th>Descrição da Habilidade Avaliada</th>
      <th>Significado Clínico na Atenção Básica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Capacidade de Usar o Telefone</strong></td>
      <td>Opera o aparelho telefônico, busca números na agenda ou disca números conhecidos de memória.</td>
      <td>Avalia memória de trabalho e coordenação motora fina.</td>
    </tr>
    <tr>
      <td><strong>2. Fazer Compras</strong></td>
      <td>Planeja as compras do mês/semana, vai sozinho ao mercado ou farmácia e escolhe os produtos necessários.</td>
      <td>Demanda memória, função executiva, locomoção e interação social.</td>
    </tr>
    <tr>
      <td><strong>3. Preparar as Próprias Refeições</strong></td>
      <td>Planeja, cozinha e serve refeições nutricionalmente balanceadas e seguras de forma independente.</td>
      <td>Exige planejamento sequencial complexo, atenção concentrada e segurança doméstica (risco de fogo aceso).</td>
    </tr>
    <tr>
      <td><strong>4. Cuidar dos Afazeres Domésticos</strong></td>
      <td>Mantém a casa limpa e organizada, lava louças e arruma a cama.</td>
      <td>Avalia força muscular, equilíbrio dinâmico e iniciativa volitiva.</td>
    </tr>
    <tr>
      <td><strong>5. Lavar e Passar Roupas</strong></td>
      <td>Lava roupas próprias ou opera máquina de lavar roupas sem auxílio.</td>
      <td>Indica preservação de força e mobilidade em tarefas domésticas.</td>
    </tr>
    <tr>
      <td><strong>6. Uso de Meios de Transporte</strong></td>
      <td>Anda de transporte público (ônibus, metrô), solicita táxi/aplicativo ou dirige veículo próprio sozinho.</td>
      <td>Avalia orientação têmporo-espacial, capacidade de resolver problemas no trânsito e mobilidade comunitária.</td>
    </tr>
    <tr>
      <td><strong>7. Responsabilidade sobre a Própria Medicação</strong></td>
      <td>Toma os medicamentos corretos nas doses prescritas e nos horários adequados sem supervisão.</td>
      <td><strong>Marcador crítico de adesão e cognição:</strong> idoso que erra horários ou esquece comprimidos tem altíssimo risco de iatrogenia ou descompensação clínica.</td>
    </tr>
    <tr>
      <td><strong>8. Capacidade de Manejar Finanças</strong></td>
      <td>Gere seu próprio dinheiro, vai ao banco, recebe a aposentadoria, paga as contas de luz/água e controla extratos.</td>
      <td><strong>Primeiro domínio frequentemente afetado no início da Doença de Alzheimer:</strong> esquecimento de faturas, erros em trocos, vulnerabilidade a golpes financeiros.</td>
    </tr>
  </tbody>
</table>
<p><em>Interpretação Prática:</em> No Brasil, utiliza-se comumente a pontuação de 9 a 27 pontos (1 = dependência total, 2 = ajuda parcial, 3 = independência completa em cada um dos 9 itens adaptados) ou a pontuação clássica de 0 a 8 pontos. O declínio em Lawton na presença de Katz normal é o sinal de alerta precoce para rastreio cognitivo formal (Mini-Exame do Estado Mental ou MoCA).</p>
`
};
