/* TRAUBE · Corpo dissecável — motor WebGL2 de origem MIT (ver LICENSE-corpus.txt).
   Modificações TRAUBE: textos em português (corpus-pt.js), zoom em direção ao
   cursor e mensagens traduzidas. Estruturas geradas por código, sem modelos. */
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const TAU=Math.PI*2;

/* ══════════ mat4 ══════════ */
const M4={
  persp(f,a,n,F){const t=1/Math.tan(f/2),o=new Float32Array(16);
    o[0]=t/a;o[5]=t;o[11]=-1;o[10]=(F+n)/(n-F);o[14]=2*F*n/(n-F);return o},
  look(e,c,u){let z=[e[0]-c[0],e[1]-c[1],e[2]-c[2]];let l=Math.hypot(...z)||1;z=z.map(v=>v/l);
    let x=[u[1]*z[2]-u[2]*z[1],u[2]*z[0]-u[0]*z[2],u[0]*z[1]-u[1]*z[0]];
    l=Math.hypot(...x)||1;x=x.map(v=>v/l);
    const y=[z[1]*x[2]-z[2]*x[1],z[2]*x[0]-z[0]*x[2],z[0]*x[1]-z[1]*x[0]];
    return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,
      -(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]),-(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]),-(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]),1])},
  mul(a,b){const o=new Float32Array(16);
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];o[i*4+j]=s}return o}
};

/* ══════════ GL ══════════ */
const cv=$("#gl");
const gl=cv.getContext("webgl2",{antialias:false,alpha:false,powerPreference:"high-performance"});
if(!gl){ $("#boot").classList.add("gone"); $("#err").style.display="flex";
  $("#err").textContent="Este navegador não oferece WebGL2, necessário para o modelo 3D.";
  throw new Error("no webgl2"); }
let lost=false;
cv.addEventListener("webglcontextlost",e=>{e.preventDefault();lost=true;
  $("#err").style.display="flex";
  $("#err").textContent="O contexto gráfico foi perdido. Recarregue a página para continuar.";});

function sh(t,src){const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s}
function prog(v,f){const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));
  gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p}

/* shaders: GLSL source lives in shaders.js (loaded before this file) */

const P=prog(VS,FS),PB=prog(QV,BRIGHT),PL=prog(QV,BLUR),PC=prog(QV,COMP),PA=prog(QV,AOS);
const uVP=gl.getUniformLocation(P,"uVP"), uEye=gl.getUniformLocation(P,"uEye"),
      uPick=gl.getUniformLocation(P,"uPick"), uTime=gl.getUniformLocation(P,"uTime"),
      uPlane=gl.getUniformLocation(P,"uPlane"), uLut=gl.getUniformLocation(P,"uLut"),
      uLutW=gl.getUniformLocation(P,"uLutW");

/* ══════════════════════ MESH BUILDERS ══════════════════════
   Six primitives cover the whole body. The important ones are `loft`, which
   sweeps an ellipse through a list of stations (bodies are wider than they are
   deep, so circular tubes never look right), and `shaft`, which gives a long
   bone its narrow waist and flared ends.                                   */
const V=[],Nn=[],ID=[],IX=[];
let base=0;
function push(p,n,id){V.push(p[0],p[1],p[2]);Nn.push(n[0],n[1],n[2]);ID.push(id)}
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const mulS=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const lerp=(a,b,t)=>a+(b-a)*t;
function norm(a){const l=Math.hypot(...a)||1;return [a[0]/l,a[1]/l,a[2]/l]}
function rotv(p,rx,ry,rz){
  let [x,y,z]=p,c,s;
  if(rx){c=Math.cos(rx);s=Math.sin(rx);[y,z]=[y*c-z*s,y*s+z*c]}
  if(ry){c=Math.cos(ry);s=Math.sin(ry);[x,z]=[x*c+z*s,-x*s+z*c]}
  if(rz){c=Math.cos(rz);s=Math.sin(rz);[x,y]=[x*c-y*s,x*s+y*c]}
  return [x,y,z];
}
function face(a,b,c,d){IX.push(a,b,c, a,c,d)}

/* ── deterministic noise, so the specimen is the same every load ── */
let _sd=1337;
const rnd=()=>{_sd=(_sd*1664525+1013904223)&0x7fffffff;return _sd/0x7fffffff};
function h3(i,j,k){
  let n=Math.sin(i*127.1+j*311.7+k*74.7)*43758.5453123; return n-Math.floor(n);
}
function vn3(x,y,z){
  const i=Math.floor(x),j=Math.floor(y),k=Math.floor(z);
  const fx=x-i,fy=y-j,fz=z-k;
  const u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy),w=fz*fz*(3-2*fz);
  const c=(a,b,t)=>a+(b-a)*t;
  const n00=c(h3(i,j,k),h3(i+1,j,k),u), n01=c(h3(i,j,k+1),h3(i+1,j,k+1),u);
  const n10=c(h3(i,j+1,k),h3(i+1,j+1,k),u), n11=c(h3(i,j+1,k+1),h3(i+1,j+1,k+1),u);
  return c(c(n00,n10,v),c(n01,n11,v),w)*2-1;
}
function fbm(p,f,oct){
  let a=0,amp=1,tot=0;
  for(let o=0;o<(oct||3);o++){
    a+=vn3(p[0]*f,p[1]*f,p[2]*f)*amp; tot+=amp; amp*=0.5; f*=2.07;
  }
  return a/tot;
}

/* Recompute normals from the triangles for one range of vertices, welding by
   position first so UV seams do not show as a hard line. Any primitive that
   gets displaced has to go through this — its analytic normal is now wrong. */
function reshade(v0,i0){
  const v1=base, i1=IX.length;
  const acc=new Float64Array((v1-v0)*3);
  for(let t=i0;t<i1;t+=3){
    const a=IX[t]-v0,b=IX[t+1]-v0,c=IX[t+2]-v0;
    if(a<0||b<0||c<0)continue;
    const ax=V[(a+v0)*3],ay=V[(a+v0)*3+1],az=V[(a+v0)*3+2];
    const e1=[V[(b+v0)*3]-ax,V[(b+v0)*3+1]-ay,V[(b+v0)*3+2]-az];
    const e2=[V[(c+v0)*3]-ax,V[(c+v0)*3+1]-ay,V[(c+v0)*3+2]-az];
    const n=cross(e1,e2);
    for(const q of [a,b,c]){acc[q*3]+=n[0];acc[q*3+1]+=n[1];acc[q*3+2]+=n[2]}
  }
  const weld=new Map();
  for(let q=0;q<v1-v0;q++){
    const k=(Math.round(V[(q+v0)*3]*40)+","+Math.round(V[(q+v0)*3+1]*40)+","+
             Math.round(V[(q+v0)*3+2]*40));
    let e=weld.get(k); if(!e){e=[0,0,0,[]];weld.set(k,e)}
    e[0]+=acc[q*3];e[1]+=acc[q*3+1];e[2]+=acc[q*3+2];e[3].push(q);
  }
  for(const [,e] of weld){
    const n=norm([e[0],e[1],e[2]]);
    for(const q of e[3]){Nn[(q+v0)*3]=n[0];Nn[(q+v0)*3+1]=n[1];Nn[(q+v0)*3+2]=n[2]}
  }
}
/* push a displaced copy: `d` is {amp, freq, oct} in world units */
function disp(v0,i0,d){
  if(!d)return;
  for(let q=v0;q<base;q++){
    const p=[V[q*3],V[q*3+1],V[q*3+2]];
    const k=fbm(p,d.freq,d.oct||3)*d.amp;
    V[q*3]+=Nn[q*3]*k; V[q*3+1]+=Nn[q*3+1]*k; V[q*3+2]+=Nn[q*3+2]*k;
  }
  reshade(v0,i0);
}
/* wrap any builder call so its output gets roughened */
function rough(d,fn){ const v0=base,i0=IX.length; fn(); disp(v0,i0,d); }
const D={ bone:{amp:0.10,freq:0.55,oct:4}, boneF:{amp:0.055,freq:1.5,oct:3},
  musc:{amp:0.16,freq:0.32,oct:3}, organ:{amp:0.14,freq:0.30,oct:3},
  skin:{amp:0.10,freq:0.14,oct:4}, gut:{amp:0.20,freq:0.55,oct:3},
  brain:{amp:0.05,freq:1.1,oct:2}, vessel:{amp:0.035,freq:1.3,oct:2} };

/* deformable ellipsoid */
function blob(id,c,r,o){
  o=o||{}; const SU=o.su||24, SV=o.sv||16, rot=o.rot||[0,0,0], warp=o.warp;
  const start=base;
  for(let j=0;j<=SV;j++){
    const v=j/SV, ph=v*Math.PI;
    for(let i=0;i<=SU;i++){
      const u=i/SU, th=u*TAU;
      const d=[Math.sin(ph)*Math.cos(th), Math.cos(ph), Math.sin(ph)*Math.sin(th)];
      const k=warp?warp(d,u,v):1;
      const kk=(typeof k==="number")?[k,k,k]:k;
      let p=[d[0]*r[0]*kk[0], d[1]*r[1]*kk[1], d[2]*r[2]*kk[2]];
      let n=norm([p[0]/(r[0]*r[0]||1), p[1]/(r[1]*r[1]||1), p[2]/(r[2]*r[2]||1)]);
      p=rotv(p,rot[0],rot[1],rot[2]); n=rotv(n,rot[0],rot[1],rot[2]);
      push(add(p,c),n,id);
    }
  }
  for(let j=0;j<SV;j++)for(let i=0;i<SU;i++){
    const a=start+j*(SU+1)+i; face(a,a+SU+1,a+SU+2,a+1);
  }
  base+=(SU+1)*(SV+1);
}

/* sweep with an arbitrary radial profile: shape(theta,t) scales the radius.
   A plain tube passes 1; a muscle passes a cosine ripple for fibre bundles. */
function sweep(id,pts,rad,sides,cap,shape){
  sides=sides||10;
  const n=pts.length,start=base,tans=[];
  for(let i=0;i<n;i++){
    const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];
    let t=sub(b,a); if(Math.hypot(...t)<1e-6)t=[0,1,0]; tans.push(norm(t));
  }
  let ref=norm(cross(tans[0],[0,0,1]));
  if(Math.hypot(...ref)<1e-4)ref=norm(cross(tans[0],[1,0,0]));
  for(let i=0;i<n;i++){
    const T=tans[i];
    ref=norm(sub(ref,mulS(T,dot3(ref,T))));
    const B=norm(cross(T,ref));
    const r=(typeof rad==="number")?rad:rad[i], tt=i/(n-1);
    for(let s2=0;s2<=sides;s2++){
      const a=s2/sides*TAU;
      const nn=norm(add(mulS(ref,Math.cos(a)),mulS(B,Math.sin(a))));
      const k=shape?shape(a,tt):1;
      push(add(pts[i],mulS(nn,r*k)),nn,id);
    }
  }
  for(let i=0;i<n-1;i++)for(let s2=0;s2<sides;s2++){
    const a=start+i*(sides+1)+s2; face(a,a+sides+1,a+sides+2,a+1);
  }
  base+=n*(sides+1);
  if(cap!==false)for(const pi of [0,n-1]){
    const r=(typeof rad==="number")?rad:rad[pi];
    blob(id,pts[pi],[r,r,r],{su:sides,sv:6});
  }
}

/* a muscle belly: fibre bundles ridged on the surface, tapering to smooth
   tendon at each end. This is what stops muscles looking like balloons. */
function muscle(id,pts,rad,bundles,sides){
  sweep(id,pts,rad,sides||18,true,(a,t)=>{
    const taper=Math.min(1,Math.min(t,1-t)*5.5);          // tendon at both ends
    return 1+Math.cos(a*(bundles||9))*0.055*taper + (1-taper)*-0.0;
  });
}

/* recursive vessel tree. Radii follow Murray's law, so a parent's cube equals
   the sum of its children's — which is why real vasculature looks the way it does. */
function vtree(id,p,dir,r,len,depth,o){
  o=o||{};
  if(depth<=0||r<(o.min||0.045))return;
  const seg=[],N=3;
  let d=norm(dir);
  for(let i=0;i<=N;i++){
    const t=i/N;
    seg.push([p[0]+d[0]*len*t + (o.wob||0.5)*vn3(p[0]*3+i,p[1]*3,p[2]*3)*len*0.10,
              p[1]+d[1]*len*t + (o.wob||0.5)*vn3(p[0]*3,p[1]*3+i,p[2]*3)*len*0.10,
              p[2]+d[2]*len*t + (o.wob||0.5)*vn3(p[0]*3,p[1]*3,p[2]*3+i)*len*0.10]);
  }
  sweep(id,seg,[r,r*0.96,r*0.92,r*0.88],r>0.30?8:5,false);
  const end=seg[N];
  const nk=(depth>2 && rnd()<0.28)?3:2;
  const rc=r*Math.pow(1/nk,1/2.6);                       // Murray's law
  let axis=norm(cross(d,[rnd()-0.5,rnd()-0.5,rnd()-0.5]));
  if(!isFinite(axis[0]))axis=[1,0,0];
  for(let k=0;k<nk;k++){
    const ang=(o.spread||0.55)*(0.6+rnd()*0.8);
    const roll=k/nk*TAU+rnd()*0.9;
    const bi=norm(cross(d,axis));
    const off=add(mulS(axis,Math.cos(roll)),mulS(bi,Math.sin(roll)));
    let nd=norm(add(mulS(d,Math.cos(ang)),mulS(off,Math.sin(ang))));
    if(o.hub){                       // bend back inward before it leaves the limb
      const nl=len*0.72;
      const dx=end[0]+nd[0]*nl-o.hub[0], dz=end[2]+nd[2]*nl-o.hub[2];
      const rr=Math.hypot(dx,dz);
      if(rr>o.rad){
        const w=Math.min(0.9,(rr-o.rad)/Math.max(o.rad,0.5));
        nd=norm(add(mulS(nd,1-w),mulS(norm([-dx,0,-dz]),w)));
      }
    }
    vtree(id,end,nd,rc*(0.88+rnd()*0.22),len*(0.70+rnd()*0.16),depth-1,o);
  }
}

/* swept circular tube, parallel-transport framed so it never twists */
function tube(id,pts,rad,sides,cap){
  sides=sides||10;
  const n=pts.length,start=base,tans=[];
  for(let i=0;i<n;i++){
    const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];
    let t=sub(b,a); if(Math.hypot(...t)<1e-6)t=[0,1,0]; tans.push(norm(t));
  }
  let ref=norm(cross(tans[0],[0,0,1]));
  if(Math.hypot(...ref)<1e-4)ref=norm(cross(tans[0],[1,0,0]));
  for(let i=0;i<n;i++){
    const T=tans[i];
    ref=norm(sub(ref,mulS(T,dot3(ref,T))));
    const B=norm(cross(T,ref));
    const r=(typeof rad==="number")?rad:rad[i];
    for(let s=0;s<=sides;s++){
      const a=s/sides*TAU,nn=norm(add(mulS(ref,Math.cos(a)),mulS(B,Math.sin(a))));
      push(add(pts[i],mulS(nn,r)),nn,id);
    }
  }
  for(let i=0;i<n-1;i++)for(let s=0;s<sides;s++){
    const a=start+i*(sides+1)+s; face(a,a+sides+1,a+sides+2,a+1);
  }
  base+=n*(sides+1);
  if(cap!==false)for(const pi of [0,n-1]){
    const r=(typeof rad==="number")?rad:rad[pi];
    blob(id,pts[pi],[r,r,r],{su:sides,sv:6});
  }
}

/* elliptical loft: stations are {y, x, z, rx, rz}. This is what gives a torso
   a real cross-section instead of a drainpipe. */
