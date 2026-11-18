# Credits and provenance

VuE Patch is maintained by **XxXJoker13XxX**. This source snapshot was extracted from the owner's supplied VuE Joker Patch v1.5 PKG. The offline bootstrap, NetCtrl configuration, SelfHeal recovery, UI integration, and local ReLapse AIO routing are modifications in this patch. This does not imply endorsement by upstream projects.

## Vue-After-Free

The Vue runtime is based on [Vuemony/vue-after-free](https://github.com/Vuemony/vue-after-free), distributed under GPL-3.0; the original license is included as [LICENSE](LICENSE). Its [credits](https://github.com/Vuemony/vue-after-free#credits) name c0w-ar, earthonion, ufm42, D-Link Turtle, Gezine, Helloyunho, Dr.Yenyen, AlAzif, abc, TheFlow, the Lua Loader project, Cryptogenic, and rebelle3. The canonical recovery bundles include copies of upstream runtime code and retain that provenance. `kernel.js` also references [Helloyunho's yarpe Lapse payload](https://github.com/Helloyunho/yarpe/blob/main/payloads/lapse.py).

## WebKitty and ReLapse AIO

The local ReLapse AIO route includes work from [ArabPixel/WebKitty](https://github.com/ArabPixel/WebKitty), whose README states AGPL-3.0-or-later; its [license](LICENSES/WebKitty-AGPL-3.0-or-later.txt) is included. Credit to **ArabPixel** and the upstream [WebKitty credits](https://github.com/ArabPixel/WebKitty#credits-in-no-particular-order): abc, Al-Azif, anonymous, Dr.Yenyen, Egycnq, Feyzee61, Fire30, GattoDev, Jordy, Sonic-Iso, Nathan Fargo, ufm42, payload developers, Nazky, qwertyoruiopz, Raw Game, sleirsgoevy, TheFlow, and m0zz. Additional notices within upstream files remain applicable.

The Vue-derived portions retain GPL-3.0 terms. WebKitty-derived portions retain AGPL-3.0-or-later terms. The two licenses permit a combined work under GPLv3/AGPLv3 section 13, with the AGPL network-source requirement applying to the combination. Preserve both license texts, notices, and corresponding source on redistribution. The private source repository does not include the PKG or DAT image.
