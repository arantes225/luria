import React, { useEffect, useRef, useState } from 'react';
import { AbsoluteFill, continueRender, delayRender, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';

export const TestThree: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cube: THREE.Mesh;
  } | null>(null);

  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender('Init ThreeJS Test'));

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x184888,
      metalness: 0.8,
      roughness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(3, 4, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    stateRef.current = { renderer, scene, camera, cube };
    setReady(true);
    continueRender(handle);

    return () => {
      renderer.dispose();
    };
  }, [width, height, handle]);

  useEffect(() => {
    if (!stateRef.current) return;
    const { renderer, scene, camera, cube } = stateRef.current;
    cube.rotation.x = (frame / 30) * Math.PI;
    cube.rotation.y = (frame / 30) * Math.PI * 0.5;
    renderer.render(scene, camera);
  }, [frame, ready]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050b18' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </AbsoluteFill>
  );
};
