// scripts/builders/colo-data-part3.mjs

export const secColo3 = [
  {
    id: 'biopsia-conizacao-caf-ezpec-e-cone-a-frio',
    title: '5. Diagnóstico Histopatológico e Tratamento Excisional: Biópsia Dirigida, CAF/EZPEC vs Cone a Frio',
    body_html: `
      <h3>O Padrão-Ouro Diagnóstico: Biópsia Dirigida por Colposcopia</h3>
      <p>A citopatologia é exclusivamente um método de <em>rastreamento populacional</em>, enquanto a colposcopia é um método de <em>localização topográfica</em>. O diagnóstico definitivo de confirmação de uma lesão intraepitelial cervical (NIC I, NIC II ou NIC III) e a exclusão cabal de microinvasão estromal exigem <strong>exame histopatológico formal obtido por biópsia dirigida</strong> das áreas com achados colposcópicos mais graves (utilizando pinça de Gaylor-Medina ou Tischler-Morgan).</p>

      <h3>Manejo Clínico Estratificado por Histopatologia (NIC I vs NIC II vs NIC III)</h3>
      <ul>
        <li><strong>NIC I (Lesão Intraepitelial de Baixo Grau Histológica):</strong>
          <ul>
            <li>Acompanhamento clínico expectante com citopatologia e colposcopia semestral por até 2 anos;</li>
            <li>A taxa de regressão espontânea sem intervenção em mulheres jovens atinge 60% a 80%. A destruição destrutiva/ablativa só é indicada se a lesão persistir por mais de 24 meses em mulher com prole definida ou sob forte angústia;</li>
          </ul>
        </li>
        <li><strong>NIC II e NIC III (Lesão Intraepitelial de Alto Grau / Carcinoma in Situ Histológico):</strong>
          <ul>
            <li>Exigem <strong>tratamento ativo de erradicação</strong> pelo risco significativo de progressão para carcinoma invasor (o risco cumulativo de invasão na NIC III não tratada varia de 30% a 50% em 10 a 20 anos);</li>
            <li>O tratamento de escolha é o <strong>procedimento excisional da zona de transformação</strong>, preferencialmente por métodos conservadores que preservem o órgão e a função reprodutiva.</li>
          </ul>
        </li>
      </ul>

      <h3>Modalidades Excisionais: CAF (EZPEC / LEEP) vs Conização a Frio</h3>
      <p>A seleção da técnica cirúrgica para a retirada da lesão depende criticamente do tipo de Zona de Transformação (ZT), da extensão endocervical e da suspeita clínica de invasão:</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Procedimento Cirúrgico</th>
            <th>Indicações Principais</th>
            <th>Vantagens e Ambiente</th>
            <th>Desvantagens e Limitações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cirurgia de Alta Frequência (CAF / EZPEC / LEEP / Excisão da ZT com Alça Diatérmica)</strong></td>
            <td>
              • NIC II e NIC III com ZT Tipo 1 ou Tipo 2 totalmente visíveis;<br>
              • Método "Ver e Tratar" em mulher &ge; 25 anos com suspeita citológica de HSIL e achado colposcópico maior coincidente ectocervical;<br>
              • Lesões restritas ao ectocolo sem invasão estromal suspeita.
            </td>
            <td>
              • Realizado em nível ambulatorial sob anestesia local com vasoconstritor;<br>
              • Baixo custo, rapidez, excelente hemostasia por eletrocoagulação imediata;<br>
              • Menor taxa de complicações obstétricas futuras (menor índice de estenose cervical e prematuridade).
            </td>
            <td>
              • Pode causar artefatos térmicos nas margens da peça cirúrgica se a velocidade de passagem da alça for inadequada;<br>
              • Inadequado para lesões que se aprofundam profundamente pelo canal endocervical (ZT 3).
            </td>
          </tr>
          <tr>
            <td><strong>Conização a Frio Clássica (Bisturi de Lâmina Fria)</strong></td>
            <td>
              • Lesões de alto grau com <strong>Zona de Transformação Tipo 3</strong> (que adentram o canal endocervical sem limite superior visível);<br>
              • Suspeita histológica ou citológica de <strong>microinvasão</strong> estromal (estadiamento preciso da profundidade de invasão);<br>
              • Citologia compatível com <strong>AGC (células glandulares atípicas)</strong> ou suspeita de adenocarcinoma <em>in situ</em> (AIS);<br>
              • Discrepância citológica/colposcópica persistente (citologia repetida de alto grau com colposcopia negativa ou insatisfatória).
            </td>
            <td>
              • <strong>Ausência completa de artefato térmico</strong> nas margens cirúrgicas da peça, permitindo avaliação histopatológica perfeita do estroma e das margens endocervical e ectocervical.
            </td>
            <td>
              • Exige ambiente de centro cirúrgico sob anestesia regional (bloqueio raquidiano) ou geral;<br>
              • Maior risco de sangramento intra e pós-operatório (exige suturas hemostáticas como a manobra de Sturmdorf);<br>
              • Maior taxa de sequelas tardias: estenose cicatricial do canal cervical e risco aumentado de incompetência istmocervical e parto prematuro em gestações subsequentes.
            </td>
          </tr>
        </tbody>
      </table>

      <div class="clinical-box">
        <h4>Conduta Perante as Margens Cirúrgicas Comprometidas</h4>
        <p>Após a conização (CAF ou cone a frio), a análise histopatológica do espécime cirúrgico define os passos seguintes:</p>
        <ul>
          <li><strong>Margens Livres:</strong> Seguimento citológico e colposcópico aos 6 e 12 meses. Se ambos normais, retorno à rotina periódica;</li>
          <li><strong>Margem Ectocervical Comprometida por NIC II/III:</strong> Não exige reconização imediata na grande maioria dos casos. Realiza-se controle colposcópico rigoroso aos 6 meses, pois a taxa de cura com reepitelização atinge mais de 80%;</li>
          <li><strong>Margem Endocervical Comprometida por NIC II/III:</strong> Maior risco de doença residual no canal. Em mulheres na pós-menopausa ou com prole constituída, pode-se indicar <em>reconização</em> ou histerectomia se houver outras indicações ginecológicas. Em mulheres jovens que desejam gestar, pode-se realizar seguimento citológico e escovado endocervical semestral rigoroso;</li>
          <li><strong>Presença de Carcinoma Invasor na Peça:</strong> Encaminhamento oncológico imediato para estadiamento cirúrgico formal de acordo com a profundidade de invasão (FIGO 2018/2026).</li>
        </ul>
      </div>
    `
  },
  {
    id: 'vacina-hpv-pni-e-prevencao-primaria',
    title: '6. Vacinação contra o HPV no PNI: Esquemas, Eficácia e Prevenção Primária',
    body_html: `
      <h3>O Programa Nacional de Imunizações (PNI) e a Atualização para Dose Única</h3>
      <p>A vacinação contra o HPV constitui a estratégia de <strong>prevenção primária mais custo-efetiva e impactante</strong> na erradicação global do câncer do colo do útero. No Brasil, o Ministério da Saúde disponibiliza a <strong>Vacina HPV Quadrivalente Recombinante</strong> (que confere proteção contra os tipos de alto risco <strong>16 e 18</strong> e contra os tipos de baixo risco <strong>6 e 11</strong>):</p>

      <div class="prescription-box">
        <h4>Esquema Vacinal Atualizado no PNI do Ministério da Saúde:</h4>
        <ul>
          <li><strong>População-Alvo Geral:</strong> Meninas e meninos na faixa etária de <strong>9 a 14 anos</strong> (14 anos, 11 meses e 29 dias);</li>
          <li><strong>Esquema Posológico Recomendado:</strong> Adoção do esquema de <strong>DOSE ÚNICA (0,5 mL intramuscular)</strong>. Estudos observacionais e ensaios clínicos internacionais de longo prazo demonstraram que uma única dose da vacina profilática induz resposta imunológica robusta e sustentada, não inferior ao esquema anterior de duas doses para prevenção da infecção persistente e lesões pré-cancerosas nessa faixa etária imatura;</li>
          <li><strong>Pessoas com Imunossupressão (Vivendo com HIV/AIDS, Transplantados de Órgãos Sólidos e Medula Óssea, Pacientes Oncológicos em Quimioterapia):</strong> Faixa etária estendida de <strong>9 a 45 anos de idade</strong>. O esquema posológico para imunossuprimidos permanece rigorosamente com <strong>TRÊS DOSES (0, 2 e 6 meses)</strong>, independentemente da idade;</li>
          <li><strong>Vítimas de Violência Sexual:</strong> Mulheres e homens de 9 a 45 anos que sofreram violência sexual e não foram previamente vacinados têm direito ao esquema de 3 doses gratuitas no SUS.</li>
        </ul>
      </div>

      <div class="note-box">
        <h4>A Vacina HPV Nonavalente (Gardasil 9) na Rede Privada</h4>
        <p>A vacina nonavalente expande a cobertura profilática ao adicionar proteção contra mais 5 tipos oncogênicos adicionais (tipos 31, 33, 45, 52 e 58), elevando a proteção teórica contra carcinomas cervicais invasores de 70% para mais de 90%. Aprovada para indivíduos de 9 a 45 anos, pode ser administrada em esquema de duas doses (0 e 6 meses) entre 9 e 14 anos ou em três doses (0, 2 e 6 meses) a partir dos 15 anos.</p>
      </div>

      <div class="danger-box">
        <h4>Regra Áurea de Saúde Coletiva para Provas de Concurso</h4>
        <p><strong>A vacinação contra o HPV NÃO substitui nem elimina a necessidade do rastreamento citopatológico periódico!</strong> As mulheres vacinadas na adolescência <strong>devem realizar exatamente o mesmo protocolo de rastreamento com Papanicolau dos 25 aos 64 anos</strong>, uma vez que a vacina quadrivalente não confere proteção cruzada total contra os demais 30% dos tipos de HPV oncogênicos (como 31, 33, 45, 52 e 58) e muitas mulheres já haviam sido expostas previamente ao vírus antes da imunização.</p>
      </div>
    `
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas-colo',
    title: '7. Casos Clínicos Estruturados e Questões de Provas de Residência Médica Comentadas',
    body_html: `
      <h3>Caso Clínico 1: Conduta no ASC-US Conforme a Faixa Etária</h3>
      <p><strong>Enunciado:</strong> Duas pacientes comparecem à Unidade Básica de Saúde para receber os resultados de seus exames preventivos de rotina (Papanicolau):<br>
      • <em>Paciente A:</em> 26 anos, nuligesta, sem queixas ginecológicas. Laudo citopatológico: "Atipias de células escamosas de significado indeterminado, possivelmente não neoplásicas (ASC-US)". Microbiologia: bacilos de Döderlein normais.<br>
      • <em>Paciente B:</em> 38 anos, multípara (G2P2), assintomática. Laudo citopatológico: "Atipias de células escamosas de significado indeterminado, possivelmente não neoplásicas (ASC-US)". Colo uterino macroscopicamente normal ao exame especular.<br>
      Qual é a conduta preconizada pelas Diretrizes Brasileiras do Ministério da Saúde / INCA para cada uma das pacientes?</p>
      <p><strong>Discussão e Conduta:</strong> O manejo do ASC-US é rigidamente estratificado pelo limiar dos 30 anos de idade:<br>
      1. Para a <strong>Paciente A (26 anos)</strong>, que se encontra na faixa de 25 a 29 anos, a conduta correta é <strong>repetir a citopatologia em 12 meses</strong> na própria UBS. Nessa faixa etária, a prevalência de alterações reativas transitórias é altíssima e o tempo para progressão neoplásica é longo, sendo desnecessário e prejudicial antecipar exames invasivos;<br>
      2. Para a <strong>Paciente B (38 anos)</strong>, que tem &ge; 30 anos de idade, o risco de lesão precursora persistente é comparativamente maior; logo, a conduta é <strong>repetir a citopatologia em 6 meses</strong>. Caso qualquer uma das pacientes apresente novo exame com resultado alterado (&ge; ASC-US) na repetição, deverá ser encaminhada para colposcopia imediata.</p>

      <h3>Caso Clínico 2: A Armadilha do Laudo de Células Glandulares Atípicas (AGC)</h3>
      <p><strong>Enunciado:</strong> Mulher de 44 anos, usuária de laqueadura tubária há 10 anos, comparece ao ambulatório com resultado de citopatologia cervical revelando "Células Glandulares Atípicas de Significado Indeterminado, não sendo possível excluir lesão neoplásica (AGC)". Ao exame especular: colo epitelizado sem lesões vegetantes ou ulceradas, com muco claro no orifício externo. Toque bimanual sem massas ou dores anexiais. Qual deve ser o plano propedêutico imediato?</p>
      <p><strong>Discussão e Conduta:</strong> O laudo de AGC (antigo AGUS) é de alto risco oncogênico, pois pode se originar tanto do epitélio glandular da endocérvice (adenocarcinoma <em>in situ</em> ou invasor de colo) quanto do revestimento endometrial (adenocarcinoma de endométrio) ou até tubário/ovariano. A conduta imediata para esta paciente envolve:
      (1) <strong>Colposcopia imediata com avaliação minuciosa do canal endocervical</strong> (por escovado ou curetagem endocervical); 
      (2) Como a paciente possui <strong>mais de 35 anos de idade (44 anos)</strong>, é mandatório realizar também <strong>avaliação endometrial completa</strong> com Ultrassonografia Transvaginal e Biópsia de Endométrio (por histeroscopia com biópsia dirigida ou cureta de Pipelle), a fim de excluir neoplasia endometrial oculta.</p>

      <h3>Questões Comentadas de Provas de Residência Médica</h3>

      <h4>Questão 1 (USP-SP / Residência Médica):</h4>
      <p><em>Enunciado:</em> Mulher de 23 anos, sexualmente ativa desde os 17 anos, realizou exame citopatológico do colo uterino por solicitação em consulta médica geral, com resultado revelando "Lesão intraepitelial escamosa de baixo grau (LSIL)". O colo não apresenta alterações ao exame com espéculo. De acordo com as Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero do Ministério da Saúde / INCA, a conduta correta é:</p>
      <ul>
        <li>A) Encaminhar imediatamente para colposcopia com biópsia dirigida.</li>
        <li>B) Repetir o exame citopatológico em 6 meses.</li>
        <li>C) Realizar conização com alça diatérmica (CAF) ambulatorial.</li>
        <li>D) Orientar a paciente que o rastreamento deve ser iniciado apenas aos 25 anos, agendando novo preventivo para quando atingir essa idade.</li>
      </ul>
      <p><strong>Gabarito: D.</strong> <em>Comentário:</em> Segundo as diretrizes oficiais do INCA/MS, a faixa etária para início do rastreamento é aos <strong>25 anos</strong>. Mulheres com menos de 25 anos não devem realizar preventivo, pois a prevalência de infecção por HPV e lesões de baixo grau (LSIL/NIC I) é altíssima e mais de 90% dos casos regridem espontaneamente. Quando o exame é coletado de forma inadvertida e resulta em LSIL ou ASC-US em mulher < 25 anos, a recomendação é <strong>não intervir e manter a rotina a partir dos 25 anos</strong>, evitando iatrogenias e intervenções excisionais que causam sequelas no colo uterino.</p>

      <h4>Questão 2 (ENARE / Residência Médica):</h4>
      <p><em>Enunciado:</em> Paciente de 34 anos comparece à UBS trazendo laudo de preventivo com "Atipias de células escamosas não sendo possível afastar lesão de alto grau (ASC-H)". Assinale a conduta recomendada:</p>
      <ul>
        <li>A) Repetir a citopatologia em 6 meses na UBS.</li>
        <li>B) Repetir a citopatologia em 12 meses na UBS.</li>
        <li>C) Encaminhar para colposcopia imediata.</li>
        <li>D) Prescrever creme vaginal de estriol e repetir a citologia em 3 meses.</li>
      </ul>
      <p><strong>Gabarito: C.</strong> <em>Comentário:</em> O laudo citológico de <strong>ASC-H</strong> nunca deve ser apenas acompanhado com repetição citológica. O ASC-H carrega uma probabilidade considerável (30% a 50%) de abrigar uma lesão intraepitelial de alto grau (NIC II ou NIC III) subjacente na Zona de Transformação. Portanto, a conduta mandatória e imediata para ASC-H, independentemente da idade (desde que &ge; 25 anos), é o <strong>encaminhamento imediato para colposcopia</strong> com biópsia dirigida das áreas atípicas.</p>

      <h4>Questão 3 (Revalida INEP):</h4>
      <p><em>Enunciado:</em> Durante o exame colposcópico de uma paciente de 31 anos com resultado prévio de HSIL no preventivo, o ginecologista aplica ácido acético a 5% no colo uterino e observa o surgimento rápido de uma área densamente acetobranca, espessa e com bordas nítidas na zona de transformação ectocervical, acompanhada de pontilhado grosseiro e mosaico grosseiro. A JEC é inteiramente visível na ectocérvice (ZT Tipo 1). A aplicação da solução de Lugol revela que essa mesma área é iodonegativa (cor amarelo-mostarda). Sobre este exame, é correto afirmar:</p>
      <ul>
        <li>A) Os achados colposcópicos descritos correspondem a achados anormais menores (grau 1).</li>
        <li>B) A área iodonegativa ao lugol indica teste de Schiller positivo, compatível com células atípicas desprovidas de glicogênio.</li>
        <li>C) A paciente apresenta teste de Schiller negativo, descartando a necessidade de biópsia.</li>
        <li>D) A presença de pontilhado grosseiro indica obrigatoriamente adenocarcinoma metastático.</li>
      </ul>
      <p><strong>Gabarito: B.</strong> <em>Comentário:</em> A solução de Lugol impregna o glicogênio citoplasmático das células maduras escamosas normais (iodopositivas = Schiller negativo). Células displásicas desdiferenciadas de alto grau perdem o glicogênio e não se coram pelo iodo (iodonegativas = <strong>Schiller positivo</strong>). Ademais, epitélio acetobranco denso, pontilhado grosseiro e mosaico grosseiro são classificados como <strong>achados anormais maiores (grau 2)</strong> da colposcopia, altamente correlacionados com NIC II e NIC III.</p>
    `
  }
];
