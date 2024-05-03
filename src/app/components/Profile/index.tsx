import Image from "next/image"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import Loader from "../Loader";
export default function Profile({ user }: { user: any }) {

    const propertyGroups = {
        flat: ['FIGHT_PROP_HP', 'FIGHT_PROP_ATTACK', 'FIGHT_PROP_DEFENSE', 'FIGHT_PROP_ELEMENT_MASTERY', "FIGHT_PROP_BASE_ATTACK"],
        percent: ['FIGHT_PROP_HP_PERCENT', 'FIGHT_PROP_ATTACK_PERCENT', 'FIGHT_PROP_DEFENSE_PERCENT', 'FIGHT_PROP_CRITICAL', 'FIGHT_PROP_CRITICAL_HURT', 'FIGHT_PROP_CHARGE_EFFICIENCY', 'FIGHT_PROP_HEAL_ADD',],
        damageBonuses: ['FIGHT_PROP_PHYSICAL_ADD_HURT', 'FIGHT_PROP_FIRE_ADD_HURT', 'FIGHT_PROP_ELEC_ADD_HURT', 'FIGHT_PROP_WATER_ADD_HURT', 'FIGHT_PROP_WIND_ADD_HURT', 'FIGHT_PROP_ICE_ADD_HURT', 'FIGHT_PROP_ROCK_ADD_HURT', 'FIGHT_PROP_GRASS_ADD_HURT']
    };

    function isPropertyFlat(property: string) {
        return propertyGroups.flat.includes(property);
    }
    function isPropertyDamageBonus(property: string) {
        return propertyGroups.damageBonuses.includes(property);
    }
    function isAttackStat(property: string) {
        return (
            (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_ATTACK') ||
            (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_ATTACK_PERCENT') ||
            (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_BASE_ATTACK')
        );
    }
    function isDefenseStat(property: string) {
        return (
            (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_DEFENSE') ||
            (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_DEFENSE_PERCENT')
        );
    }
    function isHPStat(property: string) {
        return (
            (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_HP') ||
            (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_HP_PERCENT')
        );
    }
    const [newUser, setNewUser] = useState<any>({
        uid: ''
    });
    const router = useRouter();
    const handleChange = (event: any) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [activeHover, setActiveHover] = useState<string>("");
    const [artifactNames, setArtifactNames] = useState<string[]>(["", "", "", "", ""])
    const [activeCharacter, setActiveCharacter] = useState<any>(user.characters[0]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            router.push(`/user/${user.uid}`)
        }
        catch (error) {
            console.log(error)
        }
    }
    const [artifactSet, setArtifactSet] = useState<any[]>([])
    useEffect(() => {
        const artifactNames = activeCharacter.equipment.artifacts.map((artifact: any) => artifact.setName);

        const artifactSetCounts = artifactNames.reduce((accumlator: any, currentVal: number) => {
            accumlator[currentVal] = (accumlator[currentVal] || 0) + 1;
            return accumlator;
        }, {});

        // Convert the object into an array of objects
        const artifactSetArray = Object.entries(artifactSetCounts).map(([setName, count]) => ({ name: setName, count }));

        setArtifactSet(artifactSetArray);
    }, [activeCharacter.equipment.artifacts]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between items-start gap-2 md:items-center md:p-2 p-0">
                <div className="flex gap-2">
                    <Image src={`https://enka.network/ui/${user.player.profilePicture.assets.icon}.png`} width={150} height={50} alt={`${user.player}`} title={`${user.player}`} className="bg-bg-darker p-2" />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl text-primary font-bold">
                            {user.player.username}
                        </h1>
                        <div className="flex gap-2">
                            <p className="">AR {user.player.levels.rank}</p>
                            <p className="">WL {user.player.levels.world}</p>
                        </div>
                        <p className="">{user.player.signature}</p>
                    </div>
                </div>
                <button onClick={() => { console.log(activeCharacter) }}>CONSOLE</button>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <span className="flex gap-1">
                            <Image src={"/stats/achievements.png"} width={50} height={50} alt="Achievements Icon" className="w-8 h-full" />
                            <p className="">Achievements: {user.player.achievements}</p>
                        </span>
                        <span className="flex gap-1">

                            <Image src={"/stats/abyss.png"} width={50} height={50} alt="Abyss Icon" className="w-8 h-full" />
                            <p className="">Abyss: {user.player.abyss.floor}-{user.player.abyss.chamber}</p>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                        <input type="number" name="uid" required onChange={() => { }} value={newUser.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                        <button className="" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full self-center">
                {user.characters.map((character: any, index: number) => {
                    return <div className={`flex relative overflow-hidden rounded-xl group cursor-pointer hover:-translate-y-1 transition-all ${activeCharacter.name == character.name && "shadow-light"}`} key={index} onClick={() => {
                        setLoading(true);
                        setActiveCharacter(character);
                        setTimeout(() => {
                            setLoading(false);
                        }, 10)
                    }}>
                        <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}_P.png`} width={1500} height={1500} alt="" className="absolute object-cover bottom-0 rounded-xl" />
                        <div className="z-50 p-2 flex gap-2 drop-shadow-text">
                            <div className="bg-bg bg-opacity-20 rounded-xl p-2 ">
                                <Image src={`https://enka.network/ui/${character.assets.icon}.png`} width={100} height={50} alt={`${character.name}`} title={`${character.name}`} className="w-full transition-all " />
                            </div>
                            <div className="flex flex-col gap-1 justify-between">
                                <div className="flex gap-2">
                                    <h2 className="text-3xl font-bold">{character.name}</h2>
                                    <span className="flex items-center px-2 font-bold bg-bg rounded-xl">C{character.constellationsList.filter((constellation: any) => constellation !== undefined).length}</span>
                                </div>
                                <div className="flex gap-2 font-semibold">
                                    <div className="">Lv. {character.properties.level.val}/{character.maxLevel}</div>
                                    <div className="flex gap-2">
                                        <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-5`} />{character.friendship.level}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="">
                                        <Image src={`https://enka.network/ui/${character.skills.normalAttacks.assets.icon}.png`} width={250} height={250} alt={`${character.skills.normalAttacks.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="flex">
                                            <p className="-mt-2 ml-2 pl-2 pr-2">{character.skills.normalAttacks.level}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Image src={`https://enka.network/ui/${character.skills.elementalSkill.assets.icon}.png`} width={250} height={250} alt={`${character.skills.elementalSkill.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="flex">
                                            <p className="-mt-2 ml-2 pl-2 pr-2">{character.skills.elementalBurst.level}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Image src={`https://enka.network/ui/${character.skills.elementalBurst.assets.icon}.png`} width={250} height={250} alt={`${character.skills.elementalBurst.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="flex">
                                            <p className="-mt-2 ml-2 pl-2 pr-2">{character.skills.elementalBurst.level}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                })}
            </section>
            <div className="from-gradient-Pyro-start to-gradient-Pyro-end  from-gradient-Electro-start to-gradient-Electro-end from-gradient-Cryo-start to-gradient-Cryo-end from-gradient-Hydro-start to-gradient-Hydro-end from-gradient-Dendro-start to-gradient-Dendro-end from-gradient-Anemo-start to-gradient-Anemo-end from-gradient-Geo-start to-gradient-Geo-end"></div>
            {loading
                ?
                <div className="h-[50dvh]">
                    <Loader />
                </div>
                :
                <div className={`grid md:grid-cols-2 md:auto-cols-[400px] max-w-7xl p-2 rounded-xl self-center bg-gradient-to-br from-gradient-${activeCharacter.element}-start to-gradient-${activeCharacter.element}-end`}>
                    <div className="w-full h-full relative drop-shadow-text">
                        <div className="flex flex-col absolute p-4 w-full h-full">
                            <div className="flex gap-2 items-center">
                                <h2 className="text-3xl font-semibold">
                                    {activeCharacter.name}
                                </h2>
                                <h3 className="text-2xl">
                                    - {user.player.username}
                                </h3>
                            </div>
                            <p className="flex gap-2 font-semibold">
                                Lv.{activeCharacter.properties.level.val}/{activeCharacter.maxLevel}
                            </p>
                            <div className="flex gap-2 font-semibold">
                                <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-6`} />{activeCharacter.friendship.level}
                            </div>
                            <div className="absolute right-2 bottom-20 flex flex-col justify-between">
                                <div className="">
                                    {activeCharacter.assets.constellations.map((constellation: any, index: number) => {
                                        return <div key={index} className="relative w-12 h-12">
                                            <Image src={`/stats/Constellation.svg`} width={250} height={250} alt={`${constellation}`} className={`w-full z-10`} />
                                            <Image src={`https://enka.network/ui/${constellation}.png`} width={250} height={250} alt={`${constellation}`} className={`absolute ${activeCharacter.constellationsList[index] == undefined && "brightness-50"} top-0 left-0 mt-[11px] ml-[10px] w-7 h-7 z-20`} />
                                            {activeCharacter.constellationsList[index] === undefined &&
                                                <Image src={`/stats/lock.svg`} width={250} height={250} alt={`${constellation}`} className={`absolute top-0 left-0 mt-[14px] ml-[14px] w-5 h-5 z-20`} />
                                            }
                                        </div>
                                    })}
                                </div>

                            </div>
                            <div className="absolute flex bottom-0 right-4 gap-3 font-semibold">
                                <div className="">
                                    <Image src={`https://enka.network/ui/${activeCharacter.skills.normalAttacks.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.normalAttacks.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                    <div className="flex">
                                        <p className="-mt-2 ml-[20px] pr-2">{activeCharacter.skills.normalAttacks.level}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <Image src={`https://enka.network/ui/${activeCharacter.skills.elementalSkill.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.elementalSkill.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                    <div className="flex">
                                        {activeCharacter.constellationsList[2] != undefined ?
                                            <p className="-mt-2 ml-[20px] pr-2 text-green-600">{activeCharacter.skills.elementalBurst.level + 3}</p> :
                                            <p className="-mt-2 ml-[20px] pr-2">{activeCharacter.skills.elementalBurst.level}</p>
                                        }
                                    </div>
                                </div>
                                <div className="">
                                    <Image src={`https://enka.network/ui/${activeCharacter.skills.elementalBurst.assets.icon}.png`} width={250} height={250} alt={`${activeCharacter.skills.elementalBurst.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                    <div className="flex">
                                        {activeCharacter.constellationsList[4] != undefined ?
                                            <p className="-mt-2 ml-[20px] pr-2 text-green-600">{activeCharacter.skills.elementalBurst.level + 3}</p> :
                                            <p className="-mt-2 ml-[20px] pr-2">{activeCharacter.skills.elementalBurst.level}</p>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Image src={`https://enka.network/ui/${activeCharacter.assets.gachaIcon}.png`} width={2500} height={2500} alt={`${activeCharacter.name}`} title={`${activeCharacter.name}`} className="bg-bg bg-opacity-40 rounded-xl object-cover h-full" />
                    </div>
                    <div className="p-4 flex flex-col gap-2 drop-shadow-text">
                        <div className="flex flex-col">
                            <div className="flex md:flex-row flex-col w-full gap-2">
                                <Image src={`https://enka.network/ui/${activeCharacter.equipment.weapon.assets.awakenIcon}.png`} width={250} height={250} className="p-2 w-28 bg-bg bg-opacity-75 rounded-xl" alt={activeCharacter.equipment.weapon.name} />
                                <div className="flex flex-col gap-1">
                                    <div className="font-bold text-2xl">{activeCharacter.equipment.weapon.name}</div>
                                    <div className="flex gap-4">{activeCharacter.equipment.weapon.weaponStats.map((stat: any, index: number) => {
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
                                <div className="">
                                    {artifactSet.map((set: any, index: number) => {
                                        if (set.count >= 2) return <div key={index} className="font-bold text-green-600">
                                            <p>{set.name} x<span>{set.count <= 3 ? 2 : 4}</span></p>
                                        </div>
                                    })}
                                    {/* {Object.entries(artifactSet).map((artifact:any, index:number) => {
                                        if(artifact[0] >= 2) return <div key={index}>
                                            <p>{artifact[0]}x {artifact[1].setName}</p>
                                            
                                        </div>
                                    })} */}

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
                                        <span className="text-green-600">
                                            +{activeCharacter.stats.maxHp.value.toFixed() - activeCharacter.stats.baseHp.value.toFixed()}
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
                                        <span className="text-green-600">
                                            +{activeCharacter.stats.atk.value.toFixed() - activeCharacter.stats.baseAtk.value.toFixed()}
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
                                        <span className="text-green-600">
                                            +{activeCharacter.stats.def.value.toFixed() - activeCharacter.stats.baseDef.value.toFixed()}
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
                                        {activeCharacter.stats.elementalMastery.value.toFixed()}
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
                            <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "ELEMENT" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("ELEMENT") }} onMouseLeave={() => { setActiveHover("") }}>
                                <div className={`flex gap-2`} >
                                    <Image src={`/elements/${activeCharacter.element}.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                    <span>{activeCharacter.element} DMG Bonus</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xl">
                                        {(activeCharacter.stats.pyroDamageBonus.value * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-2 grid grid-cols-2 lg:grid-cols-5 gap-2 place-items-center">
                        {activeCharacter.equipment.artifacts.map((artifact: any, index: number) => {
                            const isAttackBonus = isAttackStat(artifact.mainstat.stat);
                            const isDefenseBonus = isDefenseStat(artifact.mainstat.stat);
                            const isHpBonus = isHPStat(artifact.mainstat.stat);
                            const isDamageBonus = isPropertyDamageBonus(artifact.mainstat.stat);
                            const propertyType = isPropertyFlat(artifact.mainstat.stat);

                            return <div key={index} className="relative w-full grid grid-cols-2 bg-bg bg-opacity-75 rounded-xl p-2 justify-between items-center">
                                <Image src={`https://enka.network/ui/${artifact.icon}.png`} width={100} height={100} alt={`${artifact.name} icon`} className="object-contain " />
                                <div className={`flex text-xl gap-2 font-bold p-2 rounded-xl bg-opacity-75
                            ${isAttackBonus && activeHover == "ATK" && "bg-bg-dark"}
                            ${isDefenseBonus && activeHover == "DEF" && "bg-bg-dark"}
                            ${isHpBonus && activeHover == "HP" && "bg-bg-dark"}
                            ${isDamageBonus && activeHover == "ELEMENT" && "bg-bg-dark"}
                            ${!isAttackBonus && !isDefenseBonus && !isHpBonus && !isDamageBonus && activeHover == artifact.mainstat.stat && "bg-bg-dark"}
                            `} onMouseEnter={() => {
                                        if (isAttackBonus) setActiveHover("ATK")
                                        else if (isDefenseBonus) setActiveHover("DEF")
                                        else if (isHpBonus) setActiveHover("HP")
                                        else if (isDamageBonus) setActiveHover("ELEMENT")
                                        else setActiveHover(artifact.mainstat.stat)
                                    }}
                                    onMouseLeave={() => { setActiveHover("") }}
                                >
                                    {!isDamageBonus ?
                                        <Image src={`/stats/${artifact.mainstat.stat}.svg`} width={32} height={32} alt={artifact.mainstat.stat} className="" />
                                        : //{active[`r${refinement}`].description
                                        <Image src={`/elements/${activeCharacter.element}.svg`} width={32} height={32} alt={artifact.mainstat.stat} className="" />
                                    }

                                    {artifact.mainstat.statValue}{!propertyType && "%"}

                                </div>
                                <div className="grid grid-cols-2 gap-4 col-span-2 place-items-start font-bold">
                                    {artifact.substats.map((stat: any, index: number) => {
                                        const isAttackBonus = isAttackStat(stat.stat);
                                        const isDefenseBonus = isDefenseStat(stat.stat);
                                        const isHpBonus = isHPStat(stat.stat);
                                        const propertyType = isPropertyFlat(stat.stat);
                                        return <div className={`flex gap-2 p-2 w-full bg-opacity-75
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
                                                <Image src={`/stats/${stat.stat}.svg`} width={16} height={16} alt={stat.stat} className="" />
                                                :
                                                <Image src={`/stats/${stat.stat}.svg`} width={16} height={16} alt={stat.stat} className="" />
                                            }
                                            +{stat.statValue}{!propertyType && "%"}
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            }

            <Footer />
        </div>
    )
}