# Email Capture — Listing Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a property-aware email capture block in the listing panel after the description, reusing the existing `EmailCapture` component with a new `region` prop and GA4 tracking.

**Architecture:** Extend `EmailCapture` with `region` and `source` props; add a `useEffect` that checks `localStorage` on mount to skip the form for returning subscribers. Insert the component into `ListingPanelBody` immediately after `<DescriptionSection>`. No new files, no backend.

**Tech Stack:** React 19, Next.js App Router, Tailwind CSS 4, `localStorage`, existing `trackEvent` helper in `lib/analytics.ts`.

---

### Task 1: Update `EmailCapture` — add `region`, `source`, and returning-subscriber check

**Files:**
- Modify: `components/EmailCapture.tsx`

The current signature is `{ compact?: boolean }`. We need to add `region?: string` (drives the headline) and `source?: string` (passed to the GA4 event). We also need a `useEffect` that checks `localStorage` on mount: if `realcy_subscribers` has any entries, set `status` to `"success"` immediately so the form is never shown to a returning subscriber.

- [ ] **Step 1: Replace the component with the updated version**

Open `components/EmailCapture.tsx` and replace the entire file with:

```tsx
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
    try {
      const existing = JSON.parse(localStorage.getItem("realcy_subscribers") ?? "[]");
      if (!existing.includes(email)) {
        localStorage.setItem("realcy_subscribers", JSON.stringify([...existing, email]));
      }
    } catch {}
    trackEvent("email_signup", { source: source ?? "unknown", region: region ?? "unknown" });
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
    <form onSubmit={handleSubmit} className="mt-4">
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
```

- [ ] **Step 2: Verify build is clean**

```bash
npm run build 2>&1 | grep -E "✓|error|Error"
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/EmailCapture.tsx
git commit -m "feat(email-capture): add region/source props and returning-subscriber check"
```

---

### Task 2: Insert `EmailCapture` into `ListingPanel` after the description

**Files:**
- Modify: `components/ListingPanel.tsx`

In `ListingPanelBody`, the description renders at line 186–188:

```tsx
{listing.description ? (
  <DescriptionSection description={listing.description} />
) : null}
```

We insert `<EmailCapture>` immediately after this block, inside the same `<div className="p-6 space-y-5">` container. The `region` comes from `listing.regionCity`.

- [ ] **Step 1: Add the import at the top of `ListingPanel.tsx`**

Find the existing imports block (lines 1–6) and add:

```tsx
import { EmailCapture } from "./EmailCapture";
```

- [ ] **Step 2: Insert the EmailCapture block after `<DescriptionSection>`**

Find this block in `ListingPanelBody` (around line 186):

```tsx
        {listing.description ? (
          <DescriptionSection description={listing.description} />
        ) : null}
      </div>
```

Replace it with:

```tsx
        {listing.description ? (
          <DescriptionSection description={listing.description} />
        ) : null}

        <div className="rounded-xl border border-[#35cdc4]/40 bg-teal-50/50 p-4">
          <EmailCapture
            region={listing.regionCity ?? undefined}
            source="listing_panel"
          />
        </div>
      </div>
```

- [ ] **Step 3: Verify build is clean**

```bash
npm run build 2>&1 | grep -E "✓|error|Error"
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Open the dev server and manually test**

```bash
npm run dev
```

Open http://localhost:3000, click a region on the map, open any listing. Verify:
- Email capture block appears after the description with "Eyeing [Region] properties?" headline
- Submitting a valid email shows the success state
- Refreshing and reopening a listing shows the success state immediately (no form)
- Submitting an invalid email shows the error message

- [ ] **Step 5: Commit**

```bash
git add components/ListingPanel.tsx
git commit -m "feat(listing-panel): add email capture after description"
```

---

### Task 3: Verify existing usages still work

The footer and guide pages use `<EmailCapture compact />` with no `region` or `source` props — confirm they still render correctly with the defaults.

- [ ] **Step 1: Check footer render**

With the dev server running, scroll to the bottom of any page. Verify:
- Compact email form still shows
- Headline is the generic "Get the free Cyprus Relocation Checklist" (no region)
- If already subscribed (from Task 2 test), success state shows immediately

- [ ] **Step 2: Check guide page render**

Navigate to http://localhost:3000/guides/residency-and-visas/ (an immigration category guide). Verify:
- Compact email form shows mid-page
- Works correctly

- [ ] **Step 3: Commit and push**

```bash
git add .
git commit -m "chore: verify email capture regressions — no code changes"
git push origin HEAD
```

---

### Task 4: Open PR

- [ ] **Step 1: Create PR**

```bash
gh pr create \
  --title "feat(email-capture): property-aware capture in listing panel" \
  --body "## Summary
- Adds \`region\` and \`source\` props to \`EmailCapture\`
- Returning subscribers (localStorage) see success state immediately on mount
- Fires \`email_signup\` GA4 event with source and region on submit
- Inserts capture block in \`ListingPanel\` after the property description
- No backend required — localStorage only for now

## Test plan
- [ ] Open a listing → email capture appears after description with region-aware headline
- [ ] Submit email → success state, email in localStorage
- [ ] Reopen any listing → success state immediately (no re-prompt)
- [ ] Footer compact form still works
- [ ] Guide page compact form still works
- [ ] GA4 DebugView: \`email_signup\` event fires with correct \`source\` and \`region\`"
```
