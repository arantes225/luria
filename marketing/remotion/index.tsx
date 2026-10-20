import React from 'react';
import { registerRoot, Composition, Still } from 'remotion';
import { ReelCommercialV1 } from './compositions/ReelCommercialV1';
import { ReelTechMaster } from './compositions/ReelTechMaster';
import { ReelStudyRats } from './compositions/ReelStudyRats';
import { ReelCover } from './compositions/ReelCover';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Comercial Cinematográfico 3D V1: Entrada, Dashboard, Transição, Aprender (18s vertical 1080x1920) */}
      <Composition
        id="ReelCommercialV1"
        component={ReelCommercialV1}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />


      {/* Composição Master: Aprenda. Conecte. Consolide. (30s vertical 1080x1920) */}
      <Composition
        id="ReelTechMaster"
        component={ReelTechMaster}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Composição Específica Study Rats (30s vertical 1080x1920) */}
      <Composition
        id="ReelStudyRats"
        component={ReelStudyRats}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Capa Estática Oficial (1080x1920) */}
      <Still
        id="ReelCover"
        component={ReelCover}
        width={1080}
        height={1920}
      />

      {/* Teste do Modelo 3D Real iPhone 15 Pro Max GLB */}
      <Still
        id="TestGLB"
        component={require('./compositions/TestGLB').TestGLB}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
