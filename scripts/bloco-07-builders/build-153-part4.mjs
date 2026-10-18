// scripts/bloco-07-builders/build-153-part4.mjs

export const sec7 = {
  id: "casos-clinicos-e-questoes-cad-dm1",
  title: "7. Casos Clínicos Estruturados e Questões Comentadas Padrão Residência Médica",
  body_html: `
<p>Treinamento avançado com situações clínicas reais de emergência pediátrica e resolução comentada de questões representativas dos principais processos seletivos do Brasil.</p>

<h3>Caso Clínico 1 — A Abertura Dramática de CAD em Escolar Confundida com Abdome Agudo</h3>
<p><strong>Identificação:</strong> Menina de 6 anos, previamente saudável, é levada ao serviço de pronto-atendimento com história de vômitos incoercíveis há 24 horas associados a dor abdominal difusa em cólica de forte intensidade. A mãe relata que a criança "está muito fraca, parece que emagreceu de repente nas últimas semanas e vinha fazendo xixi na cama quase todas as noites no último mês".</p>
<p><strong>Exame Físico de Entrada:</strong> Regular para mau estado geral, sonolenta, porém reativa ao chamado; mucosas secas, olhos encovados, turgor cutâneo diminuído com retorno em 3 segundos (desidratação estimada em 7% a 10%). Extremidades periféricas moderadamente frias, tempo de enchimento capilar de 3 segundos, pulsos radiais finos e taquicárdicos (FC 148 bpm), PA 88/50 mmHg. Padrão respiratório amplamente alterado: taquipneia ruidosa e profunda (FR 44 irpm), com <em>hálito cetônico adocicado</em> pronunciado. Abdome difusamente doloroso à palpação, porém sem descompressão dolorosa (sem peritonite real) e com ruídos hidroaéreos diminuídos.</p>
<p><strong>Exames Laboratoriais Imediatos (Ponto de Cuidado):</strong>
<br>• Glicemia Capilar: "HI" (acima do limite do glicosímetro; valor laboratorial sérico = 580 mg/dL).
<br>• Gasometria Venosa: pH 7,08; pCO2 18 mmHg; pO2 42 mmHg; <strong>Bicarbonato (HCO3-) = 5,2 mEq/L</strong>; Base Excess (BE) = -22 mEq/L.
<br>• Eletrólitos Séricos: Sódio (Na+) = 128 mEq/L; <strong>Potássio (K+) = 5,1 mEq/L</strong>; Cloreto (Cl-) = 94 mEq/L.
<br>• Cetometria Capilar: <strong>Beta-hidroxibutirato = 5,6 mmol/L</strong>.
<br>• Urina Tipo 1: Densidade 1.030; Glicosúria 4+; Cetonúria 3+.</p>

<p><strong>Discussão Propedêutica e Planejamento Terapêutico:</strong></p>
<p>A paciente apresenta <strong>Cetoacidose Diabética Grave de abertura do DM1</strong> (Glicemia &gt; 200, pH &lt; 7,10 e cetonemia &gt; 3,0 mmol/L). O ânion gap está marcadamente alargado: 128 - (94 + 5,2) = 28,8 mEq/L. A dor abdominal intensa e os vômitos decorrem da gastroparesia e ileoespasmo induzidos pela própria cetoacidose e desidratação (não se trata de abdome agudo cirúrgico / apendicite).</p>
<p><em>Cálculo do Sódio Corrigido de Katz:</em> Sódio Corrigido = 128 + 1,6 x [(580 - 100) / 100] = 128 + 7,7 = <strong>135,7 mEq/L</strong> (sódio corrigido perfeitamente normal, descartando hiponatremia verdadeira).</p>

<p><strong>Conduta Sequencial Hora a Hora:</strong></p>
<ol>
  <li><strong>Hora 0 a 1 — Expansão Volêmica:</strong> Peso estimado de 20 kg. Prescrever <strong>Soro Fisiológico a 0,9% na dose de 10 a 20 mL/kg (300 mL de SF 0,9%)</strong> a ser infundido em bomba em exatamente <strong>1 hora</strong>. NÃO aplicar insulina e NÃO infundir bicarbonato nesta primeira hora!</li>
  <li><strong>Hora 1 a 2 — Início da Insulina e Hidratação de Manutenção:</strong>
    <ul>
      <li>Após a primeira hora de SF 0,9%, a perfusão melhorou e a criança apresentou diurese espontânea.</li>
      <li>Iniciar <strong>Insulina Regular por via endovenosa contínua na dose de 0,05 a 0,1 U/kg/hora (1,0 a 2,0 U/hora)</strong> em bomba de infusão. <em>LEMBRETE:</em> SEM BOLUS INICIAL!</li>
      <li>Iniciar a hidratação venosa de manutenção e reposição do déficit (calculada para 48 horas usando SF a 0,45% com adição de <strong>40 mEq/L de Potássio</strong>, pois o K+ sérico de 5,1 mEq/L despencará assim que a insulina entrar nas células).</li>
    </ul>
  </li>
  <li><strong>Quando a Glicemia Atingir 250 mg/dL:</strong> Adicionar <strong>Glicose a 5% ao soro de hidratação venosa</strong>, mantendo a bomba de insulina ligada sem redução de dose até que o pH atinja &gt;= 7,30 e o bicarbonato &gt;= 15 mEq/L.</li>
</ol>

<h3>Caso Clínico 2 — A Emergência do Rebaixamento Neurológico Durante o Tratamento</h3>
<p><strong>Identificação:</strong> Menino de 4 anos de idade, internado na UTI Pediátrica há 6 horas para tratamento de CAD grave, recebendo infusão de insulina regular venosa a 0,1 U/kg/h e hidratação venosa contínua. À admissão: Glicemia 650 mg/dL, pH 7,04, Na+ 132 mEq/L, K+ 4,8 mEq/L.</p>
<p><strong>Evolução Aguda na 6ª Hora de Internação:</strong> A enfermeira aciona o médico plantonista relatando que a criança começou a queixar-se de cefaleia intensa e vomitou um volume alimentar claro na cama. Ao exame: a criança encontra-se torporosa, não responde aos chamados pelo nome, gemente à dor. Ao monitor cardíaco: <strong>a frequência cardíaca, que estava em 130 bpm, caiu subitamente para 68 bpm (bradicardia importante)</strong>; a PA subiu para 135/85 mmHg (hipertensão arterial). Pupila direita com diâmetro de 5 mm e reflexo fotomotor lentificado, e pupila esquerda com 3 mm (anisocoria).</p>
<p><strong>Exames do Momento:</strong> Glicemia capilar atual = 220 mg/dL; Sódio sérico atual = 126 mEq/L (Sódio corrigido atual = 126 + 1,6 x 1,2 = 127,9 mEq/L — queda acentuada do sódio corrigido!).</p>

<p><strong>Discussão Diagnóstica e Conduta Imediata de Salvamento:</strong></p>
<p>O paciente desenvolveu <strong>Edema Cerebral Agudo com Hipertensão Intracraniana Severa</strong> (preenche critérios diagnósticos de Muir: cefaleia, vômitos tardios, bradicardia sustentada, hipertensão arterial, anisocoria e queda na escala de Glasgow, acompanhado da clássica falha de ascensão do sódio corrigido). Trata-se de uma emergência neurológica com risco de herniação uncal em minutos.</p>
<p><strong>Ações Imediatas (Ordem Cronológica de Execução):</strong></p>
<ol>
  <li><strong>Elevar a cabeceira a 30 graus na linha média imediatamente;</strong></li>
  <li><strong>Reduzir imediatamente a taxa de infusão do soro de hidratação pela metade (em 50%);</strong></li>
  <li><strong>ADMINISTRAR IMEDIATAMENTE TERAPIA HIPEROSMOLAR:</strong>
    <ul>
      <li>Prescrever <strong>Manitol a 20% na dose de 0,5 a 1,0 g/kg EV em 15 minutos</strong> (ou <strong>Salina Hipertônica a 3% na dose de 3 a 5 mL/kg EV em 15 minutos</strong>).</li>
    </ul>
  </li>
  <li><strong>JAMAIS transportar o paciente para realizar tomografia computadorizada antes de infundir o osmoterápico!</strong> O medicamento deve ser infundido no leito da UTI; a neuroimagem só será feita após a estabilização neurológica completa.</li>
  <li>Preparar material para intubação orotraqueal se houver piora da respiração ou Glasgow &lt;= 8, evitando hipocapnia excessiva (manter pCO2 em torno de 30 a 35 mmHg).</li>
</ol>

<hr>

<h3>Banco de Questões Comentadas Padrão Residência Médica</h3>

<h4>Questão 1 (USP / FMUSP)</h4>
<p>Lactente de 3 anos de idade é admitido no pronto-socorro infantil com diagnóstico clínico e laboratorial confirmado de Cetoacidose Diabética Grave (Glicemia = 460 mg/dL; pH venoso = 7,05; Bicarbonato = 6,0 mEq/L; K+ sérico = 4,5 mEq/L; Na+ sérico = 130 mEq/L). O paciente apresenta sinais clínicos de desidratação grave (cerca de 10%). Em relação à sequência terapêutica imediata recomendada pelas diretrizes internacionais da ISPAD e da Sociedade Brasileira de Pediatria, assinale a alternativa rigorosamente correta:</p>
<p>A) Iniciar simultaneamente expansão volêmica com SF 0,9% e infusão contínua de Insulina Regular a 0,1 U/kg/h associada a bolus de 0,1 U/kg de insulina intravenosa.<br>
B) Iniciar expansão volêmica com SF 0,9% (10 a 20 mL/kg em 1 hora); a infusão de insulina regular só deve ser iniciada após 1 a 2 horas do início da hidratação, sendo contraindicada a administração de bolus de insulina.<br>
C) Prescrever Bicarbonato de Sódio a 8,4% imediatamente em virtude do pH &lt; 7,10 para restaurar a sensibilidade dos receptores vasculares às catecolaminas.<br>
D) O potássio não deve ser adicionado à hidratação nas primeiras 24 horas, pois o nível sérico inicial de 4,5 mEq/L atesta normocalemia segura.<br>
E) A correção do déficit hídrico calculado deve ser executada de forma rápida nas primeiras 12 horas para reverter a lesão renal aguda prerenal.</p>
<p><strong>Gabarito Oficial: Letra B.</strong><br>
<strong>Comentário Detalhado:</strong> O protocolo pediátrico da ISPAD e da SBP estabelece que na CAD a fase inicial de expansão volêmica com cristaloide isotônico (SF 0,9% 10 a 20 mL/kg em 1 hora) deve preceder o início da insulina. A insulina regular venosa só deve ser iniciada após 1 a 2 horas de hidratação para evitar colapso hemodinâmico por queda súbita da osmolalidade plasmática e hipocalemia, sendo formalmente PROSCRITO qualquer bolus intravenoso de insulina (tornando a alternativa A falsa). A alternativa C é um erro gravíssimo: bicarbonato de sódio é contraindicado, pois aumenta o risco de edema cerebral fatal e piora a acidose liquórica paradoxal. A alternativa D é falsa: a reposição de potássio (40 mEq/L) deve ser iniciada logo após a expansão inicial na fase de manutenção, pois a insulina promoverá influxo celular maciço de potássio, deflagrando hipocalemia se não for reposto precocemente. A alternativa E é falsa: o déficit hídrico na criança deve ser reposto lentamente ao longo de 24 a 48 horas para prevenir edema cerebral. Alternativa B rigorosamente perfeita.</p>

<h4>Questão 2 (ENARE / Residência Médica)</h4>
<p>Durante o tratamento de uma criança de 8 anos com cetoacidose diabética em bomba de infusão contínua de Insulina Regular a 0,08 U/kg/h e solução salina a 0,45%, a glicemia capilar horária cai de 480 mg/dL para 230 mg/dL na quarta hora de evolução. O paciente permanece sonolento, a gasometria venosa de controle revela pH = 7,21 e Bicarbonato = 11 mEq/L (acidose metabólica ainda em resolução). Diante deste cenário, qual é a conduta médica correta?</p>
<p>A) Desligar a bomba de infusão de insulina venosa para evitar que o paciente entre em hipoglicemia severa.<br>
B) Reduzir a dose de insulina venosa para 0,01 U/kg/h e suspender a hidratação venosa.<br>
C) Manter a taxa de infusão de insulina venosa e adicionar glicose à solução de hidratação venosa (iniciar Soro Glicosado a 5% com NaCl), mantendo a glicemia entre 150 e 200 mg/dL até a resolução completa da cetoacidose.<br>
D) Administrar Bicarbonato de Sódio para acelerar a normalização do pH e permitir a liberação da dieta oral.<br>
E) Fazer a transição imediata para insulina NPH subcutânea e liberar dieta geral.</p>
<p><strong>Gabarito Oficial: Letra C.</strong><br>
<strong>Comentário Detalhado:</strong> Este é o clássico ponto de viragem no manejo da CAD. A insulina na cetoacidose tem como função primordial frear a lipólise e desligar a cetogênese mitocondrial no fígado. Se o médico desligar ou reduzir excessivamente a insulina porque a glicemia atingiu 230 mg/dL, a síntese de cetoácidos será reativada, perpetuando a acidose (o paciente ainda está com pH 7,21 e HCO3 11). A conduta padronizada pela ISPAD é: <strong>MANTER A INSULINOTERAPIA VENOSA E ADICIONAR GLICOSE AO SORO (SG 5% com eletrólitos)</strong>, garantindo que o aporte de glicose impeça a hipoglicemia enquanto a insulina continua trabalhando para clarear os corpos cetônicos até que o pH atinja &gt;= 7,30 e o bicarbonato &gt;= 15 mEq/L. Alternativa C perfeita.</p>

<h4>Questão 3 (SURCE / UNICAMP)</h4>
<p>Criança de 5 anos em tratamento intensivo para cetoacidose diabética grave há 5 horas apresenta subitamente queixa de cefaleia holocraniana intensa, seguida de dois episódios de vômitos incoercíveis e bradicardia sinusal aguda (FC cai de 120 para 65 bpm), evoluindo com sonolência profunda e anisocoria pupilar. A conduta prioritária e salvadora a ser realizada de forma imediata à beira do leito é:</p>
<p>A) Encaminhar a criança imediatamente à sala de Tomografia Computadorizada de Crânio para confirmação do diagnóstico antes de qualquer medicação.<br>
B) Elevar a cabeceira da maca a 30 graus, reduzir a infusão de fluidos endovenosos e administrar Manitol a 20% (0,5 a 1,0 g/kg EV) ou Salina Hipertônica a 3% (2,5 a 5 mL/kg EV) de imediato.<br>
C) Administrar bolus de glicose a 50% intravenosa presumindo crise de neuroglicopenia aguda por hipoglicemia.<br>
D) Realizar punção lombar de emergência para descompressão liquórica e coleta de líquor para afastar meningite bacteriana.<br>
E) Administrar Fenitoína venosa em dose de ataque profilática para convulsões.</p>
<p><strong>Gabarito Oficial: Letra B.</strong><br>
<strong>Comentário Detalhado:</strong> O paciente preenche critérios clínicos clássicos e inequívocos de <strong>Edema Cerebral Agudo com Hipertensão Intracraniana na CAD</strong> (cefaleia, vômitos, bradicardia súbita, anisocoria e rebaixamento do sensório). Trata-se de uma emergência extrema em que cada minuto de atraso pode custar a vida da criança por herniação cerebral. <em>Princípio de Ouro:</em> O tratamento hiperosmolar com <strong>Manitol a 20% (0,5 a 1,0 g/kg em 15 minutos) ou Salina Hipertônica a 3% (2,5 a 5 mL/kg em 15 minutos)</strong> DEVE SER INICIADO IMEDIATAMENTE NO LEITO da UTI, associado à elevação da cabeceira a 30 graus e restrição da infusão hídrica. A alternativa A é um erro médico fatal (jamais atrase o osmoterápico para levar a criança instável à tomografia). A alternativa D é proscrita (punção lombar na presença de hipertensão intracraniana precipita herniação de amígdalas cerebelares e parada cardiorrespiratória imediata). Alternativa B impecável.</p>
`
};
