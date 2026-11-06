globalThis.__nitro_main__ = import.meta.url;
import "./_libs/unenv.mjs";

import { H as HookableCore } from "./_libs/hookable.mjs";
import { d as defineLazyEventHandler, H as HTTPError, a as H3Core } from "./_libs/h3.mjs";
import { c as FastResponse } from "./_libs/srvx.mjs";


import "./_libs/rou3.mjs";





function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const assets = {
  "/favicon.png": {
    "type": "image/png",
    "etag": '"912-pM4gVngFgPobQbXpmqiXqnhIuzA"',
    "mtime": "2026-11-06T01:04:05.413Z",
    "size": 2322,
    "path": "../public/favicon.png"
  },
  "/icon-192.png": {
    "type": "image/png",
    "etag": '"1d38-GKIjpd8NPwVCZ4kawPOEFETc+9s"',
    "mtime": "2026-11-06T01:04:05.413Z",
    "size": 7480,
    "path": "../public/icon-192.png"
  },
  "/icon-512.png": {
    "type": "image/png",
    "etag": '"5fb7-nZlA2aAHmftId+qIkrefxfckmAA"',
    "mtime": "2026-11-06T01:04:05.413Z",
    "size": 24503,
    "path": "../public/icon-512.png"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"238-HcWYTtHS+82i1FonIxA1pSCTfKY"',
    "mtime": "2026-11-06T01:04:05.413Z",
    "size": 568,
    "path": "../public/manifest.webmanifest"
  },
  "/assets/AlbumReviewDialog-BkH0ajSS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17c6-ECTgDBGfhS2FYGl1AeDLO9Ut10k"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 6086,
    "path": "../public/assets/AlbumReviewDialog-BkH0ajSS.js"
  },
  "/assets/ArtistLine-CQjzVJrG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"213-QiyOkTyid0700CdxHo4VeDSMEyw"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 531,
    "path": "../public/assets/ArtistLine-CQjzVJrG.js"
  },
  "/assets/GlobalNav-BS6AnfAL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-95LRwQMDWIiMcQ9eRF4ymliHyNA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 1559,
    "path": "../public/assets/GlobalNav-BS6AnfAL.js"
  },
  "/assets/MobileShell-BUPQ-hMC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"abd6-+xMfu9Gt6ASDBwXJtv1daToiG4M"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 43990,
    "path": "../public/assets/MobileShell-BUPQ-hMC.js"
  },
  "/assets/RewardsRedeem-Bzn5Z_VU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b18-uNmYJBpFpjspSP5iStmKERusABA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 15128,
    "path": "../public/assets/RewardsRedeem-Bzn5Z_VU.js"
  },
  "/assets/WelcomeView-samCs3to.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"835-LL8I1ytPESIphb6xkOr7m3CHwV8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 2101,
    "path": "../public/assets/WelcomeView-samCs3to.js"
  },
  "/assets/actividad-KeN0SB0x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f45-urKSrIHv4qaVxhE++mO2iPmsdw4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 8005,
    "path": "../public/assets/actividad-KeN0SB0x.js"
  },
  "/assets/adela-auto-BbGs7fuS.webp": {
    "type": "image/webp",
    "etag": '"cdb6-FYJMeE98bWBcDgqzv8k8mKiUfVA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 52662,
    "path": "../public/assets/adela-auto-BbGs7fuS.webp"
  },
  "/assets/adela-escenario-DxTXmBLs.webp": {
    "type": "image/webp",
    "etag": '"b57a-GyFQ0mnThf+zsS3jJiSiwKurSM0"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 46458,
    "path": "../public/assets/adela-escenario-DxTXmBLs.webp"
  },
  "/assets/adela-estrellas-SK7uR--H.webp": {
    "type": "image/webp",
    "etag": '"2eda0-5OzKFZh0YVupC0ud+dwxm9+xqYQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 191904,
    "path": "../public/assets/adela-estrellas-SK7uR--H.webp"
  },
  "/assets/adela-glitter-CylVV7z1.webp": {
    "type": "image/webp",
    "etag": '"9cc2-9EZbje2lMhVgmdBUXE9SgafDF5Q"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 40130,
    "path": "../public/assets/adela-glitter-CylVV7z1.webp"
  },
  "/assets/adela-grito-BDWR7Oos.webp": {
    "type": "image/webp",
    "etag": '"141aa-WkurikATUDTCxxrosCpHmkyn8Co"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 82346,
    "path": "../public/assets/adela-grito-BDWR7Oos.webp"
  },
  "/assets/adela-hero-DevqcWpF.webp": {
    "type": "image/webp",
    "etag": '"cc02-rnUWjDLCHHbOx0RY0CTRHTg/W/U"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 52226,
    "path": "../public/assets/adela-hero-DevqcWpF.webp"
  },
  "/assets/adela-icon-5hZPbTcV.webp": {
    "type": "image/webp",
    "etag": '"469a-BjD+IeM3JvgQakiGrsaOZosbAmg"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 18074,
    "path": "../public/assets/adela-icon-5hZPbTcV.webp"
  },
  "/assets/adela-lengua-8rUArssC.webp": {
    "type": "image/webp",
    "etag": '"420c-OZ6OMaxv/ImSG60FouwY6wYI6Us"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 16908,
    "path": "../public/assets/adela-lengua-8rUArssC.webp"
  },
  "/assets/adela-portada-DTz_iPIl.webp": {
    "type": "image/webp",
    "etag": '"12c50-iun1+enPyCb1HoH3Gy581JZtDWw"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 76880,
    "path": "../public/assets/adela-portada-DTz_iPIl.webp"
  },
  "/assets/admin-DlpF9J7s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56fd-FA3c2PQaThnne5wRGR/zJzk0fqc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 22269,
    "path": "../public/assets/admin-DlpF9J7s.js"
  },
  "/assets/airbag-icon-BBND8sXL.webp": {
    "type": "image/webp",
    "etag": '"b562-dGBuJnNhHBMlYc/blFUV5w9YRH8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 46434,
    "path": "../public/assets/airbag-icon-BBND8sXL.webp"
  },
  "/assets/airbag-banda-CLtSCIDy.webp": {
    "type": "image/webp",
    "etag": '"36632-OQaLlnw0VukghwB6zTh/hVozz9c"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 222770,
    "path": "../public/assets/airbag-banda-CLtSCIDy.webp"
  },
  "/assets/airbag-portada-VgzPFab_.webp": {
    "type": "image/webp",
    "etag": '"18a14-vGSwXd5H/KTMwTreo/BW9UF1Tdg"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 100884,
    "path": "../public/assets/airbag-portada-VgzPFab_.webp"
  },
  "/assets/airbag-vivo-cuTt3LXi.webp": {
    "type": "image/webp",
    "etag": '"5ac0-R/hGt4HI+jmOwezueEQr1VwvCmI"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 23232,
    "path": "../public/assets/airbag-vivo-cuTt3LXi.webp"
  },
  "/assets/album-cover-CSPWEPc-.webp": {
    "type": "image/webp",
    "etag": '"1939c-yH9CPRh/Ecg87h64k/37DVs0O1g"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 103324,
    "path": "../public/assets/album-cover-CSPWEPc-.webp"
  },
  "/assets/arjona-hero-xFYdEfnR.webp": {
    "type": "image/webp",
    "etag": '"150a6-mzstTKsHg0n3oJf04qm9sgpEq6Y"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 86182,
    "path": "../public/assets/arjona-hero-xFYdEfnR.webp"
  },
  "/assets/arjona-icon-Dvvs8trd.webp": {
    "type": "image/webp",
    "etag": '"94ce-47FfD1IVdaWbqsN6pze1p23u5Vg"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 38094,
    "path": "../public/assets/arjona-icon-Dvvs8trd.webp"
  },
  "/assets/arjona-portada-CugK1Oao.webp": {
    "type": "image/webp",
    "etag": '"11754-H2MvHuA/bDXs4Bx9VqDvsKtTBWc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 71508,
    "path": "../public/assets/arjona-portada-CugK1Oao.webp"
  },
  "/assets/arjona-rojo-BhxTFRpb.webp": {
    "type": "image/webp",
    "etag": '"15f46-cXtsrvoKsI8PDBfr26F48ce5VXk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 89926,
    "path": "../public/assets/arjona-rojo-BhxTFRpb.webp"
  },
  "/assets/arjona-seco-no-dijo-BKAh2-zE.webp": {
    "type": "image/webp",
    "etag": '"3a2c-eWyd9L4OiDseltzNdHOK8TQMvz8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 14892,
    "path": "../public/assets/arjona-seco-no-dijo-BKAh2-zE.webp"
  },
  "/assets/arjona-red-B71kw8xR.webp": {
    "type": "image/webp",
    "etag": '"1ee1c-QgyT+zdlY4+h8SoGgCWQK0INPmw"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 126492,
    "path": "../public/assets/arjona-red-B71kw8xR.webp"
  },
  "/assets/arrow-left-D5xvbnIO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-MsnJLZH0bBypX8+lI2GWzX+EA9M"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 166,
    "path": "../public/assets/arrow-left-D5xvbnIO.js"
  },
  "/assets/arrow-right-CP8oZlcl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-7uLGr1n0JKndkULtsfGbD9N3vqg"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 166,
    "path": "../public/assets/arrow-right-CP8oZlcl.js"
  },
  "/assets/auth-Ce0rzYqs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d44-MFCxIJF67WMGh+USuabwx0wjUBs"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 7492,
    "path": "../public/assets/auth-Ce0rzYqs.js"
  },
  "/assets/avatar-1-CXprXVf9.webp": {
    "type": "image/webp",
    "etag": '"3420-+wa6FgW4wI9JhCVLa4iqPV6987Y"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 13344,
    "path": "../public/assets/avatar-1-CXprXVf9.webp"
  },
  "/assets/avatar-2-BKNf-tw_.webp": {
    "type": "image/webp",
    "etag": '"438c-qJE7fxIu9emUn1RbaBphFzkb7Io"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 17292,
    "path": "../public/assets/avatar-2-BKNf-tw_.webp"
  },
  "/assets/avatar-3-CLuFTIj-.webp": {
    "type": "image/webp",
    "etag": '"4128-x/wsvFsBqiNFil6urgOurRW446w"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 16680,
    "path": "../public/assets/avatar-3-CLuFTIj-.webp"
  },
  "/assets/avatar-4-CCyLw1Cm.webp": {
    "type": "image/webp",
    "etag": '"274e-5Q9AgMS7ztGn5K3CbTur6PrIEzE"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 10062,
    "path": "../public/assets/avatar-4-CCyLw1Cm.webp"
  },
  "/assets/avatar-5-s13HFJjs.webp": {
    "type": "image/webp",
    "etag": '"2b52-fTuSQfUSw+S67zDYJkSO+1eRkcc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 11090,
    "path": "../public/assets/avatar-5-s13HFJjs.webp"
  },
  "/assets/avatar-6-C65a1eek.webp": {
    "type": "image/webp",
    "etag": '"21d2-Cqhz65iWSkCjpOgrw18pd/uLGdU"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 8658,
    "path": "../public/assets/avatar-6-C65a1eek.webp"
  },
  "/assets/avatar-7-Ds9aFDbu.webp": {
    "type": "image/webp",
    "etag": '"24c8-/fX4YIT5oWa6X7MjnwfBHpHBNCk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 9416,
    "path": "../public/assets/avatar-7-Ds9aFDbu.webp"
  },
  "/assets/bienvenida-CCY9mvHM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-jtDG68iETWXo2l629YafQC5PYnc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 303,
    "path": "../public/assets/bienvenida-CCY9mvHM.js"
  },
  "/assets/avatar-8-Cfz4a0AQ.webp": {
    "type": "image/webp",
    "etag": '"4968-vD624rOyJD5CCzhu7FsefNrGSvs"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 18792,
    "path": "../public/assets/avatar-8-Cfz4a0AQ.webp"
  },
  "/assets/button-Deix8X2x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4e0-WCQi0luA517kGwApwDq5XCd6M2o"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 1248,
    "path": "../public/assets/button-Deix8X2x.js"
  },
  "/assets/camera-dCMBrw8_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-BPZB4QNXGUS09z9RozDs+MejOJA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 337,
    "path": "../public/assets/camera-dCMBrw8_.js"
  },
  "/assets/cart-CVEIvwwf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70c-imMG4cby4AX5GZfuxkQIfnHEXQ0"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 1804,
    "path": "../public/assets/cart-CVEIvwwf.js"
  },
  "/assets/dialog-Ba0RNXXd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"917-m3zesVQoo4R4l+KWxU7QrW6a/04"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 2327,
    "path": "../public/assets/dialog-Ba0RNXXd.js"
  },
  "/assets/dillom-icon-BIsXTXT6.webp": {
    "type": "image/webp",
    "etag": '"7a80-BpX8lABd2IgCm3RYGfz63BCipMo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31360,
    "path": "../public/assets/dillom-icon-BIsXTXT6.webp"
  },
  "/assets/disc-3-BfIx7QOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11c-J2WoZ1DC860jzU+ik8OCO3wgfqs"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 284,
    "path": "../public/assets/disc-3-BfIx7QOH.js"
  },
  "/assets/drop-logo-2026-Bp3vcWT7.webp": {
    "type": "image/webp",
    "etag": '"5942-3meqGKypjkZ0TYW0OneYo8yFK28"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 22850,
    "path": "../public/assets/drop-logo-2026-Bp3vcWT7.webp"
  },
  "/assets/drop-3tmEcBtM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1edad-QPZUAPSJ/PWLWK6fneaWP4mbENs"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 126381,
    "path": "../public/assets/drop-3tmEcBtM.js"
  },
  "/assets/drop-logo-negativo-B9jxZQB3.webp": {
    "type": "image/webp",
    "etag": '"4698-1x4YIAE5sTHpug9vftjs3Kq80rc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 18072,
    "path": "../public/assets/drop-logo-negativo-B9jxZQB3.webp"
  },
  "/assets/drop-logo-negativo-BgkkeCk8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"43-AR6fOsqUaDQgmXBuq5F6G15Rf+I"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 67,
    "path": "../public/assets/drop-logo-negativo-BgkkeCk8.js"
  },
  "/assets/drop-photo-18-BcbhGCcH.webp": {
    "type": "image/webp",
    "etag": '"c150-qhVkwVLhlG22YeHuckA0WV1sbt4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 49488,
    "path": "../public/assets/drop-photo-18-BcbhGCcH.webp"
  },
  "/assets/drop-photo-19-Cy9DStE8.webp": {
    "type": "image/webp",
    "etag": '"3f84-L56FAeJWdVOOc0Ji67qim3D8M9A"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 16260,
    "path": "../public/assets/drop-photo-19-Cy9DStE8.webp"
  },
  "/assets/drop-photo-20-D5o1MeTs.webp": {
    "type": "image/webp",
    "etag": '"b2ea-vlMI/FjCMgTCyVkgtdooCVPM8uE"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 45802,
    "path": "../public/assets/drop-photo-20-D5o1MeTs.webp"
  },
  "/assets/drop-photo-21-BG0KQZRO.webp": {
    "type": "image/webp",
    "etag": '"6144-5IHav7bmh5/jhYqz+/wfY5IAhUk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 24900,
    "path": "../public/assets/drop-photo-21-BG0KQZRO.webp"
  },
  "/assets/drop-photo-22-DRKL6ku2.webp": {
    "type": "image/webp",
    "etag": '"3746-DVf/Un5Pjihm8DS4Y4m9wpcwetY"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 14150,
    "path": "../public/assets/drop-photo-22-DRKL6ku2.webp"
  },
  "/assets/drop-photo-23-BPFGaT3j.webp": {
    "type": "image/webp",
    "etag": '"14b56-Lc9/iWmsmys9CHgk2AVkNFML0+k"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 84822,
    "path": "../public/assets/drop-photo-23-BPFGaT3j.webp"
  },
  "/assets/drop-photo-24-CGpJfmrR.webp": {
    "type": "image/webp",
    "etag": '"8dee-okylvPZ/MM/uHPjYICf/mTOoqCc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 36334,
    "path": "../public/assets/drop-photo-24-CGpJfmrR.webp"
  },
  "/assets/drop-photo-25-DSCdohKS.webp": {
    "type": "image/webp",
    "etag": '"6d8a-5Ay8i3H7nqcC2h3UH00PWLAK0Bo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 28042,
    "path": "../public/assets/drop-photo-25-DSCdohKS.webp"
  },
  "/assets/drop-photo-27-Zzx4fp-a.webp": {
    "type": "image/webp",
    "etag": '"8910-Un6kkhvJ0GckqHTiAnGEsLC3PfQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 35088,
    "path": "../public/assets/drop-photo-27-Zzx4fp-a.webp"
  },
  "/assets/drop-photo-28-BCpU9Tb2.webp": {
    "type": "image/webp",
    "etag": '"4bb2-m9sf82qJdYTG6cyS7LXJRyUpruA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 19378,
    "path": "../public/assets/drop-photo-28-BCpU9Tb2.webp"
  },
  "/assets/drop-photo-31-BpFihalT.webp": {
    "type": "image/webp",
    "etag": '"5360-0+XMyPWhP/HYAvIu11X9NxHpBfo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 21344,
    "path": "../public/assets/drop-photo-31-BpFihalT.webp"
  },
  "/assets/drop-photo-29-gYCg9hXd.webp": {
    "type": "image/webp",
    "etag": '"cd7c-nYsJ33C3+qPCrfQ18zOQgn/018Q"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 52604,
    "path": "../public/assets/drop-photo-29-gYCg9hXd.webp"
  },
  "/assets/drop-photo-30-C_XqFckA.webp": {
    "type": "image/webp",
    "etag": '"9a88-qH3Y2NQjAgQMKmTeWeRyBhA40jQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 39560,
    "path": "../public/assets/drop-photo-30-C_XqFckA.webp"
  },
  "/assets/drop-photo-32-Cat1ixA5.webp": {
    "type": "image/webp",
    "etag": '"5e8c-Kv89hshj4k+GOmLGnJqNC7NvRKM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 24204,
    "path": "../public/assets/drop-photo-32-Cat1ixA5.webp"
  },
  "/assets/drop-photo-33.png.asset.json-DXXYNJH-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7c3b-TVpfN8cxST5dovmdYLPYeVlYZOo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31803,
    "path": "../public/assets/drop-photo-33.png.asset.json-DXXYNJH-.js"
  },
  "/assets/drop-photo-33-oNWSxnWe.webp": {
    "type": "image/webp",
    "etag": '"11fc4-ZB7B17KI/Thanvd9CRt0o1jEKJo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 73668,
    "path": "../public/assets/drop-photo-33-oNWSxnWe.webp"
  },
  "/assets/drop-photo-34-9GVNJ2_G.webp": {
    "type": "image/webp",
    "etag": '"5704-eZjKobum3ewErAcnztphVtYXl8A"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 22276,
    "path": "../public/assets/drop-photo-34-9GVNJ2_G.webp"
  },
  "/assets/drop-photo-36-CSk4aWWU.webp": {
    "type": "image/webp",
    "etag": '"128b6-eLKtzO5YzuKF/pju/5acCGLF5jI"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 75958,
    "path": "../public/assets/drop-photo-36-CSk4aWWU.webp"
  },
  "/assets/drop-photo-35-Cr-_7Xdp.webp": {
    "type": "image/webp",
    "etag": '"17df2-aHsOzBjmnN6SAXLugmING0RBFf4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 97778,
    "path": "../public/assets/drop-photo-35-Cr-_7Xdp.webp"
  },
  "/assets/drop-photo-37-DkfEksYr.webp": {
    "type": "image/webp",
    "etag": '"36bc-4loaXWUHTGbyC+qWNxuSQwsIa3I"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 14012,
    "path": "../public/assets/drop-photo-37-DkfEksYr.webp"
  },
  "/assets/drops-MXC74B8F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28c4-Ss32T4cKo9UD89dytkB7pWiCbF0"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 10436,
    "path": "../public/assets/drops-MXC74B8F.js"
  },
  "/assets/event-crowd-pqXgaj4h.jpg": {
    "type": "image/jpeg",
    "etag": '"9c24-OLv1q1o7V8ympiZm1PTFcL5Spmo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 39972,
    "path": "../public/assets/event-crowd-pqXgaj4h.jpg"
  },
  "/assets/explorar-CsUeGUpO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7a83-PmthBxnFk1S/1VisuApuPJtc9GM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31363,
    "path": "../public/assets/explorar-CsUeGUpO.js"
  },
  "/assets/explore-data-D0c4K9eb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"272-CRmW6RxtG394b0x9qNNcv7xcL2w"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 626,
    "path": "../public/assets/explore-data-D0c4K9eb.js"
  },
  "/assets/fanatico-single-B5Uzvt3s.webp": {
    "type": "image/webp",
    "etag": '"ca58-kFu8XFb7N5l7xV9/X2dESm1rJEw"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 51800,
    "path": "../public/assets/fanatico-single-B5Uzvt3s.webp"
  },
  "/assets/eye-Cs2n9Dpg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f-UMlamtLi9/3tWjyMnC27J9yept4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 639,
    "path": "../public/assets/eye-Cs2n9Dpg.js"
  },
  "/assets/genero-electronica-B8a_eUSm.webp": {
    "type": "image/webp",
    "etag": '"9080-SsFjtXRX4/XgCfBE//jL5t6O0ac"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 36992,
    "path": "../public/assets/genero-electronica-B8a_eUSm.webp"
  },
  "/assets/genero-indie-DP0POzat.webp": {
    "type": "image/webp",
    "etag": '"7a8e-s2IZNLG7KQhFru3WYNXnfmdWIto"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31374,
    "path": "../public/assets/genero-indie-DP0POzat.webp"
  },
  "/assets/genero-hiphop-D7vZiymv.webp": {
    "type": "image/webp",
    "etag": '"3c4c-u025coGY2ezwyBoaJH5cg16Ba6o"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 15436,
    "path": "../public/assets/genero-hiphop-D7vZiymv.webp"
  },
  "/assets/genero-pop-BVJMgBGv.webp": {
    "type": "image/webp",
    "etag": '"7c8e-9FqsPYDCVdWMFcIm1wvzlvFq0nY"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31886,
    "path": "../public/assets/genero-pop-BVJMgBGv.webp"
  },
  "/assets/genero-poppunk-CubSVmka.webp": {
    "type": "image/webp",
    "etag": '"a91e-Fy9agI8zw3akjg8tOKQbpuM8r7c"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 43294,
    "path": "../public/assets/genero-poppunk-CubSVmka.webp"
  },
  "/assets/genero-rnb-Bf36EYQS.webp": {
    "type": "image/webp",
    "etag": '"45e4-gFRmK0vCG/8Kow3zzlmFEV+9u5E"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 17892,
    "path": "../public/assets/genero-rnb-Bf36EYQS.webp"
  },
  "/assets/genero-rock-D6o-bBXb.webp": {
    "type": "image/webp",
    "etag": '"662e-JpZytOW33xYjT9qY4+ARs4x8M74"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 26158,
    "path": "../public/assets/genero-rock-D6o-bBXb.webp"
  },
  "/assets/genero-urbano-DvCEXcVt.webp": {
    "type": "image/webp",
    "etag": '"9be0-1wsf1rPz2USnx6sJduECCluDW9w"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 39904,
    "path": "../public/assets/genero-urbano-DvCEXcVt.webp"
  },
  "/assets/hero-phone-DkNtcsYZ.jpg": {
    "type": "image/jpeg",
    "etag": '"bbc0-AtQo+4hDtFq9XAGNpqhpNoERK84"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 48064,
    "path": "../public/assets/hero-phone-DkNtcsYZ.jpg"
  },
  "/assets/index-DZL2b_1-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f13-k+6KQnEvYqNX+Ub+e0wH9IHOToQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 3859,
    "path": "../public/assets/index-DZL2b_1-.js"
  },
  "/assets/index-slcBgtm8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18c-U+TlqfOhfo47EKXJOuPJWcpdFaA"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 396,
    "path": "../public/assets/index-slcBgtm8.js"
  },
  "/assets/input-I3p9u7vW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22d-Mp4otLTIM09nLf7qHgkisomm/L4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 557,
    "path": "../public/assets/input-I3p9u7vW.js"
  },
  "/assets/invitado-BXoqQans.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bed-AQWnck6u70X9xjz3pPa8GRh87aI"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 3053,
    "path": "../public/assets/invitado-BXoqQans.js"
  },
  "/assets/lali-10-BRrnY4_S.webp": {
    "type": "image/webp",
    "etag": '"c77c-JJCfxz+t7qm6BynKP3T5lOHROiU"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 51068,
    "path": "../public/assets/lali-10-BRrnY4_S.webp"
  },
  "/assets/lali-11-BZtahGB9.webp": {
    "type": "image/webp",
    "etag": '"1575e-n4r27yVqaO5WAsyDTgpVOyH8ggU"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 87902,
    "path": "../public/assets/lali-11-BZtahGB9.webp"
  },
  "/assets/lali-12-DfkqJQe6.webp": {
    "type": "image/webp",
    "etag": '"45e6-l5CtNgOr4rJ5QWABrMn0+SXmeJw"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 17894,
    "path": "../public/assets/lali-12-DfkqJQe6.webp"
  },
  "/assets/lali-13-C2j2l3xd.webp": {
    "type": "image/webp",
    "etag": '"48f2-i6nERgE6v11teMVA6hP+wRallmc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 18674,
    "path": "../public/assets/lali-13-C2j2l3xd.webp"
  },
  "/assets/lali-14-C-C8zWHa.webp": {
    "type": "image/webp",
    "etag": '"873c-LWdAwd1cjn2v7x1fe8qKw14rIrQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 34620,
    "path": "../public/assets/lali-14-C-C8zWHa.webp"
  },
  "/assets/lali-15-mPkkOyyq.webp": {
    "type": "image/webp",
    "etag": '"d31c-yttf3itFTKwlM62ILC65JjJWCXs"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 54044,
    "path": "../public/assets/lali-15-mPkkOyyq.webp"
  },
  "/assets/index-DVyoC8ju.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a92a1-SXuDH+jKY0m+YZhiCv+jWSDjcm0"',
    "mtime": "2026-11-06T01:04:04.025Z",
    "size": 692897,
    "path": "../public/assets/index-DVyoC8ju.js"
  },
  "/assets/lali-16-B_JvljNH.webp": {
    "type": "image/webp",
    "etag": '"a3d4-aef0ovIVT6GcpFG1amoAzvQmJ+4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 41940,
    "path": "../public/assets/lali-16-B_JvljNH.webp"
  },
  "/assets/lali-auto-IlawJ0OP.webp": {
    "type": "image/webp",
    "etag": '"79bc-ceSjN/szK6hBo9IDCtUIxV8kjdc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 31164,
    "path": "../public/assets/lali-auto-IlawJ0OP.webp"
  },
  "/assets/lali-9-BLOG7pKe.webp": {
    "type": "image/webp",
    "etag": '"5f24-+whZF4ijjAFu9o2gR7UYtkJsgtk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 24356,
    "path": "../public/assets/lali-9-BLOG7pKe.webp"
  },
  "/assets/lali-icon-hR1FfOow.webp": {
    "type": "image/webp",
    "etag": '"6dfe-c3xYwjUiJMaJPPUzwZS7BpEWGLY"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 28158,
    "path": "../public/assets/lali-icon-hR1FfOow.webp"
  },
  "/assets/lali-logo-Cn0h4Q1S.webp": {
    "type": "image/webp",
    "etag": '"312a-iKK55sn8MU9PVW9z7W9ljrMGspc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 12586,
    "path": "../public/assets/lali-logo-Cn0h4Q1S.webp"
  },
  "/assets/lnv-gira-fk64Qobo.webp": {
    "type": "image/webp",
    "etag": '"8a10-bSsNpN5suFdcTPEgzo1GUN3JIEc"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 35344,
    "path": "../public/assets/lnv-gira-fk64Qobo.webp"
  },
  "/assets/lali-phones-CunQ4AL-.webp": {
    "type": "image/webp",
    "etag": '"c856-iGFrbt7pJn89uy9oeuiWSUIOkkI"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 51286,
    "path": "../public/assets/lali-phones-CunQ4AL-.webp"
  },
  "/assets/lnv-icon-BEolBGEv.webp": {
    "type": "image/webp",
    "etag": '"4d9c-jd8OZHtW9lGwhpo0YPCCRHAIm7o"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 19868,
    "path": "../public/assets/lnv-icon-BEolBGEv.webp"
  },
  "/assets/lnv-portada-C9XXr7Nn.webp": {
    "type": "image/webp",
    "etag": '"1bfb0-YNBLigxhY7m0XOT/uMX2DGRvmwM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 114608,
    "path": "../public/assets/lnv-portada-C9XXr7Nn.webp"
  },
  "/assets/lnv-traje-BL8Uk-90.webp": {
    "type": "image/webp",
    "etag": '"4ad8-uDj9CL6ao2vlp4e1s1Vc4fsYreI"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 19160,
    "path": "../public/assets/lnv-traje-BL8Uk-90.webp"
  },
  "/assets/loader-circle-DmU-d0_g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c-/AzWfywueV3+4xEkNN2ZExB8D+U"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 140,
    "path": "../public/assets/loader-circle-DmU-d0_g.js"
  },
  "/assets/maria-icon-CCLZQ-qC.webp": {
    "type": "image/webp",
    "etag": '"3db4-7V1FxMgyk6007tUhHgnXyz+ROCQ"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 15796,
    "path": "../public/assets/maria-icon-CCLZQ-qC.webp"
  },
  "/assets/lnv-poster-t95s3els.webp": {
    "type": "image/webp",
    "etag": '"80e0-kZRTvnQWrEku2nxBdWTEaiVSTQk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 32992,
    "path": "../public/assets/lnv-poster-t95s3els.webp"
  },
  "/assets/merch-CHjZqnPC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c9-pDBi/NSSbGtI4kZMIjc6aANM38A"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 457,
    "path": "../public/assets/merch-CHjZqnPC.js"
  },
  "/assets/mi-drop-CEcJ89KI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8123-AGItnvpkGWPdrQdNyw/ENSWxsB4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 33059,
    "path": "../public/assets/mi-drop-CEcJ89KI.js"
  },
  "/assets/onboarding-1-BnjF0pCR.webp": {
    "type": "image/webp",
    "etag": '"c76c-edSYDWOoThR7efDWxxtEV5z/tGo"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 51052,
    "path": "../public/assets/onboarding-1-BnjF0pCR.webp"
  },
  "/assets/onboarding-2-CGWDofjh.webp": {
    "type": "image/webp",
    "etag": '"adf4-KEvYm4YxEasLbUAbQcYH8hEoO7I"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 44532,
    "path": "../public/assets/onboarding-2-CGWDofjh.webp"
  },
  "/assets/onboarding-3-DMGvFSKM.webp": {
    "type": "image/webp",
    "etag": '"16b20-QkB7bLBt/zHmBHk5qXfMUdLUrQ4"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 92960,
    "path": "../public/assets/onboarding-3-DMGvFSKM.webp"
  },
  "/assets/onboarding-4-Bn5pM3qS.webp": {
    "type": "image/webp",
    "etag": '"1736a-ZCFVjRQ15kKsT+xVLaBD8P97aIM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 95082,
    "path": "../public/assets/onboarding-4-Bn5pM3qS.webp"
  },
  "/assets/pc-caras-D_ZMDhEr.webp": {
    "type": "image/webp",
    "etag": '"18004-Mesh9UWjt/hz/8c9EtsFis5tFno"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 98308,
    "path": "../public/assets/pc-caras-D_ZMDhEr.webp"
  },
  "/assets/pc-globos-silla-B4ulUVCe.webp": {
    "type": "image/webp",
    "etag": '"17cac-9gKVpozvHO6WGzce07GRmZaly6M"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 97452,
    "path": "../public/assets/pc-globos-silla-B4ulUVCe.webp"
  },
  "/assets/pencil-Dlj-G9OI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-CYiob1aGQTUja8p4YsC/sApleUk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 277,
    "path": "../public/assets/pencil-Dlj-G9OI.js"
  },
  "/assets/pc-globos-vuelo-DgCOqIcH.webp": {
    "type": "image/webp",
    "etag": '"9ca8-LrTi0uM4A/gFe45y1GMmJ562gkM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 40104,
    "path": "../public/assets/pc-globos-vuelo-DgCOqIcH.webp"
  },
  "/assets/pc-laboratorio-D6u181IL.webp": {
    "type": "image/webp",
    "etag": '"d40a-oFJ0u0Wirk4aqGVLBEf8o+7YQSg"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 54282,
    "path": "../public/assets/pc-laboratorio-D6u181IL.webp"
  },
  "/assets/privacidad-r3izXlmJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8ce-bsikH7EvxA3ONXc8G90ASB1Pm7Y"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 2254,
    "path": "../public/assets/privacidad-r3izXlmJ.js"
  },
  "/assets/progress-C7Tx5adk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"614-e6RyfJRm+tuqM4EvOqwXMOuNxIk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 1556,
    "path": "../public/assets/progress-C7Tx5adk.js"
  },
  "/assets/reset-password-BN8sPGFG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6d0-uzpdO4GopIzN8deheoXkO1EPhd8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 1744,
    "path": "../public/assets/reset-password-BN8sPGFG.js"
  },
  "/assets/qr-street-C1c4M060.jpg": {
    "type": "image/jpeg",
    "etag": '"105d5-6nVSKo5G7VNAxWIwLkYHmV//01w"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 67029,
    "path": "../public/assets/qr-street-C1c4M060.jpg"
  },
  "/assets/simbolos-33-B1fpzSeA.webp": {
    "type": "image/webp",
    "etag": '"d716-KzSrDomgYNSO8hK6hWJjEPoF/NU"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 55062,
    "path": "../public/assets/simbolos-33-B1fpzSeA.webp"
  },
  "/assets/spotify-B9_nfjHn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"303-4GB/tFL6/TsOzJkdzviBWXml57I"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 771,
    "path": "../public/assets/spotify-B9_nfjHn.js"
  },
  "/assets/spotify-YgCJf6Z2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a9-HpZ1Koq5GmriG03qppgjHs824Yk"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 4265,
    "path": "../public/assets/spotify-YgCJf6Z2.js"
  },
  "/assets/sticker-nvaa-B32RZAqu.webp": {
    "type": "image/webp",
    "etag": '"bed4-j5KAqWlOrcBMB/RKxNmLDK5+21A"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 48852,
    "path": "../public/assets/sticker-nvaa-B32RZAqu.webp"
  },
  "/assets/stencil-wall-CFz6uIIx.webp": {
    "type": "image/webp",
    "etag": '"13f6a-A+6u9Bb1M7UG5UBR87Fn5oN2OY8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 81770,
    "path": "../public/assets/stencil-wall-CFz6uIIx.webp"
  },
  "/assets/tienda-CxOisCw1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7632-feMb9cCf/MuCwwgLQwGa9VFZ5SM"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 30258,
    "path": "../public/assets/tienda-CxOisCw1.js"
  },
  "/assets/ticket-check-DvpEnelL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-Crw6TH8RbD533xtlSTGj1H+bsg8"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 255,
    "path": "../public/assets/ticket-check-DvpEnelL.js"
  },
  "/assets/trash-2-D852pA7t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b2-NEsL0pA/A5t/FRAVUItwi0Kmw60"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 434,
    "path": "../public/assets/trash-2-D852pA7t.js"
  },
  "/assets/tini-icon-CFGMvhUy.webp": {
    "type": "image/webp",
    "etag": '"5546-Nmit7IuL6ADzQlD1Shw0N90MtdA"',
    "mtime": "2026-11-06T01:04:04.013Z",
    "size": 21830,
    "path": "../public/assets/tini-icon-CFGMvhUy.webp"
  },
  "/assets/styles-CYgwgebe.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1dfea-VOpyq1ZAZBoqPuUQKCI9LOU/IYY"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 122858,
    "path": "../public/assets/styles-CYgwgebe.css"
  },
  "/assets/user-round-BT0DNTkP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b2-Zt8IrUFpVgTo/VpAn9CJt9K8J5E"',
    "mtime": "2026-11-06T01:04:04.021Z",
    "size": 178,
    "path": "../public/assets/user-round-BT0DNTkP.js"
  }
};
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_ySJL09 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_ySJL09 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function useNitroHooks() {
  const nitroApp = useNitroApp();
  const hooks = nitroApp.hooks;
  if (hooks) {
    return hooks;
  }
  return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function createHandler(hooks) {
  const nitroApp = useNitroApp();
  const nitroHooks = useNitroHooks();
  return {
    async fetch(request, env, context) {
      globalThis.__env__ = env;
      augmentReq(request, {
        env,
        context
      });
      const ctxExt = {};
      const url = new URL(request.url);
      if (hooks.fetch) {
        const res = await hooks.fetch(request, env, context, url, ctxExt);
        if (res) {
          return res;
        }
      }
      return await nitroApp.fetch(request);
    },
    scheduled(controller, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
        controller,
        env,
        context
      }) || Promise.resolve());
    },
    email(message, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:email", {
        message,
        event: message,
        env,
        context
      }) || Promise.resolve());
    },
    queue(batch, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
        batch,
        event: batch,
        env,
        context
      }) || Promise.resolve());
    },
    tail(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
        traces,
        env,
        context
      }) || Promise.resolve());
    },
    trace(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
        traces,
        env,
        context
      }) || Promise.resolve());
    }
  };
}
function augmentReq(cfReq, ctx) {
  const req = cfReq;
  req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
  req.runtime ??= { name: "cloudflare" };
  req.runtime.cloudflare = {
    ...req.runtime.cloudflare,
    ...ctx
  };
  req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
const cloudflareModule = createHandler({ fetch(cfRequest, env, context, url) {
  if (env.ASSETS && isPublicAssetURL(url.pathname)) {
    return env.ASSETS.fetch(cfRequest);
  }
} });
export {
  cloudflareModule as default
};
