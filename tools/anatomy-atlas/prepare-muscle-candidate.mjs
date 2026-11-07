// TRAUBE: candidato de musculatura adaptada, separado do atlas publicado.
// Uso: node tools/anatomy-atlas/prepare-muscle-candidate.mjs ATLAS_DIR
// Dados: BodyParts3D CC BY 4.0; Z-Anatomy CC BY-SA 4.0.
// Cada músculo recebe uma única transformação de similaridade por osso.
// Não altera vértices individualmente e não declara origem feminina das malhas.
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve(process.argv[2]||'build/human-atlas-source/public/models');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const male=read('atlas.json'),female=read('atlas-female.json');
if(female.parts.some(p=>p.system==='adapted-muscle'))throw Error('Musculatura já integrada');
const buffers=a=>a.chunks.map(c=>fs.readFileSync(path.join(dir,path.basename(c.url))));
const mb=buffers(male),fb=buffers(female);
const center=p=>p.bounds[0].map((v,i)=>(v+p.bounds[1][i])/2);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const norm=a=>Math.sqrt(dot(a,a));
const unit=a=>{const n=norm(a);if(n<1e-8)throw Error('Âncora degenerada');return a.map(v=>v/n);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const positions=(p,bs)=>{const b=bs[p.chunk];return new Float32Array(b.buffer.slice(b.byteOffset+p.positions,b.byteOffset+p.positions+p.vertexCount*12));};
const point=(p,i)=>Array.from(p.subarray(i*3,i*3+3));
const frame=(v,indices)=>{const o=point(v,indices[0]),x=unit(sub(point(v,indices[1]),o)),z=unit(cross(x,sub(point(v,indices[2]),o))),y=cross(z,x);return {o,axes:[x,y,z]};};
const maleById=new Map(male.parts.map(p=>[p.id,p]));
const anchors=[];
for(const f of female.parts.filter(p=>p.system==='borrowed'&&p.conceptId.startsWith('BORROWED:'))){
 const m=maleById.get(f.conceptId.slice(9));if(!m||m.vertexCount!==f.vertexCount)continue;
 const a=positions(m,mb),b=positions(f,fb);let j=0,k=0,d=-1;
 for(let i=0;i<m.vertexCount;i++){const n=norm(sub(point(a,i),point(a,0)));if(n>d){d=n;j=i;}}
 const axis=unit(sub(point(a,j),point(a,0)));d=-1;
 for(let i=0;i<m.vertexCount;i++){const n=norm(cross(axis,sub(point(a,i),point(a,0))));if(n>d){d=n;k=i;}}
 if(d<.001)continue;
 const A=frame(a,[0,j,k]),B=frame(b,[0,j,k]);
 const scale=norm(sub(point(b,j),point(b,0)))/norm(sub(point(a,j),point(a,0)));
 if(scale<.7||scale>1.3)continue;
 anchors.push({m,f,A,B,scale,center:center(m)});
}
if(anchors.length<60)throw Error('Correspondências ósseas insuficientes');
const excluded=/gluteus|piriformis|gemellus|obturator|quadratus femoris|tensor fasciae|sartorius|gracilis|adductor|pectineus|vastus|rectus femoris|biceps femoris|semitendinosus|semimembranosus|gastrocnemius|soleus|plantaris|popliteus|tibialis|fibularis|peroneus|hallucis|iliacus|psoas|iliopsoas|extraocular/i;
const records=[],segments=[];let bytes=0;
const put=a=>{const pad=(4-bytes%4)%4;if(pad){segments.push(Buffer.alloc(pad));bytes+=pad;}const o=bytes,b=Buffer.from(a.buffer,a.byteOffset,a.byteLength);segments.push(b);bytes+=b.length;return o;};
const nativeNames=new Set(female.parts.map(p=>p.name.toLowerCase()));
for(const p of male.parts.filter(p=>p.system==='muscular'&&!excluded.test(p.name)&&center(p)[1]>.9&&!nativeNames.has(p.name.toLowerCase())&&!/(?:medial|lateral|superior|inferior) rectus|(?:superior|inferior) oblique|ocular/i.test(p.name))){
 const c=center(p),side=/^Left /i.test(p.name)?1:/^Right /i.test(p.name)?-1:0;
 const options=anchors.filter(a=>!side||Math.sign(a.center[0])===side);
 const anchor=options.sort((a,b)=>norm(sub(c,a.center))-norm(sub(c,b.center)))[0];if(!anchor)continue;
 const src=positions(p,mb),out=new Float32Array(src.length),mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
 for(let i=0;i<src.length;i+=3){const q=sub(Array.from(src.subarray(i,i+3)),anchor.A.o);const local=anchor.A.axes.map(a=>dot(q,a)*anchor.scale);for(let k=0;k<3;k++){out[i+k]=anchor.B.o[k]+local.reduce((s,v,j)=>s+v*anchor.B.axes[j][k],0);mn[k]=Math.min(mn[k],out[i+k]);mx[k]=Math.max(mx[k],out[i+k]);}}
 const b=mb[p.chunk],indices=new Uint32Array(b.buffer.slice(b.byteOffset+p.indices,b.byteOffset+p.indices+p.indexCount*4));
 const normals=new Float64Array(out.length);
 for(let i=0;i<indices.length;i+=3){const ids=Array.from(indices.subarray(i,i+3)),n=cross(sub(point(out,ids[1]),point(out,ids[0])),sub(point(out,ids[2]),point(out,ids[0])));for(const id of ids)for(let k=0;k<3;k++)normals[id*3+k]+=n[k];}
 const packed=new Int16Array(out.length);for(let i=0;i<out.length;i+=3){const v=Array.from(normals.subarray(i,i+3)),length=norm(v)||1;for(let k=0;k<3;k++)packed[i+k]=Math.round(v[k]/length*32767);}
 records.push({...p,id:'TRAUBE-ADAPTED:'+p.id,positions:put(out),normals:put(packed),indices:put(indices),chunk:0,bounds:[mn,mx],anchor:anchor.f.id,sourceSex:'male',registration:'one rigid similarity per mesh',scale:anchor.scale});
}
const outDir=path.join(dir,'muscle-candidate');fs.mkdirSync(outDir,{recursive:true});
if(records.length<100)throw Error('Cobertura muscular insuficiente: '+records.length);
fs.writeFileSync(path.join(outDir,'candidate.bin'),Buffer.concat(segments));
fs.writeFileSync(path.join(outDir,'candidate.json'),JSON.stringify({status:'requires visual and anatomical review',parts:records,chunks:[{url:'candidate.bin',bytes}],sources:['BodyParts3D CC BY 4.0','Z-Anatomy CC BY-SA 4.0']},null,2));
console.log(records.length+' músculos candidatos; atlas publicado preservado');

const integrated=records.map(p=>({...p,conceptId:p.id,system:'adapted-muscle',chunk:female.chunks.length}));
const candidateFile='female-regional-muscles.bin';
fs.writeFileSync(path.join(dir,candidateFile),Buffer.concat(segments));
female.chunks.push({url:'/models/'+candidateFile,bytes});
female.parts.push(...integrated);
for(const p of integrated)female.concepts.push({id:p.id,name:p.name,elements:[p.id]});
female.triangles=female.parts.reduce((sum,p)=>sum+p.indexCount/3,0);
female.muscleRegistration={method:'similaridade rígida única por músculo',sourceSex:'male',anchors:anchors.length,muscles:records.length};
fs.writeFileSync(path.join(dir,'atlas-female.json'),JSON.stringify(female));
