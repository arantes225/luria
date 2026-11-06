import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { addTissueFinish } from "./anatomy-tissue-material.mjs";

const root = document.querySelector("[data-anatomy-viewer]");
if (root) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-anatomy-loading]");
  const progress = root.querySelector("[data-anatomy-progress]");
  const status = document.querySelector("[data-anatomy-status]");
  const list = document.querySelector("[data-anatomy-structures]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heartParts = [
    ["interventricular_septum", "Septo interventricular", "Câmaras e paredes", "Parede muscular que separa os ventrículos direito e esquerdo."],
    ["left_cardiac_atrium", "Átrio esquerdo", "Câmaras e paredes", "Recebe o sangue oxigenado que retorna dos pulmões."],
    ["left_ventricle", "Ventrículo esquerdo", "Câmaras e paredes", "Câmara muscular que ejeta sangue para a aorta."],
    ["right_cardiac_atrium", "Átrio direito", "Câmaras e paredes", "Recebe o retorno venoso pelas veias cavas."],
    ["right_ventricle", "Ventrículo direito", "Câmaras e paredes", "Câmara que ejeta sangue para o tronco pulmonar."],
    ["papillary_muscle_of_heart_ant", "Músculo papilar anterior", "Interior e valvas", "Músculo ventricular ligado ao aparelho de sustentação da valva atrioventricular."],
    ["papillary_muscle_of_heart_antlat", "Músculo papilar anterolateral", "Interior e valvas", "Componente do aparelho subvalvar do ventrículo esquerdo."],
    ["papillary_muscle_of_heart_med", "Músculo papilar septal", "Interior e valvas", "Músculo papilar relacionado à parede septal ventricular."],
    ["papillary_muscle_of_heart_pos", "Músculo papilar posterior", "Interior e valvas", "Componente posterior do aparelho subvalvar."],
    ["papillary_muscle_of_heart_posmed", "Músculo papilar posteromedial", "Interior e valvas", "Componente do aparelho subvalvar do ventrículo esquerdo."],
    ["aortic_valve", "Valva aórtica", "Interior e valvas", "Controla a saída do ventrículo esquerdo para a aorta."],
    ["pulmonary_valve", "Valva pulmonar", "Interior e valvas", "Controla a saída do ventrículo direito para o tronco pulmonar."],
    ["mitral_valve", "Valva mitral", "Interior e valvas", "Fica entre o átrio esquerdo e o ventrículo esquerdo."],
    ["tricuspid_valve", "Valva tricúspide", "Interior e valvas", "Fica entre o átrio direito e o ventrículo direito."],
    ["great_cardiac_vein", "Veia cardíaca magna", "Veias cardíacas", "Drena parte do miocárdio pela superfície do coração."],
    ["anterior_cardiac_vein", "Veia cardíaca anterior", "Veias cardíacas", "Drena a região anterior do coração em direção ao átrio direito."],
    ["superior_vena_cava", "Veia cava superior", "Grandes vasos", "Conduz o retorno venoso da parte superior do corpo ao átrio direito."],
    ["inferior_vena_cava_a", "Veia cava inferior · segmento superior", "Grandes vasos", "Conduz o retorno venoso da parte inferior do corpo ao átrio direito."],
    ["inferior_vena_cava_b", "Veia cava inferior · segmento inferior", "Grandes vasos", "Continuação inferior da veia cava que alcança o átrio direito."],
    ["left_anterior_descending_artery", "Artéria interventricular anterior", "Coronárias", "Ramo da coronária esquerda que percorre o sulco interventricular anterior."],
    ["left_circumflex_artery", "Artéria circunflexa", "Coronárias", "Ramo da coronária esquerda que percorre o sulco atrioventricular esquerdo."],
    ["diagonal_branch_of_left_anterior_descending_artery", "Ramo diagonal", "Coronárias", "Ramo da artéria interventricular anterior na parede do ventrículo esquerdo."],
    ["left_coronary_artery", "Artéria coronária esquerda", "Coronárias", "Nasce da raiz da aorta e se ramifica para irrigar parte do miocárdio."],
    ["left_marginal_branch", "Ramo marginal esquerdo", "Coronárias", "Ramo que segue pela margem esquerda do coração."],
    ["left_posterior_descending_branch_of_circumflex_branch_of_left_coronary_artery", "Ramo interventricular posterior esquerdo", "Coronárias", "Ramo posterior identificado na referência da coronária esquerda."],
    ["posterior_left_ventricular_branch", "Ramo ventricular posterior esquerdo", "Coronárias", "Ramo que acompanha a face posterior do ventrículo esquerdo."],
    ["right_coronary_artery", "Artéria coronária direita", "Coronárias", "Nasce da raiz da aorta e percorre o sulco atrioventricular direito."],
    ["right_marginal_artery", "Ramo marginal direito", "Coronárias", "Ramo da coronária direita que segue pela margem direita do coração."],
    ["pulmonary_artery_L", "Artéria pulmonar esquerda", "Grandes vasos", "Leva sangue do tronco pulmonar ao pulmão esquerdo."],
    ["pulmonary_trunk", "Tronco pulmonar", "Grandes vasos", "Recebe sangue do ventrículo direito e se divide nas artérias pulmonares."],
    ["pulmonary_artery_R", "Artéria pulmonar direita", "Grandes vasos", "Leva sangue do tronco pulmonar ao pulmão direito."],
    ["aortic_arch", "Arco da aorta", "Grandes vasos", "Curva entre a aorta ascendente e a descendente; dele emergem os ramos para cabeça, pescoço e membro superior."],
    ["ascending_aorta", "Aorta ascendente", "Grandes vasos", "Segmento inicial da aorta, que recebe o sangue ejetado pelo ventrículo esquerdo."],
    ["descending_aorta_a", "Aorta descendente · segmento superior", "Grandes vasos", "Continuação do arco aórtico em direção ao tórax e abdome."],
    ["descending_aorta_b", "Aorta descendente · segmento inferior", "Grandes vasos", "Continuação inferior da aorta descendente representada na referência."],
    ["left_common_carotid_artery_a", "Carótida comum esquerda · ramo proximal", "Ramos da aorta", "Ramo do arco aórtico que segue em direção ao pescoço esquerdo."],
    ["left_common_carotid_artery_b", "Carótida comum esquerda · continuação", "Ramos da aorta", "Continuação do ramo que irriga estruturas da cabeça e do pescoço."],
    ["left_subclavian_artery_a", "Subclávia esquerda · ramo proximal", "Ramos da aorta", "Ramo do arco aórtico em direção ao membro superior esquerdo."],
    ["left_subclavian_artery_b", "Subclávia esquerda · continuação", "Ramos da aorta", "Continuação da artéria subclávia esquerda."],
    ["brachiocephalic_artery_a", "Tronco braquiocefálico · segmento proximal", "Ramos da aorta", "Primeiro grande ramo do arco aórtico; origina vasos para a direita da cabeça e do membro superior."],
    ["brachiocephalic_artery_b", "Tronco braquiocefálico · continuação", "Ramos da aorta", "Continuação do tronco braquiocefálico na referência."],
  ];
  const structures = heartParts.map(([suffix, label, group, detail]) => ({ id: `VH_F_${suffix}`, label, latin: "", group, detail, flow: group === "Coronárias" ? "Aorta → miocárdio" : group === "Grandes vasos" || group === "Ramos da aorta" ? "Circulação pulmonar ou sistêmica" : "Anatomia cardíaca" }));
  const byId = new Map(structures.map(item => [item.id, item]));
  const title = document.querySelector("[data-structure-title]");
  const latin = document.querySelector("[data-structure-latin]");
  const detail = document.querySelector("[data-structure-detail]");
  const flow = document.querySelector("[data-structure-flow]");
  const card = document.createElement("section");
  card.className = "anatomy-picked-card";
  card.hidden = true;
  card.setAttribute("aria-label", "Estrutura identificada");
  card.innerHTML = '<button type="button" class="anatomy-picked-close" aria-label="Fechar informação">×</button><small>ESTRUTURA IDENTIFICADA</small><h3></h3><em></em><p></p><span></span>';
  root.append(card);
  card.querySelector("button").addEventListener("click", () => { card.hidden = true; });
  function announce(message) { if (status) status.textContent = message; }
  function select(id, fromModel = false) {
    const item = byId.get(id);
    if (!item) return;
    title.textContent = item.label;
    latin.textContent = item.latin;
    detail.textContent = item.detail;
    flow.textContent = item.flow;
    list.querySelectorAll("[data-structure-id]").forEach(button => {
      const active = button.dataset.structureId === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    card.querySelector("h3").textContent = item.label;
    card.querySelector("em").textContent = item.latin;
    card.querySelector("p").textContent = item.detail;
    card.querySelector("span").textContent = item.flow;
    card.hidden = false;
    if (quiz?.active && fromModel) quiz.answer(id);
    announce(item.label + ". " + item.detail);
  }
  let quiz = null;
  list.innerHTML = "";
  for (const group of ["Câmaras e paredes", "Interior e valvas", "Grandes vasos", "Ramos da aorta", "Coronárias", "Veias cardíacas"]) {
    const heading = document.createElement("h4");
    heading.className = "anatomy-list-group";
    heading.textContent = group;
    list.append(heading);
    for (const item of structures.filter(value => value.group === group)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "anatomy-structure-button";
      button.style.setProperty("--dot", item.color);
      button.dataset.structureId = item.id;
      button.setAttribute("aria-pressed", "false");
      const name = document.createElement("span");
      name.textContent = item.label;
      button.append(name);
      button.addEventListener("click", () => select(item.id));
      list.append(button);
    }
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.55, 8.2);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    root.classList.add("is-static");
    loading.classList.add("anatomy-static-fallback");
    loading.innerHTML = '<img src="/assets/img/anatomia/coracao-estatico.webp" alt="Coração humano"><strong>Visualização estática</strong><span>O modo 3D não está disponível neste navegador.</span>';
    announce("Visualização 3D indisponível.");
  }
  if (renderer) {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.localClippingEnabled = true;
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = !reducedMotion;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.autoRotate = false;
    scene.add(new THREE.HemisphereLight(0xffe9dd, 0x47343c, 1.15));
    const key = new THREE.DirectionalLight(0xffe2cf, 3.3);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc4d7ef, 0.8);
    fill.position.set(-5, 1, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffd2bf, 1.6);
    rim.position.set(-2, 3, -5);
    scene.add(rim);
    let organ = null;
    let interior = false;
    let flowEnabled = false;
    const meshes = new Map();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const blood = new THREE.Group();
    const ventricularCut = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.05);
    scene.add(blood);
    blood.visible = false;
    const particles = [];
    const clock = new THREE.Clock();
    function center(id) {
      const mesh = meshes.get(id);
      return mesh ? new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3()) : null;
    }
    function buildFlow() {
      blood.clear();
      particles.length = 0;
      const paths = [
        { ids: ["VH_F_superior_vena_cava", "VH_F_right_cardiac_atrium", "VH_F_right_ventricle", "VH_F_pulmonary_trunk", "VH_F_pulmonary_artery_L"], color: 0x82c8ff },
        { ids: ["VH_F_left_cardiac_atrium", "VH_F_left_ventricle", "VH_F_ascending_aorta", "VH_F_aortic_arch", "VH_F_descending_aorta_a"], color: 0xffa091 }
      ];
      for (const path of paths) {
        const points = path.ids.map(center).filter(Boolean).map(point => point.clone().add(new THREE.Vector3(0, 0, 0.1)));
        if (points.length < 2) continue;
        const curve = new THREE.CatmullRomCurve3(points);
        for (let i = 0; i < 14; i++) {
          const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 9, 7), new THREE.MeshBasicMaterial({ color: path.color }));
          dot.position.copy(curve.getPoint(i / 14));
          blood.add(dot);
          particles.push({ dot, curve, phase: i / 14 });
        }
      }
    }
    function setInterior(active) {
      interior = active;
      root.dataset.anatomyMode = active ? "interior" : "exterior";
      document.querySelector("[data-anatomy-interior]")?.setAttribute("aria-pressed", String(active));
      document.querySelector("[data-anatomy-exterior]")?.setAttribute("aria-pressed", String(!active));
      for (const [id, mesh] of meshes) {
        mesh.visible = true;
        if (/^VH_F_(left_ventricle|right_ventricle|left_cardiac_atrium|right_cardiac_atrium|interventricular_septum)$/.test(id)) {
          mesh.material.clippingPlanes = active ? [ventricularCut] : [];
          mesh.material.transparent = false;
          mesh.material.opacity = 1;
          mesh.material.depthWrite = true;
          mesh.material.needsUpdate = true;
        }
      }
      blood.visible = active && flowEnabled;
      announce(active ? "Corte didático das câmaras; valvas e músculos papilares identificáveis." : "Vista externa do coração.");
    }
    document.querySelector("[data-anatomy-interior]")?.addEventListener("click", () => setInterior(true));
    document.querySelector("[data-anatomy-exterior]")?.addEventListener("click", () => setInterior(false));
    const flowButton = document.querySelector("[data-anatomy-flow]");
    flowButton?.addEventListener("click", () => {
      flowEnabled = !flowEnabled;
      if (flowEnabled) setInterior(true);
      blood.visible = flowEnabled && interior;
      flowButton.setAttribute("aria-pressed", String(flowEnabled));
      flowButton.textContent = flowEnabled ? "Pausar fluxo" : "Mostrar fluxo";
    });
    new GLTFLoader().load("/assets/models/anatomia/coracao.glb?v=hra2", gltf => {
      try {
        organ = gltf.scene;
        const box = new THREE.Box3().setFromObject(organ);
        const size = box.getSize(new THREE.Vector3());
        const middle = box.getCenter(new THREE.Vector3());
        const scale = 3.8 / Math.max(size.x, size.y, size.z);
        organ.scale.setScalar(scale);
        organ.position.copy(middle).multiplyScalar(-scale);
        organ.updateMatrixWorld(true);
        organ.traverse(object => {
          if (!object.isMesh) return;
          const id = object.userData.structureId || object.name;
          const structure = byId.get(id);
          if (!structure) return;
          // The verified GLB already carries distinct tissue and vascular colors.
          object.material = object.material.clone();
          object.material.side = THREE.DoubleSide;
          object.material.metalness = 0;
          object.material.roughness = structure.group === "Grandes vasos" || structure.group === "Coronárias" || structure.group === "Ramos da aorta" ? .68 : .82;
          if (structure.group === "Câmaras e paredes" || id.includes("papillary_muscle")) {
            addTissueFinish(object.material, Math.max(size.x, size.y, size.z), 1.55);
          }
          object.userData.structureId = id;
          meshes.set(id, object);
        });
        const missing = structures.filter(item => !meshes.has(item.id));
        if (missing.length) throw new Error("Estruturas esperadas ausentes do modelo: " + missing.map(item => item.id).join(", "));
        scene.add(organ);
        buildFlow();
        setInterior(false);
        loading.classList.add("is-hidden");
        root.classList.add("is-ready");
        announce("Coração 3D carregado. Selecione uma estrutura no modelo ou na lista.");
      } catch (error) {
        showFailure(error);
      }
    }, event => {
      if (event.total && progress) progress.style.width = Math.min(100, event.loaded / event.total * 100) + "%";
    }, showFailure);
    function showFailure(error) {
      root.classList.add("is-static");
      loading.classList.add("anatomy-static-fallback");
      loading.innerHTML = '<img src="/assets/img/anatomia/coracao-estatico.webp" alt="Coração humano"><strong>Modelo 3D indisponível</strong><span>As estruturas continuam disponíveis na lista.</span>';
      announce("Não foi possível carregar o modelo: " + (error?.message || "erro desconhecido"));
    }
    canvas.addEventListener("click", event => {
      if (!organ) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(organ, true).filter(hit => hit.object.visible && byId.has(hit.object.userData.structureId));
      const hit = hits.find(value => !value.object.material.transparent || value.object.material.opacity >= 1) || hits[0];
      if (hit) select(hit.object.userData.structureId, true);
    });
    document.querySelector("[data-anatomy-reset]")?.addEventListener("click", () => {
      camera.position.set(0, 0.55, 8.2);
      controls.target.set(0, 0, 0);
      controls.update();
      announce("Vista inicial restaurada.");
    });
    const rotate = document.querySelector("[data-anatomy-rotate]");
    rotate?.addEventListener("click", () => {
      controls.autoRotate = !controls.autoRotate;
      rotate.classList.toggle("is-active", controls.autoRotate);
      rotate.setAttribute("aria-pressed", String(controls.autoRotate));
    });
    document.querySelector("[data-anatomy-fullscreen]")?.addEventListener("click", async () => {
      if (document.fullscreenElement) await document.exitFullscreen?.();
      else await root.requestFullscreen?.();
    });
    const quizPanel = document.querySelector("[data-anatomy-quiz]");
    const quizTarget = quizPanel?.querySelector("[data-quiz-target]");
    const quizFeedback = quizPanel?.querySelector("[data-quiz-feedback]");
    const quizScore = quizPanel?.querySelector("[data-quiz-score]");
    function nextQuestion() {
      const choices = structures.filter(item => interior || item.group !== "Interior e valvas");
      const target = choices[Math.floor(Math.random() * choices.length)];
      quiz.target = target.id;
      quizTarget.textContent = target.label;
      quizFeedback.textContent = "Clique na estrutura correspondente no modelo.";
      quizFeedback.className = "quiz-feedback";
    }
    document.querySelector("[data-quiz-start]")?.addEventListener("click", () => {
      if (!organ) return;
      quizPanel.hidden = false;
      quiz = { active: true, target: null, correct: 0, total: 0, answer(id) {
        this.total++;
        const correct = id === this.target;
        if (correct) this.correct++;
        quizScore.textContent = this.correct + "/" + this.total;
        quizFeedback.textContent = correct ? "Correto!" : "Você selecionou " + byId.get(id).label + ".";
        quizFeedback.className = "quiz-feedback " + (correct ? "is-correct" : "is-wrong");
        window.setTimeout(nextQuestion, correct ? 900 : 1500);
      }};
      controls.autoRotate = false;
      nextQuestion();
    });
    function resize() {
      const width = Math.max(1, root.clientWidth);
      const height = Math.max(1, root.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(root);
    resize();
    function render() {
      controls.update();
      if (blood.visible && !reducedMotion) {
        const elapsed = clock.getElapsedTime();
        for (const particle of particles) particle.dot.position.copy(particle.curve.getPoint((elapsed * 0.15 + particle.phase) % 1));
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }
  select("ascending-aorta");
  card.hidden = true;
}

