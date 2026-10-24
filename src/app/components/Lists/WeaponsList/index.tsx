"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import IconButtonSwitch from "../../IconButtonSwitch";
import { Weapon, WeaponRefine } from "@/app/types/weapon";
import Skeleton from "../../Skeleton";

import { parseColorTags } from "@/app/utils/helper";
import parse from "html-react-parser"
export default function WeaponsList({
    WeaponData
}: {
    WeaponData: Weapon[]
}) {
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    const [activeRarity, setActiveRarity] = useState<number>(0);
    const [active, setActive] = useState<Weapon>(WeaponData[0]);
    const [level, setLevel] = useState<number>(90);
    const [percentage, setPercent] = useState<boolean>(false);
    const [refinement, setRefinement] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(true);

    const receiveWeaponStats = async (data: Weapon) => {
        try {
            setLoading(true)
            const res = await fetch(`https://genshin-db-api.vercel.app/api/v5/stats?folder=weapons&query=${data.name}`);
            if (!res.ok) throw new Error(`Failed to fetch weapon stats: ${res.status}`);
            const resData: Record<number, { attack: number; specialized: number }> = await res.json();
            const updatedActive = { ...data, stats: resData };
            const parsedDescription = parseColorTags(updatedActive.descriptionRaw);
            updatedActive.parsedDescription = `${parsedDescription}`
            const parsedStory = parseColorTags(updatedActive.story);
            updatedActive.parsedStory = `${parsedStory}`

            let levelMax = 0;
            let currentLevel = level;
            switch (updatedActive.rarity) {
                case 5:
                case 4:
                case 3:
                    levelMax = 90;
                    break;
                case 2:
                    levelMax = 80;
                    break;
                case 1:
                    levelMax = 70;
                    break;
            }
            if (currentLevel > levelMax) {
                setLevel(levelMax);
                currentLevel = levelMax
            }

            if (data.rarity > 2) {
                const parsedEffect = parseColorTags(updatedActive.effectTemplateRaw ?? "");
                updatedActive.parsedEffect = `${parsedEffect}`
                const containsPercent = data.baseStatText.includes("%");
                const isTrue = containsPercent;
                if (isTrue) setPercent(true);
                else setPercent(false);
            }
            setActive({ ...updatedActive, level: currentLevel });

            setLoading(false)
        } catch (error) {
            console.error("Error fetching weapon stats:", error);
        }
    };

    useEffect(()=>{
        if (WeaponData && WeaponData[0]) {
            receiveWeaponStats(WeaponData[0])
        }
    }, [])

    return (
        <>
            <section className="flex flex-col gap-8">
                <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Weapon</span>
                        <div className="flex flex-wrap gap-2">
                            <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
                            <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
                            <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
                            <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
                            <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Rarity</span>
                        <div className="flex flex-wrap gap-2">
                            <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 1 ? 0 : 1) }} index={1} active={activeRarity} className="text-text/40" />
                            <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 2 ? 0 : 2) }} index={2} active={activeRarity} className="text-green-400" />
                            <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 3 ? 0 : 3) }} index={3} active={activeRarity} className="text-blue-400" />
                            <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 4 ? 0 : 4) }} index={4} active={activeRarity} className="text-purple-400" />
                            <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 5 ? 0 : 5) }} index={5} active={activeRarity} className="text-yellow-400" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto rounded-xl border border-bg-light/60 p-3 max-h-[80dvh] sm:grid-cols-3">
                        {WeaponData.map((weapon: Weapon, index: number) => {
                            const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];
                            const weaponRarity = [true, 1, 2, 3, 4, 5];
                            const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === weapon.weaponText;
                            const validRarity = activeRarity === 0 || weaponRarity[activeRarity] === weapon.rarity;
                            if (validWeapon && validRarity) return <div key={index} className="">
                                <div className={`group flex w-full cursor-pointer flex-col items-center overflow-hidden rounded-xl border border-bg-light/60 bg-bg-light/15 transition-all hover:border-primary/40 ${active && active.id == weapon.id && "border-primary/60 shadow-[0_0_0_1px_rgba(255,115,115,0.4)]"}`} onClick={() => { setActive(weapon); receiveWeaponStats(weapon) }}>
                                    <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-t-xl ${weapon.rarity === 5 ? "bg-gradient-to-br from-[#b98a56]/40 to-[#f5d16e]/30" : weapon.rarity === 4 ? "bg-gradient-to-br from-[#7c4d9f]/40 to-[#b99aff]/30" : weapon.rarity === 3 ? "bg-gradient-to-br from-[#3a6da8]/40 to-[#7fb6ff]/30" : weapon.rarity === 2 ? "bg-gradient-to-br from-[#3a7f5d]/40 to-[#7dffb1]/30" : "bg-gradient-to-br from-[#6b6b6b]/40 to-[#9f9f9f]/30"}`}>
                                        <Image src={`https://enka.network/ui/${weapon.images.filename_icon}.png`} width={200} height={200} alt={`${weapon.name} weapon icon`} className={`object-contain`} title={`${weapon.name}`} />
                                    </div>
                                    <p className="w-full px-2 py-2 text-center text-xs font-semibold text-text/80">{weapon.name}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="order-first lg:order-last">
                        {loading ?
                            <div className="rounded-xl border border-bg-light/70 bg-bg-dark/40 p-6 flex flex-col gap-4">
                                <Skeleton className="h-48 w-full rounded-xl" />
                                <Skeleton className="h-8 w-40 rounded" />
                                <Skeleton className="h-5 w-full rounded" />
                                <Skeleton className="h-5 w-3/4 rounded" />
                                <Skeleton className="h-5 w-1/2 rounded" />
                            </div> :
                            active ? <>
                                <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col overflow-hidden">
                                    <div className={`relative flex items-center justify-between gap-6 ${active.rarity === 5 ? "bg-gradient-to-br from-[#b98a56]/40 to-[#f5d16e]/25" : active.rarity === 4 ? "bg-gradient-to-br from-[#7c4d9f]/40 to-[#b99aff]/25" : active.rarity === 3 ? "bg-gradient-to-br from-[#3a6da8]/40 to-[#7fb6ff]/25" : active.rarity === 2 ? "bg-gradient-to-br from-[#3a7f5d]/40 to-[#7dffb1]/25" : "bg-gradient-to-br from-[#6b6b6b]/40 to-[#9f9f9f]/25"}`}>
                                        {active.stats && <div className="p-6">
                                            <p className="text-sm uppercase tracking-wider text-text/60" >{active.weaponText}</p>
                                            <p className="mt-2 text-sm text-text/60" >Base ATK</p>
                                            <p className="text-3xl font-bold text-text">{active.stats[active.level].attack.toFixed()}</p>
                                            {active.rarity >= 3 &&
                                                <>
                                                    <p className="mt-4 text-sm text-text/60" >{active.mainStatText}</p>
                                                    {percentage ? <p className="text-2xl font-semibold text-text">{(parseFloat(active.stats[active.level].specialized.toFixed(1)) * 100).toFixed(1)}%</p> : <p className="text-2xl font-semibold text-text">{active.stats[active.level].specialized.toFixed(1)}</p>}
                                                </>
                                            }
                                        </div>}
                                        <Image src={`https://enka.network/ui/${active.images.filename_icon}.png`} width={260} height={260} alt={`${active.name} weapon icon`} className={`object-contain`} />
                                    </div>
                                    <div className="flex flex-col gap-4 p-6">
                                        <div className="flex w-full items-center gap-3 text-pretty">
                                            <p className="text-sm text-text/60">Level {active.level}</p>
                                            <input
                                                type="range"
                                                min={1}
                                                max={active.rarity >= 3 ? 90 : active.rarity === 2 ? 80 : 70}
                                                value={level}
                                                onChange={(event) => { setLevel(parseInt(event.target.value)), setActive(({ ...active, level: parseInt(event.target.value) })) }}
                                                className="w-full accent-primary"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-text">{active.name}</h2>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="font-semibold text-text">{active.effectName}</p>
                                                {active.rarity >= 3 && <>
                                                    <div className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-all ${refinement == 1 ? "bg-primary/80 text-text" : "bg-bg-light/40 text-text/70 hover:bg-bg-light/60"}`} onClick={() => { setRefinement(1) }}>
                                                        <p>R1</p>
                                                    </div>
                                                    <div className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-all ${refinement == 2 ? "bg-primary/80 text-text" : "bg-bg-light/40 text-text/70 hover:bg-bg-light/60"}`} onClick={() => { setRefinement(2) }}>
                                                        <p>R2</p>
                                                    </div>
                                                    <div className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-all ${refinement == 3 ? "bg-primary/80 text-text" : "bg-bg-light/40 text-text/70 hover:bg-bg-light/60"}`} onClick={() => { setRefinement(3) }}>
                                                        <p>R3</p>
                                                    </div>
                                                    <div className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-all ${refinement == 4 ? "bg-primary/80 text-text" : "bg-bg-light/40 text-text/70 hover:bg-bg-light/60"}`} onClick={() => { setRefinement(4) }}>
                                                        <p>R4</p>
                                                    </div>
                                                    <div className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-all ${refinement == 5 ? "bg-primary/80 text-text" : "bg-bg-light/40 text-text/70 hover:bg-bg-light/60"}`} onClick={() => { setRefinement(5) }}>
                                                        <p>R5</p>
                                                    </div>
                                                </>}
                                            </div>
                                            {active.rarity >= 3 && (
                                                <p className="text-sm leading-relaxed text-text/80">{(active[`r${refinement}` as keyof Weapon] as WeaponRefine | undefined)?.description}</p>
                                            )}
                                        </div>
                                        {active.parsedDescription && <p className="text-sm italic text-text/60">{parse(active.parsedDescription)}</p>}
                                    </div>
                                </div>
                            </>
                                :
<div className="rounded-xl border border-bg-light/70 bg-bg-dark/40 p-6 flex flex-col gap-4">
                                <Skeleton className="h-48 w-full rounded-xl" />
                                <Skeleton className="h-8 w-40 rounded" />
                                <Skeleton className="h-5 w-full rounded" />
                                <Skeleton className="h-5 w-3/4 rounded" />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
