// scripts/build-bloco-05-106-part2.mjs
// Aula 106: Lesão Renal Aguda (LRA) - Parte 2: Seções 5 a 8 (Indicações de Diálise, Modalidades, Casos e Questões)

export const sec5 = {
  id: 'indicacoes-dialise-urgencia-mnemonico-modalidades',
  title: '5. Indicações Formais de Diálise de Urgência (Mnemônico AEIOU) e Modalidades de Terapia Renal Substitutiva',
  body_html: `
<h3>O Mnemônico Clássico Internacional: As Cinco Indicações Formais de Urgência Dialítica</h3>
<p>A indicação de suporte dialítico na Lesão Renal Aguda é eminentemente <strong>clínica e sindrômica</strong>, e não baseada exclusivamente em números isolados de ureia ou creatinina sérica. Para fixação mnemônica universal em concursos médicos e no ambiente de pronto-socorro e UTI, utiliza-se a clássica regra das vogais: <strong>A - E - I - O - U</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Letra / Indicação</th>
      <th>Critério Clínico e Laboratorial Específico</th>
      <th>Tratamento Clínico de Tentativa e Limiar para Conversão Dialítica Imediata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>A — Acidose Metabólica Grave</strong></td>
      <td><strong>pH sanguíneo $&lt; 7,15$ a $7,20$</strong> associado a <strong>Bicarbonato sérico $&lt; 10$ a $12$ mEq/L</strong> refratário a medidas clínicas ou nos quais a reposição de bicarbonato de sódio endovenoso é contraindicada por sobrecarga volêmica grave e hiperosmolaridade concomitante.</td>
      <td>Tentativa clínica: reposição de bicarbonato de sódio a 8,4% em pacientes sem sobrecarga volêmica. Se persistir $pH < 7,15$ ou houver hipercapnia associada que impeça eliminação respiratória do $CO_2$ gerado, a hemodiálise torna-se imperativa.</td>
    </tr>
    <tr>
      <td><strong>E — Eletrólitos (Hipercalemia Grave Refratária)</strong></td>
      <td><strong>Potássio sérico ($K^+$) $&gt; 6,5$ mEq/L</strong> ou qualquer hipercalemia associada a <strong>alterações eletrocardiográficas agudas</strong> (ondas T apiculadas em tenda, alargamento do complexo QRS, achatamento da onda P, ritmo sinoventricular ou arritmias ventriculares instáveis) refratárias ao tratamento farmacológico padrão imediato.</td>
      <td>Medidas imediatas: Gluconato de Cálcio a 10% IV (estabilização de membrana), solução polarizante (Glicose + Insulina regular), beta-2 agonistas inalatórios (salbutamol), resinas trocadoras (poliestirenossulfonato de cálcio/Lokelma). Se refratário ou recorrente em paciente anúrico, diálise de urgência.</td>
    </tr>
    <tr>
      <td><strong>I — Intoxicações Exógenas Dialisáveis</strong></td>
      <td>Intoxicação aguda grave por substâncias de <strong>baixo peso molecular, baixo volume de distribuição e baixa ligação a proteínas plasmáticas</strong>: <em>Lítio, Metanol, Etilenoglicol, Salicilatos (Aspirina) e Teofilina</em> (Mnemônico auxiliar: <strong>SLIME</strong> — Salicilatos, Lítio, Isoniazida/Intoxicações, Metanol, Etilenoglicol).</td>
      <td>A hemodiálise remove a toxina diretamente do sangue e corrige simultaneamente a acidose metabólica com ânion-gap aumentado induzida pelo metanol (ácido fórmico) e etilenoglicol (ácido oxálico/glicólico).</td>
    </tr>
    <tr>
      <td><strong>O — Overload (Sobrecarga Hídrica / Edema Agudo de Pulmão)</strong></td>
      <td><strong>Edema Agudo de Pulmão (EAP) cardiogênico ou hipervolêmico</strong>, anasarca com congestão pulmonar grave e hipoxemia refratária a doses elevadas de diuréticos de alça intravenosos (ou na presença de anúria total prévia estabelecida).</td>
      <td>Em paciente anúrico com saturação de oxigênio em queda, a tentativa de diurético é inócua e postergar a hemodiálise para ultrafiltração isolada rápida pode culminar em parada respiratória hipoxêmica.</td>
    </tr>
    <tr>
      <td><strong>U — Uremia Sintomática Grave</strong></td>
      <td>Complicações inflamatórias ou neurológicas secundárias ao acúmulo sistêmico grave de toxinas urêmicas (geralmente com <strong>Ureia sérica $> 150$ a $200$ mg/dL</strong>): <strong>Encefalopatia Urêmica</strong> (confusão mental, torpor, asterixis/flapping, convulsões), <strong>Pericardite Urêmica</strong> (dor torácica pleurítica com atrito pericárdico à ausculta e risco iminente de tamponamento cardíaco) e <strong>Disfunção Plaquetária Urêmica com Sangramento Ativo</strong>.</td>
      <td>A pericardite urêmica é uma emergência médica clássica na qual <strong>a anticoagulação é formalmente proscrita</strong> (risco de hemopericárdio e tamponamento), exigindo diálise sem heparina imediatamente.</td>
    </tr>
  </tbody>
</table>

<h3>Momento Ótimo de Início da Terapia Renal Substitutiva: Precoce vs Tardio</h3>
<p>Uma das controvérsias mais calorosas da medicina intensiva contemporânea girava em torno do <em>timing</em> de início da diálise: iniciar profilaticamente de forma "precoce" (apenas com base no estágio KDIGO 2 ou 3) traria benefício de sobrevida comparado a aguardar uma das indicações convencionais de urgência ("estratégia postergada ou tardia")?</p>
<p><strong>Evidências dos Ensaios Clínicos Globais (AKIKI, IDEAL-ICU, STARRT-AKI e AKIKI-2):</strong></p>
<ul>
  <li>Ensaios multicêntricos de altíssimo rigor metodológico (com destaque para o <em>STARRT-AKI</em> com cerca de 3.000 pacientes críticos em UTI) demonstraram de forma categórica que a estratégia de <strong>início precoce sistemático NÃO reduziu a mortalidade em 90 dias</strong>, NÃO encurtou o tempo de internação em UTI e esteve associada a <strong>maior dependência dialítica persistente, maior incidência de hipotensão arterial, maiores complicações infecciosas de cateter venoso central e maior custo hospitalar</strong>;</li>
  <li>Além disso, 40% a 50% dos pacientes alocados no grupo postergado recuperaram a função renal espontaneamente e <em>nunca precisaram de nenhuma sessão de diálise</em>;</li>
  <li><strong>Conclusão da Diretriz Internacional Atual:</strong> A conduta preconizada é a <strong>estratégia postergada vigilante</strong> — acompanhar rigorosamente o paciente em UTI e iniciar a TRS imediatamente apenas quando surgir uma das indicações mandatórias (hipercalemia refratária, acidose metabólica grave, sobrecarga volêmica refratária ou uremia clínica sintomática), poupando intervenções invasivas desnecessárias.</li>
</ul>

<h3>Modalidades de Suporte Dialítico no Paciente Crítico com LRA</h3>
<p>A seleção da técnica de suporte renal substitutivo deve ser individualizada com base na estabilidade hemodinâmica do paciente:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Modalidade de Diálise</th>
      <th>Princípio Físico Dominante</th>
      <th>Indicações Clínicas Principais</th>
      <th>Vantagens e Limitações Estruturais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hemodiálise Intermitente Convencional (HDI)</strong></td>
      <td><strong>Difusão</strong> (gradiente de concentração através de fluxo contracorrente rápido de sangue a 300-400 mL/min e banho dialítico a 500 mL/min) por 3 a 4 horas.</td>
      <td>Pacientes clinicamente e hemodinamicamente estáveis, sem necessidade de drogas vasoativas em doses crescentes; hipercalemia fulminante que exige remoção ultra-rápida de solutos.</td>
      <td>Excelente depuração de potássio e ureia em poucas horas; baixo custo. Limitação: altas taxas de hipotensão intradialítica por ultrafiltração acelerada em pacientes instáveis.</td>
    </tr>
    <tr>
      <td><strong>Terapia Renal Substitutiva Contínua (CRRT: CVVH, CVVHD, CVVHDF)</strong></td>
      <td><strong>Convecção pura (Hemofiltração)</strong> e/ou Difusão lenta contínua mantida por 24 horas ininterruptas (fluxos baixos de sangue a 150-200 mL/min).</td>
      <td><strong>Pacientes graves instáveis em choque séptico ou cardiogênico sob altas doses de noradrenalina</strong>; hipertensão intracraniana ou edema cerebral agudo (onde a HDI causaria desequilíbrio osmótico e herniação cerebral).</td>
      <td>Excelente tolerabilidade hemodinâmica; controle contínuo e gradual de volume e solutos sem oscilações bruscas de osmolaridade. Limitações: necessidade de anticoagulação contínua do circuito (citrato regional ou heparina) e custo operacional muito elevado.</td>
    </tr>
    <tr>
      <td><strong>Métodos Híbridos / Sustentados de Baixa Eficiência (SLED / SLEDD)</strong></td>
      <td>Difusão e convecção intermediárias prolongadas por 6 a 12 horas diárias.</td>
      <td>Pacientes críticos com instabilidade intermediária; hospitais sem disponibilidade de máquinas dedicadas de CRRT contínua.</td>
      <td>Combina a tolerância hemodinâmica da CRRT com a flexibilidade operacional e o menor custo dos equipamentos de hemodiálise intermitente convencional.</td>
    </tr>
    <tr>
      <td><strong>Diálise Peritoneal Aguda (DP)</strong></td>
      <td>Difusão e ultrafiltração osmótica (glicose) através do peritônio parietal e visceral como membrana semipermeável.</td>
      <td>População pediátrica, neonatos, pacientes sem acesso vascular viável ou em cenários de catástrofe humanitária e carência de recursos.</td>
      <td>Não exige anticoagulação sistêmica nem acesso vascular central profundo. Contraindicada em cirurgias abdominais recentes, peritonite fecal ou perda de integridade peritoneal.</td>
    </tr>
  </tbody>
</table>

<h3>Acessos Vasculares e Anticoagulação do Circuito</h3>
<ul>
  <li><strong>Cateter Venoso Central Duplo Lúmen de Curta Permanência (Cateter de Shaldon):</strong>
    <ol>
      <li><strong>Primeira Escolha Anatômica:</strong> <em>Veia Jugular Interna Direita</em> (trajeto retilíneo anatômico direto para o átrio direito, menor taxa de recirculação sanguínea e baixíssimo risco de estenose vascular);</li>
      <li><strong>Segunda Escolha:</strong> <em>Veias Femorais</em> (especialmente a veia femoral direita); exige cateter mais longo ($\ge 20$ cm) para alcançar a veia cava inferior e garantir fluxo adequado;</li>
      <li><strong>Localização Formalmente Desaconselhada:</strong> <em>Veia Subclávia</em> (alta incidência de estenose venosa tardia por microtrauma de fluxo na parede vascular, o que inviabiliza permanentemente a confecção futura de fístula arteriovenosa no membro ipsilateral caso o paciente progrida para DRC dialítica crônica).</li>
    </ol>
  </li>
  <li><strong>Anticoagulação Regional com Citrato:</strong> Na CRRT, o citrato trissódico infundido na linha arterial da máquina quela o cálcio iônico intraluminal (fator IV da coagulação), impedindo a formação de coágulos na membrana filtrante. Antes do retorno venoso ao paciente, infunde-se cloreto ou gluconato de cálcio para normalizar a calcemia sistêmica. Apresenta menor taxa de sangramento que a heparina sistêmica.</li>
</ul>
`
};

