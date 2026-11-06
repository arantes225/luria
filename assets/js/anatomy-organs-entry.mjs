import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { addTissueFinish } from "./anatomy-tissue-material.mjs";

const root = document.querySelector("[data-anatomy-organs]");
if (root) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-organs-loading]");
  const progress = root.querySelector("[data-organs-progress]");
  const title = document.querySelector("[data-organ-title]");
  const summary = document.querySelector("[data-organ-summary]");
  const detailTitle = document.querySelector("[data-organ-detail-title]");
  const detailCopy = document.querySelector("[data-organ-detail-copy]");
  const list = document.querySelector("[data-organ-structures]");
  const status = document.querySelector("[data-organs-status]");
  const catalog = {
    "kidneys-bodyparts": {"label":"Rins · BodyParts3D","summary":"Referência complementar com rins, ureteres e artérias renais. Para a cápsula, o córtex e o sistema coletor, abra Rins · HuBMAP.","structures":{"right-kidney":"Rim direito","left-kidney":"Rim esquerdo","right-ureter":"Ureter direito","left-ureter":"Ureter esquerdo","right-renal-artery":"Artéria renal direita","left-renal-artery":"Artéria renal esquerda"}},
    spleen: {"label":"Baço e relações","summary":"Baço, vasos esplênicos e órgãos vizinhos, incluindo estômago, pâncreas, rim e suprarrenal esquerdos.","structures":{"spleen":"Baço","splenic-artery":"Artéria esplênica","splenic-vein":"Veia esplênica","celiac-trunk":"Tronco celíaco","superior-mesenteric-vein":"Veia mesentérica superior","stomach":"Estômago","pancreas":"Pâncreas","left-kidney":"Rim esquerdo","left-adrenal":"Glândula suprarrenal esquerda"}},
    eye: {"label":"Olho","summary":"Túnicas do globo ocular, cristalino, corpo vítreo, nervo óptico, músculos extraoculares e estruturas palpebrais.","structures":{"cornea":"Córnea","sclera":"Esclera","choroid":"Coroide","retina":"Retina","iris":"Íris","anterior-chamber":"Câmara anterior","lens":"Cristalino","suspensory-ligament":"Zônula ciliar","vitreous-body":"Corpo vítreo","superior-rectus":"Músculo reto superior","inferior-rectus":"Músculo reto inferior","medial-rectus":"Músculo reto medial","lateral-rectus":"Músculo reto lateral","superior-oblique":"Músculo oblíquo superior","inferior-oblique":"Músculo oblíquo inferior","levator-palpebrae":"Músculo levantador da pálpebra superior","optic-nerve":"Nervo óptico","trochlea":"Tróclea","lacrimal-gland":"Glândula lacrimal","upper-tarsal-plate":"Tarso superior","lower-tarsal-plate":"Tarso inferior"}},
    brain: {"label":"Encéfalo","summary":"Lobos cerebrais, hipocampos, cerebelo, tronco encefálico e sistema ventricular. Use o corte para expor as estruturas internas.","structures":{"left-frontal":"Lobo frontal esquerdo","right-frontal":"Lobo frontal direito","left-parietal":"Lobo parietal esquerdo","right-parietal":"Lobo parietal direito","left-temporal":"Lobo temporal esquerdo","right-temporal":"Lobo temporal direito","left-occipital":"Lobo occipital esquerdo","right-occipital":"Lobo occipital direito","left-hippocampus":"Hipocampo esquerdo","right-hippocampus":"Hipocampo direito","midbrain":"Mesencéfalo","pons":"Ponte","medulla":"Bulbo (medula oblonga)","cerebellum":"Cerebelo","left-lateral-ventricle":"Ventrículo lateral esquerdo","right-lateral-ventricle":"Ventrículo lateral direito","third-ventricle":"Terceiro ventrículo","cerebral-aqueduct":"Aqueduto cerebral","fourth-ventricle":"Quarto ventrículo"}},
    breasts: { label: "Mamas", color: "#c57984", summary: "Glândulas mamárias: lobos, ductos, seios lactíferos, gordura, ligamentos, aréolas e mamilos. Use o corte didático para explorar as camadas.", structures: {
      VH_F_mammary_lobes_L: "Lobos da mama esquerda", VH_F_main_lactiferous_ducts_L: "Ductos lactíferos esquerdos", VH_F_main_lactiferous_sinuses_L: "Seios lactíferos esquerdos", VH_F_suspensory_ligaments_L: "Ligamentos suspensores esquerdos", VH_F_fat_L: "Tecido adiposo interlobar esquerdo", VH_F_areola_L: "Aréola esquerda", VH_F_nipple_L: "Mamilo esquerdo", VH_F_areolar_tubercles_L: "Tubérculos areolares esquerdos",
      VH_F_mammary_lobes_R: "Lobos da mama direita", VH_F_main_lactiferous_ducts_R: "Ductos lactíferos direitos", VH_F_main_lactiferous_sinuses_R: "Seios lactíferos direitos", VH_F_suspensory_ligaments_R: "Ligamentos suspensores direitos", VH_F_fat_R: "Tecido adiposo interlobar direito", VH_F_areola_R: "Aréola direita", VH_F_nipple_R: "Mamilo direito", VH_F_areolar_tubercles_R: "Tubérculos areolares direitos"
    }},
    lungs: { label: "Pulmões", color: "#d77f86", summary: "Segmentos broncopulmonares, traqueia e árvores brônquicas.", structures: {
      FMA7338: "Segmento apical direito", FMA7339: "Segmento posterior direito", FMA7359: "Segmento anterior direito", FMA7361: "Segmento lateral direito", FMA7360: "Segmento medial direito", FMA7366: "Segmento superior direito", FMA7364: "Segmento basal anterior direito", FMA7363: "Segmento basal lateral direito", FMA7362: "Segmento basal posterior direito", FMA7372: "Segmento apicoposterior esquerdo", FMA7373: "Segmento anterior esquerdo", FMA7374: "Segmento lingular superior", FMA7375: "Segmento lingular inferior", FMA7376: "Segmento superior esquerdo", FMA7378: "Segmento basal anterior esquerdo", FMA7379: "Segmento basal lateral esquerdo", FMA7380: "Segmento basal posterior esquerdo", FMA7394: "Traqueia", FMA26661: "Árvore brônquica direita", FMA26662: "Árvore brônquica esquerda"
    }},
    kidneys: { label: "Rins e sistema coletor · HuBMAP", color: "#c88773", summary: "Referência feminina. Cápsula, córtex, pirâmides, papilas, cálices e pelve renal dos dois lados, com ureteres e vasos renais. Abra a vista interna para estudar o sistema coletor.", structures: Object.fromEntries(
      [["R", "direito", "direita", "right"], ["L", "esquerdo", "esquerda", "left"]].flatMap(([side, masc, fem, en]) => [
        [`VH_F_kidney_capsule_${side}`, `Cápsula do rim ${masc}`], [`VH_F_outer_cortex_of_kidney_${side}`, `Córtex renal ${masc}`],
        [`VH_F_hilum_of_kidney_${side}`, `Hilo renal ${masc}`], [`VH_F_renal_column_${side}`, `Colunas do rim ${masc}`],
        [`VH_F_renal_pyramid_${side}`, `Pirâmides do rim ${masc}`], [`VH_F_renal_papilla_${side}`, `Papilas do rim ${masc}`],
        [`VH_F_minor_calyx_${side}`, `Cálices menores do rim ${masc}`], [`VH_F_major_calyx_${side}`, `Cálices maiores do rim ${masc}`],
        [`VH_F_renal_pelvis_${side}`, `Pelve renal ${fem}`], [`VH_F_${en}_ureter`, `Ureter ${masc}`],
        [`VH_F_${en}_renal_artery`, `Artéria renal ${fem}`], [`VH_F_${en}_renal_vein`, `Veia renal ${fem}`]
      ])
    ) },
    stomach: { label: "Estômago e vasos", color: "#d5967c", summary: "Estômago, duodeno, baço, pâncreas e ramos do tronco celíaco.", structures: { stomach: "Estômago", esophagus: "Esôfago", duodenum: "Duodeno", "celiac-trunk": "Tronco celíaco", "left-gastric-artery": "Artéria gástrica esquerda", "splenic-artery": "Artéria esplênica", "common-hepatic-artery": "Artéria hepática comum", spleen: "Baço", pancreas: "Pâncreas" }},
    bladder: { label: "Bexiga e pelve masculina", color: "#d98f96", summary: "Referência pélvica masculina: bexiga, uretra, ureteres, próstata e assoalho pélvico.", structures: { "urinary-bladder": "Bexiga urinária", "right-ureter": "Ureter direito", "left-ureter": "Ureter esquerdo", urethra: "Uretra", prostate: "Próstata", "right-seminal-vesicle": "Vesícula seminal direita", "left-seminal-vesicle": "Vesícula seminal esquerda", "right-pubococcygeus": "Pubococcígeo direito", "left-pubococcygeus": "Pubococcígeo esquerdo", "right-puborectalis": "Puborretal direito", "left-puborectalis": "Puborretal esquerdo", rectum: "Reto" }},
    reproductive: { label: "Pelve reprodutora feminina", color: "#bb7688", summary: "Útero, colo, vagina, tubas, ovários, ligamentos, vasos uterinos e bexiga de referência feminina HuBMAP.", structures: { fundus:"Fundo uterino",body:"Corpo do útero",cornua:"Corno uterino","tubal-ostia":"Óstio tubário","lower-segment":"Segmento uterino inferior",cervix:"Colo do útero","internal-os":"Óstio interno do colo","external-os":"Óstio externo do colo",vagina:"Vagina","cervicovaginal-junction":"Junção cervicovaginal",isthmus:"Istmo das tubas",ampulla:"Ampola das tubas",infundibulum:"Infundíbulo das tubas",fimbriae:"Fímbrias","left-ovary":"Ovário esquerdo","right-ovary":"Ovário direito","broad-ligament":"Ligamento largo",mesosalpinx:"Mesossalpinge",mesovarium:"Mesovário","ovarian-ligaments":"Ligamentos ovarianos","suspensory-ligaments":"Ligamentos suspensores dos ovários","round-ligaments":"Ligamentos redondos","cardinal-ligaments":"Ligamentos cardinais","uterosacral-ligaments":"Ligamentos uterossacros","uterine-arteries":"Artérias uterinas","uterine-veins":"Veias uterinas",bladder:"Bexiga urinária" }},
    intestines: { label: "Intestinos", color: "#d8a171", summary: "Duodeno, jejuno, íleo, cólon, apêndice e tênias do cólon.", structures: { duodenum: "Duodeno", jejunum: "Jejuno", ileum: "Íleo", appendix: "Apêndice", "ascending-colon": "Cólon ascendente", "transverse-colon": "Cólon transverso", "descending-colon": "Cólon descendente", rectum: "Reto", "mesocolic-taenia": "Tênia mesocólica", "omental-taenia": "Tênia omental", "free-taenia": "Tênia livre" }},
    liver: { label: "Fígado e vias biliares", color: "#9b694d", summary: "Fígado, vesícula, veias hepáticas, sistema porta e vias biliares.", structures: { liver: "Fígado", gallbladder: "Vesícula biliar", portal: "Veia porta hepática", "hepatic-veins": "Veias hepáticas", artery: "Artéria hepática", biliary: "Vias biliares", cystic: "Ducto cístico" }},
    pancreas: { label: "Pâncreas e vasos", color: "#d2a06f", summary: "Pâncreas, ducto pancreático e vasos do tronco celíaco e mesentérico.", structures: { pancreas: "Pâncreas", "pancreatic-duct": "Ducto pancreático", duodenum: "Duodeno", spleen: "Baço", "celiac-trunk": "Tronco celíaco", "common-hepatic-artery": "Artéria hepática comum", "gastroduodenal-artery": "Artéria gastroduodenal", "pancreaticoduodenal-arteries": "Artérias pancreaticoduodenais", "splenic-artery": "Artéria esplênica", "pancreatic-arteries": "Artérias pancreáticas", "superior-mesenteric-artery": "Artéria mesentérica superior", "portal-vein": "Veia porta", "splenic-vein":"Veia esplênica","superior-mesenteric-vein":"Veia mesentérica superior","pancreaticoduodenal-veins":"Veias pancreaticoduodenais" }},
    gallbladder: { label: "Vesícula e árvore biliar", color: "#8ca66d", summary: "Vesícula, ductos hepáticos, ducto colédoco, pâncreas e vasos porta-hepáticos.", structures: { gallbladder: "Vesícula biliar", "cystic-duct": "Ducto cístico", "common-hepatic-duct": "Ducto hepático comum", "right-hepatic-duct": "Ducto hepático direito", "left-hepatic-duct": "Ducto hepático esquerdo", "intrahepatic-ducts": "Ductos intra-hepáticos", "pancreatic-duct": "Ducto pancreático", liver: "Fígado", duodenum: "Duodeno", pancreas: "Pâncreas", "portal-vein": "Veia porta", "common-hepatic-artery": "Artéria hepática comum", "hepatic-artery-proper":"Artéria hepática própria","right-hepatic-artery":"Artéria hepática direita","left-hepatic-artery":"Artéria hepática esquerda" }},
    esophagus: { label: "Esôfago e mediastino", color: "#bd7e83", summary: "Esôfago, traqueia, brônquios, vasos e nervos relacionados ao mediastino.", structures: { esophagus: "Esôfago", stomach: "Estômago", trachea: "Traqueia", "main-bronchi": "Brônquios principais", "thyroid-gland": "Glândula tireoide", "left-atrium": "Átrio esquerdo", "aortic-arch": "Arco da aorta", "descending-aorta": "Aorta descendente", "esophageal-arteries": "Artérias esofágicas", "azygos-vein": "Veia ázigos", "left-vagus-nerve": "Nervo vago esquerdo", "recurrent-laryngeal-nerves": "Nervos laríngeos recorrentes", "inferior-thyroid-arteries":"Artérias tireóideas inferiores","left-gastric-artery":"Artéria gástrica esquerda","hemiazygos-veins":"Veias hemiázigos","left-gastric-vein":"Veia gástrica esquerda","right-vagus-nerve":"Nervo vago direito" }},
    larynx: { label: "Laringe", color: "#c7a16c", summary: "Cartilagens, ligamentos, músculos intrínsecos, pregas vocais e tireoide.", structures: { "hyoid-bone": "Osso hioide", "thyroid-cartilage": "Cartilagem tireóidea", "cricoid-cartilage": "Cartilagem cricoide", epiglottis: "Epiglote", "arytenoid-cartilages": "Cartilagens aritenoides", "vocal-ligaments": "Ligamentos vocais", "cricothyroid-ligament": "Ligamento cricotireóideo", "cricothyroid-muscle": "Músculo cricotireóideo", "posterior-crico-arytenoid": "Músculo cricoaritenóideo posterior", "lateral-crico-arytenoid": "Músculo cricoaritenóideo lateral", "thyro-arytenoid": "Músculo tireoaritenóideo", vocalis: "Músculo vocal", trachea: "Traqueia", "thyroid-gland": "Glândula tireoide", "corniculate-cuneiform-cartilages":"Cartilagens corniculadas e cuneiformes","thyrohyoid-membrane":"Membrana tireo-hióidea","conus-elasticus":"Cone elástico","epiglottic-ligaments":"Ligamentos epiglóticos","arytenoid-muscles":"Músculos aritenóideos","aryepiglottic-muscle":"Músculo ariepiglótico" }}
  };
  const requestedOrgan = new URLSearchParams(location.search).get("orgao");
  let renderer, controls, scene, camera, model, selectedId = "", currentKey = Object.hasOwn(catalog, requestedOrgan) ? requestedOrgan : "lungs", rotating = false, cut = false;
  const objects = new Map();
  const vascularButton = document.querySelector("[data-organ-vessels]");
  const vascularControls = vascularButton?.parentElement;
  const vascularAnchor = vascularButton?.nextElementSibling;
  let vascularFocus = false;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const announce = message => { if (status) status.textContent = message; };
  const current = () => catalog[currentKey];
  const labelFor = id => current().structures[id] || id.replace(/[-_]/g, " ");
  const breastDetails = {
    mammary_lobes: "Conjunto glandular organizado em lobos, relacionado à produção de leite durante a lactação.",
    main_lactiferous_ducts: "Ductos que conduzem a secreção glandular em direção ao mamilo.",
    main_lactiferous_sinuses: "Dilatações dos ductos lactíferos representadas nesta referência anatômica.",
    suspensory_ligaments: "Faixas de tecido conjuntivo que ajudam a sustentar a mama.",
    fat: "Tecido adiposo interlobar que envolve e separa estruturas glandulares.",
    areolar_tubercles: "Pequenas saliências da aréola associadas às glândulas areolares.",
    areola: "Área pigmentada ao redor do mamilo.",
    nipple: "Projeção central da mama por onde desembocam os ductos lactíferos."
  };
  const hasLayers = () => currentKey === "breasts" || currentKey === "kidneys";
  const isOuter = id => currentKey === "breasts" ? /_(fat|areola|nipple|areolar_tubercles)_/.test(id) : /kidney_capsule|outer_cortex/.test(id);
  function isVessel(id) {
    return /^(?:artérias?|veias?|aorta|arco da aorta|tronco celíaco)\b/i.test(current().structures[id] || "");
  }

  function updateAppearance() {
    objects.forEach((meshes, id) => meshes.forEach(object => {
      const selected = selectedId === id;
      if (selected) object.visible = true;
      let opacity = 1;
      if (!isVessel(id)) {
        if (cut && hasLayers() && isOuter(id)) opacity = selected ? .42 : .16;
        else if (vascularFocus) opacity = selected ? .50 : .19;
        else if (!(cut && hasLayers()) && selectedId && !selected) opacity = .26;
      }
      object.material.emissive?.set(selected ? "#fff0b4" : "#000000");
      object.material.emissiveIntensity = selected ? .25 : 0;
      const base = object.material.userData.atlasAppearance;
      object.material.opacity = base.opacity * opacity;
      object.material.transparent = base.transparent || opacity < 1;
      object.material.depthWrite = base.depthWrite && opacity === 1;
    }));
  }
  // Use a finish only for verified tissue meshes without authored surface maps.
  const softTissue = {
    brain: [/^(left|right)-(frontal|parietal|temporal|occipital|hippocampus)$|^(cerebellum|midbrain|pons|medulla)$/, .30, .74],
    lungs: [/^(?!FMA7394$|FMA266)/, .65, .83],
    liver: [/^liver$/, .34, .65],
    stomach: [/^(stomach|duodenum|esophagus)$/, .29, .60],
    esophagus: [/^(esophagus|stomach)$/, .27, .62],
    intestines: [/^(duodenum|jejunum|ileum|.*colon|rectum|appendix)$/, .27, .61],
    pancreas: [/^pancreas$/, .38, .73],
    spleen: [/^spleen$/, .25, .64],
    kidneys: [/kidney_capsule|outer_cortex_of_kidney|renal_pyramid|renal_column/, .31, .67],
    "kidneys-bodyparts": [/^(left|right)-kidney$/, .28, .67],
    breasts: [/fat_|mammary_lobes|nipple|areola/, .29, .72],
    reproductive: [/^(uterus|fundus|body|cervix|ovary|vagina)/, .26, .68],
    bladder: [/^(urinary-bladder|prostate)$/, .25, .64],
    gallbladder: [/^(gallbladder|liver|pancreas)$/, .26, .65],
    larynx: [/cartilage|muscle/, .22, .73]
  };

  function materialFor(source, id, key, modelSize) {
    const material = source.clone();
    material.userData.atlasAppearance = {opacity: source.opacity, transparent: source.transparent, depthWrite: source.depthWrite};
    material.side = THREE.DoubleSide;
    if (material.emissive) material.emissive.set("#000000");
    const finish = softTissue[key];
    const authoredSurface = source.map || source.normalMap || source.roughnessMap || source.bumpMap || source.alphaMap;
    if (!finish || !finish[0].test(id) || authoredSurface || source.transparent || source.transmission > 0 || !material.isMeshStandardMaterial) return material;
    if (key === "lungs") material.color.set("#b66c73");
    material.roughness = finish[2];
    material.metalness = 0;
    return addTissueFinish(material, modelSize, finish[1]);
  }
  function select(id) {
    if (!objects.has(id)) return;
    selectedId = id;
    updateAppearance();
    const label = labelFor(id);
    const breastPart = currentKey === "breasts" ? Object.keys(breastDetails).find(part => id.includes(`_${part}_`) || id.includes(`_${part}`)) : null;
    const renalDescription = currentKey === "kidneys" ? Object.entries({
      renal_pelvis: "Recebe a urina dos cálices maiores e continua como ureter.",
      minor_calyx: "Recebe a urina de uma papila renal e a conduz para um cálice maior.",
      major_calyx: "Reúne a urina de cálices menores e a conduz para a pelve renal.",
      renal_papilla: "Ápice da pirâmide renal, onde os ductos papilares desembocam no cálice menor.",
      renal_pyramid: "Estrutura da medula renal cujo ápice forma a papila."
    }).find(([part]) => id.includes(part))?.[1] : null;
    detailTitle.textContent = label; detailCopy.textContent = breastPart ? breastDetails[breastPart] : renalDescription || `${label}. Gire o modelo para observar a relação com as estruturas ao redor.`;
    announce(`${label}. Estrutura selecionada.`);
    list?.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button.dataset.structureId === id));
  }
  function fit() {
    if (!model) return;
    const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); const distance = Math.max(size.x, size.y, size.z) * 2.25; camera.position.set(distance * .25, distance * .2, distance); controls.target.set(0, 0, 0); controls.minDistance = distance * .38; controls.maxDistance = distance * 7; controls.update();
  }
  function clearModel() { if (!model) return; scene.remove(model); model.traverse(object => { if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); } }); model = null; objects.clear(); }
  function buildList() { if (!list) return; list.innerHTML = ""; for (const [id, label] of Object.entries(current().structures)) { if (model && !objects.has(id)) continue; const button = document.createElement("button"); button.type = "button"; button.dataset.structureId = id; button.textContent = label; button.addEventListener("click", () => select(id)); list.append(button); } }
  function load(key) {
    vascularFocus = false;
    if (vascularButton) {
      vascularButton.remove();
      vascularButton.setAttribute("aria-pressed", "false");
    }
    currentKey = key; title.textContent = current().label; summary.textContent = current().summary; detailTitle.textContent = "Selecione uma estrutura"; detailCopy.textContent = "Clique na malha colorida ou escolha uma estrutura na lista."; selectedId = ""; clearModel(); buildList(); cut = false; renderer.localClippingEnabled = false; const cutButton = document.querySelector("[data-organ-cut]"); cutButton?.setAttribute("aria-pressed", "false"); if (cutButton) cutButton.textContent = hasLayers() ? "Ver por dentro" : "Corte didático"; loading.hidden = false; loading.classList.remove("is-error"); progress.style.width = "0%";
    const version = hasLayers() ? "?v=hra2" : "";
    new GLTFLoader().load(`/assets/models/anatomia/orgaos/${key}.glb${version}`, gltf => {
      if (key !== currentKey) return;
      model = gltf.scene;
      const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
      model.traverse(object => {
        if (!object.isMesh) return;
        const sourceId = object.userData.structureId || object.name;
        let id = sourceId;
        for (let node = object; node; node = node.parent) {
          const raw = node.userData.structureId || node.name;
          const candidate = key === "kidneys" ? raw.replace(/((?:renal_papilla|renal_pyramid|minor_calyx|major_calyx)_[LR])_[a-z]$/, "$1") : raw;
          if (Object.hasOwn(catalog[key].structures, candidate)) {
            id = candidate;
            break;
          }
        }
        object.material = materialFor(object.material, id, key, Math.max(size.x, size.y, size.z));
        object.userData.structureId = id;
        if (key === "reproductive" && (id === "broad-ligament" || id === "bladder")) object.visible = false;
        if (!objects.has(id)) objects.set(id, []);
        objects.get(id).push(object);
      });
      if (vascularButton && [...objects.keys()].some(isVessel)) {
        vascularButton.hidden = false;
        vascularControls?.insertBefore(vascularButton, vascularAnchor ?? null);
      }
      scene.add(model); fit(); buildList(); updateAppearance(); loading.hidden = true;
      announce(`${current().label} carregado. Selecione uma estrutura.`);
    }, event => { if (event.total) progress.style.width = `${Math.min(100, event.loaded / event.total * 100)}%`; }, error => { if (key !== currentKey) return; loading.hidden = false; loading.classList.add("is-error"); loading.querySelector("strong").textContent = "Modelo indisponível"; loading.querySelector("span").textContent = "Recarregue a página para tentar novamente."; announce(`Não foi possível carregar ${current().label}.`); console.error(error); });
  }
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); renderer.setClearColor("#e9f0f8"); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .9;
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(32, 1, .01, 100); controls = new OrbitControls(camera, canvas); controls.enableDamping = !reducedMotion; controls.enablePan = true; controls.autoRotateSpeed = .55; scene.add(new THREE.HemisphereLight(0xfff1e8, 0x55708d, 1.05)); const key = new THREE.DirectionalLight(0xffe4d5, 1.9); key.position.set(3, 5, 5); scene.add(key); const fill = new THREE.DirectionalLight(0xc9dcfa, .9); fill.position.set(-4, 2, 3); scene.add(fill);
    const resize = () => { const rect = root.getBoundingClientRect(); renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); }; new ResizeObserver(resize).observe(root); resize();
    const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
    canvas.addEventListener("pointerup", event => { const rect = canvas.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); raycaster.setFromCamera(pointer, camera); const hits = raycaster.intersectObjects([...objects.values()].flat().filter(mesh => mesh.visible), false).filter(hit => !renderer.localClippingEnabled || isVessel(hit.object.userData.structureId) || hit.point.x >= 0); const hit = (vascularFocus ? hits.find(candidate => isVessel(candidate.object.userData.structureId)) : null) || (cut && hasLayers() ? hits.find(candidate => !isOuter(candidate.object.userData.structureId)) : null) || hits[0]; if (hit) select(hit.object.userData.structureId || hit.object.name); });
    document.querySelectorAll("[data-organ]").forEach(button => button.addEventListener("click", () => { document.querySelectorAll("[data-organ]").forEach(item => item.classList.toggle("is-active", item === button)); history.replaceState(null, "", `?orgao=${encodeURIComponent(button.dataset.organ)}`); load(button.dataset.organ); }));
    document.querySelector("[data-organ-reset]")?.addEventListener("click", () => { selectedId = ""; updateAppearance(); detailTitle.textContent = "Selecione uma estrutura"; detailCopy.textContent = "Clique na malha colorida ou escolha uma estrutura na lista."; list?.querySelectorAll("button").forEach(button => button.classList.remove("is-active")); fit(); });
    document.querySelector("[data-organ-rotate]")?.addEventListener("click", event => { rotating = !rotating; controls.autoRotate = rotating; event.currentTarget.setAttribute("aria-pressed", String(rotating)); });
    vascularButton?.addEventListener("click", () => {
      vascularFocus = !vascularFocus;
      vascularButton.setAttribute("aria-pressed", String(vascularFocus));
      updateAppearance();
      announce(vascularFocus ? "Vasos da região em destaque." : "Visão geral do órgão.");
    });
    document.querySelector("[data-organ-cut]")?.addEventListener("click", event => {
      cut = !cut; event.currentTarget.setAttribute("aria-pressed", String(cut));
      if (hasLayers()) {
        event.currentTarget.textContent = cut ? "Ver exterior" : "Ver por dentro";
        updateAppearance();
        renderer.localClippingEnabled = false;
      } else {
        objects.forEach((meshes, id) => meshes.forEach(object => { object.material.clippingPlanes = cut && !isVessel(id) ? [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)] : []; object.material.needsUpdate = true; }));
        renderer.localClippingEnabled = cut;
      }
    });
    const animate = () => { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }; animate(); document.querySelectorAll("[data-organ]").forEach(button => button.classList.toggle("is-active", button.dataset.organ === currentKey)); load(currentKey);
  } catch (error) { loading.classList.add("is-error"); loading.querySelector("strong").textContent = "3D indisponível"; loading.querySelector("span").textContent = "Este navegador não conseguiu iniciar o visualizador."; announce("Visualização 3D indisponível."); console.error(error); }
}
