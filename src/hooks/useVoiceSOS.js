// Phase 4: Voice SOS via Web Speech API
// Triggers on: "help", "sos", "emergency", "accident"
export default function useVoiceSOS({ onTrigger } = {}) {
  return { listening: false, start: () => {}, stop: () => {} };
}
