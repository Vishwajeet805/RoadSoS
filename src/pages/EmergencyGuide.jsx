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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Offline Notification */}
      {showNotification && (
        <div className={`mb-6 p-3 rounded-lg border-l-4 flex items-center gap-3 animate-fade-in ${
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
        <div className="mb-6 p-4 rounded-lg border-2 border-orange-400 bg-orange-500/5">
          <div className="flex items-center gap-3">
            <WifiOff size={24} className="text-orange-400" />
            <div>
              <p className="font-display font-bold text-orange-300">Offline Mode Active</p>
              <p className="text-xs text-white/60">Emergency guide is fully available offline</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={28} className="text-amber-400" />
        <h1 className="font-display text-3xl font-bold">Emergency Guide</h1>
      </div>

      {!selectedGuide ? (
        // Guide List View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guide.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedGuide(item)}
              className="card-glass p-6 text-left hover:bg-white/8 transition-all border border-white/10 hover:border-amber-400/30"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-display font-bold text-lg mb-2">{item.title}</h2>
              <p className="text-white/60 text-sm">Click to view {item.steps?.length || 0} steps</p>
            </button>
          ))}
        </div>
      ) : (
        // Guide Detail View
        <div>
          <button
            onClick={() => setSelectedGuide(null)}
            className="mb-6 text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2"
          >
            ← Back to Guide
          </button>

          <div className="card-glass p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{selectedGuide.icon}</div>
              <div>
                <h2 className="font-display font-bold text-3xl">{selectedGuide.title}</h2>
                <p className="text-white/60 text-sm">Step-by-step guidance</p>
              </div>
            </div>

            <ol className="space-y-4">
              {selectedGuide.steps?.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-white/80 pt-1">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 p-4 rounded-lg bg-emergency/10 border border-emergency/30">
              <p className="text-sm text-white/80">
                <span className="font-semibold text-emergency">⚠️ Important:</span> This is general guidance only. Always call emergency services (112) for serious injuries.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
