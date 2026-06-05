import { NavLink, Link } from "react-router-dom";
import {
  Home, Siren, MapPin, Bot, BookOpen, Phone,
  AlertTriangle, Info, ChevronLeft, ChevronRight, Zap, Activity
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

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-500"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "linear-gradient(180deg, rgba(4,15,43,0.98) 0%, rgba(2,8,24,0.98) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8" style={{ minHeight: "72px" }}>
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            }}
          >
            <Siren size={20} className="text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-display font-black text-lg tracking-tight whitespace-nowrap">
                Road<span className="text-cyan-400">SoS</span>
              </div>
              <div className="text-white/30 text-[9px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
                Emergency Ready
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-glow-cyan"
                  : "text-white/50 hover:text-cyan-300 hover:bg-white/8 border border-transparent hover:border-cyan-500/20"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-gradient-to-b from-cyan-400 to-cyan-500 transition-all duration-300" />
                )}
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400 scale-110"
                      : "text-white/50 group-hover:scale-110 group-hover:text-cyan-400"
                  }`}
                />
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* SOS Quick Button */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-white/8">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: "0 0 20px rgba(239,68,68,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(239,68,68,0.6), 0 0 50px rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(239,68,68,0.35)";
            }}
          >
            <Zap size={16} className="animate-pulse group-hover:scale-125 transition-transform duration-300" />
            SOS Emergency
          </Link>
        </div>
      )}

      {collapsed && (
        <div className="px-2 py-3 border-t border-white/8">
          <Link
            to="/dashboard"
            title="SOS Emergency"
            className="flex items-center justify-center w-full h-10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: "0 0 16px rgba(239,68,68,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.6), 0 0 40px rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 16px rgba(239,68,68,0.4)";
            }}
          >
            <Zap size={16} className="text-white group-hover:scale-125 transition-transform duration-300" />
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-white/8 text-white/30 hover:text-cyan-400 transition-all duration-300 hover:bg-white/8"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} className="animate-pulse" /> : <ChevronLeft size={16} className="animate-pulse" />}
      </button>
    </aside>
  );
}
