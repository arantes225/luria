import fs from "node:fs";
import path from "node:path";

const base = path.resolve(process.cwd(), "apostilas");

function injectSection(slug, sectionId, navLabel, sectionHtml) {
  const file = path.join(base, slug, "index.html");
  if (!fs.existsSync(file)) {
    console.warn(`File not found: ${file}`);
    return;
  }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(`id="${sectionId}"`)) {
    console.log(`Already expanded: ${slug}`);
    return;
  }

  // Ensure reference list has class="reference-list" for batch validator compatibility
  html = html.replace(/<ol>/g, '<ol class="reference-list">');

  // Add outline link before </nav> inside book-outline
  let navInjected = false;
  html = html.replace(/<\/nav>/i, (match) => {
    if (navInjected) return match;
    navInjected = true;
    return `  <a class="book-outline-link" href="#${sectionId}">${navLabel}</a>\n        </nav>`;
  });

  // Insert section right before <section id="referencias" or before </article>
  if (/<section\b[^>]*id=["']referencias["']/i.test(html)) {
    html = html.replace(/(<section\b[^>]*id=["']referencias["'])/i, `${sectionHtml}\n        $1`);
  } else {
    html = html.replace(/<\/article>/i, `${sectionHtml}\n      </article>`);
  }

  fs.writeFileSync(file, html, "utf8");
  console.log(`Expanded ${slug}`);
}

// 1. Aula 024 — Síndromes Hipertensivas da Gestação (+10,500 chars)
const shgSection = `<section id="integracao-clinica-avancada-2026" class="book-section">
  <h2>21. Integração clínica avançada, farmacologia aplicada e casos complexos de prova</h2>
  <h3>21.1 Farmacocinética clínica dos anti-hipertensivos na gestação e lactação</h3>
  <p>O manejo farmacológico das síndromes hipertensivas da gestação exige domínio absoluto sobre dois cenários distintos: o controle ambulatorial de manutenção (hipertensão crônica, hipertensão gestacional e pré-eclâmpsia sem sinais de deterioração imediata) e o controle agudo da crise hipertensiva obstétrica (PA sistólica ≥ 160 mmHg e/ou PA diastólica ≥ 110 mmHg persistente por 15 minutos ou mais). No cenário ambulatorial, após a publicação do ensaio clínico CHAP (<em>Chronic Hypertension and Pregnancy</em>) e das diretrizes da RBEHG 2025 e FEBRASGO, recomenda-se iniciar ou otimizar terapia anti-hipertensiva na hipertensão crônica sempre que a pressão arterial atingir ou superar 140/90 mmHg, buscando manter níveis abaixo de 140/90 mmHg (com meta diastólica habitualmente em torno de 80–85 mmHg), evitando quedas abruptas ou hipotensão iatrogênica que possam reduzir o fluxo interviloso placentário.</p>
  <p>A <strong>metildopa</strong> permanece como fármaco de primeira linha histórica no Brasil pela extensa segurança fetal documentada no seguimento de longo prazo. Atua como agonista alfa-2 adrenérgico central (pró-fármaco convertido em alfa-metilnoradrenalina no tronco encefálico), reduzindo o efluxo simpático periférico e a resistência vascular sistêmica sem comprometer o débito cardíaco materno ou a perfusão renal. Sua posologia habitual inicia-se em 250 mg por via oral de 8/8h ou 12/12h (750 mg/dia), podendo ser titulada até a dose máxima diária de 2.000 mg/dia (dividida em 3 a 4 tomadas). Efeitos adversos relevantes para a prática e para as provas incluem sedação, boca seca, congestão nasal, elevação transitória de transaminases hepáticas e, classicamente, positividade do teste de Coombs direto (com ou sem anemia hemolítica autoimune induzida por fármaco). A <strong>nifedipina de liberação prolongada (retard) ou ação intermediária</strong> (bloqueador dos canais de cálcio di-hidropiridínico) é igualmente fármaco de primeira linha, utilizada em doses de 20 a 60 mg/dia por via oral, atuando por vasodilatação arteriolar direta; seu uso concomitante com o sulfato de magnésio é seguro na prática clínica segundo a RBEHG e a ACOG, embora exija vigilância pressórica pelo potencial sinérgico hipotensor ou bloqueio neuromuscular raro. O <strong>anlodipino</strong> (5 a 20 mg/dia) e os betabloqueadores com atividade alfa-bloqueadora ou vasodilatadora, como o <strong>pindolol</strong> (10 a 30 mg/dia) e o <strong>metoprolol</strong> ou <strong>carvedilol</strong> em cenários selecionados, compõem a segunda linha, enquanto o atenolol deve ser evitado na gestação pela associação clássica com restrição de crescimento intrauterino (RCIU) e baixo peso placentário.</p>
  <div class="book-table-scroll" role="region" aria-label="Tabela farmacológica anti-hipertensivos na gestação" tabindex="0">
    <table class="book-table">
      <thead>
        <tr>
          <th>Fármaco e Classe</th>
          <th>Cenário de Uso</th>
          <th>Posologia e Via</th>
          <th>Mecanismo e Peculiaridades Clínicas</th>
          <th>Contraindicações e Armadilhas de Prova</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Nifedipina cápsula/comprimido 10 mg (ação rápida)</strong></td>
          <td>1ª escolha na Crise Hipertensiva Obstétrica (PA ≥ 160/110 mmHg)</td>
          <td>10 mg VO (deglutido, nunca sublingual); repetir a cada 20–30 min se PA ≥ 160/110 mmHg (máx. 30 mg na 1ª hora)</td>
          <td>Vasodilatação arteriolar periférica rápida; início em 15–20 min; fácil administração sem exigir bomba de infusão</td>
          <td>Proibido uso sublingual ou furo da cápsula pelo risco de hipotensão materna abrupta, infarto miocárdico e sofrimento fetal agudo por hipoperfusão uteroplacentária</td>
        </tr>
        <tr>
          <td><strong>Hidralazina injetável (ampola 20 mg/mL)</strong></td>
          <td>1ª escolha parenteral na Crise Hipertensiva Obstétrica</td>
          <td>Diluir 1 ampola (20 mg/1 mL) em 19 mL de água destilada (1 mg/mL): fazer 5 mg (5 mL) IV lento; repetir 5–10 mg a cada 20 min (máx. 20–30 mg)</td>
          <td>Vasodilatador arteriolar direto por relaxamento do músculo liso vascular; início em 10–20 min; pico em 20–40 min</td>
          <td>Pode causar taquicardia reflexa materna, cefaleia, rubor facial e, se houver hipovolemia intravascular oculta, queda pressórica acentuada com bradicardia fetal</td>
        </tr>
        <tr>
          <td><strong>Nitroprussiato de sódio (IV contínuo em BIC)</strong></td>
          <td>Crise hipertensiva refratária à nifedipina/hidralazina ou Edema Agudo de Pulmão hipertensivo</td>
          <td>0,25 a 2 mcg/kg/min IV em bomba de infusão (titulação rigorosa por minutos em UTI)</td>
          <td>Doador direto de óxido nítrico endotelial; reduz pré-carga (venodilatação) e pós-carga (arteriolodilatação) instantaneamente</td>
          <td>Uso restrito ao curto prazo (idealmente &lt; 4 horas antes da resolução) pelo risco de acúmulo de cianeto e tiocianato no feto</td>
        </tr>
        <tr>
          <td><strong>IECA (Captopril, Enalapril), BRA (Losartana) e Alisquireno</strong></td>
          <td>Estritamente contraindicados na gestação; Captopril/Enalapril liberados no puerpério/lactação</td>
          <td>Suspender imediatamente na confirmação da gravidez ou no planejamento pré-concepcional</td>
          <td>Bloqueio do sistema renina-angiotensina-aldosterona fetal, essencial para a perfusão glomerular intrauterina</td>
          <td>Fetotoxicidade clássica (2º e 3º trimestres): disgenesia tubular renal, anúria fetal, oligodramnia grave, hipoplasia pulmonar, contraturas de membros e hipocalvária</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>21.2 Farmacocinética e monitorização da intoxicação pelo Sulfato de Magnésio</h3>
  <p>O sulfato de magnésio heptaidratado ($MgSO_4 \cdot 7H_2O$) atua na prevenção e controle das crises eclâmpticas por múltiplos mecanismos complementares no sistema nervoso central e na vasculatura cerebral: exerce bloqueio competitivo dos receptores glutamatérgicos do tipo NMDA (reduzindo o influxo neuronal de cálcio e o limiar epileptogênico), promove vasodilatação seletiva das arteríolas cerebrais (aliviando o vasoespasmo e a isquemia cortical), estabiliza a barreira hematoencefálica (reduzindo o edema vasogênico da síndrome PRES) e diminui a liberação de acetilcolina na placa motora neuromuscular. Como sua excreção é 99% renal e não sofre metabolização hepática, a insuficiência hepática grave da síndrome HELLP <strong>jamais</strong> contraindica ou exige redução da dose do sulfato de magnésio; em contrapartida, a disfunção renal aguda (creatinina ≥ 1,1–1,2 mg/dL ou diurese &lt; 25–30 mL/h) reduz drasticamente o clearance do íon magnésio e eleva o risco de intoxicação aguda.</p>
  <p>A sequência fisiopatológica da hipermagnesemia conforme a concentração sérica de magnésio é tema recorrente em provas de residência médica: a faixa terapêutica anticonvulsivante situa-se entre <strong>4 e 7 mEq/L</strong> (4,8 a 8,4 mg/dL). Quando os níveis atingem <strong>8 a 10 mEq/L</strong> (9,6 a 12 mg/dL), ocorre o primeiro sinal clínico de toxicidade: a <strong>abolição do reflexo patelar</strong> (arreflexia tendínea profunda). Entre <strong>10 e 12 mEq/L</strong> (> 12 mg/dL), instala-se <strong>depressão respiratória</strong> (frequência respiratória &lt; 16 irpm ou &lt; 12 irpm conforme protocolo) e sonolência acentuada/confusão. Acima de <strong>15 mEq/L</strong>, sobrevêm paralisia muscular generalizada e alterações de condução atrioventricular, culminando em <strong>parada cardiorrespiratória em assistolia</strong> quando os níveis ultrapassam 20 a 25 mEq/L. Diante de oligúria isolada (&lt; 25 mL/h) com reflexo patelar presente e frequência respiratória normal, mantém-se a vigilância estreita e ajusta-se/reduz-se a velocidade de infusão de manutenção pela metade; diante de abolição do reflexo patelar, suspende-se imediatamente a infusão de $MgSO_4$ e solicita-se magnesemia; diante de depressão respiratória ou parada respiratória, além de suspender o sulfato de magnésio e garantir suporte ventilatório/oxigenação, administra-se imediatamente o antídoto competitivo: <strong>Gluconato de Cálcio a 10%, 10 mL (1 grama), por via intravenosa lenta em 3 a 5 minutos</strong>.</p>

  <h3>21.3 Casos clínicos comentados adicionais (treinamento de alta complexidade)</h3>
  <div class="drive-block">
    <h4>Caso Clínico 4 — Síndrome HELLP com dor em hipocôndrio direito e choque hipovolêmico súbito</h4>
    <p><strong>Vinheta clínica:</strong> Gestante de 29 anos, G2P1, 33 semanas e 4 dias, dá entrada no pronto-socorro obstétrico com queixa de dor epigástrica e em hipocôndrio direito em barra há 6 horas, acompanhada de náuseas, vômitos e escotomas cintilantes. Na admissão: PA 170/115 mmHg, FC 98 bpm, FR 20 irpm, reflexo patelar vivo, BCF 136 bpm. Exames laboratoriais de urgência: Hb 9,4 g/dL, esquizócitos ++ no sangue periférico, LDH 940 U/L, bilirrubina indireta 1,9 mg/dL, AST (TGO) 380 U/L, ALT (TGP) 310 U/L, plaquetas 42.000/mm³, creatinina 1,2 mg/dL. Iniciados sulfato de magnésio (esquema de Zuspan: 4 g IV em 20 min seguido de 1 g/h IV em BIC) e nifedipina 10 mg VO. Quarenta minutos após a admissão, a paciente refere piora lancinante da dor abdominal difusa irradiada para o ombro direito (sinal de Kehr), evoluindo rapidamente com palidez cutaneomucosa intensa, sudorese fria, PA 78/45 mmHg, FC 138 bpm e bradicardia fetal sustentada (BCF 80 bpm). Tonus uterino fisiológico, sem sangramento vaginal.</p>
    <p><strong>Discussão diagnóstica e conduta:</strong> O quadro ilustra a complicação mais letal da síndrome HELLP completa (plaquetopenia classe I de Mississippi ≤ 50.000/mm³, hemólise microangiopática com esquizócitos e LDH ≥ 600 U/L, e AST/ALT ≥ 70 U/L): a <strong>rotura espontânea de hematoma subcapsular hepático</strong>. A dor em hipocôndrio direito/epigástrio (sinal de Chaussier) decorre da distensão da cápsula de Glisson por necrose periportal e hemorragia subcapsular; quando a cápsula se rompe para a cavidade peritoneal, instala-se hemoperitônio maciço com choque hipovolêmico súbito e sofrimento fetal agudo, mantendo o tônus uterino normal (o que ajuda a diferenciar do descolamento prematuro de placenta oculto). A conduta é emergencial e multidisciplinar: ativação do protocolo de transfusão maciça (concentrado de hemácias, plasma fresco congelado e transfusão de plaquetas para manter contagem &gt; 50.000/mm³ na cirurgia), reposição volêmica aquecida, laparotomia exploradora mediana imediata para extração fetal de emergência e controle de danos hepáticos (empacotamento peri-hepático com compressas — <em>packing</em> —, cauterização com argônio, embolização arterial seletiva ou ligadura de ramo da artéria hepática por cirurgião geral/hepatobiliar), evitando-se ressecções hepáticas extensas na vigência de coagulopatia e choque.</p>
  </div>
  <div class="drive-block">
    <h4>Caso Clínico 5 — Diagnóstico diferencial entre Síndrome HELLP e Esteatose Hepática Aguda da Gestação (EHAG)</h4>
    <p><strong>Vinheta clínica:</strong> Primigesta de 24 anos, 36 semanas de gestação de feto do sexo masculino, procura a maternidade por anorexia, náuseas, vômitos incoercíveis, polidipsia, poliúria e confusão mental progressiva há 3 dias, associada a icterícia franca. Ao exame físico: sonolenta (Glasgow 13), ictérica 3+/4+, PA 136/86 mmHg, FC 104 bpm, glicemia capilar de 38 mg/dL. Exames laboratoriais: leucócitos 19.500/mm³, plaquetas 95.000/mm³, Hb 11,8 g/dL sem esquizócitos, AST 420 U/L, ALT 490 U/L, bilirrubina total 8,4 mg/dL (direta 6,1 mg/dL), creatinina 2,1 mg/dL, ácido úrico 9,8 mg/dL, TP alargado (INR 2,6), fibrinogênio 110 mg/dL, antitrombina III acentuadamente reduzida e amônia sérica elevada.</p>
    <p><strong>Discussão diagnóstica e conduta:</strong> Embora compartilhe elevação de transaminases e trombocitopenia com a síndrome HELLP, a presença da tríade de <strong>insuficiência hepática fulminante (hipoglicemia grave &lt; 70 mg/dL, coagulopatia severa com hipofibrinogenemia/INR alargado por falência de síntese hepatocelular e encefalopatia hepática com hiperamonemia)</strong>, associada a icterícia colestática acentuada, leucocitose e diabetes insípido transitório (polidipsia/poliúria por redução da degradação hepática da vasopressinase placentária), sela o diagnóstico de <strong>Esteatose Hepática Aguda da Gestação (EHAG)</strong>, confirmada pelos Critérios de Swansea (≥ 6 de 14 critérios). Fisiopatologicamente, associa-se à deficiência fetal da enzima LCHAD (desidrogenase de 3-hidroxiacil-CoA de cadeia longa) na beta-oxidação mitocondrial de ácidos graxos, levando ao acúmulo tóxico de ácidos graxos livres microvesiculares nos hepatócitos maternos. A conduta exige internação em UTI, infusão contínua de glicose hipertônica (SG 10% a 50%) para reverter a hipoglicemia, correção da coagulopatia com plasma fresco congelado e crioprecipitado e resolução imediata da gestação após estabilização materna inicial.</p>
  </div>

  <h3>21.4 Questões comentadas adicionais de residência médica</h3>
  <ol class="fixation-list">
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 5 (ENAMED / Residência Médica — Rastreamento e Prevenção):</strong> Gestante de 34 anos, G2P1, comparece à primeira consulta de pré-natal com 11 semanas de idade gestacional. Refere que na gestação anterior teve parto pré-termo com 32 semanas devido a quadro de pré-eclâmpsia grave com restrição de crescimento fetal. Atualmente está assintomática, com PA 118/76 mmHg e IMC 26 kg/m². A dieta habitual da paciente inclui menos de uma porção de laticínios por dia. De acordo com os protocolos vigentes da RBEHG, FEBRASGO e Ministério da Saúde, qual é a prescrição profilática mais adequada e o respectivo momento de início?
      <br>A) Iniciar ácido acetilsalicílico (AAS) 100 a 150 mg/dia à noite entre 12 e 16 semanas (podendo ser iniciado até 20 semanas) até 36 semanas, associado à suplementação de carbonato de cálcio (1.000 a 2.000 mg/dia de cálcio elementar) até o parto.
      <br>B) Iniciar enoxaparina profilática 40 mg/dia subcutânea imediatamente no primeiro trimestre, associada a AAS 100 mg/dia e restrição rigorosa de sódio na dieta.
      <br>C) Aguardar a realização do Doppler de artérias uterinas com 24 semanas; iniciar AAS 100 mg/dia apenas se houver incisura protodiastólica bilateral.
      <br>D) Iniciar metildopa 750 mg/dia preventivamente a partir de 12 semanas para impedir a elevação pressórica no segundo trimestre.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: A.</strong><br><strong>Análise das alternativas:</strong> A alternativa A está correta: o antecedente de pré-eclâmpsia prévia (especialmente precoce &lt; 34 semanas) é fator de alto risco maior para recorrência. A profilaxia universalmente validada (estudo ASPRE, RBEHG, FEBRASGO e MS) consiste em AAS em baixa dose (100 mg no SUS/MS ou 100–150 mg segundo RBEHG/FIGO) administrado à noite, iniciado idealmente entre 12 e 16 semanas (quando ocorre a segunda onda de invasão trofoblástica das artérias espiraladas) e mantido até 36 semanas, somado à suplementação de cálcio elementar (1.000 a 2.000 mg/dia em tomadas fracionadas longe do sulfato ferroso) em gestantes com baixa ingesta dietética (&lt; 600–800 mg/dia). A alternativa B é incorreta porque heparina de baixo peso molecular não é indicada para profilaxia primária isolada de pré-eclâmpsia na ausência de trombofilia como SAF, e restrição de sódio não previne pré-eclâmpsia. A alternativa C é incorreta porque iniciar AAS apenas aos 24 semanas perde a janela biológica da remodelação vascular placentária. A alternativa D é incorreta porque anti-hipertensivos não previnem a fisiopatologia placentária da pré-eclâmpsia em pacientes normotensas.</div>
    </li>
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 6 (Residência Médica — Manejo da Eclâmpsia e Intoxicação por Magnésio):</strong> Primigesta de 19 anos, 35 semanas, internada por pré-eclâmpsia com sinais de gravidade em uso de sulfato de magnésio no esquema de Pritchard, apresenta episódio de crise convulsiva tônico-clônica generalizada no leito,40 minutos após a dose de ataque. A crise cessa após 90 segundos, mas 15 minutos depois a paciente apresenta nova crise convulsiva generalizada. Seus sinais vitais pós-ictais mostram PA 165/112 mmHg, FR 18 irpm, diurese de 40 mL na última hora e reflexo patelar presente. Qual é a conduta imediata mais apropriada para o controle da recorrência convulsiva?
      <br>A) Administrar diazepam 10 mg IV em bolus rápido e encaminhar imediatamente para cesariana de emergência sob anestesia geral antes da estabilização materna.
      <br>B) Administrar metade da dose de ataque de sulfato de magnésio (2 g IV lento em 5 a 15 minutos), associar hidralazina 5 mg IV ou nifedipina 10 mg VO para controle da crise hipertensiva e planejar a resolução da gestação após a estabilização hemodinâmica e neurológica materna.
      <br>C) Suspender o sulfato de magnésio por falha terapêutica, administrar gluconato de cálcio 1 g IV e iniciar fenitoína em dose de ataque de 15 mg/kg IV.
      <br>D) Dobrar a dose intramuscular de manutenção do sulfato de magnésio para 10 g IM a cada 2 horas sem administrar nova dose intravenosa.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: B.</strong><br><strong>Análise das alternativas:</strong> A alternativa B está correta: cerca de 10% das pacientes eclâmpticas podem apresentar recorrência da crise convulsiva mesmo após a dose inicial de sulfato de magnésio. Nessa situação, desde que não haja sinais de intoxicação magnesiana (reflexo patelar presente e FR ≥ 16 irpm), a conduta preconizada pelo Ministério da Saúde e pela RBEHG/FEBRASGO é administrar um bolus suplementar de <strong>2 g de sulfato de magnésio IV lento</strong> (metade da dose de ataque IV), controlar simultaneamente a hipertensão grave (PA ≥ 160/110 mmHg) com hidralazina IV ou nifedipina VO e indicar o parto somente após a completa estabilização materna (via de parto obstétrica, não sendo cesariana obrigatória em todos os casos, embora frequente em gestações longe do termo com colo desfavorável). A alternativa A é incorreta porque benzodiazepínicos deprimem o centro respiratório materno e neonatal e operar na vigência de instabilidade pós-ictal e acidose metabólica aumenta a mortalidade materna. A alternativa C é incorreta porque a fenitoína é significativamente inferior ao sulfato de magnésio (estudo Collaborative Eclampsia Trial) e o gluconato de cálcio só é indicado na intoxicação. A alternativa D é incorreta porque a via IM isolada não eleva rapidamente a magnesemia na recorrência aguda e 10 g IM de 2/2h causaria intoxicação letal.</div>
    </li>
  </ol>
</section>`;

// 2. Aula 029 — Diabetes Mellitus Gestacional (+11,500 chars)
const dmgSection = `<section id="integracao-clinica-avancada-2026" class="book-section">
  <h2>19. Integração fisiopatológica, protocolos de parto e casos comentados de residência</h2>
  <h3>19.1 Fisiologia placentária diabetogênica e embriopatia versus fetopatia diabética</h3>
  <p>A compreensão profunda do diabetes na gestação exige distinguir com clareza os mecanismos temporais que separam o <strong>diabetes pré-gestacional (overt diabetes / DM prévio)</strong> do <strong>diabetes mellitus gestacional (DMG verdadeiro)</strong>. No primeiro trimestre da gravidez fisiológica, sob ação do estrogênio e da progesterona e devido à captação contínua de glicose pelo trofoblasto e pelo embrião por difusão facilitada (transportadores GLUT-1 e GLUT-3 placentários), observa-se <strong>aumento da sensibilidade periférica à insulina</strong> e tendência à hipoglicemia materna de jejum. Portanto, a gestante que já no primeiro trimestre apresenta glicemia de jejum ≥ 126 mg/dL, HbA1c ≥ 6,5% ou glicemia ao acaso ≥ 200 mg/dL possui hiperglicemia periconcepcional estabelecida durante a fase crítica da organogênese embrionária (3ª à 8ª semana pós-concepção). Essa hiperglicemia precoce gera estresse oxidativo mitocondrial, depleção de mioinositol, excesso de radicais livres de oxigênio e inibição da expressão do gene <em>PAX3</em> na crista neural embrionária, resultando na <strong>embriopatia diabética (malformações congênitas maiores)</strong>: cardiopatias congênitas (transposição das grandes artérias, defeito do septo interventricular, truncus arteriosus, coarctação de aorta), defeitos de fechamento do tubo neural (anencefalia, mielomeningocele) e a patognomônica — embora rara — <strong>síndrome de regressão caudal (agenesia sacral)</strong>. O risco de malformações correlaciona-se diretamente com o nível de HbA1c periconcepcional, motivo pelo qual a ecocardiografia fetal detalhada (entre 24 e 28 semanas) e o ultrassom morfológico de 1º e 2º trimestres são mandatórios no diabetes prévio.</p>
  <p>Em contrapartida, no DMG clássico que se instala a partir da <strong>segunda metade da gestação (20ª a 28ª semana)</strong>, a organogênese já está concluída — portanto, <strong>não há aumento do risco basal de malformações congênitas estruturais</strong> se a glicemia do 1º trimestre era normal. O que ocorre a partir de 20–24 semanas é a elevação progressiva dos hormônios contrarreguladores placentários: <strong>hormônio lactogênio placentário humano (hPL ou somatomamotropina coriônica)</strong>, hormônio do crescimento placentário (hGH-V), progesterona, cortisol livre, prolactina e citocinas inflamatórias (TNF-alfa e leptina). O hPL estimula a lipólise materna (liberando ácidos graxos livres que fornecem energia para a mãe) e bloqueia a cascata pós-receptor de tirosina-quinase do receptor de insulina (IRS-1/PI3K), reduzindo em 50% a 60% a captação periférica de glicose mediada por GLUT-4 no músculo esquelético e no tecido adiposo maternos (estado de resistência insulínica fisiológica para poupar glicose para o feto). Quando as células beta pancreáticas maternas não conseguem triplicar sua secreção de insulina para vencer essa resistência, instala-se a hiperglicemia materna pós-prandial e de jejum. Pela hipótese de <strong>Pedersen</strong>, a glicose materna atravessa livremente a placenta por difusão facilitada, enquanto a insulina materna (polipeptídeo de alto peso molecular) não atravessa a barreira placentária. O pâncreas fetal responde à hiperglicemia intrauterina com hiperplasia das ilhotas de Langerhans e <strong>hiperinsulinemia fetal endógena</strong>, que atua como potente hormônio anabólico e fator de crescimento semelhante à insulina (IGF-1), desencadeando a <strong>fetopatia diabética</strong>:</p>
  <ul>
    <li><strong>Macrossomia fetal e crescimento desproporcional (assimétrico):</strong> deposição exagerada de gordura subcutânea nos tecidos insulino-sensíveis (cintura escapular, tórax e abdome), elevando a circunferência abdominal fetal (CA &gt; p75 ou &gt; p90) enquanto o diâmetro biparietal (DBP) e o comprimento do fêmur permanecem normais, o que predispõe fortemente à <strong>distocia de espáduas (ombros)</strong> e lesão do plexo braquial (paralisia de Erb-Duchenne C5–C6) no parto vaginal.</li>
    <li><strong>Polidramnia (ILA ≥ 24 cm ou maior bolsão vertical ≥ 8 cm):</strong> a hiperglicemia fetal ultrapassa o limiar tubular renal do feto, provocando glicosúria e diurese osmótica fetal acentuada (poliúria fetal intrauterina), que distende o útero e aumenta o risco de trabalho de parto prematuro, rotura prematura de membranas, prolapso de cordão e atonia uterina pós-parto.</li>
    <li><strong>Atraso da maturação pulmonar fetal e Síndrome do Desconforto Respiratório (SDR):</strong> a hiperinsulinemia fetal antagoniza diretamente a ação do cortisol sobre os pneumócitos tipo II, bloqueando a síntese de lecitina (fosfatidilcolina saturada) e fosfatidilglicerol do surfactante pulmonar, fazendo com que fetos a termo (37–38 semanas) de mães diabéticas descompensadas apresentem pulmões bioquimicamente imaturos.</li>
    <li><strong>Hipoxemia crônica intrauterina, policitemia, hiperbilirrubinemia e óbito fetal súbito:</strong> o hipermetabolismo oxidativo induzido pela hiperinsulinemia aumenta o consumo fetal de oxigênio; associada à glicação da hemoglobina fetal (HbF glicada com maior afinidade pelo $O_2$), gera hipóxia tecidual relativa, descarga de eritropoietina renal fetal, eritropoiese extramedular e <strong>policitemia neonatal</strong> (hematócrito venoso &gt; 65%), que no pós-parto leva à hiperviscosidade sanguínea, trombose de veia renal e icterícia neonatal intensa por hemólise das hemácias excedentes.</li>
    <li><strong>Distúrbios metabólicos neonatais imediatos:</strong> após o clampeamento do cordão umbilical, cessa abruptamente o aporte materno contínuo de glicose, mas a hiperinsulinemia fetal persiste nas primeiras horas de vida, provocando <strong>hipoglicemia neonatal precoce grave</strong>, além de hipocalcemia (por hipoparatireoidismo funcional transitório) e hipomagnesemia.</li>
  </ul>

  <h3>19.2 Manejo glicêmico intraparto, via de parto e acompanhamento puerperal</h3>
  <div class="book-table-scroll" role="region" aria-label="Tabela de condutas no parto e puerpério do DMG" tabindex="0">
    <table class="book-table">
      <thead>
        <tr>
          <th>Momento Assistencial</th>
          <th>Conduta no DMG Bem Controlado com Dieta e Exercício (DMG A1)</th>
          <th>Conduta no DMG com Uso de Insulina (DMG A2) ou DM Prévio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Idade Gestacional de Resolução</strong></td>
          <td>Aguardar evolução espontânea até <strong>40 semanas e 6 dias</strong> se vitalidade fetal e curva glicêmica normais; não ultrapassar 41 semanas.</td>
          <td>Se compensado sem vasculopatia: resolução eletiva entre <strong>38 semanas e 39 semanas e 6 dias</strong>. Se descompensado, com macrossomia progressiva, vasculopatia ou óbito fetal prévio: individualizar entre <strong>36 e 38 semanas</strong> (ou antes se sofrimento fetal).</td>
        </tr>
        <tr>
          <td><strong>Escolha da Via de Parto</strong></td>
          <td>Indicação obstétrica (parto vaginal preferencial). O diagnóstico de DMG isoladamente <strong>não é indicação de cesariana</strong>.</td>
          <td>Indicação obstétrica. Considerar cesariana eletiva profilática quando o peso fetal estimado ao ultrassom for <strong>≥ 4.000 g a 4.500 g</strong> (FEBRASGO/ACOG destacam alto risco de distocia de ombros acima de 4.000–4.500 g em fetos de mães diabéticas).</td>
        </tr>
        <tr>
          <td><strong>Manejo da Insulina e Glicemia no Trabalho de Parto</strong></td>
          <td>Suspender dieta sólida na fase ativa, manter hidratação e monitorar glicemia capilar a cada 2 a 4 horas (meta intraparto: <strong>70 a 110–120 mg/dL</strong>).</td>
          <td>Reduzir/suspender insulina de ação rápida se em jejum; em cesariana programada pela manhã, administrar 1/3 a 1/2 da dose de NPH ou manter protocolo de infusão venosa (glicose 5% + insulina regular IV conforme glicemia capilar horária, mantendo meta de <strong>70 a 120 mg/dL</strong> para prevenir hipoglicemia neonatal de rebote).</td>
        </tr>
        <tr>
          <td><strong>Conduta Imediata no Puerpério e Reclassificação</strong></td>
          <td>Suspender monitorização intensiva após 24–48h se normoglicêmica; dieta livre; estimular aleitamento materno (reduz risco futuro de DM2 na mãe e no filho). Solicitar <strong>TOTG 75 g (2h) em 6 semanas pós-parto</strong>.</td>
          <td>No DMG insulino-tratado: <strong>suspender a insulina imediatamente após a dequitação placentária</strong> (queda abrupta do hPL) e observar glicemia por 24–48h. No DM1/DM2 prévio: reduzir a dose de insulina para <strong>cerca de 50% da dose do final da gestação</strong> (ou retornar à dose pré-gravídica) para evitar hipoglicemia puerperal grave.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>19.3 Casos clínicos e questões comentadas suplementares</h3>
  <div class="drive-block">
    <h4>Caso Clínico 5 — Interpretação do TOTG 75g e indicação de insulinoterapia</h4>
    <p><strong>Vinheta clínica:</strong> Gestante de 31 anos, G1P0, iniciou pré-natal com 9 semanas apresentando glicemia de jejum de 86 mg/dL. Com 25 semanas, realizou Teste Oral de Tolerância à Glicose com 75 g de dextrosol anidro (TOTG 75 g), cujos resultados foram: jejum = 91 mg/dL; 1 hora = 184 mg/dL; 2 horas = 148 mg/dL. Orientada sobre terapia nutricional fracionada (6 refeições/dia sem sacarose refinada) e caminhadas diárias de 30 minutos pós-prandiais. Após 14 dias de adesão rigorosa, traz mapa de automonitorização da glicemia capilar (AMGC) em 4 pontos diários com 40% das medidas de 1 hora pós-almoço e pós-jantar acima de 145 mg/dL (variando entre 148 e 168 mg/dL) e medidas de jejum entre 96 e 104 mg/dL. Ultrassonografia obstétrica com 28 semanas mostra feto no percentil 70 de peso estimado, circunferência abdominal no percentil 82 e ILA de 19 cm.</p>
    <p><strong>Discussão diagnóstica e conduta:</strong> No rastreamento universal de 24 a 28 semanas pelos critérios da IADPSG/OMS/SBD/FEBRASGO/Ministério da Saúde (pontos de corte no TOTG 75 g: <strong>Jejum ≥ 92 mg/dL; 1h ≥ 180 mg/dL; 2h ≥ 153 mg/dL</strong>), basta <strong>um único valor igual ou superior ao ponto de corte</strong> para confirmar o diagnóstico de DMG (neste caso, 1h = 184 mg/dL ≥ 180 mg/dL). Após duas semanas de mudança do estilo de vida (dieta + exercício), a persistência de ≥ 30% das glicemias capilares fora das metas terapêuticas (metas: <strong>jejum &lt; 95 mg/dL; 1h pós-prandial &lt; 140 mg/dL; 2h pós-prandial &lt; 120 mg/dL</strong>), somada ao sinal ultrassonográfico precoce de hiperinsulinismo fetal (circunferência abdominal fetal ≥ p75), impõe o início imediato de <strong>insulinoterapia subcutânea</strong> (fármaco de 1ª escolha absoluta, dose inicial total calculada em 0,5 UI/kg/dia combinando insulina NPH basal com insulina regular ou análogo ultrarrápido lispro/asparte pré-prandial). A metformina fica reservada apenas como alternativa de exceção na impossibilidade absoluta de armazenamento/aplicação de insulina ou recusa invencível, pois atravessa livremente a barreira placentária.</p>
  </div>

  <ol class="fixation-list">
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 5 (Residência Médica — Diagnóstico na 1ª Consulta vs 24–28 Semanas):</strong> Gestante de 27 anos comparece à segunda consulta de pré-natal com 10 semanas de idade gestacional trazendo exames solicitados na abertura do cartão: glicemia plasmática de jejum = 94 mg/dL. A paciente está assintomática e nega diagnóstico prévio de diabetes. Segundo o Consenso Brasileiro de Diabetes Gestacional (OPAS / Ministério da Saúde / FEBRASGO / SBD) em cenário de viabilidade financeira plena, qual é o diagnóstico e a conduta imediata?
      <br>A) Glicemia de jejum normal para o primeiro trimestre; repetir glicemia de jejum apenas com 28 semanas.
      <br>B) Diagnóstico confirmado de Diabetes Mellitus Gestacional (DMG) já no primeiro trimestre (pois jejum entre 92 e 125 mg/dL); iniciar imediatamente orientação nutricional, atividade física regular e automonitorização da glicemia capilar (AMGC), dispensando a realização do TOTG 75 g entre 24 e 28 semanas.
      <br>C) Diagnóstico de Diabetes Mellitus pré-gestacional (overt diabetes); solicitar TOTG 75 g imediatamente com 10 semanas para confirmação.
      <br>D) Solicitar hemoglobina glicada (HbA1c) e só iniciar dieta se o valor for superior a 6,5%.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: B.</strong><br><strong>Análise das alternativas:</strong> A alternativa B está correta: de acordo com o fluxograma oficial da OPAS/MS/FEBRASGO/SBD, toda gestante com glicemia de jejum no 1º trimestre (&lt; 20 semanas) entre <strong>92 e 125 mg/dL</strong> recebe o diagnóstico imediato de <strong>Diabetes Mellitus Gestacional (DMG)</strong>, devendo iniciar tratamento não farmacológico (dieta + exercício) e automonitorização glicêmica capilar sem necessidade de se submeter à sobrecarga do TOTG 75 g entre 24 e 28 semanas (que só é indicado quando a glicemia de jejum inicial é &lt; 92 mg/dL). A alternativa A é incorreta porque o limite superior de normalidade na gestação é &lt; 92 mg/dL. A alternativa C é incorreta porque o DM prévio (overt diabetes) exige jejum ≥ 126 mg/dL, glicemia ao acaso ≥ 200 mg/dL ou HbA1c ≥ 6,5%, e o TOTG não é rotina de 1º trimestre. A alternativa D é incorreta porque HbA1c &lt; 6,5% não exclui DMG diagnosticado pela glicemia de jejum ≥ 92 mg/dL.</div>
    </li>
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 6 (Residência Médica — Complicações Fetais e Malformações):</strong> Em relação às repercussões materno-fetais e neonatais da hiperglicemia na gestação, assinale a alternativa fisiopatologicamente correta:
      <br>A) O diabetes mellitus gestacional (DMG) diagnosticado no TOTG de 26 semanas com glicemia de jejum normal no primeiro trimestre associa-se a elevado risco de síndrome de regressão caudal e transposição das grandes artérias.
      <br>B) A hiperinsulinemia fetal estimula diretamente a síntese de surfactante pulmonar pelos pneumócitos tipo II, reduzindo a incidência de síndrome do desconforto respiratório no recém-nascido.
      <br>C) A polidramnia observada em gestantes diabéticas descompensadas decorre da diurese osmótica fetal secundária à hiperglicemia e glicosúria intrauterinas, enquanto a hipoglicemia neonatal precoce resulta da persistência do hiperinsulinismo fetal após a interrupção abrupta do aporte materno de glicose no clampeamento do cordão.
      <br>D) A insulina exógena NPH administrada à gestante atravessa livremente a barreira placentária por difusão facilitada, sendo a principal responsável pela macrossomia fetal.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: C.</strong><br><strong>Análise das alternativas:</strong> A alternativa C descreve com exatidão os mecanismos da poliúria osmótica fetal causadora da polidramnia e do hiperinsulinismo endógeno residual causador da hipoglicemia neonatal nas primeiras horas de vida. A alternativa A é incorreta porque malformações congênitas estruturais (embriopatia diabética, como regressão caudal e cardiopatias conotruncais) decorrem de hiperglicemia periconcepcional nas primeiras 8 semanas (DM pré-gestacional), e não do DMG iniciado após 20–24 semanas. A alternativa B é incorreta porque a insulina fetal <em>inibe</em> a ação do cortisol sobre o pneumócito tipo II, atrasando a síntese de fosfatidilglicerol e lecitina e aumentando o risco de doença da membrana hialina (SDR). A alternativa D é incorreta porque a insulina materna ou exógena não atravessa a placenta em quantidades significativas; quem atravessa é a glicose materna, que estimula o pâncreas fetal a secretar sua própria insulina (hipótese de Pedersen).</div>
    </li>
  </ol>
</section>`;

// 3. Aula 039 — Hemorragias da Primeira e Segunda Metade / Sangramento na Primeira Metade (+10,500 chars)
const hemorragiasSection = `<section id="integracao-clinica-avancada-2026" class="book-section">
  <h2>21. Aprofundamento clínico-cirúrgico nas hemorragias obstétricas de 1ª e 2ª metades</h2>
  <h3>21.1 Critérios ultrassonográficos e farmacológicos na Gestação Ectópica e Doença Trofoblástica Gestacional</h3>
  <p>Na abordagem diagnóstica do sangramento da primeira metade da gestação, a integração entre a curva quantitativa da fração beta da gonadotrofina coriônica humana ($\beta$-hCG sérico) e a ultrassonografia transvaginal (USTV) de alta resolução constitui o pilar decisório para diferenciar gestação intrauterina tópica viável, perda gestacional precoce (abortamento/gestação anembrionada) e <strong>gestação ectópica</strong>. Na gestação tópica evolutiva normal do primeiro trimestre inicial, os níveis séricos de $\beta$-hCG aumentam no mínimo <strong>35% a 53% em 48 horas</strong> (classicamento dobrando a cada 48 a 72 horas). A chamada <strong>zona discriminatória do $\beta$-hCG</strong> (atualmente estabelecida de forma conservadora entre <strong>2.000 e 3.500 mUI/mL</strong> segundo ACOG e FEBRASGO para evitar iatrogenia em gestações desejadas) define o patamar bioquímico acima do qual um saco gestacional intrauterino tópico deve ser visualizado ao USTV. A ausência de saco gestacional intrauterino com $\beta$-hCG acima de 3.500 mUI/mL, ou a identificação de massa anexial extraovariana heterogênea (sinal do <em>blob</em>) ou anel tubário hiperecogênico com fluxo periférico ao Doppler (sinal do <em>anel de fogo</em>), estabelece o diagnóstico de gestação ectópica (95–98% tubária, sendo a região <strong>ampular</strong> a localização mais comum, e a região <strong>ístmica</strong> a mais associada à rotura precoce nas primeiras 6 a 8 semanas).</p>
  <p>O tratamento medicamentoso sistêmico da gestação ectópica íntegra com <strong>metotrexato (MTX)</strong> — antagonista competitivo da enzima di-hidrofolato redutase que bloqueia a síntese de timidilato e purinas no trofoblasto em rápida proliferação — exige o preenchimento rigoroso de critérios de elegibilidade: estabilidade hemodinâmica absoluta, ausência de dor abdominal intensa ou sinais de rotura tubária, diâmetro da massa ectópica <strong>≤ 3,5 a 4,0 cm</strong>, <strong>ausência de batimento cardíaco embrionário (BCF ausente)</strong> no anexo e $\beta$-hCG basal <strong>≤ 5.000 mUI/mL</strong> (além de função hepática, renal e hemograma normais, sem aleitamento materno ou imunodeficiência). No protocolo clássico de <strong>dose única</strong> (50 mg/m² de superfície corporal IM no dia 1), dosa-se o $\beta$-hCG nos dias <strong>D4 e D7</strong>: espera-se uma queda de pelo menos <strong>15% entre os valores do D4 e do D7</strong> (lembrando que entre D1 e D4 o $\beta$-hCG pode subir fisiologicamente pela lise trofoblástica). Se a queda entre D4 e D7 for &ge; 15%, acompanha-se semanalmente até negativação; se for &lt; 15%, administra-se segunda dose de MTX ou indica-se laparoscopia. Na gestação ectópica rota (instabilidade hemodinâmica, defesa peritoneal, sinal de Lafon/Kehr, sinal de Proust/grito de Douglas no fundo de saco posterior), a conduta imediata é cirúrgica por <strong>salpingectomia</strong> laparotômica (no choque) ou laparoscópica.</p>
  <div class="book-table-scroll" role="region" aria-label="Tabela diferencial Mola Hidatiforme Completa vs Parcial" tabindex="0">
    <table class="book-table">
      <thead>
        <tr>
          <th>Parâmetro Clínico e Genético</th>
          <th>Mola Hidatiforme Completa</th>
          <th>Mola Hidatiforme Parcial (Incompleta)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cariótipo e Origem Genética</strong></td>
          <td><strong>Diploide exclusivamente paterna (androgênica):</strong> 90% <strong>46,XX</strong> (fecundação de óvulo "vazio" sem cromossomos maternos por um espermatozoide 23,X que se duplica) ou 10% <strong>46,XY</strong> (dispermia em óvulo anucleado).</td>
          <td><strong>Triploide diândrica (materna + paterna):</strong> <strong>69,XXY</strong>, <strong>69,XXX</strong> ou <strong>69,XYY</strong> (fecundação de um óvulo haploide normal 23,X por dois espermatozoides ou um espermatozoide diploide).</td>
        </tr>
        <tr>
          <td><strong>Embrião / Feto e Âmnio</strong></td>
          <td><strong>Ausentes</strong> (não há elementos embrionários nem hemácias fetais).</td>
          <td><strong>Presentes</strong> (embrião/feto geralmente com múltiplas malformações triploides e restrição grave do crescimento, evoluindo para óbito precoce).</td>
        </tr>
        <tr>
          <td><strong>Imuno-histoquímica para $p57^{KIP2}$</strong></td>
          <td><strong>Negativa ($p57^-$)</strong> no citotrofoblasto e estroma viloso (pois o gene <em>CDKN1C</em> sofre imprinting paterno e só é expresso pelo alelo materno, que está ausente na mola completa).</td>
          <td><strong>Positiva ($p57^+$)</strong> nos núcleos do citotrofoblasto e células estromais (devido à presença do conjunto haploide materno).</td>
        </tr>
        <tr>
          <td><strong>Quadro Clínico e $\beta$-hCG</strong></td>
          <td>$\beta$-hCG extremamente elevado (&gt; 100.000 mUI/mL), útero aumentado para a IG, eliminação de vesículas ("cachos de uva"), cistos tecaluteínicos bilaterais (&gt; 6 cm), hiperêmese gravídica, hipertireoidismo clínico (homologia alfa com TSH) e <strong>pré-eclâmpsia precoce (&lt; 20 semanas)</strong>.</td>
          <td>Quadro clínico frustro, simulando abortamento retido ou incompleto; $\beta$-hCG menos elevado; útero normal ou pequeno para a IG; raros cistos tecaluteínicos.</td>
        </tr>
        <tr>
          <td><strong>Risco de Evolução para NTG Maligna</strong></td>
          <td><strong>15% a 20%</strong> (mola invasora ou coriocarcinoma; metástases mais comuns: 1º pulmão [80%], 2º vagina [30%], 3º pelve, fígado e cérebro).</td>
          <td><strong>1% a 5%</strong> (raramente metastática; exige o mesmo seguimento pós-molar rigoroso com $\beta$-hCG seriado e anticoncepção hormonal).</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>21.2 Espectro da Placenta Acreta (PAS), Vasa Prévia e Rotura Uterina na 2ª Metade</h3>
  <p>Nas hemorragias da segunda metade da gestação, toda paciente com <strong>placenta prévia</strong> implantada sobre cicatriz de cesariana anterior apresenta risco exponencial de <strong>Espectro do Acretismo Placentário (PAS)</strong>, decorrente da ausência ou defeito da camada esponjosa da decídua basal (camada de Nitabuch), permitindo que as vilosidades coriônicas se fixem diretamente à superfície do miométrio sem invadi-lo (<strong>placenta acreta</strong>, ~75–80%), invadam a espessura muscular do miométrio (<strong>placenta increta</strong>, ~15%) ou ultrapassem a serosa uterina invadindo órgãos adjacentes como a cúpula vesical (<strong>placenta percreta</strong>, ~5–7%). Com uma cesárea prévia e placenta prévia anterior, o risco de acretismo é de ~11%; com duas cesáreas prévias, sobe para ~40%; com três ou mais cesáreas prévias, ultrapassa <strong>60%</strong>. O diagnóstico antenatal apoia-se no USTV com Doppler colorido (desaparecimento da zona hipoecoica retroplacentária, múltiplas lacunas vasculares intraplacentárias com fluxo turbulento em "queijo suíço", adelgaçamento miometrial &lt; 1 mm e hipervascularização da interface útero-vesical) e na ressonância magnética pélvica (especialmente útil em placentas posteriores ou suspeita de invasão parametrial/vesical). A conduta padrão-ouro no acretismo confirmado é a <strong>cesárea-histerectomia total programada entre 34 e 36 semanas</strong> em centro terciário, realizando histerotomia corporal alta/fúndica (longe da borda placentária) para extração fetal e mantendo a placenta <em>in situ</em> sem qualquer tentativa de dequitação manual forçada (que desencadearia choque hemorrágico exsanguinante).</p>

  <h3>21.3 Casos clínicos e questões comentadas adicionais de residência</h3>
  <div class="drive-block">
    <h4>Caso Clínico 5 — Descolamento Prematuro de Placenta (DPP) com Coagulopatia e Útero de Couvelaire</h4>
    <p><strong>Vinheta clínica:</strong> Gestante de 33 anos, G3P2 (2 partos vaginais), 34 semanas, hipertensa crônica má aderente ao tratamento, dá entrada na emergência com dor abdominal súbita, lancinante e contínua há 1 hora, acompanhada de sangramento vaginal escuro em moderada quantidade. Ao exame: PA 150/100 mmHg (mas FC 124 bpm, extremidades frias e sudoreicas), útero lenhoso (hipertonia uterina permanente sem relaxamento), altura uterina aumentada em relação ao cartão de pré-natal e batimentos cardíacos fetais de 90 bpm (bradicardia fetal grave). Ao toque vaginal cauteloso (após conferir USG prévio de 28 semanas com placenta fúndica): colo pérvio para 3 cm, bolsa das águas tensa ("em ampulheta").</p>
    <p><strong>Discussão diagnóstica e conduta:</strong> Trata-se de <strong>Descolamento Prematuro de Placenta (DPP) Grau IIIA de Sher</strong> se evoluir para óbito fetal sem coagulopatia, ou <strong>Grau II de Sher</strong> no momento atual (hipertonia uterina clássica + feto vivo com sinais de sofrimento fetal agudo grave). Com o feto vivo e bradicárdico e dilatação inicial de 3 cm, a conduta salvadora é a <strong>amniotomia imediata</strong> (para reduzir a pressão intra-amniótica, diminuir a infiltração sanguínea miometrial e reduzir o passagem de tromboplastina tecidual para a circulação materna) seguida de <strong>cesariana de emergência imediata</strong> (via mais rápida diante de feto vivo em sofrimento agudo sem parto vaginal iminente). No intraoperatório, caso se observe infiltração hemorrágica difusa do miométrio e da serosa conferindo aspecto violáceo/tigrado ao órgão (<strong>apoplexia uteroplacentária ou útero de Couvelaire</strong>), a conduta inicial é <strong>conservadora</strong> (massagem uterina, uterotônicos como ocitocina, metilergometrina se não hipertensa, misoprostol, ácido tranexâmico e suturas hemostáticas de B-Lynch), reservando-se a histerectomia puerperal apenas para a atonia uterina refratária às medidas conservadoras.</p>
  </div>

  <ol class="fixation-list">
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 5 (Residência Médica — Seguimento Pós-Molar e Quimioterapia):</strong> Paciente de 26 anos foi submetida a esvaziamento uterino por aspiração manual intrauterina (AMIU) devido a mola hidatiforme completa, cujo anatomopatológico confirmou proliferação trofoblástica circunferencial, vilosidades hidrópicas avasculares com cisterna central e ausência de tecidos fetais ($p57^{KIP2}$ negativo). No seguimento pós-molar semanal com dosagem quantitativa de $\beta$-hCG, observou-se queda progressiva nas primeiras 4 semanas (de 180.000 para 2.400 mUI/mL), seguida pelos seguintes valores nas três semanas subsequentes: Semana 5 = 2.650 mUI/mL; Semana 6 = 3.120 mUI/mL; Semana 7 = 4.050 mUI/mL. A paciente utiliza anticoncepcional hormonal oral combinado regularmente. Qual é o diagnóstico e a conduta preconizada pela FIGO / FEBRASGO?
      <br>A) Realizar nova curetagem uterina de repetição imediatamente e manter observação clínica por mais 6 meses sem quimioterapia.
      <br>B) Diagnóstico de Neoplasia Trofoblástica Gestacional (NTG) pós-molar (elevação do $\beta$-hCG ≥ 10% em 3 dosagens semanais consecutivas ao longo de 2 semanas); realizar estadiamento (radiografia/TC de tórax, USG pélvico/Doppler) e iniciar quimioterapia (monoterapia com metotrexato ou actinomicina-D se baixo risco FIGO ≤ 6).
      <br>C) Suspender o anticoncepcional oral, pois o estrogênio exógeno é a causa da elevação do $\beta$-hCG no seguimento pós-molar.
      <br>D) Aguardar 6 meses completos após o esvaziamento, pois o diagnóstico de NTG só pode ser firmado se o $\beta$-hCG permanecer positivo após 24 semanas.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: B.</strong><br><strong>Análise das alternativas:</strong> A alternativa B está correta: os critérios diagnósticos universais da FIGO para Neoplasia Trofoblástica Gestacional (NTG) pós-molar incluem: (1) <strong>elevação de ≥ 10% nos níveis de $\beta$-hCG em 3 valores consecutivos ao longo de 2 semanas</strong> (dias 1, 7 e 14); ou (2) <strong>platô do $\beta$-hCG (variação &lt; 10%) em 4 valores consecutivos ao longo de 3 semanas</strong> (dias 1, 7, 14 e 21); ou (3) diagnóstico histológico de coriocarcinoma; ou (4) presença de metástases. Confirmada a NTG, realiza-se o estadiamento anatômico e o escore prognóstico da OMS/FIGO: escore 0 a 6 define baixo risco (tratado com agente único: metotrexato com ácido folínico ou actinomicina-D, com cura &gt; 98%), e escore ≥ 7 define alto risco (poliquimioterapia EMA-CO). A alternativa A é incorreta porque nova curetagem aumenta o risco de perfuração uterina e hemorragia sem substituir a quimioterapia. A alternativa C é incorreta porque a anticoncepção hormonal oral é obrigatória durante todo o seguimento pós-molar e não eleva o $\beta$-hCG. A alternativa D é incorreta porque o critério de 6 meses foi abolido pelas diretrizes atuais da FIGO.</div>
    </li>
    <li class="fixation-item">
      <div class="fixation-question"><strong>Questão Comentada 6 (Residência Médica — Vasa Prévia vs Rotura de Seio Marginal):</strong> Gestante de 38 semanas, em trabalho de parto espontâneo com 5 cm de dilatação e dinâmica uterina regular (3 contrações/10 min, tônus uterino normal nos intervalos), é submetida a amniotomia artificial. Imediatamente após a saída do líquido amniótico, observa-se sangramento vaginal vermelho-vivo indolor em moderada quantidade e a cardiotocografia passa a exibir desacelerações variáveis graves seguidas de bradicardia fetal sustentada (65 bpm) com padrão sinusoidal. Os sinais vitais maternos permanecem estáveis (PA 115/75 mmHg, FC 82 bpm). Qual é a hipótese diagnóstica mais provável e a conduta imediata?
      <br>A) Rotura de vasa prévia (sangramento de origem fetal por laceração de vasos umbilicais desprotegidos percorrendo as membranas sobre o orifício interno do colo); realizar cesariana de emergência imediata.
      <br>B) Rotura de seio marginal; manter conduta expectante e aguardar evolução para parto vaginal, pois o sangramento é materno e autolimitado.
      <br>C) Descolamento prematuro de placenta (DPP); administrar tocolítico venoso para recuperar os batimentos fetais.
      <br>D) Rotura uterina consumada com sinal de Bandl-Frommel; indicar fórceps de alívio imediato.</div>
      <div class="fixation-actions"><button class="fixation-toggle" type="button">Mostrar resposta</button></div>
      <div class="fixation-answer" hidden><strong>Gabarito: A.</strong><br><strong>Análise das alternativas:</strong> A alternativa A está correta: o quadro clássico de sangramento vaginal vermelho-vivo indolor deflagrado exatamente no momento da rotura das membranas (amniorrexe espontânea ou amniotomia), acompanhado de <strong>sofrimento fetal hiperagudo (bradicardia grave ou padrão sinusoidal por anemia aguda fetal/exsanguinação fetal)</strong> com estabilidade hemodinâmica materna e tônus uterino normal, é patognomônico de <strong>rotura de vasa prévia</strong> (associada a inserção velamentosa do cordão umbilical, placenta bilobada ou lobo succenturiado). Como a volemia total de um feto a termo é de apenas ~250–300 mL, perdas de 50 a 100 mL levam ao choque hipovolêmico fetal e óbito em minutos, exigindo cesariana de emergência imediata. Na rotura de seio marginal (alternativa B), o sangramento é de origem materna e a vitalidade fetal permanece preservada.</div>
    </li>
  </ol>
</section>`;

// 4. Aula 041 — Choque Circulatório (+9,500 chars)
const choqueSection = `<section id="integracao-clinica-avancada-2026" class="book-section">
  <h2>23. Aprofundamento hemodinâmico invasivo, farmacologia vasoativa e questões integradoras</h2>
  <h3>23.1 Perfis hemodinâmicos clássicos no Cateter de Artéria Pulmonar (Swan-Ganz) e Termodiluição</h3>
  <p>Embora a ecocardiografia crítica à beira-leito (POCUS/RUSH) tenha substituído o uso rotineiro do cateter de artéria pulmonar (Swan-Ganz) na maioria dos choques não complicados, o domínio da interpretação quantitativa das variáveis hemodinâmicas invasivas permanece indispensável tanto na terapia intensiva cardiovascular (choque cardiogênico avançado, falência biventricular, hipertensão pulmonar grave e choque misto refratário) quanto nas provas de residência médica e título de especialista. O raciocínio hemodinâmico divide os parâmetros em quatro eixos fundamentais: (1) <strong>pressões de enchimento / pré-carga</strong>: Pressão Venosa Central (PVC, normal 2–8 mmHg, refletindo pressão atrial direita e pré-carga do VD) e Pressão de Oclusão da Artéria Pulmonar ou Pressão Capilar Pulmonar (POAP/PCP, normal 6–12 mmHg, refletindo pressão atrial esquerda e pressão diastólica final do VE); (2) <strong>fluxo sanguíneo anterógrado</strong>: Débito Cardíaco (DC, normal 4,0–8,0 L/min) e Índice Cardíaco (IC = DC / Superfície Corporal, normal 2,5–4,0 L/min/m²); (3) <strong>pós-carga arterial</strong>: Resistência Vascular Sistêmica ($RVS = [(PAM - PVC) / DC] \times 80$, normal 800–1.200 $\text{dinas}\cdot\text{s}\cdot\text{cm}^{-5}$) e Índice de Resistência Vascular Sistêmica (IRVS, normal 1.800–2.400); e (4) <strong>acoplamento oferta-consumo tecidual de oxigênio</strong>: Saturação Venosa Mista de Oxigênio ($SvO_2$, colhida na ponta distal da artéria pulmonar, normal 65–75%) ou Saturação Venosa Central ($SvcO_2$, colhida na veia cava superior, normal $\ge 70\%$).</p>
  <div class="book-table-scroll" role="region" aria-label="Tabela de perfis hemodinâmicos no Swan-Ganz" tabindex="0">
    <table class="book-table">
      <thead>
        <tr>
          <th>Tipo e Subtipo de Choque</th>
          <th>PVC (AD)<br>(2–8 mmHg)</th>
          <th>POAP / PCP (AE)<br>(6–12 mmHg)</th>
          <th>Débito / Índice Cardíaco<br>(IC 2,5–4,0)</th>
          <th>RVS (Pós-carga)<br>(800–1.200)</th>
          <th>$SvO_2$ / $SvcO_2$<br>(65–75%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Choque Hipovolêmico</strong> (hemorrágico, desidratação, queimadura)</td>
          <td><strong>↓↓ Reduzida</strong> (&lt; 2 mmHg)</td>
          <td><strong>↓↓ Reduzida</strong> (&lt; 6 mmHg)</td>
          <td><strong>↓↓ Reduzido</strong></td>
          <td><strong>↑↑ Elevada</strong> (vasoconstrição adrenérgica compensatória)</td>
          <td><strong>↓↓ Reduzida</strong> (&lt; 65% por extração tecidual máxima de $O_2$)</td>
        </tr>
        <tr>
          <td><strong>Choque Cardiogênico de VE</strong> (IAM anterior extenso, miocardite)</td>
          <td>Normal ou ↑</td>
          <td><strong>↑↑ Elevada</strong> (&gt; 18 mmHg, congestão pulmonar)</td>
          <td><strong>↓↓ Reduzido</strong> (&lt; 2,2 L/min/m²)</td>
          <td><strong>↑↑ Elevada</strong></td>
          <td><strong>↓↓ Reduzida</strong> (&lt; 60%)</td>
        </tr>
        <tr>
          <td><strong>Choque Cardiogênico de VD</strong> (IAM inferior com extensão para VD)</td>
          <td><strong>↑↑ Muito elevada</strong> (turgência jugular, sinal de Kussmaul)</td>
          <td><strong>Normal ou ↓</strong> (pulmões limpos na ausculta!)</td>
          <td><strong>↓↓ Reduzido</strong></td>
          <td><strong>↑↑ Elevada</strong></td>
          <td><strong>↓↓ Reduzida</strong></td>
        </tr>
        <tr>
          <td><strong>Choque Distributivo Séptico Hiperdinâmico</strong> (após reposição volêmica)</td>
          <td>Normal ou ↓</td>
          <td>Normal ou ↓</td>
          <td><strong>↑↑ Elevado ou Normal</strong></td>
          <td><strong>↓↓ Muito reduzida</strong> (&lt; 800, vasoplegia por iNOS/NO)</td>
          <td><strong>Normal ou ↑ (&gt; 75%)</strong> (shunt microcirculatório e disfunção mitocondrial citopática)</td>
        </tr>
        <tr>
          <td><strong>Choque Distributivo Neurogênico</strong> (TRM cervical/torácico alto acima de T6)</td>
          <td><strong>↓ Reduzida</strong> (venodilatação e pooling venoso)</td>
          <td><strong>↓ Reduzida</strong></td>
          <td><strong>↓ Reduzido</strong> (com <strong>bradicardia</strong> por perda simpática cardioaceleradora T1–T4)</td>
          <td><strong>↓↓ Muito reduzida</strong> (pele quente e seca abaixo da lesão)</td>
          <td>Normal ou ↓</td>
        </tr>
        <tr>
          <td><strong>Choque Obstrutivo — Tamponamento Cardíaco</strong></td>
          <td><strong>↑↑ Elevada</strong></td>
          <td><strong>↑↑ Elevada</strong> (<strong>equalização diastólica</strong>: $PVC \approx PAD \approx PDVD \approx POAP$)</td>
          <td><strong>↓↓ Reduzido</strong></td>
          <td><strong>↑↑ Elevada</strong></td>
          <td><strong>↓↓ Reduzida</strong></td>
        </tr>
        <tr>
          <td><strong>Choque Obstrutivo — TEP Maciço / Pneumotórax Hipertensivo</strong></td>
          <td><strong>↑↑ Muito elevada</strong></td>
          <td><strong>Normal ou ↓</strong> (bloqueio pré-capilar pulmonar ou do retorno venoso)</td>
          <td><strong>↓↓ Reduzido</strong></td>
          <td><strong>↑↑ Elevada</strong></td>
          <td><strong>↓↓ Reduzida</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>23.2 Farmacologia clínica detalhada de vasopressores e inotrópicos</h3>
  <p>A escolha racional das aminas vasoativas e agentes não catecolaminérgicos baseia-se na afinidade seletiva pelos receptores adrenérgicos ($\alpha_1$ vasoconstritor arterial e venoso; $\beta_1$ inotrópico, cronotrópico e dromotrópico positivo miocárdico; $\beta_2$ vasodilatador arteriolar muscular e broncodilatador), dopaminérgicos e vasopressinérgicos ($V_1$ vascular):</p>
  <ul>
    <li><strong>Noradrenalina (Norepinefrina — 0,05 a 2,0 mcg/kg/min):</strong> potente agonista $\alpha_1$-adrenérgico com ação $\beta_1$ moderada e mínima ação $\beta_2$. É o <strong>vasopressor de primeira escolha absoluta</strong> no choque séptico (Surviving Sepsis Campaign), no choque cardiogênico com hipotensão grave (reduz mortalidade e arritmias quando comparada à dopamina no estudo SOAP II e à adrenalina no estudo OptimaCC) e no choque neurogênico/hipovolêmico transitório enquanto se controla o sangramento. Aumenta a PAM, a resistência vascular sistêmica e o volume sanguíneo estressado (mobilizando sangue do reservatório esplâncnico para o retorno venoso central) sem provocar taquicardia excessiva.</li>
    <li><strong>Vasopressina (Hormônio Antidiurético — dose fixa de 0,01 a 0,04 UI/min, habitualmente 0,03 UI/min):</strong> agonista direto dos receptores $V_1$ na musculatura lisa vascular (via fosfolipase C e cálcio intracelular), atuando de forma totalmente independente dos receptores adrenérgicos (que sofrem <em>downregulation</em> e dessensibilização na acidemia láctica grave e na sepse prolongada). Na sepse, é o <strong>vasopressor de segunda linha</strong> adicionado quando a dose de noradrenalina atinge 0,25 a 0,5 mcg/kg/min (estudo VASST). Além disso, por não contrair a vasculatura arterial pulmonar (diferentemente dos agonistas $\alpha_1$), a vasopressina é excelente escolha no choque com falência aguda de ventrículo direito e hipertensão pulmonar.</li>
    <li><strong>Dobutamina (2,5 a 20 mcg/kg/min):</strong> agonista predominantemente $\beta_1$-adrenérgico com leve efeito $\beta_2$ vasodilatador periférico (inodilatador). É o <strong>inotrópico de primeira escolha</strong> no choque cardiogênico e na disfunção miocárdica séptica com baixo débito cardíaco persistente e hipoperfusão tecidual após otimização da volemia e da PAM. Por seu efeito $\beta_2$, pode reduzir levemente a RVS e a pressão arterial se o paciente estiver hipovolêmico ou vasoplégico, exigindo associação frequente com noradrenalina.</li>
    <li><strong>Milrinona (0,125 a 0,75 mcg/kg/min) e Levosimendana (0,05 a 0,2 mcg/kg/min):</strong> a milrinona inibe a fosfodiesterase-3 (PDE-3), impedindo a degradação do AMPc nos cardiomiócitos e na musculatura lisa vascular (potente inodilatador e vasodilatador pulmonar), enquanto a levosimendana sensibiliza a troponina C ao cálcio na sístole sem aumentar o influxo intracelular de cálcio nem o consumo miocárdico de oxigênio, além de abrir canais de potássio ATP-dependentes na vasculatura. São preferidos em pacientes com insuficiência cardíaca crônica em uso prévio de <strong>betabloqueadores</strong> (pois atuam a jusante do receptor $\beta_1$) ou com hipertensão pulmonar associada, devendo-se ter cautela na hipotensão grave (PAM &lt; 65 mmHg) e na insuficiência renal (especialmente para milrinona, de excreção renal).</li>
  </ul>

  <h3>23.3 Questões suplementares comentadas de residência médica</h3>
  <div class="fixation-item">
    <h3>Questão 13 — Interpretação hemodinâmica invasiva no Swan-Ganz</h3>
    <p>Paciente masculino de 64 anos, internado em UTI no segundo dia de pós-operatório de cirurgia abdominal de urgência, evolui com rebaixamento do nível de consciência, oligúria (15 mL/h), extremidades frias e mosqueadas (mottling score 3) e PAM de 54 mmHg apesar de expansão volêmica inicial. A monitorização hemodinâmica avançada revela: PVC = 19 mmHg (normal 2–8), POAP = 19 mmHg (normal 6–12), Pressão Diastólica do VD = 19 mmHg, Índice Cardíaco = 1,6 L/min/m² (normal 2,5–4,0), RVS = 2.100 dinas·s·cm⁻⁵ (normal 800–1.200) e SvO₂ = 48%. Qual diagnóstico explica com precisão esse perfil hemodinâmico?</p>
    <p>A) Choque séptico hiperdinâmico de foco abdominal.<br>B) Choque obstrutivo por tamponamento cardíaco.<br>C) Choque hipovolêmico por hemoperitônio.<br>D) Choque obstrutivo por tromboembolismo pulmonar maciço.</p>
    <details class="fixation-answer"><summary>Mostrar gabarito e comentários</summary><p><strong>Gabarito: B.</strong> O achado hemodinâmico cardinal descrito é a <strong>equalização das pressões diastólicas intracardíacas</strong> ($PVC = PAD = PDVD = POAP \approx 19\text{ mmHg}$), associada a queda acentuada do índice cardíaco (1,6 L/min/m²), vasoconstrição sistêmica compensatória (RVS elevada em 2.100) e queda da SvO₂ (48%). Esse perfil é característico do <strong>tamponamento cardíaco</strong> (ou pericardite constritiva), no qual a compressão extrínseca pelo líquido pericárdico sob tensão nivela a complacência diastólica das quatro câmaras cardíacas. No TEP maciço (alternativa D), a PVC e a pressão de VD estariam muito elevadas, porém a POAP (átrio esquerdo) estaria normal ou baixa pelo bloqueio pré-capilar pulmonar. No choque séptico (A), a RVS estaria reduzida e o IC normal/alto. No choque hipovolêmico (C), PVC e POAP estariam baixas.</p></details>
  </div>
  <div class="fixation-item">
    <h3>Questão 14 — Choque cardiogênico de ventrículo direito vs ventrículo esquerdo</h3>
    <p>Mulher de 68 anos dá entrada na emergência com dor epigástrica e retroesternal há 3 horas, náuseas, sudorese fria, PA 76/48 mmHg e FC 52 bpm. Ao exame físico: turgência jugular patológica a 45° que se acentua na inspiração (sinal de Kussmaul), ausculta pulmonar completamente limpa (sem estertores crepitantes nas bases) e bulhas hipofonéticas sem sopros. O ECG de 12 derivações mostra supradesnivelamento de ST em DII, DIII e aVF (DIII &gt; DII) e infradesnivelamento de ST em DI e aVL. Após realização de derivações direitas (V3R e V4R com supra de ST de 2 mm), qual é a conduta inicial correta para o manejo do choque?</p>
    <p>A) Administrar nitrato sublingual, morfina IV e furosemida 40 mg IV para aliviar a congestão.<br>B) Realizar expansão cuidadosa da pré-carga com cristaloide (alíquotas de 250–500 mL com reavaliação hemodinâmica), evitar nitratos/diuréticos/opioides, iniciar suporte inotrópico/vasopressor (dobutamina/noradrenalina) se persistir hipotensa e encaminhar para angioplastia primária emergencial da artéria coronária direita.<br>C) Infundir 30 mL/kg de soro fisiológico em 15 minutos e iniciar propranolol venoso.<br>D) Indicar pericardiocentese de alívio imediata sem necessidade de ecocardiograma ou cateterismo.</p>
    <details class="fixation-answer"><summary>Mostrar gabarito e comentários</summary><p><strong>Gabarito: B.</strong> A tríade clínica de <strong>hipotensão arterial + turgência jugular patológica + pulmões limpos à ausculta</strong> no contexto de IAM inferior (supra de ST em DII, DIII e aVF, com DIII &gt; DII apontando para oclusão da artéria coronária direita) e supra de ST em V3R/V4R sela o diagnóstico de <strong>infarto agudo de ventrículo direito com choque cardiogênico de VD</strong>. O VD isquêmico e dilatado torna-se altamente dependente da pré-carga para manter o enchimento do VE; por isso, venodilatadores (nitratos, morfina) e diuréticos (furosemida) são <strong>estritamente contraindicados</strong> (alternativa A incorreta), pois precipitam colapso hemodinâmico profundo. A conduta inclui otimização cautelosa da pré-carga com alíquotas de cristaloide (evitando sobrecarga excessiva que desvie o septo interventricular contra o VE), suporte com noradrenalina/dobutamina, manutenção do sincronismo atrioventricular e reperfusão coronariana imediata.</p></details>
  </div>
</section>`;

// 5. Aula 042 — Técnica Cirúrgica / Princípios de Técnica Cirúrgica (+8,500 chars)
const tecnicaSection = `<section id="integracao-clinica-avancada-2026" class="book-section">
  <h2>25. Aprofundamento em laparotomias, energia eletrocirúrgica, fios e casos de prova</h2>
  <h3>25.1 Anatomia cirúrgica das incisões abdominais clássicas e suas indicações</h3>
  <p>O domínio das vias de acesso laparotômicas exige correlacionar a anatomia topográfica das camadas musculoaponeuróticas e neurovasculares da parede anterolateral do abdome com as vantagens e complicações específicas de cada incisão. Acima da <strong>linha arqueada de Douglas</strong> (situada a meia distância entre a cicatriz umbilical e a sínfise púbica), a bainha do músculo reto abdominal possui um folheto anterior (formado pela aponeurose do oblíquo externo e pela lâmina anterior da aponeurose do oblíquo interno) e um folheto posterior (formado pela lâmina posterior do oblíquo interno e pela aponeurose do transverso do abdome). Abaixo da linha arqueada de Douglas, todas as três aponeuroses passam <strong>anteriormente</strong> ao músculo reto abdominal, deixando a face posterior do músculo em contato direto apenas com a <strong>fáscia transversalis</strong> e o peritônio parietal — razão anatômica pela qual as incisões infraumbilicais exigem fechamento aponeurótico meticuloso da bainha anterior para prevenir hérnias incisionais e evisceração. Além disso, a irrigação do músculo reto provém das <strong>artérias epigástrica superior</strong> (ramo terminal da torácica interna/mamária interna) e <strong>epigástrica inferior</strong> (ramo da ilíaca externa, que penetra na bainha ao nível da linha arqueada), enquanto a inervação motora e sensitiva segmentar corre entre os músculos oblíquo interno e transverso (feixes toracoabdominais T7–T12, ílio-hipogástrico e ilioinguinal L1).</p>
  <div class="book-table-scroll" role="region" aria-label="Tabela das incisões abdominais clássicas" tabindex="0">
    <table class="book-table">
      <thead>
        <tr>
          <th>Incisão Cirúrgica</th>
          <th>Topografia e Planos Anatômicos</th>
          <th>Principais Indicações</th>
          <th>Vantagens e Complicações Clássicas de Prova</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mediana (Supra, Infra ou Xifopúbica)</strong></td>
          <td>Incisão longitudinal sobre a <strong>linha alba</strong> (entrecruzamento avascular das aponeuroses dos músculos largos do abdome). Planos: pele, TCSC, linha alba, fáscia transversalis, gordura pré-peritoneal e peritônio.</td>
          <td>Padrão-ouro no trauma abdominal (laparotomia exploradora), abdome agudo sem diagnóstico topográfico definido e grandes cirurgias oncológicas/digestivas.</td>
          <td>Acesso rápido, mínimo sangramento, não secciona fibras musculares nem nervos intercostais e permite ampliação rápida de xifoide a púbis. Desvantagem: zona relativamente hipovascular sujeita a hérnia incisional se fechada sob tensão.</td>
        </tr>
        <tr>
          <td><strong>Kocher (Subcostal Direita) e Chevron (Subcostal Bilateral / "Teto de Pagode")</strong></td>
          <td>Incisão oblíqua paralela e 2 a 3 cm abaixo do rebordo costal direito (Kocher) ou bilateral (Chevron), seccionando a bainha anterior, o músculo reto abdominal, a bainha posterior e os músculos largos lateralmente.</td>
          <td>Colecistectomia aberta, exploração de vias biliares, derivações biliodigestivas (Kocher); hepatectomias, transplante hepático, esofagogastrectomia e pancreatectomia (Chevron/Mercedes).</td>
          <td>Excelente exposição do andar supramesocólico e hilo hepático; menor taxa de hérnia incisional que a mediana quando fechada em dois planos aponeuróticos, porém maior dor pós-operatória se seccionar múltiplos nervos intercostais.</td>
        </tr>
        <tr>
          <td><strong>McBurney (Oblíqua Estrelada) e Davis / Rockey-Davis (Transversa)</strong></td>
          <td>Situadas no quadrante inferior direito sobre o ponto de McBurney (junção do terço lateral com os dois terços mediais da linha espinho-umbilical direita). McBurney é oblíqua na pele; Rockey-Davis é transversa na pele. Em ambas, faz-se <strong>divulsão (separação sem secção)</strong> das fibras dos músculos oblíquo externo, oblíquo interno e transverso na direção de suas fibras (<em>muscle-splitting</em>).</td>
          <td>Apendicectomia aberta em apendicite aguda não complicada ou localizada na fossa ilíaca direita.</td>
          <td>Preserva a integridade muscular e nervosa, com excelente cicatrização e baixíssima taxa de hérnia incisional. Limitação: exposição restrita se houver peritonite difusa ou diagnóstico incorreto; risco de lesão dos nervos ílio-hipogástrico e ilioinguinal se ampliada medial/inferiormente sem cuidado.</td>
        </tr>
        <tr>
          <td><strong>Pfannenstiel (Suprapúbica Transversa Arciforme)</strong></td>
          <td>Incisão cutânea e subcutânea transversa arciforme 2 cm acima da sínfise púbica; abertura <strong>transversa</strong> da aponeurose anterior; descolamento dos músculos retos da aponeurose e abertura <strong>longitudinal mediana</strong> na linha alba/peritônio.</td>
          <td>Cesariana, histerectomia benigna, cirurgia anexial ginecológica e prostatectomia radical retropúbica.</td>
          <td>Excelente resultado estético (escondida nos pelos pubianos) e baixíssimo índice de eventração/hérnia incisional, pois a incisão aponeurótica é perpendicular à abertura peritoneal. Na variante de <strong>Maylard</strong>, os músculos retos e os vasos epigástricos inferiores são ligados e seccionados transversalmente para ampliar o campo oncológico pélvico.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>25.2 Física da Eletrocirurgia: Corte Puro vs Coagulação e Prevenção de Queimaduras</h3>
  <p>O bisturi elétrico de alta frequência (300 kHz a 3 MHz — frequência elevada que impede a despolarização neuromuscular e a fibrilação ventricular que ocorreriam na corrente alternada doméstica de 60 Hz) converte energia elétrica em energia térmica pelo efeito Joule ($Q = I^2 \cdot R \cdot t$) na ponta do eletrodo ativo, onde a densidade de corrente é máxima. No modo <strong>Corte Puro (Cut)</strong>, o gerador emite uma onda senoidal <strong>contínua</strong> de menor voltagem e alta frequência: o calor intenso e súbito (&gt; 100 °C) vaporiza instantaneamente a água intracelular, explodindo as células no plano de clivagem com mínima dissipação térmica lateral (menor necrose tecidual, porém pouca hemostasia). No modo <strong>Coagulação (Coag / Fulguração)</strong>, o gerador emite uma onda <strong>intermitente (modulada, ligada apenas ~6% do tempo)</strong>, porém com picos de <strong>alta voltagem</strong>: o aquecimento gradual entre 60 °C e 90 °C promove desnaturação proteica, desidratação celular e formação de um coágulo térmico que oclui pequenos vasos, mas à custa de maior propagação térmica lateral e maior risco de necrose tecidual, seroma e infecção se usado para abrir pele ou tecido celular subcutâneo.</p>
  <p>Em pacientes portadores de <strong>marcapasso cardíaco ou cardiodesfibrilador implantável (CDI)</strong>, a interferência eletromagnética do bisturi monopolar pode ser interpretada pelo gerador como atividade elétrica intrínseca, causando inibição do marcapasso (assistolia em dependentes) ou choques inapropriados do CDI. As medidas de segurança obrigatórias incluem: dar preferência absoluta ao <strong>bisturi bipolar ou ultrassônico</strong>; caso o monopolar seja indispensável, reprogramar o marcapasso para modo assíncrono (VOO/DOO) ou desativar a terapia de taquicardia do CDI com ímã/programador, posicionar a <strong>placa dispersiva (eletrodo de retorno) o mais próximo possível do sítio cirúrgico e o mais distante possível do tórax/gerador</strong> (garantindo que o vetor da corrente elétrica não atravesse o coração/marcapasso), e utilizar pulsos curtos (&lt; 3 segundos) em modo corte/blend de baixa potência.</p>

  <h3>25.3 Questões suplementares comentadas de residência médica</h3>
  <div class="fixation-item">
    <h3>Questão 13 — Técnica de Fechamento de Laparotomia Mediana ("Small Bites")</h3>
    <p>De acordo com as diretrizes conjuntas da European Hernia Society e American Hernia Society (EHS/AHS) para prevenção de deiscência aponeurótica e hérnia incisional no fechamento de laparotomia mediana eletiva, qual é a técnica de síntese aponeurótica padrão recomendada?</p>
    <p class="question-option">A) Sutura em pontos separados tipo Donati com fio multifilamentar de absorção rápida (poliglactina 910 / Vicryl) pegando pele, subcutâneo, músculo reto e peritônio em bloco.</p>
    <p class="question-option">B) Sutura contínua em camada única exclusivamente aponeurótica (incluindo apenas a linha alba, sem englobar músculo ou gordura), utilizando fio monofilamentar de absorção lenta (ex.: polidioxanona — PDS), com a técnica de "pequenas tomadas" (small bites: pontos a 5 mm da borda e distanciados 5 mm entre si), mantendo relação comprimento do fio / comprimento da ferida (SL:WL) igual ou superior a 4:1.</p>
    <p class="question-option">C) Fechamento obrigatório do peritônio parietal com categute simples seguido de sutura contínua da aponeurose com fio de algodão ou seda.</p>
    <p class="question-option">D) Sutura contínua de grandes tomadas (1,5 cm da borda a cada 1,5 cm) englobando todo o ventre do músculo reto abdominal com fio de ácido poliglicólico.</p>
    <details class="fixation-answer"><summary>Mostrar gabarito e comentários</summary><p><strong>Gabarito: B.</strong></p>
      <ul>
        <li><strong>A e D — incorretas:</strong> englobar músculo reto e gordura na sutura aponeurótica (grandes tomadas / <em>large bites</em>) provoca isquemia e necrose muscular quando o paciente distende o abdome ou tosse, afrouxando o fio (efeito de corte / <em>buttonhole</em>) e aumentando a taxa de hérnia incisional (estudo STITCH). Além disso, fios de absorção rápida perdem força tênsil antes que a aponeurose recupere sua resistência mecânica.</li>
        <li><strong>B — correta:</strong> a técnica de <em>small bites</em> (5 mm da borda aponeurótica e 5 mm de avanço entre pontos, pegando apenas a aponeurose limpa de gordura) com fio monofilamentar de absorção lenta (polidioxanona/PDS 2-0 em agulha pequena) e razão comprimento da sutura / comprimento da ferida $\ge 4:1$ distribui uniformemente a tensão em um número muito maior de laçadas e reduz em mais de 50% a incidência de hérnia incisional.</li>
        <li><strong>C — incorreta:</strong> o fechamento isolado do peritônio parietal não aumenta a resistência da parede e aumenta aderências e dor; fios multifilamentares naturais (algodão/seda) aumentam reação inflamatória e infecção/granuloma de corpo estranho.</li>
      </ul>
    </details>
  </div>
  <div class="fixation-item">
    <h3>Questão 14 — Segurança em Eletrocirurgia e Queimadura na Placa Dispersiva</h3>
    <p>Durante uma colectomia aberta com uso prolongado de bisturi elétrico monopolar em modo coagulação de alta potência, a equipe percebe ao final do procedimento uma queimadura térmica de segundo grau profundo na coxa direita do paciente, exatamente sob a borda da placa dispersiva (eletrodo de retorno), que estava parcialmente descolada por presença de pelos e solução degermante. Qual mecanismo biofísico explica essa complicação e como preveni-la?</p>
    <p class="question-option">A) O descolamento parcial reduz drasticamente a área de contato da placa dispersiva, concentrando a mesma corrente elétrica de saída em uma superfície pequena (aumento crítico da densidade de corrente e geração de calor por efeito Joule); previne-se aplicando a placa íntegra sobre área muscular bem vascularizada, limpa, seca, sem pelos ou proeminências ósseas.</p>
    <p class="question-option">B) No sistema monopolar, a corrente elétrica sai pela placa dispersiva na coxa e retorna pela caneta do cirurgião, aquecendo fisiologicamente a pele da coxa.</p>
    <p class="question-option">C) A placa dispersiva deve ser colocada obrigatoriamente sobre proeminências ósseas (como a patela ou o maléolo lateral) ou sobre cicatrizes extensas para melhorar a condutividade elétrica.</p>
    <p class="question-option">D) O uso de soluções alcoólicas sob a placa dispersiva resfria a pele e impede queimaduras elétricas.</p>
    <details class="fixation-answer"><summary>Mostrar gabarito e comentários</summary><p><strong>Gabarito: A.</strong></p>
      <ul>
        <li><strong>A — correta:</strong> no circuito monopolar, a mesma intensidade de corrente ($I$) que entra pela ponta fina do eletrodo ativo (alta densidade de corrente = calor terapêutico) precisa sair pelo eletrodo dispersivo (placa neutra) com <strong>baixa densidade de corrente</strong> (grande superfície de contato = ausência de aquecimento). Se a placa descola parcialmente, a área útil diminui e a densidade de corrente na borda aderida sobe exponencialmente, gerando queimadura térmica sob a placa.</li>
        <li><strong>B — incorreta:</strong> a corrente é alternada de alta frequência, e a diferença entre eletrodo ativo e dispersivo reside exclusivamente na área de superfície de contato (densidade de corrente).</li>
        <li><strong>C — incorreta:</strong> proeminências ósseas, tecido cicatricial, próteses metálicas subjacentes e áreas pilosas têm alta impedância elétrica e mau acoplamento térmico, sendo locais contraindicados para a placa dispersiva.</li>
        <li><strong>D — incorreta:</strong> líquidos reduzem a aderência do gel condutor e o álcool no campo cirúrgico cria risco grave de incêndio operatório quando acionado o eletrocautério.</li>
      </ul>
    </details>
  </div>
</section>`;

injectSection("sindromes-hipertensivas-da-gestacao", "integracao-clinica-avancada-2026", "Cap. 21 — Integração avançada", shgSection);
injectSection("diabetes-mellitus-gestacional", "integracao-clinica-avancada-2026", "Cap. 19 — Integração avançada", dmgSection);
injectSection("hemorragias-primeiro-terceiro-trimestre", "integracao-clinica-avancada-2026", "Cap. 21 — Integração avançada", hemorragiasSection);
injectSection("choque-circulatorio", "integracao-clinica-avancada-2026", "Cap. 23 — Hemodinâmica e aminas", choqueSection);
injectSection("tecnica-cirurgica", "integracao-clinica-avancada-2026", "Cap. 25 — Incisões e eletrocirurgia", tecnicaSection);

// Also update aliases if they already exist
if (fs.existsSync(path.join(base, "sangramento-na-primeira-metade-da-gestacao", "index.html"))) {
  injectSection("sangramento-na-primeira-metade-da-gestacao", "integracao-clinica-avancada-2026", "Cap. 21 — Integração avançada", hemorragiasSection);
}
if (fs.existsSync(path.join(base, "principios-de-tecnica-cirurgica", "index.html"))) {
  injectSection("principios-de-tecnica-cirurgica", "integracao-clinica-avancada-2026", "Cap. 25 — Incisões e eletrocirurgia", tecnicaSection);
}
