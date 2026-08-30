/* ═══════════════════════════════════════════════════════════════
   Piel Dorada — brand emblem.
   A serif "PD" monogram inside a sunburst seal (golden skin / Sun Spa).
   variant: "seal" | "lockup" | "wordmark". Server-safe pure SVG.
   ═══════════════════════════════════════════════════════════════ */

function Seal({ size = 46 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="pd-seal"
    >
      <defs>
        <linearGradient id="pdGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B89848" />
          <stop offset="0.5" stopColor="#F5E6B8" />
          <stop offset="1" stopColor="#B89848" />
        </linearGradient>
      </defs>

      {/* sunburst ring */}
      <g stroke="url(#pdGold)" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 32 }).map((_, i) => (
          <line
            key={i}
            x1="60"
            y1="7.5"
            x2="60"
            y2={i % 2 === 0 ? "12.5" : "10.5"}
            transform={`rotate(${i * (360 / 32)} 60 60)`}
            opacity={i % 2 === 0 ? "0.9" : "0.5"}
          />
        ))}
      </g>

      {/* rings */}
      <circle cx="60" cy="60" r="45" stroke="url(#pdGold)" strokeWidth="1.1" />
      <circle cx="60" cy="60" r="40" stroke="url(#pdGold)" strokeWidth="0.6" opacity="0.45" />

      {/* PD monogram */}
      <text
        x="60"
        y="61"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="42"
        fontWeight="500"
        letterSpacing="1"
        fill="url(#pdGold)"
      >
        PD
      </text>

      {/* flanking dots */}
      <circle cx="42" cy="84" r="1.1" fill="url(#pdGold)" />
      <circle cx="78" cy="84" r="1.1" fill="url(#pdGold)" />
    </svg>
  );
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`pd-wordmark${compact ? " compact" : ""}`}>
      <span className="pd-wordmark-name">Piel Dorada</span>
      <span className="pd-wordmark-sub">Beauty &amp; Sun Spa</span>
    </span>
  );
}

export default function Logo({
  variant = "lockup",
  size = 46,
  className = "",
}: {
  variant?: "seal" | "lockup" | "wordmark";
  size?: number;
  className?: string;
}) {
  if (variant === "seal") {
    return (
      <span className={`pd-logo ${className}`} aria-label="Piel Dorada">
        <Seal size={size} />
      </span>
    );
  }
  if (variant === "wordmark") {
    return (
      <span className={`pd-logo ${className}`} aria-label="Piel Dorada">
        <Wordmark />
      </span>
    );
  }
  return (
    <span className={`pd-logo pd-logo-lockup ${className}`} aria-label="Piel Dorada">
      <Seal size={size} />
      <Wordmark />
    </span>
  );
}
