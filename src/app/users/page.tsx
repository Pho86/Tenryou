import UserSearchForm from "@/app/components/UserSearchForm";

const serverRegions = [
  { prefix: "6...", server: "America (NA)" },
  { prefix: "7...", server: "Europe (EU)" },
  { prefix: "8...", server: "Asia" },
  { prefix: "9...", server: "TW / HK / MO" },
  { prefix: "1... / 2...", server: "China (Celestia / Irminsul)" },
];

export default function UserPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14 w-full py-6 md:py-10 pb-16">
      {/* Hero Search Section */}
      <section className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Headlines & Blurb */}
        <div className="lg:col-span-7 flex flex-col gap-4 max-w-2xl">
          <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            PLAYER SHOWCASE & PROFILE VIEWER
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text leading-tight">
            Analyze Your Builds & Generate Team Cards
          </h1>
          <p className="text-sm sm:text-base text-text/75 leading-relaxed">
            Look up any Genshin Impact traveler by their in-game UID to view active character builds,
            artifact roll quality breakdowns, and export shareable profile graphics.
          </p>

          {/* Quick Setup Checklist */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs text-text/70">
            <div className="flex items-center gap-1.5 rounded-lg border border-bg-light/70 bg-bg-light/25 px-3 py-1.5">
              <span>✓ In-game showcase set to public</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-bg-light/70 bg-bg-light/25 px-3 py-1.5">
              <span>✓ &ldquo;Show Details&rdquo; enabled</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Search Card */}
        <div className="lg:col-span-5 w-full rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 shadow-xl">
          <UserSearchForm />
        </div>
      </section>

      {/* Quick Guide & Server Region Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Setup Guide */}
        <div className="lg:col-span-7 rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold text-text">
              How to Enable Your Profile Showcase
            </h3>
            <p className="text-xs text-text/60 leading-relaxed">
              Genshin Impact hides character details by default. To allow the API to read your builds:
            </p>
          </div>

          <ol className="flex flex-col gap-2 text-xs text-text/80 list-decimal list-inside bg-bg-darkest/40 p-3.5 rounded-lg border border-bg-light/40">
            <li className="leading-relaxed">
              Open the in-game Paimon Menu and click your profile icon (or press <kbd className="bg-bg-light px-1.5 py-0.5 rounded text-[10px]">Esc</kbd>).
            </li>
            <li className="leading-relaxed">
              Click <strong className="text-text font-semibold">Edit Profile</strong> &rarr; <strong className="text-text font-semibold">Edit Character Showcase</strong>.
            </li>
            <li className="leading-relaxed">
              Add up to 8 characters to your showcase and make sure <strong className="text-primary font-semibold">&ldquo;Show Character Details&rdquo;</strong> in the bottom right is checked.
            </li>
          </ol>
        </div>

        {/* Server Prefixes Table */}
        <div className="lg:col-span-5 rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-text">Server Region Prefixes</h3>
            <p className="text-xs text-text/60">
              The first digit of your UID corresponds to your game server:
            </p>
          </div>

          <div className="flex flex-col divide-y divide-bg-light/40 border border-bg-light/40 rounded-lg overflow-hidden bg-bg-darkest/40">
            {serverRegions.map((sr) => (
              <div key={sr.prefix} className="flex items-center justify-between px-3 py-2 text-xs">
                <span className="font-mono font-bold text-primary">{sr.prefix}</span>
                <span className="text-text/75">{sr.server}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
