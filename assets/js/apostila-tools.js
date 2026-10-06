(() => {
  if (window.LuriaApostilaTools) return;
  window.LuriaApostilaTools = true;
  const main=document.querySelector('.book-main');
  const outlineHead=document.querySelector('.book-outline-head');
  if(!main||!outlineHead)return;

  const style=document.createElement('style');
  style.textContent='.book-tools{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}.book-tool-btn{min-height:34px;padding:0 8px;border:1px solid var(--border);border-radius:9px;background:var(--surface);color:var(--text);font:inherit;font-size:9.5px;cursor:pointer}.book-tool-btn:hover{background:var(--surface-2);color:var(--accent)}.book-tool-btn.is-active{background:color-mix(in srgb,var(--accent) 10%,var(--surface));border-color:color-mix(in srgb,var(--accent) 40%,var(--border));color:var(--accent)}.book-highlight-palette{grid-column:1/-1;display:flex;align-items:center;gap:6px;padding-top:2px}.book-highlight-palette[hidden]{display:none}.book-color-dot{width:22px;height:22px;padding:0;border:2px solid transparent;border-radius:50%;cursor:pointer}.book-color-dot.is-active{border-color:var(--accent);box-shadow:0 0 0 2px var(--surface) inset}.book-highlight{background:var(--book-highlight-color,#fff09a);color:inherit;border-radius:2px;padding:0 .03em}.book-main{position:relative}.book-postit-layer{position:absolute;inset:0;z-index:40;pointer-events:none}.book-postit{position:absolute;width:160px;height:118px;min-width:110px;min-height:88px;max-width:min(420px,80vw);max-height:520px;padding:14px 12px 10px;box-sizing:border-box;border:1px solid rgba(94,82,20,.20);border-radius:10px;background:#fff2a6;box-shadow:0 12px 28px rgba(0,0,0,.18);pointer-events:auto;cursor:grab;resize:both;overflow:auto}.book-postit:after{content:"";position:absolute;right:3px;bottom:3px;width:12px;height:12px;border-right:2px solid rgba(80,70,25,.45);border-bottom:2px solid rgba(80,70,25,.45);pointer-events:none}.book-postit textarea{display:block;width:100%;height:100%;min-height:54px;box-sizing:border-box;resize:none;border:0;background:transparent;color:#403a1f;font:500 12px/1.45 inherit;outline:none}.book-postit-close{position:absolute;top:4px;right:6px;width:26px;height:26px;border:0;background:transparent;color:#6c622d;font-size:18px;line-height:1;cursor:pointer}@media(max-width:900px){.book-tools{grid-template-columns:repeat(2,minmax(110px,1fr))}.book-postit{max-width:72vw}}';
  document.head.appendChild(style);

  const tools=document.createElement('div');
  tools.className='book-tools';
  tools.innerHTML='<button type="button" class="book-tool-btn" data-apostila-highlight>Grifar</button><button type="button" class="book-tool-btn" data-apostila-postit>Post-it</button><div class="book-highlight-palette" data-highlight-palette hidden><button type="button" class="book-color-dot is-active" data-highlight-color="#fff09a" style="background:#fff09a" aria-label="Amarelo"></button><button type="button" class="book-color-dot" data-highlight-color="#bff3c8" style="background:#bff3c8" aria-label="Verde"></button><button type="button" class="book-color-dot" data-highlight-color="#bfe1ff" style="background:#bfe1ff" aria-label="Azul"></button><button type="button" class="book-color-dot" data-highlight-color="#ffc8df" style="background:#ffc8df" aria-label="Rosa"></button><button type="button" class="book-color-dot" data-highlight-color="#e6ccff" style="background:#e6ccff" aria-label="Roxo"></button></div>';
  outlineHead.insertAdjacentElement('afterend',tools);

  const highlightBtn=tools.querySelector('[data-apostila-highlight]');
  const postitBtn=tools.querySelector('[data-apostila-postit]');const palette=tools.querySelector('[data-highlight-palette]');let highlightColor='#fff09a';
  const base='luria:apostila:'+location.pathname.replace(/\/+$/,'');
  const highlightKey=base+':highlights:v1';
  const postitKey=base+':postits:v1';
  let mode=null;
  const setMode=next=>{mode=mode===next?null:next;highlightBtn.classList.toggle('is-active',mode==='highlight');postitBtn.classList.toggle('is-active',mode==='postit');palette.hidden=mode!=='highlight'};
  highlightBtn.addEventListener('click',()=>setMode('highlight'));
  postitBtn.addEventListener('click',()=>setMode('postit'));palette.querySelectorAll('[data-highlight-color]').forEach(btn=>btn.addEventListener('click',()=>{highlightColor=btn.dataset.highlightColor||'#fff09a';palette.querySelectorAll('.book-color-dot').forEach(x=>x.classList.toggle('is-active',x===btn))}));

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
  const savePostits=()=>write(postitKey,[...layer.querySelectorAll('.book-postit')].map(n=>({x:parseFloat(n.style.left)||0,y:parseFloat(n.style.top)||0,w:n.offsetWidth,h:n.offsetHeight,text:n.querySelector('textarea')?.value||''})));

  const createPostit=(x,y,text='',w=160,h=118)=>{
    const note=document.createElement('div');note.className='book-postit';note.style.left=Math.max(0,x)+'px';note.style.top=Math.max(0,y)+'px';note.style.width=Math.max(110,w||160)+'px';note.style.height=Math.max(88,h||118)+'px';
    note.innerHTML='<button type="button" class="book-postit-close" aria-label="Apagar post-it">×</button><textarea placeholder="Digite sua anotação..."></textarea>';
    const ta=note.querySelector('textarea');ta.value=text;ta.addEventListener('input',savePostits);
    note.querySelector('.book-postit-close').addEventListener('click',()=>{note.remove();savePostits()});
    let drag=false,dx=0,dy=0;
    note.addEventListener('pointerdown',e=>{if(e.target.closest('textarea,button'))return;drag=true;note.setPointerCapture(e.pointerId);const r=note.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top});
    note.addEventListener('pointermove',e=>{if(!drag)return;const r=main.getBoundingClientRect();note.style.left=Math.max(0,e.clientX-r.left-dx)+'px';note.style.top=Math.max(0,e.clientY-r.top-dy+main.scrollTop)+'px'});
    note.addEventListener('pointerup',()=>{if(drag){drag=false;savePostits()}});new ResizeObserver(savePostits).observe(note);
    layer.appendChild(note);return note;
  };

  read(postitKey).forEach(n=>createPostit(n.x,n.y,n.text,n.w,n.h));
  main.addEventListener('click',e=>{
    if(mode!=='postit'||e.target.closest('.book-postit'))return;
    const r=main.getBoundingClientRect(),note=createPostit(e.clientX-r.left-40,e.clientY-r.top+main.scrollTop-20,'');
    savePostits();setMode(null);note.querySelector('textarea')?.focus();
  });
})();