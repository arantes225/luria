/* TRAUBE · Laboratório de anatomia — cenas microscópicas procedurais.
   Adaptado de código MIT (licença em LICENSE-microscopia.txt): rótulos traduzidos
   para o português; nenhuma malha externa é usada, tudo é gerado por código. */
function createErythrocyteGeometry(THREE,segments=16,rings=10){
 const geometry=new THREE.SphereGeometry(1,segments,rings),a=geometry.attributes.position;
 // A closed biconcave surface: a thin center and a thicker annular rim on both faces.
 for(let i=0;i<a.count;i++){
  const x=a.getX(i),y=a.getY(i),z=a.getZ(i),rho=Math.min(1,Math.hypot(x,y));
  a.setXYZ(i,x,y,Math.sign(z||1)*Math.sqrt(Math.max(0,1-rho*rho))*(.19+.57*rho*rho));
 }
 geometry.computeVertexNormals();geometry.computeBoundingSphere();geometry.userData.biconcave=true;return geometry;
}
export function createMicroAnatomy(THREE,key){
 const group=new THREE.Group(),labels=[],updates=[],V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
 const material=(color,opacity=1)=>new THREE.MeshStandardMaterial({color,roughness:.5,metalness:0,transparent:opacity<1,opacity,depthWrite:opacity===1,side:THREE.DoubleSide});
 const mat={pink:material('#d99d9e'),red:material('#b9656b'),blue:material('#6eacc2'),gold:material('#e2ba72'),wall:material('#d8aca4',.28),teal:material('#79aaa7')};
 function mesh(geometry,m,position=[0,0,0],scale=[1,1,1]){const o=new THREE.Mesh(geometry,m);o.position.set(...position);o.scale.set(...scale);group.add(o);return o;}
 function sphere(p,r,m,scale=[1,1,1]){return mesh(new THREE.SphereGeometry(r,24,18),m,p,scale);}
 function tube(points,r,m,closed=false){const curve=new THREE.CatmullRomCurve3(points.map(p=>V(...p)),closed);mesh(new THREE.TubeGeometry(curve,100,r,10,closed),m);return curve;}
 function label(text,p){labels.push({text,position:p});}
 function flow(curve,m,count=15,rate=.1,size=.025){
  const particles=Array.from({length:count},()=>sphere([0,0,0],size,m));
  updates.push(t=>particles.forEach((p,i)=>p.position.copy(curve.getPointAt((t*rate+i/count)%1))));
 }
 function bar(a,b,r,m){const d=V(...b).sub(V(...a));const o=mesh(new THREE.CylinderGeometry(r,r,d.length(),16),m,V(...a).add(V(...b)).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return o;}
 if(key==='alveoli'){
  const air=tube([[0,0,1.05],[0,0,.65],[0,0,.35]],.115,mat.pink);flow(air,mat.teal,8,.15,.025);
  for(let i=0;i<7;i++){
   const angle=i*Math.PI*2/7,x=Math.cos(angle)*.42,y=Math.sin(angle)*.24,z=-.05+(i%2)*.24;
   const sac=sphere([x,y,z],.33,mat.wall);updates.push(t=>sac.scale.setScalar(1+.045*Math.sin(t*1.8)));
   const pts=Array.from({length:17},(_,k)=>{const a=k/16*2*Math.PI;return[x+Math.cos(a)*.34,y-.1,z+Math.sin(a)*.32];});
   const cap=tube(pts,.025,i<3?mat.blue:mat.red,true);flow(cap,i<3?mat.blue:mat.red,8,.12,.032);
  }
  const gases=Array.from({length:18},(_,i)=>sphere([0,0,0],.014,i%2?mat.teal:mat.gold));
  updates.push(t=>gases.forEach((g,i)=>{const u=(t*.2+i/18)%1,a=i*2.4;g.position.set(Math.cos(a)*(.12+.5*u),-.13,Math.sin(a)*(.12+.5*u));}));
  label('Espaço alveolar',[.2,-.2,.22]);label('Capilares alveolares',[-.48,-.26,-.28]);label('Bronquíolo',[0,0,.98]);
 }else if(key==='nephron'){
  sphere([-.38,0,.62],.32,mat.wall);
  const coil=Array.from({length:80},(_,i)=>{const a=i*.45;return[-.38+Math.cos(a)*.16,Math.sin(a)*.09,.62+Math.sin(a*.31)*.16];});
  flow(tube(coil,.022,mat.red),mat.red,14,.08);
  const path=tube([[-.15,0,.56],[.1,.03,.75],[.4,.03,.48],[.04,0,.28],[.02,0,-.65],[.3,0,-.85],[.46,0,-.62],[.45,0,.25],[.72,0,.47],[.6,0,.6],[.85,0,.7],[1,0,.32],[.96,0,-.85]],.065,mat.gold);
  flow(path,mat.teal,28,.065,.031);
  label('Glomérulo',[-.38,-.25,.62]);label('Cápsula glomerular',[-.65,0,.8]);label('Túbulo renal',[.25,0,.72]);label('Alça do néfron',[.25,0,-.82]);label('Ducto coletor',[.96,0,-.45]);
 }else if(key==='sarcomere'){
  const left=mesh(new THREE.BoxGeometry(.06,.55,1),mat.teal,[-.85,0,0]),right=mesh(new THREE.BoxGeometry(.06,.55,1),mat.teal,[.85,0,0]);
  const actin=[];
  for(let j=0;j<5;j++){
   const z=(j-2)*.18;bar([-.48,.05,z],[.48,.05,z],.035,mat.red);
   for(const side of [-1,1]){const a=bar([side*.92,-.1,z+.07],[side*.24,-.1,z+.07],.018,mat.gold);actin.push([a,side,a.position.x]);}
   for(let k=0;k<8;k++){const x=(k-3.5)*.12;bar([x,.04,z],[x+.04,-.065,z+.07],.012,mat.red);}
  }
  updates.push(t=>{const q=(1-Math.cos(t*1.6))*.5;left.position.x=-.85+.15*q;right.position.x=.85-.15*q;actin.forEach(([o,s,x])=>o.position.x=x-s*.15*q);});
  label('Linha Z',[-.85,-.2,.55]);label('Filamento fino (actina)',[-.5,-.2,.34]);label('Filamento grosso (miosina)',[.1,-.2,-.35]);
 }else if(key==='synapse'){
  sphere([0,0,.43],.55,mat.wall,[1,.6,.75]);bar([0,0,.7],[0,0,1.15],.14,mat.pink);
  mesh(new THREE.BoxGeometry(1.4,.55,.12),mat.teal,[0,0,-.35]);
  for(let i=0;i<8;i++){sphere([Math.cos(i*2.4)*.32,-.15,.4+Math.sin(i*2.4)*.18],.07,mat.gold);mesh(new THREE.BoxGeometry(.07,.15,.1),mat.blue,[(i-3.5)*.16,-.12,-.24]);}
  const transmitters=Array.from({length:24},()=>sphere([0,0,0],.021,mat.gold));
  updates.push(t=>transmitters.forEach((o,i)=>{const u=(t*.28+i/24)%1;o.position.set(Math.sin(i*2.4)*(.15+u*.4),-.17,.25-u*.48);o.material=mat.gold;}));
  label('Terminal pré-sináptico',[.4,-.2,.64]);label('Fenda sináptica',[.55,-.2,-.04]);label('Membrana pós-sináptica',[.6,-.2,-.35]);label('Vesículas de neurotransmissor',[-.32,-.2,.45]);
 }else if(key==='villi'){
  mesh(new THREE.BoxGeometry(1.8,.7,.15),mat.pink,[0,0,-.65]);
  for(let i=0;i<5;i++){
   const x=(i-2)*.36;const v=sphere([x,0,-.02],.17,mat.wall,[1,1,3.1]);
   tube([[x-.07,-.07,-.55],[x-.075,-.07,.37],[x,-.07,.47],[x+.07,-.07,.37],[x+.07,-.07,-.55]],.017,mat.red);
   const lacteal=tube([[x,.01,-.6],[x,.01,.3]],.026,mat.teal);flow(lacteal,mat.gold,9,.1,.018);
   updates.push(t=>v.rotation.y=.025*Math.sin(t*1.3+i));
  }
  label('Vilosidade intestinal',[-.7,-.2,.55]);label('Rede capilar',[0,-.2,.25]);label('Lácteo central',[.37,-.2,.1]);label('Base da mucosa',[.5,-.2,-.7]);
 }else if(key==='vessel'){
  const walls=[];
  for(const [radius,m] of [[.53,mat.pink],[.44,mat.gold],[.35,mat.red]]){
   const o=mesh(new THREE.CylinderGeometry(radius,radius,1.7,48,1,true,Math.PI*.4,Math.PI*1.2),m);o.rotation.x=Math.PI/2;
   walls.push(o);
  }
  mat.cells=material('#c72f35');mat.cells.roughness=.38;
  const cells=Array.from({length:38},()=>mesh(createErythrocyteGeometry(THREE,24,14),mat.cells,[0,0,0],[.065,.065,.065]));
  updates.push(t=>{
   const beat=.028*Math.sin(t*5.5);
   walls.forEach(o=>{o.scale.x=1+beat;o.scale.z=1+beat;});
   cells.forEach((o,i)=>{const a=i*2.4,r=.035+(i%5)*.046,speed=.3*(1-(r/.36)**2),u=(t*speed+.012*Math.sin(t*5.5)+i/38)%1;
    o.position.set(Math.cos(a)*r,Math.sin(a)*r,(u-.5)*1.7);o.rotation.set(.35*Math.sin(t+i),.25*Math.cos(t*.7+i),t*.22+i);
   });
  });
  label('Túnica externa',[.56,-.15,.62]);label('Túnica média',[.43,-.25,.25]);label('Túnica íntima',[.28,-.2,-.26]);label('Hemácias (disco bicôncavo)',[0,-.1,-.65]);
 }
 return {group,labels,tick:time=>updates.forEach(fn=>fn(time)),dispose(){group.traverse(o=>{if(o.geometry)o.geometry.dispose();});new Set(Object.values(mat)).forEach(m=>m.dispose());}};
}

/* BodyVista teaching motions v2. Geometry changes exist only in the browser.
 * The downloaded GLB and its atlas coordinate frame remain the original data.
 * All presets are gated by actual named parts; no inferred missing structures.
 */
