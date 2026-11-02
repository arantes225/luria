#!/usr/bin/env python3
"""Build transparent Traube bust PWA icons from the current theme-neutral PNG."""
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def build(root: Path) -> None:
    logos = root / "assets" / "img" / "logos"
    source = logos / "logo-icone-original.png"
    with Image.open(source) as image:
        base = image.convert("RGBA")
        for size in (180, 192, 512):
            icon = base.resize((size, size), Image.Resampling.LANCZOS)
            target = logos / f"pwa-icon-{size}.png"
            icon.save(target, format="PNG", optimize=True)
            with Image.open(target) as saved:
                if saved.size != (size, size) or saved.mode != "RGBA":
                    raise RuntimeError(f"Invalid generated icon: {target}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    build(parser.parse_args().root)
