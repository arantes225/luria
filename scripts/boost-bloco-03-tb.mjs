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
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolo Clínico e Diretrizes Terapêuticas da Tuberculose</a>',
          '<a href="https://www.who.int/teams/global-tuberculosis-programme" target="_blank" rel="noopener noreferrer">World Health Organization (WHO) - Global Tuberculosis Report</a>',
          '<a href="https://www.thoracic.org" target="_blank" rel="noopener noreferrer">American Thoracic Society / CDC / IDSA Guidelines on TB</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// ============================================================================
// SEÇÃO 1 TB: ILTB (3HP/1HP/4R/6H/9H), HEPATOTOXICIDADE DILI E ALGORITMO OFICIAL
// ============================================================================
const secTB_ILTB_DILI = `
<h3>Infecção Latente pelo <em>Mycobacterium tuberculosis</em> (ILTB): Novos Esquemas do Ministério da Saúde</h3>
<p>O controle definitivo da tuberculose como agravo de saúde pública exige não apenas o diagnóstico e a cura dos indivíduos bacilíferos com doença ativa, mas também o diagnóstico precoce e o tratamento dos reservatórios humanos infectados assintomáticos — a chamada <strong>Infecção Latente da Tuberculose (ILTB)</strong>. Na ILTB, os bacilos encontram-se contidos em granulomas quiescentes sob baixa atividade metabólica, sem provocar sinais clínicos nem alterações radiológicas ativas, mas mantendo risco contínuo de reativação endógena ao longo da vida (estimado em 5% a 10% no indivíduo imunocompetente e em até 10% ao ano na pessoa vivendo com HIV):</p>
<ul>
  <li><strong>Métodos Diagnósticos Oficiais de ILTB no Brasil:</strong>
    <ul>
      <li><strong>Prova Tuberculínica (PT / PPD - PPD RT-23):</strong> Consiste na inoculação intradérmica de 0,1 mL de derivado proteico purificado no terço médio da face anterior do antebraço esquerdo. A leitura deve ser realizada <strong>entre 48 e 72 horas após a aplicação</strong> (podendo estender-se até 96 horas se o paciente não comparecer antes), medindo-se com régua milimetrada exclusivamente o <strong>maior diâmetro transverso da enduração/induração palpável</strong>, ignorando-se o eritema cutâneo isolado.
        <ul>
          <li><strong>PPD &ge; 5 mm (Reator Forte em Populações de Alto Risco):</strong> Considerado positivo em contatos intradomiciliares de bacilíferos, pessoas vivendo com HIV (PVHIV independentemente do CD4), candidatos ao uso de imunobiológicos anti-TNF-$\alpha$, pacientes em programação de transplante de órgãos ou medula óssea, usuários crônicos de corticoterapia sistêmica (&ge; 15 mg/dia de prednisona ou equivalente por mais de 30 dias) e indivíduos com alterações radiológicas fibróticas pulmonares cicatriciais sugestivas de TB curada espontaneamente.</li>
          <li><strong>PPD &ge; 10 mm (Reator em Populações de Risco Intermediário):</strong> Considerado positivo em profissionais de saúde com risco ocupacional, diabéticos descompensados, portadores de insuficiência renal crônica em diálise, silicose pulmonar, desnutridos graves, neoplasias hematológicas e populações privadas de liberdade.</li>
          <li><strong>Fenômeno Booster:</strong> Em indivíduos idosos ou vacinados com BCG há muitos anos, a resposta tuberculínica pode sofrer enfraquecimento com o tempo. Uma primeira dose de PPD estimula a memória imunológica (efeito 'booster'), de modo que uma segunda dose aplicada 1 a 3 semanas após pode resultar francamente positiva sem significar infecção recente.</li>
        </ul>
      </li>
      <li><strong>Ensaios de Liberação de Interferon-Gama (IGRA - QuantiFERON-TB Gold Plus e T-SPOT.TB):</strong> Testes laboratoriais in vitro que quantificam a liberação de IFN-$\gamma$ por linfócitos T sensibilizados do sangue periférico após estimulação com antígenos altamente específicos do <em>M. tuberculosis</em> (como <strong>ESAT-6</strong> e <strong>CFP-10</strong>).
        <ul>
          <li><strong>Vantagens Clínicas Críticas sobre o PPD:</strong> Como os antígenos ESAT-6 e CFP-10 são codificados pela região de deleção 1 (RD1) do genoma micobacteriano, eles <strong>estão ausentes em todas as cepas vacinais do BCG e na quase totalidade das micobactérias não tuberculosas</strong> (com exceção de <em>M. kansasii</em>, <em>M. marinum</em> e <em>M. szulgai</em>). O IGRA, portanto, <strong>NÃO apresenta falsos-positivos decorrentes de vacinação prévia por BCG</strong> e requer apenas uma coleta única de sangue periférico, dispensando o retorno presencial do paciente para leitura do teste.</li>
          <li><strong>Indicações Prioritárias no SUS:</strong> O Ministério da Saúde recomenda o IGRA prioritariamente para PVHIV com contagem de CD4 &gt; 350 células/mm³, candidatos a terapia com inibidores de TNF-$\alpha$, receptores de transplante de órgãos sólidos e crianças contatos &gt; 2 anos vacinadas com BCG após o primeiro ano de vida.</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Regime Terapêutico de ILTB</th>
      <th>Composição Farmacológica e Posologia Padronizada (Adultos &ge; 50 kg)</th>
      <th>Duração Total e Frequência das Doses</th>
      <th>Principais Vantagens Clínicas e Indicações Preferenciais pelo MS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Esquema 3HP (Rifapentina + Isoniazida Semanal)</strong></td>
      <td><strong>Rifapentina 900 mg + Isoniazida 900 mg</strong> (associados a Piridoxina 50 mg), administrados em dose única semanal por via oral.</td>
      <td><strong>12 semanas consecutivas (total de 12 doses semanais)</strong> sob Tratamento Diretamente Observado (TDO).</td>
      <td><strong>Regime de primeira escolha no SUS:</strong> Reduz o tempo de tratamento de 6-9 meses para apenas 3 meses (12 tomadas), elevando a taxa de adesão e conclusão do tratamento de 50% para mais de 85% a 90%. Apresenta incidência significativamente menor de hepatotoxicidade medicamentosa que a isoniazida diária isolada. Indicado para contatos &ge; 2 anos, PVHIV sem uso de inibidores de protease e imunodeprimidos.</td>
    </tr>
    <tr>
      <td><strong>Esquema 1HP (Rifapentina + Isoniazida Diária)</strong></td>
      <td><strong>Rifapentina 600 mg + Isoniazida 300 mg</strong> administrados diariamente por via oral.</td>
      <td><strong>28 dias consecutivos (total de 28 doses diárias = 1 mês)</strong>.</td>
      <td><strong>Regime ultracurto revolucionário:</strong> Indicado prioritariamente para PVHIV com contagem de linfócitos T CD4 preservada e contatos prioritários em ambientes onde se busca término ultrarrápido da profilaxia antes do início de terapias biológicas agressivas.</td>
    </tr>
    <tr>
      <td><strong>Esquema 4R (Rifampicina Diária)</strong></td>
      <td><strong>Rifampicina 10 mg/kg/dia até 600 mg/dia</strong> por via oral em jejum (1 hora antes ou 2 horas após a refeição).</td>
      <td><strong>4 meses contínuos (total de 120 doses diárias)</strong>.</td>
      <td><strong>Regime de escolha para hepatopatas crônicos</strong>, indivíduos com intolerância gástrica ou toxicidade prévia à isoniazida, e contatos comprovados de pacientes fontes com tuberculose resistente à isoniazida. Possui excelente tolerabilidade hepática.</td>
    </tr>
    <tr>
      <td><strong>Esquemas Tradicionais 6H e 9H (Isoniazida Diária)</strong></td>
      <td><strong>Isoniazida 5 a 10 mg/kg/dia até 300 mg/dia</strong> em dose única diária, associada a Piridoxina (vitamina B6) 25 a 50 mg/dia em populações de risco.</td>
      <td><strong>6 meses (180 doses)</strong> para a maioria dos imunocompetentes, ou <strong>9 meses (270 doses)</strong>, que permanece o esquema clássico formal para PVHIV com imunodeficiência avançada.</td>
      <td>Regime historicamente consagrado, mantido como alternativa na indisponibilidade de rifamicinas, gestantes (onde rifapentina é contraindicada por dados limitados de teratogenicidade) ou contraindicação estrita a rifamicinas por interações medicamentosas graves.</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Conforme o Protocolo Clínico e Diretrizes Terapêuticas (PCDT) para Manejo da Infecção Latente pelo <em>Mycobacterium tuberculosis</em> no Brasil (MS/SVS).</td>
    </tr>
  </tfoot>
</table>

<h3>Hepatotoxicidade Induzida por Drogas Antituberculosas (DILI) e Algoritmo Oficial de Reintrodução</h3>
<p>A lesão hepática induzida por fármacos (DILI - <em>Drug-Induced Liver Injury</em>) representa a toxicidade farmacológica mais comum e potencialmente fatal durante o tratamento da tuberculose com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol). Compreender a hierarquia toxicológica dos quatro fármacos é indispensável para o manejo clínico e para o sucesso em provas de concurso:</p>
<ul>
  <li><strong>Hierarquia Toxicológica Hepática dos Fármacos do Esquema RIPE:</strong>
    <ul>
      <li><strong>Pirazinamida (Z):</strong> É a <strong>droga mais potente indutora de hepatotoxicidade</strong> e necrose hepatocelular grave, sendo a responsável mais frequente por hepatite fulminante e óbito. Sua toxicidade é dose-dependente e idiossincrática crônica.</li>
      <li><strong>Isoniazida (H):</strong> Segunda droga em potencial hepatotóxico. Ocorre através de seus metabólitos reativos (monoacetil-hidrazina), gerados pela enzima N-acetiltransferase 2 (NAT2). Indivíduos com fenótipo de 'acetiladores lentos' acumulam intermediários reativos tóxicos que induzem estresse oxidativo mitocondrial e necrose hepatocelular centrolobular.</li>
      <li><strong>Rifampicina (R):</strong> Apresenta menor toxicidade hepatocelular intrínseca isolada, manifestando-se tipicamente por padrão colestático leve ou hiperbilirrubinemia não conjugada decorrente da inibição competitiva dos transportadores de captação de bilirrubina (OATP1B1). Contudo, a Rifampicina é um <strong>potente indutor do citocromo P450 (CYP3A4/CYP2E1)</strong>, acelerando a conversão da isoniazida em metabólitos tóxicos e sinergizando a toxicidade combinada no fígado.</li>
      <li><strong>Etambutol (E):</strong> <strong>NÃO É HEPATOTÓXICO!</strong> O etambutol é eliminado quase exclusivamente por excreção renal, não provocando inflamação nem necrose hepática. Sua toxicidade clássica é ocular (neurite óptica retrobulbar dose-dependente).</li>
    </ul>
  </li>
  <li><strong>Critérios Oficiais para Suspensão Imediata do Esquema RIPE (Diretrizes Ministério da Saúde / OMS):</strong>
    <ul>
      <li><strong>Critério Assintomático:</strong> Elevação de <strong>TGO/AST ou TGP/ALT &ge; 5 vezes o Limite Superior da Normalidade (LSN)</strong>, mesmo na ausência completa de sintomas digestivos ou queixas clínicas; OU</li>
      <li><strong>Critério Sintomático:</strong> Elevação de <strong>TGO/AST ou TGP/ALT &ge; 3 vezes o LSN</strong> acompanhada de sintomas clínicos de hepatotoxicidade (icterícia escleral/cutânea, náuseas persistentes, vômitos, dor em hipocôndrio direito, anorexia e astenia severa) OU elevação de <strong>Bilirrubina Total &ge; 2,0 mg/dL</strong>.</li>
    </ul>
  </li>
  <li><strong>Conduta Imediata Durante a Fase de Suspensão Aguda:</strong>
    <ol>
      <li><strong>Interromper imediatamente todas as drogas do esquema RIPE.</strong> Não manter nenhuma medicação hepatotóxica em dose reduzida.</li>
      <li>Solicitar exames laboratoriais a cada 48 a 72 horas: transaminases (TGO, TGP), bilirrubina total e frações, fosfatase alcalina, gama-GT e coagulograma com tempo de protrombina (TAP/INR) para vigiar o surgimento precoce de falência hepática aguda (INR &gt; 1,5 com encefalopatia hepática).</li>
      <li>Investigar ativamente diagnósticos diferenciais de hepatite aguda: sorologias virais completas (Anti-HAV IgM, HBsAg, Anti-HBc IgM, Anti-HCV), uso concomitante de álcool, paracetamol, chás hepatotóxicos e sepse.</li>
      <li><strong>Manejo em Pacientes Graves ou com Baciloscopia Positiva Intensa:</strong> Se o paciente apresentar tuberculose grave, meningoencefalite, padrão miliar disseminado ou quadro respiratório crítico que impeça a interrupção completa da terapia tuberculostática durante semanas, deve-se prescrever imediatamente o <strong>Esquema Temporário Não Hepatotóxico de Resgate: Estreptomicina (S) + Etambutol (E) + Levofloxacino (L) — Esquema SEL</strong>.</li>
    </ol>
  </li>
  <li><strong>Protocolo Oficial do Ministério da Saúde para Reintrodução Medicamentosa Escalonada:</strong>
    <ul>
      <li><strong>Momento de Início:</strong> A reintrodução só pode ser iniciada após a <strong>completa normalização clínica dos sintomas e queda das transaminases para valores inferiores a 2 vezes o LSN</strong> (e bilirrubina total &lt; 1,5 mg/dL).</li>
      <li><strong>Ordem Cronológica de Reintrodução Passo a Passo:</strong>
        <ol>
          <li><strong>1º Passo:</strong> Introduzir o fármaco não hepatotóxico e a droga bactericida com menor toxicidade hepática direta: <strong>Etambutol (E) na dose plena (15 mg/kg/dia) associado à Rifampicina (R) na dose plena (10 mg/kg/dia)</strong>. Manter e monitorar enzimas hepáticas e sintomas após 3 a 7 dias.</li>
          <li><strong>2º Passo:</strong> Se as transaminases permanecerem estáveis (&lt; 2x LSN) e o paciente mantiver-se assintomático, adicionar a <strong>Isoniazida (H) na dose plena (5 a 10 mg/kg/dia)</strong>. Coletar novo controle laboratorial de transaminases após 3 a 7 dias.</li>
          <li><strong>3º Passo (Decisão Crítica sobre a Pirazinamida):</strong> Se as enzimas permanecerem estritamente normais, avaliar a reintrodução da Pirazinamida (Z). Contudo, o Protocolo do Ministério da Saúde determina: <strong>Se o episódio prévio de hepatite tóxica foi grave (presença de icterícia franca, INR elevado ou transaminases basais &gt; 10x LSN), a Pirazinamida NÃO DEVE SER REINTRODUZIDA</strong>, sendo definitivamente banida do esquema do paciente. Nesse caso, o paciente completará o tratamento com <strong>Rifampicina + Isoniazida + Etambutol (RHE) por um período prolongado de 9 meses (2 RHE / 7 RH)</strong>.</li>
        </ol>
      </li>
    </ul>
  </li>
</ul>
`;

