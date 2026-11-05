// GLSL shader source for Corpus (a dissectable human body). Loaded before app.js;
// top-level consts in a classic script are visible to app.js via global scope.

const VS=`#version 300 es
in vec3 aPos; in vec3 aNrm; in float aId;
uniform mat4 uVP; uniform sampler2D uLut; uniform float uLutW;
out vec3 vN,vW,vC; out float vRough,vSSS,vHi,vAlpha,vId,vSurf;
void main(){
  float u=(aId+0.5)/uLutW;
  vec4 a=texture(uLut,vec2(u,0.25));   // rgb colour, a opacity
  vec4 b=texture(uLut,vec2(u,0.75));   // roughness, subsurface, highlight
  vC=a.rgb; vAlpha=a.a; vRough=b.r; vSSS=b.g; vHi=b.b; vSurf=b.a; vId=aId;
  vN=aNrm; vW=aPos;
  gl_Position=uVP*vec4(aPos,1.0);
}`;

const FS=`#version 300 es
precision highp float;
in vec3 vN,vW,vC; in float vRough,vSSS,vHi,vAlpha,vId,vSurf;
uniform vec3 uEye; uniform float uPick,uTime;
uniform vec4 uPlane;            // xyz normal, w offset; unused when w>900
out vec4 o;

float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*0.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float vnoise(vec3 p){
  vec3 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=h21(i.xy+i.z*37.0), b=h21(i.xy+vec2(1,0)+i.z*37.0);
  float c=h21(i.xy+vec2(0,1)+i.z*37.0), d=h21(i.xy+vec2(1,1)+i.z*37.0);
  float e=h21(i.xy+(i.z+1.0)*37.0), g=h21(i.xy+vec2(1,0)+(i.z+1.0)*37.0);
  float h=h21(i.xy+vec2(0,1)+(i.z+1.0)*37.0), k=h21(i.xy+vec2(1,1)+(i.z+1.0)*37.0);
  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y), mix(mix(e,g,f.x),mix(h,k,f.x),f.y), f.z);
}
vec3 env(vec3 d){
  float y=d.y*0.5+0.5;
  vec3 c=mix(vec3(0.006,0.016,0.040), vec3(0.060,0.105,0.190), smoothstep(0.25,0.95,y)); /* TRAUBE: fundo azul-marinho */
  c=mix(c,vec3(0.004,0.010,0.026),smoothstep(0.45,0.02,y));
  float key=pow(max(dot(d,normalize(vec3(0.34,0.82,0.46))),0.0),16.0);
  float fil=pow(max(dot(d,normalize(vec3(-0.72,0.30,-0.60))),0.0),10.0);
  c+=vec3(1.00,0.95,0.88)*key*2.3 + vec3(0.44,0.55,0.80)*fil*0.9;
  return c;
}
void main(){
  if(uPlane.w<900.0 && dot(vW,uPlane.xyz) > uPlane.w) discard;

  // screen-door transparency: no sorting needed, and it survives MSAA
  if(vAlpha<0.995){
    ivec2 p=ivec2(gl_FragCoord.xy);
    int idx=(p.x&3)+((p.y&3)<<2);
    float th[16]=float[16](0.031,0.531,0.156,0.656,0.781,0.281,0.906,0.406,
                           0.219,0.719,0.094,0.594,0.969,0.469,0.844,0.344);
    if(vAlpha < th[idx]) discard;
  }
  if(uPick>0.5){
    float id=vId+1.0;
    o=vec4(mod(id,256.0)/255.0, mod(floor(id/256.0),256.0)/255.0, floor(id/65536.0)/255.0,1.0);
    return;
  }
  vec3 N=normalize(vN); if(!gl_FrontFacing) N=-N;
  // (surface styles below may perturb N)
  vec3 V=normalize(uEye-vW);

  // living tissue is never uniform: break up the albedo and the gloss
  float n1=vnoise(vW*0.055), n2=vnoise(vW*0.30);
  vec3 alb=vC*(0.90+n1*0.17+n2*0.07);
  float rough=clamp(vRough+(n2-0.5)*0.10,0.08,1.0);
  float sheen=0.0;
  int sf=int(vSurf*8.0+0.5);
  if(sf==1){                                   // skin: pores, mottling, a dry sheen
    float pore=vnoise(vW*7.5)*0.6+vnoise(vW*19.0)*0.4;
    N=normalize(N+vec3((pore-0.5)*0.10,(vnoise(vW*17.0+7.0)-0.5)*0.10,(pore-0.5)*0.08));
    alb*=0.93+pore*0.16;
    alb=mix(alb,alb*vec3(1.10,0.86,0.80),vnoise(vW*0.9)*0.42);   // blotching
    rough=clamp(rough+ (pore-0.5)*0.18, 0.30,1.0);
    sheen=0.16;
  } else if(sf==2){                            // bone: matte, faintly porous
    float po=vnoise(vW*3.4)*0.55+vnoise(vW*11.0)*0.45;
    alb*=0.90+po*0.20; rough=clamp(rough+po*0.14,0.45,1.0);
    N=normalize(N+vec3(0.0,(po-0.5)*0.035,0.0));
  } else if(sf==3){                            // vessel wall: smooth and wet
    rough=clamp(rough*0.72,0.06,1.0); sheen=0.30;
  } else if(sf==4){                            // nerve: fibrous, faintly striped
    float st=abs(sin(vW.y*3.4+vW.x*1.2));
    alb*=0.90+st*0.18; rough=clamp(rough-st*0.08,0.18,1.0);
  } else if(sf==5){                            // viscera: glossy serosa
    float m=vnoise(vW*1.35);
    alb*=0.88+m*0.26; rough=clamp(rough+(m-0.5)*0.12,0.10,1.0); sheen=0.34;
  }

  vec3 L1=normalize(vec3(0.34,0.82,0.46)), L2=normalize(vec3(-0.72,0.30,-0.60)),
       L3=normalize(vec3(0.0,-0.55,0.55));
  vec3 C1=vec3(1.00,0.94,0.86)*1.85, C2=vec3(0.42,0.54,0.82)*0.62, C3=vec3(0.35,0.22,0.20)*0.40;
  vec3 Ls[3]; Ls[0]=L1;Ls[1]=L2;Ls[2]=L3;
  vec3 Cs[3]; Cs[0]=C1;Cs[1]=C2;Cs[2]=C3;

  vec3 lit=vec3(0.0);
  float w=0.35+vSSS*0.45;                 // wrap: light bleeds round the terminator
  for(int i=0;i<3;i++){
    float nl=clamp((dot(N,Ls[i])+w)/(1.0+w),0.0,1.0);
    vec3 warm=mix(vec3(1.0),vec3(1.25,0.62,0.52),vSSS*0.75);
    lit+=Cs[i]*nl*alb*warm/3.14159;
    // light carried through thin tissue and out the far side
    float tr=pow(clamp(dot(V,-Ls[i])*0.5+0.5,0.0,1.0),3.5);
    lit+=Cs[i]*tr*alb*vSSS*0.42;
    vec3 H=normalize(Ls[i]+V);
    float a=max(rough*rough,0.004), a2=a*a, nh=max(dot(N,H),0.0);
    float dd=nh*nh*(a2-1.0)+1.0;
    float spec=min(a2/(3.14159*dd*dd),18.0);
    float fr=0.035+0.965*pow(1.0-max(dot(H,V),0.0),5.0);
    lit+=Cs[i]*spec*fr*max(dot(N,Ls[i]),0.0)*(0.55+vSSS*0.5);   // wet sheen
  }
  // a thin clear layer over wet tissue and skin, on top of everything else
  if(sheen>0.0){
    vec3 H=normalize(L1+V);
    float a2=0.0016, nh=max(dot(N,H),0.0);
    float dd=nh*nh*(a2-1.0)+1.0;
    lit+=C1*min(a2/(3.14159*dd*dd),22.0)*sheen*pow(1.0-max(dot(N,V),0.0),2.2)*0.7;
  }
  vec3 R=reflect(-V,N);
  float fres=pow(1.0-max(dot(N,V),0.0),4.0);
  lit+=env(R)*(0.035+0.26*fres)*(1.0-rough*0.85);
  lit+=mix(env(N),vec3(0.10,0.085,0.075),0.55)*alb*0.62;
  lit+=vC*vHi*(0.55+0.35*sin(uTime*3.4));      // selection pulse

  o=vec4(min(lit,vec3(7.0)),1.0);
}`;

