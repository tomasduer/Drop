import a9 from "@/assets/lali-9.png.asset.json";
import a10 from "@/assets/lali-10.png.asset.json";
import a11 from "@/assets/lali-11.png.asset.json";
import a12 from "@/assets/lali-12.png.asset.json";
import a13 from "@/assets/lali-13.png.asset.json";
import a14 from "@/assets/lali-14.png.asset.json";
import a15 from "@/assets/lali-15.png.asset.json";
import a16 from "@/assets/lali-16.png.asset.json";
import a20 from "@/assets/drop-photo-20.png.asset.json";
import a21 from "@/assets/drop-photo-21.png.asset.json";
import a22 from "@/assets/drop-photo-22.png.asset.json";
import a23 from "@/assets/drop-photo-23.png.asset.json";
import a24 from "@/assets/drop-photo-24.png.asset.json";
import a25 from "@/assets/drop-photo-25.png.asset.json";
import a26 from "@/assets/drop-photo-26.png.asset.json";
import a27 from "@/assets/drop-photo-27.png.asset.json";
import av1 from "@/assets/avatares/avatar-1.webp";
import av2 from "@/assets/avatares/avatar-2.webp";
import av3 from "@/assets/avatares/avatar-3.webp";
import av4 from "@/assets/avatares/avatar-4.webp";
import av5 from "@/assets/avatares/avatar-5.webp";
import av6 from "@/assets/avatares/avatar-6.webp";
import av7 from "@/assets/avatares/avatar-7.webp";
import av8 from "@/assets/avatares/avatar-8.webp";

export const PHOTOS = {
  stage: a9.url,
  fur: a10.url,
  leather: a11.url,
  desk: a12.url,
  news: a13.url,
  estadio: a14.url,
  car: a15.url,
  rain: a16.url,
  worldCup: a20.url,
  argentina: a21.url,
  veil: a22.url,
  fans: a23.url,
  childhood: a24.url,
  teen: a25.url,
  saint: a26.url,
  pop: a27.url,
};

/** Casual LALI photos used as user avatars (square, 256px). */
const POOL = [av1, av2, av3, av4, av5, av6, av7, av8];

/** Deterministic avatar for a username. */
export function avatarFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return POOL[h % POOL.length];
}
