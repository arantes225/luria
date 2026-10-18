// scripts/build-bloco-05-111-part2.mjs
// Aula 111: Doença Renal Crônica (DRC) - Parte 2: Seções 5 a 8 (TRS, Casos Clínicos e Questões Comentadas)

export const sec5 = {
  id: 'terapia-renal-substitutiva-acesso-vascular-preparo',
  title: '5. Modalidades de Terapia Renal Substitutiva (TRS), Planejamento e Preparo do Acesso Vascular',
  body_html: `
<h3>O Momento da Transição: Indicações de Início de Terapia Renal Substitutiva</h3>
<p>O encaminhamento ao nefrologista deve ocorrer obrigatoriamente no <strong>Estágio G4 (TFGe $&lt; 30$ mL/min/1,73 m²)</strong> para orientação educacional, escolha esclarecida da modalidade dialítica pelo paciente e família e confecção atempada do acesso vascular ou implante do cateter peritoneal. O início da TRS geralmente se faz necessário quando a TFGe atinge <strong>5 a 10 mL/min/1,73 m²</strong>, ou antes caso surjam manifestações refratárias da síndrome urêmica (anorexia incoercível, perda ponderal progressiva, hipercalemia incontrolável, sobrecarga volêmica intratável ou pericardite).</p>

<h3>1. Hemodiálise e o Acesso Vascular Definitivo</h3>
<p>A hemodiálise é a modalidade de TRS mais utilizada no Brasil (responsável por mais de 90% dos pacientes em diálise crônica no Censo da Sociedade Brasileira de Nefrologia):</p>
<ul>
  <li><strong>Fístula Arteriovenosa Autóloga (FAV): O Padrão-Ouro Absoluto:</strong>
    <ul>
      <li>Consiste na anastomose cirúrgica direta entre uma artéria e uma veia superficial do membro superior. A alta pressão e fluxo arterial arterializam a parede venosa, tornando-a dilatada, espessada e apta para repetidas punções bi-semanais por agulhas calibrosas (calibres 14G a 16G);</li>
      <li><strong>Hierarquia Anatômica de Confecção (KDIGO / KDOQI):</strong>
        <ol>
          <li><em>Primeira Escolha:</em> <strong>FAV Radiocefálica no punho (Fístula de Brescia-Cimino)</strong> no membro superior não dominante; preserva todo o leito vascular proximal do membro;</li>
          <li><em>Segunda Escolha:</em> <strong>FAV Braquiocefálica na fossa antecubital</strong> (no cotovelo);</li>
          <li><em>Terceira Escolha:</em> <strong>FAV Braquiobasílica com superficialização cirúrgica da veia basílica</strong> no braço;</li>
        </ol>
      </li>
      <li><strong>Tempo de Maturação Obrigatório:</strong> Uma FAV recém-confeccionada necessita de um período mínimo de <strong>6 a 8 semanas (idealmente 8 a 12 semanas)</strong> para maturação clínica e estrutural (regra dos 6: fluxo $> 600$ mL/min, diâmetro venoso $> 6$ mm e profundidade $< 6$ mm da pele) antes de receber a primeira punção. Daí a regra absoluta de confeccioná-la com antecedência quando a TFGe estiver entre 15 e 20 mL/min (Estágio G4);</li>
      <li><strong>Complicações da FAV:</strong> Estenose venosa justa-anastomótica (queda do fluxo e aumento da pressão venosa na diálise), trombose do acesso, pseudoaneurismas por punções repetidas no mesmo ponto e <strong>Síndrome do Roubo Vascular (Steal Syndrome)</strong> — inversão ou desvio do fluxo arterial da mão para a fístula de alto débito, causando dor isquêmica, palidez, cianose e necrose digital na mão ipsilateral durante a diálise;</li>
    </ul>
  </li>
  <li><strong>Prótese Vascular Arteriovenosa de PTFE:</strong> Enxerto protético sintético de politetrafluoroetileno expandido interposto entre artéria e veia. Indicada quando a rede venosa autóloga superficial é precária ou foi destruída por punções prévias repetidas. Desvantagens: menor patência primária a longo prazo e taxas muito mais altas de infecção bacteriana e trombose precoce;</li>
  <li><strong>Cateteres Venosos Centrais de Hemodiálise:</strong>
    <ul>
      <li><em>Cateter de Curta Permanência (Cateter de Shaldon):</em> Temporário (máximo 1 a 2 semanas); uso restrito a emergências agudas ou internação;</li>
      <li><em>Cateter Tunelizado de Longa Permanência com Cuff de Dacron (Cateter de Permcath):</em> Possui um manguito (cuff) subcutâneo de poliéster que induz proliferação fibroblástica dérmica, formando uma barreira física e mecânica que impede a migração bacteriana cutânea para a corrente sanguínea. Indicado em pacientes sem leito vascular periférico ou enquanto se aguarda a maturação de uma FAV. O sítio de escolha é a <strong>Veia Jugular Interna Direita</strong> (a veia subclávia é estritamente contraindicada pelo risco de estenose).</li>
    </ul>
  </li>
</ul>

<h3>2. Diálise Peritoneal (DP)</h3>
<p>Utiliza a membrana peritoneal natural altamente vascularizada como filtro semipermeável. Um cateter de silicone flexível (Cateter de Tenckhoff) é implantado cirurgicamente na cavidade peritoneal com trajeto subcutâneo tunelizado:</p>
<ul>
  <li><strong>Modalidades:</strong> Diálise Peritoneal Ambulatorial Contínua (DPAC - 4 trocas manuais diurnas de bolsa por dia) e Diálise Peritoneal Automatizada (DPA - realizada por uma máquina cicladora durante o sono noturno);</li>
  <li><strong>Vantagens:</strong> Maior preservação da <em>função renal residual (FRR)</em> e do volume de diurese nativa; ausência de necessidade de acesso vascular venoso; maior independência profissional e flexibilidade de viagens; estabilidade hemodinâmica superior em cardiopatas graves;</li>
  <li><strong>Principal Complicação: Peritonite Infecciosa Associada à DP:</strong>
    <ul>
      <li><em>Diagnóstico:</em> Confirmado pela presença de pelo menos dois dos três critérios: 1) Efluente peritoneal turvo; 2) Dor abdominal difusa; 3) Contagem leucocitária no líquido dialítico <strong>$&gt; 100$ leucócitos/mm³ com mais de 50% de polimorfonucleares (neutrófilos)</strong>;</li>
      <li><em>Agentes Etiológicos:</em> Bactérias Gram-positivas da pele por contaminação de toque (<em>Staphylococcus epidermidis</em> e <em>Staphylococcus aureus</em>) respondem por mais de 60% dos casos; bacilos Gram-negativos intestinais (<em>E. coli</em>, <em>Pseudomonas</em>) indicam contaminação entérica ou translocação;</li>
      <li><em>Tratamento:</em> Antibioticoterapia empírica administrada <strong>por via intraperitoneal (adicionada diretamente na bolsa de diálise)</strong> cobrindo Gram-positivos (Vancomicina ou Cefazolina) e Gram-negativos (Ceftazidima ou Aminoglicosídeo).</li>
    </ul>
  </li>
</ul>

<h3>3. Transplante Renal: O Padrão-Ouro em Sobrevida e Qualidade de Vida</h3>
<p>O transplante renal (com doador vivo ou falecido) é a terapia renal substitutiva de escolha definitiva para a maioria dos portadores de DRC em estágio terminal. Oferece <strong>sobrevida significativamente superior</strong> em comparação à permanência crônica em hemodiálise, normaliza a homeostase mineral e endócrina, elimina a anemia e devolve a plenitude social e laborativa ao paciente. O transplante renal <strong>preemptivo</strong> (realizado antes mesmo do paciente iniciar qualquer sessão de hemodiálise, geralmente com TFGe entre 10 e 15 mL/min com doador vivo compatível) é a estratégia que entrega as maiores taxas históricas de sobrevida do enxerto e do receptor.</p>
`
};

