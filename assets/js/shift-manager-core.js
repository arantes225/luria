(function shiftCoreModule() {
  "use strict";
  const SHIFT_KEY = "luria_plantoes_shifts_v1";
  const INSTITUTION_KEY = "luria_plantoes_institutions_v1";
  const TAX_KEY = "luria_plantoes_tax_settings_v1";
  const num = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
  const cents = (v) => Math.round((num(v) + Number.EPSILON) * 100) / 100;
  function read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (_) { return fallback; }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("luria:plantoes:changed"));
      return true;
    } catch (_) {
      alert("Não foi possível salvar os dados neste dispositivo. Verifique o armazenamento disponível.");
      return false;
    }
  }
  function formatMoney(value) {
    return cents(value).toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
  }
  function formatDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value||""));
    return match ? `${match[3]}/${match[2]}/${match[1]}` : "Não informada";
  }
  function isoToday() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }
  function localDate(input) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(input||""))) return null;
    const [y,m,d]=input.split("-").map(Number);
    const date = new Date(Date.UTC(y,m-1,d));
    return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d ? date : null;
  }
  function isoUTC(d) { return d.toISOString().slice(0,10); }
  function escapeHtml(v) {
    return String(v == null ? "" : v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function getShifts() {
    const a = read(SHIFT_KEY, []);
    if (!Array.isArray(a)) return [];
    return a.filter(s=>s && typeof s==="object").map(s=>{
      const value=cents(s.value);
      const oldPaid=s.status==="pago" && s.receivedAmount == null;
      return {...s, id:String(s.id || ""), place:String(s.place||""), payer:String(s.payer||s.place||""),
        value, duration:num(s.duration), withheldTax:cents(s.withheldTax), payerFee:cents(s.payerFee),
        receivedAmount:cents(oldPaid ? Math.max(0,value-cents(s.withheldTax)-cents(s.payerFee)) : s.receivedAmount),
        expectedDate: String(s.expectedDate||""), receivedDate:String(s.receivedDate||"")};
    });
  }
  function saveShifts(shifts) { return write(SHIFT_KEY, shifts); }
  function payableGross(s) { return Math.max(0,cents(s.value)-cents(s.withheldTax)-cents(s.payerFee)); }
  function outstanding(s) {
    return s.status==="trocado" ? 0 : Math.max(0,cents(payableGross(s)-cents(s.receivedAmount)));
  }
  function paymentState(s,today=isoToday()) {
    if(s.status==="trocado")return "cedido";
    if(outstanding(s)<=0.009)return "recebido";
    if(s.date && s.date<=today && s.expectedDate && localDate(s.expectedDate) && s.expectedDate<today)return "atrasado";
    if(cents(s.receivedAmount)>0)return "parcial";
    if(s.expectedDate===today)return "vence";
    return "pendente";
  }
  function getInstitutions(){
    const stored=read(INSTITUTION_KEY,[]);
    const list=Array.isArray(stored)?stored.filter(i=>i&&i.name).map(i=>({...i,name:String(i.name)})):[];
    getShifts().forEach(s=>{
      const name=(s.payer||s.place||"").trim();
      if(name && !list.some(i=>i.name.toLocaleLowerCase("pt-BR")===name.toLocaleLowerCase("pt-BR")))
        list.push({name,paymentRule:"none",paymentDay:15,paymentDays:30});
    });
    return list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  }
  function saveInstitution(value) {
    const list=getInstitutions(), name=String(value.name||"").trim();
    if(!name)return false;
    const idx=list.findIndex(i=>i.name.toLocaleLowerCase("pt-BR")===name.toLocaleLowerCase("pt-BR"));
    const next={name,paymentRule:value.paymentRule||"none",
      paymentDay:Math.min(31,Math.max(1,Math.floor(num(value.paymentDay)||15))),
      paymentDays:Math.min(365,Math.max(0,Math.floor(num(value.paymentDays)||0)))};
    if(idx<0)list.push(next);else list[idx]={...list[idx],...next};
    return write(INSTITUTION_KEY,list);
  }
  function expectedDate(date, institution){
    const d=localDate(date);
    if(!d || !institution)return "";
    if(institution.paymentRule==="days"){
      d.setUTCDate(d.getUTCDate()+Math.max(0,Number(institution.paymentDays)||0));
    } else if(institution.paymentRule==="next-month"){
      const y=d.getUTCFullYear(),m=d.getUTCMonth();
      const day=Math.min(Math.max(1,Number(institution.paymentDay)||15),new Date(Date.UTC(y,m+2,0)).getUTCDate());
      d.setUTCFullYear(y,m+1,day);
    } else return "";
    return isoUTC(d);
  }
  function durationMinutes(startDate,startTime,endDate,endTime){
    const a=localDate(startDate),b=localDate(endDate||startDate);
    if(!a||!b||!/^\d{2}:\d{2}$/.test(startTime||"")||!/^\d{2}:\d{2}$/.test(endTime||""))return NaN;
    const [sh,sm]=startTime.split(":").map(Number),[eh,em]=endTime.split(":").map(Number);
    if(sh>23||eh>23||sm>59||em>59)return NaN;
    let t=(b.getTime()+eh*36e5+em*6e4)-(a.getTime()+sh*36e5+sm*6e4);
    if(!endDate && t<=0)t+=864e5;
    return t/6e4;
  }
  function getTaxSettings(){
    const raw=read(TAX_KEY,{});
    return {regime:typeof raw.regime==="string"?raw.regime:"nao_informado",
      estimatedRate:raw.estimatedRate==null||raw.estimatedRate===""?null:Math.max(0,Math.min(100,num(raw.estimatedRate))),
      monthlyCosts:Math.max(0,cents(raw.monthlyCosts))};
  }
  function saveTaxSettings(settings){return write(TAX_KEY,settings);}
  window.TraubeShiftCore={SHIFT_KEY,getShifts,saveShifts,formatMoney,formatDate,isoToday,localDate,escapeHtml,
    cents,num,payableGross,outstanding,paymentState,getInstitutions,saveInstitution,expectedDate,
    durationMinutes,getTaxSettings,saveTaxSettings};
})();