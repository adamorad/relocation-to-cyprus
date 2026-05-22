import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Relocation guides for Cyprus",
  description:
    "Practical guides for relocating to Cyprus — residency, cost of living, taxes, and more.",
  alternates: { canonical: "/guides/" },
};

export default function GuidesIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">
          Map
        </Link>{" "}
        › <span className="text-slate-900">Guides</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold">
        Relocation guides
      </h1>
      <p className="mt-3 text-slate-600">
        Practical reading for anyone considering Cyprus — written for people
        deciding whether and how to move.
      </p>
      <ul className="mt-8 space-y-4">
        {GUIDES.map((g) => (
          <li
            key={g.slug}
            className="border border-slate-200 rounded-lg p-4 hover:border-slate-900 transition-colors"
          >
            <Link href={`/guides/${g.slug}/`} className="block">
              <h2 className="text-lg font-bold">{g.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
