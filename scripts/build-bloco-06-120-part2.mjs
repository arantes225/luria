// Bloco 6 - Aula 120: Medicina Baseada em Evidências - Part 2
export const sec3 = {
  id: 'hierarquia-de-evidencias-e-revisao-sistematica-como-lente',
  title: '3. A Hierarquia das Evidências: Da Pirâmide Rígida Clássica à Lente Metanalítica Contemporânea',
  body_html: `
<h3>A Evolução Histórica da Pirâmide de Evidências</h3>
<p>Em meados da década de 1990, a hierarquia da Medicina Baseada em Evidências foi didaticamente representada como uma pirâmide rígida com divisões horizontais lineares estáticas. Nesse modelo clássico, o poder inferencial de um estudo dependia quase que exclusivamente do seu "rótulo metodológico":</p>

<div class="formula-box">
  <p><strong>A Pirâmide Clássica Tradicional (Da Base ao Topo):</strong></p>
  <ol>
    <li>Opinião de especialistas, consensos informais de sociedades e pesquisas pré-clínicas <em>in vitro</em> / modelos animais;</li>
    <li>Relatos de casos clínicos e séries de casos hospitalares;</li>
    <li>Estudos de caso-controle retrospectivos;</li>
    <li>Estudos de coorte longitudinais observacionais;</li>
    <li>Ensaios Clínicos Randomizados (ECR);</li>
    <li><strong>Ápice da Pirâmide:</strong> Revisões Sistemáticas com Metanálise de Ensaios Clínicos Randomizados.</li>
  </ol>
</div>

<h3>As Fragilidades Intrínsecas do Modelo Rígido Clássico</h3>
<p>Com o amadurecimento metodológico da epidemiologia nas duas últimas décadas, tornou-se evidente que a pirâmide tradicional padecia de duas falhas conceituais profundas:</p>
<ol>
  <li><strong>A Ilusão do Rótulo Metodológico:</strong> Nem todo ensaio clínico randomizado é superior a uma coorte. Um ECR com amostra minúscula de 20 pacientes, sem sigilo de alocação, sem cegamento, com perdas de seguimento superiores a 35% e financiado pela indústria com desfechos seletivos (<em>cherry-picking</em>) é cientificamente muito inferior a um estudo de coorte prospectiva rigoroso com 100.000 participantes acompanhados por 30 anos sem perdas e com controle primoroso de confundimento!;</li>
  <li><strong>O Erro Ontológico da Metanálise no Topo:</strong> A revisão sistemática com metanálise <strong>NÃO É UM NOVO DELINEAMENTO DE ESTUDO PRIMÁRIO</strong>. Ela é um método de síntese secundária. Uma metanálise que reúne dez ensaios clínicos metodologicamente falhos e com alto risco de viés apenas sintetizará e concentrará o erro, fornecendo uma estimativa matemática errada com falso poder estatístico inflado (o célebre aforismo da computação: <em>"Garbage in, garbage out"</em> — entra lixo, sai lixo).</li>
</ol>

<h3>A Revolução da Pirâmide Contemporânea (Modelo de Murad et al., 2016)</h3>
<p>Para corrigir essas distorções epistemológicas, a publicação seminal de M. Hassan Murad e colaboradores no <em>BMJ Evidence-Based Medicine</em> (2016) reformulou a pirâmide com duas modificações revolucionárias:</p>

<ul>
  <li><strong>1. Linhas Onduladas e Flexíveis entre os Desenhos:</strong> As fronteiras lineares rígidas entre coortes e ensaios clínicos foram substituídas por linhas onduladas. Reconhece-se formalmente que uma coorte impecável pode fornecer evidências de certeza mais elevada do que um ensaio clínico vulnerável e enviesado;</li>
  <li><strong>2. A Revisão Sistemática como Lente de Aumento (Magnifying Glass):</strong> A revisão sistemática com metanálise foi removida do "teto" da pirâmide e passou a ser posicionada <strong>fora e acima da pirâmide, atuando como uma Lente de Aumento Integrada</strong> através da qual todos os outros delineamentos primários são enxergados, auditados pelo sistema Cochrane RoB 2 / ROBINS-I e julgados pelo sistema GRADE.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Aspecto Comparativo</th>
      <th>Pirâmide Tradicional Clássica (Guyatt, 1995)</th>
      <th>Nova Pirâmide Contemporânea (Murad, 2016)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Concepção de Hierarquia</strong></td>
      <td>Rígida, fixa, compartimentalizada e dogmática baseada no nome do desenho.</td>
      <td>Fluida, dinâmica e baseada no julgamento crítico da qualidade metodológica real.</td>
    </tr>
    <tr>
      <td><strong>Divisões entre Estratos</strong></td>
      <td>Linhas retas horizontais estáticas.</td>
      <td>Linhas onduladas permitindo superposição de certezas probatórias.</td>
    </tr>
    <tr>
      <td><strong>Papel da Metanálise</strong></td>
      <td>O "ápice isolado" inquestionável no topo da pirâmide.</td>
      <td>A <strong>lente de aumento avaliadora</strong> que inspeciona criticamente o corpo probatório.</td>
    </tr>
    <tr>
      <td><strong>Classificação Final</strong></td>
      <td>Ditada pelo desenho do estudo.</td>
      <td>Graduada formalmente pelo <strong>Sistema GRADE</strong> (Alta, Moderada, Baixa, Muito Baixa).</td>
    </tr>
  </tbody>
</table>
`
};

