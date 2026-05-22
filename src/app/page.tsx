"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const SERVICES = [
  {
    id: "cejas",
    icon: "\ud835\udcb8",
    title: "Micropigmentaci\u00f3n de Cejas",
    techniques: "Powder Brows \u00b7 Microblading \u00b7 Microshading \u00b7 Nano Brows",
    desc: "Dise\u00f1o personalizado seg\u00fan la morfolog\u00eda de tu rostro con t\u00e9cnicas certificadas internacionalmente. Pigmentos premium importados. Resultado ultra-natural que dura 1\u20132 a\u00f1os.",
    price: "Desde $100",
    duration: "2\u20133 horas",
    includes: [
      "Consulta y dise\u00f1o con visagismo",
      "Anestesia t\u00f3pica premium",
      "Procedimiento completo",
      "Kit de cuidados post-PMU",
      "Retoque incluido (30\u201345 d\u00edas)",
    ],
  },
  {
    id: "labios",
    icon: "\ud835\udcc1",
    title: "Micropigmentaci\u00f3n de Labios",
    techniques: "Full Lip Blush \u00b7 Contorno + Relleno \u00b7 Correcci\u00f3n de Color",
    desc: "Labios definidos con color permanente y efecto jugoso. Rejuvenece, corrige asimetr\u00edas y elimina la necesidad de labial diario.",
    price: "Desde $100",
    duration: "2\u20133 horas",
    includes: [
      "Selecci\u00f3n de tono personalizada",
      "Dise\u00f1o con fotograf\u00eda de referencia",
      "Procedimiento completo",
      "Kit de cuidados post-PMU",
      "Retoque incluido (30\u201345 d\u00edas)",
    ],
  },
  {
    id: "hydralips",
    icon: "\ud835\udcbd",
    title: "Hydra Lips",
    techniques: "Hidrataci\u00f3n Profunda \u00b7 Micro-Needling \u00b7 Color Sutil",
    desc: "Nuestro tratamiento signature. Combina micro-needling con \u00e1cido hialur\u00f3nico y pigmentaci\u00f3n sutil para labios hidratados, voluminosos y con un toque de color natural.",
    price: "Desde $80",
    duration: "1.5\u20132 horas",
    badge: "SIGNATURE",
    includes: [
      "Limpieza y preparaci\u00f3n labial",
      "\u00c1cido hialur\u00f3nico + vitaminas",
      "Micropigmentaci\u00f3n sutil",
      "Efecto glass lip natural",
      "Seguimiento post-tratamiento",
    ],
  },
  {
    id: "babylips",
    icon: "\ud835\udcb7",
    title: "Baby Lips",
    techniques: "Tinte Sutil \u00b7 Efecto Natural \u00b7 Primer PMU",
    desc: "La versi\u00f3n m\u00e1s suave de labios pigmentados. Ideal para quienes quieren un toque de color permanente sin el look de labial completo. Perfecto como primera experiencia PMU.",
    price: "Desde $80",
    duration: "1.5\u20132 horas",
    includes: [
      "Consulta de tono y expectativas",
      "Dise\u00f1o conservador",
      "Pigmentaci\u00f3n sutil",
      "Kit de cuidados",
      "Retoque incluido (30\u201345 d\u00edas)",
    ],
  },
  {
    id: "retoque",
    icon: "\ud835\udcc7",
    title: "Retoque & Correcci\u00f3n",
    techniques: "Refresh \u00b7 Correcci\u00f3n Crom\u00e1tica \u00b7 Restauraci\u00f3n",
    desc: "\u00bfTu micropigmentaci\u00f3n anterior perdi\u00f3 color, cambi\u00f3 de tono o perdi\u00f3 forma? Restauramos y corregimos trabajos previos con t\u00e9cnicas avanzadas de correcci\u00f3n crom\u00e1tica.",
    price: "Desde $60",
    duration: "1\u20132 horas",
    includes: [
      "Evaluaci\u00f3n del trabajo previo",
      "Plan de correcci\u00f3n personalizado",
      "Procedimiento de restauraci\u00f3n",
      "Seguimiento y control",
    ],
  },
];

