"use client"
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Footer from "@/app/components/Footer";
import { Character } from "@/app/utils/types";
import { addFileName } from "@/app/utils/helper";
import StatsTable from "@/app/components/StatsTable";
import InfoCharacterBanner from "@/app/components/InfoCharacterBanner";
import Lenis from "@studio-freight/lenis";
import ConstellationsTable from "@/app/components/ConstellationTable";
import AttackTable from "@/app/components/AttackTable";
import VoiceList from "@/app/components/VoiceList";
import Gallery from "@/app/components/Gallery";
import Loader from "@/app/components/Loader";

export default function CharacterPage({ params }: { params: { name: string } }) {

    const [characterData, setCharacterData] = useState<Character>();
    const [error, setError] = useState('');
    const [lang, setLang] = useState<string>("english");
    useLayoutEffect(() => {
        axios.get<Character>(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true&resultLanguage=${lang}`)
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
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=${lang}`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=${lang}`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${params.name}&matchCategories=true&resultLanguage=${lang}`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${params.name}&matchCategories=true&resultLanguage=${lang}`),
                    axios.get(`https://genshin-db-api.vercel.app/api/v5/outfits?query=${params.name}&matchCategories=true&resultLanguage=${lang}&dumpResults=true&verboseCategories=true`),
                ])
                    .then((responses) => {
                        const [constellationsResponse, talentsResponse, nameCardResponse, voiceDataResponse, outfitResponse] = responses;
                        const constellationsData = constellationsResponse.data;
                        const talentsData = talentsResponse.data;
                        const nameCardData = nameCardResponse.data;
                        const voiceData = voiceDataResponse.data;
                        const outfitData = outfitResponse.data;

                        const mergedData = {
                            // @ts-ignore
                            stats: data.stats,
                            constellations: constellationsData,
                            talents: talentsData,
                            nameCard: nameCardData,
                            voices: voiceData,
                            outfits: outfitData,
                            // @ts-ignore
                            ...data.result,
                        };

                        const finalData = mergeWithPreference(data, mergedData);
                        setCharacterData(finalData);
                        console.log(finalData)
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
            <NavBar active={1}/>

            {characterData ?
                <main className="flex flex-col gap-4" >
                    <InfoCharacterBanner characterData={characterData} params={params} />
                    <div className="flex flex-col gap-4 w-full items-center justify-center">
                        <div className="flex gap-2 p-4 md:p-8 z-20 max-w-screen-2xl">
                            <section className="flex flex-col gap-8 mt-20">
                                <StatsTable characterData={characterData} />
                                <AttackTable attackData={characterData.talents} params={params} />
                                <ConstellationsTable constellationData={characterData.constellations} params={params} />
                            </section>
                        </div>
                        <section className="flex gap-3 flex-col p-4 md:p-8 max-w-screen-2xl w-full">
                            <Gallery characterData={characterData} />
                        </section>
                        <section className="flex gap-3 flex-col p-4 md:p-8 max-w-screen-2xl w-full">
                            <h2 className="font-bold text-3xl">Quotes</h2>
                            <div className="grid gap-4">
                                <VoiceList voiceData={characterData.voices} />
                            </div>
                        </section>
                    </div>
                    <Footer />
                </main>

                :
                <div className="pt-16">
                    <Loader />
                </div>}
        </>
    );
}
