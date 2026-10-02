import { hubHref, TOPICS } from "./topics";

export type NavLink = {
	label: string;
	href: string;
	/** Other sections that mark this link as current (e.g. Property's pages). */
	match?: ReadonlyArray<string>;
};

/**
 * Header links after the Topics menu (header bar and mobile menu).
 * Topics itself is a menu of the eight topic hubs (`TOPIC_NAV`).
 */
export const PRIMARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Cities", href: "/regions/" },
	{ label: "Guides", href: "/guides/" },
	{ label: "Tools", href: "/tools/" },
];

/** The eight topic hubs, in topic order, for the Topics menu. */
export const TOPIC_NAV: ReadonlyArray<
	NavLink & { icon: (typeof TOPICS)[number]["icon"] }
> = TOPICS.map((t) => ({ label: t.name, href: hubHref(t), icon: t.icon }));

/** Secondary links, shown in the mobile menu and the desktop More disclosure. */
export const SECONDARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Local directories", href: "/sections/" },
	{
		label: "Property",
		href: "/property/",
		match: ["/listings/", "/developers/", "/my-shortlist/"],
	},
	{ label: "About", href: "/about/" },
	{ label: "Advertise", href: "/advertise/" },
];

/** True when the pathname is within the link's section or one it `match`es. */
export function isNavActive(pathname: string, link: NavLink): boolean {
	return [link.href, ...(link.match ?? [])].some((h) => isActive(pathname, h));
}

/**
 * aria-current value for a nav link: "page" on the link's own page, "true"
 * when the page only belongs to its section (e.g. /listings/ under Property).
 */
export function navCurrent(
	pathname: string,
	link: NavLink,
): "page" | "true" | undefined {
	if (!isNavActive(pathname, link)) return undefined;
	return pathname === link.href || pathname === link.href.replace(/\/$/, "")
		? "page"
		: "true";
}

/** True when the current pathname is within the nav item's section. */
export function isActive(pathname: string, href: string): boolean {
	const clean = href.replace(/\/$/, "");
	if (clean === "") return pathname === "/";
	return pathname === clean || pathname.startsWith(`${clean}/`);
}
