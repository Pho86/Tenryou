"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import IconButtonSwitch from "../../IconButtonSwitch";
import { Weapon } from "@/app/types/weapon";
import Loader from "../../Loader";
import axios from "axios";
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

    useEffect(()=>{
        receiveWeaponStats(WeaponData[0])
    }, [])

    const receiveWeaponStats = async (data: any) => {
        try {
            setLoading(true)
            const res = await axios.get<Weapon[]>(`https://genshin-db-api.vercel.app/api/v5/stats?folder=weapons&query=${data.name}`);
            const updatedActive = { ...data, stats: res.data };
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
                const parsedEffect = parseColorTags(updatedActive.effectTemplateRaw);
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

    return (
        <>
            <section className="flex flex-col gap-8">
                <div className="flex w-full justify-around gap-2 flex-col md:flex-row">
                    <div className="flex gap-3 justify-center">
                        <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
                        <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
                        <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
                        <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
                        <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
                    </div>
                    <div className="flex gap-3 justify-center">
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 1 ? 0 : 1) }} index={1} active={activeRarity} className="text-gray-600" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 2 ? 0 : 2) }} index={2} active={activeRarity} className="text-green-600" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 3 ? 0 : 3) }} index={3} active={activeRarity} className="text-blue-600" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 4 ? 0 : 4) }} index={4} active={activeRarity} className="text-purple-600" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 5 ? 0 : 5) }} index={5} active={activeRarity} className="text-yellow-600" />
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="grid-auto-fit-200 overflow-y-scroll p-2 max-h-[90dvh] ">
                        {WeaponData.map((weapon: any, index: number) => {
                            const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];
                            const weaponRarity = [true, 1, 2, 3, 4, 5];
                            const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === weapon.weaponText;
                            const validRarity = activeRarity === 0 || weaponRarity[activeRarity] === weapon.rarity;
                            if (validWeapon && validRarity) return <div key={index} className="">
                                <div className={`flex w-full flex-col cursor-pointer items-center hover:scale-[103%] hover:shadow-light transition-all rounded-lg bg-[#efeeee] ${active && active.id == weapon.id && "shadow-light scale-[103%]"}`} onClick={() => { setActive(weapon); receiveWeaponStats(weapon) }}>
                                    <Image src={`https://enka.network/ui/${weapon.images.filename_icon}.png`} width={250} height={250} alt={`${weapon.name} weaapon icon`} className={`bg-gradient-to-br ${weapon.rarity === 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : weapon.rarity === 4 ? "from-gradient-SR-start to-gradient-SR-end" : weapon.rarity === 3 ? "from-gradient-R-start to-gradient-R-end" : weapon.rarity === 2 ? "from-gradient-UC-start to-gradient-UC-end" : "from-gradient-C-start to-gradient-C-end"} rounded-t-lg w-full h-full rounded-br-4xl object-cover bg-gradient-to-br`} title={`${weapon.name}`} />
                                    <p className="flex flex-col min-h-9 justify-around mx-1 text-center text-xs md:text-md text-bg font-bold">{weapon.name}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="order-first lg:order-last">
                        {loading ?
                            <div>
                                <Loader />
                            </div> :
                            active ? <>
                                <div className="flex flex-col relative bg-[#e9e9e9] rounded-xl ">
                                    <div className={`max-h-56 rounded-t-xl bg-gradient-to-br ${active.rarity === 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : active.rarity === 4 ? "from-gradient-SR-start to-gradient-SR-end" : active.rarity === 3 ? "from-gradient-R-start to-gradient-R-end" : active.rarity === 2 ? "from-gradient-UC-start to-gradient-UC-end" : "from-gradient-C-start to-gradient-C-end"} flex justify-between `}>
                                        {active.stats && <div className="p-4 w-full drop-shadow-text">
                                            <p className="text-nowrap font-bold" >{active.weaponText}</p>
                                            <p className="text-nowrap font-bold text-xl" >Base ATK</p>
                                            <p className="text-2xl">{active.stats[active.level].attack.toFixed()}</p>
                                            {active.rarity >= 3 &&
                                                <>
                                                    <p className="text-nowrap font-bold text-xl" >{active.mainStatText}</p>
                                                    {percentage ? <p className="text-2xl">{active.stats[active.level].specialized.toFixed(1) * 100}%</p> : <p className="text-2xl">{active.stats[active.level].specialized.toFixed(1)}</p>}
                                                </>
                                            }
                                        </div>}
                                        <Image src={`https://enka.network/ui/${active.images.filename_icon}.png`} width={500} height={500} alt={`${active.name} weapon icon`} className={`object-contain`} />
                                    </div>
                                    <div className="text-bg p-4 flex flex-col gap-2">
                                        <div className="flex w-full gap-2 text-pretty">
                                            <p className="text-nowrap">Level {active.level}</p>
                                            <input
                                                type="range"
                                                min={1}
                                                max={active.rarity >= 3 ? 90 : 70}
                                                value={level}
                                                onChange={(event) => { setLevel(parseInt(event.target.value)), setActive(({ ...active, level: parseInt(event.target.value) })) }}
                                                className="w-full accent-primary"
                                            />
                                        </div>
                                        <h2 className="font-bold text-xl">{active.name}</h2>
                                        <div className="flex flex-col">
                                            <div className="flex gap-5">
                                                <p className="font-bold">{active.effectName}</p>
                                                {active.rarity >= 3 && <>
                                                    <div className={`${refinement == 1 ? "bg-bg-darkest" : "bg-bg-light"} px-2 rounded-xl hover:bg-bg-darkest cursor-pointer transition-all`} onClick={() => { setRefinement(1) }}>
                                                        <p className="text-white" >R1</p>
                                                    </div>
                                                    <div className={`${refinement == 2 ? "bg-bg-darkest" : "bg-bg-light"} px-2 rounded-xl hover:bg-bg-darkest cursor-pointer transition-all`} onClick={() => { setRefinement(2) }}>
                                                        <p className="text-white" >R2</p>
                                                    </div>
                                                    <div className={`${refinement == 3 ? "bg-bg-darkest" : "bg-bg-light"} px-2 rounded-xl hover:bg-bg-darkest cursor-pointer transition-all`} onClick={() => { setRefinement(3) }}>
                                                        <p className="text-white" >R3</p>
                                                    </div>
                                                    <div className={`${refinement == 4 ? "bg-bg-darkest" : "bg-bg-light"} px-2 rounded-xl hover:bg-bg-darkest cursor-pointer transition-all`} onClick={() => { setRefinement(4) }}>
                                                        <p className="text-white" >R4</p>
                                                    </div>
                                                    <div className={`${refinement == 5 ? "bg-bg-darkest" : "bg-bg-light"} px-2 rounded-xl hover:bg-bg-darkest cursor-pointer transition-all`} onClick={() => { setRefinement(5) }}>
                                                        <p className="text-white" >R5</p>
                                                    </div>
                                                </>}
                                            </div>
                                            {active.rarity >= 3 && (
                                                <p>{active[`r${refinement}`].description}</p>
                                            )}
                                        </div>
                                        {active.parsedDescription && <p className="italic text-sm">{parse(active.parsedDescription)}</p>}
                                    </div>
                                </div>
                            </>
                                :
                                <div>
                                    <Loader />
                                </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}