function loft(id,st,sides,capA,capB){
  sides=sides||22;
  const n=st.length,start=base;
  for(let i=0;i<n;i++){
    const s=st[i], sp=st[Math.max(0,i-1)], sn=st[Math.min(n-1,i+1)];
    const dy=(sn.y-sp.y)||1, dx=(sn.x||0)-(sp.x||0), dz=(sn.z||0)-(sp.z||0);
    for(let k=0;k<=sides;k++){
      const a=k/sides*TAU, ca=Math.cos(a), sa=Math.sin(a);
      const px=(s.x||0)+ca*s.rx, pz=(s.z||0)+sa*s.rz;
      // ellipse normal, then tilted by the local slope of the sweep
      let nn=norm([ca/Math.max(s.rx,.01), 0, sa/Math.max(s.rz,.01)]);
      const drx=((sn.rx-sp.rx)/dy), drz=((sn.rz-sp.rz)/dy);
      nn=norm([nn[0], -(drx*Math.abs(ca)+drz*Math.abs(sa))-(dx*ca+dz*sa)/dy*0, nn[2]]);
      push([px,s.y,pz],nn,id);
    }
  }
  for(let i=0;i<n-1;i++)for(let k=0;k<sides;k++){
    const a=start+i*(sides+1)+k; face(a,a+sides+1,a+sides+2,a+1);
  }
  base+=n*(sides+1);
  if(capA)blob(id,[st[0].x||0,st[0].y,st[0].z||0],[st[0].rx,st[0].rx*0.6,st[0].rz],{su:sides,sv:7});
  if(capB){const L=st[n-1];blob(id,[L.x||0,L.y,L.z||0],[L.rx,L.rx*0.6,L.rz],{su:sides,sv:7})}
}

/* long-bone diaphysis: widest at the ends, narrowest just past the middle */
function shaft(id,a,b,ra,rm,rb,sides){
  const steps=14,pts=[],rads=[];
  for(let i=0;i<=steps;i++){
    const t=i/steps;
    pts.push([lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]);
    const u=Math.abs(t-0.46)/0.54;
    rads.push(rm+(t<0.46?(ra-rm):(rb-rm))*Math.pow(u,1.7));
  }
  tube(id,pts,rads,sides||14,false);
}

/* closed loop of tube — a ring with a real hole through it */
function ring(id,pts,r,sides){
  sides=sides||9;
  const n=pts.length,start=base,tans=[];
  for(let i=0;i<n;i++)tans.push(norm(sub(pts[(i+1)%n],pts[(i-1+n)%n])));
  let ref=norm(cross(tans[0],[0,0,1]));
  if(Math.hypot(...ref)<1e-4)ref=norm(cross(tans[0],[1,0,0]));
  for(let i=0;i<=n;i++){
    const ii=i%n,T=tans[ii];
    ref=norm(sub(ref,mulS(T,dot3(ref,T))));
    const B=norm(cross(T,ref));
    const rr=(typeof r==="number")?r:r[ii];
    for(let s=0;s<=sides;s++){
      const a=s/sides*TAU,nn=norm(add(mulS(ref,Math.cos(a)),mulS(B,Math.sin(a))));
      push(add(pts[ii],mulS(nn,rr)),nn,id);
    }
  }
  for(let i=0;i<n;i++)for(let s=0;s<sides;s++){
    const a=start+i*(sides+1)+s; face(a,a+sides+1,a+sides+2,a+1);
  }
  base+=(n+1)*(sides+1);
}

/* a full vertebra: body, pedicles, laminae, spinous and transverse processes */
function vertebra(id,y,z,S,o){
  o=o||{};
  const bw=S.bw, bh=S.bh, bd=S.bd, sp=S.sp, tp=S.tp, dn=S.dn===undefined?1:S.dn;
  blob(id,[0,y,z],[bw,bh,bd],{su:16,sv:10,warp:d=>[1-Math.max(0,-d[2])*0.18,1,1]});
  const arch=z-bd-0.55;
  MIR(s=>{
    blob(id,[s*bw*0.72,y,z-bd*0.75],[0.34,0.42,0.55],{su:8,sv:6});      // pedicle
    blob(id,[s*bw*0.55,y,arch],[0.50,0.44,0.42],{su:8,sv:6});           // lamina
    blob(id,[s*tp,y+0.1,arch+0.1],[tp*0.42,0.30,0.34],{su:9,sv:6});     // transverse
    blob(id,[s*bw*0.60,y+bh*0.85,z-bd*0.9],[0.26,0.28,0.26],{su:7,sv:5});  // sup. facet
    blob(id,[s*bw*0.60,y-bh*0.85,z-bd*0.9],[0.26,0.28,0.26],{su:7,sv:5});  // inf. facet
  });
  tube(id,[[0,y,arch],[0,y-sp*0.28*dn,arch-sp*0.55],[0,y-sp*0.52*dn,arch-sp*1.05]],
       [0.44,0.36,0.24],8,true);                                        // spinous
  if(o.disc!==false) blob(id,[0,y-bh-0.22,z],[bw*0.96,0.30,bd*0.96],{su:14,sv:6});
}

/* ══════════════════════ THE BODY ══════════════════════
   Centimetres. Origin at the hip joints, +Y up, +Z forward, +X to the
   subject's left. A 178 cm specimen spans y = −89 … +89.                  */
const COL={
  skin:[0.80,0.58,0.45], musc:[0.58,0.14,0.12], musc2:[0.50,0.12,0.11],
  tend:[0.88,0.84,0.72], bone:[0.90,0.84,0.70], cart:[0.76,0.80,0.80],
  brain:[0.82,0.68,0.65], cord:[0.90,0.86,0.74], nerve:[0.88,0.83,0.46],
  heart:[0.55,0.12,0.12], art:[0.72,0.11,0.15], vein:[0.19,0.28,0.55],
  lung:[0.74,0.49,0.51], trach:[0.74,0.74,0.71],
  liver:[0.44,0.14,0.10], gall:[0.34,0.46,0.22], stom:[0.76,0.51,0.44],
  intes:[0.78,0.59,0.48], colon:[0.74,0.57,0.46], spleen:[0.36,0.13,0.21],
  panc:[0.82,0.71,0.47], kid:[0.50,0.15,0.14], blad:[0.74,0.68,0.58],
  eye:[0.93,0.93,0.91], endo:[0.72,0.42,0.30], lymph:[0.62,0.70,0.58],
  fat:[0.90,0.82,0.55], dia:[0.62,0.27,0.23], nail:[0.88,0.76,0.70]
};
// [roughness, subsurface, surfaceStyle]  1 skin · 2 bone · 3 vessel · 4 nerve · 5 viscera
const MAT={ skin:[0.46,0.92,1], musc:[0.38,0.62,5], bone:[0.66,0.17,2],
  cart:[0.32,0.55,2], organ:[0.28,0.72,5], wet:[0.18,0.78,5],
  art:[0.24,0.58,3], vein:[0.28,0.52,3], nerve:[0.40,0.42,4], eye:[0.08,0.30,3] };

const SYS=[
  {id:"integ", name:"Integumentary", lat:"Integumentum commune", col:"#cf9070", on:false},
  {id:"musc",  name:"Muscular",      lat:"Systema musculare",    col:"#96241e", on:false},
  {id:"skel",  name:"Skeletal",      lat:"Systema skeletale",    col:"#e4d8bc", on:true},
  {id:"nerv",  name:"Nervous",       lat:"Systema nervosum",     col:"#ddd28a", on:true},
  {id:"art",   name:"Arterial",      lat:"Arteriae",             col:"#b81f28", on:true},
  {id:"ven",   name:"Venous",        lat:"Venae",                col:"#33518c", on:true},
  {id:"resp",  name:"Respiratory",   lat:"Systema respiratorium",col:"#b87b7e", on:true},
  {id:"dig",   name:"Digestive",     lat:"Systema digestorium",  col:"#a87a5e", on:true},
  {id:"urin",  name:"Urinary",       lat:"Systema urinarium",    col:"#7f2a26", on:true},
  {id:"endo",  name:"Endocrine",     lat:"Glandulae endocrinae", col:"#b96b4c", on:true},
  {id:"lymph", name:"Lymphatic",     lat:"Systema lymphaticum",  col:"#9fb193", on:false},
];

const PARTS=[];
const PT=window.CORPUS_PT||{parts:{},systems:{}};
SYS.forEach(S=>{if(PT.systems[S.id])S.name=PT.systems[S.id];});
function part(sys,name,lat,desc,kv,col,mat,build){
  const tr=PT.parts[name]; if(tr){name=tr[0];desc=tr[1];kv=tr[2];}
  const id=PARTS.length;
  PARTS.push({id,sys,name,lat,desc,kv:kv||{},col,mat,vs:base});
  build(id); PARTS[id].ve=base; return id;
}
const MIR=(f)=>{f(1);f(-1)};

