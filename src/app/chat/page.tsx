"use client";

import { useState, useRef, useEffect } from "react";

const QUICK_QS = [
  { label: "💎 Servicios y precios", q: "¿Qué servicios ofrecen y cuáles son los precios?" },
  { label: "✨ Hydra Lips", q: "¿Qué es Hydra Lips y en qué se diferencia?" },
  { label: "😰 ¿Duele?", q: "¿Duele la micropigmentación?" },
  { label: "🩹 Sanación", q: "¿Cómo es el proceso de sanación día por día?" },
  { label: "⏰ ¿Cuánto dura?", q: "¿Cuánto tiempo duran los resultados?" },
  { label: "👑 ¿Por qué Daniela?", q: "¿Qué hace diferente a Daniela Miranda Studio?" },
  { label: "📅 Agendar cita", q: "Quiero agendar una cita, ¿cómo hago?" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DanielaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola hermosa! ✨ Soy Daniela AI, tu asistente de Daniela Miranda Studio — el único estudio en El Salvador con certificación Miss PMU Internacional.\n\n¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios, resolver cualquier duda sobre micropigmentación, o ayudarte a agendar tu cita 💕",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setShowQuick(false);
    setLoading(true);

    try {
      const apiMessages = updated.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "API error");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Disculpa hermosa, estoy teniendo problemas de conexión. Puedes escribirnos directamente al WhatsApp +503 7310 6004 y te atendemos al instante 💕",
        },
      ]);
    }
    setLoading(false);
  };

  const formatMsg = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      const parts = line.split(/(\*\*.*?\*\*)/g).map((p, j) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={j} className="font-semibold text-rose-dark">
              {p.slice(2, -2)}
            </strong>
          );
        }
        return p;
      });
      return (
        <div key={i} className="mb-1">
          {parts}
        </div>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col bg-cream-light overflow-hidden">
      {/* Header */}
      <div className="bg-void px-5 py-4 flex items-center gap-3 border-b border-rose/10 flex-shrink-0">
        <a href="/" className="mr-1 text-blush-muted/50 hover:text-blush transition-colors text-sm">
          ←
        </a>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-blush flex items-center justify-center flex-shrink-0">
          <span className="font-serif italic text-white text-[15px]">dm</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-blush tracking-wide">
            Daniela AI
          </div>
          <div className="text-[10px] text-blush-muted/70 tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
            Daniela Miranda Studio · En línea
          </div>
        </div>
        <a
          href="https://wa.me/50373106004"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center hover:bg-[#25D366]/30 transition-colors"
          aria-label="WhatsApp"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Credential bar */}
      <div className="bg-void-light px-4 py-2 flex items-center justify-center gap-1.5 text-[9px] text-blush-muted/60 tracking-wider flex-shrink-0 border-b border-rose/5">
        <span>👑 Miss PMU Internacional</span>
        <span className="opacity-30">·</span>
        <span>🇸🇻🇵🇪🇪🇸🇲🇽🇧🇷</span>
        <span className="opacity-30">·</span>
        <span>Skylight Center</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-[fadeSlide_0.3s_ease-out]`}
          >
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-blush flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <span className="font-serif italic text-white text-[10px]">d</span>
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 text-[13px] leading-[1.65] ${
                m.role === "user"
                  ? "bg-rose text-white rounded-2xl rounded-br-sm"
                  : "bg-white text-text-dark rounded-2xl rounded-bl-sm border border-blush/30 shadow-[0_1px_3px_rgba(238,201,205,0.15)]"
              }`}
            >
              {formatMsg(m.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-blush flex items-center justify-center flex-shrink-0">
              <span className="font-serif italic text-white text-[10px]">d</span>
            </div>
            <div className="bg-white border border-blush/30 rounded-2xl rounded-bl-sm px-5 py-3.5 flex gap-1.5">
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  className="w-[6px] h-[6px] rounded-full bg-rose"
                  style={{
                    animation: `pulse-line 1.2s infinite ${j * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEnd} />
      </div>

      {/* Quick questions */}
      {showQuick && (
        <div className="px-4 py-3 bg-white border-t border-blush/20 flex-shrink-0">
          <div className="text-[9px] tracking-[2px] text-text-light uppercase font-semibold mb-2.5">
            Preguntas frecuentes
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QS.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q.q)}
                className="px-3 py-1.5 bg-blush/20 border border-blush/40 rounded-full text-[11px] text-rose-dark font-medium hover:bg-blush hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-blush/15 flex gap-2.5 items-center flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Escribe tu pregunta aquí..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-full border border-blush/40 outline-none text-[13px] text-text-dark bg-cream-light focus:border-rose transition-colors placeholder:text-text-light"
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-lg transition-all ${
            input.trim()
              ? "bg-rose hover:bg-rose-dark cursor-pointer"
              : "bg-blush/40 cursor-default"
          }`}
        >
          →
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 bg-white text-center flex-shrink-0">
        <span className="text-[8px] text-text-light tracking-wider">
          DANIELA MIRANDA STUDIO · SKYLIGHT CENTER · SAN SALVADOR
        </span>
      </div>
    </div>
  );
}
