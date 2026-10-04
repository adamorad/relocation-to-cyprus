/**
 * Home services directory: tradespeople with their own website.
 *
 * Each business was checked on its own website on 4 October 2026: site live,
 * phone and city shown there, trade shown there. Phones are copied exactly as
 * printed on the business site. Listings are not endorsements.
 */

export const CHECKED_AT = "2026-10-04";

export type Trade =
	| "Plumbers"
	| "Electricians"
	| "Air conditioning"
	| "Handyman"
	| "Locksmiths"
	| "Pest control"
	| "Cleaning and key holding";

export type City = "Limassol" | "Paphos" | "Larnaca";

export type HomeService = {
	name: string;
	trade: Trade;
	/** A business appears under every city listed here. */
	cities: ReadonlyArray<City>;
	website: string;
	/** Exactly as shown on the business website. */
	phone: string;
};

export const ALL_TRADES: ReadonlyArray<Trade> = [
	"Plumbers",
	"Electricians",
	"Air conditioning",
	"Handyman",
	"Locksmiths",
	"Pest control",
	"Cleaning and key holding",
];

export const ALL_CITIES: ReadonlyArray<City> = [
	"Limassol",
	"Paphos",
	"Larnaca",
];

const row = (
	name: string,
	trade: Trade,
	cities: ReadonlyArray<City>,
	website: string,
	phone: string,
): HomeService => ({ name, trade, cities, website, phone });

