// Bloco 4 - Aula 080: Investigação de Surtos e Epidemias (Parte 3: Seções 9 a 11 - Bateria de 10 Questões Comentadas)

export const sec9 = {
  id: 'bateria-de-questoes-comentadas-surtos',
  title: '9. Bateria de Questões Comentadas do ENAMED e Concursos Médicos de Residência',
  body_html: `
<h3>Questões de Alto Desafio com Análise Exaustiva de Alternativas</h3>

<h4>Questão 1: ENARE / ENAMED — Análise de Tabela de Taxa de Ataque de Alimentos</h4>
<p><strong>Enunciado:</strong> Durante a festa de confraternização de um hospital com 200 convidados, 80 pessoas apresentaram quadro de náuseas, vômitos profusos, febre de $38,5^\circ\\text{C}$ e cólicas intestinais intensas cerca de 18 a 24 horas após o término do banquete. O médico sanitarista realizou estudo de coorte retrospectiva e obteve os seguintes dados relativos ao consumo dos três pratos principais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th rowspan="2">Alimento Servido</th>
      <th colspan="2">Comeram o Alimento</th>
      <th colspan="2">NÃO Comeram o Alimento</th>
    </tr>
    <tr>
      <th>Doentes / Total</th>
      <th>Taxa de Ataque</th>
      <th>Doentes / Total</th>
      <th>Taxa de Ataque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rosbife ao Molho Madeira</strong></td>
      <td>68 / 80</td>
      <td>85,0%</td>
      <td>12 / 120</td>
      <td>10,0%</td>
    </tr>
    <tr>
      <td><strong>Arroz Primavera</strong></td>
      <td>72 / 160</td>
      <td>45,0%</td>
      <td>8 / 40</td>
      <td>20,0%</td>
    </tr>
    <tr>
      <td><strong>Torta Holandesa de Sobremesa</strong></td>
      <td>50 / 100</td>
      <td>50,0%</td>
      <td>30 / 100</td>
      <td>30,0%</td>
    </tr>
  </tbody>
</table>
<p>Com base nos dados epidemiológicos apresentados, assinale a conclusão estritamente correta:</p>
<p>A) O Arroz Primavera é o alimento mais suspeito, pois apresentou o maior número absoluto de doentes (72 casos).<br>
B) O Rosbife ao Molho Madeira é o provável veículo causal do surto, pois apresentou a maior taxa de ataque entre os expostos (85%), a menor taxa entre os não expostos (10%), o maior Risco Relativo ($RR = 8,5$) e a maior diferença de risco ($RA = +75\\%$).<br>
C) Não é possível incriminar nenhum alimento porque 12 pessoas que NÃO comeram o rosbife também adoeceram.<br>
D) O surto foi obrigatoriamente causado por <em>Staphylococcus aureus</em> devido à alta taxa de ataque observada.<br>
E) O estudo analítico apropriado deveria ter sido do tipo ecológico, sendo a coorte retrospectiva contraindicada em eventos fechados.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A análise clássica de uma tabela de alimentos em investigações de DTA avalia: (1) O Risco Relativo: $RR = \\frac{85\\%}{10\\%} = 8,5$; (2) A Diferença de Risco (Risco Atribuível): $RA = 85\\% - 10\\% = 75\\%$. O Rosbife ao Molho Madeira exibe um gradiente de risco massivo: quem comeu o rosbife teve 8,5 vezes mais chance de adoecer do que quem não comeu. O fato de haver 12 pessoas doentes que relataram não ter comido o rosbife explica-se rotineiramente por viés de memória em inquéritos retrospectivos, contaminação cruzada de pratos ou talheres no buffet coletivo ou consumo inadvertido de molho residual.<br>
• <strong>Alternativa A (Incorreta):</strong> O número absoluto de doentes depende do número total de pessoas que consumiram o alimento (popularidade do prato) e não expressa o risco relativo intrínseco.<br>
• <strong>Alternativa C (Incorreta):</strong> Contaminação cruzada e erros de recordatório são esperados em eventos de campo e não invalidam uma razão de riscos de 8,5.<br>
• <strong>Alternativa D (Incorreta):</strong> O período de incubação relatado foi de 18 a 24 horas e com <strong>febre de $38,5^\circ\\text{C}$</strong>, o que afasta <em>S. aureus</em> (incubação ultracurta de 1 a 6h e afebril) e aponta fortemente para <em>Salmonella</em> ou <em>Campylobacter</em>.<br>
• <strong>Alternativa E (Incorreta):</strong> O estudo de coorte retrospectiva é exatamente o padrão-ouro quando a população sob risco é delimitada e acessível.</p>

<h4>Questão 2: USP-SP — Reconhecimento da Morfologia da Curva Epidêmica</h4>
<p><strong>Enunciado:</strong> Em uma escola de ensino fundamental, foram notificados 45 casos de varicela ao longo de 8 semanas. A representação gráfica dos casos por semana de início do exantema revelou um caso índice na Semana 1, seguido por 4 casos na Semana 3, 16 casos na Semana 5 e 24 casos na Semana 7, com intervalos de aproximadamente 14 a 16 dias separando os aumentos na incidência. Esse perfil gráfico caracteriza tipicamente uma epidemia do tipo:</p>
<p>A) Fonte comum pontual.<br>
B) Fonte comum contínua.<br>
C) Propagada (ou progressiva, pessoa a pessoa).<br>
D) Fonte intermitente ambiental.<br>
E) Pseudoepidemia artefatual.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> A curva epidêmica com picos sucessivos progressivamente maiores, espaçados por um intervalo temporal constante correspondente ao período médio de incubação da doença (no caso da varicela, 14 a 16 dias), é a marca registrada incontestável da <strong>Epidemia Propagada ou de Transmissão Pessoa a Pessoa</strong>. O caso índice na Semana 1 transmitiu para a 1ª geração de casos secundários na Semana 3, que por sua vez transmitiram para a 2ª geração na Semana 5, culminando na ampla disseminação na Semana 7.<br>
• <strong>Alternativas A e B:</strong> Epidemias de fonte comum decorrem da exposição compartilhada a um veículo inanimado (água ou alimento), sem ondas reprodutivas espaçadas por períodos de incubação inter-humanos.</p>

<h4>Questão 3: UNIFESP — A Construção do Canal Endêmico e Exclusão de Anos Epidêmicos</h4>
<p><strong>Enunciado:</strong> Um médico recém-empossado na coordenação da vigilância epidemiológica municipal recebe a tarefa de atualizar o diagrama de controle (canal endêmico) para meningites bacterianas no município. Ao coletar os dados dos últimos 5 anos, observa que há três anos o município vivenciou um grande surto de meningite meningocócica do sorogrupo C decorrente de falha de cobertura vacinal, com quadruplicação dos casos habituais. Ao calcular os parâmetros estatísticos do canal endêmico para o próximo ano, qual a conduta metodologicamente mandatória que o médico deve adotar?</p>
<p>A) Manter os dados de todos os 5 anos no cálculo da média, pois a exclusão de anos violaria o princípio da transparência na gestão pública.<br>
B) Excluir formalmente os dados do ano em que ocorreu a epidemia de meningite do cálculo da média e dos limites do canal endêmico.<br>
C) Substituir a média aritmética pelo valor máximo observado no ano epidêmico como novo limiar basal de tolerância.<br>
D) Dividir os casos do ano epidêmico pela metade para compensar matematicamente a distorção.<br>
E) O canal endêmico só tem validade se calculado com séries temporais de no mínimo 50 anos consecutivos.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A regra clássica e estrita da vigilância epidemiológica preconiza que, na série histórica dos últimos 3 a 5 anos utilizada para construir o diagrama de controle, <strong>DEVE-SE EXCLUIR FORMALMENTE OS ANOS ATÍPICOS OU EPIDÊMICOS</strong>. A inclusão de um ano com quadruplicação de casos inflaria artificialmente a média histórica ($\bar{X}$) e o limite superior ($\bar{X} + 1,96 \times DP$). Como consequência dessa inflação artificial, futuros surtos reais de meningite permaneceriam ocultos dentro da faixa normal aparente (falsos-negativos), impedindo a deflagração oportuna de medidas de bloqueio e causando mortes evitáveis.<br>
• <strong>Demais alternativas:</strong> Contrapõem-se frontalmente às diretrizes normativas do Ministério da Saúde e do CDC.</p>

<h4>Questão 4: UERJ — Taxa de Ataque Secundária em Domicílio</h4>
<p><strong>Enunciado:</strong> Em uma comunidade vulnerável, um escolar de 7 anos não vacinado desenvolve sarampo típico (caso primário/índice). Ele reside em uma casa com mais 6 familiares: os pais (ambos de 35 anos, com comprovação vacinal de duas doses de tríplice viral na infância), uma avó de 68 anos (com história comprovada de ter tido sarampo na infância) e 3 irmãos menores (de 2, 4 e 5 anos, nenhum deles vacinado contra o sarampo). Quatorze dias após o aparecimento do exantema no caso primário, 2 dos três irmãos menores desenvolvem febre, tosse, conjuntivite e exantema maculopapular com sarampo confirmado laboratorialmente. Os pais, a avó e o outro irmão permaneceram assintomáticos. Qual é o valor exato da <strong>Taxa de Ataque Secundária (TAS)</strong> nessa família?</p>
<p>A) 28,6% (2 casos / 7 residentes totais).<br>
B) 33,3% (2 casos / 6 contatos domiciliares).<br>
C) 50,0% (3 doentes totais / 6 contatos).<br>
D) 66,7% (2 casos secundários / 3 contatos suscetíveis sob risco).<br>
E) 100,0% (todos os irmãos expostos adoeceram).</p>
<p><strong>Gabarito Oficial: Alternativa D.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa D (Correta):</strong> Aplicação rigorosa da fórmula da Taxa de Ataque Secundária:
$$\\text{TAS} = \\frac{\\text{Novos Casos Secundários}}{\\text{População de Contatos Suscetíveis sob Risco}} \\times 100$$
1. <strong>Identificação do Numerador:</strong> O número de casos secundários é exatamente <strong>2</strong> (os dois irmãos menores que adoeceram após a janela de incubação). O caso primário (o escolar de 7 anos) NÃO entra no numerador.<br>
2. <strong>Identificação do Denominador:</strong> O total de contatos que coabitam a casa é 6. No entanto, <strong>os indivíduos comprovadamente imunes DEVEM SER EXCLUÍDOS do denominador</strong>, pois não estão sob risco biológico de adoecer. Os pais são imunes por vacinação completa (2 pessoas excluídas) e a avó é imune por infecção prévia na infância (1 pessoa excluída). Restam como <strong>contatos suscetíveis sob risco apenas os 3 irmãos menores</strong>.<br>
3. <strong>Cálculo:</strong> $\\text{TAS} = \\frac{2}{3} \\times 100 = 66,67\\% \\approx 66,7\\%$. Alternativa D perfeita.</p>

<h4>Questão 5: UNESP — Os Dez Passos da Investigação e Oportunidade das Medidas de Controle</h4>
<p><strong>Enunciado:</strong> Uma equipe de vigilância epidemiológica municipal está no 4º dia de investigação de um surto de diarreia mucossanguinolenta associada a vômitos que já acometeu 38 alunos de um colégio particular. A inspeção sanitária na cantina escolar revela que o reservatório de água superior apresentava a tampa quebrada com carcaça de pombo em decomposição no seu interior, e o cloro residual livre na torneira da cozinha era de 0,0 mg/L. O coordenador da equipe sugere aguardar o isolamento definitivo da bactéria nas fezes dos alunos (em andamento no LACEN) e a conclusão do estudo de coorte para então interditar a cantina e desinfectar a caixa d’água. Diante das boas práticas de epidemiologia de campo, essa sugestão do coordenador é:</p>
<p>A) Correta, pois medidas punitivas de interdição sanitária sem laudo etiológico definitivo sujeitam o município a processos judiciais de reparação de danos materiais.<br>
B) Incorreta, pois a implementação de medidas imediatas de prevenção e controle (como interdição, desinfecção de reservatórios e fornecimento de água potável segura) deve ocorrer assim que houver evidências operacionais suficientes de risco à saúde pública, não devendo jamais ser postergada até o relatório final ou laudo laboratorial definitivo.<br>
C) Correta, pois os dez passos do CDC exigem cumprimento estritamente cronológico unidirecional.<br>
D) Incorreta, pois em ambiente escolar a vigilância sanitária não possui competência legal de fiscalização.<br>
E) Indiferente, pois a cloração da água não tem efeito sobre bactérias gastrointestinais.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Esta é uma das regras éticas e operacionais mais enfatizadas na literatura epidemiológica internacional: <strong>o objetivo supremo da investigação de um surto é PROTEGER A SAÚDE DA POPULAÇÃO e CESSAR A TRANSMISSÃO</strong>. A investigação científica não é um fim acadêmico em si mesma. Diante de uma evidência flagrante de contaminação fecal maciça de um reservatório de água escolar, a interdição cautelar e a desinfecção imediata são imperativas de urgência. Postergar a intervenção sanitária até a conclusão burocrática dos estudos analíticos constitui negligência administrativa grave.<br>
• <strong>Demais alternativas:</strong> Erram ao desconhecer o princípio da precaução e a primazia da proteção à saúde coletiva.</p>

<h4>Questão 6: AMP — Doenças Transmitidas por Alimentos: Diferenciação Sindrômica</h4>
<p><strong>Enunciado:</strong> Trinta minutos após o consumo de refeição em um restaurante de frutos do mar, dois clientes apresentam dormência perioral e lingual intensa, parestesias em queimação nas extremidades dos dedos das mãos e dos pés, vertigem e inversão da sensação térmica (líquidos gelados parecem queimar a cavidade oral). Não apresentam diarreia nem febre. O diagnóstico mais provável e a toxina envolvida são:</p>
<p>A) Botulismo por neurotoxina de <em>Clostridium botulinum</em>.<br>
B) Ciguatera por ingestão de ciguatoxinas acumuladas na cadeia trófica de peixes carnívoros de recifes de coral.<br>
C) Intoxicação estafilocócica clássica.<br>
D) Síndrome hemolítico-urêmica por <em>E. coli</em> produtora de toxina Shiga.<br>
E) Anafilaxia alimentar mediada por IgE contra tropomiosina de camarão.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O quadro descrito de parestesias periorais de início rápido associado à <strong>alodinia térmica (inversão paradoxal da sensação térmica — sensação de queimação dolorosa ao contato com água ou objetos frios)</strong> após ingestão de pescados de recife (como barracuda, garoupa, mero ou pargo) é patognomônico da <strong>Ciguatera</strong>, causada pela bioacumulação de ciguatoxinas produzidas por dinoflagelados fotossintéticos marinhos (<em>Gambierdiscus toxicus</em>). As toxinas abrem canais de sódio voltagem-dependentes nas membranas neuronais periféricas.<br>
• <strong>Demais alternativas:</strong> Não cursam com o fenômeno característico da inversão da sensação de frio e calor.</p>

<h4>Questão 7: IAMSPE — Interpretação das Zonas do Canal Endêmico</h4>
<p><strong>Enunciado:</strong> O gráfico de acompanhamento mensal das notificações de bronquiolite viral aguda em crianças menores de 2 anos em uma macrorregião metropolitana demonstra que, no mês de maio, a curva de casos situou-se acima da média histórica dos últimos 5 anos, porém abaixo do limite superior estipulado ($\bar{X} + 1,96 \times DP$). De acordo com os parâmetros epidemiológicos do diagrama de controle, em qual zona o agravo se encontra e qual a recomendação técnica correspondente?</p>
<p>A) Zona Epidêmica; deve-se declarar estado de emergência em saúde pública e requisitar leitos privados compulsórios.<br>
B) Zona de Sucesso; os dados indicam erradicação precoce da circulação do vírus sincicial respiratório.<br>
C) Zona de Alerta; a incidência está acima da média histórica esperada, exigindo monitoramento rigoroso, prontidão da rede assistencial de leitos pediátricos e intensificação das medidas de prevenção sem que haja ainda uma epidemia consolidada.<br>
D) Zona de Segurança; qualquer valor abaixo do teto máximo autoriza desmobilizar as equipes de vigilância sazonal.<br>
E) Erro metodológico, pois o diagrama de controle não se aplica a afecções respiratórias virais.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> A faixa compreendida entre a média histórica ($\bar{X}$) e o limite superior ($\bar{X} + 1,96 \times DP$) é formalmente designada como <strong>Zona de Alerta</strong>. O número de casos supera a expectativa média, sinalizando que a transmissão está acelerando. A conduta correta consiste em alertar a rede hospitalar pediátrica, preparar estoques de oxigênio e broncodilatadores e intensificar a vigilância, antecipando o pico sazonal antes que o limiar epidêmico seja rompido.<br>
• <strong>Demais alternativas:</strong> Confundem zona de alerta com epidemia já declarada ou com segurança plena.</p>

<h4>Questão 8: FMUSP — Risco Relativo vs. Diferença de Risco em Surtos</h4>
<p><strong>Enunciado:</strong> Em uma investigação epidemiológica de surto alimentar em um quartel militar com 500 recrutas, 250 soldados consumiram frango assado e 250 consumiram peixe grelhado. Entre os que comeram frango, 200 adoeceram (taxa de ataque de 80%). Entre os que não comeram frango (comeram apenas o peixe), 25 adoeceram (taxa de ataque de 10%). O Risco Relativo ($RR$) e a Redução Absoluta do Risco / Risco Atribuível nos expostos ($RA$) associados ao consumo do frango são, respectivamente:</p>
<p>A) $RR = 0,125$ e $RA = -70\\%$.<br>
B) $RR = 8,0$ e $RA = +70\\%$.<br>
C) $RR = 4,0$ e $RA = +90\\%$.<br>
D) $RR = 8,0$ e $RA = +80\\%$.<br>
E) $RR = 2,0$ e $RA = +50\\%$.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Aplicação matemática direta dos parâmetros epidemiológicos analíticos:
1. <strong>Risco Relativo ($RR$):</strong> Razão entre as incidências nos expostos e não expostos:
$$RR = \\frac{TA_{exp}}{TA_{n\\tilde{a}o-exp}} = \\frac{80\\%}{10\\%} = 8,0$$
Quem comeu frango teve 8 vezes mais probabilidade de adoecer do que quem comeu peixe.<br>
2. <strong>Risco Atribuível nos Expostos ($RA$):</strong> Diferença absoluta entre as taxas de ataque:
$$RA = TA_{exp} - TA_{n\\tilde{a}o-exp} = 80\\% - 10\\% = 70\\% \\text{ (ou } +0,70\\text{)}$$
O consumo do frango contaminado foi responsável por um excesso de 70 casos de doença para cada 100 soldados expostos. Alternativa B exata.</p>
`
};

