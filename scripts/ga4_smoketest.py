"""Headless smoke test: load realcy.app, capture every network request
that goes to google-analytics.com / googletagmanager.com, print a summary
to confirm GA4 is actually receiving events.

Run: scripts/.venv/bin/python scripts/ga4_smoketest.py
"""

from __future__ import annotations

from collections import defaultdict
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright

PAGES = [
    "https://realcy.app/",
    "https://realcy.app/regions/paphos/",
    "https://realcy.app/listings/100-myriel_villa_peyia/",
    "https://realcy.app/guides/buying-process/",
]


def main() -> None:
    by_page: dict[str, list[dict[str, str]]] = defaultdict(list)
    console_errors: dict[str, list[str]] = defaultdict(list)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for url in PAGES:
            ctx = browser.new_context(viewport={"width": 1440, "height": 900})
            page = ctx.new_page()
            ga_hits: list[dict[str, str]] = []
            errs: list[str] = []

            def on_request(req, hits=ga_hits):
                u = req.url
                host = urlparse(u).hostname or ""
                if "google-analytics" in host or "googletagmanager" in host:
                    qs = parse_qs(urlparse(u).query)
                    hits.append({
                        "host": host,
                        "tid": (qs.get("tid") or qs.get("id") or [""])[0],
                        "en": (qs.get("en") or [""])[0],
                        "dl": (qs.get("dl") or [""])[0],
                    })

            def on_console(msg, errs=errs):
                if msg.type in ("error", "warning"):
                    text = msg.text
                    if "google" in text.lower() or "gtag" in text.lower() or "analytics" in text.lower():
                        errs.append(f"[{msg.type}] {text}")

            page.on("request", on_request)
            page.on("console", on_console)

            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30_000)
                page.wait_for_load_state("load", timeout=15_000)
                page.wait_for_timeout(4000)
            except Exception as e:
                print(f"[{url}] navigation failed: {e}")
                ctx.close()
                continue
            by_page[url] = ga_hits
            console_errors[url] = errs
            ctx.close()
        browser.close()

    print("=" * 72)
    print("GA4 SMOKE TEST")
    print("=" * 72)
    for url, hits in by_page.items():
        print()
        print(f"  {url}")
        if not hits:
            print("    NO GA4/GTM requests fired — tag is NOT working")
        else:
            gtm = [h for h in hits if "googletagmanager" in h["host"]]
            ga = [h for h in hits if "google-analytics" in h["host"]]
            print(f"    gtag.js loaded:        {len(gtm)}x from googletagmanager.com")
            print(f"    collect events fired:  {len(ga)}x to google-analytics.com")
            for h in ga[:3]:
                ev = h["en"] or "(none)"
                dl = h["dl"][:55]
                tid = h["tid"]
                print(f"      tid={tid} event={ev:14s} dl={dl}")
        errs = console_errors.get(url, [])
        if errs:
            print("    GA-related console errors/warnings:")
            for e in errs[:4]:
                print(f"      {e}")


if __name__ == "__main__":
    main()
