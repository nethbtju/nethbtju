import { useMemo } from 'react';
import * as THREE from 'three';

const NEBULA_DATA = [
  { x: -60, y: -30, z: -30, r: 18, hue: 200 },
  { x:  40, y:  20, z: -25, r: 22, hue: 280 },
  { x:  80, y: -60, z: -20, r: 16, hue: 180 },
  { x: -20, y:  50, z: -35, r: 20, hue: 240 },
  { x: 110, y:  10, z: -28, r: 24, hue: 210 },
  { x:  20, y: -80, z: -32, r: 14, hue: 260 },
];

export function NebulaField() {
  const color = useMemo(
    () => NEBULA_DATA.map(n => new THREE.Color().setHSL(n.hue / 360, 0.55, 0.38)),
    [],
  );

  return (
    <>
      {NEBULA_DATA.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[n.r, 16, 16]} />
          <meshBasicMaterial
            color={color[i]}
            transparent
            opacity={0.035}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}
