/**
 * Adventure Activities section content.
 *
 * Outdoor adventure parks, ropes courses, team-building and similar outdoor
 * activity providers in Cyprus.
 */

import type { City } from "@/lib/food";

export type { City } from "@/lib/food";

export type AdventureActivity = {
	name: string;
	city?: City;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
};

export const ADVENTURE_ACTIVITIES: ReadonlyArray<AdventureActivity> = [];
