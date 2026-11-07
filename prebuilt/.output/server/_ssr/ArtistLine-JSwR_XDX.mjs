import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as ARCHIVED_KIND_LABEL, K as KIND_LABEL } from "./drops-DswU_7z0.mjs";
function ArtistLine({ drop, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: drop.artist }),
    drop.kind && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-1.5 py-px text-[0.72em] font-bold uppercase leading-tight tracking-wide text-white", style: { background: "oklch(0.64 0.21 40)", fontFamily: "var(--font-body)" }, children: (drop.status === "archived" ? ARCHIVED_KIND_LABEL : KIND_LABEL)[drop.kind] })
  ] });
}
export {
  ArtistLine as A
};
