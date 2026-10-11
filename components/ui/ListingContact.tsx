const LINK =
	"inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline";

/**
 * Optional contact lines for a directory card. Renders nothing when no field
 * is set; each line only appears when its value is present.
 */
export function ListingContact({
	address,
	phone,
	email,
	website,
}: {
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
}) {
	if (!address && !phone && !email && !website) return null;
	return (
		<>
			{address ? (
				<p className="text-muted">
					<span className="font-semibold text-ink">Address: </span>
					{address}
				</p>
			) : null}
			{phone ? (
				<p>
					<a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className={LINK}>
						{phone}
					</a>
				</p>
			) : null}
			{email ? (
				<p>
					<a href={`mailto:${email}`} className={LINK}>
						{email}
					</a>
				</p>
			) : null}
			{website ? (
				<a
					href={website}
					target="_blank"
					rel="noopener noreferrer"
					className={LINK}
				>
					Website
				</a>
			) : null}
		</>
	);
}