export const sec10 = {
  id: 'investigacoes-moleculares-e-genomica-de-surtos',
  title: '10. Epidemiologia Molecular, Genômica de Patógenos e o Rastreamento de Cadeias de Transmissão (Trace-Back Analysis)',
  body_html: `
<h3>A Revolução da Genômica e Epidemiologia Molecular na Resolução de Surtos</h3>
<p>Durante décadas, a epidemiologia de campo dependeu exclusivamente de métodos fenotípicos tradicionais para correlacionar casos clínicos a fontes ambientais (sorotipagem de antígenos O e H, fagotipagem e antibiograma). Embora úteis, esses métodos possuem baixo poder de discriminação molecular: duas cepas de <em>Salmonella Enteritidis</em> com idêntico perfil de sensibilidade aos antimicrobianos podem ser geneticamente distintas e pertencer a surtos completamente independentes ocorrendo ao mesmo tempo.</p>

<p>A incorporação das ferramentas de biologia molecular e sequenciamento genômico pelo SUS através da Rede Nacional de Vigilância Genômica (Fiocruz, Instituto Adolfo Lutz e Laboratórios Centrais - LACEN) transformou radicalmente a capacidade de resposta sanitária:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tecnologia Molecular</th>
      <th>Fundamento Metodológico</th>
      <th>Aplicação Específica em Surtos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Eletroforese em Gel de Campo Pulsado (PFGE)</strong></td>
      <td>Digestão do DNA genômico bacteriano total por enzimas de restrição de corte raro (como <em>XbaI</em>) gerando fragmentos macromoleculares de DNA separados em gel com campos elétricos alternados em ângulos múltiplos.</td>
      <td>Padrão histórico de referência do sistema internacional <em>PulseNet</em>. Permite comparar o padrão de bandas de DNA de bactérias isoladas de pacientes com bactérias isoladas de amostras de alimentos ou da linha de produção fabril. Perfis de bandas idênticos comprovam a clonalidade absoluta do surto.</td>
    </tr>
    <tr>
      <td><strong>Sequenciamento de Nova Geração (NGS / WGS - Whole Genome Sequencing)</strong></td>
      <td>Sequenciamento do genoma completo do microrganismo com leitura de alta profundidade, permitindo a identificação de polimorfismos de nucleotídeo único (SNPs - <em>Single Nucleotide Polymorphisms</em>).</td>
      <td><strong>Padrão-Ouro Atual na Vigilância Global:</strong> Permite construir árvores filogenéticas de altíssima resolução. Se dois isolados bacterianos ou virais diferem por menos de 2 a 3 SNPs ao longo de todo o genoma de 4 milhões de pares de bases, confirma-se que compartilham um ancestral comum imediato (mesma cadeia de transmissão em tempo real). Essencial no rastreamento de variantes de SARS-CoV-2, cepas de <em>Listeria monocytogenes</em> e <em>Mycobacterium tuberculosis</em> multirresistente.</td>
    </tr>
    <tr>
      <td><strong>Reação em Cadeia da Polimerase em Tempo Real (RT-qPCR / Multiplex)</strong></td>
      <td>Amplificação e quantificação de fragmentos de ácidos nucleicos específicos em poucas horas através de sondas fluorescentes conjugadas.</td>
      <td>Diagnóstico confirmatório ultrarrápido em situações de emergência de saúde pública (detecção de febre amarela, dengue, chikungunya, oropouche, norovírus em fezes ou sarampo) com sensibilidade próxima a 100%, dispensando a espera de dias para culturas microbiológicas.</td>
    </tr>
  </tbody>
</table>

<h3>A Análise Retrospectiva da Cadeia de Suprimentos (Trace-Back Analysis)</h3>
<p>Quando a epidemiologia analítica comprova que determinado alimento ou insumo é o veículo de um surto difuso (por exemplo, queijo minas artesanal contaminado por <em>Listeria monocytogenes</em> ou manteiga contaminada), a vigilância sanitária desencadeia o procedimento técnico denominado <strong>Trace-Back Analysis (Rastreamento Retrógrado da Cadeia)</strong>:</p>
<ol>
  <li><strong>Ponto de Consumo:</strong> Identificam-se os supermercados, feiras ou laticínios onde os pacientes adquiriram o produto suspeito e inspecionam-se as notas fiscais de compra;</li>
  <li><strong>Ponto de Distribuição:</strong> Rastreiam-se as distribuidoras atacadistas e centros de logística de alimentos, mapeando as rotas de transporte refrigerado;</li>
  <li><strong>Ponto de Processamento e Origem Primária:</strong> Inspeciona-se a indústria produtora ou fazenda de origem, colhendo amostras ambientais de maquinários, ralos, tanques de resfriamento e matérias-primas agrícolas. O isolamento da mesma cepa molecular na linha fabril impõe o <strong>recolhimento compulsório do lote de mercado (recall nacional)</strong> e a interdição cautelar do estabelecimento.</li>
</ol>
`
};

