import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RealCy.app",
  description:
    "RealCy.app is a portal for anything Cyprus — starting with new-build real estate, expanding to rentals, hotels, food, shopping and more.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>{" "}
        › <span className="text-slate-900">About</span>
      </nav>

      <header>
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          About
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Your Cyprus portal.
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          RealCy.app exists to make anything Cyprus easier to find, compare and
          plan. We start with new-build real estate because that is the
          decision people anchor a relocation around — and from there we
          expand.
        </p>
      </header>

      <section className="mt-10 prose prose-slate max-w-none">
        <h2 className="text-xl font-bold mb-2">What you can do today</h2>
        <p className="text-slate-700 leading-relaxed">
          Browse new-build apartments, residences and villas across Paphos,
          Limassol, Larnaca and Ayia Napa. Filter by price, bedrooms,
          bathrooms, type, view, energy class, pool, accessibility and minimum
          living area. Read region guides and step-by-step relocation guides
          on residency, taxes and cost of living.
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
            className="text-amber-700 hover:text-amber-900 underline"
          >
            get in touch
          </Link>
          .
        </p>
      </section>

      <aside className="mt-12 p-5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">
          Have a question, a listing to add, or a category you want next?
        </p>
        <p>
          <Link
            href="/contact/"
            className="text-amber-700 hover:text-amber-900 font-semibold underline"
          >
            Tell us →
          </Link>
        </p>
      </aside>

      <p className="mt-10 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
