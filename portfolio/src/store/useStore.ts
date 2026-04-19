import { create } from 'zustand';
import { PLANET_DEFS, DESTINATIONS, PLANET_CAMERA_Z, MOON_CAMERA_Z } from '../data/planets';
import type { PanelData } from '../data/portfolio';
import { moonWorldX, moonWorldY } from '../globals';

interface CamTarget { x: number; y: number; z: number }

interface AppState {
  currentTarget: string;
  currentMoonTarget: string | null;
  isTransitioning: boolean;
  panelOpen: boolean;
  panelData: PanelData | null;
  cameraTarget: CamTarget;
  cameraLookAt: CamTarget;
  location: string;

  travelTo: (id: string, moonLabel?: string | null) => void;
  openPanel: (data: PanelData) => void;
  closePanel: () => void;
  goNextPlanet: () => void;
  goPrevPlanet: () => void;
}

// Module-level timer so rapid nav calls don't stack timeouts
let transitionTimer: ReturnType<typeof setTimeout> | null = null;

export const useStore = create<AppState>((set, get) => ({
  currentTarget: 'sun',
  currentMoonTarget: null,
  isTransitioning: false,
  panelOpen: false,
  panelData: null,
  cameraTarget: { x: 0, y: 0, z: 35 },
  cameraLookAt: { x: 0, y: 0, z: 0 },
  location: 'Earth Orbit',

  travelTo: (id, moonLabel = null) => {
    const planet = PLANET_DEFS.find(p => p.id === id);
    if (!planet) return;

    if (transitionTimer) clearTimeout(transitionTimer);
    set({ isTransitioning: true });
    transitionTimer = setTimeout(() => set({ isTransitioning: false }), 800);

    if (id === 'sun') {
      set({
        currentTarget: 'sun',
        currentMoonTarget: null,
        panelOpen: false,
        cameraTarget: { x: 0, y: 0, z: 35 },
        cameraLookAt: { x: 0, y: 0, z: 0 },
        location: 'Earth Orbit',
      });
      return;
    }

    if (moonLabel) {
      const moon = planet.moons.find(m => m.label === moonLabel);
      if (!moon) return;

      // Use live moon position if available, otherwise fall back to initial angle
      const wx = moonWorldX[moonLabel] ?? planet.x + Math.cos(moon.initialAngle) * moon.dist;
      const wy = moonWorldY[moonLabel] ?? planet.y + Math.sin(moon.initialAngle) * moon.dist;

      set({
        currentTarget: id,
        currentMoonTarget: moonLabel,
        cameraTarget: { x: wx, y: wy, z: MOON_CAMERA_Z },
        cameraLookAt: { x: wx, y: wy, z: 0 },
        location: `${planet.label} / ${moonLabel}`,
        panelOpen: false,
      });
    } else {
      const cameraZ = PLANET_CAMERA_Z[id] ?? 8;
      set({
        currentTarget: id,
        currentMoonTarget: null,
        cameraTarget: { x: planet.x, y: planet.y, z: cameraZ },
        cameraLookAt: { x: planet.x, y: planet.y, z: 0 },
        location: `Approaching ${planet.label}`,
        panelOpen: false,
      });
    }
  },

  openPanel: (data) => set({ panelOpen: true, panelData: data }),
  closePanel: () => set({ panelOpen: false }),

  goNextPlanet: () => {
    const { currentTarget } = get();
    const idx = DESTINATIONS.indexOf(currentTarget as (typeof DESTINATIONS)[number]);
    if (idx < DESTINATIONS.length - 1) get().travelTo(DESTINATIONS[idx + 1]);
  },

  goPrevPlanet: () => {
    const { currentTarget } = get();
    const idx = DESTINATIONS.indexOf(currentTarget as (typeof DESTINATIONS)[number]);
    if (idx > 0) get().travelTo(DESTINATIONS[idx - 1]);
  },
}));
