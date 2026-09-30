(() => {
const owner={id:"11111111-1111-4111-8111-111111111111",email:"fixture@example.invalid",user_metadata:{display_name:"Teste"}};
window.__fixtureOwner=owner;
if(!localStorage.getItem("luria:shift-manager:security-mode:"+owner.id))localStorage.setItem("luria:shift-manager:security-mode:"+owner.id,"none");
const today=new Date().toISOString().slice(0,10);
const cards=Array.from({length:14},(_,i)=>({id:"card-"+i,user_id:owner.id,area:"Área "+i,materia:"Deck "+i,theme:"Tema "+i,front_text:"Pergunta "+i,back_text:"Resposta "+i,due_date:today,review_count:0,active:true,created_at:new Date().toISOString(),library_scope:"personal"}));
const defaults={profiles:[{user_id:owner.id,display_name:"Teste",username:"fixture",luria_id:"TEST1234",gender:"other",specialty:"Clínica médica"}],user_settings:[{user_id:owner.id,theme:"light",onboarding_completed:true}],flashcards:cards,study_topics:[{id:"topic-1",user_id:owner.id,area:"Clínica",materia:"Cardiologia",theme:"Aula de teste",type:"lesson",status:"scheduled",completed_at:null,scheduled_date:today,original_date:today,created_at:new Date().toISOString()}],pcr_patients:[],pcr_records:[]};
const db=()=>({...defaults,...JSON.parse(localStorage.getItem("fixture-db")||"{}")});
const persist=value=>localStorage.setItem("fixture-db",JSON.stringify(value));
class Query {
constructor(table){this.table=table;this.filters=[];this.action="select";this.singleRow=false;}
select(){return this;}eq(k,v){this.filters.push(row=>row[k]===v);return this;}
neq(k,v){this.filters.push(row=>row[k]!==v);return this;}in(k,v){this.filters.push(row=>v.includes(row[k]));return this;}
lte(k,v){this.filters.push(row=>row[k]<=v);return this;}gte(){return this;}gt(){return this;}lt(){return this;}
is(){return this;}not(){return this;}or(){return this;}ilike(){return this;}order(){return this;}
limit(n){this.max=n;return this;}range(a,b){this.start=a;this.max=b-a+1;return this;}
maybeSingle(){this.singleRow=true;return this;}single(){this.singleRow=true;return this;}
insert(v){this.action="insert";this.values=v;return this;}upsert(v){this.action="insert";this.values=v;return this;}
update(v){this.action="update";this.values=v;return this;}delete(){this.action="delete";return this;}
then(resolve,reject){return Promise.resolve().then(()=>{
const database=db();let rows=database[this.table]||[];
if(this.table==="study_notes"&&["update","insert"].includes(this.action)&&localStorage.getItem("fixture-note-fail")==="1")return{data:null,error:{message:"Falha de envio simulada"}};
if(this.action==="insert"){const added=(Array.isArray(this.values)?this.values:[this.values]).map(v=>({id:crypto.randomUUID(),...v}));rows=[...rows,...added];database[this.table]=rows;persist(database);return{data:this.singleRow?added[0]:added,error:null};}
const match=row=>this.filters.every(filter=>filter(row));
if(this.action==="update"){rows=rows.map(row=>match(row)?{...row,...this.values}:row);database[this.table]=rows;persist(database);}
if(this.action==="delete"){const removed=rows.filter(match);rows=rows.filter(row=>!match(row));database[this.table]=rows;if(this.table==="pcr_patients")database.pcr_records=(database.pcr_records||[]).filter(r=>!removed.some(p=>p.id===r.patient_id));persist(database);}
const result=rows.filter(match).slice(this.start||0,this.max? (this.start||0)+this.max:undefined);
return {data:this.singleRow?(result[0]||null):result,error:null,count:result.length};
}).then(resolve,reject);}
}
window.supabaseClient={
auth:{getSession:async()=>({data:{session:localStorage.getItem("fixture-logged-out")?null:{user:owner,access_token:"fixture"}},error:null}),getUser:async()=>({data:{user:owner},error:null}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),signOut:async()=>({error:null})},
from:table=>new Query(table),
rpc:async(name,args={})=>{
if(["my_friends","my_direct_shares","my_studyrats_challenges_v3"].includes(name))return{data:[],error:null};
if(name==="is_admin")return{data:false,error:null};
if(name==="get_my_entitlements")return{data:{plan:"pro",features:Object.fromEntries(["dashboard","cronograma","caderno","flashcards","error_notebook","questions","plantao","statistics_general","images"].map(name=>[name,{enabled:true,limit:null}]))},error:null};
if(name==="beta_feedback_status")return{data:{is_beta_tester:false,needs_feedback:false},error:null};
if(name==="beta_feedback_snapshot")return{data:[{id:"feedback1",display_name:"Beta fixture",positives:"Layout claro",improvements:"Rolagem semanal",submitted_at:new Date().toISOString()}],error:null};
if(name==="start_study_session")return{data:"fixture-session",error:null};
if(name==="save_pcr_record"){
if(localStorage.getItem("fixture-save-fail")==="1")return{data:null,error:{message:"Falha de rede simulada"}};
const p=args.payload,database=db();database.pcr_patients=database.pcr_patients.filter(row=>row.id!==p.patient_id);database.pcr_patients.push({id:p.patient_id,user_id:p.user_id,initials:p.initials,birth_date:p.birth_date,created_at:new Date().toISOString()});
database.pcr_records=database.pcr_records.filter(row=>row.id!==p.id);database.pcr_records.push({...p,created_at:new Date().toISOString()});persist(database);return{data:p.id,error:null};
}
return{data:name.includes("snapshot")?[]:{},error:null};
},
storage:{from:()=>({getPublicUrl:()=>({data:{publicUrl:""}}),createSignedUrl:async()=>({data:{signedUrl:""},error:null})})},
channel:()=>({on(){return this;},subscribe(){return this;}}),removeChannel(){}
};
})();