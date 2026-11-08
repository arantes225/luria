// Geometry helpers shared by registration and its spatial regression tests.
export const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const norm=a=>Math.hypot(a[0],a[1],a[2]);
export const unit=a=>{const n=norm(a)||1;return [a[0]/n,a[1]/n,a[2]/n];};
export const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export const lerp3=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];

export function makeFrame(origin,pAxis,pRef){
  const e1=unit(sub(pAxis,origin)),v2=sub(pRef,origin),e3=unit(cross(e1,v2)),e2=unit(cross(e3,e1));
  return {origin,axes:[e1,e2,e3],len:norm(sub(pAxis,origin))};
}

export function mapByFrames(pt,srcF,dstF,customScale=null){
  const s=customScale??(dstF.len/srcF.len),rel=sub(pt,srcF.origin);
  const c0=dot(rel,srcF.axes[0])*s,c1=dot(rel,srcF.axes[1])*s,c2=dot(rel,srcF.axes[2])*s;
  return [
    dstF.origin[0]+c0*dstF.axes[0][0]+c1*dstF.axes[1][0]+c2*dstF.axes[2][0],
    dstF.origin[1]+c0*dstF.axes[0][1]+c1*dstF.axes[1][1]+c2*dstF.axes[2][1],
    dstF.origin[2]+c0*dstF.axes[0][2]+c1*dstF.axes[1][2]+c2*dstF.axes[2][2],
  ];
}

export function classifyBoneRegion(name){
  const n=name.toLowerCase(),side=n.includes('left')?'left':n.includes('right')?'right':null;
  if(/clavicle|scapula/.test(n))return `girdle-${side}`;
  if(/humerus/.test(n))return `upper-arm-${side}`;
  if(/\b(radius|ulna)\b/.test(n))return `forearm-${side}`;
  if(/metacarpal|carpal|scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate|finger|thumb/.test(n))return `hand-${side}`;
  if(/toe|metatarsal|calcaneus|talus|navicular|cuboid|cuneiform|foot/.test(n))return `foot-${side}`;
  if(/rib|costal/.test(n))return 'rib';
  return 'skull';
}

export function classifyMuscleRegion(name,c){
  const n=name.toLowerCase(),side=/^left /i.test(name)||/\bleft\b/i.test(n)?'left':/^right /i.test(name)||/\bright\b/i.test(n)?'right':null;
  if(/lumbrical|interosseous|opponens|abductor pollicis brevis|flexor pollicis brevis|adductor pollicis|abductor digiti minimi|flexor digiti minimi|palmaris brevis/.test(n)||(side&&Math.abs(c[0])>.22&&c[1]<.90))return `hand-${side}`;
  if(/brachioradialis|pronator|supinator|flexor carpi|extensor carpi|flexor digitorum|extensor digitorum|flexor pollicis longus|abductor pollicis longus|extensor pollicis|extensor indicis|extensor digiti minimi|palmaris longus|anconeus/.test(n))return `forearm-${side}`;
  if(/biceps brachii|brachialis|coracobrachialis|triceps brachii|articularis cubiti/.test(n))return `upper-arm-${side}`;
  if(/deltoid|supraspinatus|infraspinatus|subscapularis|teres major|teres minor|subclavius|pectoralis|latissimus dorsi|serratus anterior|rhomboid|levator scapulae|trapezius/.test(n))return 'girdle-or-thorax';
  return 'axial';
}

