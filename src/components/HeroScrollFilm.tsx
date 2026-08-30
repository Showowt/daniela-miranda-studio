"use client";

/* ═══════════════════════════════════════════════════════════════
   HeroScrollFilm — Apple-style scroll-scrubbed cinematic hero.
   The Piel Dorada brand film is drawn frame-by-frame to a <canvas>
   whose frame index is driven by scroll position. A tall stage is
   pinned via CSS `position: sticky` (NOT GSAP pin — avoids the
   React unmount removeChild crash). Frames preloaded from /hero-seq.
   Golden skin → PIEL DORADA logo reveal → dream-spa, under the
   user's finger. Overlays fade at scroll milestones.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

const FRAME_COUNT = 104;
const framePath = (i: number) => `/hero-seq/f-${String(i).padStart(3, "0")}.jpg`;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgsRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef(0);

  const [intro, setIntro] = useState(1);
  const [end, setEnd] = useState(0);
  const [reduce, setReduce] = useState(false);

  /* Draw the frame nearest to the current scroll progress (cover-fit). */
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const p = progressRef.current;
    let idx = Math.round(p * (FRAME_COUNT - 1));
    idx = Math.min(FRAME_COUNT - 1, Math.max(0, idx));

    // Fall back to the nearest already-loaded frame (graceful during preload).
    const loaded = loadedRef.current;
    if (!loaded[idx]) {
      let found = -1;
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && loaded[idx - d]) { found = idx - d; break; }
        if (idx + d < FRAME_COUNT && loaded[idx + d]) { found = idx + d; break; }
      }
      if (found === -1) return;
      idx = found;
    }

    const img = imgsRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (cr > ir) {
      dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2;
    } else {
      dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    draw();
  };

  /* Preload every frame; draw the first as soon as it arrives. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduced);

    const imgs: HTMLImageElement[] = [];
    const loaded: boolean[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const idx = i - 1;
      loaded[idx] = false;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[idx] = true;
        // First frame or the reduced-motion still — paint immediately.
        if (idx === 0 || reduced) draw();
      };
      img.src = framePath(i);
      imgs[idx] = img;
    }
    imgsRef.current = imgs;
    loadedRef.current = loaded;

    // Reduced motion: hold on a late "dream-spa" frame, show the CTA.
    if (reduced) {
      progressRef.current = 0.82;
      setIntro(0);
      setEnd(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Scroll → progress → frame + overlay opacities (rAF-throttled). */
  useEffect(() => {
    resize();
    if (reduce) return; // static in reduced-motion; no scroll binding

    let ticking = false;
    const compute = () => {
      const stage = stageRef.current;
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - window.innerHeight;
        const scrolled = Math.min(total, Math.max(0, -rect.top));
        const p = total > 0 ? scrolled / total : 0;
        progressRef.current = p;
        setIntro(1 - ramp(p, 0.04, 0.16));
        setEnd(ramp(p, 0.74, 0.9));
        draw();
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(compute);
      }
    };
    const onResize = () => { resize(); compute(); };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

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
        <canvas ref={canvasRef} className="hero-film-canvas" aria-hidden="true" />
        <img src="/hero-film-poster.jpg" alt="" className="hero-film-fallback" aria-hidden="true" />
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
