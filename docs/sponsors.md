# Sponsored units

RealCy.app sells three paid spots on [/advertise/](https://realcy.app/advertise/).
All of them are configured in one file, `lib/sponsors.ts`, which ships empty.
An empty entry renders nothing.

| Spot | Map in `lib/sponsors.ts` | Key | Where it renders | Label |
| --- | --- | --- | --- | --- |
| Top of a directory | `DIRECTORY_FEATURED` | directory slug, e.g. `accountants` (the folder name under `app/sections/`) | First item after the filters, above the entries, as a highlighted entry | Featured |
| Top of a guide | `GUIDE_SPONSORS` | guide slug, e.g. `banking-in-cyprus` (the `/guides/{slug}/` part) | Directly under the guide header, before the hero and body | Sponsored by {name} |
| Top of a topic hub | `TOPIC_SPONSORS` | topic slug: `health`, `getting-around`, `home-and-bills`, `money-and-paperwork`, `food-and-shopping`, `family-and-schools`, `community-and-leisure`, `moving-here` (/moving-to-cyprus/) or `property` (/property/) | Under the hub header, before the content | Sponsored by {name} |

Each spot holds one sponsor (a key has one value). Every unit is labelled,
links out with `target="_blank" rel="sponsored noopener noreferrer"`, is left
out of site search (`data-pagefind-ignore`) and fires the GA4 event
`sponsor_click` when clicked. The unit is the `SponsorSlot` component, the same
one the /advertise/ page uses for its preview.

When a directory has no active Featured sponsor, a small line at the bottom of
the page reads "Want your business featured here? Advertise on RealCy.app"
and links to `/advertise/#contact`. Guides and hubs show nothing when unsold.

## Add a sponsor

1. Get from the buyer: business name, website URL, a one-line text, the dates,
   and optionally a square logo (PNG, SVG or WebP, at least 96 x 96 px).
2. Put the logo in `public/sponsors/`, named after the business, e.g.
   `public/sponsors/example-accounting.png`. It is served as
   `/sponsors/example-accounting.png`.
3. Add an entry to the right map in `lib/sponsors.ts` (each map has a
   commented example to copy):

   ```ts
   export const DIRECTORY_FEATURED: Partial<Record<DirectorySlug, Sponsor>> = {
   	accountants: {
   		name: "Example Accounting Ltd",
   		href: "https://example.com/",
   		text: "ICPAC-registered accountants for expat non-dom filings.",
   		logo: { src: "/sponsors/example-accounting.png", alt: "Example Accounting logo" },
   		start: "2026-11-01",
   		end: "2026-11-30",
   	},
   };
   ```

   The keys are typed from the site data, so a misspelt slug fails
   `pnpm exec tsc --noEmit`. `logo` and `text` are optional.
4. Run `pnpm exec tsc --noEmit` and `pnpm build`, then open the page from
   `out/` to check the unit.
5. Open a PR, get it reviewed, merge. The merge deploys the site.

## Schedule

`start` and `end` are ISO dates (`YYYY-MM-DD`). Both days are included. They
are compared with the UTC date **when the site is built**, because the site is
a static export: nothing changes on its own after a deploy.

- A sponsor merged before its `start` date stays hidden until the next build
  on or after `start`. Trigger a redeploy on the start day (Vercel dashboard
  "Redeploy", or merge any change).
- A sponsor stays visible after its `end` date until the next build. Redeploy
  on the day after `end`.

## Remove a sponsor

Delete the entry from `lib/sponsors.ts` and its logo from `public/sponsors/`,
then PR and merge. A sponsor whose `end` date has passed is already hidden
after the next build, but remove the entry anyway so the file stays a true
list of current and booked sponsors.

## Read `sponsor_click` in GA4

The event is sent through `trackEvent` in `lib/analytics.ts` with three
parameters:

| Parameter | Value |
| --- | --- |
| `spot` | `directory`, `guide` or `topic` |
| `sponsor` | the sponsor `name` from `lib/sponsors.ts` |
| `placement` | the page slug, e.g. `accountants`, `banking-in-cyprus`, `health` |

One-time setup: in GA4 go to Admin > Data display > Custom definitions and
create three event-scoped custom dimensions with the event parameters
`spot`, `sponsor` and `placement`. GA4 only reports parameters that are
registered, and registration is not retroactive: clicks before the dimension
exists are counted as events but cannot be split by sponsor.

Monthly click report for a sponsor:

1. Reports > Engagement > Events, open `sponsor_click`, or
2. Explore > Free form: dimensions `sponsor`, `placement` (and `spot`),
   metric Event count, filter Event name exactly matches `sponsor_click`, date
   range = the billing month.

To check it works after a sponsor goes live, click the unit and look for
`sponsor_click` in Admin > DebugView or Reports > Realtime. Clicks from
visitors who block Google Analytics are not counted, so the report is a lower
bound.
