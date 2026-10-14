"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const script=fs.readFileSync(
  path.join(__dirname,"..","assets","js","plantao-gestante-v1.js"),"utf8"
);

function mountPatient(url,photoWidth,photoHeight){
  const activeClasses=new Set();
  const attrs={src:url};
  let mutationCallback;
  const scene={
    dataset:{},children:[],
    classList:{toggle(name,active){active?activeClasses.add(name):activeClasses.delete(name)}},
    appendChild(node){this.children.push(node)},
    getBoundingClientRect(){return {left:0,top:0,width:700,height:520}}
  };
  const patient={
    complete:true,naturalWidth:photoWidth,naturalHeight:photoHeight,
    currentSrc:url,dataset:{luriaEyes:"auto",luriaRr:"18"},
    closest(){return scene},
    getAttribute(name){return attrs[name]},
    getBoundingClientRect(){return {left:0,top:0,width:700,height:520}},
    addEventListener(){}
  };
  function createElement(tag){
    const el={
      tagName:tag,children:[],className:"",style:{},hidden:false,
      append(...children){this.children.push(...children)},
      setAttribute(){},
      removeAttribute(name){delete this[name]},
      querySelector(selector){return this.children.find(child=>child.className===selector.slice(1))},
      getContext(){return {
        translate(){},rotate(){},drawImage(){},beginPath(){},
        moveTo(){},quadraticCurveTo(){},stroke(){},save(){},restore(){},scale(){},
        createRadialGradient(){return {addColorStop(){}}},
        fillRect(){}
      }},
      toDataURL(){return "data:image/png;base64,AAAA"}
    };
    return el;
  }
  const document={
    getElementById(id){return id==="plantao-patient-image"?patient:null},
    createElement
  };
  const ResizeObserver=class{observe(){}};
  const MutationObserver=class{
    constructor(callback){mutationCallback=callback}
    observe(){}
  };
  const window={ResizeObserver,addEventListener(){}};
  const getComputedStyle=()=>({objectFit:"cover",objectPosition:"50% 50%"});
  // Stub real browser APIs; checks the exact source used in production.
  new Function(
    "document","window","ResizeObserver","MutationObserver",
    "requestAnimationFrame","getComputedStyle",script
  )(document,window,ResizeObserver,MutationObserver,callback=>callback(),getComputedStyle);

  const rig=scene.children.find(child=>child.className==="luria-pregnant-v1-rig");
  assert.ok(rig,"gestante rig should exist");
  return {
    rig,scene,patient,activeClasses,attrs,
    chest:rig.querySelector(".luria-pregnant-v1-chest"),
    eyes:rig.querySelector(".luria-pregnant-v1-eyes"),
    rerender(){mutationCallback()}
  };
}

for(const [name,url,width,height] of [
  ["hospital","/assets/img/plantao/gestante_acordada_triste_1300x900_100kb.webp",1300,900],
  ["PWA","assets/img/plantao pwa/14-gestante-acordada.webp",941,1672]
]){
  test(`gestante ${name}: respira e pisca sem trocar a imagem original`,()=>{
    const sample=mountPatient(url,width,height);
    assert.equal(sample.rig.hidden,false);
    assert.ok(sample.activeClasses.has("luria-pregnant-v1"));
    assert.equal(sample.chest.src,url);
    assert.match(sample.eyes.src,/^data:image\/png/);
    assert.equal(Number.parseFloat(sample.chest.style.animationDuration),60/18);
    assert.ok(sample.rig.style.width.endsWith("px"));
    sample.patient.dataset.luriaEyes="closed";
    sample.patient.dataset.luriaRr="0";
    sample.rerender();
    assert.equal(sample.scene.dataset.luriaEyes,"closed");
    assert.equal(sample.scene.dataset.luriaBreath,"stopped");
    sample.attrs.src="/assets/img/plantao/luria-homem-idoso-v7-aberto.webp";
    sample.rerender();
    assert.equal(sample.rig.hidden,true);
    assert.equal(sample.activeClasses.has("luria-pregnant-v1"),false);
  });
}
