import { BookOpen } from "lucide-react";

export default function EmergencyGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={28} className="text-amber-400" />
        <h1 className="font-display text-3xl font-bold">Emergency Guide</h1>
      </div>
      <div className="card-glass p-12 text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-amber-400/30" />
        <p className="text-white/40 text-sm">Offline-ready emergency guide</p>
        <p className="text-white/20 text-xs mt-2">CPR · Bleeding · Burns · Fractures · Head Injuries</p>
        <p className="text-white/20 text-xs mt-1">Content + offline mode in Phase 3</p>
      </div>
    </div>
  );
}
