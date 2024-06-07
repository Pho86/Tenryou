import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import React from "react";
import { Characters, Artifact, SubStat } from "@/app/types/user";
import { isDefenseStat, isAttackStat, isHPStat, isPropertyDamageBonus, isPropertyFlat } from "./index";
import { motion, AnimatePresence } from "framer-motion"

export function ProfileCardSmall({
    character,
}: {
    character: Characters,
}) {
    const cardRef = useRef<any>(null);
    const [activeHover, setActiveHover] = useState<string>("");
    const [showStats, setShowStats] = useState<boolean>(true);
    const [artifactSet, setArtifactSet] = useState<any[]>([])
    useEffect(() => {
        const artifactNames = character.equipment.artifacts.map((artifact: any) => artifact.setName);
        const artifactSetCounts = artifactNames.reduce((accumlator: any, currentVal: number) => {
            accumlator[currentVal] = (accumlator[currentVal] || 0) + 1;
            return accumlator;
        }, {});
        const artifactSetArray = Object.entries(artifactSetCounts).map(([setName, count]) => ({ name: setName, count }));
        setArtifactSet(artifactSetArray);
    }, []);

    return <div className="w-full flex flex-col gap-2" onClick={() => { setShowStats(!showStats) }} >
        <div className={`grid p-1 rounded-xl self-center relative bg-gradient-to-br from-gradient-${character.element}-start to-gradient-${character.element}-end relative`} ref={cardRef}>
            <Image src={`/namecards/stars_background.png`} width={2500} height={2500} alt={`${character.name} background stars image`} className="pointer-events-none absolute top-0 mix-blend-overlay opacity-50 rounded-xl object-cover h-full  " />
            <div className="w-full h-full relative min-h-[600px] flex items-center justify-center">
                <Image src={`https://enka.network/ui/${character.assets.gachaIcon}.png`} blurDataURL="data:..." placeholder="blur" draggable={false} width={2500} height={2500} alt={`${character.name} gacha splash art`} className="bg-bg bg-opacity-45 object-center rounded-xl object-cover h-full w-full" />
            </div>
            <div className="absolute p-3 drop-shadow-text z-40">
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl">{character.name}</h2>
                    <p className="flex gap-2 font-semibold">
                        Lv.{character.properties.level.val}/{character.maxLevel}
                    </p>
                    <div className="flex gap-2 font-semibold">
                        <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-6`} />{character.friendship.level}
                    </div>

                </div>
            </div>
            <div className="absolute left-1 bottom-20 flex flex-col justify-between drop-shadow-icon z-40">
                {character.assets.constellations.map((constellation: any, index: number) => {
                    return <div key={index} className="relative w-12 h-12">
                        <Image src={`/stats/Constellation.svg`} width={250} height={250} alt={`${constellation} background`} className={`w-full z-10`} />
                        <Image src={`https://enka.network/ui/${constellation}.png`} width={250} height={250} alt={`${constellation}`} className={`absolute ${character.constellationsList[index] == undefined && "brightness-50"} top-0 left-0 mt-[11px] ml-[10px] w-7 h-7 z-20`} />
                        {character.constellationsList[index] === undefined &&
                            <Image src={`/stats/lock.svg`} width={250} height={250} alt={`${constellation}`} className={`absolute top-0 left-0 mt-[14px] ml-[14px] w-5 h-5 z-20`} />
                        }
                    </div>
                })}
            </div>
            <div className="absolute flex bottom-1 left-2 gap-3 font-semibold drop-shadow-icon z-40" >
                <div className="">
                    <Image src={`https://enka.network/ui/${character.skills.normalAttacks.assets.icon}.png`} width={250} height={250} alt={`${character.skills.normalAttacks.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                    <div className="w-full justify-center flex items-center">
                        <p className="-mt-2">{character.skills.normalAttacks.level}</p>
                    </div>
                </div>
                <div className="">
                    <Image src={`https://enka.network/ui/${character.skills.elementalSkill.assets.icon}.png`} width={250} height={250} alt={`${character.skills.elementalSkill.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                    <div className="w-full justify-center flex items-center">
                        {character.constellationsList[2] != undefined ?
                            <p className="-mt-2 text-green-600">{character.skills.elementalSkill.level + 3}</p> :
                            <p className="-mt-2">{character.skills.elementalSkill.level}</p>
                        }
                    </div>
                </div>
                <div className="">
                    <Image src={`https://enka.network/ui/${character.skills.elementalBurst.assets.icon}.png`} width={250} height={250} alt={`${character.skills.elementalBurst.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                    <div className="w-full justify-center flex items-center">
                        {character.constellationsList[4] != undefined ?
                            <p className="-mt-2 text-green-600">{character.skills.elementalBurst.level + 3}</p> :
                            <p className="-mt-2 ">{character.skills.elementalBurst.level}</p>
                        }
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showStats && <motion.div className="absolute p-3 rounded-xl w-full h-full bg-bg-dark bg-opacity-45 z-30 flex flex-col items-end justify-between"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col gap-2 drop-shadow-text">
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "HP" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("HP") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_HP.svg`} width={16} height={16} alt={"HP stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {character.stats.maxHp.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs ">
                                    ({character.stats.baseHp.value.toFixed()}&nbsp;
                                    <span className="text-green-600">
                                        +{character.stats.maxHp.value.toFixed() - character.stats.baseHp.value.toFixed()}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "ATK" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("ATK") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_ATTACK.svg`} width={16} height={16} alt={"ATK stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {character.stats.atk.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs">
                                    ({character.stats.baseAtk.value.toFixed()}&nbsp;
                                    <span className="text-green-600">
                                        +{character.stats.atk.value.toFixed() - character.stats.baseAtk.value.toFixed()}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "DEF" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("DEF") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_DEFENSE.svg`} width={16} height={16} alt={"DEF stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {character.stats.def.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs">
                                    ({character.stats.baseDef.value.toFixed()}&nbsp;
                                    <span className="text-green-600">
                                        +{character.stats.def.value.toFixed() - character.stats.baseDef.value.toFixed()}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_ELEMENT_MASTERY" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_ELEMENT_MASTERY") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_ELEMENT_MASTERY.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {character.stats.elementalMastery.value > 0 ? character.stats.elementalMastery.value.toFixed() : 0}
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CRITICAL" && "bg-bg"} py-1 px-2 `} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CRITICAL") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CRITICAL.svg`} width={16} height={16} alt={"CRIT Rate % stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(character.stats.critRate.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CRITICAL_HURT" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CRITICAL_HURT") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CRITICAL_HURT.svg`} width={16} height={16} alt={"CRIT DMG % stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(character.stats.critDamage.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CHARGE_EFFICIENCY" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CHARGE_EFFICIENCY") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CHARGE_EFFICIENCY.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(character.stats.energyRecharge.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        {((character.stats.physicalAddHurt > 0) ||
                            (character.stats.electroDamageBonus.value > 0) ||
                            (character.stats.pyroDamageBonus.value > 0) ||
                            (character.stats.cryoDamageBonus.value > 0) ||
                            (character.stats.hydroDamageBonus.value > 0) ||
                            (character.stats.anemoDamageBonus.value > 0) ||
                            (character.stats.geoDamageBonus.value > 0) ||
                            (character.stats.dendroDamageBonus.value > 0)) &&
                            <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover === "ELEMENT" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("ELEMENT") }} onMouseLeave={() => { setActiveHover("") }}>
                                {character.stats.physicalAddHurt > 0 &&
                                    <>
                                        <div className="flex gap-2">
                                            <Image src={`/stats/FIGHT_PROP_PHYSICAL_ADD_HURT.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">
                                                {(character.stats.physicalAddHurt * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </>
                                }
                                {((character.stats.electroDamageBonus.value > 0) ||
                                    (character.stats.pyroDamageBonus.value > 0) ||
                                    (character.stats.cryoDamageBonus.value > 0) ||
                                    (character.stats.hydroDamageBonus.value > 0) ||
                                    (character.stats.anemoDamageBonus.value > 0) ||
                                    (character.stats.geoDamageBonus.value > 0) ||
                                    (character.stats.dendroDamageBonus.value > 0)) &&
                                    <>
                                        <div className="flex gap-2">
                                            <Image src={`/elements/${character.element}.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">
                                                {character.element === "Electro" && (character.stats.electroDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Pyro" && (character.stats.pyroDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Cryo" && (character.stats.cryoDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Hydro" && (character.stats.hydroDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Anemo" && (character.stats.anemoDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Geo" && (character.stats.geoDamageBonus.value * 100).toFixed(1)}
                                                {character.element === "Dendro" && (character.stats.dendroDamageBonus.value * 100).toFixed(1)}
                                                %
                                            </span>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                        {Number(character.stats.healingBonus.value) > 0 &&
                            <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_HEAL_ADD" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_HEAL_ADD") }} onMouseLeave={() => { setActiveHover("") }}>
                                <div className={`flex gap-2`} >
                                    <Image src={`/stats/FIGHT_PROP_HEAL_ADD.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xl">
                                        {(character.stats.healingBonus.value * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                    {artifactSet.length > 0 && <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between drop-shadow-text`}>
                        <div className={`flex gap-2`} >
                            <Image src={`/icons/artifact.svg`} width={16} height={16} alt={"artifact stat icon"} className="" />
                        </div>
                        <div className="flex flex-col ">
                            {artifactSet.map((set: any, index: number) => {
                                if (set.count >= 2) return <div key={index} className="font-bold text-xs text-green-500">
                                    <p className="text-nowrap">{set.name.length > 22 ? set.name.slice(0, 22) + '...' : set.name}  x<span>{set.count <= 3 ? 2 : 4}</span></p>
                                </div>
                            })}
                        </div>
                    </div>}
                </motion.div>}
            </AnimatePresence>

        </div>
        <div className={`grid p-1 w-full rounded-xl self-center relative bg-gradient-to-br from-gradient-${character.element}-start to-gradient-${character.element}-end relative `}>
            <Image src={`/namecards/stars_background.png`} width={2500} height={2500} alt={`${character.name} background stars image`} className="pointer-events-none absolute top-0 mix-blend-overlay opacity-15 rounded-xl object-cover h-full  " />
            <div className="flex w-full justify-between gap-2 ">
                <div className="flex w-full gap-2">
                    <div className="relative flex justify-center drop-shadow-text">
                        <Image src={`https://enka.network/ui/${character.equipment.weapon.assets.awakenIcon}.png`} width={250} height={250} className="w-28 h-full object-cover bg-bg bg-opacity-40 rounded-xl" alt={character.equipment.weapon.name} />
                        <div className="flex absolute bottom-1 text-xl text-yellow-400">
                            {[...Array(character.equipment.weapon.stars)].map((_, index) => (
                                <FaStar key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 drop-shadow-text justify-end ">
                        <div className="font-bold text-lg whitespace-nowrap">{character.equipment.weapon.name}</div>
                        <div className="flex gap-4">{character.equipment.weapon.weaponStats.map((stat: any, index: number) => {
                            const percentStat = isPropertyFlat(stat.stat)
                            const isAttackBonus = isAttackStat(stat.stat);
                            const isDefenseBonus = isDefenseStat(stat.stat);
                            const isHpBonus = isHPStat(stat.stat);
                            const isDamageBonus = isPropertyDamageBonus(stat.stat);
                            return <div className={`flex p-2 rounded-xl gap-2 font-bold text-xl bg-opacity-75
                ${isAttackBonus && activeHover == "ATK" && "bg-bg"}
                ${isDefenseBonus && activeHover == "DEF" && "bg-bg"}
                ${isHpBonus && activeHover == "HP" && "bg-bg"}
                ${isDamageBonus && activeHover == "ELEMENT" && "bg-bg"}
                ${!isAttackBonus && !isDefenseBonus && !isHpBonus && !isDamageBonus && activeHover == stat.stat && "bg-bg"}
                `} key={index} onMouseEnter={() => {
                                    if (isAttackBonus) setActiveHover("ATK")
                                    else if (isDefenseBonus) setActiveHover("DEF")
                                    else if (isHpBonus) setActiveHover("HP")
                                    else if (isDamageBonus) setActiveHover("ELEMENT")
                                    else setActiveHover(stat.stat)
                                }} onMouseLeave={() => {
                                    setActiveHover("")
                                }}
                            >
                                <Image src={`/stats/${stat.stat}.svg`} width={24} height={24} alt={stat.stat} className="" />
                                {stat.statValue}{!percentStat && "%"}
                            </div>
                        })}

                        </div>
                        <div className="flex gap-2 font-bold">
                            <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">Lv. {character.equipment.weapon.level}/{character.equipment.weapon.level}</div>
                            <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">R{character.equipment.weapon.refinement.level + 1}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}