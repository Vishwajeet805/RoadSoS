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
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-transparent to-navy-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Offline Notification */}
        {showNotification && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in backdrop-blur-md ${isOffline
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
          <div className="mb-6 p-5 rounded-xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/10 to-orange-600/5 backdrop-blur-md animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <WifiOff size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="font-display font-bold text-orange-300 text-lg">Offline Mode Active</p>
                <p className="text-xs text-white/60 mt-1">Emergency functions working with cached data</p>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Alert Banner */}
        {emergencyMode && (
          <div className="mb-6 p-5 rounded-xl border-2 border-emergency/80 bg-gradient-to-r from-emergency/20 to-red-600/10 backdrop-blur-md animate-pulse">
            <div className="flex items-center gap-3">
              <div className="animate-bounce">
                <AlertTriangle size={24} className="text-emergency" />
              </div>
              <div>
                <p className="font-display font-bold text-emergency text-lg">Emergency Mode Activated</p>
                <p className="text-sm text-white/70 mt-1">Detected command: <span className="font-display font-black uppercase">{voiceCommand || emergencyKeyword}</span></p>
                <p className="text-xs text-white/60 mt-2">Use the emergency contacts below or open nearby services.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 mb-10 animate-slide-in-left">
          <div className="p-3 bg-gradient-to-br from-emergency to-red-600 rounded-lg">
            <Siren size={28} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-black">SOS Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Emergency Response Ready</p>
          </div>
        </div>

        {/* Location Card */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
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

        {/* Quick Actions */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <QuickActionsCard onRefresh={getLocation} onShare={() => { }} loading={loading} />
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MapPin, label: "Location", value: locationStatus, color: error ? "text-emergency" : location ? "text-cyan-400" : "text-white/60" },
            { icon: Phone, label: "Emergency", value: "112", color: "text-emergency" },
            { icon: Wifi, label: "Status", value: isOnline ? "Online" : "Offline", color: isOnline ? "text-emerald-400" : "text-orange-400" },
          ].map(({ icon: Icon, label, value, color }, idx) => (
            <div
              key={label}
              className="card-premium p-6 text-center"
              style={{ animationDelay: `${200 + idx * 50}ms` }}
            >
              <div className="flex justify-center mb-3">
                <Icon size={24} className={`${color}`} />
              </div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
              <p className="font-display font-bold text-2xl">{value}</p>
            </div>
          ))}
        </div>

        {/* Voice SOS */}
        <div className="mb-8">
          <VoiceSOS onEmergencyDetected={handleVoiceSOS} />
        </div>

        {/* Emergency Support Section */}
        {sosActive && (
          <div
            id="emergency-section"
            ref={emergencySectionRef}
            className="mb-8 rounded-3xl border border-emergency/50 bg-emergency/10 p-6 shadow-emergency-glow"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emergency font-bold">Emergency Assistance</p>
                  <h2 className="text-2xl font-display font-black text-white">Immediate Help Activated</h2>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">
                  Detected command: <strong className="ml-2 text-white">{voiceCommand || emergencyKeyword}</strong>
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-white/80">Use the emergency contacts below or open nearby services.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-3">
                <a
                  href="tel:112"
                  className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-4 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Call 112
                </a>
                <a
                  href={`tel:${numbers.ambulance}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Call Ambulance
                </a>
                <a
                  href={`tel:${numbers.police}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Call Police
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => navigate("/nearby")}
                  className="rounded-2xl bg-cyan-500 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Find Nearby Help
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/assistant")}
                  className="rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Open First Aid Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Numbers */}
        <div className="mb-8">
          <EmergencyNumbersCard countryCode="IN" />
        </div>

        {/* SOS Button Section */}
        <div className="card-premium p-10 text-center mb-8">
          <div className="mb-8">
            <p className="text-white/50 text-sm font-medium mb-2">Emergency Activation</p>
            <p className="text-white/30 text-xs">Single tap to activate emergency mode and alert nearby services</p>
          </div>
          <div className="flex justify-center mb-10">
            <SOSButton onClick={() => {
              handleEmergencyActivated();
              setEmergencyKeyword("manual");
              alert("SOS Activated!\nLocation: " + (location ? locationValue : "Detecting..."));
            }} />
          </div>
          <p className="text-white/30 text-xs">Location sharing and emergency contact alerts will activate immediately</p>
        </div>
      </div>
    </div>
  );
}

