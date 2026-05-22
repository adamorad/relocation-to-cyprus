"""Re-fetch + re-dewatermark every gallery, unit, and image-gallery photo.

The original `dewatermark_images.py` only masked the bottom-right corner.
Inspection showed the watermark also appears in top-right, top-left, and
bottom-left in some listings. This pass inpaints all four corners.

Re-fetches originals from the source CDN (we don't keep them locally) and
overwrites the existing files under public/images/. Resumable on the URL
list — does not skip existing files, but the inpaint is idempotent enough
that re-running is safe.
"""
from __future__ import annotations

import io
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import cv2
import httpx
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ENRICHED_DIR = ROOT / "listings" / "new_developments_json"
V2_DIR = ROOT / "listings" / "new_developments_v2"
LISTINGS_JSON = ROOT / "src" / "data" / "listings.json"
IMAGES_DIR = ROOT / "public" / "images"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
)

# Fraction of image width/height each corner mask covers.
CORNER_W = 0.25
CORNER_H = 0.13


def make_corner_mask(h: int, w: int) -> np.ndarray:
    mask = np.zeros((h, w), dtype=np.uint8)
    ch = int(h * CORNER_H)
    cw = int(w * CORNER_W)
    # Top-left
    mask[0:ch, 0:cw] = 255
    # Top-right
    mask[0:ch, w - cw : w] = 255
    # Bottom-left
    mask[h - ch : h, 0:cw] = 255
    # Bottom-right
    mask[h - ch : h, w - cw : w] = 255
    return mask


def fetch_and_clean(url: str, dest: Path, client: httpx.Client) -> bool:
    try:
        r = client.get(url, timeout=30)
        if r.status_code != 200:
            return False
        im = Image.open(io.BytesIO(r.content)).convert("RGB")
        arr = np.array(im)
        h, w = arr.shape[:2]
        mask = make_corner_mask(h, w)
        bgr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
        out = cv2.inpaint(bgr, mask, 6, cv2.INPAINT_TELEA)
        rgb = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
        dest.parent.mkdir(parents=True, exist_ok=True)
        Image.fromarray(rgb).save(dest, format="WEBP", quality=82, method=6)
        return True
    except Exception as e:
        print(f"  [err] {url}: {e}")
        return False


def local_url(p: Path) -> str:
    return "/" + str(p.relative_to(ROOT / "public")).replace("\\", "/")


def collect_jobs() -> list[tuple[str, Path]]:
    """Return (url, dest_path) for every image we need to re-process."""
    jobs: list[tuple[str, Path]] = []

    # Hero gallery images from the enriched scrape (`images` field).
    for f in sorted(ENRICHED_DIR.glob("*.json")):
        rec = json.loads(f.read_text())
        slug = rec.get("slug") or f.stem
        for i, u in enumerate(rec.get("images") or []):
            if isinstance(u, str) and "bazaraki" in u:
                jobs.append((u, IMAGES_DIR / slug / f"{i:02d}.webp"))

    # V2 sidecars: image_galleries (floor plans) + per-offer images.
    for f in sorted(V2_DIR.glob("*.json")):
        rec = json.loads(f.read_text())
        slug = rec.get("slug") or f.stem
        for gi, g in enumerate(rec.get("image_galleries") or []):
            for ii, u in enumerate(g.get("images") or []):
                if isinstance(u, str) and "bazaraki" in u:
                    jobs.append((u, IMAGES_DIR / slug / f"g{gi}_{ii:02d}.webp"))
        for oi, o in enumerate(rec.get("offers") or []):
            for ii, im in enumerate(o.get("images") or []):
                u = im.get("big") if isinstance(im, dict) else None
                if isinstance(u, str) and "bazaraki" in u:
                    jobs.append((u, IMAGES_DIR / slug / f"u{oi}_{ii:02d}.webp"))

    return jobs


def main() -> int:
    jobs = collect_jobs()
    print(f"{len(jobs)} images to re-process")

    headers = {"User-Agent": UA, "Referer": "https://www.bazaraki.com/"}
    client = httpx.Client(headers=headers, follow_redirects=True)
    ok = fail = 0
    started = time.time()
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {
            pool.submit(fetch_and_clean, u, d, client): u for u, d in jobs
        }
        for i, f in enumerate(as_completed(futures), 1):
            if f.result():
                ok += 1
            else:
                fail += 1
            if i % 100 == 0 or i == len(jobs):
                rate = i / (time.time() - started)
                eta = (len(jobs) - i) / max(rate, 0.01)
                print(
                    f"  [{i}/{len(jobs)}] ok={ok} fail={fail} "
                    f"~{rate:.1f}/s  eta {eta/60:.1f} min"
                )
    client.close()
    print(f"\ndone. ok={ok}  fail={fail}  in {(time.time()-started)/60:.1f} min")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
