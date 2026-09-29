(() => {
  "use strict";
  const sb=window.supabaseClient;
  const state={rows:[]};
  const $=id=>document.getElementById(id);
  const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const fmt=value=>{if(!value)return "";try{return new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date(value));}catch(_){return String(value)}};
  function status(text,type=""){const el=$("beta-status");if(!el)return;el.textContent=text;el.className=("beta-status "+type).trim()}
  function render(){
    const q=String($("beta-search")?.value||"").trim().toLowerCase();
    const rows=state.rows.filter(item=>!q||[item.display_name,item.email,item.positives,item.improvements].filter(Boolean).join(" ").toLowerCase().includes(q));
    $("beta-feedback-count").textContent=new Intl.NumberFormat("pt-BR").format(rows.length);
    const list=$("beta-feedback-list");
    if(!rows.length){list.innerHTML='<div class="beta-empty">Nenhum feedback encontrado.</div>';return}
    list.innerHTML=rows.map(item=>`<article class="beta-feedback-card"><header><div><strong>${esc(item.display_name||"Beta tester")}</strong><small>${esc(item.email||"")}</small></div><time datetime="${esc(item.submitted_at||"")}">${esc(fmt(item.submitted_at))}</time></header><div class="beta-feedback-columns"><section><span>O que já está bom</span><p>${esc(item.positives||"")}</p></section><section><span>O que podemos melhorar</span><p>${esc(item.improvements||"")}</p></section></div></article>`).join("")
  }
  async function load(){
    status("Carregando feedbacks dos Beta Testers...");
    const {data,error}=await sb.rpc("admin_beta_feedback_snapshot");
    if(error)throw error;
    state.rows=Array.isArray(data)?data:[];
    render();
    status(state.rows.length?`${state.rows.length} resposta${state.rows.length===1?"":"s"} recebida${state.rows.length===1?"":"s"}.`:"Ainda não há respostas dos Beta Testers.","success");
  }
  async function init(){
    const {data,error}=await sb.rpc("is_admin");
    if(error||data!==true){window.location.replace("/dashboard/");return}
    $("beta-search")?.addEventListener("input",render);
    $("beta-refresh")?.addEventListener("click",()=>load().catch(e=>status("Não foi possível atualizar: "+e.message,"error")));
    await load();
  }
  init().catch(e=>status("Não foi possível carregar os feedbacks: "+e.message,"error"));
})();