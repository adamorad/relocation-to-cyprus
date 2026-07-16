import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Card wrapper that drops an interactive tool (calculator) inline inside a
 * guide, mid-content. Tools have ~0% bounce vs guides' 50-80%, so embedding
 * the matching calculator turns a leaking read into an interaction.
 */
export function EmbeddedTool({
	eyebrow = "Interactive tool",
	title,
	subtitle,
	toolHref,
	toolLabel = "Open the full tool",
	children,
}: {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	toolHref: string;
	toolLabel?: string;
	children: ReactNode;
}) {
	return (
		<section className="not-prose my-10 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
			<div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
				<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#35cdc4]">
					{eyebrow}
				</p>
				<h2 className="mt-1 text-lg font-bold text-slate-900">{title}</h2>
				{subtitle ? (
					<p className="mt-1 text-sm text-slate-600">{subtitle}</p>
				) : null}
			</div>
			<div className="px-4 py-5 sm:px-5">{children}</div>
			<div className="border-t border-slate-100 px-5 py-3 text-right">
				<Link
					href={toolHref}
					className="text-xs font-semibold text-[#35cdc4] hover:underline"
				>
					{toolLabel} →
				</Link>
			</div>
		</section>
	);
}
