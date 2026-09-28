(()=>{"use strict";
const sb=window.supabaseClient;
if(!sb)return;
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const fmtAgo=iso=>{if(!iso)return "";const diff=Date.now()-new Date(iso).getTime();const m=Math.max(1,Math.round(diff/60000));if(m<60)return "Há "+m+" min";const h=Math.round(m/60);if(h<24)return "Há "+h+" h";const d=Math.round(h/24);return "Há "+d+" d"};
async function init(){
  const user=window.docmapUser;
  if(!user){window.addEventListener("docmap:ready",init,{once:true});return}
  try{
    const [cases,zapCases,clinical,zap,msgs]=await Promise.all([
      sb.from("clinical_cases").select("id,specialty",{count:"exact"}).eq("active",true),
      sb.from("interconsultation_cases").select("id",{count:"exact"}).eq("active",true),
      sb.from("clinical_case_sessions").select("id,case_id,status,started_at,completed_at,score").eq("user_id",user.id).order("started_at",{ascending:false}).limit(50),
      sb.from("interconsultation_sessions").select("id,case_id,status,started_at,completed_at,score").eq("user_id",user.id).order("started_at",{ascending:false}).limit(50),
      sb.from("interconsultation_messages").select("id",{count:"exact",head:true}).eq("user_id",user.id)
    ]);
    const caseRows=cases.data||[], clinicalRows=clinical.data||[], zapRows=zap.data||[];
    $("sim-emergency-total").textContent=cases.count??caseRows.length;
    $("sim-zap-total").textContent=zapCases.count??0;
    const completed=clinicalRows.filter(x=>x.status==="completed").length+zapRows.filter(x=>x.status==="completed").length;
    const active=clinicalRows.filter(x=>x.status==="in_progress").length+zapRows.filter(x=>x.status==="in_progress").length;
    const scores=[...clinicalRows,...zapRows].map(x=>Number(x.score||0)).filter(x=>x>0);
    $("sim-completed").textContent=completed;
    $("sim-active").textContent=active;
    $("sim-zap-messages").textContent=msgs.count??0;
    $("sim-score").textContent=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)+"%":"—";
    $("sim-donut-total").textContent=completed;
    $("sim-progress-copy").textContent=completed?("Você já concluiu "+completed+" caso"+(completed===1?"":"s")+" no Simulador."):"Seu histórico aparecerá aqui conforme você praticar.";

    const recent=clinicalRows.slice(0,5);
    if(recent.length){
      const ids=[...new Set(recent.map(x=>x.case_id).filter(Boolean))];
      let names={};
      if(ids.length){
        const q=await sb.from("clinical_cases").select("id,title,specialty").in("id",ids);
        (q.data||[]).forEach(x=>names[x.id]=x);
      }
      $("sim-recent-list").innerHTML=recent.map(row=>{
        const c=names[row.case_id]||{};
        const status=row.status==="completed"?"Concluído":row.status==="in_progress"?"Em andamento":"Novo";
        const cls=row.status==="completed"?"done":row.status==="in_progress"?"":"new";
        return '<div class="sim-recent-row"><span class="sim-recent-status '+cls+'">'+status+'</span><span class="sim-recent-title">'+esc(c.title||"Caso clínico")+'</span><span class="sim-recent-meta">'+esc(c.specialty||"Clínica")+'</span><span class="sim-recent-time">'+fmtAgo(row.started_at)+'</span></div>';
      }).join("");
    } else {
      $("sim-recent-list").innerHTML='<div class="sim-empty-row">Seus casos recentes aparecerão aqui.</div>';
    }

    const counts={};
    caseRows.forEach(c=>{const k=c.specialty||"Outras";counts[k]=(counts[k]||0)+1});
    const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const total=top.reduce((s,x)=>s+x[1],0)||1;
    $("sim-specialty-legend").innerHTML=top.map(x=>'<div><span>'+esc(x[0])+'</span><b>'+Math.round(x[1]/total*100)+'%</b></div>').join("");
    const bars=[clinicalRows.length%7+2,zapRows.length%7+3,completed%7+2,active%7+2,(msgs.count||0)%7+3,Math.max(2,scores.length%7+2),Math.max(3,completed%5+3)];
    $("sim-mini-bars").innerHTML=bars.map(n=>'<i style="height:'+Math.min(100,22+n*9)+'%"></i>').join("");
  }catch(err){console.warn("Simulador hub:",err)}
}
if(window.docmapUser)init();else window.addEventListener("docmap:ready",init,{once:true});
})();