export interface MoonDef {
  label: string;
  r: number;
  dist: number;
  initialAngle: number;
  color: string;
  speed: number;
}

export interface PlanetDef {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
  color: string;
  hasRings: boolean;
  cloudBands: boolean;
  isSun?: boolean;
  moons: MoonDef[];
}

// World-space positions scaled 1/50 from original canvas coords
// Y is negated because canvas Y is inverted (down=positive) vs Three.js (up=positive)
export const PLANET_DEFS: PlanetDef[] = [
  {
    id: 'sun', x: 0, y: 0, r: 1.8, label: 'Sun',
    color: '#ffd54f', hasRings: false, cloudBands: false, isSun: true,
    moons: [],
  },
  {
    id: 'mercury', x: -14, y: -4, r: 0.44, label: 'Mercury',
    color: '#b0bec5', hasRings: false, cloudBands: false,
    moons: [],
  },
  {
    id: 'venus', x: -9, y: 7, r: 0.76, label: 'Venus',
    color: '#ffcc80', hasRings: false, cloudBands: true,
    moons: [],
  },
  {
    id: 'earth', x: 2, y: 12, r: 0.84, label: 'Earth',
    color: '#42a5f5', hasRings: false, cloudBands: true,
    moons: [
      { label: 'Moon', r: 0.20, dist: 1.5, initialAngle: 0.8, color: '#8899aa', speed: 0.008 },
    ],
  },
  {
    id: 'mars', x: 18, y: 6, r: 0.64, label: 'Mars',
    color: '#ef5350', hasRings: false, cloudBands: false,
    moons: [
      { label: 'Phobos', r: 0.18, dist: 1.2, initialAngle: 0,   color: '#ef9a9a', speed: 0.009 },
      { label: 'Deimos', r: 0.14, dist: 2.0, initialAngle: 2.1, color: '#ffab91', speed: 0.006 },
      { label: 'Ares-1', r: 0.16, dist: 2.8, initialAngle: 4.2, color: '#ffcc02', speed: 0.004 },
    ],
  },
  {
    id: 'jupiter', x: 8, y: -14, r: 1.4, label: 'Jupiter',
    color: '#ff8f00', hasRings: false, cloudBands: true,
    moons: [
      { label: 'Io', r: 0.16, dist: 2.2, initialAngle: 1.2, color: '#ffe082', speed: 0.007 },
    ],
  },
  {
    id: 'saturn', x: 34, y: -8, r: 1.16, label: 'Saturn',
    color: '#ffd54f', hasRings: true, cloudBands: true,
    moons: [
      { label: 'Titan',     r: 0.28, dist: 2.6, initialAngle: 0.5,  color: '#80cbc4', speed: 0.006  },
      { label: 'Enceladus', r: 0.20, dist: 3.5, initialAngle: 2.0,  color: '#90caf9', speed: 0.005  },
      { label: 'Rhea',      r: 0.18, dist: 4.3, initialAngle: 3.8,  color: '#ce93d8', speed: 0.004  },
      { label: 'Dione',     r: 0.16, dist: 5.1, initialAngle: 5.2,  color: '#a5d6a7', speed: 0.003  },
      { label: 'Tethys',    r: 0.14, dist: 5.8, initialAngle: 1.0,  color: '#80deea', speed: 0.0025 },
      { label: 'Mimas',     r: 0.12, dist: 6.5, initialAngle: 3.0,  color: '#f48fb1', speed: 0.002  },
    ],
  },
  {
    id: 'uranus', x: 22, y: 18, r: 0.92, label: 'Uranus',
    color: '#80deea', hasRings: true, cloudBands: false,
    moons: [],
  },
  {
    id: 'neptune', x: 52, y: -4, r: 0.88, label: 'Neptune',
    color: '#5c8aff', hasRings: false, cloudBands: true,
    moons: [
      { label: 'Triton', r: 0.18, dist: 1.6, initialAngle: 1.5, color: '#7986cb', speed: 0.005 },
    ],
  },
];

export const DESTINATIONS = ['sun', 'mercury', 'mars', 'saturn', 'neptune'] as const;
export type DestinationId = (typeof DESTINATIONS)[number];

// Camera Z-distance when planet is focused
export const PLANET_CAMERA_Z: Record<string, number> = {
  sun: 35,
  mercury: 4,
  mars: 6,
  saturn: 12,
  neptune: 8,
};

export const MOON_CAMERA_Z = 3.5;
