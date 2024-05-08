"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Link from "next/link";
export default function OutfitsPage() {
    const [outfitData, setOutfitData] = useState<any[]>([]);
    const [active, setActive] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [skins, setSkins] = useState<boolean>(true);
    useLayoutEffect(() => {
        axios
            .get<any>("https://genshin-db-api.vercel.app/api/outfits?query=names&dumpResult=true&matchNames=false&matchAltNames=false&matchAliases=true&matchCategories=true&verboseCategories=true")
            .then(async (res) => {
                let filteredSkins: any[] = [];
                await Promise.all(res.data.result.map(async (outfit: any) => {
                    if(outfit.images.nameicon) filteredSkins.push(outfit);
                }));
                setOutfitData(filteredSkins);
                setActive(filteredSkins[0]);
            });

    }, []);

    return (
        <>
            <NavBar />
            <main className="md:pt-16 md:px-16 px-8 mb-20 w-full min-h-[100dvh] flex flex-col gap-4 items-center ">
                <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
                    <h1 className="text-3xl text-primary">Skins List</h1>
                    <section className="flex flex-col gap-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="grid-auto-fit-200 overflow-y-scroll p-2 max-h-[90dvh] ">
                                {outfitData.length > 0 ? outfitData.map((outfit: any, index: number) => {
                                    if (outfit.images.nameicon && skins) return <div key={index} className="max-h-48">
                                        <div className={`flex w-full flex-col cursor-pointer items-center hover:scale-105 hover:shadow-light transition-all rounded-lg bg-[#efeeee] ${active && active.id == outfit.id && "shadow-light scale-105"}`} onClick={() => { setActive(outfit) }}>

                                            <Image src={`https://enka.network/ui/${outfit.images.namecard}.png`} width={250} height={250} alt={`${outfit.name} weaapon icon`} className={`bg-gradient-to-br from-gradient-SSR-start to-gradient-SSR-end" rounded-t-lg w-full h-full rounded-br-4xl object-cover`} title={`${outfit.name}`}
                                                //@ts-ignore
                                                onError={(e) => { e.target.closest('.max-h-48').remove(); }} // delete div's with invalid images
                                            />
                                            <p className="flex flex-col min-h-9 justify-around mx-1 text-center text-xs text-bg font-bold">{outfit.name}</p>
                                        </div>
                                    </div>
                                })
                                    :
                                    <div className="flex justify-center w-full col-span-full items-center">
                                        <Loader />
                                    </div>
                                }
                            </div>
                            <div className="order-first lg:order-last flex flex-col gap-2">
                                {loading ?
                                    <div>
                                        <Loader />
                                    </div> :
                                    active ? <>
                                        <div className="flex flex-col relative bg-[#e9e9e9] rounded-xl ">
                                            <div className={` max-h-72 rounded-t-xl bg-gradient-to-br from-gradient-SSR-start to-gradient-SSR-end flex justify-between w-full`}>
                                                <Image src={`https://enka.network/ui/${active.images.namesplash}.png`} width={500} height={500} alt={`${active.name} material icon`} className={`object-cover w-full`} />
                                            </div>
                                            <div className="text-bg p-4 flex flex-col gap-2">
                                                <h2 className="font-bold text-xl">{active.name}</h2>
                                                <div className="flex flex-col">
                                                    <div className="flex gap-5">
                                                        <p className="">{active.description}</p>

                                                    </div>
                                                </div>
                                                <div className="flex flex-col font-normal italic">
                                                    {active.source.map((source: any, index: number) => {
                                                        return <span key={index} className="">
                                                            {source}
                                                        </span>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        {active.url.modelviewer.length > 0 && <div className="w-full max-h-[50dvh] h-full">
                                            <iframe src={active.url.modelviewer} className="w-full h-full">
                                            </iframe>
                                            <Link href={active.url.modelviewer} target="__blank" className="hover:text-primary transition-all">Open in New Tab</Link>
                                        </div>}
                                    </>
                                        :
                                        <div>
                                            <Loader />
                                        </div>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
