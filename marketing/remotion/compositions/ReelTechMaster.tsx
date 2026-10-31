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
import { TechIntro } from '../components/TechIntro';
import { RealisticPhone, CursorConfig } from '../components/RealisticPhone';
import { TechFeatureCard, FeatureData } from '../components/TechFeatureCard';
import { TechConstellation } from '../components/TechConstellation';
import { TechOutro } from '../components/TechOutro';

export const ReelTechMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Module Name & Active Step determination based on frame
  let moduleName = 'INICIALIZANDO';
  let activeStep = 0;

  if (frame >= 100 && frame < 275) {
    moduleName = 'CRONOGRAMA';
    activeStep = 0;
  } else if (frame >= 275 && frame < 440) {
    moduleName = 'APRENDER';
    activeStep = 1;
  } else if (frame >= 440 && frame < 610) {
    moduleName = 'STUDY_RATS';
    activeStep = 2;
  } else if (frame >= 610 && frame < 730) {
    moduleName = 'EMERGÊNCIA';
    activeStep = 3;
  } else if (frame >= 730 && frame < 820) {
    moduleName = 'REDE_INTEGRADA';
    activeStep = 4;
  } else if (frame >= 820) {
    moduleName = 'CONSOLIDE';
    activeStep = 4;
  }

  // Feature data configurations
  const feature1: FeatureData = {
    stepNumber: '01',
    tag: 'ORGANIZAÇÃO',
    title: 'PLANEJE.',
    subtitle: 'O seu tempo, com direção.',
    chip: 'CRONOGRAMA INTELIGENTE',
    description: 'Organize suas atividades, defina prioridades\ne saiba exatamente o que estudar a cada dia.',
    activeStepIndex: 0
  };

  const feature2: FeatureData = {
    stepNumber: '02',
    tag: 'APRENDIZADO',
    title: 'APRENDA.',
    subtitle: 'Entender antes de memorizar.',
    chip: 'ESTUDO GUIADO',
    description: 'Aprofunde o conteúdo com metodologia ativa\ne transforme cada sessão em conhecimento sólido.',
    activeStepIndex: 1
  };

  const feature3: FeatureData = {
    stepNumber: '03',
    tag: 'GAMIFICAÇÃO',
    title: 'STUDY RATS.',
    subtitle: 'Estude em equipe, compita na pista.',
    chip: 'MULTIPLAYER EM TEMPO REAL',
    description: 'Transforme horas de estudo em uma corrida ao vivo.\nAvatares, ranking e metas em grupo com seus amigos.',
    activeStepIndex: 2
  };

  const feature4: FeatureData = {
    stepNumber: '04',
    tag: 'SIMULAÇÃO CLÍNICA',
    title: 'VIVA O CASO.',
    subtitle: 'Da teoria à tomada de decisão.',
    chip: 'SALA DE EMERGÊNCIA',
    description: 'Enfrente cenários clínicos reais sob pressão.\nEscolha condutas diagnósticas e terapêuticas na prática.',
    activeStepIndex: 3
  };

  // Cursor simulations for scenes
  const cursor1: CursorConfig = {
    x: interpolate(frame, [150, 195, 230], [80, 48, 48], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    y: interpolate(frame, [150, 195, 230], [85, 54, 54], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    clicking: frame >= 195 && frame <= 215,
    visible: frame >= 140 && frame <= 260
  };

  const cursor2: CursorConfig = {
    x: interpolate(frame, [310, 355, 395], [85, 45, 45], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    y: interpolate(frame, [310, 355, 395], [80, 68, 68], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    clicking: frame >= 355 && frame <= 375,
    visible: frame >= 300 && frame <= 425
  };

  const cursor3: CursorConfig = {
    x: interpolate(frame, [480, 525, 565], [75, 52, 52], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    y: interpolate(frame, [480, 525, 565], [75, 48, 48], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }),
    clicking: frame >= 525 && frame <= 545,
    visible: frame >= 470 && frame <= 595
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020713',
        overflow: 'hidden'
      }}
    >
      {/* 30s High-Energy Medical/Tech Soundtrack */}
      <Audio src={staticFile('audio/luria-soundtrack-full-30s.mp3')} volume={0.88} />

      {/* Persistent Dynamic Cyber Medical Background */}
      <TechBackground />

      {/* Persistent Technical Telemetry HUD */}
      <TechHUD moduleName={moduleName} activeStep={activeStep} totalSteps={5} />

      {/* SCENE 0: TECH INTRO (Frames 0 to 105) */}
      <Sequence from={0} durationInFrames={105}>
        <TechIntro />
      </Sequence>

      {/* SCENE 1: CRONOGRAMA INTELIGENTE (Frames 100 to 275) */}
      <Sequence from={100} durationInFrames={175}>
        {(() => {
          const localFrame = frame - 100;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 16, stiffness: 90 }
          });
          const exitFade = interpolate(localFrame, [155, 175], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const phoneY = interpolate(enterSp, [0, 1], [380, 40]);

          return (
            <div style={{ opacity: exitFade }}>
              <RealisticPhone
                videoSrc="captures/clips/ScreenRecording_10-10-2026 17-56-28_1.mp4"
                trim={0.2}
                x={140}
                y={phoneY}
                scale={0.92}
                rotateY={-8}
                rotateX={5}
                rotateZ={-1}
                cursor={cursor1}
              />
              <TechFeatureCard feature={feature1} />
            </div>
          );
        })()}
      </Sequence>

      {/* SCENE 2: APRENDA & TRAUBEZAP (Frames 270 to 445) */}
      <Sequence from={270} durationInFrames={175}>
        {(() => {
          const localFrame = frame - 270;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 16, stiffness: 90 }
          });
          const exitFade = interpolate(localFrame, [155, 175], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const phoneX = interpolate(enterSp, [0, 1], [250, 120]);

          return (
            <div style={{ opacity: exitFade }}>
              <RealisticPhone
                videoSrc="captures/clips/ScreenRecording_10-10-2026 17-56-01_1.mp4"
                trim={0.3}
                x={phoneX}
                y={35}
                scale={0.94}
                rotateY={7}
                rotateX={-4}
                rotateZ={1}
                cursor={cursor2}
              />
              <TechFeatureCard feature={feature2} />
            </div>
          );
        })()}
      </Sequence>

      {/* SCENE 3: STUDY RATS (Frames 440 to 615) */}
      <Sequence from={440} durationInFrames={175}>
        {(() => {
          const localFrame = frame - 440;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 15, stiffness: 95 }
          });
          const exitFade = interpolate(localFrame, [155, 175], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const phoneScale = interpolate(enterSp, [0, 1], [0.86, 1.02]);
          const phoneY = interpolate(enterSp, [0, 1], [200, 20]);

          return (
            <div style={{ opacity: exitFade }}>
              <RealisticPhone
                videoSrc="captures/study-rats/mobile.mp4"
                trim={1.0}
                x={110}
                y={phoneY}
                scale={phoneScale}
                rotateY={-5}
                rotateX={3}
                rotateZ={0}
                cursor={cursor3}
              />
              <TechFeatureCard feature={feature3} />
            </div>
          );
        })()}
      </Sequence>

      {/* SCENE 4: SALA DE EMERGÊNCIA (Frames 610 to 735) */}
      <Sequence from={610} durationInFrames={125}>
        {(() => {
          const localFrame = frame - 610;
          const enterSp = spring({
            frame: localFrame,
            fps,
            config: { damping: 16, stiffness: 90 }
          });
          const exitFade = interpolate(localFrame, [110, 125], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });
          const phoneY = interpolate(enterSp, [0, 1], [250, 30]);

          return (
            <div style={{ opacity: exitFade }}>
              <RealisticPhone
                videoSrc="captures/clips/ScreenRecording_10-10-2026 17-58-42_1.mp4"
                trim={0.2}
                x={130}
                y={phoneY}
                scale={0.93}
                rotateY={-6}
                rotateX={4}
                rotateZ={-1}
              />
              <TechFeatureCard feature={feature4} />
            </div>
          );
        })()}
      </Sequence>

      {/* SCENE 5: REDE INTEGRADA / CONSTELLATION (Frames 725 to 815) */}
      <Sequence from={725} durationInFrames={90}>
        {(() => {
          const localFrame = frame - 725;
          const exitFade = interpolate(localFrame, [75, 90], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          });

          return (
            <div style={{ opacity: exitFade }}>
              <TechConstellation />
            </div>
          );
        })()}
      </Sequence>

      {/* SCENE 6: GRAND TECH OUTRO (Frames 805 to 900) */}
      <Sequence from={805} durationInFrames={95}>
        <TechOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
