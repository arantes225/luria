// scripts/builders/climaterio-data-part5.mjs

export const secClimaterio5 = [
  {
    id: 'situacoes-especiais-e-casos-avancados',
    title: '12. Situações Especiais: Miomatose, Endometriose, Tabagismo, Enxaqueca e Doença da Tireoide',
    body_html: `
      <h3>Manejo Clínico Personalizado em Cenários Complexos</h3>
      <p>A prescrição da terapia hormonal da menopausa frequentemente depara-se com comorbidades ginecológicas e clínicas que geram dúvidas frequentes na prática médica:</p>

      <h4>1. Miomatose Uterina Prévia</h4>
      <p>Os leiomiomas uterinos expressam receptores para estrogênio e progesterona e habitualmente sofrem regressão dimensional gradual e progressiva após a menopausa em decorrência do hipoestrogenismo. A terapia hormonal em doses baixas fisiológicas padrão <strong>não é contraindicada</strong> em mulheres com miomas uterinos assintomáticos. No entanto, recomenda-se:</p>
      <ul>
        <li>Monitoramento ultrassonográfico periódico da morfologia uterina;</li>
        <li>Preferência por esquemas com <strong>progesterona micronizada ou DIU-LNG</strong>, que exercem forte efeito atrófico local sobre o miométrio e endométrio;</li>
        <li>Caso ocorra crescimento anormal acelerado de um nódulo na vigência da TH, deve-se suspender o estrogênio e investigar para afastar leiomiossarcoma uterino.</li>
      </ul>

      <h4>2. Antecedente Cirúrgico de Endometriose Profunda</h4>
      <p>Em pacientes que foram submetidas à ooforectomia bilateral e histerectomia por endometriose infiltrativa grave, a conduta hormonal é uma importante <em>exceção à regra geral</em>:</p>
      <div class="warning-box">
        <h4>Atenção: Progestagênio Obrigatório Mesmo Sem Útero na Endometriose</h4>
        <p>A administração de estrogênio isolado pode estimular e reativar implantes remanescentes microscópicos de endometriose presentes no peritônio pélvico, septo retovaginal ou alças intestinais, com risco de dor incapacitante, obstrução ureteral ou transformação maligna em carcinoma endometrioide/células claras de ovário. Portanto, nessas mulheres, <strong>é obrigatório associar um progestagênio protetor contínuo</strong> (ou prescrever Tibolona) mesmo após a histerectomia total.</p>
      </div>

      <h4>3. Tabagismo Ativo</h4>
      <p>O tabagismo altera de maneira profunda a farmacocinética dos hormônios administrados por via oral. Os hidrocarbonetos aromáticos da fumaça do cigarro induzem fortemente as enzimas do citocromo P450 hepático (CYP1A2), acelerando a hidroxilação hepática e a inativação do estradiol oral, ao mesmo tempo em que a nicotina estimula a agregação plaquetária e eleva os níveis séricos de fibrinogênio. Logo, em mulheres fumantes, a <strong>via transdérmica é estritamente mandatória</strong> para contornar a perda de eficácia metabólica e não potencializar o risco trombótico vascular.</p>

      <h4>4. Enxaqueca com e sem Aura no Climatério</h4>
      <p>A enxaqueca com aura durante a menacme constitui contraindicação absoluta para o uso de contraceptivos hormonais combinados em altas doses devido ao risco elevado de AVC isquêmico. No climatério, no entanto, a THM utiliza doses fisiológicas muito inferiores (cerca de 1/4 a 1/6 da dose de um anticoncepcional oral). Recomenda-se:</p>
      <ul>
        <li><strong>Enxaqueca sem aura desencadeada por oscilação hormonal:</strong> A estabilização dos níveis séricos com <strong>17&beta;-estradiol transdérmico contínuo</strong> em gel ou adesivo melhora expressivamente a frequência das crises cefalálgicas, evitando o "gatilho" da queda abrupta de estrogênio;</li>
        <li><strong>Enxaqueca com aura:</strong> A via transdérmica contínua em dose mínima eficaz pode ser utilizada sob vigilância neurológica rigorosa, sendo contraindicada a via oral em qualquer circunstância.</li>
      </ul>

      <h4>5. Doenças da Tireoide e Ajuste da Levotiroxina</h4>
      <p>A administração de <strong>estrogênios por via oral estimula intensamente a síntese hepática da Globulina Ligadora de Tiroxina (TBG)</strong>. Com mais TBG circulante, uma fração maior dos hormônios tireoidianos livres liga-se a essa proteína, resultando em queda transitória da T4 livre circulante e elevação reflexa do TSH. Em pacientes com hipotireoidismo primário estável que iniciam estrogênio oral, é imperativo dosar o TSH 6 a 8 semanas após o início da TH e frequentemente <strong>aumentar a dose da levotiroxina em 15% a 30%</strong>. Esse fenômeno não é observado com o uso de estrogênio transdérmico, que não altera a TBG sérica.</p>
    `
  },
  {
    id: 'guia-pratico-prescricao-seguimento-e-suspensao',
    title: '13. Guia de Bolso: Passo a Passo da Prescrição, Monitoramento e Descontinuação',
    body_html: `
      <h3>Roteiro de Prescrição no Consultório em 5 Passos Estruturados</h3>
      
      <div class="prescription-box">
        <h4>Passo 1: Confirmação da Indicação e Enquadramento na Janela</h4>
        <p>A paciente apresenta sintomas vasomotores moderados/severos com impacto na qualidade de vida, ou prevenção de perda óssea com alto risco de fratura? Idade < 60 anos ou tempo de menopausa < 10 anos? Ausência de contraindicações absolutas?</p>
      </div>

      <div class="prescription-box">
        <h4>Passo 2: Definição da Necessidade de Progestagênio</h4>
        <ul>
          <li><strong>Possui útero:</strong> Necessita obrigatoriamente de progestagênio para proteção endometrial;</li>
          <li><strong>Histerectomizada:</strong> Estrogênio isolado (salvo histórico de endometriose profunda).</li>
        </ul>
      </div>

      <div class="prescription-box">
        <h4>Passo 3: Seleção Criteriosa da Via e dos Fármacos</h4>
        <ul>
          <li><strong>Via Transdérmica (Gel ou Adesivo):</strong> Primeira escolha sempre em hipertensas, fumantes, diabéticas, obesas ou dislipidêmicas. Posologia inicial típica: <em>17&beta;-Estradiol gel 0,06%</em> (1 pump ao dia = 0,75 mg de estradiol) aplicado em pele limpa e seca dos braços, ombros ou abdome (nunca nas mamas);</li>
          <li><strong>Progestagênio:</strong> Primeira escolha: <em>Progesterona natural micronizada</em> 100 mg/dia por via oral contínua (à noite) ou 200 mg/dia por 12 a 14 dias ao mês (regime sequencial), ou <em>Didrogesterona</em> 5 a 10 mg/dia, ou <em>DIU-LNG 52 mg</em>.</li>
        </ul>
      </div>

      <div class="prescription-box">
        <h4>Passo 4: Calendário de Consultas e Monitoramento Clínico</h4>
        <ul>
          <li><strong>Retorno em 6 a 8 semanas:</strong> Avaliar alívio dos sintomas vasomotores, adaptação à via de administração e efeitos colaterais comuns (mastalgia transitória, retenção de líquido, sangramento de escape);</li>
          <li><strong>Avaliação aos 6 e 12 meses:</strong> Aferir pressão arterial, conferir regularidade do sangramento ou presença de amenorreia, e solicitar mamografia de controle anual;</li>
          <li><strong>Sangramento Uterino Inesperado:</strong> Na vigência de regime contínuo, sangramentos escassos (spotting) são toleráveis nos primeiros 6 meses. Sangramentos intensos, com coágulos ou persistentes após 6 meses de uso exigem investigação imediata com ultrassonografia transvaginal e histeroscopia com biópsia.</li>
        </ul>
      </div>

      <div class="prescription-box">
        <h4>Passo 5: Duração da Terapia e Descontinuação Segura</h4>
        <p>As diretrizes internacionais abandonaram o conceito de um prazo arbitrário de término (antigamente estipulado em 5 anos). A continuidade da TH deve ser revisada anualmente, ponderando benefícios e riscos individuais da paciente. Quando a paciente e o médico decidirem pela descontinuação, <strong>recomenda-se o desmame gradual da dose</strong> ao longo de 3 a 6 meses (reduzindo a quantidade de gel ou espaçando as administrações) para minimizar o risco de rebote severo dos sintomas vasomotores.</p>
      </div>
    `
  }
];
