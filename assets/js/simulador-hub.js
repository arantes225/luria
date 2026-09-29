(()=>{"use strict";
const sb=window.supabaseClient;
if(!sb)return;
const $=id=>document.getElementById(id);
const setText=(id,value)=>{const el=$(id);if(el)el.textContent=value};
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
    setText("sim-emergency-total",cases.count??caseRows.length);
    setText("sim-zap-total",zapCases.count??0);
    const completed=clinicalRows.filter(x=>x.status==="completed").length+zapRows.filter(x=>x.status==="completed").length;
    const active=clinicalRows.filter(x=>x.status==="in_progress").length+zapRows.filter(x=>x.status==="in_progress").length;
    const scores=[...clinicalRows,...zapRows].map(x=>Number(x.score||0)).filter(x=>x>0);
    setText("sim-completed",completed);
    setText("sim-active",active);
    setText("sim-zap-messages",msgs.count??0);
    setText("sim-score",scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)+"%":"—");
    setText("sim-donut-total",completed);
    setText("sim-progress-copy",completed?("Você já concluiu "+completed+" caso"+(completed===1?"":"s")+" no Simulador."):"Seu histórico aparecerá aqui conforme você praticar.");

    const scoredSessions=[...clinicalRows,...zapRows]
      .filter(row=>row.status==="completed")
      .map(row=>Number(row.score))
      .filter(score=>Number.isFinite(score)&&score>=0);

    const scoreBands=[
      {label:"0–49%",min:0,max:49},
      {label:"50–69%",min:50,max:69},
      {label:"70–84%",min:70,max:84},
      {label:"85–100%",min:85,max:100}
    ];

    const scoreTotal=scoredSessions.length;
    const recentList=$("sim-recent-list");
    if(recentList) recentList.innerHTML=scoreTotal
      ? scoreBands.map((band,index)=>{
          const count=scoredSessions.filter(score=>score>=band.min&&score<=band.max).length;
          const pct=Math.round((count/scoreTotal)*100);
          return '<div class="sim-score-row">'
            +'<span class="sim-score-label">'+band.label+'</span>'
            +'<span class="sim-score-track"><i style="width:'+pct+'%"></i></span>'
            +'<span class="sim-score-count">'+count+'x</span>'
            +'<strong class="sim-score-pct">'+pct+'%</strong>'
            +'</div>';
        }).join("")
      : '<div class="sim-empty-row">Sua distribuição de pontuação aparecerá após concluir casos.</div>';

    const counts={};
    caseRows.forEach(c=>{const k=c.specialty||"Outras";counts[k]=(counts[k]||0)+1});
    const specialties=Object.entries(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],"pt-BR"));
    const specialtyTotal=specialties.reduce((s,x)=>s+x[1],0)||1;

    const specialtyLegend=$("sim-specialty-legend");
    if(specialtyLegend) specialtyLegend.innerHTML=specialties.map((x,index)=>
      '<div class="sim-specialty-legend-row" style="--legend-index:'+index+'">'
      +'<span>'+esc(x[0])+'</span>'
      +'<b>'+x[1]+' caso'+(x[1]===1?'':'s')+'</b>'
      +'</div>'
    ).join("");

    const miniBars=$("sim-mini-bars");
    if(miniBars) miniBars.innerHTML=specialties.length
      ? specialties.map((x,index)=>{
          const pct=Math.round((x[1]/specialtyTotal)*100);
          return '<div class="sim-specialty-list-row">'
            +'<span class="sim-specialty-list-name">'+esc(x[0])+'</span>'
            +'<span class="sim-specialty-list-bar"><i style="width:'+pct+'%"></i></span>'
            +'<b>'+x[1]+'</b>'
            +'</div>';
        }).join("")
      : '<div class="sim-empty-row">Nenhuma especialidade disponível.</div>';
  }catch(err){console.warn("Simulador hub:",err)}
}
if(window.docmapUser)init();else window.addEventListener("docmap:ready",init,{once:true});
})();