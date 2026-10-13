"use strict";
/* Audita HTML e apostilas compactadas em content.json, sem alterar arquivos. */
const fs=require("node:fs"),path=require("node:path");
const dir=path.resolve(__dirname,"..","apostilas");
const dirs=fs.readdirSync(dir,{withFileTypes:true})
  .filter(item=>item.isDirectory() && fs.existsSync(path.join(dir,item.name,"index.html")))
  .map(item=>path.join(dir,item.name)).sort();
const flat=value=>typeof value==="string"?[value]:Array.isArray(value)?value.flatMap(flat):
  value&&typeof value==="object"?Object.values(value).flatMap(flat):[];
const strip=value=>String(value).replace(/<style\b[\s\S]*?<\/style>/gi,"")
  .replace(/<script\b[\s\S]*?<\/script>/gi,"")
  .replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/g," ")
  .replace(/\s+/g," ").trim();
const metrics=dirs.map(folder=>{
  const html=fs.readFileSync(path.join(folder,"index.html"),"utf8");
  const jsonFile=path.join(folder,"content.json");
  const data=fs.existsSync(jsonFile)?JSON.parse(fs.readFileSync(jsonFile,"utf8")):null;
  const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]||html;
  const source=data?flat(data.q||[]).join(" "):article;
  const text=strip(source);
  const headings=data?(data.o||[]).length:(article.match(/<h[23]\b/gi)||[]).length;
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const links=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>{
    try{return decodeURIComponent(m[1]);}catch{return m[1];}
  });
  const warnings=[];
  // Triagem apenas: conteúdo pode incluir resumos/elementos não didáticos; não certifica 60K.
  if(text.length<60000)warnings.push("conteudo_abaixo_60k_triagem");
  if(headings<8)warnings.push("poucos_titulos");
  if(!/reference-list/.test(source))warnings.push("referencias_nao_padronizadas");
  if(!/(caso|vinheta|fixa[cç]|quest[aã]o)/i.test(text))warnings.push("sem_casos_explicitos");
  if(!/(complica[cç]|seguimento|recorr[eê]ncia)/i.test(text))warnings.push("complicacoes_e_seguimento");
  if(!data&&!html.includes("apostila-luria-book.css"))warnings.push("css_legado");
  for(const link of links)if(!ids.has(link))warnings.push("ancora_ausente:"+link);
  return {apostila:path.basename(folder),format:data?"content-json":"html",
    htmlBytes:Buffer.byteLength(html)+(data?fs.statSync(jsonFile).size:0),
    contentChars:text.length,heads:headings,
    images:(source.match(/<img\b/gi)||[]).length,
    tables:(source.match(/<table\b/gi)||[]).length,warnings};
});
const totals={apostilas:metrics.length,htmlBytes:metrics.reduce((n,r)=>n+r.htmlBytes,0),
  withWarnings:metrics.filter(x=>x.warnings.length).length,
  sharedCss:metrics.filter(x=>x.format==="content-json"||!x.warnings.includes("css_legado")).length};
if(process.argv.includes("--json"))console.log(JSON.stringify({totals,metrics},null,2));
else{
  console.log("Auditoria LURIA em lote",totals);
  for(const item of metrics)console.log(item.apostila.padEnd(50),String(item.contentChars).padStart(7),
    item.format,item.warnings.length?item.warnings.join(", "):"sem alertas");
  console.log("Mínimo editorial vigente: 60.000 caracteres úteis por caderno. As métricas são triagem e não certificam qualidade médica ou ausência de repetição.");
}