// Phase F — Accident Severity Detection
// AccidentSeverity.jsx — Page wrapper

import { ScanSearch, ShieldAlert, AlertCircle, Info } from "lucide-react";
import SeverityAnalyzer from "../components/SeverityAnalyzer";
import { SAFETY_DISCLAIMER } from "../data/severityRules";

export default function AccidentSeverity() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-10 animate-slide-in-left">
          <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/10 rounded-2xl border border-amber-500/20">
            <ScanSearch size={32} className="text-amber-400" />
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Accident Severity{" "}
              <span className="text-gradient-cyan">Detection</span>
            </h1>
            <p className="text-white/50 text-sm mt-1.5 font-semibold uppercase tracking-widest">
              Risk Estimation · Emergency Guidance
            </p>
          </div>
        </div>

        {/* ── Risk Level Legend ────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-3 gap-3 mb-8 animate-slide-up"
          style={{ animationDelay: "80ms" }}
        >
          {[
            { level: "Low Risk",    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", score: "0–2" },
            { level: "Medium Risk", color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/25",   score: "3–6" },
            { level: "High Risk",   color: "text-emergency",   bg: "bg-emergency/10",   border: "border-emergency/25",   score: "7+" },
          ].map(({ level, color, bg, border, score }) => (
            <div
              key={level}
              className={`p-3 sm:p-4 rounded-xl ${bg} border ${border} text-center`}
            >
              <p className={`font-display font-black text-sm sm:text-base ${color}`}>{level}</p>
              <p className="text-white/35 text-xs mt-0.5">Score {score}</p>
            </div>
          ))}
        </div>

        {/* ── Safety Disclaimer ────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-3 p-5 rounded-2xl bg-emergency/8 border border-emergency/25 mb-8 animate-slide-up"
          style={{ animationDelay: "120ms" }}
        >
          <AlertCircle size={20} className="text-emergency flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-display font-bold text-white text-sm mb-1">
              ⚠️ Medical Safety Disclaimer
            </p>
            <p className="text-sm text-white/65 leading-relaxed">{SAFETY_DISCLAIMER}</p>
          </div>
        </div>

        {/* ── How it works info strip ──────────────────────────────────────── */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/8 border border-cyan-500/20 mb-8 animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <Info size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/55 leading-relaxed">
            Enter an accident description and/or select symptoms. The analyser scores each factor
            and calculates a risk level. Critical keywords (unconscious, not breathing, heavy
            bleeding) automatically trigger a High Risk classification regardless of score.
          </p>
        </div>

        {/* ── Main Analyzer ────────────────────────────────────────────────── */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <SeverityAnalyzer />
        </div>

        {/* ── Bottom disclaimer ────────────────────────────────────────────── */}
        <div
          className="mt-12 text-center animate-slide-up"
          style={{ animationDelay: "250ms" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldAlert size={14} className="text-white/30" />
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">
              Emergency Helpline
            </p>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emergency/10 hover:bg-emergency/20 border border-emergency/25 text-emergency font-display font-bold transition-all duration-300 hover-lift-sm"
          >
            📞 Call 112 — National Emergency
          </a>
          <p className="text-white/20 text-xs mt-4">
            RoadSoS Phase F · Rule-based severity estimation · Not a substitute for professional
            medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
