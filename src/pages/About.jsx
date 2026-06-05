import { Users, Siren, Github, ExternalLink, Award, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  { name: "Vishwajeet Singh", role: "Team Lead · Architecture · Integration", initials: "VS", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400" },
  { name: "Shaurya Dubey", role: "Frontend UI · Responsiveness · Layout", initials: "SD", color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400" },
  { name: "Aditya Jain", role: "Maps · APIs · AI Integration", initials: "AJ", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400" },
];

const highlights = [
  { icon: Award, label: "IIT Madras", desc: "National Road Safety Hackathon 2026" },
  { icon: Zap, label: "AI-Powered", desc: "Gemini-based first aid assistant" },
  { icon: Shield, label: "Offline-First", desc: "Works without internet connection" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-slide-in-left">
          <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/20">
            <Users size={26} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight">About RoadSoS</h1>
            <p className="text-white/40 text-xs mt-1 font-semibold uppercase tracking-widest">Team & Mission</p>
          </div>
        </div>

        {/* Mission card */}
        <div className="card-premium p-7 rounded-3xl border border-white/15 mb-6 animate-slide-up relative overflow-hidden" style={{ animationDelay: "80ms" }}>
          <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none" style={{
            background: "radial-gradient(circle, rgba(34,211,238,1) 0%, transparent 70%)"
          }} />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              boxShadow: "0 0 16px rgba(239,68,68,0.4)"
            }}>
              <Siren size={20} className="text-white" />
            </div>
            <h2 className="font-display font-black text-xl">Our Mission</h2>
          </div>
          <p className="text-white/65 leading-relaxed text-sm">
            RoadSoS is an AI-powered emergency response platform built for the <strong className="text-white">National Road Safety Hackathon 2026</strong> organized by <strong className="text-cyan-400">IIT Madras</strong>. Our goal is to reduce emergency response time during road accidents through intelligent, offline-capable technology.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-slide-up" style={{ animationDelay: "140ms" }}>
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="card-glass p-4 rounded-2xl text-center">
              <Icon size={20} className="text-cyan-400 mx-auto mb-2" />
              <p className="font-display font-bold text-white text-sm">{label}</p>
              <p className="text-white/40 text-xs mt-1 leading-tight">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">The Team</p>
          <div className="space-y-3">
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className="card-glass p-5 rounded-2xl flex items-center gap-4 hover-lift transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center font-display font-black text-sm flex-shrink-0 ${color}`}>
                  {initials}
                </div>
                <div>
                  <p className="font-display font-bold text-white">{name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: "280ms" }}>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white transition-all hover:scale-105 active:scale-95 text-sm"
            style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: "0 0 20px rgba(239,68,68,0.35)" }}
          >
            <Siren size={16} /> Try SOS Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
