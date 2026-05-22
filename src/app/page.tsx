"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   DANIELA MIRANDA STUDIO — Cinema Engine Build
   "Belleza que traspasa fronteras"
   Built by MachineMind LLC
   ═══════════════════════════════════════════════════════════════ */

// ═══ DATA ═══
const SERVICES = [
  {
    id: "cejas",
    title: "Micropigmentación de Cejas",
    techniques: "Powder Brows · Microblading · Nano Brows",
    desc: "Diseño personalizado según la morfología de tu rostro. Pigmentos premium importados. Resultado ultra-natural que dura 1–2 años.",
    price: "$100",
    duration: "2–3 horas",
    includes: ["Consulta y diseño con visagismo", "Anestesia tópica premium", "Procedimiento completo", "Kit de cuidados post-PMU", "Retoque incluido (30–45 días)"],
  },
  {
    id: "labios",
    title: "Micropigmentación de Labios",
    techniques: "Full Lip Blush · Contorno + Relleno",
    desc: "Labios definidos con color permanente y efecto jugoso. Rejuvenece, corrige asimetrías y elimina la necesidad de labial diario.",
    price: "$100",
    duration: "2–3 horas",
    includes: ["Selección de tono personalizada", "Diseño con fotografía de referencia", "Procedimiento completo", "Kit de cuidados post-PMU", "Retoque incluido (30–45 días)"],
  },
  {
    id: "hydralips",
    title: "Hydra Lips",
    techniques: "Hidratación Profunda · Micro-Needling",
    desc: "Tratamiento signature. Micro-needling con ácido hialurónico y pigmentación sutil para labios hidratados y voluminosos.",
    price: "$80",
    duration: "1.5–2 horas",
    badge: "SIGNATURE",
    includes: ["Limpieza y preparación labial", "Ácido hialurónico + vitaminas", "Micropigmentación sutil", "Efecto glass lip natural", "Seguimiento post-tratamiento"],
  },
  {
    id: "babylips",
    title: "Baby Lips",
    techniques: "Tinte Sutil · Efecto Natural",
    desc: "La versión más suave de labios pigmentados. Ideal como primera experiencia PMU.",
    price: "$80",
    duration: "1.5–2 horas",
    includes: ["Consulta de tono y expectativas", "Diseño conservador", "Pigmentación sutil", "Kit de cuidados", "Retoque incluido (30–45 días)"],
  },
  {
    id: "retoque",
    title: "Retoque & Corrección",
    techniques: "Refresh · Corrección Cromática",
    desc: "Restauramos y corregimos trabajos previos con técnicas avanzadas de corrección cromática.",
    price: "$60",
    duration: "1–2 horas",
    includes: ["Evaluación del trabajo previo", "Plan de corrección personalizado", "Procedimiento de restauración", "Seguimiento y control"],
  },
];

const FAQS = [
  { q: "¿Duele la micropigmentación?", a: "Aplicamos anestesia tópica antes y durante el procedimiento. La mayoría de clientas describen la sensación como una leve molestia, no dolor." },
  { q: "¿Cuánto dura el resultado?", a: "Entre 1 y 2 años dependiendo de tu tipo de piel y cuidados. Un retoque anual mantiene el resultado perfecto." },
  { q: "¿Cómo es la sanación?", a: "Los primeros 3–5 días el color se ve más intenso. Entre el día 5–10 la piel se descama suavemente. Color final al día 28–30." },
  { q: "¿Puedo elegir forma y color?", a: "Absolutamente. Hacemos un diseño completo con lápiz que apruebas tú. Usamos visagismo para encontrar la forma perfecta para TU rostro." },
  { q: "¿Qué es Hydra Lips?", a: "Nuestro tratamiento signature: micro-needling con ácido hialurónico y pigmentación sutil. Labios hidratados con color natural que dura meses." },
  { q: "¿Es seguro?", a: "Agujas estériles desechables. Pigmentos premium libres de metales pesados. Protocolos estrictos de bioseguridad." },
  { q: "¿Incluye retoque?", a: "Sí. Todos los servicios incluyen retoque gratuito entre 30–45 días después del procedimiento inicial." },
];

