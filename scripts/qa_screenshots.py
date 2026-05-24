"""Screenshot the local dev server at several viewport sizes to QA the map UI.

Run via: scripts/.venv/bin/python scripts/qa_screenshots.py
Outputs to /tmp/realcy-qa/ as PNGs.
"""

from __future__ import annotations

import os
import sys

from playwright.sync_api import sync_playwright

VIEWPORTS = [
    ("ultra_wide_3440x1440", 3440, 1440),
    ("desktop_1920x1080", 1920, 1080),
    ("laptop_1440x900", 1440, 900),
    ("tablet_1024x768", 1024, 768),
    ("mobile_390x844", 390, 844),
    ("mobile_narrow_360x780", 360, 780),
]

OUT = "/tmp/realcy-qa"


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, w, h in VIEWPORTS:
            ctx = browser.new_context(viewport={"width": w, "height": h})
            page = ctx.new_page()
            try:
                page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=30_000)
                # Wait for the hero illustration to be in the DOM with non-zero size
                page.wait_for_selector("picture img[alt*='Cyprus']", timeout=15_000)
                page.wait_for_load_state("load", timeout=15_000)
            except Exception as e:
                print(f"[{name}] navigation failed: {e}", file=sys.stderr)
                continue
            page.wait_for_timeout(400)  # let any post-hydration paint settle
            path = f"{OUT}/{name}.png"
            page.screenshot(path=path, full_page=False)
            print(f"[{name}] {w}x{h} -> {path}")
            ctx.close()
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
