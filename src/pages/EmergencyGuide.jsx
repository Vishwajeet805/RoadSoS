import { BookOpen, WifiOff, ShieldAlert, Clock, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import { firstAidGuide } from "../data/firstAidGuide";
import useOfflineStatus from "../hooks/useOfflineStatus";
import { offlineService } from "../services/offlineService";

const severityColors = {
  "bleeding": { level: "Critical", color: "text-emergency", bg: "bg-emergency/15", border: "border-emergency/30" },
  "cpr": { level: "Critical", color: "text-emergency", bg: "bg-emergency/15", border: "border-emergency/30" },
  "burns": { level: "High", color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-400/30" },
  "fractures": { level: "Medium", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-400/30" },
  "head-injury": { level: "Critical", color: "text-emergency", bg: "bg-emergency/15", border: "border-emergency/30" },
};

export default function EmergencyGuide() {
  const { isOnline, isOffline, showNotification, notificationMessage } = useOfflineStatus();
  const [guide] = useState(firstAidGuide);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => { offlineService.cacheFirstAidGuide(); }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Notifications */}
        {showNotification && (
          <div className={`mb-5 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in glass-md ${
            isOffline ? "border-orange-400 bg-orange-500/10 text-orange-300" : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
          }`}>
            {isOffline ? <WifiOff size={18} className="flex-shrink-0" /> : <Wifi size={18} className="flex-shrink-0" />}
            <p className="text-sm font-medium">{notificationMessage}</p>
          </div>
        )}

        {isOffline && (
          <div className="mb-5 p-5 rounded-2xl border border-orange-400/40 bg-orange-500/8 glass-md flex items-center gap-4">
            <div className="p-2.5 bg-orange-500/20 rounded-xl">
              <WifiOff size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="font-display font-bold text-orange-300">Offline Mode Active</p>
              <p className="text-xs text-white/50 mt-0.5">Emergency guide fully available without internet</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/20">
            <BookOpen size={32} className="text-amber-400" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">Emergency Guide</h1>
            <p className="text-white/40 text-sm mt-2 font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <WifiOff size={12} className="text-emerald-400" />
              Offline-ready · Step-by-step first aid
            </p>
          </div>
          {/* Offline badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Works Offline
          </div>
        </div>

        {!selectedGuide ? (
          /* ── Bento Grid ─────────────────────────────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up">
            {guide.map((item, idx) => {
              const sev = severityColors[item.id] || { level: "Medium", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-400/30" };
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedGuide(item)}
                  className={`card-premium p-8 text-left rounded-3xl border hover-lift transition-all duration-300 group relative overflow-hidden ${sev.border}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Subtle bg tint */}
                  <div className={`absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-300 ${sev.bg}`} />

                  <div className="relative z-10">
                    {/* Severity badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${sev.bg} ${sev.color} border ${sev.border}`}>
                        {sev.level}
                      </span>
                      <span className="text-white/30 text-xs font-medium">{item.steps?.length || 0} steps</span>
                    </div>

                    <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h2 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {item.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {item.steps?.[0]}
                    </p>

                    {/* Expand hint */}
                    <div className="mt-4 flex items-center gap-1 text-white/25 text-xs group-hover:text-cyan-400/60 transition-colors">
                      <Clock size={10} />
                      <span>Tap for full guide</span>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Offline info card */}
            <div className="card-premium p-7 rounded-3xl border border-emerald-500/20 flex flex-col justify-between" style={{ animationDelay: "480ms" }}>
              <div>
                <ShieldAlert size={28} className="text-emerald-400 mb-4" />
                <h3 className="font-display font-bold text-lg text-white mb-2">Always Available</h3>
                <p className="text-white/50 text-sm leading-relaxed">This guide works completely offline — even with no internet. Critical information is always within reach.</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cached & ready
              </div>
            </div>
          </div>
        ) : (
          /* ── Detail View ──────────────────────────────────── */
          <div className="animate-slide-up">
            <button
              onClick={() => setSelectedGuide(null)}
              className="mb-8 text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 text-sm hover-lift-sm"
            >
              ← Back to Emergency Guide
            </button>

            <div className="card-premium p-8 lg:p-10 rounded-3xl border border-white/20">
              {/* Detail header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="text-6xl">{selectedGuide.icon}</div>
                <div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-gradient-premium mb-1">{selectedGuide.title}</h2>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Step-by-step first aid</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <ol className="space-y-5">
                  {selectedGuide.steps?.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-white/85 pt-1.5 text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-emergency/8 border border-emergency/25 glass-md">
                <p className="text-sm text-white/75 leading-relaxed">
                  <span className="font-display font-bold text-emergency">⚠️ Important: </span>
                  This is general guidance only. <strong>Always call emergency services (112)</strong> for serious injuries or life-threatening situations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
