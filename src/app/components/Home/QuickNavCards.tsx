import Image from "next/image";
import Link from "next/link";

interface NavCardItem {
  title: string;
  href: string;
  bg: string;
  icon: string;
  external?: boolean;
}

const navCards: NavCardItem[] = [
  {
    title: "Characters",
    href: "/characters",
    bg: "/homepage/characters.webp",
    icon: "/icons/characters.svg",
  },
  {
    title: "Users",
    href: "/users",
    bg: "/homepage/users.webp",
    icon: "/icons/character.svg",
  },
  {
    title: "Interactive Map",
    href: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
    bg: "/homepage/map.webp",
    icon: "/icons/map.svg",
    external: true,
  },
  {
    title: "Team Builder (Beta)",
    href: "/teambuilder",
    bg: "/homepage/teambuilder.webp",
    icon: "/icons/teambuilder.svg",
  },
  {
    title: "Database",
    href: "/database",
    bg: "/homepage/artifacts.webp",
    icon: "/icons/items.webp",
  },
];

export default function QuickNavCards() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {navCards.map((card) => {
          const innerContent = (
            <div className="flex flex-col h-full">
              {/* Header with Title inside the card */}
              <div className="w-full z-20 p-3 flex">
                <div className="flex w-full flex-col">
                  <h2 className="text-xl text-primary font-semibold">
                    {card.title}
                  </h2>
                </div>
              </div>

              {/* Image Container with Background & Centered Icon */}
              <div className="overflow-hidden w-full aspect-[16/10] relative bg-no-repeat mt-auto">
                <Image
                  src={card.bg}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90"
                  priority
                />
                <Image
                  src={card.icon}
                  alt={`${card.title} icon`}
                  fill
                  className="absolute top-0 h-full p-3 md:p-4 w-full object-contain group-hover:scale-105 transition-all drop-shadow-icon"
                />
              </div>
            </div>
          );

          if (card.external) {
            return (
              <div
                key={card.title}
                className="overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col"
              >
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer"
                  title={card.title}
                >
                  {innerContent}
                </a>
              </div>
            );
          }

          return (
            <div
              key={card.title}
              className="overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col"
            >
              <Link
                href={card.href}
                className="transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer"
                title={card.title}
              >
                {innerContent}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
