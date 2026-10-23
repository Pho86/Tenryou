"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react";
import StatsModal from "../StatExplainationModal";
import { ProfileCardGrid, ProfileCardWide } from "../ProfileCard";
import { User, Characters, ConstellationItem } from "@/app/types/user";
import UserSearchForm from "../UserSearchForm";
import NamecardsMenu from "./NamecardsMenu";
import { FaCircleInfo } from "react-icons/fa6";

export default function Profile({ user }: { user: User }) {

    useEffect(() => {
        document.title = `${user.player.username} - Tenryou`
    }, [user.player.username])

    const [activeCharacter, setActiveCharacter] = useState<Characters>(user.characters[0]);
    const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
    const artifactSet = useMemo(() => {
        const artifactNames = activeCharacter.equipment.artifacts.map((artifact) => artifact.setName);
        const artifactSetCounts = artifactNames.reduce<Record<string, number>>((accumlator, currentVal) => {
            accumlator[currentVal] = (accumlator[currentVal] || 0) + 1;
            return accumlator;
        }, {});
        return Object.entries(artifactSetCounts).map(([setName, count]) => ({ name: setName, count }));
    }, [activeCharacter.equipment.artifacts]);

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-6 rounded-2xl border border-bg-light/80 bg-bg-light/25 p-5 md:p-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 gap-4 sm:gap-5">
                    {user.player.profilePicture ? (
                        <Image
                            src={`https://enka.network/ui/${user.player.profilePicture.assets.icon}.png`}
                            width={96}
                            height={96}
                            sizes="96px"
                            alt={`${user.player.username} player icon`}
                            title={`${user.player.username}`}
                            className="h-24 w-24 shrink-0 rounded-2xl bg-bg-darker object-cover p-1"
                        />
                    ) : (
                        <Image
                            src="/icon.svg"
                            width={96}
                            height={96}
                            sizes="96px"
                            alt={`${user.player.username} player icon`}
                            title={`${user.player.username}`}
                            className="h-24 w-24 shrink-0 rounded-2xl bg-bg-darker object-contain p-1"
                        />
                    )}
                    <div className="flex min-w-0 flex-col gap-2">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h1 className="text-4xl font-bold text-primary md:text-5xl">
                                {user.player.username}
                            </h1>
                            <span className="text-sm font-semibold tabular-nums text-text/60">
                                UID {user.uid}
                            </span>
                        </div>
                        {user.player.signature && (
                            <p className="max-w-xl text-text/70">{user.player.signature}</p>
                        )}
                        <div className="mt-1 flex flex-wrap gap-2 text-sm font-semibold">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-bg-lighter bg-bg-dark/40 px-2.5 py-1.5">
                                <span className="text-text/55">AR</span>
                                <span>{user.player.levels.rank}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-bg-lighter bg-bg-dark/40 px-2.5 py-1.5">
                                <span className="text-text/55">WL</span>
                                <span>{user.player.levels.world}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-bg-lighter bg-bg-dark/40 px-2.5 py-1.5">
                                <Image src="/stats/achievements.png" width={20} height={20} alt="" aria-hidden="true" className="h-5 w-5" />
                                <span className="text-text/55">Achievements</span>
                                <span className="tabular-nums">{user.player.achievements}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-bg-lighter bg-bg-dark/40 px-2.5 py-1.5">
                                <Image src="/stats/abyss.png" width={20} height={20} alt="" aria-hidden="true" className="h-5 w-5" />
                                <span className="text-text/55">Abyss</span>
                                <span className="tabular-nums">{user.player.abyss.floor}-{user.player.abyss.chamber}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-3 lg:w-auto lg:items-end">
                    <UserSearchForm variant="compact" className="lg:w-72" />
                    <div className="flex flex-wrap items-center gap-2">
                        <NamecardsMenu namecards={user.player.namecardsList} />
                        <button
                            type="button"
                            onClick={() => { setShowStatsModal(true) }}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-bg-lighter bg-bg-light/40 px-3 text-sm font-semibold text-text transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                        >
                            <FaCircleInfo aria-hidden="true" />
                            Stats explanation
                        </button>
                    </div>
                </div>
            </header>
            <StatsModal exit={() => { setShowStatsModal(false) }} visible={showStatsModal} />

            {user.characters && (
                <section aria-labelledby="characters-heading" className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                            <h2 id="characters-heading" className="text-2xl font-bold">Characters</h2>
                            <p className="text-sm text-text/55">Select a character to preview their build card.</p>
                        </div>
                        <p className="text-sm font-semibold tabular-nums text-text/55">
                            {user.characters.length} showcased
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {user.characters.map((character: Characters, index: number) => {
                            const isActive = activeCharacter.name === character.name;
                            const constellationCount = character.constellationsList.filter((constellation: ConstellationItem) => constellation !== undefined).length;
                            const characterSkills = [
                                { skill: character.skills.normalAttacks, bonus: 0 },
                                { skill: character.skills.elementalSkill, bonus: character.constellationsList[2] != undefined ? 3 : 0 },
                                { skill: character.skills.elementalBurst, bonus: character.constellationsList[4] != undefined ? 3 : 0 },
                            ];

                            return (
                                <button
                                    type="button"
                                    key={`${character.name}-${index}`}
                                    onClick={() => { setActiveCharacter(character) }}
                                    aria-pressed={isActive}
                                    className={`group relative overflow-hidden rounded-xl text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${isActive ? "outline outline-2 outline-primary outline-offset-2" : "hover:-translate-y-1"}`}
                                >
                                    {character.name === "Yae Miko" ?
                                        <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}1_P.png`} width={2000} height={500} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" alt={`${character.name} constellation`} className="absolute inset-0 h-full w-full rounded-xl object-cover" />
                                        :
                                        (character.name === "Traveler") ?
                                            <Image src={`/namecards/UI_NameCardPic_Ysxf4_P.png`} width={2000} height={500} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" alt={`${character.name} constellation`} className="absolute inset-0 h-full w-full rounded-xl object-cover" />
                                            :
                                            <Image src={`https://enka.network/ui/UI_NameCardPic_${character.fileName}_P.png`} width={2000} height={500} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" alt={`${character.name} constellation`} className="absolute inset-0 h-full w-full rounded-xl object-cover" />
                                    }
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-darkest/85 via-bg-darkest/45 to-transparent" />
                                    <div className="relative z-10 flex gap-3 p-3 drop-shadow-text">
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-bg-darkest/45 p-1">
                                            <Image src={`https://enka.network/ui/${character.assets.icon}.png`} width={100} height={100} sizes="96px" alt={`${character.name}`} title={`${character.name} icon`} className="h-full w-full object-contain" />
                                        </div>
                                        <div className="flex min-w-0 flex-col justify-between gap-2">
                                            <div className="flex min-w-0 items-center gap-2">
                                                <h3 className="truncate text-xl font-bold">{character.name}</h3>
                                                <span className="shrink-0 rounded-lg bg-bg px-2 py-0.5 text-sm font-bold">
                                                    C{constellationCount}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
                                                <span>Lv. {character.properties.level.val}/{character.maxLevel}</span>
                                                <span className="inline-flex items-center gap-1">
                                                    <Image src="/stats/Friendship.svg" width={24} height={24} alt="" aria-hidden="true" className="h-5 w-5" />
                                                    {character.friendship.level}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                {characterSkills.map(({ skill, bonus }) => (
                                                    <div key={skill.name} className="w-12">
                                                        <Image src={`https://enka.network/ui/${skill.assets.icon}.png`} width={48} height={48} sizes="48px" alt={skill.name} className="h-12 w-12 rounded-full bg-bg-dark/70 p-1" />
                                                        <p className={`-mt-2 text-center font-bold ${bonus > 0 ? "text-green-400" : "text-text"}`}>
                                                            {skill.level + bonus}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>
            )}

            <ProfileCardWide user={user} activeCharacter={activeCharacter} artifactSet={artifactSet} toggleShowStatsModal={() => { setShowStatsModal(true) }} />
            <ProfileCardGrid user={user} />
            <div className="from-gradient-Pyro-start to-gradient-Pyro-end from-gradient-Electro-start to-gradient-Electro-end from-gradient-Cryo-start to-gradient-Cryo-end from-gradient-Hydro-start to-gradient-Hydro-end from-gradient-Dendro-start to-gradient-Dendro-end from-gradient-Anemo-start to-gradient-Anemo-end from-gradient-Geo-start to-gradient-Geo-end"></div>
        </div>
    )
}
