export type NavLink = { label: string; href: string };

/** The four primary destinations shown in the header bar and mobile menu. */
export const PRIMARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Daily life", href: "/sections/" },
	{ label: "Places", href: "/regions/" },
	{ label: "Guides", href: "/guides/" },
	{ label: "Tools", href: "/tools/" },
];

/** Saved shortlist (localStorage, new-build listings). No sign-in on this site. */
export const SAVED_LINK: NavLink = { label: "Saved", href: "/my-shortlist/" };

/** Secondary links, shown in the mobile menu and the desktop More disclosure. */
export const SECONDARY_NAV: ReadonlyArray<NavLink> = [
	{ label: "Moving to Cyprus", href: "/moving-to-cyprus/" },
	{ label: "New developments", href: "/listings/" },
	{ label: "Explore", href: "/explore/" },
	{ label: "Advertise", href: "/advertise/" },
];

/** True when the current pathname is within the nav item's section. */
export function isActive(pathname: string, href: string): boolean {
	const clean = href.replace(/\/$/, "");
	if (clean === "") return pathname === "/";
	return pathname === clean || pathname.startsWith(`${clean}/`);
}
