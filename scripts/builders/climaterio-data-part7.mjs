// scripts/builders/climaterio-data-part7.mjs

export const secClimaterio7 = [
  {
    id: 'matriz-diferencial-e-banco-questoes-residencia-th',
    title: '15. Matriz Comparativa Definitiva e Banco de Questões de Alto Rendimento Comentadas',
    body_html: `
      <h3>Matriz de Decisão Clínica Rápida: TH no Climatério</h3>
      <table class="book-table">
        <thead>
          <tr>
            <th>Perfil Clínico da Paciente</th>
            <th>Esquema Recomendado</th>
            <th>Via Preferencial</th>
            <th>Justificativa Fisiológica e Farmacológica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mulher de 49 anos, fogachos intensos, útero intacto, normotensa e não fumante</strong></td>
            <td>17&beta;-Estradiol + Progesterona natural micronizada contínua ou cíclica</td>
            <td>Oral ou Transdérmica</td>
            <td>Dentro da janela (< 60 anos). O progestagênio é obrigatório para evitar hiperplasia endometrial. Ambas as vias são seguras no baixo risco cardiovascular.</td>
          </tr>
          <tr>
            <td><strong>Mulher de 52 anos, fogachos graves, hipertensa, IMC 32 kg/m², triglicerídeos 260 mg/dL, com útero</strong></td>
            <td>17&beta;-Estradiol em gel + Progesterona natural micronizada (ou DIU-LNG)</td>
            <td><strong>Transdérmica Obrigatória</strong></td>
            <td>A via transdérmica não tem primeira passagem hepática, não estimula fatores pró-coagulantes nem PCR-us, e não eleva triglicerídeos. Proteção endometrial assegurada.</td>
          </tr>
          <tr>
            <td><strong>Mulher de 54 anos, histerectomizada por mioma aos 48 anos, sem outras comorbidades</strong></td>
            <td>17&beta;-Estradiol isolado em monoterapia</td>
            <td>Oral ou Transdérmica</td>
            <td>Sem endométrio, não há necessidade de progestagênio. Evita-se o risco progestagênico associado à mama.</td>
          </tr>
          <tr>
            <td><strong>Mulher de 50 anos, histerectomizada por endometriose ovariana e pélvica extensa</strong></td>
            <td>17&beta;-Estradiol + Progestagênio contínuo (ou Tibolona)</td>
            <td>Transdérmica ou Oral</td>
            <td><strong>Exceção crucial:</strong> Necessita de progestagênio mesmo sem útero para prevenir reativação dolorosa ou malignização de focos ectópicos residuais.</td>
          </tr>
          <tr>
            <td><strong>Mulher de 55 anos, história prévia de câncer de mama receptor de estrogênio positivo</strong></td>
            <td><strong>Contraindicação absoluta à TH sistêmica</strong>. Prescrever Venlafaxina (ou Desvenlafaxina/Gabapentina) + Hidratante vaginal local.</td>
            <td>Não hormonal</td>
            <td>Risco de recidiva tumoral. Contraindicadas paroxetina e fluoxetina se a paciente estiver em uso adjuvante de tamoxifeno.</td>
          </tr>
          <tr>
            <td><strong>Mulher de 66 anos, menopausa há 16 anos, assintomática, solicita TH "para proteger o coração e rejuvenescer"</strong></td>
            <td><strong>Contraindicação formal</strong> ao início da TH (fora da janela de oportunidade).</td>
            <td>Não prescrever TH</td>
            <td>Início após 60 anos ou > 10 anos pós-menopausa aumenta o risco de IAM, AVC isquêmico, demência vascular e trombose venosa. Indicar atividade física e controle metabólico.</td>
          </tr>
        </tbody>
      </table>

      <h3>Banco de Questões de Residência Médica Comentadas</h3>

      <h4>Questão 1 (USP-SP / Residência Médica):</h4>
      <p><em>Enunciado:</em> Mulher de 52 anos, com última menstruação há 18 meses, refere ondas de calor recorrentes que atrapalham seu sono e concentração profissional. Não possui histórico de cirurgias prévias. Ao exame físico: PA 110x70 mmHg, IMC 22 kg/m², mamas sem achados anormais, exame ginecológico com colo atrófico e sem sangramento. Mamografia realizada há 2 meses com laudo BI-RADS 2. Não possui fatores de risco cardiovasculares conhecidos. Deseja iniciar terapia hormonal. Assinale a melhor opção terapêutica para esta paciente:</p>
      <ul>
        <li>A) Estrogênio isolado por via oral em baixa dose para evitar sobrecarga hormonal.</li>
        <li>B) Estrogênio transdérmico isolado associado a mamografia semestral.</li>
        <li>C) Estrogênio associado obrigatoriamente a um progestagênio contínuo ou sequencial.</li>
        <li>D) Progestagênio isolado em alta dose por via oral.</li>
      </ul>
      <p><strong>Gabarito: C.</strong> <em>Comentário:</em> A paciente tem 52 anos, menopausa há 18 meses (plenamente dentro da janela de oportunidade), com queixas vasomotoras típicas e sem contraindicações. Como ela tem <strong>útero preservado</strong> (não foi histerectomizada), é uma regra universal da ginecologia a <strong>obrigatoriedade de associar um progestagênio ao estrogênio</strong> para evitar o desenvolvimento de hiperplasia e adenocarcinoma de endométrio. O estrogênio isolado causaria estímulo proliferativo descontrolado no tecido endometrial.</p>

      <h4>Questão 2 (SUS-SP / Residência Médica):</h4>
      <p><em>Enunciado:</em> Mulher de 55 anos, hipertensa em uso de enalapril, diabética tipo 2 compensada e dislipidêmica com triglicerídeos de 290 mg/dL, procura atendimento médico devido a fogachos incapacitantes há 1 ano. Encontra-se na pós-menopausa há 2 anos. Histerectomizada há 5 anos por sangramento uterino anormal secundário a miomatose. Não tem antecedentes oncológicos nem histórico de trombose. Diante das comorbidades metabólicas da paciente, qual a conduta hormonal mais adequada?</p>
      <ul>
        <li>A) Estrogênio conjugado equino 0,625 mg via oral associado a acetato de medroxiprogesterona.</li>
        <li>B) 17&beta;-estradiol transdérmico isolado em monoterapia.</li>
        <li>C) Tibolona oral 2,5 mg ao dia associada a AAS profilático.</li>
        <li>D) A terapia hormonal é contraindicada pelo diabetes e hipertensão; deve usar apenas fitoterápicos.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário:</em> A paciente é histerectomizada por mioma (patologia benigna), logo <strong>não precisa de progestagênio</strong> (elimina-se a alternativa A). Hipertensão e diabetes compensados não são contraindicações à TH; todavia, a presença de hipertrigliceridemia (290 mg/dL), diabetes e hipertensão determina a <strong>escolha mandatória da via transdérmica</strong> para o estrogênio. A via transdérmica contorna a circulação entero-hepática, não piora a resistência à insulina, não eleva os triglicerídeos e não estimula a cascata de coagulação.</p>

      <h4>Questão 3 (ENARE / Exame Nacional de Residência):</h4>
      <p><em>Enunciado:</em> Paciente de 48 anos, portadora de neoplasia maligna de mama tratada cirurgicamente há 2 anos, em uso atual de Tamoxifeno 20 mg/dia, queixa-se de intensos episódios de fogachos e sudorese profusa que comprometem seu sono e vida social. O médico deseja prescrever um inibidor seletivo da recaptação para controle dos sintomas vasomotores. Qual das seguintes drogas NÃO deve ser prescrita devido a interação farmacológica grave com o tamoxifeno?</p>
      <ul>
        <li>A) Venlafaxina.</li>
        <li>B) Paroxetina.</li>
        <li>C) Desvenlafaxina.</li>
        <li>D) Clonidina.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário:</em> O tamoxifeno é uma pró-droga que precisa ser metabolizada no fígado pela enzima <strong>CYP2D6</strong> em seu metabólito ativo mais potente, o endoxifeno. A <strong>Paroxetina</strong> e a <strong>Fluoxetina</strong> são inibidores fortíssimos da CYP2D6. O uso concomitante reduz drasticamente as concentrações séricas de endoxifeno, prejudicando a ação oncológica do tamoxifeno e aumentando o risco de recidiva do câncer de mama. Em usuárias de tamoxifeno, os antidepressivos preferenciais para fogachos são a Venlafaxina, a Desvenlafaxina ou o Citalopram.</p>
    `
  }
];
