#!/usr/bin/env python3
"""Generate the three SelfHeal recovery modules from the canonical bundle."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "recovery" / "recovery-bundle.json"
OUT = ROOT / "generated"

obj = json.loads(BUNDLE.read_text(encoding="utf-8"))
payload = "jsmaf.__selfHealBundle=" + json.dumps(
    obj, ensure_ascii=False, separators=(",", ":")
) + ";\n"

OUT.mkdir(parents=True, exist_ok=True)
for name in ("recovery-a.js", "recovery-b.js", "recovery-c.js"):
    path = OUT / name
    path.write_text(payload, encoding="utf-8")
    print(f"wrote {path}")
