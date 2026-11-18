#!/usr/bin/env python3
"""Verify VuE Patch source, SelfHeal data, and runtime contracts."""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]

SOURCE_MAP = {
    "location.js": ROOT / "src" / "location.js",
    "serve.js.aes": ROOT / "src" / "selfheal" / "serve.js",
    "netctrl_c0w_twins.js": ROOT / "src" / "netctrl_c0w_twins.js",
    "themes/default/main.js": ROOT / "src" / "ui" / "main.js",
}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


bundle = json.loads((ROOT / "recovery" / "recovery-bundle.json").read_text(encoding="utf-8"))
canon = bundle.get("files", {})
if len(canon) != 16:
    fail(f"expected 16 SelfHeal canonical files, got {len(canon)}")

for runtime_path, source_path in SOURCE_MAP.items():
    source = source_path.read_text(encoding="utf-8")
    if source != canon.get(runtime_path):
        fail(f"source mismatch: {source_path.relative_to(ROOT)} -> {runtime_path}")
    print(f"PASS source {runtime_path}: {sha(source.encode())}")

prefix = "jsmaf.__selfHealBundle="
for name in ("recovery-a.js", "recovery-b.js", "recovery-c.js"):
    path = ROOT / "generated" / name
    raw = path.read_text(encoding="utf-8")
    if not raw.startswith(prefix) or not raw.rstrip().endswith(";"):
        fail(f"invalid recovery module wrapper: {name}")
    obj = json.loads(raw[len(prefix):].rstrip()[:-1])
    if obj != bundle:
        fail(f"{name} does not match recovery/recovery-bundle.json")
    print(f"PASS generated {name}: {sha(path.read_bytes())}")

loc = canon["location.js"]
if 'get:function(){return false;}' not in loc or 'file://../download0/serve.js.aes' not in loc:
    fail("offline bootstrap contract missing")
print("PASS offline bootstrap contract")

net = canon["netctrl_c0w_twins.js"]
net_checks = {
    "IPv6 sockets": "var IPV6_SOCK_NUM = 96;",
    "IOV workers": "var IOV_THREAD_NUM = 8;",
    "UIO workers": "var UIO_THREAD_NUM = 8;",
    "main attempts": "var MAIN_LOOP_ITERATIONS = cfg_num('main_loop_iterations', 3",
    "triple-free attempts": "var TRIPLEFREE_ITERATIONS = cfg_num('triplefree_iterations', 8",
    "twin rounds": "var MAX_ROUNDS_TWIN = cfg_num('max_rounds_twin', 5",
    "triplet rounds": "var MAX_ROUNDS_TRIPLET = cfg_num('max_rounds_triplet', 200",
    "main core": "var MAIN_CORE = 4;",
    "kqueue search": "var KQUEUE_ITERATIONS = cfg_num('kqueue_iterations', 5000",
    "kqueue batch": "var KQUEUE_BATCH = 8;",
    "clean retry gate": "retryableFailure === 'rw-clean'",
    "validated-RW retry block": "&& !rwValidated && outer_retry < JB_RETRIES",
}
for label, needle in net_checks.items():
    if needle not in net:
        fail(f"NetCtrl contract missing: {label}")
print("PASS NetCtrl contract")

serve = canon["serve.js.aes"]
for needle in ("img/susec/a.js", "img/feil/b.js", "img/susec/c.js"):
    if needle not in serve:
        fail(f"SelfHeal loader missing {needle}")
print("PASS SelfHeal recovery loader contract")

main = canon["themes/default/main.js"]
if "Self Check" not in main or "Repair APP" not in main:
    fail("SelfHeal menu entries missing")
if "XxXJoker13XxX" not in main:
    fail("Joker patch credit missing")
print("PASS SelfHeal UI contract")

for p in ROOT.rglob("*"):
    if p.is_file() and p.suffix.lower() in {".pkg", ".dat", ".elf", ".bin", ".prx", ".sprx", ".ttf"}:
        fail(f"binary artifact must not be published here: {p.relative_to(ROOT)}")
print("PASS repository file policy")

print("VUE_PATCH_GATE=PASS")
