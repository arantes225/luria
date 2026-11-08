import assert from 'node:assert/strict';
import {surfaceField} from './registration-geometry.mjs';
const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const point=(a,i)=>Array.from(a.subarray(i*3,i*3+3));
const center3=p=>[0,1,2].map(k=>(p.bounds[0][k]+p.bounds[1][k])/2);
function intersects(a,b,t){const d=sub(b,a),e1=sub(t[1],t[0]),e2=sub(t[2],t[0]),h=cross(d,e2),det=dot(e1,h);if(Math.abs(det)<1e-12)return false;const s=sub(a,t[0]),u=dot(s,h)/det;if(u<0||u>1)return false;const q=cross(s,e1),v=dot(d,q)/det;if(v<0||u+v>1)return false;const distance=dot(e2,q)/det;return distance>1e-6&&distance<1-1e-6;}
export function validateFemalePosition(atlas,files){
 const geometry=p=>{const b=files[p.chunk],slice=(o,n)=>b.buffer.slice(b.byteOffset+o,b.byteOffset+o+n);return {pos:new Float32Array(slice(p.positions,p.vertexCount*12)),idx:new Uint32Array(slice(p.indices,p.indexCount*4))};};
 assert.equal(atlas.spatialRegistration?.version,1,'falta correção espacial feminina');
 const skin=atlas.parts.find(p=>/^Skin$/i.test(p.name)),g=geometry(skin),envelope=surfaceField(g.pos,g.idx);
 const walls=atlas.parts.filter(p=>p.registration==='abdominal wall surface registration');assert.ok(walls.length>=8,'parede abdominal não registrada');
 for(const p of walls){const {pos}=geometry(p);for(let i=0;i<pos.length;i+=3*32){const [back,front]=envelope(pos[i],pos[i+1]);assert.ok(pos[i+2]>=back-.002&&pos[i+2]<=front+.002,'músculo fora da pele: '+p.name);}}
 const targets=atlas.parts.filter(p=>/^(Body of uterus|Fundus of uterus|Anterior wall of uterus|Posterior wall of uterus|Cervix|Left ovary|Right ovary|Vagina)$/.test(p.name));
 const triangles=[];for(const p of targets){const {pos,idx}=geometry(p);for(let i=0;i<idx.length;i+=3){const t=[point(pos,idx[i]),point(pos,idx[i+1]),point(pos,idx[i+2])];triangles.push({t,mn:[0,1,2].map(k=>Math.min(...t.map(v=>v[k]))),mx:[0,1,2].map(k=>Math.max(...t.map(v=>v[k])))});}}
 for(const p of atlas.parts.filter(p=>/^(Descending colon|Sigmoid colon|Rectum)$/.test(p.name))){const {pos,idx}=geometry(p);let hits=0;const edges=new Set();for(let i=0;i<idx.length;i+=3)for(let j=0;j<3;j++){const aa=idx[i+j],bb=idx[i+(j+1)%3],key=Math.min(aa,bb)+','+Math.max(aa,bb);if(edges.has(key))continue;edges.add(key);const a=point(pos,aa),b=point(pos,bb),mn=a.map((v,k)=>Math.min(v,b[k])),mx=a.map((v,k)=>Math.max(v,b[k]));for(const tri of triangles){if([0,1,2].some(k=>mx[k]<tri.mn[k]||mn[k]>tri.mx[k]))continue;if(intersects(a,b,tri.t)){hits++;break;}}}assert.equal(hits,0,p.name+' intersecta útero/ovários/vagina');}
 const center=p=>(p.bounds[0][2]+p.bounds[1][2])/2,uterus=atlas.parts.find(p=>p.name==='Body of uterus'),rectum=atlas.parts.find(p=>p.name==='Rectum'),bladder=atlas.parts.find(p=>p.name==='Fundus of urinary bladder base');
 assert.ok(center(bladder)>center(uterus)&&center(uterus)>center(rectum),'ordem bexiga-útero-reto inválida');
 const lClav=atlas.parts.find(p=>p.name==='Left clavicle'),rClav=atlas.parts.find(p=>p.name==='Right clavicle');
 assert.ok(lClav&&rClav&&center3(lClav)[1]>1.33&&Math.abs(center3(lClav)[1]-center3(rClav)[1])<.01,'clavículas desalinhadas com o manúbrio');
 for(const base of ['humerus','radius','ulna','capitate','third metacarpal bone']){
  const l=atlas.parts.find(p=>p.name.toLowerCase()==='left '+base),r=atlas.parts.find(p=>p.name.toLowerCase()==='right '+base);
  assert.ok(l&&r,'falta osso do membro superior: '+base);
  const cl=center3(l),cr=center3(r);
  assert.ok(Math.abs(cl[1]-cr[1])<.015&&Math.abs(Math.abs(cl[0])-Math.abs(cr[0]))<.015,'assimetria no membro superior: '+base);
  const [back,front]=envelope(cl[0],cl[1]);
  assert.ok(cl[2]>=back-.004&&cl[2]<=front+.004,'osso fora do envelope da pele: '+l.name);
 }
 assert.ok(!atlas.parts.some(p=>p.system==='adapted-muscle'&&/papillary/i.test(p.name)),'músculos papilares cardíacos indevidamente importados como esqueléticos');
 const byBase=new Map();
 for(const p of atlas.parts.filter(x=>x.system==='adapted-muscle')){
  const m=p.name.match(/^(Left|Right) (.+)$/i);if(!m)continue;
  const k=m[2].toLowerCase(),cur=byBase.get(k)||{};cur[m[1][0].toUpperCase()]=p;byBase.set(k,cur);
 }
 for(const [k,pair] of byBase){
  if(!pair.L||!pair.R)continue;
  assert.ok(Math.abs(center3(pair.L)[1]-center3(pair.R)[1])<.015,'assimetria muscular vertical: '+k);
 }
 console.log('Female spatial checks: abdominal wall, shoulder girdle, upper limbs, and musculature inside skin and symmetric; no colorectal/reproductive crossings; bladder-uterus-rectum order preserved');
}
