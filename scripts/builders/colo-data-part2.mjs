// scripts/builders/colo-data-part2.mjs

export const secColo2 = [
  {
    id: 'condutas-citopatologia-alterada-asc-us-lsil-asc-h-hsil-agc',
    title: '3. Condutas Clínicas Frente aos Laudos Citopatológicos Alterados (Sistema Bethesda)',
    body_html: `
      <h3>O Fluxograma Decisório das Diretrizes Brasileiras</h3>
      <p>O Sistema Bethesda de classificação citológica cervical estratifica as anormalidades epiteliais escamosas e glandulares. A conduta subsequente é rigorosamente modulada pela <strong>idade da mulher</strong> e pelo <strong>potencial oncogênico</strong> estimado do laudo:</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Laudo Citopatológico</th>
            <th>Idade da Paciente</th>
            <th>Conduta Imediata Recomendada</th>
            <th>Conduta Subsequente e Seguimento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="3"><strong>ASC-US</strong><br>(Atipias de células escamosas de significado indeterminado, possivelmente não neoplásicas)</td>
            <td><strong>&ge; 30 anos</strong></td>
            <td><strong>Repetir citopatologia em 6 meses</strong></td>
            <td>Se o exame repetido for negativo em duas ocasiões semestrais: retornar à rotina trienal.<br>Se qualquer resultado na repetição for <strong>&ge; ASC-US</strong>: encaminhar para <strong>Colposcopia</strong>.</td>
          </tr>
          <tr>
            <td><strong>25 a 29 anos</strong></td>
            <td><strong>Repetir citopatologia em 12 meses</strong></td>
            <td>Se negativo: retornar à rotina trienal.<br>Se alterado (&ge; ASC-US): encaminhar para <strong>Colposcopia</strong>.</td>
          </tr>
          <tr>
            <td><strong>< 25 anos</strong> (coletado indevidamente)</td>
            <td><strong>Manter rotina aos 25 anos</strong></td>
            <td>Não realizar colposcopia nem repetir em 6 meses. Aguardar completar 25 anos para reiniciar o rastreamento formal.</td>
          </tr>
          <tr>
            <td rowspan="3"><strong>LSIL / NIC I</strong><br>(Lesão intraepitelial escamosa de baixo grau / efeito citopático HPV)</td>
            <td><strong>&ge; 30 anos</strong></td>
            <td><strong>Repetir citopatologia em 6 meses</strong></td>
            <td>Se dois exames semestrais negativos: retorno à rotina trienal.<br>Se na repetição mantiver LSIL ou piorar (&ge; ASC-US): encaminhar para <strong>Colposcopia</strong>.</td>
          </tr>
          <tr>
            <td><strong>25 a 29 anos</strong></td>
            <td><strong>Repetir citopatologia em 12 meses</strong></td>
            <td>Se negativo: retorno à rotina trienal.<br>Se na repetição mantiver LSIL ou piorar: encaminhar para <strong>Colposcopia</strong>.</td>
          </tr>
          <tr>
            <td><strong>< 25 anos</strong></td>
            <td><strong>Repetir aos 25 anos</strong></td>
            <td>Alta probabilidade de regressão espontânea (> 85-90%). Não realizar colposcopia.</td>
          </tr>
          <tr>
            <td><strong>ASC-H</strong><br>(Atipias escamosas não sendo possível afastar lesão de alto grau)</td>
            <td><strong>Qualquer idade (&ge; 25 anos)</strong></td>
            <td><strong>COLPOSCOPIA IMEDIATA</strong></td>
            <td>Risco de 30% a 50% de abrigar NIC II/III subjacente. Não se repete citopatologia; a avaliação colposcópica com biópsia dirigida é obrigatória.</td>
          </tr>
          <tr>
            <td><strong>HSIL / NIC II/III</strong><br>(Lesão intraepitelial escamosa de alto grau)</td>
            <td><strong>Qualquer idade (&ge; 25 anos)</strong></td>
            <td><strong>COLPOSCOPIA IMEDIATA</strong></td>
            <td>Avaliar Zona de Transformação. Se critérios preenchidos (idade &ge; 25 anos, lesão ectocervical com limites visíveis, sem suspeita de invasão), é permitido o método <strong>"Ver e Tratar"</strong> com excisão tipo 1 ou 2 por CAF/EZPEC no mesmo ato colposcópico.</td>
          </tr>
          <tr>
            <td><strong>AGC</strong><br>(Células glandulares atípicas / antigas AGUS)</td>
            <td><strong>Qualquer idade (&ge; 25 anos)</strong></td>
            <td><strong>COLPOSCOPIA IMEDIATA + Avaliação do Canal Endocervical</strong></td>
            <td>Realizar escovado endocervical ou curetagem endocervical. <strong>Se idade &ge; 35 anos</strong>, sangramento uterino anormal ou fatores de risco para adenocarcinoma endometrial: realizar <strong>ultrassonografia transvaginal e biópsia endometrial obrigatória</strong>.</td>
          </tr>
        </tbody>
      </table>

      <div class="danger-box">
        <h4>Alerta Crítico: Conduta no Laudo Citológico Insatisfatório</h4>
        <p>A amostra citológica classificada como <strong>insatisfatória para avaliação oncótica</strong> (por celularidade escassa, dessecação, hemorragia excessiva ou sobreposição maciça de leucócitos) <strong>deve ser repetida em 6 a 12 semanas (cerca de 2 a 3 meses)</strong>, orientando a paciente a tratar previamente eventuais vaginites purulentas e evitando duchas vaginais ou relações sexuais nas 48h anteriores à nova coleta.</p>
      </div>
    `
  },
  {
    id: 'colposcopia-testes-solucoes-e-achados-anormais',
    title: '4. Colposcopia: Testes do Ácido Acético e Solução de Schiller, Classificação da ZT e Achados Anormais',
    body_html: `
      <h3>Fundamentos da Avaliação Colposcópica</h3>
      <p>A colposcopia consiste no exame microscópico estereoscópico detalhado do colo uterino e da vagina sob magnificação óptica (6x a 40x), permitindo identificar lesões intraepiteliais e guiar biópsias dirigidas das áreas de maior atipia estrutural e vascular.</p>

      <h3>Classificação Anatômica da Zona de Transformação (IFCPC 2011/2026)</h3>
      <p>A avaliação da Junção Escamocolunar (JEC) e da Zona de Transformação (ZT) determina a adequabilidade técnica da colposcopia e a conduta terapêutica:</p>
      <ul>
        <li><strong>ZT Tipo 1:</strong> A JEC e toda a extensão da zona de transformação são <strong>completamente visíveis e situam-se 100% na ectocérvice</strong> (colo "aberto", comum em mulheres jovens e nuligestas);</li>
        <li><strong>ZT Tipo 2:</strong> A JEC e a zona de transformação possuem um componente endocervical, porém <strong>ainda são 100% visíveis</strong> à manipulação delicada com pinça de Chéron ou espéculo endocervical de Kogan;</li>
        <li><strong>ZT Tipo 3:</strong> A JEC <strong>não é completamente visível</strong>, adentrando o canal endocervical de forma que seu limite superior distal não pode ser determinado pela colposcopia (exame colposcópico insatisfatório/incompleto, comum na pós-menopausa tardia pela retração fisiológica da JEC). Exige amostragem do canal endocervical e contraindica ablação superficial.</li>
      </ul>

      <h3>Os Dois Testes Diagnósticos Fundamentais da Colposcopia</h3>
      
      <h4>1. Teste do Ácido Acético (3% a 5%):</h4>
      <p>O ácido acético desidrata reversivelmente as células e provoca a <strong>coagulação transitória das proteínas nucleares</strong>. Em tecidos com alta densidade celular e núcleos aumentados hipercorados (como nas lesões induzidas pelo HPV e nas neoplasias intraepiteliais de alto grau), o ácido acético impede a penetração da luz através do estroma subjacente e reflete a luz incidente, gerando uma área de coloração esbranquiçada denominada <strong>epitélio acetobranco</strong>:</p>
      <ul>
        <li><strong>Acetobranquidão Tênue e Translúcida:</strong> Sugestiva de metaplasia escamosa imatura ou lesão de baixo grau (NIC I);</li>
        <li><strong>Acetobranquidão Espessa, Opaca e de Rápido Aparecimento:</strong> Sugestiva de lesão intraepitelial de alto grau (NIC II/III) ou carcinoma invasor. A presença de bordas nítidas, relevo elevado, orifícios glandulares espessados (cuffing) e desprendimento epitelial ("peeling") aumenta a probabilidade de neoplasia grave.</li>
      </ul>

      <h4>2. Teste de Schiller (Aplicação da Solução Aquosa de Lugol a 2%):</h4>
      <p>A solução de Lugol (iodo) fundamenta-se na afinidade do iodo pelo <strong>glicogênio citoplasmático</strong> presente nas células escamosas maduras diferenciadas da ectocérvice:</p>
      <ul>
        <li><strong>Epitélio Normal (Iodopositivo / Schiller Negativo):</strong> As células escamosas maduras ricas em glicogênio absorvem o iodo e adquirem uma coloração <strong>castanho-escura homogênea (preto-mogno)</strong>. O teste de Schiller é dito <em>negativo</em> porque o tecido é saudável;</li>
        <li><strong>Epitélio Neoplásico / Atípico (Iodonegativo / Schiller Positivo):</strong> As células displásicas da NIC II/III e do câncer invasor encontram-se desdiferenciadas, imaturas e em intensa proliferação mitótica, carecendo de glicogênio citoplasmático. Não fixam o iodo e destacam-se como uma <strong>área amarelo-clara brilhante ou cor de mostarda</strong>. O teste de Schiller é dito <em>positivo</em> para lesão.</li>
      </ul>

      <h3>Achados Colposcópicos Anormais Menores e Maiores (Classificação IFCPC)</h3>
      <table class="book-table">
        <thead>
          <tr>
            <th>Categoria Colposcópica</th>
            <th>Achados Morfológicos e Vasculares</th>
            <th>Correlação Histopatológica Habitual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Achados Anormais Menores (Grau 1)</strong></td>
            <td>
              • Epitélio acetobranco fino e translúcido, de surgimento lento e desaparecimento rápido;<br>
              • Bordas geográficas ou irregulares tênues;<br>
              • Pontilhado fino e mosaico fino (vasos capilares finos e homogêneos, uniformemente espaçados).
            </td>
            <td>Metaplasia escamosa imatura, cervicite inflamatória ou Neoplasia Intraepitelial Cervical de Baixo Grau (NIC I).</td>
          </tr>
          <tr>
            <td><strong>Achados Anormais Maiores (Grau 2)</strong></td>
            <td>
              • Epitélio acetobranco denso, opaco ("giz" ou "madrepérola"), de rápido aparecimento e lenta regressão;<br>
              • Bordas demarcadas e nítidas com elevação da superfície;<br>
              • <strong>Pontilhado grosseiro</strong> (alças capilares calibrosas e dilatadas);<br>
              • <strong>Mosaico grosseiro</strong> (blocos de epitélio separados por vasos dilatados exuberantes);<br>
              • Sinal da borda interna (inner border sign: lesão de alto grau no interior de área acetobranca tênue);<br>
              • Sinal da crista (ridge sign: epitélio espesso proeminente na JEC).
            </td>
            <td>Neoplasia Intraepitelial Cervical de Alto Grau (<strong>NIC II e NIC III / Carcinoma in situ</strong>). Indicação formal de biópsia dirigida ou excisão imediata.</td>
          </tr>
          <tr>
            <td><strong>Suspeita de Invasão Neoplásica</strong></td>
            <td>
              • <strong>Vasos atípicos</strong> (vasos tortuosos, em saca-rolhas, em grampo ou vírgula, com curso bizarro e calibres anárquicos);<br>
              • Superfície tumoral irregular nodular, friabilidade exuberante com sangramento ao toque, ulceração e necrose.
            </td>
            <td><strong>Carcinoma Invasor do Colo Uterino</strong>. Contraindica procedimentos ambulatoriais de conização CAF; exige biópsia profunda para estadiamento oncológico formal.</td>
          </tr>
        </tbody>
      </table>
    `
  }
];
