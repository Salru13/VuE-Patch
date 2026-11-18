# VuE Patch

Source repository for the VuE runtime patch maintained by **XxXJoker13XxX**.

The repository contains the VuE-specific runtime changes for offline startup, NetCtrl, SelfHeal, recovery modules, and the Self Check / Repair UI. It contains source, tests, documentation, and generated JavaScript; no PKG or console binaries.

## Offline and save-file-free design

VuE Patch is intended to run locally, without an internet service or a separate save file carrying the patch. `location.js` sets `requiresPsn` to false and loads `serve.js.aes` from local `download0/`. SelfHeal loads its three recovery copies from the same local image and repairs files there; it does not fetch recovery data from a server or a save file.

These source checks establish the patch bootstrap and SelfHeal paths. Launch behavior of the unmodified PS Vue application and recovery on a real console still require device testing; the source repository alone cannot prove those platform conditions.

## Credits and license

Based on [Vue-After-Free](https://github.com/Vuemony/vue-after-free) by Vuemony and contributors. See [CREDITS.md](CREDITS.md) and [LICENSE](LICENSE) for provenance and GPL-3.0 terms.

## Repository layout

```text
src/
  location.js                  Offline JSMaf bootstrap
  netctrl_c0w_twins.js         NetCtrl runtime
  selfheal/serve.js            Source deployed as serve.js.aes
  ui/main.js                   Self Check / Repair UI integration
recovery/
  recovery-bundle.json         SelfHeal canonical file set
generated/
  recovery-a.js                Recovery module A
  recovery-b.js                Recovery module B
  recovery-c.js                Recovery module C
tools/
  build_recovery_modules.py    Rebuild recovery modules from the canonical bundle
  verify.py                    Verify source, recovery data, and runtime contracts
tests/
  test_contract.py             Regression checks
docs/
  ARCHITECTURE.md              Runtime architecture and maintenance notes
```

## Runtime mapping

| Repository file | Runtime path |
| --- | --- |
| `src/location.js` | `location.js` |
| `src/netctrl_c0w_twins.js` | `netctrl_c0w_twins.js` |
| `src/selfheal/serve.js` | `serve.js.aes` |
| `src/ui/main.js` | `themes/default/main.js` |
| `generated/recovery-a.js` | `img/susec/a.js` |
| `generated/recovery-b.js` | `img/feil/b.js` |
| `generated/recovery-c.js` | `img/susec/c.js` |

See [SelfHeal recovery and installation contract](docs/SELFHEAL.md) for recovery placement, write-back, and active-image protection requirements.

## Maintenance

`netctrl_c0w_twins.js` is part of the SelfHeal canonical set. When canonical runtime content changes, update `recovery/recovery-bundle.json` and regenerate all three recovery modules before merging.

## Verification

```bash
python3 tools/verify.py
python3 -m unittest discover -s tests -v
node tests/test_selfheal_engine.js
```

All commands must complete without errors before publishing changes.

---

**VuE Patch — XxXJoker13XxX**
