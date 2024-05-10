import Image from "next/image"
import React, { useState, useEffect, } from "react";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { FaStar } from "react-icons/fa6";
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
    const [activeCharacter, setActiveCharacter] = useState<any>(user.characters[0]);
    const [artifactSet, setArtifactSet] = useState<any[]>([])
    const [namecardsHover, setNamecardsHover] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            router.push(`/user/${user.uid}`)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const artifactNames = activeCharacter.reliquaries.map((artifact: any) => artifact.setName);
        const artifactSetCounts = artifactNames.reduce((accumlator: any, currentVal: number) => {
            accumlator[currentVal] = (accumlator[currentVal] || 0) + 1;
            return accumlator;
        }, {});
        const artifactSetArray = Object.entries(artifactSetCounts).map(([setName, count]) => ({ name: setName, count }));
        setArtifactSet(artifactSetArray);
    }, [activeCharacter.reliquaries]);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-2 lg:items-center md:p-2 p-0">
                <div className="flex flex-col md:flex-row gap-2">
                    {user.player.profilePicture ? <Image src={user.player.profilePicture.icon} width={175} height={50} alt={`${user.player.nickname} player icon`} title={`${user.player.nickname}`} className="bg-bg-darker p-2 rounded-xl" /> :
                        <Image src={'/icon.svg'} width={175} height={50} alt={`${user.player.nickname} player icon`} title={`${user.player.nickname}`} className="bg-bg-darker p-2 rounded-xl h-48" />}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl text-primary font-bold">
                            {user.player.nickname}
                        </h1>
                        <div className="flex gap-2">
                            <p className="">AR {user.player.level}</p>
                            <p className="">WL {user.player.worldLevel}</p>
                        </div>
                        <p className="">{user.player.signature}</p>
                        <div className="flex flex-row gap-2 flex-nowrap">
                            <span className="flex gap-1">
                                <Image src={"/stats/achievements.png"} width={35} height={35} alt="Achievements Icon" className="w-8 h-8" />
                                <p className="whitespace-nowrap"><span className="hidden md:flex">Achievements:</span> {user.player.achievements}</p>
                            </span>
                            <span className="flex gap-1">
                                <Image src={"/stats/abyss.png"} width={35} height={35} alt="Abyss Icon" className="w-8 h-8" />
                                <p className="whitespace-nowrap"><span className="hidden md:flex">Abyss:</span> {user.player.abyssFloor}-{user.player.abyssLevel}</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Image src={"/icons/grid.svg"} width={25} height={25} alt="Open Namecards" title="Open Namecards" onClick={() => { setNamecardsHover(!namecardsHover) }} onMouseEnter={() => { setNamecardsHover(true) }} onMouseLeave={() => { setNamecardsHover(false) }} />
                    {namecardsHover &&
                        <div className="absolute grid grid-cols-3 bg-bg w-96 z-[100] rounded-xl p-2" onMouseEnter={() => { setNamecardsHover(true) }} onMouseLeave={() => { setNamecardsHover(false) }}>
                            {user.player.nameCardsPreview.map((namecard: any, index: number) => {
                                return <div key={index} className="">
                                    <Image src={namecard.icon} width={250} height={250} className="w-28" alt={`${namecard.name} namecard picture`} title={namecard.name} />
                                </div>
                            })
                            }
                        </div>
                    }

                </div>
                <div className="flex flex-col">
                    <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                        <input type="number" name="uid" required onChange={() => { }} value={newUser.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                        <button className="" type="submit">Search</button>
                    </form>
                </div>
            </div>
            {user.characters && <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full self-center">
                {user.characters.map((character: any, index: number) => {
                    return <div className={`flex relative overflow-hidden rounded-xl group cursor-pointer hover:-translate-y-1 transition-all ${activeCharacter.name == character.name && "shadow-light"}`} key={index} onClick={() => {
                        setLoading(true);
                        setActiveCharacter(character);
                        setTimeout(() => {
                            setLoading(false);
                        }, 10)
                    }}>

                        {character.name == "Yae Miko" ?
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}1_P.png`} width={2000} height={500} alt={`${character.name} constellation`} className="absolute object-cover w-full h-full bottom-0 rounded-xl" /> :
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}_P.png`} width={2000} height={500} alt={`${character.name} constellation`} className="absolute object-cover w-full h-full bottom-0 rounded-xl" />
                        }

                        <div className="z-50 p-2 flex gap-2 drop-shadow-text">
                            <div className="bg-bg bg-opacity-30 rounded-xl p-2 ">
                                <Image src={character.icons.avatar} width={100} height={50} alt={`${character.name}`} title={`${character.name}`} className="w-full transition-all max-h-40" />
                            </div>
                            <div className="flex flex-col gap-1 justify-between ">
                                <div className="flex gap-2">
                                    <h2 className="text-xl font-bold">{character.name}</h2>
                                    <span className="flex items-center px-2 font-bold bg-bg rounded-xl">
                                        C{character.constellations.filter((constellation: any) => constellation.unlocked === true).length}
                                    </span>

                                </div>
                                <div className="flex gap-2 font-semibold">
                                    <div className="">Lv. {character.level}/{character.level}</div>
                                    <div className="flex gap-2">
                                        <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-5`} />{character.friendshipLevel}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="">
                                        <Image src={character.skills[0].icon} width={250} height={250} alt={`${character.skills[0].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            <p className="-mt-2">{character.skills[0].level}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Image src={character.skills[1].icon} width={250} height={250} alt={`${character.skills[1].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            <p className="-mt-2">{character.skills[1].level}</p>
                                        </div>
                                    </div>
                                    {character.skills[2] && <div className="">
                                        <Image src={character.skills[2].icon} width={250} height={250} alt={`${character.skills[2].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            <p className="-mt-2">{character.skills[2].level}</p>
                                        </div>
                                    </div>}
                                </div>

                            </div>
                        </div>

                    </div>
                })}
            </section>}

            <div className="from-gradient-Pyro-start to-gradient-Pyro-end  from-gradient-Electro-start to-gradient-Electro-end from-gradient-Cryo-start to-gradient-Cryo-end from-gradient-Hydro-start to-gradient-Hydro-end from-gradient-Dendro-start to-gradient-Dendro-end from-gradient-Anemo-start to-gradient-Anemo-end from-gradient-Geo-start to-gradient-Geo-end"></div>
            {loading
                ?
                <div className="h-[50dvh]">
                    <Loader />
                </div>
                :
                <div className="overflow-x-scroll 2xl:overflow-x-hidden grid place-items-center" id="wide_player_card">
                    <div className={`grid grid-cols-2 auto-cols-[400px] w-[1280px] max-7xl p-2 rounded-xl self-center bg-gradient-to-br from-gradient-${activeCharacter.element}-start to-gradient-${activeCharacter.element}-end`}>
                        <div className="w-full h-full relative drop-shadow-text min-h-[400px] col-span-1">
                            <div className="flex flex-col absolute p-5 w-full h-full">
                                <div className="flex gap-2 items-center">
                                    <h2 className="text-3xl font-semibold">
                                        {activeCharacter.name}
                                    </h2>
                                    <h3 className="text-2xl">
                                        - {user.player.nickname}
                                    </h3>
                                </div>
                                <p className="flex gap-2 font-semibold">
                                    Lv.{activeCharacter.level}/{activeCharacter.level}
                                </p>
                                <div className="flex gap-2 font-semibold">
                                    <Image src={`/stats/Friendship.svg`} width={250} height={250} alt={`Friendship Level`} className={`w-6`} />{activeCharacter.friendshipLevel}
                                </div>
                                <div className="absolute right-3 bottom-20 flex flex-col justify-between">
                                    {activeCharacter.constellations.map((constellation: any, index: number) => {
                                        return <div key={index} className="relative flex items-center w-12 h-12">
                                            <Image src={`/stats/Constellation.svg`} width={250} height={250} alt={`${constellation.name} background`} className={`w-full z-10`} />
                                            <Image src={constellation.icon} width={250} height={250} alt={`${constellation.name}`} className={`absolute ${!constellation.unlocked && "brightness-[35%]"} top-0 left-0 mt-[11px] ml-[10px] w-7 h-7 z-20`} />
                                            {!constellation.unlocked &&
                                                <Image src={`/stats/lock.svg`} width={250} height={250} alt={`${constellation.name}`} className={`absolute top-0 left-0 mt-[16px] ml-[16px] w-4 h-4 z-20`} />
                                            }
                                        </div>
                                    })}
                                </div>
                                <div className="absolute flex bottom-2 right-4 gap-3 font-semibold">
                                    <div className="">
                                        <Image src={activeCharacter.skills[0].icon} width={250} height={250} alt={`${activeCharacter.skills[0].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            <p className="-mt-2">{activeCharacter.skills[0].level}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Image src={activeCharacter.skills[1].icon} width={250} height={250} alt={`${activeCharacter.skills[1].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            {activeCharacter.skills[1].unlocked == true ?
                                                <p className="-mt-2 text-green-600">{activeCharacter.skills.elementalBurst.level + 3}</p> :
                                                <p className="-mt-2">{activeCharacter.skills[1].level}</p>
                                            }
                                        </div>
                                    </div>
                                    {activeCharacter.skills[2] && <div className="">
                                        <Image src={activeCharacter.skills[2].icon} width={250} height={250} alt={`${activeCharacter.skills[2].name} icon`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            {activeCharacter.skills[2].unlocked == true ?
                                                <p className="-mt-2 text-green-600">{activeCharacter.skills.elementalBurst.level + 3}</p> :
                                                <p className="-mt-2 ">{activeCharacter.skills[2].level}</p>
                                            }
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="p-2 w-full h-full">
                                <Image src={activeCharacter.icons.gacha} width={2500} height={2500} alt={`${activeCharacter.name}`} title={`${activeCharacter.name} gacha splash art`} className="bg-bg bg-opacity-40 rounded-xl object-cover h-full" />
                            </div>
                        </div>
                        <div className="p-2 flex flex-col gap-2 col-span-1 drop-shadow-text w-full">
                            <div className="flex flex-col w-full ">
                                <div className="flex w-full justify-between gap-2">
                                    <div className="flex  w-full gap-2">
                                        <div className="relative flex justify-center">
                                            <Image src={activeCharacter.weapon.icon} width={250} height={250} className=" w-28 h-full object-cover bg-bg bg-opacity-40 rounded-xl" alt={`${activeCharacter.weapon.name} weapon icon`} />
                                            <div className="flex absolute bottom-1 text-xl text-yellow-400">
                                                {[...Array(activeCharacter.weapon.rarity)].map((_, index) => (
                                                    <FaStar key={index} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 ">
                                            <div className="font-bold text-2xl">{activeCharacter.weapon.name}</div>
                                            <div className="flex gap-4">
                                                <div className={`flex p-2 rounded-xl gap-2 font-bold text-xl bg-opacity-75`}>
                                                    <Image src={`/stats/${activeCharacter.weapon.mainStat.appendPropId}.svg`} width={24} height={24} alt={activeCharacter.weapon.mainStat.appendPropId} className="" />
                                                    {activeCharacter.weapon.mainStat.statValue}
                                                </div>
                                                {activeCharacter.weapon.subStat && (
                                                    <>
                                                        {(() => {
                                                            const percentStat = isPropertyFlat(activeCharacter.weapon.subStat.appendPropId);
                                                            const isAttackBonus = isAttackStat(activeCharacter.weapon.subStat.appendPropId);
                                                            const isDefenseBonus = isDefenseStat(activeCharacter.weapon.subStat.appendPropId);
                                                            const isHpBonus = isHPStat(activeCharacter.weapon.subStat.appendPropId);
                                                            const isDamageBonus = isPropertyDamageBonus(activeCharacter.weapon.subStat.appendPropId);
                                                            let additionalClassName = "";

                                                            if (isAttackBonus && activeHover === "ATK") {
                                                                additionalClassName = "bg-bg";
                                                            } else if (isDefenseBonus && activeHover === "DEF") {
                                                                additionalClassName = "bg-bg";
                                                            } else if (isHpBonus && activeHover === "HP") {
                                                                additionalClassName = "bg-bg";
                                                            } else if (isDamageBonus && activeHover === "ELEMENT") {
                                                                additionalClassName = "bg-bg";
                                                            } else if (!isAttackBonus && !isDefenseBonus && !isHpBonus && !isDamageBonus && activeHover === activeCharacter.weapon.subStat.appendPropId) {
                                                                additionalClassName = "bg-bg";
                                                            }

                                                            return (
                                                                <div
                                                                    className={`flex p-2 rounded-xl gap-2 font-bold text-xl bg-opacity-75 ${additionalClassName}`}
                                                                    onMouseEnter={() => {
                                                                        if (isAttackBonus) setActiveHover("ATK");
                                                                        else if (isDefenseBonus) setActiveHover("DEF");
                                                                        else if (isHpBonus) setActiveHover("HP");
                                                                        else if (isDamageBonus) setActiveHover("ELEMENT");
                                                                        else setActiveHover(activeCharacter.weapon.subStat.appendPropId);
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setActiveHover("");
                                                                    }}
                                                                >
                                                                    <Image src={`/stats/${activeCharacter.weapon.subStat.appendPropId}.svg`} width={24} height={24} alt={activeCharacter.weapon.subStat.appendPropId} className="" />
                                                                    {activeCharacter.weapon.subStat.statValue}{!percentStat && "%"}
                                                                </div>
                                                            );
                                                        })()}
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex gap-2 font-bold">
                                                <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">Lv. {activeCharacter.weapon.level}/{activeCharacter.weapon.level}</div>
                                                <div className="p-2 bg-bg-light bg-opacity-75 rounded-xl">R{activeCharacter.weapon.improvement}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap flex-col ">
                                        {artifactSet.map((set: any, index: number) => {
                                            if (set.count >= 2) return <div key={index} className="font-bold text-sm text-green-600">
                                                <p className="text-nowrap">{set.name} x<span>{set.count <= 3 ? 2 : 4}</span></p>
                                            </div>
                                        })}
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
                                            {activeCharacter.stats.maxHp.toFixed()}&nbsp;
                                        </span>
                                        <span className="text-xs ">
                                            ({activeCharacter.stats.baseHP.toFixed()}&nbsp;
                                            <span className="text-green-600">
                                                +{activeCharacter.stats.maxHp.toFixed() - activeCharacter.stats.baseHP.toFixed()}
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
                                            {activeCharacter.stats.curAttack.toFixed()}&nbsp;
                                        </span>
                                        <span className="text-xs">
                                            ({activeCharacter.stats.baseAttack.toFixed()}&nbsp;
                                            <span className="text-green-600">
                                                +{activeCharacter.stats.curAttack.toFixed() - activeCharacter.stats.baseAttack.toFixed()}
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
                                            {activeCharacter.stats.curDefense.toFixed()}&nbsp;
                                        </span>
                                        <span className="text-xs">
                                            ({activeCharacter.stats.baseDefense.toFixed()}&nbsp;
                                            <span className="text-green-600">
                                                +{activeCharacter.stats.curDefense.toFixed() - activeCharacter.stats.curDefense.toFixed()}
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
                                            {activeCharacter.stats.elementMastery > 0 ? activeCharacter.stats.elementMastery.toFixed() : 0}
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
                                            {(activeCharacter.stats.critical * 100).toFixed(1)}%
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
                                            {(activeCharacter.stats.criticalHurt * 100).toFixed(1)}%
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
                                            {(activeCharacter.stats.chargeEfficiency * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                {((activeCharacter.stats.physicalAddHurt > 0) ||
                                    (activeCharacter.stats.elecAddHurt > 0) ||
                                    (activeCharacter.stats.fireAddHurt > 0) ||
                                    (activeCharacter.stats.iceAddHurt > 0) ||
                                    (activeCharacter.stats.waterAddHurt > 0) ||
                                    (activeCharacter.stats.windAddHurt > 0) ||
                                    (activeCharacter.stats.rockAddHurt > 0) ||
                                    (activeCharacter.stats.grassAddHurt > 0)) &&
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
                                        {((activeCharacter.stats.elecAddHurt > 0) ||
                                            (activeCharacter.stats.fireAddHurt > 0) ||
                                            (activeCharacter.stats.iceAddHurt > 0) ||
                                            (activeCharacter.stats.waterAddHurt > 0) ||
                                            (activeCharacter.stats.windAddHurt > 0) ||
                                            (activeCharacter.stats.rockAddHurt > 0) ||
                                            (activeCharacter.stats.grassAddHurt > 0)) &&
                                            <>
                                                <div className="flex gap-2">
                                                    <Image src={`/elements/${activeCharacter.element}.svg`} width={16} height={16} alt={"Elemental Dmg Icon"} className="grayscale brightness-200" />
                                                    <span>{activeCharacter.element} DMG Bonus</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-xl">
                                                        {activeCharacter.element === "Electro" && (activeCharacter.stats.elecAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Pyro" && (activeCharacter.stats.fireAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Cryo" && (activeCharacter.stats.iceAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Hydro" && (activeCharacter.stats.waterAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Anemo" && (activeCharacter.stats.windAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Geo" && (activeCharacter.stats.rockAddHurt * 100).toFixed(1)}
                                                        {activeCharacter.element === "Dendro" && (activeCharacter.stats.grassAddHurt * 100).toFixed(1)}
                                                        %
                                                    </span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                }

                                {Number(activeCharacter.stats.healAdd) > 0 &&
                                    <div className={`flex gap-2 items-center rounded-xl font-semibold transition-all bg-opacity-75 justify-between ${activeHover == "FIGHT_PROP_HEAL_ADD" && "bg-bg"} py-1 px-2`} onMouseEnter={() => { setActiveHover("FIGHT_PROP_HEAL_ADD") }} onMouseLeave={() => { setActiveHover("") }}>
                                        <div className={`flex gap-2`} >
                                            <Image src={`/stats/FIGHT_PROP_HEAL_ADD.svg`} width={16} height={16} alt={"ER stat icon"} className="" />
                                            <span>Healing Bonus</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xl">
                                                {(activeCharacter.stats.healAdd * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="w-full col-span-2 p-2 grid grid-cols-5 gap-2 place-items-center">
                            {activeCharacter.reliquaries.map((artifact: any, index: number) => {
                                const isAttackBonus = isAttackStat(artifact.mainStats.mainPropId);
                                const isDefenseBonus = isDefenseStat(artifact.mainStats.mainPropId);
                                const isHpBonus = isHPStat(artifact.mainStats.mainPropId);
                                const isDamageBonus = isPropertyDamageBonus(artifact.mainStats.mainPropId);
                                const propertyType = isPropertyFlat(artifact.mainStats.mainPropId);
                                // artifact.rollquality = Object.values(artifact.substatsRollQuality.reduce((acc: any, item: any) => {
                                //     if (!acc[item.type]) {
                                //         acc[item.type] = { ...item, rollQuality: [item.rollQuality] };
                                //     } else {
                                //         acc[item.type].rollQuality.push(item.rollQuality);
                                //     }
                                //     return acc;
                                // }, {}));
                                artifact.critValue = 0;
                                artifact.subStats.forEach((substat: any) => {
                                    if (substat.appendPropId === 'FIGHT_PROP_CRITICAL_HURT') {
                                        artifact.critValue += substat.statValue;
                                    }
                                    else if (substat.appendPropId === 'FIGHT_PROP_CRITICAL') {
                                        artifact.critValue += substat.statValue * 2;
                                    }
                                });
                                return <div key={index} className="relative w-full grid grid-cols-2 gap-2 bg-bg-dark bg-opacity-75 rounded-xl p-2 justify-between items-center">
                                    <div className="relative flex justify-center">
                                        <Image src={artifact.icon} title={artifact.name} width={100} height={100} alt={`${artifact.name} icon`} className="object-contain " />
                                        <div className="flex absolute bottom-0 text-yellow-400">
                                            {[...Array(artifact.rarity)].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col font-bold justify-center">
                                        <div className="flex justify-end" >
                                            <div>
                                                <p className="hover:bg-bg-dark bg-opacity-35 p-1 rounded-xl">
                                                    CV:&nbsp;
                                                    <span className={` ${artifact.critValue < 20 ? "text-red-500" :
                                                        artifact.critValue < 30 ? "text-orange-500" :
                                                            artifact.critValue < 40 ? "text-lime-500" :
                                                                artifact.critValue >= 40 ? "text-green-500" : ""
                                                        }`} title="Crit Rate + Crit Dmg*2">
                                                        {artifact.critValue.toFixed(1)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`flex text-xl gap-2 p-2 rounded-xl bg-opacity-75 ${isAttackBonus && activeHover == "ATK" && "bg-bg-dark"} ${isDefenseBonus && activeHover == "DEF" && "bg-bg-dark"} ${isHpBonus && activeHover == "HP" && "bg-bg-dark"} ${isDamageBonus && activeHover == "ELEMENT" && "bg-bg-dark"} ${!isAttackBonus && !isDefenseBonus && !isHpBonus && !isDamageBonus && activeHover == artifact.mainStats.mainPropId && "bg-bg-dark"}`} onMouseEnter={() => {
                                            if (isAttackBonus) setActiveHover("ATK")
                                            else if (isDefenseBonus) setActiveHover("DEF")
                                            else if (isHpBonus) setActiveHover("HP")
                                            else if (isDamageBonus) setActiveHover("ELEMENT")
                                            else setActiveHover(artifact.mainStats.mainPropId)
                                        }}
                                            onMouseLeave={() => { setActiveHover("") }}
                                        >
                                            {!isDamageBonus || artifact.mainStats.mainPropId === "FIGHT_PROP_PHYSICAL_ADD_HURT" ? (
                                                <Image src={`/stats/${artifact.mainStats.mainPropId}.svg`} width={32} height={32} alt={`${artifact.mainStats.mainPropId} ICON`} className="drop-shadow-icon" />
                                            ) : (
                                                <Image src={`/elements/${activeCharacter.element}.svg`} width={32} height={32} alt={`${artifact.mainStats.mainPropId} ICON`} className=" drop-shadow-icon" />
                                            )}
                                            {artifact.mainStats.statValue}{!propertyType && "%"}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 col-span-2 place-items-start font-bold">
                                        {artifact.subStats.map((stat: any, index: number) => {
                                            const isAttackBonus = isAttackStat(stat.appendPropId);
                                            const isDefenseBonus = isDefenseStat(stat.appendPropId);
                                            const isHpBonus = isHPStat(stat.appendPropId);
                                            const propertyType = isPropertyFlat(stat.appendPropId);
                                            return <div className={`flex gap-2 p-2 w-full bg-opacity-75 relative
                                    ${isAttackBonus && activeHover == "ATK" && "bg-bg-darkest"}
                                    ${isDefenseBonus && activeHover == "DEF" && "bg-bg-darkest"}
                                    ${isHpBonus && activeHover == "HP" && "bg-bg-darkest"}
                                    ${!isAttackBonus && !isDefenseBonus && !isHpBonus && activeHover == stat.appendPropId && "bg-bg-darkest"}
                                    transition-all rounded-xl`} key={index} onMouseEnter={() => {
                                                    if (isAttackBonus) setActiveHover("ATK")
                                                    else if (isDefenseBonus) setActiveHover("DEF")
                                                    else if (isHpBonus) setActiveHover("HP")
                                                    else setActiveHover(stat.appendPropId)
                                                }} onMouseLeave={() => { setActiveHover("") }}>
                                                {!propertyType ?
                                                    <Image src={`/stats/${stat.appendPropId}.svg`} width={16} height={16} alt={stat.appendPropId} className="drop-shadow-icon" />
                                                    :
                                                    <Image src={`/stats/${stat.appendPropId}.svg`} width={16} height={16} alt={stat.appendPropId} className="drop-shadow-icon" />
                                                }
                                                +{stat.statValue}{!propertyType && "%"}
                                                <div className="flex absolute items-center -bottom-2 gap-1 pointer-events-none ">
                                                    {/* {artifact.rollquality.map((roll: any, rollIndex: number) => {
                                                        if (roll.type === stat.stat) {
                                                            return roll.rollQuality.map((quality: number, qualityIndex: number) => (
                                                                <React.Fragment key={`${rollIndex}-${qualityIndex}`}>
                                                                    <span className={`${quality === 4 ? "font-bold text-xl" : quality === 3 ? "font-semibold text-lg" : quality === 2 ? "font-medium text-normal" : "text-sm"}`}>—</span>
                                                                </React.Fragment>
                                                            ));
                                                        }
                                                    })} */}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}