const GALLERY = [
  { label: "Técnica Híbrida", cat: "Cejas", image: "/images/gallery-1.jpg" },
  { label: "Full Lip Blush", cat: "Labios", image: "/images/gallery-2.jpg" },
  { label: "Lip Blush Natural", cat: "Labios", image: "/images/gallery-3.jpg" },
  { label: "Cejas Definidas", cat: "Cejas", image: "/images/gallery-4.jpg" },
  { label: "Cejas + Labios", cat: "Combo", image: "/images/gallery-5.jpg" },
  { label: "Resultado Natural", cat: "Cejas", image: "/images/gallery-6.jpg" },
];

// ═══ COMPONENTS ═══
function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// ═══ MAIN ═══
export default function DanielaMirandaStudio() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    const timer = setTimeout(() => setPreloaderDone(true), 1600);
    return () => { window.removeEventListener("scroll", h); clearTimeout(timer); };
  }, []);

  const go = (id: string) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const wa = "https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20quiero%20agendar%20una%20cita";
  const waze = "https://waze.com/ul/hd42tckukc";
  const navItems: [string, string][] = [["Servicios", "servicios"], ["Resultados", "galeria"], ["Daniela", "about"], ["FAQ", "faq"]];

  return (
    <div className="relative min-h-screen">

      {/* ═══ PRELOADER ═══ */}
      <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream-light transition-all duration-1000 ${preloaderDone ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="font-serif italic text-[48px] md:text-[64px] text-rose-dark" style={{ animation: "preloader-breathe 2s ease-in-out infinite" }}>dm</div>
        <div className="w-10 h-px bg-rose mt-3" style={{ animation: "preloader-line 1.5s ease-in-out infinite" }} />
        <div className="text-[8px] tracking-[5px] text-text-light uppercase mt-5 font-semibold">Daniela Miranda Studio</div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-500 ${scrolled ? "py-3 px-5 md:px-10 glass-nav border-b border-blush/20" : "py-4 md:py-5 px-5 md:px-10 bg-transparent"}`}>
        <div className="cursor-pointer group" onClick={() => go("hero")}>
          <span className="font-serif text-[22px] md:text-[24px] font-normal italic text-rose-dark tracking-wider">dm</span>
          <span className="text-[8px] tracking-[4px] text-rose/60 font-semibold ml-2 uppercase">Studio</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(([label, id]) => (
            <span key={id} onClick={() => go(id)} className="relative text-[10px] tracking-[2px] uppercase text-text-muted cursor-pointer font-semibold hover:text-rose transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-rose after:transition-all after:duration-300 hover:after:w-full">{label}</span>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="ml-4 px-6 py-2.5 bg-rose text-white text-[9px] font-bold tracking-[2px] uppercase no-underline hover:bg-rose-dark transition-all duration-400 hover:shadow-[0_6px_20px_rgba(183,110,121,0.2)]">Reservar</a>
        </div>

        <button className="flex md:hidden flex-col gap-[5px] p-2" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
          <span className={`block w-5 h-[1.5px] bg-rose-dark transition-all duration-300 origin-center ${mobileMenu ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-rose-dark transition-all duration-300 ${mobileMenu ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-rose-dark transition-all duration-300 origin-center ${mobileMenu ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] bg-cream-light/[0.98] backdrop-blur-2xl flex md:hidden flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navItems.map(([label, id]) => (
          <span key={id} onClick={() => go(id)} className="text-xl font-serif italic text-text-dark cursor-pointer hover:text-rose transition-colors">{label}</span>
        ))}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">Agendar Cita</a>
      </div>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(238,201,205,0.1) 0%, transparent 50%), #FBF5EE` }}>
        {/* Decorative — hidden on small mobile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 md:h-28 bg-gradient-to-b from-transparent via-blush/50 to-transparent" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-blush/[0.06] pointer-events-none" style={{ animation: "rotate-slow 80s linear infinite" }} />

        <FadeIn delay={0.2}>
          <div className="text-[8px] md:text-[9px] tracking-[4px] md:tracking-[5px] text-blush-muted font-semibold uppercase mb-6 md:mb-8">Skylight Center · San Salvador</div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="font-serif italic text-[72px] md:text-[100px] lg:text-[120px] font-light text-rose-dark leading-[0.85] mb-2 relative">
            dm
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.55}>
          <h1 className="font-serif text-[22px] md:text-[32px] lg:text-[40px] font-normal text-void tracking-[3px] md:tracking-[5px] uppercase leading-tight mt-5 mb-1.5">Daniela Miranda</h1>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div className="text-[8px] md:text-[9px] tracking-[4px] md:tracking-[6px] text-rose font-semibold uppercase mb-10 md:mb-12">Design & Micropigmentation Studio</div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="text-[13px] text-text-muted max-w-xs md:max-w-sm leading-relaxed mb-1 font-light">La única artista con título</p>
          <p className="font-serif text-[22px] md:text-[28px] font-normal italic text-rose-dark leading-snug mb-1">Miss PMU Internacional</p>
          <p className="text-[11px] md:text-[12px] text-text-light tracking-[2px] mb-3">en El Salvador</p>
        </FadeIn>

        <FadeIn delay={0.9}>
          <div className="flex gap-2 justify-center mb-6 text-[18px] md:text-[20px]">
            {["🇸🇻","🇵🇪","🇪🇸","🇲🇽","🇧🇷"].map((flag, i) => (
              <span key={i} className="hover:scale-125 transition-transform duration-300 cursor-default">{flag}</span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.95}>
          <p className="font-serif text-[15px] md:text-[17px] italic text-rose/70 tracking-wide mb-10 md:mb-12">&ldquo;Belleza que traspasa fronteras&rdquo;</p>
        </FadeIn>

        <FadeIn delay={1.05}>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">Agendar Mi Cita</a>
            <button onClick={() => go("servicios")} className="btn-outline">Ver Servicios</button>
          </div>
        </FadeIn>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[7px] tracking-[3px] text-blush-muted font-semibold uppercase">Descubre</span>
          <div className="w-px h-8 bg-gradient-to-b from-rose/40 to-transparent animate-pulse-line" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-void py-8 md:py-10 px-5 border-y border-rose/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-5 md:gap-12">
          {[
            { icon: "👑", text: "Miss PMU Internacional" },
            { icon: "🌎", text: "Certificada en 5 Países" },
            { icon: "📜", text: "Técnicas Avanzadas" },
            { icon: "💎", text: "Experiencia de Lujo" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex items-center gap-2.5 text-[10px] md:text-[11px] text-blush/80 tracking-[1px] md:tracking-[2px] font-light uppercase">
                <span className="text-base md:text-lg">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-16 md:py-36 px-5">
        <div className="max-w-[1080px] mx-auto">
          {/* Daniela photo + bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-16 md:mb-24">
            <FadeIn>
              <div className="relative max-w-[380px] mx-auto md:max-w-none">
                <div className="relative aspect-[3/4] overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/daniela-miranda.jpg" alt="Daniela Miranda" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-8 md:w-10 h-8 md:h-10 border-t border-l border-rose/30" />
                  <div className="absolute bottom-4 right-4 w-8 md:w-10 h-8 md:h-10 border-b border-r border-rose/30" />
                  <div className="absolute bottom-5 md:bottom-8 left-5 md:left-8 bg-void/50 backdrop-blur-md px-4 py-2">
                    <div className="text-[7px] md:text-[8px] tracking-[3px] text-blush font-semibold uppercase">Miss PMU Internacional 2023</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <div className="section-label">Sobre Daniela</div>
                <div className="w-8 md:w-10 h-px bg-rose mb-8" />
                <h2 className="font-serif text-[26px] md:text-[36px] lg:text-[42px] font-light text-void leading-[1.15] mb-6">
                  Del mundo del modelaje<br />
                  <span className="text-rose italic">al arte de la micropigmentaci&oacute;n</span>
                </h2>
                <p className="text-[13px] md:text-[14px] text-text-muted leading-[1.85] mb-4 font-light">
                  Modelo profesional, coronada Miss PMU Internacional y Miss Beauty
                  World International 2023. Daniela Miranda transform&oacute; su pasi&oacute;n
                  por la belleza en un arte: la micropigmentaci&oacute;n con est&aacute;ndares
                  internacionales, certificada en cinco pa&iacute;ses.
                </p>
                <p className="text-[13px] md:text-[14px] text-text-muted leading-[1.85] mb-8 font-light">
                  Cada procedimiento en su studio es una experiencia personalizada
                  de lujo &mdash; dise&ntilde;o con visagismo, pigmentos premium importados,
                  y t&eacute;cnica con reconocimiento internacional.
                </p>

                <blockquote className="font-serif text-[16px] md:text-[18px] italic text-rose-dark leading-[1.7] mb-10 pl-5 border-l border-rose/30">
                  &ldquo;No busco seguidoras. Busco mujeres que merezcan llevar
                  la mejor versi&oacute;n de s&iacute; mismas.&rdquo;
                </blockquote>

                <div className="flex gap-6 md:gap-8">
                  {[{ n: "5", l: "Países" }, { n: "500+", l: "Clientas" }, { n: "2023", l: "Miss PMU" }].map((s, i) => (
                    <div key={i} className="stat-item pr-6 md:pr-8">
                      <div className="font-serif text-[28px] md:text-[34px] text-rose font-light leading-none">{s.n}</div>
                      <div className="text-[8px] md:text-[9px] tracking-[2px] text-text-light mt-1.5 uppercase font-semibold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Certification graphic — centered below bio */}
          <FadeIn delay={0.1}>
            <div className="max-w-[320px] md:max-w-[380px] mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/certificada-internacional.png" alt="Certificada Internacionalmente" className="w-full h-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WORK SHOWCASE ═══ */}
      <section className="relative bg-void overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Cejas */}
          <FadeIn>
            <div className="relative group overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-cejas.jpg" alt="Micropigmentación de Cejas — Resultado real" className="w-full aspect-[4/3] md:aspect-[3/2] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="text-[8px] md:text-[9px] tracking-[3px] text-blush-muted/70 uppercase font-semibold mb-1.5">Resultado Real</div>
                <div className="font-serif text-[20px] md:text-[24px] text-white italic font-light leading-tight">Micropigmentación de Cejas</div>
                <div className="text-[10px] md:text-[11px] text-blush/60 mt-2 tracking-[1px]">Técnica Híbrida · Efecto Natural</div>
              </div>
            </div>
          </FadeIn>

          {/* Labios */}
          <FadeIn delay={0.15}>
            <div className="relative group overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-lips.jpg" alt="Full Lip Blush — Resultado real" className="w-full aspect-[4/3] md:aspect-[3/2] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="text-[8px] md:text-[9px] tracking-[3px] text-blush-muted/70 uppercase font-semibold mb-1.5">Resultado Real</div>
                <div className="font-serif text-[20px] md:text-[24px] text-white italic font-light leading-tight">Full Lip Blush</div>
                <div className="text-[10px] md:text-[11px] text-blush/60 mt-2 tracking-[1px]">Color Perfecto · Acabado Jugoso</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="servicios" className="py-16 md:py-32 px-5 bg-white border-y border-blush/20">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <div className="section-label">Servicios</div>
              <h2 className="font-serif text-[26px] md:text-[38px] lg:text-[44px] font-light text-void leading-tight max-w-md mx-auto">
                Técnicas internacionales, <span className="text-rose italic">resultado natural</span>
              </h2>
              <div className="w-8 md:w-10 h-px bg-rose mx-auto mt-6 md:mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const isOpen = openService === i;
              return (
                <FadeIn key={s.id} delay={i * 0.06}>
                  <div onClick={() => setOpenService(isOpen ? null : i)} className={`service-card ${isOpen ? "active" : ""}`}>
                    {s.badge && (
                      <div className="absolute top-4 right-4 text-[7px] md:text-[8px] tracking-[2px] text-rose font-bold bg-blush/30 px-2.5 py-1 uppercase">{s.badge}</div>
                    )}
                    <h3 className="font-serif text-[18px] md:text-[20px] font-medium text-void mb-1.5 leading-tight pr-16">{s.title}</h3>
                    <div className="text-[9px] md:text-[10px] text-rose tracking-[1px] mb-3 font-medium">{s.techniques}</div>
                    <p className="text-[12px] md:text-[13px] text-text-muted leading-[1.75] mb-4 font-light">{s.desc}</p>

                    <div className="overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: isOpen ? 350 : 0 }}>
                      <div className="border-t border-blush/25 pt-4 mt-1 pb-1">
                        <div className="text-[8px] md:text-[9px] tracking-[3px] text-rose font-bold mb-2.5 uppercase">Incluye</div>
                        {s.includes.map((item, j) => (
                          <div key={j} className="text-[11px] md:text-[12px] text-text-muted py-[5px] flex items-center gap-2.5 font-light">
                            <span className="w-1 h-1 rounded-full bg-rose/40 flex-shrink-0" />{item}
                          </div>
                        ))}
                        <div className="mt-3 text-[10px] text-text-light tracking-[1px]">{s.duration}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-cream-dark/30">
                      <div>
                        <span className="text-[9px] text-text-light tracking-[1px] block">Desde</span>
                        <span className="font-serif text-[22px] md:text-[24px] text-rose-dark font-light">{s.price}</span>
                      </div>
                      <a href={`https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20me%20interesa%20${encodeURIComponent(s.title)}`} target="_blank" rel="noopener noreferrer" className="text-[9px] tracking-[2px] text-rose font-bold no-underline hover:text-rose-dark transition-colors uppercase group" onClick={(e) => e.stopPropagation()}>
                        Agendar <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{"→"}</span>
                      </a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-16 md:py-32 px-5 bg-cream-light">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <div className="section-label">Tu Experiencia</div>
              <h2 className="font-serif text-[26px] md:text-[38px] font-light text-void leading-tight max-w-sm mx-auto">
                Cómo funciona tu <span className="text-rose italic">transformación</span>
              </h2>
              <div className="w-8 md:w-10 h-px bg-rose mx-auto mt-6 md:mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative">
            <div className="hidden lg:block absolute top-[22px] left-[14%] right-[14%] h-px bg-blush/20" />
            {[
              { n: "01", t: "Consulta", d: "Evaluamos tu rostro y expectativas. Sin compromiso." },
              { n: "02", t: "Diseño", d: "Visagismo profesional. Tú apruebas cada detalle." },
              { n: "03", t: "Procedimiento", d: "Pigmentos premium, técnica internacional. 2–3 hrs." },
              { n: "04", t: "Cuidados", d: "Kit post-PMU y retoque incluido a los 30–45 días." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-full border border-blush flex items-center justify-center mx-auto mb-4 md:mb-5 bg-cream-light relative z-10">
                    <span className="font-serif text-[13px] md:text-[14px] text-rose italic">{p.n}</span>
                  </div>
                  <h4 className="font-serif text-[16px] md:text-[18px] text-void font-medium mb-2">{p.t}</h4>
                  <p className="text-[11px] md:text-[12px] text-text-muted leading-[1.7] font-light">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="galeria" className="py-16 md:py-32 px-0 md:px-5 bg-void">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16 px-5">
              <div className="section-label !text-blush-muted">@danielamirandapmu</div>
              <h2 className="font-serif text-[26px] md:text-[38px] font-light text-blush leading-tight max-w-md mx-auto mb-2">
                Resultados <span className="text-rose-light italic">reales</span>
              </h2>
              <p className="text-[12px] md:text-[13px] text-blush-muted/50 max-w-xs mx-auto font-light">Cada rostro es único. Cada resultado es personalizado.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px md:gap-[3px]">
            {GALLERY.map((g, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <a href="https://www.instagram.com/danielamirandapmu/" target="_blank" rel="noopener noreferrer" className="gallery-item aspect-square block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image} alt={g.label} className="w-full h-full object-cover" />
                  <div className="gallery-overlay">
                    <div className="text-[8px] md:text-[9px] tracking-[3px] text-blush-muted/70 uppercase font-semibold">{g.cat}</div>
                    <div className="font-serif text-[14px] md:text-[17px] text-white italic">{g.label}</div>
                    <div className="w-5 h-px bg-rose/50 mt-1.5" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-10 md:mt-14 flex gap-6 justify-center px-5">
              <a href="https://www.instagram.com/danielamirandapmu/" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-blush-muted/60 tracking-[2px] no-underline hover:text-rose-light transition-colors uppercase font-semibold">Instagram {"→"}</a>
              <a href="https://www.tiktok.com/@danielamirandastudio" target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-blush-muted/60 tracking-[2px] no-underline hover:text-rose-light transition-colors uppercase font-semibold">TikTok {"→"}</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-32 px-5 bg-cream-light">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16">
              <div className="section-label">Confianza</div>
              <h2 className="font-serif text-[26px] md:text-[38px] font-light text-void leading-tight">
                Lo que dicen nuestras <span className="text-rose italic">clientas</span>
              </h2>
              <div className="w-8 md:w-10 h-px bg-rose mx-auto mt-6" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { text: "Nunca pensé que unas cejas pudieran cambiar tanto mi cara. Daniela es una artista. Me veo más joven y segura sin maquillaje.", name: "Andrea R.", service: "Powder Brows" },
              { text: "El Hydra Lips fue increíble. Mis labios se ven hidratados y con un color hermoso. La experiencia es de otro nivel.", name: "María José L.", service: "Hydra Lips" },
              { text: "Me hice el lip blush y quedé enamorada. El color es exactamente lo que quería. Daniela es muy profesional.", name: "Carolina S.", service: "Lip Blush" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testimonial-card h-full flex flex-col">
                  <div className="font-serif text-[36px] md:text-[40px] text-rose/15 leading-none mb-3">&ldquo;</div>
                  <p className="text-[12px] md:text-[13px] text-text-muted leading-[1.85] flex-1 mb-6 font-light">{t.text}</p>
                  <div className="border-t border-blush/20 pt-4">
                    <div className="text-text-dark text-[12px] md:text-[13px] font-medium">{t.name}</div>
                    <div className="text-rose text-[8px] md:text-[9px] tracking-[2px] mt-0.5 uppercase font-semibold">{t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 md:py-32 px-5 bg-white">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-20 items-start">
          <FadeIn>
            <div className="md:sticky md:top-32">
              <div className="section-label">FAQ</div>
              <div className="w-8 md:w-10 h-px bg-rose mb-8" />
              <h2 className="font-serif text-[24px] md:text-[34px] font-light text-void leading-[1.15] mb-5">
                Todo lo que necesitas <span className="text-rose italic">saber</span>
              </h2>
              <p className="text-[13px] md:text-[14px] text-text-muted leading-[1.85] font-light mb-6">¿Otra pregunta? Escríbenos por WhatsApp.</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline !text-[9px] !px-6 !py-3">Escribir por WhatsApp</a>
            </div>
          </FadeIn>

          <div>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.04}>
                  <div onClick={() => setOpenFaq(isOpen ? null : i)} className={`faq-item ${isOpen ? "active" : ""}`}>
                    <div className="flex justify-between items-center gap-3">
                      <h4 className={`font-serif text-[15px] md:text-[17px] font-medium transition-colors duration-300 ${isOpen ? "text-rose" : "text-void"}`}>{f.q}</h4>
                      <div className="faq-toggle">
                        <span style={{ display: "block", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>+</span>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: isOpen ? 200 : 0 }}>
                      <p className="text-[12px] md:text-[13px] text-text-muted leading-[1.85] pt-3 font-light">{f.a}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-32 px-5 text-center border-t border-blush/15" style={{ background: `linear-gradient(180deg, rgba(238,201,205,0.06) 0%, #FBF5EE 40%, rgba(238,201,205,0.03) 100%)` }}>
        <FadeIn>
          <div className="section-label mb-4">¿Lista para tu transformación?</div>
          <h2 className="font-serif text-[28px] md:text-[42px] lg:text-[48px] font-light text-void leading-tight mb-4">
            Tu mejor versión <span className="text-rose italic">empieza aquí</span>
          </h2>
          <p className="text-[13px] md:text-[14px] text-text-muted max-w-sm mx-auto leading-[1.85] mb-10 font-light">
            Agenda tu consulta sin compromiso. Diseñamos juntas el resultado perfecto.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">Agendar por WhatsApp</a>
            <a href="tel:+50373106004" className="btn-outline">Llamar Ahora</a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-14 md:py-20 px-5 bg-void border-t border-rose/[0.06]">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
            <div className="col-span-2 lg:col-span-1">
              <div className="font-serif italic text-[28px] text-blush/70 mb-0.5">dm</div>
              <div className="text-[7px] md:text-[8px] tracking-[4px] text-rose/40 font-semibold mb-4 uppercase">Daniela Miranda Studio</div>
              <p className="text-[10px] md:text-[11px] text-blush-muted/40 leading-[1.9] font-light">Micropigmentación de lujo en San Salvador. Certificación internacional en 5 países.</p>
            </div>
            <div>
              <div className="text-[7px] md:text-[8px] tracking-[3px] text-blush-muted/35 font-semibold mb-4 uppercase">Contacto</div>
              <div className="text-[10px] md:text-[11px] text-blush-muted/40 space-y-2.5 font-light">
                <div>Edificio Skylight Center</div>
                <div><a href="tel:+50373106004" className="text-blush-muted/40 no-underline hover:text-rose transition-colors">7310 6004</a></div>
                <div><a href={wa} target="_blank" rel="noopener noreferrer" className="text-rose/50 no-underline hover:text-rose transition-colors">WhatsApp</a></div>
                <div><a href={waze} target="_blank" rel="noopener noreferrer" className="text-blush-muted/40 no-underline hover:text-rose transition-colors">Waze</a></div>
              </div>
            </div>
            <div>
              <div className="text-[7px] md:text-[8px] tracking-[3px] text-blush-muted/35 font-semibold mb-4 uppercase">Social</div>
              <div className="text-[10px] md:text-[11px] text-blush-muted/40 space-y-2.5 font-light">
                <div><a href="https://instagram.com/danielamirandapmu" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/40">@danielamirandapmu</a></div>
                <div><a href="https://instagram.com/damiranda_" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/40">@damiranda_</a></div>
                <div><a href="https://tiktok.com/@danielamirandastudio" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/40">TikTok</a></div>
              </div>
            </div>
            <div>
              <div className="text-[7px] md:text-[8px] tracking-[3px] text-blush-muted/35 font-semibold mb-4 uppercase">Horario</div>
              <div className="text-[10px] md:text-[11px] text-blush-muted/40 space-y-2 font-light">
                <div>Lun–Vie: 9AM–6PM</div>
                <div>Sáb: 9AM–2PM</div>
                <div>Dom: Cerrado</div>
                <div className="text-rose/30 text-[9px] mt-2">Solo con cita previa</div>
              </div>
            </div>
          </div>
          <div className="border-t border-rose/[0.04] pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-[8px] md:text-[9px] text-blush-muted/20 tracking-wider">{"©"} 2026 Daniela Miranda Studio</div>
            <div className="text-[7px] md:text-[8px] text-blush-muted/12 tracking-[2px] uppercase">Powered by MachineMind</div>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a href={wa} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[999] w-[50px] h-[50px] md:w-[54px] md:h-[54px] rounded-full bg-[#25D366] flex items-center justify-center no-underline hover:scale-110 transition-all duration-400 shadow-[0_4px_16px_rgba(37,211,102,0.3)]" aria-label="WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
