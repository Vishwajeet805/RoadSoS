// Phase G — Automatic Crash Detection Simulation
// CrashDetectionSimulator.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Navigation,
  Bot,
  Cpu,
  Satellite,
  Gauge,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  simulateCrashDetection,
  generateCrashAlertMessage,
} from "../services/crashDetectionService";

// ─── State machine values ─────────────────────────────────────────────────────
const STATE = {
  IDLE:       "idle",
  DETECTING:  "detecting",
  DETECTED:   "crash-detected",
  RESET:      "reset",
};

const COUNTDOWN_SECONDS = 3;

// ─── Future architecture items ────────────────────────────────────────────────
const FUTURE_ITEMS = [
  { icon: Activity,  label: "Accelerometer Impact Detection",  desc: "Detects sudden G-force spike on crash" },
  { icon: Gauge,     label: "Sudden Speed Drop Detection",     desc: ">30 km/h drop in <200ms triggers alert" },
  { icon: Satellite, label: "GPS Anomaly Detection",           desc: "Flags impossible location jumps" },
  { icon: Cpu,       label: "Device Motion Sensors",           desc: "DeviceMotion API (iOS/Android)" },
  { icon: Zap,       label: "Auto Emergency Notification",     desc: "Sends alert without user input" },
];

export default function CrashDetectionSimulator({ location, onCrashDetected }) {
  const [simState,  setSimState]  = useState(STATE.IDLE);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [crashData, setCrashData] = useState(null);
  const [showFuture, setShowFuture] = useState(false);

  const countdownRef = useRef(null);
  const navigate     = useNavigate();

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => () => clearInterval(countdownRef.current), []);

  // ── Start simulation ────────────────────────────────────────────────────────
  const handleSimulate = useCallback(() => {
    if (simState !== STATE.IDLE) return;
    setSimState(STATE.DETECTING);
    setCountdown(COUNTDOWN_SECONDS);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          // Run detection
          const result = simulateCrashDetection();
          setCrashData(result);
          setSimState(STATE.DETECTED);
          // Notify parent (Dashboard emergency mode)
          onCrashDetected?.({
            triggerType: result.triggerType,
            message:     result.message,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [simState, onCrashDetected]);

  // ── Reset simulation ────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    clearInterval(countdownRef.current);
    setSimState(STATE.IDLE);
    setCountdown(COUNTDOWN_SECONDS);
    setCrashData(null);
  }, []);

  // ── Emergency message & share URLs ─────────────────────────────────────────
  const emergencyMsg = crashData
    ? generateCrashAlertMessage(location, crashData.triggerType)
    : "";

  const mapsUrl = location
    ? `https://maps.google.com/?q=${location.lat},${location.lng}`
    : null;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMsg)}`;
  const smsUrl      = `sms:?body=${encodeURIComponent(emergencyMsg)}`;

  // ── Status bar ──────────────────────────────────────────────────────────────
  const statusConfig = {
    [STATE.IDLE]: {
      dot:   "bg-white/30",
      text:  "Simulation ready. No crash detected.",
      color: "text-white/50",
    },
    [STATE.DETECTING]: {
      dot:   "bg-amber-400 animate-ping",
      text:  "Detecting abnormal motion…",
      color: "text-amber-300",
    },
    [STATE.DETECTED]: {
      dot:   "bg-emergency animate-ping",
      text:  "⚠️ Possible crash detected!",
      color: "text-emergency",
    },
  };
  const status = statusConfig[simState] ?? statusConfig[STATE.IDLE];

  return (
    <div className="space-y-4">

      {/* ── Main card ────────────────────────────────────────────────────── */}
      <div
        className={`rounded-3xl border backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 ${
          simState === STATE.DETECTED
            ? "border-emergency/60 bg-gradient-to-br from-emergency/20 to-red-900/10 shadow-[0_0_60px_rgba(239,68,68,0.25)]"
            : simState === STATE.DETECTING
            ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-amber-900/5 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
            : "border-white/10 bg-gradient-to-br from-white/8 to-white/3 shadow-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl transition-colors duration-300 ${
                simState === STATE.DETECTED
                  ? "bg-emergency/20"
                  : simState === STATE.DETECTING
                  ? "bg-amber-500/20"
                  : "bg-white/8"
              }`}
            >
              <Activity
                size={24}
                className={
                  simState === STATE.DETECTED
                    ? "text-emergency"
                    : simState === STATE.DETECTING
                    ? "text-amber-400 animate-pulse"
                    : "text-white/50"
                }
              />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
                Crash Detection
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400/70">
                Simulation Mode
              </span>
            </div>
          </div>

          {/* SIM badge */}
          <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            SIM
          </span>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-2.5 mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${status.dot}`} />
          <span className={`text-sm font-semibold ${status.color}`}>{status.text}</span>
        </div>

        {/* ── IDLE: simulate button ─────────────────────────────────────── */}
        {simState === STATE.IDLE && (
          <div className="space-y-3">
            <p className="text-sm text-white/50 leading-relaxed">
              Press the button below to simulate automatic crash detection. The system will
              activate emergency mode and generate a location-based alert.
            </p>
            <button
              type="button"
              onClick={handleSimulate}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emergency to-red-600 hover:from-red-500 hover:to-red-700 text-white font-display font-black text-sm transition-all duration-300 sos-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Activity size={18} className="animate-pulse" />
              Simulate Crash Detection
            </button>
          </div>
        )}

        {/* ── DETECTING: countdown ─────────────────────────────────────── */}
        {simState === STATE.DETECTING && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              {/* Countdown ring */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/60" />
                <span className="font-display font-black text-4xl text-amber-400">{countdown}</span>
              </div>
              <div className="text-center">
                <p className="text-amber-300 font-display font-bold text-lg">Analysing motion data…</p>
                <p className="text-white/40 text-xs mt-1">Emergency mode activating in {countdown}s</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 text-white/60 hover:text-white text-sm font-semibold transition-all duration-300"
            >
              <RotateCcw size={14} />
              Cancel
            </button>
          </div>
        )}

        {/* ── DETECTED: crash alert + actions ─────────────────────────── */}
        {simState === STATE.DETECTED && (
          <div className="space-y-5 animate-scale-in">
            {/* Alert banner */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emergency/20 border border-emergency/50">
              <AlertTriangle size={22} className="text-emergency flex-shrink-0 mt-0.5 animate-bounce" />
              <div>
                <p className="font-display font-black text-emergency text-base">
                  🚨 Possible Crash Detected
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Emergency mode activated. Alert ready to send.
                </p>
                {crashData?.timestamp && (
                  <p className="text-white/35 text-xs mt-1">
                    {new Date(crashData.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            {/* Location status */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
              <MapPin size={15} className={location ? "text-cyan-400" : "text-white/30"} />
              {location ? (
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-white/60">Location captured: </span>
                  <span className="text-xs font-mono text-cyan-300">
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-white/40">Location unavailable — alert will exclude coordinates</span>
              )}
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-400 text-xs font-bold transition-colors"
                >
                  Map ↗
                </a>
              )}
            </div>

            {/* Emergency message preview */}
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-white/5 border border-white/10 list-none">
                <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">Preview Alert Message</span>
                <ChevronDown size={14} className="text-white/30 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-3 rounded-xl bg-navy-900 border border-white/10">
                <pre className="text-xs text-white/60 whitespace-pre-wrap font-mono leading-relaxed">
                  {emergencyMsg}
                </pre>
              </div>
            </details>

            {/* Share actions */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-white/35 mb-2">Share Alert</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-bold transition-all hover-lift-sm"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={smsUrl}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all hover-lift-sm"
                >
                  <MessageSquare size={15} />
                  SMS
                </a>
              </div>
            </div>

            {/* Call 112 */}
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-emergency to-red-600 hover:from-red-500 hover:to-red-700 text-white font-display font-black text-sm transition-all sos-glow hover:scale-[1.01] active:scale-[0.99]"
            >
              <Phone size={16} />
              Call 112 — National Emergency
            </a>

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate("/nearby")}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all hover-lift-sm"
              >
                <Navigation size={14} />
                Nearby Help
              </button>
              <button
                type="button"
                onClick={() => navigate("/assistant")}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 text-white/70 hover:text-white text-xs font-bold transition-all hover-lift-sm"
              >
                <Bot size={14} />
                First Aid AI
              </button>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-sm font-semibold transition-all duration-300"
            >
              <RotateCcw size={14} />
              Reset Simulation
            </button>
          </div>
        )}
      </div>

      {/* ── Safety disclaimer ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/4 border border-white/10">
        <Info size={14} className="text-white/30 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/35 leading-relaxed">
          Crash Detection is currently running in <strong className="text-white/50">simulation mode</strong>.
          Real sensor-based crash detection requires mobile device motion sensors, GPS analysis,
          and emergency service integration.
        </p>
      </div>

      {/* ── Future architecture (collapsible) ────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFuture((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-cyan-400/60" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
              Future Real-Sensor Architecture
            </span>
          </div>
          {showFuture
            ? <ChevronUp size={14} className="text-white/25" />
            : <ChevronDown size={14} className="text-white/25" />}
        </button>

        {showFuture && (
          <div className="px-5 pb-5 space-y-2 animate-fade-in">
            {FUTURE_ITEMS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/4 border border-white/8"
              >
                <Icon size={15} className="text-cyan-400/50 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white/60">{label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
