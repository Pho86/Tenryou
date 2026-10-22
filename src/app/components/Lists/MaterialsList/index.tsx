"use client"
import Image from "next/image";
import { useState } from "react"
import IconButtonSwitch from "../../IconButtonSwitch";
import { Material } from "../../../types/materials";
export default function MaterialsList({
    materialData
}: {
    materialData: Material[]
}) {
    const [activeRarity, setActiveRarity] = useState<number>(0);
    const [active, setActive] = useState<Material | undefined>(materialData[0]);
    return (
        <section className="flex flex-col gap-8">
            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Rarity</span>
                    <div className="flex flex-wrap gap-2">
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 1 ? 0 : 1) }} index={1} active={activeRarity} className="text-text/40" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 2 ? 0 : 2) }} index={2} active={activeRarity} className="text-green-400" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 3 ? 0 : 3) }} index={3} active={activeRarity} className="text-blue-400" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 4 ? 0 : 4) }} index={4} active={activeRarity} className="text-purple-400" />
                        <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 5 ? 0 : 5) }} index={5} active={activeRarity} className="text-yellow-400" />
                    </div>
                </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="grid max-h-[85dvh] grid-cols-2 gap-3 overflow-y-auto rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                    {materialData.map((material: Material, index: number) => {
                        const materialRarity = [true, 1, 2, 3, 4, 5];
                        const validRarity = activeRarity === 0 || materialRarity[activeRarity] === material.rarity;
                        if (!validRarity) return null;
                        const selected = active?.id === material.id;
                        return (
                            <button
                                key={material.id || index}
                                type="button"
                                onClick={() => { setActive(material) }}
                                aria-pressed={selected}
                                className={`group flex min-h-[10rem] w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-bg-light/15 text-left transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${selected ? "border-primary/60 shadow-[0_0_0_1px_rgba(255,115,115,0.4)]" : "border-bg-light/60"}`}
                            >
                                <div className={`relative flex w-full min-h-[6rem] flex-1 items-center justify-center overflow-hidden rounded-t-xl p-3 ${rarityGradient(material.rarity)}`}>
                                    <Image
                                        src={material.images?.filename_icon ? `https://enka.network/ui/${material.images.filename_icon}.png` : "/icon.svg"}
                                        width={160}
                                        height={160}
                                        alt={`${material.name} icon`}
                                        className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                                        title={material.name}
                                        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => { event.currentTarget.src = '/icon.svg' }}
                                    />
                                </div>
                                <p className="px-2 py-2 text-center text-xs font-semibold text-text/80">{material.name}</p>
                            </button>
                        )
                    })}
                </div>
                <div className="order-first lg:order-last">
                    {active ? (
                        <article className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col overflow-hidden">
                            <div className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between ${rarityGradient(active.rarity)}`}>
                                <p className="text-sm font-semibold uppercase tracking-wider text-text/80">{active.typeText}</p>
                                <Image
                                    src={active.images?.filename_icon ? `https://enka.network/ui/${active.images.filename_icon}.png` : "/icon.svg"}
                                    width={240}
                                    height={240}
                                    alt={`${active.name} icon`}
                                    className="h-32 w-32 self-center object-contain sm:h-40 sm:w-40"
                                    onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => { event.currentTarget.src = '/icon.svg' }}
                                />
                            </div>
                            <div className="flex flex-col gap-5 p-6">
                                <h2 className="text-2xl font-bold text-text">{active.name}</h2>
                                <p className="text-sm leading-relaxed text-text/75">{active.description}</p>
                                {active.sources?.length > 0 && (
                                    <div className="flex flex-col gap-2 border-t border-bg-light/60 pt-5">
                                        <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text/60">Sources</h3>
                                        <div className="flex flex-col gap-1 text-sm leading-relaxed text-text/75">
                                            {active.sources.map((source: string, index: number) => (
                                                <span key={index}>{source}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    ) : (
                        <div className="rounded-xl border border-bg-light/70 bg-bg-light/25">
                            No materials available.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

function rarityGradient(rarity?: number) {
    switch (rarity) {
        case 5:
            return "bg-gradient-to-br from-[#b98a56]/40 to-[#f5d16e]/30";
        case 4:
            return "bg-gradient-to-br from-[#7c4d9f]/40 to-[#b99aff]/30";
        case 3:
            return "bg-gradient-to-br from-[#3a6da8]/40 to-[#7fb6ff]/30";
        case 2:
            return "bg-gradient-to-br from-[#3a7f5d]/40 to-[#7dffb1]/30";
        default:
            return "bg-gradient-to-br from-[#6b6b6b]/40 to-[#9f9f9f]/30";
    }
}
