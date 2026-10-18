// Bloco 6 - Aula 120: Medicina Baseada em Evidências - Part 1
export const sec1 = {
  id: 'epistemologia-e-fundamentos-da-mbe',
  title: '1. Epistemologia e Fundamentos da Medicina Baseada em Evidências: Origens e Pilares de Sackett',
  body_html: `
<h3>O Nascimento de um Novo Paradigma na Prática Médica</h3>
<p>Durante séculos, a prática médica esteve ancorada no paradigma tradicional da autoridade professoral, na intuição individual empírica e na extrapolação mecanicista de modelos fisiopatológicos teóricos de bancada de laboratório. Se um determinado composto químico demonstrava vasodilatação em anéis aórticos isolados de cobaias ou suprimia extrassístoles ventriculares em modelos caninos, presumia-se tacitamente que prescrever essa molécula a seres humanos salvaria vidas. Esse modelo desmoronou progressivamente na segunda metade do século XX, quando ensaios clínicos rigorosos desmascararam que intervenções "fisiologicamente elegantes" matavam milhares de pacientes por toxicidade subclínica oculta (como a flecainida no estudo CAST ou a terapia de reposição hormonal no ensaio WHI).</p>

<p>No início da década de 1990, um grupo pioneiro de médicos e epidemiologistas da McMaster University no Canadá — liderados por <strong>David Sackett, Gordon Guyatt e Brian Haynes</strong> — formalizou o conceito contemporâneo de <strong>Medicina Baseada em Evidências (MBE)</strong>. Em artigo clássico publicado no <em>British Medical Journal (BMJ)</em> em 1996, Sackett cunhou a definição canônica que deve ser memorizada por todo candidato:</p>

<blockquote>
  "A Medicina Baseada em Evidências é o uso consciente, explícito e criterioso da melhor evidência científica contemporânea disponível na tomada de decisões sobre o cuidado individual de cada paciente."
</blockquote>

<h3>Os Três Pilares Integrados da Tríade de Sackett</h3>
<p>Uma das distorções conceituais mais combatidas nas provas de residência médica é a visão reducionista de que a MBE resume-se a aplicar roboticamente os números de uma metanálise ou os artigos de uma revista internacional. A verdadeira MBE é uma prática clínica holística sustentada na <strong>interseção harmoniosa de três pilares inegociáveis</strong>:</p>

<ol>
  <li><strong>A Melhor Evidência Científica Externa Disponível:</strong> Pesquisas clínicas metodologicamente sólidas e sistemáticas, com foco prioritário em ensaios clínicos randomizados de alta qualidade, estudos de acurácia diagnóstica validados e revisões sistemáticas independentes, avaliando desfechos clínicos centrados no paciente;</li>
  <li><strong>A Perícia e Experiência Clínica do Médico (Clinical Expertise):</strong> A habilidade diagnóstica refinada pelo exame físico minucioso à beira do leito, a capacidade de identificar rapidamente o estado de gravidade do paciente, o julgamento de nuances atípicas de apresentação e a sabedoria para decidir se o paciente à sua frente é compatível com os critérios de inclusão dos ensaios clínicos publicados;</li>
  <li><strong>Os Valores, Preferências, Expectativas e Contexto do Paciente:</strong> A autonomia individual do paciente, suas crenças éticas e religiosas, sua tolerância pessoal a riscos e efeitos adversos, suas prioridades de vida (ex.: priorizar qualidade de vida versus sobrevida em meses) e sua realidade socioeconômica. Sem a incorporação da vontade do paciente, a prática médica degenera em autoritarismo tecnológico frio.</li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão da Prática</th>
      <th>Paradigma Médico Tradicional</th>
      <th>Paradigma da Medicina Baseada em Evidências</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fundamento da Decisão</strong></td>
      <td>Autoridade acadêmica do chefe de serviço, tradição do hospital e racional fisiopatológico teórico não testado.</td>
      <td>Integração crítica da melhor evidência de desfechos clínicos com a perícia médica e os valores do paciente.</td>
    </tr>
    <tr>
      <td><strong>Raciocínio Diagnóstico</strong></td>
      <td>Solicitação desordenada de baterias de exames complementares ("check-ups gerais") interpretados de forma binária.</td>
      <td>Raciocínio bayesiano: estimativa da probabilidade pré-teste modulada por razões de verossimilhança (Likelihood Ratios).</td>
    </tr>
    <tr>
      <td><strong>Avaliação Terapêutica</strong></td>
      <td>Uso de desfechos laboratoriais substitutos (surrogates: queda de colesterol, melhora de curva de fluxo).</td>
      <td>Exigência de demonstração de benefício em desfechos clínicos duros centrados no paciente (mortalidade, sequela, qualidade de vida).</td>
    </tr>
    <tr>
      <td><strong>Relação Médico-Paciente</strong></td>
      <td>Paternalista: o médico dita a conduta inquestionável a um paciente passivo.</td>
      <td>Tomada de Decisão Compartilhada (Shared Decision Making): deliberação mútua informada por riscos absolutos transparentes.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec2 = {
  id: 'formulacao-da-pergunta-clinica-modelo-pico',
  title: '2. Formulação da Pergunta Clínica Estruturada: O Modelo PICO e suas Derivações',
  body_html: `
<h3>Da Incerteza Clínica à Busca Eficiente: O Modelo PICO</h3>
<p>O médico atuante em pronto-socorro ou ambulatório depara-se com dezenas de dúvidas práticas diariamente: <em>"Devo associar inibidor de SGLT2 para este paciente renal crônico?"</em>, <em>"Qual teste diagnóstico tem melhor acurácia para afastar apendicite neste pré-escolar?"</em>. O primeiro passo metodológico obrigatório para transformar uma dúvida clínica angustiante em uma estratégia de busca eletrônica bem-sucedida é a <strong>formulação estruturada da pergunta através do acrônimo PICO</strong>:</p>

<div class="formula-box">
  <p><strong>A Anatomia dos Quatro Elementos do PICO:</strong></p>
  <ul>
    <li><strong>P - Paciente, População ou Problema Clínico:</strong> Quais são as características sociodemográficas, faixa etária, estágio da doença ou comorbidades cruciais que definem o grupo de pacientes sob cuidado? (ex.: idosos $\ge 75$ anos com fibrilação atrial não valvar e clearance de creatinina entre 15 e 30 mL/min);</li>
    <li><strong>I - Intervenção ou Exposição Testada:</strong> Qual é o fármaco inovador, procedimento cirúrgico invasivo, teste diagnóstico índice, vacina ou fator de risco que se pretende avaliar? (ex.: uso de anticoagulante oral direto apixabana em dose ajustada);</li>
    <li><strong>C - Comparador ou Controle:</strong> Contra o que a intervenção será contrastada? (ex.: varfarina ajustada por RNI 2,0-3,0, ácido acetilsalicílico ou placebo);</li>
    <li><strong>O - Outcome ou Desfecho Clínico de Interesse:</strong> Quais eventos clínicos objetivos, relevantes e duros medirão a eficácia e os danos da conduta? (ex.: incidência de acidente vascular cerebral isquêmico, sangramento intracraniano maior e mortalidade por todas as causas).</li>
  </ul>
</div>

<h3>Variações da Estratégia PICO Segundo a Natureza da Dúvida Médica</h3>
<p>As bancas examinadoras cobram frequentemente as adaptações do modelo PICO conforme o objetivo epistemológico da investigação:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Questão Clínica</th>
      <th>Estrutura Mnemônica Aplicada</th>
      <th>Delineamento Metodológico Primário Ideal de Resposta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Terapêutica / Intervenção</strong><br>(Eficácia e Segurança de Fármacos/Cirurgias)</td>
      <td><strong>PICO</strong> clássico (Paciente, Intervenção, Comparador, Desfecho).</td>
      <td><strong>Ensaio Clínico Randomizado Duplo-Cego</strong> ou Revisão Sistemática com Metanálise de ECRs.</td>
    </tr>
    <tr>
      <td><strong>Acurácia Diagnóstica</strong><br>(Sensibilidade, Especificidade de Novos Exames)</td>
      <td><strong>PIRD</strong> (Population, Index Test, Reference Standard [Padrão-Ouro], Diagnosis).</td>
      <td><strong>Estudo Transversal de Acurácia Diagnóstica Cego</strong> comparado contra padrão-ouro simultâneo e independente.</td>
    </tr>
    <tr>
      <td><strong>Prognóstico e História Natural</strong><br>(Evolução Temporal e Fatores Preditores)</td>
      <td><strong>PECO</strong> (Population, Exposure [Marcador], Comparator, Outcome) ou <strong>PFO</strong> (Population, Factors, Outcome).</td>
      <td><strong>Estudo de Coorte Prospectiva de Base</strong> com seguimento longitudinal prolongado e sem perdas de atrito.</td>
    </tr>
    <tr>
      <td><strong>Etiologia e Fatores de Dano</strong><br>(Causalidade de Doenças Raras ou Ocupacionais)</td>
      <td><strong>PECO</strong> (Population, Exposure, Comparator, Outcome).</td>
      <td><strong>Estudo de Caso-Controle</strong> (para doenças raras) ou <strong>Estudo de Coorte</strong> (para exposições raras).</td>
    </tr>
    <tr>
      <td><strong>Pesquisas Qualitativas / Humanidades</strong><br>(Percepções, Sofrimento Psíquico e Crenças)</td>
      <td><strong>PICo</strong> (Population, Interest [Fenômeno de Interesse], Context [Contexto Cultural]).</td>
      <td>Estudos etnográficos, grupos focais e fenomenologia qualitativa.</td>
    </tr>
  </tbody>
</table>
`
};
