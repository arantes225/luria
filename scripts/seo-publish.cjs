'use strict';
const fs=require('node:fs');
const path=require('node:path');

const BRAND_ORIGIN='https://traubemedicina.com.br';
const BOOK_PAGE=/^apostilas\/[a-z0-9-]+\/index\.html$/;
const PRIVATE_AREA=/^(?:admin|dashboard|login|cadastro|configuracoes|estatisticas|amigos|conta|trabalho)(?:\/|\.html$)/;

function escapeAttribute(value) {
  return String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function shorten(value,limit=158) {
  const clean=String(value||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  if(clean.length<=limit)return clean;
  const prefix=clean.slice(0,limit+1);
  const lastSpace=prefix.lastIndexOf(' ');
  return (lastSpace>=limit*0.65?prefix.slice(0,lastSpace):prefix.slice(0,limit)).trim().replace(/[,.\s;:-]+$/,'')+'.';
}
function meta(name,content,property=false){
  return '  <meta '+(property?'property':'name')+'="'+name+'" content="'+escapeAttribute(content)+'">\n';
}
function replaceOrAddMeta(html,name,value,property=false){
  const attr=property?'property':'name';
  const expr=new RegExp("<meta\\s+"+attr+"=[\"']"+name+"[\"'][^>]*>","i");
  if(expr.test(html))return html.replace(expr,meta(name,value,property).trim());
  return html.replace(/<\/head>/i,meta(name,value,property)+'</head>');
}
function addNoindex(html){
  if(/<meta\s+name=["']robots["']/i.test(html))
    return replaceOrAddMeta(html,'robots','noindex, nofollow, noarchive');
  return html.replace(/<\/head>/i,meta('robots','noindex, nofollow, noarchive')+'</head>');
}
// Visible HTML fallback for humans without JavaScript and for crawlers before rendering.
// Once the reader loads, its existing code replaces #apostila-root with the full book.
function bookFallback(book,title,description){
  const outline=Array.isArray(book.o)?book.o.slice(0,12):[];
  const chapterNames=outline
    .filter(x=>Array.isArray(x)&&typeof x[1]==='string')
    .map(x=>'<li>'+escapeAttribute(shorten(x[1],115))+'</li>').join('');
  const sections=Array.isArray(book.q)?book.q:[];
  const firstParagraph=sections
    .flatMap(x=>Array.isArray(x)&&Array.isArray(x[2])?x[2]:[])
    .find(x=>Array.isArray(x)&&x[0]==='p'&&typeof x[1]==='string'&&x[1].trim().length>90);
  const introduction=firstParagraph?shorten(firstParagraph[1],420):'';
  return '<main class="main"><div class="page"><article class="book-page">'
    +'<section class="book-hero" aria-label="Apresentação da apostila">'
    +'<span class="book-badge">Apostila TRAUBE</span>'
    +'<h1>'+escapeAttribute(title)+'</h1><p>'+escapeAttribute(description)+'</p>'
    +'</section>'
    +(introduction?'<section class="book-section"><h2>Introdução</h2><p>'+escapeAttribute(introduction)+'</p></section>':'')
    +(chapterNames?'<section class="book-section"><h2>Conteúdo desta apostila</h2><ul>'+chapterNames+'</ul></section>':'')
    +'<p><a href="/apostilas/">Ver biblioteca de apostilas TRAUBE</a></p>'
    +'</article></div></main>';
}
function publishSeo(html,filename,root){
  const normalized=filename.replace(/\\/g,'/');
  if(!/<\/head>/i.test(html))return html;
  if(PRIVATE_AREA.test(normalized))return addNoindex(html);
  if(!BOOK_PAGE.test(normalized))return html;

  let book;
  try{book=JSON.parse(fs.readFileSync(path.join(root,path.posix.dirname(normalized),'content.json'),'utf8'));}
  catch{return html;}
  if(!book || typeof book.t!=='string' || !book.t.trim())return html;
  const title=shorten(book.t,90);
  const description=shorten(book.p||book.d||('Apostila de medicina sobre '+title+' na plataforma TRAUBE.'),158);
  const url=BRAND_ORIGIN+'/'+path.posix.dirname(normalized)+'/';
  // This content is real and visible until the dynamic reader replaces it.
  // It must not be hidden or written only for a specific crawler user-agent.
  const fallback=bookFallback(book,title,description);
  html=html.replace(/(<div\s+id=["']apostila-root["']\s*>)(\s*)(<\/div>)/i,
    (_match,open,_space,close)=>open+fallback+close);
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>'+escapeAttribute(title)+' | Apostila de Medicina · TRAUBE</title>');
  html=replaceOrAddMeta(html,'description',description);
  html=replaceOrAddMeta(html,'robots','index, follow, max-image-preview:large');
  const canonical='<link rel="canonical" href="'+url+'">';
  if(/<link\s+rel=["']canonical["'][^>]*>/i.test(html))
    html=html.replace(/<link\s+rel=["']canonical["'][^>]*>/i,canonical);
  else html=html.replace(/<\/head>/i,'  '+canonical+'\n</head>');
  for(const [name,value] of Object.entries({
    'og:type':'article','og:locale':'pt_BR','og:site_name':'TRAUBE',
    'og:title':title+' | Apostila de Medicina · TRAUBE',
    'og:description':description,'og:url':url
  }))html=replaceOrAddMeta(html,name,value,true);
  const structured={
    '@context':'https://schema.org','@type':'LearningResource',
    'name':title,'description':description,'url':url,'inLanguage':'pt-BR',
    'learningResourceType':'Apostila',
    'publisher':{'@id':BRAND_ORIGIN+'/#organizacao'}
  };
  const safeJSON=JSON.stringify(structured).replace(/</g,'\\u003c');
  html=html.replace(/<\/head>/i,'  <script type="application/ld+json">'+safeJSON+'</script>\n</head>');
  return html;
}
module.exports={publishSeo,shorten,escapeAttribute,BRAND_ORIGIN};
