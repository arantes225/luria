// Geometry helpers shared by registration and its spatial regression tests.
export function surfaceField(positions,indices,step=.015){
 const cells=new Map(),put=(xi,yi,z)=>{const k=xi+':'+yi,c=cells.get(k);if(c){if(z<c[0])c[0]=z;if(z>c[1])c[1]=z;}else cells.set(k,[z,z]);};
 const add=(x,y,z)=>put(Math.round(x/step),Math.round(y/step),z);
 for(let i=0;i<indices.length;i+=3){
  const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3;
  const ax=positions[a],ay=positions[a+1],az=positions[a+2],bx=positions[b],by=positions[b+1],bz=positions[b+2],cx=positions[c],cy=positions[c+1],cz=positions[c+2];
  const span=Math.max(Math.hypot(bx-ax,by-ay),Math.hypot(cx-ax,cy-ay),Math.hypot(cx-bx,cy-by));
  const n=Math.max(1,Math.ceil(span/(step*.6)));
  for(let u=0;u<=n;u++)for(let v=0;u+v<=n;v++){
   const w=n-u-v,p=u/n,q=v/n,r=w/n;
   add(ax*p+bx*q+cx*r,ay*p+by*q+cy*r,az*p+bz*q+cz*r);
  }
 }
 return(x,y)=>{
  const xi=Math.round(x/step),yi=Math.round(y/step);
  for(let r=0;r<=8;r++){
   let z0=Infinity,z1=-Infinity,found=false;
   for(let dx=-r;dx<=r;dx++)for(let dy=-r;dy<=r;dy++){
    const c=cells.get((xi+dx)+':'+(yi+dy));
    if(c){found=true;if(c[0]<z0)z0=c[0];if(c[1]>z1)z1=c[1];}
   }
   if(found)return[z0,z1];
  }
  return[-.12,.08];
 };
}

const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const scale=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>{const l=Math.hypot(...a)||1;return [a[0]/l,a[1]/l,a[2]/l];};
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const smoothstep=t=>{const c=Math.max(0,Math.min(1,t));return c*c*(3-2*c);};

export function makeFrame(p0,p1,pSide){
 const v1=sub(p1,p0),len=Math.hypot(...v1)||1,u1=scale(v1,1/len);
 const vSide=sub(pSide,p0),u2=norm(cross(u1,vSide)),u3=cross(u1,u2);
 return {origin:p0,u1,u2,u3,len};
}

export function mapByFrames(pt,fA,fB,sc=null){
 const d=sub(pt,fA.origin),r=sc??(fB.len/fA.len);
 const x1=dot(d,fA.u1)*r,x2=dot(d,fA.u2)*r,x3=dot(d,fA.u3)*r;
 return add(fB.origin,add(scale(fB.u1,x1),add(scale(fB.u2,x2),scale(fB.u3,x3))));
}

export function classifyBoneRegion(name){
 const n=name.toLowerCase();
 const s=n.includes('left')?'left':n.includes('right')?'right':null;
 if(/clavicle|scapula/.test(n))return `girdle-${s}`;
 if(/humerus/.test(n))return `upper-arm-${s}`;
 if(/radius|ulna/.test(n))return `forearm-${s}`;
 if(/scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate|metacarpal|finger|thumb/.test(n))return `hand-${s}`;
 if(/calcaneus|talus|navicular|cuboid|cuneiform|metatarsal|toe|hallux|sesamoid/.test(n))return `foot-${s}`;
 if(/\brib\b|costal/.test(n))return 'rib';
 return 'skull';
}