export const sec11 = {
  id: 'conclusao-e-relatorio-final-de-investigacao',
  title: '11. Estruturação do Relatório Epidemiológico Final e Comunicação Pública de Riscos',
  body_html: `
<h3>A Estrutura Normativa do Relatório Final de Investigação</h3>
<p>O encerramento formal de uma investigação de surto perante o Sistema Nacional de Vigilância em Saúde exige a redação de um documento técnico robusto, autoral, auditável e juridicamente fundamentado. O <strong>Relatório Final de Investigação Epidemiológica</strong> deve seguir o padrão internacional estruturado em seções bem delimitadas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Seção do Relatório Final</th>
      <th>Conteúdo Técnico Mandatório</th>
      <th>Relevância Operacional e Jurídica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Sumário Executivo</strong></td>
      <td>Resumo conciso de uma página contendo o evento investigado, o período de ocorrência, número total de casos e óbitos (letalidade), o agente causal confirmado, o veículo transmissor e as principais medidas sanitárias adotadas.</td>
      <td>Direcionado a secretários de saúde, prefeitos, ministros e magistrados para tomada imediata de decisões políticas e alocação de recursos.</td>
    </tr>
    <tr>
      <td><strong>2. Introdução e Justificativa</strong></td>
      <td>Histórico da notificação inicial (data e hora em que a autoridade tomou conhecimento do agravo), justificativa sanitária da intervenção e descrição demográfica e geográfica da área afetada.</td>
      <td>Fundamenta a legitimidade constitucional e legal da ação da autoridade de saúde pública.</td>
    </tr>
    <tr>
      <td><strong>3. Metodologia de Investigação</strong></td>
      <td>
        • Definição operacional de caso adotada (suspeito, provável e confirmado);<br>
        • Estratégias de busca ativa retrospectiva e prospectiva;<br>
        • Métodos laboratoriais e de transporte de espécimes empregados;<br>
        • Desenho do estudo epidemiológico analítico (coorte ou caso-controle) e fórmulas estatísticas utilizadas.
      </td>
      <td>Garante a reprodutibilidade científica e a validade metodológica de todas as conclusões apresentadas.</td>
    </tr>
    <tr>
      <td><strong>4. Resultados (Descritivos e Analíticos)</strong></td>
      <td>
        • Apresentação da <strong>Curva Epidêmica</strong> analisada quanto ao padrão de disseminação;<br>
        • Tabelas de taxas de ataque globais e específicas por faixa etária, sexo e bairros;<br>
        • Tabela analítica de alimentos/exposições com cálculo dos Riscos Relativos ($RR$), Odds Ratios ($OR$) e respectivos intervalos de confiança de 95%;<br>
        • Resultados dos exames laboratoriais humanos, ambientais e genômicos.
      </td>
      <td>Constitui a comprovação factual e estatística da etiopatogenia do surto.</td>
    </tr>
    <tr>
      <td><strong>5. Discussão e Limitações</strong></td>
      <td>Interpretação biológica e sanitária dos achados à luz da literatura médica; discussão de possíveis vieses (viés de memória, perda de seguimento) e hipóteses alternativas descartadas.</td>
      <td>Confere solidez crítica e científica ao documento.</td>
    </tr>
    <tr>
      <td><strong>6. Medidas de Controle Adotadas e Recomendações Estruturais</strong></td>
      <td>Descrição das intervenções imediatas realizadas (bloqueio vacinal, interdições, quimioprofilaxia) e proposição de medidas perenes de engenharia sanitária, treinamento de manipuladores de alimentos e fortalecimento da vigilância continuada.</td>
      <td>Garante a sustentabilidade das intervenções para que surtos semelhantes não se repitam no território.</td>
    </tr>
  </tbody>
</table>

<h3>Comunicação Pública de Riscos e Transparência Sanitária</h3>
<p>O décimo passo da metodologia internacional não se resume a arquivar um documento técnico em gavetas administrativas. A <strong>Comunicação de Riscos</strong> é um componente estratégico da vigilância em saúde. Em tempos de desinformação e circulação viral de notícias falsas nas mídias sociais, a autoridade sanitária deve comunicar-se com a sociedade de forma ágil, clara, empática e cientificamente honesta:</p>
<ul>
  <li><strong>Divulgação Oportuna e Transparente:</strong> Declarar imediatamente o que já se sabe com certeza científica, o que ainda é desconhecido e o que as autoridades estão fazendo para descobrir e conter a ameaça;</li>
  <li><strong>Orientações Claras de Autoproteção à População:</strong> Fornecer instruções simples e acionáveis sobre como os cidadãos podem proteger a si e a seus familiares (higiene das mãos, fervura ou cloração da água, descarte de alimentos suspeitos, busca precoce por atendimento médico em unidades de referência);</li>
  <li><strong>Combate à Estigmatização Social:</strong> Proteger a dignidade e a identidade dos indivíduos acometidos ou de comunidades específicas, evitando que preconceitos de classe, etnia ou nacionalidade dificultem a adesão comunitária às medidas de saúde pública.</li>
</ul>
`
};
