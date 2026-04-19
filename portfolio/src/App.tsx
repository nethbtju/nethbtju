import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { PLANET_DEFS } from './data/planets';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { CameraRig }     from './components/Scene/CameraRig';
import { StarField }     from './components/Scene/StarField';
import { NebulaField }   from './components/Scene/NebulaField';
import { PlanetMesh }    from './components/Scene/PlanetMesh';
import { Nav }           from './components/UI/Nav';
import { HeroText }      from './components/UI/HeroText';
import { PlanetInfo }    from './components/UI/PlanetInfo';
import { MoonInfo }      from './components/UI/MoonInfo';
import { Panel }         from './components/UI/Panel';
import { LocationBadge } from './components/UI/LocationBadge';
import { ProgressDots }  from './components/UI/ProgressDots';
import { ScrollHint }    from './components/UI/ScrollHint';

export default function App() {
  useScrollNavigation();

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* ── 3D Canvas ── */}
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 35] }}
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <color attach="background" args={['#020408']} />
        <ambientLight intensity={0.08} />

        <StarField />
        <NebulaField />

        {PLANET_DEFS.map(def => (
          <PlanetMesh key={def.id} def={def} />
        ))}

        {/* CameraRig is last — guarantees moon positions are updated before camera reads them */}
        <CameraRig />
      </Canvas>

      {/* ── HUD Overlays ── */}
      <Nav />
      <LocationBadge />
      <HeroText />
      <PlanetInfo />
      <MoonInfo />
      <ScrollHint />
      <ProgressDots />
      <Panel />
    </div>
  );
}
