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
      <aside className="p-5 bg-sky border border-line rounded-2xl">
        <p className="text-[10px] font-semibold text-ink uppercase tracking-wider mb-3">
          Related guides
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="flex items-start gap-2 p-3 bg-white border border-line rounded-xl hover:border-primary hover:bg-sky-strong transition-colors group"
            >
              <span className="flex-1 text-xs font-semibold text-ink group-hover:text-primary line-clamp-2">
                {g.title}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
