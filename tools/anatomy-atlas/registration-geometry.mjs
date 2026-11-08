// Geometry helpers shared by registration and its spatial regression tests.
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
export const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
// Shared coordinate field for the connected colorectal meshes. The upper colon
// remains fixed. The inferior loop moves laterally/posteriorly; the same field
// is used at colorectal joins to avoid gaps.
export function pelvicBowelPosition(x,y,z,name=''){
  const w=smooth(-.160,-.030,z)*(1-smooth(.855,.980,y))*smooth(.775,.815,y);
  const lateral=1-smooth(.025,.140,Math.abs(x));
  return [x+.060*w*lateral,y,z-.030*w];
}
export function quantizedNormals(pos,idx){const sum=new Float64Array(pos.length);for(let i=0;i<idx.length;i+=3){const a=idx[i]*3,b=idx[i+1]*3,c=idx[i+2]*3,ux=pos[b]-pos[a],uy=pos[b+1]-pos[a+1],uz=pos[b+2]-pos[a+2],vx=pos[c]-pos[a],vy=pos[c+1]-pos[a+1],vz=pos[c+2]-pos[a+2],n=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx];for(const o of [a,b,c])for(let k=0;k<3;k++)sum[o+k]+=n[k];}const out=new Int16Array(pos.length);for(let i=0;i<pos.length;i+=3){const d=Math.hypot(sum[i],sum[i+1],sum[i+2])||1;for(let k=0;k<3;k++)out[i+k]=Math.round(sum[i+k]/d*32767);}return out;}
