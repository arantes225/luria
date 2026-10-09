(() => {
  const sb=window.supabaseClient;
  if(!sb) return;
  const status=document.getElementById("quick-chart-status");
  const note=document.getElementById("quick-chart-note");
  const expiry=document.getElementById("quick-chart-expiry");
  const saveBtn=document.getElementById("quick-chart-save-note");
  let user=null;
  let portal=null;
  let username="";
  const owned=window.LuriaLocalOwnerStore;
  let operations=Promise.resolve(),generation=0,loading=true,initializationVersion=-1;
  const current=(owner,version)=>owned?.ownerId===owner&&generation===version;
  function enqueue(operation){const pending=operations.then(operation,operation);operations=pending.catch(()=>{});return pending;}

  const ENDPOINT="https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart";
  const APIKEY="sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";
  const publicAddress=()=>username?location.origin+"/"+username:location.origin+"/configuracoes/#perfil";

  function setStatus(text){ if(status) status.textContent=text; }
  function renderAddress(){
    const el=document.getElementById("quick-chart-public-address");
    if(el) el.textContent=username?publicAddress():"Defina seu usuário";
  }
  function renderExpiry(){
    if(!expiry)return;
    if(portal?.content_expires_at){
      const d=new Date(portal.content_expires_at);
      expiry.textContent="Apaga em "+d.toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
    }else expiry.textContent="Nenhum conteúdo ativo";
  }

  async function savePinHere(){
    const button=document.getElementById("quick-chart-save-pin");
    const pin=String(document.getElementById("quick-chart-pin")?.value||"").replace(/\D/g,"");
    const confirmPin=String(document.getElementById("quick-chart-pin-confirm")?.value||"").replace(/\D/g,"");
    if(!username){setStatus("Defina primeiro seu nome de usuário em Perfil e Conta.");return;}
    if(!/^\d{4}$/.test(pin)){setStatus("O PIN precisa ter 4 dígitos.");return;}
    if(pin!==confirmPin){setStatus("Os PINs não coincidem.");return;}
    const owner=user?.id,version=generation;
    if(!current(owner,version))return;
    const {data:sessionData}=await sb.auth.getSession();
    if(!current(owner,version))return;
    const token=sessionData?.session?.access_token;
    if(!token){setStatus("Sua sessão expirou. Entre novamente.");return;}
    button.disabled=true;setStatus("Salvando PIN…");
    try{
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","apikey":APIKEY,"Authorization":"Bearer "+token},body:JSON.stringify({action:"set_pin",pin})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error||"Não foi possível salvar o PIN.");
      if(!current(owner,version))return;
      document.getElementById("quick-chart-pin").value="";
      document.getElementById("quick-chart-pin-confirm").value="";
      portal={...(portal||{}),pin_configured_at:new Date().toISOString(),access_slug:username};
      setStatus("PIN salvo.");
    }catch(error){if(current(owner,version))setStatus(error?.message||"Não foi possível salvar o PIN.");}
    finally{button.disabled=false;}
  }

  async function load(){
    if(!user)return;
    const owner=user.id,version=generation;
    const [{data:profile,error:profileError},{data,error}]=await Promise.all([
      sb.from("profiles").select("username").eq("user_id",owner).maybeSingle(),
      sb.from("external_quick_chart_portals").select("owner_id,access_slug,content,content_expires_at,pin_configured_at").eq("owner_id",owner).maybeSingle()
    ]);
    if(!current(owner,version))return;
    if(profileError||error){console.error(profileError||error);setStatus("Não foi possível carregar o caderno.");return;}
    username=String(profile?.username||"").trim().toLowerCase();
    portal=data||null;
    if(portal?.content_expires_at && new Date(portal.content_expires_at).getTime()<=Date.now()){
      const {error:expiryError}=await sb.from("external_quick_chart_portals").update({content:{},content_expires_at:null}).eq("owner_id",owner);
      if(!current(owner,version))return;
      if(expiryError){setStatus("Não foi possível limpar o conteúdo expirado.");return;}
      portal={...portal,content:{},content_expires_at:null};
    }
    note.value=String(portal?.content?.note||"");
    const shouldImport=new URLSearchParams(location.search).get("import")==="1";
    const incoming=shouldImport?window.LuriaClinicalBridge?.consume():null;
    if(incoming?.text){
      const block=[incoming.title?String(incoming.title).toUpperCase():"",String(incoming.text||"")].filter(Boolean).join("\n");
      note.value=note.value.trim()?note.value.trimEnd()+"\n\n──────────\n"+block:block;
    }
    loading=false;renderAddress();renderExpiry();setStatus(incoming?.text?"Conteúdo importado. Revise e salve.":"Pronto");
  }

  async function saveNote(){
    const owner=user?.id,version=generation,content=note.value;
    if(!owner||!current(owner,version))return;
    if(loading){setStatus("Aguarde o carregamento do caderno.");return;}
    const expires=new Date(Date.now()+12*60*60*1000).toISOString();
    const payload={owner_id:owner,access_slug:username||null,content:{note:content},content_expires_at:content.trim()?expires:null};
    return enqueue(async()=>{
      if(!current(owner,version))return;
      saveBtn.disabled=true;setStatus("Salvando…");
      try{
        const {data,error}=await sb.from("external_quick_chart_portals").upsert(payload,{onConflict:"owner_id"}).select("owner_id,access_slug,content,content_expires_at,pin_configured_at").single();
        if(error)throw error;
        if(!current(owner,version))return;
        portal=data;renderExpiry();setStatus(note.value===content?"Salvo":"Alterações pendentes");
      }catch(error){if(current(owner,version)){console.error(error);setStatus("Não foi possível salvar.");}}
      finally{saveBtn.disabled=false;}
    });
  }

  async function clearContent(){
    const owner=user?.id,previous=note.value;
    if(!owner||!current(owner,generation))return;
    if(loading){setStatus("Aguarde o carregamento do caderno.");return;}
    const version=++generation,slug=username;
    note.value="";
    return enqueue(async()=>{
      if(!current(owner,version))return;
      const {error}=await sb.from("external_quick_chart_portals").upsert({owner_id:owner,access_slug:slug||null,content:{},content_expires_at:null},{onConflict:"owner_id"});
      if(!current(owner,version))return;
      if(error){if(!note.value)note.value=previous;setStatus("Não foi possível limpar.");return;}
      portal={...(portal||{}),content:{},content_expires_at:null};renderExpiry();setStatus(note.value?"Alterações pendentes":"Conteúdo limpo.");
    }).catch(error=>{if(current(owner,version)){if(!note.value)note.value=previous;setStatus("Não foi possível limpar.");console.error(error);}});
  }

  document.getElementById("quick-chart-save-pin")?.addEventListener("click",savePinHere);
  ["quick-chart-pin","quick-chart-pin-confirm"].forEach(id=>{
    document.getElementById(id)?.addEventListener("input",e=>{e.currentTarget.value=e.currentTarget.value.replace(/\D/g,"").slice(0,4)});
  });
  document.getElementById("quick-chart-copy-address")?.addEventListener("click",async()=>{
    if(!username){setStatus("Defina seu nome de usuário primeiro.");return;}
    const url=publicAddress();
    try{await navigator.clipboard.writeText(url);setStatus("Acesso copiado.");}catch{setStatus(url);}
  });
  saveBtn?.addEventListener("click",saveNote);
  document.getElementById("quick-chart-clear")?.addEventListener("click",clearContent);
  note?.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault();saveNote();}});

  async function init(){
    await owned?.ready;
    const owner=owned?.ownerId;
    if(!owner||initializationVersion===generation)return;
    initializationVersion=generation;
    user={id:owner};
    const version=generation;
    try{await enqueue(()=>current(owner,version)?load():undefined);}
    catch(error){if(current(owner,version)){console.error(error);setStatus("Não foi possível carregar o caderno.");}}
  }
  window.addEventListener("luria:owner-changed",()=>{
    generation++;loading=true;user=null;portal=null;username="";note.value="";
    ["quick-chart-pin","quick-chart-pin-confirm"].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});
    renderAddress();renderExpiry();setStatus(owned.ownerId?"Carregando…":"Entre na sua conta.");
    if(owned.ownerId)init();
  });
  init();
})();
