import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Wires Lenis' smooth-scroll raf loop into GSAP's ticker so ScrollTrigger
// reads the same scroll position Lenis renders, instead of the raw native
// scrollTop (which would desync pinned/scrubbed animations).
export function useLenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);
}
