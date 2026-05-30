import { MapPin, Phone } from "lucide-react";

export default function ServiceCard({ name, type, distance, phone }) {
  return (
    <div className="card-glass p-4 hover:bg-white/8 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-white/40 text-xs capitalize">{type}</p>
        </div>
        {distance && (
          <span className="text-cyan-400 text-xs flex items-center gap-1">
            <MapPin size={11} /> {distance}
          </span>
        )}
      </div>
      {phone && (
        <a href={`tel:${phone}`} className="flex items-center gap-1 text-xs text-white/50 hover:text-cyan-400 transition-colors mt-2">
          <Phone size={12} /> {phone}
        </a>
      )}
    </div>
  );
}
