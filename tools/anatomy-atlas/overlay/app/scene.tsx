import {useEffect,useRef} from 'react';
import * as T from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {createExplosionLayout} from './explosion-layout';
import {decodeModelResponse} from './model-download';
import {PointerTap} from './pointer-tap';
import {SYSTEMS,partAppearance,ptName,type Atlas,type SceneState} from './anatomy';
interface Props {atlas:Atlas;state:SceneState;onSelect:(id:string)=>void;onProgress:(n:number)=>void;onError:(s:string)=>void}
export default function AnatomyScene({atlas,state,onSelect,onProgress,onError}:Props){
 const host=useRef<HTMLDivElement>(null),latest=useRef(state),select=useRef(onSelect);
 latest.current=state;select.current=onSelect;
 useEffect(()=>{
  const el=host.current!;let disposed=false,frame=0,dirty=true,ready=false,lastView='',lastReset=-1,lastIsolate='',layoutKey='',amount=0;
  let lastState:SceneState|null=null;
  const abort=new AbortController();
  let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch{onError('Este navegador não conseguiu iniciar o visualizador 3D. Tente um navegador com WebGL ativado.');return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<768?1.5:2));renderer.setClearColor(0x000000,0);renderer.localClippingEnabled=true;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;el.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','Anatomia humana interativa. Arraste para girar, use pinça ou rolagem para aproximar e toque em uma estrutura para ver detalhes.');
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.005,100),controls=new OrbitControls(camera,renderer.domElement);
  camera.position.set(1.4,1.05,3.6);controls.target.set(0,.85,0);controls.enableDamping=true;controls.dampingFactor=.085;controls.minDistance=.07;controls.maxDistance=40;controls.maxPolarAngle=Math.PI*.96;controls.zoomToCursor=true;/* TRAUBE: zoom na direção do ponteiro */controls.addEventListener('change',()=>{dirty=true;});
  const envData=new Uint8Array(16*32*4),envTop=new T.Color(0xfff3e4),envBottom=new T.Color(0x6b4f45),envMix=new T.Color();for(let y=0;y<32;y++){envMix.copy(envBottom).lerp(envTop,Math.pow(1-y/31,.7));for(let x=0;x<16;x++){const i=(y*16+x)*4;envData[i]=envMix.r*255;envData[i+1]=envMix.g*255;envData[i+2]=envMix.b*255;envData[i+3]=255;}}
  const envSource=new T.DataTexture(envData,16,32);envSource.mapping=T.EquirectangularReflectionMapping;envSource.colorSpace=T.SRGBColorSpace;envSource.needsUpdate=true;
  const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromEquirectangular(envSource);scene.environment=env.texture;pmrem.dispose();envSource.dispose();
  scene.add(new T.AmbientLight(0xffffff,.42));scene.add(new T.HemisphereLight(0xfff8ee,0x33252d,.72));
  const key=new T.DirectionalLight(0xfff3e7,3.2);key.position.set(4.8,6.5,6.8);scene.add(key);
  const fill=new T.DirectionalLight(0xe6ecff,1.1);fill.position.set(-4.5,1.2,5.2);scene.add(fill);const warm=new T.DirectionalLight(0xff8d70,.45);warm.position.set(-3,-1.4,3.5);scene.add(warm);
  const rim=new T.DirectionalLight(0xffb7a5,1.6);rim.position.set(-4,3.5,-5.5);scene.add(rim);const back=new T.DirectionalLight(0xe9f0ff,1.0);back.position.set(3,2,-4);scene.add(back);
  const ground=new T.Mesh(new T.CircleGeometry(30,96),new T.MeshStandardMaterial({color:0xd3dbe6,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-.019;ground.visible=false;
  const platform=new T.Mesh(new T.CylinderGeometry(.68,.7,.028,100),new T.MeshStandardMaterial({color:0xf2f5f9,metalness:.12,roughness:.62}));platform.position.y=-.016;platform.visible=false;
  const ring=new T.Mesh(new T.RingGeometry(.63,.632,128),new T.MeshBasicMaterial({color:0x184888,transparent:true,opacity:.45,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.001;scene.add(ring);
  const innerRing=new T.Mesh(new T.RingGeometry(.55,.551,128),new T.MeshBasicMaterial({color:0x184888,transparent:true,opacity:.16,side:T.DoubleSide}));innerRing.rotation.x=-Math.PI/2;innerRing.position.y=.001;scene.add(innerRing);
  const width=T.MathUtils.ceilPowerOfTwo(atlas.parts.length),data=new Float32Array(width*4),partTexture=new T.DataTexture(data,width,1,T.RGBAFormat,T.FloatType);partTexture.needsUpdate=true;
  const selectedData=new Uint8Array(width*4),selectionTexture=new T.DataTexture(selectedData,width,1);selectionTexture.needsUpdate=true;
  // TRAUBE: cor (RGB, sRGB) e rugosidade (A) por peça, escolhidas pelo tecido.
  const cutPlane=new T.Plane(new T.Vector3(-1,0,0),0);let lastCut='';
  const bodyBox=new T.Box3();atlas.parts.forEach(p=>{bodyBox.expandByPoint(new T.Vector3().fromArray(p.bounds[0]));bodyBox.expandByPoint(new T.Vector3().fromArray(p.bounds[1]));});
  const tintData=new Uint8Array(width*4),detailData=new Uint8Array(width*4);atlas.parts.forEach((p,i)=>{const a=partAppearance(p);tintData.set([a.rgb[0],a.rgb[1],a.rgb[2],Math.round(a.rough*255)],i*4);detailData[i*4]=a.detail*16;const b0=p.bounds[0],b1=p.bounds[1],ext=[b1[0]-b0[0],b1[1]-b0[1],b1[2]-b0[2]];detailData[i*4+1]=ext.indexOf(Math.max(...ext))*80;});
  const tintTexture=new T.DataTexture(tintData,width,1);tintTexture.colorSpace=T.SRGBColorSpace;tintTexture.needsUpdate=true;
  // Microtextura procedural (sem UV no atlas): tipo de tecido no canal R.
  const detailTexture=new T.DataTexture(detailData,width,1);detailTexture.needsUpdate=true;
  // Transparência do entorno: peças não selecionadas ficam translúcidas.
  const ghostUniform={value:0};let lastGhost=-1;
  const DETAIL_GLSL=`
// Rede reduzida a mod 289 para o hash não perder precisão em coordenadas altas.
float dHash(vec3 p){p=mod(p,289.0);p=fract(p*0.3183099+0.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float dNoise(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*f*(f*(f*6.0-15.0)+10.0);
 return mix(mix(mix(dHash(i),dHash(i+vec3(1,0,0)),f.x),mix(dHash(i+vec3(0,1,0)),dHash(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(dHash(i+vec3(0,0,1)),dHash(i+vec3(1,0,1)),f.x),mix(dHash(i+vec3(0,1,1)),dHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
// Altura da microtextura por tecido; posição em metros no espaço do modelo.
float dHeight(vec3 p,float kind,float axis){
 if(kind<0.5) return 0.0;
 if(kind<1.5) return dNoise(p*380.0)*0.65+dNoise(p*1100.0)*0.35;                       // osso: poros
 if(kind<2.5){                                                                        // músculo: fascículos ao longo do eixo da peça
  vec3 q = axis<0.5 ? p.yzx : axis<1.5 ? p : p.xzy;
  float fasc = dNoise(vec3(q.x*320.0,q.y*28.0,q.z*320.0));
  float fib = dNoise(vec3(q.x*1300.0,q.y*90.0,q.z*1300.0));
  return smoothstep(0.25,0.75,fasc)*0.6+fib*0.3+dNoise(p*90.0)*0.1; }
 if(kind<3.5) return dNoise(p*180.0)*0.7+dNoise(p*650.0)*0.3;                          // órgão: granulado
 if(kind<4.5) return dNoise(p*220.0);                                                  // vaso: quase liso
 if(kind<5.5) return dNoise(vec3(p.x*700.0,p.y*90.0,p.z*700.0));                       // fibroso: feixes
 if(kind<6.5) return dNoise(p*140.0)*0.6+dNoise(p*480.0)*0.4;                          // encéfalo
 return dNoise(p*180.0)*0.7+dNoise(p*650.0)*0.3;                                       // órgão oco por fora
}
// Mucosa vista por dentro (face interna, aparece no corte).
float dMucosa(vec3 p,float kind,float axis){
 vec3 q = axis<0.5 ? p.yzx : axis<1.5 ? p : p.xzy;
 if(kind<7.5){ float w = dNoise(p*30.0)*7.0+dNoise(p*90.0)*2.0; float r = 0.5+0.5*sin((q.x+q.z)*260.0+w); return smoothstep(0.45,0.9,r)*0.8+dNoise(p*900.0)*0.2; }          // rugas gástricas
 if(kind<8.5){ float plica = 0.5+0.5*sin(q.y*900.0+dNoise(p*60.0)*6.0); float villi = dNoise(p*3200.0); return plica*0.55+villi*0.45; } // pregas circulares + vilosidades
 float haustra = 0.5+0.5*sin(q.y*260.0+dNoise(p*40.0)*5.0); return smoothstep(0.55,0.95,haustra)*0.75+dNoise(p*1400.0)*0.25;        // pregas semilunares do colo
}
float dStrength(float kind){return kind<0.5?0.0:kind<1.5?0.6:kind<2.5?0.75:kind<3.5?0.4:kind<4.5?0.15:kind<5.5?0.4:kind<6.5?0.35:0.4;}
// Frequência dominante, para esmaecer a textura quando ela fica menor que um pixel.
float dFreq(float kind){return kind<1.5?1100.0:kind<2.5?1300.0:kind<3.5?650.0:kind<4.5?220.0:kind<5.5?700.0:kind<6.5?480.0:650.0;}
`;
  const materials:T.Material[]=[],geometries:T.BufferGeometry[]=[],pickers:(T.Mesh|undefined)[]=[],centers=atlas.parts.map(p=>new T.Vector3().fromArray(p.bounds[0]).add(new T.Vector3().fromArray(p.bounds[1])).multiplyScalar(.5));
  const offsets:T.Vector3[]=[],bounds=atlas.parts.map(p=>new T.Box3(new T.Vector3().fromArray(p.bounds[0]),new T.Vector3().fromArray(p.bounds[1])));
  let packingWidth=1,packingHeight=1;
  const markerPositions=new Float32Array(atlas.parts.length*3),markerGeometry=new T.BufferGeometry();markerGeometry.setAttribute('position',new T.BufferAttribute(markerPositions,3));
  const markerMaterial=new T.PointsMaterial({color:0x64748b,size:5,sizeAttenuation:false,transparent:true,opacity:.72,depthTest:false});
  markerMaterial.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif (distance(gl_PointCoord, vec2(0.5)) > 0.5) discard;');};
  const markers=new T.Points(markerGeometry,markerMaterial);markers.frustumCulled=false;markers.renderOrder=10;markers.visible=false;scene.add(markers);
  // ---- Fluxo sanguíneo no coração ----
  const centerOf=(...patterns:RegExp[])=>{for(const re of patterns){const i=atlas.parts.findIndex(p=>re.test(p.name));if(i>=0)return centers[i].clone();}return null;};
  const route=(...stops:(T.Vector3|null)[])=>{const pts=stops.filter((v):v is T.Vector3=>!!v);return pts.length>=3?new T.CatmullRomCurve3(pts,false,'centripetal'):null;};
  const RA=centerOf(/^cavity of right atrium$/i,/^right cardiac atrium$/i),RV=centerOf(/^cavity of right ventricle$/i,/^heart right ventricle$/i);
  const LA=centerOf(/^cavity of left atrium$/i,/^left cardiac atrium$/i),LV=centerOf(/^cavity of left ventricle$/i,/^heart left ventricle$/i);
  const flowRoutes=[
   {color:0x3f6fd1,curve:route(centerOf(/^superior vena cava$/i,/superior vena cava/i),RA,RV,centerOf(/^pulmonary trunk$/i,/pulmonary trunk/i))},
   {color:0x3f6fd1,curve:route(centerOf(/^inferior vena cava$/i,/inferior vena cava/i),RA,RV,centerOf(/^pulmonary trunk$/i,/pulmonary trunk/i))},
   {color:0xe0483e,curve:route(centerOf(/^right superior pulmonary vein$/i,/pulmonary vein superior \(right\)/i,/pulmonary vein/i),LA,LV,centerOf(/^ascending aorta$/i),centerOf(/^arch of aorta$/i,/^aortic arch$/i))},
   {color:0xe0483e,curve:route(centerOf(/^left superior pulmonary vein$/i,/pulmonary vein superior \(left\)/i,/pulmonary vein/i),LA,LV,centerOf(/^ascending aorta$/i),centerOf(/^arch of aorta$/i,/^aortic arch$/i))},
  ].filter(r=>r.curve&&r.curve.getLength()>.02);
  const FLOW_N=140;
  const flowLayers=flowRoutes.map(r=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(new Float32Array(FLOW_N*3),3));
   const m=new T.PointsMaterial({color:r.color,size:.0065,sizeAttenuation:true,transparent:true,opacity:.92,depthTest:false,depthWrite:false});
   m.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif (distance(gl_PointCoord, vec2(0.5)) > 0.5) discard;');};
   const pts=new T.Points(g,m);pts.frustumCulled=false;pts.renderOrder=12;pts.visible=false;scene.add(pts);return {pts,curve:r.curve!,seed:Math.random()};});
  let flowClock=0,flowShown=false;const flowTmp=new T.Vector3();
  const hover=document.createElement('div');hover.className='part-hover';hover.setAttribute('role','tooltip');hover.hidden=true;el.appendChild(hover);
  type Target={index:number;x:number;y:number;left:number;right:number;top:number;bottom:number};let targets:Target[]=[];
  const projected=new T.Vector3();
  const findTarget=(x:number,y:number,radius:number)=>{
   let best=-1,score=Infinity;
   for(const t of targets){const dx=Math.max(t.left-x,0,x-t.right),dy=Math.max(t.top-y,0,y-t.bottom),distance=Math.hypot(dx,dy);if(distance>radius)continue;const candidate=distance+Math.hypot(t.x-x,t.y-y)*.025;if(candidate<score){score=candidate;best=t.index;}}
   return best;
  };
  const materialFor=(system:string)=>{
   const m=new T.MeshStandardMaterial({envMapIntensity:.32,color:SYSTEMS.find(s=>s.id===system)?.color??'#aebbb8',metalness:.08,roughness:.53,side:T.DoubleSide,transparent:system==='integumentary',opacity:system==='integumentary'?.1:1,depthWrite:system!=='integumentary'});
   m.onBeforeCompile=shader=>{
    shader.uniforms.partState={value:partTexture};shader.uniforms.selectionState={value:selectionTexture};shader.uniforms.partTint={value:tintTexture};shader.uniforms.partDetail={value:detailTexture};shader.uniforms.ghostAmount=ghostUniform;shader.uniforms.stateWidth={value:width};
    shader.vertexShader='attribute float partIndex; uniform sampler2D partState; uniform sampler2D selectionState; uniform sampler2D partTint; uniform sampler2D partDetail; uniform float stateWidth; varying float partVisible; varying float partSelected; varying vec4 vTint; varying float vKind; varying float vAxis; varying vec3 vDetailPos;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvec2 stateUv = vec2((partIndex + 0.5) / stateWidth, 0.5); vec4 state = texture2D(partState, stateUv); vDetailPos = position; transformed += state.xyz; partVisible = state.w; partSelected = texture2D(selectionState, stateUv).r; vTint = texture2D(partTint, stateUv); vec4 dd = texture2D(partDetail, stateUv); vKind = floor(dd.r * 255.0 / 16.0 + 0.5); vAxis = floor(dd.g * 255.0 / 80.0 + 0.5);');
    shader.fragmentShader='uniform float ghostAmount; varying float partVisible; varying float partSelected; varying vec4 vTint; varying float vKind; varying float vAxis; varying vec3 vDetailPos;\n'+DETAIL_GLSL+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif (partVisible < 0.5) discard;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <alphatest_fragment>','#include <alphatest_fragment>\nif (partSelected < 0.5) diffuseColor.a *= 1.0 - ghostAmount;');
    // Cor por tecido + destaque de seleção no azul TRAUBE (#2f6fc4 em linear).
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nfloat dK = vKind; bool dIn = !gl_FrontFacing && dK > 6.5; float dS = dIn ? 0.9 : dStrength(dK);\n// esmaece a microtextura quando ela fica menor que um pixel (evita serrilhado)\nfloat dFade = dS > 0.0 ? clamp(1.5 - length(fwidth(vDetailPos)) * (dIn ? 260.0 : dFreq(dK)) * 1.4, 0.0, 1.0) : 0.0;\n// vilosidades só aparecem quando a câmera chega perto\nfloat dFine = clamp(1.5 - length(fwidth(vDetailPos)) * 3200.0 * 1.4, 0.0, 1.0);\nfloat dH = dIn ? mix(dMucosa(vDetailPos, dK, vAxis), dMucosa(vDetailPos, dK, vAxis) * 0.7 + dNoise(vDetailPos*3200.0) * 0.3, dFine) : dHeight(vDetailPos, dK, vAxis);\nvec3 dBase = dIn ? mix(vTint.rgb, vec3(0.86, 0.36, 0.33), 0.55) : vTint.rgb;\ndiffuseColor.rgb = dBase * (1.0 + (dH - 0.5) * (dIn ? 0.9 : 0.5) * dS * dFade);\n');
    // Seleção: contorno azul TRAUBE (fresnel), preservando a cor do tecido.
    shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\nfloat selRim = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.2);\ntotalEmissiveRadiance += vec3(0.05, 0.22, 0.75) * partSelected * selRim * 1.1 + vec3(0.07, 0.035, 0.03) * selRim * (1.0 - partSelected);');
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, vTint.a, 0.85) + (dH - 0.5) * 0.12 * dS * dFade;');
    // Relevo por derivadas da altura procedural (bump sem UV).
    shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\nif (dFade > 0.0) { vec3 dpx = dFdx(-vViewPosition), dpy = dFdy(-vViewPosition); float dAmp = (dIn ? 0.004 : dK > 1.5 && dK < 2.5 ? 0.0022 : 0.0016) * dS * dFade; float dhx = dFdx(dH) * dAmp, dhy = dFdy(dH) * dAmp; vec3 r1 = cross(dpy, normal), r2 = cross(normal, dpx); float det = dot(dpx, r1); vec3 grad = sign(det) * (dhx * r1 + dhy * r2); normal = normalize(abs(det) * normal - grad); }');
   };materials.push(m);return m;
  };
  const mats=new Map(SYSTEMS.map(s=>[s.id,materialFor(s.id)]));
  let loaded=0;
  // Progresso por bytes e download resiliente: cada parte tem timeout por inatividade e até 4 tentativas,
  // para o carregamento não ficar parado em 87% quando uma conexão trava.
  const got=new Float64Array(atlas.chunks.length),totalBytes=atlas.chunks.reduce((n,c)=>n+(c.gzipBytes??c.bytes),0)||1;
  const report=()=>{const b=got.reduce((n,x)=>n+x,0);onProgress(Math.min(99,Math.floor(b/totalBytes*96+loaded/atlas.chunks.length*3)));};
  const fetchOnce=async(url:string,wire:number,expected:number,compressed:boolean,ci:number)=>{
   const ctl=new AbortController(),stop=()=>ctl.abort();abort.signal.addEventListener('abort',stop);
   let timer=0;const arm=()=>{clearTimeout(timer);timer=window.setTimeout(stop,20000);};arm();
   try{
    const response=await fetch(url,{signal:ctl.signal,cache:'no-store'});
    if(!response.ok||!response.body)return await decodeModelResponse(response,expected,compressed);
    const reader=response.body.getReader(),parts:Uint8Array[]=[];let n=0;
    for(;;){const {done,value}=await reader.read();if(done)break;arm();parts.push(value);n+=value.byteLength;got[ci]=Math.min(n,wire);report();}
    const all=new Uint8Array(n);let o=0;for(const p of parts){all.set(p,o);o+=p.byteLength;}
    return await decodeModelResponse(new Response(all),expected,compressed);
   }finally{clearTimeout(timer);abort.signal.removeEventListener('abort',stop);}
  };
  const fetchChunk=async(ci:number,url:string,wire:number,expected:number,compressed:boolean)=>{
   for(let attempt=0;attempt<4;attempt++){
    if(disposed)throw new Error('cancelado');
    try{return await fetchOnce(attempt?url+(url.includes('?')?'&':'?')+'r='+attempt:url,wire,expected,compressed,ci);}
    catch(e){got[ci]=0;report();if(abort.signal.aborted)throw e;await new Promise(r=>setTimeout(r,800*(attempt+1)));}
   }
   throw new Error('Uma parte do modelo não chegou depois de várias tentativas. Verifique a conexão e tente de novo.');
  };
  const loadChunk=async(ci:number)=>{
   const chunk=atlas.chunks[ci],compressed=!!chunk.gzip&&typeof DecompressionStream!=='undefined';const buffer=await fetchChunk(ci,compressed?chunk.gzip!:chunk.url,compressed?(chunk.gzipBytes??chunk.bytes):chunk.bytes,chunk.bytes,compressed);if(disposed)return;
   const groups=new Map<string,T.BufferGeometry[]>();
   atlas.parts.forEach((p,i)=>{
    if(p.chunk!==ci)return;
    const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(new Float32Array(buffer,p.positions,p.vertexCount*3),3));
    // GPU normalized signed-short normals keep the complete atlas compact in memory.
    g.setAttribute('normal',new T.BufferAttribute(new Int16Array(buffer,p.normals,p.vertexCount*3),3,true));g.setIndex(new T.BufferAttribute(new Uint32Array(buffer,p.indices,p.indexCount),1));
    g.boundingBox=bounds[i].clone();g.computeBoundingSphere();const pick=new T.Mesh(g);pick.matrixAutoUpdate=false;pickers[i]=pick;geometries.push(g);
    g.setAttribute('partIndex',new T.BufferAttribute(new Float32Array(p.vertexCount).fill(i),1));
    const list=groups.get(p.system)??[];list.push(g);groups.set(p.system,list);
   });
   groups.forEach((gs,system)=>{const geometry=mergeGeometries(gs,false);if(!geometry)throw new Error('Não foi possível montar a geometria anatômica.');geometries.push(geometry);const mesh=new T.Mesh(geometry,mats.get(system as never));mesh.frustumCulled=false;scene.add(mesh);});
   lastState=null;loaded++;got[ci]=atlas.chunks[ci].gzipBytes??atlas.chunks[ci].bytes;if(loaded===atlas.chunks.length)onProgress(100);else report();dirty=true;
  };
  (async()=>{try{let cursor=0;await Promise.all(Array.from({length:3},async()=>{while(cursor<atlas.chunks.length){const i=cursor++;await loadChunk(i);}}));if(!disposed){ready=true;dirty=true;}}catch(e){if(!disposed)onError(e instanceof Error?e.message:'Não foi possível carregar a anatomia.');}})();
  const fit=(view:string,extent=0)=>{
   const aspect=camera.aspect,mobile=el.clientWidth<768,normalDistance=Math.max(2.3,1.82/(2*Math.tan(T.MathUtils.degToRad(camera.fov/2)))/Math.min(1,aspect*1.25));
   const reservedHeight=40;const availableAspect=Math.max(.35,(el.clientWidth-40)/Math.max(160,el.clientHeight-reservedHeight));const atlasDistance=Math.max(packingHeight,packingWidth/availableAspect)/(2*Math.tan(T.MathUtils.degToRad(camera.fov/2)))*(el.clientHeight/Math.max(160,el.clientHeight-reservedHeight))*1.08;
   const distance=T.MathUtils.lerp(normalDistance,Math.max(.2,atlasDistance),extent);if(extent>.8)view='front';
   const direction=view==='front'?new T.Vector3(0,.02,1):view==='back'?new T.Vector3(0,.02,-1):view==='side'?new T.Vector3(1,.02,0):new T.Vector3(.35,.06,1).normalize();
   controls.target.set(0,.86,0);camera.position.copy(controls.target).addScaledVector(direction,distance);controls.update();dirty=true;
  };
  const resize=()=>{layoutKey='';lastState=null;renderer.setPixelRatio(Math.min(devicePixelRatio,el.clientWidth<768||el.clientHeight<600?1.5:2));camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight);fit(latest.current.view,amount);};const observer=new ResizeObserver(resize);observer.observe(el);
  const raycaster=new T.Raycaster(),pointer=new T.Vector2(),tap=new PointerTap(),worldBox=new T.Box3(),hitPoint=new T.Vector3();
  const down=(e:PointerEvent)=>{hover.hidden=true;tap.down(e.pointerId,e.clientX,e.clientY,e.pointerType==='touch'?12:5);};
  const move=(e:PointerEvent)=>{tap.move(e.pointerId,e.clientX,e.clientY);if(e.buttons||amount<.5||e.pointerType==='touch'){hover.hidden=true;return;}const rect=el.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,index=findTarget(x,y,12);hover.hidden=index<0;renderer.domElement.style.cursor=index<0?'grab':'pointer';if(index>=0){hover.textContent=ptName(atlas.parts[index].name);hover.style.left=`${Math.max(8,Math.min(x+14,el.clientWidth-260))}px`;hover.style.top=`${Math.max(8,Math.min(y+18,el.clientHeight-55))}px`;}};
  const cancel=(e:PointerEvent)=>tap.cancel(e.pointerId);
  const up=(e:PointerEvent)=>{
   const validTap=tap.up(e.pointerId,e.clientX,e.clientY);if(!validTap||!ready)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
   let nearest=Infinity,found=-1;const hasSolid=atlas.parts.some((p,i)=>p.system!=='integumentary'&&data[i*4+3]>.5);
   pickers.forEach((mesh,i)=>{if(!mesh||data[i*4+3]<.5||(hasSolid&&atlas.parts[i].system==='integumentary'))return;worldBox.copy(bounds[i]).translate(mesh.position);if(!raycaster.ray.intersectBox(worldBox,hitPoint))return;const hits=raycaster.intersectObject(mesh,false);if(hits[0]&&hits[0].distance<nearest){nearest=hits[0].distance;found=i;}});
   if(found<0&&amount>.45)found=findTarget(e.clientX-rect.left,e.clientY-rect.top,e.pointerType==='touch'?24:16);if(found>=0){hover.hidden=true;select.current(atlas.parts[found].id);}
  };
  renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',cancel);
  const clock=new T.Clock();let lastExtent=-1;
  const animate=()=>{
   if(disposed)return;frame=requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05),s=latest.current;
   const changed=lastState?.visible!==s.visible||lastState?.selected!==s.selected||lastState?.isolate!==s.isolate||lastState?.hidden!==s.hidden;
   const moving=Math.abs(amount-s.explode)>.0001;
   if(moving){amount=T.MathUtils.damp(amount,s.explode,8,dt);dirty=true;}
   if(changed||moving||lastExtent<0){
    const visible=new Set(s.visible),selection=new Set(s.selected),removed=new Set(s.hidden);
    const visibleParts=atlas.parts.filter(p=>!removed.has(p.id)&&(s.isolate?selection.has(p.id):visible.has(p.system)||selection.has(p.id)));
    const nextLayoutKey=visibleParts.map(p=>p.id).join(',')+':'+camera.aspect.toFixed(3);
    if(nextLayoutKey!==layoutKey){const layout=createExplosionLayout(visibleParts,camera.aspect);packingWidth=layout.width;packingHeight=layout.height;atlas.parts.forEach((p,i)=>{const cell=layout.cells.get(p.id);offsets[i]=cell?new T.Vector3(cell.x,cell.y+.85,0):centers[i].clone();});layoutKey=nextLayoutKey;if(amount>.05&&!s.isolate)fit(s.view,Math.max(0,(amount-.3)/.7));}

    atlas.parts.forEach((p,i)=>{
     const c=centers[i],destination=offsets[i];let dx=0,dy=0,dz=0;
     if(amount<=.45){const t=amount/.45;const group=SYSTEMS.findIndex(sys=>sys.id===p.system);const angle=group/SYSTEMS.length*Math.PI*2;dx=Math.sin(angle)*t*.48;dy=(c.y-.85)*t*.28;dz=Math.cos(angle)*t*.48;}
     else {const t=(amount-.45)/.55,group=SYSTEMS.findIndex(sys=>sys.id===p.system),angle=group/SYSTEMS.length*Math.PI*2;dx=T.MathUtils.lerp(Math.sin(angle)*.48,destination.x-c.x,t);dy=T.MathUtils.lerp((c.y-.85)*.28,destination.y-c.y,t);dz=T.MathUtils.lerp(Math.cos(angle)*.48,-c.z,t);}
     const selected=selection.has(p.id);data.set([dx,dy,dz,!removed.has(p.id)&&(s.isolate?selected:visible.has(p.system)||selected)?1:0],i*4);selectedData[i*4]=selected?255:0;
     markerPositions.set(data[i*4+3]>.5?[c.x+dx,c.y+dy,c.z+dz]:[10000,10000,10000],i*3);const mesh=pickers[i];if(mesh){mesh.position.set(dx,dy,dz);mesh.updateMatrix();mesh.updateMatrixWorld(true);}
    });partTexture.needsUpdate=true;selectionTexture.needsUpdate=true;markerGeometry.attributes.position.needsUpdate=true;lastState=s;lastExtent=amount;dirty=true;
   }
   const cutKey=s.cutAxis+':'+s.cut.toFixed(3);
   if(cutKey!==lastCut){lastCut=cutKey;const on=s.cutAxis!=='none';
    if(on){const min=bodyBox.min,max=bodyBox.max;if(s.cutAxis==='sagittal'){cutPlane.normal.set(-1,0,0);cutPlane.constant=T.MathUtils.lerp(min.x,max.x,s.cut);}else if(s.cutAxis==='coronal'){cutPlane.normal.set(0,0,-1);cutPlane.constant=T.MathUtils.lerp(min.z,max.z,s.cut);}else{cutPlane.normal.set(0,-1,0);cutPlane.constant=T.MathUtils.lerp(min.y,max.y,s.cut);}}
    materials.forEach(m=>{const want=on?[cutPlane]:null;if((m.clippingPlanes?.length??0)!==(want?.length??0)){m.clippingPlanes=want;m.needsUpdate=true;}});dirty=true;}
   const flowOn=!!s.flow&&flowLayers.length>0&&amount<.05;
   if(flowOn){
    // ciclo de ~0,85 s: o sangue acelera na sístole e quase para na diástole
    flowClock+=dt*(0.25+0.9*Math.max(0,Math.sin(performance.now()/1000*Math.PI*2/0.85)));
    flowLayers.forEach(L=>{const a=L.pts.geometry.attributes.position as T.BufferAttribute;for(let k=0;k<FLOW_N;k++){const t=((k/FLOW_N)+flowClock*.45+L.seed)%1;L.curve.getPointAt(t,flowTmp);const j=(Math.sin(k*12.9898+L.seed*78.2)*43758.5453)%1;a.setXYZ(k,flowTmp.x+j*.004,flowTmp.y+((j*7)%1-.5)*.006,flowTmp.z+((j*13)%1-.5)*.006);}a.needsUpdate=true;L.pts.visible=true;});
    dirty=true;flowShown=true;
   }else if(flowShown){flowLayers.forEach(L=>L.pts.visible=false);flowShown=false;dirty=true;}
   const ghost=s.selected.length&&!s.isolate?(s.ghost??0):0;
   if(ghost!==lastGhost){const on=ghost>0;materials.forEach(m=>{if(m.userData.skin===undefined)m.userData.skin=m.transparent;if(m.userData.skin)return;if(m.transparent!==on){m.transparent=on;m.depthWrite=!on;m.needsUpdate=true;}});ghostUniform.value=ghost;lastGhost=ghost;dirty=true;}
   if(s.view!==lastView||s.reset!==lastReset){fit(s.view,amount);lastView=s.view;lastReset=s.reset;}
   if(moving&&!s.isolate)fit(amount>.5?'front':s.view,Math.max(0,(amount-.3)/.7));
   const isolateKey=s.isolate?s.selected.join(',')+':'+s.reset+':'+s.inspectorOpen+':'+camera.aspect:'';
   if(isolateKey!==lastIsolate||(s.isolate&&moving)){
    if(s.isolate){const box=new T.Box3();atlas.parts.forEach((p,i)=>{if(s.selected.includes(p.id))box.union(bounds[i].clone().translate(new T.Vector3(data[i*4],data[i*4+1],data[i*4+2])));});
     if(!box.isEmpty()){const center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());const w=el.clientWidth,h=el.clientHeight,mobile=w<768,landscape=w>h&&h<=600;let left=24,right=w-24,top=mobile?24:36,bottom=h-(mobile?24:36);if(s.inspectorOpen){if(landscape){right=w-335;top=100;bottom=h-125;}else if(mobile){const sheet=document.querySelector('.detail-sheet')?.getBoundingClientRect(),header=document.querySelector('.identity')?.getBoundingClientRect();top=(header?.bottom??94)+16;bottom=(sheet?.top??h*.58-139)-16;}else{right=w-370;left=w>1100?285:25;}}const availableWidth=Math.max(150,right-left),availableHeight=Math.max(40,bottom-top);camera.setViewOffset(w,h,w/2-(left+right)/2,h/2-(top+bottom)/2,w,h);const distance=Math.max(.07,Math.max(size.y*h/availableHeight,size.x*w/availableWidth/camera.aspect,size.z)/(2*Math.tan(T.MathUtils.degToRad(camera.fov/2)))*1.35);controls.maxDistance=Math.max(40,distance*2);controls.target.copy(center);camera.position.copy(center).add(new T.Vector3(.2,.1,1).normalize().multiplyScalar(distance));controls.update();dirty=true;}
    }else if(lastIsolate){camera.clearViewOffset();fit(s.view,amount);}
    lastIsolate=isolateKey;
   }
   controls.enableRotate=amount<.8;controls.mouseButtons.LEFT=amount<.8?T.MOUSE.ROTATE:T.MOUSE.PAN;controls.touches.ONE=amount<.8?T.TOUCH.ROTATE:T.TOUCH.PAN;ground.visible=platform.visible=ring.visible=innerRing.visible=amount<.5&&!s.isolate;markers.visible=amount>.75;controls.autoRotate=s.rotate&&!s.isolate&&amount<.4;controls.autoRotateSpeed=.65;controls.update();if(controls.autoRotate)dirty=true;
   if(dirty){renderer.render(scene,camera);targets=[];if(amount>.45){const hasSolid=atlas.parts.some((p,i)=>p.system!=='integumentary'&&data[i*4+3]>.5);atlas.parts.forEach((p,i)=>{if(data[i*4+3]<.5||(hasSolid&&p.system==='integumentary'))return;let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;for(let corner=0;corner<8;corner++){projected.set(p.bounds[(corner&1)?1:0][0]+data[i*4],p.bounds[(corner&2)?1:0][1]+data[i*4+1],p.bounds[(corner&4)?1:0][2]+data[i*4+2]).project(camera);const x=(projected.x+1)*el.clientWidth/2,y=(1-projected.y)*el.clientHeight/2;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}projected.copy(centers[i]).add(new T.Vector3(data[i*4],data[i*4+1],data[i*4+2])).project(camera);if(projected.z< -1||projected.z>1)return;targets.push({index:i,x:(projected.x+1)*el.clientWidth/2,y:(1-projected.y)*el.clientHeight/2,left,right,top,bottom});});}dirty=false;}

  };animate();
  const contextLost=(e:Event)=>{e.preventDefault();onError('O dispositivo pausou a sessão 3D. Recarregue para continuar.');};renderer.domElement.addEventListener('webglcontextlost',contextLost);
  return()=>{disposed=true;abort.abort();cancelAnimationFrame(frame);observer.disconnect();controls.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());scene.traverse(o=>{if(o instanceof T.Mesh&&!geometries.includes(o.geometry)){o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose());}});env.dispose();partTexture.dispose();selectionTexture.dispose();tintTexture.dispose();detailTexture.dispose();markerGeometry.dispose();markerMaterial.dispose();hover.remove();renderer.dispose();renderer.domElement.remove();};
 },[atlas]);
 return <div className="scene" ref={host}/>;
}
