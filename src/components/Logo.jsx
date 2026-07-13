// Faithful, crisp reconstruction of the ELO28 Barber&Co. wordmark (box +
// wordmark + tagline), rebuilt as SVG so it stays sharp at every size.
export default function Logo({ className = "", tone = "ink" }) {
  const stroke = tone === "bone" ? "#F3EFE8" : "#0C0C0D";
  return (
    <svg viewBox="0 0 220 74" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ELO28 Barber&amp;Co.">
      <rect x="1.5" y="1.5" width="217" height="71" rx="1" stroke={stroke} strokeWidth="1.5" />
      <text
        x="110"
        y="42"
        textAnchor="middle"
        fontFamily="'Bricolage Grotesque Variable', sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="2"
        fill={stroke}
      >
        ELO28
      </text>
      <text
        x="110"
        y="60"
        textAnchor="middle"
        fontFamily="'Inter Variable', sans-serif"
        fontWeight="500"
        fontSize="10"
        letterSpacing="4"
        fill={stroke}
      >
        BARBER &amp; CO.
      </text>
    </svg>
  );
}
