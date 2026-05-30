import { Siren, MapPin, Phone, Wifi } from "lucide-react";
import { useState } from "react";
import SOSButton from "../components/ui/SOSButton";
import LocationCard from "../components/LocationCard";
import QuickActionsCard from "../components/QuickActionsCard";
import EmergencyNumbersCard from "../components/EmergencyNumbersCard";
import useGeolocation from "../hooks/useGeolocation";

export default function Dashboard() {
  const { location, error, loading, accuracy, timestamp, getLocation, clearError, isFromStorage } = useGeolocation();

  const handleRetry = () => {
    clearError();
    getLocation();
  };

  const locationValue = location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Detecting...";
  const locationStatus = error ? "Error" : location ? "Active" : "Detecting...";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
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

      {/* Emergency Numbers */}
      <div className="mb-8">
        <EmergencyNumbersCard countryCode="IN" />
      </div>

      {/* SOS Button Section */}
      <div className="card-glass p-8 text-center">
        <p className="text-white/40 text-sm mb-6">Tap to activate emergency mode</p>
        <div className="flex justify-center">
          <SOSButton onClick={() => alert("SOS Activated!\nLocation: " + (location ? locationValue : "Detecting..."))} />
        </div>
        <p className="text-white/20 text-xs mt-6">Location sharing and emergency contact alerts will activate</p>
      </div>
    </div>
  );
}

