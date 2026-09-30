"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import {
	isInShortlist,
	SHORTLIST_EVENT,
	toggleShortlist,
} from "@/lib/shortlist";

type Props = {
	slug: string;
	/** Listing name, used in the accessible label. */
	name: string;
};

export default function HeartButton({ slug, name }: Props) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const sync = () => setLiked(isInShortlist(slug));
		sync();
		window.addEventListener(SHORTLIST_EVENT, sync);
		return () => window.removeEventListener(SHORTLIST_EVENT, sync);
	}, [slug]);

	function handleClick(e: React.MouseEvent) {
		e.stopPropagation();
		setLiked(toggleShortlist(slug));
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-pressed={liked}
			aria-label={`${liked ? "Remove from shortlist" : "Save to shortlist"}: ${name}`}
			className={`inline-flex h-11 min-h-11 w-11 min-w-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
				liked
					? "border-coral bg-coral/10 text-coral"
					: "border-line bg-white text-muted hover:border-primary hover:text-primary"
			}`}
		>
			<Icon name="heart" size={22} fill={liked ? "currentColor" : "none"} />
		</button>
	);
}
