import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// A restrained magnetic-pull hover: the button drifts a few px toward the
// cursor within its own bounds, then eases back. Desktop pointer only.
export function useMagneticButton(strength = 0.25) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return undefined;

    const quickX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      quickX((e.clientX - rect.left - rect.width / 2) * strength);
      quickY((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}
