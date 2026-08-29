"use client";

import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   Apple-style video testimonial showcase.
   Portrait 9:16 cards, gold-glass play button, tap-to-play WITH
   sound (spoken testimonials — never autoplay muted), one at a time.
   ═══════════════════════════════════════════════════════════════ */

type Item = { src: string; poster: string; label: string };

const ITEMS: Item[] = [
  {
    src: "/videos/testimonial-1.mp4",
    poster: "/videos/testimonial-1.jpg",
    label: "Experiencia Piel Dorada",
  },
  {
    src: "/videos/testimonial-2.mp4",
    poster: "/videos/testimonial-2.jpg",
    label: "Experiencia Piel Dorada",
  },
];

export default function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);

  const toggle = (i: number) => {
    const vid = videos.current[i];
    if (!vid) return;
    // Tapping the playing card pauses it.
    if (active === i && !vid.paused) {
      vid.pause();
      setActive(null);
      return;
    }
    // Only one testimonial plays at a time.
    videos.current.forEach((v, j) => {
      if (v && j !== i) v.pause();
    });
    void vid.play().catch(() => {});
    setActive(i);
  };

  return (
    <section className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-8 md:pb-12">
      <div className="max-w-[1000px] mx-auto text-center">
        <p className="section-eyebrow reveal">Testimonios</p>
        <h2 className="section-title reveal font-serif">
          Lo que dicen{" "}
          <span className="text-gradient-gold italic">nuestras clientas</span>
        </h2>
        <p className="section-lead reveal">
          Historias reales de mujeres que ya viven la experiencia Piel Dorada.
          Toca para reproducir con sonido.
        </p>

        <div className="testimonial-grid reveal">
          {ITEMS.map((t, i) => (
            <div
              key={t.src}
              className={`testimonial-card${active === i ? " is-playing" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`Reproducir testimonio ${i + 1}`}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={t.src}
                poster={t.poster}
                playsInline
                preload="none"
                onEnded={() => {
                  const v = videos.current[i];
                  if (v) v.currentTime = 0;
                  setActive(null);
                }}
              />
              <span className="t-scrim" aria-hidden="true" />
              <span className="t-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="t-meta" aria-hidden="true">
                <span className="t-stars">★★★★★</span>
                <span className="t-label">{t.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
