const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),crypto=require('node:crypto');
const {JSDOM,VirtualConsole}=require('jsdom');
const {read,declaration}=require('./fixtures/frontend.cjs');
const bundle=process.env.TRAUBE_JSPDF_TEST_BUNDLE;
const options={skip:bundle?false:'Set TRAUBE_JSPDF_TEST_BUNDLE to the reviewed jsPDF 4.2.1 UMD; no network during tests'};
// Generate a valid synthetic PNG (including CRCs), not a truncated fixture.
const zlib=require('node:zlib');
function chunk(type,data){const name=Buffer.from(type),length=Buffer.alloc(4),crc=Buffer.alloc(4);length.writeUInt32BE(data.length);crc.writeUInt32BE(zlib.crc32(Buffer.concat([name,data])));return Buffer.concat([length,name,data,crc]);}
const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(1,0);ihdr.writeUInt32BE(1,4);ihdr[8]=8;ihdr[9]=2;
const png='data:image/png;base64,'+Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(Buffer.from([0,255,255,255]))),chunk('IEND',Buffer.alloc(0))]).toString('base64');
function fixture(t){
  const dom=new JSDOM('<body></body>',{runScripts:'outside-only',url:'https://fixture.invalid/',virtualConsole:new VirtualConsole()});t.after(()=>dom.window.close());
  const w=dom.window;w.eval(fs.readFileSync(bundle,'utf8'));assert.equal(w.jspdf.jsPDF.version,'4.2.1');return w;
}
test('reviewed jsPDF bytes match the loader and every direct SRI pin',options,t=>{
  const integrity='sha384-'+crypto.createHash('sha384').update(fs.readFileSync(bundle)).digest('base64');
  assert(read('assets/js/traube-lazy-vendors.js').includes(integrity));
  for(const file of ['caderno.html','caderno/index.html','caderno-erros.html','caderno-erros/index.html','trabalho/pcr/executar/index.html','trabalho/pcr/historico/index.html']) {
    const dom=new JSDOM(read(file));try{const script=dom.window.document.querySelector('script[src*="jspdf@"]');assert(script);assert.equal(script.integrity||script.getAttribute('integrity'),integrity);assert.match(script.src,/jspdf@4\.2\.1\//);assert.equal(script.crossOrigin,'anonymous');}finally{dom.window.close();}
  }
});
test('real jsPDF runs Flashcards/Errors image layout helpers and produces PDF bytes',options,t=>{
  const w=fixture(t);
  for(const [file,name] of [['assets/js/flashcards.js','flashPdfAddImage'],['assets/js/caderno-erros.js','errorPdfAddImage']]) {
    w.eval(declaration(read(file),name));const doc=new w.jspdf.jsPDF({unit:'mm',format:'a4'});const state={y:20};
    doc.text('TRAUBE — revisão',16,15);w[name](doc,{dataUrl:png,width:1,height:1},state);
    assert(state.y>20);const output=doc.output();assert.match(output,/^%PDF-/);assert.match(output,/\/Subtype \/Image/);assert(output.length>3000);
  }
});
test('real jsPDF preserves Caderno multi-page canvas slicing and PCR export API',options,t=>{
  const w=fixture(t);
  w.document.createElement=(original=>function(tag){if(tag!=='canvas')return original.call(this,tag);return {width:0,height:0,getContext:()=>({fillRect(){},drawImage(){}}),toDataURL:()=>png};})(w.document.createElement);
  w.eval(declaration(read('assets/js/caderno.js'),'addNotebookCanvasToPdf'));
  const doc=new w.jspdf.jsPDF({unit:'mm',format:'a4'});
  w.addNotebookCanvasToPdf(doc,{width:100,height:400},true);
  assert(doc.getNumberOfPages()>1);assert.match(doc.output(),/^%PDF-/);
  const saved=[];const Real=w.jspdf.jsPDF;
  w.jspdf.jsPDF=function(...args){const result=new Real(...args);result.save=name=>saved.push({name,pdf:result.output()});return result;};
  w.TraubeLocalOwnerStore={ownerId:'synthetic'};w.eval(read('assets/js/pcr-store.js'));
  w.TraubePCRStore.pdf({id:'synthetic',mode:'adult',events:[],shock_count:0,care_info:'Dados sintéticos'}, {initials:'QA'});
  assert.equal(saved[0].name,'traube-pcr-synthetic.pdf');assert.match(saved[0].pdf,/^%PDF-/);
});
