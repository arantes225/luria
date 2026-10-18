// Bloco 6 - Aula 116: Síndromes Glomerulares (Parte 2: Seções 6 a 10)

export const sec6 = {
  id: 'glomerulonefrite-rapidamente-progressiva-gnrp-e-crescentes',
  title: '6. Glomerulonefrite Rapidamente Progressiva (GNRP): A Formação de Crescentes Glomerulares e Classificação Imunológica',
  body_html: `
<h3>Definição Clínica e Gravidade da GNRP</h3>
<p>A <strong>Glomerulonefrite Rapidamente Progressiva (GNRP)</strong> não é uma doença etiológica isolada, mas sim uma <strong>síndrome clínica de extrema urgência nefrológica</strong> caracterizada pela perda súbita e catastrófica da função renal (com queda de mais de 50% da taxa de filtração glomerular ou duplicação da creatinina sérica em um período que varia de poucos dias a poucas semanas), acompanhada invariavelmente de <strong>sedimento urinário extremamente ativo (nefrítico)</strong> com hematúria dismórfica maciça, cilindros hemáticos patognomônicos, proteinúria subnefrótica e hipertensão arterial.</p>

<p>Se não diagnosticada precocemente e tratada de forma agressiva nas primeiras 24 a 48 horas da internação, a GNRP evolui de maneira inexorável para perda funcional renal completa irreversível e dependência definitiva de terapia renal substitutiva (hemodiálise crônica) por destruição esclerótica de todo o parênquima renal.</p>

<h3>A Biopatologia do Crescente Glomerular (O Substrato Histológico Obligatório)</h3>
<p>A marca registrada histopatológica inegociável da GNRP é a presença de <strong>Crescentes Glomerulares em mais de 50% de todos os glomérulos analisados na biópsia renal (Glomerulonefrite Crescentérica)</strong>:</p>

<ol>
  <li><strong>Ruptura Fissural da Membrana Basal Glomerular:</strong> O processo inflamatório necrotizante destrói mecanicamente a integridade estrutural das alças capilares glomerulares, abrindo fendas profundas na membrana basal;</li>
  <li><strong>Extravasamento de Sangue, Fibrina e Mediadores Inflamatórios:</strong> Proteínas plasmáticas de alto peso molecular (especialmente o <strong>Fibrinogênio</strong>), hemácias e citocinas extravasam violentamente das alças capilares diretamente para o interior do espaço urinário da cápsula de Bowman;</li>
  <li><strong>Proliferação Reativa das Células Epiteliais Parietais:</strong> O contato direto com a fibrina polimerizada funciona como um potente mitógeno celular, estimulando a proliferação descontrolada das células epiteliais parietais que revestem a cápsula de Bowman, associada ao influxo e migração de monócitos e macrófagos hematogênicos;</li>
  <li><strong>Formação e Maturação do Crescente:</strong> A massa celular inflamatória em proliferação assume a clássica <strong>forma semilunar (formato de meia-lua ou crescente)</strong> que preenche e oblitera progressivamente o espaço de Bowman, comprimindo extrinsecamente o tufo capilar até seu colapso funcional total:
    <ul>
      <li><em>Crescente Celular (Fase Precoce Aguda):</em> Composto puramente por células e fibrina. <strong>FASE 100% POTENCIALMENTE REVERSÍVEL</strong> se instituída imunossupressão agressiva imediata (pulsoterapia com metilprednisolona e ciclofosfamida);</li>
      <li><em>Crescente Fibrocelular (Fase Intermediária):</em> Invasão de fibroblastos com síntese progressiva de matriz colágena;</li>
      <li><em>Crescente Fibroso (Fase Tardia Irreversível):</em> Cicatrização esclerótica com obliteração definitiva do glomérulo por tecido conjuntivo fibroso acelular (glomeruloesclerose global). O glomérulo está morto e não há resposta a imunossupressores.</li>
    </ul>
  </li>
</ol>

<h3>Classificação Etiopatogênica da GNRP pela Imunofluorescência</h3>
<p>A realização de biópsia renal com microscopia óptica e <strong>Imunofluorescência (IF)</strong> é mandatória de emergência para determinar a etiologia subjacente e guiar a terapia específica, dividindo as GNRPs em três grandes grupos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de GNRP</th>
      <th>Padrão da Imunofluorescência</th>
      <th>Fisiopatologia Imunológica Central</th>
      <th>Doenças Clínicas Representativas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo I: Doença por Anticorpo Anti-MBG</strong><br>(10% a 15% dos casos)</td>
      <td><strong>Deposição Linear Contínua e Homogênea</strong> de anticorpos IgG e C3 ao longo de toda a Membrana Basal Glomerular.</td>
      <td>Autoanticorpos circulantes direcionados diretamente contra o domínio NC1 da cadeia $\alpha_3$ do <strong>Colágeno Tipo IV</strong>.</td>
      <td><strong>Doença de Goodpasture (Síndrome Pulmão-Rim com hemorragia alveolar)</strong> e Glomerulonefrite por Anticorpo Anti-MBG restrita aos rins.</td>
    </tr>
    <tr>
      <td><strong>Tipo II: Mediada por Imunocomplexos</strong><br>(30% a 40% dos casos)</td>
      <td><strong>Deposição Granular Grosseira Irregular</strong> de imunoglobulinas (IgG, IgM, IgA) e frações do complemento (C3, C1q) nas alças e mesângio.</td>
      <td>Ativação clássica por deposição de complexos antígeno-anticorpo circulantes ou formados <em>in situ</em>.</td>
      <td><strong>Nefrite Lúpica Proliferativa Difusa (Classe IV do LES)</strong>; Glomerulonefrite Pós-Estreptocócica grave (GNPE crescentérica); Nefropatia por IgA / Púrpura de Henoch-Schönlein; Endocardite Bacteriana Subaguda.</td>
    </tr>
    <tr>
      <td><strong>Tipo III: Pauci-Imune (Associada ao ANCA)</strong><br>(50% a 60% dos casos - A mais comum no adulto!)</td>
      <td><strong>Imunofluorescência NEGATIVA ou com traços insignificantes</strong> de anticorpos ("pauci" = poucos depósitos imunes).</td>
      <td>Inflamação e necrose vascular necrotizante mediada por anticorpos citoplasmáticos antineutrófilos (<strong>ANCA</strong>), que ativam neutrófilos desgranulantes nos capilares.</td>
      <td><strong>Vasculites Sistêmicas Associadas ao ANCA:</strong><br>• Granulomatose com Poliangeíte (Wegener - <strong>c-ANCA / Anti-PR3</strong>);<br>• Poliangeíte Microscópica (PAM - <strong>p-ANCA / Anti-MPO</strong>);<br>• Granulomatose Eosinofílica com Poliangeíte (Churg-Strauss).</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: 'sindrome-pulmao-rim-goodpasture-e-vasculites-anca',
  title: '7. A Síndrome Pulmão-Rim: Doença de Goodpasture versus Vasculites Associadas ao ANCA',
  body_html: `
<h3>O Conceito Clínico de Síndrome Pulmão-Rim</h3>
<p>A coexistência em um mesmo paciente de <strong>Glomerulonefrite Crescentérica Aguda Necrotizante associada à Hemorragia Alveolar Difusa</strong> (manifestada por tosse com hemoptise franca, dispneia súbita com insuficiência respiratória hipoxêmica e infiltrados alveolares bilaterais em "asa de borboleta" na radiografia e tomografia de tórax) constitui a clássica e temida <strong>Síndrome Pulmão-Rim</strong>. As duas etiologias mais representativas e graves dessa entidade são a Doença de Goodpasture e as Vasculites Sistêmicas ANCA-relacionadas:</p>

<h3>1. Doença de Goodpasture (Síndrome do Anticorpo Anti-MBG)</h3>
<p>Descrita originalmente pelo patologista Ernest Goodpasture em 1919, caracteriza-se por um ataque autoimune virulento mediado por <strong>anticorpos IgG circulantes direcionados contra o domínio não-colagenoso 1 (NC1) da cadeia $\alpha_3$ do Colágeno Tipo IV</strong>. Como a cadeia $\alpha_3$ está presente quase exclusivamente em duas estruturas anatômicas do corpo humano — a <strong>Membrana Basal Glomerular renal</strong> e a <strong>Membrana Basal Alveolar pulmonar</strong> —, o paciente desenvolve lesão restrita a esses dois leitos vasculares:</p>

<ul>
  <li><strong>Fatores Desencadeantes Pulmonares:</strong> O endotélio alveolar normal é contínuo e não fenestrado, protegendo a membrana basal do contato com os anticorpos circulantes. A hemorragia alveolar geralmente é deflagrada quando ocorre exposição prévia a <strong>fumaça de cigarro (tabagismo ativo), inalação de solventes orgânicos hidrocarbonetos ou infecção viral respiratória</strong>, que quebram a barreira endotelial e expõem os epítopos do colágeno IV;</li>
  <li><strong>Diagnóstico Sorológico e Histológico:</strong>
    <ul>
      <li>Detecção de <strong>Anticorpos Anti-MBG circulantes por ensaio imunoenzimático (ELISA)</strong> com sensibilidade e especificidade &gt; 95%;</li>
      <li>Imunofluorescência da biópsia renal com o inconfundível <strong>Padrão Linear Contínuo de IgG</strong> contornando todas as alças glomerulares;</li>
    </ul>
  </li>
  <li><strong>Tratamento Tríplice Mandatório Imediato:</strong>
    <ol>
      <li><strong>Plasmaférese Terapêutica (Troca Plasmática Diária por 14 dias):</strong> Remove mecanicamente os autoanticorpos anti-MBG patogênicos e os mediadores da cascata de coagulação da circulação;</li>
      <li><strong>Pulsoterapia com Corticoide (Metilprednisolona 1 g/dia IV por 3 dias consecutivas, seguida de prednisona oral 1 mg/kg/dia):</strong> Bloqueia a inflamação tecidual aguda;</li>
      <li><strong>Ciclofosfamida Oral ou Intravenosa:</strong> Agente imunossupressor alquilante que bloqueia a síntese de novos anticorpos pelos linfócitos B.</li>
    </ol>
  </li>
</ul>

<h3>2. Vasculites Necrotizantes Associadas ao ANCA</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Entidade Vasculítica</th>
      <th>Autoanticorpo Marcador / Alvo Antigênico</th>
      <th>Quadro Clínico Sistêmico Chave</th>
      <th>Achado Histopatológico Típico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Granulomatose com Poliangeíte (GPA - Antiga Wegener)</strong></td>
      <td><strong>c-ANCA (Padrão Citoplasmático)</strong> dirigido contra a <strong>Proteinase 3 (Anti-PR3)</strong> em &gt; 90% dos casos.</td>
      <td><strong>Tríade Clássica:</strong><br>1. <strong>Vias Aéreas Superiores:</strong> Sinusite crônica purulenta/crostosa, perfuração de septo nasal, <strong>deformidade do nariz em sela</strong>, estenose subglótica;<br>2. <strong>Pulmões:</strong> Nódulos e <strong>infiltrados cavitários múltiplos de paredes espessas</strong> com hemoptise;<br>3. <strong>Rins:</strong> GNRP pauci-imune.</td>
      <td>Inflamação granulomatosa necrotizante intravascular e extravascular associada a vasculite de médios e pequenos vasos.</td>
    </tr>
    <tr>
      <td><strong>Poliangeíte Microscópica (PAM)</strong></td>
      <td><strong>p-ANCA (Padrão Perinuclear)</strong> dirigido contra a <strong>Mieloperoxidase (Anti-MPO)</strong> em &gt; 80% dos casos.</td>
      <td>Acomete pequenos vasos sem acometimento de vias aéreas superiores e <strong>SEM granulomas nem cavitações pulmonares</strong>. Causa GNRP rapidamente progressiva grave associada a hemorragia alveolar difusa pura.</td>
      <td>Vasculite leucocitoclástica necrotizante pura de arteríolas e capilares com necrose fibrinoide segmentar e ausência de granulomas.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec8 = {
  id: 'biopsia-renal-indicacoes-contraindicacoes-e-complicacoes',
  title: '8. A Biópsia Renal Percutânea no Adulto: Indicações Formais, Contraindicações e Cuidados Pré e Pós-Procedimento',
  body_html: `
<h3>O Papel Decisivo da Biópsia Renal na Nefrologia Moderna</h3>
<p>A biópsia renal percutânea guiada por ultrassonografia em tempo real com agulha cortante automatizada é o procedimento diagnóstico definitivo e o padrão-ouro soberano para o diagnóstico etiológico, estratificação prognóstica e orientação terapêutica nas nefropatias parenquimatosas. Ao fornecer fragmentos do córtex renal para avaliação simultânea por <strong>Microscopia Óptica (MO), Imunofluorescência Direta (IF) e Microscopia Eletrônica (ME)</strong>, a biópsia desvenda com precisão cirúrgica os componentes de atividade inflamatória reversível versus cronicidade cicatricial irreversível (índices de fibrose intersticial e atrofia tubular - IFTA).</p>

<h3>Indicações Formais Inegociáveis de Biópsia Renal no Adulto</h3>
<ol>
  <li><strong>Síndrome Nefrótica em Adultos e Idosos:</strong> Ao contrário da criança (onde a Doença por Lesões Mínimas responde por 85% dos casos e justifica teste terapêutico inicial empírico com corticoide sem biópsia), <strong>no adulto a biópsia é obrigatória antes de instituir qualquer terapia imunossupressora</strong>, para distinguir entre GESF, Nefropatia Membranosa, Doença por Lesões Mínimas, Amiloidose Renal e Nefropatia Diabética atípica;</li>
  <li><strong>Glomerulonefrite Rapidamente Progressiva (GNRP):</strong> Urgência médica absoluta para diferenciar entre Doença de Goodpasture (Tipo I), Imunocomplexos (Tipo II) e Vasculites ANCA (Tipo III) e definir o percentual de crescentes celulares reversíveis;</li>
  <li><strong>Hematúria Glomerular Associada a Proteinúria Relevante:</strong> Micro ou macro-hematúria dismórfica acompanhada de proteinúria persistente superior a 0,5 a 1,0 g/dia ou disfunção renal progressiva;</li>
  <li><strong>Disfunção Renal Inexplicada em Doenças Sistêmicas:</strong> Pacientes com Lúpus Eritematoso Sistêmico (para estadiar as Classes I a VI de Nefrite Lúpica segundo a ISN/RPS), Mieloma Múltiplo ou suspeita de vasculite sistêmica;</li>
  <li><strong>Disfunção Aguda de Enxerto Renal Pós-Transplante:</strong> Para diferenciar rejeição celular aguda, rejeição humoral mediada por anticorpos, toxicidade por inibidores de calcineurina ou infecção por Poliomavírus BK.</li>
</ol>

<h3>Contraindicações Absolutas e Relativas</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Classificação da Contraindicação</th>
      <th>Condições Clínicas Específicas</th>
      <th>Racional Fisiopatológico e Conduta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Contraindicações Absolutas</strong></td>
      <td>• <strong>Distúrbios Graves da Coagulação e Coagulopatias Não Corrigíveis:</strong> Plaquetas &lt; 50.000/mm³, INR &gt; 1,5 ou TTPA alargado;<br>• <strong>Hipertensão Arterial Sistêmica Grave Descontrolada:</strong> Pressão arterial &gt; 140/90 mmHg refratária (o risco de hemorragia renal catastrófica e hematoma retroperitoneal expansivo é inaceitável);<br>• <strong>Recusa Inegociável do Paciente ou Incompetência Cognitiva</strong> para cooperar com apnéias durante a punção;<br>• <strong>Rim Único Anatômico ou Funcional</strong> (exceto rim transplantado em fossa ilíaca): em caso de hemorragia que exija nefrectomia de urgência, o paciente torna-se anefrítico definitivo.</td>
      <td>Corrigir coagulopatia com plasma fresco congelado ou plaquetas antes de reavaliar; otimizar anti-hipertensivos IV (nitroprussiato / clonidina) para PA &lt; 140/90 mmHg estável. Em rim único nativo, considerar abordagem por biópsia transjugular ou cirúrgica videolaparoscópica.</td>
    </tr>
    <tr>
      <td><strong>Contraindicações Relativas</strong></td>
      <td>• <strong>Rins Crônicos Terminalmente Reduzidos de Volume:</strong> Diâmetro longitudinal renal &lt; 8,5 a 9,0 cm na ultrassonografia com perda de diferenciação córtico-medular e afilamento cortical difuso;<br>• <strong>Pielonefrite Aguda Ativa ou Abscesso Perirrenal:</strong> Risco de disseminar sepse;<br>• <strong>Múltiplos Cistos Renais Bilaterais ou Hidronefrose Acentuada</strong>;<br>• <strong>Obesidade Mórbida Extrema</strong> (dificuldade de janela acústica).</td>
      <td>Em rins terminalmente escleróticos, a biópsia revelará apenas fibrose avançada irreversível sem benefício terapêutico algum, expondo o paciente a alto risco de sangramento capsular.</td>
    </tr>
  </tbody>
</table>

<h3>Rotina Pré e Pós-Biópsia e Manejo de Complicações</h3>
<ul>
  <li><strong>Preparo Pré-Procedimento:</strong> Hemograma com plaquetas atualizado, coagulograma (TAP/INR e TTPA), tipagem sanguínea com reserva de concentrado de hemácias, suspensão de anticoagulantes orais e antiagregantes plaquetários (AAS e clopidogrel suspensos por 7 a 10 dias prévios);</li>
  <li><strong>Cuidados Pós-Procedimento:</strong> Repouso estrito em decúbito dorsal horizontal por <strong>6 a 8 horas</strong> (compressão do flanco contra o colchão), monitorização de sinais vitais a cada 15 a 30 minutos nas primeiras 2 horas, controle visual rigoroso da primeira micção espontânea (pesquisa de hematúria macroscópica franca) e ultrassonografia renal de controle antes da alta;</li>
  <li><strong>Complicações:</strong> A complicação mais frequente é a <strong>hematúria microscópica transitória</strong> (ocorre em &gt; 80% a 90% dos pacientes, sem relevância clínica). <strong>Hematoma perirrenal assintomático</strong> ocorre em 10% a 15%. Hematoma expansivo clinicamente significativo com queda de hematócrito e dor em flanco ocorre em menos de 1% a 2%, tratado na quase totalidade por suporte hemodinâmico, transfusão e repouso estrito; raríssimos casos de sangramento arterial ativo intratável exigem <strong>arteriografia renal percutânea com embolização superseletiva por radiologia intervencionista</strong>.</li>
</ul>
`
};

export const sec9 = {
  id: 'casos-clinicos-estruturados-de-sindromes-glomerulares',
  title: '9. Casos Clínicos Estruturados e Tomada de Decisão Médica em Nefrologia Clínica',
  body_html: `
<h3>Caso Clínico 1: O Paradigma da Trombose de Veia Renal na Síndrome Nefrótica</h3>
<p><strong>Identificação:</strong> Homem de 56 anos, caucasiano, sem antecedentes mórbidos conhecidos, procura o pronto-socorro com queixa de edema progressivo de membros inferiores e ganho ponderal de 9 kg no último mês, associado a urina espumosa. Há 24 horas evoluiu com dor lombar súbita contínua em flanco esquerdo e piora acentuada da hematúria, que se tornou macroscópica.</p>

<p><strong>Exames Complementares Admissionais:</strong></p>
<ul>
  <li><strong>Bioquímica Sérica:</strong> Creatinina = 1,8 mg/dL (basal estimada em 0,9 mg/dL há 6 meses); Ureia = 68 mg/dL; <strong>Albumina Sérica = 1,7 g/dL</strong> (Hipoalbuminemia profunda); Colesterol Total = 420 mg/dL; Triglicerídeos = 380 mg/dL;</li>
  <li><strong>Urina Tipo 1 (EAS):</strong> Proteína ++++, Hemácias incontáveis com cilindros graxos e gotas de lipídios em cruz de Malta; <strong>Proteinúria de 24 horas = 9,4 gramas</strong>;</li>
  <li><strong>Sorologia Autoimune:</strong> <strong>Anticorpo Anti-PLA2R fortemente reagente</strong> (título de 180 RU/mL). FAN, ANCA e sorologias para hepatite B, C e HIV não reagentes;</li>
  <li><strong>Angiotomografia Computadorizada de Abdome com Fase Venosa Renal:</strong> Evidencia rim esquerdo aumentado de volume com captação heterogênea de contraste e <strong>falha de enchimento intraluminal completa na veia renal esquerda com extensão do trombo em direção à veia cava inferior</strong>.</li>
</ul>

<p><strong>Raciocínio Clínico e Conduta Imediata:</strong></p>
<ol>
  <li>O quadro clínico de síndrome nefrótica grave no adulto branco acima de 50 anos associado à positividade de <strong>Anti-PLA2R</strong> fecha o diagnóstico inequívoco de <strong>Glomerulopatia Membranosa Primária</strong> (dispensando inclusive a necessidade de biópsia renal invasiva inicial segundo os consensos internacionais KDIGO mais recentes);</li>
  <li>A dor lombar aguda súbita associada a hematúria macroscópica e queda aguda da função renal em um paciente nefrótico com albumina &lt; 2,0 g/dL é a manifestação patognomônica da <strong>Trombose Aguda de Veia Renal (TVR)</strong>;</li>
  <li><strong>Conduta Mandatória:</strong> Início imediato de <strong>Anticoagulação Plena com Heparina de Baixo Peso Molecular (Enoxaparina 1 mg/kg de 12/12h ajustada para a TFG)</strong> seguida de transição para anticoagulante oral, mantida por pelo menos 6 meses e enquanto a albumina sérica permanecer inferior a 2,5-3,0 g/dL. O tratamento imunossupressor específico da membranosa com <strong>Rituximabe</strong> ou esquema cíclico de corticoide associado a ciclofosfamida (protocolo de Ponticelli modificado) é programado em conjunto com o nefrologista.</li>
</ol>

<h3>Caso Clínico 2: A Corrida Contra o Relógio na GNRP Pauci-Imune</h3>
<p><strong>Identificação:</strong> Mulher de 62 anos, previamente hígida, é internada com quadro de astenia profunda, perda ponderal de 6 kg, febre diária baixa há 3 semanas e sinusite crônica purulenta refratária a amoxicilina-clavulanato com saída de crostas nasais sanguinolentas. Há 5 dias notou urina escura avermelhada e diminuição acentuada do volume urinário (oligúria com diurese de 400 mL/24h).</p>

<p><strong>Avaliação Laboratorial na Admissão:</strong></p>
<ul>
  <li>Creatinina sérica na admissão = <strong>4,8 mg/dL</strong> (um exame de rotina realizado há 4 meses revelava creatinina de 0,8 mg/dL!);</li>
  <li>EAS: Hematúria com <strong>90% de hemácias dismórficas, 12% de acantócitos e múltiplos cilindros hemáticos</strong>; Proteinúria de 1,6 g/24 horas;</li>
  <li>Tomografia de Tórax: Múltiplos nódulos pulmonares bilaterais, alguns exibindo <strong>escavação central com paredes espessas</strong> no lobo inferior direito;</li>
  <li>Sorologia: <strong>c-ANCA fortemente positivo com Anti-Proteinase 3 (Anti-PR3) &gt; 100 U/mL</strong>. Complemento C3 e C4 rigorosamente normais; Anti-MBG negativo;</li>
  <li>Biópsia Renal de Urgência: Glomerulonefrite necrotizante focal com <strong>Crescentes Celulares em 75% dos glomérulos viáveis</strong>; Imunofluorescência completamente negativa (padrão pauci-imune).</li>
</ul>

<p><strong>Diagnóstico e Terapêutica de Emergência:</strong></p>
<ul>
  <li>Diagnóstico Definitivo: <strong>Granulomatose com Poliangeíte (GPA - Wegener) cursando com GNRP Tipo III (Pauci-Imune)</strong> em fase celular potencialmente reversível;</li>
  <li><strong>Prescrição Imediata em Unidade Semi-Intensiva:</strong>
    <ol>
      <li><strong>Pulsoterapia com Metilprednisolona Intravenosa:</strong> 1.000 mg (1 g) IV em infusão de 2 horas por dia, por 3 dias consecutivos, seguida de Prednisona oral 1 mg/kg/dia;</li>
      <li><strong>Terapia de Indução Imunossupressora:</strong> <strong>Rituximabe (375 mg/m² semanal por 4 doses)</strong> ou Ciclofosfamida em pulsos intravenosos ajustados pela idade e função renal;</li>
      <li>Profilaxia mandatória com Sulfametoxazol-Trimetoprima para prevenir infecção oportunista pulmonar por <em>Pneumocystis jirovecii</em> durante a imunossupressão profunda;</li>
    </ol>
  </li>
  <li>A paciente reverteu a oligúria no 4º dia pós-pulsoterapia, estabilizando a creatinina sérica em 1,4 mg/dL após 6 meses de seguimento ambulatorial especializado.</li>
</ul>
`
};

export const sec10 = {
  id: 'bateria-de-questoes-comentadas-sindromes-glomerulares',
  title: '10. Bateria de Questões Comentadas do ENAMED e Grandes Concursos Médicos de Residência',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Distratores</h3>

<h4>Questão 1: ENARE / ENAMED — Diferenciação Entre GNPE e Nefropatia por IgA</h4>
<p><strong>Enunciado:</strong> Um homem de 24 anos procura a Unidade de Pronto Atendimento referindo episódio de urina avermelhada escura (hematúria macroscópica) iniciada há 24 horas, acompanhada de dor de garganta, febre de 38,0°C e coriza há 2 dias. Nega edema ou oligúria. A pressão arterial é de 125/80 mmHg. O exame do sedimento urinário revela hematúria dismórfica moderada e proteinúria de 0,6 g/L. O exame bioquímico demonstra ureia e creatinina perfeitamente normais. A dosagem das frações C3 e C4 do complemento sérico revela valores normais. Há cerca de 8 meses, o paciente relata ter apresentado episódio idêntico de urina escura durante um quadro gripal, que desapareceu espontaneamente em 3 dias. A principal hipótese diagnóstica para este paciente é:</p>
<p>A) Glomerulonefrite Difusa Aguda Pós-Estreptocócica (GNPE).<br>
B) Nefropatia por IgA (Doença de Berger).<br>
C) Glomerulonefrite Membranoproliferativa.<br>
D) Doença de Goodpasture.<br>
E) Granulomatose com Poliangeíte.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Esta questão clássica explora a diferenciação fulcral entre GNPE e Doença de Berger:
1. <strong>Cronologia / Período de Latência:</strong> Na Nefropatia por IgA, a hematúria macroscópica é <strong>sinfrangítica</strong> (ocorre concomitantemente à infecção respiratória, em menos de 24 a 48 horas). Na GNPE, há obrigatoriamente um período de latência de 1 a 3 semanas após faringite ou 2 a 6 semanas após piodermite;
2. <strong>Recorrência:</strong> A história de episódios prévios repetidos de hematúria macroscópica em surtos é típica de Berger;
3. <strong>Complemento Sérico:</strong> O complemento na Doença de Berger é <strong>rigorosamente NORMAL</strong>, enquanto na GNPE há queda profunda de C3 em mais de 90% dos casos. A alternativa B é a única correta.</p>

