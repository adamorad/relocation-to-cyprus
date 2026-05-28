"use client";

import { trackEvent } from "@/lib/analytics";

interface Props {
  name: string;
  searchHref: string;
  slug: string;
}

export default function DeveloperCTA({ name, searchHref, slug }: Props) {
  return (
    <section className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
      <p className="text-xs text-slate-500 mb-0.5">Developer</p>
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <a
        href={searchHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block w-full text-center py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
        onClick={() => trackEvent("developer_click", { slug, developer: name })}
      >
        Contact Developer →
      </a>
    </section>
  );
}
