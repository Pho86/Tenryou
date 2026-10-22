import Image from "next/image";
import { parseGameText } from "@/app/utils/helper";
import parse from "html-react-parser";

const CONSTELLATIONS = ["c1", "c2", "c3", "c4", "c5", "c6"] as const;

export default function ConstellationsTable({
  constellationData,
  charName,
}: {
  constellationData: any;
  charName: string;
}) {
  if (!constellationData) return null;

  const entries = CONSTELLATIONS.map((key, index) => ({
    constellation: constellationData[key],
    image: constellationData.images?.[`filename_${key}`],
    index: index + 1,
  })).filter((entry) => entry.constellation && entry.image);

  if (entries.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <ConstellationEntry
            key={entry.index}
            {...entry}
            name={charName}
          />
        ))}
      </div>
    </section>
  );
}

function ConstellationEntry({
  constellation,
  name,
  image,
  index,
}: {
  constellation: any;
  name: string;
  image: string;
  index: number;
}) {
  const parsedHTML = parseGameText(constellation.descriptionRaw ?? "");
  const parsedText = `${parsedHTML}`;

  return (
    <article className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Image
          src={`https://enka.network/ui/${image}.png`}
          width={56}
          height={56}
          alt={`${name} constellation ${index}`}
          className="h-14 w-14 shrink-0 rounded-full border border-bg-light bg-bg-dark p-1"
        />
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Constellation {index}
          </span>
          <h3 className="text-lg font-bold text-text">
            {constellation.name}
          </h3>
        </div>
      </div>
      <div className="text-sm leading-relaxed text-text/80">
        {parse(parsedText)}
      </div>
    </article>
  );
}
