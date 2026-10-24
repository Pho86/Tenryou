"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import homeData from "@/app/data/homeData.json";

interface BirthdayCharacter {
  name: string;
  title?: string;
  description?: string;
  elementText?: string;
  weaponText?: string;
  birthday: string;
  rarity: number;
  icon: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BirthdaysCard() {
  const [selectedMonth, setSelectedMonth] = useState<string>("October");
  const [showAllModal, setShowAllModal] = useState<boolean>(false);

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    setSelectedMonth(MONTHS[currentMonthIndex]);
  }, []);

  const birthdaysRecord = homeData.birthdays as Record<
    string,
    BirthdayCharacter[]
  >;
  const monthNumber = String(MONTHS.indexOf(selectedMonth) + 1);
  const charactersInMonth: BirthdayCharacter[] =
    birthdaysRecord[monthNumber] || birthdaysRecord[selectedMonth] || [];

  const displayCharacters = charactersInMonth;

  return (
    <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold text-primary">Birthdays This Month</h2>
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="text-xs md:text-sm text-[#8C7F7F] hover:text-primary transition-colors cursor-pointer"
        >
          All birthdays
        </button>
      </div>

      {/* Characters Circle Row (all birthdays this month) */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
        {displayCharacters.length === 0 ? (
          <p className="text-sm text-[#8C7F7F] py-3">
            No character birthdays found for {selectedMonth}.
          </p>
        ) : (
          displayCharacters.map((character) => {
            const isFiveStar = character.rarity === 5;
            const ringClass = isFiveStar
              ? "border-2 border-[#E59934] shadow-[0_0_8px_rgba(229,153,52,0.35)]"
              : "border-2 border-[#9B59B6] shadow-[0_0_8px_rgba(155,89,182,0.35)]";

            return (
              <div key={character.name} className="relative group">
                <Link
                  href={`/characters/${encodeURIComponent(character.name)}`}
                  className="flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  {/* Circle Avatar with Rarity Ring */}
                  <div
                    className={`w-[44px] h-[44px] rounded-full overflow-hidden bg-[#241e1e] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${ringClass}`}
                  >
                    <Image
                      src={`https://enka.network/ui/${character.icon}.png`}
                      alt={character.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = "/None.png";
                      }}
                    />
                  </div>

                  {/* Birthday Date below */}
                  <span className="text-xs font-semibold text-text/80 group-hover:text-primary transition-colors">
                    {character.birthday}
                  </span>
                </Link>

                {/* Character Description Hover Popover (like /characters/[name] build section) */}
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 hidden group-hover:flex flex-col w-64 md:w-72 rounded-xl border border-bg-light/80 bg-bg-darkest/95 p-3.5 text-xs text-text/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-text">
                      {character.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#E59934]">
                      {"★".repeat(character.rarity)}
                    </span>
                  </div>

                  {character.title && (
                    <span className="text-xs text-primary font-medium mt-0.5">
                      {character.title}
                    </span>
                  )}

                  {(character.elementText || character.weaponText) && (
                    <span className="text-[10px] uppercase tracking-wider text-text/45 mt-0.5">
                      {[character.elementText, character.weaponText]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}

                  {character.description && (
                    <p className="mt-2 text-xs text-text/75 leading-relaxed whitespace-pre-line line-clamp-4">
                      {character.description}
                    </p>
                  )}

                  {/* Arrow Pointer */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-bg-darkest/95" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* All Birthdays Modal */}
      <AnimatePresence>
        {showAllModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-2xl bg-[#1b1717] border border-[#382f2f] rounded-2xl p-6 overflow-y-auto shadow-2xl flex flex-col gap-4 text-text"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#2d2525]">
                <h3 className="text-2xl font-bold text-primary">
                  Birthdays: {selectedMonth}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="text-text/60 hover:text-text p-1 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Month selector dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="birthday-month-select"
                  className="text-xs text-[#8C7F7F]"
                >
                  Select Month:
                </label>
                <select
                  id="birthday-month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-[#241e1e] border border-[#382f2f] text-text text-sm rounded-lg px-2.5 py-1 focus:outline-none focus:border-primary"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Characters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {charactersInMonth.map((char) => {
                  const isFiveStar = char.rarity === 5;
                  const ringClass = isFiveStar
                    ? "border-2 border-[#E59934] shadow-[0_0_6px_rgba(229,153,52,0.35)]"
                    : "border-2 border-[#9B59B6] shadow-[0_0_6px_rgba(155,89,182,0.35)]";

                  return (
                    <Link
                      key={char.name}
                      href={`/characters/${encodeURIComponent(char.name)}`}
                      className="p-3 rounded-xl bg-[#221c1c] border border-[#302828] hover:border-primary/50 transition-all flex flex-col items-center gap-2 group"
                    >
                      <div
                        className={`w-14 h-14 rounded-full overflow-hidden bg-[#2a2424] ${ringClass}`}
                      >
                        <Image
                          src={`https://enka.network/ui/${char.icon}.png`}
                          alt={char.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.src = "/None.png";
                          }}
                        />
                      </div>
                      <span className="font-semibold text-xs text-text text-center truncate w-full group-hover:text-primary">
                        {char.name}
                      </span>
                      <span className="text-xs text-primary font-bold">
                        {char.birthday}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
