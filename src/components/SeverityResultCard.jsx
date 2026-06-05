// Phase F — Accident Severity Detection
// SeverityResultCard.jsx — Displays analysis output

import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CheckCircle2,
  ChevronRight,
  Zap,
  Info,
} from "lucide-react";

// ─── Risk-level config ───────────────────────────────────────────────────────
const LEVEL_CONFIG = {
  "High Risk": {
    icon: ShieldX,
    iconColor:    "text-emergency",
    badgeBg:      "bg-emergency/20",
    badgeBorder:  "border-emergency/50",
    badgeText:    "text-emergency",
    cardBorder:   "border-emergency/40",
    cardBg:       "from-emergency/15 to-red-600/5",
    glow:         "shadow-[0_0_40px_rgba(239,68,68,0.2)]",
    scoreColor:   "text-emergency",
    label:        "High Risk",
    emoji:        "🚨",
    summary:      "Immediate emergency response required. Call services now.",
  },
  "Medium Risk": {
    icon: ShieldAlert,
    iconColor:    "text-amber-400",
    badgeBg:      "bg-amber-500/20",
    badgeBorder:  "border-amber-500/40",
    badgeText:    "text-amber-300",
    cardBorder:   "border-amber-500/30",
    cardBg:       "from-amber-500/10 to-amber-600/5",
    glow:         "shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    scoreColor:   "text-amber-400",
    label:        "Medium Risk",
    emoji:        "⚠️",
    summary:      "Seek medical evaluation. Monitor symptoms closely.",
  },
  "Low Risk": {
    icon: ShieldCheck,
    iconColor:    "text-emerald-400",
    badgeBg:      "bg-emerald-500/20",
    badgeBorder:  "border-emerald-500/40",
    badgeText:    "text-emerald-300",
    cardBorder:   "border-emerald-500/30",
    cardBg:       "from-emerald-500/10 to-emerald-600/5",
    glow:         "shadow-[0_0_40px_rgba(52,211,153,0.1)]",
    scoreColor:   "text-emerald-400",
    label:        "Low Risk",
    emoji:        "✅",
    summary:      "Minor concern. Clean wounds, monitor for changes.",
  },
};

// ─── Button variant styles ────────────────────────────────────────────────────
const BTN_VARIANTS = {
  emergency: "bg-gradient-to-r from-emergency to-red-600 hover:from-red-500 hover:to-red-700 text-white sos-glow font-bold",
  cyan:       "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 shadow-glow-cyan font-bold",
  secondary:  "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold",
  ghost:      "bg-transparent hover:bg-white/10 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium",
};

export default function SeverityResultCard({ result }) {
  const navigate = useNavigate();

  if (!result) return null;

  const { level, score, detectedFactors, recommendations, emergencyButtons, criticalOverride } =
    result;
  const cfg = LEVEL_CONFIG[level] ?? LEVEL_CONFIG["Low Risk"];
  const Icon = cfg.icon;

  const handleAction = (action) => {
    switch (action) {
      case "SOS":
        navigate("/dashboard");
        break;
      case "NEARBY":
        navigate("/nearby");
        break;
      case "ASSISTANT":
        navigate("/assistant");
        break;
      case "GUIDE":
        navigate("/guide");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br ${cfg.cardBg} backdrop-blur-xl ${cfg.cardBorder} ${cfg.glow} p-6 sm:p-8 space-y-6 animate-scale-in`}
    >
      {/* ── Header: Risk badge + Score ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${cfg.badgeBg} border ${cfg.badgeBorder}`}>
            <Icon size={28} className={cfg.iconColor} />
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-0.5">
              Severity Level
            </p>
            <div className="flex items-center gap-2">
              <span className={`font-display font-black text-2xl sm:text-3xl ${cfg.iconColor}`}>
                {cfg.emoji} {level}
              </span>
              {criticalOverride && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emergency/30 text-emergency border border-emergency/40">
                  Critical Override
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Score badge */}
        <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border ${cfg.badgeBorder} ${cfg.badgeBg} flex-shrink-0`}>
          <span className={`font-display font-black text-3xl ${cfg.scoreColor}`}>{score}</span>
          <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Score</span>
        </div>
      </div>

      {/* ── Summary ───────────────────────────────────────────────────────── */}
      <div className={`p-4 rounded-xl border ${cfg.badgeBorder} ${cfg.badgeBg}`}>
        <p className="text-sm text-white/80 font-medium">{cfg.summary}</p>
      </div>

      {/* ── Detected Factors ──────────────────────────────────────────────── */}
      {detectedFactors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} className="text-white/50" />
            <p className="text-xs uppercase tracking-widest font-bold text-white/50">
              Detected Risk Factors
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {detectedFactors.map((factor) => (
              <span
                key={factor}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cfg.badgeBorder} ${cfg.badgeBg} ${cfg.badgeText}`}
              >
                {factor}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Recommendations ───────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={15} className="text-cyan-400" />
          <p className="text-xs uppercase tracking-widest font-bold text-white/50">
            Recommended Actions
          </p>
        </div>
        <ul className="space-y-2">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight size={14} className="text-cyan-400/60 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/75 leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Emergency Action Buttons ──────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={15} className="text-emergency" />
          <p className="text-xs uppercase tracking-widest font-bold text-white/50">
            Emergency Actions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyButtons.map((btn) => (
            <button
              key={btn.action}
              type="button"
              onClick={() => handleAction(btn.action)}
              className={`px-5 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover-lift-sm ${BTN_VARIANTS[btn.variant] ?? BTN_VARIANTS.secondary}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mini disclaimer inside result card ───────────────────────────── */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
        <Info size={13} className="text-white/30 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/35 leading-relaxed">
          Not a medical diagnosis. Always contact emergency services for serious situations.
        </p>
      </div>
    </div>
  );
}
