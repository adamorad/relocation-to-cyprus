// Outline of the Republic of Cyprus (south of the UN buffer zone — the
// Greek-Cypriot administered area). The Turkish-occupied north (Karpas
// peninsula, Kyrenia/Girne, Famagusta/Gazimağusa) is deliberately excluded.
// Refined to follow the real coastline more closely. Clockwise from the NW
// tip at Cape Arnauti (Akamas).
export const CYPRUS_OUTLINE: ReadonlyArray<[number, number]> = [
  // ── North coast (Akamas peninsula → Kokkina) ────────────────────────────
  [32.27, 35.10],
  [32.32, 35.07],
  [32.42, 35.04],
  [32.52, 35.04],
  [32.60, 35.04],
  [32.66, 35.06],
  // ── Buffer zone (Green Line) running E through Mesaoria + Nicosia ──────
  [32.78, 35.05],
  [32.92, 35.07],
  [33.05, 35.12],
  [33.18, 35.16],
  [33.28, 35.20],
  [33.40, 35.18],
  [33.52, 35.15],
  [33.65, 35.10],
  [33.78, 35.06],
  [33.90, 35.05],
  [33.97, 35.05],
  [34.00, 35.05],
  // ── Famagusta district free area: east coast + Cape Greco ──────────────
  [34.05, 35.04],
  [34.07, 35.00],
  [34.08, 34.98],
  [34.06, 34.96],
  [34.02, 34.95],
  [33.97, 34.95],
  [33.92, 34.93],
  // ── South coast: Larnaca Bay → Limassol → Akrotiri ─────────────────────
  [33.85, 34.90],
  [33.74, 34.89],
  [33.62, 34.87],
  [33.50, 34.82],
  [33.36, 34.78],
  [33.22, 34.72],
  [33.10, 34.69],
  [33.05, 34.68],
  [33.00, 34.65],
  [32.98, 34.58],
  [32.93, 34.59],
  [32.88, 34.61],
  [32.85, 34.65],
  [32.78, 34.68],
  [32.68, 34.69],
  [32.55, 34.70],
  // ── South + west coasts: Paphos → Akamas ───────────────────────────────
  [32.45, 34.74],
  [32.40, 34.78],
  [32.35, 34.83],
  [32.32, 34.90],
  [32.30, 34.97],
  [32.28, 35.05],
];

export type City = {
  name: string;
  lon: number;
  lat: number;
  capital?: boolean;
  /** RGB triplet for this city's district color in the procedural texture. */
  region: readonly [number, number, number];
  /** Label nudge in scene-x / scene-z units; used to separate overlapping cities. */
  labelOffset?: readonly [number, number];
};

export const CITIES: ReadonlyArray<City> = [
  // Illustrated travel-poster palette inspired by reference image —
  // soft pale sea, warm orange west, deep indigo centre, vivid greens
  // and bright teal on the south/east coast.
  { name: "Nicosia",   lon: 33.36, lat: 35.13, capital: true, region: [88, 103, 176] },   // #5867b0 indigo
  { name: "Limassol",  lon: 33.04, lat: 34.71,                region: [45, 157, 78]  },   // #2d9d4e vivid green
  { name: "Larnaca",   lon: 33.62, lat: 34.93,                region: [46, 187, 193] },   // #2ebbc1 teal
  { name: "Paphos",    lon: 32.42, lat: 34.80,                region: [233, 112, 49] },   // #e97031 sunset orange
  { name: "Ayia Napa", lon: 34.00, lat: 34.99,                region: [69, 168, 71]  },   // #45a847 kelly green
];

export const CYPRUS_CENTER = { lon: 33.4, lat: 35.15 };
export const MAP_SCALE = 4;

export function project(lon: number, lat: number): [number, number] {
  return [
    (lon - CYPRUS_CENTER.lon) * MAP_SCALE,
    (lat - CYPRUS_CENTER.lat) * MAP_SCALE,
  ];
}

