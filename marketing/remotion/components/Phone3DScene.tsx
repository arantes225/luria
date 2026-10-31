import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

function drawStatusBar(ctx: CanvasRenderingContext2D, width: number, h: number) {
  ctx.save();
  // 0. Status bar background in deep institutional blue #184888 matching the TRAUBE topbar
  ctx.fillStyle = '#184888';
  ctx.fillRect(0, 0, width, h);

  const centerY = h * 0.65; // ~71px from top

  // 1. Time (Left side) - Authentic Apple iOS style "10:56"
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('10:56', 64, centerY);

  // 2. Cellular Signal (Right side: 4 vertical bars)
  const sigX = 672;
  const sigY = centerY - 11;
  const barW = 5;
  const barGap = 3.5;
  const barH = [7, 12, 17, 22];
  ctx.fillStyle = '#ffffff';
  barH.forEach((bh, i) => {
    ctx.beginPath();
    ctx.roundRect(sigX + i * (barW + barGap), sigY + (22 - bh), barW, bh, 1.5);
    ctx.fill();
  });

  // 3. Wi-Fi Icon (3 concentric arcs + dot)
  const wifiX = 724;
  const wifiY = centerY;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  [15, 10, 5].forEach(r => {
    ctx.beginPath();
    ctx.arc(wifiX, wifiY + 9, r, -Math.PI * 0.75, -Math.PI * 0.25);
    ctx.stroke();
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(wifiX, wifiY + 9, 2.4, 0, Math.PI * 2);
  ctx.fill();

  // 4. Battery Indicator (Pill border, terminal cap, fill + "11" inside)
  const batX = 760;
  const batY = centerY - 11;
  const batW = 46;
  const batH = 22;

  // Outer border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(batX, batY, batW, batH, 6);
  ctx.stroke();

  // Terminal cap
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.roundRect(batX + batW + 1.5, batY + 6.5, 3.5, 9, [0, 2, 2, 0]);
  ctx.fill();

  // Battery bar level + percentage
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(batX + 3.5, batY + 3.5, 12, batH - 7, 3);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('11', batX + batW / 2 + 4, centerY + 0.5);

  ctx.restore();
}

function drawBottomNavBar(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  barH: number,
  activeTab: 'inicio' | 'estudar' = 'inicio'
) {
  ctx.save();
  const y = height - barH;

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, y, width, barH);

  // Border top
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();

  const tabCount = 4;
  const tabW = width / tabCount;
  const tabCenterY = y + 36;

  // 1. Início
  const tab1X = tabW * 0.5;
  if (activeTab === 'inicio') {
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.roundRect(tab1X - 44, tabCenterY - 20, 88, 40, 20);
    ctx.fill();

    ctx.strokeStyle = '#184888';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(tab1X - 12, tabCenterY + 5);
    ctx.lineTo(tab1X - 12, tabCenterY - 4);
    ctx.lineTo(tab1X, tabCenterY - 14);
    ctx.lineTo(tab1X + 12, tabCenterY - 4);
    ctx.lineTo(tab1X + 12, tabCenterY + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#184888';
    ctx.font = '700 17px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Início', tab1X, y + 68);
  } else {
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(tab1X - 12, tabCenterY + 5);
    ctx.lineTo(tab1X - 12, tabCenterY - 4);
    ctx.lineTo(tab1X, tabCenterY - 14);
    ctx.lineTo(tab1X + 12, tabCenterY - 4);
    ctx.lineTo(tab1X + 12, tabCenterY + 5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '500 17px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Início', tab1X, y + 68);
  }

  // 2. Estudar
  const tab2X = tabW * 1.5;
  if (activeTab === 'estudar') {
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.roundRect(tab2X - 44, tabCenterY - 20, 88, 40, 20);
    ctx.fill();

    ctx.strokeStyle = '#184888';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(tab2X - 7, tabCenterY - 3, 9, 0, Math.PI);
    ctx.arc(tab2X + 7, tabCenterY - 3, 9, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#184888';
    ctx.font = '700 17px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Estudar', tab2X, y + 68);
  } else {
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(tab2X - 7, tabCenterY - 3, 9, 0, Math.PI);
    ctx.arc(tab2X + 7, tabCenterY - 3, 9, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '500 17px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Estudar', tab2X, y + 68);
  }

  // 3. Revisar
  const tab3X = tabW * 2.5;
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(tab3X, tabCenterY - 4, 10, -Math.PI * 0.2, Math.PI * 1.4);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '500 17px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Revisar', tab3X, y + 68);

  // 4. Mais
  const tab4X = tabW * 3.5;
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.6;
  ctx.lineCap = 'round';
  [-8, -2, 4].forEach(off => {
    ctx.beginPath();
    ctx.moveTo(tab4X - 11, tabCenterY + off);
    ctx.lineTo(tab4X + 11, tabCenterY + off);
    ctx.stroke();
  });

  ctx.fillStyle = '#64748b';
  ctx.font = '500 17px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Mais', tab4X, y + 68);

  // iOS Home Indicator
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 130, height - 16, 260, 6, 3);
  ctx.fill();

  ctx.restore();
}

