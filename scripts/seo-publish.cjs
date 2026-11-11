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
  const expr=new RegExp('<meta\\s+'+attr+'=["\\']'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'["\\'][^>]*>','i');
  if(expr.test(html))return html.replace(expr,meta(name,value,property).trim());
  return html.replace(/<\/head>/i,meta(name,value,property)+'</head>');
}
function addNoindex(html){
  if(/<meta\s+name=["']robots["']/i.test(html))
    return replaceOrAddMeta(html,'robots','noindex, nofollow, noarchive');
  return html.replace(/<\/head>/i,meta('robots','noindex, nofollow, noarchive')+'</head>');
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
