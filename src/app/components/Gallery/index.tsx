"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";
import { Character, OutfitEntry } from "@/app/types/character";

export default function Gallery({
    characterData
}: {
    characterData: Character
}) {
    const [active, setActive] = useState<number>(0);

    const outfits: OutfitEntry[] = (characterData.outfits ?? []).filter(
        (outfit: OutfitEntry) =>
            outfit.images?.filename_splash || (outfit.url?.modelviewer?.length ?? 0) > 0
    );

    const tabs = ["Namecard", ...outfits.map((outfit) => outfit.name)];

    return (
        <section className="flex flex-col gap-6">
            <div className="flex flex-col rounded-xl border border-bg-light/50 bg-bg-dark p-4">
                <div className="flex flex-wrap gap-3">
                    {tabs.map((tab, index) => (
                        <button
                            key={`${tab}-${index}`}
                            type="button"
                            id={index === 0 ? undefined : outfits[index - 1].name}
                            onClick={() => setActive(index)}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${active === index
                                ? "bg-bg-lighter text-primary"
                                : "bg-bg-light text-text/70 hover:text-text"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {active === 0 && characterData.nameCard && (
                    <div className="relative mt-4 overflow-hidden rounded-lg">
                        <Image
                            src={`https://enka.network/ui/${characterData.nameCard.images.filename_background}.png`}
                            width={2000}
                            height={1000}
                            alt={`${characterData.name} namecard`}
                            className="h-auto w-full"
                        />
                        <p className="font-poppins w-full rounded-b-lg bg-bg-darker p-4 text-sm text-text/80">
                            {characterData.nameCard.description}
                        </p>
                    </div>
                )}

                {active > 0 && outfits[active - 1] && (
                    <div className="mt-4 flex flex-col gap-3" id={outfits[active - 1].name}>
                        {outfits[active - 1].images.filename_splash && (
                            <Image
                                src={`https://enka.network/ui/${outfits[active - 1].images.filename_splash}.png`}
                                width={1500}
                                height={500}
                                alt={`${outfits[active - 1].name} outfit splash`}
                                className="h-auto w-full rounded-lg"
                            />
                        )}
                        {outfits[active - 1].url.modelviewer.length > 0 && (
                            <div className="flex w-full flex-col gap-2">
                                <iframe
                                    src={outfits[active - 1].url.modelviewer}
                                    className="h-[60dvh] w-full rounded-lg"
                                    title={`${outfits[active - 1].name} 3D model`}
                                />
                                <Link
                                    href={outfits[active - 1].url.modelviewer}
                                    target="_blank"
                                    className="text-sm font-semibold text-primary transition-colors hover:text-accent"
                                >
                                    Open in New Tab
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
