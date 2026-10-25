/* Opt-in shell only. Existing authentication, permissions, timers and links remain owned by app.js. */
// Load the companion only after the existing application has authenticated.
(() => {
  if(document.body?.dataset.uiNav!=="v2")return;
  let companion=null,currentUser=null,revision=0,pendingStart=null;
  const start=async (event={})=>{
    if(window.LuriaSessionInvalidated)return false;
    // ui-navigation is deferred on many pages. It can start after the auth
    // event has already fired, especially when returning from the PWA cache.
    const user=event.detail?.user||window.docmapUser||window.docmapSession?.user;
    const userId=user?.id;if(!userId)return false;
    const isAdmin=event.detail?.isAdmin??window.docmapIsAdmin;
    if(currentUser===userId&&companion){companion.setAccess(isAdmin);return true;}
    if(currentUser===userId&&pendingStart){return pendingStart;}
    const ticket=++revision;currentUser=userId;companion?.destroy();companion=null;
    pendingStart=new Promise((resolve)=>{
      import('/assets/js/professor-alex-companion.mjs?v=20261025-visible4')
        .then(({mountAlexCompanion})=>{
          if(ticket!==revision||window.LuriaSessionInvalidated){resolve(false);return;}
          if(!companion){
            companion=mountAlexCompanion({userId,isAdmin});
          }
          resolve(!!companion);
        })
        .catch(error=>{
          console.warn('Alex indisponível',error);
          resolve(false);
        })
        .finally(()=>{
          if(ticket===revision)pendingStart=null;
        });
    });
    return pendingStart;
  };
  window.addEventListener('docmap:ready',start);
  window.addEventListener('docmap:access-updated',start);
  window.addEventListener('luria:session-invalidated',()=>{revision++;pendingStart=null;currentUser=null;companion?.destroy();companion=null;});
  // Deferred navigation can execute after a fast cached login already emitted ready.
  const resume=()=>start({detail:{user:window.docmapUser||window.docmapSession?.user,isAdmin:window.docmapIsAdmin}});
  window.addEventListener('pageshow',resume);
  resume();
  // A cached PWA may expose the authenticated user just after this deferred
  // script evaluates. Retry briefly so the robot is never lost to that race.
  let retries=0;
  const retry=async ()=>{if(companion||retries++>=24)return;await resume();if(!companion)setTimeout(retry,250);};
  retry();
  document.addEventListener('click',event=>{if(event.target.closest?.('#logout,#luria-profile-logout')){revision++;pendingStart=null;currentUser=null;companion?.destroy();companion=null;}});
})();
(() => {
  const body = document.body;
  if (body?.dataset.uiNav !== "v2") return;
  const work = body.dataset.uiContext === "work";
  const workHub = work && body.dataset.uiWorkNavigation === "hub";
  const narrow = matchMedia("(max-width: 980px)");
  let drawerOpen = false;
  let drawerTrigger;
  let profileOpen = false;
  let scheduled = false;
  const set = (node, name, value) => {
    if (node && node.getAttribute(name) !== String(value)) node.setAttribute(name, String(value));
  };
  const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const menuIcon = icon('<path d="M4 6h16M4 12h16M4 18h16"/>');
  const closeIcon = icon('<path d="m6 6 12 12M18 6 6 18"/>');
  const collapseIcon = icon('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 3v18m7-12-3 3 3 3"/>');
  const expandIcon = icon('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 3v18m4-12 3 3-3 3"/>');
  const sparkles = icon('<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z"/>');
  const flame = icon('<path d="M12 3c1 4-3 5-3 8 0 1 .5 2 1.5 2.5C11 11 13 10 13 8c4 3 6 5 6 8a7 7 0 0 1-14 0c0-3 2-5 4-7-.5 2 0 3 1 4"/>');
  const focusable = root => [...(root?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])') || [])]
    .filter(node => !node.hidden && node.getClientRects().length && !node.closest('[inert]'));

  // Presentation of the existing destinations, not a second router or access model.
  let mobileSignature = "", sheetTrigger = null, lastMobileState = null;
  const navIcon = name => window.LuriaIcon?.(name) || icon('<rect x="4" y="4" width="16" height="16" rx="3"/>');
  const visibleSource = node => node && !node.closest('[hidden]') && node.getAttribute("aria-hidden") !== "true";
  function mobileEligible() {
    return !window.LuriaSessionInvalidated && narrow.matches
      && ["study", "work"].includes(body.dataset.uiContext) && body.dataset.uiAdmin !== "v2"
      && body.classList.contains("app-ready") && !!window.docmapUser?.id
      && window.parent === window && !document.documentElement.classList.contains("room-native-embed");
  }
  function mobileImmersive() {
    const simulator = document.getElementById("plantao-simulator");
    const studyOverlay = [...document.querySelectorAll("#luria-session-overlay,#luria-search-overlay")].some(panel=>!panel.hidden && getComputedStyle(panel).display!=="none");
    const keyboard = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")
      && window.visualViewport && window.visualViewport.height < innerHeight * .75;
    return !!document.fullscreenElement || studyOverlay || body.classList.contains("flash-review-session-active")
      || (body.dataset.page === "plantao" && simulator && !simulator.hidden) || keyboard;
  }
  function closeMobileTools(restoreFocus = true) {
    const sheet = document.getElementById("ui-mobile-tools");
    if (sheet?.open) sheet.close();
    for (const button of document.querySelectorAll("#ui-mobile-more,#ui-mobile-tools-trigger")) set(button,"aria-expanded",false);
    const target = sheetTrigger?.isConnected ? sheetTrigger : document.getElementById(sheetTrigger?.id);
    if (restoreFocus && target && body.dataset.uiMobileNavigation === "true") target.focus();
  }
  function openMobileTools(trigger) {
    const sheet = document.getElementById("ui-mobile-tools");
    if (!sheet || sheet.open || body.dataset.uiMobileNavigation !== "true") return;
    if ([...document.querySelectorAll('dialog[open], [role="dialog"][aria-modal="true"]:not([hidden])')].some(panel=>panel.id!=="sidebar"&&!panel.closest("[inert]")&&panel.getClientRects().length)) return;
    for (const [panel, toggle] of [["luria-profile-menu","luria-profile-toggle"],["luria-notification-panel","luria-notification-toggle"],["luria-pomodoro-panel","luria-pomodoro-toggle"]]) {
      const popup = document.getElementById(panel);
      if (popup && !popup.hidden) document.getElementById(toggle)?.click();
    }
    const toolsOnly = trigger.id === "ui-mobile-tools-trigger";
    sheet.dataset.toolsOnly = String(toolsOnly);
    sheet.querySelector("h2").textContent = toolsOnly ? "Ferramentas médicas" : "Mais ferramentas";
    sheet.querySelectorAll("section[data-mobile-medical]").forEach(section => { section.hidden = toolsOnly && section.dataset.mobileMedical !== "true"; });
    sheetTrigger = trigger; sheet.showModal(); set(trigger,"aria-expanded",true);
    sheet.querySelector("[data-mobile-close]").focus();
  }
  function enhanceMobileNavigation(sidebar) {
    const railBefore = document.getElementById("ui-mobile-navigation");
    if (!mobileEligible() || !sidebar?.querySelector("nav a[href]")) {
      closeMobileTools(false); railBefore?.remove(); document.getElementById("ui-mobile-tools")?.remove();
      delete body.dataset.uiMobileNavigation; delete body.dataset.uiMobileShell; mobileSignature = ""; return;
    }
    body.dataset.uiMobileShell = "true";
    const immersive = mobileImmersive();
    if (immersive) { closeMobileTools(false); delete body.dataset.uiMobileNavigation; }
    else body.dataset.uiMobileNavigation = "true";
    const sources = [...sidebar.querySelectorAll('nav a[href],.work-pcr-button[href]')].filter(visibleSource);
    const get = href => sources.find(source => source.getAttribute("href") === href);
    const disabled = entry => entry.source?.getAttribute("aria-disabled") === "true"
      || entry.source?.classList.contains("nav-feature-locked")
      || !!entry.feature && window.docmapIsAdmin !== true && window.LuriaEntitlements?.enabled(entry.feature) !== true;
    const entry = (href,label,visual,group,source,feature) => ({href,label,visual,group,source,feature});
    const main = work ? [
      entry("/trabalho/","Início","dashboard","",get("/trabalho/")),
      entry("/trabalho/paciente/","Paciente","users","",get("/trabalho/paciente/")),
      {label:"Ferramentas",visual:"clipboard",tools:true},
      entry("/trabalho/prescricao/","Prescrição","file","",get("/trabalho/prescricao/")),
      entry("/trabalho/pcr/","PCR","stethoscope","",get("/trabalho/pcr/"))
    ] : [
      entry("/dashboard/","Dashboard","dashboard","",get("/dashboard/")),
      entry("/apostilas/","Apostilas","book","",get("/aprender/")),
      entry("/consolidar/","Consolidar","cards","",get("/consolidar/"))
    ];
    for (const item of main) item.disabled = !item.tools && (!item.source || disabled(item));
    const categories = work
      ? ["Ferramentas médicas","Rotina e acompanhamento","Conta e gestão"]
      : ["Estudar e revisar","Praticar e consolidar","Planejamento e desempenho","Comunidade","Conta e gestão"];
    const groupFor = href => work
      ? (/calculadora|scores|diagnostico|fluidos|prontuario|prescricao|paciente/.test(href) ? categories[0] : /admin|editorial|beta/.test(href) ? categories[2] : categories[1])
      : (/aprender/.test(href) ? categories[0] : /consolidar|jogos|desafio|plantao/.test(href) ? categories[1] : /cronograma|estatisticas|aplicar/.test(href) ? categories[2] : /amigos/.test(href) ? categories[3] : categories[4]);
    const extra = sources.filter(source => !main.some(item => item.href === source.getAttribute("href"))).map(source => {
      const href = source.getAttribute("href");
      return entry(href,(source.querySelector(":scope > span:not(.nav-icon):not(.nav-plan-badge)")?.textContent || source.dataset.uiNavLabel || source.textContent).replace(/PLUS|◆/g,"").trim(),"file",groupFor(href),source);
    });
    if (work && get("/trabalho/prescricao/")) extra.push(entry("/trabalho/bulario/","Bulário","book",categories[0],get("/trabalho/prescricao/")));
    if (!work) {
      // Existing learning/consolidation hub links and their existing entitlement keys.
      for (const [href,label,visual,parent,feature,group] of [
        ["/apostilas/","Apostilas","book","/aprender/",null,categories[0]],
        ["/caderno/","Anotações","file","/aprender/",null,categories[0]],
        ["/professor-alex/","Professor Alex","sparkles","/aprender/",null,categories[0]],
        ["/flashcards/","Flashcards","cards","/consolidar/","flashcards",categories[1]],
        ["/plantao/sala-emergencia/","Simulador de Emergência","stethoscope","/plantao/sala-emergencia/","plantao",categories[1]],
        ["/questoes-simulados/","Questões e Simulados","file","/consolidar/","questions",categories[1]],
        ["/caderno-erros/","Caderno de Erros","clipboard","/consolidar/","error_notebook",categories[1]],
        ["/plantao/luriazap/","LuriaZap","users","/aprender/","plantao",categories[1]]
      ]) if (get(parent)) extra.push(entry(href,label,visual,group,get(parent),feature));
    }
    const settings = document.querySelector('#luria-profile-menu a[href="/configuracoes/"]');
    if (settings && !settings.hidden && settings.getAttribute("aria-hidden") !== "true") extra.push(entry(settings.getAttribute("href"),"Configurações","settings",categories.at(-1),settings));
    const environment = sidebar.querySelector(".luria-mode-footer-switch[href]");
    if (visibleSource(environment)) extra.push(entry(environment.getAttribute("href"),work?"Trocar para Estudos":"Trocar para Trabalho","compass",categories.at(-1),environment));
    const unique = [...new Map(extra.filter(item => item.href?.startsWith("/") && !item.href.startsWith("//")).map(item => [item.href,item])).values()];
    unique.forEach(item => { item.disabled = disabled(item); });
    const path = location.pathname;
    const activeSource = sidebar.querySelector('nav a[aria-current="page"],nav a.active')?.getAttribute("href");
    let active = main.findIndex(item => item.href && (item.href === path || item.href !== (work?"/trabalho/":"/dashboard/") && path.startsWith(item.href)));
    if (active < 0 && !work && ["aprender","caderno","apostilas","professor_alex"].includes(body.dataset.page)) active = 1;
    if (active < 0 && !work && ["consolidar","flashcards","questoes","erros"].includes(body.dataset.page)) active = 2;
    if (active < 0 && work) active = activeSource === "/trabalho/prescricao/" ? 3 : /paciente/.test(path) ? 1 : /calculadora|scores|diagnostico|fluidos|prontuario/.test(path) ? 2 : -1;
    const signature = JSON.stringify([main.map(item=>[item.href,item.label,item.disabled]),unique.map(item=>[item.href,item.label,item.group,item.disabled]),active]);
    if (signature === mobileSignature && railBefore) return;
    mobileSignature = signature;
    const makeLink = (item, markCurrent = false) => {
      const link = document.createElement("a"); link.href = item.href; link.dataset.mobileLink = "true";
      const visual = document.createElement("span"); visual.className = "ui-mobile-icon";visual.setAttribute("aria-hidden","true");
      const existingIcon = item.source?.querySelector("svg,.nav-icon");
      if (existingIcon && item.href === item.source.getAttribute("href")) visual.append(existingIcon.cloneNode(true));
      else visual.innerHTML = navIcon(item.visual);
      const label = document.createElement("span"); label.textContent = item.label;
      link.append(visual,label); set(link,"aria-disabled",item.disabled === true);
      if(markCurrent && (path===item.href || item.href!=="/trabalho/" && item.href!=="/dashboard/" && path.startsWith(item.href)))set(link,"aria-current","page");
      if (item.disabled) link.title = "Indisponível para sua conta";
      return link;
    };
    let rail = railBefore;
    if (!rail) {rail = document.createElement("nav");rail.id="ui-mobile-navigation";rail.className="ui-mobile-navigation";rail.setAttribute("aria-label","Navegação principal");body.append(rail);}
    rail.replaceChildren();
    main.forEach((item,index) => {
      let control;
      if (item.tools) {control=document.createElement("button");control.type="button";control.id="ui-mobile-tools-trigger";control.innerHTML=navIcon(item.visual)+'<span>Ferramentas</span>';set(control,"aria-controls","ui-mobile-tools");set(control,"aria-haspopup","dialog");set(control,"aria-expanded",false);}
      else control=makeLink(item);
      if (index===active) set(control,"aria-current","page");
      if (work && index===4) control.dataset.mobilePcr="true";
      rail.append(control);
    });
    const more=document.createElement("button");more.id="ui-mobile-more";more.type="button";
    more.innerHTML=navIcon("more")+'<span>Mais</span>';set(more,"aria-controls","ui-mobile-tools");set(more,"aria-haspopup","dialog");set(more,"aria-expanded",false);
    if (active<0) set(more,"aria-current","page");rail.append(more);
    let sheet=document.getElementById("ui-mobile-tools");
    if (!sheet) {
      sheet=document.createElement("dialog");sheet.id="ui-mobile-tools";sheet.className="ui-mobile-tools";sheet.setAttribute("aria-labelledby","ui-mobile-tools-title");
      sheet.innerHTML='<header><h2 id="ui-mobile-tools-title">Mais ferramentas</h2><button type="button" data-mobile-close aria-label="Fechar mais ferramentas">'+closeIcon+'</button></header><div class="ui-mobile-tools-content"></div>';
      sheet.addEventListener("cancel",event=>{event.preventDefault();closeMobileTools();});
      sheet.addEventListener("close",()=>closeMobileTools());
      sheet.addEventListener("click",event=>{if(event.target!==sheet)return;const box=sheet.getBoundingClientRect();if(event.clientY<box.top||event.clientY>box.bottom||event.clientX<box.left||event.clientX>box.right)closeMobileTools();});
      body.append(sheet);
    }
    const focusedHref=sheet.contains(document.activeElement)?document.activeElement.getAttribute("href"):null;
    const content=sheet.querySelector(".ui-mobile-tools-content");content.replaceChildren();
    for (const group of categories) {
      const items=unique.filter(item=>item.group===group);if(!items.length)continue;
      const section=document.createElement("section");section.dataset.mobileMedical=String(work&&group===categories[0]);
      const title=document.createElement("h3");title.textContent=group;section.append(title);
      const links=document.createElement("div");links.className="ui-mobile-tools-grid";items.forEach(item=>links.append(makeLink(item,true)));section.append(links);content.append(section);
    }
    if(sheet.open){sheet.querySelectorAll("section").forEach(section=>{section.hidden=sheet.dataset.toolsOnly==="true"&&section.dataset.mobileMedical!=="true";});set(document.getElementById(sheetTrigger?.id),"aria-expanded",true);const restored=[...sheet.querySelectorAll("a")].find(link=>link.getAttribute("href")===focusedHref);(restored||sheet.querySelector("[data-mobile-close]")).focus();}
  }

  function themes() {
    const node = document.createElement("div");
    node.className = "ui-profile-themes";
    node.innerHTML = '<fieldset><legend>Aparência</legend><div class="ui-theme-segment"><button type="button" data-ui-theme-control="appearance" value="light">Claro</button><button type="button" data-ui-theme-control="appearance" value="dark">Escuro</button></div></fieldset><fieldset><legend>Cor do tema</legend><div class="ui-theme-segment"><button type="button" data-ui-theme-control="identity" value="blue">Azul</button><button type="button" data-ui-theme-control="identity" value="pink">Rosa</button></div></fieldset>';
    return node;
  }
  function enhanceProfile(sidebar) {
    const menu = document.getElementById("luria-profile-menu");
    const toggle = document.getElementById("luria-profile-toggle");
    if (!menu) return;
    set(toggle, "aria-controls", menu.id);
    if (!menu.querySelector(".ui-profile-name")) {
      const name = document.createElement("strong"); name.className = "ui-profile-name";
      const environment = document.createElement("div"); environment.className = "ui-profile-environment";
      const title = document.createElement("span"); title.textContent = "Ambiente";
      const options = document.createElement("div"); options.className = "ui-environment-options";
      environment.append(title, options);
      menu.prepend(name, environment, themes());
      if (!document.getElementById("ui-theme-status")) {
        const status = document.createElement("p"); status.id = "ui-theme-status";
        status.className = "ui-sr-only"; status.setAttribute("role", "status"); menu.append(status);
      }
    }
    const accountItems = [
      ['a[href="/configuracoes/#perfil"]', '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>'],
      ['[data-restart-onboarding]', '<path d="M4 10a8 8 0 1 1 1 9M4 4v6h6"/>'],
      ['a[href="/configuracoes/"]', '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>'],
      ['#luria-profile-logout', '<path d="M9 4H4v16h5M13 8l4 4-4 4M8 12h13"/>']
    ];
    for (const [selector, paths] of accountItems) {
      const item = menu.querySelector(selector);
      if (!item || item.classList.contains("ui-profile-account-item")) continue;
      item.classList.add("ui-profile-account-item");
      const visual = document.createElement("span");
      visual.className = "ui-profile-item-icon"; visual.innerHTML = icon(paths);
      item.prepend(visual);
    }
    if (!menu.querySelector(".ui-profile-account-label")) {
      const first = menu.querySelector(".ui-profile-account-item");
      if (first) {const title = document.createElement("span"); title.className = "ui-profile-account-label"; title.textContent = "Conta"; first.before(title);}
    }
    const name = menu.querySelector(".ui-profile-name");
    const displayName = window.docmapProfile?.display_name || "Sua conta";
    if (name.textContent !== displayName) name.textContent = displayName;
    // The existing conditional link is the authority for access to the other environment.
    const source = sidebar?.querySelector(".luria-mode-footer-switch");
    const destination = source?.getAttribute("href") || "";
    const options = menu.querySelector(".ui-environment-options");
    const signature = `${work}:${destination}`;
    if (options.dataset.source !== signature) {
      options.dataset.source = signature;
      const current = document.createElement("a");
      current.href = work ? "/trabalho/" : "/dashboard/";
      current.textContent = work ? "Trabalho" : "Estudos";
      current.setAttribute("aria-current", "page");
      const other = source ? source.cloneNode(false) : document.createElement("button");
      other.className = ""; other.removeAttribute("id");
      other.textContent = work ? "Estudos" : "Trabalho";
      other.setAttribute("aria-label", `Trocar para o ambiente ${other.textContent}`);
      if (!source) { other.type = "button"; other.disabled = true; other.title = "Ambiente indisponível para esta conta"; }
      options.replaceChildren(...(work ? [other, current] : [current, other]));
    }
    const legacyThemes = document.querySelector('.theme-options');
    if (!work && legacyThemes && !legacyThemes.previousElementSibling?.classList.contains("ui-profile-themes")) legacyThemes.before(themes());
    window.LuriaUITheme?.refresh();
  }
  function enhanceStreak(sidebar, center) {
    if (work || body.dataset.uiAdmin === "v2" || !center) return;
    document.getElementById("ui-topbar-streak")?.remove();
    return;
    let indicator = document.getElementById("ui-topbar-streak");
    if (!indicator) {
      indicator = document.createElement("span"); indicator.id = "ui-topbar-streak";
      indicator.className = "ui-topbar-streak";
      indicator.innerHTML = flame + '<span class="ui-topbar-streak-value" data-streak-value>—</span><span class="ui-topbar-streak-unit">dias</span>';
      indicator.title = "Sua sequência de dias no Luria"; center.prepend(indicator);
    }
    const source = sidebar?.querySelector("[data-sidebar-streak-card] [data-streak-value]");
    const count = window.luriaCurrentStreak;
    const current = indicator.querySelector(".ui-topbar-streak-value");
    const realValue = typeof count === "number" && Number.isFinite(count) ? String(count) : source?.textContent.trim();
    if (realValue && current.textContent !== realValue) current.textContent = realValue;
    const output = indicator.querySelector("[data-streak-value], .ui-topbar-streak-value");
    const value = output?.textContent.trim() || "—";
    const unit = value === "1" ? "dia" : "dias";
    const label = indicator.querySelector(".ui-topbar-streak-unit");
    if (label.textContent !== unit) label.textContent = unit;
    set(indicator, "aria-label", value === "—" ? "Ofensiva: aguardando dados" : `Ofensiva: ${value} ${unit}`);
  }
  // The mobile backdrop intercepts taps outside the drawer. Do not mark main
  // or topbar inert: WebKit can preserve that state when an installed PWA resumes,
  // leaving the entire interface unclickable after the drawer closes.
  function restorePageInteraction() {
    for (const node of [document.querySelector("main.main"), document.querySelector(".topbar")]) {
      if (!node) continue;
      if (node.inert) node.inert = false;
      delete node.dataset.uiDrawerInert;
    }
  }
  // Move the existing nodes; IDs, links and their event handlers remain intact.
  function placeStudyNavigation(sidebar, bar) {
    if ((body.dataset.uiContext !== 'study' && body.dataset.uiWork !== 'v2' && body.dataset.uiAdmin !== 'v2') || !sidebar || !bar) return;
    const top = sidebar.querySelector('.sidebar-top');
    const brand = sidebar.querySelector('.brand');
    const previousBrand = bar.querySelector('.ui-topbar-brand');
    if (brand) {
      previousBrand?.remove();
      brand.classList.add('ui-topbar-brand');
      bar.prepend(brand);
    }
    const trigger = document.getElementById('menu-open');
    if (workHub) return;
    const host = narrow.matches && !body.classList.contains('sidebar-open') ? bar : top;
    if (host === top && top && trigger) {
      let label = top.querySelector(".ui-sidebar-label");
      if (!label) { label = document.createElement("span"); label.className = "ui-sidebar-label"; label.textContent = "Menu"; }
      label.hidden = !narrow.matches && body.dataset.uiSidebar === "collapsed";
      if (top.firstElementChild !== label) top.prepend(label);
      if (trigger.parentElement !== top || top.lastElementChild !== trigger) top.append(trigger);
    } else if (host && trigger && (trigger.parentElement !== host || trigger !== host.firstElementChild)) host.prepend(trigger);
  }
  function syncDrawer() {
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector("main.main");
    const bar = document.querySelector(".topbar");
    const trigger = document.getElementById("menu-open");
    const open = narrow.matches && body.classList.contains("sidebar-open");

    placeStudyNavigation(sidebar, bar);

    if (body.dataset.uiMobileNavigation === "true") {
      if(body.classList.contains("sidebar-open"))body.classList.remove("sidebar-open");
      if(sidebar){sidebar.inert=true;set(sidebar,"aria-hidden",true);for(const attr of ["role","aria-modal"])sidebar.removeAttribute(attr);}
      if(trigger && !trigger.hidden)trigger.hidden=true;
      drawerOpen=false;restorePageInteraction();return;
    }
    if(trigger && !workHub)trigger.hidden=false;
    if(sidebar && !workHub)sidebar.removeAttribute("aria-hidden");
    if (workHub) {
      // Keep the permission-owned links available to the profile adapter only.
      // The Work hub replaces the drawer, including on installed mobile apps.
      if (body.classList.contains("sidebar-open")) body.classList.remove("sidebar-open");
      if (sidebar) {
        sidebar.inert = true;
        set(sidebar, "aria-hidden", "true");
        for (const attr of ["role", "aria-modal"]) sidebar.removeAttribute(attr);
      }
      if (trigger && !trigger.hidden) trigger.hidden = true;
      drawerOpen = false;
      restorePageInteraction();
      return;
    }

    if (sidebar) {
      if (sidebar.inert !== (narrow.matches && !open)) sidebar.inert = narrow.matches && !open;
      if (narrow.matches) { set(sidebar, "role", "dialog"); set(sidebar, "aria-modal", "true"); set(sidebar, "aria-label", "Navegação"); }
      else { for (const attr of ["role", "aria-modal", "aria-label"]) if (sidebar.hasAttribute(attr)) sidebar.removeAttribute(attr); }
    }
    restorePageInteraction();
    set(trigger, "aria-expanded", narrow.matches ? open : body.dataset.uiSidebar !== "collapsed");
    set(trigger, "aria-controls", "sidebar");
    const toggleState = narrow.matches ? (open ? "close" : "menu") : (body.dataset.uiSidebar === "collapsed" ? "expand" : "collapse");
    if (trigger && trigger.dataset.uiToggleState !== toggleState) {
      trigger.innerHTML = {menu:menuIcon,close:closeIcon,expand:expandIcon,collapse:collapseIcon}[toggleState];
      trigger.dataset.uiToggleState = toggleState;
    }
    set(trigger, "aria-label", narrow.matches ? (open ? "Fechar navegação" : "Abrir navegação") : (body.dataset.uiSidebar === "collapsed" ? "Expandir navegação" : "Recolher navegação"));
    set(trigger, "title", trigger?.getAttribute("aria-label") || "Menu");
    if (open && !drawerOpen) focusable(sidebar)[0]?.focus();
    if (!open && drawerOpen) (drawerTrigger?.isConnected ? drawerTrigger : trigger)?.focus();
    drawerOpen = open;
  }
  function enhanceWorkHub(sidebar, bar) {
    if (!workHub || !bar) return;
    const brand = bar.querySelector(".ui-topbar-brand");
    set(brand, "href", "/trabalho/");
    set(brand, "aria-label", "LURIA — Central do Trabalho");
    let links = bar.querySelector(".work-hub-navigation");
    if (!links) {
      links = document.createElement("nav");
      links.className = "work-hub-navigation";
      links.setAttribute("aria-label", "Navegação do Trabalho");
      const back = document.createElement("a");
      back.className = "work-hub-return"; back.href = "/trabalho/";
      back.innerHTML = icon('<path d="m10 5-7 7 7 7M3 12h18"/>') + '<span>Central do Trabalho</span>';
      back.hidden = body.dataset.page === "trabalho_dashboard";
      links.append(back);
      bar.append(links);
    }
    const notifications = bar.querySelector(".luria-notifications");
    if (notifications && links.nextElementSibling !== notifications) bar.insertBefore(links, notifications);
    // Reuse the real, permission-owned PCR destination, rather than inventing a route.
    const pcrSource = sidebar?.querySelector(".work-pcr-button[href]");
    if (pcrSource && !links.querySelector(".work-hub-pcr")) {
      const pcr = document.createElement("a");
      pcr.className = "work-hub-pcr"; pcr.href = pcrSource.getAttribute("href");
      pcr.setAttribute("aria-label", "Abrir Parada Cardiorrespiratória");
      pcr.innerHTML = icon('<path d="M12 5v14M5 12h14"/>') + '<span>Abrir PCR</span>';
      links.append(pcr);
    }
    const menu = document.getElementById("luria-profile-menu");
    if (!menu) return;
    for (const id of ["admin-nav-link", "editorial-nav-link", "beta-testers-nav-link"]) {
      const source = sidebar?.querySelector(`#${id}`);
      let item = menu.querySelector(`[data-work-account="${id}"]`);
      if (!source || source.hidden) { item?.remove(); continue; }
      if (!item) {
        item = document.createElement("a");
        item.className = "ui-profile-account-item";
        item.dataset.workAccount = id;
        const visual = document.createElement("span");
        visual.className = "ui-profile-item-icon";
        visual.innerHTML = icon(id === "admin-nav-link" ? '<path d="m12 3 9 9-9 9-9-9Z"/>' : id === "editorial-nav-link" ? '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>' : '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M21 21v-2a6 6 0 0 0-4-5"/>');
        item.append(visual, document.createTextNode(source.textContent.replace(/◆/g, "").trim()));
        const logout = menu.querySelector("#luria-profile-logout");
        if (logout) logout.before(item);
        else menu.append(item);
      }
      set(item, "href", source.getAttribute("href"));
    }
  }
  function enhance() {
    if (!window.document || !body.isConnected) return;
    const sidebar = document.getElementById("sidebar");
    const bar = document.querySelector(".topbar");
    if (bar) {
      const shell = document.querySelector(".app-shell");
      const heading = bar.querySelector(".page-heading");
      if ((!work || body.dataset.uiWork === "v2") && !["dashboard", "trabalho_dashboard"].includes(body.dataset.page) && body.dataset.uiHeading !== "provided" && heading && heading.textContent.trim() && !document.querySelector("main .luria-page-spotlight, main .book-hero, main .settings-page-head")) {
        heading.classList.add("ui-page-heading"); document.querySelector("main.main > .page")?.prepend(heading);
      }
      if (body.dataset.uiAdmin === "v2") {
        const range = bar.querySelector(".admin-range");
        const title = document.querySelector(".ui-page-heading");
        if (range && title) title.append(range);
      }
      if (shell && bar.parentElement !== shell) shell.prepend(bar);
      let trigger = document.getElementById("menu-open");
      if (!trigger) { trigger = document.createElement("button"); trigger.id = "menu-open"; trigger.type = "button"; trigger.className = "menu-open"; bar.prepend(trigger); }
      if (!trigger.dataset.uiControl) { trigger.innerHTML = menuIcon; trigger.dataset.uiControl = "true"; }
      if (!bar.querySelector(".ui-context-label")) {
        const context = document.createElement("span"); context.className = "ui-context-label";
        context.textContent = body.dataset.uiAdmin === "v2" ? "Admin" : work ? "Trabalho" : "Estudos";
        if (work) trigger.after(context);
        else bar.insertBefore(context, bar.querySelector('.luria-notifications'));
      }
    }
    sidebar?.querySelectorAll("nav a[href]").forEach(link => {
      if (link.dataset.uiNavLabel) return;
      const label = link.textContent.trim();
      link.dataset.uiNavLabel = label; if (!link.title) link.title = label;
      if (!link.hasAttribute("aria-label")) set(link, "aria-label", label);
      if (link.classList.contains("active")) set(link, "aria-current", "page");
    });
    const alex = document.getElementById("luria-alex-topbar");
    if (alex && !alex.dataset.uiIcon) {
      const visual = document.createElement("span"); visual.className = "ui-alex-icon"; visual.innerHTML = sparkles;
      alex.prepend(visual); alex.dataset.uiIcon = "true";
    }
    if (body.dataset.uiWork === "v2") {
      const title = document.querySelector("main .luria-page-spotlight-copy strong[data-page-title]");
      set(title, "role", "heading"); set(title, "aria-level", "1");
    }
    enhanceProfile(sidebar);
    enhanceStreak(sidebar, document.getElementById("luria-notifications"));
    enhanceWorkHub(sidebar, bar);
    enhanceMobileNavigation(sidebar);
    syncDrawer();
    const mobileState=body.dataset.uiMobileNavigation === "true";
    if(mobileState!==lastMobileState){lastMobileState=mobileState;window.dispatchEvent(new Event("luria:mobile-navigation-change"));}
    const menu = document.getElementById("luria-profile-menu");
    const open = !!menu && !menu.hidden;
    if (open && !profileOpen) focusable(menu)[0]?.focus();
    profileOpen = open;
    if (body.classList.contains("app-ready") && bar && (workHub || sidebar?.querySelector("nav a")) && body.dataset.uiNavigationReady !== "true") {
      body.dataset.uiNavigationReady = "true";
      window.dispatchEvent(new Event("luria:ui-navigation-ready"));
    }
  }
  function schedule() {
    if (scheduled || !window.document || !body.isConnected) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhance(); });
  }
  document.addEventListener("click", event => {
    const mobileLink=event.target.closest?.('[data-mobile-link]');
    if(mobileLink){
      if(mobileLink.getAttribute("aria-disabled")==="true"){event.preventDefault();event.stopImmediatePropagation();closeMobileTools(false);window.LuriaDialog?.alert("Este recurso está indisponível para sua conta.");return;}
      closeMobileTools(false);return;
    }
    if(event.target.closest?.('[data-mobile-close]')){event.preventDefault();closeMobileTools();return;}
    const toolsTrigger=event.target.closest?.('#ui-mobile-more,#ui-mobile-tools-trigger');
    if(toolsTrigger){event.preventDefault();event.stopImmediatePropagation();openMobileTools(toolsTrigger);return;}
    const trigger = event.target.closest("#menu-open, #ui-mobile-more, #sidebar-close, #sidebar-backdrop");
    if (!trigger) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (workHub) { syncDrawer(); return; }
    if (["menu-open", "ui-mobile-more"].includes(trigger.id) && !drawerOpen) drawerTrigger = trigger;
    if (trigger.id === "menu-open" && !narrow.matches) {
      body.dataset.uiSidebar = body.dataset.uiSidebar === "collapsed" ? "expanded" : "collapsed";
      body.classList.remove("sidebar-open");
    } else body.classList.toggle("sidebar-open", ["menu-open", "ui-mobile-more"].includes(trigger.id) && !body.classList.contains("sidebar-open"));
    syncDrawer();
  }, true);
  document.addEventListener("keydown", event => {
    if ([...document.querySelectorAll("#luria-session-overlay, #luria-search-overlay")].some(panel => !panel.hidden && panel.getClientRects().length)) return;
    if (event.key === "Escape") {
      if (drawerOpen) { event.preventDefault(); body.classList.remove("sidebar-open"); syncDrawer(); return; }
      for (const [panel, trigger] of [["luria-profile-menu", "luria-profile-toggle"], ["luria-pomodoro-panel", "luria-pomodoro-toggle"], ["luria-notification-panel", "luria-notification-toggle"]]) {
        const popup = document.getElementById(panel);
        if (popup && !popup.hidden) { event.preventDefault(); document.getElementById(trigger)?.click(); document.getElementById(trigger)?.focus(); break; }
      }
    }
    if (event.key !== "Tab" || !drawerOpen) return;
    const controls = focusable(document.getElementById("sidebar"));
    if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
  });
  narrow.addEventListener("change", () => { body.classList.remove("sidebar-open"); enhance(); });
  // iOS installed apps can restore a previous page from the back-forward cache
  // with the drawer's inert state still attached. Always return to a usable
  // closed menu when the page resumes.
  window.addEventListener("pageshow", () => {
    closeMobileTools(false);
    body.classList.remove("sidebar-open");
    drawerOpen = false;
    restorePageInteraction();
    schedule();
  });
  document.addEventListener("fullscreenchange",schedule);
  document.addEventListener("focusin",schedule);document.addEventListener("focusout",schedule);
  window.visualViewport?.addEventListener("resize",schedule);
  window.addEventListener("popstate",schedule);window.addEventListener("hashchange",schedule);
  window.addEventListener("docmap:access-updated",schedule);
  window.addEventListener("luria:owner-changed",schedule);
  window.addEventListener("docmap:ready", enhance);
  window.addEventListener("luria:dashboard-data", schedule);
  document.addEventListener("DOMContentLoaded", enhance, {once:true});
  // Updating question or notebook content should not rebuild the navigation.
  const shellRegion = "#sidebar,.topbar,#luria-profile-menu,#luria-notifications,#plantao-simulator,#luria-session-overlay,#luria-search-overlay";
  new MutationObserver(records => {
    if (records.some(record => record.target === body || record.target.closest?.(shellRegion)
      || [...record.addedNodes].some(node => node.nodeType === 1 && (node.matches(shellRegion) || node.querySelector(shellRegion))))) schedule();
  }).observe(body, {subtree:true, childList:true, attributes:true, attributeFilter:["class", "hidden", "aria-disabled"]});
  if (document.readyState !== "loading") enhance();
})();
