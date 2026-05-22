"""Download every image referenced by listings.json, remove the
bottom-right watermark via OpenCV inpaint, save under public/images/,
and rewrite listings.json so the app loads them from the local origin.

Resumable: skips files that already exist locally.
"""
from __future__ import annotations

import io
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse

import cv2
import httpx
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LISTINGS_JSON = ROOT / "src" / "data" / "listings.json"
OUT_DIR = ROOT / "public" / "images"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
)

# Watermark sits in the bottom-right corner. Mask covers the bottom 14% × 22%
# of the frame; cv2.INPAINT_TELEA with radius=6 smears the surrounding pixels
# over it. Slightly oversize-the-mask so subpixel anti-aliasing doesn't leak.
MASK_Y_FRAC = 0.85
MASK_X_FRAC = 0.76


def needs_processing(url: str) -> bool:
    return isinstance(url, str) and "cdn" in url and url.startswith("http")


def derive_local_path(slug: str, idx: int, url: str) -> Path:
    suffix = Path(urlparse(url).path).suffix or ".webp"
    if suffix.lower() not in {".webp", ".jpg", ".jpeg", ".png"}:
        suffix = ".webp"
    return OUT_DIR / slug / f"{idx:02d}{suffix}"


def local_url(p: Path) -> str:
    rel = p.relative_to(ROOT / "public")
    return "/" + str(rel).replace("\\", "/")


def fetch_and_clean(url: str, dest: Path, client: httpx.Client) -> bool:
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    try:
        r = client.get(url, timeout=30)
        if r.status_code != 200:
            print(f"  [{r.status_code}] {url}")
            return False
        im = Image.open(io.BytesIO(r.content)).convert("RGB")
        arr = np.array(im)
        h, w = arr.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        mask[int(h * MASK_Y_FRAC):, int(w * MASK_X_FRAC):] = 255
        bgr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
        out = cv2.inpaint(bgr, mask, 6, cv2.INPAINT_TELEA)
        rgb = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
        dest.parent.mkdir(parents=True, exist_ok=True)
        # Save as WebP — same family as the source and ~half the size of jpg
        # at this quality.
        Image.fromarray(rgb).save(dest, format="WEBP", quality=82, method=6)
        return True
    except Exception as e:
        print(f"  [error] {url}: {e}")
        return False


def collect_urls(listings: list[dict]) -> list[tuple[str, int, str]]:
    """Return (slug, image_index, url) triples for every image we need."""
    triples: list[tuple[str, int, str]] = []
    for l in listings:
        slug = l.get("slug")
        if not slug:
            continue
        seen: set[str] = set()
        for i, u in enumerate(l.get("images") or []):
            if needs_processing(u) and u not in seen:
                seen.add(u)
                triples.append((slug, i, u))
    return triples


def rewrite_listings(listings: list[dict]) -> None:
    """Replace remote URLs with their local paths where we have a file."""
    for l in listings:
        slug = l.get("slug")
        if not slug:
            continue
        new_images: list[str] = []
        for i, u in enumerate(l.get("images") or []):
            if needs_processing(u):
                p = derive_local_path(slug, i, u)
                if p.exists():
                    new_images.append(local_url(p))
                    continue
            new_images.append(u)
        l["images"] = new_images


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    listings = json.loads(LISTINGS_JSON.read_text(encoding="utf-8"))
    triples = collect_urls(listings)
    print(f"{len(triples)} images to process (some may already be cached)")

    # Quick scan for skips
    pending = [
        (slug, i, u) for slug, i, u in triples
        if not derive_local_path(slug, i, u).exists()
    ]
    print(f"  {len(pending)} new, {len(triples) - len(pending)} already done")
    if not pending:
        print("nothing to fetch; rewriting JSON only")
        rewrite_listings(listings)
        LISTINGS_JSON.write_text(json.dumps(listings, ensure_ascii=False, indent=2))
        return 0

    headers = {"User-Agent": UA, "Referer": "https://www.bazaraki.com/"}
    client = httpx.Client(headers=headers, http2=False, follow_redirects=True)
    ok = 0
    fail = 0
    started = time.time()

    # Modest parallelism — be polite to the CDN.
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {
            pool.submit(fetch_and_clean, u, derive_local_path(slug, i, u), client): (slug, i, u)
            for slug, i, u in pending
        }
        for j, f in enumerate(as_completed(futures), 1):
            slug, i, u = futures[f]
            try:
                if f.result():
                    ok += 1
                else:
                    fail += 1
            except Exception as e:
                fail += 1
                print(f"  [exc] {slug}[{i}]: {e}")
            if j % 50 == 0 or j == len(pending):
                rate = j / (time.time() - started)
                eta = (len(pending) - j) / max(rate, 0.01)
                print(
                    f"  [{j}/{len(pending)}]  ok={ok} fail={fail}  "
                    f"~{rate:.1f}/s  eta {eta/60:.1f} min"
                )

    client.close()
    print(f"\ndownload+inpaint done. ok={ok}  fail={fail}  in {(time.time()-started)/60:.1f} min")

    print("rewriting listings.json with local URLs…")
    rewrite_listings(listings)
    LISTINGS_JSON.write_text(json.dumps(listings, ensure_ascii=False, indent=2))
    print(f"wrote {LISTINGS_JSON.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