export const sec6 = {
  id: 'casos-clinicos-estruturados-lra',
  title: '6. Casos Clínicos Estruturados e Discussão Diagnóstica Baseada em Evidências',
  body_html: `
<h3>Caso Clínico 1: Choque Séptico, Oligúria e Diferenciação Fisiopatológica</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 68 anos, hipertenso e diabético em uso crônico de enalapril 20 mg/dia e metformina 850 mg 2x/dia, é admitido no pronto-socorro com tosse produtiva mucopurulenta, dispneia intensa e confusão mental há 48 horas.</p>
  <p><strong>Exame Físico na Admissão:</strong> REG, sonolento, desidratado ++/4+, taquipneico (FR 28 irpm), afebril no momento (T 36,1 ºC). FC 122 bpm, PA 78/44 mmHg (PAM 55 mmHg). Ausculta respiratória: estertores crepitantes em terço médio e base do hemitórax direito. Tempo de enchimento capilar de 4 segundos. Diurese aferida por sonda vesical: apenas 15 mL na última hora.</p>
  <p><strong>Laboratório Inicial:</strong> Gasometria arterial: pH 7,24, pO2 65 mmHg, pCO2 29 mmHg, HCO3- 12 mEq/L, Lactato 4,2 mmol/L. Creatinina: 2,8 mg/dL (valor basal de 3 meses atrás era 0,9 mg/dL). Ureia: 118 mg/dL. Potássio sérico: 5,4 mEq/L. EAS: densidade 1.024, proteínas discretas (+), ausência de hemácias, ausência de leucócitos no sedimento. Urina isolada colhida antes da hidratação: Sódio urinário ($Na_U$) = 12 mEq/L, Creatinina urinária ($Cr_U$) = 98 mg/dL.</p>
  <p><strong>Discussão Diagnóstica e Conduta:</strong></p>
  <ul>
    <li><em>Diagnóstico Sindrômico:</em> Choque Séptico secundário à Pneumonia Adquirida na Comunidade grave, associado à Lesão Renal Aguda KDIGO Estágio 3 (creatinina subiu mais de 3 vezes o basal e oligúria severa);</li>
    <li><em>Padrão Fisiopatológico:</em> O paciente encontra-se em azotemia <strong>Pré-Renal precoce</strong> (superposta aos efeitos do enalapril prévio que aboliu a vasoconstrição da arteríola eferente). Evidências laboratoriais inequívocas de preservação tubular: relação Ureia/Creatinina sérica $> 40:1$ ($118 / 2,8 = 42,1$), Sódio urinário baixo ($12$ mEq/L, que é $< 20$ mEq/L), densidade urinária elevada ($1.024$) e Fração de Excreção de Sódio ($FeNa$):
    $$FeNa = \frac{12 \times 2,8}{138 \times 98} \times 100 = \frac{33,6}{13524} \times 100 = 0,25\%$$
    O valor de $FeNa = 0,25\%$ ($< 1\%$) confirma que as bombas tubulares estão intactas e retendo sódio avidamente;</li>
    <li><em>Conduta Terapêutica Imediata:</em>
      <ol>
        <li>Expansão volêmica agressiva com <strong>solução cristaloide balanceada (Ringer Lactato)</strong> a 30 mL/kg nas primeiras 3 horas;</li>
        <li>Início precoce de <strong>Noradrenalina em infusão contínua</strong> para atingir PAM $\ge 65$ mmHg;</li>
        <li>Antibioticoterapia empírica intravenosa na primeira hora (Ceftriaxona + Claritromicina);</li>
        <li>Suspensão imediata de Enalapril e Metformina (risco iminente de acidose lática);</li>
        <li>Coleta seriada de lactato e monitorização horária estrita do débito urinário. Não há indicação imediata de diálise no momento.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 2: Febre, Erupção Cutânea e Falência Renal Pós-Antibiótico</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 54 anos, portadora de osteomielite crônica em tíbia esquerda tratada há 18 dias com Oxacilina intravenosa em regime de internação domiciliar. É trazida ao hospital referindo mal-estar geral, febre diária há 4 dias e aparecimento de manchas avermelhadas pelo corpo.</p>
  <p><strong>Exame Físico:</strong> REG, febril (T 38,4 ºC), eupnéica, corada. PA 130/80 mmHg, FC 88 bpm. Presença de exantema maculopapular eritematoso difuso no tronco e membros superiores. Ausência de edemas periféricos. Abdome indolor, sem massas.</p>
  <p><strong>Laboratório:</strong> Hemograma: Hemoglobina 11,8 g/dL, Leucócitos 13.400/mm³ com <strong>14% de eosinófilos</strong> (1.876 eosinófilos absolutos/mm³ - eosinofilia acentuada). Creatinina sérica atual: 3,4 mg/dL (basal pré-oxacilina de 0,8 mg/dL). Ureia: 76 mg/dL. Potássio: 4,8 mEq/L. EAS: proteinúria discreta (500 mg/24h), leucocitúria estéril importante (45 leucócitos por campo), cilindros leucocitários no sedimento urinário. Coloração de Hansel na urina positiva para <strong>eosinofilúria</strong>.</p>
  <p><strong>Discussão e Resolução:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Nefrite Intersticial Aguda (NIA) Imunoalérgica Farmacodermóide</strong> induzida por Oxacilina;</li>
    <li><em>Elementos-Chave do Caso:</em> O aparecimento subagudo (após mais de 2 semanas de uso do betalactâmico), associado à tríade clínica de hipersensibilidade (febre + rash cutâneo maculopapular), eosinofilia periférica acentuada e sedimento urinário com cilindros leucocitários e eosinofilúria fecham o quadro com elevadíssima probabilidade clínica pré-biópsia;</li>
    <li><em>Conduta Farmacológica:</em>
      <ol>
        <li><strong>Suspensão imediata e definitiva da Oxacilina</strong>;</li>
        <li>Substituição da antibioticoterapia para osteomielite por classe química não correlacionada guiada por antibiograma ósseo (ex.: Daptomicina ou Clindamicina se suscetível);</li>
        <li>Se a função renal não apresentar melhora consistente e espontânea em 48 a 72 horas após a descontinuação da droga causadora, iniciar <strong>Corticoterapia Sistêmica com Prednisona 1 mg/kg/dia por 2 a 4 semanas</strong> com desmame progressivo. A corticoterapia precoce acelera a resolução do infiltrado inflamatório e reduz a formação de fibrose intersticial irreversível crônica.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 3: LRA Hiperaguda em Idoso após Cateterismo Cardíaco</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 74 anos, tabagista pesado, diabético e vasculopata periférico grave, foi submetido a cateterismo cardíaco com angioplastia coronariana com implante de stent farmacológico há 3 semanas após infarto agudo do miocárdio. Evoluiu bem nos primeiros dias, mas retorna ao pronto-socorro queixando-se de dor intensa nas pontas dos artelhos e lesões violáceas nas pernas que pioraram progressivamente nas últimas duas semanas.</p>
  <p><strong>Exame Físico:</strong> PA 165/95 mmHg, FC 80 bpm. Lesões cutâneas reticuladas arroxeadas nos membros inferiores compatíveis com <em>livedo reticular</em>. Cianose e necrose superficial dolorosa nas polpas digitais do primeiro e terceiro pododáctilos esquerdos (<em>blue toe syndrome</em>), com <strong>pulsos arteriais pedioso e tibial posterior amplos e simétricos bilateralmente</strong>. Fundoscopia ocular sob dilatação pupilar evidencia placas birrefringentes amareladas na bifurcação de arteríolas retinianas (Placas de Hollenhorst).</p>
  <p><strong>Laboratório:</strong> Creatinina sérica atual: 4,1 mg/dL (era 1,2 mg/dL na alta hospitalar e 1,4 mg/dL no 2º dia pós-cateterismo). Ureia: 124 mg/dL. Eosinofilia no sangue periférico (950 eosinófilos/mm³). Frações C3 e C4 do complemento sérico deprimidas (hipocomplementemia). Urina tipo 1: hematúria microscópica, proteinúria subnefrótica (0,8 g/24h) e eosinofilúria.</p>
  <p><strong>Discussão e Raciocínio Clínico:</strong></p>
  <ul>
    <li><em>Diagnóstico:</em> <strong>Doença Ateroembólica Renal (Ateroembolismo por Cristais de Colesterol)</strong>;</li>
    <li><em>Diagnóstico Diferencial com Nefropatia por Contraste (NIC):</em> Esta é a distinção mais testada em concursos de medicina:
      <ul>
        <li>A Nefropatia por Contraste Iodado instala-se de forma aguda precoce: a creatinina sobe em 24 a 48 horas, atinge o pico em 3 a 5 dias e normaliza-se espontaneamente em 7 a 10 dias. Não cursa com manifestações extra-renais sistêmicas;</li>
        <li>O Ateroembolismo por Cristais de Colesterol tem instalação <strong>subaguda e arrastada (2 a 6 semanas após o procedimento invasivo vascular)</strong>, cursa com curso clínico flutuante ou deterioração progressiva da função renal, e acompanha-se de manifestações vasculares e alérgicas sistêmicas: livedo reticular, síndrome dos dedos azuis (com pulsos periféricos preservados, pois a oclusão é microvascular terminal), eosinofilia, consumo transitório de complemento e placas retinianas de Hollenhorst;</li>
      </ul>
    </li>
    <li><em>Conduta:</em> Não existe terapia de remoção dos êmbolos com eficácia comprovada. A anticoagulação plena com varfarina ou heparina é <strong>formalmente contraindicada</strong> (desestabiliza a capa de fibrina das placas aórticas ulceradas e precipita novas ondas de embolização). O manejo consiste em suporte hemodinâmico, suspensão de anticoagulantes, introdução de estatinas em alta potência (atorvastatina 80 mg para estabilização de placas ateromatosas), controle rigoroso da pressão arterial e suporte dialítico se indicado.</li>
  </ul>
</div>
`
};

