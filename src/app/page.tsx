"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICES, waLink } from "@/lib/site";
import VideoTestimonials from "@/components/VideoTestimonials";
import Icon, { type IconName } from "@/components/Icon";
import Logo from "@/components/Logo";

/* ═══════════════════════════════════════════════════════════════
   PIEL DORADA by Daniela Miranda Studios — Lista VIP
   Single cinematic canvas: fixed video frame, content scrolls over.
   Hero reveal → Lo Que Viene → Lista VIP (waitlist + referrals)
   Supabase-backed via /api/waitlist · Built by MachineMind LLC
   ═══════════════════════════════════════════════════════════════ */

const WA_TEXT_INTRO =
  "✨ Me uní a la lista VIP de Piel Dorada — el primer spa de bronceado de lujo en El Salvador, de Daniela Miranda 👑\n\n" +
  "Únete tú también con mi link y las dos ganamos premios de miembro fundador:\n";

const WA_CONTACT = waLink("Hola ✨ me interesa Piel Dorada — quisiera más información y agendar.");

type VipUser = {
  name: string;
  email: string;
  code: string;
  position: number;
};

const STORAGE_KEY = "pd_user";

const MILESTONES = [
  { n: 3, title: "Laminado de Cejas Gratis", desc: "Invita 3 amigas a la lista" },
  { n: 5, title: "Descuento de Lanzamiento", desc: "Invita 5 amigas — precio especial de apertura" },
  { n: 10, title: "Mes de Bronceado Gratis + Miembro Fundador", desc: "Invita 10 — un mes ilimitado y precio congelado de por vida" },
];

function loadSavedUser(): VipUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (u && typeof u.code === "string" && typeof u.position === "number") return u;
    return null;
  } catch {
    return null;
  }
}

/** Pre-filled WhatsApp confirmation receipt — the person's spot, sent to the studio. */
function confirmText(u: VipUser): string {
  return (
    "✅ Confirmo mi lugar en la Lista VIP de Piel Dorada ✨\n\n" +
    `Nombre: ${u.name}\nPosición: #${u.position}\nMi código VIP: ${u.code}\n\n` +
    "¿Me confirman que quedé en la lista? 💛"
  );
}

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
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

