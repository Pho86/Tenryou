"use client"
import { Outfit } from "@/app/types/outfits";
import { useState } from "react";
import Skeleton from "../../Skeleton";
import Image from "next/image";
import Link from "next/link";
export default function OutfitsList({
    OutfitData
}: {
    OutfitData: Outfit[]

}) {
    const [active, setActive] = useState<Outfit>(OutfitData[0]);
    const [skins, setSkins] = useState<boolean>(true);
    return <>
        <section className="flex flex-col gap-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="grid grid-cols-2 gap-3 overflow-y-auto rounded-xl border border-bg-light/60 p-3 max-h-[80dvh] sm:grid-cols-3">
                    {OutfitData.length > 0 ? OutfitData.map((outfit: Outfit, index: number) => {
                        if (outfit.images.nameicon && skins) return <div key={index}>
                            <div className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-bg-light/60 transition-all hover:border-primary/40 ${active && active.id == outfit.id && "border-primary/60 shadow-[0_0_0_1px_rgba(255,115,115,0.4)]"}`} onClick={() => { setActive(outfit) }}>
                                <div className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#7c4d9f]/40 to-[#b99aff]/25">
                                    <Image src={`https://enka.network/ui/${outfit.images.namecard}.png`} width={320} height={160} alt={`${outfit.name} skins icon`} className={`h-32 w-full object-cover sm:h-36`} title={`${outfit.name}`}
                                    />
                                </div>
                                <p className="px-2 py-2 text-center text-xs font-semibold text-text/80">{outfit.name}</p>
                            </div>
                        </div>
                    })
                        :
                        <div className="col-span-full grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="aspect-[2/1] w-full rounded-xl" />
                            ))}
                        </div>
                    }
                </div>
                <div className="order-first lg:order-last flex flex-col gap-3">
                    {
                        active ? <>
                            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col overflow-hidden">
                                <div className="relative flex items-center justify-center overflow-hidden">
                                    <Image src={`https://enka.network/ui/${active.images.namesplash}.png`} width={600} height={340} alt={`${active.name} material icon`} className={`h-64 w-full object-contain sm:h-80`} />
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
                            {active.url.modelviewer.length > 0 && <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 overflow-hidden">
                                <iframe src={active.url.modelviewer} className="h-[28rem] w-full">
                                </iframe>
                                <div className="flex justify-end p-3">
                                    <Link href={active.url.modelviewer} target="__blank" className="text-sm text-primary transition-colors hover:text-primary/80">Open in New Tab</Link>
                                </div>
                            </div>}
                        </>
                            :
                            <div className="rounded-xl border border-bg-light/70 bg-bg-dark/40 p-6 flex flex-col gap-4">
                                <Skeleton className="h-64 w-full rounded-xl sm:h-80" />
                                <Skeleton className="h-8 w-48 rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-3/4 rounded" />
                            </div>
                    }
                </div>
            </div>
        </section>
    </>
}
