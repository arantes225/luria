// TRAUBE · Sala de Anatomia — atlas 3D. Sobreposição do page.tsx do projeto MIT
// de origem (licença preservada em LICENSE-human-atlas.txt). Interface em PT,
// layout em cards no padrão do site e ferramentas de estudo (corte, remoção,
// tours, comandos, transparência).
import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Activity,ChevronLeft,ChevronRight,Compass,Droplets,Eye,EyeOff,Focus,Layers3,Microscope,Pause,RotateCcw,RotateCw,Scissors,Search,Sparkles,Trash2,Undo2,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Combobox,ComboboxInput,ComboboxContent,ComboboxList,ComboboxItem,ComboboxEmpty} from '@/components/ui/combobox';
import AnatomyScene from './scene';
import {primeExterior,readAtlas} from './atlas-startup';
import {parseCommand,TOURS,type Command,type Tour} from './study';
import {DEFAULT_VISIBLE,SYSTEMS,explanation,hasExplanation,normalizeQuery,ptName,searchKey,setPtNames,type Atlas,type Concept,type CutAxis,type SceneState,type Sex,type SystemId,type View} from './anatomy';

const exterior:SystemId[]=['integumentary'];
const initial:SceneState={ghost:0,explode:0,visible:exterior,selected:[],hidden:[],cutAxis:'none',cut:.5,isolate:false,view:'three-quarter',rotate:false,reset:0};
const VIEWS:{id:View;short:string;label:string}[]=[
 {id:'three-quarter',short:'¾',label:'Vista três-quartos'},
 {id:'front',short:'Ant',label:'Vista anterior'},
 {id:'side',short:'Lat',label:'Vista lateral'},
 {id:'back',short:'Post',label:'Vista posterior'},
];
const CUTS:{id:CutAxis;label:string;title:string}[]=[
 {id:'none',label:'Sem corte',title:'Sem corte'},
 {id:'sagittal',label:'Sagital',title:'Corte sagital (direita × esquerda)'},
 {id:'coronal',label:'Coronal',title:'Corte coronal (anterior × posterior)'},
 {id:'transverse',label:'Transversal',title:'Corte transversal (superior × inferior)'},
];
const SUGGESTED:Record<Sex,string[]>={
 male:['heart','brain','lungs','liver','thyroid gland','left kidney','stomach','muscles of anterolateral abdominal wall','prostate','femur'],
 female:['heart','brain','uterus','ovary','mammary gland','liver','kidney','lungs','urinary bladder','stomach'],
};
const BODIES:{id:Sex;label:string;manifest:string;caption:string}[]=[
 {id:'male',label:'Masculino',manifest:'models/atlas.json',caption:'Adulto · referência masculina'},
 {id:'female',label:'Feminino',manifest:'models/atlas-female.json',caption:'Adulta · referência feminina'},
];
const startBody=():Sex=>{try{return ((query=>query.get('sexo')??query.get('corpo'))(new URLSearchParams(location.search))??(localStorage.getItem('traube-atlas-corpo')==='female'?'feminino':'masculino'))==='feminino'?'female':'male';}catch{return 'male';}};
const ORGANS:SystemId[]=['cardiac','brain','respiratory','digestive','urinary','endocrine','reproductive'];
// Variáveis de tema copiadas da página do site quando o atlas está embutido.
const THEME_VARS=['--color-background','--color-surface','--color-surface-solid','--color-surface-elevated','--color-border','--color-border-interactive','--color-primary','--color-primary-text','--color-primary-subtle','--color-primary-hover','--color-text-primary','--color-text-secondary','--ui-pill-gradient','--ui-frame-bg','--ui-shadow','--ui-radius-card'];
const fmt=(n:number)=>n.toLocaleString('pt-BR');
const asset=(path:string)=>new URL(path,document.baseURI).toString();
const embedded=(()=>{try{return new URLSearchParams(location.search).has('embed')&&window.parent!==window;}catch{return false;}})();

