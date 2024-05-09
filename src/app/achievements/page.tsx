"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function AchievementsPage() {
    const [achievementData, setAchievementData] = useState<any[]>([]);
    const [achievementGroups, setAchievementGroups] = useState<any[]>([]);
    const [activeGroup, setActiveGroup] = useState<string>("")

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
                console.error("Error fetching character names:", error);
            });
    }, []);
    return (
        <>
            <NavBar />
            <main className="pt-8 md:pt-16 px-8 md:px-16 mb-20 w-full min-h-[100dvh] flex flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
                    <h1 className="text-3xl text-primary">Achievement List</h1>
                </div>
                <section className="grid md:grid-cols-[30%_70%] gap-8 flex-col max-w-screen-2xl w-full p-2">
                    <div className="flex flex-col gap-4 font-bold text-2xl p-5 max-h-[30dvh] md:max-h-[100dvh] overflow-y-scroll ">
                        {achievementGroups.length > 0 ?
                            achievementGroups.map((group: any, index: number) => (
                                <div onClick={() => { setActiveGroup(group) }} className={`flex gap-2 rounded-xl p-2 transition-all bg-bg-dark items-center hover:scale-105 hover:shadow-light ${activeGroup == group && "scale-105 shadow-light"}`} key={index}>
                                    {/* <Image src={`https://api.ambr.top/assets/UI/achievement/UI_AchievementIcon_A0${index+1}.png`} width={55} height={55} alt={`${group} icon`}/> */}
                                    {group}
                                </div>
                            ))
                            :
                            <Loader />
                        }
                    </div>
                    <div className="flex flex-col max-h-[100dvh] p-2 overflow-y-scroll gap-4">
                        {achievementData.length > 0 ? achievementData.map((achievement: any, index: number) => {
                            if (activeGroup == achievement.achievementgroup) return <div key={index} className="flex flex-col gap-2 bg-bg-dark p-2 rounded-xl">
                                <div className="flex gap-2 text-xl font-bold">
                                    <span className="bg-bg-light p-1 rounded-xl text-base font-normal">{achievement.version}</span>{achievement.name}
                                </div>
                                <div className="flex flex-col">
                                    {[...Array(achievement.stages)].map((_, idx: number) => {
                                        const description = achievement[`stage${idx + 1}`].description;
                                        const progress = achievement[`stage${idx + 1}`].progress;
                                        const replacedDescription = description.replace('{param0}', progress);
                                        return <div key={idx} className="flex justify-between gap-2 p-2 rounded-xl">
                                            <div className="text-sm">{replacedDescription}</div>
                                            <div className="flex font-bold">{achievement[`stage${idx + 1}`].reward.count}<Image src={`/icons/primogem.webp`} title="Primogem" width={25} height={25} alt="Primogem" /></div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })
                            :
                            <div className="w-full col-span-6 md:col-span-full">
                                {/* <Loader /> */}
                            </div>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
