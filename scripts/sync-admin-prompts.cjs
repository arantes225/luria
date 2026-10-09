const fs=require('node:fs'),path=require('node:path');
const prompts=require('../assets/js/question-factory-prompts.js');
const expected={generate:prompts.generation(),'perplexity-block':prompts.segment({},'perplexity_initial'),correction:prompts.segment({},'chatgpt_correction'),'chatgpt-final':prompts.segment({},'lot_chatgpt_final'),'perplexity-final':prompts.segment({},'lot_perplexity_final')};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
let drift=false;
for(const file of ['admin.html','admin/index.html']){
  const full=path.join(__dirname,'..',file);let html=fs.readFileSync(full,'utf8');
  for(const [key,text] of Object.entries(expected)){
    const start=`<pre id="qf-prompt-${key}" class="admin-qf-prompt">`;
    const a=html.indexOf(start),b=html.indexOf('</pre>',a);
    if(a<0||b<0)throw new Error('Prompt ausente: '+file+' '+key);
    const value=escape(text);
    if(html.slice(a+start.length,b)!==value){drift=true;console.log(file+': '+key+' divergente');html=html.slice(0,a+start.length)+value+html.slice(b);}
  }
  if(process.argv.includes('--write'))fs.writeFileSync(full,html);
}
if(drift&&!process.argv.includes('--write'))process.exitCode=1;
