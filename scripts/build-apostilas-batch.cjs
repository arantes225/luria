"use strict";
/**
 * Publicação editorial em lote, a partir de conteúdo revisado em JSON.
 * Uso:
 *   node scripts/build-apostilas-batch.cjs --input ./lote.json --dry-run
 *   node scripts/build-apostilas-batch.cjs --input ./lote.json [--overwrite]
 * NUNCA inclui imagens candidatas no HTML: exporta as solicitações para o Admin.
 */
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const args=process.argv.slice(2);
const arg=name=>{const i=args.indexOf(name);return i>=0?args[i+1]:null;};
const source=arg("--input");
const dryRun=args.includes("--dry-run");
const overwrite=args.includes("--overwrite");
const dest=path.join(root,"apostilas");
const templatePath=path.join(dest,"vulvovaginites","index.html");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function validateHtml(content,slug,section){
  if(!content||typeof content!=="string")throw Error(slug+"/"+section+": conteúdo vazio");
  if(/<\s*(?:script|style|img|iframe|object|embed|form|link|meta|base)\b/i.test(content))
    throw Error(slug+"/"+section+": não incorporar scripts, estilos ou imagens; imagens vão ao Admin");
  if(/\bon[a-z]+\s*=|javascript:|data:text\/html/i.test(content))
    throw Error(slug+"/"+section+": atributo/URL potencialmente inseguro");
}
function buildBook(template,entry){
  const slug=String(entry.slug||"").trim();
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error("Slug inválido: "+slug);
  if(!String(entry.title||"").trim()||!String(entry.area||"").trim()||!String(entry.materia||"").trim())
    throw Error(slug+": falta título, área ou matéria");
  if(!Array.isArray(entry.sections)||entry.sections.length<7)
    throw Error(slug+": ao menos sete seções didáticas substantivas");
  if(!Array.isArray(entry.references)||entry.references.length<4)
    throw Error(slug+": pelo menos quatro referências rastreáveis");
  const sections=[],ids=new Set(),textParts=[];
  for(const [i,section]of entry.sections.entries()){
    const id=String(section.id||"");
    if(!/^[a-z][a-z0-9-]+$/.test(id)||ids.has(id)||id==="referencias")
      throw Error(slug+": seção com id inválido/duplicado: "+id);
    ids.add(id);
    validateHtml(section.body_html,slug,id);
    const title=String(section.title||"").trim();
    if(!title)throw Error(slug+"/"+id+": título ausente");
    textParts.push(section.body_html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim());
    sections.push('<section class="book-section" id="'+esc(id)+'"><h2>'+esc(title)+'</h2>'+
      section.body_html+'</section>');
  }
  // Bloqueia cópias literais de parágrafos longos; paráfrases redundantes ainda exigem revisão editorial.
  const seenParagraphs=new Set();
  for(const section of entry.sections){
    const matches=String(section.body_html).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi);
    for(const match of matches){
      const normalized=match[1].replace(/<[^>]+>/g," ").replace(/&(?:nbsp|amp|lt|gt|quot);/gi," ").replace(/\s+/g," ").trim().toLowerCase();
      if(normalized.length<180)continue;
      if(seenParagraphs.has(normalized))
        throw Error(slug+": parágrafo didático longo repetido em "+section.id+"; consolidar a explicação em vez de inflar a contagem");
      seenParagraphs.add(normalized);
    }
  }
  const visible=textParts.join(" ");
  if(visible.length<60000)
    throw Error(slug+": conteúdo insuficiente ("+visible.length+" caracteres úteis; mínimo editorial 60.000)");
  if(!/(caso cl[ií]nico|quest[aã]o comentada|caso integrador|vinheta cl[ií]nica)/i.test(visible))
    throw Error(slug+": incluir casos clínicos e respostas comentadas no conteúdo");
  const references=entry.references.map(ref=>{
    if(!ref||!/^https:\/\//.test(String(ref.url||""))||!String(ref.label||"").trim())
      throw Error(slug+": referência sem título e URL HTTPS");
    return '<li><a href="'+esc(ref.url)+'" rel="noopener noreferrer" target="_blank">'+esc(ref.label)+'</a></li>';
  });
  sections.push('<section id="referencias" class="book-section"><h2>Referências</h2><ol class="reference-list">'+references.join("")+'</ol></section>');
  const nav=entry.sections.map(section=>'<a class="book-outline-link" href="#'+esc(section.id)+'">'+esc(section.title)+'</a>').join("")+
    '<a class="book-outline-link" href="#referencias">Referências</a>';
  const intro='<section class="book-hero apostila-identity" aria-label="Identificação da apostila">'+
    '<span class="book-badge">Apostila TRAUBE</span><h1>'+esc(entry.title)+'</h1>'+
    '<p>'+esc(entry.description||"Material completo de estudo e preparação para residência médica")+'</p>'+
    '<div class="book-meta-row"><span>Área: '+esc(entry.area)+'</span><span>Matéria: '+esc(entry.materia)+
    '</span><span>Tema: '+esc(entry.title)+'</span></div></section>';
  let html=template;
  const edits=[
    [/<title>[\s\S]*?<\/title>/i,'<title>'+esc(entry.title)+' · TRAUBE</title>'],
    [/<link rel="canonical" href="[^"]+">/i,'<link rel="canonical" href="/apostilas/'+slug+'/">'],
    [/<nav class="book-outline-nav">[\s\S]*?<\/nav>/i,'<nav class="book-outline-nav">'+nav+'</nav>'],
    [/<article class="book-main">[\s\S]*?<\/article>/i,'<article class="book-main">'+intro+sections.join("\n")+'</article>'],
    [/(<div class="page-heading">[\s\S]*?<h1>)[\s\S]*?(<\/h1>)/i,'$1'+esc(entry.title)+'$2']
  ];
  for(const [regex,replacement]of edits){
    if(!regex.test(html))throw Error(slug+": estrutura-base não reconhecida: "+regex);
    html=html.replace(regex,replacement);
  }
  if(/<article\b[^>]*>[\s\S]*?<img\b/i.test(html))throw Error(slug+": imagem inserida sem aprovação");
  return {html,slug,characters:visible.length,sections:entry.sections.length};
}
function imageQueueFor(entry){
  return (entry.images||[]).map((img,i)=>{
    const key=String(img.candidate_key||"").trim();
    const target=String(img.target_section||"").trim();
    if(!/^[a-zA-Z0-9_.-]{3,100}$/.test(key)||!entry.sections.some(s=>s.id===target))
      throw Error(entry.slug+": candidata "+(i+1)+" tem chave ou seção inválida");
    const url=String(img.source_url||"");
    const src=String(img.src||"");
    if(!/^https:\/\//.test(url)||!(/^(https:\/\/|\/assets\/)/.test(src))
      ||!img.alt||!img.source_name||!img.source_license)
      throw Error(entry.slug+": candidata "+key+" precisa de fonte, licença e alt");
    return {
      apostila_path:"/apostilas/"+entry.slug+"/",
      apostila_title:entry.title,
      candidate_key:key,
      target_section:target,
      placement:img.placement||"after",
      proposed_asset:{src,alt:img.alt,title:img.title||img.alt,
        caption:img.caption||"",didactic_note:img.didactic_note||""},
      source_url:url,source_name:img.source_name,source_license:img.source_license,
      source_trust:"unverified",review_status:"pending"
    };
  });
}
function main(){
  if(!source){console.error("Informe --input caminho/lote.json");process.exitCode=2;return;}
  const raw=JSON.parse(fs.readFileSync(path.resolve(source),"utf8"));
  const books=Array.isArray(raw)?raw:raw.books;
  if(!Array.isArray(books)||!books.length||books.length>50)
    throw Error("Lote deve conter de 1 a 50 apostilas");
  const template=fs.readFileSync(templatePath,"utf8");
  if(!template.includes("apostila-luria-book.css"))throw Error("Template sem CSS editorial compartilhado");
  const built=[],images=[],used=new Set();
  for(const book of books){
    const result=buildBook(template,book);
    if(used.has(result.slug))throw Error("Slug repetido no lote: "+result.slug);
    used.add(result.slug);
    const filepath=path.join(dest,result.slug,"index.html");
    if(!overwrite&&fs.existsSync(filepath))throw Error(result.slug+": arquivo existente; --overwrite exige revisão explícita");
    built.push({...result,filepath});
    images.push(...imageQueueFor(book));
  }
  const candidateKeys=new Set();
  for(const item of images){
    const key=item.apostila_path+":"+item.candidate_key;
    if(candidateKeys.has(key))throw Error("Imagem candidata duplicada no lote: "+key);
    candidateKeys.add(key);
  }
  console.log("Lote validado:",built.length,"apostilas,",images.length,"imagens para Admin.");
  for(const item of built)console.log(item.slug,item.characters+" caracteres",item.sections+" capítulos");
  if(dryRun){console.log("Modo --dry-run: nenhum arquivo foi alterado.");return;}
  for(const item of built){
    fs.mkdirSync(path.dirname(item.filepath),{recursive:true});
    fs.writeFileSync(item.filepath,item.html,"utf8");
  }
  if(images.length){
    const output=path.join(dest,"_imagens-candidatas-ultimo-lote.json");
    fs.writeFileSync(output,JSON.stringify({images},null,2)+"\n","utf8");
    console.log("Importe no Admin:",path.relative(root,output));
  }
}
if(require.main===module)main();
module.exports={buildBook,imageQueueFor};
