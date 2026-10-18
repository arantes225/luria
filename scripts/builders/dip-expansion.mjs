// scripts/builders/dip-expansion.mjs

export const secDipExpansao = [
  {
    id: 'monif-criterios-hager-detalhados',
    title: '14. Estadiamento Clínico de Monif e Critérios Diagnósticos de Hager Modificados (CDC/MS 2026)',
    body_html: `
      <h3>Critérios Diagnósticos de Hager Modificados: Aplicação Prática Imediata</h3>
      <p>O diagnóstico da Doença Inflamatória Pélvica (DIP) é predominantemente <strong>clínico</strong>. Diante da alta morbidade reprodutiva (infertilidade tubária, gravidez ectópica e dor pélvica crônica), o Ministério da Saúde e o CDC recomendam <em>baixo limiar diagnóstico</em>: em mulheres jovens, sexualmente ativas ou sob risco para IST, a presença dos três critérios maiores na ausência de outra causa evidente já autoriza o início imediato da antibioticoterapia empírica.</p>

      <div class="clinical-box">
        <h4>Critérios Maiores (Mínimos) — Obrigatória a presença dos 3:</h4>
        <ol>
          <li><strong>Dor abdominal inferior / dor no hipogástrio</strong> (geralmente bilateral, de início recente ou piora durante/após a menstruação e relação sexual);</li>
          <li><strong>Dor à palpação anexial</strong> bilateral ou unilateral ao toque bimanual;</li>
          <li><strong>Dor à mobilização do colo uterino</strong> (sinal do frenesi pélvico de Chandelier).</li>
        </ol>
      </div>

      <div class="clinical-box">
        <h4>Critérios Menores (Adicionais) — Aumentam a especificidade diagnóstica:</h4>
        <ul>
          <li>Temperatura axilar > 37,5 °C ou oral > 38,3 °C (febre);</li>
          <li>Secreção endocervical anormal mucopurulenta ou friabilidade cervical excessiva;</li>
          <li>Leucocitose no hemograma (> 10.000/mm³ ou desvio à esquerda);</li>
          <li>Proteína C-Reativa (PCR) ou Velocidade de Hemossedimentação (VHS) elevadas;</li>
          <li>Evidência laboratorial de infecção cervical por <em>Neisseria gonorrhoeae</em> ou <em>Chlamydia trachomatis</em> (por biologia molecular - NAAT / PCR);</li>
          <li>Mais de 5 a 10 leucócitos por campo de grande aumento na bacterioscopia da secreção vaginal ou cervical.</li>
        </ul>
      </div>

      <div class="clinical-box">
        <h4>Critérios Elaborados (Definitivos / Padrão-ouro) — Raramente necessários para início terapêutico:</h4>
        <ul>
          <li><strong>Biópsia endometrial</strong> com evidência histopatológica de endometrite (presença de plasmócitos no estroma endometrial);</li>
          <li><strong>Ultrassonografia transvaginal ou Ressonância Magnética</strong> demonstrando espessamento e dilatação tubária com acúmulo líquido (hidrossalpinge/piossalpinge com sinal da roda dentada), com ou sem líquido livre na pelve, ou imagem complexa compatível com abscesso tubo-ovariano (ATO);</li>
          <li><strong>Laparoscopia diagnóstica</strong> evidenciando hiperemia, edema tubárico, exsudato purulento fimbrial ou pelviperitonite (padrão-ouro clássico, porém reservada para incerteza diagnóstica, abdome agudo cirúrgico ou falha clínica após 72h).</li>
        </ul>
      </div>

      <h3>Classificação e Estadiamento de Monif: Conduta Terapêutica Estratificada</h3>
      <table class="book-table">
        <thead>
          <tr>
            <th>Estágio de Monif</th>
            <th>Quadro Clínico e Comprometimento Anatômico</th>
            <th>Ambiente Terapêutico</th>
            <th>Regime Preferencial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Estágio I</strong></td>
            <td>Endometrite e Salpingite aguda sem peritonite evidente (sem sinais de irritação peritoneal).</td>
            <td>Ambulatorial (desde que tolere via oral e sem critérios de gravidade)</td>
            <td>Ceftriaxona 500 mg IM dose única + Doxiciclina 100 mg VO 12/12h por 14 dias + Metronidazol 500 mg VO 12/12h por 14 dias.</td>
          </tr>
          <tr>
            <td><strong>Estágio II</strong></td>
            <td>Salpingite aguda com peritonite pélvica / irritação peritoneal no hipogástrio (dor à descompressão localizada).</td>
            <td>Hospitalar (Internação recomendada)</td>
            <td>Ceftriaxona 1g IV 1x/dia + Doxiciclina 100 mg VO ou IV 12/12h + Metronidazol 400 mg IV 12/12h (ou Clindamicina 900mg IV 8/8h + Gentamicina).</td>
          </tr>
          <tr>
            <td><strong>Estágio III</strong></td>
            <td>Salpingite aguda com oclusão tubária e formação de <strong>Abscesso Tubo-Ovariano (ATO)</strong> íntegro.</td>
            <td>Hospitalar Obrigatório</td>
            <td>Antibioticoterapia parenteral venosa de amplo espectro com cobertura anaeróbia estrita (Ceftriaxona + Doxi + Metro ou Clinda + Genta). Monitorização ultrassonográfica seriada.</td>
          </tr>
          <tr>
            <td><strong>Estágio IV</strong></td>
            <td>Abscesso Tubo-Ovariano (ATO) <strong>roto</strong> com peritonite generalizada e/ou Choque Séptico.</td>
            <td>Hospitalar / UTI + Centro Cirúrgico</td>
            <td>Emergência cirúrgica imediata (Laparotomia exploradora / Laparoscopia para lavagem peritoneal e salpingo-ooforectomia/drenagem) associada à antibioticoterapia parenteral venosa tripla.</td>
          </tr>
        </tbody>
      </table>

      <h3>Critérios Formais e Absolutos de Internação Hospitalar na DIP</h3>
      <p>A decisão entre tratamento ambulatorial e internação é um ponto crítico de cobrança em provas de residência e no cotidiano dos serviços de emergência ginecológica. Deve-se internar obrigatoriamente a paciente que apresentar:</p>
      <ul>
        <li><strong>Gestação</strong>: risco iminente de abortamento séptico, corioamnionite, parto prematuro e perda gestacional. É proibido o uso de doxiciclina na gravidez;</li>
        <li><strong>Suspeita ou confirmação de Abscesso Tubo-Ovariano (Monif III ou IV)</strong>;</li>
        <li><strong>Incerteza diagnóstica que não exclui emergências cirúrgicas</strong> (ex.: apendicite aguda, torção de anexo, gravidez ectópica);</li>
        <li><strong>Quadro clínico grave</strong>: febre alta (> 38,5 °C), vômitos incoercíveis, prostração, sepse ou sinais de peritonite difusa / abdome agudo perfurativo;</li>
        <li><strong>Falha do tratamento ambulatorial após 48 a 72 horas</strong> de início do esquema oral/intramuscular (piora da dor, persistência da febre ou novos sinais inflamatórios);</li>
        <li><strong>Intolerância ou impossibilidade de uso da via oral</strong> (náuseas/vômitos incoercíveis);</li>
        <li><strong>Má adesão terapêutica previsível</strong> (vulnerabilidade social extrema, adolescentes desacompanhadas, transtornos psiquiátricos descompensados);</li>
        <li><strong>Imunossupressão grave</strong> (infecção por HIV com contagem de LT-CD4+ baixa, transplantadas, uso de imunobiológicos ou quimioterapia).</li>
      </ul>
    `
  },
  {
    id: 'esquemas-terapeuticos-hospitalares-ambulatoriais-pcdt-2026',
    title: '15. Protocolos Terapêuticos Antimicrobianos Atualizados (PCDT IST / MS 2026)',
    body_html: `
      <h3>Tratamento Ambulatorial Recomendado</h3>
      <p>O tratamento ambulatorial deve ser instituído em até 24 a 48 horas da suspeita diagnóstica, sem aguardar resultados de exames de biologia molecular:</p>
      <div class="prescription-box">
        <h4>Esquema Ambulatorial de Primeira Linha (PCDT / MS 2026):</h4>
        <ul>
          <li><strong>Ceftriaxona</strong> 500 mg, via intramuscular (IM), dose única (cobertura bactericida para <em>Neisseria gonorrhoeae</em> resistente a quinolonas e penicilinas); <em>mais</em></li>
          <li><strong>Doxiciclina</strong> 100 mg, via oral (VO), de 12 em 12 horas, por <strong>14 dias</strong> (cobertura para <em>Chlamydia trachomatis</em> e <em>Mycoplasma genitalium</em>); <em>mais</em></li>
          <li><strong>Metronidazol</strong> 500 mg, via oral (VO), de 12 em 12 horas, por <strong>14 dias</strong> (cobertura essencial para anaeróbios estritos da microbiota vaginal alterada e vaginose bacteriana associada).</li>
        </ul>
        <p><em>Nota farmacológica:</em> A adesão aos 14 dias completos de doxiciclina e metronidazol é obrigatória. A paciente deve ser orientada expressamente sobre a abstinência sexual durante o tratamento e o efeito dissulfiram-like do metronidazol com bebidas alcoólicas.</p>
      </div>

      <h3>Tratamento Hospitalar / Parenteral Recomendado</h3>
      <p>Em pacientes internadas, a antibioticoterapia intravenosa deve ser mantida até pelo menos <strong>24 a 48 horas após a melhora clínica substancial</strong> (apirexia sustentada, alívio expressivo da dor e regressão da leucocitose). Após esse período, faz-se a transição para terapia oral até completar os <strong>14 dias</strong> de tratamento total.</p>
      
      <div class="prescription-box">
        <h4>Opção Parenteral 1 (Padrão MS 2026 / Base Cefalosporina):</h4>
        <ul>
          <li><strong>Ceftriaxona</strong> 1 g a 2 g, IV, uma vez ao dia; <em>mais</em></li>
          <li><strong>Doxiciclina</strong> 100 mg, VO ou IV (se disponível), de 12 em 12 horas; <em>mais</em></li>
          <li><strong>Metronidazol</strong> 400 mg a 500 mg, IV, de 12 em 12 horas.</li>
        </ul>
      </div>

      <div class="prescription-box">
        <h4>Opção Parenteral 2 (Padrão Clássico CDC / Especial para Abscesso Tubo-Ovariano e Anaeróbios):</h4>
        <ul>
          <li><strong>Clindamicina</strong> 900 mg, IV, de 8 em 8 horas (excelente penetração tecidual pélvica e ação potente antianaeróbia); <em>mais</em></li>
          <li><strong>Gentamicina</strong>: dose de ataque de 2 mg/kg IV, seguida por dose de manutenção de 1,5 mg/kg IV a cada 8 horas (ou dose diária única de 3 a 5 mg/kg IV em bomba de infusão).</li>
        </ul>
        <p><em>Transição oral:</em> Após desospitalização, completar 14 dias com Doxiciclina 100 mg VO 12/12h associada a Clindamicina 450 mg VO 6/6h ou Metronidazol 500 mg VO 12/12h.</p>
      </div>

      <h3>Manejo de Gestantes com DIP</h3>
      <p>A ocorrência de DIP na gestação é rara devido ao tampão mucoso cervical e obliteração da cavidade uterina após as 12 semanas, ocorrendo quase exclusivamente no primeiro trimestre. Toda gestante com suspeita de DIP <strong>deve ser internada</strong>. A Doxiciclina é estritamente contraindicada pelo risco de toxicidade fetal e coloração dentária. O esquema de escolha baseia-se em <strong>Ceftriaxona 1g IV/dia + Azitromicina 1g VO dose única (repetida após 7 dias) + Metronidazol parenteral</strong>, ou Clindamicina + Gentamicina com rigorosa vigilância materno-fetal.</p>
    `
  },
  {
    id: 'fitz-hugh-curtis-e-abscesso-tubo-ovariano',
    title: '16. Síndrome de Fitz-Hugh-Curtis e Manejo do Abscesso Tubo-Ovariano (ATO)',
    body_html: `
      <h3>Síndrome de Fitz-Hugh-Curtis (Peri-hepatite Associada à DIP)</h3>
      <p>A Síndrome de Fitz-Hugh-Curtis consiste na inflamação da cápsula hepática e do peritônio adjacente no hipocôndrio direito, secundária à disseminação transcelômica (ascendente pela goteira parietocólica direita) ou linfática/hematogênica a partir de foco pélvico de <em>Chlamydia trachomatis</em> (mais frequente) ou <em>Neisseria gonorrhoeae</em>.</p>
      
      <h4>Apresentação Clínica e Diagnóstico Diferencial</h4>
      <ul>
        <li><strong>Quadro típico:</strong> Mulher jovem em idade fértil que apresenta dor pleurítica intensa no hipocôndrio direito, que piora com a inspiração profunda, tosse e movimentação de tronco. Frequentemente há história concomitante ou pregressa recente de corrimento vaginal, disúria ou dor hipogástrica leve/moderada;</li>
        <li><strong>Armadilha diagnóstica em provas:</strong> O quadro mimetiza com perfeição colecistite aguda, pleurite, pneumonia de base direita ou cólica biliar. Entretanto, a ultrassonografia de vias biliares é normal (sem cálculos e sem espessamento da parede vesicular) e as enzimas hepáticas (TGO, TGP, FA e Gama-GT) encontram-se habitualmente normais ou apenas discretamente alteradas;</li>
        <li><strong>Achado Laparoscópico Patognomônico:</strong> Presença de <em>aderências tênues e fibrosas em "corda de violino"</em> (violin-string adhesions) entre a superfície anterior da cápsula de Glisson do fígado e a parede peritoneal abdominal ou diafragmática;</li>
        <li><strong>Tratamento:</strong> Não exige cirurgia hepática. O tratamento clínico padrão para DIP com 14 dias de Ceftriaxona + Doxiciclina + Metronidazol promove resolução completa do processo infeccioso e da dor.</li>
      </ul>

      <h3>Abscesso Tubo-Ovariano (ATO): Conduta Clínica vs Cirúrgica</h3>
      <p>O abscesso tubo-ovariano representa a aglutinação inflamatória da tuba uterina, ovário e, frequentemente, alças intestinais adjacentes, formando uma massa pélvica purulenta multiloculada com alto risco de destruição tecidual.</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Parâmetro</th>
            <th>Tratamento Clínico Inicial</th>
            <th>Indicação de Intervenção Invasiva / Cirúrgica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Critérios Clínicos</strong></td>
            <td>ATO íntegro, estável hemodinamicamente, diâmetro < 8-9 cm, ausência de peritonite difusa.</td>
            <td>ATO roto (emergência cirúrgica imediata), sinais de choque séptico, piora clínica ou febre persistente após 48-72h de antibióticos venosos, ou massa > 9-10 cm de alto risco.</td>
          </tr>
          <tr>
            <td><strong>Abordagem Preferencial</strong></td>
            <td>Internação hospitalar + Antibioticoterapia venosa de amplo espectro (Ceftriaxona + Doxiciclina + Metronidazol ou Clindamicina + Gentamicina). Taxa de sucesso de 70% a 80%.</td>
            <td><strong>1ª escolha:</strong> Drenagem percutânea guiada por ultrassonografia ou tomografia computadorizada (preserva fertilidade e evita laparotomia);<br><strong>2ª escolha / refratariedade:</strong> Laparoscopia ou Laparotomia exploradora conservadora (lavagem, lise de aderências e salpingo-ooforectomia unilateral se necrose).</td>
          </tr>
        </tbody>
      </table>

      <div class="warning-box">
        <h4>Alerta Crítico: Dispositivo Intrauterino (DIU) na DIP</h4>
        <p><strong>Não é obrigatório retirar o DIU imediatamente</strong> no momento do diagnóstico da DIP leve a moderada. O DIU pode ser mantido e o tratamento antimicrobiano iniciado. A remoção do DIU só está formalmente indicada se:
        (1) Falha terapêutica evidente após 48 a 72 horas de antibioticoterapia adequada;
        (2) DIP grave com abscesso tubo-ovariano (Monif III ou IV);
        (3) Desejo expresso da paciente. Quando a remoção for necessária, recomenda-se iniciar os antibióticos antes da extração para prevenir bacteremia.</p>
      </div>
    `
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas-dip',
    title: '17. Casos Clínicos Resolvidos e Questões de Provas de Residência Médica Comentadas',
    body_html: `
      <h3>Caso Clínico 1: A Dor no Hipocôndrio Direito que Confundiu a Emergência</h3>
      <p><strong>Enunciado:</strong> Mulher de 24 anos, nuligesta, usuária de DIU de cobre há 1 ano, procura o pronto-atendimento com dor em pontada no hipocôndrio direito há 4 dias, com piora importante à inspiração profunda. Nega vômitos ou icterícia. Refere que há cerca de 10 dias apresentou corrimento vaginal amarelado e dor em cólica no baixo ventre, sem febre. Ao exame físico: lúcida, orientada, FC 82 bpm, PA 115x75 mmHg, afebril (36,8 °C). Abdome flácido, com dor à palpação do hipocôndrio direito, sinal de Murphy negativo. Ao exame ginecológico: colo com ectopia e secreção mucopurulenta no orifício externo; dor discreta à mobilização do colo e à palpação de anexo direito. Ultrassonografia de abdome superior: fígado e vesícula biliar de aspecto normal, sem cálculos ou dilatação ductal. USG transvaginal: útero normal, DIU tópico em cavidade, discreto espessamento da tuba uterina direita com pequena quantidade de líquido anecóico em fundo de saco posterior.</p>
      <p><strong>Discussão e Conduta:</strong> Trata-se do clássico quadro de <strong>Síndrome de Fitz-Hugh-Curtis</strong> decorrente de DIP não tratada precocemente. A peri-hepatite manifesta-se por dor tipo pleurítica decorrente da inflamação da cápsula hepática por <em>Chlamydia trachomatis</em>. Como a paciente não apresenta critérios de gravidade, tolera a via oral, tem USG sem abscesso tubo-ovariano e apresenta estabilidade hemodinâmica, a conduta correta é o <strong>tratamento ambulatorial da DIP</strong>: Ceftriaxona 500 mg IM em dose única + Doxiciclina 100 mg VO 12/12h por 14 dias + Metronidazol 500 mg VO 12/12h por 14 dias. Não há indicação de retirada imediata do DIU nem de intervenção cirúrgica.</p>

      <h3>Questão Comentada 1: Critérios de Internação (Enare / USP)</h3>
      <p><em>(Banca Examinadora / Residência Médica)</em> Jovem de 19 anos, primigesta com 9 semanas de gestação confirmada por ultrassonografia, comparece à UPA referindo dor em hipogástrio há 3 dias acompanhada de febre medida em 38,2 °C. Ao exame especular: conteúdo vaginal purulento exteriorizando-se pelo canal cervical. Ao toque bimanual: dor intensa à mobilização uterina e à palpação de ambos os anexos, sem massas palpáveis. Diante do quadro clínico apresentado, assinale a melhor conduta terapêutica:</p>
      <ul>
        <li>A) Prescrever Ceftriaxona 500 mg IM dose única + Doxiciclina 100 mg VO 12/12h + Metronidazol 500 mg VO 12/12h por 14 dias e alta com reavaliação em 72h.</li>
        <li>B) Internação hospitalar imediata e início de esquema antimicrobiano parenteral com Ceftriaxona IV associada a Azitromicina e Metronidazol.</li>
        <li>C) Realizar aspiração manual intrauterina (AMIU) para esvaziamento por abortamento infectado.</li>
        <li>D) Prescrever Ciprofloxacino 500 mg VO dose única e Azitromicina 1g VO dose única com seguimento pré-natal.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário detalhado:</em> A gestação é uma indicação <strong>absoluta</strong> de internação hospitalar para tratamento da Doença Inflamatória Pélvica. O tratamento parenteral hospitalar previne complicações obstétricas graves como sepse e perda fetal. Além disso, a alternativa A é incorreta porque a Doxiciclina é contraindicada na gestação (risco de pigmentação dos dentes decíduos e alteração do crescimento ósseo). A alternativa C é errada porque a paciente tem gestação tópica viável sem sangramento ou diagnóstico de abortamento. A alternativa D cita quinolona, que apresenta alta taxa de resistência gonocócica no Brasil e é contraindicada na gravidez.</p>

      <h3>Questão Comentada 2: Conduta no Abscesso Tubo-Ovariano (Revalida / SES-SP)</h3>
      <p><em>(Revalida INEP)</em> Mulher de 32 anos é internada com diagnóstico de Doença Inflamatória Pélvica Monif III. A ultrassonografia transvaginal evidencia formação cística de paredes espessadas e ecogênicas, com debris internos em região anexial esquerda, medindo 5,5 x 4,8 cm, compatível com abscesso tubo-ovariano íntegro. A paciente encontra-se afebril, hemodinamicamente estável, com dor abdominal moderada controlada com analgésicos comuns. Qual é a conduta inicial recomendada?</p>
      <ul>
        <li>A) Laparotomia exploradora de urgência com histerectomia total e anexectomia bilateral.</li>
        <li>B) Internação hospitalar com antibioticoterapia intravenosa de amplo espectro por 48 a 72 horas e acompanhamento clínico rigoroso.</li>
        <li>C) Drenagem cirúrgica imediata por colpotomia posterior no pronto-socorro.</li>
        <li>D) Tratamento ambulatorial com Ceftriaxona 500 mg IM dose única associada a Doxiciclina e Metronidazol por via oral.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário detalhado:</em> No Abscesso Tubo-Ovariano (ATO) íntegro e menor que 8-9 cm em paciente estável, a conduta de primeira linha é <strong>sempre clínica</strong>, com internação e antibioticoterapia venosa potente com cobertura anaeróbia (ex.: Clindamicina + Gentamicina ou Ceftriaxona + Doxiciclina + Metronidazol). Aproximadamente 70% a 80% das pacientes respondem satisfatoriamente sem necessidade de cirurgia, preservando a reserva ovariana e o potencial reprodutivo. A cirurgia de emergência (laparoscopia/laparotomia) é reservada exclusivamente para suspeita de ruptura do abscesso (Monif IV), sepse refratária ou falha evidente do tratamento clínico após 48-72h.</p>
    `
  }
];