// ============================================================================
// SEÇÃO 2 TB: TB EXTRAPULMONAR ESPECÍFICA, TDO NO SUS E COINFECÇÃO TB-HIV COM SIRI
// ============================================================================
const secTB_Extra_TDO_HIV_SIRI = `
<h3>Tuberculose Extrapulmonar em Detalhes de Alta Cobrança Propedêutica</h3>
<p>Embora o pulmão seja o órgão-alvo primário da infecção micobacteriana por via aerógena, em cerca de 15% a 25% dos indivíduos imunocompetentes e em mais de 50% dos pacientes vivendo com HIV e imunodeprimidos, o <em>Mycobacterium tuberculosis</em> dissemina-se por vias linfoematogênicas para múltiplos tecidos orgânicos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Sítio Extrapulmonar</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Quadro Clínico e Alterações Propedêuticas Clássicas</th>
      <th>Critérios Diagnósticos e Particularidades do Tratamento (MS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tuberculose Pleural (Pleurite Tuberculosa)</strong></td>
      <td>Ruptura de pequeno foco caseoso subpleural para a cavidade pleural, desencadeando resposta imunoalérgica exuberante de hipersensibilidade tardia mediada por células T.</td>
      <td>Dor torácica pleurítica aguda ou subaguda ventilatório-dependente, tosse seca, febre vespertina e dispneia progressiva. Radiografia revela derrame pleural unilateral de volume moderado a volumoso.</td>
      <td><strong>Toracocentese Diagnóstica:</strong> Exsudato (pelos critérios de Light); <strong>linfocitose marcante (&gt; 75% a 80% de linfócitos)</strong>; <strong>ausência ou raridade extrema de células mesoteliais (&lt; 5%)</strong>; <strong>Adenosina Desaminase (ADA) &gt; 40 U/L</strong> (sensibilidade &gt; 92% e especificidade &gt; 90% em regiões de alta prevalência no Brasil); TRM-TB e baciloscopia com baixo rendimento no líquido (&lt; 10% a 30%). Padrão-ouro: biópsia pleural com agulha de Cope demonstrando granulomas caseosos. Tratamento: RIPE por <strong>6 meses</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Ganglionar Periférica (Escrófula)</strong></td>
      <td>Disseminação linfática retrógrada a partir dos linfonodos mediastinais, acometendo preferencialmente as cadeias cervicais e supraclaviculares. É a forma extrapulmonar mais prevalente.</td>
      <td>Aumento volumétrico insidioso e indolor de linfonodos cervicais unilaterais ou bilaterais. Inicialmente móveis, confluem progressivamente formando massas endurecidas e aderidas aos planos profundos ('empastamento ganglionar'), com posterior amolecimento central e <strong>fistulização espontânea para a pele com drenagem de caseum esbranquiçado (escrofulodermia)</strong>.</td>
      <td>Diagnóstico de escolha: Punção Aspirativa por Agulha Fina (PAAF) para realização de TRM-TB, baciloscopia e cultura; se inconclusivo, biópsia excisional cirúrgica do linfonodo. Tratamento: RIPE por <strong>6 meses</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Óssea e Articular (Mal de Pott)</strong></td>
      <td>Disseminação hematogênica para o osso esponjoso dos corpos vertebrais da <strong>coluna torácica baixa e lombar alta</strong>, com erosão óssea anterior e destruição do disco intervertebral vizinho.</td>
      <td>Dor lombar crônica de ritmo inflamatório, espasmo da musculatura paravertebral, formação de <strong>abscesso frio paravertebral e no ventre do músculo psoas</strong>, colapso anterior das vértebras com <strong>deformidade em cifose angular pontiaguda ('giba de Pott')</strong> e risco de compressão medular com paraplegia crural.</td>
      <td>Ressonância Magnética de coluna (evidencia destruição discal e contiguidade das vértebras adjacentes com abscessos de partes moles). Punção percutânea guiada por TC para cultura e TRM-TB. Tratamento: <strong>Esquema RIPE prolongado por 12 meses (2 RHZE / 10 RH)</strong>. Indicação cirúrgica de urgência se déficit neurológico agudo ou instabilidade biomecânica da coluna.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Urogenital</strong></td>
      <td>Disseminação hematogênica primária para o córtex renal bilateral com formação de granulomas que cicatrizam; décadas depois, reativação medular renal com invasão do sistema coletor, ureteres, bexiga e genitais.</td>
      <td>Sintomas miccionais irritativos refratários crônicos (disúria, polaciúria, noctúria), hematúria microscópica ou macroscópica indolor, estenoses ureterais segmentares com dilatação a montante ('imagem em contas de rosário' ou 'em colar de contas') e retração fibrótica da parede vesical gerando <strong>microbexiga cicatricial espástica ('bexiga em dedal' / <em>thimble bladder</em>)</strong>.</td>
      <td><strong>Achado laboratorial clássico: 'Piúria Ácida Estéril'</strong> (leucocitúria aos milhares em urina ácida estéril para germes piogênicos comuns em ágar padrão). Diagnóstico confirmatório: isolamento de <em>M. tuberculosis</em> ou TRM-TB em pelo menos <strong>3 a 6 amostras seriadas da primeira urina da manhã</strong> em dias consecutivos. Tratamento: RIPE por <strong>6 meses</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Pericárdica (Pericardite Tuberculosa)</strong></td>
      <td>Disseminação linfática retrógrada a partir de linfonodos peri-hilares e traqueobrônquicos inflamados para o saco pericárdico.</td>
      <td>Quadro subagudo de febre, astenia, tosse seca, atrito pericárdico e dor precordial atípica. Risco de evolução para <strong>tamponamento cardíaco agudo</strong> (tríade de Beck: hipotensão, abafamento de bulhas, turgência jugular) ou evolução crônica para <strong>Pericardite Constritiva calcificada com espessamento pericárdico ('coração em couraça')</strong>.</td>
      <td>Ecocardiograma transtorácico com derrame pericárdico com traves de fibrina. Pericardiocentese com dosagem de ADA elevada (&gt; 35 a 40 U/L) no líquido pericárdico. Tratamento: RIPE por <strong>6 meses</strong> associado <strong>obrigatoriamente a Corticoterapia Sistêmica Adjuvante (Prednisona 60 mg/dia com desmame em 6 a 8 semanas)</strong>, o que reduz dramaticamente a progressão para pericardite constritiva e diminui a mortalidade cardiovascular.</td>
    </tr>
    <tr>
      <td><strong>Tuberculose Ocular / Retiniana</strong></td>
      <td>Disseminação hematogênica para a circulação úvea posterior ou vasculite imunológica oclusiva dos vasos retinianos.</td>
      <td>Queda progressiva e indolor da acuidade visual, floaters (moscas volantes), turvação visual e hiperemia conjuntival. O exame de fundo de olho revela tubérculos de coroide (nódulos sub-retinianos amarelados) ou <strong>vasculite retiniana oclusiva (quadro indistinguível da Doença de Eales)</strong> com neovascularização periférica e hemorragia vítrea de repetição.</td>
      <td>Fundoscopia e angiofluoresceinografia correlacionadas com prova tuberculínica forte ou IGRA positivo e resposta clínica favorável ao esquema RIPE.</td>
    </tr>
  </tbody>
</table>

<h3>Tratamento Diretamente Observado (TDO / DOTS) no Sistema Único de Saúde (SUS)</h3>
<p>O abandono do tratamento da tuberculose é a causa motriz primordial do fracasso terapêutico, da transmissão continuada na comunidade e da seleção biológica de cepas bacterianas multirresistentes (TB-MDR). Por esse motivo, o Ministério da Saúde do Brasil adotou a <strong>Estratégia DOTS (<em>Directly Observed Treatment Short-Course</em>)</strong> como política pública prioritária e universal na Atenção Primária à Saúde:</p>
<ul>
  <li><strong>Cinco Pilares Fundamentais da Estratégia DOTS:</strong>
    <ol>
      <li>Compromisso político e governamental sustentado para financiar o controle da endemia;</li>
      <li>Detecção ativa e oportuna de casos por baciloscopia e Teste Rápido Molecular (TRM-TB) no sintomático respiratório em todas as Unidades Básicas de Saúde (UBS);</li>
      <li>Tratamento padronizado de curta duração com medicamentos de formulação de dose fixa combinada (4 em 1) com supervisão direta de deglutição;</li>
      <li>Suprimento regular, ininterrupto e gratuito de todos os fármacos antituberculose pelo Ministério da Saúde;</li>
      <li>Sistema de informação e vigilância epidemiológica unificado e padronizado (SINAN e Sistema de Controle de Tratamentos da TB - IL-TB/SITE-TB).</li>
    </ol>
  </li>
  <li><strong>Operacionalização do TDO na Equipe de Saúde da Família (eSF):</strong>
    <ul>
      <li><strong>Definição Operacional de Deglutição Supervisionada:</strong> O profissional de saúde devidamente capacitado (enfermeiro, técnico de enfermagem, farmacêutico ou <strong>Agente Comunitário de Saúde - ACS</strong> sob supervisão técnica) observa fisicamente o paciente engolir a medicação.</li>
      <li><strong>Frequência Mínima Exigida pelo PNCT/MS:</strong> O TDO deve ser realizado em no mínimo <strong>3 dias úteis por semana na Fase de Ataque (1º e 2º meses)</strong> e em no mínimo <strong>2 dias por semana na Fase de Manutenção (3º ao 6º mês)</strong>. Nos dias não supervisionados presencialmente (finais de semana e feriados), as doses são autoadministradas pelo paciente.</li>
      <li><strong>Locais Flexíveis de Execução:</strong> A supervisão pode ser realizada na UBS, no domicílio do paciente (durante visita do ACS), no local de trabalho do paciente, em albergues municipais, consultórios na rua ou em unidades prisionais, adaptando-se à realidade social de cada indivíduo.</li>
      <li><strong>Medidas de Incentivo e Proteção Social:</strong> Oferta de incentivos como fornecimento gratuito de vale-transporte para comparecimento à UBS, distribuição de cestas nutricionais básicas e inserção prioritária em programas de transferência de renda social (Bolsa Família), medidas que comprovadamente reduzem a taxa de evasão e abandono para patamares inferiores a 5%.</li>
      <li><strong>Metas Nacionais do PNCT para Eliminação da Tuberculose:</strong> Taxa de cura superior a <strong>85%</strong> de todos os casos notificados; taxa de abandono do tratamento inferior a <strong>5%</strong>; e oferta de testagem sorológica para o HIV para <strong>100%</strong> dos pacientes diagnosticados com tuberculose ativa.</li>
    </ul>
  </li>
</ul>

<h3>Coinfecção TB-HIV, Momento de Introdução da TARV e Síndrome Inflamatória de Reconstituição Imune (SIRI)</h3>
<p>A coinfecção pelo Vírus da Imunodeficiência Humana (HIV) e <em>M. tuberculosis</em> representa um dos maiores desafios da infectologia contemporânea. O HIV acelera drasticamente a progressão da infecção latente para a doença ativa, enquanto a tuberculose atua como potente cofator de replicação viral e elevação da carga plasmática de RNA do HIV:</p>
<ul>
  <li><strong>Momento de Introdução da Terapia Antirretroviral (TARV) Pós-Início do RIPE:</strong>
    <ul>
      <li><strong>Regra Áurea Universal:</strong> O tratamento da tuberculose é <strong>SEMPRE iniciado primeiro</strong>. O início imediato e simultâneo do RIPE e da TARV no mesmo dia nunca é recomendado, pois impossibilita discriminar reações adversas medicamentosas precoces e potencializa a toxicidade hepática.</li>
      <li><strong>Pacientes com Linfócitos T CD4 &lt; 50 células/mm³:</strong> <strong>Iniciar a TARV precocemente, idealmente dentro das primeiras 2 semanas</strong> após o início do RIPE. Ensaios clínicos globais demonstraram que o atraso na TARV nesse grupo com imunossupressão profunda duplica a mortalidade por infecções oportunistas graves.</li>
      <li><strong>Pacientes com Linfócitos T CD4 &ge; 50 células/mm³:</strong> Iniciar a TARV entre a <strong>2ª e a 8ª semana</strong> após o início do RIPE, garantindo tolerabilidade ao esquema antituberculose antes de introduzir os antirretrovirais.</li>
      <li><strong>Exceção Absoluta de Prova — Meningite Tuberculosa e TB do SNC:</strong> Em pacientes coinfectados com acometimento do sistema nervoso central (meningoencefalite tuberculosa ou tuberculoma cerebral), a introdução precoce da TARV desencadeia reação inflamatória maciça intracraniana por reconstituição imune com edema cerebral descontrolado, hipertensão intracraniana e herniação fatal. <strong>Na TB meníngea, a TARV deve ser POSTERGADA para após a 4ª a 8ª semana</strong> de tratamento do RIPE e corticoterapia, independentemente do valor da contagem de CD4!</li>
    </ul>
  </li>
  <li><strong>Interações Farmacocinéticas entre a Rifampicina e Antirretrovirais:</strong>
    <ul>
      <li>A <strong>Rifampicina é um dos mais potentes indutores biológicos da enzima hepática citocromo CYP3A4 e da bomba de efluxo P-glicoproteína (P-gp)</strong>. Sua administração concomitante reduz em até 50% a 90% a concentração plasmática de múltiplos fármacos antirretrovirais, exigindo intervenções farmacológicas obrigatórias:
        <ol>
          <li><strong>Dolutegravir (DTG):</strong> Componente do esquema de primeira linha no SUS. A rifampicina induz a glicuronidação do DTG mediada por UGT1A1 e CYP3A4, reduzindo sua área sob a curva plasmática em cerca de 54%. <strong>A conduta mandatória oficial do Ministério da Saúde é DOBRAR A DOSE DE DOLUTEGRAVIR PARA 50 MG DE 12/12 HORAS</strong> (em vez da dose usual de 50 mg 1x ao dia). Essa dosagem dobrada deve ser mantida durante todo o tempo de uso da rifampicina e continuada por <strong>mais 14 dias após a suspensão da rifampicina</strong> (tempo necessário para o restabelecimento dos níveis basais das enzimas microssomais induzidas).</li>
          <li><strong>Inibidores de Protease com Ritonavir (IP/r - Atazanavir/r, Darunavir/r):</strong> A associação de Rifampicina com qualquer IP/r é <strong>formalmente contraindicada</strong> devido à redução de até 90% dos níveis séricos dos inibidores de protease com falência virológica e hepatotoxicidade gravíssima. Se o paciente coinfectado necessitar obrigatoriamente de IP/r, a Rifampicina deve ser substituída por <strong>Rifabutina na dose de 150 mg/dia ou 150 mg 3x/semana</strong>, pois a rifabutina possui potência indutora enzimática dez vezes menor que a rifampicina.</li>
          <li><strong>Efavirenz (EFV):</strong> Pode ser associado com segurança à Rifampicina na dose padrão de 600 mg/dia em adultos com peso corporal até 60 kg (e 800 mg se &gt; 60 kg, segundo algumas diretrizes internacionais).</li>
        </ol>
      </li>
    </ul>
  </li>
  <li><strong>Síndrome Inflamatória de Reconstituição Imune (SIRI / IRIS):</strong>
    <ul>
      <li><strong>Fisiopatologia e Classificação:</strong> Trata-se de uma resposta inflamatória hiperreativa e desregulada contra antígenos do <em>M. tuberculosis</em> (vivos ou restos bacilares mortos) após a recuperação quantitativa e qualitativa das células T mediada pela TARV. Apresenta-se em duas formas:
        <ul>
          <li><strong>SIRI Paradoxal:</strong> Paciente já diagnosticado e em tratamento prévio com RIPE que, semanas após o início da TARV, apresenta piora abrupta dos sintomas ou ressurgimento de febre, adenomegalias volumosas que ulceram, aumento de consolidações pulmonares ou piora de derrame pleural.</li>
          <li><strong>SIRI Desmascarada:</strong> Paciente com tuberculose subclínica oculta não diagnosticada que desenvolve quadro inflamatório hiperagudo e exuberante de tuberculose dias a semanas após o início da TARV.</li>
        </ul>
      </li>
      <li><strong>Fatores de Risco Principais:</strong> Contagem basal de CD4 muito baixa (&lt; 50 células/mm³), carga viral plasmática inicial elevada de HIV, início precoce da TARV e resposta imunológica vigorosa com queda rápida da carga viral.</li>
      <li><strong>Conduta Terapêutica Baseada em Diretrizes:</strong>
        <ol>
          <li>Excluir falência terapêutica por resistência bacilar adquirida (repetir TRM-TB e cultura) e afastar outras infecções oportunistas concomitantes (criptococose, citomegalovirose, micobacteriose atípica);</li>
          <li><strong>NUNCA SUSPENDER O ESQUEMA RIPE NEM A TARV!</strong> Ambos os tratamentos devem ser rigorosamente continuados;</li>
          <li><strong>Terapia Anti-inflamatória:</strong> Em casos leves, prescrever analgésicos e Anti-inflamatórios Não Esteroidais (AINEs). Em casos moderados a graves (febre persistente debilitante, insuficiência respiratória ou compressão de vias aéreas por linfonodos gigantes), indicar <strong>Corticoterapia Sistêmica com Prednisona oral na dose de 1,0 a 1,5 mg/kg/dia por 2 a 4 semanas</strong>, seguida de desmame gradual ao longo de 4 a 6 semanas.</li>
        </ol>
      </li>
    </ul>
  </li>
</ul>
`;

