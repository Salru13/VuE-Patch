# Credits and provenance

VuE Patch is maintained by XxXJoker13XxX and is based on the [Vue-After-Free project](https://github.com/Vuemony/vue-after-free) by Vuemony and its contributors. The upstream project is distributed under GPL-3.0; see [LICENSE](LICENSE). This repository contains modified runtime files and recovery copies derived from that project. The upstream project does not endorse this patch.

The recovery bundle also contains code that references [yarpe's Lapse payload](https://github.com/Helloyunho/yarpe/blob/main/payloads/lapse.py) in `kernel.js`. Keep upstream attribution and license notices when redistributing or modifying those components.

VuE Patch changes include offline JSMaf startup, NetCtrl runtime settings, SelfHeal recovery modules, and a Self Check / Repair UI. The generated recovery modules duplicate the canonical files from `recovery/recovery-bundle.json`.

## Upstream acknowledgements

The [Vue-After-Free README](https://github.com/Vuemony/vue-after-free#credits) credits c0w-ar, earthonion, ufm42, D-Link Turtle, Gezine, Helloyunho, Dr.Yenyen, AlAzif, abc, TheFlow, the Lua Loader project, Cryptogenic, and rebelle3 for the upstream exploit, runtime, UI, research, testing, and related work. Those acknowledgements remain with this derivative. The upstream README also lists separate payload sources; no PKG, payload binary, Sony SDK file, or installer binary is included here.

This repository provides its complete patch source and generated recovery data under the included GPL-3.0 license. Keep this license, the original project attribution, and any existing source notices when making further copies or changes. The recovery modules duplicate code from the canonical bundle; regenerating them does not change its provenance.
