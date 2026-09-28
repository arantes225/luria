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
    const {data:sessionData}=await sb.auth.getSession();
    const token=sessionData?.session?.access_token;
    if(!token){setStatus("Sua sessão expirou. Entre novamente.");return;}
    button.disabled=true;setStatus("Salvando PIN…");
    try{
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","apikey":APIKEY,"Authorization":"Bearer "+token},body:JSON.stringify({action:"set_pin",pin})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error||"Não foi possível salvar o PIN.");
      document.getElementById("quick-chart-pin").value="";
      document.getElementById("quick-chart-pin-confirm").value="";
      portal={...(portal||{}),pin_configured_at:new Date().toISOString(),access_slug:username};
      setStatus("PIN salvo.");
    }catch(error){setStatus(error?.message||"Não foi possível salvar o PIN.");}
    finally{button.disabled=false;}
  }

  async function load(){
    if(!user)return;
    const [{data:profile,error:profileError},{data,error}]=await Promise.all([
      sb.from("profiles").select("username").eq("user_id",user.id).maybeSingle(),
      sb.from("external_quick_chart_portals").select("owner_id,access_slug,content,content_expires_at,pin_configured_at").eq("owner_id",user.id).maybeSingle()
    ]);
    if(profileError||error){console.error(profileError||error);setStatus("Não foi possível carregar o caderno.");return;}
    username=String(profile?.username||"").trim().toLowerCase();
    portal=data||null;
    if(portal?.content_expires_at && new Date(portal.content_expires_at).getTime()<=Date.now()){
      await sb.from("external_quick_chart_portals").update({content:{},content_expires_at:null}).eq("owner_id",user.id);
      portal={...portal,content:{},content_expires_at:null};
    }
    note.value=String(portal?.content?.note||"");
    const shouldImport=new URLSearchParams(location.search).get("import")==="1";
    const incoming=shouldImport?window.LuriaClinicalBridge?.consume():null;
    if(incoming?.text){
      const block=[incoming.title?String(incoming.title).toUpperCase():"",String(incoming.text||"")].filter(Boolean).join("\n");
      note.value=note.value.trim()?note.value.trimEnd()+"\n\n──────────\n"+block:block;
    }
    renderAddress();renderExpiry();setStatus(incoming?.text?"Conteúdo importado. Revise e salve.":"Pronto");
  }

  async function saveNote(){
    if(!user)return;
    saveBtn.disabled=true;setStatus("Salvando…");
    try{
      const expires=new Date(Date.now()+12*60*60*1000).toISOString();
      const payload={owner_id:user.id,access_slug:username||null,content:{note:note.value},content_expires_at:note.value.trim()?expires:null};
      const {data,error}=await sb.from("external_quick_chart_portals").upsert(payload,{onConflict:"owner_id"}).select("owner_id,access_slug,content,content_expires_at,pin_configured_at").single();
      if(error)throw error;
      portal=data;renderExpiry();setStatus("Salvo");
    }catch(error){console.error(error);setStatus("Não foi possível salvar.");}
    finally{saveBtn.disabled=false;}
  }

  async function clearContent(){
    if(!user)return;
    note.value="";
    const {error}=await sb.from("external_quick_chart_portals").upsert({owner_id:user.id,access_slug:username||null,content:{},content_expires_at:null},{onConflict:"owner_id"});
    if(error){setStatus("Não foi possível limpar.");return;}
    portal={...(portal||{}),content:{},content_expires_at:null};renderExpiry();setStatus("Conteúdo limpo.");
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
    user=window.docmapUser||null;
    if(!user){const {data}=await sb.auth.getUser();user=data?.user||null;}
    if(!user)return;
    await load();
  }
  if(window.docmapUser)init();else window.addEventListener("docmap:ready",init,{once:true});
})();