import { useEffect, useRef } from "react";
import { testimonials } from "../data/testimonials";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";

function Stars({ count, starRefs }) {
  return (
    <div className="flex gap-1 text-brass" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          ref={(el) => starRefs && (starRefs.current[i] = el)}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, rotation }) {
  const cardRef = useRef(null);
  const starRefs = useRef([]);

  function onEnter() {
    gsap.to(cardRef.current, { y: -4, rotate: 0, boxShadow: "0 20px 40px rgba(12,12,13,0.18)", duration: 0.35, ease: "power2.out" });
    gsap.fromTo(
      starRefs.current.filter(Boolean),
      { scale: 0.5, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: "back.out(3)" }
    );
  }
  function onLeave() {
    gsap.to(cardRef.current, { y: 0, rotate: rotation, boxShadow: "0 1px 2px rgba(12,12,13,0.05)", duration: 0.4, ease: "power2.out" });
  }

  return (
    <figure
      ref={cardRef}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="w-[320px] shrink-0 rounded-sm border border-ink/10 bg-bone p-7 sm:w-[360px]"
    >
      <Stars count={t.rating} starRefs={starRefs} />
      <blockquote className="mt-4 text-balance text-[15px] leading-relaxed text-ink/85">“{t.text}”</blockquote>
      <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-steel">{t.name}</figcaption>
    </figure>
  );
}

function MarqueeRow({ items, direction }) {
  const trackRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth / 2;
      const duration = distance / 34; // px per second, tuned for a slow drift
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        track,
        { x: direction === "left" ? 0 : -distance },
        { x: direction === "left" ? -distance : 0, duration, ease: "none" }
      );
      tlRef.current = tl;
    }, track);

    return () => ctx.revert();
  }, [direction]);

  function slow() {
    gsap.to(tlRef.current, { timeScale: 0.05, duration: 0.5, ease: "power2.out" });
  }
  function resume() {
    gsap.to(tlRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
  }

  return (
    <div className="overflow-hidden" onPointerEnter={slow} onPointerLeave={resume}>
      <div ref={trackRef} className="flex w-max gap-6 px-6 py-3">
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} rotation={i % 2 === 0 ? -1.4 : 1.4} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const rowA = testimonials.filter((_, i) => i % 2 === 0);
  const rowB = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <section id="testemunhos" className="relative overflow-hidden bg-bone-dim py-28 sm:py-40">
      <Reveal className="mx-auto mb-16 max-w-2xl px-6 lg:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brass-deep">Testemunhos</p>
        <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
          Quem confia, regressa.
        </h2>
      </Reveal>

      <div className="flex flex-col gap-6">
        <MarqueeRow items={rowA} direction="left" />
        <MarqueeRow items={rowB} direction="right" />
      </div>
    </section>
  );
}
