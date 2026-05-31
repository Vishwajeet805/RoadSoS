import { Link } from "react-router-dom";
import { Siren, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 hover-lift-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-emergency to-red-600 rounded-lg flex items-center justify-center shadow-glow-emergency">
                <Siren size={18} className="text-white" />
              </div>
              <span className="font-display font-black text-xl">Road<span className="text-cyan-400">SoS</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              AI-powered emergency and roadside assistance platform for safer roads.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "SOS Dashboard", to: "/dashboard" },
                { label: "Nearby Services", to: "/nearby" },
                { label: "Emergency Guide", to: "/guide" },
                { label: "About Us", to: "/about" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-cyan-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-widest">Project</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              Built for National Road Safety Hackathon 2026 · IIT Madras
            </p>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-emergency" /> by Team RoadSoS
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© 2026 RoadSoS. All rights reserved.</p>
          <p>Emergency Ready. Always Available.</p>
        </div>
      </div>
    </footer>
  );
}
