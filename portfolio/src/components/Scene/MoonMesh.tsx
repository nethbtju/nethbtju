import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { MoonDef, PlanetDef } from '../../data/planets';
import { useStore } from '../../store/useStore';
import { moonWorldX, moonWorldY } from '../../globals';

interface Props {
  moon: MoonDef;
  planet: PlanetDef;
  onFocused?: () => void;
}

export function MoonMesh({ moon, planet }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(moon.initialAngle);
  const currentMoonTarget = useStore(s => s.currentMoonTarget);
  const isFocused = currentMoonTarget === moon.label;

  useFrame(() => {
    angleRef.current += moon.speed;
    const lx = Math.cos(angleRef.current) * moon.dist;
    const ly = Math.sin(angleRef.current) * moon.dist;

    // Update global tracking for CameraRig (world position)
    moonWorldX[moon.label] = planet.x + lx;
    moonWorldY[moon.label] = planet.y + ly;

    if (groupRef.current) {
      groupRef.current.position.set(lx, ly, 0);
    }
  });

  return (
    <>
      {/* Orbit ring — shown when this moon is focused */}
      {isFocused && (
        <mesh>
          <ringGeometry args={[moon.dist - 0.02, moon.dist + 0.02, 128]} />
          <meshBasicMaterial
            color="#4fc3f7"
            transparent
            opacity={0.25}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Group orbits together: sphere + label */}
      <group ref={groupRef} position={[moon.dist, 0, 0]}>
        <mesh>
          <sphereGeometry args={[moon.r, 18, 18]} />
          <meshStandardMaterial
            color={moon.color}
            roughness={0.9}
            emissive={moon.color}
            emissiveIntensity={isFocused ? 0.18 : 0}
          />
        </mesh>

        <Suspense fallback={null}>
          <Text
            position={[0, moon.r + 0.05, 0]}
            fontSize={0.12}
            color={isFocused ? '#4fc3f7' : '#7a95b8'}
            fillOpacity={isFocused ? 0.9 : 0.5}
            anchorX="center"
            anchorY="bottom"
            renderOrder={1}
            depthTest={false}
          >
            {moon.label}
          </Text>
        </Suspense>
      </group>
    </>
  );
}