export const sec7 = {
  id: 'questoes-concurso-comentadas-lra',
  title: '7. Questões de Concursos Médicos e Residência Comentadas Passo a Passo',
  body_html: `
<h3>Questão 1 (USP - Universidade de São Paulo / Residência Médica)</h3>
<p>Homem de 72 anos, hipertenso crônico em tratamento com hidroclorotiazida e losartana, dá entrada no pronto-socorro após três dias de diarreia aquosa profusa e vômitos decorrentes de gastroenterite aguda. Ao exame físico, apresenta mucosas secas, turgor cutâneo pastoso diminuído, PA 90/55 mmHg e FC 108 bpm. A gasometria venosa revela acidose metabólica. Exames laboratoriais séricos e urinários coletados na admissão demonstram: Creatinina sérica = 3,2 mg/dL (valor basal de 1,0 mg/dL há 2 meses); Ureia sérica = 140 mg/dL; Sódio sérico = 136 mEq/L; Sódio urinário ($Na_U$) = 14 mEq/L; Creatinina urinária ($Cr_U$) = 120 mg/dL. O sedimento urinário evidencia presença exclusiva de raros cilindros hialinos. Assinale a alternativa que descreve corretamente a fisiopatologia e a conduta prioritária para este paciente:</p>

<ol type="A">
  <li>Trata-se de Necrose Tubular Aguda isquêmica estabelecida, evidenciada pela relação Ureia/Creatinina elevada; a conduta imediata consiste na administração de furosemida intravenosa em altas doses para restabelecer a diurese.</li>
  <li>O quadro representa Lesão Renal Aguda pré-renal funcional com túbulos íntegros; a conduta mandatória imediata é a restauração volêmica com solução cristaloide balanceada e suspensão transitória da losartana e do diurético.</li>
  <li>A presença de cilindros hialinos e fração de excreção de sódio calculada superior a 2% indica glomerulonefrite aguda rapidamente progressiva, justificando pulsoterapia com metilprednisolona.</li>
  <li>Trata-se de Nefrite Intersticial Aguda secundária à desidratação, devendo-se indicar biópsia renal percutânea de urgência antes de qualquer reposição hídrica.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O paciente apresenta história clínica flagrante de hipovolemia por perdas digestivas associada a uso de bloqueador do receptor de angiotensina (losartana), que cancela a vasoconstrição protetora da arteríola eferente. Os parâmetros laboratoriais confirmam categoricamente o padrão <strong>Pré-Renal</strong>: a relação Ureia/Creatinina sérica é de $140 / 3,2 = 43,75$ (critério clássico $> 40:1$), o sódio urinário é $14$ mEq/L ($< 20$ mEq/L) e o cálculo da Fração de Excreção de Sódio ($FeNa$) resulta em:
$$FeNa = \frac{14 \times 3,2}{136 \times 120} \times 100 = \frac{44,8}{16320} \times 100 \approx 0,27\%$$
O valor de $FeNa = 0,27\%$ ($< 1\%$) e o sedimento contendo apenas cilindros hialinos (matriz de Tamm-Horsfall pura sem debris necróticos) comprovam que os túbulos estão funcionantes e reabsorvendo ativamente água e sódio. O uso de furosemida (Alternativa A) em paciente hipovolêmico é um erro iatrogênico gravíssimo que agravaria o choque. A conduta correta é expandir com cristaloide e suspender os nefrotóxicos e anti-hipertensivos.</p>

<hr>

<h3>Questão 2 (ENAMED / Exame Nacional de Medicina)</h3>
<p>Mulher de 62 anos, internada na Unidade de Terapia Intensiva com sepse de foco pulmonar sob suporte ventilatório mecânico e desmame de noradrenalina, desenvolve elevação progressiva da creatinina sérica de 0,8 mg/dL para 2,6 mg/dL nas últimas 48 horas. A diurese nas últimas 8 horas totalizou apenas 120 mL (peso estimado da paciente: 60 kg). O médico plantonista solicita exames para elucidar o mecanismo da disfunção renal. Os exames revelam: Sódio urinário = 58 mEq/L; Creatinina urinária = 35 mg/dL; Creatinina sérica = 2,6 mg/dL; Sódio sérico = 140 mEq/L. A sedimentoscopia urinária revela numerosos <strong>cilindros granulosos pardos (<em>muddy brown casts</em>)</strong> e células epiteliais tubulares livres. Com base nesses dados, assinale o diagnóstico correto e o estadiamento KDIGO correspondente:</p>

<ol type="A">
  <li>Azotemia pré-renal funcional; Estágio KDIGO 1.</li>
  <li>Necrose Tubular Aguda (NTA) isquêmica/séptica; Estágio KDIGO 3.</li>
  <li>Nefrite Intersticial Aguda alérgica; Estágio KDIGO 2.</li>
  <li>Microangiopatia trombótica associada à sepse; Estágio KDIGO 1.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> Vamos avaliar os dois pontos centrais: o mecanismo e o estadiamento KDIGO.
1. <em>Fisiopatologia e Exames:</em> O débito urinário nas últimas 8 horas foi de $120\text{ mL} / 8\text{ h} / 60\text{ kg} = 0,25\text{ mL/kg/h}$. O sódio urinário encontra-se alto ($58$ mEq/L, que é $> 40$ mEq/L). O cálculo da $FeNa$ revela:
$$FeNa = \frac{58 \times 2,6}{140 \times 35} \times 100 = \frac{150,8}{4900} \times 100 \approx 3,08\%$$
Uma $FeNa = 3,08\%$ ($> 2\%$) associada à presença patognomônica de <em>cilindros granulosos pardos</em> sela o diagnóstico inequívoco de <strong>Necrose Tubular Aguda</strong> por lesão isquêmica/inflamatória séptica.
2. <em>Estadiamento KDIGO:</em> A creatinina elevou-se de $0,8$ para $2,6$ mg/dL (aumento de $3,25$ vezes o valor basal: $2,6 / 0,8 = 3,25$). Um aumento superior a 3 vezes o basal classifica imediatamente o paciente no <strong>Estágio KDIGO 3</strong>.</p>

<hr>

<h3>Questão 3 (UNICAMP - Universidade Estadual de Campinas)</h3>
<p>Paciente do sexo masculino, 58 anos, em pós-operatório tardio de revascularização do miocárdio, evolui com insuficiência renal oligúrica e sobrecarga hídrica refratária. O nefrologista assistente é chamado para avaliar a indicação de suporte dialítico de urgência. Entre os parâmetros a seguir, qual constitui <strong>indicação formal e clássica de diálise de urgência</strong> segundo os consensos internacionais de nefrologia?</p>

<ol type="A">
  <li>Creatinina sérica isolada de 4,5 mg/dL em paciente assintomático sem hipercalemia ou acidose.</li>
  <li>Fração de excreção de ureia inferior a 35% após uso recente de furosemida.</li>
  <li>Potássio sérico de 6,8 mEq/L acompanhado de ondas T apiculadas e complexos QRS alargados no eletrocardiograma, refratário a medidas clínicas conservadoras.</li>
  <li>Ureia sérica de 95 mg/dL com débito urinário mantido em 0,7 mL/kg/h nas últimas 12 horas.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> As indicações clássicas de diálise de urgência baseiam-se na gravidade clínica e no risco iminente de morte (mnemônico AEIOU): Acidose refratária ($pH < 7,15$), Eletrólitos (hipercalemia grave refratária com alterações no ECG, como onda T em tenda e alargamento do QRS), Intoxicações dialisáveis, Overload (edema agudo de pulmão refratário a diuréticos) e Uremia sintomática grave (encefalopatia, pericardite, sangramento urêmico). Valores numéricos isolados de creatinina (Alternativa A) ou ureia moderada (Alternativa D) na ausência de sintomas clínicos ou distúrbios metabólicos refratários <em>não constituem indicação de diálise de urgência</em> conforme consagrado pelos grandes ensaios clínicos randomizados contemporâneos (STARRT-AKI e AKIKI).</p>

<hr>

<h3>Questão 4 (SURCE - Seleção Unificada para Residência Médica do Ceará)</h3>
<p>Homem de 65 anos, sabidamente portador de hiperplasia prostática benigna em tratamento irregular com tansulosina, é trazido à Unidade de Pronto Atendimento com dor em hipogástrio, anúria há 18 horas e vômitos. Ao exame físico, apresenta-se agitado, sudoreico, com massa palpável dolorosa e maciça à percussão em região suprapúbica estendendo-se até a cicatriz umbilical. Exames laboratoriais revelam: Creatinina sérica = 5,8 mg/dL; Ureia sérica = 168 mg/dL; Potássio = 5,6 mEq/L. O ultrassom à beira do leito confirma distensão vesical maciça e hidronefrose bilateral moderada. Qual é o diagnóstico e a conduta imediata mandatória?</p>

<ol type="A">
  <li>Glomerulonefrite aguda obstrutiva; punção supra-púbica guiada por ultrassom e pulsoterapia com ciclofosfamida.</li>
  <li>Lesão Renal Aguda pós-renal (obstrutiva); passagem imediata de cateter vesical de demora (sondagem vesical de alívio/demora) e monitorização para poliúria pós-desobstrução.</li>
  <li>Necrose Tubular Aguda por pigmentos; indicação imediata de hemodiálise de urgência através de cateter venoso central em veia subclávia.</li>
  <li>Insuficiência renal intrínseca terminal; encaminhamento imediato para confecção de fístula arteriovenosa radiocefálica de emergência.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O caso retrata a clássica LRA <strong>Pós-Renal (Obstrutiva Baixa)</strong> decorrente de retenção urinária aguda por hiperplasia prostática benigna com bexigoma volumoso palpável. A pressão hidrostática retrógrada transmite-se através dos ureteres a ambos os sistemas pielocalicinais (hidronefrose bilateral), superando a pressão de filtração capilar glomerular e colapsando a TFG. A descompressão imediata do trato urinário inferior por cateterismo vesical (sonda de Foley) restaura o fluxo urinário, promovendo recuperação espetacular da filtração glomerular em 24 a 48 horas. O médico assistente deve atentar para a <em>poliúria pós-desobstrutiva</em> (perda maciça de água e eletrólitos por diurese osmótica pelas escórias retidas e desregulação tubular transitória), monitorando rigorosamente o balanço hídrico e a reposição eletrolítica.</p>

<hr>

<h3>Questão 5 (UERJ - Universidade do Estado do Rio de Janeiro)</h3>
<p>Em relação ao uso de diuréticos de alça (Furosemida) no manejo da Lesão Renal Aguda no paciente hospitalizado, assinale a proposição <strong>CORRETA</strong> de acordo com as evidências médicas contemporâneas:</p>

<ol type="A">
  <li>O uso profilático sistemático de furosemida em infusão contínua está indicado para prevenir a progressão de LRA pré-renal para necrose tubular aguda em pacientes sob quimioterapia com cisplatina.</li>
  <li>A furosemida deve ser administrada imediatamente em todo paciente oligúrico admitido em choque hemorrágico para transformar a LRA oligúrica em não oligúrica, reduzindo comprovadamente a mortalidade hospitalar.</li>
  <li>O Teste de Estresse com Furosemida (FST) em pacientes euvolêmicos com LRA estágios 1 e 2 avalia a integridade funcional tubular; uma diurese inferior a 200 mL em 2 horas pós-bólus de furosemida prevê com alta acurácia a progressão para LRA estágio 3 e necessidade de diálise.</li>
  <li>A administração de furosemida nas últimas 24 horas não interfere nos cálculos urinários, mantendo a fração de excreção de sódio ($FeNa$) como o parâmetro mais confiável para diferenciar azotemia pré-renal de necrose tubular aguda.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A furosemida não tem poder protetor celular nem reduz mortalidade na LRA (eliminando A e B). Além disso, a furosemida bloqueia ativamente o transportador Na+/K+/2Cl- na alça de Henle, forçando natriurese intensa e elevando artificialmente o $FeNa$ para valores $> 2\%$, o que <em>invalida completamente a acurácia diagnóstica do $FeNa$</em> (eliminando D — nessas circunstâncias, deve-se utilizar a $FeUreia$). A Alternativa C sintetiza com precisão o <em>Furosemide Stress Test (FST)</em>, validado por Chawla e colaboradores: o teste avalia se as células tubulares da alça e túbulo distal continuam responsivas; um débito urinário $< 200$ mL em 2 horas prediz falência funcional tubular com excelente sensibilidade e especificidade.</p>

<hr>

<h3>Questão 6 (IAMSPE - Instituto de Assistência Médica ao Servidor Público Estadual)</h3>
<p>Durante a passagem de visita clínica em enfermaria de clínica médica, um residente discute a escolha do acesso vascular para início de hemodiálise em uma paciente com Lesão Renal Aguda dialítica que possui doença renal crônica prévia estágio 3b (TFGe basal de 35 mL/min/1,73 m²). Qual das condutas a seguir em relação ao acesso vascular é a mais adequada e respaldada pelas diretrizes internacionais do KDIGO?</p>

<ol type="A">
  <li>Puncionar preferencialmente a veia subclávia direita, pois apresenta menor índice de infecção bacteriana e maior estabilidade mecânica do cateter.</li>
  <li>Evitar a punção da veia subclávia devido ao alto risco de estenose venosa tardia, priorizando o cateterismo da veia jugular interna direita sob visualização ultrassonográfica.</li>
  <li>Puncionar obrigatoriamente a veia femoral bilateral para preservar todas as veias do tórax e membros superiores para fístulas futuras.</li>
  <li>Confeccionar imediatamente uma fístula arteriovenosa radiocefálica de emergência e puncioná-la nas primeiras 12 horas pós-operatórias para realizar a primeira sessão.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O cateterismo da veia subclávia acarreta trauma mecânico endotelial e turbulência de fluxo que culminam em estenose venosa central ipsilateral em até 40% a 50% dos casos. Caso ocorra estenose de subclávia, o membro superior inteiro fica permanentemente inviabilizado para receber uma fístula arteriovenosa (FAV) futura, pois qualquer tentativa de fístula causará hipertensão venosa grave, edema maciço e falência do acesso. Por esse motivo formal, o KDIGO estabelece a <strong>Veia Jugular Interna Direita como o sítio anatômico de primeira escolha absoluto</strong> para cateteres temporários de duplo lúmen. Uma FAV não pode ser puncionada com 12 horas de vida (exige maturação mínima de 6 a 8 semanas, eliminando D).</p>
`
};

