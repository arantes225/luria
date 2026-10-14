(()=>{"use strict";
const base=window.LURIA_BASE_SCHEDULES?.medicine||[];
const container=document.getElementById("production-lots");
if(!container)return;
const all=Array.from({length:225},(_,i)=>i<180?{number:i+1,title:base[i]?.theme||"Tema do cronograma-base",area:base[i]?.area||"",confirmed:!!base[i]}:{number:i+1,title:"Tema complementar — título a cadastrar",area:"Complementar",confirmed:false});
const sizes=[23,23,23,23,23,22,22,22,22,22];
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
`;document.head.appendChild(style);
let start=0;
const groups=sizes.map((size,index)=>{const items=all.slice(start,start+size);start+=size;return {label:"Lote "+(index+1),items};});
container.innerHTML='<div><h2>Plano de produção · 10 lotes</h2><p>225 temas previstos (180 do cronograma-base e 45 complementares). O planejamento não significa que a apostila já esteja publicada. Títulos complementares ainda não cadastrados aparecem identificados como pendentes.</p></div><div class="production-lot-tabs" role="tablist" aria-label="Lotes de apostilas"></div><div class="production-lot-meta" aria-live="polite"></div><ol class="production-lot-list"></ol>';
const tabs=container.querySelector(".production-lot-tabs"),meta=container.querySelector(".production-lot-meta"),list=container.querySelector(".production-lot-list");
function show(i){const group=groups[i];tabs.querySelectorAll("button").forEach((b,n)=>b.setAttribute("aria-selected",String(n===i)));meta.textContent=group.label+" · temas "+String(group.items[0].number).padStart(3,"0")+" a "+String(group.items[group.items.length-1].number).padStart(3,"0")+" · "+group.items.length+" temas";list.replaceChildren();for(const item of group.items){const li=document.createElement("li"),number=document.createElement("span"),title=document.createElement("span"),area=document.createElement("span");number.className="number";number.textContent="APOSTILA "+String(item.number).padStart(3,"0");title.className="theme"+(item.confirmed?"":" pending");title.textContent=item.title;area.className="area";area.textContent=item.confirmed?item.area:"Cadastro editorial pendente";li.append(number,title,area);list.append(li);}}
groups.forEach((g,i)=>{const b=document.createElement("button");b.type="button";b.className="production-lot-tab";b.setAttribute("role","tab");b.textContent=g.label;b.addEventListener("click",()=>show(i));tabs.append(b);});
show(0);
})();