# VuE Patch

Source repository for the VuE runtime patch maintained by **XxXJoker13XxX**. This revision reflects the `download0.dat` extracted from the supplied VuE Joker Patch v1.5 PKG, including SelfHeal v12 and the local ReLapse AIO route. The PKG, DAT, console executables, and payload binaries are not tracked in this repository.

## Intended use

The patch is designed for local, offline startup without a separate save-file payload. `location.js` sets `requiresPsn` to false and loads `serve.js.aes` from `download0/`. SelfHeal obtains canonical recovery data from local carriers and writes repaired files back to `download0/`; it does not download recovery data. The local ReLapse AIO route is bundled in the image.

A `download0.dat` extracted from the supplied v1.5 PKG is 268435456 bytes with SHA-256 `13c43d28c65965211a97ab1ac287dfeb7abb72162f32d10dc08c386383dc9739`. This is an extraction of the supplied PKG, not a new console-tested combination. Manual installation can follow the upstream [Vue-After-Free instructions](https://github.com/Vuemony/vue-after-free), substituting this DAT where those instructions call for `download0.dat`. Launch and repair on a specific console still require device validation.

## Credits and licenses

Based on [Vue-After-Free](https://github.com/Vuemony/vue-after-free) by Vuemony and contributors (GPL-3.0). The bundled local ReLapse AIO route incorporates [WebKitty](https://github.com/ArabPixel/WebKitty) by ArabPixel and its contributors (AGPL-3.0-or-later). See [CREDITS.md](CREDITS.md), [GPL-3.0](LICENSE), and [WebKitty AGPL-3.0-or-later](LICENSES/WebKitty-AGPL-3.0-or-later.txt). Keep both upstream notices and license obligations when redistributing a combination.

## Repository layout

- `src/`: runtime source extracted from the v1.5 DAT, including offline bootstrap, NetCtrl, SelfHeal, UI, and AIO carrier sources.
- `recovery/`: primary and fallback canonical bundles.
- `generated/`: exact A-G recovery and AIO modules installed in the v1.5 DAT.
- `tools/`: deterministic carrier rebuilding and verification.
- `tests/`: contract and simulated repair checks.
- `docs/`: architecture and SelfHeal behavior.

The active SelfHeal engine checks 17 paths: 16 runtime files plus the composite AIO carrier. See [SelfHeal recovery contract](docs/SELFHEAL.md).

## Maintenance and verification

When a runtime file changes, update its canonical copy in the appropriate recovery bundle and rebuild the generated modules. Keep the active primary bundle aligned with installed runtime files.

```bash
python3 tools/build_recovery_modules.py
python3 tools/verify.py
python3 -m unittest discover -s tests -v
node tests/test_selfheal_engine.js
```

All commands must pass before publishing changes. Host simulation does not replace console testing.
