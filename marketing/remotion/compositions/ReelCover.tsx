import React from 'react';
import { Img, staticFile } from 'remotion';
import { TechBackground } from '../components/TechBackground';
import { TechHUD } from '../components/TechHUD';
import { RealisticPhone } from '../components/RealisticPhone';

export const ReelCover: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: '#020713',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}
    >
      {/* Dynamic Cyber Medical Atmosphere */}
      <TechBackground />

      {/* Technical HUD & Reticles */}
      <TechHUD moduleName="APRENDER" activeStep={1} totalSteps={5} />

      {/* 3D Realistic Phone Showcase */}
      <RealisticPhone
        videoSrc="captures/study-rats/mobile.mp4"
        trim={0.5}
        x={150}
        y={40}
        scale={0.94}
        rotateY={-7}
        rotateX={5}
        rotateZ={-1}
        enableFloat={false}
      />

      {/* INSTAGRAM GRID SAFE ZONE (1080x1080: Y=420 to Y=1500) */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          left: 56,
          right: 56,
          height: 1080,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          zIndex: 50
        }}
      >
        {/* Top Header Block in Safe Zone */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 420,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.85)'
          }}
        >
          {/* Glowing Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: 10,
              padding: '10px 22px',
              backgroundColor: 'rgba(8, 40, 87, 0.95)',
              border: '1.5px solid rgba(86, 172, 255, 0.85)',
              borderRadius: 999,
              color: '#d6ecff',
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '2px',
              boxShadow: '0 0 20px rgba(57, 155, 255, 0.45)'
            }}
          >
            <span style={{ color: '#46b0ff' }}>●</span>
            <span>MEDICINA INTELIGENTE</span>
          </div>

          {/* Main Cover Title */}
          <div
            style={{
              fontSize: 70,
              fontWeight: 950,
              letterSpacing: '-2.5px',
              color: '#ffffff',
              lineHeight: 1.05
            }}
          >
            Seu estudo.
            <br />
            <span
              style={{
                color: '#399bff',
                textShadow: '0 0 35px rgba(57, 155, 255, 0.65)'
              }}
            >
              Em outra dimensão.
            </span>
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#c4daef',
              letterSpacing: '-0.3px',
              lineHeight: 1.3
            }}
          >
            Cronograma, Flashcards, Study Rats e Emergência integrados.
          </div>
        </div>

        {/* Bottom Feature Pill in Safe Zone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderRadius: 24,
            backgroundColor: 'rgba(5, 29, 62, 0.92)',
            border: '1.5px solid rgba(57, 128, 208, 0.65)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Img
              src={staticFile('assets/logos/logo-icone-azul-claro.png')}
              style={{
                width: 38,
                height: 38,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(123, 223, 255, 0.85))'
              }}
            />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#ffffff' }}>
                Conheça a LURIA
              </div>
              <div style={{ fontSize: 13, color: '#87b1dd' }}>
                A plataforma médica do futuro
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 20px',
              borderRadius: 20,
              backgroundColor: '#184888',
              border: '1px solid #76b8fa',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '1px'
            }}
          >
            VER REEL →
          </div>
        </div>
      </div>
    </div>
  );
};
