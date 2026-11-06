// TRAUBE · Atlas do corpo — comandos em linguagem natural e tours guiados.
// Implementação própria (inspirada em funcionalidades vistas em outros atlas).
import {SYSTEMS,normalizeQuery,type SystemId} from './anatomy';

const ORGANS:SystemId[]=['cardiac','respiratory','digestive','urinary','endocrine','reproductive'];
const CIRCULATION:SystemId[]=['cardiac','arterial','venous'];
// Sinônimos em português (sem acento) para cada sistema ou grupo.
const WORDS:[RegExp,SystemId[]][]=[
 [/\b(esqueleto|ossos?|osseo)\b/,['skeletal']],
 [/\b(musculos?|musculatura|muscular)\b/,['muscular']],
 [/\b(circulacao|circulatorio|vasos)\b/,CIRCULATION],
 [/\b(coracao|cardiaco)\b/,['cardiac']],
 [/\b(arterias?|arterial)\b/,['arterial']],
 [/\b(veias?|venoso)\b/,['venous']],
 [/\b(nervos?|nervoso|neural|cerebro|encefalo)\b/,['nervous']],
 [/\b(pulmoes|pulmao|respiratorio|respiracao|vias aereas)\b/,['respiratory']],
 [/\b(digestorio|digestivo|digestao|intestinos?|estomago)\b/,['digestive']],
 [/\b(urinario|rins?|bexiga)\b/,['urinary']],
 [/\b(linfatico|linfonodos?)\b/,['lymphatic']],
 [/\b(endocrino|glandulas?|hormonios?)\b/,['endocrine']],
 [/\b(genital|reprodutor|reprodutivo)\b/,['reproductive']],
 [/\b(pele|superficie|tegumentar)\b/,['integumentary']],
 [/\b(cartilagens?|ligamentos?|conjuntivo)\b/,['connective']],
 [/\b(sentidos|olhos?|orelhas?)\b/,['sensory']],
 [/\b(orgaos|visceras)\b/,ORGANS],
];
export type Command=
 |{kind:'show';systems:SystemId[];label:string}
 |{kind:'hide';systems:SystemId[];label:string}
 |{kind:'only';systems:SystemId[];label:string}
 |{kind:'all';label:string}|{kind:'explode';label:string}|{kind:'assemble';label:string}|{kind:'rotate';label:string}
 |{kind:'focus';term:string;label:string}
 |{kind:'count';systems:SystemId[];label:string};

const sysName=(ids:SystemId[])=>ids.map(id=>SYSTEMS.find(s=>s.id===id)?.name??id).join(', ');
/** Interpreta frases como "mostre as veias", "só esqueleto", "isolar fígado". */
export function parseCommand(raw:string):Command|null{
 const q=normalizeQuery(raw);if(q.length<3)return null;
 const found:SystemId[]=[];for(const [re,ids] of WORDS)if(re.test(q))ids.forEach(id=>{if(!found.includes(id))found.push(id);});
 if(/^(mostrar|mostre|mostra|exibir|exiba|ver)\s+(tudo|todos|corpo inteiro)\b/.test(q)||/^tudo$/.test(q))return{kind:'all',label:'Mostrar todos os sistemas'};
 if(/^(separar|separe|explodir|desmontar)\b/.test(q))return{kind:'explode',label:'Separar todas as estruturas'};
 if(/^(montar|monte|juntar|remontar)\b/.test(q))return{kind:'assemble',label:'Montar o corpo novamente'};
 if(/^(girar|gire|rodar|rotacionar)\b/.test(q))return{kind:'rotate',label:'Girar o corpo'};
 const focus=q.match(/^(isolar|isole|focar|foque|selecionar|selecione|onde fica|onde esta)\s+(o |a |os |as )?(.{3,})$/);
 if(focus)return{kind:'focus',term:focus[3],label:`Encontrar e isolar: ${focus[3]}`};
 if(!found.length)return null;
 if(/^quant[oa]s?\b/.test(q))return{kind:'count',systems:found,label:`Contar peças: ${sysName(found)}`};
 if(/^(so|somente|apenas|mostrar so|mostre so|mostre apenas|mostrar apenas)\b/.test(q))return{kind:'only',systems:found,label:`Mostrar apenas: ${sysName(found)}`};
 if(/^(ocultar|oculte|esconder|esconda|tirar|tire|remover|remova|sem)\b/.test(q))return{kind:'hide',systems:found,label:`Ocultar: ${sysName(found)}`};
 if(/^(mostrar|mostre|mostra|exibir|exiba|ver|adicionar|adicione|incluir)\b/.test(q))return{kind:'show',systems:found,label:`Mostrar: ${sysName(found)}`};
 return null;
}

