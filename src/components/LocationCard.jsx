import { MapPin, Navigation, AlertCircle, Loader, Database, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function LocationCard({ location, loading, error, accuracy, timestamp, onRetry, isFromStorage }) {
  const [copied, setCopied] = useState(false);

  const formatCoordinates = (lat, lng) => `${lat?.toFixed(6) || "--"}, ${lng?.toFixed(6) || "--"}`;

  const formatTime = (ts) => {
    if (!ts) return "--";
    return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const copyCoordinates = () => {
    if (location) {
      navigator.clipboard.writeText(formatCoordinates(location.lat, location.lng));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading && !location) {
    return (
      <div className="card-premium p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse"></div>
            <Loader size={32} className="text-cyan-400 animate-spin absolute inset-2 m-auto" />
          </div>
        </div>
        <p className="text-white font-semibold mb-2">Detecting your location...</p>
        <p className="text-white/50 text-sm">Please allow location access if prompted</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-premium p-8 border border-emergency/30 bg-gradient-to-br from-emergency/10 to-red-600/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emergency/20 rounded-lg">
            <AlertCircle size={24} className="text-emergency" />
          </div>
          <h3 className="font-display font-bold text-lg text-emergency">Location Error</h3>
        </div>
        <p className="text-white/70 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-navy-950 font-display font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="card-premium p-10 text-center">
        <MapPin size={40} className="text-white/30 mx-auto mb-4" />
        <p className="text-white/60 font-medium">No location data available</p>
      </div>
    );
  }

  return (
    <div className="card-premium p-8 animate-scale-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Navigation size={24} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-white">Current Location</h3>
          {isFromStorage && <p className="text-white/40 text-xs mt-1">📍 Last Known Location</p>}
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Coordinates */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/5 rounded-lg p-6 border border-cyan-500/30">
          <p className="text-cyan-400 text-xs font-semibold mb-2 uppercase tracking-wider">GPS Coordinates</p>
          <p className="font-mono text-white font-bold text-lg mb-3">{formatCoordinates(location.lat, location.lng)}</p>
          <button
            onClick={copyCoordinates}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all"
          >
            <Copy size={14} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Accuracy and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/8 transition-colors">
            <p className="text-white/50 text-xs mb-2 uppercase tracking-wider">Accuracy</p>
            <p className="font-display font-bold text-white text-lg">{accuracy ? `±${accuracy}m` : "--"}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/8 transition-colors">
            <p className="text-white/50 text-xs mb-2 uppercase tracking-wider">Last Update</p>
            <p className="font-mono text-white font-semibold">{formatTime(timestamp)}</p>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
            <Loader size={14} className="animate-spin" />
            <span>Updating location...</span>
          </div>
        )}
      </div>
    </div>
  );
}
