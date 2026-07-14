import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { navJump } from "../lib/navJump";

// A full-viewport pinned "chapter": the section pins while the user scrolls,
// and that vertical scroll instead drives a horizontal pan through a title
// card followed by the chapter's photography — a filmstrip read as a story.
export default function GalleryChapter({ title, index, photos, dense = false }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let titleObserver;
      if (reduced) {
        gsap.set(titleRef.current, { clipPath: "inset(0 0 0% 0)" });
      } else {
        titleObserver = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            if (navJump.active) {
              gsap.set(titleRef.current, { clipPath: "inset(0 0 0% 0)" });
            } else {
              gsap.to(titleRef.current, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out" });
            }
            titleObserver.disconnect();
          },
          { threshold: 0.15 }
        );
        titleObserver.observe(section);
      }

      const getDistance = () => Math.max(track.scrollWidth - section.clientWidth, 0);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + getDistance(),
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getDistance() });
        },
      });

      // Lazy-loaded images report 0 intrinsic width until decoded, which can
      // under-measure track.scrollWidth at mount time — recalculate the pin
      // distance once every image in this chapter has actually loaded.
      const imgs = Array.from(track.querySelectorAll("img"));
      Promise.all(
        imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => img.addEventListener("load", res, { once: true }))))
      ).then(() => ScrollTrigger.refresh());

      return () => {
        st.kill();
        titleObserver?.disconnect();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <div ref={trackRef} className="flex h-full items-center will-change-transform">
        <div className="flex h-full w-[78vw] shrink-0 items-center px-6 sm:w-[52vw] sm:px-16">
          <div>
            <span className="font-mono text-sm text-brass-light">{String(index + 1).padStart(2, "0")} / Galeria</span>
            <h3
              ref={titleRef}
              className="mt-3 text-balance font-display text-5xl font-medium leading-[1.05] text-bone sm:text-7xl"
              style={{ clipPath: "inset(0 0 100% 0)" }}
            >
              {title}
            </h3>
          </div>
        </div>

        {photos.map((photo) => (
          <div key={photo.src} className={`shrink-0 px-2.5 ${dense ? "h-[52%]" : "h-[72%]"}`}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-auto rounded-sm object-cover shadow-2xl"
            />
          </div>
        ))}

        <div className="w-[8vw] shrink-0 sm:w-[14vw]" />
      </div>
    </section>
  );
}
