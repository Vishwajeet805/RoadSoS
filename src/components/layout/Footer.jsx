import { Link } from "react-router-dom";
import { Siren, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emergency rounded-md flex items-center justify-center">
            <Siren size={15} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg">Road<span className="text-cyan-400">SoS</span></span>
        </Link>
        <p className="text-white/40 text-sm text-center">Built for National Road Safety Hackathon 2026 · IIT Madras</p>
        <p className="text-white/40 text-sm flex items-center gap-1">
          Made with <Heart size={13} className="text-emergency mx-1" /> by Team RoadSoS
        </p>
      </div>
    </footer>
  );
}
