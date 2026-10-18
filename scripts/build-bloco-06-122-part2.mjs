// scripts/build-bloco-06-122-part2.mjs
// Aula 122: Perfuração de Víscera Oca - Parte 2: Seções 5 a 8 (Tratamento Cirúrgico, Patch de Graham, Casos e Questões)

export const sec5 = {
  id: 'tratamento-cirurgico-graham-patch-ressuscitacao-antibioticos',
  title: '5. Tratamento Cirúrgico de Emergência: Técnica de Graham (Patch de Omento), Ressecções e Manejo da Sepse Peritoneal',
  body_html: `
<h3>Princípios do Preparo Pré-Operatório e Ressuscitação Imediata na Peritonite</h3>
<p>O paciente com perfuração de víscera oca e peritonite aguda apresenta perda líquida maciça para a cavidade peritoneal e translocação endotóxica com risco iminente de choque séptico. A cirurgia é de emergência, mas <strong>o paciente não deve ser levado à mesa cirúrgica em choque descompensado sem ressuscitação inicial</strong>:</p>
<ol>
  <li><strong>Ressuscitação Volêmica Agressiva com Cristaloides Balanceados:</strong> Iniciar infusão imediata de 30 mL/kg de solução cristaloide balanceada (Ringer Lactato ou Plasma-Lyte) nas primeiras 2 a 3 horas, guiando a volemia pela restauração de PAM $\ge 65$ mmHg e débito urinário $\ge 0,5$ mL/kg/h;</li>
  <li><strong>Antibioticoterapia Intravenosa Precoce de Amplo Espectro:</strong> Administrada obrigatoriamente dentro da <strong>primeira hora do diagnóstico</strong>. O regime deve cobrir bacilos Gram-negativos entéricos e anaeróbios estritos:
    <ul>
      <li><em>Regime Padrão:</em> <strong>Ceftriaxona (2 g IV 1x/dia) associada a Metronidazol (500 mg IV a cada 8h)</strong> OU Ampicilina-Sulbactam (3 g IV a cada 6h);</li>
      <li><em>Pacientes Críticos em Choque Séptico de UTI ou Imunossuprimidos:</em> <strong>Piperacilina-Tazobactam (4,5 g IV a cada 6h)</strong> OU Meropenem (1 g IV a cada 8h) associado a antifúngico (Fluconazol ou Equinocandina) em perfurações de trato digestivo alto com peritonite prolongada;</li>
    </ul>
  </li>
  <li><strong>Descompressão Gástrica com Sonda Nasogástrica Aberta:</strong> Esvazia o conteúdo gástrico e biliopancreático retido, reduzindo o extravasamento contínuo de suco digestivo para a cavidade peritoneal;</li>
  <li><strong>Inibidor de Bomba de Prótons (IBP) em Altas Doses:</strong> Omeprazol ou Pantoprazol 80 mg em bólus IV seguido de infusão contínua ou 40 mg 12/12h para suprimir imediatamente a secreção de ácido gástrico.</li>
</ol>

<h3>A Cirurgia da Úlcera Péptica Perfurada: A Técnica de Graham e o Patch de Omento</h3>
<p>Na grande maioria das perfurações por úlcera duodenal ou gástrica antral (orifícios perfurativos com diâmetro $\le 2$ a 3 cm), a cirurgia tem como objetivo primário <strong>fechar a perfuração e lavar exaustivamente a cavidade, NÃO sendo necessária gastrectomia ou vagotomia na urgência</strong>:</p>

<div class="formula-box">
  <p><strong>A TÉCNICA CLÁSSICA DE GRAHAM (OMENTOPLASTIA COM PATCH DE GRAHAM):</strong></p>
  <p>Descrita por Roscoe Graham em 1937, é o <strong>procedimento cirúrgico padrão-ouro internacional para o fechamento de úlceras duodenais perfuradas</strong>:</p>
  <ol>
    <li><strong>Identificação da Perfuração:</strong> Localiza-se o orifício perfurativo na parede anterior do bulbo duodenal (frequentemente com diâmetro de 3 a 10 mm com bordas hiperemiadas e friáveis);</li>
    <li><strong>Passagem dos Pontos Seromusculares sem Nó Inicial:</strong> Passam-se três a quatro pontos simples com fio absorvível monofilamentar de absorção lenta (Polidioxanona / PDS 2-0 ou 3-0) ou inabsorvível (Vicryl ou Seda), transfixando a parede duodenal saudável de ambos os lados do orifício, mantendo os fios reparados sem dar nós;</li>
    <li><strong>Interposição do Segmento de Grande Omento Vascularizado:</strong> Mobiliza-se uma lingueta livre ou pediculada e ricamente vascularizada do <strong>grande omento (epíploon)</strong> e posiciona-se esse segmento de omento diretamente sobre o orifício perfurativo, sob os fios de sutura previamente passados;</li>
    <li><strong>Amarração dos Pontos sobre o Omento (Sem Tensão):</strong> Os nós são amarrados suavemente sobre a lingueta omental. <strong>O orifício da úlcera NÃO é suturado borda a borda sob tensão mecânica</strong> (a borda da úlcera é friável, edemaciada e isquêmica, e qualquer sutura direta sob tração rasgaria o tecido duodenal, causando fístula duodenal de alto débito pós-operatória catastrófica). O omento atua como uma "rolha biológica" viva e vascularizada que promove hemostasia, neovascularização rápida e cicatrização estanque hermética;</li>
    <li><strong>Técnica de Graham Modificada:</strong> Amarra-se primeiro os pontos aproximando as bordas frouxamente e depois amarra-se o omento por cima com as mesmas sobras de fio;</li>
    <li><strong>Abordagem Videolaparoscópica:</strong> O fechamento com patch de Graham pode ser executado com excelência e segurança por via videolaparoscópica em pacientes hemodinamicamente estáveis, reduzindo a dor pós-operatória e complicações de ferida.</li>
  </ol>
</div>

<h3>Conduta em Úlceras Gástricas Perfuradas: A Biópsia Obrigatória</h3>
<p>Existe uma diferença oncológica e técnica fundamental entre a úlcera duodenal e a úlcera gástrica perfurada:</p>
<ul>
  <li><strong>Úlceras Duodenais:</strong> São benignas em mais de 99% a 100% dos casos. Não exigem biópsia intraoperatória de rotina;</li>
  <li><strong>Úlceras Gástricas (Corpo, Antro ou Pequena Curvatura):</strong> <strong>Até 10% a 15% das úlceras gástricas perfuradas são, na realidade, um ADENOCARCINOMA GÁSTRICO ULCERADO E PERFURADO</strong>;</li>
  <li><strong>A Regra de Ouro da Úlcera Gástrica Perfurada:</strong> É <strong>MANDATÓRIA a realização de BIÓPSIA EM CUNHA DAS BORDAS DA ÚLCERA GÁSTRICA</strong> antes de realizar o fechamento com patch de Graham, enviando o material para exame anatomopatológico de congelação ou parafina para afastar malignidade. Se a úlcera gástrica for extensa, suspeita de neoplasia ou com destruição maciça do antro em paciente estável, a conduta pode exigir gastrectomia parcial com reconstrução à Billroth II ou Y de Roux.</li>
</ul>

<h3>A Importância Capital da Lavagem Peritoneal Exaustiva</h3>
<p>O sucesso do tratamento do abdome agudo perfurativo depende tanto do fechamento estanque do orifício quanto da eliminação completa dos contaminantes químicos e bacterianos dispersos no peritônio:</p>
<ul>
  <li>Realiza-se <strong>lavagem exaustiva de todos os recessos e compartimentos da cavidade peritoneal</strong> (espaço subfrênico direito e esquerdo, espaço sub-hepático de Morison, goteiras parietocólicas direita e esquerda e fundo de saco de Douglas) utilizando <strong>grandes volumes de Solução Salina Isotônica Aquecida a 37-38 ºC (habitualmente 6 a 10 litros de soro)</strong>;</li>
  <li>A aspiração cuidadosa deve remover todas as placas de fibrina, restos alimentares macroscópicos e coleções purulentas;</li>
  <li>O uso de soluções antissépticas tópicas (como clorexidina, iodo ou peróxido de hidrogênio) ou adição de antibióticos na solução de lavagem é <strong>formalmente proscrito</strong> (causam necrose química mesotelial adicional e aderências densas).</li>
</ul>

<h3>Condutas em Outras Perfurações Específicas do Trato Gastrointestinal</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Sítio e Causa da Perfuração</th>
      <th>Gravidade e Contaminação</th>
      <th>Procedimento Cirúrgico de Escolha Recomendado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Perfuração de Cólon Sigmoide (Diverticulite Hinchey IV / Neoplasia)</strong></td>
      <td>Peritonite Fecal Maciça de altíssimo risco séptico.</td>
      <td><strong>Cirurgia de Hartmann</strong> (sigmoidectomia com colostomia terminal em FIE e sepultamento do coto retal) em pacientes instáveis ou em choque; ressecção primária com anastomose e ileostomia de proteção em pacientes estáveis selecionados.</td>
    </tr>
    <tr>
      <td><strong>Perfuração Iatrogênica em Colonoscopia (Reconhecida Imediatamente)</strong></td>
      <td>Contaminação mínima (cólon preparado previamente e limpo).</td>
      <td>Se diagnosticada durante o próprio procedimento: <strong>Fechamento Endoscópico com Hemoclipes metálicos</strong> sob visualização direta. Se houver pneumoperitônio tenso com peritonite clínica ou falha do clipe: <em>Laparoscopia precoce com sutura simples primária</em> em dois planos.</td>
    </tr>
    <tr>
      <td><strong>Perfuração de Delgado por Corpo Estranho ou Trauma</strong></td>
      <td>Perfuração puntiforme em alça de jejuno ou íleo.</td>
      <td>Se orifício único pequeno: <strong>Enterorrafia primária transversa simples</strong> com sutura em plano único ou duplo. Se lesão extensa, isquêmica ou múltiplas perfurações próximas: <em>Enterectomia segmentar com anastomose primária término-terminal</em>.</td>
    </tr>
    <tr>
      <td><strong>Perfuração Duodenal Iatrogênica Pós-CPRE (Classificação de Stapfer Tipo I)</strong></td>
      <td>Laceração da parede lateral do duodeno pelo duodenoscópio.</td>
      <td>Geralmente cursa com grande extravasamento intraperitoneal ou retroperitoneal. Indicação de <strong>exploração cirúrgica precoce com duodenorrafia primária com patch de omento e drenagem tubular retroperitoneal ampla</strong>.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec6 = {
  id: 'casos-clinicos-estruturados-perfuracao',
  title: '6. Casos Clínicos Estruturados e Raciocínio Diagnóstico-Cirúrgico Passo a Passo',
  body_html: `
<h3>Caso Clínico 1: Dor em "Facada", Abdome em Tábua e Sinal de Jobert Positivo</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 48 anos, pedreiro, tabagista e etilista moderado, sem comorbidades conhecidas, refere uso diário crônico de diclofenaco de sódio 50 mg 3x/dia há cerca de 3 meses para dores lombares crônicas do trabalho. Comparece à emergência médica com história de dor abdominal súbita de início há cerca de 4 horas, que começou "como uma facada violenta" no epigástrio enquanto almoçava e rapidamente se espalhou por todo o abdome.</p>
  <p><strong>Exame Físico na Admissão:</strong> Paciente muito prostrado, sudoreico, pálido, taquipneico (FR 26 irpm superficial torácica), taquicárdico (FC 110 bpm), PA 115/75 mmHg e afebril no momento (T 36,9 ºC). Permanece rigorosamente imóvel na maca, com as pernas fletidas, queixando-se de dor insuportável a qualquer tosse ou movimentação da maca.</p>
  <p><strong>Palpação e Percussão do Abdome:</strong></p>
  <ul>
    <li>Abdome plano, tenso, com <strong>hipertonia muscular involuntária generalizada e contratura espasmódica difusa que impede qualquer depressão parietal (Abdome em Tábua clássico)</strong>;</li>
    <li>Descompressão brusca dolorosa difusa intensamente positiva em todos os quatro quadrantes (Sinal de Blumberg generalizado);</li>
    <li><strong>À percussão da linha axilar anterior e hemiclavicular direita: nota-se desaparecimento completo da macicez hepática fisiológica, substituída por som francamente TIMPÂNICO sobre o lobo direito do fígado (Sinal de Jobert Positivo)</strong>;</li>
    <li>Ruídos hidroaéreos completamente abolidos.</li>
  </ul>
  <p><strong>Rotina Radiológica de Abdome Agudo:</strong> A radiografia de tórax em posição ortostática revela <strong>volumoso pneumoperitônio desenhando uma lâmina gasosa semilunar radiotransparente sob ambas as hemicúpulas diafragmáticas</strong> (mais evidente à direita, medindo cerca de 1,5 cm de espessura).</p>
  <p><strong>Discussão Diagnóstica e Conduta Terapêutica Imediata:</strong></p>
  <ul>
    <li><em>Diagnóstico Clínico-Radiológico:</em> <strong>Abdome Agudo Perfurativo por Úlcera Péptica Gastroduodenal Perfurada</strong> secundária ao uso crônico abusivo de AINEs;</li>
    <li><em>A Semiologia Clássica:</em> A tríade de início em facada, abdome em tábua com peritonite generalizada e <strong>Sinal de Jobert positivo</strong> correlaciona-se de forma patognomônica com o pneumoperitônio visível na radiografia sob as cúpulas frênicas;</li>
    <li><em>Conduta Médica Imediata:</em>
      <ol>
        <li>Jejum oral absoluto e passagem de sonda nasogástrica calibrosa aberta em frasco coletor;</li>
        <li>Ressuscitação volêmica vigorosa com cristaloide balanceado (Ringer Lactato) e cateter vesical para monitorização horária de débito urinário;</li>
        <li>Antibioticoterapia intravenosa imediata de amplo espectro na primeira hora: <strong>Ceftriaxona 2 g IV associada a Metronidazol 500 mg IV</strong>;</li>
        <li>Inibidor de bomba de prótons em altas doses (Omeprazol 80 mg IV em bólus);</li>
        <li><strong>Laparotomia Exploradora de Emergência (ou Videolaparoscopia):</strong> Acesso à cavidade, confirmação de perfuração de 6 mm na parede anterior do bulbo duodenal, aspiração do suco gástrico, realização da <strong>Técnica de Graham (rafia com interposição de patch de grande omento vascularizado)</strong> e <strong>lavagem exaustiva da cavidade peritoneal com 8 litros de soro fisiológico aquecido</strong>. Não há necessidade de gastrectomia ou vagotomia de urgência;</li>
        <li>No pós-operatório: erradicação formal do <em>Helicobacter pylori</em> e suspensão definitiva de AINEs.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 2: Peritonite Tardia e Pneumatose em Idosa Acamada</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 79 anos, acamada com demência avançada e cardiopata grave em uso crônico de digoxina e furosemida, é trazida à UPA por familiares que notaram distensão abdominal progressiva, febre diária e gemência aos mínimos toques no abdome há cerca de 36 horas.</p>
  <p><strong>Exame Físico:</strong> REG, torporosa, desidratada grave +++/4+, taquipneica (FR 30 irpm), hipotensa com <strong>PA 80/50 mmHg (PAM 60 mmHg)</strong>, taquicárdica (FC 128 bpm) e febril (T 38,8 ºC). Abdome maciçamente distendido, difusamente doloroso com defesa muscular involuntária e Blumberg generalizado. A paciente não tolera a posição sentada ou ortostática.</p>
  <p><strong>Propedêutica Armada de Emergência:</strong></p>
  <ul>
    <li>Como a paciente não consegue ficar em pé para radiografia de tórax, é realizada a <strong>Radiografia de abdome em decúbito lateral esquerdo com raios horizontais (Incidência de Hjelm-Laurell)</strong>: demonstra uma faixa contínua de ar livre radiotransparente interposta entre a borda lateral do fígado e a parede lateral direita do abdome;</li>
    <li>A radiografia de abdome em decúbito dorsal revela alças de delgado com as paredes interna e externa delineadas por ar (<strong>Sinal de Rigler / Sinal da Dupla Parede</strong>);</li>
    <li>Gasometria arterial: acidose metabólica grave com pH 7,20, HCO3- 11 mEq/L e Lactato de 4,6 mmol/L; Leucócitos: 21.000/mm³ com 15% de bastonetes.</li>
  </ul>
  <p><strong>Discussão e Conduta:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Abdome Agudo Perfurativo Complicado com Choque Séptico e Peritonite Bacteriana Generalizada Tardia</strong> (com mais de 36 horas de evolução);</li>
    <li><em>Conduta:</em> Ressuscitação com noradrenalina em UTI, reposição volêmica, antibioticoterapia venosa com Piperacilina-Tazobactam e laparotomia exploradora de urgência de controle de danos (encontrando perfuração diverticular de cólon sigmoide Hinchey IV com peritonite fecal e realização de Cirurgia de Hartmann).</li>
  </ul>
</div>

<h3>Caso Clínico 3: Perfuração Iatrogênica Pós-Colonoscopia com Polipectomia</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 62 anos foi submetido a colonoscopia eletiva para rastreamento de câncer colorretal há 18 horas, na qual foi realizada polipectomia com alça diatérmica de um pólipo séssil de 2,5 cm no cólon descendente. Recebeu alta após a recuperação anestésica sem queixas imediatas. Retorna ao serviço de emergência queixando-se de dor abdominal progressiva no flanco esquerdo e febre baixa (38,0 ºC) que se iniciou cerca de 8 horas após o procedimento.</p>
  <p><strong>Exame Físico:</strong> Lúcido, orientado, eupneico. PA 125/80 mmHg, FC 92 bpm. Abdome moderadamente doloroso à palpação no flanco esquerdo e FIE, com discreta defesa muscular localizada e descompressão brusca discretamente dolorosa no quadrante inferior esquerdo.</p>
  <p><strong>Tomografia Computadorizada de Abdome com Contraste IV:</strong> Demonstra pequeno foco de gás extraluminal pericólico retroperitoneal restrito à gordura adjacente ao cólon descendente no sítio prévio da polipectomia, com espessamento parietal local discreto e <strong>ausência de pneumoperitônio livre generalizado ou líquido livre na cavidade</strong>.</p>
  <p><strong>Discussão e Conduta Terapêutica:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Síndrome Pós-Polipectomia (Eletrocoagulação Térmica Transmural) vs Microperfuração Cólica Iatrogênica Bloqueada</strong>;</li>
    <li><em>Raciocínio Clínico:</em> Como o cólon foi previamente preparado com excelente limpeza e o paciente está estável hemodinamicamente, com peritonite apenas focal restrita e sem pneumoperitônio maciço difuso, o tratamento <strong>CONSERVADOR INICIAL É SEGURO E INDICADO</strong>;</li>
    <li><em>Conduta:</em> Internação hospitalar, jejum absoluto inicial, hidratação parenteral com cristaloide, <strong>Antibioticoterapia Intravenosa de Amplo Espectro cobrindo flora entérica (Ceftriaxona + Metronidazol)</strong> e vigilância clínica e laboratorial seriada rigorosa a cada 4 a 6 horas. Se o paciente evoluir com peritonite difusa, febre alta persistente ou piora da leucocitose, indica-se exploração cirúrgica laparoscópica imediata.</li>
  </ul>
</div>
`
};

export const sec7 = {
  id: 'questoes-concurso-comentadas-perfuracao',
  title: '7. Questões de Concursos de Residência Médica e Título de Cirurgia Geral Comentadas Passo a Passo',
  body_html: `
<h3>Questão 1 (USP-SP / Residência Médica em Cirurgia)</h3>
<p>Homem de 45 anos, previamente hígido, relata dor epigástrica súbita em facada de início há 3 horas, de intensidade insuportável, que se generalizou por todo o abdome. Ao exame físico, o paciente apresenta-se sudoreico e pálido, com membros inferiores fletidos na maca. O abdome apresenta contratura muscular involuntária generalizada e descompressão brusca dolorosa em todos os quadrantes. À percussão do tórax e abdome, o cirurgião constata <strong>desaparecimento da macicez hepática fisiológica, substituída por timpanismo na linha hemiclavicular direita (Sinal de Jobert positivo)</strong>. A radiografia de tórax em posição ortostática confirma volumoso pneumoperitônio subdiafragmático. Em relação ao diagnóstico mais provável e à conduta operatória de escolha, assinale a opção correta:</p>

<ol type="A">
  <li>Pancreatite aguda biliar necrosante; indicar colangiopancreatografia retrógrada endoscópica de urgência para papilotomia.</li>
  <li>Úlcera duodenal perfurada na parede anterior; indicar laparotomia com fechamento da perfuração por rafia simples e tamponamento com patch de grande omento vascularizado (Técnica de Graham) associada à lavagem peritoneal exaustiva.</li>
  <li>Colecistite aguda perfurada; indicar colecistostomia percutânea e punção descompressiva do ceco sob anestesia local.</li>
  <li>Diverticulite cecal perfurada; realizar obrigatoriamente colectomia total com ileostomia definitiva.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A apresentação é a clássica do <strong>Abdome Agudo Perfurativo por Úlcera Duodenal Perfurada</strong>: dor súbita em facada, abdome em tábua com peritonite generalizada e o patognomônico <strong>Sinal de Jobert</strong> (timpanismo sobre o fígado por ar livre no peritônio). As úlceras perfuradas ocorrem tipicamente na parede anterior do bulbo duodenal. O procedimento cirúrgico padrão-ouro internacional é a <strong>Técnica de Graham (fechamento com sutura e interposição de patch de omento vascularizado pediculado)</strong> associada à lavagem exaustiva da cavidade com soro aquecido (Alternativa B correta). Não se faz gastrectomia de urgência na maioria dos casos.</p>

<hr>

<h3>Questão 2 (ENAMED / Revalidação e Residência Médica Nacional)</h3>
<p>Uma idosa de 82 anos, internada na enfermaria de clínica médica com suspeita de abdome agudo perfurativo e febre, apresenta fraqueza extrema e não tem condições de permanecer sentada ou de pé para a realização das radiografias da rotina convencional de abdome agudo. Qual é a <strong>incidência radiológica alternativa recomendada</strong> para a pesquisa de pneumoperitônio nesta paciente impossibilitada de adotar a posição ortostática?</p>

<ol type="A">
  <li>Radiografia de tórax em decúbito ventral estrito com raios verticais.</li>
  <li>Radiografia de abdome em decúbito lateral esquerdo com raios horizontais (Incidência de Hjelm-Laurell).</li>
  <li>Radiografia de crânio em posição de Waters com feixe oblíquo.</li>
  <li>Radiografia de bacia em posição de rã com tração dos membros inferiores.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> Quando o paciente não consegue ficar de pé (ortostase) para a clássica radiografia de tórax em PA, a conduta formal mandatória é a realização da <strong>Radiografia de abdome em decúbito lateral esquerdo com raios horizontais (Hjelm-Laurell)</strong>. Nessa posição, o paciente deita-se sobre o lado esquerdo; o ar livre intraperitoneal ascende e acumula-se entre a <strong>borda lateral direita do fígado e a parede lateral direita do abdome</strong>, sendo facilmente visualizado como uma faixa escura contrastada pela radiopacidade homogênea hepática (Alternativa B correta).</p>

<hr>

<h3>Questão 3 (SURCE - Seleção Unificada para Residência Médica do Ceará)</h3>
<p>Durante a avaliação de uma radiografia de abdome em decúbito dorsal de um paciente vítima de trauma abdominal fechado com suspeita de rotura de víscera oca, o médico plantonista observa que <strong>a parede de uma alça de intestino delgado está visível como uma linha fina branca, com ar delimitando simultaneamente a sua superfície interna intraluminal e a sua superfície externa extraluminal peritoneal</strong>. Como é denominado esse clássico sinal radiológico de pneumoperitônio?</p>

<ol type="A">
  <li>Sinal de Cullen.</li>
  <li>Sinal de Rigler (ou Sinal da Dupla Parede).</li>
  <li>Sinal de Grey-Turner.</li>
  <li>Sinal de Courvoisier-Terrier.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O <strong>Sinal de Rigler (ou Sinal da Dupla Parede)</strong> é o sinal radiológico clássico de pneumoperitônio visualizado na radiografia simples em decúbito dorsal. Em condições fisiológicas normais, apenas a mucosa interna da alça entra em contato com o ar intraluminal, enquanto a superfície serosa externa encosta em alças vizinhas ou líquido peritoneal com densidade de partes moles, tornando a espessura da parede invisível. Quando há ar livre na cavidade peritoneal, o gás envolve a face externa da serosa enquanto o gás luminal contrasta a mucosa, tornando a parede intestinal visível dos dois lados como uma fina fita radiopaca (Alternativa B correta).</p>

<hr>

<h3>Questão 4 (UNICAMP - Universidade Estadual de Campinas)</h3>
<p>Paciente feminina de 58 anos é submetida à laparotomia de urgência por abdome agudo perfurativo. No intraoperatório, é encontrada uma perfuração de 1,5 cm na <strong>pequena curvatura gástrica (úlcera gástrica perfurada)</strong> com peritonite química associada. Em relação à abordagem cirúrgica específica da úlcera gástrica perfurada comparada à úlcera duodenal, qual detalhe cirúrgico é <strong>MANDATÓRIO</strong>?</p>

<ol type="A">
  <li>Realizar biópsia em cunha das bordas da úlcera gástrica para exame anatomopatológico a fim de excluir adenocarcinoma gástrico perfurado, visto que úlceras gástricas podem representar malignidade oculta em até 10% a 15% dos casos.</li>
  <li>É formalmente proibido biopsiar a úlcera gástrica devido ao risco de disseminação peritoneal bacteriana.</li>
  <li>Realizar obrigatoriamente esofagectomia distal com transposição de cólon direito de urgência.</li>
  <li>Suturar a úlcera gástrica sem omento e administrar injeção intralesional de adrenalina em quatro quadrantes.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> Ao contrário da úlcera duodenal (que é praticamente sempre benigna), <strong>a úlcera gástrica perfurada pode albergar um adenocarcinoma gástrico subjacente em até 10% a 15% dos casos</strong>. Por esse motivo, é <strong>mandatória a realização de biópsia em cunha das bordas da úlcera</strong> para análise histopatológica antes do fechamento com omentoplastia (Alternativa A correta). Caso o anatomopatológico revele adenocarcinoma, a paciente deverá ser programada para gastrectomia oncológica com linfadenectomia após a recuperação da sepse.</p>

<hr>

<h3>Questão 5 (UERJ - Universidade do Estado do Rio de Janeiro)</h3>
<p>Qual das seguintes afecções clínicas pode provocar uma falsa impressão de pneumoperitônio e falso Sinal de Jobert positivo em radiografia de tórax e exame físico, decorrente da interposição anatômica congênita ou adquirida do cólon entre o fígado e o diafragma?</p>

<ol type="A">
  <li>Síndrome de Boerhaave.</li>
  <li>Síndrome de Chilaiditi.</li>
  <li>Síndrome de Mallory-Weiss.</li>
  <li>Síndrome de Zollinger-Ellison.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O <strong>Sinal de Chilaiditi</strong> (ou Síndrome de Chilaiditi quando sintomática) é a <strong>interposição hepatodiagnóstica do cólon (ou intestino delgado)</strong> entre o fígado e a cúpula frênica direita. Na radiografia de tórax, mimetiza um pneumoperitônio; contudo, a análise cuidadosa revela a presença de pregas e haustrações colônicas típicas no ar interposto, e o paciente não apresenta dor peritoneal ou abdome agudo (Alternativa B correta). Boerhaave é rotura esofágica; Mallory-Weiss é laceração da transição esofagogástrica pós-vômitos; Zollinger-Ellison é gastrinoma.</p>

<hr>

<h3>Questão 6 (IAMSPE - Instituto de Assistência Médica ao Servidor Público Estadual)</h3>
<p>Em relação à antibioticoterapia de emergência no paciente com peritonite generalizada por perfuração de víscera oca, assinale a opção que descreve a conduta e o espectro antimicrobiano mais adequados:</p>

<ol type="A">
  <li>Aguardar o resultado da cultura bacteriana com antibiograma colhida durante a cirurgia por 72 horas antes de prescrever qualquer antimicrobiano.</li>
  <li>Prescrever monoterapia com vancomicina oral para cobertura de bactérias Gram-positivas esfoliativas.</li>
  <li>Iniciar antibioticoterapia intravenosa de amplo espectro na primeira hora da admissão, cobrindo bacilos Gram-negativos entéricos e bactérias anaeróbias estritas (com destaque para o Bacteroides fragilis).</li>
  <li>Administrar apenas colírio oftálmico com ciprofloxacino para desinfecção do ducto lacrimonasal.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O manejo da sepse peritoneal por perfuração de víscera oca exige o início de <strong>antibioticoterapia de amplo espectro na primeira hora (Golden Hour da sepse)</strong>, cobrindo bacilos Gram-negativos entéricos (<em>E. coli</em>, <em>Klebsiella</em>) e anaeróbios estritos da flora colônica e intestinal (com destaque absoluto para <em>Bacteroides fragilis</em>) — como Ceftriaxona associada a Metronidazol, ou Piperacilina-Tazobactam (Alternativa C correta). Postergar o início para aguardar antibiograma (Alternativa A) acarreta choque séptico descontrolado e morte.</p>
`
};

export const sec8 = {
  id: 'conclusao-recomendações-finais-referencias-perfuracao',
  title: '8. Síntese Terapêutica Integrada e Referências Internacionais Oficiais',
  body_html: `
<h3>Algoritmo Decisório Prático no Abdome Agudo Perfurativo</h3>
<ol>
  <li><strong>Reconhecimento Clínico Cardinal:</strong> Dor abdominal súbita em "facada" + Abdome em tábua + <strong>Sinal de Jobert positivo</strong> (timpanismo pré-hepático);</li>
  <li><strong>Rotina de Imagem Imediata:</strong> Radiografia de tórax em PA em ortostase (pesquisa de pneumoperitônio) ou incidência em decúbito lateral esquerdo com raios horizontais (Hjelm-Laurell) se acamado; TC de abdome com contraste IV se estabilidade hemodinâmica para identificar sítio e etiologia precisa;</li>
  <li><strong>Ressuscitação da Primeira Hora:</strong> Dois acessos venosos calibrosos, expansão com cristaloide balanceado, sonda nasogástrica aberta, IBP venoso e <strong>Antibioticoterapia de amplo espectro (Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam)</strong>;</li>
  <li><strong>Abordagem Cirúrgica Específica:</strong>
    <ul>
      <li><em>Úlcera Duodenal Perfurada:</em> <strong>Técnica de Graham (patch de omento pediculado vascularizado sobre o orifício)</strong> + Lavagem exaustiva da cavidade com grande volume de soro salino aquecido;</li>
      <li><em>Úlcera Gástrica Perfurada:</em> <strong>Biópsia em cunha das bordas mandatória</strong> para afastar adenocarcinoma gástrico + patch de Graham;</li>
      <li><em>Diverticulite Cólica Perfurada Hinchey IV:</em> <strong>Cirurgia de Hartmann</strong> de emergência;</li>
    </ul>
  </li>
  <li><strong>Pós-Operatório:</strong> Manutenção de antibioticoterapia por 4 a 7 dias guiada por controle do foco e marcadores inflamatórios, erradicação do <em>H. pylori</em> e suspensão definitiva de fármacos ulcerogênicos (AINEs).</li>
</ol>
`
};

export const bookReferencesPerfuracao = [
  {
    label: 'World Society of Emergency Surgery (WSES) — Guidelines for the management of perforated peptic ulcer',
    url: 'https://wjes.biomedcentral.com/articles/10.1186/s13017-020-00325-0'
  },
  {
    label: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021',
    url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines'
  },
  {
    label: 'Colégio Brasileiro de Cirurgiões (CBC) — Diretrizes no Manejo do Abdome Agudo Perfurativo',
    url: 'https://cbc.org.br/'
  },
  {
    label: 'American College of Radiology (ACR) — ACR Appropriateness Criteria: Acute Nonlocalized Abdominal Pain',
    url: 'https://www.acr.org/Clinical-Resources/ACR-Appropriateness-Criteria'
  },
  {
    label: 'New England Journal of Medicine (NEJM) — Perforated Peptic Ulcer and Surgical Repair',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMicm1902801'
  }
];