export const sec4 = {
  id: 'metricas-de-beneficio-e-dano-em-mbe',
  title: '4. Métricas de Risco, Benefício e Dano: Risco Relativo, RRR, RRA, NNT e NNH',
  body_html: `
<h3>O Perigo da Manipulação Numérica: A Redução Relativa versus Absoluta</h3>
<p>Um dos preceitos mais caros à Medicina Baseada em Evidências é a obrigação ética de comunicar riscos aos pacientes e à sociedade de forma transparente e desprovida de manipulação estatística. A literatura médica e o marketing farmacêutico utilizam com frequência desonesta a <strong>Redução Relativa do Risco (RRR)</strong>, pois ela expressa porcentagens grandiosas que impressionam o leigo, enquanto omitem a <strong>Redução Absoluta do Risco (RRA)</strong> e o <strong>Número Necessário para Tratar (NNT)</strong>, que revelam a relevância real da intervenção.</p>

<p>Para dominar com destreza os cálculos bioestatísticos do dia a dia e das provas de residência, aplicamos as seguintes relações matemáticas sobre a tabela de contingência:</p>

<div class="formula-box">
  <p><strong>Definições Fundamentais:</strong></p>
  <ul>
    <li><strong>Risco no Grupo Controle ($CER$ - Control Event Rate):</strong> $CER = \\frac{\\text{Eventos no Controle}}{\\text{Total de Pacientes no Controle}}$</li>
    <li><strong>Risco no Grupo Experimental ($EER$ - Experimental Event Rate):</strong> $EER = \\frac{\\text{Eventos no Experimental}}{\\text{Total de Pacientes no Experimental}}$</li>
    <li><strong>Risco Relativo ($RR$):</strong> Razão entre os riscos: $RR = \\frac{EER}{CER}$</li>
    <li><strong>Redução Relativa do Risco ($RRR$):</strong> $RRR = \\frac{CER - EER}{CER} = 1 - RR$</li>
    <li><strong>Redução Absoluta do Risco ($RRA$ ou $ARR$):</strong> $RRA = CER - EER$</li>
    <li><strong>Número Necessário para Tratar ($NNT$):</strong> $NNT = \\frac{1}{RRA} = \\frac{1}{CER - EER}$</li>
    <li><strong>Aumento Absoluto do Risco de Evento Adverso ($ARI$):</strong> $ARI = EER_{tox} - CER_{tox}$</li>
    <li><strong>Número Necessário para Causar Dano ($NNH$):</strong> $NNH = \\frac{1}{ARI} = \\frac{1}{EER_{tox} - CER_{tox}}$</li>
  </ul>
</div>

<h3>Exercício Resolvido Paradigmático de Concurso: A Comparação Crítica de Dois Ensaios</h3>
<div class="book-case">
  <h4>Cenário Clínico Prático:</h4>
  <p>Uma nova droga antiplaquetária foi testada em dois ensaios clínicos randomizados distintos para prevenir morte vascular em 1 ano:</p>
  <ul>
    <li><strong>Ensaio 1 (Pacientes Pós-Infarto Agudo do Miocárdio com Choque - Alto Risco Basal):</strong>
      <ul>
        <li>Incidência de óbito no grupo placebo ($CER$): $16\\%$ ($0,16$);</li>
        <li>Incidência de óbito com a nova droga ($EER$): $12\\%$ ($0,12$);</li>
        <li>$RR = \\frac{0,12}{0,16} = 0,75$;</li>
        <li>$RRR = 1 - 0,75 = 25\\%$;</li>
        <li>$RRA = 0,16 - 0,12 = 0,04$ ($4\\%$ ou 4 pontos percentuais);</li>
        <li>$NNT = \\frac{1}{0,04} = \\mathbf{25}$. (É preciso tratar 25 pacientes por 1 ano para evitar 1 morte vascular!).</li>
      </ul>
    </li>
    <li><strong>Ensaio 2 (Prevenção Primária em Indivíduos Jovens Assintomáticos - Baixo Risco Basal):</strong>
      <ul>
        <li>Incidência de óbito no grupo placebo ($CER$): $0,8\\%$ ($0,008$);</li>
        <li>Incidência de óbito com a nova droga ($EER$): $0,6\\%$ ($0,006$);</li>
        <li>$RR = \\frac{0,006}{0,008} = 0,75$;</li>
        <li>$RRR = 1 - 0,75 = \\mathbf{25\\%}$ (Exatamente a mesma RRR do Ensaio 1!);</li>
        <li>$RRA = 0,008 - 0,006 = 0,002$ ($0,2\\%$);</li>
        <li>$NNT = \\frac{1}{0,002} = \\mathbf{500}$. (É preciso tratar 500 jovens por 1 ano para evitar uma única morte!).</li>
      </ul>
    </li>
  </ul>
  <p><strong>A Lição Suprema da MBE:</strong> Enquanto a propaganda enfatiza a "redução de 25% no risco de morrer", o julgamento da RRA e do NNT demonstra que a droga é altamente custo-efetiva e imperativa no Ensaio 1 ($NNT = 25$), mas tem aplicabilidade clínica questionável no Ensaio 2 ($NNT = 500$), onde os custos e o risco de sangramento superam amplamente o benefício modesto.</p>
</div>

<h3>Regras Bioestatísticas de Arredondamento do NNT e NNH</h3>
<p>Em questões discursivas e objetivas com alternativas decimais, atente para as regras éticas universais:</p>
<ol>
  <li><strong>O NNT é sempre arredondado para CIMA (número inteiro imediatamente superior):</strong> Se o cálculo resultar em $NNT = 18,2$, arredonda-se para <strong>$19$</strong> (pois tratar 18 pacientes não atinge a cota de 1 paciente integral salvo);</li>
  <li><strong>O NNH é sempre arredondado para BAIXO (número inteiro imediatamente inferior):</strong> Se o cálculo resultar em $NNH = 54,9$, arredonda-se para <strong>$54$</strong> (pelo princípio bioético da precaução e detecção precoce do dano).</li>
</ol>
`
};