<h4>Questão 2: USP-SP — Síndrome Nefrótica e Trombose de Veia Renal</h4>
<p><strong>Enunciado:</strong> Um paciente de 58 anos em acompanhamento por síndrome nefrótica severa com albumina sérica de 1,8 g/dL e proteinúria de 24 horas de 11 g é submetido a biópsia renal que revela espessamento difuso da membrana basal glomerular com presença de projeções espiculares ("spikes" ou dentes de pente) na coloração pela prata metenamina e depósitos granulares de IgG e C3 na imunofluorescência. O anticorpo anti-PLA2R é positivo. Duas semanas após o diagnóstico, o paciente evolui com dor súbita em flanco esquerdo, hematúria macroscópica e piora aguda da função renal. A patologia glomerular de base e a complicação aguda apresentada são, respectivamente:</p>
<p>A) Glomeruloesclerose Segmentar e Focal e necrose tubular aguda tóxica.<br>
B) Doença por Lesões Mínimas e pielonefrite aguda enfisematosa.<br>
C) Nefropatia Membranosa e Trombose de Veia Renal esquerda.<br>
D) Amiloidose renal e perfuração de úlcera duodenal.<br>
E) Glomerulonefrite por C3 e crise renal esclerodérmica.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> O quadro histopatológico com espículas ("spikes") na prata e imunofluorescência granular subepitelial com anti-PLA2R reagente é patognomônico de <strong>Nefropatia Membranosa</strong>. Esta glomerulopatia é a que apresenta a mais alta incidência de fenômenos tromboembólicos de toda a nefrologia clínica, especialmente a <strong>Trombose de Veia Renal (TVR)</strong> quando a albumina sérica cai abaixo de 2,0 g/dL. A apresentação clássica da TVR aguda manifesta-se por dor súbita em flanco, hematúria macroscópica e declínio da taxa de filtração glomerular. Alternativa C perfeita.</p>

