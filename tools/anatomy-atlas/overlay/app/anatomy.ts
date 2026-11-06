// TRAUBE · Atlas anatômico — sobreposição do anatomy.ts do projeto MIT de origem
// (licença preservada em LICENSE-human-atlas.txt). Sistemas, descrições e
// paleta por tecido em português; nomes das estruturas vêm de pt-names.json.
export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac'|'brain'|'borrowed'|'donor-muscle'|'borrowed-muscle'|'pregnancy'|'mammary';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Esqueleto',color:'#ecdfc4',description:'Os ossos formam a estrutura de sustentação do corpo, protegem órgãos e servem de inserção para os músculos. A medula óssea armazena minerais e produz células do sangue.'},
 {id:'muscular',name:'Músculos',color:'#b84c42',description:'Os músculos esqueléticos produzem movimento ao tracionar suas inserções. Com os tendões, movem articulações, estabilizam a postura e produzem calor.'},
 {id:'cardiac',name:'Coração',color:'#a63f3a',description:'O coração é uma bomba muscular de quatro câmaras. Suas valvas mantêm o sangue em sentido único pelas circulações pulmonar e sistêmica.'},
 {id:'sensory',name:'Órgãos dos sentidos',color:'#b9cfd6',description:'Estruturas dos sentidos especiais, como visão, audição e equilíbrio. Seus tecidos especializados captam estímulos e os transmitem ao sistema nervoso.'},
 {id:'arterial',name:'Artérias',color:'#cf3f36',description:'As artérias levam o sangue para fora do coração: aos tecidos, na circulação sistêmica, ou aos pulmões, na circulação pulmonar.'},
 {id:'venous',name:'Veias',color:'#3f6fd1',description:'As veias devolvem o sangue ao coração. Redes superficiais e profundas drenam os tecidos; as veias pulmonares trazem sangue oxigenado dos pulmões.'},
 {id:'brain',name:'Encéfalo por regiões',color:'#d9b3a6',description:'O encéfalo dividido em regiões selecionáveis: giros e lobos do córtex, núcleos da base, tálamo, hipocampo, tronco encefálico e cerebelo. Use o corte para ver as estruturas profundas.'},
 {id:'nervous',name:'Sistema nervoso',color:'#e2bf5c',description:'Encéfalo, medula espinal e nervos periféricos conduzem e processam sinais, permitindo sensibilidade, movimento, coordenação e regulação automática das funções do corpo.'},
 {id:'respiratory',name:'Respiratório',color:'#d79a9c',description:'As vias aéreas conduzem o ar até os pulmões, onde oxigênio e gás carbônico são trocados entre o ar e o sangue. A ventilação depende das variações de pressão geradas pelos músculos respiratórios.'},
 {id:'digestive',name:'Digestório',color:'#d08f76',description:'O tubo digestório degrada os alimentos, absorve nutrientes e água e conduz os resíduos. Os órgãos anexos fornecem bile e enzimas digestivas.'},
 {id:'urinary',name:'Urinário',color:'#9a4334',description:'Os rins filtram o sangue e regulam água, eletrólitos e equilíbrio ácido-básico. A urina segue pelos ureteres até a bexiga e sai pela uretra.'},
 {id:'lymphatic',name:'Linfático',color:'#8fae7a',description:'Os vasos linfáticos devolvem o excesso de líquido intersticial à circulação. Linfonodos e outros órgãos linfoides participam da vigilância e da resposta imune.'},
 {id:'endocrine',name:'Endócrino',color:'#c7894f',description:'Os órgãos endócrinos liberam hormônios no sangue para coordenar metabolismo, crescimento, resposta ao estresse e reprodução.'},
 {id:'reproductive',name:'Genital',color:'#c99583',description:'Os órgãos genitais produzem os gametas e os hormônios sexuais. No corpo masculino, testículos, vias espermáticas, próstata e pênis; no feminino, ovários, tubas uterinas, útero e vagina.'},
 {id:'mammary',name:'Mamas',color:'#bf8088',description:'Glândulas mamárias e tecidos ao redor.'},
 {id:'integumentary',name:'Superfície corporal',color:'#c9a68a',description:'A superfície do corpo serve de referência anatômica externa. O sistema tegumentar forma uma barreira protetora e participa da sensibilidade e da termorregulação.'},
 {id:'borrowed',name:'Ossos complementares',color:'#b9c2c9',description:'O modelo feminino de referência não traz crânio, costelas, membros superiores nem pés. Esses ossos vêm do corpo masculino de referência, ajustados por escala e posição aos ossos que os dois corpos compartilham. Servem de referência de forma e posição, não como anatomia própria deste corpo.'},
 {id:'donor-muscle',name:'Músculos do membro inferior',color:'#a8776e',description:'Músculos do quadril, da coxa e da perna de uma segunda mulher de referência (Visible Human feminino), ajustados aos ossos deste corpo. O modelo feminino original quase não traz músculos.'},
 {id:'borrowed-muscle',name:'Músculos complementares',color:'#b05a50',description:'Músculos do tronco, da parede abdominal, do dorso, do pescoço, da face e dos membros superiores trazidos do corpo masculino de referência e ajustados osso a osso a este corpo. O modelo feminino original quase não traz músculos; estes servem de referência de forma e posição, não como anatomia própria desta pessoa.'},
 {id:'pregnancy',name:'Gestação',color:'#c8a6ae',description:'Placenta, membranas e cordão umbilical de uma referência de gestação. Não fazem parte do corpo não gestante e começam ocultos.'},
 {id:'connective',name:'Tecido conjuntivo',color:'#c3d1cc',description:'Cartilagens, ligamentos e outros tecidos conjuntivos sustentam, unem e separam estruturas, estabilizando articulações e distribuindo cargas mecânicas.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export type Sex='male'|'female';
export interface Atlas {version:string;sex?:Sex;source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export type CutAxis='none'|'sagittal'|'coronal'|'transverse';
export interface SceneState {inspectorOpen?:boolean;flow?:boolean;ghost?:number;hidden:string[];cutAxis:CutAxis;cut:number;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','brain','borrowed','donor-muscle','borrowed-muscle','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];

// ---- Nomes em português -------------------------------------------------
let PT_NAMES:Record<string,string> = {};
export function setPtNames(map:Record<string,string>){PT_NAMES=map||{};}
/** Nome em português; cai no termo original quando faltar tradução. */
export function ptName(name:string){return PT_NAMES[name] ?? name;}
const fold=(s:string)=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
/** Texto de busca: português sem acento + termo original em inglês. */
export function searchKey(name:string){return fold(ptName(name))+' | '+name.toLowerCase();}
export function normalizeQuery(q:string){return fold(q).trim();}

// ---- Descrições (chave = nome original em inglês, minúsculo, sem lado) ----
export const EXPLANATIONS:Record<string,string> = {
 'heart':'Bomba muscular no mediastino médio. O lado direito envia sangue aos pulmões; o lado esquerdo impulsiona o sangue para a circulação sistêmica.',
 'liver':'Maior glândula do corpo, sob a cúpula direita do diafragma. Processa nutrientes absorvidos, produz bile e sintetiza muitas proteínas do plasma.',
 'brain':'Órgão central do sistema nervoso. Suas regiões interligadas sustentam percepção, movimento, memória, linguagem e a regulação das funções do corpo.',
 'stomach':'Câmara muscular entre o esôfago e o duodeno. Armazena o alimento e o mistura com ácido e enzimas antes de liberá-lo ao intestino delgado.',
 'spleen':'Órgão linfoide no quadrante superior esquerdo. Filtra o sangue, remove hemácias envelhecidas e participa da resposta imune.',
 'pancreas':'Órgão retroperitoneal com funções digestiva e endócrina. Secreta enzimas no duodeno e hormônios como insulina e glucagon.',
 'urinary bladder':'Reservatório muscular na pelve que armazena a urina que chega dos rins pelos ureteres.',
 'trachea':'Via aérea principal entre a laringe e os brônquios. Anéis de cartilagem em forma de C a mantêm aberta durante a respiração.',
 'diaphragm':'Músculo em cúpula que separa tórax e abdome. Ao se contrair, aumenta o volume torácico e é o principal músculo da inspiração.',
 'kidney':'Órgão retroperitoneal que filtra o plasma, forma a urina e regula volume, eletrólitos, pH e pressão arterial; também produz eritropoetina.',
 'lung':'Órgão da troca gasosa. Os alvéolos oferecem uma grande superfície fina onde oxigênio entra e gás carbônico sai do sangue.',
 'esophagus':'Tubo muscular que leva o alimento da faringe ao estômago por ondas peristálticas, atravessando o diafragma no hiato esofágico.',
 'small intestine':'Principal local de digestão e absorção. Pregas, vilosidades e microvilosidades ampliam muito a superfície absortiva.',
 'large intestine':'Absorve água e eletrólitos, abriga a microbiota e forma e armazena as fezes até a evacuação.',
 'gallbladder':'Bolsa sob o fígado que armazena e concentra a bile, liberada no duodeno após as refeições.',
 'aorta':'Maior artéria do corpo. Recebe o sangue do ventrículo esquerdo e o distribui para toda a circulação sistêmica.',
 'inferior vena cava':'Grande veia que devolve ao átrio direito o sangue da metade inferior do corpo.',
 'superior vena cava':'Veia que devolve ao átrio direito o sangue da cabeça, do pescoço, dos membros superiores e do tórax.',
 'pulmonary trunk':'Artéria que sai do ventrículo direito e se divide nas artérias pulmonares, levando sangue pouco oxigenado aos pulmões.',
 'spinal cord':'Parte do sistema nervoso central dentro do canal vertebral; conduz sinais entre o encéfalo e o corpo e integra reflexos.',
 'cerebellum':'Parte posterior do encéfalo que coordena movimento, postura e equilíbrio e participa da aprendizagem motora.',
 'femur':'Osso da coxa, o mais longo do corpo. Articula-se com o quadril e o joelho e sustenta o peso corporal.',
 'skull':'Conjunto de ossos da cabeça que protege o encéfalo e sustenta a face e os órgãos dos sentidos.',
 'vertebral column':'Eixo ósseo formado pelas vértebras; sustenta o tronco, protege a medula espinal e permite os movimentos do tronco.',
 'sternum':'Osso plano na linha média anterior do tórax, onde se articulam as clavículas e as cartilagens costais.',
 'rib cage':'Costelas, cartilagens costais, esterno e vértebras torácicas: protege os órgãos do tórax e participa da respiração.',
 'eyeball':'Órgão da visão: as túnicas fibrosa, vascular e nervosa (retina) envolvem a lente e o corpo vítreo.',
 'prostate':'Glândula abaixo da bexiga que envolve a uretra e produz parte do líquido seminal.',
 'testis':'Gônada masculina que produz espermatozoides e testosterona.',
 'ureter':'Tubo muscular que conduz a urina do rim até a bexiga por peristaltismo.',
 'adrenal gland':'Glândula sobre o polo superior do rim: o córtex produz corticosteroides e a medula produz adrenalina e noradrenalina.',
 'appendix':'Pequeno divertículo do ceco, rico em tecido linfoide.',
 'portal vein':'Veia que leva ao fígado o sangue do trato digestório e do baço, rico em nutrientes absorvidos.',
 'coronary arteries':'Artérias que irrigam o próprio coração, saindo dos seios da aorta logo acima da valva aórtica. A oclusão de um ramo causa infarto do território que ele nutre.',
 'coronary artery':'Artéria coronária: tronco que nasce do seio da aorta e se divide nos ramos que irrigam o miocárdio.',
 'circumflex artery':'Artéria circunflexa: ramo da coronária esquerda que percorre o sulco atrioventricular esquerdo e irriga a parede lateral e posterior do ventrículo esquerdo (ramos marginais).',
 'anterior descending artery':'Artéria descendente anterior (interventricular anterior): ramo da coronária esquerda no sulco interventricular anterior; irriga a parede anterior do ventrículo esquerdo e os dois terços anteriores do septo.',
 'cardiac veins':'Veias do coração: drenam o miocárdio para o seio coronário, que desemboca no átrio direito.',
 'coronary sinus':'Seio coronário: grande veia no sulco atrioventricular posterior que recebe as veias cardíacas e desemboca no átrio direito.',
 'rectus abdominis':'Músculo longo e vertical de cada lado da linha alba, do púbis às cartilagens costais 5–7. As intersecções tendíneas dividem o ventre em segmentos. Flete o tronco e aumenta a pressão abdominal.',
 'internal abdominal oblique':'Camada média da parede anterolateral do abdome. Suas fibras correm em sentido oposto às do oblíquo externo; flete e roda o tronco e comprime as vísceras.',
 'external oblique':'Camada mais superficial da parede anterolateral do abdome, com fibras para baixo e para a frente. Sua aponeurose forma o ligamento inguinal.',
 'external abdominal oblique':'Camada mais superficial da parede anterolateral do abdome, com fibras para baixo e para a frente. Sua aponeurose forma o ligamento inguinal.',
 'transversus abdominis':'Camada mais profunda da parede anterolateral do abdome, com fibras horizontais. Funciona como uma cinta que comprime as vísceras e estabiliza a coluna lombar.',
 'pyramidalis':'Pequeno músculo triangular à frente da parte inferior do reto do abdome, que tensiona a linha alba. Pode estar ausente.',
 'quadratus lumborum':'Músculo da parede posterior do abdome, entre a 12ª costela, as vértebras lombares e a crista ilíaca. Inclina o tronco e fixa a 12ª costela na inspiração.',
 'latissimus dorsi':'Grande músculo plano do dorso que vai da coluna toracolombar e da crista ilíaca ao úmero. Estende, aduz e roda medialmente o braço.',
 'lungs':'Órgãos da troca gasosa. O pulmão direito tem três lobos (superior, médio e inferior) e o esquerdo, dois (superior, com a língula, e inferior).',
 'superior lobe of lung':'Lobo superior do pulmão, separado do lobo inferior pela fissura oblíqua (e, à direita, do lobo médio pela fissura horizontal).',
 'middle lobe of lung':'Lobo exclusivo do pulmão direito, entre as fissuras horizontal e oblíqua. Ausculta-se na região anterior, próximo ao esterno.',
 'inferior lobe of lung':'Lobo inferior do pulmão, abaixo e atrás da fissura oblíqua. Ocupa a maior parte da face posterior e da base do pulmão.',
 'thyroid gland':'Glândula endócrina na frente da traqueia, com dois lobos ligados pelo istmo. Produz T3, T4 e calcitonina.',
 'superior parathyroid gland':'Pequena glândula na face posterior da tireoide. Produz paratormônio, que regula o cálcio e o fósforo do sangue.',
 'inferior parathyroid gland':'Pequena glândula na face posterior da tireoide. Produz paratormônio, que regula o cálcio e o fósforo do sangue.',
 'thalamus':'Massa de núcleos no diencéfalo que retransmite informações sensitivas e motoras para o córtex cerebral.',
 'hippocampus':'Estrutura do lobo temporal medial essencial para formar novas memórias declarativas e para a orientação espacial.',
 'putamen':'Núcleo da base que, com o núcleo caudado, forma o estriado e participa do controle e do aprendizado de movimentos.',
 'corpus callosum':'Maior comissura do encéfalo: um feixe de fibras que liga os dois hemisférios cerebrais.',
 'substantia nigra':'Núcleo do mesencéfalo cujos neurônios dopaminérgicos ajudam a controlar os movimentos; sua perda causa a doença de Parkinson.',
 'primary motor cortex':'Giro pré-central do lobo frontal, onde se originam os comandos dos movimentos voluntários do lado oposto do corpo.',
 'postcentral gyrus':'Córtex somatossensitivo primário, no lobo parietal: recebe tato, dor, temperatura e propriocepção do lado oposto.',
 'trigone of urinary bladder':'Área triangular lisa no fundo da bexiga, entre os dois óstios dos ureteres e o óstio interno da uretra.',
 'uterus':'Órgão muscular oco da pelve feminina, onde o embrião se implanta e se desenvolve. Divide-se em fundo, corpo e colo.',
 'body of uterus':'Parte principal do útero, entre o fundo e o istmo. Sua parede tem endométrio, miométrio e perimétrio.',
 'fundus of uterus':'Parte arredondada do útero acima da entrada das tubas uterinas. A altura do fundo é medida no acompanhamento da gestação.',
 'cervix':'Colo do útero: porção inferior e estreita que se projeta na vagina. Local do rastreamento do câncer de colo.',
 'ovary':'Gônada feminina que produz os ovócitos e os hormônios estrogênio e progesterona.',
 'vagina':'Canal fibromuscular entre o colo do útero e o vestíbulo; via do parto e da menstruação.',
 'mammary gland':'Glândula da mama, formada por lobos que drenam por ductos lactíferos até a papila mamária.',
 'parotid gland':'Maior glândula salivar, à frente da orelha. Seu ducto se abre na boca, junto ao segundo molar superior.',
 'soft palate':'Parte muscular posterior do palato. Eleva-se na deglutição e na fala para fechar a nasofaringe.',
 'uvula of palate':'Projeção que pende da borda livre do palato mole.',
};
// Descrições por padrão de nome (estruturas com muitas partes numeradas ou com lado).
const PATTERNS:[RegExp,string][]=[
 [/segment of liver/,'Segmento hepático de Couinaud: território com ramos próprios da veia porta, da artéria hepática e do ducto biliar. Por isso pode ser ressecado isoladamente.'],
 [/^renal pyramid/,'Pirâmide renal: parte da medula com os túbulos coletores e as alças de Henle. O ápice forma a papila, que drena urina para um cálice menor.'],
 [/^renal papilla/,'Papila renal: ápice da pirâmide renal, onde os ductos papilares liberam a urina no cálice menor.'],
 [/minor calyx/,'Cálice menor: recebe a urina de uma ou mais papilas renais e a conduz ao cálice maior.'],
 [/major calyx/,'Cálice maior: junta vários cálices menores e desemboca na pelve renal.'],
 [/^renal pelvis/,'Pelve renal: funil que reúne os cálices maiores e continua como ureter.'],
 [/renal column/,'Coluna renal: córtex que se insinua entre as pirâmides, por onde passam as artérias interlobares.'],
 [/cortex of kidney/,'Córtex renal: camada externa do rim, com os glomérulos e os túbulos contorcidos.'],
 [/kidney capsule/,'Cápsula renal: lâmina fibrosa que reveste a superfície do rim.'],
 [/hilum of kidney/,'Hilo renal: entrada na margem medial do rim por onde passam artéria, veia, pelve renal, nervos e linfáticos.'],
 [/zone of prostate|fibromuscular stroma/,'Região da próstata. A zona periférica é a sede da maioria dos carcinomas; a zona de transição, da hiperplasia prostática benigna.'],
 [/bronchopulmonary segment/,'Segmento broncopulmonar: unidade do pulmão ventilada por um brônquio segmentar e irrigada por um ramo da artéria pulmonar. Base das ressecções segmentares.'],
 [/papillary muscle/,'Músculo papilar: projeção do miocárdio ventricular presa às cordas tendíneas, que impede a eversão das valvas atrioventriculares.'],
 [/gyrus|gyri|lobule|operculum|pole/,'Região do córtex cerebral. Os giros aumentam a superfície do córtex, que processa percepção, movimento, linguagem e pensamento.'],
 [/nucleus|nuclei|nuclear complex/,'Núcleo do encéfalo: aglomerado de corpos de neurônios com função específica de retransmissão ou controle.'],
 [/ventricle/,'Cavidade do sistema ventricular do encéfalo, preenchida por líquido cerebrospinal.'],
 [/white matter|tract|radiation|peduncle|commissure|fornix/,'Substância branca: feixes de axônios que ligam regiões do sistema nervoso.'],
 [/uterine tube|fimbriae|infundibulum|ampulla of uterine/,'Tuba uterina: capta o ovócito liberado pelo ovário; a fecundação ocorre geralmente na ampola.'],
 [/ligament of uterus|uterosacral|cardinal ligament|broad ligament|ovarian ligament|suspensory ligament of ovary|mesovarium|mesosalpinx/,'Ligamento ou prega peritoneal que sustenta o útero, as tubas e os ovários na pelve.'],
 [/wall of uterus|uterine segment/,'Parede do útero, formada por endométrio, miométrio e perimétrio.'],
 [/lactiferous|mammary lobes|areola|nipple/,'Estrutura da mama: os lobos produzem leite, que segue por ductos e seios lactíferos até a papila mamária.'],
];
const romanOrLetter=/ (?:[ivx]+|[a-k])$/;
const baseName=(name:string)=>name.toLowerCase().replace(/ ?\((?:left|right)\)/g,'').replace(/\b(left|right)\b ?/g,'').trim().replace(romanOrLetter,'').trim();
const byPattern=(name:string)=>{const b=baseName(name);return PATTERNS.find(([re])=>re.test(b))?.[1];};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[baseName(name)] ?? byPattern(name) ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
export function hasExplanation(name:string){return !!(EXPLANATIONS[baseName(name)]??byPattern(name));}

// ---- Aparência por tecido ----------------------------------------------
// Cor (sRGB) e rugosidade por tipo de tecido, escolhidas pelo nome da peça.
type Tissue={color:string;rough:number};
const TISSUES:[RegExp,Tissue][]=[
 [/tooth|incisor|canine|molar/, {color:'#f1ece0',rough:.28}],
 [/intervertebral disk|articular disk/, {color:'#cddbd5',rough:.4}],
 [/cartilage|conus elasticus/, {color:'#cfe0e6',rough:.34}],
 [/tendon|ligament|retinaculum|aponeuro|fascia|raphe|iliotibial tract|membrane|linea alba|tarsal plate|tendinous/, {color:'#dcd3c0',rough:.42}],
 [/valve|leaflet|cusp/, {color:'#e4c7b2',rough:.38}],
 [/aorta|arter|pulmonary trunk/, {color:'#cf3f36',rough:.32}],
 [/liver|hepatovenous|caudate lobe/, {color:'#9b4a40',rough:.42}],
 [/portal/, {color:'#6a5fc0',rough:.34}],
 [/vein|vena|venous|coronary sinus/, {color:'#3f6fd1',rough:.34}],
 [/ventricular system|aqueduct|third ventricle|fourth ventricle|lateral ventricle|interventricular foramen/, {color:'#8db8cc',rough:.3}],
 [/myocard|ventricle of heart|\bventricle\b(?!.*(brain|neuraxis))|atrium|papillary|heart|cardiac chamber|interventricular septum/, {color:'#a8423b',rough:.5}],
 // Rim por dentro (córtex, pirâmides, papilas, cálices) e órgãos genitais femininos:
 // antes das regras do encéfalo, que também usam "cortex" e "medulla".
 [/renal pyramid|renal medulla/, {color:'#7c2b26',rough:.46}],
 [/renal papilla/, {color:'#b85b4f',rough:.42}],
 [/calyx|renal pelvis|hilum of kidney/, {color:'#e3c4a2',rough:.4}],
 [/kidney capsule/, {color:'#c86a55',rough:.36}],
 [/kidney|renal column/, {color:'#a8402f',rough:.42}],
 [/lymph node/, {color:'#8fae7a',rough:.48}],
 [/uterus|uterine wall|cervix|cervical os|lower uterine segment|cervicovaginal/, {color:'#c46f6a',rough:.46}],
 [/ovary/, {color:'#e3b8a8',rough:.5}],
 [/uterine tube|fallopian|fimbriae|ampulla of uterine/, {color:'#d99a8e',rough:.44}],
 [/vagina/, {color:'#cf8a84',rough:.46}],
 [/placenta|umbilical|amnion|chorionic/, {color:'#8e3a4a',rough:.45}],
 [/mammary|lactiferous|areola|nipple/, {color:'#efc9ae',rough:.55}],
 [/nerve|ganglion|chiasm|optic tract/, {color:'#f0cf5a',rough:.5}],
 [/white matter|corpus callosum|internal capsule|fornix|commissure/, {color:'#f2e4d8',rough:.55}],
 [/cerebell/, {color:'#d39a8c',rough:.58}],
 [/spinal cord/, {color:'#efdcbc',rough:.55}],
 [/gyrus|cortex|lobe of cerebral|cerebral hemisphere|insula|hippocamp|amygdala|thalam|nucleus|putamen|globus|brainstem|pons|medulla oblongata|midbrain|colliculus|brain|habenula|mammillary|tuber cinereum/, {color:'#ecc0aa',rough:.6}],
 [/bronchopulmonary segment|lobe of (left|right) lung|lung (upper|middle|lower) lobe/, {color:'#e0938d',rough:.55}],
 [/bronch|trachea/, {color:'#c9bfd6',rough:.4}],
 [/lung|pulmo/, {color:'#e0938d',rough:.55}],
 [/gallbladder/, {color:'#7c8a3a',rough:.36}],
 [/bile|cystic duct|biliary/, {color:'#c9a640',rough:.36}],
 [/pancrea/, {color:'#ecc08a',rough:.55}],
 [/spleen/, {color:'#94384f',rough:.45}],
 [/stomach/, {color:'#df9a88',rough:.45}],
 [/esophag/, {color:'#d4887a',rough:.45}],
 [/duoden|jejun|ileum|ileal|small intestine/, {color:'#e8a090',rough:.45}],
 [/colon|cecum|rectum|appendix|large intestine|taenia|mesocolon/, {color:'#d98a78',rough:.48}],
 [/ureteral orifice/, {color:'#7a2630',rough:.4}],
 [/trigone of urinary bladder|bladder neck/, {color:'#c9656a',rough:.42}],
 [/bladder/, {color:'#e2a991',rough:.45}],
 [/ureter|urethra/, {color:'#d4ad8d',rough:.45}],
 [/adrenal/, {color:'#e0a856',rough:.5}],
 [/thyroid gland|parathyroid/, {color:'#b4503f',rough:.45}],
 [/pituitary|pineal/, {color:'#d39a7a',rough:.45}],
 [/thymus/, {color:'#e0bf9f',rough:.5}],
 [/sclera/, {color:'#f1efe8',rough:.35}],
 [/cornea|lens|vitreous/, {color:'#cfe2ea',rough:.12}],
 [/\biris\b/, {color:'#5f83a6',rough:.35}],
 [/retina|choroid/, {color:'#b5524a',rough:.4}],
 [/testis|epididym/, {color:'#dfb3a4',rough:.45}],
 [/prostate|seminal/, {color:'#c88771',rough:.45}],
 [/penis|glans|corpus cavernosum|corpus spongiosum/, {color:'#c99886',rough:.45}],
 [/tongue/, {color:'#c9776f',rough:.5}],
 [/gingiva|\blip\b|palate|uvula/, {color:'#d38a83',rough:.45}],
 [/gland/, {color:'#d7a37f',rough:.5}],
 [/hair|eyebrow/, {color:'#3d2f28',rough:.7}],
];
const BY_SYSTEM:Record<SystemId,Tissue>={
 skeletal:{color:'#ecdfc4',rough:.62},muscular:{color:'#b84c42',rough:.55},cardiac:{color:'#a8423b',rough:.5},
 sensory:{color:'#b9cfd6',rough:.4},arterial:{color:'#cf3f36',rough:.32},venous:{color:'#3f6fd1',rough:.34},
 nervous:{color:'#e2bf5c',rough:.5},respiratory:{color:'#d79a9c',rough:.5},digestive:{color:'#d08f76',rough:.46},
 urinary:{color:'#9a4334',rough:.44},lymphatic:{color:'#8fae7a',rough:.48},endocrine:{color:'#c7894f',rough:.48},
 reproductive:{color:'#c99583',rough:.46},brain:{color:'#d9b3a6',rough:.6},borrowed:{color:'#ecdfc4',rough:.62},'donor-muscle':{color:'#b84c42',rough:.55},'borrowed-muscle':{color:'#b84c42',rough:.55},pregnancy:{color:'#8e3a4a',rough:.45},integumentary:{color:'#c9a68a',rough:.6},connective:{color:'#c3d1cc',rough:.42},
};
function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0)/4294967295;}
const MUSCLE_RE=/fibularis|tibialis|subscapularis|teres|deltoid|biceps|triceps|gluteus|rectus|oblique|obliquus|transversus|intercostal|flexor|extensor|abductor|adductor|soleus|gastrocnemius|psoas|iliacus|pectoralis|latissimus|trapezius|serratus|rhomboid|levator|sartorius|gracilis|vastus|pectineus|piriformis|gemellus|obturator (?:internus|externus)|quadratus|popliteus|plantaris|supinator|pronator|brachialis|brachioradialis|anconeus|coracobrachialis|scalenus|sternocleidomastoid|platysma|digastric|mylohyoid|masseter|temporalis|splenius|semispinalis|longissimus|iliocostalis|multifidus|rotator|interspinal|intertransvers|lumbrical|interosseous of|interossei|opponens|palmaris|tensor|infraspinatus|supraspinatus|diaphragm|constrictor|genioglossus|geniohyoid|hyoglossus|stylohyoid|stylopharyngeus|omohyoid|sternohyoid|sternothyroid|thyrohyoid$|cricothyroid|crico-arytenoid|aryepiglotticus|thyro-arytenoid|transverse arytenoid|oblique arytenoid|vocalis|uvular muscle|palatopharyngeus|salpingopharyngeus|coccygeus|iliococcygeus|pubococcygeus|puborectalis|subclavius|longus colli|longus capitis|semimembranosus|semitendinosus|biceps femoris|quadriceps|hamstring|muscle/;
const NOT_MUSCLE_RE=/tendon|ligament|membrane|cartilage|nerve|arter|vein|vena|retinaculum|trochlea|aponeuro|raphe|tract|linea|fascia(?!e? latae)|check ligament|tendinous|papillary|heart|ventricle|atrium|myocard/;
const MUSCLE:Tissue={color:'#b84c42',rough:.55};
/** Tipo de microtextura procedural usado no shader (0 liso … 6 encéfalo). */
export const DETAIL={smooth:0,bone:1,muscle:2,organ:3,vessel:4,fibrous:5,brain:6,stomach:7,smallIntestine:8,colon:9} as const;
function detailKind(part:Pick<Part,'name'|'system'>,t:Tissue|undefined):number{
 const n=part.name.toLowerCase();
 if(/tooth|incisor|canine|molar|lens|cornea|vitreous|cartilage|disk|valve|leaflet|cusp|ventricular system|aqueduct|third ventricle|fourth ventricle|lateral ventricle|interventricular foramen/.test(n))return DETAIL.smooth;
 if(!t&&(part.system==='skeletal'||part.system==='borrowed'))return DETAIL.bone;
 if(part.system==='donor-muscle'||part.system==='borrowed-muscle')return DETAIL.muscle;
 if(part.system==='brain')return /white matter|corpus callosum|fornix|commissure|tract|radiation|ventricle|aqueduct|canal/.test(n)?DETAIL.smooth:DETAIL.brain;
 if((!t&&part.system==='muscular')||t===MUSCLE)return DETAIL.muscle;
 if(/tendon|ligament|fascia|aponeuro|retinaculum|raphe|membrane|tract|linea|tendinous|tarsal plate/.test(n))return DETAIL.fibrous;
 // Órgãos ocos: por dentro (no corte) mostram a mucosa própria de cada segmento.
 if(/stomach|esophag|urinary bladder|fundus of urinary bladder|bladder dome/.test(n)&&!/artery|vein|nerve|lymph/.test(n))return DETAIL.stomach;
 if(/duoden|jejun|ileum|small intestine|gallbladder/.test(n)&&!/artery|vein|nerve|lymph/.test(n))return DETAIL.smallIntestine;
 if(/colon|caecum|cecum|rectum|ileocecal|appendix|sigmoid/.test(n)&&!/artery|vein|nerve|lymph|mesocolon|taenia/.test(n))return DETAIL.colon;
 if(/liver|hepatovenous|caudate lobe/.test(n))return DETAIL.organ;
 if(/arter|aorta|vein|vena|venous|portal|coronary|sinus/.test(n)||part.system==='arterial'||part.system==='venous')return DETAIL.vessel;
 if(/myocard|ventricle|atrium|papillary|heart/.test(n)||part.system==='cardiac')return DETAIL.muscle;
 if(part.system==='nervous'&&/gyrus|cortex|lobe|hemisphere|cerebell|brain|insula|hippocamp/.test(n))return DETAIL.brain;
 if(part.system==='integumentary'||part.system==='nervous')return DETAIL.smooth;
 return DETAIL.organ;
}
/** Cor sRGB [0..255], rugosidade [0..1] e microtextura para uma peça do atlas. */
export function partAppearance(part:Pick<Part,'id'|'name'|'system'>):{rgb:[number,number,number];rough:number;detail:number}{
 const n=part.name.toLowerCase();
 let tissue:Tissue|undefined;
 // Ossos ficam com a cor de osso, exceto cartilagens, discos e dentes.
 if(MUSCLE_RE.test(n)&&!NOT_MUSCLE_RE.test(n))tissue=MUSCLE;
 else for(const [re,t] of TISSUES){if(re.test(n)){tissue=t;break;}}
 // Nos músculos, só tecido fibroso (tendão, fáscia…) muda de cor.
 if((part.system==='muscular'||part.system==='borrowed-muscle')&&tissue&&!/tendon|fascia|aponeuro|retinaculum|ligament|raphe|tract|linea|tendinous/.test(n))tissue=undefined;
 const t=tissue??BY_SYSTEM[part.system]??{color:'#aebbb8',rough:.5};
 const hex=parseInt(t.color.slice(1),16);
 // Variação sutil (±5%) para separar peças vizinhas do mesmo tecido.
 const k=1+(hash(part.id)-.5)*.1;
 const c=(v:number)=>Math.max(0,Math.min(255,Math.round(v*k)));
 return {rgb:[c(hex>>16&255),c(hex>>8&255),c(hex&255)],rough:t.rough,detail:detailKind(part,tissue)};
}
