// Manual Chromium harness: real HTML/meta/scripts, local synthetic backend only.
// Start: node tests/fixtures/csp-browser.cjs (binds loopback port 4196).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '../..');
const pages = require('../../scripts/csp-pages.cjs');
const observer = `window.__cspObserved=[];document.addEventListener('securitypolicyviolation',event=>{
  window.__cspObserved.push({directive:event.effectiveDirective,blocked:event.blockedURI});
  const output=document.getElementById('csp-violations');if(output)output.textContent=JSON.stringify(window.__cspObserved);
});
// Harness-only responses for pages that fetch directly, bypassing the SDK fixture.
// Exact endpoints prevent any synthetic credentials or review payload reaching production.
{
  const nativeFetch=window.fetch.bind(window), backend='https://sxdsfklllilhdyuamvvg.supabase.co';
  const reply=data=>Promise.resolve(new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}}));
  let note='CSP TEST — conteúdo sintético';
  window.fetch=(input,options={})=>{
    const url=typeof input==='string'?input:input.url;
    if(location.pathname.startsWith('/trabalho/prontuario/')&&url===backend+'/functions/v1/external-quick-chart'){
      const body=JSON.parse(options.body||'{}'),expires_at='2026-10-12T12:00:00Z';
      if(body.action==='load')return reply({chart:{content:{note},expires_at}});
      if(body.action==='save'){note=body.content.note;return reply({expires_at});}
      if(body.action==='clear'){note='';return reply({});}
      return Promise.reject(Error('Ação fora do fixture prontuário'));
    }
    if(location.pathname.startsWith('/qf-r8K2mV7qL4x9P1cF/')&&url===backend+'/rest/v1/rpc/qf_public_bridge_get_block')return reply({closed:false,range:{count:0},questions:[]});
    if(location.pathname.startsWith('/qf-r8K2mV7qL4x9P1cF/')&&url===backend+'/rest/v1/rpc/qf_public_bridge_submit')return reply({receipt_id:'CSP-fixture',received_reviews:0});
    return nativeFetch(input,options);
  };
}`;
function samplePdf() {
  const content = 'BT /F1 18 Tf 30 100 Td (TRAUBE CSP TEST 123) Tj ET';
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 180] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream'];
  let pdf = '%PDF-1.4\n', offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += (index + 1) + ' 0 obj\n' + object + '\nendobj\n'; });
  const xref = Buffer.byteLength(pdf);
  pdf += 'xref\n0 6\n0000000000 65535 f \n' + offsets.slice(1).map(offset => String(offset).padStart(10, '0') + ' 00000 n \n').join('');
  return pdf + 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
}
const probe = `(() => {
  const panel = document.createElement('aside');
  panel.id = 'csp-browser-proof';
  panel.style.cssText = 'position:fixed;bottom:0;left:0;z-index:999999;background:#fff;color:#111;padding:8px;border:1px solid #184888;font:12px monospace';
  panel.innerHTML = '<button type="button" id="csp-run">Testar bloqueios CSP</button> <output id="csp-status">Não executado</output><pre id="csp-violations"></pre>';
  document.body.appendChild(panel);
  const records = window.__cspObserved || [];
  document.getElementById('csp-violations').textContent = JSON.stringify(records);
  if(document.querySelector('script[src="/assets/js/apostila-image-fallback.js"]')){
    const button=document.createElement('button');button.id='csp-image-fallbacks';button.textContent='Testar fallbacks CSP';panel.appendChild(button);
    const output=document.createElement('output');output.id='csp-image-result';panel.appendChild(output);
    button.addEventListener('click',async()=>{button.disabled=true;output.textContent='Executando';const container=document.createElement('div');document.body.appendChild(container);
      try{for(const mode of ['display-sibling','hidden-sibling','ist-figure','candidate']){const figure=document.createElement('figure'),image=document.createElement('img'),text=document.createElement('p');image.dataset.apostilaImageFallback=mode;text.hidden=true;figure.append(image,text);container.appendChild(figure);await new Promise(resolve=>{image.addEventListener('error',resolve,{once:true});image.src='/__csp_missing_image.png';});if(mode==='display-sibling'&&(image.style.display!=='none'||text.hidden)||mode==='hidden-sibling'&&(!image.hidden||text.hidden)||mode==='ist-figure'&&!figure.classList.contains('ist-image-unavailable')||mode==='candidate'&&(image.style.display!=='none'||!figure.textContent.includes('Imagem indisponível')))throw Error(mode);}
        output.textContent='PASS: quatro fallbacks de imagem';
      }catch(error){output.textContent='FAIL: '+error.message;}finally{container.remove();button.disabled=false;}
    });
  }
  if(window.pdfjsLib || window.Tesseract || window.initSqlJs || window.jspdf || window.html2pdf || window.Chart){
    const button=document.createElement('button');button.textContent='Testar dependências CSP';button.id='csp-dependencies';panel.appendChild(button);
    const output=document.createElement('output');output.id='csp-dependency-result';panel.appendChild(output);
    button.addEventListener('click',async()=>{button.disabled=true;output.textContent='Executando';const passed=[];
      try {
        if(window.Chart){const canvas=document.createElement('canvas');document.body.appendChild(canvas);let chart;try{chart=new Chart(canvas,{type:'bar',data:{labels:['CSP'],datasets:[{data:[1]}]},options:{animation:false,responsive:false}});if(chart.toBase64Image().length<100)throw Error('Chart empty');passed.push('Chart.js/Canvas');}finally{chart?.destroy();canvas.remove();}}
        if(window.pdfjsLib){
          pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          const data=new Uint8Array(await (await fetch('/__csp_sample.pdf')).arrayBuffer());
          const pdf=await pdfjsLib.getDocument({data,isEvalSupported:false}).promise;
          try{const text=await (await pdf.getPage(1)).getTextContent();if(!text.items.some(item=>item.str.includes('CSP TEST')))throw Error('PDF text missing');passed.push('PDF.js/Worker');}finally{await pdf.destroy();}
        }
        if(window.Tesseract){
          const worker=await Tesseract.createWorker('eng+por',1);
          try{const canvas=document.createElement('canvas');canvas.width=800;canvas.height=150;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,800,150);ctx.fillStyle='black';ctx.font='48px sans-serif';ctx.fillText('TRAUBE CSP TEST 123',20,90);const result=await worker.recognize(canvas);if(!result.data.text.includes('CSP'))throw Error('OCR text missing');passed.push('OCR/Worker/WASM eng+por');}finally{await worker.terminate();}
        }
        if(window.initSqlJs){const SQL=await initSqlJs({locateFile:name=>'https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/'+name});const db=new SQL.Database();try{if(db.exec('SELECT 123')[0].values[0][0]!==123)throw Error('SQLite query failed');passed.push('SQLite/WASM');}finally{db.close();}}
        let renderedCanvas;
        if(window.html2canvas){const target=document.createElement('div');target.textContent='TRAUBE CSP TEST';target.style.cssText='width:300px;padding:20px;background:white;color:black';document.body.appendChild(target);try{renderedCanvas=await html2canvas(target);if(!renderedCanvas.width||!renderedCanvas.height)throw Error('Canvas empty');passed.push('html2canvas');}finally{target.remove();}}
        if(window.jspdf){const pdf=new jspdf.jsPDF();pdf.text('TRAUBE CSP TEST',10,10);if(renderedCanvas)pdf.addImage(renderedCanvas.toDataURL('image/png'),'PNG',10,20,80,20);if(pdf.output('blob').size<100)throw Error('PDF export empty');passed.push('jsPDF');}
        if(window.html2pdf){const target=document.createElement('div');target.textContent='TRAUBE CSP TEST';document.body.appendChild(target);try{const pdf=await html2pdf().from(target).toPdf().get('pdf');if(pdf.output('blob').size<100)throw Error('PDF export empty');passed.push('html2pdf');}finally{target.remove();}}
        output.textContent='PASS: '+passed.join(', ');
      }catch(error){output.textContent='FAIL: '+error.message;}finally{button.disabled=false;}
    });
  }
  document.getElementById('csp-run').addEventListener('click', () => {
    const code = "document.body.dataset.cspInjected='executed';";
    const script = document.createElement('script'); script.textContent = code; document.body.appendChild(script);
    const button = document.createElement('button'); button.setAttribute('onclick', code); document.body.appendChild(button); button.click(); button.remove();
    const link = document.createElement('a'); link.href = 'javascript:' + code; document.body.appendChild(link); link.click(); link.remove();
    const dataScript = document.createElement('script'); dataScript.src = 'data:text/javascript,' + encodeURIComponent(code); document.body.appendChild(dataScript);
    const foreign = document.createElement('script'); foreign.src = 'https://csp-blocked.invalid/payload.js'; document.body.appendChild(foreign);
    let evalBlocked = false; try { (0,eval)(code); } catch (_) { evalBlocked = true; }
    setTimeout(() => {
      const kinds = new Set(records.map(record => record.directive));
      const ok = !document.body.dataset.cspInjected && evalBlocked && kinds.has('script-src-elem') && kinds.has('script-src-attr') && kinds.has('script-src');
      document.getElementById('csp-status').textContent = ok ? 'PASS: inline, handler, javascript:, data:, origem externa e eval bloqueados' : 'FAIL: execução inesperada ou bloqueio não observado';
    }, 250);
  });
})();`;

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:4196');
  const send = (type, body) => { res.setHeader('Content-Type', type); res.setHeader('Cache-Control', 'no-store'); res.end(body); };
  if (url.pathname === '/__csp_probe.js') return send('text/javascript', probe);
  if (url.pathname === '/__csp_observe.js') return send('text/javascript', observer);
  if (url.pathname === '/__csp_sample.pdf') return send('application/pdf', samplePdf());
  if (url.pathname === '/assets/vendor/supabase-2.110.6.js') {
    let fixture = fs.readFileSync(path.join(__dirname, 'supabase-browser.js'), 'utf8');
    // Synthetic catalog entries exercise dynamic list/detail handlers without medical data.
    const catalogs = {
      bulario_catalog: [1, 2].map(id => ({id, name: 'Ficha CSP ' + id, active_ingredient: 'Item sintético ' + id, data: {status: 'verified'}})),
      recipe_bank: [1, 2].map(id => ({id, slug: 'csp-' + id, title: 'Ficha CSP ' + id, category: 'Teste CSP', status: 'review_needed', data: {}}))
    };
    fixture = fixture.replace('const defaults={', 'const defaults={' + JSON.stringify(catalogs).slice(1, -1) + ',');
    fixture = fixture.replace('if(name==="is_admin")return{data:false', 'if(name==="is_admin")return{data:true');
    fixture = fixture.replace('if(name==="start_study_session")', 'if(name==="bulk_create_flashcards"){const database=db();database.flashcards=[...database.flashcards,...args.p_cards.map(card=>({id:crypto.randomUUID(),user_id:owner.id,...card,active:true,due_date:today,review_count:0,created_at:new Date().toISOString(),library_scope:"personal"}))];persist(database);return{data:args.p_cards.length,error:null};}\nif(name==="start_study_session")');
    fixture = fixture.replace('if(["my_friends"', 'if(name==="luria_bootstrap")return{data:{is_admin:true,profile:db().profiles[0],theme:db().user_settings.at(-1).theme,entitlements:{plan:"pro",features:{}}},error:null};\nif(["my_friends"');
    fixture += `\nwindow.supabaseClient.auth.signInWithPassword=async()=>({data:null,error:{message:'Login simulado: controle executado'}});\nwindow.supabaseClient.auth.signUp=async()=>({data:null,error:{message:'Cadastro simulado: controle executado'}});\nif(location.pathname==='/'||location.pathname.startsWith('/login'))window.supabaseClient.auth.getSession=async()=>({data:{session:null},error:null});\nwindow.supabase={createClient:()=>window.supabaseClient};`;
    fixture += `\nif(new URLSearchParams(location.search).has('loginSuccess'))window.supabaseClient.auth.signInWithPassword=async()=>({data:{session:{user:window.__fixtureOwner}},error:null});`;
    fixture += `\nwindow.supabaseClient.functions={invoke:async()=>({data:{configured:false,connected:false},error:null})};`;
    // Only synthetic export checks opt in: avoid native confirmation/share UI in IAB.
    fixture += `\nif(new URLSearchParams(location.search).has('fixtureExport')){window.confirm=()=>true;Object.defineProperty(navigator,'canShare',{value:()=>false,configurable:true});}`;
    // Approved image/lightbox and failed candidate use local synthetic resources only.
    fixture += `\nif(new URLSearchParams(location.search).has('fixtureImages')){const baseRpc=window.supabaseClient.rpc;window.supabaseClient.rpc=async(name,args)=>{
      if(name==='admin_list_apostila_images'||name==='list_approved_apostila_images')return{data:[
        {id:101,review_status:'approved',target_section:document.querySelector('.book-section')?.id,proposed_asset:{src:'/assets/img/logos/logo-icone-original.png',caption:'Imagem CSP sintética'}},
        {id:102,review_status:'pending',source_name:'Fixture CSP',proposed_asset:{src:'/__csp_missing_image.png',caption:'Candidata CSP sintética'}}],error:null};
      return baseRpc(name,args);
    };}`;
    // Opt-in synthetic Notion responses: no OAuth, network call or production data.
    fixture += `\nif(new URLSearchParams(location.search).has('fixtureNotion')){
      const page={id:'11111111-1111-4111-8111-111111111111',title:'Notion CSP sintético',url:'https://www.notion.so/11111111111141118111111111111111',path:'Fixture CSP',last_edited_time:'2026-10-11T12:00:00Z'};
      let html='<p data-notion-block-id="22222222-2222-4222-8222-222222222222" data-notion-block-type="paragraph" data-notion-editable="1">Notion CSP TEST <b>formatado</b></p>';
      window.supabaseClient.functions.invoke=async(name,{body}={})=>{
        if(name!=='notion-api')return{data:{configured:false,connected:false},error:null};
        if(body?.action==='status')return{data:{configured:true,connected:true,workspace_name:'Fixture CSP'},error:null};
        if(body?.action==='list')return{data:{pages:[page]},error:null};
        if(body?.action==='page')return{data:{page:{...page,html}},error:null};
        if(body?.action==='update_block'){const el=document.createElement('p');el.dataset.notionBlockId='22222222-2222-4222-8222-222222222222';el.dataset.notionBlockType='paragraph';el.dataset.notionEditable='1';el.textContent=body.text;html=el.outerHTML;return{data:{ok:true},error:null};}
        return{data:null,error:{message:'Ação fora do fixture Notion: '+body?.action}};
      };
    }`;
    return send('text/javascript', fixture);
  }
  // Do not register a persistent worker in the disposable fixture origin.
  if (url.pathname === '/assets/js/pwa.js') return send('text/javascript', '/* PWA registration excluded from fixture; production file unchanged. */');
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  const apostilaContent = /^apostilas\/[^/]+\/content\.json$/.test(relative)
    && pages.includes(relative.replace(/content\.json$/, 'index.html'));
  if (!pages.includes(relative) && !apostilaContent && !relative.startsWith('assets/') && relative !== 'manifest.webmanifest') {
    res.statusCode = 404; return res.end('Not found');
  }
  const full = path.resolve(root, relative);
  if (!full.startsWith(root + path.sep) || !fs.existsSync(full) || !fs.statSync(full).isFile()) { res.statusCode = 404; return res.end('Not found'); }
  const extension = path.extname(full);
  const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.webp':'image/webp'};
  let body = fs.readFileSync(full);
  if (extension === '.html') body = body.toString()
    .replace(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/i, tag => tag + '<script src="/__csp_observe.js"></script>')
    .replace('</body>', '<script src="/__csp_probe.js"></script></body>');
  send(types[extension] || 'application/octet-stream', body);
}).listen(4196, '127.0.0.1', () => console.log('CSP fixture http://127.0.0.1:4196/'));
