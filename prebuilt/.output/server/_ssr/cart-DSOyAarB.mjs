import { r as reactExports } from "../_libs/react.mjs";
const CART = "drop-carrito";
const ORDERS = "drop-pedidos";
const ADDRESS = "drop-direccion";
const SHIPPING_COST = 6500;
const FREE_SHIPPING_FROM = 12e4;
const PICKUP_POINT = "Showroom DROP · Av. Corrientes 1234, CABA";
const listeners = /* @__PURE__ */ new Set();
const cache = /* @__PURE__ */ new Map();
function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  let raw = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    raw = null;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value;
  let value = fallback;
  try {
    value = raw ? JSON.parse(raw) : fallback;
  } catch {
    value = fallback;
  }
  cache.set(key, { raw, value });
  return value;
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
  listeners.forEach((l) => l());
}
function subscribe(l) {
  listeners.add(l);
  const onStorage = () => l();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}
const EMPTY_CART = [];
const EMPTY_ORDERS = [];
const getCart = () => read(CART, EMPTY_CART);
const getOrders = () => read(ORDERS, EMPTY_ORDERS);
const getAddress = () => read(ADDRESS, null);
function useCart() {
  return reactExports.useSyncExternalStore(subscribe, getCart, () => EMPTY_CART);
}
function useOrders() {
  return reactExports.useSyncExternalStore(subscribe, getOrders, () => EMPTY_ORDERS);
}
function useAddress() {
  return reactExports.useSyncExternalStore(subscribe, getAddress, () => null);
}
function addToCart(line, qty = 1) {
  const cart = getCart();
  const found = cart.find((l) => l.dropId === line.dropId && l.itemId === line.itemId);
  write(CART, found ? cart.map((l) => l === found ? { ...l, qty: Math.min(10, l.qty + qty) } : l) : [...cart, { ...line, qty }]);
}
function setQty(dropId, itemId, qty) {
  const cart = getCart();
  write(CART, qty <= 0 ? cart.filter((l) => !(l.dropId === dropId && l.itemId === itemId)) : cart.map((l) => l.dropId === dropId && l.itemId === itemId ? { ...l, qty: Math.min(10, qty) } : l));
}
const cartCount = (cart) => cart.reduce((n, l) => n + l.qty, 0);
const cartSubtotal = (cart) => cart.reduce((n, l) => n + l.qty * l.price, 0);
const shippingFor = (subtotal, delivery) => delivery === "retiro" || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
function saveAddress(a) {
  write(ADDRESS, a);
}
function placeOrder(delivery) {
  const lines = getCart();
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal, delivery);
  const order = {
    id: `DRP-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    at: (/* @__PURE__ */ new Date()).toISOString(),
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
    delivery,
    address: delivery === "envio" ? getAddress() : null,
    status: "confirmado"
  };
  write(ORDERS, [order, ...getOrders()]);
  write(CART, []);
  return order;
}
export {
  FREE_SHIPPING_FROM as F,
  PICKUP_POINT as P,
  useCart as a,
  useAddress as b,
  cartSubtotal as c,
  cartCount as d,
  saveAddress as e,
  shippingFor as f,
  addToCart as g,
  placeOrder as p,
  setQty as s,
  useOrders as u
};