export const HOME_SERVICES: ReadonlyArray<HomeService> = [
	row("Alexandrou Plumbing", "Plumbers", ["Limassol"], "https://www.alexandrouplumbing.com/", "+357 99 492127"),
	row("Limassol Plumbers", "Plumbers", ["Limassol"], "https://limassolplumbers.com/", "+35797809104"),
	row("Plumbair Plumbing & Air Conditioning", "Plumbers", ["Limassol"], "https://plumbairservices.com/", "+357 96 301520"),
	row("Chillout HomeServe", "Plumbers", ["Larnaca", "Limassol"], "https://chillouthomeserve.com/", "+357 22 353550"),
	row("ConstruX", "Plumbers", ["Larnaca", "Limassol"], "https://construx-cyprus.com/", "+357 99 857 807"),
	row("Build in Cyprus (BuildInCyprus Project Management & More)", "Plumbers", ["Paphos"], "https://buildincyprus.com/", "+357 96 922 275"),
	row("Cyprus HomeCare", "Plumbers", ["Paphos"], "https://www.cyprushomecare.com/", "00357-99900696"),
	row("Green Air Ltd", "Plumbers", ["Paphos"], "https://www.greenair-cy.com/", "+357 26 941 555"),
	row("NeolithicStones", "Plumbers", ["Paphos"], "https://neolithicstones.com/", "+357 99 845 410"),
	row("Lofet LTD (The Danish Plumbers)", "Plumbers", ["Larnaca", "Paphos"], "https://www.lofet.ltd/", "+357 95 933 266"),
	row("Nicks Maintenance Services", "Plumbers", ["Paphos"], "https://www.n-m-services.eu/", "(00357) 99009798"),
	row("ML Plumbing Services (Plumbing Services Larnaca)", "Plumbers", ["Larnaca"], "https://mlplumber.com/", "+357 99688192"),
	row("M.J.Q.A. Plumbing services LTD", "Plumbers", ["Larnaca"], "https://www.mjqaltd.com/", "+35794000040"),
	row("BluePipe Plumbing Services", "Plumbers", ["Larnaca"], "https://plumberlarnaca.com/", "+357 97 900 110"),
	row("Genika Maintenance & Cleaning", "Plumbers", ["Larnaca"], "https://genikaservices.com/", "94 210 787"),
	row("ELIRGO", "Electricians", ["Limassol"], "https://www.elirgo.com/", "+357 9922 6419"),
	row("Limassol Electrician 24/7 (Heliosmac Solar Enterprises Ltd)", "Electricians", ["Larnaca", "Limassol", "Paphos"], "https://www.limassolelectrician.com/", "+357 94449354"),
	row("ESS the Electrician", "Electricians", ["Limassol"], "https://electriciancyprus.wixsite.com/limassol", "95-505 510"),
	row("Nicks Maintenance Services", "Electricians", ["Paphos"], "https://www.n-m-services.eu/", "(00357) 99009798"),
	row("SAE Power Enterprises", "Electricians", ["Paphos"], "https://www.saepowerenterprises.com/", "(+357) 26812016"),
	row("S Rush Electrical Ltd.", "Electricians", ["Larnaca"], "https://www.electricianlarnaca.com/", "00357 9900 5944"),
	row("ZeroKlima Services Cyprus", "Air conditioning", ["Limassol"], "https://www.zeroklima.com.cy/", "(+357) 7000 69 00"),
	row("Cooling Cyprus", "Air conditioning", ["Larnaca", "Limassol", "Paphos"], "https://www.cooling-cyprus.com/", "+357 97 487002 (Sales & Technical)"),
	row("AirFix", "Air conditioning", ["Larnaca", "Limassol", "Paphos"], "https://airfix.cy/en", "+357 97 532 688"),
	row("Plumbair Plumbing & Air Conditioning", "Air conditioning", ["Limassol"], "https://plumbairservices.com/", "+357 96 301520"),
	row("Chillout HomeServe", "Air conditioning", ["Larnaca", "Limassol"], "https://chillouthomeserve.com/", "+357 22 353550"),
	row("Kyriakos Electric", "Air conditioning", ["Larnaca", "Limassol"], "https://kyriakoselectric.com/", "+357 24 258 478; +357 94 492 292"),
	row("ND-AC Air Conditioning Services", "Air conditioning", ["Paphos"], "https://nd-ac.com/", "+357 95 563 916"),
	row("Klima King Air Conditioning (J&W Air Conditioning / J&W AC Enterprises)", "Air conditioning", ["Paphos"], "https://airconcyprus.com/", "+357 94044099; 94600125"),
	row("Green Air Ltd", "Air conditioning", ["Paphos"], "https://www.greenair-cy.com/", "+357 26 941 555"),
	row("T.C Multiklima Engineering Ltd", "Air conditioning", ["Larnaca"], "https://multiklima.com.cy/", "24821982"),
	row("Leontiou Airconditions", "Air conditioning", ["Larnaca"], "https://leontiouairconditions.com/", "+357 96 830 940"),
	row("FixNow.com.cy", "Handyman", ["Limassol"], "https://fixnow.com.cy/", "+357 94609781"),
	row("Meleshin LTD Cyprus", "Handyman", ["Larnaca", "Limassol", "Paphos"], "https://meleshin.com.cy/en", "+357 9971 4018; +357 9927 9161"),
	row("Butleraid", "Handyman", ["Larnaca", "Limassol", "Paphos"], "https://butleraid.com/handyman/", "080 077320"),
	row("Cyprus Property Solutions (Paphos Cleaning Services)", "Handyman", ["Limassol", "Paphos"], "https://cypruspropertysolutions.com/en/", "+357 96 393 914"),
	row("Remodium", "Handyman", ["Larnaca", "Limassol", "Paphos"], "https://remodium.cy/", "+357 99 857 807"),
	row("Paphos Home Repairs", "Handyman", ["Paphos"], "https://www.paphoshomerepairs.com/", "+35799750991"),
	row("Waves & Noble Paphos Property Management", "Handyman", ["Paphos"], "https://wavesandnoblepaphospropertymanagement.com/", "+35797824629"),
	row("Nicks Maintenance Services", "Handyman", ["Paphos"], "https://www.n-m-services.eu/", "(00357) 99009798"),
	row("Genika Maintenance & Cleaning", "Handyman", ["Larnaca"], "https://genikaservices.com/", "94 210 787"),
	row("Atom Exterminators", "Pest control", ["Larnaca", "Limassol", "Paphos"], "https://atomexterminators.com/", "777-77-890"),
	row("GG Pest Control", "Pest control", ["Limassol"], "https://pestcontrollimassol.com/", "99 03 68 72"),
	row("Cvenviropest", "Pest control", ["Larnaca", "Limassol", "Paphos"], "https://cvenviropest.com/", "+357 96 698386"),
	row("FLY PEST CONTROL", "Pest control", ["Larnaca", "Limassol", "Paphos"], "https://www.flypestcontrol.net/en", "22311698 / 99623363"),
	row("Pest Protection Services (Cyprus) Holdings Ltd (PPS Cyprus)", "Pest control", ["Larnaca", "Limassol", "Paphos"], "https://ppscyprus.com/", "77 77 21 21 (24/7 hotline); +357 24 656 800"),
	row("Pest Control in Cyprus", "Pest control", ["Larnaca", "Limassol"], "https://pestcontrolincyprus.com/", "+357 24023002"),
	row("Panic Pest Control", "Pest control", ["Paphos"], "https://www.panicpestcontroller.com/", "99489888"),
	row("Damian Pest Control & Public Health", "Pest control", ["Paphos"], "https://damian.cy/", "+357 99 439 008"),
	row("OnTarget Pest Control Cyprus", "Pest control", ["Larnaca"], "https://ontargetpestcontrolcy.com/", "7000 8474; 99 007 616"),
	row("HireKill Pest Control", "Pest control", ["Larnaca"], "https://www.hirekill.com", "700-05-105"),
	row("Lock Hero", "Locksmiths", ["Limassol"], "https://locksmith.cy/", "+357 96-409-419"),
	row("Pavlos Locksmith Services", "Locksmiths", ["Limassol"], "https://www.pavlos24hours.com/", "+35799624770"),
	row("Panikos Locksmith", "Locksmiths", ["Limassol"], "https://www.panikos-kleidaras.com/", "99557238"),
	row("Adamos Adamides Kleidaras Ltd (Adamides Locksmith)", "Locksmiths", ["Larnaca", "Limassol"], "https://www.adamideslocksmith.com.cy/en/", "25 354 105; 99 479 001; 99 674 800"),
	row("Car Master Key", "Locksmiths", ["Larnaca", "Limassol"], "https://carmasterkey.com/en/", "+35796498981"),
	row("Pick-a-lock Cyprus", "Locksmiths", ["Paphos"], "https://pickalockcyprus.com/", "97 744 121"),
	row("Demou Bros Locksmith Services", "Locksmiths", ["Paphos"], "https://keysandsigns.com/", "7000 2468"),
	row("Lemons & Linen", "Cleaning and key holding", ["Larnaca", "Limassol", "Paphos"], "https://lemonsandlinen.com/", "+357 95 914 874"),
	row("Lonely Homes", "Cleaning and key holding", ["Paphos"], "https://lonelyhomes.cy/", "+357 26 250555"),
	row("Keyper", "Cleaning and key holding", ["Paphos"], "https://www.keypermanagement.com/", "+357 97 950559"),
	row("Perfect Cleaning Services", "Cleaning and key holding", ["Limassol"], "https://perfectcleaningservices.com.cy/", "+357 96 906429"),
	row("WeClean4u", "Cleaning and key holding", ["Limassol"], "https://weclean4u.com.cy/", "+357 99 229441"),
	row("LuxeShine", "Cleaning and key holding", ["Limassol"], "https://luxeshine.cy/", "+357 96 034345"),
	row("Genika Maintenance & Cleaning", "Cleaning and key holding", ["Larnaca"], "https://genikaservices.com/", "94 210 787"),
	row("Cyprus Property Solutions (Paphos Cleaning Services)", "Cleaning and key holding", ["Limassol", "Paphos"], "https://cypruspropertysolutions.com/en/", "+357 96 393 914"),
];

/** Distinct businesses (the same website can be listed under several trades). */
export const BUSINESS_COUNT = new Set(HOME_SERVICES.map((s) => s.website)).size;

export const HOME_SERVICES_NOTE =
	"Listings are not endorsements. We checked each business's own website on 4 October 2026 (website live, phone and city shown there). Always ask for licences and a written quote.";

/** First number printed on the site as a tel: href (digits and leading +). */
export function telHref(phone: string): string {
	const first = phone.split(/;| \/ | \(/)[0] ?? phone;
	return `tel:${first.replace(/[^\d+]/g, "")}`;
}

export const HOME_SERVICES_TITLE =
	"Home Services in Cyprus: Plumbers, Electricians and More";
export const HOME_SERVICES_DESCRIPTION = `${BUSINESS_COUNT} businesses (${HOME_SERVICES.length} listings) for plumbing, electrical, air conditioning, handyman, locksmith and pest control work in Limassol, Paphos and Larnaca, each checked on its own website on 4 October 2026.`;
