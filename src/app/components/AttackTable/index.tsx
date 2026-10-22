"use client"
import Image from "next/image";
import parse from "html-react-parser";
import { parseGameText } from "@/app/utils/helper";

const COMBAT = ["combat1", "combat2", "combat3"] as const;
const PASSIVE = ["passive1", "passive2", "passive3"] as const;

const COMBAT_LABELS: Record<string, string> = {
  combat1: "Normal Attack",
  combat2: "Elemental Skill",
  combat3: "Elemental Burst",
};

type Talent = {
  name: string;
  descriptionRaw?: string;
};

type TalentEntry = {
  slot: string;
  attack: Talent;
  image: string;
  index: number;
};

export default function AttackTable({
  attackData,
  charName,
}: {
  attackData: any;
  charName: string;
}) {
  if (!attackData) return null;

  const group = (keys: readonly string[]): TalentEntry[] =>
    keys
      .map((key, index) => ({
        slot: key,
        attack: attackData[key],
        image: attackData.images?.[`filename_${key}`],
        index: index + 1,
      }))
      .filter((entry) => entry.attack && entry.image);

  const combat = group(COMBAT);
  const passive = group(PASSIVE);

  return (
    <div className="flex flex-col gap-12">
      {combat.length > 0 && (
        <section className="flex flex-col gap-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text/45">
            Combat Talents
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {combat.map((entry) => (
              <TalentCard
                key={entry.slot}
                {...entry}
                name={charName}
                label={COMBAT_LABELS[entry.slot] ?? "Combat Talent"}
                variant={entry.index === 1 ? "feature" : "combat"}
                className={entry.index === 1 ? "lg:col-span-2" : undefined}
              />
            ))}
          </div>
        </section>
      )}

      {passive.length > 0 && (
        <section className="flex flex-col gap-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text/45">
            Passive Talents
          </h3>
          <div className="grid gap-4 md:grid-cols-3 md:items-start">
            {passive.map((entry) => (
              <TalentCard
                key={entry.slot}
                {...entry}
                name={charName}
                label="Passive Talent"
                variant="passive"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TalentCard({
  attack,
  name,
  image,
  index,
  label,
  variant,
  className,
}: {
  attack: Talent;
  name: string;
  image: string;
  index: number;
  label: string;
  variant: "feature" | "combat" | "passive";
  className?: string;
}) {
  const parsedHTML = parseGameText(attack.descriptionRaw ?? "");
  const isFeature = variant === "feature";
  const isPassive = variant === "passive";

  const header = (
    <div
      className={`flex items-center gap-4 px-5 ${
        isFeature ? "py-5 lg:items-start lg:border-r lg:border-bg-light/60 lg:px-6" : "py-4"
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border border-bg-light bg-bg-dark/70 ${
          isPassive ? "h-11 w-11 p-1.5" : "h-14 w-14 p-2"
        }`}
      >
        <Image
          src={`https://enka.network/ui/${image}.png`}
          width={isPassive ? 40 : 48}
          height={isPassive ? 40 : 48}
          alt={`${name} ${label.toLowerCase()} ${index}`}
          className="h-full w-full rounded-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
          {label}
        </p>
        <h4
          className={`mt-1 font-bold leading-tight text-text ${
            isFeature ? "text-xl md:text-2xl" : isPassive ? "text-base" : "text-lg"
          }`}
        >
          {attack.name}
        </h4>
      </div>
    </div>
  );

  const body = (
    <div
      className={`border-t border-bg-light/60 px-5 ${
        isFeature
          ? "max-w-[70ch] py-5 text-sm leading-relaxed text-text/75 lg:border-t-0 lg:px-6 md:text-base"
          : isPassive
            ? "py-4 text-sm leading-relaxed text-text/70"
            : "py-5 text-sm leading-relaxed text-text/75"
      }`}
    >
      {parse(parsedHTML)}
    </div>
  );

  return (
    <article
      className={`overflow-hidden rounded-xl border border-bg-light/70 bg-bg-light/25 ${
        isFeature ? "lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]" : "flex flex-col"
      } ${className ?? ""}`}
    >
      {header}
      {body}
    </article>
  );
}