export function unproject(sceneX: number, sceneZ: number): [number, number] {
  // Scene (x, z) → (lon, lat). Note scene z = -(project y), so lat uses -sceneZ.
  return [
    CYPRUS_CENTER.lon + sceneX / MAP_SCALE,
    CYPRUS_CENTER.lat - sceneZ / MAP_SCALE,
  ];
}

// ── Districts ─────────────────────────────────────────────────────────────
// Hand-traced approximations of the real Cyprus districts (Greek-Cypriot
// administered area). The Famagusta district free area is split into Ayia
// Napa (south/coastal) and Protaras (north/inland) so each is selectable.
// On point-in-polygon checks, Ayia Napa is tested before Protaras so the
// split line is well-defined where they touch.

export type District = {
  name: string;
  outline: ReadonlyArray<[number, number]>;
};

export const DISTRICTS: ReadonlyArray<District> = [
  {
    name: "Paphos",
    // Outer (sea-facing) edges of this polygon are inflated slightly so all
    // coastal listings (Paphos Universal ~34.76 lat, Argaka ~35.09 lat) land
    // inside it instead of floating in the sea.
    outline: [
      [32.25, 35.13],
      [32.40, 35.10],
      [32.55, 35.08],
      [32.66, 35.08],
      [32.66, 34.92],
      [32.80, 34.82],
      [32.85, 34.74],
      [32.78, 34.66],
      [32.50, 34.68],
      [32.36, 34.74],
      [32.30, 34.84],
      [32.26, 35.00],
    ],
  },
  {
    name: "Limassol",
    outline: [
      [32.85, 34.74],
      [32.95, 34.82],
      [33.05, 34.88],
      [33.20, 34.86],
      [33.22, 34.70],
      [33.20, 34.64],
      [32.98, 34.56],
      [32.88, 34.59],
      [32.84, 34.63],
      [32.78, 34.66],
    ],
  },
  {
    name: "Larnaca",
    // S edge pushed south to cover Kiti (~34.85 lat) and Perivolia (~34.83 lat).
    outline: [
      [33.20, 34.86],
      [33.20, 34.96],
      [33.50, 34.98],
      [33.78, 35.00],
      [33.86, 34.96],
      [33.86, 34.88],
      [33.65, 34.84],
      [33.45, 34.78],
      [33.30, 34.74],
      [33.22, 34.70],
    ],
  },
  {
    name: "Nicosia",
    outline: [
      [32.66, 35.08],
      [32.80, 35.07],
      [32.95, 35.09],
      [33.10, 35.14],
      [33.22, 35.18],
      [33.32, 35.22],
      [33.45, 35.20],
      [33.55, 35.16],
      [33.68, 35.12],
      [33.80, 35.08],
      [33.86, 35.05],
      [33.86, 34.96],
      [33.78, 35.00],
      [33.50, 34.98],
      [33.20, 34.96],
      [33.20, 34.86],
      [33.05, 34.88],
      [32.95, 34.82],
      [32.85, 34.74],
      [32.80, 34.82],
      [32.66, 34.92],
    ],
  },
  // Whole Famagusta free area (Ayia Napa, Paralimni, Protaras, Kapparis).
  {
    name: "Ayia Napa",
    outline: [
      [33.86, 35.06],
      [33.96, 35.08],
      [34.02, 35.08],
      [34.07, 35.06],
      [34.10, 35.02],
      [34.10, 34.98],
      [34.08, 34.95],
      [34.02, 34.94],
      [33.97, 34.93],
      [33.92, 34.91],
      [33.86, 34.88],
    ],
  },
];

/**
 * Standard ray-cast point-in-polygon. Polygons should not be closed (do not
 * repeat the first vertex at the end).
 */
export function pointInPolygon(
  x: number,
  y: number,
  polygon: ReadonlyArray<readonly [number, number]>,
): boolean {
  let inside = false;
  const n = polygon.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** District whose polygon contains (lon, lat), or null if none. */
export function districtForLonLat(lon: number, lat: number): string | null {
  for (const d of DISTRICTS) {
    if (pointInPolygon(lon, lat, d.outline)) return d.name;
  }
  return null;
}
