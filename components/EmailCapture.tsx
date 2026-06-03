"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  compact?: boolean;
  region?: string;
  source?: string;
};

export function EmailCapture({ compact = false, region, source }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("realcy_subscribers") ?? "[]");
      if (existing.length > 0) setStatus("success");
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    let isNew = false;
    try {
      const existing = JSON.parse(localStorage.getItem("realcy_subscribers") ?? "[]");
      if (!existing.includes(email)) {
        localStorage.setItem("realcy_subscribers", JSON.stringify([...existing, email]));
        isNew = true;
      }
    } catch {}
    if (isNew) trackEvent("email_signup", { source: source ?? "unknown", region: region ?? "unknown" });
    setStatus("success");
    setEmail("");
  };

  const headline = region
    ? `Eyeing ${region} properties?`
    : "Get the free Cyprus Relocation Checklist";

  if (status === "success") {
    return (
      <p className="text-sm text-[#35cdc4] font-semibold py-2">
        ✓ You're on the list — checklist coming your way.
      </p>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 mt-3 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="flex-1 text-xs px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#35cdc4]"
        />
        <button
          type="submit"
          className="text-xs px-4 py-2 rounded bg-[#35cdc4] text-slate-900 font-semibold hover:bg-white transition-colors whitespace-nowrap"
        >
          Get it free
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm font-semibold text-slate-900 mb-1">{headline}</p>
      <p className="text-xs text-slate-500 mb-3">
        Free Cyprus Relocation Checklist — visas, taxes, banking, and more.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="flex-1 text-sm px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#35cdc4] focus:ring-1 focus:ring-[#35cdc4]"
        />
        <button
          type="submit"
          className="text-sm px-5 py-2.5 rounded-lg bg-[#35cdc4] text-slate-900 font-semibold hover:bg-teal-400 transition-colors whitespace-nowrap"
        >
          Get the checklist →
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>
      )}
    </form>
  );
}
