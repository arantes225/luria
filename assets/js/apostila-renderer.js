(()=>{"use strict";
const body=document.body;
const source=body.dataset.apostilaContent;
const slug=body.dataset.apostilaSlug||"apostila";
if(!source)return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const loadScript=src=>new Promise((resolve,reject)=>{const el=document.createElement("script");el.src=src;el.onload=resolve;el.onerror=reject;document.body.appendChild(el)});
const bindLocalTools=()=>{
  const links=[...document.querySelectorAll(".book-outline-link")];
  const targets=links.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
  links.forEach(link=>link.addEventListener("click",event=>{const target=document.querySelector(link.getAttribute("href"));if(!target)return;event.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"",link.getAttribute("href"))}));
  if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;links.forEach(link=>link.classList.toggle("is-active",link.getAttribute("href")==="#"+visible.target.id))},{root:null,rootMargin:"-18% 0px -68% 0px",threshold:[0,.05,.2]});targets.forEach(t=>observer.observe(t))}
  document.addEventListener("click",event=>{const button=event.target.closest(".fixation-toggle");if(!button)return;const item=button.closest(".fixation-item");const answer=item?.querySelector(".fixation-answer");if(!answer)return;const show=answer.hidden;answer.hidden=!show;button.textContent=show?"Ocultar resposta":"Mostrar resposta";button.setAttribute("aria-expanded",String(show))});
};
fetch(source,{credentials:"same-origin"}).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(async data=>{
  document.title=data.title+" · LURIA";
  const root=document.getElementById("apostila-root");
  root.innerHTML='<div class="app-shell"><aside id="sidebar" class="sidebar"></aside><div id="sidebar-backdrop" class="sidebar-backdrop"></div><main class="main"><div class="page"><header class="topbar"><button id="menu-open" class="menu-open" type="button" aria-label="Abrir menu">☰</button><div class="page-heading"><span class="eyebrow">Apostila LURIA</span><h1>'+esc(data.pageTitle)+'</h1></div></header><section class="book-page"><aside class="book-outline" aria-label="Estrutura da apostila"><a class="book-outline-back" href="/apostilas/"><span aria-hidden="true">←</span> Voltar</a><div class="book-outline-head"><small>Apostila atual</small><strong>Estrutura do conteúdo</strong></div><nav class="book-outline-nav">'+data.outline_html+'</nav></aside><article class="book-main">'+data.article_html+'</article></section></div></main></div>';
  bindLocalTools();
  await loadScript("/assets/js/luria-brand-v5.js?v=12");
  await loadScript("/assets/vendor/supabase-2.110.6.js");
  await loadScript("/assets/js/supabase.js?v=auth4");
  await loadScript("/assets/js/app.js?v=20261004-global-shell-v74");
  await loadScript("/assets/js/pwa.js?v=6-apostilas-library-fix");
  await loadScript("/assets/js/apostila-tools.js?v=9-json-renderer");
}).catch(err=>{
  const root=document.getElementById("apostila-root");
  root.innerHTML='<main class="main"><div class="page"><section class="book-section"><h2>Apostila indisponível no momento</h2><p>Não foi possível carregar o conteúdo. Atualize a página para tentar novamente.</p></section></div></main>';
  console.error("[LURIA apostila renderer]",err);
});
})();