const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const postcss=require('postcss');
const {checkCss,stylesForPage}=require('../scripts/check-css.cjs');

test('all application pages share a valid CSS entrypoint and imports resolve',()=>{
  const result=checkCss();
  assert(result.pages>=88);
  assert.deepEqual(result.errors,[]);
});

test('common foundation loads once and work/PCR priorities are explicit',()=>{
  for(const page of ['dashboard/index.html','flashcards/index.html','mini-osce/index.html','admin.html','trabalho/pcr/index.html']){
    const styles=stylesForPage(page);
    assert.equal(styles.filter(p=>p.includes('/ui-v2-foundations.css?')).length,1,page);
    assert.equal(styles.filter(p=>p.includes('/ui-navigation-v2.css?')).length,1,page);
  }
  const entry=postcss.parse(fs.readFileSync('assets/css/ui-app.css','utf8'));
  const layers=entry.nodes.find(n=>n.type==='atrule'&&n.name==='layer'&&!n.nodes).params.split(',').map(x=>x.trim());
  assert(layers.indexOf('luria-work-navigation')<layers.indexOf('luria-ui-navigation'));
  assert(layers.indexOf('luria-pcr-ui')<layers.indexOf('luria-work-resets'));
});

test('page UI styles do not own generic application shell geometry',()=>{
  for(const file of ['dashboard-ui-v2.css','work-ui-v2.css','admin-ui-v2.css','luriazap-ui-v2.css','education-ui-v2.css']){
    postcss.parse(fs.readFileSync('assets/css/'+file,'utf8')).walkRules(rule=>{
      if(/(?:\.app-shell|\.main|\.topbar|#sidebar(?:\.sidebar)?)$/.test(rule.selector)){
        for(const d of rule.nodes.filter(n=>n.type==='decl'))assert(!/^(?:position|inset|height|width|margin|padding|overflow|border-radius)$/.test(d.prop),file+': '+rule.selector+' '+d.prop);
      }
    });
  }
});

test('installed safe-area styles are static, detection keeps JS free of layout CSS',()=>{
  const pwa=fs.readFileSync('assets/js/pwa.js','utf8');
  assert.doesNotMatch(pwa,/createElement\(["']style["']\)/);
  assert.match(fs.readFileSync('assets/css/ui-v2-foundations.css','utf8'),/safe-area-inset-top/);
});
