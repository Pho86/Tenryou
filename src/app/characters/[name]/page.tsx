"use client"
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import { Character } from "@/app/types/character";
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
        const storedData = sessionStorage.getItem(`characterData_${params.name}_${lang}`);
    
        if (storedData) {
          setCharacterData(JSON.parse(storedData));
        } else {
          axios
            .get<Character>(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true&resultLanguage=${lang}`)
            .then((res) => {
              const data = res.data;
              const names = addFileName([data.result]);
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
              const characterName = names[0].fileName;
              Promise.all([
                axios.get(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=${lang}`),
                axios.get(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=${lang}`),
                axios.get(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${characterName}&matchCategories=true&resultLanguage=${lang}`),
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
                    stats: data.stats,
                    constellations: constellationsData,
                    talents: talentsData,
                    nameCard: nameCardData,
                    voices: voiceData,
                    outfits: outfitData,
                    ...data.result,
                  };
    
                  const finalData = mergeWithPreference(data, mergedData);
                  setCharacterData(finalData);
                  sessionStorage.setItem(`characterData_${params.name}_${lang}`, JSON.stringify(finalData));
                })
                .catch((error) => {
                  console.error("Error fetching data:", error);
                });
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      }, [params.name, lang]);

    return (
        <>

            {characterData ?
                <main className="flex flex-col items-center" >
                    <InfoCharacterBanner characterData={characterData} params={params} />
                    <div className="">
                        <div className="flex flex-col gap-4 w-full items-center justify-center">
                            <div className="flex gap-3 flex-col w-full ">
                                <section className="flex flex-col gap-8 mt-20">
                                    <StatsTable characterData={characterData} />
                                    <AttackTable attackData={characterData.talents} params={params} />
                                    <ConstellationsTable constellationData={characterData.constellations} params={params} />
                                </section>
                            </div>
                            <section className="flex gap-3 flex-col w-full">
                                <Gallery characterData={characterData} />
                            </section>
                            <section className="flex gap-3 flex-col w-full">
                                <h2 className="font-bold text-3xl">Quotes</h2>
                                <div className="grid gap-4">
                                    <VoiceList voiceData={characterData.voices} />
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                :
                <div className="pt-16">
                    <Loader />
                </div>}
                {error && <p className="text-center">An error has occured.</p>}
        </>
    );
}
