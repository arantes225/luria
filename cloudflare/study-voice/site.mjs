/* The staging site forwards voice signaling through a private service binding. */
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname.startsWith('/api/study-voice/')){
   // Preserve Origin, Authorization and body: the voice service still validates each call.
   if(!env.STUDY_VOICE)return Response.json({error:'Voz ainda não configurada'},{status:503,headers:{'Cache-Control':'no-store'}});
   return env.STUDY_VOICE.fetch(request);
  }
  return env.ASSETS.fetch(request);
 }
};
