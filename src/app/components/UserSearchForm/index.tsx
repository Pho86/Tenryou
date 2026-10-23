"use client";

import { useId, useState, useEffect, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";

const UID_PATTERN = /^\d{9}$/;

export default function UserSearchForm({
  variant = "hero",
  initialUid = "",
  className = "",
}: {
  variant?: "hero" | "compact";
  initialUid?: string;
  className?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const [uid, setUid] = useState(initialUid);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [recentUids, setRecentUids] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tenryou_recent_uids");
      if (saved) {
        setRecentUids(JSON.parse(saved).slice(0, 5));
      }
    } catch {}
  }, []);

  const saveRecentUid = (newUid: string) => {
    try {
      const filtered = recentUids.filter((u) => u !== newUid);
      const updated = [newUid, ...filtered].slice(0, 5);
      setRecentUids(updated);
      localStorage.setItem("tenryou_recent_uids", JSON.stringify(updated));
    } catch {}
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = uid.trim();

    if (!UID_PATTERN.test(value)) {
      setError("Enter a 9-digit UID, for example 600020272.");
      return;
    }

    setError(null);
    saveRecentUid(value);
    startTransition(() => {
      router.push(`/users/${value}`);
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUid(event.target.value.replace(/\D/g, "").slice(0, 9));
    if (error) setError(null);
  };

  const setExplicitUid = (chosenUid: string) => {
    setUid(chosenUid);
    setError(null);
  };

  const describedBy = error ? errorId : hintId;

  if (variant === "compact") {
    return (
      <form
        role="search"
        onSubmit={submit}
        className={`flex w-full flex-col gap-2 ${className}`}
      >
        <label htmlFor={inputId} className="sr-only">
          Search by Genshin UID
        </label>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 min-w-0 flex-1 items-center rounded-xl border bg-bg-light/60 transition-colors focus-within:border-primary ${
              error ? "border-primary" : "border-bg-lighter"
            }`}
          >
            <FaMagnifyingGlass
              aria-hidden="true"
              className="ml-3 shrink-0 text-sm text-dark-accent"
            />
            <input
              id={inputId}
              name="uid"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              maxLength={9}
              value={uid}
              onChange={handleChange}
              placeholder="Enter UID..."
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className="h-full w-full min-w-0 bg-transparent px-2 text-sm font-semibold tabular-nums text-text outline-none placeholder:font-normal placeholder:text-text/60"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-bg-darkest transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Opening" : "Search"}
          </button>
        </div>
        <span id={hintId} className="sr-only">
          Enter your 9-digit in-game UID.
        </span>
        {error && (
          <p id={errorId} role="alert" className="text-xs font-semibold text-primary">
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex w-full flex-col gap-4 ${className}`}
    >
      <label
        htmlFor={inputId}
        className="text-sm font-semibold tracking-wide text-text/75"
      >
        Search by UID
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div
          className={`flex h-14 min-w-0 flex-1 items-center gap-3 rounded-xl border bg-bg-light/60 px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
            error ? "border-primary" : "border-bg-lighter"
          }`}
        >
          <FaMagnifyingGlass
            aria-hidden="true"
            className="shrink-0 text-dark-accent"
          />
          <input
            id={inputId}
            name="uid"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            maxLength={9}
            value={uid}
            onChange={handleChange}
            placeholder="Enter UID..."
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="h-full w-full min-w-0 bg-transparent text-xl font-semibold tabular-nums text-text outline-none placeholder:text-lg placeholder:font-normal placeholder:text-text/60"
          />
          <span
            aria-hidden="true"
            className="hidden text-xs font-semibold tracking-[0.16em] text-text/60 sm:block"
          >
            UID
          </span>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-bg-darkest transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Searching..." : "Search"}
          <FaArrowRight aria-hidden="true" className="text-sm" />
        </button>
      </div>
      <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
        {/* Recent Searches (if any) */}
        {recentUids.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-text/50 font-medium">Recent:</span>
            {recentUids.map((rUid) => (
              <button
                key={rUid}
                type="button"
                onClick={() => setExplicitUid(rUid)}
                className="px-2.5 py-1 rounded-lg bg-bg-light/70 hover:bg-bg-light text-text/80 hover:text-primary border border-bg-lighter font-mono text-xs transition-colors"
              >
                {rUid}
              </button>
            ))}
          </div>
        )}

        {/* Quick Demo UIDs */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-text/60">
          <span>Try demo:</span>
          <button
            type="button"
            onClick={() => setExplicitUid("600020272")}
            className="font-semibold text-primary underline-offset-4 hover:underline transition-colors"
          >
            600020272 (NA)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setExplicitUid("700000500")}
            className="font-semibold text-primary underline-offset-4 hover:underline transition-colors"
          >
            700000500 (EU)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setExplicitUid("800020272")}
            className="font-semibold text-primary underline-offset-4 hover:underline transition-colors"
          >
            800020272 (Asia)
          </button>
        </div>

        {error ? (
          <p id={errorId} role="alert" className="font-semibold text-primary text-xs mt-1">
            {error}
          </p>
        ) : (
          <p id={hintId} className="text-text/50 text-[11px]">
            Enter your 9-digit UID located in the bottom-right of your in-game screen.
          </p>
        )}
      </div>
    </form>
  );
}
