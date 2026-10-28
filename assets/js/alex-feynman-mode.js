// A experiência Feynman compartilha a página, a autenticação e o Alex.
(() => {
 "use strict";
 if (document.body?.dataset.page !== "professor_alex") return;
 const chat = document.querySelector(".alex-chat-container");
 const panel = document.getElementById("alex-feynman-panel");
 const normalButton = document.getElementById("alex-study-mode-standard");
 const feynmanButton = document.getElementById("alex-study-mode-feynman");
 const topicInput = document.getElementById("feynman-topic");
 if (!chat || !panel || !normalButton || !feynmanButton || !topicInput) return;
 const params = new URLSearchParams(location.search);
 const requestedTopic = params.get("topic")?.trim() || "";
 if (requestedTopic) topicInput.value = requestedTopic.slice(0,180);
 const selectMode = (mode, options={}) => {
   const selected = mode === "feynman";
   if (selected) {
     // Não deixar duas capturas de voz simultâneas.
     const liveButton = document.getElementById("alex-live-call-btn");
     if (liveButton?.classList.contains("is-active")) liveButton.click();
   }
   panel.hidden = !selected;
   chat.hidden = selected;
   document.body.classList.toggle("alex-feynman-active", selected);
   feynmanButton.setAttribute("aria-pressed",String(selected));
   normalButton.setAttribute("aria-pressed",String(!selected));
   document.dispatchEvent(new CustomEvent("alex:feynman-visibility",{detail:{visible:selected}}));
   if (!options.silent) {
     const url = new URL(location.href);
     if (selected) url.searchParams.set("mode","feynman");
     else {url.searchParams.delete("mode");url.searchParams.delete("topic");}
     history.replaceState(history.state,"",url.pathname+url.search+url.hash);
   }
   if (options.focus) {
     const target=selected ? (topicInput.closest("#feynman-setup")?.hidden ? document.getElementById("feynman-explanation") : topicInput) : document.getElementById("alex-prompt");
     target?.focus();
   }
 };
 normalButton.addEventListener("click",()=>selectMode("chat",{focus:true}));
 feynmanButton.addEventListener("click",()=>selectMode("feynman",{focus:true}));
 document.getElementById("alex-feynman-return-chat")?.addEventListener("click",()=>selectMode("chat",{focus:true}));
 window.addEventListener("pageshow",()=> {
   const state = new URLSearchParams(location.search).get("mode") === "feynman" ? "feynman" : "chat";
   selectMode(state,{silent:true});
 });
 // Compartilha o mesmo endereço do Alex, inclusive quando vem de uma missão.
 selectMode(params.get("mode")==="feynman"?"feynman":"chat",{silent:true});
 window.LuriaAlexFeynman={open:(topic="")=>{
   if(typeof topic==="string"&&topic.trim())topicInput.value=topic.trim().slice(0,180);
   selectMode("feynman",{focus:true});
 },close:()=>selectMode("chat",{focus:true})};
})();
