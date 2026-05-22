"use client";

import { useState, useRef, useEffect } from "react";

const QUICK_QS = [
  { label: "Servicios y precios", q: "¿Qué servicios ofrecen y cuáles son los precios?" },
  { label: "Hydra Lips", q: "¿Qué es Hydra Lips y en qué se diferencia?" },
  { label: "¿Duele?", q: "¿Duele la micropigmentación?" },
  { label: "Sanación", q: "¿Cómo es el proceso de sanación día por día?" },
  { label: "¿Cuánto dura?", q: "¿Cuánto tiempo duran los resultados?" },
  { label: "¿Por qué Daniela?", q: "¿Qué hace diferente a Daniela Miranda Studio?" },
  { label: "Agendar cita", q: "Quiero agendar una cita, ¿cómo hago?" },
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Disculpa hermosa, estoy teniendo problemas de conexión. Puedes escribirnos directamente al WhatsApp +503 7310 6004 💕",
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
          return <strong key={j} className="font-semibold">{p.slice(2, -2)}</strong>;
        }
        return p;
      });
      return <div key={i} className="mb-0.5">{parts}</div>;
    });
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-0 md:p-6">
      {/* iPhone Frame */}
      <div className="w-full max-w-[430px] h-screen md:h-[860px] bg-[#000000] md:rounded-[52px] md:border-[6px] md:border-[#2a2a2a] relative overflow-hidden md:shadow-[0_0_0_2px_#1a1a1a,0_40px_100px_rgba(0,0,0,0.6),0_0_60px_rgba(183,110,121,0.08)] flex flex-col">

        {/* Notch / Dynamic Island */}
        <div className="hidden md:block absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[36px] bg-[#000000] rounded-full z-50" />

        {/* Status Bar */}
        <div className="h-[54px] md:h-[60px] bg-[#1c1c1e]/95 backdrop-blur-xl flex items-end justify-between px-8 pb-2 flex-shrink-0 relative z-40">
          <span className="text-[15px] text-white font-semibold tracking-tight">{timeStr}</span>
          <div className="flex items-center gap-1.5">
            {/* Signal */}
            <div className="flex gap-[2px] items-end">
              <div className="w-[3px] h-[4px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[6px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[8px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[10px] bg-white rounded-[0.5px]" />
            </div>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white" className="ml-0.5">
              <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 7c1.7 0 3.2.7 4.3 1.8l-1.4 1.4C10 9.4 9 9 8 9s-2 .4-2.9 1.2L3.7 8.8C4.8 7.7 6.3 7 8 7zm0-3.5c2.7 0 5.1 1.1 6.9 2.8l-1.4 1.4C12 6.3 10.1 5.5 8 5.5S4 6.3 2.5 7.7L1.1 6.3C2.9 4.6 5.3 3.5 8 3.5zM8 0c3.7 0 7 1.5 9.4 3.9l-1.4 1.4C13.8 3.2 11.1 2 8 2S2.2 3.2 0 5.3L-1.4 3.9C1 1.5 4.3 0 8 0z" />
            </svg>
            {/* Battery */}
            <div className="flex items-center ml-0.5">
              <div className="w-[25px] h-[12px] border border-white/50 rounded-[3px] p-[1.5px] relative">
                <div className="w-[75%] h-full bg-white rounded-[1.5px]" />
              </div>
              <div className="w-[1.5px] h-[5px] bg-white/50 rounded-r-full ml-[1px]" />
            </div>
          </div>
        </div>

        {/* Nav Bar — iMessage style */}
        <div className="bg-[#1c1c1e]/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3 border-b border-white/[0.06] flex-shrink-0">
          <a href="/" className="flex items-center gap-1 text-[#B76E79] text-[17px] hover:opacity-70 transition-opacity -ml-1">
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" className="mt-px">
              <path d="M9 1L1.5 8.5L9 16" stroke="#B76E79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-blush-muted flex items-center justify-center mb-0.5">
              <span className="font-serif italic text-white text-[16px] -mt-px">dm</span>
            </div>
            <span className="text-[11px] text-white font-semibold tracking-wide">Daniela AI</span>
            <span className="text-[10px] text-white/40 flex items-center gap-1">
              <span className="w-[5px] h-[5px] rounded-full bg-[#30d158] inline-block" />
              en línea
            </span>
          </div>
          <a
            href="https://wa.me/50373106004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B76E79] hover:opacity-70 transition-opacity"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B76E79" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{
            background: "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
          }}
        >
          {/* Date chip */}
          <div className="text-center mb-4">
            <span className="text-[11px] text-white/25 bg-white/[0.06] px-3 py-1 rounded-full">
              Hoy
            </span>
          </div>

          <div className="space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                style={{ animation: "fadeSlide 0.35s cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div
                  className={`max-w-[78%] px-[14px] py-[9px] text-[15px] leading-[1.45] ${
                    m.role === "user"
                      ? "bg-[#B76E79] text-white rounded-[20px] rounded-br-[6px]"
                      : "bg-[#262628] text-[#e5e5e7] rounded-[20px] rounded-bl-[6px]"
                  }`}
                >
                  {formatMsg(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#262628] rounded-[20px] rounded-bl-[6px] px-5 py-3 flex gap-[6px] items-center">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-[7px] h-[7px] rounded-full bg-white/30"
                      style={{
                        animation: `pulse-line 1.4s ease-in-out infinite ${j * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div ref={chatEnd} />
        </div>

        {/* Quick Questions */}
        {showQuick && (
          <div className="px-3 py-2.5 bg-[#1c1c1e] border-t border-white/[0.06] flex-shrink-0">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {QUICK_QS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q.q)}
                  className="px-3.5 py-[7px] bg-white/[0.07] border border-white/[0.1] rounded-full text-[13px] text-[#B76E79] font-medium whitespace-nowrap hover:bg-[#B76E79]/20 hover:border-[#B76E79]/30 transition-all duration-200 flex-shrink-0"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input — iMessage style */}
        <div className="px-3 py-2 pb-3 md:pb-4 bg-[#1c1c1e] border-t border-white/[0.06] flex gap-2 items-end flex-shrink-0">
          <div className="flex-1 bg-[#2c2c2e] rounded-[22px] border border-white/[0.08] flex items-center px-4 min-h-[40px]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Mensaje"
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-[16px] text-white placeholder:text-white/25 py-2"
            />
          </div>
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 mb-[3px] ${
              input.trim()
                ? "bg-[#B76E79] scale-100"
                : "bg-white/[0.06] scale-95"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-colors ${input.trim() ? "text-white" : "text-white/20"}`}
            >
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Home Indicator */}
        <div className="h-[20px] md:h-[28px] bg-[#1c1c1e] flex items-center justify-center flex-shrink-0">
          <div className="w-[134px] h-[5px] bg-white/20 rounded-full" />
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .scrollbar-none { -webkit-overflow-scrolling: touch; }
        }
      `}</style>
    </div>
  );
}
