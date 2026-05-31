import { Mic, MicOff, AlertCircle, CheckCircle, Wifi, RefreshCw } from "lucide-react";
import { useState } from "react";
import useVoiceSOS from "../hooks/useVoiceSOS";

export default function VoiceSOS({ onEmergencyDetected }) {
  const [retryCount, setRetryCount] = useState(0);
  const { listening, status, error, transcript, isSupported, start, stop } = useVoiceSOS({
    onTrigger: ({ keyword, fullText }) => {
      onEmergencyDetected?.({ keyword, fullText });
    },
  });

  if (!isSupported) {
    return (
      <div className="card-premium p-6 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-600/5">
        <div className="flex items-center gap-3 text-amber-400 mb-3">
          <AlertCircle size={20} />
          <p className="font-semibold">Speech Recognition Not Available</p>
        </div>
        <p className="text-sm text-white/70 mb-4">Your browser doesn't support voice commands. Use manual SOS instead.</p>
        <p className="text-xs text-white/50">Note: Chrome, Edge, and Safari support voice commands</p>
      </div>
    );
  }

  const statusMessages = {
    idle: "Ready to listen for commands",
    listening: "Listening... (Say 'Help', 'SOS', 'Emergency', etc.)",
    processing: "Processing voice command...",
    detected: "Voice command detected! ✓",
    "no-command": "Command not recognized. Please try again.",
    error: error || "Error occurred while listening",
  };

  const statusColors = {
    idle: "text-white/60",
    listening: "text-cyan-400 animate-pulse",
    detected: "text-emerald-400",
    "no-command": "text-white/50",
    error: "text-emergency",
  };

  const isNetworkError = error?.includes("network") || error?.includes("connection");

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    stop();
    setTimeout(() => start(), 500);
  };

  return (
    <div className="card-premium p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Mic size={24} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-white">Voice SOS</h3>
          <p className="text-white/40 text-xs mt-1">Emergency voice commands</p>
        </div>
      </div>

      {/* Microphone Button */}
      <div className="flex flex-col items-center gap-8">
        <button
          onClick={listening ? stop : start}
          disabled={!isSupported}
          className={`
            w-32 h-32 rounded-full font-display font-black text-white
            transition-all duration-300 flex items-center justify-center relative
            shadow-xl hover:shadow-2xl
            ${listening
              ? "bg-gradient-to-b from-emergency to-red-700 sos-glow scale-110"
              : "bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border-3 border-cyan-400 hover:scale-105 active:scale-95"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? (
            <div className="relative">
              <Mic size={44} className="animate-pulse" />
              <div className="absolute inset-0 animate-ping opacity-75">
                <Mic size={44} />
              </div>
            </div>
          ) : (
            <MicOff size={44} />
          )}
        </button>

        {/* Status Text */}
        <div className="text-center max-w-md">
          <p className={`text-lg font-semibold ${statusColors[status]} transition-colors`}>
            {statusMessages[status]}
          </p>

          {/* Transcript Display */}
          {transcript && (
            <div className="mt-4 text-sm text-white/80 bg-white/5 border border-white/10 rounded-lg px-4 py-3 max-w-full">
              <p className="font-mono">"{transcript}"</p>
            </div>
          )}

          {/* Detected Status */}
          {status === "detected" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle size={20} className="animate-bounce" />
              <span>Activating emergency mode...</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="w-full">
            <div className="text-sm text-emergency bg-gradient-to-r from-emergency/20 to-red-600/10 border border-emergency/30 rounded-lg px-4 py-3 text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                {isNetworkError ? (
                  <Wifi size={18} className="text-orange-400" />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span className="font-semibold">{error}</span>
              </div>
              {isNetworkError && (
                <p className="text-xs text-white/60 mt-2">Check your internet connection</p>
              )}
            </div>
            {error && (
              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white/70 hover:text-white font-medium rounded-lg transition-all"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            )}
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg mb-4">
        <p className="text-xs text-white/60 text-center font-semibold mb-2">🎤 Voice Commands:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Help", "SOS", "Emergency", "Accident", "Ambulance", "Police"].map((cmd) => (
            <span key={cmd} className="text-xs text-cyan-400 text-center px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">
              "{cmd}"
            </span>
          ))}
        </div>
      </div>

      {/* Troubleshooting Tips */}
      <div className="p-4 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-cyan-500/50 rounded">
        <p className="text-xs font-semibold text-white/70 mb-2">💡 Tips for best results:</p>
        <ul className="text-xs text-white/50 space-y-1">
          <li>✓ Speak clearly and distinctly into your microphone</li>
          <li>✓ Use a quiet environment to reduce background noise</li>
          <li>✓ Keep microphone close to your mouth</li>
          <li>✓ Speak naturally - don't shout or whisper</li>
          <li>✓ Check microphone permissions in browser settings</li>
        </ul>
      </div>
    </div>
  );
}
