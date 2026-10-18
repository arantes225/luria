// scripts/build-bloco-05-111-extra.mjs
// Seções de aprofundamento para Aula 111: Doença Renal Crônica

export const secEtiologias = {
  id: 'etiologias-epidemiologia-histopatologia-drc',
  title: '2. Epidemiologia Global, Principais Etiologias da DRC e Histopatologia Renal',
  body_html: `
<h3>Epidemiologia e Carga Global da Doença Renal Crônica</h3>
<p>A Doença Renal Crônica (DRC) atingiu proporções de epidemia de saúde pública global no século XXI, afetando mais de 850 milhões de pessoas em todo o mundo — o que equivale a mais de 10% da população adulta global. No Brasil, estimativas da Sociedade Brasileira de Nefrologia (SBN) apontam que mais de 10 a 13 milhões de brasileiros apresentam algum grau de disfunção renal, com mais de 150.000 pacientes mantidos em programa crônico de diálise, gerando imensa sobrecarga financeira ao Sistema Único de Saúde (SUS), que financia mais de 85% a 90% dos tratamentos renais substitutivos no território nacional.</p>

<h3>As Principais Causas Etiológicas no Brasil e no Mundo</h3>
<p>As etiologias primárias responsáveis pelo desenvolvimento da DRC apresentam variações de acordo com a faixa etária e o nível socioeconômico da população avaliada, mas concentram-se predominantemente em quatro grandes grupos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Primária</th>
      <th>Proporção no Censo Brasileiro de Diálise</th>
      <th>Mecanismo Fisiopatológico Central</th>
      <th>Particularidades Clínicas e Rastreamento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hipertensão Arterial Sistêmica (Nefroesclerose Hipertensiva)</strong></td>
      <td><strong>30% a 35%</strong> (principal causa no Brasil)</td>
      <td>A hipertensão arterial sistêmica crônica não controlada induz estresse mecânico parietal sobre as artérias interlobulares e arteríolas aferentes, deflagrando espessamento hialino da túnica média e proliferação intimal fibroelástica (arteriolosclerose hialina). O lúmen vascular colapsa progressivamente, gerando isquemia glomerular crônica, colapso das alças capilares glomerulares e glomeruloesclerose global.</td>
      <td>Instala-se após anos ou décadas de HAS de longa data. Cursa caracteristicamente com proteinúria discreta a moderada (geralmente $&lt; 1,0$ g/24h ou $RAC &lt; 300$ a $500$ mg/g), sedimento urinário inativo ou pobre e rins simetricamente reduzidos com afilamento cortical na ultrassonografia.</td>
    </tr>
    <tr>
      <td><strong>Diabetes Mellitus (Nefropatia Diabética / Doença Renal do Diabetes)</strong></td>
      <td><strong>30% a 32%</strong> (principal causa no mundo desenvolvido e em franca ascensão no Brasil)</td>
      <td>A hiperglicemia crônica ativa a via dos produtos finais de glicação avançada (AGEs), a via dos polióis e da proteína quinase C (PKC). Isso induz hipertrofia glomerular, espessamento acentuado da membrana basal glomerular (MBG) e expansão da matriz mesangial celular e acelular. A proliferação mesangial nodular forma as patognomônicas <strong>lesões nodulares intercapilares de Kimmelstiel-Wilson</strong>.</td>
      <td>História natural clássica: fase de hiperfiltração $\rightarrow$ microalbuminúria (30-300 mg/g) $\rightarrow$ macroalbuminúria ($> 300$ mg/g) associada a declínio progressivo da TFG. Fortemente associada a retinopatia diabética (em diabéticos tipo 1, a presença de retinopatia é quase mandatória para atribuir a nefropatia exclusivamente ao diabetes).</td>
    </tr>
    <tr>
      <td><strong>Glomerulonefrites Crônicas Primárias e Secundárias</strong></td>
      <td><strong>12% a 15%</strong></td>
      <td>Lesão imunomediada direta sobre o tufo capilar e podócitos (Glomeruloesclerose Segmentar e Focal - GESF, Nefropatia Membranosa, Nefropatia por IgA / Doença de Berger e Nefrite Lúpica no LES).</td>
      <td>Acomete pacientes mais jovens. Manifesta-se com hematúria microscópica persistente, dismorfismo eritrocitário, cilindros hemáticos e proteinúria de faixa nefrótica ($> 3,5$ g/24h). Exige biópsia renal diagnóstica precoce.</td>
    </tr>
    <tr>
      <td><strong>Doença Renal Policística Autossômica Dominante (DRPAD)</strong></td>
      <td><strong>8% a 10%</strong></td>
      <td>Mutação nos genes <em>PKD1</em> (cromossomo 16, responsável por 85% dos casos, evolução mais precoce) ou <em>PKD2</em> (cromossomo 4, responsável por 15% dos casos, evolução mais branda), codificando as proteínas policistina-1 e policistina-2 nos cílios primários tubulares renais. Ocorre proliferação celular clonal epitelial e secreção fluida desregulada, formando milhares de cistos que comprimem e destroem o parênquima renal adjacente.</td>
      <td>História familiar autossômica dominante positiva (50% de acometimento de filhos). Rins palpáveis e volumosos ao exame físico, dor lombar crônica, hematúria macroscópica por rotura de cistos, infecção de cisto e <strong>aneurismas saculares intracranianos no polígono de Willis</strong> (risco de hemorragia subaracnóidea). Droga nefroprotetora específica: <em>Tolvaptan</em> (antagonista do receptor V2 de vasopressina).</td>
    </tr>
    <tr>
      <td><strong>Nefropatias Tubulointersticiais Crônicas e Uropatias Obstrutivas</strong></td>
      <td><strong>5% a 8%</strong></td>
      <td>Uso crônico e abusivo de analgésicos e AINEs (nefropatia por analgésicos com necrose de papila renal), pielonefrite crônica por refluxo vesicoureteral na infância, litíase renal coraliforme bilateral e obstrução prostática crônica negligenciada.</td>
      <td>Sintomas de perda da capacidade de concentração urinária (nictúria precoce e poliúria), acidose tubular renal hiperclorêmica e cilindros leucocitários no sedimento urinário.</td>
    </tr>
  </tbody>
</table>

<h3>A Biópsia Renal na Doença Renal Crônica: Indicações e Contraindicações Formais</h3>
<p>A biópsia renal percutânea guiada por ultrassonografia em tempo real é uma ferramenta diagnóstica de alta precisão histopatológica, mas sua indicação em pacientes com DRC deve ser rigorosamente ponderada:</p>
<ul>
  <li><strong>Indicações Precisas:</strong>
    <ol>
      <li>Proteinúria de início recente $\ge 1,0$ g/24h ou de faixa nefrótica ($> 3,5$ g/24h) com ou sem síndrome nefrótica clínica;</li>
      <li>Síndrome nefrítica aguda com perda acelerada e inexplicada da função renal em semanas ou meses (suspeita de GNRP ou vasculite);</li>
      <li>Doença renal crônica associada a manifestações sistêmicas inflamatórias ou autoimunes exuberantes (Lúpus Eritematoso Sistêmico, púrpura de Henoch-Schönlein, crioglobulinemia mista, amiloidose primária AL ou secundária AA);</li>
      <li>Disfunção renal inexplicada em pacientes diabéticos <em>na ausência de retinopatia diabética</em>, com perda rápida de TFG ou início abrupto de proteinúria maciça (suspeita de glomerulopatia não diabética sobreposta);</li>
    </ol>
  </li>
  <li><strong>Contraindicações Formais à Biópsia Renal:</strong>
    <ol>
      <li><strong>Rins Crônicos Afilados, Escleróticos e Reduzidos Bilateralmente:</strong> Rins com diâmetro longitudinal $&lt; 9$ cm ou com espessura cortical $< 1,0$ cm e perda completa da diferenciação córtico-medular ao ultrassom. Nesses casos, o tecido renal está completamente substituído por fibrose cicatricial inespecífica e glomeruloesclerose global avançada (IFTA $> 70\%-80\%$), o que impede a identificação da etiologia primária de base e impõe risco altíssimo de sangramento perinefrítico grave e perda renal cirúrgica;</li>
      <li><strong>Hipertensão Arterial Sistêmica Grave Não Controlada ($PA > 160/100$ mmHg):</strong> Risco inaceitável de hemorragia renal catastrófica pós-punção por ruptura de hematoma subcapsular;</li>
      <li><strong>Distúrbios da Hemostasia e Coagulopatia Não Corrigidos:</strong> Plaquetopenia $< 50.000/\text{mm}³$, RNI $> 1,5$, uso recente de antiagregantes plaquetários ou anticoagulantes orais;</li>
      <li><strong>Rim Único Anatômico ou Funcional (Monorrimo):</strong> Contraindicação relativa formal para biópsia percutânea convencional às cegas em leito; se mandatória, deve ser feita por via transjugular ou cirúrgica aberta laparoscópica;</li>
      <li><strong>Infecção Renal Ativa (Pielonefrite Aguda ou Abscesso Renal Perinefrítico) ou Múltiplos Cistos Renais Bilaterais Grandes.</strong></li>
    </ol>
  </li>
</ul>
`
};

