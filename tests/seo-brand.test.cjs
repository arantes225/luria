'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const {publishSeo}=require('../scripts/seo-publish.cjs');
const {buildSitemap}=require('../scripts/generate-sitemap.cjs');

test('TR AUBE is consistently identified as the education brand',()=>{
 const home=read('index.html');
 assert.match(home,/<title>TRAUBE \| Plataforma de Estudos/);
 assert.match(home,/<h1>TRAUBE\./);
 assert.match(home,/<a href="\/sobre\/">Sobre a TRAUBE<\/a>/);
 for(const href of ['/apostilas/','/aprender/anatomia/','/aprender/'])assert.ok(home.includes('href="'+href+'"'),href);
 const raw=home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(raw);
 const obj=JSON.parse(raw[1]);
 const site=obj['@graph'].find(entry=>entry['@type']==='WebSite');
 const software=obj['@graph'].find(entry=>entry['@type']==='SoftwareApplication');
 assert.equal(site.name,'TRAUBE');
 assert.equal(site.alternateName,'Traube Medicina');
 assert.equal(software.applicationCategory,'EducationalApplication');
});
test('public About page has distinct content and is in sitemap',()=>{
 const about=read('sobre/index.html');
 assert.match(about,/<h1>TRAUBE: uma plataforma de estudos/);
 assert.match(about,/<link rel="canonical" href="https:\/\/traubemedicina\.com\.br\/sobre\/">/);
 assert.match(about,/Por que o nome TRAUBE\?/);
 const sitemap=buildSitemap(root,['index.html','sobre/index.html']);
 assert.match(sitemap,/<loc>https:\/\/traubemedicina\.com\.br\/sobre\/<\/loc>/);
 assert.match(read('sitemap.xml'),/https:\/\/traubemedicina\.com\.br\/sobre\//);
});
test('book HTML gets unique metadata without changing book renderer',()=>{
 const source=read('apostilas/asma/index.html');
 const result=publishSeo(source,'apostilas/asma/index.html',root);
 assert.match(result,/<title>Asma \| Apostila de Medicina · TRAUBE<\/title>/);
 assert.match(result,/<meta name="description" content="[^"]+"/);
 assert.match(result,/<link rel="canonical" href="https:\/\/traubemedicina\.com\.br\/apostilas\/asma\/"/);
 assert.match(result,/<meta property="og:title"/);
 assert.match(result,/id="apostila-root"/);
 const raw=result.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(raw);
 const schema=JSON.parse(raw[1]);
 assert.equal(schema['@type'],'LearningResource');
 assert.equal(schema.name,'Asma');
});
test('bot receives meaningful initial HTML even before JavaScript loads',()=>{
 const source=read('apostilas/asma/index.html');
 const output=publishSeo(source,'apostilas/asma/index.html',root);
 assert.match(output,/<div id="apostila-root"><main class="main">/);
 assert.match(output,/<h1>Asma<\/h1>/);
 assert.match(output,/Conteúdo desta apostila/);
 assert.match(output,/Fundamentos e fisiopatologia/);
 assert.match(output,/<a href="apostilas\/">Ver biblioteca de apostilas TRAUBE<\/a>/);
 assert.equal((output.match(/<link rel="canonical"/g)||[]).length,1);
 assert.doesNotMatch(output,/id="apostila-root"[^>]*hidden/);
 const script=read('assets/js/apostila-renderer.js');
 assert.match(script,/document\.title=\(d\.t\|\|d\.title\)\+" \| Apostila de Medicina · TRAUBE"/);
 assert.match(script,/root\.insertAdjacentHTML\("afterbegin",notice\)/);
});
test('private app areas are noindex even on static hosts without _headers support',()=>{
 for(const p of ['admin/index.html','trabalho/ecg/index.html','dashboard/index.html','login/index.html']){
   const out=publishSeo('<!doctype html><head><title>A</title></head><body></body>',p,root);
   assert.match(out,/noindex, nofollow, noarchive/,p);
 }
 const out=publishSeo('<head><title>Home</title></head>','index.html',root);
 assert.doesNotMatch(out,/noindex/);
});
test('sitemap does not list personal applications',()=>{
 const xml=buildSitemap(root,['sobre/index.html','admin/index.html','dashboard/index.html','trabalho/ecg/index.html','apostilas/asma/index.html']);
 assert.doesNotMatch(xml,/<loc>[^<]*(?:\/admin\/|\/dashboard\/|\/trabalho\/)/);
 assert.match(xml,/<loc>https:\/\/traubemedicina\.com\.br\/apostilas\/asma\/<\/loc>/);
});
