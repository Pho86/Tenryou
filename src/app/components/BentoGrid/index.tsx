"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useLayoutEffect, useEffect } from "react";
import Events from "../Events";
import DailyDomains from "../DailyDomains";
import Birthdays from "../Birthdays";
export default function BentoGrid() {

    const data = [
        {
            title: 'Welcome, Traveler! 💮',
            alt: "Here you can find information from the game, Genshin Impact, visualized with various useful information, including information about the game, such as characters, weapons and other specific things.",
        },
        {
            title: 'Characters',
            image: "/icons/characters_out.webp",
            bg: "/namecards/UI_NameCardPic_Bp5_P.png",
            link: "/characters",
        },
        {
            title: `Dailies Today`,
            children: <DailyDomains />
        },
        {
            title: 'Events',
            children: <Events />
        },
        {
            title: 'Users',
            image: "/icons/wish.webp",
            bg: "/namecards/UI_NameCardPic_Bp2_P.png",
            link: "/users",
        },
        {
            title: 'Interactive Map',
            image: "/icons/map.webp",
            link: "https://act.hoyolab.com/ys/app/interactive-map/index.html",
            bg: "/namecards/UI_NameCardPic_Bp4_P.png",
            target: true
        },
        {
            title: 'Artifacts',
            image: "/icons/artifacts.webp",
            bg: "/namecards/UI_NameCardPic_Bp23_P.png",
            link: "/artifacts",
        },
        {
            title: 'Weapons',
            image: "/icons/weapons.webp",
            bg: "/namecards/UI_NameCardPic_Bp10_P.png",
            link: "/weapons",
        },
        {
            title: 'Team Builder',
            image: "/icons/characters_out.webp",
            bg: "/namecards/UI_NameCardPic_Md2_P.png",
            link: "/teambuilder",
        },
        {
            title: `Birthdays This Month`,
            children: <Birthdays />,
        },
    ]
    return (
        <>
            <section className="w-full max-w-screen-2xl " >
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
            <div className={`overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col ${index === 2 && ' lg:row-span-2 md:row-span-1 row-span-2'} ${index === 1 ? 'lg:col-span-2 md:row-span-2 lg:row-span-1' : ''} ${index == 3 && "row-span-2 md:col-span-2 "}   ${index == 9 && "lg:col-span-2 "}transition-all`}>
                {item.link ?
                    <Link
                        className={`transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer`}
                        target={item.target ? "_blank" : ""}
                        href={item.link}
                    >
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                            </div>
                        </div>
                        {item.image && <div className={`overflow-hidden w-full h-full relative bg-no-repeat `}>
                            {item.bg && <Image className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90 " fill alt={`${item.title} page`} src={item.bg} />}
                            <Image src={item.image} width={500} height={500} alt={item.title} className="absolute top-0 h-full p-4 w-full object-contain group-hover:scale-105 transition-all " />
                        </div>
                        }
                    </Link>
                    :
                    <div className={` flex flex-col h-full`}>
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                            </div>
                        </div>
                        {item.children ?
                            <>
                                {item.children}
                            </>
                            :
                            <p className="px-3 text-lg md:text-base">
                                {item.alt}
                            </p>}
                    </div>
                }
            </div >
        </>
    )
}