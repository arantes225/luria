
(function(){
  function q(s,r=document){return r.querySelector(s)}
  function qa(s,r=document){return Array.from(r.querySelectorAll(s))}
  function fireNew(){
    const tab=q('[data-exam-mode="new"]');
    if(tab) tab.click();
    else if(typeof window.openExamDialog==="function") window.openExamDialog();
  }
  function build(){
    if(!document.body.matches('[data-page="editais"]')) return;
    const own=q('#editais-own-content');
    if(!own || q('.ed-approved-hero')) return;

    const hero=document.createElement('section');
    hero.className='ed-approved-hero';
    hero.innerHTML='<div><div class="ed-approved-breadcrumb">⌂ <span>›</span> Editais e Provas</div><h1>Editais e Provas</h1><p>Acompanhe editais, organize suas inscrições e gerencie suas provas em um só lugar.</p></div><div class="ed-approved-art" aria-hidden="true"></div>';
    own.parentNode.insertBefore(hero, own);

    const catalog=document.createElement('button');
    catalog.className='ed-catalog-link';
    catalog.type='button';
    catalog.textContent='Central de editais';
    catalog.addEventListener('click',()=>q('[data-editais-source="catalog"]')?.click());
    own.parentNode.insertBefore(catalog, own);

    const head=q('.exam-create-head',own);
    if(head && !q('.ed-new-exam',head)){
      const b=document.createElement('button');
      b.className='ed-new-exam'; b.type='button'; b.innerHTML='+ &nbsp; Nova prova';
      b.addEventListener('click',fireNew); head.appendChild(b);
    }

    const filters=q('.exam-filters',own);
    if(filters && !q('.ed-sort-control',filters)){
      const wrap=document.createElement('label');
      wrap.className='ed-sort-control';
      wrap.innerHTML='<span>Ordenar por</span><select id="ed-sort"><option value="date">Data da prova</option><option value="institution">Instituição</option><option value="status">Status</option></select>';
      const list=document.createElement('button');
      list.className='ed-list-button';list.type='button';list.title='Visualização em lista';list.textContent='☷';
      filters.append(wrap,list);
      q('#ed-sort',wrap)?.addEventListener('change',()=>decorate(true));
    }

    const list=q('#exam-list',own);
    if(list && !q('.ed-add-row',own)){
      const add=document.createElement('button');
      add.className='ed-add-row';add.type='button';
      add.innerHTML='<span class="ed-add-plus">+</span><span><b>Adicionar nova prova</b><small>Inclua um novo edital ou concurso para acompanhar.</small></span>';
      add.addEventListener('click',fireNew);
      list.insertAdjacentElement('afterend',add);
    }
    decorate(false);
  }

  function decorate(sort){
    const list=q('#exam-list'); if(!list) return;
    qa('.exam-card',list).forEach(card=>{
      if(card.dataset.edApproved) return;
      card.dataset.edApproved='1';
      const h=q('.exam-card-title h3',card);
      if(h && !/Residência Médica/i.test(h.textContent) && h.textContent.trim()) h.textContent=h.textContent.trim();
      const primary=qa('.exam-card-actions a,.exam-card-actions button',card).find(el=>/edital/i.test(el.textContent||''));
      if(primary) primary.classList.add('ed-primary-action');
    });
    if(sort){
      const mode=q('#ed-sort')?.value;
      const cards=qa('.exam-card',list);
      const key=card=>{
        if(mode==='institution') return (q('.exam-card-title h3',card)?.textContent||'').toLowerCase();
        if(mode==='status') return (q('.exam-status-badge',card)?.textContent||'').toLowerCase();
        const texts=qa('.exam-card-info strong',card).map(x=>x.textContent.trim());
        const date=texts.find(t=>/\d{2}\/\d{2}\/\d{4}/.test(t))||'99/99/9999';
        const m=date.match(/(\d{2})\/(\d{2})\/(\d{4})/); return m?m[3]+m[2]+m[1]:date;
      };
      cards.sort((a,b)=>key(a).localeCompare(key(b),'pt-BR')).forEach(c=>list.appendChild(c));
    }
  }

  function observe(){
    const list=q('#exam-list');
    if(list) new MutationObserver(()=>decorate(false)).observe(list,{childList:true,subtree:true});
  }

  function start(){ build(); observe(); setTimeout(build,250); setTimeout(()=>decorate(false),800); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
  window.addEventListener('docmap:ready',()=>{build();observe();},{once:true});
})();
