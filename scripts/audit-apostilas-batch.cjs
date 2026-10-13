"use strict";
/* Auditoria editorial: toda a biblioteca numa execução, sem alterar os arquivos. */
const fs = require("node:fs"), path = require("node:path");
const dir = path.resolve(__dirname, "..", "apostilas");
const paths = fs.readdirSync(dir,{withFileTypes:true})
  .filter(item=>item.isDirectory() && fs.existsSync(path.join(dir,item.name,"index.html")))
  .map(item=>path.join(dir,item.name,"index.html")).sort();
const metrics = paths.map(file=>{
  const html=fs.readFileSync(file,"utf8");
  const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]||html;
  const text=article.replace(/<style\b[\s\S]*?<\/style>/gi,"").replace(/<script\b[\s\S]*?<\/script>/gi,"")
    .replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/g," ")
    .replace(/\s+/g," ").trim();
  const headingCount=(article.match(/<h[23]\b/gi)||[]).length;
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const links=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
  const warnings=[];
  if(text.length<35000)warnings.push("aprofundamento_insuficiente_a_auditar");
  if(headingCount<8)warnings.push("poucos_titulos");
  if(!/reference-list/.test(article))warnings.push("referencias_nao_padronizadas");
  if(!/(caso|vinheta|fixa[cç]|quest[aã]o)/i.test(text))warnings.push("sem_casos_explicitos");
  if(!/(complica[cç]|seguimento|recorr[eê]ncia)/i.test(text))warnings.push("complicacoes_e_seguimento");
  if(!html.includes("apostila-luria-book.css"))warnings.push("css_antigo");
  for(const link of links)if(!ids.includes(link))warnings.push("ancora_ausente:"+link);
  return {apostila:path.basename(path.dirname(file)),htmlBytes:Buffer.byteLength(html),
    contentChars:text.length,heads:headingCount,images:(article.match(/<img\b/gi)||[]).length,
    tables:(article.match(/<table\b/gi)||[]).length,warnings};
});
const totals={apostilas:metrics.length,htmlBytes:metrics.reduce((n,r)=>n+r.htmlBytes,0),
  withWarnings:metrics.filter(x=>x.warnings.length>0).length,sharedCss:metrics.filter(x=>!x.warnings.includes("css_antigo")).length};
if(process.argv.includes("--json"))console.log(JSON.stringify({totals,metrics},null,2));
else {
  console.log("Auditoria LURIA em lote",totals);
  for(const item of metrics)console.log(item.apostila.padEnd(50),String(item.contentChars).padStart(7),
    "chars",item.warnings.length?item.warnings.join(", "):"sem alertas");
  console.log("ALERTA: métricas são sinais de revisão, não certificação de qualidade médica.");
}
