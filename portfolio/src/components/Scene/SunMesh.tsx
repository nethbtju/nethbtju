import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetDef } from '../../data/planets';

interface Props { def: PlanetDef }

export function SunMesh({ def }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.5) * 0.012;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Corona glow layers */}
      {[3.0, 2.2, 1.6].map((scale, i) => (
        <mesh key={i}>
          <sphereGeometry args={[def.r * scale, 16, 16]} />
          <meshBasicMaterial
            color="#ffd54f"
            transparent
            opacity={0.018 * (3 - i)}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      ))}

      {/* Sun body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[def.r, 48, 48]} />
        <meshStandardMaterial
          color="#ffd54f"
          emissive="#ffd54f"
          emissiveIntensity={0.9}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Scene light — illuminate all planets */}
      <pointLight intensity={4} distance={300} decay={0.6} color="#fff9c4" />
    </group>
  );
}
