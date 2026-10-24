"use client"
import Image from "next/image";
import { useState } from "react"
import { Artifact as ArtifactTypes } from "../../../types/artifacts";

const pieceKeys = ["flower", "plume", "sands", "goblet", "circlet"] as const;
type PieceKey = typeof pieceKeys[number];

export default function ArtifactsList({
    artifactData
}: {
    artifactData: ArtifactTypes[]
}) {
    const [active, setActive] = useState<{ artifact: ArtifactTypes, piece: PieceKey } | null>(() => {
        const first = artifactData[0];
        return first ? { artifact: first, piece: firstPiece(first) } : null;
    });
    const activePiece = active ? active.artifact[active.piece] : undefined;
    const activeRarity = active ? rarityOf(active.artifact) : 1;

    return (
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="grid max-h-[85dvh] grid-cols-2 gap-3 overflow-y-auto rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {artifactData.map((artifact: ArtifactTypes, index: number) => (
                    availablePieces(artifact).map((pieceKey: PieceKey) => {
                        const piece = artifact[pieceKey];
                        if (!piece) return null;
                        const selected = active?.artifact.id === artifact.id && active.piece === pieceKey;
                        return (
                            <button
                                key={`${artifact.id}-${pieceKey}-${index}`}
                                type="button"
                                onClick={() => { setActive({ artifact, piece: pieceKey }) }}
                                aria-pressed={selected}
                                aria-label={`${artifact.name}: ${piece.name}`}
                                className={`group flex min-h-[10rem] w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-bg-light/15 text-left transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${selected ? "border-primary/60 shadow-[0_0_0_1px_rgba(255,115,115,0.4)]" : "border-bg-light/60"}`}
                            >
                                <div className={`relative flex w-full min-h-[6rem] flex-1 items-center justify-center overflow-hidden rounded-t-xl p-3 ${rarityGradient(rarityOf(artifact))}`}>
                                    <Image
                                        src={imageFor(artifact, pieceKey)}
                                        width={160}
                                        height={160}
                                        alt={`${piece.name} icon`}
                                        className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                                        title={piece.name}
                                        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => { event.currentTarget.src = '/icon.svg' }}
                                    />
                                </div>
                                <div className="px-2 py-2 text-center">
                                    <p className="truncate text-xs font-semibold text-text/80">{piece.relicText}</p>
                                    <p className="mt-0.5 truncate text-[10px] text-text/60" title={artifact.name}>{artifact.name}</p>
                                </div>
                            </button>
                        )
                    })
                ))}
            </div>
            <div className="order-first lg:order-last">
                {active && activePiece ? (
                    <article className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col overflow-hidden">
                        <div className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between ${rarityGradient(activeRarity)}`}>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold uppercase tracking-wider text-text/80">{activePiece.relicText}</p>
                                <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">{activePiece.name}</h2>
                                <p className="mt-1 text-sm text-text/80">{active.artifact.name}</p>
                            </div>
                            <Image
                                src={imageFor(active.artifact, active.piece)}
                                width={240}
                                height={240}
                                alt={`${activePiece.name} icon`}
                                className="h-32 w-32 self-center object-contain sm:h-40 sm:w-40"
                                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => { event.currentTarget.src = '/icon.svg' }}
                            />
                        </div>
                        <div className="flex flex-col gap-5 p-6">
                            <p className="text-sm leading-relaxed text-text/75">{activePiece.description}</p>
                            {activePiece.story && (
                                <blockquote className="border-l border-bg-light/60 pl-4 text-sm italic leading-relaxed text-text/60">
                                    {activePiece.story}
                                </blockquote>
                            )}
                            <div className="border-t border-bg-light/60 pt-5">
                                <h3 className="text-lg font-bold text-text">{active.artifact.name}</h3>
                                <div className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-text/75">
                                    {active.artifact.effect1Pc && <p><span className="font-semibold">1 Piece:</span> {active.artifact.effect1Pc}</p>}
                                    {active.artifact.effect2Pc && <p><span className="font-semibold">2 Piece:</span> {active.artifact.effect2Pc}</p>}
                                    {active.artifact.effect4Pc && <p><span className="font-semibold">4 Piece:</span> {active.artifact.effect4Pc}</p>}
                                </div>
                            </div>
                        </div>
                    </article>
                ) : (
                    <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 text-sm text-text/60">
                        No artifacts available.
                    </div>
                )}
            </div>
        </section>
    )
}

function availablePieces(artifact: ArtifactTypes) {
    return pieceKeys.filter((key: PieceKey) => Boolean(artifact[key]));
}

function firstPiece(artifact: ArtifactTypes): PieceKey {
    return availablePieces(artifact)[0] ?? "flower";
}

function rarityOf(artifact: ArtifactTypes) {
    return Math.max(...(artifact.rarityList.length > 0 ? artifact.rarityList : [1]));
}

function imageFor(artifact: ArtifactTypes, piece: PieceKey) {
    const filename = artifact.images[`filename_${piece}` as keyof ArtifactTypes["images"]];
    return filename ? `https://enka.network/ui/${filename}.png` : "/icon.svg";
}

function rarityGradient(rarity: number) {
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