export const secNutricao = {
  id: 'manejo-nutricional-e-terapia-conservadora-drc',
  title: '6. Terapia Nutricional Especializada, Manejo Conservador e Vacinação na DRC Avançada',
  body_html: `
<h3>Prescrição Dietética e Manejo Nutricional Baseado no Estadiamento</h3>
<p>O suporte nutricional na Doença Renal Crônica busca equilibrar dois objetivos aparentemente antagônicos: <strong>reduzir a geração de escórias nitrogenadas tóxicas e a sobrecarga de fósforo/potássio</strong> enquanto se <strong>previne a temida Desnutrição Energético-Proteica (DEP / Protein-Energy Wasting - PEW)</strong>, que constitui um dos fatores mais letais de morbimortalidade no paciente renal crônico.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Nutriente / Componente Dietético</th>
      <th>Estágios Pré-Dialíticos (G3 a G5 não dialítico)</th>
      <th>Paciente em Hemodiálise Crônica (G5D)</th>
      <th>Fundamentação Fisiológica e Racional Clínico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Proteínas da Dieta</strong></td>
      <td><strong>0,55 a 0,60 g/kg/dia</strong> (Dieta Hipoproteica Padrão) OU 0,28 a 0,43 g/kg/dia se suplementada com cetoácidos essenciais (alfa-cetoanálogos).</td>
      <td><strong>1,0 a 1,2 g/kg/dia</strong> (Dieta Hiperproteica)</td>
      <td>No paciente não dialítico, a restrição proteica reduz a produção de ureia e prótons, alivia a pressão intraglomerular e retarda a perda da TFG. No paciente em hemodiálise, a perda obrigatória de aminoácidos no dialisador (10 a 15 g de aminoácidos por sessão) somada ao estado inflamatório urêmico catabólico exige <em>aumento substancial do aporte proteico</em> para evitar desnutrição proteica e atrofia muscular grave.</td>
    </tr>
    <tr>
      <td><strong>Aporte Calórico Total</strong></td>
      <td><strong>25 a 35 kcal/kg/dia</strong> (ajustado para idade, sexo, atividade física e IMC)</td>
      <td><strong>30 a 35 kcal/kg/dia</strong></td>
      <td>Garante que as proteínas ingeridas sejam utilizadas exclusivamente para síntese estrutural e reparo celular, impedindo que os aminoácidos sejam desviados para gliconeogênese como fonte calórica.</td>
    </tr>
    <tr>
      <td><strong>Sódio Elementar</strong></td>
      <td><strong>$&lt; 2,0$ g/dia de Sódio</strong> ($&lt; 5,0$ g de Cloreto de Sódio / Sal de cozinha)</td>
      <td><strong>$&lt; 2,0$ g/dia de Sódio</strong></td>
      <td>O controle do sódio potencializa a eficácia anti-hipertensiva dos IECA/BRA, reduz a proteinúria em mais de 25% e previne a sobrecarga volêmica, edema periférico e congestão pulmonar.</td>
    </tr>
    <tr>
      <td><strong>Potássio</strong></td>
      <td>Individualizado; geralmente restrito a <strong>$&lt; 2,0$ a $3,0$ g/dia</strong> (50 a 70 mEq/dia) quando $K^+$ sérico for $> 5,0$ mEq/L ou estágios G4-G5.</td>
      <td><strong>2,0 a 3,0 g/dia</strong> (monitorar ganho intradialítico)</td>
      <td>Prevenção de arritmias cardíacas ventriculares letais decorrentes de hipercalemia sustentada. Orientar técnicas de cocção (fervura dupla de vegetais com descarte da água para espoliar potássio hidrossolúvel).</td>
    </tr>
    <tr>
      <td><strong>Fósforo</strong></td>
      <td><strong>800 a 1.000 mg/dia</strong></td>
      <td><strong>800 a 1.000 mg/dia</strong> associado a quelantes</td>
      <td>Controle da hiperfosfatemia e supressão da transcrição do PTH nas glândulas paratireoides.</td>
    </tr>
    <tr>
      <td><strong>Líquidos / Água Livre</strong></td>
      <td>Livre conforme sede (se paciente euvolêmico e sem edema)</td>
      <td><strong>Diurese residual de 24h + 500 a 800 mL/dia</strong></td>
      <td>O ganho de peso interdialítico em hemodiálise não deve ultrapassar <strong>3% a 5% do peso seco</strong> (peso estimado do paciente livre de edema extracelular) para evitar edema agudo de pulmão e hipertensão volumétrica severa.</td>
    </tr>
  </tbody>
</table>

<h3>A Síndrome do Desgaste Energético-Proteico (PEW) na Uremia</h3>
<p>O <em>Protein-Energy Wasting (PEW)</em> é uma síndrome metabólica consumptiva exclusiva da uremia caracterizada por sarcopenia acelerada, perda involuntária de massa magra e adiposa, hipoalbuminemia e estado inflamatório sistêmico persistente. Diferencia-se da simples inanição por não responder apenas à oferta calórica pura: as toxinas urêmicas circulantes ativam vias proteolíticas celulares (caspase-3 e sistema ubiquitina-proteassoma), suprimem o apetite a nível hipotalâmico e induzem resistência muscular periférica à insulina e ao IGF-1. O diagnóstico baseia-se em quatro categorias: marcadores bioquímicos (albumina sérica $< 3,8$ g/dL), redução da massa corporal (perda de peso $> 5\%$ em 3 meses), redução da massa muscular (perda $> 10\%$ de área muscular do braço) e baixa ingestão proteica ou calórica.</p>

<h3>Imunização e Calendário Vacinal Específico do Paciente com DRC</h3>
<p>O paciente portador de DRC apresenta disfunção imune multifatorial induzida pelas toxinas urêmicas, com imunossenescência precoce, hiporreatividade dos linfócitos T e diminuição da produção de anticorpos neutralizantes pelos linfócitos B. Por isso, as respostas sorológicas vacinais são atenuadas, exigindo esquemas imunogênicos especiais preconizados pelo Ministério da Saúde e SBN:</p>
<ol>
  <li><strong>Vacina contra Hepatite B (Esquema com Dose Dobrada 40 mcg):</strong> Deve ser iniciada <em>o mais precocemente possível</em>, preferencialmente nos estágios G3 ou G4 (antes do início da diálise, fase em que a resposta de soroconversão ainda é de 70% a 80%, caindo para menos de 40% a 50% após o início da hemodiálise). O esquema consiste em <strong>4 doses administradas no esquema de 0, 1, 2 e 6 meses, com dose dobrada (40 $\mu$g por aplicação intramuscular no deltoide)</strong>. Deve-se monitorar o título sérico de anti-HBs anualmente: se anti-HBs $< 10$ mUI/mL, administrar dose de reforço imediatamente;</li>
  <li><strong>Vacina Pneumocócica Conjugada e Polissacarídica (Pneumo-13 e Pneumo-23):</strong> Esquema sequencial iniciando com a vacina conjugada VPC13, seguida pela vacina polissacarídica VPP23 após 6 a 12 meses, com reforço da VPP23 após 5 anos para prevenir pneumonias comunitárias bacterianas invasivas e bacteremias estafilocócicas/pneumocócicas graves;</li>
  <li><strong>Vacina contra Influenza:</strong> Dose anual única com vacina inativada de alta dose (ou padrão tetravalente);</li>
  <li><strong>Vacina contra Herpes Zóster Recombinante Adjuvada (Shingrix):</strong> Duas doses com intervalo de 2 a 6 meses; por se tratar de vacina inativada de subunidade proteica, é altamente segura inclusive para imunossuprimidos e candidatos a transplante renal.</li>
</ol>
`
};
