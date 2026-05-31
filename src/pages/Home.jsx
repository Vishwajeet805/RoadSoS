import { Link } from "react-router-dom";
import { Siren, MapPin, Bot, BookOpen, Phone, Zap, Shield, Clock } from "lucide-react";

const features = [
  { icon: MapPin, label: "Nearby Services", desc: "Hospitals, police, tow & more", to: "/nearby", color: "text-cyan-400" },
  { icon: Bot, label: "AI First Aid", desc: "Gemini-powered emergency guidance", to: "/assistant", color: "text-emerald-400" },
  { icon: BookOpen, label: "Emergency Guide", desc: "Works completely offline", to: "/guide", color: "text-amber-400" },
  { icon: Phone, label: "Global Numbers", desc: "Emergency contacts worldwide", to: "/guide", color: "text-purple-400" },
];

const stats = [
  { icon: Zap, label: "Instant Response", value: "<2 seconds" },
  { icon: Shield, label: "Fully Secure", value: "Privacy First" },
  { icon: Clock, label: "24/7 Available", value: "Always Ready" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 bg-emergency/10 border border-emergency/30 text-emergency text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:bg-emergency/20 transition-all">
              <Siren size={14} className="animate-pulse" /> Road Safety Hackathon 2026
            </div>

            <h1 className="font-display text-6xl sm:text-7xl font-black leading-tight mb-8">
              Emergency Help,
              <br />
              <span className="text-gradient-cyan">Instantly.</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              AI-powered roadside assistance. Find hospitals, call for help, and get first aid guidance — all <span className="text-cyan-300 font-semibold">offline-first</span> for reliability when you need it most.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link to="/dashboard" className="flex items-center gap-3 bg-gradient-to-r from-emergency to-red-600 hover:from-red-600 hover:to-red-700 text-white font-display font-bold px-8 py-4 rounded-xl text-lg transition-all sos-glow hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                <Siren size={22} className="animate-pulse" /> Activate SOS
              </Link>
              <Link to="/nearby" className="flex items-center gap-3 btn-secondary w-full sm:w-auto justify-center">
                <MapPin size={20} /> Find Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="animate-fade-in">
                  <Icon size={24} className="text-cyan-400 mb-2" />
                  <div className="text-2xl font-display font-bold">{value}</div>
                  <div className="text-white/50 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex animate-slide-in-right">
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emergency/20 rounded-3xl blur-3xl"></div>
              <div className="absolute inset-0 border border-white/10 rounded-3xl backdrop-blur-xl bg-white/5 flex items-center justify-center">
                <div className="animate-pulse">
                  <Siren size={120} className="text-emergency" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-4">Everything You Need</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Comprehensive tools designed for road emergencies. Find help faster, stay informed, and get the support you need instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, label, desc, to, color }, idx) => (
              <Link
                key={label}
                to={to}
                className="card-premium p-8 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative">
                  <div className={`${color} mb-6 text-4xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={40} />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2 text-lg">{label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="card-premium p-12 md:p-16 text-center overflow-hidden relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="section-title text-white mb-6">Ready for Any Emergency?</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Download RoadSoS now and ensure you're prepared for any roadside emergency. Works offline, always available.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-navy-950 font-display font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 sos-glow hover:scale-105 active:scale-95"
            >
              <Siren size={22} /> Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
