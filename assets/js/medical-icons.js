/* LURIA Medical Icons — biblioteca SVG global e autoral */
window.LuriaMedicalIcons=(()=>{
  const b='viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const p={
    clinic:'<path d="M6 3v5a6 6 0 0 0 12 0V3"/><path d="M8 3v4a4 4 0 0 0 8 0V3"/><path d="M12 13v3a4 4 0 0 0 8 0v-2"/><circle cx="20" cy="12" r="2"/>',
    pediatrics:'<circle cx="12" cy="9" r="4"/><path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6"/><path d="M9 8h.01M15 8h.01"/><path d="M10 11c1 .8 3 .8 4 0"/>',
    gynecology:'<circle cx="12" cy="8" r="4"/><path d="M12 12v9M8.5 17h7"/>',
    surgery:'<path d="m5 19 11-11 3 3L8 22H5v-3Z"/><path d="m14 10 3 3"/>',
    preventive:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    family:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    heart:'<path d="M4 13h4l2-5 3 10 2-5h5"/><path d="M12 21C6 17 3 13.5 3 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 2.5c0 4-3 7.5-9 11.5Z"/>',
    lungs:'<path d="M11 4v8M13 4v8"/><path d="M10 9c-3-1-6 1-7 5-1 4 1 7 5 6 2-.5 3-2 3-5V9ZM14 9c3-1 6 1 7 5 1 4-1 7-5 6-2-.5-3-2-3-5V9Z"/>',
    brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 5 2V6a3 3 0 0 0-3-2ZM15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-5 2V6a3 3 0 0 1 3-2Z"/>',
    abdomen:'<path d="M8 3c-2 3-3 6-3 10 0 5 3 8 7 8s7-3 7-8c0-4-1-7-3-10"/><path d="M8 9h8M12 7v8"/><circle cx="14.5" cy="14.5" r="1.5"/>',
    bowel:'<path d="M7 4c-3 0-3 5 0 5h3c3 0 3 5 0 5H7c-3 0-3 6 0 6h7c3 0 3-5 0-5h-2"/><path d="M15 5c3 0 3 5 0 5h-2"/><path d="M18 8v6M16 11h4"/>',
    burn:'<path d="M12 3c1 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 3 2 5 5 5 8a7 7 0 0 1-14 0c0-4 3-7 7-12Z"/>',
    oncology:'<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3"/>',
    vascular:'<path d="M12 3v18M12 8 7 5M12 11l5-4M12 15l-4 4M12 17l4 3"/>',
    trauma:'<path d="M5 4h14v16H5z"/><path d="M12 7v10M7 12h10"/><path d="m4 4 3 3M20 4l-3 3"/>',
    skin:'<path d="M3 7c3-2 5 2 8 0s5 2 10 0M3 11c3-2 5 2 8 0s5 2 10 0M3 15c3-2 5 2 8 0s5 2 10 0"/>',
    infection:'<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/>',
    blood:'<path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z"/>',
    bone:'<path d="M8 4a3 3 0 0 0 0 5l8 11"/><path d="M16 4a3 3 0 0 1 0 5L8 20"/>',
    emergency:'<path d="M13 2 5 13h6l-1 9 9-13h-6V2Z"/>',
    renal:'<path d="M8 4C4 4 3 8 3 12s2 7 5 7c2 0 3-2 3-4V8C11 6 10 4 8 4Z"/><path d="M16 4c4 0 5 4 5 8s-2 7-5 7c-2 0-3-2-3-4V8c0-2 1-4 3-4Z"/>',
    endocrine:'<path d="M8 6c2 0 3 2 4 4 1-2 2-4 4-4 2 0 3 2 2 4-1 2-3 3-6 3s-5-1-6-3c-1-2 0-4 2-4Z"/><path d="M12 13v7"/>',
    eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    ear:'<path d="M14 18c-1 2-4 2-4-1 0-2 3-2 3-5 0-2-1-3-3-3-3 0-4 4-2 6"/><path d="M9 5c5-3 9 0 9 5 0 3-2 5-4 6"/>',
    medicine:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>',
    shield:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/>',
    pulse:'<path d="M3 12h4l2-4 3 8 2-4h7"/>',
    person:'<circle cx="12" cy="8" r="4"/><path d="M5 21c1-4 3.5-6 7-6s6 2 7 6"/>'
  };
  const rules=[
    ['clinic',/clinica medica|medicina interna|clinica geral/],
    ['pediatrics',/pediatr|neonat/],
    ['gynecology',/gineco|obstetr|saude da mulher|(^|\s)go($|\s)/],
    ['family',/medicina de familia|familia e comunidade|(^|\s)mfc($|\s)|atencao primaria|(^|\s)aps($|\s)/],
    ['preventive',/preventiva|saude coletiva|epidemi|sus|medicina preventiva/],
    ['bowel',/oclus|obstru.*intestinal|ileo|intestin/],
    ['burn',/queim/],
    ['oncology',/oncolo|cancer|neoplas|tumor/],
    ['abdomen',/abdomen|abdominal|apendic|periton|gastro/],
    ['vascular',/vascular|trombo|aneurisma|angi/],
    ['trauma',/trauma|politrauma/],
    ['surgery',/cirurg/],
    ['heart',/cardio|coron|arrit|hipertens/],
    ['lungs',/pneumo|pulm|asma|dpoc/],
    ['brain',/neuro|avc|epilep|psiquiatr|saude mental/],
    ['skin',/dermato|pele|exantem/],
    ['infection',/infect|sepse|antibi/],
    ['blood',/hemato|anemia|coagul/],
    ['bone',/ortop|fratura|reumato|artr/],
    ['renal',/nefro|renal/],
    ['endocrine',/endocr|diabet|tireo/],
    ['eye',/oftal|olho/],
    ['ear',/otorr|ouvido|rin|garganta/],
    ['emergency',/emerg|urgencia|choque|reanima/]
  ];
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const fallbacks=['medicine','shield','pulse','person'];
  const hash=v=>{let h=0;for(const c of String(v||''))h=(h*31+c.charCodeAt(0))>>>0;return h};
  const resolve=v=>{const n=norm(v);const found=rules.find(([,rx])=>rx.test(n));return found?found[0]:fallbacks[hash(n)%fallbacks.length]};
  const svg=v=>'<svg '+b+'>'+p[resolve(v)]+'</svg>';
  const apply=(root=document)=>{
    root.querySelectorAll?.('[data-luria-medical-icon]').forEach(el=>{
      const name=el.getAttribute('data-luria-medical-icon')||el.getAttribute('data-area')||el.textContent||'';
      el.innerHTML=svg(name);
    });
  };
  return{resolve,svg,apply,paths:p,rules};
})();
document.addEventListener('DOMContentLoaded',()=>window.LuriaMedicalIcons?.apply?.());