# Quality gates

Three checks run against the static export (`out/`) and the source tree. They run in CI on every pull request (`.github/workflows/ci.yml`) and locally with the same commands. The gates do no network calls except the local server used by the accessibility check.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm build            # next build, then the Pagefind index into out/pagefind/
pnpm qa:links         # internal link check
pnpm qa:rules         # house rules
pnpm exec playwright install chromium   # once
pnpm qa:axe           # accessibility
```

`pnpm qa` runs the build and all three gates in order. Reports are written to `qa-reports/` (git-ignored); CI uploads that folder as the `qa-reports` artifact.

## Link check (`scripts/qa/check-links.mjs`)

Reads every HTML file in `out/` and checks each internal `href` (and local `img`/`source` `src`) against the files in `out/`, with `trailingSlash: true` rules (`/path/` maps to `/path/index.html`). External links, `mailto:`, `tel:` and hash-only links are ignored; query strings and hashes are stripped. Exit code 1 lists each broken target with the pages that link to it.

## House rules (`scripts/qa/house-rules.mjs`)

Scans `app/`, `components/`, `lib/` (not `lib/data/listings.json` or `archive/`) and `public/llms.txt`.

| Rule | What it flags |
| --- | --- |
| `em-dash` | The em dash character |
| `emoji` | Any emoji. Glyphs in `house-rules.allow.json` (`emojiGlyphs`) are ignored. The star and check mark used in the UI are not emoji and need no entry |
| `nicosia` | The word Nicosia, unless it matches an entry under `nicosia` in `house-rules.allow.json` (the institution mentions the owner kept). Entries are `{file, context, count}`: `context` is the text 30 characters either side of the match (punctuation such as em dashes and commas folded into whitespace), so editing other parts of the line does not break it, and an identical extra copy exceeds `count` and fails. New mentions fail |
| `relocation-guide` | The label "Relocation guide" |
| `hex-class` | A hard-coded hex colour inside a Tailwind class such as `text-[#35cdc4]`, anywhere except `app/globals.css` |

### Baseline

The tree already contains violations (mostly em dashes in copy). `scripts/qa/house-rules.baseline.json` records, per rule and file, a count per line content hash: `{rule: {file: {sha1(trimmed line): count}}}`. Every occurrence counts, so a line with two emoji counts 2. The check fails when a line hash is not in the baseline or its count went up. The summary table prints total, baseline and new counts per rule to track the burn-down.

Because the key is the trimmed line text, editing a baselined line (even to touch an unrelated word) changes its hash and the line then counts as new. Fix the violation when you touch the line. Moving a line within a file, or reindenting it, is fine.

When you remove violations, regenerate the baseline so the numbers go down:

```sh
node scripts/qa/house-rules.mjs --update-baseline
```

Do not raise the baseline to make CI pass. If a new Nicosia institution mention is genuinely needed, add it with `node scripts/qa/house-rules.mjs --update-nicosia` and explain why in the pull request.

## Accessibility (`scripts/qa/axe.mjs`)

Starts a static server on `out/`, opens a fixed sample of 22 URLs at 390 and 1440 px wide (home, guides, directories, tools, a listing, a developer, regions, moving to Cyprus, explore and a search results page) and runs axe-core with the `wcag2a` and `wcag2aa` tags. It prints a table of every violation and fails on `moderate`, `serious` or `critical` impact unless the finding is listed (by URL and rule) in `scripts/qa/axe.baseline.json`. The baseline starts empty. Edit the sample list at the top of the script when routes change.

```sh
node scripts/qa/axe.mjs --update-baseline   # record current moderate/serious/critical findings
node scripts/qa/axe.mjs --urls /about/,/    # check specific URLs
node scripts/qa/axe.mjs --all               # full-site audit (manual, not CI)
```

## Site search (Pagefind)

`pnpm build` runs `next build && pagefind --site out`, which writes the index to `out/pagefind/`. Only pages with `data-pagefind-body` on their main element are indexed (guides, directories, tools, city pages, listings, developers and Moving to Cyprus). The element also carries `data-type` (`guide`, `directory`, `tool`, `city`, `listing`, `developer`, `page`) exposed as the `type` filter. Headers, footers, the cookie banner, breadcrumbs, share bars, email forms and related-content blocks use `data-pagefind-ignore`. The `/explore/` page loads `/pagefind/pagefind.js` at runtime; in `next dev` the index does not exist and the page says so.

### Full-site audit (`--all`)

`--all` scans every HTML page in `out/` at 390 px (redirect stubs with a meta refresh are skipped) and the default sample plus every 10th page at 1440 px. It also loads every page at both widths and fails when a page scrolls horizontally, does not have exactly one `main#main` and one `h1`, or has more than one email input (the `/design-system/` showcase is allowed two). Results go to `qa-reports/axe-all.json`. It takes a few minutes, so it is not part of CI; run it after layout changes.
