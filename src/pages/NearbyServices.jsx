import { MapPin } from "lucide-react";
import MapView from "../components/map/MapView";

export default function NearbyServices() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <MapPin size={28} className="text-cyan-400" />
        <h1 className="font-display text-3xl font-bold">Nearby Services</h1>
      </div>
      <MapView />
      <div className="mt-6 card-glass p-6 text-center text-white/40">
        <p className="text-sm">Hospitals · Police · Ambulance · Tow · Puncture · Showrooms</p>
        <p className="text-xs mt-2 text-white/20">Overpass API + Leaflet integration in Phase 2</p>
      </div>
    </div>
  );
}
