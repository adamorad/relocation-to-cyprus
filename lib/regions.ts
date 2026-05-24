/**
 * Region content used by app/regions/[name]/page.tsx and the homepage hover
 * preview. Each region has long-form copy (~2000 words) — written for search
 * engines and relocation-curious readers. Updated 2026 figures where stated.
 */

export type RegionInfo = {
  slug: string;
  name: string;
  /** Hex string used in the map texture + UI accents. */
  color: string;
  /** Used in the URL: /regions/{slug}. */
  oneLiner: string;
  /** Long-form, structured copy. */
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

export const REGIONS: ReadonlyArray<RegionInfo> = [
  {
    slug: "paphos",
    name: "Paphos",
    color: "#E2F1AF",
    oneLiner:
      "UNESCO-listed harbour town and the western coast — popular with retirees and lifestyle relocators.",
    intro:
      "Paphos sits at the south-western tip of Cyprus, hugging a coastline that flips between fishing harbour, archaeological park and gentle limestone cliff. The district stretches from the Akamas peninsula in the north — one of the last truly wild stretches of Mediterranean coastline — down through Polis, Coral Bay and the city itself, then inland to traditional stone villages set into the Troodos foothills. It is the part of Cyprus that has leaned hardest into the relocation market over the past decade: pretty much every long-haul flight from Western Europe lands at Paphos International (PFO), and the population is openly international. About a third of the residents you meet at a Saturday market in Kato Paphos won't be Cypriot at all — British, German, Israeli, Lebanese, and increasingly Scandinavian.",
    sections: [
      {
        heading: "Who moves to Paphos",
        body: "The Paphos buyer profile skews older and quieter than the rest of the island. A typical new resident is 50–65, often retired or semi-retired, sometimes a family with school-age children who picked Paphos for the international schools and the predictable climate. Russian-speaking families used to be the dominant non-EU buyer group; since 2022 that has cooled significantly and been replaced by Israeli families, Ukrainian relocators and a steady trickle from the UK who never quite finished their post-Brexit move. The lifestyle is unapologetically slower than Limassol — restaurants close earlier, there's no real club scene, and most of the social life happens in suburban beach restaurants and golf-club terraces.",
      },
      {
        heading: "What new developments here look like",
        body: "Paphos new-build inventory is dominated by two formats. The first is the low-rise apartment block, typically three to five storeys, set in a quiet residential street five to ten minutes inland from the coast — Kato Paphos, Geroskipou, Universal, Konia. Two-bedroom units in this format come in between €180,000 and €350,000 depending on how close to the sea you are and how much shared pool the project has. The second is the detached villa, often in Peyia, Mesa Chorio or Konia — three-to-five bedroom plots with private pools, panoramic sea views and an asking price that lands between €600,000 and €1.5 million for anything new. The €300,000+ price point is also significant because it is the threshold for Cyprus's Permanent Residency by Investment programme — a lot of new Paphos developments are explicitly designed around hitting that number with one apartment plus a couple of parking spaces.",
      },
      {
        heading: "Schools and education",
        body: "Paphos has a small but quality-focused international school market. The International School of Paphos is the largest, accredited British-curriculum from age 3 to 18, with annual fees from €5,800 (early years) to €9,200 (sixth form) and a waiting list at the upper end of the school. Aspire Private British School covers ages 4–18 with smaller class sizes (~14 per class) and fees in the €5,500–€8,500 range; it has a strong reputation among the local British and Israeli communities. Logos School of English Education is the older, more academic option with consistently strong A-level results and a slightly more traditional culture. École Française de Paphos handles ages 3–11 for French-medium families. Public Greek-medium schools are free and the Cypriot education ministry now runs a Greek-as-a-second-language programme designed specifically for newly-arrived expat children. For university, most Paphos teens commute to the University of Cyprus campus in Nicosia or Cyprus University of Technology in Limassol; Neapolis University in Paphos itself offers psychology, law and business at undergraduate and postgraduate level.",
      },
      {
        heading: "Healthcare in Paphos",
        body: "Paphos General Hospital, in the city, is the main public facility and is part of GeSY — the national healthcare system that all legal residents are automatically eligible to register with after immigration formalities. GeSY contributions are deducted at source for employed residents and pensioners; private health insurance is still common but no longer essential. For private care, Iasis Hospital and Evangelistria Medical Center cover most specialties with shorter waits than GeSY for non-urgent referrals. Dental and optical care are private only and reasonably priced versus Western Europe (a standard cleaning runs €40–€60). For anything genuinely complex — major cardiac, oncology, neurosurgery — most expats still drive to Limassol or Nicosia. Pharmacies are abundant, English-speaking, and most common UK and EU prescriptions are dispensed without trouble. The 112 emergency number works the same way as anywhere in the EU; ambulance response in central Paphos is fast, in the inland villages occasionally slow.",
      },
      {
        heading: "Beaches, lifestyle and what there is to do",
        body: "The Paphos coastline is the most varied on the island. Coral Bay, ten minutes north of the city, is a long sandy crescent with shallow water — the default family beach. Lara Bay, further into the Akamas, is a protected turtle nesting site reachable only by 4x4 and the closest thing Cyprus has to wild coastline. Petra tou Romiou (Aphrodite's Rock) is the iconic dramatic-rocks spot on the road east toward Limassol. Latchi, north of Paphos in the Polis area, is the gateway to the Akamas peninsula by boat — Blue Lagoon trips run daily in summer. Inland, the Paphos Forest, the Troodos villages (Lofou, Omodos, Phyti) and the Aphrodite Hills resort give weekend variety. Restaurant culture skews casual: long lunches at fish tavernas in Mandria, Pomos and Latchi rather than late-night dining. Three golf courses (Aphrodite Hills, Secret Valley, Minthis) are clustered in this district — more than the rest of Cyprus combined.",
      },
      {
        heading: "Sample monthly budget for a couple",
        body: "Realistic numbers for a comfortable but unflashy lifestyle in Paphos as of 2026, owning a two-bed new-build apartment outright: utilities (electricity, water, internet, mobile) €180–€250 depending on aircon use; common charges in a development with a pool €120–€200; municipal taxes and refuse collection €25–€40; supermarket groceries for two €450–€600 (Lidl and Sklavenitis cheaper than Carrefour and Alpha Mega); eating out three times a week at local tavernas €250–€400; one car all-in (insurance, road tax, petrol, parking) €180–€280; private health top-up insurance €80–€140 per person depending on age. Total: roughly €1,500–€2,200 a month before any travel, schooling or larger discretionary spending. For renters, add a typical two-bed rent in central Paphos of €800–€1,200 (€1,100–€1,600 for the Coral Bay or Kato Paphos premium). Paphos is consistently the second-cheapest of the major Cypriot cities after Larnaca.",
      },
      {
        heading: "Common buyer mistakes",
        body: "Paphos buyers most often regret three things. First, picking the development on summer visits only — Paphos is dramatically quieter in winter, and a marina-front block that feels lively in August can feel deserted in February. Visit at least once in the November–February window before committing. Second, underestimating title-deed timelines — Cypriot developers historically delivered title deeds slowly, sometimes years after handover; ask your lawyer for the specific developer's recent track record and insist on a contract that protects you in the interim. Third, buying inland-village stone houses that look idyllic in photos but lack the road, water, internet and emergency-services infrastructure that coastal areas take for granted. If you want a stone village house, do an overnight stay first and check mobile signal, fibre availability and supermarket distance.",
      },
      {
        heading: "Frequently asked questions",
        body: "Is English widely spoken? Yes, near-universally in the coastal urban areas; less so in the inland villages but enough for most interactions. Can non-EU buyers get a mortgage? Yes, Cyprus banks lend to non-residents at 30–50% deposit and rates 0.5–1.5 points above the EU average; expect 4 to 8 weeks from offer to drawdown. Is the €300,000 residency threshold per couple or per applicant? Per family unit — one purchase qualifies the buyer, spouse and dependent children. How long do you need to be in Cyprus to keep the permit alive? Permanent Residency by Investment requires only one visit every two years; tax residency under the 60-day rule requires 60 days in country plus various other conditions. Are there capital-gains taxes if I sell later? Yes, 20% on Cypriot real-estate gains, with reliefs for primary residence and long-term ownership. Confirm specifics with a local tax adviser — Cypriot rules update frequently.",
      },
      {
        heading: "Practical relocation notes",
        body: "Paphos has a hospital (Paphos General) and a growing roster of private clinics, but for anything specialist most expats still drive to Limassol. International schooling is good and competitively priced relative to other Mediterranean destinations. The town runs on cars — there is local bus coverage along the coast but it is rarely a serious commuting option. Internet is universally fast (1 Gbps fibre is available across the urban area) which makes Paphos particularly attractive to remote workers, and many new developments now ship with dedicated home-office floor plans. Climate-wise, Paphos is consistently a few degrees warmer in winter than Nicosia or Larnaca and has noticeably more sunshine hours, which is the single most-cited reason buyers give for choosing it over the rest of the island.",
      },
    ],
  },
  {
    slug: "limassol",
    name: "Limassol",
    color: "#F49D6E",
    oneLiner:
      "The business capital and biggest new-build market — high-rise coastal living and a young international workforce.",
    intro:
      "Limassol is the second largest city in Cyprus and, by a wide margin, the most dynamic. Strung along the southern coast for about fifteen kilometres of seafront, it is the home of the country's shipping industry, the bulk of its tech and fintech employers, and the largest concentration of international families on the island. The skyline has changed more in the past five years than in the previous fifty — half a dozen 30-plus-storey residential towers, a marina, a casino resort, and a constant churn of mid-rise apartment blocks behind the seafront. If you are moving to Cyprus to work for a company rather than to retire to it, you almost certainly land in Limassol.",
    sections: [
      {
        heading: "Who moves to Limassol",
        body: "Limassol's expat profile is dramatically younger than Paphos. Average age of an inbound relocator is 30 to 45, almost always working — Wargaming, Revolut, eToro, Exness, NEXTEN, JetBrains, the shipping firms and a long tail of forex brokers and crypto outfits all have substantial Limassol headcount. The city is heavily Russian-speaking (a legacy of two decades of Russian investment), though the tech and shipping companies pull in a much more international workforce: Greek, French, Israeli, Indian, South African. Limassol's family ecosystem is the strongest on the island: three major English-medium private schools (The Heritage, Foley's, The Grammar School), several Greek private schools, and a public school system that increasingly accommodates international children.",
      },
      {
        heading: "What new developments here look like",
        body: "Limassol is unique on the island in offering genuine high-rise living. The Trilogy, ONE, Limassol Del Mar, Symbol, Sky Tower — most of the country's tallest residential buildings are on a single 1.5 km coastal strip in Neapolis and Agios Tychon. New tower apartments start around €450,000 for a one-bed at the back of a project and climb past €5 million for high-floor penthouses with unobstructed sea views; €800,000 to €1.5 million is the typical range for a comfortable two-bed with parking and a sea-view balcony. Limassol also has by far the most active mid-market new-build segment: two-bed apartments in Mouttagiaka, Germasogeia, Ypsonas and Erimi start around €280,000 and run to about €550,000. The city accounts for roughly half of all new developments listed in Cyprus at any given time.",
      },
      {
        heading: "Schools and education",
        body: "Limassol has the strongest international-school ecosystem in Cyprus. The Heritage Private School (Pyrgos) is the most prestigious, with British curriculum from age 3 to 18, IB Diploma at sixth form, and fees in the €8,000–€14,000 range; admission for senior years can require a 12-month wait. Foley's Grammar School and The Grammar School Limassol are the other two big English-medium options, both with strong A-level outcomes and fees from €6,500 to €11,000. The American Academy Limassol covers an American curriculum through to AP level. For Russian-medium schooling, Limassol still hosts several private Russian schools, though enrolment has dropped sharply since 2022. The University of Limassol opened in 2022 as a new private campus, joining Cyprus University of Technology (CUT) which is the city's main public university. For families with younger children, a number of Limassol developers now partner with kindergartens that operate on-site within new residential complexes — worth asking when you tour.",
      },
      {
        heading: "Healthcare in Limassol",
        body: "Limassol has the best private hospital infrastructure on the island. Mediterranean Hospital of Cyprus is the largest and most internationally certified; the German Oncology Center handles cancer treatment that previously sent patients abroad; Ygia Polyclinic, Limassol General (public, GeSY) and Apollonion-Limassol cover most specialties. GeSY registration is straightforward for legal residents and gives access to a designated personal doctor plus referrals to specialists, mostly without out-of-pocket cost. Private health insurance is still common in the expat community because waits for specialist appointments through GeSY can run weeks for non-urgent cases; a comprehensive private plan for an adult under 50 typically costs €80–€180 per month. Dental care is private only and good-quality; expect €40–€80 for a cleaning, €600–€1,200 for a single implant. Limassol's English-speaking medical community is large enough that finding an English-fluent specialist in almost any field is straightforward — many physicians trained in the UK.",
      },
      {
        heading: "Beaches, lifestyle and what there is to do",
        body: "Limassol's seafront is dominated by Akti Olympion, the long sandy beach that runs the length of the central tourist strip — clean, lifeguarded, with shallow water and a continuous promenade behind it. Lady's Mile, west of the port, is the locals' beach: a five-kilometre strip of dark sand with a handful of beach bars and easy parking, where the city's tech workforce spends weekends. Governor's Beach, fifteen minutes east, has dramatic white limestone cliffs and is calmer; Pissouri, thirty minutes west, is the prettiest of the wider district. Beyond the beaches, Limassol has the strongest restaurant and nightlife scene on the island, a casino (City of Dreams Mediterranean — the largest in Europe), the Limassol Marina (yacht charter, harbour-side restaurants, art exhibitions), and easy access to the Troodos villages for wine tastings, mountain biking and weekend skiing in winter. The city's social pace is genuinely European — late dinners, busy bars on weekday evenings, an arts scene built around the Pattichion theatre and a growing gallery district.",
      },
      {
        heading: "Sample monthly budget for a couple",
        body: "Limassol is the most expensive city in Cyprus. For a couple owning a two-bedroom apartment outright in a desirable area (Neapolis, Germasogeia, central Limassol): utilities €220–€320; common charges in a tower €250–€500 (towers have higher maintenance: lifts, gym, pool, security); municipal €30–€50; groceries €500–€700; restaurants 3–4 times a week €400–€700 (Limassol has the priciest dining on the island); one car €200–€300 all-in; private health top-up €100–€180 per person. Total: roughly €1,900–€2,950 per month excluding rent. For renters, a two-bedroom in central Limassol now runs €1,800–€3,000 unfurnished and €2,200–€3,800 furnished; sea-view apartments in towers regularly clear €4,000–€7,000. Outer suburbs (Ypsonas, Polemidia, Erimi) are 30–50% cheaper for equivalent space, with a 15–25 minute commute to the centre. Limassol's cost-of-living differential against Larnaca or Paphos is real and consistently underestimated by buyers relocating to Cyprus for the first time.",
      },
      {
        heading: "Common buyer mistakes",
        body: "Tower-block buyers most commonly underestimate two things: maintenance and resale velocity. Common charges in luxury towers can clear €500 a month — make sure the building has a healthy sinking fund, audited accounts and a track record of completed major repairs before signing. Resale in a 30-storey tower depends heavily on the floor and view; a low-floor north-facing unit in a marquee building can sit on the market for a year while a top-floor south-facing unit in the same building sells in a week. Mid-market buyers should be careful with off-plan in lesser-known developers — Limassol has had several high-profile development bankruptcies in the past decade. Always check the developer's prior delivered projects, ask for buyer references, and structure payments against verifiable construction milestones. Traffic is the third underestimated factor: a project that looks 10 minutes from your employer on Google Maps can be 30 minutes in rush hour through Germasogeia. Test the drive at 8:30 AM and 6:00 PM before you commit.",
      },
      {
        heading: "Frequently asked questions",
        body: "Is Limassol a good base for remote work? Yes — Limassol has by far the strongest tech ecosystem, plenty of coworking spaces (TechIsland, Cyprus Inc, The Place), and the largest English-speaking professional network on the island. How safe is Limassol? Very — Cyprus has lower violent-crime rates than most EU capitals, and Limassol specifically is comfortable to walk at any hour. What about earthquakes and the recent geopolitical tension? Cyprus is in a moderate seismic zone with strict modern building codes; the most recent significant earthquake (2022) was Mw 6.6, with no injuries. Tensions in the wider region are real but Cyprus has not experienced direct disruption since 1974. Is there public transport worth using? Within Limassol, the bus network is improving but most expats still drive. Inter-city, public coaches connect Limassol to Nicosia, Larnaca and Paphos for €4–€7 one way. Is there a property tax? Cyprus abolished annual property tax in 2017; you pay municipal taxes and a small immovable property fee, total under €300 a year for most apartments.",
      },
      {
        heading: "Practical relocation notes",
        body: "Limassol does not have a domestic airport — most expats use Larnaca (40 minutes east, the main international gateway) or Paphos (60 minutes west). The hospital infrastructure is the best on the island, with Mediterranean Hospital, German Oncology Center and several major private clinics. The downside of Limassol's success is cost: rents and purchase prices are 30–50% higher than Larnaca or Paphos for equivalent space, and Limassol has consistently topped Cyprus's cost-of-living index. Traffic is the other complaint — the city sprawls along a thin coastal strip with one main road, and rush-hour congestion through Germasogeia and the Old Town is real. If you can pick a development within walking distance of either the seafront promenade or your specific employer, you avoid 80% of that pain.",
      },
    ],
  },
  {
    slug: "larnaca",
    name: "Larnaca",
    color: "#F5D6BA",
    oneLiner:
      "The country's main airport hub — relaxed coastal living at noticeably lower prices than Limassol.",
    intro:
      "Larnaca is the underrated middle child of Cyprus. It hosts the country's primary international airport, has its own long sandy beach (Finikoudes) right against the city centre, and a rapidly expanding new-build pipeline driven by buyers priced out of Limassol. The atmosphere is decidedly more low-key than either Limassol or Paphos — fewer towers, less polish, more weekday lunch traffic from people who actually live and work in the city. The wider Larnaca district reaches inland through traditional villages like Kiti, Mazotos, Tersefanou and Kornos, then up toward the Mesaoria plain. For relocators looking for the best ratio between price, climate and infrastructure, Larnaca consistently comes out on top.",
    sections: [
      {
        heading: "Who moves to Larnaca",
        body: "Larnaca's profile is the most genuinely mixed of any city on the island. There is a stable expat population — British retirees who arrived in the early 2000s, Lebanese and Israeli families with second-home properties, a growing share of younger remote workers attracted by lower rents — but the city is still functionally majority-Cypriot in a way Limassol and Paphos no longer are. The Russian community is present but not dominant. Larnaca has historically been a popular landing pad for Lebanese families fleeing instability in Beirut, and that community is one of the most established and well-integrated in the country.",
      },
      {
        heading: "What new developments here look like",
        body: "The Larnaca new-build pipeline has tripled in the past four years and is now the second largest after Limassol. The dominant product is the mid-rise apartment block — six to nine storeys, often on or near Mackenzie Beach, the city centre, or the strip running between the salt lake and the airport. A two-bedroom apartment in a 2024–2026 delivery comes in between €180,000 and €380,000; three-bedroom roof gardens and sky-villas in the better-located blocks now sit around €500,000–€700,000. Villas in the inland villages — Kiti, Pyla, Aradippou — start around €450,000 for a new three-bed with a small pool and reach €900,000–€1.2 million for larger plots with sea views from the foothills. Larnaca pricing is, on average, 30% below Limassol for equivalent specification.",
      },
      {
        heading: "Schools and education",
        body: "Larnaca's international school market is smaller than Limassol or Paphos but growing in step with the inbound expat flow. The American Academy Larnaca is the best-known English-medium school, covering ages 4 to 18 with American-style curriculum and SAT preparation; fees run €5,500–€8,500. Pascal Private School has a Larnaca campus serving the same age range with British curriculum and is the standard pick for UK-bound students. The Med High School covers ages 12–18 with a tighter academic focus. Several smaller British-curriculum primary schools serve the under-12 expat population. For families willing to drive, the Junior School Larnaca (primary) and the American International School (Nicosia, 45 minutes) are both within commuting distance. Public Greek-medium schools are free, and the Larnaca district education authority has been particularly responsive to international family integration — the public schools in Pervolia, Kiti and Aradippou increasingly have meaningful expat representation.",
      },
      {
        heading: "Healthcare in Larnaca",
        body: "Larnaca General Hospital is the main public facility, fully integrated with GeSY. It is functional but less specialised than the larger Nicosia or Limassol public hospitals — for major surgeries and oncology, referrals often go to Nicosia. Private healthcare has expanded fast: ECO Medical Center, Iasis-Larnaca and Apollonion Larnaca cover most outpatient specialties with English-speaking staff and shorter waits than GeSY. Cardiac and orthopaedic specialists are well-represented locally; complex paediatrics, oncology and neurosurgery still tend to flow toward Mediterranean Hospital in Limassol or the New Nicosia General. Pharmacies are everywhere and reliable. Dental care is private only and reasonably priced (€40–€60 cleaning, €700–€1,400 implant). For emergencies, response times in the city are good; in the inland villages, the nearest A&E may be 20–30 minutes away. The 112 EU emergency number works throughout the district.",
      },
      {
        heading: "Beaches, lifestyle and what there is to do",
        body: "Larnaca's defining feature is Finikoudes — a long sandy beach right against the city centre, lined by a wide pedestrian promenade and the city's main restaurant strip. Mackenzie Beach, ten minutes south near the airport, is the more relaxed locals' beach with a continuous strip of beach bars and a Blue Flag designation. Cape Greco, half an hour east toward the Famagusta area, is a national park with sea caves, cliff jumps and good snorkelling. Inland, the salt lake hosts thousands of flamingos from November to March — a small but locally beloved seasonal ritual — and the Hala Sultan Tekke mosque sits on its shore, one of the most important Islamic pilgrimage sites in Cyprus. Inland villages like Lefkara (famous for lace and silver), Choirokoitia (Neolithic UNESCO site) and the Stavrovouni Monastery are easy day trips. The food scene is more casual than Limassol — fish tavernas along Piale Pasha, traditional meze houses in the inland villages, and a small but growing specialty-coffee scene around Finikoudes.",
      },
      {
        heading: "Sample monthly budget for a couple",
        body: "Larnaca is the cheapest of the major Cypriot cities. For a couple owning a two-bedroom apartment outright in a central or near-central area: utilities €170–€240; common charges in a building with a pool €100–€180; municipal taxes €25–€40; groceries €420–€580 (the same Lidl/Sklavenitis/Carrefour mix as elsewhere); restaurants 3 times a week €230–€370; one car €170–€260 all-in; private health top-up €70–€140 per person. Total: roughly €1,400–€2,050 per month before discretionary spending. For renters, a two-bedroom in central Larnaca runs €700–€1,200 unfurnished and €900–€1,500 furnished — meaningfully below Limassol equivalents. Larnaca's airport proximity is also a hidden financial advantage: low-cost European flights are abundant and consistently cheaper than from Paphos, which adds up if you travel back to family in the UK, Greece or Israel several times a year.",
      },
      {
        heading: "Common buyer mistakes",
        body: "Larnaca buyers most commonly mis-assess airport flight-path noise and the proximity of new developments to the airport perimeter. The flight path runs roughly east-west over the southern coastal strip; certain new developments south of the salt lake sit directly under it and noise during peak summer schedules is meaningful. Get a feel for the noise in person before buying, especially weekend mornings in July and August. Second, buyers underestimate how much development is still planned along the entire coastal strip between Larnaca and Mackenzie — a current sea view can be construction-site-blocked within two years. Check the local municipality's planning portal for any pending permits within 200 metres of your prospective unit. Third, inland villages like Pyla have unusually complex history (Pyla is one of only four mixed Greek-Cypriot/Turkish-Cypriot villages on the island, sitting partly within the UN buffer zone) — title-deed history can be unusual; use a lawyer experienced in the specific village.",
      },
      {
        heading: "Frequently asked questions",
        body: "Is the airport noise a deal-breaker? Only for developments directly under the flight path on the southern coastal strip — most of the city is unaffected. Why are prices so much lower than Limassol? Larnaca has historically lacked Limassol's corporate employment base; that has been changing rapidly with the new Larnaca Casino-resort project and the planned port redevelopment, but pricing hasn't caught up yet, which is part of the buyer opportunity. Is the salt-lake area pleasant year-round? Beautiful in winter (flamingos) and spring; the lake fully dries up in summer and the area is dusty and hot — buy with that seasonal change in mind. What's the new port redevelopment? The Larnaca Port and Marina concession is currently undergoing a major mixed-use redevelopment scheduled across the late 2020s; expect significant infrastructure improvement to the city centre, plus likely upward pressure on prices in adjacent neighbourhoods. Is Larnaca a good base for families with young children? Yes — the city has a low-key, safe, walkable centre and most amenities (pediatricians, parks, kindergartens) within short driving distances.",
      },
      {
        heading: "Practical relocation notes",
        body: "The airport is the city's biggest practical advantage — almost every major European airline flies into Larnaca, often more cheaply than Paphos. Public transport within the city is unremarkable but the airport bus connections are reliable. Healthcare runs through Larnaca General Hospital plus a handful of private clinics; for major procedures Limassol or Nicosia are 45 minutes by car. International schooling is thinner than in Limassol or Paphos but improving: The American Academy Larnaca and several British curriculum primary schools serve the expat population. The other quiet advantage of Larnaca is climate: it sits on a slightly cooler coastal stretch than Paphos, so summers are more bearable, and the salt lake brings flamingos every winter — a small ritual that locals are extremely proud of.",
      },
    ],
  },
  {
    slug: "nicosia",
    name: "Nicosia",
    color: "#82DDF0",
    oneLiner:
      "The capital — Cyprus's political, financial and academic centre, inland and decidedly non-touristy.",
    intro:
      "Nicosia is the only landlocked capital in the European Union and, by extension, the only major city in Cyprus that doesn't revolve around tourism or the sea. It is the seat of government, the country's banks and the headquarters of most domestic corporates, the home of two major public universities (University of Cyprus, Cyprus University of Technology's Nicosia campus) and the medical school. Half of the city sits within the Republic of Cyprus; the other half is in the Turkish-administered north, separated by the United Nations buffer zone that runs straight through the old walled centre. The southern half — the part this map and this site cover — is a busy, slightly chaotic, decidedly Cypriot city.",
    sections: [
      {
        heading: "Who moves to Nicosia",
        body: "Nicosia is the least international of the major Cypriot cities by relocator share, but the most international by long-term residents. It hosts the country's diplomatic corps, the bulk of the academic faculty, and the senior management of most Cypriot companies. The expat population is older and more rooted than in Limassol — diplomats, university professors, multi-decade business families. A growing population of younger Greeks and Bulgarians is moving to Nicosia for university and software jobs at the local engineering employers. Tourism is essentially absent: in mid-July when Limassol is overrun, Nicosia's old town is so quiet you can hear the call to prayer drifting across the buffer zone from the Turkish side.",
      },
      {
        heading: "What new developments here look like",
        body: "Nicosia's new-build market is concentrated in the suburbs — Strovolos, Aglantzia, Lakatamia, Engomi, Latsia — rather than the historic centre. The product is overwhelmingly mid-rise apartment blocks, three to seven storeys, oriented around family living rather than rental yield. A two-bedroom new apartment in Strovolos or Aglantzia sits between €220,000 and €380,000. Detached and semi-detached houses in the same suburbs (often grouped into small gated communities of six to twelve units) run from €450,000 to €900,000. Nicosia pricing is roughly in line with Larnaca and consistently below Limassol; the trade-off is that you live an hour from any beach.",
      },
      {
        heading: "Schools and education",
        body: "Nicosia has the deepest school market on the island. The English School Nicosia, founded 1900 by the British colonial administration, is the oldest and most prestigious — selective entry, strong A-level outcomes, fees around €6,000–€9,000. The American International School (AIS) Cyprus offers a US-style curriculum with IB Diploma; the school is on a single shared campus in Engomi and serves the diplomatic community as well as international families. The Junior School and The Falcon School cover early-years through to secondary in British curriculum. The Pascal Schools and The Grammar School Nicosia (sister of the Limassol institution) round out the English-medium options. For Greek-medium private education, Manessis School and the Grammar are the established names. The University of Cyprus (the country's flagship public university) and the University of Nicosia (the largest private university and home of the medical school) make Nicosia a serious tertiary destination — many expat families choose Nicosia specifically because their children will continue on to local university.",
      },
      {
        heading: "Healthcare in Nicosia",
        body: "Nicosia has the country's strongest healthcare infrastructure. The New Nicosia General Hospital opened in 2021 as the country's main referral hospital — major trauma, complex cardiac, the bulk of public oncology, paediatric subspecialties — and is fully integrated with GeSY. The Bank of Cyprus Oncology Centre is the country's flagship cancer facility. Private hospitals — Apollonion, Aretaeio, Hippocrateon, Evangelistria — cover all major specialties. The country's medical school (at the University of Nicosia) produces the next generation of physicians and is internationally accredited. Practically, this means Nicosia residents have the shortest waits, the best specialist density, and the broadest dental/ophthalmology/aesthetics market on the island. English-speaking specialists are abundant. The downside is that the central suburbs are car-dependent; ambulance response in central Nicosia is fast, in the outer Lakatamia or Geri areas occasionally slower.",
      },
      {
        heading: "Beaches, lifestyle and what there is to do",
        body: "Nicosia's principal handicap is the absence of beaches — the nearest swimming sea is Larnaca, 50 minutes by car, or Limassol, an hour. Many Nicosia families own or rent a summer apartment on the coast for July and August. To compensate, Nicosia has by some distance the strongest cultural scene on the island: the old walled city (the Venetian fortifications still ring the historic centre), the Cyprus Museum, the Leventis Museum, the State Gallery of Contemporary Art, and a constant rotation of theatre, classical music and contemporary performance at the Strovolos and Nicosia Municipal Theatres. The historic centre — particularly Ledra Street, Faneromeni Square and the Laiki Geitonia area — has the country's best concentration of independent cafés, bookshops, galleries and small bars. The Cyprus University of Technology campus and the University of Cyprus bring a real student-quarter energy to the Aglantzia and Strovolos areas. For weekends, the Troodos mountains are 40 minutes away — skiing in winter (yes, on Cyprus), hiking and wine-village tours the rest of the year.",
      },
      {
        heading: "Sample monthly budget for a couple",
        body: "Nicosia sits in the middle of the Cypriot cost spectrum. For a couple owning a two-bedroom apartment outright in a central suburb (Strovolos, Aglantzia, Engomi): utilities €180–€280 (Nicosia's continental climate means higher heating bills in winter and higher aircon in summer); common charges €100–€180; municipal €25–€45; groceries €440–€590; restaurants 3 times a week €240–€380 (Nicosia has cheaper dining than the coast but a denser fine-dining scene at the higher end); one car €180–€280; private health top-up €70–€130 per person. Total: roughly €1,440–€2,090 per month. For renters, a two-bedroom in Strovolos or Aglantzia is €750–€1,300 unfurnished and €950–€1,600 furnished. The Nicosia premium is exclusively in commercial property (offices, retail) — residential pricing is consistently below Limassol and roughly even with Larnaca. The hidden cost is that most Nicosia families maintain summer-coastal access, either through ownership or repeated short-term rentals.",
      },
      {
        heading: "Common buyer mistakes",
        body: "First-time Nicosia buyers most often underestimate the summer heat. Nicosia regularly reads 38–42 °C in July and August (compared to 30–34 °C on the coast); aircon costs are real, and the orientation of your apartment matters enormously. Insist on cross-ventilation, eastern or northern exposure for bedrooms, and high-spec insulation in any new build. Second, buyers tend to pick suburbs based on a quick weekend visit without testing the commute — Nicosia's road network funnels every suburb through a few main arteries (Athalassa Avenue, Limassol Avenue) and 8:30 AM to 9:00 AM is the city's pain point. Third, the proximity of the buffer zone produces small but real considerations: certain streets in the old town and some suburbs (notably parts of Latsia, Anthoupoli, Strovolos) have unusual title-deed history due to displacement after 1974. A locally experienced lawyer is non-negotiable. Fourth, distance from the beach is the trade-off most often regretted; if you've never lived inland in a hot-climate country before, do an honest gut-check before committing.",
      },
      {
        heading: "Frequently asked questions",
        body: "Is the buffer zone a safety concern? No — the UN-monitored buffer zone has been stable and demilitarised in its current form for over fifty years; daily crossings (foot and car) between the two halves of the city are routine. Can you cross to the Turkish-administered north as an expat resident? Yes, daily, with a passport, at several crossing points within and around the city. Can you buy property in the north? Legally and practically very risky — most expats avoid it; this site only covers the Republic. Is Nicosia walkable? The historic centre is excellent for walking; the suburbs are firmly car-dependent. What's the best Nicosia suburb for families with young children? Strovolos and Aglantzia consistently top the list — strong schools, parks, paediatricians, and 15 minutes to the city centre. Is winter genuinely cold? Cold by Mediterranean standards, yes: 3–10 °C overnight in January, occasional sleet, snow on the mountain villages 30 km away. Central heating is essential; many new builds have underfloor heating included as standard.",
      },
      {
        heading: "Practical relocation notes",
        body: "Nicosia has the strongest public healthcare on the island (the New Nicosia General Hospital is the country's main referral hospital) and the broadest selection of public, semi-private and private schools, including The English School Nicosia and the American International School. The city is hot in summer — landlocked and on a high plain, it consistently reads 4–8 °C warmer than the coast — and surprisingly cold in winter, with occasional snow on the higher elevations. Traffic is bad by Cypriot standards (think 30-minute commutes, not 30-second ones) but trivial by any European capital's. The expat community is small enough that almost everyone knows everyone within a year of arrival. Nicosia is rarely the first choice for retirees; it is consistently the choice for relocators who want to work in policy, academia, medicine or domestic business.",
      },
    ],
  },
  {
    slug: "ayia-napa",
    name: "Ayia Napa",
    color: "#E4B7E5",
    oneLiner:
      "The far south-east — beach resorts, family-friendly coves and a quieter year-round expat scene.",
    intro:
      "The Famagusta free area — colloquially Ayia Napa, though it also includes Protaras, Paralimni and Kapparis — is the south-eastern tip of the Republic of Cyprus. It is the part of the island that has the strongest reputation among non-Cypriots, almost entirely as a summer destination: Ayia Napa was Europe's club capital in the early 2000s and is now reinventing itself as a more family-oriented Mediterranean resort. Behind that summer reputation is a quieter year-round expat community, particularly in Paralimni and Protaras — older British families who never left after a holiday, Lebanese second-home owners, and a growing number of Israeli relocators since 2023.",
    sections: [
      {
        heading: "Who moves to the SE",
        body: "The Famagusta free area has the smallest year-round expat community of any region on this map, but a disproportionately committed one. The dominant group is British: a generation of buyers who came in the 1990s and 2000s and built up a tight social network around the golf at Aphrodite Hills, the Protaras seafront and the inland villages. Lebanese families with summer homes have become a year-round presence since the 2019–2024 instability in Beirut, and Israeli families are now the fastest-growing inbound segment, generally choosing Protaras over Ayia Napa proper for the slightly more residential feel. The local Cypriot population is significant but spread across the inland villages — Sotira, Liopetri, Frenaros — rather than concentrated in the coastal resort towns.",
      },
      {
        heading: "What new developments here look like",
        body: "Inventory in the Famagusta free area is small — about a tenth of what Limassol produces in any given year — but distinct. The dominant product is the resort-style apartment complex: low-rise (three to five storeys), heavy on shared facilities (pools, gyms, restaurants), and oriented as much toward holiday-letting as toward primary residence. A two-bedroom apartment in a new Protaras complex sits between €280,000 and €450,000. Detached villas in Paralimni and Kapparis go from €500,000 for a basic three-bed to over €1.5 million for a coastal plot with a private pool and direct sea view. The market is unusually seasonal — July and August can see 40% of annual sales — and a meaningful share of buyers are explicit investors targeting short-term holiday-let yields.",
      },
      {
        heading: "Schools and education",
        body: "The Famagusta free area has the thinnest international-school market of the five regions covered here. There are competent British-curriculum primary schools (notably Heritage Private School Paralimni, distinct from the Limassol Heritage but well-regarded) and a small handful of preschools and kindergartens serving the expat community. Secondary-age children are the genuine challenge: most families either commute their children to The American Academy Larnaca (35–45 minutes each way) or one of the Larnaca British schools, or — for a small minority — board in Nicosia. Public Greek-medium schools in Paralimni and Sotira are good and have absorbed a meaningful number of expat children, particularly at the primary level. For families with multiple school-age children, the schooling calculus is the single most-cited reason for choosing Larnaca over the SE coast despite preferring the SE's beaches. For tertiary education, the area lacks any local university campus; students typically attend Nicosia or Limassol institutions or go abroad.",
      },
      {
        heading: "Healthcare in the SE",
        body: "Paralimni General Hospital is the public facility serving the entire Famagusta free area. It is functional for common emergencies and routine care, and integrated with GeSY, but its specialty depth is the thinnest of any major hospital on the island — anything complex (cardiac surgery, oncology, neurosurgery) is referred to Larnaca, Nicosia or Limassol. Private clinics are limited but growing: ECO Larnaca has a Paralimni satellite, and a handful of private GPs and dentists serve the resort towns year-round. The bigger practical consideration is access to specialists: families with chronic conditions sometimes find themselves driving to Larnaca or further three or four times a month. For acute emergencies, response times in the resort towns are reasonable; in the inland villages (Liopetri, Frenaros, Sotira) they can be 15–25 minutes. The 112 EU emergency line works throughout the region. Many full-time expats supplement GeSY with private insurance specifically to access Limassol or Nicosia specialists without GeSY referral delays.",
      },
      {
        heading: "Beaches, lifestyle and what there is to do",
        body: "This is the region with the strongest beach inventory on the island, full stop. Nissi Beach (Ayia Napa) is the classic European-summer destination — pure white sand, shallow turquoise water, beach bars, lifeguarded. Konnos Beach, between Ayia Napa and Protaras, is a small protected cove with crystal-clear water and pine trees down to the sand — frequently voted Cyprus's prettiest beach. Fig Tree Bay (Protaras) is the family default — long, sandy, gently shelving, with a small island swimmable from shore. Cape Greco, the national park between Ayia Napa and Protaras, has sea caves, cliff jumps and the iconic 'Bridge of Lovers' rock arch. Beyond the beaches, the area has the country's highest concentration of water-sports operators, several theme parks (WaterWorld is one of Europe's largest waterparks), and an active diving scene around the sunken MS Zenobia just off Larnaca (the wreck is one of the world's best-rated dives). Year-round, the resort towns slow down dramatically in November–March, but the beaches stay swimmable into October and from May, with the warmest sea on the island for a longer season than anywhere else in Cyprus.",
      },
      {
        heading: "Sample monthly budget for a couple",
        body: "Year-round costs in the SE are similar to Larnaca, with some seasonal quirks. For a couple owning a two-bedroom apartment outright in Protaras or Paralimni: utilities €170–€260; common charges in resort complexes €150–€280 (the resort-style amenities push these higher than equivalent Larnaca buildings); municipal €25–€40; groceries €430–€590; restaurants 3 times a week €220–€370 (off-season prices, summer doubles); one car €170–€260; private health top-up €70–€140 per person. Total: roughly €1,470–€2,170 per month off-season. The peculiarity of the area is summer pricing: from June to September, restaurants run resort prices (30–50% higher than off-season), supermarket lines are long, and the locals' lifestyle changes meaningfully. Owners often hold off on big spending until October. Renters face a different challenge — long-term rentals are scarce because most units are aimed at holiday letting; expect €750–€1,400 for a year-round two-bedroom and significantly more if you sign for a calendar year that includes the high season.",
      },
      {
        heading: "Common buyer mistakes",
        body: "The single most-regretted SE purchase is the 'summer-romance' buy — visiting once in August, falling for the beaches, and committing to a year-round residence that proves dramatically quieter in winter. A meaningful share of Ayia Napa expat families end up buying a second base in Larnaca or Limassol within two years, specifically for the November–March months. Second mistake: buying purely for holiday-let yield without modelling realistic occupancy. Holiday-let returns in Protaras and Ayia Napa can be strong (6–9% gross) but assume 90+ nights/year of high-season demand and competitive pricing against an ever-growing supply. Use the local Booking.com data to triangulate before signing. Third, school logistics — see the schools section. If you have secondary-age children, the commute to Larnaca will dominate your daily life. Fourth, certain coastal developments are vulnerable to construction noise from the broader Famagusta-area rebuilding; the post-1974 displaced communities are still in slow process of returning to certain areas, and local construction activity can be heavier than the existing skyline suggests.",
      },
      {
        heading: "Frequently asked questions",
        body: "Is the area dead in winter? Not dead, but very quiet. Most restaurants reopen by mid-March and run through October; a smaller core of locals' tavernas and supermarkets stay open year-round. What about Famagusta proper — the closed city of Varosha? Varosha is in the Turkish-administered north, partially reopened to visitors since 2020 but with significant restrictions and no legal property ownership available to Republic-of-Cyprus expats. The Republic-controlled Famagusta free area on this map is entirely separate. Is the area good for digital nomads / remote workers? Reasonable internet (fibre in the main towns), but the lack of a coworking scene and the strongly seasonal social life mean most remote workers eventually gravitate toward Larnaca or Limassol. Are there any tax advantages specific to this region? No — Cyprus tax residency rules are national, not regional. What's the air-traffic situation? Larnaca Airport is 35–45 minutes from Protaras and 40–50 minutes from Ayia Napa, depending on traffic; no airport closer.",
      },
      {
        heading: "Practical relocation notes",
        body: "The Famagusta free area is the most remote part of the Republic of Cyprus, in the sense that it is furthest from both major airports — Larnaca is 45 minutes away, Paphos 2 hours. The healthcare infrastructure is the thinnest of the five regions: there is a Paralimni General Hospital, but for anything serious people drive to Larnaca or Nicosia. International schooling exists but is small-scale: a couple of British-curriculum primary schools, and most secondary-age children either commute to Larnaca or board. Internet, water and power are reliable. The big advantage is climate and beaches: the south-east coast has the warmest sea on the island (typically 27–28 °C in summer, well into October) and the highest concentration of Blue Flag beaches anywhere in the country. It is, by a wide margin, the most beach-defined region in this guide.",
      },
    ],
  },
];

export function regionBySlug(slug: string): RegionInfo | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
