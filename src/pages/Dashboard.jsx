import { Siren, MapPin, Phone, Wifi, AlertTriangle, WifiOff, Bell, Activity, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SOSButton from "../components/ui/SOSButton";
import LocationCard from "../components/LocationCard";
import QuickActionsCard from "../components/QuickActionsCard";
import EmergencyNumbersCard from "../components/EmergencyNumbersCard";
import VoiceSOS from "../components/VoiceSOS";
import CrashDetectionSimulator from "../components/CrashDetectionSimulator";
import EmergencySharePanel from "../components/EmergencySharePanel";
import useGeolocation from "../hooks/useGeolocation";
import useOfflineStatus from "../hooks/useOfflineStatus";
import { offlineService } from "../services/offlineService";
import { getNumbersByCountry } from "../services/emergencyNumbers";

export default function Dashboard() {
  const { location, error, loading, accuracy, timestamp, getLocation, clearError, isFromStorage } = useGeolocation();
  const { isOnline, isOffline, showNotification, notificationMessage } = useOfflineStatus();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [emergencyKeyword, setEmergencyKeyword] = useState(null);
  const [voiceCommand, setVoiceCommand] = useState("");
  const emergencySectionRef = useRef(null);
  const navigate = useNavigate();
  const numbers = getNumbersByCountry("IN");

  useEffect(() => {
    if (location) offlineService.cacheLocation(location);
  }, [location]);

  useEffect(() => {
    offlineService.cacheEmergencyContacts();
    offlineService.cacheFirstAidGuide();
  }, []);

  const handleRetry = () => { clearError(); getLocation(); };

  const handleEmergencyActivated = () => {
    setEmergencyMode(true);
    setSosActive(true);
    setTimeout(() => setEmergencyMode(false), 8000);
    setTimeout(() => {
      emergencySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleVoiceSOS = ({ keyword, fullText }) => {
    setEmergencyKeyword(keyword);
    setVoiceCommand(fullText || keyword || "Emergency command");
    handleEmergencyActivated();
  };

  const handleCrashDetected = ({ triggerType, message }) => {
    setEmergencyKeyword("crash");
    setVoiceCommand(triggerType || "Crash Detection Simulation");
    handleEmergencyActivated();
    void message;
  };

  const locationValue = location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Detecting...";
  const locationStatus = error ? "Error" : location ? "Active" : "Detecting...";

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Notifications ─────────────────────────────────── */}
        {showNotification && (
          <div className={`mb-5 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in glass-md ${
            isOffline ? "border-orange-400 bg-orange-500/10 text-orange-300" : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
          }`}>
            {isOffline ? <WifiOff size={18} className="flex-shrink-0 animate-pulse" /> : <Bell size={18} className="flex-shrink-0" />}
            <p className="text-sm font-medium">{notificationMessage}</p>
          </div>
        )}

        {isOffline && (
          <div className="mb-5 p-5 rounded-2xl border border-orange-400/40 bg-orange-500/8 glass-md animate-slide-up flex items-center gap-4">
            <div className="p-2.5 bg-orange-500/20 rounded-xl">
              <WifiOff size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="font-display font-bold text-orange-300">Offline Mode Active</p>
              <p className="text-xs text-white/50 mt-0.5">Emergency functions working with cached data</p>
            </div>
          </div>
        )}

        {emergencyMode && (
          <div className="mb-5 p-5 rounded-2xl border-2 border-emergency/70 bg-emergency/10 glass-md animate-emergency-pulse flex items-center gap-4">
            <div className="p-2.5 bg-emergency/20 rounded-xl animate-bounce">
              <AlertTriangle size={26} className="text-emergency" />
            </div>
            <div>
              <p className="font-display font-bold text-emergency text-lg">🚨 Emergency Mode Activated</p>
              <p className="text-xs text-white/60 mt-0.5">
                Detected: <span className="font-bold text-emergency uppercase">{voiceCommand || emergencyKeyword}</span>
              </p>
            </div>
          </div>
        )}

        {/* ── Page Header ───────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
          <div className="p-4 rounded-2xl flex-shrink-0" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: "0 0 24px rgba(239,68,68,0.4)" }}>
            <Siren size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">Emergency Command Center</h1>
            <p className="text-white/40 text-xs mt-2 font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Activity size={10} className="text-emerald-400 flex-shrink-0" />
              Real-time Response Ready
            </p>
          </div>
        </div>

        {/* ── BENTO GRID ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

          {/* SOS Button — Hero Cell (spans 1 col, tall) */}
          <div
            className="card-premium p-8 rounded-3xl border border-emergency/30 flex flex-col items-center justify-center text-center animate-slide-up row-span-1 md:row-span-2 relative overflow-hidden group hover:border-emergency/50 transition-all duration-300"
            style={{ minHeight: "360px", animationDelay: "50ms" }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-300" style={{
              background: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.3) 0%, transparent 70%)"
            }} />
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4 relative z-10">Manual SOS</p>
            <div className="flex justify-center mb-8 relative z-10">
              <SOSButton onClick={() => {
                handleEmergencyActivated();
                setEmergencyKeyword("manual");
                alert("SOS Activated!\nLocation: " + (location ? locationValue : "Detecting..."));
              }} />
            </div>
            <p className="text-white/40 text-sm relative z-10 font-medium">Tap to activate emergency response</p>
            <div className="mt-6 flex flex-col items-center gap-2 text-xs text-white/30 relative z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Location</span>
                <span className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Contacts</span>
              </div>
              <span className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Offline Ready</span>
            </div>
          </div>

          {/* Status cards — 3 small cells */}
          {[
            { icon: MapPin, label: "Location", value: locationStatus, color: error ? "text-emergency" : location ? "text-cyan-400" : "text-white/60", dot: error ? "#ef4444" : location ? "#22d3ee" : "#6b7280" },
            { icon: Phone, label: "Emergency", value: "112", color: "text-emergency", dot: "#ef4444" },
            { icon: Wifi, label: "Network", value: isOnline ? "Online" : "Offline", color: isOnline ? "text-emerald-400" : "text-orange-400", dot: isOnline ? "#34d399" : "#fb923c" },
          ].map(({ icon: Icon, label, value, color, dot }, idx) => (
            <div
              key={label}
              className="card-premium p-6 rounded-2xl text-center hover-lift animate-slide-up group hover:border-white/40 transition-all duration-300"
              style={{ animationDelay: `${100 + idx * 50}ms` }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300" style={{ background: dot }} />
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{label}</p>
              </div>
              <Icon size={20} className={`${color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} />
              <p className={`font-display font-black text-xl ${color}`}>{value}</p>
            </div>
          ))}

          {/* Location Card — spans 2 cols */}
          <div className="md:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <LocationCard
              location={location} loading={loading} error={error}
              accuracy={accuracy} timestamp={timestamp}
              onRetry={handleRetry} isFromStorage={isFromStorage}
            />
          </div>
        </div>

        {/* ── Quick Actions Row ──────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <a href="tel:112" className="flex flex-col items-center gap-3 p-5 rounded-2xl text-white font-display font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 text-center group"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(239,68,68,0.6), 0 0 50px rgba(239,68,68,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(239,68,68,0.3)"; }}>
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">☎️</span>
            <span>Call 112</span>
          </a>
          <button onClick={() => navigate("/nearby")} className="flex flex-col items-center gap-3 p-5 rounded-2xl text-cyan-300 font-display font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 card-premium border border-cyan-500/30 text-center group hover:border-cyan-400/60">
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">📍</span>
            <span>Find Help</span>
          </button>
          <button onClick={() => navigate("/assistant")} className="flex flex-col items-center gap-3 p-5 rounded-2xl text-emerald-300 font-display font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 card-premium border border-emerald-500/30 text-center group hover:border-emerald-400/60">
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🏥</span>
            <span>First Aid AI</span>
          </button>
          <button onClick={() => navigate("/guide")} className="flex flex-col items-center gap-3 p-5 rounded-2xl text-amber-300 font-display font-bold text-sm transition-all duration-300 hover:scale-110 active:scale-95 card-premium border border-amber-500/30 text-center group hover:border-amber-400/60">
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">📖</span>
            <span>Guide</span>
          </button>
        </div>

        {/* ── Second bento row ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: "280ms" }}>
            <VoiceSOS onEmergencyDetected={handleVoiceSOS} />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <QuickActionsCard onRefresh={getLocation} onShare={() => {}} loading={loading} />
          </div>
        </div>

        {/* ── Crash Detection ───────────────────────────────── */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "320ms" }}>
          <CrashDetectionSimulator location={location} onCrashDetected={handleCrashDetected} />
        </div>

        {/* ── Emergency Section (after SOS activated) ──────── */}
        {sosActive && (
          <div
            id="emergency-section"
            ref={emergencySectionRef}
            className="mb-8 rounded-3xl border border-emergency/50 bg-gradient-to-br from-emergency/15 to-red-600/10 glass-lg p-8 lg:p-10 shadow-emergency-glow animate-scale-in transition-all duration-300"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emergency font-bold">🚨 Immediate Assistance</p>
                  <h2 className="text-4xl lg:text-5xl font-display font-black text-white mt-2">Emergency Activated</h2>
                </div>
                <span className="inline-flex items-center rounded-2xl bg-white/10 px-6 py-3 text-sm text-white/80 backdrop-blur-md border border-white/20 whitespace-nowrap">
                  Detected: <strong className="ml-2 text-cyan-300 font-semibold">{voiceCommand || emergencyKeyword}</strong>
                </span>
              </div>
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 lg:p-6">
                <p className="text-sm lg:text-base text-white/90 font-medium">Quick action buttons below. All services available offline.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <a href="tel:112" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emergency to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-4 text-sm font-bold text-white transition-all duration-300 shadow-emergency-glow hover:scale-105 active:scale-95 sos-glow">
                  ☎️ Call 112
                </a>
                <a href={`tel:${numbers.ambulance}`} className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition-all duration-300 glass-md hover-lift">
                  🚑 Ambulance
                </a>
                <a href={`tel:${numbers.police}`} className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition-all duration-300 glass-md hover-lift">
                  🚔 Police
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => navigate("/nearby")} className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-6 py-4 text-sm font-bold text-slate-950 transition-all duration-300 shadow-glow-cyan hover:scale-105 active:scale-95">
                  📍 Find Nearby Help
                </button>
                <button type="button" onClick={() => navigate("/assistant")} className="rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition-all duration-300 glass-md hover-lift">
                  🏥 First Aid Assistant
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => navigate("/accident-severity")} className="rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-6 py-4 text-sm font-bold text-amber-300 transition-all duration-300 hover-lift">
                  🔍 Check Accident Severity
                </button>
                <button type="button" onClick={() => navigate("/guide")} className="rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition-all duration-300 glass-md hover-lift">
                  📖 Emergency Guide
                </button>
              </div>
              <div className="border-t border-white/10 pt-8">
                <EmergencySharePanel location={location} keyword={voiceCommand || emergencyKeyword} />
              </div>
            </div>
          </div>
        )}

        {/* ── Emergency Numbers ─────────────────────────────── */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "340ms" }}>
          <EmergencyNumbersCard countryCode="IN" />
        </div>
      </div>

      {/* ── Floating SOS FAB (mobile) ─────────────────────── */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <button
          onClick={() => {
            handleEmergencyActivated();
            setEmergencyKeyword("manual");
          }}
          className="w-16 h-16 rounded-full text-white font-display font-black text-sm flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: "0 0 30px rgba(239,68,68,0.6)" }}
        >
          SOS
        </button>
      </div>
    </div>
  );
}
