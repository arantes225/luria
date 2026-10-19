import fs from 'fs';
import path from 'path';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

// Termos específicos de busca no Wikimedia Commons por slug clínico
export const CLINICAL_SEARCH_TERMS = {
  // BLOCO 1
  'sindromes-coronarianas-agudas': [
    { query: 'STEMI 12 lead ECG', desc: 'ECG de 12 derivações com supradesnivelamento do segmento ST (IAMCSST)', section: 'avaliacao' },
    { query: 'Wellens syndrome ECG', desc: 'Padrão eletrocardiográfico de Síndrome de Wellens (onda T invertida/bifásica em V2-V3)', section: 'avaliacao' },
    { query: 'coronary angiography LAD stenosis', desc: 'Cineangiocoronariografia demonstrando lesão grave em artéria descendente anterior', section: 'conduta' }
  ],
  'avaliacao-pre-operatoria-risco-cirurgico': [
    { query: 'normal chest x-ray PA view', desc: 'Radiografia de tórax PA em avaliação pré-operatória', section: 'exames' },
    { query: 'normal 12 lead ECG', desc: 'Eletrocardiograma basal de 12 derivações pré-operatório', section: 'exames' }
  ],
  'assistencia-recem-nascido-sala-parto': [
    { query: 'umbilical cord clamp', desc: 'Clampeamento do cordão umbilical e identificação dos vasos', section: 'nascimento' },
    { query: 'measuring infant head circumference', desc: 'Aferição do perímetro cefálico na antropometria neonatal', section: 'cuidados' },
    { query: 'skin to skin newborn', desc: 'Contato pele a pele precoce mãe-bebê na primeira hora de vida', section: 'nascimento' }
  ],
  'pre-natal-baixo-risco': [
    { query: 'crown rump length ultrasound', desc: 'Ultrassonografia obstétrica com aferição do CCN (comprimento cabeça-nádega)', section: 'rotina' },
    { query: 'symphysis fundal height measurement', desc: 'Medição da altura uterina com fita métrica no pré-natal', section: 'consultas' },
    { query: 'Doppler fetal heart rate monitor', desc: 'Ausculta dos batimentos cardiofetais (BCF) com sonar Doppler', section: 'consultas' }
  ],
  'insuficiencia-cardiaca': [
    { query: 'cardiomegaly chest x-ray', desc: 'Radiografia de tórax com cardiomegalia (índice cardiotorácico > 0,5) e congestão', section: 'diagnostico' },
    { query: 'Kerley B lines chest x-ray', desc: 'Linhas B de Kerley em radiografia de tórax evidenciando edema intersticial', section: 'diagnostico' },
    { query: 'echocardiogram parasternal long axis', desc: 'Ecocardiograma transtorácico no eixo paraesternal longo', section: 'diagnostico' }
  ],
  'cuidados-perioperatorios-prevencao-complicacoes': [
    { query: 'surgical safety checklist WHO', desc: 'Lista de Verificação de Segurança Cirúrgica da OMS (Checklist)', section: 'seguranca' },
    { query: 'intermittent pneumatic compression device legs', desc: 'Compressão pneumática intermitente de membros inferiores para profilaxia de TEV', section: 'profilaxia' }
  ],
  'reanimacao-neonatal': [
    { query: 'bag valve mask infant ventilation', desc: 'Ventilação com pressão positiva (VPP) com máscara e balão autoinflável no RN', section: 'passos' },
    { query: 'infant chest compressions two thumb', desc: 'Massagem cardíaca neonatal com técnica dos dois polegares', section: 'passos' },
    { query: 'umbilical vein catheterization newborn', desc: 'Cateterismo venoso umbilical de emergência para infusão de adrenalina', section: 'avancada' }
  ],
  'diagnostico-datacao-gestacao': [
    { query: 'gestational sac ultrasound yolk sac', desc: 'Ultrassom transvaginal demonstrando saco gestacional inicial e vesícula vitelínica', section: 'ultrassom' },
    { query: 'fetal crown rump length measurement ultrasound', desc: 'Medição do CCN no primeiro trimestre para datação gestacional precisa', section: 'ultrassom' }
  ],
  'hipertensao-arterial-sistemica': [
    { query: 'sphygmomanometer blood pressure measurement arm', desc: 'Aferição correta da pressão arterial com manguito e esfigmomanômetro', section: 'diagnostico' },
    { query: 'hypertensive retinopathy fundus photo', desc: 'Fundoscopia óptica com retinopatia hipertensiva (cruzamentos patológicos e exsudatos)', section: 'lesao-orgao-alvo' },
    { query: 'left ventricular hypertrophy ECG Cornell', desc: 'ECG com critérios de hipertrofia ventricular esquerda (sobrecarga de VE)', section: 'lesao-orgao-alvo' }
  ],
  'resposta-metabolica-ao-trauma': [
    { query: 'muscle catabolism severe trauma', desc: 'Resposta endócrino-metabólica e catabolismo muscular no trauma cirúrgico', section: 'fases' },
    { query: 'blood glucose measurement glucometer', desc: 'Controle glicêmico estrito e hiperglicemia de estresse perioperatória', section: 'metabolismo' }
  ],
  'prematuridade-baixo-peso-nascer': [
    { query: 'infant incubator neonatal intensive care unit', desc: 'Recém-nascido prematuro em incubadora na UTI Neonatal com controle térmico', section: 'cuidados' },
    { query: 'kangaroo mother care infant', desc: 'Método Canguru em recém-nascido pré-termo / baixo peso', section: 'cuidados' },
    { query: 'surfactant administration endotracheal tube', desc: 'Administração de surfactante exógeno na síndrome do desconforto respiratório', section: 'complicacoes' }
  ],
  'exames-rastreamentos-pre-natal': [
    { query: 'ultrasound nuchal translucency measurement', desc: 'Ultrassonografia com medição da translucência nucal (11 a 13 semanas e 6 dias)', section: 'primeiro-trimestre' },
    { query: 'oral glucose tolerance test pregnant', desc: 'Teste oral de tolerância à glicose (TOTG 75g) no rastreamento pré-natal', section: 'segundo-trimestre' },
    { query: 'Streptococcus agalactiae agar culture', desc: 'Cultura para estreptococo do grupo B (SGB / GBS) vaginal e retal (35-37 semanas)', section: 'terceiro-trimestre' }
  ],
  'arritmias-fibrilacao-atrial': [
    { query: 'Atrial fibrillation ECG 12 lead rhythm', desc: 'Eletrocardiograma de fibrilação atrial com intervalos RR irregularmente irregulares e ausência de onda P', section: 'diagnostico' },
    { query: 'Atrial flutter ECG sawtooth waves', desc: 'ECG de Flutter Atrial típico demonstrando ondas F com aspecto em dentes de serra', section: 'diagnostico' },
    { query: 'transesophageal echocardiogram left atrial appendage thrombus', desc: 'Ecocardiograma transesofágico avaliando trombo em apêndice atrial esquerdo', section: 'anticoagulacao' }
  ],
  'reposicao-volemica-disturbios-hidroeletroliticos': [
    { query: 'hyperkalemia ECG peaked T waves', desc: 'Eletrocardiograma de hipercalemia com ondas T apiculadas e simétricas', section: 'potassio' },
    { query: 'hypokalemia ECG U wave ST depression', desc: 'ECG de hipocalemia evidenciando onda U proeminente e infradesnivelamento de ST', section: 'potassio' },
    { query: 'peripheral intravenous cannula arm', desc: 'Acesso venoso periférico calibroso para ressuscitação volêmica', section: 'fluidos' }
  ],
  'ictericia-neonatal': [
    { query: 'phototherapy neonatal jaundice infant', desc: 'Fototerapia intensiva de LED para tratamento de hiperbilirrubinemia neonatal', section: 'tratamento' },
    { query: 'transcutaneous bilirubinometer forehead infant', desc: 'Bilirrubinômetro transcutâneo para rastreamento de icterícia na fronte neonatal', section: 'diagnostico' },
    { query: 'Kramer zones neonatal jaundice', desc: 'Zonas dérmicas de progressão craniocaudal da icterícia neonatal (Zonas de Kramer)', section: 'diagnostico' }
  ],
  'vacinacao-suplementacao-gestacao': [
    { query: 'intramuscular vaccine injection deltoid pregnant', desc: 'Administração de vacina intramuscular (dTpa/gripe) na gestante', section: 'vacinas' },
    { query: 'ferrous sulfate iron tablets', desc: 'Suplementação de sulfato ferroso e ácido fólico no pré-natal', section: 'suplementos' }
  ],
  'valvopatias': [
    { query: 'aortic stenosis echocardiogram Doppler continuous wave', desc: 'Ecocardiograma Doppler contínuo na estenose aórtica calculando gradiente médio e velocidade máxima', section: 'estenose-aortica' },
    { query: 'mitral regurgitation Doppler echocardiogram', desc: 'Ecocardiograma com Doppler colorido demonstrando refluxo valvar mitral', section: 'insuficiencia-mitral' },
    { query: 'mechanical heart valve prosthesis aortic', desc: 'Prótese valvar cardíaca mecânica de duplo folheto', section: 'tratamento' }
  ],
  'choque-hemorragico': [
    { query: 'combat application tourniquet CAT leg', desc: 'Aplicação de torniquete tático para controle imediato de sangramento exsanguinante', section: 'controle-sangramento' },
    { query: 'pelvic binder sheet compression trauma', desc: 'Cinta pélvica estabilizadora para fratura de pelve em livro aberto', section: 'controle-sangramento' },
    { query: 'massive transfusion protocol blood cooler', desc: 'Protocolo de transfusão maciça balanceada (1:1:1 concentrado de hemácias, plasma e plaquetas)', section: 'ressuscitacao' }
  ],
  'sepse-neonatal': [
    { query: 'blood culture bottles microbiology laboratory', desc: 'Frascos de hemocultura pediátricos para investigação de sepse neonatal', section: 'diagnostico' },
    { query: 'lumbar puncture infant cerebrospinal fluid', desc: 'Punção lombar neonatal para coleta de líquor em suspeita de meningite associada', section: 'diagnostico' },
    { query: 'intravenous antibiotic infusion syringe pump newborn', desc: 'Bomba de seringa com infusão de antibioticoterapia guiada no RN', section: 'tratamento' }
  ],

  // BLOCO 2
  'sindromes-hipertensivas-da-gestacao': [
    { query: 'preeclampsia blood pressure measurement pregnant', desc: 'Aferição pressórica em gestante para triagem de pré-eclâmpsia (PAS ≥ 140 ou PAD ≥ 90)', section: 'diagnostico' },
    { query: 'magnesium sulfate intravenous infusion', desc: 'Infusão de sulfato de magnésio (esquema de Pritchard / Zuspan) para prevenção de eclâmpsia', section: 'tratamento' },
    { query: 'urinary protein dipstick test strip', desc: 'Fita reagente para detecção de proteinúria no pré-natal', section: 'diagnostico' }
  ],
  'endocardite-infecciosa': [
    { query: 'Osler nodes fingers endocarditis', desc: 'Nódulos de Osler nas polpas digitais (manifestação imunológica de endocardite)', section: 'diagnostico' },
    { query: 'Janeway lesions palm hand endocarditis', desc: 'Lesões de Janeway na palma da mão (êmbolos sépticos indolores na endocardite)', section: 'diagnostico' },
    { query: 'vegetation mitral valve echocardiogram endocarditis', desc: 'Vegetação valvar móvel visualizada em ecocardiograma transtorácico / transesofágico', section: 'diagnostico' }
  ],
  'nutricao-no-paciente-cirurgico': [
    { query: 'nasogastric tube feeding pump', desc: 'Nutrição enteral precoce por sonda nasoentérica em bomba de infusão', section: 'enteral' },
    { query: 'total parenteral nutrition central line bag', desc: 'Bolsa de nutrição parenteral total (NPT) conectada a cateter venoso central', section: 'parenteral' },
    { query: 'bioelectrical impedance analysis body composition', desc: 'Avaliação nutricional e bioimpedância elétrica no pré-operatório', section: 'avaliacao' }
  ],
  'aleitamento-materno': [
    { query: 'breastfeeding latch infant newborn correct', desc: 'Pega correta ao seio materno: boca bem aberta, lábios evertidos e queixo tocando a mama', section: 'tecnica' },
    { query: 'breast engorgement lactating mother', desc: 'Ingurgitamento mamário puerperal e técnica de ordenha manual de alívio', section: 'dificuldades' },
    { query: 'breast pump milk expression storage', desc: 'Ordenha e armazenamento adequado de leite humano em frasco de vidro esterilizado', section: 'ordenha' }
  ],
  'diabetes-mellitus-gestacional': [
    { query: 'glucometer capillary blood glucose test pregnant', desc: 'Monitorização da glicemia capilar pré e pós-prandial no DMG', section: 'controle' },
    { query: 'fetal macrosomia ultrasound estimation', desc: 'Ultrassonografia obstétrica estimando peso fetal e macrossomia no DMG', section: 'complicacoes' },
    { query: 'insulin pen injection subcutaneous abdomen', desc: 'Caneta de aplicação subcutânea de insulina em gestante refratária à dieta', section: 'tratamento' }
  ],
  'pericardite-e-tamponamento-cardiaco': [
    { query: 'pericarditis diffuse ST elevation ECG', desc: 'ECG com supradesnivelamento difuso do segmento ST com concavidade para cima e infradesnível de PR', section: 'pericardite' },
    { query: 'pericardiocentesis subxiphoid needle trauma', desc: 'Pericardiocentese de alívio por via subxifoide no tamponamento cardíaco', section: 'tamponamento' },
    { query: 'pericardial effusion ultrasound subxiphoid view', desc: 'Ecocardiograma janela subxifoide demonstrando volumoso derrame pericárdico com colapso de VD', section: 'tamponamento' }
  ],
  'cicatrizacao-de-feridas': [
    { query: 'surgical wound healing primary intention suture', desc: 'Ferida cirúrgica limpa cicatrizando por primeira intenção com pontos simples', section: 'fases' },
    { query: 'keloid scar shoulder chest skin', desc: 'Cicatrização patológica: queloide espesso ultrapassando as margens da lesão original', section: 'complicacoes' },
    { query: 'hypertrophic scar surgical incision', desc: 'Cicatriz hipertrófica restrita aos limites da incisão cirúrgica', section: 'complicacoes' }
  ],
  'alimentacao-complementar': [
    { query: 'infant complementary feeding spoon vegetables', desc: 'Introdução de alimentos complementares amassados no pratinho aos 6 meses', section: 'introducao' },
    { query: 'infant baby led weaning BLW finger food', desc: 'Método Baby-Led Weaning (BLW) com alimentos cortados em tiras ou pedaços macios', section: 'metodos' }
  ],
  'infeccoes-gestacao-transmissao-vertical': [
    { query: 'congenital syphilis Hutchinson teeth', desc: 'Estigmas de sífilis congênita: dentes de Hutchinson com entalhe central', section: 'sifilis' },
    { query: 'chorioretinitis fundus toxoplasmosis congenital', desc: 'Retinocoroidite macular cicatrizada por toxoplasmose congênita (tríade de Sabin)', section: 'toxoplasmose' },
    { query: 'hydrocephalus head circumference infant ultrasound', desc: 'Hidrocefalia neonatal em ultrassom transfontanelar pós-infecção congênita', section: 'sabin' }
  ],
  'tromboembolismo-venoso-e-embolia-pulmonar': [
    { query: 'deep vein thrombosis leg swelling unilateral', desc: 'Edema e empastamento unilateral de panturrilha característico de TVP', section: 'tvp' },
    { query: 'CT pulmonary angiogram saddle pulmonary embolism', desc: 'Angiotomografia de tórax evidenciando falha de enchimento em sela por tromboembolismo pulmonar', section: 'tep' },
    { query: 'compression ultrasound femoral vein deep vein thrombosis', desc: 'Ultrassonografia com Doppler venoso de MMII com perda de compressibilidade vascular', section: 'diagnostico' }
  ],
  'infeccao-do-sitio-cirurgico-e-antibioticoprofilaxia': [
    { query: 'surgical site infection superficial incision erythema pus', desc: 'Infecção incisional superficial de sítio cirúrgico com hiperemia e secreção purulenta', section: 'classificacao' },
    { query: 'surgical hand scrub sterile technique operating room', desc: 'Degermação cirúrgica das mãos com clorexidina degermante antes da incisão', section: 'prevencao' }
  ],
  'crescimento-e-desenvolvimento': [
    { query: 'WHO growth chart weight for age infant boys', desc: 'Curva de crescimento da OMS de peso para a idade com escores-z e percentis', section: 'crescimento' },
    { query: 'infant developmental milestones sitting crawling', desc: 'Marcos do neurodesenvolvimento infantil: sentar sem apoio e engatinhar', section: 'desenvolvimento' },
    { query: 'infant length stadiometer measurement horizontal', desc: 'Aferição do comprimento neonatal em régua antropométrica horizontal', section: 'antropometria' }
  ],
  'sangramento-na-primeira-metade-da-gestacao': [
    { query: 'transvaginal ultrasound blighted ovum empty sac', desc: 'Ultrassom transvaginal demonstrando gestação anembrionada (saco gestacional sem eco fetal)', section: 'aborto' },
    { query: 'hydatidiform mole snowstorm ultrasound uterus', desc: 'Ultrassonografia com padrão clássico em tempestade de neve / vesículas de mola hidatiforme', section: 'mola' }
  ],
  'choque-circulatorio': [
    { query: 'central venous catheter internal jugular vein', desc: 'Cateter venoso central em veia jugular interna para monitorização hemodinâmica', section: 'monitorizacao' },
    { query: 'arterial line radial artery blood pressure monitoring', desc: 'Linha arterial invasiva na artéria radial para mensuração contínua de PAM', section: 'monitorizacao' },
    { query: 'mottled skin sepsis septic shock knee', desc: 'Mapeamento de pele rendilhada / livedo reticular nos joelhos (Mottling score)', section: 'clinica' }
  ],
  'principios-de-tecnica-cirurgica': [
    { query: 'surgical scalpel blade incision skin', desc: 'Empunhadura correta do bisturi cirúrgico em arco de violino para diérese cutânea', section: 'dierese' },
    { query: 'surgical suture instrument tie needle holder', desc: 'Montagem da agulha no porta-agulhas e sutura cirúrgica por pontos separados', section: 'sintese' },
    { query: 'surgical instruments Mayo scissors forceps', desc: 'Instrumental cirúrgico básico de hemostasia, preensão e corte (Pinça Kelly, Mayo e Anatômica)', section: 'instrumental' }
  ],
  'puericultura-e-prevencao-de-acidentes': [
    { query: 'infant car seat rear facing correct installation', desc: 'Instalação correta do bebê-conforto voltado para trás no banco traseiro do veículo', section: 'acidentes' },
    { query: 'safe infant sleep crib empty back to sleep', desc: 'Ambiente de sono seguro: berço plano sem travesseiros ou protetores, decúbito dorsal', section: 'sono-seguro' }
  ],
  'abortamento': [
    { query: 'manual vacuum aspiration MVA syringe abortion', desc: 'Kit de Aspiração Manual Intrauterina (AMIU) para esvaziamento uterino seguro', section: 'esvaziamento' },
    { query: 'transvaginal ultrasound incomplete abortion retained products', desc: 'Ultrassom transvaginal demonstrando restos ovulares em abortamento incompleto', section: 'diagnostico' }
  ],
  'asma': [
    { query: 'metered dose inhaler with spacer infant child mask', desc: 'Uso de espaçador valvulado com máscara facial para inalador dosimetrado na crise de asma', section: 'tratamento' },
    { query: 'peak expiratory flow meter measurement asthma', desc: 'Medidor de pico de fluxo expiratório (Peak Flow) para monitoramento ambulatorial da asma', section: 'diagnostico' },
    { query: 'spirometry loop obstructive pulmonary disease curve', desc: 'Espirometria demonstrando distúrbio ventilatório obstrutivo com resposta ao broncodilatador', section: 'diagnostico' }
  ],

  // BLOCO 3
  'trauma-atendimento-inicial-abcde': [
    { query: 'cervical collar spine immobilization trauma', desc: 'Imobilização cervical com colar rígido e estabilização manual alinhada (Etapa A)', section: 'via-aerea' },
    { query: 'FAST ultrasound Morrison pouch trauma', desc: 'Janela de Morrison (espaço hepatorrenal) em protocolo FAST positivo para líquido livre', section: 'circulacao' },
    { query: 'log roll trauma patient spine board', desc: 'Manobra de rolamento em bloco em 90 graus para exame do dorso e coluna (Etapa E)', section: 'exposicao' }
  ],
  'imunizacoes-na-infancia': [
    { query: 'BCG vaccine scar deltoid arm', desc: 'Cicatriz vacinal pós-BCG no músculo deltoide direito', section: 'calendario' },
    { query: 'infant oral rotavirus vaccine administration drops', desc: 'Administração da vacina oral contra rotavírus humano (gotinhas)', section: 'calendario' },
    { query: 'intramuscular vaccine infant anterolateral thigh', desc: 'Aplicação de vacina pentavalente no músculo vasto lateral da coxa do lactente', section: 'administracao' }
  ],
  'gestacao-ectopica': [
    { query: 'ectopic pregnancy tubal ultrasound ring of fire Doppler', desc: 'Ultrassom com Doppler colorido demonstrando o anel de fogo na gestação ectópica tubária', section: 'diagnostico' },
    { query: 'laparoscopy unruptured tubal ectopic pregnancy', desc: 'Visão laparoscópica de gestação ectópica tubária íntegra em ampola de tuba uterina', section: 'cirurgia' },
    { query: 'methotrexate injection intramuscular ectopic', desc: 'Tratamento clínico medicamentoso da ectópica íntegra com Metotrexato intramuscular', section: 'clinico' }
  ],
  'dpoc': [
    { query: 'barrel chest emphysema chronic obstructive pulmonary disease', desc: 'Tórax em tonel / enfisematoso com aumento do diâmetro anteroposterior na DPOC', section: 'clinica' },
    { query: 'chest x-ray emphysema hyperinflation flattened diaphragm', desc: 'Radiografia de tórax com hiperinsuflação, retificação diafragmática e aumento dos espaços intercostais', section: 'exames' },
    { query: 'clubbing fingers cyanosis respiratory disease', desc: 'Baqueteamento digital (hipocratismo digital) e cianose em doença pulmonar crônica', section: 'clinica' }
  ],
  'traumatismo-cranioencefalico': [
    { query: 'epidural hematoma CT scan biconvex hyperdense', desc: 'Tomografia de crânio com hematoma epidural hiperdenso com formato biconvexo (em lente)', section: 'tce-grave' },
    { query: 'subdural hematoma crescent shaped CT head', desc: 'TC de crânio com hematoma subdural hiperdenso em formato de crescente / foice', section: 'tce-grave' },
    { query: 'depressed skull fracture CT 3D reconstruction', desc: 'Reconstrução 3D de tomografia computadorizada demonstrando fratura craniana com afundamento', section: 'fraturas' }
  ],
  'desidratacao-e-terapia-de-reidratacao': [
    { query: 'oral rehydration solution packet WHO SRO', desc: 'Envelope de sais de reidratação oral (SRO) padrão da OMS (Plano A e B)', section: 'plano-a-b' },
    { query: 'skin turgor test infant dehydration abdomen', desc: 'Pesquisa do sinal da prega cutânea em abdome de lactente para avaliação de desidratação', section: 'diagnostico' },
    { query: 'sunken fontanelle infant dehydration anterior', desc: 'Fontanela anterior deprimida em lactente com desidratação moderada a grave', section: 'diagnostico' }
  ],
  'doenca-trofoblastica-gestacional': [
    { query: 'complete hydatidiform mole specimen uterine', desc: 'Espécime cirúrgico de mola hidatiforme completa com vesículas em cacho de uva', section: 'patologia' },
    { query: 'snowstorm appearance hydatidiform mole ultrasound', desc: 'Achado ecográfico clássico em floco de neve / favo de mel no útero', section: 'diagnostico' }
  ],
  'pneumonias-adquiridas-na-comunidade': [
    { query: 'lobar pneumonia chest x-ray right lung consolidation', desc: 'Radiografia de tórax demonstrando consolidação lobar típica com broncograma aéreo', section: 'diagnostico' },
    { query: 'Streptococcus pneumoniae Gram positive diplococci smear', desc: 'Microscopia de escarro com diplococos Gram-positivos lanceolados (Pneumococo)', section: 'etiologia' }
  ],
  'trauma-toracico': [
    { query: 'tension pneumothorax chest x-ray tracheal deviation', desc: 'Radiografia de tórax de pneumotórax hipertensivo com desvio de traqueia e mediastino', section: 'pneumotorax' },
    { query: 'chest tube thoracostomy water seal insertion', desc: 'Drenagem torácica tubular fechada em selo d água no 5º espaço intercostal', section: 'drenagem' },
    { query: 'needle thoracostomy decompression second intercostal space', desc: 'Toracocentese descompressiva com cateter calibroso de alívio imediato', section: 'descompressao' }
  ],
  'diarreia-aguda': [
    { query: 'stool microscopy leukocytes erythrocytes diarrhea', desc: 'Microscopia óptica fecal evidenciando leucócitos e hemácias (diarreia inflamatória)', section: 'diagnostico' },
    { query: 'hand hygiene washing hands soap water prevention', desc: 'Higienização correta das mãos com água e sabão para prevenção de diarreia infecciosa', section: 'prevencao' }
  ],
  'sangramento-na-segunda-metade-da-gestacao': [
    { query: 'placenta previa transvaginal ultrasound internal os', desc: 'Ultrassom transvaginal demonstrando placenta prévia ocluindo o orifício interno do colo', section: 'placenta-previa' },
    { query: 'abruptio placentae retroplacental hematoma ultrasound', desc: 'Hematoma retroplacentário ecográfico característico de descolamento prematuro de placenta', section: 'dpp' }
  ],
  'tuberculose-pulmonar': [
    { query: 'pulmonary tuberculosis chest x-ray apical cavitary lesion', desc: 'Radiografia de tórax com cavitação típica em ápice pulmonar direito na tuberculose pós-primária', section: 'diagnostico' },
    { query: 'Ziehl Neelsen stain Mycobacterium tuberculosis acid fast bacilli', desc: 'Baciloscopia de escarro corada pelo método de Ziehl-Neelsen com BAAR vermelhos', section: 'diagnostico' },
    { query: 'GeneXpert MTB RIF cartridge tuberculosis', desc: 'Cartucho do teste rápido molecular GeneXpert MTB/RIF com detecção de resistência a rifampicina', section: 'diagnostico' }
  ],
  'trauma-abdominal': [
    { query: 'splenic laceration CT scan abdominal trauma', desc: 'Tomografia de abdome demonstrando laceração esplênica com hemoperitônio associado', section: 'baco' },
    { query: 'liver laceration abdominal trauma CT scan', desc: 'TC computadorizada com trauma hepático contuso e laceração subcapsular', section: 'figado' },
    { query: 'laparotomy abdominal trauma surgery packing', desc: 'Laparotomia exploradora para cirurgia de controle de danos (Damage Control Surgery)', section: 'cirurgia' }
  ],
  'doenca-do-refluxo-gastroesofagico-na-infancia': [
    { query: 'barium swallow upper gastrointestinal series infant reflux', desc: 'Serografia esôfago-estômago-duodeno (REED) avaliando refluxo gastroesofágico e anatomia', section: 'diagnostico' },
    { query: 'pediatric esophageal pH impedance catheter', desc: 'Cateter de pH-impedanciometria esofágica de 24 horas na avaliação de DRGE refratária', section: 'diagnostico' }
  ],
  'placenta-previa-e-descolamento-prematuro-de-placenta': [
    { query: 'Couvelaire uterus apoplexy placental abruption', desc: 'Útero de Couvelaire (apoplexia uteroplacentária) com infiltração miometrial de sangue', section: 'dpp' },
    { query: 'fetal cardiotocography late decelerations distress', desc: 'Cardiotocografia demonstrando desacelerações tardias (DIP 2) por hipóxia fetal no DPP', section: 'dpp' }
  ],
  'derrame-pleural': [
    { query: 'meniscus sign pleural effusion chest x-ray', desc: 'Radiografia de tórax em ortostase com sinal do menisco / apagamento do seio costofrênico', section: 'diagnostico' },
    { query: 'thoracentesis needle pleural fluid aspiration syringe', desc: 'Toracocentese diagnóstica guiada por ultrassom com aspiração de líquido pleural para critérios de Light', section: 'diagnostico' }
  ],
  'trauma-pelvico-e-geniturinario': [
    { query: 'open book pelvic fracture pelvic x-ray pubic diastasis', desc: 'Radiografia de bacia com fratura pélvica em livro aberto e diástase da sínfise púbica', section: 'pelve' },
    { query: 'retrograde urethrogram urethral injury extravasation', desc: 'Uretrocistografia retrógrada demonstrando extravasamento de contraste por lesão uretral', section: 'uretra' }
  ],
  'desnutricao-e-deficiencias-nutricionais': [
    { query: 'kwashiorkor child edema skin lesions distended abdomen', desc: 'Criança com Kwashiorkor: edema de membros inferiores, hepatomegalia e lesões dermatológicas', section: 'kwashiorkor' },
    { query: 'marasmus child severe muscle wasting subcutaneous fat', desc: 'Criança com Marasmo: emaciação extrema com perda evidente de bola gordurosa de Bichat e fáscies senil', section: 'marasmo' },
    { query: 'Bitot spots eye vitamin A deficiency cornea', desc: 'Manchas de Bitot na conjuntiva bulbar por deficiência de vitamina A (xeroftalmia)', section: 'hipovitaminoses' }
  ],
  'assistencia-ao-parto': [
    { query: 'crowning fetal head normal vaginal delivery', desc: 'Desprendimento do polo cefálico fetal no períneo (coroamento) no parto vaginal', section: 'segundo-periodo' },
    { query: 'oxytocin intramuscular third stage labor active management', desc: 'Manejo ativo do terceiro período: administração de ocitocina 10 UI IM após nascimento', section: 'terceiro-periodo' },
    { query: 'examination of placenta membranes maternal surface cotyledons', desc: 'Inspeção minuciosa da face materna e cotilédones da placenta para descartar restos ovulares', section: 'dequitadura' }
  ],

  // BLOCO 4
  'insuficiencia-respiratoria-aguda': [
    { query: 'arterial blood gas puncture radial artery syringe', desc: 'Coleta de gasometria arterial na artéria radial com teste de Allen prévio', section: 'gasometria' },
    { query: 'high flow nasal cannula oxygen therapy adult', desc: 'Oxigenoterapia por cânula nasal de alto fluxo (CNAF) na insuficiência respiratória hipoxêmica', section: 'oxigenoterapia' },
    { query: 'mechanical ventilator display waveforms ARDS', desc: 'Curvas de fluxo, pressão e volume em ventilador mecânico na SDRA protetora', section: 'ventilacao' }
  ],
  'queimaduras': [
    { query: 'second degree burn blister skin dermal', desc: 'Queimadura de segundo grau (espessura parcial) com flictenas / bolhas íntegras e leito úmido', section: 'classificacao' },
    { query: 'full thickness third degree burn eschar', desc: 'Queimadura de terceiro grau com escara esbranquiçada/acastanhada, indolor e aspecto cartonado', section: 'classificacao' },
    { query: 'Wallace rule of nines burn surface area chart', desc: 'Regra dos Nove de Wallace para cálculo da superfície corporal queimada (SCQ)', section: 'parkland' }
  ],
  'obesidade-infantil': [
    { query: 'acanthosis nigricans neck insulin resistance', desc: 'Acantose nigricante na região posterior do pescoço associada à resistência insulínica', section: 'complicacoes' },
    { query: 'BMI for age growth chart WHO children', desc: 'Gráfico de IMC para idade da OMS identificando sobrepeso (escore-z > +1) e obesidade (escore-z > +2)', section: 'diagnostico' }
  ],
  'partograma': [
    { query: 'partogram WHO labor progress cervical dilatation alert line', desc: 'Partograma com linha de alerta e ação da OMS monitorando a progressão da dilatação cervical', section: 'preenchimento' },
    { query: 'cervical dilatation labor examination fingers', desc: 'Toque vaginal obstétrico avaliando dilatação do colo em centímetros e plano de De Lee', section: 'dilatacao' }
  ],
  'diabetes-mellitus': [
    { query: 'diabetic retinopathy fundus photography microaneurysms hemorrhages', desc: 'Retinografia demonstrando retinopatia diabética com microaneurismas e exsudatos duros', section: 'complicacoes' },
    { query: 'diabetic foot ulcer plantar neuropathic', desc: 'Úlcera neuropática em região plantar de pé diabético sobre ponto de hiperpressão', section: 'pe-diabetico' },
    { query: 'semmes weinstein 10g monofilament test diabetic foot', desc: 'Teste de sensibilidade protetora plantar com monofilamento de Semmes-Weinstein de 10g', section: 'pe-diabetico' }
  ],
  'abdome-agudo-abordagem-inicial': [
    { query: 'pneumoperitoneum abdominal x-ray erect crescent under diaphragm', desc: 'Radiografia de abdome em ortostase com pneumoperitônio (ar livre subdiafragmático na perfuração)', section: 'perfurativo' },
    { query: 'air fluid levels small bowel obstruction abdominal x-ray', desc: 'Radiografia simples demonstrando múltiplos níveis hidroaéreos e distensão em empilhamento de moedas', section: 'obstrutivo' },
    { query: 'abdominal ultrasound acute cholecystitis gallstone thickening', desc: 'Ultrassom evidenciando cálculo impactado no colo vesicular e espessamento parietal (> 3 mm)', section: 'inflamatorio' }
  ],
  'infeccoes-de-vias-aereas-superiores': [
    { query: 'streptococcal pharyngitis exudate tonsils tonsillitis', desc: 'Amigdalite bacteriana aguda com exsudato purulento confluente e petéquias em palato', section: 'faringite' },
    { query: 'acute otitis media otoscopy bulging tympanic membrane erythema', desc: 'Otoscopia demonstrando membrana timpânica hiperemiada, opaca e abaulada na OMA', section: 'otite' },
    { query: 'steeple sign croup subglottic stenosis neck x-ray', desc: 'Radiografia cervical demonstrando sinal da torre / ponta de lápis no crupe viral (laringotraqueíte)', section: 'laringite' }
  ],
  'inducao-do-trabalho-de-parto': [
    { query: 'Foley balloon catheter cervical ripening induction labor', desc: 'Cateter de Foley com balão intracervical insuflado para preparo mecânico de colo desfavorável', section: 'metodos-mecanicos' },
    { query: 'oxytocin infusion pump labor intravenous induction', desc: 'Bomba de infusão contínua com ocitocina para condução e indução de contrações uterinas', section: 'metodos-farmacologicos' }
  ],
  'cetoacidose-diabetica-e-estado-hiperosmolar': [
    { query: 'blood ketone meter beta hydroxybutyrate testing strip', desc: 'Monitor portátil de cetonemia capilar (beta-hidroxibutirato) para diagnóstico de CAD', section: 'diagnostico' },
    { query: 'Kussmaul breathing respiration tachypnea metabolic acidosis', desc: 'Padrão respiratório de Kussmaul (hiperpneia profunda e rápida) para compensação da acidose metabólica', section: 'quadro-clinico' },
    { query: 'continuous insulin infusion syringe pump diabetic ketoacidosis', desc: 'Infusão intravenosa contínua de insulina regular em bomba de seringa no manejo da CAD', section: 'tratamento' }
  ],
  'apendicite-aguda': [
    { query: 'CT scan acute appendicitis cecum appendicolith thickening', desc: 'Tomografia de abdome com apêndice distendido (> 6 mm), espessamento parietal e apendicolito', section: 'diagnostico' },
    { query: 'laparoscopic appendectomy inflamed appendix surgery', desc: 'Apendicectomia laparoscópica demonstrando apêndice cecal flegmonoso e hiperemiado', section: 'cirurgia' },
    { query: 'McBurney point palpation abdominal tenderness sign', desc: 'Palpação do ponto de McBurney e pesquisa do sinal de Blumberg (descompressão dolorosa)', section: 'clinica' }
  ],
  'bronquiolite-viral-aguda': [
    { query: 'subcostal retractions infant tachypnea respiratory distress', desc: 'Tiragem subcostal e intercostal evidente em lactente com bronquiolite viral aguda', section: 'quadro-clinico' },
    { query: 'nasal suctioning bulb syringe infant secretions', desc: 'Desobstrução e lavagem nasal com solução salina fisiológica a 0,9% na bronquiolite', section: 'manejo' },
    { query: 'hyperinflation chest x-ray infant bronchiolitis atelectasis', desc: 'Radiografia de tórax com hiperinsuflação, retificação costal e áreas subsegmentares de atelectasia', section: 'exames' }
  ],
  'distocias-e-parto-operatorio': [
    { query: 'Simpson obstetric forceps delivery vaginal operative', desc: 'Fórcipe obstétrico de Simpson posicionado na apresentação cefálica fetal', section: 'forceps' },
    { query: 'vacuum extractor ventouse obstetric delivery cup', desc: 'Vácuo-extrator obstétrico com ventosa de sucção aplicada no ponto de flexão da cabeça fetal', section: 'vacuo' },
    { query: 'McRoberts maneuver shoulder dystocia delivery', desc: 'Manobra de McRoberts com hiperflexão das coxas maternas sobre o abdome na distocia de espáduas', section: 'distocia-ombro' }
  ],
  'disturbios-da-tireoide': [
    { query: 'Graves disease exophthalmos proptosis eyes hyperthyroidism', desc: 'Oftalmopatia de Graves: proptose ocular bilateral, retração palpebral e hiperemia conjuntival', section: 'hipertireoidismo' },
    { query: 'goiter thyroid gland enlargement neck anterior', desc: 'Bócio tireoidiano visível com aumento difuso do volume da glândula na região cervical', section: 'diagnostico' },
    { query: 'thyroid ultrasound nodule fine needle aspiration biopsy', desc: 'Punção aspirativa por agulha fina (PAAF) guiada por ultrassonografia de nódulo tireoidiano', section: 'nodulos' }
  ],
  'colecistite-e-colelitiase': [
    { query: 'gallstones gallbladder ultrasound acoustic shadow calculus', desc: 'Ultrassom de abdome superior demonstrando litíase vesicular com sombra acústica posterior nítida', section: 'colelitiase' },
    { query: 'acute cholecystitis ultrasound gallbladder wall thickening fluid', desc: 'Sinais ecográficos de colecistite aguda: espessamento parietal de vesícula e líquido perivesicular', section: 'colecistite' },
    { query: 'laparoscopic cholecystectomy Calot triangle dissection critical view', desc: 'Visão crítica de segurança de Strasberg no triângulo hepatocístico em colecistectomia laparoscópica', section: 'tratamento' }
  ],
  'pneumonia-na-crianca': [
    { query: 'tachypnea respiratory rate counting infant pediatric pneumonia', desc: 'Contagem da frequência respiratória no lactente para triagem de taquipneia segundo o AIDPI', section: 'quadro-clinico' },
    { query: 'pediatric chest x-ray round pneumonia consolidation', desc: 'Radiografia de tórax pediátrica com pneumonia redonda (condensação esférica)', section: 'diagnostico' },
    { query: 'pulse oximetry infant foot pediatric monitoring', desc: 'Oximetria de pulso no pododáctilo ou dorso do pé da criança para avaliação de hipoxemia', section: 'gravidade' }
  ],
  'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal': [
    { query: 'fetal heart rate deceleration cardiotocography trace DIP II', desc: 'Traçado de cardiotocografia com desacelerações tardias repetidas (DIP II) indicando sofrimento fetal', section: 'cardiotocografia' },
    { query: 'biophysical profile fetal ultrasound amniotic fluid', desc: 'Perfil biofísico fetal ecográfico: avaliação de movimentos corpóreos, tônus, respiração e ILA', section: 'perfil-biofisico' },
    { query: 'Doppler ultrasound umbilical artery absent end diastolic flow', desc: 'Dopplerfluxometria de artéria umbilical com diástole zero / fluxo ausente no final da diástole', section: 'doppler' }
  ],
  'insuficiencia-adrenal-e-sindrome-de-cushing': [
    { query: 'hyperpigmentation skin palmar creases Addison disease', desc: 'Hiperpigmentação cutânea nas dobras palmares e mucosas na doença de Addison (insuficiência adrenal)', section: 'addison' },
    { query: 'Cushing syndrome purple abdominal striae moon facies', desc: 'Estrias violáceas largas (> 1 cm) em abdome e coxas na Síndrome de Cushing', section: 'cushing' },
    { query: 'adrenal CT scan bilateral enlargement hemorrhage adrenal', desc: 'Tomografia computadorizada de abdome com avaliação de glândulas adrenais', section: 'diagnostico' }
  ],
  'coledocolitiase-e-colangite': [
    { query: 'endoscopic retrograde cholangiopancreatography ERCP stone removal', desc: 'Colangiopancreatografia retrógrada endoscópica (CPRE) com papilotomia e extração de cálculo da via biliar', section: 'cpre' },
    { query: 'magnetic resonance cholangiopancreatography MRCP common bile duct dilation', desc: 'Colangiorressonância (CPRM) evidenciando dilatação de colédoco e falha de enchimento por coledocolitíase', section: 'diagnostico' },
    { query: 'obstructive jaundice scleral icterus eye yellow', desc: 'Icterícia obstrutiva evidente em esclera associada à colúria e acolia fecal', section: 'clinica' }
  ]
};
