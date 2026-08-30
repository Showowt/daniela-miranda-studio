"use client";

/* ═══════════════════════════════════════════════════════════════
   HeroScrollFilm — Apple-style scroll-scrubbed cinematic hero.
   The Piel Dorada brand film is scrubbed by driving the <video>
   element's currentTime from scroll position (lightweight: one
   video decode, no 100-image preload). Stage pinned via CSS
   `position: sticky` (NOT GSAP pin — avoids the React unmount
   removeChild crash). The film is re-encoded with dense keyframes
   (/hero-film.mp4) so seeking is snappy. Golden skin → PIEL DORADA
   logo reveal → dream-spa, under the user's finger. Overlays fade
   at scroll milestones. Poster + reduced-motion fallbacks.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** ramp: 0 below `from`, 1 above `to`, linear between */
const ramp = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

export default function HeroScrollFilm({
  ctaLabel,
  ctaHref,
  contactHref,
}: {
  ctaLabel: string;
  ctaHref: string;
  contactHref: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef(0);

  const [intro, setIntro] = useState(1);
  const [end, setEnd] = useState(0);
  const [reduce, setReduce] = useState(false);

  /* Prime iOS/Safari decoding: a muted play→pause wakes the decoder so
     currentTime seeks actually paint frames (iOS shows only the poster
     otherwise). Safe no-op elsewhere. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const prime = () => {
      const p = v.play();
      if (p && typeof p.then === "function") p.then(() => v.pause()).catch(() => {});
    };
    const onMeta = () => { durationRef.current = v.duration || 0; };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();
    prime();
    const onFirst = () => prime();
    window.addEventListener("touchstart", onFirst, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirst, { once: true });
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("pointerdown", onFirst);
    };
  }, []);

  /* Scroll → currentTime + overlay opacities (rAF-throttled). */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduced);
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage) return;

    if (reduced) {
      // Static: hold on a late "dream-spa" frame, show the CTA.
      const seekLate = () => { if (v.duration) { try { v.currentTime = v.duration * 0.85; } catch {} } };
      if (v.readyState >= 1) seekLate();
      else v.addEventListener("loadeddata", seekLate, { once: true });
      setIntro(0);
      setEnd(1);
      return () => v.removeEventListener("loadeddata", seekLate);
    }

    let ticking = false;
    const compute = () => {
      const rect = stage.getBoundingClientRect();
      const total = stage.offsetHeight - window.innerHeight;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = total > 0 ? scrolled / total : 0;

      const dur = durationRef.current || v.duration || 0;
      if (dur > 0 && v.readyState >= 1) {
        const t = Math.min(dur - 0.05, Math.max(0, p * dur));
        if (Math.abs(v.currentTime - t) > 0.03) {
          try { v.currentTime = t; } catch {}
        }
      }
      setIntro(1 - ramp(p, 0.04, 0.16));
      setEnd(ramp(p, 0.74, 0.9));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className={`hero-film-stage${reduce ? " is-static" : ""}`}
      aria-label="Piel Dorada — película de marca"
    >
      {/* SEO / a11y title — delivered visually by the film's own logo reveal */}
      <h1 className="sr-only">
        Piel Dorada — Beauty &amp; Sun Spa en San Salvador, El Salvador
      </h1>

      <div className="hero-film-sticky">
        <video
          ref={videoRef}
          className="hero-film-canvas"
          src="/hero-film.mp4"
          poster="/hero-film-poster.jpg"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
          webkit-playsinline="true"
          x5-playsinline="true"
        />
        <div className="hero-film-scrim" aria-hidden="true" />

        {/* Top chrome */}
        <nav className="hero-film-nav">
          <Logo variant="seal" size={38} className="nav-logo" />
          <a
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic="0.3"
            className="hero-film-contact"
          >
            Contacto
          </a>
        </nav>

        {/* Intro overlay — golden-skin shot */}
        <div className="hero-film-intro" style={{ opacity: intro }} aria-hidden={intro < 0.05}>
          <p className="hero-film-eyebrow">Beauty &amp; Sun Spa</p>
          <p className="hero-film-place">San Salvador · El Salvador</p>
          <span className="hero-film-cue" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* End overlay — dream-spa shot → CTA */}
        <div className="hero-film-end" style={{ opacity: end }} aria-hidden={end < 0.05}>
          <p className="hero-film-open">
            <span className="dot" aria-hidden="true" /> Apertura Septiembre 2026
          </p>
          <a href={ctaHref} className="hero-cta" data-magnetic="0.4">
            <span>{ctaLabel}</span>
            <Icon name="sparkle" size={15} className="hero-cta-spark" />
          </a>
        </div>
      </div>
    </section>
  );
}
