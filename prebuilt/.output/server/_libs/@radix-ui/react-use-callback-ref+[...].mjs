import { u as useLayoutEffect2 } from "./react-use-layout-effect+[...].mjs";
import { r as reactExports, b as React } from "../react.mjs";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var useReactInsertionEffect = React[" useInsertionEffect ".trim().toString()];
function useCallbackRef(callback) {
  const callbackRef = reactExports.useRef(callback);
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      callbackRef.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      callbackRef.current = callback;
    });
  }
  return reactExports.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
__name(useCallbackRef, "useCallbackRef");
export {
  useCallbackRef as u
};