function CountUp({
  to,
  suffix = "",
  duration = 1700,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(eased * to));
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

export default function PielDorada() {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<VipUser | null>(null);
  const [referrals, setReferrals] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [origin, setOrigin] = useState("https://www.pieldoradasv.com");
  const refCodeFromUrl = useRef<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2600);
  }, []);

  const refreshReferrals = useCallback(async (code: string) => {
    try {
      const res = await fetch(`/api/waitlist?code=${encodeURIComponent(code)}`);
      const json = await res.json();
      if (typeof json?.data?.referrals === "number") setReferrals(json.data.referrals);
    } catch (error) {
      console.error("[PielDorada] refreshReferrals", error);
    }
  }, []);

  useEffect(() => {
    // Cinematic preloader: count 0 → 100, then reveal.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (reduce) {
      setCount(100);
      setReady(true);
    } else {
      const start = performance.now();
      const dur = 1900;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * 100));
        if (p < 1) raf = requestAnimationFrame(step);
        else setReady(true);
      };
      raf = requestAnimationFrame(step);
    }
    setOrigin(window.location.origin);
    refCodeFromUrl.current = new URLSearchParams(window.location.search).get("ref");
    const saved = loadSavedUser();
    if (saved) {
      setUser(saved);
      refreshReferrals(saved.code);
    }
    return () => cancelAnimationFrame(raf);
  }, [refreshReferrals]);

  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => refreshReferrals(user.code), 8000);
    return () => clearInterval(id);
  }, [user, refreshReferrals]);

  /* Scroll-triggered reveals for below-the-fold sections */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Scroll parallax — scroller-agnostic (rAF + getBoundingClientRect). */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    if (nodes.length === 0) return;
    let raf = 0;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of nodes) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 through view
        el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(1)}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const join = async () => {
    if (!name.trim()) { toast("Escribe tu nombre 💛"); return; }
    if (!email.trim() || !email.includes("@")) { toast("Escribe un correo válido 💛"); return; }
    if (!whatsapp.trim()) { toast("Escribe tu WhatsApp 💛"); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          ref: refCodeFromUrl.current,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.data) {
        toast(json?.message?.split(" / ")[0] ?? "Algo salió mal, intenta de nuevo 💛");
        return;
      }
      const vip: VipUser = {
        name: json.data.name,
        email: json.data.email,
        code: json.data.code,
        position: json.data.position,
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(vip)); } catch {}
      setUser(vip);
      setReferrals(json.data.referrals ?? 0);
      if (json.data.returning) {
        toast("Ya estabas en la lista — aquí está tu lugar 💛");
      } else {
        // Zero-infra WhatsApp confirmation: open a pre-filled receipt to the studio.
        // Best-effort — if the browser blocks the popup, the success view still shows
        // a guaranteed "Confirmar por WhatsApp" button as the reliable path.
        const confirmHref = waLink(confirmText(vip));
        setTimeout(() => {
          try { window.open(confirmHref, "_blank", "noopener"); } catch {}
        }, 900);
      }
    } catch (error) {
      console.error("[PielDorada] join", error);
      toast("Sin conexión — intenta de nuevo 💛");
    } finally {
      setSubmitting(false);
    }
  };

  const referralLink = user ? `${origin}/?ref=${user.code}` : "";

  const copyText = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(msg);
    } catch {
      // Older in-app browsers (IG/FB webview) without clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); toast(msg); }
      catch { toast("No se pudo copiar — mantén presionado el link 💛"); }
      document.body.removeChild(ta);
    }
  };

  const waShareHref = user
    ? `https://wa.me/?text=${encodeURIComponent(WA_TEXT_INTRO + referralLink)}`
    : "#";

  const waConfirmHref = user ? waLink(confirmText(user)) : "#";

  const ringOffset = user ? Math.max(20, 364 - (user.position % 100) * 3.4) : 364;

  return (
    <div className="grain">
      {/* ═══ PRELOADER ═══ */}
      <div
        className={`preloader fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div style={{ animation: "preloader-reveal 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}>
          <Logo variant="seal" size={76} />
        </div>
        <p
          className="font-serif text-[17px] md:text-[21px] tracking-[8px] text-white/55 uppercase font-light mt-6"
          style={{ animation: "preloader-reveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
        >
          Piel Dorada
        </p>
        <div className="preloader-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <div className="preloader-count" aria-hidden="true">{count}</div>
      </div>

      {/* ═══ FIXED CINEMATIC FRAME — video + overlays behind everything ═══ */}
      <div className="fixed inset-0 w-full h-full z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80 md:from-black/55 md:via-black/20 md:to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 md:from-black/15 md:to-black/15" />
        <div className="absolute inset-0 bg-[rgba(201,168,76,0.02)] mix-blend-overlay" />
      </div>

      {/* ═══ SCROLLING CONTENT ═══ */}
      <div className="relative z-10">

        {/* ── ACT I: HERO — the original single-frame reveal ── */}
        <section className="min-h-screen min-h-[100dvh] flex flex-col safe-top safe-bottom px-5 md:px-14 lg:px-20">

          <nav
            className="flex items-center justify-between flex-shrink-0 pt-1 md:pt-3"
            style={{ animation: "fade-in 1s ease 3s both" }}
          >
            <Logo variant="seal" size={38} className="nav-logo" />
            <a
              href={WA_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="0.3"
              className="text-[9px] tracking-[3px] text-white/40 uppercase font-medium hover:text-white/70 active:text-white/70 transition-colors duration-500"
            >
              Contacto
            </a>
          </nav>

          <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">
            <div
              className="hero-seal mb-5 md:mb-7"
              style={{ animation: "fade-up 1.1s cubic-bezier(0.16,1,0.3,1) 2.1s both" }}
            >
              <Logo variant="seal" size={64} />
            </div>
            <p
              className="text-[8px] md:text-[10px] tracking-[4px] md:tracking-[7px] text-white/35 uppercase font-medium mb-4 md:mb-6"
              style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 2.4s both" }}
            >
              Beauty & Sun Spa
            </p>

            <h1 data-parallax="0.06" className="font-serif text-[52px] md:text-[90px] lg:text-[120px] xl:text-[140px] font-light tracking-[4px] md:tracking-[8px] lg:tracking-[12px] leading-[0.85] uppercase">
              <span className="block">
                <SplitText text="Piel" charClass="text-gradient-gold" staggerDelay={0.06} baseDelay={2.6} />
              </span>
              <span className="block">
                <SplitText text="Dorada" charClass="text-gradient-gold" staggerDelay={0.06} baseDelay={3.0} />
              </span>
            </h1>

            <p
              className="text-[11px] md:text-[15px] tracking-[2px] md:tracking-[5px] text-white/70 uppercase font-light mt-5 md:mt-9"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 3.8s both" }}
            >
              by Daniela Miranda Studios
            </p>

            <p
              className="text-[10px] md:text-[13px] tracking-[2px] md:tracking-[4px] text-white/45 uppercase font-light mt-1.5 md:mt-3"
              style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 4s both" }}
            >
              San Salvador, El Salvador
            </p>

            <div
              className="w-7 md:w-12 h-px bg-white/15 mt-5 md:mt-10 mb-5 md:mb-10"
              style={{ animation: "line-grow 1s ease-out 4.2s both", transformOrigin: "center" }}
            />

            <div style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 4.4s both" }}>
              <p className="font-serif text-[22px] md:text-[34px] lg:text-[40px] font-light text-white/90 tracking-[1px] md:tracking-[4px] leading-none">
                Septiembre 2026
              </p>
              <div className="flex items-center justify-center gap-2 mt-2.5 md:mt-4">
                <span
                  className="w-[5px] h-[5px] rounded-full bg-[#C9A84C]"
                  style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                />
                <span className="text-[8px] md:text-[10px] tracking-[3px] md:tracking-[4px] text-[#C9A84C]/70 uppercase font-medium">
                  Apertura
                </span>
              </div>
            </div>
          </div>

          {/* Hero CTA → Lista VIP */}
          <div
            className="flex-shrink-0 pb-2"
            style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 4.6s both" }}
          >
            <div className="flex flex-col items-center gap-4 mb-4 md:mb-6">
              <a href="#lista-vip" className="hero-cta" data-magnetic="0.4">
                <span>{user ? "Ver Mi Lugar VIP" : "Únete a la Lista VIP"}</span>
                <Icon name="sparkle" size={15} className="hero-cta-spark" />
              </a>
              <span className="scroll-cue" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>

            <div className="flex items-center justify-center gap-5 md:gap-8">
              <a
                href={WA_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] text-white/20 uppercase font-medium hover:text-white/40 active:text-white/40 transition-colors duration-500 py-1"
              >
                WhatsApp
              </a>
              <span className="w-px h-2.5 bg-white/8" />
              <a
                href="https://instagram.com/danielamirandapmu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] text-white/20 uppercase font-medium hover:text-white/40 active:text-white/40 transition-colors duration-500 py-1"
              >
                Instagram
              </a>
              <span className="w-px h-2.5 bg-white/8 hidden md:block" />
              <span className="text-[7px] tracking-[2px] text-white/[0.06] uppercase hidden md:block">
                MachineMind
              </span>
            </div>
          </div>
        </section>

        {/* ── ACT II: LO QUE VIENE ── */}
        <section className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-8 md:pb-12">
          <div className="max-w-[1000px] mx-auto text-center">
            <p className="section-eyebrow reveal">Lo Que Viene</p>
            <h2 className="section-title reveal font-serif">
              Una experiencia que El Salvador
              <br className="hidden md:block" />
              <span className="text-gradient-gold italic"> nunca ha visto</span>
            </h2>
            <p className="section-lead reveal">
              Las primeras camas de bronceado de lujo del país, junto a la micropigmentación
              de la única artista Miss PMU Internacional. Un solo lugar. Un nuevo estándar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-12 md:mt-16">
              <div className="perk reveal">
                <div className="perk-media">
                  <img
                    src="/images/perks/bronceado.jpg"
                    alt="Piel Dorada — visualización del nuevo Beauty & Sun Spa"
                    loading="lazy"
                  />
                  <div className="perk-chip"><Icon name="sun" size={20} /></div>
                </div>
                <div className="perk-body">
                  <h3>Bronceado de Lujo</h3>
                  <p>Las primeras camas de bronceado en El Salvador. Color perfecto, ambiente premium, experiencia controlada y segura.</p>
                </div>
              </div>
              <div className="perk reveal" style={{ transitionDelay: "120ms" }}>
                <div className="perk-media">
                  <img
                    src="/images/perks/pmu.jpg"
                    alt="Daniela Miranda — Miss PMU Internacional"
                    loading="lazy"
                    style={{ objectPosition: "center 22%" }}
                  />
                  <div className="perk-chip"><Icon name="crown" size={20} /></div>
                </div>
                <div className="perk-body">
                  <h3>Miss PMU Internacional</h3>
                  <p>Micropigmentación de cejas y labios con la única artista certificada Miss PMU Internacional del país.</p>
                </div>
              </div>
              <div className="perk reveal" style={{ transitionDelay: "240ms" }}>
                <div className="perk-media">
                  <img
                    src="/images/perks/fundadoras.jpg"
                    alt="Lip blush por Daniela Miranda Studios"
                    loading="lazy"
                  />
                  <div className="perk-chip"><Icon name="gem" size={20} /></div>
                </div>
                <div className="perk-body">
                  <h3>Miembros Fundadores</h3>
                  <p>Las primeras en la lista reciben precio de fundador que se congela para siempre. Solo por tiempo limitado antes de la apertura.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACT II.5: SU ARTE ── */}
        <section className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-8 md:pb-12">
          <div className="max-w-[1000px] mx-auto text-center">
            <p className="section-eyebrow reveal">Su Arte</p>
            <h2 className="section-title reveal font-serif">
              Belleza que <span className="text-gradient-gold italic">traspasa fronteras</span>
            </h2>
            <p className="section-lead reveal">
              Trabajo real del estudio — resultados de clientas reales, de la mano de Daniela.
            </p>

            <div className="gallery-grid mt-12 md:mt-16">
              <div className="gallery-tile reveal">
                <img src="/images/gallery/g1.jpg" alt="Micropigmentación de cejas — resultado real" loading="lazy" />
                <span className="gallery-label">Cejas</span>
              </div>
              <div className="gallery-tile reveal" style={{ transitionDelay: "120ms" }}>
                <img src="/images/gallery/g2.jpg" alt="Lip blush — resultado real" loading="lazy" />
                <span className="gallery-label">Labios</span>
              </div>
              <div className="gallery-tile reveal" style={{ transitionDelay: "240ms" }}>
                <img
                  src="/images/gallery/g3.jpg"
                  alt="Micropigmentación de cejas — resultado real"
                  loading="lazy"
                  style={{ objectPosition: "55% 40%" }}
                />
                <span className="gallery-label">Cejas</span>
              </div>
            </div>

            <a
              href="https://instagram.com/danielamirandapmu"
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-ig reveal"
            >
              Ver más en Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* ── ACT II.6: LA ARTISTA — editorial founder band (E-E-A-T) ── */}
        <section className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-8 md:pb-12">
          <div className="artist-band max-w-[1100px] mx-auto">
            <div className="artist-copy reveal">
              <p className="section-eyebrow">La Artista</p>
              <h2 className="section-title font-serif">
                Arte que se <span className="text-gradient-gold italic">lleva puesto</span>
              </h2>
              <p className="artist-lead">
                Daniela Miranda es la única artista{" "}
                <strong>Miss PMU Internacional</strong> de El Salvador. Cada trazo,
                cada tono y cada detalle nacen de años perfeccionando el arte de
                realzar la belleza natural.
              </p>
              <span className="artist-credential">
                <Icon name="crown" size={16} /> Miss PMU Internacional
              </span>
              <div className="artist-cta-row">
                <Link href="/sobre-daniela" className="artist-cta" data-magnetic="0.3">
                  Conoce su historia
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
            <div className="artist-portrait reveal">
              <img
                src="/images/daniela-miranda.jpg"
                alt="Daniela Miranda — Miss PMU Internacional, fundadora de Piel Dorada"
                loading="lazy"
                data-parallax="0.08"
              />
              <span className="artist-portrait-glow" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── ACT II.75: SERVICIOS — internal links to service pages ── */}
        <section className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-8 md:pb-12">
          <div className="max-w-[1000px] mx-auto text-center">
            <p className="section-eyebrow reveal">Nuestros Servicios</p>
            <h2 className="section-title reveal font-serif">
              Todo tu <span className="text-gradient-gold italic">ritual de belleza</span>
              <br className="hidden md:block" /> en un solo lugar
            </h2>
            <p className="section-lead reveal">
              Bronceado brasileño, micropigmentación, cejas, pestañas, uñas y
              faciales — el primer spa de bronceado de lujo de El Salvador.
            </p>

            <div className="related-grid reveal" style={{ marginTop: "2.5rem", textAlign: "left" }}>
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="related-card" data-magnetic="0.15">
                  <span className="r-icon" aria-hidden="true">
                    <Icon name={s.icon as IconName} size={22} />
                  </span>
                  <span className="r-text">
                    <span className="r-title">{s.nav}</span>
                    <span className="r-sub">Ver servicio →</span>
                  </span>
                </Link>
              ))}
              <Link href="/sobre-daniela" className="related-card" data-magnetic="0.15">
                <span className="r-icon" aria-hidden="true">
                  <Icon name="sparkle" size={22} />
                </span>
                <span className="r-text">
                  <span className="r-title">Sobre Daniela</span>
                  <span className="r-sub">Miss PMU Internacional →</span>
                </span>
              </Link>
              <Link href="/blog" className="related-card" data-magnetic="0.15">
                <span className="r-icon" aria-hidden="true">
                  <Icon name="book" size={22} />
                </span>
                <span className="r-text">
                  <span className="r-title">Blog</span>
                  <span className="r-sub">Guías y consejos →</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── ACT II.9: TESTIMONIOS — video showcase ── */}
        <VideoTestimonials />

        {/* ── ACT III: LISTA VIP ── */}
        <section id="lista-vip" className="px-5 md:px-14 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32 scroll-mt-8">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center">
              <div className="vip-badge reveal"><span className="dot" /> Lista VIP · Cupos Limitados</div>
              <h2 className="section-title reveal font-serif mt-6">
                Sé de las <span className="text-gradient-gold italic">primeras</span> en entrar
              </h2>
              <p className="section-lead reveal">
                Las que están en la lista entran primero — acceso anticipado a la apertura
                y precio de miembro fundador que se congela de por vida.
              </p>
              <div className="vip-stats reveal" aria-label="Más de 247 mujeres ya en la lista">
                <span className="vip-stat">
                  <CountUp to={247} suffix="+" className="vip-stat-num" />
                  <span className="vip-stat-lbl">mujeres ya en la lista</span>
                </span>
                <span className="vip-stat-div" aria-hidden="true" />
                <span className="vip-stat">
                  <span className="vip-stat-num">2026</span>
                  <span className="vip-stat-lbl">apertura septiembre</span>
                </span>
                <span className="vip-stat-div" aria-hidden="true" />
                <span className="vip-stat">
                  <span className="vip-stat-num">1º</span>
                  <span className="vip-stat-lbl">sun spa de El Salvador</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mt-12 md:mt-16">

              {/* Why VIP — the rewards ladder */}
              <div className="reveal">
                <h3 className="font-serif text-[22px] md:text-[26px] font-light text-white/90 mb-2 text-center lg:text-left">
                  Invita a tus amigas, <span className="text-gradient-gold italic">gana premios</span>
                </h3>
                <p className="text-[13px] text-white/50 leading-relaxed mb-6 text-center lg:text-left">
                  Al unirte recibes tu link personal. Cada amiga que entra con tu link te
                  acerca a recompensas de apertura — y las dos ganan.
                </p>
                <div className="milestones !mt-0">
                  {MILESTONES.map((m) => (
                    <div key={m.n} className={`milestone${user && referrals >= m.n ? " reached" : ""}`}>
                      <div className="m-count">{m.n}</div>
                      <div className="m-text">
                        <div className="m-title">{m.title}</div>
                        <div className="m-desc">{m.desc}</div>
                      </div>
                      <div className="m-check"><Icon name="check" size={14} strokeWidth={2} /></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signup card / VIP dashboard */}
              <div className="reveal flex justify-center" style={{ transitionDelay: "120ms" }}>
                <div className="signup-card">
                  {!user ? (
                    <form onSubmit={(e) => { e.preventDefault(); if (!submitting) join(); }}>
                      <h2>Únete a la Lista VIP</h2>
                      <p className="card-sub">
                        Apertura Septiembre 2026. Las primeras en la lista reciben acceso
                        anticipado y precios de miembro fundador que se congelan de por vida.
                      </p>

                      <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <input
                          type="text" id="name" placeholder="Tu nombre"
                          autoComplete="given-name" value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="email">Correo</label>
                        <input
                          type="email" id="email" placeholder="tucorreo@ejemplo.com"
                          autoComplete="email" value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <input
                          type="tel" id="whatsapp" placeholder="7000-0000"
                          autoComplete="tel" value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                        />
                      </div>

                      <button className="btn-primary" type="submit" disabled={submitting}>
                        {submitting ? "Reservando..." : "Reservar Mi Lugar ✨"}
                      </button>
                      <p className="form-note">Te avisamos primero cuando abramos. Sin spam — solo lo importante.</p>
                    </form>
                  ) : (
                    <div className="success-view">
                      <div className="position-ring">
                        <svg viewBox="0 0 130 130">
                          <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(201,160,92,0.18)" strokeWidth="6" />
                          <circle
                            cx="65" cy="65" r="58" fill="none" stroke="#C9A84C" strokeWidth="6"
                            strokeLinecap="round" strokeDasharray="364" strokeDashoffset={ringOffset}
                          />
                        </svg>
                        <div>
                          <div className="num">#{user.position}</div>
                          <div className="lbl">En la lista</div>
                        </div>
                      </div>

                      <h2 style={{ textAlign: "center" }}>
                        ¡Estás dentro, <span>{user.name.split(" ")[0] || "reina"}</span>! 👑
                      </h2>
                      <p className="card-sub" style={{ textAlign: "center" }}>
                        Ahora la parte buena: <strong>invita a tus amigas y sube en la lista</strong>.
                        Mientras más invitas, más premios desbloqueas.
                      </p>

                      <a
                        className="confirm-wa"
                        href={waConfirmHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic="0.25"
                      >
                        <Icon name="check" size={17} strokeWidth={2} />
                        Confirmar mi lugar por WhatsApp
                      </a>

                      <div className="count-badge">
                        {referrals === 1 ? "1 amiga invitada" : `${referrals} amigas invitadas`}
                      </div>

                      <div className="referral-box">
                        <div className="code-label">Tu link personal para invitar</div>
                        <div className="referral-link">
                          <input type="text" value={referralLink} readOnly onFocus={(e) => e.target.select()} />
                          <button
                            className="copy-btn" type="button"
                            onClick={() => copyText(referralLink, "¡Link copiado! Compártelo 💛")}
                          >
                            Copiar
                          </button>
                        </div>
                        <div className="share-row">
                          <a className="share-btn share-wa" href={waShareHref} target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp
                          </a>
                          <button
                            className="share-btn share-ig" type="button"
                            onClick={() => copyText(referralLink, "Link copiado — pégalo en tu historia de IG 📸")}
                          >
                            📸 Instagram
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="text-center px-5 pb-10 safe-bottom pt-4">
          <div className="w-10 h-px bg-white/10 mx-auto mb-8" />
          <Logo variant="seal" size={56} className="footer-seal" />
          <div className="font-serif italic text-[22px] text-gradient-gold mb-2 mt-5">Piel Dorada</div>
          <div className="text-[9px] tracking-[3px] uppercase text-white/40 font-medium mb-5">
            by Daniela Miranda Studios
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6 max-w-lg mx-auto">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="text-[10px] tracking-[2px] uppercase text-white/35 hover:text-white/70 transition-colors duration-500"
              >
                {s.nav}
              </Link>
            ))}
            <Link href="/sobre-daniela" className="text-[10px] tracking-[2px] uppercase text-white/35 hover:text-white/70 transition-colors duration-500">
              Sobre Daniela
            </Link>
            <Link href="/blog" className="text-[10px] tracking-[2px] uppercase text-white/35 hover:text-white/70 transition-colors duration-500">
              Blog
            </Link>
            <Link href="/contacto" className="text-[10px] tracking-[2px] uppercase text-white/35 hover:text-white/70 transition-colors duration-500">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center justify-center gap-5 md:gap-8 mb-6">
            <a
              href={WA_CONTACT}
              target="_blank" rel="noopener noreferrer"
              className="text-[9px] tracking-[2px] text-white/25 uppercase font-medium hover:text-white/50 transition-colors duration-500"
            >
              WhatsApp
            </a>
            <span className="w-px h-2.5 bg-white/8" />
            <a
              href="https://instagram.com/danielamirandapmu"
              target="_blank" rel="noopener noreferrer"
              className="text-[9px] tracking-[2px] text-white/25 uppercase font-medium hover:text-white/50 transition-colors duration-500"
            >
              Instagram
            </a>
          </div>
          <div className="text-[9px] tracking-[1px] text-white/20">
            San Salvador, El Salvador · Apertura Septiembre 2026
          </div>
        </footer>
      </div>

      <div className={`toast${toastMsg ? " show" : ""}`}>{toastMsg}</div>
    </div>
  );
}
