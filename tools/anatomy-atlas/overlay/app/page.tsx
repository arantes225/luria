// TRAUBE · Atlas anatômico — sobreposição do page.tsx do projeto MIT de origem
// (licença preservada em LICENSE-human-atlas.txt). Interface em português.
import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Activity,ArrowLeft,ChevronLeft,ChevronRight,Compass,Focus,Info,Layers3,Pause,RotateCcw,RotateCw,Search,Sparkles,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Slider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {Combobox,ComboboxInput,ComboboxContent,ComboboxList,ComboboxItem,ComboboxEmpty} from '@/components/ui/combobox';
import AnatomyScene from './scene';
import {parseCommand,TOURS,type Command,type Tour} from './study';
import {DEFAULT_VISIBLE,SYSTEMS,explanation,hasExplanation,normalizeQuery,ptName,searchKey,setPtNames,type Atlas,type Concept,type SceneState,type SystemId,type View} from './anatomy';

const initial:SceneState={ghost:0,explode:0,visible:DEFAULT_VISIBLE,selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0};
const VIEWS:{id:View;short:string;label:string}[]=[
 {id:'three-quarter',short:'¾',label:'Vista três-quartos'},
 {id:'front',short:'A',label:'Vista anterior'},
 {id:'side',short:'L',label:'Vista lateral'},
 {id:'back',short:'P',label:'Vista posterior'},
];
const SUGGESTED=['heart','brain','liver','stomach','spleen','pancreas','urinary bladder','trachea','femur','diaphragm'];
const ORGANS:SystemId[]=['cardiac','respiratory','digestive','urinary','endocrine','reproductive'];
const fmt=(n:number)=>n.toLocaleString('pt-BR');
const asset=(path:string)=>new URL(path,document.baseURI).toString();

