// scripts/bloco-07-builders/build-153-part3.mjs

export const sec5 = {
  id: "edema-cerebral-na-cad-monitorizacao-e-tratamento",
  title: "5. Edema Cerebral na CAD: Fisiopatologia, Sinais de Alerta e Manejo Hiperosmolar de Emergência",
  body_html: `
<p>O Edema Cerebral é a complicação mais temida, trágica e devastadora da Cetoacidose Diabética pediátrica, respondendo por <strong>60% a 90% de todas as mortes atribuíveis à CAD em crianças e adolescentes</strong>. Ocorre clinicamente em 0,5% a 1% de todos os episódios de CAD na infância, porém em até 20% a 25% dos sobreviventes deixa sequelas neurológicas motoras, cognitivas e comportamentais graves e permanentes.</p>

<p><strong>A Janela Cronológica Típica de Instalação:</strong> O edema cerebral raramente está presente na admissão hospitalar inicial; ele instala-se de forma insidiosa ou fulminante <strong>entre 4 e 12 horas após o início da terapia médica (hidratação venosa e insulinoterapia)</strong>, podendo ocorrer mais tardiamente em até 24 horas.</p>

<h3>5.1. Fisiopatologia: O Mecanismo Osmótico dos Osmóis Idiogênicos</h3>
<p>A patogênese do edema cerebral na CAD é complexa e resulta da combinação de dois componentes fisiopatológicos principais:</p>
<ol>
  <li><strong>O Desequilíbrio Osmótico Celular (Edema Citotóxico):</strong> Durante o período de hiperglicemia extrema e desidratação crônica pré-hospitalar, a osmolalidade plasmática extracelular atinge níveis perigosamente altos (&gt; 320 a 340 mOsm/kg). Para proteger o tecido encefálico contra o colapso e desidratação neuronal aguda, as células cerebrais (astrócitos e neurônios) sintetizam e acumulam ativamente compostos osmoticamente ativos intracelulares denominados <strong>Osmóis Idiogênicos (como taurina, mio-inositol, glutamato e betaína)</strong>. Esses osmóis retêm água dentro dos neurônios, restabelecendo o equilíbrio volumétrico cerebral no ambiente hiperosmolar.
  <br><em>O Desastre Iatrogênico:</em> Quando o tratamento médico é instituído de forma inadvertidamente agressiva — com infusão excessiva de fluidos hipotônicos, queda rápida da glicemia ou uso precoce de bolus de insulina —, a osmolalidade plasmática intravascular despenca em velocidade muito superior à capacidade dos neurônios de dissipar seus osmóis idiogênicos (que levam dias para serem depurados). Cria-se um gradiente osmótico maciço: a água livre plasmática migra avidamente do leito vascular hipotônico para dentro dos neurônios hiperosmolares repletos de osmóis idiogênicos, gerando intumescimento celular agudo (edema citotóxico cerebral).</li>
  <li><strong>O Componente Vasogênico e Isquêmico:</strong> Simultaneamente, a hipoperfusão cerebral decorrente da desidratação severa e da acidose, associada à ativação de canais de troca iônica (como o transportador Na+/H+ ativado por citocinas inflamatórias), rompe a integridade da barreira hematoencefálica, permitindo o extravasamento de macromoléculas e água para o espaço intersticial cerebral. A caixa craniana óssea rígida não tem complacência para acomodar esse volume, resultando em disparada exponencial da Pressão Intracraniana (PIC), colapso da pressão de perfusão cerebral, herniação do úncus e das amígdalas cerebelares através do forame magno com compressão bulbar e morte encefálica.</li>
</ol>

<div class="clinical-box highlight">
  <h4>Fatores de Risco Clínicos e Terapêuticos Independentes para Edema Cerebral</h4>
  <ul>
    <li>Idade jovem (&lt; 5 anos de idade);</li>
    <li>Primeiro episódio de CAD na abertura do DM1 (episódio de novo);</li>
    <li>Quadro clínico pré-hospitalar prolongado com desidratação severa;</li>
    <li>Acidose metabólica profunda à admissão (pH venoso &lt; 7,10 e/ou HCO3 &lt; 5 mEq/L);</li>
    <li>Hipocapnia severa na admissão (pCO2 &lt; 15 a 18 mmHg);</li>
    <li>Níveis extremamente elevados de ureia sérica na apresentação;</li>
    <li><strong>Fatores Iatrogênicos Modificáveis:</strong>
      <ul>
        <li>Administração de grandes volumes de fluidos (&gt; 4 a 5 L/m²/dia ou &gt; 40-50 mL/kg nas primeiras 4 horas);</li>
        <li>Uso de bolus intravenoso de insulina na hora zero;</li>
        <li><strong>Uso de Bicarbonato de Sódio</strong>;</li>
        <li>Falha na elevação progressiva do Sódio Sérico Corrigido durante a queda glicêmica (sódio corrigido caindo).</li>
      </ul>
    </li>
  </ul>
</div>

<h3>5.2. Critérios Diagnósticos Diagnósticos de Muir para Edema Cerebral na CAD</h3>
<p>O reconhecimento do edema cerebral deve ser imediato e clínico à beira do leito. <strong>NUNCA AGUARDE A REALIZAÇÃO DE UMA TOMOGRAFIA COMPUTADORIZADA DE CRÂNIO PARA FECHAR O DIAGNÓSTICO OU INICIAR O TRATAMENTO!</strong> A tomografia inicial pode ser normal em fases precoces e o atraso no transporte para o setor de radiologia é fatal. Utilizam-se os critérios clínicos validados de Muir:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Critérios de Muir</th>
      <th>Sinais e Sintomas Clínicos Específicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>CRITÉRIOS DIAGNÓSTICOS</strong></td>
      <td>
        • Resposta motora ou verbal anormal à dor;<br>
        • Postura de decorticação (flexão anômala) ou descerebração (extensão anômala);<br>
        • Paralisia de nervos cranianos (especialmente paralisia do VI par — nervo abducente com estrabismo convergente ou diplopia, e paralisia do III par — oculomotor com anisocoria e midríase arreativa);<br>
        • Padrão respiratório central anormal (respiração atáxica de Biot, apneias centrais ou respiração de Cheyne-Stokes).
      </td>
    </tr>
    <tr>
      <td><strong>CRITÉRIOS MAIORES</strong></td>
      <td>
        • Deterioração ou flutuação do nível de consciência (queda na Escala de Coma de Glasgow);<br>
        • Bradicardia sustentada e desproporcional (queda súbita da FC &gt; 20 bpm não atribuível a sono ou melhora da hidratação);<br>
        • Incontinência urinária súbita e inapropriada para a idade da criança.
      </td>
    </tr>
    <tr>
      <td><strong>CRITÉRIOS MENORES</strong></td>
      <td>
        • Cefaleia intensa, progressiva ou que acorda a criança;<br>
        • Vômitos recorrentes que reaparecem após o início da hidratação e estabilização inicial;<br>
        • Letargia acentuada ou dificuldade progressiva para despertar;<br>
        • Pressão Arterial Diastólica desproporcionalmente elevada (hipertensão arterial sistêmica com PAS e PAD &gt; percentil 95);<br>
        • Idade &lt; 5 anos.
      </td>
    </tr>
  </tbody>
</table>

<p><strong>Regra de Fechamento Diagnóstico Clínico de Edema Cerebral:</strong></p>
<div class="clinical-box alert">
  <p><strong>[1 Critério Diagnóstico] OU [2 Critérios Maiores] OU [1 Critério Maior + 2 Critérios Menores]</strong><br>
  Preenchendo essa combinação, o diagnóstico está firmado e o tratamento hiperosmolar deve ser injetado IMEDIATAMENTE na veia do paciente!</p>
</div>

<p><strong>A Tríade Tardia de Cushing (Sinal Pré-Morte por Herniação Cerebral):</strong></p>
<ol>
  <li><strong>Hipertensão Arterial Sistêmica Severa com Aumento da Pressão de Pulso;</strong></li>
  <li><strong>Bradicardia Acentuada;</strong></li>
  <li><strong>Irregularidade Respiratória com Depressão e Apneias Centrais.</strong></li>
</ol>
<p><em>Atenção:</em> A tríade de Cushing é um achado tardio de herniação transtentorial ou de amígdalas cerebelares; aguardar o seu surgimento para tratar significa intervir em uma fase frequentemente irreversível.</p>

<h3>5.3. Tratamento Hiperosmolar de Emergência do Edema Cerebral</h3>
<p>Ao menor sinal de deterioração neurológica (cefaleia que piora, bradicardia inexplicada ou queda de 1 a 2 pontos na Escala de Glasgow), adote imediatamente as seguintes condutas salvadoras:</p>

<div class="clinical-box highlight">
  <h4>Protocolo Imediato de Resgate do Edema Cerebral na CAD Pediátrica</h4>
  <ol>
    <li><strong>Elevação da Cabeceira do Leito a 30 Graus na Linha Média:</strong> Otimiza a drenagem venosa jugular cerebral, reduzindo passivamente a PIC. Evitar rotação lateral do pescoço ou compressão das veias jugulares por fitas de fixação.</li>
    <li><strong>Redução Imediata da Taxa de Fluidos Endovenosos:</strong> Reduzir a taxa de infusão do soro de hidratação venosa em pelo menos <strong>30% a 50%</strong> (manter apenas o estritamente necessário para correr medicações e evitar colapso hemodinâmico).</li>
    <li><strong>ADMINISTRAÇÃO IMEDIATA DE TERAPIA HIPEROSMOLAR (Primeira Linha de Escolha):</strong>
      <ul>
        <li><strong>Opção A — MANITOL A 20%:</strong> Dose de <strong>0,5 a 1,0 g/kg (equivalente a 2,5 a 5 mL/kg de Manitol 20%)</strong> por via endovenosa infundido em <strong>15 a 20 minutos</strong>. O manitol eleva agudamente a osmolalidade plasmática, drenando água do parênquima cerebral para o leito intravascular. Pode ser repetido em 30 a 60 minutos se não houver melhora clínica neurológica satisfatória.</li>
        <li><strong>Opção B — SALINA HIPERTÔNICA A 3% (NaCl 3%):</strong> Dose de <strong>2,5 a 5 mL/kg</strong> por via endovenosa infundida em <strong>15 a 20 minutos</strong>. É considerada a alternativa de eleição pela ISPAD em pacientes que já apresentam hipotensão arterial ou quando não há resposta clínica rápida ao manitol, pois a salina a 3% não induz diurese osmótica adicional e restaura simultaneamente a volemia intravascular.</li>
      </ul>
    </li>
    <li><strong>Vias Aéreas e Intubação Cautelosa:</strong> Se o paciente evoluir com rebaixamento profundo (Glasgow &lt;= 8), hipoventilação ou perda dos reflexos protetores de via aérea, proceder à intubação orotraqueal em sequência rápida. <em>Alerta Crítico:</em> Evitar hiperventilação agressiva profilática (que causa vasoconstrição cerebral excessiva e isquemia secundária grave); a meta é manter a pCO2 na faixa de <strong>30 a 35 mmHg</strong> (e nunca &lt; 25-30 mmHg).</li>
    <li><strong>Exame de Neuroimagem:</strong> Somente após a administração da terapia hiperosmolar (Manitol ou Salina 3%) e com o paciente clinicamente estabilizado na UTI, encaminhar para a realização de <strong>Tomografia Computadorizada de Crânio</strong> sem contraste para avaliar edema cerebral difuso (apagamento de sulcos corticais e ventrículos) e excluir outras complicações neurológicas catastróficas associadas, como Acidente Vascular Encefálico isquêmico embólico ou Trombose de Seios Venosos Durais induzida pelo estado de hiperviscosidade sanguínea e hipercoagulabilidade da CAD.</li>
  </ol>
</div>
`
};

