"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import homeData from "@/app/data/homeData.json";

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_FULL = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface CharacterItem {
  name: string;
  title?: string;
  description?: string;
  elementText?: string;
  weaponText?: string;
  rarity: number;
  icon: string;
}

interface TalentDomainItem {
  id: number;
  bookName: string;
  region: string;
  iconId: number | null;
  characters: CharacterItem[];
}

interface WeaponDomainItem {
  id: number;
  name: string;
  itemId?: number;
  region: string;
  entrance: string;
}

export default function DailiesCard() {
  const [selectedDay, setSelectedDay] = useState<string>("Friday");
  const [showAllFarmable, setShowAllFarmable] = useState(false);

  useEffect(() => {
    const dayIndex = new Date().getDay();
    const dayMap = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setSelectedDay(dayMap[dayIndex]);
  }, []);

  const talentDomains: TalentDomainItem[] =
    (homeData.talentDomains as Record<string, TalentDomainItem[]>)[selectedDay] ||
    [];
  const weaponDomains: WeaponDomainItem[] =
    (homeData.weaponDomains as Record<string, WeaponDomainItem[]>)[selectedDay] ||
    [];

  return (
    <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4">
        <h2 className="text-2xl font-bold text-primary">Dailies Today</h2>
        <span className="text-xs md:text-sm text-[#8C7F7F]">
          Talent book domains open on the selected day
        </span>
      </div>

      {/* Weekday Selector Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-5">
        {DAYS_SHORT.map((shortDay, i) => {
          const fullDay = DAYS_FULL[i];
          const isSelected = selectedDay === fullDay;
          return (
            <button
              key={shortDay}
              type="button"
              onClick={() => setSelectedDay(fullDay)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-primary text-white shadow-md shadow-primary/25 font-bold"
                  : "bg-[#1c1818] border border-[#2d2626] text-text/75 hover:bg-[#262020] hover:text-text"
              }`}
            >
              {shortDay}
            </button>
          );
        })}
      </div>

      {/* Talent Book Domains List */}
      <div className="flex flex-col divide-y divide-[#241f1f]">
        {talentDomains.length === 0 ? (
          <p className="text-sm text-[#8C7F7F] py-4">
            No specific domain restrictions today.
          </p>
        ) : (
          talentDomains.map((domain) => (
            <div
              key={domain.bookName}
              className="py-3.5 first:pt-1 last:pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              {/* Left: Book Icon + Title + Region */}
              <div className="flex items-center gap-3 min-w-[210px] shrink-0">
                <div className="w-10 h-10 rounded-lg bg-[#201a1a] border border-[#352c2c] flex items-center justify-center p-1 relative shrink-0 shadow-inner">
                  {domain.iconId ? (
                    <Image
                      src={`https://enka.network/ui/UI_ItemIcon_${domain.iconId}.png`}
                      alt={domain.bookName}
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = "/icons/items.webp";
                      }}
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-[#E59934]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text leading-tight">
                    {domain.bookName}
                  </span>
                  <span className="text-xs text-[#8C7F7F] mt-0.5">
                    {domain.region}
                  </span>
                </div>
              </div>

              {/* Right: Circular Character Avatars with Rarity Rings & Hover Tooltip with Description */}
              <div className="flex flex-wrap items-center gap-2 pl-12 md:pl-0">
                {domain.characters.map((char) => {
                  const isFiveStar = char.rarity === 5;
                  const ringClass = isFiveStar
                    ? "border-2 border-[#E59934] shadow-[0_0_6px_rgba(229,153,52,0.35)]"
                    : "border-2 border-[#9B59B6] shadow-[0_0_6px_rgba(155,89,182,0.35)]";

                  return (
                    <div key={char.name} className="relative group">
                      <Link
                        href={`/characters/${encodeURIComponent(char.name)}`}
                        className="block transition-transform duration-200 group-hover:scale-115 cursor-pointer"
                      >
                        <div
                          className={`w-[44px] h-[44px] rounded-full overflow-hidden bg-[#241e1e] flex items-center justify-center shrink-0 ${ringClass}`}
                        >
                          <Image
                            src={`https://enka.network/ui/${char.icon}.png`}
                            alt={char.name}
                            width={44}
                            height={44}
                            className="w-full h-full object-cover transition-transform"
                            onError={(e) => {
                              e.currentTarget.src = "/None.png";
                            }}
                          />
                        </div>
                      </Link>

                      {/* Character Description Hover Popover (like /characters/[name] build section) */}
                      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 hidden group-hover:flex flex-col w-64 md:w-72 rounded-xl border border-bg-light/80 bg-bg-darkest/95 p-3.5 text-xs text-text/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-text">
                            {char.name}
                          </span>
                          <span className="text-[11px] font-semibold text-[#E59934]">
                            {"★".repeat(char.rarity)}
                          </span>
                        </div>

                        {char.title && (
                          <span className="text-xs text-primary font-medium mt-0.5">
                            {char.title}
                          </span>
                        )}

                        {(char.elementText || char.weaponText) && (
                          <span className="text-[10px] uppercase tracking-wider text-text/45 mt-0.5">
                            {[char.elementText, char.weaponText]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}

                        {char.description && (
                          <p className="mt-2 text-xs text-text/75 leading-relaxed whitespace-pre-line line-clamp-4">
                            {char.description}
                          </p>
                        )}

                        {/* Arrow Pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-bg-darkest/95" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Link & Collapsible Weapon Domains */}
      <div className="pt-4 border-t border-[#262020] mt-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShowAllFarmable(!showAllFarmable)}
          className="self-start text-sm font-semibold text-primary hover:text-accent hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
        >
          <span>View everything farmable today</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              showAllFarmable ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showAllFarmable && (
          <div className="bg-[#1b1717] border border-[#2d2525] rounded-xl p-4 flex flex-col gap-3 text-sm animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#2d2525] pb-2">
              <span className="font-semibold text-text">
                Weapon Ascension Materials ({selectedDay})
              </span>
              <Link
                href="/materials"
                className="text-xs text-primary hover:underline"
              >
                All Materials &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {weaponDomains.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-[#221c1c] border border-[#302727]"
                >
                  {w.itemId && (
                    <Image
                      src={`https://enka.network/ui/UI_ItemIcon_${w.itemId}.png`}
                      alt={w.name}
                      width={32}
                      height={32}
                      className="object-contain shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = "/icons/weapons.webp";
                      }}
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-text truncate">
                      {w.name}
                    </span>
                    <span className="text-[11px] text-[#8C7F7F]">
                      {w.region} • {w.entrance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
