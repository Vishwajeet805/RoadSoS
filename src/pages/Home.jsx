import { useState } from "react";
import { Link } from "react-router-dom";
import { Siren, MapPin, Bot, BookOpen, Phone, Zap, Shield, Clock, ArrowRight, Mic, Wifi } from "lucide-react";

const features = [
  { icon: MapPin, label: "Nearby Services", desc: "Hospitals, police, ambulance & more", to: "/nearby", color: "text-cyan-400", gradient: "from-cyan-500/10 to-cyan-500/5" },
  { icon: Bot, label: "AI First Aid", desc: "Gemini-powered guidance", to: "/assistant", color: "text-emerald-400", gradient: "from-emerald-500/10 to-emerald-500/5" },
  { icon: BookOpen, label: "Emergency Guide", desc: "Offline-first knowledge", to: "/guide", color: "text-amber-400", gradient: "from-amber-500/10 to-amber-500/5" },
  { icon: Phone, label: "Global Numbers", desc: "Emergency contacts worldwide", to: "/guide", color: "text-purple-400", gradient: "from-purple-500/10 to-purple-500/5" },
];

const innovations = [
  { 
    icon: Mic, 
    title: "Voice SOS", 
    desc: "Say 'help' or 'emergency' to activate emergency mode instantly",
    features: ["Hands-free activation", "Keyword detection", "Instant response"]
  },
  { 
    icon: Wifi, 
    title: "Offline Emergency Mode", 
    desc: "Full functionality even without internet connection",
    features: ["Cached locations", "Offline contacts", "Emergency ready"]
  },
  { 
    icon: Bot, 
    title: "AI First Aid", 
    desc: "Get real-time first aid guidance powered by Gemini AI",
    features: ["Step-by-step help", "Safety warnings", "Professional advice"]
  },
];

