"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useLayoutEffect, useEffect } from "react";
import Events from "../Events";
import DailyDomains from "../DailyDomains";
import Birthdays from "../Birthdays";
export default function BentoGrid() {
    const [month, setMonth] = useState<string>("Loading...");
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const d = new Date();
        setMonth(months[d.getMonth()]);
    }, [])

    const data = [
        {
            title: 'Welcome!',
            content: "",
            alt: "Welcome, traveler! Here you can find information from the game visualized with various useful information, including information about the game, such as characters, weapons and other things.",
            bg: "/db/geographies/UI_Codex_Scenery_DQ2qinglaiwan.png",
            id: "/"
        },
        {
            title: 'Characters',
            content: "",
            image: "/icons/characters_out.webp",
            bg: "/db/namecards/UI_NameCardPic_Bp5_P.png",
            link: "/characters",
            alt: "",
            id: ""
        },
        {
            title: `Dailies Today`,
            content: "",
            alt: "",
            id: "",
            children: <DailyDomains />
        },
        {
            title: 'Events',
            content: "",
            alt: "",
            id: "",
            children: <Events />
        },
        {
            title: 'Achievements',
            content: "",
            image: "/icons/wish.webp",
            bg: "/db/namecards/UI_NameCardPic_Bp2_P.png",
            link: "/achievements",
            alt: "",
            id: "",
        },
        {
            title: 'Interactive Map',
            content: "",
            image: "/icons/map.webp",
            link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
            bg: "/db/namecards/UI_NameCardPic_Bp4_P.png",
            alt: "",
            id: "",
            target: true
        },
        {
            title: 'Artifacts',
            content: "",
            image: "/icons/artifacts.webp",
            bg: "/db/namecards/UI_NameCardPic_Bp23_P.png",
            link: "/artifacts",
            alt: "",
            id: ""
        },
        {
            title: 'Weapons',
            content: "",
            image: "/icons/weapons.webp",
            bg: "/db/namecards/UI_NameCardPic_Bp10_P.png",
            link: "/weapons",
            alt: "",
            id: ""
        },
        {
            title: 'Team Builder (WIP)',
            content: "",
            image: "/icons/characters_out.webp",
            bg: "/db/namecards/UI_NameCardPic_Md2_P.png",
            link: "/teambuilder",
            alt: "",
            id: ""
        },
        {
            title: `Birthdays This Month (${month})`,
            children: <Birthdays month={month} />,
            alt: "",
            id: ""
        },
    ]
    return (
        <>
            <section className="w-full " >
                <div className='grid md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] w-full gap-4'>
                    {data.map((item, i) => (
                        <BentoItem item={item} index={i} key={i} />
                    ))}
                </div>
            </section>
        </>
    )
}
function BentoItem({ item, index }: { item: any, index: number }) {
    return (
        <>
            <div className={`overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col ${index === 2 && ' lg:row-span-2 md:row-span-1 sm:row-span-2'} ${index === 1 ? 'lg:col-span-2 md:row-span-2 lg:row-span-1' : ''} ${index == 3 && "row-span-2 md:col-span-2 "}   ${index == 9 && "lg:col-span-2 "}transition-all`}>
                {item.link ?
                    <Link
                        className={`transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer`}
                        target={item.target ? "_blank" : ""}
                        href={item.link}
                    >
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                                <p className='font-bold text-2xl'>{item.content}</p>
                            </div>
                        </div>
                        {item.image ? <div className={`overflow-hidden w-full h-full relative bg-no-repeat `}>
                            {item.bg && <Image className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90 " fill alt={`${item.title} page`} src={item.bg} />}
                            <Image src={item.image} width={500} height={500} alt={item.alt} className="absolute top-0 h-full p-4 w-full object-contain group-hover:scale-105 transition-all " />
                        </div> :
                            <p className="px-3">
                                {item.alt}
                            </p>
                        }
                    </Link>
                    :
                    <div className={` flex flex-col h-full`}>
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                                <p className='font-bold text-2xl'>{item.content}</p>
                            </div>
                        </div>
                        {item.children ?
                            <>
                                {item.children}
                            </>
                            :
                            <p className="px-3">
                                {item.alt}
                            </p>}
                    </div>
                }
            </div >
        </>
    )
}