const QV=`#version 300 es
in vec2 aPos; out vec2 uv;
void main(){uv=aPos*0.5+0.5;gl_Position=vec4(aPos,0,1);}`;
const BRIGHT=`#version 300 es
precision highp float; in vec2 uv; uniform sampler2D t; out vec4 o;
void main(){vec3 c=min(texture(t,uv).rgb,vec3(4.0));float l=dot(c,vec3(.2126,.7152,.0722));
  o=vec4(c*smoothstep(0.95,2.1,l)*0.5,1.0);}`;
const BLUR=`#version 300 es
precision highp float; in vec2 uv; uniform sampler2D t; uniform vec2 dir; out vec4 o;
void main(){vec3 s=texture(t,uv).rgb*0.227;
  s+=texture(t,uv+dir*1.3846).rgb*0.316;s+=texture(t,uv-dir*1.3846).rgb*0.316;
  s+=texture(t,uv+dir*3.2308).rgb*0.070;s+=texture(t,uv-dir*3.2308).rgb*0.070;
  o=vec4(s,1.0);}`;
const AOS=`#version 300 es
precision highp float; in vec2 uv; uniform sampler2D dep; uniform vec2 texel;
uniform float uNear,uFar; out vec4 o;
float lin(float z){return (2.0*uNear*uFar)/(uFar+uNear-(z*2.0-1.0)*(uFar-uNear));}
void main(){
  float c=lin(texture(dep,uv).r);
  if(c>=uFar*0.9){o=vec4(1.0);return;}
  float occ=0.0; const int N=14;
  for(int i=0;i<N;i++){
    float a=float(i)*2.39996, r=sqrt((float(i)+0.6)/float(N));
    vec2 off=vec2(cos(a),sin(a))*r*texel*30.0*clamp(60.0/c,0.3,3.0);
    float d=c-lin(texture(dep,uv+off).r);
    occ+=smoothstep(0.15,2.4,d)*(1.0-smoothstep(9.0,22.0,d));
  }
  o=vec4(vec3(clamp(1.0-occ/float(N)*1.3,0.0,1.0)),1.0);
}`;
const COMP=`#version 300 es
precision highp float; in vec2 uv; uniform sampler2D t,b,ao; uniform float uT; out vec4 o;
void main(){
  float a=mix(1.0,clamp(texture(ao,uv).r,0.32,1.0),0.82);
  vec3 c=texture(t,uv).rgb*a+min(texture(b,uv).rgb,vec3(1.6))*0.40;
  c*=1.22;
  c=(c*(2.51*c+0.03))/(c*(2.43*c+0.59)+0.14);
  float v=1.0-dot(uv-0.5,uv-0.5)*0.62; c*=clamp(v,0.0,1.0);
  c=mix(vec3(dot(c,vec3(.2126,.7152,.0722))),c,1.20);
  float g=fract(sin(dot(uv*vec2(1024.0,768.0)+uT,vec2(12.9898,78.233)))*43758.5453);
  c+=(g-0.5)*0.007;
  o=vec4(pow(max(c,0.0),vec3(1.0/2.2)),1.0);}`;
