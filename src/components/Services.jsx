import { services } from "../data/services";
import { BOOKING_URL } from "../data/business";
import Reveal from "./Reveal";

function ServiceCard({ service, index }) {
  return (
    <Reveal direction="scale" delay={(index % 2) * 90} className="h-full">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-full flex-col overflow-hidden rounded-md border border-bone/10 bg-ink-soft p-7 transition-colors duration-500 hover:border-brass/40"
      >
        {/* animated spotlight, brass glow following the top corner on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brass opacity-0 blur-3xl transition-all duration-700 ease-out group-hover:opacity-20 group-hover:scale-125"
        />
        {/* animated top accent line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brass via-brass-light to-brass transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-bone/35">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-2xl font-medium text-brass-light transition-transform duration-500 group-hover:scale-105">
            {service.price}
          </span>
        </div>

        <h3 className="relative mt-4 font-display text-lg font-medium leading-snug text-bone sm:text-xl">
          {service.name}
        </h3>

        {service.note && (
          <span className="relative mt-2 inline-block w-fit rounded-full border border-bone/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-bone/55">
            {service.note}
          </span>
        )}

        <p className="relative mt-4 text-balance text-[14px] leading-relaxed text-bone/55">{service.detail}</p>

        <span className="relative mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-brass-light">
          Marcar
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brass">Serviços</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-bone sm:text-5xl">
            O que fazemos de melhor.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