export function buildFemaleBoneTransforms(){
  const tx={};
  for(const side of ['left','right']){
    const s=side==='left'?1:-1;
    const mGirdle=makeFrame([0,1.400,.040],[s*.142,1.422,-.032],[0,1.265,.040]);
    const fGirdle=makeFrame([-.004,1.345,-.032],[-.004+s*.132,1.365,-.098],[-.004,1.220,-.032]);
    tx[`girdle-${side}`]=pt=>mapByFrames(pt,mGirdle,fGirdle,.90);

    const mSh=[s*.172,1.390,-.025],mEl=[s*.212,1.115,-.018],mElLat=[s*.242,1.115,-.018];
    const fSh=[-.002+s*.160,1.334,-.095],fEl=[s*.244,1.102,-.084],fElLat=[s*.272,1.108,-.080];
    const mArmF=makeFrame(mSh,mEl,mElLat),fArmF=makeFrame(fSh,fEl,fElLat);
    tx[`upper-arm-${side}`]=pt=>mapByFrames(pt,mArmF,fArmF);

    const mWr=[s*.246,.886,.016],mWrRad=[s*.266,.888,.014];
    const fWr=[s*.346,.916,-.053],fWrRad=[s*.366,.924,-.047];
    const mForeF=makeFrame(mEl,mWr,mWrRad),fForeF=makeFrame(fEl,fWr,fWrRad);
    tx[`forearm-${side}`]=pt=>mapByFrames(pt,mForeF,fForeF);

    const mHd=[s*.276,.738,.087],mTh=[s*.317,.809,.065];
    const fHd=[s*.432,.786,-.018],fTh=[s*.448,.865,.002];
    const mHandF=makeFrame(mWr,mHd,mTh),fHandF=makeFrame(fWr,fHd,fTh);
    tx[`hand-${side}`]=pt=>mapByFrames(pt,mHandF,fHandF,.82);

    tx[`limb-chain-${side}`]=pt=>{
      const y=pt[1];
      if(y>=1.13){
        const w=smooth(1.36,1.42,y);
        return w>0?lerp3(tx[`upper-arm-${side}`](pt),tx[`girdle-${side}`](pt),w):tx[`upper-arm-${side}`](pt);
      }
      if(y>=.905){
        const w=smooth(1.095,1.13,y);
        return w>0?lerp3(tx[`forearm-${side}`](pt),tx[`upper-arm-${side}`](pt),w):tx[`forearm-${side}`](pt);
      }
      const w=smooth(.870,.905,y);
      return w>0?lerp3(tx[`hand-${side}`](pt),tx[`forearm-${side}`](pt),w):tx[`hand-${side}`](pt);
    };

    const xMedial=s===1?.118:-.128,scX=.85,zMid=-.030,scZ=.86;
    tx[`foot-${side}`]=pt=>[
      xMedial+(pt[0]-xMedial)*scX,
      pt[1],
      zMid+(pt[2]-zMid)*scZ,
    ];
  }
  tx.skull=pt=>{
    const c=[-.005,1.545,-.045],tc=[0,1.547,-.039];
    return [tc[0]+(pt[0]-c[0])*.95,tc[1]+(pt[1]-c[1])*.96,tc[2]+(pt[2]-c[2])*.95];
  };
  return tx;
}

export function surfaceField(positions, indices, step=.008) {
  const cells=new Map(), key=(x,y)=>x+','+y;
  for(let i=0;i<indices.length;i+=3){
    const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3;
    const ax=positions[a],ay=positions[a+1],bx=positions[b],by=positions[b+1],cx=positions[c],cy=positions[c+1];
    const d=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(d)<1e-12)continue;
    for(let ix=Math.ceil(Math.min(ax,bx,cx)/step);ix<=Math.floor(Math.max(ax,bx,cx)/step);ix++)for(let iy=Math.ceil(Math.min(ay,by,cy)/step);iy<=Math.floor(Math.max(ay,by,cy)/step);iy++){
      const x=ix*step,y=iy*step,u=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/d,v=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/d,w=1-u-v;
      if(Math.min(u,v,w)<-1e-6)continue;const z=u*positions[a+2]+v*positions[b+2]+w*positions[c+2],k=key(ix,iy),old=cells.get(k)||[Infinity,-Infinity];old[0]=Math.min(old[0],z);old[1]=Math.max(old[1],z);cells.set(k,old);
    }
  }
  return (x,y)=>{let total=0,back=0,front=0;const ix=Math.round(x/step),iy=Math.round(y/step);for(let r=1;r<=5;r++){for(let dx=-r;dx<=r;dx++)for(let dy=-r;dy<=r;dy++){const c=cells.get(key(ix+dx,iy+dy));if(!c)continue;const d=(x-(ix+dx)*step)**2+(y-(iy+dy)*step)**2,k=1/(d+step*step*.1);total+=k;back+=c[0]*k;front+=c[1]*k;}if(total)return [back/total,front/total];}throw Error('Skin envelope unavailable at '+x+','+y);};
}

