import axios from "axios";
import { useState, useLayoutEffect } from "react"
import { addFileName } from "@/app/utils/helper";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";
export default function Birthdays({ month = "december" }: { month: string }) {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useLayoutEffect(() => {
        setLoading(true)
        axios
            .get<any[]>(`https://genshin-db-api.vercel.app/api/v5/characters?query=${month}&matchCategories=true&dumpResults=true&verboseCategories=true`)
            .then((res) => {
                let charactersData = res.data;
                charactersData.forEach((character: any) => {
                    addFileName([character]);
                });
                charactersData.sort((a, b) => {
                    const getDate = (dateString: string) => {
                        const [month, day] = dateString.split('/');
                        return new Date(2024, parseInt(month) - 1, parseInt(day));
                    };

                    const dateA = getDate(a.birthdaymmdd);
                    const dateB = getDate(b.birthdaymmdd);

                    return dateA.getTime() - dateB.getTime();
                });
                setCharacters(charactersData);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching character names:", error);
            });
    }, [month]);

    return <div className="p-4 justify-center grid-auto-fit-150">
        {loading ?
            <Loader />
            :
            <>
                {characters.map((character, index) => {
                    return <div key={index} className="bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light">
                        <Link href={`/characters/${character.name}`} className={`flex flex-col self-start `}>
                            <Image
                                src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                                width={150}
                                height={150}
                                alt={`${character.name} icon`}
                                title={`${character.name}`}
                                className={`rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`}
                            />
                            <p className="text-center w-full h-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl after:absolute after:p-2 absolute:top-0 absolute:bg-red ">{character.birthdaymmdd}</p>
                        </Link>
                    </div>
                })}
            </>
        }
    </div>
}