"use client"
import { Character } from "@/app/types/character";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
function getColorFromMaterial(i: number, index: number) {
    if (i == 0) {
        return "C"
    }
    else if (i == 1) {
        if (index == 0) {
            return "UC"
        }
        else if (index <= 2) {
            return "R";
        } else if (index < 5) {
            return "SR"
        } else {
            return "SSR"
        }
    }
    else if (i == 2) {
        if (index == 0) {
            return "C"
        } else {
            return "SSR"
        }
    }
    else if (i == 3) {
        return "C";
    } else if (i == 4) {
        if (index < 2) {
            return "UC"
        } else if (index < 4) {
            return "R"
        } else {
            return "SR"
        }
    }
}

export default function StatsTable({ characterData }: { characterData: Character }) {
    const [showAscension, setAscension] = useState<boolean>(false);
    const [percentage, setPercent] = useState<boolean>(true)
    useLayoutEffect(() => {
        if (characterData.substatText == "Elemental Mastery") {
            setPercent(false)
        }
    }, [])

    return <div className="flex flex-col gap-4">
        <h2 className="font-bold text-3xl">Ascension Materials and Stats</h2>
        <button className="text-start hover:bg-bg-dark border-2 p-2 w-max rounded-xl transition-all" onClick={() => { setAscension(!showAscension) }}>{showAscension ? "Hide" : "Show"} Materials</button>

        {characterData.stats && <table className="table-cell border-collapse w-full rounded-xl">
            <thead className="w-full">
                <tr className="bg-bg-dark ">
                    <th className="p-2">Grade</th>
                    <th className="p-2">Level</th>
                    <th className="p-2">HP</th>
                    <th className="p-2">ATK</th>
                    <th className="p-2">DEF</th>
                    <th className="p-2">{characterData.substatText}</th>
                </tr>
            </thead>
            <tbody className="text-center">
                <StatsRow stats={characterData.stats[1]} stats2={characterData.stats[20]} ascension={characterData.costs.ascend1} show={showAscension} index={1} percentage={percentage} />
                <StatsRow stats={characterData.stats["20+"]} stats2={characterData.stats[40]} ascension={characterData.costs.ascend2} show={showAscension} index={2} percentage={percentage} />
                <StatsRow stats={characterData.stats["40+"]} stats2={characterData.stats[50]} ascension={characterData.costs.ascend3} show={showAscension} index={3} percentage={percentage} />
                <StatsRow stats={characterData.stats["50+"]} stats2={characterData.stats[60]} ascension={characterData.costs.ascend4} show={showAscension} index={4} percentage={percentage} />
                <StatsRow stats={characterData.stats["60+"]} stats2={characterData.stats[70]} ascension={characterData.costs.ascend5} show={showAscension} index={5} percentage={percentage} />
                <StatsRow stats={characterData.stats["70+"]} stats2={characterData.stats[80]} ascension={characterData.costs.ascend6} show={showAscension} index={6} percentage={percentage} />
                <StatsRow stats={characterData.stats["80+"]} stats2={characterData.stats[90]} ascension={characterData.costs.ascend7} show={showAscension} index={7} percentage={percentage} />
            </tbody>
        </table>}
    </div>
}

function StatsRow({ stats, stats2, ascension, show, index, percentage }: { stats: any, stats2: any, ascension?: any, show: boolean, index: number, percentage: boolean }) {
    return (<>
        {stats != undefined &&
            <>
                <tr className={`${index % 2 ? "bg-bg-light" : "bg-bg-dark"}`}>
                    <td className="p-1" rowSpan={2}>{stats.ascension}⭐</td>
                    <td className="p-1">{stats.level}/{stats.ascension > 1 ? 10 * stats.ascension + 30 : stats.ascension * 20 + 20}</td>
                    <td className="p-1">{stats.hp.toFixed(2)}</td>
                    <td className="p-1">{stats.attack.toFixed(2)}</td>
                    <td className="p-1">{stats.defense.toFixed(2)}</td>
                    {percentage ? <td className="p-1">{(stats.specialized * 100).toFixed(2)}%</td> : <td className="p-1">{(stats.specialized).toFixed(2)}</td>}

                </tr>
                <tr className={`${index % 2 ? "bg-bg-light" : "bg-bg-dark"}`}>
                    <td className="p-1">{stats2.level}/{stats.ascension > 1 ? 10 * stats.ascension + 30 : stats.ascension * 20 + 20}</td>
                    <td className="p-1">{stats2.hp.toFixed(2)}</td>
                    <td className="p-1">{stats2.attack.toFixed(2)}</td>
                    <td className="p-1">{stats2.defense.toFixed(2)}</td>
                    {percentage ? <td className="p-1">{(stats.specialized * 100).toFixed(2)}%</td> : <td className="p-1">{(stats.specialized).toFixed(2)}</td>}
                </tr>
            </>
        }
        {ascension && show &&
            <tr>
                <td colSpan={6} className="text-start p-2">
                    <p>{stats.ascension}⭐ → {stats.ascension + 1}⭐</p>
                    <div className="flex gap-2">

                        {ascension.map((item: any, i: number) => {
                            item.color = getColorFromMaterial(i, stats.ascension);
                            return (
                                <div key={item.id} className="">
                                    <div className="flex w-[4rem] md:w-[5rem] flex-col items-center hover:scale-105 hover:shadow-light transition-all rounded-lg bg-[#efeeee]" key={item.id}>
                                        <Image src={`https:/enka.network/ui/UI_ItemIcon_${item.id}.png`} width={100} height={100} alt={`${item.name} material icon`} className={`bg-gradient-to-br from-gradient-${item.color}-start to-gradient-${item.color}-end rounded-t-lg p-1 md:p-2 w-full h-full`} title={item.name}/>
                                        <p className="text-zinc-800 font-bold p-1 text-sm ">{item.count}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </td>
            </tr>
        }
    </>
    )
}