const CERTS = [
  { flag: "\ud83c\uddf8\ud83c\uddfb", country: "El Salvador" },
  { flag: "\ud83c\uddf5\ud83c\uddea", country: "Per\u00fa" },
  { flag: "\ud83c\uddea\ud83c\uddf8", country: "Espa\u00f1a" },
  { flag: "\ud83c\uddee\ud83c\uddf9", country: "Italia" },
  { flag: "\ud83c\uddf2\ud83c\uddfd", country: "M\u00e9xico" },
  { flag: "\ud83c\udde7\ud83c\uddf7", country: "Brasil" },
];

const FAQS = [
  {
    q: "\u00bfDuele la micropigmentaci\u00f3n?",
    a: "Aplicamos anestesia t\u00f3pica antes y durante el procedimiento. La mayor\u00eda de clientas describen la sensaci\u00f3n como una leve molestia, no dolor. Tu comodidad es absoluta prioridad.",
  },
  {
    q: "\u00bfCu\u00e1nto dura el resultado?",
    a: "Entre 1 y 2 a\u00f1os dependiendo de tu tipo de piel y cuidados. Pieles grasas tienden a desvanecerse m\u00e1s r\u00e1pido. Un retoque anual mantiene el resultado perfecto.",
  },
  {
    q: "\u00bfC\u00f3mo es el proceso de sanaci\u00f3n?",
    a: "Los primeros 3\u20135 d\u00edas el color se ve m\u00e1s intenso \u2014 completamente normal. Entre el d\u00eda 5\u201310 la piel se descama suavemente. El color final se estabiliza alrededor del d\u00eda 28\u201330.",
  },
  {
    q: "\u00bfPuedo elegir la forma y el color?",
    a: "Absolutamente. Antes de tocar tu piel, hacemos un dise\u00f1o completo con l\u00e1piz que apruebas t\u00fa. Usamos visagismo para encontrar la forma perfecta para TU rostro.",
  },
  {
    q: "\u00bfQu\u00e9 es Hydra Lips?",
    a: "Nuestro tratamiento signature que combina micro-needling con \u00e1cido hialur\u00f3nico y pigmentaci\u00f3n sutil. El resultado: labios hidratados, voluminosos y con un toque de color natural que dura meses.",
  },
  {
    q: "\u00bfEs seguro?",
    a: "Agujas y cartuchos est\u00e9riles desechables en cada procedimiento. Pigmentos premium importados, libres de metales pesados. Protocolos estrictos de bioseguridad.",
  },
  {
    q: "\u00bfIncluye retoque?",
    a: "S\u00ed. Todos nuestros servicios incluyen retoque gratuito entre 30\u201345 d\u00edas despu\u00e9s del procedimiento inicial para perfeccionar el resultado.",
  },
  {
    q: "\u00bfQu\u00e9 cuidados necesito despu\u00e9s?",
    a: "Te entregamos un kit completo y un protocolo d\u00eda por d\u00eda. B\u00e1sicamente: mantener limpio, hidratado, sin sol directo, sin maquillaje en la zona por 10 d\u00edas. F\u00e1cil.",
  },
];

const GALLERY = [
  { label: "Cejas H\u00edbridas + Full Lips", cat: "Cejas & Labios", image: "/images/gallery-1.jpg" },
  { label: "Full Lips Natural", cat: "Labios", image: "/images/gallery-2.jpg" },
  { label: "Powder Brows", cat: "Cejas", image: "/images/gallery-3.jpg" },
  { label: "T\u00e9cnica H\u00edbrida", cat: "Cejas", image: "/images/gallery-4.jpg" },
  { label: "Lip Blush Elegante", cat: "Labios", image: "/images/gallery-5.jpg" },
  { label: "Nano Brows Natural", cat: "Cejas", image: "/images/gallery-6.jpg" },
];

