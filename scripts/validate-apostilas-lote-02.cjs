#!/usr/bin/env node
"use strict";
/**
 * LURIA — somente pré-validação, sem modificar arquivos, páginas, catálogo ou Admin.
 *
 * Uso:
 *   node scripts/validate-apostilas-lote-02.cjs
 *   node scripts/validate-apostilas-lote-02.cjs --json
 *
 * Dependência: scripts/build-apostilas-batch.cjs (buildBook) e
 * apostilas/vulvovaginites/index.html (template de produção).
 *
 * A aprovação clínica, o benchmarking adulto da PAC e o licenciamento das
 * imagens são procedimentos humanos separados e não são certificados aqui.
 */
const fs = require("node:fs");
const path = require("node:path");
const {buildBook, imageQueueFor} = require("./build-apostilas-batch.cjs");
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root,"apostilas","lotes","LOTE_02_INPUT_PREPUBLICACAO.json");
const templatePath = path.join(root,"apostilas","vulvovaginites","index.html");
const MIN = 60000;
const input = JSON.parse(fs.readFileSync(inputPath,"utf8"));
const template = fs.readFileSync(templatePath,"utf8");
if (!template.includes("apostila-luria-book.css")) {
  console.error("Template sem CSS compartilhado esperado.");
  process.exit(1);
}
const books = input.books;
if (!Array.isArray(books)||books.length!==5)throw Error("Esperados cinco livros.");
const slugs=new Set();
const results=[];
let hasFailure=false;
for (const book of books) {
  const issues=[];
  try {
    if(slugs.has(book.slug))issues.push("slug_duplicado");
    slugs.add(book.slug);
    const dest=path.join(root,"apostilas",book.slug,"index.html");
    if(fs.existsSync(dest))issues.push("pagina_existente_nao_sobrescrever");
    if(!Array.isArray(book.images)||book.images.length)issues.push("imagens_ainda_nao_aprovadas");
    const result=buildBook(template,book);
    const html=result.html;
    const sections=book.sections||[];
    const ids=new Set(sections.map(s=>s.id));
    if(ids.size!==sections.length)issues.push("ids_de_capitulo_repetidos");
    for(const s of sections) {
      const b=String(s.body_html||"");
      if((b.match(/<table\b/gi)||[]).length!==(b.match(/<\/table>/gi)||[]).length)
        issues.push("tabela_html_desbalanceada:"+s.id);
      if((b.match(/<tbody\b/gi)||[]).length!==(b.match(/<\/tbody>/gi)||[]).length)
        issues.push("tbody_html_desbalanceado:"+s.id);
      if(!b.trim())issues.push("capitulo_vazio:"+s.id);
    }

    // Casos e questões devem aparecer somente nas suas seções finais,
    // numerados a partir de 1, sem lacunas, repetições nem introdução perdida.
    const caseChapters=sections.filter(s=>/^Casos clínicos comentados$/i.test(s.title));
    const questionChapters=sections.filter(s=>/^Questões autorais comentadas$/i.test(s.title));
    if(caseChapters.length!==1)issues.push("capitulo_de_casos_ausente_ou_duplicado");
    if(questionChapters.length!==1)issues.push("capitulo_de_questoes_ausente_ou_duplicado");
    const numbered=(body,kind)=>[...body.matchAll(new RegExp("<h[34]>"+kind+" (\\d+)\\b","g"))].map(x=>Number(x[1]));
    const isSequence=ns=>ns.length>0&&ns.every((n,i)=>n===i+1);
    if(caseChapters.length===1){
      const ns=numbered(caseChapters[0].body_html,"Caso");
      if(!isSequence(ns)||ns.length<4)issues.push("casos_sem_numeracao_continua");
    }
    if(questionChapters.length===1){
      const ns=numbered(questionChapters[0].body_html,"Questão");
      if(!isSequence(ns)||ns.length<6)issues.push("questoes_sem_numeracao_continua");
    }
    for(const s of sections){
      if(s===caseChapters[0]||s===questionChapters[0])continue;
      if(/<h[34]>(?:Caso|Questão) \d+\b/.test(s.body_html)
          || /<p><strong>(?:Caso|Questão) [12]\.<\/strong>/.test(s.body_html))
        issues.push("caso_ou_questao_fora_do_capitulo_final:"+s.id);
    }

    if(result.characters<MIN)issues.push("abaixo_60k_triagem");
    if(imageQueueFor(book).length)issues.push("imagem_requer_revisao_admin");
    results.push({slug:book.slug,sections:sections.length,
      visibleChars:result.characters,renderedHtmlChars:html.length,
      tables:sections.reduce((n,s)=>n+(s.body_html.match(/<table\b/gi)||[]).length,0),
      issues});
  }catch(error) {
    results.push({slug:book.slug,issues:[...issues,"validacao:"+String(error.message||error)]});
  }
}
hasFailure=results.some(r=>r.issues.length);
if(process.argv.includes("--json")) {
  console.log(JSON.stringify({status:hasFailure?"FALHA":"PRE_FLIGHT_TECNICO_OK",
    note:"Triagem técnica; não certifica qualidade, doses, imagens ou licença.",results},null,2));
}else{
  console.log("LURIA lote 02 — pré-validação somente leitura");
  for(const r of results)console.log(r.slug,r.visibleChars??"-","chars",r.sections??"-",
    "capítulos",r.issues.length?"PENDÊNCIAS: "+r.issues.join(", "):"triagem técnica OK");
  console.log("Certificação médica: NÃO. Publicação ou deploy: NÃO.");
}
if(hasFailure)process.exitCode=1;
