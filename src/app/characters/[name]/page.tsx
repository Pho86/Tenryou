// @ts-nocheck
"use client"
import Image from "next/image";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import SmoothScroll from "@/app/components/SmoothScroll";
import StickyScroll from "@/app/components/StickyScroll";
import Footer from "@/app/components/Footer";
import { Character } from "@/app/utils/types";
export default function CharacterPage({ params }: { params: any }) {

    const [data, setData] = useState<Character[]>();
    const [error, setError] = useState('');
    const [lang, setLang] = useState<string>("en")
    const link = `https://genshin.jmp.blue/characters/${params.name}`
    useLayoutEffect(() => {
        axios
            .get<Character[]>(`https://genshin.jmp.blue/characters/${params.name}?lang=${lang}`)
            .then((res) => {
                console.log(res.data);
                let temp = res.data.passiveTalents[2];
                let temp1 = res.data.passiveTalents[1];
                let temp2 = res.data.passiveTalents[0];

                // Swap values
                res.data.passiveTalents[2] = temp1;
                res.data.passiveTalents[1] = temp2;
                res.data.passiveTalents[0] = temp;

                // @ts-ignore

                setData(res.data)
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);
    return (
        <>
            <NavBar />

            {data ? <section className="flex flex-col px-4 gap-4">
                {/* <SmoothScroll></SmoothScroll> */}
                <div className=" w-screen z-[-10] p-0 md:p-12 pt-0 flex flex-col flex-wrap justify-center md:min-h-[100dvh]">
                    {/* @ts */}
                    <h1 className="absolute font-bold text-6xl md:text-9xl text-center p-2 bg-bg rounded-xl top-0 mt-20">{data.name}</h1>
                    <Image src={`${link}/gacha-splash`} alt={`${params.name} Image Card`} width={3000} height={3000} className="w-full h-full object-contain" priority />
                </div>
                <StickyScroll image={`${link}/gacha-card`} data={data} link={link} params={params} />

                {/* <Image src={`${link}/gacha-card`} alt={`${params.name} Image Card`} width={250} height={250} className="sticky" /> */}
                <Footer />
            </section>

                :
                <>
                </>}
        </>
    );
}
