// Bloco 5 - Aula 105: Desenhos de Estudos Epidemiológicos - Part 4
export const sec7 = {
  id: 'casos-clinicos-e-questoes-comentadas',
  title: '7. Casos Clínicos Estruturados e Bateria de Questões Comentadas com Distratores',
  body_html: `
<h3>Casos Clínicos Aplicados à Prática da Pesquisa Médica</h3>

<div class="book-case">
  <h4>Caso Clínico 1: A Investigação do Surto de Fibrose Pulmonar em Polo Industrial</h4>
  <p><strong>Cenário:</strong> Um médico do trabalho recém-admitido em um complexo petroquímico identifica 18 operários diagnosticados com fibrose pulmonar idiopática atípica nos últimos 5 anos. Ele suspeita que a inalação de um novo catalisador particulado à base de nanopartículas de zircônio, introduzido na fábrica em 2015, seja o agente causal. Para avaliar essa hipótese, o médico dispõe dos arquivos do setor de Recursos Humanos contendo todas as fichas médicas admissionais e periódicas de 2.400 funcionários admitidos entre 2012 e 2018, detalhando a planta física em que cada um trabalhou, o uso de EPIs e as radiografias anuais de tórax.</p>
  <p><strong>Pergunta Metodológica:</strong> Qual é o delineamento epidemiológico mais eficiente, rápido e com menor custo para avaliar a hipótese utilizando a base de dados interna existente, calculando o risco real do adoecimento?</p>
  <p><strong>Resolução Clínica e Epidemiológica:</strong> O delineamento de escolha é a <strong>Coorte Retrospectiva (Histórica ou Não Concorrente)</strong>. O pesquisador selecionará os registros dos 2.400 operários admitidos no passado que eram livres de doença pulmonar na admissão ($T_0$), classificando-os em expostos às nanopartículas de zircônio e não expostos (outros setores da fábrica). Em seguida, seguirá seus prontuários médicos retrospectivamente ao longo dos anos para mensurar a taxa de incidência e o Risco Relativo ($RR$) de desenvolver fibrose. Esse desenho é muito mais robusto que um caso-controle retrospectivo com entrevistas porque os registros de exposição ocupacional foram coletados prospectivamente de forma documental antes do diagnóstico, eliminando o viés de recordatório.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: A Avaliação de Associação entre Uso de Telefonia Celular e Neurinoma do Acústico</h4>
  <p><strong>Cenário:</strong> Pesquisadores desejam investigar se o uso cumulativo prolongado de smartphones (> 10 anos) mantidos junto à orelha aumenta a probabilidade de desenvolvimento de neurinoma do acústico (schwannoma vestibular), um tumor intracraniano benigno, porém de incidência extremamente rara (aproximadamente 1 caso por 100.000 habitantes/ano). Os pesquisadores dispõem de um orçamento modesto para um projeto de 2 anos.</p>
  <p><strong>Pergunta Metodológica:</strong> Qual é o único desenho observacional viável para testar essa hipótese nessas condições?</p>
  <p><strong>Resolução Clínica e Epidemiológica:</strong> O único desenho viável é o <strong>Estudo de Caso-Controle</strong>. Para uma doença com incidência de 1 por 100.000 pessoas-ano, um estudo de coorte prospectiva exigiria recrutar centenas de milhares de pessoas e acompanhá-las por duas décadas a um custo estratosférico para acumular um punhado de casos. No estudo de caso-controle, os pesquisadores recrutam todos os 60 pacientes diagnosticados com neurinoma em centros de referência em neurocirurgia nos últimos 3 anos (casos) e selecionam 180 indivíduos hígidos pareados por sexo e idade na mesma região (controles), aplicando um questionário retrospectivo detalhado sobre horas de uso do aparelho, calculando o Odds Ratio ($OR$).</p>
</div>

<h3>Bateria de Questões Comentadas com Distratores Analisados</h3>

<h4>Questão 1 (Residência Médica / Revalida - Base Nacional)</h4>
<p>Um pesquisador avaliou a relação entre o consumo per capita de leite enriquecido com vitamina D e as taxas de fratura de fêmur em mulheres idosas em 18 estados brasileiros, utilizando dados secundários de vendas comerciais e registros de internações do Sistema de Informações Hospitalares do SUS (SIH-SUS). Observou-se que os estados com maior venda per capita de leite enriquecido apresentavam menores coeficientes de internação por fratura osteoporótica ($r = -0,68; p = 0,002$). O pesquisador concluiu no artigo que o consumo regular de leite com vitamina D previne individualmente fraturas de fêmur em qualquer idosa brasileira. Do ponto de vista metodológico, o desenho do estudo e a principal crítica científica à conclusão são, respectivamente:</p>
<ul>
  <li>A) Estudo de coorte histórica; viés de atrito por perdas de registros no SIH-SUS.</li>
  <li>B) Estudo transversal analítico; presença de causalidade reversa.</li>
  <li>C) Estudo ecológico; falácia ecológica (falácia de Robinson).</li>
  <li>D) Ensaio comunitário; ausência de consentimento livre e esclarecido dos consumidores.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> A unidade de análise não foi o indivíduo, mas sim agregados populacionais territoriais (estados brasileiros), o que define inequivocamente um <strong>Estudo Ecológico</strong>. A extrapolação direta de que uma mulher idosa individualmente terá menor risco de fratura ao tomar leite com vitamina D com base em dados de vendas por estado configura a <strong>Falácia Ecológica</strong> (os estados com mais vendas de leite enriquecido podem ser aqueles com maior IDH, melhor rede hospitalar de prevenção de quedas, melhor pavimento urbano ou maior suplementação medicamentosa de bisfosfonatos). As alternativas A, B e D erram grosseiramente na tipificação do delineamento.</p>

<h4>Questão 2 (Processo Seletivo Unificado - PSU/MG)</h4>
<p>Para investigar a associação entre a exposição ocupacional materna a agrotóxicos organofosforados durante o primeiro trimestre gestacional e a ocorrência de anencefalia fetal, um grupo de pesquisadores selecionou 80 recém-nascidos e natimortos com anencefalia confirmada por necropsia em maternidades de referência e 240 recém-nascidos sem malformações congênitas nascidos nos mesmos hospitais e semanas. As mães de ambos os grupos foram entrevistadas sobre o trabalho agrícola pregresso e uso de agrotóxicos. Sobre esse estudo, assinale a alternativa CORRETA:</p>
<ul>
  <li>A) Trata-se de um estudo de coorte prospectiva, permitindo o cálculo do Risco Relativo direto da malformação.</li>
  <li>B) O desenho é de caso-controle, adequado para desfechos raros, cuja medida de associação canônica é o Odds Ratio.</li>
  <li>C) Por se tratar de um estudo transversal, a medida calculada é a Razão de Prevalências, livre de qualquer viés de memória.</li>
  <li>D) A incidência de anencefalia nesse estudo foi de 25% (80 casos em 320 participantes).</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> O estudo partiu do desfecho (80 crianças com anencefalia e 240 sadias) e investigou retrospectivamente a exposição gestacional prévia. Trata-se do clássico <strong>Estudo de Caso-Controle</strong>, ideal para desfechos raríssimos como malformações do tubo neural, e sua medida canônica de efeito é o <strong>Odds Ratio</strong> ($OR$). A alternativa A está errada porque o estudo não é de coorte nem mede risco relativo; a alternativa C erra o tipo de estudo; a alternativa D comete o erro clássico de calcular incidência fictícia baseada no número de casos e controles pré-fixados pelo pesquisador na proporção 1:3.</p>

<h4>Questão 3 (USP / ENARE)</h4>
<p>Um estudo acompanhou 10.000 adultos hígidos com idade entre 40 e 60 anos, sem histórico de nefropatia prévia. No início da pesquisa, 2.000 participantes relataram uso crônico de anti-inflamatórios não esteroidais (AINEs $\ge$ 3 vezes por semana há mais de 1 ano) e 8.000 relataram não fazer uso. Após 10 anos de seguimento ativo com consultas semestrais, 100 indivíduos do grupo exposto aos AINEs e 80 indivíduos do grupo não exposto desenvolveram Doença Renal Crônica estágio 3 ou superior. Com base exclusivamente nesses dados, o Risco Relativo ($RR$) e o Risco Atribuível nos expostos ($RA$) associados ao uso crônico de AINEs são, respectivamente:</p>
<ul>
  <li>A) $RR = 5,0$ e $RA = 40$ casos por 1.000 pessoas em 10 anos.</li>
  <li>B) $RR = 1,25$ e $RA = 20$ casos por 1.000 pessoas em 10 anos.</li>
  <li>C) $RR = 4,0$ e $RA = 0,05$.</li>
  <li>D) $RR = 0,2$ e $RA = -0,04$.</li>
</ul>
<p><strong>Gabarito Comentado: Letra A.</strong></p>
<p><em>Justificativa:</em> Trata-se de um estudo de coorte prospectiva. Vamos calcular passo a passo:</p>
<div class="formula-box">
  <p>1. Incidência no grupo exposto ($I_e$): $\\frac{100}{2.000} = 0,05$ ou 50 por 1.000 pessoas em 10 anos.</p>
  <p>2. Incidência no grupo não exposto ($I_0$): $\\frac{80}{8.000} = 0,01$ ou 10 por 1.000 pessoas em 10 anos.</p>
  <p>3. Risco Relativo ($RR$): $\\frac{I_e}{I_0} = \\frac{0,05}{0,01} = 5,0$. O uso crônico de AINEs aumentou em 5 vezes o risco de doença renal crônica.</p>
  <p>4. Risco Atribuível nos expostos ($RA = I_e - I_0$): $0,05 - 0,01 = 0,04$ ou 40 casos por 1.000 pessoas em 10 anos atribuíveis puramente aos AINEs.</p>
</div>
<p>Apenas a alternativa A traz os valores corretos.</p>

<h4>Questão 4 (UNICAMP / Revalida INEP)</h4>
<p>O Diretor Clínico de um hospital universitário conduziu uma pesquisa aplicando um questionário a todos os 450 médicos do corpo clínico durante a semana de renovação cadastral. O questionário avaliou simultaneamente a pontuação na escala de exaustão emocional de Maslach (Síndrome de Burnout) e a presença de gastrite diagnosticada por endoscopia digestiva alta. Encontrou-se que os médicos com Burnout apresentavam o dobro de frequência de gastrite quando comparados aos médicos sem Burnout ($RP = 2,0; IC95\\%: 1,4 - 2,8$). A principal limitação metodológica desse estudo para afirmar que o Burnout causa gastrite é:</p>
<ul>
  <li>A) Viés de Berkson decorrente da internação de médicos no hospital.</li>
  <li>B) Causalidade reversa gerada pela aferição simultânea da exposição e do agravo em um desenho transversal.</li>
  <li>C) Erro alfa excessivo decorrente de amostragem probabilística estratificada.</li>
  <li>D) Impossibilidade de calcular a prevalência do agravo em estudos seccionais.</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> Em um estudo transversal (pesquisa pontual por questionário aplicado a um grupo de médicos), exposição (Burnout) e agravo (gastrite) foram aferidos no mesmo momento temporal. Não há como saber se o sofrimento psíquico do Burnout desencadeou desregulação vagal e hipersecreção gástrica, ou se a dor epigástrica crônica, queimação, náuseas e insônia decorrentes da gastrite prévia precipitaram e agravaram o esgotamento profissional no trabalho hospitalar (<strong>causalidade reversa</strong>). A alternativa B resume com precisão a fragilidade intrínseca dos estudos transversais.</p>

<h4>Questão 5 (Hospital Sírio-Libanês / USP)</h4>
<p>Em um ensaio clínico randomizado, duplo-cego e controlado por placebo, avaliou-se a eficácia de um novo anticorpo monoclonal na redução de mortalidade cardiovascular em 4.000 pacientes com insuficiência cardíaca crônica grave. Para evitar que os médicos assistentes favorecessem a alocação de pacientes mais frágeis no grupo da nova droga, a sequência aleatória foi gerada por um algoritmo computacional externo independente e os envelopes contendo o código de alocação eram sequencialmente numerados, opacos e só abertos após a assinatura do TCLE e validação da elegibilidade. Esse mecanismo metodológico específico denomina-se:</p>
<ul>
  <li>A) Mascaramento triplo-cego de desfechos clínicos.</li>
  <li>B) Sigilo de alocação (Allocation Concealment).</li>
  <li>C) Análise por intenção de tratar estratificada.</li>
  <li>D) Pareamento proporcional por escore de propensão (Propensity Score).</li>
</ul>
<p><strong>Gabarito Comentado: Letra B.</strong></p>
<p><em>Justificativa:</em> A blindagem que impede o recrutador de prever ou interferir no braço em que o paciente elegível ingressará é a definição exata de <strong>Sigilo de Alocação (Allocation Concealment)</strong>. Se o sigilo de alocação for quebrado, o estudo incorre em grave viés de seleção, destruindo o benefício gerado pela randomização. Não se confunde com cegamento (que ocorre <em>após</em> a entrada do paciente no braço de tratamento).</p>

<h4>Questão 6 (Santa Casa de São Paulo)</h4>
<p>Considere as seguintes assertivas sobre a Pirâmide de Evidências em sua moderna concepção epidemiológica:</p>
<p>I. Estudos ecológicos e relatos de casos clínicos situam-se na base da pirâmide e prestam-se precipuamente à geração de hipóteses etiológicas.<br>
II. O estudo de coorte prospectiva é superior ao ensaio clínico randomizado para comprovar a eficácia terapêutica de uma nova droga, em virtude de sua menor taxa de efeito placebo.<br>
III. As Revisões Sistemáticas com Metanálise funcionam como uma lente de aumento crítica e integradora sobre os estudos primários, podendo ser degradadas na certeza da evidência (GRADE) caso os ensaios de base apresentem alto risco de viés.</p>
<p>Está(ão) CORRETA(S) apenas:</p>
<ul>
  <li>A) I e II.</li>
  <li>B) II e III.</li>
  <li>C) I e III.</li>
  <li>D) Apenas a III.</li>
</ul>
<p><strong>Gabarito Comentado: Letra C.</strong></p>
<p><em>Justificativa:</em> A assertiva I é perfeita (estudos descritivos e ecológicos geram hipóteses). A assertiva II é falsa porque o ensaio clínico randomizado é o padrão-ouro supremo para avaliar eficácia terapêutica, superando a coorte observacional (que sofre de viés de indicação e confundimento). A assertiva III é correta segundo o modelo moderno de Murad (2016) e o sistema GRADE. Logo, apenas I e III estão corretas (Letra C).</p>
`
};
