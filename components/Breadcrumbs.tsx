import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
	return (
		<nav aria-label="Breadcrumb" className="text-xs text-slate-600 mb-6">
			{items.map((item, i) => {
				const last = i === items.length - 1;
				return (
					<span key={item.label}>
						{item.href && !last ? (
							<Link href={item.href} className="hover:text-slate-900">
								{item.label}
							</Link>
						) : (
							<span
								className={last ? "text-slate-900" : undefined}
								aria-current={last ? "page" : undefined}
							>
								{item.label}
							</span>
						)}
						{!last && <span aria-hidden="true">{" › "}</span>}
					</span>
				);
			})}
		</nav>
	);
}
