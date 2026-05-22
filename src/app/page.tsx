"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   DANIELA MIRANDA STUDIO — Cinema Engine Build
   "Belleza que traspasa fronteras"
   Built by MachineMind LLC
   ═══════════════════════════════════════════════════════════════ */

// ═══ DATA ═══
const SERVICES = [
  {
    id: "cejas",
    title: "Micropigmentaci\u00f3n de Cejas",
    techniques: "Powder Brows \u00b7 Microblading \u00b7 Microshading \u00b7 Nano Brows",
    desc: "Dise\u00f1o personalizado seg\u00fan la morfolog\u00eda de tu rostro con t\u00e9cnicas certificadas internacionalmente. Pigmentos premium importados. Resultado ultra-natural que dura 1\u20132 a\u00f1os.",
    price: "$100",
    duration: "2\u20133 horas",
    includes: ["Consulta y dise\u00f1o con visagismo", "Anestesia t\u00f3pica premium", "Procedimiento completo", "Kit de cuidados post-PMU", "Retoque incluido (30\u201345 d\u00edas)"],
  },
  {
    id: "labios",
    title: "Micropigmentaci\u00f3n de Labios",
    techniques: "Full Lip Blush \u00b7 Contorno + Relleno \u00b7 Correcci\u00f3n de Color",
    desc: "Labios definidos con color permanente y efecto jugoso. Rejuvenece, corrige asimetr\u00edas y elimina la necesidad de labial diario.",
    price: "$100",
    duration: "2\u20133 horas",
    includes: ["Selecci\u00f3n de tono personalizada", "Dise\u00f1o con fotograf\u00eda de referencia", "Procedimiento completo", "Kit de cuidados post-PMU", "Retoque incluido (30\u201345 d\u00edas)"],
  },
  {
    id: "hydralips",
    title: "Hydra Lips",
    techniques: "Hidrataci\u00f3n Profunda \u00b7 Micro-Needling \u00b7 Color Sutil",
    desc: "Nuestro tratamiento signature. Combina micro-needling con \u00e1cido hialur\u00f3nico y pigmentaci\u00f3n sutil para labios hidratados, voluminosos y con un toque de color natural.",
    price: "$80",
    duration: "1.5\u20132 horas",
    badge: "SIGNATURE",
    includes: ["Limpieza y preparaci\u00f3n labial", "\u00c1cido hialur\u00f3nico + vitaminas", "Micropigmentaci\u00f3n sutil", "Efecto glass lip natural", "Seguimiento post-tratamiento"],
  },
  {
    id: "babylips",
    title: "Baby Lips",
    techniques: "Tinte Sutil \u00b7 Efecto Natural \u00b7 Primer PMU",
    desc: "La versi\u00f3n m\u00e1s suave de labios pigmentados. Ideal como primera experiencia PMU. Un toque de color permanente sin el look de labial completo.",
    price: "$80",
    duration: "1.5\u20132 horas",
    includes: ["Consulta de tono y expectativas", "Dise\u00f1o conservador", "Pigmentaci\u00f3n sutil", "Kit de cuidados", "Retoque incluido (30\u201345 d\u00edas)"],
  },
  {
    id: "retoque",
    title: "Retoque & Correcci\u00f3n",
    techniques: "Refresh \u00b7 Correcci\u00f3n Crom\u00e1tica \u00b7 Restauraci\u00f3n",
    desc: "\u00bfTu micropigmentaci\u00f3n anterior perdi\u00f3 color o forma? Restauramos y corregimos trabajos previos con t\u00e9cnicas avanzadas de correcci\u00f3n crom\u00e1tica.",
    price: "$60",
    duration: "1\u20132 horas",
    includes: ["Evaluaci\u00f3n del trabajo previo", "Plan de correcci\u00f3n personalizado", "Procedimiento de restauraci\u00f3n", "Seguimiento y control"],
  },
];

