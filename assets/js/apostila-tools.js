(() => {
  if (window.LuriaApostilaTools) return;
  window.LuriaApostilaTools = true;
  const main=document.querySelector('.book-main');
  const outlineHead=document.querySelector('.book-outline-head');
  if(!main||!outlineHead)return;

  const style=document.createElement('style');
  style.id='apostila-reading-layout-v2';
  style.textContent=`
    body.apostila-reading-layout-v2 .book-page{display:grid!important;grid-template-columns:minmax(0,1fr) 126px!important;gap:18px!important;align-items:start!important}
    body.apostila-reading-layout-v2 .book-main{grid-column:1!important;grid-row:1!important;min-width:0!important}
    body.apostila-reading-layout-v2 .book-outline{grid-column:2!important;grid-row:1!important;position:sticky!important;top:14px!important;display:block!important;height:auto!important;max-height:none!important;min-height:0!important;padding:8px!important;overflow:visible!important}
    body.apostila-reading-layout-v2 .book-outline>*:not(.book-tools){display:none!important}
    body.apostila-reading-layout-v2 .book-tools{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;margin:0!important;padding:0!important;border:0!important}
    body.apostila-reading-layout-v2 .book-tool-btn{min-height:40px!important;padding:7px 6px!important;border:1px solid #184888!important;border-radius:10px!important;background:#184888!important;color:#fff!important;font:inherit!important;font-size:10px!important;font-weight:700!important;cursor:pointer!important;box-shadow:0 4px 12px rgba(24,72,136,.16)!important}
    body.apostila-reading-layout-v2 .book-tool-btn:hover{background:#123b72!important;border-color:#123b72!important}
    body.apostila-reading-layout-v2 .book-tool-btn.is-active{background:#0d2d59!important;border-color:#0d2d59!important;box-shadow:0 0 0 3px rgba(24,72,136,.18),0 4px 12px rgba(24,72,136,.16)!important}
    body.apostila-reading-layout-v2 .book-highlight-palette,body.apostila-reading-layout-v2 .book-postit-palette{position:static!important;display:flex!important;grid-column:auto!important;align-items:center!important;justify-content:center!important;gap:6px!important;padding:8px 2px 0!important;border:0!important;background:transparent!important;box-shadow:none!important}
    body.apostila-reading-layout-v2 .book-highlight-palette[hidden],body.apostila-reading-layout-v2 .book-postit-palette[hidden]{display:none!important}
    body.apostila-reading-layout-v2 .book-tool-mini{min-width:28px!important;height:28px!important;padding:0 6px!important;border:1px solid var(--border)!important;border-radius:8px!important;background:var(--surface)!important;color:var(--accent)!important;font:inherit!important;font-size:11px!important;cursor:pointer!important}
    body.apostila-reading-layout-v2 .book-color-dot{width:22px!important;height:22px!important;padding:0!important;border:2px solid var(--surface)!important;border-radius:50%!important;box-shadow:0 0 0 1px rgba(20,36,58,.28)!important;cursor:pointer!important}
    body.apostila-reading-layout-v2 .book-color-dot.is-active{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--accent)!important}
    body.apostila-reading-layout-v2 .book-highlight{background:var(--book-highlight-color,#ffd166)!important;color:#14243a!important;text-shadow:none!important;border-radius:3px!important;padding:0 .05em!important;box-decoration-break:clone!important;-webkit-box-decoration-break:clone!important}
    body.apostila-reading-layout-v2 .book-toc-block{order:2!important;margin:0!important;padding:22px 26px!important;border:1px solid var(--border)!important;border-radius:18px!important;background:var(--surface)!important;box-shadow:0 8px 22px rgba(15,35,66,.04)!important;scroll-margin-top:14px!important}
    body.apostila-reading-layout-v2 .book-hero>.book-toc-block{position:relative!important;z-index:1!important;box-sizing:border-box!important;width:100%!important;margin:20px 0 0!important;padding:18px 0 0!important;border:0!important;border-top:1px solid rgba(255,255,255,.32)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
    body.apostila-reading-layout-v2 .book-hero .book-toc-kicker{color:rgba(255,255,255,.78)!important}
    body.apostila-reading-layout-v2 .book-hero .book-toc-block h2{color:#fff!important}
    body.apostila-reading-layout-v2 .book-hero .book-toc-description{color:rgba(255,255,255,.86)!important}
    body.apostila-reading-layout-v2 .book-hero .book-toc-link{border:1px solid rgba(255,255,255,.3)!important;border-left:3px solid rgba(255,255,255,.8)!important;background:rgba(255,255,255,.13)!important;color:#fff!important}
    body.apostila-reading-layout-v2 .book-hero .book-toc-link:hover,body.apostila-reading-layout-v2 .book-hero .book-toc-link:focus-visible,body.apostila-reading-layout-v2 .book-hero .book-toc-link.is-active{background:#fff!important;border-color:#fff!important;color:#184888!important}
    body.apostila-reading-layout-v2 .book-toc-kicker{display:block!important;margin-bottom:4px!important;color:var(--accent)!important;font-size:9px!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important}
    body.apostila-reading-layout-v2 .book-toc-block h2{margin:0 0 6px!important;font-size:22px!important;line-height:1.15!important}
    body.apostila-reading-layout-v2 .book-toc-description{margin:0 0 16px!important;color:var(--muted)!important;font-size:11px!important;line-height:1.5!important}
    body.apostila-reading-layout-v2 .book-toc-nav{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}
    body.apostila-reading-layout-v2 .book-toc-link{display:flex!important;align-items:center!important;min-height:34px!important;padding:7px 9px!important;border:1px solid var(--border)!important;border-left:3px solid var(--accent)!important;border-radius:9px!important;background:var(--surface-2)!important;color:var(--text)!important;font-size:10.5px!important;line-height:1.25!important;text-decoration:none!important}
    body.apostila-reading-layout-v2 .book-toc-link:hover,body.apostila-reading-layout-v2 .book-toc-link.is-active{background:var(--accent-soft)!important;color:var(--accent)!important;border-color:color-mix(in srgb,var(--accent) 35%,var(--border))!important}
    /* Mesmo alinhamento em apostilas HTML antigas sem a folha do renderer. */
    body.apostila-reading-layout-v2 .book-main :is(.book-section,.mindmap-section){text-align:justify!important}
    body.apostila-reading-layout-v2 .book-main :is(.book-section,.mindmap-section) :is(p,li,blockquote,figcaption,dd),body.apostila-reading-layout-v2 .book-main .book-hero > p,body.apostila-reading-layout-v2 .book-main .book-safety-note > span{text-align:justify!important;text-align-last:auto!important;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word}
    body.apostila-reading-layout-v2 .book-postit{z-index:40!important}
    @media(max-width:900px){
      body.apostila-reading-layout-v2 .book-page{display:flex!important;flex-direction:column!important;grid-template-columns:none!important;gap:12px!important;width:100%!important;max-width:100%!important;overflow:visible!important}
      body.apostila-reading-layout-v2 .book-main{order:1!important;width:100%!important;max-width:100%!important;min-width:0!important}
      body.apostila-reading-layout-v2 .book-outline{order:2!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;position:relative!important;top:auto!important;display:block!important;padding:8px!important;overflow:visible!important}
      body.apostila-reading-layout-v2 .book-tools{grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important}
      body.apostila-reading-layout-v2 .book-tool-btn{width:100%!important;min-width:0!important;box-sizing:border-box!important}
      body.apostila-reading-layout-v2 .book-highlight-palette,body.apostila-reading-layout-v2 .book-postit-palette{grid-column:1/-1!important;justify-content:flex-start!important;flex-wrap:wrap!important;width:100%!important;box-sizing:border-box!important}
      body.apostila-reading-layout-v2 .book-toc-block{padding:18px 16px!important}
      body.apostila-reading-layout-v2 .book-toc-nav{grid-template-columns:1fr!important}
    }
  `;
  document.body.classList.add('apostila-reading-layout-v2');

  const originalLinks=[...document.querySelectorAll('.book-outline-nav .book-outline-link')];
  const uniqueLinks=[];
  const seenLinks=new Set();
  // As apostilas antigas podem usar links absolutos para a própria página.
  const normalizedPath=path=>path.replace(/\/index\.html$/i,'/').replace(/\/?$/,'/');
  originalLinks.forEach(sourceLink=>{
    const rawHref=sourceLink.getAttribute('href')||'';
    const label=sourceLink.textContent.trim();
    if(!label)return;
    let href;
    try{
      const url=new URL(rawHref,location.href);
      if(url.origin!==location.origin||normalizedPath(url.pathname)!==normalizedPath(location.pathname))return;
      const targetId=decodeURIComponent(url.hash.slice(1));
      if(!targetId||!document.getElementById(targetId))return;
      href='#'+targetId;
    }catch{return;}
    if(seenLinks.has(href))return;
    seenLinks.add(href);
    uniqueLinks.push({href,label});
  });

  const hero=main.querySelector('.book-hero');
  const toc=document.createElement('section');
  toc.className='book-toc-block';
  toc.id='sumario-apostila';
  toc.setAttribute('aria-labelledby','sumario-apostila-title');
  const kicker=document.createElement('small');
  kicker.className='book-toc-kicker';
  kicker.textContent='Navegação rápida';
  const tocTitle=document.createElement('h2');
  tocTitle.id='sumario-apostila-title';
  tocTitle.textContent='Sumário';
  const description=document.createElement('p');
  description.className='book-toc-description';
  description.textContent='Escolha um capítulo para ir diretamente ao conteúdo.';
  const tocNav=document.createElement('nav');
  tocNav.className='book-toc-nav';
  tocNav.setAttribute('aria-label','Sumário da apostila');
  uniqueLinks.forEach(({href,label})=>{
    const link=document.createElement('a');
    link.className='book-toc-link';
    link.href=href;
    link.textContent=label;
    tocNav.appendChild(link);
  });
  toc.append(kicker,tocTitle,description,tocNav);
  // O sumário integra o primeiro bloco (capa) e não ocupa mais um card independente.
  if(hero){
    const introEnd=hero.querySelector('.book-meta-row')||hero.querySelector('p')||hero.querySelector('h1');
    if(introEnd)introEnd.insertAdjacentElement('afterend',toc);else hero.appendChild(toc);
  }else{
    const firstBlock=main.querySelector(':scope > .book-section, :scope > .mindmap-section')||main.firstElementChild;
    if(firstBlock)firstBlock.prepend(toc);else main.prepend(toc);
  }

  const outline=document.querySelector('.book-outline');
  outline?.replaceChildren();
  outline?.setAttribute('aria-label','Ferramentas de anotação');
  outline?.classList.add('book-annotation-tools');

  const tools=document.createElement('div');
  tools.className='book-tools';
  tools.innerHTML='<button type="button" class="book-tool-btn" data-apostila-highlight>Grifar</button><button type="button" class="book-tool-btn" data-apostila-postit>Post-it</button><div class="book-highlight-palette" data-highlight-palette hidden><button type="button" class="book-tool-mini" data-highlight-undo title="Desfazer último grifo" aria-label="Desfazer último grifo">↶</button><button type="button" class="book-color-dot is-active" data-highlight-color="#ffd166" style="background:#ffd166" aria-label="Amarelo"></button><button type="button" class="book-color-dot" data-highlight-color="#8fd694" style="background:#8fd694" aria-label="Verde"></button><button type="button" class="book-color-dot" data-highlight-color="#82c9ff" style="background:#82c9ff" aria-label="Azul"></button><button type="button" class="book-color-dot" data-highlight-color="#ff9fbc" style="background:#ff9fbc" aria-label="Rosa"></button><button type="button" class="book-color-dot" data-highlight-color="#c2a0ff" style="background:#c2a0ff" aria-label="Roxo"></button></div><div class="book-postit-palette" data-postit-palette hidden><button type="button" class="book-tool-mini is-active" data-postit-shape="square">▭ Quadrado</button></div>';
  outline?.appendChild(tools);
  const fitOutline=()=>{};
  tocNav.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(!link)return;
    const target=document.getElementById((link.getAttribute('href')||'').slice(1));
    if(!target)return;
    event.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'',link.getAttribute('href'));
  });
  const tocLinks=[...tocNav.querySelectorAll('.book-toc-link')];
  const setActiveLink=target=>{
    const id=target?.id||'';
    [...originalLinks,...tocLinks].forEach(link=>link.classList.toggle('is-active',link.getAttribute('href')==='#'+id));
  };
  if('IntersectionObserver' in window){
    const observedSections=[...originalLinks].map(link=>document.getElementById((link.getAttribute('href')||'').slice(1))).filter(Boolean);
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(visible)setActiveLink(visible.target);
    },{rootMargin:'-18% 0px -68% 0px',threshold:[0,.05,.2]});
    observedSections.forEach(section=>observer.observe(section));
  }
  document.head.appendChild(style);
  const highlightBtn=tools.querySelector('[data-apostila-highlight]');
  const postitBtn=tools.querySelector('[data-apostila-postit]');
  const notionBtn=tools.querySelector('[data-apostila-notion]');
  const palette=tools.querySelector('[data-highlight-palette]');
  const postitPalette=tools.querySelector('[data-postit-palette]');
  let highlightColor='#ffd166';let postitShape='square';

  if (notionBtn) {
    // Verificar status do Notion e vincular evento de conexão
    const checkNotion = async () => {
      try {
        const sb = window.supabaseClient;
        if (!sb) return;
        const { data } = await sb.functions.invoke("notion-api", { body: { action: "status" } });
        if (data?.connected) {
          notionBtn.textContent = "✓ Notion Conectado";
          notionBtn.style.background = "#1b4d3e";
          notionBtn.style.borderColor = "#2e7d32";
        }
      } catch (_) {}
    };
    checkNotion();

    notionBtn.addEventListener('click', async () => {
      try {
        const sb = window.supabaseClient;
        if (!sb) {
          window.location.assign('/configuracoes/?section=perfil');
          return;
        }
        notionBtn.disabled = true;
        notionBtn.textContent = "Conectando...";
        const redirectTo = window.location.href;
        const { data, error } = await sb.functions.invoke("notion-auth", { body: { redirect_to: redirectTo } });
        if (error || !data?.url) {
          window.location.assign('/configuracoes/?section=perfil');
          return;
        }
        window.location.assign(data.url);
      } catch (_) {
        window.location.assign('/configuracoes/?section=perfil');
      }
    });
  }
  const base='luria:apostila:'+location.pathname.replace(/\/+$/,'');
  const highlightKey=base+':highlights:v1';
  const postitKey=base+':postits:v1';
  let mode=null;
  const setMode=next=>{mode=mode===next?null:next;highlightBtn.classList.toggle('is-active',mode==='highlight');postitBtn.classList.toggle('is-active',mode==='postit');palette.hidden=mode!=='highlight';postitPalette.hidden=mode!=='postit';requestAnimationFrame(fitOutline)};
  highlightBtn.addEventListener('click',()=>setMode('highlight'));
  postitBtn.addEventListener('click',()=>setMode('postit'));palette.querySelectorAll('[data-highlight-color]').forEach(btn=>btn.addEventListener('click',()=>{highlightColor=btn.dataset.highlightColor||'#fff09a';palette.querySelectorAll('.book-color-dot').forEach(x=>x.classList.toggle('is-active',x===btn))}));postitPalette.querySelectorAll('[data-postit-shape]').forEach(btn=>btn.addEventListener('click',()=>{postitShape=btn.dataset.postitShape||'square';postitPalette.querySelectorAll('[data-postit-shape]').forEach(x=>x.classList.toggle('is-active',x===btn))}));

  const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
  const sectionId=node=>node?.closest?.('[id]')?.id||'';

  const saveHighlights=()=>write(highlightKey,[...main.querySelectorAll('mark.book-highlight')].map(m=>({text:m.textContent||'',section:sectionId(m),color:m.style.getPropertyValue('--book-highlight-color')||'#fff09a'})).filter(x=>x.text));
  const wrapText=(root,text,color='#fff09a')=>{
    if(!text||!root)return false;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(w.nextNode()){
      const n=w.currentNode;if(n.parentElement?.closest('mark.book-highlight,.book-postit,script,style'))continue;
      const i=n.nodeValue.indexOf(text);if(i<0)continue;
      const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+text.length);
      const m=document.createElement('mark');m.className='book-highlight';m.style.setProperty('--book-highlight-color',color);
      try{r.surroundContents(m);return true}catch{return false}
    }
    return false;
  };
  read(highlightKey).forEach(item=>wrapText(item.section?document.getElementById(item.section)?.closest('.book-section,.mindmap-section,.book-hero')||main:main,item.text,item.color||'#ffd166'));
  const undoHighlight=()=>{
    const marks=[...main.querySelectorAll('mark.book-highlight')];
    const m=marks.at(-1);if(!m)return;
    const p=m.parentNode;while(m.firstChild)p.insertBefore(m.firstChild,m);m.remove();p?.normalize?.();saveHighlights();
  };
  tools.querySelector('[data-highlight-undo]')?.addEventListener('click',undoHighlight);

  document.addEventListener('mouseup',()=>{
    if(mode!=='highlight')return;
    const sel=window.getSelection();if(!sel||sel.isCollapsed||!sel.rangeCount)return;
    const r=sel.getRangeAt(0),host=r.commonAncestorContainer.nodeType===1?r.commonAncestorContainer:r.commonAncestorContainer.parentElement;
    if(!host?.closest('.book-main')||host.closest('.book-postit'))return;
    const m=document.createElement('mark');m.className='book-highlight';m.style.setProperty('--book-highlight-color',highlightColor);
    try{r.surroundContents(m);sel.removeAllRanges();saveHighlights()}catch{}
  });
  main.addEventListener('click',e=>{
    if(mode!=='highlight')return;
    const m=e.target.closest('mark.book-highlight');if(!m)return;
    const p=m.parentNode;while(m.firstChild)p.insertBefore(m.firstChild,m);m.remove();p.normalize();saveHighlights();
  });

  const layer=document.createElement('div');layer.className='book-postit-layer';main.appendChild(layer);
  const savePostits=()=>write(postitKey,[...layer.querySelectorAll('.book-postit')].map(n=>({x:parseFloat(n.style.left)||0,y:parseFloat(n.style.top)||0,w:n.offsetWidth,h:n.offsetHeight,text:n.querySelector('textarea')?.value||'',shape:n.dataset.shape||'square'})));

  const createPostit=(x,y,text='',w=138,h=96,shape='square')=>{
    const note=document.createElement('div');note.className='book-postit';note.dataset.shape=shape||'square';note.style.left=Math.max(0,x)+'px';note.style.top=Math.max(0,y)+'px';note.style.width=Math.max(96,w||138)+'px';note.style.height=Math.max(72,h||96)+'px';
    note.innerHTML='<button type="button" class="book-postit-close" aria-label="Apagar post-it">×</button><textarea placeholder="Digite sua anotação..."></textarea><span class="book-postit-resize" role="button" aria-label="Redimensionar post-it" title="Arraste para redimensionar"></span>';
    const ta=note.querySelector('textarea');ta.value=text;ta.addEventListener('input',savePostits);
    note.querySelector('.book-postit-close').addEventListener('click',()=>{note.remove();savePostits()});

    let drag=false,dx=0,dy=0;
    note.addEventListener('pointerdown',e=>{if(e.target.closest('textarea,button,.book-postit-resize'))return;drag=true;note.setPointerCapture(e.pointerId);const r=note.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top});
    note.addEventListener('pointermove',e=>{if(!drag)return;const r=main.getBoundingClientRect();note.style.left=Math.max(0,e.clientX-r.left-dx)+'px';note.style.top=Math.max(0,e.clientY-r.top-dy+main.scrollTop)+'px'});
    note.addEventListener('pointerup',()=>{if(drag){drag=false;savePostits()}});

    const handle=note.querySelector('.book-postit-resize');let resizing=false,startX=0,startY=0,startW=0,startH=0;
    handle.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();resizing=true;handle.setPointerCapture(e.pointerId);startX=e.clientX;startY=e.clientY;startW=note.offsetWidth;startH=note.offsetHeight});
    handle.addEventListener('pointermove',e=>{if(!resizing)return;e.preventDefault();const maxW=Math.min(340,window.innerWidth*.72);const maxH=420;note.style.width=Math.max(96,Math.min(maxW,startW+(e.clientX-startX)))+'px';note.style.height=Math.max(72,Math.min(maxH,startH+(e.clientY-startY)))+'px'});
    handle.addEventListener('pointerup',e=>{if(!resizing)return;resizing=false;try{handle.releasePointerCapture(e.pointerId)}catch{}savePostits()});
    handle.addEventListener('pointercancel',()=>{resizing=false;savePostits()});

    layer.appendChild(note);return note;
  };

  read(postitKey).forEach(n=>createPostit(n.x,n.y,n.text,n.w,n.h,n.shape||'square'));
  main.addEventListener('click',e=>{
    if(mode!=='postit'||e.target.closest('.book-postit'))return;
    const r=main.getBoundingClientRect(),note=createPostit(e.clientX-r.left-34,e.clientY-r.top+main.scrollTop-18,'',138,96,'square');
    savePostits();setMode(null);note.querySelector('textarea')?.focus();
  });
})();