export interface TourStep{concept:string;visible:SystemId[];text:string}
export interface Tour{id:string;title:string;summary:string;steps:TourStep[]}
// Conteúdo didático geral; sujeito a revisão anatômica como o restante do atlas.
export const TOURS:Tour[]=[
 {id:'circulacao',title:'Circulação',summary:'Do coração aos tecidos e de volta.',steps:[
  {concept:'heart',visible:['cardiac'],text:'O coração tem dois lados que funcionam como duas bombas em série: o direito leva sangue aos pulmões, o esquerdo leva ao corpo.'},
  {concept:'pulmonary trunk',visible:['cardiac','arterial'],text:'Do ventrículo direito sai o tronco pulmonar, que se divide nas artérias pulmonares e leva sangue pouco oxigenado aos pulmões.'},
  {concept:'pulmonary vein',visible:['cardiac','venous','respiratory'],text:'As veias pulmonares devolvem sangue oxigenado ao átrio esquerdo — são veias que carregam sangue arterial.'},
  {concept:'aorta',visible:['cardiac','arterial'],text:'Do ventrículo esquerdo sai a aorta: sobe, faz o arco e desce pelo tórax e abdome, distribuindo ramos para todo o corpo.'},
  {concept:'superior vena cava',visible:['cardiac','venous'],text:'A veia cava superior traz ao átrio direito o sangue da cabeça, do pescoço e dos membros superiores.'},
  {concept:'inferior vena cava',visible:['cardiac','venous'],text:'A veia cava inferior traz o sangue da metade inferior do corpo, fechando o circuito sistêmico.'},
 ]},
 {id:'digestao',title:'Digestão',summary:'O caminho do alimento e as glândulas anexas.',steps:[
  {concept:'esophagus',visible:['digestive'],text:'O esôfago leva o bolo alimentar da faringe ao estômago por ondas peristálticas.'},
  {concept:'stomach',visible:['digestive'],text:'No estômago o alimento é misturado ao ácido e às enzimas e liberado aos poucos no duodeno.'},
  {concept:'liver',visible:['digestive'],text:'O fígado produz a bile e processa os nutrientes absorvidos, que chegam a ele pela veia porta.'},
  {concept:'pancreas',visible:['digestive','endocrine'],text:'O pâncreas lança enzimas digestivas no duodeno e hormônios como insulina e glucagon no sangue.'},
  {concept:'small intestine',visible:['digestive'],text:'O intestino delgado é o principal local de digestão e absorção de nutrientes.'},
  {concept:'large intestine',visible:['digestive'],text:'O intestino grosso absorve água e eletrólitos e forma as fezes.'},
 ]},
 {id:'eixo',title:'Esqueleto axial',summary:'Crânio, coluna e caixa torácica.',steps:[
  {concept:'skull',visible:['skeletal'],text:'O crânio protege o encéfalo e sustenta a face e os órgãos dos sentidos.'},
  {concept:'vertebral column',visible:['skeletal'],text:'A coluna vertebral sustenta o tronco e protege a medula espinal; suas curvaturas distribuem a carga.'},
  {concept:'rib cage',visible:['skeletal','connective'],text:'Costelas, cartilagens costais e esterno formam a caixa torácica, que protege coração e pulmões e participa da respiração.'},
  {concept:'sternum',visible:['skeletal','connective'],text:'O esterno é a referência anterior do tórax — é sobre ele que se fazem as compressões torácicas.'},
 ]},
 {id:'respiracao',title:'Respiração',summary:'Das vias aéreas ao diafragma.',steps:[
  {concept:'trachea',visible:['respiratory'],text:'A traqueia conduz o ar da laringe aos brônquios principais, mantida aberta por anéis de cartilagem.'},
  {concept:'right lung',visible:['respiratory'],text:'O pulmão direito tem três lobos; o esquerdo tem dois e uma incisura onde se apoia o coração.'},
  {concept:'diaphragm',visible:['respiratory','muscular'],text:'Ao contrair, o diafragma desce e aumenta o volume do tórax: é o principal músculo da inspiração.'},
 ]},
];
