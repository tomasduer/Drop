import albumCover from "@/assets/album-cover.png.asset.json";
import coverNena from "@/assets/drop-photo-28.png.asset.json";
import coverMechon from "@/assets/drop-photo-29.png.asset.json";
import coverLali from "@/assets/drop-photo-30.png.asset.json";
import coverLibra from "@/assets/drop-photo-34.png.asset.json";
import coverBrava from "@/assets/drop-photo-35.png.asset.json";
import coverSoy from "@/assets/drop-photo-36.png.asset.json";
import coverABailar from "@/assets/drop-photo-37.png.asset.json";

export type AlbumEntry = { id: string; title: string; artist: string; year: string; cover: string };

export const ALBUMS: AlbumEntry[] = [
  { id: "nvaa", title: "No vayas a atender cuando el demonio llama", artist: "LALI", year: "2025", cover: albumCover.url },
  { id: "lali", title: "LALI", artist: "LALI", year: "2023", cover: coverLali.url },
  { id: "libra", title: "LIBRA", artist: "LALI", year: "2020", cover: coverLibra.url },
  { id: "brava", title: "BRAVA", artist: "LALI", year: "2018", cover: coverBrava.url },
  { id: "soy", title: "Soy", artist: "LALI", year: "2016", cover: coverSoy.url },
  { id: "abailar", title: "A Bailar", artist: "LALI", year: "2014", cover: coverABailar.url },
  { id: "nena", title: "La Nena de Argentina", artist: "María Becerra", year: "2021", cover: coverNena.url },
  { id: "mechon", title: "Un mechón de pelo", artist: "TINI", year: "2023", cover: coverMechon.url },
];