;(() => {
  "use strict";

  const path = (() => {
    const clean = String(location.pathname || "/").replace(/\/+$/, "");
    return (clean || "/") + "/";
  })();

  if (!/^\/apostilas\/[^/]+\/$/.test(path)) return;

  const esc = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const style = document.createElement("style");
  style.id = "apostila-image-curation-style";
  style.textContent = `
    .apostila-image-curation{margin:0 0 14px;padding:16px;border:1px solid color-mix(in srgb,var(--accent) 22%,var(--border));border-radius:16px;background:color-mix(in srgb,var(--accent) 4%,var(--surface));box-shadow:0 8px 22px rgba(15,35,66,.04)}
    .apostila-image-curation-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}
    .apostila-image-curation-head h2{margin:3px 0 4px;font-size:16px;font-weight:600}
    .apostila-image-curation-head p{margin:0;color:var(--muted);font-size:10px;line-height:1.45}
    .apostila-image-curation-count{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-width:58px;height:30px;padding:0 9px;border-radius:999px;background:var(--surface);border:1px solid var(--border);color:var(--accent);font-size:10px;font-weight:600}
    .apostila-image-curation-count.bad{color:var(--danger,#b42318);border-color:color-mix(in srgb,var(--danger,#b42318) 35%,var(--border));background:color-mix(in srgb,var(--danger,#b42318) 5%,var(--surface))}
    .apostila-image-curation-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
    .apostila-image-candidate{display:grid;grid-template-columns:118px minmax(0,1fr);gap:11px;min-height:136px;padding:10px;border:1px solid var(--border);border-radius:13px;background:var(--surface);overflow:hidden}
    .apostila-image-candidate-preview{width:118px;height:116px;border-radius:10px;background:var(--surface-2);overflow:hidden;display:grid;place-items:center}
    .apostila-image-candidate-preview img{width:100%;height:100%;object-fit:contain;background:#fff}
    .apostila-image-candidate-body{min-width:0;display:flex;flex-direction:column}
    .apostila-image-candidate-body strong{font-size:11px;line-height:1.25}
    .apostila-image-candidate-body small{display:block;margin-top:3px;color:var(--muted);font-size:8.8px;line-height:1.35}
    .apostila-image-candidate-target{margin-top:6px;color:var(--accent)!important}
    .apostila-image-candidate-actions{display:flex;gap:6px;margin-top:auto;padding-top:8px;flex-wrap:wrap}
    .apostila-image-candidate-actions button,.apostila-image-candidate-actions a{min-height:31px;padding:0 9px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font:inherit;font-size:8.8px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
    .apostila-image-candidate-actions [data-apostila-image-action="approve"]{background:var(--accent);border-color:var(--accent);color:#fff}
    .apostila-image-candidate-actions [data-apostila-image-action="reject"]{color:var(--danger,#b42318)}
    .apostila-approved-figure{width:min(58%,520px);margin:18px auto 20px;padding:14px;border:1px solid color-mix(in srgb,var(--accent) 18%,var(--border));border-radius:15px;background:color-mix(in srgb,var(--accent) 3%,var(--surface));text-align:center}.apostila-approved-figure-intro{margin:0 0 11px;padding:10px 11px;border-left:3px solid var(--accent);border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--accent) 6%,var(--surface));text-align:left}.apostila-approved-figure-intro span{display:block;margin-bottom:4px;color:var(--accent);font-size:8.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.apostila-approved-figure-intro p{margin:0!important;color:var(--text);font-size:11.2px!important;line-height:1.55!important}.apostila-approved-figure-focus{margin-top:8px;padding-top:8px;border-top:1px dashed color-mix(in srgb,var(--accent) 20%,var(--border));color:var(--text);font-size:10.2px;line-height:1.48;text-align:left}.apostila-approved-figure-focus strong{color:var(--accent);font-weight:650}
    .apostila-approved-figure{background:var(--surface);box-shadow:none!important;border:1px solid var(--border)!important;padding:12px!important}
    .apostila-approved-figure-focus{background:color-mix(in srgb,var(--accent) 4%,var(--surface));padding:10px 11px;margin:12px 0 0;border:0;border-left:3px solid var(--accent);border-radius:0 7px 7px 0}
    .apostila-approved-figure figcaption{font-size:10.8px;line-height:1.5;padding:0 3px}
    .apostila-approved-figure img{display:block;width:100%;max-width:440px;max-height:360px;object-fit:contain;margin:0 auto;border-radius:10px;background:#fff}
    .apostila-approved-figure figcaption{margin-top:10px;color:var(--muted);font-size:10.5px;line-height:1.52;text-align:left}
    .apostila-approved-figure figcaption strong{color:var(--text);font-weight:600}
    .apostila-approved-figure-source{display:inline-block;margin-top:5px;color:var(--accent);font-size:9px;text-decoration:none}
    /* Tamanho clínico LURIA: nunca usar altura de imagem para inflar a apostila. */
    .book-curated-clinical-image{width:min(100%,520px)!important;max-width:520px!important;box-sizing:border-box;margin:16px auto 22px!important}
    .book-curated-clinical-image img{max-height:340px!important;object-fit:contain!important}
    .apostila-approved-figure{width:min(100%,480px)!important;max-width:480px!important;box-sizing:border-box;margin:18px auto 22px!important}
    .apostila-approved-figure img{max-height:320px!important;object-fit:contain!important}
    @media(max-width:600px){.book-curated-clinical-image,.apostila-approved-figure{width:100%!important;max-width:100%!important}.apostila-approved-figure img,.book-curated-clinical-image img{max-height:300px!important}}
    @media print{.book-curated-clinical-image,.apostila-approved-figure{break-inside:avoid;page-break-inside:avoid}}
    .apostila-approved-source-notice{padding:13px;border:1px dashed color-mix(in srgb,var(--accent) 40%,var(--border));border-radius:11px;background:var(--surface-2);text-align:left}
    .apostila-approved-source-notice p{font-size:11.6px!important;line-height:1.6!important;margin:0 0 10px!important;color:var(--text)}
    .apostila-approved-source-notice a{display:inline-flex;align-items:center;min-height:38px;padding:8px 12px;background:var(--accent);border-radius:8px;color:#fff!important;text-decoration:none;font-size:11px;font-weight:600}
    .apostila-approved-figure-source-only{width:min(100%,450px)!important}
    .apostila-approved-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start;margin:16px 0 18px}
    .apostila-approved-pair .apostila-approved-figure{width:100%;max-width:none;margin:0}
    .apostila-approved-pair .apostila-approved-figure img{max-width:100%}
    .apostila-image-lightbox{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:24px;background:rgba(7,17,31,.78)}
    .apostila-image-lightbox[hidden]{display:none}
    .apostila-image-lightbox-card{position:relative;width:min(980px,94vw);max-height:92vh;padding:14px;border-radius:16px;background:var(--surface);box-shadow:0 24px 70px rgba(0,0,0,.35);overflow:auto}
    .apostila-image-lightbox-card img{display:block;width:100%;max-height:76vh;object-fit:contain;background:#fff;border-radius:10px}
    .apostila-image-lightbox-close{position:absolute;right:20px;top:20px;width:34px;height:34px;border:0;border-radius:50%;background:rgba(0,0,0,.68);color:#fff;font-size:20px;cursor:pointer}
    @media(max-width:820px){.apostila-image-curation-grid{grid-template-columns:1fr}.apostila-image-candidate{grid-template-columns:92px minmax(0,1fr)}.apostila-image-candidate-preview{width:92px;height:96px}}
  `;
  document.head.appendChild(style);

  let rows = [];
  let isAdmin = false;
  let sb = null;

  function getAsset(row) {
    return row?.proposed_asset && typeof row.proposed_asset === "object"
      ? row.proposed_asset
      : {};
  }

  // Fontes reais, licença e identidade clínica verificadas por arquivo.
  // Casos sem substituta equivalente não geram imagem nem bloco de "prévia".
  const removedUnlicensed = new Set([78, 94, 315, 319]);
  const safeClinicalReplacements = {
    96: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Positive_Fern_Test.jpg/500px-Positive_Fern_Test.jpg",
      alt: "Fotomicrografia real da cristalização do líquido amniótico (teste de ferning positivo).",
      title: "Cristalização do líquido amniótico — imagem real",
      caption: "Padrão arborizado em samambaia após secagem em lâmina; correlacionar com anamnese e exame especular.",
      source_name: "Paul_012 / Wikimedia Commons",
      source_url: "https://commons.wikimedia.org/wiki/File:Positive_Fern_Test.jpg",
      source_license: "CC BY-SA 2.0 — https://creativecommons.org/licenses/by-sa/2.0/"
    },
    98: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Histopathology_of_acute_choriodeciduitis_%28original%29.jpg/960px-Histopathology_of_acute_choriodeciduitis_%28original%29.jpg",
      alt: "Fotomicrografia H&E real de coriodeciduite aguda, com infiltrado neutrofílico no córion e decídua.",
      title: "Coriodeciduite aguda — lâmina histológica real",
      caption: "Inflamação com neutrófilos no córion e na decídua; esta lâmina mostra coriodeciduite, não prova, isoladamente, funisite.",
      source_name: "Mikael Häggström, MD / Wikimedia Commons",
      source_url: "https://commons.wikimedia.org/wiki/File:Histopathology_of_acute_choriodeciduitis_(original).jpg",
      source_license: "CC0 1.0 — https://creativecommons.org/publicdomain/zero/1.0/"
    }
  };

  function createApprovedFigure(originalRow) {
    if (removedUnlicensed.has(Number(originalRow.id))) return null;
    const replacement = safeClinicalReplacements[Number(originalRow.id)];
    const row = replacement ? {...originalRow, source_name: replacement.source_name,
      source_url: replacement.source_url, source_license: replacement.source_license,
      proposed_asset: {...getAsset(originalRow), ...replacement,
        render_mode: "image", original_src: replacement.src, resolved_src: replacement.src}} : originalRow;
    const asset = getAsset(row);
    const src = String(asset.src || "").trim();
    if (!src) return null;

    const figure = document.createElement("figure");
    figure.className = "apostila-approved-figure";
    figure.dataset.apostilaApprovedImage = String(row.id);

    const title = String(asset.caption_title || asset.title || "Imagem didática").trim();
    const didactic = String(asset.didactic_note || "").trim();
    const captionText = String(asset.caption || "").trim();
    const introText = String(asset.intro_text || asset.lead_in || "").trim();
    const visualFocus = String(
      asset.visual_focus ||
      asset.what_to_look_for ||
      captionText ||
      ""
    ).trim();
    const clinicalLink = String(asset.clinical_link || asset.clinical_pearl || "").trim();

    if (introText) {
      const intro = document.createElement("div");
      intro.className = "apostila-approved-figure-intro";
      intro.innerHTML = '<span>O que observar</span><p>' + esc(introText) + '</p>';
      figure.appendChild(intro);
    }

    // Alguns links originais (DermNet/Scientific Archives) apontam para arquivos
    // descontinuados ou bloqueiam exibição fora do site. Não renderizar <img> quebrada.
    // Direito de republicação pendente (auditoria editorial 2026-10-13).
    // Enquanto a licença das seis figuras não for comprovada, manter apenas
    // acesso à publicação de origem, sem incorporar o arquivo de terceiros.
    const pendingReuseRights = new Set([78, 94, 315, 319]);
    const directImageUnavailable = asset.render_mode === "source_link" ||
      pendingReuseRights.has(Number(row.id));
    if (directImageUnavailable) {
      const original = luriaSafeContentUrl(row.source_url);
      if (!original) return null;
      figure.classList.add("apostila-approved-figure-source-only");
      const notice = document.createElement("div");
      notice.className = "apostila-approved-source-notice";
      const explanation = document.createElement("p");
      explanation.textContent = "A imagem clínica está disponível na publicação original. O arquivo externo não possui acesso direto confiável para incorporação nesta apostila.";
      notice.appendChild(explanation);
      const link = document.createElement("a");
      link.href = original;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir fotografia clínica na fonte ↗";
      link.setAttribute("aria-label", "Abrir " + title + " na fonte original");
      notice.appendChild(link);
      figure.appendChild(notice);
    } else {
      const img = document.createElement("img");
      img.src = luriaSafeContentUrl(src, {relative:true}) || "";
      img.alt = String(asset.alt || captionText || "Imagem didática");
      img.loading = "lazy";
      img.decoding = "async";
      img.dataset.apostilaImageFallback = "approved-source";
      img.dataset.apostilaImageSourceUrl = luriaSafeContentUrl(row.source_url) || "";
      // Redirecionamento alternativo do repositório de arquivos públicos.
      // Se o CDN falhar, tentar a URL canônica antes de mostrar erro.
      try {
        const media = new URL(src, location.href);
        if (media.hostname === "upload.wikimedia.org") {
          const filename = decodeURIComponent(media.pathname.split("/").pop() || "");
          if (filename) img.dataset.apostilaFallbackUrl = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(filename);
        }
      } catch {}
      figure.appendChild(img);
    }

    if (visualFocus) {
      const focus = document.createElement("div");
      focus.className = "apostila-approved-figure-focus";
      focus.innerHTML = "<strong>O que observar:</strong> " + esc(visualFocus);
      figure.appendChild(focus);
    }

    const caption = document.createElement("figcaption");
    const text = captionText || didactic || "";
    caption.innerHTML = (title ? "<strong>" + esc(title) + "</strong> " : "") + esc(text);
    if (clinicalLink) {
      caption.appendChild(document.createElement("br"));
      const clinical = document.createElement("span");
      clinical.innerHTML = "<strong>Conexão clínica:</strong> " + esc(clinicalLink);
      caption.appendChild(clinical);
    }
    figure.appendChild(caption);

    if (row.source_url) {
      const source = document.createElement("a");
      source.className = "apostila-approved-figure-source";
      source.href = luriaSafeContentUrl(row.source_url) || "#";
      source.target = "_blank";
      source.rel = "noopener";
      source.textContent = "Fonte: " + (row.source_name || "abrir fonte original") + " ↗";
      caption.appendChild(document.createElement("br"));
      caption.appendChild(source);
    }
    // A fonte e a licença pertencem à imagem, não ao conteúdo científico do capítulo.
    // Sempre exibir a licença registrada, especialmente em imagens adaptadas para WebP.
    if (row.source_license) {
      const license = document.createElement("span");
      license.className = "apostila-approved-figure-license";
      license.textContent = "Licença: " + String(row.source_license);
      license.style.cssText = "display:block;margin-top:4px;font-size:9px;line-height:1.4;color:var(--muted)";
      caption.appendChild(license);
    }

    return figure;
  }

  // A imagem complementa o raciocínio do capítulo: não cria galerias para somar páginas.
  function normalizedImageIdentity(raw) {
    const input = String(raw || "").trim();
    if (!input) return "";
    try {
      const url = new URL(input, location.href);
      return (url.hostname.toLowerCase() + decodeURIComponent(url.pathname))
        .replace(/\/{2,}/g, "/").toLowerCase();
    } catch {
      return input.split(/[?#]/)[0].replace(/\/{2,}/g, "/").toLowerCase();
    }
  }

  function figureKind(text) {
    const s = String(text || "").toLowerCase();
    if (/microsc|esfrega|fotomicro|gram|clue cell|levedura|pseudohifa|bacilo|histopat/.test(s)) return "microscopy";
    if (/fotografia|imagem cl[íi]nica|vulva|colo em morango|les[aã]o|corrimento|dermnet|secre[cç][aã]o/.test(s)) return "clinical";
    if (/fluxograma|esquema|diagrama|gr[aá]fico/.test(s)) return "diagram";
    return "other";
  }

  function imageNoveltyScore(row, kinds) {
    const asset = getAsset(row);
    const description = [asset.title, asset.alt, asset.caption, row.candidate_key].join(" ");
    const kind = figureKind(description);
    const licensed = String(row.source_license || "").toLowerCase();
    let score = 10;
    if (kinds.includes(kind)) score -= 8;
    else score += 9;
    if (/dom[íi]nio p[úu]blico|cc by/.test(licensed)) score += 3;
    if (/condicionad|conferir|verificar/.test(licensed)) score -= 2;
    if (kind === "clinical" && kinds.includes("microscopy")) score += 5;
    return score;
  }

  function afterReadingAnchor(target, index, total, row) {
    // Dentro de capítulos por doença: foto clínica próxima ao quadro clínico,
    // microscopia próxima do diagnóstico, sem aglomeração após o título.
    const asset = getAsset(row);
    const kind = figureKind([asset.title, asset.alt, asset.caption, row.candidate_key].join(" "));
    const unit = target.querySelector('.luria-disease-unit[data-unit="' + (kind === "clinical" ? "3" : "4") + '"]');
    if (unit) {
      const paragraph = unit.querySelector("p");
      return paragraph || unit.querySelector(".luria-disease-unit-title");
    }
    const headings = [...target.children].filter(element => /^H[34]$/.test(element.tagName));
    if (headings.length) {
      const heading = headings[Math.min(headings.length - 1, Math.floor((index + 1) * headings.length / (total + 1)))];
      let next = heading.nextElementSibling;
      while (next && !/^H[234]$/.test(next.tagName)) {
        if (next.tagName === "P" || next.tagName === "UL" || next.tagName === "OL") return next;
        next = next.nextElementSibling;
      }
      return heading;
    }
    const paragraphs = [...target.children].filter(element => element.tagName === "P" && element.textContent.trim().length > 60);
    return paragraphs[Math.min(paragraphs.length - 1, Math.floor((index + 1) * paragraphs.length / (total + 1)))] || target.querySelector("h2");
  }

  const sectionHintWords = {
    diagnostico: ["diagnostico", "avaliacao", "exames", "investigacao", "teste"],
    tratamento: ["tratamento", "terapeutica", "manejo", "conduta", "terapia"],
    conduta: ["conduta", "manejo", "tratamento", "abordagem"],
    complicacoes: ["complicacoes", "eventos", "adversos", "risco"],
    visao: ["visao", "panorama", "resumo", "introducao"],
    "visao-geral": ["visao", "panorama", "resumo", "introducao"],
    quadro: ["quadro", "clinico", "sintomas", "manifestacoes"],
    exames: ["exames", "diagnostico", "avaliacao", "investigacao"],
  };

  function normalizedSectionText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function meaningfulWords(value) {
    const stop = new Set([
      "para", "com", "sem", "uma", "das", "dos", "que", "por", "nas", "nos", "entre",
      "sobre", "apos", "antes", "como", "pela", "pelo", "mais", "menos", "imagem", "clinical",
      "clinica", "exame", "figura", "comparacao", "demonstrando", "mostrar", "mostrando",
    ]);
    return normalizedSectionText(value)
      .split(/[^a-z0-9]+/)
      .filter(word => word.length >= 4 && !stop.has(word));
  }

  // The approved queue was curated against older section IDs. Resolve those
  // IDs against the current chapter headings so approved images do not vanish
  // merely because a booklet received a new editorial outline.
  function resolveApprovedTargetSection(row) {
    const requested = String(row.target_section || "").replace(/^#/, "").trim();
    const exact = requested ? document.getElementById(requested) : null;
    if (exact) return exact;

    const candidates = [...document.querySelectorAll("section[id], article[id]")]
      .filter(section => !section.closest("#apostila-image-curation"));
    if (!candidates.length) return null;

    const asset = getAsset(row);
    const description = [requested, row.candidate_key, asset.title, asset.alt, asset.caption,
      asset.intro_text, asset.didactic_note].filter(Boolean).join(" ");
    const words = [...new Set(meaningfulWords(description))];
    const hints = (sectionHintWords[normalizedSectionText(requested)] || []).map(normalizedSectionText);

    let best = null;
    for (const section of candidates) {
      const heading = section.querySelector("h2,h3,h4")?.textContent || "";
      const idText = normalizedSectionText(section.id);
      const headingText = normalizedSectionText(heading);
      const bodyText = normalizedSectionText(section.textContent).slice(0, 12000);
      let score = 0;
      for (const word of words) {
        if (headingText.includes(word)) score += word.length >= 7 ? 8 : 5;
        else if (idText.includes(word)) score += 5;
        else if (bodyText.includes(word)) score += 1;
      }
      for (const hint of hints) {
        if (headingText.includes(hint)) score += 4;
        else if (idText.includes(hint)) score += 2;
      }
      if (!best || score > best.score) best = {section, score};
    }

    // Generic legacy targets such as "visao-geral" still belong at the
    // beginning of the chapter when no semantic signal distinguishes a later
    // section. This keeps the approved image visible without inventing a
    // nonexistent section ID.
    return best?.score > 0 ? best.section : candidates[0];
  }

  function placeApprovedImage(row, slotIndex, slotTotal) {
    if (document.querySelector('[data-apostila-approved-image="' + Number(row.id) + '"]')) return;
    const target = resolveApprovedTargetSection(row);
    if (!target) return;
    const figure = createApprovedFigure(row);
    if (!figure) return;
    const asset = getAsset(row);
    const selector = String(row.target_selector || asset.target_selector || "").trim();
    let anchor = null;
    try { anchor = selector ? target.querySelector(selector) : afterReadingAnchor(target, slotIndex, slotTotal, row); }
    catch { anchor = afterReadingAnchor(target, slotIndex, slotTotal, row); }
    if (!anchor || anchor === target) {
      target.appendChild(figure);
      return;
    }
    if (selector && String(row.placement || asset.placement) === "before") anchor.insertAdjacentElement("beforebegin", figure);
    else anchor.insertAdjacentElement("afterend", figure);
  }

  function renderApproved() {
    // Remove agrupamentos antigos; nenhum par ou mosaico de quatro imagens é recriado.
    document.querySelectorAll(".apostila-approved-pair").forEach(node => node.remove());
    document.querySelectorAll(".apostila-approved-figure[data-apostila-approved-image]").forEach(node => node.remove());

    const grouped = new Map();
    rows.filter(row => row.review_status === "approved" && !removedUnlicensed.has(Number(row.id))).forEach(row => {
      const target = resolveApprovedTargetSection(row);
      if (!target) return;
      const key = target.id;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(row);
    });

    grouped.forEach((candidates, sectionId) => {
      const section = document.getElementById(sectionId.replace(/^#/, ""));
      if (!section) return;
      const authoredImages = [...section.querySelectorAll("img")];
      const used = new Set(authoredImages.map(img => normalizedImageIdentity(img.getAttribute("src"))).filter(Boolean));
      const authoredKinds = authoredImages.map(img =>
        figureKind([img.alt, img.closest("figure")?.querySelector("figcaption")?.textContent || ""].join(" "))
      );
      const ranked = candidates
        .filter(row => {
          const asset = getAsset(row);
          const identities = [asset.src, asset.original_src, asset.resolved_src].map(normalizedImageIdentity).filter(Boolean);
          if (!identities.length || identities.some(id => used.has(id))) return false;
          identities.forEach(id => used.add(id)); // evita mesmo arquivo aprovado duas vezes
          return true;
        })
        .map(row => ({row, score:imageNoveltyScore(row, authoredKinds)}))
        .sort((a,b) => b.score - a.score || Number(a.row.id) - Number(b.row.id));

      // A aprovação no Admin é a decisão editorial de exibir a imagem.
      // Não ocultar candidatas aprovadas por um limite arbitrário de 1–2 por seção.
      // A prevenção de duplicatas por URL/identidade acima continua em vigor.
      const chosen = ranked.map(item => item.row);
      chosen.forEach((row, index) => placeApprovedImage(row,index,chosen.length));
    });
  }

  function ensureLightbox() {
    let modal = document.getElementById("apostila-image-lightbox");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "apostila-image-lightbox";
    modal.className = "apostila-image-lightbox";
    modal.hidden = true;
    modal.innerHTML = '<div class="apostila-image-lightbox-card"><button class="apostila-image-lightbox-close" type="button" aria-label="Fechar">×</button><img alt=""></div>';
    document.body.appendChild(modal);
    modal.addEventListener("click", event => {
      if (event.target === modal || event.target.closest(".apostila-image-lightbox-close")) modal.hidden = true;
    });
    return modal;
  }

  function expandImage(src, alt) {
    const modal = ensureLightbox();
    const img = modal.querySelector("img");
    img.src = luriaSafeContentUrl(src, {relative:true}) || "";
    img.alt = alt || "Imagem candidata";
    modal.hidden = false;
  }

  function renderReviewPanel() {
    document.getElementById("apostila-image-curation")?.remove();
    if (!isAdmin) return;

    const pending = rows.filter(row => row.review_status === "pending");
    if (!pending.length) return;

    const hero = document.querySelector(".book-hero");
    if (!hero) return;

    const panel = document.createElement("section");
    panel.id = "apostila-image-curation";
    panel.className = "apostila-image-curation";
    const total = rows.length;
    const countClass = total < 10 ? " bad" : "";
    panel.innerHTML = `
      <div class="apostila-image-curation-head">
        <div>
          <span class="eyebrow">Curadoria editorial</span>
          <h2>Imagens para aprovação</h2>
          <p>Revise as candidatas antes de entrarem no texto. Aprovar encaixa a figura na seção prevista; rejeitar exclui a candidata da fila.</p>
        </div>
        <span class="apostila-image-curation-count${countClass}">${total}/10</span>
      </div>
      <div class="apostila-image-curation-grid"></div>
    `;

    const grid = panel.querySelector(".apostila-image-curation-grid");
    pending.forEach(row => {
      const asset = getAsset(row);
      const card = document.createElement("article");
      card.className = "apostila-image-candidate";
      card.dataset.apostilaImageId = String(row.id);
      card.innerHTML = `
        <div class="apostila-image-candidate-preview">
          ${asset.src ? '<img loading="lazy" src="' + esc(luriaSafeContentUrl(asset.src, {relative:true})) + '" alt="' + esc(asset.alt || asset.caption || "Imagem candidata") + '" data-apostila-image-fallback="candidate">' : "<span>Sem prévia</span>"}
        </div>
        <div class="apostila-image-candidate-body">
          <strong>${esc(asset.title || asset.caption_title || row.source_name || "Imagem candidata")}</strong>
          <small>${esc(asset.intro_text || asset.lead_in || asset.didactic_note || asset.caption || "Imagem proposta para complementar o conteúdo.")}</small>
          <small class="apostila-image-candidate-target">Entraria em: #${esc(row.target_section || "—")}</small>
          <small>${esc(row.source_name || "Fonte não informada")}${row.source_license ? " · " + esc(row.source_license) : ""}</small>
          <div class="apostila-image-candidate-actions">
            ${asset.src ? '<button type="button" data-apostila-image-expand="' + Number(row.id) + '">Expandir</button>' : ""}
            ${row.source_url ? '<a href="' + esc(luriaSafeContentUrl(row.source_url) || '#') + '" target="_blank" rel="noopener">Fonte ↗</a>' : ""}
            <button type="button" data-apostila-image-action="reject" data-apostila-image-id="${Number(row.id)}">Rejeitar</button>
            <button type="button" data-apostila-image-action="approve" data-apostila-image-id="${Number(row.id)}">Aprovar</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    hero.insertAdjacentElement("afterend", panel);

    panel.addEventListener("click", async event => {
      const expand = event.target.closest("[data-apostila-image-expand]");
      if (expand) {
        const row = rows.find(item => Number(item.id) === Number(expand.dataset.apostilaImageExpand));
        const asset = getAsset(row);
        if (asset.src) expandImage(asset.src, asset.alt || asset.caption || "");
        return;
      }

      const button = event.target.closest("[data-apostila-image-action]");
      if (!button) return;
      const id = Number(button.dataset.apostilaImageId);
      const action = button.dataset.apostilaImageAction;
      if (!id || !["approve","reject"].includes(action)) return;

      button.disabled = true;
      try {
        if (action === "approve") {
          const row = rows.find(item => Number(item.id) === id);
          const size = Number(getAsset(row)?.size_bytes || 0);
          if (!size || size > 112640) {
            const originalText = button.textContent;
            button.textContent = "Otimizando...";
            const { data: optimized, error: optimizeError } = await sb.functions.invoke("optimize-apostila-image", {
              body: { id }
            });
            if (optimizeError) {
              let details = optimizeError.message || "Falha ao otimizar imagem";
              try { const body = await optimizeError.context?.json?.(); details = body?.error || body?.message || details; } catch {}
              throw new Error(details);
            }
            if (!optimized?.ok || Number(optimized?.size_bytes || 0) > 112640) {
              throw new Error(optimized?.error || "Não foi possível otimizar a imagem para até 110 KB.");
            }
            button.textContent = originalText;
          }
        }

        button.textContent = action === "approve" ? "Salvando..." : "Rejeitando...";
        const { error } = await sb.rpc("admin_review_apostila_image", {
          p_id: id,
          p_decision: action === "approve" ? "approved" : "rejected"
        });
        if (error) throw error;
        await loadRows();
      } catch (error) {
        console.error("Falha na curadoria de imagem da apostila:", error);
        button.disabled = false;
        button.textContent = action === "approve" ? "Aprovar" : "Rejeitar";
        window.alert("Não foi possível salvar a decisão desta imagem: " + (error?.message || "erro desconhecido"));
      }
    });
  }

  async function loadRows() {
    if (!sb) return;

    // Esta página é apenas de leitura: a aprovação/rejeição pertence ao Admin.
    // O endpoint público expõe exclusivamente registros aprovados e funciona
    // tanto para visitantes anônimos quanto para administradores autenticados.
    const { data: approvedData, error: approvedError } = await sb.rpc("list_approved_apostila_images", {
      p_apostila_path: path
    });
    if (approvedError) {
      // Em caso de falha temporária, preservar as figuras já renderizadas.
      console.warn("Imagens aprovadas da apostila indisponíveis:", approvedError);
      return;
    }

    rows = (Array.isArray(approvedData) ? approvedData : [])
      .filter(row => row.review_status === "approved");
    renderApproved();
  }

  async function boot() {
    if (document.body?.getAttribute("data-apostila-images") === "disabled-by-admin") {
      document.getElementById("apostila-image-curation")?.remove();
      document.querySelectorAll(".apostila-approved-pair,.apostila-approved-figure[data-apostila-approved-image]").forEach(node => node.remove());
      return;
    }
    sb = window.supabaseClient;
    if (!sb) { setTimeout(() => { sb = window.supabaseClient; if(sb) boot().catch(console.warn); }, 1200); return; }

    try {
      if (window.docmapIsAdmin === true) {
        isAdmin = true;
      } else {
        const { data: sessionData } = await sb.auth.getSession();
        if (!sessionData?.session) {
          isAdmin = false;
          await loadRows();
          return;
        }

        const { data } = await sb.rpc("is_admin");
        isAdmin = data === true;
      }
    } catch {
      isAdmin = window.docmapIsAdmin === true;
    }

    await loadRows();
  }

  function bootWhenReady() {
    if (window.docmapUser || window.docmapSession) {
      boot().catch(error => console.warn("Falha ao iniciar curadoria da apostila:", error));
      return;
    }

    window.addEventListener("docmap:ready", () => {
      boot().catch(error => console.warn("Falha ao iniciar curadoria da apostila:", error));
    }, { once: true });

    setTimeout(() => {
      if (!rows.length) {
        boot().catch(() => {});
      }
    }, 1800);
  }

  bootWhenReady();
})();

;(() => { const script = document.createElement('script'); script.src = '/assets/js/study-side-by-side.js?v=20261028'; document.body.appendChild(script); })();
