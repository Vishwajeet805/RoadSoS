import { useEffect, useRef, useState } from "react";

const EMERGENCY_KEYWORDS = [
  "sos",
  "help",
  "emergency",
  "accident",
  "ambulance",
  "police",
  "madad",
  "bachao",
];

export default function useVoiceSOS({ onTrigger } = {}) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const onTriggerRef = useRef(onTrigger);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setStatus("unsupported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

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
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript.toLowerCase();

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      const currentText = (finalText || interimText).trim();
      setTranscript(currentText);

      const foundKeyword = EMERGENCY_KEYWORDS.find((kw) =>
        currentText.includes(kw)
      );

      if (foundKeyword) {
        setStatus("detected");
        setListening(false);

        recognition.stop();

        onTriggerRef.current?.({
          keyword: foundKeyword,
          fullText: currentText,
        });
      } else if (finalText) {
        setStatus("no-command");
      }
    };

    recognition.onerror = (event) => {
      setListening(false);
      setStatus("error");

      if (event.error === "not-allowed") {
        setError("Microphone permission denied. Please allow microphone access.");
      } else if (event.error === "no-speech") {
        setError("No speech detected. Try again.");
      } else if (event.error === "audio-capture") {
        setError("No microphone found.");
      } else {
        setError(`Voice error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      // Clear all timeouts when recognition ends
      if (noSpeechTimeoutRef.current) clearTimeout(noSpeechTimeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const start = () => {
    if (!isSupported) {
      setError("Speech Recognition not supported in this browser.");
      return;
    }

    try {
      setError(null);
      setTranscript("");
      setStatus("starting");
      recognitionRef.current?.start();
    } catch {
      setError("Voice recognition is already running. Please try again.");
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