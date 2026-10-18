// scripts/bloco-07-builders/build-153-part5.mjs

export const sec8 = {
  id: "manejo-ambulatorial-do-dm1-tecnologias-e-checklist-luria",
  title: "8. Manejo Ambulatorial Crônico do DM1: Insulinoterapia Basal-Bolus, Monitorização Contínua, Tecnologias e Checklist LURIA",
  body_html: `
<p>Após a alta hospitalar e a superação da crise de cetoacidose diabética, o paciente e sua família iniciam a jornada desafiadora do controle glicêmico ambulatorial ao longo da vida. As diretrizes mundiais da ISPAD e da Sociedade Brasileira de Diabetes (SBD) preconizam a insulinoterapia intensiva como padrão-ouro inegociável para todas as crianças e adolescentes com DM1 desde o primeiro dia de diagnóstico ambulatorial, associada à educação contínua em diabetes e incorporação de tecnologias modernas.</p>

<h3>8.1. O Esquema Basal-Bolus Intensivo: Análogos Modernos de Insulina</h3>
<p>O pilar da terapia insulínica moderna fundamenta-se no regime <strong>Basal-Bolus</strong>, que busca mimetizar com máxima fidelidade a fisiologia pancreática endógena:</p>
<ul>
  <li><strong>Componente Basal (Cerca de 40% a 50% da Dose Diária Total):</strong> Fornece níveis constantes e contínuos de insulina ao longo das 24 horas para suprimir a produção hepática noturna e interalimentar de glicose.
    <ul>
      <li><strong>Análogos de Ação Ultralonga (Degludeca e Glargina U300):</strong> Representam a primeira linha contemporânea. A Degludeca forma solúveis multi-hexâmeros no tecido subcutâneo com liberação contínua e previsível, apresentando meia-vida superior a 25 horas e perfil "sem pico" (plano), resultando em redução drástica de hipoglicemias noturnas em crianças.</li>
      <li><strong>Análogos de Longa Ação (Glargina U100 e Detemir):</strong> Amplamente utilizados no SUS. A Glargina U100 é aplicada 1 vez ao dia; a Detemir (que se liga à albumina plasmática por sua cadeia de ácido graxo) frequentemente requer 2 aplicações diárias na pediatria.</li>
      <li><strong>Insulina NPH Humana:</strong> Apresenta pico acentuado de ação entre 4 e 8 horas após a injeção e duração de 12 a 16 horas, exigindo 2 a 3 doses diárias e associando-se a maior variabilidade glicêmica e risco de hipoglicemias matinais e na madrugada.</li>
    </ul>
  </li>
  <li><strong>Componente Prandial / Bolus (Cerca de 50% a 60% da Dose Diária Total):</strong> Administrado imediatamente antes de cada refeição principal para cobrir os carboidratos ingeridos (Bolus de Alimentação) e para corrigir eventuais hiperglicemias prévias (Bolus de Correção).
    <ul>
      <li><strong>Análogos de Ação Ultrarrápida (Aspart, Lispro e Glulisina) e Fast-Acting Aspart (Fiasp):</strong> Início de ação em 5 a 15 minutos, pico entre 45 e 90 minutos e duração de 3 a 5 horas. Devem ser aplicados idealmente <strong>10 a 15 minutos ANTES do início da refeição</strong>. <em>Exceção Pediátrica Importante:</em> Em lactentes e pré-escolares com apetite imprevisível que frequentemente recusam alimentos, as diretrizes da ISPAD autorizam aplicar a insulina ultrarrápida <em>imediatamente após a refeição</em>, calculando a dose estritamente sobre a quantidade de carboidratos que a criança efetivamente consumiu.</li>
    </ul>
  </li>
</ul>

<div class="clinical-box highlight">
  <h4>As Fórmulas Matemáticas do Manejo Pediátrico: Razão I:C e Fator de Sensibilidade</h4>
  <p>1. <strong>Razão Insulina:Carboidrato (Razão I:C):</strong> Determina quantos gramas de carboidrato são metabolizados por 1 unidade de insulina ultrarrápida.<br>
  <em>Regra dos 500:</em> <strong>Razão I:C = 500 / Dose Diária Total (DDT) de Insulina</strong><br>
  <em>Exemplo:</em> Criança em uso de DDT = 25 U/dia -> Razão I:C = 500 / 25 = 20 g/U (1 unidade de insulina cobre 20 gramas de carboidrato).</p>

  <p>2. <strong>Fator de Sensibilidade à Insulina (FS):</strong> Determina quantos mg/dL a glicemia do paciente cai para cada 1 unidade de insulina ultrarrápida aplicada.<br>
  <em>Regra dos 1800 (para análogos ultrarrápidos):</em> <strong>FS = 1800 / Dose Diária Total (DDT)</strong><br>
  <em>Exemplo:</em> Criança com DDT = 25 U/dia -> FS = 1800 / 25 = 72 mg/dL por unidade.</p>

  <p>3. <strong>Cálculo do Bolus Total da Refeição:</strong><br>
  <strong>Bolus Total = [Carboidratos da Refeição (g) / Razão I:C] + [(Glicemia Atual - Glicemia Alvo) / Fator de Sensibilidade]</strong></p>
</div>

<h3>8.2. Monitorização Contínua de Glicose (CGM) e Metas de Tempo no Alvo (TIR)</h3>
<p>A monitorização da glicose passou por uma revolução com o advento dos sensores de <strong>Monitorização Contínua da Glicose no Líquido Intersticial (CGM / ex.: FreeStyle Libre, Dexcom)</strong>. O parâmetro tradicional da Hemoglobina Glicada (HbA1c) — cuja meta recomendada pela ISPAD e ADA para crianças e adolescentes é <strong>&lt; 7,0%</strong> sem hipoglicemias graves — foi complementado pelas métricas do <strong>Perfil Ambulatorial de Glicose (AGP)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Métrica de Monitorização Contínua (CGM)</th>
      <th>Faixa de Glicose Intersticial</th>
      <th>Meta Recomendada (ISPAD / ADA / SBD)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tempo no Alvo (Time in Range - TIR)</strong></td>
      <td><strong>70 a 180 mg/dL</strong></td>
      <td><strong>&gt; 70% do tempo</strong> (pelo menos 17 horas por dia)</td>
    </tr>
    <tr>
      <td><strong>Tempo Abaixo do Alvo Nível 1 (TBR Nível 1)</strong></td>
      <td>54 a 69 mg/dL</td>
      <td><strong>&lt; 4% do tempo</strong> (&lt; 1 hora por dia)</td>
    </tr>
    <tr>
      <td><strong>Tempo Abaixo do Alvo Nível 2 (Hipoglicemia Grave)</strong></td>
      <td>&lt; 54 mg/dL</td>
      <td><strong>&lt; 1% do tempo</strong> (&lt; 15 minutos por dia)</td>
    </tr>
    <tr>
      <td><strong>Tempo Acima do Alvo Nível 1 (TAR Nível 1)</strong></td>
      <td>181 a 250 mg/dL</td>
      <td><strong>&lt; 25% do tempo</strong></td>
    </tr>
    <tr>
      <td><strong>Tempo Acima do Alvo Nível 2 (Hiperglicemia Grave)</strong></td>
      <td>&gt; 250 mg/dL</td>
      <td><strong>&lt; 5% do tempo</strong></td>
    </tr>
    <tr>
      <td><strong>Coeficiente de Variabilidade (%CV)</strong></td>
      <td>Desvio padrão da glicose / média glicêmica</td>
      <td><strong>&lt;= 36%</strong> (atesta estabilidade glicêmica com baixo risco de hipoglicemia)</td>
    </tr>
  </tbody>
</table>

<h3>8.3. O Fenômeno de Alvorada versus Efeito Somogyi</h3>
<p>Diante de uma hiperglicemia matinal ao acordar (ex.: glicemia de 240 mg/dL às 07:00 da manhã), o médico assistente deve investigar e diferenciar dois fenômenos clássicos medindo a <strong>glicemia capilar na madrugada (às 03:00 da manhã)</strong>:</p>
<ol>
  <li><strong>Fenômeno do Alvorecer (Fenômeno da Alvorada / <em>Dawn Phenomenon</em>):</strong> A glicemia das 03:00 da manhã encontra-se <strong>NORMAL OU ELEVADA</strong>. Decorre da elevação fisiológica circadiana dos hormônios contrarreguladores na madrugada (pico fisiológico de hormônio do crescimento - GH e cortisol), que induzem resistência hepática à insulina. <em>Conduta:</em> Aumentar a dose noturna da insulina basal.</li>
  <li><strong>Efeito Somogyi (Efeito Rebote Pós-Hipoglicêmico):</strong> A glicemia das 03:00 da manhã encontra-se <strong>BAIXA (Hipoglicemia inadvertida &lt; 70 mg/dL)</strong>. Em resposta à hipoglicemia noturna assintomática, o organismo dispara uma liberação maciça e emergencial de adrenalina e glucagon, resultando em hiperglicemia rebote matinal exuberante. <em>Conduta:</em> <strong>REDUZIR a dose noturna da insulina basal</strong> ou oferecer um lanche contendo proteína e carboidrato complexo antes de dormir. Se o médico inadvertidamente aumentar a insulina basal acreditando tratar-se de hiperglicemia simples, provocará hipoglicemia noturna ainda mais severa com risco de convulsão e morte!</li>
</ol>

<div class="clinical-box highlight">
  <h4>Checklist de Alta Retenção LURIA: Os 10 Mandamentos da CAD Pediátrica</h4>
  <ol>
    <li><strong>Critérios de CAD:</strong> Glicemia &gt; 200 mg/dL + pH venoso &lt; 7,30 (ou HCO3 &lt; 15) + Cetonemia &gt;= 3,0 mmol/L ou cetonúria &gt;= 2+.</li>
    <li><strong>Gravidade pela Acidose:</strong> Leve (pH 7,20-7,29), Moderada (pH 7,10-7,19) e Grave (pH &lt; 7,10 ou HCO3 &lt; 5). A glicemia isolada não define gravidade.</li>
    <li><strong>Expansão Inicial:</strong> Soro Fisiológico a 0,9% (10 a 20 mL/kg em 1 hora). Sem bolus rápido!</li>
    <li><strong>Atraso da Insulina:</strong> Iniciar insulina regular venosa apenas APÓS 1 a 2 horas de hidratação.</li>
    <li><strong>Proscrição do Bolus de Insulina:</strong> NUNCA fazer bolus de insulina na CAD pediátrica. Usar infusão contínua a 0,05-0,1 U/kg/h.</li>
    <li><strong>Reposição Mandatória de Potássio:</strong> Adicionar 40 mEq/L de K+ logo após a expansão inicial assim que houver diurese. Se K+ &lt; 3,5 mEq/L na admissão, NÃO inicie insulina até repor potássio!</li>
    <li><strong>Adição Precoce de Glicose:</strong> Quando a glicemia atingir 250 a 300 mg/dL, adicione SG 5% ao soro e NUNCA desligue a bomba de insulina.</li>
    <li><strong>Bicarbonato Contraindicado:</strong> Não use bicarbonato de sódio na CAD (aumenta risco de edema cerebral e piora acidose paradoxal do SNC).</li>
    <li><strong>Edema Cerebral:</strong> Instala-se entre 4 e 12h de terapia. Ao menor sinal clínico (critérios de Muir), elevar cabeceira a 30º, restringir fluidos e administrar MANITOL a 20% (0,5 a 1 g/kg) ou SALINA A 3% (2,5 a 5 mL/kg) IMEDIATAMENTE no leito sem esperar tomografia!</li>
    <li><strong>Transição Subcutânea:</strong> Só suspender a bomba venosa quando pH &gt;= 7,30, HCO3 &gt;= 15 e cetonemia &lt; 1,0, mantendo sobreposição da insulina venosa por 15-30 min após a ultrarrápida SC.</li>
  </ol>
</div>
`
};
