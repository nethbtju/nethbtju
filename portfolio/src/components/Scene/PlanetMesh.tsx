import * as THREE from 'three';
import type { PlanetDef } from '../../data/planets';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';
import { SunMesh } from './SunMesh';
import { MoonMesh } from './MoonMesh';

interface Props { def: PlanetDef }

export function PlanetMesh({ def }: Props) {
  const { travelTo, currentTarget } = useStore(useShallow(s => ({ travelTo: s.travelTo, currentTarget: s.currentTarget })));
  const isFocused = currentTarget === def.id;

  if (def.isSun) {
    return (
      <group position={[def.x, def.y, 0]}>
        <SunMesh def={def} />
      </group>
    );
  }

  const isSaturn = def.id === 'saturn';
  const isUranus = def.id === 'uranus';

  return (
    <group position={[def.x, def.y, 0]}>
      {/* Atmosphere rim */}
      <mesh>
        <sphereGeometry args={[def.r * 1.35, 24, 24]} />
        <meshBasicMaterial
          color={def.color}
          transparent
          opacity={isFocused ? 0.08 : 0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet body */}
      <mesh onClick={() => travelTo(def.id)} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'crosshair'; }}>
        <sphereGeometry args={[def.r, 36, 36]} />
        <meshStandardMaterial
          color={def.color}
          roughness={0.82}
          metalness={0.0}
          emissive={def.color}
          emissiveIntensity={isFocused ? 0.07 : 0}
        />
      </mesh>

      {/* Saturn rings */}
      {isSaturn && (
        <group rotation={[-Math.PI / 5, 0, 0]}>
          {[
            [def.r * 1.30, def.r * 1.50, 0.20],
            [def.r * 1.50, def.r * 1.72, 0.15],
            [def.r * 1.72, def.r * 1.92, 0.10],
            [def.r * 1.92, def.r * 2.12, 0.07],
          ].map(([inner, outer, opacity], i) => (
            <mesh key={i}>
              <ringGeometry args={[inner, outer, 80]} />
              <meshBasicMaterial
                color="#ffd54f"
                transparent
                opacity={opacity as number}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Uranus rings (axial tilt ~90°) */}
      {isUranus && (
        <mesh rotation={[Math.PI / 2, 0.3, 0]}>
          <ringGeometry args={[def.r * 1.3, def.r * 1.8, 64]} />
          <meshBasicMaterial
            color="#80deea"
            transparent
            opacity={0.15}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Moons */}
      {def.moons.map(moon => (
        <MoonMesh key={moon.label} moon={moon} planet={def} />
      ))}
    </group>
  );
}
