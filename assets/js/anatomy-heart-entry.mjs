import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const root = document.querySelector("[data-anatomy-viewer]");
if (root) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-anatomy-loading]");
  const progress = root.querySelector("[data-anatomy-progress]");
  const status = document.querySelector("[data-anatomy-status]");
  const list = document.querySelector("[data-anatomy-structures]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const structures = [
    { id: "right-atrium", label: "Parede do átrio direito", latin: "Paries atrii dextri", color: "#a96d70", group: "Câmaras e paredes", detail: "Parede da câmara que recebe o sangue venoso do corpo. A cavidade atrial não está representada separadamente neste modelo.", flow: "Corpo → átrio direito" },
    { id: "left-atrium", label: "Parede do átrio esquerdo", latin: "Paries atrii sinistri", color: "#b77c76", group: "Câmaras e paredes", detail: "Parede da câmara que recebe o sangue oxigenado dos pulmões. Observe-a melhor pela face posterior.", flow: "Pulmões → átrio esquerdo" },
    { id: "ventricular-wall", label: "Parede ventricular", latin: "Paries ventriculi", color: "#ab6159", group: "Câmaras e paredes", detail: "Parede muscular combinada dos ventrículos. O conjunto de dados não separa as paredes direita e esquerda; o modo interior a torna translúcida.", flow: "Contração ventricular → ejeção" },
    { id: "right-ventricle", label: "Cavidade do ventrículo direito", latin: "Cavitas ventriculi dextri", color: "#668db7", group: "Cavidades", detail: "Superfície que representa o espaço dentro do ventrículo direito, e não seu tecido muscular. O ventrículo envia sangue ao tronco pulmonar.", flow: "Ventrículo direito → pulmões" },
    { id: "left-ventricle", label: "Cavidade do ventrículo esquerdo", latin: "Cavitas ventriculi sinistri", color: "#d28b72", group: "Cavidades", detail: "Superfície que representa o espaço dentro do ventrículo esquerdo, e não sua parede. O ventrículo envia sangue à aorta.", flow: "Ventrículo esquerdo → aorta" },
    { id: "ascending-aorta", label: "Aorta ascendente", latin: "Aorta ascendens", color: "#c37f6a", group: "Grandes vasos", detail: "Segmento inicial da aorta que recebe sangue do ventrículo esquerdo. Os ramos do arco não estão incluídos.", flow: "Ventrículo esquerdo → circulação sistêmica" },
    { id: "aortic-arch", label: "Arco da aorta", latin: "Arcus aortae", color: "#ca8d78", group: "Grandes vasos", detail: "Curvatura da aorta após o segmento ascendente. Seus ramos e a aorta descendente foram omitidos desta seleção.", flow: "Aorta ascendente → corpo" },
    { id: "pulmonary-trunk", label: "Tronco pulmonar", latin: "Truncus pulmonalis", color: "#789aab", group: "Grandes vasos", detail: "Recebe sangue do ventrículo direito e segue em direção às artérias pulmonares. As árvores arteriais pulmonares não integram o modelo.", flow: "Ventrículo direito → pulmões" },
    { id: "superior-vena-cava", label: "Veia cava superior", latin: "Vena cava superior", color: "#8c9fab", group: "Grandes vasos", detail: "Retorna ao átrio direito o sangue venoso da parte superior do corpo. A veia cava inferior não está incluída.", flow: "Corpo → átrio direito" },
    { id: "left-coronary", label: "Árvore coronária esquerda", latin: "Arteria coronaria sinistra", color: "#dfb58a", group: "Coronárias", detail: "Conjunto de ramos mapeados à coronária esquerda, que irrigam parte do miocárdio. Ramos finos estão simplificados.", flow: "Aorta → miocárdio" },
    { id: "right-coronary", label: "Árvore coronária direita", latin: "Arteria coronaria dextra", color: "#d4a777", group: "Coronárias", detail: "Conjunto de ramos mapeados à coronária direita. A seleção corresponde à árvore do atlas, não a cada ramo individual.", flow: "Aorta → miocárdio" }
  ];
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
  for (const group of ["Câmaras e paredes", "Cavidades", "Grandes vasos", "Coronárias"]) {
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
    // Subtle tissue variation is generated in object space, so the atlas geometry
    // and its anatomical IDs remain untouched and selection still follows the mesh.
    function tissueMaterial(color, vessel) {
      const material = new THREE.MeshPhysicalMaterial({
        color, roughness: vessel ? 0.66 : 0.83, metalness: 0,
        clearcoat: vessel ? 0.18 : 0.08, clearcoatRoughness: 0.72,
        side: THREE.DoubleSide
      });
      material.onBeforeCompile = shader => {
        shader.vertexShader = shader.vertexShader.replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vTissuePosition;'
        ).replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvTissuePosition = position;'
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <common>',
          `#include <common>
          varying vec3 vTissuePosition;
          float tissueHash(vec3 p) {
            p = fract(p * 0.1031);
            p += dot(p, p.yxz + 33.33);
            return fract((p.x + p.y) * p.z);
          }
          float tissueNoise(vec3 p) {
            vec3 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(mix(tissueHash(i), tissueHash(i + vec3(1,0,0)), f.x),
                           mix(tissueHash(i + vec3(0,1,0)), tissueHash(i + vec3(1,1,0)), f.x), f.y),
                       mix(mix(tissueHash(i + vec3(0,0,1)), tissueHash(i + vec3(1,0,1)), f.x),
                           mix(tissueHash(i + vec3(0,1,1)), tissueHash(i + vec3(1,1,1)), f.x), f.y), f.z);
          }`
        ).replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          float tissueBroad = tissueNoise(vTissuePosition * 9.0);
          float tissueFine = tissueNoise(vTissuePosition * 47.0);
          float tissueGrain = 0.78 + 0.31 * tissueBroad + 0.11 * tissueFine;
          diffuseColor.rgb *= tissueGrain;`
        );
      };
      material.customProgramCacheKey = () => 'anatomy-tissue-v1';
      return material;
    }
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
        { ids: ["superior-vena-cava", "right-atrium", "right-ventricle", "pulmonary-trunk"], color: 0x82c8ff },
        { ids: ["left-atrium", "left-ventricle", "ascending-aorta", "aortic-arch"], color: 0xffa091 }
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
        mesh.visible = active || (id !== "right-ventricle" && id !== "left-ventricle");
        if (id === "ventricular-wall") {
          mesh.material.clippingPlanes = active ? [ventricularCut] : [];
          mesh.material.transparent = false;
          mesh.material.opacity = 1;
          mesh.material.depthWrite = true;
          mesh.material.needsUpdate = true;
        }
      }
      blood.visible = active && flowEnabled;
      announce(active ? "Cavidades ventriculares expostas por um corte didático da parede." : "Vista externa do coração.");
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
    new GLTFLoader().load("/assets/models/anatomia/coracao.glb", gltf => {
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
          object.material.roughness = structure.group === "Grandes vasos" || structure.group === "Coronárias" ? .62 : .79;
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
      const choices = structures.filter(item => interior || !["right-ventricle", "left-ventricle"].includes(item.id));
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


