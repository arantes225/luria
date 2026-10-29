
"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {JSDOM}=require("jsdom");
const read=path=>fs.readFileSync(path,"utf8");
const files={
  scale:"trabalho/plantoes/index.html",finance:"trabalho/financeiro/index.html",divisor:"trabalho/divisor-plantao/index.html",
  core:"assets/js/shift-manager-core.js",scaleJS:"assets/js/plantoes-escala-v2.js",
  financeJS:"assets/js/plantoes-financeiro-v2.js",divisorJS:"assets/js/divisor-plantao-v2.js"
};
function mount(path,scripts){
  const dom=new JSDOM(read(path),{url:"https://luria.example/trabalho/",runScripts:"outside-only",pretendToBeVisual:true});
  const {window}=dom;
  window.alert=()=>{};
  window.confirm=()=>true;
  window.prompt=()=>{};
  window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  window.HTMLDialogElement.prototype.close=function(){this.open=false;};
  scripts.forEach(x=>window.eval(read(x)));
  window.document.dispatchEvent(new window.Event("DOMContentLoaded",{bubbles:true}));
  return dom;
}
function set(w,id,value,kind="change"){
  const el=w.document.getElementById(id);
  assert.ok(el,"missing "+id);el.value=value;el.dispatchEvent(new w.Event(kind,{bubbles:true}));
}
test("core: records legacy payments, midnight crossing, payer calendar and no double retention",t=>{
  const dom=mount(files.scale,[files.core]);t.after(()=>dom.window.close());
  const w=dom.window,c=w.LuriaShiftCore;
  w.localStorage.setItem(c.SHIFT_KEY,JSON.stringify([{id:"old",date:"2026-10-10",place:"Hosp A",value:1500,duration:12,status:"pago"}]));
  assert.equal(c.getShifts()[0].receivedAmount,1500);
  assert.equal(c.outstanding(c.getShifts()[0]),0);
  assert.equal(c.durationMinutes("2026-10-29","19:00","","07:00"),720);
  assert.equal(c.durationMinutes("2026-10-29","07:10","","19:15"),725);
  assert.ok(c.durationMinutes("2026-10-29","19:00","2026-10-29","07:00")<0);
  assert.equal(c.expectedDate("2026-10-29",{paymentRule:"next-month",paymentDay:31}),"2026-11-30");
  assert.equal(c.expectedDate("2026-10-29",{paymentRule:"days",paymentDays:30}),"2026-11-28");
  assert.equal(c.outstanding({value:1500,withheldTax:100,payerFee:20,receivedAmount:500}),880);
  assert.equal(c.paymentState({date:"2026-10-10",value:1500,withheldTax:100,payerFee:20,receivedAmount:500,expectedDate:"2026-10-10"},"2026-10-29"),"atrasado");
});
test("scale: opens modal, saves flexible time/value, renders monthly and weekly, edits record",t=>{
  const dom=mount(files.scale,[files.core,files.scaleJS]);t.after(()=>dom.window.close());
  const w=dom.window,c=w.LuriaShiftCore,d=w.document;
  d.getElementById("shift-add").click();assert.equal(d.getElementById("shift-modal").open,true);
  set(w,"shift-date","2026-10-29");
  set(w,"shift-place","Hosp A");
  set(w,"shift-payer","Pagadora B");
  set(w,"shift-start-time","19:20","input");
  set(w,"shift-end-time","08:10","input");
  set(w,"shift-val","1437.60","input");
  set(w,"shift-expected-date","2026-11-15","input");
  d.getElementById("add-shift-form").dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
  const s=c.getShifts()[0];
  assert.ok(s);assert.equal(s.value,1437.6);assert.equal(s.payer,"Pagadora B");
  assert.ok(Math.abs(s.duration-770/60)<1e-9);assert.equal(s.expectedDate,"2026-11-15");
  assert.match(d.getElementById("shifts-list-container").textContent,/Pagadora B/);
  d.getElementById("shift-view-week").click();assert.equal(d.getElementById("shift-view-week").getAttribute("aria-pressed"),"true");
  d.querySelector("[data-edit]").click();assert.equal(d.getElementById("shift-val").value,"1437.60");
});
test("finance: grouped payers, tax estimates, partial payment and remaining balance",t=>{
  const dom=mount(files.finance,[files.core,files.financeJS]);t.after(()=>dom.window.close());
  const w=dom.window,c=w.LuriaShiftCore,d=w.document;
  c.saveShifts([{id:"t1",date:"2026-10-03",place:"Hosp A",payer:"Grupo X",value:1500,withheldTax:100,payerFee:20,receivedAmount:500,expectedDate:"2026-10-15",duration:12,status:"pendente"},{id:"t2",date:"2026-10-04",place:"Hosp B",payer:"Grupo Y",value:1000,withheldTax:0,payerFee:0,receivedAmount:0,expectedDate:"2026-11-15",duration:8,status:"pendente"}]);
  set(w,"fin-month-select","2026-10");
  assert.match(d.getElementById("fin-hospital-breakdown").textContent,/Grupo X/);
  assert.match(d.getElementById("fin-hospital-breakdown").textContent,/Grupo Y/);
  set(w,"fin-tax-rate","12");
  set(w,"fin-tax-cost","100");
  d.getElementById("fin-tax-form").dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
  assert.equal(d.getElementById("fin-tax-withheld").textContent,c.formatMoney(100));
  assert.equal(d.getElementById("fin-tax-reserve").textContent,c.formatMoney(200));
  assert.equal(d.getElementById("fin-tax-net").textContent,c.formatMoney(2080));
  d.querySelector("[data-pay='t1']").click();
  set(w,"fin-pay-amount","300");d.getElementById("fin-payment-form").dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
  assert.equal(c.outstanding(c.getShifts().find(s=>s.id==="t1")),580);
});
test("divisor: arbitrary total and per-person minute allocations must sum exactly",t=>{
  const dom=mount(files.divisor,[files.divisorJS]);t.after(()=>dom.window.close());
  const w=dom.window,d=w.document;
  set(w,"div-hours","7.5");
  set(w,"div-docs","3");
  set(w,"div-mode","personalizado");
  const rows=d.querySelectorAll(".div-custom-row");assert.equal(rows.length,3);
  const parts=[[2,10],[3,5],[2,15]];
  rows.forEach((row,i)=>{row.querySelector(".div-hours").value=parts[i][0];row.querySelector(".div-minutes").value=parts[i][1];});
  d.getElementById("div-calc-btn").click();
  assert.match(d.getElementById("div-output").textContent,/7h30min/);
  assert.equal(d.getElementById("div-feedback").textContent,"");
  rows[0].querySelector(".div-minutes").value=11;
  d.getElementById("div-calc-btn").click();
  assert.match(d.getElementById("div-feedback").textContent,/somem exatamente/);
});
