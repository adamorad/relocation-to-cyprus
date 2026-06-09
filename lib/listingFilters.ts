import type { EnrichedListing, Offer } from "@/lib/listingsData";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BedFilter = "any" | "1" | "2" | "3" | "4+";
export type BathFilter = "any" | "1" | "2" | "3+";
export type SortKey = "price-asc" | "price-desc" | "title";
export type Tri = "any" | "yes" | "no";

export const BED_OPTIONS: ReadonlyArray<BedFilter> = ["any", "1", "2", "3", "4+"];
export const BATH_OPTIONS: ReadonlyArray<BathFilter> = ["any", "1", "2", "3+"];
export const ENERGY_OPTIONS = ["any", "A", "B", "C", "D"] as const;

// ── Price / area helpers ───────────────────────────────────────────────────────

export function parsePriceRange(s: string | null | undefined): [number, number] | null {
  if (!s) return null;
  const nums = Array.from(s.matchAll(/€?\s*([\d.,]+)/g))
    .map((m) => Number(m[1].replace(/[.,]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 1000);
  if (nums.length === 0) return null;
  return [Math.min(...nums), Math.max(...nums)];
}

export function offerBedCounts(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const b = Number(
      o.bedrooms ?? (o as { features?: Record<string, string> }).features?.bedrooms,
    );
    if (Number.isFinite(b) && b > 0) out.push(b);
  }
  return out;
}

export function offerBathCounts(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const b = Number(
      o.bathrooms ?? (o as { features?: Record<string, string> }).features?.bathrooms,
    );
    if (Number.isFinite(b) && b > 0) out.push(b);
  }
  return out;
}

export function offerLivingAreas(offers: Offer[]): number[] {
  const out: number[] = [];
  for (const o of offers) {
    const v =
      (o["living area"] as string | null | undefined) ??
      (o as { features?: Record<string, string> }).features?.living_area;
    const n = v ? Number((v.match(/[\d.]+/) ?? [""])[0]) : NaN;
    if (Number.isFinite(n) && n > 0) out.push(n);
  }
  return out;
}

export function listingMinPrice(l: EnrichedListing): number {
  const range = parsePriceRange(l.priceRange);
  if (range) return range[0];
  let min = Number.POSITIVE_INFINITY;
  for (const o of l.offers) {
    const p = parsePriceRange(o.price);
    if (p && p[0] < min) min = p[0];
  }
  return Number.isFinite(min) ? min : 0;
}

export function listingMaxPrice(l: EnrichedListing): number {
  const range = parsePriceRange(l.priceRange);
  if (range) return range[1];
  let max = 0;
  for (const o of l.offers) {
    const p = parsePriceRange(o.price);
    if (p && p[1] > max) max = p[1];
  }
  return max;
}

export function listingMaxLivingArea(l: EnrichedListing): number {
  const areas = offerLivingAreas(l.offers);
  return areas.length ? Math.max(...areas) : 0;
}

export function listingMinPricePerM2(l: EnrichedListing): number {
  let min = Number.POSITIVE_INFINITY;
  for (const o of l.offers) {
    const areaStr =
      (o["living area"] as string | null | undefined) ??
      (o as { features?: Record<string, string> }).features?.living_area;
    const area = areaStr ? Number((areaStr.match(/[\d.]+/) ?? [""])[0]) : NaN;
    if (!Number.isFinite(area) || area <= 0) continue;
    const p = parsePriceRange(o.price);
    if (p && p[0] > 0) min = Math.min(min, p[0] / area);
  }
  if (!Number.isFinite(min)) {
    const p = listingMinPrice(l);
    const a = listingMaxLivingArea(l);
    if (p > 0 && a > 0) min = p / a;
  }
  return Number.isFinite(min) ? min : 0;
}

// ── Spec helpers ──────────────────────────────────────────────────────────────

export function listingBuildingType(l: EnrichedListing): string {
  return (l.specs?.["Building type"] ?? "").trim();
}

export function specVal(l: EnrichedListing, key: string): string {
  return (l.specs?.[key] ?? "").trim();
}

export function uniqueSpec(listings: EnrichedListing[], key: string): string[] {
  const set = new Set<string>();
  for (const l of listings) {
    const v = specVal(l, key);
    if (v) set.add(v);
  }
  return Array.from(set).sort();
}

// ── Match helpers ─────────────────────────────────────────────────────────────

export function matchesBeds(l: EnrichedListing, bed: BedFilter): boolean {
  if (bed === "any") return true;
  const counts = offerBedCounts(l.offers);
  if (counts.length === 0) return false;
  if (bed === "4+") return counts.some((c) => c >= 4);
  return counts.includes(Number(bed));
}

export function matchesBaths(l: EnrichedListing, bath: BathFilter): boolean {
  if (bath === "any") return true;
  const counts = offerBathCounts(l.offers);
  if (counts.length === 0) return false;
  if (bath === "3+") return counts.some((c) => c >= 3);
  return counts.includes(Number(bath));
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatEuros(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  return `€${Math.round(n / 1_000)}k`;
}
