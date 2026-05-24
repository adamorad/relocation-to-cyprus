"""Generate the three image assets Google Ads needs for a Performance Max
asset group, plus an extra wider variant for Display.

Outputs to /tmp/realcy-ads/:
  landscape_1200x628.png  (1.91:1, used for Display + responsive image)
  square_1200x1200.png    (1:1,    used for Display + responsive image)
  logo_1200x1200.png      (1:1,    brand logo with RealCy.app wordmark)
  hero_1200x675.png       (16:9,   optional, for YouTube companion / OG)

Run: scripts/.venv/bin/python scripts/build_ad_assets.py
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFont

SRC = "public/cyprus-illustrated.png"
OUT = "/tmp/realcy-ads"
SEA = (53, 205, 196)
INK = (15, 23, 42)
AMBER = (180, 83, 9)
WHITE = (255, 255, 255)


def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def cover_crop(src: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Scale source to fully cover target, centre-crop overflow."""
    src_w, src_h = src.size
    scale = max(target_w / src_w, target_h / src_h)
    new_w, new_h = int(src_w * scale), int(src_h * scale)
    scaled = src.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return scaled.crop((left, top, left + target_w, top + target_h))


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    src = Image.open(SRC).convert("RGB")

    landscape = cover_crop(src, 1200, 628)
    landscape.save(f"{OUT}/landscape_1200x628.png", "PNG", optimize=True)

    square = cover_crop(src, 1200, 1200)
    square.save(f"{OUT}/square_1200x1200.png", "PNG", optimize=True)

    hero = cover_crop(src, 1200, 675)
    hero.save(f"{OUT}/hero_1200x675.png", "PNG", optimize=True)

    logo = Image.new("RGB", (1200, 1200), SEA)
    draw = ImageDraw.Draw(logo)
    title_font = load_font(200)
    sub_font = load_font(72)

    title = "RealCy"
    suffix = ".app"
    sub = "your cyprus portal"

    title_w = draw.textlength(title, font=title_font)
    suffix_w = draw.textlength(suffix, font=title_font)
    total_w = title_w + suffix_w
    title_x = (1200 - total_w) / 2
    title_y = 480
    draw.text((title_x, title_y), title, fill=WHITE, font=title_font)
    draw.text((title_x + title_w, title_y), suffix, fill=AMBER, font=title_font)

    sub_w = draw.textlength(sub, font=sub_font)
    draw.text(
        ((1200 - sub_w) / 2, title_y + 230),
        sub,
        fill=INK,
        font=sub_font,
    )

    logo.save(f"{OUT}/logo_1200x1200.png", "PNG", optimize=True)

    for f in sorted(os.listdir(OUT)):
        size = os.path.getsize(f"{OUT}/{f}")
        print(f"{f}: {size // 1024} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
