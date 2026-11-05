const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;
const artistSlug = (artist) => artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export {
  artistSlug as a,
  formatPrice as f
};
