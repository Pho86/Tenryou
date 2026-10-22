"use client"
import { Namecard } from "@/app/types/namecards";
import { useState } from "react";
import Skeleton from "../../Skeleton";
import Image from "next/image";
export default function NamecardsList({
    NamecardData
}: {
    NamecardData: Namecard[]

}) {
    const [active, setActive] = useState<Namecard>(NamecardData[0]);
    return <>
        <section className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="grid grid-cols-2 gap-3 overflow-y-auto rounded-xl border border-bg-light/60 p-3 max-h-[80dvh] sm:grid-cols-3">
                    {NamecardData.map((namecard: Namecard, index: number) => {
                        return <div key={index}>
                            <div className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-bg-light/60 transition-all hover:border-primary/40 ${active && active.id == namecard.id && "border-primary/60 shadow-[0_0_0_1px_rgba(255,115,115,0.4)]"}`} onClick={() => { setActive(namecard) }}>
                                <Image src={`https://enka.network/ui/${namecard.images.filename_background}.png`} width={320} height={160} alt={`${namecard.name} namecard icon`} className={`h-24 w-full object-cover`} title={`${namecard.name}`}
                                />
                                <p className="px-2 py-2 text-center text-xs font-semibold text-text/80">{namecard.name}</p>
                            </div>
                        </div>
                    })}
                </div>
                <div className="order-first lg:order-last">
                    {active ? <>
                        <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col overflow-hidden">
                            <div className={`relative w-full overflow-hidden`}>
                                <Image src={`https://enka.network/ui/${active.images.filename_background}.png`} width={1000} height={400} alt={`${active.name} namecard banner`} className={`h-60 w-full object-cover sm:h-72`} />
                            </div>
                            <div className="flex flex-col gap-3 p-6">
                                <h2 className="text-2xl font-bold text-text">{active.name}</h2>
                                <p className="text-sm leading-relaxed text-text/75">{active.description}</p>
                                <div className="flex flex-col text-sm italic text-text/55">
                                    {active.source.map((source: string, index: number) => {
                                        return <span key={index}>
                                            {source}
                                        </span>
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                        :
                        <div className="rounded-xl border border-bg-light/70 bg-bg-dark/40 p-6 flex flex-col gap-4">
                            <Skeleton className="h-60 w-full rounded-xl sm:h-72" />
                            <Skeleton className="h-8 w-52 rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-4/5 rounded" />
                        </div>
                    }
                </div>
            </div>
        </section>
    </>
}
