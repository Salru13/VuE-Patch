#!/usr/bin/env python3
"""Rebuild the exact v1.5 A-G carriers from source snapshots."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREFIX = b"jsmaf.__selfHealBundle="


def bundle(name: str) -> bytes:
    return (ROOT / "recovery" / name).read_bytes().rstrip(b"\n")


standalone = (ROOT / "src/aio/carrier-standalone.js").read_bytes()
composite = (ROOT / "src/aio/carrier-composite.js").read_bytes()
primary = PREFIX + bundle("recovery-bundle.json") + b";\n" + composite
fallback = PREFIX + bundle("recovery-bundle-fallback.json") + b";\n"

for letter, content in {
    "a": standalone,
    "b": fallback,
    "c": primary,
    "d": fallback,
    "e": primary,
    "f": primary,
    "g": standalone,
}.items():
    target = ROOT / "generated" / f"recovery-{letter}.js"
    target.write_bytes(content)
    print(f"wrote {target.relative_to(ROOT)}")
