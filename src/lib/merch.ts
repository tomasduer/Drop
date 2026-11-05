// Merch oficial de cada drop. Todavía no hay tienda ni pagos: el fan reserva y la reserva queda
// registrada en su pasaporte (en este dispositivo) hasta que abra la venta.
export type MerchItem = {
  id: string;
  name: string;
  detail: string;
  /** Precio de referencia en pesos. */
  price: number;
  image: string;
  /** Si está, es exclusiva: solo la reservan los primeros N del ranking del drop. */
  top?: number;
};

export type MerchReservation = { dropId: string; artist: string; id: string; name: string; image: string; at: string };

const KEY = "drop-merch-reservas";

export function getReservations(): MerchReservation[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as MerchReservation[];
  } catch {
    return [];
  }
}

/** Reserva o cancela la reserva; devuelve true si quedó reservada. */
export function toggleReservation(r: MerchReservation): boolean {
  const list = getReservations();
  const has = list.some((x) => x.dropId === r.dropId && x.id === r.id);
  const next = has ? list.filter((x) => !(x.dropId === r.dropId && x.id === r.id)) : [...list, r];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* sin almacenamiento */
  }
  return !has;
}

export const formatPrice = (n: number) => `$${n.toLocaleString("es-AR")}`;

/** Identificador de la tienda de un artista en la URL (/tienda?a=ricardo-arjona). */
export const artistSlug = (artist: string) =>
  artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
