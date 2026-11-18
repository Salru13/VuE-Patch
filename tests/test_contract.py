import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class VuEPatchContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bundle = json.loads((ROOT / "recovery" / "recovery-bundle.json").read_text(encoding="utf-8"))
        cls.canon = cls.bundle["files"]

    def test_canonical_count(self):
        self.assertEqual(len(self.canon), 16)

    def test_source_matches_canonical_runtime(self):
        mapping = {
            "location.js": ROOT / "src/location.js",
            "serve.js.aes": ROOT / "src/selfheal/serve.js",
            "netctrl_c0w_twins.js": ROOT / "src/netctrl_c0w_twins.js",
            "themes/default/main.js": ROOT / "src/ui/main.js",
        }
        for runtime, path in mapping.items():
            with self.subTest(runtime=runtime):
                self.assertEqual(path.read_text(encoding="utf-8"), self.canon[runtime])

    def test_three_recovery_modules_match(self):
        prefix = "jsmaf.__selfHealBundle="
        for name in ("recovery-a.js", "recovery-b.js", "recovery-c.js"):
            raw = (ROOT / "generated" / name).read_text(encoding="utf-8")
            self.assertTrue(raw.startswith(prefix))
            obj = json.loads(raw[len(prefix):].rstrip()[:-1])
            self.assertEqual(obj, self.bundle)

    def test_offline_bootstrap(self):
        loc = self.canon["location.js"]
        self.assertIn('get:function(){return false;}', loc)
        self.assertIn('file://../download0/serve.js.aes', loc)

    def test_selfheal_ui(self):
        main = self.canon["themes/default/main.js"]
        self.assertIn("Self Check", main)
        self.assertIn("Repair APP", main)
        self.assertIn("XxXJoker13XxX", main)

    def test_full_verifier(self):
        subprocess.run([sys.executable, str(ROOT / "tools/verify.py")], check=True)


if __name__ == "__main__":
    unittest.main()
