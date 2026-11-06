"use strict";
const fs = require("node:fs");
const path = require("node:path");

module.exports = function localizeHumanAtlas(source, lexiconPath) {
  const pagePath = path.join(source, "app/page.tsx");
  let page = fs.readFileSync(pagePath, "utf8");
  const labels = [
    ["Human Atlas", "Atlas Humano"], ["INTERACTIVE ANATOMY", "ANATOMIA INTERATIVA"],
    ["modeled pieces", "estruturas em 3D"], ["Find a structure", "Buscar estrutura"],
    ["Search anatomy", "Buscar anatomia"], ["About this atlas", "Sobre o atlas"],
    ["Explorer panels", "Painéis do atlas"], ["Anatomical layers", "Camadas anatômicas"],
    ["Systems", "Sistemas"], [">All<", ">Todos<"], [">Skeleton<", ">Esqueleto<"], [">Organs<", ">Órgãos<"],
    ["Close systems", "Fechar sistemas"], ["Show only ", "Mostrar apenas "], ["Show ", "Mostrar "],
    ["pieces visible", "estruturas visíveis"], ["Hide all", "Ocultar tudo"],
    ["Close search", "Fechar busca"], ["Heart, femur, cranial nerve…", "Coração, fêmur, nervo craniano…"],
    ["Search named anatomical structures", "Buscar estruturas anatômicas"],
    ["No structures match your search.", "Nenhuma estrutura corresponde à busca."],
    ["Showing up to 80 matches. Refine your search to find smaller structures.", "Mostrando até 80 resultados. Refine a busca para encontrar estruturas menores."],
    ["Start with a major organ, or search every named structure.", "Comece por um órgão ou busque pelo nome de uma estrutura."],
    ["piece'", "estrutura'"], ["pieces'", "estruturas'"],
    ["Camera controls", "Controles da câmera"], ["Pause rotation", "Pausar rotação"], ["Rotate body", "Girar corpo"],
    ["Open system layers", "Abrir camadas de sistemas"],
    ["Reset view and layers", "Restaurar vista e camadas"], ["Auto rotate", "Giro automático"], ["Reset", "Restaurar"],
    ["SELECTED STRUCTURE", "ESTRUTURA SELECIONADA"], ["ANATOMICAL INVENTORY", "PEÇAS ANATÔMICAS"],
    ["SEPARATED STRUCTURES", "ESTRUTURAS SEPARADAS"], ["ADULT HUMAN · MALE", "CORPO ADULTO · MASCULINO"],
    ["Explode anatomy", "Separar estruturas"], ["Assembled", "Montado"], ["Every piece", "Cada estrutura"],
    ["Assemble and reset", "Montar e restaurar"], ["Drag to pan", "Arraste para deslocar"],
    ["Drag to orbit", "Arraste para girar"], ["Pinch to zoom", "Aproxime com dois dedos"],
    ["Tap to inspect", "Toque para identificar"], ["Source & credits", "Fontes e créditos"],
    ["Preparing the anatomy", "Preparando a anatomia"], ["Loading ", "Carregando "],
    ["Reload viewer", "Recarregar atlas"], ["ANATOMY", "ANATOMIA"],
    ["System overview · structure identified from source anatomy", "Visão geral do sistema · estrutura identificada no atlas de origem"],
    ["Atlas reference", "Referência do atlas"], ["Selected pieces", "Estruturas selecionadas"],
    ["Included structures", "Estruturas incluídas"], ["And ", "E mais "],
    [" more modeled pieces.", " estruturas em 3D."], ["View anatomical source", "Ver fonte anatômica"],
    ["Show surrounding anatomy", "Mostrar estruturas ao redor"], ["Isolate structure", "Isolar estrutura"],
    ["Clear selection", "Limpar seleção"], ["SOURCE & SCOPE", "FONTES E ESCOPO"],
    ["A body, revealed.", "O corpo humano em camadas"],
    ["Explore the adult male reference anatomy from BodyParts3D.", "Explore a anatomia de referência masculina adulta do BodyParts3D."],
    ["Male · BodyParts3D", "Masculino · BodyParts3D"],
    ["2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.", "2.234 malhas individuais e 3.432 conceitos nomeados de uma referência anatômica masculina adulta."],
    ["This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.", "Esta referência não inclui todas as estruturas ou variações humanas. Um conceito pode reunir várias malhas; cada malha de origem aparece uma vez."],
    ["Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.", "Cores e grupos facilitam a exploração. A geometria foi simplificada para a web, e as explicações oferecem contexto educacional geral. Esta referência não é uma ferramenta de diagnóstico ou cirurgia."],
    [">Source<", ">Fonte<"], ["Dataset license", "Licença dos dados"],
    ["Original geometry & metadata", "Geometria e metadados originais"], ["Read the source publication", "Ler publicação original"],
  ];
  for (const [from, to] of labels.sort((a, b) => b[0].length - a[0].length)) page = page.replaceAll(from, to);
  page = page.replaceAll(".toLocaleString()", ".toLocaleString('pt-BR')");
  page = page.replace("c.name.toLowerCase()===name", "(c.originalName??c.name).toLowerCase()===name||c.name.toLowerCase()===name");
  page = page.replace("c.name.toLowerCase().includes(term)||c.id.toLowerCase().includes(term)", "c.name.toLowerCase().includes(term)||c.originalName?.toLowerCase().includes(term)||c.id.toLowerCase().includes(term)");
  page = page.replace("name:p.name,elements:[id]", "name:p.name,originalName:p.originalName,elements:[id]");
  page = page.replace("explanation(chosen.name,selected.system)", "explanation(chosen.originalName??chosen.name,selected.system)");
  page = page.replace("EXPLANATIONS[chosen.name.toLowerCase()]", "EXPLANATIONS[(chosen.originalName??chosen.name).toLowerCase()]");
  page = page.replace("[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null);", "[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null),[sex,setSex]=useState<'masculino'|'feminino'>(()=>new URLSearchParams(location.search).get('sexo')==='feminino'?'feminino':'masculino');");
  page = page.replace("fetch(new URL('models/atlas.json',document.baseURI)", "fetch(new URL((sex==='feminino'?'models/atlas-female.json':'models/atlas.json'),document.baseURI)");
  page = page.replace("return()=>abort.abort();},[]);", "return()=>abort.abort();},[sex]);");
  page = page.replace("<div className=\"identity-meta\">{atlas?atlas.parts.length.toLocaleString('pt-BR'):'2,234'} estruturas em 3D <span>·</span> BodyParts3D</div>", "<div className=\"identity-meta\">{atlas?atlas.parts.length.toLocaleString('pt-BR'):(sex==='feminino'?'2.534':'2.234')} estruturas em 3D <span>·</span> {sex==='feminino'?'Human Reference Atlas · HuBMAP':'BodyParts3D'}</div><div className=\"sex-switch\" role=\"group\" aria-label=\"Referência corporal\"><button className={sex==='masculino'?'active':''} onClick={()=>{setSex('masculino');history.replaceState(null,'','?sexo=masculino')}}>Masculino</button><button className={sex==='feminino'?'active':''} onClick={()=>{setSex('feminino');history.replaceState(null,'','?sexo=feminino')}}>Feminino · HuBMAP</button></div>");
  page = page.replace("'CORPO ADULTO · MASCULINO'", "sex==='feminino'?'CORPO ADULTO · FEMININO':'CORPO ADULTO · MASCULINO'");
  page = page.replace("Explore a anatomia de referência masculina adulta do BodyParts3D.", "{sex==='feminino'?'Explore a referência corporal feminina do Human Reference Atlas / HuBMAP.':'Explore a anatomia de referência masculina adulta do BodyParts3D.'}");
  page = page.replace("<p><strong>Masculino · BodyParts3D</strong>", "<p><strong>{sex==='feminino'?'Feminino · Human Reference Atlas / HuBMAP':'Masculino · BodyParts3D'}</strong>");
  fs.writeFileSync(pagePath, page);

  const anatomyPath = path.join(source, "app/anatomy.ts");
  let anatomy = fs.readFileSync(anatomyPath, "utf8");
  const names = { skeletal:"Esqueleto",muscular:"Músculos",cardiac:"Coração",sensory:"Órgãos dos sentidos",arterial:"Artérias",venous:"Veias",nervous:"Sistema nervoso",respiratory:"Sistema respiratório",digestive:"Sistema digestório",urinary:"Sistema urinário",lymphatic:"Sistema linfático",endocrine:"Sistema endócrino",reproductive:"Sistema reprodutor",integumentary:"Revestimento corporal",connective:"Tecido conjuntivo" };
  const descriptions = {
    skeletal:"Os ossos sustentam o corpo, protegem órgãos e oferecem pontos de fixação aos músculos. O tecido ósseo também armazena minerais e produz células sanguíneas.",
    muscular:"Os músculos esqueléticos geram movimento, estabilizam a postura e produzem calor. Os tendões os ligam às estruturas que movimentam.",
    cardiac:"O coração é uma bomba muscular de quatro câmaras. Suas valvas direcionam o sangue pelos circuitos pulmonar e sistêmico.",
    sensory:"Estas estruturas participam dos sentidos especiais, como visão, audição e equilíbrio, e transmitem informações ao sistema nervoso.",
    arterial:"As artérias levam o sangue para longe do coração, aos tecidos ou, no circuito pulmonar, aos pulmões.",
    venous:"As veias conduzem o sangue de volta ao coração. As veias pulmonares trazem sangue oxigenado dos pulmões.",
    nervous:"Encéfalo, medula espinal e nervos periféricos recebem e processam sinais ligados à sensibilidade, ao movimento e à regulação automática.",
    respiratory:"As vias aéreas conduzem o ar aos pulmões, onde oxigênio e dióxido de carbono são trocados entre ar e sangue.",
    digestive:"O tubo digestório processa alimentos, absorve nutrientes e água e conduz resíduos. Órgãos acessórios fornecem bile e enzimas.",
    urinary:"Os rins filtram o sangue e regulam líquidos, eletrólitos e equilíbrio ácido-base. A urina segue pelos ureteres até a bexiga.",
    lymphatic:"Vasos linfáticos devolvem líquido intersticial à circulação. Linfonodos e outros órgãos linfoides participam da resposta imune.",
    endocrine:"Órgãos endócrinos liberam hormônios no sangue e ajudam a coordenar metabolismo, crescimento, estresse e reprodução.",
    reproductive:"As estruturas reprodutoras masculinas representadas participam da produção, maturação e transporte dos espermatozoides e da produção hormonal.",
    integumentary:"O revestimento corporal forma uma barreira protetora e contribui para a sensibilidade e a regulação da temperatura.",
    connective:"Cartilagens, ligamentos e outros tecidos conjuntivos sustentam, conectam e separam estruturas e estabilizam articulações."
  };
  anatomy = anatomy.replace(/(\{id:'([^']+)',name:')[^']+(',color:'[^']+',description:')[^']+('})/g, (match, a, id, b, c) => names[id] ? a + names[id] + b + descriptions[id] + c : match);
  anatomy = anatomy.replace("export interface Part {id:string;name:string;", "export interface Part {id:string;name:string;originalName?:string;");
  anatomy = anatomy.replace("export interface Concept {id:string;name:string;", "export interface Concept {id:string;name:string;originalName?:string;");
  const explanations = {
    heart:"Bomba muscular no tórax. O lado direito envia sangue aos pulmões; o esquerdo, à circulação sistêmica.",
    liver:"Órgão sob a parte direita do diafragma. Processa nutrientes absorvidos, produz bile e sintetiza proteínas do sangue.",
    brain:"Órgão central do sistema nervoso. Suas regiões participam da percepção, do movimento, da memória, da linguagem e da regulação corporal.",
    stomach:"Câmara muscular entre esôfago e intestino delgado. Armazena e mistura o alimento com ácido e enzimas antes de liberá-lo ao duodeno.",
    spleen:"Órgão linfoide no abdome superior esquerdo. Filtra o sangue, remove células envelhecidas e participa das respostas imunes.",
    pancreas:"Órgão abdominal com funções digestivas e endócrinas. Fornece enzimas ao intestino delgado e libera hormônios como insulina e glucagon.",
    "urinary bladder":"Reservatório muscular na pelve que armazena a urina trazida dos rins pelos ureteres.",
    trachea:"Via aérea principal entre laringe e brônquios. Suas cartilagens ajudam a mantê-la aberta durante a respiração.",
    diaphragm:"Músculo que separa tórax e abdome. Sua contração aumenta o volume torácico e ajuda a entrada de ar nos pulmões."
  };
  anatomy = anatomy.replace(/(\s*'([^']+)':')[^']+(')/g, (match, a, id, b) => explanations[id] ? a + explanations[id] + b : match);
  fs.writeFileSync(anatomyPath, anatomy);

  let translatedParts = 0, translatedConcepts = 0;
  if (lexiconPath && fs.existsSync(lexiconPath)) {
    const terms = new Map(), ambiguous = new Set();
    for (const raw of fs.readFileSync(lexiconPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
      const cols = raw.trim().replace(/^"|"$/g, "").split(";");
      if (cols.length !== 8) continue;
      const english = cols[1]?.trim().toLowerCase(), portuguese = cols[5]?.trim();
      if (!english || !portuguese || /[@\[\]]/.test(portuguese)) continue;
      if (terms.has(english) && terms.get(english) !== portuguese) ambiguous.add(english);
      else terms.set(english, portuguese);
    }
    for (const key of ambiguous) terms.delete(key);
    for (const filename of ["atlas.json", "atlas-female.json"]) {
      const manifestPath = path.join(source, "public/models", filename);
      if (!fs.existsSync(manifestPath)) continue;
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      for (const part of manifest.parts) {
        const translated = terms.get(part.name.toLowerCase());
        if (translated && translated.toLowerCase() !== part.name.toLowerCase()) { part.originalName = part.name; part.name = translated; translatedParts++; }
      }
      for (const concept of manifest.concepts) {
        const translated = terms.get(concept.name.toLowerCase());
        if (translated && translated.toLowerCase() !== concept.name.toLowerCase()) { concept.originalName = concept.name; concept.name = translated; translatedConcepts++; }
      }
      fs.writeFileSync(manifestPath, JSON.stringify(manifest));
      console.log(`Terminologia PT (${filename}): ${manifest.parts.filter(part => part.originalName).length}/${manifest.parts.length} malhas e ${manifest.concepts.filter(concept => concept.originalName).length}/${manifest.concepts.length} conceitos com correspondência exata`);
    }
    console.log(`Terminologia PT total: ${translatedParts} malhas e ${translatedConcepts} conceitos traduzidos`);
  }
};


