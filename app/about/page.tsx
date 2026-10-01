import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://realcy.app";
const title = "About RealCy.app";
const description = "RealCy.app is an independent guide to living in Cyprus: practical guides, service directories, planning tools and new-build real estate.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about/" },
  openGraph: { title, description, url: `${SITE_URL}/about/`, type: "website" },
};

export default function AboutPage() {
  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-ink">Home</Link>{" "}
        › <span className="text-ink">About</span>
      </nav>

      <header>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
          About
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Your Cyprus portal.
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          RealCy.app makes everyday life in Cyprus easier to find, compare and
          plan. We started with new-build real estate and grew into practical
          guides for people who already live here and for those planning the
          move.
        </p>
      </header>

      <section className="mt-10 prose prose-slate max-w-none">
        <h2 className="text-xl font-bold mb-2">What you can do today</h2>
        <p className="text-slate-700 leading-relaxed">
          Browse new-build apartments, residences and villas across Paphos,
          Limassol, Larnaca and Ayia Napa. Filter by price, bedrooms,
          bathrooms, type, view, energy class, pool, accessibility and minimum
          living area. Read region guides and practical guides on healthcare,
          transport, residency, taxes and cost of living.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-2">What is coming next</h2>
        <p className="text-slate-700 leading-relaxed">
          We are building the rest of the portal in public: long-term rentals,
          hotels for scouting trips, food and dining, shopping and everyday
          services. The "Coming soon" tiles on the homepage track the
          shortlist; we add the next category once the current one is solid.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-2">How we work</h2>
        <p className="text-slate-700 leading-relaxed">
          RealCy.app aggregates publicly listed Cyprus developments and
          presents them on a single map with consistent filters and search.
          We do not currently broker sales — when you find something you like,
          we point you to the developer to take it from there. If a listing is
          inaccurate or you are a developer who wants their project
          represented better, get in touch.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-2">No-fluff promise</h2>
        <ul className="text-slate-700 leading-relaxed list-disc pl-6 space-y-1">
          <li>No paywalls, no signup walls, no dark patterns.</li>
          <li>No invented testimonials, no stock-photo "team".</li>
          <li>
            If we do not yet have something, the tile says "Soon" — it is not
            already live somewhere hidden.
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-2">Built by</h2>
        <p className="text-slate-700 leading-relaxed">
          RealCy.app is an independent project built by a Cyprus relocator —
          someone who went through this process and found the available
          information scattered, outdated, or written for an audience that
          already knew Cyprus. The site is not affiliated with any real-estate
          agency, law firm, or government body. If you have corrections,
          additions, or feedback,{" "}
          <Link
            href="/contact/"
            className="text-primary hover:text-primary-hover underline"
          >
            get in touch
          </Link>
          .
        </p>
      </section>

      <aside className="mt-12 p-5 bg-sky border border-line rounded-2xl text-sm text-ink">
        <p className="font-semibold text-ink mb-1">
          Have a question, a listing to add, or a category you want next?
        </p>
        <p>
          <Link
            href="/contact/"
            className="text-primary hover:text-primary-hover font-semibold underline"
          >
            Tell us
          </Link>
        </p>
      </aside>

      <p className="mt-10 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-ink">
          Back to home
        </Link>
      </p>
    </main>
  );
}
