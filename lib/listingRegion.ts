/**
 * Region classification for listings: the single rule that decides which
 * city a listing belongs to and whether it is hidden. Pure, no data imports,
 * so it is shared by lib/listingsData.ts (pages and client tools), the
 * build-time guard in lib/listings.ts and scripts/gen-visible-listings.mjs.
 */
import {
	CITIES,
	districtForLonLat,
	HIDDEN_CLASSIFIER_CITIES,
	project,
} from "./cyprusData";

// Classifier positions include the hidden (non-public) cities so that listings
// near them are classified correctly and then hidden, never misassigned.
// Order matches the original city list (hidden entry first).
const CITY_SCENE_POSITIONS = [...HIDDEN_CLASSIFIER_CITIES, ...CITIES].map(
	(c) => {
		const [px, py] = project(c.lon, c.lat);
		return { name: c.name, x: px, z: -py };
	},
);

function nearestCity(x: number, z: number): string {
	let bestName = CITY_SCENE_POSITIONS[0].name;
	let bestD = Number.POSITIVE_INFINITY;
	for (const c of CITY_SCENE_POSITIONS) {
		const dx = c.x - x;
		const dz = c.z - z;
		const d = dx * dx + dz * dz;
		if (d < bestD) {
			bestD = d;
			bestName = c.name;
		}
	}
	return bestName;
}

/**
 * Owner rule: listings classified into a hidden classifier city
 * (lib/cyprusData.ts HIDDEN_CLASSIFIER_CITIES) are hidden from every page.
 */
const HIDDEN_REGION_CITIES: ReadonlySet<string> = new Set(
	HIDDEN_CLASSIFIER_CITIES.map((c) => c.name),
);

export function isHiddenRegion(regionCity: string): boolean {
	return HIDDEN_REGION_CITIES.has(regionCity);
}

export type Placed = {
	regionCity: string;
	/** [x, z] in three.js scene space. */
	scenePos: readonly [number, number];
};

/** Real district first; nearest city for points just outside every district polygon. */
export function placeListing(lng: number, lat: number): Placed {
	const [px, py] = project(lng, lat);
	const x = px;
	const z = -py;
	const regionCity = districtForLonLat(lng, lat) ?? nearestCity(x, z);
	return { regionCity, scenePos: [x, z] as const };
}

/** True when a raw listing record is shown on the site (has coordinates, not hidden). */
export function isVisibleRecord(l: { lat?: unknown; lng?: unknown }): boolean {
	if (typeof l.lat !== "number" || typeof l.lng !== "number") return false;
	return !isHiddenRegion(placeListing(l.lng, l.lat).regionCity);
}
