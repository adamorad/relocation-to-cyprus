"""Upscale cyprus-illustrated.png 2x with LANCZOS for sharper desktop rendering."""
from pathlib import Path
from PIL import Image

SRC = Path(__file__).resolve().parent.parent / "public" / "cyprus-illustrated.png"
im = Image.open(SRC).convert("RGB")
print("orig:", im.size)
target = (im.size[0] * 2, im.size[1] * 2)
big = im.resize(target, Image.LANCZOS)
big.save(SRC, format="PNG", optimize=True)
print("new:", big.size)