/* ─────────────── SKELETON ─────────────── */
part("skel","Cranial vault","Calvaria",
 "Frontal, two parietals and the occipital, meeting along sutures that stay slightly mobile for decades. It is a pressure vessel more than a helmet: the volume inside is fixed, so anything that swells has nowhere to go.",
 {"Bones":"8 in the cranium","Capacity":"~1400 cm³","Thickness":"4 – 7 mm"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  blob(id,[0,80.6,-0.6],[7.4,9.3,8.7],{su:36,sv:26,warp:d=>{
    const fwd=Math.max(0,d[2]), back=Math.max(0,-d[2]), low=Math.max(0,-d[1]);
    const temple=1-Math.pow(Math.max(0,Math.abs(d[0])-0.35),1.6)*0.30;     // temporal fossa
    const occ=1+back*Math.max(0,-d[1]+0.4)*0.10;                            // occipital bun
    const brow=1+Math.max(0,fwd-0.5)*Math.max(0,d[1]-0.05)*0.16;
    return [temple*(1-low*fwd*0.34), (1-low*0.07)*brow, occ*(1-low*fwd*0.26)];
  }});
  MIR(s=>tube(id,[[s*6.0,77.6,4.6],[s*6.9,77.0,1.4],[s*6.2,76.6,-1.0]],0.55,8,true));  // zygomatic arch
  MIR(s=>blob(id,[s*6.4,75.4,-2.2],[1.3,1.5,1.3],{su:10,sv:8}));                        // mastoid
}));
part("skel","Orbits & facial skeleton","Orbitae, maxilla, os zygomaticum",
 "Seven bones ring each eye socket. The floor is paper-thin, which is why a blow to the eye can blow the orbital floor out and trap the muscle below it.",
 {"Bones per orbit":"7","Floor":"< 1 mm"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    ring(id,[[s*3.0,79.8,6.6],[s*5.6,79.6,5.4],[s*6.4,77.6,4.4],[s*5.4,75.6,4.8],
             [s*3.2,75.4,6.0],[s*2.2,77.6,6.8]],0.62,8);                    // orbital rim
    blob(id,[s*4.4,74.2,5.8],[2.0,1.5,1.6],{su:12,sv:9});                   // zygoma
  });
  blob(id,[0,73.4,5.2],[4.6,2.6,2.9],{su:22,sv:14,warp:d=>[1-Math.max(0,-d[1])*0.22,1,1]});
  blob(id,[0,77.4,6.6],[0.85,1.7,1.0],{su:10,sv:9});                        // nasal bones
  ring(id,[[-2.6,71.6,4.0],[-2.2,71.4,6.2],[0,71.3,7.0],[2.2,71.4,6.2],
           [2.6,71.6,4.0],[0,71.6,4.4]],0.42,7);                            // upper alveolar arch
}));
part("skel","Mandible","Mandibula",
 "The only mobile bone of the skull and the strongest. Its joint both hinges and slides forward, which is the difference between a jaw that opens and one that merely rotates.",
 {"Joint":"Temporomandibular","Bite force":"~700 N"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  const body=[[-4.9,71.0,0.4],[-4.7,69.6,3.2],[-3.0,68.6,5.4],[0,68.4,6.2],
              [3.0,68.6,5.4],[4.7,69.6,3.2],[4.9,71.0,0.4]];
  tube(id,body,[0.80,0.95,1.05,1.10,1.05,0.95,0.80],10,true);
  MIR(s=>{
    blob(id,[s*5.2,73.4,-0.2],[0.55,3.0,1.5],{su:10,sv:10,rot:[0,0,-s*0.09]});   // ramus
    blob(id,[s*5.3,76.5,-1.0],[0.85,0.7,1.0],{su:9,sv:7});                       // condyle
    blob(id,[s*5.0,76.2,1.9],[0.42,0.9,0.8],{su:8,sv:7});                        // coronoid
  });
  ring(id,[[-2.5,70.2,3.4],[-2.1,69.7,5.4],[0,69.6,6.1],[2.1,69.7,5.4],
           [2.5,70.2,3.4],[0,70.2,3.8]],0.36,7);                                 // lower arch
}));
part("skel","Teeth","Dentes",
 "Thirty-two in the adult set. Enamel is the hardest tissue the body makes and the only one with no living cells in it, so it never heals — every repair has to come from outside.",
 {"Adult teeth":"32","Enamel":"96% mineral"},[0.95,0.93,0.87],[0.18,0.35,2],id=>{
  for(let k=0;k<14;k++){
    const a=(k/13-0.5)*Math.PI*0.92;
    const x=Math.sin(a)*2.9, z=5.6+Math.cos(a)*1.7;
    blob(id,[x,70.7,z],[0.30,0.42,0.28],{su:7,sv:5});
    blob(id,[x*0.94,69.6,z*0.98],[0.28,0.40,0.26],{su:7,sv:5});
  }
});
part("skel","Cervical spine","Vertebrae cervicales C1–C7",
 "Seven bones balancing a five-kilogram head. The top two are unlike any others: a ring with no body at all, and below it a peg for that ring to spin on, which is where most head rotation happens.",
 {"Count":"7","Rotation at C1/C2":"~50%"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  for(let i=0;i<7;i++){
    const y=71.0-i*2.05, z=1.5+Math.sin(i/6*Math.PI)*1.2;
    if(i===0){ ring(id,[[0,y,z+1.2],[1.9,y,z+0.2],[1.6,y,z-1.6],[0,y,z-2.1],
                        [-1.6,y,z-1.6],[-1.9,y,z+0.2]],0.44,8); continue; }
    vertebra(id,y,z,{bw:1.75,bh:0.72,bd:1.15,sp:1.9,tp:2.5,dn:0.7});
  }
}));
part("skel","Thoracic spine","Vertebrae thoracicae T1–T12",
 "Twelve vertebrae, each carrying a pair of ribs on facets at its sides. Built for stability rather than movement, which is why the mid-back barely twists and the neck and low back take the strain instead.",
 {"Count":"12","Rib facets":"2 per side"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  for(let i=0;i<12;i++){
    const y=56.6-i*2.35, z=0.5-Math.sin(i/11*Math.PI)*1.7;
    vertebra(id,y,z,{bw:1.95+i*0.055,bh:0.90,bd:1.30,sp:2.7,tp:2.9,dn:1.35});
  }
}));
part("skel","Lumbar spine","Vertebrae lumbales L1–L5",
 "The largest movable vertebrae and where most back pain lives. They carry the whole upper body while still allowing it to bend, and the discs between them absorb that compromise.",
 {"Count":"5","Disc":"anulus + nucleus"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  for(let i=0;i<5;i++){
    const y=28.0-i*3.15, z=-0.4+i*0.42;
    vertebra(id,y,z,{bw:2.65,bh:1.30,bd:1.75,sp:2.6,tp:3.5,dn:0.35});
  }
}));
part("skel","Sacrum & coccyx","Os sacrum, os coccygis",
 "Five vertebrae fused into a wedge that locks the spine into the pelvis, tailing off in the vestigial coccyx. The whole weight of the trunk passes through it into the legs.",
 {"Fused":"5 + 3 or 4","Foramina":"4 pairs"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  blob(id,[0,10.6,0.4],[3.7,5.4,1.9],{su:22,sv:16,warp:d=>[
    1-Math.max(0,-d[1])*0.46, 1, 1+Math.max(0,d[2])*0.16]});
  for(let k=0;k<4;k++)MIR(s=>blob(id,[s*1.7,13.6-k*2.3,1.9],[0.5,0.5,0.4],{su:8,sv:6}));
  tube(id,[[0,4.6,1.4],[0,2.6,2.4],[0,1.4,2.8]],[0.85,0.6,0.4],8,true);
}));
part("skel","Ribs","Costae I–XII",
 "Twelve pairs. The upper seven reach the sternum by their own cartilage, three more join the cartilage above them, and the last two end free in the muscle of the flank.",
 {"Pairs":"12","True / false / floating":"7 / 3 / 2"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  for(let i=0;i<12;i++){
    const y=56.0-i*2.35;
    const w=8.0+Math.sin((i+1)/13*Math.PI)*6.2, d=5.6+Math.sin((i+1)/13*Math.PI)*4.4;
    const span=i<10?1.06:0.70, drop=1.3+i*0.34;
    MIR(s=>{
      const pts=[],n=24;
      for(let k=0;k<=n;k++){
        const t=-0.26+(Math.PI*span+0.26)*(k/n), u=k/n;
        pts.push([Math.cos(t)*s*w, y-Math.pow(u,1.45)*drop, Math.sin(t)*d-2.6]);
      }
      const rr=[]; for(let k=0;k<=n;k++)rr.push(0.42*(1-0.28*Math.abs(k/n-0.5)*2));
      tube(id,pts,rr,8,true);
    });
  }
}));
part("skel","Costal cartilage","Cartilagines costales",
 "Springs, not struts. Every breath deforms them. They stiffen and calcify with age, which is part of why an older chest wall moves less.",
 {"Tissue":"Hyaline cartilage"},COL.cart,MAT.cart,id=>{
  for(let i=0;i<7;i++){
    const y=53.8-i*2.35;
    MIR(s=>tube(id,[[s*8.2,y-0.6,5.4],[s*4.8,y+0.3,7.0],[s*1.7,y+1.0,7.5]],
      [0.42,0.40,0.36],8,true));
  }
});
part("skel","Sternum","Manubrium, corpus, processus xiphoideus",
 "Three parts that fuse over decades. It anchors the rib cartilages and is the landmark for everything in the chest, which is why compressions are measured from it.",
 {"Parts":"3","Marrow":"active in adults"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  blob(id,[0,57.4,7.4],[2.7,2.0,0.62],{su:16,sv:11});
  blob(id,[0,50.4,7.7],[2.0,5.3,0.70],{su:16,sv:13,warp:d=>[1-Math.max(0,-d[1])*0.22,1,1]});
  blob(id,[0,44.4,7.5],[0.85,1.4,0.42],{su:10,sv:8});
}));
part("skel","Clavicle","Clavicula",
 "An S-shaped strut holding the shoulder out from the chest. It is the most commonly broken bone in the body and the arm's only bony connection to the trunk.",
 {"Shape":"Double curve","Fracture":"most common"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>tube(id,[[s*1.4,58.6,7.2],[s*5.4,59.4,5.6],[s*9.8,59.2,2.4],[s*13.6,58.4,-0.2]],
    [0.62,0.66,0.62,0.78],10,true));
}));
part("skel","Scapula","Scapula",
 "A flat triangle floating on the back, held by muscle alone. That is what gives the shoulder its range, and what makes it the least stable joint in the body.",
 {"Attachment":"Muscular","Angles":"3"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*10.2,51.6,-4.6],[4.6,6.8,0.44],{su:18,sv:15,rot:[0,0,-s*0.22],warp:d=>{
      const low=Math.max(0,-d[1]);
      return [1-low*0.52, 1, 1];                       // taper to the inferior angle
    }});
    tube(id,[[s*6.0,56.4,-4.9],[s*10.4,56.6,-4.0],[s*14.4,56.2,-2.2]],
      [0.5,0.72,0.85],9,true);                          // spine of scapula
    blob(id,[s*15.2,56.0,-0.6],[1.7,0.9,1.8],{su:12,sv:9});       // acromion
    blob(id,[s*12.2,55.4,2.4],[0.9,0.7,1.5],{su:10,sv:8});        // coracoid
    blob(id,[s*14.4,54.0,-1.0],[1.2,1.7,1.1],{su:11,sv:9});       // glenoid
  });
}));
part("skel","Humerus","Humerus",
 "A ball above, a hinge below, and a shaft that the nerve to the hand winds directly against. A fracture in the middle third can drop the wrist for months.",
 {"Head":"~45 mm","At risk":"Radial nerve"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*15.0,55.6,-1.4],[2.3,2.2,2.3],{su:14,sv:11});             // head
    blob(id,[s*16.6,54.2,0.4],[1.2,1.5,1.1],{su:10,sv:8});               // greater tubercle
    shaft(id,[s*15.4,53.4,-1.0],[s*17.2,27.6,0.6],2.0,1.20,1.55,14);
    blob(id,[s*16.2,26.4,0.8],[1.35,1.0,1.3],{su:11,sv:9});              // trochlea
    blob(id,[s*18.4,26.6,0.4],[1.05,0.9,1.05],{su:10,sv:8});             // capitulum
  });
}));
part("skel","Radius & ulna","Radius, ulna",
 "Two bones so the hand can rotate. The radius rolls over the ulna through nearly 180 degrees, which is the whole difference between palm up and palm down.",
 {"Rotation":"~170°","Hinge":"Ulna"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*18.9,26.2,-0.6],[0.9,1.6,0.9],{su:10,sv:9});              // olecranon
    shaft(id,[s*18.6,25.2,-0.2],[s*19.4,4.2,0.8],1.15,0.62,0.80,11);     // ulna
    shaft(id,[s*16.0,25.4,1.6],[s*17.6,4.0,2.2],0.85,0.60,1.15,11);      // radius
    blob(id,[s*17.7,3.4,2.2],[1.05,0.8,1.0],{su:10,sv:8});
  });
}));
part("skel","Carpus","Ossa carpi",
 "Eight small bones in two rows. No single one moves much; together they let the wrist bend and deviate at once. The scaphoid is the one that breaks and refuses to heal.",
 {"Bones":"8 per wrist","Rows":"2"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{ for(let r=0;r<2;r++)for(let c=0;c<4;c++)
    blob(id,[s*(16.6+c*1.05),2.3-r*1.15,1.6+(r?0.2:0)],[0.55,0.52,0.62],{su:9,sv:7}); });
}));
part("skel","Metacarpals & phalanges","Ossa metacarpi, phalanges",
 "Nineteen bones per hand beyond the wrist. The thumb's carpometacarpal joint is a saddle, which is what lets it swing across the palm — the single joint most responsible for human dexterity.",
 {"Bones":"19 per hand","Thumb joint":"Saddle"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    for(let f=0;f<5;f++){
      const th=f===0, x0=s*(15.3+f*1.42), sp=th?s*2.2:0, len=th?3.4:4.6-Math.abs(f-2.5)*0.5;
      shaft(id,[x0-sp,0.6,1.8+(th?1.4:0)],[x0-sp*1.5,0.6-len,2.2+(th?2.0:0)],0.40,0.26,0.36,8);
      let y=0.6-len, z=2.2+(th?2.0:0);
      const nph=th?2:3;
      for(let p=0;p<nph;p++){
        const pl=(th?2.6:3.0)-p*0.7;
        shaft(id,[x0-sp*1.6,y-0.1,z],[x0-sp*1.8,y-0.1-pl,z+0.25],0.32-p*0.05,0.22-p*0.04,0.26-p*0.05,7);
        y-=pl+0.1;
      }
    }
  });
}));
part("skel","Pelvis","Os coxae",
 "Three bones fused each side. The ring below the socket is the obturator foramen, a real hole rather than a marking, and the whole shape differs enough between sexes to be the most reliable bone for identification.",
 {"Fused":"Ilium, ischium, pubis","Foramen":"Obturator"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*8.8,11.4,-0.4],[1.05,6.6,6.0],{su:22,sv:17,rot:[0,0,-s*0.30],warp:d=>{
      const low=Math.max(0,-d[1]);
      return [1+Math.max(0,d[1])*0.25, 1-low*0.30, 1-low*0.22];        // flaring iliac wing
    }});
    tube(id,[[s*4.6,16.4,-3.2],[s*8.6,16.6,-0.4],[s*10.4,15.2,3.4],[s*8.8,12.4,5.6]],
      [0.7,0.95,0.85,0.7],9,true);                                      // iliac crest
    blob(id,[s*8.6,0.6,0.4],[2.4,2.4,2.4],{su:15,sv:11,warp:d=>
      1-Math.max(0,d[0]*s)*0.30});                                      // acetabulum
    ring(id,[[s*7.4,-1.2,2.6],[s*5.2,-3.0,3.2],[s*3.0,-3.2,3.0],[s*2.6,-1.6,2.2],
             [s*4.6,-0.2,1.4],[s*7.0,0.0,1.4]],0.78,8);                 // obturator ring
    blob(id,[s*6.4,-4.2,0.6],[1.6,1.5,1.9],{su:12,sv:9});               // ischial tuberosity
  });
  blob(id,[0,-2.6,3.6],[0.9,1.4,1.0],{su:10,sv:8});                     // pubic symphysis
}));
part("skel","Femur","Femur",
 "The longest and strongest bone. Its head sits offset from the shaft on an angled neck, converting the sideways stance of the hip into a straight column of load — at the cost of a lever arm that snaps in old age.",
 {"Neck angle":"~125°","Length":"~26% of height"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*8.6,0.6,0.6],[2.25,2.25,2.25],{su:15,sv:11});                     // head
    tube(id,[[s*8.6,0.4,0.6],[s*10.2,-2.4,0.4]],[1.35,1.55],10,false);           // neck
    blob(id,[s*11.6,-1.2,0.0],[1.5,2.2,1.5],{su:11,sv:9});                       // greater trochanter
    blob(id,[s*9.2,-4.0,-0.8],[0.85,0.9,0.85],{su:9,sv:7});                      // lesser trochanter
    shaft(id,[s*10.2,-3.0,0.2],[s*7.4,-40.6,0.4],2.35,1.75,2.30,15);
    MIR(t=>blob(id,[s*7.4+t*1.7,-42.2,0.2],[1.75,2.0,2.3],{su:12,sv:10}));       // condyles
  });
}));
part("skel","Patella","Patella",
 "A bone grown inside a tendon. Holding the quadriceps tendon away from the joint raises its leverage by about a third, for no extra muscle.",
 {"Type":"Sesamoid","Largest":"in the body"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>blob(id,[s*7.4,-41.6,3.2],[1.9,2.3,0.85],{su:14,sv:11,warp:d=>
    [1-Math.max(0,-d[1])*0.34,1,1]}));
}));
part("skel","Tibia & fibula","Tibia, fibula",
 "The tibia carries essentially all the load; the fibula carries almost none and exists mainly for muscles to pull on and to form the outer ankle. Its shin edge is subcutaneous the whole way down.",
 {"Load":"Tibia ~90%","Malleoli":"2"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*7.0,-44.0,0.8],[2.5,1.1,2.6],{su:14,sv:9});                    // tibial plateau
    shaft(id,[s*7.0,-45.0,0.8],[s*6.6,-79.4,1.4],2.15,1.35,1.55,13);
    blob(id,[s*5.6,-80.4,1.0],[1.05,1.6,1.1],{su:10,sv:9});                   // medial malleolus
    shaft(id,[s*9.7,-44.4,0.0],[s*9.4,-79.6,0.4],0.75,0.55,0.95,10);
    blob(id,[s*9.6,-81.0,0.2],[0.85,1.7,0.95],{su:10,sv:9});                  // lateral malleolus
  });
}));
part("skel","Tarsus","Ossa tarsi",
 "Seven bones, of which the talus is unique: no muscle attaches to it at all. It simply transmits the entire weight of the body from the leg into the foot.",
 {"Bones":"7","Talus":"no muscle attachments"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    blob(id,[s*7.0,-82.6,0.4],[1.9,1.5,2.4],{su:13,sv:10});                   // talus
    blob(id,[s*7.0,-85.4,-2.6],[2.1,2.0,3.4],{su:14,sv:11});                  // calcaneus
    for(let k=0;k<4;k++)blob(id,[s*(5.4+k*1.2),-85.6,2.4],[0.72,0.85,0.95],{su:9,sv:7});
  });
}));
part("skel","Metatarsals & phalanges","Ossa metatarsi, phalanges",
 "Nineteen bones forming two arches that are not rigid. The foot flattens under load and recoils, giving back perhaps a sixth of the energy of each step.",
 {"Bones":"19 per foot","Arches":"2"},COL.bone,MAT.bone,id=>rough(D.bone,()=>{
  MIR(s=>{
    for(let t=0;t<5;t++){
      const x=s*(4.8+t*1.28), L=6.0-t*0.35;
      shaft(id,[x,-86.0,3.4],[x*1.03,-87.4,3.4+L],0.42,0.28,0.38,8);
      const nph=t===0?1:2;
      let z=3.4+L;
      for(let p=0;p<nph;p++){
        const pl=(t===0?2.2:1.6)-p*0.5;
        shaft(id,[x*1.03,-87.6,z],[x*1.05,-87.8,z+pl],0.30-p*0.05,0.22,0.24,7);
        z+=pl;
      }
    }
  });
}));

