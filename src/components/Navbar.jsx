import { useEffect, useRef, useState } from "react";
import { useScrolled } from "../hooks/useScrolled";
import { useActiveSection } from "../hooks/useActiveSection";
import { BOOKING_URL } from "../data/business";
import { gsap } from "../lib/gsap";
import Logo from "./Logo";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#galeria", label: "Galeria" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipa", label: "Equipa" },
  { href: "#testemunhos", label: "Testemunhos" },
  { href: "#contactos", label: "Contactos" },
];
const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    if (open) setMounted(true);
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        linkRefs.current.filter(Boolean),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.1, ease: "power3.out" }
      );
    } else if (mounted) {
      gsap.to(panel, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  }, [open, mounted]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bone/90 shadow-[0_1px_0_rgba(12,12,13,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" aria-label="ELO28 Barber&Co. — início" className="shrink-0">
          <Logo className="h-10 w-auto sm:h-11" tone={scrolled ? "ink" : "bone"} />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`link-underline text-sm font-medium uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-brass-deep" : scrolled ? "text-ink" : "text-bone"
                  } ${isActive ? "[background-size:100%_1px]" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-magnetic rounded-full border border-brass bg-brass px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-brass-light"
          >
            Marcar Agora
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-[1.5px] w-6 transition-all duration-300 ${scrolled || open ? "bg-ink" : "bg-bone"} ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 transition-all duration-300 ${scrolled || open ? "bg-ink" : "bg-bone"} ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        ref={panelRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-8 bg-ink lg:hidden"
        style={{ opacity: 0 }}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => (linkRefs.current[i] = el)}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`font-display text-3xl font-medium ${active === link.href.slice(1) ? "text-brass-light" : "text-bone"}`}
          >
            {link.label}
          </a>
        ))}
        <a
          ref={(el) => (linkRefs.current[LINKS.length] = el)}
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 rounded-full bg-brass px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink"
        >
          Marcar Agora
        </a>
      </div>
    </header>
  );
}
