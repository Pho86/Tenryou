import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`w-full max-w-screen-2xl mt-16 md:mt-24 pt-10 pb-28 md:pb-12 border-t border-bg-light/80 ${className || ""}`}
    >
      <div className="flex flex-col gap-8 w-full">
        {/* Top Section: Brand + Links */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">
          {/* Brand & Blurb */}
          <div className="flex flex-col gap-3 max-w-md">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-2xl font-bold text-text hover:text-primary transition-colors group w-fit"
            >
              <Image
                src="/icon.svg"
                alt="Tenryou Logo"
                width={38}
                height={38}
                className="drop-shadow-icon group-hover:scale-105 transition-transform"
              />
              <span className="tracking-tight">Tenryou</span>
            </Link>
            <p className="text-xs sm:text-sm text-text/60 leading-relaxed">
              Your Genshin Impact companion web app. Explore characters, weapons,
              daily domain schedules, artifacts, and build dream team comps with ease.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-xs sm:text-sm">
            {/* Explore Column */}
            <div className="flex flex-col gap-2.5">
              <span className="font-semibold text-text uppercase tracking-wider text-[11px] text-text/45">
                Explore
              </span>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/characters"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Characters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    User Showcase
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teambuilder"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Team Builder
                  </Link>
                </li>
                <li>
                  <a
                    href="https://act.hoyolab.com/ys/app/interactive-map/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Interactive Map ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Database Column */}
            <div className="flex flex-col gap-2.5">
              <span className="font-semibold text-text uppercase tracking-wider text-[11px] text-text/45">
                Database
              </span>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/database"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/weapons"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Weapons
                  </Link>
                </li>
                <li>
                  <Link
                    href="/artifacts"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Artifacts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/materials"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Materials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Project Column */}
            <div className="flex flex-col gap-2.5">
              <span className="font-semibold text-text uppercase tracking-wider text-[11px] text-text/45">
                Project
              </span>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/credits"
                    className="text-text/75 hover:text-primary transition-colors"
                  >
                    Credits & Changelog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/pho86/Tenryou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text/75 hover:text-primary transition-colors"
                  >
                    <FaGithub className="text-sm" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Version + Disclaimer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-bg-light/40 text-xs text-text/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} Tenryou</span>
            <span>•</span>
            <Link
              href="/credits"
              className="text-primary hover:underline font-medium"
            >
              v1.0.0
            </Link>
          </div>

          <p className="text-left sm:text-right max-w-md text-[11px] text-text/40 leading-normal">
            This website is not affiliated with or endorsed by miHoYo / HoYoverse.
            Genshin Impact and all game assets are trademarks of miHoYo Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}