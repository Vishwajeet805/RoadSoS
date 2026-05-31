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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Offline Notification */}
      {showNotification && (
        <div className={`mb-6 p-3 rounded-lg border-l-4 flex items-center gap-3 animate-fade-in ${
          isOffline
            ? "border-orange-400 bg-orange-500/10 text-orange-300"
            : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
        }`}>
          {isOffline ? (
            <WifiOff size={20} className="flex-shrink-0" />
          ) : (
            <Bell size={20} className="flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{notificationMessage}</p>
        </div>
      )}

      {/* Offline Mode Banner */}
      {isOffline && (
        <div className="mb-6 p-4 rounded-lg border-2 border-orange-400 bg-orange-500/5">
          <div className="flex items-center gap-3">
            <WifiOff size={24} className="text-orange-400" />
            <div>
              <p className="font-display font-bold text-orange-300">Offline Mode Active</p>
              <p className="text-xs text-white/60">Emergency functions working with cached data</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Alert Banner */}
      {emergencyMode && (
        <div className="mb-6 p-4 rounded-lg border-2 border-emergency bg-emergency/10 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-emergency" />
            <div>
              <p className="font-display font-bold text-emergency">Emergency Mode Active!</p>
              <p className="text-sm text-white/70">Keyword detected: <span className="font-semibold uppercase">{emergencyKeyword}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Siren size={28} className="text-emergency" />
        <h1 className="font-display text-3xl font-bold">SOS Dashboard</h1>
      </div>

      {/* Location Card */}
      <div className="mb-6">
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
      <QuickActionsCard onRefresh={getLocation} onShare={() => {}} loading={loading} />

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MapPin, label: "Location", value: locationStatus, color: error ? "text-emergency" : location ? "text-cyan-400" : "text-white/60" },
          { icon: Phone, label: "Emergency", value: "112", color: "text-emergency" },
          { icon: Wifi, label: "Status", value: "Online", color: "text-emerald-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-glass p-5">
            <Icon size={20} className={`${color} mb-2`} />
            <p className="text-white/40 text-xs mb-1">{label}</p>
            <p className="font-display font-bold text-xl">{value}</p>
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
      <div className="card-glass p-8 text-center">
        <p className="text-white/40 text-sm mb-6">Or tap to activate emergency mode</p>
        <div className="flex justify-center">
          <SOSButton onClick={() => {
            handleEmergencyActivated();
            setEmergencyKeyword("manual");
            alert("SOS Activated!\nLocation: " + (location ? locationValue : "Detecting..."));
          }} />
        </div>
        <p className="text-white/20 text-xs mt-6">Location sharing and emergency contact alerts will activate</p>
      </div>
    </div>
  );
}

