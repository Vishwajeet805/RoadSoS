import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Siren } from "lucide-react";

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
    <nav className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Siren size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Road<span className="text-cyan-400">SoS</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? "text-cyan-400 bg-cyan-400/10" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link to="/dashboard" className="hidden md:flex items-center gap-2 bg-emergency hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all sos-glow hover:scale-105">
            <Siren size={15} /> SOS
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy-900/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "text-cyan-400 bg-cyan-400/10" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-emergency text-white text-sm font-semibold px-4 py-2.5 rounded-lg mt-2">
            <Siren size={15} /> SOS Emergency
          </Link>
        </div>
      )}
    </nav>
  );
}