// ============================================================================
// SEÇÃO 3 TB: 4 CASOS CLÍNICOS AVANÇADOS COM DISCUSSÃO MINUCIOSA
// ============================================================================
const secTB_Casos_Clinicos = `
<h3>Caso Clínico 1: Hepatite Tóxica por RIPE em Paciente Hepatopata e Algoritmo de Reintrodução</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente do sexo masculino, 51 anos, pedreiro, portador de cirrose hepática compensada (Child-Pugh A, escore 5 pontos) decorrente de infecção prévia curada pelo vírus da Hepatite C e consumo moderado de etanol há 4 anos. Iniciou tratamento para tuberculose pulmonar bacilífera (TRM-TB positivo com sensibilidade preservada à rifampicina) com o esquema básico de dose fixa combinada RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) há exatos 22 dias. Comparece à UBS queixando-se de astenia intensa, anorexia absoluta, náuseas incoercíveis, dor em peso no hipocôndrio direito e urina escura ('cor de refrigerante de cola') há 3 dias. Nega febre recente ou hematêmese.</p>
<p><strong>Exame Físico na Consulta:</strong> Paciente emagrecido, vigil, orientado no tempo e no espaço, sem asterixis ou sinais de encefalopatia hepática. Icterícia escleral e cutânea moderada a intensa (+++/4+). Sinais vitais: FC 84 bpm, PA 118/74 mmHg, afebril (tax 36,6°C). Abdome flácido, fígado doloroso à palpação, palpável a 2 cm do rebordo costal direito com consistência fibroelástica; espaço de Traube ocupado sem esplenomegalia grosseira; sem ascite detectável ao exame físico.</p>
<p><strong>Resultados Laboratoriais Urgentes:</strong></p>
<ul>
  <li>TGO / AST: <strong>390 U/L</strong> (valor de referência: até 35 U/L — elevação de 11 vezes o LSN);</li>
  <li>TGP / ALT: <strong>425 U/L</strong> (valor de referência: até 35 U/L — elevação de 12 vezes o LSN);</li>
  <li>Bilirrubina Total: <strong>4,8 mg/dL</strong> (Bilirrubina Direta: 4,0 mg/dL; Indireta: 0,8 mg/dL);</li>
  <li>Fosfatase Alcalina: 180 U/L (VR: até 120 U/L); Gama-GT: 145 U/L (VR: até 50 U/L);</li>
  <li>Coagulograma: Tempo de Protrombina com INR = 1,15 (função sintética preservada); Plaquetas: 140.000/mm³;</li>
  <li>Sorologias Virais Agudas: Anti-HAV IgM não reagente; HBsAg não reagente e Anti-HBc IgM não reagente; Carga Viral de HCV indetectável.</li>
</ul>
<p><strong>Discussão Propedêutica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Diagnóstico de Hepatite Induzida por Drogas (DILI):</strong> O paciente preenche critérios formais e inequívocos de hepatotoxicidade grave pelo esquema RIPE: presença de sintomas clássicos (anorexia, náuseas, dor hepática, icterícia) associados a transaminases superiores a 3 vezes o LSN (estão acima de 11x o LSN) e bilirrubina total &gt; 2,0 mg/dL (4,8 mg/dL).</li>
  <li><strong>Suspensão Terapêutica Imediata e Conduta Aguda:</strong>
    <ul>
      <li><strong>Interrupção imediata de todos os fármacos do esquema RIPE.</strong></li>
      <li>Como o paciente apresenta cirrose subjacente mas encontra-se clinicamente estável, afebril, com hemograma estável e função de coagulação preservada (INR 1,15), não há necessidade imperativa de introduzir o esquema provisório SEL de resgate, adotando-se observação ambulatorial estrita na UBS/Ambulatório de Tisiologia com dosagem de transaminases e bilirrubinas a cada 48 a 72 horas.</li>
    </ul>
  </li>
  <li><strong>Critério para Reinício da Terapia Antituberculosa:</strong> A reintrodução escalonada dos medicamentos somente poderá ter início quando os sintomas digestivos e a icterícia desaparecerem completamente e as <strong>transaminases séricas regredirem para valores estritamente inferiores a 2 vezes o limite superior da normalidade (TGO e TGP &lt; 70 U/L)</strong> e bilirrubina total &lt; 1,5 mg/dL.</li>
  <li><strong>Aplicação Prática do Protocolo de Reintrodução do Ministério da Saúde:</strong>
    <ul>
      <li>No 14º dia pós-suspensão, os exames evidenciam TGO = 52 U/L, TGP = 58 U/L e BT = 1,2 mg/dL. Inicia-se a reintrodução sequencial:
        <ol>
          <li><strong>Etapa 1:</strong> Iniciar <strong>Etambutol (15 mg/kg/dia) + Rifampicina (10 mg/kg/dia)</strong> em doses plenas. Aguardar 3 a 7 dias com coleta seriada de TGO/TGP. As enzimas permanecem estáveis (TGO 48 U/L, TGP 54 U/L).</li>
          <li><strong>Etapa 2:</strong> Adicionar <strong>Isoniazida (5 a 10 mg/kg/dia)</strong> associada a Piridoxina 50 mg/dia. Monitorar enzimas após 5 dias. As transaminases mantêm-se em 50 U/L e 56 U/L, demonstrando excelente tolerabilidade hepatocelular.</li>
          <li><strong>Etapa 3 (Decisão Crítica):</strong> Como o paciente apresentou episódio prévio grave com icterícia e cirrose hepática basal, <strong>A PIRAZINAMIDA NÃO SERÁ REINTRODUZIDA</strong>, sendo suspensa em caráter definitivo devido ao alto risco de recidiva fulminante.</li>
        </ol>
      </li>
    </ul>
  </li>
  <li><strong>Esquema Final e Duração Estendida:</strong> O paciente completará o tratamento com o regime <strong>Rifampicina + Isoniazida + Etambutol (RHE) por um período total de 9 meses</strong> (2 meses de RHE na fase de ataque seguidos de 7 meses de RH na fase de manutenção: <strong>2 RHE / 7 RH</strong>).</li>
</ol>

<h3>Caso Clínico 2: Coinfecção TB-HIV com CD4 Baixo, Timing da TARV, DTG Dobrado e Manejo da SIRI</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente feminina, 29 anos, solteira, procura o Serviço de Atenção Especializada (SAE) com história de tosse produtiva há 6 semanas, febre vespertina diária com sudorese noturna profusa e emagrecimento de 9 kg no período (cerca de 16% do peso corporal). Realizou teste rápido para HIV na triagem, com resultado reagente confirmado por imunoblot. O Teste Rápido Molecular para Tuberculose (TRM-TB) no escarro foi positivo com detecção de <em>M. tuberculosis</em> em alta carga bacilar e sem resistência à rifampicina.</p>
<p><strong>Exames Complementares Iniciais:</strong></p>
<ul>
  <li>Contagem de Linfócitos T CD4: <strong>26 células/mm³</strong> (imunodepressão grave); Carga Viral do HIV-1: <strong>580.000 cópias/mL</strong>;</li>
  <li>Hemograma: Leucócitos 3.400/mm³ (linfopenia severa: 374 linfócitos/mm³), Hemoglobina 9,4 g/dL, Plaquetas 210.000/mm³;</li>
  <li>Função renal e hepática: Creatinina 0,7 mg/dL; TGO 28 U/L, TGP 26 U/L, Bilirrubinas normais;</li>
  <li>Radiografia de Tórax: Infiltrado interstício-alveolar heterogêneo bilateral em lobos superiores e médios, sem cavitações óbvias de paredes espessas (padrão radiológico atípico comum em pacientes com CD4 &lt; 200).</li>
</ul>
<p><strong>Discussão Propedêutica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Início Imediato do Tratamento da Tuberculose:</strong> A paciente inicia imediatamente o esquema <strong>RIPE em dose fixa combinada (4 comprimidos ao dia pela manhã em jejum)</strong>. Nunca se deve iniciar a TARV no mesmo dia do RIPE.</li>
  <li><strong>Definição do Momento Exato de Introdução da TARV:</strong> Como a paciente apresenta contagem de linfócitos T CD4 &lt; 50 células/mm³ (CD4 = 26), as diretrizes do Ministério da Saúde e da OMS determinam que a TARV deve ser iniciada <strong>precocemente, idealmente dentro das primeiras 2 semanas</strong> de tratamento da tuberculose (no 8º ao 14º dia de RIPE), pois o adiamento da TARV para além de 15 a 30 dias eleva a mortalidade geral por outras infecções oportunistas em mais de 30% a 50%.</li>
  <li><strong>Escolha do Esquema Antirretroviral e Ajuste de Dose Obrigatório por Interação:</strong>
    <ul>
      <li>Esquema de primeira linha preconizado: <strong>Tenofovir (TDF) + Lamivudina (3TC) + Dolutegravir (DTG)</strong>.</li>
      <li><strong>Ajuste Crítico de Prova:</strong> A Rifampicina é um potente indutor do CYP3A4 e da UGT1A1, reduzindo a concentração sérica do Dolutegravir para níveis subterapêuticos. Para contornar essa interação, é <strong>mandatório dobrar a dose de Dolutegravir para 50 mg de 12/12 horas</strong> (prescrever 1 comprimido de TDF/3TC 300/300 mg 1x ao dia associado a Dolutegravir 50 mg tomado de 12 em 12 horas).</li>
      <li>Essa posologia dobrada de Dolutegravir deve ser mantida durante todos os 6 meses de uso da Rifampicina e prolongada por <strong>mais 14 dias após a conclusão do tratamento da tuberculose</strong>, voltando então para DTG 50 mg uma vez ao dia.</li>
    </ul>
  </li>
  <li><strong>Intercorrência Clínica na 4ª Semana de Tratamento (Diagnóstico e Manejo de SIRI):</strong>
    <ul>
      <li>Após 20 dias de uso da TARV (e 32 dias de RIPE), a paciente retorna com queixa de febre alta recorrente (39°C), tosse e surgimento de linfonodos cervicais gigantes dolorosos bilaterais com hiperemia cutânea. A nova radiografia de tórax evidencia aumento das consolidações pulmonares. Carga viral do HIV caiu para 1.200 cópias/mL e o CD4 subiu para 148 células/mm³.</li>
      <li><strong>Diagnóstico: Síndrome Inflamatória de Reconstituição Imune (SIRI Paradoxal).</strong> Decorre da recuperação vigorosa da imunidade celular contra antígenos micobacterianos.</li>
      <li><strong>Conduta Mandatória:</strong> Não interromper a TARV e não interromper o RIPE! Como a paciente apresenta sintomas sistêmicos exuberantes com risco de sofrimento respiratório, prescrever <strong>Prednisona oral na dose de 1 mg/kg/dia (50 mg/dia) por 2 a 4 semanas</strong>, seguida de redução gradual e desmame progressivo ao longo de 4 semanas, com resolução completa dos sintomas.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 3: Pleurite Tuberculosa em Adulto Jovem e Critérios Diagnósticos do Líquido Pleural</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente masculino, 24 anos, estudante universitário hígido, procura atendimento ambulatorial com história de dor torácica contínua em pontada no hemitórax esquerdo há 14 dias, de início insidioso, que piora acentuadamente com a inspiração profunda e tosse seca ('dor pleurítica'). Relata sensação de febrícula vespertina diária não aferida, sudorese noturna e perda de cerca de 3 kg nas últimas semanas. Nega dispneia em repouso, expectoração, hemoptise, viagens recentes ou tabagismo.</p>
<p><strong>Exame Físico na Consulta:</strong> Bom estado geral, corado, hidratado, eupneico em repouso (FR 18 irpm, SpO2 97% em ar ambiente). Temperatura axilar 37,8°C. Aparelho respiratório: expansibilidade torácica diminuída em base esquerda; frêmito tóraco-vocal (FTV) abolido no terço inferior do hemitórax esquerdo; macicez franca à percussão desde o 6º espaço intercostal até a base pulmonar esquerda; murmúrio vesicular abolido na mesma topografia. Aparelho cardiovascular sem anormalidades. Abdome indolor, sem visceromegalias.</p>
<p><strong>Propedêutica Armada e Toracocentese Diagnóstica:</strong></p>
<ul>
  <li>Radiografia de Tórax: Derrame pleural homogêneo unilateral à esquerda de moderado volume, com presença da clássica parábola de Damoiseau e apagamento completo dos recessos costofrênico e cardiofrênico esquerdos. O parênquima pulmonar direito e o lobo superior esquerdo encontram-se livres de infiltrados óbvios;</li>
  <li>Toracocentese Diagnóstica no 7º espaço intercostal esquerdo: Retirada de 50 mL de líquido pleural de coloração amarelo-citrina límpida;</li>
  <li>Análise Bioquímica do Líquido Pleural:
    <ul>
      <li>Proteínas Totais no líquido pleural: <strong>5,1 g/dL</strong> (Proteínas séricas: 7,2 g/dL &rarr; relação líquido/soro = <strong>0,71</strong>);</li>
      <li>DHL no líquido pleural: <strong>780 U/L</strong> (DHL sérico: 320 U/L com LSN do soro de 240 &rarr; relação DHL líquido/soro = <strong>2,43</strong>; DHL do líquido &gt; 2/3 do LSN sérico);</li>
      <li>Glicose no líquido pleural: <strong>74 mg/dL</strong> (glicemia de jejum: 88 mg/dL); pH pleural: 7,34;</li>
    </ul>
  </li>
  <li>Citometria e Citologia Oncótica: Celularidade global de 2.800 leucócitos/mm³, com <strong>92% de linfócitos</strong>, 6% de monócitos e apenas 2% de neutrófilos; <strong>Células mesoteliais ausentes (&lt; 1%)</strong>; citologia oncótica negativa para malignidade;</li>
  <li>Bioquímica Especializada: <strong>Adenosina Desaminase (ADA) = 76 U/L</strong> (valor de referência: &lt; 40 U/L);</li>
  <li>Baciloscopia do líquido (Ziehl-Neelsen) e TRM-TB no líquido pleural: Negativos.</li>
</ul>
<p><strong>Discussão Propedêutica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Classificação do Líquido Pleural:</strong> O líquido preenche os três critérios de Light (relação proteína pleural/sérica &gt; 0,5 e relação DHL pleural/sérica &gt; 0,6), configurando inequivocamente um <strong>exsudato inflamatório</strong>.</li>
  <li><strong>Perfil Citológico e Bioquímico Típico da Pleurite Tuberculosa:</strong> A combinação de <strong>exsudato de predomínio linfocítico (&gt; 80%)</strong>, <strong>escassez marcante de células mesoteliais (&lt; 5%)</strong> e <strong>nível de ADA significativamente elevado (&gt; 40 U/L)</strong> em paciente jovem com quadro subagudo e epidemiologia brasileira possui uma sensibilidade superior a 92% e um valor preditivo positivo superior a 95% para Tuberculose Pleural. A ausência de células mesoteliais decorre da intensa deposição de fibrina na superfície da pleura parietal e visceral mediada pela resposta imune Th1, impedindo a descamação dos mesoteliócitos para o líquido.</li>
  <li><strong>Necessidade de Biópsia Pleural:</strong> Em contextos epidemiológicos de alta prevalência como o Brasil, a presença de exsudato linfocítico com ADA &gt; 40 U/L em adulto jovem autoriza o <strong>início imediato do tratamento com RIPE sem necessidade mandatória de biópsia pleural com agulha de Cope</strong>. A biópsia pleural fica indicada prioritariamente em idosos, em pacientes imunodeprimidos ou quando houver dúvida diagnóstica com neoplasias malignas pleurais (mesotelioma, metástases de adenocarcinoma) ou empiema inicial.</li>
  <li><strong>Esquema Terapêutico e Duração:</strong> O tratamento preconizado pelo Ministério da Saúde é o <strong>esquema básico RIPE por 6 meses</strong> (2 meses de Rifampicina, Isoniazida, Pirazinamida e Etambutol seguidos de 4 meses de Rifampicina e Isoniazida: <strong>2 RIPE / 4 RI</strong>). O uso de corticoterapia de rotina não confere benefício na prevenção de espessamento pleural residual, sendo reservado apenas para derrames maciços com dor incapacitante ou repercussão ventilatória severa.</li>
</ol>

<h3>Caso Clínico 4: Manejo de ILTB com 3HP em Paciente Candidato a Terapia Biológica Anti-TNF</h3>
<p><strong>História Clínica e Admissão:</strong> Paciente feminina, 46 anos, bancária, portadora de Artrite Psoriásica refratária ao uso de Metotrexato oral em dose máxima há 6 meses. O reumatologista assistente programa o início de terapia imunobiológica com Adalimumabe (anticorpo monoclonal anti-TNF-$\alpha$). Antes da prescrição do imunobiológico, a paciente é encaminhada para rastreamento obrigatório de Infecção Latente da Tuberculose (ILTB). A paciente encontra-se assintomática respiratória, nega tosse, expectoração, febre ou emagrecimento nos últimos 12 meses. Nega contato conhecido com indivíduos com tuberculose ativa.</p>
<p><strong>Investigação Diagnóstica Pré-Biológico:</strong></p>
<ul>
  <li>Radiografia de Tórax em PA e Perfil: Campos pleuropulmonares límpidos, sem infiltrados parenquimatosos, sem adenomegalias mediastinais e sem lesões fibróticas ou calcificações residuais ativas;</li>
  <li>Prova Tuberculínica (PT / PPD RT-23): Leitura realizada após 72 horas por profissional capacitado demonstra <strong>enduração palpável com diâmetro transverso de 14 mm</strong> (Reator Forte);</li>
  <li>Enzimas hepáticas basais: TGO 22 U/L, TGP 18 U/L; Creatinina 0,8 mg/dL; Sorologia para HIV negativa.</li>
</ul>
<p><strong>Discussão Propedêutica e Conduta Terapêutica Passo a Passo:</strong></p>
<ol>
  <li><strong>Indicação de Tratamento da ILTB:</strong> Em candidatos ao uso de agentes imunobiológicos anti-TNF-$\alpha$, qualquer indivíduo com <strong>PPD &ge; 5 mm</strong> (ou teste IGRA positivo) e radiografia de tórax normal sem evidência de tuberculose ativa tem <strong>indicação formal e mandatória de tratamento da ILTB</strong>. O TNF-$\alpha$ desempenha papel essencial na manutenção da arquitetura do granuloma tuberculoide e na contenção dos bacilos latentes; a inibição farmacológica do TNF com adalimumabe dissolve a barreira fibrosa e caseosa do granuloma, elevando o risco de reativação da tuberculose em mais de 20 a 40 vezes, frequentemente sob apresentações miliares e meníngeas letais.</li>
  <li><strong>Seleção do Esquema Profilático de Escolha (Diretrizes MS):</strong>
    <ul>
      <li>O Ministério da Saúde preconiza como primeira escolha o <strong>Esquema 3HP (Rifapentina + Isoniazida semanal por 12 semanas)</strong>.</li>
      <li><strong>Posologia:</strong> Rifapentina 900 mg (três comprimidos de 300 mg) associada a Isoniazida 900 mg (três comprimidos de 300 mg), administrados em dose única semanal, preferencialmente sob Tratamento Diretamente Observado (TDO) ou autoadministrado assistido, totalizando exatamente <strong>12 doses semanais em 3 meses</strong>.</li>
      <li><strong>Vantagens da Escolha do 3HP:</strong> Em comparação à isoniazida isolada por 9 meses (270 doses diárias), o esquema 3HP apresenta <strong>taxa de conclusão superior a 88%</strong>, eficácia equivalente e <strong>incidência de hepatite tóxica clinicamente relevante significativamente menor</strong> (cerca de 0,5% a 1% contra mais de 3% a 5% com isoniazida diária por 9 meses).</li>
    </ul>
  </li>
  <li><strong>Momento Seguro para Início da Terapia Biológica Anti-TNF:</strong>
    <ul>
      <li>Para a segurança da paciente, as diretrizes da Sociedade Brasileira de Reumatologia (SBR) e do Ministério da Saúde determinam que o agente anti-TNF (Adalimumabe) <strong>só poderá ser introduzido após, no mínimo, 30 dias (1 mês completo = 4 a 5 doses semanais) de adesão documentada ao tratamento da ILTB</strong>, desde que a paciente permaneça clinicamente estável e assintomática. O tratamento da ILTB deve prosseguir semanalmente até a conclusão total das 12 doses previstas.</li>
    </ul>
  </li>
</ol>
`;

