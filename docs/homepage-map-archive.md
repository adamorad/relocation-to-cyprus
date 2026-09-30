# Homepage map archive

## What was moved

The interactive homepage map and its supporting components now live in `archive/homepage-map/`: `AppShell`, `IllustratedMap`, `GoogleMapView`, `ListingsMap`, `HomeHub`, `ListingPanel`, `RegionListingsPanel`, the food, healthcare, hotels, schools and shopping panels, and `MapNavContext` (which provides `MapNavProvider`). The Google Maps preconnect tags were removed from `app/layout.tsx` at the same time.

## Why

The homepage was redesigned as the "Living in Cyprus" page (hero search, topic cards, guide cards, local area panel, tools strip). It no longer shows a map, so the map code was unused. It is archived instead of deleted so it can be brought back.

## Build impact

`archive/` is excluded from `tsconfig.json`, so archived files are not type-checked or bundled. They may reference imports that have since changed.

## How to restore

1. Move the files from `archive/homepage-map/` back to `components/`.
2. Reinstate `MapNavProvider` in `app/layout.tsx`, wrapping the page content.
3. Re-add the Google Maps preconnect links to `app/layout.tsx`.
4. Re-add the homepage swap in `app/page.tsx` so the map app renders instead of the Living in Cyprus sections.
5. Remove `archive` from the `exclude` list in `tsconfig.json` if any file stays there, then run `npx tsc --noEmit` and fix any drift.

Note that the listing save heart now lives on the listing detail page. The archived `ListingPanel` used `HeartButton` with a different props shape, so update it when restoring.