export function classifyMuscleRegion(name,center){
 const n=name.toLowerCase();
 const s=n.includes('left')?'left':n.includes('right')?'right':(center[0]>0.005?'left':center[0]<-0.005?'right':null);
 if(/pollicis|digiti minimi|interosseous of hand|lumbrical.*hand|palmaris|opponens|adductor pollicis|abductor pollicis|flexor.*pollicis|extensor.*pollicis|extensor.*indicis|thenar|hypothenar|flexor retinaculum|extensor retinaculum|palmar aponeurosis/.test(n)&&!/foot|hallucis|plantar/.test(n))return `hand-${s}`;
 if(/pronator|supinator|brachioradialis|carpi|digitorum|anconeus/.test(n)&&!/foot|hallucis|plantar|brevis of foot/.test(n))return `forearm-${s}`;
 if(/biceps brachii|triceps brachii|brachialis|coracobrachialis/.test(n))return `upper-arm-${s}`;
 if(/deltoid|deltoideus|supraspinatus|infraspinatus|teres major|teres minor|subscapularis/.test(n))return `girdle-${s}`;
 if(/orbicularis|zygomaticus|masseter|temporalis|pterygoid|buccinator|risorius|nasalis|procerus|corrugator|depressor|levator labii|levator anguli|mentalis|occipitofrontalis|frontalis|auricularis|tensor veli|levator veli|uvulae|palatoglossus|palatopharyngeus|genioglossus|hyoglossus|styloglossus|rectus.*eye|obliquus.*eye|levator palpebrae|stapedius|tensor tympani/.test(n)&&!/scapulae|ani|prostatae|costarum/.test(n))return 'head';
 if(/sternohyoid|omohyoid|sternothyroid|thyrohyoid|mylohyoid|geniohyoid|digastric|stylohyoid|stylopharyngeus|constrictor of pharynx|salpingopharyngeus|cricothyroid|arytenoid|thyro-arytenoid|crico-arytenoid|vocalis|aryepiglottic|sternocleidomastoid|scalenus|longus colli|longus capitis|rectus capitis|obliquus capitis|splenius|semispinalis|longissimus capitis|cervicis|platysma|trapezius|levator scapulae/.test(n))return 'neck';
 if(/pectoralis|subclavius|serratus|intercostal|subcostal|transversus thoracis|diaphragm|latissimus dorsi|rhomboid|levator.*costarum|erector spinae|iliocostalis|longissimus|spinalis|multifidus|rotatores|semispinalis|interspinales|intertransversarii|quadratus lumborum|psoas|iliacus/.test(n))return 'thorax';
 if(center[1]>1.50)return 'head';
 if(center[1]>1.37&&Math.abs(center[0])<0.10)return 'neck';
 return 'thorax';
}

