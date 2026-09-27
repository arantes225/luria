(() => {
  const sb=window.supabaseClient;
  if(!sb) return;
  const status=document.getElementById("quick-chart-status");
  const contentBox=document.getElementById("quick-chart-current-content");
  const expiry=document.getElementById("quick-chart-expiry");
  let user=null;
  let portal=null;
  let username="";

  const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const publicAddress=()=>username?location.origin+"/"+username:location.origin+"/configuracoes/#perfil";

  function renderAddress(){
    const el=document.getElementById("quick-chart-public-address");
    if(el) el.textContent=username?publicAddress():"Defina seu nome de usuário em Perfil e Conta";
  }

  function renderContent(){
    renderAddress();
    const codeTitle=document.getElementById("quick-chart-code-title");
    const codeHelp=document.getElementById("quick-chart-code-help");
    if(codeTitle) codeTitle.textContent=username?("@"+username):"Nome de usuário + PIN";
    if(codeHelp) codeHelp.textContent=username
      ? "Abra seu endereço pessoal e digite o PIN de 4 dígitos."
      : "Defina um nome de usuário e um PIN em Configurações > Perfil e Conta.";

    if(!portal){
      contentBox.className="quick-chart-current-content empty";
      contentBox.textContent="Nenhum conteúdo ativo.";
      expiry.textContent="Nenhum conteúdo ativo";
      return;
    }

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
    const [{data:profile,error:profileError},{data,error}]=await Promise.all([
      sb.from("profiles").select("username").eq("user_id",user.id).maybeSingle(),
      sb.from("external_quick_chart_portals")
        .select("owner_id,access_slug,content,content_expires_at,last_accessed_at,updated_at,pin_configured_at")
        .eq("owner_id",user.id).maybeSingle()
    ]);
    if(profileError||error){
      console.error(profileError||error);
      status.textContent="Não foi possível carregar o Prontuário Rápido.";
      return;
    }
    username=String(profile?.username||"").trim().toLowerCase();
    portal=data||null;
    if(portal?.content_expires_at && new Date(portal.content_expires_at).getTime()<=Date.now()){
      await sb.from("external_quick_chart_portals").update({content:{},content_expires_at:null}).eq("owner_id",user.id);
      portal={...portal,content:{},content_expires_at:null};
    }
    renderContent();
  }

  async function clearContent(){
    if(!portal)return;
    const {error}=await sb.from("external_quick_chart_portals")
      .update({content:{},content_expires_at:null})
      .eq("owner_id",user.id);
    if(error){status.textContent="Não foi possível limpar o conteúdo.";return;}
    portal={...portal,content:{},content_expires_at:null};
    status.textContent="Conteúdo apagado.";
    renderContent();
  }

  document.getElementById("quick-chart-copy-address").addEventListener("click",async()=>{
    if(!username){status.textContent="Defina seu nome de usuário primeiro.";return;}
    const url=publicAddress();
    try{await navigator.clipboard.writeText(url);status.textContent="Endereço copiado.";}catch{status.textContent=url;}
  });
  document.getElementById("quick-chart-refresh").addEventListener("click",load);
  document.getElementById("quick-chart-clear").addEventListener("click",clearContent);

  async function init(){
    user=window.docmapUser||null;
    if(!user){const {data}=await sb.auth.getUser();user=data?.user||null;}
    if(!user)return;
    await load();
  }
  if(window.docmapUser)init();
  else window.addEventListener("docmap:ready",init,{once:true});
})();