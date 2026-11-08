// Register the abdominal wall to the native female skin and pelvic landmarks;
// correct the anterior pelvic colorectal loop with one continuous shared field.
import fs from 'node:fs';
import path from 'node:path';
import {surfaceField,pelvicBowelPosition,quantizedNormals} from './registration-geometry.mjs';
const dir=path.resolve(process.argv[2]),read=n=>JSON.parse(fs.readFileSync(path.join(dir,n+'.json'),'utf8'));
const female=read('atlas-female'),male=read('atlas');
if(female.spatialRegistration)throw Error('Spatial registration already applied');
const buffers=a=>a.chunks.map(c=>fs.readFileSync(path.join(dir,path.basename(c.url))));
const fb=buffers(female),mb=buffers(male);
const arrays=(p,bs)=>{const b=bs[p.chunk],slice=(offset,bytes)=>b.buffer.slice(b.byteOffset+offset,b.byteOffset+offset+bytes);return {pos:new Float32Array(slice(p.positions,p.vertexCount*12)),idx:new Uint32Array(slice(p.indices,p.indexCount*4))};};
const skin=(a,bs)=>{const p=a.parts.find(p=>/^Skin$/i.test(p.name));if(!p)throw Error('Missing skin');const {pos,idx}=arrays(p,bs);return surfaceField(pos,idx);};
const mSkin=skin(male,mb),fSkin=skin(female,fb),byId=new Map(male.parts.map(p=>[p.id,p]));
const recti=male.parts.filter(p=>/rectus abdominis/i.test(p.name)),mY0=Math.min(...recti.map(p=>p.bounds[0][1]));
const fY0=Math.max(...female.parts.filter(p=>/^Pubis compact bone/i.test(p.name)).map(p=>p.bounds[1][1]));
const mY1=male.parts.find(p=>p.name==='Body of sternum').bounds[0][1],fY1=female.parts.find(p=>p.name==='Sternum').bounds[0][1];
const mWidth=Math.max(...male.parts.filter(p=>/hip bone/i.test(p.name)).map(p=>Math.max(Math.abs(p.bounds[0][0]),Math.abs(p.bounds[1][0]))));
const fWidth=Math.max(...female.parts.filter(p=>/Ilium compact bone/i.test(p.name)).map(p=>Math.max(Math.abs(p.bounds[0][0]),Math.abs(p.bounds[1][0]))));
const sx=fWidth/mWidth,sy=(fY1-fY0)/(mY1-mY0);
const segments=[];let bytes=0,abdominal=0,bowel=0;
const put=a=>{const pad=(4-bytes%4)%4;if(pad){segments.push(Buffer.alloc(pad));bytes+=pad;}const o=bytes,b=Buffer.from(a.buffer,a.byteOffset,a.byteLength);segments.push(b);bytes+=b.length;return o;};
for(const p of female.parts){
 const wall=p.system==='adapted-muscle'&&/rectus abdominis|abdominal oblique|external oblique|transversus abdominis|pyramidalis/i.test(p.name);
 const colon=p.system==='digestive'&&/^(Descending colon|Sigmoid colon|Rectum)$/i.test(p.name);
 if(!wall&&!colon)continue;
 const source=wall?byId.get(p.id.replace('TRAUBE-ADAPTED:','')):p;if(!source)throw Error('Missing source '+p.id);
 const {pos,idx}=arrays(source,wall?mb:fb),out=new Float32Array(pos.length),mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
 for(let i=0;i<pos.length;i+=3){let x=pos[i],y=pos[i+1],z=pos[i+2];
  if(wall){const m=mSkin(x,y);x*=sx;y=fY0+(y-mY0)*sy;const f=fSkin(x,y),t=Math.max(.02,Math.min(.98,(z-m[0])/Math.max(.01,m[1]-m[0])));z=f[0]+t*(f[1]-f[0])-.004*(2*t-1);}
  else [x,y,z]=pelvicBowelPosition(x,y,z,p.name);
  for(const [k,v] of [x,y,z].entries()){out[i+k]=v;mn[k]=Math.min(mn[k],v);mx[k]=Math.max(mx[k],v);}
 }
 p.positions=put(out);p.normals=put(quantizedNormals(out,idx));p.indices=put(idx);p.chunk=female.chunks.length;p.bounds=[mn,mx];
 p.registration=wall?'abdominal wall surface registration':'continuous pelvic colorectal registration';
 if(wall)abdominal++;else bowel++;
}
if(abdominal<8||bowel!==3)throw Error('Missing spatial coverage '+abdominal+'/'+bowel);
const file='female-spatial-registration.bin';fs.writeFileSync(path.join(dir,file),Buffer.concat(segments));female.chunks.push({url:'/models/'+file,bytes});
female.spatialRegistration={version:1,abdominal,bowel,abdominalLandmarks:{mY0,fY0,mY1,fY1,sx,sy},notes:'Preserve reproductive meshes and upper colon. Shared continuous registration for connected pelvic colorectal parts.'};
fs.writeFileSync(path.join(dir,'atlas-female.json'),JSON.stringify(female));console.log('Spatial registration: '+abdominal+' abdominal muscles; '+bowel+' colorectal parts');
