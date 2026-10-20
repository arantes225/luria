import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';
import { TechBackground } from '../components/TechBackground';
import { TechHUD } from '../components/TechHUD';
import { RealisticPhone, CursorConfig } from '../components/RealisticPhone';
import { TechFeatureCard, FeatureData } from '../components/TechFeatureCard';
import { TechOutro } from '../components/TechOutro';

export const ReelStudyRats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Telemetry Stage based on frame
  let moduleName = 'STUDY_RATS';
  let activeStep = 0;

  if (frame < 260) {
    moduleName = 'STUDY_RATS // MULTIPLAYER';
    activeStep = 0;
  } else if (frame < 520) {
    moduleName = 'STUDY_RATS // GAMIFICAÇÃO';
    activeStep = 1;
  } else if (frame < 760) {
    moduleName = 'STUDY_RATS // METAS_REAIS';
    activeStep = 2;
  } else {
    moduleName = 'LURIA // CONSOLIDE';
    activeStep = 3;
  }

  // Feature stage data
  const stage1: FeatureData = {
    stepNumber: '01',
    tag: 'MULTIPLAYER MÉDICO',
    title: 'ESTUDE EM EQUIPE.',
    subtitle: 'A residência não precisa ser solitária.',
    chip: 'SALA AO VIVO COM AMIGOS',
    description: 'Transforme seu progresso diário em uma corrida colaborativa.\nVeja o avanço dos seus colegas e mantenha o ritmo.',
    activeStepIndex: 0
  };

  const stage2: FeatureData = {
    stepNumber: '02',
    tag: 'GAMIFICAÇÃO CLÍNICA',
    title: 'CUSTOMIZE SEU RATO.',
    subtitle: 'Conquiste acessórios com metas reais.',
    chip: 'AVATARES & CIRCUITOS DINÂMICOS',
    description: 'Cada questão resolvida e cada flashcard revisado\navança sua posição na pista e desbloqueia recompensas.',
    activeStepIndex: 1
  };

  const stage3: FeatureData = {
    stepNumber: '03',
    tag: 'CONSISTÊNCIA COLETIVA',
    title: 'COMPITA NA PISTA.',
    subtitle: 'Desafios diários que constroem a aprovação.',
    chip: 'RANKING & SPRINT SEMANAL',
    description: 'Crie grupos de estudo com sua turma de faculdade ou residência.\nMetas compartilhadas geram 3x mais consistência.',
    activeStepIndex: 2
  };

  // Cursor interactions across the 3 stages
  const cursor: CursorConfig = {
    x: interpolate(frame, [120, 160, 200, 320, 360, 400, 560, 600, 640], [80, 52, 52, 85, 46, 46, 75, 50, 50], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    y: interpolate(frame, [120, 160, 200, 320, 360, 400, 560, 600, 640], [80, 48, 48, 75, 62, 62, 80, 55, 55], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    clicking: (frame >= 160 && frame <= 180) || (frame >= 360 && frame <= 380) || (frame >= 600 && frame <= 620),
    visible: frame >= 100 && frame <= 740
  };

  // Camera motion / phone scale & tilt across stages
  const phoneScale = interpolate(
    frame,
    [0, 80, 260, 340, 520, 600, 760],
    [0.88, 0.95, 0.95, 1.05, 1.05, 0.96, 0.96],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const phoneRotateY = interpolate(
    frame,
    [0, 80, 260, 340, 520, 600, 760],
    [-12, -7, -7, 6, 6, -5, -5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const phoneRotateX = interpolate(
    frame,
    [0, 80, 260, 340, 520, 600, 760],
    [8, 4, 4, -4, -4, 3, 3],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const phoneX = interpolate(
    frame,
    [0, 80, 260, 340, 520, 600, 760],
    [200, 130, 130, 110, 110, 125, 125],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const phoneY = interpolate(
    frame,
    [0, 80, 750, 790],
    [250, 35, 35, 450],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020713',
        overflow: 'hidden'
      }}
    >
      {/* 30s High-Energy Soundtrack */}
      <Audio src={staticFile('audio/luria-soundtrack-full-30s.mp3')} volume={0.88} />

      {/* Cyber Medical Grid & Holographic Radar Atmosphere */}
      <TechBackground />

      {/* Real-time Telemetry & Timecode HUD */}
      <TechHUD moduleName={moduleName} activeStep={activeStep} totalSteps={4} />

      {/* 3D Realistic Phone displaying Real PWA Study Rats gameplay */}
      {frame < 780 && (
        <RealisticPhone
          videoSrc="captures/study-rats/mobile.mp4"
          trim={0.5}
          x={phoneX}
          y={phoneY}
          scale={phoneScale}
          rotateY={phoneRotateY}
          rotateX={phoneRotateX}
          cursor={cursor}
        />
      )}

      {/* STAGE 1 (Frames 0 to 260) */}
      <Sequence from={0} durationInFrames={260}>
        {(() => {
          const fadeOut = interpolate(frame, [240, 260], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          return (
            <div style={{ opacity: fadeOut }}>
              <TechFeatureCard feature={stage1} />
            </div>
          );
        })()}
      </Sequence>

      {/* STAGE 2 (Frames 260 to 520) */}
      <Sequence from={260} durationInFrames={260}>
        {(() => {
          const localFrame = frame - 260;
          const fadeOut = interpolate(localFrame, [240, 260], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          return (
            <div style={{ opacity: fadeOut }}>
              <TechFeatureCard feature={stage2} />
            </div>
          );
        })()}
      </Sequence>

      {/* STAGE 3 (Frames 520 to 760) */}
      <Sequence from={520} durationInFrames={240}>
        {(() => {
          const localFrame = frame - 520;
          const fadeOut = interpolate(localFrame, [220, 240], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          return (
            <div style={{ opacity: fadeOut }}>
              <TechFeatureCard feature={stage3} />
            </div>
          );
        })()}
      </Sequence>

      {/* STAGE 4: GRAND TECH OUTRO (Frames 755 to 900) */}
      <Sequence from={755} durationInFrames={145}>
        <TechOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
