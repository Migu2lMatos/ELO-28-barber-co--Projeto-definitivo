import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// Scrubs an element's y-translate against scroll progress for a subtle
// layered-depth effect. `speed` > 0 moves slower than scroll (recedes),
// `speed` < 0 moves faster (advances) — keep it small, this is a whisper.
export function useParallax(speed = 40) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
