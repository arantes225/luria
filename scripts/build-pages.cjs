'use strict';
const fs=require('node:fs'),path=require('node:path');
const {publicFiles}=require('./public-files.cjs');
const {rewritePageHtml}=require('./pages-base-links.cjs');
const root=path.resolve(__dirname,'..'),output=path.join(root,'build','pages');
const files=publicFiles(root);
// Generated output only; reject links before replacing this exact workspace directory.
for(const dir of [path.join(root,'build'),output])if(fs.existsSync(dir)&&fs.lstatSync(dir).isSymbolicLink())throw Error('Build output cannot be a symlink');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
for(const file of files){const source=fs.realpathSync(path.join(root,file));if(!source.startsWith(root+path.sep)||!fs.statSync(source).isFile())throw Error('Invalid static asset '+file);const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});if(file.endsWith('.html'))fs.writeFileSync(destination,rewritePageHtml(fs.readFileSync(source,'utf8'),file));else fs.copyFileSync(source,destination);}
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log(files.length+' public assets prepared for GitHub Pages');
