(() => {
  if (window.LuriaApostilaTools) return;
  window.LuriaApostilaTools = true;
  const main=document.querySelector('.book-main');
  const outlineHead=document.querySelector('.book-outline-head');
  if(!main||!outlineHead)return;

  const style=document.createElement('style');
  style.textContent='.book-outline{position:sticky!important;top:4px!important;height:calc(100dvh - 8px)!important;max-height:calc(100dvh - 8px)!important;overflow:hidden!important;padding:6px!important;box-sizing:border-box!important;display:flex!important;flex-direction:column!important}.book-outline-head{padding:1px 2px 4px!important;flex:0 0 auto!important}.book-outline-head small{font-size:6.6px!important;line-height:1!important}.book-outline-head strong{font-size:10.4px!important;line-height:1.08!important}.book-outline-nav{gap:0!important;margin-top:3px!important;flex:1 1 auto!important;min-height:0!important;overflow:hidden!important;display:grid!important;align-content:stretch!important}.book-outline-link{min-height:0!important;padding:1px 4px!important;font-size:8px!important;line-height:1!important;border-radius:5px!important;overflow:hidden!important;display:flex!important;align-items:center!important}.book-outline-back{width:100%!important;max-width:none!important;box-sizing:border-box!important;height:26px!important;min-height:26px!important;margin-bottom:5px!important;font-size:7.6px!important}.book-tools{margin-top:3px!important;padding-top:3px!important;gap:4px!important;flex:0 0 auto!important;position:relative!important}.book-tool-btn{min-height:27px!important;font-size:8.2px!important}.book-highlight-palette,.book-postit-palette{gap:5px!important;padding:6px!important;position:absolute!important;left:0!important;right:0!important;bottom:36px!important;z-index:30!important;border:1px solid var(--border)!important;border-radius:9px!important;background:var(--surface)!important;box-shadow:0 8px 20px rgba(15,35,66,.12)!important}.book-tool-mini{min-width:25px!important;height:25px!important;font-size:9px!important}.book-color-dot{width:19px!important;height:19px!important}.book-tools{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}.book-tool-btn{min-height:34px;padding:0 8px;border:1px solid #184888;border-radius:9px;background:#184888;color:#fff;font:inherit;font-size:9.5px;font-weight:600;cursor:pointer}.book-tool-btn:hover{background:#123b72;color:#fff}.book-tool-btn.is-active{background:#0f3465;border-color:#0f3465;color:#fff;box-shadow:0 0 0 2px color-mix(in srgb,#184888 18%,transparent)}.book-highlight-palette,.book-postit-palette{grid-column:1/-1;display:flex;align-items:center;gap:6px;padding-top:2px;flex-wrap:wrap}.book-postit-palette{justify-content:flex-end;width:100%}.book-highlight-palette[hidden],.book-postit-palette[hidden]{display:none}.book-tool-mini{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 8px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--accent);font:inherit;font-size:11px;cursor:pointer}.book-tool-mini:hover{background:var(--surface-2)}.book-tool-mini.is-active{border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}.book-color-dot{width:22px;height:22px;padding:0;border:2px solid transparent;border-radius:50%;cursor:pointer}.book-color-dot.is-active{border-color:var(--accent);box-shadow:0 0 0 2px var(--surface) inset}.book-highlight{background:var(--book-highlight-color,#fff09a);color:inherit;border-radius:2px;padding:0 .03em}.book-main{position:relative}.book-postit-layer{position:absolute;inset:0;z-index:40;pointer-events:none}.book-postit{position:absolute;width:138px;height:96px;min-width:96px;min-height:72px;max-width:min(340px,72vw);max-height:420px;padding:10px 9px 8px;box-sizing:border-box;border:1px solid rgba(94,82,20,.20);border-radius:8px;background:#fff2a6;box-shadow:0 10px 22px rgba(0,0,0,.16);pointer-events:auto;cursor:grab;resize:none;overflow:visible}.book-postit-resize{position:absolute;right:-4px;bottom:-4px;width:16px;height:16px;border:1px solid rgba(80,70,25,.35);border-radius:5px;background:#fff9d6;cursor:nwse-resize;touch-action:none}.book-postit-resize:before{content:"";position:absolute;right:4px;bottom:4px;width:7px;height:7px;border-right:2px solid rgba(80,70,25,.5);border-bottom:2px solid rgba(80,70,25,.5)}.book-postit textarea{display:block;width:100%;height:100%;min-height:46px;box-sizing:border-box;resize:none;border:0;background:transparent;color:#403a1f;font:500 9.5px/1.38 inherit;outline:none}.book-postit-close{position:absolute;top:2px;right:4px;width:22px;height:22px;border:0;background:transparent;color:#6c622d;font-size:18px;line-height:1;cursor:pointer}@media(max-width:900px){.book-outline{height:auto!important;max-height:none!important;overflow:visible!important;display:block!important}.book-outline-nav{display:flex!important;grid-template-rows:none!important;overflow-x:auto!important;overflow-y:hidden!important}.book-outline-link{min-height:28px!important;height:auto!important;padding:5px 8px!important;font-size:8.7px!important;line-height:1.1!important}.book-outline-back{width:max-content!important}.book-tools{grid-template-columns:repeat(2,minmax(110px,1fr))}.book-postit{max-width:72vw}}';
  document.head.appendChild(style);

  const fitOutline=()=>{
    const outline=document.querySelector('.book-outline');
    const nav=outline?.querySelector('.book-outline-nav');
    if(!outline||!nav)return;
    const links=[...nav.querySelectorAll('.book-outline-link')];
    if(!links.length)return;
    const head=outline.querySelector('.book-outline-head');
    const back=outline.querySelector('.book-outline-back');
    const tools=outline.querySelector('.book-tools');
    const cs=getComputedStyle(outline);
    const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
    const fixed=(head?.offsetHeight||0)+(back?.offsetHeight||0)+(tools?.offsetHeight||0)+pad+6;
    const available=Math.max(120,outline.clientHeight-fixed);
    const per=Math.max(12,Math.min(22,available/links.length));
    nav.style.gridTemplateRows='repeat('+links.length+', minmax(0,1fr))';
    links.forEach(link=>{
      link.style.height=per+'px';
      link.style.minHeight='0';
      link.style.fontSize=(per<15?'6.7':per<18?'7.2':per<20?'7.6':'8.1')+'px';
      link.style.padding=per<16?'0 3px':'1px 4px';
    });
  };

  const outlineNav=document.querySelector('.book-outline-nav');
  if(outlineNav){
    const count=outlineNav.querySelectorAll('.book-outline-link').length||1;
    outlineNav.style.setProperty('--apostila-outline-count',String(count));
  }

  const tools=document.createElement('div');
  tools.className='book-tools';
  tools.innerHTML='<button type="button" class="book-tool-btn" data-apostila-highlight>Grifar</button><button type="button" class="book-tool-btn" data-apostila-postit>Post-it</button><div class="book-highlight-palette" data-highlight-palette hidden><button type="button" class="book-tool-mini" data-highlight-undo title="Desfazer último grifo" aria-label="Desfazer último grifo">↶</button><button type="button" class="book-color-dot is-active" data-highlight-color="#fff09a" style="background:#fff09a" aria-label="Amarelo"></button><button type="button" class="book-color-dot" data-highlight-color="#bff3c8" style="background:#bff3c8" aria-label="Verde"></button><button type="button" class="book-color-dot" data-highlight-color="#bfe1ff" style="background:#bfe1ff" aria-label="Azul"></button><button type="button" class="book-color-dot" data-highlight-color="#ffc8df" style="background:#ffc8df" aria-label="Rosa"></button><button type="button" class="book-color-dot" data-highlight-color="#e6ccff" style="background:#e6ccff" aria-label="Roxo"></button></div><div class="book-postit-palette" data-postit-palette hidden><button type="button" class="book-tool-mini is-active" data-postit-shape="square">▭ Quadrado</button></div>';
  outlineHead.insertAdjacentElement('afterend',tools);
  requestAnimationFrame(()=>requestAnimationFrame(fitOutline));
  window.addEventListener('resize',fitOutline,{passive:true});

  const highlightBtn=tools.querySelector('[data-apostila-highlight]');
  const postitBtn=tools.querySelector('[data-apostila-postit]');const palette=tools.querySelector('[data-highlight-palette]');const postitPalette=tools.querySelector('[data-postit-palette]');let highlightColor='#fff09a';let postitShape='square';
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
  read(highlightKey).forEach(item=>wrapText(item.section?document.getElementById(item.section)?.closest('.book-section,.mindmap-section,.book-hero')||main:main,item.text,item.color||'#fff09a'));
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
    .apostila-approved-figure img{display:block;width:100%;max-width:440px;max-height:360px;object-fit:contain;margin:0 auto;border-radius:10px;background:#fff}
    .apostila-approved-figure figcaption{margin-top:10px;color:var(--muted);font-size:10.5px;line-height:1.52;text-align:left}
    .apostila-approved-figure figcaption strong{color:var(--text);font-weight:600}
    .apostila-approved-figure-source{display:inline-block;margin-top:5px;color:var(--accent);font-size:9px;text-decoration:none}
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

  function createApprovedFigure(row) {
    const asset = getAsset(row);
    const src = String(asset.src || "").trim();
    if (!src) return null;

    const figure = document.createElement("figure");
    figure.className = "apostila-approved-figure";
    figure.dataset.apostilaApprovedImage = String(row.id);

    const title = String(asset.caption_title || asset.title || "Imagem didática").trim();
    const didactic = String(asset.didactic_note || "").trim();
    const captionText = String(asset.caption || "").trim();
    const introText = String(
      asset.intro_text ||
      asset.lead_in ||
      didactic ||
      ("Antes de seguir, observe " + title.toLowerCase() + ". Use a imagem para reconhecer o padrão visual e relacioná-lo ao raciocínio clínico desta seção.")
    ).trim();
    const visualFocus = String(
      asset.visual_focus ||
      asset.what_to_look_for ||
      captionText ||
      ""
    ).trim();
    const clinicalLink = String(asset.clinical_link || asset.clinical_pearl || "").trim();

    const intro = document.createElement("div");
    intro.className = "apostila-approved-figure-intro";
    intro.innerHTML = '<span>Leitura guiada</span><p>' + esc(introText) + '</p>';
    figure.appendChild(intro);

    const img = document.createElement("img");
    img.src = src;
    img.alt = String(asset.alt || captionText || "Imagem didática");
    img.loading = "lazy";
    figure.appendChild(img);

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
      source.href = row.source_url;
      source.target = "_blank";
      source.rel = "noopener";
      source.textContent = "Fonte: " + (row.source_name || "abrir fonte original") + " ↗";
      caption.appendChild(document.createElement("br"));
      caption.appendChild(source);
    }

    return figure;
  }

  function placeApprovedImage(row) {
    if (document.querySelector('[data-apostila-approved-image="' + Number(row.id) + '"]')) return;
    const target = document.getElementById(String(row.target_section || "").replace(/^#/, ""));
    if (!target) return;

    const asset = getAsset(row);
    const selector = String(row.target_selector || asset.target_selector || "").trim();
    let anchor = selector ? target.querySelector(selector) : null;
    const figure = createApprovedFigure(row);
    if (!figure) return;

    const placement = String(row.placement || asset.placement || "append");
    if (!anchor) {
      target.appendChild(figure);
      return;
    }
    if (placement === "before") anchor.insertAdjacentElement("beforebegin", figure);
    else if (placement === "prepend") anchor.insertAdjacentElement("afterbegin", figure);
    else if (placement === "append") anchor.insertAdjacentElement("beforeend", figure);
    else anchor.insertAdjacentElement("afterend", figure);
  }

  function pairAdjacentApprovedFigures() {
    document.querySelectorAll(".apostila-approved-pair").forEach(pair => {
      const parent = pair.parentElement;
      [...pair.children].forEach(child => parent?.insertBefore(child, pair));
      pair.remove();
    });

    document.querySelectorAll(".book-section").forEach(section => {
      let node = section.firstElementChild;
      while (node) {
        if (!node.classList?.contains("apostila-approved-figure")) {
          node = node.nextElementSibling;
          continue;
        }
        const next = node.nextElementSibling;
        if (!next?.classList?.contains("apostila-approved-figure")) {
          node = node.nextElementSibling;
          continue;
        }
        const pair = document.createElement("div");
        pair.className = "apostila-approved-pair";
        section.insertBefore(pair, node);
        pair.appendChild(node);
        pair.appendChild(next);
        node = pair.nextElementSibling;
      }
    });
  }

  function renderApproved() {
    document.querySelectorAll(".apostila-approved-pair").forEach(node => node.remove());
    document.querySelectorAll(".apostila-approved-figure[data-apostila-approved-image]").forEach(node => node.remove());
    rows.filter(row => row.review_status === "approved").forEach(placeApprovedImage);
    pairAdjacentApprovedFigures();
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
    img.src = src;
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
          ${asset.src ? '<img src="' + esc(asset.src) + '" alt="' + esc(asset.alt || asset.caption || "Imagem candidata") + '">' : "<span>Sem prévia</span>"}
        </div>
        <div class="apostila-image-candidate-body">
          <strong>${esc(asset.title || asset.caption_title || row.source_name || "Imagem candidata")}</strong>
          <small>${esc(asset.intro_text || asset.lead_in || asset.didactic_note || asset.caption || "Imagem proposta para complementar o conteúdo.")}</small>
          <small class="apostila-image-candidate-target">Entraria em: #${esc(row.target_section || "—")}</small>
          <small>${esc(row.source_name || "Fonte não informada")}${row.source_license ? " · " + esc(row.source_license) : ""}</small>
          <div class="apostila-image-candidate-actions">
            ${asset.src ? '<button type="button" data-apostila-image-expand="' + Number(row.id) + '">Expandir</button>' : ""}
            ${row.source_url ? '<a href="' + esc(row.source_url) + '" target="_blank" rel="noopener">Fonte ↗</a>' : ""}
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
            if (optimizeError) throw optimizeError;
            if (!optimized?.ok || Number(optimized?.size_bytes || 0) > 112640) {
              throw new Error("Não foi possível otimizar a imagem para até 110 KB.");
            }
            button.textContent = originalText;
          }
        }

        const { error } = await sb.rpc("admin_review_apostila_image", {
          p_id: id,
          p_decision: action === "approve" ? "approved" : "rejected"
        });
        if (error) throw error;
        await loadRows();
      } catch (error) {
        console.error("Falha na curadoria de imagem da apostila:", error);
        button.disabled = false;
        window.alert("Não foi possível salvar a decisão desta imagem: " + (error?.message || "erro desconhecido"));
      }
    });
  }

  async function loadRows() {
    if (!sb) return;

    let pending = [];
    let approved = [];

    if (isAdmin) {
      const { data: adminData, error: adminError } = await sb.rpc("admin_list_apostila_images", {
        p_apostila_path: path
      });
      if (adminError) {
        console.warn("Curadoria administrativa da apostila indisponível:", adminError);
      } else {
        const all = Array.isArray(adminData) ? adminData : [];
        pending = all.filter(row => row.review_status === "pending");
        approved = all.filter(row => row.review_status === "approved");
      }
    } else {
      const { data: approvedData, error: approvedError } = await sb.rpc("list_approved_apostila_images", {
        p_apostila_path: path
      });
      if (approvedError) {
        console.warn("Imagens aprovadas da apostila indisponíveis:", approvedError);
        return;
      }
      approved = Array.isArray(approvedData) ? approvedData : [];
    }

    rows = [...approved, ...pending];
    renderApproved();
    renderReviewPanel();
  }

  async function boot() {
    if (document.body?.getAttribute("data-apostila-images") === "off") {
      document.getElementById("apostila-image-curation")?.remove();
      document.querySelectorAll(".apostila-approved-pair,.apostila-approved-figure[data-apostila-approved-image]").forEach(node => node.remove());
      return;
    }
    sb = window.supabaseClient;
    if (!sb) return;

    try {
      if (window.docmapIsAdmin === true) {
        isAdmin = true;
      } else {
        const { data: sessionData } = await sb.auth.getSession();
        if (!sessionData?.session) {
          isAdmin = false;
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