const FAQS = [
  { q: "\u00bfDuele la micropigmentaci\u00f3n?", a: "Aplicamos anestesia t\u00f3pica antes y durante el procedimiento. La mayor\u00eda de clientas describen la sensaci\u00f3n como una leve molestia, no dolor. Tu comodidad es absoluta prioridad." },
  { q: "\u00bfCu\u00e1nto dura el resultado?", a: "Entre 1 y 2 a\u00f1os dependiendo de tu tipo de piel y cuidados. Pieles grasas tienden a desvanecerse m\u00e1s r\u00e1pido. Un retoque anual mantiene el resultado perfecto." },
  { q: "\u00bfC\u00f3mo es el proceso de sanaci\u00f3n?", a: "Los primeros 3\u20135 d\u00edas el color se ve m\u00e1s intenso \u2014 completamente normal. Entre el d\u00eda 5\u201310 la piel se descama suavemente. El color final se estabiliza alrededor del d\u00eda 28\u201330." },
  { q: "\u00bfPuedo elegir la forma y el color?", a: "Absolutamente. Antes de tocar tu piel, hacemos un dise\u00f1o completo con l\u00e1piz que apruebas t\u00fa. Usamos visagismo para encontrar la forma perfecta para TU rostro." },
  { q: "\u00bfQu\u00e9 es Hydra Lips?", a: "Nuestro tratamiento signature que combina micro-needling con \u00e1cido hialur\u00f3nico y pigmentaci\u00f3n sutil. Labios hidratados, voluminosos y con un toque de color natural que dura meses." },
  { q: "\u00bfEs seguro?", a: "Agujas y cartuchos est\u00e9riles desechables en cada procedimiento. Pigmentos premium importados, libres de metales pesados. Protocolos estrictos de bioseguridad." },
  { q: "\u00bfIncluye retoque?", a: "S\u00ed. Todos nuestros servicios incluyen retoque gratuito entre 30\u201345 d\u00edas despu\u00e9s del procedimiento inicial para perfeccionar el resultado." },
];

