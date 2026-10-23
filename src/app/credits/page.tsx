"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";
import ChangelogComponent from "../components/Changelog";
import Modal from "../components/Modal";
import { useState } from "react";

interface CreditSource {
  title: string;
  provider: string;
  description: string;
  href: string;
  secondaryHref?: string;
  secondaryText?: string;
}

const creditSources: CreditSource[] = [
  {
    title: "Game Data & Constants",
    provider: "Genshin-db",
    description: "Character profiles, talent requirements, regional domain drop schedules, weapon stats, and birthday records.",
    href: "https://github.com/theBowja/genshin-db",
  },
  {
    title: "Player Profiles & Card Assets",
    provider: "Enka.Network",
    description: "Real-time user showcase data and character assets powered through the Enka Network API.",
    href: "https://enka.network/",
    secondaryHref: "https://github.com/yuko1101/enka-network-api",
    secondaryText: "enka-network-api",
  },
  {
    title: "Current & Upcoming Events",
    provider: "Yatta.moe & Ambr.Top",
    description: "Live in-game event banners, remaining timers, and official event descriptions.",
    href: "https://gi.yatta.moe/",
    secondaryHref: "https://ambr.top/en",
    secondaryText: "Ambr.Top",
  },
  {
    title: "Build Guidelines & Recommendations",
    provider: "Genshin-Builds",
    description: "Curated community talent priorities, weapon rankings, and optimal artifact sets.",
    href: "https://genshin-builds.com",
  },
];

export default function CreditsPage() {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);

  const clearSiteData = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowConfirmation(false);
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10 w-full max-w-4xl py-2 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          ABOUT & ATTRIBUTIONS
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-text tracking-tight">
          Credits & Acknowledgements
        </h1>
        <p className="text-sm sm:text-base text-text/70 leading-relaxed max-w-2xl">
          Tenryou is made possible by the incredible Genshin Impact community, open-source
          data libraries, and third-party APIs.
        </p>
      </div>

      {/* Data Sources Grid */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-primary">Data & Asset Sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {creditSources.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-bg-dark border border-bg-light flex flex-col justify-between gap-3 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-text/45 font-semibold">
                  {item.title}
                </span>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-text hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
                >
                  <span>{item.provider}</span>
                  <FiExternalLink className="text-xs text-text/40" />
                </Link>
                <p className="text-xs text-text/70 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>

              {item.secondaryHref && (
                <div className="pt-2 border-t border-bg-light/50 text-xs text-text/60">
                  Via{" "}
                  <Link
                    href={item.secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {item.secondaryText}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Open Source & Contributing Card */}
      <section className="p-6 rounded-2xl bg-bg-dark border border-bg-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-text">Contribute or Report an Issue</h3>
          <p className="text-xs sm:text-sm text-text/70">
            Have a feature request, noticed missing data, or want to contribute? The project is fully open source.
          </p>
        </div>
        <Link
          href="https://github.com/pho86/Tenryou"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-[#241e1e] hover:bg-bg-light border border-bg-light text-text font-medium text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <FaGithub className="text-base" />
          <span>GitHub Repository</span>
        </Link>
      </section>

      {/* Changelog Section */}
      <section className="p-6 rounded-2xl bg-bg-dark border border-bg-light flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-primary">Changelog</h2>
        <div className="prose prose-invert max-w-none text-sm text-text/80 leading-relaxed">
          <ChangelogComponent />
        </div>
      </section>

      {/* Debug & Cache Management */}
      <section className="p-6 rounded-2xl bg-[#1a1515] border border-red-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <span>Storage & Cache</span>
          </h3>
          <p className="text-xs text-text/60">
            Clear locally saved state, cached searches, and session data.
          </p>
          {clearedNotice && (
            <span className="text-xs text-green-400 font-semibold mt-1">
              ✓ Local site data cleared successfully!
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="px-3.5 py-2 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiTrash2 />
          <span>Clear Site Data</span>
        </button>
      </section>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        exit={() => setShowConfirmation(false)}
        label="Clear site data confirmation"
      >
        <div className="flex flex-col gap-4 items-center text-center p-2 text-text">
          <h4 className="text-lg font-bold">Reset Local Site Data?</h4>
          <p className="text-xs text-text/70 max-w-xs">
            This will remove all saved localStorage and sessionStorage items on your browser for Tenryou.
          </p>
          <div className="flex gap-3 items-center pt-2">
            <button
              type="button"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs transition-colors cursor-pointer"
              onClick={clearSiteData}
            >
              Yes, reset data
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-xl border border-bg-light hover:bg-bg-dark text-text/80 font-medium text-xs transition-colors cursor-pointer"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
