import { Mic, MicOff, AlertCircle, CheckCircle } from "lucide-react";
import useVoiceSOS from "../hooks/useVoiceSOS";

export default function VoiceSOS({ onEmergencyDetected }) {
  const { listening, status, error, transcript, isSupported, start, stop } = useVoiceSOS({
    onTrigger: ({ keyword, fullText }) => {
      onEmergencyDetected?.({ keyword, fullText });
    },
  });

  if (!isSupported) {
    return (
      <div className="card-glass p-5 border border-white/10">
        <div className="flex items-center gap-3 text-amber-400">
          <AlertCircle size={20} />
          <p className="text-sm">Speech Recognition not supported in this browser</p>
        </div>
      </div>
    );
  }

  const statusMessages = {
    idle: "Ready to listen",
    listening: "Listening...",
    processing: "Processing...",
    detected: "Voice command detected!",
    "no-command": "No command recognized",
    error: error || "Error occurred",
  };

  const statusColors = {
    idle: "text-white/60",
    listening: "text-cyan-400 animate-pulse",
    detected: "text-emerald-400",
    "no-command": "text-white/40",
    error: "text-emergency",
  };

  return (
    <div className="card-glass p-6">
      <div className="flex items-center gap-3 mb-5">
        <Mic size={20} className="text-cyan-400" />
        <h3 className="font-display font-bold text-lg">Voice SOS</h3>
      </div>

      {/* Microphone Button */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={listening ? stop : start}
          className={`
            w-24 h-24 rounded-full font-display font-bold text-white
            transition-all duration-300 flex items-center justify-center
            ${
              listening
                ? "bg-emergency sos-glow scale-110"
                : "bg-cyan-500/20 border-2 border-cyan-400 hover:scale-105 active:scale-95"
            }
          `}
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? <Mic size={32} /> : <MicOff size={32} />}
        </button>

        {/* Status Text */}
        <div className="text-center">
          <p className={`text-sm font-semibold ${statusColors[status]} transition-colors`}>
            {statusMessages[status]}
          </p>

          {/* Transcript Display */}
          {transcript && (
            <div className="mt-3 text-xs text-white/60 bg-white/5 rounded px-3 py-2 max-w-xs">
              <p className="italic">"{transcript}"</p>
            </div>
          )}

          {/* Detected Status */}
          {status === "detected" && (
            <div className="mt-3 flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle size={16} />
              <span className="text-xs font-semibold">Triggering emergency mode...</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-xs text-emergency bg-emergency/10 border border-emergency/30 rounded px-3 py-2 max-w-xs text-center">
            {error}
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className="mt-6 text-xs text-white/40 text-center">
        <p>Say: "Help", "SOS", "Emergency", "Accident", "Ambulance", or "Police"</p>
      </div>
    </div>
  );
}
