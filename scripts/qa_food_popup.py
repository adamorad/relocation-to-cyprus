"""Screenshot the Food popup at desktop/tablet/mobile to QA it.

Loads http://localhost:3000/, clicks the Food tile, captures the popup
in its open state at three viewports. Writes to /tmp/realcy-food/.

Run: scripts/.venv/bin/python scripts/qa_food_popup.py
"""

from __future__ import annotations

import os

from playwright.sync_api import sync_playwright

VIEWPORTS = [
    ("desktop_1920x1080", 1920, 1080),
    ("tablet_1024x768", 1024, 768),
    ("mobile_390x844", 390, 844),
]

OUT = "/tmp/realcy-food"


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, w, h in VIEWPORTS:
            ctx = browser.new_context(viewport={"width": w, "height": h})
            page = ctx.new_page()
            page.goto("http://localhost:3000/", wait_until="domcontentloaded", timeout=30_000)
            page.wait_for_selector("picture img[alt*='Cyprus']", timeout=15_000)
            page.wait_for_timeout(800)

            # First screenshot: top bar visible, popup closed
            page.screenshot(path=f"{OUT}/{name}_closed.png", full_page=False)

            # Click the Food tile
            food_button = page.get_by_role("button", name="Food", exact=True)
            food_button.click(timeout=5_000)
            page.wait_for_timeout(600)

            # Popup open
            page.screenshot(path=f"{OUT}/{name}_open.png", full_page=False)

            # Scroll inside the popup to test long-content rendering
            dialog = page.get_by_role("dialog", name="Food in Cyprus")
            dialog.evaluate("el => el.querySelector('.flex-1.overflow-y-auto').scrollTop = 1200")
            page.wait_for_timeout(400)
            page.screenshot(path=f"{OUT}/{name}_scrolled.png", full_page=False)

            # Try the city filter
            try:
                page.get_by_role("button", name="Paphos", exact=True).click(timeout=3_000)
                page.wait_for_timeout(400)
                page.screenshot(path=f"{OUT}/{name}_filtered_paphos.png", full_page=False)
            except Exception as e:
                print(f"[{name}] filter click skipped: {e}")

            ctx.close()
        browser.close()

    for f in sorted(os.listdir(OUT)):
        size_kb = os.path.getsize(f"{OUT}/{f}") // 1024
        print(f"  {f}: {size_kb} KB")


if __name__ == "__main__":
    main()
