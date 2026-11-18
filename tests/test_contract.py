import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class VuEPatchContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.primary = json.loads((ROOT / "recovery/recovery-bundle.json").read_text(encoding="utf-8"))
        cls.fallback = json.loads((ROOT / "recovery/recovery-bundle-fallback.json").read_text(encoding="utf-8"))

    def test_canonical_count_and_version(self):
        self.assertEqual(self.primary["version"], "v12-carrier-redundant")
        self.assertEqual(len(self.primary["files"]), 16)
        self.assertEqual(len(self.fallback["files"]), 16)

    def test_fallback_differences(self):
        changed = {name for name in self.primary["files"] if self.primary["files"][name] != self.fallback["files"][name]}
        self.assertEqual(changed, {"serve.js.aes", "themes/default/main.js"})

    def test_source_matches_primary(self):
        mapping = {
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
        for runtime, path in mapping.items():
            with self.subTest(runtime=runtime):
                self.assertEqual((ROOT / path).read_text(encoding="utf-8"), self.primary["files"][runtime])

    def test_seven_recovery_modules(self):
        prefix = b"jsmaf.__selfHealBundle="
        primary = (ROOT / "recovery/recovery-bundle.json").read_bytes().rstrip(b"\n")
        fallback = (ROOT / "recovery/recovery-bundle-fallback.json").read_bytes().rstrip(b"\n")
        aio = (ROOT / "src/aio/carrier-standalone.js").read_bytes()
        composite = (ROOT / "src/aio/carrier-composite.js").read_bytes()
        expected = {"a": aio, "b": prefix + fallback + b";\n", "c": prefix + primary + b";\n" + composite,
                    "d": prefix + fallback + b";\n", "e": prefix + primary + b";\n" + composite,
                    "f": prefix + primary + b";\n" + composite, "g": aio}
        for letter, content in expected.items():
            with self.subTest(letter=letter):
                self.assertEqual((ROOT / f"generated/recovery-{letter}.js").read_bytes(), content)

    def test_offline_and_aio_routes(self):
        loc = self.primary["files"]["location.js"]
        self.assertIn("requiresPsn", loc)
        self.assertIn("file://../download0/serve.js.aes", loc)
        self.assertIn("img/susec/e.js", loc)
        self.assertIn("aio-relapse", self.primary["files"]["loader.js"])

    def test_full_verifier(self):
        subprocess.run([sys.executable, str(ROOT / "tools/verify.py")], check=True)


if __name__ == "__main__":
    unittest.main()
