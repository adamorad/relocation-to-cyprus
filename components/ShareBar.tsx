"use client";

import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

interface ShareBarProps {
  url: string;
  title: string;
  guideSlug: string;
}

export function ShareBar({ url, title, guideSlug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const track = (platform: string) =>
    trackEvent("guide_share", { platform, guide_slug: guideSlug });

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    track("copy_link");
  };

  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  return (
    <div className="mt-4 flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
        Share
      </span>
      <button
        type="button"
        onClick={copyLink}
        className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${enc}&text=${encTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("twitter")}
        className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
      >
        X / Twitter
      </a>
      <a
        href={`https://wa.me/?text=${encTitle}%20${enc}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp")}
        className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={`https://reddit.com/submit?url=${enc}&title=${encTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("reddit")}
        className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
      >
        Reddit
      </a>
    </div>
  );
}
