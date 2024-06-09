"use client"
import Image from "next/image"
import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Link from "next/link";
import StatsModal from "../StatExplainationModal";
import { AnimatePresence } from "framer-motion";
import { ProfileCardGrid, ProfileCardWide } from "../ProfileCard";
import { User, Characters } from "@/app/types/user";
export default function Profile({ user }: { user: User }) {

    useEffect(() => {
        document.title = `${user.player.username} - Tenryou`
    }, [])
    
    const [newUser, setNewUser] = useState<any>({
        uid: user.uid
    });
    const handleChange = (event: any) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [activeCharacter, setActiveCharacter] = useState<Characters>(user.characters[0]);
    const [artifactSet, setArtifactSet] = useState<any[]>([])
    const [namecardsHover, setNamecardsHover] = useState<boolean>(false);
    const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
    useEffect(() => {
        const artifactNames = activeCharacter.equipment.artifacts.map((artifact: any) => artifact.setName);
        const artifactSetCounts = artifactNames.reduce((accumlator: any, currentVal: number) => {
            accumlator[currentVal] = (accumlator[currentVal] || 0) + 1;
            return accumlator;
        }, {});
        const artifactSetArray = Object.entries(artifactSetCounts).map(([setName, count]) => ({ name: setName, count }));
        setArtifactSet(artifactSetArray);
    }, [activeCharacter.equipment.artifacts]);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-2 lg:items-center">
                <div className="flex flex-col md:flex-row gap-2">
                    {user.player.profilePicture ? <Image src={`https://enka.network/ui/${user.player.profilePicture.assets.icon}.png`} width={175} height={50} alt={`${user.player.username} player icon`} title={`${user.player.username}`} className="bg-bg-darker h-min p-2 rounded-xl" /> :
                        <Image src={'/icon.svg'} width={175} height={50} alt={`${user.player.username} player icon`} title={`${user.player.username}`} className="bg-bg-darker p-2 rounded-xl h-48" />}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl text-primary font-bold">
                            {user.player.username}
                        </h1>
                        <div className="flex gap-2 font-semibold text-lg">
                            <p className="">AR {user.player.levels.rank}</p>
                            <p className="">WL {user.player.levels.world}</p>
                        </div>
                        <p className="">{user.player.signature}</p>
                        <div className="flex flex-row gap-2 w-full">
                            <span className="flex gap-1">
                                <Image src={"/stats/achievements.png"} width={35} height={35} alt="Achievements Icon" className="w-8 h-8" />
                                <p className="flex gap-1"><span className="hidden md:flex">Achievements:</span> {user.player.achievements}</p>
                            </span>
                            <span className="flex gap-1">
                                <Image src={"/stats/abyss.png"} width={35} height={35} alt="Abyss Icon" className="w-8 h-8" />
                                <p className=" flex gap-1"><span className="hidden md:block">Abyss:</span> {user.player.abyss.floor}-{user.player.abyss.chamber}</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Image src={"/icons/grid.svg"} width={25} height={25} alt="Open Namecards" title="Open Namecards" onClick={() => { setNamecardsHover(!namecardsHover) }} onMouseEnter={() => { setNamecardsHover(true) }} onMouseLeave={() => { setNamecardsHover(false) }} />
                    {namecardsHover &&
                        <div className="absolute grid grid-cols-3 bg-bg w-96 z-[100] rounded-xl p-2" onMouseEnter={() => { setNamecardsHover(true) }} onMouseLeave={() => { setNamecardsHover(false) }}>
                            {user.player.namecardsList.map((namecard: any, index: number) => {
                                return <div key={index} className="">
                                    <Image src={`https://enka.network/ui/${namecard.assets.icon}.png`} width={250} height={250} className="w-28" alt={`${namecard.name} namecard picture`} title={namecard.name} />
                                </div>
                            })}
                        </div>
                    }
                    <AnimatePresence>
                        <StatsModal exit={() => { setShowStatsModal(!showStatsModal) }} visible={showStatsModal} />
                    </AnimatePresence>
                </div>
                <div className="flex flex-col">
                    <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                        <input type="number" name="uid" required onChange={() => { }} value={newUser.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                        <Link href={`/users/${newUser.uid}`}>
                            <button className={`hover:bg-bg-dark p-2 rounded-xl transition-all border-2`} type="submit">Search</button>
                        </Link>
                    </form>
                    <p className="hover:text-primary transition-all cursor-pointer" onClick={() => { setShowStatsModal(!showStatsModal) }}>Stats Explanation</p>
                </div>
            </div>
            {user.characters && <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full self-center">
                {user.characters.map((character: Characters, index: number) => {
                    return <div className={`flex relative overflow-hidden rounded-xl group cursor-pointer hover:-translate-y-1 transition-all ${activeCharacter.name == character.name && "shadow-light"}`} key={index} onClick={() => {
                        setActiveCharacter(character);
                    }}>

                        {character.name === "Yae Miko" ?
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}1_P.png`} width={2000} height={500} alt={`${character.name} constellation`} className="absolute object-cover w-full h-full bottom-0 rounded-xl" />
                            :
                            (character.name === "Traveler") ?
                                <Image src={`/namecards/UI_NameCardPic_Ysxf4_P.png`} width={2000} height={500} alt={`${character.name} constellation`} className="absolute object-cover w-full h-full bottom-0 rounded-xl" />
                                :
                                <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}_P.png`} width={2000} height={500} alt={`${character.name} constellation`} className="absolute object-cover w-full h-full bottom-0 rounded-xl" />
                        }

                        <div className="z-50 p-2 flex gap-2 drop-shadow-text">
                            <div className="bg-bg bg-opacity-20 rounded-xl p-2 ">
                                <Image src={`https://enka.network/ui/${character.assets.icon}.png`} width={100} height={50} alt={`${character.name}`} title={`${character.name} icon`} className="w-full transition-all max-h-32" />
                            </div>
                            <div className="flex flex-col gap-1 justify-between ">
                                <div className="flex gap-2">
                                    <h2 className="text-xl font-bold">{character.name}</h2>
                                    <span className="flex items-center px-2 font-bold bg-bg rounded-xl">
                                        C{character.constellationsList.filter((constellation: any) => constellation !== undefined).length}
                                    </span>

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
                                        <div className="w-full justify-center flex items-center">

                                            <p className="-mt-2">{character.skills.normalAttacks.level}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Image src={`https://enka.network/ui/${character.skills.elementalSkill.assets.icon}.png`} width={250} height={250} alt={`${character.skills.elementalSkill.name}`} className={`w-12 bg-bg-dark rounded-full bg-opacity-70 p-1`} />
                                        <div className="w-full justify-center flex items-center">
                                            {character.constellationsList[2] != undefined ?
                                                <p className="-mt-2 text-green-600">{character.skills.elementalSkill.level + 3}</p> :
                                                <p className="-mt-2 ">{character.skills.elementalSkill.level}</p>
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

                            </div>
                        </div>

                    </div>
                })}
            </section>}

            {loading
                ?
                <div className="h-[50dvh]">
                    <Loader />
                </div>
                :
                <>
                    <ProfileCardWide user={user} activeCharacter={activeCharacter} artifactSet={artifactSet} toggleShowStatsModal={() => { setShowStatsModal(!showStatsModal) }} />
                </>
            }
            {loading ?
                <div className="h-[50dvh]">
                    <Loader />
                </div>
                :
                <ProfileCardGrid user={user} />
            }
            <div className="from-gradient-Pyro-start to-gradient-Pyro-end from-gradient-Electro-start to-gradient-Electro-end from-gradient-Cryo-start to-gradient-Cryo-end from-gradient-Hydro-start to-gradient-Hydro-end from-gradient-Dendro-start to-gradient-Dendro-end from-gradient-Anemo-start to-gradient-Anemo-end from-gradient-Geo-start to-gradient-Geo-end"></div>
        </div>
    )
}

