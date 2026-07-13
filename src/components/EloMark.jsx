// Two interlocking rings — the site's recurring graphic motif, drawn from the
// literal meaning of "elo" (link/bond) used on the shop's own wall copy.
export default function EloMark({ className = "h-4 w-7" }) {
  return (
    <svg viewBox="0 0 40 24" className={className} fill="none" aria-hidden="true">
      <circle cx="14" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="26" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
