"use client"
import Image from "next/image";
import { useState, useMemo } from "react"
import { Achievement } from "genshin-db";

type AchievementWithFilter = Achievement & { filtered: boolean };

export default function AchievementsList({
    AchievementData,
    AchievementGroups
}: {
    AchievementData: Achievement[],
    AchievementGroups: string[]
}) {
    const [activeGroup, setActiveGroup] = useState<string>(AchievementGroups[0]);
    const [search, setSearch] = useState<string>("");
    const groupsActivated = search.length === 0;
    const filteredAchievements = useMemo(() => AchievementData.map((achievement: Achievement) => {
        const isFiltered =
            achievement.name.toLowerCase().includes(search.toLowerCase()) ||
            achievement.stage1.description.toLowerCase().includes(search.toLowerCase());
        return { ...achievement, filtered: isFiltered };
    }), [search, AchievementData]);

    return (<>
        <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm text-text/70">
                Find Achievements
                <input type="text" className="w-full rounded-xl border border-bg-light/70 bg-bg-light/25 px-4 py-2 text-text outline-none focus:border-primary/60" onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder="Search by name or description..." />
            </label>
        </div>
        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex max-h-[70dvh] flex-col gap-2 overflow-y-auto p-2 lg:max-h-[80dvh]">
                {AchievementGroups.map((group: string, index: number) => (
                    <button onClick={() => { setActiveGroup(group); setSearch("") }} className={`flex items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${groupsActivated && activeGroup == group ? "bg-primary/20 text-text" : "text-text/70 hover:bg-bg-light/30 hover:text-text"}`} key={index}>
                        {group}
                    </button>
                ))}

            </div>

            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex max-h-[80dvh] flex-col gap-3 overflow-y-auto p-2">
                {filteredAchievements.length > 0 ? filteredAchievements.map((achievement: AchievementWithFilter, index: number) => {
                    let valid = false;
                    if (groupsActivated) {
                        if (achievement.achievementGroupName == activeGroup) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    } else {
                        if (achievement.filtered) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    }
                    if (valid) return (
                        <div key={index} className="flex flex-col gap-3 rounded-xl border border-bg-light/60 bg-bg-dark/60 p-4">
                            <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-text">
                                <span className="rounded-full bg-bg-light/40 px-2 py-1 text-xs text-text/70">{achievement.version}</span>
                                {achievement.name}
                            </div>
                            <div className="flex flex-col divide-y divide-bg-light/40">
                                {[...Array(achievement.stages)].map((_, idx: number) => {
                                    const stage = achievement[`stage${idx + 1}` as keyof Achievement] as { description: string; progress: number; reward: { count: number } } | undefined;
                                    if (!stage) return null;
                                    const description = stage.description;
                                    const progress = stage.progress;
                                    const replacedDescription = description.replace('{param0}', String(progress));
                                    return (
                                        <div key={idx} className="flex items-center justify-between gap-4 py-2 text-sm text-text/80">
                                            <div>{replacedDescription}</div>
                                            <div className="flex items-center gap-1 font-semibold text-text">
                                                {stage.reward.count}
                                                <Image src={`/icons/primogem.webp`} title="Primogem" width={20} height={20} alt="Primogem" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="flex h-full items-center justify-center text-sm text-text/50">
                        Nothing found.
                    </div>
                )}

            </div>
        </section>

    </>

    )

}
