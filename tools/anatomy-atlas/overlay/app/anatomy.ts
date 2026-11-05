// TRAUBE · Atlas anatômico — sobreposição do anatomy.ts do projeto MIT de origem
// (licença preservada em LICENSE-human-atlas.txt). Sistemas, descrições e
// paleta por tecido em português; nomes das estruturas vêm de pt-names.json.
export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Esqueleto',color:'#ecdfc4',description:'Os ossos formam a estrutura de sustentação do corpo, protegem órgãos e servem de inserção para os músculos. A medula óssea armazena minerais e produz células do sangue.'},
 {id:'muscular',name:'Músculos',color:'#b84c42',description:'Os músculos esqueléticos produzem movimento ao tracionar suas inserções. Com os tendões, movem articulações, estabilizam a postura e produzem calor.'},
 {id:'cardiac',name:'Coração',color:'#a63f3a',description:'O coração é uma bomba muscular de quatro câmaras. Suas valvas mantêm o sangue em sentido único pelas circulações pulmonar e sistêmica.'},
 {id:'sensory',name:'Órgãos dos sentidos',color:'#b9cfd6',description:'Estruturas dos sentidos especiais, como visão, audição e equilíbrio. Seus tecidos especializados captam estímulos e os transmitem ao sistema nervoso.'},
 {id:'arterial',name:'Artérias',color:'#cf3f36',description:'As artérias levam o sangue para fora do coração: aos tecidos, na circulação sistêmica, ou aos pulmões, na circulação pulmonar.'},
 {id:'venous',name:'Veias',color:'#3f6fd1',description:'As veias devolvem o sangue ao coração. Redes superficiais e profundas drenam os tecidos; as veias pulmonares trazem sangue oxigenado dos pulmões.'},
 {id:'nervous',name:'Sistema nervoso',color:'#e2bf5c',description:'Encéfalo, medula espinal e nervos periféricos conduzem e processam sinais, permitindo sensibilidade, movimento, coordenação e regulação automática das funções do corpo.'},
 {id:'respiratory',name:'Respiratório',color:'#d79a9c',description:'As vias aéreas conduzem o ar até os pulmões, onde oxigênio e gás carbônico são trocados entre o ar e o sangue. A ventilação depende das variações de pressão geradas pelos músculos respiratórios.'},
 {id:'digestive',name:'Digestório',color:'#d08f76',description:'O tubo digestório degrada os alimentos, absorve nutrientes e água e conduz os resíduos. Os órgãos anexos fornecem bile e enzimas digestivas.'},
 {id:'urinary',name:'Urinário',color:'#9a4334',description:'Os rins filtram o sangue e regulam água, eletrólitos e equilíbrio ácido-básico. A urina segue pelos ureteres até a bexiga e sai pela uretra.'},
 {id:'lymphatic',name:'Linfático',color:'#8fae7a',description:'Os vasos linfáticos devolvem o excesso de líquido intersticial à circulação. Linfonodos e outros órgãos linfoides participam da vigilância e da resposta imune.'},
 {id:'endocrine',name:'Endócrino',color:'#c7894f',description:'Os órgãos endócrinos liberam hormônios no sangue para coordenar metabolismo, crescimento, resposta ao estresse e reprodução.'},
 {id:'reproductive',name:'Genital',color:'#c99583',description:'As estruturas genitais masculinas representadas aqui participam da produção, maturação e transporte dos espermatozoides e da produção de hormônios sexuais.'},
 {id:'integumentary',name:'Superfície corporal',color:'#c9a68a',description:'A superfície do corpo serve de referência anatômica externa. O sistema tegumentar forma uma barreira protetora e participa da sensibilidade e da termorregulação.'},
 {id:'connective',name:'Tecido conjuntivo',color:'#c3d1cc',description:'Cartilagens, ligamentos e outros tecidos conjuntivos sustentam, unem e separam estruturas, estabilizando articulações e distribuindo cargas mecânicas.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export type CutAxis='none'|'sagittal'|'coronal'|'transverse';
export interface SceneState {inspectorOpen?:boolean;ghost?:number;hidden:string[];cutAxis:CutAxis;cut:number;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];

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
};
const baseName=(name:string)=>name.toLowerCase().replace(/\b(left|right)\b ?/g,'').trim();
export function explanation(name:string,system:SystemId){return EXPLANATIONS[baseName(name)] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
export function hasExplanation(name:string){return !!EXPLANATIONS[baseName(name)];}

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
 [/myocard|ventricle of heart|\bventricle\b(?!.*(brain|neuraxis))|atrium|papillary|heart|cardiac chamber/, {color:'#a8423b',rough:.5}],
 [/nerve|ganglion|chiasm|optic tract/, {color:'#f0cf5a',rough:.5}],
 [/white matter|corpus callosum|internal capsule|fornix|commissure/, {color:'#f2e4d8',rough:.55}],
 [/cerebell/, {color:'#d39a8c',rough:.58}],
 [/spinal cord/, {color:'#efdcbc',rough:.55}],
 [/gyrus|cortex|lobe of cerebral|cerebral hemisphere|insula|hippocamp|amygdala|thalam|nucleus|putamen|globus|brainstem|pons|medulla oblongata|midbrain|colliculus|brain|habenula|mammillary|tuber cinereum/, {color:'#ecc0aa',rough:.6}],
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
 [/kidney/, {color:'#a8402f',rough:.42}],
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
 reproductive:{color:'#c99583',rough:.46},integumentary:{color:'#c9a68a',rough:.6},connective:{color:'#c3d1cc',rough:.42},
};
function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0)/4294967295;}
const MUSCLE_RE=/fibularis|tibialis|subscapularis|teres|deltoid|biceps|triceps|gluteus|rectus|oblique|obliquus|transversus|intercostal|flexor|extensor|abductor|adductor|soleus|gastrocnemius|psoas|iliacus|pectoralis|latissimus|trapezius|serratus|rhomboid|levator|sartorius|gracilis|vastus|pectineus|piriformis|gemellus|obturator (?:internus|externus)|quadratus|popliteus|plantaris|supinator|pronator|brachialis|brachioradialis|anconeus|coracobrachialis|scalenus|sternocleidomastoid|platysma|digastric|mylohyoid|masseter|temporalis|splenius|semispinalis|longissimus|iliocostalis|multifidus|rotator|interspinal|intertransvers|lumbrical|interosseous of|interossei|opponens|palmaris|tensor|infraspinatus|supraspinatus|diaphragm|constrictor|genioglossus|geniohyoid|hyoglossus|stylohyoid|stylopharyngeus|omohyoid|sternohyoid|sternothyroid|thyrohyoid$|cricothyroid|crico-arytenoid|aryepiglotticus|thyro-arytenoid|transverse arytenoid|oblique arytenoid|vocalis|uvular muscle|palatopharyngeus|salpingopharyngeus|coccygeus|iliococcygeus|pubococcygeus|puborectalis|subclavius|longus colli|longus capitis|semimembranosus|semitendinosus|biceps femoris|quadriceps|hamstring|muscle/;
const NOT_MUSCLE_RE=/tendon|ligament|membrane|cartilage|nerve|arter|vein|vena|retinaculum|trochlea|aponeuro|raphe|tract|linea|fascia(?!e? latae)|check ligament|tendinous|papillary|heart|ventricle|atrium|myocard/;
const MUSCLE:Tissue={color:'#b84c42',rough:.55};
/** Tipo de microtextura procedural usado no shader (0 liso … 6 encéfalo). */
export const DETAIL={smooth:0,bone:1,muscle:2,organ:3,vessel:4,fibrous:5,brain:6} as const;
function detailKind(part:Pick<Part,'name'|'system'>,t:Tissue|undefined):number{
 const n=part.name.toLowerCase();
 if(/tooth|incisor|canine|molar|lens|cornea|vitreous|cartilage|disk|valve|leaflet|cusp|ventricular system|aqueduct|third ventricle|fourth ventricle|lateral ventricle|interventricular foramen/.test(n))return DETAIL.smooth;
 if(!t&&part.system==='skeletal')return DETAIL.bone;
 if((!t&&part.system==='muscular')||t===MUSCLE)return DETAIL.muscle;
 if(/tendon|ligament|fascia|aponeuro|retinaculum|raphe|membrane|tract|linea|tendinous|tarsal plate/.test(n))return DETAIL.fibrous;
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
 if(part.system==='muscular'&&tissue&&!/tendon|fascia|aponeuro|retinaculum|ligament|raphe|tract|linea|tendinous/.test(n))tissue=undefined;
 const t=tissue??BY_SYSTEM[part.system]??{color:'#aebbb8',rough:.5};
 const hex=parseInt(t.color.slice(1),16);
 // Variação sutil (±5%) para separar peças vizinhas do mesmo tecido.
 const k=1+(hash(part.id)-.5)*.1;
 const c=(v:number)=>Math.max(0,Math.min(255,Math.round(v*k)));
 return {rgb:[c(hex>>16&255),c(hex>>8&255),c(hex&255)],rough:t.rough,detail:detailKind(part,tissue)};
}
