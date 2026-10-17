(()=>{"use strict";
const base=window.LURIA_BASE_SCHEDULES?.medicine||[];
const editorial=window.LURIA_APOSTILA_EDITORIAL_2026||{notes:{},novas:[],catalogados:[],areas:[],mfcIds:[],crossAreas:{}};
const medcof=window.LURIA_MEDCOF_401||[];
const lessonsByItem=new Map();
// Cada aula pertence a um destino principal; referências secundárias aparecem como complemento, sem duplicar produção.
for(const lesson of medcof){
 for(const [id,relation] of [[Number(lesson.primary),"principal"],...(lesson.additional||[]).map(x=>[Number(x),"referencia-cruzada"])]){
  if(!lessonsByItem.has(id))lessonsByItem.set(id,[]);
  lessonsByItem.get(id).push({...lesson,relation});
 }
}
const enamedAreas=editorial.areas||[];
const mfc=new Set(editorial.mfcIds||[]);
const normArea=(area,number)=>area==="Medicina Preventiva"?(mfc.has(number)?"Medicina de Família e Comunidade":"Saúde Coletiva"):area;
const container=document.getElementById("production-lots");
if(!container)return;
const supplements=[["Clínica Médica","Eletrocardiografia: fundamentos e interpretação sistemática","CM-01"],["Clínica Médica","Ressuscitação cardiopulmonar do adulto e cuidados pós-parada","CM-02"],["Clínica Médica","Dislipidemias e prevenção do risco cardiovascular","CM-04"],["Clínica Médica","Cefaleias e sinais de alarme neurológicos","CM-07"],["Clínica Médica","Síndromes geriátricas, quedas e polifarmácia","CM-33"],["Clínica Médica","Arboviroses: dengue, chikungunya e Zika","CM-19"],["Clínica Médica","Antibioticoterapia e uso racional de antimicrobianos","CM-26"],["Clínica Médica","Anafilaxia e reações alérgicas graves","CM-27"],["Clínica Médica","Dermatoses frequentes: eczema, urticária, acne e micoses","CM-29/30"],["Clínica Médica","Doenças reumatológicas: gota, artrite séptica e diferenciais","CM-14"],["Cirurgia Geral","Doenças prostáticas e avaliação inicial de neoplasias urológicas","CIR-01"],["Cirurgia Geral","Litíase urinária e urgências obstrutivas","CIR-02"],["Cirurgia Geral","Escroto agudo e emergências urológicas","CIR-03/04"],["Cirurgia Geral","Trauma ortopédico: fraturas, luxações e avaliação inicial","CIR-06"],["Cirurgia Geral","Urgências oftalmológicas e avaliação da perda visual","CIR-10"],["Cirurgia Geral","Isquemia aguda de membros e doenças arteriais periféricas","CIR-14"],["Cirurgia Geral","Via aérea difícil, sedação e anestesia para o generalista","CIR-16"],["Cirurgia Geral","Urgências otorrinolaringológicas e infecções complicadas","CIR-12/13"],["Pediatria","Triagens neonatais e interpretação dos rastreamentos","PED-01"],["Pediatria","Hipoglicemia e distúrbios metabólicos neonatais","PED-02"],["Pediatria","Desconforto respiratório neonatal e suporte inicial","PED-03"],["Pediatria","Neurodesenvolvimento: TEA, TDAH e dificuldades de aprendizagem","PED-05"],["Pediatria","Alergias alimentares e anafilaxia pediátrica","PED-08"],["Pediatria","Vasculites pediátricas e doença de Kawasaki","PED-12"],["Ginecologia e Obstetrícia","Dor pélvica aguda e torção anexial","GO-01"],["Ginecologia e Obstetrícia","Miomas, pólipos e patologia uterina benigna","GO-02"],["Ginecologia e Obstetrícia","Prolapso genital e incontinência urinária feminina","GO-03"],["Ginecologia e Obstetrícia","Gestação gemelar e acompanhamento de alto risco","GO-05"],["Ginecologia e Obstetrícia","Aloimunização materno-fetal e doença hemolítica perinatal","GO-06"],["Saúde Mental","Psicopatologia, entrevista e exame do estado mental","SM-01"],["Saúde Mental","Transtornos depressivos e avaliação do risco de suicídio","SM-02"],["Saúde Mental","Transtorno bipolar e episódios do humor","SM-03"],["Saúde Mental","Transtornos ansiosos, TOC e transtornos relacionados ao trauma","SM-04/05"],["Saúde Mental","Esquizofrenia e outros transtornos psicóticos","SM-06"],["Saúde Mental","Emergências psiquiátricas e fundamentos de psicofarmacologia","SM-07/08"],["Saúde Mental","Transtornos relacionados ao álcool e outras substâncias","SM-09"],["Medicina de Família e Comunidade","Método clínico centrado na pessoa","MFC-01"],["Medicina de Família e Comunidade","SOAP e registro clínico na Atenção Primária","MFC-02"],["Medicina de Família e Comunidade","Abordagem familiar, genograma e ecomapa","MFC-03"],["Medicina de Família e Comunidade","Atenção domiciliar, multimorbidade e desprescrição","MFC-05/06"],["Medicina de Família e Comunidade","Saúde de populações vulnerabilizadas e cuidado equitativo","MFC-09/12"],["Saúde Coletiva","Segurança do paciente e prevenção de eventos adversos","SC-02"],["Saúde Coletiva","Consentimento informado, autonomia e decisão compartilhada","SC-03"],["Saúde Coletiva","LGPD, sigilo, telemedicina e saúde digital","SC-04"],["Saúde Coletiva","Determinantes sociais, equidade e direitos humanos","SC-06"]];
const extensions=[["Clínica Médica","Demências e comprometimento cognitivo","CM-08"],["Clínica Médica","Doença de Parkinson e distúrbios do movimento","CM-09"],["Clínica Médica","Neuropatias periféricas e doenças neuromusculares","CM-11"],["Clínica Médica","Obesidade e síndrome metabólica no adulto","CM-12"],["Clínica Médica","Osteoporose, sarcopenia e fragilidade","CM-13"],["Clínica Médica","Hemoglobinopatias e anemias hereditárias","CM-16"],["Clínica Médica","Coagulopatias, trombofilias e hemoterapia","CM-17"],["Clínica Médica","Oncologia clínica e emergências oncológicas","CM-18"],["Clínica Médica","Doença de Chagas","CM-20"],["Clínica Médica","Hanseníase: diagnóstico, tratamento e prevenção de incapacidades","CM-23"],["Cirurgia Geral","Tumores renais e vesicais","CIR-05"],["Cirurgia Geral","Síndrome compartimental e lesões musculotendíneas","CIR-07"],["Cirurgia Geral","Trauma raquimedular e avaliação neurológica inicial","CIR-08"],["Cirurgia Geral","Catarata, glaucoma crônico e retinopatias","CIR-11"],["Cirurgia Geral","Aneurisma da aorta e emergências vasculares","CIR-15"],["Pediatria","Malformações congênitas e síndromes genéticas","PED-04"],["Pediatria","Doença celíaca e síndromes de má absorção","PED-09"],["Pediatria","Oncologia pediátrica: leucemias, linfomas e tumores sólidos","PED-10"],["Pediatria","Púrpuras, coagulopatias e hemoglobinopatias pediátricas","PED-11"],["Pediatria","Puberdade precoce e atrasada","PED-14"],["Pediatria","Afogamento e emergências ambientais na infância","PED-17"],["Ginecologia e Obstetrícia","Hiperêmese gravídica","GO-04"],["Ginecologia e Obstetrícia","Colestase intra-hepática da gestação","GO-08"],["Ginecologia e Obstetrícia","Violência sexual e direitos reprodutivos na assistência","GO-10"],["Saúde Mental","Transtornos alimentares","SM-11"],["Saúde Mental","Transtornos de personalidade e autolesão","SM-12"],["Saúde Mental","Saúde mental no ciclo gravídico-puerperal","SM-13"],["Saúde Mental","Luto, crises e transtornos de adaptação","SM-15"],["Saúde Mental","Saúde mental do adolescente: avaliação e manejo inicial","PED-15"],["Medicina de Família e Comunidade","Longitudinalidade, coordenação do cuidado e matriciamento","MFC-04"],["Medicina de Família e Comunidade","Reabilitação comunitária e cuidado de pessoas com deficiência","MFC-07"],["Saúde Coletiva","Planejamento, avaliação e gestão de serviços de saúde","SC-01"],["Saúde Coletiva","Avaliação de tecnologias em saúde e custo-efetividade","SC-10"],["Saúde Coletiva","Sistemas de Informação em Saúde e qualidade dos dados","SC-11"],["Saúde Coletiva","Biossegurança e prevenção de infecções relacionadas à assistência","SC-12"]];
const all=Array.from({length:260},(_,i)=>i<180?{number:i+1,title:base[i]?.theme||"Tema do cronograma-base",area:base[i]?.area||"",confirmed:!!base[i]}:i<225?{number:i+1,title:supplements[i-180][1],area:supplements[i-180][0],source:supplements[i-180][2],confirmed:true,provisional:true}:{number:i+1,title:extensions[i-225][1],area:extensions[i-225][0],source:extensions[i-225][2],confirmed:true,provisional:true}).map(item=>{const note=editorial.notes?.[item.number];return {...item,area:normArea(item.area,item.number),crossAreas:editorial.crossAreas?.[item.number]||[],editorial:note?.instruction||"",priority:note?.priority||"",editorialStatus:note?.status||""};});
for(const item of editorial.novas||[])all.push({number:item.number,title:item.title,area:item.area,confirmed:true,provisional:true,source:"AUDITORIA ENAMED",priority:item.priority||"",editorial:item.instruction||"",editorialStatus:"NOVA APOSTILA · NÃO INICIADA",newTheme:true,lot:item.lot});
for(const item of editorial.catalogados||[])all.push({number:item.number,title:item.title,area:item.area,confirmed:true,provisional:false,source:"APOSTILA JÁ EXISTENTE",priority:item.priority||"",editorial:item.instruction||"",editorialStatus:"JÁ EXISTENTE · CONFERIR CAPÍTULOS",existingTheme:true,contentUrl:item.content_url,lot:item.lot});
const sizes=[23,23,23,23,23,22,22,22,22,22,12,12,11];
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const style=document.createElement("style");style.textContent=`
.production-lots{display:grid;gap:12px;padding:16px 18px;border:1px solid var(--border);border-radius:15px;background:var(--surface)}
.production-lots h2{margin:0;font-size:16px;font-weight:550}
.production-lots p{margin:0;color:var(--muted);font-size:11px;line-height:1.5}
.production-lot-tabs{display:flex;flex-wrap:wrap;gap:7px}
.production-lot-tab{border:1px solid var(--border);border-radius:10px;background:var(--surface-2);color:var(--text);padding:9px 12px;cursor:pointer;font:inherit;font-size:11px}
.production-lot-tab[aria-selected="true"]{color:var(--accent);background:var(--accent-soft);border-color:var(--accent)}
.production-lot-meta{font-size:11px;color:var(--muted)}
.production-lot-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;list-style:none;margin:0;padding:0}
.production-lot-list li{padding:11px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);display:grid;gap:4px}
.production-lot-list .number{font-size:10px;color:var(--accent)}
.production-lot-list .theme{font-size:12px;line-height:1.4;font-weight:550}
.production-lot-list .area{font-size:10px;color:var(--muted)}
.production-lot-list .pending{font-style:italic;color:var(--muted)}
.production-lot-list .editorial-flag{font-size:10px;line-height:1.4;border-top:1px solid var(--border);margin-top:5px;padding-top:7px;color:var(--text);white-space:pre-line}
.production-lot-list .editorial-status{display:block;font-size:9px;letter-spacing:.035em;color:var(--accent);font-weight:650;margin-bottom:3px}
.production-lot-list .editorial-priority{display:inline-block;font-size:9px;color:var(--muted);margin-top:3px}
.production-area-tabs{display:flex;flex-wrap:wrap;gap:5px}
.production-area-tab{padding:6px 9px;border-radius:9px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);font-size:10px;cursor:pointer}
.production-area-tab[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}
.production-lot-list .cross-area{font-size:9px;color:var(--muted)}
.production-lot-list .medcof-coverage{margin-top:6px;border-top:1px solid var(--border);padding-top:7px;font-size:10px}
.production-lot-list .medcof-coverage summary{cursor:pointer;color:var(--accent);font-weight:650;line-height:1.4}
.production-lot-list .medcof-coverage ul{list-style:disc;margin:6px 0 0 14px;padding:0;display:grid;gap:5px}
.production-lot-list .medcof-coverage li{display:list-item;border:0;border-radius:0;padding:0;background:none;font-size:10px;line-height:1.35}
.production-lot-list .medcof-warning{display:block;font-size:9px;color:var(--muted);margin-top:4px}
.production-lot-list .editorial-task{border-top:1px solid var(--border);padding-top:6px;font-size:10px;line-height:1.4;color:var(--text)}
.production-lot-list .editorial-task strong{font-weight:650}
.production-lot-list .published-book{display:inline-block;margin-top:6px;text-decoration:underline;font-size:10px;color:var(--accent)}
.production-lot-empty{padding:12px;color:var(--muted);font-size:11px}
`;document.head.appendChild(style);
let start=0;
const groups=sizes.map((size,index)=>{const items=all.slice(start,start+size);start+=size;return {label:"Lote "+(index+1),items};});
container.innerHTML='<div><h2>Plano de produção · 13 lotes · '+all.length+' temas</h2><p>260 temas originais preservados, '+(editorial.novas||[]).length+' novas propostas e '+(editorial.catalogados||[]).length+' apostilas já existentes indexadas nos lotes 11–13. Organizado pelas sete áreas do ENAMED. <strong>IMPORTANTE:</strong> planejamento não significa apostila publicada. Cards sinalizados mostram o conteúdo que deve ser conferido e completado na revisão. Aulas MedCof vinculadas: '+medcof.length+'. Alta, Média, Baixa e Diamante são complementares e não devem gerar duplicações. Um vínculo indica pendência de conferência do capítulo, NÃO conteúdo finalizado.</p></div><div class="production-lot-tabs" role="tablist" aria-label="Lotes de apostilas"></div><div class="production-area-tabs" role="group" aria-label="Filtrar por área ENAMED"></div><div class="production-lot-meta" aria-live="polite"></div><ol class="production-lot-list"></ol>';
const tabs=container.querySelector(".production-lot-tabs"),areaTabs=container.querySelector(".production-area-tabs"),meta=container.querySelector(".production-lot-meta"),list=container.querySelector(".production-lot-list");
let activeLot=0,activeArea="Todas";
for(const item of [...(editorial.novas||[]),...(editorial.catalogados||[])]){const target=groups[(item.lot||13)-1];if(target){const entry=all.find(x=>x.number===item.number);if(entry)target.items.push(entry);}}
function show(i){
 activeLot=i;
 const group=groups[i];
 tabs.querySelectorAll("button").forEach((b,n)=>b.setAttribute("aria-selected",String(n===i)));
 const visible=group.items.filter(item=>activeArea==="Todas"||item.area===activeArea||(item.crossAreas||[]).includes(activeArea));
 meta.textContent=group.label+" · "+visible.length+" de "+group.items.length+" temas · "+(activeArea==="Todas"?"todas as áreas":activeArea);
 list.replaceChildren();
 if(!visible.length){const item=document.createElement("li");item.className="production-lot-empty";item.textContent="Este lote ainda não possui temas nesta área.";list.append(item);return;}
 for(const item of visible){
  const li=document.createElement("li"),number=document.createElement("span"),heading=document.createElement("span"),area=document.createElement("span");
  number.className="number";number.textContent="APOSTILA "+String(item.number).padStart(3,"0")+(item.newTheme?" · NOVA":(item.existingTheme?" · JÁ EXISTENTE":""));
  heading.className="theme"+(item.confirmed?"":" pending");heading.textContent=item.title;
  area.className="area";area.textContent=item.area+(item.provisional?" · "+(item.source||"complemento"):"");
  li.dataset.apostilaId=String(item.number);
  li.dataset.lote=String(i+1);
  li.dataset.revisaoEditorial=item.newTheme?"nova-a-produzir":(item.existingTheme?"ja-publicada-conferir":"conferir-e-complementar-se-ausente");
  li.append(number,heading,area);
  if(item.crossAreas?.length){const cross=document.createElement("span");cross.className="cross-area";cross.textContent="Também contempla: "+item.crossAreas.join(", ");li.append(cross);}
  const sourceModules=lessonsByItem.get(item.number)||[];
  const mainModules=sourceModules.filter(x=>x.relation==="principal");
  if(item.editorial||item.newTheme||item.existingTheme||sourceModules.length){
   const flag=document.createElement("div"),status=document.createElement("span");
   flag.className="editorial-flag";status.className="editorial-status";
   status.textContent=item.newTheme?"NOVA APOSTILA · PRODUZIR NOS LOTES FINAIS":
    item.existingTheme?"JÁ PUBLICADA · CONFERIR/COMPLETAR SEM DUPLICAR":
    "COMPLEMENTAR NA PRÓXIMA REVISÃO · SE AUSENTE";
   flag.append(status);
   const desc=document.createElement("span");
   desc.textContent=item.editorial||(
    mainModules.length?"Validar os "+mainModules.length+" módulos MedCof vinculados: verificar capítulos, fluxogramas, condutas e referências; acrescentar APENAS o que estiver ausente.":"Conferir correspondências cruzadas sem repetir capítulos.");
   flag.append(desc);
   if(item.priority){const p=document.createElement("span");p.className="editorial-priority";p.textContent="Classificação no cronograma MedCof: "+item.priority;flag.append(p);}
   li.append(flag);
  }
  if(item.existingTheme&&item.contentUrl){const a=document.createElement("a");a.href=item.contentUrl;a.className="published-book";a.textContent="Abrir apostila já publicada";li.append(a);}
  if(sourceModules.length){
   const details=document.createElement("details"),summary=document.createElement("summary"),ul=document.createElement("ul"),warning=document.createElement("small");
   details.className="medcof-coverage";
   summary.textContent="PENDÊNCIAS: "+mainModules.length+" AULA"+(mainModules.length===1?"":"S")+" PRINCIPAL"+(mainModules.length===1?"":"IS")+" MEDCOF"+(sourceModules.length>mainModules.length?" + "+(sourceModules.length-mainModules.length)+" REFERÊNCIA(S) CRUZADA(S)":"");
   details.append(summary);
   for(const module of sourceModules){const line=document.createElement("li");line.textContent=(module.relation==="principal"?"[VERIFICAR/CORRIGIR] ":"[REFERÊNCIA CRUZADA] ")+"["+module.priority+"] "+module.title+" · PDF p. "+module.page;ul.append(line);}
   warning.className="medcof-warning";warning.textContent="Handoff obrigatório ao próximo chat: conferir o capítulo real e referências; acrescentar somente lacunas. NÃO marcar como concluído sem auditoria científica.";
   details.append(ul,warning);li.append(details);
  }
  list.append(li);
 }
}
groups.forEach((group,i)=>{const b=document.createElement("button");b.type="button";b.className="production-lot-tab";b.setAttribute("role","tab");b.textContent=group.label+(i>=10?" · "+group.items.length:"");b.addEventListener("click",()=>show(i));tabs.append(b);});
["Todas",...enamedAreas].forEach(name=>{const b=document.createElement("button");b.type="button";b.className="production-area-tab";b.textContent=name;b.setAttribute("aria-pressed",String(name===activeArea));b.addEventListener("click",()=>{activeArea=name;areaTabs.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x.textContent===name)));show(activeLot);});areaTabs.append(b);});
show(0);
})();