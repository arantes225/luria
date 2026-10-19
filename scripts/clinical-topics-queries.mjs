import fs from 'fs';
import { getBlocos1A4Apostilas } from './listar-apostilas-blocos-1-4.mjs';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

// Termos curtos, diretos e com fallbacks múltiplos para cada apostila clínica
export const CLINICAL_TOPIC_QUERIES = {
  // BLOCO 1
  'sindromes-coronarianas-agudas': [
    { queries: ['STEMI ECG', 'acute myocardial infarction ECG'], desc: 'ECG com supradesnivelamento do segmento ST (IAMCSST)', sec: 'avaliacao' },
    { queries: ['Wellens ECG', 'Wellens syndrome'], desc: 'Padrão de Síndrome de Wellens em derivações precordiais', sec: 'avaliacao' },
    { queries: ['coronary angiogram', 'coronary angiography'], desc: 'Cineangiocoronariografia demonstrando estenose coronariana crítica', sec: 'conduta' }
  ],
  'avaliacao-pre-operatoria-risco-cirurgico': [
    { queries: ['normal chest radiograph PA', 'normal chest x-ray'], desc: 'Radiografia de tórax padrão PA na avaliação pré-operatória', sec: 'exames' },
    { queries: ['normal 12-lead ECG', 'normal ECG'], desc: 'Traçado de eletrocardiograma de 12 derivações basal', sec: 'exames' }
  ],
  'assistencia-recem-nascido-sala-parto': [
    { queries: ['umbilical cord clamp', 'cord clamping'], desc: 'Clampeamento do cordão umbilical e hemostasia', sec: 'nascimento' },
    { queries: ['measuring head circumference', 'head circumference infant'], desc: 'Aferição do perímetro cefálico na antropometria neonatal', sec: 'cuidados' },
    { queries: ['skin-to-skin newborn', 'kangaroo care'], desc: 'Contato pele a pele precoce e promoção do vínculo mãe-bebê', sec: 'nascimento' }
  ],
  'pre-natal-baixo-risco': [
    { queries: ['crown rump length ultrasound', 'fetal ultrasound CRL'], desc: 'Ultrassonografia obstétrica com medição do comprimento cabeça-nádega (CCN)', sec: 'rotina' },
    { queries: ['fundal height measurement', 'symphysis fundal height'], desc: 'Mensuração da altura de fundo uterino com fita métrica', sec: 'consultas' },
    { queries: ['Doppler fetal heart rate', 'fetal Doppler'], desc: 'Ausculta dos batimentos cardiofetais com sonar Doppler', sec: 'consultas' }
  ],
  'insuficiencia-cardiaca': [
    { queries: ['cardiomegaly chest x-ray', 'cardiomegaly CXR'], desc: 'Radiografia de tórax evidenciando cardiomegalia (ICT > 0,5)', sec: 'diagnostico' },
    { queries: ['Kerley B lines', 'pulmonary edema x-ray'], desc: 'Radiografia de tórax com congestão e linhas B de Kerley', sec: 'diagnostico' },
    { queries: ['echocardiogram parasternal', 'mitral regurgitation echo'], desc: 'Ecocardiograma demonstrando dimensões cavitárias e função ventricular', sec: 'diagnostico' }
  ],
  'cuidados-perioperatorios-prevencao-complicacoes': [
    { queries: ['surgical safety checklist', 'surgical checklist WHO', 'surgical scrub'], desc: 'Lista de Verificação de Segurança Cirúrgica da OMS (Checklist)', sec: 'seguranca' },
    { queries: ['compression stockings', 'compression stocking', 'pneumatic compression leg'], desc: 'Profilaxia mecânica de trombose venosa profunda com compressão elástica/pneumática', sec: 'profilaxia' }
  ],
  'reanimacao-neonatal': [
    { queries: ['infant bag valve mask', 'neonatal resuscitation bag'], desc: 'Ventilação com pressão positiva (VPP) com balão e máscara no RN', sec: 'passos' },
    { queries: ['infant CPR', 'chest compressions infant'], desc: 'Técnica dos dois polegares para massagem cardíaca neonatal', sec: 'passos' },
    { queries: ['umbilical catheterization', 'umbilical vein catheter'], desc: 'Cateterismo venoso umbilical de emergência para infusão de fármacos', sec: 'avancada' }
  ],
  'diagnostico-datacao-gestacao': [
    { queries: ['gestational sac yolk sac ultrasound', 'early pregnancy ultrasound'], desc: 'Ultrassom transvaginal demonstrando saco gestacional e vesícula vitelínica', sec: 'ultrassom' },
    { queries: ['crown rump length ultrasound', 'CRL ultrasound'], desc: 'Datação gestacional precisa pelo CCN no primeiro trimestre', sec: 'ultrassom' }
  ],
  'hipertensao-arterial-sistemica': [
    { queries: ['sphygmomanometer blood pressure', 'blood pressure measurement'], desc: 'Medição padronizada da pressão arterial com manguito adequado', sec: 'diagnostico' },
    { queries: ['hypertensive retinopathy', 'fundus photo retinopathy'], desc: 'Fundoscopia óptica revelando retinopatia hipertensiva', sec: 'lesao-orgao-alvo' },
    { queries: ['left ventricular hypertrophy ECG', 'LVH ECG'], desc: 'Eletrocardiograma com critérios de sobrecarga ventricular esquerda', sec: 'lesao-orgao-alvo' }
  ],
  'resposta-metabolica-ao-trauma': [
    { queries: ['glucometer blood glucose', 'blood glucose test'], desc: 'Monitorização glicêmica estrita na hiperglicemia de estresse cirúrgico', sec: 'metabolismo' },
    { queries: ['intensive care unit patient monitor', 'ICU patient monitor'], desc: 'Monitorização hemodinâmica do paciente cirúrgico crítico em UTI', sec: 'fases' }
  ],
  'prematuridade-baixo-peso-nascer': [
    { queries: ['neonatal incubator', 'infant incubator'], desc: 'Lactente prematuro em incubadora neonatal com termorregulação', sec: 'cuidados' },
    { queries: ['kangaroo mother care', 'kangaroo care infant'], desc: 'Método Canguru e contato pele a pele no prematuro', sec: 'cuidados' }
  ],
  'exames-rastreamentos-pre-natal': [
    { queries: ['nuchal translucency ultrasound', 'nuchal translucency'], desc: 'Medição da translucência nucal (11 a 13 semanas e 6 dias)', sec: 'primeiro-trimestre' },
    { queries: ['oral glucose tolerance test', 'OGTT glucose'], desc: 'Sobrecarga de 75g de glicose no TOTG para rastreamento de DMG', sec: 'segundo-trimestre' },
    { queries: ['Streptococcus agalactiae agar', 'GBS culture agar'], desc: 'Cultura em meio seletivo para estreptococo do grupo B (GBS)', sec: 'terceiro-trimestre' }
  ],
  'arritmias-fibrilacao-atrial': [
    { queries: ['atrial fibrillation ECG', 'AFib ECG rhythm'], desc: 'Eletrocardiograma de fibrilação atrial com ritmo irregularmente irregular', sec: 'diagnostico' },
    { queries: ['atrial flutter ECG', 'flutter sawtooth waves'], desc: 'Flutter atrial com ondas em dente de serra típicas', sec: 'diagnostico' },
    { queries: ['transesophageal echocardiogram', 'left atrial thrombus echo'], desc: 'Ecocardiograma transesofágico excluindo trombo intracavitário', sec: 'anticoagulacao' }
  ],
  'reposicao-volemica-disturbios-hidroeletroliticos': [
    { queries: ['hyperkalemia ECG', 'peaked T waves ECG'], desc: 'Ondas T apiculadas e simétricas no ECG de hipercalemia grave', sec: 'potassio' },
    { queries: ['hypokalemia ECG', 'prominent U wave ECG'], desc: 'Onda U proeminente e infradesnível de ST na hipocalemia', sec: 'potassio' },
    { queries: ['intravenous cannula', 'peripheral venous catheter'], desc: 'Acesso venoso periférico calibroso para ressuscitação cristaloide', sec: 'fluidos' }
  ],
  'ictericia-neonatal': [
    { queries: ['neonatal phototherapy', 'phototherapy infant jaundice'], desc: 'Fototerapia de alta intensidade para hiperbilirrubinemia neonatal', sec: 'tratamento' },
    { queries: ['transcutaneous bilirubinometer', 'bilirubinometer infant'], desc: 'Bilirrubinômetro transcutâneo na avaliação não invasiva de icterícia', sec: 'diagnostico' }
  ],
  'vacinacao-suplementacao-gestacao': [
    { queries: ['intramuscular injection vaccine arm', 'vaccination pregnant'], desc: 'Administração de vacina intramuscular no deltoide da gestante', sec: 'vacinas' },
    { queries: ['iron tablets', 'ferrous sulfate tablets'], desc: 'Suplementação oral diária de ferro elementar e ácido fólico', sec: 'suplementos' }
  ],
  'valvopatias': [
    { queries: ['aortic stenosis echocardiogram', 'aortic stenosis echo Doppler'], desc: 'Ecocardiograma Doppler quantificando gradiente transvalvar aórtico', sec: 'estenose-aortica' },
    { queries: ['mitral regurgitation echocardiogram', 'mitral regurgitation Doppler'], desc: 'Jato de regurgitação mitral visualizado com Doppler colorido', sec: 'insuficiencia-mitral' },
    { queries: ['mechanical heart valve', 'prosthetic heart valve'], desc: 'Prótese valvar cardíaca mecânica bivalvular', sec: 'tratamento' }
  ],
  'choque-hemorragico': [
    { queries: ['combat application tourniquet', 'tourniquet hemorrhage'], desc: 'Torniquete hemostático para contenção de hemorragia exsanguinante em extremidade', sec: 'controle-sangramento' },
    { queries: ['pelvic binder', 'pelvic wrap fracture'], desc: 'Cinta de compressão pélvica para fraturas em livro aberto instáveis', sec: 'controle-sangramento' },
    { queries: ['blood transfusion bag', 'packed red blood cells bag'], desc: 'Bolsa de concentrado de hemácias para transfusão no choque hemorrágico', sec: 'ressuscitacao' }
  ],
  'sepse-neonatal': [
    { queries: ['blood culture bottles', 'microbiology blood culture'], desc: 'Frascos de hemocultura para pesquisa etiológica bacteriana', sec: 'diagnostico' },
    { queries: ['lumbar puncture infant', 'lumbar puncture pediatric'], desc: 'Punção lombar para análise de líquor na sepse neonatal com foco SNC', sec: 'diagnostico' }
  ],

  // BLOCO 2
  'sindromes-hipertensivas-da-gestacao': [
    { queries: ['blood pressure measurement pregnant', 'sphygmomanometer pregnancy'], desc: 'Aferição rigorosa da PA para diagnóstico de pré-eclâmpsia', sec: 'diagnostico' },
    { queries: ['magnesium sulfate injection', 'magnesium sulfate ampoule'], desc: 'Sulfato de magnésio para neuroproteção e prevenção de convulsões eclâmpticas', sec: 'tratamento' },
    { queries: ['urine protein test strip', 'dipstick proteinuria'], desc: 'Fita de urinálise reagente para detecção rápida de proteinúria', sec: 'diagnostico' }
  ],
  'endocardite-infecciosa': [
    { queries: ['Osler nodes', 'Oslers node'], desc: 'Nódulos de Osler eritematosos e dolorosos em polpa digital', sec: 'diagnostico' },
    { queries: ['Janeway lesion', 'Janeway lesions palm'], desc: 'Lesões de Janeway eritematosas indolores palmares por microêmbolos', sec: 'diagnostico' },
    { queries: ['vegetation echocardiogram endocarditis', 'endocarditis echo'], desc: 'Vegetação endocárdica valvar evidente ao ecocardiograma', sec: 'diagnostico' }
  ],
  'nutricao-no-paciente-cirurgico': [
    { queries: ['nasogastric tube', 'enteral feeding tube'], desc: 'Sonda de nutrição enteral para suporte nutricional precoce', sec: 'enteral' },
    { queries: ['parenteral nutrition bag', 'TPN bag'], desc: 'Bolsa de nutrição parenteral total (NPT) para via venosa central', sec: 'parenteral' }
  ],
  'aleitamento-materno': [
    { queries: ['breastfeeding infant latch', 'breastfeeding baby'], desc: 'Pega correta ao seio: lábio evertido e ampla apreensão da aréola', sec: 'tecnica' },
    { queries: ['breast milk pump', 'breast pump expression'], desc: 'Ordenha manual e mecânica de leite materno para frasco de vidro', sec: 'ordenha' }
  ],
  'diabetes-mellitus-gestacional': [
    { queries: ['glucometer blood glucose test', 'capillary blood glucose testing'], desc: 'Automonitorização da glicemia capilar pré e pós-prandial no DMG', sec: 'controle' },
    { queries: ['insulin pen injection', 'insulin pen'], desc: 'Caneta aplicadora de insulina para controle glicêmico gestacional', sec: 'tratamento' }
  ],
  'pericardite-e-tamponamento-cardiaco': [
    { queries: ['pericarditis ECG diffuse ST', 'pericarditis ECG'], desc: 'ECG com supradesnível côncavo difuso de ST e depressão de PR', sec: 'pericardite' },
    { queries: ['pericardiocentesis', 'subxiphoid pericardiocentesis'], desc: 'Punção pericárdica de alívio por via subxifoide no tamponamento', sec: 'tamponamento' },
    { queries: ['pericardial effusion ultrasound', 'pericardial effusion echo'], desc: 'Ecocardiograma demonstrando derrame pericárdico com colapso de cavidades direitas', sec: 'tamponamento' }
  ],
  'cicatrizacao-de-feridas': [
    { queries: ['surgical suture skin', 'surgical stitch wound'], desc: 'Fechamento de ferida operatória por primeira intenção com sutura simples', sec: 'fases' },
    { queries: ['keloid scar', 'keloid shoulder'], desc: 'Cicatriz queloidiana volumosa ultrapassando as margens cirúrgicas', sec: 'complicacoes' },
    { queries: ['hypertrophic scar', 'hypertrophic incision scar'], desc: 'Cicatriz hipertrófica espessa restrita aos limites da incisão', sec: 'complicacoes' }
  ],
  'alimentacao-complementar': [
    { queries: ['infant eating spoon', 'baby eating food'], desc: 'Alimentação complementar oportuna aos 6 meses com colher', sec: 'introducao' },
    { queries: ['baby led weaning', 'finger food infant'], desc: 'Alimentos oferecidos em pedaços e tiras no método BLW', sec: 'metodos' }
  ],
  'infeccoes-gestacao-transmissao-vertical': [
    { queries: ['Hutchinson teeth syphilis', 'congenital syphilis teeth'], desc: 'Dentes de Hutchinson como estigma tardio de sífilis congênita', sec: 'sifilis' },
    { queries: ['chorioretinitis fundus', 'toxoplasmosis chorioretinitis'], desc: 'Retinocoroidite cicatricial típica na toxoplasmose congênita', sec: 'toxoplasmose' }
  ],
  'tromboembolismo-venoso-e-embolia-pulmonar': [
    { queries: ['deep vein thrombosis leg', 'DVT leg swelling'], desc: 'Assimetria de membros inferiores com edema e eritema por TVP', sec: 'tvp' },
    { queries: ['pulmonary embolism CT', 'CT pulmonary angiogram PE'], desc: 'Angiotomografia de tórax com falha de enchimento vascular por TEP', sec: 'tep' },
    { queries: ['venous Doppler ultrasound DVT', 'compression ultrasound vein'], desc: 'Ultrassom com Doppler vascular demonstrando incompressibilidade venosa', sec: 'diagnostico' }
  ],
  'infeccao-do-sitio-cirurgico-e-antibioticoprofilaxia': [
    { queries: ['surgical site infection', 'wound infection incision erythema'], desc: 'Infecção incisional superficial com hiperemia perilesional e exsudato', sec: 'classificacao' },
    { queries: ['surgical hand scrub', 'surgeon scrubbing hands'], desc: 'Antissepsia e degermação cirúrgica das mãos pré-operatória', sec: 'prevencao' }
  ],
  'crescimento-e-desenvolvimento': [
    { queries: ['WHO growth chart weight-for-age', 'WHO child growth chart'], desc: 'Curva de crescimento ponderoestatural da OMS com escores-z', sec: 'crescimento' },
    { queries: ['measuring infant length', 'infant stadiometer'], desc: 'Aferição do comprimento do bebê com régua antropométrica horizontal', sec: 'antropometria' }
  ],
  'sangramento-na-primeira-metade-da-gestacao': [
    { queries: ['blighted ovum ultrasound', 'anembryonic gestation ultrasound'], desc: 'Gestação anembrionada (saco gestacional sem botão embrionário)', sec: 'aborto' },
    { queries: ['hydatidiform mole ultrasound', 'molar pregnancy ultrasound'], desc: 'Padrão ultrassonográfico em tempestade de neve na mola hidatiforme', sec: 'mola' }
  ],
  'choque-circulatorio': [
    { queries: ['central venous catheter', 'jugular vein catheter'], desc: 'Cateter venoso central em veia jugular interna para ressuscitação', sec: 'monitorizacao' },
    { queries: ['arterial line blood pressure', 'radial arterial line'], desc: 'Canulização de artéria radial para monitorização contínua de PAM', sec: 'monitorizacao' },
    { queries: ['livedo reticularis knee', 'mottling score knee sepsis'], desc: 'Livedo reticular e alteração de perfusão periférica em choque', sec: 'clinica' }
  ],
  'principios-de-tecnica-cirurgica': [
    { queries: ['surgical scalpel incision', 'scalpel blade'], desc: 'Bisturi cirúrgico e técnica de incisão cutânea contínua', sec: 'dierese' },
    { queries: ['needle holder suture', 'surgical needle holder forceps'], desc: 'Porta-agulhas montado para sutura de planos anatômicos', sec: 'sintese' },
    { queries: ['surgical instruments forceps scissors', 'surgical clamp forcep'], desc: 'Instrumental cirúrgico básico de hemostasia e dissecção', sec: 'instrumental' }
  ],
  'puericultura-e-prevencao-de-acidentes': [
    { queries: ['child safety seat car', 'infant car seat'], desc: 'Cadeirinha infantil voltada para trás no banco traseiro do carro', sec: 'acidentes' },
    { queries: ['baby crib safe sleep', 'safe infant sleep'], desc: 'Berço seguro em decúbito dorsal sem adornos ou cobertores soltos', sec: 'sono-seguro' }
  ],
  'abortamento': [
    { queries: ['manual vacuum aspiration', 'MVA syringe abortion'], desc: 'Seringa de aspiração manual intrauterina (AMIU) para esvaziamento', sec: 'esvaziamento' },
    { queries: ['retained products of conception ultrasound', 'incomplete abortion ultrasound'], desc: 'Ultrassom transvaginal demonstrando restos ovulares intrauterinos', sec: 'diagnostico' }
  ],
  'asma': [
    { queries: ['metered dose inhaler spacer mask', 'asthma inhaler spacer child'], desc: 'Inalador dosimetrado acoplado a espaçador valvulado com máscara', sec: 'tratamento' },
    { queries: ['peak flow meter asthma', 'peak expiratory flow meter'], desc: 'Aparelho de pico de fluxo expiratório (PFE) para controle ambulatorial', sec: 'diagnostico' }
  ],

  // BLOCO 3
  'trauma-atendimento-inicial-abcde': [
    { queries: ['cervical collar trauma', 'cervical collar patient'], desc: 'Estabilização e alinhamento da coluna cervical com colar rígido (Etapa A)', sec: 'via-aerea' },
    { queries: ['FAST ultrasound trauma Morrison', 'FAST ultrasound exam trauma'], desc: 'Janela de Morrison (espaço hepatorrenal) em protocolo FAST abdominal', sec: 'circulacao' },
    { queries: ['log roll spine board trauma', 'log roll spinal immobilization'], desc: 'Manobra de rolamento em bloco em 90 graus sobre prancha rígida', sec: 'exposicao' }
  ],
  'imunizacoes-na-infancia': [
    { queries: ['BCG scar arm', 'BCG vaccine scar'], desc: 'Cicatriz vacinal resultante da aplicação intradérmica de BCG', sec: 'calendario' },
    { queries: ['oral rotavirus vaccine', 'infant vaccine drops oral'], desc: 'Administração da vacina oral atenuada contra rotavírus humano', sec: 'calendario' }
  ],
  'gestacao-ectopica': [
    { queries: ['ectopic pregnancy ultrasound ring', 'tubal ectopic pregnancy ultrasound'], desc: 'Anel tubário ecográfico com sinal de fluxo vascular na ectópica', sec: 'diagnostico' },
    { queries: ['laparoscopy ectopic pregnancy', 'tubal pregnancy laparoscopy'], desc: 'Aspecto intraoperatório laparoscópico de trompa com gestação ectópica', sec: 'cirurgia' }
  ],
  'dpoc': [
    { queries: ['emphysema chest radiograph', 'barrel chest emphysema x-ray'], desc: 'Radiografia de tórax com hiperinsuflação e retificação diafragmática', sec: 'exames' },
    { queries: ['clubbing fingers', 'digital clubbing nails'], desc: 'Baqueteamento digital em paciente com hipoxemia e pneumopatia crônica', sec: 'clinica' }
  ],
  'traumatismo-cranioencefalico': [
    { queries: ['epidural hematoma CT', 'extradural hematoma CT head'], desc: 'Tomografia de crânio com hematoma epidural hiperdenso biconvexo', sec: 'tce-grave' },
    { queries: ['subdural hematoma CT head', 'acute subdural hematoma CT'], desc: 'Tomografia demonstrando hematoma subdural hiperdenso em crescente', sec: 'tce-grave' },
    { queries: ['skull fracture CT 3D', 'depressed skull fracture CT'], desc: 'Tomografia computadorizada com fratura craniana afundada', sec: 'fraturas' }
  ],
  'desidratacao-e-terapia-de-reidratacao': [
    { queries: ['oral rehydration salts', 'oral rehydration', 'oral rehydration solution WHO'], desc: 'Envelope e preparo de SRO (Sais de Reidratação Oral) para terapia enteral', sec: 'plano-a-b' },
    { queries: ['skin turgor test dehydration', 'skin turgor', 'dehydration skin test'], desc: 'Avaliação do sinal da prega no abdome para diagnosticar desidratação', sec: 'diagnostico' }
  ],
  'doenca-trofoblastica-gestacional': [
    { queries: ['hydatidiform mole specimen', 'hydatidiform mole gross'], desc: 'Aspecto macroscópico de vesículas molares em cacho de uva', sec: 'patologia' },
    { queries: ['snowstorm ultrasound uterus', 'hydatidiform mole ultrasound'], desc: 'Imagem ecográfica uterina com padrão em tempestade de neve', sec: 'diagnostico' }
  ],
  'pneumonias-adquiridas-na-comunidade': [
    { queries: ['lobar pneumonia x-ray', 'pneumonia chest radiograph consolidation'], desc: 'Radiografia de tórax demonstrando condensação com broncograma aéreo', sec: 'diagnostico' },
    { queries: ['Streptococcus pneumoniae Gram stain', 'Streptococcus pneumoniae smear'], desc: 'Bacterioscopia de Gram evidenciando diplococos Gram-positivos', sec: 'etiologia' }
  ],
  'trauma-toracico': [
    { queries: ['tension pneumothorax x-ray', 'pneumothorax CXR'], desc: 'Radiografia com pneumotórax e desvio de estruturas mediastinais', sec: 'pneumotorax' },
    { queries: ['chest tube thoracostomy water seal', 'chest drain insertion'], desc: 'Dreno de tórax tubular selado sob água no 5º espaço intercostal', sec: 'drenagem' },
    { queries: ['needle decompression pneumothorax', 'needle thoracostomy'], desc: 'Toracocentese descompressiva imediata no 2º espaço intercostal', sec: 'descompressao' }
  ],
  'diarreia-aguda': [
    { queries: ['stool examination', 'fecal smear', 'stool leukocytes smear'], desc: 'Exame parasitológico e coproscópico de fezes para pesquisa de leucócitos e enteropatógenos', sec: 'diagnostico' },
    { queries: ['washing hands soap water', 'hand hygiene soap'], desc: 'Lavagem criteriosa das mãos para corte da cadeia de transmissão entérica', sec: 'prevencao' }
  ],
  'sangramento-na-segunda-metade-da-gestacao': [
    { queries: ['placenta previa ultrasound', 'placenta previa', 'transvaginal ultrasound placenta previa'], desc: 'Ultrassom obstétrico com placenta cobrindo o colo uterino', sec: 'placenta-previa' },
    { queries: ['abruptio placentae', 'retroplacental hematoma ultrasound', 'abruptio placentae ultrasound'], desc: 'Hematoma retroplacentário ecográfico com espessamento da placenta', sec: 'dpp' }
  ],
  'tuberculose-pulmonar': [
    { queries: ['tuberculosis cavity chest x-ray', 'pulmonary tuberculosis x-ray'], desc: 'Radiografia de tórax com lesão cavitária típica em ápice pulmonar', sec: 'diagnostico' },
    { queries: ['Mycobacterium tuberculosis Ziehl-Neelsen', 'acid fast bacilli smear'], desc: 'Baciloscopia de escarro corada por Ziehl-Neelsen com BAARs avermelhados', sec: 'diagnostico' }
  ],
  'trauma-abdominal': [
    { queries: ['splenic laceration CT', 'splenic trauma CT scan'], desc: 'Tomografia computadorizada com laceração do parênquima esplênico', sec: 'baco' },
    { queries: ['liver laceration CT', 'hepatic trauma CT scan'], desc: 'TC de abdome demonstrando hematoma e laceração hepática', sec: 'figado' },
    { queries: ['laparotomy surgical packing', 'damage control laparotomy'], desc: 'Laparotomia abreviada para controle de danos e empacotamento intra-abdominal', sec: 'cirurgia' }
  ],
  'doenca-do-refluxo-gastroesofagico-na-infancia': [
    { queries: ['barium swallow', 'gastroesophageal reflux barium swallow', 'upper GI series barium infant'], desc: 'Estudo radiológico contrastado (REED) com refluxo esofágico evidente', sec: 'diagnostico' },
    { queries: ['esophageal pH monitoring catheter', 'pH impedance catheter', 'endoscopy esophagus'], desc: 'Cateter para registro de pH-impedanciometria esofágica de 24h', sec: 'diagnostico' }
  ],
  'placenta-previa-e-descolamento-prematuro-de-placenta': [
    { queries: ['abruptio', 'placenta abruption', 'Couvelaire uterus'], desc: 'Descolamento prematuro de placenta com apoplexia e hematoma retroplacentário', sec: 'dpp' },
    { queries: ['cardiotocography trace fetal distress', 'fetal decelerations CTG', 'cardiotocography'], desc: 'Cardiotocografia demonstrando sofrimento fetal com desacelerações tardias', sec: 'dpp' }
  ],
  'derrame-pleural': [
    { queries: ['pleural effusion x-ray', 'pleural effusion chest radiograph'], desc: 'Radiografia de tórax com apagamento do recesso costofrênico e sinal do menisco', sec: 'diagnostico' },
    { queries: ['thoracentesis needle aspiration', 'pleural fluid aspiration'], desc: 'Aspiração de líquido pleural por agulha para análise bioquímica e citológica', sec: 'diagnostico' }
  ],
  'trauma-pelvico-e-geniturinario': [
    { queries: ['pelvic fracture open book x-ray', 'pelvic fracture x-ray'], desc: 'Radiografia pélvica demonstrando abertura da sínfise púbica em livro aberto', sec: 'pelve' },
    { queries: ['retrograde urethrogram extravasation', 'retrograde urethrography injury'], desc: 'Uretrografia retrógrada com extravasamento de contraste por ruptura uretral', sec: 'uretra' }
  ],
  'desnutricao-e-deficiencias-nutricionais': [
    { queries: ['kwashiorkor edema child', 'kwashiorkor'], desc: 'Criança acometida por Kwashiorkor: edema maleolar bilateral e abdome globoso', sec: 'kwashiorkor' },
    { queries: ['marasmus child wasting', 'marasmus severe wasting'], desc: 'Marasmo com consumo acentuado de massa muscular e gordura subcutânea', sec: 'marasmo' },
    { queries: ['Bitot spots eye', 'Bitot spot vitamin A'], desc: 'Mancha de Bitot nacarada em conjuntiva por deficiência de vitamina A', sec: 'hipovitaminoses' }
  ],
  'assistencia-ao-parto': [
    { queries: ['fetal head delivery crowning', 'vaginal delivery crowning head'], desc: 'Desprendimento do polo cefálico no período expulsivo do parto vaginal', sec: 'segundo-periodo' },
    { queries: ['human placenta examination maternal cotyledons', 'placenta maternal surface cotyledons'], desc: 'Exame sistemático da face materna da placenta para verificação de integridade', sec: 'dequitadura' }
  ],

  // BLOCO 4
  'insuficiencia-respiratoria-aguda': [
    { queries: ['arterial blood gas puncture radial', 'radial artery puncture syringe'], desc: 'Punção da artéria radial para coleta de gasometria arterial e gasometria', sec: 'gasometria' },
    { queries: ['high flow nasal cannula therapy', 'high flow nasal oxygen cannula'], desc: 'Cânula nasal de alto fluxo para suporte respiratório em hipoxemia grave', sec: 'oxigenoterapia' },
    { queries: ['mechanical ventilator waveforms', 'ventilator screen waveforms pressure'], desc: 'Monitor do ventilador mecânico demonstrando curvas de pressão e fluxo', sec: 'ventilacao' }
  ],
  'queimaduras': [
    { queries: ['second degree burn blister skin', 'partial thickness burn blister'], desc: 'Queimadura de 2º grau superficial com vesículas e flictenas ricas em exsudato', sec: 'classificacao' },
    { queries: ['third degree burn eschar', 'full thickness burn skin'], desc: 'Queimadura de 3º grau profunda com escara esbranquiçada e indolor', sec: 'classificacao' },
    { queries: ['rule of nines burn surface area', 'Wallace rule of nines diagram'], desc: 'Diagrama da Regra dos Nove de Wallace para dimensionamento da área queimada', sec: 'parkland' }
  ],
  'obesidade-infantil': [
    { queries: ['acanthosis nigricans neck', 'acanthosis nigricans skin'], desc: 'Hiperpigmentação aveludada em dobras cutâneas por resistência à insulina', sec: 'complicacoes' },
    { queries: ['BMI for age chart WHO', 'growth chart BMI children WHO'], desc: 'Gráfico de percentis e escores-z de IMC para idade infantil', sec: 'diagnostico' }
  ],
  'partograma': [
    { queries: ['partogram labor progress curve', 'partograph labor progress WHO'], desc: 'Partograma com curvas de dilatação e descida da apresentação fetal', sec: 'preenchimento' },
    { queries: ['cervical dilatation vaginal examination labor', 'cervical dilatation obstetrics'], desc: 'Toque obstétrico para determinação da dilatação cervical e variedade de posição', sec: 'dilatacao' }
  ],
  'diabetes-mellitus': [
    { queries: ['diabetic retinopathy fundus photo', 'diabetic fundus retinopathy microaneurysms'], desc: 'Retinografia óptica evidenciando exsudatos e microaneurismas retinianos', sec: 'complicacoes' },
    { queries: ['diabetic foot neuropathic ulcer', 'diabetic foot ulcer plantar'], desc: 'Úlcera neuropática plantar profunda sob cabeça de metatarso no pé diabético', sec: 'pe-diabetico' },
    { queries: ['Semmes Weinstein monofilament test foot', 'monofilament test diabetic foot'], desc: 'Aplicação do monofilamento de 10g para rastreio de perda de sensibilidade protetora', sec: 'pe-diabetico' }
  ],
  'abdome-agudo-abordagem-inicial': [
    { queries: ['pneumoperitoneum abdominal x-ray erect', 'pneumoperitoneum x-ray crescent'], desc: 'Radiografia com ar livre subdiafragmático indicando pneumoperitônio', sec: 'perfurativo' },
    { queries: ['small bowel obstruction air fluid levels x-ray', 'bowel obstruction x-ray'], desc: 'Distensão de alças com níveis hidroaéreos na radiografia simples', sec: 'obstrutivo' },
    { queries: ['acute cholecystitis ultrasound thickening', 'gallbladder wall thickening ultrasound'], desc: 'Ultrassom demonstrando espessamento da parede vesicular e cálculo impactado', sec: 'inflamatorio' }
  ],
  'infeccoes-de-vias-aereas-superiores': [
    { queries: ['streptococcal tonsillitis exudate pharynx', 'tonsillitis exudate pharyngitis'], desc: 'Amigdalite aguda exsudativa com placas esbranquiçadas confluentes', sec: 'faringite' },
    { queries: ['acute otitis media otoscopy', 'otitis media bulging tympanic membrane'], desc: 'Otoscopia com abaulamento, hiperemia e perda de transparência da membrana timpânica', sec: 'otite' },
    { queries: ['croup steeple sign neck x-ray', 'steeple sign croup x-ray'], desc: 'Estreitamento subglótico com sinal da torre na laringite estridulosa (crupe)', sec: 'laringite' }
  ],
  'inducao-do-trabalho-de-parto': [
    { queries: ['Foley catheter', 'Foley balloon catheter', 'cervical ripening Foley'], desc: 'Balão transcervical com cateter de Foley para preparo do colo desfavorável', sec: 'metodos-mecanicos' },
    { queries: ['oxytocin', 'oxytocin ampoule', 'infusion pump IV'], desc: 'Administração escalonada de ocitocina endovenosa em bomba de infusão', sec: 'metodos-farmacologicos' }
  ],
  'cetoacidose-diabetica-e-estado-hiperosmolar': [
    { queries: ['glucometer', 'blood glucose meter', 'ketone meter'], desc: 'Dosagem capilar de glicemia e corpos cetônicos para monitoramento de CAD', sec: 'diagnostico' },
    { queries: ['Kussmaul breathing', 'diabetic ketoacidosis'], desc: 'Padrão respiratório acidótico de Kussmaul compensatório na CAD', sec: 'quadro-clinico' },
    { queries: ['insulin syringe', 'insulin pump', 'insulin regular'], desc: 'Infusão intravenosa de insulina regular para reversão da cetoacidose', sec: 'tratamento' }
  ],
  'apendicite-aguda': [
    { queries: ['acute appendicitis CT scan abdomen', 'appendicitis CT scan axial'], desc: 'Tomografia de abdome revelando apêndice espessado com densificação pericecal', sec: 'diagnostico' },
    { queries: ['laparoscopic appendectomy inflamed appendix', 'laparoscopy acute appendicitis'], desc: 'Apendicectomia videolaparoscópica identificando apêndice flogístico', sec: 'cirurgia' },
    { queries: ['McBurney point tenderness palpation', 'McBurney point abdomen'], desc: 'Dor localizada à palpação no ponto de McBurney e sinal de Blumberg', sec: 'clinica' }
  ],
  'bronquiolite-viral-aguda': [
    { queries: ['infant respiratory distress retractions', 'subcostal retractions infant'], desc: 'Tiragem intercostal e subcostal expressiva no desconforto respiratório do lactente', sec: 'quadro-clinico' },
    { queries: ['bronchiolitis chest x-ray infant', 'bronchiolitis x-ray hyperinflation'], desc: 'Radiografia com hiperinsuflação pulmonar e atelectasias laminares', sec: 'exames' },
    { queries: ['nasal suctioning infant bulb', 'saline nasal irrigation infant'], desc: 'Higiene e desobstrução das vias aéreas com soro fisiológico a 0,9%', sec: 'manejo' }
  ],
  'distocias-e-parto-operatorio': [
    { queries: ['obstetric forceps delivery Simpson', 'obstetric forceps delivery'], desc: 'Fórcipe obstétrico posicionado na apresentação fetal no desprendimento', sec: 'forceps' },
    { queries: ['vacuum extractor delivery obstetric', 'ventouse delivery cup fetal head'], desc: 'Vácuo-extrator obstétrico com cúpula fixada no ponto de flexão', sec: 'vacuo' },
    { queries: ['McRoberts maneuver shoulder dystocia', 'shoulder dystocia maneuver delivery'], desc: 'Manobra de McRoberts para alívio imediato da distocia de ombro fetal', sec: 'distocia-ombro' }
  ],
  'disturbios-da-tireoide': [
    { queries: ['Graves disease ophthalmopathy exophthalmos', 'Graves exophthalmos eyes'], desc: 'Proptose ocular e retração da pálpebra superior na oftalmopatia tireoidiana de Graves', sec: 'hipertireoidismo' },
    { queries: ['goiter thyroid gland neck', 'goiter neck enlargement'], desc: 'Bócio volumoso visível com abaulamento na face anterior da região cervical', sec: 'diagnostico' },
    { queries: ['thyroid ultrasound nodule biopsy', 'thyroid fine needle aspiration FNA'], desc: 'Punção biópsia por agulha fina (PAAF) sob monitoramento ecográfico', sec: 'nodulos' }
  ],
  'colecistite-e-colelitiase': [
    { queries: ['gallstones ultrasound acoustic shadow', 'gallstones ultrasound'], desc: 'Ultrassom evidenciando múltiplos cálculos vesiculares com sombra acústica', sec: 'colelitiase' },
    { queries: ['acute cholecystitis ultrasound thickening fluid', 'acute cholecystitis ultrasound'], desc: 'Colecistite aguda com espessamento mural e halo de líquido perivesicular', sec: 'colecistite' },
    { queries: ['laparoscopic cholecystectomy gallbladder surgery', 'laparoscopic cholecystectomy Calot'], desc: 'Colecistectomia por videolaparoscopia com identificação das vias biliares', sec: 'tratamento' }
  ],
  'pneumonia-na-crianca': [
    { queries: ['tachypnea infant counting respiratory rate', 'counting breaths infant pneumonia'], desc: 'Contagem criteriosa da frequência respiratória do lactente segundo o AIDPI', sec: 'quadro-clinico' },
    { queries: ['round pneumonia x-ray child', 'pediatric round pneumonia chest radiograph'], desc: 'Condensação de contornos arredondados típica de pneumonia redonda na infância', sec: 'diagnostico' },
    { queries: ['pediatric pulse oximetry infant foot', 'pulse oximetry infant toe'], desc: 'Oximetria de pulso pediátrica para detecção precoce de hipoxemia', sec: 'gravidade' }
  ],
  'sofrimento-fetal-e-avaliacao-da-vitalidade-fetal': [
    { queries: ['fetal heart rate deceleration CTG', 'late decelerations cardiotocography'], desc: 'Cardiotocografia demonstrando desacelerações tardias repetidas (DIP II)', sec: 'cardiotocografia' },
    { queries: ['Doppler umbilical artery absent end diastolic flow', 'umbilical artery Doppler ultrasound'], desc: 'Dopplerfluxometria de artéria umbilical com fluxo diastólico ausente (diástole zero)', sec: 'doppler' }
  ],
  'insuficiencia-adrenal-e-sindrome-de-cushing': [
    { queries: ['Addison disease hyperpigmentation palmar creases', 'Addison disease skin hyperpigmentation'], desc: 'Hiperpigmentação cutânea acentuada em pregas palmares na Doença de Addison', sec: 'addison' },
    { queries: ['Cushing syndrome purple striae abdomen', 'Cushing purple abdominal striae'], desc: 'Estrias violáceas largas (> 1 cm) e obesidade centrípeta na Síndrome de Cushing', sec: 'cushing' },
    { queries: ['adrenal CT scan enlargement', 'adrenal gland CT abdomen'], desc: 'Tomografia computadorizada abdominal avaliando topografia e dimensões adrenais', sec: 'diagnostico' }
  ],
  'coledocolitiase-e-colangite': [
    { queries: ['ERCP gallstone removal', 'ERCP common bile duct stone'], desc: 'CPRE com esfincterotomia e extração de cálculo do ducto colédoco com balão', sec: 'cpre' },
    { queries: ['magnetic resonance cholangiopancreatography MRCP stone', 'MRCP common bile duct dilatation'], desc: 'CPRM com falha de enchimento hipointensa intraluminal por coledocolitíase', sec: 'diagnostico' },
    { queries: ['scleral icterus eye jaundice', 'scleral icterus jaundice sclera'], desc: 'Icterícia conjuntival e escleral evidente por hiperbilirrubinemia direta obstrutiva', sec: 'clinica' }
  ]
};
