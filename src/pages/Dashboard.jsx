import { Siren, MapPin, Phone, Wifi, AlertTriangle, WifiOff, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import SOSButton from "../components/ui/SOSButton";
import LocationCard from "../components/LocationCard";
import QuickActionsCard from "../components/QuickActionsCard";
import EmergencyNumbersCard from "../components/EmergencyNumbersCard";
import VoiceSOS from "../components/VoiceSOS";
import useGeolocation from "../hooks/useGeolocation";
import useOfflineStatus from "../hooks/useOfflineStatus";
import { offlineService } from "../services/offlineService";

export default function Dashboard() {
  const { location, error, loading, accuracy, timestamp, getLocation, clearError, isFromStorage } = useGeolocation();
  const { isOnline, isOffline, showNotification, notificationMessage } = useOfflineStatus();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [emergencyKeyword, setEmergencyKeyword] = useState(null);

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
    setTimeout(() => setEmergencyMode(false), 5000);
  };

  const handleVoiceSOS = ({ keyword }) => {
    setEmergencyKeyword(keyword);
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
                <p className="font-display font-bold text-emergency text-lg">Emergency Mode Active!</p>
                <p className="text-sm text-white/70 mt-1">Keyword detected: <span className="font-display font-black uppercase">{emergencyKeyword}</span></p>
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

