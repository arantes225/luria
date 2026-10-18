// Bloco 5 - Aula 100: Testes Diagnósticos e Curvas ROC (Parte 5: Seções 21 a 23)

export const sec21 = {
  id: 'analise-de-custo-efetividade-e-curva-roc',
  title: '21. Análise Econômica em Saúde, Curvas ROC e a Relação de Custo-Efetividade Incremental (ICER)',
  body_html: `
<h3>A Convergência entre Bioestatística Diagnóstica e Farmacoeconomia</h3>
<p>Na gestão contemporânea de sistemas públicos (como o SUS) e na saúde suplementar, a decisão de adotar um novo teste diagnóstico contínuo ou substituir um método tradicional não se resume à sua acurácia ou à área sob a curva ROC. A pergunta central dos comitês de incorporação tecnológica (como a CONITEC no Brasil e o NICE no Reino Unido) é: <strong>quanto custa para a sociedade cada ganho adicional de sensibilidade ou especificidade proporcionado pelo novo exame?</strong></p>

<p>Ao deslizar o ponto de corte na curva ROC, o analista altera simultaneamente:</p>
<ul>
  <li><strong>O Custo Direto da Testagem:</strong> Preço do kit reagente, equipamentos automatizados, tempo de bancada e recursos humanos especializados;</li>
  <li><strong>O Custo das Consequências dos Falsos-Positivos:</strong> Gastos com biópsias desnecessárias, internações iatrogênicas, exames confirmatórios de alto custo e absenteísmo no trabalho decorrente de angústia psicológica;</li>
  <li><strong>O Custo das Consequências dos Falsos-Negativos:</strong> Despesas vultosas com internações em UTI por doença avançada não diagnosticada a tempo, procedimentos cirúrgicos de urgência, perda de produtividade por incapacidade permanente e indenizações jurídicas por erro médico.</li>
</ul>

<h3>A Relação de Custo-Efetividade Incremental (ICER) Associada ao Ponto de Corte</h3>
<p>A determinação do ponto de corte econômico ótimo pode ser modelada calculando-se a Relação de Custo-Efetividade Incremental (ICER - Incremental Cost-Effectiveness Ratio) entre dois limiares concorrentes $C_1$ e $C_2$:</p>

<div class="formula-box">
  $$\\text{ICER} = \\frac{\\text{Custo Total}(C_2) - \\text{Custo Total}(C_1)}{\\text{Efetividade}(C_2) - \\text{Efetividade}(C_1)} = \\frac{\\Delta \\text{Custo}}{\\Delta \\text{QALY (Anos de Vida Ajustados por Qualidade)}}$$
</div>

<p>Se o ICER resultante for inferior ao limiar de disposição a pagar da sociedade (habitualmente fixado pela OMS entre 1 a 3 vezes o Produto Interno Bruto per capita por QALY ganho), a mudança do ponto de corte ou a incorporação da nova tecnologia é classificada formalmente como <strong>custo-efetiva</strong>, justificando sua implementação nas diretrizes clínicas do sistema de saúde.</p>
`
};

export const sec22 = {
  id: 'bateria-de-questoes-comentadas-top-tier-complementares-roc',
  title: '22. Bateria Complementar de Questões Comentadas Top-Tier: Economia da Saúde e Curvas ROC',
  body_html: `
<h3>Questões de Bancas Médicas de Alta Complexidade</h3>

<h4>Questão 8: UNIFESP — Curva ROC e Impacto de Custos no Ponto de Corte</h4>
<p><strong>Enunciado:</strong> Um hospital terciário de referência pretende informatizar a triagem de sepse na sala de emergência utilizando um biomarcador plasmático contínuo. Sabendo que a antibioticoterapia iniciada precocemente previne óbito e reduz diárias de UTI (benefício muito elevado), mas que o uso excessivo de antibióticos gera seleção de germes multirresistentes e custos de farmácia, a direção clínica solicita ao médico infectologista que defina o ponto de corte no sistema. O médico deve orientar a seleção de um corte que:</p>
<p>A) Garanta especificidade de 100%, descartando qualquer possibilidade de falso-positivo.<br>
B) Pondere a gravidade clínica do falso-negativo (risco iminente de morte por choque séptico não tratado) frente aos danos do falso-positivo, escolhendo um limiar voltado para alta sensibilidade (deslocado para a esquerda da curva ROC), mesmo que o índice de Youden aponte para um ponto mais central.<br>
C) Utilize obrigatoriamente a linha diagonal de 45 graus para manter neutralidade bioestatística.<br>
D) Ignore a curva ROC, pois biomarcadores laboratoriais não possuem validade em terapia intensiva.<br>
E) Seja idêntico ao adotado para triagem de hepatite crônica em doadores assintomáticos.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Na sala de emergência diante de infecções graves com risco iminente de choque séptico e letalidade de 30% a 50%, o custo biológico do <strong>falso-negativo (morte evitável do paciente)</strong> é incomparavelmente mais grave que o custo do falso-positivo (receber antibioticoterapia e colher culturas desnecessariamente). Portanto, a equipe médica deve deliberadamente fixar um ponto de corte com <strong>alta sensibilidade</strong>, situando-se à esquerda do corte puramente matemático de Youden. Alternativa B impecável.</p>
`
};