function useSiteTheme(){
 useEffect(()=>{
  const root=document.documentElement;root.classList.toggle('is-embedded',embedded);
  if(!embedded)return;
  let parentDoc:Document;try{parentDoc=window.parent.document;}catch{return;}
  const apply=()=>{const cs=getComputedStyle(parentDoc.body);for(const v of THEME_VARS){const value=cs.getPropertyValue(v).trim();if(value)root.style.setProperty(v,value);}
   root.style.setProperty('--site-font',cs.fontFamily);
   const dark=parentDoc.documentElement.dataset.theme==='dark'||parentDoc.body.dataset.uiAppearance==='dark'||parentDoc.body.classList.contains('theme-dark');
   root.dataset.siteTheme=dark?'dark':(parentDoc.documentElement.dataset.theme||'light');};
  apply();
  const obs=new MutationObserver(()=>requestAnimationFrame(apply));
  obs.observe(parentDoc.documentElement,{attributes:true});obs.observe(parentDoc.body,{attributes:true});
  return()=>obs.disconnect();
 },[]);
}

export default function Home(){
 useSiteTheme();
 const [atlas,setAtlas]=useState<Atlas|null>(null),[state,setState]=useState(initial),[progress,setProgress]=useState(0),[error,setError]=useState(''),[panel,setPanel]=useState<'layers'|null>(null),[searchOpen,setSearchOpen]=useState(false),[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null),[tour,setTour]=useState<{tour:Tour;step:number}|null>(null),[tourMenu,setTourMenu]=useState(false),[notice,setNotice]=useState(''),[removedStack,setRemovedStack]=useState<string[][]>([]),[bodyKind,setBodyKind]=useState<Sex>(startBody);
 const searchBox=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const abort=new AbortController();
  const json=(path:string)=>readAtlas(new URL(asset(path+'?v=traube3')),abort.signal);
  primeExterior(bodyKind,abort.signal);
  setAtlas(null);setProgress(0);setError('');setChosen(null);setTour(null);setRemovedStack([]);setState(s=>({...initial,reset:s.reset+1}));
  try{localStorage.setItem('traube-atlas-corpo',bodyKind);}catch{}
  Promise.all([json(BODIES.find(x=>x.id===bodyKind)!.manifest),json('models/pt-names.json').catch(()=>({}))])
   .then(([data,names])=>{setPtNames(names as Record<string,string>);setAtlas(data as Atlas);})
   .catch(e=>{if(e.name!=='AbortError')setError(e.message);});
  return()=>abort.abort();
 },[bodyKind]);
 const parts=useMemo(()=>new Map(atlas?.parts.map(p=>[p.id,p])),[atlas]);
 const counts=useMemo(()=>Object.fromEntries(SYSTEMS.map(s=>[s.id,atlas?.parts.filter(p=>p.system===s.id).length??0])),[atlas]);
 const keys=useMemo(()=>new Map(atlas?.concepts.map(c=>[c.id,searchKey(c.name)])),[atlas]);
 const activeSystems=SYSTEMS.filter(s=>counts[s.id]>0);
 const hiddenSet=useMemo(()=>new Set(state.hidden),[state.hidden]);
 const selectedParts=state.selected.map(id=>parts.get(id)).filter(p=>!!p),selected=selectedParts[0],system=SYSTEMS.find(s=>s.id===selected?.system);
 const visibleCount=atlas?.parts.filter(p=>!hiddenSet.has(p.id)&&(state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id))).length??0;
 const results=useMemo(()=>{
  if(!atlas)return[];
  const term=normalizeQuery(query);
  if(!term)return SUGGESTED[bodyKind].map(name=>atlas.concepts.find(c=>c.name.toLowerCase()===name)).filter((x):x is Concept=>!!x);
  return atlas.concepts.filter(c=>(keys.get(c.id)??'').includes(term)||c.id.toLowerCase().includes(term))
   .sort((a,b)=>ptName(a.name).length-ptName(b.name).length).slice(0,80);
 },[atlas,query,keys,bodyKind]);
 const choose=(c:Concept)=>{setChosen(c);setState(s=>({...s,flow:false,selected:c.elements,hidden:s.hidden.filter(id=>!c.elements.includes(id)),isolate:false,rotate:false}));setSearchOpen(false);setQuery('');};
 useEffect(()=>{if(!atlas)return;return registerAtlasTools(atlas,c=>flushSync(()=>choose(c)));},[atlas]);
 const choosePart=(id:string)=>{const p=parts.get(id);if(!p)return;setChosen({id:p.conceptId,name:p.name,elements:[id]});setState(s=>({...s,flow:false,selected:[id],isolate:false,rotate:false}));};
 const showFemalePelvis=()=>{if(!atlas||bodyKind!=='female')return;const pelvis=atlas.concepts.find(c=>c.name==='Female pelvic organs');if(!pelvis){flash('Os órgãos pélvicos não foram encontrados neste modelo.');return;}setChosen(pelvis);setState(s=>({...s,visible:['reproductive','urinary'],selected:pelvis.elements,hidden:s.hidden.filter(id=>!pelvis.elements.includes(id)),isolate:false,explode:0,cutAxis:'none',view:'front',rotate:false,reset:s.reset+1}));};
 const toggle=(id:SystemId)=>setState(s=>({...s,selected:[],isolate:false,visible:s.visible.includes(id)?s.visible.filter(x=>x!==id):id==='integumentary'?exterior:[...s.visible.filter(x=>x!=='integumentary'),id]}));
 const clearSelection=()=>{setState(s=>({...s,selected:[],isolate:false}));setChosen(null);};
 const reset=()=>{setState(s=>({...initial,reset:s.reset+1}));setChosen(null);setRemovedStack([]);setTour(null);};
 const flash=(text:string)=>{setNotice(text);window.setTimeout(()=>setNotice(n=>n===text?'':n),4200);};
 // Remover estruturas selecionadas (como um bisturi) e desfazer.
 const removeSelected=()=>{if(!state.selected.length)return;const ids=[...state.selected];setRemovedStack(st=>[...st,ids]);setState(s=>({...s,hidden:[...new Set([...s.hidden,...ids])],selected:[],isolate:false}));flash(`Removido do modelo: ${chosen?ptName(chosen.name):'estrutura selecionada'}. Use “Desfazer” para trazer de volta.`);setChosen(null);};
 const undoRemove=()=>{setRemovedStack(st=>{const last=st[st.length-1];if(last)setState(s=>({...s,hidden:s.hidden.filter(id=>!last.includes(id))}));return st.slice(0,-1);});};
 const restoreAll=()=>{setState(s=>({...s,hidden:[]}));setRemovedStack([]);};
 useEffect(()=>{const key=(e:KeyboardEvent)=>{
  const typing=e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement;
  if(e.key==='/'&&!typing){e.preventDefault();setSearchOpen(true);}
  if(e.key==='Escape'){setSearchOpen(false);setTourMenu(false);}
  if((e.key==='Delete'||e.key==='Backspace')&&!typing&&state.selected.length){e.preventDefault();removeSelected();}
  if(e.key.toLowerCase()==='z'&&(e.ctrlKey||e.metaKey)&&!typing){e.preventDefault();undoRemove();}
 };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);});
 useEffect(()=>{if(!searchOpen)return;const out=(e:PointerEvent)=>{if(searchBox.current&&!searchBox.current.contains(e.target as Node))setSearchOpen(false);};document.addEventListener('pointerdown',out);return()=>document.removeEventListener('pointerdown',out);},[searchOpen]);
 const chosenName=chosen?ptName(chosen.name):'';
 const command=useMemo(()=>parseCommand(query),[query]);
 const findConcept=(term:string)=>{if(!atlas)return null;const t=normalizeQuery(term);const hits=atlas.concepts.filter(c=>(keys.get(c.id)??'').includes(t));return hits.sort((a,b)=>ptName(a.name).length-ptName(b.name).length)[0]??null;};
 const runCommand=(c:Command)=>{
  setQuery('');setSearchOpen(false);
  if(c.kind==='all'){setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}));return;}
  if(c.kind==='explode'){setState(s=>({...s,explode:1,rotate:false}));return;}
  if(c.kind==='assemble'){setState(s=>({...s,explode:0}));return;}
  if(c.kind==='rotate'){setState(s=>({...s,rotate:true,explode:0}));return;}
  if(c.kind==='focus'){const hit=findConcept(c.term);if(!hit){flash('Não encontrei “'+c.term+'”. Tente outro nome.');return;}choose(hit);setState(s=>({...s,isolate:true,explode:0}));return;}
  if(c.kind==='count'){const n=atlas?.parts.filter(p=>c.systems.includes(p.system)).length??0;flash(fmt(n)+' peças modeladas em: '+c.systems.map(id=>SYSTEMS.find(x=>x.id===id)?.name).join(', ')+'. Cada peça é uma malha do modelo, não necessariamente uma estrutura inteira.');setState(s=>({...s,selected:[],isolate:false,visible:c.systems}));return;}
  const kind=c.kind,ids=c.systems;
  setState(s=>({...s,selected:[],isolate:false,visible:kind==='only'?ids:kind==='show'?[...new Set([...s.visible,...ids])]:s.visible.filter(id=>!ids.includes(id))}));
 };
 const goTour=(t:Tour,step:number)=>{const st=t.steps[step];setTour({tour:t,step});setTourMenu(false);const hit=atlas?.concepts.find(c=>c.name.toLowerCase()===st.concept);setState(s=>({...s,visible:st.visible,explode:0,rotate:false,isolate:false,ghost:.6,selected:hit?.elements??[]}));if(hit)setChosen(hit);};
 const endTour=()=>{setTour(null);setState(s=>({...s,ghost:0,selected:[],visible:DEFAULT_VISIBLE}));setChosen(null);};
 const bodyBox=useMemo(()=>{const mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];atlas?.parts.forEach(p=>{for(let i=0;i<3;i++){mn[i]=Math.min(mn[i],p.bounds[0][i]);mx[i]=Math.max(mx[i],p.bounds[1][i]);}});return {mn,mx};},[atlas]);
 const AXIS_INDEX:Record<string,number>={sagittal:0,transverse:1,coronal:2};
 // posição relativa (0–1) do centro da seleção no eixo do corte; sem seleção, meio do corpo
 const cutCenter=(axis:CutAxis)=>{const k=AXIS_INDEX[axis];if(k===undefined||!selectedParts.length)return .5;let lo=Infinity,hi=-Infinity;selectedParts.forEach(p=>{lo=Math.min(lo,p.bounds[0][k]);hi=Math.max(hi,p.bounds[1][k]);});const span=(bodyBox.mx[k]-bodyBox.mn[k])||1;return Math.min(1,Math.max(0,((lo+hi)/2-bodyBox.mn[k])/span));};
 const setCut=(axis:CutAxis)=>setState(s=>({...s,cutAxis:axis,explode:0,cut:axis==='none'?s.cut:cutCenter(axis)}));
 const insideOn=state.isolate&&state.cutAxis!=='none';
 const seeInside=()=>{
  if(insideOn){setState(s=>({...s,isolate:false,cutAxis:'none'}));return;}
  if(!selectedParts.length)return;
  setState(s=>({...s,isolate:true,explode:0,rotate:false,cutAxis:'coronal',cut:cutCenter('coronal'),view:'front',reset:s.reset+1}));
  flash('Corte coronal pelo meio da estrutura. Ajuste a posição do corte na barra inferior.');
 };
 const isHeart=!!chosen&&(/^heart$|^(wall|cavity) of|cardiac atrium|heart (left|right) ventricle|valve|leaflet|cusp/i.test(chosen.name));
 const toggleFlow=()=>setState(s=>s.flow?{...s,flow:false}:{...s,flow:true,explode:0,ghost:s.isolate?s.ghost:Math.max(s.ghost??0,.7)});
 const removedCount=state.hidden.length;
 const bodyInfo=BODIES.find(x=>x.id===bodyKind)!;
 return <main className="atlas-app">
  <aside className={`atlas-side atlas-card ${panel==='layers'?'is-open':''}`} aria-label="Sistemas e camadas">
   <div className="atlas-card-head"><div><span className="atlas-kicker">Camadas</span><h2>Sistemas</h2></div><Button variant="ghost" className="atlas-icon mobile-only" onClick={()=>setPanel(null)} aria-label="Fechar sistemas"><X size={18}/></Button></div>
   <div className="atlas-segment atlas-sex" role="group" aria-label="Corpo de referência">{BODIES.map(x=><button type="button" key={x.id} aria-pressed={bodyKind===x.id} onClick={()=>setBodyKind(x.id)}>{x.label}</button>)}</div>
   <div className="atlas-presets">
    <button type="button" aria-pressed={state.visible.length===1&&state.visible[0]==='integumentary'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:exterior}))}>Corpo</button>
    <button type="button" aria-pressed={activeSystems.every(x=>state.visible.includes(x.id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}))}>Tudo</button>
    <button type="button" aria-pressed={state.visible.length===1&&state.visible[0]==='skeletal'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['skeletal']}))}>Esqueleto</button>
    <button type="button" aria-pressed={state.visible.length===ORGANS.length&&ORGANS.every(id=>state.visible.includes(id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:ORGANS}))}>Órgãos</button>
    <button type="button" aria-pressed={state.visible.length===3&&['cardiac','arterial','venous'].every(id=>state.visible.includes(id as SystemId))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['cardiac','arterial','venous']}))}>Circulação</button>
     {bodyKind==='female'&&<button type="button" aria-pressed={chosen?.name==='Female pelvic organs'} onClick={showFemalePelvis}>Pelve feminina</button>}
   </div>
   <div className="atlas-systems">{activeSystems.map(s=><div className={`atlas-system ${state.visible.includes(s.id)?'is-on':''}`} key={s.id}>
    <button type="button" className="atlas-system-name" title={`Mostrar apenas: ${s.name}`} onClick={()=>setState(v=>({...v,visible:[s.id],isolate:false,selected:[]}))}><span className="atlas-dot" style={{background:s.color}}/><span>{s.name}</span><small>{counts[s.id]}</small></button>
    <Switch checked={state.visible.includes(s.id)} onCheckedChange={()=>toggle(s.id)} aria-label={`Mostrar ${s.name}`}/>
   </div>)}</div>
   <div className="atlas-side-foot"><span>{fmt(visibleCount)} peças visíveis</span><button type="button" onClick={()=>setState(s=>({...s,visible:[],selected:[],isolate:false}))}>Ocultar tudo</button></div>
    {bodyKind==='female'&&<p className="atlas-source-note">Útero, ovários e tubas estão na pelve. A camada “Músculos adaptados” complementa a referência feminina com malhas BodyParts3D ajustadas por região óssea.</p>}
   {removedCount>0&&<div className="atlas-removed"><div><strong>{fmt(removedCount)}</strong> peça{removedCount===1?'':'s'} removida{removedCount===1?'':'s'}</div><div className="atlas-removed-actions"><button type="button" onClick={undoRemove} disabled={!removedStack.length}><Undo2 size={14}/>Desfazer</button><button type="button" onClick={restoreAll}><Eye size={14}/>Restaurar</button></div></div>}
  </aside>

  <section className="atlas-stage atlas-card" aria-label="Modelo 3D">
   <div className="atlas-toolbar">
    <div className="atlas-search" ref={searchBox}>
     <button type="button" className="atlas-search-trigger" onClick={()=>setSearchOpen(v=>!v)} aria-expanded={searchOpen}><Search size={16}/><span>Buscar estrutura ou comando…</span><kbd>/</kbd></button>
     {searchOpen&&<div className="atlas-search-pop">
      <Combobox<Concept> items={results} value={null} onValueChange={value=>{if(value)choose(value);}} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={c=>ptName(c.name)} filter={null} open onOpenChange={open=>{if(!open)setSearchOpen(false);}}>
       <ComboboxInput onKeyDownCapture={e=>{if(e.key==='Enter'&&command){e.preventDefault();e.stopPropagation();runCommand(command);}}} autoFocus placeholder="Coração, fêmur… ou “só esqueleto”" aria-label="Buscar estruturas anatômicas pelo nome" showTrigger={false}/>
       {command&&<button type="button" className="command-suggestion" onPointerDown={e=>{e.preventDefault();runCommand(command);}}><Sparkles size={15}/><span>{command.label}</span><kbd>Enter</kbd></button>}
       <ComboboxContent className="anatomy-search-results"><ComboboxEmpty>Nenhuma estrutura encontrada.</ComboboxEmpty><ComboboxList>{(c:Concept)=><ComboboxItem key={c.id} value={c}><span className="search-result-name">{ptName(c.name)}<small>{c.name}</small></span><span className="small-number">{c.elements.length} {c.elements.length===1?'peça':'peças'}</span></ComboboxItem>}</ComboboxList></ComboboxContent>
      </Combobox>
      <p className="search-note">Busque em português ou inglês, ou escreva um comando: “só esqueleto”, “ocultar músculos”, “isolar fígado”, “quantos ossos”.</p>
     </div>}
    </div>
    <div className="atlas-toolbar-right">
     <Button variant="ghost" className="atlas-pill mobile-only" onClick={()=>setPanel(p=>p==='layers'?null:'layers')} aria-label="Sistemas"><Layers3 size={16}/><span>Sistemas</span></Button>
     <div className="atlas-tours"><Button variant="ghost" className={`atlas-pill ${tourMenu?'is-active':''}`} onClick={()=>setTourMenu(v=>!v)} aria-expanded={tourMenu}><Compass size={16}/><span>Tours</span></Button>
      {tourMenu&&<div className="atlas-pop tour-menu" role="menu">{TOURS.map(t=><button type="button" key={t.id} onClick={()=>goTour(t,0)}><strong>{t.title}</strong><span>{t.summary} · {t.steps.length} etapas</span><ChevronRight size={16}/></button>)}</div>}
     </div>
     <div className="atlas-segment" role="group" aria-label="Vistas">{VIEWS.map(v=><button type="button" key={v.id} aria-pressed={state.view===v.id} disabled={state.explode>.8&&v.id!=='front'} onClick={()=>setState(s=>({...s,view:v.id,reset:s.reset+1,rotate:false}))} title={v.label} aria-label={v.label}>{v.short}</button>)}</div>
     <Button variant="ghost" className={`atlas-icon ${state.rotate?'is-active':''}`} disabled={state.explode>=.4} aria-label={state.rotate?'Pausar rotação':'Girar o corpo'} title="Rotação automática" onClick={()=>setState(s=>({...s,rotate:!s.rotate}))}>{state.rotate?<Pause size={16}/>:<RotateCw size={16}/>}</Button>
     <Button variant="ghost" className="atlas-icon" aria-label="Restaurar tudo" title="Restaurar vista, camadas e peças removidas" onClick={reset}><RotateCcw size={16}/></Button>
    </div>
   </div>

   <div className="atlas-canvas">
    {atlas&&<AnatomyScene key={atlas.sex??'male'} atlas={atlas} state={{...state,inspectorOpen:false}} onSelect={choosePart} onProgress={n=>{setProgress(n);if(n===100)setError('');}} onError={setError}/>}
    <div className="atlas-caption">{state.isolate?(chosenName||'Estrutura isolada'):state.explode>.95?'Inventário anatômico':state.explode>.05?'Estruturas separadas':state.cutAxis!=='none'?`Corte ${CUTS.find(c=>c.id===state.cutAxis)?.label.toLowerCase()}`:bodyInfo.caption}</div>
    {progress<100&&!error&&<div className="atlas-loading" role="status"><Activity size={18}/><div><strong>Preparando a anatomia</strong><span>{progress}% · {fmt(atlas?.parts.length??0)} peças</span><div className="atlas-track"><i style={{width:`${progress}%`}}/></div></div></div>}
    {error&&<div className="atlas-loading is-error" role="alert"><p>{error}</p><Button variant="ghost" onClick={()=>location.reload()}>Recarregar</Button></div>}
    {notice&&<div className="atlas-notice" role="status">{notice}</div>}
    {tour&&<section className="atlas-tour" aria-live="polite"><div className="atlas-tour-top"><span className="atlas-kicker">Tour · {tour.tour.title}</span><button type="button" onClick={endTour} aria-label="Encerrar tour"><X size={15}/></button></div><h3>{chosenName}</h3><p>{tour.tour.steps[tour.step].text}</p><div className="atlas-tour-nav"><button type="button" disabled={tour.step===0} onClick={()=>goTour(tour.tour,tour.step-1)}><ChevronLeft size={15}/>Anterior</button><span>{tour.step+1}/{tour.tour.steps.length}</span>{tour.step<tour.tour.steps.length-1?<button type="button" className="is-primary" onClick={()=>goTour(tour.tour,tour.step+1)}>Próxima<ChevronRight size={15}/></button>:<button type="button" className="is-primary" onClick={endTour}>Concluir</button>}</div></section>}
   </div>

   <div className="atlas-dock">
    <div className="atlas-dock-group">
     <label id="explode-label">Separar</label>
     <Slider aria-labelledby="explode-label" min={0} max={100} step={1} value={[state.explode*100]} onValueChange={v=>setState(s=>({...s,explode:(Array.isArray(v)?v[0]:v)/100,view:(Array.isArray(v)?v[0]:v)>80?'front':s.view,rotate:false}))}/>
     <output>{Math.round(state.explode*100)}%</output>
    </div>
    <div className="atlas-dock-group atlas-cut">
     <label><Scissors size={14}/>Corte</label>
     <div className="atlas-segment" role="group" aria-label="Plano de corte">{CUTS.map(c=><button type="button" key={c.id} aria-pressed={state.cutAxis===c.id} title={c.title} onClick={()=>setCut(c.id)}>{c.label}</button>)}</div>
     {state.cutAxis!=='none'&&<Slider aria-label="Posição do corte" min={0} max={100} step={1} value={[state.cut*100]} onValueChange={v=>setState(s=>({...s,cut:(Array.isArray(v)?v[0]:v)/100}))}/>}
    </div>
   </div>
  </section>

  <aside className={`atlas-detail atlas-card ${chosen&&selectedParts.length?'has-selection':''}`} aria-label="Estrutura selecionada" aria-live="polite">
   {chosen&&selectedParts.length?<>
    <div className="atlas-card-head"><div><span className="atlas-kicker" style={{color:system?.color}}>{system?.name??'Anatomia'}</span><h2>{chosenName}</h2>{chosenName!==chosen.name&&<p className="structure-original" lang="en">{chosen.name}</p>}</div><Button variant="ghost" className="atlas-icon" onClick={clearSelection} aria-label="Limpar seleção"><X size={16}/></Button></div>
    <div className="atlas-detail-body">
     <p className="structure-description">{selected?explanation(chosen.name,selected.system):''}</p>
     {!hasExplanation(chosen.name)&&<span className="context-note">Visão geral do sistema · estrutura identificada no modelo de referência</span>}
     <div className="atlas-actions">
      <button type="button" className={`atlas-primary ${state.isolate?'is-active':''}`} onClick={()=>setState(s=>({...s,isolate:!s.isolate,explode:0}))}><Focus size={16}/>{state.isolate?'Mostrar o entorno':'Isolar'}</button>
      <button type="button" className={`atlas-secondary ${insideOn?'is-active':''}`} onClick={seeInside} title="Isolar e cortar pelo meio para ver as estruturas internas"><Microscope size={16}/>{insideOn?'Fechar corte':'Ver por dentro'}</button>
      {isHeart&&<button type="button" className={`atlas-secondary ${state.flow?'is-active':''}`} onClick={toggleFlow} title="Mostrar o trajeto do sangue venoso (azul) e arterial (vermelho) pelo coração"><Droplets size={16}/>{state.flow?'Parar fluxo':'Fluxo sanguíneo'}</button>}
      <button type="button" className="atlas-danger" onClick={removeSelected} title="Remover do modelo (Delete)"><Trash2 size={16}/>Remover</button>
     </div>
     {!state.isolate&&<div className="atlas-ghost"><div className="atlas-row"><label id="ghost-label"><EyeOff size={14}/>Transparência do entorno</label><output>{Math.round((state.ghost??0)*100)}%</output></div><Slider aria-labelledby="ghost-label" min={0} max={90} step={5} value={[(state.ghost??0)*100]} onValueChange={v=>setState(s=>({...s,ghost:(Array.isArray(v)?v[0]:v)/100}))}/></div>}
     <dl className="atlas-meta"><div><dt>{/^FMA/.test(chosen.id)?'Referência FMA':'Referência'}</dt><dd>{/^FMA/.test(chosen.id)?chosen.id:'Modelo complementar'}</dd></div><div><dt>Peças</dt><dd>{fmt(state.selected.length)}</dd></div></dl>
     {selectedParts.length>1&&<div className="member-list"><h3>Estruturas incluídas</h3>{selectedParts.slice(0,50).map(p=><button type="button" key={p.id} onClick={()=>choosePart(p.id)}><span>{ptName(p.name)}</span><ChevronRight size={14}/></button>)}{selectedParts.length>50&&<p>E mais {fmt(selectedParts.length-50)} peças.</p>}</div>}
    </div>
   </>:<div className="atlas-empty">
    <span className="atlas-kicker">Como usar</span>
    <h2>Toque em uma estrutura</h2>
    <ul>
     <li><b>Arraste</b> para girar e <b>role</b> para aproximar no ponto do cursor.</li>
     <li>Selecione e use <b>Remover</b> (ou Delete) para tirar camadas; <b>Ctrl+Z</b> desfaz.</li>
     <li>Use <b>Ver por dentro</b> num órgão, ou <b>Corte</b> no corpo todo, para ver o interior.</li>
     <li>Troque entre os corpos <b>masculino</b> e <b>feminino</b> no card de sistemas.</li>
     <li>Busque por nome ou comando, ou siga um <b>tour</b>.</li>
    </ul>
    {!embedded&&<a className="atlas-link" href="/aprender/anatomia/">← Voltar à Sala de Anatomia</a>}
    <a className="atlas-link" href="/aprender/anatomia/orgaos/" target={embedded?'_parent':undefined}>Órgãos em detalhe</a>
    <a className="atlas-link" href="/aprender/anatomia/coracao/" target={embedded?'_parent':undefined}>Coração em detalhe</a>
   </div>}
  </aside>
 </main>;
}
