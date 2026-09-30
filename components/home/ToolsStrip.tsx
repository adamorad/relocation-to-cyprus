import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import {
	HOME_TOOLS,
	HOME_TOOLS_HEADING,
	HOME_TOOLS_SUBTITLE,
} from "@/lib/home-content";

export function ToolsStrip() {
	return (
		<section
			aria-labelledby="tools-title"
			className="mx-auto max-w-[1280px] px-5 pb-10 md:px-8"
		>
			<div className="rounded-panel bg-sky-strong p-5 md:p-6 min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] min-[1100px]:items-center min-[1100px]:gap-6">
				<div>
					<h2
						id="tools-title"
						className="text-[clamp(26px,2.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink"
					>
						{HOME_TOOLS_HEADING}
					</h2>
					<p className="mt-3 text-base leading-normal text-muted">
						{HOME_TOOLS_SUBTITLE}
					</p>
				</div>
				<ul className="mt-5 grid gap-3 md:grid-cols-3 min-[1100px]:mt-0">
					{HOME_TOOLS.map((t) => (
						<li key={t.id} className="flex">
							<Link
								href={t.href}
								className="flex min-h-12 w-full items-center gap-4 rounded-card border border-line bg-white p-4 text-ink transition-colors hover:border-primary"
							>
								<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-field bg-sky text-primary">
									<Icon name={t.icon} size={26} />
								</span>
								<span className="min-w-0">
									<span className="block text-base font-bold leading-snug">
										{t.title}
									</span>
									<span className="block text-base leading-snug text-muted">
										{t.description}
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
