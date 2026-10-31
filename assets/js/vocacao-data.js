/* Curadoria TRAUBE de programas de residência médica de especialidades convencionais.
   Lista editorial deliberadamente mais restrita que as especialidades reconhecidas pelo CFM.
   Programas ofertados e regras de acesso devem ser confirmados na CNRM e nos editais.
   As tags são hipóteses editoriais sobre rotinas, NÃO critérios validados. */
(function (root, factory) {
  "use strict";
  const data = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  if (root) root.TraubeVocacaoData = data;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const specRows = [
    ["Alergia e Imunologia",2,"Clínica Médica","clinical,diagnosis,followup,people"],
    ["Anestesiologia",3,"Acesso direto","hands,acute,technology,precision,highstakes,team"],
    ["Cardiologia",2,"Clínica Médica","clinical,diagnosis,technology,acute,followup"],
    ["Cirurgia Cardiovascular",5,"Acesso direto","surgery,hands,precision,highstakes,technology,team"],
    ["Cirurgia da Mão",2,"Ortopedia e Traumatologia ou Cirurgia Plástica","surgery,hands,precision,function,followup"],
    ["Cirurgia de Cabeça e Pescoço",2,"Cirurgia Geral ou Otorrinolaringologia","surgery,hands,precision,followup,people"],
    ["Cirurgia do Aparelho Digestivo",2,"Cirurgia Geral","surgery,hands,clinical,followup,precision"],
    ["Cirurgia Geral",3,"Acesso direto","surgery,hands,acute,team,highstakes"],
    ["Cirurgia Oncológica",3,"Cirurgia Geral","surgery,hands,people,followup,highstakes"],
    ["Cirurgia Pediátrica",3,"Cirurgia Geral","surgery,hands,kids,precision,highstakes"],
    ["Cirurgia Plástica",3,"Cirurgia Geral","surgery,hands,precision,function,people"],
    ["Cirurgia Torácica",2,"Cirurgia Geral","surgery,hands,precision,highstakes,team"],
    ["Cirurgia Vascular",2,"Cirurgia Geral","surgery,hands,technology,acute,followup"],
    ["Clínica Médica",2,"Acesso direto","clinical,diagnosis,people,followup,complex"],
    ["Coloproctologia",2,"Cirurgia Geral","surgery,hands,clinical,followup,people"],
    ["Dermatologia",3,"Acesso direto","diagnosis,precision,visual,hands,predictable,followup"],
    ["Endocrinologia e Metabologia",2,"Clínica Médica","clinical,diagnosis,followup,people,predictable"],
    ["Gastroenterologia",2,"Clínica Médica","clinical,diagnosis,followup,hands"],
    ["Genética Médica",3,"Acesso direto","diagnosis,complex,people,followup,research"],
    ["Geriatria",2,"Clínica Médica","elderly,people,followup,clinical,complex"],
    ["Ginecologia e Obstetrícia",3,"Acesso direto","women,people,hands,acute,followup,surgery"],
    ["Hematologia e Hemoterapia",2,"Clínica Médica","clinical,diagnosis,complex,technology,followup"],
    ["Infectologia",3,"Acesso direto","diagnosis,complex,clinical,systems,followup"],
    ["Mastologia",2,"Ginecologia e Obstetrícia ou Cirurgia Geral","women,surgery,hands,followup,people"],
    ["Medicina de Emergência",3,"Acesso direto","acute,highstakes,team,hands,clinical"],
    ["Medicina de Família e Comunidade",2,"Acesso direto","people,followup,community,clinical,prevention"],
    ["Medicina do Trabalho",2,"Acesso direto","prevention,systems,predictable,people,community"],
    ["Medicina Física e Reabilitação",3,"Acesso direto","function,followup,people,team,clinical"],
    ["Medicina Intensiva",3,"Acesso direto","highstakes,acute,technology,team,complex,clinical"],
    ["Medicina Nuclear",3,"Acesso direto","technology,precision,diagnosis,visual"],
    ["Nefrologia",2,"Clínica Médica","clinical,complex,followup,diagnosis,technology"],
    ["Neurocirurgia",5,"Acesso direto","surgery,hands,precision,technology,highstakes"],
    ["Neurologia",3,"Acesso direto","diagnosis,complex,clinical,followup,people"],
    ["Oftalmologia",3,"Acesso direto","visual,technology,hands,precision,surgery,predictable"],
    ["Oncologia Clínica",3,"Clínica Médica","clinical,complex,people,followup,research"],
    ["Ortopedia e Traumatologia",3,"Acesso direto","surgery,hands,function,acute,precision"],
    ["Otorrinolaringologia",3,"Acesso direto","hands,visual,technology,precision,surgery,clinical"],
    ["Patologia",3,"Acesso direto","visual,diagnosis,precision,technology,research"],
    ["Patologia Clínica/Medicina Laboratorial",3,"Acesso direto","diagnosis,technology,precision,systems,research"],
    ["Pediatria",3,"Acesso direto","kids,people,followup,clinical,prevention"],
    ["Pneumologia",2,"Clínica Médica","clinical,diagnosis,followup,technology,hands"],
    ["Psiquiatria",3,"Acesso direto","mental,people,followup,clinical,complex"],
    ["Radiologia e Diagnóstico por Imagem",3,"Acesso direto","visual,technology,diagnosis,precision,predictable"],
    ["Radioterapia",4,"Acesso direto","technology,precision,people,complex,followup"],
    ["Reumatologia",2,"Clínica Médica","clinical,diagnosis,followup,complex,people"],
    ["Urologia",3,"Cirurgia Geral","surgery,hands,technology,precision,followup"]
  ];
  // Curadoria exclusiva de residências convencionais. Não misturar áreas de atuação.
  const clean = (n) => n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const residencies = specRows.map(([name, years, prerequisite, tags]) => ({
    id: clean(name), name, years, prerequisite,
    entry: prerequisite === "Acesso direto" ? "Acesso direto" : "Com pré-requisito",
    tags: tags.split(","), type: "residency"
  }));
  return Object.freeze({
    residencies,
    // Alias interno para preservar a interface do motor de afinidade.
    specialties: residencies,
    areas: [],
    scope: "Residências médicas convencionais selecionadas pela TRAUBE",
    source: "CNRM/MEC — confirmar programa, acesso e duração no edital vigente",
    updated: "2026-10-29"
  });
});
