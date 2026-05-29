import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore Cyprus — All Sections, Guides & Tools — RealCy.app",
  description:
    "Browse all sections of RealCy.app: property, legal, business, family, healthcare, lifestyle, community, arts, food, environment, guides, and interactive tools for relocating to Cyprus.",
  alternates: { canonical: "/explore/" },
};

type SectionItem = { name: string; href: string };
type Category = { title: string; items: SectionItem[] };

const CATEGORIES: Category[] = [
  {
    title: "Property & Housing",
    items: [
      { name: "Long-Term Rentals", href: "/sections/long-term-rentals" },
      { name: "Co-Living", href: "/sections/co-living" },
      { name: "Property Management", href: "/sections/property-management" },
    ],
  },
  {
    title: "Legal & Professional",
    items: [
      { name: "Property Lawyers", href: "/sections/property-lawyers" },
      { name: "Immigration Lawyers", href: "/sections/immigration-lawyers" },
      { name: "Accountants", href: "/sections/accountants" },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Startup Ecosystem", href: "/sections/startup-ecosystem" },
      { name: "Registered Address", href: "/sections/registered-address" },
      { name: "Coworking", href: "/sections/coworking" },
    ],
  },
  {
    title: "Family & Education",
    items: [
      { name: "Childcare & Nurseries", href: "/sections/childcare-nurseries" },
      {
        name: "After-School Activities",
        href: "/sections/after-school-activities",
      },
      { name: "Summer Camps", href: "/sections/summer-camps" },
    ],
  },
  {
    title: "Healthcare",
    items: [
      { name: "Specialist Doctors", href: "/sections/specialist-doctors" },
      {
        name: "Mental Health Services",
        href: "/sections/mental-health-services",
      },
      { name: "Veterinary Services", href: "/sections/veterinary-services" },
    ],
  },
  {
    title: "Active Living",
    items: [
      { name: "Fitness & Wellness", href: "/sections/fitness-wellness" },
      { name: "Sports Clubs", href: "/sections/sports-clubs" },
      { name: "EV Charging", href: "/sections/ev-charging" },
    ],
  },
  {
    title: "Getting Around",
    items: [
      { name: "Public Transport", href: "/sections/public-transport" },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Expat Communities", href: "/sections/expat-communities" },
      { name: "Religious Services", href: "/sections/religious-services" },
      { name: "Volunteering", href: "/sections/volunteering" },
    ],
  },
  {
    title: "Arts & Culture",
    items: [
      { name: "Art & Culture", href: "/sections/art-culture" },
      { name: "Wineries", href: "/sections/wineries" },
    ],
  },
  {
    title: "Food & Drink",
    items: [
      { name: "Farmers Markets", href: "/sections/farmers-markets" },
      {
        name: "International Grocery",
        href: "/sections/international-grocery",
      },
      { name: "Halal & Kosher", href: "/sections/halal-kosher" },
      { name: "Rooftop Bars", href: "/sections/rooftop-bars" },
    ],
  },
  {
    title: "Environment",
    items: [
      { name: "Community Gardens", href: "/sections/community-gardens" },
    ],
  },
  {
    title: "Guides",
    items: [{ name: "All Relocation Guides", href: "/guides/" }],
  },
  {
    title: "Interactive Tools",
    items: [{ name: "All Relocation Tools", href: "/tools/" }],
  },
];

export default function ExplorePage() {
  return (
    <main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        &rsaquo; <span className="text-slate-900">Explore</span>
      </nav>

      <header className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Site Directory
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Explore RealCy.app
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Everything you need to plan and execute your move to Cyprus — organised by category.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="bg-white border border-slate-200 rounded-xl p-5"
          >
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
              {category.title}
            </h2>
            <ul className="space-y-1.5">
              {category.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-700 hover:text-[#35cdc4] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xs">
                      →
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-slate-500">
        <Link href="/" className="underline hover:text-slate-900">
          &larr; Back to the map
        </Link>
      </p>
    </main>
  );
}