/* ─────────────── NERVOUS ─────────────── */
part("nerv","Cerebrum","Cerebrum",
 "Two hemispheres of folded cortex. The folding is the point: it packs some two thousand square centimetres of sheet into a skull you can hold in two hands, and two thirds of that surface hides inside the folds.",
 {"Mass":"~1.3 kg","Cortex":"~2000 cm²","Neurons":"~86 × 10⁹"},COL.brain,MAT.organ,id=>rough(D.brain,()=>{
  MIR(s=>blob(id,[s*3.3,81.6,-0.2],[4.3,5.3,6.5],{su:44,sv:32,warp:d=>{
    // gyri: two interfering ripples, deeper on the lateral face than the medial
    const g=Math.sin(d[0]*8.5+d[2]*4.5)*Math.sin(d[1]*9.5+d[2]*3.2)*Math.sin(d[2]*6.5+d[1]*2.0);
    const g2=Math.sin(d[1]*15.0+d[0]*6.0)*0.4;
    const lat=Math.abs(d[0]);
    return 1+(g+g2)*0.052*(0.45+lat*1.0)-Math.max(0,-d[1])*0.10;
  }}));
}));
part("nerv","Cerebellum","Cerebellum",
 "A tenth of the brain's volume holding more than half its neurons, packed into leaves finer than any cortical fold. It does not decide to move; it makes the movement accurate.",
 {"Neurons":"~69 × 10⁹","Folia":"~1 mm"},[0.76,0.61,0.58],MAT.organ,id=>rough(D.brain,()=>{
  MIR(s=>blob(id,[s*2.9,74.4,-5.4],[3.2,2.1,2.6],{su:28,sv:20,warp:d=>
    1+Math.sin(d[1]*30.0+d[2]*3.0)*0.032}));
}));
part("nerv","Brainstem","Truncus encephali",
 "Midbrain, pons and medulla. Everything between brain and body passes through a structure about the width of a thumb, and it runs breathing and heart rate without ever being asked.",
 {"Parts":"3","Cranial nerves":"10 of 12"},COL.cord,MAT.organ,id=>{
  tube(id,[[0,76.4,-1.8],[0,74.6,-2.6],[0,72.6,-2.2],[0,70.4,-1.4],[0,68.6,-0.9]],
    [1.45,1.75,1.55,1.25,1.05],14,true);
});
part("nerv","Spinal cord","Medulla spinalis",
 "It ends around the first lumbar vertebra, well short of the bottom of the spine. That gap is why a needle placed below it meets only floating nerve roots rather than cord.",
 {"Ends":"~L1","Length":"~45 cm","Segments":"31"},COL.cord,MAT.organ,id=>{
  const pts=[],rr=[];
  for(let i=0;i<=30;i++){
    const t=i/30, y=68.4-t*40.6;
    pts.push([0,y,1.2-Math.sin(t*Math.PI*1.55)*2.9]);
    // two enlargements, where the limbs are wired in
    rr.push(0.72+0.28*Math.exp(-Math.pow((t-0.14)/0.10,2))+0.30*Math.exp(-Math.pow((t-0.80)/0.10,2)));
  }
  tube(id,pts,rr,12,true);
});
part("nerv","Spinal nerve roots","Radices nervorum spinalium",
 "Thirty-one pairs leave between the vertebrae, each formed from a motor root in front and a sensory root behind. The division is absolute, and it is why some injuries take movement while leaving sensation intact.",
 {"Pairs":"31","Roots":"ventral + dorsal"},COL.nerve,MAT.nerve,id=>{
  for(let i=0;i<26;i++){
    const t=i/25, y=67.0-t*39.0, z=1.2-Math.sin(t*Math.PI*1.55)*2.9;
    MIR(s=>tube(id,[[s*0.5,y,z],[s*2.0,y-0.7,z+0.4],[s*3.6,y-1.6,z+1.4]],
      [0.24,0.20,0.15],6,false));
  }
});
part("nerv","Cauda equina","Cauda equina",
 "Below the cord's end the remaining roots hang loose in fluid, named for a horse's tail. Compressed as a bundle they produce one of the few true spinal emergencies.",
 {"Roots":"L2 – S5"},COL.nerve,MAT.nerve,id=>{
  for(let k=-4;k<=4;k++)
    tube(id,[[k*0.30,27.4,-1.4],[k*0.62,20.0,-0.4],[k*1.05,13.0,0.9],[k*1.2,9.0,1.6]],
      0.17,6,false);
});
part("nerv","Brachial plexus","Plexus brachialis",
 "Five roots braid into trunks, divisions and cords before emerging as the nerves of the arm. It is the most intricate wiring in the body, and no two textbook diagrams of it quite agree.",
 {"Roots":"C5 – T1"},COL.nerve,MAT.nerve,id=>{
  MIR(s=>{
    for(let k=0;k<5;k++)
      tube(id,[[s*1.4,63.4-k*1.9,0.2],[s*4.6,60.6-k*0.9,1.2],[s*8.2,57.6,1.4]],
        0.20,6,false);
    tube(id,[[s*8.2,57.6,1.4],[s*11.4,56.0,1.0],[s*13.6,54.2,0.6]],[0.42,0.40,0.38],7,false);
  });
});
part("nerv","Median, ulnar & radial nerves","N. medianus, n. ulnaris, n. radialis",
 "Three nerves for one arm. The ulnar crosses behind the elbow with nothing but skin over it, which is the funny bone; the radial spirals round the back of the humerus and is the one a mid-shaft fracture catches.",
 {"Median":"C6 – T1","Conduction":"~60 m/s"},COL.nerve,MAT.nerve,id=>{
  MIR(s=>{
    tube(id,[[s*13.6,54.0,0.8],[s*16.0,40.0,1.2],[s*17.0,26.6,1.8],[s*18.0,10.0,2.2],
             [s*17.8,2.0,2.4]],[0.28,0.26,0.25,0.22,0.19],6,false);          // median
    tube(id,[[s*13.6,53.6,-0.4],[s*17.4,40.0,-1.4],[s*19.2,26.8,-1.0],[s*19.6,10.0,0.6],
             [s*19.0,2.0,1.4]],[0.25,0.23,0.22,0.19,0.16],6,false);          // ulnar
    tube(id,[[s*13.4,53.4,-0.8],[s*15.0,44.0,-2.4],[s*17.4,34.0,-0.6],[s*17.0,26.2,1.2],
             [s*17.4,14.0,2.6]],[0.26,0.24,0.23,0.21,0.17],6,false);         // radial
    for(let f=0;f<5;f++)
      tube(id,[[s*17.8,1.6,2.4],[s*(15.6+f*1.4),-2.0,2.8],[s*(15.4+f*1.4),-7.0,3.0]],
        0.10,5,false);
  });
});
part("nerv","Lumbosacral plexus","Plexus lumbosacralis",
 "The wiring for the leg, formed inside the pelvis against the back wall. The obturator nerve runs through the very foramen it is named for.",
 {"Roots":"L1 – S4"},COL.nerve,MAT.nerve,id=>{
  MIR(s=>{ for(let k=0;k<4;k++)
    tube(id,[[s*1.4,26.0-k*3.1,-1.4],[s*4.0,20.0-k*2.4,-2.0],[s*5.6,13.0,-2.2]],
      0.18,5,false); });
});
part("nerv","Sciatic nerve","Nervus ischiadicus",
 "The thickest nerve in the body, about as wide as a finger where it leaves the pelvis. It supplies everything below the knee, and splits partway down the thigh into two nerves that were always separate inside it.",
 {"Width":"~1.5 cm","Roots":"L4 – S3"},COL.nerve,MAT.nerve,id=>{
  MIR(s=>{
    tube(id,[[s*4.4,12.0,-1.0],[s*6.6,4.0,-2.8],[s*7.4,-6.0,-3.0],[s*7.2,-24.0,-2.0],
             [s*6.9,-38.0,-1.2]],[0.44,0.46,0.44,0.40,0.36],8,false);
    tube(id,[[s*6.9,-39.0,-1.2],[s*6.2,-56.0,-1.6],[s*6.0,-74.0,-1.0],[s*6.4,-84.0,0.6]],
      [0.26,0.24,0.20,0.16],6,false);                                    // tibial
    tube(id,[[s*7.2,-39.0,-1.4],[s*9.2,-46.0,-0.2],[s*8.4,-60.0,1.4],[s*7.6,-78.0,1.8]],
      [0.22,0.20,0.17,0.14],6,false);                                    // common fibular
  });
});
part("nerv","Femoral nerve","Nervus femoralis",
 "It leaves the pelvis in front of the hip and supplies the muscles that straighten the knee. Lose it and you cannot hold your own weight on that leg.",
 {"Roots":"L2 – L4"},COL.nerve,MAT.nerve,id=>{
  MIR(s=>tube(id,[[s*4.6,14.0,-0.8],[s*5.6,4.0,2.2],[s*6.4,-4.0,3.2],[s*6.6,-20.0,3.0],
                  [s*6.4,-34.0,2.4]],[0.26,0.28,0.26,0.22,0.18],6,false));
});
part("nerv","Vagus nerve","Nervus vagus",
 "The tenth cranial nerve, and the only one that leaves the head entirely. It runs the length of the neck and chest to the gut, carrying most of the parasympathetic supply to everything above the colon.",
 {"Cranial nerve":"X","Reaches":"to mid-colon"},[0.86,0.80,0.44],MAT.nerve,id=>{
  MIR(s=>tube(id,[[s*2.6,72.0,-0.4],[s*3.4,64.0,1.6],[s*3.0,55.0,1.8],[s*2.0,46.0,0.8],
                  [s*1.4,36.0,-0.2],[s*1.0,28.0,0.6]],
    [0.20,0.22,0.21,0.19,0.17,0.14],6,false));
});
part("nerv","Intercostal nerves","Nervi intercostales",
 "One nerve runs with an artery and a vein in the groove under each rib. Any needle going into the chest is aimed at the top of a rib, never the bottom, precisely to miss them.",
 {"Pairs":"11","Runs":"below each rib"},COL.nerve,MAT.nerve,id=>{
  for(let i=0;i<10;i++){
    const y=55.0-i*2.35, w=7.6+Math.sin((i+1)/13*Math.PI)*5.8, d=5.2+Math.sin((i+1)/13*Math.PI)*4.2;
    MIR(s=>{
      const pts=[],n=14;
      for(let k=0;k<=n;k++){
        const t=-0.2+(Math.PI*0.95+0.2)*(k/n), u=k/n;
        pts.push([Math.cos(t)*s*w*0.97, y-0.75-Math.pow(u,1.45)*(1.3+i*0.34), Math.sin(t)*d*0.97-2.6]);
      }
      tube(id,pts,0.12,5,false);
    });
  }
});

/* ─────────────── ARTERIES ─────────────── */
part("art","Heart","Cor",
 "A fist-sized pump of four chambers driving two circuits at once. It beats some two and a half billion times without maintenance, and the vessels feeding its own muscle are squeezed shut during every contraction — it can only feed itself between beats.",
 {"Chambers":"4","Output":"~5 L/min","Beats":"~2.5 × 10⁹"},COL.heart,MAT.wet,id=>rough(D.organ,()=>{
  blob(id,[-1.8,41.6,3.2],[4.9,6.3,4.5],{su:30,sv:22,rot:[0.22,0,-0.32],warp:d=>[
    1-Math.max(0,-d[1])*0.34, 1, 1+Math.max(0,d[2])*0.08]});
  blob(id,[1.2,44.0,3.0],[3.0,4.4,3.6],{su:20,sv:16,rot:[0.16,0,-0.18]});     // right ventricle
  blob(id,[-4.2,46.6,2.2],[2.4,2.0,2.2],{su:16,sv:12});                       // left atrium
  blob(id,[1.8,46.8,3.2],[2.6,2.2,2.4],{su:16,sv:12});                        // right atrium
}));
part("art","Coronary arteries","Arteriae coronariae",
 "Two vessels a few millimetres across, and the whole muscle depends on them. They arise from the aorta immediately above the valve, which is the only place in the circulation where pressure is high enough to fill them during relaxation.",
 {"Diameter":"3 – 5 mm","Fill":"during diastole"},[0.78,0.14,0.16],MAT.art,id=>{
  tube(id,[[-0.4,45.4,4.4],[-2.6,44.4,6.0],[-3.6,41.0,5.8],[-3.2,37.0,4.6],[-2.4,35.4,3.4]],
    [0.24,0.22,0.19,0.16,0.12],7,false);                                      // LAD
  tube(id,[[-0.4,45.4,4.2],[-4.4,45.0,3.0],[-6.0,42.0,1.0],[-5.2,38.0,-0.4]],
    [0.22,0.20,0.17,0.13],7,false);                                           // circumflex
  tube(id,[[0.8,45.2,4.2],[3.2,44.0,4.0],[4.2,40.0,2.2],[3.0,36.6,0.8]],
    [0.22,0.20,0.17,0.13],7,false);                                           // right coronary
});
part("art","Aorta","Aorta",
 "It leaves the heart, turns through 180 degrees and runs the length of the trunk. Its wall is elastic on purpose: it stores energy on every beat and releases it between them, which is what turns a pulse into a flow.",
 {"Diameter":"~2.5 cm","Pressure":"~120/80 mmHg"},COL.art,MAT.art,id=>{
  tube(id,[[-0.6,44.8,3.8],[-0.4,50.4,3.2],[-0.8,53.8,0.8],[-1.6,51.8,-1.8],
           [-1.4,44.0,-2.2],[-1.2,30.0,-1.8],[-1.0,18.0,-1.2],[-0.8,12.6,-0.8]],
    [1.5,1.5,1.42,1.32,1.20,1.10,1.00,0.95],16,true);
});
part("art","Aortic branches","Rami aortae",
 "Coeliac, superior and inferior mesenteric, and the renals. Between them they take about a quarter of the entire cardiac output to the gut and another fifth to the kidneys, at rest.",
 {"Coeliac":"T12","Renals":"~20% of output"},COL.art,MAT.art,id=>{
  tube(id,[[-1.1,25.4,-1.6],[-1.6,25.0,0.4],[-3.4,25.6,1.6]],[0.5,0.44,0.36],8,false);
  tube(id,[[-1.1,23.0,-1.6],[-1.4,21.0,0.6],[-1.8,17.0,1.4]],[0.5,0.42,0.34],8,false);
  MIR(s=>tube(id,[[-1.0,22.2,-1.8],[s*3.4,22.2,-2.8],[s*5.6,22.0,-3.2]],
    [0.42,0.40,0.36],8,false));
  tube(id,[[-1.0,15.0,-1.2],[-1.6,12.0,0.2],[-2.0,8.0,0.8]],[0.34,0.30,0.24],7,false);
});
part("art","Carotid arteries","A. carotis communis, interna, externa",
 "The brain's supply, splitting at the angle of the jaw into a branch for the brain and one for the face. Four seconds of interruption and consciousness begins to go.",
 {"Brain flow":"~750 mL/min","Bifurcation":"~C4"},COL.art,MAT.art,id=>{
  MIR(s=>{
    tube(id,[[s*1.6,55.4,1.6],[s*2.4,62.0,2.4],[s*3.2,68.6,2.4]],[0.58,0.55,0.50],10,true);
    tube(id,[[s*3.2,68.8,2.4],[s*3.8,73.0,1.2],[s*3.6,77.0,0.0]],[0.40,0.36,0.30],8,false);
    tube(id,[[s*3.2,68.8,2.6],[s*4.4,72.6,3.6],[s*4.8,77.0,4.2]],[0.36,0.30,0.24],8,false);
  });
});
part("art","Circle of Willis","Circulus arteriosus cerebri",
 "A ring of arteries at the base of the brain, joining both carotids and the vertebral supply. It is a redundancy loop: block one feed and the ring can, sometimes, carry the load.",
 {"Feeds":"4 vessels","Complete in":"~50% of people"},[0.80,0.16,0.18],MAT.art,id=>{
  ring(id,[[0,77.6,1.4],[2.2,77.4,0.4],[2.4,77.0,-1.6],[0,76.8,-2.4],
           [-2.4,77.0,-1.6],[-2.2,77.4,0.4]],0.22,7);
  MIR(s=>tube(id,[[s*2.4,77.2,-0.6],[s*4.6,78.4,0.4],[s*5.4,80.0,1.6]],0.17,6,false));
});
part("art","Subclavian & brachial","A. subclavia, axillaris, brachialis",
 "The arm's supply, crossing the first rib and passing under the collarbone. It is where a blood-pressure cuff listens, and the pulse felt in the crook of the elbow.",
 {"Landmark":"1st rib"},COL.art,MAT.art,id=>{
  MIR(s=>{
    tube(id,[[s*1.2,55.4,0.8],[s*6.4,57.6,1.2],[s*12.6,54.8,0.6],[s*15.4,40.0,1.0],
             [s*16.8,27.0,1.8],[s*17.6,10.0,2.2]],
      [0.72,0.66,0.58,0.50,0.42,0.32],9,true);
    tube(id,[[s*17.6,9.0,2.2],[s*18.4,2.0,2.4],[s*18.0,-1.0,2.6]],[0.26,0.22,0.18],7,false);
    for(let f=0;f<5;f++)
      tube(id,[[s*18.0,-1.2,2.6],[s*(15.6+f*1.4),-3.6,3.0],[s*(15.4+f*1.4),-8.4,3.2]],
        0.09,5,false);
  });
});
part("art","Iliac & femoral","A. iliaca communis, externa, femoralis",
 "The aorta ends by forking in two at about the level of the navel. The femoral artery below is large, superficial and easy to find, which makes it the usual door into the arterial system.",
 {"Bifurcation":"~L4"},COL.art,MAT.art,id=>{
  MIR(s=>tube(id,[[s*0.6,12.2,-0.8],[s*4.0,6.0,-0.6],[s*6.2,0.0,1.6],[s*6.8,-14.0,2.0],
                  [s*6.6,-34.0,1.2],[s*6.2,-43.0,-0.6],[s*6.2,-62.0,0.2],[s*6.4,-79.0,0.8]],
    [0.92,0.84,0.76,0.68,0.58,0.50,0.40,0.32],10,true));
});
part("art","Pulmonary trunk","Truncus pulmonalis",
 "The only artery in the body carrying blue blood. This circuit runs at about a fifth of systemic pressure, which is why the right side of the heart is so much thinner than the left.",
 {"Pressure":"~25/10 mmHg"},[0.44,0.26,0.44],MAT.art,id=>{
  tube(id,[[0.8,46.6,3.6],[0.4,50.8,1.6],[-1.0,51.6,-0.2]],[1.1,1.05,0.95],12,true);
  MIR(s=>tube(id,[[s*0.8,51.4,-0.2],[s*4.6,50.2,-0.8],[s*7.6,48.6,-1.0]],
    [0.80,0.70,0.58],9,true));
});

