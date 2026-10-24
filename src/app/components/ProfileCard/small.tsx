"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { Characters, WeaponStat } from "@/app/types/user";
import {
    isDefenseStat,
    isAttackStat,
    isHPStat,
    isPropertyDamageBonus,
    isPropertyFlat,
} from "./index";

const GRADIENTS: Record<string, string> = {
    Pyro: "from-gradient-Pyro-start to-gradient-Pyro-end",
    Hydro: "from-gradient-Hydro-start to-gradient-Hydro-end",
    Anemo: "from-gradient-Anemo-start to-gradient-Anemo-end",
    Electro: "from-gradient-Electro-start to-gradient-Electro-end",
    Dendro: "from-gradient-Dendro-start to-gradient-Dendro-end",
    Cryo: "from-gradient-Cryo-start to-gradient-Cryo-end",
    Geo: "from-gradient-Geo-start to-gradient-Geo-end",
};

function StatRow({
    id,
    activeHover,
    setActiveHover,
    children,
}: {
    id: string;
    activeHover: string;
    setActiveHover: (id: string) => void;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between py-1 px-2 ${activeHover === id ? "bg-bg" : ""}`}
            onMouseEnter={() => setActiveHover(id)}
            onMouseLeave={() => setActiveHover("")}
        >
            {children}
        </div>
    );
}

function StatIcon({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return <Image src={src} width={16} height={16} alt={alt} className={className} />;
}

export function ProfileCardSmall({ character }: { character: Characters }) {
    const [activeHover, setActiveHover] = useState<string>("");
    const [showStats, setShowStats] = useState<boolean>(true);
    const pointerStart = useRef<{ x: number; y: number } | null>(null);

    const gradient = GRADIENTS[character.element] ?? "";
    const stats = character.stats;

    const artifactSets = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const artifact of character.equipment.artifacts) {
            counts[artifact.setName] = (counts[artifact.setName] || 0) + 1;
        }
        return Object.entries(counts)
            .filter(([, count]) => count >= 2)
            .map(([name, count]) => ({ name, count, bonus: count >= 4 ? 4 : 2 }));
    }, [character.equipment.artifacts]);

    const elementBonus: number =
        {
            Electro: stats.electroDamageBonus.value,
            Pyro: stats.pyroDamageBonus.value,
            Cryo: stats.cryoDamageBonus.value,
            Hydro: stats.hydroDamageBonus.value,
            Anemo: stats.anemoDamageBonus.value,
            Geo: stats.geoDamageBonus.value,
            Dendro: stats.dendroDamageBonus.value,
        }[character.element as string] ?? 0;

    const hasPhysical = stats.physicalAddHurt > 0;
    const hasElement = elementBonus > 0;

    const bonusOf = (base: number, total: number) => Math.round(total) - Math.round(base);

    const rowProps = { activeHover, setActiveHover };

    return (
        <div className="w-full flex flex-col gap-2">
            <div
                className={`grid cursor-pointer p-1 rounded-xl self-center relative bg-gradient-to-br ${gradient}`}
                onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY } }}
                onClick={(event) => {
                    const start = pointerStart.current;
                    pointerStart.current = null;
                    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
                    setShowStats((prev) => !prev);
                }}
            >
                <Image
                    src="/namecards/stars_background.png"
                    width={2500}
                    height={2500}
                    alt={`${character.name} background stars image`}
                    className="pointer-events-none absolute top-0 mix-blend-overlay opacity-50 rounded-xl object-cover h-full"
                />
                <div className="w-full h-full relative min-h-[600px] flex items-center justify-center">
                    <Image
                        src={`https://enka.network/ui/${character.assets.gachaIcon}.png`}
                        draggable={false}
                        width={2500}
                        height={2500}
                        alt={`${character.name} gacha splash art`}
                        className="bg-bg bg-opacity-30 object-center rounded-xl object-cover h-full w-full"
                    />
                </div>

                <div className="absolute p-3 drop-shadow-text z-40">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-2xl">{character.name}</h2>
                        <p className="flex gap-2 font-semibold">
                            Lv.{character.properties.level.val}/{character.maxLevel}
                        </p>
                        <div className="flex gap-2 font-semibold">
                            <Image src="/stats/Friendship.svg" width={250} height={250} alt="Friendship Level" className="w-6" />
                            {character.friendship.level}
                        </div>
                    </div>
                </div>

                <div className="absolute left-1 bottom-20 flex flex-col justify-between drop-shadow-icon z-40">
                    {character.assets.constellations.map((constellation: string, index: number) => {
                        const locked = character.constellationsList[index] === undefined;
                        return (
                            <div key={constellation + index} className="relative w-12 h-12">
                                <Image src="/stats/Constellation.svg" width={250} height={250} alt="Constellation background" className="w-full z-10" />
                                <Image
                                    src={`https://enka.network/ui/${constellation}.png`}
                                    width={250}
                                    height={250}
                                    alt={`Constellation ${index + 1}`}
                                    className={`absolute ${locked ? "brightness-50" : ""} top-0 left-0 mt-[11px] ml-[10px] w-7 h-7 z-20`}
                                />
                                {locked && (
                                    <Image src="/stats/lock.svg" width={250} height={250} alt="Locked" className="absolute top-0 left-0 mt-[14px] ml-[14px] w-5 h-5 z-20" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="absolute flex bottom-1 left-2 gap-3 font-semibold drop-shadow-icon z-40">
                    {[
                        { skill: character.skills.normalAttacks, boosted: false },
                        { skill: character.skills.elementalSkill, boosted: character.constellationsList[2] !== undefined },
                        { skill: character.skills.elementalBurst, boosted: character.constellationsList[4] !== undefined },
                    ].map(({ skill, boosted }) => (
                        <div key={skill.name}>
                            <Image
                                src={`https://enka.network/ui/${skill.assets.icon}.png`}
                                width={250}
                                height={250}
                                alt={skill.name}
                                className="w-12 bg-bg-dark rounded-full bg-opacity-70 p-1"
                            />
                            <div className="w-full justify-center flex items-center">
                                <p className={`-mt-2 ${boosted ? "text-green-600" : ""}`}>
                                    {boosted ? skill.level + 3 : skill.level}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {showStats && (
                        <motion.div
                            className="absolute p-3 rounded-xl w-full h-full bg-black/40 z-30 flex flex-col items-end justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex flex-col gap-2 drop-shadow-text">
                                {[
                                    { id: "HP", icon: "FIGHT_PROP_HP", label: "HP", total: stats.maxHp.value, base: stats.baseHp.value },
                                    { id: "ATK", icon: "FIGHT_PROP_ATTACK", label: "ATK", total: stats.atk.value, base: stats.baseAtk.value },
                                    { id: "DEF", icon: "FIGHT_PROP_DEFENSE", label: "DEF", total: stats.def.value, base: stats.baseDef.value },
                                ].map((s) => (
                                    <StatRow key={s.id} id={s.id} {...rowProps}>
                                        <StatIcon src={`/stats/${s.icon}.svg`} alt={`${s.label} stat icon`} />
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">{Math.round(s.total)}&nbsp;</span>
                                            <span className="text-xs">
                                                ({Math.round(s.base)}&nbsp;
                                                <span className="text-green-600">+{bonusOf(s.base, s.total)}</span>)
                                            </span>
                                        </div>
                                    </StatRow>
                                ))}

                                <StatRow id="FIGHT_PROP_ELEMENT_MASTERY" {...rowProps}>
                                    <StatIcon src="/stats/FIGHT_PROP_ELEMENT_MASTERY.svg" alt="Elemental Mastery stat icon" />
                                    <span className="text-xl">
                                        {stats.elementalMastery.value > 0 ? Math.round(stats.elementalMastery.value) : 0}
                                    </span>
                                </StatRow>

                                <StatRow id="FIGHT_PROP_CRITICAL" {...rowProps}>
                                    <StatIcon src="/stats/FIGHT_PROP_CRITICAL.svg" alt="CRIT Rate stat icon" />
                                    <span className="text-xl">{(stats.critRate.value * 100).toFixed(1)}%</span>
                                </StatRow>

                                <StatRow id="FIGHT_PROP_CRITICAL_HURT" {...rowProps}>
                                    <StatIcon src="/stats/FIGHT_PROP_CRITICAL_HURT.svg" alt="CRIT DMG stat icon" />
                                    <span className="text-xl">{(stats.critDamage.value * 100).toFixed(1)}%</span>
                                </StatRow>

                                <StatRow id="FIGHT_PROP_CHARGE_EFFICIENCY" {...rowProps}>
                                    <StatIcon src="/stats/FIGHT_PROP_CHARGE_EFFICIENCY.svg" alt="Energy Recharge stat icon" />
                                    <span className="text-xl">{(stats.energyRecharge.value * 100).toFixed(1)}%</span>
                                </StatRow>

                                {(hasPhysical || hasElement) && (
                                    <StatRow id="ELEMENT" {...rowProps}>
                                        {hasPhysical && (
                                            <>
                                                <StatIcon src="/stats/FIGHT_PROP_PHYSICAL_ADD_HURT.svg" alt="Physical DMG icon" className="grayscale brightness-200" />
                                                <span className="text-xl">{(stats.physicalAddHurt * 100).toFixed(1)}%</span>
                                            </>
                                        )}
                                        {hasElement && (
                                            <>
                                                <StatIcon src={`/elements/${character.element}.svg`} alt="Elemental DMG icon" className="grayscale brightness-200" />
                                                <span className="text-xl">{(elementBonus * 100).toFixed(1)}%</span>
                                            </>
                                        )}
                                    </StatRow>
                                )}

                                {Number(stats.healingBonus.value) > 0 && (
                                    <StatRow id="FIGHT_PROP_HEAL_ADD" {...rowProps}>
                                        <StatIcon src="/stats/FIGHT_PROP_HEAL_ADD.svg" alt="Healing Bonus stat icon" />
                                        <span className="text-xl">{(stats.healingBonus.value * 100).toFixed(1)}%</span>
                                    </StatRow>
                                )}
                            </div>

                            {artifactSets.length > 0 && (
                                <div className="flex gap-2 items-center rounded-xl font-semibold justify-between drop-shadow-text">
                                    <StatIcon src="/icons/artifact.svg" alt="Artifact set icon" />
                                    <div className="flex flex-col">
                                        {artifactSets.map((set) => (
                                            <div key={set.name} className="font-bold text-xs text-green-500">
                                                <p className="text-nowrap">
                                                    {set.name.length > 22 ? set.name.slice(0, 22) + "..." : set.name} x{set.bonus}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className={`grid p-1 w-full rounded-xl self-center relative bg-gradient-to-br ${gradient}`}>
                <Image
                    src="/namecards/stars_background.png"
                    width={2500}
                    height={2500}
                    alt={`${character.name} background stars image`}
                    className="pointer-events-none absolute top-0 mix-blend-overlay opacity-15 rounded-xl object-cover h-full"
                />
                <div className="flex w-full justify-between gap-2">
                    <div className="flex w-full gap-2">
                        <div className="relative flex justify-center drop-shadow-text">
                            <Image
                                src={`https://enka.network/ui/${character.equipment.weapon.assets.awakenIcon}.png`}
                                width={250}
                                height={250}
                                className="w-28 h-full object-cover bg-bg bg-opacity-30 rounded-xl"
                                alt={character.equipment.weapon.name}
                            />
                            <div className="flex absolute bottom-1 text-xl text-yellow-400">
                                {Array.from({ length: character.equipment.weapon.stars }).map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 drop-shadow-text justify-end">
                            <div className="font-bold text-lg whitespace-nowrap">{character.equipment.weapon.name}</div>
                            <div className="flex gap-4">
                                {character.equipment.weapon.weaponStats.map((stat: WeaponStat, index: number) => {
                                    const isFlat = isPropertyFlat(stat.stat);
                                    const group = isAttackStat(stat.stat)
                                        ? "ATK"
                                        : isDefenseStat(stat.stat)
                                            ? "DEF"
                                            : isHPStat(stat.stat)
                                                ? "HP"
                                                : isPropertyDamageBonus(stat.stat)
                                                    ? "ELEMENT"
                                                    : stat.stat;
                                    return (
                                        <div
                                            key={index}
                                            className={`flex p-2 rounded-xl gap-2 font-bold text-xl bg-opacity-75 ${activeHover === group ? "bg-bg" : ""}`}
                                            onMouseEnter={() => setActiveHover(group)}
                                            onMouseLeave={() => setActiveHover("")}
                                        >
                                            <Image src={`/stats/${stat.stat}.svg`} width={24} height={24} alt={stat.stat} />
                                            {stat.statValue}
                                            {!isFlat && "%"}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex gap-2 font-bold">
                                <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">
                                    Lv. {character.equipment.weapon.level}/{character.equipment.weapon.level}
                                </div>
                                <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">
                                    R{character.equipment.weapon.refinement.level + 1}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}