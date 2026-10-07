(()=>{"use strict";
const body=document.body,source=body.dataset.apostilaContent;if(!source)return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const loadScript=src=>new Promise((ok,no)=>{const e=document.createElement("script");e.src=src;e.onload=ok;e.onerror=no;document.body.appendChild(e)});
const block=b=>{
  const k=b[0];
  if(k==="p")return"<p>"+b[1]+"</p>";
  if(k==="2"||k==="3"||k==="4")return"<h"+k+">"+b[1]+"</h"+k+">";
  if(k==="u"||k==="o"){const tag=k==="u"?"ul":"ol",cl=b[2]?' class="'+b[2]+'"':"";return"<"+tag+cl+">"+b[1].map(x=>"<li>"+x+"</li>").join("")+"</"+tag+">"}
  if(k==="t"){const cl=b[3]||"book-table";return'<table class="'+cl+'">'+(b[1]?.length?"<thead><tr>"+b[1].map(x=>"<th>"+x+"</th>").join("")+"</tr></thead>":"")+(b[2]?.length?"<tbody>"+b[2].map(r=>"<tr>"+r.map(x=>"<td>"+x+"</td>").join("")+"</tr>").join("")+"</tbody>":"")+"</table>"}
  return b[1]||"";
};
const article=data=>{
  if(data.article_html)return data.article_html;
  const h=data.h||[], heroClass=h[4]?" "+h[4]:"";
  let out='<section class="book-hero'+heroClass+'" aria-label="Identificação da apostila"><span class="book-badge">'+(h[0]||"Apostila LURIA")+"</span><h1>"+(h[1]||data.t||"")+"</h1><p>"+(h[2]||"")+'</p><div class="book-meta-row">'+(h[3]||[]).map(x=>"<span>"+x+"</span>").join("")+"</div></section>";
  for(const s of data.q||[]){out+='<section id="'+s[0]+'" class="book-section'+(s[1]?" "+s[1]:"")+'">'+(s[2]||[]).map(block).join("")+"</section>"}
  return out;
};
const outline=data=>data.outline_html||((data.o||[]).map(x=>'<a class="book-outline-link" href="#'+x[0]+'">'+x[1]+"</a>").join(""));
const bind=()=>{
 const links=[...document.querySelectorAll(".book-outline-link")],targets=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
 links.forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"",a.getAttribute("href"))}));
 if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>{const v=es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!v)return;links.forEach(a=>a.classList.toggle("is-active",a.getAttribute("href")==="#"+v.target.id))},{rootMargin:"-18% 0px -68% 0px",threshold:[0,.05,.2]});targets.forEach(t=>io.observe(t))}
 document.addEventListener("click",e=>{const b=e.target.closest(".fixation-toggle");if(!b)return;const a=b.closest(".fixation-item")?.querySelector(".fixation-answer");if(!a)return;const show=a.hidden;a.hidden=!show;b.textContent=show?"Ocultar resposta":"Mostrar resposta";b.setAttribute("aria-expanded",String(show))});
};
fetch(source,{credentials:"same-origin"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(async d=>{
 document.title=(d.t||d.title)+" · LURIA";
 const p=d.p||d.pageTitle||d.t||d.title;
 document.getElementById("apostila-root").innerHTML='<div class="app-shell"><aside id="sidebar" class="sidebar"></aside><div id="sidebar-backdrop" class="sidebar-backdrop"></div><main class="main"><div class="page"><header class="topbar"><button id="menu-open" class="menu-open" type="button" aria-label="Abrir menu">☰</button><div class="page-heading"><span class="eyebrow">Apostila LURIA</span><h1>'+esc(p)+'</h1></div></header><section class="book-page"><aside class="book-outline" aria-label="Estrutura da apostila"><a class="book-outline-back" href="/apostilas/"><span aria-hidden="true">←</span> Voltar</a><div class="book-outline-head"><small>Apostila atual</small><strong>Estrutura do conteúdo</strong></div><nav class="book-outline-nav">'+outline(d)+'</nav></aside><article class="book-main">'+article(d)+"</article></section></div></main></div>";
 bind();
 for(const src of ["/assets/js/luria-brand-v5.js?v=12","/assets/vendor/supabase-2.110.6.js","/assets/js/supabase.js?v=auth4","/assets/js/app.js?v=20261004-global-shell-v74","/assets/js/pwa.js?v=6-apostilas-library-fix","/assets/js/apostila-tools.js?v=10-semantic-json"])await loadScript(src);
}).catch(err=>{document.getElementById("apostila-root").innerHTML='<main class="main"><div class="page"><section class="book-section"><h2>Apostila indisponível no momento</h2><p>Não foi possível carregar o conteúdo. Atualize a página para tentar novamente.</p></section></div></main>';console.error("[LURIA apostila renderer]",err)});
})();