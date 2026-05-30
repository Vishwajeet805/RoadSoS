import { Link } from "react-router-dom";
import { Siren, MapPin, Bot, BookOpen, Phone } from "lucide-react";

const features = [
  { icon: MapPin, label: "Nearby Services", desc: "Hospitals, police, tow & more", to: "/nearby", color: "text-cyan-400" },
  { icon: Bot, label: "AI First Aid", desc: "Gemini-powered emergency guidance", to: "/assistant", color: "text-emerald-400" },
  { icon: BookOpen, label: "Emergency Guide", desc: "Works completely offline", to: "/guide", color: "text-amber-400" },
  { icon: Phone, label: "Global Numbers", desc: "Emergency contacts worldwide", to: "/guide", color: "text-purple-400" },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-emergency/10 border border-emergency/20 text-emergency text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <Siren size={13} /> Road Safety Hackathon 2026
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-6">
          Emergency Help,<br />
          <span className="text-cyan-400">Instantly.</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
          AI-powered roadside assistance. Find hospitals, call for help, and get first aid guidance — even without internet.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 bg-emergency hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all sos-glow hover:scale-105">
            <Siren size={20} /> Activate SOS
          </Link>
          <Link to="/nearby" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-8 py-4 rounded-xl text-lg transition-all">
            <MapPin size={20} /> Find Services
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, label, desc, to, color }) => (
          <Link key={label} to={to} className="card-glass p-6 hover:bg-white/8 transition-all hover:-translate-y-1 group">
            <Icon size={28} className={`${color} mb-4`} />
            <h3 className="font-display font-semibold text-white mb-1">{label}</h3>
            <p className="text-white/40 text-sm">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
