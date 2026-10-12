const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'../..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function declaration(source,name,indent=''){
 const start=source.search(new RegExp('^'+indent+'(?:async )?function '+name+'\\(', 'm'));
 assert(start>=0,name);const end=source.indexOf('\n'+indent+'}',start);
 assert(end>=0,name+' end');return source.slice(start,end+indent.length+2);
}
function page(t,file){
 const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));console.on('error',(...args)=>errors.push(args.join(' ')));
 const dom=new JSDOM(read(file),{url:'https://fixture.invalid/'+file,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
 const w=dom.window;w.scrollTo=()=>{};w.setInterval=()=>1;w.HTMLElement.prototype.scrollIntoView=function(){};
 // jsdom does not implement CSS.escape; selectors in these fixtures use names/IDs.
 w.CSS={escape:value=>String(value).replace(/[^a-zA-Z0-9_-]/g,c=>'\\'+c)};
 t.after(()=>w.close());return {w,d:w.document,errors};
}
module.exports={read,declaration,page,settle,root};
