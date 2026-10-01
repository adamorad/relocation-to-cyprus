import { Breadcrumbs as UiBreadcrumbs } from "@/components/ui/Breadcrumbs";

export type { Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Legacy entry point kept for pages not yet on a template. Renders the shared
 * breadcrumb without JSON-LD, because these pages still hand-write their
 * BreadcrumbList. Migrated pages use PageHeader (or ui/Breadcrumbs) instead.
 */
export function Breadcrumbs({
	items,
}: {
	items: { label: string; href?: string }[];
}) {
	return <UiBreadcrumbs items={items} jsonLd={false} className="mb-6" />;
}
