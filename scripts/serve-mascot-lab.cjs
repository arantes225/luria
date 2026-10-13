// Local preview only; no dependency and no exposure to the network.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),port=Number(process.env.ALEX_LAB_PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  let decoded;try{decoded=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  if(decoded==='/'){res.writeHead(302,{Location:'/docs/mascot-lab/'}).end();return;}
  const allow=decoded.startsWith('/docs/mascot-lab/')||['/assets/js/professor-alex-mascot.mjs','/assets/css/professor-alex-mascot.css','/assets/vendor/three.module.min.mjs','/assets/vendor/three.core.min.mjs'].includes(decoded);
  const target=path.resolve(root,'.'+decoded+(decoded.endsWith('/')?'index.html':''));
  if(!allow||!target.startsWith(root+path.sep)){res.writeHead(404).end('Not found');return;}
  fs.readFile(target,(error,data)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);});
}).listen(port,'127.0.0.1',()=>console.log('Professor Alex 3D: http://127.0.0.1:'+port+'/docs/mascot-lab/'));

