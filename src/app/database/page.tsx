import Image from "next/image";
import Link from "next/link";

interface DatabaseCard {
  title: string;
  link: string;
  bg: string;
  icon: string;
}

const topCards: DatabaseCard[] = [
  {
    title: "Weapons",
    link: "/weapons",
    bg: "/homepage/weapons.webp",
    icon: "/icons/weapons.svg",
  },
  {
    title: "Artifacts",
    link: "/artifacts",
    bg: "/homepage/artifacts.webp",
    icon: "/icons/artifacts.webp",
  },
  {
    title: "Materials",
    link: "/materials",
    bg: "/homepage/materials.webp",
    icon: "/icons/materials.svg",
  },
];

const bottomCards: DatabaseCard[] = [
  {
    title: "Namecards",
    link: "/namecards",
    bg: "/homepage/namecards.webp",
    icon: "/icons/namecards.svg",
  },
  {
    title: "Outfits",
    link: "/outfits",
    bg: "/homepage/outfits.webp",
    icon: "/icons/outfits.svg",
  },
  {
    title: "Elements",
    link: "/elements",
    bg: "/homepage/elements.webp",
    icon: "/icons/elements.svg",
  },
  {
    title: "Achievements",
    link: "/achievements",
    bg: "/homepage/achievements.webp",
    icon: "/icons/achievements.svg",
  },
];

export default function Database() {
  return (
    <main className="flex w-full flex-col gap-8 px-2 sm:px-4 py-6 md:py-8">
      {/* Page Header */}
      <header className="flex flex-col gap-2 pb-6 border-b border-bg-light/60">
        <span className="font-mono text-xs md:text-sm font-semibold text-primary">
          DATABASE
        </span>
        <h1 className="text-3xl font-bold text-text md:text-5xl">Database</h1>
        <p className="max-w-3xl text-sm md:text-base text-text/65 leading-relaxed">
          Browse weapons, artifacts, materials, namecards, outfits, elements,
          achievements, and more.
        </p>
      </header>

      {/* Database Grid Layout */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">
        {/* Row 1: 3 Cards (Weapons, Artifacts, Materials) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
          {topCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col"
            >
              <Link
                href={card.link}
                className="transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer"
                title={card.title}
              >
                {/* Title inside top of card */}
                <div className="w-full z-20 p-3 flex">
                  <div className="flex w-full flex-col">
                    <h2 className="text-xl text-primary font-semibold">
                      {card.title}
                    </h2>
                  </div>
                </div>

                {/* Banner Image Container */}
                <div className="overflow-hidden w-full aspect-[16/9] relative bg-no-repeat mt-auto">
                  <Image
                    src={card.bg}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90"
                    priority
                  />
                  <Image
                    src={card.icon}
                    alt={`${card.title} icon`}
                    fill
                    className="absolute top-0 h-full p-4 w-full object-contain group-hover:scale-105 transition-all drop-shadow-icon"
                  />
                </div>
              </Link>
            </div>
          ))}
        </section>

        {/* Row 2: 4 Cards (Namecards, Outfits, Elements, Achievements) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
          {bottomCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col"
            >
              <Link
                href={card.link}
                className="transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer"
                title={card.title}
              >
                {/* Title inside top of card */}
                <div className="w-full z-20 p-3 flex">
                  <div className="flex w-full flex-col">
                    <h2 className="text-xl text-primary font-semibold">
                      {card.title}
                    </h2>
                  </div>
                </div>

                {/* Banner Image Container */}
                <div className="overflow-hidden w-full aspect-[16/9] relative bg-no-repeat mt-auto">
                  <Image
                    src={card.bg}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90"
                  />
                  <Image
                    src={card.icon}
                    alt={`${card.title} icon`}
                    fill
                    className="absolute top-0 h-full p-3.5 w-full object-contain group-hover:scale-105 transition-all drop-shadow-icon"
                  />
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
