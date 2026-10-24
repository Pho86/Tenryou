"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { NamecardItem } from "@/app/types/user";

export default function NamecardsMenu({
  namecards = [],
}: {
  namecards?: NamecardItem[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-bg-lighter bg-bg-light/40 px-3 text-sm font-semibold text-text transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <Image
          src="/icons/grid.svg"
          width={18}
          height={18}
          alt=""
          aria-hidden="true"
        />
        Namecards
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Namecards"
          className="absolute right-0 top-full z-[200] mt-2 w-[min(22rem,calc(100vw-2.5rem))] rounded-xl bg-bg-light p-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)] max-lg:left-0 max-lg:right-auto"
        >
          {namecards.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {namecards.map((namecard, index) => (
                <Image
                  key={`${namecard.name}-${index}`}
                  src={`https://enka.network/ui/${namecard.assets.icon}.png`}
                  width={250}
                  height={250}
                  sizes="80px"
                  className="aspect-square w-full rounded-md object-cover"
                  alt={`${namecard.name} namecard`}
                  title={namecard.name}
                />
              ))}
            </div>
          ) : (
            <p className="p-2 text-sm text-text/60">
              No namecards showcased yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
