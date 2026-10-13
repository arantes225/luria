import * as THREE from '../vendor/three.module.min.mjs';

export const EXPRESSIONS = ['happy','attentive','thoughtful','surprised','confused','excited','wink','angry'];
export const ANIMATIONS = ['wave','celebrate','thinking','explaining','typing','reading','confused','angry','sleep','wake','celebrateScene','angryScene'];
const DURATIONS = {wave:2800,celebrate:2600,thinking:3200,explaining:3600,typing:3400,reading:3000,confused:2600,angry:2600,sleep:4000,wake:2800,celebrateScene:6500,angryScene:6000};
const GESTURE_FACE = {wave:'happy',celebrate:'excited',thinking:'thoughtful',explaining:'attentive',typing:'attentive',reading:'attentive',confused:'confused',angry:'angry',wake:'happy',celebrateScene:'excited',angryScene:'angry'};
const ALIASES = {feliz:'happy',atento:'attentive',pensativo:'thoughtful',surpreso:'surprised',confuso:'confused',animado:'excited',piscando:'wink',estourado:'angry'};
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const smooth = v => v*v*(3-2*v);

function roundedShape(w,h,r) {
  const s=new THREE.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function roundedSolid(w,h,d,r,bevel,detail=1) {
  const g=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:Math.round(8*detail),steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:Math.round(20*detail)});
  g.translate(0,0,-d/2);g.computeVertexNormals();return g;
}
function squircleShape(w,h,exponent=.60) {
  const shape=new THREE.Shape();for(let i=0;i<=96;i++){const angle=i/96*Math.PI*2,x=w/2*Math.sign(Math.cos(angle))*Math.pow(Math.abs(Math.cos(angle)),exponent),y=h/2*Math.sign(Math.sin(angle))*Math.pow(Math.abs(Math.sin(angle)),exponent);if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);}shape.closePath();return shape;
}
function screenGeometry(w,h,r) {
  const g=new THREE.ShapeGeometry(squircleShape(w,h),20),p=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/w+.5,p.getY(i)/h+.5);
  return g;
}
function floatingPod(arm) {
  // Sculpted ceramic shells: fuller arms and tapered feet with a broad sole.
  const profile=arm?[[0,-.395],[.12,-.375],[.205,-.335],[.25,-.28],[.28,-.15],[.284,-.02],[.272,.13],[.23,.265],[.17,.335],[.13,.355],[.10,.337],[0,.33]]
    :[[0,-.37],[.18,-.37],[.244,-.345],[.272,-.29],[.275,-.18],[.255,-.035],[.218,.13],[.167,.265],[.125,.315],[.09,.30],[0,.28]];
  const curve=new THREE.SplineCurve(profile.map(([r,y])=>new THREE.Vector2(r,y)));
  const points=curve.getPoints(32);points.forEach(p=>p.x=Math.max(0,p.x));
  return new THREE.LatheGeometry(points,28);
}
function softShell() {
  const geometry=new THREE.SphereGeometry(1,56,36),positions=geometry.attributes.position,normals=geometry.attributes.normal;
  const axes=[1.24,1.14,.54],exponent=.56,power=2/exponent;
  for(let i=0;i<positions.count;i++){
    const values=[positions.getX(i),positions.getY(i),positions.getZ(i)].map((v,j)=>Math.sign(v)*Math.pow(Math.abs(v),exponent)*axes[j]);
    positions.setXYZ(i,...values);
    const normal=new THREE.Vector3(...values.map((v,j)=>Math.sign(v)*Math.pow(Math.abs(v/axes[j]),power-1)/axes[j])).normalize();normals.setXYZ(i,normal.x,normal.y,normal.z);
  }
  return geometry;
}
// An offline studio environment: broad light panels reflected in the white ceramic.
function studioEnvironment(renderer) {
  const faces=Array.from({length:6},(_,i)=>{
    const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');
    x.fillStyle=i===3?'#8390a8':'#d5dfee';x.fillRect(0,0,128,128);
    const g=x.createRadialGradient(44,30,8,64,64,90);g.addColorStop(0,'white');g.addColorStop(.45,'#dae4f5');g.addColorStop(1,'#657691');x.fillStyle=g;x.fillRect(0,0,128,128);
    x.fillStyle='white';x.fillRect(20,14,20,80);return c;
  });
  const cube=new THREE.CubeTexture(faces);cube.needsUpdate=true;cube.colorSpace=THREE.SRGBColorSpace;
  const pmrem=new THREE.PMREMGenerator(renderer),target=pmrem.fromCubemap(cube);cube.dispose();pmrem.dispose();return target;
}

