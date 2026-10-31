const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');

const adapter=fs.readFileSync(path.join(__dirname,'../assets/js/plantao-aph-characters.js'),'utf8');
const assetRoot=path.join(__dirname,'../assets/img/plantao/aph');

test('APH swaps the four current patients without leaking layers into emergency-room cases',async()=>{
  const dom=new JSDOM('<div id="plantao-simulator"><section class="plantao-scene"><img id="plantao-patient-image"></section></div>',{
    url:'https://www.resibulando.online/plantao/sala-emergencia/',runScripts:'outside-only'
  });
  const {window}=dom;
  const image=window.document.getElementById('plantao-patient-image');
  const scene=image.closest('.plantao-scene');
  window.eval(adapter);
  const tick=()=>new Promise(resolve=>window.setTimeout(resolve,0));
  for(const character of ['homem-adulto','mulher-adulta','homem-idoso','mulher-idosa']){
    for(const state of ['aberto','fechado']){
      const file=`${character}-${state}.webp`;
      assert.ok(fs.existsSync(path.join(assetRoot,file)),`Imagem ausente: ${file}`);
      image.src=`/assets/img/plantao/aph/${file}?v=20261021`;
      image.dataset.traubeEyes=state==='fechado'?'closed':'auto';
      image.dataset.traubeRr='18';
      await tick();
      assert.ok(scene.classList.contains('aph-active'));
      assert.equal(scene.querySelectorAll('.aph-thorax').length,1);
      assert.equal(scene.querySelectorAll('.aph-blink').length,1);
      assert.equal(scene.classList.contains('aph-eyes-closed'),state==='fechado');
      assert.equal(scene.querySelector('.aph-blink').getAttribute('src'),`/assets/img/plantao/aph/${character}-fechado.webp?v=20261021`);
      assert.equal(scene.style.getPropertyValue('--aph-breath-duration'),'3.3333333333333335s');
    }
  }
  image.dataset.traubeRr='0';
  await tick();
  assert.ok(scene.classList.contains('aph-no-breath'));
  image.src='/assets/img/plantao/patient-frontal-girl-awake.webp';
  await tick();
  assert.equal(scene.querySelectorAll('.aph-thorax,.aph-blink').length,0);
  assert.ok(!scene.classList.contains('aph-active'));
  window.close();
});
