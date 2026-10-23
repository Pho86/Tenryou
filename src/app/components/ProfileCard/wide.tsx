import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaDownload } from "react-icons/fa6";
import { toPng } from 'html-to-image';
import React from "react";
import { User, Characters, Artifact, SubStat, RollQualityItem, WeaponStat } from "@/app/types/user";
import { isDefenseStat, isAttackStat, isHPStat, isPropertyDamageBonus, isPropertyFlat } from "./index";
export function ProfileCardWide({
    user,
    activeCharacter,
    artifactSet,
    toggleShowStatsModal,
}: {
    user: User,
    activeCharacter: Characters,
    artifactSet: { name: string; count: number }[]
    toggleShowStatsModal: () => void,
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState<boolean>(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const prepareURL = async () => {
        setDownloading(true);
        setDownloadError(null);
        try {
            const dataUrl = await toPng(cardRef.current!, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `${user.player.username}_${activeCharacter.name}.png`;
            link.href = dataUrl;
            link.click();
        } catch {
            setDownloadError("Couldn't generate the card. Please try again.");
        } finally {
            setDownloading(false);
        }
    };
    const [activeHover, setActiveHover] = useState<string>("");
    const [username, setUsername] = useState<boolean>(true);
    const [UID, setUID] = useState<boolean>(true);
    const [critValue, setCritValue] = useState<boolean>(true);
    const [subStatRolls, setSubStatRolls] = useState<boolean>(true);
    const [starsBackground, setStarsBackground] = useState<boolean>(false);
    return <>
        <section aria-labelledby="build-card-heading" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 id="build-card-heading" className="text-2xl font-bold">Build card</h2>
                    <p className="text-sm text-text/55">Choose what to include, then download the card as a PNG.</p>
                </div>
                <button
                    type="button"
                    onClick={() => { prepareURL() }}
                    disabled={downloading}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-bg-darkest transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-wait disabled:opacity-60"
                >
                    <FaDownload aria-hidden="true" />
                    {downloading ? "Preparing..." : "Download PNG"}
                </button>
            </div>
            <fieldset className="flex flex-wrap gap-2">
                <legend className="sr-only">Card options</legend>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={username} onChange={() => { setUsername(!username) }} className="h-4 w-4 accent-primary" />
                    <span>Username</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={UID} onChange={() => { setUID(!UID) }} className="h-4 w-4 accent-primary" />
                    <span>UID</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={critValue} onChange={() => { setCritValue(!critValue) }} className="h-4 w-4 accent-primary" />
                    <span>Crit Value</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={subStatRolls} onChange={() => { setSubStatRolls(!subStatRolls) }} className="h-4 w-4 accent-primary" />
                    <span>Substat Rolls</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={!starsBackground} onChange={() => { setStarsBackground(!starsBackground) }} className="h-4 w-4 accent-primary" />
                    <span>Namecard BG</span>
                </label>
            </fieldset>
            {downloadError && (
                <p role="alert" className="text-sm font-semibold text-primary">{downloadError}</p>
            )}
        <div
            tabIndex={0}
            role="region"
            aria-label="Character card preview. Scroll horizontally on smaller screens."
            className="grid place-items-center overflow-x-auto overscroll-x-contain rounded-2xl py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 2xl:overflow-x-hidden"
            id="wide_player_card"
        >

            <div className={`grid grid-cols-2 auto-cols-[400px] w-[1280px] p-2 rounded-xl self-center bg-gradient-to-br from-gradient-${activeCharacter.element}-start to-gradient-${activeCharacter.element}-end relative`} ref={cardRef}>
                {starsBackground ?
                    <Image src={`/namecards/stars_background.png`} width={2500} height={2500} alt={`${activeCharacter.name} background stars image`} blurDataURL="data:..." placeholder="blur"  className="pointer-events-none absolute top-0 mix-blend-overlay opacity-40 rounded-xl object-cover h-full  " /> 
                    :
                    activeCharacter.name === "Yae Miko" ?
                        <Image src={`https://gi.yatta.moe/assets/UI/namecard/UI_NameCardPic_${activeCharacter.fileName}1_P.png`} blurDataURL="data:..." placeholder="blur"  width={2000} height={1000} alt={`${activeCharacter.name} namecard image banner`} className="pointer-events-none absolute top-0 mix-blend-overlay opacity-50 rounded-xl object-cover h-full " />
                        :
                        (activeCharacter.name === "Traveler") ?
                            <Image src={`/namecards/UI_NameCardPic_Ysxf4_P.png`} width={2000} height={1000} alt={`${activeCharacter.name} namecard image banner`} className="pointer-events-none absolute top-0 mix-blend-overlay opacity-50 rounded-xl object-cover h-full w-full" />
                            :
                            <Image src={`https://gi.yatta.moe/assets/UI/namecard/UI_NameCardPic_${activeCharacter.fileName}_P.png`} blurDataURL="data:..." placeholder="blur"  width={2000} height={1000} alt={`${activeCharacter.name} namecard image banner`} className="pointer-events-none absolute top-0 mix-blend-overlay opacity-50 rounded-xl object-cover h-full w-full" />
                }
                <Image src={'/icon.svg'} alt="Tenryou Logo" width={50} height={50} className="absolute right-2 top-2 drop-shadow-icon"/>
                <div className="w-full h-full relative min-h-[400px] col-span-1">
                    <div className="flex flex-col absolute p-5 w-full h-full drop-shadow-text ">
                        <div className="flex-col flex h-full justify-between">
                            <div className="">
                                <div className="flex gap-2 items-center">
                                    <h2 className="text-3xl font-semibold">
                                        {activeCharacter.name}
                                    </h2>
                                    {username && <h3 className="text-2xl">
                                        - {user.player.username}
                                    </h3>}
                                </div>
                                <p className="flex gap-2 font-semibold">
                                    Lv.{activeCharacter.properties.level.val}/{activeCharacter.maxLevel}
                                </p>
                                <div className="flex gap-2 font-semibold">
                                    <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-6`} />{activeCharacter.friendship.level}
                                </div>
                            </div>
                            <div>
                                {UID && <h4 className="textlg">
                                    {user.uid}
                                </h4>}
                            </div>
                        </div>
                        <div className="absolute right-3 bottom-20 flex flex-col justify-between">
                            {activeCharacter.assets.constellations.map((constellation: string, index: number) => {
                                return <div key={index} className="relative w-12 h-12">
                                    <Image src={`/stats/Constellation.svg`} width={250} height={250} alt={`${constellation} background`} className={`w-full z-10`} />
                                    <Image src={`https://enka.network/ui/${constellation}.png`} width={250} height={250} alt={`${constellation}`} className={`absolute ${activeCharacter.constellationsList[index] == undefined && "brightness-50"} top-0 left-0 mt-[11px] ml-[10px] w-7 h-7 z-20`} />
                                    {activeCharacter.constellationsList[index] === undefined &&
                                        <Image src={`/stats/lock.svg`} width={250} height={250} alt={`${constellation}`} className={`absolute top-0 left-0 mt-[14px] ml-[14px] w-5 h-5 z-20`} />
                                    }
                                </div>
                            })}
                        </div>
                        <div className="absolute flex bottom-2 right-4 gap-3 font-semibold">
                            <div className="">
                                <Image src={`https://enka.network/ui/${activeCharacter.skills.normalAttacks.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.normalAttacks.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                <div className="w-full justify-center flex items-center">
                                    <p className="-mt-2">{activeCharacter.skills.normalAttacks.level}</p>
                                </div>
                            </div>
                            <div className="">
                                <Image src={`https://enka.network/ui/${activeCharacter.skills.elementalSkill.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.elementalSkill.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                <div className="w-full justify-center flex items-center">
                                    {activeCharacter.constellationsList[2] != undefined ?
                                        <p className="-mt-2 text-green-500">{activeCharacter.skills.elementalSkill.level + 3}</p> :
                                        <p className="-mt-2">{activeCharacter.skills.elementalSkill.level}</p>
                                    }
                                </div>
                            </div>
                            <div className="">
                                <Image src={`https://enka.network/ui/${activeCharacter.skills.elementalBurst.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.elementalBurst.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                <div className="w-full justify-center flex items-center">
                                    {activeCharacter.constellationsList[4] != undefined ?
                                        <p className="-mt-2 text-green-500">{activeCharacter.skills.elementalBurst.level + 3}</p> :
                                        <p className="-mt-2 ">{activeCharacter.skills.elementalBurst.level}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 w-full h-full max-h-[650px] flex items-center justify-center">
                        <Image src={`https://enka.network/ui/${activeCharacter.assets.gachaIcon}.png`} blurDataURL="data:..." placeholder="blur"  width={2500} height={2500} alt={`${activeCharacter.name}`} title={`${activeCharacter.name} gacha splash art`} className="rounded-xl bg-bg/30 object-cover h-full w-full" />
                    </div>
                </div>
                <div className="p-2 flex flex-col gap-2 col-span-1 w-full drop-shadow-text">
                    <div className="flex flex-col w-full ">
                        <div className="flex w-full justify-between gap-2 ">
                            <div className="flex w-full gap-2 ">
                                <div className="relative flex justify-center">
                                    <Image src={`https://enka.network/ui/${activeCharacter.equipment.weapon.assets.awakenIcon}.png`} width={250} height={250} className=" w-28 h-full object-cover bg-bg/30 rounded-xl" alt={activeCharacter.equipment.weapon.name} />
                                    <div className="flex absolute bottom-1 text-xl text-yellow-400">
                                        {[...Array(activeCharacter.equipment.weapon.stars)].map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <div className="font-bold text-2xl">{activeCharacter.equipment.weapon.name}</div>
                                    <div className="flex gap-4">{activeCharacter.equipment.weapon.weaponStats.map((stat: WeaponStat, index: number) => {
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
                                        <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">Lv. {activeCharacter.equipment.weapon.level}/{activeCharacter.equipment.weapon.level}</div>
                                        <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">R{activeCharacter.equipment.weapon.refinement.level + 1}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "HP" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("HP") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_HP.svg`} width={16} height={16} alt={"HP stat icon"} className="" />
                                <span>Max HP</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {activeCharacter.stats.maxHp.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs ">
                                    ({activeCharacter.stats.baseHp.value.toFixed()}&nbsp;
                                    <span className="text-green-500">
                                        +{activeCharacter.stats.maxHp.value - activeCharacter.stats.baseHp.value}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "ATK" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("ATK") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_ATTACK.svg`} width={16} height={16} alt={"ATK stat icon"} className="" />
                                <span>ATK</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {activeCharacter.stats.atk.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs">
                                    ({activeCharacter.stats.baseAtk.value.toFixed()}&nbsp;
                                    <span className="text-green-500">
                                        +{activeCharacter.stats.atk.value - activeCharacter.stats.baseAtk.value}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "DEF" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("DEF") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_DEFENSE.svg`} width={16} height={16} alt={"DEF stat icon"} className="" />
                                <span>DEF</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {activeCharacter.stats.def.value.toFixed()}&nbsp;
                                </span>
                                <span className="text-xs">
                                    ({activeCharacter.stats.baseDef.value.toFixed()}&nbsp;
                                    <span className="text-green-500">
                                        +{activeCharacter.stats.def.value - activeCharacter.stats.baseDef.value}
                                    </span>
                                    )
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_ELEMENT_MASTERY" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_ELEMENT_MASTERY") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_ELEMENT_MASTERY.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                                <span>Elemental Mastery</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {activeCharacter.stats.elementalMastery.value > 0 ? activeCharacter.stats.elementalMastery.value.toFixed() : 0}
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CRITICAL" && "bg-bg"} py-1 px-2 `} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CRITICAL") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CRITICAL.svg`} width={16} height={16} alt={"CRIT Rate % stat icon"} className="" />
                                <span>CRIT Rate</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(activeCharacter.stats.critRate.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CRITICAL_HURT" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CRITICAL_HURT") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CRITICAL_HURT.svg`} width={16} height={16} alt={"CRIT DMG % stat icon"} className="" />
                                <span>CRIT DMG</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(activeCharacter.stats.critDamage.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_CHARGE_EFFICIENCY" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_CHARGE_EFFICIENCY") }} onMouseLeave={() => { setActiveHover("") }}>
                            <div className={`flex gap-2`} >
                                <Image src={`/stats/FIGHT_PROP_CHARGE_EFFICIENCY.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                                <span>Energy Recharge</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-xl">
                                    {(activeCharacter.stats.energyRecharge.value * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        {((activeCharacter.stats.physicalAddHurt > 0) ||
                            (activeCharacter.stats.electroDamageBonus.value > 0) ||
                            (activeCharacter.stats.pyroDamageBonus.value > 0) ||
                            (activeCharacter.stats.cryoDamageBonus.value > 0) ||
                            (activeCharacter.stats.hydroDamageBonus.value > 0) ||
                            (activeCharacter.stats.anemoDamageBonus.value > 0) ||
                            (activeCharacter.stats.geoDamageBonus.value > 0) ||
                            (activeCharacter.stats.dendroDamageBonus.value > 0)) &&
                            <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover === "ELEMENT" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("ELEMENT") }} onMouseLeave={() => { setActiveHover("") }}>
                                {activeCharacter.stats.physicalAddHurt > 0 &&
                                    <>
                                        <div className="flex gap-2">
                                            <Image src={`/stats/FIGHT_PROP_PHYSICAL_ADD_HURT.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                            <span>Physical DMG Bonus</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">
                                                {(activeCharacter.stats.physicalAddHurt * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </>
                                }
                                {((activeCharacter.stats.electroDamageBonus.value > 0) ||
                                    (activeCharacter.stats.pyroDamageBonus.value > 0) ||
                                    (activeCharacter.stats.cryoDamageBonus.value > 0) ||
                                    (activeCharacter.stats.hydroDamageBonus.value > 0) ||
                                    (activeCharacter.stats.anemoDamageBonus.value > 0) ||
                                    (activeCharacter.stats.geoDamageBonus.value > 0) ||
                                    (activeCharacter.stats.dendroDamageBonus.value > 0)) &&
                                    <>
                                        <div className="flex gap-2">
                                            <Image src={`/elements/${activeCharacter.element}.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                            <span>{activeCharacter.element} DMG Bonus</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">
                                                {activeCharacter.element === "Electro" && (activeCharacter.stats.electroDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Pyro" && (activeCharacter.stats.pyroDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Cryo" && (activeCharacter.stats.cryoDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Hydro" && (activeCharacter.stats.hydroDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Anemo" && (activeCharacter.stats.anemoDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Geo" && (activeCharacter.stats.geoDamageBonus.value * 100).toFixed(1)}
                                                {activeCharacter.element === "Dendro" && (activeCharacter.stats.dendroDamageBonus.value * 100).toFixed(1)}
                                                %
                                            </span>
                                        </div>
                                    </>
                                }
                            </div>
                        }

                        {Number(activeCharacter.stats.healingBonus.value) > 0 &&
                            <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_HEAL_ADD" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_HEAL_ADD") }} onMouseLeave={() => { setActiveHover("") }}>
                                <div className={`flex gap-2`} >
                                    <Image src={`/stats/FIGHT_PROP_HEAL_ADD.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                                    <span>Healing Bonus</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xl">
                                        {(activeCharacter.stats.healingBonus.value * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        }
                        {artifactSet.length > 0 && <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between  py-1 px-2`}>
                            <div className={`flex gap-2`} >
                                <Image src={`/icons/artifact.svg`} width={16} height={16} alt={"artifact stat icon"} className="" />
                                <span>Artifact Sets</span>
                            </div>
                            <div className="flex flex-col ">
                                {artifactSet.map((set: { name: string; count: number }, index: number) => {
                                    if (set.count >= 2) return <div key={index} className="font-medium text-md text-green-500">
                                        <p className="text-nowrap">{set.name} x<span>{set.count <= 3 ? 2 : 4}</span></p>
                                    </div>
                                })}
                            </div>
                        </div>}

                    </div>
                </div>
                <div className="w-full col-span-2 p-2 grid grid-cols-5 gap-2 place-items-center ">
                    {activeCharacter.equipment.artifacts.map((artifact: Artifact, index: number) => {
                        const isAttackBonus = isAttackStat(artifact.mainstat.stat);
                        const isDefenseBonus = isDefenseStat(artifact.mainstat.stat);
                        const isHpBonus = isHPStat(artifact.mainstat.stat);
                        const isDamageBonus = isPropertyDamageBonus(artifact.mainstat.stat);
                        const propertyType = isPropertyFlat(artifact.mainstat.stat);
                        const rollQualityMap: Record<string, RollQualityItem> = {};
                        for (const item of artifact.substatsRollQuality ?? []) {
                            if (!item?.type) continue;
                            const rolls = Array.isArray(item.rollQuality)
                                ? item.rollQuality
                                : typeof item.rollQuality === "number"
                                    ? [item.rollQuality]
                                    : [];
                            if (!rollQualityMap[item.type]) {
                                rollQualityMap[item.type] = { id: item.id, type: item.type, rollQuality: [...rolls] };
                            } else {
                                rollQualityMap[item.type].rollQuality.push(...rolls);
                            }
                        }
                        artifact.rollquality = Object.values(rollQualityMap);
                        artifact.critValue = 0;
                        (artifact.substats ?? []).forEach((substat: SubStat) => {
                            if (substat.stat === 'FIGHT_PROP_CRITICAL_HURT') {
                                artifact.critValue += substat.statValue;
                            }
                            else if (substat.stat === 'FIGHT_PROP_CRITICAL') {
                                artifact.critValue += substat.statValue * 2;
                            }
                        });
                        return <div key={index} className="relative w-full grid grid-cols-2 gap-2 bg-bg-dark bg-opacity-50 rounded-xl p-2 justify-between items-center ">
                            <div className="relative flex justify-center drop-shadow-text ">
                                <Image src={`https://enka.network/ui/${artifact.icon}.png`} title={artifact.name} width={100} height={100} alt={`${artifact.name} icon`} className="object-contain " />
                                <div className="flex absolute bottom-0 text-yellow-400">
                                    {[...Array(artifact.stars)].map((_, index) => (
                                        <FaStar key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col font-bold justify-center drop-shadow-text ">
                                <div className="flex justify-end" >
                                    <div className="">
                                        {critValue && <p className="hover:bg-bg bg-opacity-35 p-1 rounded-xl cursor-pointer transition-all" onClick={() => { toggleShowStatsModal() }}>
                                            CV:&nbsp;
                                            <span className={` ${artifact.critValue < 10 ? "text-red-500" :
                                                artifact.critValue < 20 ? "text-orange-500" :
                                                    artifact.critValue < 30 ? "text-yellow-500" :
                                                        artifact.critValue >= 30 ? "text-green-500" : ""
                                                }`} title="Crit Rate + Crit Dmg*2">
                                                {artifact.critValue.toFixed(1)}
                                            </span>
                                        </p>}
                                    </div>
                                </div>
                                <div className={`flex text-xl gap-2 p-2 rounded-xl bg-opacity-75 ${isAttackBonus && activeHover == "ATK" && "bg-bg-dark"} ${isDefenseBonus && activeHover == "DEF" && "bg-bg-dark"} ${isHpBonus && activeHover == "HP" && "bg-bg-dark"} ${isDamageBonus && activeHover == "ELEMENT" && "bg-bg-dark"} ${!isAttackBonus && !isDefenseBonus && !isHpBonus && !isDamageBonus && activeHover == artifact.mainstat.stat && "bg-bg-dark"}`} onMouseEnter={() => {
                                    if (isAttackBonus) setActiveHover("ATK")
                                    else if (isDefenseBonus) setActiveHover("DEF")
                                    else if (isHpBonus) setActiveHover("HP")
                                    else if (isDamageBonus) setActiveHover("ELEMENT")
                                    else setActiveHover(artifact.mainstat.stat)
                                }}
                                    onMouseLeave={() => { setActiveHover("") }}
                                >
                                    {!isDamageBonus || artifact.mainstat.stat === "FIGHT_PROP_PHYSICAL_ADD_HURT" ? (
                                        <Image src={`/stats/${artifact.mainstat.stat}.svg`} width={32} height={32} alt={artifact.mainstat.stat} className="drop-shadow-icon" />
                                    ) : (
                                        <Image src={`/elements/${activeCharacter.element}.svg`} width={32} height={32} alt={artifact.mainstat.stat} className=" drop-shadow-icon" />
                                    )}
                                    {artifact.mainstat.statValue}{!propertyType && "%"}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 col-span-2 place-items-start font-bold drop-shadow-text ">
                                {artifact.substats.map((stat: SubStat, index: number) => {
                                    const isAttackBonus = isAttackStat(stat.stat);
                                    const isDefenseBonus = isDefenseStat(stat.stat);
                                    const isHpBonus = isHPStat(stat.stat);
                                    const propertyType = isPropertyFlat(stat.stat);
                                    return <div className={`flex gap-2 p-2 w-full bg-opacity-75 relative
                ${isAttackBonus && activeHover == "ATK" && "bg-bg-darkest"}
                ${isDefenseBonus && activeHover == "DEF" && "bg-bg-darkest"}
                ${isHpBonus && activeHover == "HP" && "bg-bg-darkest"}
                ${!isAttackBonus && !isDefenseBonus && !isHpBonus && activeHover == stat.stat && "bg-bg-darkest"}
                transition-all rounded-xl`} key={index} onMouseEnter={() => {
                                            if (isAttackBonus) setActiveHover("ATK")
                                            else if (isDefenseBonus) setActiveHover("DEF")
                                            else if (isHpBonus) setActiveHover("HP")
                                            else setActiveHover(stat.stat)
                                        }} onMouseLeave={() => { setActiveHover("") }}>
                                        {!propertyType ?
                                            <Image src={`/stats/${stat.stat}.svg`} width={16} height={16} alt={stat.stat} className="drop-shadow-icon" />
                                            :
                                            <Image src={`/stats/${stat.stat}.svg`} width={16} height={16} alt={stat.stat} className="drop-shadow-icon" />
                                        }
                                        +{stat.statValue}{!propertyType && "%"}
                                        <div className="flex absolute items-center -bottom-2 gap-1 pointer-events-none ">
                                            {(artifact.rollquality ?? []).map((roll: RollQualityItem, rollIndex: number) => {
                                                if (roll.type === stat.stat && subStatRolls) {
                                                    return (roll.rollQuality ?? []).map((quality: number, qualityIndex: number) => (
                                                        <React.Fragment key={`${rollIndex}-${qualityIndex}`}>
                                                            <span className={`${quality === 4 ? "font-bold text-xl text-green-500" : quality === 3 ? "font-semibold text-lg text-orange-500" : quality === 2 ? "font-medium text-normal text-yellow-500" : "text-sm text-red-500"}`}>—</span>
                                                        </React.Fragment>
                                                    ));
                                                }
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
        </section>
    </>
}