export const sec8 = {
  id: 'prognostico-transicao-drc-e-referencias',
  title: '8. Prognóstico Evolutivo, Transição LRA-DRC e Diretrizes Internacionais',
  body_html: `
<h3>O Contínuo Bidirecional: A Transição da Lesão Renal Aguda para a Doença Renal Crônica</h3>
<p>Historicamente, a Lesão Renal Aguda era interpretada como um evento clínico completamente autolimitado e benigno caso o paciente sobrevivesse à fase crítica e recebesse alta com valores de creatinina sérica estabilizados. A nefrologia molecular contemporânea desmistificou esse dogma: <strong>a LRA e a Doença Renal Crônica (DRC) constituem um contínuo fisiopatológico bidirecional indissociável</strong>.</p>

<p>Após um episódio de agressão isquêmica ou nefrotóxica moderada a grave (KDIGO estágios 2 e 3), as células tubulares que sofrem lesão subletal ativam programas moleculares de reparo anômalo caracterizados por:</p>
<ul>
  <li><strong>Parada do Ciclo Celular na Fase G2/M:</strong> Células epiteliais tubulares bloqueadas em G2/M passam a secretar continuamente citocinas pró-fibróticas potentes, principalmente o <strong>Fator de Crescimento Transformador Beta 1 (TGF-$\beta_1$)</strong> e o <em>Fator de Crescimento de Tecido Conjuntivo (CTGF)</em>;</li>
  <li><strong>Transição Epitélio-Mesenquimal (TEM) e Ativação de Miofibroblastos:</strong> Os pericitos perivasculares e fibroblastos intersticiais proliferam descontroladamente, depositando colágeno tipo I e III na matriz extracelular;</li>
  <li><strong>Rarefação dos Capilares Peritubulares (Ruptura da Microcirculação):</strong> A inflamação endotelial residual provoca perda crônica da densidade de capilares peritubulares, gerando hipóxia medular crônica permanente;</li>
  <li><strong>Perda Nefrônica e Hiperfiltração Compensatória dos Glomérulos Remanescentes:</strong> A redução definitiva do número total de néfrons funcionantes sobrecarrega os glomérulos saudáveis remanescentes, instalando hipertensão intraglomerular, proteinúria progressiva e esclerose focal e segmentar secundária, acelerando a perda da taxa de filtração glomerular ao longo dos anos subsequentes.</li>
</ul>

<h3>Recomendações de Seguimento Pós-LRA (KDIGO)</h3>
<p>Todo paciente que sofreu um episódio de LRA no ambiente hospitalar deve ser submetido a uma <strong>avaliação ambulatorial nefrológica formal entre 30 e 90 dias após a alta hospitalar</strong> para:</p>
<ol>
  <li>Reavaliação laboratorial completa da TFGe através da equação CKD-EPI;</li>
  <li>Quantificação da albuminúria ou proteinúria em amostra isolada de urina (Razão Albumina/Creatinina Urinária - RAC);</li>
  <li>Controle rigoroso das metas de pressão arterial ($&lt; 130/80$ mmHg) e controle glicêmico;</li>
  <li>Avaliação criteriosa da reintrodução ou ajuste de medicamentos nefroprotetores, evitando a inércia terapêutica mas protegendo o paciente de recorrências agudas.</li>
</ol>
`
};

export const bookReferences = [
  {
    title: 'KDIGO 2012 Clinical Practice Guideline for Acute Kidney Injury',
    url: 'https://kdigo.org/guidelines/acute-kidney-injury/'
  },
  {
    title: 'Acute Kidney Injury Network (AKIN) — Report of an initiative to improve outcomes in acute kidney injury',
    url: 'https://ccforum.biomedcentral.com/articles/10.1186/cc5713'
  },
  {
    title: 'ADQI — Risk, Injury, Failure, Loss, and End-Stage Kidney Disease (RIFLE) Criteria',
    url: 'https://ccforum.biomedcentral.com/articles/10.1186/cc2872'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Timing of Initiation of Renal-Replacement Therapy in Acute Kidney Injury (STARRT-AKI Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2000741'
  },
  {
    title: 'Lancet — Comparison of Balanced Crystalloids versus Saline in Critically Ill Adults (SMART Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1711584'
  },
  {
    title: 'Diretrizes da Sociedade Brasileira de Nefrologia (SBN) — Diagnóstico e Manejo da Lesão Renal Aguda',
    url: 'https://sbn.org.br/'
  }
];
