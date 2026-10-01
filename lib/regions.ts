/**
 * City content for app/regions/[name]/page.tsx ("Living in {city}") and the
 * homepage hover preview. Written for people who live in, or are about to live
 * in, each city: areas, getting around, healthcare, schools, leisure and costs.
 * Figures are the 2026 figures already published on the site; do not add new
 * facts here without a source (see the fact-check step in the rebuild plan).
 */

import {
	eur,
	FEES_AMERICAN_ACADEMY_LARNACA,
	FEES_FOLEYS,
	FEES_GRAMMAR_LIMASSOL,
	FEES_HERITAGE,
	FEES_ISP,
	feeRange,
	INTERCITY_FARE,
} from "./facts/health-transport";
import {
	RENT_AGREED_NOTE,
	RENT_MONTH_LABEL,
	RENT_SAMPLED_LABEL,
	RENT_SOURCE_NAME,
	RENTS,
	rentMedian,
	rentPremiumPct,
} from "./facts/rents";
import type { SiteImage } from "./topics";

/** One line of the sample monthly budget table. */
export type CostRow = { item: string; amount: string };

export type RegionInfo = {
	slug: string;
	name: string;
	/** Hex string used in the map texture + UI accents. */
	color: string;
	/** Painted seafront scene: city page hero, city cards and OG image. */
	image?: SiteImage;
	/** Short line for the /regions/ hub cards and the homepage hover preview. */
	oneLiner: string;
	/** One sentence for the meta description and JSON-LD. */
	summary: string;
	/** Header intro on the city page (2 to 3 sentences). */
	intro: string;
	/** "Areas and everyday life" paragraphs. */
	areas: string[];
	/** "Getting around" paragraphs (transport facts only). */
	gettingAround: string[];
	healthcare: string[];
	/** "Schools and childcare" paragraphs. */
	schools: string[];
	/** "Beaches, food and things to do" paragraphs. */
	leisure: string[];
	/** "Monthly costs": a sample budget for a couple, shown as a table. */
	costs: {
		summary: string;
		rows: CostRow[];
		total: string;
		notes: string[];
	};
	/** Daily-life questions only. */
	faqs: Array<{ question: string; answer: string }>;
	/** "Practical notes" (short items not covered by the sections above). */
	practical: string[];
	/**
	 * Buyer and investor content moved off the city page in Phase 2 (who buys
	 * here, what new developments look like, common buyer mistakes, buyer and
	 * residency questions). The city page does NOT render this; Phase 4 shows
	 * it in the Property area. Keep it, do not delete.
	 */
	property: Array<{ heading: string; body: string }>;
};

