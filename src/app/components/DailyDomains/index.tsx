"use client"
import axios from "axios";
import { useState, useLayoutEffect } from "react"
import Image from "next/image";
import { addFileName } from "@/app/utils/helper";
import Link from "next/link";
import Loader from "../Loader";
import { Character } from "@/app/types/character";
import { Artifact } from "@/app/types/artifacts";
import { Weapon } from "@/app/types/weapon";
export default function DailyDomains({ }: {}) {
    const [activeWeapons, setActiveWeapons] = useState<Weapon[]>([]);
    const [activeArtifacts, setActiveArtifacts] = useState<Artifact[]>([]);
    const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [loading, setLoading] = useState<boolean>(true);
    const fetchData = async (domain: any) => {
        try {
            setActiveArtifacts(prevState => { //  dev mode rerendering
                const domainExists = prevState.some(item => item.id === domain.id);
                if (!domainExists) {
                    return [...prevState, domain];
                }
                return prevState;
            });

            const res = await axios.get(`https://genshin-db-api.vercel.app/api/v5/talents?query=${domain.rewardPreview[domain.rewardPreview.length - 1].name}&matchCategories=true&dumpResults=true&verboseCategories=true`);
            const filteredData = res.data.filter((item: Weapon) => item.name && !item.name.startsWith('Traveler'));

            const innerRequests = filteredData.map(async (character: Character) => {
                const response = await axios.get(`https://genshin-db-api.vercel.app/api/v5/characters?query=${character.name}&matchCategories=true&dumpResults=true&verboseCategories=true`);
                return response.data;
            });

            const charactersData = await Promise.all(innerRequests);

            charactersData.forEach((character: Character) => {
                addFileName([character]);
            });
            return charactersData;
        } catch (error) {
            console.error("Error fetching talents:", error);
            return null;
        }
    };
    const fetchAndSetData = async (data: any) => {
        const talentsPromises = data
            .filter((domain: any) => domain.domainType === "UI_ABYSSUS_AVATAR_PROUD" && domain.unlockRank > 40)
            .map((domain: any) => fetchData(domain));

        const talentsData = await Promise.all(talentsPromises);
        setActiveCharacters(talentsData.filter(Boolean));

        setLoading(false);
    };
    const [done, setDone] = useState<boolean>(false)
    const weekday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useLayoutEffect(() => {
        setLoading(true);
        let day = selectedDay;
        if (!done) {
            const d = new Date();
            day = weekday[d.getDay()];
            setSelectedDay(day);
            setDone(true);
            setActiveCharacters([]);
        }
        const storedData = sessionStorage.getItem(`domainData_${selectedDay}`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setActiveCharacters([]);
            setActiveWeapons(parsedData.weapons);
            setActiveArtifacts([]);
            fetchAndSetData(parsedData.allData);
            setLoading(false);
        } else {
            if (day !== "Sunday") {
                axios
                    .get<any[]>(`https://genshin-db-api.vercel.app/api/v5/domains?query=${day}&matchCategories=true&dumpResults=true&verboseCategories=true`)
                    .then((res) => {
                        const weapons = res.data.filter(domain => {
                            if (domain.domainType !== "UI_ABYSSUS_WEAPON_PROMOTE" || domain.unlockRank < 40) {
                                return false;
                            }
                            return true; // Include all other domains
                        });
                        setActiveWeapons(weapons);
                        setActiveArtifacts([]);
                        fetchAndSetData(res.data);
                        sessionStorage.setItem(`domainData_${selectedDay}`, JSON.stringify({ weapons, allData: res.data }));
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching domain data:", error);
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        }
    }, [selectedDay]);

    return (<div className="overflow-y-scroll h-full p-2 gap-2 flex flex-col">
        <label className="w-full" htmlFor="days">
            <span className="hidden">Days of the Week</span>
            <select title="Days" value={selectedDay} aria-label="Days" id="days" onChange={(e) => { setSelectedDay(e.target.value); }} className="p-1 w-full">
                <option value="Sunday" id="Sunday">Sunday</option>
                <option value="Monday" id="Monday">Monday</option>
                <option value="Tuesday" id="Tuesday">Tuesday</option>
                <option value="Wednesday" id="Wednesday">Wednesday</option>
                <option value="Thursday" id="Thursday">Thursday</option>
                <option value="Friday" id="Friday">Friday</option>
                <option value="Saturday" id="Saturday">Saturday</option>
            </select>
        </label>
        {!loading ?
            <>
                {selectedDay == "Sunday" ?
                    <div className="p-2 text-xl">
                        <p>Everything is farmable today.</p>
                    </div>
                    :
                    <>
                        <div className="flex flex-col gap-4">
                            {activeArtifacts.map((domain, index) => {
                                return <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center col-span-2 justify-start rounded-xl min-w-8 min-h-8" >
                                        <Image src={`https://enka.network/ui/UI_ItemIcon_${domain.rewardPreview[domain.rewardPreview.length - 1].id}.png`} width={75} height={75} alt={` material icon`} className={`bg-gradient-to-br from-gradient-SSR-start to-gradient-SSR-end rounded-xl hover:scale-105 hover:shadow-light transition-all`} title={`${domain.rewardPreview[domain.rewardPreview.length - 1].name}`} />
                                    </div>
                                    <div className="grid-auto-fit-10">
                                        {activeCharacters.length > 1 ?
                                            <>
                                                {activeCharacters[index].map((character: Character, i: number) => {
                                                    return (
                                                        <Link id={`${character.name}_daily`} key={i} className="cursor-pointer max-w-12 min-h-4" href={`/characters/${character.name}`}>
                                                            <Image
                                                                src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                                                                width={200}
                                                                height={200}
                                                                alt={`${character.name}`}
                                                                title={`${character.name}`}
                                                                className={`w-full hover:scale-105 hover:shadow-light transition-all rounded-xl object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"
                                                                    }`}
                                                            />
                                                        </Link>
                                                    );
                                                })}
                                            </> : index === 0 ?
                                                <div className="col-span-full row-span-full">
                                                    <Loader />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className="flex gap-2 mt-2">
                            {activeWeapons.map((domain, index) => {
                                return <div key={index} className="flex justify-between gap-4 ">
                                    <div className="flex flex-col items-center hover:scale-105 hover:shadow-light transition-all rounded-xl bg-gradient-to-br from-gradient-SSR-start to-gradient-SSR-end" >
                                        <Image src={`https://enka.network/ui/UI_ItemIcon_${domain.rewardPreview[domain.rewardPreview.length - 1].id}.png`} width={75} height={75} alt={` material icon`} className={``} title={`${domain.rewardPreview[domain.rewardPreview.length - 1].name}`} />
                                    </div>
                                </div>
                            })}
                        </div>
                    </>
                }

            </> : <Loader />
        }
    </div >)
}