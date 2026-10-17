import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

function appendMultipleSections(slug, newSections) {
  const jsonPath = path.join('apostilas', slug, 'content.json');
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const newIds = new Set(newSections.map(s => s.id));
  newIds.add('referencias');

  payload.o = payload.o.filter(item => !newIds.has(item[0]));
  payload.q = payload.q.filter(item => !newIds.has(item[0]));

  for (const s of newSections) {
    payload.o.push([s.id, s.title]);
    payload.q.push([s.id, 0, htmlToBlocks(s.title, s.html)]);
  }

  payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
  payload.q.push([
    'referencias',
    0,
    [
      ['2', 'Referências Oficiais e Diretrizes'],
      [
        'o',
        [
          '<a href="https://sbpt.org.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pneumologia e Tisiologia (SBPT)</a>',
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.thoracic.org" target="_blank" rel="noopener noreferrer">American Thoracic Society / Infectious Diseases Society of America (ATS/IDSA)</a>',
          '<a href="https://www.idsociety.org" target="_blank" rel="noopener noreferrer">Infectious Diseases Society of America (IDSA)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// ============================================================================
// SEÇÃO 1 PAC: IMUNODEPRIMIDOS NÃO-HIV, PK/PD DE ANTIBIÓTICOS E SÍNDROMES ASPIRATIVAS
// ============================================================================
const secPAC_Imuno_PKPD_Asp = `
<h3>Pneumonia no Hospedeiro Imunocomprometido Não-HIV</h3>
<p>O avanço das terapias imunossupressoras na reumatologia, oncologia, hematologia e transplantes modificou substancialmente a epidemiologia das pneumonias comunitárias e oportunistas. No paciente imunocomprometido não infectado pelo HIV, a natureza exata do defeito imunológico subjacente determina o espectro etiológico provável e a urgência da abordagem diagnóstica e terapêutica:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Defeito Imunológico Primário</th>
      <th>Condições Clínicas Subjacentes e Terapias Associadas</th>
      <th>Patógenos Pulmonares Mais Frequentes</th>
      <th>Conduta Propedêutica e Abordagem Terapêutica Empírica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Neutropenia Grave (&lt; 500 neutrófilos/mm³)</strong></td>
      <td>Quimioterapia para leucemias agudas, pós-transplante de medula óssea autólogo/alogênico, anemia aplásica severa.</td>
      <td><em>Pseudomonas aeruginosa</em>, enterobactérias produtoras de beta-lactamase (ESBL), <em>Staphylococcus aureus</em>, <em>Aspergillus fumigatus</em>, <em>Fusarium</em> spp.</td>
      <td>Emergência médica absoluta: monoterapia imediata com betalactâmico antipseudomonas venoso (Cefepima 2g IV de 8/8h, Piperacilina-Tazobactam 4,5g IV de 6/6h ou Meropenem 1g IV de 8/8h). Se instabilidade hemodinâmica, choque séptico ou mucosite necrosante grave, associar Vancomicina. Se febre persistir além de 72 a 96 horas a despeito do antibiótico de amplo espectro, solicitar tomografia de tórax de alta resolução (pesquisa de nódulos com sinal do halo) e galactomanana sérica, associando Voriconazol ou Anfotericina B lipossomal.</td>
    </tr>
    <tr>
      <td><strong>Defeito da Imunidade Celular T</strong></td>
      <td>Corticoterapia sistêmica prolongada (Prednisona &ge; 20 mg/dia por &gt; 4 semanas), agentes imunobiológicos anti-TNF (Infliximabe, Adalimumabe), inibidores da calcineurina (Ciclosporina, Tacrolimo).</td>
      <td><em>Pneumocystis jirovecii</em> (PJP), <em>Mycobacterium tuberculosis</em>, micobactérias não tuberculosas, fungos dimórficos (<em>Histoplasma capsulatum</em>, <em>Paracoccidioides brasiliensis</em>), <em>Nocardia</em>, Citomegalovírus (CMV).</td>
      <td>Investigação precoce com TC de alta resolução, broncoscopia com lavado broncoalveolar (LBA) para pesquisa de fungos, BAAR e PCR para CMV/PJP. Indicação mandatória de profilaxia primária contra <em>Pneumocystis jirovecii</em> com Sulfametoxazol-Trimetoprima (1 comprimido dose simples 400/80 mg diário ou 1 comprimido dose dupla 800/160 mg 3x/semana) durante todo o período de imunossupressão intensa.</td>
    </tr>
    <tr>
      <td><strong>Defeito da Imunidade Humoral / Células B</strong></td>
      <td>Terapia com anticorpo anti-CD20 (Rituximabe), mieloma múltiplo, hipogamaglobulinemia comum variável, esplenectomia anatômica ou funcional.</td>
      <td>Bactérias encapsuladas virulentas: <em>Streptococcus pneumoniae</em>, <em>Haemophilus influenzae</em> tipo b, <em>Neisseria meningitidis</em>, além de vírus respiratórios graves.</td>
      <td>Terapia empírica agressiva com betalactâmicos bactericidas em altas doses (Ceftriaxona 2g IV ao dia ou Amoxicilina-Clavulanato em altas doses). Reposição periódica de Imunoglobulina Humana Polivalente intravenosa (IVIG) se níveis basais de IgG sérica &lt; 400 mg/dL e infecções respiratórias de repetição.</td>
    </tr>
    <tr>
      <td><strong>Transplante de Órgãos Sólidos (TOS)</strong></td>
      <td>Transplante renal, hepático, cardíaco ou pulmonar sob esquemas tríplices de imunossupressão.</td>
      <td><strong>Janela temporal crítica:</strong><br>- 1º mês: bactérias nosocomiais hospitalares;<br>- 1 a 6 meses: infecções oportunistas clássicas (CMV pneumonite, PJP, <em>Aspergillus</em>, <em>Listeria</em>);<br>- &gt; 6 meses: patógenos comunitários usuais ou patógenos oportunistas tardios se houver rejeição crônica.</td>
      <td>Protocolos de quimioprofilaxia de rotina: Ganciclovir/Valganciclovir para prevenção de CMV em receptores de alto risco sorológico (D+/R-) e Sulfametoxazol-Trimetoprima por pelo menos 6 a 12 meses pós-transplante.</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Quadro estruturado com base nas Diretrizes Internacionais de Infecção em Imunodeprimidos (IDSA/AST).</td>
    </tr>
  </tfoot>
</table>

<h3>Princípios de Farmacocinética e Farmacodinâmica (PK/PD) de Antibióticos Respiratórios</h3>
<p>O desfecho clínico do tratamento da pneumonia depende não apenas da sensibilidade in vitro do patógeno (MIC), mas fundamentalmente da capacidade do fármaco de atingir concentrações eficazes no sítio anatômico da infecção — especificamente no <strong>Líquido de Revestimento Epitelial Pulmonar (ELF - Epithelial Lining Fluid)</strong> e no interior dos macrófagos alveolares. Os antimicrobianos respiratórios dividem-se em três perfis farmacodinâmicos clássicos:</p>
<ul>
  <li><strong>Fármacos Tempo-Dependentes (%T &gt; MIC):</strong>
    <ul>
      <li><strong>Classes e Fármacos Representativos:</strong> Penicilinas (Ampicilina-Sulbactam, Piperacilina-Tazobactam), Cefalosporinas (Ceftriaxona, Cefepima, Ceftarolina) e Carbapenêmicos (Meropenem, Imipenem).</li>
      <li><strong>Mecanismo Farmacodinâmico:</strong> A taxa de morte bacteriana correlaciona-se diretamente com o percentual de tempo do intervalo entre as doses em que a concentração plasmática e tecidual da droga livre permanece acima da concentração inibitória mínima (%fT &gt; MIC). Para betalactâmicos, o alvo ideal para alcançar bactericidia máxima na pneumonia grave é de 50% a 70% do intervalo posológico para penicilinas e cefalosporinas, e de 40% a 50% para carbapenêmicos.</li>
      <li><strong>Otimização Posológica por Infusão Estendida ou Contínua:</strong> Em pacientes graves internados em UTI com PAC complicada ou sepse, o aumento do volume de distribuição e o hiperclearance renal reduzem drasticamente as concentrações plasmáticas mínimas (vales). Nesses cenários, a administração de <strong>Piperacilina-Tazobactam em infusão estendida de 3 a 4 horas (4,5g IV a cada 8h)</strong> ou <strong>Cefepima em infusão estendida de 3 a 4 horas (2g IV a cada 8h)</strong> otimiza o %fT &gt; MIC para próximo de 100%, reduzindo significativamente a mortalidade em comparação à infusão rápida clássica de 30 minutos.</li>
    </ul>
  </li>
  <li><strong>Fármacos Concentração-Dependentes ($C_{\text{max}} / \text{MIC}$):</strong>
    <ul>
      <li><strong>Classes e Fármacos Representativos:</strong> Fluoroquinolonas respiratórias (Levofloxacino, Moxifloxacino) e Aminoglicosídeos (Amicacina, Gentamicina).</li>
      <li><strong>Mecanismo Farmacodinâmico:</strong> A erradicação bacteriana e a prevenção da emergência de mutantes resistentes dependem da magnitude da concentração máxima de pico atingida ($C_{\text{max}}$) dividida pelo MIC. Para aminoglicosídeos, busca-se uma relação $C_{\text{max}}/\text{MIC} \ge 8 \text{ a } 10$.</li>
      <li><strong>Aplicação Prática:</strong> Administração de aminoglicosídeos em <strong>dose única diária maciça</strong> (ex.: Amicacina 15 a 20 mg/kg em dose única diária por via intravenosa). Isso maximiza o pico bactericida no tecido pulmonar e permite que o nível sérico de vale caia para valores praticamente indetectáveis antes da próxima dose, minimizando o acúmulo tubular renal e prevenindo nefrotoxicidade e ototoxicidade vestibular.</li>
    </ul>
  </li>
  <li><strong>Fármacos Dependentes da Área Sob a Curva ($\text{AUC}_{24} / \text{MIC}$):</strong>
    <ul>
      <li><strong>Classes e Fármacos Representativos:</strong> Macrolídeos (Azitromicina, Claritromicina), Glicopeptídeos (Vancomicina) e Oxazolidinonas (Linezolida).</li>
      <li><strong>Mecanismo Farmacodinâmico:</strong> A eficácia bactericida relaciona-se com a exposição cumulativa total do fármaco durante 24 horas dividida pelo MIC.</li>
      <li><strong>Monitorização Terapêutica da Vancomicina na PAC Grave:</strong> As diretrizes da IDSA e da SBPT preconizam alvo de $\text{AUC}_{24}/\text{MIC} \text{ entre } 400 \text{ e } 600 \text{ mcg}\cdot\text{h/mL}$ para o tratamento empírico ou guiado de infecções pulmonares por <em>S. aureus</em> resistente à meticilina (MRSA). Níveis de vale sérico entre 15 e 20 mcg/mL podem ser utilizados como substitutos práticos caso não haja software farmacocinético disponível.</li>
    </ul>
  </li>
  <li><strong>Penetração Tecidual no Fluido Alveolar e Surfactante:</strong> Macrolídeos e fluoroquinolonas acumulam-se avidamente dentro dos macrófagos alveolares e no ELF, atingindo concentrações até 10 a 100 vezes superiores às séricas, garantindo excelente erradicação de germes intracelulares (<em>Legionella pneumophila</em>, <em>Mycoplasma pneumoniae</em>, <em>Chlamydia pneumoniae</em>). Por outro lado, betalactâmicos atingem entre 30% e 50% dos níveis séricos no ELF, exigindo dosagens plenas.</li>
  <li><strong>Alerta Farmacológico Mandatório em Provas de Título e Concursos:</strong> A <strong>Daptomicina é inativada irreversivelmente pelo surfactante alveolar pulmonar</strong>, sendo absolutamente contraindicada para o tratamento de qualquer pneumonia, comunitária ou hospitalar, mesmo que o estafilococo isolado seja demonstradamente sensível in vitro à daptomicina!</li>
</ul>

<h3>Síndromes Aspirativas Pulmonares: Pneumonite Química vs Pneumonia Aspirativa Bacteriana</h3>
<p>O termo 'aspiração pulmonar' engloba duas entidades clínicas com fisiopatologia, evolução natural e condutas terapêuticas diametralmente distintas, cuja diferenciação é frequentemente exigida em provas de residência:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério Diferencial</th>
      <th>Pneumonite Química (Síndrome de Mendelson)</th>
      <th>Pneumonia Aspirativa Bacteriana</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Evento Fisiopatológico Desencadeante</strong></td>
      <td>Macroaspiração maciça de conteúdo gástrico de alta acidez ($\text{pH} &lt; 2,5$) com volume significativo (&gt; 0,3 a 0,4 mL/kg), ocorrendo tipicamente durante episódios agudos de perda de consciência (intoxicação exógena/álcool, anestesia geral em emergência cirúrgica com estômago cheio, crise convulsiva generalizada).</td>
      <td>Micro ou macroaspiração repetida e indolente de secreções orofaríngeas densamente colonizadas por bactérias da microbiota comensal oral em pacientes com distúrbios crônicos de deglutição, disfagia orofaríngea (pós-AVE, esclerose lateral amiotrófica, doença de Parkinson, demência avançada) ou portadores de doença periodontal severa.</td>
    </tr>
    <tr>
      <td><strong>Cinética de Instalação e Quadro Clínico</strong></td>
      <td><strong>Instalação hiperaguda (minutos a poucas horas):</strong> broncoespasmo difuso, tosse paroxística, taquipneia súbita, cianose e hipoxemia acentuada que se instala diante da equipe assistencial logo após o vômito ou regurgitação.</td>
      <td><strong>Instalação subaguda ou insidiosa (dias a semanas):</strong> tosse produtiva arrastada com expectoração mucopurulenta de odor pútrido/fétido característico em até 50% dos casos, febre de baixa intensidade, emagrecimento, anorexia e piora funcional progressiva em idosos acamados.</td>
    </tr>
    <tr>
      <td><strong>Natureza do Processo Inflamatório</strong></td>
      <td><strong>Reação química alveolar estéril inicial:</strong> queimadura química do epitélio alveolar e capilar pelo ácido clorídrico gástrico, destruição imediata de surfactante, edema alveolar agudo não cardiogênico e extravasamento de plasma. Não há proliferação bacteriana inicial.</td>
      <td><strong>Infecção bacteriana tecidual invasiva:</strong> inoculação de elevada carga bacteriana com proliferação tecidual nos alvéolos e bronquíolos terminais, recrutamento de neutrófilos e necrose liquefativa progressiva (evoluindo frequentemente para abscesso pulmonar e empiema pleural).</td>
    </tr>
    <tr>
      <td><strong>Segmentos Pulmonares Típicos Acometidos</strong></td>
      <td>Infiltrados bilaterais perihilares em 'asa de borboleta' ou opacidades heterogêneas dependentes da gravidade anatômica no momento da aspiração.</td>
      <td>Segmentos pulmonares gravitacionais dependentes da posição corpórea durante a aspiração:<br>- <strong>Em decúbito dorsal (acamado):</strong> segmento superior do lobo inferior (apical/Fowler) e segmento posterior do lobo superior direito.<br>- <strong>Em ortostase ou semi-sentado:</strong> segmentos basais dos lobos inferiores (especialmente basal posterior direito), devido à anatomia retilínea do brônquio-fonte direito.</td>
    </tr>
    <tr>
      <td><strong>Microbiologia Predominante</strong></td>
      <td>Estéril nas primeiras 48 horas. Risco de superinfecção bacteriana secundária nosocomial tardia por germes hospitalares se persistir intubado.</td>
      <td>Associação polimicrobiana sinérgica de anaeróbios orais (<em>Peptostreptococcus</em>, <em>Prevotella melaninogenica</em>, <em>Fusobacterium nucleatum</em>) e estreptococos do grupo viridans. Em pacientes institucionalizados ou internados há mais de 5 dias: associação com bacilos Gram-negativos entéricos (<em>K. pneumoniae</em>, <em>E. coli</em>) e <em>S. aureus</em>.</td>
    </tr>
    <tr>
      <td><strong>Conduta Terapêutica Baseada em Evidências</strong></td>
      <td><strong>Tratamento puramente de suporte clínico:</strong> aspiração imediata de secreções orofaríngeas e traqueais, oxigenoterapia ou ventilação mecânica não invasiva/invasiva com PEEP protetora, broncodilatadores inalatórios.<br><strong>NÃO PRESCREVER ANTIBIÓTICOS PROFILÁTICOS!</strong> Antibióticos só são introduzidos se houver falência de melhora após 48 a 72 horas com febre persistente, piora radiológica ou leucocitose com desvio. Corticoides sistêmicos não têm benefício comprovado.</td>
      <td><strong>Antibioticoterapia empírica direcionada mandatória:</strong><br>- 1ª escolha ambulatorial/enfermaria: <strong>Amoxicilina-Clavulanato</strong> (875/125 mg VO 12/12h ou 1,2g IV 8/8h) ou <strong>Ampicilina-Sulbactam</strong> (1,5g a 3,0g IV 6/6h);<br>- Alternativa para alérgicos graves a penicilinas: <strong>Clindamicina</strong> (600 mg IV de 8/8h) ou Moxifloxacino;<br>- Em idosos institucionalizados de alto risco: associar cobertura para bacilos Gram-negativos (Ceftriaxona + Clindamicina ou Piperacilina-Tazobactam).<br>Tempo habitual: 7 a 14 dias (ou até 3 a 4 semanas se houver abscesso pulmonar cavitado).</td>
    </tr>
  </tbody>
</table>

<h3>Profilaxias Pós-Exposição e Medidas Preventivas em Infecções Respiratórias Comunitárias</h3>
<p>O manejo das infecções do trato respiratório inferior abrange intervenções epidemiológicas e quimioprofiláticas direcionadas a contactos e grupos suscetíveis para interromper cadeias de transmissão em populações vulneráveis:</p>
<ul>
  <li><strong>Quimioprofilaxia Antiviral para Influenza (Oseltamivir):</strong>
    <ul>
      <li><strong>Indicação Pós-Exposição:</strong> Contactantes domiciliares próximos com alto risco de complicações graves de Influenza (crianças &lt; 2 anos, idosos &ge; 60 anos, gestantes e puérperas até 2 semanas, imunodeprimidos, pneumopatas crônicos, obesos com IMC &ge; 40) que tiveram contato com caso confirmado nas últimas 48 horas e que não foram vacinados na campanha anual corrente ou foram vacinados há menos de 14 dias (tempo necessário para soroconversão protetora).</li>
      <li><strong>Esquema Farmacológico:</strong> <strong>Oseltamivir oral 75 mg uma vez ao dia por 7 a 10 dias</strong> (ajustar para clearance de creatinina se disfunção renal).</li>
      <li><strong>Controle de Surtos Institucionais:</strong> Em Instituições de Longa Permanência para Idosos (ILPI) ou unidades hospitalares fechadas com surto ativo de síndrome gripal (dois ou mais casos confirmados em 72 horas), a quimioprofilaxia com oseltamivir está indicada para <strong>todos os residentes não doentes</strong>, independentemente do status vacinal prévio, por no mínimo 14 dias e mantida por até 7 dias após o diagnóstico do último caso de Influenza detectado.</li>
    </ul>
  </li>
  <li><strong>Quimioprofilaxia para <em>Bordetella pertussis</em> (Coqueluche):</strong>
    <ul>
      <li>A tosse paroxística espasmódica da coqueluche pode evoluir para pneumonia secundária e apneia fatal em lactentes. A quimioprofilaxia pós-exposição com <strong>Azitromicina oral por 5 dias</strong> (10 mg/kg no 1º dia seguido de 5 mg/kg/dia do 2º ao 5º dia, ou 500 mg no 1º dia e 250 mg do 2º ao 5º dia em adultos) é expressamente recomendada pelo Ministério da Saúde para <strong>todos os contatos domiciliares próximos</strong> de casos suspeitos ou confirmados de coqueluche, independentemente da idade e da situação vacinal prévia, especialmente quando houver lactentes &lt; 1 ano ou gestantes no domicílio.</li>
    </ul>
  </li>
  <li><strong>Prevenção Ambiental e Controle de <em>Legionella pneumophila</em>:</strong>
    <ul>
      <li>A <em>Legionella</em> prolifera em biofilmes de sistemas hidráulicos com água tépida estagnada entre 20°C e 45°C (torres de condensação de sistemas de ar condicionado central, reservatórios térmicos, banheiras de hidromassagem e redes de chuveiros de grandes edifícios e hospitais). A transmissão ocorre por aerolização de microgotículas de água contaminada, sem transmissão inter-humana documentada. As medidas preventivas exigem desinfecção térmica periódica (aquecimento da água dos reservatórios acima de 60°C e distribuição acima de 50°C), cloração contínua e monitorização microbiológica periódica da rede hídrica.</li>
    </ul>
  </li>
</ul>
`;

// ============================================================================
// SEÇÃO 2 PAC: 4 CASOS CLÍNICOS AVANÇADOS COM DISCUSSÃO MINUCIOSA
// ============================================================================
const secPAC_Casos_Avancados = `
<h3>Caso Clínico 1: Pneumonia por <em>Pneumocystis jirovecii</em> em Paciente com Artrite Reumatoide sob Terapia Imunobiológica</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente feminina, 58 anos, portadora de Artrite Reumatoide erosiva de longa data, em uso regular de Prednisona 20 mg/dia há 8 meses e Infliximabe (anticorpo monoclonal anti-TNF-$\alpha$) intravenoso bimestral. Procura o pronto-socorro referindo dispneia de instalação insidiosa e progressiva aos médios esforços há 12 dias, acompanhada de tosse seca irritativa paroxística, astenia intensa e sensação febril vespertina. Nega expectoração, hemoptise ou dor torácica pleurítica.</p>
<p><strong>Exame Físico na Admissão:</strong> Paciente taquipneica, consciente, acianótica, afebril no momento (tax 37,2°C). Sinais vitais: FC 108 bpm, PA 122/76 mmHg, FR 28 irpm, SpO2 86% em ar ambiente que sobe para 93% sob máscara com reservatório de O2 a 6 L/min. Ausculta pulmonar: murmúrio vesicular universalmente audível, sem ruídos adventícios grosseiros, apenas raros sibilos e estertores subcrepitantes discretos em bases pulmonares bilateralmente. A ausculta pulmonar relativamente límpida contrasta de forma marcante com o grau exuberante de hipoxemia (clássica 'dissociação clínico-radiológica'). Ausculta cardíaca normal.</p>
<p><strong>Exames Laboratoriais e Radiológicos:</strong></p>
<ul>
  <li>Hemograma: Leucócitos 7.200/mm³ com 78% de neutrófilos, 14% de linfócitos (linfopenia absoluta: 1.008 linfócitos/mm³), ausência de desvio à esquerda; Hemoglobina 11,8 g/dL; Plaquetas 240.000/mm³;</li>
  <li>Lactato desidrogenase (LDH): <strong>690 U/L</strong> (valor de referência: 120 a 240 U/L); Proteína C-Reativa (PCR): 48 mg/L;</li>
  <li>Gasometria Arterial em ar ambiente: pH 7,46; $\text{PaCO}_2 = 31 \text{ mmHg}$; $\text{PaO}_2 = 56 \text{ mmHg}$; $\text{HCO}_3^- = 22 \text{ mEq/L}$; $\text{SatO}_2 = 87\%$. Gradiente alvéolo-arterial de oxigênio $\text{P(A-a)O}_2 = 52 \text{ mmHg}$ (acentuadamente elevado);</li>
  <li>Sorologia para HIV 1 e 2: Não reagente por ensaio de 4ª geração;</li>
  <li>Tomografia de Tórax de Alta Resolução (TCAR): Áreas extensas e simétricas de atenuação em <strong>vidro fosco bilateral de distribuição perihilar</strong> com preservação relativa das regiões subpleurais periféricas ('poupamento subpleural') e ausência de derrame pleural ou linfonodomegalia significativa.</li>
</ul>
<p><strong>Discussão Diagnóstica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Identificação da Síndrome:</strong> Trata-se de uma pneumonia oportunista intersticial hipoxemiante grave em paciente imunocomprometida por corticoterapia sistêmica crônica associada a bloqueador de TNF-alfa. A tríade de dispneia subaguda progressiva, hipoxemia severa com dissociação clínico-radiológica, LDH acentuadamente elevado e infiltrado em vidro fosco bilateral perihilar é patognomônica de <strong>Pneumocistose (pneumonia por <em>Pneumocystis jirovecii</em> - PJP)</strong>.</li>
  <li><strong>Necessidade de Corticoterapia Adjuvante Precoce:</strong> A gasometria arterial revela $\text{PaO}_2 &lt; 70 \text{ mmHg}$ (56 mmHg) e gradiente alvéolo-arterial $\text{P(A-a)O}_2 \ge 35 \text{ mmHg}$ (52 mmHg). Esses parâmetros definem pneumocistose moderada a grave. <strong>A indicação de corticoterapia sistêmica adjunta (Prednisona oral ou Metilprednisolona IV) é obrigatória e salva vidas</strong>, devendo ser administrada antes ou concomitantemente à primeira dose do antibiótico. A lise dos cistos de <em>Pneumocystis</em> provocada pelo início do antimicrobiano deflagra liberação maciça de antígenos fúngicos com tempestade inflamatória alveolar, levando à piora paradoxal e falência respiratória nas primeiras 72 horas caso o corticoide não seja utilizado. O esquema recomendado é: Prednisona 40 mg VO 12/12h por 5 dias, seguida de 40 mg VO 1x/dia do 6º ao 10º dia, e 20 mg VO 1x/dia do 11º ao 21º dia.</li>
  <li><strong>Antimicrobiano de Escolha:</strong> <strong>Sulfametoxazol-Trimetoprima (TMP-SMX) por via intravenosa</strong> na dose de 15 a 20 mg/kg/dia baseado no componente de trimetoprima, administrado em 3 a 4 infusões diárias, com duração total de 21 dias. Em pacientes não-HIV, a resposta inflamatória pulmonar costuma ser mais abrupta e a carga fúngica menor, tornando o diagnóstico precoce crucial.</li>
  <li><strong>Profilaxia Secundária e Futura Primária:</strong> Após a conclusão dos 21 dias de tratamento, manter profilaxia secundária com TMP-SMX (800/160 mg 1 comprimido VO 3x/semana) enquanto persistir a imunossupressão. Ressalta-se que a paciente <em>deveria estar recebendo profilaxia primária</em> desde o momento em que associou prednisona &ge; 20 mg/dia a infliximabe.</li>
</ol>

<h3>Caso Clínico 2: Pneumonia Aspirativa Complicada com Abscesso Pulmonar em Segmento Gravitacional</h3>
<p><strong>História Clínica e Admissão:</strong> Homem, 52 anos, portador de transtorno por uso crônico de álcool e etilismo pesado diário, é levado ao pronto-socorro por familiares devido a febre alta diária com calafrios trementes, tosse produtiva intensa e fraqueza progressiva há 6 dias. Familiares relatam que, há aproximadamente 10 dias, após libação alcoólica excessiva em um evento festivo, o paciente apresentou episódio de perda prolongada de consciência com regurgitação e vômitos biliosos abundantes, sendo deixado deitado no leito em decúbito dorsal. Há 3 dias, a expectoração tornou-se extremamente fétida e abundante, com eliminação de grande quantidade de secreção amarelada escura com odor repugnante ('hálito e escarro pútrido').</p>
<p><strong>Exame Físico na Admissão:</strong> Paciente emagrecido, com higiene precária e dentes em péssimo estado de conservação (múltiplas raízes residuais infectadas e doença periodontal gengival severa). Orientado, com fácies toxêmica. Sinais vitais: FC 112 bpm, PA 110/68 mmHg, FR 24 irpm, temperatura axilar 38,8°C, SpO2 91% em ar ambiente. Ausculta do tórax: diminuição do murmúrio vesicular no terço médio e superior do hemitórax direito posterior, com sopro cavitário e crepitações grosseiras localizadas. Ausência de sinais de irritação peritoneal ou estigmas de hipertensão portal descompensada.</p>
<p><strong>Exames Laboratoriais e Radiológicos:</strong></p>
<ul>
  <li>Hemograma: Leucócitos 21.800/mm³ com 14% de bastões (desvio escalonado à esquerda), 76% de segmentados; Hemoglobina 10,2 g/dL (anemia normocítica normocrômica); Plaquetas 510.000/mm³ (trombocitose reacional);</li>
  <li>Proteína C-Reativa: 220 mg/L; Creatinina 0,9 mg/dL; Ureia 38 mg/dL;</li>
  <li>Radiografia de Tórax (PA e Perfil): Opacidade arredondada bem delimitada com paredes espessas medindo aproximadamente 5,5 cm no diâmetro transverso, localizada na topografia do <strong>segmento superior do lobo inferior direito (lobo apical de Fowler)</strong>, evidenciando <strong>nível hidroaéreo intra-lesional proeminente</strong>. Não há evidência de pneumotórax ou derrame pleural septado.</li>
  <li>Tomografia Computadorizada de Tórax com Contraste: Confirma lesão cavitária parenquimatosa com conteúdo gasoso e líquido no segmento superior do lobo inferior direito, com realce periférico de contraste na cápsula fibrosa e espessamento bronquial adjacente, sem compressão de grandes vasos.</li>
</ul>
<p><strong>Discussão Diagnóstica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Diagnóstico Sindrômico e Topográfico:</strong> Quadro clássico de <strong>Abscesso Pulmonar Primário Secundário à Broncoaspiração Maciça</strong>. A anatomia favorece o segmento superior do lobo inferior direito quando o paciente aspira em decúbito dorsal (o brônquio para o segmento de Fowler parte diretamente da parede posterior do brônquio intermédio, atuando como calha direta para secreções regurgitadas). O odor pútrido é o sinal propedêutico cardinal de infecção por <strong>bactérias anaeróbias estritas</strong> produtoras de ácidos graxos voláteis (<em>Fusobacterium nucleatum</em>, <em>Prevotella</em> spp., <em>Peptostreptococcus</em>).</li>
  <li><strong>Tratamento Clínico Conservador vs Intervenção Cirúrgica:</strong> Mais de 85% a 90% dos abscessos pulmonares de origem aspirativa curam-se exclusivamente com <strong>antibioticoterapia clínica prolongada e fisioterapia respiratória</strong> para drenagem postural espontânea pela árvore brônquica. A drenagem percutânea por cateter pigtail guiada por TC ou toracotomia cirúrgica é estritamente reservada para falência terapêutica após 7 a 14 dias de antibiótico guiado, cavitações gigantes (&gt; 6 a 8 cm) com risco iminente de ruptura pleural com piopneumotórax, choque séptico refratário ou hemoptise maciça.</li>
  <li><strong>Regime Antimicrobiano Recomendado:</strong>
    <ul>
      <li>Opção preferencial parenteral: <strong>Ampicilina-Sulbactam 3g IV a cada 6 horas</strong> ou <strong>Amoxicilina-Clavulanato 1,2g IV de 8/8h</strong> (que combinam cobertura bactericida potente contra estreptococos orais, anaeróbios produtores de beta-lactamase e enterobactérias).</li>
      <li>Alternativa para alérgicos a penicilinas: Clindamicina 600 mg IV de 8/8h associada a Ceftriaxona ou Moxifloxacino 400 mg IV 1x/dia.</li>
      <li><strong>Tempo de Tratamento:</strong> A antibioticoterapia deve ser mantida por tempo prolongado, tipicamente <strong>3 a 4 semanas (podendo alcançar 6 semanas)</strong>, até documentação tomográfica de fechamento da cavidade ou redução a uma cicatriz linear estável. A transição para via oral é feita tão logo haja melhora clínica e defervescência com Amoxicilina-Clavulanato 875/125 mg VO 12/12h.</li>
    </ul>
  </li>
  <li><strong>Investigação Adicional Obrigatória:</strong> Em pacientes adultos com abscesso pulmonar, particularmente com história de tabagismo ou etilismo, a <strong>broncoscopia flexível</strong> está indicada caso haja resposta clínica atípica ou atraso radiológico para excluir neoplasia broncogênica obstrutiva proximal ou aspiração de corpo estranho radiotransparente (prótese dentária frouxa aspirada durante a intoxicação alcoólica).</li>
</ol>

<h3>Caso Clínico 3: Neutropenia Febril com Lesão Pulmonar Angioinvasiva (Sinal do Halo)</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente masculino, 42 anos, internado na enfermaria de hematologia para quimioterapia de indução (protocolo '7+3' com citarabina e daunorrubicina) para Leucemia Mieloide Aguda (LMA). No 11º dia pós-quimioterapia, desenvolve pico febril de 38,9°C acompanhado de calafrios, tosse seca incômoda e dor torácica ventilatório-dependente em base pulmonar direita. O paciente já vinha recebendo Cefepima 2g IV de 8/8h em monoterapia empírica desde as primeiras 2 horas da febre, sem melhora após 72 horas de uso contínuo.</p>
<p><strong>Exame Físico Atual:</strong> Paciente prostrado, pálido +++/4+, desidratado ++/4+. Sinais vitais: FC 116 bpm, PA 105/65 mmHg, FR 22 irpm, tax 38,7°C, SpO2 94% sob cateter nasal de O2 a 2 L/min. Presença de cateter venoso totalmente implantado (Port-a-Cath) em hemitórax direito sem sinais flogísticos ou secreção no sítio de punção. Ausculta pulmonar: estertores crepitantes teleinspiratórios discretos em terço inferior direito; atrito pleurítico audível na linha axilar média direita. Abdome flácido e indolor. Sem lesões cutâneas.</p>
<p><strong>Exames Laboratoriais e Tomografia Computadorizada:</strong></p>
<ul>
  <li>Hemograma Completo: Leucócitos 320/mm³ com <strong>Contagem Absoluta de Neutrófilos (CAN) = 60/mm³ (neutropenia profunda / grave)</strong>; Hemoglobina 8,1 g/dL; Plaquetas 18.000/mm³;</li>
  <li>Hemoculturas periféricas e do cateter (4 frascos): negativas para crescimento bacteriano em 72 horas;</li>
  <li>Galactomanana Sérica (ensaio imunoenzimático): <strong>2,4</strong> (valor de referência: &lt; 0,5 = negativo; índice &ge; 1,0 em amostra única confirma infecção fúngica provável);</li>
  <li>TC de Tórax de Alta Resolução (sem contraste iodado por plaquetopenia): Revela múltiplos macronódulos pulmonares bem delimitados, medindo até 2,2 cm, localizados no lobo inferior direito, circundados concentricamente por uma zona de atenuação em vidro fosco — o clássico <strong>sinal do halo (halo sign)</strong>.</li>
</ul>
<p><strong>Discussão Diagnóstica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Raciocínio Clínico e Fisiopatológico:</strong> Paciente com neutropenia profunda e prolongada (&gt; 7 a 10 dias) com febre persistente refratária a antibiótico antipseudomonas de amplo espectro (Cefepima). O achado de nódulo com sinal do halo na TCAR reflete a <strong>angioinvasão característica do <em>Aspergillus</em> spp.</strong> (em especial <em>Aspergillus fumigatus</em>). As hifas fúngicas invadem as arteríolas pulmonares periféricas, provocando trombose intravascular, infarto isquêmico central e necrose de coagulação tecidual (o centro nodular denso), circundado por hemorragia alveolar perilesional extravasada (que compõe a atenuação em vidro fosco ao redor).</li>
  <li><strong>Confirmação Laboratorial:</strong> O índice de galactomanana sérica de 2,4 confirma a etiologia fúngica invasiva com alta especificidade em pacientes hematológicos neutropênicos, dispensando biópsia pulmonar invasiva a céu aberto, a qual seria letal devido à plaquetopenia crítica (18.000/mm³).</li>
  <li><strong>Terapia Antimicrobiana de Escolha Baseada em Evidências:</strong>
    <ul>
      <li>O antifúngico de primeira linha absoluto para Aspergilose Pulmonar Invasiva é o <strong>Voriconazol por via intravenosa</strong> (dose de ataque: 6 mg/kg IV de 12/12h no 1º dia, seguida de dose de manutenção de 4 mg/kg IV de 12/12h). O voriconazol demonstrou superioridade inequívoca em sobrevida e resposta radiológica comparado à anfotericina B convencional desoxicolato.</li>
      <li>Alternativa eficaz de primeira linha: <strong>Isavuconazol</strong> (com perfil mais favorável de interações farmacológicas e sem prolongamento significativo de intervalo QTc) ou <strong>Anfotericina B Lipossomal</strong> (3 a 5 mg/kg/dia) em caso de contraindicações formais aos azóis.</li>
      <li><strong>Ajuste da Cobertura Bacteriana:</strong> Manter a Cefepima IV para sustentação da cobertura contra bacilos Gram-negativos até a recuperação sustentada dos neutrófilos ($\text{CAN} &gt; 500/\text{mm}^3$).</li>
    </ul>
  </li>
  <li><strong>Evolução Radiológica Típica (Sinal do Crescente Aéreo):</strong> Após a recuperação da contagem de neutrófilos pelo término da fase de aplasia medular (normalização dos glóbulos brancos), os neutrófilos funcionais migram para o sítio do infarto pulmonar e começam a digerir o tecido necrótico sequestrado, gerando um espaço semilunar de ar entre a lesão e o parênquima são — o chamado <strong>sinal do crescente aéreo (air-crescent sign)</strong>, que denota cicatrização e recuperação medular, e NÃO piora infecciosa ativa.</li>
</ol>

<h3>Caso Clínico 4: PAC Grave com Choque Séptico, Insuficiência Renal Aguda e Otimização PK/PD</h3>
<p><strong>História Clínica e Admissão:</strong> Homem, 68 anos, portador de Hipertensão Arterial Sistêmica e Diabetes Mellitus tipo 2 com nefropatia diabética estágio 3a basal (Creatinina habitual 1,4 mg/dL), é admitido na Unidade de Terapia Intensiva com quadro agudo de prostração, febre alta com calafrios, tosse produtiva com escarro herrumbroso e confusão mental aguda (escore CURB-65 = 4: Confusão mental, Ureia &gt; 50, FR &gt; 30, PA sistólica &lt; 90). Instalação de choque circulatório refratário a volume cristaloide nas primeiras 2 horas de internação.</p>
<p><strong>Exame Físico na UTI:</strong> Paciente torporoso, hipoperfundido, extremidades frias com tempo de enchimento capilar de 4,5 segundos. Sinais vitais: FC 128 bpm, PA 82/46 mmHg (PAM = 58 mmHg), FR 34 irpm, tax 39,2°C, SpO2 88% sob macronebulização de O2 a 10 L/min. Ausculta pulmonar: estertores crepitantes e macicez à percussão em todo o lobo inferior esquerdo, com broncofonia aumentada. Ausculta cardíaca: taquicardia sinusal sem sopros. Diurese de apenas 15 mL nas últimas 3 horas por sonda vesical de demora.</p>
<p><strong>Exames Laboratoriais e Hemodinâmicos na UTI:</strong></p>
<ul>
  <li>Gasometria Arterial: pH 7,24; $\text{PaCO}_2 = 28 \text{ mmHg}$; $\text{PaO}_2 = 58 \text{ mmHg}$; $\text{HCO}_3^- = 12 \text{ mEq/L}$; $\text{BE} = -11 \text{ mEq/L}$; Lactato arterial = <strong>4,2 mmol/L</strong> (hiperlactatemia tecidual por hipoperfusão grave);</li>
  <li>Creatinina: 3,1 mg/dL (elevação aguda &gt; 2x basal: Lesão Renal Aguda KDIGO estágio 3); Ureia: 118 mg/dL;</li>
  <li>Hemograma: 24.500 leucócitos/mm³ com 18% de bastões e granulações tóxicas; Plaquetas 98.000/mm³;</li>
  <li>Hemoculturas (2 pares): Positivas após 11 horas de incubação para <em>Streptococcus pneumoniae</em> (diplococos Gram-positivos lanceolados), com antibiograma preliminar demonstrando sensibilidade preservada à ceftriaxona (MIC &le; 0,5 mcg/mL);</li>
  <li>Radiografia de Tórax no Leito: Consolidação alveolar densa e confluente com broncograma aéreo acometendo praticamente todo o lobo inferior esquerdo, sem derrame pleural volumoso.</li>
</ul>
<p><strong>Discussão Diagnóstica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Estratificação e Manejo Hemodinâmico:</strong> Trata-se de <strong>Pneumonia Adquirida na Comunidade Grave por Pneumococo Bacteriêmico complicada por Choque Séptico</strong> (necessidade de vasopressor para PAM &ge; 65 mmHg a despeito de ressuscitação volêmica e lactato &gt; 2 mmol/L). Conduta imediata: infusão criteriosa de cristaloide balanceado (Ringer Lactato) guiada por parâmetros dinâmicos de fluirresponsividade para não sobrecarregar o parênquima pulmonar comprometido, associada à introdução precoce de <strong>Noradrenalina IV contínua</strong> titulada para alvo de $\text{PAM} \ge 65 \text{ mmHg}$.</li>
  <li><strong>Racional do Esquema Antimicrobiano Combinado na PAC Grave:</strong> As diretrizes da SBPT e da ATS/IDSA determinam que na PAC grave admitida em UTI deve-se prescrever <strong>terapia combinada de Betalactâmico + Macrolídeo</strong> (Ceftriaxona 2g IV ao dia + Azitromicina 500 mg IV ao dia ou Claritromicina 500 mg IV 12/12h). O benefício do macrolídeo não se restringe à cobertura de atípicos, mas decorre do seu potente <strong>efeito imunomodulador anti-inflamatório</strong> (inibição da fosfolipase A2, redução da secreção de interleucina-8 pelos macrófagos, diminuição da quimiotaxia e da desgranulação lesiva de neutrófilos e supressão da síntese da pneumolisina pneumocócica), o que reduz a mortalidade hospitalar na pneumonia bacteriêmica por pneumococo em mais de 30% a 50%.</li>
  <li><strong>Otimização Farmacodinâmica (PK/PD) na Disfunção Renal Aguda:</strong>
    <ul>
      <li><strong>Ceftriaxona:</strong> Fármaco de eliminação dual balanceada (aproximadamente 60% por filtração renal e 40% por excreção biliar). <strong>A Ceftriaxona NÃO requer ajuste de dose para insuficiência renal isolada</strong> (mesmo em diálise), mantendo-se a dose plena de <strong>2g IV em dose única diária (ou 1g IV 12/12h)</strong> para assegurar níveis livres acima do MIC (%fT &gt; MIC) em pacientes críticos sépticos com volume de distribuição aumentado.</li>
      <li><strong>Macrolídeos:</strong> Azitromicina tem metabolismo predominantemente hepático e biliar, dispensando correções para insuficiência renal. A claritromicina, contudo, exige redução de dose de 50% se clearance de creatinina &lt; 30 mL/min. Opta-se por Azitromicina IV.</li>
      <li>Se houvesse indicação de betalactâmico antipseudomonas (ex.: Cefepima ou Piperacilina-Tazobactam se fatores de risco epidemiológico para <em>P. aeruginosa</em>), o ajuste posológico pela taxa de filtração glomerular estimada seria mandatório após a dose de ataque inicial plena, mantendo-se a infusão estendida de 3 a 4 horas para otimizar o tempo acima da MIC.</li>
    </ul>
  </li>
  <li><strong>Corticoterapia na Sepse Pulmonar Grave:</strong> Devido ao choque séptico dependente de doses crescentes de noradrenalina (&gt; 0,25 mcg/kg/min) após mais de 4 horas de ressuscitação, está formalmente indicada a administração de <strong>Hidrocortisona intravenosa na dose de 200 mg/dia</strong> (50 mg IV a cada 6 horas), reduzindo o tempo para desmame do suporte vasopressor.</li>
</ol>
`;

// ============================================================================
// SEÇÃO 3 PAC: 6 QUESTÕES DE PROVA COM GABARITO E DISTRATORES DETALHADOS
// ============================================================================
const secPAC_Questoes_Residencia = `
<h3>Questão 1 (USP / IAMSPE - Prova de Acesso Direto)</h3>
<p>Um homem de 44 anos, portador de granulomatose com poliangiite (doença inflamatória sistêmica) em tratamento imunossupressor há 5 meses com Ciclofosfamida oral e Prednisona 30 mg/dia, comparece ao pronto-socorro com história de dispneia progressiva aos esforços há 2 semanas, tosse seca incômoda e febre vespertina. O paciente não usava profilaxia medicamentosa contínua. Ao exame: FR 28 irpm, SpO2 85% em ar ambiente. A ausculta pulmonar revela murmúrio vesicular preservado com raros estertores crepitantes em bases. A gasometria arterial em ar ambiente demonstra: pH 7,45; $\text{PaO}_2 = 54 \text{ mmHg}$; $\text{PaCO}_2 = 30 \text{ mmHg}$; $\text{P(A-a)O}_2 = 56 \text{ mmHg}$. A tomografia computadorizada de tórax evidencia opacidades extensas em vidro fosco distribuídas bilateralmente nas regiões perihilares com preservação do parênquima subpleural periférico. Diante da principal hipótese diagnóstica, qual é a conduta farmacológica terapêutica correta e mandatória?</p>
<p>A) Iniciar Sulfametoxazol-Trimetoprima intravenoso em altas doses isoladamente, aguardando 72 horas para indicar corticoterapia apenas se houver falência clínica.<br>
B) Iniciar Sulfametoxazol-Trimetoprima intravenoso associado precocemente à corticoterapia sistêmica com Prednisona oral ou Metilprednisolona venosa.<br>
C) Prescrever Levofloxacino intravenoso associado a Oseltamivir oral e suspender imediatamente o corticoide sistêmico prévio para restauração imune.<br>
D) Iniciar Anfotericina B desoxicolato intravenosa associada a Azitromicina e dispensar o uso de corticoides pelo risco de disseminação fúngica sistêmica.<br>
E) Prescrever Daptomicina intravenosa em altas doses associada a Meropenem para cobertura empírica de infecções bacterianas hospitalares invasivas.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> O paciente apresenta o quadro clássico de pneumonia por <em>Pneumocystis jirovecii</em> (PJP) decorrente de imunossupressão celular profunda induzida pelo uso prolongado de corticoide em dose &ge; 20 mg/dia associado a agente alquilante. O quadro caracteriza-se por tosse seca, hipoxemia acentuada desproporcional à ausculta e vidro fosco bilateral na TCAR. O critério definidor para o uso de corticoterapia sistêmica adjuvante é a presença de <strong>hipoxemia moderada a grave, definida por $\text{PaO}_2 &lt; 70 \text{ mmHg}$ ou Gradiente Alvéolo-Arterial $\text{P(A-a)O}_2 \ge 35 \text{ mmHg}$</strong>. Como o paciente apresenta $\text{PaO}_2 = 54 \text{ mmHg}$ e $\text{P(A-a)O}_2 = 56 \text{ mmHg}$, a corticoterapia deve ser administrada antes ou junto com o Sulfametoxazol-Trimetoprima para prevenir a reação inflamatória alveolar letal induzida pela destruição fúngica maciça.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> Aguardar 72 horas para prescrever o corticoide é um erro crítico comum que eleva drasticamente a mortalidade. Quando a lise fúngica tem início sem a barreira anti-inflamatória prévia do esteroide, a tempestade inflamatória alveolar precipita falência respiratória catastrófica com necessidade de intubação endotraqueal.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> Levofloxacino e oseltamivir não apresentam qualquer eficácia contra <em>Pneumocystis jirovecii</em> (que é um fungo atípico desprovido de ergosterol em sua membrana). Além disso, suspender abruptamente a corticoterapia de uso crônico desencadeará crise de insuficiência adrenal aguda potencialmente fatal.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A anfotericina B não é ativa contra <em>P. jirovecii</em> porque este fungo possui colesterol e não ergosterol em sua membrana plasmática, sendo os antifúngicos poliénicos ineficazes; o tratamento de escolha baseia-se na inibição da via do folato com TMP-SMX.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> Daptomicina é inativada pelo surfactante pulmonar e nunca deve ser utilizada no parênquima pulmonar. Além disso, a clínica e a imagem apontam inequivocamente para pneumocistose e não bacteriana estafilocócica.</li>
  </ul>
</div>

<h3>Questão 2 (ENARE / Residência Médica Nacional)</h3>
<p>Um paciente de 62 anos, com antecedente de acidente vascular encefálico há 6 meses com sequela motora e disfagia orofaríngea leve a moderada, apresenta tosse com secreção purulenta e febre de 38,2°C há 4 dias. Familiares referem engasgos frequentes durante as refeições. Ao exame físico: taquipneico leve (FR 22 irpm), SpO2 93% em ar ambiente; ausculta pulmonar demonstra estertores crepitantes na base pulmonar direita e na região paravertebral direita. Radiografia de tórax revela consolidação alveolar no segmento superior do lobo inferior direito (segmento apical). Considerando os mecanismos fisiopatológicos das afecções pulmonares por aspiração e as diretrizes brasileiras e internacionais, qual das condutas abaixo é a mais adequada?</p>
<p>A) Realizar aspiração traqueal isolada e manter suporte clínico expectante sem introduzir antimicrobianos, visto que quadros aspirativos são primariamente pneumonites químicas estéreis.<br>
B) Prescrever Amoxicilina-Clavulanato oral ou Ampicilina-Sulbactam intravenoso, direcionados à cobertura de bactérias anaeróbias orais e estreptococos da orofaringe.<br>
C) Prescrever Daptomicina intravenosa em monoterapia de alta dose com foco em infecções necrotizantes por germes Gram-positivos orais.<br>
D) Indicar drenagem torácica imediata por tubo em selo d'água associada a corticoterapia inalatória em altas doses.<br>
E) Prescrever Ciprofloxacino oral associado a Metronidazol como terapia de primeira escolha para toda aspiração comunitária simples.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> O paciente apresenta uma <strong>pneumonia aspirativa bacteriana subaguda</strong> clássica decorrente de microaspirações orofaríngeas repetidas em paciente com disfagia pós-AVE. O acometimento do segmento superior do lobo inferior direito (segmento de Fowler) é a topografia típica de aspiração gravitacional. O tratamento antimicrobiano de escolha fundamenta-se em aminopenicilinas com inibidores de beta-lactamase (<strong>Amoxicilina-Clavulanato</strong> por via oral para casos leves/moderados ou <strong>Ampicilina-Sulbactam</strong> por via venosa para casos internados), assegurando cobertura contra bactérias anaeróbias estritas da cavidade oral (<em>Peptostreptococcus</em>, <em>Prevotella</em>) e estreptococos do grupo viridans.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> A conduta expectante sem antibióticos é indicada exclusivamente na <em>pneumonite química pura (Síndrome de Mendelson)</em> após aspiração aguda de suco gástrico ácido diante de cirurgias ou convulsões. O caso descrito é de instalação arrastada (4 dias), com tosse produtiva purulenta e consolidação radiológica, confirmando infecção bacteriana ativa invasiva.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> A Daptomicina é inativada pelo surfactante alveolar pulmonar, sendo contraindicada em qualquer infecção do parênquima pulmonar.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> Não há derrame pleural volumoso nem empiema loculado evidenciado no enunciado que justifique toracostomia com drenagem pleural fechada.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> As fluoroquinolonas não respiratórias como o Ciprofloxacino apresentam atividade antipneumocócica e anti-estreptocócica insuficiente para tratar infecções do trato respiratório inferior, não sendo opção empírica de primeira linha na pneumonia aspirativa comunitária.</li>
  </ul>
</div>

<h3>Questão 3 (UNICAMP / FMUSP - Farmacologia Aplicada na Terapia Intensiva)</h3>
<p>Durante a discussão farmacodinâmica na UTI sobre a antibioticoterapia de um paciente idoso internado com PAC grave por pneumococo associada a choque séptico sob ventilação mecânica invasiva, o intensivista propõe utilizar infusão estendida de um betalactâmico antipseudomonas (Piperacilina-Tazobactam ou Cefepima) em vez da infusão rápida clássica de 30 minutos. Qual é o fundamento farmacocinético/farmacodinâmico (PK/PD) e a justificativa clínica comprovada para essa conduta?</p>
<p>A) Maximizar o pico sérico plasmático da droga ($C_{\text{max}}/\text{MIC}$), visto que os betalactâmicos dependem de doses de pico elevadas para vencer a barreira hematoencefálica e o epitélio alveolar.<br>
B) Aumentar a fração de tempo do intervalo entre as doses em que a concentração plasmática livre da droga permanece acima da concentração inibitória mínima (%fT &gt; MIC), otimizando a bactericidia tecidual pulmonar no choque séptico.<br>
C) Reduzir a taxa de depuração renal da droga ao sobrecarregar a secreção tubular proximal do túbulo contorcido distal.<br>
D) Garantir a inibição da síntese da parede celular bacteriana por meio do aumento do efeito pós-antibiótico prolongado exclusivo dos betalactâmicos.<br>
E) Aumentar a taxa de ligação proteica do antimicrobiano à albumina sérica, reduzindo a toxicidade hepática direta das cefalosporinas.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> Os betalactâmicos (penicilinas, cefalosporinas, carbapenêmicos) são antimicrobianos <strong>tempo-dependentes</strong>. Sua eficácia bactericida correlaciona-se com o índice <strong>%fT &gt; MIC</strong> (porcentagem de tempo em que a droga livre plasmática excede a concentração inibitória mínima do patógeno). Na sepse grave e no choque séptico, ocorrem profundas alterações hemodinâmicas com dilatação do volume de distribuição e, em pacientes jovens ou hiperdinâmicos, hiperclearance renal, fazendo com que as concentrações plasmáticas no vale caiam abaixo do MIC precocemente. A utilização de <strong>infusão estendida de 3 a 4 horas ou infusão contínua</strong> mantém as concentrações séricas e no fluido de revestimento epitelial alveolar (ELF) constantemente acima do MIC durante praticamente 100% do tempo do intervalo, maximizando a cura microbiológica e reduzindo a mortalidade em pacientes críticos de UTI.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> Os antimicrobianos que dependem do índice $C_{\text{max}}/\text{MIC}$ (concentração-dependentes) são os aminoglicosídeos e as fluoroquinolonas, e não os betalactâmicos.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> A infusão estendida não reduz a depuração renal intrínseca do paciente, mas apenas fornece taxa de infusão constante que compensa a taxa contínua de eliminação renal.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> Os betalactâmicos praticamente não possuem efeito pós-antibiótico (PAE) significativo contra bactérias Gram-negativas, necessitando que o nível sérico seja mantido continuamente acima do MIC. Efeito pós-antibiótico prolongado é característico de aminoglicosídeos e quinolonas.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A fração do antibiótico que exerce ação antibacteriana é a droga livre (não ligada a proteínas). O aumento de ligação proteica reduziria, e não aumentaria, a fração ativa livre difusível no alvéolo.</li>
  </ul>
</div>

<h3>Questão 4 (UNIFESP - Infectologia e Paciente Imunodeprimido)</h3>
<p>Um homem de 35 anos, portador de leucemia mieloide aguda em indução de quimioterapia, apresenta neutropenia febril grave (neutrófilos totais = 80/mm³) persistente há 4 dias a despeito do uso correto de Cefepima intravenosa em dose plena. Nas últimas 24 horas, iniciou tosse seca, dispneia leve e dor torácica pleurítica em hemitórax direito. A tomografia de tórax de alta resolução revela três nódulos pulmonares circundados por atenuação em vidro fosco (sinal do halo). O antígeno galactomanana sérica resulta positivo com índice de 2,1. Diante desse quadro clínico e tomográfico, qual é o agente etiológico provável e o esquema terapêutico de escolha?</p>
<p>A) <em>Pneumocystis jirovecii</em>; indicar Sulfametoxazol-Trimetoprima associado a corticoterapia oral.<br>
B) <em>Aspergillus fumigatus</em>; indicar Voriconazol intravenoso e manter a cobertura antibacteriana de amplo espectro.<br>
C) <em>Streptococcus pneumoniae</em> multirresistente; associar Vancomicina e Ceftarolina.<br>
D) <em>Candida albicans</em> pulmonar primária; indicar Fluconazol intravenoso em alta dose.<br>
E) <em>Legionella pneumophila</em>; iniciar Levofloxacino intravenoso em monoterapia e suspender a cefepima.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> O paciente apresenta <strong>Aspergilose Pulmonar Invasiva (angioinvasiva)</strong>, uma das infecções fúngicas mais temidas e frequentes no paciente com neutropenia prolongada e profunda pós-quimioterapia hematológica. O <strong>sinal do halo</strong> (macronódulo denso de necrose isquêmica circundado por halo de vidro fosco correspondente à hemorragia alveolar perilesional por angioinvasão fúngica) e a dosagem de <strong>galactomanana sérica positiva</strong> (&gt; 0,5 ou 1,0) confirmam o diagnóstico com altíssima especificidade. O tratamento de primeira escolha comprovado em ensaios clínicos randomizados é o <strong>Voriconazol por via intravenosa</strong> (ou alternativamente Isavuconazol). A cobertura bacteriana antipseudomonas com Cefepima deve ser mantida enquanto o paciente permanecer em neutropenia para evitar bacteriemia fulminante de foco translocatório intestinal.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> O <em>Pneumocystis jirovecii</em> manifesta-se tipicamente por vidro fosco difuso perihilar bilateral e LDH elevado, não apresentando positividade para galactomanana sérica nem padrão nodular com sinal do halo de angioinvasão.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> O pneumococo causa consolidação lobar típica e responde a betalactâmicos, não justificando sinal do halo angioinvasivo nem galactomanana sérica positiva.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A pneumonia primária por <em>Candida</em> é uma entidade extraordinariamente rara e quase inexistente na prática clínica (a presença de <em>Candida</em> em escarro ou lavado brônquico representa quase invariavelmente mera colonização orofaríngea comensal e não exige tratamento).</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A <em>Legionella</em> causa pneumonia grave com hiponatremia e alterações gastrointestinais, não se relacionando com galactomanana positiva ou padrão angioinvasivo clássico de nódulo com sinal do halo.</li>
  </ul>
</div>

<h3>Questão 5 (SURCE - Epidemiologia e Prevenção Institucional)</h3>
<p>Em uma Instituição de Longa Permanência para Idosos (ILPI) com 48 residentes, foram diagnosticados 3 casos de infecção confirmada por Influenza A H3N2 por RT-PCR nas últimas 48 horas em idosos de diferentes dormitórios, configurando um surto institucional ativo de síndrome respiratória aguda. Mais de 80% dos residentes receberam a vacina da gripe na campanha do ano anterior, mas a campanha do ano vigente ainda não foi iniciada pelo município. Considerando as recomendações do Ministério da Saúde do Brasil e da Sociedade Brasileira de Imunizações (SBIm) para contenção de surtos institucionais, qual é a conduta quimioprofilática imediata a ser implementada?</p>
<p>A) Não indicar quimioprofilaxia farmacológica para nenhum residente, limitando-se ao isolamento estrito por gotículas dos 3 casos sintomáticos, pois a vacina do ano anterior confere imunidade residual permanente.<br>
B) Prescrever Oseltamivir oral na dose terapêutica de 75 mg de 12/12 horas para todos os 48 residentes por 30 dias contínuos.<br>
C) Prescrever Oseltamivir oral na dose profilática de 75 mg uma vez ao dia para todos os residentes assintomáticos, por no mínimo 14 dias e mantida por até 7 dias após o surgimento do último caso confirmado.<br>
D) Administrar dose dobrada da vacina pneumocócica 23-valente a todos os idosos e iniciar Amoxicilina profilática contínua.<br>
E) Prescrever Azitromicina oral em dose única diária por 5 dias para todos os contatos como medida profilática primária de vírus respiratórios envelopados.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa C está CORRETA:</strong> Diante de surto institucional ativo de Influenza em ambientes fechados com população de alta vulnerabilidade (como lares de idosos, asilos e enfermarias geriátricas), o Ministério da Saúde e as diretrizes internacionais recomendam a implementação imediata de <strong>quimioprofilaxia antiviral com Oseltamivir na dose profilática de 75 mg via oral 1 vez ao dia (com ajuste para função renal) para todos os residentes assintomáticos</strong>, independentemente do status vacinal prévio. A profilaxia deve ser mantida por um período <strong>mínimo de 14 dias</strong> e deve prosseguir até <strong>7 dias após a detecção do último caso confirmado</strong> no ambiente. Essa medida previne dezenas de hospitalizações e óbitos por broncopneumonia bacteriana secundária no idoso frágil.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> A taxa de ataque secundária de Influenza em ILPI sem quimioprofilaxia ativa ultrapassa 40% a 60%, cursando com elevada letalidade. Além disso, a imunidade conferida pela vacina do ano anterior sofre perda de eficácia decorrente do fenômeno de 'drift' antigênico e da queda dos títulos de anticorpos protetores no idoso.</li>
    <li><strong>Alternativa B está INCORRETA:</strong> A dose de 75 mg de 12/12 horas é a dose <em>terapêutica</em> destinada aos pacientes que já manifestaram a doença clinicamente. Para os contatos assintomáticos, a dose correta de quimioprofilaxia é de 75 mg <em>uma vez ao dia</em>.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A vacina antipneumocócica previne infecção por <em>Streptococcus pneumoniae</em> e não possui atividade antiviral contra o vírus Influenza.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A azitromicina é um antibacteriano e não tem nenhuma atividade terapêutica ou profilática contra o vírus Influenza, configurando prescrição irracional com seleção de resistência microbiana.</li>
  </ul>
</div>

<h3>Questão 6 (AMRIGS / Associação Médica do RS - Terapia Intensiva e PAC)</h3>
<p>Mulher de 70 anos, previamente hígida, é internada diretamente em UTI com quadro de sepse grave secundária a pneumonia adquirida na comunidade em lobo inferior direito, com índice CURB-65 = 3 e índice de PSI/PORT classe V. A gasometria arterial inicial revela relação $\text{PaO}_2/\text{FiO}_2 = 180 \text{ mmHg}$, preenchendo critérios para ventilação mecânica invasiva. A paciente não possui histórico de internação hospitalar no último ano, não fez uso recente de antibióticos e não possui fatores de risco documentados para patógenos multirresistentes. Segundo as recomendações conjuntas da Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) e da American Thoracic Society / Infectious Diseases Society of America (ATS/IDSA), qual é o esquema antimicrobiano empírico parenteral de primeira linha indicado para esta paciente na admissão?</p>
<p>A) Monoterapia com Cefepima intravenosa em dose plena de 2g de 8/8h em infusão contínua.<br>
B) Betalactâmico parenteral com atividade antipneumocócica (Ceftriaxona 2g/dia ou Ampicilina-Sulbactam 1,5 a 3g de 6/6h) associado obrigatoriamente a um Macrolídeo (Azitromicina 500 mg/dia ou Claritromicina 500 mg 12/12h) ou a uma Fluoroquinolona respiratória em monoterapia (Levofloxacino ou Moxifloxacino).<br>
C) Meropenem intravenoso associado a Vancomicina e Amicacina para cobertura tríplice empírica mandatória em toda admissão em UTI.<br>
D) Piperacilina-Tazobactam associado a Daptomicina e Oseltamivir em todos os pacientes intubados independentemente da época do ano.<br>
E) Ampicilina oral associada a Doxiciclina intravenosa em baixas doses com monitorização de enzimas hepáticas.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> Para pacientes com pneumonia comunitária grave que exigem internação em Unidade de Terapia Intensiva (UTI) <strong>sem fatores de risco específicos para <em>Pseudomonas aeruginosa</em> ou MRSA</strong>, as diretrizes da SBPT e ATS/IDSA preconizam de forma inequívoca o esquema combinado de <strong>um Betalactâmico intravenoso potente (Ceftriaxona 2g IV 1x/dia, Cefotaxima ou Ampicilina-Sulbactam) associado a um Macrolídeo intravenoso (Azitromicina 500 mg IV ao dia ou Claritromicina 500 mg IV 12/12h)</strong>. A alternativa aceita é o uso de uma fluoroquinolona respiratória (Levofloxacino 750 mg IV/dia ou Moxifloxacino 400 mg IV/dia) associada ao betalactâmico. Estudos demonstraram que a combinação de betalactâmico com macrolídeo confere menor mortalidade que a monoterapia na PAC grave de UTI, graças à cobertura do amplo espectro pneumocócico e atípico associada à imunomodulação exercida pelos macrolídeos.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> Monoterapia com betalactâmico é estritamente contraindicada na PAC admitida em UTI; a associação com macrolídeo ou quinolona respiratória é mandatória para reduzir a mortalidade. Além disso, o uso de Cefepima sem indicação para <em>Pseudomonas</em> seleciona cepas resistentes desnecessariamente.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> O uso empírico indiscriminado de Meropenem + Vancomicina + Amicacina em paciente sem nenhum fator de risco para germes nosocomiais multirresistentes é um erro grave de stewardship de antibióticos que eleva nefrotoxicidade e seleção bacteriana.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A Daptomicina é inativada pelo surfactante pulmonar e nunca deve ser prescrita para pneumonia.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> Pacientes em UTI em choque séptico ou insuficiência respiratória exigem antimicrobianos intravenosos bactericidas potentes; a via oral e doses subótimas de ampicilina simples são ineficazes e perigosas.</li>
  </ul>
</div>
`;

// Execução da expansão da PAC
const sectionsPAC = [
  {
    id: 'sec-pac-imunodeprimidos-pkpd-aspiracao',
    title: 'Aprofundamento Avançado: PAC em Imunodeprimidos Não-HIV, Princípios de PK/PD e Síndromes Aspirativas',
    html: secPAC_Imuno_PKPD_Asp
  },
  {
    id: 'sec-pac-casos-clinicos-avancados',
    title: 'Casos Clínicos de Alta Complexidade: Imunodeprimidos, Aspiração, PK/PD e PAC Grave na UTI',
    html: secPAC_Casos_Avancados
  },
  {
    id: 'sec-pac-questoes-residencia-comentadas',
    title: 'Bateria de Questões Comentadas de Residência Médica e Provas de Título (PAC)',
    html: secPAC_Questoes_Residencia
  }
];

appendMultipleSections('pneumonias-adquiridas-na-comunidade', sectionsPAC);
