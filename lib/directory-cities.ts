/**
 * Entries per city for each directory, derived from the directory data (no
 * hand-kept numbers). Used by topic hubs so the `?city=` filter can show
 * "N in Limassol" and hide directories with nothing in that city. Only the
 * four city pages count; any other city value in the data is ignored.
 * "Island-wide" entries are counted separately.
 *
 * Server only: imports every directory dataset. Pass the result as props.
 */

import { ACCOUNTANTS, REGISTERED_OFFICE_PROVIDERS } from "./accountants";
import { AFTER_SCHOOL_ACTIVITIES } from "./after-school";
import { CULTURAL_VENUES } from "./art-culture";
import { NURSERIES } from "./childcare";
import { CO_LIVING_LISTINGS } from "./co-living";
import { COMMUNITY_GARDENS } from "./community-gardens";
import { COWORK_SPACES } from "./coworking";
import { EV_CHARGERS } from "./ev-charging";
import { EXPAT_COMMUNITIES } from "./expat-communities";
import { FARMERS_MARKETS } from "./farmers-markets";
import { FITNESS_VENUES } from "./fitness-wellness";
import { FOOD_PLACES } from "./food";
import { HALAL_KOSHER_VENUES } from "./halal-kosher";
import { IMMIGRATION_LAWYERS } from "./immigration-lawyers";
import { INTERNATIONAL_STORES } from "./international-grocery";
import { RENTAL_LISTINGS } from "./long-term-rentals";
import { MENTAL_HEALTH_PROVIDERS } from "./mental-health";
import { PROPERTY_LAWYERS } from "./property-lawyers";
import { PROPERTY_MANAGERS } from "./property-management";
import { TRANSPORT_INFO } from "./public-transport";
import { RELIGIOUS_SERVICES } from "./religious-services";
import { VIEW_BARS } from "./rooftop-bars";
import { SHOP_ENTRIES } from "./shopping";
import { SPECIALIST_DOCTORS } from "./specialist-doctors";
import { SPORTS_CLUBS } from "./sports-clubs";
import { STARTUP_VENUES } from "./startup-ecosystem";
import { SUMMER_CAMPS } from "./summer-camps";
import { CITY_NAME, CITY_SLUGS, type CitySlug } from "./topics";
import { VET_CLINICS } from "./veterinary";
import { VOLUNTEER_ORGS } from "./volunteering";
import { WINERIES } from "./wineries";

type Entry = { city?: string; cities?: ReadonlyArray<string> };

const DATA: Record<string, ReadonlyArray<Entry>> = {
	accountants: [...ACCOUNTANTS, ...REGISTERED_OFFICE_PROVIDERS],
	"after-school-activities": AFTER_SCHOOL_ACTIVITIES,
	"art-culture": CULTURAL_VENUES,
	"childcare-nurseries": NURSERIES,
	"co-living": CO_LIVING_LISTINGS,
	"community-gardens": COMMUNITY_GARDENS,
	coworking: COWORK_SPACES,
	"ev-charging": EV_CHARGERS,
	"expat-communities": EXPAT_COMMUNITIES,
	"farmers-markets": FARMERS_MARKETS,
	"fitness-wellness": FITNESS_VENUES,
	food: FOOD_PLACES,
	"halal-kosher": HALAL_KOSHER_VENUES,
	"immigration-lawyers": IMMIGRATION_LAWYERS,
	"international-grocery": INTERNATIONAL_STORES,
	"long-term-rentals": RENTAL_LISTINGS,
	"mental-health-services": MENTAL_HEALTH_PROVIDERS,
	"property-lawyers": PROPERTY_LAWYERS,
	"property-management": PROPERTY_MANAGERS,
	"public-transport": Object.keys(TRANSPORT_INFO).map((city) => ({ city })),
	"religious-services": RELIGIOUS_SERVICES,
	"rooftop-bars": VIEW_BARS,
	shopping: SHOP_ENTRIES,
	"specialist-doctors": SPECIALIST_DOCTORS,
	"sports-clubs": SPORTS_CLUBS,
	"startup-ecosystem": STARTUP_VENUES,
	"summer-camps": SUMMER_CAMPS,
	"veterinary-services": VET_CLINICS,
	volunteering: VOLUNTEER_ORGS,
	wineries: WINERIES,
};

export type CityCounts = Record<CitySlug, number> & { islandWide: number };

const NAME_TO_SLUG = new Map<string, CitySlug>(
	CITY_SLUGS.map((s) => [CITY_NAME[s], s]),
);

/** Entries per city slug for one directory, or null when there is no data. */
export function directoryCityCounts(slug: string): CityCounts | null {
	const rows = DATA[slug];
	if (!rows) return null;
	const counts: CityCounts = {
		limassol: 0,
		paphos: 0,
		larnaca: 0,
		"ayia-napa": 0,
		islandWide: 0,
	};
	for (const row of rows) {
		const names = row.cities ?? (row.city ? [row.city] : []);
		for (const n of names) {
			if (n === "Island-wide") counts.islandWide++;
			const c = NAME_TO_SLUG.get(n);
			if (c) counts[c]++;
		}
	}
	return counts;
}