export const sec6 = {
  id: 'casos-clinicos-estruturados-drc',
  title: '6. Casos Clínicos Estruturados e Resolução Prática Comentada',
  body_html: `
<h3>Caso Clínico 1: Nefropatia Diabética em Progressão Rápida e Manejo Quádruplo</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 58 anos, bancário aposentado, portador de Diabetes Mellitus tipo 2 há 14 anos e hipertensão arterial de difícil controle há 10 anos. Faz uso diário de Enalapril 20 mg 2x/dia, Amlodipino 10 mg/dia, Metformina 850 mg 2x/dia e Gliclazida MR 60 mg/dia.</p>
  <p><strong>Avaliação Clínica e Física:</strong> Paciente assintomático, sem queixas de edema de membros inferiores ou dispneia. PA em consultório (média de 3 medidas oscilométricas automatizadas): 146/92 mmHg. FC 74 bpm. IMC 31,5 kg/m². Fundo de olho: retinopatia diabética não proliferativa moderada bilateral.</p>
  <p><strong>Exames Laboratoriais Confirmados em 2 Coletas com Intervalo de 90 Dias:</strong></p>
  <ul>
    <li>Creatinina sérica: 1,6 mg/dL (estável em relação a 1,55 mg/dL há 4 meses);</li>
    <li>TFGe calculada pela equação CKD-EPI 2021: <strong>48 mL/min/1,73 m²</strong>;</li>
    <li>Razão Albumina/Creatinina Urinária (RAC) em amostra isolada matinal: <strong>680 mg/g de creatinina</strong>;</li>
    <li>HbA1c: 7,8%; Potássio sérico: 4,6 mEq/L; Sódio: 139 mEq/L; Bicarbonato: 24 mEq/L; Hemoglobina: 13,2 g/dL.</li>
  </ul>
  <p><strong>Discussão Diagnóstica e Conduta Terapêutica Escalonada:</strong></p>
  <ul>
    <li><em>Estadiamento KDIGO da DRC:</em> <strong>Estágio G3aA3</strong> (TFGe entre 45-59 associada a albuminúria severamente aumentada $> 300$ mg/g). O paciente apresenta altíssimo risco cardiovascular e de progressão para diálise;</li>
    <li><em>Otimização Farmacológica Nefrorprotetora Moderna:</em>
      <ol>
        <li><strong>Introdução de iSGLT2 (Dapagliflozina 10 mg/dia ou Empagliflozina 10 mg/dia):</strong> Indicação formal classe I baseada nos ensaios DAPA-CKD e EMPA-KIDNEY. Reduzirá a hiperfiltração glomerular, diminuirá a albuminúria em 30% a 40% e protegerá contra eventos renais e insuficiência cardíaca;</li>
        <li><strong>Manutenção de Bloqueador do SRAA em Dose Otimizada:</strong> O Enalapril já se encontra na dose plena de 40 mg/dia (20 mg 2x/dia). Jamais associar BRA ao Enalapril;</li>
        <li><strong>Introdução de Finerenona (Antagonista Mineralocorticoide Não Esteroidal):</strong> Como o paciente persiste com albuminúria importante ($RAC = 680$ mg/g) a despeito do IECA e seu potássio sérico basal é de 4,6 mEq/L ($< 4,8$ mEq/L), há indicação formal respaldada pelos estudos FIDELIO-DKD/FIGARO-DKD de introduzir <strong>Finerenona 10 a 20 mg VO 1x/dia</strong>, com controle de potássio em 4 semanas;</li>
        <li><strong>Associação de Agonista do Receptor de GLP-1 (Semaglutida 1,0 mg SC semanal):</strong> Indicação estabelecida pelo estudo FLOW para controle glicêmico, perda de peso e nefroproteção adicional na DRC diabética;</li>
        <li><strong>Ajuste da Metformina:</strong> Como a TFGe é de 48 mL/min (faixa entre 30 e 44 exige redução de dose; $< 30$ exige suspensão), a dose de metformina pode ser mantida em 1.000 mg a 1.500 mg/dia com monitorização periódica;</li>
        <li><strong>Controle Pressórico Estrito:</strong> A meta de PA preconizada pelo KDIGO 2021/2024 é PAS $< 120$ mmHg. Como a PA atual é 146/92 mmHg sob enalapril e anlodipino, associa-se indapamida 1,5 mg/dia ou otimiza-se a terapia tríplice.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 2: Distúrbio Mineral e Ósseo Avançado na DRC Pré-Dialítica</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 64 anos, portadora de nefroesclerose hipertensiva crônica avançada e DRC em acompanhamento irregular, comparece à consulta com queixas de prurido cutâneo difuso há 3 meses e dores ósseas generalizadas nas pernas e na coluna lombar.</p>
  <p><strong>Laboratório Atual:</strong></p>
  <ul>
    <li>Creatinina sérica: 3,2 mg/dL; TFGe (CKD-EPI 2021): <strong>16 mL/min/1,73 m² (Estágio G4)</strong>;</li>
    <li>Fósforo sérico: <strong>6,8 mg/dL</strong> (valor normal: 2,5 a 4,5 mg/dL — hiperfosfatemia importante);</li>
    <li>Cálcio sérico total: 8,4 mg/dL; Albumina sérica: 4,0 g/dL (Cálcio corrigido = 8,4 mg/dL);</li>
    <li><strong>PTH intacto (iPTH): 620 pg/mL</strong> (valor de referência para método: 15 a 65 pg/mL; alvo para DRC não dialítica: acima do limite superior normal, mas neste caso desproporcionalmente elevado);</li>
    <li>25-hidroxivitamina D: 18 ng/mL (hipovitaminose D); Fosfatase alcalina óssea elevada: 210 U/L.</li>
    <li>Radiografia de mãos: reabsorção subperiosteal na borda radial das falanges médias do segundo e terceiro quirodáctilos (sinal patognomônico de osteíte fibrosa cística).</li>
  </ul>
  <p><strong>Discussão e Conduta Terapêutica:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Distúrbio Mineral e Ósseo da DRC (DMO-DRC) com Hiperparatireoidismo Secundário Grave e Osteíte Fibrosa Cística</strong> em paciente no Estágio G4;</li>
    <li><em>A Sequência Obrigatória de Intervenções (A Regra "Controle o Fósforo Primeiro"):</em>
      <ol>
        <li><strong>Restrição Dietética de Fósforo Orgânico e Inorgânico:</strong> Orientação nutricional rigorosa para ingestão máxima de 800 mg de fósforo/dia, cortando embutidos, refrigerantes à base de cola e produtos lácteos ultraprocessados;</li>
        <li><strong>Introdução de Quelante de Fósforo nas Refeições:</strong> Como o cálcio corrigido da paciente está no limite inferior da normalidade (8,4 mg/dL), pode-se iniciar <strong>Carbonato de Cálcio 500 mg a 1.000 mg VO 3x/dia junto ao almoço e jantar</strong> (ou Acetato de Cálcio). O sevelamer também é uma excelente alternativa segura;</li>
        <li><strong>Reposição de Colecalciferol:</strong> Corrigir o estoque de vitamina D nutricional com 50.000 UI/semana por 8 semanas;</li>
        <li><strong>Contraindicação Relativa de Calcitriol neste Momento Inicial:</strong> O calcitriol <em>não deve ser administrado enquanto o fósforo sérico estiver &gt; 5,5 a 6,0 mg/dL</em>, pois a vitamina D ativa aumenta a absorção intestinal tanto de cálcio quanto de fósforo, elevando o produto fosfocálcico ($8,4 \times 6,8 = 57,1$) e deflagrando calcificação vascular e tecidual rápida. Apenas após normalizar o fósforo para $< 4,5$ mg/dL, caso o PTH persista elevado, introduz-se calcitriol em baixas doses;</li>
        <li><strong>Preparo de Acesso Vascular:</strong> Como a TFGe é de 16 mL/min (fronteira entre G4 e G5), a paciente deve ser encaminhada imediatamente ao cirurgião vascular para mapeamento por eco-Doppler venoso e confecção de <strong>Fístula Arteriovenosa radiocefálica</strong> preemptiva.</li>
      </ol>
    </li>
  </ul>
</div>
`
};

