"""Drive the running dev server, take screenshots covering every UX flow.

Flows covered:
  1. Overview, no hover
  2. Hover over each region (hero card swap)
  3. Click a region (camera zooms + center modal opens with listings)
  4. Click a listing card (right side panel slides in)
  5. Close the side panel
  6. Close the modal (back to overview)
  7. ESC key handling
"""
from __future__ import annotations

from pathlib import Path
from cloakbrowser import launch

OUT = Path("/tmp/qa")
OUT.mkdir(parents=True, exist_ok=True)
URL = "http://localhost:5173/"
VIEWPORT = {"width": 1600, "height": 900}


def shot(page, name: str) -> Path:
    p = OUT / f"{name}.png"
    page.screenshot(path=str(p), full_page=False)
    print(f"  → {p}")
    return p


def main() -> int:
    browser = launch(headless=True)
    page = browser.new_page(viewport=VIEWPORT)
    page.goto(URL, wait_until="domcontentloaded", timeout=30_000)
    page.wait_for_timeout(3000)

    print("[1] overview, no hover")
    shot(page, "01_overview")

    # 2. Hover each region to verify the hero card swaps.
    HOVER_POINTS = {
        "Paphos":     (520, 460),
        "Limassol":   (760, 540),
        "Larnaca":    (960, 480),
        "Nicosia":    (820, 420),
        "Protaras":   (1130, 430),
        "Ayia Napa":  (1090, 470),
    }
    for i, (name, (x, y)) in enumerate(HOVER_POINTS.items(), start=2):
        print(f"[{i}] hover {name}")
        page.mouse.move(x, y)
        page.wait_for_timeout(400)
        shot(page, f"{i:02d}_hover_{name.replace(' ', '_').lower()}")

    # 3. Click into Limassol (large region, easy to hit) and verify modal opens.
    print("\n[10] click Limassol → modal opens")
    page.mouse.click(*HOVER_POINTS["Limassol"])
    page.wait_for_timeout(1100)
    shot(page, "10_limassol_modal")

    # 4. Click first listing card in the modal. Card grid sits inside the modal;
    # the modal is roughly centered around (800, 450). The first card should be
    # in the upper-left of the grid area, but the modal headers occupy roughly
    # the top 240px so cards start around y=300.
    print("[11] click first listing card → side panel opens")
    page.mouse.click(500, 360)
    page.wait_for_timeout(800)
    shot(page, "11_listing_panel_open")

    # 5. Close the side panel.
    print("[12] close side panel via X")
    # X button is in the panel's sticky header, top-right of the panel.
    # Panel sits at right of viewport, ~460px wide. Header X around top-right.
    page.mouse.click(1580, 50)
    page.wait_for_timeout(600)
    shot(page, "12_side_panel_closed")

    # 6. Close the modal.
    print("[13] close modal via backdrop click")
    # Click outside the modal card — far left, in the dim backdrop area.
    page.mouse.click(60, 450)
    page.wait_for_timeout(900)
    shot(page, "13_back_to_overview")

    # 7. Try ESC handling (not implemented yet — see if it does anything).
    print("[14] open Larnaca, press Escape")
    page.mouse.click(*HOVER_POINTS["Larnaca"])
    page.wait_for_timeout(900)
    page.keyboard.press("Escape")
    page.wait_for_timeout(500)
    shot(page, "14_after_escape")

    browser.close()
    print("\nQA screenshots in:", OUT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
