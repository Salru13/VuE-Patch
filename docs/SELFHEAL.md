# SelfHeal v12 recovery contract

This document describes the `download0.dat` extracted from the supplied VuE Joker Patch v1.5 PKG (SHA-256 `13c43d28c65965211a97ab1ac287dfeb7abb72162f32d10dc08c386383dc9739`). The code and generated carriers in this repository were taken from that image. The older v8 source archive is not the authority for this revision.

## Local recovery data

The active primary bundle contains 16 canonical runtime files. The SelfHeal engine additionally checks `img/susec/c.js`, the composite ReLapse AIO carrier. A/G contain standalone AIO route copies; B/D contain the fallback bundle; C/E/F combine the primary bundle with the AIO route. The primary and fallback bundles intentionally have different `serve.js.aes` and `themes/default/main.js` copies. `location.js` reads E, F, then C for a usable bundle. `serve.js.aes` also attempts to recover an AIO carrier from E/F/C.

Self Check reads each target and compares full text with the canonical copy. Repair writes only mismatches through JSMaf's local `file://../download0/` API, reads each written file back, and can then check the full set again. The route is local and needs no separate save-file recovery copy or internet service. The UI's Repair availability is distinct from filesystem immutable flags.

## Image and installer requirements

Carrier redundancy depends on distinct UFS inode and data placement in the installed image. The source tree proves only the logical paths and bytes; actual placement needs an image check. The active `/user/download/CUSA00960/download0.dat` must remain writable and must not be set immutable/nounlink. An earlier installer source recorded a Vue launch failure when those flags were applied. This source repo does not contain a PKG installer.

## Verification boundary

The extracted v1.5 DAT has 205 regular files. All 16 active canonical runtime files match the primary bundle. A host simulation verifies 17/17 healthy, two damaged files, two writes, and 17/17 after repair. These checks do not demonstrate launch or repair on a physical PS4 with this exact extracted DAT.
