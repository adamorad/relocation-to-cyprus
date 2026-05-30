export type SectionEntry = {
  name: string;
  slug: string;
  category: string;
  description: string;
};

export const SECTIONS_INDEX: ReadonlyArray<SectionEntry> = [
  // Property & Housing
  {
    name: "Long-Term Rentals",
    slug: "long-term-rentals",
    category: "Property & Housing",
    description: "Verified rental listings across all five cities — apartments, villas, and studios.",
  },
  {
    name: "Co-Living & Serviced Apartments",
    slug: "co-living",
    category: "Property & Housing",
    description: "Month-to-month co-living options for digital nomads and new arrivals.",
  },
  {
    name: "Property Management",
    slug: "property-management",
    category: "Property & Housing",
    description: "Licensed property managers for non-resident owners renting out their Cyprus property.",
  },

  // Legal & Professional
  {
    name: "Property Lawyers",
    slug: "property-lawyers",
    category: "Legal & Professional",
    description: "Vetted conveyancing solicitors specialising in foreign buyer transactions.",
  },
  {
    name: "Immigration Lawyers",
    slug: "immigration-lawyers",
    category: "Legal & Professional",
    description: "Immigration specialists covering digital nomad visas, PR by investment, and work permits.",
  },
  {
    name: "Accountants & Tax Advisors",
    slug: "accountants",
    category: "Legal & Professional",
    description: "ICPAC-registered accountants with experience in expat non-dom filings and company tax.",
  },

  // Business
  {
    name: "Startup Ecosystem",
    slug: "startup-ecosystem",
    category: "Business",
    description: "Co-working spaces, incubators, accelerators, and tech hubs across Cyprus.",
  },
  {
    name: "Registered Address Providers",
    slug: "registered-address",
    category: "Business",
    description: "Virtual office and registered address services for Cyprus-registered companies.",
  },
  {
    name: "Coworking Spaces",
    slug: "coworking",
    category: "Business",
    description: "Day pass prices, WiFi speeds, and noise levels for 20+ coworking venues island-wide.",
  },

  // Family & Education
  {
    name: "Childcare & Nurseries",
    slug: "childcare-nurseries",
    category: "Family & Education",
    description: "Registered nurseries and pre-schools with English instruction across all districts.",
  },
  {
    name: "After-School Activities",
    slug: "after-school-activities",
    category: "Family & Education",
    description: "Sports clubs, music academies, language classes, and arts programs for children aged 4–18.",
  },
  {
    name: "Summer Camps",
    slug: "summer-camps",
    category: "Family & Education",
    description: "Residential and day camps for children — language immersion, sports, STEM, and arts.",
  },

  // Healthcare
  {
    name: "Specialist Doctors",
    slug: "specialist-doctors",
    category: "Healthcare",
    description: "English-speaking specialist consultants with GeSY status and private pricing.",
  },
  {
    name: "Mental Health Services",
    slug: "mental-health-services",
    category: "Healthcare",
    description: "English-speaking therapists, psychologists, and psychiatrists across Cyprus.",
  },
  {
    name: "Veterinary Services",
    slug: "veterinary-services",
    category: "Healthcare",
    description: "English-speaking vet clinics with emergency care and specialist referrals.",
  },

  // Active Living
  {
    name: "Fitness & Wellness Studios",
    slug: "fitness-wellness",
    category: "Active Living",
    description: "Gyms, yoga, CrossFit, Pilates, and wellness centres with pricing and language flags.",
  },
  {
    name: "Sports & Recreation Clubs",
    slug: "sports-clubs",
    category: "Active Living",
    description: "Tennis, golf, sailing, padel, hiking groups, and more — with membership fees.",
  },
  {
    name: "EV Charging Stations",
    slug: "ev-charging",
    category: "Active Living",
    description: "Public EV charging points by city with charger type and operator details.",
  },

  // Getting Around
  {
    name: "Public Transport",
    slug: "public-transport",
    category: "Getting Around",
    description: "Bus routes, Bolt availability, taxi apps, and monthly pass costs by city.",
  },

  // Community
  {
    name: "Expat Community Groups",
    slug: "expat-communities",
    category: "Community",
    description: "Active Facebook groups, WhatsApp communities, and Meetup events by city and nationality.",
  },
  {
    name: "Religious Services",
    slug: "religious-services",
    category: "Community",
    description: "English-language churches, mosques, synagogues, and temples across all districts.",
  },
  {
    name: "Volunteering Opportunities",
    slug: "volunteering",
    category: "Community",
    description: "NGOs, animal shelters, environmental groups, and community orgs welcoming expat volunteers.",
  },

  // Arts & Culture
  {
    name: "Art Galleries & Museums",
    slug: "art-culture",
    category: "Arts & Culture",
    description: "Galleries, museums, and cultural venues with English signage and exhibition schedules.",
  },
  {
    name: "Wineries & Wine Tourism",
    slug: "wineries",
    category: "Arts & Culture",
    description: "Wine-producing villages and tasting rooms across the Troodos foothills.",
  },

  // Food & Drink
  {
    name: "Farmers Markets",
    slug: "farmers-markets",
    category: "Food & Drink",
    description: "Weekly markets and local produce stalls across all districts with operating days.",
  },
  {
    name: "International Grocery Stores",
    slug: "international-grocery",
    category: "Food & Drink",
    description: "Supermarkets and specialty stores carrying Asian, Middle Eastern, and other international foods.",
  },
  {
    name: "Halal & Kosher Food",
    slug: "halal-kosher",
    category: "Food & Drink",
    description: "Certified halal and kosher restaurants, butchers, and grocery suppliers.",
  },
  {
    name: "Rooftop & Sea View Bars",
    slug: "rooftop-bars",
    category: "Food & Drink",
    description: "Rooftop and sea-view venues across the island with price ranges and reservation notes.",
  },

  // Environment
  {
    name: "Community Gardens",
    slug: "community-gardens",
    category: "Environment",
    description: "Allotment schemes and urban farming initiatives — plus growing calendar tips for Cyprus's climate.",
  },
];

export const SECTION_CATEGORIES = [
  "Property & Housing",
  "Legal & Professional",
  "Business",
  "Family & Education",
  "Healthcare",
  "Active Living",
  "Getting Around",
  "Community",
  "Arts & Culture",
  "Food & Drink",
  "Environment",
] as const;

export type SectionCategory = (typeof SECTION_CATEGORIES)[number];
