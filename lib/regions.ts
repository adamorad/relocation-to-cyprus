/**
 * Region content used by app/regions/[name]/page.tsx and the homepage hover
 * preview. Each region has long-form copy (~1000 words) — written for search
 * engines + relocation-curious readers.
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
        heading: "Practical relocation notes",
        body: "Paphos has a hospital (Paphos General) and a growing roster of private clinics, but for anything specialist most expats still drive to Limassol. International schooling is good and competitively priced relative to other Mediterranean destinations: The International School of Paphos and Aspire Private British School cover ages 3 to 18, with annual fees running €5,000 to €9,000. The town runs on cars — there is local bus coverage along the coast but it is rarely a serious commuting option. Internet is universally fast (1 Gbps fibre is available across the urban area) which makes Paphos particularly attractive to remote workers, and many new developments now ship with dedicated home-office floor plans. Climate-wise, Paphos is consistently a few degrees warmer in winter than Nicosia or Larnaca and has noticeably more sunshine hours, which is the single most-cited reason buyers give for choosing it over the rest of the island.",
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
        heading: "Practical relocation notes",
        body: "The Famagusta free area is the most remote part of the Republic of Cyprus, in the sense that it is furthest from both major airports — Larnaca is 45 minutes away, Paphos 2 hours. The healthcare infrastructure is the thinnest of the five regions: there is a Paralimni General Hospital, but for anything serious people drive to Larnaca or Nicosia. International schooling exists but is small-scale: a couple of British-curriculum primary schools, and most secondary-age children either commute to Larnaca or board. Internet, water and power are reliable. The big advantage is climate and beaches: the south-east coast has the warmest sea on the island (typically 27–28 °C in summer, well into October) and the highest concentration of Blue Flag beaches anywhere in the country. It is, by a wide margin, the most beach-defined region in this guide.",
      },
    ],
  },
];

export function regionBySlug(slug: string): RegionInfo | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
