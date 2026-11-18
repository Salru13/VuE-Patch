# Credits and provenance

VuE Patch is maintained by XxXJoker13XxX and is based on the [Vue-After-Free project](https://github.com/Vuemony/vue-after-free) by Vuemony and its contributors. The upstream project is distributed under GPL-3.0; see [LICENSE](LICENSE). This repository contains modified runtime files and recovery copies derived from that project. The upstream project does not endorse this patch.

The recovery bundle also contains code that references [yarpe's Lapse payload](https://github.com/Helloyunho/yarpe/blob/main/payloads/lapse.py) in `kernel.js`. Keep upstream attribution and license notices when redistributing or modifying those components.

VuE Patch changes include offline JSMaf startup, NetCtrl runtime settings, SelfHeal recovery modules, and a Self Check / Repair UI. The generated recovery modules duplicate the canonical files from `recovery/recovery-bundle.json`.
