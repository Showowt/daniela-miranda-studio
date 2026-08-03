"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   PIEL DORADA by Daniela Miranda Studios — Lista VIP
   Waitlist + referral engine · Supabase-backed via /api/waitlist
   Built by MachineMind LLC
   ═══════════════════════════════════════════════════════════════ */

const WA_TEXT_INTRO =
  "✨ Me uní a la lista VIP de Piel Dorada — el primer spa de bronceado de lujo en El Salvador, de Daniela Miranda 👑\n\n" +
  "Únete tú también con mi link y las dos ganamos premios de miembro fundador:\n";

type VipUser = {
  name: string;
  email: string;
  code: string;
  position: number;
};

const STORAGE_KEY = "pd_user";

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

function SunDivider() {
  return (
    <div className="divider-sun">
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="11" fill="#C9A05C" />
        <g stroke="#C9A05C" strokeWidth="2" strokeLinecap="round">
          <line x1="30" y1="4" x2="30" y2="12" />
          <line x1="30" y1="48" x2="30" y2="56" />
          <line x1="4" y1="30" x2="12" y2="30" />
          <line x1="48" y1="30" x2="56" y2="30" />
          <line x1="11" y1="11" x2="17" y2="17" />
          <line x1="43" y1="43" x2="49" y2="49" />
          <line x1="49" y1="11" x2="43" y2="17" />
          <line x1="17" y1="43" x2="11" y2="49" />
        </g>
      </svg>
    </div>
  );
}

export default function ListaVip() {
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
      console.error("[ListaVip] refreshReferrals", error);
    }
  }, []);

  useEffect(() => {
    setOrigin(window.location.origin);
    refCodeFromUrl.current = new URLSearchParams(window.location.search).get("ref");
    const saved = loadSavedUser();
    if (saved) {
      setUser(saved);
      refreshReferrals(saved.code);
    }
  }, [refreshReferrals]);

  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => refreshReferrals(user.code), 8000);
    return () => clearInterval(id);
  }, [user, refreshReferrals]);

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
      if (json.data.returning) toast("Ya estabas en la lista — aquí está tu lugar 💛");
    } catch (error) {
      console.error("[ListaVip] join", error);
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

  const ringOffset = user ? Math.max(20, 364 - (user.position % 100) * 3.4) : 364;

  const milestones = [
    { n: 3, title: "Laminado de Cejas Gratis", desc: "Invita 3 amigas a la lista" },
    { n: 5, title: "Descuento de Lanzamiento", desc: "Invita 5 amigas — precio especial de apertura" },
    { n: 10, title: "Mes de Bronceado Gratis + Miembro Fundador", desc: "Invita 10 — un mes ilimitado y precio congelado de por vida" },
  ];

  return (
    <>
      <section className="hero">
        <div className="sun-rays" />

        <div className="badge"><span className="dot" /> Lista VIP · Cupos Limitados</div>

        <h1>Piel <span className="gold">Dorada</span></h1>
        <div className="tagline">Beauty &amp; Sun Spa</div>
        <p className="sub">
          El primer spa de bronceado de lujo en El Salvador.
          Por Daniela Miranda — la única artista Miss PMU Internacional del país.
          Sé de las primeras en entrar.
        </p>

        <SunDivider />

        <div className="signup-card">
          {!user ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (!submitting) join(); }}
            >
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
                  <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(201,160,92,0.15)" strokeWidth="6" />
                  <circle
                    cx="65" cy="65" r="58" fill="none" stroke="#C9A05C" strokeWidth="6"
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

              <div className="milestones">
                <h4>Tus Recompensas</h4>
                {milestones.map((m) => (
                  <div key={m.n} className={`milestone${referrals >= m.n ? " reached" : ""}`}>
                    <div className="m-count">{m.n}</div>
                    <div className="m-text">
                      <div className="m-title">{m.title}</div>
                      <div className="m-desc">{m.desc}</div>
                    </div>
                    <div className="m-check">✓</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="perks">
        <div className="perk">
          <div className="icon">☀️</div>
          <h3>Bronceado de Lujo</h3>
          <p>Las primeras camas de bronceado en El Salvador. Color perfecto, ambiente premium, experiencia controlada y segura.</p>
        </div>
        <div className="perk">
          <div className="icon">👑</div>
          <h3>Miss PMU Internacional</h3>
          <p>Micropigmentación de cejas y labios con la única artista certificada Miss PMU Internacional del país.</p>
        </div>
        <div className="perk">
          <div className="icon">💎</div>
          <h3>Miembros Fundadores</h3>
          <p>Las primeras en la lista reciben precio de fundador que se congela para siempre. Solo por tiempo limitado antes de la apertura.</p>
        </div>
      </div>

      <footer className="site-footer">
        <div className="logo">Piel Dorada</div>
        <div className="byline">by Daniela Miranda Studios</div>
        <div className="links">
          <a href="https://wa.me/50373106004?text=Hola%20✨%20me%20interesa%20Piel%20Dorada" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://instagram.com/danielamirandapmu" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="fine">San Salvador, El Salvador · Apertura Septiembre 2026</div>
      </footer>

      <div className={`toast${toastMsg ? " show" : ""}`}>{toastMsg}</div>
    </>
  );
}
