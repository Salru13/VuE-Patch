# VuE Patch

**Offline PlayStation Vue patch with SelfHeal and a local ReLapse AIO browser route.** Maintained by **XxXJoker13XxX**. The patch is designed to start without an internet service or a separate save-file payload. Installation needs FTP access once; the runtime and recovery files then live in `download0.dat`.

## What it includes

- Local JSMaf bootstrap from `download0.dat`, with `requiresPsn` set to false.
- Self Check & Repair with redundant local recovery carriers. SelfHeal checks 17 paths, repairs mismatches, and reads files back to verify them.
- Native Vue Lapse/NetCtrl routes on their supported firmware ranges.
- **ReLapse AIO launched from Vue into the local browser route for firmware 13.02–13.04.** The route is bundled locally; it does not need a remote exploit host. [WebKitty](https://github.com/ArabPixel/WebKitty) and its contributors are credited below.

The firmware ranges and route choice are implemented in [`src/loader.js`](src/loader.js). The source and host checks establish the included code; I have not tested this exact extracted DAT on a physical console.

## Install `download0.dat` manually

1. Install the PlayStation Vue base application and its **1.24 patch** for title `CUSA00960`. Follow the [Vue-After-Free setup guide](https://github.com/Vuemony/vue-after-free) for the correct base package and initial setup.
2. Download the [VuE Patch ZIP](https://github.com/Salru13/VuE-Patch/releases/tag/VuE-Patch) and extract **`download0.dat`**. Do not copy the ZIP itself to the console.
3. Enable FTP on the PS4 and connect to it. Go to **`/user/download/CUSA00960/`**; create that directory if it does not exist. Back up any existing `download0.dat`, then place the extracted **`download0.dat`** there.
4. Start PlayStation Vue. VuE Patch loads its local files from `download0.dat`. Use **Self Check & Repair** in the menu if files are damaged.

The FTP step is for installation. SelfHeal uses local copies and is designed to work without a separate save-file recovery copy or an internet connection. The underlying PS Vue application's launch conditions can depend on the console's setup; this source repository cannot prove every setup will boot without savedata.

**DAT integrity:** 268,435,456 bytes; SHA-256 `13c43d28c65965211a97ab1ac287dfeb7abb72162f32d10dc08c386383dc9739`. The ZIP contains the exact `download0.dat` extracted from the owner's supplied PKG. No PKG or DAT is committed to this source repository.

## Credits

VuE Patch integration and maintenance: **XxXJoker13XxX**.

- **[Vuemony / Vue-After-Free](https://github.com/Vuemony/vue-after-free)** — original PlayStation Vue exploit project and runtime. Its GPL-3.0 license is included in [`LICENSE`](LICENSE). Upstream credits: c0w-ar, earthonion, ufm42, D-Link Turtle, Gezine, Helloyunho, Dr.Yenyen, AlAzif, abc, TheFlow, the Lua Loader project, Cryptogenic, and rebelle3.
- **[ArabPixel / WebKitty](https://github.com/ArabPixel/WebKitty)** — ReLapse AIO browser host foundation. Its AGPL-3.0-or-later license is included in [`LICENSES/WebKitty-AGPL-3.0-or-later.txt`](LICENSES/WebKitty-AGPL-3.0-or-later.txt). Upstream credits: abc, Al-Azif, anonymous, Dr.Yenyen, Egycnq, Feyzee61, Fire30, GattoDev, Jordy, Sonic-Iso, Nathan Fargo, ufm42, payload developers, Nazky, qwertyoruiopz, Raw Game, sleirsgoevy, TheFlow, and m0zz.

See [`CREDITS.md`](CREDITS.md) for provenance and additional notices. The GPL-3.0 and AGPL-3.0-or-later obligations apply to their respective source and the combined distribution as described there. Neither upstream project endorses this patch.

## Support

If VuE Patch helps you, you can [support XxXJoker13XxX on Ko-fi](https://ko-fi.com/jokerx13). GitHub also shows this link through the repository Sponsor button.

## Source layout and checks

`src/` contains the offline bootstrap, runtime, SelfHeal, UI, and AIO carrier source. `recovery/` contains primary and fallback canonical bundles. `generated/` contains the exact installed A–G recovery modules. `tools/`, `tests/`, and `docs/` contain rebuilding, checks, and design details.

```bash
python3 tools/build_recovery_modules.py
python3 tools/verify.py
python3 -m unittest discover -s tests -v
node tests/test_selfheal_engine.js
```

All checks pass for the source snapshot. See [`docs/SELFHEAL.md`](docs/SELFHEAL.md) for recovery placement and write-back details.
