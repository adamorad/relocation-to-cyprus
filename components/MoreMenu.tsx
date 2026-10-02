"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	isActive,
	isNavActive,
	navCurrent,
	SECONDARY_NAV,
	TOPIC_NAV,
} from "@/lib/nav-links";
import { Icon } from "./icons/Icon";
import { NavDisclosure } from "./NavDisclosure";

const ITEM =
	"flex min-h-11 items-center rounded-field px-3 text-base font-medium hover:bg-sky hover:text-ink";

/** Desktop "More" disclosure holding the secondary links. */
export function MoreMenu() {
	const pathname = usePathname() ?? "/";
	const hasActive = SECONDARY_NAV.some((l) => isNavActive(pathname, l));
	return (
		<NavDisclosure label="More" panelId="site-more" active={hasActive}>
			{(close) => (
				<ul aria-label="More">
					{SECONDARY_NAV.map((item) => {
						const active = isNavActive(pathname, item);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									aria-current={navCurrent(pathname, item)}
									onClick={close}
									className={`${ITEM} ${active ? "bg-sky text-ink" : "text-muted"}`}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</NavDisclosure>
	);
}

/** Desktop "Topics" disclosure: the eight topic hubs with their icons. */
export function TopicsMenu() {
	const pathname = usePathname() ?? "/";
	const hasActive = TOPIC_NAV.some((l) => isActive(pathname, l.href));
	return (
		<NavDisclosure
			label="Topics"
			panelId="site-topics"
			align="left"
			active={hasActive}
			panelClassName="w-[30rem] max-w-[calc(100vw-2.5rem)]"
		>
			{(close) => (
				<ul aria-label="Topics" className="grid grid-cols-2 gap-1">
					{TOPIC_NAV.map((item) => {
						const active = isActive(pathname, item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									aria-current={active ? "page" : undefined}
									onClick={close}
									className={`flex min-h-12 items-center gap-3 rounded-field px-2.5 py-1.5 text-base font-semibold text-ink hover:bg-sky ${
										active ? "bg-sky" : ""
									}`}
								>
									<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-field bg-sky-strong text-primary">
										<Icon name={item.icon} size={20} />
									</span>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</NavDisclosure>
	);
}
