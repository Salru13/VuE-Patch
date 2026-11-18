# VuE Patch architecture

## Offline startup

`src/location.js` sets `jsmaf.location.requiresPsn` to false and loads local `file://../download0/serve.js.aes`. The patch is designed to use neither a separate save-file payload nor an internet recovery service. Platform-level PS Vue launch conditions must be checked on a console.

## Runtime and ReLapse AIO

`src/loader.js` routes supported configurations to Vue Lapse, NetCtrl, or the bundled local ReLapse AIO route. The latter is carried by `src/aio/carrier-standalone.js` and `src/aio/carrier-composite.js`, with exact installed copies in `generated/`. This route is derived from WebKitty; see `CREDITS.md` and the AGPL license copy.

## SelfHeal

`src/selfheal/serve.js` provides the v12 carrier-redundant engine. The active primary canonical bundle contains 16 runtime files. The engine also checks the composite AIO carrier, for 17 checked paths in total. It compares full text, writes mismatches through local JSMaf file XHR, reads them back, and verifies. See [SelfHeal details](SELFHEAL.md).

## Recovery placement

Standalone AIO carriers are A/G, fallback bundles are B/D, and composite bundle-plus-AIO carriers are C/E/F. The local `location.js` can read E, F, then C to recover canonical data even when other carriers are damaged. An installed UFS image must keep redundant carriers on independent storage; different file names alone do not guarantee this.

## Maintenance

The primary and fallback bundles intentionally differ in `serve.js.aes` and `themes/default/main.js`. Preserve those variants when rebuilding A-G. The supplied v1.5 PKG is the byte reference for this source snapshot. The active DAT must not receive immutable/nounlink flags; earlier installer records associated that state with launch failure.
