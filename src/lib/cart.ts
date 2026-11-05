import { useSyncExternalStore } from "react";

// Carrito y pedidos de la Tienda. Es una demo: todo queda guardado en este dispositivo y
// "comprar" genera un pedido sin cobrar nada.
export type CartLine = { dropId: string; itemId: string; artist: string; name: string; image: string; price: number; qty: number };
export type Address = { name: string; street: string; city: string; zip: string; phone: string };
export type Order = {
  id: string; at: string; lines: CartLine[]; subtotal: number; shipping: number; total: number;
  delivery: "envio" | "retiro"; address: Address | null; status: "confirmado";
};

const CART = "drop-carrito";
const ORDERS = "drop-pedidos";
const ADDRESS = "drop-direccion";
export const SHIPPING_COST = 6500;
export const FREE_SHIPPING_FROM = 120000;
export const PICKUP_POINT = "Showroom DROP · Av. Corrientes 1234, CABA";

const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  let raw: string | null = null;
  try { raw = localStorage.getItem(key); } catch { raw = null; }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  try { value = raw ? (JSON.parse(raw) as T) : fallback; } catch { value = fallback; }
  cache.set(key, { raw, value });
  return value;
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = () => l();
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

const EMPTY_CART: CartLine[] = [];
const EMPTY_ORDERS: Order[] = [];
export const getCart = () => read<CartLine[]>(CART, EMPTY_CART);
export const getOrders = () => read<Order[]>(ORDERS, EMPTY_ORDERS);
export const getAddress = () => read<Address | null>(ADDRESS, null);

export function useCart() { return useSyncExternalStore(subscribe, getCart, () => EMPTY_CART); }
export function useOrders() { return useSyncExternalStore(subscribe, getOrders, () => EMPTY_ORDERS); }
export function useAddress() { return useSyncExternalStore(subscribe, getAddress, () => null); }

export function addToCart(line: Omit<CartLine, "qty">, qty = 1) {
  const cart = getCart();
  const found = cart.find((l) => l.dropId === line.dropId && l.itemId === line.itemId);
  write(CART, found ? cart.map((l) => (l === found ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...cart, { ...line, qty }]);
}
export function setQty(dropId: string, itemId: string, qty: number) {
  const cart = getCart();
  write(CART, qty <= 0 ? cart.filter((l) => !(l.dropId === dropId && l.itemId === itemId)) : cart.map((l) => (l.dropId === dropId && l.itemId === itemId ? { ...l, qty: Math.min(10, qty) } : l)));
}
export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0);
export const cartSubtotal = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty * l.price, 0);
export const shippingFor = (subtotal: number, delivery: "envio" | "retiro") => (delivery === "retiro" || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST);

export function saveAddress(a: Address) { write(ADDRESS, a); }

export function placeOrder(delivery: "envio" | "retiro"): Order {
  const lines = getCart();
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal, delivery);
  const order: Order = {
    id: `DRP-${Date.now().toString(36).toUpperCase().slice(-6)}`, at: new Date().toISOString(), lines, subtotal, shipping,
    total: subtotal + shipping, delivery, address: delivery === "envio" ? getAddress() : null, status: "confirmado",
  };
  write(ORDERS, [order, ...getOrders()]);
  write(CART, []);
  return order;
}