/** Lightweight, real 3D mascot. No remote assets, audio services, or platform side effects. */
export class ProfessorAlexMascot extends HTMLElement {
  static observedAttributes=['expression','animation','size','theme','interactive','speaking','intensity'];
  constructor() {
    super();this.attachShadow({mode:'open'});
    const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('../css/professor-alex-mascot.css',import.meta.url).href;
    this.button=document.createElement('button');this.button.type='button';this.button.className='alex-surface';this.button.setAttribute('aria-label','Professor Alex: tocar para cumprimentar');
    this.message=document.createElement('span');this.message.className='alex-fallback';this.message.textContent='Carregando Professor Alex 3D…';
    this.button.append(this.message);this.shadowRoot.append(link,this.button);
    this._elapsed=0;this._last=0;this._visible=true;this._frame=0;this._gesture=null;this._faceMix=1;this._currentFace='happy';this._fromFace='happy';this._blinkAt=2+Math.random()*3;this._blinkStart=-10;this._pointer={x:0,y:0};this._look={x:0,y:0};this._openness=null;this._view={yaw:-.18,pitch:0};
    this._motion=()=>{this._reduced=this._media.matches;this._last=0;this._schedule();};
    this._visibility=()=>{this._last=0;this._schedule();};
    this._tick=this._tick.bind(this);
    this.button.addEventListener('click',()=>{if(this.interactive){this.playAnimation('wave');this.dispatchEvent(new CustomEvent('alex-react',{bubbles:true,composed:true}));}});
    this.button.addEventListener('pointermove',e=>{if(!this.interactive||this._reduced||e.pointerType==='touch')return;const b=this.button.getBoundingClientRect();this._pointer={x:clamp((e.clientX-b.left)/b.width*2-1,-1,1),y:clamp((e.clientY-b.top)/b.height*2-1,-1,1)};});
    this.button.addEventListener('pointerleave',()=>{this._pointer={x:0,y:0};});
  }
  connectedCallback() {
    this._media=matchMedia('(prefers-reduced-motion: reduce)');this._reduced=this._media.matches;this._media.addEventListener('change',this._motion);
    document.addEventListener('visibilitychange',this._visibility);
    this._themes=new MutationObserver(()=>{this._syncTheme();this._schedule();});
    this._themes.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    if(document.body)this._themes.observe(document.body,{attributes:true,attributeFilter:['data-ui-appearance','data-ui-identity']});
    this._resizeObserver=new ResizeObserver(()=>{this._resize();this._schedule();});this._resizeObserver.observe(this);
    this._intersection=new IntersectionObserver(([entry])=>{this._visible=entry.isIntersecting;this._last=0;this._schedule();});this._intersection.observe(this);
    try {this._createScene();this._syncProps();this._resize();this._schedule();this.message.hidden=true;this.dispatchEvent(new CustomEvent('alex-ready',{bubbles:true}));}
    catch(error) {this._dispose();this.message.hidden=false;this.message.textContent='O modo 3D requer WebGL 2. Tente um navegador compatível.';this.button.disabled=true;this.dispatchEvent(new CustomEvent('alex-error',{detail:error,bubbles:true}));}
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._frame);this._frame=0;this._media?.removeEventListener('change',this._motion);document.removeEventListener('visibilitychange',this._visibility);
    this._themes?.disconnect();this._resizeObserver?.disconnect();this._intersection?.disconnect();this._dispose();
  }
  attributeChangedCallback(name,old,value) {
    if(old===value)return;
    if(name==='animation'&&this.renderer){if(value==='idle'||!value)this._gesture=null;else this.playAnimation(value);}
    this._syncProps();this._schedule();
  }
  get expression(){const x=this.getAttribute('expression')||'happy';return ALIASES[x]|| (EXPRESSIONS.includes(x)?x:'happy');}
  set expression(v){this.setAttribute('expression',v);}
  get animation(){return this.getAttribute('animation')||'idle';}
  set animation(v){if(this.getAttribute('animation')===String(v)){if(v==='idle')this._gesture=null;else this.playAnimation(v);this._schedule();}else this.setAttribute('animation',v);}
  get size(){return this.getAttribute('size')||'320';}set size(v){this.setAttribute('size',v);}
  get theme(){return this.getAttribute('theme')||'auto';}set theme(v){this.setAttribute('theme',v);}
  get interactive(){return !['false','0'].includes(this.getAttribute('interactive'));}set interactive(v){this.setAttribute('interactive',String(Boolean(v)));}
  get speaking(){return this.hasAttribute('speaking')&&!['false','0'].includes(this.getAttribute('speaking'));}set speaking(v){this.setAttribute('speaking',String(Boolean(v)));}
  get intensity(){const v=Number(this.getAttribute('intensity')??1);return Number.isFinite(v)?clamp(v,0,2):1;}set intensity(v){this.setAttribute('intensity',v);}
  // Audio adapters may feed normalized mouth openness; null resumes the built-in demo.
  setMouthOpenness(value){this._openness=value==null?null:clamp(Number(value)||0,0,1);this._schedule();}
  setView(yaw=-.18,pitch=0){this._view={yaw:clamp(Number(yaw)||0,-Math.PI,Math.PI),pitch:clamp(Number(pitch)||0,-.45,.45)};this._schedule();}
  playAnimation(name) {
    if(!ANIMATIONS.includes(name)||!this.renderer)return false;
    this._gesture={name,start:this._elapsed,duration:DURATIONS[name]/1000};this._schedule();return true;
  }
  _syncProps() {
    const names={small:160,medium:320,large:520},size=names[this.size]||Number(this.size)||320;
    this.style.setProperty('--alex-size',clamp(size,80,900)+'px');
    this.button.disabled=!this.interactive;this.button.setAttribute('aria-label',this.interactive?'Professor Alex: tocar para cumprimentar':'Professor Alex, mascote 3D');
    if(!this.interactive)this._pointer={x:0,y:0};this._syncTheme();
  }
  _syncTheme() {
    const global=document.documentElement.dataset.theme,body=document.body?.dataset;
    this._theme=this.theme==='auto' ? (body?.uiIdentity==='pink'||['leila-mood','pink','rosa'].includes(global)?'pink':body?.uiAppearance==='dark'||global==='dark'?'dark':'light') : ({claro:'light',escuro:'dark',rosa:'pink'}[this.theme]||this.theme);
    this._color=this._theme==='pink'?'#ff87c6':'#50d8ff';
    if(this.lightMaterial){this._syncAccents();this.whiteMaterial.color.set(this._theme==='light'?'#729ac7':this._theme==='dark'?'#e6edf8':'#ffffff');}
  }
  _syncAccents() {
    const signature=[this._fromFace,this._currentFace,this._faceMix.toFixed(2),this._color].join('|');
    if(signature===this._accentSignature)return;this._accentSignature=signature;
    const palette=face=>face==='angry'?'#ff3347':this._color;
    const accent=new THREE.Color(palette(this._fromFace)).lerp(new THREE.Color(palette(this._currentFace)),this._faceMix);
    // Keep the ceramic lighting from washing the luminous trims into mint/white.
    this.lightMaterial.color.copy(accent).multiplyScalar(.12);this.lightMaterial.emissive.copy(accent);
    this._glowMaterial?.color.copy(accent);
    this._ledMaterial?.color.copy(accent).lerp(new THREE.Color(0xffffff),.23);this._portMaterial?.color.copy(accent);
    this._panelMaterials?.forEach(material=>material.color.copy(accent));
  }
  _createScene() {
    this.renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.button.prepend(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-hidden','true');
    this.renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(this._frame);this._frame=0;this._contextLost=true;this.message.hidden=false;this.message.textContent='Restaurando a renderização 3D…';});
    this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this._contextLost=false;this._last=0;this.message.hidden=true;this._schedule();});
    this.scene=new THREE.Scene();this.camera=new THREE.OrthographicCamera(-2.4,2.4,2.4,-2.4,.1,30);this.camera.position.set(0,-.12,8);this.camera.lookAt(0,-.12,0);
    this._environment=studioEnvironment(this.renderer);this.scene.environment=this._environment.texture;
    this.scene.add(new THREE.HemisphereLight(0xe6f2ff,0x6b7290,1.8));
    const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(-3,5,5);this.scene.add(key);
    const rim=new THREE.DirectionalLight(0x8ddaff,2.5);rim.position.set(3,1,-2);this.scene.add(rim);
    this.whiteMaterial=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:.08,roughness:.24,clearcoat:1,clearcoatRoughness:.14,envMapIntensity:.8});
    this.lightMaterial=new THREE.MeshStandardMaterial({color:0x07314d,emissive:0x50d8ff,emissiveIntensity:1.10,roughness:.25,toneMapped:false});
    this._ledMaterial=new THREE.MeshBasicMaterial({color:0xb1eeff,toneMapped:false});
    const ledCanvas=document.createElement('canvas');ledCanvas.width=ledCanvas.height=64;const ledContext=ledCanvas.getContext('2d');ledContext.fillStyle='#617584';ledContext.fillRect(0,0,64,64);ledContext.fillStyle='white';
    for(let row=0;row<11;row++)for(let column=0;column<11;column++){ledContext.beginPath();ledContext.arc(column*6+2+(row%2)*2,row*6+2,1.8,0,Math.PI*2);ledContext.fill();}
    this._ledTexture=new THREE.CanvasTexture(ledCanvas);this._portMaterial=new THREE.MeshBasicMaterial({map:this._ledTexture,color:0x50d8ff,toneMapped:false});
    const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=64;const glowContext=glowCanvas.getContext('2d');
    const glowGradient=glowContext.createRadialGradient(32,32,2,32,32,32);glowGradient.addColorStop(0,'rgba(255,255,255,.7)');glowGradient.addColorStop(.3,'rgba(255,255,255,.25)');glowGradient.addColorStop(1,'rgba(255,255,255,0)');glowContext.fillStyle=glowGradient;glowContext.fillRect(0,0,64,64);
    this._glowTexture=new THREE.CanvasTexture(glowCanvas);this._glowMaterial=new THREE.SpriteMaterial({map:this._glowTexture,color:0x50d8ff,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});
    const glow=(parent,x,y,z,w,h)=>{const sprite=new THREE.Sprite(this._glowMaterial);sprite.position.set(x,y,z);sprite.scale.set(w,h,1);parent.add(sprite);};
    this._accentSignature=null;
    const dark=new THREE.MeshPhysicalMaterial({color:0x091426,metalness:.18,roughness:.22,clearcoat:1,envMapIntensity:.25});
    const mesh=(geo,mat,parent,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;};
    this.robot=new THREE.Group();this.scene.add(this.robot);
    this.body=new THREE.Group();this.body.position.y=.35;this.robot.add(this.body);
    mesh(softShell(),this.whiteMaterial,this.body);
    const visor=new THREE.ExtrudeGeometry(squircleShape(1.99,1.65),{depth:.03,steps:1,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:6});visor.translate(0,0,-.015);
    mesh(visor,dark,this.body,0,.17,.515);
    this.faceCanvas=document.createElement('canvas');this.faceCanvas.width=512;this.faceCanvas.height=400;this.faceContext=this.faceCanvas.getContext('2d');
    this.faceTexture=new THREE.CanvasTexture(this.faceCanvas);this.faceTexture.colorSpace=THREE.SRGBColorSpace;this.faceTexture.minFilter=THREE.LinearFilter;this.faceTexture.generateMipmaps=false;
    mesh(screenGeometry(1.98,1.64,.32),new THREE.MeshBasicMaterial({map:this.faceTexture,toneMapped:false}),this.body,0,.17,.570);
    // Subtle glass reflection stays fixed while the luminous face changes.
    const sheen=mesh(screenGeometry(1.98,1.64,.32),new THREE.MeshBasicMaterial({color:0xb6d2fa,transparent:true,opacity:.035,depthWrite:false}),this.body,0,.17,.574);sheen.name='OLED-glass';
    // Reference-style centered lower button: recessed graphite socket and blue bar.
    const buttonRim=new THREE.MeshPhysicalMaterial({color:0x9eabc1,metalness:.25,roughness:.35,clearcoat:.7});
    mesh(roundedSolid(.49,.195,.006,.055,.018,.5),buttonRim,this.body,0,-.84,.487);
    mesh(roundedSolid(.405,.126,.006,.037,.010,.5),dark,this.body,0,-.84,.507);
    mesh(roundedSolid(.275,.045,.004,.020,.008,.5),this.lightMaterial,this.body,0,-.84,.521);
    glow(this.body,0,-.84,.539,.55,.20);
    const ringGeo=new THREE.TorusGeometry(.135,.017,6,24);
    for(const side of [-1,1]) {const ring=mesh(ringGeo,this.lightMaterial,this.body,side*1.247,.02,0);ring.rotation.y=Math.PI/2;ring.scale.y=1.3;}
    const back=mesh(new THREE.TorusGeometry(.27,.018,8,32),this.lightMaterial,this.body,0,0,-.548);back.rotation.y=Math.PI;
    this.limbs=[];
    for(let i=0;i<4;i++) {
      const arm=i<2,side=i%2===0?-1:1,g=new THREE.Group();g.name=['left-arm','right-arm','left-leg','right-leg'][i];this.robot.add(g);this.limbs.push(g);
      g.userData.base={x:arm?side*1.74:side*.49,y:arm?.04:-1.34,z:arm?0:.08,rx:arm?0:(side<0?.12:-.22),ry:arm?0:side*.12,rz:arm?side*.85:side*.12};
      const pivot=arm?new THREE.Group():g,offset=arm?.351:0;if(arm){pivot.position.y=offset;g.add(pivot);g.userData.tipPivot=pivot;}
      const shell=mesh(floatingPod(arm),this.whiteMaterial,pivot,0,-offset,0);shell.scale.z=arm?.96:1.12;
      const ring=mesh(new THREE.TorusGeometry(arm?.245:.265,.022,8,28),this.lightMaterial,pivot,0,(arm?-.29:-.317)-offset,0);ring.rotation.x=Math.PI/2;ring.scale.y=arm?.96:1.12;
      const collar=mesh(new THREE.TorusGeometry(arm?.258:.271,.012,6,28),this.whiteMaterial,pivot,0,(arm?-.264:-.29)-offset,0);collar.rotation.x=Math.PI/2;collar.scale.y=arm?.96:1.12;
      const chips=new THREE.InstancedMesh(new THREE.BoxGeometry(.024,.027,.009),this._ledMaterial,32),chip=new THREE.Object3D();
      for(let k=0;k<32;k++){const angle=k/32*Math.PI*2,radius=(arm?.245:.265)+.012;chip.position.set(Math.cos(angle)*radius,(arm?-.29:-.317)-offset,Math.sin(angle)*radius*(arm?.96:1.12));chip.rotation.y=Math.PI/2-angle;chip.updateMatrix();chips.setMatrixAt(k,chip.matrix);}pivot.add(chips);
      if(arm){
        // The socket shares the shell's pivot: center stays anchored, cap stays flush.
        const socket=mesh(new THREE.CylinderGeometry(.118,.130,.020,24),dark,pivot,0,-.008,0);
        const port=mesh(new THREE.CircleGeometry(.071,24),this._portMaterial,pivot,0,.004,0);port.rotation.x=-Math.PI/2;socket.scale.z=.96;
        g.userData.socket=socket;g.userData.port=port;
      }else{
        const sole=mesh(new THREE.SphereGeometry(.23,24,8),this._portMaterial,g,0,-.368,0);sole.scale.set(1,.07,1.12);
        mesh(new THREE.CylinderGeometry(.095,.095,.012,20),this._portMaterial,g,0,.303,0);
      }
      glow(pivot,0,(arm?-.29:-.36)-offset,.07,arm?.66:.72,arm?.42:.38);
    }
    // Translucent holographic panel appears only while reading or typing.
    this.panel=new THREE.Group();this.robot.add(this.panel);this.panel.position.set(0,-.52,.95);
    const panelMaterial=new THREE.MeshPhysicalMaterial({color:0xf4f8fc,roughness:.42,metalness:.05,clearcoat:.25});
    const borderMaterial=new THREE.LineBasicMaterial({color:0x27acff,transparent:true,opacity:.9,toneMapped:false});
    const inkMaterial=new THREE.MeshStandardMaterial({color:0x17334b,roughness:.65});
    const highlightMaterial=new THREE.MeshBasicMaterial({color:0x50d8ff,toneMapped:false});
    this._panelMaterials=[borderMaterial,highlightMaterial];
    this._keyboardCaseMaterial=panelMaterial;this._readingCaseMaterial=new THREE.MeshPhysicalMaterial({color:0x193953,roughness:.45,clearcoat:.25});
    this.panelBody=mesh(roundedSolid(1.42,.70,.03,.05,.025,.5),panelMaterial,this.panel,0,0,-.02);
    const outline=roundedShape(1.42,.70,.06).getPoints(40).map(p=>new THREE.Vector3(p.x,p.y,.002));
    this.panel.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(outline),borderMaterial));
    this.readingLines=new THREE.Group();this.panel.add(this.readingLines);
    const paperCanvas=document.createElement('canvas');paperCanvas.width=640;paperCanvas.height=320;const paper=paperCanvas.getContext('2d');
    paper.fillStyle='#f9ddb0';paper.fillRect(0,0,640,320);paper.strokeStyle='#234058';paper.lineWidth=7;paper.lineCap='round';paper.lineJoin='round';
    for(let row=0;row<4;row++){paper.beginPath();for(let step=0;step<19;step++){const x=50+step*29,y=65+row*61+(step%2?7:-7);if(step===0)paper.moveTo(x,y);else paper.lineTo(x,y);}paper.stroke();}
    this._paperTexture=new THREE.CanvasTexture(paperCanvas);this._paperTexture.colorSpace=THREE.SRGBColorSpace;
    mesh(new THREE.PlaneGeometry(1.35,.65),new THREE.MeshBasicMaterial({map:this._paperTexture,toneMapped:false}),this.readingLines,0,0,.034);
    this.readingHighlight=mesh(new THREE.PlaneGeometry(.035,.029),highlightMaterial,this.readingLines,-.66,.21,.038);
    this.keyboard=new THREE.Group();this.panel.add(this.keyboard);
    const keys=new THREE.InstancedMesh(new THREE.BoxGeometry(.13,.075,.025),inkMaterial,28),matrix=new THREE.Matrix4();
    for(let row=0;row<4;row++)for(let column=0;column<7;column++){matrix.makeTranslation((column-3)*.17,(1.5-row)*.125,.025);keys.setMatrixAt(row*7+column,matrix);}
    this.keyboard.add(keys);this.keyHighlight=mesh(new THREE.PlaneGeometry(.105,.05),highlightMaterial,this.keyboard,0,0,.042);
    this.panel.visible=false;
    this._createSceneEffects();
    this._drawFace('happy','happy',1,0,0);
    if(ANIMATIONS.includes(this.animation))this.playAnimation(this.animation);
  }
  _resize() {
    if(!this.renderer)return;const box=this.button.getBoundingClientRect();if(!box.width||!box.height)return;
    this.renderer.setSize(box.width,box.height,false);const ratio=box.width/box.height;this.camera.left=-2.3*ratio;this.camera.right=2.3*ratio;this.camera.top=2.3;this.camera.bottom=-2.3;this.camera.updateProjectionMatrix();
  }
  _schedule() {
    if(!this.renderer||this._contextLost||!this.isConnected||!this._visible||document.hidden){cancelAnimationFrame(this._frame);this._frame=0;return;}
    if(!this._frame)this._frame=requestAnimationFrame(this._tick);
  }
  _tick(now) {
    this._frame=0;if(!this.renderer||this._contextLost||!this.isConnected||!this._visible||document.hidden)return;
    // Cap rendering at 30 fps. Time is paused when the mascot is hidden.
    if(this._last&&now-this._last<32){this._schedule();return;}
    const dt=this._last?Math.min((now-this._last)/1000,.1):0;this._last=now;this._elapsed+=dt;const t=this._elapsed;
    let gesture=this._gesture;if(gesture&&t-gesture.start>=gesture.duration){this._gesture=null;this.dispatchEvent(new CustomEvent('alex-animation-end',{detail:{animation:gesture.name},bubbles:true,composed:true}));gesture=null;}
    const moving=!this._reduced&&this.intensity>0,I=moving?this.intensity:0;
    const progress=gesture?clamp((t-gesture.start)/gesture.duration,0,1):0;
    const envelope=gesture?smooth(Math.min(progress*5,1))*smooth(Math.min((1-progress)*5,1))*I:0;
    if(!moving)this._look={x:0,y:0};
    this._look.x+=((moving?this._pointer.x:0)-this._look.x)*.13;this._look.y+=((moving?this._pointer.y:0)-this._look.y)*.13;
    this.robot.position.set(0,Math.sin(t*1.7)*.055*I,0);this._sceneZoom=1;this.robot.rotation.set(this._view.pitch,this._view.yaw+this._look.x*.09,0);this.body.rotation.x=this._look.y*.045*I;
    this.body.scale.setScalar(1+Math.sin(t*1.7+.5)*.006*I);
    for(let i=0;i<4;i++){const g=this.limbs[i],b=g.userData.base,arm=i<2,side=i%2?-1:1;g.position.set(b.x+(arm?-side*Math.sin(t*.68)*.008:Math.sin(t*.68+i*1.7)*.012)*I,b.y+(arm?Math.sin(t*1.7)*.018:Math.sin(t*(1.6+i*.19)+i*1.4)*.025)*I,b.z+(arm?Math.sin(t*.9)*.008:Math.sin(t*.9+i*.8)*.012)*I);g.rotation.set(b.rx,b.ry,b.rz);const part=g.userData.tipPivot||g;part.rotation.set(arm?0:b.rx+Math.sin(t*.9+i)*.025*I,arm?0:b.ry+Math.sin(t*.8+i)*.04*I,arm?-side*(Math.sin(t*.95)*.020+Math.sin(t*.37)*.008)*I:b.rz+(Math.sin(t*.95+i*1.4)*.028+Math.sin(t*.37+i)*.012)*I);}
    this.panel.visible=!!gesture&&['typing','reading'].includes(gesture.name);
    this.panel.position.set(0,-.52,.95);this.panel.rotation.set(0,0,0);this.panel.scale.setScalar(1);
    this.readingLines.visible=gesture?.name==='reading';this.keyboard.visible=gesture?.name==='typing';
    this.panelBody.material=gesture?.name==='reading'?this._readingCaseMaterial:this._keyboardCaseMaterial;
    if(gesture)this._pose(gesture.name,envelope,t-gesture.start);
    if(this.camera.zoom!==this._sceneZoom){this.camera.zoom=this._sceneZoom;this.camera.updateProjectionMatrix();}
    this._updateSceneEffects(gesture?.name,envelope,gesture?t-gesture.start:0);
    const desired=gesture?.name==='wake'&&progress<.5?'attentive':gesture&&GESTURE_FACE[gesture.name]||this.expression;
    if(desired!==this._currentFace){this._fromFace=this._currentFace;this._currentFace=desired;this._faceMix=0;}
    this._faceMix=this._reduced?1:Math.min(1,this._faceMix+dt/0.28);this._syncAccents();
    const excitement=(this._fromFace==='excited'?1-this._faceMix:0)+(desired==='excited'?this._faceMix:0);
    if(!gesture&&excitement>0){this.limbs.slice(0,2).forEach((hand,i)=>{const pivot=hand.userData.tipPivot,anchor=hand.position.clone().add(pivot.position.clone().applyQuaternion(hand.quaternion));this._handPose(hand,anchor.toArray(),[0,0,i?2.65:-2.65],excitement);});}
    if(moving&&t>=this._blinkAt){this._blinkStart=t;this._blinkAt=t+3+Math.random()*4;}
    const blink=moving&&t-this._blinkStart<.22?Math.sin((t-this._blinkStart)/.22*Math.PI):0;
    const sleep=gesture?.name==='sleep'?smooth(Math.min(progress*4,1))*smooth(Math.min((1-progress)*4,1)):gesture?.name==='wake'?1-smooth(clamp(progress/.40,0,1)):0;
    const speaking=this.speaking||gesture?.name==='explaining';const speech=speaking&&!this._reduced?(this._openness??(.20+.65*Math.abs(Math.sin(t*8.7)*Math.cos(t*3.1)))):0;
    this.body.rotation.z=(Math.sin(t*.69)*.014+this._look.x*.025)*I;if(speaking){this.body.rotation.z+=Math.sin(t*5)*.012*I;this.limbs[1].userData.tipPivot.rotation.z+=Math.sin(t*4)*.055*I;}
    const signature=[this._currentFace,this._fromFace,this._faceMix.toFixed(2),blink.toFixed(2),sleep.toFixed(2),speech.toFixed(2),this._color,this._look.x.toFixed(2),this._look.y.toFixed(2),gesture?.name==='angryScene'].join('|');
    if(signature!==this._faceSignature){this._drawFace(this._fromFace,this._currentFace,this._faceMix,Math.max(blink,sleep*.95),speech);this._faceSignature=signature;}
    this.dizzySwirl.visible=desired==='confused';if(this.dizzySwirl.visible)this.dizzySwirl.rotation.y=this._reduced?0:t*3.4;
    this.renderer.render(this.scene,this.camera);
    if(moving||gesture||this._faceMix<1)this._schedule();
  }
  _handPose(hand,anchor,angles,reach) {
    const mount=new THREE.Vector3(0,.351,0).applyQuaternion(hand.quaternion);
    hand.position.lerp(new THREE.Vector3(...anchor).sub(mount),reach);
    const goal=new THREE.Quaternion().setFromEuler(new THREE.Euler(...angles));
    const local=hand.quaternion.clone().invert().multiply(goal);
    hand.userData.tipPivot.quaternion.slerp(local,reach);
  }
  _pose(name,e,t) {
    const [left,right,lf,rf]=this.limbs;
    const lp=left.userData.tipPivot,rp=right.userData.tipPivot;
    if(name==='wave'){
      const reach=clamp(e,0,1),phase=clamp((t-.48)/1.38,0,1),sweep=Math.sin(phase*Math.PI*4)*Math.sin(phase*Math.PI);
      const anchor=right.position.clone().add(rp.position.clone().applyQuaternion(right.quaternion));this._handPose(right,anchor.toArray(),[0,right.userData.base.ry,2.10+sweep*.08],reach);this.robot.rotation.z-=reach*.012;this._sceneZoom=1/(1+reach*.07);
    }
    if(name==='wake'){const reach=clamp(e,0,1),stretch=Math.sin(clamp(t/2.8,0,1)*Math.PI)*reach;lp.rotation.z-=stretch*.40;rp.rotation.z+=stretch*.40;this.body.scale.y*=1+stretch*.025;this.robot.position.y+=stretch*.035;this.robot.rotation.x+=Math.sin(clamp((t-1.6)/.8,0,1)*Math.PI)*reach*.025;}
    if(name==='celebrate'){const reach=clamp(e,0,1);left.position.y+=reach*.10;right.position.y+=reach*.10;lp.rotation.z-=reach*(.42+Math.sin(t*4)*.18);rp.rotation.z+=reach*(.42+Math.sin(t*4)*.18);this.robot.position.y+=Math.abs(Math.sin(t*5))*e*.14;lf.rotation.z-=e*.1;rf.rotation.z+=e*.1;}
    if(name==='thinking'){const reach=clamp(e,0,1);this._handPose(left,[-.70,-.49,.835],[-.35,0,3.04],reach);this.robot.rotation.z-=reach*.025;this._look.x=reach*.22;this._look.y=-reach*.12;}
    if(name==='explaining'){const reach=clamp(e,0,1),beat=Math.sin(clamp(t/3.6,0,1)*Math.PI*3);lp.rotation.z-=reach*(.18+Math.max(0,-beat)*.28);rp.rotation.z+=reach*(.20+Math.max(0,beat)*.62);lp.rotation.x+=reach*.14;rp.rotation.x+=reach*.18;this.robot.rotation.x+=Math.sin(t*3)*reach*.016;}
    if(name==='typing'){
      const reach=clamp(e,0,1);this.panel.rotation.x=-1.12;this.panel.position.set(0,-.66,1.03);
      [left,right].forEach((hand,i)=>{const side=i?1:-1,tap=Math.max(0,Math.sin(t*8+i*Math.PI));this._handPose(hand,[side*.50,-.29-tap*.045,.68],[-.92,0,side*.07],reach);});
      const active=Math.floor(t*4)%28;this.keyHighlight.position.set((active%7-3)*.17,(1.5-Math.floor(active/7))*.125,.042);
      this.robot.rotation.x+=reach*.07;this._look.y=reach*.35;
    }
    if(name==='reading'){
      const reach=clamp(e,0,1),scan=(t*.75)%1;this.panel.rotation.set(-.12,-.04,.015);this.panel.position.set(0,-.45,1.38);
      [left,right].forEach((hand,i)=>{const side=i?1:-1;this._handPose(hand,[side*.84,-.10,1.25],[-.20,0,side*.07],reach);});
      this.robot.rotation.x+=reach*.08;this._look.x=(scan-.5)*reach*.8;this._look.y=reach*.4;
      this.readingHighlight.position.y=.10-Math.floor(scan*4)*.091;
    }
    if(name==='confused'){const reach=clamp(e,0,1);this.robot.rotation.z+=reach*(.07+Math.sin(t*1.8)*.020);left.position.y+=reach*.04;right.position.y+=reach*.04;lp.rotation.z-=reach*.48;rp.rotation.z+=reach*.48;}
    if(name==='angry'){const reach=clamp(e,0,1);this.robot.rotation.z+=Math.sin(t*18)*e*.018;lp.rotation.z-=reach*.35;rp.rotation.z+=reach*.35;}
    if(name==='sleep'){this.robot.position.y-=e*.1;this.robot.rotation.z-=e*.06;left.position.y-=e*.06;right.position.y-=e*.06;}
    if(name==='celebrateScene'||name==='angryScene'){
      const reach=clamp(e,0,1);this._sceneZoom=1/(1+reach*.48);
      const spin=smooth(clamp((t-1.1)/2.5,0,1));if(reach>0)this.robot.rotation.y+=Math.PI*(name==='angryScene'?4:2)*spin;
      if(name==='celebrateScene'){
        const hop=(start,length,height)=>t>start&&t<start+length?Math.sin((t-start)/length*Math.PI)*height:0;
        const jump=hop(.65,1.0,.65)+hop(2.1,1.25,.42)+hop(4.2,.85,.28);
        this.robot.position.x+=Math.sin(t*.85)*.66*reach;this.robot.position.y+=jump*reach;this.robot.rotation.z+=Math.sin(t*2.3)*.085*reach;
        lp.rotation.z-=reach*(.36+Math.sin(t*4.3)*.46);rp.rotation.z+=reach*(.36+Math.sin(t*4.3+1.3)*.46);lp.rotation.x+=Math.sin(t*3.6)*reach*.25;rp.rotation.x-=Math.sin(t*3.6+.8)*reach*.25;
        left.position.y+=Math.sin(t*3.7)*reach*.10;right.position.y+=Math.sin(t*3.7+1.2)*reach*.10;
        lf.rotation.x+=Math.sin(t*4.6)*reach*.52;rf.rotation.x+=Math.sin(t*4.6+Math.PI)*reach*.52;lf.rotation.z-=Math.sin(t*3.2)*reach*.20;rf.rotation.z+=Math.sin(t*3.2+.7)*reach*.20;
        lf.position.z+=Math.sin(t*4.6)*reach*.22;rf.position.z-=Math.sin(t*4.6)*reach*.22;this.body.scale.y*=1-Math.max(0,Math.sin(t*4.6))*.018*reach;
      }else{
        this.robot.position.x+=Math.sin(t*2.2)*.24*reach;this.robot.position.y+=Math.abs(Math.sin(t*8))*.10*reach;this.robot.rotation.z+=Math.sin(t*18)*.045*reach;
        lp.rotation.z-=reach*(.48+Math.sin(t*8)*.30);rp.rotation.z+=reach*(.48+Math.sin(t*8+.8)*.30);lf.rotation.x+=Math.sin(t*8)*reach*.35;rf.rotation.x-=Math.sin(t*8)*reach*.35;
      }
    }
  }
  _createSceneEffects() {
    this.dizzySwirl=new THREE.Group();this.robot.add(this.dizzySwirl);const swirl=[];
    for(let i=0;i<=90;i++){const phase=i/90,angle=phase*Math.PI*5,radius=.17+phase*.29;swirl.push(new THREE.Vector3(Math.cos(angle)*radius,1.53+phase*.30,Math.sin(angle)*radius));}
    this.dizzySwirl.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(swirl),80,.015,6,false),this.lightMaterial));this.dizzySwirl.visible=false;
    this.confetti=new THREE.InstancedMesh(new THREE.BoxGeometry(.045,.09,.012),new THREE.MeshBasicMaterial({toneMapped:false}),32);this.scene.add(this.confetti);
    const colors=[0x55ddff,0xffffff,0xffe576,0xff9ccb];for(let i=0;i<32;i++)this.confetti.setColorAt(i,new THREE.Color(colors[i%colors.length]));this.confetti.visible=false;
    const fireCanvas=document.createElement('canvas');fireCanvas.width=128;fireCanvas.height=256;const c=fireCanvas.getContext('2d');
    const gradient=c.createLinearGradient(0,240,0,10);gradient.addColorStop(0,'#fff2c1');gradient.addColorStop(.3,'#ff962e');gradient.addColorStop(.7,'#ff3347');gradient.addColorStop(1,'rgba(255,51,71,0)');
    c.fillStyle=gradient;c.beginPath();c.moveTo(64,4);c.bezierCurveTo(118,80,28,116,117,206);c.bezierCurveTo(139,271,-10,264,20,195);c.bezierCurveTo(53,130,15,71,64,4);c.fill();
    this._fireTexture=new THREE.CanvasTexture(fireCanvas);this._fireTexture.colorSpace=THREE.SRGBColorSpace;
    this._fireMaterial=new THREE.SpriteMaterial({map:this._fireTexture,transparent:true,depthWrite:false,toneMapped:false});
    this.flames=new THREE.Group();this.body.add(this.flames);for(let i=0;i<3;i++){const sprite=new THREE.Sprite(this._fireMaterial);sprite.position.set((i-1)*.34,1.59,.08);sprite.scale.set(.65,1.35,1);this.flames.add(sprite);}this.flames.visible=false;
    this._smokeMaterial=new THREE.SpriteMaterial({map:this._glowTexture,color:0x445465,transparent:true,opacity:.25,depthWrite:false});
    this.smoke=new THREE.Group();this.robot.add(this.smoke);for(let i=0;i<10;i++)this.smoke.add(new THREE.Sprite(this._smokeMaterial));this.smoke.visible=false;
    this._effectTransform=new THREE.Object3D();
  }
  _updateSceneEffects(name,e,t) {
    const reach=clamp(e,0,1),enabled=!this._reduced&&this.intensity>0;
    this.confetti.visible=enabled&&name==='celebrateScene';this.flames.visible=enabled&&name==='angryScene'&&t<4.8;this.smoke.visible=enabled&&name==='angryScene';
    if(this.confetti.visible){const d=this._effectTransform;for(let i=0;i<32;i++){const phase=(t*.36+i/32)%1;d.position.set(Math.sin(i*2.39)*2.4*reach,2.5-phase*4.5,Math.cos(i*1.7)*.6);d.rotation.set(t*2+i,t*3+i*.5,t*2.4);d.scale.setScalar(reach);d.updateMatrix();this.confetti.setMatrixAt(i,d.matrix);}this.confetti.instanceMatrix.needsUpdate=true;}
    if(this.flames.visible){this._fireMaterial.opacity=reach*smooth(clamp((4.8-t)/.6,0,1));this.flames.children.forEach((sprite,i)=>sprite.scale.set(.64+Math.sin(t*7+i)*.07,1.25+Math.sin(t*10+i)*.26,1));}
    if(this.smoke.visible){this._smokeMaterial.opacity=.50*reach;this.smoke.children.forEach((sprite,i)=>{const phase=(t*.44+i*.13)%1;sprite.position.set(Math.sin(i*2.4+phase)*(.2+phase*.55),1.70+phase*1.0,-.05);sprite.scale.setScalar(.25+phase*.75);});}
  }
  _drawFace(from,to,mix,blink,speech) {
    const c=this.faceContext;c.clearRect(0,0,512,400);
    const bg=c.createLinearGradient(0,0,512,400);bg.addColorStop(0,'#10213b');bg.addColorStop(.55,'#050d1b');bg.addColorStop(1,'#0a162a');c.fillStyle=bg;c.fillRect(0,0,512,400);
    // Fixed OLED reflection, independent of blinks and mouth animation.
    const glass=c.createLinearGradient(0,0,150,210);glass.addColorStop(0,'rgba(215,233,255,.10)');glass.addColorStop(1,'rgba(215,233,255,0)');c.fillStyle=glass;c.beginPath();c.moveTo(0,0);c.lineTo(320,0);c.lineTo(0,250);c.fill();
    const paint=(face,alpha)=>{if(alpha<=0)return;c.save();c.globalAlpha=alpha;const color=face==='angry'?'#ff3347':this._color;c.fillStyle=c.strokeStyle=color;c.shadowColor=color;c.shadowBlur=26;c.lineWidth=28;c.lineCap='round';c.lineJoin='round';
      const stroke=(coords)=>{c.beginPath();coords(c);c.stroke();};
      c.save();c.translate(0,171);c.scale(1,Math.max(.075,1-blink));c.translate(0,-171);c.translate(this._look.x*9,this._look.y*5);
      for(let i=0;i<2;i++){const x=i?351:161,flip=i?-1:1;
        if(face==='excited'){stroke(p=>{p.moveTo(x-38*flip,137);p.lineTo(x+27*flip,166);p.lineTo(x-38*flip,185);});}
        else if(face==='happy'||(face==='wink'&&i===1)){stroke(p=>{p.moveTo(x-59,181);p.quadraticCurveTo(x,78,x+59,181);});}
        else if(face==='surprised'){c.lineWidth=15;c.beginPath();c.ellipse(x,164,32,40,0,0,Math.PI*2);c.stroke();}
        else if(face==='thoughtful'&&i===0){c.lineWidth=15;stroke(p=>{p.moveTo(x-32,164);p.quadraticCurveTo(x,184,x+32,164);});c.lineWidth=28;}
        else if(face==='angry'){c.beginPath();c.moveTo(x-39,137+(i?27:0));c.lineTo(x+39,137+(i?0:27));c.quadraticCurveTo(x+22,212,x-23,186);c.closePath();c.fill();}
        else {c.beginPath();c.ellipse(x,165,face==='confused'?26:26,face==='thoughtful'?31:face==='confused'?(i?42:34):43,0,0,Math.PI*2);c.fill();}
        if(face==='thoughtful'&&i===1){c.lineWidth=8;stroke(p=>{p.moveTo(x-27,109);p.quadraticCurveTo(x,97,x+28,105);});c.lineWidth=28;}
        if(face==='confused'){c.lineWidth=8;const raised=i?12:0;stroke(p=>{p.moveTo(x-28,108-raised);p.quadraticCurveTo(x,86-raised,x+28,105-raised);});c.lineWidth=28;}
        if(face==='angry'&&this._gesture?.name==='angryScene'){c.lineWidth=12;stroke(p=>{p.moveTo(x-41,112+(i?25:0));p.lineTo(x+41,112+(i?0:25));});c.lineWidth=28;}
      }c.restore();
      // Speech changes only the mouth, preserving eyes, eyebrows and stable screen.
      const cy=278;c.shadowBlur=16;
      if(face==='angry'&&this._gesture?.name==='angryScene'){c.lineWidth=10;stroke(p=>{p.moveTo(220,cy-8);p.lineTo(289,cy-8);p.lineTo(294,cy+20);p.lineTo(215,cy+20);p.closePath();});c.lineWidth=5;stroke(p=>{p.moveTo(224,cy+5);p.lineTo(235,cy+11);p.lineTo(247,cy+1);p.lineTo(260,cy+11);p.lineTo(273,cy+1);p.lineTo(287,cy+8);});c.lineWidth=7;stroke(p=>{p.moveTo(432,87);p.lineTo(432,109);p.moveTo(419,98);p.lineTo(445,98);});}
      else if(speech>0){c.beginPath();c.ellipse(256,cy,22+speech*19,6+speech*29,0,0,Math.PI*2);c.fill();}
      else if(['happy','excited','wink'].includes(face)){const w=face==='excited'?57:43;c.beginPath();c.moveTo(256-w,cy-12);c.quadraticCurveTo(256,cy-3,256+w,cy-12);c.bezierCurveTo(256+w,cy+48,256-w,cy+48,256-w,cy-12);c.fill();}
      else if(face==='surprised'){c.beginPath();c.ellipse(256,cy,13,20,0,0,Math.PI*2);c.fill();}
      else if(face==='confused'){c.lineWidth=7;stroke(p=>{p.moveTo(243,cy-1);p.quadraticCurveTo(256,cy+8,269,cy-3);});}
      else {c.lineWidth=8;stroke(p=>{p.moveTo(243,cy);p.quadraticCurveTo(256,face==='angry'||face==='thoughtful'?cy-13:cy+(face==='confused'?-6:face==='attentive'?9:0),270,cy+(face==='confused'?5:0));});}
      c.restore();};
    paint(from,1-mix);paint(to,mix);this.faceTexture.needsUpdate=true;
  }
  _dispose() {
    if(this.scene){const geometries=new Set(),materials=new Set();this.scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});[this._keyboardCaseMaterial,this._readingCaseMaterial].filter(Boolean).forEach(m=>materials.add(m));geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
    this.faceTexture?.dispose();this._glowTexture?.dispose();this._paperTexture?.dispose();this._fireTexture?.dispose();this._ledTexture?.dispose();this._environment?.dispose();if(this.renderer){this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();this.renderer=null;}
  }
}
if(!customElements.get('professor-alex-mascot'))customElements.define('professor-alex-mascot',ProfessorAlexMascot);
