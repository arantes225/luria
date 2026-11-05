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
      organ.scale.setScalar(scale);
      organ.rotation.y = -0.08;
      organ.traverse(child => {
        if (!child.isMesh) return;
        child.material = child.material.clone();
        child.material.roughness = Math.min(0.72, child.material.roughness ?? 0.62);
        child.material.metalness = 0;
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
    if (!organ) return;
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