export const sec7 = {
  id: 'questoes-concurso-comentadas-drc',
  title: '7. Questões de Residência Médica e Título de Nefrologia Comentadas Alternativa por Alternativa',
  body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Mulher de 52 anos, portadora de diabetes mellitus tipo 2 e hipertensão arterial sistêmica de longa data, em uso regular de losartana 50 mg duas vezes ao dia e metformina 850 mg duas vezes ao dia, comparece à consulta ambulatorial de rotina. Traz exames complementares realizados há duas semanas, repetidos e confirmados nesta semana: Creatinina sérica de 1,2 mg/dL; Taxa de Filtração Glomerular Estimada (pela equação CKD-EPI 2021) de 54 mL/min/1,73 m²; Razão Albumina/Creatinina Urinária (RAC) de 180 mg/g de creatinina; Potássio sérico de 4,7 mEq/L; Hemoglobina de 12,6 g/dL; PA em consultório de 132/82 mmHg. Com base nas diretrizes internacionais do KDIGO e nas recomendações da Sociedade Brasileira de Nefrologia, assinale a classificação correta do estadiamento da paciente e a melhor conduta terapêutica adicional a ser implementada:</p>

<ol type="A">
  <li>Estágio G2A1; a função renal é considerada satisfatória para a idade, devendo-se apenas suspender a losartana pelo risco de hipercalemia e manter o acompanhamento bienal.</li>
  <li>Estágio G3aA2; deve-se associar um inibidor do co-transportador sódio-glicose 2 (iSGLT2, como a dapagliflozina ou empagliflozina) e manter a losartana, buscando alvos de nefroproteção e redução de mortalidade cardiovascular.</li>
  <li>Estágio G3bA3; deve-se associar imediatamente um Inibidor da Enzima de Conversão da Angiotensina (Enalapril) à losartana para promover duplo bloqueio do sistema renina-angiotensina-aldosterona.</li>
  <li>Estágio G4A2; deve-se encaminhar a paciente para confecção imediata de fístula arteriovenosa e suspender a metformina devido ao risco absoluto de acidose lática iminente.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong>
1. <em>Estadiamento:</em> A paciente apresenta TFGe confirmada de 54 mL/min/1,73 m², o que se enquadra perfeitamente na faixa de 45 a 59 mL/min/1,73 m² (<strong>Categoria G3a</strong>). Sua albuminúria (RAC) é de 180 mg/g, situando-se entre 30 e 300 mg/g (<strong>Categoria A2 - Moderadamente Aumentada</strong>). Portanto, o diagnóstico é DRC Estágio G3aA2.
2. <em>Conduta Farmacológica:</em> O uso de iSGLT2 (Dapagliflozina ou Empagliflozina) é recomendação formal Classe I, Nível de Evidência A (estudos DAPA-CKD e EMPA-KIDNEY) para pacientes com DRC e TFGe $\ge 20$ mL/min associada a albuminúria, independentemente do controle glicêmico. A losartana deve ser mantida.
3. <em>Distratores:</em> A Alternativa C propõe duplo bloqueio com IECA + BRA, conduta <strong>formalmente contraindicada</strong> por ensaios clínicos (ONTARGET) pelo risco inaceitável de hipercalemia severa e falência renal sem ganho clínico. A paciente não está em G4 nem precisa de diálise ou fístula agora (Alternativa D).</p>

<hr>

<h3>Questão 2 (ENAMED / Exame Nacional de Revalidação de Diplomas Médicos)</h3>
<p>Homem de 66 anos, com diagnóstico de Doença Renal Crônica estágio G5 em programa regular de hemodiálise há 3 anos através de fístula arteriovenosa no braço esquerdo, queixa-se de astenia progressiva, sonolência e desânimo há um mês. Nega febre, sangramentos digestivos ou intercorrências infecciosas recentes. Seus exames de rotina mensal demonstram: Hemoglobina = 8,2 g/dL; VCM = 88 fL; HCM = 29 pg; Ferritina sérica = 140 ng/mL; Saturação de Transferrina (SatTransf) = 14%. O paciente encontra-se em uso de alfaepoetina humana recombinante na dose de 4.000 UI subcutânea três vezes por semana. De acordo com as diretrizes do KDIGO para o manejo da Anemia na DRC, qual é a conduta farmacológica prioritária indicada?</p>

<ol type="A">
  <li>Dobrar a dose de alfaepoetina para 8.000 UI três vezes por semana e prescrever sulfato ferroso oral em doses elevadas.</li>
  <li>Prescrever Sacarato de Hidróxido de Ferro (Noripurum) por via intravenosa durante as sessões de hemodiálise para atingir saturação de transferrina &gt; 20% e ferritina &gt; 200 ng/mL antes de qualquer aumento na dose da eritropoietina.</li>
  <li>Indicar transfusão imediata de 2 concentrados de hemácias com o objetivo de elevar a hemoglobina para valores superiores a 13,0 g/dL.</li>
  <li>Suspender a hemodiálise e converter a modalidade para diálise peritoneal automatizada, visto que a hemodiálise induz hemólise mecânica contínua.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O paciente apresenta anemia da DRC associada a <strong>deficiência marcial (ferropenia absoluta e funcional)</strong>: sua Saturação de Transferrina é de 14% (alvo KDIGO: 20% a 50%) e sua Ferritina é de 140 ng/mL (alvo KDIGO no paciente em hemodiálise: 200 a 500 ng/mL). A <em>Regra de Ouro do KDIGO</em> estabelece que a eritropoiese não responderá à elevação da dose de alfaepoetina na ausência de substrato de ferro adequado ("resistência à EPO induzida por ferropenia"). Além disso, no paciente em hemodiálise, a absorção de ferro oral é ineficaz pela alta hepcidina, sendo mandatória a <strong>reposição de ferro por via intravenosa</strong> (Alternativa B). A transfusão de hemácias (Alternativa C) deve ser evitada ao máximo em candidatos a transplante renal pelo risco de aloimunização contra antígenos HLA.</p>

<hr>

<h3>Questão 3 (UNICAMP - Universidade Estadual de Campinas)</h3>
<p>A respeito da fisiopatologia do Distúrbio Mineral e Ósseo na Doença Renal Crônica (DMO-DRC) e do Hiperparatireoidismo Secundário (HPTS), assinale a sequência de eventos fisiopatológicos <strong>CORRETA</strong> desencadeada pela perda progressiva da filtração glomerular:</p>

<ol type="A">
  <li>Queda da produção de PTH $\rightarrow$ hipofosfatemia severa $\rightarrow$ elevação compensatória do calcitriol renal $\rightarrow$ hipercalcemia e calcificação óssea descontrolada.</li>
  <li>Retenção de fósforo $\rightarrow$ elevação de FGF-23 $\rightarrow$ inibição da enzima 1-$\alpha$-hidroxilase renal com queda de calcitriol $\rightarrow$ hipocalcemia $\rightarrow$ aumento compensatório do PTH pelas paratireoides.</li>
  <li>Aumento da atividade da enzima 1-$\alpha$-hidroxilase $\rightarrow$ excesso de vitamina D ativa $\rightarrow$ hipercalcemia crônica $\rightarrow$ atrofia das quatro glândulas paratireoides com PTH indetectável.</li>
  <li>Deposição primária de alumínio nas trabéculas ósseas $\rightarrow$ colapso da reabsorção osteoclástica $\rightarrow$ estímulo parassimpático direto para liberação de fosfatase alcalina ácida.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A Alternativa B descreve perfeitamente o eixo FGF-23/Klotho/Vitamina D/PTH: a retenção inicial de fosfato estimula os osteócitos a secretarem FGF-23. Níveis elevados de FGF-23 inibem a 1-$\alpha$-hidroxilase proximal renal, derrubando o calcitriol sérico. Sem calcitriol e com menor cálcio absorvido no intestino (hipocalcemia), as células paratireoidianas sofrem hiperplasia e desrepressão genética, culminando no <strong>Hiperparatireoidismo Secundário</strong> com níveis altíssimos de PTH sérico.</p>

<hr>

<h3>Questão 4 (UNIFESP - Universidade Federal de São Paulo)</h3>
<p>Em relação às metas pressóricas e à nefroproteção na Doença Renal Crônica de acordo com as Diretrizes Oficiais KDIGO 2021/2024 e o estudo DAPA-CKD, assinale a afirmativa <strong>VERDADEIRA</strong>:</p>

<ol type="A">
  <li>Em pacientes com DRC sem diabetes, os iSGLT2 são contraindicados, sendo seu uso restrito àqueles com glicemia de jejum descompensada e hemoglobina glicada &gt; 9,0%.</li>
  <li>A meta preconizada de pressão arterial sistólica para a maioria dos adultos com DRC é inferior a 120 mmHg por medida automatizada padronizada de consultório, quando tolerada clinicamente.</li>
  <li>A constatação de uma elevação de 20% da creatinina sérica duas semanas após a introdução de enalapril exige a suspensão definitiva imediata do medicamento por caracterizar falência renal tóxica irreversível.</li>
  <li>A finerenona é um agonista adrenérgico que induz vasodilatação arteriolar sistêmica sem interferir no metabolismo do potássio sérico ou receptores de mineralocorticoides.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A diretriz KDIGO 2021/2024 de Pressão Arterial na DRC recomenda meta de <strong>PAS $< 120$ mmHg</strong> padronizada (Alternativa B). O estudo DAPA-CKD provou o benefício dos iSGLT2 <em>mesmo em não diabéticos</em> (eliminando A). Uma subida de creatinina de até 30% após IECA/BRA é esperada e decorre do alívio hemodinâmico da hipertensão intraglomerular, não indicando suspensão (eliminando C). A finerenona é um <em>antagonista do receptor mineralocorticoide não esteroidal</em>, e não um agonista adrenérgico (eliminando D).</p>

<hr>

<h3>Questão 5 (UERJ - Universidade do Estado do Rio de Janeiro)</h3>
<p>Homem de 62 anos com DRC estágio G4 (TFGe de 22 mL/min/1,73 m²) e acidose metabólica crônica compensada apresenta dosagem sérica de bicarbonato de 17 mEq/L (valor de referência: 22 a 28 mEq/L). Qual é o impacto clínico da manutenção dessa acidose metabólica crônica não tratada e qual é a conduta preconizada pelas diretrizes internacionais?</p>

<ol type="A">
  <li>A acidose crônica protege a massa muscular contra o estresse oxidativo; a conduta é expectante, evitando qualquer reposição de álcalis.</li>
  <li>A acidose induz catabolismo proteico acelerado, sarcopenia, desmineralização óssea e acelera a perda da filtração glomerular; deve-se prescrever suplementação oral de bicarbonato de sódio visando manter o bicarbonato sérico entre 22 e 26 mEq/L.</li>
  <li>Deve-se iniciar hemodiálise de urgência imediatamente, visto que o bicarbonato &lt; 20 mEq/L é critério de falência renal aguda em qualquer estágio da DRC.</li>
  <li>Indica-se a prescrição de acetazolamida para forçar a reabsorção tubular proximal de íons hidrogênio e alcalinizar o plasma.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A acidose metabólica crônica na DRC estimula a via ubiquitina-proteassoma (degradando a musculatura esquelética) e dissolve a hidroxiapatita óssea para tamponar íons $H^+$, gerando sarcopenia e osteopenia graves, além de acelerar a fibrose renal. O KDIGO recomenda formalmente a suplementação oral de bicarbonato de sódio para sustentar o nível sérico $\ge 22$ mEq/L (alvo entre 22 e 26 mEq/L). Acetazolamida induz acidose ao espoliar bicarbonato na urina (eliminando D).</p>

<hr>

<h3>Questão 6 (SCMSP - Santa Casa de Misericórdia de São Paulo)</h3>
<p>Sobre os acessos vasculares para hemodiálise crônica no paciente com Doença Renal Crônica terminal, assinale a opção <strong>CORRETA</strong>:</p>

<ol type="A">
  <li>A fístula arteriovenosa deve ser confeccionada preferencialmente na veia subclávia direita utilizando enxerto de dacron.</li>
  <li>A fístula arteriovenosa autóloga radiocefálica no punho não dominante é o acesso de primeira escolha; necessita de um período mínimo de cerca de 6 a 8 semanas para maturação antes de ser puncionada com segurança.</li>
  <li>O cateter temporário de duplo lúmen não tunelizado (Shaldon) é a opção ideal de longo prazo para pacientes dialíticos crônicos, dispensando confecção de fístulas.</li>
  <li>A Síndrome do Roubo Vascular (Steal Syndrome) manifesta-se por hiperfluxo venoso distal com edema maciço e pulso arterial exagerado nos quirodáctilos da mão operada.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A <strong>FAV autóloga radiocefálica (Brescia-Cimino)</strong> no punho do membro superior não dominante é o padrão-ouro internacional devido à maior sobrevida do acesso, menor taxa de trombose e baixíssima taxa de infecção comparada a próteses e cateteres. Requer maturação clínica de no mínimo 6 a 8 semanas para hipertrofia da parede venosa e dilatação luminal (Alternativa B). Não se faz fístula na subclávia (Alternativa A); cateter de Shaldon é temporário para emergências e tem alto risco bacterêmico (Alternativa C); e a síndrome do roubo vascular causa <em>isquemia da mão</em> com palidez, esfriamento e dor por desvio de fluxo para o trajeto da fístula, e não pulso exagerado (Alternativa D).</p>
`
};

export const sec8 = {
  id: 'conclusao-recomendações-finais-referencias-drc',
  title: '8. Síntese Terapêutica Integrada e Referências Internacionais Oficiais',
  body_html: `
<h3>Síntese Prática do Tratamento da DRC para o Médico Generalista e Especialista</h3>
<p>O cuidado do paciente com DRC apoia-se em seis eixos prioritários contínuos:</p>
<ol>
  <li><strong>Estadiamento Bidimensional Rigoroso:</strong> Todo paciente deve ser classificado pela sua TFGe (CKD-EPI 2021) e pela sua albuminúria (RAC em urina isolada);</li>
  <li><strong>Terapia Quádrupla de Nefroproteção:</strong> iSGLT2 (dapagliflozina/empagliflozina) + Bloqueador do SRAA (IECA ou BRA em monoterapia) + Finerenona (se DM2 e albuminúria persistente com $K^+ \le 4,8$) + Agonista GLP-1 (semaglutida na DRC diabética);</li>
  <li><strong>Metas Hemodinâmicas e Metabólicas:</strong> PAS $< 120$ mmHg padronizada de consultório; HbA1c individualizada entre 6,5% e 8,0%; restrição dietética de sódio ($< 2$ g/dia) e abandono do tabagismo;</li>
  <li><strong>Manejo do DMO-DRC:</strong> Manter fósforo sérico na faixa de normalidade com dieta e quelantes (sevelamer ou carbonato de cálcio junto às refeições); dosagem seriada de cálcio, calcitriol e PTH;</li>
  <li><strong>Controle da Anemia:</strong> Garantir estoques férricos adequados (SatTransf 20% a 50%, ferritina 100-500 ng/mL) com ferro intravenoso quando necessário antes e durante o uso de alfaepoetina (alvo estrito de Hb: 10,0 a 11,5 g/dL);</li>
  <li><strong>Preparo Oportuno para TRS:</strong> Encaminhamento nefrológico obrigatório em G4 (TFGe $< 30$ mL/min) e confecção atempada de fístula arteriovenosa autóloga de punho (Brescia-Cimino) quando a TFGe situar-se entre 15 e 20 mL/min, prevenindo o uso de cateteres venosos de emergência e sepse vascular.</li>
</ol>
`
};

export const bookReferencesDRC = [
  {
    title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
    url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Dapagliflozin in Patients with Chronic Kidney Disease (DAPA-CKD Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2024816'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Empagliflozin in Patients with Chronic Kidney Disease (EMPA-KIDNEY Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2204233'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Effect of Finerenone on Chronic Kidney Disease Outcomes in Type 2 Diabetes (FIDELIO-DKD Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2025845'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes (FLOW Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2403364'
  },
  {
    title: 'Diretrizes Clínicas da Sociedade Brasileira de Nefrologia (SBN) para Doença Renal Crônica',
    url: 'https://sbn.org.br/'
  }
];
