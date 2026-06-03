# Email Capture — Listing Panel

**Date:** 2026-06-03
**Status:** Approved

## Context

120 people have landed on realcy.app from Meta ads with no way to re-engage them. The site has an existing `EmailCapture` component (localStorage-only) already placed in the footer and on guide pages. Extending it into the listing panel — where intent is highest — captures leads at the most valuable moment without requiring any backend.

## What We're Building

Add an email capture block to `ListingPanel`, positioned immediately after the property description, using property-aware copy that references the listing's region.

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Placement | After property description | Highest intent moment; visitor has read the pitch |
| Storage | localStorage (existing) | Zero setup; wire to email service once signups are proven |
| Copy style | Property-aware | "Eyeing Larnaca properties?" more relevant than generic headline |
| Backend | None | Ship fast, validate, add later |

## Component Changes

### 1. `components/EmailCapture.tsx` — add `region` prop

Add an optional `region?: string` prop. When provided, the headline becomes:
`"Eyeing [region] properties?"` (e.g. "Eyeing Larnaca properties?")
When absent, falls back to the existing generic headline.

Add a `source?: string` prop for GA4 event tracking (e.g. `"listing_panel"`, `"footer"`, `"guide"`).

On mount: check localStorage `realcy_subscribers` array. If the array has any entries, this device has previously signed up — skip the form and show the success state directly.

On successful submit: fire `trackEvent("email_signup", { source, region })` using the existing `analytics.ts` helper.

### 2. `components/ListingPanel.tsx` — insert EmailCapture

After the description block, before the specs/details section, insert:

```tsx
<EmailCapture
  region={listing.regionCity ?? undefined}
  source="listing_panel"
/>
```

The component already handles its own padding/margin so no wrapper needed.

## Success State (already in component)

`"✓ You're on the list — checklist coming your way."`

If already subscribed on mount, show this state immediately without the form — no re-prompt for existing subscribers.

## Out of Scope

- Backend email service (future work once signups proven)
- Email sequence / actual checklist delivery (future work)
- Showing capture on the `/listings/[slug]` static page (map panel is primary surface)

## Verification

1. Open a listing panel → email capture appears after the description with region-aware headline
2. Submit an email → success state shows, email appears in `localStorage.realcy_subscribers`
3. Close and reopen the same listing → success state shows immediately (no re-prompt)
4. Open a different listing → still shows success state (subscriber = always suppressed)
5. GA4 DebugView: `email_signup` event fires with `source: "listing_panel"` and correct `region`
6. Footer and guide page captures still work (no regression)
