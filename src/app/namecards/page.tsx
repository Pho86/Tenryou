"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import Footer from "../components/Footer";
import Loader from "../components/Loader";
export default function NamecardsPage() {
    const [nameCardData, setNameCardData] = useState<any[]>([]);
    const [active, setActive] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    useLayoutEffect(() => {
        axios
            .get<any[]>("https://genshin-db-api.vercel.app/api/v5/namecards?query=names&matchCategories=true&dumpResults=true&verboseCategories=true")
            .then((res) => {
                setNameCardData(res.data);
                setActive(res.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching character names:", error);
            });
    }, []);

    return (
        <>
            <NavBar />
            <main className="md:pt-16 md:px-16 px-8 mb-20 w-full min-h-[100dvh] flex flex-col gap-4 items-center ">
                <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
                    <h1 className="text-3xl text-primary">Namecards List</h1>
                    <section className="flex flex-col gap-8">
                        <div className="flex w-full justify-around gap-2 flex-col md:flex-row">
                            
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="grid-auto-fit-200 md:grid-auto-fit-300 overflow-y-scroll p-2 max-h-[90dvh] ">
                                {nameCardData.length > 0 ? nameCardData.map((namecard: any, index: number) => {
                                    return <div key={index} className="">
                                        <div className={`flex w-full flex-col cursor-pointer items-center hover:scale-105 hover:shadow-light transition-all rounded-lg bg-[#efeeee] ${active && active.id == namecard.id && "shadow-light scale-105"}`} onClick={() => { setActive(namecard) }}>
                                            <Image src={`https://enka.network/ui/${namecard.images.filename_background}.png`} width={250} height={250} alt={`${namecard.name} namecard icon`} className={`bg-gradient-to-br from-gradient-SSR-start to-gradient-SSR-end rounded-t-lg w-full h-full rounded-br-4xl object-cover`} title={`${namecard.name}`}
                                                //@ts-ignore
                                            />
                                            <p className="flex flex-col min-h-9 justify-around mx-1 text-center text-xs text-bg font-bold">{namecard.name}</p>
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
                                            <div className={`rounded-t-xl flex justify-between w-full relative overflow-hidden`}>
                                                <Image src={`https://enka.network/ui/${active.images.filename_background}.png`} width={1000} height={1000} alt={`${active.name} namecard banner`} className={`object-cover w-full `} />
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