part("art","Arterial tree","Arteriolae, rami terminales",
 "Real vasculature branches roughly twenty times between the aorta and a capillary, each generation thinner but more numerous, so total cross-section rises even as each vessel narrows. Blood leaves the heart at half a metre per second and arrives at the tissues at less than a millimetre.",
 {"Generations":"~20","Capillaries":"~10¹⁰","Total length":"~100,000 km"},[0.74,0.13,0.16],MAT.art,id=>{
  _sd=8101;
  MIR(s=>{                                              // arm
    vtree(id,[s*17.6,10.0,2.2],[s*0.16,-1,0.05],0.30,3.4,7,
      {spread:0.40,min:0.04,hub:[s*18.4,0,2.4],rad:3.6});
    vtree(id,[s*16.2,34.0,1.4],[s*0.22,-1,0.10],0.22,3.0,6,
      {spread:0.42,min:0.04,hub:[s*17.4,0,1.8],rad:3.4});
  });
  MIR(s=>{                                              // leg
    vtree(id,[s*6.4,-46.0,0.4],[s*0.04,-1,0.04],0.42,4.2,7,
      {spread:0.36,min:0.045,hub:[s*6.8,0,0.8],rad:4.4});
    vtree(id,[s*6.8,-16.0,2.0],[s*0.08,-1,0.08],0.30,4.0,6,
      {spread:0.38,min:0.045,hub:[s*7.2,0,1.6],rad:6.2});
  });
  MIR(s=>vtree(id,[s*3.6,77.0,0.2],[s*0.55,0.75,0.2],0.20,2.0,6,
    {spread:0.52,min:0.035,hub:[0,0,-0.4],rad:9.6}));                                    // scalp
  vtree(id,[-1.8,17.0,1.4],[-0.2,-0.45,0.85],0.32,2.6,6,
    {spread:0.72,min:0.045,hub:[0,0,1.6],rad:9.0});                                      // mesenteric
  vtree(id,[-1.6,25.6,1.4],[-0.6,0.15,0.8],0.30,2.2,5,
    {spread:0.78,min:0.045,hub:[0,0,1.6],rad:9.0});
});
part("art","Pulmonary capillary bed","Rete capillare pulmonale",
 "The bronchial tree and the arterial tree branch together, twig for twig, until a capillary and an alveolus are separated by less than a micron of tissue. That single thin sheet is where all gas exchange happens.",
 {"Barrier":"< 1 µm","Surface":"~70 m²"},[0.52,0.24,0.38],MAT.art,id=>{
  _sd=4242;
  MIR(s=>{
    vtree(id,[s*7.6,48.4,-1.0],[s*0.5,-0.8,0.25],0.42,2.8,7,
      {spread:0.52,min:0.045,hub:[s*8.4,0,0.2],rad:5.4});
    vtree(id,[s*7.2,44.0,-0.6],[s*0.45,-0.7,0.45],0.30,2.4,6,
      {spread:0.56,min:0.045,hub:[s*8.4,0,0.2],rad:5.4});
  });
});
part("art","Hepatic & renal beds","Rami hepatici et renales",
 "A quarter of the cardiac output goes to the gut and liver, another fifth to the kidneys, at rest and doing nothing. Between them these two beds take almost half of everything the heart pumps.",
 {"Liver":"~25%","Kidneys":"~20%"},[0.68,0.16,0.16],MAT.art,id=>{
  _sd=909;
  vtree(id,[3.4,26.4,2.8],[0.6,0.05,0.3],0.34,2.0,6,{spread:0.78,min:0.045,hub:[5.0,0,2.2],rad:8.0});
  vtree(id,[1.2,27.6,1.6],[-0.75,0.1,0.35],0.26,1.7,5,{spread:0.82,min:0.045,hub:[-2.0,0,2.4],rad:5.0});
  MIR(s=>vtree(id,[s*5.6,22.0,-3.2],[s*0.8,0.05,0.2],0.26,1.4,5,
    {spread:0.85,min:0.04,hub:[s*6.4,0,-3.4],rad:2.6}));
});
part("art","Cerebral arteries","Arteriae cerebri",
 "They run in the folds of the cortex before diving in. The brain is two percent of body mass and takes a fifth of the blood, and unlike other organs it can store nothing — interruption is measured in seconds.",
 {"Flow":"~15% of output","Reserve":"none"},[0.76,0.16,0.20],MAT.art,id=>{
  _sd=5150;
  MIR(s=>{
    vtree(id,[s*2.6,77.4,-0.6],[s*0.7,0.5,0.5],0.20,1.9,6,
      {spread:0.62,min:0.035,hub:[0,0,-0.4],rad:8.2});
    vtree(id,[s*2.4,77.0,-1.4],[s*0.6,0.25,-0.72],0.17,1.7,5,
      {spread:0.66,min:0.035,hub:[0,0,-0.4],rad:8.2});
  });
});

/* ─────────────── VEINS ─────────────── */
part("ven","Superior vena cava","Vena cava superior",
 "Everything above the diaphragm drains here at almost no pressure. It is thin-walled and collapsible, and what fills it depends as much on breathing and posture as on the heart.",
 {"Pressure":"~5 mmHg"},COL.vein,MAT.vein,id=>{
  tube(id,[[2.8,55.4,0.6],[2.6,50.6,1.4],[2.4,46.6,2.2]],[1.25,1.30,1.35],12,true);
  MIR(s=>tube(id,[[2.6,55.6,0.6],[s*5.0,57.8,1.0],[s*11.0,56.0,0.6]],[0.9,0.8,0.7],9,false));
});
part("ven","Inferior vena cava","Vena cava inferior",
 "The largest vein in the body, running up the right of the spine and piercing the diaphragm on its way to the heart. Lying flat on your back, a pregnant uterus can compress it enough to drop blood pressure.",
 {"Diameter":"~2 cm","Pierces":"diaphragm at T8"},COL.vein,MAT.vein,id=>{
  tube(id,[[1.8,11.6,-1.0],[2.0,20.0,-1.6],[2.2,28.0,-1.4],[2.4,36.0,-0.4],
           [2.5,42.0,1.4],[2.5,45.8,2.4]],[1.10,1.20,1.30,1.40,1.45,1.40],12,true);
  MIR(s=>tube(id,[[2.0,22.0,-1.8],[s*3.6,22.2,-2.8],[s*5.6,22.0,-3.2]],
    [0.42,0.40,0.36],8,false));                                        // renal veins
});
part("ven","Hepatic portal vein","Vena portae hepatis",
 "The only vein that does not head for the heart. Everything absorbed by the gut goes to the liver first, which is why a drug swallowed and a drug injected are not the same drug.",
 {"Carries":"gut venous blood","Flow":"~1 L/min"},[0.24,0.30,0.50],MAT.vein,id=>{
  tube(id,[[-1.0,18.0,1.2],[0.6,21.0,1.6],[2.4,24.4,2.4],[3.6,26.6,3.0]],
    [0.55,0.62,0.66,0.60],9,true);
  tube(id,[[-2.4,15.0,1.6],[-1.6,17.4,1.4],[-1.0,18.0,1.2]],[0.34,0.40,0.44],7,false);
  tube(id,[[-6.6,24.4,-0.6],[-4.0,21.6,0.6],[-1.0,18.4,1.2]],[0.32,0.38,0.44],7,false);
});
part("ven","Jugular veins","V. jugularis interna et externa",
 "The head's drainage. The internal jugular sits in a sheath with the carotid and the vagus; the external runs superficially across the sternocleidomastoid and is the one that stands out when you strain.",
 {"Pulse":"visible, not palpable"},COL.vein,MAT.vein,id=>{
  MIR(s=>{
    tube(id,[[s*3.4,56.0,2.6],[s*4.2,62.0,3.2],[s*4.6,69.0,3.0],[s*4.4,74.0,1.6]],
      [0.66,0.62,0.55,0.44],9,true);
    tube(id,[[s*4.2,56.6,4.2],[s*5.6,62.0,4.4],[s*6.0,69.0,3.2]],[0.36,0.32,0.26],7,false);
  });
});
part("ven","Cephalic & basilic veins","V. cephalica, v. basilica, v. mediana cubiti",
 "The superficial veins of the arm, the ones visible under the skin. The median cubital joins them across the front of the elbow, and is where most blood is drawn from because it lies over a tendon rather than an artery.",
 {"Used for":"venepuncture","Depth":"subcutaneous"},[0.24,0.32,0.58],MAT.vein,id=>{
  MIR(s=>{
    tube(id,[[s*15.2,53.0,3.2],[s*17.4,40.0,3.4],[s*18.4,27.4,3.2],[s*19.4,14.0,3.0],
             [s*19.0,3.0,3.0]],[0.30,0.28,0.26,0.24,0.20],7,false);            // cephalic
    tube(id,[[s*15.8,52.0,1.0],[s*18.2,40.0,-0.6],[s*19.6,27.6,0.4],[s*20.2,14.0,1.6],
             [s*19.6,3.0,2.2]],[0.28,0.26,0.25,0.22,0.19],7,false);            // basilic
    tube(id,[[s*18.4,27.6,3.0],[s*19.2,26.0,1.8],[s*19.6,27.4,0.6]],0.22,6,false);
    for(let f=0;f<5;f++)
      tube(id,[[s*19.2,2.4,2.8],[s*(15.6+f*1.4),-2.4,3.2],[s*(15.4+f*1.4),-7.6,3.4]],
        0.11,5,false);
  });
});
part("ven","Great saphenous vein","Vena saphena magna",
 "The longest vein in the body, running the whole length of the leg just under the skin on the inner side. It is the vein most often harvested for a coronary bypass, because the leg can spare it.",
 {"Length":"~75 cm","Valves":"~15"},[0.24,0.32,0.58],MAT.vein,id=>{
  MIR(s=>tube(id,[[s*4.2,2.0,3.0],[s*4.6,-14.0,3.4],[s*4.4,-32.0,3.0],[s*4.2,-44.0,2.0],
                  [s*4.4,-62.0,2.2],[s*5.0,-79.0,1.8],[s*5.6,-83.0,1.4]],
    [0.34,0.32,0.30,0.28,0.26,0.22,0.18],7,false));
});
part("ven","Femoral & popliteal veins","V. femoralis, v. poplitea",
 "The deep veins, running with their arteries and squeezed by every calf contraction. That pumping is what returns blood uphill; stand still for long enough and it stops working.",
 {"Pump":"calf muscle","Valves":"one-way"},COL.vein,MAT.vein,id=>{
  MIR(s=>tube(id,[[s*1.6,11.6,-0.8],[s*4.6,6.0,-1.0],[s*7.0,0.0,0.8],[s*7.4,-14.0,1.2],
                  [s*7.2,-34.0,0.4],[s*6.8,-43.0,-1.4],[s*6.8,-62.0,-0.6],[s*6.8,-79.0,0.2]],
    [0.95,0.88,0.80,0.72,0.62,0.54,0.44,0.34],9,true));
});
part("ven","Azygos system","Vena azygos, hemiazygos",
 "A chain up the back of the chest linking the two venae cavae. It is normally a minor drain, but if the inferior cava is blocked it can enlarge and carry the whole return from the lower body.",
 {"Role":"collateral route"},[0.22,0.30,0.54],MAT.vein,id=>{
  tube(id,[[1.6,14.0,-2.6],[1.8,26.0,-3.0],[2.0,38.0,-2.8],[2.4,50.0,-2.2],
           [2.6,54.4,-0.4],[2.8,55.2,0.4]],[0.34,0.38,0.40,0.42,0.44,0.46],8,false);
  tube(id,[[-1.4,14.0,-2.8],[-1.6,26.0,-3.2],[-1.6,38.0,-3.0],[0.6,44.0,-2.8]],
    [0.24,0.26,0.28,0.28],7,false);
});

part("ven","Venous tree","Venulae, rami tributarii",
 "The venous side holds about two thirds of all the blood in the body at any moment. It is a reservoir as much as a return path, and constricting it is how the body raises pressure without the heart working harder.",
 {"Holds":"~65% of blood volume","Valves":"in limbs"},[0.22,0.30,0.58],MAT.vein,id=>{
  _sd=2718;
  MIR(s=>{
    vtree(id,[s*19.2,8.0,2.8],[s*0.14,-1,0.10],0.28,3.2,7,
      {spread:0.40,min:0.04,hub:[s*18.6,0,2.6],rad:3.6});
    vtree(id,[s*17.8,32.0,3.2],[s*0.20,-1,0.05],0.22,2.8,6,
      {spread:0.42,min:0.04,hub:[s*17.4,0,2.4],rad:3.6});
    vtree(id,[s*4.6,-46.0,2.4],[s*0.04,-1,0.04],0.34,4.0,7,
      {spread:0.36,min:0.045,hub:[s*6.4,0,1.6],rad:4.4});
    vtree(id,[s*7.2,-20.0,-1.0],[s*0.08,-1,-0.08],0.30,3.8,6,
      {spread:0.38,min:0.045,hub:[s*7.2,0,0.6],rad:6.2});
    vtree(id,[s*4.6,70.0,3.0],[s*0.5,0.8,0.25],0.18,1.7,5,
      {spread:0.56,min:0.035,hub:[0,0,0.4],rad:7.0});
  });
});

/* ─────────────── RESPIRATORY ─────────────── */
part("resp","Right lung","Pulmo dexter",
 "Three lobes, and slightly the larger despite sitting on the liver. Inside, the airway divides about twenty-three times to end in three hundred million alveoli — a surface the size of a tennis court folded into a chest.",
 {"Lobes":"3","Alveoli":"~300 million","Surface":"~70 m²"},COL.lung,MAT.organ,id=>rough(D.organ,()=>{
  blob(id,[8.2,45.4,0.2],[5.3,12.6,6.2],{su:30,sv:24,rot:[0,0,0.09],warp:d=>[
    1-Math.max(0,-d[0])*0.44, 1-Math.max(0,-d[1])*0.12, 1-Math.max(0,-d[0])*0.20]});
}));
part("resp","Left lung","Pulmo sinister",
 "Two lobes, with a scoop bitten out of its front edge where the heart sits. That notch is why the heart can be heard, and reached, through the left chest wall.",
 {"Lobes":"2","Feature":"Cardiac notch"},COL.lung,MAT.organ,id=>rough(D.organ,()=>{
  blob(id,[-8.4,45.4,0.2],[5.1,12.6,6.2],{su:30,sv:24,rot:[0,0,-0.09],warp:d=>{
    const notch=Math.max(0,d[0])*Math.max(0,d[2])*Math.max(0,-d[1]+0.30);
    return [1-Math.max(0,d[0])*0.44-notch*0.85, 1, 1-Math.max(0,d[0])*0.20-notch*0.6];
  }});
}));
part("resp","Trachea & bronchial tree","Trachea, bronchi, bronchioli",
 "Held open by cartilage rings that are deliberately incomplete at the back, so the oesophagus behind can bulge into the gap as you swallow. The right main bronchus is steeper, which is where inhaled objects end up.",
 {"Rings":"16 – 20","Generations":"~23"},COL.trach,MAT.cart,id=>{
  tube(id,[[0,70.6,2.2],[0,63.0,1.8],[0,55.0,1.2],[0,51.4,0.8]],[0.95,0.95,0.90,0.85],14,true);
  for(let i=0;i<12;i++)blob(id,[0,69.6-i*1.62,2.15-i*0.10],[1.08,0.22,1.08],{su:16,sv:6});
  MIR(s=>{
    tube(id,[[0,51.4,0.8],[s*2.4,50.0,0.4],[s*4.6,48.4,0.0]],[0.72,0.62,0.52],10,true);
    for(let b=0;b<3;b++){
      const yy=48.0-b*3.4;
      tube(id,[[s*4.6,48.2,0.0],[s*6.4,yy,0.4],[s*8.0,yy-2.4,0.8]],
        [0.40,0.30,0.20],7,false);
      tube(id,[[s*6.4,yy,0.4],[s*7.4,yy-0.6,-2.0],[s*8.4,yy-2.0,-3.4]],
        [0.26,0.18,0.12],6,false);
    }
  });
});
part("resp","Diaphragm","Diaphragma",
 "The muscle that actually breathes you. It domes upward at rest and flattens when it contracts, dropping the pressure in the chest so that air falls in. It has never stopped for more than a few minutes of your life.",
 {"Nerve":"Phrenic, C3–C5","Openings":"3"},COL.dia,MAT.musc,id=>rough(D.musc,()=>{
  blob(id,[0,33.2,0.4],[13.2,5.4,9.2],{su:30,sv:18,warp:d=>[
    1, Math.max(0,d[1])>0?1:0.14, 1]});
  MIR(s=>tube(id,[[s*1.4,31.0,-2.4],[s*2.0,26.0,-2.0],[s*2.4,20.0,-1.4]],
    [0.9,0.7,0.5],8,false));                                    // crura
}));
part("resp","Pleura","Pleura visceralis et parietalis",
 "Two slippery films with a few millilitres of fluid between them. There is no space there in health — the lung is held to the chest wall by suction alone, and a hole anywhere lets it fall away.",
 {"Fluid":"~10 mL","Pressure":"−5 cmH₂O"},[0.86,0.80,0.76],[0.14,0.60,3],id=>{
  MIR(s=>blob(id,[s*8.3,45.4,0.2],[5.7,13.0,6.6],{su:24,sv:18,rot:[0,0,s*0.09],
    warp:d=>[1-Math.max(0,-d[0]*s)*0.44,1,1-Math.max(0,-d[0]*s)*0.20]}));
});

