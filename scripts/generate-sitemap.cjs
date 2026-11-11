'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {publicFiles}=require('./public-files.cjs');

const ORIGIN='https://traubemedicina.com.br';
const evergreen=['/','/sobre/','/privacidade/','/aprender/','/apostilas/','/aprender/anatomia/'];
const bookPattern=/^apostilas\/[a-z0-9-]+\/index\.html$/;

function buildSitemap(root, files=publicFiles(root)){
  const entries=new Set(evergreen);
  for(const file of files){
    if(!bookPattern.test(file))continue;
    const content=path.join(root,path.dirname(file),'content.json');
    if(!fs.existsSync(content)||!fs.statSync(content).isFile())continue;
    entries.add('/'+path.dirname(file)+'/');
  }
  const urls=[...entries].sort((a,b)=>a==='/'?-1:b==='/'?1:a.localeCompare(b,'pt-BR'));
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    +'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    +urls.map(url=>'  <url><loc>'+ORIGIN+url+'</loc></url>').join('\n')
    +'\n</urlset>\n';
}
function writeSitemap(root,output,files){
  fs.mkdirSync(output,{recursive:true});
  const xml=buildSitemap(root,files);
  fs.writeFileSync(path.join(output,'sitemap.xml'),xml,'utf8');
  return (xml.match(/<loc>/g)||[]).length;
}
if(require.main===module){
  const root=path.resolve(__dirname,'..');
  const output=path.resolve(process.argv[2]||root);
  const count=writeSitemap(root,output);
  console.log('Sitemap SEO: '+count+' URLs publicas em '+output);
}
module.exports={buildSitemap,writeSitemap,ORIGIN};
