import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const root = document.querySelector("[data-anatomy-viewer]");

if (root) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-anatomy-loading]");
  const progress = root.querySelector("[data-anatomy-progress]");
  const status = document.querySelector("[data-anatomy-status]");
  const structureTitle = document.querySelector("[data-structure-title]");
  const structureLatin = document.querySelector("[data-structure-latin]");
  const structureDetail = document.querySelector("[data-structure-detail]");
  const structureFlow = document.querySelector("[data-structure-flow]");
  const structureButtons = [...document.querySelectorAll("[data-structure-id]")];
  const hotspotLayer = root.querySelector("[data-hotspot-layer]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const structures = [
    { id: "aorta", label: "Aorta", latin: "Aorta", detail: "Maior artéria do corpo. Recebe o sangue ejetado pelo ventrículo esquerdo e o distribui para a circulação sistêmica.", flow: "Sangue oxigenado → corpo", point: [-0.35, 1.65, 0.55], color: "#ef6b62" },
    { id: "left-atrium", label: "Átrio esquerdo", latin: "Atrium sinistrum", detail: "Câmara que recebe o sangue oxigenado proveniente das veias pulmonares e o direciona ao ventrículo esquerdo.", flow: "Pulmões → ventrículo esquerdo", point: [0.82, 0.65, 0.5], color: "#f2a33b" },
    { id: "right-atrium", label: "Átrio direito", latin: "Atrium dextrum", detail: "Recebe o sangue venoso pelas veias cavas e pelo seio coronário antes de enviá-lo ao ventrículo direito.", flow: "Corpo → ventrículo direito", point: [-0.9, 0.35, 0.55], color: "#6393d8" },
    { id: "left-ventricle", label: "Ventrículo esquerdo", latin: "Ventriculus sinister", detail: "Câmara de parede espessa que gera a pressão necessária para impulsionar o sangue por toda a circulação sistêmica.", flow: "Coração → aorta → corpo", point: [0.7, -0.75, 0.65], color: "#f2a33b" },
    { id: "right-ventricle", label: "Ventrículo direito", latin: "Ventriculus dexter", detail: "Bombeia o sangue venoso através do tronco pulmonar em direção aos pulmões para realizar a hematose.", flow: "Coração → pulmões", point: [-0.65, -0.68, 0.66], color: "#ef6b62" },
    { id: "mitral", label: "Valva mitral", latin: "Valva atrioventricularis sinistra", detail: "Valva bicúspide entre o átrio e o ventrículo esquerdos. Evita o refluxo durante a sístole ventricular.", flow: "Fluxo unidirecional no coração esquerdo", point: [0.18, -1.35, 0.48], color: "#d98fc0" },

    { id: "pulmonary-trunk", label: "Tronco pulmonar", latin: "Truncus pulmonalis", detail: "Sai do ventrículo direito e se divide nas artérias pulmonares, levando sangue aos pulmões.", flow: "Ventrículo direito → pulmões", point: [-0.55, 1.22, 0.58], color: "#4f8fd4" },
    { id: "vena-cava", label: "Veia cava superior", latin: "Vena cava superior", detail: "Traz ao átrio direito o sangue venoso da cabeça, do pescoço, dos membros superiores e do tórax.", flow: "Corpo → átrio direito", point: [-1.02, 1.08, 0.42], color: "#547bc5" },
    { id: "pulmonary-veins", label: "Veias pulmonares", latin: "Venae pulmonales", detail: "Devolvem ao átrio esquerdo o sangue oxigenado nos pulmões.", flow: "Pulmões → átrio esquerdo", point: [1.08, 0.9, 0.36], color: "#e47a75" },
    { id: "coronary", label: "Artérias coronárias", latin: "Arteriae coronariae", detail: "Ramificações da aorta que irrigam o músculo cardíaco. O trajeto destacado neste modelo é apenas uma referência visual.", flow: "Aorta → miocárdio", point: [0.12, 0.05, 0.83], color: "#f5a85f" },
    { id: "tricuspid", label: "Valva tricúspide", latin: "Valva atrioventricularis dextra", detail: "Entre o átrio e o ventrículo direitos, limita o refluxo de sangue durante a contração ventricular.", flow: "Átrio direito → ventrículo direito", point: [-0.65, -0.18, 0.52], color: "#9f9ce5" },
    { id: "aortic-valve", label: "Valva aórtica", latin: "Valva aortae", detail: "Na saída do ventrículo esquerdo para a aorta, impede o retorno do sangue ao ventrículo.", flow: "Ventrículo esquerdo → aorta", point: [-0.18, 1.18, 0.55], color: "#eab363" },
    { id: "myocardium", label: "Miocárdio", latin: "Myocardium", detail: "Camada muscular do coração que se contrai para impulsionar o sangue. A superfície externa exibida é um modelo anatômico.", flow: "Contração → ejeção", point: [0.18, -0.8, 0.7], color: "#b94d59" },
  ];

  function updateInfo(structure) {
    structureTitle.textContent = structure.label;
    structureLatin.textContent = structure.latin;
    structureDetail.textContent = structure.detail;
    structureFlow.textContent = structure.flow;
    structureButtons.forEach(button => {
      const active = button.dataset.structureId === structure.id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }


  const detailCard = document.createElement("section");
  detailCard.className = "anatomy-picked-card";
  detailCard.hidden = true;
  detailCard.setAttribute("aria-label", "Estrutura identificada");
  detailCard.innerHTML = '<button type="button" class="anatomy-picked-close" aria-label="Fechar informação">×</button><small>ESTRUTURA IDENTIFICADA</small><h3></h3><em></em><p></p><span></span>';
  root.append(detailCard);
  detailCard.querySelector("button").addEventListener("click", () => { detailCard.hidden = true; });
  function showDetailCard(structure) {
    detailCard.querySelector("h3").textContent = structure.label;
    detailCard.querySelector("em").textContent = structure.latin;
    detailCard.querySelector("p").textContent = structure.detail;
    detailCard.querySelector("span").textContent = structure.flow;
    detailCard.hidden = false;
  }

  viewerInit: {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.85, 7.6);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    loading.classList.add("anatomy-static-fallback");
    loading.innerHTML = `<img src="/assets/img/anatomia/coracao-estatico.webp" alt="Vista anatômica externa do coração humano"><strong>Visualização estática</strong><span>Seu navegador não disponibilizou o modo 3D. As estruturas e o conteúdo continuam acessíveis ao lado.</span>`;
    root.classList.add("is-static");
    if (status) status.textContent = "O modo tridimensional não está disponível neste navegador. Uma imagem estática do coração foi exibida.";
    structureButtons.forEach(button => button.addEventListener("click", () => {
      const structure = structures.find(item => item.id === button.dataset.structureId);
      if (structure) updateInfo(structure);
    }));
    const fallbackQuiz = document.querySelector("[data-quiz-start]");
    if (fallbackQuiz) {
      fallbackQuiz.disabled = true;
      fallbackQuiz.textContent = "Quiz disponível no modo 3D";
    }
    break viewerInit;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 760 ? 1.4 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.03;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 4.4;
  controls.maxDistance = 11;
  controls.target.set(0, 0, 0);
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.7;

  scene.add(new THREE.HemisphereLight(0xfff6ed, 0x251a26, 2.15));
  const key = new THREE.DirectionalLight(0xffefe2, 4.2);
  key.position.set(4.5, 6, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xb9d4ff, 2.1);
  fill.position.set(-5, 1.5, 5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xff7f6e, 2.4);
  rim.position.set(-4, 3, -4);
  scene.add(rim);

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(2.05, 2.18, 0.22, 64),
    new THREE.MeshStandardMaterial({ color: 0xdce7f5, roughness: 0.74, metalness: 0.04 })
  );
  pedestal.position.y = -2.42;
  scene.add(pedestal);

  let organ = null;
  let selected = structures[0];
  let labelsVisible = true;
  let quiz = null;
  const markers = new Map();
  const vector = new THREE.Vector3();

  for (const structure of structures) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "anatomy-hotspot";
    button.dataset.hotspotId = structure.id;
    button.style.setProperty("--hotspot", structure.color);
    button.innerHTML = `<span class="anatomy-hotspot-dot" aria-hidden="true"></span><span class="anatomy-hotspot-label">${structure.label}</span>`;
    button.setAttribute("aria-label", `Ver ${structure.label}`);
    button.addEventListener("click", () => selectStructure(structure.id, true));
    hotspotLayer.append(button);
    markers.set(structure.id, button);
  }

  function announce(message) {
    if (status) status.textContent = message;
  }

  function selectStructure(id, fromModel = false) {
    const structure = structures.find(item => item.id === id);
    if (!structure) return;
    selected = structure;
    updateInfo(structure);
    showDetailCard(structure);
    markers.forEach((button, key) => button.classList.toggle("is-active", key === id));

    if (quiz?.active && fromModel) {
      const correct = quiz.target === id;
      quiz.answer(id, correct);
      return;
    }
    announce(`${structure.label}. ${structure.detail}`);
  }

  structureButtons.forEach(button => button.addEventListener("click", () => selectStructure(button.dataset.structureId)));

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    "/assets/models/anatomia/coracao.glb",
    gltf => {
      organ = gltf.scene;
      const box = new THREE.Box3().setFromObject(organ);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 4.25 / Math.max(size.x, size.y, size.z);
      organ.position.sub(center);
      organ.scale.setScalar(scale * 0.82);
      organ.rotation.y = -0.08;
      organ.traverse(child => {
        if (!child.isMesh) return;
        const tint = material => {
          const copy = material.clone();
          copy.color.set("#b95b64");
          copy.roughness = 0.9;
          copy.metalness = 0;
          return copy;
        };
        child.material = Array.isArray(child.material) ? child.material.map(tint) : tint(child.material);
      });
      scene.add(organ);
      loading.classList.add("is-hidden");
      root.classList.add("is-ready");
      announce("Modelo tridimensional do coração carregado. Arraste para girar e use a roda do mouse para aproximar.");
    },
    event => {
      if (event.total && progress) progress.style.width = `${Math.min(100, event.loaded / event.total * 100)}%`;
    },
    () => {
      loading.querySelector("strong").textContent = "Não foi possível carregar o modelo";
      loading.querySelector("span").textContent = "Tente atualizar a página.";
      announce("Falha ao carregar o modelo tridimensional do coração.");
    }
  );


  const interior = new THREE.Group();
  interior.visible = false;
  scene.add(interior);
  const internalTargets = [];
  const internalMaterial = (color, opacity = 1) => new THREE.MeshStandardMaterial({
    color, roughness: 0.66, metalness: 0, transparent: opacity < 1, opacity,
    side: THREE.DoubleSide, depthWrite: opacity === 1
  });
  function addChamber(id, x, y, z, sx, sy, sz, color) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 22), internalMaterial(color, 0.86));
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.userData.structureId = id;
    interior.add(mesh);
    internalTargets.push(mesh);
  }
  function addVessel(id, points, radius, color) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, radius, 12, false), internalMaterial(color));
    mesh.userData.structureId = id;
    interior.add(mesh);
    internalTargets.push(mesh);
    return curve;
  }
  addChamber("right-atrium", -0.75, 0.7, 0, 0.48, 0.52, 0.34, "#467ac5");
  addChamber("right-ventricle", -0.62, -0.72, 0, 0.6, 0.78, 0.37, "#2764a7");
  addChamber("left-atrium", 0.72, 0.7, 0, 0.48, 0.52, 0.34, "#de7979");
  addChamber("left-ventricle", 0.63, -0.72, 0, 0.63, 0.8, 0.39, "#b7374c");
  const septum = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.25, 0.38), internalMaterial("#d89a91"));
  septum.position.set(0, -0.13, -0.15);
  interior.add(septum);
  addVessel("vena-cava", [[-0.85, 2.05, 0], [-0.85, 1.25, 0], [-0.75, 0.77, 0]], 0.18, "#4d80c9");
  addVessel("pulmonary-trunk", [[-0.62, -0.55, 0], [-0.65, 0.35, 0.1], [-0.42, 1.47, 0.12], [-0.82, 1.94, 0.12]], 0.17, "#478ac9");
  addVessel("pulmonary-veins", [[1.75, 0.98, 0], [1.13, 0.82, 0], [0.74, 0.7, 0]], 0.13, "#d96b70");
  addVessel("aorta", [[0.62, -0.5, 0], [0.5, 0.45, 0.15], [0.31, 1.67, 0.15], [0.8, 2.12, 0.1]], 0.18, "#c94253");
  function addValve(id, x, y, color) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.045, 10, 32), internalMaterial(color));
    mesh.position.set(x, y, 0.39);
    mesh.userData.structureId = id;
    interior.add(mesh);
    internalTargets.push(mesh);
  }
  addValve("tricuspid", -0.66, 0.12, "#c4b3ec");
  addValve("mitral", 0.65, 0.12, "#f6baad");
  addValve("aortic-valve", 0.52, 0.5, "#f5bf79");

  const flowGroup = new THREE.Group();
  interior.add(flowGroup);
  const flows = [
    { color: "#7ec2ff", points: [[-0.85, 1.95, 0.48], [-0.75, 0.72, 0.48], [-0.65, 0.05, 0.48], [-0.62, -0.74, 0.48], [-0.48, 0.56, 0.48], [-0.78, 1.8, 0.48]] },
    { color: "#ff9b8e", points: [[1.65, 0.95, 0.48], [0.72, 0.7, 0.48], [0.64, 0.05, 0.48], [0.62, -0.8, 0.48], [0.48, 0.65, 0.48], [0.78, 2.05, 0.48]] }
  ];
  const movingBlood = flows.flatMap((flow, lane) => {
    const curve = new THREE.CatmullRomCurve3(flow.points.map(p => new THREE.Vector3(...p)));
    return Array.from({ length: 12 }, (_, index) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8),
        new THREE.MeshBasicMaterial({ color: flow.color }));
      flowGroup.add(dot);
      return { dot, curve, phase: (index / 12 + lane * 0.06) % 1 };
    });
  });
  let interiorMode = false;
  let flowEnabled = false;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clock = new THREE.Clock();

  function setInterior(active) {
    interiorMode = active;
    if (organ) organ.visible = !active;
    interior.visible = active;
    flowGroup.visible = active && flowEnabled;
    root.dataset.anatomyMode = active ? "interior" : "exterior";
    document.querySelector("[data-anatomy-interior]")?.setAttribute("aria-pressed", String(active));
    document.querySelector("[data-anatomy-exterior]")?.setAttribute("aria-pressed", String(!active));
    document.querySelector("[data-hotspot-layer]").hidden = active;
    announce(active ? "Corte esquemático do coração. Clique nas câmaras, valvas ou vasos." : "Vista externa do coração.");
  }
  document.querySelector("[data-anatomy-interior]")?.addEventListener("click", () => setInterior(true));
  document.querySelector("[data-anatomy-exterior]")?.addEventListener("click", () => setInterior(false));
  const flowButton = document.querySelector("[data-anatomy-flow]");
  flowButton?.addEventListener("click", () => {
    flowEnabled = !flowEnabled;
    if (flowEnabled) setInterior(true);
    flowGroup.visible = flowEnabled && interiorMode;
    flowButton.setAttribute("aria-pressed", String(flowEnabled));
    flowButton.textContent = flowEnabled ? "Pausar fluxo" : "Mostrar fluxo";
  });
  canvas.addEventListener("click", event => {
    if (!organ) return;
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    if (interiorMode) {
      const hit = raycaster.intersectObjects(internalTargets, false)[0];
      if (hit?.object.userData.structureId) selectStructure(hit.object.userData.structureId, true);
      return;
    }
    const hit = raycaster.intersectObject(organ, true)[0];
    if (!hit) return;
    organ.updateMatrixWorld(true);
    const nearby = structures.filter(item => ["aorta", "pulmonary-trunk", "vena-cava", "pulmonary-veins", "coronary"].includes(item.id))
      .map(item => ({ item, distance: hit.point.distanceTo(new THREE.Vector3(...item.point).applyMatrix4(organ.matrixWorld)) }))
      .sort((a, b) => a.distance - b.distance)[0];
    selectStructure(nearby && nearby.distance < 0.72 ? nearby.item.id : "myocardium", true);
  });

  function resize() {
    const rect = root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(root);
  resize();

  function updateMarkers() {
    if (!organ || interiorMode) return;
    const width = root.clientWidth;
    const height = root.clientHeight;
    for (const structure of structures) {
      vector.set(...structure.point).applyMatrix4(organ.matrixWorld).project(camera);
      const marker = markers.get(structure.id);
      marker.style.transform = `translate3d(${(vector.x * .5 + .5) * width}px, ${(-vector.y * .5 + .5) * height}px, 0)`;
      marker.hidden = !labelsVisible || vector.z > 1;
    }
  }

  function render() {
    const elapsed = clock.getElapsedTime();
    if (flowEnabled && interiorMode) movingBlood.forEach(({ dot, curve, phase }) => {
      dot.position.copy(curve.getPoint((elapsed * 0.16 + phase) % 1));
    });
    controls.update();
    renderer.render(scene, camera);
    updateMarkers();
    requestAnimationFrame(render);
  }
  render();

  document.querySelector("[data-anatomy-reset]")?.addEventListener("click", () => {
    camera.position.set(0, 0.85, 7.6);
    controls.target.set(0, 0, 0);
    controls.update();
    announce("Visualização inicial restaurada.");
  });

  const rotateButton = document.querySelector("[data-anatomy-rotate]");
  rotateButton?.addEventListener("click", () => {
    controls.autoRotate = !controls.autoRotate;
    rotateButton.classList.toggle("is-active", controls.autoRotate);
    rotateButton.setAttribute("aria-pressed", String(controls.autoRotate));
    announce(controls.autoRotate ? "Rotação automática ativada." : "Rotação automática pausada.");
  });
  rotateButton?.classList.toggle("is-active", controls.autoRotate);
  rotateButton?.setAttribute("aria-pressed", String(controls.autoRotate));

  const labelsButton = document.querySelector("[data-anatomy-labels]");
  labelsButton?.addEventListener("click", () => {
    labelsVisible = !labelsVisible;
    labelsButton.classList.toggle("is-active", labelsVisible);
    labelsButton.setAttribute("aria-pressed", String(labelsVisible));
    announce(labelsVisible ? "Identificações visíveis." : "Identificações ocultas.");
  });
  labelsButton?.classList.add("is-active");

  document.querySelector("[data-anatomy-fullscreen]")?.addEventListener("click", async () => {
    if (!document.fullscreenElement) await root.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });

  const quizPanel = document.querySelector("[data-anatomy-quiz]");
  const quizTarget = quizPanel?.querySelector("[data-quiz-target]");
  const quizFeedback = quizPanel?.querySelector("[data-quiz-feedback]");
  const quizScore = quizPanel?.querySelector("[data-quiz-score]");
  const quizStart = document.querySelector("[data-quiz-start]");

  function nextQuestion() {
    const choices = structures.filter(item => item.id !== quiz?.target);
    const target = choices[Math.floor(Math.random() * choices.length)];
    quiz.target = target.id;
    quizTarget.textContent = target.label;
    quizFeedback.textContent = "Toque no ponto correspondente no modelo.";
    quizFeedback.className = "quiz-feedback";
  }

  quizStart?.addEventListener("click", () => {
    quizPanel.hidden = false;
    labelsVisible = true;
    quiz = {
      active: true,
      target: null,
      correct: 0,
      total: 0,
      answer(id, correct) {
        this.total += 1;
        if (correct) this.correct += 1;
        quizScore.textContent = `${this.correct}/${this.total}`;
        quizFeedback.textContent = correct ? "Correto! Próxima estrutura…" : `Quase. Você marcou ${structures.find(item => item.id === id)?.label}.`;
        quizFeedback.className = `quiz-feedback ${correct ? "is-correct" : "is-wrong"}`;
        window.setTimeout(nextQuestion, correct ? 850 : 1500);
      }
    };
    controls.autoRotate = false;
    quizStart.textContent = "Reiniciar quiz";
    quizScore.textContent = "0/0";
    nextQuestion();
    quizPanel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
  });

  selectStructure("aorta");
  }
}