/* ─────────────── DIGESTIVE ─────────────── */
part("dig","Oesophagus","Oesophagus",
 "Twenty-five centimetres of muscular tube that owes nothing to gravity. Its waves are strong enough to swallow upside down, and the ring of muscle at its lower end is all that keeps acid where it belongs.",
 {"Length":"~25 cm","Transit":"~8 s"},COL.stom,MAT.wet,id=>rough(D.gut,()=>{
  tube(id,[[0,68.4,0.4],[-0.4,58.0,-0.6],[-0.8,46.0,-1.8],[-1.4,36.0,-1.6],[-2.0,31.2,-0.8]],
    [0.70,0.72,0.72,0.74,0.80],10,true);
}));
part("dig","Stomach","Gaster",
 "A muscular bag that grinds as much as it dissolves. It holds acid at about pH 1.5 and survives it only by replacing its own lining every few days.",
 {"pH":"1.5 – 3.5","Capacity":"~1 L","Emptying":"2 – 4 h"},COL.stom,MAT.wet,id=>rough(D.gut,()=>{
  blob(id,[-4.4,25.6,1.4],[5.4,5.8,3.8],{su:28,sv:20,rot:[0,0.28,0.42],warp:d=>[
    1+Math.max(0,-d[0])*0.34, 1, 1+Math.max(0,-d[0])*0.10]});
  tube(id,[[-1.2,21.4,2.0],[1.0,20.0,1.4],[2.6,21.2,0.6]],[0.95,0.75,0.85],10,true);
}));
part("dig","Liver","Hepar",
 "The largest internal organ and the busiest. It makes bile, stores sugar, builds most of the proteins in plasma and detoxifies nearly everything absorbed from the gut. It is also the only organ that will grow back.",
 {"Mass":"~1.5 kg","Blood":"~1.4 L/min","Regenerates":"yes"},COL.liver,MAT.organ,id=>rough(D.organ,()=>{
  blob(id,[4.4,28.6,2.2],[9.2,4.9,6.2],{su:32,sv:20,rot:[0,0,0.09],warp:d=>[
    1-Math.max(0,-d[0])*0.34, 1-Math.max(0,-d[1])*0.30, 1-Math.max(0,-d[2])*0.16]});
  blob(id,[-3.8,27.8,2.8],[3.4,3.0,4.2],{su:20,sv:15,warp:d=>[1,1-Math.max(0,-d[1])*0.28,1]});
}));
part("dig","Gallbladder","Vesica biliaris",
 "A reservoir that concentrates bile up to tenfold between meals and squeezes it out when fat arrives. It can be removed entirely with little consequence, which tells you how optional the storage is.",
 {"Capacity":"~50 mL"},COL.gall,MAT.wet,id=>{
  blob(id,[2.4,24.6,5.2],[1.4,2.3,1.4],{su:14,sv:12,rot:[0.32,0,0]});
  tube(id,[[2.2,22.6,4.4],[1.6,21.2,3.0],[1.0,20.2,1.8]],[0.24,0.20,0.18],6,false);
});
part("dig","Pancreas","Pancreas",
 "Two glands sharing one organ. Most of it makes enzymes strong enough to digest the pancreas itself, which is exactly what happens in pancreatitis; scattered through it are the islets that make insulin.",
 {"Islets":"~1 million","Enzymes":"exocrine"},COL.panc,MAT.organ,id=>rough(D.organ,()=>{
  tube(id,[[6.2,22.2,-1.6],[2.2,23.0,-2.0],[-2.4,23.6,-2.2],[-6.8,24.2,-1.8]],
    [1.0,1.5,1.7,1.2],12,true);
  tube(id,[[-6.4,23.8,-1.6],[-2.0,23.2,-1.4],[2.6,22.4,-1.0],[3.4,21.4,0.2]],
    [0.16,0.18,0.20,0.18],5,false);                              // pancreatic duct
}));
part("dig","Spleen","Splen",
 "Not digestive at all, but it lives here. It filters worn red cells out of the blood and stores a reserve of white ones. It is fragile, and the organ most often ruptured in blunt trauma.",
 {"Filters":"~350 L blood/day","Fragile":"yes"},COL.spleen,MAT.organ,id=>rough(D.organ,()=>{
  blob(id,[-9.6,27.0,-2.2],[2.6,4.0,3.0],{su:20,sv:16,rot:[0,0.38,0.18],
    warp:d=>[1,1,1-Math.max(0,d[0])*0.24]});
}));
part("dig","Small intestine","Duodenum, jejunum, ileum",
 "Six metres coiled into the space of a melon. Folds, villi and microvilli multiply its surface roughly six hundred times, to something near the floor area of a squash court.",
 {"Length":"~6 m","Surface":"~30 m²","Transit":"3 – 5 h"},COL.intes,MAT.wet,id=>rough(D.gut,()=>{
  tube(id,[[2.6,21.0,0.8],[4.6,19.0,0.0],[4.2,15.6,-0.6],[1.6,14.6,-0.4],[-0.8,15.6,0.6]],
    [0.95,1.0,1.0,0.95,0.9],9,true);                             // duodenal C
  const pts=[];
  for(let i=0;i<=190;i++){
    const t=i/190, a=t*TAU*7.6;
    const rr=6.4-Math.abs(t-0.5)*3.0;
    pts.push([Math.cos(a)*rr*(0.86+0.24*Math.sin(t*12.5)),
              15.6-t*12.6+Math.sin(a*1.8)*1.6,
              Math.sin(a)*rr*0.60+1.4+Math.cos(t*9)*0.9]);
  }
  tube(id,pts,1.40,9,true);
}));
part("dig","Large intestine","Caecum, colon, appendix",
 "It frames the small intestine on three sides. Little is absorbed here beyond water and salt, and most of what happens is done by the hundred trillion bacteria living in it rather than by you.",
 {"Length":"~1.5 m","Transit":"12 – 48 h","Bacteria":"~10¹⁴"},COL.colon,MAT.wet,id=>rough(D.gut,()=>{
  const spine=[[7.8,5.6,0.8],[8.6,12.0,0.6],[9.0,20.0,0.2],[8.4,26.4,-0.6],
               [4.0,28.4,-0.8],[-2.0,28.8,-1.0],[-7.8,27.4,-0.8],[-9.2,21.6,-0.6],
               [-8.8,13.6,-0.4],[-7.4,7.6,-0.8],[-4.2,3.6,-1.4],[-1.4,0.6,-2.0]];
  // haustra: the sacculated wall of the colon, not a smooth pipe
  const pts=[],rr=[];
  for(let i=0;i<spine.length-1;i++)for(let k=0;k<7;k++){
    const t=k/7;
    pts.push([lerp(spine[i][0],spine[i+1][0],t),lerp(spine[i][1],spine[i+1][1],t),
              lerp(spine[i][2],spine[i+1][2],t)]);
    rr.push(1.95+0.34*Math.sin((i*7+k)*1.35));
  }
  pts.push(spine[spine.length-1]); rr.push(1.7);
  tube(id,pts,rr,11,true);
  blob(id,[7.6,3.8,1.2],[2.5,2.4,2.4],{su:18,sv:13});
  tube(id,[[7.2,2.2,1.8],[6.0,0.2,2.6],[4.8,-0.8,2.2]],[0.40,0.34,0.26],7,true);
}));
part("dig","Rectum","Rectum",
 "The last fifteen centimetres, and a sensory organ as much as a conduit. It can tell solid from liquid from gas — a discrimination the rest of the gut cannot make.",
 {"Length":"~15 cm"},COL.colon,MAT.wet,id=>{
  tube(id,[[-1.0,-0.4,-2.0],[-0.4,-4.0,-1.4],[0,-7.8,-0.4]],[1.7,1.5,1.05],10,true);
});
part("dig","Salivary glands","Glandulae salivariae",
 "Three pairs producing about a litre and a half a day. Digestion of starch begins in the mouth, before anything is swallowed, and stops only when stomach acid finally denatures the enzyme.",
 {"Pairs":"3","Output":"~1.5 L/day"},[0.80,0.66,0.58],MAT.organ,id=>{
  MIR(s=>{ blob(id,[s*5.8,73.2,0.6],[1.7,2.0,1.5],{su:12,sv:9});
           blob(id,[s*3.6,69.6,3.0],[1.1,0.9,1.2],{su:10,sv:8}); });
});

/* ─────────────── URINARY ─────────────── */
part("urin","Kidneys","Renes",
 "They filter the whole blood volume roughly every half hour, making 180 litres of filtrate a day and reclaiming all but one or two. Almost all of the work is undoing their own filtration.",
 {"Filtrate":"~180 L/day","Urine":"~1.5 L/day","Nephrons":"~1 million each"},COL.kid,MAT.organ,id=>rough(D.organ,()=>{
  MIR(s=>blob(id,[s*6.4,21.8,-3.4],[2.4,4.5,2.6],{su:24,sv:18,rot:[0,0,-s*0.10],
    warp:d=>[1, 1, 1-Math.max(0,-d[0]*s)*0.48]}));
}));
part("urin","Ureters","Ureteres",
 "Two thin muscular tubes that do not simply drain — they squeeze urine downhill in waves. A stone caught in one produces pain widely described as the worst there is.",
 {"Length":"~28 cm","Lumen":"~3 mm"},[0.78,0.72,0.64],MAT.wet,id=>{
  MIR(s=>tube(id,[[s*6.0,18.2,-3.0],[s*5.2,10.0,-2.2],[s*3.6,2.0,-0.8],[s*1.6,-2.4,0.6]],
    [0.32,0.30,0.28,0.26],7,true));
});
part("urin","Bladder","Vesica urinaria",
 "A muscular balloon whose lining folds flat when empty and stretches thin when full. The urge arrives at about a third of capacity, which is a generous margin for error.",
 {"Capacity":"~500 mL","First urge":"~150 mL"},COL.blad,MAT.wet,id=>rough(D.organ,()=>{
  blob(id,[0,-2.8,2.6],[4.0,3.4,3.4],{su:22,sv:17,warp:d=>[1,1-Math.max(0,d[1])*0.22,1]});
  tube(id,[[0,-6.0,2.4],[0,-8.4,2.0]],[0.42,0.30],7,true);
}));

/* ─────────────── ENDOCRINE ─────────────── */
part("endo","Pituitary gland","Hypophysis",
 "A pea hanging beneath the brain in its own pocket of bone. It is often called the master gland, though it is really a relay: the hypothalamus above it does the deciding.",
 {"Mass":"~0.5 g","Lobes":"2"},[0.86,0.62,0.52],MAT.organ,id=>{
  blob(id,[0,76.4,1.4],[0.62,0.55,0.62],{su:12,sv:9});
  tube(id,[[0,77.4,1.4],[0,76.8,1.4]],0.18,6,false);
});
part("endo","Thyroid gland","Glandula thyroidea",
 "A butterfly across the front of the windpipe. It sets the metabolic rate of every cell in the body, and to do it needs iodine — an element the body cannot make and must find in food.",
 {"Mass":"~25 g","Needs":"iodine"},[0.72,0.36,0.30],MAT.organ,id=>{
  MIR(s=>blob(id,[s*1.9,64.0,2.6],[1.15,2.3,1.15],{su:14,sv:11,rot:[0,0,-s*0.14]}));
  blob(id,[0,63.4,2.9],[1.0,0.55,0.7],{su:10,sv:7});
  MIR(s=>blob(id,[s*2.0,65.0,1.8],[0.28,0.28,0.24],{su:8,sv:6}));   // parathyroids
});
part("endo","Adrenal glands","Glandulae suprarenales",
 "Caps sitting on the kidneys, unrelated to them in function. The outer layer makes the hormones that keep you alive from day to day; the core makes the adrenaline that changes everything within seconds.",
 {"Mass":"~5 g each","Layers":"cortex + medulla"},[0.88,0.80,0.62],MAT.organ,id=>{
  MIR(s=>blob(id,[s*6.0,26.4,-3.4],[1.6,1.0,1.5],{su:14,sv:10,warp:d=>[
    1,1-Math.max(0,-d[1])*0.35,1]}));
});
part("endo","Thymus","Thymus",
 "Large in a child and mostly fat by middle age. Every T-cell you will ever have was schooled here, most of it before you were old enough to remember.",
 {"Peak":"puberty","Trains":"T lymphocytes"},[0.84,0.74,0.62],MAT.organ,id=>{
  MIR(s=>blob(id,[s*1.6,52.6,5.4],[1.5,3.4,1.2],{su:12,sv:11}));
});
part("endo","Pancreatic islets","Insulae pancreaticae",
 "A million clusters scattered through the pancreas, together weighing about a gram. They are two percent of the organ and the reason the other ninety-eight percent gets talked about so rarely.",
 {"Count":"~1 million","Mass":"~1 g total"},[0.92,0.80,0.44],MAT.organ,id=>{
  for(let k=0;k<26;k++){
    const t=k/25, x=lerp(6.0,-6.6,t)+Math.sin(k*2.3)*0.5;
    blob(id,[x,22.4+Math.cos(k*1.7)*0.7,-1.8+Math.sin(k*3.1)*0.5],[0.28,0.28,0.28],{su:7,sv:5});
  }
});

/* ─────────────── LYMPHATIC ─────────────── */
part("lymph","Thoracic duct","Ductus thoracicus",
 "The main lymph vessel, running up the back of the chest and emptying into a vein at the base of the neck. Everything absorbed as fat from the gut travels this way, bypassing the liver entirely.",
 {"Length":"~40 cm","Carries":"~4 L/day"},[0.78,0.84,0.72],[0.22,0.50,3],id=>{
  tube(id,[[0.8,14.0,-2.6],[1.0,24.0,-3.0],[0.6,36.0,-3.0],[0.2,48.0,-2.4],
           [-1.2,55.0,-1.2],[-2.6,56.6,0.4]],[0.22,0.26,0.26,0.24,0.22,0.20],7,false);
  blob(id,[0.9,13.6,-2.6],[0.6,0.9,0.6],{su:9,sv:7});          // cisterna chyli
});
part("lymph","Lymph nodes","Nodi lymphoidei",
 "Some six hundred of them, clustered where lymph converges. They are filters and meeting rooms at once: a node swells because cells are dividing inside it, not because it is infected.",
 {"Count":"~600","Clusters":"neck, axilla, groin"},COL.lymph,MAT.organ,id=>{
  const put=(x,y,z,n,sp)=>{for(let k=0;k<n;k++)
    blob(id,[x+Math.sin(k*2.7)*sp,y+Math.cos(k*1.9)*sp,z+Math.sin(k*3.3)*sp*0.6],
      [0.42,0.55,0.42],{su:8,sv:6});};
  MIR(s=>{ put(s*4.6,64.0,2.0,7,1.9); put(s*12.6,52.0,0.6,7,1.8);
           put(s*5.0,4.0,2.6,6,1.7); put(s*3.2,20.0,-1.6,5,1.6); });
  put(0,32.0,-1.6,6,2.2);
});
part("lymph","Spleen (lymphoid)","Splen — pulpa alba",
 "The white pulp inside the spleen is the largest single mass of lymphoid tissue in the body. Losing the organ leaves a permanent vulnerability to a narrow set of bacteria, and a lifelong vaccination schedule.",
 {"Tissue":"white pulp"},[0.44,0.20,0.28],MAT.organ,id=>{
  blob(id,[-9.6,27.0,-2.2],[2.15,3.4,2.5],{su:16,sv:12,rot:[0,0.38,0.18]});
});
part("lymph","Tonsils","Tonsillae",
 "A ring of lymphoid tissue guarding the entrance to the throat. It samples everything breathed and swallowed, which is exactly why it is so often the first thing to become inflamed.",
 {"Ring":"Waldeyer's"},[0.80,0.46,0.42],MAT.organ,id=>{
  MIR(s=>blob(id,[s*1.9,70.4,3.6],[0.7,0.9,0.6],{su:9,sv:7}));
  blob(id,[0,73.2,1.6],[0.8,0.5,0.6],{su:9,sv:7});
});

