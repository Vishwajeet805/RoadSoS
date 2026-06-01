import { Siren, MapPin, Phone, Wifi, AlertTriangle, WifiOff, Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SOSButton from "../components/ui/SOSButton";
import LocationCard from "../components/LocationCard";
import QuickActionsCard from "../components/QuickActionsCard";
import EmergencyNumbersCard from "../components/EmergencyNumbersCard";
import VoiceSOS from "../components/VoiceSOS";
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

  // Cache location and emergency data when online or when location updates
  useEffect(() => {
    if (location) {
      offlineService.cacheLocation(location);
    }
  }, [location]);

  // Cache emergency contacts and first aid guide on mount
  useEffect(() => {
    offlineService.cacheEmergencyContacts();
    offlineService.cacheFirstAidGuide();
  }, []);

  const handleRetry = () => {
    clearError();
    getLocation();
  };

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

  const locationValue = location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Detecting...";
  const locationStatus = error ? "Error" : location ? "Active" : "Detecting...";

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Offline Notification */}
        {showNotification && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in glass-md ${isOffline
              ? "border-orange-400 bg-orange-500/10 text-orange-300"
              : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
            }`}>
            {isOffline ? (
              <WifiOff size={20} className="flex-shrink-0 animate-pulse" />
            ) : (
              <Bell size={20} className="flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{notificationMessage}</p>
          </div>
        )}

        {/* Offline Mode Banner */}
        {isOffline && (
          <div className="mb-6 p-6 rounded-2xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/10 to-orange-600/5 glass-md animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <WifiOff size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="font-display font-bold text-orange-300 text-lg">Offline Mode Active</p>
                <p className="text-sm text-white/60 mt-1">Emergency functions working with cached data</p>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Alert Banner */}
        {emergencyMode && (
          <div className="mb-6 p-6 rounded-2xl border-2 border-emergency/80 bg-gradient-to-r from-emergency/20 to-red-600/10 glass-md animate-emergency-pulse">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emergency/20 rounded-xl animate-bounce">
                <AlertTriangle size={28} className="text-emergency" />
              </div>
              <div>
                <p className="font-display font-bold text-emergency text-xl">🚨 Emergency Mode Activated</p>
                <p className="text-sm text-white/70 mt-2">Detected: <span className="font-display font-black uppercase text-emergency">{voiceCommand || emergencyKeyword}</span></p>
                <p className="text-xs text-white/60 mt-1">Use quick actions below or nearby services</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
          <div className="p-3 bg-gradient-to-br from-emergency to-red-600 rounded-xl shadow-glow-emergency">
            <Siren size={32} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight">Emergency Command Center</h1>
            <p className="text-white/50 text-sm mt-2 font-semibold uppercase tracking-widest">Real-time Response Ready</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Location & Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Card */}
            <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <LocationCard
                location={location}
                loading={loading}
                error={error}
                accuracy={accuracy}
                timestamp={timestamp}
                onRetry={handleRetry}
                isFromStorage={isFromStorage}
              />
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "150ms" }}>
              {[
                { icon: MapPin, label: "Location", value: locationStatus, color: error ? "text-emergency" : location ? "text-cyan-400" : "text-white/60" },
                { icon: Phone, label: "Emergency", value: "112", color: "text-emergency" },
                { icon: Wifi, label: "Status", value: isOnline ? "Online" : "Offline", color: isOnline ? "text-emerald-400" : "text-orange-400" },
              ].map(({ icon: Icon, label, value, color }, idx) => (
                <div
                  key={label}
                  className="card-premium p-5 text-center rounded-2xl hover-lift"
                  style={{ animationDelay: `${200 + idx * 50}ms` }}
                >
                  <div className="flex justify-center mb-2">
                    <Icon size={20} className={`${color}`} />
                  </div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-display font-black text-xl">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <QuickActionsCard onRefresh={getLocation} onShare={() => { }} loading={loading} />
          </div>
        </div>

        {/* Voice SOS */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <VoiceSOS onEmergencyDetected={handleVoiceSOS} />
        </div>

        {/* Emergency Support Section */}
        {sosActive && (
          <div
            id="emergency-section"
            ref={emergencySectionRef}
            className="mb-8 rounded-3xl border border-emergency/50 bg-gradient-to-br from-emergency/15 to-red-600/10 glass-lg p-8 shadow-emergency-glow animate-scale-in"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emergency font-bold">🚨 Immediate Assistance</p>
                  <h2 className="text-3xl font-display font-black text-white mt-1">Emergency Activated</h2>
                </div>
                <span className="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-xs text-white/80 backdrop-blur-md border border-white/20">
                  Detected: <strong className="ml-2 text-cyan-300 font-semibold">{voiceCommand || emergencyKeyword}</strong>
                </span>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                <p className="text-sm text-white/90">Quick action buttons below. All services available offline.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href="tel:112"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emergency to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-4 text-sm font-bold text-white transition duration-300 shadow-emergency-glow hover:scale-105 active:scale-95 sos-glow"
                >
                  ☎️ Call 112
                </a>
                <a
                  href={`tel:${numbers.ambulance}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition duration-300 glass-md hover-lift"
                >
                  🚑 Ambulance
                </a>
                <a
                  href={`tel:${numbers.police}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition duration-300 glass-md hover-lift"
                >
                  🚔 Police
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => navigate("/nearby")}
                  className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 px-6 py-4 text-sm font-bold text-slate-950 transition duration-300 shadow-glow-cyan hover:scale-105 active:scale-95"
                >
                  📍 Find Nearby Help
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/assistant")}
                  className="rounded-2xl bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-bold text-white transition duration-300 glass-md hover-lift"
                >
                  🏥 First Aid Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Numbers Card */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <EmergencyNumbersCard countryCode="IN" />
        </div>

        {/* SOS Button Section */}
        <div className="card-premium p-12 text-center mb-8 rounded-3xl border border-white/20 hover-lift animate-slide-up" style={{ animationDelay: "350ms" }}>
          <div className="mb-10">
            <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-2">Manual Emergency Activation</p>
            <p className="text-white/40 text-xs">Single tap below to immediately activate emergency response mode</p>
          </div>
          <div className="flex justify-center mb-10">
            <SOSButton onClick={() => {
              handleEmergencyActivated();
              setEmergencyKeyword("manual");
              alert("SOS Activated!\nLocation: " + (location ? locationValue : "Detecting..."));
            }} />
          </div>
          <p className="text-white/40 text-xs">✓ Location sharing · ✓ Emergency contacts · ✓ Works offline</p>
        </div>
      </div>
    </div>
  );
}

