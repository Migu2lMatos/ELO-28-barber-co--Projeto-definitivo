import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const OFFSETS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  scale: { x: 0, y: 0, scale: 0.94 },
};

// Fades + slides an element in once, the first time it crosses into view.
// Uses a plain IntersectionObserver (not ScrollTrigger) — this component is
// used 30+ times a page, and a ScrollTrigger instance per element adds up:
// every ScrollTrigger.refresh() (window resize, image loads) recalculates
// every registered instance. A one-off GSAP tween fired from a shared native
// observer costs far less and looks identical.
export function useReveal({ direction = "up", delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return undefined;
    }

    const offset = OFFSETS[direction] || OFFSETS.up;
    gsap.set(el, { opacity: 0, ...offset });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
        });
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);

  return { ref };
}
