import { useEffect, useState, useRef } from "react";

const EMERGENCY_KEYWORDS = ["sos", "help", "emergency", "accident", "ambulance", "police"];

export default function useVoiceSOS({ onTrigger } = {}) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const noSpeechTimeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // Increase sensitivity by setting a longer max audio duration
    try {
      recognition.maxAlternatives = 1;
    } catch (e) {
      // Property might not exist in all browsers
    }

    recognition.onstart = () => {
      setListening(true);
      setStatus("listening");
      setError(null);
      setTranscript("");

      // Set a timeout for no speech after 10 seconds (gives user time to speak)
      noSpeechTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && document.hasFocus()) {
          recognitionRef.current.stop();
          setListening(false);
          setStatus("error");
          setError("⏱️ Timeout: No speech detected. Please try again and speak clearly.");
        }
      }, 10000);
    };

    recognition.onresult = (event) => {
      // Clear the no-speech timeout if we get any result
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
      }

      let interim = "";
      let hasInterim = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i].transcript.toLowerCase().trim();

        if (event.results[i].isFinal) {
          if (text.length > 0) {
            const foundKeyword = EMERGENCY_KEYWORDS.find((kw) => text.includes(kw));
            if (foundKeyword) {
              // Clear any pending timeouts
              if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
              if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

              setStatus("detected");
              setTranscript(text);
              setError(null);
              onTrigger?.({ keyword: foundKeyword, fullText: text });

              // Auto reset after 2 seconds
              retryTimeoutRef.current = setTimeout(() => {
                setStatus("idle");
                setTranscript("");
              }, 2000);
            } else {
              setStatus("no-command");
              setTranscript(text);
            }
          }
        } else {
          // Interim results
          if (text.length > 0) {
            interim += text + " ";
            hasInterim = true;
          }
        }
      }

      if (hasInterim) {
        setTranscript(interim.trim());
      }
    };

    recognition.onerror = (event) => {
      // Clear timeouts on error
      if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

      let errorMsg = "";

      switch (event.error) {
        case "permission-denied":
          errorMsg = "🔒 Microphone permission denied. Please enable microphone access in browser settings.";
          break;
        case "no-speech":
          errorMsg = "🔇 No speech detected. Please speak more clearly and louder into your microphone.";
          break;
        case "network":
          errorMsg = "📡 Network error. Check your internet connection and try again.";
          break;
        case "service-not-allowed":
          errorMsg = "⚠️ Speech service not allowed. Please check browser settings.";
          break;
        case "not-allowed":
          errorMsg = "🔒 Browser doesn't allow microphone access. Grant permission and try again.";
          break;
        case "audio-capture":
          errorMsg = "🎤 No microphone found or microphone is not working. Check your device.";
          break;
        default:
          errorMsg = `Error: ${event.error}. Please try speaking more clearly and try again.`;
      }

      setError(errorMsg);
      setStatus("error");
      setListening(false);
    };

    recognition.onend = () => {
      // Clear all timeouts when recognition ends
      if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

      setListening(false);
      if (status === "idle" || status === "listening") {
        setStatus("idle");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      // Cleanup all timeouts
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      recognitionRef.current?.stop();
    };
  }, [onTrigger, status]);

  const start = () => {
    if (!isSupported) {
      setError("Speech Recognition not supported in your browser");
      setStatus("error");
      return;
    }

    try {
      setError(null);
      setTranscript("");
      recognitionRef.current?.start();
    } catch (err) {
      setError("Failed to start speech recognition. Please try again.");
      setStatus("error");
    }
  };

  const stop = () => {
    // Clear timeouts before stopping
    if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

    recognitionRef.current?.stop();
    setListening(false);
    setStatus("idle");
  };

  return {
    listening,
    status,
    error,
    transcript,
    isSupported,
    start,
    stop,
  };
}