export const sec6 = {
  id: "resolucao-da-cad-e-transicao-para-insulina-subcutanea",
  title: "6. Critérios de Resolução da Cetoacidose e Transição Segura para Insulina Subcutânea",
  body_html: `
<p>A fase final do manejo da Cetoacidose Diabética pediátrica consiste na identificação rigorosa do momento exato de cura metabólica e na transição programada e sem falhas da infusão contínua venosa para o regime definitivo de insulinoterapia por via subcutânea (SC).</p>

<h3>6.1. Critérios de Resolução Metabólica da CAD (ISPAD / ADA)</h3>
<p>Um erro clínico frequente e perigoso é suspender a bomba de insulina venosa assim que a glicemia do paciente se normaliza (ex.: glicemia de 140 mg/dL). A normoglicemia NÃO significa cura da CAD. O paciente só é considerado metabolicamente curado quando preencher rigorosamente os seguintes critérios laboratoriais e clínicos:</p>

<div class="clinical-box highlight">
  <h4>Critérios de Resolução Completa da CAD</h4>
  <ol>
    <li><strong>pH Venoso &gt;= 7,30</strong> (ou pH arterial &gt;= 7,35);</li>
    <li><strong>Bicarbonato Sérico (HCO3-) &gt;= 15 a 18 mEq/L</strong>;</li>
    <li><strong>Beta-hidroxibutirato Sanguíneo &lt; 1,0 mmol/L</strong> (ou normalização do ânion gap sérico &lt;= 12 mEq/L);</li>
    <li><strong>Resolução dos Sintomas Clínicos Gastrointestinais:</strong> Ausência completa de náuseas, vômitos e dor abdominal;</li>
    <li><strong>Estado de Alerta e Consciência Plenamente Recuperado;</strong></li>
    <li><strong>Capacidade de Aceitar e Tolerar Dieta por Via Oral.</strong></li>
  </ol>
</div>

<h3>6.2. O Protocolo de Transição da Insulina Venosa para a Subcutânea: A Sobreposição Obrigatória</h3>
<p>A meia-vida plasmática da Insulina Regular quando infundida por via endovenosa contínua é extremamente curta: <strong>menos de 4 a 5 minutos</strong>. Se você desligar a bomba de infusão venosa e aplicar a insulina subcutânea imediatamente após, haverá uma janela de 1 a 2 horas na qual o paciente estará completamente desprovido de qualquer insulina circulante no sangue (pois a insulina subcutânea requer tempo de absorção tissular). Nesse intervalo, os hormônios contrarreguladores disparam e o paciente entra em <strong>efeito rebote agudo com hiperglicemia severa e recidiva da cetogênese</strong>.</p>

<div class="clinical-box alert">
  <h4>A Regra de Ouro da Transição: Sobreposição Temporal Obrigatória</h4>
  <ul>
    <li>O momento ideal para a transição é imediatamente antes de uma refeição programada (café da manhã, almoço ou jantar).</li>
    <li>Administrar a dose calculada de <strong>Insulina Basal Subcutânea</strong> (ex.: Glargina, Degludeca ou Detemir) e/ou <strong>Insulina Ultrarrápida Subcutânea</strong> (Lispro, Aspart ou Glulisina).</li>
    <li><strong>TEMPO DE SOBREPOSIÇÃO MANDATÓRIO:</strong>
      <ul>
        <li>Se utilizar <strong>Insulina Ultrarrápida SC</strong> (Aspart ou Lispro): Manter a bomba de insulina venosa ligada por mais <strong>15 a 30 minutos após a injeção subcutânea</strong>, liberando a dieta oral nesse momento. Somente após 30 minutos desligar a bomba venosa!</li>
        <li>Se utilizar <strong>Insulina Regular SC</strong>: Manter a bomba de insulina venosa ligada por mais <strong>1 a 2 horas após a injeção subcutânea</strong>, desligando a bomba somente após esse período.</li>
      </ul>
    </li>
  </ul>
</div>

<p><strong>Cálculo da Dose Diária Total (DDT) de Insulina Subcutânea:</strong></p>
<p>Para pacientes que estão debutando no DM1 na abertura, a Dose Diária Total (DDT) situa-se habitualmente entre <strong>0,5 e 0,7 U/kg/dia</strong> (em crianças na fase pré-púbere) e de <strong>0,7 a 1,0 U/kg/dia</strong> (em adolescentes em estirão puberal ou durante a fase inicial pós-CAD devido à resistência insulínica tecidual transitória). A dose é dividida no regime basal-bolus intensivo contemporâneo:</p>
<ul>
  <li><strong>50% da DDT como Insulina Basal</strong> (Glargina ou Degludeca administrada uma vez ao dia, ou NPH dividida em 2 a 3 tomadas diárias);</li>
  <li><strong>50% da DDT como Insulina Prandial Ultrarrápida</strong> (Aspart ou Lispro fracionada antes do café da manhã, almoço e jantar conforme a contagem de carboidratos e a glicemia pré-prandial).</li>
</ul>
`
};
