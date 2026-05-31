import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Siren, Zap } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "SOS Dashboard" },
  { to: "/nearby", label: "Nearby Services" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/guide", label: "Emergency Guide" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-navy-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emergency to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Siren size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight">
                Road<span className="text-cyan-400">SoS</span>
              </span>
              <span className="text-white/40 text-xs font-medium">Emergency Ready</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive
                  ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/40"
                  : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`
              }>
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link to="/dashboard" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emergency to-red-600 hover:from-red-600 hover:to-red-700 text-white font-display font-bold px-6 py-2.5 rounded-lg transition-all duration-300 sos-glow hover:scale-105 active:scale-95">
            <Zap size={16} className="animate-pulse" /> SOS
          </Link>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy-900/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-slide-down">
          {navLinks.map((link, idx) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${isActive
                  ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/40"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emergency to-red-600 text-white font-display font-bold px-6 py-3 rounded-lg mt-4 sos-glow">
            <Zap size={18} /> SOS Emergency
          </Link>
        </div>
      )}
    </nav>
  );
}
