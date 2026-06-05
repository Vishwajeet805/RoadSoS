import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home, Siren, MapPin, Bot, BookOpen, Phone,
  AlertTriangle, Info, Menu, X, Zap
} from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/dashboard", label: "SOS Dashboard", icon: Siren },
  { to: "/nearby", label: "Nearby Services", icon: MapPin },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/guide", label: "Emergency Guide", icon: BookOpen },
  { to: "/contacts", label: "Contacts", icon: Phone },
  { to: "/accident-severity", label: "Severity Check", icon: AlertTriangle },
  { to: "/about", label: "About", icon: Info },
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20"
        style={{
          background: "rgba(4,15,43,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-transform duration-500"
        style={{
          width: "280px",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          background: "linear-gradient(180deg, rgba(4,15,43,0.99) 0%, rgba(2,8,24,0.99) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "8px 0 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
            >
              <Siren size={20} className="text-white" />
            </div>
            <div>
              <div className="font-display font-black text-lg tracking-tight">
                Road<span className="text-cyan-400">SoS</span>
              </div>
              <div className="text-white/30 text-[9px] font-semibold tracking-[0.2em] uppercase">Emergency Ready</div>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-glow-cyan"
                    : "text-white/55 hover:text-cyan-300 hover:bg-white/8 border border-transparent hover:border-cyan-500/20"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={`flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400 scale-110"
                      : "text-white/50 group-hover:scale-110 group-hover:text-cyan-400"
                  }`} />
                  <span className="text-sm font-medium transition-colors duration-300">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* SOS button */}
        <div className="px-4 py-4 border-t border-white/8">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 0 24px rgba(239,68,68,0.4)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 36px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.4)";
            }}
          >
            <Zap size={18} className="animate-pulse group-hover:scale-125 transition-transform duration-300" />
            SOS Emergency
          </Link>
        </div>
      </div>
    </>
  );
}