// ═══════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════
export default function DanielaMirandaStudio() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const wa = "https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20quiero%20agendar%20una%20cita";
  const waze = "https://waze.com/ul/hd42tckukc";

  const navItems = [
    ["Servicios", "servicios"],
    ["Resultados", "galeria"],
    ["Daniela", "about"],
    ["FAQ", "faq"],
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ═══ NAVIGATION ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? "py-2.5 px-7 glass-light border-b border-blush/40"
            : "py-[18px] px-7 bg-transparent"
        }`}
      >
        <div className="cursor-pointer" onClick={() => go("hero")}>
          <span className="font-serif text-[22px] font-normal italic text-rose-dark tracking-wider">
            dm
          </span>
          <span className="text-[9px] tracking-[4px] text-rose font-semibold ml-2.5 uppercase">
            Studio
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="nav-desktop hidden md:flex items-center gap-7">
          {navItems.map(([label, id]) => (
            <span
              key={id}
              onClick={() => go(id)}
              className="text-[11px] tracking-[2px] uppercase text-text-muted cursor-pointer font-medium hover:text-rose transition-colors duration-300"
            >
              {label}
            </span>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-6 py-2.5 bg-rose text-white text-[10px] font-bold tracking-[2px] uppercase no-underline rounded-sm hover:bg-rose-dark transition-all duration-300"
          >
            Agendar Cita
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="nav-mobile-btn flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-rose transition-all duration-300 ${mobileMenu ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-5 h-px bg-rose transition-all duration-300 ${mobileMenu ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-rose transition-all duration-300 ${mobileMenu ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-cream-light/[0.98] backdrop-blur-xl flex md:hidden flex-col items-center justify-center gap-8 transition-all duration-500 ${
          mobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map(([label, id]) => (
          <span
            key={id}
            onClick={() => go(id)}
            className="text-xl font-serif text-text-dark cursor-pointer hover:text-rose transition-colors"
          >
            {label}
          </span>
        ))}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
          Agendar Cita
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-36 pb-24"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, rgba(238,201,205,0.15) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 80%, rgba(245,230,211,0.25) 0%, transparent 50%),
                       #FBF5EE`,
        }}
      >
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-blush to-transparent" />

        <FadeIn delay={0.1}>
          <div className="section-label !text-blush-muted mb-5">
            Skylight Center \u00b7 San Salvador
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="font-serif italic text-[clamp(56px,9vw,100px)] font-light text-rose-dark leading-none tracking-tight mb-1">
            dm
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <h1 className="font-serif text-[clamp(28px,4.5vw,48px)] font-normal text-void tracking-[2px] uppercase leading-tight mb-2">
            Daniela Miranda
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="text-[10px] tracking-[5px] text-rose font-semibold uppercase mb-10">
            Design & Micropigmentation Studio
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="w-14 h-px mx-auto mb-9 bg-gradient-to-r from-transparent via-rose to-transparent" />
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-sm text-text-muted max-w-md leading-relaxed mb-2">
            La \u00fanica artista con t\u00edtulo
          </p>
          <p className="font-serif text-[clamp(20px,3vw,28px)] font-normal italic text-rose-dark mb-1.5">
            Miss PMU Internacional
          </p>
          <p className="text-[13px] text-text-light tracking-wider mb-3">
            en El Salvador
          </p>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div className="flex gap-2 justify-center mb-11 text-[22px]">
            {CERTS.map((c, i) => (
              <span key={i} title={c.country} className="cursor-default hover:scale-125 transition-transform">
                {c.flag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.75}>
          <p className="font-serif text-lg italic text-rose tracking-wide mb-12">
            &ldquo;Belleza que traspasa fronteras&rdquo;
          </p>
        </FadeIn>

        <FadeIn delay={0.85}>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Agendar Mi Cita
            </a>
            <button onClick={() => go("servicios")} className="btn-outline">
              Ver Servicios
            </button>
          </div>
        </FadeIn>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[9px] tracking-[3px] text-blush-muted">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-rose/50 to-transparent animate-float" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-void py-9 px-6 border-y border-rose/[0.08]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-9">
          {[
            { icon: "\ud83d\udc51", text: "Miss PMU Internacional 2023" },
            { icon: "\ud83c\udf0e", text: "Certificada en 6 Pa\u00edses" },
            { icon: "\ud83d\udcdc", text: "Micropigmentaci\u00f3n Avanzada" },
            { icon: "\ud83d\udc8e", text: "Experiencia de Lujo" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex items-center gap-2.5 text-xs text-blush tracking-wider">
                <span className="text-lg">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] overflow-hidden rounded border border-blush/40 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/daniela-miranda.jpg"
                alt="Daniela Miranda - Miss PMU Internacional"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
              {/* Gold corner accents */}
              <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t border-l border-rose/40" />
              <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b border-r border-rose/40" />
              <div className="absolute bottom-5 left-5">
                <div className="text-[9px] tracking-[3px] text-blush font-semibold bg-void/60 px-3 py-1.5 backdrop-blur-sm rounded-sm">
                  MISS PMU INTERNACIONAL
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <div className="section-label">Sobre Daniela</div>
              <div className="w-12 h-px bg-rose mb-7" />
              <h2 className="font-serif text-[clamp(26px,3.5vw,38px)] font-light text-void leading-tight mb-5">
                Del mundo del modelaje{" "}
                <span className="text-rose italic">al arte de la micropigmentaci\u00f3n</span>
              </h2>
              <p className="text-[15px] text-text-muted leading-relaxed mb-5">
                Modelo profesional, coronada Miss PMU Internacional y Miss Beauty
                World International 2023. Daniela Miranda transform\u00f3 su pasi\u00f3n por
                la belleza en un arte: la micropigmentaci\u00f3n con est\u00e1ndares
                internacionales, certificada en seis pa\u00edses.
              </p>
              <p className="text-[15px] text-text-muted leading-relaxed mb-7">
                Cada procedimiento en su studio del Edificio Skylight Center es una
                experiencia personalizada de lujo \u2014 dise\u00f1o con visagismo,
                pigmentos premium importados, y la t\u00e9cnica de la \u00fanica artista en
                El Salvador con reconocimiento internacional en competencias de PMU.
              </p>

              {/* Quote */}
              <blockquote className="font-serif text-[19px] italic text-rose-dark leading-relaxed mb-8 pl-5 border-l-2 border-blush">
                &ldquo;No busco seguidoras. Busco mujeres que merezcan llevar la
                mejor versi\u00f3n de s\u00ed mismas todos los d\u00edas.&rdquo;
              </blockquote>

              {/* Stats */}
              <div className="flex gap-8 flex-wrap">
                {[
                  { n: "6", l: "Pa\u00edses Certificada" },
                  { n: "500+", l: "Clientas Felices" },
                  { n: "2023", l: "Miss PMU Internacional" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-serif text-[30px] text-rose font-light">{s.n}</div>
                    <div className="text-[10px] tracking-[2px] text-text-light mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section
        id="servicios"
        className="py-24 md:py-32 px-6 bg-white border-y border-blush/30"
      >
        <div className="max-w-[1050px] mx-auto">
          <FadeIn>
            <div className="text-center mb-[72px]">
              <div className="section-label">Servicios</div>
              <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-light text-void leading-tight max-w-lg mx-auto">
                T\u00e9cnicas internacionales,{" "}
                <span className="text-rose italic">resultado natural</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const isOpen = openService === i;
              return (
                <FadeIn key={s.id} delay={i * 0.08}>
                  <div
                    onClick={() => setOpenService(isOpen ? null : i)}
                    className={`relative p-8 cursor-pointer transition-all duration-350 rounded-sm ${
                      isOpen
                        ? "bg-cream-light border border-blush"
                        : "bg-white border border-cream-dark hover:border-blush"
                    }`}
                  >
                    {/* Top accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-sm transition-all duration-350 ${
                        isOpen ? "bg-rose" : "bg-transparent"
                      }`}
                    />

                    {/* Signature badge */}
                    {s.badge && (
                      <div className="absolute top-3.5 right-3.5 text-[9px] tracking-[2px] text-rose font-bold bg-blush/30 px-2.5 py-1 rounded-sm">
                        {s.badge}
                      </div>
                    )}

                    <div className="font-serif text-[32px] italic text-blush mb-4 opacity-70">
                      {s.icon}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-void mb-1.5">
                      {s.title}
                    </h3>
                    <div className="text-[11px] text-rose tracking-wider mb-3.5">
                      {s.techniques}
                    </div>
                    <p className="text-[13px] text-text-muted leading-relaxed mb-4">
                      {s.desc}
                    </p>

                    {/* Expanded */}
                    <div
                      className="overflow-hidden transition-all duration-450"
                      style={{ maxHeight: isOpen ? 320 : 0 }}
                    >
                      <div className="border-t border-blush/30 pt-4 mt-1">
                        <div className="text-[10px] tracking-[3px] text-rose font-semibold mb-2.5">
                          INCLUYE
                        </div>
                        {s.includes.map((item, j) => (
                          <div
                            key={j}
                            className="text-xs text-text-muted py-1.5 flex items-center gap-2"
                          >
                            <span className="text-blush text-[6px]">{"\u25cf"}</span> {item}
                          </div>
                        ))}
                        <div className="mt-3.5 text-[11px] text-text-light">
                          {"\u23f1"} {s.duration}
                        </div>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-cream">
                      <span className="font-serif text-[22px] text-rose-dark font-normal">
                        {s.price}
                      </span>
                      <a
                        href={`https://wa.me/50373106004?text=Hola%20Daniela%20%E2%9C%A8%20me%20interesa%20${encodeURIComponent(s.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[2px] text-rose font-bold no-underline hover:text-rose-dark transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        AGENDAR {"\u2192"}
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
      <section className="py-24 md:py-32 px-6 bg-cream-light">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="text-center mb-[72px]">
              <div className="section-label">Tu Experiencia</div>
              <h2 className="font-serif text-[clamp(26px,3.5vw,38px)] font-light text-void leading-tight max-w-md mx-auto">
                C\u00f3mo funciona tu{" "}
                <span className="text-rose italic">transformaci\u00f3n</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { n: "01", t: "Consulta", d: "Evaluamos tu rostro, expectativas y dise\u00f1amos juntas el resultado perfecto. Sin compromiso, sin presi\u00f3n." },
              { n: "02", t: "Dise\u00f1o", d: "Con visagismo profesional, dibujamos la forma ideal sobre tu piel. T\u00fa apruebas cada detalle antes de comenzar." },
              { n: "03", t: "Procedimiento", d: "Anestesia t\u00f3pica, pigmentos premium, t\u00e9cnica internacional. Tu transformaci\u00f3n en 2\u20133 horas de dedicaci\u00f3n total." },
              { n: "04", t: "Cuidados", d: "Kit post-PMU personalizado, protocolo d\u00eda a d\u00eda, y retoque incluido a los 30\u201345 d\u00edas para un resultado perfecto." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative pt-2">
                  <div className="font-serif text-[44px] text-blush font-light absolute -top-3 -left-1 opacity-50">
                    {p.n}
                  </div>
                  <div className="relative pt-8">
                    <div className="w-6 h-px bg-rose/40 mb-3" />
                    <h4 className="font-serif text-xl text-void font-medium mb-2.5">
                      {p.t}
                    </h4>
                    <p className="text-[13px] text-text-muted leading-relaxed">{p.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section
        id="galeria"
        className="py-24 md:py-32 px-6 bg-void border-y border-rose/[0.08]"
      >
        <div className="max-w-[1050px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="section-label !text-blush-muted">Resultados</div>
              <h2 className="font-serif text-[clamp(26px,4vw,38px)] font-light text-blush leading-tight max-w-lg mx-auto mb-3">
                Antes y despu\u00e9s{" "}
                <span className="text-rose italic">reales</span>
              </h2>
              <p className="text-sm text-blush-muted max-w-sm mx-auto leading-relaxed">
                Cada rostro es \u00fanico. Cada resultado es personalizado.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
            {GALLERY.map((g, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <a
                  href="https://www.instagram.com/danielamirandapmu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[4/3] overflow-hidden group cursor-pointer block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.image}
                    alt={g.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-2">
                    <div className="text-[10px] tracking-[3px] text-blush-muted">{g.cat.toUpperCase()}</div>
                    <div className="font-serif text-lg text-blush">{g.label}</div>
                    <div className="text-[9px] tracking-[2px] text-blush-muted mt-2 opacity-60">VER EN INSTAGRAM</div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-10 flex gap-6 justify-center flex-wrap">
              <a
                href="https://www.instagram.com/danielamirandapmu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blush-muted tracking-[2px] no-underline hover:text-rose transition-colors"
              >
                SEGUIR EN INSTAGRAM {"\u2192"}
              </a>
              <a
                href="https://www.tiktok.com/@danielamirandastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blush-muted tracking-[2px] no-underline hover:text-rose transition-colors"
              >
                VER EN TIKTOK {"\u2192"}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-cream-light">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="section-label">Confianza</div>
              <h2 className="font-serif text-[clamp(26px,3.5vw,38px)] font-light text-void leading-tight">
                Lo que dicen nuestras{" "}
                <span className="text-rose italic">clientas</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                text: "Nunca pens\u00e9 que unas cejas pudieran cambiar tanto mi cara. Daniela es una artista. Me veo m\u00e1s joven y segura sin maquillaje.",
                name: "Andrea R.",
                service: "Powder Brows",
              },
              {
                text: "El Hydra Lips fue incre\u00edble. Mis labios se ven hidratados y con un color hermoso. La experiencia en el studio es de otro nivel.",
                name: "Mar\u00eda Jos\u00e9 L.",
                service: "Hydra Lips",
              },
              {
                text: "Me hice el lip blush y qued\u00e9 enamorada. El color es exactamente lo que quer\u00eda. Daniela es muy profesional y el resultado natural\u00edsimo.",
                name: "Carolina S.",
                service: "Lip Blush",
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="p-7 bg-white border border-blush/30 rounded-sm hover:border-rose/30 transition-all duration-400 h-full flex flex-col">
                  <div className="text-rose text-2xl mb-3 opacity-30">{"\u201c"}</div>
                  <p className="text-[13px] text-text-muted leading-relaxed flex-1 mb-5">
                    {t.text}
                  </p>
                  <div>
                    <div className="text-text-dark text-sm font-medium">{t.name}</div>
                    <div className="text-rose text-[11px] tracking-wider mt-0.5">{t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-cream-light">
        <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-16 items-start">
          <FadeIn>
            <div className="md:sticky md:top-32">
              <div className="section-label">Preguntas Frecuentes</div>
              <div className="w-12 h-px bg-rose mb-6" />
              <h2 className="font-serif text-[clamp(24px,3vw,34px)] font-light text-void leading-tight mb-5">
                Todo lo que necesitas{" "}
                <span className="text-rose italic">saber</span>
              </h2>
              <p className="text-[15px] text-text-muted leading-relaxed">
                \u00bfOtra pregunta? Escr\u00edbenos por WhatsApp y te respondemos en minutos.
              </p>
            </div>
          </FadeIn>

          <div>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.04}>
                  <div
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="border-b border-blush/40 cursor-pointer py-6"
                  >
                    <div className="flex justify-between items-center">
                      <h4
                        className={`font-serif text-[17px] font-medium transition-colors duration-300 pr-3 ${
                          isOpen ? "text-rose" : "text-void"
                        }`}
                      >
                        {f.q}
                      </h4>
                      <span
                        className="text-lg text-rose transition-transform duration-300 flex-shrink-0"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{ maxHeight: isOpen ? 200 : 0 }}
                    >
                      <p className="text-[13px] text-text-muted leading-relaxed pt-3.5">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section
        className="py-24 md:py-28 px-6 text-center border-t border-blush/30"
        style={{
          background: `linear-gradient(180deg, rgba(238,201,205,0.1) 0%, #FBF5EE 40%, rgba(238,201,205,0.06) 100%)`,
        }}
      >
        <FadeIn>
          <div className="section-label mb-3">\u00bfLista para tu transformaci\u00f3n?</div>
          <h2 className="font-serif text-[clamp(28px,4.5vw,46px)] font-light text-void leading-tight mb-5">
            Tu mejor versi\u00f3n{" "}
            <span className="text-rose italic">empieza aqu\u00ed</span>
          </h2>
          <p className="text-[15px] text-text-muted max-w-md mx-auto leading-relaxed mb-9">
            Agenda tu consulta sin compromiso. Dise\u00f1amos juntas el resultado
            perfecto antes de comenzar.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Agendar por WhatsApp
            </a>
            <a href="tel:+50373106004" className="btn-outline">
              Llamar Ahora
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-[72px] px-6 bg-void border-t border-rose/[0.08]">
        <div className="max-w-[1050px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div>
              <div className="font-serif italic text-[28px] text-blush mb-1">dm</div>
              <div className="text-[9px] tracking-[4px] text-rose font-semibold mb-4.5 uppercase">
                Daniela Miranda Studio
              </div>
              <p className="text-xs text-blush-muted leading-relaxed opacity-70">
                Micropigmentaci\u00f3n de lujo en San Salvador.
                Certificaci\u00f3n internacional en 6 pa\u00edses.
                Belleza que traspasa fronteras.
              </p>
            </div>

            {/* Contact */}
            <div>
              <div className="section-label !text-[9px] !text-blush-muted mb-3">Contacto</div>
              <div className="text-xs text-blush-muted space-y-2.5 opacity-80">
                <div>{"\ud83d\udccd"} Edificio Skylight Center, San Salvador</div>
                <div>
                  {"\ud83d\udcf1"}{" "}
                  <a href="tel:+50373106004" className="text-blush-muted no-underline hover:text-rose transition-colors">
                    7310 6004
                  </a>
                </div>
                <div>
                  {"\ud83d\udcac"}{" "}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-rose no-underline hover:text-rose-light transition-colors">
                    WhatsApp Directo
                  </a>
                </div>
                <div>
                  {"\ud83d\udccd"}{" "}
                  <a href={waze} target="_blank" rel="noopener noreferrer" className="text-blush-muted no-underline hover:text-rose transition-colors">
                    C\u00f3mo llegar (Waze)
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="section-label !text-[9px] !text-blush-muted mb-3">S\u00edguenos</div>
              <div className="text-xs text-blush-muted space-y-2.5 opacity-80">
                <div>
                  <a href="https://instagram.com/danielamirandapmu" target="_blank" rel="noopener noreferrer" className="text-blush-muted no-underline hover:text-rose transition-colors">
                    IG \u2014 @danielamirandapmu
                  </a>
                </div>
                <div>
                  <a href="https://instagram.com/damiranda_" target="_blank" rel="noopener noreferrer" className="text-blush-muted no-underline hover:text-rose transition-colors">
                    IG \u2014 @damiranda_
                  </a>
                </div>
                <div>
                  <a href="https://tiktok.com/@danielamirandastudio" target="_blank" rel="noopener noreferrer" className="text-blush-muted no-underline hover:text-rose transition-colors">
                    TikTok \u2014 @danielamirandastudio
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <div className="section-label !text-[9px] !text-blush-muted mb-3">Horario</div>
              <div className="text-xs text-blush-muted space-y-2 opacity-80">
                <div>Lun \u2013 Vie: 9:00 AM \u2013 6:00 PM</div>
                <div>S\u00e1bado: 9:00 AM \u2013 2:00 PM</div>
                <div>Domingo: Cerrado</div>
                <div className="text-rose text-[10px] mt-2 opacity-70">* Solo con cita previa</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-rose/[0.06] pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-[10px] text-blush-muted/50">
              {"\u00a9"} 2026 Daniela Miranda Studio. Todos los derechos reservados.
            </div>
            <div className="text-[9px] text-blush-muted/30 tracking-wider">
              POWERED BY MACHINEMIND
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.35)] no-underline hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
