"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";
import { Material } from "../types/materials";
export default function MaterialsPage() {
    const [materialData, setMaterialData] = useState<Material[]>([]);
    const [activeRarity, setActiveRarity] = useState<number>(0);
    const [active, setActive] = useState<Material>();
    const [loading, setLoading] = useState<boolean>(false);
    useLayoutEffect(() => {
        axios
            .get<Material[]>("https://genshin-db-api.vercel.app/api/v5/materials?query=names&matchCategories=true&dumpResults=true&verboseCategories=true")
            .then((res) => {
                setMaterialData(res.data);
                setActive(res.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching character names:", error);
            });
    }, []);

    return (
        <>
            <NavBar active={4}/>
            <main className="md:pt-16 md:px-16 px-8 mb-20 w-full min-h-[100dvh] flex flex-col gap-4 items-center ">
                <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
                    <h1 className="text-3xl text-primary">Materials List</h1>
                    <section className="flex flex-col gap-8">
                        <div className="flex w-full justify-around gap-2 flex-col md:flex-row">
                            <div className="flex gap-3 justify-center">
                                <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 1 ? 0 : 1) }} index={1} active={activeRarity} className="text-gray-600" />
                                <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 2 ? 0 : 2) }} index={2} active={activeRarity} className="text-green-600" />
                                <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 3 ? 0 : 3) }} index={3} active={activeRarity} className="text-blue-600" />
                                <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 4 ? 0 : 4) }} index={4} active={activeRarity} className="text-purple-600" />
                                <IconButtonSwitch star onClick={() => { setActiveRarity(activeRarity === 5 ? 0 : 5) }} index={5} active={activeRarity} className="text-yellow-600" />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="grid-auto-fit-200 overflow-y-scroll p-2 max-h-[90dvh] ">
                                {materialData.length > 0 ? materialData.map((material: Material, index: number) => {
                                    const materialRarity = [true, 1, 2, 3, 4, 5];
                                    const validRarity = activeRarity === 0 || materialRarity[activeRarity] === material.rarity;
                                    if (validRarity) return <div key={index} className="max-h-48">
                                        <div className={`flex w-full flex-col cursor-pointer items-center hover:scale-105 hover:shadow-light transition-all rounded-lg bg-[#efeeee] ${active && active.id == material.id && "shadow-light scale-105"}`} onClick={() => { setActive(material) }}>
                                            <Image src={`https://enka.network/ui/${material.images.filename_icon}.png`} width={250} height={250} alt={`${material.name} weaapon icon`} className={`bg-gradient-to-br ${material.rarity === 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : material.rarity === 4 ? "from-gradient-SR-start to-gradient-SR-end" : material.rarity === 3 ? "from-gradient-R-start to-gradient-R-end" : material.rarity === 2 ? "from-gradient-UC-start to-gradient-UC-end" : "from-gradient-C-start to-gradient-C-end"} rounded-t-lg w-full h-full rounded-br-4xl object-cover bg-gradient-to-br`} title={`${material.name}`}
                                                onError={(e:React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/icon.svg' }}
                                            />
                                            <p className="flex flex-col min-h-9 justify-around mx-1 text-center text-xs text-bg font-bold">{material.name}</p>
                                        </div>
                                    </div>
                                })
                                    :
                                    <div className="flex justify-center w-full col-span-full items-center">
                                        <Loader />
                                    </div>
                                }
                            </div>
                            <div className="order-first lg:order-last">
                                {loading ?
                                    <div>
                                        <Loader />
                                    </div> :
                                    active ? <>
                                        <div className="flex flex-col relative bg-[#e9e9e9] rounded-xl ">
                                            <div className={`max-h-56 rounded-t-xl bg-gradient-to-br ${active.rarity === 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : active.rarity === 4 ? "from-gradient-SR-start to-gradient-SR-end" : active.rarity === 3 ? "from-gradient-R-start to-gradient-R-end" : active.rarity === 2 ? "from-gradient-UC-start to-gradient-UC-end" : "from-gradient-C-start to-gradient-C-end"} flex justify-between w-full`}>
                                                <div className="p-4 w-full justify-between">
                                                    <h1 className="text-pretty font-bold ">{active.typeText}</h1>
                                                </div>
                                                <Image src={`https://enka.network/ui/${active.images.filename_icon}.png`} width={500} height={500} alt={`${active.name} material icon`} className={`object-contain`}
                                                    onError={(e:React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/icon.svg' }}
                                                />
                                            </div>
                                            <div className="text-bg p-4 flex flex-col gap-2">
                                                <h2 className="font-bold text-xl">{active.name}</h2>
                                                <div className="flex flex-col">
                                                    <div className="flex gap-5">
                                                        <p className="">{active.description}</p>

                                                    </div>
                                                </div>
                                                <div className="flex flex-col font-normal italic">
                                                    {active.sources.map((source: any, index: number) => {
                                                        return <span key={index} className="">
                                                            {source}
                                                        </span>

                                                    })}
                                                </div>
                                            </div>
                                        </div>
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
            <div className=" bg-gradient-to-br from-gradient-C-start to-gradient-C-end from-gradient-SSR-start to-gradient-SSR-end from-gradient-SR-start to-gradient-SR-end from-gradient-R-start to-gradient-R-end from-gradient-C-start to-gradient-C-end"></div>
        </>
    );
}
