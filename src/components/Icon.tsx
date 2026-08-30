/* ═══════════════════════════════════════════════════════════════
   Piel Dorada — bespoke line-icon system.
   Thin gold strokes, one visual language. Replaces every emoji.
   Server-safe (pure SVG, no client hooks).
   ═══════════════════════════════════════════════════════════════ */

export type IconName =
  | "sun"
  | "crown"
  | "eye"
  | "polish"
  | "droplet"
  | "gem"
  | "book"
  | "sparkle"
  | "check"
  | "arrow";

const PATHS: Record<IconName, React.ReactNode> = {
  // Bronceado — sun with rays
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
    </>
  ),
  // Micropigmentación / PMU — crown
  crown: (
    <>
      <path d="M3.5 7.5 6.2 15h11.6l2.7-7.5-4.6 3.3L12 5.2 8.1 10.8 3.5 7.5Z" />
      <path d="M6 18h12" />
    </>
  ),
  // Cejas & pestañas — brow arc over an eye
  eye: (
    <>
      <path d="M4 6.6c2.6-1.9 13.4-1.9 16 0" />
      <path d="M3 12.5c3-3.6 15-3.6 18 0-3 3.6-15 3.6-18 0Z" />
      <circle cx="12" cy="12.5" r="2.2" />
    </>
  ),
  // Uñas — polish bottle
  polish: (
    <>
      <path d="M10.5 3h3v2.6h-3z" />
      <path d="M9.2 5.6h5.6v12.2a2 2 0 0 1-2 2h-1.6a2 2 0 0 1-2-2V5.6Z" />
      <path d="M12 3V1.4" />
    </>
  ),
  // Faciales — droplet (hydration / glow)
  droplet: (
    <path d="M12 3.2s6.5 7 6.5 11a6.5 6.5 0 0 1-13 0c0-4 6.5-11 6.5-11Z" />
  ),
  // Miembros fundadores — gem
  gem: (
    <>
      <path d="M6 3.5h12l3 5-9 12-9-12 3-5Z" />
      <path d="M3 8.5h18M8.7 3.5 6 8.5l6 12M15.3 3.5 18 8.5l-6 12" />
    </>
  ),
  // Blog — open book
  book: (
    <>
      <path d="M12 6.2C10 4.8 5.6 4.8 3.5 5.4v12.4c2.1-.6 6.5-.6 8.5.8 2-1.4 6.4-1.4 8.5-.8V5.4C18.4 4.8 14 4.8 12 6.2Z" />
      <path d="M12 6.2v12.4" />
    </>
  ),
  // Accent — four-point sparkle
  sparkle: (
    <path d="M12 3c.5 5 1.9 6.4 6.9 6.9C13.9 10.4 12.5 11.8 12 16.8c-.5-5-1.9-6.4-6.9-6.9C10.1 9.4 11.5 8 12 3Z" />
  ),
  check: <path d="M5 12.5 10 17.5 19 6.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 1.4,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
