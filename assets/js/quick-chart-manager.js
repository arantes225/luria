(() => {
  const sb=window.supabaseClient;
  if(!sb) return;
  const status=document.getElementById("quick-chart-status");
  const codeInput=document.getElementById("quick-chart-code-input");
  const saveCode=document.getElementById("quick-chart-save-code");
  const suggest=document.getElementById("quick-chart-suggest-code");
  const codeTitle=document.getElementById("quick-chart-code-title");
  const codeHelp=document.getElementById("quick-chart-code-help");
  const contentBox=document.getElementById("quick-chart-current-content");
  const expiry=document.getElementById("quick-chart-expiry");
  let user=null;
  let portal=null;

  const normalizeCode=value=>String(value||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,32);
  const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  async function sha256(value){
    const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  function randomCode(length=12){
    const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes=new Uint8Array(length);crypto.getRandomValues(bytes);
    return [...bytes].map(x=>alphabet[x%alphabet.length]).join("");
  }
  function formatCode(value){
    const raw=normalizeCode(value);
    return raw.replace(/(.{4})/g,"$1-").replace(/-$/,"");
  }
  function renderContent(){
    if(!portal){
      contentBox.className="quick-chart-current-content empty";
      contentBox.textContent="Configure um código fixo para começar.";
      expiry.textContent="Nenhum código configurado";
      codeTitle.textContent="Configure seu código";
      codeHelp.textContent="Você vai digitar este mesmo código toda vez que usar um computador externo.";
      return;
    }
    codeTitle.textContent="Código fixo configurado";
    codeHelp.textContent="O mesmo código continua válido até você substituí-lo aqui.";
    const c=portal.content||{};
    const entries=[
      ["Paciente / leito",c.patient],["Idade",c.age],["Sexo",c.sex],
      ["Queixa principal",c.chief_complaint],["HDA / anamnese",c.history],
      ["Exame físico",c.physical_exam],["Exames",c.tests],["Hipóteses",c.assessment],
      ["Conduta",c.plan],["Evolução / observações",c.progress]
    ].filter(([,v])=>String(v||"").trim());
    if(!entries.length){
      contentBox.className="quick-chart-current-content empty";
      contentBox.textContent="O bloco externo está vazio.";
    }else{
      contentBox.className="quick-chart-current-content";
      contentBox.innerHTML=entries.map(([label,value])=>`<section><strong>${esc(label)}</strong><p>${esc(value).replaceAll("\n","<br>")}</p></section>`).join("");
    }
    if(portal.content_expires_at){
      const d=new Date(portal.content_expires_at);
      expiry.textContent="Conteúdo apaga "+d.toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"});
    }else{
      expiry.textContent="Nenhum conteúdo ativo";
    }
  }
  async function load(){
    if(!user) return;
    const {data,error}=await sb.from("external_quick_chart_portals")
      .select("owner_id,content,content_expires_at,last_accessed_at,updated_at")
      .eq("owner_id",user.id)
      .maybeSingle();
    if(error){console.error(error);status.textContent="Não foi possível carregar o prontuário rápido.";return;}
    portal=data||null;
    if(portal?.content_expires_at && new Date(portal.content_expires_at).getTime()<=Date.now()){
      await sb.from("external_quick_chart_portals").update({content:{},content_expires_at:null}).eq("owner_id",user.id);
      portal={...portal,content:{},content_expires_at:null};
    }
    renderContent();
  }
  async function saveFixedCode(){
    const code=normalizeCode(codeInput.value);
    if(code.length<10){
      status.textContent="Use um código com pelo menos 10 letras ou números.";
      return;
    }
    saveCode.disabled=true;status.textContent="Salvando código…";
    try{
      const hash=await sha256(code);
      const payload={
        owner_id:user.id,
        access_code_hash:hash,
        content:portal?.content||{},
        content_expires_at:portal?.content_expires_at||null
      };
      const {data,error}=await sb.from("external_quick_chart_portals")
        .upsert(payload,{onConflict:"owner_id"})
        .select("owner_id,content,content_expires_at,last_accessed_at,updated_at")
        .single();
      if(error) throw error;
      portal=data;
      codeInput.value="";
      status.textContent="Código salvo. Memorize-o: "+formatCode(code);
      renderContent();
    }catch(e){
      console.error(e);
      status.textContent=e?.code==="23505"?"Esse código já está em uso. Escolha outro.":"Não foi possível salvar o código.";
    }finally{saveCode.disabled=false;}
  }
  async function clearContent(){
    if(!portal)return;
    const {error}=await sb.from("external_quick_chart_portals")
      .update({content:{},content_expires_at:null})
      .eq("owner_id",user.id);
    if(error){status.textContent="Não foi possível limpar o conteúdo.";return;}
    portal={...portal,content:{},content_expires_at:null};
    status.textContent="Conteúdo apagado. O código continua o mesmo.";
    renderContent();
  }
  document.getElementById("quick-chart-copy-address").addEventListener("click",async()=>{
    const url=location.origin+"/trabalho/prontuario/";
    try{await navigator.clipboard.writeText(url);status.textContent="Endereço copiado.";}catch{status.textContent=url;}
  });
  document.getElementById("quick-chart-refresh").addEventListener("click",load);
  document.getElementById("quick-chart-clear").addEventListener("click",clearContent);
  suggest.addEventListener("click",()=>{const code=randomCode();codeInput.value=formatCode(code);status.textContent="Código sugerido. Salve para ativá-lo.";});
  saveCode.addEventListener("click",saveFixedCode);
  codeInput.addEventListener("keydown",e=>{if(e.key==="Enter")saveFixedCode();});

  async function init(){
    user=window.docmapUser||null;
    if(!user){const {data}=await sb.auth.getUser();user=data?.user||null;}
    if(!user)return;
    await load();
  }
  if(window.docmapUser)init();
  else window.addEventListener("docmap:ready",init,{once:true});
})();