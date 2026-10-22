"use client"
import { useState, useLayoutEffect } from "react"
import { addFileName } from "@/app/utils/helper";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../Skeleton";
import { Character } from "@/app/types/character";
export default function Birthdays({ }: {}) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [done, setDone] = useState<boolean>(false);
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useLayoutEffect(() => {
        setLoading(true);
        let month = selectedMonth;
        if (!done) {
            const d = new Date();
            month = months[d.getMonth()];
            setSelectedMonth(month);
            setDone(true);
        }

        const storedData = sessionStorage.getItem(`characterData_${selectedMonth}`);

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCharacters(parsedData);
            setLoading(false);
        } else {
            if(selectedMonth.length == 0) return
            fetch(`https://genshin-db-api.vercel.app/api/v5/characters?query=${month}&matchCategories=true&dumpResults=true&verboseCategories=true`)
                .then((res) => {
                    if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);
                    return res.json();
                })
                .then((res) => {
                    let charactersData: Character[] = res;
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
                    sessionStorage.setItem(`characterData_${selectedMonth}`, JSON.stringify(charactersData));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching character data:", error);
                    setLoading(false);
                });
        }
    }, [selectedMonth]);

    return <div className="flex flex-col gap-2 p-2 overflow-y-scroll h-full">
        <label className="w-full" htmlFor="months">
            <span className="hidden">Months</span>
            <select title="Months" aria-label="Months" id="months" value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); }} className="p-1 w-full">
                <option value="January" id="January">January</option>
                <option value="February" id="February">February</option>
                <option value="March" id="March">March</option>
                <option value="April" id="April">April</option>
                <option value="May" id="May">May</option>
                <option value="June" id="June">June</option>
                <option value="July" id="July">July</option>
                <option value="August" id="August">August</option>
                <option value="September" id="September">September</option>
                <option value="July" id="July">July</option>
                <option value="October" id="October">October</option>
                <option value="November" id="November">November</option>
                <option value="December" id="December">December</option>
            </select>
        </label>
        <div className="p-2 grid grid-auto-fit-100 gap-2">
            {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
                ))
            ) : (
                characters.map((character, index) => (
                    <Link
                        id={`${character.name}_month`}
                        key={index}
                        href={`/characters/${character.name}`}
                        className="bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light"
                    >
                        <div className="flex flex-col self-start">
                            <Image
                                src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                                width={150}
                                height={150}
                                alt={`${character.name} icon`}
                                title={`${character.name}`}
                                className={`rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br ${character.rarity == 4 ? "from-gradient-SR-start to-gradient-SR-end" : "from-gradient-SSR-start to-gradient-SSR-end"}`}
                            />
                            <p className="text-center w-full text-xs text-nowrap p-1 text-black font-bold rounded-b-xl">
                                {character.birthdaymmdd}
                            </p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    </div>
}