// Deterministic 3D transforms for borrowed female skeleton and upper-limb kinematic chains.
export function buildFemaleBoneTransforms(){
 const transforms={};
 for(const side of ['left','right']){
  const s=side==='left'?1:-1;
  // 1. Shoulder girdle (Clavicle + Scapula) mapped from Male to Female thoracic landmarks
  const mSterno=[s*0.020,1.418,0.036],mSpine=[0,1.420,-0.060],mAcrom=[s*0.180,1.415,-0.025];
  const fSterno=[-0.002+s*0.018,1.348,-0.028],fSpine=[-0.002,1.350,-0.115],fAcrom=[-0.002+s*0.155,1.348,-0.090];
  const fGirdleM=makeFrame(mSterno,mAcrom,mSpine),fGirdleF=makeFrame(fSterno,fAcrom,fSpine);
  transforms[`girdle-${side}`]=p=>mapByFrames(p,fGirdleM,fGirdleF,0.88);

  // 2. Upper arm (Humerus): Glenohumeral head -> Elbow
  const mShoulder=[s*0.169,1.378,-0.025],mElbow=[s*0.214,1.116,-0.027],mArmAnt=[s*0.190,1.250,0.070];
  const fShoulder=[-0.002+s*0.158,1.334,-0.095],fElbow=[-0.002+s*0.244,1.102,-0.084],fArmAnt=[-0.002+s*0.200,1.220,0.015];
  const fArmM=makeFrame(mShoulder,mElbow,mArmAnt),fArmF=makeFrame(fShoulder,fElbow,fArmAnt);
  transforms[`upper-arm-${side}`]=p=>mapByFrames(p,fArmM,fArmF);

  // 3. Forearm (Radius + Ulna): Elbow -> Wrist (matching hand wrist origin)
  const mWrist=[s*0.253,0.882,0.019],mForeAnt=[s*0.233,1.000,0.080];
  const fWrist=[-0.002+s*0.354,0.902,-0.048],fForeAnt=[-0.002+s*0.300,1.000,0.030];
  const fForeM=makeFrame(mElbow,mWrist,mForeAnt),fForeF=makeFrame(fElbow,fWrist,fForeAnt);
  transforms[`forearm-${side}`]=p=>mapByFrames(p,fForeM,fForeF);

  // 4. Hand (Carpals, Metacarpals, Phalanges): Wrist -> Middle fingertip, with lateral Thumb landmark
  const mMidTip=[s*0.276,0.738,0.087],mThumb=[s*0.317,0.809,0.065];
  const fMidTip=[-0.002+s*0.448,0.750,-0.006],fThumb=[-0.002+s*0.458,0.864,0.012];
  const fHandM=makeFrame(mWrist,mMidTip,mThumb),fHandF=makeFrame(fWrist,fMidTip,fThumb);
  transforms[`hand-${side}`]=p=>mapByFrames(p,fHandM,fHandF,0.94);

  // 5. Smooth articulated upper-limb chain for multi-joint muscles (deltoid, rotator cuff, biceps, forearm, hand)
  transforms[`limb-chain-${side}`]=p=>{
   const g=transforms[`girdle-${side}`](p);
   const u=transforms[`upper-arm-${side}`](p);
   const f=transforms[`forearm-${side}`](p);
   const h=transforms[`hand-${side}`](p);
   // 3D shoulder separation plane between scapula/clavicle origin and humerus shaft
   const dShoulder=(Math.abs(p[0])-0.156)*0.68+(1.368-p[1])*0.73;
   const wArm=smoothstep((dShoulder+0.032)/0.064);
   const gu=lerp(g,u,wArm);
   if(p[1]>=1.15)return gu;
   if(p[1]>1.08){
    const t=smoothstep((1.15-p[1])/0.07);
    return lerp(gu,f,t);
   }
   if(p[1]>=0.91)return f;
   if(p[1]>0.86){
    const t=smoothstep((0.91-p[1])/0.05);
    return lerp(f,h,t);
   }
   return h;
  };

  // 6. Foot (anchored at ankle mortise beneath Tibia/Fibula so Talus/Calcaneus stay articulated)
  transforms[`foot-${side}`]=p=>{
   const xAnkle=s*0.135,zAnkle=-0.096;
   const fwd=smoothstep((p[2]-zAnkle)/0.08);
   const xMedial=s*0.116;
   const dx=p[0]-xMedial;
   const scaleX=1-0.16*fwd;
   const x=(s*dx>0)?(xMedial+dx*scaleX-s*0.002):p[0]-s*0.002;
   const dz=p[2]-zAnkle;
   const z=dz>0?(zAnkle+dz*0.81):(zAnkle+dz*0.95);
   const y=Math.max(0.005,p[1]);
   return [x,y,z];
  };
 }

 // 7. Coherent Male-to-Female Skull & Head Muscle transform (aligns orbits with native eyeballs and cranium with brain/scalp)
 const maleSkull=p=>{
  const mx=p[0],my=p[1],mz=p[2];
  const dy=my-1.596;
  const wUp=0.5*(1+Math.tanh(dy/0.025));
  const sy=0.97*(1-wUp)+0.83*wUp;
  const fy=1.557+dy*sy;
  const crownTaper=fy>1.60?Math.max(0.84,1-(fy-1.60)*2.2):1.0;
  const fx=mx*1.01*crownTaper;
  const fz=-0.041+mz*0.96;
  return [fx,fy,fz];
 };
 transforms.maleSkull=maleSkull;
 transforms.skull=p=>maleSkull([p[0]+0.0047,p[1]+0.0540,p[2]+0.0468]);

 // 8. Coherent Neck Muscle transform (blending cranial/hyoid attachment into clavicular/sternal/cervical base)
 transforms.neckMuscle=p=>{
  const top=maleSkull(p);
  const s=p[0]>=0?'left':'right';
  const g=transforms[`girdle-${s}`](p);
  const wLat=smoothstep((Math.abs(p[0])-0.035)/0.055);
  const med=[p[0]*0.92-0.001,p[1]-0.064,p[2]*0.94-0.060];
  const bot=lerp(med,g,wLat);
  const wSkull=smoothstep((p[1]-1.415)/0.080);
  return lerp(bot,top,wSkull);
 };

 return transforms;
}

