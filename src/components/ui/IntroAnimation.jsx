import { useEffect, useState } from "react";
import { Siren } from "lucide-react";

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0=black, 1=logo, 2=glow, 3=tagline, 4=pulse, 5=done

  useEffect(() => {
    if (import.meta.env.DEV) console.log("🚀 IntroAnimation started");

    const timers = [
      setTimeout(() => { setPhase(1); if (import.meta.env.DEV) console.log("📍 Phase 1: Logo appears (300ms)"); }, 300),
      setTimeout(() => { setPhase(2); if (import.meta.env.DEV) console.log("✨ Phase 2: Glow effect (900ms)"); }, 900),
      setTimeout(() => { setPhase(3); if (import.meta.env.DEV) console.log("📝 Phase 3: Tagline (1500ms)"); }, 1500),
      setTimeout(() => { setPhase(4); if (import.meta.env.DEV) console.log("📡 Phase 4: Pulse rings (2100ms)"); }, 2100),
      setTimeout(() => { setPhase(5); if (import.meta.env.DEV) console.log("🎬 Phase 5: Fade out (2900ms)"); }, 2900),
      setTimeout(() => {
        if (import.meta.env.DEV) console.log("✅ IntroAnimation complete (3200ms)");
        onComplete();
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 5) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#020818" }}
    >
      {/* Skip button */}
      {phase >= 1 && (
        <button
          onClick={() => { setPhase(5); onComplete(); }}
          className="absolute top-6 right-6 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          Skip →
        </button>
      )}

      {/* Logo */}
      <div
        className="flex flex-col items-center gap-6 transition-all duration-700"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.7) translateY(20px)",
        }}
      >
        {/* Icon with glow ring */}
        <div className="relative">
          {phase >= 2 && (
            <>
              <div className="absolute inset-0 rounded-full bg-emergency/30 blur-2xl animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="absolute -inset-4 rounded-full border border-emergency/20 animate-ping" style={{ animationDuration: "2s" }} />
            </>
          )}
          <div
            className="relative w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: phase >= 2 ? "0 0 60px rgba(239,68,68,0.6), 0 0 120px rgba(239,68,68,0.3)" : "none",
            }}
          >
            <Siren size={44} className="text-white" />
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <div className="font-display font-black text-5xl tracking-tight">
            Road<span className="text-cyan-400">SoS</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div
        className="mt-8 text-center px-8 transition-all duration-700"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <p className="text-white/60 text-lg font-light tracking-wide max-w-sm">
          Every Second Matters During an Emergency
        </p>
      </div>

      {/* Location pulse rings */}
      {phase >= 4 && (
        <div className="mt-12 relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400 z-10" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-400/40 animate-ping"
              style={{
                width: `${i * 28}px`,
                height: `${i * 28}px`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, #020818, transparent)",
          opacity: phase >= 4 ? 1 : 0,
        }}
      />
    </div>
  );
}
