# Task 4 Report — Shared Breadcrumbs Component + 13 Section Pages

## Component Created

`components/Breadcrumbs.tsx` — exports `Crumb` type and `Breadcrumbs({ items })` function. Renders a `<nav aria-label="Breadcrumb">` where the last item is current (no link, `aria-current="page"`). The plan's exact code was used; the only deviation was changing `key={`${item.label}-${i}`}` to `key={item.label}` to satisfy the `noArrayIndexKey` biome lint rule.

## 13 Files Changed

| File | Display Name Used |
|------|-------------------|
| `app/sections/ev-charging/client.tsx` | EV Charging Stations |
| `app/sections/expat-communities/client.tsx` | Expat Community Groups |
| `app/sections/farmers-markets/client.tsx` | Farmers Markets |
| `app/sections/fitness-wellness/client.tsx` | Fitness & Wellness Studios |
| `app/sections/halal-kosher/client.tsx` | Halal & Kosher Food |
| `app/sections/international-grocery/client.tsx` | International Grocery Stores |
| `app/sections/mental-health-services/client.tsx` | Mental Health Services |
| `app/sections/public-transport/client.tsx` | Public Transport |
| `app/sections/religious-services/client.tsx` | Religious Services |
| `app/sections/specialist-doctors/client.tsx` | Specialist Doctors |
| `app/sections/veterinary-services/client.tsx` | Veterinary Services |
| `app/sections/volunteering/client.tsx` | Volunteering Opportunities |
| `app/sections/wineries/client.tsx` | Wineries & Wine Tourism |

All names sourced from `lib/sections-index.ts`.

## Build Result

`✓ Compiled successfully in 17.0s` — 477/477 pages generated, no errors.

## Biome Result

All 14 modified files pass `biome check` with no errors.

## Commit Hash

`c1642d0`

## Files Whose Structure Differed from Expectation

- **specialist-doctors, mental-health-services, veterinary-services, wineries** — these four files had no "← Back to the map" footer link, meaning `Link` from `next/link` was used **only** in the top breadcrumb nav. Removing the top nav would have left an unused `Link` import (biome lint error). The `Link` import was removed for these four files and the `Breadcrumbs` import took its place. All other nine files retained their `Link` import (needed for the footer link).

- **expat-communities, volunteering** — these two files had pre-existing biome lint errors (`useAriaPropsSupportedByRole`: `aria-label` on a `<span>` without a role). Fixed by adding `role="img"` to the emoji `<span>` elements in both files.

## Concerns

None. All pre-existing lint issues encountered were in the files I modified (and were fixed as part of making the biome check pass). The build generates all 477 pages correctly. The breadcrumb pattern is consistent across all 13 pages.
