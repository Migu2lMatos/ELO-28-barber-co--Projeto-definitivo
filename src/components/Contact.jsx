import { business, BOOKING_URL } from "../data/business";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contactos" className="relative overflow-hidden bg-ink py-28 text-bone sm:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal direction="left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brass">Contactos</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] sm:text-5xl">Marque a sua visita.</h2>

          <div className="mt-10 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Morada</p>
              <p className="mt-2 text-lg">
                {business.address.line1}
                <br />
                {business.address.line2}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Telefone</p>
              <a href={business.phoneHref} className="link-underline mt-2 inline-block text-lg">
                {business.phone}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Horário</p>
              <ul className="mt-2 space-y-1 text-[15px] text-bone/85">
                {business.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 border-b border-bone/10 py-1.5">
                    <span>{h.day}</span>
                    <span className={h.value === "Encerrado" ? "text-steel" : "text-bone"}>{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={business.mapsDirectionsHref}
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic rounded-full border border-bone/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] hover:border-bone hover:bg-bone/10"
            >
              Traçar Rota
            </a>
            <a
              href={business.phoneHref}
              className="btn-magnetic rounded-full border border-bone/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] hover:border-bone hover:bg-bone/10"
            >
              Ligar
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic rounded-full border border-brass bg-brass px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-brass-light"
            >
              Marcar Agora
            </a>
          </div>

          <div className="mt-10 flex gap-5 text-bone/70">
            <a href={business.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="link-underline">
              Instagram
            </a>
            <a href={business.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="link-underline">
              Facebook
            </a>
            <a href={business.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="link-underline">
              TikTok
            </a>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border border-bone/10 sm:aspect-square lg:aspect-[4/5]">
            <iframe
              title="Localização da ELO28 Barber&Co. no Google Maps"
              src={business.mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[20%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