// Smooth per-Y-slice cross-section envelope of the female skin with 5-slice smoothing and linear Y interpolation.
export function skinCrossSectionClamp(positions,indices,step=.008){
 const rawSlices=new Map();
 const addPt=(x,y,z)=>{
  const yi=Math.round(y/step);
  let list=rawSlices.get(yi);
  if(!list){list=[];rawSlices.set(yi,list);}
  list.push([x,z]);
 };
 for(let i=0;i<indices.length;i+=3){
  const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3;
  const ax=positions[a],ay=positions[a+1],az=positions[a+2];
  const bx=positions[b],by=positions[b+1],bz=positions[b+2];
  const cx=positions[c],cy=positions[c+1],cz=positions[c+2];
  const span=Math.max(Math.hypot(bx-ax,by-ay),Math.hypot(cx-ax,cy-ay),Math.hypot(cx-bx,cy-by));
  const n=Math.max(1,Math.ceil(span/(step*.7)));
  for(let u=0;u<=n;u++)for(let v=0;u+v<=n;v++){
   const w=n-u-v,p=u/n,q=v/n,r=w/n;
   addPt(ax*p+bx*q+cx*r,ay*p+by*q+cy*r,az*p+bz*q+cz*r);
  }
 }
 const intervals=new Map();
 for(const [yi,pts] of rawSlices.entries()){
  pts.sort((a,b)=>a[0]-b[0]);
  const gapThr=(yi*step>0.72&&yi*step<0.93)?0.008:0.025;
  const groups=[];
  let cur=[pts[0]];
  for(let i=1;i<pts.length;i++){
   if(pts[i][0]-pts[i-1][0]>gapThr){groups.push(cur);cur=[pts[i]];}
   else cur.push(pts[i]);
  }
  groups.push(cur);
  intervals.set(yi,groups.map(g=>{
   let x0=Infinity,x1=-Infinity,z0=Infinity,z1=-Infinity;
   for(const [x,z] of g){
    if(x<x0)x0=x;if(x>x1)x1=x;
    if(z<z0)z0=z;if(z>z1)z1=z;
   }
   return {x0,x1,z0,z1,cx:(x0+x1)/2,cz:(z0+z1)/2};
  }));
 }
 // Helper to get closest interval at slice yi for x
 const getIntervalAt=(yi,x)=>{
  for(let dy=0;dy<=6;dy++){
   for(const s of dy===0?[0]:[-dy,dy]){
    const list=intervals.get(yi+s);
    if(!list)continue;
    let best=list[0],bestD=Infinity;
    for(const iv of list){
     const d=x<iv.x0?iv.x0-x:x>iv.x1?x-iv.x1:0;
     if(d<bestD){bestD=d;best=iv;}
    }
    return best;
   }
  }
  return null;
 };
 // Smooth interval lookup across [yi-2..yi+2] with continuous Y interpolation
 const sampleSmoothInterval=(x,y)=>{
  const yf=y/step,yi0=Math.floor(yf),ty=yf-yi0;
  const smoothedAt=yi=>{
   const centerIv=getIntervalAt(yi,x);
   if(!centerIv)return null;
   let x0=0,x1=0,z0=0,z1=0,wSum=0;
   const weights=[1,2,3,2,1];
   for(let k=-2;k<=2;k++){
    const iv=getIntervalAt(yi+k,centerIv.cx);
    if(iv&&Math.abs(iv.cx-centerIv.cx)<0.06){
     const w=weights[k+2];
     x0+=iv.x0*w;x1+=iv.x1*w;z0+=iv.z0*w;z1+=iv.z1*w;wSum+=w;
    }
   }
   return {x0:x0/wSum,x1:x1/wSum,z0:z0/wSum,z1:z1/wSum};
  };
  const a=smoothedAt(yi0),b=smoothedAt(yi0+1);
  if(!a)return b;if(!b)return a;
  if(Math.abs((a.x0+a.x1)-(b.x0+b.x1))>0.08)return a;
  return {
   x0:a.x0+(b.x0-a.x0)*ty,
   x1:a.x1+(b.x1-a.x1)*ty,
   z0:a.z0+(b.z0-a.z0)*ty,
   z1:a.z1+(b.z1-a.z1)*ty,
  };
 };
 const yMax=1.652,yMin=0.006;
 return(x,y,z,margin=.0025)=>{
  let cy=Math.max(yMin,Math.min(yMax,y));
  const best=sampleSmoothInterval(x,cy);
  if(!best)return[x,cy,z];
  const mx=Math.min(margin,(best.x1-best.x0)*.35);
  const mz=Math.min(margin,(best.z1-best.z0)*.35);
  const cx=Math.max(best.x0+mx,Math.min(best.x1-mx,x));
  const cz=Math.max(best.z0+mz,Math.min(best.z1-mz,z));
  return[cx,cy,cz];
 };
}