<h4>Questão 3: UNIFESP — A Imunofluorescência na GNRP</h4>
<p><strong>Enunciado:</strong> Um paciente idoso de 70 anos desenvolve quadro de glomerulonefrite rapidamente progressiva com necessidade de hemodiálise em 10 dias. A biópsia renal revela crescentes celulares circunferenciais em 80% dos glomérulos. A microscopia de imunofluorescência não detecta depósitos significativos de imunoglobulinas nem frações de complemento ao longo das paredes capilares (padrão pauci-imune). A pesquisa de autoanticorpos circulantes séricos neste paciente deverá revelar com maior probabilidade a presença de:</p>
<p>A) Anticorpos Anti-Membrana Basal Glomerular (Anti-MBG).<br>
B) Anticorpos Citoplasmáticos Antineutrófilos (ANCA: anti-PR3 ou anti-MPO).<br>
C) Anticorpos Antinucleares (FAN) com padrão homogêneo e Anti-DNA dupla hélice.<br>
D) Anticorpos anti-estreptolisina O em títulos crescentes.<br>
E) Anticorpos anti-receptor de fosfolipase A2 (anti-PLA2R).</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A classificação imunológica das Glomerulonefrites Crescentéricas Rapidamente Progressivas baseia-se no padrão da imunofluorescência:
1. Padrão Linear = Goodpasture / Anti-MBG (Tipo I);
2. Padrão Granular = Imunocomplexos / Lúpus / GNPE (Tipo II);
3. <strong>Padrão Pauci-imune (IF negativa ou com escassos depósitos) = Vasculites Sistêmicas Associadas ao ANCA (Tipo III)</strong>, como Granulomatose com Poliangeíte e Poliangeíte Microscópica. A alternativa B é a única correta.</p>
`
};
