"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import { Billboard, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  CITIES,
  CYPRUS_OUTLINE,
  DISTRICTS,
  districtForLonLat,
  project,
  unproject,
  type District,
} from "@/lib/cyprusData";
import { LISTINGS_BY_REGION, type EnrichedListing } from "@/lib/listingsData";

const ISLAND_DEPTH = 0.35;
const SIDE_WALL_COLOR = "#f5e0c2";
const SEA_COLOR = "#c8d5dc";
const FALLBACK_GROUND: [number, number, number] = [200, 180, 140];
const OVERVIEW_CAMERA = new THREE.Vector3(3, 8, 11);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);

// ── Geometry helpers ──────────────────────────────────────────────────────

const ISLAND_BBOX = (() => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [lon, lat] of CYPRUS_OUTLINE) {
    const [x, y] = project(lon, lat);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };
})();

// Map district name → region RGB by looking it up on the matching city.
const REGION_COLOR_BY_DISTRICT: Record<string, readonly [number, number, number]> = (() => {
  const m: Record<string, readonly [number, number, number]> = {};
  for (const c of CITIES) m[c.name] = c.region;
  return m;
})();

function hashNoise(x: number, y: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function fbm(x: number, y: number): number {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * hashNoise(x * f, y * f);
    a *= 0.5;
    f *= 2;
  }
  return v;
}

