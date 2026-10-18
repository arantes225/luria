// scripts/builders/colo-data-part5.mjs

export const secColo5 = [
  {
    id: 'quimiorradioterapia-e-tratamento-avancado-cervical',
    title: '11. Manejo do Câncer Cervical Localmente Avançado e Metastático: Quimiorradioterapia Concomitante, Braquiterapia e Imunoterapia',
    body_html: `
      <h3>O Papel Central da Quimiorradioterapia Concomitante Definitiva</h3>
      <p>A partir do estádio IB3 (> 4 cm) e em todos os tumores localmente avançados dos estádios II, III e IVA (com invasão de paramétrios, terço inferior de vagina, parede pélvica, hidronefrose ou invasão vesical/retal), o tratamento de escolha com melhor taxa de sobrevida global não é a cirurgia, mas sim a <strong>Quimiorradioterapia Concomitante Definitiva</strong>:</p>

      <h4>Pilares do Tratamento Quimiorradioterápico Padrão:</h4>
      <ul>
        <li><strong>Teleterapia Externa (Radioterapia Conformada / IMRT):</strong> Irradiação de toda a pelve verdadeira (colo uterino, corpo uterino, paramétrios, terço superior ou total da vagina e cadeias linfonodais pélvicas ilíacas comuns, internas, externas e obturatórias) até a dose total de 45 a 50 Gy fracionada em 25 a 28 sessões diárias;</li>
        <li><strong>Quimioterapia Radiossensibilizante:</strong> Administração semanal de <strong>Cisplatina (40 mg/m² IV)</strong> durante as semanas de teleterapia. A cisplatina atua inibindo os mecanismos celulares de reparo de quebras de fita dupla de DNA induzidas pela radiação ionizante, sinergizando a destruição tumoral;</li>
        <li><strong>Braquiterapia Ginecológica de Alta Taxa de Dose (HDR):</strong> Etapa <em>absolutamente indispensável e insubstituível</em> do tratamento curativo. Consiste na inserção intracavitária de aplicadores (anel e tandem ou cilindros vaginais) diretamente no canal uterino e fundos de saco vaginais, fornecendo doses extremamente altas de radiação (dose biológica equivalente total &ge; 80 a 85 Gy no ponto A) com rápida queda de dose milimétrica, poupando a mucosa sadia da bexiga urinária e do reto anterior;</li>
        <li><strong>Efeitos Adversos e Manejo Clínico:</strong> Retite actínica (sangramento retal, tenesmo), cistite actínica (hematúria, disúria), estenose e encurtamento do canal vaginal com perda de elasticidade (prevenida com uso precoce de dilatadores vaginais de silicone e hidratantes tópicos) e falência ovariana prematura precoce induzida pela radiação pélvica.</li>
      </ul>

      <h3>Avanços na Doença Metastática ou Recidivante (Estádio IVB)</h3>
      <p>Em pacientes que se apresentam com metástases à distância hematogênicas (metástases pulmonares, hepáticas, ósseas ou peritoneais) ou com recidivas pélvicas não passíveis de resgate cirúrgico por exenteração pélvica, o tratamento sistêmico moderno baseia-se em:</p>
      <ul>
        <li><strong>Quimioterapia Combinada Dupla:</strong> Cisplatina (ou Carboplatina) associada a Paclitaxel;</li>
        <li><strong>Terapia Antiangiogênica (Bevacizumabe):</strong> Anticorpo monoclonal anti-VEGF que, adicionado à quimioterapia no estudo pivotal GOG 240, demonstrou ganho estatisticamente significativo de sobrevida global em comparação à quimioterapia isolada;</li>
        <li><strong>Imunoterapia com Inibidores de Checkpoint Imunológico (Pembrolizumabe):</strong> O estudo de fase 3 KEYNOTE-826 demonstrou que a adição de <strong>Pembrolizumabe (anti-PD-1)</strong> à quimioterapia com ou sem bevacizumabe aumentou substancialmente a sobrevida livre de progressão e a sobrevida global em tumores que expressam PD-L1 (com Combined Positive Score - CPS &ge; 1), tornando-se o novo padrão de primeira linha mundial.</li>
      </ul>
    `
  },
  {
    id: 'matriz-sintese-condutas-rastreamento-e-residencia-completa',
    title: '12. Guia de Bolso: Algoritmo Decisório Completo de Rastreamento e Banco Expandido de Provas',
    body_html: `
      <h3>Algoritmo de Rastreamento do Colo Uterino em 4 Perguntas Práticas</h3>
      
      <div class="prescription-box">
        <h4>1. Qual a idade e o histórico prévio da paciente?</h4>
        <p>• Idade < 25 anos: <strong>Não rastrear</strong>. Iniciar somente aos 25 anos;<br>
        • Idade entre 25 e 64 anos com atividade sexual prévia: <strong>Rastrear</strong>. Periodicidade anual e, após 2 normais consecutivos, trienal;<br>
        • Idade &ge; 64 anos: <strong>Interromper</strong> o rastreamento se tiver pelo menos 2 exames negativos nos últimos 5 anos.</p>
      </div>

      <div class="prescription-box">
        <h4>2. Qual é a gravidade da atipia celular no laudo citopatológico?</h4>
        <ul>
          <li><strong>Baixo Risco de Lesão Grave (ASC-US ou LSIL):</strong>
            <ul>
              <li>Se &ge; 30 anos: repetir citopatologia em <strong>6 meses</strong>;</li>
              <li>Se 25 a 29 anos: repetir citopatologia em <strong>12 meses</strong>;</li>
              <li>Se repetir e vier &ge; ASC-US: <strong>Colposcopia</strong>.</li>
            </ul>
          </li>
          <li><strong>Alto Risco Imediato (ASC-H ou HSIL):</strong>
            <ul>
              <li><strong>COLPOSCOPIA IMEDIATA</strong> em todos os casos (&ge; 25 anos). Nunca postergar com repetição de preventivo!</li>
            </ul>
          </li>
          <li><strong>Células Glandulares Atípicas (AGC):</strong>
            <ul>
              <li><strong>COLPOSCOPIA IMEDIATA + Avaliação de Canal Endocervical</strong>;<br>
              • Se &ge; 35 anos ou com sangramento anormal: <strong>Ultrassonografia Transvaginal + Biópsia Endometrial</strong>.</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="prescription-box">
        <h4>3. Como interpretar e conduzir a colposcopia?</h4>
        <p>• ZT tipo 1 e 2: Colposcopia satisfatória / completamente visível;<br>
        • ZT tipo 3: Colposcopia insatisfatória / limite endocervical não visível (exige amostragem do canal);<br>
        • Ácido Acético: induz epitélio acetobranco por coagulação de proteínas nucleares;<br>
        • Teste de Schiller (Lugol): Iodopositivo = Schiller Negativo (tecido normal rico em glicogênio); Iodonegativo = <strong>Schiller Positivo</strong> (tecido displásico sem glicogênio);<br>
        • Achados anormais maiores (pontilhado grosseiro, mosaico grosseiro, acetobranquidão densa): indicam <strong>biópsia dirigida</strong> ou conização.</p>
      </div>

      <h3>Banco Avançado de Questões de Provas de Residência Médica Comentadas</h3>

      <h4>Questão 4 (UNIFESP / Residência Médica):</h4>
      <p><em>Enunciado:</em> Paciente de 28 anos, comparece ao ambulatório da UBS trazendo resultado de preventivo coletado há 2 meses com laudo citopatológico de "Lesão intraepitelial escamosa de baixo grau (LSIL)". A paciente está assustada e solicita a realização imediata de conização do colo uterino. Não apresenta queixas e o exame físico especular mostra ectocérvice sem lesões vegetantes. Assinale a orientação e conduta corretas segundo o Ministério da Saúde:</p>
      <ul>
        <li>A) Indicar colposcopia com biópsia e, se confirmado NIC I, proceder à conização ambulatorial.</li>
        <li>B) Repetir o exame citopatológico na própria UBS em 12 meses, tranquilizando a paciente sobre a alta taxa de regressão espontânea da lesão.</li>
        <li>C) Repetir o exame citopatológico em 6 meses, devido ao risco elevado de progressão para câncer invasor.</li>
        <li>D) Solicitar ressonância magnética da pelve para avaliação de invasão estromal oculta.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário detalhado:</em> Nas mulheres na faixa etária de <strong>25 a 29 anos</strong> com laudo citopatológico de <strong>LSIL (ou ASC-US)</strong>, a conduta ministerial recomendada é a <strong>repetição do exame citopatológico em 12 meses</strong>. O sistema imune de mulheres jovens nessa faixa promove o clareamento espontâneo do HPV e a regressão da NIC I em mais de 80% dos casos. A conização é totalmente contraindicada no baixo grau, pois não altera a sobrevida e acrescenta riscos de estenose cervical e partos prematuros futuros.</p>

      <h4>Questão 5 (Hospital das Clínicas da USP / HCFMUSP):</h4>
      <p><em>Enunciado:</em> Mulher de 58 anos, na menopausa há 8 anos sem uso de terapia hormonal, comparece à consulta com laudo de citopatologia cervical revelando "Células escamosas atípicas de significado indeterminado, não sendo possível excluir lesão intraepitelial de alto grau (ASC-H)". O ginecologista encaminha a paciente para colposcopia. Ao exame colposcópico, a junção escamocolunar (JEC) adentra profundamente o orifício externo do colo e seu limite superior não pode ser visualizado, mesmo com uso de espéculo endocervical de Kogan. O ectocolo apresenta-se pálido, com teste de Schiller homogêneo. Diante desse quadro de Zona de Transformação Tipo 3 e colposcopia insatisfatória, qual a melhor conduta diagnóstica subsequente?</p>
      <ul>
        <li>A) Dar alta à paciente com orientação de retorno em 3 anos, pois o ectocolo não tem lesões acetobrancas.</li>
        <li>B) Realizar avaliação do canal endocervical por meio de escovado endocervical ou curetagem endocervical ou conização diagnóstica a frio.</li>
        <li>C) Prescrever estrogênio oral por 3 anos consecutivos e repetir preventivo.</li>
        <li>D) Realizar histerectomia radical com linfadenectomia de emergência.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário detalhado:</em> O laudo prévio é de <strong>ASC-H</strong> (alto risco de NIC II/III latente) e a colposcopia revelou <strong>Zona de Transformação Tipo 3 (colposcopia insatisfatória)</strong>, na qual a lesão pode estar alojada no canal endocervical, oculta da visão colposcópica. É erro grave assumir que o exame é normal apenas porque a ectocérvice não tem lesão. É mandatório investigar o canal endocervical através de escovado/curetagem endocervical ou proceder diretamente à <strong>conização diagnóstica a frio</strong> para amostragem histológica adequada do canal.</p>

      <h4>Questão 6 (Secretaria Estadual de Saúde do RJ / SES-RJ):</h4>
      <p><em>Enunciado:</em> Mulher de 42 anos, submetida a conização com alça diatérmica (CAF) por NIC III, recebe o laudo histopatológico definitivo com a seguinte descrição: "Neoplasia intraepitelial cervical grau III com margem ectocervical livre de lesão e margem endocervical com presença focal de NIC III. Ausência de invasão estromal ou microinvasão." Em consulta pós-operatória de revisão, assinale a conduta recomendada para esta paciente:</p>
      <ul>
        <li>A) Histerectomia total abdominal imediata com ooforectomia bilateral.</li>
        <li>B) Radioterapia pélvica complementar com braquiterapia.</li>
        <li>C) Seguimento rigoroso com exame citopatológico e colposcopia com avaliação de canal endocervical aos 6 meses.</li>
        <li>D) Quimioterapia com cisplatina semanal por 6 semanas.</li>
      </ul>
      <p><strong>Gabarito: C.</strong> <em>Comentário detalhado:</em> O achado de margem endocervical comprometida por NIC III sem invasão não é indicação mandatória nem imediata de histerectomia. O próprio processo de cicatrização e hemostasia por eletrocoagulação no leito da conização frequentemente erradica os restos celulares residuais. A conduta preconizada é o <strong>seguimento semestral aos 6 meses com colposcopia, citopatologia e avaliação endocervical</strong>. A reconização ou histerectomia só será considerada se for comprovada a persistência de lesão de alto grau no seguimento ou na presença de outras patologias ginecológicas coexistentes.</p>
    `
  }
];
