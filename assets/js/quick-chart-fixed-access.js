(() => {
  "use strict";
  const sb=window.supabaseClient,owned=window.LuriaLocalOwnerStore;
  const $=id=>document.getElementById(id);
  const state=$("quick-chart-fixed-state"),status=$("quick-chart-access-status");
  const pin=$("quick-chart-fixed-pin"),confirmPin=$("quick-chart-fixed-confirm");
  const save=$("quick-chart-save-fixed-pin"),revoke=$("quick-chart-revoke-all");
  const requests=$("quick-chart-pair-requests"),sessions=$("quick-chart-active-sessions"),inbox=$("quick-chart-inbox-list");
  if(!sb||![state,status,pin,confirmPin,save,revoke,requests,sessions,inbox].every(Boolean))return;
  const endpoint="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart-pair";
  const key="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  let owner="",epoch=0,timer=null,configured=false,working=false;
  const clock=v=>new Date(v).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
  async function call(action,payload={}){
    const {data}=await sb.auth.getSession();
    if(!data?.session?.access_token)throw Error("Entre na LURIA para administrar os acessos.");
    const r=await fetch(endpoint,{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json",
      "apikey":key,"Authorization":"Bearer "+data.session.access_token},
      body:JSON.stringify({...payload,action})});
    const value=await r.json().catch(()=>({}));
    if(!r.ok)throw Error(value.error||"Não foi possível completar a operação.");
    return value;
  }
  function button(title,handler){
    const el=document.createElement("button");
    el.type="button";el.textContent=title;el.addEventListener("click",handler);return el;
  }
  function label(parent,text){
    const span=document.createElement("span");span.textContent=text;parent.append(span);
  }
  function empty(parent,message){
    parent.replaceChildren();
    const p=document.createElement("p");p.textContent=message;parent.append(p);
  }
  function deviceText(item){
    return (item.client_label||"Navegador desconhecido")+" (informação declarada pelo navegador)";
  }
  function displayPending(list){
    requests.replaceChildren();
    for(const item of list){
      const row=document.createElement("div");row.className="quick-chart-request";
      label(row,deviceText(item)+" · "+clock(item.created_at));
      row.append(button("Aprovar",()=>decide(item.id,true)),button("Recusar",()=>decide(item.id,false)));
      requests.append(row);
    }
    if(!list.length)empty(requests,"Nenhum computador aguardando aprovação.");
  }
  function displaySessions(list){
    sessions.replaceChildren();
    for(const item of list){
      const article=document.createElement("div");article.className="quick-chart-request";
      label(article,deviceText(item)+" · Acesso até "+clock(item.expires_at));
      sessions.append(article);
    }
    if(!list.length)empty(sessions,"Nenhum computador conectado.");
  }
  function displayInbox(list){
    inbox.replaceChildren();
    for(const item of list){
      const article=document.createElement("article");article.className="quick-chart-inbox-item";
      const stamp=document.createElement("small");stamp.textContent="Recebido em "+clock(item.created_at);
      const pre=document.createElement("pre");pre.textContent=item.body;
      const actions=document.createElement("div");actions.className="quick-chart-inbox-actions";
      actions.append(button("Copiar",async()=>{
        try{await navigator.clipboard.writeText(item.body);status.textContent="Texto copiado.";}
        catch{status.textContent="Não foi possível copiar. Selecione o texto.";}
      }),button("Excluir",async()=>{
        try{await call("delete_message",{id:item.id});await refresh();}
        catch(e){status.textContent=e.message;}
      }));
      article.append(stamp,pre,actions);inbox.append(article);
    }
    if(!list.length)empty(inbox,"Nenhum texto recebido do computador.");
  }
  async function refresh(){
    const current=owned?.ownerId;
    if(!current||current!==owner)return;
    const stamp=epoch;
    try{
      const [config,pending,active,messages]=await Promise.all([
        call("status"),call("pending"),call("sessions"),call("inbox")
      ]);
      if(stamp!==epoch||current!==owned?.ownerId)return;
      configured=Boolean(config.configured);
      state.textContent=configured?"Senha de 4 dígitos configurada. Ela não muda automaticamente.":"Defina uma senha fixa de 4 dígitos.";
      save.textContent=configured?"Alterar senha":"Definir senha";
      revoke.disabled=!configured;
      displayPending(pending.requests||[]);
      displaySessions(active.sessions||[]);
      displayInbox(messages.messages||[]);
    }catch(e){if(stamp===epoch)status.textContent=e.message;}
  }
  async function decide(id,approve){
    if(working)return;
    const stamp=epoch;working=true;
    try{
      await call("decide",{id,approve});
      if(stamp!==epoch)return;
      status.textContent=approve?"Computador aprovado para esta sessão.":"Acesso recusado.";
      await refresh();
    }catch(e){if(stamp===epoch)status.textContent=e.message;}
    finally{working=false;}
  }
  async function setPIN(){
    const value=pin.value.trim(),confirmation=confirmPin.value.trim();
    if(!/^\d{4}$/.test(value)){status.textContent="A senha deve conter exatamente 4 números.";return;}
    if(value!==confirmation){status.textContent="As duas senhas não coincidem.";return;}
    if(working)return;
    if(configured&&!window.confirm("Alterar a senha fixa? Todos os computadores serão desconectados."))return;
    working=true;save.disabled=true;
    try{
      await call("set_pin",{pin:value});
      pin.value="";confirmPin.value="";
      status.textContent="Senha fixa salva. Computadores anteriores foram desconectados.";
      configured=true;await refresh();
    }catch(e){status.textContent=e.message;}
    finally{working=false;save.disabled=false;}
  }
  async function revokeAll(){
    if(!configured||working)return;
    if(!window.confirm("Revogar TODOS os acessos externos? Computadores já autorizados perderão o acesso imediatamente. Sua conta neste celular continuará conectada."))return;
    working=true;revoke.disabled=true;
    try{
      await call("revoke_all");
      status.textContent="Todos os acessos externos foram revogados.";
      await refresh();
    }catch(e){status.textContent=e.message;}
    finally{working=false;revoke.disabled=false;}
  }
  save.addEventListener("click",setPIN);
  revoke.addEventListener("click",revokeAll);
  window.addEventListener("luria:owner-changed",()=>{
    epoch++;configured=false;owner="";pin.value="";confirmPin.value="";
    if(timer)window.clearInterval(timer);timer=null;
    state.textContent="Consultando segurança…";status.textContent="";
    empty(requests,"Aguardando acesso à conta.");empty(sessions,"Aguardando acesso à conta.");
    empty(inbox,"Aguardando acesso à conta.");
    Promise.resolve(owned?.ready).then(init);
  });
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh();});
  async function init(){
    await owned?.ready;
    const current=owned?.ownerId;
    if(!current)return;
    owner=current;await refresh();
    if(timer)window.clearInterval(timer);
    timer=window.setInterval(()=>{if(!document.hidden)refresh();},5000);
  }
  init();
})();