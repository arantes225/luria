'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');
const output=path.resolve(root,'build','staging');
const config=JSON.parse(fs.readFileSync(path.join(root,'cloudflare/study-voice/staging.public.json'),'utf8'));
const original=fs.readFileSync(path.join(root,'assets/js/supabase.js'),'utf8');
const productionUrl=original.match(/const SUPABASE_URL = "([^"]+)"/)[1];
const productionKey=original.match(/const SUPABASE_KEY = "([^"]+)"/)[1];
const targetUrl=new URL(config.supabaseUrl);
if(targetUrl.protocol!=='https:'||targetUrl.origin!==config.supabaseUrl||!targetUrl.hostname.endsWith('.supabase.co')||targetUrl.origin===productionUrl)throw Error('A staging build requires an isolated HTTPS Supabase project');
if(!/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.supabasePublishableKey))throw Error('A public publishable key is required');
const voiceOrigin=config.voiceOrigin?new URL(config.voiceOrigin):null;
if(voiceOrigin&&(voiceOrigin.protocol!=='https:'||voiceOrigin.origin!==config.voiceOrigin))throw Error('Voice origin must be an exact HTTPS origin');
const blocked=/^(?:\.|node_modules\/|browser-results\/|build\/|db\/|docs\/|tests\/|scripts\/|tools\/|tmp\/|supabase\/|cloudflare\/|config\/)/;
const extensions=new Set(['.html','.js','.mjs','.css','.svg','.png','.webp','.avif','.jpg','.jpeg','.gif','.ico','.woff','.woff2','.ttf','.eot','.json','.webmanifest','.xml','.txt','.pdf','.mp3','.wav','.ogg','.m4a']);
const excluded=new Set(['package.json','package-lock.json','README.md','CNAME','AGENTS.md','_worker.js','_headers','_redirects']);
const textExtensions=new Set(['.html','.js','.css','.svg','.json','.webmanifest','.xml','.txt']);
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:root,maxBuffer:32*1024*1024}).toString().split('\0').filter(Boolean).filter(file=>!blocked.test(file)&&!excluded.has(file)&&extensions.has(path.extname(file).toLowerCase()));
if(files.length>20000)throw Error('Workers Free static asset count exceeded');
const buildHash=crypto.createHash('sha256').update(JSON.stringify(config));
for(const file of files){const resolved=fs.realpathSync(path.join(root,file));if(!resolved.startsWith(root+path.sep)||!fs.statSync(resolved).isFile())throw Error('Asset outside workspace: '+file);if(fs.statSync(resolved).size>25*1024*1024)throw Error('Asset exceeds 25 MiB: '+file);buildHash.update(file).update(fs.readFileSync(resolved));}
const buildTag=buildHash.digest('hex').slice(0,12);
if(output!==path.join(root,'build','staging')||!output.startsWith(root+path.sep))throw Error('Invalid build output');
for(const directory of [path.join(root,'build'),output])if(fs.existsSync(directory)&&fs.lstatSync(directory).isSymbolicLink())throw Error('Build output cannot be a symlink');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
let bytes=0;
for(const file of files){
 const ext=path.extname(file).toLowerCase();let data=fs.readFileSync(path.join(root,file));
 if(textExtensions.has(ext)){
  let text=data.toString('utf8').replaceAll(new URL(productionUrl).hostname.split('.')[0],targetUrl.hostname.split('.')[0]).replaceAll(productionKey,config.supabasePublishableKey);
  if(file==='assets/js/social-voice.js')text=text.replace(/const endpoint='[^']+';/,"const endpoint='"+(voiceOrigin?voiceOrigin.origin:'/api/study-voice').replace(/\/$/,'')+(voiceOrigin?'/api/study-voice':'')+"';");
  if(file==='service-worker.js')text=text.replace(/const CACHE_VERSION = "([^"]+)";/,'const CACHE_VERSION = "$1-staging-'+buildTag+'";');
  if(ext==='.webmanifest'){const manifest=JSON.parse(text);manifest.name+=' — Homologação';manifest.short_name='TRAUBE Teste';text=JSON.stringify(manifest,null,2)+'\n';}
  if(ext==='.html'){
   text=text.replaceAll(' https://luria-study-voice.lfab225.workers.dev','');
   const dom=new JSDOM(text);const policy=dom.window.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
   if(policy){
    const hashes=[...new Set([...dom.window.document.scripts].filter(s=>!s.hasAttribute('src')&&s.textContent.trim()&&!/^(application\/(?:ld\+)?json)$/i.test(s.type)).map(s=>"'sha256-"+crypto.createHash('sha256').update(s.textContent,'utf8').digest('base64')+"'"))];
    let updated=policy.content.replace(/script-src\s+([^;]+)/,(_,value)=>'script-src '+value.replace(/'sha256-[^']+'\s*/g,'').trim()+(hashes.length?' '+hashes.join(' '):''));
    if(voiceOrigin&&/^(?:amigos\.html|amigos\/index\.html)$/.test(file))updated=updated.replace(/connect-src\s+([^;]+)/,(_,value)=>'connect-src '+value+' '+voiceOrigin.origin);
    text=text.replace(/(<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*\bcontent=")([^"]*)(")/i,(_,start,old,end)=>start+updated+end);
   }
   dom.window.close();
  }
  if(text.includes(new URL(productionUrl).hostname.split('.')[0])||text.includes(productionKey))throw Error('Production connection remains in '+file);
  if(/\bsb_secret_[A-Za-z0-9_-]+|SFU_APP_SECRET\s*=/.test(text))throw Error('Secret-like asset content in '+file);
  data=Buffer.from(text,'utf8');
 }
 const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,data);bytes+=data.length;
}
fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(output,'_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n');
console.log(JSON.stringify({environment:'staging',supabase:targetUrl.origin,voiceOrigin:voiceOrigin?.origin||'same-origin',files:files.length,megabytes:Math.round(bytes/1048576),output},null,2));