export const Phone3DScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    phoneGroup: THREE.Group;
    screenTexture: THREE.CanvasTexture;
    screenCanvas: HTMLCanvasElement;
    screenCtx: CanvasRenderingContext2D;
    // Images
    imgDashContent: HTMLImageElement;
    imgDashFrame: HTMLImageElement;
    imgDrawer: HTMLImageElement;
    imgAprenderViewport: HTMLImageElement;
    // Cards
    cardStudyMesh: THREE.Mesh;
    cardStudyShadow: THREE.Mesh;
    cardAgendaMesh: THREE.Mesh;
    cardAgendaShadow: THREE.Mesh;
    cardApostilasMesh: THREE.Mesh;
    cardApostilasShadow: THREE.Mesh;
    cardAnotacoesMesh: THREE.Mesh;
    cardAnotacoesShadow: THREE.Mesh;
    cardTraubezapMesh: THREE.Mesh;
    cardTraubezapShadow: THREE.Mesh;
    // Lights
    sheenLight: THREE.PointLight;
    screenLight: THREE.PointLight;
  } | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [handle] = useState(() => delayRender('Initializing Authentic iPhone 15 Pro & Textures'));

  useEffect(() => {
    let active = true;
    if (!canvasRef.current) return;

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadTexture = async (src: string): Promise<THREE.Texture> => {
      const img = await loadImage(src);
      const texture = new THREE.Texture(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      return texture;
    };

    const init = async () => {
      try {
        const [
          imgDashContent,
          imgDashFrame,
          imgDrawer,
          imgAprenderViewport,
          texCardStudy,
          texCardAgenda,
          texCardApostilas,
          texCardAnotacoes,
          texCardTraubezap,
          texShadow
        ] = await Promise.all([
          loadImage(staticFile('commercial/dashboard-content.png')),
          loadImage(staticFile('commercial/dashboard-frame.png')),
          loadImage(staticFile('commercial/dashboard-drawer.png')),
          loadImage(staticFile('commercial/aprender-viewport.png')),
          loadTexture(staticFile('commercial/cards/dash-study-now.png')),
          loadTexture(staticFile('commercial/cards/dash-agenda.png')),
          loadTexture(staticFile('commercial/cards/aprender-apostilas.png')),
          loadTexture(staticFile('commercial/cards/aprender-anotacoes.png')),
          loadTexture(staticFile('commercial/cards/aprender-traubezap.png')),
          loadTexture(staticFile('commercial/cards/card-shadow.png'))
        ]);

        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 0, 24);

        // STUDIO LIGHTS (PBR Lighting for Titanium Frame & Sapphire Glass)
        scene.add(new THREE.AmbientLight(0x0e1c32, 1.1));

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
        keyLight.position.set(6, 9, 8);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
        fillLight.position.set(-7, -5, 6);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0x184888, 4.8);
        rimLight.position.set(0, 0, -8);
        scene.add(rimLight);

        const sheenLight = new THREE.PointLight(0xe0f2fe, 0, 15);
        sheenLight.position.set(0, 0, 4);
        scene.add(sheenLight);

        const screenLight = new THREE.PointLight(0x38bdf8, 0, 10);
        screenLight.position.set(0, 0, 2);
        scene.add(screenLight);

        // 3D PHONE GROUP
        const phoneGroup = new THREE.Group();
        scene.add(phoneGroup);

        // LOAD AUTHENTIC APPLE IPHONE 15 PRO MAX 3D MODEL (GLB + Draco)
        const draco = new DRACOLoader();
        draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(draco);

        const gltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(staticFile('models/scene.glb'), resolve, undefined, reject);
        });

        const iphoneModel = gltf.scene;

        // Auto-scale & center model to 16.0 units height
        const modelBox = new THREE.Box3().setFromObject(iphoneModel);
        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        const modelSize = modelBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const targetScale = 16.0 / maxDim;
        iphoneModel.scale.setScalar(targetScale);
        iphoneModel.position.sub(modelCenter.clone().multiplyScalar(targetScale));

        // Rotate model by Math.PI so front screen faces local +Z in phoneGroup
        iphoneModel.rotation.y = Math.PI;
        phoneGroup.add(iphoneModel);

        // OLED SCREEN CANVAS & DYNAMIC TEXTURE
        const screenCanvas = document.createElement('canvas');
        screenCanvas.width = 860;
        screenCanvas.height = 1864;
        const screenCtx = screenCanvas.getContext('2d', { alpha: true });
        if (!screenCtx) throw new Error('Could not get 2D canvas context');

        const screenTexture = new THREE.CanvasTexture(screenCanvas);
        screenTexture.colorSpace = THREE.SRGBColorSpace;
        screenTexture.wrapS = THREE.RepeatWrapping;
        screenTexture.repeat.set(-1, 1);
        screenTexture.center.set(0.5, 0.5);
        screenTexture.rotation = Math.PI;
        screenTexture.flipY = false;
        screenTexture.minFilter = THREE.LinearFilter;
        screenTexture.magFilter = THREE.LinearFilter;

        const screenMat = new THREE.MeshBasicMaterial({
          map: screenTexture,
          toneMapped: false
        });

        // Find and replace screen mesh material in the real iPhone model
        iphoneModel.traverse((child: any) => {
          if (child.isMesh) {
            if (child.name.includes('xXDHkMplTIDAXLN') || child.material?.name === 'pIJKfZsazmcpEiU') {
              child.material = screenMat;
            }
          }
        });

        // DIMENSIONS FOR FLOATING CARDS (Scaled to match phone front screen)
        const screenW = 7.35;
        const screenH = 15.5;
        const screenZ = 0.44; // Front surface of iPhone 15 Pro screen
        const sX = screenW / 430;
        const sY = screenH / 932;

        const createCardMesh = (
          tex: THREE.Texture,
          w: number,
          h: number
        ): { card: THREE.Mesh; shadow: THREE.Mesh } => {
          const cardGeo = new THREE.PlaneGeometry(w, h);
          const cardMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
          const card = new THREE.Mesh(cardGeo, cardMat);

          const shadowGeo = new THREE.PlaneGeometry(w * 1.15, h * 1.15);
          const shadowMat = new THREE.MeshBasicMaterial({
            map: texShadow,
            transparent: true,
            opacity: 0,
            depthWrite: false
          });
          const shadow = new THREE.Mesh(shadowGeo, shadowMat);

          card.visible = false;
          shadow.visible = false;
          phoneGroup.add(shadow);
          phoneGroup.add(card);
          return { card, shadow };
        };

        const { card: cardStudyMesh, shadow: cardStudyShadow } = createCardMesh(
          texCardStudy,
          390 * sX,
          381.89 * sY
        );
        const { card: cardAgendaMesh, shadow: cardAgendaShadow } = createCardMesh(
          texCardAgenda,
          390 * sX,
          526 * sY
        );
        const { card: cardApostilasMesh, shadow: cardApostilasShadow } = createCardMesh(
          texCardApostilas,
          390 * sX,
          210.98 * sY
        );
        const { card: cardAnotacoesMesh, shadow: cardAnotacoesShadow } = createCardMesh(
          texCardAnotacoes,
          390 * sX,
          210.98 * sY
        );
        const { card: cardTraubezapMesh, shadow: cardTraubezapShadow } = createCardMesh(
          texCardTraubezap,
          390 * sX,
          210.98 * sY
        );

        stateRef.current = {
          renderer,
          scene,
          camera,
          phoneGroup,
          screenTexture,
          screenCanvas,
          screenCtx,
          imgDashContent,
          imgDashFrame,
          imgDrawer,
          imgAprenderViewport,
          cardStudyMesh,
          cardStudyShadow,
          cardAgendaMesh,
          cardAgendaShadow,
          cardApostilasMesh,
          cardApostilasShadow,
          cardAnotacoesMesh,
          cardAnotacoesShadow,
          cardTraubezapMesh,
          cardTraubezapShadow,
          sheenLight,
          screenLight
        };

        if (active) {
          setIsReady(true);
          continueRender(handle);
        }
      } catch (err) {
        console.error('Phone3DScene initialization failed:', err);
        if (active) continueRender(handle);
      }
    };

    init();

    return () => {
      active = false;
      if (stateRef.current) {
        stateRef.current.renderer.dispose();
      }
    };
  }, [width, height, handle]);

  // Synchronous Animation loop driven by Remotion frame
  useLayoutEffect(() => {
    if (!stateRef.current || !isReady) return;

    const {
      renderer,
      scene,
      camera,
      phoneGroup,
      screenTexture,
      screenCanvas,
      screenCtx,
      imgDashContent,
      imgDashFrame,
      imgDrawer,
      imgAprenderViewport,
      cardStudyMesh,
      cardStudyShadow,
      cardAgendaMesh,
      cardAgendaShadow,
      cardApostilasMesh,
      cardApostilasShadow,
      cardAnotacoesMesh,
      cardAnotacoesShadow,
      cardTraubezapMesh,
      cardTraubezapShadow,
      sheenLight,
      screenLight
    } = stateRef.current;

    const screenW = 7.35;
    const screenH = 15.5;
    const screenZ = 0.44;
    const sY = screenH / 932;

    // Animation States
    let camZ = 24.0;
    let posX = 0;
    let posY = 0;
    let posZ = 0;
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    let screenWake = 0;
    let scrollY = 0;
    let studyElev = 0;
    let agendaElev = 0;
    let drawerProgress = 0;
    let aprenderFade = 0;
    let apostilasElev = 0;
    let anotacoesElev = 0;
    let traubezapElev = 0;

    // ==========================================
    // SCENE TIMELINE (0 to 540 Frames / 18.0s)
    // ==========================================

    // SCENE 1: ENTRADA CINEMATOGRÁFICA DO SMARTPHONE (Frames 0 to 120 / 0-4.0s)
    if (frame < 120) {
      const flySp = spring({
        frame,
        fps,
        config: { damping: 18, stiffness: 35 }
      });

      camZ = interpolate(flySp, [0, 0.5, 1], [30.0, 24.5, 21.0]);

      // Starts tilted exhibiting titanium structure & triple lenses (-2.4), smoothly rotates to front screen (0.08)
      rotY = interpolate(flySp, [0, 0.35, 0.7, 1], [-2.4, -1.3, 0.2, 0.08]);
      rotX = interpolate(flySp, [0, 0.5, 1], [0.35, 0.22, 0.12]);
      rotZ = interpolate(flySp, [0, 0.5, 1], [-0.35, -0.15, 0]);

      posX = interpolate(flySp, [0, 0.65, 1], [-9.5, -2.5, 0]);
      posY = interpolate(flySp, [0, 0.65, 1], [3.5, -0.8, -3.2]);

      // Screen wakes up with emissive sweep as phone turns forward (frames 65-95)
      screenWake = interpolate(frame, [65, 95], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });

      // Specular sheen gleams across glass as it rotates
      sheenLight.intensity = interpolate(frame, [50, 80, 110], [0, 3.5, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });
      sheenLight.position.x = interpolate(frame, [50, 110], [-6, 6]);
    }
    // SCENE 2: DASHBOARD REAL DA TRAUBE (Frames 120 to 305 / 4.0-10.16s)
    else if (frame < 305) {
      screenWake = 1;
      const dashFrame = frame - 120;

      // Camera push-in and smooth float
      camZ = interpolate(dashFrame, [0, 90, 185], [21.0, 19.5, 21.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });

      rotY = 0.08 + Math.sin((dashFrame / 30) * 1.2) * 0.02;
      rotX = 0.12 + Math.cos((dashFrame / 30) * 1.0) * 0.015;
      rotZ = -0.015;
      posX = 0;
      posY = -3.2 + Math.sin((dashFrame / 30) * 1.5) * 0.05;

      // Vertical UI Scroll (Scrolls down to show "Estudar agora" & "Atividades")
      scrollY = interpolate(dashFrame, [25, 110], [0, 240], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });

      // 3D Card Elevation in Z space
      if (dashFrame >= 35 && dashFrame < 130) {
        studyElev = spring({
          frame: dashFrame - 35,
          fps,
          config: { damping: 14, stiffness: 80 }
        });
      } else if (dashFrame >= 130) {
        studyElev = interpolate(dashFrame, [130, 145], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
      }

      if (dashFrame >= 90 && dashFrame < 165) {
        agendaElev = spring({
          frame: dashFrame - 90,
          fps,
          config: { damping: 15, stiffness: 85 }
        });
      } else if (dashFrame >= 165) {
        agendaElev = interpolate(dashFrame, [165, 180], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
      }
    }
    // SCENE 3: TRANSIÇÃO COM DRAWER NATIVO (Frames 305 to 390 / 10.16-13.0s)
    else if (frame < 390) {
      screenWake = 1;
      const transFrame = frame - 305;

      // Slight pullback & whip tilt
      const pullSp = spring({
        frame: transFrame,
        fps,
        config: { damping: 18, stiffness: 85 }
      });
      camZ = interpolate(pullSp, [0, 1], [21.0, 23.0]);

      rotY = interpolate(transFrame, [0, 25, 60, 90], [0.08, -0.12, -0.04, 0.08], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });
      rotX = 0.12;
      posY = -3.2;

      // Drawer slide progress (0 to 1)
      const drawerSp = spring({
        frame: transFrame - 8,
        fps,
        config: { damping: 17, stiffness: 85 }
      });
      drawerProgress = interpolate(drawerSp, [0, 1], [0, 1]);

      // Cross-fade to Aprender
      aprenderFade = interpolate(transFrame, [52, 75], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
      });
    }
    // SCENE 4: ÁREA DE ESTUDOS / APRENDER & HERO OUTRO (Frames 390 to 540 / 13.0-18.0s)
    else {
      screenWake = 1;
      aprenderFade = 1;
      const learnFrame = frame - 390;

      if (learnFrame < 80) {
        camZ = 21.0;
        rotY = 0.07 + Math.sin((learnFrame / 30) * 1.5) * 0.02;
        rotX = 0.13;
        posY = -3.2 + Math.sin((learnFrame / 30) * 1.8) * 0.06;
      } else {
        // Hero Center Outro Lock (pulls back and elevates phone to create safe outro space)
        const heroSp = spring({
          frame: learnFrame - 80,
          fps,
          config: { damping: 18, stiffness: 60 }
        });
        camZ = interpolate(heroSp, [0, 1], [21.0, 31.0]);
        rotY = interpolate(heroSp, [0, 1], [0.07, 0.0]);
        rotX = interpolate(heroSp, [0, 1], [0.13, 0.04]);
        rotZ = 0;
        posX = 0;
        posY = interpolate(heroSp, [0, 1], [-3.2, 1.8]);
      }

      // Staggered 3D Pop-outs in Aprender
      if (learnFrame >= 10 && learnFrame < 85) {
        apostilasElev = spring({
          frame: learnFrame - 10,
          fps,
          config: { damping: 15, stiffness: 85 }
        });
      } else if (learnFrame >= 85) {
        apostilasElev = interpolate(learnFrame, [85, 95], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
      }

      if (learnFrame >= 24 && learnFrame < 85) {
        anotacoesElev = spring({
          frame: learnFrame - 24,
          fps,
          config: { damping: 15, stiffness: 85 }
        });
      } else if (learnFrame >= 85) {
        anotacoesElev = interpolate(learnFrame, [85, 95], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
      }

      if (learnFrame >= 38 && learnFrame < 85) {
        traubezapElev = spring({
          frame: learnFrame - 38,
          fps,
          config: { damping: 15, stiffness: 85 }
        });
      } else if (learnFrame >= 85) {
        traubezapElev = interpolate(learnFrame, [85, 95], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
      }
    }

    // Apply Camera & Phone Transforms
    camera.position.z = camZ;
    phoneGroup.position.set(posX, posY, posZ);
    phoneGroup.rotation.set(rotX, rotY, rotZ);

    // ==========================================
    // RENDER SCREEN CANVAS TEXTURE (NATIVE 2D)
    // ==========================================
    const cw = screenCanvas.width;
    const ch = screenCanvas.height;
    screenCtx.clearRect(0, 0, cw, ch);

    const statusBarH = 110;
    const bottomNavH = 120;
    const dScale = cw / 430;
    const statusBarPt = statusBarH / dScale; // 55 pt

    if (screenWake > 0) {
      screenCtx.save();
      screenCtx.globalAlpha = screenWake;

      if (aprenderFade < 1) {
        screenCtx.save();
        screenCtx.globalAlpha = (1 - aprenderFade) * screenWake;

        // 0. Base Medical White/Blue Background
        screenCtx.fillStyle = '#f8fafc';
        screenCtx.fillRect(0, 0, cw, ch);

        // 1. Dashboard Scrollable Content
        const scrollPx = scrollY * dScale;
        const contentW = cw * (422 / 430);
        const contentH = imgDashContent.height * (contentW / imgDashContent.width);
        const contentX = (cw - contentW) / 2;
        const contentY = statusBarH + 64 * dScale - scrollPx;

        // Clip inside screen frame area so topbar and bottom nav stay pinned
        screenCtx.save();
        screenCtx.beginPath();
        screenCtx.rect(0, statusBarH + 60 * dScale, cw, ch - (statusBarH + 60 * dScale) - bottomNavH);
        screenCtx.clip();
        screenCtx.drawImage(imgDashContent, contentX, contentY, contentW, contentH);
        screenCtx.restore();

        // 2. Dashboard Pinned Frame (Topbar + Blue border #184888)
        screenCtx.drawImage(imgDashFrame, 0, statusBarH, cw, ch - statusBarH - bottomNavH);

        // 3. Navigation Drawer (slides in from left)
        if (drawerProgress > 0) {
          const dwX = (-1 + drawerProgress) * cw;
          screenCtx.drawImage(imgDrawer, dwX, statusBarH, cw, ch - statusBarH);
        }

        screenCtx.restore();
      }

      // 4. Aprender Viewport (smooth cross-fade)
      if (aprenderFade > 0) {
        screenCtx.save();
        screenCtx.globalAlpha = aprenderFade * screenWake;
        screenCtx.drawImage(imgAprenderViewport, 0, statusBarH, cw, ch - statusBarH - bottomNavH);
        screenCtx.restore();
      }

      // 5. iOS Status Bar (Time, Signal, WiFi, Battery) pinned on top of everything
      drawStatusBar(screenCtx, cw, statusBarH);

      // 6. Native PWA Bottom Navigation Bar (Início, Estudar, Revisar, Mais + Home Bar)
      const currentTab = aprenderFade > 0.5 ? 'estudar' : 'inicio';
      drawBottomNavBar(screenCtx, cw, ch, bottomNavH, currentTab);

      screenCtx.restore();
    } else {
      // Screen off: Pure pitch black OLED
      screenCtx.fillStyle = '#000000';
      screenCtx.fillRect(0, 0, cw, ch);
    }

    screenTexture.needsUpdate = true;
    screenLight.intensity = screenWake * 1.8;

    // ==========================================
    // UPDATE FLOATING 3D CARDS & SHADOWS
    // ==========================================
    const updateCard = (
      card: THREE.Mesh,
      shadow: THREE.Mesh,
      topOffset: number,
      elevation: number,
      dY: number
    ) => {
      if (elevation <= 0.01) {
        card.visible = false;
        shadow.visible = false;
        return;
      }
      card.visible = true;
      shadow.visible = true;

      const centerY = screenH / 2 + dY - topOffset * sY;
      const zOff = elevation * 0.35;
      const scale = 1.0 + elevation * 0.04;

      card.position.set(0, centerY, screenZ + 0.02 + zOff);
      card.scale.set(scale, scale, 1);

      shadow.position.set(0, centerY - zOff * 0.45, screenZ + 0.01);
      shadow.scale.set(scale * (1.0 + zOff * 0.8), scale * (1.0 + zOff * 0.8), 1);
      (shadow.material as THREE.MeshBasicMaterial).opacity = elevation * 0.70;
    };

    const deltaY = scrollY * sY;

    // Dashboard Cards (statusBarPt + 64px topbar offset added to align pixel-perfectly with content)
    if (aprenderFade < 0.5) {
      updateCard(cardStudyMesh, cardStudyShadow, statusBarPt + 64 + 353.88 + 381.89 / 2, studyElev, deltaY);
      updateCard(cardAgendaMesh, cardAgendaShadow, statusBarPt + 64 + 755.77 + 526 / 2, agendaElev, deltaY);
    } else {
      cardStudyMesh.visible = false;
      cardStudyShadow.visible = false;
      cardAgendaMesh.visible = false;
      cardAgendaShadow.visible = false;
    }

    // Aprender Cards (statusBarPt + 64px topbar offset added)
    if (aprenderFade > 0.5) {
      updateCard(cardApostilasMesh, cardApostilasShadow, statusBarPt + 64 + 133.59 + 210.98 / 2, apostilasElev, 0);
      updateCard(cardAnotacoesMesh, cardAnotacoesShadow, statusBarPt + 64 + 360.58 + 210.98 / 2, anotacoesElev, 0);
      updateCard(cardTraubezapMesh, cardTraubezapShadow, statusBarPt + 64 + 587.56 + 210.98 / 2, traubezapElev, 0);
    } else {
      cardApostilasMesh.visible = false;
      cardApostilasShadow.visible = false;
      cardAnotacoesMesh.visible = false;
      cardAnotacoesShadow.visible = false;
      cardTraubezapMesh.visible = false;
      cardTraubezapShadow.visible = false;
    }

    renderer.render(scene, camera);
  }, [frame, isReady, fps]);

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};
