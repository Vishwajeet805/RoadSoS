import { useEffect, useState, useRef } from "react";

const EMERGENCY_KEYWORDS = ["sos", "help", "emergency", "accident", "ambulance", "police"];

export default function useVoiceSOS({ onTrigger } = {}) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

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

    recognition.onstart = () => {
      setListening(true);
      setStatus("listening");
      setError(null);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i].transcript.toLowerCase();
        if (event.results[i].isFinal) {
          const foundKeyword = EMERGENCY_KEYWORDS.find((kw) => text.includes(kw));
          if (foundKeyword) {
            setStatus("detected");
            setTranscript(text);
            onTrigger?.({ keyword: foundKeyword, fullText: text });
          } else {
            setStatus("no-command");
            setTranscript(text);
          }
        } else {
          interim += text;
        }
      }
      if (interim) setTranscript(interim);
    };

    recognition.onerror = (event) => {
      if (event.error === "permission-denied") {
        setError("Microphone permission denied");
      } else if (event.error === "no-speech") {
        setError("No speech detected");
      } else {
        setError(`Error: ${event.error}`);
      }
      setStatus("error");
    };

    recognition.onend = () => {
      setListening(false);
      if (status === "idle" || status === "listening") {
        setStatus("idle");
      }
    };

    recognitionRef.current = recognition;
  }, [onTrigger, status]);

  const start = () => {
    if (!isSupported) {
      setError("Speech Recognition not supported");
      return;
    }
    recognitionRef.current?.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
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
