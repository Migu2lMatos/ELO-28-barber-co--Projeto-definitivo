import { useEffect, useRef } from "react";
import { business } from "../data/business";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Logo from "./Logo";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipa", label: "Equipa" },
  { href: "#galeria", label: "Galeria" },
  { href: "#testemunhos", label: "Testemunhos" },
  { href: "#contactos", label: "Contactos" },
];

export default function Footer() {
  const logoRef = useRef(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      // A wink at the shop's own backlit neon sign: a quick imperfect flicker,
      // a long quiet hold, then it flickers again — a real neon cycle, not a
      // one-off. Only runs while the logo is actually in view.
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.to(el, { opacity: 0.15, duration: 0.04, repeat: 7, yoyo: true, repeatDelay: 0.05, ease: "none" })
        .set(el, { opacity: 1 })
        .to({}, { duration: 2.2 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 95%",
        end: "bottom top",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-ink-soft py-14 text-bone/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <a href="#inicio" aria-label="ELO28 Barber&Co. — início" ref={logoRef}>
          <Logo className="h-10 w-auto" tone="bone" />
        </a>

        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em]">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 text-xs font-semibold uppercase tracking-[0.12em]">
          <a href={business.social.instagram} target="_blank" rel="noreferrer" className="link-underline">
            Instagram
          </a>
          <a href={business.social.facebook} target="_blank" rel="noreferrer" className="link-underline">
            Facebook
          </a>
          <a href={business.social.tiktok} target="_blank" rel="noreferrer" className="link-underline">
            TikTok
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-bone/10 px-6 pt-6 text-center text-xs text-bone/40 lg:text-left">
        © {new Date().getFullYear()} ELO28 Barber&amp;Co. — {business.address.line1}, {business.address.line2}. Todos
        os direitos reservados.
      </div>
    </footer>
  );
}
