export type SectionItem = { name: string; href: string };
export type Category = { title: string; items: SectionItem[] };

export const CATEGORIES: Category[] = [
	{
		title: "Property & Housing",
		items: [
			{ name: "Long-Term Rentals", href: "/sections/long-term-rentals/" },
			{ name: "Co-Living", href: "/sections/co-living/" },
			{ name: "Property Management", href: "/sections/property-management/" },
		],
	},
	{
		title: "Legal & Professional",
		items: [
			{ name: "Property Lawyers", href: "/sections/property-lawyers/" },
			{ name: "Immigration Lawyers", href: "/sections/immigration-lawyers/" },
			{ name: "Accountants", href: "/sections/accountants/" },
		],
	},
	{
		title: "Business",
		items: [
			{ name: "Startup Ecosystem", href: "/sections/startup-ecosystem/" },
			{ name: "Registered Address", href: "/sections/registered-address/" },
			{ name: "Coworking", href: "/sections/coworking/" },
		],
	},
	{
		title: "Family & Education",
		items: [
			{ name: "Childcare & Nurseries", href: "/sections/childcare-nurseries/" },
			{
				name: "After-School Activities",
				href: "/sections/after-school-activities/",
			},
			{ name: "Summer Camps", href: "/sections/summer-camps/" },
		],
	},
	{
		title: "Healthcare",
		items: [
			{ name: "Specialist Doctors", href: "/sections/specialist-doctors/" },
			{
				name: "Mental Health Services",
				href: "/sections/mental-health-services/",
			},
			{ name: "Veterinary Services", href: "/sections/veterinary-services/" },
		],
	},
	{
		title: "Active Living",
		items: [
			{ name: "Fitness & Wellness", href: "/sections/fitness-wellness/" },
			{ name: "Sports Clubs", href: "/sections/sports-clubs/" },
			{ name: "EV Charging", href: "/sections/ev-charging/" },
		],
	},
	{
		title: "Getting Around",
		items: [{ name: "Public Transport", href: "/sections/public-transport/" }],
	},
	{
		title: "Community",
		items: [
			{ name: "Expat Communities", href: "/sections/expat-communities/" },
			{ name: "Religious Services", href: "/sections/religious-services/" },
			{ name: "Volunteering", href: "/sections/volunteering/" },
		],
	},
	{
		title: "Arts & Culture",
		items: [
			{ name: "Art & Culture", href: "/sections/art-culture/" },
			{ name: "Wineries", href: "/sections/wineries/" },
		],
	},
	{
		title: "Food & Drink",
		items: [
			{ name: "Farmers Markets", href: "/sections/farmers-markets/" },
			{
				name: "International Grocery",
				href: "/sections/international-grocery/",
			},
			{ name: "Halal & Kosher", href: "/sections/halal-kosher/" },
			{ name: "Rooftop Bars", href: "/sections/rooftop-bars/" },
		],
	},
	{
		title: "Environment",
		items: [
			{ name: "Community Gardens", href: "/sections/community-gardens/" },
		],
	},
	{
		title: "Guides",
		items: [{ name: "All Relocation Guides", href: "/guides/" }],
	},
	{
		title: "Interactive Tools",
		items: [{ name: "All Relocation Tools", href: "/tools/" }],
	},
	{
		title: "Property Developers",
		items: [{ name: "Developer Profiles", href: "/developers/" }],
	},
	{
		title: "My Lists",
		items: [{ name: "Saved Shortlist", href: "/my-shortlist/" }],
	},
];
