"use client"
import Image from "next/image";
import axios from "axios";
import { useLayoutEffect, useState, useEffect } from "react"
import Loader from "../components/Loader";
import { Achievement } from "genshin-db";

export default function AchievementsPage() {
    const [achievementData, setAchievementData] = useState<Achievement[]>([]);
    const [achievementGroups, setAchievementGroups] = useState<any[]>([]);
    const [activeGroup, setActiveGroup] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    useLayoutEffect(() => {
        axios
            .get<any>("https://genshin-db-api.vercel.app/api/achievements?query=names&dumpResult=true&matchAliases=true&matchCategories=true&verboseCategories=true")
            .then((res) => {
                let achievementGroups = res.data.result;
                setAchievementData(achievementGroups);
                const optionsSet = new Set<string>();
                achievementGroups.forEach((item: any) => {
                    optionsSet.add(item.achievementgroup);
                });
                const optionsArray = Array.from(optionsSet);
                setAchievementGroups(optionsArray);

                setActiveGroup(optionsArray[0]);
            })
            .catch((error) => {
                console.error("Error fetching achievements:", error);
            });
    }, []);
    const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
    const [groupsActivated, setGroupsActivated] = useState<boolean>(true)
    useEffect(() => {
        if (search.length == 0) setGroupsActivated(true)
        else setGroupsActivated(false);
        const updatedAchievements = achievementData.map((achievement: any) => {
            const isFiltered =
                (achievement.name.toLowerCase().includes(search.toLowerCase()) ||
                    achievement.stage1.description.toLowerCase().includes(search.toLowerCase()));
            return { ...achievement, filtered: isFiltered };
        });
        setFilteredAchievements(updatedAchievements);
    }, [search, achievementData, activeGroup]);
    return (
        <>
            <h1 className="text-3xl text-primary">Achievement List</h1>
            <div className="w-fulll">
                <label className="w-full ">
                    Find Achievements
                    <input type="input" className="w-full p-2 rounded-xl" onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder="Search..." />
                </label>
            </div>
            <section className="grid md:grid-cols-[30%_70%] gap-4 flex-col w-full p-2">
                <div className="flex flex-col gap-4 font-bold text-xl p-5 max-h-[30dvh] md:max-h-[100dvh] overflow-y-scroll ">
                    {achievementGroups.length > 0 ?
                        achievementGroups.map((group: any, index: number) => (
                            <div onClick={() => { setActiveGroup(group); setSearch("") }} className={`flex gap-2 rounded-xl p-2 transition-all bg-bg-dark items-center hover:scale-105 hover:shadow-light ${groupsActivated && activeGroup == group && "scale-105 shadow-light"}`} key={index}>
                                {/* <Image src={`https://api.ambr.top/assets/UI/achievement/UI_AchievementIcon_A0${index+1}.png`} width={55} height={55} alt={`${group} icon`}/> */}
                                {group}
                            </div>
                        ))
                        :
                        <Loader />
                    }
                </div>

                <div className="flex flex-col max-h-[100dvh] p-2 overflow-y-scroll gap-4">
                    {filteredAchievements.length > 0 ? filteredAchievements.map((achievement: any, index: number) => {
                        let valid = false;
                        if (groupsActivated) {
                            valid = true
                            if (achievement.achievementgroup == activeGroup) {
                                valid = true;
                            } else {
                                valid = false;
                            }
                        } else {
                            if (achievement.filtered) {

                                valid = true;
                            } else {

                            }
                        }
                        if (valid) return (
                            <div key={index} className="flex flex-col gap-2 bg-bg-dark p-2 rounded-xl">
                                <div className="flex gap-2 text-base md:text-xl font-bold">
                                    <span className="bg-bg-light p-1 rounded-xl font-normal">{achievement.version}</span>{achievement.name}
                                </div>
                                <div className="flex flex-col">
                                    {[...Array(achievement.stages)].map((_, idx: number) => {
                                        const description = achievement[`stage${idx + 1}`].description;
                                        const progress = achievement[`stage${idx + 1}`].progress;
                                        const replacedDescription = description.replace('{param0}', progress);
                                        return (
                                            <div key={idx} className="flex justify-between gap-2 p-2 rounded-xl">
                                                <div className="text-sm">{replacedDescription}</div>
                                                <div className="flex font-bold">{achievement[`stage${idx + 1}`].reward.count}<Image src={`/icons/primogem.webp`} title="Primogem" width={25} height={25} alt="Primogem" /></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="w-full col-span-6 md:col-span-full">
                            {/* Loader or any other content */}
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}
