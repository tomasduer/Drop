const KEY = "drop-merch-reservas";
function getReservations() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function toggleReservation(r) {
  const list = getReservations();
  const has = list.some((x) => x.dropId === r.dropId && x.id === r.id);
  const next = has ? list.filter((x) => !(x.dropId === r.dropId && x.id === r.id)) : [...list, r];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
  }
  return !has;
}
const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;
const artistSlug = (artist) => artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export {
  artistSlug as a,
  formatPrice as f,
  getReservations as g,
  toggleReservation as t
};
