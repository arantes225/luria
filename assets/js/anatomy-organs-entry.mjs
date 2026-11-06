import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
    lungs: { label: "Pulmões", color: "#d77f86", summary: "Segmentos broncopulmonares, traqueia e árvores brônquicas.", structures: {
      FMA7338: "Segmento apical direito", FMA7339: "Segmento posterior direito", FMA7359: "Segmento anterior direito", FMA7361: "Segmento lateral direito", FMA7360: "Segmento medial direito", FMA7366: "Segmento superior direito", FMA7364: "Segmento basal anterior direito", FMA7363: "Segmento basal lateral direito", FMA7362: "Segmento basal posterior direito", FMA7372: "Segmento apicoposterior esquerdo", FMA7373: "Segmento anterior esquerdo", FMA7374: "Segmento lingular superior", FMA7375: "Segmento lingular inferior", FMA7376: "Segmento superior esquerdo", FMA7378: "Segmento basal anterior esquerdo", FMA7379: "Segmento basal lateral esquerdo", FMA7380: "Segmento basal posterior esquerdo", FMA7394: "Traqueia", FMA26661: "Árvore brônquica direita", FMA26662: "Árvore brônquica esquerda"
    }},
    kidneys: { label: "Rins e pelve renal", color: "#c88773", summary: "Rins, ureteres e artérias renais em uma vista de relações do hilo.", structures: { "right-kidney": "Rim direito", "left-kidney": "Rim esquerdo", "right-ureter": "Ureter direito", "left-ureter": "Ureter esquerdo", "right-renal-artery": "Artéria renal direita", "left-renal-artery": "Artéria renal esquerda" }},
    stomach: { label: "Estômago e vasos", color: "#d5967c", summary: "Estômago, duodeno, baço, pâncreas e ramos do tronco celíaco.", structures: { stomach: "Estômago", esophagus: "Esôfago", duodenum: "Duodeno", "celiac-trunk": "Tronco celíaco", "left-gastric-artery": "Artéria gástrica esquerda", "splenic-artery": "Artéria esplênica", "common-hepatic-artery": "Artéria hepática comum", spleen: "Baço", pancreas: "Pâncreas" }},
    bladder: { label: "Bexiga e pelve", color: "#d98f96", summary: "Bexiga, uretra, ureteres, próstata e estruturas do assoalho pélvico.", structures: { "urinary-bladder": "Bexiga urinária", "right-ureter": "Ureter direito", "left-ureter": "Ureter esquerdo", urethra: "Uretra", prostate: "Próstata", "right-seminal-vesicle": "Vesícula seminal direita", "left-seminal-vesicle": "Vesícula seminal esquerda", rectum: "Reto" }},
    intestines: { label: "Intestinos", color: "#d8a171", summary: "Duodeno, jejuno, íleo, cólon, apêndice e tênias do cólon.", structures: { duodenum: "Duodeno", jejunum: "Jejuno", ileum: "Íleo", appendix: "Apêndice", "ascending-colon": "Cólon ascendente", "transverse-colon": "Cólon transverso", "descending-colon": "Cólon descendente", rectum: "Reto", "mesocolic-taenia": "Tênia mesocólica", "omental-taenia": "Tênia omental", "free-taenia": "Tênia livre" }},
    liver: { label: "Fígado e vias biliares", color: "#9b694d", summary: "Fígado, vesícula, veias hepáticas, sistema porta e vias biliares.", structures: { liver: "Fígado", gallbladder: "Vesícula biliar", portal: "Veia porta hepática", "hepatic-veins": "Veias hepáticas", artery: "Artéria hepática", biliary: "Vias biliares", cystic: "Ducto cístico" }},
    pancreas: { label: "Pâncreas e vasos", color: "#d2a06f", summary: "Pâncreas, ducto pancreático e vasos do tronco celíaco e mesentérico.", structures: { pancreas: "Pâncreas", "pancreatic-duct": "Ducto pancreático", duodenum: "Duodeno", spleen: "Baço", "celiac-trunk": "Tronco celíaco", "common-hepatic-artery": "Artéria hepática comum", "gastroduodenal-artery": "Artéria gastroduodenal", "pancreaticoduodenal-arteries": "Artérias pancreaticoduodenais", "splenic-artery": "Artéria esplênica", "pancreatic-arteries": "Artérias pancreáticas", "superior-mesenteric-artery": "Artéria mesentérica superior", "portal-vein": "Veia porta" }},
    gallbladder: { label: "Vesícula e árvore biliar", color: "#8ca66d", summary: "Vesícula, ductos hepáticos, ducto colédoco, pâncreas e vasos porta-hepáticos.", structures: { gallbladder: "Vesícula biliar", "cystic-duct": "Ducto cístico", "common-hepatic-duct": "Ducto hepático comum", "right-hepatic-duct": "Ducto hepático direito", "left-hepatic-duct": "Ducto hepático esquerdo", "intrahepatic-ducts": "Ductos intra-hepáticos", "pancreatic-duct": "Ducto pancreático", liver: "Fígado", duodenum: "Duodeno", pancreas: "Pâncreas", "portal-vein": "Veia porta", "common-hepatic-artery": "Artéria hepática comum" }},
    esophagus: { label: "Esôfago e mediastino", color: "#bd7e83", summary: "Esôfago, traqueia, brônquios, vasos e nervos relacionados ao mediastino.", structures: { esophagus: "Esôfago", stomach: "Estômago", trachea: "Traqueia", "main-bronchi": "Brônquios principais", "thyroid-gland": "Glândula tireoide", "left-atrium": "Átrio esquerdo", "aortic-arch": "Arco da aorta", "descending-aorta": "Aorta descendente", "esophageal-arteries": "Artérias esofágicas", "azygos-vein": "Veia ázigos", "left-vagus-nerve": "Nervo vago esquerdo", "recurrent-laryngeal-nerves": "Nervos laríngeos recorrentes" }},
    larynx: { label: "Laringe", color: "#c7a16c", summary: "Cartilagens, ligamentos, músculos intrínsecos, pregas vocais e tireoide.", structures: { "hyoid-bone": "Osso hioide", "thyroid-cartilage": "Cartilagem tireóidea", "cricoid-cartilage": "Cartilagem cricoide", epiglottis: "Epiglote", "arytenoid-cartilages": "Cartilagens aritenoides", "vocal-ligaments": "Ligamentos vocais", "cricothyroid-ligament": "Ligamento cricotireóideo", "cricothyroid-muscle": "Músculo cricotireóideo", "posterior-crico-arytenoid": "Músculo cricoaritenóideo posterior", "lateral-crico-arytenoid": "Músculo cricoaritenóideo lateral", "thyro-arytenoid": "Músculo tireoaritenóideo", vocalis: "Músculo vocal", trachea: "Traqueia", "thyroid-gland": "Glândula tireoide" }}
  };
  let renderer, controls, scene, camera, model, selectedId = "", currentKey = "lungs", rotating = false, cut = false;
  const objects = new Map();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const announce = message => { if (status) status.textContent = message; };
  const current = () => catalog[currentKey];
  const labelFor = id => current().structures[id] || id.replace(/[-_]/g, " ");
  const isVessel = id => /artery|vein|portal|aorta|bronch|duct|vagus|nerve|vocal|ligament/.test(id);
  function materialFor(id) {
    const vessel = isVessel(id);
    return new THREE.MeshPhysicalMaterial({ color: vessel ? (/vein|portal/.test(id) ? "#628bb9" : "#bd695f") : current().color, roughness: vessel ? .55 : .78, clearcoat: vessel ? .22 : .08, clearcoatRoughness: .72, side: THREE.DoubleSide });
  }
  function select(id) {
    if (!objects.has(id)) return;
    selectedId = id;
    objects.forEach((object, key) => { object.material.emissive?.set(key === id ? "#f0c36b" : "#000000"); object.material.emissiveIntensity = key === id ? .35 : 0; });
    const label = labelFor(id);
    detailTitle.textContent = label; detailCopy.textContent = `${label}. Estrutura identificada no modelo detalhado do atlas BodyParts3D/OrganUI.`;
    announce(`${label}. Estrutura selecionada.`);
    list?.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button.dataset.structureId === id));
  }
  function fit() {
    if (!model) return;
    const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); const distance = Math.max(size.x, size.y, size.z) * 2.25; camera.position.set(distance * .55, distance * .35, distance); controls.target.set(0, 0, 0); controls.minDistance = distance * .38; controls.maxDistance = distance * 7; controls.update();
  }
  function clearModel() { if (!model) return; scene.remove(model); model.traverse(object => { if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); } }); model = null; objects.clear(); }
  function buildList() { if (!list) return; list.innerHTML = ""; for (const [id, label] of Object.entries(current().structures)) { const button = document.createElement("button"); button.type = "button"; button.dataset.structureId = id; button.textContent = label; button.addEventListener("click", () => select(id)); list.append(button); } }
  function load(key) {
    currentKey = key; title.textContent = current().label; summary.textContent = current().summary; detailTitle.textContent = "Selecione uma estrutura"; detailCopy.textContent = "Clique na malha colorida ou escolha uma estrutura na lista."; selectedId = ""; buildList(); clearModel(); loading.hidden = false; loading.classList.remove("is-error"); progress.style.width = "0%";
    new GLTFLoader().load(`/assets/models/anatomia/orgaos/${key}.glb`, gltf => { model = gltf.scene; model.traverse(object => { if (!object.isMesh) return; const id = object.userData.structureId || object.name; object.material = materialFor(id); object.userData.structureId = id; objects.set(id, object); }); scene.add(model); fit(); loading.hidden = true; announce(`${current().label} carregados. Selecione uma estrutura.`); }, event => { if (event.total) progress.style.width = `${Math.min(100, event.loaded / event.total * 100)}%`; }, error => { loading.hidden = false; loading.classList.add("is-error"); loading.querySelector("strong").textContent = "Modelo indisponível"; loading.querySelector("span").textContent = "Recarregue a página para tentar novamente."; announce(`Não foi possível carregar ${current().label}.`); console.error(error); });
  }
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); renderer.setClearColor("#e9f0f8"); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.02;
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(32, 1, .01, 100); controls = new OrbitControls(camera, canvas); controls.enableDamping = !reducedMotion; controls.enablePan = true; controls.autoRotateSpeed = .55; scene.add(new THREE.HemisphereLight(0xfff1e8, 0x55708d, 1.35)); const key = new THREE.DirectionalLight(0xffe4d5, 2.6); key.position.set(3, 5, 5); scene.add(key); const fill = new THREE.DirectionalLight(0xc9dcfa, 1.4); fill.position.set(-4, 2, 3); scene.add(fill);
    const resize = () => { const rect = root.getBoundingClientRect(); renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); }; new ResizeObserver(resize).observe(root); resize();
    const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
    canvas.addEventListener("pointerup", event => { const rect = canvas.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects([...objects.values()], true)[0]; if (hit) select(hit.object.userData.structureId || hit.object.name); });
    document.querySelectorAll("[data-organ]").forEach(button => button.addEventListener("click", () => { document.querySelectorAll("[data-organ]").forEach(item => item.classList.toggle("is-active", item === button)); load(button.dataset.organ); }));
    document.querySelector("[data-organ-reset]")?.addEventListener("click", fit); document.querySelector("[data-organ-rotate]")?.addEventListener("click", event => { rotating = !rotating; controls.autoRotate = rotating; event.currentTarget.setAttribute("aria-pressed", String(rotating)); }); document.querySelector("[data-organ-cut]")?.addEventListener("click", event => { cut = !cut; event.currentTarget.setAttribute("aria-pressed", String(cut)); objects.forEach(object => { object.material.clippingPlanes = cut ? [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)] : []; object.material.needsUpdate = true; }); renderer.localClippingEnabled = cut; });
    const animate = () => { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }; animate(); load(currentKey);
  } catch (error) { loading.classList.add("is-error"); loading.querySelector("strong").textContent = "3D indisponível"; loading.querySelector("span").textContent = "Este navegador não conseguiu iniciar o visualizador."; announce("Visualização 3D indisponível."); console.error(error); }
}

