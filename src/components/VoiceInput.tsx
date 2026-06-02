// src/components/VoiceInput.tsx
// Web Speech API voice input — integrates with the chat text field
// Supports EN / KO / FR / SW recognition locales

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ── Types ─────────────────────────────────────────────────────────────────────

type VoiceStatus = "idle" | "listening" | "processing" | "error" | "unsupported";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

// ── Web Speech API 타입 선언 (lib.dom.d.ts에 없는 경우 대비) ──────────────────

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onspeechend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

// ── Language → BCP-47 locale mapping ─────────────────────────────────────────

const LANG_TO_LOCALE: Record<string, string> = {
  en: "en-US",
  ko: "ko-KR",
  fr: "fr-FR",
  sw: "sw-KE",
};

// ── Browser compatibility check ───────────────────────────────────────────────

function getSpeechRecognition(): ISpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const { i18n, t } = useTranslation();
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [interimText, setInterimText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

  const currentLocale = LANG_TO_LOCALE[i18n.language?.slice(0, 2)] ?? "en-US";

  useEffect(() => {
    if (!getSpeechRecognition()) {
      setStatus("unsupported");
    }
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    if (isListeningRef.current) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = currentLocale;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

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

  if (status === "unsupported") return null;

  const isListening = status === "listening";
  const isDisabled = disabled || status === "processing";

  return (
    <div className="relative flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={startListening}
        disabled={isDisabled}
        aria-label={isListening ? t("voice.stopListening", "Stop recording") : t("voice.startListening", "Start voice input")}
        aria-pressed={isListening}
        className={`
          relative flex h-12 w-12 items-center justify-center rounded-2xl
          transition-all duration-200 focus-visible:outline-none
          ${isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
          ${isListening ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
        `}
      >
        {isListening && (
          <span className="absolute inset-0 animate-ping rounded-2xl bg-red-400 opacity-50" aria-hidden="true" />
        )}
        {isListening ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Z" />
            <path d="M19 10a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.93V19H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.07A7 7 0 0 0 19 10Z" />
          </svg>
        )}
      </button>

      {interimText && (
        <div aria-live="polite" className="absolute bottom-14 right-0 max-w-[200px] rounded-xl bg-white px-3 py-1.5 text-xs text-gray-500 shadow-md">
          <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          {interimText}
        </div>
      )}

      {status === "error" && errorMessage && (
        <p role="alert" className="absolute bottom-14 right-0 max-w-[200px] rounded-xl bg-red-50 px-3 py-1.5 text-xs text-red-600 shadow-md">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
