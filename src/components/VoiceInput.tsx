// src/components/VoiceInput.tsx
// Web Speech API voice input — integrates with the chat text field
// Supports EN / KO / FR / SW recognition locales

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ── Types ─────────────────────────────────────────────────────────────────────

type VoiceStatus = "idle" | "listening" | "processing" | "error" | "unsupported";

interface VoiceInputProps {
  /** Called with the final transcript string */
  onTranscript: (text: string) => void;
  /** Disables the button (e.g., while AI is responding) */
  disabled?: boolean;
}

// ── Language → BCP-47 locale mapping ─────────────────────────────────────────

const LANG_TO_LOCALE: Record<string, string> = {
  en: "en-US",
  ko: "ko-KR",
  fr: "fr-FR",
  sw: "sw-KE", // Swahili — Kenya locale, best available
};

// ── Browser compatibility check ───────────────────────────────────────────────

function getSpeechRecognition(): typeof window.SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const { i18n, t } = useTranslation();
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [interimText, setInterimText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

  const currentLocale =
    LANG_TO_LOCALE[i18n.language?.slice(0, 2)] ?? "en-US";

  // Check support on mount
  useEffect(() => {
    if (!getSpeechRecognition()) {
      setStatus("unsupported");
    }
    // Cleanup on unmount
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    // If already listening, stop
    if (isListeningRef.current) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = currentLocale;
    recognition.interimResults = true;   // show real-time partial results
    recognition.maxAlternatives = 1;
    recognition.continuous = false;      // stop after natural pause

    recognition.onstart = () => {
      isListeningRef.current = true;
      setStatus("listening");
      setInterimText("");
      setErrorMessage("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      setInterimText(interim);

      if (final) {
        setStatus("processing");
        onTranscript(final.trim());
        setInterimText("");
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setInterimText("");
      setStatus("idle");
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      isListeningRef.current = false;
      setInterimText("");

      switch (event.error) {
        case "no-speech":
          setErrorMessage(t("voice.errorNoSpeech", "No speech detected. Please try again."));
          break;
        case "audio-capture":
          setErrorMessage(t("voice.errorNoMic", "Microphone not available."));
          break;
        case "not-allowed":
          setErrorMessage(t("voice.errorPermission", "Microphone permission denied."));
          break;
        case "network":
          setErrorMessage(t("voice.errorNetwork", "Network error. Check your connection."));
          break;
        default:
          setErrorMessage(t("voice.errorGeneric", "Voice input failed. Please type instead."));
      }
      setStatus("error");

      // Auto-clear error after 4 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 4000);
    };

    try {
      recognition.start();
    } catch {
      setErrorMessage(t("voice.errorStart", "Could not start microphone."));
      setStatus("error");
    }
  }, [currentLocale, onTranscript, t]);

  // ── Render ──────────────────────────────────────────────────────────────────

  if (status === "unsupported") {
    return null; // silently hide on unsupported browsers
  }

  const isListening = status === "listening";
  const isDisabled = disabled || status === "processing";

  return (
    <div className="relative flex flex-col items-end gap-1">
      {/* Mic Button */}
      <button
        type="button"
        onClick={startListening}
        disabled={isDisabled}
        aria-label={
          isListening
            ? t("voice.stopListening", "Stop recording")
            : t("voice.startListening", "Start voice input")
        }
        aria-pressed={isListening}
        title={
          isListening
            ? t("voice.stopListening", "Stop recording")
            : t("voice.startListening", "Speak your message")
        }
        className={`
          relative flex h-10 w-10 items-center justify-center rounded-full
          transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
          ${isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
          ${
            isListening
              ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"
          }
        `}
      >
        {/* Pulse ring while listening */}
        {isListening && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-50"
            aria-hidden="true"
          />
        )}

        {/* Icon: mic or stop */}
        {isListening ? (
          // Stop square icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        ) : (
          // Microphone icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Z" />
            <path d="M19 10a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.93V19H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.07A7 7 0 0 0 19 10Z" />
          </svg>
        )}
      </button>

      {/* Interim transcript bubble */}
      {interimText && (
        <div
          aria-live="polite"
          className="absolute bottom-12 right-0 max-w-[200px] rounded-xl bg-white px-3 py-1.5 text-xs text-gray-500 shadow-md dark:bg-gray-800 dark:text-gray-400"
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          {interimText}
        </div>
      )}

      {/* Error message */}
      {status === "error" && errorMessage && (
        <p
          role="alert"
          className="absolute bottom-12 right-0 max-w-[200px] rounded-xl bg-red-50 px-3 py-1.5 text-xs text-red-600 shadow-md dark:bg-red-900/30 dark:text-red-400"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}