const GALLERY = [
  { label: "Cejas H\u00edbridas + Full Lips", cat: "Cejas & Labios", image: "/images/gallery-1.jpg" },
  { label: "Full Lips Natural", cat: "Labios", image: "/images/gallery-2.jpg" },
  { label: "Powder Brows", cat: "Cejas", image: "/images/gallery-3.jpg" },
  { label: "T\u00e9cnica H\u00edbrida", cat: "Cejas", image: "/images/gallery-4.jpg" },
  { label: "Lip Blush Elegante", cat: "Labios", image: "/images/gallery-5.jpg" },
  { label: "Nano Brows Natural", cat: "Cejas", image: "/images/gallery-6.jpg" },
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
      transform: vis ? "translateY(0)" : "translateY(50px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function ParallaxBg({ children, className = "" }: { children?: ReactNode; className?: string }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      setOffset(progress * 30);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}

// ═══ MAIN ═══
export default function DanielaMirandaStudio() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    const timer = setTimeout(() => setPreloaderDone(true), 1800);
    return () => { window.removeEventListener("scroll", h); clearTimeout(timer); };
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  const go = (id: string) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const wa = "https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20quiero%20agendar%20una%20cita";
  const waze = "https://waze.com/ul/hd42tckukc";
  const navItems = [["Servicios", "servicios"], ["Resultados", "galeria"], ["Daniela", "about"], ["Preguntas", "faq"]];

  return (
    <div className="relative min-h-screen" onMouseMove={handleMouse}>

      {/* ═══ PRELOADER ═══ */}
      <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream-light transition-all duration-1000 ${preloaderDone ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="font-serif italic text-[clamp(48px,10vw,72px)] text-rose-dark tracking-wider" style={{ animation: "preloader-breathe 2s ease-in-out infinite" }}>
          dm
        </div>
        <div className="w-12 h-px bg-rose mt-4" style={{ animation: "preloader-line 1.5s ease-in-out infinite" }} />
        <div className="text-[8px] tracking-[6px] text-text-light uppercase mt-6 font-semibold">
          Daniela Miranda Studio
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-700 ${scrolled ? "py-3 px-8 md:px-12 glass-nav border-b border-blush/20 shadow-[0_1px_30px_rgba(183,110,121,0.04)]" : "py-6 px-8 md:px-12 bg-transparent"}`}>
        <div className="cursor-pointer group" onClick={() => go("hero")}>
          <span className="font-serif text-[26px] font-normal italic text-rose-dark tracking-wider group-hover:text-rose transition-colors duration-500">dm</span>
          <span className="text-[8px] tracking-[5px] text-rose/70 font-semibold ml-3 uppercase group-hover:text-rose transition-colors duration-500">Studio</span>
        </div>

        <div className="nav-desktop hidden md:flex items-center gap-10">
          {navItems.map(([label, id]) => (
            <span key={id} onClick={() => go(id)} className="relative text-[10px] tracking-[3px] uppercase text-text-muted cursor-pointer font-semibold hover:text-rose transition-colors duration-400 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-rose after:transition-all after:duration-400 hover:after:w-full">
              {label}
            </span>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="ml-6 px-8 py-3 bg-rose text-white text-[9px] font-bold tracking-[3px] uppercase no-underline hover:bg-rose-dark transition-all duration-500 hover:shadow-[0_8px_30px_rgba(183,110,121,0.25)] hover:-translate-y-0.5">
            Reservar
          </a>
        </div>

        <button className="nav-mobile-btn flex md:hidden flex-col gap-[5px] p-2 group" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
          <span className={`block w-6 h-[1.5px] bg-rose-dark transition-all duration-400 ${mobileMenu ? "rotate-45 translate-y-[6.5px]" : "group-hover:w-5"}`} />
          <span className={`block w-6 h-[1.5px] bg-rose-dark transition-all duration-400 ${mobileMenu ? "opacity-0 scale-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-rose-dark transition-all duration-400 ${mobileMenu ? "-rotate-45 -translate-y-[6.5px]" : "group-hover:w-4"}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] bg-cream-light/[0.98] backdrop-blur-2xl flex md:hidden flex-col items-center justify-center gap-10 transition-all duration-700 ${mobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navItems.map(([label, id], i) => (
          <span key={id} onClick={() => go(id)} className="text-2xl font-serif italic text-text-dark cursor-pointer hover:text-rose transition-colors duration-300" style={{ transitionDelay: mobileMenu ? `${i * 0.08}s` : "0s", opacity: mobileMenu ? 1 : 0, transform: mobileMenu ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s ease" }}>
            {label}
          </span>
        ))}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">Agendar Cita</a>
      </div>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(238,201,205,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(245,230,211,0.2) 0%, transparent 40%), #FBF5EE` }}>
        {/* Atmospheric orbs that follow mouse slightly */}
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(238,201,205,0.15) 0%, transparent 70%)", top: `${20 + mousePos.y * 10}%`, left: `${10 + mousePos.x * 15}%`, transition: "top 2s ease, left 2s ease", animation: "soft-glow 6s ease-in-out infinite" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(183,110,121,0.06) 0%, transparent 70%)", bottom: `${15 + mousePos.y * 8}%`, right: `${10 + mousePos.x * 12}%`, transition: "bottom 2.5s ease, right 2.5s ease", animation: "soft-glow 8s ease-in-out infinite 2s" }} />

        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-blush/60 to-transparent" />

        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-blush/[0.08] pointer-events-none" style={{ animation: "rotate-slow 80s linear infinite" }} />

        <FadeIn delay={0.3}>
          <div className="text-[9px] tracking-[6px] text-blush-muted font-semibold uppercase mb-8">
            Skylight Center \u00b7 San Salvador
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="font-serif italic text-[clamp(64px,12vw,120px)] font-light text-rose-dark leading-[0.85] tracking-tight mb-3 relative">
            dm
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.65}>
          <h1 className="font-serif text-[clamp(24px,4vw,40px)] font-normal text-void tracking-[6px] uppercase leading-tight mt-6 mb-2">
            Daniela Miranda
          </h1>
        </FadeIn>

        <FadeIn delay={0.75}>
          <div className="text-[9px] tracking-[7px] text-rose font-semibold uppercase mb-14">
            Design & Micropigmentation Studio
          </div>
        </FadeIn>

        <FadeIn delay={0.9}>
          <p className="text-[13px] text-text-muted max-w-sm leading-relaxed mb-1 font-light">
            La \u00fanica artista con t\u00edtulo
          </p>
          <p className="font-serif text-[clamp(22px,3.5vw,32px)] font-normal italic text-rose-dark leading-snug mb-1">
            Miss PMU Internacional
          </p>
          <p className="text-[12px] text-text-light tracking-[2px] mb-4">en El Salvador</p>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="flex gap-2.5 justify-center mb-8 text-[20px]">
            {["\ud83c\uddf8\ud83c\uddfb","\ud83c\uddf5\ud83c\uddea","\ud83c\uddea\ud83c\uddf8","\ud83c\uddee\ud83c\uddf9","\ud83c\uddf2\ud83c\uddfd","\ud83c\udde7\ud83c\uddf7"].map((flag, i) => (
              <span key={i} className="hover:scale-150 transition-transform duration-300 cursor-default">{flag}</span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={1.1}>
          <p className="font-serif text-[17px] italic text-rose/80 tracking-wide mb-14">
            &ldquo;Belleza que traspasa fronteras&rdquo;
          </p>
        </FadeIn>

        <FadeIn delay={1.25}>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">Agendar Mi Cita</a>
            <button onClick={() => go("servicios")} className="btn-outline">Ver Servicios</button>
          </div>
        </FadeIn>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[4px] text-blush-muted font-semibold uppercase">Descubre</span>
          <div className="w-px h-10 bg-gradient-to-b from-rose/40 to-transparent animate-pulse-line" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-void py-10 px-6 border-y border-rose/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-14">
          {[
            { icon: "\ud83d\udc51", text: "Miss PMU Internacional" },
            { icon: "\ud83c\udf0e", text: "Certificada en 6 Pa\u00edses" },
            { icon: "\ud83d\udcdc", text: "T\u00e9cnicas Avanzadas" },
            { icon: "\ud83d\udc8e", text: "Experiencia de Lujo" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex items-center gap-3 text-[11px] text-blush/80 tracking-[2px] font-light uppercase">
                <span className="text-lg">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-28 md:py-36 px-6">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/daniela-miranda.jpg" alt="Daniela Miranda" className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/20 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 w-12 h-12 border-t border-l border-rose/30 transition-all duration-700 group-hover:w-16 group-hover:h-16 group-hover:border-rose/60" />
              <div className="absolute bottom-5 right-5 w-12 h-12 border-b border-r border-rose/30 transition-all duration-700 group-hover:w-16 group-hover:h-16 group-hover:border-rose/60" />
              <div className="absolute bottom-8 left-8 bg-void/50 backdrop-blur-md px-5 py-2.5">
                <div className="text-[8px] tracking-[4px] text-blush font-semibold uppercase">Miss PMU Internacional 2023</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div className="section-label">Sobre Daniela</div>
              <div className="w-10 h-px bg-rose mb-10" />
              <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-light text-void leading-[1.15] mb-7">
                Del mundo del modelaje<br />
                <span className="text-rose italic">al arte de la micropigmentaci\u00f3n</span>
              </h2>
              <p className="text-[14px] text-text-muted leading-[1.9] mb-5 font-light">
                Modelo profesional, coronada Miss PMU Internacional y Miss Beauty World International 2023.
                Daniela Miranda transform\u00f3 su pasi\u00f3n por la belleza en un arte: la micropigmentaci\u00f3n con
                est\u00e1ndares internacionales, certificada en seis pa\u00edses.
              </p>
              <p className="text-[14px] text-text-muted leading-[1.9] mb-10 font-light">
                Cada procedimiento en su studio del Edificio Skylight Center es una experiencia personalizada
                de lujo \u2014 dise\u00f1o con visagismo, pigmentos premium importados, y la t\u00e9cnica de la \u00fanica
                artista en El Salvador con reconocimiento internacional.
              </p>

              <blockquote className="font-serif text-[18px] italic text-rose-dark leading-[1.7] mb-12 pl-6 border-l border-rose/30">
                &ldquo;No busco seguidoras. Busco mujeres que merezcan llevar la mejor versi\u00f3n de s\u00ed mismas todos los d\u00edas.&rdquo;
              </blockquote>

              <div className="flex gap-10 flex-wrap">
                {[{ n: "6", l: "Pa\u00edses" }, { n: "500+", l: "Clientas" }, { n: "2023", l: "Miss PMU" }].map((s, i) => (
                  <div key={i} className="stat-item pr-10">
                    <div className="font-serif text-[36px] text-rose font-light leading-none">{s.n}</div>
                    <div className="text-[9px] tracking-[3px] text-text-light mt-2 uppercase font-semibold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="servicios" className="py-28 md:py-36 px-6 bg-white border-y border-blush/20">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="section-label">Servicios</div>
              <h2 className="font-serif text-[clamp(30px,4.5vw,48px)] font-light text-void leading-tight max-w-lg mx-auto">
                T\u00e9cnicas internacionales,{" "}
                <span className="text-rose italic">resultado natural</span>
              </h2>
              <div className="w-10 h-px bg-rose mx-auto mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => {
              const isOpen = openService === i;
              return (
                <FadeIn key={s.id} delay={i * 0.08}>
                  <div onClick={() => setOpenService(isOpen ? null : i)} className={`service-card ${isOpen ? "active" : ""}`}>
                    {s.badge && (
                      <div className="absolute top-5 right-5 text-[8px] tracking-[3px] text-rose font-bold bg-blush/30 px-3 py-1.5 uppercase">
                        {s.badge}
                      </div>
                    )}

                    <h3 className="font-serif text-[20px] font-medium text-void mb-2 leading-tight">{s.title}</h3>
                    <div className="text-[10px] text-rose tracking-[1px] mb-4 font-medium">{s.techniques}</div>
                    <p className="text-[13px] text-text-muted leading-[1.8] mb-5 font-light">{s.desc}</p>

                    <div className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: isOpen ? 350 : 0 }}>
                      <div className="border-t border-blush/25 pt-5 mt-1 pb-2">
                        <div className="text-[9px] tracking-[4px] text-rose font-bold mb-3 uppercase">Incluye</div>
                        {s.includes.map((item, j) => (
                          <div key={j} className="text-[12px] text-text-muted py-[6px] flex items-center gap-3 font-light">
                            <span className="w-1 h-1 rounded-full bg-rose/50 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                        <div className="mt-4 text-[10px] text-text-light tracking-[1px]">{s.duration}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-5 pt-5 border-t border-cream-dark/40">
                      <div>
                        <span className="text-[10px] text-text-light tracking-[1px] block mb-0.5">Desde</span>
                        <span className="font-serif text-[26px] text-rose-dark font-light">{s.price}</span>
                      </div>
                      <a href={`https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20me%20interesa%20${encodeURIComponent(s.title)}`} target="_blank" rel="noopener noreferrer" className="text-[9px] tracking-[3px] text-rose font-bold no-underline hover:text-rose-dark transition-colors duration-300 uppercase group" onClick={(e) => e.stopPropagation()}>
                        Agendar <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{"\u2192"}</span>
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
      <section className="py-28 md:py-36 px-6 bg-cream-light relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-blush/[0.06] blur-[100px] pointer-events-none" />
        <div className="max-w-[900px] mx-auto relative">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="section-label">Tu Experiencia</div>
              <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-light text-void leading-tight max-w-md mx-auto">
                C\u00f3mo funciona tu <span className="text-rose italic">transformaci\u00f3n</span>
              </h2>
              <div className="w-10 h-px bg-rose mx-auto mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-blush/30 to-transparent" />
            {[
              { n: "01", t: "Consulta", d: "Evaluamos tu rostro y expectativas. Dise\u00f1amos juntas el resultado perfecto. Sin compromiso." },
              { n: "02", t: "Dise\u00f1o", d: "Con visagismo profesional, dibujamos la forma ideal. T\u00fa apruebas cada detalle antes de comenzar." },
              { n: "03", t: "Procedimiento", d: "Anestesia t\u00f3pica, pigmentos premium, t\u00e9cnica internacional. 2\u20133 horas de dedicaci\u00f3n total." },
              { n: "04", t: "Cuidados", d: "Kit post-PMU personalizado y protocolo d\u00eda a d\u00eda. Retoque incluido a los 30\u201345 d\u00edas." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className="w-[44px] h-[44px] rounded-full border border-blush flex items-center justify-center mx-auto mb-6 bg-cream-light relative z-10">
                    <span className="font-serif text-[16px] text-rose italic">{p.n}</span>
                  </div>
                  <h4 className="font-serif text-[20px] text-void font-medium mb-3">{p.t}</h4>
                  <p className="text-[12px] text-text-muted leading-[1.8] font-light max-w-[200px] mx-auto">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="galeria" className="py-28 md:py-36 px-6 bg-void">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="section-label !text-blush-muted">@danielamirandapmu</div>
              <h2 className="font-serif text-[clamp(28px,4.5vw,44px)] font-light text-blush leading-tight max-w-lg mx-auto mb-3">
                Resultados <span className="text-rose-light italic">reales</span>
              </h2>
              <p className="text-[13px] text-blush-muted/60 max-w-sm mx-auto leading-relaxed font-light">
                Cada rostro es \u00fanico. Cada resultado es personalizado.
              </p>
              <div className="w-10 h-px bg-rose/30 mx-auto mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
            {GALLERY.map((g, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <a href="https://www.instagram.com/danielamirandapmu/" target="_blank" rel="noopener noreferrer" className="gallery-item aspect-square block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image} alt={g.label} className="w-full h-full object-cover" />
                  <div className="gallery-overlay">
                    <div className="text-[9px] tracking-[4px] text-blush-muted/80 uppercase font-semibold">{g.cat}</div>
                    <div className="font-serif text-[18px] text-white italic">{g.label}</div>
                    <div className="w-6 h-px bg-rose/60 mt-2" />
                    <div className="text-[8px] tracking-[3px] text-blush-muted/50 uppercase mt-3">Ver en Instagram</div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-14 flex gap-8 justify-center flex-wrap">
              <a href="https://www.instagram.com/danielamirandapmu/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blush-muted/70 tracking-[3px] no-underline hover:text-rose-light transition-colors duration-400 uppercase font-semibold group">
                Instagram <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{"\u2192"}</span>
              </a>
              <a href="https://www.tiktok.com/@danielamirandastudio" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blush-muted/70 tracking-[3px] no-underline hover:text-rose-light transition-colors duration-400 uppercase font-semibold group">
                TikTok <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{"\u2192"}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-28 md:py-36 px-6 bg-cream-light">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="section-label">Confianza</div>
              <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-light text-void leading-tight">
                Lo que dicen nuestras <span className="text-rose italic">clientas</span>
              </h2>
              <div className="w-10 h-px bg-rose mx-auto mt-8" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Nunca pens\u00e9 que unas cejas pudieran cambiar tanto mi cara. Daniela es una artista. Me veo m\u00e1s joven y segura sin maquillaje.", name: "Andrea R.", service: "Powder Brows" },
              { text: "El Hydra Lips fue incre\u00edble. Mis labios se ven hidratados y con un color hermoso. La experiencia en el studio es de otro nivel.", name: "Mar\u00eda Jos\u00e9 L.", service: "Hydra Lips" },
              { text: "Me hice el lip blush y qued\u00e9 enamorada. El color es exactamente lo que quer\u00eda. Daniela es muy profesional y el resultado natural\u00edsimo.", name: "Carolina S.", service: "Lip Blush" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="testimonial-card h-full flex flex-col">
                  <div className="font-serif text-[42px] text-rose/20 leading-none mb-4">&ldquo;</div>
                  <p className="text-[13px] text-text-muted leading-[1.9] flex-1 mb-8 font-light">{t.text}</p>
                  <div className="border-t border-blush/20 pt-5">
                    <div className="text-text-dark text-[13px] font-medium tracking-wide">{t.name}</div>
                    <div className="text-rose text-[9px] tracking-[3px] mt-1 uppercase font-semibold">{t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-28 md:py-36 px-6 bg-white">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-14 md:gap-20 items-start">
          <FadeIn>
            <div className="md:sticky md:top-36">
              <div className="section-label">FAQ</div>
              <div className="w-10 h-px bg-rose mb-10" />
              <h2 className="font-serif text-[clamp(26px,3.5vw,38px)] font-light text-void leading-[1.15] mb-6">
                Todo lo que necesitas <span className="text-rose italic">saber</span>
              </h2>
              <p className="text-[14px] text-text-muted leading-[1.9] font-light mb-8">
                \u00bfOtra pregunta? Escr\u00edbenos por WhatsApp.
              </p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline text-[9px] !px-8 !py-3.5">
                Escribir por WhatsApp
              </a>
            </div>
          </FadeIn>

          <div>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div onClick={() => setOpenFaq(isOpen ? null : i)} className={`faq-item ${isOpen ? "active" : ""}`}>
                    <div className="flex justify-between items-center gap-4">
                      <h4 className={`font-serif text-[17px] font-medium transition-colors duration-400 ${isOpen ? "text-rose" : "text-void"}`}>
                        {f.q}
                      </h4>
                      <div className={`faq-toggle ${isOpen ? "" : ""}`}>
                        <span style={{ display: "block", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>+</span>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: isOpen ? 200 : 0 }}>
                      <p className="text-[13px] text-text-muted leading-[1.9] pt-4 font-light">{f.a}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-28 md:py-36 px-6 text-center relative overflow-hidden border-t border-blush/15" style={{ background: `linear-gradient(180deg, rgba(238,201,205,0.08) 0%, #FBF5EE 40%, rgba(238,201,205,0.04) 100%)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blush/[0.06] pointer-events-none" />
        <FadeIn>
          <div className="relative">
            <div className="section-label mb-5">\u00bfLista para tu transformaci\u00f3n?</div>
            <h2 className="font-serif text-[clamp(32px,5vw,52px)] font-light text-void leading-tight mb-5">
              Tu mejor versi\u00f3n <br className="hidden sm:block" />
              <span className="text-rose italic">empieza aqu\u00ed</span>
            </h2>
            <p className="text-[14px] text-text-muted max-w-md mx-auto leading-[1.9] mb-12 font-light">
              Agenda tu consulta sin compromiso. Dise\u00f1amos juntas el resultado perfecto antes de comenzar.
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">Agendar por WhatsApp</a>
              <a href="tel:+50373106004" className="btn-outline">Llamar Ahora</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-20 px-6 bg-void border-t border-rose/[0.06]">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-serif italic text-[32px] text-blush/80 mb-1">dm</div>
              <div className="text-[8px] tracking-[5px] text-rose/50 font-semibold mb-5 uppercase">Daniela Miranda Studio</div>
              <p className="text-[11px] text-blush-muted/50 leading-[2] font-light">
                Micropigmentaci\u00f3n de lujo en San Salvador. Certificaci\u00f3n internacional en 6 pa\u00edses. Belleza que traspasa fronteras.
              </p>
            </div>
            <div>
              <div className="text-[8px] tracking-[4px] text-blush-muted/40 font-semibold mb-5 uppercase">Contacto</div>
              <div className="text-[11px] text-blush-muted/50 space-y-3 font-light">
                <div>{"\ud83d\udccd"} Edificio Skylight Center, San Salvador</div>
                <div>{"\ud83d\udcf1"} <a href="tel:+50373106004" className="text-blush-muted/50 no-underline hover:text-rose transition-colors">7310 6004</a></div>
                <div>{"\ud83d\udcac"} <a href={wa} target="_blank" rel="noopener noreferrer" className="text-rose/60 no-underline hover:text-rose transition-colors">WhatsApp Directo</a></div>
                <div>{"\ud83d\udccd"} <a href={waze} target="_blank" rel="noopener noreferrer" className="text-blush-muted/50 no-underline hover:text-rose transition-colors">C\u00f3mo llegar</a></div>
              </div>
            </div>
            <div>
              <div className="text-[8px] tracking-[4px] text-blush-muted/40 font-semibold mb-5 uppercase">Social</div>
              <div className="text-[11px] text-blush-muted/50 space-y-3 font-light">
                <div><a href="https://instagram.com/danielamirandapmu" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/50">@danielamirandapmu</a></div>
                <div><a href="https://instagram.com/damiranda_" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/50">@damiranda_</a></div>
                <div><a href="https://tiktok.com/@danielamirandastudio" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-rose transition-colors text-blush-muted/50">TikTok</a></div>
              </div>
            </div>
            <div>
              <div className="text-[8px] tracking-[4px] text-blush-muted/40 font-semibold mb-5 uppercase">Horario</div>
              <div className="text-[11px] text-blush-muted/50 space-y-2 font-light">
                <div>Lun \u2013 Vie: 9:00 AM \u2013 6:00 PM</div>
                <div>S\u00e1bado: 9:00 AM \u2013 2:00 PM</div>
                <div>Domingo: Cerrado</div>
                <div className="text-rose/40 text-[9px] mt-3">Solo con cita previa</div>
              </div>
            </div>
          </div>
          <div className="border-t border-rose/[0.04] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-[9px] text-blush-muted/25 tracking-wider">{"\u00a9"} 2026 Daniela Miranda Studio</div>
            <div className="text-[8px] text-blush-muted/15 tracking-[3px] uppercase">Powered by MachineMind</div>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a href={wa} target="_blank" rel="noopener noreferrer" className="fixed bottom-7 right-7 z-[999] w-[56px] h-[56px] rounded-full bg-[#25D366] flex items-center justify-center no-underline hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-500 shadow-[0_4px_20px_rgba(37,211,102,0.3)]" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
