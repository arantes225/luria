(() => {
  "use strict";
  const sb=window.supabaseClient;
  const owned=window.TraubeLocalOwnerStore;
  const $=id=>document.getElementById(id);
  const output=$("quick-chart-daily-code"),expiry=$("quick-chart-daily-day");
  const status=$("quick-chart-daily-status"),copy=$("quick-chart-copy-daily-code");
  const requests=$("quick-chart-pair-requests"),inbox=$("quick-chart-inbox-list");
  if(!sb||!output||!expiry||!status||!copy||!requests||!inbox)return;
  const endpoint="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart-pair";
  const key="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  let pin="",validUntil=0,epoch=0,owner="",timer=null,issuing=false;
  const valid=()=>pin&&Date.now()<validUntil;
  const time=ms=>new Date(ms).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  function wipe(message){
    pin="";validUntil=0;output.textContent="••";expiry.textContent=message||"PIN indisponível";
    copy.disabled=true;requests.replaceChildren();inbox.replaceChildren();
  }
  async function call(action,body={}){
    const {data}=await sb.auth.getSession();
    if(!data?.session?.access_token)throw Error("Faça login na TRAUBE para continuar.");
    const response=await fetch(endpoint,{method:"POST",cache:"no-store",
      headers:{"Content-Type":"application/json","apikey":key,"Authorization":"Bearer "+data.session.access_token},
      body:JSON.stringify({...body,action})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw Error(result.error||"Não foi possível conectar.");
    return result;
  }
  function makeButton(text,callback){
    const button=document.createElement("button");
    button.type="button";button.textContent=text;button.addEventListener("click",callback);
    return button;
  }
  function renderRequests(items,stamp){
    if(stamp!==epoch)return;
    requests.replaceChildren();
    for(const item of items){
      const row=document.createElement("div");row.className="quick-chart-request";
      const copy=document.createElement("span");
      copy.textContent="Computador aguardando aprovação · "+time(Date.parse(item.created_at));
      const yes=makeButton("Aprovar",()=>decide(item.id,true));
      const no=makeButton("Recusar",()=>decide(item.id,false));
      row.append(copy,yes,no);requests.append(row);
    }
    if(!items.length){
      const empty=document.createElement("p");empty.textContent="Nenhuma solicitação pendente.";requests.append(empty);
    }
  }
  function renderInbox(items,stamp){
    if(stamp!==epoch)return;
    inbox.replaceChildren();
    for(const item of items){
      const article=document.createElement("article");article.className="quick-chart-inbox-item";
      const timestamp=document.createElement("small");
      timestamp.textContent="Recebido às "+time(Date.parse(item.created_at));
      const content=document.createElement("pre");content.textContent=item.body;
      const controls=document.createElement("div");controls.className="quick-chart-inbox-actions";
      controls.append(
        makeButton("Copiar",async()=>{
          try{await navigator.clipboard.writeText(item.body);status.textContent="Texto copiado.";}
          catch{status.textContent="Não foi possível copiar. Selecione o texto.";}
        }),
        makeButton("Excluir",async()=>{
          try{await call("delete_message",{id:item.id});await refresh();}
          catch(e){status.textContent=e.message;}
        })
      );
      article.append(timestamp,content,controls);inbox.append(article);
    }
    if(!items.length){
      const empty=document.createElement("p");empty.textContent="Ainda não há textos recebidos do computador.";inbox.append(empty);
    }
  }
  async function decide(id,approve){
    const stamp=epoch;
    try{
      await call("decide",{id,approve});
      if(stamp===epoch){status.textContent=approve?"Acesso autorizado para este computador.":"Solicitação recusada.";await refresh();}
    }catch(e){if(stamp===epoch)status.textContent=e.message;}
  }
  async function refresh(){
    if(!owned?.ownerId||owned.ownerId!==owner)return;
    const stamp=epoch;
    if(pin&&Date.now()>=validUntil){
      pin="";output.textContent="••";copy.disabled=true;
      expiry.textContent="PIN expirado. Reabra a Cola Rápida para gerar outro.";
    }
    try{
      const [pending,messages]=await Promise.all([call("pending"),call("inbox")]);
      if(stamp!==epoch||owned.ownerId!==owner)return;
      renderRequests(pending.requests||[],stamp);
      renderInbox(messages.messages||[],stamp);
    }catch(e){if(stamp===epoch)status.textContent=e.message;}
  }
  async function issue(){
    if(issuing)return;
    const current=owned?.ownerId;
    const stamp=epoch;
    if(!current){wipe("Entre na conta.");return;}
    issuing=true;
    output.textContent="••";expiry.textContent="Gerando PIN seguro…";copy.disabled=true;
    try{
      const data=await call("issue");
      if(stamp!==epoch||owned.ownerId!==current)return;
      if(!/^\d{2}$/.test(data.pin))throw Error("O servidor retornou um PIN inválido.");
      owner=current;pin=data.pin;validUntil=Date.parse(data.expires_at);
      output.textContent=pin;expiry.textContent="Válido até "+time(validUntil);
      copy.disabled=false;status.textContent="O computador também precisará da sua aprovação.";
      await refresh();
      if(timer)window.clearInterval(timer);
      timer=window.setInterval(()=>{if(!document.hidden)refresh();},5000);
    }catch(e){if(stamp===epoch){wipe("PIN indisponível");status.textContent=e.message;}}
    finally{issuing=false;}
  }
  copy.addEventListener("click",async()=>{
    if(!valid()){copy.disabled=true;expiry.textContent="PIN expirado. Reabra a Cola Rápida.";return;}
    try{await navigator.clipboard.writeText(pin);status.textContent="PIN copiado. Aprove a solicitação neste celular.";}
    catch{status.textContent="Selecione os dígitos exibidos para copiar.";}
  });
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh();});
  window.addEventListener("luria:owner-changed",()=>{
    epoch++;owner="";issuing=false;
    if(timer)window.clearInterval(timer);timer=null;
    wipe("Atualizando conta…");
    Promise.resolve(owned?.ready).then(issue);
  });
  // Intencionalmente não gera novo PIN por timer, foco ou consulta periódica.
  Promise.resolve(owned?.ready).then(issue);
})();
