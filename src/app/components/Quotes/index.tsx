"use client"
import { useEffect, useRef, useState } from "react";
import { Quote } from "@/app/types/character";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "CHS", label: "中文" },
  { code: "JP", label: "日本語" },
  { code: "KR", label: "한국어" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

function categoryOf(audio: string) {
  const n = Number(audio);
  if (Number.isNaN(n)) return "Misc";
  if (n < 1000) return "Misc";
  if (n < 2000) return "Chat";
  if (n < 10000) return "About";
  if (n < 100000) return "Growth";
  return "Combat";
}

export default function Quotes({
  quotes,
  avatarId,
}: {
  quotes?: Record<string, Quote>;
  avatarId: number;
}) {
  const [lang, setLang] = useState<LangCode>("EN");
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const entries = quotes
    ? Object.values(quotes).filter((quote) => quote?.audio && quote?.text)
    : [];

  if (entries.length === 0) return null;

  const play = (quote: Quote, key: string) => {
    const src = `https://gi.yatta.moe/assets/Audio/${lang}/${avatarId}/${quote.audio}.ogg`;

    if (playing === key && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(null);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setPlaying(null));
    audio.addEventListener("error", () => setPlaying(null));
    audio.play().then(() => setPlaying(key)).catch(() => setPlaying(null));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text/45">
            Voice language
          </span>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => {
                  setLang(language.code);
                  audioRef.current?.pause();
                  setPlaying(null);
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${lang === language.code
                  ? "bg-primary text-bg-darkest"
                  : "bg-bg-light text-text/70 hover:text-text"
                  }`}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
        <span className="text-sm text-text/45">{entries.length} lines</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((quote, index) => {
          const key = `${quote.audio}-${index}`;
          const isPlaying = playing === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => play(quote, key)}
              aria-pressed={isPlaying}
              className={`group flex h-full flex-col gap-3 rounded-xl border p-4 text-left transition-all md:p-5 ${isPlaying
                  ? "border-primary/70 bg-primary/5"
                  : "border-bg-light/70 bg-bg-light/25 hover:border-primary/40"
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${isPlaying ? "border-primary bg-primary/15 text-primary" : "border-bg-light/70 bg-bg-light/30 text-text/70 group-hover:border-primary/60 group-hover:text-primary"
                    }`}>
                    {isPlaying ? (
                      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                        <rect x="1" y="1" width="3.5" height="10" fill="currentColor" />
                        <rect x="7.5" y="1" width="3.5" height="10" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 1l9 5-9 5z" fill="currentColor" />
                      </svg>
                    )}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className={`font-bold ${isPlaying ? "text-primary" : "text-text"}`}>{quote.title}</p>
                    <span className="rounded-full border border-bg-light/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-text/40">
                      {categoryOf(quote.audio)}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-text/40">
                  {isPlaying ? "Playing" : "Play"}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isPlaying ? "text-primary/90" : "text-text/75"}`}>
                &ldquo;{quote.text}&rdquo;
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
