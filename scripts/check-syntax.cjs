const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');let checked=0,failed=0;
const redact=file=>file.replace(/qf-[^/\\]+/g,'qf-[redacted]');
function check(code,file,line=1){
  checked++;
  try{new vm.Script(code,{filename:redact(file),lineOffset:line-1});}
  catch(error){failed++;console.error(redact(file)+':'+line+': '+error.message);}
}
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','vendor','browser-results','.audit-artifacts','.tmp'].includes(entry.name))continue;
    const full=path.join(dir,entry.name),file=path.relative(root,full);
    if(entry.isDirectory()){walk(full);continue;}
    if(/\.(js|cjs)$/.test(file))check(fs.readFileSync(full,'utf8'),file);
    if(file.endsWith('.html')){
      const html=fs.readFileSync(full,'utf8');
      for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
        if(/\bsrc\s*=/.test(match[1])||/type\s*=\s*["']application\//i.test(match[1])||!match[2].trim())continue;
        check(match[2],file,html.slice(0,match.index).split('\n').length);
      }
    }
  }
}
walk(root);console.log(`${checked} blocos JS/CJS verificados; ${failed} erros sintáticos.`);process.exitCode=failed?1:0;
