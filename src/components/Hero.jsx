import { useEffect, useRef } from "react";
import { BOOKING_URL } from "../data/business";
import { gsap } from "../lib/gsap";
import { useMagneticButton } from "../hooks/useMagneticButton";
import Logo from "./Logo";

export default function Hero() {
  const rootRef = useRef(null);
  const magneticPrimary = useMagneticButton(0.3);
  const magneticSecondary = useMagneticButton(0.3);
  const logoRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [logoRef.current, eyebrowRef.current, line1Ref.current, line2Ref.current, subRef.current, ctaRef.current],
          { opacity: 1, clearProps: "transform" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.1 }, 0)
        .fromTo(logoRef.current, { opacity: 0, scale: 0.88, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, 0.15)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.55)
        .fromTo(line1Ref.current, { yPercent: 100 }, { yPercent: 0, duration: 0.9 }, 0.65)
        .fromTo(line2Ref.current, { yPercent: 100 }, { yPercent: 0, duration: 0.9 }, 0.78)
        .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.15)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.3);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={rootRef} className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden bg-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero/hero-poster.jpg"
        aria-hidden="true"
      >
        <source media="(min-width: 768px)" src="/media/hero/hero-desktop.mp4" type="video/mp4" />
        <source src="/media/hero/hero-mobile.mp4" type="video/mp4" />
      </video>

      <div ref={overlayRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div ref={logoRef} className="mb-7" style={{ opacity: 0 }}>
          <Logo className="h-16 w-auto sm:h-20" tone="bone" />
        </div>

        <p
          ref={eyebrowRef}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-brass-light"
          style={{ opacity: 0 }}
        >
          Rio de Mouro
        </p>

        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.12] text-bone sm:text-5xl md:text-6xl">
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block" style={{ transform: "translateY(100%)" }}>
              O elo não se corta.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block text-brass-light" style={{ transform: "translateY(100%)" }}>
              Cria-se.
            </span>
          </span>
        </h1>

        <p ref={subRef} className="mt-6 max-w-xl text-balance text-base text-bone/80 sm:text-lg" style={{ opacity: 0 }}>
          Cortes, ritual de barba e cuidado ao pormenor — numa barbearia de Rio de Mouro onde se entra estranho e se
          sai conhecido.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ opacity: 0 }}>
          <a
            ref={magneticPrimary}
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border border-brass bg-brass px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-brass-light sm:w-auto"
          >
            Marcar Agora
          </a>
          <a
            ref={magneticSecondary}
            href="#servicos"
            className="w-full rounded-full border border-bone/40 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-bone transition-colors duration-300 hover:border-bone hover:bg-bone/10 sm:w-auto"
          >
            Ver Serviços
          </a>
        </div>
      </div>
    </section>
  );
}
