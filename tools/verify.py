#!/usr/bin/env python3
"""Verify the v1.5 runtime sources and A-G recovery carriers."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREFIX = b"jsmaf.__selfHealBundle="


def require(condition, message):
    if not condition:
        raise SystemExit(f"FAIL: {message}")


def read(path):
    return (ROOT / path).read_bytes()


primary_raw = read("recovery/recovery-bundle.json").rstrip(b"\n")
fallback_raw = read("recovery/recovery-bundle-fallback.json").rstrip(b"\n")
primary = json.loads(primary_raw)
fallback = json.loads(fallback_raw)
require(primary.get("version") == fallback.get("version") == "v12-carrier-redundant", "bundle version")
canonical = primary["files"]
require(len(canonical) == len(fallback["files"]) == 16, "canonical count")
require(set(canonical) == set(fallback["files"]), "fallback path set")
different = {name for name in canonical if canonical[name] != fallback["files"][name]}
require(different == {"serve.js.aes", "themes/default/main.js"}, f"fallback differences: {different}")

sources = {
    "location.js": "src/location.js",
    "serve.js.aes": "src/selfheal/serve.js",
    "loader.js": "src/loader.js",
    "netctrl_c0w_twins.js": "src/netctrl_c0w_twins.js",
    "binloader.js": "src/binloader.js",
    "languages.js": "src/languages.js",
    "themes/default/main.js": "src/ui/main.js",
    "themes/default/config_ui.js": "src/ui/config_ui.js",
    "themes/default/payload_host.js": "src/ui/payload_host.js",
}
for runtime, source in sources.items():
    require(read(source).decode("utf-8") == canonical[runtime], f"source differs from primary bundle: {runtime}")

standalone = read("src/aio/carrier-standalone.js")
composite = read("src/aio/carrier-composite.js")
expected = {
    "a": standalone,
    "b": PREFIX + fallback_raw + b";\n",
    "c": PREFIX + primary_raw + b";\n" + composite,
    "d": PREFIX + fallback_raw + b";\n",
    "e": PREFIX + primary_raw + b";\n" + composite,
    "f": PREFIX + primary_raw + b";\n" + composite,
    "g": standalone,
}
for name, content in expected.items():
    require(read(f"generated/recovery-{name}.js") == content, f"recovery-{name}.js differs from source")

location = canonical["location.js"]
require("requiresPsn" in location and "return false" in location and "file://../download0/serve.js.aes" in location, "offline bootstrap")
require("img/susec/e.js" in location and "img/susec/f.js" in location and "img/susec/c.js" in location, "recovery carrier fallback")
serve = canonical["serve.js.aes"]
require("selfHealCarrierBundle" in serve and "img/susec/c.js" in serve, "v12 SelfHeal engine")
require("VUE_WEBKITTY_ROUTES" in standalone.decode("utf-8") and "aio-relapse.html" in standalone.decode("utf-8"), "ReLapse AIO carrier")
require("Self Check & Repair" in canonical["themes/default/main.js"], "SelfHeal menu")
require("aio-relapse" in canonical["loader.js"], "AIO route")

for path in ROOT.rglob("*"):
    if path.is_file() and path.suffix.lower() in {".pkg", ".dat", ".elf", ".bin", ".prx", ".sprx", ".ttf"}:
        require(False, f"binary package in source repo: {path.relative_to(ROOT)}")

manifest = ROOT / "MANIFEST.sha256"
if manifest.exists():
    for row in manifest.read_text(encoding="utf-8").splitlines():
        digest, name = row.split("  ", 1)
        require(hashlib.sha256(read(name)).hexdigest() == digest, f"manifest hash: {name}")

print("VUE_PATCH_GATE=PASS")
