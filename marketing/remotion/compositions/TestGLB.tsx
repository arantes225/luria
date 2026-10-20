import React, { useEffect, useRef, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export const TestGLB: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading GLB'));
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 1080;
    const height = 1920;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a1324');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight2.position.set(-5, -5, -4);
    scene.add(dirLight2);

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    loader.load(
      staticFile('models/scene.glb'),
      gltf => {
        console.log('✔ GLB loaded successfully in Remotion!');
        const model = gltf.scene;

        // Auto-fit model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 8.5 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        // Load dashboard texture
        const texLoader = new THREE.TextureLoader();
        texLoader.load(staticFile('commercial/dashboard-viewport.png'), texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.RepeatWrapping;
          texture.repeat.set(-1, 1);
          texture.center.set(0.5, 0.5);
          texture.rotation = Math.PI; // Rotate 180 deg to match mesh UVs
          texture.flipY = false;

          // Find screen mesh
          model.traverse(child => {
            if ((child as any).isMesh) {
              const m = child as THREE.Mesh;
              console.log('Child mesh:', m.name, 'mat:', (m.material as any)?.name);
              if (m.name.includes('xXDHkMplTIDAXLN') || (m.material as any)?.name === 'pIJKfZsazmcpEiU') {
                console.log('🎯 Found screen mesh:', m.name);
                m.material = new THREE.MeshBasicMaterial({
                  map: texture,
                  toneMapped: false
                });
              }
            }
          });

          // Tilted angle showing front screen
          model.rotation.set(0.12, Math.PI + 0.28, -0.04);

          scene.add(model);
          renderer.render(scene, camera);
          setStatus('success front');
          continueRender(handle);
        });
      },
      undefined,
      err => {
        console.error('Failed to load GLB in Remotion:', err);
        setStatus('error: ' + String(err));
        continueRender(handle);
      }
    );

    return () => {
      renderer.dispose();
    };
  }, [handle]);

  return (
    <div
      ref={containerRef}
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#0a1324'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          color: '#fff',
          fontSize: 24,
          fontFamily: 'sans-serif'
        }}
      >
        Status: {status}
      </div>
    </div>
  );
};