export const REGIONS: ReadonlyArray<RegionInfo> = [
	{
		slug: "paphos",
		name: "Paphos",
		color: "#E2F1AF",
		image: {
			src: "/images/cities/paphos-1600.webp",
			srcSmall: "/images/cities/paphos-800.webp",
			width: 1600,
			height: 901,
			alt: "Painting of Paphos harbour with the medieval castle, moored fishing boats and clear turquoise water",
		},
		oneLiner:
			"UNESCO-listed harbour town and the western coast, popular with retirees and lifestyle relocators.",
		summary:
			"Daily life in Paphos: areas, getting around, hospitals, international schools, beaches and a sample monthly budget for the quieter, openly international west coast.",
		intro:
			"Paphos sits at the south-western tip of Cyprus, where the coast flips between fishing harbour, archaeological park and gentle limestone cliff. It is openly international: about a third of the people at a Saturday market in Kato Paphos won't be Cypriot at all (British, German, Israeli, Lebanese, and increasingly Scandinavian).",
		areas: [
			"The district runs from the Akamas peninsula in the north, one of the last truly wild stretches of Mediterranean coastline, through Polis, Coral Bay and the city, then inland to traditional stone villages in the Troodos foothills.",
			"Paphos skews older and quieter than the rest of the island. A typical newcomer is 50 to 65 and often retired or semi-retired, though families also come for the international schools and the predictable climate. Russian-speaking families used to be the largest non-EU group; since 2022 Israeli families, Ukrainian relocators and a steady trickle from the UK have taken their place.",
			"Life is slower than in Limassol: restaurants close earlier, there's no real club scene, and social life centres on suburban beach restaurants and golf-club terraces. Winter is dramatically quieter (a marina-front block that feels lively in August can feel deserted in February), but a few degrees warmer than Larnaca, with noticeably more sunshine hours.",
		],
		gettingAround: [
			"The town runs on cars: local buses cover the coast but are rarely a serious commuting option. Pretty much every long-haul flight from Western Europe lands at Paphos International (PFO).",
		],
		healthcare: [
			"Paphos General Hospital is the main public facility and part of GeSY, the national healthcare system that most legal residents can register with after immigration formalities (ask the Health Insurance Organisation on 17000 about your own eligibility). Contributions are deducted at source for employees and pensioners; private health insurance is still common but no longer essential.",
			"Iasis Hospital and Evangelistria Medical Center cover most specialties privately, with shorter waits than GeSY for non-urgent referrals. For anything genuinely complex (major cardiac, oncology, neurosurgery) most expats still drive to Limassol or Nicosia. Pharmacies are abundant, English-speaking, and dispense most common UK and EU prescriptions without trouble.",
			"Dental and optical care are private only and reasonably priced (a standard cleaning runs €40–€60). Call 112 in an emergency, as anywhere in the EU; ambulances are fast in central Paphos and occasionally slow in the inland villages.",
		],
		schools: [
			`The International School of Paphos is the largest: British curriculum from age 3 to 18, fees from ${eur(FEES_ISP.from)} (pre-reception and reception) to ${eur(FEES_ISP.to)} (sixth form) in 2026-27, and a waiting list at the upper end. Aspire Private British School (ages 4–18, ~14 per class, €5,500–€8,500) has a strong reputation among the British and Israeli communities.`,
			"Public Greek-medium schools are free, and the education ministry runs a Greek-as-a-second-language programme for newly-arrived expat children. For university, most Paphos teens commute to the University of Cyprus campus in Nicosia or Cyprus University of Technology in Limassol; Neapolis University in Paphos offers psychology, law and business (undergraduate and postgraduate).",
		],
		leisure: [
			"The coastline is the most varied on the island. Coral Bay, ten minutes north, is the default family beach: a long sandy crescent with shallow water. Lara Bay in the Akamas is a protected turtle nesting site reachable only by 4x4. Petra tou Romiou (Aphrodite's Rock) is on the road east toward Limassol, and Latchi, near Polis, runs daily Blue Lagoon boat trips into the Akamas in summer.",
			"Inland, the Paphos Forest, the Troodos villages (Lofou, Omodos, Phyti) and the Aphrodite Hills resort make easy weekends. Dining is casual, with long lunches at fish tavernas in Mandria, Pomos and Latchi rather than late nights. Three golf courses (Aphrodite Hills, Secret Valley, Minthis) are in this district, more than the rest of Cyprus combined.",
		],
		costs: {
			summary:
				"A comfortable but unflashy 2026 budget for a couple owning a two-bed new-build apartment outright. Paphos is consistently the second-cheapest major city after Larnaca.",
			rows: [
				{
					item: "Utilities (electricity, water, internet, mobile)",
					amount: "€180–€250",
				},
				{
					item: "Common charges (development with a pool)",
					amount: "€120–€200",
				},
				{ item: "Municipal taxes and refuse", amount: "€25–€40" },
				{ item: "Groceries for two", amount: "€450–€600" },
				{ item: "Eating out 3 times a week", amount: "€250–€400" },
				{ item: "One car, all-in", amount: "€180–€280" },
				{ item: "Private health top-up", amount: "€80–€140 per person" },
			],
			total: "roughly €1,500–€2,200",
			notes: [
				`Before travel, schooling and larger discretionary spending; utilities vary with aircon use. Lidl is the cheapest chain; Sklavenitis and Alphamega are the main full-range supermarkets. The median asking rent for a two-bedroom apartment in Paphos district was about ${rentMedian("Paphos", 2)} a month in ${RENT_MONTH_LABEL} (half of listings between ${eur(RENTS.Paphos[2].p25)} and ${eur(RENTS.Paphos[2].p75)}; ${RENT_SOURCE_NAME}). ${RENT_AGREED_NOTE}`,
			],
		},
		faqs: [
			{
				question: "Is English widely spoken?",
				answer:
					"Yes, near-universally in the coastal urban areas; less so in the inland villages, but enough for most interactions.",
			},
		],
		practical: [
			"1 Gbps fibre is available across the urban area, which makes Paphos particularly attractive to remote workers.",
			"Inland stone villages can lack the road, water, internet and emergency-services infrastructure of the coast. Stay overnight first and check mobile signal, fibre and supermarket distance.",
		],
		property: [
			{
				heading: "Who buys in Paphos",
				body: "The Paphos buyer profile skews older and quieter than the rest of the island. A typical new resident is 50–65, often retired or semi-retired, sometimes a family with school-age children who picked Paphos for the international schools and the predictable climate. Russian-speaking families used to be the dominant non-EU buyer group; since 2022 that has cooled significantly and been replaced by Israeli families, Ukrainian relocators and a steady trickle from the UK who never quite finished their post-Brexit move. Paphos is the part of Cyprus that has leaned hardest into the relocation market over the past decade. Sunshine and winter warmth are the single most-cited reason buyers give for choosing it over the rest of the island, and many new developments now ship with dedicated home-office floor plans.",
			},
			{
				heading: "What new developments here look like",
				body: "Paphos new-build inventory is dominated by two formats. The first is the low-rise apartment block, typically three to five storeys, set in a quiet residential street five to ten minutes inland from the coast: Kato Paphos, Geroskipou, Universal, Konia. Two-bedroom units in this format come in between €180,000 and €350,000 depending on how close to the sea you are and how much shared pool the project has. The second is the detached villa, often in Peyia, Mesa Chorio or Konia: three-to-five bedroom plots with private pools, panoramic sea views and an asking price that lands between €600,000 and €1.5 million for anything new. The €300,000+ price point is also significant because it is the threshold for Cyprus's Permanent Residency by Investment programme; a lot of new Paphos developments are explicitly designed around hitting that number with one apartment plus a couple of parking spaces.",
			},
			{
				heading: "Common buyer mistakes",
				body: "Paphos buyers most often regret three things. First, picking the development on summer visits only: Paphos is dramatically quieter in winter, and a marina-front block that feels lively in August can feel deserted in February. Visit at least once in the November–February window before committing. Second, underestimating title-deed timelines: Cypriot developers historically delivered title deeds slowly, sometimes years after handover; ask your lawyer for the specific developer's recent track record and insist on a contract that protects you in the interim. Third, buying inland-village stone houses that look idyllic in photos but lack the road, water, internet and emergency-services infrastructure that coastal areas take for granted. If you want a stone village house, do an overnight stay first and check mobile signal, fibre availability and supermarket distance.",
			},
			{
				heading: "Buyer and residency questions",
				body: "Can non-EU buyers get a mortgage? Yes, Cyprus banks lend to non-residents at 30–50% deposit and rates 0.5–1.5 points above the EU average; expect 4 to 8 weeks from offer to drawdown. Is the €300,000 residency threshold per couple or per applicant? Per family unit: one purchase qualifies the buyer, spouse and dependent children. How long do you need to be in Cyprus to keep the permit alive? Permanent Residency by Investment requires only one visit every two years; tax residency under the 60-day rule requires 60 days in country plus various other conditions. Are there capital-gains taxes if I sell later? Yes, 20% on Cypriot real-estate gains, with reliefs for primary residence and long-term ownership. Confirm specifics with a local tax adviser, as Cypriot rules update frequently.",
			},
		],
	},
	{
		slug: "limassol",
		name: "Limassol",
		color: "#F49D6E",
		image: {
			src: "/images/cities/limassol-1600.webp",
			srcSmall: "/images/cities/limassol-800.webp",
			width: 1600,
			height: 901,
			alt: "Painting of the Limassol seafront promenade with palm trees, the marina and high-rise towers below the mountains",
		},
		oneLiner:
			"The business capital and biggest new-build market: high-rise coastal living and a young international workforce.",
		summary:
			"Daily life in Limassol: areas, traffic and transport, hospitals, international schools, beaches and a sample monthly budget for Cyprus's most dynamic and most expensive city.",
		intro:
			"Limassol is the second largest city in Cyprus and, by a wide margin, the most dynamic. Strung along about fifteen kilometres of southern seafront, it is home to the shipping industry, most of the tech and fintech employers, and the island's largest concentration of international families.",
		areas: [
			"The skyline has changed more in five years than in the previous fifty: half a dozen 30-plus-storey towers (mostly on a 1.5 km strip in Neapolis and Agios Tychon), a marina, a casino resort and constant mid-rise building behind the seafront. Neapolis, Germasogeia and central Limassol are the desirable central areas; Ypsonas, Polemidia and Erimi are 30–50% cheaper for equivalent space, 15–25 minutes from the centre.",
			"If you move to Cyprus to work for a company, you almost certainly land here. Newcomers average 30 to 45 and are almost always working: Wargaming, Revolut, eToro, Exness, NEXTEN, JetBrains, the shipping firms and many forex brokers and crypto outfits have substantial Limassol headcount. The city is heavily Russian-speaking (a legacy of two decades of Russian investment), but the workforce is international: Greek, French, Israeli, Indian, South African. The social pace is genuinely European, with late dinners and busy bars on weekday evenings.",
		],
		gettingAround: [
			`Limassol has no airport: most expats use Larnaca (40 minutes east, the main international gateway) or Paphos (60 minutes west). City buses are improving but most expats drive; InterCity coaches to Larnaca and Paphos cost ${eur(INTERCITY_FARE.limassolLarnaca)} one way.`,
			"Traffic is the main complaint. The city sprawls along a thin coastal strip with one main road, and rush hour through Germasogeia and the Old Town can turn a 10-minute Google Maps trip into 30 minutes. Test regular drives at 8:30 AM and 6:00 PM; living within walking distance of the seafront promenade or your employer avoids 80% of that pain.",
		],
		healthcare: [
			"Limassol has the best private hospital infrastructure on the island. Mediterranean Hospital of Cyprus is the largest and most internationally certified; the German Oncology Center handles cancer treatment that previously sent patients abroad; Ygia Polyclinic, Limassol General (public, GeSY) and Apollonion-Limassol cover most specialties.",
			"GeSY registration is straightforward for legal residents and gives you a personal doctor and specialist referrals, mostly without out-of-pocket cost. Non-urgent specialist waits can run weeks, so many expats keep private cover: typically €80–€180 a month for an adult under 50. Dental care is private only: €40–€80 for a cleaning, €600–€1,200 for a single implant. English-fluent specialists are easy to find in almost any field; many physicians trained in the UK.",
		],
		schools: [
			`Limassol has the strongest international schools in Cyprus, plus several Greek private schools and public schools that increasingly accommodate international children. The Heritage Private School (Palodia) is the most prestigious: British curriculum from 3 to 18, IB Diploma at sixth form, ${feeRange(FEES_HERITAGE)} a year (2026-27), and up to a 12-month wait for senior years. Foley's (${feeRange(FEES_FOLEYS)}) and The Grammar School Limassol (secondary only, ${feeRange(FEES_GRAMMAR_LIMASSOL)} for non-Cypriot pupils) have strong A-level results. The American Academy Limassol teaches an American curriculum to AP level. Several private Russian schools remain, though enrolment has dropped sharply since 2022.`,
			"Some new residential complexes have kindergartens on-site. The University of Limassol opened in 2022 as a private campus; Cyprus University of Technology (CUT) is the main public university.",
		],
		leisure: [
			"Akti Olympion runs the length of the central tourist strip: sandy, clean, lifeguarded and shallow, with a continuous promenade. Lady's Mile, west of the port, is the locals' beach: five kilometres of dark sand, a few beach bars, easy parking and the tech workforce at weekends. Governor's Beach (fifteen minutes east) has white limestone cliffs and is calmer; Pissouri (thirty minutes west) is the prettiest in the district.",
			"Limassol has the island's strongest restaurant and nightlife scene, City of Dreams Mediterranean (the largest casino in Europe), the Limassol Marina (yacht charter, harbour-side restaurants, art exhibitions), the Pattichion theatre and a growing gallery district. The Troodos villages are close for wine tastings, mountain biking and weekend skiing in winter.",
		],
		costs: {
			summary:
				"The most expensive city in Cyprus. Sample costs for a couple owning a two-bedroom apartment outright in Neapolis, Germasogeia or central Limassol.",
			rows: [
				{ item: "Utilities", amount: "€220–€320" },
				{
					item: "Tower common charges (lifts, gym, pool, security)",
					amount: "€250–€500",
				},
				{ item: "Municipal", amount: "€30–€50" },
				{ item: "Groceries", amount: "€500–€700" },
				{ item: "Restaurants 3–4 times a week", amount: "€400–€700" },
				{ item: "One car, all-in", amount: "€200–€300" },
				{ item: "Private health top-up", amount: "€100–€180 per person" },
			],
			total: "roughly €1,900–€2,950",
			notes: [
				`Rent is extra: the median asking rent for a two-bedroom apartment in Limassol district was about ${rentMedian("Limassol", 2)} a month in ${RENT_MONTH_LABEL}, and half of listings asked between ${eur(RENTS.Limassol[2].p25)} and ${eur(RENTS.Limassol[2].p75)} (${RENT_SOURCE_NAME}, n=${RENTS.Limassol[2].n.toLocaleString("en-GB")}). That median is about ${rentPremiumPct("Limassol", "Paphos")}% above Paphos and ${rentPremiumPct("Limassol", "Larnaca")}% above Larnaca, and the most expensive seafront towers ask several times the median. ${RENT_AGREED_NOTE} Limassol has consistently topped Cyprus's cost-of-living index, and newcomers consistently underestimate the gap.`,
			],
		},
		faqs: [
			{
				question: "Is Limassol a good base for remote work?",
				answer:
					"Yes. It has by far the strongest tech ecosystem, plenty of coworking spaces (TechIsland, Cyprus Inc, The Place) and the largest English-speaking professional network on the island.",
			},
			{
				question: "How safe is Limassol?",
				answer:
					"Very. Cyprus has lower violent-crime rates than most EU capitals, and Limassol is comfortable to walk at any hour.",
			},
			{
				question: "What about earthquakes and regional tension?",
				answer:
					"Cyprus is in a moderate seismic zone with strict modern building codes; the most recent significant earthquake (2022) was Mw 6.6, with no injuries. Tensions in the wider region are real, but Cyprus has not experienced direct disruption since 1974.",
			},
		],
		practical: [],
		property: [
			{
				heading: "Who buys in Limassol",
				body: "Limassol's expat profile is dramatically younger than Paphos. Average age of an inbound relocator is 30 to 45, almost always working. The city's family ecosystem is the strongest on the island: three major English-medium private schools (The Heritage, Foley's, The Grammar School), several Greek private schools, and a public school system that increasingly accommodates international children. For families with younger children, a number of Limassol developers now partner with kindergartens that operate on-site within new residential complexes; worth asking when you tour.",
			},
			{
				heading: "What new developments here look like",
				body: "Limassol is unique on the island in offering genuine high-rise living. The Trilogy, ONE, Limassol Del Mar, Symbol, Sky Tower: most of the country's tallest residential buildings are on a single 1.5 km coastal strip in Neapolis and Agios Tychon. New tower apartments start around €450,000 for a one-bed at the back of a project and climb past €5 million for high-floor penthouses with unobstructed sea views; €800,000 to €1.5 million is the typical range for a comfortable two-bed with parking and a sea-view balcony. Limassol also has by far the most active mid-market new-build segment: two-bed apartments in Mouttagiaka, Germasogeia, Ypsonas and Erimi start around €280,000 and run to about €550,000. The city accounts for roughly half of all new developments listed in Cyprus at any given time.",
			},
			{
				heading: "Common buyer mistakes",
				body: "Tower-block buyers most commonly underestimate two things: maintenance and resale velocity. Common charges in luxury towers can clear €500 a month; make sure the building has a healthy sinking fund, audited accounts and a track record of completed major repairs before signing. Resale in a 30-storey tower depends heavily on the floor and view; a low-floor north-facing unit in a marquee building can sit on the market for a year while a top-floor south-facing unit in the same building sells in a week. Mid-market buyers should be careful with off-plan in lesser-known developers: Limassol has had several high-profile development bankruptcies in the past decade. Always check the developer's prior delivered projects, ask for buyer references, and structure payments against verifiable construction milestones. Traffic is the third underestimated factor: a project that looks 10 minutes from your employer on Google Maps can be 30 minutes in rush hour through Germasogeia. Test the drive at 8:30 AM and 6:00 PM before you commit. If you can pick a development within walking distance of either the seafront promenade or your specific employer, you avoid 80% of that pain.",
			},
			{
				heading: "Buyer questions",
				body: "Is there a property tax? Cyprus abolished annual property tax in 2017; you pay municipal taxes and a small immovable property fee, total under €300 a year for most apartments. Limassol's cost-of-living differential against Larnaca or Paphos is real and consistently underestimated by buyers relocating to Cyprus for the first time.",
			},
		],
	},
	{
		slug: "larnaca",
		name: "Larnaca",
		color: "#F5D6BA",
		image: {
			src: "/images/cities/larnaca-1600.webp",
			srcSmall: "/images/cities/larnaca-800.webp",
			width: 1600,
			height: 901,
			alt: "Painting of the palm-lined Larnaca promenade with seafront cafes beside a sandy beach",
		},
		oneLiner:
			"The country's main airport hub: relaxed coastal living at noticeably lower prices than Limassol.",
		summary:
			"Daily life in Larnaca: areas, the airport and getting around, hospitals, schools, Finikoudes and the salt lake, and a sample monthly budget for Cyprus's cheapest major city.",
		intro:
			"Larnaca hosts the country's primary international airport and has its own long sandy beach, Finikoudes, right against the city centre. It is more low-key than Limassol or Paphos: fewer towers, less polish, more weekday lunch traffic from people who actually live and work in the city.",
		areas: [
			"The district reaches inland through villages like Kiti, Mazotos, Tersefanou and Kornos toward the Mesaoria plain. Larnaca consistently comes out on top for the ratio between price, climate and infrastructure, and its slightly cooler coast makes summers more bearable than in Paphos.",
			"It is the most genuinely mixed city on the island. Expats include British retirees who arrived in the early 2000s, Lebanese and Israeli families with second homes and younger remote workers attracted by lower rents, but the city is still functionally majority-Cypriot. The Russian community is present but not dominant. The Lebanese community, built by families fleeing instability in Beirut, is one of the most established and well-integrated in the country.",
			"Pyla is one of only four mixed Greek-Cypriot/Turkish-Cypriot villages on the island, partly within the UN buffer zone. The Larnaca Port and Marina is undergoing a major mixed-use redevelopment across the late 2020s, alongside the new Larnaca Casino-resort project; expect significant infrastructure improvement to the city centre.",
		],
		gettingAround: [
			"The airport is Larnaca's biggest practical advantage: almost every major European airline flies here, often more cheaply than to Paphos, which adds up if you fly back to family in the UK, Greece or Israel several times a year. Public transport within the city is unremarkable, but the airport bus connections are reliable.",
		],
		healthcare: [
			"Larnaca General Hospital is the main public facility, fully integrated with GeSY. It is less specialised than the larger Nicosia or Limassol public hospitals: for major surgeries and oncology, referrals often go to Nicosia. Private healthcare has expanded fast: ECO Medical Center, Iasis-Larnaca and Apollonion Larnaca cover most outpatient specialties with English-speaking staff and shorter waits than GeSY.",
			"Cardiac and orthopaedic specialists are well-represented locally; complex paediatrics, oncology and neurosurgery still tend to flow toward Mediterranean Hospital in Limassol or the New Nicosia General. Pharmacies are everywhere and reliable. Dental care is private only (€40–€60 cleaning, €700–€1,400 implant). Emergency response is good in the city; from inland villages the nearest A&E may be 20–30 minutes away. 112 works throughout the district.",
		],
		schools: [
			`The international school market is smaller than in Limassol or Paphos but growing. The American Academy Larnaca (ages 4 to 18, American-style curriculum, SAT preparation, ${feeRange(FEES_AMERICAN_ACADEMY_LARNACA)} in 2026-27) is the best known. Pascal Private School's Larnaca campus (British curriculum, same ages) is the standard pick for UK-bound students, and The Med High School (12–18) has a tighter academic focus. Several smaller British-curriculum primary schools serve under-12s.`,
			"Public Greek-medium schools are free, and the district education authority has been particularly responsive to international families: schools in Pervolia, Kiti and Aradippou increasingly have meaningful expat representation.",
		],
		leisure: [
			"Finikoudes is lined by a wide pedestrian promenade and the city's main restaurant strip. Mackenzie Beach, ten minutes south near the airport, is the relaxed Blue Flag locals' beach with a continuous strip of beach bars. Cape Greco national park, half an hour east toward the Famagusta area, has sea caves, cliff jumps and good snorkelling.",
			"Thousands of flamingos winter on the salt lake from November to March, and the Hala Sultan Tekke mosque on its shore is one of the most important Islamic pilgrimage sites in Cyprus. Lefkara (lace and silver), Choirokoitia (Neolithic UNESCO site) and the Stavrovouni Monastery are easy day trips. Food is casual: fish tavernas along Piale Pasha, meze houses in the inland villages and a growing specialty-coffee scene around Finikoudes.",
		],
		costs: {
			summary:
				"The cheapest of the major Cypriot cities. Sample costs for a couple owning a two-bedroom apartment outright in or near the centre.",
			rows: [
				{ item: "Utilities", amount: "€170–€240" },
				{ item: "Common charges (building with a pool)", amount: "€100–€180" },
				{ item: "Municipal taxes", amount: "€25–€40" },
				{
					item: "Groceries (Lidl, Sklavenitis, Alphamega)",
					amount: "€420–€580",
				},
				{ item: "Restaurants 3 times a week", amount: "€230–€370" },
				{ item: "One car, all-in", amount: "€170–€260" },
				{ item: "Private health top-up", amount: "€70–€140 per person" },
			],
			total: "roughly €1,400–€2,050",
			notes: [
				`Before discretionary spending. The median asking rent for a two-bedroom apartment in Larnaca district was about ${rentMedian("Larnaca", 2)} a month in ${RENT_MONTH_LABEL} (half of listings between ${eur(RENTS.Larnaca[2].p25)} and ${eur(RENTS.Larnaca[2].p75)}; ${RENT_SOURCE_NAME}, n=${RENTS.Larnaca[2].n}), well below Limassol. ${RENT_AGREED_NOTE}`,
			],
		},
		faqs: [
			{
				question: "Is the airport noise a problem?",
				answer:
					"Only directly under the flight path, which runs roughly east-west over the southern coastal strip: some new developments south of the salt lake sit under it, and noise during peak summer schedules is meaningful. Most of the city is unaffected. Check in person, especially weekend mornings in July and August.",
			},
			{
				question: "Is the salt-lake area pleasant year-round?",
				answer:
					"Beautiful in winter (flamingos) and spring; the lake fully dries up in summer and the area is dusty and hot.",
			},
			{
				question: "Is Larnaca a good base for families with young children?",
				answer:
					"Yes. The centre is low-key, safe and walkable, and most amenities (pediatricians, parks, kindergartens) are a short drive away.",
			},
		],
		practical: [],
		property: [
			{
				heading: "Who buys in Larnaca",
				body: "Larnaca has a rapidly expanding new-build pipeline driven by buyers priced out of Limassol. Its profile is the most genuinely mixed of any city on the island: there is a stable expat population (British retirees who arrived in the early 2000s, Lebanese and Israeli families with second-home properties, a growing share of younger remote workers attracted by lower rents), but the city is still functionally majority-Cypriot in a way Limassol and Paphos no longer are. For relocators looking for the best ratio between price, climate and infrastructure, Larnaca consistently comes out on top.",
			},
			{
				heading: "What new developments here look like",
				body: "The Larnaca new-build pipeline has tripled in the past four years and is now the second largest after Limassol. The dominant product is the mid-rise apartment block, six to nine storeys, often on or near Mackenzie Beach, the city centre, or the strip running between the salt lake and the airport. A two-bedroom apartment in a 2024–2026 delivery comes in between €180,000 and €380,000; three-bedroom roof gardens and sky-villas in the better-located blocks now sit around €500,000–€700,000. Villas in the inland villages (Kiti, Pyla, Aradippou) start around €450,000 for a new three-bed with a small pool and reach €900,000–€1.2 million for larger plots with sea views from the foothills. Larnaca pricing is, on average, 30% below Limassol for equivalent specification.",
			},
			{
				heading: "Common buyer mistakes",
				body: "Larnaca buyers most commonly mis-assess airport flight-path noise and the proximity of new developments to the airport perimeter. The flight path runs roughly east-west over the southern coastal strip; certain new developments south of the salt lake sit directly under it and noise during peak summer schedules is meaningful. Get a feel for the noise in person before buying, especially weekend mornings in July and August. Second, buyers underestimate how much development is still planned along the entire coastal strip between Larnaca and Mackenzie: a current sea view can be construction-site-blocked within two years. Check the local municipality's planning portal for any pending permits within 200 metres of your prospective unit. Third, inland villages like Pyla have unusually complex history (Pyla is one of only four mixed Greek-Cypriot/Turkish-Cypriot villages on the island, sitting partly within the UN buffer zone), so title-deed history can be unusual; use a lawyer experienced in the specific village.",
			},
			{
				heading: "Buyer questions",
				body: "Is the airport noise a deal-breaker? Only for developments directly under the flight path on the southern coastal strip; most of the city is unaffected. Why are prices so much lower than Limassol? Larnaca has historically lacked Limassol's corporate employment base; that has been changing rapidly with the new Larnaca Casino-resort project and the planned port redevelopment, but pricing hasn't caught up yet, which is part of the buyer opportunity. Is the salt-lake area pleasant year-round? Beautiful in winter and spring; it dries up in summer, so buy with that seasonal change in mind. What's the new port redevelopment? The Larnaca Port and Marina concession is currently undergoing a major mixed-use redevelopment scheduled across the late 2020s; expect significant infrastructure improvement to the city centre, plus likely upward pressure on prices in adjacent neighbourhoods.",
			},
		],
	},
	{
		slug: "ayia-napa",
		name: "Ayia Napa",
		color: "#E4B7E5",
		image: {
			src: "/images/cities/ayia-napa-1600.webp",
			srcSmall: "/images/cities/ayia-napa-800.webp",
			width: 1600,
			height: 901,
			alt: "Painting of Ayia Napa harbour with blue and white fishing boats, nets on the quay and whitewashed buildings",
		},
		oneLiner:
			"The far south-east: beach resorts, family-friendly coves and a quieter year-round expat scene.",
		summary:
			"Daily life in Ayia Napa, Protaras and Paralimni: areas, getting to the airport, healthcare, schools, the island's best beaches and a sample monthly budget.",
		intro:
			"The Famagusta free area (colloquially Ayia Napa, though it also includes Protaras, Paralimni and Kapparis) is the south-eastern tip of the Republic of Cyprus. Europe's club capital in the early 2000s, Ayia Napa is reinventing itself as a family-oriented Mediterranean resort, with a quieter year-round expat community behind the summer reputation.",
		areas: [
			"Year-round expats live particularly in Paralimni and Protaras. The community is the smallest of the four cities covered here, but committed: British families who came in the 1990s and 2000s and never left after a holiday, with a tight social network around the Protaras seafront and the inland villages; Lebanese families who became a year-round presence after the 2019–2024 instability in Beirut; and Israeli families, the fastest-growing group since 2023, who generally choose Protaras for its more residential feel. Cypriots mostly live in the inland villages (Sotira, Liopetri, Frenaros) rather than the resort towns.",
			"The resort towns slow down dramatically from November to March. In return you get the warmest sea on the island (typically 27–28 °C in summer, well into October) and the country's highest concentration of Blue Flag beaches.",
		],
		gettingAround: [
			"This is the part of the Republic furthest from both major airports. Larnaca Airport is 35–45 minutes from Protaras and 40–50 minutes from Ayia Napa, depending on traffic; there is no airport closer, and Paphos is 2 hours away.",
		],
		healthcare: [
			"Paralimni General Hospital is the public (GeSY) hospital for the whole area. It handles common emergencies and routine care, but its specialty depth is the thinnest of any major hospital on the island: anything complex (cardiac surgery, oncology, neurosurgery) is referred to Larnaca, Nicosia or Limassol. Private clinics are limited but growing: ECO Larnaca has a Paralimni satellite, and a handful of private GPs and dentists serve the resort towns year-round.",
			"Families with chronic conditions sometimes drive to Larnaca or further three or four times a month. Emergency response is reasonable in the resort towns and can take 15–25 minutes in the inland villages (Liopetri, Frenaros, Sotira); 112 works throughout. Many full-time expats supplement GeSY with private insurance specifically to access Limassol or Nicosia specialists without GeSY referral delays.",
		],
		schools: [
			"The area has the thinnest international-school market of the four cities: the only registered English-language private school is Xenion in Paralimni, plus a handful of preschools and kindergartens. Public Greek-medium schools in Paralimni and Sotira are good and have absorbed a meaningful number of expat children, particularly in primary.",
			"Secondary school is the genuine challenge: most families commute to The American Academy Larnaca (35–45 minutes each way) or one of the Larnaca British schools, or board. For families with several school-age children it is the most-cited reason for choosing Larnaca instead. The area lacks any local university campus; students typically attend Nicosia or Limassol institutions or go abroad.",
		],
		leisure: [
			"This region has the strongest beach inventory on the island. Nissi Beach (Ayia Napa) is the classic: pure white sand, shallow turquoise water, beach bars, lifeguarded. Konnos Beach, between Ayia Napa and Protaras, is a small protected cove with pine trees down to the sand, frequently voted Cyprus's prettiest beach. Fig Tree Bay (Protaras) is the family default: long, sandy and gently shelving, with a small island swimmable from shore.",
			"Cape Greco national park has sea caves, cliff jumps and the 'Bridge of Lovers' rock arch. The area has the country's highest concentration of water-sports operators, several theme parks (WaterWorld is one of Europe's largest waterparks) and diving on the sunken MS Zenobia off Larnaca, one of the world's best-rated dives. The sea is swimmable from May into October, a longer season than anywhere else in Cyprus.",
		],
		costs: {
			summary:
				"Similar to Larnaca year-round, with seasonal quirks. Off-season sample costs for a couple owning a two-bedroom apartment outright in Protaras or Paralimni.",
			rows: [
				{ item: "Utilities", amount: "€170–€260" },
				{ item: "Resort-complex common charges", amount: "€150–€280" },
				{ item: "Municipal", amount: "€25–€40" },
				{ item: "Groceries", amount: "€430–€590" },
				{
					item: "Restaurants 3 times a week (summer doubles)",
					amount: "€220–€370",
				},
				{ item: "One car", amount: "€170–€260" },
				{ item: "Private health top-up", amount: "€70–€140 per person" },
			],
			total: "roughly €1,470–€2,170 off-season",
			notes: [
				"Resort amenities push common charges above equivalent Larnaca buildings. From June to September restaurants charge resort prices (30–50% higher than off-season) and supermarket lines are long; owners often hold off big spending until October.",
				`Long-term rentals are scarce because most units are aimed at holiday letting: expect €750–€1,400 for a year-round two-bedroom, and significantly more if the lease includes the high season. ${RENT_SOURCE_NAME} listed only ${RENTS["Ayia Napa"][2].n} two-bedroom apartments for long-term rent across the whole Famagusta free area on ${RENT_SAMPLED_LABEL}, with a median asking rent of about ${rentMedian("Ayia Napa", 2)} and half between ${eur(RENTS["Ayia Napa"][2].p25)} and ${eur(RENTS["Ayia Napa"][2].p75)}.`,
			],
		},
		faqs: [
			{
				question: "Is the area dead in winter?",
				answer:
					"Not dead, but very quiet. Most restaurants reopen by mid-March and run through October; a smaller core of locals' tavernas and supermarkets stay open year-round.",
			},
			{
				question: "What about Famagusta proper, the closed city of Varosha?",
				answer:
					"Varosha is in the Turkish-administered north, partially reopened to visitors since 2020 but with significant restrictions. The Republic-controlled Famagusta free area covered here is entirely separate.",
			},
			{
				question: "Is the area good for remote workers?",
				answer:
					"Internet is reasonable (fibre in the main towns), but with no coworking scene and a strongly seasonal social life, most remote workers eventually gravitate toward Larnaca or Limassol.",
			},
		],
		practical: ["Internet, water and power are reliable."],
		property: [
			{
				heading: "Who buys in the south-east",
				body: "The Famagusta free area has the smallest year-round expat community of any region on this map, but a disproportionately committed one. The dominant group is British: a generation of buyers who came in the 1990s and 2000s and built up a tight social network around the Protaras seafront and the inland villages. Lebanese families with summer homes have become a year-round presence since the 2019–2024 instability in Beirut, and Israeli families are now the fastest-growing inbound segment, generally choosing Protaras over Ayia Napa proper for the slightly more residential feel.",
			},
			{
				heading: "What new developments here look like",
				body: "Inventory in the Famagusta free area is small, about a tenth of what Limassol produces in any given year, but distinct. The dominant product is the resort-style apartment complex: low-rise (three to five storeys), heavy on shared facilities (pools, gyms, restaurants), and oriented as much toward holiday-letting as toward primary residence. A two-bedroom apartment in a new Protaras complex sits between €280,000 and €450,000. Detached villas in Paralimni and Kapparis go from €500,000 for a basic three-bed to over €1.5 million for a coastal plot with a private pool and direct sea view. The market is unusually seasonal (July and August can see 40% of annual sales) and a meaningful share of buyers are explicit investors targeting short-term holiday-let yields.",
			},
			{
				heading: "Common buyer mistakes",
				body: "The single most-regretted SE purchase is the 'summer-romance' buy: visiting once in August, falling for the beaches, and committing to a year-round residence that proves dramatically quieter in winter. A meaningful share of Ayia Napa expat families end up buying a second base in Larnaca or Limassol within two years, specifically for the November–March months. Second mistake: buying purely for holiday-let yield without modelling realistic occupancy. Holiday-let returns in Protaras and Ayia Napa can be strong (6–9% gross) but assume 90+ nights/year of high-season demand and competitive pricing against an ever-growing supply. Use the local Booking.com data to triangulate before signing. Third, school logistics: if you have secondary-age children, the commute to Larnaca will dominate your daily life. Fourth, certain coastal developments are vulnerable to construction noise from the broader Famagusta-area rebuilding; the post-1974 displaced communities are still in slow process of returning to certain areas, and local construction activity can be heavier than the existing skyline suggests.",
			},
			{
				heading: "Buyer questions",
				body: "Can expats own property in Varosha? Varosha is in the Turkish-administered north, with no legal property ownership available to Republic-of-Cyprus expats. Are there any tax advantages specific to this region? No: Cyprus tax residency rules are national, not regional.",
			},
		],
	},
];

export function regionBySlug(slug: string): RegionInfo | undefined {
	return REGIONS.find((r) => r.slug === slug);
}
