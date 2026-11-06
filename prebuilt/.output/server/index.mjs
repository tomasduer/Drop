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
    "mtime": "2026-11-06T00:56:35.449Z",
    "size": 2322,
    "path": "../public/favicon.png"
  },
  "/icon-192.png": {
    "type": "image/png",
    "etag": '"1d38-GKIjpd8NPwVCZ4kawPOEFETc+9s"',
    "mtime": "2026-11-06T00:56:35.449Z",
    "size": 7480,
    "path": "../public/icon-192.png"
  },
  "/icon-512.png": {
    "type": "image/png",
    "etag": '"5fb7-nZlA2aAHmftId+qIkrefxfckmAA"',
    "mtime": "2026-11-06T00:56:35.449Z",
    "size": 24503,
    "path": "../public/icon-512.png"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"238-HcWYTtHS+82i1FonIxA1pSCTfKY"',
    "mtime": "2026-11-06T00:56:35.449Z",
    "size": 568,
    "path": "../public/manifest.webmanifest"
  },
  "/assets/AlbumReviewDialog-DzmXNmO2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17c6-34ryFfRYoUrTsH7TvUSBmQlsvf0"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 6086,
    "path": "../public/assets/AlbumReviewDialog-DzmXNmO2.js"
  },
  "/assets/GlobalNav-BThzOn2u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"617-Di4nfUG9PnmCJn6WWZdc7Ft6KKU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 1559,
    "path": "../public/assets/GlobalNav-BThzOn2u.js"
  },
  "/assets/MobileShell-Dqm118Pz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"abd6-9Cv5rtSO96NmmdzLcoIsiE3K+Xg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 43990,
    "path": "../public/assets/MobileShell-Dqm118Pz.js"
  },
  "/assets/ArtistLine-yaO--NtY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"213-wlgipnKTY3HuiLaOsIg+HYAWIjU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 531,
    "path": "../public/assets/ArtistLine-yaO--NtY.js"
  },
  "/assets/WelcomeView-CCEyXHfZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"835-9GY68yj80TgWcr68rfVcMte4icc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 2101,
    "path": "../public/assets/WelcomeView-CCEyXHfZ.js"
  },
  "/assets/adela-escenario-DxTXmBLs.webp": {
    "type": "image/webp",
    "etag": '"b57a-GyFQ0mnThf+zsS3jJiSiwKurSM0"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 46458,
    "path": "../public/assets/adela-escenario-DxTXmBLs.webp"
  },
  "/assets/adela-auto-BbGs7fuS.webp": {
    "type": "image/webp",
    "etag": '"cdb6-FYJMeE98bWBcDgqzv8k8mKiUfVA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 52662,
    "path": "../public/assets/adela-auto-BbGs7fuS.webp"
  },
  "/assets/RewardsRedeem-C8Dejz2Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b18-01haQ2DZmCXEvwVSfuTn6VzFmUk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 15128,
    "path": "../public/assets/RewardsRedeem-C8Dejz2Y.js"
  },
  "/assets/adela-glitter-CylVV7z1.webp": {
    "type": "image/webp",
    "etag": '"9cc2-9EZbje2lMhVgmdBUXE9SgafDF5Q"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 40130,
    "path": "../public/assets/adela-glitter-CylVV7z1.webp"
  },
  "/assets/adela-estrellas-SK7uR--H.webp": {
    "type": "image/webp",
    "etag": '"2eda0-5OzKFZh0YVupC0ud+dwxm9+xqYQ"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 191904,
    "path": "../public/assets/adela-estrellas-SK7uR--H.webp"
  },
  "/assets/adela-grito-BDWR7Oos.webp": {
    "type": "image/webp",
    "etag": '"141aa-WkurikATUDTCxxrosCpHmkyn8Co"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 82346,
    "path": "../public/assets/adela-grito-BDWR7Oos.webp"
  },
  "/assets/adela-hero-DevqcWpF.webp": {
    "type": "image/webp",
    "etag": '"cc02-rnUWjDLCHHbOx0RY0CTRHTg/W/U"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 52226,
    "path": "../public/assets/adela-hero-DevqcWpF.webp"
  },
  "/assets/adela-lengua-8rUArssC.webp": {
    "type": "image/webp",
    "etag": '"420c-OZ6OMaxv/ImSG60FouwY6wYI6Us"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 16908,
    "path": "../public/assets/adela-lengua-8rUArssC.webp"
  },
  "/assets/adela-icon-5hZPbTcV.webp": {
    "type": "image/webp",
    "etag": '"469a-BjD+IeM3JvgQakiGrsaOZosbAmg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 18074,
    "path": "../public/assets/adela-icon-5hZPbTcV.webp"
  },
  "/assets/admin-p7lV7ueZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56fd-/Wy5CsRz/w+tnEd8S2bKIUWw+3A"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 22269,
    "path": "../public/assets/admin-p7lV7ueZ.js"
  },
  "/assets/actividad-Dlzg4fXf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f45-S/PIMzKjJ6GvREFHO7D5k25glqk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 8005,
    "path": "../public/assets/actividad-Dlzg4fXf.js"
  },
  "/assets/adela-portada-DTz_iPIl.webp": {
    "type": "image/webp",
    "etag": '"12c50-iun1+enPyCb1HoH3Gy581JZtDWw"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 76880,
    "path": "../public/assets/adela-portada-DTz_iPIl.webp"
  },
  "/assets/airbag-portada-VgzPFab_.webp": {
    "type": "image/webp",
    "etag": '"18a14-vGSwXd5H/KTMwTreo/BW9UF1Tdg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 100884,
    "path": "../public/assets/airbag-portada-VgzPFab_.webp"
  },
  "/assets/airbag-icon-BBND8sXL.webp": {
    "type": "image/webp",
    "etag": '"b562-dGBuJnNhHBMlYc/blFUV5w9YRH8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 46434,
    "path": "../public/assets/airbag-icon-BBND8sXL.webp"
  },
  "/assets/airbag-banda-CLtSCIDy.webp": {
    "type": "image/webp",
    "etag": '"36632-OQaLlnw0VukghwB6zTh/hVozz9c"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 222770,
    "path": "../public/assets/airbag-banda-CLtSCIDy.webp"
  },
  "/assets/airbag-vivo-cuTt3LXi.webp": {
    "type": "image/webp",
    "etag": '"5ac0-R/hGt4HI+jmOwezueEQr1VwvCmI"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 23232,
    "path": "../public/assets/airbag-vivo-cuTt3LXi.webp"
  },
  "/assets/album-cover-CSPWEPc-.webp": {
    "type": "image/webp",
    "etag": '"1939c-yH9CPRh/Ecg87h64k/37DVs0O1g"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 103324,
    "path": "../public/assets/album-cover-CSPWEPc-.webp"
  },
  "/assets/arjona-hero-xFYdEfnR.webp": {
    "type": "image/webp",
    "etag": '"150a6-mzstTKsHg0n3oJf04qm9sgpEq6Y"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 86182,
    "path": "../public/assets/arjona-hero-xFYdEfnR.webp"
  },
  "/assets/arjona-icon-Dvvs8trd.webp": {
    "type": "image/webp",
    "etag": '"94ce-47FfD1IVdaWbqsN6pze1p23u5Vg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 38094,
    "path": "../public/assets/arjona-icon-Dvvs8trd.webp"
  },
  "/assets/arjona-portada-CugK1Oao.webp": {
    "type": "image/webp",
    "etag": '"11754-H2MvHuA/bDXs4Bx9VqDvsKtTBWc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 71508,
    "path": "../public/assets/arjona-portada-CugK1Oao.webp"
  },
  "/assets/arjona-rojo-BhxTFRpb.webp": {
    "type": "image/webp",
    "etag": '"15f46-cXtsrvoKsI8PDBfr26F48ce5VXk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 89926,
    "path": "../public/assets/arjona-rojo-BhxTFRpb.webp"
  },
  "/assets/arjona-red-B71kw8xR.webp": {
    "type": "image/webp",
    "etag": '"1ee1c-QgyT+zdlY4+h8SoGgCWQK0INPmw"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 126492,
    "path": "../public/assets/arjona-red-B71kw8xR.webp"
  },
  "/assets/arjona-seco-no-dijo-BKAh2-zE.webp": {
    "type": "image/webp",
    "etag": '"3a2c-eWyd9L4OiDseltzNdHOK8TQMvz8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 14892,
    "path": "../public/assets/arjona-seco-no-dijo-BKAh2-zE.webp"
  },
  "/assets/arrow-left-DJioekcX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-/2zzVaA8LElDTRx6y07HYJ4FmL4"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 166,
    "path": "../public/assets/arrow-left-DJioekcX.js"
  },
  "/assets/arrow-right-B2lnV6cz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-1TS05ESuvjtgWkNj9doPZVjvYhA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 166,
    "path": "../public/assets/arrow-right-B2lnV6cz.js"
  },
  "/assets/auth-qmPo8Hly.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d44-NM/Toxi06Fw+lyiTas1+SjNs0YY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 7492,
    "path": "../public/assets/auth-qmPo8Hly.js"
  },
  "/assets/avatar-1-CXprXVf9.webp": {
    "type": "image/webp",
    "etag": '"3420-+wa6FgW4wI9JhCVLa4iqPV6987Y"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 13344,
    "path": "../public/assets/avatar-1-CXprXVf9.webp"
  },
  "/assets/avatar-2-BKNf-tw_.webp": {
    "type": "image/webp",
    "etag": '"438c-qJE7fxIu9emUn1RbaBphFzkb7Io"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 17292,
    "path": "../public/assets/avatar-2-BKNf-tw_.webp"
  },
  "/assets/avatar-3-CLuFTIj-.webp": {
    "type": "image/webp",
    "etag": '"4128-x/wsvFsBqiNFil6urgOurRW446w"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 16680,
    "path": "../public/assets/avatar-3-CLuFTIj-.webp"
  },
  "/assets/avatar-4-CCyLw1Cm.webp": {
    "type": "image/webp",
    "etag": '"274e-5Q9AgMS7ztGn5K3CbTur6PrIEzE"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 10062,
    "path": "../public/assets/avatar-4-CCyLw1Cm.webp"
  },
  "/assets/avatar-5-s13HFJjs.webp": {
    "type": "image/webp",
    "etag": '"2b52-fTuSQfUSw+S67zDYJkSO+1eRkcc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 11090,
    "path": "../public/assets/avatar-5-s13HFJjs.webp"
  },
  "/assets/avatar-6-C65a1eek.webp": {
    "type": "image/webp",
    "etag": '"21d2-Cqhz65iWSkCjpOgrw18pd/uLGdU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 8658,
    "path": "../public/assets/avatar-6-C65a1eek.webp"
  },
  "/assets/avatar-7-Ds9aFDbu.webp": {
    "type": "image/webp",
    "etag": '"24c8-/fX4YIT5oWa6X7MjnwfBHpHBNCk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 9416,
    "path": "../public/assets/avatar-7-Ds9aFDbu.webp"
  },
  "/assets/avatar-8-Cfz4a0AQ.webp": {
    "type": "image/webp",
    "etag": '"4968-vD624rOyJD5CCzhu7FsefNrGSvs"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 18792,
    "path": "../public/assets/avatar-8-Cfz4a0AQ.webp"
  },
  "/assets/bienvenida-DkwYJYdy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-6NKoOtaVKWR6G5banQs9BlqlWF0"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 303,
    "path": "../public/assets/bienvenida-DkwYJYdy.js"
  },
  "/assets/button-YIsf-A8c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4e0-wS/T+iFnEYjj5NPoV10uSxxmmJA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 1248,
    "path": "../public/assets/button-YIsf-A8c.js"
  },
  "/assets/camera-B5W45CWx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-JCi+1g30tfwcMAi+iMgzr3xhOas"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 337,
    "path": "../public/assets/camera-B5W45CWx.js"
  },
  "/assets/cart-Czqtr_Mq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70c-rQN88MTwA3Er2PgzUHVxB1Bm1jY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 1804,
    "path": "../public/assets/cart-Czqtr_Mq.js"
  },
  "/assets/dialog-DakRd4Oj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"917-XSdhDE8l2It8rivOqxrUxemJvLk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 2327,
    "path": "../public/assets/dialog-DakRd4Oj.js"
  },
  "/assets/dillom-icon-BIsXTXT6.webp": {
    "type": "image/webp",
    "etag": '"7a80-BpX8lABd2IgCm3RYGfz63BCipMo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31360,
    "path": "../public/assets/dillom-icon-BIsXTXT6.webp"
  },
  "/assets/disc-3-BWl5b16v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11c-xG6yQIqOb+ignXqpxaSOBWReyM8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 284,
    "path": "../public/assets/disc-3-BWl5b16v.js"
  },
  "/assets/drop-0rMVP9Ys.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9c3-qmGnUDTNiwPgfEPlIToUMSHFSC8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 121283,
    "path": "../public/assets/drop-0rMVP9Ys.js"
  },
  "/assets/drop-logo-2026-Bp3vcWT7.webp": {
    "type": "image/webp",
    "etag": '"5942-3meqGKypjkZ0TYW0OneYo8yFK28"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 22850,
    "path": "../public/assets/drop-logo-2026-Bp3vcWT7.webp"
  },
  "/assets/drop-logo-negativo-B9jxZQB3.webp": {
    "type": "image/webp",
    "etag": '"4698-1x4YIAE5sTHpug9vftjs3Kq80rc"',
    "mtime": "2026-11-06T00:56:33.985Z",
    "size": 18072,
    "path": "../public/assets/drop-logo-negativo-B9jxZQB3.webp"
  },
  "/assets/drop-logo-negativo-BgkkeCk8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"43-AR6fOsqUaDQgmXBuq5F6G15Rf+I"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 67,
    "path": "../public/assets/drop-logo-negativo-BgkkeCk8.js"
  },
  "/assets/drop-photo-18-BcbhGCcH.webp": {
    "type": "image/webp",
    "etag": '"c150-qhVkwVLhlG22YeHuckA0WV1sbt4"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 49488,
    "path": "../public/assets/drop-photo-18-BcbhGCcH.webp"
  },
  "/assets/drop-photo-19-Cy9DStE8.webp": {
    "type": "image/webp",
    "etag": '"3f84-L56FAeJWdVOOc0Ji67qim3D8M9A"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 16260,
    "path": "../public/assets/drop-photo-19-Cy9DStE8.webp"
  },
  "/assets/drop-photo-20-D5o1MeTs.webp": {
    "type": "image/webp",
    "etag": '"b2ea-vlMI/FjCMgTCyVkgtdooCVPM8uE"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 45802,
    "path": "../public/assets/drop-photo-20-D5o1MeTs.webp"
  },
  "/assets/drop-photo-21-BG0KQZRO.webp": {
    "type": "image/webp",
    "etag": '"6144-5IHav7bmh5/jhYqz+/wfY5IAhUk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 24900,
    "path": "../public/assets/drop-photo-21-BG0KQZRO.webp"
  },
  "/assets/drop-photo-22-DRKL6ku2.webp": {
    "type": "image/webp",
    "etag": '"3746-DVf/Un5Pjihm8DS4Y4m9wpcwetY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 14150,
    "path": "../public/assets/drop-photo-22-DRKL6ku2.webp"
  },
  "/assets/drop-photo-23-BPFGaT3j.webp": {
    "type": "image/webp",
    "etag": '"14b56-Lc9/iWmsmys9CHgk2AVkNFML0+k"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 84822,
    "path": "../public/assets/drop-photo-23-BPFGaT3j.webp"
  },
  "/assets/drop-photo-24-CGpJfmrR.webp": {
    "type": "image/webp",
    "etag": '"8dee-okylvPZ/MM/uHPjYICf/mTOoqCc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 36334,
    "path": "../public/assets/drop-photo-24-CGpJfmrR.webp"
  },
  "/assets/drop-photo-25-DSCdohKS.webp": {
    "type": "image/webp",
    "etag": '"6d8a-5Ay8i3H7nqcC2h3UH00PWLAK0Bo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 28042,
    "path": "../public/assets/drop-photo-25-DSCdohKS.webp"
  },
  "/assets/drop-photo-27-Zzx4fp-a.webp": {
    "type": "image/webp",
    "etag": '"8910-Un6kkhvJ0GckqHTiAnGEsLC3PfQ"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 35088,
    "path": "../public/assets/drop-photo-27-Zzx4fp-a.webp"
  },
  "/assets/drop-photo-28-BCpU9Tb2.webp": {
    "type": "image/webp",
    "etag": '"4bb2-m9sf82qJdYTG6cyS7LXJRyUpruA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 19378,
    "path": "../public/assets/drop-photo-28-BCpU9Tb2.webp"
  },
  "/assets/drop-photo-29-gYCg9hXd.webp": {
    "type": "image/webp",
    "etag": '"cd7c-nYsJ33C3+qPCrfQ18zOQgn/018Q"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 52604,
    "path": "../public/assets/drop-photo-29-gYCg9hXd.webp"
  },
  "/assets/drop-photo-30-C_XqFckA.webp": {
    "type": "image/webp",
    "etag": '"9a88-qH3Y2NQjAgQMKmTeWeRyBhA40jQ"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 39560,
    "path": "../public/assets/drop-photo-30-C_XqFckA.webp"
  },
  "/assets/drop-photo-31-BpFihalT.webp": {
    "type": "image/webp",
    "etag": '"5360-0+XMyPWhP/HYAvIu11X9NxHpBfo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 21344,
    "path": "../public/assets/drop-photo-31-BpFihalT.webp"
  },
  "/assets/drop-photo-32-Cat1ixA5.webp": {
    "type": "image/webp",
    "etag": '"5e8c-Kv89hshj4k+GOmLGnJqNC7NvRKM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 24204,
    "path": "../public/assets/drop-photo-32-Cat1ixA5.webp"
  },
  "/assets/drop-photo-33-oNWSxnWe.webp": {
    "type": "image/webp",
    "etag": '"11fc4-ZB7B17KI/Thanvd9CRt0o1jEKJo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 73668,
    "path": "../public/assets/drop-photo-33-oNWSxnWe.webp"
  },
  "/assets/drop-photo-33.png.asset.json-PxktvDVE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7c3b-rA1iYjCq8sAsPnxhm9FtfJDLA94"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31803,
    "path": "../public/assets/drop-photo-33.png.asset.json-PxktvDVE.js"
  },
  "/assets/drop-photo-34-9GVNJ2_G.webp": {
    "type": "image/webp",
    "etag": '"5704-eZjKobum3ewErAcnztphVtYXl8A"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 22276,
    "path": "../public/assets/drop-photo-34-9GVNJ2_G.webp"
  },
  "/assets/drop-photo-35-Cr-_7Xdp.webp": {
    "type": "image/webp",
    "etag": '"17df2-aHsOzBjmnN6SAXLugmING0RBFf4"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 97778,
    "path": "../public/assets/drop-photo-35-Cr-_7Xdp.webp"
  },
  "/assets/drop-photo-36-CSk4aWWU.webp": {
    "type": "image/webp",
    "etag": '"128b6-eLKtzO5YzuKF/pju/5acCGLF5jI"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 75958,
    "path": "../public/assets/drop-photo-36-CSk4aWWU.webp"
  },
  "/assets/drop-photo-37-DkfEksYr.webp": {
    "type": "image/webp",
    "etag": '"36bc-4loaXWUHTGbyC+qWNxuSQwsIa3I"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 14012,
    "path": "../public/assets/drop-photo-37-DkfEksYr.webp"
  },
  "/assets/drops-yncp4NI1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2851-b9Z39Ly0HtQb0iX0LXPFbUOA/5g"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 10321,
    "path": "../public/assets/drops-yncp4NI1.js"
  },
  "/assets/event-crowd-pqXgaj4h.jpg": {
    "type": "image/jpeg",
    "etag": '"9c24-OLv1q1o7V8ympiZm1PTFcL5Spmo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 39972,
    "path": "../public/assets/event-crowd-pqXgaj4h.jpg"
  },
  "/assets/explorar-0ANYRj7s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7a83-SFW9vzGTceGbMWvE0WzWSqbguG8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31363,
    "path": "../public/assets/explorar-0ANYRj7s.js"
  },
  "/assets/explore-data-B7LzKDLn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"272-UW4YlxqWORRn3Lojokrqddy5Zqs"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 626,
    "path": "../public/assets/explore-data-B7LzKDLn.js"
  },
  "/assets/eye-DaQn6szY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f-X8lXMjnzf4pzFVQGFMulwY96x2k"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 639,
    "path": "../public/assets/eye-DaQn6szY.js"
  },
  "/assets/fanatico-single-B5Uzvt3s.webp": {
    "type": "image/webp",
    "etag": '"ca58-kFu8XFb7N5l7xV9/X2dESm1rJEw"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 51800,
    "path": "../public/assets/fanatico-single-B5Uzvt3s.webp"
  },
  "/assets/genero-electronica-B8a_eUSm.webp": {
    "type": "image/webp",
    "etag": '"9080-SsFjtXRX4/XgCfBE//jL5t6O0ac"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 36992,
    "path": "../public/assets/genero-electronica-B8a_eUSm.webp"
  },
  "/assets/genero-hiphop-D7vZiymv.webp": {
    "type": "image/webp",
    "etag": '"3c4c-u025coGY2ezwyBoaJH5cg16Ba6o"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 15436,
    "path": "../public/assets/genero-hiphop-D7vZiymv.webp"
  },
  "/assets/genero-indie-DP0POzat.webp": {
    "type": "image/webp",
    "etag": '"7a8e-s2IZNLG7KQhFru3WYNXnfmdWIto"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31374,
    "path": "../public/assets/genero-indie-DP0POzat.webp"
  },
  "/assets/genero-pop-BVJMgBGv.webp": {
    "type": "image/webp",
    "etag": '"7c8e-9FqsPYDCVdWMFcIm1wvzlvFq0nY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31886,
    "path": "../public/assets/genero-pop-BVJMgBGv.webp"
  },
  "/assets/genero-poppunk-CubSVmka.webp": {
    "type": "image/webp",
    "etag": '"a91e-Fy9agI8zw3akjg8tOKQbpuM8r7c"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 43294,
    "path": "../public/assets/genero-poppunk-CubSVmka.webp"
  },
  "/assets/genero-rnb-Bf36EYQS.webp": {
    "type": "image/webp",
    "etag": '"45e4-gFRmK0vCG/8Kow3zzlmFEV+9u5E"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 17892,
    "path": "../public/assets/genero-rnb-Bf36EYQS.webp"
  },
  "/assets/genero-rock-D6o-bBXb.webp": {
    "type": "image/webp",
    "etag": '"662e-JpZytOW33xYjT9qY4+ARs4x8M74"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 26158,
    "path": "../public/assets/genero-rock-D6o-bBXb.webp"
  },
  "/assets/genero-urbano-DvCEXcVt.webp": {
    "type": "image/webp",
    "etag": '"9be0-1wsf1rPz2USnx6sJduECCluDW9w"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 39904,
    "path": "../public/assets/genero-urbano-DvCEXcVt.webp"
  },
  "/assets/hero-phone-DkNtcsYZ.jpg": {
    "type": "image/jpeg",
    "etag": '"bbc0-AtQo+4hDtFq9XAGNpqhpNoERK84"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 48064,
    "path": "../public/assets/hero-phone-DkNtcsYZ.jpg"
  },
  "/assets/index-B-MaGceJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f13-2P5+SNv1OpzFhecxq+javOrN358"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 3859,
    "path": "../public/assets/index-B-MaGceJ.js"
  },
  "/assets/index-xEXk6-cL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18c-nZaLhWrIBMGKq8rVnLCx3hYNgFE"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 396,
    "path": "../public/assets/index-xEXk6-cL.js"
  },
  "/assets/input-D7mUpMNs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22d-cOhuuUeRqyj5QV2LRFytLx3SbQI"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 557,
    "path": "../public/assets/input-D7mUpMNs.js"
  },
  "/assets/invitado-VjclXsfP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bed-MpqUnVgt4B26CtQ0hCflAwPlqFE"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 3053,
    "path": "../public/assets/invitado-VjclXsfP.js"
  },
  "/assets/lali-10-BRrnY4_S.webp": {
    "type": "image/webp",
    "etag": '"c77c-JJCfxz+t7qm6BynKP3T5lOHROiU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 51068,
    "path": "../public/assets/lali-10-BRrnY4_S.webp"
  },
  "/assets/lali-11-BZtahGB9.webp": {
    "type": "image/webp",
    "etag": '"1575e-n4r27yVqaO5WAsyDTgpVOyH8ggU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 87902,
    "path": "../public/assets/lali-11-BZtahGB9.webp"
  },
  "/assets/lali-12-DfkqJQe6.webp": {
    "type": "image/webp",
    "etag": '"45e6-l5CtNgOr4rJ5QWABrMn0+SXmeJw"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 17894,
    "path": "../public/assets/lali-12-DfkqJQe6.webp"
  },
  "/assets/lali-13-C2j2l3xd.webp": {
    "type": "image/webp",
    "etag": '"48f2-i6nERgE6v11teMVA6hP+wRallmc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 18674,
    "path": "../public/assets/lali-13-C2j2l3xd.webp"
  },
  "/assets/lali-14-C-C8zWHa.webp": {
    "type": "image/webp",
    "etag": '"873c-LWdAwd1cjn2v7x1fe8qKw14rIrQ"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 34620,
    "path": "../public/assets/lali-14-C-C8zWHa.webp"
  },
  "/assets/lali-15-mPkkOyyq.webp": {
    "type": "image/webp",
    "etag": '"d31c-yttf3itFTKwlM62ILC65JjJWCXs"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 54044,
    "path": "../public/assets/lali-15-mPkkOyyq.webp"
  },
  "/assets/index-CdoTf6m6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a92a1-8yaetixbuAZPG54uQG67WHG6YvM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 692897,
    "path": "../public/assets/index-CdoTf6m6.js"
  },
  "/assets/lali-16-B_JvljNH.webp": {
    "type": "image/webp",
    "etag": '"a3d4-aef0ovIVT6GcpFG1amoAzvQmJ+4"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 41940,
    "path": "../public/assets/lali-16-B_JvljNH.webp"
  },
  "/assets/lali-9-BLOG7pKe.webp": {
    "type": "image/webp",
    "etag": '"5f24-+whZF4ijjAFu9o2gR7UYtkJsgtk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 24356,
    "path": "../public/assets/lali-9-BLOG7pKe.webp"
  },
  "/assets/lali-auto-IlawJ0OP.webp": {
    "type": "image/webp",
    "etag": '"79bc-ceSjN/szK6hBo9IDCtUIxV8kjdc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 31164,
    "path": "../public/assets/lali-auto-IlawJ0OP.webp"
  },
  "/assets/lali-icon-hR1FfOow.webp": {
    "type": "image/webp",
    "etag": '"6dfe-c3xYwjUiJMaJPPUzwZS7BpEWGLY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 28158,
    "path": "../public/assets/lali-icon-hR1FfOow.webp"
  },
  "/assets/lali-logo-Cn0h4Q1S.webp": {
    "type": "image/webp",
    "etag": '"312a-iKK55sn8MU9PVW9z7W9ljrMGspc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 12586,
    "path": "../public/assets/lali-logo-Cn0h4Q1S.webp"
  },
  "/assets/lali-phones-CunQ4AL-.webp": {
    "type": "image/webp",
    "etag": '"c856-iGFrbt7pJn89uy9oeuiWSUIOkkI"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 51286,
    "path": "../public/assets/lali-phones-CunQ4AL-.webp"
  },
  "/assets/lnv-icon-BEolBGEv.webp": {
    "type": "image/webp",
    "etag": '"4d9c-jd8OZHtW9lGwhpo0YPCCRHAIm7o"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 19868,
    "path": "../public/assets/lnv-icon-BEolBGEv.webp"
  },
  "/assets/lnv-gira-fk64Qobo.webp": {
    "type": "image/webp",
    "etag": '"8a10-bSsNpN5suFdcTPEgzo1GUN3JIEc"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 35344,
    "path": "../public/assets/lnv-gira-fk64Qobo.webp"
  },
  "/assets/lnv-poster-t95s3els.webp": {
    "type": "image/webp",
    "etag": '"80e0-kZRTvnQWrEku2nxBdWTEaiVSTQk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 32992,
    "path": "../public/assets/lnv-poster-t95s3els.webp"
  },
  "/assets/lnv-traje-BL8Uk-90.webp": {
    "type": "image/webp",
    "etag": '"4ad8-uDj9CL6ao2vlp4e1s1Vc4fsYreI"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 19160,
    "path": "../public/assets/lnv-traje-BL8Uk-90.webp"
  },
  "/assets/lnv-portada-C9XXr7Nn.webp": {
    "type": "image/webp",
    "etag": '"1bfb0-YNBLigxhY7m0XOT/uMX2DGRvmwM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 114608,
    "path": "../public/assets/lnv-portada-C9XXr7Nn.webp"
  },
  "/assets/loader-circle-B7PpsA1G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c-U/RawKSA0ICW60Vi7Zc1PcyZLAs"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 140,
    "path": "../public/assets/loader-circle-B7PpsA1G.js"
  },
  "/assets/maria-icon-CCLZQ-qC.webp": {
    "type": "image/webp",
    "etag": '"3db4-7V1FxMgyk6007tUhHgnXyz+ROCQ"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 15796,
    "path": "../public/assets/maria-icon-CCLZQ-qC.webp"
  },
  "/assets/merch-BWrPeZNV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c9-xYvK1Uucdd+QJCgQW6Tdhooug+s"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 457,
    "path": "../public/assets/merch-BWrPeZNV.js"
  },
  "/assets/mi-drop-Jnqtf9QC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8123-2DvjBIuW7JpKSiH6Mlht89vA65E"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 33059,
    "path": "../public/assets/mi-drop-Jnqtf9QC.js"
  },
  "/assets/onboarding-1-BnjF0pCR.webp": {
    "type": "image/webp",
    "etag": '"c76c-edSYDWOoThR7efDWxxtEV5z/tGo"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 51052,
    "path": "../public/assets/onboarding-1-BnjF0pCR.webp"
  },
  "/assets/onboarding-2-CGWDofjh.webp": {
    "type": "image/webp",
    "etag": '"adf4-KEvYm4YxEasLbUAbQcYH8hEoO7I"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 44532,
    "path": "../public/assets/onboarding-2-CGWDofjh.webp"
  },
  "/assets/onboarding-3-DMGvFSKM.webp": {
    "type": "image/webp",
    "etag": '"16b20-QkB7bLBt/zHmBHk5qXfMUdLUrQ4"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 92960,
    "path": "../public/assets/onboarding-3-DMGvFSKM.webp"
  },
  "/assets/onboarding-4-Bn5pM3qS.webp": {
    "type": "image/webp",
    "etag": '"1736a-ZCFVjRQ15kKsT+xVLaBD8P97aIM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 95082,
    "path": "../public/assets/onboarding-4-Bn5pM3qS.webp"
  },
  "/assets/pc-caras-D_ZMDhEr.webp": {
    "type": "image/webp",
    "etag": '"18004-Mesh9UWjt/hz/8c9EtsFis5tFno"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 98308,
    "path": "../public/assets/pc-caras-D_ZMDhEr.webp"
  },
  "/assets/pc-globos-silla-B4ulUVCe.webp": {
    "type": "image/webp",
    "etag": '"17cac-9gKVpozvHO6WGzce07GRmZaly6M"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 97452,
    "path": "../public/assets/pc-globos-silla-B4ulUVCe.webp"
  },
  "/assets/pc-globos-vuelo-DgCOqIcH.webp": {
    "type": "image/webp",
    "etag": '"9ca8-LrTi0uM4A/gFe45y1GMmJ562gkM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 40104,
    "path": "../public/assets/pc-globos-vuelo-DgCOqIcH.webp"
  },
  "/assets/pc-laboratorio-D6u181IL.webp": {
    "type": "image/webp",
    "etag": '"d40a-oFJ0u0Wirk4aqGVLBEf8o+7YQSg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 54282,
    "path": "../public/assets/pc-laboratorio-D6u181IL.webp"
  },
  "/assets/pencil-CSYz6dyM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-t+dwfivjUJ9ELxIV3ls7KzwWn4c"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 277,
    "path": "../public/assets/pencil-CSYz6dyM.js"
  },
  "/assets/privacidad-BW-T-jLc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8ce-vhejsAsWgDW8kTgFCfdrvGySqHk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 2254,
    "path": "../public/assets/privacidad-BW-T-jLc.js"
  },
  "/assets/progress-C7Tx5adk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"614-e6RyfJRm+tuqM4EvOqwXMOuNxIk"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 1556,
    "path": "../public/assets/progress-C7Tx5adk.js"
  },
  "/assets/qr-street-C1c4M060.jpg": {
    "type": "image/jpeg",
    "etag": '"105d5-6nVSKo5G7VNAxWIwLkYHmV//01w"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 67029,
    "path": "../public/assets/qr-street-C1c4M060.jpg"
  },
  "/assets/reset-password-DUzzEPmA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6d0-bHsp9ILaaQ/9peKgL2K/HqKF1Rg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 1744,
    "path": "../public/assets/reset-password-DUzzEPmA.js"
  },
  "/assets/simbolos-33-B1fpzSeA.webp": {
    "type": "image/webp",
    "etag": '"d716-KzSrDomgYNSO8hK6hWJjEPoF/NU"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 55062,
    "path": "../public/assets/simbolos-33-B1fpzSeA.webp"
  },
  "/assets/spotify-Cv_GboB7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"baa-sD/cr6/p7u7SZ/ElQ7X4CK+rsco"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 2986,
    "path": "../public/assets/spotify-Cv_GboB7.js"
  },
  "/assets/spotify-5x7bxQ8a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"303-UNy6+fsc2Y+tGHspAfKcQj+rViA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 771,
    "path": "../public/assets/spotify-5x7bxQ8a.js"
  },
  "/assets/sticker-nvaa-B32RZAqu.webp": {
    "type": "image/webp",
    "etag": '"bed4-j5KAqWlOrcBMB/RKxNmLDK5+21A"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 48852,
    "path": "../public/assets/sticker-nvaa-B32RZAqu.webp"
  },
  "/assets/ticket-check-D1DBeIyi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-6W5+Y4oCiRXXNSKzVHK9M88IiaM"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 255,
    "path": "../public/assets/ticket-check-D1DBeIyi.js"
  },
  "/assets/tienda-qUFHhocb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7632-+fJN/oxKMxUeLc+g2Rb1TMHkWjY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 30258,
    "path": "../public/assets/tienda-qUFHhocb.js"
  },
  "/assets/stencil-wall-CFz6uIIx.webp": {
    "type": "image/webp",
    "etag": '"13f6a-A+6u9Bb1M7UG5UBR87Fn5oN2OY8"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 81770,
    "path": "../public/assets/stencil-wall-CFz6uIIx.webp"
  },
  "/assets/trash-2-DmD0k65F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b2-KIJmxPPjRI0nfn0rSxL5GOrG0SE"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 434,
    "path": "../public/assets/trash-2-DmD0k65F.js"
  },
  "/assets/user-round-B82HoBPi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b2-2IMhhcNcsG+Cb+rgLO1w9tKD1Qg"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 178,
    "path": "../public/assets/user-round-B82HoBPi.js"
  },
  "/assets/tini-icon-CFGMvhUy.webp": {
    "type": "image/webp",
    "etag": '"5546-Nmit7IuL6ADzQlD1Shw0N90MtdA"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 21830,
    "path": "../public/assets/tini-icon-CFGMvhUy.webp"
  },
  "/assets/styles-CYgwgebe.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1dfea-VOpyq1ZAZBoqPuUQKCI9LOU/IYY"',
    "mtime": "2026-11-06T00:56:33.989Z",
    "size": 122858,
    "path": "../public/assets/styles-CYgwgebe.css"
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
