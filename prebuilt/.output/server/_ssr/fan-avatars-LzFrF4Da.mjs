const url$7 = "/assets/lali-13-C2j2l3xd.webp";
const a13 = { url: url$7 };
const url$6 = "/assets/lali-14-C-C8zWHa.webp";
const a14 = { url: url$6 };
const url$5 = "/assets/lali-16-B_JvljNH.webp";
const a16 = { url: url$5 };
const url$4 = "/assets/drop-photo-20-D5o1MeTs.webp";
const a20 = { url: url$4 };
const url$3 = "/assets/drop-photo-22-DRKL6ku2.webp";
const a22 = { url: url$3 };
const url$2 = "/assets/drop-photo-24-CGpJfmrR.webp";
const a24 = { url: url$2 };
const url$1 = "/assets/drop-photo-25-DSCdohKS.webp";
const a25 = { url: url$1 };
const url = "/assets/sticker-nvaa-B32RZAqu.webp";
const a26 = { url };
const av1 = "/assets/avatar-1-CXprXVf9.webp";
const av2 = "/assets/avatar-2-BKNf-tw_.webp";
const av3 = "/assets/avatar-3-CLuFTIj-.webp";
const av4 = "/assets/avatar-4-CCyLw1Cm.webp";
const av5 = "/assets/avatar-5-s13HFJjs.webp";
const av6 = "/assets/avatar-6-C65a1eek.webp";
const av7 = "/assets/avatar-7-Ds9aFDbu.webp";
const av8 = "/assets/avatar-8-Cfz4a0AQ.webp";
const PHOTOS = {
  news: a13.url,
  estadio: a14.url,
  rain: a16.url,
  worldCup: a20.url,
  veil: a22.url,
  childhood: a24.url,
  teen: a25.url,
  saint: a26.url
};
const POOL = [av1, av2, av3, av4, av5, av6, av7, av8];
function avatarFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return POOL[h % POOL.length];
}
export {
  PHOTOS as P,
  avatarFor as a
};
