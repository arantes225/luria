const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/js/ui-routes.js','utf8');
function route(pathname){const redirects=[];vm.runInNewContext(source,{window:{location:{pathname,search:'?tab=review&deck=123',hash:'#card',replace:url=>redirects.push(url)}}});return redirects;}
test('legacy application URLs use the canonical page without losing query/hash',()=>{
  for(const name of ['admin','amigos','caderno','caderno-erros','configuracoes','cronograma','dashboard','desafio-diario','editais','estatisticas','flashcards','questoes-simulados','registrar-questoes']){
    assert(fs.existsSync(name+'/index.html'));
    assert.deepEqual(route('/'+name+'.html'),['/'+name+'/?tab=review&deck=123#card']);
  }
  assert.deepEqual(route('/plantao.html'),['/plantao/sala-emergencia/?tab=review&deck=123#card']);
});
test('canonical and standalone/public URLs do not redirect or loop',()=>{
  for(const url of ['/dashboard/','/login.html','/ambientacao.html','/index.html','/trabalho/prontuario/','/not-a-route.html'])assert.deepEqual(route(url),[]);
});
