import type { Metadata } from "next";
import Link from "next/link";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";

export const metadata: Metadata = {
  title: "Contact RealCy.app",
  description:
    "Get in touch with RealCy.app — questions about a Cyprus listing, suggestions, partnerships, or a category you want us to build next.",
  alternates: { canonical: "/contact/" },
};

const EMAIL = "hello@realcy.app";

export default function ContactPage() {
  return (
    <main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <MetaPixelEvent event="Contact" />
      <nav className="text-xs text-slate-600 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        › <span className="text-slate-900">Contact</span>
      </nav>

      <header>
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
          Contact
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
          Get in touch.
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Questions about a listing, a development you would like added, a
          partnership idea, or a "I would use this portal more if you had X"
          note — we read everything.
        </p>
      </header>

      <section className="mt-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
            Email
          </p>
          <p className="mt-2 text-2xl md:text-3xl font-bold">
            <a
              href={`mailto:${EMAIL}`}
              className="text-slate-900 hover:text-amber-700 underline-offset-4 hover:underline"
            >
              {EMAIL}
            </a>
          </p>
          <p className="mt-3 text-sm text-slate-600">
            We reply within a couple of working days. Please include the
            listing URL or developer name if your question is about a specific
            project.
          </p>
        </div>
      </section>

      <section className="mt-10 prose prose-slate max-w-none">
        <h2 className="text-xl font-bold mb-2">Common things people email us about</h2>
        <ul className="text-slate-700 leading-relaxed list-disc pl-6 space-y-1">
          <li>
            <span className="font-semibold text-slate-900">Buyer enquiries:</span>{" "}
            we forward you to the developer; we are not the listing agent.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Developers:</span>{" "}
            if your project is missing or shown with outdated info, send the
            corrections and we update the next build.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Press / partnerships:</span>{" "}
            short pitches please.
          </li>
          <li>
            <span className="font-semibold text-slate-900">Feedback:</span>{" "}
            things that broke, categories you want next, regions that should
            be split out.
          </li>
        </ul>
      </section>

      <p className="mt-12 text-xs text-slate-600">
        <Link href="/" className="underline hover:text-slate-900">
          ← Back to the map
        </Link>
      </p>
    </main>
  );
}
