"""Fetch each listing's __NEXT_DATA__ JSON once more, save a rich .json sidecar.

We already have .txt files per listing from the first scrape but those are
text-formatted and miss images, video, developer url_slug, and contacts. Rather
than try to backfill from the .txt, we just re-fetch each detail page and write
a structured JSON file containing everything the web app needs.

Resumable: if `<slug>.json` already exists, the listing is skipped.
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
JSON_DIR = ROOT / "listings" / "new_developments_json"
NEXT_DATA_RE = re.compile(
    r'<script[^>]+id="__NEXT_DATA__"[^>]*>(.+?)</script>', re.S
)
DELAY = 0.7


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


def build_record(slug: str, detail: dict[str, Any]) -> dict[str, Any]:
    project = detail.get("project", {}) or {}
    items = detail.get("items", []) or []
    offers_item = next((it for it in items if it.get("type") == "offers"), None)
    features_item = next((it for it in items if it.get("type") == "features"), None)
    location_item = next(
        (it for it in items if it.get("type") == "location_features"), None
    )
    video_item = next((it for it in items if it.get("type") == "video"), None)

    coords = (location_item or {}).get("coordinates") or {}
    dev = project.get("developer") or {}
    contacts = project.get("contacts") or {}

    return {
        "title": project.get("title"),
        "id": project.get("id"),
        "slug": project.get("slug") or slug,
        "url": f"{BASE}{INDEX_PATH}{slug}/",
        "priceRange": project.get("price"),
        "pricePerM2": project.get("price_per_square"),
        "location": project.get("location"),
        "lat": coords.get("lat"),
        "lng": coords.get("lng"),
        "logo": project.get("logo"),
        "headerImage": project.get("header_image"),
        "images": project.get("full_images") or project.get("images") or [],
        "developer": {
            "name": dev.get("name"),
            "url_slug": dev.get("url_slug"),
            "logo": dev.get("logo"),
            "address": dev.get("address"),
            "description": dev.get("description"),
        },
        "agents": [
            {"name": a.get("name"), "logo": a.get("logo"), "contacts": a.get("contacts")}
            for a in (project.get("agents") or [])
        ],
        "specs": {
            it.get("title"): it.get("description")
            for it in (project.get("info") or [])
            if it.get("title")
        },
        "features": [
            f.get("name") for f in ((features_item or {}).get("features") or []) if f.get("name")
        ],
        "offers": [
            {
                "id": o.get("id"),
                "title": o.get("title"),
                "price": o.get("price"),
                "pricePerM2": o.get("square_meter_price"),
                "description": o.get("description"),
                "features": {
                    f.get("slug"): f.get("value") for f in (o.get("features") or [])
                },
                "images": o.get("images") or [],
            }
            for o in ((offers_item or {}).get("offers") or [])
        ],
        "nearby": {
            lf.get("name"): lf.get("value")
            for lf in ((location_item or {}).get("location_features") or [])
            if lf.get("name")
        },
        "brochures": [
            {"name": f.get("name"), "url": f.get("url")}
            for f in (project.get("files") or [])
        ],
        "videoUrl": (video_item or {}).get("video_url"),
        "contacts": {
            "phone": contacts.get("phone") or [],
            "whatsapp": contacts.get("whatsapp") or "",
            "email": contacts.get("email") or "",
        },
        "description": project.get("description"),
    }


def main() -> int:
    JSON_DIR.mkdir(parents=True, exist_ok=True)
    slugs = sorted(p.stem for p in TXT_DIR.glob("*.txt"))
    print(f"have {len(slugs)} slugs from previous scrape")

    todo = [s for s in slugs if not (JSON_DIR / f"{s}.json").exists()]
    print(f"  → {len(todo)} need fetching, {len(slugs) - len(todo)} already done")

    if not todo:
        print("nothing to do")
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
                print(f"[{i}/{len(todo)}] {slug}  FAILED")
                continue
            record = build_record(slug, detail)
            (JSON_DIR / f"{slug}.json").write_text(
                json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            wrote += 1
            if i % 20 == 0 or i == len(todo):
                print(f"[{i}/{len(todo)}] {slug}  (wrote={wrote} failed={len(failed)})")
            time.sleep(DELAY)
        print(f"\ndone. wrote={wrote}  failed={len(failed)}")
        if failed:
            print("failed slugs:", failed[:20])
    finally:
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