/* ─────────────── MUSCLES ─────────────── */
const M=(n,lat,desc,kv,build,col)=>part("musc",n,lat,desc,kv,col||COL.musc,MAT.musc,build);
M("Sternocleidomastoid","M. sternocleidomastoideus",
 "The cord that stands out when you turn your head. One side rotates the head away from itself; both together nod. It divides the neck into the triangles surgeons navigate by.",
 {"Action":"Rotate, flex neck"},id=>{
  MIR(s=>muscle(id,[[s*1.8,58.6,6.2],[s*3.4,64.0,3.4],[s*4.8,68.6,0.8],[s*5.6,72.4,-1.2]],
    [0.55,1.05,1.0,0.5],7,16));
});
M("Trapezius","M. trapezius",
 "One sheet from skull to mid-back to shoulder blade, doing three different jobs depending on which fibres fire. Most of what people call shoulder tension is its upper part.",
 {"Origin":"Occiput – T12"},id=>{
  blob(id,[0,54.0,-5.4],[15.5,13.5,2.0],{su:26,sv:18,warp:d=>[
    1-Math.max(0,-d[1])*0.58, 1, 1-Math.max(0,-d[2])*0.30]});
});
M("Deltoid","M. deltoideus",
 "The cap of the shoulder, in three parts pulling three ways. It is the only muscle that can raise the arm sideways past the first fifteen degrees.",
 {"Parts":"3"},id=>{
  MIR(s=>{ for(let k=0;k<3;k++){ const zz=-3.2+k*3.2;
    muscle(id,[[s*13.6,56.4,zz*0.7],[s*15.6,53.0,zz],[s*16.4,49.0,zz*0.8],[s*16.2,45.6,zz*0.4]],
      [1.1,2.6,2.3,0.8],6,14); }});
});
M("Pectoralis major","M. pectoralis major",
 "A fan from sternum and collarbone converging on a narrow attachment on the humerus, twisting on itself as it goes. It pulls the arm across the body.",
 {"Action":"Adduct, medially rotate"},id=>{
  MIR(s=>blob(id,[s*6.4,49.6,6.8],[6.6,7.2,2.3],{su:22,sv:16,rot:[0,0,-s*0.17],warp:d=>[
    1,1,1-Math.max(0,-d[2])*0.44]}));
});
M("Latissimus dorsi","M. latissimus dorsi",
 "The widest muscle in the body, running from the low spine and pelvis to the front of the upper arm. It is what pulls the body up to a bar.",
 {"Action":"Extend, adduct arm"},id=>{
  MIR(s=>blob(id,[s*8.0,35.0,-5.2],[7.2,12.5,2.3],{su:22,sv:17,rot:[0,0,s*0.15]}));
});
M("Serratus anterior","M. serratus anterior",
 "Finger-like slips gripping the ribs under the shoulder blade. If its nerve fails the scapula lifts off the back — a winged scapula, one of the more startling things in a physical examination.",
 {"Slips":"8 – 9"},id=>{
  MIR(s=>{ for(let k=0;k<6;k++)
    blob(id,[s*9.6,48.0-k*2.4,1.4],[1.7,0.9,4.4],{su:11,sv:8,rot:[0,0,-s*0.10]}); });
});
M("Rectus abdominis","M. rectus abdominis",
 "One strap each side of the midline, crossed by three or four tendinous bands. The bands are what make the segments visible, and their number is inherited — no amount of training adds one.",
 {"Segments":"6 – 8","Bands":"tendinous"},id=>{
  MIR(s=>{ for(let i=0;i<4;i++)
    blob(id,[s*2.4,29.4-i*6.6,7.0],[2.1,2.75,1.5],{su:15,sv:13}); });
});
M("External oblique","M. obliquus externus abdominis",
 "Fibres running as if into your pockets. With its opposite number it twists the trunk; with the rest of the wall it raises pressure inside the abdomen for anything forceful.",
 {"Action":"Rotate, compress"},id=>{
  MIR(s=>blob(id,[s*8.4,25.4,3.0],[3.4,10.2,5.0],{su:20,sv:15,rot:[0,0,s*0.21]}));
});
M("Erector spinae","M. erector spinae",
 "Three columns running the whole length of the back either side of the spine. They are the reason a spine can be a mast rather than a stack of loose blocks.",
 {"Columns":"3"},id=>{
  MIR(s=>muscle(id,[[s*2.8,54.0,-3.6],[s*3.0,32.0,-3.4],[s*3.4,10.0,-2.0]],[1.2,2.0,2.2],7,14));
});
M("Gluteus maximus","M. gluteus maximus",
 "The largest muscle in the body by mass, and unusually developed in humans. It is barely used in walking but essential to running, climbing and standing up.",
 {"Action":"Extend hip"},id=>{
  MIR(s=>blob(id,[s*7.8,3.4,-5.4],[5.6,6.8,4.4],{su:22,sv:17}));
});
M("Gluteus medius","M. gluteus medius",
 "It stops the pelvis dropping on the unsupported side each time you take a step. When it fails the walk develops an unmistakable lurch.",
 {"Action":"Abduct, stabilise"},id=>{
  MIR(s=>blob(id,[s*9.4,9.0,-2.2],[2.2,4.4,3.6],{su:16,sv:13,rot:[0,0,-s*0.2]}));
});
M("Quadriceps femoris","M. quadriceps femoris",
 "Four muscles into one tendon over the kneecap. Together they are the strongest group in the body and the only extensor the knee has.",
 {"Heads":"4","Insertion":"Patellar tendon"},id=>{
  MIR(s=>{
    muscle(id,[[s*7.4,-6.0,3.6],[s*7.4,-20.0,4.0],[s*7.4,-38.0,3.4]],[2.0,3.5,1.5],11,18);
    muscle(id,[[s*10.8,-10.0,1.4],[s*10.0,-24.0,2.0],[s*8.6,-38.0,2.0]],[1.6,3.0,1.2],10,16);
    muscle(id,[[s*4.6,-20.0,2.4],[s*5.4,-30.0,2.8],[s*6.0,-38.0,2.6]],[1.2,2.4,1.1],9,16);
    tube(id,[[s*7.4,-39.4,3.4],[s*7.4,-44.2,3.2]],[1.3,0.9],10,false);
  });
});
M("Hamstrings","M. biceps femoris, semitendinosus, semimembranosus",
 "Three muscles crossing both hip and knee, which is why they cramp and tear more than most. They decelerate the leg at the end of every stride.",
 {"Muscles":"3","Crosses":"2 joints"},id=>{
  MIR(s=>{ muscle(id,[[s*8.6,-4.0,-4.0],[s*8.8,-22.0,-3.6],[s*8.4,-40.0,-2.6]],[1.6,2.9,1.1],9,16);
           muscle(id,[[s*5.4,-4.0,-3.6],[s*5.4,-22.0,-3.4],[s*5.6,-40.0,-2.4]],[1.4,2.5,1.0],8,16); });
});
M("Sartorius","M. sartorius",
 "The longest muscle in the body, running diagonally across the thigh from the outside of the hip to the inside of the knee. Named for the cross-legged posture of a tailor.",
 {"Length":"~50 cm"},id=>{
  MIR(s=>tube(id,[[s*9.6,9.0,2.2],[s*8.0,-4.0,4.2],[s*5.6,-20.0,3.6],[s*4.2,-36.0,1.6],
                  [s*4.6,-43.0,0.6]],[0.9,1.05,1.0,0.9,0.7],9,false));
});
M("Gastrocnemius & soleus","M. gastrocnemius, m. soleus",
 "The calf, ending in the Achilles tendon. Its veins are squeezed with every step, pushing blood back up the leg — it is sometimes called the second heart.",
 {"Tendon":"Calcaneal"},id=>{
  MIR(s=>{ blob(id,[s*7.6,-52.0,-3.6],[2.1,7.0,2.6],{su:14,sv:14});
           blob(id,[s*5.4,-52.0,-3.4],[2.0,7.4,2.4],{su:14,sv:14});
           muscle(id,[[s*6.6,-58.0,-3.0],[s*6.7,-65.0,-2.9],[s*6.8,-72.0,-2.6]],[2.6,2.0,1.0],9,15);
           tube(id,[[s*6.9,-73.0,-2.6],[s*7.0,-82.0,-2.4],[s*7.0,-85.6,-2.2]],
             [0.85,0.75,0.7],9,true); });
});
M("Tibialis anterior","M. tibialis anterior",
 "The muscle down the front of the shin that lifts the foot. When its nerve fails the toe drags on every step — a foot drop.",
 {"Action":"Dorsiflex"},id=>{
  MIR(s=>{ muscle(id,[[s*5.2,-48.0,2.8],[s*5.4,-60.0,2.6],[s*5.6,-72.0,2.2]],[1.3,1.9,0.8],7,14);
           tube(id,[[s*5.6,-73.0,2.2],[s*6.0,-82.0,2.4],[s*6.2,-85.4,2.6]],
             [0.42,0.36,0.32],7,false); });
});
M("Biceps brachii","M. biceps brachii",
 "Two heads at the shoulder, one tendon at the elbow. It is also the strongest supinator of the forearm, which is why screws are threaded to tighten clockwise for a right hand.",
 {"Heads":"2","Also":"supinates"},id=>{
  MIR(s=>{ muscle(id,[[s*15.6,50.0,2.6],[s*16.2,40.0,3.0],[s*16.8,29.0,2.4]],[1.0,2.4,0.9],8,16);
           tube(id,[[s*16.8,28.0,2.4],[s*17.2,24.6,2.2]],[0.9,0.55],8,false); });
});
M("Triceps brachii","M. triceps brachii",
 "Three heads, and the only real extensor of the elbow. It is the larger of the two arm muscles, though the biceps gets the attention.",
 {"Heads":"3"},id=>{
  MIR(s=>muscle(id,[[s*16.4,50.0,-2.6],[s*17.2,40.0,-2.6],[s*18.2,28.0,-1.6]],[1.2,2.6,0.9],9,16));
});
M("Forearm flexors & extensors","Compartimenta antebrachii",
 "Twenty muscles in two compartments, almost all of them moving the hand rather than the forearm. Grip strength is generated here, not in the hand itself.",
 {"Muscles":"~20","Compartments":"2"},id=>{
  MIR(s=>{ muscle(id,[[s*17.0,23.0,2.4],[s*17.6,15.0,2.6],[s*18.2,6.0,2.2]],[1.9,2.6,0.9],10,16);
           muscle(id,[[s*18.6,23.0,-1.2],[s*19.0,15.0,-0.6],[s*19.4,6.0,0.4]],[1.8,2.4,0.8],10,16); });
});

/* ─────────────── SKIN & SURFACE ─────────────── */
part("integ","Skin","Cutis",
 "The largest organ, and the only one you can see. Two square metres of barrier, radiator and sense sheet, rebuilt entirely about once a month. Its outermost layer is already dead — you are wrapped in your own remains.",
 {"Area":"~2 m²","Mass":"~4 kg","Renewal":"~27 days","Layers":"3"},COL.skin,MAT.skin,id=>rough(D.skin,()=>{
  // head, neck, torso as one elliptical loft — bodies are wider than they are deep
  blob(id,[0,80.8,-0.2],[8.6,10.4,9.6],{su:32,sv:24,warp:d=>{
    const low=Math.max(0,-d[1]), fwd=Math.max(0,d[2]);
    return [1-low*fwd*0.30, 1-low*0.06, 1-low*fwd*0.20];
  }});
  loft(id,[
    {y:73.0,rx:5.4,rz:5.2},{y:68.0,rx:5.6,rz:5.6},{y:63.0,rx:6.6,rz:6.2},
    {y:60.0,rx:10.5,rz:7.0},{y:57.0,rx:14.6,rz:7.6},{y:52.0,rx:15.6,rz:8.4},
    {y:46.0,rx:15.0,rz:9.0},{y:40.0,rx:14.2,rz:9.0},{y:33.0,rx:13.2,rz:8.8},
    {y:26.0,rx:12.4,rz:8.4},{y:19.0,rx:12.2,rz:8.6},{y:12.0,rx:13.2,rz:9.0},
    {y:5.0, rx:14.6,rz:9.4},{y:0.0, rx:15.2,rz:9.6},{y:-5.0,rx:14.0,rz:9.4},
    {y:-9.0,rx:12.0,rz:9.0}
  ],28,true,false);
  MIR(s=>{
    // arm
    loft(id,[
      {y:53.0,x:s*15.2,rx:5.0,rz:5.0},{y:46.0,x:s*15.8,rx:4.6,rz:4.7},
      {y:38.0,x:s*16.4,rx:4.1,rz:4.2},{y:30.0,x:s*17.0,rx:3.6,rz:3.7},
      {y:26.0,x:s*17.4,rx:3.7,rz:3.6},{y:20.0,x:s*17.8,rx:3.9,rz:3.8},
      {y:12.0,x:s*18.4,rx:3.3,rz:3.2},{y:5.0, x:s*18.9,rx:2.6,rz:2.4},
      {y:2.0, x:s*18.9,rx:2.7,rz:2.0}
    ],20,true,false);
    blob(id,[s*18.8,-2.2,2.2],[3.0,4.4,1.7],{su:16,sv:13});             // palm
    for(let f=0;f<5;f++){
      const th=f===0, x=s*(15.4+f*1.42)-(th?s*2.0:0);
      tube(id,[[x,-3.4,2.4+(th?1.8:0)],[x,-6.6-(th?1.0:0),2.8+(th?2.2:0)],
               [x,-9.6+(th?2.4:0),3.0+(th?2.4:0)]],
        [0.72,0.62,0.48],8,true);
    }
    // leg
    loft(id,[
      {y:2.0,  x:s*7.4,rx:8.2,rz:9.0},{y:-6.0, x:s*7.6,rx:7.8,rz:8.4},
      {y:-16.0,x:s*7.4,rx:7.0,rz:7.6},{y:-28.0,x:s*7.2,rx:6.2,rz:6.6},
      {y:-38.0,x:s*7.0,rx:5.4,rz:5.6},{y:-43.0,x:s*6.9,rx:5.2,rz:5.4},
      {y:-48.0,x:s*6.8,rx:5.4,rz:5.8},{y:-56.0,x:s*6.8,rx:5.6,rz:6.0},
      {y:-66.0,x:s*6.8,rx:4.4,rz:4.6},{y:-76.0,x:s*6.8,rx:3.4,rz:3.4},
      {y:-81.0,x:s*6.9,rx:3.2,rz:3.2}
    ],22,false,false);
    blob(id,[s*6.9,-85.4,1.4],[3.4,4.0,7.6],{su:18,sv:14,warp:d=>[
      1,1-Math.max(0,-d[1])*0.30,1+Math.max(0,d[2])*0.10]});
  });
}));
part("integ","Eyes","Oculi",
 "Two outgrowths of the brain itself, not of the skull. The retina is neural tissue that migrated forward in development, which is why the optic nerve is properly a tract rather than a nerve at all.",
 {"Diameter":"~24 mm","Photoreceptors":"~126 million"},COL.eye,MAT.eye,id=>{
  MIR(s=>{ blob(id,[s*3.6,79.4,7.4],[1.25,1.25,1.25],{su:18,sv:14});
           blob(id,[s*3.6,79.4,8.4],[0.58,0.58,0.42],{su:14,sv:10});
           tube(id,[[s*3.6,79.4,6.2],[s*2.6,78.6,3.0],[s*1.2,78.0,0.4]],
             [0.32,0.28,0.26],7,false); });
});
part("integ","Nails","Ungues",
 "Modified skin, hardened with the same protein as hair. A fingernail takes about six months to grow out from base to tip, which makes it a slow chemical record of the preceding half year.",
 {"Growth":"~3 mm/month","Protein":"keratin"},COL.nail,[0.16,0.55,1],id=>{
  MIR(s=>{ for(let f=0;f<5;f++){
    const th=f===0, x=s*(15.4+f*1.42)-(th?s*2.0:0);
    blob(id,[x,-9.4+(th?2.4:0),3.6+(th?2.5:0)],[0.42,0.62,0.16],{su:9,sv:7});
  }});
});

