"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   PIEL DORADA by Daniela Miranda Studios — Coming Soon
   Beauty & Sun Spa · El Salvador
   Single-frame cinematic reveal · No scroll
   Built by MachineMind LLC
   ═══════════════════════════════════════════════════════════════ */

function SplitText({
  text,
  charClass = "",
  staggerDelay = 0.05,
  baseDelay = 0,
}: {
  text: string;
  charClass?: string;
  staggerDelay?: number;
  baseDelay?: number;
}) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block ${charClass}`}
          style={{
            animation: `char-reveal 0.9s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * staggerDelay}s both`,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function PielDorada() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) { setSent(true); setEmail(""); }
  };

  const wa = "https://wa.me/50373106004?text=Hola%20%E2%9C%A8%20me%20interesa%20Piel%20Dorada";

  return (
    <div className="grain">
      {/* ═══ PRELOADER ═══ */}
      <div
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <p
          className="font-serif text-[18px] md:text-[22px] tracking-[8px] text-white/40 uppercase font-light"
          style={{ animation: "preloader-reveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
        >
          Piel Dorada
        </p>
      </div>

      {/* ═══ SINGLE FRAME ═══ */}
      <div className="fixed inset-0 w-full h-full">

        {/* Video — fills everything */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "scale-settle 3s cubic-bezier(0.16,1,0.3,1) 1.8s both" }}
        >
          <source src="/piel-dorada-hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />
        <div className="absolute inset-0 bg-[rgba(201,168,76,0.02)] mix-blend-overlay" />

        {/* ═══ CONTENT COMPOSITION ═══ */}
        <div className="absolute inset-0 z-10 flex flex-col px-6 md:px-14 lg:px-20 py-5 md:py-8">

          {/* ── TOP: Nav ── */}
          <nav
            className="flex items-center justify-between flex-shrink-0"
            style={{ animation: "fade-in 1s ease 3s both" }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[5px] text-white/50 uppercase font-medium">
              Piel Dorada
            </span>
            <div className="flex items-center gap-5 md:gap-7">
              <a
                href="https://instagram.com/danielamirandapmu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] tracking-[3px] text-white/25 uppercase font-medium hover:text-white/60 transition-colors duration-700 hidden md:block"
              >
                Instagram
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] tracking-[3px] text-white/25 uppercase font-medium hover:text-white/60 transition-colors duration-700"
              >
                Contacto
              </a>
            </div>
          </nav>

          {/* ── CENTER: Brand + Info ── */}
          <div className="flex-1 flex flex-col items-center justify-center text-center -mt-2 md:-mt-4">

            {/* Eyebrow */}
            <p
              className="text-[9px] md:text-[10px] tracking-[5px] md:tracking-[7px] text-white/30 uppercase font-medium mb-5 md:mb-7"
              style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 2.4s both" }}
            >
              Beauty & Sun Spa
            </p>

            {/* Brand name — character blur reveal */}
            <h1 className="font-serif text-[46px] md:text-[90px] lg:text-[120px] xl:text-[140px] font-light tracking-[3px] md:tracking-[8px] lg:tracking-[12px] leading-[0.85] uppercase">
              <span className="block">
                <SplitText text="Piel" charClass="text-gradient-gold" staggerDelay={0.06} baseDelay={2.6} />
              </span>
              <span className="block">
                <SplitText text="Dorada" charClass="text-gradient-gold" staggerDelay={0.06} baseDelay={3.0} />
              </span>
            </h1>

            {/* Attribution */}
            <p
              className="text-[12px] md:text-[15px] tracking-[3px] md:tracking-[5px] text-white/70 uppercase font-light mt-6 md:mt-9"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 3.8s both" }}
            >
              by Daniela Miranda Studios
            </p>

            {/* Location */}
            <p
              className="text-[11px] md:text-[13px] tracking-[3px] md:tracking-[4px] text-white/45 uppercase font-light mt-2 md:mt-3"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 4s both" }}
            >
              San Salvador, El Salvador
            </p>

            {/* Divider */}
            <div
              className="w-8 md:w-12 h-px bg-white/15 mt-7 md:mt-10 mb-7 md:mb-10"
              style={{ animation: "line-grow 1s ease-out 4.2s both", transformOrigin: "center" }}
            />

            {/* Date — the announcement */}
            <div style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 4.4s both" }}>
              <p className="font-serif text-[24px] md:text-[34px] lg:text-[40px] font-light text-white/90 tracking-[2px] md:tracking-[4px] leading-none">
                Septiembre 2026
              </p>
              <div className="flex items-center justify-center gap-2.5 mt-3 md:mt-4">
                <span
                  className="w-[5px] h-[5px] rounded-full bg-[#C9A84C]"
                  style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                />
                <span className="text-[9px] md:text-[10px] tracking-[4px] text-[#C9A84C]/70 uppercase font-medium">
                  Apertura
                </span>
              </div>
            </div>
          </div>

          {/* ── BOTTOM: Email + Links ── */}
          <div
            className="flex-shrink-0 pb-1 md:pb-2"
            style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 4.6s both" }}
          >
            {/* Email form */}
            <div className="max-w-[440px] mx-auto mb-5 md:mb-6">
              {!sent ? (
                <form onSubmit={submit}>
                  <p className="text-[9px] md:text-[10px] text-white/20 tracking-[2px] uppercase text-center mb-3 font-medium">
                    S&eacute; la primera en saberlo
                  </p>
                  <div className="flex gap-px">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white text-[12px] md:text-[13px] font-light px-4 md:px-5 py-3 md:py-3.5 rounded-none outline-none transition-all duration-500 focus:border-white/20 focus:bg-white/[0.06] placeholder:text-white/15 placeholder:text-[11px] placeholder:tracking-[1px]"
                    />
                    <button
                      type="submit"
                      className="px-5 md:px-7 py-3 md:py-3.5 bg-white text-black text-[9px] md:text-[10px] tracking-[2px] uppercase font-semibold hover:bg-white/90 active:bg-white/80 transition-colors duration-300 whitespace-nowrap"
                    >
                      Notificarme
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2.5 py-3">
                  <div className="w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-white/40 font-light">Te notificaremos cuando abramos.</p>
                </div>
              )}
            </div>

            {/* Bottom links */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] md:text-[9px] tracking-[3px] text-white/15 uppercase font-medium hover:text-white/40 transition-colors duration-700"
              >
                WhatsApp
              </a>
              <span className="w-px h-2.5 bg-white/8" />
              <a
                href="https://instagram.com/danielamirandapmu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] md:text-[9px] tracking-[3px] text-white/15 uppercase font-medium hover:text-white/40 transition-colors duration-700"
              >
                Instagram
              </a>
              <span className="w-px h-2.5 bg-white/8 hidden md:block" />
              <span className="text-[7px] tracking-[2px] text-white/[0.06] uppercase hidden md:block">
                MachineMind
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