export default function Home(){
 const detailTitle=useRef<HTMLHeadingElement>(null);
 const [atlas,setAtlas]=useState<Atlas|null>(null),[state,setState]=useState(initial),[progress,setProgress]=useState(0),[error,setError]=useState(''),[panel,setPanel]=useState<'layers'|'search'|null>(null),[details,setDetails]=useState(false),[about,setAbout]=useState(false),[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null),[tour,setTour]=useState<{tour:Tour;step:number}|null>(null),[tourMenu,setTourMenu]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{
  const abort=new AbortController();setProgress(0);setError('');setAtlas(null);setChosen(null);setDetails(false);setState({...initial,visible:DEFAULT_VISIBLE});
  const json=(path:string)=>fetch(asset(path),{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error('Não foi possível carregar o catálogo anatômico.');return r.json();});
  Promise.all([json('models/atlas.json'),json('models/pt-names.json').catch(()=>({}))])
   .then(([data,names])=>{setPtNames(names as Record<string,string>);setAtlas(data as Atlas);})
   .catch(e=>{if(e.name!=='AbortError')setError(e.message);});
  return()=>abort.abort();
 },[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{
  if(e.key==='/'&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)){e.preventDefault();setPanel('search');setDetails(false);}
  if(e.key==='Escape'){setPanel(null);}
 };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 const parts=useMemo(()=>new Map(atlas?.parts.map(p=>[p.id,p])),[atlas]);
 const counts=useMemo(()=>Object.fromEntries(SYSTEMS.map(s=>[s.id,atlas?.parts.filter(p=>p.system===s.id).length??0])),[atlas]);
 const keys=useMemo(()=>new Map(atlas?.concepts.map(c=>[c.id,searchKey(c.name)])),[atlas]);
 const activeSystems=SYSTEMS.filter(s=>counts[s.id]>0);
 const selectedParts=state.selected.map(id=>parts.get(id)).filter(p=>!!p),selected=selectedParts[0],system=SYSTEMS.find(s=>s.id===selected?.system);
 const visibleCount=atlas?.parts.filter(p=>state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id)).length??0;
 const results=useMemo(()=>{
  if(!atlas)return[];
  const term=normalizeQuery(query);
  if(!term)return SUGGESTED.map(name=>atlas.concepts.find(c=>c.name.toLowerCase()===name)).filter((x):x is Concept=>!!x);
  return atlas.concepts.filter(c=>(keys.get(c.id)??'').includes(term)||c.id.toLowerCase().includes(term))
   .sort((a,b)=>ptName(a.name).length-ptName(b.name).length).slice(0,80);
 },[atlas,query,keys]);
 const choose=(c:Concept)=>{setChosen(c);setState(s=>({...s,selected:c.elements,isolate:false,rotate:false}));setDetails(true);setPanel(null);};
 useEffect(()=>{if(!atlas)return;return registerAtlasTools(atlas,c=>flushSync(()=>choose(c)));},[atlas]);
 const choosePart=(id:string)=>{const p=parts.get(id);if(!p)return;setChosen({id:p.conceptId,name:p.name,elements:[id]});setState(s=>({...s,selected:[id],isolate:false,rotate:false}));setDetails(true);setPanel(null);};
 const toggle=(id:SystemId)=>{setDetails(false);setState(s=>({...s,selected:[],isolate:false,visible:s.visible.includes(id)?s.visible.filter(x=>x!==id):[...s.visible,id]}));};
 const reset=()=>{setState(s=>({...initial,visible:DEFAULT_VISIBLE,reset:s.reset+1}));setChosen(null);setDetails(false);setPanel(null);};
 const openPanel=(next:'layers'|'search')=>{setDetails(false);setPanel(p=>p===next?null:next);};
 const chosenName=chosen?ptName(chosen.name):'';
 const command=useMemo(()=>parseCommand(query),[query]);
 const findConcept=(term:string)=>{if(!atlas)return null;const t=normalizeQuery(term);const hits=atlas.concepts.filter(c=>(keys.get(c.id)??'').includes(t));return hits.sort((a,b)=>ptName(a.name).length-ptName(b.name).length)[0]??null;};
 const flash=(text:string)=>{setNotice(text);window.setTimeout(()=>setNotice(n=>n===text?'':n),4200);};
 const runCommand=(c:Command)=>{
  setQuery('');setPanel(null);
  if(c.kind==='all'){setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}));return;}
  if(c.kind==='explode'){setState(s=>({...s,explode:1,rotate:false}));return;}
  if(c.kind==='assemble'){setState(s=>({...s,explode:0}));return;}
  if(c.kind==='rotate'){setState(s=>({...s,rotate:true,explode:0}));return;}
  if(c.kind==='focus'){const hit=findConcept(c.term);if(!hit){flash('Não encontrei “'+c.term+'”. Tente outro nome.');return;}choose(hit);setState(s=>({...s,isolate:true,explode:0}));return;}
  if(c.kind==='count'){const n=atlas?.parts.filter(p=>c.systems.includes(p.system)).length??0;flash(fmt(n)+' peças modeladas em: '+c.systems.map(id=>SYSTEMS.find(x=>x.id===id)?.name).join(', ')+'. Cada peça é uma malha do modelo, não necessariamente um osso ou músculo inteiro.');setState(s=>({...s,selected:[],isolate:false,visible:c.systems}));return;}
  setDetails(false);
  const kind=c.kind,ids=c.systems;
  setState(s=>({...s,selected:[],isolate:false,visible:kind==='only'?ids:kind==='show'?[...new Set([...s.visible,...ids])]:s.visible.filter(id=>!ids.includes(id))}));
 };
 const goTour=(t:Tour,step:number)=>{const st=t.steps[step];setTour({tour:t,step});setTourMenu(false);setPanel(null);const hit=atlas?.concepts.find(c=>c.name.toLowerCase()===st.concept);setState(s=>({...s,visible:st.visible,explode:0,rotate:false,isolate:false,ghost:.6,selected:hit?.elements??[]}));if(hit)setChosen(hit);setDetails(false);};
 const endTour=()=>{setTour(null);setState(s=>({...s,ghost:0,selected:[],visible:DEFAULT_VISIBLE}));};
 return <main className="studio">
  {atlas&&<AnatomyScene atlas={atlas} state={{...state,inspectorOpen:details&&selectedParts.length>0}} onSelect={choosePart} onProgress={n=>{setProgress(n);if(n===100)setError('');}} onError={setError}/>}
  <div className="vignette"/>
  <header className="identity">
   <a className="back-link" href="/aprender/anatomia/"><ArrowLeft size={15}/><span>Sala de Anatomia</span></a>
   <div className="eyebrow"><span className="status-dot"/> TRAUBE · ANATOMIA INTERATIVA</div>
   <h1>Atlas do corpo<Badge variant="outline" className="edition">3D</Badge></h1>
   <div className="identity-meta">{fmt(atlas?.parts.length??2234)} peças <span>·</span> {activeSystems.length||15} sistemas <span>·</span> referência masculina adulta</div>
  </header>
  <nav className="top-actions" aria-label="Painéis do atlas">
   <Button variant="ghost" className={panel==='search'?'active':''} onClick={()=>openPanel('search')} aria-label="Buscar estrutura"><Search size={18}/><span>Buscar estrutura</span><kbd>/</kbd></Button>
   <Button variant="ghost" className={tourMenu?'active':''} onClick={()=>{setTourMenu(v=>!v);setPanel(null);}} aria-label="Tours guiados" aria-expanded={tourMenu}><Compass size={18}/><span>Tours</span></Button>
  </nav>
  <section className={`layers-panel glass ${panel==='layers'?'mobile-open':''}`} aria-label="Camadas anatômicas">
   <div className="panel-heading"><span>Sistemas</span><Button variant="ghost" className="mobile-only icon-button" onClick={()=>setPanel(null)} aria-label="Fechar sistemas"><X size={18}/></Button><Badge variant="secondary" className="desktop-only small-number">{activeSystems.length}</Badge></div>
   <div className="layer-presets">
    <Button variant="ghost" aria-pressed={activeSystems.every(x=>state.visible.includes(x.id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}))}>Tudo</Button>
    <Button variant="ghost" aria-pressed={state.visible.length===1&&state.visible[0]==='skeletal'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['skeletal']}))}>Esqueleto</Button>
    <Button variant="ghost" aria-pressed={state.visible.length===ORGANS.length&&ORGANS.every(id=>state.visible.includes(id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:ORGANS}))}>Órgãos</Button>
    <Button variant="ghost" aria-pressed={state.visible.length===3&&['cardiac','arterial','venous'].every(id=>state.visible.includes(id as SystemId))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['cardiac','arterial','venous']}))}>Circulação</Button>
   </div>
   <div className="system-list">{activeSystems.map(s=><div className={`system-row ${state.visible.includes(s.id)?'enabled':''}`} key={s.id}>
    <Button variant="ghost" className="system-name" title={`Mostrar apenas: ${s.name}`} onClick={()=>setState(v=>({...v,visible:[s.id],isolate:false,selected:[]}))}><span className="system-dot" style={{background:s.color}}/>{s.name}<span className="system-count">{counts[s.id]}</span></Button>
    <Switch checked={state.visible.includes(s.id)} onCheckedChange={()=>toggle(s.id)} aria-label={`Mostrar ${s.name}`}/>
   </div>)}</div>
   <div className="panel-foot"><span>{fmt(visibleCount)} peças visíveis</span><Button variant="ghost" onClick={()=>setState(s=>({...s,visible:[],selected:[],isolate:false}))}>Ocultar tudo</Button></div>
  </section>
  {panel==='search'&&<section className="search-panel glass" aria-label="Buscar anatomia">
   <div className="panel-heading"><span>Buscar estrutura</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label="Fechar busca"><X size={18}/></Button></div>
   <Combobox<Concept> items={results} value={null} onValueChange={value=>{if(value)choose(value);}} inputValue={query} onInputValueChange={setQuery} itemToStringLabel={c=>ptName(c.name)} filter={null} open onOpenChange={open=>{if(!open)setPanel(null);}}>
    {command&&<button type="button" className="command-suggestion" onPointerDown={e=>{e.preventDefault();runCommand(command);}} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();runCommand(command);}}}><Sparkles size={15}/><span>{command.label}</span><kbd>Enter</kbd></button>}
    <ComboboxInput onKeyDownCapture={e=>{if(e.key==="Enter"&&command){e.preventDefault();e.stopPropagation();runCommand(command);}}} autoFocus placeholder="Coração, fêmur… ou “mostre as veias”" aria-label="Buscar estruturas anatômicas pelo nome" showTrigger={false}/>
    <ComboboxContent className="anatomy-search-results"><ComboboxEmpty>Nenhuma estrutura encontrada.</ComboboxEmpty><ComboboxList>{(c:Concept)=><ComboboxItem key={c.id} value={c}><span className="search-result-name">{ptName(c.name)}<small>{c.name}</small></span><span className="small-number">{c.elements.length} {c.elements.length===1?'peça':'peças'}</span></ComboboxItem>}</ComboboxList></ComboboxContent>
   </Combobox>
   <p className="search-note">{query?'Até 80 resultados. Refine a busca para estruturas menores — vale português ou inglês.':'Busque qualquer estrutura em português ou inglês — ou escreva um comando: “só esqueleto”, “ocultar músculos”, “isolar fígado”, “quantos ossos”.'}</p>
  </section>}
  <nav className="view-controls glass" aria-label="Controles da câmera">
   {VIEWS.map(v=><Button variant="ghost" key={v.id} className={state.view===v.id?'active':''} aria-pressed={state.view===v.id} disabled={state.explode>.8&&v.id!=='front'} onClick={()=>setState(s=>({...s,view:v.id,reset:s.reset+1,rotate:false}))} title={v.label} aria-label={v.label}><span>{v.short}</span></Button>)}
   <i/>
   <Button variant="ghost" disabled={state.explode>=.4} aria-label={state.rotate?'Pausar rotação':'Girar o corpo'} title="Rotação automática" className={state.rotate?'active':''} onClick={()=>setState(s=>({...s,rotate:!s.rotate}))}>{state.rotate?<Pause size={17}/>:<RotateCw size={18}/>}</Button>
   <Button variant="ghost" aria-label="Restaurar vista e camadas" title="Restaurar" onClick={reset}><RotateCcw size={17}/></Button>
  </nav>
  <div className="scene-caption"><span className="caption-line"/><span>{state.isolate?(chosenName||'ESTRUTURA SELECIONADA'):state.explode>.95?'INVENTÁRIO ANATÔMICO':state.explode>.05?'ESTRUTURAS SEPARADAS':'ADULTO · MASCULINO'}</span><span className="caption-line"/></div>
  <div className="bottom-dock glass">
   <Button variant="ghost" className="mobile-only dock-layers" onClick={()=>openPanel('layers')} aria-label="Abrir sistemas"><Layers3 size={20}/><span>Sistemas</span></Button>
   <div className="explode-control">
    <div className="explode-label"><label id="explode-label">Separar estruturas</label><output>{Math.round(state.explode*100)}<span>%</span></output></div>
    <Slider aria-labelledby="explode-label" min={0} max={100} step={1} value={[state.explode*100]} onValueChange={v=>setState(s=>({...s,explode:(Array.isArray(v)?v[0]:v)/100,view:(Array.isArray(v)?v[0]:v)>80?'front':s.view,rotate:false}))}/>
    <div className="slider-endpoints"><span>Montado</span><span>Peça por peça</span></div>
   </div>
   <Button variant="ghost" className="dock-reset" onClick={reset} aria-label="Montar e restaurar"><RotateCcw size={18}/><span>Restaurar</span></Button>
  </div>
  <footer className="studio-footer"><span>{state.explode>.8?'Arraste para deslocar':'Arraste para girar'} <b>·</b> Pinça para aproximar <b>·</b> Toque para identificar</span><Button variant="ghost" className="credits-trigger" onClick={()=>setAbout(v=>!v)} aria-expanded={about}><Info size={13}/> Créditos</Button></footer>
  {progress<100&&!error&&<div className="loading glass" role="status"><Activity size={18}/><div><strong>Preparando a anatomia</strong><span>{progress}% · Carregando {fmt(atlas?.parts.length??2234)} peças</span><div className="loading-track"><i style={{width:`${progress}%`}}/></div></div></div>}
  {error&&<div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost" onClick={()=>location.reload()}>Recarregar</Button></div>}
  <Sheet open={details&&selectedParts.length>0} modal={false} disablePointerDismissal onOpenChange={setDetails}><SheetContent initialFocus={detailTitle} className={`detail-sheet glass ${state.isolate?'is-isolated':''}`} showCloseButton={true}>
   <div className="detail-header"><div className="detail-accent" style={{background:system?.color}}/><div className="eyebrow">{system?.name??'ANATOMIA'}</div><SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosenName}</SheetTitle>{chosen&&chosenName!==chosen.name&&<p className="structure-original" lang="en">{chosen.name}</p>}</div>
   <div className="detail-scroll" key={`${chosen?.id}-${state.isolate}`}>
    <SheetDescription className="structure-description">{chosen&&selected?explanation(chosen.name,selected.system):''}</SheetDescription>
    {chosen&&!hasExplanation(chosen.name)&&<span className="context-note">Visão geral do sistema · estrutura identificada no modelo de referência</span>}
    {!state.isolate&&<div className="ghost-control"><div className="explode-label"><label id="ghost-label">Transparência do entorno</label><output>{Math.round((state.ghost??0)*100)}<span>%</span></output></div><Slider aria-labelledby="ghost-label" min={0} max={90} step={5} value={[(state.ghost??0)*100]} onValueChange={v=>setState(s=>({...s,ghost:(Array.isArray(v)?v[0]:v)/100}))}/></div>}
    <div className="structure-meta"><span>Referência FMA<strong>{chosen?.id}</strong></span><span>Peças selecionadas<strong>{fmt(state.selected.length)}</strong></span></div>
    {selectedParts.length>1&&<div className="member-list"><h3>Estruturas incluídas</h3>{selectedParts.slice(0,50).map(p=><Button variant="ghost" key={p.id} onClick={()=>choosePart(p.id)}><span>{ptName(p.name)}</span><ChevronRight size={14}/></Button>)}{selectedParts.length>50&&<p>E mais {fmt(selectedParts.length-50)} peças modeladas.</p>}</div>}
   </div>
   <div className="detail-actions"><Button className={`primary-action ${state.isolate?'active':''}`} onClick={()=>setState(s=>({...s,isolate:!s.isolate,explode:0}))}><Focus size={18}/>{state.isolate?'Mostrar anatomia ao redor':'Isolar estrutura'}<ChevronRight size={16}/></Button><Button variant="ghost" className="secondary-action" onClick={()=>{setState(s=>({...s,selected:[],isolate:false}));setDetails(false);}}>Limpar seleção</Button></div>
  </SheetContent></Sheet>
  {about&&<section className="credits-card glass" role="dialog" aria-label="Fontes e créditos">
   <div className="credits-head"><strong>Fontes e créditos</strong><Button variant="ghost" className="icon-button" onClick={()=>setAbout(false)} aria-label="Fechar créditos"><X size={16}/></Button></div>
   <p>Modelos: <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noopener noreferrer">BodyParts3D</a>, © The Database Center for Life Science, CC BY 4.0 — geometria simplificada e recolorida.</p>
   <p>Referência masculina adulta; não cobre todas as variações humanas. Nomes traduzidos da nomenclatura FMA. Material educacional, sujeito a revisão.</p>
   <p className="credits-small">Visualizador derivado de software MIT (licença incluída no pacote). <a href="/aprender/anatomia/#creditos">Todos os créditos</a></p>
  </section>}
  {tourMenu&&<section className="tour-menu glass" aria-label="Tours guiados"><div className="credits-head"><strong>Tours guiados</strong><Button variant="ghost" className="icon-button" onClick={()=>setTourMenu(false)} aria-label="Fechar tours"><X size={16}/></Button></div>{TOURS.map(t=><button type="button" key={t.id} onClick={()=>goTour(t,0)}><strong>{t.title}</strong><span>{t.summary} · {t.steps.length} etapas</span><ChevronRight size={16}/></button>)}</section>}
  {tour&&<section className="tour-card glass" aria-live="polite"><div className="tour-top"><span className="eyebrow">TOUR · {tour.tour.title.toUpperCase()}</span><Button variant="ghost" className="icon-button" onClick={endTour} aria-label="Encerrar tour"><X size={16}/></Button></div><h2>{chosenName}</h2><p>{tour.tour.steps[tour.step].text}</p><div className="tour-nav"><Button variant="ghost" disabled={tour.step===0} onClick={()=>goTour(tour.tour,tour.step-1)}><ChevronLeft size={16}/>Anterior</Button><span>{tour.step+1}/{tour.tour.steps.length}</span>{tour.step<tour.tour.steps.length-1?<Button variant="ghost" onClick={()=>goTour(tour.tour,tour.step+1)}>Próxima<ChevronRight size={16}/></Button>:<Button variant="ghost" onClick={endTour}>Concluir</Button>}</div></section>}
  {notice&&<div className="atlas-notice glass" role="status">{notice}</div>}
 </main>;
}
