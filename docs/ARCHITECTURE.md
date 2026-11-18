# VuE Patch Architecture

## Offline bootstrap

`src/location.js` provides the local JSMaf bootstrap. `jsmaf.location.requiresPsn` remains false and startup loads `file://../download0/serve.js.aes` asynchronously.

The bootstrap is intentionally small and has no remote dependency or secondary network path.

The patch bootstrap and SelfHeal are designed to work without a separate save-file payload: startup and recovery read local `download0/` files. No internet service supplies the recovery data. Full PS Vue launch without savedata is a platform claim that still needs a real-console check.

## NetCtrl

`src/netctrl_c0w_twins.js` contains the VuE NetCtrl runtime and its tested operating parameters:

- 96 IPv6 sockets
- 8 IOV workers
- 8 UIO workers
- 3 main attempts
- 8 triple-free attempts
- `MAX_ROUNDS_TWIN = 5`
- `MAX_ROUNDS_TRIPLET = 200`
- `MAIN_CORE = 4`
- kqueue search = 5000
- kqueue batch = 8

The bounded clean-retry path is intentionally narrow. A fresh retry is allowed only for explicitly classified contained failures, before kernel R/W has been validated and while the retry budget remains. Unsafe or committed state is not reused for another attempt.

## SelfHeal

SelfHeal protects a 16-file canonical set stored in `recovery/recovery-bundle.json`.

Three generated modules carry the same logical bundle:

- A → `img/susec/a.js`
- B → `img/feil/b.js`
- C → `img/susec/c.js`

At runtime, `serve.js.aes` loads A first and falls back to B, then C. Self Check compares the critical set; Repair writes mismatches and verifies the result.

The installed image must keep the three recovery modules on distinct inodes and must not set immutable/nounlink on the active `download0.dat`. See [SelfHeal recovery and installation contract](SELFHEAL.md).

## UI integration

`src/ui/main.js` adds **Self Check** and **Repair APP** while keeping recovery data outside the menu script. This keeps the startup path lightweight and avoids unnecessary changes to JSMaf initialization timing.

## Recovery maintenance

The three recovery modules are generated from the canonical bundle. Regenerate all three whenever the canonical set changes:

```bash
python3 tools/build_recovery_modules.py
```

Run verification and regression tests after regeneration.
