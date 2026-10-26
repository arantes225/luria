'use strict';
const path=require('node:path');
const {execFileSync}=require('node:child_process');
// Default deny internal/editorial workspaces before publishing GitHub Pages.
const blocked=/^(?:\.|node_modules\/|browser-results\/|build\/|db\/|docs\/|tests\/|scripts\/|tools\/|tmp\/|supabase\/|cloudflare\/|config\/|marketing\/|qf-[^/]+\/|content\/weekly\/(?!manifest\.json$)|apostilas\/(?:_rascunhos|lotes|curadoria-imagens(?:-v2)?)\/)/;
const extensions=new Set(['.html','.js','.mjs','.css','.svg','.png','.webp','.avif','.jpg','.jpeg','.gif','.ico','.woff','.woff2','.ttf','.eot','.json','.webmanifest','.xml','.txt','.pdf','.mp3','.wav','.ogg','.m4a']);
const excluded=new Set(['package.json','package-lock.json','README.md','AGENTS.md','_worker.js']);
const isPublicFile=file=>!blocked.test(file)&&!excluded.has(file)&&(extensions.has(path.extname(file).toLowerCase())||['CNAME','_headers','_redirects'].includes(file));
const publicFiles=(root=path.resolve(__dirname,'..'))=>execFileSync('git',['ls-files','--cached','-z'],{cwd:root,maxBuffer:32*1024*1024}).toString().split('\0').filter(Boolean).filter(isPublicFile);
module.exports={isPublicFile,publicFiles};
