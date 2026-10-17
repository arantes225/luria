import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

function appendSectionToBook(slug, sectionId, sectionTitle, htmlContent) {
  const jsonPath = path.join('apostilas', slug, 'content.json');
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  payload.o = payload.o.filter(item => item[0] !== sectionId && item[0] !== 'referencias');
  payload.q = payload.q.filter(item => item[0] !== sectionId && item[0] !== 'referencias');

  payload.o.push([sectionId, sectionTitle]);
  payload.q.push([sectionId, 0, htmlToBlocks(sectionTitle, htmlContent)]);

  payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
  payload.q.push([
    'referencias',
    0,
    [
      ['2', 'Referências Oficiais e Diretrizes'],
      [
        'o',
        [
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.conitec.gov.br" target="_blank" rel="noopener noreferrer">CONITEC - Recomendações e Diretrizes Nacionais</a>',
          '<a href="https://www.sbp.com.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pediatria (SBP) / Colégio Brasileiro de Cirurgiões (CBC)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// 1. Boost 053: Desidratação e Reidratação (needs +4k to reach ~62k)
const boost053 = `
<h3>Casos Clínicos Adicionais Comentados de Distúrbios Hidroeletrolíticos Complexos</h3>
<div class="book-case">
  <h4>Caso Clínico 7: Lactente com Choque Hipovolêmico Refratário e Hipocalemia Grave</h4>
  <p><strong>História Clínica:</strong> Lactente de 8 meses, pesando 8 kg previamente hígido, é admitido na sala de emergência com história de febre, vômitos e diarreia aquosa profusa há 3 dias. A mãe relata mais de 12 evacuações líquidas nas últimas 24 horas e recusa total de líquidos. Ao exame físico inicial: letárgico, pulsos periféricos filiformes, tempo de enchimento capilar de 5 segundos, extremidades frias e pálidas, olhos encovados, saliva ausente e turgor cutâneo muito diminuído com prega que se desfaz em mais de 3 segundos. PA: 60/35 mmHg, FC: 185 bpm, FR: 58 irpm. Encontra-se em anúria nas últimas 8 horas.</p>
  <p><strong>Discussão e Conduta Imediata:</strong> O lactente preenche critérios inequívocos de <strong>Choque Hipovolêmico por Desidratação Grave (Plano C)</strong>. A prioridade absoluta é a ressuscitação volêmica imediata com obtenção rápida de acesso venoso calibroso ou acesso intraósseo tibial. A conduta mandatória inicial consiste na infusão rápida de <strong>SF 0,9% ou Ringer Lactato na dose de 20 mL/kg (160 mL) em bólus aberto de 10 a 20 minutos</strong>, podendo ser repetida até duas vezes se persistirem sinais de choque. Coletam-se gasometria venosa, eletrólitos, ureia, creatinina e glicemia capilar. Após a segunda expansão, o paciente apresenta melhora da perfusão (TEC de 2 segundos, FC de 135 bpm) e diurese espontânea de 20 mL. O laboratório revela: Na+ 132 mEq/L, K+ 2,4 mEq/L, Bicarbonato 11 mEq/L, pH 7,22 e lactato 4,2 mmol/L. Com a comprovação de diurese efetiva, está formalmente autorizada e indicada a reposição de cloreto de potássio na taxa de manutenção calculada por Holliday-Segar (800 mL/dia) com acréscimo de 3 mEq de KCl/100 mL, com monitorização eletrocardiográfica contínua para prevenir arritmias ventriculares decorrentes da hipocalemia grave.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 8: Desidratação Hipernatrêmica Iatrogênica por Diluição Errada de Fórmula</h4>
  <p><strong>História Clínica:</strong> Neonato de 28 dias é trazido à emergência por irritabilidade extrema alternada com sonolência profunda, choro rouco e febre não infecciosa (38,2 °C). A genitora relata que, por dificuldades financeiras, preparava a fórmula infantil de partida utilizando metade da água prescrita na lata para 'tornar o leite mais forte e sustentador'. Ao exame: pele com turgor 'pastoso' característico, fontanela deprimida, hipertonia generalizada e tremores de extremidades. Exames laboratoriais: Na+ sérico de 168 mEq/L, K+ 4,1 mEq/L, glicemia 92 mg/dL e ureia 88 mg/dL.</p>
  <p><strong>Discussão e Conduta Imediata:</strong> Trata-se de <strong>Desidratação Hipernatrêmica Grave</strong> secundária à sobrecarga osmótica de solutos. A complicação mais temida no manejo da hipernatremia grave é o edema cerebral com convulsões e hemorragia intracraniana resultante da queda excessivamente rápida da osmolaridade sérica plasmática em relação ao meio intracelular cerebral adaptado por osmólitos idiogênicos. A reidratação NÃO pode ser feita com soluções puramente hipotônicas em alta velocidade. O déficit de água livre deve ser corrigido gradualmente em <strong>48 a 72 horas</strong>, utilizando solução com concentração de sódio que promova queda lenta da natremia (não excedendo 0,5 mEq/L por hora ou 10 a 12 mEq/L ao dia). O volume total programado inclui a manutenção basal de Holliday-Segar somada ao déficit hídrico calculado, com dosagens séricas seriadas de eletrólitos a cada 4 a 6 horas.</p>
</div>
`;

// 2. Boost 055: Vigilância em Saúde (needs +8k to reach ~62k)
const boost055 = `
<h3>Estudos de Caso e Aplicação Prática de Indicadores de Saúde Pública</h3>
<div class="book-case">
  <h4>Estudo de Caso 1: Investigação e Bloqueio de Surto de Doença de Chagas Aguda Transmitida por Alimentos</h4>
  <p><strong>Cenário Epidemiológico:</strong> O Centro de Informações Estratégicas em Vigilância em Saúde (CIEVS) de um município da Região Norte é notificado sobre um agrupamento de 9 indivíduos de três famílias diferentes que procuraram a UPA apresentando febre prolongada (&gt; 14 dias), mialgia, cefaleia, edema de face e membros inferiores, associados a dores torácicas e epigástricas atípicas. Todos os pacientes referiram consumo de açaí artesanal não pasteurizado adquirido no mesmo ponto comercial informal durante um festival comunitário há 18 dias.</p>
  <p><strong>Investigação Epidemiológica de Campo:</strong> Trata-se de hipótese diagnóstica de <strong>Surto de Doença de Chagas Aguda (DCA) por transmissão oral</strong>, modalidade epidemiológica atualmente responsável por mais de 70% dos casos agudos no Brasil. As ações integradas de Vigilância em Saúde devem ser desencadeadas nas primeiras 24 horas:</p>
  <ul>
    <li><strong>Vigilância Epidemiológica:</strong> Notificação compulsória imediata no SINAN. Realização de exame parasitológico direto a fresco de gota espessa e esfregaço sanguíneo em todos os indivíduos sintomáticos (método padrão-ouro na fase aguda com elevada parasitemia). Busca ativa de outros comensais e contatos expostos ao lote do alimento suspeito. Início imediato do tratamento antiparasitário com Benznidazol (5 a 7 mg/kg/dia por 60 dias) para todos os casos confirmados.</li>
    <li><strong>Vigilância Sanitária (VISA):</strong> Interdição cautelar imediata do estabelecimento comercial e apreensão dos lotes remanescentes de frutos e polpa de açaí para análise parasitológica laboratorial por biologia molecular (PCR). Inspeção das boas práticas de manipulação, exigindo o processo térmico padronizado de branqueamento do fruto (aquecimento a 80 °C por 10 segundos seguido de choque térmico), que inativa completamente o <em>Trypanosoma cruzi</em>.</li>
    <li><strong>Vigilância em Saúde Ambiental:</strong> Pesquisa entomológica de vetores triatomíneos (barbeiros) nas áreas produtoras de açaí e no peridomicílio dos manipuladores.</li>
  </ul>
</div>

<div class="book-case">
  <h4>Estudo de Caso 2: Auditoria de Declaração de Óbito e Classificação de Morte Materna</h4>
  <p><strong>Cenário Epidemiológico:</strong> O Comitê Municipal de Prevenção da Mortalidade Materna, Infantil e Fetal realiza a investigação de uma Declaração de Óbito de mulher de 24 anos, primigesta de 34 semanas, que evoluiu para óbito no CTI de hospital de referência após cesariana de emergência. A DO original constava apenas: 'Causa direta: Parada Cardiorrespiratória; Causa intermediária: Choque Hemorrágico; Causa básica: CIVD'.</p>
  <p><strong>Discussão Técnico-Epidemiológica:</strong> A DO foi incorretamente preenchida, utilizando modos de morrer (PCR, choque) como causas de óbito sem esclarecer a causa básica fundamental. Após auditoria minuciosa do prontuário, apurou-se que a gestante era portadora de pré-eclâmpsia com sinais de gravidade não controlada que evoluiu com Descolamento Prematuro de Placenta (DPP), apoplexia uteroplacentária (útero de Couvelaire) e coagulopatia de consumo. Trata-se formalmente de um <strong>Óbito Materno Obstétrico Direto</strong>. O Comitê retificou a DO no SIM: Causa básica: Pré-eclâmpsia grave que desencadeou Descolamento Prematuro de Placenta. Esse registro impacta diretamente o cálculo da <strong>Razão de Mortalidade Materna (RMM)</strong> do município: (Número de óbitos maternos diretos e indiretos / Número de nascidos vivos no mesmo local e período) &times; 100.000 nascidos vivos, indicador sensível da qualidade da assistência obstétrica pré-natal e hospitalar da rede SUS.</p>
</div>
`;

// 3. Boost 057: Trauma Torácico (needs +13k to reach ~62k)
const boost057 = `
<h3>Aprofundamento Cirúrgico: Lesões Torácicas Ocultas, Rotura Aórtica e Algoritmos de Decisão</h3>
<p>Na avaliação secundária do politraumatizado torácico, oito lesões potencialmente fatais devem ser sistematicamente pesquisadas e excluídas por exames de imagem e vigilância clínica seriada: pneumotórax simples, hemotórax simples, contusão miocárdica, rotura traumática de diafragma, rotura traumática de aorta, lesão esofágica contusa, lesão traqueobrônquica e contusão pulmonar isolada.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Lesão Torácica Potencialmente Fatal</th>
      <th>Mecanismo Mecânico e Fisiopatologia</th>
      <th>Sinais Radiológicos e Diagnósticos</th>
      <th>Manejo Cirúrgico / Conservador</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rotura Traumática de Aorta Torácica</strong></td>
      <td>Desaceleração horizontal ou vertical brusca em alta velocidade. A fixação aórtica no ligamento arterioso (istmo aórtico, logo distal à emergência da artéria subclávia esquerda) gera forças de cisalhamento que provocam laceração da íntima e média. Mais de 80% dos pacientes vão a óbito no local do trauma.</td>
      <td><strong>Radiografia de tórax:</strong> alargamento do mediastino superior (&gt; 8 cm), perda do contorno do botão aórtico, desvio da traqueia para a direita, rebaixamento do brônquio-fonte esquerdo (&gt; 140°), desvio da sonda nasogástrica para a direita e obliteração da janela aortopulmonar.<br><strong>Angio-TC de tórax:</strong> padrão-ouro diagnóstico definitivo.</td>
      <td>Controle farmacológico estrito imediato da pressão arterial e frequência cardíaca com betabloqueadores venosos (esmolol ou metoprolol para manter FC &lt; 60-70 bpm e PAM entre 60-70 mmHg, prevenindo rotura transmural livre), seguido de <strong>Reparo Endovascular da Aorta Torácica (TEVAR)</strong> com colocação de endoprótese vascular.</td>
    </tr>
    <tr>
      <td><strong>Rotura Traumática de Diafragma</strong></td>
      <td>Aumento súbito e maciço da pressão intra-abdominal por trauma contuso no abdome/pelve (mais de 75% ocorrem na <strong>cúpula diafragmática esquerda</strong>, pois o fígado exerce efeito protetor à direita).</td>
      <td>Passagem de vísceras ocas (estômago, cólon) para a cavidade pleural. Radiografia de tórax evidencia sonda nasogástrica acima do diafragma, nível hidroaéreo intratorácico ou imagem que mimetiza pneumotórax/hemotórax.</td>
      <td><strong>Tratamento cirúrgico obrigatório:</strong> Na fase aguda do trauma, a via de acesso preferencial é a <strong>laparotomia exploradora</strong> (permite inspecionar outras vísceras abdominais e reduzir os órgãos herniados, procedendo-se à sutura diafragmática com fio inabsorvível). Na fase tardia crônica, a toracotomia ou videotoracoscopia é preferida devido às aderências intratorácicas.</td>
    </tr>
    <tr>
      <td><strong>Contusão Miocárdica Traumática</strong></td>
      <td>Impacto direto do esterno contra o volante ou painel do veículo. Compressão do coração entre o esterno e a coluna vertebral com necrose tecidual e edema do miocárdio, afetando predominantemente o ventrículo direito.</td>
      <td>Dor precordial que não responde a analgésicos comuns, arritmias cardíacas precoces ao ECG (extrassístoles ventriculares, bloqueio de ramo direito, taquicardias supraventriculares) e elevação de troponina.</td>
      <td>Monitorização eletrocardiográfica contínua em leito de terapia intensiva por 24 a 48 horas. Suporte inotrópico com dobutamina se houver disfunção ventricular direita documentada ao ecocardiograma.</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>Caso Clínico Cirúrgico 5: Descompressão por Agulha Ineficaz e Conversão para Drenagem</h4>
  <p><strong>História:</strong> Vítima masculina de 28 anos, condutor de motocicleta colidido contra anteparo fixo, chega ao pronto-socorro em prancha rígida e colar cervical. No pré-hospitalar, a equipe de resgate realizou punção torácica com cateter 18G no 2º espaço intercostal direito devido à suspeita de pneumotórax. Ao dar entrada na sala de emergência: cianótico, sudoreico, FR 42 irpm, SpO2 78% com máscara com reservatório a 15 L/min, FC 142 bpm, PA 70/40 mmHg. À inspeção, hemitórax direito hipoexpansível com enfisema subcutâneo exuberante, ausência total de murmúrio vesicular à direita e timpanismo à percussão.</p>
  <p><strong>Discussão e Conduta Crítica:</strong> A punção descompressiva pré-hospitalar falhou ou foi obstruída (o cateter 18G tem calibre insuficiente e comprimento curto que frequentemente não atinge a cavidade pleural através da musculatura peitoral e do enfisema). O paciente encontra-se em <strong>choque obstrutivo por Pneumotórax Hipertensivo não resolvido</strong>. A equipe não deve perder tempo solicitando radiografia. O cirurgião de trauma deve realizar imediatamente uma <strong>Toracostomia Digital rápida no 5º espaço intercostal entre as linhas axilar anterior e axilar média</strong>: incisão cutânea transversa, dissecção romba da musculatura intercostal acima da borda superior da 6ª costela (preservando o feixe vasculonervoso intercostal na borda inferior da 5ª costela) e perfuração digital da pleura parietal. A saída explosiva de ar sob pressão confirma o diagnóstico e descomprime instantaneamente o mediastino, normalizando a PA e SpO2 em segundos. Em seguida, introduz-se dreno tubular 28 Fr direcionado para a região apical e posterior do hemitórax, conectando-o a frasco de drenagem com selo d'água.</p>
</div>
`;

// 4. Boost 058: Diarreia Aguda (needs +14k to reach ~62k)
const boost058 = `
<h3>Prevenção de Erros Clínicos e Condutas Baseadas em Evidências no Pronto Atendimento Pediátrico</h3>
<p>A abordagem da diarreia aguda no pronto-socorro pediátrico é frequentemente cercada de prescrições inadequadas que elevam a morbidade e os custos hospitalares. A compreensão dos mecanismos fisiológicos e da farmacocinética dos fluidos permite instituir intervenções seguras e eficazes:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Prática Inadequada Frequente</th>
      <th>Risco Fisiopatológico e Consequências Clínicas</th>
      <th>Conduta Correta Recomendada (MS / SBP)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Prescrição de Soro Caseiro com colheres de medidas domésticas</td>
      <td>Erros de dosagem são frequentes (excesso de sal causando hipernatremia grave ou excesso de açúcar causando diarreia osmótica e piora das perdas).</td>
      <td>Uso preferencial dos sachês de <strong>Sais de Reidratação Oral (SRO) de baixa osmolaridade (245 mOsm/L)</strong> fornecidos gratuitamente nas unidades do SUS e farmácias populares, diluídos em exatos 1.000 mL de água tratada.</td>
    </tr>
    <tr>
      <td>Jejum alimentar prolongado ou 'descanso intestinal'</td>
      <td>Provoca atrofia das vilosidades da mucosa intestinal por falta de nutrientes luminais, retarda a renovação celular, favorece translocação bacteriana e precipita desnutrição proteico-calórica.</td>
      <td><strong>Manutenção irrestrita da alimentação habitual</strong> compatível com a idade da criança desde o primeiro momento. Manter aleitamento materno sob livre demanda em todos os planos (A, B e C). Não diluir fórmulas lácteas.</td>
    </tr>
    <tr>
      <td>Oferta de refrigerantes, isotônicos esportivos e sucos de caixinha</td>
      <td>Soluções com altíssima osmolaridade e excesso de carboidratos simples (glicose e frutose) que atuam como agentes osmóticos no lúmen intestinal, puxando água dos capilares para a luz entérica e agravando a diarreia.</td>
      <td>Oferecer apenas líquidos caseiros recomendados no Plano A (água, água de coco, caldos de legumes, sopas caseiras, chás sem açúcar) associados ao SRO após cada evacuação diarreica.</td>
    </tr>
    <tr>
      <td>Uso rotineiro de antimicrobianos para diarreia aquosa</td>
      <td>Não reduz o tempo de doença em etiologias virais, elimina a microbiota comensal protetora, seleciona bactérias multirresistentes e, no caso de infecção por <em>E. coli</em> produtora de toxina Shiga (STEC), eleva em até 17 vezes o risco de desencadear a <strong>Síndrome Hemolítico-Urêmica (SHU)</strong>.</td>
      <td>Restringir antibioticoterapia estritamente aos casos de disenteria franca por <em>Shigella</em> com febre alta e comprometimento sistêmico, ou quando há isolamento confirmado em coprocultura com indicação clínica formal.</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>Caso Clínico Pediátrico 6: Síndrome Hemolítico-Urêmica Pós-Disenteria por STEC</h4>
  <p><strong>História:</strong> Menina de 3 anos é atendida na UPA com história de febre baixa, cólicas abdominais intensas e evacuações diarreicas profusas que se tornaram sanguinolentas e com coágulos no 3º dia de evolução. O médico assistente prescreveu Amoxicilina com Clavulanato por suspeita empírica de enterite bacteriana. No 6º dia de evolução, a criança desenvolve palidez cutaneomucosa intensa e súbita, irritabilidade, petéquias em membros inferiores, edema periorbitário e oligúria franca (uma fralda molhada nas últimas 18 horas).</p>
  <p><strong>Discussão e Achados Críticos:</strong> O quadro clínico é clássico de <strong>Síndrome Hemolítico-Urêmica (SHU) típica</strong> desencadeada por <em>E. coli</em> produtora de toxina Shiga (STEC), agravada pela prescrição inadvertida de betalactâmico, que induziu lise bacteriana e liberação maciça da toxina Shiga na corrente sanguínea. Exames laboratoriais de urgência confirmam a tríade patognomônica: 1. Anemia hemolítica microangiopática com hemoglobina de 6,2 g/dL e presença abundante de <strong>esquizócitos</strong> no sangue periférico; 2. Trombocitopenia grave com plaquetas de 32.000/mm³; 3. Insuficiência renal aguda oligoanúrica com Creatinina de 3,8 mg/dL e Ureia de 145 mg/dL. O manejo exige internação imediata em Unidade de Terapia Intensiva Pediátrica, suporte hemodinâmico estrito com restrição hídrica rigorosa (balanço hídrico neutro considerando perdas insensíveis e diurese), transfusão lenta de concentrado de hemácias filtrado se anemia sintomática (evitando transfusão profilática de plaquetas pelo risco de microtrombos renais adicionais) e início precoce de <strong>terapia renal substitutiva (diálise peritoneal ou hemodiálise)</strong>.</p>
</div>
`;

// 5. Boost 067: Trauma Pélvico e Geniturinário (needs +12k to reach ~62k)
const boost067 = `
<h3>Trauma Renal e Ureteral: Classificação AAST e Estratificação Terapêutica</h3>
<p>O rim é o órgão geniturinário mais comumente lesado no trauma abdominal contuso (mais de 80% a 90% dos casos decorrentes de acidentes automobilísticos e quedas), devido à sua localização retroperitoneal parcialmente protegida pelos arcos costais inferiores e pela gordura perirrenal de Gerota. A conduta moderna preconiza a preservação máxima do parênquima renal através do tratamento não operatório (TNO) mesmo em lesões de alto grau em pacientes hemodinamicamente estáveis.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Grau da Lesão (Escala AAST)</th>
      <th>Descrição Anatômica da Lesão Renal</th>
      <th>Achados na Tomografia Computadorizada Contrastada</th>
      <th>Conduta Terapêutica Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau I</strong></td>
      <td>Contusão renal ou hematoma subcapsular contido, sem laceração cortical.</td>
      <td>Área hipodensa mal delimitada ou hematoma subcapsular sem extravasamento de contraste.</td>
      <td>Tratamento conservador: repouso no leito, hidratação venosa e vigilância da hematúria.</td>
    </tr>
    <tr>
      <td><strong>Grau II</strong></td>
      <td>Hematoma perirrenal contido na fáscia de Gerota ou laceração cortical &lt; 1,0 cm de profundidade sem atingir o sistema coletor (sem extravasamento urinário).</td>
      <td>Laceração parenquimatosa superficial e hematoma confinado ao espaço perirrenal.</td>
      <td>Tratamento conservador com repouso absoluto até clareamento da urina.</td>
    </tr>
    <tr>
      <td><strong>Grau III</strong></td>
      <td>Laceração parenquimatosa renal &gt; 1,0 cm de profundidade que se estende através do córtex e medula, porém <strong>sem atingir o sistema coletor urinário</strong>.</td>
      <td>Defeito de preenchimento cortical profundo sem extravasamento de contraste na fase tardia (excretora) da TC.</td>
      <td>Tratamento não operatório em ambiente hospitalar monitorizado; estabilização com fluidos e antibióticos profiláticos se indicado.</td>
    </tr>
    <tr>
      <td><strong>Grau IV</strong></td>
      <td>Laceração parenquimatosa renal que se estende até o <strong>sistema coletor urinário</strong> (cálices/pelve) com extravasamento ativo de urina contrastada (urinoma), OU lesão vascular de ramo segmentar arterial/venoso com infarto segmentar contido.</td>
      <td>Extravasamento evidente de contraste iodado para o retroperitônio na fase excretora (tardia - 5 a 10 min) da TC, ou ausência de perfusão segmentar de um polo renal.</td>
      <td>Tratamento conservador na maioria dos pacientes estáveis. Extravasamento urinário persistente é tratado prioritariamente com <strong>stent ureteral duplo J por via cistoscópica retrógrada</strong> e drenagem percutânea de urinoma. Sangramento ativo com blush arterial é candidato a <strong>angioembolização percutânea</strong>.</td>
    </tr>
    <tr>
      <td><strong>Grau V</strong></td>
      <td>Rim completamente fragmentado / estilhaçado ('shattered kidney') OU <strong>avulsão do pedículo vascular renal principal</strong> (trombose da artéria renal principal ou rotura da veia renal) com desvascularização completa do órgão.</td>
      <td>Ausência total de captação de contraste em todo o rim na fase nefrográfica ('rim mudo' vascularmente) associada a grande hematoma retroperitoneal.</td>
      <td>Se paciente hemodinamicamente instável com choque refratário: <strong>Laparotomia exploradora imediata com Nefrectomia Total</strong>. Tentativa de revascularização vascular de emergência (stent ou cirurgia) raramente tem sucesso se o tempo de isquemia quente for superior a 4 a 6 horas.</td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>Caso Clínico Urológico 4: Extravasamento Urinário Pós-Trauma Renal e Implante de Duplo J</h4>
  <p><strong>História:</strong> Homem de 34 anos é ejetado de veículo em colisão frontal em rodovia. Dá entrada na sala de emergência hemodinamicamente estável (PA 125/80 mmHg, FC 88 bpm) com queixa de dor lombar esquerda e hematúria macroscópica franca com coágulos. A tomografia computadorizada multislice com contraste venoso nas quatro fases (sem contraste, arterial, nefrográfica e excretora tardia) evidencia laceração parenquimatosa profunda de 2,8 cm no terço médio do rim esquerdo comunicando-se com a pelve renal e formação de urinoma retroperitoneal de 120 mL (Trauma Renal Grau IV da AAST). Não há extravasamento de sangue na fase arterial.</p>
  <p><strong>Discussão e Conduta:</strong> Em paciente hemodinamicamente estável, o tratamento não operatório é o padrão-ouro mesmo no trauma renal grau IV. A laparotomia aberta desnecessária frequentemente culmina em nefrectomia desnecessária por abertura indevida da fáscia de Gerota tamponada. O extravasamento urinário contínuo decorre da pressão intraluminal do sistema coletor. A intervenção minimamente invasiva padrão consiste na realização de <strong>Cistoscopia com inserção de Cateter Ureteral Duplo J retrógrado esquerdo</strong> sob fluoroscopia. O cateter despressuriza o bacinete renal, direciona a urina diretamente para a bexiga e permite que a laceração do parênquima cicatrize espontaneamente por segunda intenção sem necessidade de incisão cirúrgica, preservando 100% da função das unidades nefrônicas viáveis.</p>
</div>
`;

console.log('Aplicando reforço clínico e de casos aos 5 cadernos...');
appendSectionToBook('desidratacao-e-terapia-de-reidratacao', 'sec-reforco-holliday-disturbios-complexos', 'Aprofundamento Avançado: Casos Clínicos Complexos de Reidratação e Distúrbios Hidroeletrolíticos Graves', boost053);
appendSectionToBook('vigilancia-em-saude', 'sec-reforco-casos-indicadores-vigilancia', 'Aprofundamento Avançado: Estudos de Caso Práticos e Metodologia de Cálculo de Indicadores de Saúde Pública', boost055);
appendSectionToBook('trauma-toracico', 'sec-reforco-trauma-aorta-diafragma-casos', 'Aprofundamento Avançado: Trauma Aórtico, Rotura Diafragmática e Algoritmo de Toracostomia Digital', boost057);
appendSectionToBook('diarreia-aguda', 'sec-reforco-prevencao-erros-caso-shu', 'Aprofundamento Avançado: Prevenção de Erros de Prescrição e Manejo da Síndrome Hemolítico-Urêmica por STEC', boost058);
appendSectionToBook('trauma-pelvico-e-geniturinario', 'sec-reforco-trauma-renal-aast-duplo-j', 'Aprofundamento Avançado: Classificação AAST de Trauma Renal, Manejo Conservador e Intervenção Urológica', boost067);
console.log('Reforço concluído com sucesso!');
