(() => {
  const page=document.querySelector('body[data-page="trabalho_dashboard"] .page');
  if(!page) return;

  const $=id=>document.getElementById(id);
  const esc=value=>String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const icon=(name)=>{
    const paths={
      calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
      briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      money:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H5v2M17 15h2v-2"/>',
      steth:'<path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
      rx:'<path d="M5 4h6a4 4 0 0 1 0 8H5zM9 12l8 8M14 14l5-5"/>',
      calc:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 18h1M12 18h5"/>',
      cid:'<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v5h5M8 13h8M8 17h6"/>',
      lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 16h10"/>',
      ecg:'<path d="M2 12h4l2-5 4 10 3-7 2 2h5"/>',
      file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
      shield:'<path d="M12 3l8 3v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
      users:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 19c0-4 2.5-6 6-6s6 2 6 6M15 14c3 0 5 1.6 5 5"/>',
      droplet:'<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
      protocol:'<path d="M7 3h10v4H7z"/><path d="M5 7h14v14H5zM8 11h8M8 15h8M8 19h5"/>'
    };
    return `<svg class="work-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.file}</svg>`;
  };
  const heading=(i,title,href="")=>`<div class="work-card-heading"><h3><span class="work-heading-icon">${icon(i)}</span>${esc(title)}</h3>${href?`<a href="${href}">Abrir →</a>`:""}</div>`;

  function userName(){
    return (
      window.docmapProfile?.display_name||
      window.docmapUser?.user_metadata?.display_name||
      window.docmapUser?.email?.split("@")[0]||
      "Doutor"
    ).trim();
  }
  function greeting(){
    const h=new Date().getHours();
    return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite";
  }
  function formatDate(){
    return new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"numeric",month:"long"}).format(new Date());
  }
  function toolsGrid(){
    const items=[
      ["rx","Bulário","Consultar medicamentos","/trabalho/bulario/"],
      ["calc","Calculadoras","Ferramentas clínicas","/trabalho/calculadora/"],
      ["cid","CID","Buscar códigos","/trabalho/cid/"],
      ["file","Prescrição","Apoio à prescrição","/trabalho/prescricao/"],
      ["lab","Laboratório","Referências e interpretação","/trabalho/laboratorio/"],
      ["droplet","Fluidos e eletrólitos","Reposição e correções","/trabalho/fluidos-eletrólitos/"],
      ["ecg","ECG","Apoio à interpretação","/trabalho/ecg/"],
      ["protocol","Protocolos","Condutas rápidas","/trabalho/protocolos/"]
    ];
    return `<div class="work-quick-grid">${items.map(([i,t,s,h])=>`<a class="work-tool" href="${h}"><span class="work-tool-icon">${icon(i)}</span><span><strong>${esc(t)}</strong><small>${esc(s)}</small></span></a>`).join("")}</div>`;
  }
  function detailed(){
    return `
      <div class="work-grid work-detail">
        <section class="work-card work-metric">
          <span class="work-metric-label">Próximo plantão</span>
          <strong class="work-metric-value">—</strong>
          <small class="work-metric-help">Nenhum plantão configurado</small>
        </section>
        <section class="work-card work-metric">
          <span class="work-metric-label">Plantões no mês</span>
          <strong class="work-metric-value">0</strong>
          <small class="work-metric-help">A escala ainda não possui registros</small>
        </section>
        <section class="work-card work-metric">
          <span class="work-metric-label">Horas previstas</span>
          <strong class="work-metric-value">0h</strong>
          <small class="work-metric-help">Será calculado pela sua escala</small>
        </section>
        <section class="work-card work-metric">
          <span class="work-metric-label">Recebimentos previstos</span>
          <strong class="work-metric-value">R$ —</strong>
          <small class="work-metric-help">Será calculado pelo Financeiro</small>
        </section>

        <section class="work-card work-span-2">
          ${heading("calendar","Agenda de trabalho","/trabalho/plantoes/")}
          <div class="work-empty"><div><strong>Sua escala ainda está vazia</strong>Quando você cadastrar plantões, o próximo turno, horário, local e duração aparecem aqui.<br><a href="/trabalho/plantoes/">Configurar escala</a></div></div>
        </section>

        <section class="work-card work-span-2">
          ${heading("briefcase","Gestão dos plantões")}
          <div class="work-shift-summary">
            <a href="/trabalho/plantoes/"><small>Escala</small><strong>Organizar plantões</strong></a>
            <a href="/trabalho/divisor-plantao/"><small>Divisão</small><strong>Divisor de plantão</strong></a>
            <a href="/trabalho/financeiro/"><small>Financeiro</small><strong>Pagamentos e repasses</strong></a>
          </div>
        </section>

        <section class="work-card work-span-2">
          ${heading("steth","Atendimento")}
          <div class="work-action-row">
            <a href="/trabalho/prontuario-rapido/">Prontuário rápido</a>
            <a href="/trabalho/diagnostico/">Apoio diagnóstico</a>
            <a href="/trabalho/pcr/">Registro de PCR</a>
          </div>
        </section>

        <section class="work-card work-span-2">
          ${heading("money","Resumo financeiro","/trabalho/financeiro/")}
          <div class="work-finance-list">
            <div class="work-finance-row"><div><strong>Recebido no mês</strong><small>Pagamentos já confirmados</small></div><span>Sem registros</span></div>
            <div class="work-finance-row"><div><strong>A receber</strong><small>Plantões pendentes de pagamento</small></div><span>Sem registros</span></div>
            <div class="work-finance-row"><div><strong>Valor médio por hora</strong><small>Calculado a partir dos plantões pagos</small></div><span>—</span></div>
          </div>
        </section>

        <section class="work-card work-span-4">
          ${heading("calc","Ferramentas rápidas")}
          ${toolsGrid()}
        </section>
      </div>`;
  }
  function simple(){
    return `
      <div class="work-grid work-simple">
        <section class="work-card work-simple-next">
          ${heading("calendar","Próximo plantão","/trabalho/plantoes/")}
          <div class="work-empty"><div><strong>Nenhum plantão configurado</strong>Cadastre sua escala para ver o próximo turno diretamente no dashboard.<br><a href="/trabalho/plantoes/">Abrir escala</a></div></div>
        </section>
        <section class="work-card">
          ${heading("briefcase","Resumo do mês")}
          <div class="work-simple-status">
            <div><span>Plantões</span><strong>0</strong></div>
            <div><span>Horas previstas</span><strong>0h</strong></div>
            <div><span>A receber</span><strong>R$ —</strong></div>
          </div>
        </section>
        <section class="work-card work-simple-actions">
          ${heading("steth","Acesso rápido")}
          <div class="work-simple-actions-grid">
            <a href="/trabalho/prontuario-rapido/"><span class="work-tool-icon">${icon("steth")}</span>Prontuário rápido</a>
            <a href="/trabalho/prescricao/"><span class="work-tool-icon">${icon("rx")}</span>Prescrição</a>
            <a href="/trabalho/calculadora/"><span class="work-tool-icon">${icon("calc")}</span>Calculadoras</a>
            <a href="/trabalho/protocolos/"><span class="work-tool-icon">${icon("protocol")}</span>Protocolos</a>
          </div>
        </section>
      </div>`;
  }

  function cleanWorkTopbar(){
    const topbar=document.querySelector('body[data-page="trabalho_dashboard"] .topbar');
    if(!topbar) return;
    [...topbar.childNodes].forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE && node.textContent.trim()) node.remove();
    });
    topbar.querySelectorAll('[data-work-dashboard-stray="1"]').forEach(el=>el.remove());
  }

  const root=$("work-dashboard-content");
  const buttons=[...document.querySelectorAll("[data-work-layout]")];
  function storageKey(){return `luria:work-dashboard-layout:${window.docmapUser?.id||"guest"}`;}
  function readLayout(){try{return localStorage.getItem(storageKey())||"detailed";}catch{return "detailed";}}
  function render(layout){
    const value=layout==="simple"?"simple":"detailed";
    document.body.dataset.workDashboardLayout=value;
    buttons.forEach(btn=>{const active=btn.dataset.workLayout===value;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
    if(root) root.innerHTML=value==="simple"?simple():detailed();
  }
  buttons.forEach(btn=>btn.addEventListener("click",()=>render(btn.dataset.workLayout)));
  const nameEl=$("work-dashboard-name");
  if(nameEl) nameEl.textContent=`${greeting()}, ${userName()}`;
  cleanWorkTopbar();
  render(readLayout());
  window.addEventListener("docmap:ready",()=>{
    cleanWorkTopbar();
    if(nameEl) nameEl.textContent=`${greeting()}, ${userName()}`;
    render(readLayout());
  },{once:true});
})();
