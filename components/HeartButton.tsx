"use client";

import { useEffect, useState } from "react";
import { isInShortlist, toggleShortlist } from "@/lib/shortlist";

type Props = {
  slug: string;
};

export default function HeartButton({ slug }: Props) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isInShortlist(slug));
  }, [slug]);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    const next = toggleShortlist(slug);
    setLiked(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "Remove from shortlist" : "Save to shortlist"}
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-red-500"
          aria-hidden="true"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-slate-500"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      )}
    </button>
  );
}