const stats = [
  { icon: Zap, label: "Instant Response", value: "<2 seconds" },
  { icon: Shield, label: "Privacy First", value: "No tracking" },
  { icon: Clock, label: "24/7 Ready", value: "Always on" },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-emergency/10 border border-emergency/30 text-emergency text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:bg-emergency/20 transition-all hover-lift-sm">
                <Siren size={14} className="animate-pulse" /> Road Safety Hackathon 2026
              </div>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tight">
                Emergency
                <br />
                <span className="text-gradient-premium">Help,</span>
                <br />
                <span className="text-gradient-emergency">Instantly.</span>
              </h1>

              <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-12 max-w-lg font-light">
                AI-powered roadside assistance. Find hospitals, call for help, get first aid guidance — all <span className="text-cyan-300 font-semibold">offline-first</span> for reliability when you need it most.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
                <Link to="/dashboard" className="flex items-center gap-3 bg-gradient-to-r from-emergency to-red-600 hover:from-red-600 hover:to-red-700 text-white font-display font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 sos-glow hover:scale-105 active:scale-95 shadow-emergency-glow-lg w-full sm:w-auto justify-center group">
                  <Siren size={22} className="animate-pulse" /> Activate SOS
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/nearby" className="flex items-center gap-3 glass-md px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/15 transition-all duration-300 w-full sm:w-auto justify-center group hover-lift-sm">
                  <MapPin size={20} className="text-cyan-400" /> Find Services
                  <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="animate-fade-in">
                    <Icon size={24} className="text-cyan-400 mb-3" />
                    <div className="text-2xl font-display font-bold">{value}</div>
                    <div className="text-white/50 text-xs font-semibold uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex animate-slide-in-right">
              <div
                className="relative w-full h-full min-h-[32rem] group"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = event.clientX - rect.left;
                  const y = event.clientY - rect.top;
                  event.currentTarget.style.setProperty("--glow-x", `${x}px`);
                  event.currentTarget.style.setProperty("--glow-y", `${y}px`);
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--glow-x", "50%");
                  event.currentTarget.style.setProperty("--glow-y", "50%");
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-emergency/10"></div>
                <div
                  className="absolute w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none transition-all duration-300"
                  style={{
                    left: "var(--glow-x)",
                    top: "var(--glow-y)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <div className="absolute inset-0 glass-lg rounded-3xl border border-white/10 overflow-hidden shadow-glow-cyan">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(34,211,238,0.2), transparent 35%)",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-cyan-300 shadow-glow-cyan animate-float">
                      <MapPin size={18} />
                    </div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-emergency shadow-emergency-glow-lg animate-float" style={{ animationDelay: "0.25s" }}>
                      <Siren size={18} />
                    </div>

                    <Link
                      to="/dashboard"
                      className="group relative inline-flex items-center justify-center w-60 h-60 rounded-full bg-gradient-to-br from-emergency to-red-600 text-white font-display text-xl font-black shadow-emergency-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      <span className="relative z-10 flex flex-col items-center gap-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-sm uppercase tracking-[0.3em]">
                          SOS
                        </span>
                        <span className="text-sm text-white/80 uppercase tracking-[0.16em]">Tap to Activate</span>
                      </span>
                    </Link>

                    <p className="mt-10 text-center text-sm text-white/60 max-w-xs leading-relaxed">
                      Hover over the button to guide the glow, then hit SOS to open the emergency command center.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Bento Grid */}
        <div className="bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="font-display text-5xl sm:text-6xl font-black mb-6 tracking-tight">
                <span className="text-gradient-premium">Everything You Need</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                Comprehensive tools designed for road emergencies. Find help faster, stay informed, and get the support you need instantly.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map(({ icon: Icon, label, desc, to, color, gradient }, idx) => (
                <Link
                  key={label}
                  to={to}
                  className={`card-premium p-8 group rounded-2xl ${gradient} backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300 h-full hover-lift`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative">
                    <div className={`${color} mb-5 text-4xl group-hover:scale-125 transition-transform duration-300`}>
                      <Icon size={44} />
                    </div>
                    <h3 className="font-display font-bold text-white mb-2 text-lg group-hover:text-cyan-300 transition-colors">{label}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Innovation Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 hover:bg-cyan-500/20 transition-all">
                <Zap size={14} /> Innovation Features
              </div>
              <h2 className="font-display text-5xl sm:text-6xl font-black mb-6 tracking-tight">
                <span className="text-gradient-premium">Beyond the Basics</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                RoadSoS combines cutting-edge AI, voice recognition, and offline-first technology for truly intelligent emergency response.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {innovations.map(({ icon: Icon, title, desc, features: featureList }, idx) => (
                <div
                  key={title}
                  className="card-premium p-8 rounded-3xl group hover-lift transition-all"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 transition-all">
                      <Icon size={28} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-xl group-hover:text-cyan-300 transition-colors">{title}</h3>
                    </div>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed text-sm">{desc}</p>
                  <ul className="space-y-3">
                    {featureList.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="text-cyan-400 font-bold mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-cyan-500/5 via-emergency/5 to-cyan-500/5 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="font-display text-5xl sm:text-6xl font-black mb-6 tracking-tight">
                <span className="text-gradient-premium">How It Works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { step: "1", title: "Accident Occurs", icon: "🚗", desc: "You need immediate help" },
                { step: "2", title: "Detect Location", icon: "📍", desc: "GPS pinpoints your position" },
                { step: "3", title: "Find Nearby Help", icon: "🏥", desc: "Hospitals and services appear" },
                { step: "4", title: "Get Assistance", icon: "🚑", desc: "Emergency response activated" },
              ].map(({ step, title, icon, desc }, idx) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emergency/20 flex items-center justify-center text-4xl shadow-glow-cyan">
                      {icon}
                    </div>
                    {idx < 3 && (
                      <div className="absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block"></div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/60 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="card-premium p-12 md:p-20 text-center overflow-hidden relative rounded-3xl border border-white/20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emergency/10 border border-emergency/30 text-emergency text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:bg-emergency/20 transition-all">
                <Shield size={14} /> Always Ready
              </div>
              <h2 className="font-display text-5xl sm:text-6xl font-black mb-8 tracking-tight">
                Ready for Any
                <br />
                <span className="text-gradient-emergency">Emergency?</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                Download RoadSoS now and ensure you're prepared for any roadside emergency. Works offline, always available, emergency-ready.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-navy-950 font-display font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 group"
              >
                <Siren size={22} /> Get Started Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
