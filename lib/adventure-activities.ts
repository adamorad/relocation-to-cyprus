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

// Adventure Mountain Park: free listing (REA-279). Values from https://adventuremountainpark.com/en/contact (28 Oct 2026),
// use approved by owner; the second phone (+357 99 674126) is left out because the phone field is a single tel: link.
export const ADVENTURE_ACTIVITIES: ReadonlyArray<AdventureActivity> = [
	{
		name: "Adventure Mountain Park",
		city: "Limassol",
		address: "Doxa Si o Theos, Kyperounda, Limassol, Cyprus",
		phone: "+357 97 772177",
		email: "info@adventuremountainpark.com",
		website: "https://adventuremountainpark.com/",
	},
];
