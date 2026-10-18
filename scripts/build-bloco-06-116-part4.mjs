// Bloco 6 - Aula 116: Síndromes Glomerulares (Parte 4: Seções 16 a 19)

export const sec16 = {
  id: 'terapia-imunossupressora-moderna-e-biologicos-em-glomerulopatias',
  title: '16. Farmacologia Avançada em Glomerulopatias: Imunobiológicos, Inibidores de Calcineurina e Nefroproteção',
  body_html: `
<h3>A Mudança de Paradigma: Da Corticoterapia Empírica aos Alvos Moleculares Específicos</h3>
<p>Durante décadas, a abordagem das doenças glomerulares esteve restrita ao uso indiscriminado de corticosteroides sistêmicos em altas doses e imunossupressores citotóxicos não seletivos (como a ciclofosfamida oral contínua), acarretando custos biológicos devastadores aos pacientes sob a forma de sepse grave, necrose avascular da cabeça do fêmur, diabetes esteroidal, catarata precoce, cistite hemorrágica e infertilidade definitiva por falência gonadal prematura. Na última década, o advento da biologia molecular e a elucidação das vias patogênicas celulares transformaram o manejo das glomerulopatias através de agentes biológicos e poupadores de corticoide:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classe Farmacológica / Fármaco</th>
      <th>Mecanismo de Ação Molecular Preciso</th>
      <th>Principais Indicações Glomerulares</th>
      <th>Efeitos Adversos e Monitorização Obrigatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rituximabe</strong><br>(Anticorpo Monoclonal Quimérico Anti-CD20)</td>
      <td>Liga-se especificamente ao antígeno transmembrana CD20 presente na superfície de linfócitos pré-B e B maduros, deflagrando <strong>depleção profunda e seletiva de linfócitos B por citotoxicidade dependente de anticorpos (ADCC) e apoptose</strong>.</td>
      <td>• Glomerulopatia Membranosa Anti-PLA2R positiva;<br>• Vasculites Associadas ao ANCA (indução e manutenção de GPA/PAM);<br>• Doença por Lesões Mínimas corticoide-dependente ou frequentemente recidivante no adulto;<br>• Nefrite Lúpica refratária.</td>
      <td>Reações anafiláticas infusionais imediatas; hipogamaglobulinemia secundária e reativação fatal do <strong>Vírus da Hepatite B (triagem prévia obrigatória com HBsAg e Anti-HBc total!)</strong> e leucoencefalopatia multifocal progressiva (PML por vírus JC).</td>
    </tr>
    <tr>
      <td><strong>Inibidores de Calcineurina (CNIs)</strong><br>(Ciclosporina e Tacrolimus)</td>
      <td>Ligam-se a imunofilinas intracelulares (ciclofilina e FKBP-12), inibindo a fosfatase calcineurina e <strong>bloqueando a translocação nuclear do fator de transcrição NFAT</strong>, suprimindo a síntese de Interleucina-2 (IL-2). Além disso, possuem <strong>efeito estabilizador direto sobre o citoesqueleto de actina do podócito (efeito antiproteinúrico não imune)</strong> mediado pela sinaptopodina.</td>
      <td>• GESF primária córtico-resistente;<br>• Glomerulopatia Membranosa (como alternativa ao rituximabe);<br>• Nefrite Lúpica (esquema multitarget).</td>
      <td><strong>Nefrotoxicidade hemodinâmica e crônica</strong> (vasoconstrição da arteríola aferente com declínio transitório da TFG e fibrose intersticial em faixa com arteriopatia hialina); hipertensão, tremores e dislipidemia. <strong>Exigem monitorização sérica estrita do nível de vale (trough level)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Micofenolato de Mofetila (MMF) e Micofenolato Sódico</strong></td>
      <td>Inibidor potente, não competitivo e reversível da <strong>Inosina Monofosfato Desidrogenase (IMPDH)</strong>, bloqueando a via <em>de novo</em> de síntese de nucleotídeos de guanina (purinas), inibindo seletivamente a proliferação clonal de linfócitos T e B.</td>
      <td>• Terapia de indução e manutenção da Nefrite Lúpica Classes III e IV (Protocolo de escolha em mulheres jovens para preservar a reserva ovariana);<br>• Manutenção de vasculites ANCA.</td>
      <td>Toxicidade gastrointestinal (diarreia volumosa, náuseas, dor abdominal); leucopenia e teratogenicidade grave (contraindicado na gestação).</td>
    </tr>
    <tr>
      <td><strong>Inibidores de SGLT2 (Gliflozinas)</strong><br>(Dapagliflozina, Empagliflozina)</td>
      <td>Bloqueiam o cotransportador sódio-glicose 2 no túbulo proximal, aumentando o aporte de NaCl na mácula densa e <strong>restaurando o feedback tubuloglomerular com vasoconstrição da arteríola aferente</strong>, reduzindo a hipertensão intraglomerular e a proteinúria.</td>
      <td><strong>Nefroproteção universal mandatória</strong> em pacientes com Doença Renal Crônica proteinúrica diabética ou não diabética com TFG &ge; 20-25 mL/min/1,73m².</td>
      <td>Infecções fúngicas genitais micóticas (candidíase vulvovaginal / balanite) e risco raro de cetoacidose diabética euglicêmica.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec17 = {
  id: 'complicacoes-sistemicas-da-sindrome-nefrotica-e-manejo',
  title: '17. Complicações Sistêmicas da Síndrome Nefrótica: Fisiopatologia Trombótica, Infecciosa e Dislipidêmica',
  body_html: `
<h3>O Estado de Hipercoagulabilidade Nefrótica e a Tríade de Virchow</h3>
<p>O paciente portador de síndrome nefrótica grave encontra-se sob risco constante de trombose venosa profunda e embolia pulmonar decorrente de um desbalanço hemodinâmico e hemostático profundo induzido pela perda urinária seletiva de fatores anticoagulantes combinada com a hiperestimulação da síntese hepática compensatória:</p>

<ol>
  <li><strong>Perda Urinária de Fatores Anticoagulantes Naturais:</strong> A <strong>Antitrombina III (AT-III)</strong> possui peso molecular de aproximadamente 58 kDa (menor que o da albumina), sendo excretada maciçamente na urina nefrótica, resultando em níveis plasmáticos criticamente deprimidos de AT-III. Há perda associada de <strong>Proteína S livre</strong> e plasminogênio;</li>
  <li><strong>Hiperprodução Hepática Reativa de Fatores Pró-Coagulantes:</strong> Em resposta à queda da pressão oncótica plasmática, o fígado aumenta desordenadamente a síntese de proteínas de alto peso molecular que não passam na urina: <strong>Fibrinogênio (Fator I), Fator V, Fator VIII, Fator de von Willebrand e $\alpha_2$-macroglobulina</strong>;</li>
  <li><strong>Hiper-reatividade Plaquetária e Hemoconcentração:</strong> A hipovolemia intravascular e o uso agressivo de diuréticos de alça aumentam a viscosidade sanguínea, enquanto as plaquetas tornam-se hiperagregáveis;</li>
  <li><strong>Diretriz de Anticoagulação Profilática:</strong> Indicada formalmente em pacientes com <strong>Nefropatia Membranosa que apresentem Albumina Sérica $&lt; 2,0 - 2,5\\text{ g/dL}$</strong> associada a fatores adicionais de risco (proteinúria &gt; 10 g/24h, IMC &gt; 35 kg/m², insuficiência cardíaca ou imobilização), utilizando Heparina de Baixo Peso Molecular ou Varfarina até a remissão parcial da síndrome nefrótica.</li>
</ol>

<h3>A Suscetibilidade Infecciosa Extrema por Germes Encapsulados</h3>
<p>A infecção bacteriana bacterêmica é uma das principais causas de óbito precoce em crianças e adultos nefróticos:</p>
<ul>
  <li><strong>Mecanismo Imunológico de Deficiência:</strong> Ocorre perda urinária acentuada de <strong>Imunoglobulina G (IgG)</strong> e das proteínas da via alternativa do complemento (notadamente o <strong>Fator B e o Fator D</strong>), resultando em defeito grave na opsonização bacteriana;</li>
  <li><strong>A Temida Peritonite Bacteriana Espontânea (PBE) Nefrótica:</strong> O líquido ascítico acumulado na anasarca nefrótica possui níveis irrisórios de proteínas opsonizantes e imunoglobulinas, tornando-se um caldo de cultura perfeito para a translocação e proliferação bacteriana. O patógeno causal absoluto e clássico é o <strong><em>Streptococcus pneumoniae</em> (Pneumococo)</strong>, seguido por bacilos Gram-negativos (<em>E. coli</em>);</li>
  <li><strong>Imunização Obrigatória:</strong> Todo paciente nefrótico deve receber vacinação atualizada contra <strong>Pneumococo (VPC13 conjugada seguida de VPP23 polissacarídica)</strong>, vacina contra Influenza anual e Meningococo. Vacinas de vírus vivos atenuados (como sarampo, caxumba, rubéola e varicela) são contraindicadas durante o uso de imunossupressores em altas doses.</li>
</ul>

<h3>A Dislipidemia Aterogênica e a Lipidúria</h3>
<p>A hipoalbuminemia estimula a transcrição hepática da enzima <strong>HMG-CoA redutase</strong>, aumentando vertiginosamente a síntese de colesterol e triglicerídeos (Colesterol Total frequentemente &gt; 400 a 600 mg/dL com elevação maciça de LDL e ApoB). Concomitantemente, há redução do clearance periférico de quilomícrons pela perda urinária da <em>Lecitina-Colesterol Aciltransferase (LCAT)</em>. Os lipídios filtrados nos glomérulos são reabsorvidos pelas células tubulares proximais que se rompem na luz, gerando os patognomônicos <strong>Corpos Orais Graxos</strong> e a <strong>Birefringência em Cruz de Malta</strong> visualizada no sedimento urinário sob microscópio de luz polarizada.</p>
`
};

export const sec18 = {
  id: 'algoritmo-geral-de-conduta-nas-sindromes-glomerulares',
  title: '18. Fluxograma Racional e Algoritmo Diagnóstico Unificado em Doenças Glomerulares',
  body_html: `
<h3>O Passo a Passo do Raciocínio Clínico Nefrológico</h3>
<ol>
  <li><strong>Passo 1: Avaliar o Sedimento Urinário e a Faixa de Proteinúria:</strong>
    <ul>
      <li><strong>Sedimento Ativo com Hematúria Dismórfica (&gt; 50%), Acantócitos (&gt; 5%) e Cilindros Hemáticos associados a HAS e Edema:</strong> Síndrome Nefrítica $\rightarrow$ Prosseguir para Passo 2;</li>
      <li><strong>Proteinúria Maciça (&gt; 3,5 g/24h), Hipoalbuminemia (&lt; 3,0 g/dL), Anasarca e Sedimento Celularmente Pobre com Gotas Graxas em Cruz de Malta:</strong> Síndrome Nefrótica $\rightarrow$ Prosseguir para Passo 3;</li>
      <li><strong>Perda Aguda Severa da Função Renal com Hematúria Dismórfica em dias/semanas:</strong> Glomerulonefrite Rapidamente Progressiva (GNRP) $\rightarrow$ Biópsia renal de emergência e dosagem de ANCA e Anti-MBG;</li>
    </ul>
  </li>
  <li><strong>Passo 2: Investigação Etiológica da Síndrome Nefrítica pelo Complemento Sérico (C3 e C4):</strong>
    <ul>
      <li><strong>Com Queda Transitória de Complemento (C3/CH50 baixo):</strong>
        <ul>
          <li>Histórico de faringite há 1-3 sem ou piodermite há 2-6 sem com ASLO/Anti-DNAse B positiva $\rightarrow$ <strong>GNPE</strong> (suporte clínico, C3 deve normalizar em 8 semanas; biópsia apenas se atípico);</li>
        </ul>
      </li>
      <li><strong>Com Queda Crônica e Persistente de Complemento (C3 e C4 baixos):</strong>
        <ul>
          <li>FAN e Anti-DNA reagentes $\rightarrow$ <strong>Nefrite Lúpica</strong> (biópsia obrigatória);</li>
          <li>Sorologia HCV positiva, crioglobulinas e fator reumatoide $\rightarrow$ <strong>Crioglobulinemia / GNMP</strong>;</li>
          <li>Sopro cardíaco e febre $\rightarrow$ <strong>Endocardite Bacteriana Subaguda</strong>;</li>
        </ul>
      </li>
      <li><strong>Com Complemento Estritamente NORMAL:</strong>
        <ul>
          <li>Hematúria macroscópica sinfrangítica recorrente sem latência $\rightarrow$ <strong>Nefropatia por IgA (Berger)</strong>;</li>
          <li>Púrpura palpável em membros inferiores, dor abdominal e artrite $\rightarrow$ <strong>Púrpura de Henoch-Schönlein (Vasculite por IgA)</strong>;</li>
          <li>Crescentes e perda rápida de função $\rightarrow$ <strong>Vasculites ANCA ou Goodpasture</strong>;</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>Passo 3: Investigação Etiológica da Síndrome Nefrótica no Adulto:</strong>
    <ul>
      <li>Adulto branco &gt; 50 anos: solicitar <strong>Anti-PLA2R</strong> (positivo confirma Nefropatia Membranosa; investigar neoplasia oculta se negativo);</li>
      <li>Afrodescendente, jovem, obesidade ou HIV: forte suspeita de <strong>GESF</strong>;</li>
      <li>Adulto jovem com início explosivo pós-AINE ou pós-virose: <strong>Doença por Lesões Mínimas</strong>;</li>
      <li>Idoso com neuropatia, insuficiência cardíaca com baixa voltagem e macroglossia: <strong>Amiloidose AL</strong> (biópsia com Vermelho Congo revelando verde-maçã sob luz polarizada);</li>
      <li><strong>Regra de Ouro do Adulto:</strong> Salvo contraindicação absoluta ou anti-PLA2R positivo com apresentação clássica, <strong>a Biópsia Renal Percutânea é OBRIGATÓRIA</strong> para guiar a imunossupressão.</li>
    </ul>
  </li>
</ol>
`
};

export const sec19 = {
  id: 'bateria-de-questoes-comentadas-top-tier-complementares-glomerulares',
  title: '19. Questões de Concursos Top-Tier: PTT, Amiloidose e Manejo Farmacológico',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Raciocínio Clínico Aprofundado</h3>

<h4>Questão 6: FMUSP — Diagnóstico e Manejo de Emergência da PTT</h4>
<p><strong>Enunciado:</strong> Mulher de 32 anos dá entrada no pronto-socorro trazida por familiares devido a quadro de confusão mental flutuante, cefaleia intensa e sonolência nas últimas 24 horas. Ao exame físico, encontra-se ictérica (zona II de Kramer), febril (38,2°C), com petéquias disseminadas em membros inferiores e abdome. Não há sinais meníngeos ou déficits motores focais. Os exames laboratoriais revelam: Hemoglobina = 7,1 g/dL; Plaquetas = 14.000/mm³; Creatinina = 1,5 mg/dL; Coagulograma (TAP/INR e TTPA) rigorosamente normal; Coombs Direto negativo; Haptoglobina indetectável; LDH = 3.100 U/L; e a lâmina de sangue periférico demonstra presença de 5% de esquizócitos. Diante deste quadro clínico de extrema gravidade, a conduta terapêutica imediata mandatória que reduz drasticamente a mortalidade da paciente é:</p>
<p>A) Realizar transfusão imediata de 2 concentrados de plaquetas em bólus.<br>
B) Iniciar Plasmaférese Terapêutica de Urgência (troca plasmática diária) associada a Corticosteroides sistêmicos.<br>
C) Prescrever imunoglobulina humana intravenosa em dose única e esplenectomia de emergência.<br>
D) Iniciar hemodiálise de urgência por cateter venoso central duplo lúmen.<br>
E) Administrar concentrado de complexo protrombínico e vitamina K intravenosa.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A paciente apresenta a clássica pêntade da <strong>Púrpura Trombocitopênica Trombótica (PTT)</strong>: Anemia Hemolítica Microangiopática (com esquizócitos e LDH astronômico) + Plaquetopenia grave + Sintomas Neurológicos flutuantes + Febre + Disfunção renal discreta. A patogenia reside na deficiência severa da enzima ADAMTS13. A <strong>Plasmaférese Terapêutica Diária associada a Corticoides é a intervenção de emergência inegociável</strong>: remove os anticorpos anti-ADAMTS13 circulantes e infunde a enzima funcionante contida no plasma do doador. Sem plasmaférese imediata, a mortalidade supera 90%! A alternativa A descreve uma conduta proibida: a transfusão de plaquetas na PTT "alimenta" a formação de novos trombos microvasculares cerebrais e cardíacos, podendo precipitar AVC e óbito imediato. Alternativa B impecável.</p>

<h4>Questão 7: UNICAMP — Amiloidose Renal e Birefringência</h4>
<p><strong>Enunciado:</strong> Um homem de 66 anos com diagnóstico de mieloma múltiplo de cadeia leve lambda evolui com síndrome nefrótica grave caracterizada por proteinúria de 12 g/24 horas e hipoalbuminemia severa (albumina = 1,6 g/dL). O ecocardiograma transtorácico evidencia espessamento simétrico das paredes ventriculares com aspecto granular cintilante do miocárdio, associado a baixa voltagem difusa no eletrocardiograma de 12 derivações. A biópsia renal do paciente revelará material amorfo extracelular acelular na microscopia óptica que exibirá, na coloração específica pelo Vermelho Congo sob microscópio de luz polarizada:</p>
<p>A) Fluorescência linear contínua amarelada.<br>
B) Birefringência verde-maçã (apple-green birefringence) patognomônica.<br>
C) Precipitação azul de Prússia correspondente à hemossiderose.<br>
D) Imunofluorescência positiva isolada para anticorpos anti-MBG.<br>
E) Formação de humps subepiteliais em corcova de camelo.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O quadro clínico descreve <strong>Amiloidose Primária (Amiloidose AL)</strong> secundária a discrasia de plasmócitos por mieloma de cadeia leve lambda, com clássica infiltração renal (síndrome nefrótica) e miocárdica (cardiomiopatia restritiva com dissociação entre espessamento no ECO e baixa voltagem no ECG). O marco histopatológico soberano universal da substância amiloide é a <strong>coloração pelo Vermelho Congo exibindo a característica Birefringência Verde-Maçã sob luz polarizada</strong>, decorrente do arranjo tridimensional das fibrilas insolúveis em folha beta-pregueada cruzada. Alternativa B indiscutível.</p>
`
};