function createRegionTexture(): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get 2D canvas context");
  const img = ctx.createImageData(W, H);

  // Precompute bbox per district for cheap reject.
  const districtBoxes = DISTRICTS.map((d) => {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const [lon, lat] of d.outline) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    return { d, minLon, maxLon, minLat, maxLat };
  });

  for (let py = 0; py < H; py++) {
    const projY = ISLAND_BBOX.minY + (1 - py / (H - 1)) * ISLAND_BBOX.h;
    const lat = (projY) / 4 + 35.15; // inverse of (lat - 35.15) * 4 = projY
    for (let px = 0; px < W; px++) {
      const projX = ISLAND_BBOX.minX + (px / (W - 1)) * ISLAND_BBOX.w;
      const lon = projX / 4 + 33.4;

      // Find the district this pixel belongs to (first match wins).
      let color: readonly [number, number, number] = FALLBACK_GROUND;
      let foundDistrict: string | null = null;
      for (const { d, minLon, maxLon, minLat, maxLat } of districtBoxes) {
        if (lon < minLon || lon > maxLon || lat < minLat || lat > maxLat) continue;
        if (pointInPolygonLite(lon, lat, d.outline)) {
          color = REGION_COLOR_BY_DISTRICT[d.name] ?? FALLBACK_GROUND;
          foundDistrict = d.name;
          break;
        }
      }

      const low = fbm(px * 0.012, py * 0.012);
      const grain = hashNoise(px * 0.7, py * 0.7);
      const shade = (0.78 + 0.32 * low) * (0.94 + 0.12 * grain);

      // Subtle dark border where this pixel is close to a district boundary.
      const edgeShade = foundDistrict
        ? edgeFactor(lon, lat, foundDistrict)
        : 1;
      const m = shade * edgeShade;

      const i = (py * W + px) * 4;
      img.data[i] = Math.min(255, color[0] * m);
      img.data[i + 1] = Math.min(255, color[1] * m);
      img.data[i + 2] = Math.min(255, color[2] * m);
      img.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Area-weighted polygon centroid via the shoelace formula. Gives the true
 * "visual centre" for non-uniform polygons; the simple vertex average drifts
 * toward dense-vertex areas (e.g. Akamas tip pulling Paphos west).
 */
function polygonCentroid(
  poly: ReadonlyArray<readonly [number, number]>,
): [number, number] {
  let cx = 0;
  let cy = 0;
  let area2 = 0;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = poly[i];
    const [x1, y1] = poly[(i + 1) % n];
    const cross = x0 * y1 - x1 * y0;
    area2 += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  // area2 = 2 * signed area; fall back to vertex average if area is degenerate.
  if (Math.abs(area2) < 1e-9) {
    let sx = 0;
    let sy = 0;
    for (const [x, y] of poly) {
      sx += x;
      sy += y;
    }
    return [sx / n, sy / n];
  }
  return [cx / (3 * area2), cy / (3 * area2)];
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

/** Build a CanvasTexture of a sticker-pill label and report its pixel size. */
function makePillTexture(
  name: string,
  count: number,
  rgb: readonly [number, number, number],
  small: boolean,
): { texture: THREE.CanvasTexture; width: number; height: number } {
  const dpr = 3;
  const nameFont = `700 ${small ? 20 : 28}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const countFont = `500 ${small ? 16 : 22}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) throw new Error("no 2d ctx");
  measure.font = nameFont;
  const nameW = measure.measureText(name).width;
  measure.font = countFont;
  const countText = count > 0 ? `· ${count}` : "";
  const countW = countText ? measure.measureText(countText).width : 0;

  const dotR = small ? 6 : 9;
  const padX = small ? 14 : 20;
  const gap = small ? 8 : 12;
  const totalW =
    padX + dotR * 2 + gap + nameW + (countText ? gap + countW : 0) + padX;
  const h = small ? 36 : 48;
  // Reserve a 12px halo around the pill for the shadow.
  const halo = 16;
  const W = Math.ceil(totalW) + halo * 2;
  const H = h + halo * 2;

  const canvas = document.createElement("canvas");
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d ctx");
  ctx.scale(dpr, dpr);

  const x0 = halo;
  const y0 = halo;

  ctx.save();
  ctx.shadowColor = "rgba(15, 23, 42, 0.25)";
  ctx.shadowBlur = small ? 8 : 14;
  ctx.shadowOffsetY = small ? 2 : 4;
  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  roundedRect(ctx, x0, y0, totalW, h, h / 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
  ctx.lineWidth = 1;
  roundedRect(ctx, x0, y0, totalW, h, h / 2);
  ctx.stroke();

  ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  ctx.beginPath();
  ctx.arc(x0 + padX + dotR, y0 + h / 2, dotR, 0, Math.PI * 2);
  ctx.fill();

  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = nameFont;
  ctx.fillStyle = "#0f172a";
  const nameX = x0 + padX + dotR * 2 + gap;
  ctx.fillText(name, nameX, y0 + h / 2);

  if (countText) {
    ctx.font = countFont;
    ctx.fillStyle = "#64748b";
    ctx.fillText(countText, nameX + nameW + gap, y0 + h / 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return { texture: tex, width: W, height: H };
}

const PILL_WORLD_HEIGHT = 0.36; // scene units; pill scales to this height
const PILL_TINY_WORLD_HEIGHT = 0.24;

function RegionPill3D({ district }: { district: District }) {
  const [clon, clat] = useMemo(() => polygonCentroid(district.outline), [district]);
  const [px, py] = useMemo(() => project(clon, clat), [clon, clat]);
  // No more tiny pills — Famagusta free area is now one region.
  const tiny = false;
  const count = LISTINGS_BY_REGION[district.name]?.length ?? 0;
  const rgb = useMemo(() => {
    const c = CITIES.find((c) => c.name === district.name);
    return c?.region ?? ([148, 163, 184] as const);
  }, [district.name]);

  const { tex, planeW, planeH } = useMemo(() => {
    const { texture, width, height } = makePillTexture(
      district.name,
      count,
      rgb,
      tiny,
    );
    const worldH = tiny ? PILL_TINY_WORLD_HEIGHT : PILL_WORLD_HEIGHT;
    const worldW = (width / height) * worldH;
    return { tex: texture, planeW: worldW, planeH: worldH };
  }, [district.name, count, rgb, tiny]);

  // Visible stem reaches all the way to the underside of the pill graphic
  // (planes also include halo padding around the pill, so the stem extends
  // INTO that halo area to look like it touches the bottom of the pill).
  const stemTopY = ISLAND_DEPTH + 0.92;
  const stemH = stemTopY - ISLAND_DEPTH;
  const pillCenterY = stemTopY + planeH / 2 - 0.16; // overlap stem into halo

  return (
    <group position={[px, 0, -py]}>
      {/* Thin stem connecting ground to the floating pill. */}
      <mesh position={[0, ISLAND_DEPTH + stemH / 2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, stemH, 6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Dot anchor on the ground. */}
      <mesh position={[0, ISLAND_DEPTH + 0.002, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* The floating pill plane — always faces the camera. */}
      <Billboard position={[0, pillCenterY, 0]}>
        <mesh>
          <planeGeometry args={[planeW, planeH]} />
          <meshBasicMaterial
            map={tex}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

// Inlined for speed inside the texture loop.
function pointInPolygonLite(
  x: number,
  y: number,
  polygon: ReadonlyArray<readonly [number, number]>,
): boolean {
  let inside = false;
  const n = polygon.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}

// Cheap "near boundary?" check: shoots tiny perturbations to detect if pixel
// is close to the polygon edge. Returns a multiplier (1 = no darken).
function edgeFactor(lon: number, lat: number, districtName: string): number {
  const eps = 0.004;
  const sameAt = (l: number, la: number) =>
    districtForLonLat(l, la) === districtName;
  if (
    sameAt(lon + eps, lat) &&
    sameAt(lon - eps, lat) &&
    sameAt(lon, lat + eps) &&
    sameAt(lon, lat - eps)
  ) {
    return 1;
  }
  return 0.65;
}

const ISLAND_UV_GENERATOR: THREE.UVGenerator = {
  generateTopUV(_geometry, vertices, indexA, indexB, indexC) {
    const u = (vx: number) => (vx - ISLAND_BBOX.minX) / ISLAND_BBOX.w;
    const v = (vy: number) => (vy - ISLAND_BBOX.minY) / ISLAND_BBOX.h;
    return [
      new THREE.Vector2(u(vertices[indexA * 3]), v(vertices[indexA * 3 + 1])),
      new THREE.Vector2(u(vertices[indexB * 3]), v(vertices[indexB * 3 + 1])),
      new THREE.Vector2(u(vertices[indexC * 3]), v(vertices[indexC * 3 + 1])),
    ];
  },
  generateSideWallUV() {
    return [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 0),
    ];
  },
};

function useIslandGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    CYPRUS_OUTLINE.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: ISLAND_DEPTH,
      bevelEnabled: true,
      bevelSize: 0.04,
      bevelThickness: 0.05,
      bevelSegments: 4,
      curveSegments: 1,
      UVGenerator: ISLAND_UV_GENERATOR,
    });
    geom.computeVertexNormals();
    return geom;
  }, []);
}

function cityScenePos(city: { lon: number; lat: number }): [number, number] {
  const [px, py] = project(city.lon, city.lat);
  return [px, -py];
}

// ── Camera animation ──────────────────────────────────────────────────────

type ViewState =
  | { mode: "overview" }
  | { mode: "region"; city: string; center: THREE.Vector3 };

const TOP_OVERVIEW_CAMERA = new THREE.Vector3(0, 13, 0.001);

/**
 * Camera distances are calibrated for a desktop ~1.7 aspect. On portrait
 * mobile (aspect ~0.5) the same camera shows only a slim middle slice of
 * the island. We scale the position outward when the viewport is narrower
 * than the calibration aspect so the island always fits horizontally.
 */
const CALIB_ASPECT = 1.7;

function aspectScale(aspect: number): number {
  if (aspect >= CALIB_ASPECT) return 1;
  // Push camera back proportionally to how narrow the viewport is.
  return CALIB_ASPECT / Math.max(aspect, 0.4);
}

function viewDestination(
  view: ViewState,
  viewMode: "default" | "top",
  aspect: number,
): { position: THREE.Vector3; target: THREE.Vector3 } {
  // Portrait mobile (aspect < 1) is so narrow that no amount of pulling the
  // standard 3/4 camera back fits the full east-west island. Switch to a
  // near-top-down camera with a small south tilt on portrait viewports;
  // the user can still flip to the 3D-toggle if they want.
  const portrait = aspect < 1;

  if (view.mode === "overview") {
    if (viewMode === "top") {
      const h = portrait ? 18 : 13;
      return {
        position: new THREE.Vector3(0, h, 0.001),
        target: OVERVIEW_TARGET.clone(),
      };
    }
    if (portrait) {
      // Portrait phones: pull far back + high so the full E-W island fits
      // the narrow viewport. Reads as a near-top-down map view.
      return {
        position: new THREE.Vector3(0, 30, 10),
        target: OVERVIEW_TARGET.clone(),
      };
    }
    return {
      position: OVERVIEW_CAMERA.clone(),
      target: OVERVIEW_TARGET.clone(),
    };
  }
  const target = view.center.clone();
  if (viewMode === "top") {
    const h = portrait ? 7.5 : 5.5;
    const position = view.center.clone().add(new THREE.Vector3(0, h, 0.001));
    return { position, target };
  }
  if (portrait) {
    // Tighter region zoom — the camera is already mostly top-down on mobile
    // so we keep that vibe when drilling into a region.
    const position = view.center.clone().add(new THREE.Vector3(0, 9, 3));
    return { position, target };
  }
  const position = view.center
    .clone()
    .add(new THREE.Vector3(0.3, 3.4, 4.5));
  return { position, target };
}

/**
 * Animates the camera + OrbitControls target toward `view`'s destination, then
 * RELEASES control back to OrbitControls once it's settled. Without the
 * release the per-frame lerp fights the user's scroll/drag — that's the
 * "zoom is locked" bug.
 */
function CameraRig({
  view,
  resetTick,
  viewMode,
  controlsRef,
}: {
  view: ViewState;
  resetTick: number;
  viewMode: "default" | "top";
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(size.height, 1);
  const dest = useMemo(
    () => viewDestination(view, viewMode, aspect),
    [view, viewMode, aspect],
  );
  const transitioning = useRef(true);

  // Re-trigger a transition whenever the destination changes OR the parent
  // bumps the reset tick (e.g. user clicked sea after manually rotating the
  // camera at overview).
  useEffect(() => {
    transitioning.current = true;
  }, [dest, resetTick]);

  useFrame((_, dt) => {
    if (!transitioning.current) return;
    const k = 1 - Math.exp(-dt * 4.5);
    camera.position.lerp(dest.position, k);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(dest.target, k);
      controlsRef.current.update();
    }
    const posDist = camera.position.distanceTo(dest.position);
    const tgtDist = controlsRef.current
      ? controlsRef.current.target.distanceTo(dest.target)
      : 0;
    if (posDist < 0.04 && tgtDist < 0.04) {
      transitioning.current = false;
    }
  });
  return null;
}

// ── Scene pieces ──────────────────────────────────────────────────────────

type IslandProps = {
  texture: THREE.Texture;
  onPick: (e: ThreeEvent<MouseEvent>) => void;
  onHover: (e: ThreeEvent<PointerEvent>) => void;
  onLeave: () => void;
};

function Island({ texture, onPick, onHover, onLeave }: IslandProps) {
  const geometry = useIslandGeometry();
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={geometry}
      castShadow
      receiveShadow
      onClick={onPick}
      onPointerMove={onHover}
      onPointerOut={onLeave}
    >
      {/* Top face: meshBasic so region colours render at their exact baked
        hex values, undimmed by scene lighting. */}
      <meshBasicMaterial attach="material-0" map={texture} toneMapped={false} />
      <meshStandardMaterial
        attach="material-1"
        color={SIDE_WALL_COLOR}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Sea({ onClick }: { onClick: () => void }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <circleGeometry args={[60, 64]} />
      {/* meshBasicMaterial ignores scene lighting, so the rendered colour is
        exactly SEA_COLOR — no PBR darkening. */}
      <meshBasicMaterial color={SEA_COLOR} toneMapped={false} />
    </mesh>
  );
}

// ── Scene wrapper ─────────────────────────────────────────────────────────

type SceneProps = {
  selectedRegion: string | null;
  selectedListing: EnrichedListing | null;
  cameraResetTick: number;
  viewMode: "default" | "top";
  onSelectRegion: (city: string | null) => void;
  onSelectListing: (listing: EnrichedListing | null) => void;
  onHoverRegion: (city: string | null) => void;
};

function Scene({
  selectedRegion,
  cameraResetTick,
  viewMode,
  onSelectRegion,
  onSelectListing,
  onHoverRegion,
}: SceneProps) {
  const texture = useMemo(() => createRegionTexture(), []);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const view: ViewState = useMemo(() => {
    if (!selectedRegion) return { mode: "overview" };
    const city = CITIES.find((c) => c.name === selectedRegion);
    if (!city) return { mode: "overview" };
    const [cx, cz] = cityScenePos(city);
    return {
      mode: "region",
      city: city.name,
      center: new THREE.Vector3(cx, 0, cz),
    };
  }, [selectedRegion]);

  const handleIslandPick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const [lon, lat] = unproject(e.point.x, e.point.z);
    const district = districtForLonLat(lon, lat);
    if (district) {
      onSelectRegion(district);
      return;
    }
    // Outside any district — fall back to nearest city.
    let bestName = CITIES[0].name;
    let bestD = Number.POSITIVE_INFINITY;
    for (const c of CITIES) {
      const [cx, cz] = cityScenePos(c);
      const dx = cx - e.point.x;
      const dz = cz - e.point.z;
      const d = dx * dx + dz * dz;
      if (d < bestD) {
        bestD = d;
        bestName = c.name;
      }
    }
    onSelectRegion(bestName);
  };

  const handleSeaClick = () => {
    onSelectRegion(null);
    onSelectListing(null);
  };

  const lastHovered = useRef<string | null>(null);
  const handleIslandMove = (e: ThreeEvent<PointerEvent>) => {
    const [lon, lat] = unproject(e.point.x, e.point.z);
    const d = districtForLonLat(lon, lat);
    if (d !== lastHovered.current) {
      lastHovered.current = d;
      onHoverRegion(d);
      document.body.style.cursor = d ? "pointer" : "auto";
    }
  };
  const handleIslandLeave = () => {
    if (lastHovered.current !== null) {
      lastHovered.current = null;
      onHoverRegion(null);
      document.body.style.cursor = "auto";
    }
  };

  return (
    <>
      <Sky sunPosition={[10, 12, 5]} turbidity={2} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.7} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[10, 14, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Sea onClick={handleSeaClick} />
      <Island
        texture={texture}
        onPick={handleIslandPick}
        onHover={handleIslandMove}
        onLeave={handleIslandLeave}
      />

      {DISTRICTS.map((d) => (
        <RegionPill3D key={d.name} district={d} />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        minDistance={2.5}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.1}
      />
      <CameraRig
        view={view}
        resetTick={cameraResetTick}
        viewMode={viewMode}
        controlsRef={controlsRef}
      />
    </>
  );
}

// ── Public entry ──────────────────────────────────────────────────────────

export type CyprusMapProps = SceneProps;

export default function CyprusMap(props: CyprusMapProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 8, 11], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
