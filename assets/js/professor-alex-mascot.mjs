import * as THREE from '../vendor/three.module.min.mjs';

export const EXPRESSIONS = ['happy','attentive','thoughtful','surprised','confused','excited','wink','angry'];
export const ANIMATIONS = ['wave','celebrate','thinking','explaining','typing','reading','confused','angry','sleep','wake'];
const DURATIONS = {wave:2400,celebrate:2600,thinking:3200,explaining:3600,typing:3400,reading:3000,confused:2600,angry:2600,sleep:4000,wake:2800};
const GESTURE_FACE = {wave:'happy',celebrate:'excited',thinking:'thoughtful',confused:'confused',angry:'angry',wake:'happy'};
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
function roundedSolid(w,h,d,r,bevel) {
  const g=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:8,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:20});
  g.translate(0,0,-d/2);g.computeVertexNormals();return g;
}
function screenGeometry(w,h,r) {
  const g=new THREE.ShapeGeometry(roundedShape(w,h,r),20),p=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/w+.5,p.getY(i)/h+.5);
  return g;
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
    this._elapsed=0;this._last=0;this._visible=true;this._frame=0;this._gesture=null;this._faceMix=1;this._currentFace='happy';this._fromFace='happy';this._blinkAt=2+Math.random()*3;this._blinkStart=-10;this._pointer={x:0,y:0};this._look={x:0,y:0};this._openness=null;this._view={yaw:-.18,pitch:.06};
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
  setView(yaw=-.18,pitch=.06){this._view={yaw:clamp(Number(yaw)||0,-Math.PI,Math.PI),pitch:clamp(Number(pitch)||0,-.45,.45)};this._schedule();}
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
    this._color=this._theme==='pink'?'#ff87c6':'#4edaff';
    if(this.lightMaterial){this.lightMaterial.color.set(this._color);this.lightMaterial.emissive.set(this._color);this.whiteMaterial.color.set(this._theme==='dark'?'#e6edf8':'#ffffff');}
  }
  _createScene() {
    this.renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.button.prepend(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-hidden','true');
    this.renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(this._frame);this._frame=0;this._contextLost=true;this.message.hidden=false;this.message.textContent='Restaurando a renderização 3D…';});
    this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this._contextLost=false;this._last=0;this.message.hidden=true;this._schedule();});
    this.scene=new THREE.Scene();this.camera=new THREE.OrthographicCamera(-2.4,2.4,2.4,-2.4,.1,30);this.camera.position.set(0,.5,8);this.camera.lookAt(0,-.12,0);
    this._environment=studioEnvironment(this.renderer);this.scene.environment=this._environment.texture;
    this.scene.add(new THREE.HemisphereLight(0xe6f2ff,0x6b7290,1.8));
    const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(-3,5,5);this.scene.add(key);
    const rim=new THREE.DirectionalLight(0x8ddaff,2.5);rim.position.set(3,1,-2);this.scene.add(rim);
    this.whiteMaterial=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:.08,roughness:.24,clearcoat:1,clearcoatRoughness:.14,envMapIntensity:.8});
    this.lightMaterial=new THREE.MeshStandardMaterial({color:0x4edaff,emissive:0x4edaff,emissiveIntensity:.45,roughness:.25,toneMapped:false});
    const dark=new THREE.MeshPhysicalMaterial({color:0x091426,metalness:.18,roughness:.22,clearcoat:1,envMapIntensity:.25});
    const mesh=(geo,mat,parent,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;};
    this.robot=new THREE.Group();this.scene.add(this.robot);
    this.body=new THREE.Group();this.body.position.y=.35;this.robot.add(this.body);
    mesh(roundedSolid(2.05,1.87,.55,.38,.17),this.whiteMaterial,this.body);
    mesh(roundedSolid(1.94,1.51,.04,.31,.055),dark,this.body,0,.12,.48);
    this.faceCanvas=document.createElement('canvas');this.faceCanvas.width=512;this.faceCanvas.height=400;this.faceContext=this.faceCanvas.getContext('2d');
    this.faceTexture=new THREE.CanvasTexture(this.faceCanvas);this.faceTexture.colorSpace=THREE.SRGBColorSpace;this.faceTexture.minFilter=THREE.LinearFilter;this.faceTexture.generateMipmaps=false;
    mesh(screenGeometry(1.91,1.48,.32),new THREE.MeshBasicMaterial({map:this.faceTexture,toneMapped:false}),this.body,0,.12,.563);
    // Subtle glass reflection stays fixed while the luminous face changes.
    const sheen=mesh(screenGeometry(1.91,1.48,.32),new THREE.MeshBasicMaterial({color:0xb6d2fa,transparent:true,opacity:.035,depthWrite:false}),this.body,0,.12,.568);sheen.name='OLED-glass';
    for(let i=0;i<3;i++)mesh(new THREE.CapsuleGeometry(.022,.05,4,8),this.lightMaterial,this.body,.36+i*.10,-.84,.465);
    const ringGeo=new THREE.TorusGeometry(.135,.017,6,24);
    for(const side of [-1,1]) {const ring=mesh(ringGeo,this.lightMaterial,this.body,side*1.198,.02,0);ring.rotation.y=Math.PI/2;}
    const back=mesh(new THREE.TorusGeometry(.27,.018,8,32),this.lightMaterial,this.body,0,0,-.455);back.rotation.y=Math.PI;
    this.limbs=[];
    for(let i=0;i<4;i++) {
      const arm=i<2,side=i%2===0?-1:1,g=new THREE.Group();g.name=['left-arm','right-arm','left-leg','right-leg'][i];this.robot.add(g);this.limbs.push(g);
      g.userData.base={x:arm?side*1.66:side*.48,y:arm?-.03:-1.24,z:arm?0:.08,rz:arm?-side*.58:side*.10};
      mesh(new THREE.CapsuleGeometry(arm?.205:.22,arm?.28:.27,10,28),this.whiteMaterial,g);
      const ring=mesh(new THREE.TorusGeometry(arm?.198:.213,.024,8,28),this.lightMaterial,g,0,-.19,0);ring.rotation.x=Math.PI/2;
      const cap=mesh(new THREE.SphereGeometry(arm?.184:.20,20,10),this.lightMaterial,g,0,-.30,0);cap.scale.y=.16;
    }
    // Translucent holographic panel appears only while reading or typing.
    this.panel=new THREE.Group();this.robot.add(this.panel);this.panel.position.set(0,-.52,.95);
    mesh(screenGeometry(1.22,.59,.06),new THREE.MeshBasicMaterial({color:0x3acfff,transparent:true,opacity:.19,side:THREE.DoubleSide,depthWrite:false}),this.panel);
    const edges=new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.22,.59));this.panel.add(new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0x65dbff,transparent:true,opacity:.8})));
    for(let i=0;i<3;i++)mesh(new THREE.PlaneGeometry(.65-i*.12,.015),new THREE.MeshBasicMaterial({color:0x9beaff,transparent:true,opacity:.65}),this.panel,-.16,.14-i*.12,.002);
    this.panel.rotation.x=-.25;this.panel.visible=false;
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
    this.robot.position.y=Math.sin(t*1.7)*.055*I;this.robot.rotation.set(this._view.pitch+this._look.y*.045,this._view.yaw+this._look.x*.09,Math.sin(t*.69)*.018*I+this._look.x*.025);
    this.body.scale.setScalar(1+Math.sin(t*1.7+.5)*.006*I);
    for(let i=0;i<4;i++){const g=this.limbs[i],b=g.userData.base;g.position.set(b.x,b.y+Math.sin(t*(1.6+i*.19)+i*1.4)*.035*I,b.z);g.rotation.set(Math.sin(t*.9+i)*.035*I,Math.sin(t*.8+i)*.06*I,b.rz+Math.sin(t*1.3+i)*.045*I);}
    this.panel.visible=!!gesture&&['typing','reading'].includes(gesture.name);
    if(gesture)this._pose(gesture.name,envelope,t-gesture.start);
    const desired=gesture&&GESTURE_FACE[gesture.name]||this.expression;
    if(desired!==this._currentFace){this._fromFace=this._currentFace;this._currentFace=desired;this._faceMix=0;}
    this._faceMix=this._reduced?1:Math.min(1,this._faceMix+dt/0.28);
    if(moving&&t>=this._blinkAt){this._blinkStart=t;this._blinkAt=t+3+Math.random()*4;}
    const blink=moving&&t-this._blinkStart<.22?Math.sin((t-this._blinkStart)/.22*Math.PI):0;
    const sleep=gesture?.name==='sleep'?smooth(Math.min(progress*4,1))*smooth(Math.min((1-progress)*4,1)):0;
    const speech=this.speaking&&!this._reduced?(this._openness??(.20+.65*Math.abs(Math.sin(t*8.7)*Math.cos(t*3.1)))):0;
    if(this.speaking){this.body.rotation.z=Math.sin(t*5)*.012*I;this.limbs[1].rotation.z+=Math.sin(t*4)*.055*I;}else this.body.rotation.z=0;
    const signature=[this._currentFace,this._fromFace,this._faceMix.toFixed(2),blink.toFixed(2),sleep.toFixed(2),speech.toFixed(2),this._color,this._look.x.toFixed(2),this._look.y.toFixed(2)].join('|');
    if(signature!==this._faceSignature){this._drawFace(this._fromFace,this._currentFace,this._faceMix,Math.max(blink,sleep*.95),speech);this._faceSignature=signature;}
    this.renderer.render(this.scene,this.camera);
    if(moving||gesture||this._faceMix<1)this._schedule();
  }
  _pose(name,e,t) {
    const [left,right,lf,rf]=this.limbs;
    if(name==='wave'||name==='wake'){right.position.y+=e*.66;right.position.x+=e*.04;right.rotation.z+=e*(-.8+Math.sin(t*9)*.28);this.robot.rotation.z+=Math.sin(t*2)*e*.05;}
    if(name==='celebrate'){left.position.y+=e*.62;right.position.y+=e*.62;left.rotation.z+=e*.85;right.rotation.z-=e*.85;this.robot.position.y+=Math.abs(Math.sin(t*5))*e*.22;lf.rotation.z-=e*.1;rf.rotation.z+=e*.1;}
    if(name==='thinking'){left.position.set(left.position.x+e*.56,left.position.y+e*.24,left.position.z+e*.65);left.rotation.z-=e*.9;this.robot.rotation.z-=e*.09;}
    if(name==='explaining'){left.rotation.z+=Math.sin(t*3)*e*.3;right.rotation.z-=Math.sin(t*3+1)*e*.38;right.position.y+=e*.18;}
    if(name==='typing'){left.position.x+=e*.70;right.position.x-=e*.70;left.position.z+=e*1.12;right.position.z+=e*1.12;left.position.y-=e*.28+Math.sin(t*14)*e*.025;right.position.y-=e*.28+Math.cos(t*14)*e*.025;}
    if(name==='reading'){this.robot.rotation.x+=e*.10;left.position.x+=e*.56;left.position.z+=e*.83;left.position.y-=e*.1;}
    if(name==='confused'){this.robot.rotation.z+=Math.sin(t*2.6)*e*.10;left.position.y+=e*.18;right.position.y+=e*.05;}
    if(name==='angry'){this.robot.rotation.z+=Math.sin(t*18)*e*.018;left.position.y+=e*.2;right.position.y+=e*.2;left.rotation.z+=e*.4;right.rotation.z-=e*.4;}
    if(name==='sleep'){this.robot.position.y-=e*.1;this.robot.rotation.z-=e*.06;left.position.y-=e*.06;right.position.y-=e*.06;}
  }
  _drawFace(from,to,mix,blink,speech) {
    const c=this.faceContext;c.clearRect(0,0,512,400);
    const bg=c.createLinearGradient(0,0,512,400);bg.addColorStop(0,'#10213b');bg.addColorStop(.55,'#050d1b');bg.addColorStop(1,'#0a162a');c.fillStyle=bg;c.fillRect(0,0,512,400);
    // Fixed OLED reflection, independent of blinks and mouth animation.
    const glass=c.createLinearGradient(0,0,150,210);glass.addColorStop(0,'rgba(215,233,255,.10)');glass.addColorStop(1,'rgba(215,233,255,0)');c.fillStyle=glass;c.beginPath();c.moveTo(0,0);c.lineTo(320,0);c.lineTo(0,250);c.fill();
    const paint=(face,alpha)=>{if(alpha<=0)return;c.save();c.globalAlpha=alpha;const color=face==='angry'?'#ff557b':this._color;c.fillStyle=c.strokeStyle=color;c.shadowColor=color;c.shadowBlur=18;c.lineWidth=28;c.lineCap='round';c.lineJoin='round';
      const stroke=(coords)=>{c.beginPath();coords(c);c.stroke();};
      c.save();c.translate(0,171);c.scale(1,Math.max(.075,1-blink));c.translate(0,-171);c.translate(this._look.x*9,this._look.y*5);
      for(let i=0;i<2;i++){const x=i?351:161,flip=i?1:-1;
        if(face==='excited'){stroke(p=>{p.moveTo(x-38*flip,137);p.lineTo(x+27*flip,166);p.lineTo(x-38*flip,185);});}
        else if(face==='happy'||(face==='wink'&&i===1)||(face==='thoughtful'&&i===1)){stroke(p=>{p.moveTo(x-59,181);p.quadraticCurveTo(x,78,x+59,181);});}
        else if(face==='surprised'){c.lineWidth=15;c.beginPath();c.ellipse(x,164,32,40,0,0,Math.PI*2);c.stroke();}
        else if(face==='thoughtful'&&i===0){stroke(p=>{p.moveTo(x-32,166);p.quadraticCurveTo(x,195,x+32,166);});}
        else if(face==='angry'){c.beginPath();c.moveTo(x-39,137+(i?27:0));c.lineTo(x+39,137+(i?0:27));c.quadraticCurveTo(x+22,212,x-23,186);c.closePath();c.fill();}
        else {c.beginPath();c.ellipse(x,165,face==='confused'?25:26,face==='thoughtful'?25:43,face==='confused'?flip*.13:0,0,Math.PI*2);c.fill();}
        if(face==='confused'){c.lineWidth=9;stroke(p=>{p.moveTo(x-31,105+(i?-8:10));p.lineTo(x+29,105+(i?-17:15));});c.lineWidth=20;}
      }c.restore();
      // Speech changes only the mouth, preserving eyes, eyebrows and stable screen.
      const cy=278;c.shadowBlur=16;
      if(speech>0){c.beginPath();c.ellipse(256,cy,22+speech*19,6+speech*29,0,0,Math.PI*2);c.fill();}
      else if(['happy','excited','wink'].includes(face)){const w=face==='excited'?57:43;c.beginPath();c.moveTo(256-w,cy-12);c.quadraticCurveTo(256,cy-3,256+w,cy-12);c.bezierCurveTo(256+w,cy+48,256-w,cy+48,256-w,cy-12);c.fill();}
      else if(face==='surprised'){c.beginPath();c.ellipse(256,cy,13,20,0,0,Math.PI*2);c.fill();}
      else {c.lineWidth=8;stroke(p=>{p.moveTo(243,cy);p.quadraticCurveTo(256,face==='angry'||face==='thoughtful'?cy-13:cy+(face==='confused'?-6:0),270,cy+(face==='confused'?5:0));});}
      c.restore();};
    paint(from,1-mix);paint(to,mix);this.faceTexture.needsUpdate=true;
  }
  _dispose() {
    if(this.scene){const geometries=new Set(),materials=new Set();this.scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
    this.faceTexture?.dispose();this._environment?.dispose();if(this.renderer){this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();this.renderer=null;}
  }
}
if(!customElements.get('professor-alex-mascot'))customElements.define('professor-alex-mascot',ProfessorAlexMascot);
