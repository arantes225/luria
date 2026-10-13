// Optional development tool: esbuild is not a runtime/platform dependency.
const esbuild=require(process.env.ALEX_ESBUILD_MODULE||'esbuild'),fs=require('node:fs'),path=require('node:path');
const dir=path.resolve(__dirname,'../docs/mascot-lab');
esbuild.buildSync({entryPoints:[path.join(dir,'lab.mjs')],bundle:true,format:'iife',minify:true,outfile:path.join(dir,'local.bundle.js'),define:{'import.meta.url':'ALEX_MODULE_URL'},banner:{js:"const ALEX_MODULE_URL=new URL('../../assets/js/professor-alex-mascot.mjs',document.currentScript.src).href;"},legalComments:'eof'});
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8').replace('<script type="module" src="lab.mjs"></script>','<script defer src="local.bundle.js"></script>').replace('<link rel="manifest" href="manifest.webmanifest">','');
fs.writeFileSync(path.join(dir,'local.html'),html);
