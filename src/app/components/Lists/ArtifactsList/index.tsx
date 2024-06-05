"use client"
import Image from "next/image";
import { Fragment, useState } from "react"
import { Artifact as ArtifactTypes } from "../../../types/artifacts";

export default function ArtifactsList({
    artifactData
}: {
    artifactData: ArtifactTypes[]
}) {
    const [activeArtifact, setActiveArtifact] = useState(() => ({
        ...artifactData[0],
        hover: "flower"
      }));
    return <>
        <section className="grid md:grid-cols-2 gap-8">
            <div className="max-h-[100dvh] overflow-y-scroll py-4 grid-auto-fit-100 px-2 order-last md:order-first">
                {artifactData.map((artifact, index) => (
                    <Fragment key={index}>
                        {artifact.flower && (
                            <ArtifactItem type="flower" rarity={artifact.rarityList[1]} image={`https://enka.network/ui/${artifact.images.filename_flower}.png`} onClick={() => { setActiveArtifact({ ...artifact, hover: "flower" }); }} name={artifact.flower.name} />
                        )}
                        {artifact.plume && (
                            <ArtifactItem type="plume" rarity={artifact.rarityList[1]} image={`https://enka.network/ui/${artifact.images.filename_plume}.png`} onClick={() => { setActiveArtifact({ ...artifact, hover: "plume" }); }} name={artifact.plume.name} />
                        )}
                        {artifact.sands && (
                            <ArtifactItem type="sands" rarity={artifact.rarityList[1]} image={`https://enka.network/ui/${artifact.images.filename_sands}.png`} onClick={() => { setActiveArtifact({ ...artifact, hover: "sands" }); }} name={artifact.sands.name} />
                        )}
                        {artifact.goblet && (
                            <ArtifactItem type="goblet" rarity={artifact.rarityList[1]} image={`https://enka.network/ui/${artifact.images.filename_goblet}.png`} onClick={() => { setActiveArtifact({ ...artifact, hover: "goblet" }); }} name={artifact.goblet.name} />
                        )}
                        {artifact.circlet && (
                            <ArtifactItem type="circlet" rarity={artifact.rarityList[1]} image={`https://enka.network/ui/${artifact.images.filename_circlet}.png`} onClick={() => { setActiveArtifact({ ...artifact, hover: "circlet" }); }} name={artifact.circlet.name} />
                        )}
                    </Fragment>
                ))}
            </div>
            <div className=" order-3">
                {activeArtifact &&
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col relative bg-[#e9e9e9] rounded-xl ">
                            <div className={`max-h-56 rounded-t-xl bg-gradient-to-br ${activeArtifact.rarityList[1] === 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : activeArtifact.rarityList[1] === 4 ? "from-gradient-SR-start to-gradient-SR-end" : activeArtifact.rarityList[1] === 3 ? "from-gradient-R-start to-gradient-R-end" : activeArtifact.rarityList[1] === 2 ? "from-gradient-UC-start to-gradient-UC-end" : "from-gradient-C-start to-gradient-C-end"} flex justify-between `}>
                                {activeArtifact.hover == "flower" && <Image src={`https://enka.network/ui/${activeArtifact.images.filename_flower}.png`} width={500} height={500} alt={`${activeArtifact.name} artifact icon`} className={`object-contain w-full`} />}
                                {activeArtifact.hover == "plume" && <Image src={`https://enka.network/ui/${activeArtifact.images.filename_plume}.png`} width={500} height={500} alt={`${activeArtifact.name} artifact icon`} className={`object-contain w-full`} />}
                                {activeArtifact.hover == "sands" && <Image src={`https://enka.network/ui/${activeArtifact.images.filename_sands}.png`} width={500} height={500} alt={`${activeArtifact.name} artifact icon`} className={`object-contain w-full`} />}
                                {activeArtifact.hover == "goblet" && <Image src={`https://enka.network/ui/${activeArtifact.images.filename_goblet}.png`} width={500} height={500} alt={`${activeArtifact.name} artifact icon`} className={`object-contain w-full`} />}
                                {activeArtifact.hover == "circlet" && <Image src={`https://enka.network/ui/${activeArtifact.images.filename_circlet}.png`} width={500} height={500} alt={`${activeArtifact.name} artifact icon`} className={`object-contain w-full`} />}

                            </div>
                            <div className="text-bg p-4 flex flex-col gap-2">
                                {activeArtifact.hover == "flower" && <Description piece={activeArtifact.flower} />}
                                {activeArtifact.hover == "plume" && <Description piece={activeArtifact.plume} />}
                                {activeArtifact.hover == "sands" && <Description piece={activeArtifact.sands} />}
                                {activeArtifact.hover == "goblet" && <Description piece={activeArtifact.goblet} />}
                                {activeArtifact.hover == "circlet" && <Description piece={activeArtifact.circlet} />}
                                <div className="flex flex-col w-full text-pretty">
                                    <h2 className="font-bold text-xl">{activeArtifact.name}</h2>
                                    {activeArtifact.effect1Pc && <p><span className="font-semibold">1 Piece:</span> {activeArtifact.effect1Pc}</p>}
                                    {activeArtifact.effect2Pc && <p><span className="font-semibold">2 Piece:</span> {activeArtifact.effect2Pc}</p>}
                                    {activeArtifact.effect4Pc && <p><span className="font-semibold">4 Piece:</span> {activeArtifact.effect4Pc}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    </>
}

function ArtifactItem({ type, rarity, image, onMouseEnter, name, onClick }: { type: string, rarity: number, image: string, onMouseEnter?: () => void, name: string, onClick: () => void }) {
    return <Image
        src={image}
        width={150}
        height={150}
        alt={`${type} image`}
        className={`rounded-xl w-full h-full min-h-16 object-cover bg-gradient-to-br ${rarity == 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : rarity == 4 ? "from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-R-start to-gradient-R-end"} hover:scale-110 transition-all hover:shadow-light`}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        title={name ? name : ""}
    />
}

function Description({ piece }: { piece: any }) {
    return <div className="flex gap-2 flex-col">
        <p className="font-bold text-2xl">{piece.name}</p>
        <blockquote className="">{piece.description}</blockquote>
        <blockquote className="italic text-sm">{piece.story}</blockquote>
    </div>
}