// ============================================================================
// SEÇÃO 4 TB: 6 QUESTÕES DE PROVA COM GABARITO E DISTRATORES DETALHADOS
// ============================================================================
const secTB_Questoes_Residencia = `
<h3>Questão 1 (USP-SP / Residência Médica de Acesso Direto)</h3>
<p>Um homem de 48 anos, em tratamento regular para tuberculose pulmonar bacilífera com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) há 25 dias, comparece ao ambulatório queixando-se de fraqueza, náuseas e colúria há 2 dias. Ao exame físico, encontra-se vigil, afebril, com icterícia visível em escleras e mucosas (++/4+), sem estigmas periféricos de insuficiência hepática aguda. Os exames laboratoriais colhidos na admissão revelam: TGO = 290 U/L (LSN = 35 U/L), TGP = 340 U/L (LSN = 35 U/L), Bilirrubina Total = 3,8 mg/dL (Bilirrubina Direta = 3,1 mg/dL), INR = 1,1. De acordo com o Manual de Recomendações para o Controle da Tuberculose no Brasil (Ministério da Saúde), qual é a conduta médica correta e imediata?</p>
<p>A) Manter o esquema RIPE em doses reduzidas pela metade e reavaliar com novas provas de função hepática em 7 dias.<br>
B) Suspender apenas a Pirazinamida e a Isoniazida, mantendo o uso diário da Rifampicina e do Etambutol associados a hepatoprotetores.<br>
C) Suspender imediatamente todos os fármacos do esquema RIPE, monitorar as provas de função hepática até que os níveis de transaminases caiam para valores inferiores a 2 vezes o LSN e, após normalização, iniciar a reintrodução escalonada começando por Etambutol e Rifampicina.<br>
D) Iniciar imediatamente esquema empírico definitivo com Bedaquilina, Delamanida e Moxifloxacino por 18 meses, classificando o paciente como portador de falência terapêutica grave.<br>
E) Substituir imediatamente todo o esquema por Monoterapia com Estreptomicina intramuscular diária por 6 meses, dispensando a realização de exames laboratoriais adicionais.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa C está CORRETA:</strong> O paciente preenche os critérios formais para o diagnóstico de <strong>hepatite induzida por drogas (DILI) secundária ao RIPE</strong>: elevação de transaminases &ge; 3 vezes o LSN acompanhada de sintomas clínicos e icterícia (Bilirrubina Total &ge; 2,0 mg/dL). A conduta oficial padronizada pelo Ministério da Saúde consiste em: <strong>suspender imediatamente todas as 4 drogas do esquema RIPE</strong>; monitorar clinicamente e laboratorialmente o paciente até a resolução dos sintomas e o retorno das transaminases para valores inferiores a duas vezes o LSN (&lt; 2x LSN); e proceder à <strong>reintrodução escalonada</strong> dos fármacos iniciando com as drogas de menor potencial hepatotóxico (Etambutol + Rifampicina, seguidos de Isoniazida e exclusão da Pirazinamida se o episódio tiver sido grave).</li>
    <li><strong>Alternativa A está INCORRETA:</strong> Manter as medicações hepatotóxicas em doses reduzidas durante uma vigência de hepatite aguda franca eleva drasticamente o risco de hepatite fulminante com necrose maciça, encefalopatia e óbito.</li>
    <li><strong>Alternativa B está INCORRETA:</strong> Todas as medicações devem ser suspensas em conjunto inicialmente. Não se deve adivinhar qual fármaco causou a lesão mantendo a rifampicina no momento agudo, visto que a rifampicina também pode contribuir para a colestase e potencializar a hepatotoxicidade.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> O quadro trata-se de reação adversa hepática tóxica comum e tratável, e não de falência bacteriológica ou multirresistência por mutação genética (TB-MDR), não havendo qualquer indicação de esquemas de segunda linha com bedaquilina ou delamanida.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A estreptomicina não pode ser usada em monoterapia para tratar tuberculose devido à indução rápida de resistência bacteriana secundária, além de exigir monitorização renal e auditiva estrita.</li>
  </ul>
</div>

<h3>Questão 2 (ENARE / Exame Nacional de Residência)</h3>
<p>Homem de 34 anos, recém-diagnosticado com infecção pelo HIV durante investigação de tosse produtiva e perda ponderal, apresenta diagnóstico confirmado de Tuberculose Pulmonar Bacilífera pelo TRM-TB (sem resistência à rifampicina detectada). A contagem inicial de linfócitos T CD4 revelou 24 células/mm³ e a carga viral do HIV foi de 380.000 cópias/mL. O médico assistente prescreveu o esquema RIPE no primeiro dia de atendimento. Considerando os protocolos vigentes do Ministério da Saúde do Brasil para o manejo da coinfecção TB-HIV, qual é a orientação precisa sobre o início da Terapia Antirretroviral (TARV) e a escolha farmacológica com ajuste posológico?</p>
<p>A) A TARV deve ser iniciada precocemente, idealmente dentro das primeiras 2 semanas após o início do RIPE; o esquema de primeira linha com Tenofovir + Lamivudina + Dolutegravir exige que a dose de Dolutegravir seja DOBRADA para 50 mg de 12/12 horas.<br>
B) A TARV deve ser iniciada imediatamente no mesmo dia do início do RIPE utilizando Atazanavir potencializado por Ritonavir em dose habitual, sem ajustes.<br>
C) A TARV deve ser obrigatoriamente postergada para após a conclusão dos 6 meses do esquema RIPE para evitar a síndrome de reconstituição imune.<br>
D) A TARV deve ser iniciada na 8ª semana após o início do RIPE, substituindo-se a Rifampicina por Rifapentina e reduzindo-se a dose do Dolutegravir pela metade.<br>
E) A TARV deve ser iniciada com Efavirenz em dose de 200 mg/dia, mantendo-se a Rifampicina somente nos primeiros 15 dias de tratamento.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa A está CORRETA:</strong> Em pacientes coinfectados com <strong>contagem de linfócitos T CD4 &lt; 50 células/mm³</strong>, as evidências clínicas demonstram que a TARV deve ser introduzida <strong>precocemente, idealmente dentro das primeiras 2 semanas</strong> de tratamento da tuberculose (e não no mesmo dia da primeira dose do RIPE), resultando em redução substancial da mortalidade geral. Como a Rifampicina é um potente indutor do citocromo CYP3A4 e da UGT1A1, ela acelera a metabolização do Dolutegravir, exigindo a <strong>duplicação da dose de Dolutegravir para 50 mg de 12/12 horas</strong> (em vez de 50 mg 1x ao dia) durante todo o uso concomitante da rifampicina e por até 14 dias após sua suspensão.</li>
    <li><strong>Alternativa B está INCORRETA:</strong> Nunca se inicia a TARV no mesmo dia do RIPE, e a associação de Rifampicina com inibidores de protease potencializados por ritonavir (como o Atazanavir/r) é expressamente contraindicada devido à redução dramática dos níveis séricos do antirretroviral e alto risco de hepatotoxicidade.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> Postergar a TARV por 6 meses em paciente com CD4 de 24 células/mm³ resulta em taxas inaceitáveis de óbito por outras infecções oportunistas graves (como pneumocistose, neurocriptococose e CMV).</li>
    <li><strong>Alternativa D está INCORRETA:</strong> Não se deve aguardar 8 semanas quando o CD4 é &lt; 50 células/mm³, e reduzir a dose do dolutegravir causaria falência virológica imediata por níveis subterapêuticos.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A dose padrão de Efavirenz para adultos é de 600 mg/dia e não 200 mg/dia; ademais, a rifampicina deve ser utilizada por todos os 6 meses do esquema tuberculostático.</li>
  </ul>
</div>

<h3>Questão 3 (SURCE / Residência Médica do Ceará)</h3>
<p>Uma jovem de 21 anos comparece ao ambulatório de pneumologia com queixa de tosse seca, febre baixa vespertina e dor em pontada no hemitórax direito ventilatório-dependente há 3 semanas. A radiografia de tórax evidencia derrame pleural moderado à direita sem outras lesões parenquimatosas. Foi submetida à toracocentese diagnóstica, cuja análise do líquido pleural revelou: aspecto amarelo-citrino límpido; relação de proteínas pleural/sérica = 0,68; relação de DHL pleural/sérico = 2,1; celularidade total de 2.400 células/mm³, com 88% de linfócitos e ausência de células mesoteliais; dosagem de Adenosina Desaminase (ADA) = 68 U/L. Assinale a alternativa que apresenta a correta interpretação diagnóstica e a conduta recomendada segundo as diretrizes brasileiras:</p>
<p>A) O líquido é um transudato inflamatório; deve-se indicar biópsia pleural com agulha de Cope para excluir insuficiência cardíaca congestiva atípica.<br>
B) O líquido é um exsudato predominantemente neutrofílico sugestivo de empiema parapneumônico agudo; indicar drenagem pleural em selo d'água de urgência.<br>
C) Os achados confirmam com alta acurácia o diagnóstico de Tuberculose Pleural (exsudato linfocítico, escassez mesotelial e ADA &gt; 40 U/L); deve-se iniciar o esquema RIPE por 6 meses.<br>
D) A ausência de células mesoteliais exclui tuberculose pleural e aponta para mesotelioma maligno de pleura; indicar pleurodese química imediata.<br>
E) A presença de ADA elevada &eacute; patognomônica de lúpus eritematoso sistêmico com pleurite lúpica; iniciar pulsoterapia com metilprednisolona venosa.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa C está CORRETA:</strong> No contexto clínico e epidemiológico brasileiro, a tríade clássica no líquido pleural de <strong>exsudato de predomínio linfocítico (&gt; 75%-80%)</strong>, <strong>raridade ou ausência de células mesoteliais (&lt; 5%)</strong> e <strong>Adenosina Desaminase (ADA) &gt; 40 U/L</strong> em paciente jovem com quadro subagudo confere sensibilidade e especificidade superiores a 90% a 95% para o diagnóstico de <strong>Tuberculose Pleural</strong>. Essa caracterização autoriza o início imediato do esquema básico <strong>RIPE por 6 meses (2 RIPE / 4 RI)</strong> sem a exigência mandatória de confirmação histopatológica invasiva prévia.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> O líquido preenche com folga os critérios de Light para exsudato (relação de proteínas &gt; 0,5 e relação de DHL &gt; 0,6), descartando transudato cardíaco.</li>
    <li><strong>Alternativa B está INCORRETA:</strong> O líquido apresenta franco predomínio linfocítico (88% de linfócitos) e não neutrofílico, afastando o diagnóstico de derrame parapneumônico bacteriano complicado ou empiema.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A raridade de células mesoteliais é justamente uma das características marcantes da tuberculose pleural, decorrente do revestimento fibrinoso intenso da pleura inflamada que bloqueia a descamação dos mesoteliócitos.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A pleurite lúpica pode cursar com ADA discretamente elevada, mas é acompanhada de títulos elevados de anticorpos antinucleares (FAN), consumo de complemento sérico e outras manifestações reumatológicas sistêmicas, sendo a tuberculose dezenas de vezes mais frequente.</li>
  </ul>
</div>

<h3>Questão 4 (UNICAMP / FMUSP - Infectologia e Saúde Coletiva)</h3>
<p>Em relação às recomendações do Ministério da Saúde do Brasil sobre o rastreamento e tratamento da Infecção Latente da Tuberculose (ILTB), assinale a afirmativa plenamente CORRETA:</p>
<p>A) O ensaio de liberação de interferon-gama (IGRA) sofre forte interferência da vacina BCG prévia, resultando frequentemente em falsos-positivos se a vacina foi administrada no período neonatal.<br>
B) O esquema 3HP (Rifapentina associada à Isoniazida administradas em tomada única semanal durante 12 semanas) foi incorporado ao SUS como opção prioritária devido à alta adesão e menor taxa de hepatotoxicidade.<br>
C) A Prova Tuberculínica (PPD) é considerada reatora forte apenas quando a enduração transversa atinge no mínimo 15 mm em pessoas vivendo com HIV.<br>
D) A suplementação com Piridoxina (vitamina B6) é contraindicada durante o tratamento com isoniazida por bloquear a absorção entérica do antimicrobiano.<br>
E) A duração recomendada do esquema 4R (Rifampicina diária) para tratamento da ILTB é de 9 meses contínuos.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> O Ministério da Saúde incorporou o <strong>regime 3HP (Rifapentina + Isoniazida em dose semanal por 12 semanas = 12 doses sob TDO)</strong> como uma das opções preferenciais para o tratamento da ILTB. Em ensaios clínicos multicêntricos, o esquema 3HP demonstrou eficácia preventiva idêntica ao esquema tradicional de 9 meses de isoniazida, com taxas de conclusão e adesão significativamente mais elevadas (&gt; 85% a 90%) e incidência substancialmente menor de hepatotoxicidade medicamentosa.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> O teste IGRA utiliza antígenos recombinantes altamente específicos do <em>M. tuberculosis</em> (ESAT-6 e CFP-10) que não estão presentes no genoma da cepa vacinal BCG (<em>Mycobacterium bovis</em> atenuado). O IGRA, portanto, <strong>não sofre interferência da vacina BCG</strong>, constituindo essa uma de suas principais vantagens diagnósticas sobre o PPD.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> Em pessoas vivendo com HIV e em indivíduos sob uso de imunossupressores/anti-TNF, o ponto de corte do PPD para caracterizar positividade (reator) é de <strong>&ge; 5 mm</strong> de enduração, e não 15 mm.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> A suplementação com Piridoxina (25 a 50 mg/dia) é expressamente <em>indicada</em> em gestantes, etilistas crônicos, desnutridos e diabéticos em uso de isoniazida para prevenir o desenvolvimento de neuropatia periférica decorrente do bloqueio competitivo da piridoxina induzido pela isoniazida.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> O esquema 4R utiliza Rifampicina por <strong>4 meses</strong> (120 doses diárias), e não por 9 meses.</li>
  </ul>
</div>

<h3>Questão 5 (AMP / Associação Médica do Paraná - Ortopedia e Clínica Médica)</h3>
<p>Um homem de 56 anos apresenta lombalgia crônica de padrão inflamatório contínua há 4 meses, com irradiação para a face anterior da coxa direita, sudorese noturna e emagrecimento de 6 kg. A ressonância magnética da coluna evidencia destruição do disco intervertebral L3-L4 e erosão das porções anteriores dos corpos vertebrais adjacentes de L3 e L4, associada a volumosa coleção hipointensa em T1 e hiperintensa em T2 com realce periférico de contraste no interior do músculo psoas direito, caracterizando abscesso paravertebral. A biópsia percutânea confirmou presença de bacilos álcool-ácido resistentes (BAAR) e granulomas com necrose caseosa. Assinale a alternativa que descreve a denominação da doença, a particularidade anatômica e o tempo de tratamento preconizado pelo Ministério da Saúde:</p>
<p>A) Doença de Pott (espondilodiscite tuberculosa); o tratamento preconizado é o esquema RIPE prolongado por 12 meses (2 meses de RHZE seguidos de 10 meses de RH).<br>
B) Doença de Paget óssea; o tratamento preconizado consiste em Bifosfonatos endovenosos associados a corticoterapia por 24 meses.<br>
C) Espondilite Anquilosante com fratura em 'haste de giz'; o tratamento preconizado é a introdução imediata de anticorpos anti-IL-17.<br>
D) Mieloma Múltiplo espinhal; o tratamento preconizado exige quimioterapia imediata com Bortezomibe e Dexametasona associada a radioterapia local.<br>
E) Espondilodiscite bacteriana aguda por <em>Pseudomonas</em>; o tratamento preconizado consiste em Cefepima intravenosa por 21 dias exclusivamente.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa A está CORRETA:</strong> O quadro descrito é a apresentação clássica da <strong>Tuberculose Óssea da Coluna Vertebral (Mal de Pott ou Doença de Pott)</strong>. Caracteriza-se pelo acometimento da coluna toracolombar com invasão hematogênica das artérias vertebrais anteriores, provocando lise óssea dos platôs vertebrais contíguos e destruição precoce do disco intervertebral, formação do clássico <strong>abscesso frio no ventre do músculo psoas</strong> e deformidade em giba angular. Ao contrário da forma pulmonar habitual que dura 6 meses, as formas de acometimento do sistema nervoso central e a forma osteoarticular (Mal de Pott) exigem <strong>tempo de tratamento estendido para 12 meses: 2 meses de RHZE seguidos de 10 meses de RH (2 RHZE / 10 RH)</strong> para assegurar penetração tecidual e erradicação bacteriana definitiva no osso desvitalizado.</li>
    <li><strong>Alternativa B está INCORRETA:</strong> A doença de Paget cursa com remodelação óssea desordenada e elevação de fosfatase alcalina, sem necrose caseosa, isolamento de BAAR ou abscessos infecciosos do psoas.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> A espondilite anquilosante é uma espondiloartropatia autoimune soronegativa que cursa com entesite, sindesmófitos e fusão vertebral ('coluna em bambu'), sem granulomas caseosos ou bacilos micobacterianos.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> O mieloma múltiplo causa lesões líticas 'em saca-bocado' que poupam classicamente o espaço discal intervertebral, sem presença de BAAR ou abscessos do músculo psoas.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A demonstração de necrose caseosa e BAAR comprova inequivocamente a etiologia micobacteriana tuberculosa e não bacteriana aguda por bacilo Gram-negativo.</li>
  </ul>
</div>

<h3>Questão 6 (SMS-SP / Residência Médica da Secretaria Municipal de Saúde de São Paulo)</h3>
<p>Mulher de 38 anos, vendedora, procura a Unidade Básica de Saúde relatando disúria e polaciúria arrastadas há 5 meses, refratárias a três cursos prévios de antibioticoterapia empírica com Fosfomicina, Ciprofloxacino e Nitrofurantoína. Refere ainda episódios esporádicos de hematúria terminal indolor e emagrecimento de 4 kg no período. O exame físico é inocente, sem dor à palpação abdominal ou punho-percussão lombar (Giordano negativo). O exame de urina tipo 1 (EAS) evidencia: pH 5,2 (ácido), leucocitúria maciça (&gt; 100.000 leucócitos/mL), micro-hematúria e ausência de nitrito. As uroculturas de jato médio realizadas em ágar sangue e MacConkey resultaram reiteradamente negativas após 72 horas de incubação. Diante desse quadro clínico e laboratorial clássico, qual é o diagnóstico mais provável e o método complementar padrão para confirmação etiológica?</p>
<p>A) Cistite intersticial / Síndrome da bexiga dolorosa; indicar biópsia vesical por cistoscopia para pesquisa de úlceras de Hunner.<br>
B) Tuberculose do trato urinário; indicar pesquisa direta de BAAR e cultura em meio específico (Lowenstein-Jensen / Ogawa-Kudoh) ou Teste Rápido Molecular (TRM-TB) em pelo menos 3 a 6 amostras da primeira urina da manhã colhidas em dias consecutivos.<br>
C) Pielonefrite crônica por <em>Escherichia coli</em> produtora de ESBL; indicar urocultura com meio enriquecido de tioglicolato mantida em estufa por 30 dias.<br>
D) Carcinoma urotelial de bexiga invasivo; indicar ressecção transuretral de bexiga com instilação imediata de imunoterapia com BCG em dose plena.<br>
E) Litíase renal bilateral com impactação pielocalicinal; solicitar urografia excretora com contraste iodado intravenoso de urgência.</p>
<div>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado sobre Todas as Alternativas:</strong></p>
  <ul>
    <li><strong>Alternativa B está CORRETA:</strong> O quadro de sintomas irritativos urinários crônicos refratários a antibióticos convencionais associados à clássica <strong>'Piúria Ácida Estéril' (leucocitúria acentuada com pH urinário ácido e uroculturas estéreis nos meios de cultura laboratoriais padrão)</strong> é a apresentação arquetípica da <strong>Tuberculose Urogenital</strong>. O <em>Mycobacterium tuberculosis</em> não cresce em meios comuns de cultura em 48-72h. O método padrão para confirmação diagnóstica consiste na realização de <strong>pesquisa de BAAR, TRM-TB e cultura em meio específico para micobactérias (Lowenstein-Jensen ou Ogawa-Kudoh) em 3 a 6 amostras seriadas da primeira urina da manhã</strong>, devido à eliminação intermitente dos bacilos pelo trato urinário.</li>
    <li><strong>Alternativa A está INCORRETA:</strong> A cistite intersticial é um diagnóstico de exclusão em pacientes com dor pélvica crônica que piora com o enchimento vesical; antes de cogitá-la, deve-se obrigatoriamente afastar a tuberculose urinária diante de piúria estéril e perda de peso em país endêmico.</li>
    <li><strong>Alternativa C está INCORRETA:</strong> A <em>E. coli</em> cresce rapidamente em 24 a 48 horas em meios de cultura bacteriana rotineiros (ágar sangue e MacConkey), o que não ocorreu nas múltiplas uroculturas negativas.</li>
    <li><strong>Alternativa D está INCORRETA:</strong> O carcinoma urotelial acomete predominantemente idosos do sexo masculino com histórico pesado de tabagismo e manifesta-se tipicamente por hematúria macroscópica franca indolor sem piúria ácida estéril exuberante.</li>
    <li><strong>Alternativa E está INCORRETA:</strong> A litíase urinária manifesta-se por cólica nefrética aguda de instalação súbita com irradiação para a região inguinal, e não por piúria estéril crônica insidiosa com perda ponderal.</li>
  </ul>
</div>
`;

// Execução da expansão da TB
const sectionsTB = [
  {
    id: 'sec-tb-iltb-toxicidades-dili-reintroducao',
    title: 'Aprofundamento Avançado: Manejo da ILTB (3HP/1HP/4R/6H/9H), Hepatotoxicidade DILI e Algoritmo Oficial de Reintrodução',
    html: secTB_ILTB_DILI
  },
  {
    id: 'sec-tb-extrapulmonar-tdo-hiv-siri',
    title: 'Aprofundamento Avançado: Formas Extrapulmonares Específicas, TDO no SUS e Coinfecção TB-HIV com SIRI',
    html: secTB_Extra_TDO_HIV_SIRI
  },
  {
    id: 'sec-tb-casos-clinicos-e-questoes-avancadas',
    title: 'Casos Clínicos Aprofundados e Bateria de Questões Comentadas de Residência Médica (TB)',
    html: secTB_Casos_Clinicos + secTB_Questoes_Residencia
  }
];

appendMultipleSections('tuberculose-pulmonar', sectionsTB);