export function skinCrossSectionClamp(positions,indices,step=.008){
  const grid=new Map();
  for(let i=0;i<indices.length;i+=3){
    const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3;
    const ax=positions[a],ay=positions[a+1],az=positions[a+2];
    const bx=positions[b],by=positions[b+1],bz=positions[b+2];
    const cx=positions[c],cy=positions[c+1],cz=positions[c+2];
    const minX=Math.floor(Math.min(ax,bx,cx)/step),maxX=Math.ceil(Math.max(ax,bx,cx)/step);
    const minY=Math.floor(Math.min(ay,by,cy)/step),maxY=Math.ceil(Math.max(ay,by,cy)/step);
    const d=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(d)<1e-12)continue;
    for(let ix=minX;ix<=maxX;ix++)for(let iy=minY;iy<=maxY;iy++){
      const x=ix*step,y=iy*step,u=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/d,v=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/d,w=1-u-v;
      if(Math.min(u,v,w)<-.05)continue;
      const z=u*az+v*bz+w*cz,k=`${ix},${iy}`,cell=grid.get(k)||[Infinity,-Infinity];
      cell[0]=Math.min(cell[0],z);cell[1]=Math.max(cell[1],z);grid.set(k,cell);
    }
  }
  const rowIntervals=new Map();
  for(const [k,zRange] of grid.entries()){
    const [ix,iy]=k.split(',').map(Number);
    if(!rowIntervals.has(iy))rowIntervals.set(iy,[]);
    rowIntervals.get(iy).push({ix,zMin:zRange[0],zMax:zRange[1]});
  }
  for(const [iy,list] of rowIntervals.entries()){
    list.sort((a,b)=>a.ix-b.ix);
    const segs=[];
    for(const item of list){
      const last=segs[segs.length-1];
      if(!last||item.ix>last.maxIx+2)segs.push({minIx:item.ix,maxIx:item.ix,cells:new Map([[item.ix,[item.zMin,item.zMax]]])});
      else{last.maxIx=item.ix;last.cells.set(item.ix,[item.zMin,item.zMax]);}
    }
    rowIntervals.set(iy,segs);
  }
  return (x,y,z,margin=.002)=>{
    const iy=Math.max(1,Math.min(206,Math.round(y/step)));
    const segs=rowIntervals.get(iy)||rowIntervals.get(iy-1)||rowIntervals.get(iy+1);
    if(!segs||!segs.length)return [x,y,z];
    const ix=x/step;
    let bestSeg=segs[0],bestDist=Infinity;
    for(const s of segs){
      const d=ix<s.minIx?s.minIx-ix:ix>s.maxIx?ix-s.maxIx:0;
      if(d<bestDist){bestDist=d;bestSeg=s;}
    }
    const minX=(bestSeg.minIx+.8)*step,maxX=(bestSeg.maxIx-.8)*step;
    const cx=minX<maxX?Math.max(minX,Math.min(maxX,x)):(minX+maxX)/2;
    const cix=Math.max(bestSeg.minIx,Math.min(bestSeg.maxIx,Math.round(cx/step)));
    const direct=bestSeg.cells.get(cix);
    let zMin=direct?direct[0]:Infinity,zMax=direct?direct[1]:-Infinity;
    if(!direct){
      for(let dx=-1;dx<=1;dx++){
        const c=bestSeg.cells.get(cix+dx)||grid.get(`${cix+dx},${iy-1}`)||grid.get(`${cix+dx},${iy+1}`);
        if(c){zMin=Math.min(zMin,c[0]);zMax=Math.max(zMax,c[1]);}
      }
    }
    if(!Number.isFinite(zMin))return [cx,y,z];
    const lo=zMin+margin,hi=zMax-margin;
    const cz=lo<hi?Math.max(lo,Math.min(hi,z)):(zMin+zMax)/2;
    return [cx,y,cz];
  };
}

// Shared coordinate field for the connected colorectal meshes. The upper colon
// remains fixed. The inferior loop moves laterally/posteriorly; the same field
// is used at colorectal joins to avoid gaps.
export function pelvicBowelPosition(x,y,z,name=''){
  const w=smooth(-.160,-.030,z)*(1-smooth(.855,.980,y))*smooth(.775,.815,y);
  const lateral=1-smooth(.025,.140,Math.abs(x));
  return [x+.060*w*lateral,y,z-.030*w];
}

export function quantizedNormals(pos,idx){const sum=new Float64Array(pos.length);for(let i=0;i<idx.length;i+=3){const a=idx[i]*3,b=idx[i+1]*3,c=idx[i+2]*3,ux=pos[b]-pos[a],uy=pos[b+1]-pos[a+1],uz=pos[b+2]-pos[a+2],vx=pos[c]-pos[a],vy=pos[c+1]-pos[a+1],vz=pos[c+2]-pos[a+2],n=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx];for(const o of [a,b,c])for(let k=0;k<3;k++)sum[o+k]+=n[k];}const out=new Int16Array(pos.length);for(let i=0;i<pos.length;i+=3){const d=Math.hypot(sum[i],sum[i+1],sum[i+2])||1;for(let k=0;k<3;k++)out[i+k]=Math.round(sum[i+k]/d*32767);}return out;}
