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
    "mtime": "2026-11-07T16:55:46.001Z",
    "size": 2322,
    "path": "../public/favicon.png"
  },
  "/icon-192.png": {
    "type": "image/png",
    "etag": '"1d38-GKIjpd8NPwVCZ4kawPOEFETc+9s"',
    "mtime": "2026-11-07T16:55:46.001Z",
    "size": 7480,
    "path": "../public/icon-192.png"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"238-HcWYTtHS+82i1FonIxA1pSCTfKY"',
    "mtime": "2026-11-07T16:55:46.001Z",
    "size": 568,
    "path": "../public/manifest.webmanifest"
  },
  "/assets/ArtistLine-CN1s9M-c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"213-xFjqeBbMC3OBbRvDhDxhLaXLld8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 531,
    "path": "../public/assets/ArtistLine-CN1s9M-c.js"
  },
  "/icon-512.png": {
    "type": "image/png",
    "etag": '"5fb7-nZlA2aAHmftId+qIkrefxfckmAA"',
    "mtime": "2026-11-07T16:55:46.001Z",
    "size": 24503,
    "path": "../public/icon-512.png"
  },
  "/assets/GlobalNav-D1l6fUWR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"66c-Dr8uFvXcalNX2x2Cz2I9Rw++wuc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1644,
    "path": "../public/assets/GlobalNav-D1l6fUWR.js"
  },
  "/assets/ExplorarView-Ci7zATOT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d3e4-6oiikNQJbedx6bBwsF5c+sdfIHQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 54244,
    "path": "../public/assets/ExplorarView-Ci7zATOT.js"
  },
  "/assets/WelcomeView-C2BDUy13.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"839-KHbJqnWR4uaN9AYMqALU6QkU+SY"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 2105,
    "path": "../public/assets/WelcomeView-C2BDUy13.js"
  },
  "/assets/actividad-CIN8pOyX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f75-u48GDLQXGPIVU4udwSo2nqSMMo0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 8053,
    "path": "../public/assets/actividad-CIN8pOyX.js"
  },
  "/assets/MobileShell-DNwfEqxP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1425e-n+6Ow8wDyCe963wF8yXwNA3OIak"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 82526,
    "path": "../public/assets/MobileShell-DNwfEqxP.js"
  },
  "/assets/adela-buzo-AFcpd9QX.webp": {
    "type": "image/webp",
    "etag": '"36de-Sj7ZxMA+/rmsstxBodjvwSGlxzo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 14046,
    "path": "../public/assets/adela-buzo-AFcpd9QX.webp"
  },
  "/assets/adela-auto-BbGs7fuS.webp": {
    "type": "image/webp",
    "etag": '"cdb6-FYJMeE98bWBcDgqzv8k8mKiUfVA"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 52662,
    "path": "../public/assets/adela-auto-BbGs7fuS.webp"
  },
  "/assets/adela-cd-xevgE70x.webp": {
    "type": "image/webp",
    "etag": '"1bc6-JxNhb3ARFZuZOapNkV+oVAvIUPk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 7110,
    "path": "../public/assets/adela-cd-xevgE70x.webp"
  },
  "/assets/adela-estrellas-SK7uR--H.webp": {
    "type": "image/webp",
    "etag": '"2eda0-5OzKFZh0YVupC0ud+dwxm9+xqYQ"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 191904,
    "path": "../public/assets/adela-estrellas-SK7uR--H.webp"
  },
  "/assets/adela-escenario-DxTXmBLs.webp": {
    "type": "image/webp",
    "etag": '"b57a-GyFQ0mnThf+zsS3jJiSiwKurSM0"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 46458,
    "path": "../public/assets/adela-escenario-DxTXmBLs.webp"
  },
  "/assets/adela-glitter-CylVV7z1.webp": {
    "type": "image/webp",
    "etag": '"9cc2-9EZbje2lMhVgmdBUXE9SgafDF5Q"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 40130,
    "path": "../public/assets/adela-glitter-CylVV7z1.webp"
  },
  "/assets/adela-hero-DevqcWpF.webp": {
    "type": "image/webp",
    "etag": '"cc02-rnUWjDLCHHbOx0RY0CTRHTg/W/U"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 52226,
    "path": "../public/assets/adela-hero-DevqcWpF.webp"
  },
  "/assets/adela-lengua-8rUArssC.webp": {
    "type": "image/webp",
    "etag": '"420c-OZ6OMaxv/ImSG60FouwY6wYI6Us"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 16908,
    "path": "../public/assets/adela-lengua-8rUArssC.webp"
  },
  "/assets/adela-grito-BDWR7Oos.webp": {
    "type": "image/webp",
    "etag": '"141aa-WkurikATUDTCxxrosCpHmkyn8Co"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 82346,
    "path": "../public/assets/adela-grito-BDWR7Oos.webp"
  },
  "/assets/adela-icon-5hZPbTcV.webp": {
    "type": "image/webp",
    "etag": '"469a-BjD+IeM3JvgQakiGrsaOZosbAmg"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 18074,
    "path": "../public/assets/adela-icon-5hZPbTcV.webp"
  },
  "/assets/adela-remera-CX0eLs-W.webp": {
    "type": "image/webp",
    "etag": '"1b7e-hjyio+XKf3Rk+T2wWfjfUJbY2fM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 7038,
    "path": "../public/assets/adela-remera-CX0eLs-W.webp"
  },
  "/assets/adela-portada-DTz_iPIl.webp": {
    "type": "image/webp",
    "etag": '"12c50-iun1+enPyCb1HoH3Gy581JZtDWw"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 76880,
    "path": "../public/assets/adela-portada-DTz_iPIl.webp"
  },
  "/assets/adela-vinilo-Cyo7TG1m.webp": {
    "type": "image/webp",
    "etag": '"b1ac-gnodR56+EAoZCK9K/sfbA5Q0De8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 45484,
    "path": "../public/assets/adela-vinilo-Cyo7TG1m.webp"
  },
  "/assets/admin-DzLhynAs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"95fe-M6PxQnTuwBrCWYEWr1DDIyEZ5nU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 38398,
    "path": "../public/assets/admin-DzLhynAs.js"
  },
  "/assets/airbag-banda-CLtSCIDy.webp": {
    "type": "image/webp",
    "etag": '"36632-OQaLlnw0VukghwB6zTh/hVozz9c"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 222770,
    "path": "../public/assets/airbag-banda-CLtSCIDy.webp"
  },
  "/assets/airbag-buzo-BymCMSwi.webp": {
    "type": "image/webp",
    "etag": '"4b7a-P6dezzGNrUSBr7vfsH5Fczv4KrI"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 19322,
    "path": "../public/assets/airbag-buzo-BymCMSwi.webp"
  },
  "/assets/airbag-gorra-Bgxjjj4Y.webp": {
    "type": "image/webp",
    "etag": '"4df2-yaj3WmLTGCjoAZLl/Pxu7fT+VT0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 19954,
    "path": "../public/assets/airbag-gorra-Bgxjjj4Y.webp"
  },
  "/assets/airbag-icon-BBND8sXL.webp": {
    "type": "image/webp",
    "etag": '"b562-dGBuJnNhHBMlYc/blFUV5w9YRH8"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 46434,
    "path": "../public/assets/airbag-icon-BBND8sXL.webp"
  },
  "/assets/airbag-remera-Blp-rQGz.webp": {
    "type": "image/webp",
    "etag": '"aaf6-H+OrjifozIO6a3Q2+orVw509TQQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 43766,
    "path": "../public/assets/airbag-remera-Blp-rQGz.webp"
  },
  "/assets/airbag-portada-VgzPFab_.webp": {
    "type": "image/webp",
    "etag": '"18a14-vGSwXd5H/KTMwTreo/BW9UF1Tdg"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 100884,
    "path": "../public/assets/airbag-portada-VgzPFab_.webp"
  },
  "/assets/airbag-vivo-DQWQ8DcT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"552-DyEOoGZUgvejDe5HvSwIcNcDQsI"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1362,
    "path": "../public/assets/airbag-vivo-DQWQ8DcT.js"
  },
  "/assets/albums-BJs88Ny7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16a9-Jjntjax3g8LJLzQ1ACWcMma0+0E"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 5801,
    "path": "../public/assets/albums-BJs88Ny7.js"
  },
  "/assets/airbag-vivo-cuTt3LXi.webp": {
    "type": "image/webp",
    "etag": '"5ac0-R/hGt4HI+jmOwezueEQr1VwvCmI"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 23232,
    "path": "../public/assets/airbag-vivo-cuTt3LXi.webp"
  },
  "/assets/arjona-icon-Dvvs8trd.webp": {
    "type": "image/webp",
    "etag": '"94ce-47FfD1IVdaWbqsN6pze1p23u5Vg"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 38094,
    "path": "../public/assets/arjona-icon-Dvvs8trd.webp"
  },
  "/assets/album-cover-CSPWEPc-.webp": {
    "type": "image/webp",
    "etag": '"1939c-yH9CPRh/Ecg87h64k/37DVs0O1g"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 103324,
    "path": "../public/assets/album-cover-CSPWEPc-.webp"
  },
  "/assets/arjona-hero-xFYdEfnR.webp": {
    "type": "image/webp",
    "etag": '"150a6-mzstTKsHg0n3oJf04qm9sgpEq6Y"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 86182,
    "path": "../public/assets/arjona-hero-xFYdEfnR.webp"
  },
  "/assets/arjona-portada-CugK1Oao.webp": {
    "type": "image/webp",
    "etag": '"11754-H2MvHuA/bDXs4Bx9VqDvsKtTBWc"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 71508,
    "path": "../public/assets/arjona-portada-CugK1Oao.webp"
  },
  "/assets/arjona-red-B71kw8xR.webp": {
    "type": "image/webp",
    "etag": '"1ee1c-QgyT+zdlY4+h8SoGgCWQK0INPmw"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 126492,
    "path": "../public/assets/arjona-red-B71kw8xR.webp"
  },
  "/assets/arjona-seco-no-dijo-BKAh2-zE.webp": {
    "type": "image/webp",
    "etag": '"3a2c-eWyd9L4OiDseltzNdHOK8TQMvz8"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 14892,
    "path": "../public/assets/arjona-seco-no-dijo-BKAh2-zE.webp"
  },
  "/assets/arjona-rojo-BhxTFRpb.webp": {
    "type": "image/webp",
    "etag": '"15f46-cXtsrvoKsI8PDBfr26F48ce5VXk"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 89926,
    "path": "../public/assets/arjona-rojo-BhxTFRpb.webp"
  },
  "/assets/arjona-tote-B8nYHhyS.webp": {
    "type": "image/webp",
    "etag": '"548e-sHlnfh2PqMHIkL6h8lwkMfF+CHo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 21646,
    "path": "../public/assets/arjona-tote-B8nYHhyS.webp"
  },
  "/assets/arjona-remera-DqfsLEF5.webp": {
    "type": "image/webp",
    "etag": '"5086-NuFuGY06zK2oWUhUl2KOtDzV4YQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 20614,
    "path": "../public/assets/arjona-remera-DqfsLEF5.webp"
  },
  "/assets/arjona-vaso-DCt51Vph.webp": {
    "type": "image/webp",
    "etag": '"8e5e-TVkO+VVSAd4TLpe9m/puXrjQ64k"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 36446,
    "path": "../public/assets/arjona-vaso-DCt51Vph.webp"
  },
  "/assets/arrow-left-xYSKlBme.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-lo6shN3cJci+VQji2lRSpBqhXRo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 166,
    "path": "../public/assets/arrow-left-xYSKlBme.js"
  },
  "/assets/arrow-right-BX6wDozM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-/HI3Cc9U2kXoNn0Q1vtO2AKmrms"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 166,
    "path": "../public/assets/arrow-right-BX6wDozM.js"
  },
  "/assets/auth-CujSoWIo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3600-mLyQAMy9u0HFBYiNFu+PIaSiZ0w"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 13824,
    "path": "../public/assets/auth-CujSoWIo.js"
  },
  "/assets/avatar-1-CXprXVf9.webp": {
    "type": "image/webp",
    "etag": '"3420-+wa6FgW4wI9JhCVLa4iqPV6987Y"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 13344,
    "path": "../public/assets/avatar-1-CXprXVf9.webp"
  },
  "/assets/avatar-2-BKNf-tw_.webp": {
    "type": "image/webp",
    "etag": '"438c-qJE7fxIu9emUn1RbaBphFzkb7Io"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 17292,
    "path": "../public/assets/avatar-2-BKNf-tw_.webp"
  },
  "/assets/avatar-3-CLuFTIj-.webp": {
    "type": "image/webp",
    "etag": '"4128-x/wsvFsBqiNFil6urgOurRW446w"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 16680,
    "path": "../public/assets/avatar-3-CLuFTIj-.webp"
  },
  "/assets/avatar-4-CCyLw1Cm.webp": {
    "type": "image/webp",
    "etag": '"274e-5Q9AgMS7ztGn5K3CbTur6PrIEzE"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 10062,
    "path": "../public/assets/avatar-4-CCyLw1Cm.webp"
  },
  "/assets/avatar-5-s13HFJjs.webp": {
    "type": "image/webp",
    "etag": '"2b52-fTuSQfUSw+S67zDYJkSO+1eRkcc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 11090,
    "path": "../public/assets/avatar-5-s13HFJjs.webp"
  },
  "/assets/avatar-6-C65a1eek.webp": {
    "type": "image/webp",
    "etag": '"21d2-Cqhz65iWSkCjpOgrw18pd/uLGdU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 8658,
    "path": "../public/assets/avatar-6-C65a1eek.webp"
  },
  "/assets/avatar-7-Ds9aFDbu.webp": {
    "type": "image/webp",
    "etag": '"24c8-/fX4YIT5oWa6X7MjnwfBHpHBNCk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 9416,
    "path": "../public/assets/avatar-7-Ds9aFDbu.webp"
  },
  "/assets/avatar-8-Cfz4a0AQ.webp": {
    "type": "image/webp",
    "etag": '"4968-vD624rOyJD5CCzhu7FsefNrGSvs"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 18792,
    "path": "../public/assets/avatar-8-Cfz4a0AQ.webp"
  },
  "/assets/bienvenida-Cp989lUQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-UKqrbwvMcc7C5PPRM9agla7e+EU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 303,
    "path": "../public/assets/bienvenida-Cp989lUQ.js"
  },
  "/assets/cart-aW8-vodG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"908-BdGWLYxULCalAxl8gpHExTis/GU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 2312,
    "path": "../public/assets/cart-aW8-vodG.js"
  },
  "/assets/button-BnlgPfTb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4e0-vb8T2q79rK3HrwhpqxMCyEN+t0k"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1248,
    "path": "../public/assets/button-BnlgPfTb.js"
  },
  "/assets/camera-dswLUBR3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-XWZDGCAjqP4iUTJpFpwmjBuLFB8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 337,
    "path": "../public/assets/camera-dswLUBR3.js"
  },
  "/assets/chart-column-38QOSYws.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-Qe3OEJ4q/teDHIw/UdASAvkWgl0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 252,
    "path": "../public/assets/chart-column-38QOSYws.js"
  },
  "/assets/dialog-ql6aTUUj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7c5-Tf+OrKq3GtBdW2ieS5itV3ROR+k"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1989,
    "path": "../public/assets/dialog-ql6aTUUj.js"
  },
  "/assets/dillom-icon-BIsXTXT6.webp": {
    "type": "image/webp",
    "etag": '"7a80-BpX8lABd2IgCm3RYGfz63BCipMo"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 31360,
    "path": "../public/assets/dillom-icon-BIsXTXT6.webp"
  },
  "/assets/disc-3-ICjiROSy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11c-hlm9QxR61t8Oeu3eKniU8m6IwWc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 284,
    "path": "../public/assets/disc-3-ICjiROSy.js"
  },
  "/assets/drop-logo-2026-Bp3vcWT7.webp": {
    "type": "image/webp",
    "etag": '"5942-3meqGKypjkZ0TYW0OneYo8yFK28"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 22850,
    "path": "../public/assets/drop-logo-2026-Bp3vcWT7.webp"
  },
  "/assets/drop-logo-negativo-B9jxZQB3.webp": {
    "type": "image/webp",
    "etag": '"4698-1x4YIAE5sTHpug9vftjs3Kq80rc"',
    "mtime": "2026-11-07T16:55:43.895Z",
    "size": 18072,
    "path": "../public/assets/drop-logo-negativo-B9jxZQB3.webp"
  },
  "/assets/drop-B6qMNxVr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a444-ffdqY9QjMAUqRQWKcSj6WeB9Vsk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 107588,
    "path": "../public/assets/drop-B6qMNxVr.js"
  },
  "/assets/drop-logo-oficial-ZaoSBBWC.webp": {
    "type": "image/webp",
    "etag": '"4de2-Kp1X78LccN2x8pZVqo0E3Y3ZOTA"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 19938,
    "path": "../public/assets/drop-logo-oficial-ZaoSBBWC.webp"
  },
  "/assets/drop-photo-18-BcbhGCcH.webp": {
    "type": "image/webp",
    "etag": '"c150-qhVkwVLhlG22YeHuckA0WV1sbt4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 49488,
    "path": "../public/assets/drop-photo-18-BcbhGCcH.webp"
  },
  "/assets/drop-photo-19-Cy9DStE8.webp": {
    "type": "image/webp",
    "etag": '"3f84-L56FAeJWdVOOc0Ji67qim3D8M9A"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 16260,
    "path": "../public/assets/drop-photo-19-Cy9DStE8.webp"
  },
  "/assets/drop-photo-20-D5o1MeTs.webp": {
    "type": "image/webp",
    "etag": '"b2ea-vlMI/FjCMgTCyVkgtdooCVPM8uE"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 45802,
    "path": "../public/assets/drop-photo-20-D5o1MeTs.webp"
  },
  "/assets/drop-logo-negativo-BgkkeCk8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"43-AR6fOsqUaDQgmXBuq5F6G15Rf+I"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 67,
    "path": "../public/assets/drop-logo-negativo-BgkkeCk8.js"
  },
  "/assets/drop-photo-21-BG0KQZRO.webp": {
    "type": "image/webp",
    "etag": '"6144-5IHav7bmh5/jhYqz+/wfY5IAhUk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 24900,
    "path": "../public/assets/drop-photo-21-BG0KQZRO.webp"
  },
  "/assets/drop-photo-22-DRKL6ku2.webp": {
    "type": "image/webp",
    "etag": '"3746-DVf/Un5Pjihm8DS4Y4m9wpcwetY"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 14150,
    "path": "../public/assets/drop-photo-22-DRKL6ku2.webp"
  },
  "/assets/drop-photo-23-BPFGaT3j.webp": {
    "type": "image/webp",
    "etag": '"14b56-Lc9/iWmsmys9CHgk2AVkNFML0+k"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 84822,
    "path": "../public/assets/drop-photo-23-BPFGaT3j.webp"
  },
  "/assets/drop-photo-24-CGpJfmrR.webp": {
    "type": "image/webp",
    "etag": '"8dee-okylvPZ/MM/uHPjYICf/mTOoqCc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 36334,
    "path": "../public/assets/drop-photo-24-CGpJfmrR.webp"
  },
  "/assets/drop-photo-25-DSCdohKS.webp": {
    "type": "image/webp",
    "etag": '"6d8a-5Ay8i3H7nqcC2h3UH00PWLAK0Bo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 28042,
    "path": "../public/assets/drop-photo-25-DSCdohKS.webp"
  },
  "/assets/drop-photo-27-Zzx4fp-a.webp": {
    "type": "image/webp",
    "etag": '"8910-Un6kkhvJ0GckqHTiAnGEsLC3PfQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 35088,
    "path": "../public/assets/drop-photo-27-Zzx4fp-a.webp"
  },
  "/assets/drop-photo-28-BCpU9Tb2.webp": {
    "type": "image/webp",
    "etag": '"4bb2-m9sf82qJdYTG6cyS7LXJRyUpruA"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 19378,
    "path": "../public/assets/drop-photo-28-BCpU9Tb2.webp"
  },
  "/assets/drop-photo-29-gYCg9hXd.webp": {
    "type": "image/webp",
    "etag": '"cd7c-nYsJ33C3+qPCrfQ18zOQgn/018Q"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 52604,
    "path": "../public/assets/drop-photo-29-gYCg9hXd.webp"
  },
  "/assets/drop-photo-30-C_XqFckA.webp": {
    "type": "image/webp",
    "etag": '"9a88-qH3Y2NQjAgQMKmTeWeRyBhA40jQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 39560,
    "path": "../public/assets/drop-photo-30-C_XqFckA.webp"
  },
  "/assets/drop-photo-31-BpFihalT.webp": {
    "type": "image/webp",
    "etag": '"5360-0+XMyPWhP/HYAvIu11X9NxHpBfo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 21344,
    "path": "../public/assets/drop-photo-31-BpFihalT.webp"
  },
  "/assets/drop-photo-33-oNWSxnWe.webp": {
    "type": "image/webp",
    "etag": '"11fc4-ZB7B17KI/Thanvd9CRt0o1jEKJo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 73668,
    "path": "../public/assets/drop-photo-33-oNWSxnWe.webp"
  },
  "/assets/drop-photo-34-9GVNJ2_G.webp": {
    "type": "image/webp",
    "etag": '"5704-eZjKobum3ewErAcnztphVtYXl8A"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 22276,
    "path": "../public/assets/drop-photo-34-9GVNJ2_G.webp"
  },
  "/assets/drop-photo-35-Cr-_7Xdp.webp": {
    "type": "image/webp",
    "etag": '"17df2-aHsOzBjmnN6SAXLugmING0RBFf4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 97778,
    "path": "../public/assets/drop-photo-35-Cr-_7Xdp.webp"
  },
  "/assets/drop-photo-36-CSk4aWWU.webp": {
    "type": "image/webp",
    "etag": '"128b6-eLKtzO5YzuKF/pju/5acCGLF5jI"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 75958,
    "path": "../public/assets/drop-photo-36-CSk4aWWU.webp"
  },
  "/assets/drop-photo-37-DkfEksYr.webp": {
    "type": "image/webp",
    "etag": '"36bc-4loaXWUHTGbyC+qWNxuSQwsIa3I"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 14012,
    "path": "../public/assets/drop-photo-37-DkfEksYr.webp"
  },
  "/assets/drops-BxgaIuU5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3708-uAhqU5oxqZBHQ6rOYUcRo9GAZeQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 14088,
    "path": "../public/assets/drops-BxgaIuU5.js"
  },
  "/assets/event-crowd-pqXgaj4h.jpg": {
    "type": "image/jpeg",
    "etag": '"9c24-OLv1q1o7V8ympiZm1PTFcL5Spmo"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 39972,
    "path": "../public/assets/event-crowd-pqXgaj4h.jpg"
  },
  "/assets/explorar-C9EZoWdr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1512-7fBcItImfrx/YK1ul9gmrqfXdBw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 5394,
    "path": "../public/assets/explorar-C9EZoWdr.js"
  },
  "/assets/eye-BuvwTpV4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27f-6sqFqiQrS5ndVYAoCCRQybYQBOA"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 639,
    "path": "../public/assets/eye-BuvwTpV4.js"
  },
  "/assets/fanatico-single-B5Uzvt3s.webp": {
    "type": "image/webp",
    "etag": '"ca58-kFu8XFb7N5l7xV9/X2dESm1rJEw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 51800,
    "path": "../public/assets/fanatico-single-B5Uzvt3s.webp"
  },
  "/assets/genero-electronica-B8a_eUSm.webp": {
    "type": "image/webp",
    "etag": '"9080-SsFjtXRX4/XgCfBE//jL5t6O0ac"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 36992,
    "path": "../public/assets/genero-electronica-B8a_eUSm.webp"
  },
  "/assets/genero-hiphop-D7vZiymv.webp": {
    "type": "image/webp",
    "etag": '"3c4c-u025coGY2ezwyBoaJH5cg16Ba6o"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 15436,
    "path": "../public/assets/genero-hiphop-D7vZiymv.webp"
  },
  "/assets/genero-indie-DP0POzat.webp": {
    "type": "image/webp",
    "etag": '"7a8e-s2IZNLG7KQhFru3WYNXnfmdWIto"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 31374,
    "path": "../public/assets/genero-indie-DP0POzat.webp"
  },
  "/assets/genero-pop-BVJMgBGv.webp": {
    "type": "image/webp",
    "etag": '"7c8e-9FqsPYDCVdWMFcIm1wvzlvFq0nY"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 31886,
    "path": "../public/assets/genero-pop-BVJMgBGv.webp"
  },
  "/assets/genero-poppunk-CubSVmka.webp": {
    "type": "image/webp",
    "etag": '"a91e-Fy9agI8zw3akjg8tOKQbpuM8r7c"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 43294,
    "path": "../public/assets/genero-poppunk-CubSVmka.webp"
  },
  "/assets/genero-rnb-Bf36EYQS.webp": {
    "type": "image/webp",
    "etag": '"45e4-gFRmK0vCG/8Kow3zzlmFEV+9u5E"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 17892,
    "path": "../public/assets/genero-rnb-Bf36EYQS.webp"
  },
  "/assets/genero-rock-D6o-bBXb.webp": {
    "type": "image/webp",
    "etag": '"662e-JpZytOW33xYjT9qY4+ARs4x8M74"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 26158,
    "path": "../public/assets/genero-rock-D6o-bBXb.webp"
  },
  "/assets/genero-urbano-DvCEXcVt.webp": {
    "type": "image/webp",
    "etag": '"9be0-1wsf1rPz2USnx6sJduECCluDW9w"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 39904,
    "path": "../public/assets/genero-urbano-DvCEXcVt.webp"
  },
  "/assets/hero-phone-DkNtcsYZ.jpg": {
    "type": "image/jpeg",
    "etag": '"bbc0-AtQo+4hDtFq9XAGNpqhpNoERK84"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 48064,
    "path": "../public/assets/hero-phone-DkNtcsYZ.jpg"
  },
  "/assets/index-BlAybJT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18c-e9SF+m68JPdknvL4VjLOmjZIHAM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 396,
    "path": "../public/assets/index-BlAybJT8.js"
  },
  "/assets/index-DXk5MT2D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f13-u5K3qNXaj8iop8/TVgGnySkQte0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 3859,
    "path": "../public/assets/index-DXk5MT2D.js"
  },
  "/assets/index-Dh3KQf_d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ea3-UPcSogu2Nd3eTeHoDD1gg0wSzyk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 7843,
    "path": "../public/assets/index-Dh3KQf_d.js"
  },
  "/assets/invitado-BefZ9YTn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bed-HxX1ALdh/BNbkwjuGKmrRKOtFf8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 3053,
    "path": "../public/assets/invitado-BefZ9YTn.js"
  },
  "/assets/lali-10-BRrnY4_S.webp": {
    "type": "image/webp",
    "etag": '"c77c-JJCfxz+t7qm6BynKP3T5lOHROiU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 51068,
    "path": "../public/assets/lali-10-BRrnY4_S.webp"
  },
  "/assets/lali-13-C2j2l3xd.webp": {
    "type": "image/webp",
    "etag": '"48f2-i6nERgE6v11teMVA6hP+wRallmc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 18674,
    "path": "../public/assets/lali-13-C2j2l3xd.webp"
  },
  "/assets/lali-11-BZtahGB9.webp": {
    "type": "image/webp",
    "etag": '"1575e-n4r27yVqaO5WAsyDTgpVOyH8ggU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 87902,
    "path": "../public/assets/lali-11-BZtahGB9.webp"
  },
  "/assets/lali-14-C-C8zWHa.webp": {
    "type": "image/webp",
    "etag": '"873c-LWdAwd1cjn2v7x1fe8qKw14rIrQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 34620,
    "path": "../public/assets/lali-14-C-C8zWHa.webp"
  },
  "/assets/lali-12-DfkqJQe6.webp": {
    "type": "image/webp",
    "etag": '"45e6-l5CtNgOr4rJ5QWABrMn0+SXmeJw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 17894,
    "path": "../public/assets/lali-12-DfkqJQe6.webp"
  },
  "/assets/lali-15-mPkkOyyq.webp": {
    "type": "image/webp",
    "etag": '"d31c-yttf3itFTKwlM62ILC65JjJWCXs"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 54044,
    "path": "../public/assets/lali-15-mPkkOyyq.webp"
  },
  "/assets/lali-9-BLOG7pKe.webp": {
    "type": "image/webp",
    "etag": '"5f24-+whZF4ijjAFu9o2gR7UYtkJsgtk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 24356,
    "path": "../public/assets/lali-9-BLOG7pKe.webp"
  },
  "/assets/lali-16-B_JvljNH.webp": {
    "type": "image/webp",
    "etag": '"a3d4-aef0ovIVT6GcpFG1amoAzvQmJ+4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 41940,
    "path": "../public/assets/lali-16-B_JvljNH.webp"
  },
  "/assets/lali-auto-IlawJ0OP.webp": {
    "type": "image/webp",
    "etag": '"79bc-ceSjN/szK6hBo9IDCtUIxV8kjdc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 31164,
    "path": "../public/assets/lali-auto-IlawJ0OP.webp"
  },
  "/assets/lali-camiseta-33-CzLG5Fse.webp": {
    "type": "image/webp",
    "etag": '"6f9e-KSzgdv/F4A+3m93dkRz3cyacdUU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 28574,
    "path": "../public/assets/lali-camiseta-33-CzLG5Fse.webp"
  },
  "/assets/lali-icon-hR1FfOow.webp": {
    "type": "image/webp",
    "etag": '"6dfe-c3xYwjUiJMaJPPUzwZS7BpEWGLY"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 28158,
    "path": "../public/assets/lali-icon-hR1FfOow.webp"
  },
  "/assets/lali-kit-llamada-DO_-bsb4.webp": {
    "type": "image/webp",
    "etag": '"bd1a-bkrimjLysVWKq994jU+RpRPP5LQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 48410,
    "path": "../public/assets/lali-kit-llamada-DO_-bsb4.webp"
  },
  "/assets/lali-logo-Cn0h4Q1S.webp": {
    "type": "image/webp",
    "etag": '"312a-iKK55sn8MU9PVW9z7W9ljrMGspc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 12586,
    "path": "../public/assets/lali-logo-Cn0h4Q1S.webp"
  },
  "/assets/lali-phones-CunQ4AL-.webp": {
    "type": "image/webp",
    "etag": '"c856-iGFrbt7pJn89uy9oeuiWSUIOkkI"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 51286,
    "path": "../public/assets/lali-phones-CunQ4AL-.webp"
  },
  "/assets/lnv-gira-fk64Qobo.webp": {
    "type": "image/webp",
    "etag": '"8a10-bSsNpN5suFdcTPEgzo1GUN3JIEc"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 35344,
    "path": "../public/assets/lnv-gira-fk64Qobo.webp"
  },
  "/assets/lali-remera-diva--X_1gUA6.webp": {
    "type": "image/webp",
    "etag": '"76ac-X8AxWAOagQ8AUSU1+hy0cVx4unM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 30380,
    "path": "../public/assets/lali-remera-diva--X_1gUA6.webp"
  },
  "/assets/lnv-icon-BEolBGEv.webp": {
    "type": "image/webp",
    "etag": '"4d9c-jd8OZHtW9lGwhpo0YPCCRHAIm7o"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 19868,
    "path": "../public/assets/lnv-icon-BEolBGEv.webp"
  },
  "/assets/lali-vinilo-C_2oNFkK.webp": {
    "type": "image/webp",
    "etag": '"560c-d9/6KyBjt2/uwx9RjWW/5E7+/Zg"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 22028,
    "path": "../public/assets/lali-vinilo-C_2oNFkK.webp"
  },
  "/assets/lnv-portada-C9XXr7Nn.webp": {
    "type": "image/webp",
    "etag": '"1bfb0-YNBLigxhY7m0XOT/uMX2DGRvmwM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 114608,
    "path": "../public/assets/lnv-portada-C9XXr7Nn.webp"
  },
  "/assets/lnv-poster-t95s3els.webp": {
    "type": "image/webp",
    "etag": '"80e0-kZRTvnQWrEku2nxBdWTEaiVSTQk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 32992,
    "path": "../public/assets/lnv-poster-t95s3els.webp"
  },
  "/assets/lnv-remera-DI08IU79.webp": {
    "type": "image/webp",
    "etag": '"3fe2-XSAKV3H3d6qV0JM1OYwX2oz1ix8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 16354,
    "path": "../public/assets/lnv-remera-DI08IU79.webp"
  },
  "/assets/index-DrpVYa07.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a975d-oz2GBuKFZukejSX/jvA8P169M3k"',
    "mtime": "2026-11-07T16:55:43.905Z",
    "size": 694109,
    "path": "../public/assets/index-DrpVYa07.js"
  },
  "/assets/loader-circle-Cd0aj_74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c-bSVr5WkvD2LgxIacLSLP0cWJ7/4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 140,
    "path": "../public/assets/loader-circle-Cd0aj_74.js"
  },
  "/assets/lnv-traje-BL8Uk-90.webp": {
    "type": "image/webp",
    "etag": '"4ad8-uDj9CL6ao2vlp4e1s1Vc4fsYreI"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 19160,
    "path": "../public/assets/lnv-traje-BL8Uk-90.webp"
  },
  "/assets/maria-gorra-DX2TeaE9.webp": {
    "type": "image/webp",
    "etag": '"262e-/MwLzoPbG2VB9ECKxgZhF35MHwY"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 9774,
    "path": "../public/assets/maria-gorra-DX2TeaE9.webp"
  },
  "/assets/map-pin-DSt_F2Kk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-zSev+kfBUuXpbWezwVs505hwZ6s"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 255,
    "path": "../public/assets/map-pin-DSt_F2Kk.js"
  },
  "/assets/maria-abanico-esvINML2.webp": {
    "type": "image/webp",
    "etag": '"4238-l5MnkwBQ9hbpj3biqJnnpXoqvWM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 16952,
    "path": "../public/assets/maria-abanico-esvINML2.webp"
  },
  "/assets/maria-icon-CCLZQ-qC.webp": {
    "type": "image/webp",
    "etag": '"3db4-7V1FxMgyk6007tUhHgnXyz+ROCQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 15796,
    "path": "../public/assets/maria-icon-CCLZQ-qC.webp"
  },
  "/assets/maria-remera-DpA84vLK.webp": {
    "type": "image/webp",
    "etag": '"9128-ZuSiMNMr+bdi1eG7i0mynlfOj10"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 37160,
    "path": "../public/assets/maria-remera-DpA84vLK.webp"
  },
  "/assets/merch-BFLKLObl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"177-O/UJSYIxGbJ8/hN7quxUjbTdveo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 375,
    "path": "../public/assets/merch-BFLKLObl.js"
  },
  "/assets/mi-drop-DcopE-zr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c5b7-zzrlJb+L5t5Uy3evY1aDxQDhgPE"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 50615,
    "path": "../public/assets/mi-drop-DcopE-zr.js"
  },
  "/assets/music-1oP5InCT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d7-s51wojNi9oRAiecEV/vLDcGYWM0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 215,
    "path": "../public/assets/music-1oP5InCT.js"
  },
  "/assets/music.functions-Dq2W9PgC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"35d-FxJFJBrctsWc6eAoEjRZashM3+E"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 861,
    "path": "../public/assets/music.functions-Dq2W9PgC.js"
  },
  "/assets/onboarding-1-BnjF0pCR.webp": {
    "type": "image/webp",
    "etag": '"c76c-edSYDWOoThR7efDWxxtEV5z/tGo"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 51052,
    "path": "../public/assets/onboarding-1-BnjF0pCR.webp"
  },
  "/assets/onboarding-2-CGWDofjh.webp": {
    "type": "image/webp",
    "etag": '"adf4-KEvYm4YxEasLbUAbQcYH8hEoO7I"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 44532,
    "path": "../public/assets/onboarding-2-CGWDofjh.webp"
  },
  "/assets/onboarding-3-DMGvFSKM.webp": {
    "type": "image/webp",
    "etag": '"16b20-QkB7bLBt/zHmBHk5qXfMUdLUrQ4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 92960,
    "path": "../public/assets/onboarding-3-DMGvFSKM.webp"
  },
  "/assets/onboarding-4-Bn5pM3qS.webp": {
    "type": "image/webp",
    "etag": '"1736a-ZCFVjRQ15kKsT+xVLaBD8P97aIM"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 95082,
    "path": "../public/assets/onboarding-4-Bn5pM3qS.webp"
  },
  "/assets/pc-caras-D_ZMDhEr.webp": {
    "type": "image/webp",
    "etag": '"18004-Mesh9UWjt/hz/8c9EtsFis5tFno"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 98308,
    "path": "../public/assets/pc-caras-D_ZMDhEr.webp"
  },
  "/assets/pc-globos-vuelo-DgCOqIcH.webp": {
    "type": "image/webp",
    "etag": '"9ca8-LrTi0uM4A/gFe45y1GMmJ562gkM"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 40104,
    "path": "../public/assets/pc-globos-vuelo-DgCOqIcH.webp"
  },
  "/assets/pc-laboratorio-D6u181IL.webp": {
    "type": "image/webp",
    "etag": '"d40a-oFJ0u0Wirk4aqGVLBEf8o+7YQSg"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 54282,
    "path": "../public/assets/pc-laboratorio-D6u181IL.webp"
  },
  "/assets/pc-vinilo-DQrK552M.webp": {
    "type": "image/webp",
    "etag": '"1b6c-Bzce7DEz3SNS2BRRNyd90UyxnMs"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 7020,
    "path": "../public/assets/pc-vinilo-DQrK552M.webp"
  },
  "/assets/pencil-BieNgeNH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"115-L2HnUHTG0lIgwWqPYWDi6U4a7hY"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 277,
    "path": "../public/assets/pencil-BieNgeNH.js"
  },
  "/assets/plus-BTnNDV5N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-UJDsZv6iNU7cJS/uuOcNtdYzPFc"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 154,
    "path": "../public/assets/plus-BTnNDV5N.js"
  },
  "/assets/pc-globos-silla-B4ulUVCe.webp": {
    "type": "image/webp",
    "etag": '"17cac-9gKVpozvHO6WGzce07GRmZaly6M"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 97452,
    "path": "../public/assets/pc-globos-silla-B4ulUVCe.webp"
  },
  "/assets/privacidad-Ch4fdGiq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8d0-FuEgiWQNfbDDalgfAImsJlUfmnw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 2256,
    "path": "../public/assets/privacidad-Ch4fdGiq.js"
  },
  "/assets/progress-CGtrPnER.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70f-iSUPxfqObRBuJ5i3yLsmWoxsCkw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1807,
    "path": "../public/assets/progress-CGtrPnER.js"
  },
  "/assets/qr-street-C1c4M060.jpg": {
    "type": "image/jpeg",
    "etag": '"105d5-6nVSKo5G7VNAxWIwLkYHmV//01w"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 67029,
    "path": "../public/assets/qr-street-C1c4M060.jpg"
  },
  "/assets/resenas-Du2GKhbL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b7-BKsUlAwfDQO7NoFCHnwoslntObA"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 951,
    "path": "../public/assets/resenas-Du2GKhbL.js"
  },
  "/assets/reset-password-BtJDkrNZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6d0-KYPToslfbMUAcLMRMcgtS9Vena0"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 1744,
    "path": "../public/assets/reset-password-BtJDkrNZ.js"
  },
  "/assets/simbolos-33-B1fpzSeA.webp": {
    "type": "image/webp",
    "etag": '"d716-KzSrDomgYNSO8hK6hWJjEPoF/NU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 55062,
    "path": "../public/assets/simbolos-33-B1fpzSeA.webp"
  },
  "/assets/spotify-CfafehN_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"303-emWXAmspKWHeVhYNhW5I4b0m4dQ"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 771,
    "path": "../public/assets/spotify-CfafehN_.js"
  },
  "/assets/share-2-BagnOtBO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"161-XEc1oS+CTwMnbVXAcNPBe2GHGpU"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 353,
    "path": "../public/assets/share-2-BagnOtBO.js"
  },
  "/assets/spotify-YgCJf6Z2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a9-HpZ1Koq5GmriG03qppgjHs824Yk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 4265,
    "path": "../public/assets/spotify-YgCJf6Z2.js"
  },
  "/assets/star-BhteQms-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"293-xaR8oTMkSXtEvhCG0vlc/jF4wwk"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 659,
    "path": "../public/assets/star-BhteQms-.js"
  },
  "/assets/stencil-wall-CFz6uIIx.webp": {
    "type": "image/webp",
    "etag": '"13f6a-A+6u9Bb1M7UG5UBR87Fn5oN2OY8"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 81770,
    "path": "../public/assets/stencil-wall-CFz6uIIx.webp"
  },
  "/assets/terminos-DhkOtXGd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e17-sD/djKErVvn9G88LOwOVWBx0JXg"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 3607,
    "path": "../public/assets/terminos-DhkOtXGd.js"
  },
  "/assets/styles-e2OMDKPn.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1e83b-klVXXC//wUX9+SkcZ7hMWizmkI4"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 124987,
    "path": "../public/assets/styles-e2OMDKPn.css"
  },
  "/assets/sticker-nvaa-B32RZAqu.webp": {
    "type": "image/webp",
    "etag": '"bed4-j5KAqWlOrcBMB/RKxNmLDK5+21A"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 48852,
    "path": "../public/assets/sticker-nvaa-B32RZAqu.webp"
  },
  "/assets/tienda-DSQVTiaz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"771c-FwvUthVeNP5UfBoSwYhyZ70k4so"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 30492,
    "path": "../public/assets/tienda-DSQVTiaz.js"
  },
  "/assets/tini-icon-CFGMvhUy.webp": {
    "type": "image/webp",
    "etag": '"5546-Nmit7IuL6ADzQlD1Shw0N90MtdA"',
    "mtime": "2026-11-07T16:55:43.897Z",
    "size": 21830,
    "path": "../public/assets/tini-icon-CFGMvhUy.webp"
  },
  "/assets/trending-up-OKdtUxQ0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"166-ekYBGf45eHX7ELqYHPIPui/0EDE"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 358,
    "path": "../public/assets/trending-up-OKdtUxQ0.js"
  },
  "/assets/user-round-Bq4DjzE-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b2-dXMIu+Q+IeSB8Qn9R3xx0Jxhuqw"',
    "mtime": "2026-11-07T16:55:43.901Z",
    "size": 178,
    "path": "../public/assets/user-round-Bq4DjzE-.js"
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
const _lazy_yyHRpL = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_yyHRpL };
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
