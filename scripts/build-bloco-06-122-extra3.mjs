// scripts/build-bloco-06-122-extra3.mjs
// Seções extras 3 de expansão e aprofundamento para Aula 122: Perfuração de Víscera Oca
// Foco: Laparostomia, Bolsa de Bogotá, VAC abdominal, Síndrome Compartimental Abdominal e Profilaxias

export const secSCAeLaparostomia = {
  id: 'sindrome-compartimental-abdominal-e-abdome-aberto',
  title: '8. Síndrome Compartimental Abdominal, Laparostomia (Bolsa de Bogotá vs VAC) e Fechamento da Parede',
  body_html: `
<h3>Pressão Intra-Abdominal (PIA) e Hipertensão Intra-Abdominal (HIA) em Peritonites Graves</h3>
<p>Em pacientes submetidos à laparotomia de emergência por perfuração de víscera oca com peritonite fecal ou choque séptico, a combinação de <strong>ressuscitação volêmica cristaloide agressiva (edema visceral e mesentérico maciço), íleo adinâmico com dilatação de alças, coleções purulentas e tamponamento cirúrgico</strong> precipita elevações críticas da pressão intra-abdominal, podendo culminar na temida <strong>Síndrome Compartimental Abdominal (SCA)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Definição / Grau da WSACS</th>
      <th>Valores Manométricos de PIA</th>
      <th>Repercussões Orgânicas e Conduta Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pressão Intra-Abdominal Normal</strong></td>
      <td><strong>0 a 5 mmHg</strong> (em adultos em repouso)<br><strong>5 a 7 mmHg</strong> em pacientes críticos em UTI</td>
      <td>Homeostase fisiológica dos fluxos microvasculares esplâncnico e renal.</td>
    </tr>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (HIA) Grau I</strong></td>
      <td><strong>12 a 15 mmHg</strong></td>
      <td>Redução discreta da perfusão mesentérica. Medidas conservadoras: otimização da sedação, analgesia e descompressão nasogástrica.</td>
    </tr>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (HIA) Grau II</strong></td>
      <td><strong>16 a 20 mmHg</strong></td>
      <td>Queda do débito cardíaco, elevação de pressões inspiratórias no ventilador. Descompressão retal/gástrica, balanço hídrico neutro/negativo com diuréticos ou hemofiltração.</td>
    </tr>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (HIA) Grau III</strong></td>
      <td><strong>21 a 25 mmHg</strong></td>
      <td>Oligúria refratária, hipóxia tecidual mesentérica progressiva. Preparação imediata para intervenção invasiva se houver disfunção orgânica associada.</td>
    </tr>
    <tr>
      <td><strong>Hipertensão Intra-Abdominal (HIA) Grau IV</strong></td>
      <td><strong>&gt; 25 mmHg</strong></td>
      <td>Indicação quase universal de <strong>laparotomia descompressiva de emergência</strong>.</td>
    </tr>
    <tr>
      <td><strong>Síndrome Compartimental Abdominal (SCA)</strong></td>
      <td><strong>PIA sustentada &gt; 20 mmHg</strong> associada a <strong>nova disfunção orgânica de órgão ou sistema</strong> (insuficiência renal com oligúria, acidose metabólica lática, hipercapnia ou choque refratário)</td>
      <td><strong>Emergência cirúrgica absoluta:</strong> Laparotomia descompressiva com abertura da aponeurose e instalação de peritoniostomia / abdome aberto. A não realização imediata acarreta necrose visceral e colapso circulatório irreversível com óbito em quase 100% dos casos.</td>
    </tr>
  </tbody>
</table>

<h4>Aferição Fidedigna da PIA: Método Intravesical de Kron</h4>
<p>O método padrão-ouro estabelecido internacionalmente pela <em>World Society of the Abdominal Compartment Syndrome (WSACS)</em> para aferição contínua ou intermitente da PIA é a <strong>manometria intravesical através de cateter vesical de demora (sonda de Foley)</strong>:</p>
<ol>
  <li>O paciente deve estar posicionado rigorosamente em <strong>decúbito dorsal horizontal plano ($0^\circ$)</strong>, sem tração nos membros ou contração voluntária da musculatura abdominal;</li>
  <li>Instila-se na bexiga um volume padronizado de <strong>20 a 25 mL de soro fisiológico estéril à temperatura ambiente</strong> (volumes excessivos maiores que 50 mL superestimam a pressão decorrente do estiramento do músculo detrusor);</li>
  <li>O transdutor de pressão hidrostático é alinhado e zerado no <strong>nível da linha axilar média na altura da crista ilíaca</strong>;</li>
  <li>A leitura deve ser registrada ao final da expiração passiva em milímetros de mercúrio ($1\text{ mmHg} = 1{,}36\text{ cmH}_2\text{O}$).</li>
</ol>

<h3>Técnicas de Fechamento Temporário do Abdome Aberto (Laparostomia)</h3>
<p>Quando a cavidade abdominal não pode ser fechada primariamente sem tensão após peritonite grave (ou quando se programa reoperação programada em 24 a 48 horas), a laparostomia é mandatória. Dentre as técnicas consagradas:</p>
<ul>
  <li><strong>Bolsa de Bogotá (Técnica de Borráez):</strong>
    <p>Consiste na sutura de uma bolsa plástica de infusão estéril de soro (polietileno / polivinil) diretamente às bordas da pele ou à aponeurose por sutura contínua com fio inabsorvível (nylon ou prolene). <em>Vantagens:</em> Baixíssimo custo, ampla disponibilidade e visualização translúcida direta da coloração das alças intestinais sem necessidade de desmanchar o curativo. <em>Desvantagens:</em> Dificuldade no controle de exsudato purulento volumoso, alto índice de maceração de pele e retração aponeurótica lateral importante que dificulta o fechamento definitivo tardio.</p>
  </li>
  <li><strong>Terapia por Pressão Negativa Abdominal (Curativo a Vácuo / TAC / VAC Abdominal):</strong>
    <p>É o padrão-ouro contemporâneo internacional. Uma película fenestrada de poliuretano não aderente recobre diretamente as vísceras abdominais e se estende até as goteiras parietocólicas, impedindo aderências da esponja ao omento ou intestino (evitando fístula iatrogênica). Uma esponja de poliuretano hidrofóbica é acomodada sobre a película e recoberta por filme adesivo transparente com sucção a vácuo contínua de $-75$ a $-125\text{ mmHg}$.</p>
    <p><em>Benefícios Terapêuticos Insuperáveis:</em> Drena continuamente fluidos inflamatórios tóxicos e citocinas da cavidade peritoneal, reduz drasticamente o edema de alças e da parede, mantém a tração fascial medial contínua (evitando a retração das margens musculares do reto abdominal) e atinge <strong>taxas de fechamento fascial primário definitivo superiores a 80% a 90%</strong> em 7 a 14 dias.</p>
  </li>
</ul>

<h3>Checklist Cirúrgico Fundamental na Perfuração de Víscera Oca para o ENAMED</h3>
<div class="destaque-conceito">
  <strong>Mnemônico de Ouro para a Prova de Residência: O ABCDE da Perfuração Abdominal</strong>
  <ul>
    <li><strong>A - Air under diaphragm:</strong> Pneumoperitônio subdiafragmático na rotina de abdome agudo (sinal de Jobert). Em acamados: decúbito lateral esquerdo com raios horizontais (Hjelm-Laurell);</li>
    <li><strong>B - Biópsia obrigatória:</strong> Sempre biopsiar bordas de úlceras gástricas perfuradas antes da rafia ou omentoplastia para afastar adenocarcinoma. Úlceras duodenais perfuradas raramente são malignas e dispensam biópsia;</li>
    <li><strong>C - Controle do Foco (Source Control):</strong> Hartmann na diverticulite perfurada Hinchey IV, sutura em cunha/ressecção nas perfurações colônicas/delgadas e patch de Graham omental nas duodenais;</li>
    <li><strong>D - Duração do Antibiótico:</strong> Fixar em apenas 4 a 5 dias após o controle cirúrgico estanque adequado do foco séptico (Ensaio STOP-IT);</li>
    <li><strong>E - Enterocutaneous Fistula prevention:</strong> Proteger o intestino com película plástica não aderente ao realizar laparostomia a vácuo e evitar enterorrafias sob tensão ou isquemia.</li>
  </ul>
</div>
`
};
