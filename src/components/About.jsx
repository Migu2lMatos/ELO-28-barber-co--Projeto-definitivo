import { business } from "../data/business";
import Reveal from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const highlights = ["Ambiente Premium", "Produtos Profissionais", "Equipa Especializada"];

export default function About() {
  const parallaxRef = useParallax(22);

  return (
    <section id="sobre" className="relative bg-bone py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal direction="left" className="order-2 lg:order-1">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brass-deep">A Filosofia</p>

          <h2 className="font-display text-6xl font-medium leading-none text-ink sm:text-7xl">
            {business.philosophy.title}
          </h2>
          <p className="mb-8 mt-2 text-base italic text-steel">{business.philosophy.subtitle}</p>

          <div className="space-y-5">
            {business.philosophy.paragraphs.map((p) => (
              <p key={p} className="text-balance text-[17px] leading-relaxed text-ink/70 sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-11 flex flex-wrap gap-3">
            {highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={100} className="order-1 lg:order-2">
          <div className="relative">
            <div className="img-hover-zoom aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal">
              <img
                src="/media/barbearia/barbearia-filosofia-elo.webp"
                alt="Parede da ELO28 Barber&Co. com o significado da marca e um barbeiro a trabalhar"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              ref={parallaxRef}
              className="absolute -bottom-9 -left-9 hidden aspect-square w-36 overflow-hidden rounded-sm border-4 border-bone shadow-xl sm:block"
            >
              <img
                src="/media/barbearia/barbearia-interior-1.webp"
                alt="Interior da barbearia ELO28 com iluminação hexagonal"
                width={300}
                height={300}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
