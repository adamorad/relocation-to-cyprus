"use client";

import Link from "next/link";
import { useState } from "react";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools-index";

export default function ToolsIndexClient() {
	const [active, setActive] = useState<ToolCategory | "all">("all");

	const visible =
		active === "all" ? TOOLS : TOOLS.filter((t) => t.category === active);

	const countFor = (cat: ToolCategory) =>
		TOOLS.filter((t) => t.category === cat).length;

	return (
		<>
			{/* Category filter */}
			<div className="mb-6 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setActive("all")}
					className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
						active === "all"
							? "bg-slate-900 text-white border-slate-900"
							: "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
					}`}
				>
					All ({TOOLS.length})
				</button>
				{TOOL_CATEGORIES.map((cat) => (
					<button
						key={cat}
						type="button"
						onClick={() => setActive(cat)}
						className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
							active === cat
								? "bg-slate-900 text-white border-slate-900"
								: "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
						}`}
					>
						{cat} ({countFor(cat)})
					</button>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{visible.map((tool) => (
					<Link
						key={tool.href}
						href={tool.href}
						className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-[#35cdc4] hover:shadow-md transition-all"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex-1 min-w-0">
								<span
									className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2.5 ${tool.tagColor}`}
								>
									{tool.tag}
								</span>
								<h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">
									{tool.title}
								</h2>
								<p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
									{tool.description}
								</p>
							</div>
							<span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xl mt-1">
								&rarr;
							</span>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
