import { RefreshCw, Share2, Loader } from "lucide-react";

export default function QuickActionsCard({ onRefresh, onShare, loading }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        const title = "RoadSoS - Emergency Location";
        const text = "I need emergency assistance. Here is my location for emergency services.";
        await navigator.share({ title, text, url: window.location.href });
      } catch (err) {
        if (err.name !== "AbortError") {
          alert("Failed to share location");
        }
      }
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      alert("Location link copied to clipboard!");
    }
  };

  return (
    <div className="card-glass p-6 mb-6">
      <p className="text-white/50 text-xs uppercase tracking-wide mb-4">Quick Actions</p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-semibold rounded-lg transition-colors"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <RefreshCw size={18} />}
          {loading ? "Detecting..." : "Refresh"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 font-display font-semibold rounded-lg transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
}
