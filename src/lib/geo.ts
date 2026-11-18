import { useCallback, useState } from "react";

export type Geo = { lat: number; lng: number };

/** Coordenadas de ciudades frecuentes, para ubicar los shows que no traen coordenadas (los de la base). */
const CITIES: Record<string, Geo> = {
  "buenos aires": { lat: -34.6037, lng: -58.3816 },
  caba: { lat: -34.6037, lng: -58.3816 },
  "la plata": { lat: -34.9214, lng: -57.9545 },
  "mar del plata": { lat: -38.0055, lng: -57.5426 },
  cordoba: { lat: -31.4201, lng: -64.1888 },
  rosario: { lat: -32.9442, lng: -60.6505 },
  "santa fe": { lat: -31.6333, lng: -60.7 },
  mendoza: { lat: -32.8895, lng: -68.8458 },
  tucuman: { lat: -26.8083, lng: -65.2176 },
  "san miguel de tucuman": { lat: -26.8083, lng: -65.2176 },
  salta: { lat: -24.7821, lng: -65.4232 },
  neuquen: { lat: -38.9516, lng: -68.0591 },
  "bahia blanca": { lat: -38.7196, lng: -62.2724 },
  "san juan": { lat: -31.5375, lng: -68.5364 },
  parana: { lat: -31.7413, lng: -60.5115 },
  corrientes: { lat: -27.4806, lng: -58.8341 },
  resistencia: { lat: -27.4606, lng: -58.9839 },
  posadas: { lat: -27.3671, lng: -55.8961 },
  bariloche: { lat: -41.1335, lng: -71.3103 },
  montevideo: { lat: -34.9011, lng: -56.1645 },
  santiago: { lat: -33.4489, lng: -70.6693 },
  asuncion: { lat: -25.2637, lng: -57.5759 },
  lima: { lat: -12.0464, lng: -77.0428 },
  "sao paulo": { lat: -23.5505, lng: -46.6333 },
  "ciudad de mexico": { lat: 19.4326, lng: -99.1332 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  barcelona: { lat: 41.3874, lng: 2.1686 },
  miami: { lat: 25.7617, lng: -80.1918 },
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const DISPLAY: Record<string, string> = { caba: "Buenos Aires", cordoba: "Córdoba", tucuman: "Tucumán", "san miguel de tucuman": "Tucumán", neuquen: "Neuquén", "bahia blanca": "Bahía Blanca", parana: "Paraná", asuncion: "Asunción", "sao paulo": "São Paulo", "ciudad de mexico": "Ciudad de México" };
const title = (k: string) => DISPLAY[k] ?? k.replace(/\b\w/g, (c) => c.toUpperCase());

/** Ciudad conocida más cercana al fan (para buscar recitales ahí). */
export function nearestCity(at: Geo): string {
  let best = "buenos aires", min = Infinity;
  for (const [k, g] of Object.entries(CITIES)) {
    const d = distanceKm(at, g);
    if (d < min) { min = d; best = k; }
  }
  return title(best);
}

/** Coordenadas de una ciudad ("Córdoba", "Rosario, AR"…), si la conocemos. */
export function cityCoords(city: string | null | undefined): Geo | null {
  if (!city) return null;
  const name = norm(city.split(",")[0] ?? "");
  if (CITIES[name]) return CITIES[name];
  // "Cdad. Autónoma de Buenos Aires", "Rosario, Santa Fe"…: la ciudad conocida más larga que aparezca en el texto.
  const full = norm(city);
  const hit = Object.keys(CITIES).filter((k) => k.length > 4 && full.includes(k)).sort((a, b) => b.length - a.length)[0];
  return hit ? CITIES[hit] : /autonoma|caba\b/.test(full) ? CITIES["buenos aires"] : null;
}

/** Distancia en km entre dos puntos (fórmula de Haversine). */
export function distanceKm(a: Geo, b: Geo): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const KEY = "drop-ubicacion";

function readSaved(): Geo | null {
  try {
    const raw = localStorage.getItem(KEY);
    const g = raw ? (JSON.parse(raw) as Geo) : null;
    return g && typeof g.lat === "number" && typeof g.lng === "number" ? g : null;
  } catch {
    return null;
  }
}

/** Ubicación del fan: se pide con permiso y se recuerda (redondeada) en este dispositivo. */
export function useUserLocation() {
  const [location, setLocation] = useState<Geo | null>(() => (typeof window === "undefined" ? null : readSaved()));
  const [status, setStatus] = useState<"idle" | "loading" | "denied" | "unavailable">("idle");

  const request = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) { setStatus("unavailable"); return; }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Redondeado a ~1 km: alcanza para ordenar shows y no guarda la ubicación exacta.
        const g = { lat: Math.round(pos.coords.latitude * 100) / 100, lng: Math.round(pos.coords.longitude * 100) / 100 };
        try { localStorage.setItem(KEY, JSON.stringify(g)); } catch { /* sin almacenamiento */ }
        setLocation(g);
        setStatus("idle");
      },
      (err) => setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 30 * 60 * 1000 },
    );
  }, []);

  const clear = useCallback(() => {
    try { localStorage.removeItem(KEY); } catch { /* sin almacenamiento */ }
    setLocation(null);
  }, []);

  return { location, status, request, clear };
}
