import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const spotify = (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}`;
const ytMusic = (q) => `https://music.youtube.com/search?q=${encodeURIComponent(q)}`;
function SpotifyIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "12", fill: "#1DB954" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.5 9.3c3.8-1.1 8-.8 11.2 1.1M7.2 12.4c3.1-.9 6.5-.6 9.2 1M7.9 15.3c2.5-.7 5.1-.5 7.2.8", stroke: "#000", strokeWidth: "1.6", strokeLinecap: "round", fill: "none" })
  ] });
}
function YtMusicIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "12", fill: "#FF0000" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "6.2", stroke: "#fff", strokeWidth: "1.3", fill: "none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.3 9.4v5.2l4.4-2.6z", fill: "#fff" })
  ] });
}
function ListenButtons({ query, className = "" }) {
  const cls = "flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-bold transition-colors active:bg-muted";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: spotify(query), target: "_blank", rel: "noreferrer", className: cls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SpotifyIcon, {}),
      "Spotify"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: ytMusic(query), target: "_blank", rel: "noreferrer", className: cls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(YtMusicIcon, {}),
      "YouTube Music"
    ] })
  ] });
}
const url$1 = "/assets/drop-photo-31-BpFihalT.webp";
const fanMaria = { url: url$1 };
const url = "/assets/drop-photo-33-oNWSxnWe.webp";
const fanLali = { url };
export {
  ListenButtons as L,
  fanMaria as a,
  fanLali as f
};
