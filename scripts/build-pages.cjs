'use strict';
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'build','pages');
const blocked=/^(?:\.|node_modules\/|browser-results\/|build\/|db\/|docs\/|tests\/|scripts\/|tools\/|tmp\/|supabase\/|cloudflare\/|config\/)/;
const extensions=new Set(['.html','.js','.css','.svg','.png','.webp','.avif','.jpg','.jpeg','.gif','.ico','.woff','.woff2','.ttf','.eot','.json','.webmanifest','.xml','.txt','.pdf','.mp3','.wav','.ogg','.m4a']);
const excluded=new Set(['package.json','package-lock.json','README.md','AGENTS.md','_worker.js']);
const files=execFileSync('git',['ls-files','--cached','-z'],{cwd:root,maxBuffer:32*1024*1024}).toString().split('\0').filter(Boolean).filter(file=>!blocked.test(file)&&!excluded.has(file)&&(extensions.has(path.extname(file).toLowerCase())||['CNAME','_headers','_redirects'].includes(file)));
// Generated output only; reject links before replacing this exact workspace directory.
for(const dir of [path.join(root,'build'),output])if(fs.existsSync(dir)&&fs.lstatSync(dir).isSymbolicLink())throw Error('Build output cannot be a symlink');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
for(const file of files){const source=fs.realpathSync(path.join(root,file));if(!source.startsWith(root+path.sep)||!fs.statSync(source).isFile())throw Error('Invalid static asset '+file);const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(source,destination);}
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log(files.length+' public assets prepared for GitHub Pages');
