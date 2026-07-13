import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// Replaces the native browser scrollbar (hidden in index.css) with a slim
// brass indicator pinned to the right edge. mix-blend-mode keeps it legible
// over both light and dark sections without per-section color logic.
export default function ScrollProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fill, { scaleY: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-1/2 z-[60] hidden h-[38vh] w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-ink/10 mix-blend-difference sm:block md:right-5 md:h-[44vh]"
    >
      <div ref={fillRef} className="absolute inset-0 origin-top rounded-full bg-bone" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
