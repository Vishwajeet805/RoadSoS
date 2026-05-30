import { MapPin, Navigation, AlertCircle, Loader, Database } from "lucide-react";

export default function LocationCard({ location, loading, error, accuracy, timestamp, onRetry, isFromStorage }) {
  const formatCoordinates = (lat, lng) => `${lat?.toFixed(6) || "--"}, ${lng?.toFixed(6) || "--"}`;

  const formatTime = (ts) => {
    if (!ts) return "--";
    return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  if (loading && !location) {
    return (
      <div className="card-glass p-8 text-center">
        <div className="flex justify-center mb-4">
          <Loader size={32} className="text-cyan-400 animate-spin" />
        </div>
        <p className="text-white/60">Detecting your location...</p>
        <p className="text-white/40 text-sm mt-2">Please allow location access if prompted</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-glass p-8 border border-emergency/30 bg-emergency/5">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={24} className="text-emergency" />
          <h3 className="font-display font-bold text-lg">Location Error</h3>
        </div>
        <p className="text-white/70 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-display font-semibold rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="card-glass p-8 text-center">
        <MapPin size={32} className="text-white/40 mx-auto mb-3" />
        <p className="text-white/60">No location data</p>
      </div>
    );
  }

  return (
    <div className="card-glass p-6">
      <div className="flex items-center gap-2 mb-5">
        <Navigation size={20} className="text-cyan-400" />
        <h3 className="font-display font-bold text-lg">Current Location</h3>
        {isFromStorage && <Database size={16} className="text-white/40 ml-auto" title="Last known location from storage" />}
      </div>

      {isFromStorage && <p className="text-white/40 text-xs mb-4">📍 Last Known Location (from device storage)</p>}

      <div className="space-y-3">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Coordinates</p>
          <p className="font-mono text-white font-semibold text-base">{formatCoordinates(location.lat, location.lng)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Accuracy</p>
            <p className="font-mono text-white font-semibold">{accuracy ? `±${accuracy}m` : "--"}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-white/50 text-xs mb-1 uppercase tracking-wide">Updated</p>
            <p className="font-mono text-white font-semibold text-sm">{formatTime(timestamp)}</p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 text-sm">
            <Loader size={14} className="animate-spin" />
            <span>Updating location...</span>
          </div>
        )}
      </div>
    </div>
  );
}
