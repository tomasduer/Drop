// Merch oficial de cada drop. Se vende en la Tienda (carrito y pedidos en src/lib/cart.ts).
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

export const formatPrice = (n: number) => `$${n.toLocaleString("es-AR")}`;

/** Identificador de la tienda de un artista en la URL (/tienda?a=ricardo-arjona). */
export const artistSlug = (artist: string) =>
  artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