export function pelvicBowelPosition(x,y,z,name){
 const d=/^Descending colon$/i.test(name),s=/^Sigmoid colon$/i.test(name),r=/^Rectum$/i.test(name);
 if(!d&&!s&&!r&&!(y<1.06&&x>-0.03&&z>-0.13))return[x,y,z];
 const w=Math.max(0,Math.min(1,(1.055-y)/.065)),u=w*w*(3-2*w);
 const Lat=Math.exp(-Math.pow((y-.955)/.065,2));
 const R=r?1:s?Math.max(0,Math.min(1,(.92-y)/.05)):0;
 const tx=.058*(1-R)+.004*R,tz=-.094*(1-R)-.104*R;
 const nx=x+u*((tx-x)*(.58*Lat+.78*R)+.038*Lat*(1-R));
 const nz=z+u*((tz-z)*(.72*Lat+.88*R)-.028*Lat);
 const ny=y-.006*u*Lat*(1-R);
 return[nx,ny,nz];
}

export function quantizedNormals(positions,indices){
 const n=new Float32Array(positions.length);
 for(let i=0;i<indices.length;i+=3){
  const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3;
  const ux=positions[b]-positions[a],uy=positions[b+1]-positions[a+1],uz=positions[b+2]-positions[a+2];
  const vx=positions[c]-positions[a],vy=positions[c+1]-positions[a+1],vz=positions[c+2]-positions[a+2];
  const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
  for(const j of [a,b,c]){n[j]+=nx;n[j+1]+=ny;n[j+2]+=nz;}
 }
 const out=new Int16Array(positions.length);
 for(let i=0;i<n.length;i+=3){
  const l=Math.hypot(n[i],n[i+1],n[i+2])||1;
  out[i]=Math.round(Math.max(-1,Math.min(1,n[i]/l))*32767);
  out[i+1]=Math.round(Math.max(-1,Math.min(1,n[i+1]/l))*32767);
  out[i+2]=Math.round(Math.max(-1,Math.min(1,n[i+2]/l))*32767);
 }
 return out;
}
