"""Re-fetch each listing and write v2 sidecars that include the bits we missed:

  - image_gallery items (often floor plans / extra renders)
  - per-offer images (big_thumbnail URLs)
  - brochure file URLs (will be downloaded later)
  - square_meter_price per offer

We deliberately do NOT pull from the raw .json sidecars because those were
already stripped of these fields in an earlier cleanup pass.

Resumable: skip listings that already have a v2 sidecar.
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Any

from cloakbrowser import launch

BASE = "https://www.bazaraki.com"
INDEX_PATH = "/new-buildings/"
ROOT = Path(__file__).resolve().parent.parent
TXT_DIR = ROOT / "listings" / "new_developments"
V2_DIR = ROOT / "listings" / "new_developments_v2"
NEXT_DATA_RE = re.compile(
    r'<script[^>]+id="__NEXT_DATA__"[^>]*>(.+?)</script>', re.S
)
DELAY = 0.6


def fetch_detail(page, slug: str) -> dict[str, Any] | None:
    url = f"{BASE}{INDEX_PATH}{slug}/"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=60_000)
        page.wait_for_timeout(900)
        html = page.content()
        m = NEXT_DATA_RE.search(html)
        if not m:
            return None
        data = json.loads(m.group(1))
        return data["props"]["pageProps"].get("detail")
    except Exception as e:
        print(f"  [error] {slug}: {e}")
        return None


def build_v2(slug: str, detail: dict[str, Any]) -> dict[str, Any]:
    items = detail.get("items", []) or []
    project = detail.get("project", {}) or {}
    galleries = [it for it in items if it.get("type") == "image_gallery"]
    offers_item = next((it for it in items if it.get("type") == "offers"), None)

    return {
        "slug": project.get("slug") or slug,
        "image_galleries": [
            {
                "title": g.get("title") or "",
                "images": g.get("full_images") or g.get("images") or [],
            }
            for g in galleries
        ],
        "offers": [
            {
                "id": o.get("id"),
                "title": o.get("title"),
                "pricePerM2": o.get("square_meter_price") or "",
                "images": [
                    # Keep both sizes — big_thumbnail is what we'll dewatermark.
                    {
                        "id": im.get("id"),
                        "small": im.get("small_thumbnail"),
                        "big": im.get("big_thumbnail"),
                    }
                    for im in (o.get("images") or [])
                    if isinstance(im, dict)
                ],
            }
            for o in ((offers_item or {}).get("offers") or [])
        ],
        "brochures": [
            {"name": f.get("name"), "url": f.get("url")}
            for f in (project.get("files") or [])
            if f.get("url")
        ],
    }


def main() -> int:
    V2_DIR.mkdir(parents=True, exist_ok=True)
    slugs = sorted(p.stem for p in TXT_DIR.glob("*.txt"))
    todo = [s for s in slugs if not (V2_DIR / f"{s}.json").exists()]
    print(f"{len(slugs)} listings total, {len(todo)} need v2 sidecars")
    if not todo:
        return 0

    browser = launch(headless=True)
    page = browser.new_page()
    try:
        wrote = 0
        failed: list[str] = []
        for i, slug in enumerate(todo, 1):
            detail = fetch_detail(page, slug)
            if detail is None:
                failed.append(slug)
                continue
            rec = build_v2(slug, detail)
            (V2_DIR / f"{slug}.json").write_text(
                json.dumps(rec, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            wrote += 1
            if i % 20 == 0 or i == len(todo):
                print(f"[{i}/{len(todo)}]  wrote={wrote} failed={len(failed)}")
            time.sleep(DELAY)
        print(f"\ndone. wrote={wrote}  failed={len(failed)}")
    finally:
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
