import { useMemo } from 'react';
import * as THREE from 'three';

// Original HTML had 800 stars across 3 parallax layers:
//   layer 0 (30%): faint, tiny  — parallax 0.05
//   layer 1 (20%): mid          — parallax 0.15
//   layer 2 (50%): bright, big  — parallax 0.40
// Canvas coords were ±6000x and ±4000y → world units ÷50 = ±120x, ±80y
// Stars are pushed far back on Z so they always fill the backdrop.

interface LayerConfig { count: number; size: number; opacity: number; zRange: number }
const LAYERS: LayerConfig[] = [
  { count: 240, size: 0.04, opacity: 0.35, zRange: 20 }, // layer 0 — faint
  { count: 160, size: 0.07, opacity: 0.55, zRange: 30 }, // layer 1 — mid
  { count: 400, size: 0.10, opacity: 0.80, zRange: 50 }, // layer 2 — bright
];

function makeLayer(cfg: LayerConfig) {
  const positions = new Float32Array(cfg.count * 3);
  for (let i = 0; i < cfg.count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 260;  // ±130 world units
    positions[i * 3 + 1] = (Math.random() - 0.5) * 180;  // ±90 world units
    positions[i * 3 + 2] = -60 - Math.random() * cfg.zRange; // behind scene
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

export function StarField() {
  const geometries = useMemo(() => LAYERS.map(makeLayer), []);

  return (
    <>
      {LAYERS.map((cfg, i) => (
        <points key={i} geometry={geometries[i]}>
          <pointsMaterial
            color="#c8d8f0"
            size={cfg.size}
            sizeAttenuation
            transparent
            opacity={cfg.opacity}
            depthWrite={false}
          />
        </points>
      ))}
    </>
  );
}
