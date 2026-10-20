import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

// Deterministic pseudo-random helper for consistent particle positions
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Particle positions calculated deterministically
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const baseX = pseudoRandom(i + 1) * 1080;
    const baseY = pseudoRandom(i + 101) * 1920;
    const speed = 25 + pseudoRandom(i + 201) * 45;
    const size = 2 + pseudoRandom(i + 301) * 3.5;
    const opacity = 0.25 + pseudoRandom(i + 401) * 0.55;

    // Movement: upward drift + horizontal subtle sine sway
    const currentY = (baseY - time * speed) % 1920;
    const y = currentY < 0 ? currentY + 1920 : currentY;
    const x = baseX + Math.sin(time * 1.5 + i) * 18;

    return { id: i, x, y, size, opacity };
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#020713',
        backgroundImage:
          'radial-gradient(ellipse at 50% 38%, #113875 0%, #061838 50%, #020713 100%)',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Soft secondary ambient color orbs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(24, 72, 136, 0.35) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 133, 121, 0.20) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* 3D Perspective Cyber Floor Grid */}
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -400,
          width: 1880,
          height: 1200,
          transform: 'perspective(750px) rotateX(68deg)',
          transformOrigin: 'bottom center',
          backgroundSize: '60px 60px',
          backgroundImage:
            'linear-gradient(rgba(98, 202, 255, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(98, 202, 255, 0.16) 1px, transparent 1px)',
          backgroundPosition: `0px ${time * 40}px`,
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 95%)',
          pointerEvents: 'none'
        }}
      />

      {/* Concentric Holographic Radar Rings */}
      {[0, 1, 2, 3].map(i => {
        const size = 780 + i * 220;
        const direction = i % 2 === 0 ? 1 : -1;
        const speed = (0.2 + i * 0.1) * direction;
        const rotation = time * 8 * speed;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              width: size,
              height: size,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              border: `1px ${i % 2 === 0 ? 'dashed' : 'solid'} rgba(98, 202, 255, ${0.12 + (3 - i) * 0.04})`,
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        );
      })}

      {/* Floating Star/Energy Dust Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: `0 0 ${p.size * 2}px rgba(123, 223, 255, 0.9)`,
            opacity: p.opacity,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};
