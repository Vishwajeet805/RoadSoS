import { BookOpen, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";
import { firstAidGuide } from "../data/firstAidGuide";
import useOfflineStatus from "../hooks/useOfflineStatus";
import { offlineService } from "../services/offlineService";

export default function EmergencyGuide() {
  const { isOnline, isOffline, showNotification, notificationMessage } = useOfflineStatus();
  const [guide, setGuide] = useState(firstAidGuide);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Cache first aid guide on mount
  useEffect(() => {
    offlineService.cacheFirstAidGuide();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Offline Notification */}
      {showNotification && (
        <div className={`mb-6 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in glass-md ${
          isOffline
            ? "border-orange-400 bg-orange-500/10 text-orange-300"
            : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
        }`}>
          {isOffline ? (
            <WifiOff size={20} className="flex-shrink-0" />
          ) : (
            <BookOpen size={20} className="flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{notificationMessage}</p>
        </div>
      )}

      {/* Offline Mode Banner */}
      {isOffline && (
        <div className="mb-6 p-6 rounded-2xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/10 to-orange-600/5 glass-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <WifiOff size={24} className="text-orange-400" />
            </div>
            <div>
              <p className="font-display font-bold text-orange-300 text-lg">Offline Mode Active</p>
              <p className="text-sm text-white/60 mt-1">Emergency guide fully available without internet</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
        <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl">
          <BookOpen size={32} className="text-amber-400" />
        </div>
        <div>
          <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight">Emergency Guide</h1>
          <p className="text-white/50 text-sm mt-2 font-semibold uppercase tracking-widest">Step-by-step first aid instructions</p>
        </div>
      </div>

      {!selectedGuide ? (
        // Guide List View - Bento Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          {guide.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedGuide(item)}
              className="card-premium p-8 text-left rounded-3xl border border-white/20 hover-lift transition-all group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h2 className="font-display font-bold text-xl mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h2>
              <p className="text-white/60 text-sm">{item.steps?.length || 0} steps</p>
            </button>
          ))}
        </div>
      ) : (
        // Guide Detail View
        <div className="animate-slide-up">
          <button
            onClick={() => setSelectedGuide(null)}
            className="mb-8 text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 text-sm hover-lift-sm"
          >
            ← Back to Emergency Guide
          </button>

          <div className="card-premium p-10 rounded-3xl border border-white/20">
            <div className="flex items-center gap-6 mb-10">
              <div className="text-7xl">{selectedGuide.icon}</div>
              <div>
                <h2 className="font-display font-bold text-5xl text-gradient-premium mb-2">{selectedGuide.title}</h2>
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Step-by-step first aid</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <ol className="space-y-6">
                {selectedGuide.steps?.map((step, index) => (
                  <li key={index} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-500/20 flex items-center justify-center text-amber-300 font-bold text-lg">
                      {index + 1}
                    </div>
                    <p className="text-white/90 pt-1 text-base leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emergency/10 to-red-600/5 border border-emergency/30 glass-md">
              <p className="text-sm text-white/80 leading-relaxed">
                <span className="font-display font-bold text-emergency">⚠️  Important Safety Notice:</span> This is general guidance only. <strong>Always call emergency services (112)</strong> for serious injuries, heavy bleeding, unconsciousness, or any life-threatening situation.
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
