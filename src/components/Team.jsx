import { team } from "../data/team";
import Reveal from "./Reveal";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Team() {
  return (
    <section id="equipa" className="relative bg-charcoal py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brass">Equipa</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-bone sm:text-5xl">
            As mãos que fazem a diferença.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 120} direction="up">
              <div className="group flex h-full flex-col items-center rounded-md border border-bone/10 bg-ink-soft px-6 py-10 text-center transition-colors duration-500 hover:border-brass/40">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full border border-brass/0 transition-all duration-500 group-hover:border-brass/50 group-hover:-inset-3"
                  />
                  <div className="h-44 w-44 overflow-hidden rounded-full ring-1 ring-bone/10 transition-transform duration-500 group-hover:scale-[1.04]">
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}, ELO28 Barber&Co.`}
                      width={352}
                      height={352}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-xl font-medium text-bone">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brass-light">{member.role}</p>

                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram de ${member.name}`}
                  className="btn-magnetic mt-5 inline-flex items-center gap-2 rounded-full border border-bone/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-bone hover:border-bone hover:bg-bone/10"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  Instagram
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
