"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Events from "../Events";
export default function BentoGrid() {
    const [active, setActive] = useState<number>(-1);
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
            title: 'Wish Counter',
            content: "",
            image: "/icons/wish.webp",
            bg: "/db/namecards/UI_NameCardPic_Bp2_P.png",
            link: "/wish",
            alt: "",
            id: "",
        },
        {
            title: 'Events',
            content: "",
            alt: "",
            id: "",
            children: <Events />
        },
        {
            title: 'Locations',
            content: "",
            image: "/icons/map.webp",
            link: "/locations",
            bg: "/db/namecards/UI_NameCardPic_Bp4_P.png",
            alt: "",
            id: ""
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
            link: "/team",
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
            <div className={`overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col ${index === 1 ? 'lg:col-span-2 md:row-span-2 lg:row-span-1' : ''} ${index == 3 && "row-span-2 md:col-span-2 "} transition-all`}>
                {item.link ?
                    <Link
                        className={`transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer`}
                        href={item.link}
                    >
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                                <p className='font-bold text-2xl'>{item.content}</p>
                            </div>
                            <div className="text-6xl group-hover:font-bold text-primary">
                                {/* <IoArrowForwardCircleOutline className="group-hover:hidden block" /> */}
                                {/* <IoArrowForwardCircle className="hidden group-hover:block" /> */}
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