/* ══════════ upload ══════════ */
const NV=V.length/3;
function abuf(arr,loc,size){
  const b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);
}
const VAO=gl.createVertexArray(); gl.bindVertexArray(VAO);
abuf(V,gl.getAttribLocation(P,"aPos"),3);
abuf(Nn,gl.getAttribLocation(P,"aNrm"),3);
abuf(ID,gl.getAttribLocation(P,"aId"),1);
const eb=gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,eb);
const IDX = NV>65535 ? new Uint32Array(IX) : new Uint16Array(IX);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,IDX,gl.STATIC_DRAW);
const IXT = NV>65535 ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
gl.bindVertexArray(null);

/* per-part lookup: colour+opacity on row 0, roughness/sss/highlight on row 1 */
const LW=512;
const lutData=new Float32Array(LW*2*4);
const LUT=gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D,LUT);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,LW,2,0,gl.RGBA,gl.FLOAT,lutData);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

let hiId=-1, ghost=1.0;
function syncLut(){
  for(const p of PARTS){
    const S=SYS.find(s=>s.id===p.sys);
    let a = S.on ? 1.0 : 0.0;
    if(S.on && p.sys==="integ") a=ghost;
    if(S.on && p.sys==="musc" && SYS.find(s=>s.id==="skel").on) a=Math.min(a,0.55+ghost*0.45);
    const i=p.id*4;
    lutData[i]=p.col[0]; lutData[i+1]=p.col[1]; lutData[i+2]=p.col[2]; lutData[i+3]=a;
    const j=(LW+p.id)*4;
    lutData[j]=p.mat[0]; lutData[j+1]=p.mat[1];
    lutData[j+2]=(p.id===hiId)?0.55:0.0; lutData[j+3]=(p.mat[2]||0)/8;
  }
  gl.bindTexture(gl.TEXTURE_2D,LUT);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,LW,2,gl.RGBA,gl.FLOAT,lutData);
}

/* ══════════ framebuffers ══════════ */
gl.getExtension("EXT_color_buffer_float");
const NEAR=1.0, FAR=900.0;
let MS,SCENE,BR,BL1,BL2,AOF,AOB,PICK,W=0,H=0,DPR=1,SAMP=4;
function mkTex(w,h,i,f,t,fl){const x=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,x);
  gl.texImage2D(gl.TEXTURE_2D,0,i,w,h,0,f,t,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,fl);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,fl);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return x}
function msFbo(w,h,n){
  const f=gl.createFramebuffer();
  const c=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,c);
  gl.renderbufferStorageMultisample(gl.RENDERBUFFER,n,gl.RGBA16F,w,h);
  const d=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,d);
  gl.renderbufferStorageMultisample(gl.RENDERBUFFER,n,gl.DEPTH_COMPONENT24,w,h);
  gl.bindFramebuffer(gl.FRAMEBUFFER,f);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.RENDERBUFFER,c);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,d);
  const ok=gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER,null); return ok?{f,w,h}:null;
}
function resFbo(w,h){
  const f=gl.createFramebuffer();
  const t=mkTex(w,h,gl.RGBA16F,gl.RGBA,gl.HALF_FLOAT,gl.LINEAR);
  const dt=mkTex(w,h,gl.DEPTH_COMPONENT24,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,gl.NEAREST);
  gl.bindFramebuffer(gl.FRAMEBUFFER,f);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,dt,0);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null); return {f,t,dt,w,h};
}
function fbo(w,h,fl,byte){
  const f=gl.createFramebuffer();
  const t=byte?mkTex(w,h,gl.RGBA8,gl.RGBA,gl.UNSIGNED_BYTE,fl||gl.LINEAR)
              :mkTex(w,h,gl.RGBA16F,gl.RGBA,gl.HALF_FLOAT,fl||gl.LINEAR);
  gl.bindFramebuffer(gl.FRAMEBUFFER,f);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
  const d=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,d);
  gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT24,w,h);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,d);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null); return {f,t,w,h};
}
function resize(){
  DPR=Math.min(devicePixelRatio||1,2);
  W=Math.max(2,Math.floor(innerWidth*DPR));H=Math.max(2,Math.floor(innerHeight*DPR));
  cv.width=W;cv.height=H;
  SAMP=Math.min(4,gl.getParameter(gl.MAX_SAMPLES)||1);
  MS=msFbo(W,H,SAMP)||msFbo(W,H,1);
  SCENE=resFbo(W,H);
  const bw=Math.max(2,W>>2),bh=Math.max(2,H>>2);
  BR=fbo(bw,bh);BL1=fbo(bw,bh);BL2=fbo(bw,bh);
  AOF=fbo(Math.max(2,W>>1),Math.max(2,H>>1));AOB=fbo(Math.max(2,W>>1),Math.max(2,H>>1));
  PICK=fbo(Math.max(2,W>>1),Math.max(2,H>>1),gl.NEAREST,true);
}
let rzT=0;addEventListener("resize",()=>{clearTimeout(rzT);rzT=setTimeout(resize,120)});resize();
const quad=(()=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);return b})();
function drawQuad(p){const l=gl.getAttribLocation(p,"aPos");
  gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.enableVertexAttribArray(l);
  gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);gl.vertexAttribDivisor(l,0);
  gl.drawArrays(gl.TRIANGLES,0,3)}

/* ══════════ camera ══════════ */
const cam={r:282,th:0,ph:1.46,tr:282,tth:0,tph:1.46,cy:1,tcy:1};
let spin=!RM,drag=null,lx=0,ly=0,moved=false;
const eye=()=>[cam.r*Math.sin(cam.ph)*Math.sin(cam.th), cam.cy+cam.r*Math.cos(cam.ph),
               cam.r*Math.sin(cam.ph)*Math.cos(cam.th)];
cv.addEventListener("pointerdown",e=>{drag=e.pointerId;lx=e.clientX;ly=e.clientY;moved=false;
  cv.setPointerCapture(e.pointerId);cv.classList.add("drag")});
cv.addEventListener("pointermove",e=>{
  if(drag===e.pointerId){
    const dx=e.clientX-lx,dy=e.clientY-ly;
    if(Math.abs(dx)+Math.abs(dy)>3)moved=true;
    cam.tth-=dx*0.007;cam.tph=Math.max(0.18,Math.min(Math.PI-0.18,cam.tph-dy*0.006));
    lx=e.clientX;ly=e.clientY;spin=false;$("#spin").classList.remove("on");
  } else hover(e.clientX,e.clientY);
});
addEventListener("pointerup",e=>{if(drag===e.pointerId){drag=null;cv.classList.remove("drag");
  if(!moved)pick(e.clientX,e.clientY)}});
cv.addEventListener("wheel",e=>{e.preventDefault();
  const old=cam.tr, next=Math.max(45,Math.min(620,old*(1+Math.sign(e.deltaY)*0.09)));
  const ny=1-2*(e.clientY/innerHeight), worldY=cam.cy+ny*Math.tan(0.34)*cam.r;
  if(next<old) cam.tcy=Math.max(-95,Math.min(95,cam.tcy+(worldY-cam.tcy)*(1-next/old)*1.6));
  else cam.tcy+= (1-cam.tcy)*(1-old/next);
  cam.tr=next},{passive:false});
let pinch=0;
cv.addEventListener("touchmove",e=>{if(e.touches.length===2){
  const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
  if(pinch)cam.tr=Math.max(45,Math.min(620,cam.tr*pinch/d));pinch=d;e.preventDefault()}},{passive:false});
addEventListener("touchend",()=>pinch=0);

/* ══════════ UI ══════════ */
const rail=$("#rail");
SYS.forEach((S,i)=>{
  const n=PARTS.filter(p=>p.sys===S.id).length;
  const b=document.createElement("button");
  b.className="sys"+(S.on?" on":""); b.dataset.s=S.id;
  b.innerHTML=`<span class="sw" style="background:${S.col}"></span>
    <span class="nm">${S.name}<em>${S.lat}</em></span><span class="ct">${n}</span>`;
  b.onclick=()=>{S.on=!S.on;b.classList.toggle("on",S.on);syncLut();stat()};
  rail.appendChild(b);
});
function stat(){
  const on=SYS.filter(s=>s.on).length;
  $("#stat").innerHTML=`<b>${PARTS.length}</b> estruturas · <b>${(NV/1000).toFixed(0)} mil</b> vértices · <b>${on}</b>/${SYS.length} sistemas`;
}
addEventListener("keydown",e=>{
  const n=parseInt(e.key,10);
  if(n>=1&&n<=SYS.length){const S=SYS[n-1];S.on=!S.on;
    $$(".sys")[n-1].classList.toggle("on",S.on);syncLut();stat();return}
  if(e.key==="Escape")closeInsp();
});
$("#all").onclick=()=>{const any=SYS.some(s=>!s.on);
  SYS.forEach((s,i)=>{s.on=any;$$(".sys")[i].classList.toggle("on",any)});syncLut();stat()};
$("#ghost").oninput=e=>{ghost=e.target.value/100;syncLut()};
$("#spin").onclick=e=>{spin=!spin;e.target.classList.toggle("on",spin)};
$("#reset").onclick=()=>{cam.tth=0;cam.tph=1.46;cam.tr=282;cam.tcy=1};
let planeMode=0, cutT=0.5;
$$("[data-pl]").forEach(b=>b.onclick=()=>{
  planeMode=+b.dataset.pl; $$("[data-pl]").forEach(x=>x.classList.toggle("on",x===b));
});
$$("[data-pl]")[0].classList.add("on");
$("#cut").oninput=e=>cutT=e.target.value/100;
function planeVec(){
  if(!planeMode)return [0,0,0,1000];
  const t=(cutT-0.5)*2;
  if(planeMode===1)return [1,0,0,t*30];      // sagittal
  if(planeMode===2)return [0,0,1,t*26];      // coronal
  return [0,1,0,t*95];                        // transverse
}

/* ══════════ picking ══════════ */
let slowFrame=0,lastT=performance.now(),tipT=0;
function readId(x,y){
  if(lost)return null;
  gl.bindFramebuffer(gl.FRAMEBUFFER,PICK.f);gl.viewport(0,0,PICK.w,PICK.h);
  gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
  gl.useProgram(P);common();gl.uniform1f(uPick,1);
  gl.bindVertexArray(VAO);gl.drawElements(gl.TRIANGLES,IX.length,IXT,0);
  gl.bindVertexArray(null);
  const px=new Uint8Array(4);
  gl.readPixels(Math.floor(x*DPR/2),Math.floor((innerHeight-y)*DPR/2),1,1,gl.RGBA,gl.UNSIGNED_BYTE,px);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  const id=px[0]+px[1]*256+px[2]*65536;
  return id>0?PARTS[id-1]:null;
}
function hover(x,y){
  if(lost||slowFrame>28)return;
  if(performance.now()-tipT<90)return; tipT=performance.now();
  const p=readId(x,y),t=$("#tip");
  if(p){t.textContent=p.name;t.style.left=x+"px";t.style.top=y+"px";t.classList.add("on")}
  else t.classList.remove("on");
}
function pick(x,y){
  const p=readId(x,y);
  if(!p){closeInsp();hiId=-1;syncLut();return}
  hiId=p.id;syncLut();
  const S=SYS.find(s=>s.id===p.sys);
  $("#isys").textContent=S.name;
  $("#iname").textContent=p.name;
  $("#ilat").textContent=p.lat;
  $("#idesc").textContent=p.desc;
  $("#ikv").innerHTML=Object.entries(p.kv).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("");
  $("#iiso").onclick=()=>{SYS.forEach((s,i)=>{s.on=(s.id===p.sys);
    $$(".sys")[i].classList.toggle("on",s.on)});syncLut();stat()};
  $("#insp").classList.add("on");
}
function closeInsp(){$("#insp").classList.remove("on");hiId=-1;syncLut()}
$("#ix").onclick=closeInsp;

/* ══════════ render ══════════ */
let VP,E=[0,0,0],t0=performance.now();
function common(){
  gl.uniformMatrix4fv(uVP,false,VP);
  gl.uniform3fv(uEye,E);
  gl.uniform1f(uTime,(performance.now()-t0)/1000);
  gl.uniform4fv(uPlane,planeVec());
  gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,LUT);
  gl.uniform1i(uLut,3);gl.uniform1f(uLutW,LW);
  gl.activeTexture(gl.TEXTURE0);
}
function frame(){
  if(lost)return;
  const now=performance.now(); slowFrame=slowFrame*0.9+(now-lastT)*0.1; lastT=now;
  const k=RM?1:0.12;
  cam.r+=(cam.tr-cam.r)*k;cam.th+=(cam.tth-cam.th)*k;cam.ph+=(cam.tph-cam.ph)*k;
  cam.cy+=(cam.tcy-cam.cy)*k;
  if(spin&&!drag)cam.tth+=0.0022;
  E=eye();
  VP=M4.mul(M4.persp(0.68,W/H,NEAR,FAR),M4.look(E,[0,cam.cy,0],[0,1,0]));

  gl.bindFramebuffer(gl.FRAMEBUFFER,MS.f);gl.viewport(0,0,W,H);
  gl.clearColor(0.006,0.016,0.040,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
  gl.useProgram(P);common();gl.uniform1f(uPick,0);
  gl.bindVertexArray(VAO);gl.drawElements(gl.TRIANGLES,IX.length,IXT,0);
  gl.bindVertexArray(null);
  gl.disable(gl.DEPTH_TEST);

  gl.bindFramebuffer(gl.READ_FRAMEBUFFER,MS.f);
  gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,SCENE.f);
  gl.blitFramebuffer(0,0,W,H,0,0,W,H,gl.COLOR_BUFFER_BIT,gl.LINEAR);
  gl.blitFramebuffer(0,0,W,H,0,0,W,H,gl.DEPTH_BUFFER_BIT,gl.NEAREST);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);

  gl.bindFramebuffer(gl.FRAMEBUFFER,AOF.f);gl.viewport(0,0,AOF.w,AOF.h);
  gl.useProgram(PA);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,SCENE.dt);
  gl.uniform1i(gl.getUniformLocation(PA,"dep"),0);
  gl.uniform2f(gl.getUniformLocation(PA,"texel"),1/AOF.w,1/AOF.h);
  gl.uniform1f(gl.getUniformLocation(PA,"uNear"),NEAR);
  gl.uniform1f(gl.getUniformLocation(PA,"uFar"),FAR);drawQuad(PA);
  gl.bindFramebuffer(gl.FRAMEBUFFER,AOB.f);gl.viewport(0,0,AOB.w,AOB.h);
  gl.useProgram(PL);gl.bindTexture(gl.TEXTURE_2D,AOF.t);
  gl.uniform1i(gl.getUniformLocation(PL,"t"),0);
  gl.uniform2f(gl.getUniformLocation(PL,"dir"),1.5/AOF.w,1.5/AOF.h);drawQuad(PL);

  gl.bindFramebuffer(gl.FRAMEBUFFER,BR.f);gl.viewport(0,0,BR.w,BR.h);
  gl.useProgram(PB);gl.bindTexture(gl.TEXTURE_2D,SCENE.t);
  gl.uniform1i(gl.getUniformLocation(PB,"t"),0);drawQuad(PB);
  for(const [s,d,dir] of [[BR,BL1,[1/BR.w,0]],[BL1,BL2,[0,1/BR.h]]]){
    gl.bindFramebuffer(gl.FRAMEBUFFER,d.f);gl.viewport(0,0,d.w,d.h);
    gl.useProgram(PL);gl.bindTexture(gl.TEXTURE_2D,s.t);
    gl.uniform1i(gl.getUniformLocation(PL,"t"),0);
    gl.uniform2f(gl.getUniformLocation(PL,"dir"),dir[0],dir[1]);drawQuad(PL);
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,W,H);
  gl.useProgram(PC);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,SCENE.t);
  gl.uniform1i(gl.getUniformLocation(PC,"t"),0);
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,BL2.t);
  gl.uniform1i(gl.getUniformLocation(PC,"b"),1);
  gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,AOB.t);
  gl.uniform1i(gl.getUniformLocation(PC,"ao"),2);
  gl.uniform1f(gl.getUniformLocation(PC,"uT"),(performance.now()-t0)/1000);
  drawQuad(PC);
  gl.activeTexture(gl.TEXTURE0);
  requestAnimationFrame(frame);
}
syncLut(); stat();
requestAnimationFrame(frame);
setTimeout(()=>$("#boot").classList.add("gone"),900);
