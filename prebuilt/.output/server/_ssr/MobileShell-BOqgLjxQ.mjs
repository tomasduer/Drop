import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function MobileShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative mx-auto min-h-screen w-full max-w-[440px] overflow-hidden pb-40",
      style: { backgroundImage: "var(--gradient-glow)" },
      children
    }
  ) });
}
export {
  MobileShell as M
};
