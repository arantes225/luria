// scripts/builders/climaterio-data-part1.mjs

export const secClimaterio1 = [
  {
    id: 'resumo-executivo-30-segundos',
    title: 'Em 30 Segundos: Pontos Cruciais para a Prática e Provas',
    body_html: `
      <p>O climatério compreende o período biológico de transição entre a fase reprodutiva da mulher e o término da capacidade reprodutiva, culminando na menopausa. Dominar os critérios diagnósticos, os conceitos do STRAW+10, a janela de oportunidade da terapia hormonal e o manejo não hormonal é essencial:</p>
      <div class="clinical-box">
        <h4>Regras de Ouro do Climatério e Menopausa:</h4>
        <ul>
          <li><strong>Menopausa é Diagnóstico Retrospectivo e Clínico:</strong> Definida após <strong>12 meses consecutivos de amenorreia</strong> em mulheres de meia-idade sem outras causas biológicas ou patológicas evidentes. Não é necessária dosagem rotineira de FSH para firmar o diagnóstico em mulheres com mais de 45 anos com quadro clínico típico;</li>
          <li><strong>Critérios STRAW+10 (Stages of Reproductive Aging Workshop):</strong> Padrão-ouro científico que divide a transição menopáusica em <em>Precoce (-2)</em>, caracterizada por ciclos com variação no intervalo de 7 dias ou mais em relação ao padrão habitual, e <em>Tardia (-1)</em>, definida por intervalo de amenorreia &ge; 60 dias;</li>
          <li><strong>Síndrome Geniturinária da Menopausa (SGM):</strong> Anteriormente chamada de atrofia vulvovaginal. Apresenta ressecamento vaginal, dispareunia, disúria e infecções urinárias de repetição decorrentes da perda de estrogênio. Ao contrário dos fogachos, a SGM é progressiva e <strong>não melhora espontaneamente com o tempo</strong>;</li>
          <li><strong>Janela de Oportunidade da Terapia Hormonal (TH):</strong> O benefício cardiovascular e a segurança da TH concentram-se no início em mulheres com <strong>menos de 60 anos de idade</strong> ou <strong>menos de 10 anos decorridos desde a menopausa</strong>. O início tardio (> 60 anos ou > 10 anos de pós-menopausa) eleva substancialmente o risco de desfechos cardiovasculares adversos (IAM, AVC e tromboembolismo venoso);</li>
          <li><strong>Proteção Endometrial Obrigatória:</strong> Mulheres com útero preservado que utilizam estrogênio sistêmico <strong>devem obrigatoriamente receber progestagênio concomitante</strong> para prevenir hiperplasia e adenocarcinoma de endométrio. Mulheres histerectomizadas devem usar estrogênio isolado;</li>
          <li><strong>Via Transdérmica:</strong> Preferencial em mulheres hipertensas, dislipidêmicas (hipertrigliceridemia), diabéticas, obesas, fumantes ou com alto risco cardiovascular/trombótico, pois não passa pelo metabolismo de primeira passagem hepática e não eleva fatores de coagulação nem proteína C-reativa;</li>
          <li><strong>Contraindicações Absolutas da TH:</strong> Câncer de mama atual ou prévio, neoplasia estrogênio-dependente (câncer de endométrio), sangramento vaginal anormal inexplicado, tromboembolismo venoso (TEV/EP) atual ou prévio, infarto agudo do miocárdio ou AVC prévio/ativo, hepatopatia ativa ou grave, porfiria e meningioma (para progestagênios).</li>
        </ul>
      </div>
    `
  },
  {
    id: 'fisiologia-transicao-straw-esgotamento-folicular',
    title: '1. Fisiologia da Transição Menopáusica e Esgotamento Folicular Ovariano',
    body_html: `
      <h3>O Esgotamento Folicular e a Queda da Reserva Ovariana</h3>
      <p>A vida reprodutiva da mulher é determinada por um patrimônio folicular finito, estabelecido durante a embriogênese intrauterina. Por volta da 20ª semana de gestação, o feto feminino atinge seu pico de aproximadamente 6 a 7 milhões de folículos primordiais. Ao nascimento, esse número declina para 1 a 2 milhões devido a processos intensos de atresia folicular contínua. Na menarca, restam cerca de 300.000 a 400.000 folículos, dos quais apenas cerca de 400 a 500 chegarão à ovulação ao longo de toda a vida fértil.</p>
      
      <p>À medida que a idade materna avança, particularmente a partir dos 37 a 38 anos, observa-se uma aceleração exponencial na taxa de atresia folicular. Os primeiros marcadores bioquímicos a declinarem significativamente são o <strong>Hormônio Antimülleriano (AMH)</strong>, produzido pelas células da granulosa de folículos pré-antrais e antrais pequenos, e a <strong>Inibina B</strong>, produzida na fase folicular precoce. A redução da inibina B diminui o feedback negativo sobre a adenoipófise, resultando em uma elevação seletiva e compensatória do <strong>Hormônio Folículo-Estimulante (FSH)</strong> antes mesmo de qualquer alteração relevante nos níveis séricos de estradiol.</p>

      <div class="note-box">
        <h4>A Paradoja Hormonal da Perimenopausa</h4>
        <p>Durante a transição menopáusica precoce, os níveis de estradiol <em>não caem linearmente</em>. Pelo contrário: estimulados por níveis elevados e pulsáteis de FSH, os folículos remanescentes podem secretar quantidades abundantes de estradiol, provocando picos hiperestrogênicos erráticos e imprevisíveis. Isso explica os episódios frequentes de mastalgia, cólicas, retenção hídrica e sangramento uterino anormal anovulatório (decorrente da proliferação endometrial desordenada sem oposição progesterônica) característicos da perimenopausa.</p>
      </div>

      <h3>Classificação STRAW+10 (Stages of Reproductive Aging Workshop)</h3>
      <p>A classificação internacional STRAW+10 divide a vida reprodutiva e o envelhecimento reprodutivo feminino em três grandes períodos — <em>Reprodutivo</em>, <em>Transição Menopáusica</em> e <em>Pós-menopausa</em> —, englobando sete estágios numerados de -5 a +2, tendo o evento da Menopausa (estágio 0) como marco central de referência.</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Estágio STRAW+10</th>
            <th>Denominação</th>
            <th>Critérios Menstruais Clínicos</th>
            <th>Parâmetros Laboratoriais Característicos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>-3b e -3a</strong></td>
            <td>Fase Reprodutiva Tardia</td>
            <td>Ciclos menstruais regulares, podendo apresentar discreto encurtamento do intervalo (fase folicular mais curta).</td>
            <td>AMH baixo, contagem de folículos antrais (CFA) reduzida; FSH normal ou sutilmente elevado no início do ciclo.</td>
          </tr>
          <tr>
            <td><strong>-2</strong></td>
            <td>Transição Menopáusica Precoce</td>
            <td>Início de irregularidade menstrual com <strong>diferença &ge; 7 dias</strong> na duração de ciclos consecutivos recorrentes.</td>
            <td>FSH variável (frequentemente elevado na fase folicular precoce), AMH e Inibina B muito baixos.</td>
          </tr>
          <tr>
            <td><strong>-1</strong></td>
            <td>Transição Menopáusica Tardia</td>
            <td>Intervalos de amenorreia de <strong>60 dias ou mais</strong> (ciclos anovulatórios prolongados alternados com sangramentos irregulares).</td>
            <td>FSH persistentemente elevado (> 25-30 mUI/mL), estradiol baixo ou com oscilações bruscas. Fogachos frequentes.</td>
          </tr>
          <tr>
            <td><strong>0</strong></td>
            <td>Menopausa (FMP)</td>
            <td>Última menstruação espontânea da vida (reconhecida retrospectivamente após 12 meses de amenorreia).</td>
            <td>Cessação da foliculogênese ovariana e da produção cíclica de estradiol e progesterona.</td>
          </tr>
          <tr>
            <td><strong>+1a / +1b / +1c</strong></td>
            <td>Pós-menopausa Inicial</td>
            <td>Primeiros 5 a 6 anos após a menopausa. Amenorreia definitiva. Sintomas vasomotores atingem o pico de intensidade.</td>
            <td>FSH elevado (> 30-40 mUI/mL), estradiol sérico basal muito baixo (< 20-30 pg/mL). Rápida perda de massa óssea.</td>
          </tr>
          <tr>
            <td><strong>+2</strong></td>
            <td>Pós-menopausa Tardia</td>
            <td>Período que se estende até o final da vida da mulher. Sintomas vasomotores tendem a diminuir; sintomas de SGM aumentam.</td>
            <td>Quiescência ovariana completa. Estrona (sintetizada na gordura periférica por aromatização da androstenediona) torna-se o estrogênio circulante predominante.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: 'diagnostico-clinico-laboratorial-menopausa',
    title: '2. Diagnóstico Clínico da Menopausa e Quando Solicitar Exames',
    body_html: `
      <h3>O Diagnóstico Clínico Retrospectivo</h3>
      <p>Em mulheres com idade superior a 45 anos que apresentam sintomas vasomotores típicos e padrão menstrual compatível (amenorreia persistente há 12 meses consecutivos), o diagnóstico de menopausa é <strong>puramente clínico</strong>. Nenhuma dosagem hormonal (FSH, estradiol, LH ou progesterona) é necessária para confirmar o diagnóstico ou para autorizar o início da terapia hormonal quando indicada.</p>

      <div class="warning-box">
        <h4>Por que Evitar a Dosagem Rotineira de FSH em Mulheres > 45 Anos?</h4>
        <p>Durante a transição menopáusica, os níveis séricos de gonadotrofinas (FSH e LH) flutuam intensamente de uma semana para a outra. Um valor isolado de FSH dentro da faixa reprodutiva pode induzir a falso julgamento de fertilidade ou afastar equivocadamente a perimenopausa, enquanto um valor muito alto não descarta episódios ovulatórios tardios com risco residual de gestação indesejada. Além disso, em mulheres em uso de contraceptivos hormonais combinados, o eixo gonadotrófico encontra-se suprimido, invalidando qualquer interpretação laboratorial de FSH.</p>
      </div>

      <h3>Situações Especiais em que Exames Laboratoriais São Mandatórios</h3>
      <p>A dosagem sérica seriada de FSH (com intervalo de 4 a 6 semanas) e estradiol está formalmente indicada nas seguintes situações clínicas:</p>
      <ul>
        <li><strong>Suspeita de Insuficiência Ovariana Prematura (IOP) / Menopausa Precoce:</strong> Mulheres com idade < 40 anos que desenvolvem amenorreia &ge; 4 meses e sintomas de hipoestrogenismo. O diagnóstico requer dois valores de FSH na faixa da menopausa (> 25 a 40 mUI/mL) colhidos com intervalo mínimo de 4 a 6 semanas;</li>
        <li><strong>Mulheres Histerectomizadas com Ovários Preservados:</strong> A ausência de fluxo menstrual impede a aplicação do critério de 12 meses de amenorreia. A investigação laboratorial com dosagem de FSH e estradiol correlacionada à presença de sintomas clínicos (fogachos, ressecamento vaginal) auxilia no diagnóstico do término da função ovariana;</li>
        <li><strong>Usuárias de Dispositivo Intrauterino liberador de Levonorgestrel (DIU-LNG) ou Progestagênio Isolado:</strong> Frequentemente evoluem com amenorreia secundária ao efeito atrófico local do progestagênio no endométrio. Se apresentarem sintomas vasomotores severos aos 48-52 anos, a dosagem de FSH e estradiol sérico auxilia na distinção entre efeito progestagênico local e falência gonadal;</li>
        <li><strong>Mulheres Submetidas a Procedimentos Cirúrgicos de Ablação Endometrial:</strong> Pacientes sem endométrio funcionante necessitam de avaliação hormonal caso necessitem estratificar o status ovariano.</li>
      </ul>
    `
  }
];
