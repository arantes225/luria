// scripts/bloco-07-builders/build-145-part3.mjs

export const sec4 = {
  id: "planejamento-reprodutivo-criterios-elegibilidade-oms",
  title: "4. Planejamento Reprodutivo na APS: Cidadania, Critérios Médicos de Elegibilidade da OMS e Lei do Planejamento Familiar Atualizada",
  body_html: `
<h3>4.1 Marco Legal Atualizado da Lei do Planejamento Familiar (Lei Federal nº 14.443/2022)</h3>
<p>O planejamento reprodutivo na Atenção Primária à Saúde é regido pelo princípio constitucional da paternidade e maternidade responsáveis e pela livre decisão do casal ou do indivíduo. Em março de 2023, entrou em vigor a fundamental <strong>Lei Federal nº 14.443/2022</strong>, que alterou profundamente a antiga Lei nº 9.263/1996, modernizando o acesso aos métodos contraceptivos cirúrgicos definitivos (esterilização voluntária: laqueadura tubária e vasectomia) no Brasil e encerrando anacronismos históricos.</p>

<div class="clinical-box highlight">
  <h4>Principais Alterações da Lei nº 14.443/2022 (Exigência Constante em Concursos)</h4>
  <ul>
    <li><strong>Redução da Idade Mínima:</strong> A idade mínima para esterilização voluntária (laqueadura ou vasectomia) caiu de 25 para <strong>21 anos de idade</strong> para homens e mulheres com capacidade civil plena.</li>
    <li><strong>Manutenção do Critério de Prole:</strong> Permanece permitida a esterilização em qualquer idade para indivíduos que possuam <strong>pelo menos 2 (dois) filhos vivos</strong>. Logo, os critérios são alternativos: ter <strong>&ge; 21 anos OU pelo menos 2 filhos vivos</strong>.</li>
    <li><strong>Fim da Exigência de Consentimento do Cônjuge/Parceiro:</strong> Foi <strong>completamente revogado o dispositivo que exigia a anuência expressa do cônjuge</strong> para a realização de laqueadura ou vasectomia na constância da sociedade conjugal. A decisão agora é <strong>estritamente individual</strong> do cidadão ou cidadã que se submeterá ao procedimento, consagrando sua autonomia corporal.</li>
    <li><strong>Laqueadura Durante o Período de Parto:</strong> A lei passou a <strong>permitir a realização da laqueadura tubária durante o período de parto</strong> (seja cesariana ou normal), desde que a manifestação da vontade tenha sido expressa pela gestante com <strong>antecedência mínima de 60 (sessenta) dias</strong> entre a manifestação da vontade e o parto, evitando decisões precipitadas sob o estresse do trabalho de parto.</li>
    <li><strong>Prazo de Reflexão e Aconselhamento:</strong> Mantém-se o prazo legal obrigatório de no mínimo 60 dias entre a manifestação formal da vontade e o ato cirúrgico, período no qual a equipe da APS deve propiciar acesso a aconselhamento multiprofissional sobre métodos reversíveis, eficácia e riscos cirúrgicos.</li>
  </ul>
</div>

<h3>4.2 Critérios Médicos de Elegibilidade da OMS para o Uso de Contraceptivos (MEC / OMS)</h3>
<p>A Organização Mundial da Saúde (OMS) categoriza a segurança de cada método anticoncepcional em quatro classes universais, que norteiam com precisão a prática clínica da médica(o) de família e comunidade e da(o) ginecologista:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria OMS</th>
      <th>Definição Operacional</th>
      <th>Conduta Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Categoria 1</strong></td>
      <td>Condição para a qual não há restrição ao uso do método contraceptivo.</td>
      <td><strong>Usar o método sem qualquer restrição</strong>.</td>
    </tr>
    <tr>
      <td><strong>Categoria 2</strong></td>
      <td>Condição em que as vantagens do uso do método superam os riscos teóricos ou comprovados.</td>
      <td><strong>Geralmente pode usar o método</strong> (acompanhamento habitual).</td>
    </tr>
    <tr>
      <td><strong>Categoria 3</strong></td>
      <td>Condição em que os riscos teóricos ou comprovados superam as vantagens do método.</td>
      <td><strong>O método NÃO é recomendado</strong>, a menos que outros métodos mais adequados não estejam disponíveis ou sejam rejeitados (indicação de exceção estrita).</td>
    </tr>
    <tr>
      <td><strong>Categoria 4</strong></td>
      <td>Condição que representa risco inaceitável à saúde se o método for utilizado.</td>
      <td><strong>Contraindicação absoluta: NÃO USAR o método</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>4.3 Contraceptivos Combinados Orais e Injetáveis (Estrogênio + Progestágeno): Contraindicações Críticas (Cat. 4 OMS)</h3>
<p>Os métodos combinados (pílulas combinadas, anel vaginal, adesivo transdérmico e injetáveis mensais) contêm derivados estrogênicos (geralmente etinilestradiol ou estradiol). O componente estrogênico hepático eleva a síntese de fatores de coagulação (fatores II, VII, VIII, X e fibrinogênio) e reduz a antitrombina III e proteína S, elevando o risco tromboembólico.</p>

<div class="clinical-box highlight">
  <h4>Situações Clínicas Categoria 4 da OMS para Métodos Combinados (Contraindicação Absoluta)</h4>
  <ul>
    <li><strong>Tabagismo em Mulheres com Idade &ge; 35 Anos:</strong> Tabagistas de &ge; 15 cigarros/dia com 35 anos ou mais (Categoria 4); tabagistas de &lt; 15 cigarros/dia com &ge; 35 anos (Categoria 3). Se idade &lt; 35 anos, tabagismo isolado é Categoria 2.</li>
    <li><strong>Hipertensão Arterial Sistêmica Grave ou Não Controlada:</strong> Níveis pressóricos com PAS &ge; 160 mmHg ou PAD &ge; 100 mmHg; ou hipertensão com vasculopatia instalada (nefropatia, retinopatia, hipertrofia ventricular). Se HAS moderada controlada (PAS 140-159 ou PAD 90-99), é Categoria 3.</li>
    <li><strong>Histórico Atual ou Pregresso de Tromboembolismo Venoso (TEV):</strong> Trombose venosa profunda (TVP) ou tromboembolismo pulmonar (TEP); trombofilias hereditárias comprovadas (Fator V de Leiden, mutação da protrombina, deficiência de proteína C/S/antitrombina).</li>
    <li><strong>Doença Vascular Cerebral ou Cardíaca Isquêmica:</strong> Histórico de AVC isquêmico ou transitório, infarto agudo do miocárdio (IAM), angina pectoris ou cardiopatia valvar complicada (hipertensão pulmonar, risco de fibrilação atrial).</li>
    <li><strong>Enxaqueca com Aura em Qualquer Idade:</strong> Risco exponencialmente elevado de AVC isquêmico (Categoria 4 absoluta). Enxaqueca sem aura em mulher &lt; 35 anos é Categoria 2; se &ge; 35 anos, enxaqueca sem aura é Categoria 3.</li>
    <li><strong>Câncer de Mama Atual:</strong> Neoplasia estrogênio-dependente ativa (Categoria 4). Se histórico prévio de câncer de mama sem doença há &gt; 5 anos, Categoria 3.</li>
    <li><strong>Diabetes Mellitus com Vasculopatia:</strong> Neuropatia, nefropatia, retinopatia diabética ou duração do diabetes &gt; 20 anos.</li>
    <li><strong>Doença Hepática Aguda Grave:</strong> Hepatite viral ativa grave, cirrose hepática descompensada (Child-Pugh B ou C), adenoma hepatocelular ou hepatocarcinoma.</li>
    <li><strong>Puerpério Imediato e Amamentação:</strong> Primeiras 6 semanas pós-parto em puérperas em aleitamento materno exclusivo (estrogênio suprime lactogênese e eleva risco tromboembólico puerperal).</li>
  </ul>
</div>

<h3>4.4 Métodos com Progestágeno Isolado e Contraceptivos Reversíveis de Longa Ação (LARC)</h3>
<p>Os métodos baseados exclusivamente em progestágenos (minipílula de desogestrel ou noretisterona, implante subdérmico de etonogestrel, injetável trimestral de acetato de medroxiprogesterona e DIU de Levonorgestrel) não possuem o impacto trombogênico do estrogênio hepático, sendo seguros para mulheres hipertensas, tabagistas, portadoras de enxaqueca e no pós-parto.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Método Contraceptivo</th>
      <th>Mecanismo Principal</th>
      <th>Duração / Posologia</th>
      <th>Efeitos Adversos e Particularidades Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>DIU de Cobre (TCu 380A)</strong></td>
      <td>Reação inflamatória asséptica endometrial citotóxica a espermatozoides e óvulos; não hormonal.</td>
      <td>10 anos de eficácia comprovada (pode durar até 12 anos).</td>
      <td><strong>Vantagem absoluta:</strong> Método de escolha para mulheres com contraindicação a qualquer hormônio (inclusive histórico de câncer de mama).<br><strong>Efeitos adversos:</strong> Aumento do fluxo menstrual e dismenorreia nos primeiros ciclos. Não indicado se DIP ativa ou cavidade uterina severamente deformada.</td>
    </tr>
    <tr>
      <td><strong>DIU com Levonorgestrel (Mirena / Kyleena)</strong></td>
      <td>Atrofia endometrial profunda, espessamento maciço do muco cervical (barreira física); efeito hormonal predominantemente local.</td>
      <td>5 a 8 anos (conforme modelo).</td>
      <td><strong>Vantagem:</strong> Redução drástica do sangramento menstrual (amenorreia em 20-50% das usuárias); tratamento de primeira linha para Sangramento Uterino Anormal (SUA) e dor da endometriose/adenomiose.<br><strong>Contraindicação absoluta:</strong> Câncer de mama atual.</td>
    </tr>
    <tr>
      <td><strong>Implante Subdérmico de Etonogestrel (Implanon)</strong></td>
      <td>Inibição profunda da ovulação por supressão do pico de LH; espessamento do muco cervical.</td>
      <td>3 anos de eficácia máxima (menor taxa de falha de todos os métodos: índice de Pearl 0,05%).</td>
      <td>Alteração do padrão de sangramento (spotting irregular ou amenorreia); excelente adesão por dispensar intervenção da paciente.</td>
    </tr>
    <tr>
      <td><strong>Injetável Trimestral (Acetato de Medroxiprogesterona de Depósito - AMPD 150 mg IM)</strong></td>
      <td>Bloqueio potente do eixo hipotálamo-hipófise-ovário (anovulação); atrofia endometrial.</td>
      <td>Aplicação intramuscular a cada 12 semanas (com tolerância de até 2 semanas).</td>
      <td><strong>Atenção clínica:</strong> Provoca redução transitória e reversível da densidade mineral óssea; pode gerar ganho ponderal (retenção hídrica/apetite); <strong>atraso no retorno da fertilidade</strong> após suspensão (média de 9 a 12 meses para engravidar novamente).</td>
    </tr>
    <tr>
      <td><strong>Contracepção de Emergência (Levonorgestrel 1,5 mg dose única)</strong></td>
      <td>Atraso ou inibição do pico de LH e ovulação; espessamento do muco cervical. <strong>Não é abortivo</strong> (não impede nidação se fecundação já ocorreu nem descolará saco gestacional).</td>
      <td>Tomada idealmente nas primeiras 72 horas pós-coito desprotegido (eficácia residual até 120h).</td>
      <td>Não há contraindicações médicas formais na OMS (Categoria 1 para todas as mulheres em emergência); náuseas e cefaleia transitórias; se vomitar em até 2h da tomada, repetir a dose.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec5 = {
  id: "pre-natal-compartilhado-e-puerperio-na-aps",
  title: "5. Pré-Natal Compartilhado na Atenção Básica e Cuidado Puerperal Integral",
  body_html: `
<h3>5.1 Organização do Pré-Natal na APS e a Estratificação Dinâmica de Risco</h3>
<p>O pré-natal é uma das intervenções em saúde com maior custo-efetividade e impacto epidemiológico na redução da morbimortalidade materna e perinatal. No Brasil, o Ministério da Saúde preconiza a <strong>captação precoce da gestante até a 12ª semana de idade gestacional</strong> e a realização de um número mínimo de <strong>6 consultas de pré-natal</strong> (idealmente mensais até a 28ª semana; quinzenais da 28ª à 36ª semana; e semanais da 36ª semana até o parto).</p>

<p>Na Estratégia Saúde da Família, o pré-natal de risco habitual é realizado de maneira <strong>compartilhada e colaborativa entre o médico de família e a enfermeira</strong>, conforme amparo legal da Lei do Exercício Profissional da Enfermagem (Lei nº 7.498/1986) e protocolos clínicos do Ministério da Saúde. O modelo de consultas intercaladas potencializa a escuta qualificada, a educação em saúde, as orientações sobre parto humanizado e amamentação, garantindo atenção resolutiva e humanizada.</p>

<div class="clinical-box highlight">
  <h4>Critérios Cardinais para Encaminhamento ao Pré-Natal de Alto Risco (PNAR)</h4>
  <p>A estratificação de risco gestacional não é um evento estático realizado apenas na primeira consulta; trata-se de um <strong>processo contínuo e dinâmico</strong> a cada encontro clínico. Gestantes de alto risco devem ter o cuidado compartilhado entre a equipe da APS e o serviço especializado de obstetrícia ambulatorial e hospitalar:</p>
  <ul>
    <li><strong>Condições Pré-existentes Graves:</strong> Hipertensão arterial crônica moderada a grave, Diabetes mellitus pré-gestacional, cardiopatias congênitas ou adquiridas (Classe funcional II ou superior da NYHA), pneumopatias graves (asma grave não controlada), nefropatias crônicas, lúpus eritematoso sistêmico (LES) ou outras colagenoses, hemoglobinopatias graves (anemia falciforme), epilepsia refratária, infecção pelo HIV, hepatites virais crônicas ativas e transtornos psiquiátricos graves descompensados.</li>
    <li><strong>Intercorrências Obstétricas Atuais:</strong> Síndromes hipertensivas da gestação (pré-eclâmpsia / eclâmpsia), Diabetes Mellitus Gestacional (DMG) que necessita de insulinoterapia, suspeita de Restrição de Crescimento Intrauterino (RCIU) ou macrossomia fetal, Oligodramnia (ILA &lt; 5 cm) ou Polidramnia (ILA &gt; 24 cm), Gestação gemelar/múltipla, Isoimunização Rh com Coombs indireto positivo, placenta prévia com sangramento, incompetência istmocervical ou colo curto em ultrassom morfológico.</li>
  </ul>
</div>

<h3>5.2 Rotina Padronizada de Exames Laboratoriais no Pré-Natal da APS</h3>
<p>O Ministério da Saúde estabelece um calendário laboratorial rigoroso distribuído ao longo dos trimestres gestacionais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Trimestre Gestacional</th>
      <th>Exames Laboratoriais Mandatórios</th>
      <th>Condutas e Tratamentos Imediatos na APS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1º Trimestre (ou Primeira Consulta)</strong></td>
      <td>
        - Tipagem sanguínea e Fator Rh;<br>
        - Teste de Coombs indireto (se Rh negativo);<br>
        - Hemograma completo;<br>
        - Glicemia de jejum;<br>
        - Testes rápidos para Sífilis e HIV;<br>
        - Sorologia para Hepatite B (HBsAg);<br>
        - Sorologia para Toxoplasmose (IgM e IgG);<br>
        - Urina tipo 1 (EAS) e Urocultura com antibiograma;<br>
        - Exame parasitológico de fezes (se indicação clínica).
      </td>
      <td>
        - <strong>Bacteriúria Assintomática:</strong> Urocultura &ge; 100.000 UFC/mL em gestante EXIGE tratamento imediato (cefalexina, amoxicilina-clavulanato, nitrofurantoína ou fosfomicina) e controle com nova urocultura pós-tratamento para prevenir pielonefrite aguda e prematuridade.<br>
        - <strong>Sífilis Gestacional:</strong> Teste rápido positivo = iniciar IMEDIATAMENTE Penicilina Benzatina (sem aguardar teste confirmatório ou VDRL). Sífilis primária, secundária ou latente recente: Penicilina Benzatina 2,4 milhões UI IM dose única (1,2 milhão UI em cada glúteo). Sífilis terciária, latente tardia ou duração indeterminada: 2,4 milhões UI IM semanalmente por 3 semanas consecutivas (total de 7,2 milhões UI). Tratar parceria sexual.<br>
        - <strong>Toxoplasmose IgM e IgG negativos:</strong> Gestante suscetível = orientações higienodietéticas rígidas (evitar carnes cruas, contato com fezes de felinos) e repetir sorologia trimestralmente.
      </td>
    </tr>
    <tr>
      <td><strong>2º Trimestre</strong></td>
      <td>
        - <strong>TOTG 75g (Teste Oral de Tolerância à Glicose entre 24 e 28 semanas):</strong> Jejum, 1h e 2h pós-sobrecarga;<br>
        - Teste de Coombs indireto mensal (se mãe Rh negativa e parceiro Rh positivo ou desconhecido).
      </td>
      <td>
        - <strong>Critérios Diagnósticos de DMG (IADPSG / MS):</strong> Glicemia jejum &ge; 92 mg/dL (ou entre 92 e 125 mg/dL no 1º trimestre); OU 1h pós-dextrose &ge; 180 mg/dL; OU 2h pós-dextrose &ge; 153 mg/dL. Apenas 1 valor alterado firma o diagnóstico de DMG.<br>
        - <strong>Imunoglobulina Anti-D (300 mcg IM):</strong> Administrar profilaticamente na 28ª semana para todas as gestantes Rh negativas não sensibilizadas (Coombs indireto negativo).
      </td>
    </tr>
    <tr>
      <td><strong>3º Trimestre (por volta da 28ª a 30ª semana)</strong></td>
      <td>
        - Hemograma completo;<br>
        - Glicemia de jejum (se TOTG não realizado);<br>
        - Testes rápidos para Sífilis e HIV repetidos;<br>
        - Sorologia para Hepatite B (HBsAg) repetida;<br>
        - Sorologia para Toxoplasmose (se suscetível no 1º tri);<br>
        - Urina tipo 1 e Urocultura com antibiograma;<br>
        - <em>Swab vaginorretal para Streptococcus do Grupo B (EGB / S. agalactiae) entre 35 e 37 semanas</em> (conforme disponibilidade municipal/estadual).
      </td>
      <td>
        - <strong>Anemia na Gestação:</strong> Hemoglobina &lt; 11 g/dL define anemia gestacional. Se Hb entre 8 e 11 g/dL (leve a moderada): dobrar suplementação com Sulfato Ferroso para 120 a 200 mg de ferro elementar/dia e repetir em 30 a 60 dias. Se Hb &lt; 8 g/dL: encaminhar ao PNAR.<br>
        - <strong>Profilaxia Intraparto para EGB:</strong> Indicada se cultura positiva, urocultura com EGB em qualquer momento da gestação ou filho anterior com sepse por EGB. Profilaxia intraparto feita com Penicilina Cristalina ou Ampicilina endovenosa a cada 4h até o clampeamento do cordão.
      </td>
    </tr>
  </tbody>
</table>

<h3>5.3 Suplementação Nutricional e Imunização Gestacional Recomendadas pelo MS</h3>
<ul>
  <li><strong>Ácido Fólico:</strong> 0,4 mg/dia (400 mcg) por via oral iniciando-se preferencialmente <strong>3 meses antes da concepção</strong> e mantendo-se até o final do 1º trimestre (12 semanas) para prevenir Defeitos do Tubo Neural (DTN - anencefalia, espinha bífida). Se histórico prévio de filho com DTN ou uso de anticonvulsivantes antifolato (carbamazepina, ácido valproico), a dose deve ser elevada para <strong>4 a 5 mg/dia</strong>.</li>
  <li><strong>Sulfato Ferroso:</strong> Suplementação universal de ferro profilático para todas as gestantes a partir da 20ª semana de gestação com <strong>40 mg de ferro elementar por dia</strong> (equivalente a 200 mg de sulfato ferroso), mantendo-se até o 3º mês pós-parto em puérperas lactantes.</li>
  <li><strong>Calendário Vacinal da Gestante (PNI / SUS):</strong>
    <ul>
      <li><em>dTpa (Difteria, Tétano e Coqueluche acelular):</em> Uma dose a cada gestação a partir da <strong>20ª semana</strong> (idealmente entre a 27ª e 36ª semana) para transferência transplacentária de anticorpos protetores contra a coqueluche ao recém-nascido.</li>
      <li><em>Hepatite B:</em> Completar esquema de 3 doses em qualquer idade gestacional se não imunizada previamente.</li>
      <li><em>Influenza (Gripe):</em> Dose anual da vacina inativada em qualquer período da gestação.</li>
      <li><em>Covid-19:</em> Conforme cronograma oficial do Ministério da Saúde com vacinas aprovadas para o ciclo gravídico.</li>
    </ul>
  </li>
</ul>
`
};
