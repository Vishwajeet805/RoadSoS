import { Bot, AlertCircle, Zap, HeartPulse, Phone, BookOpen, Shield } from "lucide-react";
import AIChat from "../components/AIChat";

const quickPrompts = [
  { icon: "🩸", label: "Severe bleeding" },
  { icon: "❤️", label: "CPR steps" },
  { icon: "🔥", label: "Burn treatment" },
  { icon: "🦴", label: "Fracture first aid" },
  { icon: "🧠", label: "Head injury" },
  { icon: "😮", label: "Unconscious person" },
];

export default function AIAssistant() {
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Identity Panel ─────────────────────────────────── */}
        <div className="card-premium p-8 rounded-3xl border border-emerald-500/20 mb-8 animate-slide-in-left relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            background: "radial-gradient(circle at 20% 50%, rgba(52,211,153,0.4) 0%, transparent 60%)"
          }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))",
                border: "1px solid rgba(52,211,153,0.3)"
              }}>
                <Bot size={36} className="text-emerald-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-navy-950 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h2 className="font-display font-black text-2xl text-white">RoadSoS Medical AI</h2>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">
                  Online
                </span>
              </div>
              <p className="text-white/60 text-base font-medium">Gemini-powered emergency first aid assistant</p>
              <p className="text-white/40 text-sm mt-2">Trained on emergency medical protocols · Available 24/7</p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-cyan-400" /> Safe guidance</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-400" /> Fast response</span>
            </div>
          </div>
        </div>

        {/* ── Emergency Warning Card ─────────────────────────── */}
        <div className="p-5 rounded-2xl border border-emergency/30 bg-emergency/8 mb-8 flex flex-col sm:flex-row items-start gap-4 animate-slide-up" style={{ animationDelay: "80ms" }}>
          <AlertCircle size={20} className="text-emergency flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-display font-bold text-white">For life-threatening emergencies, call 112 immediately.</p>
            <p className="text-sm text-white/50 mt-2">This AI provides guidance only and does not replace professional emergency services.</p>
          </div>
          <a href="tel:112" className="flex-shrink-0 px-4 py-2 rounded-lg bg-emergency text-white text-sm font-bold hover:bg-red-600 transition-all duration-300 hover:scale-105 active:scale-95">
            Call 112
          </a>
        </div>

        {/* ── Quick Prompts ──────────────────────────────────── */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "120ms" }}>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Quick Topics</p>
          <div className="flex flex-wrap gap-3">
            {quickPrompts.map(({ icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300 group font-medium"
              >
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat Interface ─────────────────────────────────── */}
        <div className="card-premium p-8 rounded-3xl border border-white/15 mb-8 animate-slide-up" style={{ animationDelay: "160ms" }}>
          <AIChat />
        </div>

        {/* ── Emergency CTAs ─────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <a href="tel:112" className="flex flex-col items-center gap-3 p-5 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 text-center group"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: "0 0 16px rgba(239,68,68,0.3)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.6), 0 0 40px rgba(239,68,68,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 16px rgba(239,68,68,0.3)"; }}>
            <Phone size={22} className="group-hover:scale-125 transition-transform duration-300" />
            <span>Call 112</span>
          </a>
          <a href="tel:108" className="flex flex-col items-center gap-3 p-5 rounded-2xl text-emerald-300 font-bold text-sm card-premium border border-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 text-center group hover:border-emerald-400/60">
            <HeartPulse size={22} className="group-hover:scale-125 transition-transform duration-300" />
            <span>Ambulance</span>
          </a>
          <a href="/guide" className="flex flex-col items-center gap-3 p-5 rounded-2xl text-amber-300 font-bold text-sm card-premium border border-amber-500/30 transition-all duration-300 hover:scale-110 active:scale-95 text-center group hover:border-amber-400/60">
            <BookOpen size={22} className="group-hover:scale-125 transition-transform duration-300" />
            <span>Guide</span>
          </a>
        </div>
      </div>
    </div>
  );
}
