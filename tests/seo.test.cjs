'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const {buildSitemap,ORIGIN}=require('../scripts/generate-sitemap.cjs');

test('landing has canonical, relevant metadata, social sharing and valid schema',()=>{
 const html=read('index.html');
 assert.match(html,/<link rel="canonical" href="https:\/\/traubemedicina\.com\.br\/"/);
 for(const marker of ['name="description"','property="og:title"','property="og:description"','property="og:image"','name="twitter:card"','application/ld+json'])assert.ok(html.includes(marker),marker);
 const schema=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(schema,'Structured data must be present');
 const json=JSON.parse(schema[1]);
 assert.equal(json['@context'],'https://schema.org');
 assert.ok(json['@graph'].some(e=>e['@type']==='WebSite'));
});
test('robots exposes sitemap without blocking Google from reading noindex headers',()=>{
 const robots=read('robots.txt');
 assert.match(robots,/Sitemap: https:\/\/traubemedicina\.com\.br\/sitemap\.xml/);
 assert.doesNotMatch(robots,/Disallow:\s*\//);
});
test('static sitemap includes only known public URLs',()=>{
 const xml=read('sitemap.xml');
 assert.ok(xml.includes(ORIGIN+'/'));
 assert.doesNotMatch(xml,/<loc>[^<]*(?:\/admin\/|\/dashboard\/|\/login\/|\/trabalho\/)/);
});
test('generated sitemap includes real books, excludes internal app routes',()=>{
 const xml=buildSitemap(root,[
   'index.html',
   'apostilas/asma/index.html',
   'apostilas/diabetes-mellitus/index.html',
   'admin/index.html',
   'dashboard/index.html'
 ]);
 assert.match(xml,/https:\/\/traubemedicina\.com\.br\/apostilas\/asma\//);
 assert.doesNotMatch(xml,/https:\/\/traubemedicina\.com\.br\/admin\//);
});
test('private pages have noindex and public hubs have descriptions',()=>{
 for(const p of ['admin/index.html','dashboard/index.html','login/index.html'])assert.match(read(p),/<meta name="robots" content="noindex, nofollow, noarchive">/,p);
 for(const p of ['aprender/index.html','apostilas/index.html','aprender/anatomia/index.html'])assert.match(read(p),/<meta name="description" content="[^"]+">/,p);
});
