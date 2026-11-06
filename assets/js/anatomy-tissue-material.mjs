// Object-space tissue variation follows the surface when the model is rotated.
// The reference geometry and selectable structure boundaries remain intact.
export function addTissueFinish(material, modelSize, strength = 1) {
  material.onBeforeCompile = shader => {
    shader.uniforms.tissueScale = { value: 15 / Math.max(modelSize, .001) };
    shader.uniforms.tissueStrength = { value: strength };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 tissuePoint;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\ntissuePoint = position;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
      varying vec3 tissuePoint;
      uniform float tissueScale, tissueStrength;
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
      }`).replace("#include <color_fragment>", `#include <color_fragment>
      vec3 p = tissuePoint * tissueScale;
      float grain = tissueNoise(p) - 0.5;
      float fine = (tissueNoise(p * 5.0) - 0.5) * (1.0 - smoothstep(0.05, 0.35, length(fwidth(p))));
      diffuseColor.rgb *= 1.0 + tissueStrength * (0.16 * grain + 0.08 * fine);`)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
      roughnessFactor = clamp(roughnessFactor + tissueStrength * (grain * 0.15 + fine * 0.05), 0.35, 1.0);`);
  };
  material.customProgramCacheKey = () => "traube-tissue-surface-1";
  return material;
}
