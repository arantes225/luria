const test=require('node:test'),assert=require('node:assert/strict');
const {page,read,settle}=require('./fixtures/frontend.cjs');

test('floating Alex stays above mobile navigation and recovers space when it disappears',t=>{
 const {w,d,errors}=page(t,'amigos/index.html');
 w.innerHeight=844;w.innerWidth=390;
 w.customElements.define('professor-alex-mascot',class extends w.HTMLElement {setDragMotion(){} _resize(){} _schedule(){}});
 Object.defineProperty(w.HTMLElement.prototype,'offsetHeight',{get(){return this.tagName==='TRAUBE-ALEX-COMPANION'?96:0;}});
 Object.defineProperty(w.HTMLElement.prototype,'offsetWidth',{get(){return this.tagName==='TRAUBE-ALEX-COMPANION'?96:0;}});
 const nav=d.createElement('nav');nav.id='ui-mobile-navigation';let height=76;nav.getBoundingClientRect=()=>({height});d.body.append(nav);
 const source=read('assets/js/professor-alex-companion.mjs').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'').replaceAll('import.meta.url',JSON.stringify('https://fixture.invalid/assets/js/professor-alex-companion.mjs'));
 w.eval('const bindAlex=()=>({react(){},destroy(){}});\n'+source);
 const mounted=w.mountAlexCompanion({userId:'test-position-user'});
 assert.equal(mounted.host.style.top,'648px');
 height=0;w.dispatchEvent(new w.Event('traube:mobile-navigation-change'));assert.equal(mounted.host.style.top,'724px');
 height=76;w.dispatchEvent(new w.Event('traube:mobile-navigation-change'));assert.equal(mounted.host.style.top,'648px');
 mounted.destroy();assert.deepEqual(errors,[]);
});

test('companion theme changes survive minimize and restore without a stale legacy appearance',async t=>{
 const {w,d,errors}=page(t,'amigos/index.html');
 w.customElements.define('professor-alex-mascot',class extends w.HTMLElement {setDragMotion(){} _resize(){} _schedule(){}});
 const source=read('assets/js/professor-alex-companion.mjs').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'').replaceAll('import.meta.url',JSON.stringify('https://fixture.invalid/assets/js/professor-alex-companion.mjs'));
 w.eval('const bindAlex=()=>({react(){},destroy(){}});\n'+source);
 d.documentElement.dataset.theme='dark';d.body.dataset.uiAppearance='light';d.body.dataset.uiIdentity='pink';
 const mounted=w.mountAlexCompanion({userId:'test-theme-user'}),shadow=mounted.host.shadowRoot;
 assert.equal(mounted.host.hasAttribute('data-theme'),false,'current light appearance overrides legacy dark');
 assert.equal(mounted.host.dataset.uiIdentity,'pink');
 shadow.querySelector('.minimize').click();assert.equal(shadow.querySelector('.restore').hidden,false);
 d.body.dataset.uiAppearance='dark';d.body.dataset.uiIdentity='blue';await settle();
 assert.equal(mounted.host.dataset.uiAppearance,'dark');assert.equal(mounted.host.dataset.uiIdentity,'blue');
 shadow.querySelector('.restore').click();assert.equal(shadow.querySelector('.robot').hidden,false);
 assert.equal(mounted.alex.isConnected,true);
 d.body.dataset.uiIdentity='pink';await settle();assert.equal(mounted.host.dataset.uiIdentity,'pink');
 delete d.body.dataset.uiAppearance;d.documentElement.dataset.theme='light';d.documentElement.dataset.uiAppearance='dark';await settle();
 assert.equal(mounted.host.dataset.uiAppearance,'dark','root appearance remains a legacy fallback');
 mounted.destroy();assert.equal(d.querySelector('traube-alex-companion'),null);assert.deepEqual(errors,[]);
});
