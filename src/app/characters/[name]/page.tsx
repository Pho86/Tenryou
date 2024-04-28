"use client"
import Image from "next/image";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import SmoothScroll from "@/app/components/SmoothScroll";
import StickyScroll from "@/app/components/StickyScroll";
import Footer from "@/app/components/Footer";
import { Character } from "@/app/utils/types";
import { addFileName } from "@/app/utils/helper";
import { motion } from "framer-motion"
import Link from "next/link";
import StatsTable from "@/app/components/StatsTable";
import InfoCharacterBanner from "@/app/components/InfoCharacterBanner";
import Lenis from "@studio-freight/lenis";
import ConstellationsTable from "@/app/components/ConstellationTable";
import AttackTable from "@/app/components/AttackTable";
import VoiceList from "@/app/components/VoiceList";

export default function CharacterPage({ params }: { params: any }) {

    const [data, setData] = useState<Character[]>();
    const [error, setError] = useState('');
    const [lang, setLang] = useState<string>("english")
    const link = `https://genshin-db-api.vercel.app/api/v5/characters?query=${params.name}`
    useLayoutEffect(() => {
        axios.get<Character[]>(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true&resultLanguage=${lang}`)
            .then((res) => {
                let data = res.data;
                // @ts-ignore
                addFileName([data.result]);
                const mergeWithPreference = (firstData: any, secondData: any) => {
                    for (const key in secondData) {
                        if (firstData.hasOwnProperty(key) && typeof firstData[key] === 'object' && secondData[key] !== null) {
                            firstData[key] = mergeWithPreference(firstData[key], secondData[key]);
                        } else {
                            firstData[key] = secondData[key];
                        }
                    }
                    return firstData;
                };
                Promise.all([
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${params.name}&matchCategories=true&queryLanguages=english,jap`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${params.name}&matchCategories=true&queryLanguages=english,jap`)
                ])
                    .then((responses) => {
                        const [constellationsResponse, talentsResponse, nameCardResponse, voiceDataResponse] = responses;
                        const constellationsData = constellationsResponse.data;
                        const talentsData = talentsResponse.data;
                        const nameCardData = nameCardResponse.data;
                        const voiceData = voiceDataResponse.data;

                        const mergedData = {
                            // @ts-ignore
                            stats: data.stats,
                            constellations: constellationsData,
                            talents: talentsData,
                            nameCard: nameCardData,
                            voices: voiceData,
                            // @ts-ignore
                            ...data.result,
                        };

                        const finalData = mergeWithPreference(data, mergedData);
                        setData(finalData);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        const lenis = new Lenis()
        const raf = (time: any) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

    }, [])
    return (
        <>
            <NavBar />

            {data ?
                <main className="flex flex-col gap-4" >
                    <InfoCharacterBanner data={data} params={params} />
                    <button onClick={() => { console.log(data) }} className="p-2 fixed bottom-0"> HERLLO!!</button>
                    <div className="flex gap-2 p-4 md:p-8 z-20">
                        <section className="flex flex-col gap-8 mt-20">
                            <StatsTable data={data} />
                            {/* @ts-ignore */}
                            <AttackTable attackData={data.talents} params={params} />
                            {/* @ts-ignore */}
                            <ConstellationsTable constellationData={data.constellations} params={params} />

                        </section>
                    </div>
                    <section className="flex gap-3 flex-col p-4 md:p-8">
                        <h2 className="font-bold text-3xl">Miscellaneous</h2>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="relative overflow-hidden flex flex-col p-4">
                                <h3 className="font-semibold text-xl my-2">Namecard</h3>
                                <div className="relative flex flex-col rounded-xl items-center justify-center ">
                                    {/* @ts-ignore */}
                                    <Image src={`/db/namecards/${data.nameCard.images.filename_background}.png`} width={2000} height={800} alt={`${data.name} name card.`} className="w-full rounded-t-xl" />
                                    {/* @ts-ignore */}
                                    <p className="absolute bottom-0 w-full bg-bg bg-opacity-60 p-4 text-lg font-bold">{data.nameCard.name}</p>
                                </div>
                                {/* @ts-ignore */}
                                <p className="font-poppins w-full bg-zinc-100 rounded-b-xl text-black p-4">{data.nameCard.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 justify-center p-4">
                                <h3 className="font-semibold text-xl text-start ">Constellation</h3>
                                {/* @ts-ignore */}
                                <Image src={`/db/constellations/${data.constellations.images.filename_constellation}.png`} width={600} height={500} alt={`${data.name} constellation`} className="p-12" />
                            </div>
                        </div>
                    </section>
                    <section className="flex gap-3 flex-col p-4 md:p-8">
                        <h2 className="font-bold text-3xl">Quotes</h2>
                        <div className="grid gap-4">
                            {/* @ts-ignore */}
                            <VoiceList voiceData={data.voices}/>
                        </div>
                    </section>
                    <Footer />
                </main>

                :
                <>
                </>}
        </>
    );
}
