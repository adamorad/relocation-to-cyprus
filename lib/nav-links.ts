import { hubHref, TOPICS } from "./topics";

export type NavLink = { label: string; href: string };

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

/** Saved shortlist (localStorage, new-build listings). No sign-in on this site. */
export const SAVED_LINK: NavLink = { label: "Saved", href: "/my-shortlist/" };

/** Secondary links, shown in the mobile menu and the desktop More disclosure. */
export const SECONDARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Local directories", href: "/sections/" },
	{ label: "New developments", href: "/listings/" },
	{ label: "Developers", href: "/developers/" },
	{ label: "About", href: "/about/" },
	{ label: "Advertise", href: "/advertise/" },
];

/** True when the current pathname is within the nav item's section. */
export function isActive(pathname: string, href: string): boolean {
	const clean = href.replace(/\/$/, "");
	if (clean === "") return pathname === "/";
	return pathname === clean || pathname.startsWith(`${clean}/`);
}
