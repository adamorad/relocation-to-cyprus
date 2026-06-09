import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { SECTION_RELATED_GUIDE_SLUGS } from "@/lib/section-related-guides";

export function SectionRelatedGuides({ sectionSlug }: { sectionSlug: string }) {
  const slugs = SECTION_RELATED_GUIDE_SLUGS[sectionSlug] ?? [];
  if (slugs.length === 0) return null;

  const guides = slugs
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter((g) => g !== undefined);

  if (guides.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pb-10">
      <aside className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider mb-3">
          Related guides
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="flex items-start gap-2 p-3 bg-white border border-amber-100 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors group"
            >
              <span className="flex-1 text-xs font-semibold text-slate-800 group-hover:text-amber-800 line-clamp-2">
                {g.title}
              </span>
              <span className="text-amber-500 text-xs shrink-0 mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
